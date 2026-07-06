import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import {
  chromium,
  firefox,
  webkit,
  type Browser,
  type BrowserContext,
  type Page
} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getEnv, type BrowserName } from '../utils/env';
import { logger } from '../utils/logger';

const browserTypes = {
  chromium,
  firefox,
  webkit
};

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    const env = getEnv();
    const browserName: BrowserName = env.browser;

    logger.info('Iniciando navegador', {
      browser: browserName,
      headless: env.headless,
      baseUrl: env.baseUrl
    });

    this.browser = await browserTypes[browserName].launch({
      headless: env.headless
    });

    this.context = await this.browser.newContext({
      baseURL: env.baseUrl,
      viewport: {
        width: 1366,
        height: 768
      },
      ignoreHTTPSErrors: false
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(env.defaultTimeoutMs);
    this.page.setDefaultNavigationTimeout(env.defaultTimeoutMs);
    this.loginPage = new LoginPage(this.page);
  }

  async cleanup(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
