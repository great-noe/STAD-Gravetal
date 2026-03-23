using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STAD.Application.Lotes.Commands;
using STAD.Application.Lotes.Queries;
using System.Threading.Tasks;

namespace STAD.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize] // El guardia de Keycloak sigue aquí
public class LotesController : ControllerBase
{
    private readonly IMediator _mediator;

    // Solo inyectamos MediatR, ya no tocamos la base de datos directamente
    public LotesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> RegistrarLoteDeSoya([FromBody] CrearLoteCommand command)
    {
        // MediatR toma el "sobre", busca a su "trabajador" (Handler) y le devuelve el ID
        var loteId = await _mediator.Send(command);

        return Ok(new
        {
            Mensaje = "Lote de soya registrado exitosamente usando CQRS",
            LoteId = loteId
        });
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerTodosLosLotes()
    {
        var query = new ObtenerLotesQuery();
        var lotes = await _mediator.Send(query);
        return Ok(lotes);
    }
}
