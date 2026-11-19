# DeFi、流动性与收益

[课程首页](../../README.md) · [所有阶段](../README.md)

沿着兑换、借贷、收益到清算理解资金流、费用和组合风险。

**适合** 进阶读者

**阶段验收** 能离线算出兑换、健康因子和收益，并标明假设。

## 第一次读这个阶段

1. [DeFi 全景与资金路径](01-defi-overview.md)
2. [AMM 流动性池](02-liquidity-pools.md)
3. [价格影响、滑点与最低输出](03-slippage.md)

## 课程目录

| 课程 | 学习成果 |
| --- | --- |
| [DeFi 全景与资金路径](01-defi-overview.md) | 理解兑换、借贷、稳定币和收益来源，并能解释一次组合操作依赖哪些协议 |
| [AMM 流动性池](02-liquidity-pools.md) | 手算恒定乘积兑换，区分池深度、LP 收益和无常损失 |
| [价格影响、滑点与最低输出](03-slippage.md) | 区分滑点、价格影响、点差和手续费，正确设置最低输出 |
| [MEV 与交易保护](04-mev-protection.md) | 理解链上 sandwich attack 的顺序，知道哪些措施能限制损失、哪些只改善体验 |
| [Uniswap V2 公式与合约](05-uniswap-v2.md) | 推导 V2 报价，理解 Pair、Router 和预言机边界，避免把示例计算器当成完整防夹合约 |
| [Uniswap v4 与 Hooks](06-uniswap-v4.md) | 理解 Hook 的调用位置、PoolManager 与闪电记账的作用，并能判断自定义池增加了哪些能力和风险 |
| [集中流动性与交易聚合](07-concentrated-liquidity.md) | 解释价格区间、流动性利用率和路由成本 |
| [借贷、健康因子与清算](08-lending-liquidation.md) | 在给定价格、抵押率和债务参数下演算风险 |
| [质押、LST 与机会成本](09-staking-basics.md) | 区分协议质押奖励、可转让凭证和退出风险 |
| [再质押与 LRT](10-restaking.md) | 分清 Staking、LST、Restaking 和 LRT，理解惩罚、收益与退出路径如何叠加 |
| [ERC-4626 金库与策略份额](11-vaults.md) | 分清资产与份额、接口标准与投资策略，理解策展人和分配者的权限，并计算金库净值 |
| [Pendle 与本金、收益拆分](12-yield-tokenization.md) | 理解 SY、PT、YT 的关系，计算 PT 的隐含收益，并解释为什么 YT 可能随着时间流逝而贬值 |
| [BTCFi 与比特币质押](13-btcfi.md) | 区分包装 BTC、借贷、Bitcoin 扩展网络和 BTC 质押，追踪资产实际由谁控制 |
| [APR、APY 与收益归因](14-yield-accounting.md) | 区分标称收益、复利、费用与持仓变动 |
| [借贷风控评审 · 抵押上限、清算与流动性](15-risk-parameter-review.md) | 用同一份输入比较抵押仓位、上限与预言机情景 |
| [聚合报价评审 · 报价方向、Gas 与落地](16-swap-quote-review.md) | 对同一报价输入比较不同路由的费用和执行约束 |
| [代币转账行为 · 手续费、重定基与余额差](17-token-transfer-behavior.md) | 处理实际到账与请求数量不一致的资产 |
| [闪电流动性 · 原子借还与风控边界](18-atomic-liquidity.md) | 用原子交易解释闪电借贷的用途、费用与风险检查 |
