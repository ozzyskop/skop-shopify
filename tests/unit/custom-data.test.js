import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('SKOP design tokens', () => {
  it('defines the master and five formulation colors', () => {
    const css = readFileSync('assets/skop-tokens.css', 'utf8');

    for (const token of [
      '--skop-graphite',
      '--skop-mineral',
      '--skop-mint',
      '--skop-shooting',
      '--skop-racket',
      '--skop-vertical',
      '--skop-pole',
      '--skop-focus',
    ]) {
      expect(css).toContain(token);
    }
  });
});

describe('Shopify custom data', () => {
  it('validates the canonical Shopify custom-data manifest', () => {
    expect(() => execFileSync(process.execPath, ['scripts/validate-custom-data.mjs'])).not.toThrow();
  });
});
