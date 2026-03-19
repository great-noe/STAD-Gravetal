using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STAD.Application.Movimientos.Commands;

namespace STAD.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize] // Seguridad JWT con Keycloak
public class MovimientosController : ControllerBase
{
    private readonly IMediator _mediator;

    // Solo inyectamos MediatR, ya no tocamos la base de datos directamente
    public MovimientosController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> RegistrarMovimiento([FromBody] CrearMovimientoCommand command)
    {
        var movimientoId = await _mediator.Send(command);

        return Ok(new
        {
            Mensaje = "Movimiento registrado exitosamente",
            MovimientoId = movimientoId
        });
    }
}
