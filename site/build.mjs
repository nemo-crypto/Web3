import { copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import { businessPage, catalogPage, homePage, labPage, lessonPage, pageShell, referencePage, stagePage } from './templates.mjs';
import { businessCases, businessPagePath, topics } from './business.mjs';
import { labPages } from './labs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const checking = process.argv.includes('--check');
const visitEndpoint = process.env.WEB3_VISIT_ENDPOINT?.trim();
if (visitEndpoint && new URL(visitEndpoint).protocol !== 'https:') {
  throw new Error('WEB3_VISIT_ENDPOINT must use HTTPS');
}
const visitCounter = Boolean(visitEndpoint) || process.argv.includes('--visit-counter');
const markdown = new MarkdownIt({ html: true, linkify: true, typographer: false });
const catalog = JSON.parse(await readFile(resolve(root, 'course/catalog.json'), 'utf8'));
const lessonEntries = catalog.flatMap(stage => stage.lessons.map((lesson, index) => ({ ...lesson, stage, index })));
const stageEntries = catalog.map(stage => ({ ...stage, path: `course/${stage.id}/README.md` }));
const notes = (await readdir(resolve(root, 'reference')))
  .filter(name => name.endsWith('.md'))
  .map(name => `reference/${name}`);
const allPaths = new Set(['README.md', 'course/README.md', ...notes, ...stageEntries.map(e => e.path), ...lessonEntries.map(e => e.path)]);
const documents = new Map();
const links = [];
const errors = [];

const fence = markdown.renderer.rules.fence;
markdown.renderer.rules.fence = (tokens, index, options, env, self) => {
  const token = tokens[index];
  if (token.info.trim() === 'mermaid') {
    return `<figure class="diagram"><pre data-diagram>${markdown.utils.escapeHtml(token.content)}</pre></figure>\n`;
  }
  return fence(tokens, index, options, env, self);
};

function outputPath(path) {
  return path.replace(/README\.md$/, 'index.html').replace(/\.md$/, '.html');
}

function slug(text) {
  return text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-') || 'section';
}

function relativePage(from, to) {
  return posix.relative(posix.dirname(outputPath(from)), outputPath(to));
}

function linkTarget(source, raw) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return raw;
  const [location, anchor = ''] = raw.split('#', 2);
  const target = location ? posix.normalize(posix.join(posix.dirname(source), decodeURIComponent(location))) : source;
  links.push({ source, target, anchor: decodeURIComponent(anchor) });
  return (location ? relativePage(source, target) : '') + (anchor ? `#${anchor}` : '');
}

function loadPage(source, text) {
  const env = {};
  const tokens = markdown.parse(text, env);
  const anchors = new Set();
  const toc = [];

  for (const [index, token] of tokens.entries()) {
    if (token.type === 'html_block' || token.type === 'html_inline') {
      for (const match of token.content.matchAll(/\sid=["']([^"']+)["']/g)) anchors.add(match[1]);
    }
    if (token.type === 'heading_open') {
      const title = tokens[index + 1].content;
      const base = slug(title);
      let id = base;
      for (let duplicate = 1; anchors.has(id); duplicate++) id = `${base}-${duplicate}`;
      token.attrSet('id', id);
      anchors.add(id);
      if (token.tag === 'h2') toc.push({ id, title });
    }
    for (const child of token.children || []) {
      if (child.type === 'html_inline') {
        for (const match of child.content.matchAll(/\sid=["']([^"']+)["']/g)) anchors.add(match[1]);
      }
      if (child.type === 'link_open') child.attrSet('href', linkTarget(source, child.attrGet('href')));
      if (child.type === 'image') child.attrSet('src', linkTarget(source, child.attrGet('src')));
    }
  }

  return {
    title: tokens.find(t => t.type === 'heading_open') ? tokens[tokens.findIndex(t => t.type === 'heading_open') + 1].content : source,
    toc,
    html: markdown.renderer.render(tokens, markdown.options, env),
    anchors,
    searchText: tokens.filter(token => token.type === 'inline').map(token => (
      token.children.filter(child => child.type === 'text' || child.type === 'code_inline')
        .map(child => child.content).join(' ')
    )).join(' '),
  };
}

