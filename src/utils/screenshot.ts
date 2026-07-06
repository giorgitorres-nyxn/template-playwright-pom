import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Page } from '@playwright/test';

function sanitizeFileName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

export async function saveFailureScreenshot(
  page: Page,
  scenarioName: string,
  directory = 'screenshots'
): Promise<string> {
  await mkdir(directory, { recursive: true });

  const fileName = `${sanitizeFileName(scenarioName)}-${timestamp()}.png`;
  const screenshotPath = path.resolve(directory, fileName);

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  return screenshotPath;
}

export async function readScreenshot(filePath: string): Promise<Buffer> {
  return readFile(filePath);
}
