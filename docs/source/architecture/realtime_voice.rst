Realtime Voice Surface
================================================================================

Realtime Voice 是 Chat 的另一种 Surface，不是独立聊天产品。它共享同一个 Conversation、Message、
Turn 与 Runtime Inspector。

界面策略
--------------------------------------------------------------------------------

桌面端将 Voice Surface 作为 Chat 根布局中的右侧 Dock 直接嵌入，而不是再覆盖一层居中的 Modal。
Chat 历史继续留在左侧，Voice Dock 使用固定的窄侧栏语义呈现当前通话状态、波形、最近一句和通话控制，
交互形态接近视频通话侧窗。启动 Voice 时会先关闭现有 Conversation Settings 右栏，避免同时挤压两块右侧面板。

移动端仍使用 ``100dvh`` 沉浸式全屏，并在右上角保留缩小按钮；缩小后只显示浮动恢复入口。桌面端同样
允许缩小/恢复，但非缩小时始终参与 Flex 布局并占用真实宽度，因此不会遮住 Chat 内容。Realtime Session
和麦克风在最小化期间继续运行。

Voice Surface 只突出四类信息：当前状态、实时转写/最近一句、当前语音波形/交互以及结束/返回控制。
Conversation 历史、Widget 与 Tool 结果仍由 Chat Surface 承担。``最近一句`` 只显示用户输入：讲话期间直接复用
现有 ASR Partial Transcript，Final 后保留最后一条用户转写。Assistant Streaming TTS 不写入该区域，AI 是否正在
讲话继续由 Surface 主状态和波形表达。这样 Voice Dock 不会同时重复 Chat 中已经可见的 Assistant 正文。

协议指示器
--------------------------------------------------------------------------------

只有后端 Debug Setting ``语音对话显示协议`` 开启时才渲染 ``ProtocolIndicator``。前端不根据 Provider
名字推断能力，而是直接显示后端 Profile：

* ``HYBRID REALTIME / COMPATIBILITY / DEGRADED``；
* Conversation Model 与 API 类型；
* ASR streaming/batch、endpoint；
* TTS browser/server streaming-segments；
* Barge-in Cursor Accuracy；
* Fallback reason。

媒体链路
--------------------------------------------------------------------------------

``RealtimeVoiceTransport`` 使用独立 ``/ws/realtime`` Binary WebSocket。``createRealtimePcm16kStreamer``
持续输出 PCM16 16 kHz mono Chunk，不累计整个会话的音频。

Realtime streamer 不再用 RMS/连续帧阈值自己实现语音活动判断。它复用已经打开的同一个
``MediaStream``，把 ``@ricky0123/vad-web`` 的 Silero V5 作为本地 Speech Detector；VAD 不再申请第二路
麦克风，也不拥有 Track 生命周期。RMS 只保留给波形显示。

Silero 只产生 ``barge probe``：AI 正在播放/思考时冻结当前 Playback Cursor，并把一次性的 probe metadata
附在现有 ``voice.input.audio`` Media Frame（batch/client-VAD 还会在原 ``voice.input.commit`` 上兜底携带）。
**Probe 本身不会暂停 TTS，也不会发送 ``voice.barge_in.candidate``。** 后端只有在既有 ASR Partial/Final
已经产生可用文本，并满足 Provider 提供的 stability/confidence 条件时，才把 probe 提升成原有 Candidate，
随后走 Confirmed/Rejected。整个判断不包含中文字符数、语气词白名单或语言专用词表。

默认使用 Silero V5，当前调优值为 ``positiveSpeechThreshold=0.65``、``negativeSpeechThreshold=0.42``、
``minSpeechMs=180``、``redemptionMs=420``、``preSpeechPadMs=120``。这些值只属于 acoustic detection，
业务代码不要重新叠加一套 RMS VAD。

.. important::

   本地 VAD 不是 Durable Turn Truth。真正的 User Message 只有收到 Backend/Provider Final Transcript 后
   才创建；真正的 Barge-in 也必须先有 ASR 证据。

Assistant Message 前置契约
--------------------------------------------------------------------------------

Realtime Voice 不为 TTS 单独维护一份“可朗读配置”。标准 ``turn.start`` 在 Worker 开始生成之前就创建
Assistant Placeholder，并由同一条 Message 一次性携带当前能够确定的完整前置契约：角色、树位置、
显示名称/头像、附件初值、``readonly``、``allowRegenerate``，以及 ``allowFork`` / ``allowSpeak`` /
``allowProgenerate`` 等能力。能力字段继续持久化在已有 ``extra_info`` 中并映射成前端 Message 属性，
因此没有新增 Message Type、数据库表或专用 Voice Setting。

