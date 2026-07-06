# Troubleshooting

## No se encuentran navegadores de Playwright

Síntoma:

```text
Executable doesn't exist
```

Solución:

```bash
npx playwright install
```

En Linux:

```bash
npx playwright install --with-deps
```

## Error con ts-node

Síntoma:

```text
Cannot find module 'ts-node/register'
```

Solución:

```bash
npm install
```

Verifica que `cucumber.js` tenga:

```js
requireModule: ['ts-node/register'];
```

## Cucumber no encuentra steps

Síntoma:

```text
Undefined. Implement with the following snippet
```

Revisa:

- El texto del step en `.feature`.
- El texto registrado en `login.steps.ts`.
- La configuración `require` en `cucumber.js`.

## Variables de entorno faltantes

Los escenarios normales no requieren credenciales. Los escenarios `@requiresCredentials` necesitan:

```env
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

Si no están definidas, el hook omite esos escenarios.

## El selector cambió

Actualiza solo la clase `*Locators`.

No actualices:

- Step definitions
- Features
- Lógica de negocio

## El sitio no responde

Verifica:

- Conexión a internet.
- `BASE_URL`.
- Si el sitio cambió de dominio.
- Si Shopify muestra captcha o protección temporal.

Ejecuta en modo visible:

```bash
npm run test:headed
```

## Headless falla pero headed funciona

Posibles causas:

- Diferencias de viewport.
- Protección anti-bot del sitio.
- Animaciones o scripts externos lentos.

Acciones:

```bash
npm run test:headed
npm run test:debug
```

Revisa screenshots y reporte HTML.

## Screenshots no se guardan

Los screenshots solo se guardan cuando un escenario falla.

Revisa:

- Carpeta `screenshots/`.
- Permisos de escritura.
- Que el hook `After` se esté cargando en `cucumber.js`.

## Reporte HTML no se genera

Ejecuta:

```bash
npm test
```

Luego abre:

```text
reports/cucumber-report.html
```

Si no aparece, revisa `cucumber.js` y permisos de escritura en `reports/`.

## Login inválido no muestra error esperado

El sitio es público y puede cambiar. Si el texto o estructura del error cambia:

1. Ejecuta `npm run test:headed`.
2. Observa el mensaje real.
3. Actualiza `authenticationError` en `LoginLocators.ts`.
4. Ejecuta `npm test`.

## El escenario de login exitoso no corre

Por diseño, `npm test` excluye `@requiresCredentials`.

Para ejecutarlo:

```bash
TEST_USER_EMAIL="usuario@example.com" TEST_USER_PASSWORD="secret" npm run test:credentials
```

En PowerShell:

```powershell
$env:TEST_USER_EMAIL="usuario@example.com"
$env:TEST_USER_PASSWORD="secret"
npm run test:credentials
```
