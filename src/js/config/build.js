export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 15;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Build 15 repairs launch handoff and refreshes single-check-in deletion in place.
// Existing experience polish and data controls remain isolated/fail-open.
if (typeof document !== 'undefined') {
  import('../experience/polish.js').catch(() => {});
  import('../privacy/data-controls.js').catch((error) => console.error('Auren data controls unavailable', error));
}
