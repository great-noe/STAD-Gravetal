using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;

namespace STAD.Application.Productores.Commands;

public class CrearProductorCommandHandler : IRequestHandler<CrearProductorCommand, Guid>
{
    private readonly IProductorRepository _repository;

    // Inyectamos el repositorio (Inversión de Dependencias)
    public CrearProductorCommandHandler(IProductorRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CrearProductorCommand request, CancellationToken cancellationToken)
    {
        // 1. Convertimos el "Comando" en una "Entidad" real de negocio
        var nuevoProductor = new Productor(
            request.NombreRazonSocial,
            request.NIT,
            request.Ubicacion
        );

        // 2. Usamos el contrato para guardar (El Handler no sabe que es Postgres)
        await _repository.AddAsync(nuevoProductor);
        await _repository.SaveChangesAsync();

        // 3. Retornamos el ID recién generado
        return nuevoProductor.Id;
    }
}
