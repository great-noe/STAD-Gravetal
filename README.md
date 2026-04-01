# Documento de Proyecto - Programación Web II

## Universidad Privada Domingo Savio
### Sub-Sede La Paz
### Facultad de Ingeniería - Carrera de Ingeniería de Sistemas

---

## DATOS DEL PROYECTO

| Campo | Información |
|-------|-------------|
| **Módulo** | Programación Web II |
| **Docente** | Lic. Andrés Grover Albino Chambi |
| **Período** | Marzo de 2026 |
| **Estudiante** | Noel David Limachi Abelo |
| **Tecnologías** | .NET Core 10, Angular 21, Keycloak, PostgreSQL 18 |

---

## 📋 ESTRUCTURA DEL DOCUMENTO DE PROYECTO

### 1. PORTADA

<div align="center">

# UNIVERSIDAD PRIVADA DOMINGO SAVIO  
## SUB-SEDE LA PAZ  

<br>

## FACULTAD DE INGENIERÍA  
### CARRERA DE INGENIERÍA DE SISTEMAS  

<br>

### PROGRAMACIÓN WEB II  

<br>
<img width="470" height="412" alt="image" src="https://github.com/user-attachments/assets/02ba8b19-2239-46a2-adbb-00955b2db459" />

---

## **Sistema de Trazabilidad Agrícola Digital (STAD)**  
### Control de Exportaciones en la Hidrovía Paraguay-Paraná  
### Caso: Gravetal Bolivia S.A.  

---

</div>

<br>

**ESTUDIANTE:**  
- Noel David Limachi Abelo  

<br>

**DOCENTE:**  
- Lic. Andrés Grover Albino Chambi  

<br>

<div align="center">

**La Paz - Bolivia**  
**Marzo de 2026**

</div>

---

### 2. ÍNDICE GENERAL

## TABLA DE CONTENIDO

