const siteName = 'Web3 实战课程';
const siteUrl = 'https://nemo-crypto.github.io/Web3/';

const pageDescriptions = {
  'README.md': '中文 Web3 实战课程，涵盖区块链、钱包、智能合约、跨链、稳定币支付、DeFi、交易系统和代币经济学。用案例、模拟练习和验收清单理解业务流程。',
  'course/README.md': '按阶段浏览 Web3 实战课程，查找区块链、钱包、DApp、跨链、支付、DeFi、交易风控、治理和前沿协议的逐课内容。',
  'reference/business-cases.md': '通过 Papertrade 亏损发行与 USDC 分润、钱包接入、跨链提现、稳定币支付和票务核销案例，练习核对链上证据与业务状态。',
  'reference/practice-lab.md': '使用模拟数据练习 AMM 兑换报价、DeFi 借贷健康因子与稳定币支付对账，比较滑点、清算和重复事件的影响。',
  'reference/beginner-workbook.md': '用六道带答案的 Web3 练习复盘分笔付款、跨链提现、验票、钱包授权、商户净收与订单簿恢复。',
  'reference/frontier-reading-notes.md': '按主题查找 Web3 前沿资料，涵盖意图交易、智能体支付、再质押、预测市场和收益代币化，并追溯协议文档。',
  'reference/file-map.md': '查找 Web3 课程旧文件名与现有章节的对应关系，定位移动后的课文与原有章节。',
};

export function canonicalUrl(outputPath) {
  const path = outputPath.replace(/(^|\/)index\.html$/, '$1');
  return new URL(path, siteUrl).href;
}

export function pageSeo({ path, doc, filename, stage, lesson }) {
  const url = canonicalUrl(filename(path));
  const name = doc.title;
  const description = lesson?.summary ?? stage?.summary ?? pageDescriptions[path] ?? `${name}，Web3 实战课程参考资料。`;
  const title = path === 'README.md' ? siteName : `${name} · ${siteName}`;
  const schema = { '@context': 'https://schema.org', '@type': 'WebSite', name: siteName, url };
  if (path === 'README.md') return { title, description, url, schema };

  const trail = [[siteName, siteUrl]];
  if (lesson) {
    trail.push([lesson.stage.title, canonicalUrl(filename(`course/${lesson.stage.id}/README.md`))]);
  }
  trail.push([name, url]);

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, item], index) => ({
      '@type': 'ListItem', position: index + 1, name, item,
    })),
  };
  const page = {
    '@type': lesson ? 'Article' : 'WebPage',
    name,
    description,
    url,
    inLanguage: 'zh-CN',
    ...(lesson ? { headline: name, mainEntityOfPage: url } : {}),
  };
  return { title, description, url, schema: { '@context': 'https://schema.org', '@graph': [page, breadcrumbs] } };
}
