Runtime Inspector 前端架构
================================================================================

Runtime Inspector 替代原“消息概览”入口，但没有删除消息概览能力。旧能力被收进后端定义的
``简要模式`` Tab，用来快速浏览与跳转，并作为第一个 Tab 与默认入口。模型请求、上下文、原始消息和工具页
继续承担深度调试职责。

Backend-driven UI
--------------------------------------------------------------------------------

前端不决定 Runtime Inspector 有几个 Tab、Tab 的业务顺序，也不读取 Context Manager 内部数据。
``ChatPage`` 只调用 ``/chat/runtime-inspector``，把后端返回的 Inspector Document 交给
``RuntimeInspectorDialog``。

前端当前只维护 Section Renderer Registry：

* ``model-call-browser``；
* ``context-browser``；
* ``raw-message-browser``；
* ``tool-browser``；
* ``message-summary-browser``。

未知 Section Type 会退化为 JSON Viewer。后端可以增加数据字段而不要求前端同步增加业务判断。

.. important::

   Backend-driven 不等于“后端遥控 React”。后端只返回稳定语义结构，不返回 React 组件名称、JavaScript
   命令或任意 HTML。

桌面与移动端
--------------------------------------------------------------------------------

移动端使用 ``100dvh`` 全屏 Dialog，减少多层窗口造成的可用区域损失；桌面端显式覆盖通用
``DialogContent`` 的 ``sm:max-w-lg`` 限制，使用约 ``97vw``、最大 ``1680px``、``94dvh``、最大 ``1080px``
的开发者工作区。Tab 与 Model Call 选择器允许横向滚动，因此不会依赖固定桌面宽度。

Model Call 浏览器在桌面端采用左侧 Call Rail + 右侧详情；移动端自动变成顶部横向 Call Selector。
所有 Section 根节点都遵守 ``h-full + min-h-0`` 的受约束 Flex 布局，真正的主内容区统一使用
``overflow-y-auto``。这避免子内容无限增高后被 Inspector 上层 ``overflow-hidden`` 裁掉，是长卡片能够
滚动到底部的关键约束。

全局滚动条
--------------------------------------------------------------------------------

``src/assets/css/index.css`` 定义全局 Pretty Scrollbar。所有原生滚动容器默认使用统一的细滚动条、透明轨道、
圆角 Thumb 和暗色模式变量；显式使用 ``hide-scrollbar`` 的区域仍可隐藏滚动条。``pretty-scrollbar`` 现在主要
作为“该组件有意提供滚动”的语义标记和 ``scrollbar-gutter`` 稳定布局，而不是另一套视觉实现。

模型消息
--------------------------------------------------------------------------------

每条模型消息同时显示：

* ``role``；
* 来源：System Prompt、原始对话、Context Compaction、Recall、Runtime Directive 等；
* CWM 标准化正文；
* Token 估算；
* 可选 reasoning 字段；
* ``Provider 消息载荷``，即后端捕获的 Provider-compatible message dump。

Provider 消息载荷展开后使用受限高度的滚动容器并显示序列化字符数，但不再拦截 ``wheel`` 事件，
因此内部滚动到边界后可以自然继续驱动外层 Model Call 主滚动区。如果 Provider serializer 真正返回
``null``，界面会明确提示，而不是表现成“空白、无法继续下滑”。

.. note::

   Provider 消息载荷只表示 CWM Provider Adapter 可见的结构。供应商内部额外注入的不可见指令不属于
   CWM 可观测范围。


工具筛选与 Model Call 统计
--------------------------------------------------------------------------------

工具页优先消费后端返回的 ``filters``、``defaultFilter`` 和 ``catalog``。当前可以快速切换“全部启用”、
“已进入上下文”和“已获取详情”，并按工具名搜索。``已进入上下文`` 只表示工具名已经对当前模型可见，
不等于模型已经拿到参数详情；工具条目如果带有 Provider Schema，会在同一条目中展开 description 和
parameters，不再单独把完整启用名称列表铺满页面。

模型请求详情另外显示该 Model Call 触发的工具执行统计：总调用、成功、失败以及状态未知。Inspector 顶部
还会在存在工具调用时显示整个活动分支 Snapshot 的聚合工具统计。

上下文压缩
--------------------------------------------------------------------------------

“上下文” Tab 显示当前有效和历史 Compaction Artifact。展开一个 Artifact 后，可以看到它来源的原始消息，
点击消息即可关闭 Inspector 并复用 ChatPage 已有的 ``jumpToMessage`` 逻辑定位到聊天记录。

“原始消息” Tab 则从反方向标记每一条数据库消息是否处于：

* 已被某个有效 Artifact 压缩；
* 已显式 forgotten；
* 普通原始上下文。

简要模式
--------------------------------------------------------------------------------

``message-summary-browser`` 继续复用 ``MessageSummaryItem`` 和 ``react-virtuoso``。它不是新写的一套消息
地图，而是原消息概览能力在 Runtime Inspector 中的新承载方式，因此快速跳转和大列表虚拟化得以保留。

刷新策略
--------------------------------------------------------------------------------

打开 Inspector 时立即从后端读取一次。Inspector 已打开时，以下事件会触发静默刷新：

* ``turn.completed``；
* ``turn.cancelled``；
* ``turn.failed``；
* ``conversation.tree.changed``。

这样模型生成结束、编辑历史消息产生新分支或切换分支后，Inspector 不会长期显示旧 Snapshot。

未来扩展
--------------------------------------------------------------------------------

计划中的通用 JSON 动态窗口不属于 Runtime Inspector V1。本组件现在只是一套 Inspector 专用、受限的
Section Renderer。未来如果引入通用动态窗口，应把它放在更底层的 Interaction Renderer，而不是让
Runtime Inspector 直接演化成任意 JSON UI 执行器。
