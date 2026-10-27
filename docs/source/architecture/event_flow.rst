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

聊天展示增量合并
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``ChatPage`` 的单次订阅拥有 ``createMessageStreamBatch``，只暂存已经收到的正文／replacement
操作，约每 32ms 用一次 Immer 事务提交到原有 ``messagesRef`` 和 React 状态。操作依接收顺序应用，
不按最后一条覆盖 append；待处理达到 256 条也立即提交。它不维护另一份 Conversation 或 Run 权威。

完整正文 set、工具结束标记、不同 Run、回复确认和所有非流式事件均先冲刷已有增量；订阅清理也取消
自身计时器并提交剩余内容。HTTP 历史／恢复／分支快照在读取当前状态前同样冲刷，避免快照已包含
待提交前缀时再追加一次。之后仍复用既有实时历史协调逻辑和后端连接作用域。
传输队列、语音／审批生命周期和服务器持久化不变。
