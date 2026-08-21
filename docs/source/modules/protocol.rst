Protocol 模块
=============

.. js:module:: src/runtime/protocol/frame

.. js:function:: encodeEventFrame(envelope)

   校验并编码 Event Frame，返回 ArrayBuffer。

.. js:function:: encodeMediaFrame(envelope, body)

   编码 Media Header 和原始 Body。

.. js:function:: decodeFrame(input)

   验证和解码完整 Frame，返回 Kind/Header/Body。

.. js:module:: src/runtime/protocol/msgpack

.. js:function:: encodeMessagePack(value)

   把受支持的 JavaScript 数据编码为 Uint8Array。

.. js:function:: decodeMessagePack(input)

   解码单个 MessagePack Value，并拒绝尾随数据。

.. js:module:: src/runtime/protocol/events

提供 EventName、真实事件名校验、订阅 Pattern 校验和 Pattern Match。

.. js:module:: src/runtime/protocol/subscriptions

提供 EventDirection、Direction 规范化和 Reply/Direction 投递策略。

完整函数见 :doc:`../api/javascript/runtime/protocol/frame`、
:doc:`../api/javascript/runtime/protocol/msgpack`、
:doc:`../api/javascript/runtime/protocol/events` 和
:doc:`../api/javascript/runtime/protocol/subscriptions`。
