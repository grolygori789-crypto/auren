const STYLE_ID = 'auren-core-presence-build-41';
const STYLE_HREF = './src/css/core-presence-polish.css';
const WRAP_SELECTOR = '#todayOrbWrap';
const READY_ATTR = 'data-core-presence';
const READY_VALUE = 'build-41';

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function markWrap() {
  const wrap = document.querySelector(WRAP_SELECTOR);
  if (!wrap) return false;
  wrap.setAttribute(READY_ATTR, READY_VALUE);
  wrap.classList.add('today-orb-presence-boost');
  return true;
}

function init() {
  installStylesheet();
  if (markWrap()) return;

  const observer = new MutationObserver(() => {
    if (!markWrap()) return;
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

try {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
} catch (error) {
  console.error('Auren Today Core presence polish unavailable', error);
}
