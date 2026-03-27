namespace STAD.Application.Lotes.Queries;

// Modelo de lectura (DTO) para devolver datos de Lote al frontend
public record LoteDto(
    Guid Id,
    Guid ProductorId,
    string NumeroLote,
    decimal PesoToneladas,
    DateTime FechaAcopio,
    string Destino,
    string Estado,
    double Latitud,
    double Longitud,
    DateTime FechaRegistro,
    string UsuarioRegistro
);
