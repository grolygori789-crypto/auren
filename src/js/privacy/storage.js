const DB_NAME = 'auren';
const DB_VERSION = 2;
const CHECKIN_STORE = 'checkins';
const PROFILE_STORE = 'profile';
const PREF_PREFIX = 'auren.pref.';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CHECKIN_STORE)) db.createObjectStore(CHECKIN_STORE, { keyPath: 'localDate' });
      if (!db.objectStoreNames.contains(PROFILE_STORE)) db.createObjectStore(PROFILE_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Unable to open Auren storage'));
    request.onblocked = () => reject(new Error('Auren storage is busy'));
  });
}

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function validLocalDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
}

export async function getLocalCheckin(localDate = localDateKey()) {
  if (!validLocalDate(localDate)) return null;
  const db = await openDb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(CHECKIN_STORE, 'readonly');
      const request = tx.objectStore(CHECKIN_STORE).get(localDate);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error || new Error('Unable to read check-in'));
    });
  } finally {
    db.close();
  }
}

export async function deleteLocalCheckin(localDate = localDateKey()) {
  if (!validLocalDate(localDate)) throw new Error('Invalid local date');
  const db = await openDb();
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(CHECKIN_STORE, 'readwrite');
      tx.objectStore(CHECKIN_STORE).delete(localDate);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('Unable to delete check-in'));
      tx.onabort = () => reject(tx.error || new Error('Check-in deletion was aborted'));
    });
  } finally {
    db.close();
  }
}

function clearAurenPreferences() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key?.startsWith(PREF_PREFIX)) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Preferences are non-critical. IndexedDB health data deletion remains authoritative.
  }
}

export async function eraseAllLocalAurenData() {
  // Delete the whole database rather than clearing only known stores. This makes
  // the privacy action future-safe if more local user-data stores are added later.
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error('Unable to erase Auren data'));
    request.onblocked = () => reject(new Error('Close other Auren tabs and try again'));
  });
  clearAurenPreferences();
}
