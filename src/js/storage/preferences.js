const PREFIX = 'auren.pref.';

export function getPreference(key, fallback = null) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setPreference(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Preference persistence is non-critical; the app remains usable.
  }
}

export function markFirstLaunchSeen() {
  setPreference('hasLaunched', true);
}

export function isFirstLaunch() {
  return getPreference('hasLaunched', false) !== true;
}
