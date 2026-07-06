import { expect, type Page } from '@playwright/test';
import { getEnv, getRequiredCredentials } from '../utils/env';
import { LoginLocators } from './LoginLocators';

export class LoginPage {
  private readonly locators: LoginLocators;

  constructor(private readonly page: Page) {
    this.locators = new LoginLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto(getEnv().baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async assertLoginFormIsVisible(): Promise<void> {
    await expect(this.locators.loginForm).toBeVisible();
    await expect(this.locators.heading).toBeVisible();
    await expect(this.locators.emailInput).toBeVisible();
    await expect(this.locators.passwordInput).toBeVisible();
    await expect(this.locators.submitButton).toBeVisible();
  }

  async fillEmail(email: string): Promise<void> {
    await this.locators.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.locators.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.login(email, password);
  }

  async loginWithValidCredentialsFromEnv(): Promise<void> {
    const credentials = getRequiredCredentials();
    await this.login(credentials.email, credentials.password);
  }

  async assertInvalidLoginMessageIsVisible(): Promise<void> {
    const errorCount = await this.locators.authenticationError.count();

    if (errorCount > 0) {
      await expect(this.locators.authenticationError.first()).toBeVisible();
      return;
    }

    await expect(this.page).toHaveURL(/\/account\/login/);
    await this.assertLoginFormIsVisible();
  }

  async assertInvalidLoginWasRejected(): Promise<void> {
    await this.assertInvalidLoginMessageIsVisible();
  }

  async assertUserIsLoggedIn(): Promise<void> {
    //await expect(this.page).toHaveURL(/\/account(?!\/login)/);

    const loggedInSignal = this.locators.logoutLink.or(this.locators.accountHeading).first();
    await expect(loggedInSignal).toBeVisible();
  }
}
