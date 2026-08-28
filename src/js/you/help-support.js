import { BUILD_NUMBER } from '../config/build.js';

const STYLE_ID = 'auren-help-support-build-37';
const STYLE_HREF = './src/css/help-support.css';
const SCREEN_SELECTOR = '[data-screen="you"]';

const SUPPORT_EMAIL = 'benedict.support@gmail.com';
const KOFI_URL = 'https://ko-fi.com/benedictinteractive';
const PROMPTPAY_QR_URL = 'https://raw.githubusercontent.com/grolygori789-crypto/little-ganesha-tarot/main/assets/support/promptpay-qr.png';
const QR_FILENAME = 'auren-promptpay-qr.png';
const PROMPTPAY_RECIPIENT_TH = 'จักรพันธ์ เบญจศุภนิมิต';
const PROMPTPAY_RECIPIENT_EN = 'Jakraphan Benjasupanimit';

const COPY = {
  en: {
    helpTitle: 'Help & feedback',
    helpNote: 'Tell us what broke — or what could be better.',
    reportTitle: 'Report a problem',
    reportSub: 'Private email draft · safe diagnostics',
    feedbackTitle: 'Send feedback',
    feedbackSub: 'Ideas, suggestions and product thoughts',
    supportTitle: 'Support Auren',
    supportNote: 'Optional support for independent development.',
    thailandTitle: 'Support in Thailand',
    thailandSub: 'PromptPay · scan or open QR',
    worldwideTitle: 'Support worldwide',
    worldwideSub: 'Ko-fi · support Benedict Interactive',
    emailBadge: 'EMAIL',
    promptPayBadge: 'PROMPTPAY',
    kofiBadge: 'KO-FI',

    reportEyebrow: 'HELP & FEEDBACK',
    reportSheetTitle: 'Report a problem',
    reportLead: 'Tell us what happened. Auren can include a small technical diagnostic block to make troubleshooting easier.',
    feedbackSheetTitle: 'Send feedback',
    feedbackLead: 'Share an idea, suggestion or something that could feel better. Technical diagnostics are optional for feedback.',
    descriptionLabel: 'YOUR MESSAGE',
    reportPlaceholder: 'What happened? What were you trying to do?',
    feedbackPlaceholder: 'What would you like Auren to improve or explore?',
    diagnosticsLabel: 'Include safe diagnostics',
    diagnosticsReportHelp: 'On by default for problem reports.',
    diagnosticsFeedbackHelp: 'Off by default for general feedback.',
    diagnosticsPreview: 'DIAGNOSTIC PREVIEW',
    privacyWarning: 'Please do not include health details, passwords, payment information, profile photos or private check-in history.',
    emailAction: 'Open email draft',
    copyAction: 'Copy report',
    copyFeedbackAction: 'Copy feedback',
    copyDiagnostics: 'Copy diagnostics',
    copied: 'Copied.',
    needMessage: 'Add a short message first.',
    mailFallback: 'If no email app opens, copy the message and send it to',
    contactLabel: 'Benedict Interactive Support',
    close: 'Close',

    thailandEyebrow: 'SUPPORT IN THAILAND',
    thailandSheetTitle: 'Support Auren with PromptPay',
    thailandLead: 'If Auren is useful to you, you can help support its independent development with PromptPay.',
    promptPayLabel: 'PROMPTPAY',
    recipientLabel: 'RECIPIENT',
    qrLoading: 'Loading secure QR…',
    qrUnavailable: 'The QR could not be loaded here.',
    qrOpen: 'Open / save QR',
    qrSaving: 'Preparing QR…',
    qrSaved: 'QR image prepared.',
    verifyRecipient: 'Please verify the recipient name shown in your banking app before confirming any payment.',
    samePhoneHint: 'On the same phone, save or open the QR first, then select it from your banking app.',
    thailandPrivacy: 'The QR is loaded only after you open this support page. Auren does not attach profile or health data to the request.',
    optionalSupport: 'Support is always optional and never changes Auren’s intelligence, recommendations or feature access.',

    worldwideEyebrow: 'WORLDWIDE SUPPORT',
    worldwideSheetTitle: 'Support Auren worldwide',
    worldwideLead: 'You can support continued development through Benedict Interactive on Ko-fi.',
    providerLabel: 'KO-FI',
    providerTitle: 'Support Benedict Interactive',
    providerBody: 'Your support helps fund continued development, refinement and testing of Auren.',
    externalNote: 'Ko-fi opens outside Auren. Payment and account information are handled by Ko-fi, and Auren does not receive payment details or confirmation.',
    continueKofi: 'Continue to Ko-fi',
    worldwideThanks: 'Thank you for helping an independent project keep improving with care.',
    backToYou: 'Back to You'
  },

  th: {
    helpTitle: 'ความช่วยเหลือและความคิดเห็น',
    helpNote: 'แจ้งปัญหา หรือบอกเราว่าอะไรควรดีขึ้น',
    reportTitle: 'รายงานปัญหา',
    reportSub: 'ร่างอีเมลส่วนตัว · ข้อมูลเทคนิคที่ปลอดภัย',
    feedbackTitle: 'ส่งความคิดเห็น',
    feedbackSub: 'ไอเดีย ข้อเสนอแนะ และความเห็นต่อผลิตภัณฑ์',
    supportTitle: 'สนับสนุน Auren',
    supportNote: 'การสนับสนุนโดยสมัครใจเพื่อการพัฒนาอย่างอิสระ',
    thailandTitle: 'สนับสนุนในประเทศไทย',
    thailandSub: 'PromptPay · สแกนหรือเปิด QR',
    worldwideTitle: 'สนับสนุนจากทั่วโลก',
    worldwideSub: 'Ko-fi · สนับสนุน Benedict Interactive',
    emailBadge: 'อีเมล',
    promptPayBadge: 'PROMPTPAY',
    kofiBadge: 'KO-FI',

    reportEyebrow: 'ความช่วยเหลือและความคิดเห็น',
    reportSheetTitle: 'รายงานปัญหา',
    reportLead: 'บอกเราว่าเกิดอะไรขึ้น Auren สามารถแนบข้อมูลเทคนิคเล็กน้อยที่ปลอดภัยเพื่อช่วยตรวจสอบปัญหาได้',
    feedbackSheetTitle: 'ส่งความคิดเห็น',
    feedbackLead: 'ส่งไอเดีย ข้อเสนอแนะ หรือสิ่งที่อยากให้ Auren ทำได้ดีขึ้น โดยข้อมูลเทคนิคเป็นตัวเลือกสำหรับความคิดเห็นทั่วไป',
    descriptionLabel: 'ข้อความของคุณ',
    reportPlaceholder: 'เกิดอะไรขึ้น และตอนนั้นกำลังพยายามทำอะไร?',
    feedbackPlaceholder: 'อยากให้ Auren ปรับปรุงหรือพัฒนาอะไรต่อ?',
    diagnosticsLabel: 'แนบข้อมูลเทคนิคที่ปลอดภัย',
    diagnosticsReportHelp: 'เปิดไว้เป็นค่าเริ่มต้นสำหรับการรายงานปัญหา',
    diagnosticsFeedbackHelp: 'ปิดไว้เป็นค่าเริ่มต้นสำหรับความคิดเห็นทั่วไป',
    diagnosticsPreview: 'ตัวอย่างข้อมูลเทคนิค',
    privacyWarning: 'โปรดอย่าใส่ข้อมูลสุขภาพ รหัสผ่าน ข้อมูลการชำระเงิน รูปโปรไฟล์ หรือประวัติเช็กอินส่วนตัว',
    emailAction: 'เปิดร่างอีเมล',
    copyAction: 'คัดลอกรายงาน',
    copyFeedbackAction: 'คัดลอกความคิดเห็น',
    copyDiagnostics: 'คัดลอกข้อมูลเทคนิค',
    copied: 'คัดลอกแล้ว',
    needMessage: 'กรุณาเขียนข้อความสั้นๆ ก่อน',
    mailFallback: 'ถ้าแอปอีเมลไม่เปิด สามารถคัดลอกข้อความแล้วส่งไปที่',
    contactLabel: 'Benedict Interactive Support',
    close: 'ปิด',

    thailandEyebrow: 'สนับสนุนในประเทศไทย',
    thailandSheetTitle: 'สนับสนุน Auren ผ่าน PromptPay',
    thailandLead: 'ถ้า Auren เป็นประโยชน์กับคุณ สามารถร่วมสนับสนุนการพัฒนาโปรเจกต์อิสระนี้ผ่าน PromptPay ได้',
    promptPayLabel: 'PROMPTPAY',
    recipientLabel: 'ชื่อผู้รับ',
    qrLoading: 'กำลังโหลด QR…',
    qrUnavailable: 'ไม่สามารถโหลด QR ในหน้านี้ได้',
    qrOpen: 'เปิด / บันทึก QR',
    qrSaving: 'กำลังเตรียม QR…',
    qrSaved: 'เตรียมภาพ QR แล้ว',
    verifyRecipient: 'กรุณาตรวจสอบชื่อผู้รับที่แสดงในแอปธนาคารก่อนยืนยันการโอนทุกครั้ง',
    samePhoneHint: 'ถ้าใช้โทรศัพท์เครื่องเดียวกัน ให้เปิดหรือบันทึก QR ก่อน แล้วเลือกภาพจากแกลเลอรีในแอปธนาคาร',
    thailandPrivacy: 'QR จะถูกโหลดเมื่อคุณเปิดหน้าสนับสนุนนี้เท่านั้น Auren จะไม่แนบข้อมูลโปรไฟล์หรือข้อมูลสุขภาพไปกับคำขอ',
    optionalSupport: 'การสนับสนุนเป็นทางเลือกเสมอ และไม่มีผลต่อความฉลาด คำแนะนำ หรือสิทธิ์ใช้งานฟีเจอร์ของ Auren',

    worldwideEyebrow: 'สนับสนุนจากทั่วโลก',
    worldwideSheetTitle: 'สนับสนุน Auren จากทั่วโลก',
    worldwideLead: 'สามารถร่วมสนับสนุนการพัฒนา Auren ต่อผ่าน Benedict Interactive บน Ko-fi',
    providerLabel: 'KO-FI',
    providerTitle: 'สนับสนุน Benedict Interactive',
    providerBody: 'ทุกการสนับสนุนช่วยให้ Auren ได้รับการพัฒนา ปรับปรุง และทดสอบต่ออย่างต่อเนื่อง',
    externalNote: 'ระบบจะเปิด Ko-fi ภายนอก Auren การชำระเงินและข้อมูลบัญชีดำเนินการบน Ko-fi โดยตรง และ Auren จะไม่ได้รับรายละเอียดหรือสถานะการชำระเงิน',
    continueKofi: 'ไปยัง Ko-fi',
    worldwideThanks: 'ขอบคุณที่ช่วยให้โปรเจกต์อิสระนี้พัฒนาต่ออย่างตั้งใจ',
    backToYou: 'กลับไปหน้า You'
  }
};

