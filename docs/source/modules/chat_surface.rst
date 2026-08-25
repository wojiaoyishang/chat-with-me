Chat Surface 模块
================================================================================

.. js:module:: src/features/chat/ChatPage
   :no-index:

``ChatPage`` 当前负责 Conversation 加载、消息树、流式 Event、编辑/重生成、摘要、Context、Story、
Workspace 和语音装配，是后续拆分的重要边界。

关键子目录
--------------------------------------------------------------------------------

``page/components``
   Header、加载页、Runtime Inspector、模型预览和导航。

``page/hooks``
   Speech、Window Mode、Upload 等复杂生命周期。

``page/utils``
   消息摘要、网络合并和纯函数。

``ui``
   ChatBox、Message、ToolButtons 和输入交互。

新增代码规则
--------------------------------------------------------------------------------

* 纯数据合并进入 utils；
* 生命周期进入 Hook；
* 视觉组件进入 components；
* 协议逻辑留 Runtime；
* 新领域能力不要继续增加 ChatPage 顶层 state/effect。

完整函数和内部回调见 :doc:`../api/javascript/features/chat/ChatPage` 及
:doc:`../api/javascript/features/index`。


模型与思考选项
--------------------------------------------------------------------------------

ChatBox/ChatPage 不根据 Provider 名称推导思考能力。模型列表和 Conversation ``options`` 都由后端返回
Capability-aware Schema：工具调用思考续传、跨用户 Turn 历史思考回传以及“软思维自动关闭任务模式思考”
分别拥有独立的 ``disabled``/``tips`` 状态。切换模型后应以服务端返回的当前模型 options 为准。

Thinking 卡片仍是可见展示层；跨 Turn reasoning 的精确持久化与 Provider 序列化属于后端职责，前端不得从
Thinking 卡文本重新构造 ``reasoning_content``。

消息协调与 ACK 规则
--------------------------------------------------------------------------------

``conversation.messages.loaded`` 之后，后端会恢复活跃 Run 的 Redis Stream collector。前端对
``message.content.set``、``message.content.delta`` 等 Stream lane 事件按 FIFO 应用，因此无需通过业务
ACK 来保证 baseline 与 delta 的先后顺序。

``composer.status.changed`` 也是状态同步事件。``ChatBox`` 只有在 payload 明确声明 ``reply`` 时才发送
``reply_to`` 响应；普通状态广播不得产生无请求的 reply。真正需要用户选择或业务返回值的交互仍按
CWM Protocol 的 request/reply correlation 处理。

这样即使 ChatBox 因路由切换、React 重挂载等原因短暂不可用，也不会阻塞 ChatPage 的消息增量采集。
