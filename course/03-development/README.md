# 智能合约、DApp 与数据

[课程首页](../../README.md) · [所有阶段](../README.md)

从合约接口与本地测试到前端、事件索引和上线维护。

**适合** 开发者

**阶段验收** 能说明一笔合约写入的状态机，并设计重试和对账测试。

## 课程目录

| 课程 | 学习成果 |
| --- | --- |
| [EVM、合约、ABI 与状态](01-evm-and-contracts.md) | 理解可读调用、写入交易和事件日志 |
| [Solidity 与本地合约测试](02-solidity-testing.md) | 为简单合约设计角色、输入、状态和测试 |
| [ethers v6 与合约调用](03-ethers-sdk.md) | 理解 Provider、Signer、Contract 与单位转换，读懂旧版示例并避免混用 API |
| [JSON-RPC、回执、事件与重组](04-rpc-events-and-reorgs.md) | 设计可恢复的链上事件同步和查询 |
| [链上索引与 GraphQL](05-graphql-indexing.md) | 理解 RPC、索引器和 GraphQL 的分工，避免把“最新返回”当成“链上最终状态” |
| [预言机、价格来源与时效](06-oracles.md) | 检查链上价格的单位、时间、来源和备用逻辑 |
| [合约权限、升级与安全验收](07-contract-security-upgrades.md) | 从防御角度审阅角色、升级、外部调用与应急流程 |
| [DApp 发布、监控与重试](08-dapp-release.md) | 设计前端交易状态、索引一致性及应急演练 |
| [交易前端状态机 · 从点击到业务完成](09-transaction-ui-state-machine.md) | 统一签名、提交、替换、失败与确认时的页面文案和恢复条件 |
| [合约发版验收 · 部署证据与角色交接](10-release-deployment-review.md) | 整理合约地址、编译产物、角色差异与回退条件 |
| [链上数据分析 · 事件、口径与数据延迟](11-onchain-analytics.md) | 定义能复跑的活跃、交易额、收入与留存统计 |
| [Solidity 事件实训 · 业务状态与索引字段](12-solidity-event-workshop.md) | 将本地的订单核销状态、日志与读取结果对应起来 |
| [Webhook 回调 · 签名核验、重复和乱序](13-webhook-delivery.md) | 为支付或索引通知设计可靠的接收与重放 |
| [事件索引表 · 原始记录、业务读模型与重建](14-indexed-data-schema.md) | 为链上查询建最小可追溯的数据表和游标 |
