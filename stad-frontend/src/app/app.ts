import { Component, OnInit, ChangeDetectorRef, AfterViewInit, HostListener } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { LoteService } from './services/lote';
import { KeycloakService } from 'keycloak-angular';
import * as L from 'leaflet';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type PwaInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

// â”€â”€ Validador Personalizado: Verifica que ETA > fechaSalida â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// FunciÃ³n pura exportable fuera de la clase â€” patrÃ³n estÃ¡ndar Angular para
// cross-field validators que operan a nivel del FormGroup completo.
export const fechasViajeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const salida  = group.get('fechaSalida')?.value;
  const entrega = group.get('fechaEntregaEstimada')?.value;
  if (salida && entrega) {
    return new Date(entrega) > new Date(salida) ? null : { fechasInvalidas: true };
  }
  return null;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {

  lotes: any[] = []; // AquÃ­ guardaremos la "fotografÃ­a" de la base de datos
  canInstall = false;                            // Habilita el botón "Instalar App"
  private deferredPrompt: PwaInstallPromptEvent | null = null;

  // â”€â”€ RBAC: Variables de rol â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  isAdmin: boolean = false;
  isOperador: boolean = false;
  isAuditor: boolean = false;

  // â”€â”€ Dashboard: Vista activa â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  vistaActual: string = 'tabla';

  // â”€â”€ Perfil de usuario â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nombreUsuario: string = 'Cargando...';
  cargoUsuario: string = '';
  fotoUrl: string = '';

  // â”€â”€ ValidaciÃ³n: Fecha mÃ­nima para los datetime-local (hoy, sin pasado) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  fechaMinimaActual: string = new Date().toISOString().slice(0, 16);

  // â”€â”€ CatÃ¡logo de Embarcaciones de la HidrovÃ­a â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  listaBarcazas: string[] = [
    'Naviera Chaco I',
    'Barcaza RÃ­o Paraguay',
    'Empuje Don Robert',
    'UABL-502',
    'Imperial S.A.',
    'Fluviomar AsunciÃ³n',
    'Granelero ParanÃ¡ III',
    'HidrovÃ­a Express',
    'CompanÃ­a Fluvial del Norte',
    'Delta Cargo II',
    'BarcazÃ³n San Lorenzo',
    'Remolcador Cono Sur'
  ];

  // â”€â”€ Registros de AudiÃ­tÃ­a del Sistema (Mock) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  registrosAuditoria = [
    { fecha: '2026-03-30 08:14:22', usuario: 'noel.admin',     accion: 'Inicio de SesiÃ³n',           ip: '192.168.1.10' },
    { fecha: '2026-03-30 08:15:05', usuario: 'l.fera',         accion: 'Registro de Lote L-2026-001', ip: '192.168.1.21' },
    { fecha: '2026-03-30 08:22:47', usuario: 'm.gaona',        accion: 'Registro de Lote L-2026-002', ip: '192.168.1.22' },
    { fecha: '2026-03-30 09:01:13', usuario: 's.benitez',      accion: 'Consulta de Historial',       ip: '10.0.0.55'    },
    { fecha: '2026-03-30 09:45:30', usuario: 'noel.admin',     accion: 'Cambio de coordenadas Lote L-2026-001', ip: '192.168.1.10' },
    { fecha: '2026-03-30 10:03:58', usuario: 'j.villalba',     accion: 'Registro de Lote L-2026-003', ip: '192.168.1.23' },
    { fecha: '2026-03-30 10:30:11', usuario: 'd.paredes',      accion: 'ExportaciÃ³n de Reporte PDF',   ip: '10.0.0.56'    },
    { fecha: '2026-03-30 11:00:00', usuario: 'r.acosta',       accion: 'Registro de Lote L-2026-004', ip: '192.168.1.24' },
    { fecha: '2026-03-30 11:47:19', usuario: 'noel.admin',     accion: 'DeshabilitaciÃ³n de Usuario p.estigarribia', ip: '192.168.1.10' },
    { fecha: '2026-03-30 12:05:00', usuario: 'c.mendoza',      accion: 'Consulta de Mapa Fluvial',    ip: '192.168.1.11' },
    { fecha: '2026-03-30 13:22:44', usuario: 'l.fera',         accion: 'Registro de Lote L-2026-005', ip: '192.168.1.21' },
    { fecha: '2026-03-30 14:10:05', usuario: 's.benitez',      accion: 'Inicio de SesiÃ³n',           ip: '10.0.0.55'    },
    { fecha: '2026-03-30 15:55:33', usuario: 'noel.admin',     accion: 'GeneraciÃ³n de PDF de AudiÃ­tÃ­a', ip: '192.168.1.10' },
  ];

  // â”€â”€ Puertos fluviales de la HidrovÃ­a Paraguay-ParanÃ¡ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // CatÃ¡logo maestro de Puertos de la HidrovÃ­a Paraguay-ParanÃ¡
  puertosFluviales = [
    // --- ZONA NORTE (Bolivia y Brasil) ---
    { nombre: 'Puerto Quijarro (Bolivia)', lat: -18.9667, lng: -57.7333 },
    { nombre: 'Puerto Jennefer (Bolivia)', lat: -18.9488, lng: -57.7266 },
    { nombre: 'Puerto Aguirre (Bolivia)', lat: -18.9600, lng: -57.7400 },
    { nombre: 'CorumbÃ¡ (Brasil)', lat: -19.0094, lng: -57.6528 },
    { nombre: 'Porto Murtinho (Brasil)', lat: -21.6983, lng: -57.8805 },

    // --- ZONA MEDIA (Paraguay) ---
    { nombre: 'BahÃ­a Negra (Paraguay)', lat: -20.2286, lng: -58.1652 },
    { nombre: 'VallemÃ­ (Paraguay)', lat: -22.1585, lng: -57.9404 },
    { nombre: 'ConcepciÃ³n (Paraguay)', lat: -23.4000, lng: -57.4333 },
    { nombre: 'AsunciÃ³n (Paraguay)', lat: -25.2637, lng: -57.5759 },
    { nombre: 'Villeta (Paraguay)', lat: -25.5029, lng: -57.5786 },
    { nombre: 'San Antonio (Paraguay)', lat: -25.4233, lng: -57.5514 },
    { nombre: 'Pilar (Paraguay)', lat: -26.8622, lng: -58.2977 },

    // --- ZONA SUR (Argentina Central y Norte) ---
    { nombre: 'Formosa (Argentina)', lat: -26.1848, lng: -58.1731 },
    { nombre: 'Barranqueras (Argentina)', lat: -27.4839, lng: -58.9329 },
    { nombre: 'Corrientes (Argentina)', lat: -27.4692, lng: -58.8306 },
    { nombre: 'Reconquista (Argentina)', lat: -29.1764, lng: -59.6384 },
    { nombre: 'Santa Fe (Argentina)', lat: -31.6333, lng: -60.7000 },
    { nombre: 'Diamante (Argentina)', lat: -32.0667, lng: -60.6500 },

    // --- POLO SOJERO EXPORTADOR (Rosario y alrededores) ---
    { nombre: 'Puerto General San MartÃ­n (Argentina)', lat: -32.7246, lng: -60.7303 },
    { nombre: 'San Lorenzo (Argentina)', lat: -32.7447, lng: -60.7226 },
    { nombre: 'Rosario (Argentina)', lat: -32.9468, lng: -60.6393 },
    { nombre: 'San NicolÃ¡s (Argentina)', lat: -33.3333, lng: -60.2167 },
    { nombre: 'ZÃ¡rate / Campana (Argentina)', lat: -34.1200, lng: -58.9800 },

    // --- SALIDA AL OCÃ‰ANO (Uruguay y Buenos Aires) ---
    { nombre: 'Nueva Palmira (Uruguay)', lat: -33.8833, lng: -58.4167 },
    { nombre: 'Buenos Aires (Argentina)', lat: -34.6037, lng: -58.3816 }
  ];

  // â”€â”€ Ruta de la HidrovÃ­a (compartida entre el mapa y el motor de interpolaciÃ³n) â”€â”€â”€â”€â”€
  private readonly rutaHidrovia: L.LatLngExpression[] = [
    [-18.9667, -57.7333], // Puerto Quijarro (Bolivia)
    [-19.0094, -57.6528], // Curva CorumbÃ¡
    [-20.2286, -58.1652], // Bajando a BahÃ­a Negra
    [-21.6983, -57.8805], // Porto Murtinho
    [-22.1585, -57.9404], // VallemÃ­
    [-23.4000, -57.4333], // ConcepciÃ³n
    [-24.1833, -57.1500], // Curva antes de AsunciÃ³n
    [-25.2637, -57.5759], // AsunciÃ³n
    [-26.8622, -58.2977], // Pilar
    [-27.3167, -58.5833], // Confluencia Paraguay-ParanÃ¡
    [-27.4692, -58.8306], // Corrientes
    [-29.1764, -59.6384], // Reconquista
    [-31.6333, -60.7000], // Santa Fe
    [-32.9468, -60.6393], // Rosario
    [-33.3333, -60.2167], // San NicolÃ¡s
    [-33.8833, -58.4167], // Desembocadura Nueva Palmira
    [-34.6037, -58.3816]  // Buenos Aires
  ];

  // Formulario Reactivo para registrar un nuevo lote
  loteForm = new FormGroup(
    {
      productorId: new FormControl('11111111-2222-3333-4444-555555555555', Validators.required),
      numeroLote: new FormControl('', Validators.required),
      pesoToneladas: new FormControl('', Validators.required),
      embarcacion: new FormControl('', Validators.required),
      fechaSalida: new FormControl('', Validators.required),
      fechaEntregaEstimada: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      latitud: new FormControl(-18.96, Validators.required),
      longitud: new FormControl(-57.73, Validators.required)
    },
    { validators: fechasViajeValidator }  // â† Validador cruzado a nivel de grupo
  );
  private map: any;
  private marcadoresLayer = L.layerGroup();
  constructor(
    private loteService: LoteService,
    private cdr: ChangeDetectorRef,
    private keycloak: KeycloakService
  ) { }

  // Captura el evento de instalaciÃ³n para mostrar el botÃ³n personalizado
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault(); // Evita el mini-infobar nativo
    this.deferredPrompt = event as PwaInstallPromptEvent;
    this.canInstall = true;
    this.cdr.detectChanges();
  }

  // Se dispara cuando la app ya fue instalada
  @HostListener('window:appinstalled')
  onAppInstalled() {
    this.canInstall = false;
    this.deferredPrompt = null;
  }

  async instalarApp() {
    if (!this.deferredPrompt) return;
    await this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    console.log('Resultado instalaciÃ³n PWA:', outcome);
    this.deferredPrompt = null;
    this.canInstall = false;
  }

  // Esto se ejecuta automÃ¡ticamente al abrir la pantalla
  async ngOnInit() {
    console.log("1. La pantalla cargÃ³. DÃ¡ndole medio segundo a Keycloak para preparar el Token...");

    // â”€â”€ RBAC: Detectar roles del usuario logueado â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const roles = this.keycloak.getUserRoles();
    this.isAdmin = roles.includes('admin_logistica');
    this.isOperador = roles.includes('operador_puerto');
    this.isAuditor = roles.includes('auditor_cliente');
    console.log('Roles detectados:', roles, '| isAdmin:', this.isAdmin, '| isOperador:', this.isOperador, '| isAuditor:', this.isAuditor);

    // â”€â”€ Dashboard: Vista inicial segÃºn rol â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (this.isOperador) {
      this.vistaActual = 'formulario';
    } else if (this.isAdmin || this.isAuditor) {
      this.vistaActual = 'mapa';
    }

    // â”€â”€ Perfil de usuario: cargar desde Keycloak â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    try {
      const profile = await this.keycloak.loadUserProfile();
      this.nombreUsuario = ((profile.firstName ?? '') + ' ' + (profile.lastName ?? '')).trim()
        || profile.username
        || 'Usuario';

      if (this.isAdmin)         this.cargoUsuario = 'Gerente de LogÃ­stica';
      else if (this.isOperador) this.cargoUsuario = 'Operador de Puerto';
      else if (this.isAuditor)  this.cargoUsuario = 'Auditor Externo';

      this.fotoUrl = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(this.nombreUsuario)
        + '&background=28a745&color=fff&rounded=true&size=70';
    } catch (e) {
      console.warn('No se pudo cargar el perfil de Keycloak:', e);
      this.nombreUsuario = 'Usuario';
    }

    // Le damos un pequeÃ±o respiro de 500 milisegundos (medio segundo)
    setTimeout(() => {
      this.cargarLotes();
    }, 500);
  }
  ngAfterViewInit() {
    // Solo inicializar el mapa si el usuario es Admin o Auditor (el div existe en el DOM)
    if (this.isAdmin || this.isAuditor) {
      this.iniciarMapa();
    }
  }
  // 4. La funciÃ³n que construye el mapa
  private iniciarMapa(): void {
    // Centramos el mapa cerca de Puerto Quijarro, Bolivia (Latitud, Longitud) y nivel de zoom (6)
    this.map = L.map('mapa-trazabilidad').setView([-18.96, -57.73], 6);

    // Conectamos el mapa con los servidores gratuitos de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Â© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ãcono sutil de referencia para los puertos fijos (âš“)
    const iconPuertoRef = L.divIcon({
      html: '<div style="font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">âš“</div>',
      className: 'puerto-ref-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });

    // Renderizar los 25 puertos del catÃ¡logo como marcadores fijos de referencia
    for (const puerto of this.puertosFluviales) {
      L.marker([puerto.lat, puerto.lng], { icon: iconPuertoRef }).addTo(this.map)
        .bindPopup(`<b>${puerto.nombre}</b>`);
    }

    // Dibujar la ruta de la HidrovÃ­a Paraguay-ParanÃ¡ como lÃ­nea punteada azul
    L.polyline(this.rutaHidrovia, {
      color: '#007bff',
      weight: 4,
      dashArray: '10, 10',
      opacity: 0.8
    }).addTo(this.map);

    // Agregar la capa de marcadores dinÃ¡micos al mapa
    this.marcadoresLayer.addTo(this.map);

    // Dibujar marcadores por si los datos cargaron antes que el mapa
    this.dibujarMarcadoresEnMapa();
  }

  // FunciÃ³n para pedir los datos al backend
  cargarLotes() {
    console.log("2. Pidiendo la lista de lotes a .NET...");

    this.loteService.obtenerLotes().subscribe({
      next: (datos) => {
        console.log("3. Â¡Ã‰xito! Datos recibidos de PostgreSQL:", datos);
        this.lotes = datos; // Llenamos la tabla
        this.cdr.detectChanges();
        this.dibujarMarcadoresEnMapa();
      },
      error: (err) => {
        console.error("Hubo un error al cargar la tabla:", err);
      }
    });
  }

  guardarLote() {
    // 1. Tomamos los datos del formulario
    const datosDelFormulario = this.loteForm.value;

    // 2. Le inyectamos el usuario a la fuerza (por ahora) para que .NET no lo rechace
    const loteCompleto = {
      ...datosDelFormulario,
      usuarioRegistro: "noel.admin"
    };

    // 3. Enviamos el paquete completo
    this.loteService.registrarLote(loteCompleto).subscribe({
      next: (respuesta) => {
        alert('Â¡Ã‰xito! Lote guardado correctamente.');
        this.loteForm.reset(); // Limpiamos las casillas

        // Volvemos a poner los valores por defecto para el siguiente registro
        this.loteForm.patchValue({
          productorId: '11111111-2222-3333-4444-555555555555',
          destino: '',
          latitud: null,
          longitud: null
        });

        this.cargarLotes(); // Actualizamos la tabla
      },
      error: (err) => {
        alert('Hubo un error al guardar. Revisa la consola (F12).');
        console.error(err);
      }
    });
  }
  // â”€â”€ Dashboard: Cambiar la vista activa â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  cambiarVista(vista: string) {
    this.vistaActual = vista;
    if (vista === 'mapa' && this.map) {
      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }

  // â”€â”€ Motor de Posicionamiento DinÃ¡mico: Dibuja barcos sobre la ruta segÃºn progreso temporal â”€â”€
  dibujarMarcadoresEnMapa() {
    if (!this.map) return;

    this.marcadoresLayer.clearLayers();
    const ahora = new Date();

    const iconBarco = L.divIcon({
      html: '<div style="font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">ðŸš¢</div>',
      className: 'barco-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });

    for (const lote of this.lotes) {
      // Coordenadas de origen fijo: Puerto Quijarro (inicio de la HidrovÃ­a)
      const origenLat = -18.9667;
      const origenLng = -57.7333;

      // Analizar fechas de planificaciÃ³n del lote
      const tieneFechas = lote.fechaSalida && lote.fechaEntregaEstimada;
      let posicion: L.LatLng;
      let progresoPct = 0;
      let estadoLabel = 'En Espera';

      if (tieneFechas) {
        const fechaSalida = new Date(lote.fechaSalida);
        const fechaEntrega = new Date(lote.fechaEntregaEstimada);

        if (ahora < fechaSalida) {
          // AÃºn no saliÃ³: aparece en el puerto de origen
          posicion = L.latLng(origenLat, origenLng);
          progresoPct = 0;
          estadoLabel = 'â³ En Puerto (Pendiente)';
        } else if (ahora >= fechaEntrega) {
          // Ya llegÃ³: aparece en el destino registrado
          posicion = L.latLng(lote.latitud ?? origenLat, lote.longitud ?? origenLng);
          progresoPct = 100;
          estadoLabel = 'âœ… Entregado';
        } else {
          // En trÃ¡nsito: interpolar sobre la ruta de la HidrovÃ­a
          const duracionTotal = fechaEntrega.getTime() - fechaSalida.getTime();
          const tiempoTranscurrido = ahora.getTime() - fechaSalida.getTime();
          const progresoDecimal = Math.min(1, Math.max(0, tiempoTranscurrido / duracionTotal));
          progresoPct = Math.round(progresoDecimal * 100);
          posicion = this.interpolarEnRuta(this.rutaHidrovia, progresoDecimal);
          estadoLabel = 'ðŸš¢ En TrÃ¡nsito';
        }
      } else if (lote.latitud && lote.longitud) {
        // Sin fechas: usar coordenadas estÃ¡ticas del lote (comportamiento anterior)
        posicion = L.latLng(lote.latitud, lote.longitud);
        estadoLabel = 'ðŸš¢ En TrÃ¡nsito';
      } else {
        continue; // Sin datos geogrÃ¡ficos: omitir
      }

      // Formatear ETA para el popup
      const etaTexto = lote.fechaEntregaEstimada
        ? new Date(lote.fechaEntregaEstimada).toLocaleDateString('es-PY', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : 'N/D';

      const popupContent =
        `<div style="min-width: 180px; font-family: 'Segoe UI', sans-serif;">
          <b style="color:#1a3a5c; font-size:14px;">${lote.numeroLote}</b><br>
          <span style="color:#555;">Barcaza:</span> <b>${lote.embarcacion ?? 'N/D'}</b><br>
          <span style="color:#555;">Destino:</span> ${lote.destino}<br>
          <span style="color:#555;">Progreso:</span> <b>${progresoPct}%</b><br>
          <span style="color:#555;">Estado:</span> <span style="color:#28a745; font-weight:600;">${estadoLabel}</span><br>
          <span style="color:#555;">ETA:</span> <b>${etaTexto}</b>
        </div>`;

      L.marker([posicion.lat, posicion.lng], { icon: iconBarco })
        .bindPopup(popupContent)
        .addTo(this.marcadoresLayer);
    }
  }

  // â”€â”€ Helper: Interpola un punto sobre una polilÃ­nea dada un progreso 0.0â€“1.0 â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Usa distanciaTotal real (mÃ©trica) para un posicionamiento geogrÃ¡ficamente preciso.
  private interpolarEnRuta(ruta: L.LatLngExpression[], progreso: number): L.LatLng {
    if (progreso <= 0) return L.latLng(ruta[0] as L.LatLngTuple);
    if (progreso >= 1) return L.latLng(ruta[ruta.length - 1] as L.LatLngTuple);

    // Calcular la longitud de cada segmento y la distancia total
    const segmentos: number[] = [];
    let distanciaTotal = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
      const a = L.latLng(ruta[i] as L.LatLngTuple);
      const b = L.latLng(ruta[i + 1] as L.LatLngTuple);
      const d = a.distanceTo(b);
      segmentos.push(d);
      distanciaTotal += d;
    }

    // Recorrer segmentos hasta alcanzar la distancia objetivo
    const distanciaObjetivo = distanciaTotal * progreso;
    let acumulado = 0;
    for (let i = 0; i < segmentos.length; i++) {
      if (acumulado + segmentos[i] >= distanciaObjetivo) {
        // InterpolaciÃ³n lineal dentro del segmento encontrado
        const t = (distanciaObjetivo - acumulado) / segmentos[i];
        const a = ruta[i] as [number, number];
        const b = ruta[i + 1] as [number, number];
        return L.latLng(
          a[0] + (b[0] - a[0]) * t,
          a[1] + (b[1] - a[1]) * t
        );
      }
      acumulado += segmentos[i];
    }

    return L.latLng(ruta[ruta.length - 1] as L.LatLngTuple);
  }

  // â”€â”€ MÃ©todo para autocompletar coordenadas al seleccionar un puerto â”€â”€â”€â”€â”€â”€â”€â”€
  alCambiarDestino(event: Event) {
    const nombreSeleccionado = (event.target as HTMLSelectElement).value;
    const puerto = this.puertosFluviales.find(p => p.nombre === nombreSeleccionado);
    if (puerto) {
      this.loteForm.patchValue({
        latitud: puerto.lat,
        longitud: puerto.lng
      });
    }
  }

  cerrarSesion() {
    // Esto destruye la sesiÃ³n y te devuelve a la pantalla de login de Keycloak
    this.keycloak.logout(window.location.origin);
  }

  // â”€â”€ Mapa: Volar a la ubicaciÃ³n de un lote especÃ­fico â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  verEnMapa(lote: any) {
    if (!lote.latitud || !lote.longitud) return;

    // 1. Cambiar a la vista del mapa
    this.cambiarVista('mapa');

    // 2. Esperar 200ms para que el contenedor del mapa se renderice
    setTimeout(() => {
      // 3. Corregir el tamaÃ±o del mapa por si estaba oculto
      this.map.invalidateSize();

      // 4. Animar el vuelo hacia las coordenadas del lote
      this.map.flyTo([lote.latitud, lote.longitud], 10, { animate: true, duration: 1.5 });

      // 5. Abrir un popup resaltando el lote seleccionado
      L.popup()
        .setLatLng([lote.latitud, lote.longitud])
        .setContent(
          '<b>' + lote.numeroLote + '</b><br>' +
          'Destino: ' + lote.destino + '<br>' +
          '<span style="color:#28a745; font-weight:600;">ðŸš¢ Lote Seleccionado</span>'
        )
        .openOn(this.map);
    }, 200);
  }

  // â”€â”€ AuditorÃ­a: Exportar PDF con jsPDF + autoTable â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  exportarAuditoriaPDF() {
    const doc = new jsPDF();
    const fechaHoy = new Date().toLocaleString('es-PY', { timeZone: 'America/Asuncion' });

    // â”€â”€ Encabezado corporativo â”€â”€
    doc.setFillColor(26, 58, 92);           // color #1a3a5c
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('GRAVETAL â€” Sistema STAD', 14, 13);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Reporte de AuditorÃ­a del Sistema', 14, 21);
    doc.text(`Generado: ${fechaHoy}`, 14, 27);

    // â”€â”€ Datos del administrador â”€â”€
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Exportado por:', 14, 42);
    doc.setFont('helvetica', 'normal');
    doc.text(this.nombreUsuario + ' (' + this.cargoUsuario + ')', 50, 42);

    // â”€â”€ Tabla de auditorÃ­a â”€â”€
    autoTable(doc, {
      startY: 50,
      head: [['Fecha / Hora', 'Usuario', 'AcciÃ³n', 'DirecciÃ³n IP']],
      body: this.registrosAuditoria.map(r => [r.fecha, r.usuario, r.accion, r.ip]),
      headStyles: {
        fillColor: [26, 58, 92],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: { fontSize: 8.5, textColor: 40 },
      alternateRowStyles: { fillColor: [240, 247, 255] },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 90 },
        3: { cellWidth: 30 }
      },
      margin: { left: 14, right: 14 }
    });

    // â”€â”€ Pie de pÃ¡gina â”€â”€
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7.5);
      doc.setTextColor(150);
      doc.text(`PÃ¡gina ${i} de ${totalPages}  |  GRAVETAL S.A. â€” Confidencial`, 14, 290);
    }

    doc.save(`STAD_Auditoria_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}

