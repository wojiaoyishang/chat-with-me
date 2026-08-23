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
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：30

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``@/runtime/protocol/events.js``、``@/context/useEventStore.jsx``、``@/context/WebSocketContext.jsx``、``@/lib/tools.jsx``、``@/runtime/voice/RealtimeVoiceTransport.js``、``@/features/chat/ui/chatbox/utils/voiceRecorder.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:578:830:FUNCTION

.. js:function:: initialState()

   实现 ``initialState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``26`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:856:936:FUNCTION

.. js:function:: isSpeakingState(speechState)

   判断与 ``Speaking State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``28``—``28`` 行。

   **参数**

   ``speechState``
      调用方传入的 ``speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:937:12725:FUNCTION

.. js:function:: useRealtimeVoiceConversation({ conversationId, speechState, handleSpeakMessageRequest, pauseActiveSpeech, resumeActiveSpeech, ca…)

   封装 ``useRealtimeVoiceConversation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``30``—``306`` 行。

   **参数**

   ``{ conversationId, speechState, handleSpeakMessageRequest, pauseActiveSpeech, resumeActiveSpeech, ca…``
      调用方传入的 ``conversationId, speechState, handleSpeakMessageRequest, pauseActiveSpeech, resumeActiveSpeech, ca…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ state, start, stop, toggleMute, setMinimized: (minimized) => patchState({minimized}), }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useWebSocket``、``useState``、``useRef``、``useEffect``、``useCallback``。

   **内部回调数量**：15。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1774:1833:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``54`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1866:1918:FUNCTION

.. rubric:: ``useEffect callback @ 56``

.. code-block:: javascript

   useEffect callback @ 56()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``58`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1966:2088:FUNCTION

.. rubric:: ``useCallback callback @ 60``

.. code-block:: javascript

   useCallback callback @ 60(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``62`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1996:2080:FUNCTION

.. rubric:: ``setState callback @ 61``

