# STAD: Sistema de Trazabilidad Agrícola Digital  
### Caso de Estudio: Gravetal Bolivia S.A.

---

## 📝 Descripción del Proyecto

Este proyecto consiste en el desarrollo de una **plataforma web Full-Stack** para el control y seguimiento de **lotes de exportación de derivados de soja**.

El sistema está diseñado específicamente para las necesidades logísticas de **Gravetal Bolivia S.A.** en **Puerto Quijarro**, permitiendo la **trazabilidad del producto desde el acopio hasta la exportación por la hidrovía Paraguay-Paraná**.

El objetivo principal del sistema es **mejorar el control logístico, la transparencia y la seguridad de la información** en los procesos de exportación agrícola.

---

# 🏗️ Arquitectura del Software

El backend sigue los principios de **Clean Architecture (Arquitectura Limpia)** para asegurar la **mantenibilidad, escalabilidad y separación de responsabilidades** dentro del sistema.

### Capas del sistema

**STAD.Domain**

Contiene:

- Entidades del negocio
- Interfaces base
- Reglas de negocio principales
- Lógica pura del dominio

Esta capa **no depende de ninguna tecnología externa**.

---

**STAD.Application**

Define:

- Casos de uso del sistema
- DTOs (Data Transfer Objects)
- Lógica de aplicación
- Orquestación de procesos entre capas

---

**STAD.Infrastructure**

Implementa:

- Persistencia de datos en **PostgreSQL 18**
- Integración con servicios externos
- Implementación concreta de repositorios
- Integración con **Keycloak**

---

**STAD.API**

Es la capa de presentación que:

- Expone los **endpoints REST**
- Maneja las solicitudes HTTP
- Proporciona documentación automática mediante **Swagger / OpenAPI**

---

# 🛠️ Stack Tecnológico

### Frontend

- Angular 21  
- PWA (Progressive Web App)  
- Tailwind CSS 4.2  

---

### Backend

- .NET Core 9 / .NET 10  
- Entity Framework Core  

---

### Seguridad

- Keycloak (IAM)
- Autenticación basada en **JWT**
- Guards
- Interceptors

---

### Base de Datos

- PostgreSQL 18
- Uso de **UUID v7**
- Registro de trazabilidad de cambios

---

### DevOps

- Docker
- Docker Compose
- Railway

---

# 🚀 Requisitos de Instalación

Para ejecutar este proyecto de forma local se requiere:

- **.NET SDK 10.0**
- **Node.js (LTS)**
- **Angular CLI**
- **Docker Desktop** (para orquestar PostgreSQL y Keycloak)

---

# 📂 Estructura de la Solución
/
├── STAD.API/            # Web API Controllers & Configuration
├── STAD.Application/    # Use Cases & Business Logic
├── STAD.Domain/         # Entities & Core Interfaces
├── STAD.Infrastructure/ # Data Access & External Services
├── compose.yaml         # Docker orchestration
└── README.md            # Project documentation

---

# 🔐 Seguridad y Auditoría

El sistema implementa varios mecanismos para garantizar la **seguridad y confiabilidad de los datos**:

### Validación estricta
Uso de **FluentValidation** para asegurar la integridad de los datos recibidos en cada solicitud.

### Auditoría automática
Registro automático de:

- Quién realizó el cambio
- Cuándo se realizó
- Qué datos fueron modificados

Esto permite **mantener la trazabilidad completa de las operaciones** en la base de datos.

### Protección OWASP
El sistema sigue buenas prácticas para mitigar vulnerabilidades comunes del desarrollo web como:

- Inyección de código
- Control de accesos
- Exposición de datos sensibles
- Ataques de autenticación

---

# 👨‍💻 Autor

**Noel David Limachi Abelo**

---

# 👨‍🏫 Docente

**Lic. Andrés Grover Albino Chambi**

---

# 🏫 Universidad

**Universidad Privada Domingo Savio**  
**Sub-Sede La Paz**

---
