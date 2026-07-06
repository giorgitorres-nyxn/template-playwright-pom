import dotenv from 'dotenv';

dotenv.config();

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface TestEnv {
  baseUrl: string;
  browser: BrowserName;
  headless: boolean;
  defaultTimeoutMs: number;
}

export interface TestCredentials {
  email: string;
  password: string;
}

const DEFAULT_BASE_URL = 'https://sauce-demo.myshopify.com/account/login';
const DEFAULT_BROWSER: BrowserName = 'chromium';
const DEFAULT_TIMEOUT_MS = 30_000;
const VALID_BROWSERS: BrowserName[] = ['chromium', 'firefox', 'webkit'];

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value.trim() === '') {
    return defaultValue;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (['true', '1', 'yes', 'y'].includes(normalizedValue)) {
    return true;
  }

  if (['false', '0', 'no', 'n'].includes(normalizedValue)) {
    return false;
  }

  throw new Error(`Valor booleano inválido: "${value}". Usa true o false.`);
}

function parseBrowser(value: string | undefined): BrowserName {
  const browser = (value?.trim().toLowerCase() || DEFAULT_BROWSER) as BrowserName;

  if (!VALID_BROWSERS.includes(browser)) {
    throw new Error(
      `BROWSER inválido: "${value}". Valores permitidos: ${VALID_BROWSERS.join(', ')}.`
    );
  }

  return browser;
}

function parsePositiveInteger(value: string | undefined, defaultValue: number): number {
  if (value === undefined || value.trim() === '') {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`DEFAULT_TIMEOUT_MS debe ser un entero positivo. Valor recibido: "${value}".`);
  }

  return parsedValue;
}

export function getEnv(): TestEnv {
  return {
    baseUrl: process.env.BASE_URL?.trim() || DEFAULT_BASE_URL,
    browser: parseBrowser(process.env.BROWSER),
    headless: parseBoolean(process.env.HEADLESS, true),
    defaultTimeoutMs: parsePositiveInteger(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS)
  };
}

export function hasRequiredCredentials(): boolean {
  return Boolean(process.env.TEST_USER_EMAIL?.trim() && process.env.TEST_USER_PASSWORD);
}

export function getRequiredCredentials(): TestCredentials {
  const email = process.env.TEST_USER_EMAIL?.trim();
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Faltan credenciales para @requiresCredentials. Define TEST_USER_EMAIL y TEST_USER_PASSWORD en el entorno o en .env.'
    );
  }

  return { email, password };
}