.. code-block:: javascript

   setState callback @ 61(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``useCallback callback @ 60``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patch``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2130:2292:FUNCTION

.. rubric:: ``useCallback callback @ 64``

.. code-block:: javascript

   async useCallback callback @ 64()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``64``—``68`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamer.stop().catch``、``streamer.stop``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2276:2284:FUNCTION

.. rubric:: ``streamer.stop().catch callback @ 67``

.. code-block:: javascript

   streamer.stop().catch callback @ 67()

处理 ``streamer.stop().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``useCallback callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2339:2428:FUNCTION

.. rubric:: ``useCallback callback @ 70``

.. code-block:: javascript

   useCallback callback @ 70()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``73`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transportRef.current?.close``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2465:3331:FUNCTION

.. rubric:: ``useCallback callback @ 75``

.. code-block:: javascript

   async useCallback callback @ 75({silent = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``75``—``97`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{silent = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``transport.request({ event: EventName.VOICE_SESSION_STOP, payload: {}, conversationId: currentConfigRef.current?.convers…``、``transport.request``、``stopMedia``、``closeTransport``、``activeTurnIdsRef.current.clear``、``setState``、``initialState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2879:2887:FUNCTION

.. rubric:: ``transport.request({ event: EventName.VOICE_SESSION_STOP, payload: {}, conversationId: currentConfigRef.current?.convers… callback @ 84``

.. code-block:: javascript

   transport.request({ event: EventName.VOICE_SESSION_STOP, payload: {}, conversationId: currentConfigRef.current?.convers… callback @ 84()

实现 ``transport.request({ event: EventName.VOICE_SESSION_STOP, payload: {}, conversationId: currentConfigRef.current?.convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``useCallback callback @ 75``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3403:3836:FUNCTION

.. rubric:: ``useCallback callback @ 99``

.. code-block:: javascript

   useCallback callback @ 99()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``99``—``109`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ messageId: currentSpeech?.messageId || null, segmentPosition: Number.isInteger(currentSpeech?.currentSegmentPosition) ? currentSpeech.currentSegmentPosition : null, segmentId: c…``。

**主要协作调用**：``Number.isInteger``、``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3885:6337:FUNCTION

.. rubric:: ``useCallback callback @ 111``

.. code-block:: javascript

   useCallback callback @ 111(envelope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``111``—``165`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``、``activeTurnIdsRef.current.add``、``cancelActiveSpeech``、``resumeActiveSpeech``、``isSpeakingState``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4601:4681:FUNCTION

.. rubric:: ``patchState callback @ 128``

.. code-block:: javascript

   patchState callback @ 128(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``useCallback callback @ 111``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:6425:10328:FUNCTION

.. rubric:: ``useCallback callback @ 167``

.. code-block:: javascript

   async useCallback callback @ 167(config)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``167``—``247`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``config``
   调用方传入的 ``config`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。

**显式抛出**：``new Error('Realtime voice requires conversationId and model.')``、``new Error('主实时通道尚未连接，无法启动语音对话。')``。

**主要协作调用**：``stop``、``patchState``、``initialState``、``transport.connect``、``transport.request``、``console.info``、``requestMicrophoneStream``、``generateUUID``、``createRealtimePcm16kStreamer``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:7051:7125:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``useCallback callback @ 167``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:7069:7124:FUNCTION

.. rubric:: ``patchState callback @ 181``

.. code-block:: javascript

   patchState callback @ 181(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``onClose``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:7147:7226:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``useCallback callback @ 167``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:8526:8934:FUNCTION

.. rubric:: ``onPcmChunk``

.. code-block:: javascript

   onPcmChunk(pcm, meta)

处理 ``Pcm Chunk`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``211``—``220`` 行；所属函数 ``useCallback callback @ 167``。

**参数**

``pcm``
   调用方传入的 ``pcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``meta``
   调用方传入的 ``meta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``transportRef.current.sendAudio``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:8959:8996:FUNCTION

.. rubric:: ``onWaveform``

.. code-block:: javascript

   onWaveform(waveform)

处理 ``Waveform`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``useCallback callback @ 167``。

**参数**

``waveform``
   调用方传入的 ``waveform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:9024:9801:FUNCTION

.. rubric:: ``onSpeechStart``

.. code-block:: javascript

   onSpeechStart()

处理 ``Speech Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``222``—``235`` 行；所属函数 ``useCallback callback @ 167``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``patchState``、``isSpeakingState``、``['thinking', 'understanding', 'speaking'].includes``、``pauseActiveSpeech``、``transportRef.current?.sendEvent``、``playbackCursor``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:9827:10309:FUNCTION

.. rubric:: ``onSpeechEnd``

.. code-block:: javascript

   onSpeechEnd()

处理 ``Speech End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``236``—``245`` 行；所属函数 ``useCallback callback @ 167``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``transportRef.current?.sendEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10458:11345:FUNCTION

.. rubric:: ``useEffect callback @ 249``

.. code-block:: javascript

   useEffect callback @ 249()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``249``—``268`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({ event: [EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction: 'incoming', }).then(({event, payload, eventTurnId}) => { i…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: [EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10713:11337:FUNCTION

.. rubric:: ``onEvent({ event: [EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction… callback @ 255``

.. code-block:: javascript

   onEvent({ event: [EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction… callback @ 255({event, payload, eventTurnId})

处理 ``Event({ event: [Event Name.TURN COMPLETED, Event Name.TURN CANCELLED, Event Name.TURN FAILED], conversation Id, direction…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``255``—``267`` 行；所属函数 ``useEffect callback @ 249``。

**参数**

``{event, payload, eventTurnId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``activeTurnIdsRef.current.has``、``patchState``、``window.setTimeout``、``activeTurnIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11063:11159:FUNCTION

.. rubric:: ``window.setTimeout callback @ 261``

.. code-block:: javascript

   window.setTimeout callback @ 261()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``onEvent({ event: [EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction… callback @ 255``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSpeakMessageRequest``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11420:11944:FUNCTION

.. rubric:: ``useEffect callback @ 270``

.. code-block:: javascript

   useEffect callback @ 270()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``270``—``280`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``patchState``、``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11702:11926:FUNCTION

.. rubric:: ``setState callback @ 275``

.. code-block:: javascript

   setState callback @ 275(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``275``—``278`` 行；所属函数 ``useEffect callback @ 270``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{...current, status: 'listening'}``。

**主要协作调用**：``['user_speaking', 'thinking', 'understanding', 'connecting'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12009:12058:FUNCTION

.. rubric:: ``useEffect callback @ 282``

.. code-block:: javascript

   useEffect callback @ 282()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``284`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12014:12058:FUNCTION

.. rubric:: ``anonymous callback @ 282``

.. code-block:: javascript

   anonymous callback @ 282()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``282``—``284`` 行；所属函数 ``useEffect callback @ 282``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12084:12356:FUNCTION

.. rubric:: ``useEffect callback @ 286``

.. code-block:: javascript

   useEffect callback @ 286()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``286``—``292`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.warning``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12454:12560:FUNCTION

.. rubric:: ``useCallback callback @ 294``

.. code-block:: javascript

   useCallback callback @ 294()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``294``—``297`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12676:12715:FUNCTION

.. rubric:: ``setMinimized``

.. code-block:: javascript

   setMinimized(minimized)

设置与 ``Minimized`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``minimized``
   调用方传入的 ``minimized`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。
