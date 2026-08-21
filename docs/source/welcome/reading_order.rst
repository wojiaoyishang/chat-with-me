第一次阅读代码
==============

从启动链开始
------------

#. ``src/main.jsx``：React Root、Router、全局 Host 和 WebSocketProvider。
#. ``src/pages/DashboardPage.jsx``：认证初始化、聊天/文档页面装配。
#. ``src/context/WebSocketContext.jsx``：连接、重试、Media 转本地事件。
#. ``src/runtime/transport/WebSocketTransport.js``：纯 Transport。
#. ``src/runtime/protocol/frame.js`` 与 ``msgpack.js``：协议 Codec。
#. ``src/context/useEventStore.jsx``：Event 的发送、订阅、Scope、回复和去重。

沿文本消息阅读
--------------

#. ``src/features/chat/ui/ChatBox.jsx`` 收集文本、模型、附件和工具状态；
#. ChatPage 发送 ``turn.start``；
#. Event Store 把 EventEnvelope 交给 Realtime Channel；
#. ``message.created``/``message.content.delta`` 更新消息；
#. ``turn.completed`` 触发终态和摘要校准；
#. ``MessageOverviewDialog`` 使用 HTTP 摘要接口读取持久链。

沿朗读链阅读
------------

#. 消息按钮发出本地 ``speech.play.requested``；
#. ``useChatSpeech`` 处理本地请求，向后端发 ``speech.synthesize``；
#. Incoming ``speech.*`` 更新播放器；
#. Media Frame 在 WebSocketContext 中变为 local ``speech.audio.chunk``；
#. ``SpeechPlayer``/BackendAudio 消费原始 bytes。

沿 Widget 阅读
--------------

#. Markdown Replacement 解析占位；
#. ``WidgetHost`` 根据类型渲染组件；
#. 用户动作产生 ``widget.state.changed`` 或 Interaction Event；
#. Agent 收到结构化结果继续 Turn。

.. tip::

   完整 JavaScript API 参考不仅列导出函数，也列组件内部具名函数和匿名回调，可以快速判断某个
   ``useEffect`` 或 ``onEvent(...).then`` 回调位于哪一行。
