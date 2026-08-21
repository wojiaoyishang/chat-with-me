语音运行时
==========

当前组成
--------

``VoiceInputButton`` / Recorder
   采集麦克风、PCM 或浏览器 SpeechRecognition。

``useChatSpeech``
   协调朗读请求、后端 TTS、字幕、片段、播放器状态和事件订阅。

``backendAudio`` / ``SpeechPlayer``
   缓冲、解码和播放后端原始音频。

``SpeechOverlayHighlighter``
   按字幕时间或文本匹配高亮消息。

事件方向约束
------------

本地 ``speech.play.requested`` 由 UI 发出；Hook 向后端发送 ``speech.synthesize``；只有 incoming
``speech.*`` 结果更新播放状态。监听 ``speech.*`` 时必须指定 incoming，避免收到自己的本地请求。

回复隔离
--------

带 ``reply_to`` 的 Envelope 默认不进入普通监听器。只有协议调试器才设置 ``includeReplies``，
否则通配符监听器可能形成 ``speech.result.result`` 微任务死循环。

未来 Realtime Voice
-------------------

目标状态机：Idle → Listening → UserSpeaking → Understanding → Thinking → Speaking；Speaking 中检测到
用户说话进入 Interrupted，立即停止音频并开始新输入。

.. warning::

   音频块必须使用 Media Frame Raw Body。不要恢复 Base64 JSON，也不要让 Celery 成为实时输入的
   Hot Path。
