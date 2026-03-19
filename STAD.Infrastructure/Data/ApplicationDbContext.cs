using Microsoft.EntityFrameworkCore;
using STAD.Domain.Entities;

namespace STAD.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    // El constructor recibe las opciones de conexión (que configuraremos en la API)
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Cada DbSet representa una tabla en tu base de datos PostgreSQL
    public DbSet<Lote> Lotes => Set<Lote>();

    // Este método nos permite configurar detalles específicos de las tablas (Fluent API)
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración específica para la tabla Lotes
        modelBuilder.Entity<Lote>(entity =>
        {
            // Nombre de la tabla en Postgres
            entity.ToTable("lotes");

            // Definimos la llave primaria
            entity.HasKey(e => e.Id);

            // Requerimientos de los campos (Para asegurar la integridad de datos de tu rúbrica)
            entity.Property(e => e.NumeroLote)
                  .IsRequired()
                  .HasMaxLength(50);

            entity.Property(e => e.Destino)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(e => e.Estado)
                  .IsRequired()
                  .HasMaxLength(30);

            entity.Property(e => e.PesoToneladas)
                  .HasColumnType("decimal(18,2)"); // Precisión para el peso de la soya
        });
    }
}