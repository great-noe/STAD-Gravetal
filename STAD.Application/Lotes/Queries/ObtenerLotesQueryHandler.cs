using MediatR;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace STAD.Application.Lotes.Queries;

// El trabajador que busca los lotes cuando recibe el mensaje
public class ObtenerLotesQueryHandler : IRequestHandler<ObtenerLotesQuery, List<Lote>>
{
	private readonly ILoteRepository _repository;

	public ObtenerLotesQueryHandler(ILoteRepository repository)
	{
		_repository = repository;
	}

	public async Task<List<Lote>> Handle(ObtenerLotesQuery request, CancellationToken cancellationToken)
	{
		return await _repository.ObtenerTodosAsync();
	}
}