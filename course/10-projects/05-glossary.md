# 中文术语速查

[课程首页](../../README.md) · [本阶段](README.md)

> **学完能做到**：能用简短、准确的词义定位应读章节。

## 先看一个场景

你第一次看钱包报错或产品需求时，可从下表定位到对应章节。

## 核心原理

用产品动作和数据来源解释词汇，然后沿课程链接看完整生命周期。

## 需要区分的概念

状态、权限、结算、价格、索引、治理是六大类。

## 按关键词查找

| 术语 | 含义 | 详细课程 |
| --- | --- | --- |
| 地址 Address | 链上的公开定位符 | [账户与 UTXO](../01-blockchain/03-accounts-utxo.md) |
| UTXO | 可作为后续输入的未花费交易输出 | [账户与 UTXO](../01-blockchain/03-accounts-utxo.md) |
| Nonce | 不同协议中用于约束一次性或顺序的数字 | [交易回执](../01-blockchain/07-transaction-lifecycle.md) |
| Gas | 执行资源计量单位 | [交易回执](../01-blockchain/07-transaction-lifecycle.md) |
| Finality | 对某段历史达到协议最终确认的性质 | [共识与最终性](../01-blockchain/05-consensus-finality.md) |
| Signer | 能授权或签署操作的接口或角色 | [ethers v6](../03-development/03-ethers-sdk.md) |
| Allowance | ERC-20 允许某个 spender 消费的额度 | [签名与授权](../02-wallets/03-signatures-approvals.md) |
| SIWE | 以约定的以太坊签名消息验证网站登录 | [钱包登录](../02-wallets/05-sign-in-with-ethereum.md) |
| Session Key | 受范围约束的短期或可撤销签名凭据 | [多签与会话密钥](../02-wallets/09-multisig-and-session-keys.md) |
| ABI | 定义合约方法和事件编码的接口描述 | [EVM 与合约](../03-development/01-evm-and-contracts.md) |
| RPC | 访问节点信息和调用接口的方式 | [RPC 与事件](../03-development/04-rpc-events-and-reorgs.md) |
| Oracle | 为合约提供特定外部数据的机制 | [预言机](../03-development/06-oracles.md) |
| Rollup | 将部分执行扩展到 L1 外并由底层验证或结算的设计 | [Layer 2](../04-scaling/01-layer-2.md) |
| Sequencer | 为交易安排顺序的参与方或机制 | [Based Rollup](../04-scaling/08-based-rollups.md) |
| DA | 让验证者取得所需数据的能力 | [数据可用性](../04-scaling/03-data-availability.md) |
| ZK | 能证明声明成立并限制额外信息泄露的属性 | [零知识证明](../04-scaling/06-zero-knowledge.md) |
| AMM | 按算法及储备状态定价并成交的机制 | [AMM 流动性池](../06-defi/02-liquidity-pools.md) |
| LP | 流动性提供者，也常指对应份额凭证 | [AMM 流动性池](../06-defi/02-liquidity-pools.md) |
| Slippage | 成交相对于预期基准的偏差 | [滑点](../06-defi/03-slippage.md) |
| MEV | 与交易的包含、排除和排序有关的可提取价值 | [MEV 与交易保护](../06-defi/04-mev-protection.md) |
| LTV | 债务价值相对于抵押价值的贷款比例 | [借贷与清算](../06-defi/08-lending-liquidation.md) |
| LST | 与质押头寸相关的可流通凭证 | [质押与 LST](../06-defi/09-staking-basics.md) |
| Basis | 相同或相关资产现货与衍生品之间的价格差 | [基差和资金费率](../07-markets/12-basis-and-funding.md) |
| CID | 用于定位特定内容的标识 | [NFT 与 IPFS](../08-applications/01-nft-metadata-and-ipfs.md) |
| Timelock | 给指定操作设置执行等待时间的机制 | [DAO 治理](../08-applications/02-dao-governance.md) |
| RWA | 通过代币、记录或凭证关联的现实资产相关权利 | [现实资产代币化](../05-payments/06-real-world-assets.md) |
| KYA | 核对智能体身份、能力或信任条件的做法 | [智能体身份](../09-frontier/03-agent-identity.md) |
| PSBT | 多方检查和签名 Bitcoin 交易时交换的标准化格式 | [Bitcoin PSBT](../01-blockchain/10-bitcoin-psbt.md) |
| Gas limit | 签名时给单笔交易设置的执行资源上限 | [Gas 报价](../01-blockchain/11-fee-estimates-and-limits.md) |
| ENS | 通过解析记录把名称与链上地址等信息关联的系统 | [ENS 解析](../02-wallets/12-ens-address-resolution.md) |
| Batch ID | 钱包支持批量调用时用于查询该批次状态的标识 | [钱包批量调用](../02-wallets/13-wallet-batched-calls.md) |
| Webhook | 外部系统主动向应用投递的事件通知 | [Webhook 可靠接收](../03-development/13-webhook-delivery.md) |
| Canonical | 当前按照协议接受的规范链历史 | [事件索引表](../03-development/14-indexed-data-schema.md) |
| Blob | 以太坊指定交易类型关联的数据对象及提交方式 | [Blob 与归档](../04-scaling/12-blobs-and-data-retention.md) |
| 标记价 Mark Price | 某些市场用于风险计算的参考价 | [合约指标价格](../07-markets/18-derivative-settlement-prices.md) |
| Royalty | 按交易规则向权利人结算的版税 | [NFT 二级交易](../08-applications/14-nft-royalties-and-secondary.md) |
| Credential status | 指示已签发凭证是否暂停或撤销等状态的机制 | [可验证凭证](../09-frontier/12-credential-status-revocation.md) |

## 动手练习

先搜索原文关键字，再通读对应课程的案例和自测。

## 自测

Receipt 和 Event 怎样区分？

<details>
<summary>查看参考答案</summary>

回执描述交易在某区块执行及结果；事件是合约执行过程中记录的日志，可帮助查询业务历史。

</details>

---

[上一课 · 项目四 · 协议评审与产品设计](04-project-protocol-review.md) · [下一课 · 项目五 · 链上支付上线与故障演练](06-project-incident-drill.md)
