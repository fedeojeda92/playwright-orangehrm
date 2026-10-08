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

  testDir: './tests',        //ACA ES DONDE VAN A IR NUESTROS TESTS

  /* Run tests in files in parallel */
  
  fullyParallel: false,  //CORRER LOS TESTS EN PARALELO
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  
  retries: process.env.CI ? 2 : 0,  //REINTENTA LOS TESTS QUE FALLAN
  
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: 'html',  // GENERA EL REPORTE HTML
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',  // GRABACION PASO A PASO DEL TEST (A ESTO LO CAMBIAMOS A ON PORQUE CORREMOS SIN REINTENTOS, ON SE GUARDA SIEMPRE)
  },

  /* Configure projects for major browsers */
  projects: [   // NAVEGADORES DONDE SE CORRE CADA TEST (DEJAREMOS SOLAMENTE CHROMIUM)
    {
      name: 'chromium',
      use: { 
            ...devices['Desktop Chrome'],
            viewport: { width: 1280, height: 720 } 
           },
    },
    
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  // agregamos un timeout de 60 porque la SPA que usamos es un poco lenta
  timeout: 60_000,
  expect: { timeout: 10_000 },

});
