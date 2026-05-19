import { expect } from '@playwright/test';
import { routes } from '../test-data/credentials';
import { BasePage } from './base.page';

export class AadhaarCardPage extends BasePage {
  nameField = () => this.page.getByRole('textbox', { name: 'Name As Per Aadhar Card *' });
  aadhaarField = () => this.page.getByRole('textbox', { name: 'Aadhar Card Number *' });
  saveBtn = () => this.page.getByRole('button', { name: 'Save' });

  async openDirectly(): Promise<void> {
    await this.goto(routes.aadhaarCard);
    await this.waitForFormReady();
  }

  async waitForFormReady(): Promise<void> {
    this.log.step('Wait for Aadhaar form');
    await expect(this.nameField()).toBeVisible({ timeout: 30_000 });
    await expect(this.aadhaarField()).toBeVisible();
    await expect(this.saveBtn()).toBeVisible();
  }

  async fillForm(name: string, aadhaar: string): Promise<void> {
    this.log.step('Fill Aadhaar form');
    await this.nameField().fill(name);
    await this.aadhaarField().fill(aadhaar);
  }

  async clearForm(): Promise<void> {
    await this.nameField().clear();
    await this.aadhaarField().clear();
  }

  async submit(): Promise<void> {
    this.log.step('Submit form');
    await this.saveBtn().click();
  }

  async getFieldValues() {
    return { name: await this.nameField().inputValue(), aadhaar: await this.aadhaarField().inputValue() };
  }

  async submitBlankAndGetValidation(): Promise<string> {
    await this.clearForm();
    await this.submit();
    const msg = await this.nameField().evaluate((el: HTMLInputElement) => el.validationMessage);
    if (msg) return msg;
    const texts = await this.page.locator('[role="alert"], .MuiFormHelperText-root').allTextContents();
    return texts.map((t) => t.trim()).find(Boolean) ?? '';
  }

  async areFormFieldsVisible(): Promise<boolean> {
    return (await this.nameField().isVisible()) && (await this.aadhaarField().isVisible());
  }
}