let overlay = null;
let overlayContent = null;
let activeView = null;
let previousFocus = null;
let previousAppInert = false;
let previousAriaHidden = null;

function locale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function t(key) {
  return COPY[locale()][key] || COPY.en[key] || key;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenHelpSupport = 'build-37';
  document.head.appendChild(link);
}

function iconSvg(kind) {
  if (kind === 'bug') return '<svg viewBox="0 0 24 24"><path d="M8.5 8.5h7v7h-7z"/><path d="M9 5.5 7.4 4M15 5.5 16.6 4M5.5 9H3M5.5 13H3M18.5 9H21M18.5 13H21M9 18.5 7.4 20M15 18.5l1.6 1.5"/></svg>';
  if (kind === 'feedback') return '<svg viewBox="0 0 24 24"><path d="M5 5.5h14v10H9l-4 3z"/><path d="M8.5 9h7M8.5 12h4.5"/></svg>';
  if (kind === 'thai') return '<svg viewBox="0 0 24 24"><path d="M7 4.5h10v15H7z"/><path d="M9.5 8.2h5M9.5 11.5h5M9.5 14.8h3.4"/></svg>';
  return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><path d="M4.8 12h14.4M12 4.5c2.2 2.3 3.2 4.8 3.2 7.5S14.2 17.2 12 19.5M12 4.5C9.8 6.8 8.8 9.3 8.8 12s1 5.2 3.2 7.5"/></svg>';
}

