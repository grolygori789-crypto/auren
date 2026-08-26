import { deleteLocalCheckin, eraseAllLocalAurenData, getLocalCheckin, localDateKey } from './storage.js';

const STYLE_ID = 'auren-privacy-build-14';
const STYLE_HREF = './src/css/privacy.css';
const MODAL_ID = 'dataControlsModal';
const TRIGGER_ID = 'dataControlsBtn';
const DAY_DELETE_ID = 'deleteDayCheckinBtn';

const COPY = {
  en: {
    trigger: 'Data controls',
    triggerSub: 'Review or erase local Auren data',
    eyebrow: 'Privacy · Local data',
    title: 'Your data, in your hands.',
    intro: 'Auren keeps your profile and check-ins on this device. You can remove a single check-in or erase all local Auren data whenever you choose.',
    todayTitle: "Today's check-in",
    todaySaved: 'A check-in is saved for today.',
    todayEmpty: 'No check-in is saved for today.',
    deleteToday: "Delete today's check-in",
    historyTitle: 'Past check-ins',
    historyCopy: 'Open a day in Archive to remove only that day. Other days and your profile stay unchanged.',
    eraseTitle: 'Erase all local data',
    eraseCopy: 'Removes your profile, check-ins, health history and Auren preferences stored on this device. This cannot be undone.',
    eraseAction: 'Erase all local data',
    close: 'Close',
    cancel: 'Cancel',
    continue: 'Continue',
    deleteConfirmTitle: 'Delete this check-in?',
    deleteTodayConfirm: "Today's check-in will be removed. Your profile and other history will stay intact.",
    deleteDayConfirm: 'This check-in will be removed from your Auren health memory. Your profile and other days will stay intact.',
    deleteConfirmAction: 'Delete check-in',
    eraseConfirmTitle: 'Erase all local Auren data?',
    eraseConfirmCopy: 'This removes your local profile, all check-ins, history and Auren preferences from this device.',
    eraseFinalTitle: 'One final confirmation',
    eraseFinalCopy: 'There is no undo. Auren will restart with a fresh local state after the data is erased.',
    eraseFinalAction: 'Erase everything',
    working: 'Updating local data…',
    deleted: 'Check-in deleted.',
    erased: 'Local Auren data erased.',
    error: 'Auren could not complete that action. Please try again.',
    refreshError: 'The check-in was deleted, but Auren could not refresh this view. Reopen the app to see the updated state.',
    dayDelete: 'Delete this day',
  },
  th: {
    trigger: 'จัดการข้อมูล',
    triggerSub: 'ตรวจสอบหรือลบข้อมูล Auren ในเครื่องนี้',
    eyebrow: 'ความเป็นส่วนตัว · ข้อมูลในเครื่อง',
    title: 'ข้อมูลของคุณ คุณเป็นคนควบคุม',
    intro: 'Auren เก็บโปรไฟล์และข้อมูลเช็คอินไว้ในเครื่องนี้ คุณสามารถลบเช็คอินเพียงวันเดียว หรือล้างข้อมูล Auren ในเครื่องทั้งหมดได้ทุกเมื่อ',
    todayTitle: 'เช็คอินวันนี้',
    todaySaved: 'มีข้อมูลเช็คอินของวันนี้อยู่ในเครื่อง',
    todayEmpty: 'วันนี้ยังไม่มีข้อมูลเช็คอิน',
    deleteToday: 'ลบเช็คอินของวันนี้',
    historyTitle: 'เช็คอินที่ผ่านมา',
    historyCopy: 'เปิดวันที่ต้องการใน Archive เพื่อลบเฉพาะวันนั้น โดยข้อมูลวันอื่นและโปรไฟล์ยังคงอยู่',
    eraseTitle: 'ล้างข้อมูลในเครื่องทั้งหมด',
    eraseCopy: 'ลบโปรไฟล์ เช็คอิน ประวัติสุขภาพ และการตั้งค่า Auren ที่เก็บไว้ในเครื่องนี้ทั้งหมด การลบนี้ย้อนกลับไม่ได้',
    eraseAction: 'ล้างข้อมูลในเครื่องทั้งหมด',
    close: 'ปิด',
    cancel: 'ยกเลิก',
    continue: 'ดำเนินการต่อ',
    deleteConfirmTitle: 'ลบเช็คอินนี้ใช่ไหม?',
    deleteTodayConfirm: 'เช็คอินของวันนี้จะถูกลบ ส่วนโปรไฟล์และประวัติวันอื่นจะยังคงอยู่',
    deleteDayConfirm: 'เช็คอินของวันนั้นจะถูกนำออกจาก Health Memory ส่วนโปรไฟล์และข้อมูลวันอื่นจะยังคงอยู่',
    deleteConfirmAction: 'ลบเช็คอิน',
    eraseConfirmTitle: 'ล้างข้อมูล Auren ในเครื่องทั้งหมด?',
    eraseConfirmCopy: 'โปรไฟล์ เช็คอินทั้งหมด ประวัติ และการตั้งค่า Auren ในเครื่องนี้จะถูกลบ',
    eraseFinalTitle: 'ยืนยันครั้งสุดท้าย',
    eraseFinalCopy: 'การลบย้อนกลับไม่ได้ หลังลบเสร็จ Auren จะเริ่มใหม่ด้วยสถานะข้อมูลในเครื่องที่ว่างเปล่า',
    eraseFinalAction: 'ลบทุกอย่าง',
    working: 'กำลังจัดการข้อมูลในเครื่อง…',
    deleted: 'ลบเช็คอินแล้ว',
    erased: 'ล้างข้อมูล Auren ในเครื่องแล้ว',
    error: 'Auren ไม่สามารถดำเนินการได้ โปรดลองอีกครั้ง',
    refreshError: 'ลบเช็คอินแล้ว แต่ Auren ไม่สามารถรีเฟรชหน้าจอนี้ได้ กรุณาเปิดแอพใหม่เพื่อดูสถานะล่าสุด',
    dayDelete: 'ลบเช็คอินวันนั้น',
  },
};

