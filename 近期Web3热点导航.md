<a id="top"></a>

# 近期 Web3 热点导航：先看证据，再学概念

[← 学习总目录](README.md) · [近期热点导航](近期Web3热点导航.md)

> **阅读目标**：快速找到值得补课的主题，区分新协议、持续关注的应用与理解热点所需的基础设施。
>
> **累计补充**：28 篇教学专题（首批 12 篇，第二批 8 篇，第三批 8 篇）；资料检索与协议状态核验日期为 **2026-11-09**。
>
> **热度口径**：本次没有取得 2026 年 11 月的实时 Google / 百度搜索量，因此这是一份有来源的选题导航，**不是当月搜索量排行榜**。排序按学习价值与主题关联，不按虚构热度分数。

<details>
<summary>展开本篇目录</summary>

- [1. 这次为什么选这些主题](#section-1)
- [2. 优先补课：新协议与新的组合方式](#section-2)
- [3. 持续受到关注的应用方向](#section-3)
- [4. 理解热点所需的延伸基础](#section-4)
- [5. 常见搜索问题应该读哪篇](#section-5)
- [6. 本次资料核验记录](#section-6)
- [7. 如果想继续追踪真正的搜索热度](#section-7)
- [8. 自测与参考答案](#section-8)
- [9. 第二批：智能体商务、可信数据与新应用](#section-9)
- [10. 第二批资料核验与版本边界](#section-10)
- [11. 第三批：支付链、开放市场与可编程收益](#section-11)
- [12. 第三批资料核验与版本边界](#section-12)

</details>

---


<a id="section-1"></a>

## 1. 这次为什么选这些主题

本次先查公开报告，再用官方规范与项目资料核对机制。可读来源包括 a16z 的《State of Crypto 2025》（2025-10-22）与面向 2026 的趋势展望（2025-12-11），以及各协议的官方页面或仓库。

行业报告用于判断哪些方向值得关注，官方资料用于解释技术与版本；两类证据不能互相替代。展望文章表达的是作者判断，不表示其中预测已全部发生。投资机构报告也不等于中立的全网搜索统计。

| 信号 | 本次能支持什么 | 不能支持什么 |
| --- | --- | --- |
| 2025 行业报告 | 智能体支付、稳定币、预测市场、永续交易、DePIN、隐私受到讨论 | 当前每个关键词的搜索量排名 |
| 2026 趋势展望 | KYA、x402、隐私及预测市场等被列入关注方向 | 未来增长或商业成功保证 |
| 官方规范与仓库 | 机制定义、文档迁移、规范状态 | 用户数量、投资价值或无漏洞保证 |
| 现有教程缺口 | 哪些内容有助于建立完整知识链 | 该方向一定是刚出现的新概念 |

CoinGecko 的叙事热度与年度报告页面本次返回访问限制，未将它们当成已读取的排名来源。部分项目文档站超时后改用官方仓库；具体情况见资料表。

<a id="section-2"></a>

## 2. 优先补课：新协议与新的组合方式

| 专题 | 为什么现在值得理解 | 常见检索词 |
| --- | --- | --- |
| [x402 与智能体支付](x402与AI智能体支付.md) | API 请求与付款开始形成统一交互方式 | x402、HTTP 402、agent payments |
| [ERC-8004 与 KYA](ERC-8004与智能体身份.md) | Agent 经济需要身份发现、声誉与验证 | ERC-8004、Trustless Agents、KYA |
| [账户抽象与 EIP-7702](账户抽象与EIP-7702.md) | EOA 委托、智能账户与费用支持组合 | account abstraction、7702、Paymaster |
| [意图交易与链抽象](意图交易与链抽象.md) | 用户表达目标，Solver 负责路径与履约 | intents、solver、chain abstraction |

推荐顺序：先理解账户权限，再学习智能体身份和支付；学习意图交易前，先复习 [跨链桥](跨链桥.md)。这四个方向可以组合成产品，但并不意味着必须同时采用。

<a id="section-3"></a>

## 3. 持续受到关注的应用方向

| 专题 | 需要回答的业务问题 | 常见检索词 |
| --- | --- | --- |
| [稳定币支付与 PayFi](稳定币支付与PayFi.md) | 付款何时到账，融资收益由谁支付？ | stablecoin payments、PayFi、CCTP |
| [预测市场与 Polymarket](预测市场与Polymarket.md) | 结果份额怎样定价、裁定和兑付？ | prediction markets、Polymarket、Kalshi |
| [Perp DEX 与 Hyperliquid](PerpDEX与Hyperliquid.md) | 链上订单簿、保证金与清算怎样协作？ | Perp DEX、Hyperliquid、HyperEVM |
| [DePIN](DePIN去中心化物理基础设施.md) | 设备贡献是否产生真实付费需求？ | DePIN、Helium、decentralized GPU |
| [隐私计算与 FHE](隐私计算与FHE.md) | 不公开数据时，怎样计算与控制解密？ | FHE、Zama、confidential contracts |

这些方向的新关注点，不等于它们从未存在过。例如永续合约、稳定币和隐私密码学都有较长历史；变化更多发生在采用方式、基础设施与产品组合上。

<a id="section-4"></a>

## 4. 理解热点所需的延伸基础

| 专题 | 为什么补充 | 常见检索词 |
| --- | --- | --- |
| [再质押与 LRT](再质押Restaking与LRT.md) | 理解共享安全、额外收益与惩罚风险 | restaking、EigenLayer、LRT、slashing |
| [模块化区块链与 DA](模块化区块链与数据可用性DA.md) | 理解数据可用性和 Rollup 的不同信任假设 | modular blockchain、DA、DAS、Celestia |
| [BTCFi 与比特币质押](BTCFi与比特币质押.md) | 区分 BTC 原资产、凭证、金融应用与外部安全服务 | BTCFi、Bitcoin staking、Babylon |

本组按知识关联补充，没有取得证明其“近期搜索前列”的直接数据，因此不使用“年度最热”或“本月暴涨”等标签。

<a id="section-5"></a>

## 5. 常见搜索问题应该读哪篇

| 你想问的问题 | 对应教程 |
| --- | --- |
| AI Agent 怎么自动付费，会不会无限扣款？ | [x402](x402与AI智能体支付.md) + [账户抽象](账户抽象与EIP-7702.md) |
| ERC-8004 是币吗，注册后是否可信？ | [ERC-8004 与智能体身份](ERC-8004与智能体身份.md) |
| 7702 签名会不会一直有效？ | [账户抽象与 EIP-7702](账户抽象与EIP-7702.md) |
| Polymarket 的价格是不是准确概率？ | [预测市场](预测市场与Polymarket.md) |
| HyperCore 和 HyperEVM 有什么区别？ | [Perp DEX](PerpDEX与Hyperliquid.md) |
| FHE、ZK、MPC、TEE 到底怎么选？ | [隐私计算与 FHE](隐私计算与FHE.md) |

进一步的问题可沿各篇“官方资料与继续搜索”阅读。表中的问题是教学组织方式，不声称来自某搜索平台的真实搜索次数统计。

<a id="section-6"></a>

## 6. 本次资料核验记录

| 来源 | 发布或版本信息 | 核验到的内容与用途 |
| --- | --- | --- |
| [State of Crypto 2025](https://a16zfrontier.com/posts/article/state-of-crypto-report-2025/) | 2025-10-22 | 已读取；采用与行业讨论背景，隐私段落提到 2025 年相关 Google 搜索关注上升 |
| [17 things for crypto in 2026](https://a16zfrontier.com/posts/article/big-ideas-things-excited-about-crypto-2026/) | 2025-12-11 | 已读取；KYA、支付、隐私和预测市场等趋势观点 |
| [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) | 创建于 2025-08-13；查询时 Draft | 已读取；身份、声誉和验证注册机制，及 Sybil 风险 |
| [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) / [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) | 查询时均为 Final | 已读取；UserOperation、费用支持与 EOA 代码委托 |
| [ERC-7683](https://eips.ethereum.org/EIPS/eip-7683) | 查询时 Draft | 已读取；当前 Resolver / Solver 接口，避免照搬旧草案 |
| [x402 Foundation](https://github.com/x402-foundation/x402) | 当前 README；查询日期 2026-11-09 | 已读取；协议定位、SDK 入口；旧 Coinbase 仓库提示迁移 |

| 项目资料 | 核验方式 | 在教程中的使用范围 |
| --- | --- | --- |
| [Circle CCTP](https://developers.circle.com/cctp) | 官方文档正文 | 资产跨链机制；不承诺任何特定链当前费用 |
| [Hyperliquid](https://hyperliquid.gitbook.io/hyperliquid-docs) | 官方架构说明 | HyperCore、HyperEVM 与 L1 架构 |
| [Polymarket V2](https://github.com/Polymarket/ctf-exchange-v2) | 旧仓库迁移提示与 V2 README | 交易系统存在版本变更；不照搬旧地址 |
| [EigenLayer](https://github.com/Layr-Labs/eigenlayer-contracts) | 官方 master 分支 README | 再质押、运营者、服务和惩罚承诺 |
| [Celestia Node](https://github.com/celestiaorg/celestia-node) | 官方 main 分支 README | DA 网络与抽样节点职责 |
| [Babylon](https://github.com/babylonlabs-io/babylon) | 官方 main 分支 README | 时间戳与 BTC 质押的区别 |
| [Zama](https://docs.zama.org/protocol) | 官方文档入口正文 | FHE、保密应用与访问控制能力范围 |

Helium 的文档站本次超时，但其 [官方文档仓库](https://github.com/helium/docs) 可读取；DePIN 教程的关注依据采用已读行业报告，没有据此编写当前设备收益参数。Polymarket、Celestia 等站点访问失败的部分也未被冒充为已验证内容。

上表记录的是本次读取到的页面状态，不代表未来仍相同。动态规范接入时应再固定实际版本、部署地址与实现配置。

<a id="section-7"></a>

## 7. 如果想继续追踪真正的搜索热度

1. 固定地区与时间窗，例如同一地区的过去 90 天，避免拿不同窗口直接比较。
2. 区分搜索“主题”和具体关键词；`AI agent` 的大量搜索不一定与 Web3 有关。
3. 记录搜索平台与统计口径。Google Trends 的 0–100 通常是所选条件下的相对指数，不是绝对搜索次数。
4. 同时观察持续时间、实际产品采用和官方更新，避免把单日新闻峰值当成长期需求。
5. 把观察时间和来源写进新文档；没有数据就保留“未量化”，不要自行填热度等级。

[Google Trends](https://trends.google.com/trends/) 可作为后续核验入口；本文没有伪造或代填其查询结果。

<a id="section-8"></a>

## 8. 自测与参考答案

**问题**：某主题被写进 2026 展望，是否足以称为“2026 年 11 月搜索量最高”？

**答案**：不足。展望是作者关注方向，搜索排名需要对应日期、地区、平台和指标的直接证据。

**练习**：从本页选三个主题，分别记录“技术定义、最新可核验版本、关注依据、仍未知的指标”，再决定自己的学习优先级。

<a id="section-9"></a>

## 9. 第二批：智能体商务、可信数据与新应用

这批避开上一批的重复主题，重点补“如何授权 Agent 花钱”“如何验证链下信息”“人和 Agent 的身份边界”，以及已有 RWA、AI、SocialFi 主题的细分应用。

**智能体与可信信息**

| 专题 | 与已有教程的区别 | 推荐检索词 |
| --- | --- | --- |
| [Agentic Commerce 与 AP2](AgenticCommerce与AP2.md) | 从 x402 的付款交互，进一步解释购物与支付授权证据 | AP2、Checkout Mandate、agentic commerce |
| [zkTLS](zkTLS与可验证链下数据.md) | 从 ZK 原理，进一步解释 TLS 响应来源与选择性披露 | zkTLS、TLSNotary、MPC-TLS |
| [真人证明与数字身份](数字身份与真人证明PoP.md) | 与 Agent 身份区别，解释人类资格、唯一性与匿名性 | proof of personhood、World ID、nullifier |
| [zkVM](zkVM与可验证计算.md) | 从证明概念，进一步解释通用程序执行证明 | zkVM、SP1、verifiable computation |

**新应用与长期路线**

| 专题 | 与已有教程的区别 | 推荐检索词 |
| --- | --- | --- |
| [InfoFi](InfoFi与注意力市场.md) | 从 SocialFi 延伸到信息市场、注意力评分与奖励 | InfoFi、Kaito、mindshare |
| [DeSci 与 BioAgents](DeSci与BioAgents.md) | 从 AI + Web3 延伸到科研资助、知识产权和证据 | DeSci、BioDAO、BioAgents、IP-Token |
| [代币化股票](代币化股票与链上证券.md) | 从 RWA 总论，具体分析证券权利与交易机制 | tokenized stocks、xStocks、shareholder rights |
| [后量子密码](后量子密码与区块链.md) | 从钱包签名，延伸到密码算法与协议迁移 | post-quantum blockchain、ML-DSA、FIPS 204 |

这些词适合作为进一步检索的入口，但本次没有它们的实时绝对搜索量。AP2、zkVM、数字身份、代币化和后量子方向有规范、标准或公开报告依据；InfoFi、DeSci、zkTLS 则主要结合官方产品资料与现有知识缺口选入。它们不因此被认定为当前搜索榜前列。

建议先读 AP2、真人证明和代币化股票，理解实际业务边界；技术读者再进入 zkTLS、zkVM 与后量子专题。关注内容、社区或科研组织的读者可优先读 InfoFi 与 DeSci。

<a id="section-10"></a>

## 10. 第二批资料核验与版本边界

核验日期：**2026-11-09**。下列来源为实际读取的官方页面或仓库；项目自述用于解释机制，不作为独立的市场规模或安全审计证据。

| 来源 | 本次读到的内容 | 写入文档的边界 |
| --- | --- | --- |
| [AP2 首页](https://ap2-protocol.org/)与[规范](https://ap2-protocol.org/ap2/specification/) | Checkout / Payment Mandate、Open / Closed、验证与争议证据 | 不把旧版术语当成当前接口，不把签名证据等同完整纠纷解决 |
| [TLSNotary](https://github.com/tlsnotary/tlsn) | MPC 数据来源与隐私机制，README 标明开发状态 | 不宣称可直接用于生产资金场景 |
| [World ID](https://github.com/worldcoin/world-id-protocol)与[Semaphore](https://github.com/semaphore-protocol/semaphore) | World ID 4.0 入口、匿名群组成员证明 | 区分真人、唯一性、实名与群组资格 |
| [SP1](https://github.com/succinctlabs/sp1) | 可证明程序执行与开发入口 | 不复述“最快”等宣传为独立性能结论 |

| 来源 | 本次读到的内容 | 写入文档的边界 |
| --- | --- | --- |
| [Kaito Why InfoFi](https://docs.kaito.ai/overview/why-infofi) | 信息金融、注意力市场与 AI 评分的项目叙述 | 不把 Mindshare 当作搜索量，不照搬旧活动奖励规则 |
| [BIO Concepts](https://docs.bio.xyz/bio/introduction/concepts)与[BioAgents](https://docs.bio.xyz/bio/introduction/bioagents) | BioDAO、IP-Tokens 与科研 Agent 的定义 | 不把融资或代币热度当成实验与临床证据 |
| [xStocks 文档](https://docs.xstocks.fi/docs)与[Kraken FAQ](https://support.kraken.com/articles/xstocks-faq) | 底层资产支持、股东权利、公司行动；FAQ 更新于 2026-10-30 | 产品条款不能推广为所有代币化股票的统一权利 |
| [NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/final) | 2024-08-13 发布的 ML-DSA 标准，及 2026-07-31 勘误计划说明 | 正式算法标准不等于链已升级，不预测量子破解时间 |

本批复用首批已读取的 2025 行业报告和面向 2026 的趋势展望作为背景。尝试的 2026 年度报告路径未获得正文，因此没有将“2026 年度报告”作为新增证据。Ondo 资料直连失败后，代币化股票改用可读取的 xStocks 与 Kraken 官方资料，不推断未读产品的当前条款。

**阅读时保留的两个问题**：这个页面讲的是通用机制还是某个产品？它证明的是技术能力、采用情况，还是搜索关注？回答清楚后，再决定是否把它用作设计或研究依据。

<a id="section-11"></a>

## 11. 第三批：支付链、开放市场与可编程收益

本批继续补充常见检索问题的解释：稳定币为什么需要专用链、谁能创建永续市场、PT/YT 怎样计算收益、金库资金由谁管理，以及 Passkey 是否真的等于钱包自托管。

**选题口径**：支付链与 HIP 扩展代表产品机制发展；Hooks、收益代币化、金库和合成美元属于持续关注的应用机制；Passkey 涉及认证标准与钱包体验；Based Rollup 是已有研究方向补课。本批没有新增可核验的实时搜索量数据，因此不声称这八项构成 2026 年 11 月热搜排名。

**支付与市场机制**

| 专题 | 本篇解决的问题 | 推荐检索词 |
| --- | --- | --- |
| [稳定币专用链：Tempo 与 Arc](稳定币专用链Tempo与Arc.md) | 支付链的资产、Gas、对账与出金边界 | Tempo TIP-20、Arc USDC gas |
| [HIP-3 与 HIP-4](HIP-3与HIP-4开放衍生品市场.md) | 自建永续市场与有界结果合约的区别 | HIP-3、HIP-4、outcome markets |
| [Uniswap v4 与 Hooks](UniswapV4与Hooks.md) | 回调扩展、PoolManager 与闪电记账 | Uniswap v4 hooks、flash accounting |
| [收益代币化与 Pendle](收益代币化与Pendle.md) | SY、PT、YT、到期计价和隐含收益计算 | Pendle PT YT、implied APY |

**资产管理与基础设施**

| 专题 | 本篇解决的问题 | 推荐检索词 |
| --- | --- | --- |
| [ERC-4626 与策展型金库](ERC-4626与策展型金库.md) | 份额净值、管理权限、分配与退出 | ERC-4626、Morpho Vault V2 |
| [合成美元与收益型稳定币](合成美元与收益型稳定币.md) | USDe / sUSDe、对冲与收益来源 | USDe sUSDe、synthetic dollar |
| [Passkey 与嵌入式钱包](Passkey与嵌入式钱包.md) | 登录认证、交易签名、恢复与会话权限 | Passkey wallet、WebAuthn、embedded wallet |
| [Based Rollup 与预确认](BasedRollup与预确认.md) | L1 排序、可验证承诺与最终结算 | Based Rollup、preconfirmations |

**推荐顺序**：关注支付先读稳定币专用链；关注交易先读 HIP-3/HIP-4 与 Hooks；关注收益按“金库份额 → 合成美元 → PT/YT”阅读；开发者再进入 Passkey 与 Based Rollup。每篇都有流程图、案例、自测答案和原始资料入口。

<a id="section-12"></a>

## 12. 第三批资料核验与版本边界

核验日期：**2026-11-09**。以下资料实际读取成功；项目自述用于核对机制，不被当作独立安全审计或搜索热度数据。

| 来源 | 本次核验内容 | 教程采用的边界 |
| --- | --- | --- |
| [Tempo 开发者文档](https://tempo.xyz/developers)与[稳定币指南](https://tempo.xyz/developers/get-started/stablecoins.md) | 文档入口迁移、TIP-20、网络与资产地址标识 | 快速入门中的测试网不代表全部产品部署状态 |
| [Arc 文档](https://docs.arc.io/)与[原生模型](https://docs.arc.io/arc/concepts/stablecoin-native-model.md) | 首页主网声明、USDC Gas、原生单位与 EVM 差异 | 稳定币计费不等于免 Gas；不套用其他链的资产精度 |
| [HIP-3](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals)与[HIP-4](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-4-outcome-markets) | 部署者职责、充分抵押结果合约与阶段推出 | 不固定动态质押门槛，不把多结果设计写成全面开放 |
| [Uniswap v4 核心仓库](https://github.com/Uniswap/v4-core) | PoolManager、unlock、回调与净额结算 | 官方概览超时后改读仓库；不从 README 早期措辞推断当前部署状态 |

| 来源 | 本次核验内容 | 教程采用的边界 |
| --- | --- | --- |
| [Pendle 官方介绍](https://docs.pendle.finance/pendle-v2/Introduction) | SY、PT、YT 与收益拆分 | 兑付单位由市场定义，不将全部 PT 当作美元债权 |
| [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626)与[Morpho Vault V2](https://github.com/morpho-org/vault-v2) | 正式标准、角色、适配器、退出与 max 接口差异 | 接口标准不是收益保证；角色与退出条件按 V2 文档说明 |
| [Ethena](https://docs.ethena.fi/) | USDe 合成美元定义、sUSDe 与风险分类 | 对冲案例仅作简化，不代表当前全部支持资产 |
| [WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/)与[Privy](https://docs.privy.io/) | W3C 2026-08-25 Recommendation 与嵌入式钱包产品入口 | Privy 深层 Passkey 路径 404，未据此编造 SDK 接口 |
| [Based Rollup 原始研究](https://ethresear.ch/t/based-rollups-superpowers-from-l1-sequencing/15016)与[预确认研究](https://ethresear.ch/t/based-preconfirmations/17353) | 2023 年的定义、承诺与惩罚设计 | 研究方案不代表任何指定网络已经全部上线；低延迟承诺不等于最终性 |

**本批保留的不确定项**：没有实时搜索量、没有具体产品的实时 APY 或交易费率，也未核查所有部署地址。教程中的金额为显式教学假设；原始研究、当前文档和产品配置应分别使用。

---

[← 学习总目录](README.md) · [近期热点导航](近期Web3热点导航.md) · [回到顶部](#top)
