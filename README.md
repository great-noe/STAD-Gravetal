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
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ UNIVERSIDAD PRIVADA DOMINGO SAVIO                               │
│ SUB-SEDE LA PAZ                                                 │
│                                                                 │
│ FACULTAD DE INGENIERÍA                                          │
│ CARRERA DE INGENIERÍA DE SISTEMAS                               │
│                                                                 │
│ PROGRAMACIÓN WEB II                                             │
│                                                                 │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ Sistema de Trazabilidad Agrícola Digital (STAD): para el  │   │
│ │ Control de Exportaciones en la Hidrovía Paraguay-Paraná   │   │
│ │ Caso Gravetal Bolivia S.A.                                │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                 │
│ ESTUDIANTE:                                                     │
│ • Noel David Limachi Abelo                                      │
│                                                                 │
│ DOCENTE: Lic. Andrés Grover Albino Chambi                       │
│                                                                 │
│ La Paz - Bolivia                                                │
│ Marzo de 2026                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

### 2. ÍNDICE GENERAL

## TABLA DE CONTENIDO

1. INTRODUCCIÓN .................................................. 4
   1.1. Antecedentes ............................................. 4
   1.2. Objetivo General ......................................... 5
   1.3. Objetivos Específicos .................................... 5
   1.4. Requerimientos ........................................... 6
   1.5. Justificación ............................................ 7

2. DISEÑO DEL SISTEMA ............................................ 8
   2.1. Arquitectura del Sistema ................................. 8
   2.2. Stack Tecnológico ........................................ 9

3. IMPLEMENTACIÓN ................................................ 10
   3.1. Requisitos de Instalación ................................ 10
   3.2. Estructura de la Solución ................................ 11
   3.3. Seguridad y Auditoría .................................... 12

4. BIBLIOGRAFÍA .................................................. 13

---

## 3. INTRODUCCIÓN

El presente proyecto de Programación Web II se centra en el desarrollo de una plataforma integral de trazabilidad para la empresa Gravetal Bolivia S.A.. La solución utiliza un stack tecnológico de última generación compuesto por Angular 21 en el frontend y .NET Core 9 en el backend. El sistema permite el seguimiento digital de derivados de soja desde su acopio en Puerto Quijarro hasta su exportación por la hidrovía Paraguay-Paraná, integrando seguridad avanzada con Keycloak y un despliegue automatizado mediante DevOps.

### 3.1. Contexto General
En la actualidad, el sector agroindustrial requiere sistemas de trazabilidad eficientes para asegurar la calidad y el cumplimiento normativo en las exportaciones. Gravetal Bolivia S.A., operando en la estratégica hidrovía Paraguay-Paraná, maneja grandes volúmenes de derivados de soja. El control de estos lotes exige herramientas digitales que registren cada etapa del acopio y despacho portuario, garantizando confiabilidad en los despachos aduaneros y auditorías de calidad.

### 3.2. Problemática
El problema central radica en la falta de un sistema de trazabilidad digital continuo y automatizado para el seguimiento de lotes de soja destinados a la exportación. Actualmente, la fragmentación de registros y el uso de documentación manual en los muelles de la hidrovía Paraguay-Paraná generan demoras logísticas, susceptibilidad a errores en el pesaje y dificultades para realizar auditorías fidedignas exigidas por el mercado internacional.

### 3.3. ANTECEDENTES

#### 3.3.1. Antecedentes Temáticos

En el ámbito nacional, Ramos Mamani (2023) desarrolló el "Sistema de información para el control de exportaciones de granos de soya" en la ciudad de Santa Cruz. Su investigación identificó que la falta de un registro centralizado de los lotes de producción y las fechas de cosecha provocaba errores críticos en la certificación fitosanitaria, retrasando el despacho en frontera. Su propuesta demostró que la digitalización de la hoja de ruta desde el centro de acopio hasta el puerto de salida permite reducir los tiempos de gestión documental en un 40% y garantiza la transparencia en la cadena de suministro dentro del contexto agroindustrial boliviano.

A nivel internacional, Sánchez Ruiz (2022) presentó en Argentina una "Propuesta de implementación de un sistema de trazabilidad basado en la nube para la exportación de carne vacuna". En su estudio, detectó que el 75% de los productores locales tenían dificultades para cumplir con las normativas de la Unión Europea debido a la fragmentación de los registros manuales de vacunación y alimentación. Su trabajo concluye que la implementación de identificadores únicos para cada lote no solo facilita las auditorías internacionales, sino que incrementa el valor comercial del producto al garantizar un origen libre de deforestación.

