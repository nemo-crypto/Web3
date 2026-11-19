# Solidity 与本地合约测试

[课程首页](../../README.md) · [本阶段](README.md)

> **学完能做到**：为简单合约设计角色、输入、状态和测试。

## 先看一个场景

票务合约需要限制管理员铸造，被核销票券不应再次入场。先在本地验证边界，再考虑上线。

## 核心原理

合约开发从状态模型和不变量开始。本地节点和测试框架用于重放成功、拒绝与边界输入。部署会固定链、地址与代码版本。

## 需要区分的概念

单元测试验证具体分支；模糊测试覆盖输入范围；不变量测试验证多步交互后仍成立的性质；集成测试覆盖钱包与数据层。

## 从伪代码写到验收条件

~~~text
redeem(ticketId, holder):
    require currentOwner(ticketId) == holder
    require redeemed[ticketId] == false
    redeemed[ticketId] = true
    emit Redeemed(ticketId, holder)
~~~

这段伪代码只描述状态规则。合约实现还要定义谁有权调用、如何证明实际持有人、合约可暂停的条件，以及转让后能否继续使用。测试环境可给两个模拟账户分别铸票，覆盖无权限、重复核销、转让后由新持有人核销。

部署产物至少保存源码提交、编译器配置、网络和合约地址。前端根据 ABI 生成调用，集成测试以部署后的合约为准跑一次完整流程。发现库或地址变化时先更新配置再重试。

## 动手练习

列出空地址、重复核销、权限不足、正常转让、部署配置五组测试。记录预期回退原因与最终状态。

## 自测

哪条检查适合做不变量？

<details>
<summary>查看参考答案</summary>

例如，所有被核销票的再次核销都得失败。测试可在随机转让、铸造和核销后检查这一约束。

</details>

## 延伸阅读

- [Solidity 文档](https://docs.soliditylang.org/)
- [Foundry](https://getfoundry.sh/)

---

[上一课 · EVM、合约、ABI 与状态](01-evm-and-contracts.md) · [下一课 · ethers v6 与合约调用](03-ethers-sdk.md)
