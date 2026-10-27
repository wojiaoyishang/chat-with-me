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

``react``、``sonner``、``@/runtime/protocol/events.js``、``@/context/useEventStore.jsx``、``@/context/WebSocketContext.jsx``、``@/lib/tools.jsx``、``@/runtime/voice/RealtimeVoiceTransport.js``、``../../../runtime/backend/connection.js``、``@/features/chat/ui/chatbox/utils/voiceRecorder.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:934:1236:FUNCTION

.. js:function:: initialState()

   实现 ``initialState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``36`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1262:1342:FUNCTION

.. js:function:: isSpeakingState(speechState)

   判断与 ``Speaking State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``38`` 行。

   **参数**

   ``speechState``
      调用方传入的 ``speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1455:1522:FUNCTION

.. js:function:: stopMediaStream(stream)

   停止与 ``Media Stream`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``40``—``40`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``stream?.getTracks?.().forEach``、``stream?.getTracks``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1554:2137:FUNCTION

.. js:function:: waitForMicrophoneReady(streamer)

   实现 ``waitForMicrophoneReady`` 对应的前端处理。

   **性质**：异步函数；模块内部入口；源码第 ``41``—``57`` 行。

   **参数**

   ``streamer``
      调用方传入的 ``streamer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Promise.race``、``Promise.resolve``、``globalThis.clearTimeout``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2138:44006:FUNCTION

.. js:function:: useRealtimeVoiceConversation({ textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…)

   封装 ``useRealtimeVoiceConversation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``59``—``935`` 行。

   **参数**

   ``{ textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…``
      调用方传入的 ``textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ state, start, stop, toggleMute, setMinimized: (minimized) => patchState({ minimized }), }``。

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1498:1521:FUNCTION

.. rubric:: ``stream?.getTracks?.().forEach callback @ 40``

.. code-block:: javascript

   stream?.getTracks?.().forEach callback @ 40(track)

作为 ``stream?.getTracks?.().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``stopMediaStream``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1714:2035:FUNCTION

.. rubric:: ``anonymous callback @ 46``

.. code-block:: javascript

   anonymous callback @ 46(_, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``52`` 行；所属函数 ``waitForMicrophoneReady``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1779:1990:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 47``

.. code-block:: javascript

   globalThis.setTimeout callback @ 47()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``51`` 行；所属函数 ``anonymous callback @ 46``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reject``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3640:3699:FUNCTION

.. rubric:: ``useEffect callback @ 96``

.. code-block:: javascript

   useEffect callback @ 96()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``98`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3732:3784:FUNCTION

.. rubric:: ``useEffect callback @ 100``

.. code-block:: javascript

   useEffect callback @ 100()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``100``—``102`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3832:3958:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3862:3950:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4010:4582:FUNCTION

.. rubric:: ``useCallback callback @ 109``

.. code-block:: javascript

   useCallback callback @ 109(status, targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``109``—``119`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``status``
   调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetConversationId`` （默认值 ``null``）
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``VALID_COMPOSER_STATES.has``、``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4652:4814:FUNCTION

.. rubric:: ``useCallback callback @ 123``

.. code-block:: javascript

   async useCallback callback @ 123()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``123``—``127`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamer.stop().catch``、``streamer.stop``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4798:4806:FUNCTION

.. rubric:: ``streamer.stop().catch callback @ 126``

.. code-block:: javascript

   streamer.stop().catch callback @ 126()

处理 ``streamer.stop().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``useCallback callback @ 123``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4863:5667:FUNCTION

.. rubric:: ``useCallback callback @ 129``

.. code-block:: javascript

   useCallback callback @ 129()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``129``—``148`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeTurnIdsRef.current.clear``、``startedTurnMessagesRef.current.clear``、``armedSpeechTurnIdsRef.current.clear``、``terminalVoiceTurnIdsRef.current.clear``、``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:5704:8465:FUNCTION

.. rubric:: ``useCallback callback @ 151``

