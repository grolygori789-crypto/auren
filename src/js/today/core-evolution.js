const STYLE_ID = 'auren-core-evolution-build-39';
const STYLE_HREF = './src/css/core-evolution.css';
const TODAY_SCREEN = '[data-screen="today"]';
const ORB_WRAP = '#todayOrbWrap';
const STATE_IDS = ['stateKicker', 'stateTitle', 'stateCopy'];

const STATE_KEYWORDS = {
  balanced: [
    'balanced', 'clear', 'steady', 'grounded', 'stable', 'ready', 'good', 'calm', 'aligned', 'settled',
    'สมดุล', 'นิ่ง', 'พร้อม', 'มั่นคง', 'สบาย', 'ชัด', 'ลงตัว', 'สงบ'
  ],
  attention: [
    'attention', 'caution', 'care', 'watch', 'recover', 'reset', 'rest', 'strain', 'stress', 'low', 'fatigue', 'drained', 'support',
    'ระวัง', 'พัก', 'ฟื้น', 'ล้า', 'ตึง', 'เครียด', 'ต่ำ', 'ดูแล', 'เฝ้าดู', 'กังวล'
  ],
  learning: [
    'learning', 'observing', 'forming', 'emerging', 'becoming', 'tuning', 'baseline',
    'กำลังเรียนรู้', 'เรียนรู้', 'สังเกต', 'เริ่ม', 'ค่อยๆ', 'ค่อย', 'ก่อตัว', 'ตั้งต้น'
  ]
};

let responseTimer = 0;
let syncQueued = false;
let shellObserver = null;
let stateObserver = null;
let boundClick = false;
let lastFingerprint = '';
let lastMood = '';

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenCoreEvolution = 'build-39';
  document.head.appendChild(link);
}

function getTodayScreen() {
  return document.querySelector(TODAY_SCREEN);
}

function getWrap() {
  return document.querySelector(ORB_WRAP);
}

function ensureLayers() {
  const wrap = getWrap();
  if (!wrap) return null;

  wrap.classList.add('today-orb-evolved');
  if (wrap.dataset.coreEvolutionReady === 'true') return wrap;
  wrap.dataset.coreEvolutionReady = 'true';

  const layerSpecs = [
    ['today-orb-glow', 'glow'],
    ['today-orb-breath', 'breath'],
    ['today-orb-flow flow-one', 'flowOne'],
    ['today-orb-flow flow-two', 'flowTwo'],
    ['today-orb-shimmer', 'shimmer'],
    ['today-orb-response', 'response']
  ];

  for (const [className, part] of layerSpecs) {
    const node = document.createElement('span');
    node.className = className;
    node.dataset.corePart = part;
    node.setAttribute('aria-hidden', 'true');
    wrap.appendChild(node);
  }

  return wrap;
}

function textFingerprint() {
  return STATE_IDS.map((id) => document.getElementById(id)?.textContent?.trim() || '').join(' | ');
}

function determineMood() {
  const source = textFingerprint().toLowerCase();
  if (!source) return 'learning';

  const hasKeyword = (group) => STATE_KEYWORDS[group].some((term) => source.includes(term.toLowerCase()));
  if (hasKeyword('attention')) return 'attention';
  if (hasKeyword('balanced')) return 'balanced';
  if (hasKeyword('learning')) return 'learning';
  return 'learning';
}

function triggerResponse() {
  const wrap = ensureLayers();
  if (!wrap) return;
  wrap.classList.remove('is-responding');
  void wrap.offsetWidth;
  wrap.classList.add('is-responding');
  clearTimeout(responseTimer);
  responseTimer = window.setTimeout(() => wrap.classList.remove('is-responding'), 1450);
}

function applyMood({ allowResponse = false } = {}) {
  const wrap = ensureLayers();
  if (!wrap) return false;

  const fingerprint = textFingerprint();
  const mood = determineMood();
  const changed = fingerprint !== lastFingerprint || mood !== lastMood;

  if (wrap.dataset.orbMood !== mood) wrap.dataset.orbMood = mood;
  lastFingerprint = fingerprint;
  lastMood = mood;

  if (allowResponse && changed && fingerprint) triggerResponse();
  return true;
}

function scheduleSync(options = {}) {
  if (syncQueued) return;
  syncQueued = true;
  requestAnimationFrame(() => {
    syncQueued = false;
    applyMood(options);
  });
}

function bindCheckinReaction() {
  if (boundClick) return;
  const checkin = document.getElementById('checkinBtn');
  if (!checkin) return;
  checkin.addEventListener('click', () => {
    window.setTimeout(() => scheduleSync({ allowResponse: true }), 40);
    window.setTimeout(() => scheduleSync({ allowResponse: true }), 800);
  }, { passive: true });
  boundClick = true;
}

function watchState() {
  const today = getTodayScreen();
  if (!today) return;
  if (stateObserver) stateObserver.disconnect();

  stateObserver = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      if (mutation.type === 'characterData') return true;
      if (mutation.type === 'attributes') return true;
      return mutation.addedNodes.length || mutation.removedNodes.length;
    });
    if (relevant) scheduleSync({ allowResponse: true });
  });

  stateObserver.observe(today, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'hidden']
  });
}

function initShellObserver() {
  if (shellObserver) return;
  shellObserver = new MutationObserver(() => {
    if (!ensureLayers()) return;
    bindCheckinReaction();
    watchState();
    scheduleSync({ allowResponse: false });
  });
  shellObserver.observe(document.body, { childList: true, subtree: true });
}

function init() {
  installStylesheet();
  ensureLayers();
  bindCheckinReaction();
  watchState();
  scheduleSync({ allowResponse: false });
  initShellObserver();
}

try {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
} catch (error) {
  console.error('Auren Today Core evolution unavailable', error);
}
