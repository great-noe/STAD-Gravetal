using MediatR;
using System;

namespace STAD.Application.Lotes.Commands;

// IRequest<Guid> significa que este comando, al terminar con éxito, nos devolverá el ID del nuevo lote
public record CrearLoteCommand(
    string NumeroLote,
    decimal PesoToneladas,
    string Destino,
    string UsuarioRegistro) : IRequest<Guid>;