using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;

namespace STAD.Application.Movimientos.Commands;

public class CrearMovimientoCommandHandler : IRequestHandler<CrearMovimientoCommand, Guid>
{
    private readonly IMovimientoRepository _repository;

    // Inyectamos el repositorio (Inversión de Dependencias)
    public CrearMovimientoCommandHandler(IMovimientoRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CrearMovimientoCommand request, CancellationToken cancellationToken)
    {
        // 1. Convertimos el "Comando" en una "Entidad" real de negocio
        var nuevoMovimiento = new Movimiento(
            request.LoteId,
            request.SiloId,
            request.TipoMovimiento,
            request.PesoManejado,
            request.UsuarioRegistro
        );

        // 2. Usamos el contrato para guardar (El Handler no sabe que es Postgres)
        await _repository.AddAsync(nuevoMovimiento);
        await _repository.SaveChangesAsync();

        // 3. Retornamos el ID recién generado
        return nuevoMovimiento.Id;
    }
}