for (const source of allPaths) {
  const text = await readFile(resolve(root, source), 'utf8');
  documents.set(source, loadPage(source, text));
}
const onDisk = await Promise.all(catalog.map(async stage => {
  const files = await readdir(resolve(root, 'course', stage.id));
  return files.filter(file => file !== 'README.md' && file.endsWith('.md')).map(file => `course/${stage.id}/${file}`);
}));
const diskLessons = new Set(onDisk.flat());
const indexedLessons = new Set(lessonEntries.map(lesson => lesson.path));
const caseIds = new Set();
for (const entry of businessCases) {
  if (caseIds.has(entry.id) || !topics.some(topic => topic.id === entry.topic) || !indexedLessons.has(entry.lesson)
    || (entry.lab && !labPages.some(lab => lab.id === entry.lab)) || entry.answers.filter(([, correct]) => correct).length !== 1) {
    errors.push(`Invalid business case: ${entry.id}`);
  }
  caseIds.add(entry.id);
}
if (indexedLessons.size !== lessonEntries.length) errors.push('Duplicate course paths in catalog');
for (const stage of catalog) {
  const firstRead = stage.firstRead || [];
  for (const path of firstRead) {
    if (!stage.lessons.some(lesson => lesson.path === path)) errors.push(`Invalid first-read lesson for ${stage.id}: ${path}`);
  }
}
for (const lesson of diskLessons) if (!indexedLessons.has(lesson)) errors.push(`Lesson missing from catalog: ${lesson}`);
for (const { path, stage } of lessonEntries) {
  if (!path.startsWith(`course/${stage.id}/`) || !diskLessons.has(path)) errors.push(`Invalid catalog entry: ${path}`);
  const doc = documents.get(path);
  for (const heading of ['先看一个场景', '自测']) {
    if (!doc.toc.some(section => section.title.includes(heading))) errors.push(`${path} is missing a ${heading} section`);
  }
}
for (const { source, target, anchor } of links) {
  if (!documents.has(target)) errors.push(`${source} links to missing file ${target}`);
  else if (anchor && !documents.get(target).anchors.has(anchor)) errors.push(`${source} links to missing anchor ${target}#${anchor}`);
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else {
  const pages = new Map();
  for (const [path, doc] of documents) {
    const stage = stageEntries.find(entry => entry.path === path);
    const lesson = lessonEntries.find(entry => entry.path === path);
    const base = posix.relative(posix.dirname(outputPath(path)), '.') || '.';
    const context = { path, base, catalog, lessonEntries, filename: outputPath, doc, visitCounter, visitEndpoint };
    const content = path === 'README.md' ? homePage(context) :
      path === 'course/README.md' ? catalogPage(context) :
      path === businessPagePath ? businessPage(context) :
      path === 'reference/practice-lab.md' ? labPage(context) :
      stage ? stagePage(context, stage) :
      lesson ? lessonPage(context, lesson) :
      referencePage(context);
    pages.set(outputPath(path), pageShell(context, content));
  }

  if (!checking) {
    const nextOutput = resolve(root, 'dist.next');
    await rm(nextOutput, { recursive: true, force: true });
    await mkdir(resolve(nextOutput, 'assets'), { recursive: true });
    await Promise.all([
      copyFile(resolve(root, 'site/styles.css'), resolve(nextOutput, 'assets/styles.css')),
      copyFile(resolve(root, 'site/app.js'), resolve(nextOutput, 'assets/app.js')),
      copyFile(resolve(root, 'site/lab-ui.mjs'), resolve(nextOutput, 'assets/lab-ui.mjs')),
      copyFile(resolve(root, 'site/lab-models.mjs'), resolve(nextOutput, 'assets/lab-models.mjs')),
      copyFile(resolve(root, 'node_modules/mermaid/dist/mermaid.min.js'), resolve(nextOutput, 'assets/mermaid.min.js')),
      writeFile(resolve(nextOutput, 'assets/search-index.json'), JSON.stringify(lessonEntries.map(lesson => ({
        path: outputPath(lesson.path),
        id: lesson.path,
        title: lesson.title,
        summary: lesson.summary,
        stage: lesson.stage.title,
        terms: documents.get(lesson.path).toc.map(item => item.title).join(' '),
        content: documents.get(lesson.path).searchText,
      })))),
    ]);
    for (const [path, html] of pages) {
      await mkdir(dirname(resolve(nextOutput, path)), { recursive: true });
      await writeFile(resolve(nextOutput, path), html);
    }
    await rm(output, { recursive: true, force: true });
    await rename(nextOutput, output);
  }
  console.log(`${catalog.length} stages, ${lessonEntries.length} lessons, ${pages.size} pages, ${links.length} internal links checked.`);
}
