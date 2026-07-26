import { defineConfig, devices } from '@playwright/test';

if (!process.env.SKOP_PREVIEW_URL) {
  throw new Error('SKOP_PREVIEW_URL is required for end-to-end tests');
}

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: process.env.SKOP_PREVIEW_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
