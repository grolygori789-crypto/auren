import en from './en.js';
import th from './th.js';
import { getPreference, setPreference } from '../storage/preferences.js';

const catalogs = { en, th };
let locale = getPreference('locale', navigator.language?.toLowerCase().startsWith('th') ? 'th' : 'en');
if (!catalogs[locale]) locale = 'en';

export function getLocale() { return locale; }
export function setLocale(next) {
  if (!catalogs[next]) return;
  locale = next;
  setPreference('locale', next);
  document.documentElement.lang = next === 'th' ? 'th' : 'en';
}
export function t(path) {
  return path.split('.').reduce((value, key) => value?.[key], catalogs[locale]);
}
export function catalog() { return catalogs[locale]; }
