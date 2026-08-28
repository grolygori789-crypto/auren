export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 35;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Build 35 adds a surgical Body Context layout polish.
// It rebalances the Body Context card by keeping BMI and Waist as key metrics and
// moving Training into its own context row. Legal Version remains 1.0.0.
// Health logic, stored values, units system and schema remain unchanged.
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
    if (event.target?.closest?.('[data-nav="you"], #profileBtn')) queueMicrotask(loadYouPolish);
  }, true);
}
