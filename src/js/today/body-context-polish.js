const STYLE_ID = 'auren-body-context-build-35';
const STYLE_HREF = './src/css/body-context-polish.css';
const TODAY = '[data-screen="today"]';

const LABELS = {
  bmi: ['bmi'],
  training: ['training', 'การฝึก', 'การออกกำลังกาย'],
  waist: ['waist', 'รอบเอว']
};

function installStylesheet() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  link.dataset.aurenBodyContext = 'build-35';
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
  row.querySelector('.today-body-training-eyebrow').textContent = isThai ? 'การฝึก' : 'Training';
  row.querySelector('.today-body-training-value').textContent = valueText || (isThai ? 'ยังไม่มีรูปแบบการฝึกที่ชัดเจน' : 'No structured training');
  return row;
}

function annotateBodyContext() {
  const today = document.querySelector(TODAY);
  if (!today) return false;

  const bmiLabel = findLabelNode(today, LABELS.bmi);
  const trainingLabel = findLabelNode(today, LABELS.training);
  const waistLabel = findLabelNode(today, LABELS.waist);
  if (!bmiLabel || !trainingLabel || !waistLabel) return false;

  const metricsRoot = lowestCommonAncestor([bmiLabel, trainingLabel, waistLabel], today);
  if (!metricsRoot) return false;

  const bmiItem = directChildUnder(metricsRoot, bmiLabel);
  const trainingItem = directChildUnder(metricsRoot, trainingLabel);
  const waistItem = directChildUnder(metricsRoot, waistLabel);
  if (!bmiItem || !trainingItem || !waistItem) return false;

  const card = metricsRoot.closest('.card') || metricsRoot.parentElement;
  if (!card) return false;

  metricsRoot.classList.add('today-body-metrics-row');
  card.classList.add('today-body-context-card');
  bmiItem.classList.add('today-body-metric', 'is-bmi');
  waistItem.classList.add('today-body-metric', 'is-waist');
  trainingItem.classList.add('today-body-training-source');
  trainingItem.hidden = true;

  const trainingValue = extractPrimaryText(trainingItem, trainingLabel);
  const trainingRow = ensureTrainingRow(card, trainingValue);
  metricsRoot.insertAdjacentElement('afterend', trainingRow);
  if (trainingRow.previousElementSibling !== metricsRoot) metricsRoot.insertAdjacentElement('afterend', trainingRow);

  return true;
}

function init() {
  installStylesheet();
  annotateBodyContext();

  const today = document.querySelector(TODAY);
  if (today && !today.dataset.bodyContextObserved) {
    today.dataset.bodyContextObserved = 'true';
    new MutationObserver(() => annotateBodyContext()).observe(today, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (!document.documentElement.dataset.bodyContextLangObserved) {
    document.documentElement.dataset.bodyContextLangObserved = 'true';
    new MutationObserver(() => annotateBodyContext()).observe(document.documentElement, {
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
