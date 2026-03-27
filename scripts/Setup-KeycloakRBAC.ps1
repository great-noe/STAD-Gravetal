# ============================================================================
# Setup-KeycloakRBAC.ps1
# Automatiza la creacion de roles y usuarios RBAC en Keycloak - Realm StadRealm
# ============================================================================

# -- Configuracion -----------------------------------------------------------
$KC_BASE    = "http://localhost:8080"
$REALM      = "StadRealm"
$ADMIN_USER = "admin"
$ADMIN_PASS = "12345678"

# -- Definicion de roles y usuarios ------------------------------------------
$ROLES = @("admin_logistica", "operador_puerto", "auditor_cliente")

$USER_ROLE_MAP = @{
    "admin_logistica" = @("noel.admin")
    "operador_puerto" = @("juan.perez", "carlos.mendoza", "luis.rojas", "maria.soto", "pedro.vaca")
    "auditor_cliente" = @("senasag.bo", "aduana.arg", "cargill.comprador", "bunge.comprador", "vicentin.comprador")
}

$DEFAULT_PASSWORD = "1234"

# -- Funciones auxiliares -----------------------------------------------------
function Write-Step  { param([string]$Msg) Write-Host "  >> $Msg" -ForegroundColor Cyan }
function Write-Ok    { param([string]$Msg) Write-Host "  [OK] $Msg" -ForegroundColor Green }
function Write-Warn  { param([string]$Msg) Write-Host "  [SKIP] $Msg" -ForegroundColor Yellow }
function Write-Err   { param([string]$Msg) Write-Host "  [ERR] $Msg" -ForegroundColor Red }

# -- 1. Obtener token de administracion --------------------------------------
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "  KEYCLOAK RBAC SETUP - Realm: $REALM" -ForegroundColor Magenta
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host ""

Write-Step "Autenticando contra Keycloak como '$ADMIN_USER'..."

try {
    $tokenResponse = Invoke-RestMethod -Uri "$KC_BASE/realms/master/protocol/openid-connect/token" `
        -Method POST `
        -ContentType "application/x-www-form-urlencoded" `
        -Body @{
            grant_type = "password"
            client_id  = "admin-cli"
            username   = $ADMIN_USER
            password   = $ADMIN_PASS
        }
    $TOKEN = $tokenResponse.access_token
    Write-Ok "Autenticacion exitosa. Token obtenido."
}
catch {
    Write-Err "Error al autenticar. Verifica que Keycloak este corriendo en $KC_BASE"
    Write-Err $_.Exception.Message
    exit 1
}

$headers = @{
    Authorization  = "Bearer $TOKEN"
    "Content-Type" = "application/json"
}

# -- 2. Crear roles en el realm ----------------------------------------------
Write-Host ""
Write-Host "-- Creando roles ------------------------------------------" -ForegroundColor Yellow

foreach ($role in $ROLES) {
    Write-Step "Creando rol '$role'..."
    $roleBody = @{ name = $role } | ConvertTo-Json

    try {
        Invoke-RestMethod -Uri "$KC_BASE/admin/realms/$REALM/roles" `
            -Method POST `
            -Headers $headers `
            -Body $roleBody | Out-Null
        Write-Ok "Rol '$role' creado."
    }
    catch {
        $statusCode = $null
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }
        if ($statusCode -eq 409) {
            Write-Warn "Rol '$role' ya existe (omitido)."
        }
        else {
            Write-Err "Error creando rol '$role': $($_.Exception.Message)"
        }
    }
}

# -- 3. Crear usuarios y asignar roles ---------------------------------------
Write-Host ""
Write-Host "-- Creando usuarios y asignando roles ---------------------" -ForegroundColor Yellow

foreach ($roleName in $USER_ROLE_MAP.Keys) {
    foreach ($username in $USER_ROLE_MAP[$roleName]) {
        # 3a. Crear el usuario
        Write-Step "Creando usuario '$username'..."
        $userBody = @{
            username    = $username
            enabled     = $true
            credentials = @(
                @{
                    type      = "password"
                    value     = $DEFAULT_PASSWORD
                    temporary = $false
                }
            )
        } | ConvertTo-Json -Depth 3

        try {
            Invoke-RestMethod -Uri "$KC_BASE/admin/realms/$REALM/users" `
                -Method POST `
                -Headers $headers `
                -Body $userBody | Out-Null
            Write-Ok "Usuario '$username' creado con password permanente."
        }
        catch {
            $statusCode = $null
            if ($_.Exception.Response) {
                $statusCode = [int]$_.Exception.Response.StatusCode
            }
            if ($statusCode -eq 409) {
                Write-Warn "Usuario '$username' ya existe (omitido)."
            }
            else {
                Write-Err "Error creando usuario '$username': $($_.Exception.Message)"
                continue
            }
        }

        # 3b. Obtener el ID del usuario
        try {
            $userSearch = Invoke-RestMethod -Uri "$KC_BASE/admin/realms/$REALM/users?username=$username&exact=true" `
                -Method GET `
                -Headers $headers
            $userId = $userSearch[0].id
        }
        catch {
            Write-Err "No se pudo obtener el ID del usuario '$username'."
            continue
        }

        # 3c. Obtener la representacion del rol
        try {
            $roleRepr = Invoke-RestMethod -Uri "$KC_BASE/admin/realms/$REALM/roles/$roleName" `
                -Method GET `
                -Headers $headers
        }
        catch {
            Write-Err "No se pudo obtener el rol '$roleName'."
            continue
        }

        # 3d. Asignar el rol al usuario
        Write-Step "Asignando rol '$roleName' a '$username'..."
        $roleMapping = @(
            @{
                id   = $roleRepr.id
                name = $roleRepr.name
            }
        ) | ConvertTo-Json -Depth 2

        if ($roleMapping -notmatch '^\[') {
            $roleMapping = "[$roleMapping]"
        }

        try {
            Invoke-RestMethod -Uri "$KC_BASE/admin/realms/$REALM/users/$userId/role-mappings/realm" `
                -Method POST `
                -Headers $headers `
                -Body $roleMapping | Out-Null
            Write-Ok "Rol '$roleName' asignado a '$username'."
        }
        catch {
            Write-Err "Error asignando rol '$roleName' a '$username': $($_.Exception.Message)"
        }
    }
}

# -- Resumen final ------------------------------------------------------------
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "  SETUP COMPLETADO" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "  Roles creados:    $($ROLES -join ', ')"
Write-Host "  Usuarios totales: 11"
Write-Host "  Password:         $DEFAULT_PASSWORD (permanente)"
Write-Host "  Realm:            $REALM"
Write-Host "  Servidor:         $KC_BASE"
Write-Host ""
