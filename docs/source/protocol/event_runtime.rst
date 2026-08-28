事件运行时
================================================================================

发送
--------------------------------------------------------------------------------

``emitEvent`` 接收 camelCase JavaScript 参数，并生成 snake_case Wire Envelope。常用参数：

* ``event``
* ``payload``
* ``conversationId``
* ``documentId``
* ``turnId``
* ``runId``
* ``streamId``
* ``localOnly``
* ``timeoutMs``

事件方向
--------------------------------------------------------------------------------

Event Store 区分三种方向：

``local``
   只在当前浏览器运行时中传播，不进入 WebSocket。

``outgoing``
   当前浏览器创建并准备发往服务器的事件。

``incoming``
   WebSocket Transport 已解码并交给前端运行时的服务器事件。EVENT Frame 与 MEDIA Frame 都属于
   ``incoming``；媒体帧不能因为在浏览器内转换成统一事件 Payload 而降级成 ``local``。

.. important::

   方向是前端运行时元数据，不写入 Wire Envelope。服务器不能伪造一个事件为
   ``local`` 或 ``outgoing``。

订阅
--------------------------------------------------------------------------------

``onEvent`` 支持单事件、事件数组和后缀 ``.*`` 通配，并可限制事件方向：

.. code-block:: javascript

   onEvent({
       event: ['turn.completed', 'turn.failed'],
       conversationId,
       direction: 'incoming',
   }).then(({event, payload, eventTurnId, eventRunId}) => {
       // ...
   });

命名空间通配符只允许出现在订阅侧：

.. code-block:: javascript

   onEvent({event: 'notification.*'}).then(({event, payload}) => {
       // 接收 notification.upsert / notification.resolve / ...
   });

.. warning::

   ``notification.*`` 不是一个可发送的 Event Name。发送端必须使用具体事件名。

局部事件
--------------------------------------------------------------------------------

输入框取值、编辑状态和 UI 内部选择可以使用 ``localOnly: true``。它们仍遵守相同事件模型，
但不会进入 WebSocket。

去重
--------------------------------------------------------------------------------

Event Store 保存最近 500 个 ``event_id``，防止同一 Event 因重连或多路径重复处理。

.. note::

   去重窗口不是持久幂等机制。涉及付款、邮件、文件写入等操作时，服务端 Tool 仍应使用
   Tool Call ID 或业务幂等 Key。

回复
--------------------------------------------------------------------------------

回复等待默认 10 秒。回复先于 Waiter 注册时会进入短期 Backlog，避免快速本地回复竞态。

带 ``reply_to`` 的 Envelope 在完成 Waiter 后默认停止，不再作为普通 Domain Event 广播。
这一规则可以防止通配符监听器把 ``speech.play.requested.result`` 再回复为
``speech.play.requested.result.result``。

.. tip::

   业务代码通常不需要订阅 ``*.result``。使用 ``await emitEvent(...)`` 或 Thenable 的
   ``.then(...)`` 读取回复即可。


入站并行调度
--------------------------------------------------------------------------------

物理 WebSocket 是有序字节流，但前端业务监听器不应因为模型持续产生 Delta 而被全局串行阻塞。
``EventDispatchScheduler`` 将 ``incoming`` Event 分为四条逻辑 Lane：

``control``
   Reply、Transport、Turn 生命周期与 Composer 状态。

``interaction``
   Tool Approval、Widget、设置和其他交互事件。

``stream``
   ``message.*`` 与 ``speech.*`` 等连续输出。

``background``
   Notification 等后台事件。

每条 Lane 内保持 FIFO，Lane 之间使用公平调度；一次浏览器任务只处理有限数量/时间的 Event，随后主动
把执行权交还给浏览器。因此长文本流不会丢弃，也不会把 Tool/设置交互饿死。

.. important::

   “并行”指逻辑业务可并发推进，不意味着允许对同一状态无序写入。属于同一消息生命周期的
   ``message.created``、``message.content.delta``、``message.content.set`` 必须处于同一 Stream Lane。

.. note::

   JavaScript 主线程仍然只有一个执行线程。调度器通过任务时间片和异步 Listener 实现协作式并发；如果以后
   MessagePack 解码或 Markdown 解析成为 CPU 瓶颈，再单独迁移到 Web Worker，而不是丢弃入站事件。
