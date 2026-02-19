# Conflict Tracker API

Autor: Izan Santiago

API REST para gestionar conflictos, países, facciones, eventos.

## Tecnologías
- Java 17
- Spring Boot 3
- H2 (perfil dev)
- Maven

## Cómo arrancarlo
Ejecuta `ConflicttrackerApplication`.

Puerto por defecto: **8080**.

## Cómo probarlo
En la raíz hay un archivo **`datos.http`** con peticiones de ejemplo para cargar datos.

## Endpoints principales
Base: `/api/v1`

- `GET /conflicts` (opcional: `?estado=ACTIVO` o `?status=ACTIVO`)
- `GET /conflicts/search?q=texto`
- `GET /conflicts/{id}`
- `POST /conflicts`
- `GET /countries/{codigo}/conflicts`

## Extras
- Consola H2: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - User: `sa`
  - Password: (vacío)

- Web simple: `http://localhost:8080/index.html`
