const STYLE_ID = 'auren-archive-polish-build-29';
const STYLE_HREF = './src/css/archive-polish.css';
const METRICS = ['sleep', 'energy', 'stress', 'mood', 'movement'];

let monthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let active = false;
let checkins = [];
let profile = null;
let deps = null;
let refreshToken = 0;

const COPY = {
  en: {
    observed: 'Observed',
    recorded: 'Recorded',
    weightUpdate: 'Weight update',
    weightOnly: 'Weight only · no daily check-in',
    checkinAndWeight: 'Weight',
    recordedDays: 'recorded days',
    balancedDays: 'balanced',
    attentionDays: 'attention',
    noPattern: 'Not enough daily check-ins yet for a monthly pattern.',
    earlyPattern: 'Early history · Auren is keeping the month descriptive rather than inferring a trend.',
    cautious: (n) => `Cautious comparison · based on ${n} daily check-ins.`,
    earlyEvidence: (n) => `Early history · ${n} daily check-in${n === 1 ? '' : 's'}.`,
    onlyWeight: 'Only weight updates are available this month. Auren does not infer a daily state from weight alone.',
    monthSteady: 'No single change is strong enough to call out yet. Keep adding days and let the pattern earn its meaning.',
    stressDown: 'Stress was lower in the later part of the month than in the earlier part.',
    stressUp: 'Stress was higher in the later part of the month than in the earlier part.',
    energyUp: 'Energy was stronger in the later part of the month.',
    energyDown: 'Energy was lower in the later part of the month.',
    weightStable: 'Your saved weight measurements stayed broadly similar across the month.',
    weightChanged: 'Your saved weight measurements changed across the month. Auren keeps this descriptive rather than judging the direction.',
    calendarGuideTitle: 'A quiet memory, not a scorecard',
    calendarGuideCopy: 'A ring marks a day with a check-in. A small gold point marks a saved weight update. Empty days simply mean nothing was recorded.',
    legend: { balanced: 'Balanced', attention: 'Attention', mixed: 'Mixed', weight: 'Weight', empty: 'No data' },
    portraitEmptyTitle: 'Your health memory will grow here',
    portraitEmptyCopy: 'Daily check-ins and saved weight updates become a calm record of your own history — without streaks or scores.',
    dayObservedIntro: 'A record of what you reported that day.',
    dayWeightOnlyIntro: 'Only a weight update was saved on this day. No daily state is inferred.',
    evidenceObserved: 'Observed · five self-reported daily signals. This is personal context, not a diagnosis.',
    evidenceWeightOnly: 'Recorded · weight update only. Auren does not turn this single measurement into a daily-state judgment.',
    close: 'Close',
    state: { excellent: 'Excellent', balanced: 'Balanced', mixed: 'Mixed', low: 'Challenging', missing: 'No state' },
    metric: { sleep: 'Sleep', energy: 'Energy', stress: 'Stress', mood: 'Mood', movement: 'Movement' },
    level: { veryLow: 'Very low', low: 'Low', steady: 'Steady', high: 'High', excellent: 'Excellent', calm: 'Calm', light: 'Light', moderate: 'Moderate', highStress: 'High', veryHighStress: 'Very high' },
  },
  th: {
    observed: 'สิ่งที่สังเกต',
    recorded: 'ข้อมูลที่บันทึก',
    weightUpdate: 'บันทึกน้ำหนัก',
    weightOnly: 'มีเฉพาะน้ำหนัก · ไม่มีเช็กอินประจำวัน',
    checkinAndWeight: 'น้ำหนัก',
    recordedDays: 'วันที่มีข้อมูล',
    balancedDays: 'สมดุล',
    attentionDays: 'ควรใส่ใจ',
    noPattern: 'ยังมีเช็กอินประจำวันไม่พอสำหรับสรุปรูปแบบของเดือนนี้',
    earlyPattern: 'ประวัติยังอยู่ช่วงเริ่มต้น · Auren จึงเก็บเดือนนี้ไว้เชิงบรรยายก่อน ไม่รีบสรุปแนวโน้ม',
    cautious: (n) => `เปรียบเทียบอย่างระมัดระวัง · อ้างอิงจากเช็กอินประจำวัน ${n} วัน`,
    earlyEvidence: (n) => `ประวัติช่วงเริ่มต้น · มีเช็กอินประจำวัน ${n} วัน`,
    onlyWeight: 'เดือนนี้มีเฉพาะข้อมูลน้ำหนัก Auren จะไม่สรุปภาวะประจำวันจากน้ำหนักเพียงอย่างเดียว',
    monthSteady: 'ยังไม่มีการเปลี่ยนแปลงด้านใดเด่นพอให้สรุป เก็บข้อมูลต่ออีกเล็กน้อยเพื่อให้รูปแบบมีน้ำหนักจริง',
    stressDown: 'ช่วงหลังของเดือน ความเครียดที่รายงานต่ำกว่าช่วงแรก',
    stressUp: 'ช่วงหลังของเดือน ความเครียดที่รายงานสูงกว่าช่วงแรก',
    energyUp: 'ช่วงหลังของเดือน พลังงานที่รายงานสูงกว่าช่วงแรก',
    energyDown: 'ช่วงหลังของเดือน พลังงานที่รายงานต่ำกว่าช่วงแรก',
    weightStable: 'ค่าน้ำหนักที่บันทึกไว้โดยรวมใกล้เคียงกันตลอดเดือน',
    weightChanged: 'ค่าน้ำหนักที่บันทึกไว้มีการเปลี่ยนแปลงในเดือนนี้ Auren จะแสดงตามข้อมูลโดยไม่ตัดสินว่าทิศทางนั้นดีหรือไม่ดี',
    calendarGuideTitle: 'ความทรงจำที่สงบ ไม่ใช่ตารางคะแนน',
    calendarGuideCopy: 'วงแหวนหมายถึงวันที่มีเช็กอิน จุดสีทองเล็กๆ หมายถึงวันที่บันทึกน้ำหนัก ส่วนวันที่ว่างคือไม่มีข้อมูลเท่านั้น',
    legend: { balanced: 'สมดุล', attention: 'ควรใส่ใจ', mixed: 'ผสม', weight: 'น้ำหนัก', empty: 'ไม่มีข้อมูล' },
    portraitEmptyTitle: 'ความทรงจำสุขภาพของคุณจะค่อยๆ เติบโตตรงนี้',
    portraitEmptyCopy: 'เช็กอินประจำวันและข้อมูลน้ำหนักที่บันทึกไว้จะกลายเป็นประวัติส่วนตัวที่สงบ โดยไม่มี streak หรือคะแนน',
    dayObservedIntro: 'บันทึกจากสิ่งที่คุณรายงานในวันนั้น',
    dayWeightOnlyIntro: 'วันนี้มีเฉพาะข้อมูลน้ำหนัก จึงไม่มีการสรุปภาวะประจำวัน',
    evidenceObserved: 'สิ่งที่สังเกต · สัญญาณประจำวันที่คุณรายงานเอง 5 ด้าน เป็นบริบทส่วนตัว ไม่ใช่การวินิจฉัย',
    evidenceWeightOnly: 'ข้อมูลที่บันทึก · มีเฉพาะน้ำหนัก Auren จะไม่ใช้ค่าครั้งเดียวนี้ตัดสินภาวะของทั้งวัน',
    close: 'ปิด',
    state: { excellent: 'ดีเยี่ยม', balanced: 'สมดุล', mixed: 'ผสม', low: 'ค่อนข้างท้าทาย', missing: 'ไม่มีภาวะ' },
    metric: { sleep: 'การนอน', energy: 'พลังงาน', stress: 'ความเครียด', mood: 'อารมณ์', movement: 'การเคลื่อนไหว' },
    level: { veryLow: 'ต่ำมาก', low: 'ต่ำ', steady: 'ปานกลาง', high: 'สูง', excellent: 'ดีเยี่ยม', calm: 'สงบ', light: 'เล็กน้อย', moderate: 'ปานกลาง', highStress: 'สูง', veryHighStress: 'สูงมาก' },
  },
};

