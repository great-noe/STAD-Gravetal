using FluentValidation;

namespace STAD.Application.Movimientos.Commands;

public class CrearMovimientoCommandValidator : AbstractValidator<CrearMovimientoCommand>
{
    public CrearMovimientoCommandValidator()
    {
        RuleFor(x => x.LoteId)
            .NotEmpty().WithMessage("El ID del lote es obligatorio.");

        RuleFor(x => x.TipoMovimiento)
            .NotEmpty().WithMessage("El tipo de movimiento es obligatorio.")
            .MaximumLength(50).WithMessage("El tipo de movimiento no puede exceder los 50 caracteres.");

        RuleFor(x => x.PesoManejado)
            .GreaterThan(0).WithMessage("El peso manejado debe ser mayor a 0.")
            .LessThanOrEqualTo(50000).WithMessage("El peso manejado no puede exceder las 50,000 toneladas.");

        RuleFor(x => x.UsuarioRegistro)
            .NotEmpty().WithMessage("Se requiere identificar al usuario que realiza el registro.")
            .MaximumLength(100).WithMessage("El usuario de registro no puede exceder los 100 caracteres.");
    }
}
