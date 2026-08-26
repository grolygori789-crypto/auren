// Build 16 launch handoff guard.
// Build 15 prevented two Core canvases from being visible at once, but its
// 790 ms orb-only morph still produced a perceptible frozen/interstitial Core
// on some physical devices. This layer removes that standalone orb phase
// without touching Signature Opening timing or Living Core rendering.

const ROOT_CLASS = 'auren-handoff-v16';
const OUT_CLASS = 'auren-handoff-content-out';
const STYLE_ID = 'auren-handoff-v16-style';
const CONTENT_FADE_MS = 180;

function installStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    html.${ROOT_CLASS} #openingOrbWrap {
      transform: none !important;
      filter: none !important;
      transition: opacity ${CONTENT_FADE_MS}ms cubic-bezier(.2,.72,.2,1) !important;
    }
    html.${ROOT_CLASS} #openingOrbWrap.${OUT_CLASS} {
      opacity: 0 !important;
    }
    html.${ROOT_CLASS} #openingIdentity {
      transition: opacity ${CONTENT_FADE_MS}ms ease, transform ${CONTENT_FADE_MS}ms ease !important;
    }
    html.${ROOT_CLASS} #openingIdentity.${OUT_CLASS} {
      opacity: 0 !important;
      transform: translateY(2px) !important;
    }
  `;
  document.head.appendChild(style);
}

function setup() {
  const opening = document.getElementById('opening');
  const app = document.getElementById('app');
  const openingWrap = document.getElementById('openingOrbWrap');
  const openingIdentity = document.getElementById('openingIdentity');
  const todayWrap = document.getElementById('todayOrbWrap');
  if (!opening || !app || !openingWrap || !openingIdentity || !todayWrap) return;

  document.documentElement.classList.add(ROOT_CLASS);
  installStyle();

  let started = false;
  let observer = null;

  const begin = () => {
    if (started || !app.classList.contains('ready')) return;
    started = true;
    observer?.disconnect();

    // Reduced Motion already uses the direct handoff in app.js.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || opening.classList.contains('leave')) return;

    // Fade the complete branded content as one unit. Crucially, do not move
    // the Opening Core toward the Today Core; that orb-only morph is the
    // physical-device artifact this guard removes.
    openingWrap.classList.add(OUT_CLASS);
    openingIdentity.classList.add(OUT_CLASS);

    window.setTimeout(() => {
      openingWrap.style.visibility = 'hidden';
      openingIdentity.style.visibility = 'hidden';

      // Today Core has been rendering off-screen since bootstrap. Reveal it
      // while the opaque Opening background still covers the app, then wait
      // two paint frames before dissolving the background. This guarantees
      // there is no rendered frame containing an outgoing standalone orb.
      todayWrap.classList.remove('waiting');
      requestAnimationFrame(() => requestAnimationFrame(() => opening.classList.add('leave')));
    }, CONTENT_FADE_MS);
  };

  observer = new MutationObserver(begin);
  observer.observe(app, { attributes: true, attributeFilter: ['class'] });
  begin();
}

try {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
} catch (error) {
  // Fail open to the Build 15 handoff rather than blocking Auren startup.
  console.error('Auren launch handoff guard unavailable', error);
}
