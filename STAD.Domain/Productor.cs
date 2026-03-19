using System;
using System.Collections.Generic;

namespace STAD.Domain.Entities;

public class Productor
{
    // UUID v7 para ordenamiento cronológico en BD
    public Guid Id { get; private set; }

    // Datos del productor/proveedor de grano
    public string NombreRazonSocial { get; private set; } = string.Empty;
    public string NIT { get; private set; } = string.Empty;
    public string Ubicacion { get; private set; } = string.Empty;
    public string Estado { get; private set; } = string.Empty;

    // Relación uno a muchos: Un productor puede entregar múltiples lotes de soya
    public ICollection<Lote> Lotes { get; private set; } = new List<Lote>();

    // Constructor vacío (Requerido por Entity Framework Core)
    protected Productor() { }

    // Constructor controlado para crear un nuevo productor desde la API
    public Productor(string nombreRazonSocial, string nit, string ubicacion)
    {
        Id = Guid.CreateVersion7();

        NombreRazonSocial = nombreRazonSocial;
        NIT = nit;
        Ubicacion = ubicacion;
        Estado = "ACTIVO"; // Estado inicial por defecto
    }

    // Método para actualizar el estado del productor
    public void ActualizarEstado(string nuevoEstado)
    {
        Estado = nuevoEstado;
    }
}
