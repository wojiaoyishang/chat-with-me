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
   从麦克风持续生成 16 kHz PCM16 Chunk 和本地 RMS/VAD Candidate，不保存完整通话音频。


``RealtimeVoiceTransport.connect``
   使用有界 WebSocket Connect Promise；超时会拒绝所有等待中的请求并关闭物理连接。

``RealtimeVoiceTransport.request``
   在发送 Frame 之前注册 ``event_id`` Waiter，避免极快 Reply 先于 Promise 建立。Stop 与 Start 都有
   独立截止时间。

``useRealtimeVoiceConversation.stop``
   先失效 Lifecycle、关闭 Surface 和媒体，再请求后端 Stop。收到 ``composerStatus`` 后通过本地语义
   事件同步 ChatBox；启动阶段失败且未提交 Turn 时回退为 ``normal``。

``useRealtimeVoiceConversation.start``
   使用 Lifecycle Token 约束 Connect、协议协商和麦克风授权三个异步阶段。任何阶段超时、失败或被用户
   手动结束时，晚到结果都会被丢弃，媒体资源被关闭，并恢复尚未提交 Turn 的 Composer 状态。
