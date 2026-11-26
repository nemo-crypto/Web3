import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const key = 'web3-course:last-lesson:v1';
function page(t) {
  const dom = new JSDOM(`<body data-base="/Web3"><a data-resume href="/Web3/course/intro/start.html">开始第一课 <span aria-hidden="true">→</span></a><dialog id="search-dialog"></dialog><input id="search-input"><ul id="search-results"></ul><p id="search-status"></p>`, { url: 'https://example.invalid/Web3/', runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  dom.window.localStorage.setItem(key, JSON.stringify('course/wallets/security.md'));
  dom.window.eval(source);
  return dom.window;
}

test('clearing reading history in another tab restores the original start link', t => {
  const win = page(t);
  const link = win.document.querySelector('[data-resume]');
  assert.equal(link.getAttribute('href'), '/Web3/course/wallets/security.html');
  assert.match(link.textContent, /继续上次阅读/);
  win.localStorage.clear();
  win.dispatchEvent(new win.StorageEvent('storage', { key: null }));
  assert.equal(link.getAttribute('href'), '/Web3/course/intro/start.html');
  assert.equal(link.textContent, '开始第一课 →');
  assert.equal(link.querySelector('span').getAttribute('aria-hidden'), 'true');
});

test('removing or invalidating the last lesson resets resume, and new valid history works again', t => {
  const win = page(t);
  const link = win.document.querySelector('[data-resume]');
  for (const stored of [null, '{broken', JSON.stringify('../outside.md'), JSON.stringify({ path: 'course/wallets/security.md' })]) {
    if (stored === null) win.localStorage.removeItem(key);
    else win.localStorage.setItem(key, stored);
    win.dispatchEvent(new win.StorageEvent('storage', { key }));
    assert.equal(link.getAttribute('href'), '/Web3/course/intro/start.html');
    assert.equal(link.textContent, '开始第一课 →');
    win.localStorage.setItem(key, JSON.stringify('course/defi/lending.md'));
    win.dispatchEvent(new win.StorageEvent('storage', { key }));
    assert.equal(link.getAttribute('href'), '/Web3/course/defi/lending.html');
    assert.match(link.textContent, /继续上次阅读/);
  }
});
