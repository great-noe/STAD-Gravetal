using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;

namespace STAD.Application.Silos.Commands;

public class CrearSiloCommandHandler : IRequestHandler<CrearSiloCommand, Guid>
{
    private readonly ISiloRepository _repository;

    // Inyectamos el repositorio (Inversión de Dependencias)
    public CrearSiloCommandHandler(ISiloRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CrearSiloCommand request, CancellationToken cancellationToken)
    {
        // 1. Convertimos el "Comando" en una "Entidad" real de negocio
        var nuevoSilo = new Silo(
            request.NombreSilo,
            request.CapacidadMaximaTon
        );

        // 2. Usamos el contrato para guardar (El Handler no sabe que es Postgres)
        await _repository.AddAsync(nuevoSilo);
        await _repository.SaveChangesAsync();

        // 3. Retornamos el ID recién generado
        return nuevoSilo.Id;
    }
}
