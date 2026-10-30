src/features/chat/ChatPage 模块
================================================================================

.. js:module:: src/features/chat/ChatPage

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ChatPage.jsx``
* **模块标识**：``src/features/chat/ChatPage``
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：277

主要依赖
--------------------------------------------------------------------------------

``./page/utils/messageStreamBatch.js``、``./page/openChatWindow.js``、``lucide-react``、``react``、``framer-motion``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``@/context/useEventStore.jsx``、``react-i18next``、``react-router-dom``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/RuntimeInspectorDialog.jsx``、``@/features/chat/page/hooks/useRuntimeInspector.js``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``./freeze/useConversationFreeze.js``、``./freeze/ConversationFreezeNotice.jsx``、``./freeze/ConversationFreezeContext.jsx``、``@/features/execution``、``@/features/workspace/useWorkspaceTransferStore.js``、``./attachmentVision.js``、``./modelCapabilities.js``、``./widgets/WidgetPresentationContext.jsx``、``./voice/index.js``、``./page/components/ChatHistoryViewport.jsx``、``@/features/avatar-scene/AvatarScenePanel.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3599:3699:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``85`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3748:3889:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``87``—``90`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3934:4175:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``92``—``98`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4306:4472:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``104``—``108`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4497:4550:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``110``—``110`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4580:4735:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``112``—``115`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${baseEndpoint}/${encodeURIComponent(String(id))}\x60``。

   **主要协作调用**：``String(endpoint || '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4756:4922:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``122`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4946:4998:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``124`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5025:5125:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``126``—``129`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ text: String(data.text ?? '') }``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5149:5294:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``131``—``134`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5325:5925:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``136``—``154`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], { type: ASR_AUDIO_MIME_TYPE }) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], { type: ASR_AUDIO_MIME_TYPE }) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5957:6101:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``156``—``159`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``translated && translated !== key ? translated : fallback``。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6102:179140:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``162``—``3990`` 行。

   **参数**

   ``{ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…``
      调用方传入的 ``conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ConversationFreezeContext.Provider value={conversationFreeze}> <WidgetPresentationProvider chatBoxHostElement={widgetChatBoxHostElement}> <> <Motion.div ref={windowRef} data-ch…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useLocation``、``useConversationFreeze``、``/^\/chat-window(?:\/|$)/.test``、``/^\/doc(?:\/|$)/.test``、``/^\/chat(?:\/|$)/.test``、``routeLocation.pathname.endsWith``、``useRef``、``generateUUID``、``useState``、``useImmer``、``useLocalSetting``。

   **内部回调数量**：104。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4334:4471:FUNCTION

.. rubric:: ``anonymous callback @ 105``

.. code-block:: javascript

   anonymous callback @ 105(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``108`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11554:11592:FUNCTION

.. rubric:: ``useState callback @ 267``

.. code-block:: javascript

   useState callback @ 267()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11967:12557:FUNCTION

.. rubric:: ``useCallback callback @ 274``

.. code-block:: javascript

   useCallback callback @ 274(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``274``—``284`` 行；所属函数 ``ChatPage``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationMeta``、``modelCatalogRef.current.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12094:12178:FUNCTION

.. rubric:: ``setConversationMeta callback @ 276``

.. code-block:: javascript

   setConversationMeta callback @ 276(current)

设置与 ``Conversation Meta`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``276``—``276`` 行；所属函数 ``useCallback callback @ 274``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12232:12274:FUNCTION

.. rubric:: ``modelCatalogRef.current.find callback @ 277``

.. code-block:: javascript

   modelCatalogRef.current.find callback @ 277(entry)

作为 ``modelCatalogRef.current.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``useCallback callback @ 274``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12612:13267:FUNCTION

.. rubric:: ``useCallback callback @ 285``

.. code-block:: javascript

   useCallback callback @ 285()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``299`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…``、``agentConfigurationQueueRef.current .catch(() => {}) .then``、``agentConfigurationQueueRef.current .catch``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12864:12872:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch callback @ 290``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch callback @ 290()

处理 ``agentConfigurationQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12892:13186:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 291``

.. code-block:: javascript

   async agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 291()

处理 ``agentConfigurationQueueRef.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``291``—``297`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``、``applyAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13207:13259:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent… callback @ 298``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( `/chat/agent… callback @ 298(error)

实现 ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``298``—``298`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13345:14083:FUNCTION

.. rubric:: ``useCallback callback @ 301``

.. code-block:: javascript

   useCallback callback @ 301(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``313`` 行；所属函数 ``ChatPage``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``flushAgentConfiguration``、``clearTimeout``、``setTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14141:14274:FUNCTION

.. rubric:: ``useEffect callback @ 317``

.. code-block:: javascript

   useEffect callback @ 317()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``317``—``320`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14155:14274:FUNCTION

.. rubric:: ``anonymous callback @ 317``

.. code-block:: javascript

   anonymous callback @ 317()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``317``—``320`` 行；所属函数 ``useEffect callback @ 317``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``flushAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14702:14765:FUNCTION

.. rubric:: ``useEffect callback @ 330``

.. code-block:: javascript

   useEffect callback @ 330()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``330``—``332`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14800:15037:FUNCTION

.. rubric:: ``useEffect callback @ 335``

.. code-block:: javascript

   useEffect callback @ 335()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``335``—``340`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14814:15037:FUNCTION

.. rubric:: ``anonymous callback @ 335``

.. code-block:: javascript

   anonymous callback @ 335()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``335``—``340`` 行；所属函数 ``useEffect callback @ 335``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15111:16012:FUNCTION

.. rubric:: ``useCallback callback @ 344``

.. code-block:: javascript

   useCallback callback @ 344(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``344``—``361`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status || '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15719:15987:FUNCTION

.. rubric:: ``setTimeout callback @ 354``

.. code-block:: javascript

   setTimeout callback @ 354()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``354``—``359`` 行；所属函数 ``useCallback callback @ 344``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15769:15890:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 355``

.. code-block:: javascript

   setContextCompactionState callback @ 355(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``355``—``356`` 行；所属函数 ``setTimeout callback @ 354``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17391:17541:FUNCTION

.. rubric:: ``useCallback callback @ 406``

.. code-block:: javascript

   useCallback callback @ 406()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``406``—``409`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17623:17715:FUNCTION

.. rubric:: ``handleWindowMode``

.. code-block:: javascript

   handleWindowMode()

处理 ``Window Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``410``—``413`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWindowMode``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17765:18456:FUNCTION

.. rubric:: ``useCallback callback @ 415``

.. code-block:: javascript

   useCallback callback @ 415(messageIds, runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``415``—``427`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``runId`` （默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``normalizedIds.forEach``、``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17900:17937:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 417``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 417(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``useCallback callback @ 415``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18043:18104:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 421``

.. code-block:: javascript

   normalizedIds.forEach callback @ 421(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``421``—``421`` 行；所属函数 ``useCallback callback @ 415``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``liveStreamMessageIdsRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18331:18372:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 425``

.. code-block:: javascript

   normalizedIds.forEach callback @ 425(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``useCallback callback @ 415``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runMessages.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18507:19114:FUNCTION

.. rubric:: ``useCallback callback @ 429``

.. code-block:: javascript

   useCallback callback @ 429(runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``429``—``441`` 行；所属函数 ``ChatPage``。

**参数**

``runId`` （默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.delete``、``runMessages.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18836:19106:FUNCTION

.. rubric:: ``runMessages.forEach callback @ 435``

.. code-block:: javascript

   runMessages.forEach callback @ 435(messageId)

作为 ``runMessages.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``435``—``440`` 行；所属函数 ``useCallback callback @ 429``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(liveStreamRunMessagesRef.current.values()).some``、``Array.from``、``liveStreamRunMessagesRef.current.values``、``liveStreamMessageIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18943:19000:FUNCTION

.. rubric:: ``Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 436``

.. code-block:: javascript

   Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 436(messageIds)

作为 ``Array.from(liveStreamRunMessagesRef.current.values()).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``436``—``437`` 行；所属函数 ``runMessages.forEach callback @ 435``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messageIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19174:20264:FUNCTION

.. rubric:: ``useCallback callback @ 443``

.. code-block:: javascript

   useCallback callback @ 443(messageIds)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``443``—``467`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``restoreMissingStreamTail``、``nextOrder.every``、``setMessagesOrder``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19592:19629:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 450``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 450(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``450``—``450`` 行；所属函数 ``useCallback callback @ 443``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20076:20143:FUNCTION

.. rubric:: ``nextOrder.every callback @ 461``

.. code-block:: javascript

   nextOrder.every callback @ 461(messageId, index)

作为 ``nextOrder.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``461``—``461`` 行；所属函数 ``useCallback callback @ 443``。

**参数**

``messageId``
   Message 的公共 UUID。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20313:21154:FUNCTION

.. rubric:: ``useCallback callback @ 470``

.. code-block:: javascript

   useCallback callback @ 470(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``470``—``486`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages`` （默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20382:21153:FUNCTION

.. rubric:: ``produce callback @ 471``

.. code-block:: javascript

   produce callback @ 471(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``471``—``486`` 行；所属函数 ``useCallback callback @ 470``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft || {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20445:21137:FUNCTION

.. rubric:: ``Object.keys(draft || {}).forEach callback @ 472``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 472(key)

作为 ``Object.keys(draft || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``472``—``485`` 行；所属函数 ``produce callback @ 471``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20755:20877:FUNCTION

.. rubric:: ``anonymous callback @ 478``

.. code-block:: javascript

   anonymous callback @ 478(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``478``—``480`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 472``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20929:21029:FUNCTION

.. rubric:: ``anonymous callback @ 481``

.. code-block:: javascript

   anonymous callback @ 481(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``481``—``483`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 472``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21074:21118:FUNCTION

.. rubric:: ``anonymous callback @ 484``

.. code-block:: javascript

   anonymous callback @ 484(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``484``—``484`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 472``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21221:23878:FUNCTION

.. rubric:: ``useCallback callback @ 491``

.. code-block:: javascript

   async useCallback callback @ 491({ silent = false, append = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``491``—``549`` 行；所属函数 ``ChatPage``。

**参数**

``{ silent = false, append = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24004:24443:FUNCTION

.. rubric:: ``useCallback callback @ 554``

.. code-block:: javascript

   useCallback callback @ 554(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``554``—``566`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24226:24411:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 558``

.. code-block:: javascript

   requestAnimationFrame callback @ 558()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``558``—``563`` 行；所属函数 ``useCallback callback @ 554``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24498:24716:FUNCTION

.. rubric:: ``useCallback callback @ 568``

.. code-block:: javascript

   useCallback callback @ 568(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``568``—``575`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24795:25216:FUNCTION

.. rubric:: ``useCallback callback @ 579``

.. code-block:: javascript

   useCallback callback @ 579(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``579``—``588`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``queueAgentConfiguration``、``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:25356:25470:FUNCTION

.. rubric:: ``useCallback callback @ 592``

.. code-block:: javascript

   useCallback callback @ 592(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``592``—``596`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:25933:26059:FUNCTION

.. rubric:: ``useCallback callback @ 615``

.. code-block:: javascript

   useCallback callback @ 615()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``615``—``617`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine(getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote'))``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26126:26406:FUNCTION

.. rubric:: ``useCallback callback @ 619``

.. code-block:: javascript

   useCallback callback @ 619()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``619``—``624`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage), )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26481:27580:FUNCTION

.. rubric:: ``useCallback callback @ 626``

.. code-block:: javascript

   useCallback callback @ 626({ cancel = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``626``—``659`` 行；所属函数 ``ChatPage``。

**参数**

``{ cancel = false }`` （默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({ text: '', error: null })``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \x60${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26801:27572:FUNCTION

.. rubric:: ``anonymous callback @ 635``

.. code-block:: javascript

   anonymous callback @ 635(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``635``—``658`` 行；所属函数 ``useCallback callback @ 626``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26875:27178:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``637``—``643`` 行；所属函数 ``anonymous callback @ 635``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\x60${session.finalTranscript} ${session.interimTranscript}\x60.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27642:29470:FUNCTION

.. rubric:: ``useCallback callback @ 661``

.. code-block:: javascript

   useCallback callback @ 661()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``661``—``716`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28397:29011:FUNCTION

.. rubric:: ``anonymous callback @ 683``

.. code-block:: javascript

   anonymous callback @ 683(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``683``—``698`` 行；所属函数 ``useCallback callback @ 661``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${session.finalTranscript} ${transcript}\x60.trim``、``\x60${interimTranscript} ${transcript}\x60.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29043:29117:FUNCTION

.. rubric:: ``anonymous callback @ 700``

.. code-block:: javascript

   anonymous callback @ 700(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``700``—``702`` 行；所属函数 ``useCallback callback @ 661``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29147:29156:FUNCTION

.. rubric:: ``anonymous callback @ 704``

.. code-block:: javascript

   anonymous callback @ 704()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``useCallback callback @ 661``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29595:30133:FUNCTION

.. rubric:: ``useCallback callback @ 718``

.. code-block:: javascript

   useCallback callback @ 718()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``718``—``734`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ engine: 'remote' }``、``{ engine: 'remote', fallback: true }``、``{ engine: 'local' }``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30254:33487:FUNCTION

.. rubric:: ``useCallback callback @ 737``

.. code-block:: javascript

   async useCallback callback @ 737(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``737``—``822`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33554:34420:FUNCTION

.. rubric:: ``useCallback callback @ 827``

.. code-block:: javascript

   async useCallback callback @ 827(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``827``—``849`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ text }``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34585:34714:FUNCTION

.. rubric:: ``useCallback callback @ 853``

.. code-block:: javascript

   useCallback callback @ 853()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``853``—``856`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35230:35347:FUNCTION

.. rubric:: ``useCallback callback @ 872``

.. code-block:: javascript

   useCallback callback @ 872()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``872``—``874`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35402:35513:FUNCTION

.. rubric:: ``useCallback callback @ 876``

.. code-block:: javascript

   useCallback callback @ 876(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``876``—``878`` 行；所属函数 ``ChatPage``。

**参数**

``duration`` （默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35568:35970:FUNCTION

.. rubric:: ``useCallback callback @ 880``

.. code-block:: javascript

   useCallback callback @ 880()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``880``—``889`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36096:36339:FUNCTION

.. rubric:: ``useCallback callback @ 891``

.. code-block:: javascript

   useCallback callback @ 891()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``891``—``897`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36549:36970:FUNCTION

.. rubric:: ``useCallback callback @ 900``

.. code-block:: javascript

   useCallback callback @ 900()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``900``—``908`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36992:37103:FUNCTION

.. rubric:: ``useEffect callback @ 910``

.. code-block:: javascript

   useEffect callback @ 910()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``910``—``913`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``cancelAfterRenderScroll``。

**主要协作调用**：``cancelAfterRenderScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37243:39440:FUNCTION

.. rubric:: ``useCallback callback @ 917``

.. code-block:: javascript

   useCallback callback @ 917(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``917``—``970`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll`` （默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelAfterRenderScroll``、``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37507:38650:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``922``—``949`` 行；所属函数 ``useCallback callback @ 917``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38686:39244:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``951``—``963`` 行；所属函数 ``useCallback callback @ 917``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38860:39228:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 954``

.. code-block:: javascript

   requestAnimationFrame callback @ 954()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``954``—``962`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39089:39208:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 958``

.. code-block:: javascript

   requestAnimationFrame callback @ 958()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``958``—``961`` 行；所属函数 ``requestAnimationFrame callback @ 954``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39847:40236:FUNCTION

.. rubric:: ``useCallback callback @ 984``

.. code-block:: javascript

   useCallback callback @ 984()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``984``—``994`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42070:42142:FUNCTION

.. rubric:: ``useEffect callback @ 1046``

.. code-block:: javascript

   useEffect callback @ 1046()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1046``—``1048`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42310:42403:FUNCTION

.. rubric:: ``useCallback callback @ 1050``

.. code-block:: javascript

   useCallback callback @ 1050()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1050``—``1053`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42378:42395:FUNCTION

.. rubric:: ``setAvatarSceneOpen callback @ 1052``

.. code-block:: javascript

   setAvatarSceneOpen callback @ 1052(value)

设置与 ``Avatar Scene Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1052``—``1052`` 行；所属函数 ``useCallback callback @ 1050``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42455:42497:FUNCTION

.. rubric:: ``useCallback callback @ 1054``

.. code-block:: javascript

   useCallback callback @ 1054()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1054``—``1054`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42479:42496:FUNCTION

.. rubric:: ``setAvatarExpanded callback @ 1054``

.. code-block:: javascript

   setAvatarExpanded callback @ 1054(value)

设置与 ``Avatar Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1054``—``1054`` 行；所属函数 ``useCallback callback @ 1054``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42545:42627:FUNCTION

.. rubric:: ``useCallback callback @ 1055``

.. code-block:: javascript

   useCallback callback @ 1055()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1055``—``1058`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43022:43094:FUNCTION

.. rubric:: ``useEffect callback @ 1072``

.. code-block:: javascript

   useEffect callback @ 1072()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1072``—``1074`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43259:43354:FUNCTION

.. rubric:: ``useEffect callback @ 1077``

.. code-block:: javascript

   useEffect callback @ 1077()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1077``—``1079`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``freezeVoiceStop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43529:43675:FUNCTION

.. rubric:: ``useEffect callback @ 1082``

.. code-block:: javascript

   useEffect callback @ 1082()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1082``—``1085`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43987:44031:FUNCTION

.. rubric:: ``useEffect callback @ 1090``

.. code-block:: javascript

   useEffect callback @ 1090()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1090``—``1092`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44104:44975:FUNCTION

.. rubric:: ``useCallback callback @ 1094``

.. code-block:: javascript

   async useCallback callback @ 1094()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1094``—``1114`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45031:45786:FUNCTION

.. rubric:: ``useCallback callback @ 1117``

.. code-block:: javascript

   async useCallback callback @ 1117(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1117``—``1135`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45870:46961:FUNCTION

.. rubric:: ``useCallback callback @ 1140``

.. code-block:: javascript

   async useCallback callback @ 1140(storyId, partId, changes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1140``—``1163`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

``partId``
   目标对象的公共或运行时标识。

``changes``
   调用方传入的 ``changes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``data``。

**显式抛出**：``new Error(t('story_media_save_failed', '保存失败，请重试。'))``。

**主要协作调用**：``t``、``apiClient.patch``、``setStories``、``setActiveStory``、``toast.success``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46300:46429:FUNCTION

.. rubric:: ``setStories callback @ 1148``

.. code-block:: javascript

   setStories callback @ 1148(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1148``—``1149`` 行；所属函数 ``useCallback callback @ 1140``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46341:46428:FUNCTION

.. rubric:: ``current.map callback @ 1149``

.. code-block:: javascript

   current.map callback @ 1149(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1149``—``1149`` 行；所属函数 ``setStories callback @ 1148``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46473:46862:FUNCTION

.. rubric:: ``setActiveStory callback @ 1151``

.. code-block:: javascript

   setActiveStory callback @ 1151(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1151``—``1160`` 行；所属函数 ``useCallback callback @ 1140``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, ...nextStory, parts: (current.parts || []).map((item) => Number(item.partId) === Number(partId) ? data.part : item, ), }``。

**主要协作调用**：``Number``、``(current.parts || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46714:46805:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1156``

.. code-block:: javascript

   (current.parts || []).map callback @ 1156(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1156``—``1157`` 行；所属函数 ``setActiveStory callback @ 1151``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47036:48348:FUNCTION

.. rubric:: ``useCallback callback @ 1168``

.. code-block:: javascript

   async useCallback callback @ 1168(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1168``—``1198`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

``title``
   调用方传入的 ``title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``nextStory``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.patch``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47501:47690:FUNCTION

.. rubric:: ``setStories callback @ 1178``

.. code-block:: javascript

   setStories callback @ 1178(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1178``—``1181`` 行；所属函数 ``useCallback callback @ 1168``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47550:47663:FUNCTION

.. rubric:: ``current.map callback @ 1179``

.. code-block:: javascript

   current.map callback @ 1179(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1179``—``1180`` 行；所属函数 ``setStories callback @ 1178``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47750:47872:FUNCTION

.. rubric:: ``setActiveStory callback @ 1183``

.. code-block:: javascript

   setActiveStory callback @ 1183(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1183``—``1184`` 行；所属函数 ``useCallback callback @ 1168``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48423:49525:FUNCTION

.. rubric:: ``useCallback callback @ 1203``

.. code-block:: javascript

   async useCallback callback @ 1203(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1203``—``1228`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48733:48812:FUNCTION

.. rubric:: ``setStories callback @ 1209``

.. code-block:: javascript

   setStories callback @ 1209(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1209``—``1209`` 行；所属函数 ``useCallback callback @ 1203``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48761:48811:FUNCTION

.. rubric:: ``current.filter callback @ 1209``

.. code-block:: javascript

   current.filter callback @ 1209(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1209``—``1209`` 行；所属函数 ``setStories callback @ 1209``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48846:49096:FUNCTION

.. rubric:: ``setActiveStory callback @ 1210``

.. code-block:: javascript

   setActiveStory callback @ 1210(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1210``—``1216`` 行；所属函数 ``useCallback callback @ 1203``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49603:49932:FUNCTION

.. rubric:: ``useCallback callback @ 1233``

.. code-block:: javascript

   useCallback callback @ 1233(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1233``—``1240`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \x60story:${story.storyId}:part:${part.partId}\x60, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50019:50066:FUNCTION

.. rubric:: ``useCallback callback @ 1244``

.. code-block:: javascript

   useCallback callback @ 1244()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1244``—``1246`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50106:50236:FUNCTION

.. rubric:: ``useEffect callback @ 1248``

.. code-block:: javascript

   useEffect callback @ 1248()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1248``—``1253`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStories``、``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50285:53992:FUNCTION

.. rubric:: ``useEffect callback @ 1256``

.. code-block:: javascript

   useEffect callback @ 1256()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1256``—``1329`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50513:53991:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261({ event, payload })

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1261``—``1329`` 行；所属函数 ``useEffect callback @ 1256``。

**参数**

``{ event, payload }``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50870:50943:FUNCTION

.. rubric:: ``setStories callback @ 1269``

.. code-block:: javascript

   setStories callback @ 1269(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1269``—``1269`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50898:50942:FUNCTION

.. rubric:: ``current.filter callback @ 1269``

.. code-block:: javascript

   current.filter callback @ 1269(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1269``—``1269`` 行；所属函数 ``setStories callback @ 1269``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50981:51249:FUNCTION

.. rubric:: ``setActiveStory callback @ 1270``

.. code-block:: javascript

   setActiveStory callback @ 1270(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1270``—``1276`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51726:52249:FUNCTION

.. rubric:: ``loadStories().then callback @ 1287``

.. code-block:: javascript

   loadStories().then callback @ 1287(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1287``—``1297`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51779:52225:FUNCTION

.. rubric:: ``setActiveStory callback @ 1288``

.. code-block:: javascript

   setActiveStory callback @ 1288(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1288``—``1296`` 行；所属函数 ``loadStories().then callback @ 1287``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51917:51975:FUNCTION

.. rubric:: ``values.some callback @ 1290``

.. code-block:: javascript

   values.some callback @ 1290(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1290``—``1290`` 行；所属函数 ``setActiveStory callback @ 1288``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52298:52879:FUNCTION

.. rubric:: ``setStories callback @ 1300``

.. code-block:: javascript

   setStories callback @ 1300(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1300``—``1310`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52365:52429:FUNCTION

.. rubric:: ``current.findIndex callback @ 1301``

.. code-block:: javascript

   current.findIndex callback @ 1301(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1301``—``1301`` 行；所属函数 ``setStories callback @ 1300``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52913:53975:FUNCTION

.. rubric:: ``setActiveStory callback @ 1311``

.. code-block:: javascript

   setActiveStory callback @ 1311(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1311``—``1328`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1261``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort``、``existing.filter``、``(current.parts || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53489:53532:FUNCTION

.. rubric:: ``existing.filter callback @ 1319``

.. code-block:: javascript

   existing.filter callback @ 1319(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1319``—``1319`` 行；所属函数 ``setActiveStory callback @ 1311``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53552:53614:FUNCTION

.. rubric:: ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1320``

.. code-block:: javascript

   [...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1320(a, b)

作为 ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1320``—``1320`` 行；所属函数 ``setActiveStory callback @ 1311``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53783:53874:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1323``

.. code-block:: javascript

   (current.parts || []).map callback @ 1323(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1323``—``1324`` 行；所属函数 ``setActiveStory callback @ 1311``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54129:56243:FUNCTION

.. rubric:: ``useCallback callback @ 1335``

.. code-block:: javascript

   useCallback callback @ 1335(msgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1335``—``1394`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``toast.error``、``t``、``streamBatchRef.current?.flush``、``currentOrder.indexOf``、``Array.isArray``、``oldChildren.indexOf``、``oldChildren.filter``、``setMessages``、``loadSwitchMessage``、``currentOrder.slice``、``setMessagesOrder``、``scrollToBottomAfterRender``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55229:55259:FUNCTION

.. rubric:: ``oldChildren.filter callback @ 1363``

.. code-block:: javascript

   oldChildren.filter callback @ 1363(childId)

作为 ``oldChildren.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1363``—``1363`` 行；所属函数 ``useCallback callback @ 1335``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56437:57349:FUNCTION

.. rubric:: ``useCallback callback @ 1400``

.. code-block:: javascript

   async useCallback callback @ 1400(targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1400``—``1420`` 行；所属函数 ``ChatPage``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``workspaceIds``。

**主要协作调用**：``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…``、``Array.isArray``、``apiClient.put``、``encodeURIComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56937:56972:FUNCTION

.. rubric:: ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1410``

.. code-block:: javascript

   (Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1410(item)

实现 ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1410``—``1410`` 行；所属函数 ``useCallback callback @ 1400``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57435:64704:FUNCTION

.. rubric:: ``useCallback callback @ 1425``

.. code-block:: javascript

   useCallback callback @ 1425({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1425``—``1574`` 行；所属函数 ``ChatPage``。

**参数**

``{ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…``
   调用方传入的 ``messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({success: false, value: t('conversationFreeze.frozen')})``、``undefined``、``Promise.resolve({ success: false, value: t('is_generating_try_later') })``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus, }, }) .then((payload) => { if (payload.success) { // Mark t…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``error``。

**主要协作调用**：``canMutateConversation``、``Promise.resolve``、``t``、``toast.error``、``normalizeAttachmentList``、``String(messageContent ?? '').trim``、``String``、``['saving', 'pending', 'recovering'].includes``、``generateUUID``、``setTurnSubmission``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,…``、``emitEvent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58508:61407:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1455``—``1513`` 行；所属函数 ``useCallback callback @ 1425``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(); if (!generatesReply || payload.value?.admissionAction ===…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(…``、``emitEvent(eventPayload).then``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60323:61279:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1493``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1493(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1493``—``1509`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...payload, conversationId, }``。

**主要协作调用**：``generateUUID``、``releaseSubmission``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61287:61391:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1509``

.. code-block:: javascript

   emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1509(error)

发送事件与 ``Event(event Payload).then((payload) => { if (payload.success) { current Turn Idempotency Key Ref.current = generate UUID(…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1509``—``1512`` 行；所属函数 ``sendMessage``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``releaseSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62143:62375:FUNCTION

.. rubric:: ``releaseSubmission``

.. code-block:: javascript

   releaseSubmission()

实现 ``releaseSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1523``—``1528`` 行；所属函数 ``useCallback callback @ 1425``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62912:64166:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1542``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1542(payload)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1542``—``1561`` 行；所属函数 ``useCallback callback @ 1425``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``persistPendingWorkspaceSelection(payload.value).then(() => sendMessage(payload.value), )``。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection(payload.value).then``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63905:63973:FUNCTION

.. rubric:: ``persistPendingWorkspaceSelection(payload.value).then callback @ 1555``

.. code-block:: javascript

   persistPendingWorkspaceSelection(payload.value).then callback @ 1555()

处理 ``persistPendingWorkspaceSelection(payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1555``—``1556`` 行；所属函数 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1542``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64199:64483:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1562``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1562(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1562``—``1566`` 行；所属函数 ``useCallback callback @ 1425``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ success: false, value: error?.message || String(error) }``。

**主要协作调用**：``releaseSubmission``、``toast.error``、``t``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65107:68658:FUNCTION

.. rubric:: ``useCallback callback @ 1591``

.. code-block:: javascript

   async useCallback callback @ 1591({ toolsStatus = {}, composerStatus = 'normal' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1591``—``1663`` 行；所属函数 ``ChatPage``。

**参数**

``{ toolsStatus = {}, composerStatus = 'normal' }`` （默认值 ``{}``）
   调用方传入的 ``toolsStatus = , composerStatus = 'normal'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**显式抛出**：``new Error(payload?.value || 'Unable to create conversation')``。

**主要协作调用**：``canMutateConversation``、``toast.error``、``t``、``setIsSidebarOpen``、``startForConversation``、``generateUUID``、``emitEvent``、``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66329:66853:FUNCTION

.. rubric:: ``startForConversation``

.. code-block:: javascript

   async startForConversation(targetConversationId)

启动与 ``For Conversation`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1617``—``1628`` 行；所属函数 ``useCallback callback @ 1591``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.start``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69054:71940:FUNCTION

.. rubric:: ``useCallback callback @ 1679``

.. code-block:: javascript

   async useCallback callback @ 1679()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1679``—``1745`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69713:71565:FUNCTION

.. rubric:: ``anonymous callback @ 1694``

.. code-block:: javascript

   async anonymous callback @ 1694()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1694``—``1734`` 行；所属函数 ``useCallback callback @ 1679``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70429:70469:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1708``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1708(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1708``—``1708`` 行；所属函数 ``anonymous callback @ 1694``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70998:71103:FUNCTION

.. rubric:: ``anonymous callback @ 1722``

.. code-block:: javascript

   anonymous callback @ 1722(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1722``—``1724`` 行；所属函数 ``anonymous callback @ 1694``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71051:71087:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1723``

.. code-block:: javascript

   requestAnimationFrame callback @ 1723()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1723``—``1723`` 行；所属函数 ``anonymous callback @ 1722``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71577:71857:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1734``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1734()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1734``—``1741`` 行；所属函数 ``useCallback callback @ 1679``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72157:73172:FUNCTION

.. rubric:: ``useEffect callback @ 1755``

.. code-block:: javascript

   useEffect callback @ 1755()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1755``—``1782`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72623:72919:FUNCTION

.. rubric:: ``anonymous callback @ 1767``

.. code-block:: javascript

   anonymous callback @ 1767(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1767``—``1772`` 行；所属函数 ``useEffect callback @ 1755``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72685:72716:FUNCTION

.. rubric:: ``entries.some callback @ 1768``

.. code-block:: javascript

   entries.some callback @ 1768(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1768``—``1768`` 行；所属函数 ``anonymous callback @ 1767``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72767:72903:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1769``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1769(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1769``—``1771`` 行；所属函数 ``anonymous callback @ 1767``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73137:73165:FUNCTION

.. rubric:: ``returned callback @ 1781``

.. code-block:: javascript

   returned callback @ 1781()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1781``—``1781`` 行；所属函数 ``useEffect callback @ 1755``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73299:74307:FUNCTION

.. rubric:: ``useCallback callback @ 1785``

.. code-block:: javascript

   useCallback callback @ 1785(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1785``—``1804`` 行；所属函数 ``ChatPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``behavior`` （默认值 ``'smooth'``）
   调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``CSS.escape``、``String``、``container.querySelector``、``setShowScrollToBottomButton``、``setActiveVisibleMessageId``、``setHighlightedMessageId``、``element.scrollIntoView``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74139:74264:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1800``

.. code-block:: javascript

   window.setTimeout callback @ 1800()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1800``—``1802`` 行；所属函数 ``useCallback callback @ 1785``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74187:74248:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1801``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1801(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1801``—``1801`` 行；所属函数 ``window.setTimeout callback @ 1800``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74444:76432:FUNCTION

.. rubric:: ``useCallback callback @ 1808``

.. code-block:: javascript

   async useCallback callback @ 1808()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1808``—``1852`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75957:76235:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1839``

.. code-block:: javascript

   requestAnimationFrame callback @ 1839()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1839``—``1846`` 行；所属函数 ``useCallback callback @ 1808``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76003:76219:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1840``

.. code-block:: javascript

   requestAnimationFrame callback @ 1840()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1840``—``1845`` 行；所属函数 ``requestAnimationFrame callback @ 1839``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76690:76952:FUNCTION

.. rubric:: ``useEffect callback @ 1864``

.. code-block:: javascript

   useEffect callback @ 1864()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1864``—``1871`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76778:76945:FUNCTION

.. rubric:: ``returned callback @ 1866``

.. code-block:: javascript

   returned callback @ 1866()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1866``—``1870`` 行；所属函数 ``useEffect callback @ 1864``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77019:80333:FUNCTION

.. rubric:: ``useCallback callback @ 1874``

.. code-block:: javascript

   async useCallback callback @ 1874(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1874``—``1941`` 行；所属函数 ``ChatPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``await loadTargetWindow(summaryItems, messageSummaryFingerprintRef.current)``、``await loadTargetWindow(refreshedItems, messageSummaryFingerprintRef.current)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**显式抛出**：``error``。

**主要协作调用**：``scrollToRenderedMessage``、``summaryItems.some``、``loadMessageSummaries``、``loadTargetWindow``、``Number``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77196:79474:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1879``—``1922`` 行；所属函数 ``useCallback callback @ 1874``。

**参数**

``summaryItems``
   调用方传入的 ``summaryItems`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``expectedOrderFingerprint``
   调用方传入的 ``expectedOrderFingerprint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error(t('jump_to_message_failed') || '跳转消息失败')``。

**主要协作调用**：``summaryItems.findIndex``、``t``、``Math.max``、``Math.min``、``summaryItems.slice(start, end).map``、``summaryItems.slice``、``apiClient.post``、``streamBatchRef.current?.flush``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``setHistoryAutoLoadReady``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77309:77347:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1880``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1880(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1880``—``1880`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77734:77758:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1887``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1887(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1887``—``1887`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79153:79266:FUNCTION

.. rubric:: ``anonymous callback @ 1915``

.. code-block:: javascript

   anonymous callback @ 1915(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1915``—``1917`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79210:79246:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1916``

.. code-block:: javascript

   requestAnimationFrame callback @ 1916()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1916``—``1916`` 行；所属函数 ``anonymous callback @ 1915``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79598:79636:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1926``

.. code-block:: javascript

   summaryItems.some callback @ 1926(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1926``—``1926`` 行；所属函数 ``useCallback callback @ 1874``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80654:81305:FUNCTION

.. rubric:: ``useEffect callback @ 1955``

.. code-block:: javascript

   useEffect callback @ 1955()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1955``—``1969`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81122:81297:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1964``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1964(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1964``—``1968`` 行；所属函数 ``useEffect callback @ 1955``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81452:85266:FUNCTION

.. rubric:: ``useCallback callback @ 1972``

.. code-block:: javascript

   async useCallback callback @ 1972(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1972``—``2064`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``newMsgId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``streamBatchRef.current?.flush``、``newOrders.push``、``apiClient.get``、``decorateMessages``、``messagesOrderRef.current.indexOf``、``messagesOrderRef.current.slice``、``setMessagesOrder``、``toast.error``、``t``、``produce``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83950:85131:FUNCTION

.. rubric:: ``produce callback @ 2026``

.. code-block:: javascript

   produce callback @ 2026(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2026``—``2059`` 行；所属函数 ``useCallback callback @ 1972``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84617:84739:FUNCTION

.. rubric:: ``anonymous callback @ 2045``

.. code-block:: javascript

   anonymous callback @ 2045(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2045``—``2047`` 行；所属函数 ``produce callback @ 2026``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84822:84922:FUNCTION

.. rubric:: ``anonymous callback @ 2050``

.. code-block:: javascript

   anonymous callback @ 2050(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2050``—``2052`` 行；所属函数 ``produce callback @ 2026``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84998:85098:FUNCTION

.. rubric:: ``anonymous callback @ 2055``

.. code-block:: javascript

   anonymous callback @ 2055(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2055``—``2057`` 行；所属函数 ``produce callback @ 2026``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85374:86705:FUNCTION

.. rubric:: ``useCallback callback @ 2069``

.. code-block:: javascript

   async useCallback callback @ 2069(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2069``—``2100`` 行；所属函数 ``ChatPage``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``msgId``
   目标对象的公共或运行时标识。

``targetMessageOrDelta``
   调用方传入的 ``targetMessageOrDelta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``error``。

**主要协作调用**：``canMutateConversation``、``msg.messages.indexOf``、``emitEvent``、``t``、``loadSwitchMessage``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86838:87943:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded(isCurrent)

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2104``—``2130`` 行；所属函数 ``ChatPage``。

**参数**

``isCurrent`` （默认值 ``() => true``）
   调用方传入的 ``isCurrent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86851:86862:FUNCTION

.. rubric:: ``anonymous callback @ 2104``

.. code-block:: javascript

   anonymous callback @ 2104()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2104``—``2104`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86888:87932:FUNCTION

.. rubric:: ``setTimeout callback @ 2105``

.. code-block:: javascript

   setTimeout callback @ 2105()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2105``—``2129`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87482:87588:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2118``—``2120`` 行；所属函数 ``setTimeout callback @ 2105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87610:87920:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2121``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2121(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2121``—``2128`` 行；所属函数 ``setTimeout callback @ 2105``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87960:90074:FUNCTION

.. rubric:: ``useEffect callback @ 2132``

.. code-block:: javascript

   useEffect callback @ 2132()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2132``—``2194`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:88161:89215:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2139``—``2165`` 行；所属函数 ``useEffect callback @ 2132``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:88538:89203:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2148``

.. code-block:: javascript

   requestAnimationFrame callback @ 2148()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2148``—``2164`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89315:89495:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2169``—``2173`` 行；所属函数 ``useEffect callback @ 2132``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89652:89766:FUNCTION

.. rubric:: ``anonymous callback @ 2178``

.. code-block:: javascript

   anonymous callback @ 2178()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2178``—``2181`` 行；所属函数 ``useEffect callback @ 2132``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89872:90067:FUNCTION

.. rubric:: ``returned callback @ 2187``

.. code-block:: javascript

   returned callback @ 2187()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2187``—``2193`` 行；所属函数 ``useEffect callback @ 2132``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90322:93676:FUNCTION

.. rubric:: ``useEffect callback @ 2204``

.. code-block:: javascript

   useEffect callback @ 2204()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2204``—``2290`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90556:90664:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2211``—``2213`` 行；所属函数 ``useEffect callback @ 2204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90694:91014:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2215``—``2223`` 行；所属函数 ``useEffect callback @ 2204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91049:91140:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2225``—``2227`` 行；所属函数 ``useEffect callback @ 2204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91174:91819:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2229``—``2246`` 行；所属函数 ``useEffect callback @ 2204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91850:93025:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2248``—``2277`` 行；所属函数 ``useEffect callback @ 2204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93371:93669:FUNCTION

.. rubric:: ``returned callback @ 2284``

.. code-block:: javascript

   returned callback @ 2284()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2284``—``2289`` 行；所属函数 ``useEffect callback @ 2204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93871:94336:FUNCTION

.. rubric:: ``useEffect callback @ 2298``

.. code-block:: javascript

   useEffect callback @ 2298()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2298``—``2311`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94018:94318:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2300``

.. code-block:: javascript

   requestAnimationFrame callback @ 2300()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2300``—``2309`` 行；所属函数 ``useEffect callback @ 2298``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94571:95027:FUNCTION

.. rubric:: ``useEffect callback @ 2321``

.. code-block:: javascript

   useEffect callback @ 2321()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2321``—``2332`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95063:95201:FUNCTION

.. rubric:: ``useEffect callback @ 2334``

.. code-block:: javascript

   useEffect callback @ 2334()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2334``—``2338`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95327:95570:FUNCTION

.. rubric:: ``useCallback callback @ 2340``

.. code-block:: javascript

   useCallback callback @ 2340()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2340``—``2347`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95716:95837:FUNCTION

.. rubric:: ``useCallback callback @ 2350``

.. code-block:: javascript

   useCallback callback @ 2350(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2350``—``2352`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95962:96205:FUNCTION

.. rubric:: ``useCallback callback @ 2356``

.. code-block:: javascript

   async useCallback callback @ 2356()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2356``—``2361`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96393:97484:FUNCTION

.. rubric:: ``useEffect callback @ 2369``

.. code-block:: javascript

   useEffect callback @ 2369()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2369``—``2396`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96700:96742:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2378``

.. code-block:: javascript

   messagesOrder.filter callback @ 2378(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2378``—``2378`` 行；所属函数 ``useEffect callback @ 2369``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96998:97367:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2383``

.. code-block:: javascript

   window.setTimeout callback @ 2383()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2383``—``2391`` 行；所属函数 ``useEffect callback @ 2369``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({ silent: true, append: true }).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97076:97355:FUNCTION

.. rubric:: ``loadMessageSummaries({ silent: true, append: true }).then callback @ 2384``

.. code-block:: javascript

   loadMessageSummaries({ silent: true, append: true }).then callback @ 2384(items)

处理 ``loadMessageSummaries({ silent: true, append: true }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2384``—``2390`` 行；所属函数 ``window.setTimeout callback @ 2383``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97389:97477:FUNCTION

.. rubric:: ``returned callback @ 2392``

.. code-block:: javascript

   returned callback @ 2392()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2392``—``2395`` 行；所属函数 ``useEffect callback @ 2369``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97688:98196:FUNCTION

.. rubric:: ``useEffect callback @ 2405``

.. code-block:: javascript

   useEffect callback @ 2405()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2405``—``2417`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97798:97855:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2408``—``2408`` 行；所属函数 ``useEffect callback @ 2405``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98076:98189:FUNCTION

.. rubric:: ``returned callback @ 2413``

.. code-block:: javascript

   returned callback @ 2413()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2413``—``2416`` 行；所属函数 ``useEffect callback @ 2405``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98230:100290:FUNCTION

.. rubric:: ``useEffect callback @ 2419``

.. code-block:: javascript

   useEffect callback @ 2419()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2419``—``2463`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98400:99787:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2424``—``2452`` 行；所属函数 ``useEffect callback @ 2419``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98518:99775:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2426``

.. code-block:: javascript

   requestAnimationFrame callback @ 2426()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2426``—``2451`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map((element) => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99273:99324:FUNCTION

.. rubric:: ``elements .map callback @ 2440``

.. code-block:: javascript

   elements .map callback @ 2440(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2440``—``2440`` 行；所属函数 ``requestAnimationFrame callback @ 2426``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99356:99407:FUNCTION

.. rubric:: ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2441``

.. code-block:: javascript

   elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2441(element)

作为 ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2441``—``2441`` 行；所属函数 ``requestAnimationFrame callback @ 2426``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99685:99741:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2449``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2449(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2449``—``2449`` 行；所属函数 ``requestAnimationFrame callback @ 2426``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100084:100283:FUNCTION

.. rubric:: ``returned callback @ 2458``

.. code-block:: javascript

   returned callback @ 2458()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2458``—``2462`` 行；所属函数 ``useEffect callback @ 2419``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100325:133855:FUNCTION

.. rubric:: ``useEffect callback @ 2465``

.. code-block:: javascript

   useEffect callback @ 2465()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2465``—``3104`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { streamBatch.flush(); if (streamBatchRef.current === streamBatch) streamBatchRef.current = null; unsubscribe1(); unsubscribe2(); unsubscribe3(); }``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``createMessageStreamBatch``、``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ…``、``onEvent``、``onEvent({ event: 'transport.connected', }).then``、``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100412:100438:FUNCTION

.. rubric:: ``getMessages``

.. code-block:: javascript

   getMessages()

读取与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2467``—``2467`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100459:100823:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next, messageIds)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2468``—``2475`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``updateStreamingStatus``、``setMessages``、``ensureStreamMessagesVisible``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101968:132919:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505({ event, payload, reply, eventRunId, eventTurnId })

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2505``—``3079`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

``{ event, payload, reply, eventRunId, eventTurnId }``
   调用方传入的 ``event, payload, reply, eventRunId, eventTurnId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``MESSAGE_STREAM_EVENTS.has``、``markLiveStreamMessages``、``Object.keys``、``streamBatch.enqueue``、``streamBatch.flush``、``reply``、``['normal', 'generating', 'disabled'].includes``、``setTurnSubmission``、``handleSpeakMessageRequest``、``cancelActiveSpeech``、``pauseActiveSpeech``、``resumeActiveSpeech``。

**内部回调数量**：17。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105616:105722:FUNCTION

.. rubric:: ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + msgId, { params: { conversationId: conversationId }, }) .t… callback @ 2579``

.. code-block:: javascript

   apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + msgId, { params: { conversationId: conversationId }, }) .t… callback @ 2579()

实现 ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + msgId, { params: { conversationId: conversationId }, }) .t…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2579``—``2581`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105763:105928:FUNCTION

.. rubric:: ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + msgId, { params: { conversationId: conversationId }, }) .t… callback @ 2582``

.. code-block:: javascript

   apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + msgId, { params: { conversationId: conversationId }, }) .t… callback @ 2582(error)

实现 ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + msgId, { params: { conversationId: conversationId }, }) .t…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2582``—``2584`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:110407:110553:FUNCTION

.. rubric:: ``anonymous callback @ 2666``

.. code-block:: javascript

   anonymous callback @ 2666(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2666``—``2668`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:110613:110737:FUNCTION

.. rubric:: ``anonymous callback @ 2670``

.. code-block:: javascript

   anonymous callback @ 2670(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2670``—``2672`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:110790:110914:FUNCTION

.. rubric:: ``anonymous callback @ 2674``

.. code-block:: javascript

   anonymous callback @ 2674(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2674``—``2676`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:112137:112462:FUNCTION

.. rubric:: ``produce callback @ 2702``

.. code-block:: javascript

   produce callback @ 2702(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2702``—``2707`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113783:114116:FUNCTION

.. rubric:: ``produce callback @ 2730``

.. code-block:: javascript

   produce callback @ 2730(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2730``—``2736`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114950:115310:FUNCTION

.. rubric:: ``produce callback @ 2750``

.. code-block:: javascript

   produce callback @ 2750(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2750``—``2756`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116377:116689:FUNCTION

.. rubric:: ``produce callback @ 2776``

.. code-block:: javascript

   produce callback @ 2776(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2776``—``2781`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117272:117975:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2792``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2792()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value, }, conversation Id: conversation Id, loc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2792``—``2804`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117365:117943:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2793``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2793()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2793``—``2803`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2792``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118602:119130:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2819``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2819()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message, }, conversation Id: conversation I…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2819``—``2830`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118693:119106:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2820``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2820()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2820``—``2829`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2819``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119767:120833:FUNCTION

.. rubric:: ``produce callback @ 2841``

.. code-block:: javascript

   produce callback @ 2841(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2841``—``2858`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121812:123702:FUNCTION

.. rubric:: ``produce callback @ 2878``

.. code-block:: javascript

   produce callback @ 2878(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2878``—``2906`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeMessageContextState``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:125467:125503:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2940``

.. code-block:: javascript

   window.setTimeout callback @ 2940()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2940``—``2940`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:127781:128367:FUNCTION

.. rubric:: ``produce callback @ 2987``

.. code-block:: javascript

   produce callback @ 2987(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2987``—``2996`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:129097:129518:FUNCTION

.. rubric:: ``produce callback @ 3009``

.. code-block:: javascript

   produce callback @ 3009(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3009``—``3015`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:130253:130675:FUNCTION

.. rubric:: ``produce callback @ 3031``

.. code-block:: javascript

   produce callback @ 3031(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3031``—``3037`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2505``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``removeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133019:133354:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 3082``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 3082()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3082``—``3089`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``、``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133506:133609:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3094``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3094({ event, payload, reply })

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3094``—``3096`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133626:133848:FUNCTION

.. rubric:: ``returned callback @ 3097``

.. code-block:: javascript

   returned callback @ 3097()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3097``—``3103`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``streamBatch.flush``、``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134586:134671:FUNCTION

.. rubric:: ``useEffect callback @ 3130``

.. code-block:: javascript

   useEffect callback @ 3130()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3130``—``3134`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134608:134664:FUNCTION

.. rubric:: ``returned callback @ 3131``

.. code-block:: javascript

   returned callback @ 3131()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3131``—``3133`` 行；所属函数 ``useEffect callback @ 3130``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134711:134786:FUNCTION

.. rubric:: ``useEffect callback @ 3136``

.. code-block:: javascript

   useEffect callback @ 3136()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3136``—``3138`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134827:137338:FUNCTION

.. rubric:: ``useEffect callback @ 3140``

.. code-block:: javascript

   useEffect callback @ 3140()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3140``—``3192`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setTurnSubmission``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137215:137276:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 3187``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 3187(_, id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3187``—``3189`` 行；所属函数 ``useEffect callback @ 3140``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137416:138015:FUNCTION

.. rubric:: ``useEffect callback @ 3194``

.. code-block:: javascript

   useEffect callback @ 3194()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3194``—``3209`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137641:137805:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 3199``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 3199(items)

处理 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3199``—``3202`` 行；所属函数 ``useEffect callback @ 3194``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137826:137943:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 3203``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 3203()

实现 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3203``—``3205`` 行；所属函数 ``useEffect callback @ 3194``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137960:138008:FUNCTION

.. rubric:: ``returned callback @ 3206``

.. code-block:: javascript

   returned callback @ 3206()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3206``—``3208`` 行；所属函数 ``useEffect callback @ 3194``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138081:140346:FUNCTION

.. rubric:: ``useCallback callback @ 3212``

.. code-block:: javascript

   async useCallback callback @ 3212({ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3212``—``3251`` 行；所属函数 ``ChatPage``。

**参数**

``{ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true }`` （默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``normalizedModels``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``isCurrent``、``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138163:138174:FUNCTION

.. rubric:: ``anonymous callback @ 3212``

.. code-block:: javascript

   anonymous callback @ 3212()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3212``—``3212`` 行；所属函数 ``useCallback callback @ 3212``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139723:139759:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 3238``

.. code-block:: javascript

   normalizedModels.find callback @ 3238(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3238``—``3238`` 行；所属函数 ``useCallback callback @ 3212``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:140399:140585:FUNCTION

.. rubric:: ``useEffect callback @ 3255``

.. code-block:: javascript

   useEffect callback @ 3255()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3255``—``3259`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:140960:141256:FUNCTION

.. rubric:: ``useEffect callback @ 3265``

.. code-block:: javascript

   useEffect callback @ 3265()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3265``—``3270`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141358:149446:FUNCTION

.. rubric:: ``useEffect callback @ 3272``

.. code-block:: javascript

   useEffect callback @ 3272()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3272``—``3449`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141773:141860:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3281``—``3281`` 行；所属函数 ``useEffect callback @ 3272``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141926:143172:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3283``—``3309`` 行；所属函数 ``useEffect callback @ 3272``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142551:142583:FUNCTION

.. rubric:: ``modelsData.find callback @ 3295``

.. code-block:: javascript

   modelsData.find callback @ 3295(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3295``—``3295`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:143203:143587:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3310``—``3320`` 行；所属函数 ``useEffect callback @ 3272``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:143620:148261:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3321``—``3415`` 行；所属函数 ``useEffect callback @ 3272``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145870:146776:FUNCTION

.. rubric:: ``setTimeout callback @ 3363``

.. code-block:: javascript

   setTimeout callback @ 3363()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3363``—``3380`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145955:146752:FUNCTION

.. rubric:: ``setTimeout callback @ 3365``

.. code-block:: javascript

   setTimeout callback @ 3365()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3365``—``3379`` 行；所属函数 ``setTimeout callback @ 3363``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147169:147361:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3388``—``3392`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147638:148230:FUNCTION

.. rubric:: ``setTimeout callback @ 3401``

.. code-block:: javascript

   setTimeout callback @ 3401()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3401``—``3413`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148287:149142:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3416``—``3438`` 行；所属函数 ``useEffect callback @ 3272``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setIsLoading``、``performance.now``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149414:149439:FUNCTION

.. rubric:: ``returned callback @ 3448``

.. code-block:: javascript

   returned callback @ 3448()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3448``—``3448`` 行；所属函数 ``useEffect callback @ 3272``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149728:149784:FUNCTION

.. rubric:: ``useCallback callback @ 3461``

.. code-block:: javascript

   useCallback callback @ 3461()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3461``—``3463`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149761:149776:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 3462``

.. code-block:: javascript

   setIsSidebarOpen callback @ 3462(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3462``—``3462`` 行；所属函数 ``useCallback callback @ 3461``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149839:149927:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 3467``

.. code-block:: javascript

   useBrowserBackLayer callback @ 3467()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3467``—``3470`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150032:150348:FUNCTION

.. rubric:: ``useEffect callback @ 3475``

.. code-block:: javascript

   useEffect callback @ 3475()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3475``—``3481`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``new URLSearchParams(window.location.search).get``、``jumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156093:156126:FUNCTION

.. rubric:: ``onClose callback @ 3584``

.. code-block:: javascript

   onClose callback @ 3584()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3584``—``3584`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:159506:159536:FUNCTION

.. rubric:: ``onStop callback @ 3640``

.. code-block:: javascript

   onStop callback @ 3640()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3640``—``3640`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:159582:159609:FUNCTION

.. rubric:: ``onPrevious callback @ 3641``

.. code-block:: javascript

   onPrevious callback @ 3641()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3641``—``3641`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:159651:159677:FUNCTION

.. rubric:: ``onNext callback @ 3642``

.. code-block:: javascript

   onNext callback @ 3642()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3642``—``3642`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:162201:162385:FUNCTION

.. rubric:: ``onClick callback @ 3682``

.. code-block:: javascript

   onClick callback @ 3682()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3682``—``3685`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:166944:167538:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3754``

.. code-block:: javascript

   onWorkspaceChange callback @ 3754(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3754``—``3762`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167138:167427:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3756``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3756(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3756``—``3760`` 行；所属函数 ``onWorkspaceChange callback @ 3754``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:171265:171467:FUNCTION

.. rubric:: ``anonymous callback @ 3832``

.. code-block:: javascript

   anonymous callback @ 3832()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3832``—``3835`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:171693:171837:FUNCTION

.. rubric:: ``onToggleAvatarScene callback @ 3841``

.. code-block:: javascript

   onToggleAvatarScene callback @ 3841()

处理 ``Toggle Avatar Scene`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3841``—``3844`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAvatarScene``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:172075:172211:FUNCTION

.. rubric:: ``onEnd callback @ 3847``

.. code-block:: javascript

   onEnd callback @ 3847()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3847``—``3850`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:172249:172287:FUNCTION

.. rubric:: ``onMinimize callback @ 3851``

.. code-block:: javascript

   onMinimize callback @ 3851()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3851``—``3851`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:172324:172474:FUNCTION

.. rubric:: ``onRestore callback @ 3852``

.. code-block:: javascript

   onRestore callback @ 3852()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3852``—``3855`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:173016:175889:FUNCTION

.. rubric:: ``onSettingChange callback @ 3866``

.. code-block:: javascript

   onSettingChange callback @ 3866(values)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3866``—``3909`` 行；所属函数 ``ChatPage``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Object.fromEntries``、``Object.entries(values).filter``、``Object.entries``、``Object.keys``、``queueAgentConfiguration``、``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…``、``avatarSelectionQueue.current .catch(() => {}) .then``、``avatarSelectionQueue.current .catch``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:173254:173497:FUNCTION

.. rubric:: ``Object.entries(values).filter callback @ 3870``

.. code-block:: javascript

   Object.entries(values).filter callback @ 3870([key, value])

作为 ``Object.entries(values).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3870``—``3872`` 行；所属函数 ``onSettingChange callback @ 3866``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174283:174291:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch callback @ 3886``

.. code-block:: javascript

   avatarSelectionQueue.current .catch callback @ 3886()

处理 ``avatarSelectionQueue.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3886``—``3886`` 行；所属函数 ``onSettingChange callback @ 3866``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174335:175047:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 3887``

.. code-block:: javascript

   async avatarSelectionQueue.current .catch(() => {}) .then callback @ 3887()

处理 ``avatarSelectionQueue.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``3887``—``3896`` 行；所属函数 ``onSettingChange callback @ 3866``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(result.message || '角色模型保存失败')``。

**主要协作调用**：``emitEvent``、``setAvatarModelRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174981:175007:FUNCTION

.. rubric:: ``setAvatarModelRevision callback @ 3895``

.. code-block:: javascript

   setAvatarModelRevision callback @ 3895(revision)

设置与 ``Avatar Model Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3895``—``3895`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 3887``。

**参数**

``revision``
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:175092:175709:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 3897``

.. code-block:: javascript

   avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 3897(error)

实现 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3897``—``3905`` 行；所属函数 ``onSettingChange callback @ 3866``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``setAdvancedSettingsValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:175355:175623:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3900``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3900(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3900``—``3903`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 3897``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:176825:176948:FUNCTION

.. rubric:: ``onClose callback @ 3934``

.. code-block:: javascript

   onClose callback @ 3934()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3934``—``3937`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:177450:177656:FUNCTION

.. rubric:: ``onOpenChange callback @ 3949``

.. code-block:: javascript

   onOpenChange callback @ 3949(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3949``—``3955`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:177952:179011:FUNCTION

.. rubric:: ``onConfirm callback @ 3961``

.. code-block:: javascript

   onConfirm callback @ 3961()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3961``—``3984`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canMutateConversation``、``setShowDeleteConfirm``、``setIsDeletingMessage``、``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati…``、``apiClient .delete``、``setPendingDeleteMsgId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:178522:178633:FUNCTION

.. rubric:: ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati… callback @ 3974``

.. code-block:: javascript

   apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati… callback @ 3974()

实现 ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3974``—``3976`` 行；所属函数 ``onConfirm callback @ 3961``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:178670:178827:FUNCTION

.. rubric:: ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati… callback @ 3977``

.. code-block:: javascript

   apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati… callback @ 3977(error)

实现 ``apiClient .delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + '/' + pendingDeleteMsgId, { params: { conversationId: conversati…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3977``—``3979`` 行；所属函数 ``onConfirm callback @ 3961``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。