``turn.started`` 只在该 Placeholder 已经持久化之后发出。控制 lane 可能比 ``message.created`` stream lane
更早到前端，所以 Voice Runtime 可以先 arm 一个逻辑 Streaming Speech Session；真正开始朗读前仍必须等
同一个 Message Snapshot 到达并明确 ``allowSpeak === true``。``allowSpeak === false`` 从第一段开始就阻止
TTS，而不是等整条消息生成完成后再撤销。最终 Worker Patch 只补充正文、Replace、Tip、Audit 等必须到
生成阶段才能得到的终态信息，不能用缺省能力值覆盖 Placeholder 已经确定的契约。

流式 TTS
--------------------------------------------------------------------------------

Streaming TTS 是现有 ``useChatSpeech`` 的增量能力，不是第二套播放器。Realtime Voice 复用现有
``turn.started``、Message stream、speech segment、Browser SpeechSynthesis、Backend ``speech.synthesize``、
requestId/cache/cancel 与 Barge-in 机制：

#. ``turn.started`` 提前 arm 当前 Assistant Message；
#. ChatPage 原有 Message State 每次吸收 ``message.*`` 增量后调用同一个 Speech Runtime 同步；
#. 只有已经形成稳定句号/问号/感叹号/分号或换行边界的 segment 才 append 到现有播放 Controller；
#. 尚未闭合的尾句不会提前朗读，未闭合 fenced code block 也不会进入 TTS；
#. ``turn.completed`` 只提出 finalize 请求，不能直接朗读本地尾巴。由于 control lane 可能超越 stream lane，
   必须等该消息现有 ``readonly=false`` 终态 Patch 到达，确认本地 Message stream 已追平后再 flush 最后尾句。

Browser TTS 在读完当前已生成 segment 后保留同一个 Controller 等待后续 append；Backend TTS 也继续
使用原有分段合成与缓存。如果一批 ``speech.synthesize`` 仍在生成，新 segment 只进入已有 session，等
``speech.ended`` 后再请求缺失尾段，不取消正在生成的前一批音频。用户修改语速或 Browser Voice 时只
重启底层 request，并保留未结束的 Streaming Speech Session，后续 segment 仍继续 append。

Barge-in
--------------------------------------------------------------------------------

Silero ``onSpeechRealStart`` 只冻结 segment 级 Playback Cursor 并建立本地 probe，不触碰播放器。这样
键盘、风扇、扬声器残余回声即使偶尔被 acoustic detector 命中，也不会让 Browser TTS 重读当前句。

Streaming ASR 的 Partial/Final 一旦提供可用文本，后端才复用现有 ``voice.barge_in.candidate`` 把 probe
提升为正式 Candidate。Candidate 到达前端后才暂停当前输出；后端紧接着按现有协议 Confirmed，普通 Agent Run
被取消、当前 Streaming Speech Session 永久结束并持久化 Playback Cursor。Batch/client-VAD 没有 Partial 时，
Speech End 仍复用 ``voice.input.commit``，Final/Empty 决定 Confirmed/Rejected。没有新增控制事件。

Provider-controlled endpoint 的 Rejected 兜底仍只能从 Speech End 后计时；batch/client-VAD/manual 等待明确
Final/Empty，不使用固定 Speech Start 超时。前端仅在真正收到 Candidate 后才可能恢复被暂停的 TTS，纯 probe
被 Rejected 时不会调用 resume，因此不会因一次 acoustic false positive 重读整句。

Playback Cursor 的 ``segmentPosition`` 使用零基位置，表示“第一个不能保证已经完整听到的 segment”。为了保持实时通道
轻量，前端只额外带上该边界 segment 的短文本和总 segment 数，不回传整段已朗读前缀。Confirmed 后后端
把边界写入原 Assistant Message 的 ``extra_info.voice_delivery``，并复用 ``message.created`` 全量消息快照
刷新 Chat。完整 Assistant 生成结果不会被截断或覆盖。``SpeechOverlayHighlighter`` 复用同一 segment 定位
逻辑，在消息正文对应位置持续显示“语音在此被打断”，因此刷新页面后仍能看到同一个交付边界。这个标记是
render-time overlay insertion，不是自定义 Card ``replace``，也不会改写 Message Content。Marker 会在相邻正文之间预留
明确的视觉间隔，避免 Badge 覆盖第一句未交付文本。

V1 Cursor 只有 segment 精度，因此 UI 和 Debug 面板必须标记 ``segment``，不能显示为精确字符位置。
生成过程中打断时 ``segmentPosition`` 允许等于当时已知的稳定 segment 数；这只表示 TTS 已追平当前
已生成前缀，不代表整条 Assistant Message 已交付。Cursor 因此同时携带 ``messageFinalized`` / ``streaming``，
后端只有在 Message 已终态时才可以把“游标等于总 segment 数”解释成完整交付。下一轮模型上下文仍保留
完整 Assistant 历史，但会附加持久化的 Voice Delivery Marker，明确说明边界之后的内容没有被交付给用户。


