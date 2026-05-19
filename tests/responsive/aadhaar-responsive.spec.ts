import { test, expect } from '../../fixtures/auth.fixture';
import { ResponsiveHelper } from '../../utils/responsive.helper';
import { dismissPostLoginDialogs } from '../../utils/dialog.helper';
import { aadhaarTestData } from '../../test-data/aadhaar-test-data';

const viewports = [
  { tag: 'RESP-01', name: 'Desktop 1920x1080', size: aadhaarTestData.viewports.desktop },
  { tag: 'RESP-02', name: 'Laptop 1366x768', size: aadhaarTestData.viewports.laptop },
  { tag: 'RESP-03', name: 'Tablet iPad Air', size: aadhaarTestData.viewports.tablet },
  { tag: 'RESP-04', name: 'iPhone 14 Pro', size: aadhaarTestData.viewports.mobileIPhone },
  { tag: 'RESP-05', name: 'Galaxy S21', size: aadhaarTestData.viewports.mobileGalaxy },
];

test.describe('Responsive Testing @responsive', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login();
  });

  for (const vp of viewports) {
    test(`${vp.tag}: Form on ${vp.name}`, async ({ page, aadhaarPage }) => {
      const r = new ResponsiveHelper(page);
      await r.setViewport(vp.size);
      await aadhaarPage.openDirectly();
      await r.assertNoHorizontalOverflow();
      await expect(aadhaarPage.nameField()).toBeVisible();
      await expect(aadhaarPage.saveBtn()).toBeVisible();
    });

    test(`${vp.tag}-sidebar: Menu on ${vp.name}`, async ({ page, sidebarPage }) => {
      const r = new ResponsiveHelper(page);
      await r.setViewport(vp.size);
      await dismissPostLoginDialogs(page);
      await sidebarPage.openSidebar();
      expect(await sidebarPage.isSidebarVisible()).toBeTruthy();
    });
  }
});
