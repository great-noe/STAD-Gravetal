using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace STAD.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AgregarGeolocalizacionBarcazas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitud",
                table: "lotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitud",
                table: "lotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitud",
                table: "lotes");

            migrationBuilder.DropColumn(
                name: "Longitud",
                table: "lotes");
        }
    }
}
