二进制 Transport
================

Frame
-----

固定头包含 ``CWM`` Magic、版本、Kind、Header 长度和 Body 长度。Header 使用 MessagePack，Body
仅用于 Media/Binary。

``frame.js``
------------

``encodeEventFrame``
   校验 EventEnvelope 并返回 ArrayBuffer。

``encodeMediaFrame``
   校验 MediaEnvelope 和原始 Body。

``decodeFrame``
   接受 ArrayBuffer/TypedArray，验证长度和协议，再返回 ``{kind, header, body}``。

``msgpack.js``
--------------

受限 Codec 支持 null、Boolean、安全 Number/Integer、String、Binary、Array 和普通 Object。禁止函数、
Symbol、循环对象、Date 和超安全整数。

``WebSocketTransport``
----------------------

负责连接、``binaryType='arraybuffer'``、Frame 解码和 Handler 回调。它不知道 Conversation、Chat 或
Speech 业务。

.. important::

   ``socket.send(new TextEncoder().encode(JSON.stringify(...)))`` 仍然是 JSON，不是 Protocol v1。