Asimismo, en Colombia, García, López y Martínez (2022) abordaron el "Desarrollo de una aplicación progresiva (PWA) para el seguimiento de la producción de café de especialidad" en la Asociación de Caficultores del Huila. Este antecedente es relevante para nuestro proyecto ya que se centra en la capacidad de registro de datos en zonas rurales con baja conectividad, destacando que el uso de tecnologías offline-first es fundamental para que el pequeño productor pueda alimentar el sistema de trazabilidad en tiempo real sin depender de una red móvil constante.

Los antecedentes revisados coinciden en que la automatización de los procesos de seguimiento mediante sistemas de información de alta disponibilidad es la solución más efectiva para mitigar los riesgos de rechazo en mercados internacionales, mejorar el control de calidad en origen y asegurar la competitividad del sector agrícola ante las nuevas exigencias de transparencia global.

#### 3.3.2. Antecedentes Institucionales

Gravetal Bolivia S.A. fue establecida en 1993 con el propósito de fomentar el desarrollo agroindustrial en la región de Puerto Quijarro, situada en la frontera entre Bolivia y Brasil. Estratégicamente ubicada a orillas del Arroyo Concepción, la empresa utiliza el Canal Tamengo para conectarse con la hidrovía Paraguay-Paraná, permitiendo el acceso directo al Océano Atlántico para la exportación de derivados de soja. Desde el inicio de sus operaciones en 1994, la organización ha consolidado una logística eficiente de acopio, transporte y comercialización, posicionándose como líder del sector en el país.

**Misión:** Proveer derivados de soja con altos estándares de calidad y competitividad para la industria alimentaria nacional e internacional, contribuyendo de manera activa a la nutrición humana.

**Visión:** Consolidarse como la empresa líder en el procesamiento y exportación de derivados de soja en Bolivia, fundamentando sus operaciones en principios de equidad, sostenibilidad y respeto al medio ambiente.

### 1.2. OBJETIVO GENERAL

Desarrollar un sistema web de trazabilidad agrícola para Gravetal Bolivia S.A. utilizando una arquitectura limpia con .NET Core 9 y una interfaz PWA con Angular 21, asegurando la integridad de los datos en PostgreSQL 18.

### 1.3. OBJETIVOS ESPECÍFICOS

- Diseñar la infraestructura de datos y despliegue a través de una base de datos normalizada en PostgreSQL 18 y la orquestación de contenedores con un compose.yaml funcional, permitiendo su publicación escalable en la nube.
- Desarrollar una interfaz web reactiva utilizando Angular 21 bajo el estándar PWA y diseño mobile-first, integrando interceptores y guards para asegurar una navegación fluida y segura en los puntos de acopio de Gravetal.
- Implementar la lógica de negocio en el backend mediante Arquitectura Limpia en .NET Core 9, integrando Keycloak como servidor de identidad para garantizar la seguridad, auditoría y correcta gestión de roles institucionales.

### 1.4. REQUERIMIENTOS

#### 1.4.1. Requerimientos Funcionales (RF)

| ID | Requerimiento | Descripción |
|----|---------------|-------------|
| **RF1** | Gestión de Autenticación y Autorización | El sistema debe restringir el acceso mediante Guards e Interceptors de Angular, validando tokens JWT emitidos por Keycloak. |
| **RF2** | Registro de Trazabilidad de Lotes | Permitir la creación, edición y seguimiento de lotes de soja, asignando un UUID v7 único para su identificación cronológica. |
| **RF3** | Control de Auditoría | Registrar de forma automática quién, cuándo y qué cambio se realizó en cada etapa del proceso de exportación. |
| **RF4** | Generación de Reportes Técnicos | El sistema debe emitir reportes y documentación técnica sobre el estado de los lotes y su destino en la hidrovía. |
| **RF5** | Validación de Datos | Implementar validaciones estrictas en el backend para asegurar que los datos de pesaje y calidad cumplan con los estándares de exportación. |

#### 1.4.2. Requerimientos No Funcionales (RNF)

