export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 14;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Build 12 experience polish remains non-blocking. Build 14 adds isolated local-data controls.
// Neither enhancement is allowed to block the accepted core runtime if its UI layer cannot load.
if (typeof document !== 'undefined') {
  import('../experience/polish.js').catch(() => {});
  import('../privacy/data-controls.js').catch((error) => console.error('Auren data controls unavailable', error));
}
