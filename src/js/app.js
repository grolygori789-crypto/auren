import { APP_VERSION, BUILD_NUMBER } from './config/build.js';
import { AurenOrb } from './core/orb.js';
import { catalog, getLocale, setLocale } from './i18n/i18n.js';
import { getPreference, setPreference, isFirstLaunch, markFirstLaunchSeen } from './storage/preferences.js';
import { getCheckin, getRecentCheckins, saveCheckin } from './storage/checkins.js';
import { getBodyProfile, saveBodyProfile, saveProfileAvatar, clearProfileAvatar, saveProfileDisplayName } from './storage/profile.js';
import { bodyContext, haloContext, nextAction } from './intelligence/body.js';

const THEMES = ['pearl', 'mineral', 'rose', 'sage', 'dusk'];
const LEGACY_THEME_MAP = { sky: 'mineral', blush: 'rose' };
const OBSERVATIONS = ['sleep', 'energy', 'stress', 'mood', 'movement'];
let todayCheckin = null;
let recentCheckins = [];
let bodyProfile = null;
let currentHalo = null;
let todayOrbInstance = null;
let avatarDraft = null;
const cropPointers = new Map();
let pinchState = null;

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

function greetingText() {
  const c = catalog();
  const base = c.today[greetingKey()];
  const name = String(bodyProfile?.displayName || '').trim();
  if (!name) return base;
  if (getLocale() === 'th') return `${base} ${name}`;
  return `${base.replace(/[.!?]+$/, '')}, ${name}.`;
}

function renderGreeting() {
  $('greetingText').textContent = greetingText();
}

function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat(getLocale() === 'th' ? 'th-TH' : 'en', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(value);
}

function hasBodyData(profile = bodyProfile) {
  return Boolean(profile && Number.isFinite(Number(profile.age)) && Number.isFinite(Number(profile.heightCm)) && Number.isFinite(Number(profile.weightKg)));
}

function observationTone(key, value) {
  const v = Number(value);
  if (key === 'stress') {
    if (v <= 1) return ['calm', 'positive'];
    if (v === 2) return ['light', 'positive'];
    if (v === 3) return ['moderate', 'neutral'];
    if (v === 4) return ['highStress', 'attention'];
    return ['veryHighStress', 'attention'];
  }
  if (v <= 1) return ['veryLow', 'attention'];
  if (v === 2) return ['low', 'attention'];
  if (v === 3) return ['steady', 'neutral'];
  if (v === 4) return ['high', 'positive'];
  return ['excellent', 'positive'];
}

function renderIdentity() {
  const c = catalog();
  const src = bodyProfile?.avatarDataUrl || '';
  const displayName = String(bodyProfile?.displayName || '').trim();
  const pairs = [
    [$('topbarAvatar'), $('topbarAvatarFallback')],
    [$('identityAvatar'), $('identityAvatarFallback')],
  ];
  pairs.forEach(([img, fallback]) => {
    if (!img || !fallback) return;
    if (src) {
      img.src = src; img.hidden = false; fallback.hidden = true;
    } else {
      img.removeAttribute('src'); img.hidden = true; fallback.hidden = false;
    }
  });
  $('identityEyebrow').textContent = c.you.identityEyebrow;
  $('identityTitle').textContent = displayName || c.you.identityTitle;
  $('identityCopy').textContent = displayName ? c.you.identityNamedCopy : c.you.identityCopy;
  $('displayNameLabel').textContent = c.you.identityNameLabel;
  $('displayNameInput').placeholder = c.you.identityNamePlaceholder;
  if (document.activeElement !== $('displayNameInput')) $('displayNameInput').value = displayName;
  $('saveDisplayNameBtn').textContent = c.you.identityNameSave;
  $('uploadAvatarBtn').textContent = src ? c.you.identityChange : c.you.identityUpload;
  $('removeAvatarBtn').textContent = c.you.identityRemove;
  $('removeAvatarBtn').hidden = !src;
  $('topbarAvatar').alt = '';
  $('identityAvatar').alt = displayName ? `${displayName}` : '';
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !String(file.type || '').startsWith('image/')) { reject(new Error('Not an image')); return; }
    if (file.size > 15 * 1024 * 1024) { reject(new Error('Image too large')); return; }
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('Read failed'));
    reader.onload = () => {
      const img = new Image();
      img.decoding = 'async';
      img.onerror = () => reject(new Error('Decode failed'));
      img.onload = () => resolve({ image: img, dataUrl: String(reader.result || '') });
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  });
}

