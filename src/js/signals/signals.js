import { getAllCheckins } from '../storage/checkins.js';

const STYLE_ID = 'auren-signals-build-19';
const STYLE_HREF = './src/css/signals.css';
const SCREEN_SELECTOR = '[data-screen="signals"]';
const METRICS = ['sleep', 'energy', 'stress', 'mood', 'movement'];
const PAIRS = [];
for (let i = 0; i < METRICS.length; i += 1) {
  for (let j = i + 1; j < METRICS.length; j += 1) PAIRS.push([METRICS[i], METRICS[j]]);
}

const COPY = {
  en: {
    eyebrow: 'Relationship Intelligence',
    title: 'Signals',
    sub: 'Auren looks for repeat relationships across your own check-ins — and stays quiet when evidence is weak.',
    range: 'Evidence window',
    days: 'days',
    fieldEyebrow: 'Evidence field',
    why: 'Why this?',
    observed: 'Observed',
    calculated: 'Calculated',
    inferred: 'Inferred',
    confidence: 'Confidence',
    confidenceValues: { limited: 'Limited', low: 'Low', moderate: 'Moderate', high: 'High' },
    noDataTitle: 'No signal before evidence',
    noDataCopy: 'Complete daily check-ins and Auren will begin comparing how your observations move across time.',
    oneDayTitle: 'One day cannot form a relationship',
    oneDayCopy: 'Today can describe itself, but one day cannot show whether two observations repeatedly move together.',
    listeningTitle: 'Auren is listening for repeat relationships',
    listeningCopy: 'Signals begin only after enough paired days repeat the same relationship. Auren will not turn an early coincidence into a conclusion.',
    quietTitle: 'No relationship has earned the label yet',
    quietCopy: 'There is enough history to compare, but none of the observation pairs are consistent enough to surface as a signal in this window.',
    sameTitle: (a, b) => `${a} and ${b} often moved together`,
    oppositeTitle: (a, b) => `${a} and ${b} often moved in opposite directions`,
    sameCopy: (n) => `Across ${n} paired days, these two observations repeatedly ranked higher or lower in the same direction. Auren treats this as association, not cause.`,
    oppositeCopy: (n) => `Across ${n} paired days, when one observation ranked higher the other tended to rank lower. Auren treats this as association, not cause.`,
    pairedDay: 'paired day',
    pairedDays: 'paired days',
    window: 'window',
    evidenceDepth: 'Evidence depth',
    evidenceDepthSub: 'How much repeated history can support relationship inference',
    readinessNeed: 'before relationship inference',
    readinessAvailable: 'paired days available',
    minimum: 'Minimum evidence',
    minimumCopy: 'Auren requires at least 8 paired days, enough variation in both observations, and a relationship strong enough to survive conservative screening.',
    compareTitle: 'What Auren compares',
    compareSub: 'Five daily observations, checked pair by pair. Auren surfaces only the relationships that earn enough evidence.',
    compareMeta: '10 possible pairings · no health score',
    secondaryTitle: 'Another relationship worth watching',
    secondaryEmpty: 'Auren is staying quiet about weaker relationships in this window.',
    signalMeta: 'Relationship signal',
    evidenceTitle: 'How Auren earns a signal',
    evidenceIntro: 'Signals are descriptive personal-pattern context. The visual can feel alive; the inference stays deliberately conservative.',
    evidenceObservedTitle: 'Observed',
    evidenceObserved: 'Sleep, energy, stress, mood and movement come directly from your daily 1–5 check-ins.',
    evidenceCalculatedTitle: 'Calculated',
    evidenceCalculated: 'For each pair, Auren compares the rank order of the values across paired days. No combined health score is created or stored.',
    evidenceInferredTitle: 'Inferred',
    evidenceInferred: 'A relationship is surfaced only after at least 8 paired days, enough variation in both observations and a sufficiently strong directional association. With more history, Auren also checks that the relationship does not reverse across the window.',
    evidenceLimitTitle: 'Limit',
    evidenceLimit: 'Association does not prove cause and effect. These are self-reported observations, not sensor measurements or medical findings.',
    close: 'Close',
    metric: { sleep: 'Sleep', energy: 'Energy', stress: 'Stress', mood: 'Mood', movement: 'Movement' },
    screenReaderLearning: 'Auren relationship evidence field. No relationship is shown until enough repeated paired observations support it.',
    screenReaderSignal: (a, b, direction) => `Auren relationship evidence field highlighting ${a} and ${b}, which moved ${direction === 'same' ? 'in the same direction' : 'in opposite directions'} across the selected window.`,
  },
  th: {
    eyebrow: 'ความเข้าใจความสัมพันธ์',
    title: 'สัญญาณ',
    sub: 'Auren มองหาความสัมพันธ์ที่เกิดซ้ำจากเช็กอินของคุณเอง และจะไม่พูดเกินหลักฐานที่มี',
    range: 'ช่วงหลักฐาน',
    days: 'วัน',
    fieldEyebrow: 'สนามหลักฐาน',
    why: 'ทำไมถึงเป็นแบบนี้?',
    observed: 'ข้อมูลที่บันทึก',
    calculated: 'คำนวณ',
    inferred: 'ตีความ',
    confidence: 'ความมั่นใจ',
    confidenceValues: { limited: 'จำกัด', low: 'ต่ำ', moderate: 'ปานกลาง', high: 'สูง' },
    noDataTitle: 'ไม่มีสัญญาณก่อนมีหลักฐาน',
    noDataCopy: 'บันทึกเช็กอินในแต่ละวัน แล้ว Auren จะเริ่มเปรียบเทียบว่าข้อมูลแต่ละด้านขยับสัมพันธ์กันอย่างไรเมื่อเวลาผ่านไป',
    oneDayTitle: 'หนึ่งวันยังสร้างความสัมพันธ์ไม่ได้',
    oneDayCopy: 'ข้อมูลวันนี้อธิบายวันนี้ได้ แต่ยังบอกไม่ได้ว่าสองด้านขยับไปด้วยกันซ้ำๆ หรือไม่',
    listeningTitle: 'Auren กำลังฟังหาความสัมพันธ์ที่เกิดซ้ำ',
    listeningCopy: 'Auren จะเริ่มเรียกสิ่งใดว่าสัญญาณเมื่อมีข้อมูลเป็นคู่มากพอและความสัมพันธ์เกิดซ้ำชัดเจน จึงไม่รีบเปลี่ยนความบังเอิญช่วงแรกให้เป็นข้อสรุป',
    quietTitle: 'ยังไม่มีความสัมพันธ์ใดควรถูกเรียกว่าสัญญาณ',
    quietCopy: 'มีประวัติพอสำหรับการเปรียบเทียบแล้ว แต่ยังไม่มีคู่ข้อมูลใดสม่ำเสมอมากพอที่จะถูกยกขึ้นมาเป็นสัญญาณในช่วงนี้',
    sameTitle: (a, b) => `${a}และ${b}มักขยับไปในทิศทางเดียวกัน`,
    oppositeTitle: (a, b) => `${a}และ${b}มักขยับสวนทางกัน`,
    sameCopy: (n) => `จากข้อมูล ${n} วันที่มีทั้งสองค่า สองด้านนี้มักอยู่สูงขึ้นหรือต่ำลงไปในทิศทางเดียวกัน Auren มองว่าเป็นความสัมพันธ์ ไม่ใช่เหตุและผล`,
    oppositeCopy: (n) => `จากข้อมูล ${n} วันที่มีทั้งสองค่า เมื่อด้านหนึ่งอยู่สูงขึ้น อีกด้านมักอยู่ต่ำลง Auren มองว่าเป็นความสัมพันธ์ ไม่ใช่เหตุและผล`,
    pairedDay: 'วันที่มีข้อมูลเป็นคู่',
    pairedDays: 'วันที่มีข้อมูลเป็นคู่',
    window: 'ช่วงเวลา',
    evidenceDepth: 'ความลึกของหลักฐาน',
    evidenceDepthSub: 'ประวัติที่เกิดซ้ำมีมากพอรองรับการตีความความสัมพันธ์แค่ไหน',
    readinessNeed: 'ก่อนเริ่มตีความความสัมพันธ์',
    readinessAvailable: 'วันที่มีข้อมูลเป็นคู่',
    minimum: 'หลักฐานขั้นต่ำ',
    minimumCopy: 'Auren ต้องการข้อมูลเป็นคู่อย่างน้อย 8 วัน ทั้งสองด้านต้องมีความแปรผันพอ และความสัมพันธ์ต้องชัดพอผ่านการคัดกรองแบบระมัดระวัง',
    compareTitle: 'สิ่งที่ Auren เปรียบเทียบ',
    compareSub: 'ข้อมูลรายวันห้าด้านถูกตรวจเป็นคู่ๆ และ Auren จะแสดงเฉพาะความสัมพันธ์ที่มีหลักฐานมากพอ',
    compareMeta: '10 คู่ที่เป็นไปได้ · ไม่มีคะแนนสุขภาพ',
    secondaryTitle: 'อีกความสัมพันธ์ที่ควรเฝ้าดู',
    secondaryEmpty: 'Auren ยังเลือกไม่พูดถึงความสัมพันธ์ที่อ่อนกว่านี้ในช่วงเวลานี้',
    signalMeta: 'สัญญาณความสัมพันธ์',
    evidenceTitle: 'Auren ยอมเรียกสิ่งใดว่าสัญญาณเมื่อไร',
    evidenceIntro: 'Signals เป็นบริบทเชิงพรรณนาจากรูปแบบส่วนตัว ภาพสามารถมีชีวิตได้ แต่การตีความต้องระมัดระวังเสมอ',
    evidenceObservedTitle: 'ข้อมูลที่บันทึก',
    evidenceObserved: 'การนอน พลังงาน ความเครียด อารมณ์ และการเคลื่อนไหว มาจากเช็กอิน 1–5 ของคุณโดยตรง',
    evidenceCalculatedTitle: 'คำนวณ',
    evidenceCalculated: 'Auren เปรียบเทียบลำดับของค่าของแต่ละคู่ตลอดวันที่มีข้อมูลทั้งสองด้าน โดยไม่สร้างหรือเก็บคะแนนสุขภาพรวม',
    evidenceInferredTitle: 'ตีความ',
    evidenceInferred: 'ความสัมพันธ์จะถูกแสดงเมื่อมีข้อมูลเป็นคู่อย่างน้อย 8 วัน ทั้งสองด้านมีความแปรผันพอ และความสัมพันธ์มีทิศทางชัดเจนพอ เมื่อมีประวัติมากขึ้น Auren ยังตรวจว่าความสัมพันธ์ไม่ได้กลับทิศในคนละช่วงของข้อมูล',
    evidenceLimitTitle: 'ข้อจำกัด',
    evidenceLimit: 'ความสัมพันธ์ไม่ได้พิสูจน์เหตุและผล ข้อมูลเหล่านี้เป็นสิ่งที่ผู้ใช้รายงานเอง ไม่ใช่การวัดจากเซนเซอร์หรือผลทางการแพทย์',
    close: 'ปิด',
    metric: { sleep: 'การนอน', energy: 'พลังงาน', stress: 'ความเครียด', mood: 'อารมณ์', movement: 'การเคลื่อนไหว' },
    screenReaderLearning: 'สนามหลักฐานความสัมพันธ์ของ Auren จะยังไม่แสดงความสัมพันธ์จนกว่าจะมีข้อมูลเป็นคู่ที่เกิดซ้ำมากพอรองรับ',
    screenReaderSignal: (a, b, direction) => `สนามหลักฐานของ Auren กำลังเน้นความสัมพันธ์ระหว่าง${a}กับ${b} ซึ่งขยับ${direction === 'same' ? 'ไปในทิศทางเดียวกัน' : 'สวนทางกัน'}ในช่วงเวลาที่เลือก`,
  },
};

