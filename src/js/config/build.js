export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 41;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Build 41 improves Today Core presence and readability after physical testing
// showed that Build 40 became too faint against the Today background. It boosts
// glass definition, liquid visibility and contact depth for the Today orb only,
// while preserving Build 40 motion refinement and the accepted Signature Opening.
// Legal Version remains 1.0.0. Health logic, stores and schema remain unchanged.
if (typeof document !== 'undefined') {
  import('../experience/launch-handoff.js').catch(() => {});
  import('../experience/polish.js').catch(() => {});
  import('../privacy/data-controls.js').catch((error) => console.error('Auren data controls unavailable', error));
  import('../rhythm/rhythm.js').catch((error) => console.error('Auren Rhythm unavailable', error));
  import('../signals/signals.js').catch((error) => console.error('Auren Signals unavailable', error));
  import('../today/metric-detail.js').catch((error) => console.error('Auren Today detail unavailable', error));
  import('../today/checkin-slider-polish.js').catch((error) => console.error('Auren check-in slider polish unavailable', error));
  import('../today/affordance-polish.js').catch((error) => console.error('Auren Today affordance polish unavailable', error));
  import('../today/body-context-polish.js').catch((error) => console.error('Auren Body Context polish unavailable', error));
  import('../today/core-evolution.js').catch((error) => console.error('Auren Today Core evolution unavailable', error));
  import('../today/core-motion-refinement.js').catch((error) => console.error('Auren Today Core motion refinement unavailable', error));
  import('../today/core-presence-polish.js').catch((error) => console.error('Auren Today Core presence polish unavailable', error));

  let archivePromise = null;
  const loadArchivePolish = () => {
    if (archivePromise) return archivePromise;
    archivePromise = import('../archive/archive-polish.js').catch((error) => {
      archivePromise = null;
      console.error('Auren Archive polish unavailable', error);
    });
    return archivePromise;
  };

  let youPromise = null;
  const loadYouPolish = () => {
    if (youPromise) return youPromise;
    youPromise = import('../you/you-polish.js').catch((error) => {
      youPromise = null;
      console.error('Auren You polish unavailable', error);
    });
    return youPromise;
  };

  let helpSupportPromise = null;
  const loadHelpSupport = () => {
    if (helpSupportPromise) return helpSupportPromise;
    helpSupportPromise = import('../you/help-support.js').catch((error) => {
      helpSupportPromise = null;
      console.error('Auren Help & Support unavailable', error);
    });
    return helpSupportPromise;
  };

  let legalPromise = null;
  const loadLegalCenter = () => {
    if (legalPromise) return legalPromise;
    legalPromise = import('../legal/legal-center.js').catch((error) => {
      legalPromise = null;
      console.error('Auren Legal Center unavailable', error);
    });
    return legalPromise;
  };

  // Build 26 lesson: legal UI never receives startup authority.
  if (document.readyState === 'complete') queueMicrotask(loadLegalCenter);
  else window.addEventListener('load', () => queueMicrotask(loadLegalCenter), { once: true });

  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('[data-nav="archive"]')) queueMicrotask(loadArchivePolish);
    if (event.target?.closest?.('[data-nav="you"], #profileBtn')) {
      queueMicrotask(loadYouPolish);
      queueMicrotask(loadHelpSupport);
    }
  }, true);
}
