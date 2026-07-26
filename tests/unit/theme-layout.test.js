import { existsSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

const requiredThemeDirectories = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

describe('Shopify GitHub theme layout', () => {
  test('keeps every required Shopify theme directory at the repository root', () => {
    const missingDirectories = requiredThemeDirectories.filter((directory) => !existsSync(directory));

    expect(missingDirectories).toEqual([]);
  });

  test('does not keep the deployable theme under a nested theme directory', () => {
    expect(existsSync('theme/layout/theme.liquid')).toBe(false);
  });
});
