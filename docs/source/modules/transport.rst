Transport 模块
==============

.. js:module:: src/runtime/transport/WebSocketTransport

.. js:class:: WebSocketTransport(url, handlers)

   纯二进制 WebSocket Transport。

   .. js:method:: connect()

      建立连接、设置 ``binaryType``、安装 onopen/onmessage/onerror/onclose，并复用进行中的 Promise。

   .. js:method:: close(code, reason)

      关闭当前连接。

   .. js:method:: sendEvent(envelope)

      编码并发送 Event Frame；未连接时抛错。

   .. js:method:: sendMedia(header, body)

      编码并发送 Media Frame。

.. js:module:: src/runtime/transport/channel

Channel 保存当前 Transport 和断线期间的有界 Event 队列。连接建立后 ``flushRealtimeEvents`` 按顺序
发送，避免组件直接依赖 Provider。

完整函数见 :doc:`../api/javascript/runtime/transport/WebSocketTransport` 和
:doc:`../api/javascript/runtime/transport/channel`。
