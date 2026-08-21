调试实时问题
============

Event 日志
----------

开发模式 Event Store 输出方向、event_id、Conversation、Turn、Run、reply_to 和 Payload。Network
面板中的 WebSocket 是 Binary，需要用 ``decodeFrame`` 查看，不要按 UTF-8 JSON 解码。

事件没触发
----------

检查顺序：

#. Event Name/Pattern；
#. direction；
#. conversationId/documentId；
#. includeGlobal；
#. reply_to 是否被隔离；
#. useEffect 是否已 cleanup；
#. event_id 是否被去重。

页面卡住
--------

优先检查：通配符监听器 reply 递归、无限 State Update、未清 Timer、每 token Markdown 全量渲染、
大量音频 bytes 放 React State。

消息概览空
----------

确认 Turn 已终态、摘要尾部重读、同 messageId 覆盖、orderIndex 排序和分支切换后的旧尾部删除。

WebSocket 不连
-------------

* 4401：认证；
* 1003：客户端/服务器仍有文本 Frame；
* Protocol Error：Frame/Envelope；
* 连接成功但无事件：检查后端 Redis EventBus 和 Scope。

.. tip::

   把 eventId、turnId、runId、traceId 一起复制到前后端日志，比截图 UI 更容易定位。
