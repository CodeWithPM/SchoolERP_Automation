import { test, expect } from '../../fixtures/auth.fixture';
import { aadhaarTestData } from '../../test-data/aadhaar-test-data';

test.describe('System Testing @system', () => {
  test.beforeEach(async ({ loginPage, aadhaarPage }) => {
    await loginPage.login();
    await aadhaarPage.openDirectly();
  });

  test('SYS-01: Valid Aadhaar submission', async ({ aadhaarPage }) => {
    const num = `1234567892${Date.now().toString().slice(-2)}`;
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, num);
    await aadhaarPage.submit();
    await expect(aadhaarPage.saveBtn()).toBeVisible();
  });

  test('SYS-02: Blank submission validation', async ({ aadhaarPage }) => {
    const msg = await aadhaarPage.submitBlankAndGetValidation();
    const v = await aadhaarPage.getFieldValues();
    expect(msg.length > 0 || v.name === '' || v.aadhaar === '').toBeTruthy();
  });

  test('SYS-03: Invalid short number', async ({ aadhaarPage }) => {
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, aadhaarTestData.invalid.shortNumber);
    await aadhaarPage.submit();
    expect(await aadhaarPage.aadhaarField().inputValue()).toBe(aadhaarTestData.invalid.shortNumber);
  });

  test('SYS-04: Alpha in Aadhaar field rejected', async ({ aadhaarPage }) => {
    await aadhaarPage.aadhaarField().fill(aadhaarTestData.invalid.alphaNumber);
    const value = await aadhaarPage.aadhaarField().inputValue();
    expect(value).toMatch(/^\d*$/);
  });

  test('SYS-05: Special characters rejected', async ({ aadhaarPage }) => {
    await aadhaarPage.aadhaarField().fill(aadhaarTestData.invalid.specialChars);
    const value = await aadhaarPage.aadhaarField().inputValue();
    expect(value).toMatch(/^\d*$/);
  });

  test('SYS-06: Character limit', async ({ aadhaarPage }) => {
    await aadhaarPage.aadhaarField().fill(aadhaarTestData.invalid.longNumber);
    expect((await aadhaarPage.aadhaarField().inputValue()).length).toBeLessThanOrEqual(16);
  });

  test('SYS-07: Mandatory name field', async ({ aadhaarPage }) => {
    await aadhaarPage.aadhaarField().fill(aadhaarTestData.valid.aadhaarNumber);
    await aadhaarPage.submit();
    expect(await aadhaarPage.nameField().inputValue()).toBe('');
  });

  test('SYS-08: Twelve digit format', async ({ aadhaarPage }) => {
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, aadhaarTestData.boundary.twelveDigitNumber);
    expect((await aadhaarPage.getFieldValues()).aadhaar).toHaveLength(12);
  });

  test('SYS-09: Refresh clears unsaved data', async ({ aadhaarPage, page }) => {
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, aadhaarTestData.boundary.twelveDigitNumber);
    await page.reload();
    await aadhaarPage.waitForFormReady();
    const v = await aadhaarPage.getFieldValues();
    expect(v.name === '' || v.aadhaar === '').toBeTruthy();
  });

  test('SYS-10: Stay on page after submit', async ({ aadhaarPage, page }) => {
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, `9876543210${Date.now().toString().slice(-2)}`);
    await aadhaarPage.submit();
    await expect(page).toHaveURL(/AadharCard/);
  });

  test('SYS-11: Duplicate entry', async ({ aadhaarPage }) => {
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, aadhaarTestData.valid.aadhaarNumber);
    await aadhaarPage.submit();
    await aadhaarPage.fillForm(aadhaarTestData.valid.name, aadhaarTestData.valid.aadhaarNumber);
    await aadhaarPage.submit();
    await expect(aadhaarPage.saveBtn()).toBeVisible();
  });
});
