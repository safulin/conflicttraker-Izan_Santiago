# Global Conflict Monitor - Fullstack Deployment

## URLs

- Frontend (Vercel): https://conflicttraker-izan-santiago.vercel.app
- Backend (Railway): https://conflicttraker-izansantiago-production.up.railway.app
- Base de dades: Supabase PostgreSQL

## Arquitectura

Usuari -> Vercel (Vue 3 + Vite) -> Railway (Spring Boot) -> Supabase (PostgreSQL)

## Variables d'entorn

### Frontend - Vercel (Settings > Environment Variables)

VITE_API_URL=https://conflicttraker-izansantiago-production.up.railway.app

### Backend - Railway (Variables)

DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USERNAME=postgres.nulirrrxsmvrotftdsou
DB_PASSWORD=(contrasenya de Supabase)

## Modificacions al Backend

- S'ha afegit CorsConfig.java per permetre peticions des del frontend de Vercel.
- S'ha canviat la versio de Spring Boot de 3.5.9-SNAPSHOT a una versio estable.

## Modificacions al Frontend

- S'ha afegit Vue Router per a la navegacio entre vistes.
- S'ha configurat VITE_API_URL per apuntar al backend de Railway.
- S'ha afegit vercel.json per evitar errors 404 en recarregar rutes.
- S'ha baixat Vite de v8 a v5 perque v8 donava error de build a Vercel.

## Errors i solucions

Spring Boot SNAPSHOT: La versio 3.5.9-SNAPSHOT no es estable i Railway no podia fer el build. Solucio: canviar a una versio estable al pom.xml.

Variables d'entorn no resoltes: El backend rebia literalment ${DB_HOST} en lloc del valor real. Solucio: configurar les variables al panell de Railway.

Dockerfile amb conflictes de Git: El Dockerfile tenia markers de merge (<<<<<<< HEAD) que Docker no podia llegir. Solucio: eliminar els markers i deixar nomes el contingut.

Vite 8 error de build: Cannot resolve entry module index.html. Solucio: baixar Vite a v5.4.0.

CORS bloquejat: El frontend no podia fer peticions al backend. Solucio: afegir CorsConfig.java amb allowedOriginPatterns("https://*.vercel.app").

VITE_API_URL no disponible a Vercel: El fitxer .env no es puja a GitHub. Solucio: afegir la variable manualment a Vercel > Settings > Environment Variables.
