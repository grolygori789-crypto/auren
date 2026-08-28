const STYLE_ID = 'auren-today-affordance-build-34';
const STYLE_HREF = './src/css/today-affordance.css';
const TODAY = '[data-screen="today"]';

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenTodayAffordance = 'build-34';
  document.head.appendChild(link);
}

function annotateStaticSurfaces() {
  const today = document.querySelector(TODAY);
  if (!today) return false;

  // These surfaces are intentionally informative, not controls.
  today.querySelector('.one-action-card')?.classList.add('today-recommendation-surface');
  today.querySelector('.state-caption')?.classList.add('today-state-readout');

  const patternCard = document.getElementById('patternTitle')?.closest('.card');
  const evidenceCard = document.getElementById('evidenceTitle')?.closest('.card');

  patternCard?.classList.add('today-explainer-card', 'today-pattern-card');
  evidenceCard?.classList.add('today-explainer-card', 'today-evidence-card');

  // Misleading navigation chevrons are decorative remnants on static cards.
  patternCard?.querySelector('.chev')?.setAttribute('aria-hidden', 'true');
  evidenceCard?.querySelector('.chev')?.setAttribute('aria-hidden', 'true');

  today.querySelector('#trustStrip')?.classList.add('today-trust-principles');
  return true;
}

function init() {
  installStylesheet();

  // Presentation-only enhancement. Failing to annotate leaves the accepted
  // Build 33 Today screen intact rather than changing application behavior.
  if (!annotateStaticSurfaces()) {
    requestAnimationFrame(annotateStaticSurfaces);
  }
}

try {
  init();
} catch (error) {
  console.error('Auren Today affordance polish unavailable', error);
}
