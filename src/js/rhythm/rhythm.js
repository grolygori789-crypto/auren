import { getAllCheckins } from '../storage/checkins.js';

const STYLE_ID = 'auren-rhythm-build-17';
const STYLE_HREF = './src/css/rhythm.css';
const SCREEN_SELECTOR = '[data-screen="rhythm"]';
const METRICS = ['sleep', 'energy', 'stress', 'mood', 'movement'];

const COPY = {
  en: {
    eyebrow: 'Personal Pattern Intelligence',
    title: 'Rhythm',
    sub: 'See the shape of your recent days before Auren turns change into a signal.',
    range: 'Window',
    days: 'days',
    heroEyebrow: 'Your living rhythm',
    learningTitle: 'Auren is still learning your rhythm',
    learningCopy: 'A few more check-ins will make comparison more meaningful. The ribbon can already reflect what you recorded without pretending it is a conclusion.',
    formingTitle: 'Your rhythm is beginning to take shape',
    formingCopy: 'There is enough continuity to describe the recent shape, but not enough to push a strong trend claim yet.',
    steadyTitle: 'Your recent rhythm is relatively steady',
    steadyCopy: 'The earlier and later parts of this window are broadly similar across the observations you recorded.',
    variedTitle: 'Your recent rhythm is still changing',
    variedCopy: 'The shape is moving around enough that Auren is keeping the interpretation deliberately light for now.',
    metricUp: {
      sleep: 'Sleep has been stronger lately',
      energy: 'Energy has been stronger lately',
      stress: 'Stress has been higher lately',
      mood: 'Mood has been higher lately',
      movement: 'Movement has been higher lately',
    },
    metricDown: {
      sleep: 'Sleep has been lower lately',
      energy: 'Energy has been lower lately',
      stress: 'Stress has been lower lately',
      mood: 'Mood has been lower lately',
      movement: 'Movement has been lower lately',
    },
    metricTrendCopy: 'Auren is comparing the earlier and later portions of this window. This is a descriptive pattern in your own check-ins, not a medical conclusion.',
    why: 'Why this?',
    observed: 'Observed',
    calculated: 'Calculated',
    inferred: 'Inferred',
    continuity: 'Continuity',
    baseline: 'Personal baseline',
    baselineSub: 'Typical level in this selected window',
    continuitySub: 'How much real history supports this view',
    checkins: 'check-ins',
    of: 'of',
    recordedDays: 'days recorded',
    confidence: 'Confidence',
    confidenceValues: { limited: 'Limited', low: 'Low', moderate: 'Moderate', high: 'High' },
    evidenceTitle: 'How Auren reads this rhythm',
    evidenceIntro: 'The visual is intentionally expressive, but every interpretation stays tied to data you actually recorded.',
    evidenceObservedTitle: 'Observed',
    evidenceObserved: 'Sleep, energy, stress, mood and movement come directly from your daily 1–5 check-ins.',
    evidenceCalculatedTitle: 'Calculated',
    evidenceCalculated: 'The ribbon shape combines the five observations for each recorded day. Stress is reversed only for the visual direction of the ribbon. The shape is not a health score and no composite score is stored.',
    evidenceInferredTitle: 'Inferred',
    evidenceInferred: 'With enough observations, Auren compares the earlier and later portions of the selected window and describes only changes large enough to stand out from ordinary variation.',
    evidenceLimitTitle: 'Limit',
    evidenceLimit: 'This is descriptive personal-pattern context. It does not prove cause and effect, diagnose health, or replace medical assessment.',
    close: 'Close',
    tapHint: 'Tap the ribbon to inspect a recorded day',
    dayObserved: 'Observed day',
    noDataTitle: 'Your rhythm needs a little more time',
    noDataCopy: 'Complete daily check-ins and Auren will begin building this view from your own history.',
    level: {
      low: 'Low', steady: 'Steady', high: 'High', strong: 'Strong',
      calm: 'Calm', light: 'Light', moderate: 'Moderate', elevated: 'High'
    },
    metric: { sleep: 'Sleep', energy: 'Energy', stress: 'Stress', mood: 'Mood', movement: 'Movement' },
    screenReader: 'Interactive rhythm visualization based on recorded daily check-ins. Use left and right arrow keys to inspect recorded days.',
  },
  th: {
    eyebrow: 'ความเข้าใจรูปแบบส่วนตัว',
    title: 'จังหวะ',
    sub: 'มองเห็นรูปทรงของวันช่วงล่าสุด ก่อนที่ Auren จะตีความการเปลี่ยนแปลงเป็นสัญญาณ',
    range: 'ช่วงเวลา',
    days: 'วัน',
    heroEyebrow: 'จังหวะที่มีชีวิตของคุณ',
    learningTitle: 'Auren ยังเรียนรู้จังหวะของคุณอยู่',
    learningCopy: 'เช็กอินเพิ่มอีกเล็กน้อยจะช่วยให้การเปรียบเทียบมีความหมายขึ้น ตอนนี้ Ribbon แสดงสิ่งที่คุณบันทึกได้แล้วโดยไม่รีบสรุปเกินข้อมูล',
    formingTitle: 'จังหวะของคุณเริ่มเป็นรูปเป็นร่าง',
    formingCopy: 'มีความต่อเนื่องพอให้เห็นรูปทรงช่วงล่าสุด แต่ยังไม่มากพอสำหรับการยืนยันแนวโน้มแบบหนักแน่น',
    steadyTitle: 'จังหวะช่วงหลังค่อนข้างสม่ำเสมอ',
    steadyCopy: 'ช่วงต้นและช่วงท้ายของกรอบเวลานี้ใกล้เคียงกันพอสมควรจากข้อมูลที่คุณบันทึกไว้',
    variedTitle: 'จังหวะช่วงหลังยังเปลี่ยนอยู่',
    variedCopy: 'รูปแบบยังแกว่งอยู่พอสมควร Auren จึงตั้งใจตีความอย่างเบาและเก็บความไม่แน่นอนไว้ให้เห็น',
    metricUp: {
      sleep: 'การนอนช่วงหลังอยู่ในระดับสูงขึ้น',
      energy: 'พลังงานช่วงหลังอยู่ในระดับสูงขึ้น',
      stress: 'ความเครียดช่วงหลังอยู่ในระดับสูงขึ้น',
      mood: 'อารมณ์ช่วงหลังอยู่ในระดับสูงขึ้น',
      movement: 'การเคลื่อนไหวช่วงหลังอยู่ในระดับสูงขึ้น',
    },
    metricDown: {
      sleep: 'การนอนช่วงหลังอยู่ในระดับต่ำลง',
      energy: 'พลังงานช่วงหลังอยู่ในระดับต่ำลง',
      stress: 'ความเครียดช่วงหลังอยู่ในระดับต่ำลง',
      mood: 'อารมณ์ช่วงหลังอยู่ในระดับต่ำลง',
      movement: 'การเคลื่อนไหวช่วงหลังอยู่ในระดับต่ำลง',
    },
    metricTrendCopy: 'Auren เปรียบเทียบช่วงต้นกับช่วงท้ายของกรอบเวลานี้ เป็นเพียงรูปแบบเชิงพรรณนาจากเช็กอินของคุณเอง ไม่ใช่ข้อสรุปทางการแพทย์',
    why: 'ทำไมถึงเป็นแบบนี้?',
    observed: 'ข้อมูลที่บันทึก',
    calculated: 'คำนวณ',
    inferred: 'ตีความ',
    continuity: 'ความต่อเนื่อง',
    baseline: 'ค่าพื้นฐานส่วนตัว',
    baselineSub: 'ระดับที่พบโดยทั่วไปในช่วงเวลาที่เลือก',
    continuitySub: 'ประวัติจริงที่รองรับมุมมองนี้มากน้อยเพียงใด',
    checkins: 'เช็กอิน',
    of: 'จาก',
    recordedDays: 'วันที่มีข้อมูล',
    confidence: 'ความมั่นใจ',
    confidenceValues: { limited: 'จำกัด', low: 'ต่ำ', moderate: 'ปานกลาง', high: 'สูง' },
    evidenceTitle: 'Auren อ่านจังหวะนี้อย่างไร',
    evidenceIntro: 'ภาพถูกออกแบบให้มีชีวิต แต่การตีความทุกส่วนยังผูกกับข้อมูลที่คุณบันทึกจริง',
    evidenceObservedTitle: 'ข้อมูลที่บันทึก',
    evidenceObserved: 'การนอน พลังงาน ความเครียด อารมณ์ และการเคลื่อนไหว มาจากเช็กอิน 1–5 ของคุณโดยตรง',
    evidenceCalculatedTitle: 'คำนวณ',
    evidenceCalculated: 'รูปทรงของ Ribbon รวมข้อมูลทั้งห้าด้านในแต่ละวันที่มีเช็กอิน โดยกลับทิศของความเครียดเฉพาะตอนวาดรูปทรงเท่านั้น ภาพนี้ไม่ใช่คะแนนสุขภาพ และไม่มีการเก็บคะแนนรวมไว้',
    evidenceInferredTitle: 'ตีความ',
    evidenceInferred: 'เมื่อมีข้อมูลพอ Auren จะเปรียบเทียบช่วงต้นกับช่วงท้ายของกรอบเวลา และพูดถึงเฉพาะการเปลี่ยนแปลงที่เด่นพอเหนือความแปรผันตามปกติ',
    evidenceLimitTitle: 'ข้อจำกัด',
    evidenceLimit: 'นี่คือบริบทของรูปแบบส่วนตัวเชิงพรรณนา ไม่ได้พิสูจน์เหตุและผล ไม่ใช่การวินิจฉัย และไม่แทนการประเมินทางการแพทย์',
    close: 'ปิด',
    tapHint: 'แตะ Ribbon เพื่อดูวันที่บันทึกไว้',
    dayObserved: 'ข้อมูลของวันนั้น',
    noDataTitle: 'จังหวะของคุณต้องใช้เวลาอีกเล็กน้อย',
    noDataCopy: 'บันทึกเช็กอินในแต่ละวัน แล้ว Auren จะค่อยๆ สร้างมุมมองนี้จากประวัติของคุณเอง',
    level: {
      low: 'ต่ำ', steady: 'ปานกลาง', high: 'สูง', strong: 'สูงมาก',
      calm: 'สงบ', light: 'เล็กน้อย', moderate: 'ปานกลาง', elevated: 'สูง'
    },
    metric: { sleep: 'การนอน', energy: 'พลังงาน', stress: 'ความเครียด', mood: 'อารมณ์', movement: 'การเคลื่อนไหว' },
    screenReader: 'ภาพจังหวะเชิงโต้ตอบจากข้อมูลเช็กอินรายวัน ใช้ปุ่มลูกศรซ้ายและขวาเพื่อดูวันที่บันทึกไว้',
  },
};

