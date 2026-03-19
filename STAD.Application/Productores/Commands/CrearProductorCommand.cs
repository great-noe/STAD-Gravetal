using MediatR;
using System;

namespace STAD.Application.Productores.Commands;

public record CrearProductorCommand(
    string NombreRazonSocial,
    string NIT,
    string Ubicacion
) : IRequest<Guid>;
