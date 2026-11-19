export function quoteSwap({ inputReserve, outputReserve, amount, feeBps, toleranceBps }) {
  if (![inputReserve, outputReserve, amount, feeBps, toleranceBps].every(Number.isFinite)) {
    throw new RangeError('请使用有效的数字。');
  }
  if (inputReserve <= 0 || outputReserve <= 0 || amount <= 0) throw new RangeError('储备与输入数量必须大于零。');
  if (feeBps < 0 || feeBps >= 10_000 || toleranceBps < 0 || toleranceBps > 10_000) {
    throw new RangeError('手续费与滑点容忍度超出允许范围。');
  }

  const effective = amount * (1 - feeBps / 10_000);
  const expected = outputReserve * (effective / (inputReserve + effective));
  const minimum = expected * (1 - toleranceBps / 10_000);
  const spotQuote = amount * (outputReserve / inputReserve);
  const deviation = (1 - expected / spotQuote) * 100;
  return { expected, minimum, spotQuote, deviation };
}

export function lendingHealth({ collateral, debt, threshold, decline }) {
  if (![collateral, debt, threshold, decline].every(Number.isFinite)) throw new RangeError('请使用有效的数字。');
  if (collateral <= 0 || debt < 0 || threshold <= 0 || threshold > 100 || decline < 0 || decline > 100) {
    throw new RangeError('抵押价值必须大于零，债务不能为负，百分比应在允许范围内。');
  }

  const stressedCollateral = collateral * (1 - decline / 100);
  const riskAdjusted = stressedCollateral * threshold / 100;
  if (debt === 0) return { stressedCollateral, health: null, limit: 0, state: 'free' };

  const health = riskAdjusted / debt;
  let state = 'healthy';
  if (Math.abs(health - 1) < 1e-9) state = 'boundary';
  else if (health < 1) state = 'below';
  return { stressedCollateral, health, limit: debt / (threshold / 100), state };
}

export function amountInMinorUnits(text) {
  const value = String(text).trim();
  if (!/^\d{1,9}(?:\.\d{1,6})?$/.test(value)) {
    throw new RangeError('金额最多输入 9 位整数和 6 位小数。');
  }

  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * 1_000_000n + BigInt(fraction.padEnd(6, '0'));
}

export function reconcilePayment(due, events) {
  if (due <= 0n) throw new RangeError('应收金额必须大于零。');
  const posted = new Map();
  const removed = new Set();
  const records = events.map(event => {
    const id = `${event.chain}/${event.tx}/${event.log}`;
    const inclusion = `${id}/${event.block}`;
    if (event.asset !== 'USDC' || event.chain !== 'example-chain') {
      return '人工核对';
    }
    if (event.type === 'removed') {
      removed.add(inclusion);
      if (posted.get(id)?.block !== event.block) return '原记录未入账';
      posted.delete(id);
      return '已冲销';
    }
    if (removed.has(inclusion)) return '旧区块已撤销';
    if (posted.has(id)) return '已去重';
    posted.set(id, event);
    return '已入账';
  });

  const active = [...posted.values()];
  const received = active.reduce((sum, event) => sum + event.amount, 0n);
  const difference = received - due;
  const state = received === 0n ? '待付款' : difference < 0n ? '部分付款' : difference === 0n ? '足额到账' : '超额待处理';
  return { received, difference, state, records, active };
}
