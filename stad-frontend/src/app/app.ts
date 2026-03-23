import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { LoteService } from './services/lote';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  lotes: any[] = []; // Aquí guardaremos la "fotografía" de la base de datos

  constructor(private loteService: LoteService, private cdr: ChangeDetectorRef) { }

  // Esto se ejecuta automáticamente al abrir la pantalla
  ngOnInit() {
    console.log("1. La pantalla cargó. Dándole medio segundo a Keycloak para preparar el Token...");

    // Le damos un pequeño respiro de 500 milisegundos (medio segundo)
    setTimeout(() => {
      this.cargarLotes();
    }, 500);
  }

  // Función para pedir los datos al backend
  cargarLotes() {
    console.log("2. Pidiendo la lista de lotes a .NET...");

    this.loteService.obtenerLotes().subscribe({
      next: (datos) => {
        console.log("3. ¡Éxito! Datos recibidos de PostgreSQL:", datos);
        this.lotes = datos; // Llenamos la tabla
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Hubo un error al cargar la tabla:", err);
      }
    });
  }

  enviarSoyaDePrueba() {
    const nuevoLote = {
      productorId: "11111111-2222-3333-4444-555555555555", // (Asegúrate de dejar tu ID real aquí)
      numeroLote: "L-ANGULAR-" + Math.floor(Math.random() * 1000), // Genera un número al azar para que no se repita
      pesoToneladas: 150.5,
      destino: "Puerto Rosario",
      usuarioRegistro: "noel.admin"
    };

    this.loteService.registrarLote(nuevoLote).subscribe({
      next: (respuesta) => {
        alert("¡Éxito! Lote guardado.");
        this.cargarLotes(); // <--- ¡LA MAGIA! Volvemos a pedir los datos para actualizar la tabla
      },
      error: (err) => {
        alert("Hubo un error al guardar. Revisa la consola (F12).");
        console.error(err);
      }
    });
  }
}