function locale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function copy() {
  return COPY[locale()];
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]));
}

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenArchive = 'build-29';
  document.head.appendChild(link);
}

function parseLocalDate(value) {
  const [y, m, d] = String(value).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function formatDate(date, options) {
  return new Intl.DateTimeFormat(locale() === 'th' ? 'th-TH' : 'en', options).format(date);
}

function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat(locale() === 'th' ? 'th-TH' : 'en', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(value);
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

function fallbackDailyState(checkin) {
  if (!checkin?.observations) return { status: 'missing', stress: 0 };
  const o = checkin.observations;
  const stress = Number(o.stress || 0);
  const positives = ['sleep', 'energy', 'mood', 'movement'].map((key) => Number(o[key] || 0));
  const avg = positives.reduce((sum, value) => sum + value, 0) / Math.max(1, positives.length);
  if (stress >= 4 || avg < 2.4) return { status: 'low', stress };
  if (avg >= 4.15 && stress <= 2) return { status: 'excellent', stress };
  if (avg >= 3.25 && stress <= 3) return { status: 'balanced', stress };
  return { status: 'mixed', stress };
}

function dailyState(checkin) {
  try {
    return deps?.dailyContext?.(checkin) || fallbackDailyState(checkin);
  } catch {
    return fallbackDailyState(checkin);
  }
}

function dailyTone(checkin) {
  const d = dailyState(checkin);
  if (d.status === 'missing') return 'empty';
  if (['excellent', 'balanced'].includes(d.status) && Number(d.stress) <= 3) return 'balanced';
  if (d.status === 'low' || Number(d.stress) >= 4) return 'attention';
  return 'mixed';
}

function dailyLabel(checkin) {
  const c = copy();
  const d = dailyState(checkin);
  return c.state[d.status] || c.state.mixed;
}

function weightHistory() {
  return Array.isArray(profile?.weightHistory) ? profile.weightHistory.filter((item) => item?.localDate && Number.isFinite(Number(item.weightKg))) : [];
}

function weightForDate(localDate) {
  return weightHistory().find((item) => item.localDate === localDate) || null;
}

function mergedRecords() {
  const byDate = new Map();
  checkins.forEach((checkin) => byDate.set(checkin.localDate, { localDate: checkin.localDate, checkin, weight: null }));
  weightHistory().forEach((weight) => {
    const current = byDate.get(weight.localDate) || { localDate: weight.localDate, checkin: null, weight: null };
    current.weight = weight;
    byDate.set(weight.localDate, current);
  });
  return [...byDate.values()].sort((a, b) => b.localDate.localeCompare(a.localDate));
}

function renderPortraits() {
  const c = copy();
  const grid = document.getElementById('portraitGrid');
  const empty = document.getElementById('archiveEmpty');
  if (!grid || !empty) return;
  const records = mergedRecords();
  empty.hidden = records.length > 0;
  const emptyTitle = document.getElementById('archiveEmptyTitle');
  const emptyCopy = document.getElementById('archiveEmptyCopy');
  if (emptyTitle) emptyTitle.textContent = c.portraitEmptyTitle;
  if (emptyCopy) emptyCopy.textContent = c.portraitEmptyCopy;
  if (!records.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = records.map((record) => {
    const date = parseLocalDate(record.localDate);
    if (!record.checkin) {
      return `<button class="portrait-card archive-memory-card card tone-weight-only" type="button" data-day="${record.localDate}" data-archive-day="${record.localDate}">
        <span class="portrait-memory-top"><span class="portrait-date">${escapeHtml(formatDate(date, { day:'numeric', month:'short' }))}</span><span class="portrait-provenance">${escapeHtml(c.recorded)}</span></span>
        <strong>${escapeHtml(c.weightUpdate)}</strong>
        <span class="portrait-weight-value">${escapeHtml(formatNumber(record.weight.weightKg))} kg</span>
        <span class="portrait-memory-note">${escapeHtml(c.weightOnly)}</span>
      </button>`;
    }

    const tone = dailyTone(record.checkin);
    const signature = METRICS.map((key) => {
      const value = Number(record.checkin.observations[key] || 0);
      const [, metricTone] = observationTone(key, value);
      const signalHeight = 5 + Math.max(1, Math.min(5, value)) * 3.2;
      return `<i class="portrait-signal tone-${metricTone}" style="--signal-height:${signalHeight}px" aria-hidden="true"></i>`;
    }).join('');
    const weight = record.weight ? `<span class="portrait-weight-inline"><i></i>${escapeHtml(c.checkinAndWeight)} ${escapeHtml(formatNumber(record.weight.weightKg))} kg</span>` : '';

    return `<button class="portrait-card archive-memory-card card tone-${tone}" type="button" data-day="${record.localDate}" data-archive-day="${record.localDate}">
      <span class="portrait-memory-top"><span class="portrait-date">${escapeHtml(formatDate(date, { day:'numeric', month:'short' }))}</span><span class="portrait-provenance">${escapeHtml(c.observed)}</span></span>
      <strong>${escapeHtml(dailyLabel(record.checkin))}</strong>
      <span class="portrait-signature" aria-hidden="true">${signature}</span>
      ${weight}
    </button>`;
  }).join('');
}

function monthData(date) {
  const prefix = `${monthKey(date)}-`;
  const monthCheckins = checkins.filter((item) => String(item.localDate).startsWith(prefix));
  const monthWeights = weightHistory().filter((item) => String(item.localDate).startsWith(prefix)).sort((a, b) => a.localDate.localeCompare(b.localDate));
  const recordDates = new Set([...monthCheckins.map((item) => item.localDate), ...monthWeights.map((item) => item.localDate)]);
  return { monthCheckins, monthWeights, recordDates };
}

function average(items, key) {
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + Number(item.observations?.[key] || 0), 0) / items.length;
}

function monthlyInsight(monthCheckins, monthWeights) {
  const c = copy();
  if (!monthCheckins.length) return monthWeights.length ? c.onlyWeight : c.noPattern;
  if (monthCheckins.length < 6) return c.earlyPattern;

  const sorted = monthCheckins.slice().sort((a, b) => a.localDate.localeCompare(b.localDate));
  const split = Math.floor(sorted.length / 2);
  const first = sorted.slice(0, split);
  const second = sorted.slice(split);
  if (first.length < 3 || second.length < 3) return c.earlyPattern;

  const stressDelta = average(second, 'stress') - average(first, 'stress');
  const energyDelta = average(second, 'energy') - average(first, 'energy');
  const candidates = [
    { magnitude: Math.abs(stressDelta), value: stressDelta, up: c.stressUp, down: c.stressDown },
    { magnitude: Math.abs(energyDelta), value: energyDelta, up: c.energyUp, down: c.energyDown },
  ].sort((a, b) => b.magnitude - a.magnitude);

  if (candidates[0]?.magnitude >= 0.65) return candidates[0].value > 0 ? candidates[0].up : candidates[0].down;

  if (monthWeights.length >= 2) {
    const delta = Math.abs(Number(monthWeights[monthWeights.length - 1].weightKg) - Number(monthWeights[0].weightKg));
    if (delta < 0.5) return c.weightStable;
    if (delta >= 0.5) return c.weightChanged;
  }
  return c.monthSteady;
}

function renderMonthSummary() {
  const c = copy();
  const { monthCheckins, monthWeights, recordDates } = monthData(monthCursor);
  const balanced = monthCheckins.filter((item) => dailyTone(item) === 'balanced').length;
  const attention = monthCheckins.filter((item) => dailyTone(item) === 'attention').length;
  const title = document.getElementById('monthSummaryTitle');
  const grid = document.getElementById('monthSummaryGrid');
  const insight = document.getElementById('monthSummaryInsight');
  const eyebrow = document.getElementById('monthSummaryEyebrow');
  if (!title || !grid || !insight) return;

  if (eyebrow) eyebrow.textContent = locale() === 'th' ? 'ความทรงจำประจำเดือน' : 'Monthly health memory';
  title.textContent = formatDate(monthCursor, { month:'long', year:'numeric' });
  grid.innerHTML = `<div><strong>${recordDates.size}</strong><span>${escapeHtml(c.recordedDays)}</span></div><div><strong>${balanced}</strong><span>${escapeHtml(c.balancedDays)}</span></div><div><strong>${attention}</strong><span>${escapeHtml(c.attentionDays)}</span></div>`;

  let evidence = c.noPattern;
  let meaning = c.noPattern;
  if (monthCheckins.length >= 6) {
    evidence = c.cautious(monthCheckins.length);
    meaning = monthlyInsight(monthCheckins, monthWeights);
  } else if (monthCheckins.length > 0) {
    evidence = c.earlyEvidence(monthCheckins.length);
    meaning = c.noPattern;
  } else if (monthWeights.length > 0) {
    evidence = `${monthWeights.length} ${locale() === 'th' ? 'บันทึกน้ำหนัก' : 'weight record' + (monthWeights.length === 1 ? '' : 's')}`;
    meaning = c.onlyWeight;
  }
  insight.innerHTML = `<span class="month-evidence-line">${escapeHtml(evidence)}</span><strong>${escapeHtml(meaning)}</strong>`;
}

function renderCalendar() {
  const c = copy();
  const { monthCheckins, monthWeights } = monthData(monthCursor);
  const checkinMap = new Map(monthCheckins.map((item) => [item.localDate, item]));
  const weightMap = new Map(monthWeights.map((item) => [item.localDate, item]));
  const title = document.getElementById('calendarMonthTitle');
  const sub = document.getElementById('calendarMonthSub');
  const weekdays = document.getElementById('calendarWeekdays');
  const grid = document.getElementById('calendarGrid');
  const legend = document.getElementById('calendarLegend');
  if (!title || !sub || !weekdays || !grid || !legend) return;

  title.textContent = formatDate(monthCursor, { month:'long', year:'numeric' });
  sub.textContent = `${monthCheckins.length} ${locale() === 'th' ? 'เช็กอิน' : 'check-ins'} · ${monthWeights.length} ${locale() === 'th' ? 'บันทึกน้ำหนัก' : 'weight records'}`;

  const weekBase = new Date(2026, 7, 23);
  weekdays.innerHTML = Array.from({ length:7 }, (_, i) => `<span>${new Intl.DateTimeFormat(locale() === 'th' ? 'th-TH' : 'en', { weekday:'narrow' }).format(new Date(weekBase.getFullYear(), weekBase.getMonth(), weekBase.getDate() + i))}</span>`).join('');

  const first = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
  const last = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0);
  const cells = [];
  for (let i = 0; i < first.getDay(); i += 1) cells.push('<span class="calendar-day blank" aria-hidden="true"></span>');
  for (let day = 1; day <= last.getDate(); day += 1) {
    const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day);
    const key = dateKey(date);
    const checkin = checkinMap.get(key) || null;
    const weight = weightMap.get(key) || null;
    const tone = checkin ? dailyTone(checkin) : 'empty';
    const hasRecord = Boolean(checkin || weight);
    const isToday = key === dateKey();
    cells.push(`<button class="calendar-day archive-calendar-day tone-${tone}${isToday ? ' today' : ''}${weight && !checkin ? ' weight-only' : ''}" type="button" data-day="${key}" data-archive-day="${key}" ${hasRecord ? '' : 'disabled'}><span>${day}</span>${checkin ? '<i></i>' : ''}${weight ? '<b></b>' : ''}</button>`);
  }
  grid.innerHTML = cells.join('');
  legend.innerHTML = `<span class="legend-balanced"><i></i>${escapeHtml(c.legend.balanced)}</span><span class="legend-attention"><i></i>${escapeHtml(c.legend.attention)}</span><span class="legend-mixed"><i></i>${escapeHtml(c.legend.mixed)}</span><span class="legend-weight"><i></i>${escapeHtml(c.legend.weight)}</span><span class="legend-empty"><i></i>${escapeHtml(c.legend.empty)}</span>`;

  const guideTitle = document.getElementById('calendarGuideTitle');
  const guideCopy = document.getElementById('calendarGuideCopy');
  if (guideTitle) guideTitle.textContent = c.calendarGuideTitle;
  if (guideCopy) guideCopy.textContent = c.calendarGuideCopy;
}

