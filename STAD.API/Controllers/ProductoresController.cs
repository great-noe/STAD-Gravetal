using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STAD.Application.Productores.Commands;

namespace STAD.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize] // Seguridad JWT con Keycloak
public class ProductoresController : ControllerBase
{
    private readonly IMediator _mediator;

    // Solo inyectamos MediatR, ya no tocamos la base de datos directamente
    public ProductoresController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> RegistrarProductor([FromBody] CrearProductorCommand command)
    {
        var productorId = await _mediator.Send(command);

        return Ok(new
        {
            Mensaje = "Productor registrado exitosamente",
            ProductorId = productorId
        });
    }
}
