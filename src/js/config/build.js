export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 12;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Optional Build 12 experience layer. It is deliberately non-blocking:
// the stable core app must continue even if this enhancement cannot load.
if (typeof document !== 'undefined') {
  import('../experience/polish.js').catch(() => {});
}
