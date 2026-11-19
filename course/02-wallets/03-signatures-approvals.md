# 签名、授权额度与撤销

[课程首页](../../README.md) · [本阶段](README.md)

> **学完能做到**：判断钱包弹窗将授予怎样的链上或链下权限。

## 先看一个场景

DApp 请求为某合约授予额度，然后用户取消兑换。已经写入链上的额度仍可存在。用户应能查询和撤销对应 spender 的授权。

## 核心原理

链上交易改变状态，消息签名可在不同协议内产生登录或可执行授权。ERC-20 allowance 是代币持有人授予 spender 的额度，ERC-2612 Permit 可以由签名授权并提交上链。

## 需要区分的概念

普通消息用途由验证规则定义；EIP-712 用结构化字段改进展示；Permit 的域、额度、nonce 和截止时间参与签名；revoke 是单独的状态变更。

## 动手练习

读取模拟授权的链、代币地址、spender、额度、deadline。按 spender 比对授权表，在模拟环境执行撤销，随后再次查询 allowance。

## 自测

钱包说本次签名没有 Gas，表示它不会影响资产吗？

<details>
<summary>查看参考答案</summary>

签名的用途要由数据及验证者决定。可执行 Permit 或订单可由其他提交者上链，用户仍应核对范围和截止时间。

</details>

## 延伸阅读

- [EIP-712](https://eips.ethereum.org/EIPS/eip-712)
- [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612)

---

[上一课 · 私钥、助记词与账户恢复](02-keys-backup-and-recovery.md) · [下一课 · 连接钱包与账户切换](04-connect-wallet.md)
