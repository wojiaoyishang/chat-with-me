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
* **局部函数与匿名回调**：43

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``@/runtime/protocol/events.js``、``@/context/useEventStore.jsx``、``@/context/WebSocketContext.jsx``、``@/lib/tools.jsx``、``@/runtime/voice/RealtimeVoiceTransport.js``、``@/features/chat/ui/chatbox/utils/voiceRecorder.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:820:1099:FUNCTION

.. js:function:: initialState()

   实现 ``initialState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``34`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1125:1205:FUNCTION

.. js:function:: isSpeakingState(speechState)

   判断与 ``Speaking State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``36`` 行。

   **参数**

   ``speechState``
      调用方传入的 ``speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1318:1383:FUNCTION

.. js:function:: stopMediaStream(stream)

   停止与 ``Media Stream`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``38`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``stream?.getTracks?.().forEach``、``stream?.getTracks``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1415:1998:FUNCTION

.. js:function:: waitForMicrophoneReady(streamer)

   实现 ``waitForMicrophoneReady`` 对应的前端处理。

   **性质**：异步函数；模块内部入口；源码第 ``39``—``55`` 行。

   **参数**

   ``streamer``
      调用方传入的 ``streamer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Promise.race``、``Promise.resolve``、``globalThis.clearTimeout``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1999:38574:FUNCTION

.. js:function:: useRealtimeVoiceConversation({ conversationId, speechState, beginStreamingSpeech, requestStreamingSpeechFinalize, cancelStreamin…)

   封装 ``useRealtimeVoiceConversation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``58``—``835`` 行。

   **参数**

   ``{ conversationId, speechState, beginStreamingSpeech, requestStreamingSpeechFinalize, cancelStreamin…``
      调用方传入的 ``conversationId, speechState, beginStreamingSpeech, requestStreamingSpeechFinalize, cancelStreamin…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ state, start, stop, toggleMute, setMinimized: (minimized) => patchState({minimized}), }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useWebSocket``、``useState``、``useRef``、``useEffect``、``useCallback``。

   **内部回调数量**：20。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1361:1382:FUNCTION

.. rubric:: ``stream?.getTracks?.().forEach callback @ 38``

.. code-block:: javascript

   stream?.getTracks?.().forEach callback @ 38(track)

作为 ``stream?.getTracks?.().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``stopMediaStream``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1575:1896:FUNCTION

.. rubric:: ``anonymous callback @ 44``

.. code-block:: javascript

   anonymous callback @ 44(_, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``50`` 行；所属函数 ``waitForMicrophoneReady``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1640:1851:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 45``

.. code-block:: javascript

   globalThis.setTimeout callback @ 45()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``49`` 行；所属函数 ``anonymous callback @ 44``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reject``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3360:3419:FUNCTION

.. rubric:: ``useEffect callback @ 92``

.. code-block:: javascript

   useEffect callback @ 92()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``92``—``94`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3452:3504:FUNCTION

.. rubric:: ``useEffect callback @ 96``

.. code-block:: javascript

   useEffect callback @ 96()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``98`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3552:3674:FUNCTION

.. rubric:: ``useCallback callback @ 100``

.. code-block:: javascript

   useCallback callback @ 100(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``100``—``102`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3582:3666:FUNCTION

.. rubric:: ``setState callback @ 101``