function currentLocale() {
  return document.documentElement.lang === 'th' ? 'th' : 'en';
}

function copy() {
  return COPY[currentLocale()];
}

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenPrivacy = 'build-14';
  document.head.appendChild(link);
}

function formatLocalDate(localDate) {
  const [y, m, d] = String(localDate).split('-').map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  return new Intl.DateTimeFormat(currentLocale() === 'th' ? 'th-TH' : 'en', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date);
}

function createTrigger() {
  if (document.getElementById(TRIGGER_ID)) return;
  const anchor = document.getElementById('privacyTitle')?.closest('.setting');
  const list = anchor?.parentElement;
  if (!anchor || !list) return;

  const button = document.createElement('button');
  button.id = TRIGGER_ID;
  button.type = 'button';
  button.className = 'setting setting-button data-control-setting';
  button.innerHTML = `
    <div class="soft-icon data-control-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M6.2 8.8h11.6v10H6.2z"/><path d="M8.8 8.8V6.7a3.2 3.2 0 0 1 6.4 0v2.1"/><path d="M12 12.1v3.5"/></svg>
    </div>
    <div class="data-control-setting-copy"><strong data-data-copy="trigger"></strong><span data-data-copy="triggerSub"></span></div>
    <div class="end">›</div>`;
  anchor.insertAdjacentElement('afterend', button);
  button.addEventListener('click', openMain);
}

function createModal() {
  if (document.getElementById(MODAL_ID)) return;
  const modal = document.createElement('div');
  modal.className = 'modal-wrap data-controls-modal';
  modal.id = MODAL_ID;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'dataControlsTitle');
  modal.innerHTML = '<div class="sheet data-controls-sheet"><div class="sheet-handle"></div><div id="dataControlsContent"></div></div>';
  document.body.appendChild(modal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal && !modal.dataset.busy) closeModal();
  });
}

function applyStaticCopy() {
  const c = copy();
  document.querySelectorAll('[data-data-copy]').forEach((node) => {
    const key = node.dataset.dataCopy;
    if (c[key]) node.textContent = c[key];
  });
  const dayButton = document.getElementById(DAY_DELETE_ID);
  if (dayButton) dayButton.textContent = c.dayDelete;
}

function setBusy(value) {
  const modal = document.getElementById(MODAL_ID);
  if (!modal) return;
  if (value) modal.dataset.busy = '1'; else delete modal.dataset.busy;
  modal.querySelectorAll('button').forEach((button) => { button.disabled = Boolean(value); });
}

