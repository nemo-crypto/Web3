# 账户模型、UTXO 与状态

[课程首页](../../README.md) · [本阶段](README.md)

> **学完能做到**：看懂 Bitcoin 找零与 EVM 账户式转账。

## 先看一个场景

Alice 有一个面值 100 的未花费输出，要付 35，手续费 1。她构造收款输出 35 和找零输出 64，原输出被整体花费。

## 核心原理

UTXO 模型消费已存在输出并创建新输出，各输出有花费条件。账户模型以状态更新账户余额；EVM 交易使用发送账户的 nonce 表示执行顺序。

## 需要区分的概念

Bitcoin 查哪些输出尚未被消费；EVM 查账户或代币合约中的余额；Solana 账户模型还显式区分程序和数据账户。

## 动手练习

在纸上画出花费前后的输出。再对比 EVM 的发送方扣除金额与手续费、接收方增加金额以及 nonce 更新。

## 自测

使用相同地址，能直接把 Bitcoin UTXO 式余额查询套到所有链吗？

<details>
<summary>查看参考答案</summary>

需要为每条链选择合适的模型与接口。代币余额通常来自合约或程序状态，原生资产也要确认所在链。

</details>

## 延伸阅读

- [Bitcoin 交易指南](https://developer.bitcoin.org/devguide/transactions.html)
- [Solana 核心概念](https://solana.com/docs/core)

---

[上一课 · 哈希、签名与 Merkle 证明](02-hash-signatures-merkle.md) · [下一课 · Layer 1 与结算](04-layer-1.md)
