GraphQL实时获取 链上数据
1. 核心架构与数据流:
整个过程涉及四个主要角色，它们之间的协作关系如下图所示，清晰地展示了数据从区块链到用户界面的实时流动过程：
<img width="1241" height="2212" alt="image" src="https://github.com/user-attachments/assets/3f4d7745-05fa-48fa-88ac-e08971638c1c" />
   
2. 技术栈选择
GraphQL 客户端：Apollo Client（行业标准，功能全面） 或 urql（更轻量）。
HTTP 客户端：@apollo/client 内置。
WebSocket 客户端：subscriptions-transport-ws（Apollo V2/V3） 或 graphql-ws（Apollo V4+ 推荐）。我们将以最新的 graphql-ws 为例。
索引服务：The Graph，它为其 Subgraph 提供了开箱即用的订阅支持。

3. 具体实现步骤
步骤一：配置 Apollo Client 并分割链接
你需要根据操作类型（查询、突变、订阅）来配置不同的网络链接。
```
// apollo-client.js
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// 1. 创建 HTTP 链接用于普通的 Queries 和 Mutations
const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/your-subgraph-name' // 替换为你的 Subgraph 地址
});

// 2. 创建 WebSocket 链接用于 Subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://api.thegraph.com/subgraphs/name/your-subgraph-name', // WebSocket 地址，通常是 http -> ws
  connectionParams: () => {
    // 如果需要认证，可以在这里添加 token
    return {};
  },
}));

// 3. 使用 split 函数根据操作类型定向到不同的链接
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// 4. 创建 Apollo Client 实例
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;
```
步骤二：在 React 应用中提供 Client
```
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```
步骤三：在组件中使用 Subscription Hook
假设我们想要实时监听一个新的流动性池被创建的事件。
```
// components/NewPoolsListener.js
import React from 'react';
import { useSubscription, gql } from '@apollo/client';

// 1. 定义你的 GraphQL 订阅
// 这个查询需要根据你的 Subgraph 模式来编写
const NEW_POOL_CREATED = gql`
  subscription OnPoolCreated {
    poolCreateds(
      first: 5
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      token0
      token1
      pool
      blockTimestamp
    }
  }
`;

function NewPoolsListener() {
  // 2. 使用 useSubscription Hook
  const { data, loading, error } = useSubscription(NEW_POOL_CREATED);

  React.useEffect(() => {
    if (data) {
      console.log('监听到新的池子创建:', data.poolCreateds[0]);
      // 在这里你可以：
      // - 更新本地状态，触发 UI 重新渲染
      // - 发出一个通知/toast
      // - 将新数据追加到一个列表中
    }
  }, [data]);

  if (loading) return <div>监听订阅中...</div>;
  if (error) return <div>订阅错误: {error.message}</div>;

  // 这个组件本身可以不渲染任何内容，或者渲染一个实时通知栏
  return (
    <div className="notification">
      <small>实时监听中... 当有新流动性池创建时，这里会触发更新。</small>
      {/* 你可以选择性地在这里渲染 data */}
    </div>
  );
}

export default NewPoolsListener;
```
步骤四：与 UI 状态集成（更完整的例子）
通常，你会将订阅接收到的新数据，合并到现有的本地状态或 Apollo 缓存中。
```
// components/PoolList.js
import React from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';

const GET_POOLS = gql`
  query GetPools {
    poolCreateds(
      first: 10
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      token0
      token1
      pool
    }
  }
`;

const NEW_POOL_CREATED = gql`
  subscription OnPoolCreated {
    poolCreateds(
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      token0
      token1
      pool
    }
  }
`;

function PoolList() {
  // 1. 首先，用查询获取初始列表
  const { data, loading, error, subscribeToMore } = useQuery(GET_POOLS);

  // 2. 使用 subscribeToMore 函数将订阅结果更新到查询的缓存中
  //    这是一种更优雅的方式，可以自动更新列表
  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_POOL_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPool = subscriptionData.data.poolCreateds[0];

        // 检查是否已经存在，避免重复
        if (prev.poolCreateds.find(pool => pool.id === newPool.id)) {
          return prev;
        }

        // 将新池子添加到列表的最前面
        return {
          ...prev,
          poolCreateds: [newPool, ...prev.poolCreateds]
        };
      }
    });

    // 清理函数
    return () => unsubscribe();
  }, [subscribeToMore]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <h2>流动性池列表 (实时)</h2>
      <ul>
        {data.poolCreateds.map(pool => (
          <li key={pool.id}>
            Pool: {pool.pool} (Tokens: {pool.token0} / {pool.token1})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PoolList;
```
