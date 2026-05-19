import { defineConfig, devices } from '@playwright/test';

const baseURL =
  process.env.SCHOOL_ERP_BASE_URL ?? 'https://schoolwebsiteui.aaditechnology.com';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  testIgnore: ['**/_explore*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 3,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['./reporters/qa-summary.reporter.js'],
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-desktop',
      testMatch: /smoke|system/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit-desktop',
      testMatch: /smoke/,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