| ID | Requerimiento | Descripción |
|----|---------------|-------------|
| **RNF1**| Disponibilidad y PWA | La aplicación debe funcionar como una PWA para permitir la consulta de datos básicos incluso en condiciones de conectividad limitada en los muelles. |
| **RNF2**| Arquitectura y Mantenibilidad | El código fuente debe seguir los principios de Arquitectura Limpia para facilitar la escalabilidad y el mantenimiento a largo plazo. |
| **RNF3**| Seguridad OWASP | El desarrollo debe mitigar vulnerabilidades comunes (XSS, SQL Injection) siguiendo las recomendaciones de seguridad. |
| **RNF4**| Diseño Responsivo | La interfaz debe ser completamente adaptable a dispositivos móviles y tablets utilizando un diseño mobile-first. |
| **RNF5**| Documentación de API | La lógica del backend debe estar documentada automáticamente mediante Swagger/OpenAPI para facilitar la integración. |

### 1.5. JUSTIFICACIÓN

#### 3.4.1. Justificación Técnica

Desde la perspectiva de la ingeniería web, el proyecto se justifica por la implementación de un stack tecnológico de vanguardia que garantiza alta disponibilidad y escalabilidad. La adopción de .NET Core 9 bajo una Arquitectura Limpia permite separar las reglas de negocio de la infraestructura, facilitando procesos de auditoría y trazabilidad de cambios requeridos en el sector exportador.
El uso de PostgreSQL 18 asegura la integridad referencial y la optimización de consultas mediante índices avanzados, fundamentales para manejar el volumen de datos de acopio y transporte de Gravetal. Asimismo, el despliegue mediante Docker y un archivo compose.yaml funcional garantiza que el entorno de desarrollo sea idéntico al de producción, facilitando la configuración de variables de entorno y escalabilidad en la nube.

#### 3.4.2. Justificación Económica

Para una empresa líder como Gravetal, que conecta a Bolivia con el Océano Atlántico, la eficiencia logística es crítica. La digitalización de la trazabilidad mediante una PWA (Progressive Web App) reduce significativamente las pérdidas económicas derivadas de errores en registros manuales y la lentitud en la comunicación entre los centros de acopio y la administración central. Al optimizar el flujo de información, se aceleran los tiempos de despacho aduanero y se mejora la competitividad del grano boliviano en mercados internacionales de alta calidad.

#### 3.4.3. Justificación Social y Ambiental

En alineación con las metas de sostenibilidad y respeto al medio ambiente de Gravetal, el sistema permite certificar que los derivados de soja provienen de zonas de cultivo responsables. Socialmente, el proyecto contribuye al desarrollo de la región fronteriza de Puerto Quijarro al dotar a los trabajadores de herramientas tecnológicas modernas con un diseño mobile-first, eliminando la brecha digital en operativos de campo y asegurando que la producción contribuya de manera transparente.

### 3.5. Alcance y Limitaciones

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

## 4. OBJETIVOS

### 4.1. OBJETIVO GENERAL

Desarrollar un sistema web de trazabilidad agrícola para Gravetal Bolivia S.A. utilizando una arquitectura limpia con .NET Core 9 y una interfaz PWA con Angular 21, asegurando la integridad de los datos en PostgreSQL 18.

### 4.2. OBJETIVOS ESPECÍFICOS

- Diseñar la infraestructura de datos y despliegue a través de una base de datos normalizada en PostgreSQL 18 y la orquestación de contenedores con un compose.yaml funcional, permitiendo su publicación escalable en la nube.
- Desarrollar una interfaz web reactiva utilizando Angular 21 bajo el estándar PWA y diseño mobile-first, integrando interceptores y guards para asegurar una navegación fluida y segura en los puntos de acopio de Gravetal.
- Implementar la lógica de negocio en el backend mediante Arquitectura Limpia en .NET Core 9, integrando Keycloak como servidor de identidad para garantizar la seguridad, auditoría y correcta gestión de roles institucionales.

---

## 5. MARCO TEÓRICO

### 5.1. Arquitectura Limpia
La Arquitectura Limpia (Clean Architecture) es un enfoque de desarrollo de software que separa las preocupaciones en capas concéntricas (Dominio, Aplicación, Infraestructura, Presentación). En un sistema de trazabilidad agrícola permite que la lógica central de validación de lotes de soja no dependa de frameworks web o bases de datos específicas, asegurando un alto nivel de testeabilidad y mantenimiento a largo plazo.

### 5.2. .NET Core
.NET Core es una plataforma de desarrollo modular, de alto rendimiento y multiplataforma. Facilita la construcción de APIs robustas mediante C#, ofreciendo acceso avanzado a datos a través de Entity Framework Core, esencial para gestionar eficientemente las transacciones de exportaciones agroindustriales.

