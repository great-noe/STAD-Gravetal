using System;

namespace STAD.Domain.Entities;

public class Silo
{
    // UUID v7 para ordenamiento cronológico en BD
    public Guid Id { get; private set; }

    // Datos del silo de almacenamiento
    public string NombreSilo { get; private set; } = string.Empty;
    public decimal CapacidadMaximaTon { get; private set; }
    public decimal CapacidadActualTon { get; private set; }
    public string Estado { get; private set; } = string.Empty;

    // Constructor vacío (Requerido por Entity Framework Core)
    protected Silo() { }

    // Constructor controlado para crear un nuevo silo desde la API
    public Silo(string nombreSilo, decimal capacidadMaximaTon)
    {
        Id = Guid.CreateVersion7();

        NombreSilo = nombreSilo;
        CapacidadMaximaTon = capacidadMaximaTon;
        CapacidadActualTon = 0; // Silo vacío al momento de crearse
        Estado = "DISPONIBLE"; // Estado inicial por defecto
    }

    // Método para actualizar la capacidad actual cuando se almacena grano
    public void ActualizarCapacidad(decimal nuevaCapacidadTon)
    {
        CapacidadActualTon = nuevaCapacidadTon;
    }

    // Método para actualizar el estado del silo
    public void ActualizarEstado(string nuevoEstado)
    {
        Estado = nuevoEstado;
    }
}
