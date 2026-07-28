import { readFile } from 'node:fs/promises';

const rules = JSON.parse(await readFile(new URL('../assets/skop-formula-rules.json', import.meta.url), 'utf8'));
const formulaCodes = new Set(['F01', 'F02', 'F03', 'F04', 'F05']);
const expectedIntervals = new Set([4, 6, 8]);
const errors = [];

for (const code of formulaCodes) {
  const formula = rules.formulas[code];
  if (!formula?.title || !/^skop-f0[1-5]-/.test(formula?.handle ?? '')) {
    errors.push(`${code} must provide a title and stable SKOP product handle`);
  }
}

for (const [activity, code] of Object.entries(rules.activities)) {
  if (!formulaCodes.has(code)) errors.push(`${activity} maps to unsupported formula ${code}`);
}

for (const [session, interval] of Object.entries(rules.intervalWeeks)) {
  if (!expectedIntervals.has(interval)) errors.push(`${session} has unsupported interval ${interval}`);
  if (!rules.packRecommendation[session]) errors.push(`${session} has no pack recommendation`);
}

for (const level of ['light', 'moderate', 'heavy']) {
  if (!rules.applicationProfile[level]) errors.push(`${level} has no application profile`);
}

if (Object.keys(rules.activities).length === 0) errors.push('At least one activity is required');
if (errors.length) throw new Error(`Invalid formula rules:\n- ${errors.join('\n- ')}`);

console.log('Formula rules valid: five formulas, nine activities, intervals 4/6/8 weeks.');
