import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoteService } from './services/lote';
import { KeycloakService } from 'keycloak-angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {

  lotes: any[] = []; // Aquí guardaremos la "fotografía" de la base de datos

  // ── RBAC: Variables de rol ──────────────────────────────────────────────────
  isAdmin: boolean = false;
  isOperador: boolean = false;
  isAuditor: boolean = false;

  // ── Puertos fluviales de la Hidrovía Paraguay-Paraná ───────────────────────
  // Catálogo maestro de Puertos de la Hidrovía Paraguay-Paraná
  puertosFluviales = [
    // --- ZONA NORTE (Bolivia y Brasil) ---
    { nombre: 'Puerto Quijarro (Bolivia)', lat: -18.9667, lng: -57.7333 },
    { nombre: 'Puerto Jennefer (Bolivia)', lat: -18.9488, lng: -57.7266 },
    { nombre: 'Puerto Aguirre (Bolivia)', lat: -18.9600, lng: -57.7400 },
    { nombre: 'Corumbá (Brasil)', lat: -19.0094, lng: -57.6528 },
    { nombre: 'Porto Murtinho (Brasil)', lat: -21.6983, lng: -57.8805 },

    // --- ZONA MEDIA (Paraguay) ---
    { nombre: 'Bahía Negra (Paraguay)', lat: -20.2286, lng: -58.1652 },
    { nombre: 'Vallemí (Paraguay)', lat: -22.1585, lng: -57.9404 },
    { nombre: 'Concepción (Paraguay)', lat: -23.4000, lng: -57.4333 },
    { nombre: 'Asunción (Paraguay)', lat: -25.2637, lng: -57.5759 },
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
    { nombre: 'Puerto General San Martín (Argentina)', lat: -32.7246, lng: -60.7303 },
    { nombre: 'San Lorenzo (Argentina)', lat: -32.7447, lng: -60.7226 },
    { nombre: 'Rosario (Argentina)', lat: -32.9468, lng: -60.6393 },
    { nombre: 'San Nicolás (Argentina)', lat: -33.3333, lng: -60.2167 },
    { nombre: 'Zárate / Campana (Argentina)', lat: -34.1200, lng: -58.9800 },

    // --- SALIDA AL OCÉANO (Uruguay y Buenos Aires) ---
    { nombre: 'Nueva Palmira (Uruguay)', lat: -33.8833, lng: -58.4167 },
    { nombre: 'Buenos Aires (Argentina)', lat: -34.6037, lng: -58.3816 }
  ];

  // Formulario Reactivo para registrar un nuevo lote
  loteForm = new FormGroup({
    productorId: new FormControl('11111111-2222-3333-4444-555555555555', Validators.required),
    numeroLote: new FormControl('', Validators.required),
    pesoToneladas: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    latitud: new FormControl(-18.96, Validators.required),
    longitud: new FormControl(-57.73, Validators.required)
  });
  private map: any;
  private marcadoresLayer = L.layerGroup();
  constructor(
    private loteService: LoteService,
    private cdr: ChangeDetectorRef,
    private keycloak: KeycloakService
  ) { }

  // Esto se ejecuta automáticamente al abrir la pantalla
  ngOnInit() {
    console.log("1. La pantalla cargó. Dándole medio segundo a Keycloak para preparar el Token...");

    // ── RBAC: Detectar roles del usuario logueado ──────────────────────────
    const roles = this.keycloak.getUserRoles();
    this.isAdmin = roles.includes('admin_logistica');
    this.isOperador = roles.includes('operador_puerto');
    this.isAuditor = roles.includes('auditor_cliente');
    console.log('Roles detectados:', roles, '| isAdmin:', this.isAdmin, '| isOperador:', this.isOperador, '| isAuditor:', this.isAuditor);

    // Le damos un pequeño respiro de 500 milisegundos (medio segundo)
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
  // 4. La función que construye el mapa
  private iniciarMapa(): void {
    // Centramos el mapa cerca de Puerto Quijarro, Bolivia (Latitud, Longitud) y nivel de zoom (6)
    this.map = L.map('mapa-trazabilidad').setView([-18.96, -57.73], 6);

    // Conectamos el mapa con los servidores gratuitos de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ícono sutil de referencia para los puertos fijos (⚓)
    const iconPuertoRef = L.divIcon({
      html: '<div style="font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">⚓</div>',
      className: 'puerto-ref-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });

    // Renderizar los 25 puertos del catálogo como marcadores fijos de referencia
    for (const puerto of this.puertosFluviales) {
      L.marker([puerto.lat, puerto.lng], { icon: iconPuertoRef }).addTo(this.map)
        .bindPopup(`<b>${puerto.nombre}</b>`);
    }

    // Dibujar la ruta de la Hidrovía Paraguay-Paraná como línea punteada azul
    const rutaHidrovia: L.LatLngExpression[] = [
      [-18.9667, -57.7333], // Puerto Quijarro (Bolivia)
      [-19.0094, -57.6528], // Curva Corumbá
      [-20.2286, -58.1652], // Bajando a Bahía Negra
      [-21.6983, -57.8805], // Porto Murtinho
      [-22.1585, -57.9404], // Vallemí
      [-23.4000, -57.4333], // Concepción
      [-24.1833, -57.1500], // Curva antes de Asunción
      [-25.2637, -57.5759], // Asunción
      [-26.8622, -58.2977], // Pilar
      [-27.3167, -58.5833], // Confluencia de los ríos Paraguay y Paraná
      [-27.4692, -58.8306], // Corrientes
      [-29.1764, -59.6384], // Reconquista
      [-31.6333, -60.7000], // Santa Fe
      [-32.9468, -60.6393], // Rosario
      [-33.3333, -60.2167], // San Nicolás
      [-33.8833, -58.4167], // Desembocadura Nueva Palmira
      [-34.6037, -58.3816]  // Buenos Aires
    ];

    L.polyline(rutaHidrovia, {
      color: '#007bff',
      weight: 4,
      dashArray: '10, 10',
      opacity: 0.8
    }).addTo(this.map);

    // Agregar la capa de marcadores dinámicos al mapa
    this.marcadoresLayer.addTo(this.map);

    // Dibujar marcadores por si los datos cargaron antes que el mapa
    this.dibujarMarcadoresEnMapa();
  }

  // Función para pedir los datos al backend
  cargarLotes() {
    console.log("2. Pidiendo la lista de lotes a .NET...");

    this.loteService.obtenerLotes().subscribe({
      next: (datos) => {
        console.log("3. ¡Éxito! Datos recibidos de PostgreSQL:", datos);
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
        alert('¡Éxito! Lote guardado correctamente.');
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
  // Dibuja marcadores dinámicos en el mapa basándose en los lotes cargados
  dibujarMarcadoresEnMapa() {
    if (!this.map) return; // Validar que el mapa ya esté inicializado

    // Limpiar marcadores anteriores
    this.marcadoresLayer.clearLayers();

    const iconBarco = L.divIcon({
      html: '<div style="font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">🚢</div>',
      className: 'barco-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });

    // Recorrer los lotes y agregar un marcador por cada uno con coordenadas
    for (const lote of this.lotes) {
      if (lote.latitud && lote.longitud) {
        L.marker([lote.latitud, lote.longitud], { icon: iconBarco })
          .bindPopup(`<b>${lote.numeroLote}</b><br>Destino: ${lote.destino}`)
          .addTo(this.marcadoresLayer);
      }
    }
  }

  // ── Método para autocompletar coordenadas al seleccionar un puerto ────────
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
    // Esto destruye la sesión y te devuelve a la pantalla de login de Keycloak
    this.keycloak.logout(window.location.origin);
  }
}
