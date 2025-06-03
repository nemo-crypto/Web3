### 1. 基本初始化对比
```
// Web3.js初始化
const web3Example = {
  // 通过 HTTP Provider
  httpProvider: () => {
    const Web3 = require('web3');
    return new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR-ID'));
  },
  // 通过 MetaMask
  metamask: () => {
    const Web3 = require('web3');
    return new Web3(window.ethereum);
  }
};

// Ethers.js 初始化
const ethersExample = {
  // 通过 HTTP Provider
  httpProvider: () => {
    const { ethers } = require('ethers');
    return new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR-ID');
  },

  // 通过MetaMask(小狐狸)钱包
  metamask: () => {
    const { ethers } = require('ethers');
    return new ethers.providers.Web3Provider(window.ethereum);
  }
};
```

### 2. 合约交互对比
```
// Web3.js 合约交互
const web3ContractExample = {
  init: (abi, address) => {
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(abi, address);
  },

  // 方法调用
  methods: async (contract) => {
    // 读取方法
    const result = await contract.methods.balanceOf(address).call();
    
    // 写入方法
    await contract.methods.transfer(to, amount)
      .send({ from: account });
  }
};

// Ethers.js 合约交互
const ethersContractExample = {
  init: (abi, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(address, abi, provider.getSigner());
  },

  // 合约调用方法
  methods: async (contract) => {
    // 读取方法
    const result = await contract.balanceOf(address);
    
    // 写入方法
    await contract.transfer(to, amount);
  }
};
```

### 3. 工具类及函数对比
```
// Web3.js 工具函数
const web3Utils = {
  // 单位转换
  toWei: (amount) => {
    const web3 = new Web3();
    return web3.utils.toWei(amount.toString(), 'ether');
  },
  
  fromWei: (amount) => {
    const web3 = new Web3();
    return web3.utils.fromWei(amount.toString(), 'ether');
  },
  
  // 地址检查 
  isAddress: (address) => {
    const web3 = new Web3();
    return web3.utils.isAddress(address);
  }
};

// Ethers.js工具类函数
const ethersUtils = {
  // 单位转换
  toWei: (amount) => {
    return ethers.utils.parseEther(amount.toString());
  },
  
  fromWei: (amount) => {
    return ethers.utils.formatEther(amount);
  },
  
  // 地址检查工具
  isAddress: (address) => {
    return ethers.utils.isAddress(address);
  }
};
```

### 4. 主要区别总结
```
const differences = {
  // 1. 包大小
  packageSize: {
    web3js: "1.5MB+",
    ethersjs: "116.5KB"  // 更小的包体积
  },
  
  // 2. API设计
  apiDesign: {
    web3js: {
      style: "回调和 Promise 混合",
      example: "contract.methods.method().call()"
    },
    ethersjs: {
      style: "Promise 和 async/await 友好",
      example: "contract.method()"
    }
  },
  
  // 3. 类型支持
  typeScriptSupport: {
    web3js: "基础支持",
    ethersjs: "原生支持，类型定义完善"
  },
  
  // 4.功能特点
  features: {
    web3js: {
      advantages: [
        "更成熟的生态系统",
        "更多的社区支持",
        "更多的历史项目在使用"
      ],
      disadvantages: [
        "API设计上不够直观",
        "包体积较大",
        "类型支持不够完善"
      ]
    },
    ethersjs: {
      advantages: [
        "更现代的API设计",
        "更小的包体积",
        "更好的TypeScript支持",
        "更好的安全性考虑"
      ],
      disadvantages: [
        "社区相对较小",
        "部分高级功能需要额外配置"
      ]
    }
  }
};
```

### 5. 实际使用场景对比
```
// Web3.js使用场景
const web3UsageExample = {
  // 批量请求
  batchRequest: async () => {
    const web3 = new Web3(provider);
    const batch = new web3.BatchRequest();
    
    const promises = addresses.map(address => {
      return new Promise((resolve, reject) => {
        batch.add(
          web3.eth.getBalance.request(address, 'latest', (err, balance) => {
            if (err) reject(err);
            else resolve(balance);
          })
        );
      });
    });
    
    batch.execute();
    return Promise.all(promises);
  },
  
  // 事件监听
  eventListener: (contract) => {
    contract.events.Transfer({
      filter: { from: userAddress },
      fromBlock: 'latest'
    })
    .on('data', event => console.log(event))
    .on('error', error => console.error(error));
  }
};

// Ethers.js 使用场景
const ethersUsageExample = {
  // 批量请求
  batchRequest: async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    return Promise.all(
      addresses.map(address => provider.getBalance(address))
    );
  },
  
  // 事件监听
  eventListener: (contract) => {
    contract.on('Transfer', (from, to, amount, event) => {
      console.log({ from, to, amount, event });
    });
  }
};
```

### 6. 性能对比

主要性能差异：
1、包大小比较：
- Web3.js: ~1.5MB
- Ethers.js: ~116.5KB
2、初始化时间：
- Ethers.js 通常更快
3、合约调用：
- 单次调用：差异不大
- 批量调用：Web3.js 的 BatchRequest 略优
4、事件监听：
- Ethers.js 内存占用更少
- Web3.js 事件处理更灵活
5、内存使用：
- Ethers.js 整体内存占用更少
选择建议：
- 如果注重：
- 包大小和加载速度：选择 Ethers.js
- 批量操作性能：选择 Web3.js
- 内存占用：选择 Ethers.js
- TypeScript 支持：选择 Ethers.js
2. 其他考虑因素：
- API 设计
- 社区支持
- 文档质量
- 维护活跃度
```
// 性能测试case
const performanceTest = async () => {
  // Web3.js 性能测试 demo
  const web3Test = async () => {
    const web3 = new Web3(provider);
    console.time('web3');
    
    const batch = new web3.BatchRequest();
    for(let i = 0; i < 100; i++) {
      batch.add(web3.eth.getBalance.request(address));
    }
    await batch.execute();
    
    console.timeEnd('web3');
  };
  
  // Ethers.js性能测试demo
  const ethersTest = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    console.time('ethers');
    
    const promises = [];
    for(let i = 0; i < 100; i++) {
      promises.push(provider.getBalance(address));
    }
    await Promise.all(promises);
    
    console.timeEnd('ethers');
  };
};
```

