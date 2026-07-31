import { expect, test } from '@playwright/test';

test('public wholesale page never exposes business pricing', async ({ page }) => {
  await page.goto('/pages/wholesale');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/performance supply/i);
  await expect(page.getByRole('heading', { name: /tell us about your business/i })).toBeVisible();
  await expect(page.getByText(/provided only after account approval/i)).toBeVisible();
  await expect(page.locator('[data-wholesale-price]')).toHaveCount(0);
});
