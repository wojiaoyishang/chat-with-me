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

后端 ``streams_get`` 在恢复游标后仍按批读取，默认 128 条，不再每次只取一条。
聊天采集器通过 ``read_chat_stream_batch`` 使用 ``CHAT_STREAM_BATCH_SIZE`` （默认 256），
积压达到上限立即发送；小批量正文和思考 delta 使用 ``CHAT_STREAM_BUFFER_MS`` （默认 16ms）微缓冲，
随后一次非阻塞批读，按相邻同类合并。完整 set、附件、广播、完成标记和取消不跨越缓冲边界。
非阻塞读取省略 Redis BLOCK，不能使用代表无限阻塞的 BLOCK 0。Redis 持久记录与快照游标不合并改写。

``ChatPage`` 的单次订阅拥有 ``createMessageStreamBatch``，只暂存已经收到的正文／replacement
操作，正常约每 32ms 用一次 Immer 事务提交到原有 ``messagesRef`` 和 React 状态。
相邻同类 append 合并成文本批次，避免单纯因为积压 token 数达到 256 就反复提交；
64 Ki 字符或 256 条不能合并的操作会立即提交，防止缓冲无限增长。
按主线程计时器延迟及提交耗时自适应放宽展示间隔，最高 120ms，恢复轻负载后逐步回到 32ms。
操作依接收顺序应用，不按最后一条覆盖 append；它不维护另一份 Conversation 或 Run 权威。

Listener 调度前也会合并队列里相邻、同 conversation/document/turn/run/stream 的纯文字增量，
单个批次同样受字符和目标数量上限约束。该优化只减少回调，原始事件仍经过已有 ID 去重；
合并回调使用批次最后一个事件的信封元数据。RPC、完整 set、工具结束标记、语音和其他事件是合并边界，
不同后端 epoch 不可合并。监听器在实际交付时重新匹配，重挂载不会丢失待交付文本。

完整正文 set、工具结束标记、不同 Run、回复确认和所有非流式事件均先冲刷已有增量；订阅清理也取消
自身计时器并提交剩余内容。HTTP 历史／恢复／分支快照在读取当前状态前同样冲刷，避免快照已包含
待提交前缀时再追加一次。之后仍复用既有实时历史协调逻辑和后端连接作用域。
语音／审批生命周期和服务器持久化不变。

正文节点复用与新增文字
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Markdown 仍按完整当前文本处理引用定义、列表、代码及数学语义，不按换行冻结可能继续变化的语法。
最后一层 HAST 投影复用内容和属性未变化的节点，静态 renderer 不订阅整份 replacement。
每个工具卡片仅用自身及嵌套引用、分组和隐式结果的依赖切片判断更新；
一张卡片更新不能使其他图片、代码和卡片重渲染，迟到嵌套引用和真实 URL 改动仍正常显示。

仅对新收到的正文片段使用 180ms 透明度淡入。旧前缀及初次载入历史不播放动画；
最多保留 8 个淡入片段，动画结束合入普通文字，后台计时器负责兜底释放；
终态直接显示全部内容，不逐字模拟或等待动画完成。代码、数学和媒体元数据不进入淡入包装，
emoji/组合字符不被切开，减少动态效果偏好禁用动画。保留媒体、复制控件与已展开内容的身份。
