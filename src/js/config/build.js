export const APP_VERSION = '0.1.0';
export const BUILD_NUMBER = 13;
export const BUILD_LABEL = `Build ${BUILD_NUMBER}`;
export const CACHE_NAME = `auren-${APP_VERSION}-build-${BUILD_NUMBER}`;
export const DATA_SCHEMA_VERSION = 4;

// Optional experience layer introduced in Build 12 and retained in Build 13.
// It remains non-blocking: the stable core app continues if it cannot load.
if (typeof document !== 'undefined') {
  import('../experience/polish.js').catch(() => {});
}
