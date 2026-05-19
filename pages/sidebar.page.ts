import { expect } from '@playwright/test';
import { routes } from '../test-data/credentials';
import { aadhaarTestData } from '../test-data/aadhaar-test-data';
import { dismissPostLoginDialogs } from '../utils/dialog.helper';
import { BasePage } from './base.page';

export class SidebarPage extends BasePage {
  private sidebarBtn = () => this.page.getByRole('button', { name: 'Sidebar' });
  private quickFind = () => this.page.getByRole('textbox', { name: 'Quick Find' });
  private extraScreens = () =>
    this.page.getByRole('button', { name: aadhaarTestData.navigation.extraScreensButton });
  private aadhaarLink = () =>
    this.page.getByRole('link', { name: aadhaarTestData.navigation.menuLinkName });

  async openSidebar(): Promise<void> {
    this.log.step('Open sidebar');
    await dismissPostLoginDialogs(this.page);
    await this.sidebarBtn().click({ force: true });
    await expect(this.quickFind()).toBeVisible({ timeout: 15_000 });
  }

  async expandExtraScreens(): Promise<void> {
    this.log.step('Expand Extra Screens');
    await this.extraScreens().click();
  }

  async searchMenu(text: string): Promise<void> {
    this.log.step(`Quick find: ${text}`);
    await this.quickFind().fill(text);
    await expect(this.aadhaarLink()).toBeVisible({ timeout: 15_000 });
  }

  async navigateToAadhaarCardDetails(): Promise<void> {
    await dismissPostLoginDialogs(this.page);
    await this.openSidebar();
    await this.expandExtraScreens();
    await this.searchMenu(aadhaarTestData.navigation.menuSearchText);
    try {
      await this.aadhaarLink().click({ timeout: 15_000 });
    } catch {
      this.log.warn('Using direct URL fallback');
      await this.goto(routes.aadhaarCard);
    }
    await this.wait.waitForUrlContains('AadharCard');
  }

  async isSidebarVisible(): Promise<boolean> {
    return this.quickFind().isVisible();
  }
}
