export function recommendFormula(input, rules) {
  const formulaCode = rules.activities[input.activity];
  if (!formulaCode) throw new Error(`Unsupported activity: ${input.activity}`);

  const intervalWeeks = rules.intervalWeeks[input.session];
  if (!intervalWeeks) throw new Error(`Unsupported session duration: ${input.session}`);

  const applicationProfile = rules.applicationProfile[input.perspiration];
  if (!applicationProfile) throw new Error(`Unsupported perspiration level: ${input.perspiration}`);

  return {
    formulaCode,
    intervalWeeks,
    applicationProfile,
    packRecommendation: rules.packRecommendation[input.session],
    explanation:
      `Selected for ${input.activity}, ${input.gripPreference} grip, ` +
      `${input.session} sessions, ${input.skinPriority} skin priority, ` +
      `and ${input.equipmentPriority} equipment priority.`,
  };
}

async function enhanceFinder(form) {
  const rules = await fetch(form.dataset.rulesUrl).then((response) => {
    if (!response.ok) throw new Error('Formula rules could not be loaded.');
    return response.json();
  });
  const steps = [...form.querySelectorAll('[data-step]')];
  const nextButton = form.querySelector('[data-next-step]');
  const submitButton = form.querySelector('[data-see-formula]');
  const result = form.querySelector('[data-formula-result]');
  let currentStep = 0;

  steps.forEach((step, index) => {
    step.hidden = index !== 0;
  });

  const revealStep = (index) => {
    steps[currentStep].hidden = true;
    currentStep = index;
    steps[currentStep].hidden = false;
    steps[currentStep].querySelector('input')?.focus();
    nextButton.hidden = currentStep === steps.length - 1;
    submitButton.hidden = currentStep !== steps.length - 1;
  };

  nextButton.addEventListener('click', () => {
    const selected = steps[currentStep].querySelector('input:checked');
    if (!selected) {
      result.textContent = 'Choose an option to continue.';
      return;
    }
    result.textContent = '';
    revealStep(currentStep + 1);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!steps[currentStep].querySelector('input:checked')) {
      result.textContent = 'Choose an option to continue.';
      return;
    }

    const values = Object.fromEntries(new FormData(form));
    try {
      const recommendation = recommendFormula(values, rules);
      const formula = rules.formulas[recommendation.formulaCode];
      result.innerHTML = `
        <strong>${formula.title}</strong>
        <span>${recommendation.explanation}</span>
        <span>Suggested replenishment: every ${recommendation.intervalWeeks} weeks. One-time purchase remains available.</span>
        <a class="button" href="/products/${formula.handle}">View ${formula.title}</a>
      `;
    } catch (error) {
      result.textContent = error.message;
    }
  });
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-formula-finder]').forEach((form) => {
    enhanceFinder(form).catch((error) => {
      form.querySelector('[data-formula-result]').textContent = error.message;
    });
  });
}
