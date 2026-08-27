const STYLE_ID = 'auren-checkin-slider-build-22';
const STYLE_HREF = './src/css/today-checkin.css';
const METRIC_ORDER = ['sleep', 'energy', 'stress', 'mood', 'movement'];

const METRIC_PATTERNS = {
  sleep: /\bsleep\b|การนอน/i,
  energy: /\benergy\b|พลังงาน/i,
  stress: /\bstress\b|ความเครียด/i,
  mood: /\bmood\b|อารมณ์/i,
  movement: /\bmovement\b|การเคลื่อนไหว/i,
};

const PALETTES = {
  default: {
    low: 'rgba(169,207,202,.56)',
    lowSoft: 'rgba(223,236,234,.78)',
    mid: 'rgba(250,247,242,.97)',
    highSoft: 'rgba(238,224,208,.80)',
    high: 'rgba(200,170,121,.58)',
    thumbLow: 'color-mix(in srgb,var(--aqua) 58%,var(--gold-deep))',
    thumbMid: 'color-mix(in srgb,var(--gold) 82%,white)',
    thumbHigh: 'color-mix(in srgb,var(--gold-deep) 84%,white)',
    focus: 'color-mix(in srgb,var(--gold) 18%,white)',
  },
  stress: {
    low: 'rgba(167,207,203,.58)',
    lowSoft: 'rgba(229,238,236,.80)',
    mid: 'rgba(251,247,242,.97)',
    highSoft: 'rgba(235,220,216,.82)',
    high: 'rgba(182,126,110,.58)',
    thumbLow: 'color-mix(in srgb,var(--aqua) 62%,var(--gold-deep))',
    thumbMid: 'color-mix(in srgb,var(--gold) 80%,white)',
    thumbHigh: 'color-mix(in srgb,#b67e6e 76%,var(--gold-deep))',
    focus: 'color-mix(in srgb,#b67e6e 20%,white)',
  },
};

function installStylesheet() {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(STYLE_ID);
    if (existing) {
      if (existing.sheet) resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Build 22 stylesheet failed')), { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error('Build 22 stylesheet failed')), { once: true });
    document.head.appendChild(link);
  });
}

function inferMetric(input, fallbackIndex = 0) {
  const direct = [
    input.dataset.metric,
    input.getAttribute('name'),
    input.getAttribute('id'),
    input.getAttribute('aria-label'),
  ].filter(Boolean).join(' ');

  for (const [metric, pattern] of Object.entries(METRIC_PATTERNS)) {
    if (pattern.test(direct)) return metric;
  }

  const contextNodes = [
    input.closest('[data-metric]'),
    input.closest('label'),
    input.closest('li'),
    input.closest('section'),
    input.parentElement,
    input.parentElement?.parentElement,
  ].filter(Boolean);

  for (const node of contextNodes) {
    const text = (node.textContent || '').slice(0, 240);
    for (const [metric, pattern] of Object.entries(METRIC_PATTERNS)) {
      if (pattern.test(text)) return metric;
    }
  }

  return METRIC_ORDER[fallbackIndex] || 'sleep';
}

function paletteFor(metric) {
  return metric === 'stress' ? PALETTES.stress : PALETTES.default;
}

function positionPercent(input) {
  const min = Number(input.min || 1);
  const max = Number(input.max || 5);
  const value = Number(input.value || min);
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 50;
  const pct = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, pct));
}

function thumbColor(metric, value, min, max) {
  const palette = paletteFor(metric);
  const normalized = max > min ? (value - min) / (max - min) : .5;
  if (metric === 'stress') {
    if (normalized >= .75) return palette.thumbHigh;
    if (normalized <= .25) return palette.thumbLow;
    return palette.thumbMid;
  }
  if (normalized >= .75) return palette.thumbHigh;
  if (normalized <= .25) return palette.thumbLow;
  return palette.thumbMid;
}

function applyPalette(input, metric) {
  const palette = paletteFor(metric);
  const min = Number(input.min || 1);
  const max = Number(input.max || 5);
  const value = Number(input.value || min);
  const progress = positionPercent(input);

  input.style.setProperty('--auren-slider-track',
    `linear-gradient(90deg, ${palette.low} 0%, ${palette.lowSoft} 42%, ${palette.mid} 50%, ${palette.highSoft} 58%, ${palette.high} 100%)`);
  input.style.setProperty('--auren-slider-thumb-core', thumbColor(metric, value, min, max));
  input.style.setProperty('--auren-slider-thumb-rim', 'color-mix(in srgb,var(--gold) 74%,white)');
  input.style.setProperty('--auren-slider-focus', palette.focus);
  input.style.setProperty('--auren-slider-progress', `${progress}%`);
}

function ensureWrap(input, metric) {
  const parent = input.parentElement;
  if (parent && !parent.hasAttribute('data-auren-checkin-slider-wrap')) {
    // Wrap only when the input is a direct child and a wrapper won't disrupt an existing known structure badly.
    // If wrapping fails, the visual polish still works without the center guide.
    try {
      const wrap = document.createElement('div');
      wrap.setAttribute('data-auren-checkin-slider-wrap', '1');
      wrap.setAttribute('data-auren-slider-tone', metric);
      parent.insertBefore(wrap, input);
      wrap.appendChild(input);
      return wrap;
    } catch {
      parent.setAttribute('data-auren-slider-tone', metric);
      return parent;
    }
  }
  if (parent) parent.setAttribute('data-auren-slider-tone', metric);
  return parent;
}

function upgradeSlider(input, index) {
  if (!(input instanceof HTMLInputElement) || input.type !== 'range') return;
  const metric = inferMetric(input, index);
  const container = ensureWrap(input, metric);
  input.dataset.aurenCheckinSlider = '1';
  input.dataset.metric = metric;
  input.setAttribute('data-auren-checkin-slider', '1');
  if (container) container.setAttribute('data-auren-slider-tone', metric);
  applyPalette(input, metric);
  if (!input.dataset.aurenCheckinBound) {
    input.addEventListener('input', () => applyPalette(input, metric));
    input.addEventListener('change', () => applyPalette(input, metric));
    input.dataset.aurenCheckinBound = '1';
  }
}

function isLikelyCheckinSheet(node) {
  if (!(node instanceof HTMLElement)) return false;
  const ranges = node.querySelectorAll('input[type="range"]');
  if (ranges.length < 5) return false;
  const text = (node.textContent || '').toLowerCase();
  if (text.includes('sleep') && text.includes('energy') && text.includes('stress')) return true;
  if (text.includes('การนอน') && text.includes('พลังงาน') && text.includes('ความเครียด')) return true;
  return false;
}

function upgradeSheet(sheet) {
  if (!(sheet instanceof HTMLElement)) return;
  sheet.setAttribute('data-auren-checkin-sheet', '1');
  const sliders = Array.from(sheet.querySelectorAll('input[type="range"]')).slice(0, 5);
  sliders.forEach((input, index) => upgradeSlider(input, index));
}

function scan(root = document) {
  const candidates = new Set();
  if (root instanceof HTMLElement && isLikelyCheckinSheet(root)) candidates.add(root);
  root.querySelectorAll?.('form, dialog, [role="dialog"], section, div').forEach((node) => {
    if (isLikelyCheckinSheet(node)) candidates.add(node);
  });
  candidates.forEach(upgradeSheet);
}

async function init() {
  try {
    await installStylesheet();
  } catch (error) {
    console.error(error);
    return;
  }
  scan(document);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (isLikelyCheckinSheet(node)) upgradeSheet(node);
        scan(node);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}
