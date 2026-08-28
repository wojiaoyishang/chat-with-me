项目目录与定位方法
================================================================================

.. code-block:: text

   src/
   ├─ main.jsx                  Root、Router、全局 Host
   ├─ config.js                HTTP/WS Endpoint
   ├─ runtime/
   │  ├─ protocol/             Event、Frame、MessagePack、订阅规则
   │  └─ transport/            WebSocketTransport、发送队列
   ├─ context/                 Event Store、WebSocket、Toast、错误
   ├─ pages/                   路由页面
   ├─ features/
   │  ├─ chat/                 Chat Surface、语音、消息、输入区
   │  ├─ notification/         通知
   │  ├─ story/                Story
   │  ├─ tools/                工具配置 UI
   │  └─ workspace/            Workspace UI
   ├─ components/
   │  ├─ markdown/             Markdown、Replacement、Widget
   │  ├─ editor/               Collabora
   │  ├─ sidebar/              Conversation 导航
   │  ├─ setting/              动态设置
   │  ├─ modal/                通用 Modal
   │  └─ ui/                   基础组件
   ├─ hooks/                   跨 Feature Hook
   ├─ lib/                     通用浏览器/业务函数
   └─ assets/                  CSS、i18n、图标

定位规则
--------------------------------------------------------------------------------

* 连接/重连：``context/WebSocketContext``、``runtime/transport``；
* “事件没触发”：``useEventStore``、事件名、direction 和 Scope；
* 二进制解码：``runtime/protocol``；
* 消息树：``features/chat/ChatPage`` 及 page utils；
* 输入框：``features/chat/ui/ChatBox``；
* 朗读：``features/chat/page/hooks/useChatSpeech`` 和 speech 目录；
* Markdown/Widget：``components/markdown``；
* 401：``DashboardPage``、Axios/fetch 包装和 LoginPage；
* 路由不同步：``main.jsx``、``browserHistoryLayers``。

.. tip::

   UI 基础组件放 ``components/ui``，领域组件放 ``features/<domain>``。只有多个领域共同使用且不
   含业务语义的组件才提升到通用 components。