function currentLocale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function c() {
  return COPY[currentLocale()];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function utcDay(localDate) {
  const [y, m, d] = String(localDate || '').split('-').map(Number);
  if (!y || !m || !d) return NaN;
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

function windowRecords(records, days, todayKey) {
  const today = utcDay(todayKey);
  const start = today - Math.max(1, Number(days) || 30) + 1;
  return (Array.isArray(records) ? records : [])
    .filter((record) => {
      const day = utcDay(record?.localDate);
      return Number.isFinite(day) && day >= start && day <= today;
    })
    .slice()
    .sort((a, b) => String(a.localDate).localeCompare(String(b.localDate)));
}

function validObservation(record, metric) {
  const value = Number(record?.observations?.[metric]);
  return Number.isFinite(value) && value >= 1 && value <= 5 ? value : null;
}

function averageRanks(values) {
  const indexed = values.map((value, index) => ({ value: Number(value), index })).sort((a, b) => a.value - b.value);
  const ranks = new Array(values.length).fill(0);
  let i = 0;
  while (i < indexed.length) {
    let j = i + 1;
    while (j < indexed.length && indexed[j].value === indexed[i].value) j += 1;
    const rank = (i + 1 + j) / 2;
    for (let k = i; k < j; k += 1) ranks[indexed[k].index] = rank;
    i = j;
  }
  return ranks;
}

function pearson(xs, ys) {
  if (xs.length !== ys.length || xs.length < 2) return 0;
  const meanX = xs.reduce((sum, value) => sum + value, 0) / xs.length;
  const meanY = ys.reduce((sum, value) => sum + value, 0) / ys.length;
  let numerator = 0;
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < xs.length; i += 1) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    numerator += dx * dy;
    sx += dx * dx;
    sy += dy * dy;
  }
  const denominator = Math.sqrt(sx * sy);
  return denominator > 0 ? numerator / denominator : 0;
}

