using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace STAD.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MigracionInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "lotes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NumeroLote = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PesoToneladas = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    FechaAcopio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Destino = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Estado = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UsuarioRegistro = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lotes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "lotes");
        }
    }
}
