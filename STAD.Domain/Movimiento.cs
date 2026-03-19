using System;

namespace STAD.Domain.Entities;

public class Movimiento
{
    // UUID v7 para ordenamiento cronológico en BD
    public Guid Id { get; private set; }

    // FK obligatoria al lote de soya que se está moviendo
    public Guid LoteId { get; private set; }
    public Lote Lote { get; private set; } = null!;

    // FK opcional al silo (puede ser null si el movimiento no involucra un silo)
    public Guid? SiloId { get; private set; }
    public Silo? Silo { get; private set; }

    // Datos del movimiento
    public string TipoMovimiento { get; private set; } = string.Empty; // Ej: "INGRESO_SILO", "SALIDA_SILO", "DESPACHO"
    public DateTime FechaHora { get; private set; }
    public decimal PesoManejado { get; private set; }
    public string UsuarioRegistro { get; private set; } = string.Empty;

    // Constructor vacío (Requerido por Entity Framework Core)
    protected Movimiento() { }

    // Constructor controlado para registrar un nuevo movimiento desde la API
    public Movimiento(Guid loteId, Guid? siloId, string tipoMovimiento, decimal pesoManejado, string usuarioRegistro)
    {
        Id = Guid.CreateVersion7();

        LoteId = loteId;
        SiloId = siloId;
        TipoMovimiento = tipoMovimiento;
        FechaHora = DateTime.UtcNow; // Timestamp automático al momento del registro
        PesoManejado = pesoManejado;
        UsuarioRegistro = usuarioRegistro;
    }
}
