# Layer 3

## 概述

Layer 3 是一个基于区块链技术的预测市场平台，它构建在现有的区块链基础设施之上，为用户提供了一个去中心化的预测市场环境。该平台支持多种区块链网络，包括 EVM 兼容链和 Solana。

## 核心特性

### 1. 多链支持
- 支持 EVM 兼容链
- 支持 Solana 网络
- 可扩展的架构设计，便于添加新的区块链支持

### 2. 智能合约集成
- 条件代币合约 (Conditional Tokens)
- 代币交换合约 (Token Exchange)
- UMA CTF 适配器合约
- ERC20 代币支持

### 3. 预测市场功能
- 支持创建预测问题
- 支持多种预测结果选项
- 代币化的预测结果
- 自动化的市场结算机制

### 4. 钱包集成
- 支持多种钱包连接方式
- 代理交易功能
- 交易历史记录查询
- 代币转账和提现功能

## 技术架构

### 1. 合约层
```typescript
interface ContractSDKInterface {
    // 合约交互接口
    checkCTAllowance(spender: string, address?: string): Promise<void>;
    myTokens(address?: string): Promise<string[]>;
    getConditionId(questionId: string): string;
    // ... 其他合约方法
}
```

### 2. 服务层
- 认证服务 (Auth)
- 订单服务 (Order)
- 预测服务 (Prediction)
- 个人服务 (Personal)
- 文件服务 (File)
- 聊天服务 (Chat)
- 钱包服务 (Wallet)
- 预言机服务 (Oracle)

### 3. 客户端层
- 用户界面组件
- API 客户端
- WebSocket 实时通信
- 通知系统
 
## 主要功能模块

### 1. 预测市场创建
- 支持创建自定义预测问题
- 设置预测选项
- 配置奖励代币和金额
- 设置提案保证金
- 设置市场活跃期

### 2. 交易系统
- 支持代币交换
- 条件代币交易
- 价格预言机集成
- 自动做市商功能

### 3. 用户系统
- 用户认证
- 个人信息管理
- 钱包管理
- 交易历史记录

### 4. 通知系统
- WebSocket 实时通知
- 交易状态更新
- 市场状态变更通知
- 系统消息推送

## 安全特性

1. 智能合约安全
   - 可升级合约设计
   - 权限控制系统
   - 交易验证机制

2. 用户安全
   - 钱包连接安全
   - 交易签名验证
   - 代理交易保护

3. 系统安全
   - 预言机验证
   - 市场状态检查
   - 异常交易检测

## 开发指南

### 环境配置

```typescript
// 必要的环境变量
NEXT_PUBLIC_BITX_API_URL
NEXT_PUBLIC_CHAT_BASE_URL
NEXT_PUBLIC_BITX_WS_URL
NEXT_PUBLIC_MAGIC_API_KEY
NEXT_PUBLIC_CHAIN_RPC_URL
NEXT_PUBLIC_CHAIN_TYPE
```

### 初始化 API 客户端
```typescript
const api = new BitXAPI();
```

### 创建预测市场
```typescript
// 示例代码
const prediction = await api.prediction.createMarket({
    title: "预测问题",
    options: ["选项1", "选项2"],
    rewardToken: tokenAddress,
    reward: rewardAmount,
    proposalBond: bondAmount,
    liveness: livenessPeriod
});
```

## 最佳实践

1. 合约交互
   - 始终检查代币授权
   - 验证交易状态
   - 处理异常情况

2. 用户界面
   - 提供清晰的交易反馈
   - 显示实时市场数据
   - 优化移动端体验

3. 性能优化
   - 使用 WebSocket 进行实时更新
   - 实现数据缓存
   - 优化合约调用

## 注意事项

1. 确保正确配置环境变量
2. 注意合约升级兼容性
3. 处理网络切换情况
4. 实现适当的错误处理
5. 考虑 gas 费用优化

## 常见问题

1. 如何切换网络？
2. 如何处理交易失败？
3. 如何优化 gas 费用？
4. 如何确保预言机数据准确性？

## 更新日志

- 支持多链部署
- 优化合约交互
- 改进用户界面
- 增强安全特性

