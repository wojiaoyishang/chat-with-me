事件流
======

出站
----

.. code-block:: text

   Component/Hook
       │ emitEvent({event, scope, payload})
       ▼
   createEnvelope
       │ local dispatch (direction=outgoing)
       ▼
   Realtime Channel
       │ queue if disconnected
       ▼
   WebSocketTransport.sendEvent
       ▼
   encodeEventFrame → ArrayBuffer

入站
----

.. code-block:: text

   WebSocket ArrayBuffer
       ▼
   decodeFrame
       ├─ EVENT → globalMessageCallback → dispatchIncomingEvent
       └─ MEDIA → emitEvent(localOnly, body=Uint8Array)
       ▼
   onEvent listeners
       ▼
   Feature/Store/Surface update

本地事件
--------

``localOnly: true`` 只在浏览器传播，例如播放控制、Composer 查询和组件间交互。它仍使用统一
Envelope，便于作用域、Trace 和调试。

方向
----

``local``
   浏览器内部事件。

``outgoing``
   浏览器创建、准备发给服务器的事件。

``incoming``
   从服务器 Event Frame 或 Media Frame 转换而来。

.. important::

   监听后端结果应显式 ``direction: 'incoming'``。否则监听器可能收到自己刚发出的 outgoing
   请求，造成重复执行或递归回复。
