前端标识
========

``conversationId``
   URL、HTTP 和事件中的持久 Conversation UUID。

``documentId``
   Document 公共 UUID。

``messageId``
   消息节点 UUID。

``turnId``
   用户开始一轮交互时创建，并随 ``turn.start`` 发送。

``runId``
   后端通过 ``turn.started`` 返回；取消、批准和恢复以它为准。

``streamId``
   音频或其他媒体流。

``eventId``
   Event Runtime 创建的单事件 UUID。

``traceId``
   子事件和请求尽量继承同一 Trace。

``idempotencyKey``
   位于 Payload，用于重复提交保护；新动作创建新键。

.. warning::

   不要把数据库整数 PK 放进 URL 或 Event。前端只持有公共 UUID。
