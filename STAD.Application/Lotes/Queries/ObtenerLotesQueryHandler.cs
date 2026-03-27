using MediatR;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace STAD.Application.Lotes.Queries;

// El trabajador que busca los lotes cuando recibe el mensaje
public class ObtenerLotesQueryHandler : IRequestHandler<ObtenerLotesQuery, List<LoteDto>>
{
	private readonly ILoteRepository _repository;

	public ObtenerLotesQueryHandler(ILoteRepository repository)
	{
		_repository = repository;
	}

	public async Task<List<LoteDto>> Handle(ObtenerLotesQuery request, CancellationToken cancellationToken)
	{
		var lotes = await _repository.ObtenerTodosAsync();

		// Mapeo explícito de la Entidad de Dominio al DTO de lectura
		return lotes.Select(lote => new LoteDto(
			lote.Id,
			lote.ProductorId,
			lote.NumeroLote,
			lote.PesoToneladas,
			lote.FechaAcopio,
			lote.Destino,
			lote.Estado,
			lote.Latitud,
			lote.Longitud,
			lote.FechaRegistro,
			lote.UsuarioRegistro
		)).ToList();
	}
}