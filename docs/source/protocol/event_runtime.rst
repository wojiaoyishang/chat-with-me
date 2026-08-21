Event Runtime
=============

``emitEvent``
-------------

创建 snake_case Wire Envelope，同时先在本地以 local/outgoing 方向分发，再按 ``localOnly`` 决定是否
发送。返回 Thenable，可等待 ``reply_to`` 指向该 event_id 的回复。

``onEvent``
-----------

订阅一个或多个 Event Name/Pattern，可指定：

* ``conversationId``；
* ``documentId``；
* ``onlyWithoutConversation``；
* ``includeGlobal``；
* ``direction``/``directions``；
* ``includeReplies``；
* ``unique``。

通配符
------

``notification.*``、``speech.*`` 仅用于订阅，``normalizeEventPattern`` 允许尾部 ``*``。真正事件用
``normalizeEventName``，不允许 ``*``。

Scope
-----

带 Conversation 监听器默认不接收全局事件；确需用户全局事件时设置 ``includeGlobal``。Document
同理。

回复
----

Reply Waiter 先处理 ``reply_to``。普通监听器默认不接收回复；显式 ``includeReplies: true`` 只用于
协议工具。

去重
----

最近 event_id 保存在有界列表。重复入站事件不再分发，避免 Redis/重连重复投递。

.. warning::

   每次 ``waitForReply`` 调用都会创建 Waiter。不要对同一 emitEvent 返回值分别调用 ``then``、
   ``catch``、``finally`` 多次来构造多个等待；按一个 Promise 链使用。
