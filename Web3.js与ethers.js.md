<a id="top"></a>

# Web3.js 与 ethers.js：从 SDK 到正确的链上交互

[← 返回学习导航](README.md)

> **学习目标**：理解 Provider、Signer、Contract 与单位转换，读懂旧版示例并避免混用 API。
>
> **来源说明**：本篇承接原 README 的 SDK 对比主题。代码明确使用 ethers **v6** API，不将 v5 示例混入。

<details>
<summary>展开本篇目录</summary>

- [1. SDK 帮你做什么](#section-1)
- [2. 三个关键对象](#section-2)
- [3. ethers v6 的最小只读示例](#section-3)
- [4. 连接钱包与读取代币](#section-4)
- [5. 金额与交易生命周期](#section-5)
- [6. 旧代码迁移时重点查什么](#section-6)
- [7. 自测与参考答案](#section-7)
- [8. 延伸阅读](#section-8)

</details>

---


<a id="section-1"></a>

## 1. SDK 帮你做什么

JavaScript SDK 对 JSON-RPC、ABI 编解码、账户和合约交互进行封装。它降低开发成本，但不会替你核验代币来源，也不能保证某笔交易执行成功。

比较库时应查目标版本、维护状态、类型支持、依赖和项目迁移成本。原稿固定的包大小和性能结论缺少构建条件，不适合作为通用结论；应在实际工程中测量。

<a id="section-2"></a>

## 2. 三个关键对象

| 对象 | 职责 | 常见操作 |
| --- | --- | --- |
| Provider | 读取网络并提交 RPC 请求 | 查区块、余额、回执 |
| Signer | 表示能够授权交易的主体 | 请求签名、发送交易 |
| Contract | 按 ABI 封装指定地址的合约 | 读状态、编码调用、监听事件 |

只读 Provider 不等于有签名权限。钱包 Signer 把签名请求交给钱包处理，应用无需获取用户私钥。

<a id="section-3"></a>

## 3. ethers v6 的最小只读示例

在独立练习项目安装 `ethers@6`，并保存项目锁文件。下面是 ESM 模块函数，调用方传入可访问的 RPC 和地址，不包含默认主网写操作。

```javascript
import { JsonRpcProvider, formatEther, isAddress } from "ethers";

export async function readNativeBalance(rpcUrl, address) {
  if (!isAddress(address)) throw new Error("地址格式不正确");
  const provider = new JsonRpcProvider(rpcUrl);
  try {
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(address);
    return {
      chainId: network.chainId.toString(),
      balance: formatEther(balance),
    };
  } finally {
    provider.destroy();
  }
}
```

地址格式正确只说明编码有效，不说明属于预期收款人。返回链 ID 有助于发现 RPC 网络配置错误；在交易场景中应明确拒绝不匹配网络。

<a id="section-4"></a>

## 4. 连接钱包与读取代币

ethers v6 使用 `BrowserProvider` 包装 EIP-1193 Provider。以下函数在客户端调用；`eip1193` 来自用户选择的钱包，`tokenAddress` 应来自已核验的资产配置。

```javascript
import { BrowserProvider, Contract, formatUnits } from "ethers";

export async function readTokenBalance(eip1193, tokenAddress) {
  await eip1193.request({ method: "eth_requestAccounts" });
  const provider = new BrowserProvider(eip1193);
  const signer = await provider.getSigner();
  const account = await signer.getAddress();
  const abi = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)",
  ];
  const token = new Contract(tokenAddress, abi, provider);
  const [raw, decimals] = await Promise.all([
    token.balanceOf(account),
    token.decimals(),
  ]);
  return formatUnits(raw, decimals);
}
```

这假设合约实现了相应 ABI；部分代币可能缺失可选元数据或行为不标准。应用需要处理调用失败，不能默认所有资产都是 18 位精度。

<a id="section-5"></a>

## 5. 金额与交易生命周期

展示金额用字符串，链上原始金额用整数。`parseUnits("1.25", 6)` 得到 `1250000n`，适用于 6 位精度资产；不能先用浮点乘法再指望恢复精度。

写操作通常经历：连接 signer → 校验账户与链 → 模拟和检查费用 → 请求签名 → 获取交易哈希 → 等待回执 → 检查状态与业务结果。获取哈希后页面刷新，应能继续追踪，不能立即再发一笔。

授权和转账是不同合约调用，代币额度也应与业务需求匹配。事件是重要证据，但业务到账还需结合所用协议的状态与确认规则。

<a id="section-6"></a>

## 6. 旧代码迁移时重点查什么

| ethers v5 常见写法 | ethers v6 常见写法 | 迁移注意 |
| --- | --- | --- |
| `ethers.providers.JsonRpcProvider` | `JsonRpcProvider` | 命名空间发生变化 |
| `ethers.providers.Web3Provider` | `BrowserProvider` | 面向浏览器钱包 Provider |
| `ethers.utils.parseUnits` | `parseUnits` | 工具函数导出位置变化 |
| `BigNumber` 常用对象 | 原生 `bigint` | 不与 `number` 混算，JSON 需转换 |
| 同步使用部分 signer 获取接口 | `await provider.getSigner()` | 检查异步调用链 |

Web3.js 本身也存在大版本变化，不能把旧版 callback 示例与其他版本初始化混在一起。Promise 并发、JSON-RPC 批量请求和 Multicall 合约是三种机制，具有不同一致性、错误和服务端限制。

<a id="section-7"></a>

## 7. 自测与参考答案

**问题**：`Promise.all` 读了两个余额，是否保证来自同一个区块？

**答案**：不保证。若需要一致快照，应显式指定同一块高或使用具备对应语义的批量读取方案。

**练习**：对一个 6 位精度和一个 18 位精度资产分别完成字符串金额转换，并解释为什么不应统一使用 `parseEther`。

<a id="section-8"></a>

## 8. 延伸阅读

- [连接钱包](Connectwallet.md)、[GraphQL](GraphQL.md)。
- [ethers v6 文档](https://docs.ethers.org/v6/)、[ethers v6 迁移说明](https://docs.ethers.org/v6/migrating/)。

---

[← 返回学习导航](README.md) · [回到顶部](#top)
