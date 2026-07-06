# Arquitectura del framework

Este proyecto usa una arquitectura por capas para evitar que los escenarios E2E se vuelvan frágiles o difíciles de mantener.

## Flujo

```text
Cucumber Feature
  -> Step Definitions
    -> Page Object
      -> Locator Class
        -> Playwright
```

## Responsabilidades

### features/

Contiene escenarios Gherkin. Debe describir comportamiento de negocio, no detalles técnicos.

Ejemplo:

```gherkin
Cuando intenta iniciar sesión con credenciales inválidas
Entonces debe visualizar un mensaje de error de autenticación
```

### src/step-definitions/

Conecta frases Gherkin con métodos públicos de las páginas.

No debe contener:

- Selectores
- `page.locator`
- `getByRole`
- `getByLabel`
- CSS
- XPath
- Lógica de espera
- Credenciales hardcodeadas

Sí puede contener:

- Datos simples no sensibles
- Llamadas a Page Objects
- Composición mínima de pasos de negocio

### src/pages/

Contiene Page Objects y clases de locators.

Las clases `Page` contienen:

- Acciones de usuario
- Validaciones funcionales
- Navegación
- Uso de `expect`
- Orquestación de locators

Las clases `Locators` contienen únicamente:

- Getters de `Locator`
- Selectores semánticos o técnicos justificados

### src/support/

Contiene integración con Cucumber:

- `world.ts`: estado compartido por escenario.
- `hooks.ts`: ciclo de vida Before/After.

Cada escenario inicia un browser/context/page limpio para evitar contaminación entre pruebas.

### src/utils/

Contiene utilidades transversales:

- Variables de entorno
- Logger
- Screenshots

Una utilidad debe crearse solo si resuelve una necesidad compartida por varias partes del framework.

## Por qué separar locators

Separar locators reduce el costo de mantenimiento. Si el HTML cambia, normalmente se modifica un solo archivo, por ejemplo `LoginLocators.ts`, sin tocar steps ni lógica de página.

## Qué cosas no deben ir en steps

Incorrecto:

```ts
await this.page.locator('#customer_email').fill('test@example.com');
```

Correcto:

```ts
await this.loginPage.loginWithCredentials(email, password);
```

## Qué cosas no deben ir en locators

Las clases `Locators` no deben hacer:

- Clicks
- Fills
- Navegación
- Asserts
- Lectura de variables de entorno
- Decisiones de negocio

## Qué cosas sí deben ir en pages

Las clases `Page` deben representar comportamiento real de la página:

- `open()`
- `login(email, password)`
- `assertLoginFormIsVisible()`
- `assertInvalidLoginMessageIsVisible()`

## Cómo escalar

Para nuevas páginas:

1. Crear `NuevaPaginaLocators.ts`.
2. Crear `NuevaPaginaPage.ts`.
3. Agregar la instancia al `CustomWorld`.
4. Crear o ampliar features.
5. Crear steps que llamen métodos públicos del Page Object.

Para flujos de varias páginas, los steps pueden coordinar varias pages, pero cada page mantiene su responsabilidad local.
