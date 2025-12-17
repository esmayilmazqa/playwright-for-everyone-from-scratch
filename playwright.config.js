// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,  // for components
  expect: {
    timeout: 5000, // for assertions

  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
use: {
    browserName: 'chromium',
    headless: false,
    slowMo: 0,
    screenshot:'on', // only-on-failure, on-first-failure
    trace:'retain-on-failure', // retry-with-trace, on-first-retry, on-all-retries, on

    launchOptions: {
    args: ['--disable-dev-shm-usage'],
    },
  },
  


});

