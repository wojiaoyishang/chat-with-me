开发语音功能
============

输入
----

* 麦克风权限只在用户动作后申请；
* 录音结束时停止 Track 和 AudioContext；
* PCM/Opus Chunk 使用 ArrayBuffer；
* Realtime VAD 使用 ``@ricky0123/vad-web`` Silero V5，并复用 Recorder 已持有的同一 MediaStream；不要让 VAD 再次 ``getUserMedia``；
* 自动发送必须允许关闭。

输出
----

* 朗读请求使用本地事件触发；
* 后端结果只监听 incoming；
* Media Body 使用有界队列；
* 暂停、继续、停止和 seek 都要有状态机；
* 结束/取消时清理字幕和音频资源；
* Realtime Voice 自动朗读必须从生成前已经持久化的 Assistant Message Contract 读取 ``allowSpeak``，
  不要在 TTS Hook 内另造 eligibility setting；
* Streaming TTS 只追加稳定 segment 到现有 ``useChatSpeech`` Controller。不要为流式生成另建播放器、
  WebSocket Event 或 TTS Store；
* ``turn.completed`` 不是 Message stream barrier。最后尾句只有在本地收到 ``readonly=false`` 终态消息后
  才能 finalize，避免读出尚未到齐的半句话；
* Voice Surface 的“最近一句”只复用用户 ASR Partial/Final。Assistant 稳定 segment 仍只进入原 TTS Controller，
  不要把 AI 正文重复显示在 Voice Dock，也不要为展示另造轮询/Store；
* 桌面 Voice Surface 是 Chat 根 Flex 的右侧 Dock，不应重新做居中 Modal；移动端才使用 ``100dvh`` 全屏，
  缩小/恢复只改变 Surface 呈现，不结束 Realtime Session。

打断
----

Realtime Voice 的 barge-in 仍复用 Candidate / Confirmed / Rejected，但 acoustic detection 与业务打断分离：

* Silero V5 ``onSpeechRealStart`` 只建立本地 ``barge probe`` 并冻结 Playback Cursor。Probe 不暂停 TTS、
  不发送 Candidate，也不能取消 Agent Run；
* probe 通过现有 Media Frame metadata 送到后端；``client_vad/manual/batch`` 在原 ``voice.input.commit``
  上兜底携带同一 metadata，不新增 WebSocket Event；
* 后端只有在 ASR Partial/Final 已产生非空、可用的 transcript，并满足 Provider 可提供的 stability/confidence
  条件后，才把 probe 提升为原有 ``voice.barge_in.candidate``。不要写中文字符数、语气词黑白名单或语言专用词表；
* Candidate 到达前端后才暂停当前 Speech，紧接着 Confirmed 才永久 cancel TTS 和普通 Agent Run，并把
  ``extra_info.voice_delivery`` 写回 Assistant Message；
* Batch/client-VAD 等待 commit 的 Final/Empty，不设从 Speech Start 起算的 wall-clock rejection。纯 probe 被
  Rejected 时因为从未暂停播放器，所以禁止调用 resume，避免 Browser TTS 重读当前句；
* “语音在此被打断”继续由 ``SpeechOverlayHighlighter`` 根据 metadata 在 render-time 插入，不要改写正文、
  不要复用 Widget/Card ``replace``。调整视觉留白时只改变 overlay 定位/gap，不能改变 Context 边界；
* ``segmentPosition`` 是第一个不能保证完整交付的 segment。生成中打断时它可以等于“当前已知稳定 segment 数”，
  因此必须结合 ``messageFinalized`` 判断是否真的全部交付。完整模型输出仍保留，UI 与下一轮模型上下文
  都消费同一持久化中断边界；
* AI 还在 ``thinking`` / LLM streaming、甚至第一句 TTS 尚未启动时也允许 probe。此时 Cursor 的
  ``messageId`` 来自已经前置创建的 Assistant Placeholder，ASR 确认后继续复用现有 Turn Admission/Run Cancel。

所有取消/恢复动作必须绑定当前 requestId/messageId，旧的 native callback、Timer、RAF 与队列在 hard cancel
前先通过 ``queueEpoch/playToken`` 失效，不能唤醒新一轮。

麦克风静音必须同时禁止 Audio Track、PCM、Local VAD 与 Waveform。不能只在 ``onPcmChunk`` 外层 return，
否则界面仍会进入 ``user_speaking``。中途静音还要用现有 ``voice.input.commit`` 的 ``discard=true`` 清掉后端
当前 ASR 输入；Streaming Provider 通过重建现有 ASR input session 保证静音前半句话不会在恢复后被提交。

Silero 资源与首次麦克风启动
----------------------------

依赖固定为 ``@ricky0123/vad-web@0.0.30`` 和 ``onnxruntime-web@1.22.0``。默认静态模型/Worklet/WASM 从
固定版本 jsDelivr 路径加载；内网/CSP 环境用 ``VITE_SILERO_VAD_ASSET_BASE`` 与
``VITE_ONNXRUNTIME_WASM_BASE`` 指向自托管目录。

首次 Voice Start 必须让 ``getUserMedia`` 尽量贴近用户点击：先拿到物理 Track、等待 Web Audio 首帧并验证
``readyState=live``，再申请 Media Ticket / 建立媒体 WebSocket。协商期间复用同一 Track 暂停采集，完成后重新
启动 Silero。Track 在任何启动阶段 ``ended`` 都要终止 Voice Runtime，不能留下“连接正常但麦克风没数据”的状态。

测试
----

Mock WebSocket Media、AudioContext、Timer、StrictMode 双 effect、快速连续点击和组件卸载。

.. important::

   通配符 ``speech.*`` 监听器若既接 local/outgoing 又 reply，会形成异步递归。使用 direction 和
   Reply 隔离双重防护。