function closeModal() {
  const modal = document.getElementById(MODAL_ID);
  if (!modal || modal.dataset.busy) return;
  modal.classList.remove('open');
}

async function openMain() {
  const c = copy();
  const today = localDateKey();
  const todayRecord = await getLocalCheckin(today).catch(() => null);
  const content = document.getElementById('dataControlsContent');
  if (!content) return;
  content.innerHTML = `
    <div class="data-controls-head"><div class="data-controls-eyebrow">${c.eyebrow}</div><h3 id="dataControlsTitle">${c.title}</h3><p class="sheet-intro">${c.intro}</p></div>
    <section class="data-control-card">
      <div><strong>${c.todayTitle}</strong><p>${todayRecord ? c.todaySaved : c.todayEmpty}</p></div>
      <button class="data-secondary-danger" id="deleteTodayCheckin" type="button" ${todayRecord ? '' : 'disabled'}>${c.deleteToday}</button>
    </section>
    <section class="data-control-card data-control-neutral"><div><strong>${c.historyTitle}</strong><p>${c.historyCopy}</p></div></section>
    <section class="data-control-card data-control-danger-zone">
      <div><strong>${c.eraseTitle}</strong><p>${c.eraseCopy}</p></div>
      <button class="data-danger" id="eraseAllData" type="button">${c.eraseAction}</button>
    </section>
    <div class="sheet-actions"><button class="ghost-btn" id="closeDataControls" type="button">${c.close}</button></div>`;
  document.getElementById('deleteTodayCheckin')?.addEventListener('click', () => renderDeleteConfirmation(today, true));
  document.getElementById('eraseAllData')?.addEventListener('click', renderEraseConfirmationOne);
  document.getElementById('closeDataControls')?.addEventListener('click', closeModal);
  document.getElementById(MODAL_ID)?.classList.add('open');
}

function renderDeleteConfirmation(localDate, isToday = false) {
  const c = copy();
  const content = document.getElementById('dataControlsContent');
  if (!content) return;
  content.innerHTML = `
    <div class="data-controls-head"><div class="data-controls-eyebrow">${c.eyebrow}</div><h3 id="dataControlsTitle">${c.deleteConfirmTitle}</h3><p class="sheet-intro">${isToday ? c.deleteTodayConfirm : c.deleteDayConfirm}</p></div>
    <div class="data-confirm-date">${formatLocalDate(localDate)}</div>
    <div class="data-confirm-actions">
      <button class="data-danger" id="confirmDeleteCheckin" type="button">${c.deleteConfirmAction}</button>
      <button class="ghost-btn" id="cancelDeleteCheckin" type="button">${c.cancel}</button>
    </div>
    <div class="data-control-status" id="dataControlStatus" aria-live="polite"></div>`;
  document.getElementById('confirmDeleteCheckin')?.addEventListener('click', () => performDelete(localDate));
  document.getElementById('cancelDeleteCheckin')?.addEventListener('click', isToday ? openMain : closeModal);
  document.getElementById(MODAL_ID)?.classList.add('open');
}

function renderEraseConfirmationOne() {
  const c = copy();
  const content = document.getElementById('dataControlsContent');
  if (!content) return;
  content.innerHTML = `
    <div class="data-controls-head"><div class="data-controls-eyebrow">${c.eyebrow}</div><h3 id="dataControlsTitle">${c.eraseConfirmTitle}</h3><p class="sheet-intro">${c.eraseConfirmCopy}</p></div>
    <div class="data-confirm-actions">
      <button class="data-danger" id="continueEraseAll" type="button">${c.continue}</button>
      <button class="ghost-btn" id="cancelEraseAll" type="button">${c.cancel}</button>
    </div>`;
  document.getElementById('continueEraseAll')?.addEventListener('click', renderEraseConfirmationTwo);
  document.getElementById('cancelEraseAll')?.addEventListener('click', openMain);
}

