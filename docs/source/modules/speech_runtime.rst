Speech Runtime 模块
================================================================================

.. js:module:: src/features/chat/page/hooks/useChatSpeech
   :no-index:

``useChatSpeech`` 统一语音请求、后端事件、字幕、缓冲、播放器和控制动作。由于内部函数较多，应先在
完整 API 按名称/行号定位，再修改状态机。

相关模块
--------------------------------------------------------------------------------

* ``features/chat/speech/backendAudio.js``：后端音频缓冲与播放；
* ``subtitleSettings.js``：字幕配置；
* ``textMatching.js``：文本/字幕匹配；
* ``SpeechPlayer.jsx``：播放 UI；
* ``SpeechOverlayHighlighter.jsx``：高亮；
* ``voiceRecorder.js``：录音。

关键约束
--------------------------------------------------------------------------------

* incoming speech 事件与 local 控制分离；
* Reply Envelope 隔离；
* 每个 Stream 绑定独立状态；
* 组件卸载释放音频/Timer/订阅；
* 快速 Stop/Play 不复用旧 Run/Stream。

完整函数见 :doc:`../api/javascript/features/chat/page/hooks/useChatSpeech` 和相关模块页。

独立音频附件
--------------------------------------------------------------------------------

AI 合成的语音附件使用 ``ResourceAudio`` 展示，不进入逐句朗读的 ``useChatSpeech``
状态机。``{type=audio}`` 由受控 Markdown 指令解析，不启用任意 HTML；源地址与下载均
复用当前后端的授权资源凭据。对话更新不得卸载正在播放的原生 audio，相关协议见
:doc:`../architecture/rendering_widgets`。
