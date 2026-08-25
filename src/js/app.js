import { APP_VERSION, BUILD_NUMBER } from './config/build.js';
import { AurenOrb } from './core/orb.js';
import { catalog, getLocale, setLocale } from './i18n/i18n.js';
import { getPreference, setPreference, isFirstLaunch, markFirstLaunchSeen } from './storage/preferences.js';
import { getCheckin, saveCheckin } from './storage/checkins.js';

const THEMES = ['pearl', 'mineral', 'rose', 'sage', 'dusk'];
const LEGACY_THEME_MAP = { sky: 'mineral', blush: 'rose' };
const OBSERVATIONS = ['sleep', 'energy', 'stress', 'mood', 'movement'];
let todayCheckin = null;

const $ = (id) => document.getElementById(id);

function applyTheme(theme, { animate = true } = {}) {
  const migrated = LEGACY_THEME_MAP[theme] ?? theme;
  const next = THEMES.includes(migrated) ? migrated : 'pearl';
  const commit = () => {
    document.documentElement.dataset.theme = next;
    setPreference('theme', next);
    requestAnimationFrame(() => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color || '#f2e7db');
    });
    document.querySelectorAll('.theme-choice').forEach((button) => button.classList.toggle('active', button.dataset.theme === next));
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animate && !reduced && document.startViewTransition) document.startViewTransition(commit);
  else commit();
}

function greetingKey() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

function renderThemeChoices() {
  const c = catalog();
  const stored = getPreference('theme', 'pearl');
  const active = LEGACY_THEME_MAP[stored] ?? stored;
  $('themeGrid').innerHTML = THEMES.map((theme) => `
    <button class="theme-choice ${theme === active ? 'active' : ''}" data-theme="${theme}" type="button" aria-label="${c.you.themes[theme].name}">
      <span class="theme-swatch ${theme}" aria-hidden="true"></span>
      <span class="theme-copy"><strong>${c.you.themes[theme].name}</strong><span>${c.you.themes[theme].desc}</span></span>
    </button>`).join('');
  $('themeGrid').querySelectorAll('.theme-choice').forEach((button) => button.addEventListener('click', () => applyTheme(button.dataset.theme)));
}

function renderTrust() {
  $('trustStrip').innerHTML = catalog().today.trust.map(([title, copy]) => `<div class="trust-mini"><strong>${title}</strong><span>${copy}</span></div>`).join('');
}

function renderObserved() {
  const c = catalog();
  const grid = $('observedGrid');
  if (!todayCheckin) {
    grid.hidden = true;
    $('stateTitle').textContent = c.today.emptyTitle;
    $('stateCopy').textContent = c.today.emptyCopy;
    $('checkinBtn').textContent = c.today.checkin;
    return;
  }
  $('stateTitle').textContent = c.today.savedTitle;
  $('stateCopy').textContent = c.today.savedCopy;
  $('checkinBtn').textContent = c.today.editCheckin;
  grid.hidden = false;
  grid.setAttribute('aria-label', c.today.observed);
  grid.innerHTML = OBSERVATIONS.map((key) => `<div class="observed-item"><strong>${todayCheckin.observations[key]}</strong><span>${c.checkin[key]}</span></div>`).join('');
}

function renderLocale() {
  const c = catalog();
  document.documentElement.lang = getLocale() === 'th' ? 'th' : 'en';

  $('todayEyebrow').textContent = c.today.eyebrow;
  $('greetingText').textContent = c.today[greetingKey()];
  $('greetingSub').textContent = c.today.sub;
  $('stateKicker').textContent = c.today.stateKicker;
  $('understandTitle').textContent = c.today.understand;
  $('privateLabel').textContent = c.today.private;
  $('patternTitle').textContent = c.today.patternTitle;
  $('patternDesc').textContent = c.today.patternDesc;
  $('evidenceTitle').textContent = c.today.evidenceTitle;
  $('evidenceDesc').textContent = c.today.evidenceDesc;

  $('rhythmTitle').textContent = c.rhythm.title;
  $('rhythmSub').textContent = c.rhythm.sub;
  $('rhythmEmptyTitle').textContent = c.rhythm.emptyTitle;
  $('rhythmEmptyCopy').textContent = c.rhythm.emptyCopy;
  $('signalsTitle').textContent = c.signals.title;
  $('signalsSub').textContent = c.signals.sub;
  $('signalsEmptyTitle').textContent = c.signals.emptyTitle;
  $('signalsEmptyCopy').textContent = c.signals.emptyCopy;
  $('archiveTitle').textContent = c.archive.title;
  $('archiveSub').textContent = c.archive.sub;
  $('archiveEmptyTitle').textContent = c.archive.emptyTitle;
  $('archiveEmptyCopy').textContent = c.archive.emptyCopy;

  $('youTitle').textContent = c.you.title;
  $('youSub').textContent = c.you.sub;
  $('languageTitle').textContent = c.you.language;
  $('languageSub').textContent = c.you.languageSub;
  $('appearanceTitle').textContent = c.you.appearance;
  $('appearanceSub').textContent = c.you.appearanceSub;
  $('privacyTitle').textContent = c.you.privacy;
  $('privacySub').textContent = c.you.privacySub;
  $('motionTitle').textContent = c.you.motion;
  $('motionSub').textContent = c.you.motionSub;
  $('motionEnd').textContent = c.common.system;
  $('noAccountTitle').textContent = c.you.noAccount;
  $('noAccountSub').textContent = c.you.noAccountSub;
  $('aboutTitle').textContent = c.you.about;
  $('aboutSub').textContent = c.you.aboutSub;

  $('navToday').textContent = c.nav.today;
  $('navRhythm').textContent = c.nav.rhythm;
  $('navSignals').textContent = c.nav.signals;
  $('navArchive').textContent = c.nav.archive;
  $('navYou').textContent = c.nav.you;
  $('enBtn').classList.toggle('active', getLocale() === 'en');
  $('thBtn').classList.toggle('active', getLocale() === 'th');
  $('buildText').textContent = `Version ${APP_VERSION} · Build ${BUILD_NUMBER} · ${c.common.build}`;

  renderTrust();
  renderThemeChoices();
  renderObserved();
  renderCheckinForm();
}

