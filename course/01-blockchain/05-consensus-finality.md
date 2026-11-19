# 共识、分叉与最终性

[课程首页](../../README.md) · [本阶段](README.md)

> **学完能做到**：用不同确认层级设计账务入账规则。

## 先看一个场景

支付服务看见交易处于最新区块便开始履约，随后链头改变，这笔交易消失或尚未重新打包。订单需要能够回到待确认。

## 核心原理

共识让节点选择共同接受的历史。分叉可能导致短期历史变化；确认深度与最终性取决于具体协议。协议最终性和应用接受风险的时点应分开记录。

## 需要区分的概念

交易哈希用于追踪；区块哈希标识某段历史上的位置；区块高度表示顺序；最终性或安全标签需要按网络语义解释。

## 动手练习

设计 observed、confirmed、finalized 状态。保存区块哈希与高度，处理重组时先撤回暂定记录再重放已有事件。

## 自测

区块高度相同，可以认为记录是同一个区块吗？

<details>
<summary>查看参考答案</summary>

要比较区块哈希及其父链。发生重组时，相同高度可能对应不同区块。

</details>

## 延伸阅读

- [Ethereum PoS 文档](https://ethereum.org/developers/docs/consensus-mechanisms/pos/)
- [Bitcoin 交易指南](https://developer.bitcoin.org/devguide/transactions.html)

---

[上一课 · Layer 1 与结算](04-layer-1.md) · [下一课 · Bitcoin、Ethereum 与 Solana](06-btc-eth-sol.md)
