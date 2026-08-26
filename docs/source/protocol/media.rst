媒体事件
========

接收
----

WebSocketTransport 解码 Media Frame 后调用 ``onMedia(header, body)``。WebSocketContext 会保留
服务器入站语义，把它作为 ``incoming`` 同名事件送入 Event Runtime；不会重新标记成 ``localOnly``。
Payload 包含：

.. code-block:: javascript

   {
       ...header.metadata,
       header,
       body, // Uint8Array
   }

消费
----

Speech Hook/Player 优先读取 ``payload.body``。Header 提供 streamId、sequence、codec、sampleRate 和
channels。MEDIA 与普通 EVENT 一样保留原 ``event_id``、``trace_id``、``sequence`` 和 ``conversation_id``，
因此 ``direction: 'incoming'`` 的订阅器能够收到媒体帧，并与同一 ``speech.*`` Stream Lane 中的 Ready/Progress
事件保持一致的入站调度语义。

输入
----

未来麦克风流可调用 ``transport.sendMedia(header, chunk)``。AudioWorklet 产生 ArrayBuffer，避免
Base64 和主线程大字符串。

资源释放
--------

播放器结束、取消、组件卸载和 Stream 切换时释放 AudioBuffer、Object URL、Timer、订阅和未播放
Chunk。

.. warning::

   React State 不适合保存大量连续 Uint8Array。使用有界队列、Ref 或专用 Audio Runtime。