function renderArchive() {
  const screen = document.querySelector('[data-screen="archive"]');
  if (!screen) return;
  screen.classList.add('archive-polished');
  renderPortraits();
  renderMonthSummary();
  renderCalendar();
}


function ensureDayDetailControls(modal, label) {
  if (!(modal instanceof HTMLElement)) return;
  const sheet = modal.querySelector('.day-detail-sheet');
  const bottom = document.getElementById('closeDayDetailBtn');
  if (bottom) {
    bottom.textContent = label;
    bottom.setAttribute('aria-label', label);
  }
  if (!(sheet instanceof HTMLElement)) return;
  let top = document.getElementById('archiveDayDetailCloseTop');
  if (!top) {
    top = document.createElement('button');
    top.id = 'archiveDayDetailCloseTop';
    top.className = 'archive-day-detail-close-top';
    top.type = 'button';
    top.innerHTML = '<span aria-hidden="true">×</span>';
    const handle = sheet.querySelector('.sheet-handle');
    if (handle?.nextSibling) sheet.insertBefore(top, handle.nextSibling);
    else sheet.prepend(top);
    top.addEventListener('click', () => {
      const canonical = document.getElementById('closeDayDetailBtn');
      if (canonical) canonical.click();
      else modal.classList.remove('open');
    });
  }
  top.setAttribute('aria-label', label);
  top.setAttribute('title', label);
}