function spearman(xs, ys) {
  return pearson(averageRanks(xs), averageRanks(ys));
}

function uniqueCount(values) {
  return new Set(values.map((value) => Number(value))).size;
}

function splitStable(xs, ys, overall) {
  if (xs.length < 12) return true;
  const split = Math.floor(xs.length / 2);
  if (split < 4 || xs.length - split < 4) return true;
  const first = spearman(xs.slice(0, split), ys.slice(0, split));
  const second = spearman(xs.slice(split), ys.slice(split));
  const sign = Math.sign(overall);
  const strongOpposition = (value) => Math.abs(value) >= 0.35 && Math.sign(value) !== 0 && Math.sign(value) !== sign;
  return !(strongOpposition(first) || strongOpposition(second));
}

function thresholdForCount(count) {
  if (count >= 20) return 0.55;
  if (count >= 12) return 0.62;
  return 0.72;
}

function confidenceForRelationship(count, strength) {
  if (count >= 20 && strength >= 0.68) return 'high';
  if (count >= 12 && strength >= 0.62) return 'moderate';
  return 'low';
}

export function analyzeSignalPair(records, metricA, metricB) {
  const paired = [];
  (Array.isArray(records) ? records : []).forEach((record) => {
    const a = validObservation(record, metricA);
    const b = validObservation(record, metricB);
    if (a !== null && b !== null) paired.push({ localDate: record.localDate, a, b });
  });
  const count = paired.length;
  if (count < 8) return { metricA, metricB, count, eligible: false, reason: 'sample' };
  const xs = paired.map((item) => item.a);
  const ys = paired.map((item) => item.b);
  if (uniqueCount(xs) < 3 || uniqueCount(ys) < 3) return { metricA, metricB, count, eligible: false, reason: 'variation' };
  const rho = spearman(xs, ys);
  const strength = Math.abs(rho);
  const stable = splitStable(xs, ys, rho);
  const threshold = thresholdForCount(count);
  if (!stable || strength < threshold) return { metricA, metricB, count, eligible: false, reason: stable ? 'strength' : 'stability', rho, strength, stable };
  return {
    metricA,
    metricB,
    count,
    eligible: true,
    direction: rho >= 0 ? 'same' : 'opposite',
    rho,
    strength,
    stable,
    confidence: confidenceForRelationship(count, strength),
  };
}

