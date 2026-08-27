export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 28;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Build 28 adds an isolated Archive / Health Memory polish layer.
// It is lazy-loaded only after the user opens Archive, so startup, Signature Opening and Core remain outside its runtime path.
// Build 27 remains the known-good rollback baseline for launch and Daily Check-in behavior.
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
