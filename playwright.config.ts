import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'on-failure' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['playwright-pdf-reporter', {
        outputFolder: 'reportes-pdf',
        filename: 'Reporte_Pruebas_TeonCred',
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://credgruppro.web.app/', // URL
    // Aquí ajustas la ventana para que la UI se vea como móvil
    viewport: { width: 430, height: 932 },
    headless: true,
    launchOptions: {
      slowMo: 500,
    },
    screenshot: 'only-on-failure', // Esto nos servirá para tu PDF después
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Mobile-Chrome',
      use: { 
        ...devices['Pixel 7'], // Esto configura User-Agent, Viewport y Touch automáticamente
        // Forzamos el viewport que tú quieres por si el del Pixel no te gusta
        viewport: { width: 430, height: 932 }, 
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