function currentLocale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function c() {
  return COPY[currentLocale()];
}

function utcDay(localDate) {
  const [y, m, d] = String(localDate || '').split('-').map(Number);
  if (!y || !m || !d) return NaN;
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function average(values) {
  const finite = values.map(Number).filter(Number.isFinite);
  return finite.length ? finite.reduce((sum, value) => sum + value, 0) / finite.length : 0;
}

function compositeFor(record) {
  const o = record?.observations || {};
  return average([o.sleep, o.energy, 6 - Number(o.stress), o.mood, o.movement]);
}

function stddev(values) {
  if (!values.length) return 0;
  const mean = average(values);
  return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
}

function confidenceForCount(count) {
  if (count < 4) return 'limited';
  if (count < 6) return 'low';
  if (count < 12) return 'moderate';
  return 'high';
}

function windowRecords(records, days, todayKey) {
  const today = utcDay(todayKey);
  const start = today - Math.max(1, Number(days) || 14) + 1;
  return (Array.isArray(records) ? records : [])
    .filter((record) => {
      const day = utcDay(record?.localDate);
      return Number.isFinite(day) && day >= start && day <= today;
    })
    .slice()
    .sort((a, b) => String(a.localDate).localeCompare(String(b.localDate)));
}

function metricMeans(records) {
  return Object.fromEntries(METRICS.map((metric) => [metric, average(records.map((record) => record?.observations?.[metric]))]));
}

function trendAnalysis(records) {
  if (records.length < 6) return null;
  const split = Math.floor(records.length / 2);
  const earlier = records.slice(0, split);
  const later = records.slice(split);
  if (earlier.length < 2 || later.length < 2) return null;
  const deltas = METRICS.map((metric) => ({
    metric,
    delta: average(later.map((record) => record.observations?.[metric])) - average(earlier.map((record) => record.observations?.[metric])),
  }));
  return deltas.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0] || null;
}

