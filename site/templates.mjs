import { labContent, labPages } from './labs.mjs';
import { businessCases as dossiers, businessPagePath, topics } from './business.mjs';

const text = value => String(value).replace(/[&<>"']/g, char => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
));
const href = (ctx, path) => text(`${ctx.base}/${ctx.filename(path)}`);
const stageHref = (ctx, stage) => href(ctx, `course/${stage.id}/README.md`);
const glossary = 'course/10-projects/05-glossary.md';
const practice = 'reference/practice-lab.md';

function stageNav(ctx, active) {
  return `<nav class="stage-nav" aria-label="课程阶段">
    ${ctx.catalog.map(stage => `<a href="${stageHref(ctx, stage)}"${active === stage.id ? ' aria-current="page"' : ''}>
      <span>${stage.id.slice(0, 2)}</span> ${text(stage.title)}
    </a>`).join('')}
  </nav>`;
}

function visitStats(location) {
  return `<span class="visit-stats visit-stats-${location}" data-visit-stats hidden
    title="访客按浏览器标识去重，浏览按页面打开次数计算">
    <span>访客 <strong data-visitors></strong></span>
    <span>浏览 <strong data-page-views></strong></span>
  </span>`;
}

export function pageShell(ctx, content) {
  const home = ctx.path === 'README.md';
  const title = home ? 'Web3 实战课程' : `${ctx.doc.title} · Web3 实战课程`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="description" content="分阶段学习区块链、钱包、合约、资产、DeFi 与链上业务。">
  <title>${text(title)}</title>
  <link rel="stylesheet" href="${ctx.base}/assets/styles.css">
  <script src="${ctx.base}/assets/app.js" defer></script>
</head>
<body data-base="${ctx.base}" data-course-size="${ctx.lessonEntries.length}"${ctx.visitEndpoint ? ` data-visit-endpoint="${text(ctx.visitEndpoint)}"` : ''}>
  <a class="skip" href="#main">跳到内容</a>
  <header class="site-header">
    <div class="header-inner container">
      <div class="header-brand-group">
        <a href="${href(ctx, 'README.md')}" class="brand">
          <span class="brand-symbol" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>Web3 实战课程</span>
        </a>
        ${ctx.visitCounter ? visitStats('header') : ''}
      </div>
      <nav class="header-menu" aria-label="主要导航">
        <a href="${href(ctx, 'course/README.md')}"${ctx.path.startsWith('course/') ? ' aria-current="location"' : ''}>课程目录</a>
        <a href="${href(ctx, 'README.md')}#routes">学习路线</a>
        <a href="${href(ctx, businessPagePath)}"${ctx.path === businessPagePath ? ' aria-current="page"' : ''}>案例库</a>
        <a href="${href(ctx, practice)}"${ctx.path === practice ? ' aria-current="page"' : ''}>实验室</a>
        <a href="${href(ctx, glossary)}">术语速查</a>
      </nav>
      <div class="header-actions">
        <button class="search-button" type="button" data-open-search aria-haspopup="dialog">
          <span class="search-icon" aria-hidden="true"></span><span>搜索课程</span><kbd aria-hidden="true">/</kbd>
        </button>
        <a class="source-link" href="https://github.com/nemo-crypto/Web3">GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <nav class="mobile-quick-links" aria-label="快速导航">
      <a href="${href(ctx, 'course/README.md')}"${ctx.path.startsWith('course/') ? ' aria-current="location"' : ''}>课程目录</a>
      <a href="${href(ctx, businessPagePath)}"${ctx.path === businessPagePath ? ' aria-current="page"' : ''}>业务案例</a>
      <a href="${href(ctx, practice)}"${ctx.path === practice ? ' aria-current="page"' : ''}>交互实验</a>
    </nav>
  </header>
  <main id="main">${content}</main>
  <footer class="site-footer">
    <div class="container footer-inner">
      <a href="${href(ctx, 'README.md')}" class="footer-brand">Web3 实战课程</a>
      ${ctx.visitCounter ? visitStats('footer') : ''}
      <nav aria-label="页脚">
        <a href="${href(ctx, 'course/README.md')}">逐课目录</a>
        <a href="${href(ctx, businessPagePath)}">业务案例库</a>
        <a href="${href(ctx, practice)}">交互实验室</a>
        <a href="${href(ctx, 'reference/frontier-reading-notes.md')}">资料与来源</a>
        <a href="${href(ctx, 'reference/file-map.md')}">旧文件名对照</a>
      </nav>
    </div>
  </footer>
  <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title">
    <form method="dialog" class="dialog-top">
      <h2 id="search-title">搜索课程</h2>
      <button aria-label="关闭搜索" class="icon-button" value="close">×</button>
    </form>
    <label for="search-input" class="sr-only">搜索标题、章节或术语</label>
    <input id="search-input" placeholder="例如 Gas、稳定币、跨链" type="search" autocomplete="off">
    <p class="search-status" id="search-status" role="status"></p>
    <ul class="search-results" id="search-results" aria-label="搜索结果"></ul>
  </dialog>
</body>
</html>
`;
}

const routes = [
  { title: '第一次接触 Web3', id: '00', icon: 'blocks', copy: '读懂一笔交易，分清钱包连接、签名与授权。', path: '基础 → 钱包' },
  { title: '开发一款 DApp', id: '03', icon: 'code', copy: '把合约调用、交易状态和链上数据接到同一个产品。', path: '合约 → 扩容 → 项目' },
  { title: '做链上支付', id: '05', icon: 'wallet', copy: '从代币与稳定币开始，梳理收款、退款和对账。', path: '资产 → 对账 → 项目' },
  { title: '研究协议与市场', id: '06', icon: 'chart', copy: '看懂资金流、流动性与收益，再检查风险和假设。', path: 'DeFi → 交易 → 评审' },
];

const businessCases = [
  ['钱包接入', 'course/02-wallets/10-qr-wallet-connect.md'],
  ['交易体验', 'course/03-development/09-transaction-ui-state-machine.md'],
  ['商户支付', 'course/05-payments/12-checkout-and-fulfillment.md'],
  ['数字权益', 'course/08-applications/13-ticketing-and-redemption.md'],
];

export function homePage(ctx) {
  const first = ctx.lessonEntries[0];
  return `<div class="home container">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> 面向新手的中文课程</p>
        <h1>从一笔交易，<br>读懂 <em>Web3</em></h1>
        <p class="hero-description">从钱包授权、合约执行，到商户入账。用案例拆解业务、用实验验证结果，再把原理写进自己的项目。</p>
        <div class="hero-actions">
          <a class="button button-primary" href="${href(ctx, first.path)}" data-resume>开始第一课 <span aria-hidden="true">→</span></a>
          <a class="button button-secondary" href="${href(ctx, practice)}">打开实验室 <span aria-hidden="true">↗</span></a>
          <a class="text-link hero-case-link" href="${href(ctx, businessPagePath)}">看业务案例 <span aria-hidden="true">→</span></a>
        </div>
        <dl class="hero-metrics">
          <div><dt>${ctx.catalog.length}</dt><dd>学习阶段</dd></div>
          <div><dt>${ctx.lessonEntries.length}</dt><dd>课程与案例</dd></div>
          <div><dt>${ctx.lessonEntries.filter(lesson => /\/\d+-project-/.test(lesson.path)).length}</dt><dd>实战项目</dd></div>
        </dl>
      </div>
      <figure class="hero-art" aria-label="交易流程，从钱包签名到链上执行与账务确认">
        <div class="art-grid"></div>
        <div class="art-ring art-ring-1"></div><div class="art-ring art-ring-2"></div>
        <div class="art-lockup">
          <figcaption>一笔交易的路径</figcaption>
          <div class="art-node"><span class="node-glyph node-wallet" aria-hidden="true"></span><span><strong>钱包签名</strong><small>核对网络、账号与权限</small></span><b>01</b></div>
          <div class="art-connector" aria-hidden="true"></div>
          <div class="art-node art-node-middle"><span class="node-glyph node-chain" aria-hidden="true"></span><span><strong>链上执行</strong><small>按协议或合约规则更新状态</small></span><b>02</b></div>
          <div class="art-connector" aria-hidden="true"></div>
          <div class="art-node art-node-last"><span class="node-glyph node-check" aria-hidden="true"></span><span><strong>业务确认</strong><small>核对回执、最终性与账务</small></span><b>03</b></div>
        </div>
        <span class="art-corner art-corner-top" aria-hidden="true"></span><span class="art-corner art-corner-bottom" aria-hidden="true"></span>
      </figure>
    </section>

    <section class="home-section home-labs" aria-labelledby="home-labs-title">
      <div class="section-intro"><div><p class="eyebrow">动手验证</p><h2 id="home-labs-title">输入一组数据，看看结果</h2></div><a class="text-link" href="${href(ctx, practice)}">所有实验 <span aria-hidden="true">→</span></a></div>
      <div class="lab-preview-grid">
        ${labPages.map(lab => `<a class="lab-preview" href="${href(ctx, practice)}#${lab.id}">
          <span class="lab-topic">${text(lab.type)}</span>
          <span class="lab-preview-art lab-preview-art-${lab.id}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <h3>${text(lab.title)} <span aria-hidden="true">↗</span></h3><p>${text(lab.description)}</p>
        </a>`).join('')}
      </div>
    </section>

    <section id="routes" class="home-section">
      <div class="section-intro"><div><p class="eyebrow">学习路线</p><h2>按你的目标开始</h2></div><a class="text-link" href="${href(ctx, 'course/README.md')}">查看全部课程 <span aria-hidden="true">→</span></a></div>
      <div class="route-grid">
        ${routes.map(route => {
          const stage = ctx.catalog.find(stage => stage.id.startsWith(route.id));
          return `<a class="route-card" href="${stageHref(ctx, stage)}">
            <span class="route-glyph glyph-${route.icon}" aria-hidden="true"></span>
            <h3>${route.title}</h3><p>${route.copy}</p>
            <span class="route-path">${route.path} <span aria-hidden="true">↗</span></span>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section id="stages" class="home-section stages-section">
      <div class="section-intro"><div><p class="eyebrow">课程目录</p><h2>按阶段学习</h2></div><p class="overall-progress" data-overall-progress></p></div>
      <div class="stages-grid">${ctx.catalog.map(stage => `<a class="stage-card" href="${stageHref(ctx, stage)}">
        <span class="stage-number">${stage.id.slice(0, 2)}</span>
        <div><span class="stage-count">${stage.lessons.length} 课 · ${text(stage.audience)}</span>
        <h3>${text(stage.title)}</h3><p>${text(stage.summary)}</p></div>
        <span class="stage-arrow" aria-hidden="true">↗</span>
      </a>`).join('')}</div>
    </section>

    <section class="home-section" aria-labelledby="case-heading">
      <div class="section-intro"><div><p class="eyebrow">业务案例</p><h2 id="case-heading">一项功能怎么落地</h2></div><a class="text-link" href="${href(ctx, businessPagePath)}">查看案例库 →</a></div>
      <div class="case-grid">${businessCases.map(([name, path]) => {
        const lesson = ctx.lessonEntries.find(entry => entry.path === path);
        return `<a class="case-card" href="${href(ctx, path)}">
          <small>${text(name)}</small><h3>${text(lesson.title)}</h3><p>${text(lesson.summary)}</p><span aria-hidden="true">↗</span>
        </a>`;
      }).join('')}</div>
    </section>
  </div>`;
}

function breadcrumb(ctx, stage) {
  return `<nav class="breadcrumb" aria-label="当前位置">
    <a href="${href(ctx, 'README.md')}">课程首页</a>
    <span aria-hidden="true">/</span>
    ${stage ? `<a href="${stageHref(ctx, stage)}">${text(stage.title)}</a>` : `<span>${text(ctx.doc.title)}</span>`}
  </nav>`;
}

export function stagePage(ctx, stage) {
  const firstRead = (stage.firstRead || []).map(path => stage.lessons.find(lesson => lesson.path === path));
  return `<div class="container reading-container">
    ${breadcrumb(ctx, stage)}
    <div class="stage-layout">
      <aside class="stage-sidebar"><h2>学习阶段</h2>${stageNav(ctx, stage.id)}</aside>
      <div class="stage-content">
        <section class="stage-banner">
          <p class="eyebrow">阶段 ${stage.id.slice(0, 2)} · ${stage.lessons.length} 课</p>
          <h1>${text(stage.title)}</h1>
          <p>${text(stage.summary)}</p>
          <div class="stage-goal"><strong>阶段验收</strong><span>${text(stage.result)}</span></div>
        </section>
        ${firstRead.length ? `<nav class="stage-first-read" aria-labelledby="stage-first-read-title">
          <h2 id="stage-first-read-title">第一次读这个阶段</h2>
          <ol>${firstRead.map(lesson => `<li><a href="${href(ctx, lesson.path)}">${text(lesson.title)}</a></li>`).join('')}</ol>
        </nav>` : ''}
        <section aria-labelledby="stage-list-title" class="stage-lessons" data-stage-progress>
          <div class="stage-list-header"><h2 id="stage-list-title">本阶段课程</h2><span data-stage-label></span></div>
          <progress class="stage-progress" max="${stage.lessons.length}" value="0" aria-label="本阶段完成进度"></progress>
          <ol class="lesson-list">${stage.lessons.map((lesson, index) => `<li>
            <a href="${href(ctx, lesson.path)}" data-lesson-link="${text(lesson.path)}">
              <span class="lesson-number">${String(index + 1).padStart(2, '0')}</span>
              <span><strong>${text(lesson.title)}</strong><small>${text(lesson.summary)}</small></span>
              <span class="lesson-arrow" aria-hidden="true">→</span>
            </a>
          </li>`).join('')}</ol>
        </section>
        <details class="mobile-stages"><summary>切换学习阶段</summary>${stageNav(ctx, stage.id)}</details>
      </div>
    </div>
  </div>`;
}

export function catalogPage(ctx) {
  return `<div class="container catalog-page">
    ${breadcrumb(ctx)}
    <div class="catalog-intro"><div><p class="eyebrow">课程目录</p><h1>找到下一课</h1>
      <p>按方向浏览 ${ctx.lessonEntries.length} 课，或输入标题与关键词快速定位。</p></div>
      <a class="button button-secondary" href="${href(ctx, practice)}">打开实验室 ↗</a>
    </div>
    <div class="catalog-layout">
      <aside class="stage-sidebar"><h2>学习阶段</h2>${stageNav(ctx)}</aside>
      <div class="catalog-content" data-catalog>
        <div class="catalog-controls">
          <label class="catalog-field"><span>查找课程</span><input type="search" data-catalog-query placeholder="例如 钱包、对账、Layer 2"></label>
          <label class="catalog-field"><span>学习阶段</span><select data-catalog-stage>
            <option value="">全部阶段</option>${ctx.catalog.map(stage => `<option value="${stage.id}">${text(stage.title)}</option>`).join('')}
          </select></label>
          <label class="catalog-toggle"><input type="checkbox" data-catalog-unread>只看未完成</label>
        </div>
        <p class="catalog-status" data-catalog-status role="status">共 ${ctx.lessonEntries.length} 课</p>
        ${ctx.catalog.map(stage => `<section class="catalog-group" data-stage="${stage.id}">
          <h2><a href="${stageHref(ctx, stage)}"><span>${stage.id.slice(0, 2)}</span> ${text(stage.title)}</a></h2>
          <div class="catalog-lessons">${stage.lessons.map(lesson => `<a href="${href(ctx, lesson.path)}" data-lesson-link="${text(lesson.path)}">
            <span><strong>${text(lesson.title)}</strong><small>${text(lesson.summary)}</small></span>
            <span aria-hidden="true">→</span>
          </a>`).join('')}</div>
        </section>`).join('')}
      </div>
    </div>
  </div>`;
}

export function labPage(ctx) {
  return `<div class="container lab-page">
    <nav class="breadcrumb" aria-label="当前位置"><a href="${href(ctx, 'README.md')}">课程首页</a><span aria-hidden="true">/</span><span>交互实验室</span></nav>
    <div class="lab-intro"><div><p class="eyebrow">模拟环境</p><h1>Web3 交互实验室</h1>
      <p>改变交易参数、模拟价格下跌，或重放一条付款事件。结果随操作实时更新。</p></div>
      <div class="lab-intro-figure" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    </div>
    <nav class="lab-nav" aria-label="实验导航">${labPages.map(lab => `<a href="#${lab.id}">${text(lab.title)}</a>`).join('')}</nav>
    ${labPages.map(lab => `<section class="lab-section" id="${lab.id}">
      <div class="lab-heading"><p class="eyebrow">${text(lab.type)}</p><h2>${text(lab.title)}</h2><p>${text(lab.description)}</p></div>
      ${labContent(lab, ctx.base, ctx.filename)}
    </section>`).join('')}
    <script src="${ctx.base}/assets/lab-ui.mjs" type="module"></script>
  </div>`;
}

function caseCard(ctx, entry, open) {
  return `<details class="dossier" id="${entry.id}" data-topic="${entry.topic}"${open ? ' open' : ''}>
    <summary>
      <span class="dossier-kind">${text(entry.role)}</span>
      <span><strong>${text(entry.title)}</strong><small>${text(entry.subtitle)}</small></span>
      <span class="dossier-icon" aria-hidden="true"></span>
    </summary>
    <div class="dossier-body">
      <p class="dossier-context">${text(entry.context)}</p>
      <div class="case-detail-grid">
        <section><h3>当前证据</h3><dl>${entry.evidence.map(([label, value]) => `<div><dt>${text(label)}</dt><dd>${text(value)}</dd></div>`).join('')}</dl></section>
        <section><h3>处理顺序</h3><ol>${entry.workflow.map(step => `<li>${text(step)}</li>`).join('')}</ol></section>
      </div>
      <form class="case-quiz" data-case-quiz>
        <fieldset><legend>${text(entry.question)}</legend>
        ${entry.answers.map(([answer, correct, reason]) => `<label><input type="radio" name="answer" required data-correct="${correct}" data-reason="${text(reason)}"><span>${text(answer)}</span></label>`).join('')}
        </fieldset>
        <button type="submit" class="button button-primary">检查答案</button>
        <p data-case-feedback class="case-feedback" role="status" hidden></p>
      </form>
      <div class="dossier-links"><a class="text-link" href="${href(ctx, entry.lesson)}">读对应课程 →</a>
      ${entry.lab ? `<a class="text-link" href="${href(ctx, practice)}#${entry.lab}">打开对账实验 →</a>` : ''}</div>
    </div>
  </details>`;
}

export function businessPage(ctx) {
  return `<div class="container business-page">
    <nav class="breadcrumb" aria-label="当前位置"><a href="${href(ctx, 'README.md')}">课程首页</a><span aria-hidden="true">/</span><span>业务案例库</span></nav>
    <header class="business-intro">
      <div><p class="eyebrow">案例与验收</p><h1>Web3 业务案例库</h1>
        <p>从一张订单、一个钱包请求或一笔交易出发，判断现在知道什么、还要查什么，再决定下一步。</p></div>
      <ol class="business-method" aria-label="案例分析方法">
        <li><span>01</span><strong>定位业务状态</strong></li>
        <li><span>02</span><strong>核对关键证据</strong></li>
        <li><span>03</span><strong>选择恢复动作</strong></li>
      </ol>
    </header>
    <div class="business-layout">
      <aside class="business-filter" aria-label="按业务筛选">
        <h2>业务阶段</h2>
        <div class="business-filters" data-case-filters><button type="button" data-filter="" aria-pressed="true">全部案例 <span>${dossiers.length}</span></button>
        ${topics.map(topic => `<button type="button" data-filter="${topic.id}" aria-pressed="false">${text(topic.name)} <span>${dossiers.filter(entry => entry.topic === topic.id).length}</span></button>`).join('')}</div>
      </aside>
      <section class="business-list" aria-label="案例列表" data-case-list>
        <p class="catalog-status" data-case-status role="status">${dossiers.length} 个案例</p>
        ${dossiers.map((entry, index) => caseCard(ctx, entry, index === 0)).join('')}
      </section>
    </div>
  </div>`;
}

function toc(ctx, compact = false) {
  if (!ctx.doc.toc.length) return '';
  const links = ctx.doc.toc.map(item => `<a href="#${text(item.id)}">${text(item.title)}</a>`).join('');
  if (compact) {
    return `<details class="compact-toc"><summary>本篇目录</summary><nav aria-label="本篇目录">${links}</nav></details>`;
  }
  return `<nav class="article-toc" aria-label="本课目录">
    <h2>本篇目录</h2>
    ${links}
  </nav>`;
}

function mobileLessonList(ctx, stage, path) {
  return `<details class="mobile-stages"><summary>本阶段课程</summary><ol>
    ${stage.lessons.map(lesson => `<li><a href="${href(ctx, lesson.path)}"${lesson.path === path ? ' aria-current="page"' : ''}>${text(lesson.title)}</a></li>`).join('')}
  </ol></details>`;
}

function lessonNavigation(ctx, stage, index) {
  const previous = stage.lessons[index - 1];
  const next = stage.lessons[index + 1];
  const nextStage = ctx.catalog[ctx.catalog.findIndex(item => item.id === stage.id) + 1];
  return `<nav class="lesson-navigation" aria-label="课间导航">
    <a href="${previous ? href(ctx, previous.path) : stageHref(ctx, stage)}"><small>← ${previous ? '上一课' : '返回阶段'}</small><strong>${text(previous?.title ?? stage.title)}</strong></a>
    <a href="${next ? href(ctx, next.path) : nextStage ? stageHref(ctx, nextStage) : href(ctx, 'course/README.md')}"><small>${next ? '下一课' : nextStage ? '下一阶段' : '课程目录'} →</small><strong>${text(next?.title ?? nextStage?.title ?? '挑选下一项练习')}</strong></a>
  </nav>`;
}

export function lessonPage(ctx, lesson) {
  const { stage, path, index } = lesson;
  const lab = labPages.find(lab => lab.guide === path);
  const business = dossiers.find(entry => entry.lesson === path);
  const article = ctx.doc.html
    .replace(/(<\/h1>\n)<p><a[^>]*>课程首页<\/a> · <a[^>]*>本阶段<\/a><\/p>\n/, '$1')
    .replace(/<details>\s*<summary>展开本篇目录<\/summary>[\s\S]*?<\/details>\s*/, '')
    .replace(/<hr>\s*<p><a[^>]*>(?:上一课 · |查看本阶段)[^\n]*<\/p>\s*$/, '');
  return `<div class="container reading-container" data-lesson="${text(path)}">
    ${breadcrumb(ctx, stage)}
    <div class="lesson-layout">
      <aside class="stage-sidebar lesson-sidebar">
        <a class="sidebar-back" href="${stageHref(ctx, stage)}">← 返回阶段</a>
        <h2>${text(stage.title)}</h2>
        <ol>${stage.lessons.map((entry, n) => `<li><a href="${href(ctx, entry.path)}" data-lesson-link="${text(entry.path)}"${entry.path === path ? ' aria-current="page"' : ''}>
          <span class="lesson-index">${String(n + 1).padStart(2, '0')}</span>
          <span>${text(entry.title)}</span>
        </a></li>`).join('')}</ol>
      </aside>
      <div class="article-column">
        ${mobileLessonList(ctx, stage, path)}
        ${toc(ctx, true)}
        <p class="eyebrow lesson-meta">阶段 ${stage.id.slice(0, 2)} · 第 ${index + 1} / ${stage.lessons.length} 课</p>
        ${lab ? `<a class="article-lab" href="${href(ctx, practice)}#${lab.id}">练习 · ${text(lab.title)} <span aria-hidden="true">↗</span></a>` : ''}
        ${business ? `<a class="article-lab" href="${href(ctx, businessPagePath)}#${business.id}">案例 · ${text(business.title)} <span aria-hidden="true">↗</span></a>` : ''}
        <article class="prose">${article}</article>
        <div class="completion">
          <div><h2>记录本课进度</h2><p>完成练习后标记。进度保存在当前浏览器。</p></div>
          <button type="button" class="button button-primary" data-complete aria-pressed="false">标记为已学</button>
        </div>
        ${lessonNavigation(ctx, stage, index)}
      </div>
      ${toc(ctx)}
    </div>
  </div>`;
}

export function referencePage(ctx) {
  return `<div class="container reading-container reference-layout">
    ${breadcrumb(ctx)}
    <div class="reference-columns"><article class="prose">${toc(ctx, true)}${ctx.doc.html}</article>${toc(ctx)}</div>
  </div>`;
}
