const STYLE_ID = 'auren-experience-build-12';
const STYLE_HREF = './src/css/experience.css';
const RESPONSE_CLASS = 'experience-response';
const STATE_REFRESH_CLASS = 'experience-state-refresh';

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.optionalExperience = 'build-12';
  link.onerror = () => link.remove();
  document.head.appendChild(link);
}

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function haloSignature(stage) {
  if (!stage) return '';
  const parts = [stage.dataset.halo || ''];
  stage.querySelectorAll('.halo-arc').forEach((arc) => parts.push(arc.getAttribute('class') || ''));
  return parts.join('|');
}

function setupExperience() {
  const app = document.getElementById('app');
  const stage = document.getElementById('coreStage');
  const stateCaption = document.querySelector('.state-caption');
  if (!app || !stage || !stateCaption) return;

  let responseTimer = 0;
  let stateTimer = 0;
  let armed = app.classList.contains('ready');

  const pulseCore = (duration = 1280) => {
    if (!armed || reducedMotion()) return;
    window.clearTimeout(responseTimer);
    stage.classList.remove(RESPONSE_CLASS);
    // Force a fresh transition without touching the Canvas renderer.
    void stage.offsetWidth;
    stage.classList.add(RESPONSE_CLASS);
    responseTimer = window.setTimeout(() => stage.classList.remove(RESPONSE_CLASS), duration);
  };

  const refreshStateCaption = () => {
    if (!armed || reducedMotion()) return;
    window.clearTimeout(stateTimer);
    stateCaption.classList.remove(STATE_REFRESH_CLASS);
    void stateCaption.offsetWidth;
    stateCaption.classList.add(STATE_REFRESH_CLASS);
    stateTimer = window.setTimeout(() => stateCaption.classList.remove(STATE_REFRESH_CLASS), 620);
  };

  if (!armed) {
    const readyObserver = new MutationObserver(() => {
      if (!app.classList.contains('ready')) return;
      window.setTimeout(() => { armed = true; }, 760);
      readyObserver.disconnect();
    });
    readyObserver.observe(app, { attributes: true, attributeFilter: ['class'] });
  }

  // The Core remains a semantic instrument: touching it briefly reveals the
  // luminous fragments, while the resting state stays visually quiet.
  stage.addEventListener('pointerdown', () => pulseCore(980), { passive: true });

  // Re-animate only the meaning layer when Today's state copy actually changes.
  const stateObserver = new MutationObserver(() => refreshStateCaption());
  ['stateKicker', 'stateTitle', 'stateCopy', 'observedGrid'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) stateObserver.observe(node, { childList: true, subtree: true, characterData: true });
  });

  // Check-in/profile changes already update the stable Core renderer in app.js.
  // This optional layer waits until the sheet closes, then adds a short optical
  // response only when the Halo semantics actually changed.
  [document.getElementById('checkinModal'), document.getElementById('profileModal')]
    .filter(Boolean)
    .forEach((modal) => {
      let wasOpen = modal.classList.contains('open');
      let before = haloSignature(stage);
      const modalObserver = new MutationObserver(() => {
        const isOpen = modal.classList.contains('open');
        if (isOpen && !wasOpen) before = haloSignature(stage);
        if (!isOpen && wasOpen && before !== haloSignature(stage)) {
          window.setTimeout(() => pulseCore(1380), 80);
        }
        wasOpen = isOpen;
      });
      modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });
    });
}

try {
  installStylesheet();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupExperience, { once: true });
  else setupExperience();
} catch {
  // Build 12 is an additive enhancement. Failure here must never block Auren.
}