export function analyzeRhythmRecords(records, days = 14, todayKey = localDateKey()) {
  const selected = windowRecords(records, days, todayKey);
  const today = utcDay(todayKey);
  const start = today - days + 1;
  const points = selected.map((record) => ({
    localDate: record.localDate,
    dayOffset: utcDay(record.localDate) - start,
    composite: compositeFor(record),
    observations: { ...record.observations },
  }));
  const means = metricMeans(selected);
  const trend = trendAnalysis(selected);
  const variation = stddev(points.map((point) => point.composite));
  let kind = 'learning';
  if (selected.length >= 4 && selected.length < 6) kind = 'forming';
  else if (selected.length >= 6 && trend && Math.abs(trend.delta) >= 0.55) kind = 'trend';
  else if (selected.length >= 6 && variation <= 0.58) kind = 'steady';
  else if (selected.length >= 6) kind = 'varied';
  return {
    days,
    count: selected.length,
    confidence: confidenceForCount(selected.length),
    records: selected,
    points,
    means,
    variation,
    trend: kind === 'trend' ? trend : null,
    kind,
  };
}

function levelFor(metric, mean) {
  const value = Number(mean) || 0;
  if (metric === 'stress') {
    if (value < 1.8) return 'calm';
    if (value < 2.8) return 'light';
    if (value < 3.8) return 'moderate';
    return 'elevated';
  }
  if (value < 2.25) return 'low';
  if (value < 3.5) return 'steady';
  if (value < 4.4) return 'high';
  return 'strong';
}

