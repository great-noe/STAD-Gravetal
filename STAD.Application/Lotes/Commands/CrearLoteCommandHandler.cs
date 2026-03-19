using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;

namespace STAD.Application.Lotes.Commands;

// IRequestHandler indica que esta clase maneja el CrearLoteCommand y devuelve un Guid (el ID)
public class CrearLoteCommandHandler : IRequestHandler<CrearLoteCommand, Guid>
{
    private readonly ILoteRepository _repository;

    // Inyectamos el repositorio (Inversión de Dependencias)
    public CrearLoteCommandHandler(ILoteRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CrearLoteCommand request, CancellationToken cancellationToken)
    {
        // 1. Convertimos el "Comando" en una "Entidad" real de negocio
        var nuevoLote = new Lote(
            request.NumeroLote,
            request.PesoToneladas,
            request.Destino,
            request.UsuarioRegistro
        );

        // 2. Usamos el contrato para guardar (El Handler no sabe que es Postgres)
        await _repository.AddAsync(nuevoLote);
        await _repository.SaveChangesAsync();

        // 3. Retornamos el ID recién generado
        return nuevoLote.Id;
    }
}