import { expect, type Locator, type Page } from '@playwright/test';
import { Logger } from './logger';

const log = new Logger('WaitHelper');

export class WaitHelper {
  constructor(private readonly page: Page) {}
  async waitForVisible(locator: Locator, timeout = 30_000): Promise<void> {
    log.step(`Waiting for visibility`);
    await expect(locator).toBeVisible({ timeout });
  }
  async waitForNetworkSettled(): Promise<void> {
    log.step('Waiting for DOM content loaded');
    await this.page.waitForLoadState('domcontentloaded');
  }
  async waitForUrlContains(fragment: string, timeout = 30_000): Promise<void> {
    log.step(`Waiting for URL: ${fragment}`);
    await expect(this.page).toHaveURL(new RegExp(fragment), { timeout });
  }
}