麦克风静音
--------------------------------------------------------------------------------

``麦克风静音`` 是硬输入边界，不只是“不发送 PCM”。``createRealtimePcm16kStreamer`` 复用当前 MediaStream，
通过 ``MediaStreamTrack.enabled=false`` 停止输入，并同步禁止 PCM、Local VAD 和 Waveform callback。这样静音后
Surface 不能再进入 ``user_speaking``，也不能产生新的 Barge-in Candidate。

若用户在一句话中途静音，前端复用现有 ``voice.input.commit`` 并携带 ``discard=true``。后端清空 batch buffer，
Streaming ASR 则关闭当前 provider input session 并走原 ``start()`` 初始化路径建立一个干净 session；不会新增
``voice.input.mute`` 协议事件。恢复麦克风后继续使用同一个 streamer/session，新的 PCM 在 ASR 重连期间按原机制缓冲。

Silero 资源加载
--------------------------------------------------------------------------------

前端依赖 ``@ricky0123/vad-web==0.0.30`` 与 ``onnxruntime-web==1.22.0``。默认从固定版本 jsDelivr 路径加载
``silero_vad_v5.onnx``、VAD Worklet 和 ORT WASM/MJS；CDN 只提供模型/运行时静态资源，麦克风音频仍沿现有
Realtime Media Channel 发送，不会上传到 CDN。需要 CSP/内网部署时可设置：

* ``VITE_SILERO_VAD_ASSET_BASE``：包含 VAD Worklet 与 ``silero_vad_v5.onnx`` 的目录；
* ``VITE_ONNXRUNTIME_WASM_BASE``：包含 ORT ``*.wasm`` / ``*.mjs`` 的目录。

这两个目录可以直接由应用静态资源服务器托管，不需要改 Voice Runtime 逻辑。

降级
--------------------------------------------------------------------------------

前端 Surface 不因为协议降级换页面。Streaming Semantic ASR 可以显示 Partial Transcript；Batch ASR
则在讲话结束后显示“正在理解”，等待 Final。Browser TTS 和 Backend TTS 使用同一个 Voice Surface。

.. warning::

   不要在 Voice Component 里写 ``if provider === 'dashscope'``。Provider 差异应由 Backend Capability
   Negotiation 消化，前端只读取 Profile。

主控制连接
--------------------------------------------------------------------------------

``WebSocketContext`` 保存服务器通过 ``transport.connected`` 返回的 ``connectionId``，并同步缓存到
``WebSocketTransport.connectionId``。开发模式 StrictMode、HMR 或 Provider 重挂载复用已打开的全局 Socket 时，
Context 会先通过 ``setHandlers`` 接管旧 Transport，再恢复缓存的 ``connectionId``；不能只恢复
``isConnected``。Voice Start 把该 ID 作为 ``controlConnectionId`` 发送给后端，使 Worker 中需要指定浏览器
回复的 Tool/Widget Interaction 继续走主 ``/ws``。如果主连接真正重连并产生新的 ID，前端结束当前
Voice Session 并要求重新协商。

运行时 Profile 更新
--------------------------------------------------------------------------------

Voice Surface 同时处理 ``voice.session.started`` 与 ``voice.protocol.changed``。因此 Streaming ASR 在运行中
失败并降到 Batch/Client VAD 后，协议指示器会立刻切换为 ``DEGRADED`` 并显示 fallback reason；组件不包含
Provider-specific 分支。


启动阶段与超时
--------------------------------------------------------------------------------

Voice Surface 将启动过程拆成 ``requesting_microphone``、``authorizing``、``connecting``、``negotiating`` 和
``listening``。首次点击时先立即取得物理麦克风，并等待 Web Audio 的首个真实处理帧与 live Track；验证成功后
暂时硬静音同一 Track，再请求 Media Ticket / 建立 WebSocket / 协商 Session，最后从一个干净的 Silero 边界恢复采集。
这样不会出现媒体 Socket 已连接、但首次麦克风实际上没有产出数据的半初始化状态。Realtime WebSocket 默认 8 秒
连接截止时间，``voice.session.start`` 默认 20 秒 Reply 截止时间；任一阶段 Track ``ended`` 都会终止当前 Voice Runtime。

手动结束会立即关闭 Surface、停止麦克风和当前朗读；网络清理在后续完成。异步 Start 的晚到 Reply
和麦克风授权结果会被 Lifecycle Token 丢弃，不能重新打开用户已经结束的 Session。

