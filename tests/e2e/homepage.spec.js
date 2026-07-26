import { expect, test } from '@playwright/test';

test('homepage exposes primary navigation and one main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /shop/i })).toBeVisible();
});