function createActionRow({ id, action, icon, titleKey, subKey, badgeKey, support = false }) {
  const button = document.createElement('button');
  button.id = id;
  button.type = 'button';
  button.className = `setting setting-button you-contact-action${support ? ' you-support-route' : ''}`;
  button.dataset.helpAction = action;
  button.innerHTML = `
    <div class="soft-icon you-contact-icon" aria-hidden="true">${iconSvg(icon)}</div>
    <div class="you-contact-copy">
      <strong data-help-copy="${titleKey}"></strong>
      <span data-help-copy="${subKey}"></span>
    </div>
    <div class="end you-contact-end">
      <small class="you-contact-provider" data-help-copy="${badgeKey}"></small>
      <span class="you-contact-chevron" aria-hidden="true">›</span>
    </div>`;
  return button;
}

function createGroup(key, titleKey, noteKey, rows) {
  const section = document.createElement('section');
  section.className = `you-group you-group-${key} you-contact-group`;
  section.dataset.youContactGroup = key;

  const titleId = `youContact-${key}-title`;
  const head = document.createElement('div');
  head.className = 'you-group-head';
  head.innerHTML = `<div><h2 id="${titleId}" data-help-copy="${titleKey}"></h2><p data-help-copy="${noteKey}"></p></div>`;
  section.setAttribute('aria-labelledby', titleId);

  const surface = document.createElement('div');
  surface.className = 'you-group-surface';
  rows.forEach((row) => surface.appendChild(row));
  section.append(head, surface);
  return section;
}