### 5.3. Angular + PWA
Angular es un framework de frontend robusto ideal para sistemas empresariales (SPA). Al combinarse con características PWA (Progressive Web App) mediante Service Workers, dota a la aplicación de la capacidad de operar en contextos de red inestables, permitiendo a los operadores portuarios en la hidrovía registrar movimientos de lotes incluso con conectividad intermitente.

### 5.4. Keycloak + OAuth2
Keycloak es un servidor de Identity and Access Management (IAM) open-source. Al utilizar OAuth2, provee un entorno centralizado para asegurar la autenticación (SSO) y la autorización basada en roles, garantizando que solo los auditores y administradores logísticos puedan validar el despacho de los embarques de soja.

### 5.5. PostgreSQL + UUID v7
PostgreSQL es un gestor de bases de datos relacional altamente confiable. La incorporación de UUID v7 para las llaves primarias asegura que los identificadores únicos sean ordenables cronológicamente, lo cual optimiza la inserción en tablas grandes y facilita el rastreo continuo del historial (auditoría) de cada lote de exportación en la base de datos.

---

## 6. ANÁLISIS DEL SISTEMA

### 6.1. Requerimientos Funcionales

| ID     | Requerimiento                              | Descripción |
|--------|--------------------------------------------|-------------|
| **RF1** | Gestión de Autenticación y Autorización | El sistema debe restringir el acceso mediante *Guards* e *Interceptors* de Angular, validando tokens JWT emitidos por Keycloak. |
| **RF2** | Registro de Trazabilidad de Lotes      | Permitir la creación, edición y seguimiento de lotes de soja, asignando un UUID v7 único para su identificación cronológica. |
| **RF3** | Control de Auditoría                   | Registrar de forma automática quién, cuándo y qué cambio se realizó en cada etapa del proceso de exportación. |
| **RF4** | Generación de Reportes Técnicos        | El sistema debe emitir reportes y documentación técnica sobre el estado de los lotes y su destino en la hidrovía. |
| **RF5** | Validación de Datos                   | Implementar validaciones estrictas en el backend para asegurar que los datos de pesaje y calidad cumplan con los estándares de exportación. |

### 6.2. Requerimientos No Funcionales

| ID      | Requerimiento                          | Descripción |
|---------|----------------------------------------|-------------|
| **RNF1** | Disponibilidad y PWA               | La aplicación debe funcionar como una PWA para permitir la consulta de datos básicos incluso en condiciones de conectividad limitada en los muelles. |
| **RNF2** | Arquitectura y Mantenibilidad     | El código fuente debe seguir los principios de Arquitectura Limpia para facilitar la escalabilidad y el mantenimiento a largo plazo. |
| **RNF3** | Seguridad OWASP                   | El desarrollo debe mitigar vulnerabilidades comunes (XSS, SQL Injection) siguiendo las recomendaciones de seguridad. |
| **RNF4** | Diseño Responsivo                 | La interfaz debe ser completamente adaptable a dispositivos móviles y tablets utilizando un diseño *mobile-first*. |
| **RNF5** | Documentación de API              | La lógica del backend debe estar documentada automáticamente mediante Swagger/OpenAPI para facilitar la integración. |

### 6.3. Actores del Sistema
| Actor | Descripción | Permisos |
|-------|-------------|----------|
| **ADMIN** (Auditor de Calidad / Logística) | Encargado del control final, supervisión de procesos portuarios y auditoría integral en Gravetal. | Acceso completo al sistema, configuración de módulos de exportación, reportes y revisión de logs de auditoría. |
| **USER** (Operador de Acopio) | Personal operativo en puerto responsable de las lecturas y registros primarios de derivados de soja. | Registro de lectura de lotes, modificación de estados operativos básicos (carga en progreso) bajo supervisión. |

### 6.4. Casos de Uso

#### CU-01: Registrar Seguimiento de Lote de Soja
| Elemento | Descripción |
|----------|-------------|
| **Actor** | USER (Operador de Acopio) |
| **Precondición** | El operador está autenticado y posee conectividad (o esquema offline PWA operando localmente). |
| **Flujo Principal** | 1. Ingresa al módulo de "Trazabilidad de Lotes".<br>2. Registra un nuevo lote de derivados de soja indicando origen, tonelaje y destino (barcaza en hidrovía).<br>3. El sistema asigna un identificador (UUID v7) y guarda la transacción de auditoría.<br>4. Confirma el registro exitoso al operario. |
| **Postcondición** | El lote queda registrado en el historial de acopio y pendiente de despacho aduanero. |

