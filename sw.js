// Auren runtime Build 46 — Life Force visibility calibration.
import { CACHE_NAME } from './src/js/config/build.js';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './src/css/tokens.css',
  './src/css/app.css',
  './src/css/experience.css',
  './src/css/privacy.css',
  './src/css/rhythm.css',
  './src/css/signals.css',
  './src/css/today-detail.css',
  './src/css/today-checkin.css',
  './src/css/today-affordance.css',
  './src/css/body-context-polish.css',
  './src/css/archive-polish.css',
  './src/css/you-polish.css',
  './src/css/help-support.css',
  './src/css/legal.css',
  './src/js/app.js',
  './src/js/config/build.js',
  './src/js/core/orb.js',
  './src/js/experience/launch-handoff.js',
  './src/js/experience/polish.js',
  './src/js/privacy/data-controls.js',
  './src/js/privacy/storage.js',
  './src/js/rhythm/rhythm.js',
  './src/js/signals/signals.js',
  './src/js/today/metric-detail.js',
  './src/js/today/checkin-slider-polish.js',
  './src/js/today/affordance-polish.js',
  './src/js/today/body-context-polish.js',
  './src/js/archive/archive-polish.js',
  './src/js/you/you-polish.js',
  './src/js/you/help-support.js',
  './src/js/legal/legal-center.js',
  './src/js/intelligence/body.js',
  './src/js/i18n/en.js',
  './src/js/i18n/th.js',
  './src/js/i18n/i18n.js',
  './src/js/storage/preferences.js',
  './src/js/storage/checkins.js',
  './src/js/storage/profile.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('auren-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
