import { expect, test } from '@playwright/test';

test('homepage exposes primary navigation and one main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /shop/i })).toBeVisible();
});

test('homepage presents the approved conversion path', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/control/i);
  await expect(page.getByRole('link', { name: /find your formula/i })).toBeVisible();
  await expect(page.locator('[data-skop-formula-card]')).toHaveCount(5);
  await expect(page.getByText(/evidence before claims/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /wholesale/i })).toBeVisible();
});
