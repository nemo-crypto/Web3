const base = document.body.dataset.base;
const visitStats = document.querySelectorAll('[data-visit-stats]');
if (visitStats.length) {
  async function recordVisit() {
    try {
      const remoteEndpoint = document.body.dataset.visitEndpoint;
      let visitor = '1';
      if (remoteEndpoint) {
        const key = 'web3-course:visitor:v1';
        visitor = localStorage.getItem(key);
        if (!visitor) {
          visitor = crypto.randomUUID();
          localStorage.setItem(key, visitor);
        }
      }
      const response = await fetch(remoteEndpoint || `${base}/api/visit`, {
        method: 'POST',
        headers: { 'X-Course-Visit': visitor },
      });
      if (!response.ok) return;
      const { visitors, pageViews } = await response.json();
      if (!Number.isSafeInteger(visitors) || !Number.isSafeInteger(pageViews)) return;
      const format = new Intl.NumberFormat('zh-CN');
      for (const badge of visitStats) {
        badge.querySelector('[data-visitors]').textContent = format.format(visitors);
        badge.querySelector('[data-page-views]').textContent = format.format(pageViews);
        badge.hidden = false;
      }
    } catch {
      // The badge stays hidden while counts are unavailable.
    }
  }
  if (document.visibilityState === 'visible') recordVisit();
  else {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      recordVisit();
    };
    document.addEventListener('visibilitychange', onVisible);
  }
}
const progressKey = 'web3-course:progress:v1';
const lastKey = 'web3-course:last-lesson:v1';

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function readProgress() {
  const stored = readStorage(progressKey, []);
  return new Set(Array.isArray(stored) ? stored : []);
}

let progress = readProgress();
const lesson = document.querySelector('[data-lesson]');
const completion = document.querySelector('[data-complete]');
const resume = document.querySelector('[data-resume]');
const catalog = document.querySelector('[data-catalog]');
const stageProgress = document.querySelector('[data-stage-progress]');
const normalize = text => text.normalize('NFKC').toLowerCase();
const catalogFilters = catalog && {
  query: catalog.querySelector('[data-catalog-query]'),
  stage: catalog.querySelector('[data-catalog-stage]'),
  unread: catalog.querySelector('[data-catalog-unread]'),
  status: catalog.querySelector('[data-catalog-status]'),
};

function updateCatalog() {
  if (!catalogFilters) return;
  const { query, stage, unread, status } = catalogFilters;
  const terms = normalize(query.value.trim()).split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const section of catalog.querySelectorAll('[data-stage]')) {
    let sectionCount = 0;
    for (const link of section.querySelectorAll('[data-lesson-link]')) {
      const content = normalize(link.textContent + ' ' + link.dataset.lessonLink);
      link.hidden = (stage.value !== '' && stage.value !== section.dataset.stage)
        || (unread.checked && progress.has(link.dataset.lessonLink))
        || !terms.every(term => content.includes(term));
      if (!link.hidden) sectionCount++;
    }
    section.hidden = sectionCount === 0;
    visible += sectionCount;
  }
  status.textContent = visible ? `显示 ${visible} 课` : '没有符合条件的课程，试试调整筛选。';
}

if (catalogFilters) {
  catalogFilters.query.addEventListener('input', updateCatalog);
  catalogFilters.stage.addEventListener('change', updateCatalog);
  catalogFilters.unread.addEventListener('change', updateCatalog);
}

function refreshResume() {
  if (!resume) return;
  const last = readStorage(lastKey, '');
  if (typeof last === 'string' && /^course\/[a-z0-9-]+\/[a-z0-9-]+\.md$/.test(last)) {
    resume.href = `${base}/${last.replace(/\.md$/, '.html')}`;
    resume.firstChild.textContent = '继续上次阅读 ';
  }
}

function updateProgress() {
  for (const link of document.querySelectorAll('[data-lesson-link]')) {
    link.classList.toggle('is-complete', progress.has(link.dataset.lessonLink));
  }
  if (completion) {
    const complete = progress.has(lesson.dataset.lesson);
    completion.setAttribute('aria-pressed', String(complete));
    completion.textContent = complete ? '已完成 · 点击取消' : '标记为已学';
  }
  const overall = document.querySelector('[data-overall-progress]');
  if (overall) {
    overall.textContent = progress.size ? `已学 ${progress.size} / ${document.body.dataset.courseSize} 课` : '';
  }
  if (stageProgress) {
    const total = stageProgress.querySelector('progress');
    const completed = stageProgress.querySelectorAll('[data-lesson-link].is-complete').length;
    total.value = completed;
    stageProgress.querySelector('[data-stage-label]').textContent = `已完成 ${completed} / ${total.max}`;
  }
  updateCatalog();
}

completion?.addEventListener('click', () => {
  const id = lesson.dataset.lesson;
  if (!progress.delete(id)) progress.add(id);
  const saved = saveStorage(progressKey, [...progress]);
  if (!saved) {
    const message = completion.closest('.completion').querySelector('p');
    message.textContent = '当前浏览器无法保存进度，本次标记会在离开页面后清除。';
    message.setAttribute('role', 'status');
  }
  updateProgress();
});
function refreshPage() {
  if (lesson) saveStorage(lastKey, lesson.dataset.lesson);
  refreshResume();
  updateProgress();
}
refreshPage();
window.addEventListener('pageshow', event => {
  if (event.persisted) {
    progress = readProgress();
    refreshPage();
  }
});
window.addEventListener('storage', event => {
  if (event.key === progressKey || event.key === null) {
    progress = readProgress();
    updateProgress();
  }
  if (event.key === lastKey || event.key === null) refreshResume();
});

