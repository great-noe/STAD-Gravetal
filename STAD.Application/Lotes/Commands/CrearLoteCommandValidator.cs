using FluentValidation;

namespace STAD.Application.Lotes.Commands;

public class CrearLoteCommandValidator : AbstractValidator<CrearLoteCommand>
{
    public CrearLoteCommandValidator()
    {
        RuleFor(x => x.NumeroLote)
            .NotEmpty().WithMessage("El número de lote es obligatorio.")
            .MaximumLength(50).WithMessage("El número de lote no puede exceder los 50 caracteres.");

        RuleFor(x => x.PesoToneladas)
            .GreaterThan(0).WithMessage("El peso en toneladas debe ser mayor a 0.")
            .LessThanOrEqualTo(5000).WithMessage("Un lote no puede exceder las 5000 toneladas (capacidad máxima de barcaza).");

        RuleFor(x => x.Destino)
            .NotEmpty().WithMessage("El destino es obligatorio.");

        RuleFor(x => x.UsuarioRegistro)
            .NotEmpty().WithMessage("Se requiere identificar al usuario que realiza el registro.");
    }
}