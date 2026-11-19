# Web3 实战课程

**[在线体验 · 打开 Web3 实战课程](https://nemo-crypto.github.io/Web3/)**

从一笔交易开始，学会解释钱包、合约和链上业务。11 个阶段，共 139 课，覆盖区块链原理、资产与支付、DApp 开发、DeFi、交易系统、治理和前沿协议。

第一次接触 Web3，可以先读[一张票的购票、转让和验票流程](course/00-start/01-web3-in-practice.md)，再按[零基础六站路线](course/00-start/02-reading-path.md#第一次阅读按这六站走)练习看到账、钱包弹窗和支付记录。全程使用模拟数据。已有经验也可以沿业务路线直接跳读。

读完基础后可以做[新手跟做练习](reference/beginner-workbook.md)。六道题分别练习分笔付款、跨链提现、重复验票、剩余授权、商户净收与盘口恢复，每题都带逐步答案。进入钱包、合约、扩容、支付、DeFi 或市场阶段时，先读该阶段标出的三讲即可开始。

## 按目标选路线

| 目标 | 学习顺序 | 练习交付 |
| --- | --- | --- |
| 第一次了解 Web3 | [起步](course/00-start/README.md) → [交易](course/01-blockchain/README.md) → [钱包](course/02-wallets/README.md) | 一张从签名到确认的状态图 |
| 开发 DApp | [钱包](course/02-wallets/README.md) → [合约与数据](course/03-development/README.md) → [扩容与跨链](course/04-scaling/README.md) | [只读钱包页方案](course/10-projects/01-project-wallet-reader.md) |
| 做支付或资产业务 | [交易](course/01-blockchain/README.md) → [代币与支付](course/05-payments/README.md) | [稳定币对账验收](course/10-projects/03-project-payments.md) |
| 学 DeFi 与交易系统 | [DeFi](course/06-defi/README.md) → [市场与风控](course/07-markets/README.md) | [离线兑换计算及状态机](course/10-projects/02-project-swap.md) |
| 评估应用与新协议 | [应用与治理](course/08-applications/README.md) → [智能体与隐私](course/09-frontier/README.md) | [协议架构与风险评审](course/10-projects/04-project-protocol-review.md) |

## 课程目录

| 阶段 | 模块 | 课数 | 阶段验收 |
| --- | --- | ---: | --- |
| 00 | [起步与学习方法](course/00-start/README.md) | 3 | 交付一张 Web3 产品分析卡，标出状态、权限、确认、成本和失败处理。 |
| 01 | [区块链与交易基础](course/01-blockchain/README.md) | 11 | 能追踪一笔示例转账，解释地址、Gas、回执和最终性。 |
| 02 | [钱包、身份与签名](course/02-wallets/README.md) | 13 | 能画出钱包登录和代币授权的两条独立流程。 |
| 03 | [智能合约、DApp 与数据](course/03-development/README.md) | 14 | 能说明一笔合约写入的状态机，并设计重试和对账测试。 |
| 04 | [扩容、跨链与可验证计算](course/04-scaling/README.md) | 13 | 能为跨链转账画出源链、消息、目标链与故障处理流程。 |
| 05 | [代币、稳定币与资产上链](course/05-payments/README.md) | 15 | 能设计一张稳定币支付账单和完整的退款、对账流程。 |
| 06 | [DeFi、流动性与收益](course/06-defi/README.md) | 18 | 能离线算出兑换、健康因子和收益，并标明假设。 |
| 07 | [交易市场、风控与量化](course/07-markets/README.md) | 18 | 能写出含手续费、成交状态、拒单和对账的离线交易方案。 |
| 08 | [应用、治理与商业模式](course/08-applications/README.md) | 15 | 能画出应用的用户、收入、治理和退出关系。 |
| 09 | [智能体、隐私与前沿专题](course/09-frontier/README.md) | 12 | 能写出一个智能体付款或隐私证明案例的接口与信任边界。 |
| 10 | [练习、验收与术语](course/10-projects/README.md) | 7 | 独立完成一项课程项目，提交状态图、测试用例和验收记录。 |

[逐课目录](course/README.md) · [业务案例库](reference/business-cases.md) · [交互实验室](reference/practice-lab.md) · [中文术语速查](course/10-projects/05-glossary.md) · [前沿资料核验记录](reference/frontier-reading-notes.md) · [旧文件名对照](reference/file-map.md)

## 按业务场景查阅

| 你在做什么 | 从这里开始 |
| --- | --- |
| 做钱包登录和移动端连接 | [桌面扫码与手机唤起](course/02-wallets/10-qr-wallet-connect.md) · [钱包权限检查](course/02-wallets/11-approval-review.md) |
| 做交易页面和合约发布 | [交易前端状态机](course/03-development/09-transaction-ui-state-machine.md) · [合约发版验收](course/03-development/10-release-deployment-review.md) |
| 处理跨链提现或客服异常 | [Rollup 提现](course/04-scaling/10-rollup-withdrawal-operation.md) · [跨链支持工单](course/04-scaling/11-cross-chain-support.md) |
| 搭建收银台、定期账单和批量退款 | [商户支付与发货](course/05-payments/12-checkout-and-fulfillment.md) · [支付账本](course/05-payments/13-double-entry-ledger.md) · [订阅与发票](course/05-payments/11-subscriptions-and-invoices.md) · [批量付款](course/05-payments/10-batch-payouts.md) |
| 设计会员、积分或票券 | [会员与积分](course/08-applications/12-membership-loyalty.md) · [票务转让与核销](course/08-applications/13-ticketing-and-redemption.md) |

## 用同一套方法读项目

1. **状态**存在哪里，怎样拿到可复核的证据？
2. **权限**由谁持有，谁可以签名、升级、暂停或恢复？
3. **确认**有哪些层级，产品在哪一步正式交付？
4. **成本与收益**由谁支付，金额和时间使用什么口径？
5. **失败**时有哪些状态，怎样重试、回退或对账？

课程金额与价格用于教学。练习优先使用模拟数据或测试环境。各课引用的标准、项目资料与实现版本可以沿延伸阅读核对。

## 本地课程站

课程站支持全文搜索、逐课筛选、阶段进度和移动端阅读。可以在业务案例库查看证据、选择处理动作，也可以在交互实验室练习兑换报价、借贷压力测试与稳定币对账。Markdown 是课程内容源。使用 Node.js 22.12 或更新版本。

~~~bash
npm ci
npm start
~~~

打开 [本地课程站](http://localhost:4173)。运行 `npm run build` 生成可部署到静态服务器的 `dist/`，运行 `npm run check` 验证课程结构、链接与页面构建。

### 发布公开课程站

在仓库 [Settings → Pages](https://github.com/nemo-crypto/Web3/settings/pages) 把发布源设为 **GitHub Actions**。`.github/workflows/pages.yml` 会在推送到 `main` 时检查并发布 `dist/`，也可从 Actions 手动运行。首次发布成功后，访客可通过 [Web3 课程站](https://nemo-crypto.github.io/Web3/) 打开课程，电脑和手机都无需启动本地服务。

### 访客与浏览统计

用 `npm start` 运行时，桌面顶栏及手机页脚有累计访客与页面浏览量。访客按当前安装的站点写入的随机浏览器标识累计去重，首次打开一个页面和刷新会计入页面浏览。同一浏览器再次访问时继续使用同一标识。换设备、用无痕窗口或清除 Cookie 会被视为新访客。

计数存到本机 `.site-data/visits.sqlite`。正式运行可用 `WEB3_STATS_DB` 指向持久化磁盘，HTTPS 环境可设置 `WEB3_SECURE_COOKIE=1`。计数器只保存随机访客标识和计数。纯静态的 `npm run build` 版本可照常阅读课程，访客统计需要可写的服务端。

更新课程时编辑 `course/` 下的 Markdown。增删或重命名课程后，同步更新阶段目录、[逐课目录](course/README.md)和 `course/catalog.json`，再运行构建检查。