function applyGroupCopy(root = document) {
  root.querySelectorAll('[data-help-copy]').forEach((node) => {
    const key = node.dataset.helpCopy;
    const value = t(key);
    if (value) node.textContent = value;
  });

  root.querySelectorAll('[data-help-action]').forEach((button) => {
    const action = button.dataset.helpAction;
    const titleKey = {
      report: 'reportTitle',
      feedback: 'feedbackTitle',
      thailand: 'thailandTitle',
      worldwide: 'worldwideTitle'
    }[action];
    if (titleKey) button.setAttribute('aria-label', t(titleKey));
  });
}

function installGroups() {
  const screen = document.querySelector(SCREEN_SELECTOR);
  const list = screen?.querySelector('.settings-list');
  const aboutGroup = list?.querySelector('.you-group-about');
  if (!screen || !list || !aboutGroup) return false;

  let help = list.querySelector('[data-you-contact-group="help"]');
  let support = list.querySelector('[data-you-contact-group="support"]');

  if (!help) {
    help = createGroup('help', 'helpTitle', 'helpNote', [
      createActionRow({
        id: 'aurenReportProblemBtn',
        action: 'report',
        icon: 'bug',
        titleKey: 'reportTitle',
        subKey: 'reportSub',
        badgeKey: 'emailBadge'
      }),
      createActionRow({
        id: 'aurenFeedbackBtn',
        action: 'feedback',
        icon: 'feedback',
        titleKey: 'feedbackTitle',
        subKey: 'feedbackSub',
        badgeKey: 'emailBadge'
      })
    ]);
  }

  if (!support) {
    support = createGroup('support', 'supportTitle', 'supportNote', [
      createActionRow({
        id: 'aurenThailandSupportBtn',
        action: 'thailand',
        icon: 'thai',
        titleKey: 'thailandTitle',
        subKey: 'thailandSub',
        badgeKey: 'promptPayBadge',
        support: true
      }),
      createActionRow({
        id: 'aurenWorldwideSupportBtn',
        action: 'worldwide',
        icon: 'world',
        titleKey: 'worldwideTitle',
        subKey: 'worldwideSub',
        badgeKey: 'kofiBadge',
        support: true
      })
    ]);
  }

  if (!help.isConnected) list.insertBefore(help, aboutGroup);
  if (!support.isConnected) list.insertBefore(support, aboutGroup);

  applyGroupCopy(screen);
  return true;
}

