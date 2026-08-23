开发语音功能
============

输入
----

* 麦克风权限只在用户动作后申请；
* 录音结束时停止 Track 和 AudioContext；
* PCM/Opus Chunk 使用 ArrayBuffer；
* VAD、ASR Provider 通过 Adapter 选择；
* 自动发送必须允许关闭。

输出
----

* 朗读请求使用本地事件触发；
* 后端结果只监听 incoming；
* Media Body 使用有界队列；
* 暂停、继续、停止和 seek 都要有状态机；
* 结束/取消时清理字幕和音频资源。

打断
----

Realtime Voice 的 barge-in 使用 Candidate / Confirmed / Rejected 两阶段语义，并复用 ``useChatSpeech``：

* Candidate 先冻结 Playback Cursor 并立即静音。Backend Audio 使用 pause；Browser ``SpeechSynthesis``
  直接取消原生队列并保存当前 segment，避免 ``pause()`` 延迟造成 AI 继续说话；
* Candidate 从 Speech Start 到 Speech End 期间保持冻结；后端不得用固定的“从 Speech Start 起算”超时
  提前 Rejected。前端在 Speech End 复用 ``voice.barge_in.candidate`` 上报 ``phase=speech_end``。Batch/client-VAD
  等待 commit 的 Final/Empty，不设 wall-clock rejection；provider-controlled endpoint 需要兜底时也只能从 Speech End
  起算。本地 VAD 仍 active 时即便收到旧/迟到 Rejected 也禁止恢复 TTS；
* 真正 Rejected 才恢复原 Speech Session。Browser 复用已有 ``playFrom()``，但不会在用户还在说话时重放；
* Confirmed 永久 cancel 当前 Speech，并由后端把 ``extra_info.voice_delivery`` 写回 Assistant Message。
  不允许 ``speechSynthesis.cancel()`` 后立即调用 ``resume()``；只有显式的新播放/seek/restart 才能 resume；
* ``segmentPosition`` 是第一个不能保证完整交付的 segment。完整模型输出仍保留，UI 与下一轮模型上下文
  都消费同一持久化中断边界。

所有取消/恢复动作必须绑定当前 requestId/messageId，旧的 native callback、Timer、RAF 与队列在 hard cancel
前先通过 ``queueEpoch/playToken`` 失效，不能唤醒新一轮。

麦克风静音必须同时禁止 Audio Track、PCM、Local VAD 与 Waveform。不能只在 ``onPcmChunk`` 外层 return，
否则界面仍会进入 ``user_speaking``。中途静音还要用现有 ``voice.input.commit`` 的 ``discard=true`` 清掉后端
当前 ASR 输入；Streaming Provider 通过重建现有 ASR input session 保证静音前半句话不会在恢复后被提交。

测试
----

Mock WebSocket Media、AudioContext、Timer、StrictMode 双 effect、快速连续点击和组件卸载。

.. important::

   通配符 ``speech.*`` 监听器若既接 local/outgoing 又 reply，会形成异步递归。使用 direction 和
   Reply 隔离双重防护。
