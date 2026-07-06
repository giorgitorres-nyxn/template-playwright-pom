import type { Locator, Page } from '@playwright/test';

export class LoginLocators {
  constructor(private readonly page: Page) {}

  get loginForm(): Locator {
    // Shopify expone un id estable para el formulario legacy de login.
    return this.page.locator('form#customer_login');
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /customer login/i });
  }

  get emailInput(): Locator {
    return this.page.getByLabel(/email address/i);
  }

  get passwordInput(): Locator {
    return this.page.getByLabel(/^password$/i);
  }

  get submitButton(): Locator {
  return this.page.locator("//input[@value='Sign In']");
}

  get authenticationError(): Locator {
    // El tema legacy de Shopify muestra errores de autenticación en .errors sin role alert.
    return this.page.locator('.errors, [role="alert"]').filter({
      hasText: /incorrect|invalid|error|email|password/i
    });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: /log out|logout|sign out/i });
  }

  get accountHeading(): Locator {
    return this.page.getByRole('heading', {
      name: /account|my account|order history|customer login/i
    });
  }
}