export function analyzeSignalRecords(records, days = 30, todayKey = localDateKey()) {
  const selected = windowRecords(records, days, todayKey);
  const relationships = PAIRS
    .map(([a, b]) => analyzeSignalPair(selected, a, b))
    .filter((item) => item.eligible)
    .sort((a, b) => b.strength - a.strength);
  return {
    days,
    count: selected.length,
    records: selected,
    relationships,
    primary: relationships[0] || null,
    secondary: relationships[1] || null,
    readiness: Math.min(selected.length, 8),
    confidence: relationships[0]?.confidence || (selected.length < 8 ? 'limited' : 'low'),
  };
}

function installStylesheet() {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(STYLE_ID);
    if (existing) {
      if (existing.sheet) resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Signals stylesheet failed')), { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.dataset.aurenSignals = 'build-19';
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error('Signals stylesheet failed')), { once: true });
    document.head.appendChild(link);
  });
}

let screen = null;
let canvas = null;
let ctx = null;
let model = null;
let selectedDays = 30;
let palette = null;
let paletteTheme = '';
let resizeObserver = null;
let rafId = 0;
let slowFrames = 0;
let lowPower = false;

const NODE_POSITIONS = {
  sleep: [0.17, 0.35],
  energy: [0.40, 0.23],
  stress: [0.79, 0.35],
  mood: [0.67, 0.73],
  movement: [0.29, 0.73],
};

