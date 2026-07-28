import { describe, expect, it } from 'vitest';
import { recommendFormula } from '../../assets/skop-formula-finder.js';

const rules = {
  formulas: {
    F01: { title: 'Shooting', handle: 'skop-f01-shooting' },
    F03: { title: 'Vertical + Strength', handle: 'skop-f03-vertical-strength' },
    F05: { title: 'Drumming + Gaming', handle: 'skop-f05-focus-control' },
  },
  activities: { shooting: 'F01', climbing: 'F03', gaming: 'F05' },
  intervalWeeks: { short: 8, medium: 6, long: 4 },
  applicationProfile: { light: 'light', moderate: 'moderate', heavy: 'heavy' },
  packRecommendation: { short: 'single', medium: 'two_pack', long: 'three_pack' },
};

describe('recommendFormula', () => {
  it('maps activity to the approved formula family', () => {
    expect(
      recommendFormula(
        {
          activity: 'climbing',
          perspiration: 'heavy',
          gripPreference: 'controlled',
          session: 'long',
          skinPriority: 'gentle',
          equipmentPriority: 'low_residue',
        },
        rules,
      ),
    ).toMatchObject({
      formulaCode: 'F03',
      intervalWeeks: 4,
      applicationProfile: 'heavy',
      packRecommendation: 'three_pack',
    });
  });

  it('rejects an unsupported activity instead of substituting', () => {
    expect(() => recommendFormula({ activity: 'cycling', session: 'short' }, rules)).toThrow(
      'Unsupported activity: cycling',
    );
  });
});
