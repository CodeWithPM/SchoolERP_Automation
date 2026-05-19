import { expect, type Page } from '@playwright/test';
import { Logger } from './logger';

const log = new Logger('DialogHelper');

export async function dismissPostLoginDialogs(page: Page): Promise<void> {
  log.step('Dismissing post-login dialogs');
  for (let i = 0; i < 5; i++) {
    const dialog = page.getByRole('dialog').first();
    if (!(await dialog.isVisible().catch(() => false))) return;
    const cancel = dialog.getByRole('button', { name: 'Cancel' });
    if (await cancel.isVisible().catch(() => false)) await cancel.click();
    else {
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden({ timeout: 5_000 }).catch(() => {});
    }
  }
}
