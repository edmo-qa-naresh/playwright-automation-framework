import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  /* Where tests are located */
  testDir: './tests',

  /* Maximum time for each test */
  timeout: 30000,

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail build if test.only is left in code */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests (useful in CI) */
  retries: process.env.CI ? 0 : 0,

  /* Number of parallel workers */
  workers: process.env.CI ? 1 : 2,

  /* Test report */
  reporter: 'html',

  /* Global settings for tests */
  use: {
    baseURL: 'https://edm.test.technolutions.net',

    headless: false,

    actionTimeout: 10000,

    navigationTimeout: 30000,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on-first-retry',
  },

  /* Browser configurations */
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

  ],

});