function buildShell() {
  screen = document.querySelector(SCREEN_SELECTOR);
  if (!screen || screen.dataset.signalsV1 === '1') return Boolean(screen);
  screen.dataset.signalsV1 = '1';
  screen.innerHTML = `
    <div class="page-head signals-page-head">
      <div class="eyebrow" id="signalsEyebrow"></div>
      <h1 class="page-title" id="signalsTitle"></h1>
      <p class="page-sub" id="signalsSub"></p>
    </div>

    <div class="signals-range-row" aria-label="Signals evidence window">
      <span id="signalsRangeLabel"></span>
      <div class="signals-range-switch" role="group" aria-labelledby="signalsRangeLabel">
        <button type="button" data-signals-days="14">14</button>
        <button type="button" data-signals-days="30">30</button>
      </div>
    </div>

    <section class="signals-hero" aria-labelledby="signalsPatternTitle">
      <div class="signals-hero-glow" aria-hidden="true"></div>
      <div class="signals-hero-top">
        <div>
          <div class="signals-kicker" id="signalsFieldEyebrow"></div>
          <div class="signals-sample" id="signalsSample"></div>
        </div>
        <button class="signals-why" id="signalsWhyBtn" type="button"></button>
      </div>
      <div class="signals-field-wrap">
        <canvas id="signalsCanvas" role="img" aria-describedby="signalsCanvasDescription"></canvas>
        <div class="signals-field-ring" aria-hidden="true"></div>
      </div>
      <div class="signals-sr" id="signalsCanvasDescription"></div>
      <div class="signals-pattern-copy">
        <div class="signals-provenance"><span id="signalsProvenance"></span><i></i><span id="signalsConfidence"></span></div>
        <h2 id="signalsPatternTitle"></h2>
        <p id="signalsPatternCopy"></p>
      </div>
    </section>

    <section class="signals-depth-card">
      <div class="signals-depth-orb" aria-hidden="true"><span></span></div>
      <div class="signals-depth-copy"><h2 id="signalsDepthTitle"></h2><p id="signalsDepthSub"></p></div>
      <div class="signals-depth-value"><strong id="signalsDepthValue"></strong><span id="signalsDepthMeta"></span></div>
    </section>

    <section class="signals-compare-card">
      <div class="signals-section-head"><div><h2 id="signalsCompareTitle"></h2><p id="signalsCompareSub"></p></div></div>
      <div class="signals-metric-grid" id="signalsMetricGrid"></div>
      <div class="signals-compare-meta" id="signalsCompareMeta"></div>
    </section>

    <section class="signals-secondary-card" id="signalsSecondaryCard">
      <div class="signals-secondary-eyebrow" id="signalsSecondaryTitle"></div>
      <div class="signals-secondary-body" id="signalsSecondaryBody"></div>
    </section>

    <div class="signals-legacy-copy" aria-hidden="true">
      <span id="signalsEmptyTitle"></span><span id="signalsEmptyCopy"></span>
    </div>`;

  const modal = document.createElement('div');
  modal.className = 'modal-wrap signals-evidence-modal';
  modal.id = 'signalsEvidenceModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'signalsEvidenceTitle');
  modal.innerHTML = '<div class="sheet signals-evidence-sheet"><div class="sheet-handle"></div><div id="signalsEvidenceContent"></div></div>';
  document.body.appendChild(modal);

  canvas = document.getElementById('signalsCanvas');
  ctx = canvas?.getContext('2d', { alpha: true }) || null;
  bindInteractions();
  return true;
}

function metricLabel(metric) {
  return c().metric[metric] || metric;
}

function pairedLabel(count) {
  const copy = c();
  return currentLocale() === 'en' && Number(count) === 1 ? copy.pairedDay : copy.pairedDays;
}

function primaryText() {
  const copy = c();
  if (!model?.count) return [copy.noDataTitle, copy.noDataCopy];
  if (model.count === 1) return [copy.oneDayTitle, copy.oneDayCopy];
  if (model.count < 8) return [copy.listeningTitle, copy.listeningCopy];
  if (!model.primary) return [copy.quietTitle, copy.quietCopy];
  const pair = model.primary;
  const a = metricLabel(pair.metricA);
  const b = metricLabel(pair.metricB);
  return pair.direction === 'same'
    ? [copy.sameTitle(a, b), copy.sameCopy(pair.count)]
    : [copy.oppositeTitle(a, b), copy.oppositeCopy(pair.count)];
}

