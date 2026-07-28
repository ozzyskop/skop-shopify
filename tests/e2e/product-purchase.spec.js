import { expect, test } from '@playwright/test';

test('one-time purchase is the default and subscription is opt-in', async ({ page }) => {
  await page.goto('/collections/all');
  await page.locator('[data-skop-formula-card] a').first().click();
  await expect(page.locator('input[name="selling_plan"]:checked')).toHaveCount(0);
  await expect(page.locator('[data-skop-purchase-selector]')).toContainText(/one-time purchase/i);
});

test('product exposes evidence, ingredients, instructions, and reviews', async ({ page }) => {
  await page.goto('/collections/all');
  await page.locator('[data-skop-formula-card] a').first().click();
  for (const label of [/results/i, /ingredients/i, /how to apply/i, /reviews/i]) {
    await expect(page.getByRole('heading', { name: label })).toBeVisible();
  }
});

test('core product content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/collections/all');
  await page.locator('[data-skop-formula-card] a').first().click();
  await expect(page.getByLabel('Quantity')).toHaveValue('1');
  await expect(page.getByRole('heading', { name: /ingredients/i })).toBeVisible();
  await context.close();
});