const dialog = document.getElementById('search-dialog');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
const status = document.getElementById('search-status');
let index;
let request;
let opener;

function search() {
  results.replaceChildren();
  if (!index) return;
  const query = normalize(input.value.trim());
  if (!query) {
    status.textContent = '输入概念、业务场景或课名。';
    return;
  }

  const words = query.split(/\s+/);
  const matches = index.map(entry => {
    const title = normalize(entry.title);
    const body = normalize([entry.summary, entry.stage, entry.terms, entry.path].join(' '));
    const content = normalize(entry.content);
    const valid = words.every(word => title.includes(word) || body.includes(word) || content.includes(word));
    const score = valid
      ? 1 + (title.includes(query) ? 10 : 0) + (body.includes(query) ? 3 : 0) + words.filter(word => title.includes(word)).length
      : 0;
    return { entry, score };
  }).filter(match => match.score > 0).sort((a, b) => b.score - a.score);

  status.textContent = matches.length > 20
    ? `找到 ${matches.length} 课，显示前 20 项`
    : matches.length ? `找到 ${matches.length} 课` : '没有找到课程，试试其他关键词。';
  for (const { entry } of matches.slice(0, 20)) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const title = document.createElement('strong');
    const summary = document.createElement('small');
    link.href = `${base}/${entry.path}`;
    title.textContent = entry.title;
    summary.textContent = entry.stage;
    link.append(title, summary);
    item.append(link);
    results.append(item);
  }
}

async function openSearch(element) {
  if (dialog.open) return;
  opener = element;
  dialog.showModal();
  input.focus();
  if (index) {
    search();
    return;
  }

  status.textContent = '正在载入课程目录…';
  try {
    request ??= fetch(`${base}/assets/search-index.json`).then(response => {
      if (!response.ok) throw new Error('Course index unavailable');
      return response.json();
    });
    index = await request;
    search();
  } catch {
    request = undefined;
    status.textContent = '暂时无法加载搜索，仍可在课程目录手动查找。';
  }
}

for (const button of document.querySelectorAll('[data-open-search]')) {
  button.addEventListener('click', () => openSearch(button));
}
input.addEventListener('input', search);
input.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' && !event.isComposing) {
    const first = results.querySelector('a');
    if (first) {
      event.preventDefault();
      first.focus();
    }
  }
});
document.addEventListener('keydown', event => {
  const editing = event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]');
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.isComposing && !editing && !dialog.open) {
    event.preventDefault();
    openSearch(document.querySelector('[data-open-search]'));
  }
});
dialog.addEventListener('close', () => opener?.focus());

const caseList = document.querySelector('[data-case-list]');
if (caseList) {
  const entries = Array.from(caseList.querySelectorAll('[data-topic]'));
  const filters = Array.from(document.querySelectorAll('[data-case-filters] [data-filter]'));
  const status = caseList.querySelector('[data-case-status]');
  function filterCases(topic) {
    for (const filter of filters) filter.setAttribute('aria-pressed', String(filter.dataset.filter === topic));
    const shown = entries.filter(entry => {
      entry.hidden = topic !== '' && entry.dataset.topic !== topic;
      return !entry.hidden;
    });
    status.textContent = `${shown.length} 个案例`;
    if (shown.length && !shown.some(entry => entry.open)) shown[0].open = true;
  }
  for (const filter of filters) filter.addEventListener('click', () => filterCases(filter.dataset.filter));
  function openLinkedCase() {
    const entry = entries.find(entry => `#${entry.id}` === location.hash);
    if (!entry) return;
    if (entry.hidden) filterCases(entry.dataset.topic);
    entry.open = true;
  }
  openLinkedCase();
  window.addEventListener('hashchange', openLinkedCase);
  for (const form of caseList.querySelectorAll('[data-case-quiz]')) {
    const feedback = form.querySelector('[data-case-feedback]');
    form.addEventListener('change', () => { feedback.hidden = true; });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const answer = form.querySelector('input:checked');
      if (!answer) return;
      const correct = answer.dataset.correct === 'true';
      feedback.textContent = `${correct ? '判断正确。' : '再核对一下。'}${answer.dataset.reason}`;
      feedback.dataset.result = correct ? 'correct' : 'retry';
      feedback.hidden = false;
    });
  }
}

const diagrams = document.querySelectorAll('[data-diagram]');
if (diagrams.length) {
  const script = document.createElement('script');
  script.src = `${base}/assets/mermaid.min.js`;
  script.addEventListener('load', () => {
    if (!window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'neutral',
      flowchart: { htmlLabels: false },
    });
    for (const node of diagrams) {
      const fallback = node.textContent;
      window.mermaid.run({ nodes: [node] }).catch(() => {
        node.textContent = fallback;
        node.removeAttribute('data-processed');
      });
    }
  });
  document.head.append(script);
}
