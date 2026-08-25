import { DATA_SCHEMA_VERSION } from '../config/build.js';

const DB_NAME = 'auren';
const DB_VERSION = 2;
const STORE = 'checkins';
const PROFILE_STORE = 'profile';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'localDate' });
      if (!db.objectStoreNames.contains(PROFILE_STORE)) db.createObjectStore(PROFILE_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function getCheckin(localDate = localDateKey()) {
  const db = await openDb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).get(localDate);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } finally { db.close(); }
}

export async function getRecentCheckins(limit = 14) {
  const db = await openDb();
  try {
    const all = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).getAll();
      request.onsuccess = () => resolve(request.result ?? []);
      request.onerror = () => reject(request.error);
    });
    return all.sort((a, b) => String(b.localDate).localeCompare(String(a.localDate))).slice(0, limit);
  } finally { db.close(); }
}

export async function saveCheckin(observations) {
  const now = new Date();
  const record = {
    localDate: localDateKey(now),
    observedAt: now.toISOString(),
    schemaVersion: DATA_SCHEMA_VERSION,
    observations: {
      sleep: Number(observations.sleep),
      energy: Number(observations.energy),
      stress: Number(observations.stress),
      mood: Number(observations.mood),
      movement: Number(observations.movement),
    },
  };
  const db = await openDb();
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error ?? new Error('Check-in save aborted'));
    });
    return record;
  } finally { db.close(); }
}
