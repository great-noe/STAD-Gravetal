# =============================================================================
# Etapa 1: BUILD
# Usamos el SDK completo de .NET 10 para compilar y publicar la aplicacion.
# El contexto de build se establece en la RAIZ del repositorio porque
# STAD.API referencia los proyectos STAD.Application y STAD.Infrastructure.
# =============================================================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copiamos primero los archivos .csproj de todas las capas para aprovechar
# el cache de capas de Docker: si el codigo cambia pero los paquetes no,
# este paso no se re-ejecuta.
COPY ["STAD.API/STAD.API.csproj",             "STAD.API/"]
COPY ["STAD.Application/STAD.Application.csproj", "STAD.Application/"]
COPY ["STAD.Infrastructure/STAD.Infrastructure.csproj", "STAD.Infrastructure/"]
COPY ["STAD.Domain/STAD.Domain.csproj",       "STAD.Domain/"]

# Restauramos todas las dependencias NuGet
RUN dotnet restore "STAD.API/STAD.API.csproj"

# Copiamos el resto del codigo fuente
COPY . .

# Compilamos y publicamos en modo Release
WORKDIR /src/STAD.API
RUN dotnet publish "STAD.API.csproj" \
    --configuration Release \
    --no-restore \
    --output /app/publish

# =============================================================================
# Etapa 2: RUNTIME
# Usamos solo el runtime (imagen mucho mas pequena ~200MB vs ~800MB del SDK).
# =============================================================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Copiamos unicamente los binarios publicados desde la etapa de build
COPY --from=build /app/publish .

# Puerto en el que escucha la API (HTTP)
EXPOSE 5188

# Variables de entorno base (pueden ser sobreescritas por el compose o el host)
ENV ASPNETCORE_URLS=http://+:5188
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "STAD.API.dll"]
