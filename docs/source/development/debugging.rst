调试
====

协议日志
--------

开发模式下 Event Store 会输出：

* Event Name。
* ``event_id``。
* Conversation / Turn / Run。
* ``reply_to``。
* Payload。

浏览器 Network 面板会将 WebSocket Frame 显示为 Binary。需要查看 Header 时，应通过
``decodeFrame``，而不是假设内容是 UTF-8 JSON。

常见问题
--------

服务端立即以 1003 关闭
   客户端发送了文本 Frame。确认所有发送路径都经过 ``WebSocketTransport``。

``PROTOCOL_ERROR``
   检查 Event Name、UUID、Version、长度或 Media ``stream_id``。

页面不处理全局 Story 事件
   带 Conversation Scope 的监听器需要 ``includeGlobal: true``。

等待回复超时
   检查消费者是否调用 ``reply``，以及回复事件是否继承原 ``event_id`` 到 ``reply_to``。

登录后立即返回登录页
   CWM 登录会话由浏览器 JWT Cookie 和 Redis Session 共同校验。若开发时清空了 Redis，
   浏览器中的旧 Cookie 会失效，这是预期行为；重新登录即可建立新的 Session。前端会对并发
   ``401`` 合并为一次登录跳转，不应显示普通的“页面加载失败”错误。

``Invalid semantic event name: xxx.*``
   ``.*`` 只属于订阅表达式。监听命名空间请使用 ``onEvent({event: 'xxx.*'})``；
   ``emitEvent`` 必须发送具体事件。Protocol v1 的订阅校验器会单独接受这种通配符。

音频无声
   检查 ``payload.body``、codec、sampleRate 和 channels；不要只检查旧 ``payload.audio``。

.. tip::

   先在 Transport 层确认 Frame 已收到，再在 Event Store 确认作用域匹配，最后检查 Surface
   状态更新。分层排查比在 ChatPage 中打印所有变量更有效。

点击朗读后页面卡住
   检查是否存在使用 ``speech.*`` 的业务监听器，同时接收 ``local``、``outgoing`` 和
   ``incoming`` 三个方向。前端发出的 ``speech.play.requested`` 也会先在本地 Event Store
   中分发；若通配符消费者对未知事件无条件调用 ``reply()``，回复事件仍会匹配同一通配符，
   进而形成持续的微任务回复链。

   只处理服务端语音结果的监听器应设置：

   .. code-block:: javascript

      onEvent({
          event: 'speech.*',
          conversationId,
          direction: 'incoming',
      })

   Protocol v1 同时默认把带 ``reply_to`` 的 Envelope 从普通业务监听器中隔离。不要通过
   ``includeReplies: true`` 绕过该防护，除非实现的是只读协议调试器。

编辑并重新生成后，消息概览显示 ``[空消息]``
   Assistant 生成开始时，活动消息链中可能已经存在空的持久化占位。若概览只按新
   ``messageId`` 追加，该占位即使在生成结束后已有正文，也不会被同 ID 的新摘要覆盖。

   当前实现通过两层机制保持概览一致：

   * 增量读取会重叠读取活动分支尾部，并从最小 ``orderIndex`` 开始替换旧尾部；
   * 收到 ``turn.completed``、``turn.cancelled`` 或 ``turn.failed`` 后静默刷新概览。

   若问题仍存在，依次检查后端终态 Turn 是否在消息持久化之后发送、摘要接口返回的
   ``orderIndex`` 是否连续，以及前端是否使用 ``mergeMessageSummaryItems`` 合并结果。


聊天页一直显示“正在加载”
   Chat 初始化按 ``models → conversation → messages`` 三个阶段执行。界面现在会显示当前阶段，并且这些
   Bootstrap 请求各自设置 30 秒超时，因此数据库或后端依赖异常不会再无限保持 Loading。

   排查时先观察 Loading 文案：

   * “正在加载模型”通常检查模型配置与 ``/chat/models``；
   * “正在加载会话”检查 Conversation 查询、数据库连接与上下文元数据；
   * “正在加载对话”检查 Message 查询、消息分表与活动分支。

   .. note::

      30 秒超时只用于 Chat Bootstrap，不是 ``apiClient`` 全局超时，不会截断上传、Worker 或其他长任务。

主 WebSocket 已连接，但 Realtime Voice 提示缺少控制连接 ID
   检查 ``WebSocketContext`` 是否复用了已有 ``globalTransport``。Transport 会缓存服务端
   ``transport.connected`` 返回的 ``connectionId``，Provider 重挂载时应调用 ``setHandlers`` 接管现有 Socket，
   并从 ``transport.connectionId`` 恢复 Context State。若只恢复 ``isConnected`` 而没有恢复连接 ID，
   Voice Session 无法安全固定 Tool/Widget 的主控制通道。

.. important::

   页面卡死与概览空消息都属于事件生命周期问题，而不是简单的组件渲染问题。排查时应先确认
   Event Direction、``reply_to`` 和 Turn 终态，再检查 React State。


实时语音永久停在“正在连接”
   Network 中分别确认 ``/ws/realtime`` Open 和 ``voice.session.start`` Reply。前端有 8 秒 Connect、
   20 秒 Start 截止时间；超时后应进入 Error Surface。后端 Provider ASR 握手已后台化，握手失败应
   通过 ``voice.protocol.changed`` 降级，而不是阻塞 Session Start。协议调试开启时，检查 ASR 的
   ``connectionState`` 是否从 ``initializing`` 进入 ``ready`` 或 ``fallback``。

结束实时语音后发送按钮仍在 Loading
   检查 Stop Reply 的 ``composerStatus``，以及是否收到 ``composer.status.changed``。如果没有提交
   Voice Turn，前端会恢复 ``normal``；如果已经提交，等待 ``turn.completed/failed``。后端 Worker
   启动超过 20 秒会自动发送 ``turn.failed``，因此永久 Loading 通常意味着前后端版本未同时覆盖，
   或主 Control WebSocket 没有收到状态事件。
