# Configuración del proyecto

Esta guía explica cómo preparar el entorno para ejecutar el framework desde cero.

## 1. Instalar Git

Descarga Git desde:

https://git-scm.com/downloads

Verifica:

```bash
git --version
```

## 2. Instalar Node.js LTS

Descarga Node.js LTS desde:

https://nodejs.org/

Verifica:

```bash
node -v
npm -v
```

Se recomienda usar una versión LTS activa.

## 3. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd template-playwright-pom
```

## 4. Instalar dependencias

```bash
npm install
```

En CI se usa:

```bash
npm ci
```

## 5. Instalar navegadores de Playwright

```bash
npx playwright install
```

En Linux CI se recomienda:

```bash
npx playwright install --with-deps
```

## 6. Configurar variables de entorno

Crear `.env`:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Valores base:

```env
BASE_URL=https://sauce-demo.myshopify.com/account/login
BROWSER=chromium
HEADLESS=true
DEFAULT_TIMEOUT_MS=30000
```

Credenciales opcionales:

```env
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

No subas `.env` al repositorio.

## 7. Ejecución inicial

```bash
npm test
```

Este comando excluye escenarios `@requiresCredentials`, por lo que debe poder ejecutarse sin datos sensibles.

## Windows

Problemas comunes:

- PowerShell no reconoce comandos de Unix como `cp`. Usa `Copy-Item`.
- Si hay problemas con rutas largas, habilita long paths en Git o Windows.
- Ejecuta la terminal desde la raíz del proyecto.

## macOS

Problemas comunes:

- Si Node fue instalado con permisos de administrador, npm puede fallar por permisos. Se recomienda nvm.
- Si Playwright no abre browsers, reinstala con `npx playwright install`.

## Linux

Problemas comunes:

- Pueden faltar dependencias del sistema para Chromium/WebKit/Firefox.
- Ejecuta `npx playwright install --with-deps`.

## Validaciones útiles

```bash
npm run typecheck
npm run lint
npm test
```

Si estas tres pasan, el template está listo para extenderse.