function renderCheckinForm() {
  const c = catalog();
  $('checkinTitle').textContent = c.checkin.title;
  $('checkinIntro').textContent = c.checkin.intro;
  $('saveCheckinBtn').textContent = c.checkin.save;
  $('closeCheckinBtn').textContent = c.checkin.close;
  const values = todayCheckin?.observations ?? { sleep: 3, energy: 3, stress: 3, mood: 3, movement: 3 };
  $('checkinFields').innerHTML = OBSERVATIONS.map((key) => {
    const start = key === 'stress' ? c.checkin.calm : c.checkin.low;
    const end = key === 'stress' ? c.checkin.stressed : c.checkin.high;
    return `<div class="checkin-field">
      <div class="field-head"><label for="checkin-${key}">${c.checkin[key]}</label><output id="output-${key}" for="checkin-${key}">${values[key]}</output></div>
      <input class="range" id="checkin-${key}" name="${key}" type="range" min="1" max="5" step="1" value="${values[key]}" />
      <div class="range-labels"><span>${start}</span><span>${end}</span></div>
    </div>`;
  }).join('');
  OBSERVATIONS.forEach((key) => {
    const input = $(`checkin-${key}`);
    input.addEventListener('input', () => { $(`output-${key}`).value = input.value; });
  });
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
  document.querySelectorAll('.nav-btn').forEach((button) => button.classList.toggle('active', button.dataset.nav === name));
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function openCheckin() {
  renderCheckinForm();
  $('checkinStatus').textContent = '';
  $('checkinModal').classList.add('open');
  requestAnimationFrame(() => $('checkin-sleep')?.focus());
}
function closeCheckin() { $('checkinModal').classList.remove('open'); }

async function loadToday() {
  try { todayCheckin = await getCheckin(); }
  catch { todayCheckin = null; }
  renderObserved();
}

async function submitCheckin(event) {
  event.preventDefault();
  const c = catalog();
  const observations = Object.fromEntries(OBSERVATIONS.map((key) => [key, Number($(`checkin-${key}`).value)]));
  $('saveCheckinBtn').disabled = true;
  try {
    todayCheckin = await saveCheckin(observations);
    $('checkinStatus').textContent = c.checkin.saved;
    renderObserved();
    setTimeout(closeCheckin, 650);
  } catch {
    $('checkinStatus').textContent = c.checkin.error;
  } finally {
    $('saveCheckinBtn').disabled = false;
  }
}

function startOpeningTransition() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = $('opening');
  const app = $('app');
  const openingWrap = $('openingOrbWrap');
  const todayWrap = $('todayOrbWrap');
  app.classList.add('ready');
  if (reduced) {
    todayWrap.classList.remove('waiting');
    opening.classList.add('leave');
    return;
  }
  const from = openingWrap.getBoundingClientRect();
  const to = todayWrap.getBoundingClientRect();
  const scale = to.width / from.width;
  const dx = to.left - from.left;
  const dy = to.top - from.top;
  openingWrap.style.animation = 'none';
  openingWrap.style.opacity = '1';
  openingWrap.style.filter = 'none';
  openingWrap.style.transformOrigin = 'top left';
  openingWrap.style.transition = 'transform .88s cubic-bezier(.16,.78,.18,1), opacity .34s ease .62s';
  $('openingIdentity').classList.add('morphing');
  requestAnimationFrame(() => {
    openingWrap.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    openingWrap.style.opacity = '0.12';
  });
  setTimeout(() => {
    todayWrap.classList.remove('waiting');
    opening.classList.add('leave');
  }, 790);
}

function runOpening() {
  const first = isFirstLaunch();
  markFirstLaunchSeen();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = reduced ? 950 : (first ? 4150 : 3725);
  setTimeout(startOpeningTransition, delay);
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  navigator.serviceWorker.register('./sw.js', { type: 'module' }).catch(() => {});
}

function bind() {
  document.querySelectorAll('[data-nav]').forEach((button) => button.addEventListener('click', () => showScreen(button.dataset.nav)));
  $('profileBtn').addEventListener('click', () => showScreen('you'));
  $('enBtn').addEventListener('click', () => { setLocale('en'); renderLocale(); });
  $('thBtn').addEventListener('click', () => { setLocale('th'); renderLocale(); });
  $('checkinBtn').addEventListener('click', openCheckin);
  $('closeCheckinBtn').addEventListener('click', closeCheckin);
  $('checkinModal').addEventListener('click', (event) => { if (event.target === $('checkinModal')) closeCheckin(); });
  $('checkinForm').addEventListener('submit', submitCheckin);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && $('checkinModal').classList.contains('open')) closeCheckin(); });
}

applyTheme(getPreference('theme', 'pearl'), { animate: false });
new AurenOrb($('openingOrb'), { signature: true });
new AurenOrb($('todayOrb'), { calm: true });
bind();
renderLocale();
await loadToday();
runOpening();
registerServiceWorker();
