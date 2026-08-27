import { getCheckin } from '../storage/checkins.js';

const STYLE_ID = 'auren-today-metric-build-21';
const STYLE_HREF = './src/css/today-detail.css';
const METRICS = ['sleep', 'energy', 'stress', 'mood', 'movement'];

const COPY = {
  en: {
    observed: 'Observed',
    todayCheckin: "Today's check-in",
    close: 'Close',
    inputScale: 'Your input',
    howUsed: 'How Auren uses this',
    howUsedCopy: 'This is your self-reported observation. Auren uses it as one part of Daily State and only compares it with your own history when enough data exists.',
    limit: 'Observation, not a medical measurement.',
    open: 'Open detail',
    outOf: 'out of 5',
    metric: {
      sleep: 'Sleep',
      energy: 'Energy',
      stress: 'Stress',
      mood: 'Mood',
      movement: 'Movement',
    },
    level: {
      veryLow: 'Very low',
      low: 'Low',
      steady: 'Steady',
      high: 'High',
      excellent: 'Excellent',
      calm: 'Calm',
      light: 'Light',
      moderate: 'Moderate',
      highStress: 'High',
      veryHighStress: 'Very high',
    },
    meaning: {
      sleep: [
        '',
        'You recorded sleep at the lowest end of your scale today.',
        'You recorded sleep on the lower side today.',
        'You recorded sleep around the middle of your scale today.',
        'You recorded sleep on the higher side today.',
        'You recorded sleep at the highest end of your scale today.',
      ],
      energy: [
        '',
        'You recorded energy at the lowest end of your scale today.',
        'You recorded energy on the lower side today.',
        'You recorded energy around the middle of your scale today.',
        'You recorded energy on the higher side today.',
        'You recorded energy at the highest end of your scale today.',
      ],
      stress: [
        '',
        'You recorded very little stress today.',
        'You recorded light stress today.',
        'You recorded moderate stress today.',
        'You recorded high stress today. Auren treats higher stress as attention, not a positive score.',
        'You recorded very high stress today. Auren treats higher stress as attention, not a positive score.',
      ],
      mood: [
        '',
        'You recorded mood at the lowest end of your scale today.',
        'You recorded mood on the lower side today.',
        'You recorded mood around the middle of your scale today.',
        'You recorded mood on the higher side today.',
        'You recorded mood at the highest end of your scale today.',
      ],
      movement: [
        '',
        'You recorded movement at the lowest end of your scale today.',
        'You recorded movement on the lower side today.',
        'You recorded movement around the middle of your scale today.',
        'You recorded movement on the higher side today.',
        'You recorded movement at the highest end of your scale today.',
      ],
    },
  },
  th: {
    observed: 'ข้อมูลที่บันทึก',
    todayCheckin: 'เช็กอินวันนี้',
    close: 'ปิด',
    inputScale: 'ค่าที่คุณบันทึก',
    howUsed: 'Auren ใช้ค่านี้อย่างไร',
    howUsedCopy: 'ค่านี้เป็นสิ่งที่คุณรายงานเอง Auren ใช้เป็นหนึ่งในองค์ประกอบของภาวะวันนี้ และจะเปรียบเทียบกับประวัติของคุณเองเมื่อมีข้อมูลมากพอเท่านั้น',
    limit: 'ข้อมูลที่คุณรายงานเอง ไม่ใช่การวัดทางการแพทย์',
    open: 'เปิดรายละเอียด',
    outOf: 'จาก 5',
    metric: {
      sleep: 'การนอน',
      energy: 'พลังงาน',
      stress: 'ความเครียด',
      mood: 'อารมณ์',
      movement: 'การเคลื่อนไหว',
    },
    level: {
      veryLow: 'ต่ำมาก',
      low: 'ต่ำ',
      steady: 'ปานกลาง',
      high: 'สูง',
      excellent: 'ดีเยี่ยม',
      calm: 'สงบ',
      light: 'เล็กน้อย',
      moderate: 'ปานกลาง',
      highStress: 'สูง',
      veryHighStress: 'สูงมาก',
    },
    meaning: {
      sleep: [
        '',
        'วันนี้คุณบันทึกการนอนอยู่ที่ระดับต่ำมากในสเกลของคุณ',
        'วันนี้คุณบันทึกการนอนอยู่ทางด้านต่ำของสเกล',
        'วันนี้คุณบันทึกการนอนอยู่ใกล้กึ่งกลางของสเกล',
        'วันนี้คุณบันทึกการนอนอยู่ทางด้านสูงของสเกล',
        'วันนี้คุณบันทึกการนอนอยู่ที่ระดับสูงสุดของสเกล',
      ],
      energy: [
        '',
        'วันนี้คุณบันทึกพลังงานอยู่ที่ระดับต่ำมากในสเกลของคุณ',
        'วันนี้คุณบันทึกพลังงานอยู่ทางด้านต่ำของสเกล',
        'วันนี้คุณบันทึกพลังงานอยู่ใกล้กึ่งกลางของสเกล',
        'วันนี้คุณบันทึกพลังงานอยู่ทางด้านสูงของสเกล',
        'วันนี้คุณบันทึกพลังงานอยู่ที่ระดับสูงสุดของสเกล',
      ],
      stress: [
        '',
        'วันนี้คุณบันทึกความเครียดไว้ในระดับน้อยมาก',
        'วันนี้คุณบันทึกความเครียดไว้ในระดับเล็กน้อย',
        'วันนี้คุณบันทึกความเครียดไว้ในระดับปานกลาง',
        'วันนี้คุณบันทึกความเครียดไว้ในระดับสูง Auren อ่านค่าความเครียดที่สูงเป็นจุดที่ควรใส่ใจ ไม่ใช่คะแนนเชิงบวก',
        'วันนี้คุณบันทึกความเครียดไว้ในระดับสูงมาก Auren อ่านค่าความเครียดที่สูงเป็นจุดที่ควรใส่ใจ ไม่ใช่คะแนนเชิงบวก',
      ],
      mood: [
        '',
        'วันนี้คุณบันทึกอารมณ์อยู่ที่ระดับต่ำมากในสเกลของคุณ',
        'วันนี้คุณบันทึกอารมณ์อยู่ทางด้านต่ำของสเกล',
        'วันนี้คุณบันทึกอารมณ์อยู่ใกล้กึ่งกลางของสเกล',
        'วันนี้คุณบันทึกอารมณ์อยู่ทางด้านสูงของสเกล',
        'วันนี้คุณบันทึกอารมณ์อยู่ที่ระดับสูงสุดของสเกล',
      ],
      movement: [
        '',
        'วันนี้คุณบันทึกการเคลื่อนไหวอยู่ที่ระดับต่ำมากในสเกลของคุณ',
        'วันนี้คุณบันทึกการเคลื่อนไหวอยู่ทางด้านต่ำของสเกล',
        'วันนี้คุณบันทึกการเคลื่อนไหวอยู่ใกล้กึ่งกลางของสเกล',
        'วันนี้คุณบันทึกการเคลื่อนไหวอยู่ทางด้านสูงของสเกล',
        'วันนี้คุณบันทึกการเคลื่อนไหวอยู่ที่ระดับสูงสุดของสเกล',
      ],
    },
  },
};