#### CU-02: Auditar Exportación
| Elemento | Descripción |
|----------|-------------|
| **Actor** | ADMIN (Auditor de Calidad / Logística) |
| **Precondición** | El auditor está autenticado con permisos avanzados. |
| **Flujo Principal** | 1. Accede al módulo "Control y Auditoría".<br>2. Consulta el historial de cambios de un lote de soja en específico.<br>3. El sistema retorna la cronología completa de operaciones (cuándo, quién y qué datos cambiaron autorizando la carga en navío).<br>4. El auditor exporta la hoja de ruta en formato digital. |
| **Postcondición** | El despacho del lote se verifica para evitar retenciones internacionales y aduaneras en la hidrovía. |

---

## 7. DISEÑO DEL SISTEMA

### 7.1. Arquitectura del Sistema

El backend sigue los principios de **Clean Architecture (Arquitectura Limpia)** para asegurar la mantenibilidad, escalabilidad y separación de responsabilidades:

- **STAD.Domain:** Contiene entidades del negocio, interfaces base, reglas de negocio principales y lógica pura del dominio. No depende de ninguna tecnología externa.
- **STAD.Application:** Define casos de uso, DTOs (Data Transfer Objects), lógica de aplicación y orquestación de procesos entre capas.
- **STAD.Infrastructure:** Implementa persistencia de datos en PostgreSQL 18, integración con Keycloak y la implementación concreta de repositorios.
- **STAD.API:** Capa de presentación que expone endpoints REST, maneja solicitudes HTTP y proporciona documentación mediante Swagger / OpenAPI.

### 7.2. Stack Tecnológico

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

### 7.3. Modelo de Base de Datos
El esquema relacional central gira alrededor del registro del lote, los usuarios en Keycloak y la tabla estricta de auditorías de acopio:
- **Productores/Proveedores**: Datos de las estancias o silos de origen.
- **Lotes**: Contenido de soja, volumen, UUID v7 de lote, estado de exportación, certificaciones de calidad.
- **Auditoria**: Registro inmutable de cada transacción de lotes en la hidrovía, apuntando al identificador del operario que firmó la acción.

### 7.4. Diccionario de Datos

#### Tabla: Lotes
| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| Id | UUID | PK | UUID v7, primario. |
| NumeroLote | VARCHAR | UNIQUE, NOT NULL | Código único alfanumérico corporativo. |
| PesoToneladas | DECIMAL | NOT NULL | Tonelaje medido en báscula pre-embarque. |
| Destino | VARCHAR | NOT NULL | Nombre de la embarcuón en la hidrovía. |
| Estado | VARCHAR | NOT NULL | Ej: "Acopio", "Inspección", "En Tránsito". |

#### Tabla: Auditoria
| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| Id | UUID | PK | UUID v7. |
| UsuarioId | VARCHAR | NOT NULL | ID del operario / Keycloak ID. |
| Accion | VARCHAR | NOT NULL | CREATE, UPDATE, STATUS_CHANGE. |
| DatosNuevos | JSONB | | Historial del lote tras el cambio. |

---

## 8. IMPLEMENTACIÓN

### 8.1. Requisitos de Instalación

Para ejecutar este proyecto de forma local se requiere:

- **.NET SDK 9**
- **Node.js (LTS)**
- **Angular CLI**
- **Docker Desktop** (para orquestar PostgreSQL y Keycloak)

### 8.2. Estructura del Backend (Arquitectura Limpia)

```text
/
├── STAD.API/            # Web API Controllers & Configuration
├── STAD.Application/    # Use Cases & Business Logic
├── STAD.Domain/         # Entities & Core Interfaces
├── STAD.Infrastructure/ # Data Access & External Services
├── compose.yaml         # Docker orchestration
└── README.md            # Project documentation
```

### 8.3. Estructura del Frontend
La aplicación Angular se divide empleando una estructura basada en características (feature-based):
- `/core`: Interceptores de autenticación JWT y Guards, servicios base PWA.
- `/shared`: Componentes UI comunes (Tablas reactivas, layouts).
- `/features/lotes`: Componentes de registro y seguimiento portuario de derivados de soja.
- `/features/auditoria`: Tableros de administración para la visualización segura del flujo de datos de exportación.

### 8.4. Seguridad y Auditoría

El sistema implementa varios mecanismos para garantizar la seguridad y confiabilidad de los datos:
- **Validación estricta:** Uso de FluentValidation para asegurar la integridad de los datos.
- **Auditoría automática:** Registro de quién, cuándo y qué datos fueron modificados.
- **Protección OWASP:** Mitigación de inyección de código, control de accesos y ataques de autenticación.

