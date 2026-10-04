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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:834:1136:FUNCTION

.. js:function:: initialState()

   实现 ``initialState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``35`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1162:1242:FUNCTION

.. js:function:: isSpeakingState(speechState)

   判断与 ``Speaking State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``37`` 行。

   **参数**

   ``speechState``
      调用方传入的 ``speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1355:1422:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1454:2037:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:2038:43225:FUNCTION

.. js:function:: useRealtimeVoiceConversation({ textInputEnabled = false, conversationId, speechState, beginStreamingSpeech, requestStreamingSpee…)

   封装 ``useRealtimeVoiceConversation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``58``—``920`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1398:1421:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1614:1935:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:1679:1890:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3540:3599:FUNCTION

.. rubric:: ``useEffect callback @ 95``

.. code-block:: javascript

   useEffect callback @ 95()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``95``—``97`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3632:3684:FUNCTION

.. rubric:: ``useEffect callback @ 99``

.. code-block:: javascript

   useEffect callback @ 99()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``99``—``101`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3732:3858:FUNCTION

.. rubric:: ``useCallback callback @ 103``

.. code-block:: javascript

   useCallback callback @ 103(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3762:3850:FUNCTION

.. rubric:: ``setState callback @ 104``

.. code-block:: javascript

   setState callback @ 104(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``useCallback callback @ 103``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patch``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:3910:4482:FUNCTION

.. rubric:: ``useCallback callback @ 108``

.. code-block:: javascript

   useCallback callback @ 108(status, targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``118`` 行；所属函数 ``useRealtimeVoiceConversation``。

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4552:4714:FUNCTION

.. rubric:: ``useCallback callback @ 122``

.. code-block:: javascript

   async useCallback callback @ 122()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``122``—``126`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamer.stop().catch``、``streamer.stop``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4698:4706:FUNCTION

.. rubric:: ``streamer.stop().catch callback @ 125``

.. code-block:: javascript

   streamer.stop().catch callback @ 125()

处理 ``streamer.stop().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``useCallback callback @ 122``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:4763:5567:FUNCTION

.. rubric:: ``useCallback callback @ 128``

.. code-block:: javascript

   useCallback callback @ 128()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``128``—``147`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeTurnIdsRef.current.clear``、``startedTurnMessagesRef.current.clear``、``armedSpeechTurnIdsRef.current.clear``、``terminalVoiceTurnIdsRef.current.clear``、``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:5604:8365:FUNCTION

.. rubric:: ``useCallback callback @ 150``

.. code-block:: javascript

   async useCallback callback @ 150({ silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``150``—``209`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{ silent = false }``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``、``initialState``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``stopMedia``、``clearRuntimeRefs``、``[ 'authorizing', 'connecting', 'negotiating', 'requesting_microphone', 'listening', 'disconnected', 'error', 'idle', ].…``、``applyComposerStatus``、``transport.request``、``transport.close``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:8533:10837:FUNCTION

.. rubric:: ``useCallback callback @ 213``

.. code-block:: javascript

   useCallback callback @ 213()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``213``—``255`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ messageId, requestId: currentSpeech?.requestId || streamingSnapshot?.requestId || null, segmentPosition: boundaryPosition, segmentId: boundarySegment?.id || currentSpeech?.curre…``。

**主要协作调用**：``getStreamingSpeechSnapshot``、``Boolean``、``String``、``Array.isArray``、``Number.isInteger``、``Number``、``Math.min``、``Math.max``、``String(boundarySegment?.text || '').slice``、``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:10911:11138:FUNCTION

.. rubric:: ``useCallback callback @ 257``

.. code-block:: javascript

   useCallback callback @ 257()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``257``—``263`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``globalThis.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11184:11789:FUNCTION

.. rubric:: ``useCallback callback @ 266``

.. code-block:: javascript

   useCallback callback @ 266({ resumeStatus, speechWasActive, vad })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``266``—``280`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``{ resumeStatus, speechWasActive, vad }``
   调用方传入的 ``resumeStatus, speechWasActive, vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearBargeProbe``、``playbackCursor``、``Boolean``、``Date.now``、``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11638:11757:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 276``

.. code-block:: javascript

   globalThis.setTimeout callback @ 276()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``276``—``279`` 行；所属函数 ``useCallback callback @ 266``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:11892:12482:FUNCTION

.. rubric:: ``useCallback callback @ 285``

.. code-block:: javascript

   useCallback callback @ 285(turnId, messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``297`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``turnId``
   当前 Human ↔ Agent 轮次 UUID。

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``armedSpeechTurnIdsRef.current.has``、``armedSpeechTurnIdsRef.current.add``、``beginStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:12565:19724:FUNCTION

.. rubric:: ``useCallback callback @ 302``

.. code-block:: javascript

   useCallback callback @ 302(envelope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``302``—``431`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``patchState``、``terminalVoiceTurnIdsRef.current.has``、``activeTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``armStreamingSpeechForTurn``、``isSpeakingState``、``pauseActiveSpeech``、``clearBargeProbe``、``cancelStreamingSpeech``、``cancelActiveSpeech``、``resumeActiveSpeech``、``['thinking', 'understanding'].includes``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:13664:13801:FUNCTION

.. rubric:: ``patchState callback @ 323``

.. code-block:: javascript

   patchState callback @ 323(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``323``—``325`` 行；所属函数 ``useCallback callback @ 302``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:14047:14309:FUNCTION

.. rubric:: ``patchState callback @ 331``

.. code-block:: javascript

   patchState callback @ 331(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``331``—``335`` 行；所属函数 ``useCallback callback @ 302``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:14553:14944:FUNCTION

.. rubric:: ``patchState callback @ 341``

.. code-block:: javascript

   patchState callback @ 341(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``341``—``348`` 行；所属函数 ``useCallback callback @ 302``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``generateUUID``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:20063:34321:FUNCTION

.. rubric:: ``useCallback callback @ 446``

.. code-block:: javascript

   async useCallback callback @ 446(config)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``446``—``723`` 行；所属函数 ``useRealtimeVoiceConversation``。

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

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:21020:21061:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``464``—``464`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:21990:23884:FUNCTION

.. rubric:: ``onPcmChunk``

.. code-block:: javascript

   onPcmChunk(pcm, meta)

处理 ``Pcm Chunk`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``484``—``516`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

``pcm``
   调用方传入的 ``pcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``meta``
   调用方传入的 ``meta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``transportRef.current.sendAudio``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:23917:24060:FUNCTION

.. rubric:: ``onWaveform``

.. code-block:: javascript

   onWaveform(waveform)

处理 ``Waveform`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``517``—``519`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

``waveform``
   调用方传入的 ``waveform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:24095:24676:FUNCTION

.. rubric:: ``onInputEnded``

.. code-block:: javascript

   onInputEnded()

处理 ``Input Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``520``—``531`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:24712:25985:FUNCTION

.. rubric:: ``onSpeechStart``

.. code-block:: javascript

   onSpeechStart(vad)

处理 ``Speech Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``532``—``552`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

``vad``
   调用方传入的 ``vad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``patchState``、``isSpeakingState``、``['thinking', 'understanding', 'speaking'].includes``、``armBargeProbe``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:26019:27619:FUNCTION

.. rubric:: ``onSpeechEnd``

.. code-block:: javascript

   onSpeechEnd()

处理 ``Speech End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``553``—``581`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``transportRef.current?.sendEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:29185:29330:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``614``—``616`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``handleVoiceEvent``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:29360:30362:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``617``—``637`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:30012:30312:FUNCTION

.. rubric:: ``patchState callback @ 629``

.. code-block:: javascript

   patchState callback @ 629(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``629``—``635`` 行；所属函数 ``onClose``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:30392:31181:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``638``—``653`` 行；所属函数 ``useCallback callback @ 446``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``cancelActiveSpeech``、``stopMedia``、``applyComposerStatus``、``patchState``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:34615:38485:FUNCTION

.. rubric:: ``useEffect callback @ 736``

.. code-block:: javascript

   useEffect callback @ 736()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``736``—``805`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], conversationId, direction: 'incoming', }).then(({ event, payl…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], c…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:34894:38477:FUNCTION

.. rubric:: ``onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], c… callback @ 742``

.. code-block:: javascript

   onEvent({ event: [EventName.TURN_STARTED, EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED], c… callback @ 742({ event, payload, eventTurnId })

处理 ``Event({ event: [Event Name.TURN STARTED, Event Name.TURN COMPLETED, Event Name.TURN CANCELLED, Event Name.TURN FAILED], c…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``742``—``804`` 行；所属函数 ``useEffect callback @ 736``。

**参数**

``{ event, payload, eventTurnId }``
   调用方传入的 ``event, payload, eventTurnId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``startedTurnMessagesRef.current.set``、``activeTurnIdsRef.current.add``、``activeTurnIdsRef.current.has``、``armStreamingSpeechForTurn``、``applyComposerStatus``、``terminalVoiceTurnIdsRef.current.add``、``startedTurnMessagesRef.current.get``、``requestStreamingSpeechFinalize``、``['user_speaking', 'understanding', 'thinking'].includes``、``patchState``、``isSpeakingState``、``cancelStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:38691:39575:FUNCTION

.. rubric:: ``useEffect callback @ 814``

.. code-block:: javascript

   useEffect callback @ 814()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``814``—``836`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``patchState``、``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:38975:39557:FUNCTION

.. rubric:: ``setState callback @ 819``

.. code-block:: javascript

   setState callback @ 819(current)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``819``—``834`` 行；所属函数 ``useEffect callback @ 814``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, status: current.outputOnly ? 'text_input' : 'listening' }``。

**主要协作调用**：``[ 'user_speaking', 'thinking', 'understanding', 'connecting', 'negotiating', 'requesting_microphone', 'error', ].includ…``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40004:40055:FUNCTION

.. rubric:: ``useEffect callback @ 843``

.. code-block:: javascript

   useEffect callback @ 843()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``843``—``845`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40081:40173:FUNCTION

.. rubric:: ``useEffect callback @ 848``

.. code-block:: javascript

   useEffect callback @ 848()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``848``—``850`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40095:40173:FUNCTION

.. rubric:: ``anonymous callback @ 848``

.. code-block:: javascript

   anonymous callback @ 848()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``848``—``850`` 行；所属函数 ``useEffect callback @ 848``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopLatestRef.current``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40209:40481:FUNCTION

.. rubric:: ``useEffect callback @ 854``

.. code-block:: javascript

   useEffect callback @ 854()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``854``—``860`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.warning``、``stop``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40558:40793:FUNCTION

.. rubric:: ``useEffect callback @ 862``

.. code-block:: javascript

   useEffect callback @ 862()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``862``—``868`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyComposerStatus``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:40919:43005:FUNCTION

.. rubric:: ``useCallback callback @ 870``

.. code-block:: javascript

   useCallback callback @ 870()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``870``—``911`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``streamerRef.current?.setMuted``、``clearBargeProbe``、``transportRef.current?.sendEvent``、``resumeActiveSpeech``、``patchState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:42369:42997:FUNCTION

.. rubric:: ``patchState callback @ 897``

.. code-block:: javascript

   patchState callback @ 897(current)

实现 ``patchState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``897``—``910`` 行；所属函数 ``useCallback callback @ 870``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``、``isSpeakingState``、``['thinking', 'understanding'].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/useRealtimeVoiceConversation.js:43174:43215:FUNCTION

.. rubric:: ``setMinimized``

.. code-block:: javascript

   setMinimized(minimized)

设置与 ``Minimized`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``918``—``918`` 行；所属函数 ``useRealtimeVoiceConversation``。

**参数**

``minimized``
   调用方传入的 ``minimized`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchState``。