function applyCopy() {
  const copy = c();
  const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  set('signalsEyebrow', copy.eyebrow);
  set('signalsTitle', copy.title);
  set('signalsSub', copy.sub);
  set('signalsRangeLabel', copy.range);
  set('signalsFieldEyebrow', copy.fieldEyebrow);
  set('signalsWhyBtn', copy.why);
  set('signalsDepthTitle', copy.evidenceDepth);
  set('signalsDepthSub', copy.evidenceDepthSub);
  set('signalsCompareTitle', copy.compareTitle);
  set('signalsCompareSub', copy.compareSub);
  set('signalsCompareMeta', copy.compareMeta);
  set('signalsSecondaryTitle', copy.secondaryTitle);
  set('signalsEmptyTitle', copy.noDataTitle);
  set('signalsEmptyCopy', copy.noDataCopy);
  document.querySelectorAll('[data-signals-days]').forEach((button) => {
    button.setAttribute('aria-label', `${button.dataset.signalsDays} ${copy.days}`);
  });
}

function renderMetricGrid() {
  const grid = document.getElementById('signalsMetricGrid');
  if (!grid) return;
  grid.innerHTML = METRICS.map((metric) => `<span data-signal-metric="${metric}"><i></i>${metricLabel(metric)}</span>`).join('');
}

function renderPattern() {
  if (!model) return;
  const copy = c();
  const [title, body] = primaryText();
  const primary = model.primary;
  const provenance = document.getElementById('signalsProvenance');
  const confidence = document.getElementById('signalsConfidence');
  if (provenance) provenance.textContent = primary ? copy.inferred : copy.observed;
  if (confidence) confidence.textContent = `${copy.confidence}: ${copy.confidenceValues[model.confidence]}`;
  document.getElementById('signalsPatternTitle').textContent = title;
  document.getElementById('signalsPatternCopy').textContent = body;
  document.getElementById('signalsSample').textContent = `${model.count} ${pairedLabel(model.count)} · ${model.days} ${copy.days}`;
  const sr = document.getElementById('signalsCanvasDescription');
  if (sr) {
    sr.textContent = primary
      ? copy.screenReaderSignal(metricLabel(primary.metricA), metricLabel(primary.metricB), primary.direction)
      : copy.screenReaderLearning;
  }
  screen.dataset.signalState = primary ? 'signal' : model.count >= 8 ? 'quiet' : 'learning';
}

function renderDepth() {
  if (!model) return;
  const copy = c();
  const value = document.getElementById('signalsDepthValue');
  const meta = document.getElementById('signalsDepthMeta');
  if (!value || !meta) return;
  if (model.count < 8) {
    value.textContent = `${model.count} / 8`;
    meta.textContent = copy.readinessNeed;
  } else {
    value.textContent = String(model.count);
    meta.textContent = copy.readinessAvailable;
  }
  document.querySelector('.signals-depth-card')?.setAttribute('data-ready', model.count >= 8 ? '1' : '0');
}

function secondaryText(pair) {
  const copy = c();
  if (!pair) return copy.secondaryEmpty;
  const a = metricLabel(pair.metricA);
  const b = metricLabel(pair.metricB);
  const title = pair.direction === 'same' ? copy.sameTitle(a, b) : copy.oppositeTitle(a, b);
  return `<strong>${title}</strong><span>${pair.count} ${pairedLabel(pair.count)} · ${copy.confidence}: ${copy.confidenceValues[pair.confidence]}</span>`;
}

function renderSecondary() {
  const body = document.getElementById('signalsSecondaryBody');
  const card = document.getElementById('signalsSecondaryCard');
  if (!body || !card || !model) return;
  if (model.secondary) {
    body.innerHTML = secondaryText(model.secondary);
    card.dataset.hasSignal = '1';
  } else {
    body.textContent = c().secondaryEmpty;
    card.dataset.hasSignal = '0';
  }
}

function renderEvidence() {
  const copy = c();
  const content = document.getElementById('signalsEvidenceContent');
  if (!content || !model) return;
  content.innerHTML = `
    <div class="signals-evidence-head"><div class="signals-evidence-eyebrow">${copy.observed} · ${copy.calculated} · ${copy.inferred}</div><h3 id="signalsEvidenceTitle">${copy.evidenceTitle}</h3><p>${copy.evidenceIntro}</p></div>
    <div class="signals-evidence-list">
      <section><span>01</span><div><strong>${copy.evidenceObservedTitle}</strong><p>${copy.evidenceObserved}</p></div></section>
      <section><span>02</span><div><strong>${copy.evidenceCalculatedTitle}</strong><p>${copy.evidenceCalculated}</p></div></section>
      <section><span>03</span><div><strong>${copy.evidenceInferredTitle}</strong><p>${copy.evidenceInferred}</p></div></section>
      <section><span>04</span><div><strong>${copy.evidenceLimitTitle}</strong><p>${copy.evidenceLimit}</p></div></section>
    </div>
    <div class="signals-evidence-sample"><strong>${model.count}</strong><span>${pairedLabel(model.count)} · ${model.days} ${copy.days}</span></div>
    <div class="signals-minimum-note"><strong>${copy.minimum}</strong><p>${copy.minimumCopy}</p></div>
    <div class="sheet-actions"><button class="ghost-btn" id="closeSignalsEvidence" type="button">${copy.close}</button></div>`;
  document.getElementById('closeSignalsEvidence')?.addEventListener('click', closeEvidence);
}

