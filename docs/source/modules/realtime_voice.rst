Realtime Voice 前端模块
================================================================================

.. js:module:: src/runtime/voice/RealtimeVoiceTransport
   :no-index:

``RealtimeVoiceTransport``
   包装通用 ``WebSocketTransport``，提供 Voice Session request/reply、Binary Event 与 Raw PCM Media
   发送。与主 ``/ws`` 连接物理隔离，但共享 Protocol v1 Frame Format。

.. js:module:: src/features/chat/voice/useRealtimeVoiceConversation
   :no-index:

``useRealtimeVoiceConversation``
   协调 Session Start/Stop、麦克风 Stream、Partial/Final Transcript、普通 ``turn.completed``、自动朗读
   与 Barge-in。它不执行 ASR/LLM/Tool 业务逻辑。

.. js:module:: src/features/chat/voice/RealtimeVoiceSurface
   :no-index:

``RealtimeVoiceSurface``
   响应式 Voice Surface。移动端全屏、桌面端 Focus Workspace，并允许最小化返回 Chat。

``ProtocolIndicator``
   只在 ``profile.debug.showProtocol`` 为 true 时显示后端协商结果与 fallback。

.. js:module:: src/features/chat/ui/chatbox/utils/voiceRecorder
   :no-index:

``createRealtimePcm16kStreamer``
   从麦克风持续生成 16 kHz PCM16 Chunk，不保存完整通话音频；同一 MediaStream 交给 Silero V5 做
   acoustic speech detection，RMS 仅用于波形。Silero 只产生 barge probe，Candidate 仍由 ASR 证据提升。


``RealtimeVoiceTransport.connect``
   使用有界 WebSocket Connect Promise；超时会拒绝所有等待中的请求并关闭物理连接。

``RealtimeVoiceTransport.request``
   在发送 Frame 之前注册 ``event_id`` Waiter，避免极快 Reply 先于 Promise 建立。Stop 与 Start 都有
   独立截止时间。

``useRealtimeVoiceConversation.stop``
   先失效 Lifecycle、关闭 Surface 和媒体，再请求后端 Stop。收到 ``composerStatus`` 后通过本地语义
   事件同步 ChatBox；启动阶段失败且未提交 Turn 时回退为 ``normal``。

``useRealtimeVoiceConversation.start``
   使用 Lifecycle Token 约束麦克风验证、Media Ticket、Connect 与协议协商。首次启动先取得物理 Track 并等待
   Web Audio 首帧，再建立媒体通道；任何阶段 Track 结束、超时、失败或被用户手动结束时，晚到结果都会被丢弃。
