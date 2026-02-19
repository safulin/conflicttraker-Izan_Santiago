CONFLICT TRACKER API
Autor: Izan Santiago

Buenas, aquí dejo la entrega de la práctica de Backend. Es una API REST para gestionar conflictos, países, facciones, eventos, siguiendo la estructura por capas pedida en el enunciado.

QUÉ HE USADO

Java 17

Spring Boot 3

Maven

H2 en memoria (perfil dev por defecto)

DTOs + mappers (para no exponer entidades directamente)

Arquitectura en capas: Controller / Service / Repository

Vistas extra con Thymeleaf en /web/* (listados)

CÓMO ARRANCARLO

Opción rápida (IntelliJ):

Ejecuta la clase: ConflicttrackerApplication

Opción por terminal:

./mvnw spring-boot:run

Puerto por defecto:

http://localhost:8080

Perfil activo por defecto:

dev (configurado en application.yaml)

CÓMO PROBARLO (SIN METER DATOS A MANO)

En la raíz del proyecto tienes el archivo:

datos.http

Si usas IntelliJ:

Ábrelo

Ejecuta las peticiones en orden (1 → 10)

Se crean países, conflictos, facciones, eventos de ejemplo

Incluye ejemplos de filtro por estado, búsqueda por texto

ENDPOINTS PRINCIPALES (API REST)
Base: /api/v1

CONFLICTS

Ver todos:
GET /api/v1/conflicts

Filtrar por estado (acepta estado o status):
GET /api/v1/conflicts?status=ACTIVO
GET /api/v1/conflicts?estado=ACTIVO

Estados soportados (enum):
ACTIVO / CONGELADO / FINALIZADO

Buscar por texto:
GET /api/v1/conflicts/search?q=texto

Ver por id:
GET /api/v1/conflicts/{id}

Crear:
POST /api/v1/conflicts

Actualizar:
PUT /api/v1/conflicts/{id}

Borrar:
DELETE /api/v1/conflicts/{id}

COUNTRIES

Ver todos:
GET /api/v1/countries

Ver por id:
GET /api/v1/countries/{id}

Crear:
POST /api/v1/countries

Actualizar:
PUT /api/v1/countries/{id}

Borrar:
DELETE /api/v1/countries/{id}

FACTIONS

Ver todas:
GET /api/v1/factions

Ver por id:
GET /api/v1/factions/{id}

Crear:
POST /api/v1/factions

Actualizar:
PUT /api/v1/factions/{id}

Borrar:
DELETE /api/v1/factions/{id}

EVENTS

Ver todos:
GET /api/v1/events

Ver por id:
GET /api/v1/events/{id}

Crear:
POST /api/v1/events

Actualizar:
PUT /api/v1/events/{id}

Borrar:
DELETE /api/v1/events/{id}

EXTRAS

H2 Console (perfil dev):

http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

User: sa

Password: (vacío)

Perfiles:

application-dev.yaml → H2 en memoria (modo dev)

application-prod.yaml → PostgreSQL (modo prod, requiere configurar credenciales/BD)

Vistas web (Thymeleaf):

http://localhost:8080/web/conflict

http://localhost:8080/web/country

http://localhost:8080/web/event

http://localhost:8080/web/faction

Página índice:

http://localhost:8080/index.html

(incluye enlaces a las vistas /web/*)

ESTRUCTURA DEL PROYECTO

controller → endpoints REST

controller/web → vistas Thymeleaf (/web/*)

service → lógica de negocio

repository → acceso a datos (JPA)

model → entidades + enums

dto → objetos de intercambio

exception → manejo de errores (handler + not found)