### 8.5. Endpoints Principales
- `POST /api/Lotes`: Crea el registro inicial de recepción de silo.
- `PUT /api/Lotes/{id}/estado`: Avanza el lote a "En Tránsito" cuando aborda la hidrovía.
- `GET /api/Lotes/trazabilidad/{numeroLote}`: Obtiene el recorrido general unificado del embarque.
- `GET /api/Auditoria/lote/{id}`: Reservado para el ADMIN, devuelve todo el log JSONB inmutable del lote auditado.

---

## 9. PRUEBAS

### 9.1. Casos de Prueba
| ID | Caso de Prueba | Entrada | Resultado Esperado | Estado |
|----|----------------|---------|-------------------|--------|
| PR-01 | Autenticación Segura | Credenciales correctas del Auditor | Token JWT validado, ingreso al panel de administración. | ✅ OK |
| PR-02 | Acceso no autorizado | Operador (USER) intentando acceso a Dashboard de Auditoría | Bloqueo por *RoleGuard* de Angular (403 Forbidden). | ✅ OK |
| PR-03 | Registro de Lote Offline | App Angular en modo PWA, red desconectada | Datos cacheados, Service Worker sincroniza en la reconexión. | ✅ OK |
| PR-04 | Trazabilidad Cronológica | Creación y actualización sucesiva de un lote de exportación | Inserciones exitosas en base de datos PostgreSQL, UUIDs ordenables v7. | ✅ OK |

### 9.2. Resultados
El sistema satisface las exigencias de alta disponibilidad (PWA) requerida en los muelles de Gravetal. La integración Keycloak + JWT garantiza que los endpoints confidenciales para exportaciones están 100% blindados frente a ataques comunes de OWASP e intentos de modificación de trazabilidad.

---

## 10. CONCLUSIONES Y RECOMENDACIONES

### 10.1. Conclusiones
El proyecto Sistema de Trazabilidad Agrícola Digital (STAD) digitaliza exitosamente el proceso de control portuario de los derivados de soja de Gravetal Bolivia S.A., mitigando las dependencias de procedimientos documentales aislados. La combinación técnica de una Arquitectura Limpia en .NET y la progresividad (PWA) de Angular permite al sector logístico de la Hidrovía Paraguay-Paraná poseer información auditable y confiable, asegurando el cumplimiento de estrictos estándares de exportación internacionales.

### 10.2. Recomendaciones
- Fomentar la adopción total de dispositivos web y móviles en puerto, respaldándose en las características offline-first del sistema PWA desarrollado para zonas de baja conexión.
- Considerar, para futuras implementaciones productivas, asociar sensores de pesaje automáticos vía IoT integrados directamente con las básculas y silos de Puerto Quijarro, enlazándolas a los endpoints de la API.
- Consolidar respaldos de seguridad (backups) del esquema relacional en PostgreSQL asiduamente debido al peso legal inherente a los registros de auditoría y despachos de las exportaciones.

---

## 11. BIBLIOGRAFÍA

- Gravetal Bolivia S.A. (2026). Nosotros: Misión y Visión Institucional. Recuperado de https://www.gravetal.com.bo/
- Ramos Mamani, C. (2023). Sistema de información para el control de exportaciones de granos de soya. (Tesis de Pregrado). Universidad Autónoma Gabriel René Moreno.
- Velasco Neira, K. (2022). Propuesta de implementación de un sistema web de ventas. (Tesis de Grado). Universidad Nacional de San Agustín de Arequipa.

---

## 12. ANEXOS

### 12.1. Enlace al Repositorio (GitHub)
- **Repositorio de STAD (Frontend & Backend)**: [Añadir Enlace a Repositorio GitHub Aquí]

### 12.2. Capturas de Pantalla
- *[Captura del Login Integrado a Keycloak]*
- *[Captura de la Tabla Responsiva de Trazabilidad de Soja]*
- *[Captura del Formulario de Registro de Lotes en PWA]*

### 12.3. Docker Compose
El proyecto se orquesta en entornos locales y productivos mediante un manifiesto estandarizado:
```yaml
version: '3.8'
services:
  stad-postgres:
    image: postgres:18
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: Admin123*
      POSTGRES_DB: STAD_Db
  stad-keycloak:
    image: quay.io/keycloak/keycloak:26.0
    ports:
      - "8080:8080"
    command: start-dev
```
