import { amountInMinorUnits, lendingHealth, quoteSwap, reconcilePayment } from './lab-models.mjs';

const numberFormat = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 6 });
const format = value => Math.abs(value) < .000001 && value !== 0 ? value.toExponential(3) : numberFormat.format(value);

function formatMinorUnits(amount) {
  const positive = amount < 0n ? -amount : amount;
  const whole = numberFormat.format(positive / 1_000_000n);
  const decimals = String(positive % 1_000_000n).padStart(6, '0').replace(/0+$/, '');
  return `${amount < 0n ? '−' : ''}${whole}${decimals ? '.' + decimals : ''}`;
}

function bindLab(form, render) {
  const panel = document.querySelector(`[data-results="${form.dataset.lab}"]`);
  const error = form.querySelector('[data-lab-error]');
  function update() {
    try {
      if (!form.checkValidity()) throw new RangeError('请补齐输入，并核对金额与百分比范围。');
      render(new FormData(form), panel);
      error.hidden = true;
    } catch (failure) {
      if (!(failure instanceof RangeError)) throw failure;
      error.textContent = failure.message;
      error.hidden = false;
    }
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  return update;
}

function numeric(formData) {
  return Object.fromEntries([...formData].map(([key, value]) => [key, Number(value)]));
}

function metrics(rows) {
  return `<dl class="metrics-list">${rows.map(([label, value]) =>
    `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
}

const swapForm = document.querySelector('[data-lab="swap"]');
const updateSwap = bindLab(swapForm, (data, panel) => {
  const { expected, minimum, spotQuote, deviation } = quoteSwap(numeric(data));
  panel.innerHTML = `<p class="result-label">预计收到</p><p class="result-number">${format(expected)} <small>B</small></p>
    <div class="result-comparison"><span>相对成交前池内价格的差值（含手续费）</span><strong>${format(deviation)}%</strong></div>
    <progress max="100" value="${Math.max(0, Math.min(100, deviation))}">${format(deviation)}%</progress>
    ${metrics([['最低输出', format(minimum) + ' B'], ['按成交前池内价格估算', format(spotQuote) + ' B']])}`;
});
swapForm.querySelector('[data-example]').addEventListener('click', () => {
  swapForm.elements.amount.value = '2000';
  updateSwap();
});
updateSwap();

const lendingForm = document.querySelector('[data-lab="lending"]');
const states = { healthy: '高于清算边界', boundary: '处在清算边界', below: '低于清算边界', free: '没有债务' };
const updateLending = bindLab(lendingForm, (data, panel) => {
  const input = numeric(data);
  const { stressedCollateral, health, limit, state } = lendingHealth(input);
  lendingForm.querySelector('[data-decline]').textContent = `${input.decline}%`;
  panel.innerHTML = `<p class="result-label">健康因子</p><p class="result-number ${state}">${health === null ? '—' : format(health)}</p>
    <div class="result-comparison"><span>模型判定</span><strong class="${state}">${states[state]}</strong></div>
    ${health === null ? '' : `<progress max="2" value="${Math.max(0, Math.min(2, health))}" aria-label="健康因子，显示区间 0 到 2">${format(health)}</progress>`}
    ${metrics([['下跌后抵押价值', format(stressedCollateral) + ' USD'], ['清算边界对应的抵押价值', format(limit) + ' USD']])}`;
});
updateLending();

const paymentForm = document.querySelector('[data-lab="payments"]');
const eventList = document.querySelector('[data-events]');
let sequence = 0;
let events = [];
let latest;
let active = [];
const updatePayments = bindLab(paymentForm, (data, panel) => {
  const due = amountInMinorUnits(data.get('due'));
  const result = reconcilePayment(due, events);
  active = result.active;
  const title = result.difference < 0n ? '仍需付款' : '超收金额';
  const gap = result.difference < 0n ? -result.difference : result.difference;
  panel.innerHTML = `<p class="result-label">${result.state}</p><p class="result-number">${formatMinorUnits(result.received)} <small>USDC</small></p>
    <progress max="1" value="${Math.min(1, Number(result.received) / Number(due))}" aria-label="应收款完成比例"></progress>
    ${metrics([['应收金额', formatMinorUnits(due)], [title, formatMinorUnits(gap)]])}`;
  eventList.replaceChildren();
  events.forEach((event, index) => {
    const row = document.createElement('li');
    const detail = document.createElement('span');
    const status = document.createElement('strong');
    detail.textContent = `${event.type === 'removed' ? '撤回' : '收到'} ${event.tx} · ${formatMinorUnits(event.amount)} ${event.asset}`;
    status.textContent = result.records[index];
    row.append(detail, status);
    eventList.append(row);
  });
  paymentForm.querySelector('[data-event="repeat"]').disabled = !latest;
  paymentForm.querySelector('[data-event="reorg"]').disabled = !active.length;
  paymentForm.querySelector('[data-event="reset"]').disabled = !events.length;
});
paymentForm.addEventListener('click', event => {
  const action = event.target.closest('[data-event]')?.dataset.event;
  if (!action) return;
  if (action === 'reset') {
    events = [];
    latest = undefined;
  } else if (action === 'repeat' && latest) {
    events.push(latest);
  } else if (action === 'reorg' && active.length) {
    events.push({ ...active.at(-1), type: 'removed' });
  } else if (action === 'deposit' || action === 'wrong') {
    const input = paymentForm.elements.amount;
    if (!paymentForm.checkValidity() || !/^\d{1,9}(?:\.\d{1,6})?$/.test(input.value)) {
      updatePayments();
      const error = paymentForm.querySelector('[data-lab-error]');
      error.textContent = '请输入有效金额，最多 6 位小数。';
      error.hidden = false;
      input.focus();
      return;
    }
    const amount = amountInMinorUnits(input.value);
    sequence++;
    latest = {
      type: 'deposit',
      chain: 'example-chain',
      asset: action === 'wrong' ? 'OTHER' : 'USDC',
      tx: `TX-${sequence}`,
      log: 0,
      block: `BLOCK-${sequence}`,
      amount,
    };
    events.push(latest);
  }
  updatePayments();
});
updatePayments();
