事件流
================================================================================

发送 Turn
--------------------------------------------------------------------------------

.. code-block:: javascript

   emitEvent({
       event: EventName.TURN_START,
       conversationId,
       turnId: generateUUID(),
       payload: {
           content: value,
           model: modelId,
           idempotencyKey,
           options,
       },
   });

Event Runtime 创建 ``event_id`` 和 ``trace_id``，Transport 编码为二进制并发送。

接收增量
--------------------------------------------------------------------------------

.. code-block:: javascript

   const unsubscribe = onEvent({
       event: 'message.content.delta',
       conversationId,
   }).then(({payload, eventRunId}) => {
       // 更新当前 Assistant Message
   });

   return unsubscribe;

请求与回复
--------------------------------------------------------------------------------

``emitEvent`` 返回 Thenable：

.. code-block:: javascript

   const result = await emitEvent({
       event: 'composer.content.get',
       conversationId,
       localOnly: true,
   });

回复 Event 会继承原事件作用域，并将 ``reply_to`` 指向请求 ``event_id``。

全局事件
--------------------------------------------------------------------------------

绑定了 ``conversationId`` 的监听器默认不消费无 Conversation 的用户全局事件。需要接收
Story、通知等全局资源广播时，显式设置：

.. code-block:: javascript

   onEvent({
       event: 'story.*',
       conversationId,
       includeGlobal: true,
   });

.. warning::

   不要默认把全局事件广播进每个 Conversation Surface。显式 ``includeGlobal`` 可以避免
   多页面重复处理和权限状态污染。


并发事件流
--------------------------------------------------------------------------------

模型流式输出与用户交互共享同一控制 WebSocket，但不共享一个业务执行锁。Transport 解码后，Event Runtime
按语义 Lane 调度 Listener：模型 Delta 保持 FIFO 连续推进，Tool Approval、Widget、设置和 Reply 可以穿插执行。
前端不会为了响应交互而丢弃模型 Delta，也不会等待整段生成结束后才处理交互。
