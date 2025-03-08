# ConnectWallet 详细指南

## 简介

ConnectWallet 是一个用于连接区块链钱包的 React 组件，它提供了一个简单且用户友好的界面，使用户能够轻松地将他们的加密钱包（如 MetaMask、WalletConnect 等）连接到 DApp（去中心化应用）。

## 功能特点

- 支持多种主流钱包
  - MetaMask
  - WalletConnect
  - Coinbase Wallet
  - Trust Wallet
  - 等其他兼容的钱包
- 自动检测钱包状态
- 响应式设计
- 可自定义样式
- 多链支持
- 错误处理机制
## 安装使用
### 安装依赖

```bash
# 使用 npm
npm install @web3-react/core @web3-react/injected-connector

# 使用 yarn
yarn add @web3-react/core @web3-react/injected-connector
```
### 基本配置

```typescript:src/config/wallet.ts
import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42] // 支持的链 ID
})
```
## 基本用法
### 简单示例

```typescript:src/components/ConnectWallet.tsx
import { useWeb3React } from '@web3-react/core'
import { injected } from '../config/wallet'

export const ConnectWallet = () => {
  const { active, account, activate, deactivate } = useWeb3React()

  const connect = async () => {
    try {
      await activate(injected)
    } catch (error) {
      console.log('连接错误:', error)
    }
  }

  const disconnect = () => {
    try {
      deactivate()
    } catch (error) {
      console.log('断开连接错误:', error)
    }
  }

  return (
    <div>
      {active ? (
        <div>
          <p>已连接账户: {account}</p>
          <button onClick={disconnect}>断开连接</button>
        </div>
      ) : (
        <button onClick={connect}>连接钱包</button>
      )}
    </div>
  )
}
```

## 高级配置
### 自定义钱包选择器

```typescript:src/components/WalletSelector.tsx
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

const walletOptions = [
  {
    name: 'MetaMask',
    icon: '/metamask.png',
    connector: injected
  },
  // 添加其他钱包选项
]

export const WalletSelector = () => {
  const { activate } = useWeb3React()
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async (connector: any) => {
    try {
      await activate(connector)
      setError(null)
    } catch (err) {
      setError('连接失败，请重试')
    }
  }

  return (
    <div className="wallet-selector">
      {walletOptions.map((wallet) => (
        <button
          key={wallet.name}
          onClick={() => connectWallet(wallet.connector)}
        >
          <img src={wallet.icon} alt={wallet.name} />
          <span>{wallet.name}</span>
        </button>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
```

### 网络切换功能

```typescript:src/hooks/useNetwork.ts
import { useWeb3React } from '@web3-react/core'

export const useNetwork = () => {
  const { library } = useWeb3React()

  const switchNetwork = async (chainId: number) => {
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      })
    } catch (error) {
      console.error('切换网络失败:', error)
    }
  }

  return { switchNetwork }
}
```

## 常见问题
### 1. 连接失败怎么办？
- 检查钱包是否已安装
- 确认浏览器是否支持
- 检查网络连接是否正常
- 确认是否在支持的网络上
### 2. 如何处理网络切换？
```
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

export const useNetworkDetector = (targetChainId: number) => {
  const { chainId, library } = useWeb3React()

  useEffect(() => {
    if (chainId && chainId !== targetChainId) {
      // 提示用户切换网络
      switchNetwork(targetChainId)
    }
  }, [chainId])
}
```
### 3. 安全注意事项
- 始终验证交易信息
- 使用安全的 RPC 节点
- 实现适当的错误处理
- 保护用户私钥和敏感信息
## 最佳实践
1. 错误处理
```typescript
const handleError = (error: any) => {
  if (error.code === 4001) {
    return '用户拒绝连接'
  }
  if (error.code === -32002) {
    return '请检查钱包是否已打开'
  }
  return '连接出错，请重试'
}
```

2. 持久化连接
```typescript
useEffect(() => {
  const connectWalletOnPageLoad = async () => {
    if (localStorage?.getItem('previouslyConnected') === 'true') {
      try {
        await activate(injected)
      } catch (error) {
        console.error('自动连接失败:', error)
      }
    }
  }
  connectWalletOnPageLoad()
}, [])
```

3. 状态管理
```typescript
const [connecting, setConnecting] = useState(false)

const connect = async () => {
  setConnecting(true)
  try {
    await activate(injected)
    localStorage.setItem('previouslyConnected', 'true')
  } catch (error) {
    console.error(error)
  } finally {
    setConnecting(false)
  }
}
```