无 Conversation ID 的 Chat 需要先通过主控制通道创建 Conversation，再启动 Voice Runtime。这个
``null -> conversationId`` 是同一次 Voice Start 的资源绑定，不是会话导航，不能触发 Voice Hook 的 teardown。
因此 Hook 的组件卸载清理必须是 unmount-only，不能把 ``stop`` callback identity（它会随 conversation props
更新）直接作为 cleanup effect 依赖。真正从已有 Conversation A 导航到 B 或 ``null`` 时，由 ChatPage 明确结束
A 的 Voice Session。

Voice-only 的 ``conversation.create`` 使用每次启动动作独立的 idempotency key，不能复用普通
``turn.start`` 的 ``currentTurnIdempotencyKey``；语音创建会话不经过普通 Turn 成功后的 key 轮换，否则挂断后
再“新建对话 -> 开始语音”会把新建请求误判为上一动作的重复请求。Conversationless Voice Start 同时使用
single-flight guard，避免 Conversation ID 尚未返回时快速连点创建两个资源。

Composer 状态恢复
--------------------------------------------------------------------------------

Realtime Voice 入口只在 ``sendButtonStatus === 'normal'`` 时可用，并把该状态随 Start Config 传入
Runtime。Session 启动后 Voice Surface 以 ``disabled`` 暂时占用文本 Composer，防止文本发送与 ASR
Commit 并发创建两个 Turn；每个 Voice Turn 终态后，如果 Session 仍打开，会重新取得该输入所有权。
Stop Reply 的 ``composerStatus`` 是后端权威值，前端通过本地 ``composer.status.changed`` 事件恢复
ChatBox。

若启动尚未产生任何 Voice Turn 就失败或被取消，前端可以安全恢复 ``normal``。一旦已经提交 Turn，
前端不能自行假设生成结束，必须等待后端 Reply、Run Event 或 ``turn.failed/completed``。

媒体通道授权
--------------------------------------------------------------------------------

Realtime Voice 使用两条物理 WebSocket，但只让主 ``/ws`` 承担完整用户登录鉴权。启动 Voice Session 时，
前端先通过主 Event Runtime 请求 ``voice.media_ticket.request``；取得短期一次性 Ticket 后，才创建
``/ws/realtime?ticket=...`` 媒体连接。

启动状态因此按顺序显示 ``requesting_microphone``（验证物理输入）、``authorizing``（正在授权媒体通道）、
``connecting``（正在连接实时语音）和 ``negotiating``（正在协商语音协议）。如果 Ticket 请求失败，应优先检查主
WebSocket/登录 Session；如果 Ticket 已签发而媒体握手失败，则检查 Realtime Gateway、反向代理和 Ticket
消费日志。

.. warning::

   不要把 JWT Cookie、Access Token 或长期凭据复制到 JavaScript 可读状态中。Media Ticket 是短期且一次性的，
   只通过主控制连接取得，并且必须使用 ``encodeURIComponent`` 后放入媒体 WebSocket URL。

媒体通道授权就绪
--------------------------------------------------------------------------------

浏览器触发原生 WebSocket ``open`` 只表示传输层握手完成，并不表示 CWM 已经完成
Media Ticket 授权。:class:`RealtimeVoiceTransport` 会继续等待后端
``transport.connected`` 且 ``channel=realtime_voice``，之后才将 ``connect()`` 视为成功。

如果 Ticket 无效或 Redis 消费失败，后端会在已建立的 WebSocket 上返回协议错误并以
``4401`` 关闭。前端会保留 ``CloseEvent.reason``，因此 Voice Surface 可以显示具体错误，
而不是统一显示“连接超时”。

Composer 主操作与后端能力
--------------------------------------------------------------------------------

Realtime Voice 的入口不再与发送按钮并列。ChatBox 右下角只有一个主操作槽位：普通模式下如果 Composer
没有文本、附件或上传任务，并且不处于 Edit/Fork、活跃 Execution、语音输入、只读、Loading/Generating 等状态，
前端才允许用 ``RealtimeVoiceButton`` 替换原本禁用的 ``SendButton``。一旦出现可发送内容或更高优先级的
Composer 状态，主操作立即恢复为原 ``SendButton`` 状态机。

是否展示 Voice 主操作不能由前端根据 URL、Provider 名字或路由探测猜测。``GET /chat/chatbox`` 返回：

.. code-block:: json

   {
     "capabilities": {
       "realtimeVoice": {
         "available": true,
         "reason": null,
         "protocol": "cwm-realtime-v1"
       }
     }
   }

旧后端没有 ``capabilities.realtimeVoice`` 时按不可用处理。``available`` 仅用于 UI capability discovery；
真正开始通话时 Media Ticket、``/ws/realtime`` 和 Profile negotiation 仍由后端重新校验，不能把前端 capability
视作授权结果。

主操作判定集中在 ``ComposerPrimaryAction``，不要重新在 ``ChatBox`` 中增加独立的 Voice/Send 并列按钮。
