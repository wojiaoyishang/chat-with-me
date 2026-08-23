语音运行时
================================================================================

当前组成
--------------------------------------------------------------------------------

``VoiceInputButton`` / Recorder
   采集麦克风、PCM 或浏览器 SpeechRecognition。Realtime streamer 自己维护硬 mute：静音时禁用 Audio Track，
   同时停止 PCM/VAD/Waveform callback。Realtime 的 speech detector 复用同一 MediaStream 运行
   ``@ricky0123/vad-web`` Silero V5；RMS 只用于波形，不再参与 Barge-in 判定。

``useChatSpeech``
   协调朗读请求、后端 TTS、字幕、片段、播放器状态和事件订阅。Realtime Voice 的 Streaming TTS 也只在
   这一 Hook 上增加 append/finalize session：稳定文本 segment 继续喂给原 Browser/Backend Controller，
   不增加第二套播放器或 TTS Event。普通 Pause/Resume 保留原播放器状态。Silero Speech Start 只建立
   ``barge probe``，不触碰播放器；只有后端收到可用 ASR Partial/Final、把 probe 提升为现有 Candidate 后，
   Controller 才执行硬静音。Confirmed 永久取消，Rejected 只恢复真正发生过 Candidate Pause 的 Speech。

``backendAudio`` / ``SpeechPlayer``
   缓冲、解码和播放后端原始音频。

``SpeechOverlayHighlighter``
   按字幕时间或文本匹配高亮消息；同时读取 Assistant Message 已有 ``extraInfo.voice_delivery``，复用
   相同 segment 文本定位能力渲染持久化的“语音在此被打断”边界，不引入单独的 Voice Message 组件。
   中断边界是绝对定位的 render-time overlay，不使用 Card ``replace``，正文与持久化 Content 保持完整；
   overlay 与相邻文本之间保留视觉 gap，避免覆盖第一句未交付内容。

``RealtimeVoiceSurface``
   只维护 Voice 的展示层。桌面端作为 Chat Flex 根布局的右侧 Dock 参与真实布局；移动端使用 ``100dvh``
   全屏并可从右上角缩小为浮动恢复入口。最近一句只消费现有用户 ASR Partial/Final；Assistant TTS 内容
   不写进该区域，因此不会为了展示再创建 Transcript Store 或 Message polling。

事件方向约束
--------------------------------------------------------------------------------

本地 ``speech.play.requested`` 由 UI 发出；Hook 向后端发送 ``speech.synthesize``；只有 incoming
``speech.*`` 结果更新播放状态。监听 ``speech.*`` 时必须指定 incoming，避免收到自己的本地请求。

回复隔离
--------------------------------------------------------------------------------

带 ``reply_to`` 的 Envelope 默认不进入普通监听器。只有协议调试器才设置 ``includeReplies``，
否则通配符监听器可能形成 ``speech.result.result`` 微任务死循环。

Message Contract 与 Streaming Speech
--------------------------------------------------------------------------------

Assistant 的朗读资格来自标准 Message Contract，而不是 Voice Runtime 自己推断。Backend 在生成前创建的
Placeholder 已确定所有当前可确定属性；前端只有在收到 ``allowSpeak === true`` 后才把稳定 segment 交给
``useChatSpeech``。这同时保证 ``allowSpeak=false``、Fork/Regenerate/Progenerate 能力与普通 Chat 使用同一份
Message Truth。

Streaming Speech 通过 ``beginStreamingSpeech -> syncStreamingSpeech -> finalizeStreaming`` 复用现有 Controller。
``turn.started`` 只负责提前 arm；真正文本仍来自 ChatPage 已有 ``messages`` State。``turn.completed`` 只标记
“允许收尾”，最后未闭合尾句必须等 ``readonly=false`` Message Patch 作为 stream barrier 后才能进入 TTS，
避免 control lane 抢先导致半句话被读出。

Realtime Voice V1
--------------------------------------------------------------------------------

Realtime Voice 已使用独立 ``/ws/realtime`` 媒体通道。输入、Agent 和输出状态按正交维度处理；
详细的 Surface、协议协商和 Barge-in 规则见 :doc:`realtime_voice`。

.. warning::

   音频块必须使用 Media Frame Raw Body。不要恢复 Base64 JSON，也不要让 Celery 成为实时输入的
   Hot Path。
