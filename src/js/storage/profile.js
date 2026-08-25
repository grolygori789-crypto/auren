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

async function getRecord(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PROFILE_STORE, 'readonly');
    const request = tx.objectStore(PROFILE_STORE).get(PROFILE_ID);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

async function putRecord(db, record) {
  await new Promise((resolve, reject) => {
    const tx = db.transaction(PROFILE_STORE, 'readwrite');
    tx.objectStore(PROFILE_STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error ?? new Error('Profile save aborted'));
  });
  return record;
}

export async function getBodyProfile() {
  const db = await openDb();
  try { return await getRecord(db); }
  finally { db.close(); }
}

export async function saveBodyProfile(input) {
  const db = await openDb();
  try {
    const previous = await getRecord(db);
    const record = {
      ...(previous ?? {}),
      id: PROFILE_ID,
      updatedAt: new Date().toISOString(),
      schemaVersion: DATA_SCHEMA_VERSION,
      age: Number(input.age),
      heightCm: Number(input.heightCm),
      weightKg: Number(input.weightKg),
      activity: String(input.activity || 'moderate'),
      goal: String(input.goal || 'understand'),
    };
    return await putRecord(db, record);
  } finally { db.close(); }
}

export async function saveProfileAvatar(avatarDataUrl) {
  const db = await openDb();
  try {
    const previous = await getRecord(db);
    const record = {
      ...(previous ?? {}),
      id: PROFILE_ID,
      updatedAt: new Date().toISOString(),
      schemaVersion: DATA_SCHEMA_VERSION,
      avatarDataUrl: String(avatarDataUrl || ''),
    };
    return await putRecord(db, record);
  } finally { db.close(); }
}

export async function clearProfileAvatar() {
  const db = await openDb();
  try {
    const previous = await getRecord(db);
    if (!previous) return null;
    const record = { ...previous, updatedAt: new Date().toISOString(), avatarDataUrl: '' };
    return await putRecord(db, record);
  } finally { db.close(); }
}

export async function saveProfileDisplayName(displayName) {
  const db = await openDb();
  try {
    const previous = await getRecord(db);
    const record = {
      ...(previous ?? {}),
      id: PROFILE_ID,
      updatedAt: new Date().toISOString(),
      schemaVersion: DATA_SCHEMA_VERSION,
      displayName: String(displayName || '').trim().slice(0, 40),
    };
    return await putRecord(db, record);
  } finally { db.close(); }
}
