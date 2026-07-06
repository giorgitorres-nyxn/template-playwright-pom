# Template Playwright POM con Cucumber y TypeScript

Proyecto plantilla para automatización E2E sobre la página de login de Sauce Demo Shopify:

https://sauce-demo.myshopify.com/account/login

El objetivo principal es automatizar el flujo de login con una arquitectura limpia, mantenible y lista para crecer con Page Object Model, Cucumber/Gherkin y Playwright. El comando `npm test` ejecuta escenarios que no dependen de credenciales reales y excluye por defecto los escenarios marcados con `@requiresCredentials`.

## Stack

- Node.js y npm
- TypeScript en modo estricto
- Playwright como motor de navegador
- Cucumber.js como runner BDD
- Gherkin en español
- Page Object Model
- dotenv para configuración por ambiente
- ESLint y Prettier para calidad de código
- GitHub Actions para CI

## ¿Qué es POM?

Page Object Model separa el código de automatización por responsabilidades. Los steps describen acciones de negocio, las clases Page contienen acciones y validaciones de una página, y las clases Locators centralizan los selectores. Esto evita duplicación, facilita cambios cuando el HTML cambia y mantiene los escenarios legibles.

## ¿Qué es Cucumber?

Cucumber permite escribir escenarios en lenguaje natural usando Gherkin. En este proyecto los `.feature` expresan el comportamiento esperado y los step definitions conectan esas frases con métodos públicos de las páginas.

## Estructura

```text
.
├── .github/workflows/e2e.yml
├── .vscode/
├── docs/
├── features/login.feature
├── reports/.gitkeep
├── screenshots/.gitkeep
├── src/
│   ├── pages/
│   ├── step-definitions/
│   ├── support/
│   └── utils/
├── .env.example
├── cucumber.js
├── package.json
└── tsconfig.json
```

Flujo principal:

```text
Feature -> Step Definition -> Page Object -> Locators -> Playwright
```

## Requisitos previos

- Git
- Node.js LTS
- npm
- Visual Studio Code
- Extensiones recomendadas de VS Code: Playwright, Cucumber, ESLint y Prettier
- Navegadores de Playwright instalados con `npx playwright install`
- Python no es obligatorio para ejecutar los tests base. Solo puede ser útil si se agregan herramientas externas de IA o automatización que lo requieran.

## Instalación

```bash
git clone <url-del-repositorio>
cd template-playwright-pom
npm install
npx playwright install
```

Crea el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Variables de entorno

```env
BASE_URL=https://sauce-demo.myshopify.com/account/login
BROWSER=chromium
HEADLESS=true
DEFAULT_TIMEOUT_MS=30000
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

`TEST_USER_EMAIL` y `TEST_USER_PASSWORD` solo se necesitan para ejecutar escenarios `@requiresCredentials`.

## Comandos

```bash
npm test
npm run test:headed
npm run test:debug
npm run test:all
npm run test:login
npm run test:credentials
npm run report
npm run typecheck
npm run lint
npm run format
```

- `npm test`: ejecuta Cucumber excluyendo `@requiresCredentials`.
- `npm run test:headed`: abre el navegador visible.
- `npm run test:debug`: ejecuta con inspector de Playwright.
- `npm run test:all`: intenta ejecutar todos los escenarios. Los escenarios `@requiresCredentials` se omiten si no hay credenciales.
- `npm run test:login`: ejecuta escenarios de login sin credenciales reales.
- `npm run test:credentials`: ejecuta solo escenarios con credenciales.
- `npm run report`: genera `reports/cucumber-report.html`.

Para ejecutar por tags:

```bash
CUCUMBER_TAGS="@smoke" npm test
CUCUMBER_TAGS="@login and not @requiresCredentials" npm test
```

En PowerShell:

```powershell
$env:CUCUMBER_TAGS="@smoke"; npm test
```

## Reportes y screenshots

Cucumber genera:

- `reports/cucumber-report.html`
- `reports/cucumber-report.json`

Cuando un escenario falla, el hook `After` guarda una captura en `screenshots/` y la adjunta al reporte.

## Cómo agregar una nueva página

1. Crea `src/pages/ProductLocators.ts`.
2. Crea `src/pages/ProductPage.ts`.
3. Declara la página en `CustomWorld` si los steps la usarán.
4. Agrega escenarios en `features/`.
5. Crea step definitions que llamen métodos públicos del Page Object.

Los steps no deben usar `page.locator`, `getByRole`, CSS ni XPath directamente.

## Convenciones

- Features: `login.feature`, `product.feature`.
- Steps: `login.steps.ts`, `product.steps.ts`.
- Locators: `LoginLocators`, `ProductLocators`.
- Pages: `LoginPage`, `ProductPage`.
- Métodos de acción: `open`, `fillEmail`, `submit`, `login`.
- Métodos de validación: prefijo `assert`.

## Buenas prácticas

- No hardcodear credenciales.
- No usar sleeps.
- Preferir locators accesibles.
- Mantener los selectores en clases `Locators`.
- Mantener acciones y asserts funcionales en clases `Page`.
- Mantener steps limpios y orientados al negocio.
- Revisar todo código generado por IA antes de commitear.

## Troubleshooting rápido

- Si faltan navegadores: `npx playwright install`.
- Si Cucumber no encuentra steps: revisa `cucumber.js` y que el texto del step coincida.
- Si falta `.env`: copia `.env.example`.
- Si cambió el selector: actualiza solo la clase `Locators`.
- Si falla en headless pero funciona headed: ejecuta `npm run test:headed` y revisa capturas.

Más detalle en `docs/TROUBLESHOOTING.md`.
