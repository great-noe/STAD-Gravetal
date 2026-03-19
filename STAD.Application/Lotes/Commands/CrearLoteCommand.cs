using MediatR;
using System;

namespace STAD.Application.Lotes.Commands;

public record CrearLoteCommand(
    Guid ProductorId,
    string NumeroLote,
    decimal PesoToneladas,
    string Destino,
    string UsuarioRegistro
) : IRequest<Guid>;