function waitForYouStructure() {
  if (installGroups()) return;

  const screen = document.querySelector(SCREEN_SELECTOR);
  if (!screen) return;

  const observer = new MutationObserver(() => {
    if (!installGroups()) return;
    observer.disconnect();
  });
  observer.observe(screen, { childList: true, subtree: true });

  requestAnimationFrame(() => {
    if (installGroups()) observer.disconnect();
  });
}

function coarsePlatform() {
  const source = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '';
  const value = String(source).toLowerCase();
  if (value.includes('android')) return 'Android';
  if (value.includes('iphone') || value.includes('ipad') || value.includes('ios')) return 'iOS/iPadOS';
  if (value.includes('mac')) return 'macOS';
  if (value.includes('win')) return 'Windows';
  if (value.includes('linux')) return 'Linux';
  return 'Other';
}

function browserFamily() {
  const ua = navigator.userAgent || '';
  const tests = [
    ['Edge', /Edg\/(\d+)/],
    ['Firefox', /Firefox\/(\d+)/],
    ['Chrome', /(?:Chrome|CriOS)\/(\d+)/],
    ['Safari', /Version\/(\d+).+Safari/]
  ];
  for (const [name, pattern] of tests) {
    const match = ua.match(pattern);
    if (match) return `${name} ${match[1]}`;
  }
  return 'Other';
}

function displayMode() {
  const standalone =
    window.matchMedia?.('(display-mode: standalone)')?.matches ||
    window.matchMedia?.('(display-mode: fullscreen)')?.matches ||
    navigator.standalone === true;
  return standalone ? 'Installed PWA' : 'Browser';
}

function currentScreen() {
  return document.querySelector('.screen.active[data-screen]')?.dataset.screen || 'you';
}

function diagnostics() {
  return [
    `Auren Build: ${BUILD_NUMBER}`,
    `Language: ${locale()}`,
    `Platform: ${coarsePlatform()}`,
    `Browser: ${browserFamily()}`,
    `Mode: ${displayMode()}`,
    `Screen: ${currentScreen()}`,
    `Timestamp: ${new Date().toISOString()}`
  ].join('\n');
}

function setAppInert(value) {
  const app = document.getElementById('app');
  if (!app) return;

  if (value) {
    previousAppInert = Boolean(app.inert);
    previousAriaHidden = app.getAttribute('aria-hidden');
    app.inert = true;
    app.setAttribute('aria-hidden', 'true');
  } else {
    app.inert = previousAppInert;
    if (previousAriaHidden === null) app.removeAttribute('aria-hidden');
    else app.setAttribute('aria-hidden', previousAriaHidden);
  }
}

function ensureOverlay() {
  if (overlay) return overlay;

  overlay = document.createElement('section');
  overlay.id = 'aurenHelpSupportLayer';
  overlay.className = 'auren-help-layer';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'aurenHelpTitle');
  overlay.innerHTML = `
    <header class="auren-help-topbar">
      <div class="auren-help-brand"><strong>AUREN</strong><small>BENEDICT INTERACTIVE</small></div>
      <button class="auren-help-close" type="button" data-help-close aria-label="Close">×</button>
    </header>
    <div class="auren-help-scroll">
      <main class="auren-help-content"></main>
    </div>
    <div class="auren-help-toast" role="status" aria-live="polite"></div>`;
  document.body.appendChild(overlay);
  overlayContent = overlay.querySelector('.auren-help-content');

  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKeyDown);
  return overlay;
}

function showToast(message) {
  const toast = ensureOverlay().querySelector('.auren-help-toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function openOverlay(view) {
  ensureOverlay();
  previousFocus = document.activeElement;
  activeView = view;
  setAppInert(true);
  document.body.classList.add('auren-help-open');
  overlay.hidden = false;

  renderActiveView();
  requestAnimationFrame(() => overlay.classList.add('is-visible'));

  setTimeout(() => {
    overlay.querySelector('textarea, [data-help-primary], [data-help-close]')?.focus({ preventScroll: true });
  }, 20);
}

function closeOverlay() {
  if (!overlay || overlay.hidden) return;
  overlay.classList.remove('is-visible');

  const finish = () => {
    overlay.hidden = true;
    activeView = null;
    document.body.classList.remove('auren-help-open');
    setAppInert(false);
    if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) {
      previousFocus.focus({ preventScroll: true });
    }
    previousFocus = null;
  };

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) finish();
  else setTimeout(finish, 170);
}