function primaryCopy(model) {
  const copy = c();
  if (model.kind === 'learning') return [copy.learningTitle, copy.learningCopy];
  if (model.kind === 'forming') return [copy.formingTitle, copy.formingCopy];
  if (model.kind === 'steady') return [copy.steadyTitle, copy.steadyCopy];
  if (model.kind === 'varied') return [copy.variedTitle, copy.variedCopy];
  const trend = model.trend;
  const title = trend?.delta >= 0 ? copy.metricUp[trend.metric] : copy.metricDown[trend.metric];
  return [title || copy.variedTitle, copy.metricTrendCopy];
}

function formatDate(localDate, options = { weekday: 'short', day: 'numeric', month: 'short' }) {
  const [y, m, d] = String(localDate).split('-').map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  return new Intl.DateTimeFormat(currentLocale() === 'th' ? 'th-TH' : 'en', options).format(date);
}

function installStylesheet() {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(STYLE_ID);
    if (existing) {
      if (existing.sheet) resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Rhythm stylesheet failed')), { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.dataset.aurenRhythm = 'build-17';
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error('Rhythm stylesheet failed')), { once: true });
    document.head.appendChild(link);
  });
}

let screen = null;
let model = null;
let selectedDays = 14;
let selectedIndex = -1;
let canvas = null;
let ctx = null;
let resizeObserver = null;
let rafId = 0;
let slowFrames = 0;
let lowPower = false;
let palette = null;
let paletteTheme = '';
let interactionKick = 0;

function buildShell() {
  screen = document.querySelector(SCREEN_SELECTOR);
  if (!screen || screen.dataset.rhythmV1 === '1') return Boolean(screen);
  screen.dataset.rhythmV1 = '1';
  screen.innerHTML = `
    <div class="page-head rhythm-page-head">
      <div class="eyebrow" id="rhythmEyebrow"></div>
      <h1 class="page-title" id="rhythmTitle"></h1>
      <p class="page-sub" id="rhythmSub"></p>
    </div>

    <div class="rhythm-range-row" aria-label="Rhythm window">
      <span id="rhythmRangeLabel"></span>
      <div class="rhythm-range-switch" role="group" aria-labelledby="rhythmRangeLabel">
        <button type="button" data-rhythm-days="7">7</button>
        <button type="button" data-rhythm-days="14">14</button>
        <button type="button" data-rhythm-days="30">30</button>
      </div>
    </div>

    <section class="rhythm-hero" aria-labelledby="rhythmPatternTitle">
      <div class="rhythm-hero-glow" aria-hidden="true"></div>
      <div class="rhythm-hero-top">
        <div>
          <div class="rhythm-kicker" id="rhythmHeroEyebrow"></div>
          <div class="rhythm-continuity-line" id="rhythmHeroContinuity"></div>
        </div>
        <button class="rhythm-why" id="rhythmWhyBtn" type="button"></button>
      </div>
      <div class="rhythm-canvas-wrap">
        <canvas id="rhythmCanvas" tabindex="0" role="img" aria-describedby="rhythmCanvasDescription"></canvas>
        <div class="rhythm-empty-orbit" id="rhythmEmptyOrbit" aria-hidden="true"><i></i><i></i><i></i></div>
      </div>
      <div class="rhythm-sr" id="rhythmCanvasDescription"></div>
      <div class="rhythm-tap-hint" id="rhythmTapHint"></div>
      <div class="rhythm-day-peek" id="rhythmDayPeek" hidden></div>
      <div class="rhythm-pattern-copy">
        <div class="rhythm-provenance"><span>${COPY.en.inferred}</span><i></i><span id="rhythmConfidence"></span></div>
        <h2 id="rhythmPatternTitle"></h2>
        <p id="rhythmPatternCopy"></p>
      </div>
    </section>

    <section class="rhythm-baseline-card">
      <div class="rhythm-section-head">
        <div><h2 id="rhythmBaselineTitle"></h2><p id="rhythmBaselineSub"></p></div>
      </div>
      <div class="rhythm-baseline-list" id="rhythmBaselineList"></div>
    </section>

    <section class="rhythm-continuity-card">
      <div class="rhythm-continuity-orb" aria-hidden="true"><span></span></div>
      <div class="rhythm-continuity-copy"><h2 id="rhythmContinuityTitle"></h2><p id="rhythmContinuitySub"></p></div>
      <div class="rhythm-continuity-value"><strong id="rhythmContinuityValue"></strong><span id="rhythmContinuityMeta"></span></div>
    </section>

    <div class="rhythm-legacy-copy" aria-hidden="true">
      <span id="rhythmEmptyTitle"></span><span id="rhythmEmptyCopy"></span>
    </div>`;

  const modal = document.createElement('div');
  modal.className = 'modal-wrap rhythm-evidence-modal';
  modal.id = 'rhythmEvidenceModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'rhythmEvidenceTitle');
  modal.innerHTML = '<div class="sheet rhythm-evidence-sheet"><div class="sheet-handle"></div><div id="rhythmEvidenceContent"></div></div>';
  document.body.appendChild(modal);

  canvas = document.getElementById('rhythmCanvas');
  ctx = canvas.getContext('2d', { alpha: true });
  bindInteractions();
  return true;
}

