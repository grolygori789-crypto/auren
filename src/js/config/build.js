export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 29;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Build 29 is a surgical Archive Day Detail control fix.
// It preserves the accepted Build 28 Health Memory presentation while restoring explicit close affordances:
// a premium top-right X and a localized label on the existing bottom close button.
// Startup, Signature Opening, Core, Today, Daily Check-in, Rhythm, Signals, data and schema remain unchanged.
if (typeof document !== 'undefined') {
  import('../experience/launch-handoff.js').catch(() => {});
  import('../experience/polish.js').catch(() => {});
  import('../privacy/data-controls.js').catch((error) => console.error('Auren data controls unavailable', error));
  import('../rhythm/rhythm.js').catch((error) => console.error('Auren Rhythm unavailable', error));
  import('../signals/signals.js').catch((error) => console.error('Auren Signals unavailable', error));
  import('../today/metric-detail.js').catch((error) => console.error('Auren Today detail unavailable', error));
  import('../today/checkin-slider-polish.js').catch((error) => console.error('Auren check-in slider polish unavailable', error));

  let archivePromise = null;
  const loadArchivePolish = () => {
    if (archivePromise) return archivePromise;
    archivePromise = import('../archive/archive-polish.js').catch((error) => {
      archivePromise = null;
      console.error('Auren Archive polish unavailable', error);
    });
    return archivePromise;
  };
  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('[data-nav="archive"]')) queueMicrotask(loadArchivePolish);
  }, true);
}
