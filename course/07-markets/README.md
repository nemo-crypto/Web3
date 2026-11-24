# 交易市场、风控与量化

[课程首页](../../README.md) · [所有阶段](../README.md)

从订单簿和仓位开始，理解执行差异、研究方法和系统风控。

**适合** 交易系统开发者

**阶段验收** 能写出含手续费、成交状态、拒单和对账的离线交易方案。

## 第一次读这个阶段

1. [CEX 现货与订单簿](01-cex-spot.md)
2. [CEX 合约业务全流程](02-cex-derivatives.md)
3. [交易系统风控与监控](06-risk-controls.md)

## 课程目录

| 课程 | 学习成果 |
| --- | --- |
| [CEX 现货与订单簿](01-cex-spot.md) | 读懂交易对、订单类型和成交状态，区分平台账本成交与链上转账 |
| [CEX 合约业务全流程](02-cex-derivatives.md) | 通过 140 个场景掌握全仓、逐仓、最大可开量、强平价和组合保证金，核对订单、清算及账务 |
| [Perp DEX 与 Hyperliquid](03-perp-dex.md) | 区分交易架构、保证金、清算与代币叙事，理解链上撮合为什么不等于没有运营风险 |
| [HIP-3、HIP-4 与开放市场](04-open-derivatives.md) | 区分开放建市、永续合约和结果合约，理解市场部署者承担的职责，并计算两类产品的损益 |
| [期权、到期与产品损益](05-options-and-market-design.md) | 对比现货、永续与期权在到期和价格波动下的现金流 |
| [交易系统风控与监控](06-risk-controls.md) | 建立交易前、交易中、交易后的控制机制，正确计算权益、回撤和敞口 |
| [跟单交易与执行偏差](07-copy-trading.md) | 理解跟单比例、成交偏差、系统同步和业绩评估 |
| [TradingView、回测与告警](08-tradingview.md) | 区分指标、策略回测和实盘执行，理解 Pine Script 与 Webhook 的边界 |
| [网格交易与库存风险](09-grid-trading.md) | 计算网格价位与单格净收益，理解已实现收益和库存浮亏的差别 |
| [跨交易所价差与再平衡](10-cross-exchange-arbitrage.md) | 使用买卖盘口与库存计算净收益，理解双腿失败和资金再平衡 |
| [三角套利与交易方向](11-triangular-arbitrage.md) | 用量纲检查乘除方向，计入三次手续费，并理解连续成交风险 |
| [基差、资金费率与对冲](12-basis-and-funding.md) | 区分交割基差交易与永续资金费策略，计算对冲后的收益与保证金风险 |
| [统计套利与样本外验证](13-statistical-arbitrage.md) | 区分相关性、协整和价差回归，理解样本外验证与前视偏差 |
| [交易脚本与订单工程](14-trading-engineering.md) | 建立数据、信号、风控、订单和对账的完整链路，避免循环重复下单 |
| [数据质量、回测与模拟成交](15-research-and-backtesting.md) | 识别回测偏差并设计可复现实验 |
| [做市与库存 · 从报价表到压力复盘](16-market-making-inventory.md) | 在模拟订单簿中追踪成交价差、库存和未实现损益 |
| [订单簿同步 · 快照、增量与序号缺口](17-order-book-sequence-recovery.md) | 从撮合快照和连续增量重建可用市场视图 |
| [合约指标价格 · 成交价、标记价与结算价](18-derivative-settlement-prices.md) | 区分保证金系统、资金费和持仓到期所用的不同价格 |
| [Paper Trading 模拟交易与成交账本](19-paper-trading.md) | 设计现货与永续的模拟成交、冻结余额、资金费和对账 |
| [预测市场 · 开盘、争议和兑付](20-prediction-market-operations.md) | 冻结事件规则，记录份额交易、裁定证据和兑付状态 |
| [Papertrade · 从交易亏损到 PAPER 质押与 USDC 分润](21-papertrade-protocol.md) | 核算 HyperEVM 合成永续的已实现亏损、PAPER 发行、USDC 分润与利润兑付队列 |
