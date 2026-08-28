const STYLE_ID = 'auren-body-context-build-36';
const STYLE_HREF = './src/css/body-context-polish.css';
const TODAY = '[data-screen="today"]';

const LABELS = {
  bmi: ['bmi'],
  training: ['training', 'การฝึก', 'การออกกำลังกาย'],
  waist: ['waist', 'รอบเอว']
};

let annotationScheduled = false;
let annotating = false;

function setTextIfChanged(node, value) {
  if (!node || node.textContent === value) return;
  node.textContent = value;
}

function scheduleAnnotation() {
  if (annotationScheduled) return;
  annotationScheduled = true;
  requestAnimationFrame(() => {
    annotationScheduled = false;
    annotateBodyContext();
  });
}

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenBodyContext = 'build-36';
  document.head.appendChild(link);
}

function norm(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function findLabelNode(root, candidates) {
  const wanted = new Set(candidates.map(norm));
  return [...root.querySelectorAll('*')].find((node) => {
    if (node.children.length) return false;
    return wanted.has(norm(node.textContent));
  }) || null;
}

function ancestors(node, stopAt) {
  const list = [];
  let current = node;
  while (current && current !== stopAt) {
    list.push(current);
    current = current.parentElement;
  }
  if (stopAt) list.push(stopAt);
  return list;
}

function lowestCommonAncestor(nodes, stopAt) {
  const [first, ...rest] = nodes;
  const chain = ancestors(first, stopAt);
  return chain.find((candidate) => rest.every((node) => candidate.contains(node))) || null;
}

function directChildUnder(container, node) {
  let current = node;
  while (current && current.parentElement && current.parentElement !== container) current = current.parentElement;
  return current && current.parentElement === container ? current : null;
}

function extractPrimaryText(item, labelNode) {
  const texts = [...item.querySelectorAll('*')]
    .filter((el) => el.children.length === 0)
    .map((el) => String(el.textContent || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const labelText = labelNode ? String(labelNode.textContent || '').replace(/\s+/g, ' ').trim() : '';
  const options = texts.filter((text) => text !== labelText && norm(text) !== norm(labelText));
  return options.sort((a, b) => b.length - a.length)[0] || '';
}

function createTrainingRow() {
  const row = document.createElement('div');
  row.className = 'today-body-training-row';
  row.dataset.aurenTrainingRow = 'true';

  const eyebrow = document.createElement('div');
  eyebrow.className = 'today-body-training-eyebrow';

  const value = document.createElement('div');
  value.className = 'today-body-training-value';

  row.append(eyebrow, value);
  return row;
}

function ensureTrainingRow(card, valueText) {
  let row = card.querySelector('[data-auren-training-row]');
  if (!row) row = createTrainingRow();

  const isThai = document.documentElement.lang === 'th';
  const eyebrowText = isThai ? 'การฝึก' : 'Training';
  const fallback = isThai ? 'ยังไม่มีรูปแบบการฝึกที่ชัดเจน' : 'No structured training';

  setTextIfChanged(row.querySelector('.today-body-training-eyebrow'), eyebrowText);
  setTextIfChanged(row.querySelector('.today-body-training-value'), valueText || fallback);
  return row;
}

function annotateBodyContext() {
  if (annotating) return false;
  annotating = true;

  const today = document.querySelector(TODAY);
  if (!today) {
    annotating = false;
    return false;
  }

  const bmiLabel = findLabelNode(today, LABELS.bmi);
  const trainingLabel = findLabelNode(today, LABELS.training);
  const waistLabel = findLabelNode(today, LABELS.waist);
  if (!bmiLabel || !trainingLabel || !waistLabel) { annotating = false; return false; }

  const metricsRoot = lowestCommonAncestor([bmiLabel, trainingLabel, waistLabel], today);
  if (!metricsRoot) { annotating = false; return false; }

  const bmiItem = directChildUnder(metricsRoot, bmiLabel);
  const trainingItem = directChildUnder(metricsRoot, trainingLabel);
  const waistItem = directChildUnder(metricsRoot, waistLabel);
  if (!bmiItem || !trainingItem || !waistItem) { annotating = false; return false; }

  const card = metricsRoot.closest('.card') || metricsRoot.parentElement;
  if (!card) { annotating = false; return false; }

  metricsRoot.classList.add('today-body-metrics-row');
  card.classList.add('today-body-context-card');
  bmiItem.classList.add('today-body-metric', 'is-bmi');
  waistItem.classList.add('today-body-metric', 'is-waist');
  trainingItem.classList.add('today-body-training-source');
  if (!trainingItem.hidden) trainingItem.hidden = true;

  const trainingValue = extractPrimaryText(trainingItem, trainingLabel);
  const trainingRow = ensureTrainingRow(card, trainingValue);
  if (trainingRow.previousElementSibling !== metricsRoot) {
    metricsRoot.insertAdjacentElement('afterend', trainingRow);
  }

  annotating = false;
  return true;
}

function init() {
  installStylesheet();
  annotateBodyContext();

  const today = document.querySelector(TODAY);
  if (today && !today.dataset.bodyContextObserved) {
    today.dataset.bodyContextObserved = 'true';
    new MutationObserver(scheduleAnnotation).observe(today, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (!document.documentElement.dataset.bodyContextLangObserved) {
    document.documentElement.dataset.bodyContextLangObserved = 'true';
    new MutationObserver(scheduleAnnotation).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }
}

try {
  init();
} catch (error) {
  console.error('Auren Body Context polish unavailable', error);
}