.. code-block:: javascript

   setState callback @ 101(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``useCallback callback @ 100``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patch``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3726:4146:FUNCTION

.. rubric:: ``useCallback callback @ 104``

.. code-block:: javascript

   useCallback callback @ 104(status, targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``112`` 行；所属函数 ``useRealtimeVoiceConversation``。

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4202:4364:FUNCTION

.. rubric:: ``useCallback callback @ 114``

.. code-block:: javascript

   async useCallback callback @ 114()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``114``—``118`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamer.stop().catch``、``streamer.stop``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4348:4356:FUNCTION

.. rubric:: ``streamer.stop().catch callback @ 117``

.. code-block:: javascript

   streamer.stop().catch callback @ 117()

处理 ``streamer.stop().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``useCallback callback @ 114``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4413:5217:FUNCTION

.. rubric:: ``useCallback callback @ 120``

.. code-block:: javascript

   useCallback callback @ 120()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``120``—``139`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeTurnIdsRef.current.clear``、``startedTurnMessagesRef.current.clear``、``armedSpeechTurnIdsRef.current.clear``、``terminalVoiceTurnIdsRef.current.clear``、``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:5254:7650:FUNCTION

.. rubric:: ``useCallback callback @ 141``

.. code-block:: javascript

   async useCallback callback @ 141({silent = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``141``—``192`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{silent = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``、``initialState``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``stopMedia``、``clearRuntimeRefs``、``[ 'authorizing', 'connecting', 'negotiating', 'requesting_microphone', 'listening', 'disconnected', 'error', 'idle', ].…``、``applyComposerStatus``、``transport.request``、``transport.close``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:7804:10131:FUNCTION

.. rubric:: ``useCallback callback @ 194``

.. code-block:: javascript

   useCallback callback @ 194()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``194``—``240`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ messageId, requestId: currentSpeech?.requestId || streamingSnapshot?.requestId || null, segmentPosition: boundaryPosition, segmentId: boundarySegment?.id || currentSpeech?.curre…``。

**主要协作调用**：``getStreamingSpeechSnapshot``、``Boolean``、``String``、``Array.isArray``、``Number.isInteger``、``Number``、``Math.min``、``Math.max``、``String(boundarySegment?.text || '').slice``、``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10205:10432:FUNCTION

.. rubric:: ``useCallback callback @ 242``

.. code-block:: javascript

   useCallback callback @ 242()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``242``—``248`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10478:11016:FUNCTION

.. rubric:: ``useCallback callback @ 250``

.. code-block:: javascript

   useCallback callback @ 250({resumeStatus, speechWasActive, vad})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``250``—``264`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{resumeStatus, speechWasActive, vad}``
   调用方传入的 ``resumeStatus, speechWasActive, vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearBargeProbe``、``playbackCursor``、``Boolean``、``Date.now``、``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10881:10988:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 260``

.. code-block:: javascript

   globalThis.setTimeout callback @ 260()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``260``—``263`` 行；所属函数 ``useCallback callback @ 250``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11105:11599:FUNCTION

.. rubric:: ``useCallback callback @ 266``

.. code-block:: javascript

   useCallback callback @ 266(turnId, messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``266``—``278`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``turnId``
   当前 Human ↔ Agent 轮次 UUID。

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``armedSpeechTurnIdsRef.current.has``、``armedSpeechTurnIdsRef.current.add``、``beginStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11668:18195:FUNCTION

.. rubric:: ``useCallback callback @ 280``

.. code-block:: javascript

   useCallback callback @ 280(envelope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``280``—``408`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``patchState``、``terminalVoiceTurnIdsRef.current.has``、``activeTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``armStreamingSpeechForTurn``、``isSpeakingState``、``pauseActiveSpeech``、``clearBargeProbe``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``resumeActiveSpeech``、``['thinking', 'understanding'].includes``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12670:12750:FUNCTION

.. rubric:: ``patchState callback @ 301``

.. code-block:: javascript

   patchState callback @ 301(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``useCallback callback @ 280``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12972:13214:FUNCTION

.. rubric:: ``patchState callback @ 307``

.. code-block:: javascript

   patchState callback @ 307(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``307``—``311`` 行；所属函数 ``useCallback callback @ 280``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:13434:13717:FUNCTION

.. rubric:: ``patchState callback @ 317``

.. code-block:: javascript

   patchState callback @ 317(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``317``—``322`` 行；所属函数 ``useCallback callback @ 280``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:18480:30589:FUNCTION

.. rubric:: ``useCallback callback @ 420``

.. code-block:: javascript

   async useCallback callback @ 420(config)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``420``—``663`` 行；所属函数 ``useRealtimeVoiceConversation``。

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:19358:19399:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``438``—``438`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:20254:21860:FUNCTION

.. rubric:: ``onPcmChunk``

.. code-block:: javascript

   onPcmChunk(pcm, meta)

处理 ``Pcm Chunk`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``458``—``486`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

``pcm``
   调用方传入的 ``pcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``meta``
   调用方传入的 ``meta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``transportRef.current.sendAudio``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:21889:22022:FUNCTION

.. rubric:: ``onWaveform``

.. code-block:: javascript

   onWaveform(waveform)

处理 ``Waveform`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``487``—``489`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

``waveform``
   调用方传入的 ``waveform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:22053:22588:FUNCTION

.. rubric:: ``onInputEnded``

.. code-block:: javascript

   onInputEnded()

处理 ``Input Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``490``—``501`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:22620:23791:FUNCTION

.. rubric:: ``onSpeechStart``

.. code-block:: javascript

   onSpeechStart(vad)

处理 ``Speech Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``502``—``521`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

``vad``
   调用方传入的 ``vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``isSpeakingState``、``['thinking', 'understanding', 'speaking'].includes``、``armBargeProbe``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:23821:25107:FUNCTION

.. rubric:: ``onSpeechEnd``

.. code-block:: javascript

   onSpeechEnd()

处理 ``Speech End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``522``—``544`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``transportRef.current?.sendEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:26545:26682:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``577``—``579`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``handleVoiceEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:26708:27413:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``580``—``593`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:27229:27393:FUNCTION

.. rubric:: ``patchState callback @ 589``

.. code-block:: javascript

   patchState callback @ 589(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``589``—``592`` 行；所属函数 ``onClose``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:27439:28085:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``594``—``606`` 行；所属函数 ``useCallback callback @ 420``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:30829:34603:FUNCTION

.. rubric:: ``useEffect callback @ 674``

.. code-block:: javascript

   useEffect callback @ 674()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``674``—``743`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ], conversationId, direction: 'incoming', }).then(({event, pa…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ]…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:31187:34595:FUNCTION

.. rubric:: ``onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ]… callback @ 685``

.. code-block:: javascript

   onEvent({ event: [ EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED, ]… callback @ 685({event, payload, eventTurnId})

处理 ``Event({ event: [ Event Name.TURN STARTED, Event Name.TURN COMPLETED, Event Name.TURN CANCELLED, Event Name.TURN FAILED, ]…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``685``—``742`` 行；所属函数 ``useEffect callback @ 674``。

**参数**

``{event, payload, eventTurnId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``startedTurnMessagesRef.current.set``、``activeTurnIdsRef.current.add``、``activeTurnIdsRef.current.has``、``armStreamingSpeechForTurn``、``applyComposerStatus``、``terminalVoiceTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``requestStreamingSpeechFinalize``、``['user_speaking', 'understanding', 'thinking'].includes``、``patchState``、``isSpeakingState``、``cancelStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:34810:35442:FUNCTION

.. rubric:: ``useEffect callback @ 753``

.. code-block:: javascript

   useEffect callback @ 753()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``753``—``766`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``patchState``、``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35092:35424:FUNCTION

.. rubric:: ``setState callback @ 758``

.. code-block:: javascript

   setState callback @ 758(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``758``—``764`` 行；所属函数 ``useEffect callback @ 753``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{...current, status: 'listening'}``。

**主要协作调用**：``[ 'user_speaking', 'thinking', 'understanding', 'connecting', 'negotiating', 'requesting_microphone', 'error', ].includ…``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35871:35922:FUNCTION

.. rubric:: ``useEffect callback @ 773``

.. code-block:: javascript

   useEffect callback @ 773()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``773``—``775`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35948:36021:FUNCTION

.. rubric:: ``useEffect callback @ 777``

.. code-block:: javascript

   useEffect callback @ 777()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``777``—``779`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:35953:36021:FUNCTION

.. rubric:: ``anonymous callback @ 777``

.. code-block:: javascript

   anonymous callback @ 777()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``777``—``779`` 行；所属函数 ``useEffect callback @ 777``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopLatestRef.current``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:36043:36315:FUNCTION

.. rubric:: ``useEffect callback @ 781``

.. code-block:: javascript

   useEffect callback @ 781()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``781``—``787`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.warning``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:36413:38356:FUNCTION

.. rubric:: ``useCallback callback @ 789``

.. code-block:: javascript

   useCallback callback @ 789()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``789``—``826`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``streamerRef.current?.setMuted``、``clearBargeProbe``、``transportRef.current?.sendEvent``、``resumeActiveSpeech``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:37861:38348:FUNCTION

.. rubric:: ``patchState callback @ 816``

.. code-block:: javascript

   patchState callback @ 816(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``816``—``825`` 行；所属函数 ``useCallback callback @ 789``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``、``isSpeakingState``、``['thinking', 'understanding'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:38525:38564:FUNCTION

.. rubric:: ``setMinimized``

.. code-block:: javascript

   setMinimized(minimized)

设置与 ``Minimized`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``833``—``833`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``minimized``
   调用方传入的 ``minimized`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。
