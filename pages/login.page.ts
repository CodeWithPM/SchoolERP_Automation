import { expect } from '@playwright/test';
import { credentials, routes } from '../test-data/credentials';
import { dismissPostLoginDialogs } from '../utils/dialog.helper';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private schoolCombo = () => this.page.getByRole('combobox', { name: 'Select School' });
  private usernameField = () => this.page.getByRole('textbox', { name: 'User Name' });
  private passwordField = () => this.page.getByRole('textbox', { name: 'Password' });
  private loginBtn = () => this.page.getByRole('button', { name: 'Login' });
  private dashboard = () => this.page.getByText('Teacher Details');

  async openApplication(): Promise<void> {
    await this.goto(routes.schoolList);
  }

  async selectSchool(name = credentials.schoolName): Promise<void> {
    this.log.step(`Select school: ${name}`);
    await this.schoolCombo().click();
    await this.page.getByRole('option', { name }).click();
  }

  async enterCredentials(user = credentials.username, pass = credentials.password): Promise<void> {
    this.log.step('Enter credentials');
    await this.usernameField().fill(user);
    await this.passwordField().fill(pass);
  }

  async clickLogin(): Promise<void> {
    this.log.step('Click login');
    await this.loginBtn().click();
  }

  async login(): Promise<void> {
    await this.openApplication();
    await this.selectSchool();
    await this.enterCredentials();
    await this.clickLogin();
    await expect(this.dashboard()).toBeVisible({ timeout: 60_000 });
    await dismissPostLoginDialogs(this.page);
  }

  async isSchoolDropdownVisible(): Promise<boolean> {
    return this.schoolCombo().isVisible();
  }

  async isDashboardVisible(): Promise<boolean> {
    return this.dashboard().isVisible();
  }

  async logout(): Promise<void> {
    this.log.step('Logout');
    await dismissPostLoginDialogs(this.page);
    await this.page.getByRole('button', { name: 'Logout' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
