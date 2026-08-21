新增 Widget 或卡片
=================

Schema
------

定义：类型、版本、数据、状态、Action、验证和只读表示。字段命名保持通用，例如 ``items``、
``primaryValue``、``facts``、``warnings``、``actions``、``speechText``。

实现
----

#. 在 Widget Host 注册受控组件；
#. 解析默认值并处理未知字段；
#. 用户动作发布 ``widget.state.changed`` 或领域事件；
#. 防止重复提交；
#. 支持撤回/取消；
#. 提供大字、键盘、触摸和朗读；
#. 增加交互测试。

卡片
----

Card Deck 可以复用到商品、方案、旅游和餐厅，不应硬编码 ``ElderlyProductCard``。领域 Skill 负责
填充商品语义，通用组件只负责展示和交互。

安全
----

* 图片/链接经过 Virtual URL 或 allowlist；
* 不执行模型 HTML/JS；
* 购买、发送等高风险 Action 进入确认/审批；
* 来源和时间作为数据展示。