function applyCopy() {
  const copy = c();
  const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  set('rhythmEyebrow', copy.eyebrow);
  set('rhythmTitle', copy.title);
  set('rhythmSub', copy.sub);
  set('rhythmRangeLabel', copy.range);
  set('rhythmHeroEyebrow', copy.heroEyebrow);
  set('rhythmWhyBtn', copy.why);
  set('rhythmTapHint', copy.tapHint);
  set('rhythmBaselineTitle', copy.baseline);
  set('rhythmBaselineSub', copy.baselineSub);
  set('rhythmContinuityTitle', copy.continuity);
  set('rhythmContinuitySub', copy.continuitySub);
  set('rhythmCanvasDescription', copy.screenReader);
  set('rhythmEmptyTitle', copy.noDataTitle);
  set('rhythmEmptyCopy', copy.noDataCopy);
  const provenance = document.querySelector('.rhythm-provenance span');
  if (provenance) provenance.textContent = copy.inferred;
  document.querySelectorAll('[data-rhythm-days]').forEach((button) => {
    button.setAttribute('aria-label', `${button.dataset.rhythmDays} ${copy.days}`);
  });
}

function renderEvidence() {
  const copy = c();
  const content = document.getElementById('rhythmEvidenceContent');
  if (!content || !model) return;
  content.innerHTML = `
    <div class="rhythm-evidence-head"><div class="rhythm-evidence-eyebrow">${copy.observed} · ${copy.calculated} · ${copy.inferred}</div><h3 id="rhythmEvidenceTitle">${copy.evidenceTitle}</h3><p>${copy.evidenceIntro}</p></div>
    <div class="rhythm-evidence-list">
      <section><span>01</span><div><strong>${copy.evidenceObservedTitle}</strong><p>${copy.evidenceObserved}</p></div></section>
      <section><span>02</span><div><strong>${copy.evidenceCalculatedTitle}</strong><p>${copy.evidenceCalculated}</p></div></section>
      <section><span>03</span><div><strong>${copy.evidenceInferredTitle}</strong><p>${copy.evidenceInferred}</p></div></section>
      <section><span>04</span><div><strong>${copy.evidenceLimitTitle}</strong><p>${copy.evidenceLimit}</p></div></section>
    </div>
    <div class="rhythm-evidence-sample"><strong>${model.count}</strong><span>${copy.checkins} · ${model.days} ${copy.days}</span></div>
    <div class="sheet-actions"><button class="ghost-btn" id="closeRhythmEvidence" type="button">${copy.close}</button></div>`;
  document.getElementById('closeRhythmEvidence')?.addEventListener('click', closeEvidence);
}

function openEvidence() {
  renderEvidence();
  document.getElementById('rhythmEvidenceModal')?.classList.add('open');
}

