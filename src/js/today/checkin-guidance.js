import { getLocale } from '../i18n/i18n.js';

const STYLE_HREF = './src/css/today-checkin.css';
const METRICS = ['sleep', 'energy', 'stress', 'mood', 'movement'];

const COPY = {
  en: {
    infoLabel: 'How to rate these scales',
    title: 'How to rate today',
    intro: 'Choose what you actually noticed today—not what you think the number should be. These are observations, not health scores.',
    close: 'Got it',
    note: 'Higher is generally positive for Sleep, Energy and Mood. Higher Stress means more attention. Movement is descriptive—more is not automatically better.',
    metrics: {
      sleep: { name: 'Sleep', low: 'Unrestful', high: 'Restorative', detail: 'How restored you felt after sleep.' },
      energy: { name: 'Energy', low: 'Depleted', high: 'Energised', detail: 'How much usable energy you felt.' },
      stress: { name: 'Stress', low: 'Calm', high: 'Very stressed', detail: 'How tense or pressured you felt.' },
      mood: { name: 'Mood', low: 'Low', high: 'Very positive', detail: 'Your overall emotional tone today.' },
      movement: { name: 'Movement', low: 'Very little', high: 'Very active', detail: 'How physically active you were today.' },
    },
  },
  th: {
    infoLabel: 'ดูความหมายของแต่ละระดับ',
    title: 'ให้ค่าของวันนี้อย่างไร',
    intro: 'เลือกตามสิ่งที่คุณสังเกตจริงในวันนี้ ไม่ใช่ค่าที่คิดว่าควรจะเป็น ตัวเลขเหล่านี้คือสิ่งที่คุณรายงาน ไม่ใช่คะแนนสุขภาพ',
    close: 'เข้าใจแล้ว',
    note: 'ค่าสูงของการนอน พลังงาน และอารมณ์ โดยทั่วไปหมายถึงภาวะที่เป็นบวกกว่า ส่วนความเครียดสูงหมายถึงควรใส่ใจมากขึ้น การเคลื่อนไหวบอกปริมาณกิจกรรม ไม่ได้แปลว่ายิ่งมากยิ่งดีเสมอ',
    metrics: {
      sleep: { name: 'การนอน', low: 'ไม่สดชื่น', high: 'ฟื้นตัวดี', detail: 'หลังการนอน คุณรู้สึกว่าร่างกายได้พักและฟื้นตัวแค่ไหน' },
      energy: { name: 'พลังงาน', low: 'หมดแรง', high: 'มีพลัง', detail: 'พลังงานที่รู้สึกว่าพร้อมใช้ในวันนี้' },
      stress: { name: 'ความเครียด', low: 'สงบ', high: 'เครียดมาก', detail: 'ระดับความตึงเครียดหรือแรงกดดันที่คุณรู้สึก' },
      mood: { name: 'อารมณ์', low: 'ต่ำ', high: 'ดีมาก', detail: 'โทนอารมณ์โดยรวมของวันนี้' },
      movement: { name: 'การเคลื่อนไหว', low: 'น้อยมาก', high: 'เคลื่อนไหวมาก', detail: 'วันนี้ร่างกายได้เคลื่อนไหวมากน้อยแค่ไหน' },
    },
  },
};

let previousFocus = null;
let hideTimer = null;

function locale() {
  try { return getLocale() === 'th' ? 'th' : 'en'; }
  catch { return document.documentElement.lang?.toLowerCase().startsWith('th') ? 'th' : 'en'; }
}

function copy() { return COPY[locale()]; }

function ensureStylesheet() {
  const found = [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => {
    const href = link.getAttribute('href') || '';
    return href.endsWith('/src/css/today-checkin.css') || href === STYLE_HREF || href.endsWith('src/css/today-checkin.css');
  });
  if (found) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.id = 'auren-checkin-guidance-style-build-26';
  document.head.appendChild(link);
}

function updateEndpointLabels() {
  const c = copy();
  METRICS.forEach((metric) => {
    const input = document.getElementById(`checkin-${metric}`);
    const field = input?.closest?.('.checkin-field');
    const labels = field?.querySelectorAll?.('.range-labels span');
    if (!labels || labels.length < 2) return;
    labels[0].textContent = c.metrics[metric].low;
    labels[1].textContent = c.metrics[metric].high;
    labels[0].dataset.aurenScaleEdge = 'low';
    labels[1].dataset.aurenScaleEdge = metric === 'stress' ? 'attention' : 'high';
  });
}

function makeMetricRow(metric, item) {
  const row = document.createElement('div');
  row.className = `auren-checkin-guide-metric${metric === 'stress' ? ' is-stress' : ''}`;

  const head = document.createElement('div');
  head.className = 'auren-checkin-guide-metric-head';
  const name = document.createElement('strong');
  name.textContent = item.name;
  const detail = document.createElement('span');
  detail.textContent = item.detail;
  head.append(name, detail);

  const direction = document.createElement('div');
  direction.className = 'auren-checkin-guide-direction';
  const low = document.createElement('span');
  low.className = 'auren-checkin-guide-low';
  low.textContent = item.low;
  const rail = document.createElement('span');
  rail.className = 'auren-checkin-guide-rail';
  rail.setAttribute('aria-hidden', 'true');
  const high = document.createElement('span');
  high.className = 'auren-checkin-guide-high';
  high.textContent = item.high;
  direction.append(low, rail, high);

  row.append(head, direction);
  return row;
}

