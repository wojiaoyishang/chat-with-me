Speech Runtime 模块
==================

.. js:module:: src/features/chat/page/hooks/useChatSpeech

``useChatSpeech`` 统一语音请求、后端事件、字幕、缓冲、播放器和控制动作。由于内部函数较多，应先在
完整 API 按名称/行号定位，再修改状态机。

相关模块
--------

* ``features/chat/speech/backendAudio.js``：后端音频缓冲与播放；
* ``subtitleSettings.js``：字幕配置；
* ``textMatching.js``：文本/字幕匹配；
* ``SpeechPlayer.jsx``：播放 UI；
* ``SpeechOverlayHighlighter.jsx``：高亮；
* ``voiceRecorder.js``：录音。

关键约束
--------

* incoming speech 事件与 local 控制分离；
* Reply Envelope 隔离；
* 每个 Stream 绑定独立状态；
* 组件卸载释放音频/Timer/订阅；
* 快速 Stop/Play 不复用旧 Run/Stream。

完整函数见 :doc:`../api/javascript/features/chat/page/hooks/useChatSpeech` 和相关模块页。