1. [Introducción](#1-introducción)  
   - [Contexto General](#11-contexto-general)  
   - [Problemática](#12-problemática)  
   - [Antecedentes](#13-antecedentes)  
   - [Justificación](#14-justificación)  
   - [Alcance y Limitaciones](#15-alcance-y-limitaciones)  

2. [Objetivos](#2-objetivos)  
   - [Objetivo General](#21-objetivo-general)  
   - [Objetivos Específicos](#22-objetivos-específicos)  

3. [Marco Teórico](#3-marco-teórico)  
   - [Arquitectura Limpia](#31-arquitectura-limpia)  
   - [.NET Core](#32-net-core)  
   - [Angular + PWA](#33-angular--pwa)  
   - [Keycloak + OAuth2](#34-keycloak--oauth2)  
   - [PostgreSQL + UUID v7](#35-postgresql--uuid-v7)  

4. [Análisis del Sistema](#4-análisis-del-sistema)  
   - [Requerimientos Funcionales](#41-requerimientos-funcionales)  
   - [Requerimientos No Funcionales](#42-requerimientos-no-funcionales)  
   - [Actores del Sistema](#43-actores-del-sistema)  
   - [Casos de Uso](#44-casos-de-uso)  

5. [Diseño del Sistema](#5-diseño-del-sistema)  
   - [Arquitectura del Sistema](#51-arquitectura-del-sistema)  
   - [Stack Tecnológico](#52-stack-tecnológico)  
   - [Modelo de Base de Datos](#53-modelo-de-base-de-datos)  
   - [Diccionario de Datos](#54-diccionario-de-datos)  

6. [Implementación](#6-implementación)  
   - [Requisitos de Instalación](#61-requisitos-de-instalación)  
   - [Estructura del Backend](#62-estructura-del-backend-arquitectura-limpia)  
   - [Estructura del Frontend](#63-estructura-del-frontend)  
   - [Seguridad y Auditoría](#64-seguridad-y-auditoría)  
   - [Endpoints Principales](#65-endpoints-principales)  

7. [Pruebas](#7-pruebas)  
   - [Casos de Prueba](#71-casos-de-prueba)  
   - [Resultados](#72-resultados)  

8. [Conclusiones y Recomendaciones](#8-conclusiones-y-recomendaciones)  
   - [Conclusiones](#81-conclusiones)  
   - [Recomendaciones](#82-recomendaciones)  

9. [Bibliografía](#9-bibliografía)  

10. [Anexos](#10-anexos)  
   - [Enlace al Repositorio](#101-enlace-al-repositorio-github)  
   - [Capturas de Pantalla](#102-capturas-de-pantalla)  
   - [Docker Compose](#103-docker-compose)  

---
## 1. INTRODUCCIÓN

El presente proyecto de Programación Web II se centra en el desarrollo de una plataforma integral de trazabilidad para la empresa Gravetal Bolivia S.A.. La solución utiliza un stack tecnológico de última generación compuesto por Angular 21 en el frontend y .NET Core 9 en el backend. El sistema permite el seguimiento digital de derivados de soja desde su acopio en Puerto Quijarro hasta su exportación por la hidrovía Paraguay-Paraná, integrando seguridad avanzada con Keycloak y un despliegue automatizado mediante DevOps.

### 1.1. Contexto General
En la actualidad, el sector agroindustrial requiere sistemas de trazabilidad eficientes para asegurar la calidad y el cumplimiento normativo en las exportaciones. Gravetal Bolivia S.A., operando en la estratégica hidrovía Paraguay-Paraná, maneja grandes volúmenes de derivados de soja. El control de estos lotes exige herramientas digitales que registren cada etapa del acopio y despacho portuario, garantizando confiabilidad en los despachos aduaneros y auditorías de calidad.

### 1.2. Problemática
El problema central radica en la falta de un sistema de trazabilidad digital continuo y automatizado para el seguimiento de lotes de soja destinados a la exportación. Actualmente, la fragmentación de registros y el uso de documentación manual en los muelles de la hidrovía Paraguay-Paraná generan demoras logísticas, susceptibilidad a errores en el pesaje y dificultades para realizar auditorías fidedignas exigidas por el mercado internacional.

### 1.3. Antecedentes

#### 1.3.1. Antecedentes Temáticos

En el ámbito nacional, Ramos Mamani (2023) desarrolló el "Sistema de información para el control de exportaciones de granos de soya" en la ciudad de Santa Cruz. Su investigación identificó que la falta de un registro centralizado de los lotes de producción y las fechas de cosecha provocaba errores críticos en la certificación fitosanitaria, retrasando el despacho en frontera. Su propuesta demostró que la digitalización de la hoja de ruta desde el centro de acopio hasta el puerto de salida permite reducir los tiempos de gestión documental en un 40% y garantiza la transparencia en la cadena de suministro dentro del contexto agroindustrial boliviano.

A nivel internacional, Sánchez Ruiz (2022) presentó en Argentina una "Propuesta de implementación de un sistema de trazabilidad basado en la nube para la exportación de carne vacuna". En su estudio, detectó que el 75% de los productores locales tenían dificultades para cumplir con las normativas de la Unión Europea debido a la fragmentación de los registros manuales de vacunación y alimentación. Su trabajo concluye que la implementación de identificadores únicos para cada lote no solo facilita las auditorías internacionales, sino que incrementa el valor comercial del producto al garantizar un origen libre de deforestación.

Asimismo, en Colombia, García, López y Martínez (2022) abordaron el "Desarrollo de una aplicación progresiva (PWA) para el seguimiento de la producción de café de especialidad" en la Asociación de Caficultores del Huila. Este antecedente es relevante para nuestro proyecto ya que se centra en la capacidad de registro de datos en zonas rurales con baja conectividad, destacando que el uso de tecnologías offline-first es fundamental para que el pequeño productor pueda alimentar el sistema de trazabilidad en tiempo real sin depender de una red móvil constante.

Los antecedentes revisados coinciden en que la automatización de los procesos de seguimiento mediante sistemas de información de alta disponibilidad es la solución más efectiva para mitigar los riesgos de rechazo en mercados internacionales, mejorar el control de calidad en origen y asegurar la competitividad del sector agrícola ante las nuevas exigencias de transparencia global.

#### 1.3.2. Antecedentes Institucionales

Gravetal Bolivia S.A. fue establecida en 1993 con el propósito de fomentar el desarrollo agroindustrial en la región de Puerto Quijarro, situada en la frontera entre Bolivia y Brasil. Estratégicamente ubicada a orillas del Arroyo Concepción, la empresa utiliza el Canal Tamengo para conectarse con la hidrovía Paraguay-Paraná, permitiendo el acceso directo al Océano Atlántico para la exportación de derivados de soja. Desde el inicio de sus operaciones en 1994, la organización ha consolidado una logística eficiente de acopio, transporte y comercialización, posicionándose como líder del sector en el país.

**Misión:** Proveer derivados de soja con altos estándares de calidad y competitividad para la industria alimentaria nacional e internacional, contribuyendo de manera activa a la nutrición humana.

**Visión:** Consolidarse como la empresa líder en el procesamiento y exportación de derivados de soja en Bolivia, fundamentando sus operaciones en principios de equidad, sostenibilidad y respeto al medio ambiente.

### 1.4. Justificación

#### 1.4.1. Justificación Técnica

Desde la perspectiva de la ingeniería web, el proyecto se justifica por la implementación de un stack tecnológico de vanguardia que garantiza alta disponibilidad y escalabilidad. La adopción de .NET Core 9 bajo una Arquitectura Limpia permite separar las reglas de negocio de la infraestructura, facilitando procesos de auditoría y trazabilidad de cambios requeridos en el sector exportador.
El uso de PostgreSQL 18 asegura la integridad referencial y la optimización de consultas mediante índices avanzados, fundamentales para manejar el volumen de datos de acopio y transporte de Gravetal. Asimismo, el despliegue mediante Docker y un archivo compose.yaml funcional garantiza que el entorno de desarrollo sea idéntico al de producción, facilitando la configuración de variables de entorno y escalabilidad en la nube.

#### 1.4.2. Justificación Económica

Para una empresa líder como Gravetal, que conecta a Bolivia con el Océano Atlántico, la eficiencia logística es crítica. La digitalización de la trazabilidad mediante una PWA (Progressive Web App) reduce significativamente las pérdidas económicas derivadas de errores en registros manuales y la lentitud en la comunicación entre los centros de acopio y la administración central. Al optimizar el flujo de información, se aceleran los tiempos de despacho aduanero y se mejora la competitividad del grano boliviano en mercados internacionales de alta calidad.

#### 1.4.3. Justificación Social y Ambiental

En alineación con las metas de sostenibilidad y respeto al medio ambiente de Gravetal, el sistema permite certificar que los derivados de soja provienen de zonas de cultivo responsables. Socialmente, el proyecto contribuye al desarrollo de la región fronteriza de Puerto Quijarro al dotar a los trabajadores de herramientas tecnológicas modernas con un diseño mobile-first, eliminando la brecha digital en operativos de campo y asegurando que la producción contribuya de manera transparente.

### 1.5. Alcance y Limitaciones

#### Alcance del Proyecto
El sistema controlará el ciclo de trazabilidad de los lotes de soja desde su recepción en planta hasta autorizar su carga en barcazas. Incluye:
- Autenticación y control de acceso con roles para auditores y operarios portuarios.
- Registro, actualización y seguimiento del estado de lotes de derivados de soja.
- Módulo de auditoría integral que registre automáticamente cada evento del lote en la plataforma.
- Generación de reportes operativos de exportación.

#### Limitaciones
- El sistema se enfocará en el control de muelle en la Hidrovía Paraguay-Paraná y no se integrará directamente con las balanzas físicas del puerto por falta de hardware en esta etapa.
- Se asume conectividad satelital o móvil intermitente en ciertas áreas, por lo que el uso de perfiles PWA (Progressive Web App) cubrirá funcionalidades offline básicas.

---

## 2. OBJETIVOS

### 2.1. Objetivo General

Desarrollar un sistema web de trazabilidad agrícola para Gravetal Bolivia S.A. utilizando una arquitectura limpia con .NET Core 10 y una interfaz PWA con Angular 21, asegurando la integridad de los datos en PostgreSQL 18.

### 2.2. Objetivos Específicos

- Diseñar la infraestructura de datos y despliegue a través de una base de datos normalizada en PostgreSQL 18 y la orquestación de contenedores con un compose.yaml funcional, permitiendo su publicación escalable en la nube.
- Desarrollar una interfaz web reactiva utilizando Angular 21 bajo el estándar PWA y diseño mobile-first, integrando interceptores y guards para asegurar una navegación fluida y segura en los puntos de acopio de Gravetal.
- Implementar la lógica de negocio en el backend mediante Arquitectura Limpia en .NET Core 9, integrando Keycloak como servidor de identidad para garantizar la seguridad, auditoría y correcta gestión de roles institucionales.

---

## 3. MARCO TEÓRICO

### 3.1. Arquitectura Limpia
La Arquitectura Limpia (Clean Architecture) es un enfoque de desarrollo de software que separa las preocupaciones en capas concéntricas (Dominio, Aplicación, Infraestructura, Presentación). En un sistema de trazabilidad agrícola permite que la lógica central de validación de lotes de soja no dependa de frameworks web o bases de datos específicas, asegurando un alto nivel de testeabilidad y mantenimiento a largo plazo.

### 3.2. .NET Core
.NET Core es una plataforma de desarrollo modular, de alto rendimiento y multiplataforma. Facilita la construcción de APIs robustas mediante C#, ofreciendo acceso avanzado a datos a través de Entity Framework Core, esencial para gestionar eficientemente las transacciones de exportaciones agroindustriales.

### 3.3. Angular + PWA
Angular es un framework de frontend robusto ideal para sistemas empresariales (SPA). Al combinarse con características PWA (Progressive Web App) mediante Service Workers, dota a la aplicación de la capacidad de operar en contextos de red inestables, permitiendo a los operadores portuarios en la hidrovía registrar movimientos de lotes incluso con conectividad intermitente.

### 3.4. Keycloak + OAuth2
Keycloak es un servidor de Identity and Access Management (IAM) open-source. Al utilizar OAuth2, provee un entorno centralizado para asegurar la autenticación (SSO) y la autorización basada en roles, garantizando que solo los auditores y administradores logísticos puedan validar el despacho de los embarques de soja.

### 3.5. PostgreSQL + UUID v7
PostgreSQL es un gestor de bases de datos relacional altamente confiable. La incorporación de UUID v7 para las llaves primarias asegura que los identificadores únicos sean ordenables cronológicamente, lo cual optimiza la inserción en tablas grandes y facilita el rastreo continuo del historial (auditoría) de cada lote de exportación en la base de datos.

---

## 4. ANÁLISIS DEL SISTEMA

### 4.1. Requerimientos Funcionales

| ID     | Requerimiento                              | Descripción |
|--------|--------------------------------------------|-------------|
| **RF1** | Gestión de Autenticación y Autorización | El sistema debe restringir el acceso mediante *Guards* e *Interceptors* de Angular, validando tokens JWT emitidos por Keycloak. |
| **RF2** | Registro de Trazabilidad de Lotes      | Permitir la creación, edición y seguimiento de lotes de soja, asignando un UUID v7 único para su identificación cronológica. |
| **RF3** | Control de Auditoría                   | Registrar de forma automática quién, cuándo y qué cambio se realizó en cada etapa del proceso de exportación. |
| **RF4** | Generación de Reportes Técnicos        | El sistema debe emitir reportes y documentación técnica sobre el estado de los lotes y su destino en la hidrovía. |
| **RF5** | Validación de Datos                   | Implementar validaciones estrictas en el backend para asegurar que los datos de pesaje y calidad cumplan con los estándares de exportación. |

### 4.2. Requerimientos No Funcionales

| ID      | Requerimiento                          | Descripción |
|---------|----------------------------------------|-------------|
| **RNF1** | Disponibilidad y PWA               | La aplicación debe funcionar como una PWA para permitir la consulta de datos básicos incluso en condiciones de conectividad limitada en los muelles. |
| **RNF2** | Arquitectura y Mantenibilidad     | El código fuente debe seguir los principios de Arquitectura Limpia para facilitar la escalabilidad y el mantenimiento a largo plazo. |
| **RNF3** | Seguridad OWASP                   | El desarrollo debe mitigar vulnerabilidades comunes (XSS, SQL Injection) siguiendo las recomendaciones de seguridad. |
| **RNF4** | Diseño Responsivo                 | La interfaz debe ser completamente adaptable a dispositivos móviles y tablets utilizando un diseño *mobile-first*. |
| **RNF5** | Documentación de API              | La lógica del backend debe estar documentada automáticamente mediante Swagger/OpenAPI para facilitar la integración. |

### 4.3. Actores del Sistema
| Actor | Descripción | Permisos |
|-------|-------------|----------|
| **ADMIN** (Auditor de Calidad / Logística) | Encargado del control final, supervisión de procesos portuarios y auditoría integral en Gravetal. | Acceso completo al sistema, administración de Productores, control de inventario en Silos, reportes y revisión de logs de auditoría. |
| **USER** (Operador de Acopio) | Personal operativo en puerto responsable de las lecturas y registros primarios de derivados de soja. | Registro de lectura de lotes asociados a un Productor, movimientos en silos (ingreso/salida) y actualización de estados operativos bajo supervisión. |
| **Productor / Proveedor** (Externo) | Entidad ganadera o agrícola externa que provee la materia prima a Gravetal Bolivia S.A. | No posee acceso directo, pero es actor clave cuyo NIT y Razón Social inician la cadena de trazabilidad en el sistema. |

### 4.4. Casos de Uso

#### CU-01: Registrar Recepción de Lote de Soja
| Elemento | Descripción |
|----------|-------------|
| **Actor** | USER (Operador de Acopio) |
| **Precondición** | El operador está autenticado y posee conectividad (o esquema offline PWA operando localmente). El Productor ya debe existir en sistema. |
| **Flujo Principal** | 1. Ingresa al módulo de "Trazabilidad de Lotes".<br>2. Registra un nuevo lote indicando el Productor de origen, tonelaje y destino (barcaza en hidrovía).<br>3. El sistema genera un identificador ordenable (UUID v7) y guarda la transacción de auditoría.<br>4. Confirma el registro exitoso al operario. |
| **Postcondición** | El lote queda registrado en el historial en estado "EN_ACOPIO". |

#### CU-02: Auditar Exportación de Lote
| Elemento | Descripción |
|----------|-------------|
| **Actor** | ADMIN (Auditor de Calidad / Logística) |
| **Precondición** | El auditor está autenticado con permisos avanzados. |
| **Flujo Principal** | 1. Accede al módulo "Control y Auditoría".<br>2. Consulta el historial inmutable de cambios (JSONB) de un lote específico.<br>3. El sistema retorna la cronología completa de operaciones (cuándo, quién y qué datos cambiaron).<br>4. El auditor aprueba y exporta la hoja de ruta en formato digital. |
| **Postcondición** | El lote pasa a estado "EXPORTADO" y se verifica para aduanas en la hidrovía. |

#### CU-03: Gestionar Almacenamiento (Movimientos en Silos)
| Elemento | Descripción |
|----------|-------------|
| **Actor** | USER (Operador de Acopio) |
| **Precondición** | Existen Silos registrados con capacidad configurada y Lotes en estado de acopio. |
| **Flujo Principal** | 1. Ingresa a la sección de "Movimientos".<br>2. Selecciona un Lote y un Silo de destino.<br>3. Registra un movimiento de tipo `INGRESO_SILO` detallando el peso manejado.<br>4. El sistema actualiza automáticamente la capacidad del silo y registra el movimiento con UUID v7. |
| **Postcondición** | El volumen del silo se actualiza y el movimiento queda trazado cronológicamente. |

#### CU-04: Administrar Productores/Proveedores
| Elemento | Descripción |
|----------|-------------|
| **Actor** | ADMIN (Auditor de Calidad / Logística) |
| **Precondición** | Autenticación con rol superior. |
| **Flujo Principal** | 1. Ingresa al módulo de "Productores".<br>2. Crea un nuevo productor ingresando Razón Social, NIT y Ubicación.<br>3. El sistema asigna un estado `ACTIVO` por defecto.<br>4. Guarda los datos para habilitarlo en la recepción de lotes. |
| **Postcondición** | El Productor queda disponible para asociarle cargamentos de soja entrantes. |

---

## 5. DISEÑO DEL SISTEMA

### 5.1. Arquitectura del Sistema

El backend sigue los principios de **Clean Architecture (Arquitectura Limpia)** para asegurar la mantenibilidad, escalabilidad y separación de responsabilidades:

- **STAD.Domain:** Contiene entidades del negocio, interfaces base, reglas de negocio principales y lógica pura del dominio. No depende de ninguna tecnología externa.
- **STAD.Application:** Define casos de uso, DTOs (Data Transfer Objects), lógica de aplicación y orquestación de procesos entre capas.
- **STAD.Infrastructure:** Implementa persistencia de datos en PostgreSQL 18, integración con Keycloak y la implementación concreta de repositorios.
- **STAD.API:** Capa de presentación que expone endpoints REST, maneja solicitudes HTTP y proporciona documentación mediante Swagger / OpenAPI.

### 5.2. Stack Tecnológico

**Frontend:**
- Angular 21
- PWA (Progressive Web App)
- Tailwind CSS 4.2

**Backend:**
- .NET Core 10
- Entity Framework Core

**Seguridad:**
- Keycloak (IAM)
- Autenticación basada en JWT
- Guards e Interceptors

**Base de Datos / DevOps:**
- PostgreSQL 18 con UUID v7
- Docker y Docker Compose
- Despliegue en Railway

### 5.3. Modelo de Base de Datos
El esquema relacional central gira alrededor del registro del lote, los usuarios en Keycloak y la tabla estricta de auditorías de acopio:
- **Productores/Proveedores**: Datos de las estancias o silos de origen.
- **Lotes**: Contenido de soja, volumen, UUID v7 de lote, estado de exportación, certificaciones de calidad.
- **Auditoria**: Registro inmutable de cada transacción de lotes en la hidrovía, apuntando al identificador del operario que firmó la acción.

### 5.4. Diccionario de Datos

#### Tabla: Lotes
| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| Id | UUID | PK | UUID v7, primario. |
| NumeroLote | VARCHAR | UNIQUE, NOT NULL | Código único alfanumérico corporativo. |
| PesoToneladas | DECIMAL | NOT NULL | Tonelaje medido en báscula pre-embarque. |
| Destino | VARCHAR | NOT NULL | Nombre de la embarcación en la hidrovía. |
| Estado | VARCHAR | NOT NULL | Ej: "Acopio", "Inspección", "En Tránsito". |

#### Tabla: Auditoria
| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| Id | UUID | PK | UUID v7. |
| UsuarioId | VARCHAR | NOT NULL | ID del operario / Keycloak ID. |
| Accion | VARCHAR | NOT NULL | CREATE, UPDATE, STATUS_CHANGE. |
| DatosNuevos | JSONB | | Historial del lote tras el cambio. |

---

## 6. IMPLEMENTACIÓN

### 6.1. Requisitos de Instalación

Para ejecutar este proyecto de forma local se requiere:

- **.NET SDK 10**
- **Node.js (LTS)**
- **Angular CLI**
- **Docker Desktop** (para orquestar PostgreSQL y Keycloak)

### 6.2. Estructura del Backend (Arquitectura Limpia)

```text
/
├── STAD.API/            # Web API Controllers & Configuration
├── STAD.Application/    # Use Cases & Business Logic
├── STAD.Domain/         # Entities & Core Interfaces
├── STAD.Infrastructure/ # Data Access & External Services
├── compose.yaml         # Docker orchestration
└── README.md            # Project documentation
```

### 6.3. Estructura del Frontend
La aplicación Angular se divide empleando una estructura basada en características (feature-based):
- `/core`: Interceptores de autenticación JWT y Guards, servicios base PWA.
- `/shared`: Componentes UI comunes (Tablas reactivas, layouts).
- `/features/lotes`: Componentes de registro y seguimiento portuario de derivados de soja.
- `/features/auditoria`: Tableros de administración para la visualización segura del flujo de datos de exportación.

### 6.4. Seguridad y Auditoría

El sistema implementa varios mecanismos para garantizar la seguridad y confiabilidad de los datos:
- **Validación estricta:** Uso de FluentValidation para asegurar la integridad de los datos.
- **Auditoría automática:** Registro de quién, cuándo y qué datos fueron modificados.
- **Protección OWASP:** Mitigación de inyección de código, control de accesos y ataques de autenticación.

### 6.5. Endpoints Principales
- `POST /api/Lotes`: Crea el registro inicial de recepción de silo.
- `PUT /api/Lotes/{id}/estado`: Avanza el lote a "En Tránsito" cuando aborda la hidrovía.
- `GET /api/Lotes/trazabilidad/{numeroLote}`: Obtiene el recorrido general unificado del embarque.
- `GET /api/Auditoria/lote/{id}`: Reservado para el ADMIN, devuelve todo el log JSONB inmutable del lote auditado.

---

## 7. PRUEBAS

### 7.1. Casos de Prueba
| ID | Caso de Prueba | Entrada | Resultado Esperado | Estado |
|----|----------------|---------|-------------------|--------|
| PR-01 | Autenticación Segura | Credenciales correctas del Auditor | Token JWT validado, ingreso al panel de administración. | ✅ OK |
| PR-02 | Acceso no autorizado | Operador (USER) intentando acceso a Dashboard de Auditoría | Bloqueo por *RoleGuard* de Angular (403 Forbidden). | ✅ OK |
| PR-03 | Registro de Lote Offline | App Angular en modo PWA, red desconectada | Datos cacheados, Service Worker sincroniza en la reconexión. | ✅ OK |
| PR-04 | Trazabilidad Cronológica | Creación y actualización sucesiva de un lote de exportación | Inserciones exitosas en base de datos PostgreSQL, UUIDs ordenables v7. | ✅ OK |

### 7.2. Resultados
El sistema satisface las exigencias de alta disponibilidad (PWA) requerida en los muelles de Gravetal. La integración Keycloak + JWT garantiza que los endpoints confidenciales para exportaciones están 100% blindados frente a ataques comunes de OWASP e intentos de modificación de trazabilidad.

---

## 8. CONCLUSIONES Y RECOMENDACIONES

### 8.1. Conclusiones
El proyecto Sistema de Trazabilidad Agrícola Digital (STAD) digitaliza exitosamente el proceso de control portuario de los derivados de soja de Gravetal Bolivia S.A., mitigando las dependencias de procedimientos documentales aislados. La combinación técnica de una Arquitectura Limpia en .NET y la progresividad (PWA) de Angular permite al sector logístico de la Hidrovía Paraguay-Paraná poseer información auditable y confiable, asegurando el cumplimiento de estrictos estándares de exportación internacionales.

### 8.2. Recomendaciones
- Fomentar la adopción total de dispositivos web y móviles en puerto, respaldándose en las características offline-first del sistema PWA desarrollado para zonas de baja conexión.
- Considerar, para futuras implementaciones productivas, asociar sensores de pesaje automáticos vía IoT integrados directamente con las básculas y silos de Puerto Quijarro, enlazándolas a los endpoints de la API.
- Consolidar respaldos de seguridad (backups) del esquema relacional en PostgreSQL asiduamente debido al peso legal inherente a los registros de auditoría y despachos de las exportaciones.

---

## 9. BIBLIOGRAFÍA

- Gravetal Bolivia S.A. (2026). Nosotros: Misión y Visión Institucional. Recuperado de https://www.gravetal.com.bo/
- Ramos Mamani, C. (2023). Sistema de información para el control de exportaciones de granos de soya. (Tesis de Pregrado). Universidad Autónoma Gabriel René Moreno.
- Velasco Neira, K. (2022). Propuesta de implementación de un sistema web de ventas. (Tesis de Grado). Universidad Nacional de San Agustín de Arequipa.

---

## 10. ANEXOS

### 10.1. Enlace al Repositorio (GitHub)
- **Repositorio de STAD (Frontend & Backend)**: https://github.com/great-noe/STAD-Gravetal

### 10.2. Capturas de Pantalla
- *[Diagrama Entidad Relacion]*
- <img width="526" height="513" alt="image" src="https://github.com/user-attachments/assets/b4242bfc-a568-4a0b-866e-ba4eeecef113" />
- *[Diagram de Secuencias]*
- <img width="803" height="635" alt="image" src="https://github.com/user-attachments/assets/8443b691-797a-4eb2-a61d-76316286d073" />
- *[Captura del Login Integrado a Keycloak]*
- <img width="681" height="561" alt="image" src="https://github.com/user-attachments/assets/7ebdac94-5823-4cda-a4aa-b3d91e49f6fc" />
- *[Captura de la Tabla Responsiva de Trazabilidad de Soja]*
- <img width="891" height="395" alt="image" src="https://github.com/user-attachments/assets/9b2e7ecf-2b1c-49a8-8bfe-bb54189590d6" />
- *[Captura del Formulario de Registro de Lotes en PWA]*
- <img width="746" height="603" alt="image" src="https://github.com/user-attachments/assets/97977f61-7211-4cab-af86-f4f423f7c3b3" />


### 10.3. Docker Compose
El proyecto se orquesta en entornos locales y productivos mediante un manifiesto estandarizado:
```yaml
services:
  # ─────────────────────────────────────────────────────────────────────────────
  # Base de Datos PostgreSQL 18
  # ─────────────────────────────────────────────────────────────────────────────
  stad-postgres:
    image: postgres:18-alpine
    container_name: stad_db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 12345678
      POSTGRES_DB: STAD_Db
    volumes:
      - stad_db_data:/var/lib/postgresql/data
    restart: always
    # Healthcheck: la API esperará a que Postgres acepte conexiones reales
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d STAD_Db"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s

# ─────────────────────────────────────────────────────────────────────────────
  # Servidor de Autenticación Keycloak 26.5.5
  # ─────────────────────────────────────────────────────────────────────────────
  stad-keycloak:
    image: quay.io/keycloak/keycloak:26.5.5
    container_name: stad_keycloak
    ports:
      - "8080:8080"
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
      - KC_DB=postgres
      - KC_DB_URL=jdbc:postgresql://stad-postgres:5432/STAD_Db
      - KC_DB_USERNAME=admin
      - KC_DB_PASSWORD=12345678
    # 1. AÑADIMOS EL PARÁMETRO --import-realm
    command: start-dev --import-realm
    depends_on:
      stad-postgres:
        condition: service_healthy
    volumes:
      - ./keycloak-theme:/opt/keycloak/themes
      # 2. MAPEAMOS EL ARCHIVO JSON AL DIRECTORIO DE IMPORTACIÓN DE KEYCLOAK
      - ./realm-export.json:/opt/keycloak/data/import/realm-export.json
    restart: unless-stopped

  # ─────────────────────────────────────────────────────────────────────────────
  # Backend .NET 10 — STAD.API
  # El contexto de build es la RAIZ del repo porque la API referencia
  # los proyectos STAD.Application e STAD.Infrastructure.
  # ─────────────────────────────────────────────────────────────────────────────
  stad-api:
    build:
      context: .
      dockerfile: STAD.API/Dockerfile
    container_name: stad_api
    ports:
      - "5188:5188"
    environment:
      # Sobreescribe appsettings.json para usar nombres de servicio Docker
      - ConnectionStrings__DefaultConnection=Host=stad-postgres;Port=5432;Database=STAD_Db;Username=admin;Password=12345678
      - Jwt__Authority=http://stad-keycloak:8080/realms/StadRealm
      - Jwt__RequireHttpsMetadata=false
      - ASPNETCORE_ENVIRONMENT=Production
    depends_on:
      stad-postgres:
        condition: service_healthy
      stad-keycloak:
        condition: service_started
    restart: unless-stopped

  # ─────────────────────────────────────────────────────────────────────────────
  # Frontend Angular 21 — servido por Nginx Alpine
  # ─────────────────────────────────────────────────────────────────────────────
  stad-frontend:
    build:
      context: ./stad-frontend
      dockerfile: Dockerfile
    container_name: stad_frontend
    ports:
      - "4200:80"
    depends_on:
      - stad-api
    restart: unless-stopped

volumes:
  stad_db_data:

```
