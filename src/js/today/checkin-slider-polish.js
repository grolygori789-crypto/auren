const STYLE_ID = 'auren-checkin-slider-build-25';
const STYLE_HREF = './src/css/today-checkin.css';
const METRICS = ['sleep', 'energy', 'stress', 'mood', 'movement'];

const PALETTES = {
  positive: {
    low: [126, 202, 215],      // mineral blue
    mid: [208, 192, 160],      // champagne neutral
    high: [203, 173, 112],     // warm gold
  },
  stress: {
    low: [126, 202, 215],      // calm mineral
    mid: [210, 194, 165],      // champagne neutral
    high: [191, 108, 98],      // muted rose-red
  },
};

function installStylesheet() {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(STYLE_ID);
    if (existing) {
      if (existing.sheet) resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Check-in slider stylesheet failed')), { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error('Check-in slider stylesheet failed')), { once: true });
    document.head.appendChild(link);
  });
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function mixRgb(from, to, t) {
  return [lerp(from[0], to[0], t), lerp(from[1], to[1], t), lerp(from[2], to[2], t)];
}

function rgbToString(rgb, alpha = 1) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function brighten(rgb, factor = 0.34) {
  return mixRgb(rgb, [255, 255, 255], factor);
}

function paletteFor(metric) {
  return metric === 'stress' ? PALETTES.stress : PALETTES.positive;
}

function getFillColor(metric, normalized) {
  const palette = paletteFor(metric);
  if (normalized <= 0.5) {
    return mixRgb(palette.low, palette.mid, normalized / 0.5);
  }
  return mixRgb(palette.mid, palette.high, (normalized - 0.5) / 0.5);
}

function updateSliderVisual(input) {
  const min = Number(input.min || 1);
  const max = Number(input.max || 5);
  const value = Number(input.value || min);
  const normalized = max > min ? (value - min) / (max - min) : 0;
  const progress = `${Math.max(0, Math.min(100, normalized * 100))}%`;
  const metric = input.dataset.metric || 'sleep';
  const fillRgb = getFillColor(metric, normalized);
  const fillStart = brighten(fillRgb, 0.38);
  const focusRgb = brighten(fillRgb, 0.22);

  input.style.setProperty('--auren-slider-progress', progress);
  input.style.setProperty('--auren-slider-fill-start', rgbToString(fillStart, 0.96));
  input.style.setProperty('--auren-slider-fill-end', rgbToString(fillRgb, 0.98));
  input.style.setProperty('--auren-slider-focus', rgbToString(focusRgb, 0.92));
}

function bindSlider(input, metric) {
  if (!(input instanceof HTMLInputElement) || input.type !== 'range') return false;
  input.dataset.aurenCheckinSlider = '1';
  input.dataset.metric = metric;
  updateSliderVisual(input);
  if (input.dataset.aurenCheckinSliderBound === '1') return true;
  const handler = () => updateSliderVisual(input);
  input.addEventListener('input', handler);
  input.addEventListener('change', handler);
  input.dataset.aurenCheckinSliderBound = '1';
  return true;
}

function upgradeKnownSliders() {
  const form = document.getElementById('checkinForm');
  if (!(form instanceof HTMLElement)) return false;
  let count = 0;
  METRICS.forEach((metric) => {
    const input = document.getElementById(`checkin-${metric}`);
    if (bindSlider(input, metric)) count += 1;
  });
  if (count > 0) form.dataset.aurenCheckinSheet = '1';
  return count === METRICS.length;
}

function scheduleUpgrade() {
  queueMicrotask(() => {
    upgradeKnownSliders();
    requestAnimationFrame(() => {
      upgradeKnownSliders();
      requestAnimationFrame(() => upgradeKnownSliders());
    });
  });
}

async function init() {
  try {
    await installStylesheet();
  } catch (error) {
    console.error(error);
    return;
  }

  scheduleUpgrade();

  const bodyObserver = new MutationObserver((records) => {
    let shouldUpgrade = false;
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.id === 'checkinFields' || node.id === 'checkinForm' || node.querySelector?.('#checkinFields, #checkinForm, #checkin-sleep, #checkin-energy, #checkin-stress, #checkin-mood, #checkin-movement')) {
          shouldUpgrade = true;
        }
      });
    }
    if (shouldUpgrade) scheduleUpgrade();
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  const fields = document.getElementById('checkinFields');
  if (fields instanceof HTMLElement) {
    const fieldsObserver = new MutationObserver(() => scheduleUpgrade());
    fieldsObserver.observe(fields, { childList: true, subtree: true });
  }

  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('#checkinBtn, [data-action="checkin-open"]')) {
      setTimeout(scheduleUpgrade, 0);
      requestAnimationFrame(() => scheduleUpgrade());
    }
  }, true);

  document.addEventListener('auren:data-refreshed', scheduleUpgrade);

  const langObserver = new MutationObserver(() => scheduleUpgrade());
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}