function focusableNodes() {
  if (!overlay || overlay.hidden) return [];
  return [...overlay.querySelectorAll(
    'button:not([disabled]),a[href],textarea:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])'
  )].filter((node) => !node.hidden && node.getAttribute('aria-hidden') !== 'true');
}

function onKeyDown(event) {
  if (!overlay || overlay.hidden) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeOverlay();
    return;
  }

  if (event.key !== 'Tab') return;
  const nodes = focusableNodes();
  if (!nodes.length) return;

  const first = nodes[0];
  const last = nodes[nodes.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function formMarkup(kind) {
  const isReport = kind === 'report';
  const title = isReport ? t('reportSheetTitle') : t('feedbackSheetTitle');
  const lead = isReport ? t('reportLead') : t('feedbackLead');
  const placeholder = isReport ? t('reportPlaceholder') : t('feedbackPlaceholder');
  const help = isReport ? t('diagnosticsReportHelp') : t('diagnosticsFeedbackHelp');

  return `
    <section class="auren-help-hero">
      <span class="auren-help-eyebrow">${escapeHtml(t('reportEyebrow'))}</span>
      <h1 id="aurenHelpTitle">${escapeHtml(title)}</h1>
      <p>${escapeHtml(lead)}</p>
    </section>

    <section class="auren-help-panel auren-help-form" data-help-form="${kind}">
      <label class="auren-help-field">
        <span>${escapeHtml(t('descriptionLabel'))}</span>
        <textarea maxlength="1800" rows="7" data-help-message placeholder="${escapeHtml(placeholder)}"></textarea>
      </label>

      <div class="auren-help-safety">
        <span aria-hidden="true">◇</span>
        <p>${escapeHtml(t('privacyWarning'))}</p>
      </div>

      <label class="auren-help-diagnostic-toggle">
        <span>
          <strong>${escapeHtml(t('diagnosticsLabel'))}</strong>
          <small>${escapeHtml(help)}</small>
        </span>
        <input type="checkbox" data-help-diagnostics ${isReport ? 'checked' : ''}>
        <i aria-hidden="true"></i>
      </label>

      <div class="auren-help-diagnostics" data-help-diagnostic-box ${isReport ? '' : 'hidden'}>
        <div class="auren-help-diagnostic-head">
          <span>${escapeHtml(t('diagnosticsPreview'))}</span>
          <button type="button" data-copy-diagnostics>${escapeHtml(t('copyDiagnostics'))}</button>
        </div>
        <pre data-help-diagnostic-preview></pre>
      </div>

      <p class="auren-help-validation" data-help-validation aria-live="polite"></p>

      <div class="auren-help-actions">
        <button class="auren-help-primary" type="button" data-help-primary data-open-mail="${kind}">${escapeHtml(t('emailAction'))}</button>
        <button class="auren-help-secondary" type="button" data-copy-message="${kind}">
          ${escapeHtml(isReport ? t('copyAction') : t('copyFeedbackAction'))}
        </button>
      </div>
    </section>

    <section class="auren-help-contact">
      <strong>${escapeHtml(t('contactLabel'))}</strong>
      <span>${escapeHtml(SUPPORT_EMAIL)}</span>
      <p>${escapeHtml(t('mailFallback'))} ${escapeHtml(SUPPORT_EMAIL)}</p>
    </section>

    <button class="auren-help-back" type="button" data-help-close>${escapeHtml(t('backToYou'))}</button>`;
}

function thailandMarkup() {
  return `
    <section class="auren-help-hero">
      <span class="auren-help-eyebrow">${escapeHtml(t('thailandEyebrow'))}</span>
      <h1 id="aurenHelpTitle">${escapeHtml(t('thailandSheetTitle'))}</h1>
      <p>${escapeHtml(t('thailandLead'))}</p>
    </section>

    <section class="auren-help-panel auren-promptpay-panel">
      <div class="auren-provider-label">${escapeHtml(t('promptPayLabel'))}</div>

      <div class="auren-qr-frame" data-qr-frame>
        <span class="auren-qr-loading">${escapeHtml(t('qrLoading'))}</span>
        <img
          data-promptpay-qr
          src="${PROMPTPAY_QR_URL}"
          alt="PromptPay QR"
          referrerpolicy="no-referrer"
          loading="eager">
      </div>

      <div class="auren-recipient-block">
        <span>${escapeHtml(t('recipientLabel'))}</span>
        <strong>${escapeHtml(PROMPTPAY_RECIPIENT_TH)}</strong>
        <small>${escapeHtml(PROMPTPAY_RECIPIENT_EN)}</small>
      </div>

      <p class="auren-support-verify">${escapeHtml(t('verifyRecipient'))}</p>
      <p class="auren-support-hint">${escapeHtml(t('samePhoneHint'))}</p>

      <button class="auren-help-primary" type="button" data-help-primary data-save-qr>
        ${escapeHtml(t('qrOpen'))}
      </button>

      <div class="auren-support-privacy">
        <span aria-hidden="true">◇</span>
        <p>${escapeHtml(t('thailandPrivacy'))}</p>
      </div>
    </section>

    <p class="auren-support-disclaimer">${escapeHtml(t('optionalSupport'))}</p>
    <button class="auren-help-back" type="button" data-help-close>${escapeHtml(t('backToYou'))}</button>`;
}

function worldwideMarkup() {
  return `
    <section class="auren-help-hero">
      <span class="auren-help-eyebrow">${escapeHtml(t('worldwideEyebrow'))}</span>
      <h1 id="aurenHelpTitle">${escapeHtml(t('worldwideSheetTitle'))}</h1>
      <p>${escapeHtml(t('worldwideLead'))}</p>
    </section>

    <section class="auren-help-panel auren-kofi-panel">
      <div class="auren-provider-orb" aria-hidden="true">K</div>
      <span class="auren-provider-label">${escapeHtml(t('providerLabel'))}</span>
      <h2>${escapeHtml(t('providerTitle'))}</h2>
      <p>${escapeHtml(t('providerBody'))}</p>

      <div class="auren-external-note">
        <span aria-hidden="true">↗</span>
        <p>${escapeHtml(t('externalNote'))}</p>
      </div>

      <button class="auren-help-primary" type="button" data-help-primary data-open-kofi>
        ${escapeHtml(t('continueKofi'))}
      </button>
    </section>

    <p class="auren-support-thanks">${escapeHtml(t('worldwideThanks'))}</p>
    <p class="auren-support-disclaimer">${escapeHtml(t('optionalSupport'))}</p>
    <button class="auren-help-back" type="button" data-help-close>${escapeHtml(t('backToYou'))}</button>`;
}

function renderActiveView() {
  if (!overlayContent || !activeView) return;

  if (activeView === 'report' || activeView === 'feedback') {
    overlayContent.innerHTML = formMarkup(activeView);
    syncDiagnosticPreview();
    const toggle = overlay.querySelector('[data-help-diagnostics]');
    toggle?.addEventListener('change', syncDiagnosticPreview);
  } else if (activeView === 'thailand') {
    overlayContent.innerHTML = thailandMarkup();
    wireQrState();
  } else if (activeView === 'worldwide') {
    overlayContent.innerHTML = worldwideMarkup();
  }

  overlay.querySelector('[data-help-close]')?.setAttribute('aria-label', t('close'));
  overlay.querySelector('.auren-help-close')?.setAttribute('aria-label', t('close'));
  overlay.querySelector('.auren-help-scroll').scrollTop = 0;
}

function syncDiagnosticPreview() {
  const toggle = overlay?.querySelector('[data-help-diagnostics]');
  const box = overlay?.querySelector('[data-help-diagnostic-box]');
  const preview = overlay?.querySelector('[data-help-diagnostic-preview]');
  if (!toggle || !box || !preview) return;

  box.hidden = !toggle.checked;
  preview.textContent = diagnostics();
}

function reportText(kind) {
  const message = overlay?.querySelector('[data-help-message]')?.value.trim() || '';
  const includeDiagnostics = Boolean(overlay?.querySelector('[data-help-diagnostics]')?.checked);
  const heading = kind === 'report' ? 'Auren problem report' : 'Auren feedback';

  let text = `${heading}\n\n${message}`;
  if (includeDiagnostics) text += `\n\n--- Safe technical diagnostics ---\n${diagnostics()}`;
  text += `\n\n--- Privacy reminder ---\nNo health/profile/check-in/payment data was added automatically by Auren.`;
  return text;
}

function validateMessage() {
  const message = overlay?.querySelector('[data-help-message]')?.value.trim() || '';
  const validation = overlay?.querySelector('[data-help-validation]');
  if (message.length >= 3) {
    if (validation) validation.textContent = '';
    return true;
  }
  if (validation) validation.textContent = t('needMessage');
  overlay?.querySelector('[data-help-message]')?.focus();
  return false;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(t('copied'));
    return true;
  } catch {}

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {}
  textarea.remove();

  if (copied) showToast(t('copied'));
  return copied;
}