function cropStageSize() {
  return Math.max(1, $('avatarCropViewport').clientWidth || 252);
}

function avatarBaseScale() {
  if (!avatarDraft?.image) return 1;
  const size = cropStageSize();
  return Math.max(size / avatarDraft.image.naturalWidth, size / avatarDraft.image.naturalHeight);
}

function clampAvatarPosition() {
  if (!avatarDraft?.image) return;
  const size = cropStageSize();
  const scale = avatarBaseScale() * avatarDraft.zoom;
  const rw = avatarDraft.image.naturalWidth * scale;
  const rh = avatarDraft.image.naturalHeight * scale;
  const maxX = Math.max(0, (rw - size) / 2);
  const maxY = Math.max(0, (rh - size) / 2);
  avatarDraft.x = Math.max(-maxX, Math.min(maxX, avatarDraft.x));
  avatarDraft.y = Math.max(-maxY, Math.min(maxY, avatarDraft.y));
}

function renderAvatarCrop() {
  if (!avatarDraft?.image) return;
  clampAvatarPosition();
  const size = cropStageSize();
  const scale = avatarBaseScale() * avatarDraft.zoom;
  const rw = avatarDraft.image.naturalWidth * scale;
  const rh = avatarDraft.image.naturalHeight * scale;
  const img = $('avatarCropImage');
  img.style.width = `${rw}px`;
  img.style.height = `${rh}px`;
  img.style.transform = `translate(-50%, -50%) translate(${avatarDraft.x}px, ${avatarDraft.y}px)`;
  $('avatarZoom').value = String(avatarDraft.zoom);
}

function resetAvatarCrop() {
  if (!avatarDraft) return;
  avatarDraft.zoom = 1;
  avatarDraft.x = 0;
  avatarDraft.y = 0;
  pinchState = null;
  renderAvatarCrop();
}

function openAvatarEditor(image, source) {
  avatarDraft = { image, source, zoom: 1, x: 0, y: 0 };
  $('avatarCropImage').src = source;
  $('avatarCropStatus').textContent = '';
  $('avatarEditorModal').classList.add('open');
  requestAnimationFrame(() => requestAnimationFrame(renderAvatarCrop));
}

function closeAvatarEditor() {
  $('avatarEditorModal').classList.remove('open');
  cropPointers.clear();
  pinchState = null;
  avatarDraft = null;
  $('avatarCropImage').removeAttribute('src');
}

function avatarDataUrlFromDraft() {
  if (!avatarDraft?.image) throw new Error('No avatar draft');
  const out = 512;
  const stage = cropStageSize();
  const scale = avatarBaseScale() * avatarDraft.zoom * (out / stage);
  const dw = avatarDraft.image.naturalWidth * scale;
  const dh = avatarDraft.image.naturalHeight * scale;
  const ox = avatarDraft.x * (out / stage);
  const oy = avatarDraft.y * (out / stage);
  const canvas = document.createElement('canvas');
  canvas.width = out; canvas.height = out;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = '#f3e6da'; ctx.fillRect(0, 0, out, out);
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(avatarDraft.image, (out - dw) / 2 + ox, (out - dh) / 2 + oy, dw, dh);
  let data = '';
  try { data = canvas.toDataURL('image/webp', 0.86); } catch {}
  if (!data || !data.startsWith('data:image/')) data = canvas.toDataURL('image/jpeg', 0.88);
  return data;
}

function pointerDistance() {
  const pts = [...cropPointers.values()];
  if (pts.length < 2) return 0;
  return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
}

function pointerCenter() {
  const pts = [...cropPointers.values()];
  if (!pts.length) return { x:0, y:0 };
  return { x: pts.reduce((sum,p)=>sum+p.x,0)/pts.length, y: pts.reduce((sum,p)=>sum+p.y,0)/pts.length };
}

