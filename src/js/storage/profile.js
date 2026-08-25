import { DATA_SCHEMA_VERSION } from '../config/build.js';

const DB_NAME = 'auren';
const DB_VERSION = 2;
const PROFILE_STORE = 'profile';
const CHECKIN_STORE = 'checkins';
const PROFILE_ID = 'primary';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CHECKIN_STORE)) db.createObjectStore(CHECKIN_STORE, { keyPath: 'localDate' });
      if (!db.objectStoreNames.contains(PROFILE_STORE)) db.createObjectStore(PROFILE_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getBodyProfile() {
  const db = await openDb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(PROFILE_STORE, 'readonly');
      const request = tx.objectStore(PROFILE_STORE).get(PROFILE_ID);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } finally { db.close(); }
}

export async function saveBodyProfile(input) {
  const now = new Date();
  const record = {
    id: PROFILE_ID,
    updatedAt: now.toISOString(),
    schemaVersion: DATA_SCHEMA_VERSION,
    age: Number(input.age),
    heightCm: Number(input.heightCm),
    weightKg: Number(input.weightKg),
    activity: String(input.activity || 'moderate'),
    goal: String(input.goal || 'understand'),
  };
  const db = await openDb();
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(PROFILE_STORE, 'readwrite');
      tx.objectStore(PROFILE_STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error ?? new Error('Profile save aborted'));
    });
    return record;
  } finally { db.close(); }
}
