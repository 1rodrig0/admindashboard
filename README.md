This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# 🌐 Comunidad Lectora

Plataforma web para lectura y escritura colaborativa desarrollada con **Next.js 15**, **React 18**, **TypeScript** y **CSS Modules**.

> “Menos drama, más commits.”  

---

## 🚀 Stack Tecnológico

- **Next.js 15** con App Router y `src/` directory  
- **React 18** con **TypeScript**  
- **CSS Modules** + `globals.css` para estilos  
- **ESLint** (configuración por defecto de Next.js)  
- Compatible con **Node 18+ / 20+**

---

## 📦 Requisitos

- Node.js **>= 18** (recomendado 20)
- npm **>= 10**
- Git instalado

---

## 🧰 Scripts Disponibles

```bash
npm run dev       # Ejecuta el entorno de desarrollo en http://localhost:3000
npm run build     # Compila para producción
npm start         # Inicia el servidor de producción
npm run lint      # Ejecuta el linter

🗂️ Estructura del Proyecto
src/
 ├─ app/
 │   ├─ globals.css          # Estilos globales
 │   ├─ layout.tsx           # Layout general de la aplicación
 │   └─ page.tsx             # Página principal (/)
 │
 ├─ assets/                  # Imágenes y recursos estáticos
 ├─ components/              # Componentes reutilizables
 ├─ modules/                 # Módulos funcionales
 │   ├─ landing/
 │   ├─ log_in/
 │   ├─ perfil_usuario/
 │   └─ registro/
 │       ├─ assets/
 │       ├─ components/
 │       ├─ styles/
 │       └─ registro.tsx
 │
 └─ lib/                     # Funciones, helpers, utilidades (opcional)
public/                      # Archivos públicos (favicon, imágenes)


⚠️ Evitá usar espacios en los nombres de carpetas (perfil_usuario ✅ en lugar de perfil de usuario ❌)

🧭 Rutas (App Router)
Ruta	Archivo fuente
/	src/app/page.tsx
/login	src/app/login/page.tsx
/registro	src/app/registro/page.tsx
/perfil_usuario	src/app/perfil_usuario/page.tsx

Las rutas se crean automáticamente según la estructura de carpetas dentro de src/app.

## 📐 Plantilla de estructura para NUEVAS FEATURES y COMPONENTES

Para facilitar el mantenimiento, **cada nueva parte del sistema** (feature/módulo) seguirá esta estructura mínima:

src/modules/<feature>/
├─ assets/ # Imágenes, fuentes o mocks SÓLO de la feature
├─ components/ # Componentes internos de la feature
├─ styles/ # CSS Modules exclusivos de la feature
├─ <feature>.tsx # Punto de entrada (vista/contendor principal)
└─ index.ts # Barrel file para exports ordenados


Ejemplo (`registro`):
src/modules/registro/
├─ assets/
│ └─ avatar-placeholder.png
├─ components/
│ ├─ RegistroForm.tsx
│ └─ FieldError.tsx
├─ styles/
│ ├─ Registro.module.css
│ └─ RegistroForm.module.css
├─ registro.tsx
└─ index.ts


### 🧱 Reglas rápidas
- **Un `*.tsx` raíz por feature** (`<feature>.tsx`) que orquesta la UI interna.
- **Todo estilo de la feature** va en `styles/` como **CSS Modules** (`*.module.css`).
- **Componentes internos** van en `components/` (no en `src/components`).
- **Nada global** en `modules/`; lo global vive en `src/components` o `src/app/globals.css`.
- **Barrel file** (`index.ts`) para exportar limpio desde `@modules/<feature>`.

**Ejemplo de `index.ts`**:
```ts
export { default as Registro } from "./registro";
export { default as RegistroForm } from "./components/RegistroForm";

Con esto, podés importar así:

import { Registro } from "@modules/registro";

🧩 Plantilla para un NUEVO COMPONENTE dentro de una feature
src/modules/<feature>/components/
└─ <NombreComponente>/
   ├─ <NombreComponente>.tsx
   ├─ <NombreComponente>.module.css
   ├─ index.ts
   └─ types.ts         # (opcional) Tipos/props compartidos

🧠 Convenciones de nombre

Carpetas/archivos: kebab-case o snake_case (consistente).
Componentes: PascalCase.
CSS Modules: mismo nombre del componente + .module.css.
Props/Tipos: exportarlos desde types.ts cuando sean reutilizables.