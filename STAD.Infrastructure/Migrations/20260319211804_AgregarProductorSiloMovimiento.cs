using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace STAD.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AgregarProductorSiloMovimiento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProductorId",
                table: "lotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "productores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NombreRazonSocial = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    NIT = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Ubicacion = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "silos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NombreSilo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CapacidadMaximaTon = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CapacidadActualTon = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_silos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movimientos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LoteId = table.Column<Guid>(type: "uuid", nullable: false),
                    SiloId = table.Column<Guid>(type: "uuid", nullable: true),
                    TipoMovimiento = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FechaHora = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW() AT TIME ZONE 'UTC'"),
                    PesoManejado = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    UsuarioRegistro = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movimientos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movimientos_lotes_LoteId",
                        column: x => x.LoteId,
                        principalTable: "lotes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_movimientos_silos_SiloId",
                        column: x => x.SiloId,
                        principalTable: "silos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_lotes_ProductorId",
                table: "lotes",
                column: "ProductorId");

            migrationBuilder.CreateIndex(
                name: "IX_movimientos_LoteId",
                table: "movimientos",
                column: "LoteId");

            migrationBuilder.CreateIndex(
                name: "IX_movimientos_SiloId",
                table: "movimientos",
                column: "SiloId");

            migrationBuilder.CreateIndex(
                name: "IX_productores_NIT",
                table: "productores",
                column: "NIT",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_lotes_productores_ProductorId",
                table: "lotes",
                column: "ProductorId",
                principalTable: "productores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lotes_productores_ProductorId",
                table: "lotes");

            migrationBuilder.DropTable(
                name: "movimientos");

            migrationBuilder.DropTable(
                name: "productores");

            migrationBuilder.DropTable(
                name: "silos");

            migrationBuilder.DropIndex(
                name: "IX_lotes_ProductorId",
                table: "lotes");

            migrationBuilder.DropColumn(
                name: "ProductorId",
                table: "lotes");
        }
    }
}
