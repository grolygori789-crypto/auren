import { APP_VERSION, BUILD_NUMBER } from './config/build.js';
import { AurenOrb } from './core/orb.js';
import { catalog, getLocale, setLocale } from './i18n/i18n.js';
import { getPreference, setPreference, isFirstLaunch, markFirstLaunchSeen } from './storage/preferences.js';
import { getCheckin, getRecentCheckins, saveCheckin } from './storage/checkins.js';
import { getBodyProfile, saveBodyProfile } from './storage/profile.js';
import { bodyContext, haloContext, nextAction } from './intelligence/body.js';

const THEMES = ['pearl', 'mineral', 'rose', 'sage', 'dusk'];
const LEGACY_THEME_MAP = { sky: 'mineral', blush: 'rose' };
const OBSERVATIONS = ['sleep', 'energy', 'stress', 'mood', 'movement'];
let todayCheckin = null;
let recentCheckins = [];
let bodyProfile = null;
let currentHalo = null;

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

function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat(getLocale() === 'th' ? 'th-TH' : 'en', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(value);
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

function bodyCopyKeys(context) {
  if (!context || context.status !== 'ready') return ['bodyMissingTitle', 'bodyMissingCopy'];
  if (context.model === 'youth') return ['bodyYouthTitle', 'bodyYouthCopy'];
  if (context.category === 'below') return ['bodyBelowTitle', 'bodyBelowCopy'];
  if (context.category === 'above') return ['bodyAboveTitle', 'bodyAboveCopy'];
  if (context.category === 'wellAbove') return ['bodyWellAboveTitle', 'bodyWellAboveCopy'];
  return ['bodyWithinTitle', 'bodyWithinCopy'];
}

function renderBodyContext() {
  const c = catalog();
  const context = bodyContext(bodyProfile);
  const [titleKey, copyKey] = bodyCopyKeys(context);
  $('bodyContextTitle').textContent = c.today[titleKey];
  $('bodyContextCopy').textContent = c.today[copyKey];
  $('bodyProfileTitle').textContent = c.you.bodyProfile;
  $('bodyProfileSub').textContent = bodyProfile ? c.you.bodyProfileReady : c.you.bodyProfileMissing;
  const metrics = $('bodyMetrics');
  if (context.status !== 'ready') {
    metrics.hidden = true;
    return;
  }
  metrics.hidden = false;
  if (context.model === 'adult') {
    const [low, high] = context.referenceWeightKg;
    metrics.innerHTML = `
      <div class="body-metric"><strong>${formatNumber(context.bmi)}</strong><span>${c.today.bodyBmi}</span></div>
      <div class="body-metric"><strong>${formatNumber(low)}–${formatNumber(high)} kg</strong><span>${c.today.bodyReference}</span></div>
      <div class="body-metric"><strong>${formatNumber(context.age,0)} ${c.today.bodyYears}</strong><span>${c.today.bodyAge}</span></div>`;
  } else {
    metrics.innerHTML = `
      <div class="body-metric"><strong>${formatNumber(context.age,0)} ${c.today.bodyYears}</strong><span>${c.today.bodyAge}</span></div>
      <div class="body-metric"><strong>${formatNumber(context.heightCm)} cm</strong><span>${c.bodyProfile.height}</span></div>
      <div class="body-metric"><strong>${formatNumber(context.weightKg)} kg</strong><span>${c.bodyProfile.weight}</span></div>`;
  }
}

function haloStatusText(state) {
  return catalog().halo.status[state] ?? catalog().halo.status.missing;
}

function renderHalo() {
  const c = catalog();
  currentHalo = haloContext({ profile: bodyProfile, checkin: todayCheckin, recentCount: recentCheckins.length });
  $('haloEyebrow').textContent = c.today.haloEyebrow;
  $('haloTitle').textContent = c.today.haloTitle[currentHalo.overall];
  $('haloCopy').textContent = c.today.haloCopy[currentHalo.overall];
  $('haloDetailsBtn').textContent = c.today.haloDetails;
  const segments = ['body','daily','movement','continuity'];
  const arcIds = { body:'haloBodyArc', daily:'haloDailyArc', movement:'haloMovementArc', continuity:'haloContinuityArc' };
  segments.forEach((key) => {
    const state = currentHalo.segments[key];
    const arc = $(arcIds[key]);
    arc.className.baseVal = `halo-arc halo-${key} state-${state}`;
  });
  $('haloLegend').innerHTML = segments.map((key) => {
    const state = currentHalo.segments[key];
    return `<div class="halo-legend-item state-${state}"><strong><i></i>${c.today.haloSegments[key]}</strong><span>${haloStatusText(state)}</span></div>`;
  }).join('');
}

function renderOneAction() {
  const c = catalog();
  const action = nextAction({ profile: bodyProfile, checkin: todayCheckin });
  const [title, copy] = c.today.oneActions[action.key];
  $('oneActionTitle').textContent = c.today.oneActionTitle;
  $('oneActionBasis').textContent = c.today.oneActionBasis[action.basis];
  $('oneActionName').textContent = title;
  $('oneActionCopy').textContent = copy;
}

function renderLocale() {
  const c = catalog();
  document.documentElement.lang = getLocale() === 'th' ? 'th' : 'en';
  $('todayEyebrow').textContent = c.today.eyebrow;
  $('greetingText').textContent = c.today[greetingKey()];
  $('greetingSub').textContent = c.today.sub;
  $('stateKicker').textContent = c.today.stateKicker;
  $('bodySectionTitle').textContent = c.today.bodySection;
  $('bodyPrivate').textContent = c.today.bodyPrivate;
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
  renderBodyContext();
  renderHalo();
  renderOneAction();
  renderCheckinForm();
  renderProfileForm();
  renderHaloModal();
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
    return `<div class="checkin-field"><div class="field-head"><label for="checkin-${key}">${c.checkin[key]}</label><output id="output-${key}" for="checkin-${key}">${values[key]}</output></div><input class="range" id="checkin-${key}" name="${key}" type="range" min="1" max="5" step="1" value="${values[key]}" /><div class="range-labels"><span>${start}</span><span>${end}</span></div></div>`;
  }).join('');
  OBSERVATIONS.forEach((key) => {
    const input = $(`checkin-${key}`);
    input.addEventListener('input', () => { $(`output-${key}`).value = input.value; });
  });
}

