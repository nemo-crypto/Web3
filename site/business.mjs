export const topics = [
  { id: 'wallet', name: '钱包与权限' },
  { id: 'transaction', name: '交易与跨链' },
  { id: 'payment', name: '支付与对账' },
  { id: 'product', name: '资产与权益' },
];

export const businessCases = [
  {
    id: 'wallet-resume', topic: 'wallet', title: '切回浏览器，连接还没恢复',
    subtitle: '钱包已批准，DApp 仍停在「等待连接」。', role: '钱包接入',
    context: '用户在手机浏览器打开活动页，随后唤起钱包并批准请求。回到活动页时，浏览器没有收到即时回调，而且钱包切换过地址。',
    evidence: [['浏览器', '存在第一次配对请求'], ['钱包', '已批准一个会话，当前地址为 B'], ['站点', '已有地址 A 的旧登录会话']],
    workflow: ['读取已批准的连接会话', '核对当前账号与网络', '重新验证站点登录', '恢复原业务草稿'],
    question: '下一步应该先做什么？',
    answers: [
      ['重新读取连接会话与账户，核对旧登录身份', true, '这样可以恢复原配对，并阻止地址 B 继承地址 A 的订单权限。'],
      ['自动新建一条配对请求', false, '先核对上一次请求，否则用户可能同时面对两个连接会话。'],
      ['用本地显示的旧地址直接打开订单', false, '站点授权需与已验证的地址匹配，不能沿用旧页面状态。'],
    ],
    lesson: 'course/02-wallets/10-qr-wallet-connect.md',
  },
  {
    id: 'permission-review', topic: 'wallet', title: '断开钱包之后，额度还在',
    subtitle: '连接入口、代币授权和签名委托的撤销条件各有不同。', role: '权限审查',
    context: '用户取消兑换后断开钱包，之前对合约的 ERC-20 授权已成功。他还签过一份未提交的限时代币授权。',
    evidence: [['站点会话', '已注销'], ['链上额度', 'spender 仍有 100 单位额度'], ['离线签名', '尚未提交，需核对有效期与 nonce']],
    workflow: ['区分会话与链上授权', '读取当前额度', '按协议验证签名时效', '核对撤销与回执'],
    question: '产品应向用户提供什么解释？',
    answers: [
      ['断开钱包已经撤销两类授权', false, '断开影响连接会话。链上额度已生效，之前的签名也需要单独评估。'],
      ['链上额度与签名委托需要分别处理', true, '为链上授权提供撤销入口，并解释不同签名协议如何失效。'],
      ['只刷新页面即可确认安全', false, '刷新只更新界面，需要用合约查询和协议规则验证权限。'],
    ],
    lesson: 'course/02-wallets/11-approval-review.md',
  },
  {
    id: 'replace-transaction', topic: 'transaction', title: '加速以后，原哈希查不到回执',
    subtitle: '同一操作可能收到多个交易哈希。', role: '交易体验',
    context: '用户对一笔等待中的兑换选择加速。原哈希一直未取得回执，钱包显示一个同发送地址、同 nonce 的替换哈希。',
    evidence: [['原交易', '已广播，等待回执'], ['新交易', '同账户且同 nonce'], ['业务单', '仅存在一条待确认兑换']],
    workflow: ['查询替换交易', '比较目标、金额与数据', '继续追踪新哈希', '按回执和到账确认'],
    question: '如何恢复这笔兑换的页面状态？',
    answers: [
      ['原哈希超时后立刻再发一笔', false, '需要先确认替换是否已执行，盲目重试可能发起第二笔业务操作。'],
      ['任何同 nonce 的交易都等同于原兑换', false, '同 nonce 表示竞争执行顺序。替换也可能是取消或修改了目标与金额。'],
      ['核对替换交易的实际动作，再更新追踪记录', true, '比较交易意图和回执后可继续追踪。取消交易应进入单独状态。'],
    ],
    lesson: 'course/03-development/09-transaction-ui-state-machine.md',
  },
  {
    id: 'rollup-withdrawal', topic: 'transaction', title: 'L2 已扣款，L1 仍未到账',
    subtitle: '源链发起、证明和最终领取分别查证据。', role: '跨链支持',
    context: '用户用标准桥退出 Rollup，看见 L2 源交易成功。提现页面显示等待协议条件，目标链还没有执行记录。',
    evidence: [['L2 回执', '执行成功'], ['跨链消息', '已生成退出标识'], ['L1 收款', '尚无领取回执']],
    workflow: ['读取退出标识', '核对证明与前置条件', '检查目标执行状态', '保存两端到账证据'],
    question: '客服可以怎么给用户说明？',
    answers: [
      ['源链确认仅完成发起，仍需检查目标领取条件', true, '建议用户查看该消息的进度、可执行条件与目标链回执。'],
      ['L2 状态成功已经等同于到账', false, 'L2 回执记录的是发起或扣款，L1 资产变化还需目标链证据。'],
      ['立刻再发一笔相同提现', false, '应先排查原退出消息及恢复路径，避免重复扣款。'],
    ],
    lesson: 'course/04-scaling/10-rollup-withdrawal-operation.md',
  },
  {
    id: 'checkout-replay', topic: 'payment', title: '同一笔收款通知到了三次',
    subtitle: '一次发货依赖订单核验和去重。', role: '商户支付',
    context: '商户为订单 P1 收到 25 USDC。监听服务因网络抖动重试三次，三个回调都引用同一条链、同一交易和同一日志序号。',
    evidence: [['订单金额', '25 USDC'], ['回调来源', '同一事件键重复三次'], ['履约任务', '初次回调已创建一条发货任务']],
    workflow: ['核对币种、额度和接收方', '按事件键去重', '匹配订单和既有履约', '回放确认状态'],
    question: '第三次回调应该怎样处理？',
    answers: [
      ['更新为已收到 75 USDC', false, '回调数量反映投递次数，实际收款由不同的有效链上事件累计。'],
      ['幂等更新确认状态，沿用已有发货任务', true, '这条通知指向既有入账，发货任务用订单与动作键约束重复。'],
      ['所有重复回调都要生成退款', false, '没有新增资金就没有超付，只需要补查订单状态或修复原发货任务。'],
    ],
    lesson: 'course/05-payments/12-checkout-and-fulfillment.md', lab: 'payments',
  },
  {
    id: 'redemption-race', topic: 'product', title: '两扇闸机同时扫到同一张票',
    subtitle: '票券持有状态和入场核销都必须验证。', role: '数字票务',
    context: '现场两台扫码设备同时提交同一票券。一台完成核销时，另一台的旧缓存仍显示「未使用」。',
    evidence: [['票券', '当前有效并属于验票人'], ['状态', '首个请求已成功核销'], ['设备', '第二台持有过期的缓存数据']],
    workflow: ['核对票券归属与有效期', '校验短时入场证明', '原子更新核销状态', '返回唯一入场结果'],
    question: '怎样防止第二台闸机重复放行？',
    answers: [
      ['只校验二维码的图片内容相同', false, '二维码可能被缓存或截屏，同一图片可提交多次。'],
      ['两台闸机先放行，之后再合并记录', false, '两个入口的重复放行无法靠事后合并撤回。'],
      ['以服务端原子核销结果为准，缓存仅作提示', true, '同一票券只有首个核销完成，另一个入口显示已使用并提供处理方式。'],
    ],
    lesson: 'course/08-applications/13-ticketing-and-redemption.md',
  },
];

export const businessPagePath = 'reference/business-cases.md';
