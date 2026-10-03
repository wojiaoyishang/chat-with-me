src/features/chat/voice/useRealtimeVoiceConversation 模块
======================================================================================================================

.. js:module:: src/features/chat/voice/useRealtimeVoiceConversation

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/voice/useRealtimeVoiceConversation.js``
* **模块标识**：``src/features/chat/voice/useRealtimeVoiceConversation``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：44

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``@/runtime/protocol/events.js``、``@/context/useEventStore.jsx``、``@/context/WebSocketContext.jsx``、``@/lib/tools.jsx``、``@/runtime/voice/RealtimeVoiceTransport.js``、``@/features/chat/ui/chatbox/utils/voiceRecorder.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:841:1156:FUNCTION

.. js:function:: initialState()

   实现 ``initialState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``35`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1184:1264:FUNCTION

.. js:function:: isSpeakingState(speechState)

   判断与 ``Speaking State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``37`` 行。

   **参数**

   ``speechState``
      调用方传入的 ``speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1379:1444:FUNCTION

.. js:function:: stopMediaStream(stream)

   停止与 ``Media Stream`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``39`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``stream?.getTracks?.().forEach``、``stream?.getTracks``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1477:2076:FUNCTION

.. js:function:: waitForMicrophoneReady(streamer)

   实现 ``waitForMicrophoneReady`` 对应的前端处理。

   **性质**：异步函数；模块内部入口；源码第 ``40``—``56`` 行。

   **参数**

   ``streamer``
      调用方传入的 ``streamer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Promise.race``、``Promise.resolve``、``globalThis.clearTimeout``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2077:40211:FUNCTION

.. js:function:: useRealtimeVoiceConversation({ textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…)

   封装 ``useRealtimeVoiceConversation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``59``—``842`` 行。

   **参数**

   ``{ textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…``
      调用方传入的 ``textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ state, start, stop, toggleMute, setMinimized: (minimized) => patchState({minimized}), }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useWebSocket``、``useState``、``useRef``、``useEffect``、``useCallback``。

   **内部回调数量**：21。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1422:1443:FUNCTION

.. rubric:: ``stream?.getTracks?.().forEach callback @ 39``

.. code-block:: javascript

   stream?.getTracks?.().forEach callback @ 39(track)

作为 ``stream?.getTracks?.().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``stopMediaStream``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1642:1969:FUNCTION

.. rubric:: ``anonymous callback @ 45``

.. code-block:: javascript

   anonymous callback @ 45(_, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``51`` 行；所属函数 ``waitForMicrophoneReady``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1708:1923:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 46``

.. code-block:: javascript

   globalThis.setTimeout callback @ 46()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``50`` 行；所属函数 ``anonymous callback @ 45``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reject``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3618:3679:FUNCTION

.. rubric:: ``useEffect callback @ 96``

.. code-block:: javascript

   useEffect callback @ 96()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``98`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3714:3768:FUNCTION

.. rubric:: ``useEffect callback @ 100``

.. code-block:: javascript

   useEffect callback @ 100()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``100``—``102`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3818:3942:FUNCTION

.. rubric:: ``useCallback callback @ 104``

.. code-block:: javascript

   useCallback callback @ 104(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``106`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3849:3933:FUNCTION

.. rubric:: ``setState callback @ 105``

