Event Store 模块
================

.. js:module:: src/context/useEventStore

.. js:function:: emitEvent(options)

   创建 Envelope、进行 local/outgoing 分发、按需发送，并返回可等待 Reply 的 Thenable。

.. js:function:: onEvent(options)

   注册 Pattern/Scope/Direction Listener，``.then(callback)`` 返回 unsubscribe。

.. js:function:: dispatchIncomingEvent(envelope)

   把服务端 Event 以 incoming 方向送入回复关联、去重和监听器分发。

关键内部函数
------------

``createEnvelope``
   把 camelCase 调用参数转换为 snake_case Wire Envelope。

``dispatchEnvelope``
   处理 Reply、去重、Store 更新、Scope/Direction 筛选和异步回调。

``waitForReply``
   管理 Reply Waiter、Backlog 和 Timeout。

.. important::

   ``includeReplies`` 默认 false，``direction`` 默认全部。面向服务端结果的业务监听器应显式 incoming。

完整函数和局部回调见 :doc:`../api/javascript/context/useEventStore`。
