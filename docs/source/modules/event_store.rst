事件 Store API
================================================================================

.. js:module:: context/useEventStore
   :no-index:

.. js:function:: emitEvent(options)
   :no-index:

   创建、分发并按需发送语义 Event。返回包含 ``eventId``、``envelope`` 的 Thenable。

   ``options`` 常用字段：

   * ``event``
   * ``payload``
   * ``conversationId``
   * ``documentId``
   * ``turnId``
   * ``runId``
   * ``streamId``
   * ``traceId``
   * ``localOnly``
   * ``timeoutMs``

.. js:function:: onEvent(options)
   :no-index:

   注册事件监听器，调用 ``.then(callback)`` 获得取消订阅函数。设置
   ``conversationId`` / ``documentId`` 后，默认只接收对应资源事件；只有确实需要接收
   用户级广播时才设置 ``includeGlobal: true``。

   .. code-block:: javascript

      const unsubscribe = onEvent({
          event: 'tool.*',
          conversationId,
          direction: 'incoming',
      }).then(({event, payload, reply, eventDirection}) => {
          // ...
      });

      return unsubscribe;

   ``direction`` 可以是 ``local``、``outgoing`` 或 ``incoming``；``directions`` 可接收
   这些值组成的数组。未设置时监听全部方向。

   Callback 同时提供 ``eventConversationId``、``eventDocumentId``、``eventTurnId``、
   ``eventRunId``、``eventStreamId``、``eventTraceId``、``eventReplyTo``、
   ``eventSequence`` 与 ``eventDirection``，用于无需解析原始 Envelope 的 Surface。

   .. important::

      只处理服务器结果的监听器必须设置 ``direction: 'incoming'``。例如 TTS 后端事件
      使用 ``speech.*`` 通配符时，不能同时消费前端发出的 ``speech.synthesize`` 或
      ``speech.play.requested``。

   .. note::

      带有 ``reply_to`` 的回复 Envelope 默认只用于完成对应 Thenable，不会再次进入普通
      Domain Listener。极少数协议调试器确实需要观察回复时，可设置
      ``includeReplies: true``。

   .. warning::

      ``includeReplies: true`` 不应出现在会调用 ``reply()`` 的通配符业务监听器中，否则
      可能重新构造无意义的回复链。

   .. important::

      ``emitEvent`` 只能发送具体语义事件名，例如 ``notification.upsert``。
      ``onEvent`` 的订阅表达式额外允许 ``notification.*`` 和全局 ``*``。
      订阅通配符不是 Wire Event，不能通过 ``emitEvent`` 发送。

.. js:function:: dispatchIncomingEvent(envelope)
   :no-index:

   将 Transport 已验证的入站 Event 送入 Store，并把事件方向标记为 ``incoming``。

.. js:data:: useEventStore

   Zustand Store，暴露最近 Event、方向和已处理 Event 数，主要用于调试器。

.. important::

   业务组件应使用 ``emitEvent`` / ``onEvent``，不要直接调用 Zustand ``setState`` 模拟
   Wire Event。


.. js:module:: runtime/transport/EventDispatchScheduler
   :no-index:

.. js:function:: scheduleIncomingEventCallback(options)
   :no-index:

   将一个已经验证的入站 Event Listener Job 放入 ``control / interaction / stream / background`` Lane。
   调用立即返回；调度器以公平时间片执行，不丢弃 Stream Job。

.. js:function:: getIncomingEventSchedulerStats()
   :no-index:

   返回各 Lane 当前积压数量。Debug 模式下也可以通过 ``window.getCwmEventSchedulerStats()`` 查看。
