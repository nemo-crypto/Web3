export const labPages = [
  {
    id: 'swap',
    title: '兑换报价',
    type: 'AMM',
    description: '改变储备和成交量，观察报价、最低输出与费用如何变化。',
    guide: 'course/06-defi/05-uniswap-v2.md',
  },
  {
    id: 'lending',
    title: '借贷压力测试',
    type: 'DeFi',
    description: '模拟抵押品下跌，计算健康因子和清算边界。',
    guide: 'course/06-defi/08-lending-liquidation.md',
  },
  {
    id: 'payments',
    title: '稳定币对账',
    type: '支付',
    description: '回放分笔付款、重复事件和重组，检查入账结果。',
    guide: 'course/05-payments/03-payment-reconciliation.md',
  },
];

function field(label, name, value, { min = 0, max = 1000000000, step = 'any', unit = '' } = {}) {
  return `<label class="lab-field"><span>${label}</span><span class="lab-input">
    <input name="${name}" value="${value}" type="number" min="${min}" max="${max}" step="${step}" required>
    ${unit ? `<span>${unit}</span>` : ''}
  </span></label>`;
}

function swap() {
  return `<div class="lab-fields">
    ${field('输入资产储备', 'inputReserve', 10000, { min: .000001, unit: 'A' })}
    ${field('输出资产储备', 'outputReserve', 5000, { min: .000001, unit: 'B' })}
    ${field('本次投入', 'amount', 100, { min: .000001, unit: 'A' })}
    ${field('手续费', 'feeBps', 30, { max: 9999, step: 1, unit: 'bps' })}
    ${field('滑点容忍度', 'toleranceBps', 100, { max: 10000, step: 1, unit: 'bps' })}
  </div>
  <button class="button button-secondary" type="button" data-example>试试 2,000 A 的大额兑换</button>
  <p class="lab-hint">100 bps = 1%。实验按恒定乘积模型估算，链上整数舍入见公式课。</p>`;
}

function lending() {
  return `<div class="lab-fields">
    ${field('初始抵押品价值', 'collateral', 2000, { min: .01, unit: 'USD' })}
    ${field('当前债务', 'debt', 1000, { unit: 'USD' })}
    ${field('清算阈值', 'threshold', 75, { min: .01, max: 100, unit: '%' })}
  </div>
  <label class="lab-field lab-slider">
    <span>模拟跌幅 <output data-decline for="decline">35%</output></span>
    <input id="decline" aria-label="模拟跌幅" name="decline" type="range" min="0" max="100" value="35">
  </label>
  <p class="lab-hint">这里使用一个抵押品和固定债务。协议的实际清算还取决于预言机、规则和成交条件。</p>`;
}

function payments() {
  return `<div class="lab-fields">
    ${field('订单应收', 'due', 25, { min: .000001, max: 999999999, step: .000001, unit: 'USDC' })}
    ${field('入账金额', 'amount', 12.5, { min: .000001, max: 999999999, step: .000001, unit: 'USDC' })}
  </div>
  <div class="lab-controls">
    <button class="button button-primary" type="button" data-event="deposit">收到一笔付款</button>
    <button class="button button-secondary" type="button" data-event="repeat">重放最近付款</button>
    <button class="button button-secondary" type="button" data-event="reorg">撤回最近入账</button>
    <button class="button button-secondary" type="button" data-event="wrong">模拟错资产</button>
    <button class="button button-secondary" type="button" data-event="reset">重置事件</button>
  </div><p class="lab-hint">使用 6 位小数的模拟资产。只有与账单的链和币种一致的事件才入账。</p>`;
}

export function labContent(lab, base, filename) {
  const inputs = { swap, lending, payments }[lab.id]();
  return `<div class="lab-grid">
    <form class="lab-form" data-lab="${lab.id}">
      <h2>实验输入</h2>
      ${inputs}
      <p class="lab-error" data-lab-error role="alert" hidden></p>
    </form>
    <section class="lab-output" aria-labelledby="lab-result-${lab.id}">
      <h2 id="lab-result-${lab.id}">模拟结果</h2>
      <div class="lab-results" data-results="${lab.id}" aria-live="polite"></div>
      ${lab.id === 'payments' ? '<ol class="event-list" data-events aria-label="对账事件"></ol>' : ''}
      <a class="text-link" href="${base}/${filename(lab.guide)}">阅读对应课程 <span aria-hidden="true">→</span></a>
    </section>
  </div>`;
}
