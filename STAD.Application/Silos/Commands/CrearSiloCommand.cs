using MediatR;
using System;

namespace STAD.Application.Silos.Commands;

public record CrearSiloCommand(
    string NombreSilo,
    decimal CapacidadMaximaTon
) : IRequest<Guid>;
