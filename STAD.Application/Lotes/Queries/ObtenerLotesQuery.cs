using MediatR;
using STAD.Domain.Entities;
using System.Collections.Generic;

namespace STAD.Application.Lotes.Queries;

// El mensaje que pide la lista de lotes
public record ObtenerLotesQuery() : IRequest<List<Lote>>;