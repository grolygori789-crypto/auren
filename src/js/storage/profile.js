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

function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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

function finiteOrNull(value, min, max) {
  if (value === '' || value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
}

function updateWeightHistory(previous, weightKg) {
  const history = Array.isArray(previous?.weightHistory) ? [...previous.weightHistory] : [];
  const localDate = localDateKey();
  const observedAt = new Date().toISOString();
  const last = history[history.length - 1];
  if (!last || Number(last.weightKg) !== Number(weightKg) || last.localDate !== localDate) {
    const withoutToday = history.filter((item) => item?.localDate !== localDate);
    withoutToday.push({ localDate, observedAt, weightKg: Number(weightKg) });
    return withoutToday.slice(-365);
  }
  return history;
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
    const weightKg = Number(input.weightKg);
    const record = {
      ...(previous ?? {}),
      id: PROFILE_ID,
      updatedAt: new Date().toISOString(),
      schemaVersion: DATA_SCHEMA_VERSION,
      age: Number(input.age),
      heightCm: Number(input.heightCm),
      weightKg,
      sexForCalc: String(input.sexForCalc || 'notSet'),
      activity: String(input.activity || 'moderate'),
      trainingType: String(input.trainingType || 'none'),
      trainingFrequency: Math.max(0, Math.min(14, Number(input.trainingFrequency) || 0)),
      goal: String(input.goal || 'understand'),
      waistCm: finiteOrNull(input.waistCm, 30, 250),
      bodyFatPct: finiteOrNull(input.bodyFatPct, 2, 75),
      weightHistory: updateWeightHistory(previous, weightKg),
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
