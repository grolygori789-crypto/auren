const STYLE_ID = 'auren-you-polish-build-32';
const STYLE_HREF = './src/css/you-polish.css';
const SCREEN_SELECTOR = '[data-screen="you"]';

const COPY = {
  en: {
    bodyTitle: 'Body & understanding',
    bodyNote: 'The context Auren uses — and how it explains it.',
    preferencesTitle: 'Preferences',
    preferencesNote: 'Language, atmosphere and motion.',
    privacyTitle: 'Privacy & access',
    privacyNote: 'Local by design. You stay in control.',
    aboutTitle: 'About',
    aboutNote: 'Product identity and current build.',
    localStatus: 'Local-first',
  },
  th: {
    bodyTitle: 'บริบทและความเข้าใจ',
    bodyNote: 'ข้อมูลที่ Auren ใช้ พร้อมคำอธิบายที่ตรวจสอบได้',
    preferencesTitle: 'การตั้งค่า',
    preferencesNote: 'ภาษา บรรยากาศ และการเคลื่อนไหว',
    privacyTitle: 'ความเป็นส่วนตัวและการเข้าถึง',
    privacyNote: 'เก็บในอุปกรณ์เป็นหลัก และคุณเป็นผู้ควบคุม',
    aboutTitle: 'เกี่ยวกับ Auren',
    aboutNote: 'ตัวตนของผลิตภัณฑ์และ Build ปัจจุบัน',
    localStatus: 'Local-first',
  },
};

function locale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenYou = 'build-32';
  document.head.appendChild(link);
}

function closestSetting(id) {
  return document.getElementById(id)?.closest('.setting') || null;
}

function createGroup(key, nodes) {
  const section = document.createElement('section');
  section.className = `you-group you-group-${key}`;
  section.dataset.youGroup = key;

  const headingId = `youGroup-${key}-title`;
  const head = document.createElement('div');
  head.className = 'you-group-head';
  head.innerHTML = `<div><h2 id="${headingId}" data-you-copy="${key}Title"></h2><p data-you-copy="${key}Note"></p></div>`;
  section.setAttribute('aria-labelledby', headingId);

  const surface = document.createElement('div');
  surface.className = 'you-group-surface';

  nodes.filter(Boolean).forEach((node) => surface.appendChild(node));
  section.append(head, surface);
  return section;
}

function syncPrivacySummary(screen) {
  const privacyAnchor = document.getElementById('privacyTitle')?.closest('.setting');
  const hasControls = Boolean(document.getElementById('dataControlsBtn'));
  privacyAnchor?.classList.toggle('you-privacy-summary-redundant', hasControls);
}

function simplifyBuildLabel() {
  const buildText = document.getElementById('buildText');
  if (!buildText) return;
  const match = String(buildText.textContent || '').match(/\bBuild\s+\d+\b/i);
  if (!match) return;
  const number = match[0].match(/\d+/)?.[0];
  if (number) buildText.textContent = `Build ${number}`;
}

function openAboutAuren() {
  if (window.AurenLegalCenter?.open) {
    window.AurenLegalCenter.open('about');
    return;
  }
  // Fail open to the complete Legal Center if its public API is unavailable.
  document.getElementById('legalCenterBtn')?.click();
}

function installSettingSemantics(motion, noAccount, about) {
  if (motion) {
    motion.classList.add('you-status-row', 'you-motion-status');
    motion.querySelector('.end')?.classList.add('you-status-pill');
  }

  if (noAccount) {
    noAccount.classList.add('you-status-row', 'you-account-status');
    let status = noAccount.querySelector('[data-you-local-status]');
    if (!status) {
      status = document.createElement('div');
      status.className = 'end you-status-pill';
      status.dataset.youLocalStatus = 'true';
      status.dataset.youCopy = 'localStatus';
      noAccount.appendChild(status);
    }
  }

  if (about) {
    about.classList.add('you-about-action');
    about.setAttribute('role', 'button');
    about.tabIndex = 0;

    if (about.dataset.youAboutBound !== 'true') {
      about.dataset.youAboutBound = 'true';
      about.addEventListener('click', openAboutAuren);
      about.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openAboutAuren();
      });
    }
  }
}

function syncAboutLabel() {
  const about = document.getElementById('aboutTitle')?.closest('.you-about-action');
  const title = document.getElementById('aboutTitle')?.textContent?.trim();
  if (about && title) about.setAttribute('aria-label', title);
}

function applyCopy(screen) {
  const c = COPY[locale()];
  screen.querySelectorAll('[data-you-copy]').forEach((node) => {
    const value = c[node.dataset.youCopy];
    if (value) node.textContent = value;
  });
  simplifyBuildLabel();
  syncAboutLabel();
}

function installStructure() {
  const screen = document.querySelector(SCREEN_SELECTOR);
  const list = screen?.querySelector('.settings-list');
  if (!screen || !list) return false;

  if (screen.dataset.youPolished === '32') {
    applyCopy(screen);
    return true;
  }

  const bodyProfile = document.getElementById('bodyProfileBtn');
  const howWorks = document.getElementById('howAurenWorksBtn');
  const language = closestSetting('languageTitle');
  const appearance = closestSetting('appearanceTitle');
  const themeGrid = document.getElementById('themeGrid');
  const motion = closestSetting('motionTitle');
  const privacyAnchor = closestSetting('privacyTitle');
  const dataControls = document.getElementById('dataControlsBtn');
  const noAccount = closestSetting('noAccountTitle');
  const about = closestSetting('aboutTitle');
  const buildText = document.getElementById('buildText');

  if (!bodyProfile || !howWorks || !language || !appearance || !themeGrid || !motion || !noAccount || !about || !buildText) return false;

  // Build 14 creates the real Data Controls action after the static privacy row.
  // Keep the static row only as a fail-open fallback if that action is unavailable.
  if (privacyAnchor && dataControls) privacyAnchor.classList.add('you-privacy-summary-redundant');

  installSettingSemantics(motion, noAccount, about);

  const groups = [
    createGroup('body', [bodyProfile, howWorks]),
    createGroup('preferences', [language, appearance, themeGrid, motion]),
    createGroup('privacy', [privacyAnchor, dataControls, noAccount]),
    createGroup('about', [about, buildText]),
  ];

  list.replaceChildren(...groups);
  screen.dataset.youPolished = '32';
  screen.classList.add('you-polished');
  applyCopy(screen);
  syncPrivacySummary(screen);

  const privacySurface = screen.querySelector('.you-group-privacy .you-group-surface');
  if (privacySurface) {
    const privacyObserver = new MutationObserver(() => syncPrivacySummary(screen));
    privacyObserver.observe(privacySurface, { childList: true });
  }
  return true;
}

function init() {
  installStylesheet();

  // Data Controls is an independent fail-open module. Give it one frame to finish
  // inserting its action before we group the You surface, without ever blocking You.
  requestAnimationFrame(() => {
    if (!installStructure()) requestAnimationFrame(installStructure);
  });

  const observer = new MutationObserver(() => {
    const screen = document.querySelector(SCREEN_SELECTOR);
    if (screen?.dataset.youPolished === '32') applyCopy(screen);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

init();