function openDayDetail(localDate) {
  const c = copy();
  const checkin = checkins.find((item) => item.localDate === localDate) || null;
  const weight = weightForDate(localDate);
  if (!checkin && !weight) return;

  const modal = document.getElementById('dayDetailModal');
  const eyebrow = document.getElementById('dayDetailEyebrow');
  const title = document.getElementById('dayDetailTitle');
  const intro = document.getElementById('dayDetailIntro');
  const state = document.getElementById('dayDetailState');
  const metrics = document.getElementById('dayDetailMetrics');
  const weightBox = document.getElementById('dayDetailWeight');
  const evidence = document.getElementById('dayDetailEvidence');
  if (!modal || !title || !intro || !state || !metrics || !weightBox || !evidence) return;

  modal.dataset.aurenArchivePolish = '1';
  ensureDayDetailControls(modal, c.close);
  if (eyebrow) eyebrow.textContent = locale() === 'th' ? 'บันทึกประจำวัน' : 'Daily health memory';
  title.textContent = formatDate(parseLocalDate(localDate), { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  intro.textContent = checkin ? c.dayObservedIntro : c.dayWeightOnlyIntro;

  state.hidden = !checkin;
  if (checkin) {
    state.className = `day-detail-state tone-${dailyTone(checkin)}`;
    state.textContent = dailyLabel(checkin);
    metrics.innerHTML = METRICS.map((key) => {
      const value = Number(checkin.observations[key] || 0);
      const [labelKey, tone] = observationTone(key, value);
      const pct = Math.max(0, Math.min(100, ((value - 1) / 4) * 100));
      return `<div class="day-metric archive-day-metric tone-${tone}">
        <div class="archive-day-metric-copy"><span>${escapeHtml(c.metric[key])}</span><strong>${escapeHtml(c.level[labelKey])}</strong><em>${value}/5 · ${escapeHtml(c.observed)}</em></div>
        <div class="archive-day-meter" data-metric="${key}" style="--archive-day-fill:${pct}%"><i></i><b></b></div>
      </div>`;
    }).join('');
  } else {
    metrics.innerHTML = '';
  }

  weightBox.hidden = !weight;
  weightBox.innerHTML = weight ? `<span>${escapeHtml(c.weightUpdate)}</span><strong>${escapeHtml(formatNumber(weight.weightKg))} kg</strong>` : '';
  evidence.textContent = checkin ? c.evidenceObserved : c.evidenceWeightOnly;
  modal.classList.add('open');
}

async function loadData() {
  if (!deps) {
    const [checkinModule, profileModule, bodyModule] = await Promise.all([
      import('../storage/checkins.js'),
      import('../storage/profile.js'),
      import('../intelligence/body.js'),
    ]);
    deps = {
      getAllCheckins: checkinModule.getAllCheckins,
      getBodyProfile: profileModule.getBodyProfile,
      dailyContext: bodyModule.dailyContext,
    };
  }
  const [nextCheckins, nextProfile] = await Promise.all([
    deps.getAllCheckins().catch(() => []),
    deps.getBodyProfile().catch(() => null),
  ]);
  checkins = Array.isArray(nextCheckins) ? nextCheckins : [];
  profile = nextProfile || null;
}

async function refresh() {
  const token = ++refreshToken;
  try {
    await loadData();
    if (token !== refreshToken) return;
    renderArchive();
  } catch (error) {
    console.error('Auren Archive refresh unavailable', error);
  }
}

function archiveIsActive() {
  return document.querySelector('[data-screen="archive"]')?.classList.contains('active');
}

function scheduleRefresh() {
  requestAnimationFrame(() => requestAnimationFrame(() => refresh()));
}

function onClick(event) {
  const day = event.target?.closest?.('[data-archive-day]');
  if (day?.dataset.archiveDay) {
    event.preventDefault();
    openDayDetail(day.dataset.archiveDay);
    return;
  }

  if (event.target?.closest?.('#calendarPrev')) {
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1);
    scheduleRefresh();
    return;
  }
  if (event.target?.closest?.('#calendarNext')) {
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1);
    scheduleRefresh();
    return;
  }
  if (event.target?.closest?.('#archivePortraitsBtn, #archiveCalendarBtn, [data-nav="archive"]')) scheduleRefresh();
}

function init() {
  if (active) return;
  active = true;
  installStylesheet();
  document.addEventListener('click', onClick, false);
  document.addEventListener('auren:data-refreshed', scheduleRefresh);
  if (archiveIsActive()) refresh();
}

init();
