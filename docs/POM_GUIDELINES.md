# Guía de Page Object Model

Page Object Model es un patrón que modela cada página o componente significativo como una clase. La prueba no conoce detalles del DOM; interactúa con métodos de alto nivel.

## Beneficios

- Menos duplicación de selectores.
- Escenarios más legibles.
- Refactors más seguros.
- Mejor colaboración entre QA, developers e IA.
- Cambios de UI aislados en locators.

## Reglas del proyecto

1. Los steps no usan locators directamente.
2. Los locators viven en clases `*Locators`.
3. Las acciones viven en clases `*Page`.
4. Los asserts funcionales viven en clases `*Page`.
5. No se duplican selectores.
6. No se usan sleeps.
7. Se prefieren locators accesibles.
8. CSS o XPath solo se usan cuando no hay alternativa semántica razonable.
9. Las credenciales nunca se hardcodean.

## Ejemplo correcto

```ts
// login.steps.ts
When('inicia sesión', async function () {
  await this.loginPage.loginWithCredentials(email, password);
});
```

```ts
// LoginPage.ts
async loginWithCredentials(email: string, password: string): Promise<void> {
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.submit();
}
```

```ts
// LoginLocators.ts
get emailInput(): Locator {
  return this.page.getByLabel(/email address/i);
}
```

## Ejemplo incorrecto

```ts
When('inicia sesión', async function () {
  await this.page.locator('#customer_email').fill('test@example.com');
  await this.page.locator('#customer_password').fill('secret');
  await this.page.locator('input[type="submit"]').click();
});
```

Problemas:

- El step conoce selectores.
- Hay credenciales en código.
- Se mezcla negocio con detalles de UI.
- El cambio del DOM obliga a tocar steps.

## Nombres de clases

- Página: `LoginPage`, `ProductPage`, `CheckoutPage`.
- Locators: `LoginLocators`, `ProductLocators`, `CheckoutLocators`.

## Nombres de métodos

Acciones:

- `open()`
- `fillEmail(email)`
- `submit()`
- `addProductToCart(productName)`

Validaciones:

- `assertLoginFormIsVisible()`
- `assertInvalidLoginMessageIsVisible()`
- `assertCartContainsProduct(productName)`

## Cómo crear una nueva página

Crear `src/pages/ProductLocators.ts`:

```ts
import type { Locator, Page } from '@playwright/test';

export class ProductLocators {
  constructor(private readonly page: Page) {}

  get productTitle(): Locator {
    return this.page.getByRole('heading', { name: /products/i });
  }
}
```

Crear `src/pages/ProductPage.ts`:

```ts
import { expect, type Page } from '@playwright/test';
import { ProductLocators } from './ProductLocators';

export class ProductPage {
  private readonly locators: ProductLocators;

  constructor(private readonly page: Page) {
    this.locators = new ProductLocators(page);
  }

  async assertProductsAreVisible(): Promise<void> {
    await expect(this.locators.productTitle).toBeVisible();
  }
}
```

## Cuándo crear utils

Crea una utilidad cuando:

- La lógica se reutiliza en varias páginas.
- No pertenece a una página específica.
- Tiene pruebas o validaciones transversales.

Ejemplos:

- Lectura de variables de entorno.
- Logger.
- Generación de nombres de screenshots.

## Cuándo no crear utils

No crees una utilidad si:

- Solo se usa una vez.
- Oculta una acción propia de una página.
- Hace más difícil entender el flujo.

## Evitar overengineering

Empieza con clases pequeñas. Agrega abstracciones cuando reduzcan duplicación real o aclaren responsabilidades. Un framework escalable no es el que tiene más capas, sino el que permite cambiar con bajo riesgo.
