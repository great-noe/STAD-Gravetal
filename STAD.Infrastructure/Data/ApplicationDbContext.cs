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
    public DbSet<Productor> Productores => Set<Productor>();
    public DbSet<Silo> Silos => Set<Silo>();
    public DbSet<Movimiento> Movimientos => Set<Movimiento>();

    // Este método nos permite configurar detalles específicos de las tablas (Fluent API)
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ========================
        // Configuración de LOTES
        // ========================
        modelBuilder.Entity<Lote>(entity =>
        {
            entity.ToTable("lotes");

            entity.HasKey(e => e.Id);

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
                  .HasColumnType("decimal(18,2)");

            // FK al productor
            entity.HasOne(e => e.Productor)
                  .WithMany(p => p.Lotes)
                  .HasForeignKey(e => e.ProductorId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // =============================
        // Configuración de PRODUCTORES
        // =============================
        modelBuilder.Entity<Productor>(entity =>
        {
            entity.ToTable("productores");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.NombreRazonSocial)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(e => e.NIT)
                  .IsRequired()
                  .HasMaxLength(20);

            // NIT es único por productor (restricción de negocio)
            entity.HasIndex(e => e.NIT)
                  .IsUnique();

            entity.Property(e => e.Ubicacion)
                  .IsRequired()
                  .HasMaxLength(150);

            entity.Property(e => e.Estado)
                  .IsRequired()
                  .HasMaxLength(20);
        });

        // ========================
        // Configuración de SILOS
        // ========================
        modelBuilder.Entity<Silo>(entity =>
        {
            entity.ToTable("silos");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.NombreSilo)
                  .IsRequired()
                  .HasMaxLength(50);

            entity.Property(e => e.CapacidadMaximaTon)
                  .HasColumnType("decimal(18,2)");

            entity.Property(e => e.CapacidadActualTon)
                  .HasColumnType("decimal(18,2)");

            entity.Property(e => e.Estado)
                  .IsRequired()
                  .HasMaxLength(20);
        });

        // ==============================
        // Configuración de MOVIMIENTOS
        // ==============================
        modelBuilder.Entity<Movimiento>(entity =>
        {
            entity.ToTable("movimientos");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.TipoMovimiento)
                  .IsRequired()
                  .HasMaxLength(50);

            entity.Property(e => e.FechaHora)
                  .IsRequired()
                  .HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'"); // Default UTC en PostgreSQL

            entity.Property(e => e.PesoManejado)
                  .HasColumnType("decimal(18,2)");

            entity.Property(e => e.UsuarioRegistro)
                  .IsRequired()
                  .HasMaxLength(100);

            // FK obligatoria al lote
            entity.HasOne(e => e.Lote)
                  .WithMany()
                  .HasForeignKey(e => e.LoteId)
                  .OnDelete(DeleteBehavior.Restrict);

            // FK opcional al silo (nullable)
            entity.HasOne(e => e.Silo)
                  .WithMany()
                  .HasForeignKey(e => e.SiloId)
                  .IsRequired(false)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}