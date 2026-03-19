using MediatR;
using System;

namespace STAD.Application.Movimientos.Commands;

public record CrearMovimientoCommand(
    Guid LoteId,
    Guid? SiloId,
    string TipoMovimiento,
    decimal PesoManejado,
    string UsuarioRegistro
) : IRequest<Guid>;
