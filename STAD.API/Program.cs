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

// 1. Configuracion de Base de Datos (PostgreSQL 18)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));
// --- INICIO DE NUEVOS TRABAJADORES ---

// 1. Registrar los Repositorios (Inversion de dependencias)
builder.Services.AddScoped<ILoteRepository, LoteRepository>();
builder.Services.AddScoped<IProductorRepository, ProductorRepository>();
builder.Services.AddScoped<ISiloRepository, SiloRepository>();
builder.Services.AddScoped<IMovimientoRepository, MovimientoRepository>();

// 2. Registrar MediatR (Busca automaticamente tus Commands y Handlers)
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(CrearLoteCommand).Assembly));

// 3. Registrar FluentValidation (Busca automaticamente tus reglas de negocio)
builder.Services.AddValidatorsFromAssembly(typeof(CrearLoteCommandValidator).Assembly);

// --- FIN DE NUEVOS TRABAJADORES ---

// 2. Configuracion de Seguridad: Autenticacion JWT con Keycloak
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
// --- PERMITIR QUE ANGULAR SE CONECTE (CORS) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // El puerto de tu frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();

// Swagger en su version mas simple y nativa para .NET 9
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("PermitirAngular");
// 3. Middlewares de Seguridad
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();