# Paracas XP

Paracas XP es una aplicación web para gestionar y comercializar tours, reservas, pagos y operaciones administrativas relacionadas con la región de Ica.

## Estado del programa

Este proyecto se encuentra en **versión beta**. Es una versión funcional para pruebas y demostraciones locales, pero aún puede contener errores, información de ejemplo y funcionalidades incompletas. No debe considerarse una versión lista para producción hasta completar las pruebas de integración y seguridad.

## Requisitos para ejecutar el proyecto localmente

Instala las siguientes herramientas:

- **Node.js 20.19 o superior** (se recomienda una versión LTS reciente).
- **pnpm 10 o superior**.
- **Git** para clonar el repositorio.
- Un navegador moderno: Chrome, Edge o Firefox.

Las dependencias principales incluyen React 19, Vite 8, TypeScript, Tailwind CSS, React Router, Recharts y Express.

## Instalación

Desde la raíz del proyecto:

```bash
git clone https://github.com/ErickCraft1/ParacasXP.git
cd ParacasXP
pnpm install
```

## Comandos disponibles

Iniciar únicamente el frontend:

```bash
pnpm dev
```

Iniciar únicamente el backend Express:

```bash
pnpm dev:server
```

Iniciar frontend y backend al mismo tiempo:

```bash
pnpm dev:full
```

Crear el build de producción del frontend:

```bash
pnpm build
```

Crear el build del servidor:

```bash
pnpm build:server
```

Ejecutar el linter:

```bash
pnpm lint
```

Previsualizar el build del frontend:

```bash
pnpm preview
```

## URLs locales

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- API: `http://localhost:3000/api`

## Compilación y pruebas antes de hacer commit

Ejecuta al menos:

```bash
pnpm lint
pnpm build
pnpm build:server
```

Revisa también que los cambios no incluyan datos sensibles, contraseñas reales, claves privadas o variables de entorno personales.