function openEvidence() {
  renderEvidence();
  document.getElementById('signalsEvidenceModal')?.classList.add('open');
}

function closeEvidence() {
  document.getElementById('signalsEvidenceModal')?.classList.remove('open');
}

function renderAll({ animate = false } = {}) {
  applyCopy();
  document.querySelectorAll('[data-signals-days]').forEach((button) => {
    const active = Number(button.dataset.signalsDays) === selectedDays;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderMetricGrid();
  renderPattern();
  renderDepth();
  renderSecondary();
  renderEvidence();
  palette = null;
  resizeCanvas();
  drawOnce(performance.now());
  if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    [document.querySelector('.signals-hero'), document.querySelector('.signals-depth-card'), document.querySelector('.signals-compare-card'), document.querySelector('.signals-secondary-card')]
      .filter(Boolean)
      .forEach((node, index) => node.animate?.([
        { opacity: 0.45, transform: 'translateY(5px)', filter: 'blur(2px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      ], { duration: 340 + index * 45, easing: 'cubic-bezier(.2,.72,.2,1)' }));
  }
}

async function refreshData({ animate = false } = {}) {
  try {
    const records = await getAllCheckins();
    model = analyzeSignalRecords(records, selectedDays, localDateKey());
  } catch {
    model = analyzeSignalRecords([], selectedDays, localDateKey());
  }
  renderAll({ animate });
}

function setWindow(days) {
  const next = [14, 30].includes(Number(days)) ? Number(days) : 30;
  if (next === selectedDays) return;
  selectedDays = next;
  refreshData({ animate: true });
}

function bindInteractions() {
  document.querySelectorAll('[data-signals-days]').forEach((button) => button.addEventListener('click', () => setWindow(button.dataset.signalsDays)));
  document.getElementById('signalsWhyBtn')?.addEventListener('click', openEvidence);
  const modal = document.getElementById('signalsEvidenceModal');
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeEvidence(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeEvidence(); });
  if ('ResizeObserver' in window && canvas) {
    resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(canvas);
  } else {
    window.addEventListener('resize', resizeCanvas, { passive: true });
  }
}

function parseHex(value, fallback) {
  const match = /^#([0-9a-f]{6})$/i.exec(String(value || '').trim());
  if (!match) return fallback;
  const n = Number.parseInt(match[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(rgb, alpha) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

function syncPalette() {
  const theme = document.documentElement.dataset.theme || 'pearl';
  if (palette && paletteTheme === theme) return;
  const styles = getComputedStyle(document.documentElement);
  palette = {
    gold: parseHex(styles.getPropertyValue('--gold-deep'), [167, 131, 79]),
    goldSoft: parseHex(styles.getPropertyValue('--core-gold'), [232, 199, 144]),
    aqua: parseHex(styles.getPropertyValue('--aqua'), [169, 207, 202]),
    ink: parseHex(styles.getPropertyValue('--ink'), [48, 48, 52]),
    pearl: parseHex(styles.getPropertyValue('--core-pearl'), [252, 248, 241]),
  };
  paletteTheme = theme;
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}

function nodePoint(metric, width, height) {
  const [x, y] = NODE_POSITIONS[metric];
  return { x: x * width, y: y * height };
}

function curveControl(a, b, width, height, bend = 1) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / length;
  const ny = dx / length;
  const amplitude = Math.min(width, height) * 0.10 * bend;
  return { x: mx + nx * amplitude, y: my + ny * amplitude };
}

function quadraticPoint(a, c1, b, t) {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c1.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c1.y + t * t * b.y,
  };
}

function drawConnection(pair, width, height, { secondary = false, now = 0 } = {}) {
  if (!pair || !ctx) return;
  const a = nodePoint(pair.metricA, width, height);
  const b = nodePoint(pair.metricB, width, height);
  const control = curveControl(a, b, width, height, secondary ? -0.68 : 0.86);
  const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  gradient.addColorStop(0, rgba(palette.gold, secondary ? 0.22 : 0.72));
  gradient.addColorStop(0.52, rgba(palette.goldSoft, secondary ? 0.20 : 0.62));
  gradient.addColorStop(1, rgba(palette.aqua, secondary ? 0.26 : 0.76));
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(control.x, control.y, b.x, b.y);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = secondary ? 1 : 1.55;
  if (secondary) ctx.setLineDash([3, 6]);
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.setLineDash([]);

  if (!secondary && !lowPower && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const phase = (now % 4400) / 4400;
    const pulse = quadraticPoint(a, control, b, phase);
    const glow = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 18);
    glow.addColorStop(0, rgba(palette.goldSoft, 0.40));
    glow.addColorStop(0.35, rgba(palette.aqua, 0.13));
    glow.addColorStop(1, rgba(palette.aqua, 0));
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(palette.goldSoft, 0.82);
    ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 1.4, 0, Math.PI * 2); ctx.fill();
  }
}

function drawField(now) {
  if (!canvas || !ctx || !model) return;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  if (!width || !height) return;
  syncPalette();
  ctx.clearRect(0, 0, width, height);

  const centerGlow = ctx.createRadialGradient(width * 0.50, height * 0.50, 0, width * 0.50, height * 0.50, Math.min(width, height) * 0.46);
  centerGlow.addColorStop(0, rgba(palette.pearl, 0.22));
  centerGlow.addColorStop(0.48, rgba(palette.aqua, 0.035));
  centerGlow.addColorStop(1, rgba(palette.aqua, 0));
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.strokeStyle = rgba(palette.ink, 0.055);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(width * 0.50, height * 0.50, width * 0.35, height * 0.34, -0.08, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(width * 0.50, height * 0.50, width * 0.25, height * 0.24, 0.12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  if (model.secondary) drawConnection(model.secondary, width, height, { secondary: true, now });
  if (model.primary) drawConnection(model.primary, width, height, { secondary: false, now });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breathe = !reduced && !lowPower ? (Math.sin(now * 0.00155) + 1) / 2 : 0.42;
  METRICS.forEach((metric, index) => {
    const point = nodePoint(metric, width, height);
    const isPrimary = model.primary && [model.primary.metricA, model.primary.metricB].includes(metric);
    const isSecondary = !isPrimary && model.secondary && [model.secondary.metricA, model.secondary.metricB].includes(metric);
    const baseRadius = isPrimary ? 4.0 : isSecondary ? 3.0 : 2.5;
    if (!lowPower) {
      const radius = 14 + (isPrimary ? 7 : 3) + breathe * (isPrimary ? 3 : 1.5);
      const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      glow.addColorStop(0, rgba(isPrimary ? palette.goldSoft : palette.aqua, isPrimary ? 0.16 : 0.07));
      glow.addColorStop(1, rgba(palette.aqua, 0));
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(point.x, point.y, radius, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = isPrimary ? rgba(palette.gold, 0.82) : isSecondary ? rgba(palette.aqua, 0.56) : rgba(palette.ink, 0.18);
    ctx.beginPath(); ctx.arc(point.x, point.y, baseRadius, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = rgba(palette.pearl, 0.72);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(point.x, point.y, baseRadius + 2.2, 0, Math.PI * 2); ctx.stroke();

    if (!model.primary && !reduced && !lowPower) {
      const phase = ((now * 0.00011) + index / METRICS.length) % 1;
      const alpha = 0.03 + Math.max(0, 0.10 - Math.abs(phase - 0.5) * 0.20);
      ctx.strokeStyle = rgba(palette.goldSoft, alpha);
      ctx.beginPath(); ctx.arc(point.x, point.y, baseRadius + 5 + breathe * 1.5, 0, Math.PI * 2); ctx.stroke();
    }
  });
}

function drawOnce(now) {
  if (!canvas || !ctx || !model) return;
  const start = performance.now();
  drawField(now);
  const elapsed = performance.now() - start;
  if (elapsed > 18) slowFrames += 1; else slowFrames = Math.max(0, slowFrames - 1);
  if (slowFrames >= 10 && !lowPower) {
    lowPower = true;
    slowFrames = 0;
    resizeCanvas();
  }
}

function animateLoop(now) {
  if (screen?.classList.contains('active') && document.visibilityState !== 'hidden' && !matchMedia('(prefers-reduced-motion: reduce)').matches) drawOnce(now);
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
    const nav = event.target?.closest?.('[data-nav="signals"]');
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
    // Fail open: the existing Signals placeholder remains usable if this enhancement cannot initialize.
  }
}