function renderEraseConfirmationTwo() {
  const c = copy();
  const content = document.getElementById('dataControlsContent');
  if (!content) return;
  content.innerHTML = `
    <div class="data-controls-head"><div class="data-controls-eyebrow">${c.eyebrow}</div><h3 id="dataControlsTitle">${c.eraseFinalTitle}</h3><p class="sheet-intro">${c.eraseFinalCopy}</p></div>
    <div class="data-confirm-actions">
      <button class="data-danger data-danger-final" id="confirmEraseAll" type="button">${c.eraseFinalAction}</button>
      <button class="ghost-btn" id="cancelEraseFinal" type="button">${c.cancel}</button>
    </div>
    <div class="data-control-status" id="dataControlStatus" aria-live="polite"></div>`;
  document.getElementById('confirmEraseAll')?.addEventListener('click', performEraseAll);
  document.getElementById('cancelEraseFinal')?.addEventListener('click', openMain);
}

function waitForAppRefresh(requestId, timeoutMs = 1600) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const cleanup = () => {
      document.removeEventListener('auren:data-refreshed', onSuccess);
      document.removeEventListener('auren:data-refresh-error', onError);
      window.clearTimeout(timer);
    };
    const finish = (fn) => (event) => {
      if (settled || event?.detail?.requestId !== requestId) return;
      settled = true;
      cleanup();
      fn();
    };
    const onSuccess = finish(resolve);
    const onError = finish(() => reject(new Error('Auren view refresh failed')));
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Auren view refresh timed out'));
    }, timeoutMs);
    document.addEventListener('auren:data-refreshed', onSuccess);
    document.addEventListener('auren:data-refresh-error', onError);
  });
}

async function performDelete(localDate) {
  const c = copy();
  const status = document.getElementById('dataControlStatus');
  setBusy(true);
  if (status) status.textContent = c.working;
  try {
    await deleteLocalCheckin(localDate);
    const requestId = `delete-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const refreshed = waitForAppRefresh(requestId);
    document.dispatchEvent(new CustomEvent('auren:data-change', {
      detail: { type: 'checkin-deleted', requestId, localDate }
    }));
    await refreshed;
    if (status) status.textContent = c.deleted;
    setBusy(false);
    window.setTimeout(closeModal, 220);
  } catch (error) {
    setBusy(false);
    if (status) status.textContent = error?.message?.includes('refresh') ? c.refreshError : c.error;
  }
}

async function performEraseAll() {
  const c = copy();
  const status = document.getElementById('dataControlStatus');
  setBusy(true);
  if (status) status.textContent = c.working;
  try {
    await eraseAllLocalAurenData();
    if (status) status.textContent = c.erased;
    window.setTimeout(() => window.location.reload(), 520);
  } catch {
    setBusy(false);
    if (status) status.textContent = c.error;
  }
}

let selectedArchiveDay = '';

function observeArchiveDay() {
  document.addEventListener('click', (event) => {
    const button = event.target?.closest?.('[data-day]');
    if (button?.dataset.day) selectedArchiveDay = button.dataset.day;
  }, true);

  const modal = document.getElementById('dayDetailModal');
  if (!modal) return;
  const observer = new MutationObserver(() => {
    if (!modal.classList.contains('open')) return;
    window.setTimeout(() => installDayDeleteAction(selectedArchiveDay), 0);
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
}

async function installDayDeleteAction(localDate) {
  const modal = document.getElementById('dayDetailModal');
  const actions = modal?.querySelector('.sheet-actions');
  if (!modal || !actions || !localDate) return;
  document.getElementById(DAY_DELETE_ID)?.remove();
  const record = await getLocalCheckin(localDate).catch(() => null);
  if (!record || !modal.classList.contains('open') || selectedArchiveDay !== localDate) return;
  const button = document.createElement('button');
  button.id = DAY_DELETE_ID;
  button.className = 'data-day-delete';
  button.type = 'button';
  button.textContent = copy().dayDelete;
  button.addEventListener('click', () => renderDeleteConfirmation(localDate, localDate === localDateKey()));
  actions.prepend(button);
}

function setup() {
  installStylesheet();
  createTrigger();
  createModal();
  applyStaticCopy();
  observeArchiveDay();

  const languageObserver = new MutationObserver(() => {
    applyStaticCopy();
    const modal = document.getElementById(MODAL_ID);
    if (modal?.classList.contains('open') && !modal.dataset.busy) openMain();
  });
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

try {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
} catch (error) {
  console.error('Auren data controls failed to initialize', error);
}
