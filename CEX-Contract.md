# 全仓合约和逐仓合约的详细对比
## 基本概念

### 全仓合约（Cross Margin）
- 用户账户中所有可用资金都会用来防止爆仓
- 所有合约共用整个账户的保证金
- 风险共担，收益共享
  
### 逐仓合约（Isolated Margin）
- 每个合约仓位都独立配置保证金
- 单个仓位的盈亏不会影响其他仓位
- 风险相对隔离
  
## 详细对比

### 1. 保证金管理

#### 全仓-合约
```text
总保证金 = 账户所有可用资金
维持保证金率 = 总保证金 / 所有持仓价值
```
#### 逐仓-合约
```text
单个仓位保证金 = 指定分配的保证金
维持保证金率 = 单个仓位保证金 / 该仓位持仓价值
```

### 2. 风险特点
#### 全仓合约
- 优点：
  - 资金利用率高
  - 可以共享保证金
  - 不易被单个仓位爆仓
- 缺点：
  - 一个仓位亏损会影响其他仓位
  - 整体风险较大
  - 难以精确控制单个仓位风险
#### 逐仓合约
- 优点：
  - 风险隔离
  - 易于管理单个仓位
  - 损失可控
- 缺点：
  - 资金利用率较低
  - 需要分别管理保证金
  - 单个仓位容易被爆仓
### 3. 适用场景

#### 全仓合约适合：
1. 经验丰富的交易者
2. 多品种交易策略
3. 追求高资金利用率
4. 风险承受能力强的用户
#### 逐仓合约适合：
1. 新手交易者
2. 单一品种交易
3. 注重风险控制
4. 保守型投资者
## 计算示例
### 1. 全仓合约示例
```python
class CrossMarginExample:
    def __init__(self, total_balance):
        self.total_balance = total_balance  # 总保证金
        self.positions = {}  # 所有持仓
        
    def calculate_margin_ratio(self):
        """计算保证金率"""
        total_position_value = sum(position['value'] for position in self.positions.values())
        return self.total_balance / total_position_value if total_position_value > 0 else 1
        
    def add_position(self, symbol, value):
        """添加新仓位"""
        self.positions[symbol] = {'value': value}
        margin_ratio = self.calculate_margin_ratio()
        return margin_ratio
```

### 2. 逐仓合约示例
```python
class IsolatedMarginExample:
    def __init__(self):
        self.positions = {}  # 所有持仓
        
    def add_position(self, symbol, margin, position_value):
        """添加新仓位"""
        margin_ratio = margin / position_value
        self.positions[symbol] = {
            'margin': margin,
            'value': position_value,
            'margin_ratio': margin_ratio
        }
        return margin_ratio
```

## 风险管理建议
### 1. 全仓合约风险管理
```python
class CrossMarginRiskManager:
    def __init__(self, total_balance, risk_limit):
        self.total_balance = total_balance
        self.risk_limit = risk_limit
        
    def check_risk(self, positions):
        """检查风险水平"""
        total_exposure = sum(position['value'] for position in positions.values())
        margin_ratio = self.total_balance / total_exposure
        
        if margin_ratio < self.risk_limit:
            return {
                'status': 'WARNING',
                'message': f'Margin ratio ({margin_ratio:.2%}) below risk limit ({self.risk_limit:.2%})'
            }
        return {'status': 'OK'}
```
### 2. 逐仓合约风险管理
```python
class IsolatedMarginRiskManager:
    def __init__(self, min_margin_ratio):
        self.min_margin_ratio = min_margin_ratio
        
    def check_position_risk(self, margin, position_value):
        """检查单个仓位风险"""
        margin_ratio = margin / position_value
        
        if margin_ratio < self.min_margin_ratio:
            return {
                'status': 'WARNING',
                'message': f'Position margin ratio ({margin_ratio:.2%}) too low'
            }
        return {'status': 'OK'}
```
  