function beginCropPointer(event) {
  if (!avatarDraft) return;
  $('avatarCropViewport').setPointerCapture?.(event.pointerId);
  cropPointers.set(event.pointerId, { x:event.clientX, y:event.clientY });
  if (cropPointers.size === 1) {
    avatarDraft.lastPoint = { x:event.clientX, y:event.clientY };
    pinchState = null;
  } else if (cropPointers.size === 2) {
    pinchState = { distance:pointerDistance(), zoom:avatarDraft.zoom, center:pointerCenter(), x:avatarDraft.x, y:avatarDraft.y };
  }
}

function moveCropPointer(event) {
  if (!avatarDraft || !cropPointers.has(event.pointerId)) return;
  const previous = cropPointers.get(event.pointerId);
  cropPointers.set(event.pointerId, { x:event.clientX, y:event.clientY });
  if (cropPointers.size === 1) {
    avatarDraft.x += event.clientX - previous.x;
    avatarDraft.y += event.clientY - previous.y;
  } else if (cropPointers.size >= 2 && pinchState) {
    const distance = Math.max(1, pointerDistance());
    avatarDraft.zoom = Math.max(1, Math.min(3, pinchState.zoom * distance / Math.max(1,pinchState.distance)));
    const center = pointerCenter();
    avatarDraft.x = pinchState.x + (center.x - pinchState.center.x);
    avatarDraft.y = pinchState.y + (center.y - pinchState.center.y);
  }
  renderAvatarCrop();
}

