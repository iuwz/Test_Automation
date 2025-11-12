import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporters: list in terminal + HTML report after runs
  reporter: process.env.CI
    ? [
      ['list'],
      ['junit', { outputFile: 'reports/junit/results.xml' }],
      ['html', { open: 'never', outputFolder: 'reports/html' }],
    ]
    : [
      ['list'],
      ['html', { open: 'never', outputFolder: 'reports/html' }],
    ],

  use: {
    // Point to Sauce Demo so you can use page.goto('/') if you want
    baseURL: 'https://www.saucedemo.com',

    // 👇 Key fix: Sauce Demo uses data-test, not data-testid
    testIdAttribute: 'data-test',

    // Useful artifacts for debugging
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Uncomment to test mobile viewports
    // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },

    // Uncomment to run branded channels
    // { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    // { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],

  // If you need to start a local server before tests, configure webServer here.
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