function closeEvidence() {
  document.getElementById('rhythmEvidenceModal')?.classList.remove('open');
}

function renderBaseline() {
  const copy = c();
  const list = document.getElementById('rhythmBaselineList');
  if (!list || !model) return;
  if (!model.count) {
    list.innerHTML = `<div class="rhythm-baseline-empty"><strong>${copy.noDataTitle}</strong><span>${copy.noDataCopy}</span></div>`;
    return;
  }
  list.innerHTML = METRICS.map((metric) => {
    const mean = model.means[metric];
    const level = levelFor(metric, mean);
    const position = clamp(((mean - 1) / 4) * 100, 0, 100);
    return `<div class="rhythm-baseline-row" data-metric="${metric}">
      <div class="rhythm-baseline-label"><strong>${copy.metric[metric]}</strong><span>${copy.level[level]}</span></div>
      <div class="rhythm-baseline-track" aria-hidden="true"><i style="--rhythm-position:${position.toFixed(1)}%"></i></div>
    </div>`;
  }).join('');
}

function renderContinuity() {
  const copy = c();
  const value = document.getElementById('rhythmContinuityValue');
  const meta = document.getElementById('rhythmContinuityMeta');
  if (!value || !meta || !model) return;
  value.textContent = String(model.count);
  meta.textContent = `${copy.of} ${model.days} ${copy.recordedDays}`;
  document.querySelector('.rhythm-continuity-card')?.setAttribute('data-confidence', model.confidence);
}

function renderPattern() {
  if (!model) return;
  const copy = c();
  const [title, body] = primaryCopy(model);
  document.getElementById('rhythmPatternTitle').textContent = model.count ? title : copy.noDataTitle;
  document.getElementById('rhythmPatternCopy').textContent = model.count ? body : copy.noDataCopy;
  document.getElementById('rhythmConfidence').textContent = `${copy.confidence}: ${copy.confidenceValues[model.confidence]}`;
  document.getElementById('rhythmHeroContinuity').textContent = `${model.count} ${copy.checkins} · ${model.days} ${copy.days}`;
  const emptyOrbit = document.getElementById('rhythmEmptyOrbit');
  if (emptyOrbit) emptyOrbit.hidden = model.count > 0;
  document.getElementById('rhythmTapHint').hidden = model.count === 0;
  const hero = document.querySelector('.rhythm-hero');
  if (hero) hero.dataset.rhythmState = model.kind;
}

function renderDayPeek() {
  const peek = document.getElementById('rhythmDayPeek');
  if (!peek || !model || selectedIndex < 0 || selectedIndex >= model.points.length) {
    if (peek) peek.hidden = true;
    return;
  }
  const copy = c();
  const point = model.points[selectedIndex];
  peek.innerHTML = `<div class="rhythm-day-date"><span>${copy.dayObserved}</span><strong>${formatDate(point.localDate)}</strong></div><div class="rhythm-day-metrics">${METRICS.map((metric) => `<span><b>${copy.metric[metric]}</b><em>${Number(point.observations[metric])}/5</em></span>`).join('')}</div>`;
  peek.hidden = false;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && peek.animate) {
    peek.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'cubic-bezier(.2,.72,.2,1)' });
  }
}

