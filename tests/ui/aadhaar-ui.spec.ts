import { test, expect } from '../../fixtures/auth.fixture';
import { ResponsiveHelper } from '../../utils/responsive.helper';
import { aadhaarTestData } from '../../test-data/aadhaar-test-data';

test.describe('UI Testing @ui', () => {
  test.beforeEach(async ({ loginPage, aadhaarPage }) => {
    await loginPage.login();
    await aadhaarPage.openDirectly();
  });

  test('UI-01: Field alignment', async ({ aadhaarPage }) => {
    await expect(aadhaarPage.nameField()).toBeVisible();
    await expect(aadhaarPage.aadhaarField()).toBeVisible();
    const n = await aadhaarPage.nameField().boundingBox();
    const a = await aadhaarPage.aadhaarField().boundingBox();
    expect(n?.width).toBeGreaterThan(0);
    expect(a?.width).toBeGreaterThan(0);
  });

  test('UI-02: Save button clickable', async ({ aadhaarPage }) => {
    await expect(aadhaarPage.saveBtn()).toBeVisible();
    await expect(aadhaarPage.saveBtn()).toBeEnabled();
  });

  test('UI-03: Label visibility', async ({ page }) => {
    const count = await page.locator('label').count();
    expect(count).toBeGreaterThan(0);
  });

  test('UI-04: Sidebar toggle', async ({ sidebarPage }) => {
    await sidebarPage.openSidebar();
    expect(await sidebarPage.isSidebarVisible()).toBeTruthy();
  });

  test('UI-05: Scroll behavior', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('body')).toBeVisible();
  });

  test('UI-06: Field spacing', async ({ aadhaarPage }) => {
    await expect(aadhaarPage.nameField()).toBeInViewport();
    await expect(aadhaarPage.aadhaarField()).toBeInViewport();
  });

  test('UI-07: Desktop no overflow', async ({ page, aadhaarPage }) => {
    const r = new ResponsiveHelper(page);
    await r.setViewport(aadhaarTestData.viewports.desktop);
    await aadhaarPage.waitForFormReady();
    await r.assertNoHorizontalOverflow();
  });
});
