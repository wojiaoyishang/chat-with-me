Realtime Voice Surface
================================================================================

Realtime Voice 是 Chat 的另一种 Surface，不是独立聊天产品。它共享同一个 Conversation、Message、
Turn 与 Runtime Inspector。

界面策略
--------------------------------------------------------------------------------

桌面端使用大型 Focus Surface；移动端使用 ``100dvh`` 沉浸式全屏。用户可以最小化 Voice Surface
返回 Chat，Realtime Session 和麦克风继续运行。

Voice Surface 只突出四类信息：当前状态、实时转写、当前语音波形/交互以及结束/返回控制。Conversation
历史、Widget 与 Tool 结果仍由 Chat Surface 承担。

协议指示器
--------------------------------------------------------------------------------

只有后端 Debug Setting ``语音对话显示协议`` 开启时才渲染 ``ProtocolIndicator``。前端不根据 Provider
名字推断能力，而是直接显示后端 Profile：

* ``HYBRID REALTIME / COMPATIBILITY / DEGRADED``；
* Conversation Model 与 API 类型；
* ASR streaming/batch、endpoint；
* TTS browser/server after-turn；
* Barge-in Cursor Accuracy；
* Fallback reason。

媒体链路
--------------------------------------------------------------------------------

``RealtimeVoiceTransport`` 使用独立 ``/ws/realtime`` Binary WebSocket。``createRealtimePcm16kStreamer``
持续输出 PCM16 16 kHz mono Chunk，不累计整个会话的音频。

本地 VAD 只承担两项职责：

#. AI 正在播放/思考时快速产生 Barge-in Candidate 并立即静音当前输出；Barge-in 使用更低的启动阈值和
   单帧启动，普通 Listening 仍使用原来的保守阈值；
#. Backend 协商为 ``client_vad/manual/batch`` 时，在 Speech End 发送 ``voice.input.commit``。

.. important::

   本地 VAD 不是 Durable Turn Truth。真正的 User Message 只有收到 Backend/Provider Final Transcript 后
   才创建。

Barge-in
--------------------------------------------------------------------------------

Candidate 时前端立即冻结现有 ``useChatSpeech`` 播放并上报 segment 级 Playback Cursor。这里复用现有
Speech Runtime，不新增第二套播放器：Backend ``<audio>`` 使用原 pause；Browser ``SpeechSynthesis`` 因
``pause()`` 在不同浏览器上不保证立刻静音，所以 Candidate 会硬取消原生队列，但保留当前 Speech Session
和恢复位置。

前端在本地 Speech End 时复用同一个 ``voice.barge_in.candidate`` 事件发送 ``phase=speech_end``。后端的
Rejected 的时间判断绝不能从 Speech Start 固定计时：batch/client-VAD 直接等待 ``commit`` 的 Final/Empty
结果，不使用 wall-clock rejection；只有 provider-controlled streaming endpoint 需要兜底超时时，才从 Speech End
开始计时。否则用户说得稍长或 ASR 稍慢就会错误恢复 TTS。前端也禁止在本地 VAD 仍处于 Speech Active 时
执行 Rejected Resume。

后端 ASR 确认后返回 ``voice.barge_in.confirmed``，前端把该 Speech Session 永久取消；真正的误触发在
Speech End 后仍没有 ASR 证据才会 ``rejected``，此时 Backend TTS 继续原 Audio，Browser TTS 复用已有
``playFrom()`` 恢复逻辑。普通手动 Pause/Resume 仍保持原语义。

Playback Cursor 的 ``segmentPosition`` 使用零基位置，表示“第一个不能保证已经完整听到的 segment”。为了保持实时通道
轻量，前端只额外带上该边界 segment 的短文本和总 segment 数，不回传整段已朗读前缀。Confirmed 后后端
把边界写入原 Assistant Message 的 ``extra_info.voice_delivery``，并复用 ``message.created`` 全量消息快照
刷新 Chat。完整 Assistant 生成结果不会被截断或覆盖。``SpeechOverlayHighlighter`` 复用同一 segment 定位
逻辑，在消息正文对应位置持续显示“语音在此被打断”，因此刷新页面后仍能看到同一个交付边界。

V1 Cursor 只有 segment 精度，因此 UI 和 Debug 面板必须标记 ``segment``，不能显示为精确字符位置。
下一轮模型上下文也保留完整 Assistant 历史，但会附加持久化的 Voice Delivery Marker，明确说明边界之后
的内容没有被交付给用户，不能假设用户已经听到。


麦克风静音
--------------------------------------------------------------------------------

``麦克风静音`` 是硬输入边界，不只是“不发送 PCM”。``createRealtimePcm16kStreamer`` 复用当前 MediaStream，
通过 ``MediaStreamTrack.enabled=false`` 停止输入，并同步禁止 PCM、Local VAD 和 Waveform callback。这样静音后
Surface 不能再进入 ``user_speaking``，也不能产生新的 Barge-in Candidate。

若用户在一句话中途静音，前端复用现有 ``voice.input.commit`` 并携带 ``discard=true``。后端清空 batch buffer，
Streaming ASR 则关闭当前 provider input session 并走原 ``start()`` 初始化路径建立一个干净 session；不会新增
``voice.input.mute`` 协议事件。恢复麦克风后继续使用同一个 streamer/session，新的 PCM 在 ASR 重连期间按原机制缓冲。

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

Voice Surface 将启动过程拆成 ``connecting``、``negotiating``、``requesting_microphone`` 和
``listening``。Realtime WebSocket 默认 8 秒连接截止时间，``voice.session.start`` 默认 20 秒 Reply
截止时间。超时会进入可关闭的 Error Surface，不会永久停留在 Connecting。后端确认 Session 后，
ASR Provider 可以继续在后台建连；开启协议指示器时会看到 ``connectionState=initializing/ready/fallback``。

手动结束会立即关闭 Surface、停止麦克风和当前朗读；网络清理在后续完成。异步 Start 的晚到 Reply
和麦克风授权结果会被 Lifecycle Token 丢弃，不能重新打开用户已经结束的 Session。

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

启动状态因此按顺序显示 ``authorizing``（正在授权媒体通道）、``connecting``（正在连接实时语音）、
``negotiating``（正在协商语音协议）和 ``requesting_microphone``。如果 Ticket 请求失败，应优先检查主
WebSocket/登录 Session；如果 Ticket 已签发而媒体握手失败，则检查 Realtime Gateway、反向代理和 Ticket
消费日志。

.. warning::

   不要把 JWT Cookie、Access Token 或长期凭据复制到 JavaScript 可读状态中。Media Ticket 是短期且一次性的，
   只通过主控制连接取得，并且必须使用 ``encodeURIComponent`` 后放入媒体 WebSocket URL。

媒体通道授权就绪
----------------

浏览器触发原生 WebSocket ``open`` 只表示传输层握手完成，并不表示 CWM 已经完成
Media Ticket 授权。:class:`RealtimeVoiceTransport` 会继续等待后端
``transport.connected`` 且 ``channel=realtime_voice``，之后才将 ``connect()`` 视为成功。

如果 Ticket 无效或 Redis 消费失败，后端会在已建立的 WebSocket 上返回协议错误并以
``4401`` 关闭。前端会保留 ``CloseEvent.reason``，因此 Voice Surface 可以显示具体错误，
而不是统一显示“连接超时”。
