import { test, expect, type Page } from '@playwright/test';

async function dismissPostLoginDialogs(page: Page) {
  for (let i = 0; i < 5; i++) {
    const dialog = page.getByRole('dialog').first();
    if (!(await dialog.isVisible().catch(() => false))) {
      break;
    }

    const cancel = dialog.getByRole('button', { name: 'Cancel' });
    if (await cancel.isVisible().catch(() => false)) {
      await cancel.click();
      continue;
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden({ timeout: 5_000 }).catch(() => {});
  }
}

test('Add Aadhar card details', async ({ page }) => {
  test.setTimeout(90_000);

  await page.goto('https://schoolwebsiteui.aaditechnology.com/schoolList');
  await page.getByRole('combobox', { name: 'Select School' }).click();
  await page.getByRole('option', { name: 'Pawar Public School, hadapsar' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('User341');
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Teacher Details')).toBeVisible({ timeout: 60_000 });
  await dismissPostLoginDialogs(page);

  await page.goto('https://schoolwebsiteui.aaditechnology.com/RITeSchool/Teacher/AadharCard');

  const nameField = page.getByRole('textbox', { name: 'Name As Per Aadhar Card *' });
  await expect(nameField).toBeVisible({ timeout: 30_000 });
  await nameField.fill('Anubha Harish Borude');
  await page.getByRole('textbox', { name: 'Aadhar Card Number *' }).fill('123456789245');
  await page.getByRole('button', { name: 'Save' }).click();
});