function renderProfileForm() {
  const c = catalog();
  $('profileTitle').textContent = c.bodyProfile.title;
  $('profileIntro').textContent = c.bodyProfile.intro;
  $('profileAgeLabel').textContent = c.bodyProfile.age;
  $('profileAgeHint').textContent = c.bodyProfile.ageHint;
  $('profileHeightLabel').textContent = c.bodyProfile.height;
  $('profileWeightLabel').textContent = c.bodyProfile.weight;
  $('profileActivityLabel').textContent = c.bodyProfile.activity;
  $('profileGoalLabel').textContent = c.bodyProfile.goal;
  $('saveProfileBtn').textContent = c.bodyProfile.save;
  $('closeProfileBtn').textContent = c.bodyProfile.close;
  $('profileActivity').innerHTML = Object.entries(c.bodyProfile.activityOptions).map(([value,label]) => `<option value="${value}">${label}</option>`).join('');
  $('profileGoal').innerHTML = Object.entries(c.bodyProfile.goalOptions).map(([value,label]) => `<option value="${value}">${label}</option>`).join('');
  if (bodyProfile) {
    $('profileAge').value = bodyProfile.age;
    $('profileHeight').value = bodyProfile.heightCm;
    $('profileWeight').value = bodyProfile.weightKg;
    $('profileActivity').value = bodyProfile.activity;
    $('profileGoal').value = bodyProfile.goal;
  }
  updateProfileReferenceNote();
}

function updateProfileReferenceNote() {
  const c = catalog();
  const age = Number($('profileAge').value || bodyProfile?.age || 20);
  $('profileReferenceNote').textContent = age < 20 ? c.bodyProfile.youthNote : c.bodyProfile.adultNote;
}

