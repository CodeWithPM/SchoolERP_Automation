import { test as base } from '@playwright/test';
import { AadhaarCardPage } from '../pages/aadhaar-card.page';
import { LoginPage } from '../pages/login.page';
import { SidebarPage } from '../pages/sidebar.page';

type Fixtures = {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
  aadhaarPage: AadhaarCardPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  sidebarPage: async ({ page }, use) => use(new SidebarPage(page)),
  aadhaarPage: async ({ page }, use) => use(new AadhaarCardPage(page)),
});

export { expect } from '@playwright/test';