function endCropPointer(event) {
  cropPointers.delete(event.pointerId);
  if (cropPointers.size < 2) pinchState = null;
  if (cropPointers.size === 1) {
    const p = [...cropPointers.values()][0];
    avatarDraft.lastPoint = { ...p };
  }
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
  $('coreHero').classList.toggle('has-checkin', Boolean(todayCheckin));
  $('checkinBtn').classList.toggle('checkin-secondary', Boolean(todayCheckin));
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
  grid.innerHTML = OBSERVATIONS.map((key) => {
    const value = todayCheckin.observations[key];
    const [labelKey, tone] = observationTone(key, value);
    return `<div class="observed-item tone-${tone}"><strong>${c.today.observedLevels[labelKey]}</strong><span>${c.checkin[key]}</span><em>${value}/5</em></div>`;
  }).join('');
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
  $('bodyProfileSub').textContent = hasBodyData() ? c.you.bodyProfileReady : c.you.bodyProfileMissing;
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
  $('coreStage').dataset.halo = currentHalo.overall;
  const arcIds = { body:'haloBodyArc', daily:'haloDailyArc', movement:'haloMovementArc', continuity:'haloContinuityArc' };
  const nodeIds = { body:'haloBodyNode', daily:'haloDailyNode', movement:'haloMovementNode', continuity:'haloContinuityNode' };
  segments.forEach((key) => {
    const state = currentHalo.segments[key];
    const arc = $(arcIds[key]);
    const node = $(nodeIds[key]);
    arc.className.baseVal = `halo-arc halo-${key} state-${state}`;
    node.className.baseVal = `halo-node halo-node-${key} state-${state}`;
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
  renderGreeting();
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
  renderIdentity();
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
  $('avatarEditorEyebrow').textContent = c.you.avatarEditorEyebrow;
  $('avatarEditorTitle').textContent = c.you.avatarEditorTitle;
  $('avatarEditorIntro').textContent = c.you.avatarEditorIntro;
  $('avatarZoomLabel').textContent = c.you.avatarZoomLabel;
  $('avatarCropHint').textContent = c.you.avatarCropHint;
  $('saveAvatarCropBtn').textContent = c.you.avatarCropSave;
  $('resetAvatarCropBtn').textContent = c.you.avatarCropReset;
  $('cancelAvatarCropBtn').textContent = c.you.avatarCropCancel;

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
  if (hasBodyData()) {
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
  renderObserved(); renderBodyContext(); renderHalo(); renderOneAction(); renderHaloModal(); renderProfileForm(); renderIdentity(); renderGreeting();
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
    todayOrbInstance?.react(0.19);
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
    renderBodyContext(); renderHalo(); renderOneAction(); renderHaloModal(); renderIdentity();
    todayOrbInstance?.react(0.10);
    setTimeout(closeProfile, 700);
  } catch { $('profileStatus').textContent = c.bodyProfile.error; }
  finally { $('saveProfileBtn').disabled = false; }
}


async function handleAvatarUpload(event) {
  const c = catalog();
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  $('avatarStatus').textContent = '';
  try {
    const { image, dataUrl } = await readImageFile(file);
    openAvatarEditor(image, dataUrl);
  } catch {
    $('avatarStatus').textContent = c.you.identityError;
  }
}

async function saveAvatarCrop() {
  const c = catalog();
  if (!avatarDraft) return;
  $('saveAvatarCropBtn').disabled = true;
  $('avatarCropStatus').textContent = c.you.avatarCropSaving;
  try {
    const dataUrl = avatarDataUrlFromDraft();
    bodyProfile = await saveProfileAvatar(dataUrl);
    renderIdentity();
    $('avatarStatus').textContent = c.you.identitySaved;
    closeAvatarEditor();
  } catch {
    $('avatarCropStatus').textContent = c.you.identityError;
  } finally {
    $('saveAvatarCropBtn').disabled = false;
  }
}

async function submitDisplayName(event) {
  event.preventDefault();
  const c = catalog();
  const name = String($('displayNameInput').value || '').trim().replace(/\\s+/g, ' ').slice(0,40);
  $('saveDisplayNameBtn').disabled = true;
  $('nameStatus').textContent = '';
  try {
    bodyProfile = await saveProfileDisplayName(name);
    renderIdentity();
    renderGreeting();
    $('nameStatus').textContent = c.you.identityNameSaved;
  } catch {
    $('nameStatus').textContent = c.you.identityNameError;
  } finally {
    $('saveDisplayNameBtn').disabled = false;
  }
}

async function removeAvatar() {
  const c = catalog();
  $('removeAvatarBtn').disabled = true;
  try {
    bodyProfile = await clearProfileAvatar();
    renderIdentity();
    $('avatarStatus').textContent = c.you.identityRemoved;
  } catch {
    $('avatarStatus').textContent = c.you.identityError;
  } finally { $('removeAvatarBtn').disabled = false; }
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
  $('uploadAvatarBtn').addEventListener('click', () => $('avatarInput').click());
  $('avatarInput').addEventListener('change', handleAvatarUpload);
  $('removeAvatarBtn').addEventListener('click', removeAvatar);
  $('identityNameForm').addEventListener('submit', submitDisplayName);
  $('avatarZoom').addEventListener('input', () => { if (!avatarDraft) return; avatarDraft.zoom = Number($('avatarZoom').value); renderAvatarCrop(); });
  $('avatarCropViewport').addEventListener('pointerdown', beginCropPointer);
  $('avatarCropViewport').addEventListener('pointermove', moveCropPointer);
  $('avatarCropViewport').addEventListener('pointerup', endCropPointer);
  $('avatarCropViewport').addEventListener('pointercancel', endCropPointer);
  $('saveAvatarCropBtn').addEventListener('click', saveAvatarCrop);
  $('resetAvatarCropBtn').addEventListener('click', resetAvatarCrop);
  $('cancelAvatarCropBtn').addEventListener('click', closeAvatarEditor);
  $('cancelAvatarCropTopBtn').addEventListener('click', closeAvatarEditor);
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
  $('avatarEditorModal').addEventListener('click', (event) => { if (event.target === $('avatarEditorModal')) closeAvatarEditor(); });
  $('haloModal').addEventListener('click', (event) => { if (event.target === $('haloModal')) closeHalo(); });
  $('checkinForm').addEventListener('submit', submitCheckin);
  $('profileForm').addEventListener('submit', submitProfile);
  document.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; closeCheckin(); closeProfile(); closeAvatarEditor(); closeHalo(); });
}

applyTheme(getPreference('theme', 'pearl'), { animate: false });
new AurenOrb($('openingOrb'), { signature: true });
todayOrbInstance = new AurenOrb($('todayOrb'), { calm: true });
bind();
renderLocale();
await loadData();
runOpening();
registerServiceWorker();
