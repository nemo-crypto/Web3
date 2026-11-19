import assert from 'node:assert/strict';
import test from 'node:test';
import { amountInMinorUnits, lendingHealth, quoteSwap, reconcilePayment } from './lab-models.mjs';

test('swap model distinguishes spot value, fee-inclusive output and minimum', () => {
  const input = { inputReserve: 10_000, outputReserve: 5000, amount: 100, feeBps: 30, toleranceBps: 100 };
  const quote = quoteSwap(input);
  assert.ok(Math.abs(quote.expected - 49.35790171985306) < 1e-9);
  assert.equal(quote.minimum, quote.expected * .99);
  assert.equal(quote.spotQuote, 50);
  assert.ok(quoteSwap({ ...input, amount: 2000 }).deviation > quote.deviation);
  assert.throws(() => quoteSwap({ ...input, inputReserve: 0 }), RangeError);
});

test('lending model covers no debt and both sides of the educational liquidation line', () => {
  const input = { collateral: 2000, debt: 1000, threshold: 75, decline: 35 };
  const stressed = lendingHealth(input);
  assert.equal(stressed.stressedCollateral, 1300);
  assert.equal(stressed.health, .975);
  assert.equal(stressed.state, 'below');
  assert.equal(lendingHealth({ ...input, decline: 20 }).state, 'healthy');
  assert.equal(lendingHealth({ ...input, collateral: 2000, debt: 1500, decline: 0 }).state, 'boundary');
  assert.equal(lendingHealth({ ...input, debt: 0 }).health, null);
});

test('stablecoin values stay exact across six decimal places', () => {
  assert.equal(amountInMinorUnits('0.000001'), 1n);
  assert.equal(amountInMinorUnits('100000000.999999'), 100000000999999n);
  assert.throws(() => amountInMinorUnits('0.0000001'), RangeError);
});

test('ledger de-duplicates, rejects mismatched assets and handles reorganized inclusions', () => {
  const due = amountInMinorUnits('25');
  const first = { type: 'deposit', chain: 'example-chain', asset: 'USDC', tx: 'A', log: 0, block: 'one', amount: due / 2n };
  const second = { ...first, log: 1, block: 'one' };
  const wrong = { ...first, tx: 'X', asset: 'OTHER' };
  const wrongChain = { ...first, tx: 'Y', chain: 'wrong-chain' };
  const removed = { ...second, type: 'removed' };
  const initial = reconcilePayment(due, [first, first, second, wrong, wrongChain]);
  assert.equal(initial.received, due);
  assert.deepEqual(initial.records, ['已入账', '已去重', '已入账', '人工核对', '人工核对']);
  const reorg = reconcilePayment(due, [first, second, removed, second]);
  assert.equal(reorg.received, due / 2n);
  assert.equal(reorg.state, '部分付款');
  assert.equal(reorg.records.at(-1), '旧区块已撤销');
  assert.equal(reconcilePayment(due, [first, second, removed, { ...second, block: 'two' }]).received, due);
});
