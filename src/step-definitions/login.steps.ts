import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Given('que el usuario abre la página de login', async function (this: CustomWorld) {
  await this.loginPage!.open();
});

Then('debe ver el formulario de login', async function (this: CustomWorld) {
  await this.loginPage!.assertLoginFormIsVisible();
});

When(
  'intenta iniciar sesión con credenciales inválidas',
  async function (this: CustomWorld, dataTable: DataTable) {
    const [credentials] = dataTable.hashes();
    const email = credentials?.email;
    const password = credentials?.password;

    if (!email || !password) {
      throw new Error('La tabla de credenciales debe incluir las columnas email y password.');
    }

    await this.loginPage!.loginWithCredentials(email, password);
  }
);

Then('el inicio de sesión no debe ser exitoso', async function (this: CustomWorld) {
  await this.loginPage!.assertInvalidLoginWasRejected();
});

When('inicia sesión con credenciales válidas', async function (this: CustomWorld) {
  await this.loginPage!.loginWithValidCredentialsFromEnv();
});

Then('debe acceder correctamente a su cuenta', async function (this: CustomWorld) {
  await this.loginPage!.assertUserIsLoggedIn();
});
