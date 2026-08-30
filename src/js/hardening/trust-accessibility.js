import en from '../i18n/en.js';
import th from '../i18n/th.js';

const COPY = {
  en: {
    primaryNav: 'Primary navigation',
    profile: 'Open You',
    archiveView: 'Archive view',
    dismissGuide: 'Dismiss guide',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    close: 'Close',
    rhythmWindow: 'Rhythm window',
    signalsWindow: 'Signals evidence window',
  },
  th: {
    primaryNav: 'เมนูหลัก',
    profile: 'เปิดหน้า You',
    archiveView: 'มุมมองบันทึก',
    dismissGuide: 'ปิดคำแนะนำ',
    previousMonth: 'เดือนก่อน',
    nextMonth: 'เดือนถัดไป',
    close: 'ปิด',
    rhythmWindow: 'ช่วงเวลาของจังหวะ',
    signalsWindow: 'ช่วงหลักฐานของสัญญาณ',
  },
};

function locale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function setLabel(selector, value) {
  const node = document.querySelector(selector);
  if (node && node.getAttribute('aria-label') !== value) node.setAttribute('aria-label', value);
}

function patchCatalogTruth() {
  if (en?.help?.items?.goal) {
    en.help.items.goal.useCopy = 'Auren saves this as preference context for future goal-aware features. In the current build, it does not change the evidence rules or automatically reprioritise Today, Rhythm or Signals.';
  }
  if (th?.help?.items?.goal) {
    th.help.items.goal.useCopy = 'Auren เก็บค่านี้ไว้เป็นบริบทความต้องการของคุณสำหรับฟีเจอร์ที่เข้าใจเป้าหมายในอนาคต ใน Build ปัจจุบัน ค่านี้ยังไม่เปลี่ยนกฎหลักฐานหรือจัดลำดับ Today, Rhythm หรือ Signals โดยอัตโนมัติ';
  }
  if (en?.you) en.you.privacySub = 'Review or remove your local data';
  if (th?.you) th.you.privacySub = 'ตรวจสอบหรือลบข้อมูล Auren ในเครื่องนี้';
}

function patchAccessibility() {
  const activeLocale = locale();
  const c = COPY[activeLocale];
  const privacySub = document.getElementById('privacySub');
  const privacyCopy = activeLocale === 'th' ? th?.you?.privacySub : en?.you?.privacySub;
  if (privacySub && privacyCopy && privacySub.textContent !== privacyCopy) privacySub.textContent = privacyCopy;

  setLabel('.bottom-nav', c.primaryNav);
  setLabel('#profileBtn', c.profile);
  setLabel('.archive-switch', c.archiveView);
  setLabel('#calendarGuideClose', c.dismissGuide);
  setLabel('#calendarPrev', c.previousMonth);
  setLabel('#calendarNext', c.nextMonth);
  setLabel('#cancelAvatarCropTopBtn', c.close);
  setLabel('.rhythm-range-row', c.rhythmWindow);
  setLabel('.signals-range-row', c.signalsWindow);
  setLabel('#aurenHelpSupportLayer [data-help-close]', c.close);
}

function visibleFocusable(root) {
  return [...root.querySelectorAll(
    'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  )].filter((node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.hidden || node.getAttribute('aria-hidden') === 'true') return false;
    const style = window.getComputedStyle(node);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}

function topOpenModal() {
  const open = [...document.querySelectorAll('.modal-wrap.open')].filter((node) => {
    if (!(node instanceof HTMLElement)) return false;
    const style = window.getComputedStyle(node);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
  return open.at(-1) || null;
}

function containModalFocus(event) {
  if (event.key !== 'Tab') return;
  const modal = topOpenModal();
  if (!modal) return;

  const nodes = visibleFocusable(modal);
  if (!nodes.length) {
    event.preventDefault();
    if (!modal.hasAttribute('tabindex')) modal.setAttribute('tabindex', '-1');
    modal.focus({ preventScroll: true });
    return;
  }

  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const active = document.activeElement;

  if (!modal.contains(active)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus({ preventScroll: true });
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
}

let scheduled = false;
function schedulePatch() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    patchAccessibility();
  });
}

function setup() {
  patchCatalogTruth();
  patchAccessibility();

  document.addEventListener('keydown', containModalFocus, true);

  new MutationObserver(schedulePatch).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  new MutationObserver(schedulePatch).observe(document.body, {
    childList: true,
    subtree: true,
  });
}

try {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
} catch (error) {
  // Hardening must fail open and never gain startup authority.
  console.error('Auren trust/accessibility hardening unavailable', error);
}
