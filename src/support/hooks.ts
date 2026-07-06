import {
  After,
  AfterStep,
  Before,
  setDefaultTimeout,
  Status,
  type ITestCaseHookParameter,
  type ITestStepHookParameter
} from '@cucumber/cucumber';
import { getEnv, hasRequiredCredentials } from '../utils/env';
import { logger } from '../utils/logger';
import { readScreenshot, saveFailureScreenshot } from '../utils/screenshot';
import type { CustomWorld } from './world';

setDefaultTimeout(getEnv().defaultTimeoutMs);

Before({ tags: '@requiresCredentials' }, function () {
  if (!hasRequiredCredentials()) {
    logger.warn(
      'Escenario @requiresCredentials omitido porque TEST_USER_EMAIL o TEST_USER_PASSWORD no están definidos.'
    );
    return 'skipped';
  }

  return undefined;
});

Before(async function (this: CustomWorld) {
  await this.init();
});

AfterStep(async function (this: CustomWorld, step: ITestStepHookParameter) {
  if (!this.page) {
    return;
  }

  const screenshotPath = await saveFailureScreenshot(
    this.page,
    `${step.pickle.name}-${step.pickleStep.text}-${step.result.status}`
  );
  const screenshot = await readScreenshot(screenshotPath);

  this.attach(screenshot, 'image/png');
  logger.info('Screenshot guardado después del step', {
    step: step.pickleStep.text,
    status: step.result.status,
    screenshotPath
  });
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotPath = await saveFailureScreenshot(this.page, scenario.pickle.name);
    const screenshot = await readScreenshot(screenshotPath);

    this.attach(screenshot, 'image/png');
    logger.error('Screenshot guardado por fallo de escenario', { screenshotPath });
  }

  await this.cleanup();
});