function ensureGuideLayer() {
  const modal = document.getElementById('checkinModal');
  if (!(modal instanceof HTMLElement)) return null;
  let layer = document.getElementById('aurenCheckinGuideLayer');
  if (layer) return layer;

  layer = document.createElement('div');
  layer.id = 'aurenCheckinGuideLayer';
  layer.className = 'auren-checkin-guide-layer';
  layer.hidden = true;
  layer.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('section');
  panel.className = 'auren-checkin-guide-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'aurenCheckinGuideTitle');

  const eyebrow = document.createElement('div');
  eyebrow.className = 'auren-checkin-guide-eyebrow';
  eyebrow.textContent = 'Auren · Daily Check-in';

  const title = document.createElement('h4');
  title.id = 'aurenCheckinGuideTitle';

  const intro = document.createElement('p');
  intro.className = 'auren-checkin-guide-intro';

  const list = document.createElement('div');
  list.className = 'auren-checkin-guide-list';
  list.id = 'aurenCheckinGuideList';

  const note = document.createElement('p');
  note.className = 'auren-checkin-guide-note';
  note.id = 'aurenCheckinGuideNote';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'auren-checkin-guide-close';
  close.id = 'aurenCheckinGuideClose';
  close.addEventListener('click', closeGuide);

  panel.append(eyebrow, title, intro, list, note, close);
  layer.appendChild(panel);
  layer.addEventListener('pointerdown', (event) => {
    if (event.target === layer) closeGuide();
  });
  modal.appendChild(layer);
  return layer;
}

function renderGuideCopy() {
  const c = copy();
  const layer = ensureGuideLayer();
  if (!layer) return;
  const title = document.getElementById('aurenCheckinGuideTitle');
  const intro = layer.querySelector('.auren-checkin-guide-intro');
  const list = document.getElementById('aurenCheckinGuideList');
  const note = document.getElementById('aurenCheckinGuideNote');
  const close = document.getElementById('aurenCheckinGuideClose');
  if (!title || !intro || !list || !note || !close) return;

  title.textContent = c.title;
  intro.textContent = c.intro;
  note.textContent = c.note;
  close.textContent = c.close;
  list.replaceChildren(...METRICS.map((metric) => makeMetricRow(metric, c.metrics[metric])));
}

function closeGuide() {
  const layer = document.getElementById('aurenCheckinGuideLayer');
  if (!layer || layer.hidden) return;
  layer.classList.remove('open');
  layer.setAttribute('aria-hidden', 'true');
  clearTimeout(hideTimer);
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  hideTimer = setTimeout(() => { layer.hidden = true; }, reduced ? 0 : 170);
  if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) previousFocus.focus({ preventScroll: true });
  previousFocus = null;
}

function openGuide() {
  const layer = ensureGuideLayer();
  if (!layer) return;
  renderGuideCopy();
  clearTimeout(hideTimer);
  previousFocus = document.activeElement;
  layer.hidden = false;
  layer.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    layer.classList.add('open');
    document.getElementById('aurenCheckinGuideClose')?.focus({ preventScroll: true });
  });
}

function ensureInfoControl() {
  const form = document.getElementById('checkinForm');
  const title = document.getElementById('checkinTitle');
  if (!(form instanceof HTMLElement) || !(title instanceof HTMLElement)) return;
  form.dataset.aurenCheckinGuide = '1';

  let row = form.querySelector('.auren-checkin-title-row');
  let button = document.getElementById('aurenCheckinInfoBtn');
  if (!row) {
    row = document.createElement('div');
    row.className = 'auren-checkin-title-row';
    title.parentNode?.insertBefore(row, title);
    row.appendChild(title);
  }
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.id = 'aurenCheckinInfoBtn';
    button.className = 'auren-checkin-info-btn';
    const glyph = document.createElement('span');
    glyph.setAttribute('aria-hidden', 'true');
    glyph.textContent = 'i';
    button.appendChild(glyph);
    button.addEventListener('click', openGuide);
    row.appendChild(button);
  }
  button.setAttribute('aria-label', copy().infoLabel);
  button.setAttribute('title', copy().infoLabel);
}

function refresh() {
  ensureInfoControl();
  ensureGuideLayer();
  renderGuideCopy();
  updateEndpointLabels();
}

function scheduleRefresh() {
  queueMicrotask(() => {
    refresh();
    requestAnimationFrame(() => refresh());
  });
}

function init() {
  ensureStylesheet();
  scheduleRefresh();

  const fields = document.getElementById('checkinFields');
  if (fields instanceof HTMLElement) {
    const observer = new MutationObserver(() => scheduleRefresh());
    observer.observe(fields, { childList: true, subtree: true });
  }

  const langObserver = new MutationObserver(() => scheduleRefresh());
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('#checkinBtn, #enBtn, #thBtn')) setTimeout(scheduleRefresh, 0);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeGuide();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}