function renderHaloModal() {
  if (!currentHalo) return;
  const c = catalog();
  $('haloModalTitle').textContent = c.halo.title;
  $('haloModalIntro').textContent = c.halo.intro;
  $('closeHaloBtn').textContent = c.halo.close;
  const rows = [
    ['body', c.today.haloSegments.body, c.halo.calculated, c.halo.evidenceBody],
    ['daily', c.today.haloSegments.daily, c.halo.observed, c.halo.evidenceDaily],
    ['movement', c.today.haloSegments.movement, c.halo.observed, c.halo.evidenceMovement],
    ['continuity', c.today.haloSegments.continuity, c.halo.calculated, c.halo.evidenceContinuity],
  ];
  $('haloEvidenceList').innerHTML = rows.map(([key,title,source,copy]) => `<div class="evidence-item"><div class="evidence-head"><strong>${title}</strong><span class="evidence-badge">${source}</span></div><p>${copy}</p><div class="evidence-status">${c.halo.confidence}: ${haloStatusText(currentHalo.segments[key])}</div></div>`).join('');
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
  document.querySelectorAll('.nav-btn').forEach((button) => button.classList.toggle('active', button.dataset.nav === name));
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function openCheckin() { renderCheckinForm(); $('checkinStatus').textContent = ''; $('checkinModal').classList.add('open'); requestAnimationFrame(() => $('checkin-sleep')?.focus()); }
function closeCheckin() { $('checkinModal').classList.remove('open'); }
function openProfile() { renderProfileForm(); $('profileStatus').textContent = ''; $('profileModal').classList.add('open'); requestAnimationFrame(() => $('profileAge')?.focus()); }
function closeProfile() { $('profileModal').classList.remove('open'); }
function openHalo() { renderHaloModal(); $('haloModal').classList.add('open'); }
function closeHalo() { $('haloModal').classList.remove('open'); }

async function loadData() {
  try { [todayCheckin, recentCheckins, bodyProfile] = await Promise.all([getCheckin(), getRecentCheckins(14), getBodyProfile()]); }
  catch {
    try { todayCheckin = await getCheckin(); } catch { todayCheckin = null; }
    recentCheckins = todayCheckin ? [todayCheckin] : [];
    try { bodyProfile = await getBodyProfile(); } catch { bodyProfile = null; }
  }
  renderObserved(); renderBodyContext(); renderHalo(); renderOneAction(); renderHaloModal(); renderProfileForm();
}

async function submitCheckin(event) {
  event.preventDefault();
  const c = catalog();
  const observations = Object.fromEntries(OBSERVATIONS.map((key) => [key, Number($(`checkin-${key}`).value)]));
  $('saveCheckinBtn').disabled = true;
  try {
    todayCheckin = await saveCheckin(observations);
    recentCheckins = await getRecentCheckins(14);
    $('checkinStatus').textContent = c.checkin.saved;
    renderObserved(); renderHalo(); renderOneAction(); renderHaloModal();
    setTimeout(closeCheckin, 650);
  } catch { $('checkinStatus').textContent = c.checkin.error; }
  finally { $('saveCheckinBtn').disabled = false; }
}

async function submitProfile(event) {
  event.preventDefault();
  const c = catalog();
  const input = { age: Number($('profileAge').value), heightCm: Number($('profileHeight').value), weightKg: Number($('profileWeight').value), activity: $('profileActivity').value, goal: $('profileGoal').value };
  $('saveProfileBtn').disabled = true;
  try {
    bodyProfile = await saveBodyProfile(input);
    $('profileStatus').textContent = c.bodyProfile.saved;
    renderBodyContext(); renderHalo(); renderOneAction(); renderHaloModal();
    setTimeout(closeProfile, 700);
  } catch { $('profileStatus').textContent = c.bodyProfile.error; }
  finally { $('saveProfileBtn').disabled = false; }
}

function startOpeningTransition() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = $('opening'), app = $('app'), openingWrap = $('openingOrbWrap'), todayWrap = $('todayOrbWrap');
  app.classList.add('ready');
  if (reduced) { todayWrap.classList.remove('waiting'); opening.classList.add('leave'); return; }
  const from = openingWrap.getBoundingClientRect(), to = todayWrap.getBoundingClientRect();
  const scale = to.width / from.width, dx = to.left - from.left, dy = to.top - from.top;
  openingWrap.style.animation = 'none'; openingWrap.style.opacity = '1'; openingWrap.style.filter = 'none'; openingWrap.style.transformOrigin = 'top left';
  openingWrap.style.transition = 'transform .88s cubic-bezier(.16,.78,.18,1), opacity .34s ease .62s';
  $('openingIdentity').classList.add('morphing');
  requestAnimationFrame(() => { openingWrap.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`; openingWrap.style.opacity = '0.12'; });
  setTimeout(() => { todayWrap.classList.remove('waiting'); opening.classList.add('leave'); }, 790);
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
  $('bodyContextBtn').addEventListener('click', openProfile);
  $('bodyProfileBtn').addEventListener('click', openProfile);
  $('haloDetailsBtn').addEventListener('click', openHalo);
  $('closeCheckinBtn').addEventListener('click', closeCheckin);
  $('closeProfileBtn').addEventListener('click', closeProfile);
  $('closeHaloBtn').addEventListener('click', closeHalo);
  $('profileAge').addEventListener('input', updateProfileReferenceNote);
  $('checkinModal').addEventListener('click', (event) => { if (event.target === $('checkinModal')) closeCheckin(); });
  $('profileModal').addEventListener('click', (event) => { if (event.target === $('profileModal')) closeProfile(); });
  $('haloModal').addEventListener('click', (event) => { if (event.target === $('haloModal')) closeHalo(); });
  $('checkinForm').addEventListener('submit', submitCheckin);
  $('profileForm').addEventListener('submit', submitProfile);
  document.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; closeCheckin(); closeProfile(); closeHalo(); });
}

applyTheme(getPreference('theme', 'pearl'), { animate: false });
new AurenOrb($('openingOrb'), { signature: true });
new AurenOrb($('todayOrb'), { calm: true });
bind();
renderLocale();
await loadData();
runOpening();
registerServiceWorker();
