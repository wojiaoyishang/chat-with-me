前端定位与开发目标
================================================================================

CWM 前端不是一个只渲染 Markdown 的聊天页面。它是 Human ↔ Agent 的实时交互层，负责文本、
语音、触摸选择、Widget、工具批准、Document、Story、Workspace 和通知等多种 Surface。

前端负责什么
--------------------------------------------------------------------------------

Transport
   建立 WebSocket，发送/接收 ArrayBuffer，处理连接、关闭和协议错误。

Protocol
   MessagePack、固定 Frame、Event/Media Envelope、事件名和订阅表达式校验。

Event Runtime
   创建事件、区分 local/outgoing/incoming、按 Scope 过滤、去重、请求/回复和通配符订阅。

Surface
   Chat、Voice、Widget、Document 等界面消费领域事件并产生用户动作。

HTTP Resource Layer
   读取 Conversation、Message、Model、Settings、Document、Workspace 等持久资源，并在 401 时
   统一回登录页。

核心原则
--------------------------------------------------------------------------------

#. ChatPage 只是 Surface，不拥有协议。
#. 组件订阅语义事件，而不是服务器命令。
#. 回复事件只完成 Promise，不默认广播给普通监听器。
#. 流式 UI 是缓存；持久历史最终从 HTTP API 校准。
#. Voice、Widget 和未来 Shopping Surface 共享同一 Event Runtime。
#. 可访问性是 UI Profile，不应写成大量 ``if (elderly)`` 分支。

.. note::

   ``ChatPage.jsx``、``ChatBox.jsx`` 和 ``useChatSpeech.js`` 仍然较大，是后续拆分重点。新增能力时
   优先放在 ``runtime``、领域 ``features`` 或独立 Hook，不要继续把所有状态塞入 ChatPage。

常见入口
--------------------------------------------------------------------------------

* 路由和全局 Provider：``src/main.jsx``；
* API 地址：``src/config.js``；
* WebSocket 生命周期：``src/context/WebSocketContext.jsx``；
* Event Runtime：``src/context/useEventStore.jsx``；
* Frame/MessagePack：``src/runtime/protocol``；
* Chat：``src/features/chat``；
* Widget/Markdown：``src/components/markdown``；
* Voice：``src/features/chat/page/hooks/useChatSpeech.js`` 和 ``src/features/chat/speech``。
