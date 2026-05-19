import type { Page } from '@playwright/test';
import { credentials } from '../test-data/credentials';
import { Logger } from '../utils/logger';
import { ScreenshotHelper } from '../utils/screenshot.helper';
import { WaitHelper } from '../utils/wait.helper';

export abstract class BasePage {
  protected readonly log: Logger;
  protected readonly wait: WaitHelper;
  protected readonly screenshot: ScreenshotHelper;

  constructor(protected readonly page: Page, contextName: string) {
    this.log = new Logger(contextName);
    this.wait = new WaitHelper(page);
    this.screenshot = new ScreenshotHelper(page);
  }

  async goto(path: string): Promise<void> {
    const url = path.startsWith('http') ? path : `${credentials.baseUrl}${path}`;
    this.log.step(`Navigate to ${url}`);
    await this.page.goto(url);
    await this.wait.waitForNetworkSettled();
  }
}
