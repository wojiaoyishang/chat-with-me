语音运行时
================================================================================

当前组成
--------------------------------------------------------------------------------

``VoiceInputButton`` / Recorder
   采集麦克风、PCM 或浏览器 SpeechRecognition。Realtime streamer 自己维护硬 mute：静音时禁用 Audio Track，
   同时停止 PCM/VAD/Waveform callback；Barge-in 模式只降低 VAD 启动阈值，不改变普通 Listening 阈值。

``useChatSpeech``
   协调朗读请求、后端 TTS、字幕、片段、播放器状态和事件订阅。普通 Pause/Resume 保留原播放器状态；
   Realtime Voice 的 Barge-in Candidate 则复用同一 Controller 做硬静音；Rejected 只能发生在本地 Speech End
   之后，且本地 VAD 仍 active 时禁止恢复旧 TTS。Browser TTS 在真正误触发后才通过已有 ``playFrom()`` 恢复。

``backendAudio`` / ``SpeechPlayer``
   缓冲、解码和播放后端原始音频。

``SpeechOverlayHighlighter``
   按字幕时间或文本匹配高亮消息；同时读取 Assistant Message 已有 ``extraInfo.voice_delivery``，复用
   相同 segment 文本定位能力渲染持久化的“语音在此被打断”边界，不引入单独的 Voice Message 组件。

事件方向约束
--------------------------------------------------------------------------------

本地 ``speech.play.requested`` 由 UI 发出；Hook 向后端发送 ``speech.synthesize``；只有 incoming
``speech.*`` 结果更新播放状态。监听 ``speech.*`` 时必须指定 incoming，避免收到自己的本地请求。

回复隔离
--------------------------------------------------------------------------------

带 ``reply_to`` 的 Envelope 默认不进入普通监听器。只有协议调试器才设置 ``includeReplies``，
否则通配符监听器可能形成 ``speech.result.result`` 微任务死循环。

Realtime Voice V1
--------------------------------------------------------------------------------

Realtime Voice 已使用独立 ``/ws/realtime`` 媒体通道。输入、Agent 和输出状态按正交维度处理；
详细的 Surface、协议协商和 Barge-in 规则见 :doc:`realtime_voice`。

.. warning::

   音频块必须使用 Media Frame Raw Body。不要恢复 Base64 JSON，也不要让 Celery 成为实时输入的
   Hot Path。