.. code-block:: javascript

   setState callback @ 105(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``useCallback callback @ 104``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patch``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3996:4510:FUNCTION

.. rubric:: ``useCallback callback @ 108``

.. code-block:: javascript

   useCallback callback @ 108(status, targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``117`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``status``
   调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetConversationId``（默认值 ``null``）
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``VALID_COMPOSER_STATES.has``、``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4568:4734:FUNCTION

.. rubric:: ``useCallback callback @ 119``

.. code-block:: javascript

   async useCallback callback @ 119()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``119``—``123`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamer.stop().catch``、``streamer.stop``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4717:4725:FUNCTION

.. rubric:: ``streamer.stop().catch callback @ 122``

.. code-block:: javascript

   streamer.stop().catch callback @ 122()

处理 ``streamer.stop().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``useCallback callback @ 119``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4785:5608:FUNCTION

.. rubric:: ``useCallback callback @ 125``

.. code-block:: javascript

   useCallback callback @ 125()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``125``—``144`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeTurnIdsRef.current.clear``、``startedTurnMessagesRef.current.clear``、``armedSpeechTurnIdsRef.current.clear``、``terminalVoiceTurnIdsRef.current.clear``、``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:5647:8094:FUNCTION

.. rubric:: ``useCallback callback @ 146``

.. code-block:: javascript

   async useCallback callback @ 146({silent = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``146``—``197`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{silent = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``、``initialState``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``stopMedia``、``clearRuntimeRefs``、``[ 'authorizing', 'connecting', 'negotiating', 'requesting_microphone', 'listening', 'disconnected', 'error', 'idle', ].…``、``applyComposerStatus``、``transport.request``、``transport.close``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:8250:10623:FUNCTION

.. rubric:: ``useCallback callback @ 199``

.. code-block:: javascript

   useCallback callback @ 199()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``245`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ messageId, requestId: currentSpeech?.requestId || streamingSnapshot?.requestId || null, segmentPosition: boundaryPosition, segmentId: boundarySegment?.id || currentSpeech?.curre…``。

**主要协作调用**：``getStreamingSpeechSnapshot``、``Boolean``、``String``、``Array.isArray``、``Number.isInteger``、``Number``、``Math.min``、``Math.max``、``String(boundarySegment?.text || '').slice``、``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10699:10932:FUNCTION

.. rubric:: ``useCallback callback @ 247``

.. code-block:: javascript

   useCallback callback @ 247()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``247``—``253`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10980:11532:FUNCTION

.. rubric:: ``useCallback callback @ 255``

.. code-block:: javascript

   useCallback callback @ 255({resumeStatus, speechWasActive, vad})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``255``—``269`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{resumeStatus, speechWasActive, vad}``
   调用方传入的 ``resumeStatus, speechWasActive, vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearBargeProbe``、``playbackCursor``、``Boolean``、``Date.now``、``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11393:11503:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 265``

.. code-block:: javascript

   globalThis.setTimeout callback @ 265()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``268`` 行；所属函数 ``useCallback callback @ 255``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11623:12168:FUNCTION

.. rubric:: ``useCallback callback @ 271``

.. code-block:: javascript

   useCallback callback @ 271(turnId, messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``271``—``283`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``turnId``
   当前 Human ↔ Agent 轮次 UUID。

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``armedSpeechTurnIdsRef.current.has``、``armedSpeechTurnIdsRef.current.add``、``beginStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12239:18856:FUNCTION

.. rubric:: ``useCallback callback @ 285``

.. code-block:: javascript

   useCallback callback @ 285(envelope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``411`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``patchState``、``terminalVoiceTurnIdsRef.current.has``、``activeTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``armStreamingSpeechForTurn``、``isSpeakingState``、``pauseActiveSpeech``、``clearBargeProbe``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``resumeActiveSpeech``、``['thinking', 'understanding'].includes``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:13262:13342:FUNCTION

.. rubric:: ``patchState callback @ 306``

.. code-block:: javascript

   patchState callback @ 306(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:13570:13816:FUNCTION

.. rubric:: ``patchState callback @ 312``

.. code-block:: javascript

   patchState callback @ 312(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``312``—``316`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:14042:14330:FUNCTION

.. rubric:: ``patchState callback @ 322``

.. code-block:: javascript

   patchState callback @ 322(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``322``—``327`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:19153:31687:FUNCTION

.. rubric:: ``useCallback callback @ 423``

.. code-block:: javascript

   async useCallback callback @ 423(config)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``423``—``668`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``config``
   调用方传入的 ``config`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error('Realtime voice requires conversationId and model.')``、``new Error('当前对话正在切换状态，暂时无法启动实时语音。')``、``new Error('主实时通道尚未连接，无法启动语音对话。')``、``new Error('麦克风设备没有可用的实时音轨，请重新选择录音设备。')``、``new Error('麦克风设备在实时语音授权期间停止了录音，请重新开启。')``、``new Error(ticketPayload?.message || '后端没有签发实时语音媒体凭证。')``、``new Error('麦克风设备在实时语音连接期间停止了录音，请重新开启。')``、``new Error('麦克风设备在语音协议协商期间停止了录音，请重新开启。')``。

**主要协作调用**：``stop``、``applyComposerStatus``、``patchState``、``initialState``、``requestMicrophoneStream``、``isCurrent``、``stopMediaStream``、``generateUUID``、``createRealtimePcm16kStreamer``、``waitForMicrophoneReady``、``streamer.setMuted``、``emitEvent``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:20049:20090:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``441``—``441`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:20965:22599:FUNCTION

.. rubric:: ``onPcmChunk``

.. code-block:: javascript

   onPcmChunk(pcm, meta)

处理 ``Pcm Chunk`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``461``—``489`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``pcm``
   调用方传入的 ``pcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``meta``
   调用方传入的 ``meta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``transportRef.current.sendAudio``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:22629:22764:FUNCTION

.. rubric:: ``onWaveform``

.. code-block:: javascript

   onWaveform(waveform)

处理 ``Waveform`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``490``—``492`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``waveform``
   调用方传入的 ``waveform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:22796:23342:FUNCTION

.. rubric:: ``onInputEnded``

.. code-block:: javascript

   onInputEnded()

处理 ``Input Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``493``—``504`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:23375:24565:FUNCTION

.. rubric:: ``onSpeechStart``

.. code-block:: javascript

   onSpeechStart(vad)

处理 ``Speech Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``505``—``524`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``vad``
   调用方传入的 ``vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``isSpeakingState``、``['thinking', 'understanding', 'speaking'].includes``、``armBargeProbe``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:24596:25904:FUNCTION

.. rubric:: ``onSpeechEnd``

.. code-block:: javascript

   onSpeechEnd()

处理 ``Speech End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``525``—``547`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``transportRef.current?.sendEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:27375:27514:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``580``—``582`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``handleVoiceEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:27541:28259:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``583``—``596`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:28071:28238:FUNCTION

.. rubric:: ``patchState callback @ 592``

.. code-block:: javascript

   patchState callback @ 592(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``592``—``595`` 行；所属函数 ``onClose``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:28286:28944:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``597``—``609`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:31938:35747:FUNCTION

.. rubric:: ``useEffect callback @ 679``

.. code-block:: javascript

   useEffect callback @ 679()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``679``—``745`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ], conversationId, direction: 'incoming', }).then(({event, pa…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ]…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:32307:35738:FUNCTION

.. rubric:: ``onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ]… callback @ 690``

.. code-block:: javascript

   onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ]… callback @ 690({event, payload, eventTurnId})

处理 ``Event({ event: [ Event Name.TURN STARTED, Event Name.TURN COMPLETED, Event Name.TURN CANCELLED, Event Name.TURN FAILED, ]…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``690``—``744`` 行；所属函数 ``useEffect callback @ 679``。

**参数**

``{event, payload, eventTurnId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``startedTurnMessagesRef.current.set``、``activeTurnIdsRef.current.add``、``activeTurnIdsRef.current.has``、``armStreamingSpeechForTurn``、``applyComposerStatus``、``terminalVoiceTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``requestStreamingSpeechFinalize``、``['user_speaking', 'understanding', 'thinking'].includes``、``patchState``、``isSpeakingState``、``cancelStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35964:36645:FUNCTION

.. rubric:: ``useEffect callback @ 755``

.. code-block:: javascript

   useEffect callback @ 755()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``755``—``768`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``patchState``、``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:36251:36625:FUNCTION

.. rubric:: ``setState callback @ 760``

.. code-block:: javascript

   setState callback @ 760(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``760``—``766`` 行；所属函数 ``useEffect callback @ 755``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{...current, status: current.outputOnly ? 'text_input' : 'listening'}``。

**主要协作调用**：``[ 'user_speaking', 'thinking', 'understanding', 'connecting', 'negotiating', 'requesting_microphone', 'error', ].includ…``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37081:37134:FUNCTION

.. rubric:: ``useEffect callback @ 775``

.. code-block:: javascript

   useEffect callback @ 775()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``775``—``777`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37162:37237:FUNCTION

.. rubric:: ``useEffect callback @ 779``

.. code-block:: javascript

   useEffect callback @ 779()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``779``—``781`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37167:37237:FUNCTION

.. rubric:: ``anonymous callback @ 779``

.. code-block:: javascript

   anonymous callback @ 779()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``779``—``781`` 行；所属函数 ``useEffect callback @ 779``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopLatestRef.current``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37261:37539:FUNCTION

.. rubric:: ``useEffect callback @ 783``

.. code-block:: javascript

   useEffect callback @ 783()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``783``—``789`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.warning``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37618:37823:FUNCTION

.. rubric:: ``useEffect callback @ 791``

.. code-block:: javascript

   useEffect callback @ 791()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``791``—``794`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyComposerStatus``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37951:39984:FUNCTION

.. rubric:: ``useCallback callback @ 796``

.. code-block:: javascript

   useCallback callback @ 796()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``796``—``833`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``streamerRef.current?.setMuted``、``clearBargeProbe``、``transportRef.current?.sendEvent``、``resumeActiveSpeech``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:39426:39975:FUNCTION

.. rubric:: ``patchState callback @ 823``

.. code-block:: javascript

   patchState callback @ 823(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``823``—``832`` 行；所属函数 ``useCallback callback @ 796``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``、``isSpeakingState``、``['thinking', 'understanding'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40160:40199:FUNCTION

.. rubric:: ``setMinimized``

.. code-block:: javascript

   setMinimized(minimized)

设置与 ``Minimized`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``840``—``840`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``minimized``
   调用方传入的 ``minimized`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。