function openMail(kind) {
  if (!validateMessage()) return;
  const subject = kind === 'report'
    ? `Auren Build ${BUILD_NUMBER} — Problem report`
    : `Auren Build ${BUILD_NUMBER} — Feedback`;
  const body = reportText(kind);
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function wireQrState() {
  const img = overlay?.querySelector('[data-promptpay-qr]');
  const frame = overlay?.querySelector('[data-qr-frame]');
  if (!img || !frame) return;

  const loaded = () => frame.classList.add('is-loaded');
  const failed = () => {
    frame.classList.add('is-error');
    const loading = frame.querySelector('.auren-qr-loading');
    if (loading) loading.textContent = t('qrUnavailable');
  };

  if (img.complete && img.naturalWidth) loaded();
  else {
    img.addEventListener('load', loaded, { once: true });
    img.addEventListener('error', failed, { once: true });
  }
}

async function saveOrOpenQr(button) {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = t('qrSaving');

  try {
    const response = await fetch(PROMPTPAY_QR_URL, {
      cache: 'force-cache',
      referrerPolicy: 'no-referrer'
    });
    if (!response.ok) throw new Error('QR fetch failed');

    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = QR_FILENAME;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1200);
    showToast(t('qrSaved'));
  } catch {
    window.open(PROMPTPAY_QR_URL, '_blank', 'noopener,noreferrer');
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

function openKofi() {
  window.open(KOFI_URL, '_blank', 'noopener,noreferrer');
}

function onOverlayClick(event) {
  if (event.target.closest('[data-help-close]')) {
    closeOverlay();
    return;
  }

  const mail = event.target.closest('[data-open-mail]');
  if (mail) {
    openMail(mail.dataset.openMail);
    return;
  }

  const copyMessage = event.target.closest('[data-copy-message]');
  if (copyMessage) {
    if (!validateMessage()) return;
    copyText(reportText(copyMessage.dataset.copyMessage));
    return;
  }

  if (event.target.closest('[data-copy-diagnostics]')) {
    copyText(diagnostics());
    return;
  }

  const saveQr = event.target.closest('[data-save-qr]');
  if (saveQr) {
    saveOrOpenQr(saveQr);
    return;
  }

  if (event.target.closest('[data-open-kofi]')) {
    openKofi();
  }
}

function onSettingsAction(event) {
  const action = event.target.closest('[data-help-action]')?.dataset.helpAction;
  if (!action) return;
  openOverlay(action);
}

function init() {
  installStylesheet();
  waitForYouStructure();

  const screen = document.querySelector(SCREEN_SELECTOR);
  screen?.addEventListener('click', onSettingsAction);

  new MutationObserver(() => {
    installGroups();
    const screenNow = document.querySelector(SCREEN_SELECTOR);
    if (screenNow) applyGroupCopy(screenNow);
    if (overlay && !overlay.hidden && activeView) renderActiveView();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
}

try {
  init();
  window.AurenHelpSupport = Object.freeze({
    supportEmail: SUPPORT_EMAIL,
    open: openOverlay
  });
} catch (error) {
  console.error('Auren Help & Support unavailable', error);
}