.. code-block:: javascript

   async useCallback callback @ 151({ silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``151``—``210`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{ silent = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``、``initialState``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``stopMedia``、``clearRuntimeRefs``、``[ 'authorizing', 'connecting', 'negotiating', 'requesting_microphone', 'listening', 'disconnected', 'error', 'idle', ].…``、``applyComposerStatus``、``transport.request``、``transport.close``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:8633:11406:FUNCTION

.. rubric:: ``useCallback callback @ 214``

.. code-block:: javascript

   useCallback callback @ 214()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``214``—``267`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ messageId, requestId: currentSpeech?.requestId || streamingSnapshot?.requestId || null, segmentPosition: boundaryPosition, segmentId: boundarySegment?.id || currentSpeech?.curre…``。

**主要协作调用**：``getStreamingSpeechSnapshot``、``Boolean``、``String``、``Array.isArray``、``Number.isInteger``、``Number``、``Math.min``、``Math.max``、``segments.slice``、``Array.from(String(segment.text || '')) .slice(0, 1200) .join``、``Array.from(String(segment.text || '')) .slice``、``Array.from``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11480:11707:FUNCTION

.. rubric:: ``useCallback callback @ 269``

.. code-block:: javascript

   useCallback callback @ 269()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``275`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11753:12358:FUNCTION

.. rubric:: ``useCallback callback @ 278``

.. code-block:: javascript

   useCallback callback @ 278({ resumeStatus, speechWasActive, vad })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``278``—``292`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{ resumeStatus, speechWasActive, vad }``
   调用方传入的 ``resumeStatus, speechWasActive, vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearBargeProbe``、``playbackCursor``、``Boolean``、``Date.now``、``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12207:12326:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 288``

.. code-block:: javascript

   globalThis.setTimeout callback @ 288()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``288``—``291`` 行；所属函数 ``useCallback callback @ 278``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12461:13051:FUNCTION

.. rubric:: ``useCallback callback @ 297``

.. code-block:: javascript

   useCallback callback @ 297(turnId, messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``297``—``309`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``turnId``
   当前 Human ↔ Agent 轮次 UUID。

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``armedSpeechTurnIdsRef.current.has``、``armedSpeechTurnIdsRef.current.add``、``beginStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:13134:20333:FUNCTION

.. rubric:: ``useCallback callback @ 314``

.. code-block:: javascript

   useCallback callback @ 314(envelope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``314``—``443`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``patchState``、``['execution_interrupt', 'execution_guidance'].includes``、``terminalVoiceTurnIdsRef.current.has``、``activeTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``armStreamingSpeechForTurn``、``isSpeakingState``、``pauseActiveSpeech``、``clearBargeProbe``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``resumeActiveSpeech``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:14233:14370:FUNCTION

.. rubric:: ``patchState callback @ 335``

.. code-block:: javascript

   patchState callback @ 335(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``335``—``337`` 行；所属函数 ``useCallback callback @ 314``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:14616:14878:FUNCTION

.. rubric:: ``patchState callback @ 343``

.. code-block:: javascript

   patchState callback @ 343(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``343``—``347`` 行；所属函数 ``useCallback callback @ 314``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:15122:15513:FUNCTION

.. rubric:: ``patchState callback @ 353``

.. code-block:: javascript

   patchState callback @ 353(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``353``—``360`` 行；所属函数 ``useCallback callback @ 314``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``generateUUID``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:20672:35102:FUNCTION

.. rubric:: ``useCallback callback @ 458``

.. code-block:: javascript

   async useCallback callback @ 458(config)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``458``—``738`` 行；所属函数 ``useRealtimeVoiceConversation``。

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

**主要协作调用**：``getBackendConnection``、``stop``、``isCurrent``、``applyComposerStatus``、``patchState``、``initialState``、``requestMicrophoneStream``、``stopMediaStream``、``generateUUID``、``createRealtimePcm16kStreamer``、``waitForMicrophoneReady``、``streamer.setMuted``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:21686:21764:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:22737:24631:FUNCTION

.. rubric:: ``onPcmChunk``

.. code-block:: javascript

   onPcmChunk(pcm, meta)

处理 ``Pcm Chunk`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``498``—``530`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

``pcm``
   调用方传入的 ``pcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``meta``
   调用方传入的 ``meta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``transportRef.current.sendAudio``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:24664:24807:FUNCTION

.. rubric:: ``onWaveform``

.. code-block:: javascript

   onWaveform(waveform)

处理 ``Waveform`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``531``—``533`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

``waveform``
   调用方传入的 ``waveform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:24842:25423:FUNCTION

.. rubric:: ``onInputEnded``

.. code-block:: javascript

   onInputEnded()

处理 ``Input Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``534``—``545`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:25459:26732:FUNCTION

.. rubric:: ``onSpeechStart``

.. code-block:: javascript

   onSpeechStart(vad)

处理 ``Speech Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``546``—``566`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

``vad``
   调用方传入的 ``vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``isSpeakingState``、``['thinking', 'understanding', 'speaking'].includes``、``armBargeProbe``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:26766:28366:FUNCTION

.. rubric:: ``onSpeechEnd``

.. code-block:: javascript

   onSpeechEnd()

处理 ``Speech End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``567``—``595`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``transportRef.current?.sendEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:29966:30111:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``629``—``631`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``handleVoiceEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:30141:31143:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``632``—``652`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:30793:31093:FUNCTION

.. rubric:: ``patchState callback @ 644``

.. code-block:: javascript

   patchState callback @ 644(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``644``—``650`` 行；所属函数 ``onClose``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:31173:31962:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``653``—``668`` 行；所属函数 ``useCallback callback @ 458``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35396:39266:FUNCTION

.. rubric:: ``useEffect callback @ 751``

.. code-block:: javascript

   useEffect callback @ 751()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``751``—``820`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction: 'incoming', }).then(({ event, payl…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], c…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35675:39258:FUNCTION

.. rubric:: ``onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], c… callback @ 757``

.. code-block:: javascript

   onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], c… callback @ 757({ event, payload, eventTurnId })

处理 ``Event({ event: [Event Name.TURN STARTED, Event Name.TURN COMPLETED, Event Name.TURN CANCELLED, Event Name.TURN FAILED], c…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``757``—``819`` 行；所属函数 ``useEffect callback @ 751``。

**参数**

``{ event, payload, eventTurnId }``
   调用方传入的 ``event, payload, eventTurnId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``startedTurnMessagesRef.current.set``、``activeTurnIdsRef.current.add``、``activeTurnIdsRef.current.has``、``armStreamingSpeechForTurn``、``applyComposerStatus``、``terminalVoiceTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``requestStreamingSpeechFinalize``、``['user_speaking', 'understanding', 'thinking'].includes``、``patchState``、``isSpeakingState``、``cancelStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:39472:40356:FUNCTION

.. rubric:: ``useEffect callback @ 829``

.. code-block:: javascript

   useEffect callback @ 829()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``829``—``851`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``patchState``、``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:39756:40338:FUNCTION

.. rubric:: ``setState callback @ 834``

.. code-block:: javascript

   setState callback @ 834(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``834``—``849`` 行；所属函数 ``useEffect callback @ 829``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, status: current.outputOnly ? 'text_input' : 'listening' }``。

**主要协作调用**：``[ 'user_speaking', 'thinking', 'understanding', 'connecting', 'negotiating', 'requesting_microphone', 'error', ].includ…``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40785:40836:FUNCTION

.. rubric:: ``useEffect callback @ 858``

.. code-block:: javascript

   useEffect callback @ 858()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``858``—``860`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40862:40954:FUNCTION

.. rubric:: ``useEffect callback @ 863``

.. code-block:: javascript

   useEffect callback @ 863()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``863``—``865`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40876:40954:FUNCTION

.. rubric:: ``anonymous callback @ 863``

.. code-block:: javascript

   anonymous callback @ 863()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``863``—``865`` 行；所属函数 ``useEffect callback @ 863``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopLatestRef.current``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40990:41262:FUNCTION

.. rubric:: ``useEffect callback @ 869``

.. code-block:: javascript

   useEffect callback @ 869()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``869``—``875`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.warning``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:41339:41574:FUNCTION

.. rubric:: ``useEffect callback @ 877``

.. code-block:: javascript

   useEffect callback @ 877()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``877``—``883`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyComposerStatus``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:41700:43786:FUNCTION

.. rubric:: ``useCallback callback @ 885``

.. code-block:: javascript

   useCallback callback @ 885()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``885``—``926`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``streamerRef.current?.setMuted``、``clearBargeProbe``、``transportRef.current?.sendEvent``、``resumeActiveSpeech``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:43150:43778:FUNCTION

.. rubric:: ``patchState callback @ 912``

.. code-block:: javascript

   patchState callback @ 912(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``912``—``925`` 行；所属函数 ``useCallback callback @ 885``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``、``isSpeakingState``、``['thinking', 'understanding'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:43955:43996:FUNCTION

.. rubric:: ``setMinimized``

.. code-block:: javascript

   setMinimized(minimized)

设置与 ``Minimized`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``933``—``933`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``minimized``
   调用方传入的 ``minimized`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。
