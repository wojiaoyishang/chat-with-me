总体架构
========

.. code-block:: text

   Browser APIs / User Input
             │
             ▼
        React Surface
   Chat / Voice / Widget / Doc
             │
             ▼
        Semantic Event Runtime
        emitEvent / onEvent
             │
      ┌──────┴────────┐
      ▼               ▼
   local event     outgoing event
                      │
                      ▼
              Realtime Channel
                      │
                      ▼
              WebSocketTransport
                      │ ArrayBuffer
                      ▼
              CWM Protocol v1

   HTTP API ─────────► Resource stores / page state

层次
----

``runtime/protocol``
   纯数据和 Codec，不依赖 React。

``runtime/transport``
   连接与发送，不理解 Chat/Voice 业务。

``context``
   全局 Provider、Event Store、Toast、Fatal Error 等跨页面运行时。

``features``
   领域 Surface 和状态，例如 Chat、Notification、Story、Workspace。

``components``
   可复用 UI、Markdown、Widget、Modal 和 Editor。

``pages``
   路由级装配，处理认证、URL 与多个 Feature 的组合。

依赖方向
--------

.. code-block:: text

   Page / Feature / Component
              │
              ▼
       Event Runtime / Hook
              │
              ▼
      Protocol / Transport

Protocol 和 Transport 不应导入 ChatPage、WidgetHost 或翻译文案。

.. warning::

   在 ``WebSocketContext`` 中按业务事件写大量 switch，会重新形成“连接层控制页面”的旧架构。
   连接层只把 Envelope 送入 Event Runtime。
