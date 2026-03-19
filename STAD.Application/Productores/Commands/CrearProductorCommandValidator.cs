using FluentValidation;

namespace STAD.Application.Productores.Commands;

public class CrearProductorCommandValidator : AbstractValidator<CrearProductorCommand>
{
    public CrearProductorCommandValidator()
    {
        RuleFor(x => x.NombreRazonSocial)
            .NotEmpty().WithMessage("La razón social es obligatoria.")
            .MaximumLength(100).WithMessage("La razón social no puede exceder los 100 caracteres.");

        RuleFor(x => x.NIT)
            .NotEmpty().WithMessage("El NIT es obligatorio.")
            .MaximumLength(20).WithMessage("El NIT no puede exceder los 20 caracteres.");

        RuleFor(x => x.Ubicacion)
            .NotEmpty().WithMessage("La ubicación es obligatoria.")
            .MaximumLength(150).WithMessage("La ubicación no puede exceder los 150 caracteres.");
    }
}