function currentLocale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function copyFor(locale = currentLocale()) {
  return COPY[locale === 'th' ? 'th' : 'en'];
}

function clampObservation(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  const rounded = Math.round(number);
  return rounded >= 1 && rounded <= 5 ? rounded : null;
}

export function metricState(metric, value, locale = 'en') {
  const key = METRICS.includes(metric) ? metric : null;
  const v = clampObservation(value);
  if (!key || v === null) return null;
  let levelKey = 'steady';
  let tone = 'neutral';
  if (key === 'stress') {
    if (v === 1) { levelKey = 'calm'; tone = 'positive'; }
    else if (v === 2) { levelKey = 'light'; tone = 'positive'; }
    else if (v === 3) { levelKey = 'moderate'; tone = 'neutral'; }
    else if (v === 4) { levelKey = 'highStress'; tone = 'attention'; }
    else { levelKey = 'veryHighStress'; tone = 'attention'; }
  } else if (v === 1) { levelKey = 'veryLow'; tone = 'attention'; }
  else if (v === 2) { levelKey = 'low'; tone = 'attention'; }
  else if (v === 3) { levelKey = 'steady'; tone = 'neutral'; }
  else if (v === 4) { levelKey = 'high'; tone = 'positive'; }
  else { levelKey = 'excellent'; tone = 'positive'; }

  const copy = copyFor(locale);
  return {
    metric: key,
    value: v,
    tone,
    levelKey,
    metricLabel: copy.metric[key],
    levelLabel: copy.level[levelKey],
    meaning: copy.meaning[key][v],
  };
}

