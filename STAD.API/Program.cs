using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using STAD.Infrastructure.Data;
using STAD.Domain.Repositories;
using STAD.Infrastructure.Repositories;
using STAD.Application.Lotes.Commands;
using FluentValidation;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuración de Base de Datos (PostgreSQL 18)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));
// --- INICIO DE NUEVOS TRABAJADORES ---

// 1. Registrar el Repositorio (Inversión de dependencias)s
builder.Services.AddScoped<ILoteRepository, LoteRepository>();

// 2. Registrar MediatR (Busca automáticamente tus Commands y Handlers)
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(CrearLoteCommand).Assembly));

// 3. Registrar FluentValidation (Busca automáticamente tus reglas de negocio)
builder.Services.AddValidatorsFromAssembly(typeof(CrearLoteCommandValidator).Assembly);

// --- FIN DE NUEVOS TRABAJADORES ---

// 2. Configuración de Seguridad: Autenticación JWT con Keycloak
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Jwt:Authority"];
        options.RequireHttpsMetadata = builder.Configuration.GetValue<bool>("Jwt:RequireHttpsMetadata");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Authority"]
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger en su versión más simple y nativa para .NET 9
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3. Middlewares de Seguridad
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();