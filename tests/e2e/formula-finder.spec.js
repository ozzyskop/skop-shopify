import { expect, test } from '@playwright/test';

test('formula finder recommends the climbing family without substitution', async ({ page }) => {
  await page.goto('/pages/find-your-formula');
  await page.getByLabel('Climbing').check();
  await page.getByRole('button', { name: /next/i }).click();
  await page.getByLabel(/heavy perspiration/i).check();
  await page.getByRole('button', { name: /next/i }).click();
  await page.getByLabel(/controlled grip/i).check();
  await page.getByRole('button', { name: /next/i }).click();
  await page.getByLabel(/long session/i).check();
  await page.getByRole('button', { name: /next/i }).click();
  await page.getByLabel(/minimize residue/i).check();
  await page.getByRole('button', { name: /next/i }).click();
  await page.getByLabel(/gentle skin contact/i).check();
  await page.getByRole('button', { name: /see my formula/i }).click();
  await expect(page.locator('[data-formula-result]')).toContainText(/vertical.*strength/i);
});