function iconSvg(metric) {
  const icons = {
    sleep: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.8 4.5a6.9 6.9 0 1 0 4.7 12.1A7.6 7.6 0 0 1 14.8 4.5z"/></svg>',
    energy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3L7 13h4l-1 8 7-11h-4l0-7z"/></svg>',
    stress: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8.2c1.4-1 2.8-1 4.2 0s2.8 1 4.2 0 2.8-1 4.2 0"/><path d="M6 15.8c1.4-1 2.8-1 4.2 0s2.8 1 4.2 0 2.8-1 4.2 0"/></svg>',
    mood: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.2"/><path d="M9.4 14.2c.9 1 1.8 1.4 2.6 1.4s1.7-.4 2.6-1.4"/><path d="M9.6 10.2h.01"/><path d="M14.4 10.2h.01"/></svg>',
    movement: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15.2c2.2-3.8 4.8-5.7 7.6-5.7 1.8 0 3.6.8 5.4 2.3"/><path d="M7.2 18.3c2-2.4 3.8-3.6 5.6-3.6 1.1 0 2.2.4 3.5 1.3"/></svg>',
  };
  return icons[metric] || '';
}

function installStylesheet() {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(STYLE_ID);
    if (existing) {
      if (existing.sheet) resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Today detail stylesheet failed')), { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.dataset.aurenTodayDetail = 'build-21';
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error('Today detail stylesheet failed')), { once: true });
    document.head.appendChild(link);
  });
}

let modal = null;
let activeMetric = null;
let activeRecord = null;
let lastTrigger = null;
let gridObserver = null;
let languageObserver = null;
let focusTimer = 0;

function findMetric(card) {
  if (!card) return null;
  const existing = card.dataset.metricDetail;
  if (METRICS.includes(existing)) return existing;
  return METRICS.find((metric) => card.classList.contains(`observed-${metric}`)) || null;
}

function valueFromCard(card) {
  const text = card?.querySelector('em')?.textContent || '';
  const match = String(text).match(/([1-5])\s*\/\s*5/);
  return match ? Number(match[1]) : null;
}

function enhanceCards() {
  const grid = document.getElementById('observedGrid');
  if (!grid) return;
  grid.dataset.metricDetails = '1';
  grid.querySelectorAll('.observed-item').forEach((card) => {
    const metric = findMetric(card);
    if (!metric) return;
    const copy = copyFor();
    const value = valueFromCard(card);
    const state = metricState(metric, value, currentLocale());
    card.dataset.metricDetail = metric;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-controls', 'todayMetricDetailModal');
    card.setAttribute('aria-expanded', 'false');
    if (state) {
      card.setAttribute('aria-label', `${state.metricLabel}: ${state.levelLabel}, ${state.value} ${copy.outOf}. ${copy.open}`);
    }
  });
}

