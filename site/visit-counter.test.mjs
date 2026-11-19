import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createVisitCounter } from './visit-counter.mjs';

test('counts new browsers and repeated page views independently', () => {
  const counter = createVisitCounter(':memory:');
  try {
    const first = counter.record();
    assert.equal(first.visitors, 1);
    assert.equal(first.pageViews, 1);
    assert.deepEqual(counter.record(first.visitorId), { ...first, pageViews: 2 });
    const another = counter.record('invalid-cookie');
    assert.notEqual(another.visitorId, first.visitorId);
    assert.equal(another.visitors, 2);
    assert.equal(another.pageViews, 3);
  } finally {
    counter.close();
  }
});

test('visitor deduplication and counts survive server restart', () => {
  const dir = mkdtempSync(join(tmpdir(), 'web3-visits-'));
  const file = join(dir, 'stats.sqlite');
  let counter = createVisitCounter(file);
  try {
    const first = counter.record();
    counter.close();
    counter = createVisitCounter(file);
    assert.deepEqual(counter.record(first.visitorId), { ...first, pageViews: 2 });
  } finally {
    counter.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
