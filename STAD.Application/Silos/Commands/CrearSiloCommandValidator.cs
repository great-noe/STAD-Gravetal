using FluentValidation;

namespace STAD.Application.Silos.Commands;

public class CrearSiloCommandValidator : AbstractValidator<CrearSiloCommand>
{
    public CrearSiloCommandValidator()
    {
        RuleFor(x => x.NombreSilo)
            .NotEmpty().WithMessage("El nombre del silo es obligatorio.")
            .MaximumLength(50).WithMessage("El nombre del silo no puede exceder los 50 caracteres.");

        RuleFor(x => x.CapacidadMaximaTon)
            .GreaterThan(0).WithMessage("La capacidad máxima debe ser mayor a 0 toneladas.")
            .LessThanOrEqualTo(100000).WithMessage("La capacidad máxima no puede exceder las 100,000 toneladas.");
    }
}