function createModal() {
  if (document.getElementById('todayMetricDetailModal')) {
    modal = document.getElementById('todayMetricDetailModal');
    return;
  }
  modal = document.createElement('div');
  modal.id = 'todayMetricDetailModal';
  modal.className = 'today-metric-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'todayMetricTitle');
  modal.innerHTML = `
    <div class="today-metric-sheet" role="document">
      <div class="today-metric-handle" aria-hidden="true"></div>
      <div class="today-metric-top">
        <div class="today-metric-icon" id="todayMetricIcon" aria-hidden="true"></div>
        <div class="today-metric-heading">
          <div class="today-metric-provenance"><span id="todayMetricObserved"></span><i></i><span id="todayMetricSource"></span></div>
          <h2 id="todayMetricTitle"></h2>
          <div class="today-metric-level" id="todayMetricLevel"></div>
        </div>
        <button class="today-metric-close" id="todayMetricClose" type="button" aria-label="Close">×</button>
      </div>
      <div class="today-metric-value-row">
        <div class="today-metric-value"><strong id="todayMetricValue"></strong><span>/ 5</span></div>
        <div class="today-metric-scale-block">
          <span id="todayMetricScaleLabel"></span>
          <div class="today-metric-scale" id="todayMetricScale" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i><b></b>
          </div>
          <div class="today-metric-scale-ends" aria-hidden="true"><span>1</span><span>5</span></div>
        </div>
      </div>
      <div class="today-metric-meaning" id="todayMetricMeaning"></div>
      <div class="today-metric-use">
        <strong id="todayMetricUseTitle"></strong>
        <p id="todayMetricUseCopy"></p>
      </div>
      <div class="today-metric-limit" id="todayMetricLimit"></div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('pointerdown', (event) => {
    if (event.target === modal) closeMetricDetail();
  });
  document.getElementById('todayMetricClose')?.addEventListener('click', closeMetricDetail);
}

function renderModal(metric, record = activeRecord) {
  const value = clampObservation(record?.observations?.[metric]);
  const state = metricState(metric, value, currentLocale());
  if (!state || !modal) return false;
  const copy = copyFor();
  modal.dataset.metric = metric;
  modal.dataset.tone = state.tone;
  document.getElementById('todayMetricIcon').innerHTML = iconSvg(metric);
  document.getElementById('todayMetricObserved').textContent = copy.observed;
  document.getElementById('todayMetricSource').textContent = copy.todayCheckin;
  document.getElementById('todayMetricTitle').textContent = state.metricLabel;
  document.getElementById('todayMetricLevel').textContent = state.levelLabel;
  document.getElementById('todayMetricValue').textContent = String(state.value);
  document.getElementById('todayMetricScaleLabel').textContent = copy.inputScale;
  document.getElementById('todayMetricMeaning').textContent = state.meaning;
  document.getElementById('todayMetricUseTitle').textContent = copy.howUsed;
  document.getElementById('todayMetricUseCopy').textContent = copy.howUsedCopy;
  document.getElementById('todayMetricLimit').textContent = copy.limit;
  const close = document.getElementById('todayMetricClose');
  close?.setAttribute('aria-label', copy.close);
  const scale = document.getElementById('todayMetricScale');
  if (scale) scale.style.setProperty('--metric-position', `${((state.value - 1) / 4) * 100}%`);
  return true;
}

async function openMetricDetail(metric, trigger) {
  if (!METRICS.includes(metric)) return;
  let record = null;
  try { record = await getCheckin(); } catch { record = null; }
  if (!record?.observations || clampObservation(record.observations[metric]) === null) return;
  createModal();
  activeMetric = metric;
  activeRecord = record;
  lastTrigger = trigger || null;
  if (!renderModal(metric, record)) return;

  document.querySelectorAll('#observedGrid .observed-item[aria-expanded="true"]').forEach((card) => card.setAttribute('aria-expanded', 'false'));
  trigger?.setAttribute?.('aria-expanded', 'true');
  document.documentElement.classList.add('today-metric-open');
  modal.classList.add('open');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    trigger?.animate?.([
      { transform: 'scale(1)', filter: 'brightness(1)' },
      { transform: 'scale(.972)', filter: 'brightness(1.025)' },
      { transform: 'scale(1)', filter: 'brightness(1)' },
    ], { duration: 260, easing: 'cubic-bezier(.2,.72,.2,1)' });
    document.getElementById('todayMetricValue')?.animate?.([
      { opacity: .25, transform: 'translateY(5px) scale(.97)', filter: 'blur(2px)' },
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
    ], { duration: 360, easing: 'cubic-bezier(.18,.78,.18,1)' });
    document.getElementById('todayMetricLevel')?.animate?.([
      { opacity: .3, transform: 'translateY(3px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 300, delay: 45, easing: 'ease-out', fill: 'both' });
  }

  window.clearTimeout(focusTimer);
  focusTimer = window.setTimeout(() => {
    if (modal?.classList.contains('open')) document.getElementById('todayMetricClose')?.focus({ preventScroll: true });
  }, reduced ? 0 : 170);
}

function closeMetricDetail() {
  if (!modal?.classList.contains('open')) return;
  window.clearTimeout(focusTimer);
  focusTimer = 0;
  modal.classList.remove('open');
  document.documentElement.classList.remove('today-metric-open');
  lastTrigger?.setAttribute?.('aria-expanded', 'false');
  const focusTarget = lastTrigger;
  activeMetric = null;
  activeRecord = null;
  lastTrigger = null;
  window.setTimeout(() => focusTarget?.isConnected && focusTarget.focus({ preventScroll: true }), 40);
}

function bindInteractions() {
  document.addEventListener('click', (event) => {
    const card = event.target?.closest?.('#observedGrid .observed-item[data-metric-detail]');
    if (!card) return;
    openMetricDetail(card.dataset.metricDetail, card);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMetricDetail();
      return;
    }
    const card = event.target?.closest?.('#observedGrid .observed-item[data-metric-detail]');
    if (!card || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    openMetricDetail(card.dataset.metricDetail, card);
  });
}

function observeGrid() {
  const grid = document.getElementById('observedGrid');
  if (!grid || !('MutationObserver' in window)) return;
  gridObserver = new MutationObserver(() => enhanceCards());
  gridObserver.observe(grid, { childList: true, subtree: true });
}

function observeLanguage() {
  if (!('MutationObserver' in window)) return;
  languageObserver = new MutationObserver((mutations) => {
    if (!mutations.some((mutation) => mutation.attributeName === 'lang')) return;
    enhanceCards();
    if (activeMetric && activeRecord) renderModal(activeMetric, activeRecord);
  });
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

async function setup() {
  await installStylesheet();
  createModal();
  enhanceCards();
  bindInteractions();
  observeGrid();
  observeLanguage();
  document.addEventListener('auren:data-refreshed', () => {
    closeMetricDetail();
    window.setTimeout(enhanceCards, 0);
  });
}

if (typeof document !== 'undefined') {
  try {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setup().catch(() => {}), { once: true });
    else setup().catch(() => {});
  } catch {
    // Fail open: Build 20 Today remains fully usable if this optional enhancement cannot initialize.
  }
}
