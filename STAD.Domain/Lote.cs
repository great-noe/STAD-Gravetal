using System;

namespace STAD.Domain.Entities;

public class Lote
{
    // Criterio de Evaluación: UUID v7 para ordenamiento cronológico en BD
    public Guid Id { get; private set; }

    // FK al productor que entrega este lote de soya
    public Guid ProductorId { get; private set; }
    public Productor Productor { get; private set; } = null!;

    // Datos del negocio (Gravetal)
    public string NumeroLote { get; private set; } = string.Empty;
    public decimal PesoToneladas { get; private set; }
    public DateTime FechaAcopio { get; private set; }
    public string Destino { get; private set; } = string.Empty; // Ej: "Puerto Quijarro", "Rosario"
    public string Estado { get; private set; } = string.Empty;  // Ej: "EN_ACOPIO", "EN_TRANSITO", "EXPORTADO"

    // Criterio de Evaluación: Auditoría y Trazabilidad de cambios
    public DateTime FechaRegistro { get; private set; }
    public string UsuarioRegistro { get; private set; } = string.Empty; // Aquí guardaremos el ID del usuario de Keycloak

    // Constructor vacío (Requerido por Entity Framework Core)
    protected Lote() { }

    // Constructor controlado para crear un nuevo lote desde la API
    public Lote(Guid productorId, string numeroLote, decimal pesoToneladas, string destino, string usuarioRegistro)
    {
        // .NET 9 incluye soporte nativo para UUID v7, ideal para bases de datos de alto volumen
        Id = Guid.CreateVersion7();

        ProductorId = productorId;
        NumeroLote = numeroLote;
        PesoToneladas = pesoToneladas;
        FechaAcopio = DateTime.UtcNow;
        Destino = destino;
        Estado = "EN_ACOPIO"; // Estado inicial por defecto

        FechaRegistro = DateTime.UtcNow;
        UsuarioRegistro = usuarioRegistro;
    }

    // Método para actualizar el estado cuando el grano sube a la barcaza
    public void ActualizarEstado(string nuevoEstado, string usuarioModificacion)
    {
        Estado = nuevoEstado;
        FechaRegistro = DateTime.UtcNow;
        UsuarioRegistro = usuarioModificacion;
    }
}