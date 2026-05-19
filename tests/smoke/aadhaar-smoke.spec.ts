import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Smoke Testing @smoke', () => {
  test('SMK-01: Application launch', async ({ loginPage, page }) => {
    await loginPage.openApplication();
    await expect(page).toHaveURL(/schoolList/);
  });

  test('SMK-02: School dropdown', async ({ loginPage }) => {
    await loginPage.openApplication();
    expect(await loginPage.isSchoolDropdownVisible()).toBeTruthy();
    await loginPage.selectSchool();
  });

  test.describe('Authenticated', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.login();
    });

    test('SMK-03: Login success', async ({ loginPage }) => {
      expect(await loginPage.isDashboardVisible()).toBeTruthy();
    });

    test('SMK-04: Sidebar opens', async ({ sidebarPage }) => {
      await sidebarPage.openSidebar();
      expect(await sidebarPage.isSidebarVisible()).toBeTruthy();
    });

    test('SMK-05: Navigate to Aadhaar page', async ({ sidebarPage, aadhaarPage }) => {
      await sidebarPage.navigateToAadhaarCardDetails();
      expect(await aadhaarPage.areFormFieldsVisible()).toBeTruthy();
    });

    test('SMK-06: Form fields visible', async ({ aadhaarPage }) => {
      await aadhaarPage.openDirectly();
      await expect(aadhaarPage.nameField()).toBeVisible();
      await expect(aadhaarPage.aadhaarField()).toBeVisible();
    });

    test('SMK-07: Submit button visible', async ({ aadhaarPage }) => {
      await aadhaarPage.openDirectly();
      await expect(aadhaarPage.saveBtn()).toBeVisible();
      await expect(aadhaarPage.saveBtn()).toBeEnabled();
    });

    test('SMK-08: Logout', async ({ loginPage, page }) => {
      await loginPage.logout();
      await expect(page.getByText('Teacher Details')).toBeHidden({ timeout: 30_000 });
    });
  });
});
