using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STAD.Application.Silos.Commands;

namespace STAD.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize] // Seguridad JWT con Keycloak
public class SilosController : ControllerBase
{
    private readonly IMediator _mediator;

    // Solo inyectamos MediatR, ya no tocamos la base de datos directamente
    public SilosController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> RegistrarSilo([FromBody] CrearSiloCommand command)
    {
        var siloId = await _mediator.Send(command);

        return Ok(new
        {
            Mensaje = "Silo registrado exitosamente",
            SiloId = siloId
        });
    }
}