function renderAll({ animate = false } = {}) {
  applyCopy();
  document.querySelectorAll('[data-rhythm-days]').forEach((button) => {
    const active = Number(button.dataset.rhythmDays) === selectedDays;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderPattern();
  renderBaseline();
  renderContinuity();
  renderDayPeek();
  renderEvidence();
  palette = null;
  drawOnce(performance.now());
  if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = [document.querySelector('.rhythm-hero'), document.querySelector('.rhythm-baseline-card'), document.querySelector('.rhythm-continuity-card')].filter(Boolean);
    targets.forEach((node, index) => node.animate?.([
      { opacity: 0.45, transform: 'translateY(5px)', filter: 'blur(2px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ], { duration: 360 + index * 55, easing: 'cubic-bezier(.2,.72,.2,1)' }));
  }
}

async function refreshData({ animate = false } = {}) {
  try {
    const records = await getAllCheckins();
    model = analyzeRhythmRecords(records, selectedDays, localDateKey());
    if (selectedIndex >= model.points.length) selectedIndex = model.points.length - 1;
    renderAll({ animate });
  } catch {
    model = analyzeRhythmRecords([], selectedDays, localDateKey());
    selectedIndex = -1;
    renderAll({ animate: false });
  }
}

function setWindow(days) {
  const next = [7, 14, 30].includes(Number(days)) ? Number(days) : 14;
  if (next === selectedDays) return;
  selectedDays = next;
  selectedIndex = -1;
  refreshData({ animate: true });
}

function bindInteractions() {
  document.querySelectorAll('[data-rhythm-days]').forEach((button) => button.addEventListener('click', () => setWindow(button.dataset.rhythmDays)));
  document.getElementById('rhythmWhyBtn')?.addEventListener('click', openEvidence);
  const modal = document.getElementById('rhythmEvidenceModal');
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeEvidence(); });

  canvas?.addEventListener('pointerdown', (event) => {
    if (!model?.points.length) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const positions = pointPositions(rect.width, rect.height, performance.now(), false);
    let nearest = 0;
    let distance = Infinity;
    positions.forEach((point, index) => {
      const d = Math.abs(point.x - x);
      if (d < distance) { distance = d; nearest = index; }
    });
    selectedIndex = nearest;
    interactionKick = 1;
    renderDayPeek();
    drawOnce(performance.now());
  });

  canvas?.addEventListener('keydown', (event) => {
    if (!model?.points.length || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (selectedIndex < 0) selectedIndex = model.points.length - 1;
    if (event.key === 'ArrowLeft') selectedIndex = Math.max(0, selectedIndex - 1);
    if (event.key === 'ArrowRight') selectedIndex = Math.min(model.points.length - 1, selectedIndex + 1);
    if (event.key === 'Home') selectedIndex = 0;
    if (event.key === 'End') selectedIndex = model.points.length - 1;
    interactionKick = 1;
    renderDayPeek();
    drawOnce(performance.now());
  });

  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeEvidence(); });

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (canvas) resizeObserver.observe(canvas);
  } else {
    window.addEventListener('resize', resizeCanvas, { passive: true });
  }
}

function parseHex(value, fallback) {
  const match = /^#([0-9a-f]{6})$/i.exec(String(value || '').trim());
  if (!match) return fallback;
  const number = Number.parseInt(match[1], 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

function rgba(rgb, alpha) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

function syncPalette() {
  const theme = document.documentElement.dataset.theme || 'pearl';
  if (palette && paletteTheme === theme) return;
  const style = getComputedStyle(document.documentElement);
  palette = {
    gold: parseHex(style.getPropertyValue('--gold-deep'), [167, 131, 79]),
    goldSoft: parseHex(style.getPropertyValue('--core-gold'), [232, 199, 144]),
    aqua: parseHex(style.getPropertyValue('--aqua'), [169, 207, 202]),
    ink: parseHex(style.getPropertyValue('--ink'), [48, 48, 52]),
  };
  paletteTheme = theme;
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.8);
  const width = Math.max(280, Math.round(rect.width * dpr));
  const height = Math.max(150, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }
  drawOnce(performance.now());
}

function pointPositions(width, height, now, animate = true) {
  if (!model?.points.length) return [];
  const left = 19;
  const right = width - 19;
  const top = 25;
  const bottom = height - 25;
  const span = Math.max(1, model.days - 1);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  return model.points.map((point, index) => {
    const ratio = clamp(point.dayOffset / span, 0, 1);
    const baseY = bottom - ((clamp(point.composite, 1, 5) - 1) / 4) * (bottom - top);
    const breath = animate && !reduced && !lowPower
      ? Math.sin(now * 0.00105 + index * 0.77) * 0.82 + Math.sin(now * 0.00057 + index * 0.29) * 0.34
      : 0;
    return { x: left + ratio * (right - left), y: baseY + breath, point };
  });
}

function drawCurve(points) {
  if (!ctx || !points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const current = points[i];
    const previous = points[i - 1];
    const midX = (previous.x + current.x) / 2;
    ctx.bezierCurveTo(midX, previous.y, midX, current.y, current.x, current.y);
  }
}

function sampleCurve(points, ratio) {
  if (!points.length) return null;
  if (points.length === 1) return points[0];
  const x = points[0].x + clamp(ratio, 0, 1) * (points.at(-1).x - points[0].x);
  let i = 1;
  while (i < points.length && points[i].x < x) i += 1;
  if (i >= points.length) return points.at(-1);
  const a = points[i - 1];
  const b = points[i];
  const local = (x - a.x) / Math.max(1, b.x - a.x);
  const smooth = local * local * (3 - 2 * local);
  return { x, y: a.y + (b.y - a.y) * smooth };
}

function drawOnce(now) {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  syncPalette();
  const start = performance.now();
  ctx.clearRect(0, 0, rect.width, rect.height);
  const points = pointPositions(rect.width, rect.height, now, true);
  if (!points.length) return;

  if (points.length === 1) {
    const point = points[0];
    const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 38);
    glow.addColorStop(0, rgba(palette.goldSoft, 0.18));
    glow.addColorStop(0.45, rgba(palette.aqua, 0.08));
    glow.addColorStop(1, rgba(palette.aqua, 0));
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(point.x, point.y, 38, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(palette.gold, 0.64);
    ctx.beginPath(); ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2); ctx.fill();
  } else {
    if (!lowPower) {
      drawCurve(points);
      const area = ctx.createLinearGradient(0, 18, 0, rect.height);
      area.addColorStop(0, rgba(palette.goldSoft, 0.11));
      area.addColorStop(0.55, rgba(palette.aqua, 0.035));
      area.addColorStop(1, rgba(palette.aqua, 0));
      ctx.lineTo(points.at(-1).x, rect.height - 7);
      ctx.lineTo(points[0].x, rect.height - 7);
      ctx.closePath();
      ctx.fillStyle = area;
      ctx.fill();

      drawCurve(points);
      ctx.strokeStyle = rgba(palette.aqua, 0.11);
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    drawCurve(points);
    const line = ctx.createLinearGradient(points[0].x, 0, points.at(-1).x, 0);
    line.addColorStop(0, rgba(palette.gold, 0.78));
    line.addColorStop(0.52, rgba(palette.goldSoft, 0.68));
    line.addColorStop(1, rgba(palette.aqua, 0.82));
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.65;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    points.forEach((point, index) => {
      const selected = index === selectedIndex;
      ctx.fillStyle = selected ? rgba(palette.gold, 0.88) : rgba(palette.ink, 0.19);
      ctx.beginPath(); ctx.arc(point.x, point.y, selected ? 3.1 : 1.7, 0, Math.PI * 2); ctx.fill();
      if (selected && !lowPower) {
        ctx.strokeStyle = rgba(palette.goldSoft, 0.28 + interactionKick * 0.18);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(point.x, point.y, 7 + interactionKick * 5, 0, Math.PI * 2); ctx.stroke();
      }
    });

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !lowPower) {
      const phase = (now % 5200) / 5200;
      const pulse = sampleCurve(points, phase);
      if (pulse) {
        const glow = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 18);
        glow.addColorStop(0, rgba(palette.goldSoft, 0.34));
        glow.addColorStop(0.33, rgba(palette.aqua, 0.13));
        glow.addColorStop(1, rgba(palette.aqua, 0));
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(palette.goldSoft, 0.78);
        ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 1.45, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  interactionKick *= 0.92;
  const elapsed = performance.now() - start;
  if (elapsed > 18) slowFrames += 1; else slowFrames = Math.max(0, slowFrames - 1);
  if (slowFrames >= 10 && !lowPower) {
    lowPower = true;
    slowFrames = 0;
    resizeCanvas();
  }
}

function animateLoop(now) {
  if (screen?.classList.contains('active') && document.visibilityState !== 'hidden' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    drawOnce(now);
  }
  rafId = requestAnimationFrame(animateLoop);
}

function observeEnvironment() {
  const observer = new MutationObserver((mutations) => {
    let localeChanged = false;
    let themeChanged = false;
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'lang') localeChanged = true;
      if (mutation.attributeName === 'data-theme') themeChanged = true;
    });
    if (localeChanged) renderAll({ animate: false });
    if (themeChanged) { palette = null; drawOnce(performance.now()); }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-theme'] });

  document.addEventListener('auren:data-refreshed', () => refreshData({ animate: false }));
  document.addEventListener('click', (event) => {
    const nav = event.target?.closest?.('[data-nav="rhythm"]');
    if (nav) window.setTimeout(() => refreshData({ animate: false }).then(resizeCanvas), 0);
  }, true);
}

async function setup() {
  await installStylesheet();
  if (!buildShell()) return;
  applyCopy();
  await refreshData({ animate: false });
  resizeCanvas();
  observeEnvironment();
  if (!rafId) rafId = requestAnimationFrame(animateLoop);
}

if (typeof document !== 'undefined') {
  try {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setup().catch(() => {}), { once: true });
    else setup().catch(() => {});
  } catch {
    // Fail open: the Build 16 Rhythm placeholder remains usable if this enhancement cannot initialize.
  }
}
