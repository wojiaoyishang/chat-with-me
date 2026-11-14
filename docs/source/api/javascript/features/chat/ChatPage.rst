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
* **局部函数与匿名回调**：301

主要依赖
--------------------------------------------------------------------------------

``./page/utils/messageStreamBatch.js``、``@/components/markdown/markdownRenderBudget.js``、``./page/utils/appendedHistory.js``、``./page/utils/messageDeletion.js``、``./page/utils/conversationOptions.js``、``@/runtime/backend/connection.js``、``./page/openChatWindow.js``、``lucide-react``、``react``、``framer-motion``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``@/context/useEventStore.jsx``、``react-i18next``、``react-router-dom``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/RuntimeInspectorDialog.jsx``、``@/features/settings-runtime/RemoteSettingsPanel.jsx``、``@/features/chat/page/hooks/useRuntimeInspector.js``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``./freeze/useConversationFreeze.js``、``./freeze/ConversationFreezeNotice.jsx``、``./freeze/ConversationFreezeContext.jsx``、``@/features/execution``、``@/features/workspace/useWorkspaceTransferStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4248:4348:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``91``—``93`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4397:4538:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``98`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4583:4824:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``100``—``106`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4955:5121:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``112``—``116`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5146:5199:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``118`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5229:5384:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``120``—``123`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${baseEndpoint}/${encodeURIComponent(String(id))}\x60``。

   **主要协作调用**：``String(endpoint || '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5405:5571:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``130`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5595:5647:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``132``—``132`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5674:5774:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``134``—``137`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ text: String(data.text ?? '') }``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5798:5943:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``139``—``142`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5974:6574:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``144``—``162`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], { type: ASR_AUDIO_MIME_TYPE }) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], { type: ASR_AUDIO_MIME_TYPE }) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6606:6750:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``164``—``167`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6751:187475:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``170``—``4100`` 行。

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

   **主要协作调用**：``useTranslation``、``useLocation``、``useConversationFreeze``、``/^\/chat-window(?:\/|$)/.test``、``/^\/doc(?:\/|$)/.test``、``/^\/chat(?:\/|$)/.test``、``routeLocation.pathname.endsWith``、``useRef``、``generateUUID``、``useState``、``useImmer``、``useMemo``。

   **内部回调数量**：114。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4983:5120:FUNCTION

.. rubric:: ``anonymous callback @ 113``

.. code-block:: javascript

   anonymous callback @ 113(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``113``—``116`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:8810:8862:FUNCTION

.. rubric:: ``useMemo callback @ 213``

.. code-block:: javascript

   useMemo callback @ 213()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pendingBodyForwarding``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:9017:9080:FUNCTION

.. rubric:: ``useCallback callback @ 216``

.. code-block:: javascript

   useCallback callback @ 216(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``ChatPage``。

**参数**

``duration``
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamBatchRef.current?.observeRenderCost``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12209:12337:FUNCTION

.. rubric:: ``useEffect callback @ 275``

.. code-block:: javascript

   useEffect callback @ 275()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``275``—``277`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12748:12786:FUNCTION

.. rubric:: ``useState callback @ 282``

.. code-block:: javascript

   useState callback @ 282()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``282`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12945:13890:FUNCTION

.. rubric:: ``useCallback callback @ 285``

.. code-block:: javascript

   useCallback callback @ 285(target)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``303`` 行；所属函数 ``ChatPage``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``optionWritersRef.current.get(key)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``getBackendConnection``、``optionWritersRef.current.has``、``optionWritersRef.current.set``、``optionWritersRef.current.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13214:13450:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   save(patch)

保存与 ``save`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``290``—``293`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.patch(\x60/chat/conversations/${encodeURIComponent(target)}/options\x60, {patch})``。

**显式抛出**：``new Error('后端连接已切换，请重新打开会话设置')``。

**主要协作调用**：``isCurrentConnection``、``apiClient.patch``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13477:13724:FUNCTION

.. rubric:: ``onValues``

.. code-block:: javascript

   onValues(values)

处理 ``Values`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``294``—``298`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentConnection``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13750:13806:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``299``—``299`` 行；所属函数 ``useCallback callback @ 285``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13911:14031:FUNCTION

.. rubric:: ``useEffect callback @ 304``

.. code-block:: javascript

   useEffect callback @ 304()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``304``—``306`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13916:14031:FUNCTION

.. rubric:: ``anonymous callback @ 304``

.. code-block:: javascript

   anonymous callback @ 304()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``304``—``306`` 行；所属函数 ``useEffect callback @ 304``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``optionWritersRef.current.values``、``writer.flush().catch``、``writer.flush``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14015:14023:FUNCTION

.. rubric:: ``writer.flush().catch callback @ 305``

.. code-block:: javascript

   writer.flush().catch callback @ 305()

处理 ``writer.flush().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``305``—``305`` 行；所属函数 ``anonymous callback @ 304``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14342:14932:FUNCTION

.. rubric:: ``useCallback callback @ 312``

.. code-block:: javascript

   useCallback callback @ 312(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``312``—``322`` 行；所属函数 ``ChatPage``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationMeta``、``modelCatalogRef.current.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14469:14553:FUNCTION

.. rubric:: ``setConversationMeta callback @ 314``

.. code-block:: javascript

   setConversationMeta callback @ 314(current)

设置与 ``Conversation Meta`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``useCallback callback @ 312``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14607:14649:FUNCTION

.. rubric:: ``modelCatalogRef.current.find callback @ 315``

.. code-block:: javascript

   modelCatalogRef.current.find callback @ 315(entry)

作为 ``modelCatalogRef.current.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``useCallback callback @ 312``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14987:15642:FUNCTION

.. rubric:: ``useCallback callback @ 323``

.. code-block:: javascript

   useCallback callback @ 323()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``323``—``337`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…``、``agentConfigurationQueueRef.current .catch(() => {}) .then``、``agentConfigurationQueueRef.current .catch``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15239:15247:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch callback @ 328``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch callback @ 328()

处理 ``agentConfigurationQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``328``—``328`` 行；所属函数 ``useCallback callback @ 323``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15267:15561:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 329``

.. code-block:: javascript

   async agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 329()

处理 ``agentConfigurationQueueRef.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``329``—``335`` 行；所属函数 ``useCallback callback @ 323``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``、``applyAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15582:15634:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent… callback @ 336``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( `/chat/agent… callback @ 336(error)

实现 ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``336``—``336`` 行；所属函数 ``useCallback callback @ 323``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15720:16458:FUNCTION

.. rubric:: ``useCallback callback @ 339``

.. code-block:: javascript

   useCallback callback @ 339(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``339``—``351`` 行；所属函数 ``ChatPage``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``flushAgentConfiguration``、``clearTimeout``、``setTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16516:16649:FUNCTION

.. rubric:: ``useEffect callback @ 355``

.. code-block:: javascript

   useEffect callback @ 355()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``355``—``358`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16530:16649:FUNCTION

.. rubric:: ``anonymous callback @ 355``

.. code-block:: javascript

   anonymous callback @ 355()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``355``—``358`` 行；所属函数 ``useEffect callback @ 355``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``flushAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17077:17140:FUNCTION

.. rubric:: ``useEffect callback @ 368``

.. code-block:: javascript

   useEffect callback @ 368()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``368``—``370`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17175:17412:FUNCTION

.. rubric:: ``useEffect callback @ 373``

.. code-block:: javascript

   useEffect callback @ 373()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``373``—``378`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17189:17412:FUNCTION

.. rubric:: ``anonymous callback @ 373``

.. code-block:: javascript

   anonymous callback @ 373()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``373``—``378`` 行；所属函数 ``useEffect callback @ 373``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17486:18387:FUNCTION

.. rubric:: ``useCallback callback @ 382``

.. code-block:: javascript

   useCallback callback @ 382(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``382``—``399`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status || '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18094:18362:FUNCTION

.. rubric:: ``setTimeout callback @ 392``

.. code-block:: javascript

   setTimeout callback @ 392()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``392``—``397`` 行；所属函数 ``useCallback callback @ 382``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18144:18265:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 393``

.. code-block:: javascript

   setContextCompactionState callback @ 393(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``393``—``394`` 行；所属函数 ``setTimeout callback @ 392``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18680:18847:FUNCTION

.. rubric:: ``useEffect callback @ 406``

.. code-block:: javascript

   useEffect callback @ 406()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``406``—``411`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeletingMessage``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20013:20163:FUNCTION

.. rubric:: ``useCallback callback @ 451``

.. code-block:: javascript

   useCallback callback @ 451()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``451``—``454`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20245:20337:FUNCTION

.. rubric:: ``handleWindowMode``

.. code-block:: javascript

   handleWindowMode()

处理 ``Window Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``455``—``458`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWindowMode``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20387:21078:FUNCTION

.. rubric:: ``useCallback callback @ 460``

.. code-block:: javascript

   useCallback callback @ 460(messageIds, runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``460``—``472`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20522:20559:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 462``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 462(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``462``—``462`` 行；所属函数 ``useCallback callback @ 460``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20665:20726:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 466``

.. code-block:: javascript

   normalizedIds.forEach callback @ 466(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``466``—``466`` 行；所属函数 ``useCallback callback @ 460``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``liveStreamMessageIdsRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20953:20994:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 470``

.. code-block:: javascript

   normalizedIds.forEach callback @ 470(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``470``—``470`` 行；所属函数 ``useCallback callback @ 460``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runMessages.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21129:21736:FUNCTION

.. rubric:: ``useCallback callback @ 474``

.. code-block:: javascript

   useCallback callback @ 474(runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``474``—``486`` 行；所属函数 ``ChatPage``。

**参数**

``runId`` （默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.delete``、``runMessages.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21458:21728:FUNCTION

.. rubric:: ``runMessages.forEach callback @ 480``

.. code-block:: javascript

   runMessages.forEach callback @ 480(messageId)

作为 ``runMessages.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``480``—``485`` 行；所属函数 ``useCallback callback @ 474``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(liveStreamRunMessagesRef.current.values()).some``、``Array.from``、``liveStreamRunMessagesRef.current.values``、``liveStreamMessageIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21565:21622:FUNCTION

.. rubric:: ``Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 481``

.. code-block:: javascript

   Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 481(messageIds)

作为 ``Array.from(liveStreamRunMessagesRef.current.values()).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``481``—``482`` 行；所属函数 ``runMessages.forEach callback @ 480``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messageIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21796:22886:FUNCTION

.. rubric:: ``useCallback callback @ 488``

.. code-block:: javascript

   useCallback callback @ 488(messageIds)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``488``—``512`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``restoreMissingStreamTail``、``nextOrder.every``、``setMessagesOrder``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22214:22251:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 495``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 495(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``495``—``495`` 行；所属函数 ``useCallback callback @ 488``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22698:22765:FUNCTION

.. rubric:: ``nextOrder.every callback @ 506``

.. code-block:: javascript

   nextOrder.every callback @ 506(messageId, index)

作为 ``nextOrder.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``506``—``506`` 行；所属函数 ``useCallback callback @ 488``。

**参数**

``messageId``
   Message 的公共 UUID。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22935:23776:FUNCTION

.. rubric:: ``useCallback callback @ 515``

.. code-block:: javascript

   useCallback callback @ 515(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``515``—``531`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages`` （默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23004:23775:FUNCTION

.. rubric:: ``produce callback @ 516``

.. code-block:: javascript

   produce callback @ 516(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``516``—``531`` 行；所属函数 ``useCallback callback @ 515``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft || {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23067:23759:FUNCTION

.. rubric:: ``Object.keys(draft || {}).forEach callback @ 517``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 517(key)

作为 ``Object.keys(draft || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``517``—``530`` 行；所属函数 ``produce callback @ 516``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23377:23499:FUNCTION

.. rubric:: ``anonymous callback @ 523``

.. code-block:: javascript

   anonymous callback @ 523(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``523``—``525`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 517``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23551:23651:FUNCTION

.. rubric:: ``anonymous callback @ 526``

.. code-block:: javascript

   anonymous callback @ 526(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``526``—``528`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 517``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23696:23740:FUNCTION

.. rubric:: ``anonymous callback @ 529``

.. code-block:: javascript

   anonymous callback @ 529(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``529``—``529`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 517``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23843:26500:FUNCTION

.. rubric:: ``useCallback callback @ 536``

.. code-block:: javascript

   async useCallback callback @ 536({ silent = false, append = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``536``—``594`` 行；所属函数 ``ChatPage``。

**参数**

``{ silent = false, append = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26626:27065:FUNCTION

.. rubric:: ``useCallback callback @ 599``

.. code-block:: javascript

   useCallback callback @ 599(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``599``—``611`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26848:27033:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 603``

.. code-block:: javascript

   requestAnimationFrame callback @ 603()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``603``—``608`` 行；所属函数 ``useCallback callback @ 599``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27120:27338:FUNCTION

.. rubric:: ``useCallback callback @ 613``

.. code-block:: javascript

   useCallback callback @ 613(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``613``—``620`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27417:27838:FUNCTION

.. rubric:: ``useCallback callback @ 624``

.. code-block:: javascript

   useCallback callback @ 624(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``624``—``633`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``queueAgentConfiguration``、``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27978:28092:FUNCTION

.. rubric:: ``useCallback callback @ 637``

.. code-block:: javascript

   useCallback callback @ 637(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``637``—``641`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28555:28681:FUNCTION

.. rubric:: ``useCallback callback @ 660``

.. code-block:: javascript

   useCallback callback @ 660()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``660``—``662`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine(getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote'))``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28748:29028:FUNCTION

.. rubric:: ``useCallback callback @ 664``

.. code-block:: javascript

   useCallback callback @ 664()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``664``—``669`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage), )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29103:30202:FUNCTION

.. rubric:: ``useCallback callback @ 671``

.. code-block:: javascript

   useCallback callback @ 671({ cancel = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``671``—``704`` 行；所属函数 ``ChatPage``。

**参数**

``{ cancel = false }`` （默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({ text: '', error: null })``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \x60${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29423:30194:FUNCTION

.. rubric:: ``anonymous callback @ 680``

.. code-block:: javascript

   anonymous callback @ 680(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``680``—``703`` 行；所属函数 ``useCallback callback @ 671``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29497:29800:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``682``—``688`` 行；所属函数 ``anonymous callback @ 680``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\x60${session.finalTranscript} ${session.interimTranscript}\x60.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30264:32092:FUNCTION

.. rubric:: ``useCallback callback @ 706``

.. code-block:: javascript

   useCallback callback @ 706()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``706``—``761`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31019:31633:FUNCTION

.. rubric:: ``anonymous callback @ 728``

.. code-block:: javascript

   anonymous callback @ 728(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``728``—``743`` 行；所属函数 ``useCallback callback @ 706``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${session.finalTranscript} ${transcript}\x60.trim``、``\x60${interimTranscript} ${transcript}\x60.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31665:31739:FUNCTION

.. rubric:: ``anonymous callback @ 745``

.. code-block:: javascript

   anonymous callback @ 745(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``745``—``747`` 行；所属函数 ``useCallback callback @ 706``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31769:31778:FUNCTION

.. rubric:: ``anonymous callback @ 749``

.. code-block:: javascript

   anonymous callback @ 749()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``749``—``749`` 行；所属函数 ``useCallback callback @ 706``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32217:32755:FUNCTION

.. rubric:: ``useCallback callback @ 763``

.. code-block:: javascript

   useCallback callback @ 763()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``763``—``779`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ engine: 'remote' }``、``{ engine: 'remote', fallback: true }``、``{ engine: 'local' }``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32876:36109:FUNCTION

.. rubric:: ``useCallback callback @ 782``

.. code-block:: javascript

   async useCallback callback @ 782(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``782``—``867`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36176:37042:FUNCTION

.. rubric:: ``useCallback callback @ 872``

.. code-block:: javascript

   async useCallback callback @ 872(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``872``—``894`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ text }``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37207:37336:FUNCTION

.. rubric:: ``useCallback callback @ 898``

.. code-block:: javascript

   useCallback callback @ 898()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``898``—``901`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37852:37969:FUNCTION

.. rubric:: ``useCallback callback @ 917``

.. code-block:: javascript

   useCallback callback @ 917()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``917``—``919`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38024:38135:FUNCTION

.. rubric:: ``useCallback callback @ 921``

.. code-block:: javascript

   useCallback callback @ 921(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``921``—``923`` 行；所属函数 ``ChatPage``。

**参数**

``duration`` （默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38190:38592:FUNCTION

.. rubric:: ``useCallback callback @ 925``

.. code-block:: javascript

   useCallback callback @ 925()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``925``—``934`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38718:38961:FUNCTION

.. rubric:: ``useCallback callback @ 936``

.. code-block:: javascript

   useCallback callback @ 936()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``936``—``942`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39171:39592:FUNCTION

.. rubric:: ``useCallback callback @ 945``

.. code-block:: javascript

   useCallback callback @ 945()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``945``—``953`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39614:39725:FUNCTION

.. rubric:: ``useEffect callback @ 955``

.. code-block:: javascript

   useEffect callback @ 955()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``955``—``958`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``cancelAfterRenderScroll``。

**主要协作调用**：``cancelAfterRenderScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39865:42062:FUNCTION

.. rubric:: ``useCallback callback @ 962``

.. code-block:: javascript

   useCallback callback @ 962(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``962``—``1015`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll`` （默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelAfterRenderScroll``、``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40129:41272:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``967``—``994`` 行；所属函数 ``useCallback callback @ 962``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41308:41866:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``996``—``1008`` 行；所属函数 ``useCallback callback @ 962``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41482:41850:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 999``

.. code-block:: javascript

   requestAnimationFrame callback @ 999()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``999``—``1007`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41711:41830:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1003``

.. code-block:: javascript

   requestAnimationFrame callback @ 1003()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1003``—``1006`` 行；所属函数 ``requestAnimationFrame callback @ 999``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42469:42858:FUNCTION

.. rubric:: ``useCallback callback @ 1029``

.. code-block:: javascript

   useCallback callback @ 1029()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1029``—``1039`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44692:44764:FUNCTION

.. rubric:: ``useEffect callback @ 1091``

.. code-block:: javascript

   useEffect callback @ 1091()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1091``—``1093`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44932:45025:FUNCTION

.. rubric:: ``useCallback callback @ 1095``

.. code-block:: javascript

   useCallback callback @ 1095()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1095``—``1098`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45000:45017:FUNCTION

.. rubric:: ``setAvatarSceneOpen callback @ 1097``

.. code-block:: javascript

   setAvatarSceneOpen callback @ 1097(value)

设置与 ``Avatar Scene Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1097``—``1097`` 行；所属函数 ``useCallback callback @ 1095``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45077:45119:FUNCTION

.. rubric:: ``useCallback callback @ 1099``

.. code-block:: javascript

   useCallback callback @ 1099()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1099``—``1099`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45101:45118:FUNCTION

.. rubric:: ``setAvatarExpanded callback @ 1099``

.. code-block:: javascript

   setAvatarExpanded callback @ 1099(value)

设置与 ``Avatar Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1099``—``1099`` 行；所属函数 ``useCallback callback @ 1099``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45167:45249:FUNCTION

.. rubric:: ``useCallback callback @ 1100``

.. code-block:: javascript

   useCallback callback @ 1100()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1100``—``1103`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45644:45716:FUNCTION

.. rubric:: ``useEffect callback @ 1117``

.. code-block:: javascript

   useEffect callback @ 1117()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1117``—``1119`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45881:45976:FUNCTION

.. rubric:: ``useEffect callback @ 1122``

.. code-block:: javascript

   useEffect callback @ 1122()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1122``—``1124`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``freezeVoiceStop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46151:46297:FUNCTION

.. rubric:: ``useEffect callback @ 1127``

.. code-block:: javascript

   useEffect callback @ 1127()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1127``—``1130`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46609:46653:FUNCTION

.. rubric:: ``useEffect callback @ 1135``

.. code-block:: javascript

   useEffect callback @ 1135()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1135``—``1137`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46726:47597:FUNCTION

.. rubric:: ``useCallback callback @ 1139``

.. code-block:: javascript

   async useCallback callback @ 1139()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1139``—``1159`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47653:48408:FUNCTION

.. rubric:: ``useCallback callback @ 1162``

.. code-block:: javascript

   async useCallback callback @ 1162(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1162``—``1180`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48492:49583:FUNCTION

.. rubric:: ``useCallback callback @ 1185``

.. code-block:: javascript

   async useCallback callback @ 1185(storyId, partId, changes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1185``—``1208`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48922:49051:FUNCTION

.. rubric:: ``setStories callback @ 1193``

.. code-block:: javascript

   setStories callback @ 1193(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1193``—``1194`` 行；所属函数 ``useCallback callback @ 1185``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48963:49050:FUNCTION

.. rubric:: ``current.map callback @ 1194``

.. code-block:: javascript

   current.map callback @ 1194(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1194``—``1194`` 行；所属函数 ``setStories callback @ 1193``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49095:49484:FUNCTION

.. rubric:: ``setActiveStory callback @ 1196``

.. code-block:: javascript

   setActiveStory callback @ 1196(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1196``—``1205`` 行；所属函数 ``useCallback callback @ 1185``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, ...nextStory, parts: (current.parts || []).map((item) => Number(item.partId) === Number(partId) ? data.part : item, ), }``。

**主要协作调用**：``Number``、``(current.parts || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49336:49427:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1201``

.. code-block:: javascript

   (current.parts || []).map callback @ 1201(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1201``—``1202`` 行；所属函数 ``setActiveStory callback @ 1196``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49658:50970:FUNCTION

.. rubric:: ``useCallback callback @ 1213``

.. code-block:: javascript

   async useCallback callback @ 1213(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1213``—``1243`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50123:50312:FUNCTION

.. rubric:: ``setStories callback @ 1223``

.. code-block:: javascript

   setStories callback @ 1223(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1223``—``1226`` 行；所属函数 ``useCallback callback @ 1213``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50172:50285:FUNCTION

.. rubric:: ``current.map callback @ 1224``

.. code-block:: javascript

   current.map callback @ 1224(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1224``—``1225`` 行；所属函数 ``setStories callback @ 1223``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50372:50494:FUNCTION

.. rubric:: ``setActiveStory callback @ 1228``

.. code-block:: javascript

   setActiveStory callback @ 1228(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1228``—``1229`` 行；所属函数 ``useCallback callback @ 1213``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51045:52147:FUNCTION

.. rubric:: ``useCallback callback @ 1248``

.. code-block:: javascript

   async useCallback callback @ 1248(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1248``—``1273`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51355:51434:FUNCTION

.. rubric:: ``setStories callback @ 1254``

.. code-block:: javascript

   setStories callback @ 1254(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1254``—``1254`` 行；所属函数 ``useCallback callback @ 1248``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51383:51433:FUNCTION

.. rubric:: ``current.filter callback @ 1254``

.. code-block:: javascript

   current.filter callback @ 1254(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1254``—``1254`` 行；所属函数 ``setStories callback @ 1254``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51468:51718:FUNCTION

.. rubric:: ``setActiveStory callback @ 1255``

.. code-block:: javascript

   setActiveStory callback @ 1255(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1255``—``1261`` 行；所属函数 ``useCallback callback @ 1248``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52225:52554:FUNCTION

.. rubric:: ``useCallback callback @ 1278``

.. code-block:: javascript

   useCallback callback @ 1278(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1278``—``1285`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \x60story:${story.storyId}:part:${part.partId}\x60, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52641:52688:FUNCTION

.. rubric:: ``useCallback callback @ 1289``

.. code-block:: javascript

   useCallback callback @ 1289()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1289``—``1291`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52728:52858:FUNCTION

.. rubric:: ``useEffect callback @ 1293``

.. code-block:: javascript

   useEffect callback @ 1293()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1293``—``1298`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStories``、``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52907:56614:FUNCTION

.. rubric:: ``useEffect callback @ 1301``

.. code-block:: javascript

   useEffect callback @ 1301()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1301``—``1374`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53135:56613:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306({ event, payload })

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1306``—``1374`` 行；所属函数 ``useEffect callback @ 1301``。

**参数**

``{ event, payload }``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53492:53565:FUNCTION

.. rubric:: ``setStories callback @ 1314``

.. code-block:: javascript

   setStories callback @ 1314(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1314``—``1314`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53520:53564:FUNCTION

.. rubric:: ``current.filter callback @ 1314``

.. code-block:: javascript

   current.filter callback @ 1314(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1314``—``1314`` 行；所属函数 ``setStories callback @ 1314``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53603:53871:FUNCTION

.. rubric:: ``setActiveStory callback @ 1315``

.. code-block:: javascript

   setActiveStory callback @ 1315(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1315``—``1321`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54348:54871:FUNCTION

.. rubric:: ``loadStories().then callback @ 1332``

.. code-block:: javascript

   loadStories().then callback @ 1332(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1332``—``1342`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54401:54847:FUNCTION

.. rubric:: ``setActiveStory callback @ 1333``

.. code-block:: javascript

   setActiveStory callback @ 1333(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1333``—``1341`` 行；所属函数 ``loadStories().then callback @ 1332``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54539:54597:FUNCTION

.. rubric:: ``values.some callback @ 1335``

.. code-block:: javascript

   values.some callback @ 1335(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1335``—``1335`` 行；所属函数 ``setActiveStory callback @ 1333``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54920:55501:FUNCTION

.. rubric:: ``setStories callback @ 1345``

.. code-block:: javascript

   setStories callback @ 1345(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1345``—``1355`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54987:55051:FUNCTION

.. rubric:: ``current.findIndex callback @ 1346``

.. code-block:: javascript

   current.findIndex callback @ 1346(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1346``—``1346`` 行；所属函数 ``setStories callback @ 1345``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55535:56597:FUNCTION

.. rubric:: ``setActiveStory callback @ 1356``

.. code-block:: javascript

   setActiveStory callback @ 1356(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1356``—``1373`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1306``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort``、``existing.filter``、``(current.parts || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56111:56154:FUNCTION

.. rubric:: ``existing.filter callback @ 1364``

.. code-block:: javascript

   existing.filter callback @ 1364(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1364``—``1364`` 行；所属函数 ``setActiveStory callback @ 1356``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56174:56236:FUNCTION

.. rubric:: ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1365``

.. code-block:: javascript

   [...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1365(a, b)

作为 ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1365``—``1365`` 行；所属函数 ``setActiveStory callback @ 1356``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56405:56496:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1368``

.. code-block:: javascript

   (current.parts || []).map callback @ 1368(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1368``—``1369`` 行；所属函数 ``setActiveStory callback @ 1356``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56763:57675:FUNCTION

.. rubric:: ``useCallback callback @ 1380``

.. code-block:: javascript

   async useCallback callback @ 1380(targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1380``—``1400`` 行；所属函数 ``ChatPage``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``workspaceIds``。

**主要协作调用**：``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…``、``Array.isArray``、``apiClient.put``、``encodeURIComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57263:57298:FUNCTION

.. rubric:: ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1390``

.. code-block:: javascript

   (Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1390(item)

实现 ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1390``—``1390`` 行；所属函数 ``useCallback callback @ 1380``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57761:65297:FUNCTION

.. rubric:: ``useCallback callback @ 1405``

.. code-block:: javascript

   useCallback callback @ 1405({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1405``—``1560`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58834:62000:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   async sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1435``—``1499`` 行；所属函数 ``useCallback callback @ 1405``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{success: false, value: '会话设置尚未保存，请重试后发送', conversationId}``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(); if (!generatesReply || payload.value?.admissionAction ===…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``getOptionWriter(conversationId).flush``、``getOptionWriter``、``releaseSubmission``、``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(…``、``emitEvent(eventPayload).then``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60916:61872:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1479``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1479(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1479``—``1495`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...payload, conversationId, }``。

**主要协作调用**：``generateUUID``、``releaseSubmission``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61880:61984:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1495``

.. code-block:: javascript

   emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1495(error)

发送事件与 ``Event(event Payload).then((payload) => { if (payload.success) { current Turn Idempotency Key Ref.current = generate UUID(…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1495``—``1498`` 行；所属函数 ``sendMessage``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``releaseSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62736:62968:FUNCTION

.. rubric:: ``releaseSubmission``

.. code-block:: javascript

   releaseSubmission()

实现 ``releaseSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1509``—``1514`` 行；所属函数 ``useCallback callback @ 1405``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63505:64759:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1528``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1528(payload)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1528``—``1547`` 行；所属函数 ``useCallback callback @ 1405``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``persistPendingWorkspaceSelection(payload.value).then(() => sendMessage(payload.value), )``。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection(payload.value).then``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64498:64566:FUNCTION

.. rubric:: ``persistPendingWorkspaceSelection(payload.value).then callback @ 1541``

.. code-block:: javascript

   persistPendingWorkspaceSelection(payload.value).then callback @ 1541()

处理 ``persistPendingWorkspaceSelection(payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1541``—``1542`` 行；所属函数 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1528``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64792:65076:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1548``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1548(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1548``—``1552`` 行；所属函数 ``useCallback callback @ 1405``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ success: false, value: error?.message || String(error) }``。

**主要协作调用**：``releaseSubmission``、``toast.error``、``t``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65729:69280:FUNCTION

.. rubric:: ``useCallback callback @ 1578``

.. code-block:: javascript

   async useCallback callback @ 1578({ toolsStatus = {}, composerStatus = 'normal' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1578``—``1650`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66951:67475:FUNCTION

.. rubric:: ``startForConversation``

.. code-block:: javascript

   async startForConversation(targetConversationId)

启动与 ``For Conversation`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1604``—``1615`` 行；所属函数 ``useCallback callback @ 1578``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.start``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69676:72562:FUNCTION

.. rubric:: ``useCallback callback @ 1666``

.. code-block:: javascript

   async useCallback callback @ 1666()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1666``—``1732`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70335:72187:FUNCTION

.. rubric:: ``anonymous callback @ 1681``

.. code-block:: javascript

   async anonymous callback @ 1681()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1681``—``1721`` 行；所属函数 ``useCallback callback @ 1666``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71051:71091:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1695``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1695(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1695``—``1695`` 行；所属函数 ``anonymous callback @ 1681``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71620:71725:FUNCTION

.. rubric:: ``anonymous callback @ 1709``

.. code-block:: javascript

   anonymous callback @ 1709(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1709``—``1711`` 行；所属函数 ``anonymous callback @ 1681``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71673:71709:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1710``

.. code-block:: javascript

   requestAnimationFrame callback @ 1710()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1710``—``1710`` 行；所属函数 ``anonymous callback @ 1709``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72199:72479:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1721``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1721()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1721``—``1728`` 行；所属函数 ``useCallback callback @ 1666``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72779:73794:FUNCTION

.. rubric:: ``useEffect callback @ 1742``

.. code-block:: javascript

   useEffect callback @ 1742()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1742``—``1769`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73245:73541:FUNCTION

.. rubric:: ``anonymous callback @ 1754``

.. code-block:: javascript

   anonymous callback @ 1754(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1754``—``1759`` 行；所属函数 ``useEffect callback @ 1742``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73307:73338:FUNCTION

.. rubric:: ``entries.some callback @ 1755``

.. code-block:: javascript

   entries.some callback @ 1755(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1755``—``1755`` 行；所属函数 ``anonymous callback @ 1754``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73389:73525:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1756``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1756(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1756``—``1758`` 行；所属函数 ``anonymous callback @ 1754``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73759:73787:FUNCTION

.. rubric:: ``returned callback @ 1768``

.. code-block:: javascript

   returned callback @ 1768()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1768``—``1768`` 行；所属函数 ``useEffect callback @ 1742``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73921:74929:FUNCTION

.. rubric:: ``useCallback callback @ 1772``

.. code-block:: javascript

   useCallback callback @ 1772(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1772``—``1791`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74761:74886:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1787``

.. code-block:: javascript

   window.setTimeout callback @ 1787()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1787``—``1789`` 行；所属函数 ``useCallback callback @ 1772``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74809:74870:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1788``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1788(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1788``—``1788`` 行；所属函数 ``window.setTimeout callback @ 1787``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75066:77054:FUNCTION

.. rubric:: ``useCallback callback @ 1795``

.. code-block:: javascript

   async useCallback callback @ 1795()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1795``—``1839`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76579:76857:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1826``

.. code-block:: javascript

   requestAnimationFrame callback @ 1826()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1826``—``1833`` 行；所属函数 ``useCallback callback @ 1795``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76625:76841:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1827``

.. code-block:: javascript

   requestAnimationFrame callback @ 1827()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1827``—``1832`` 行；所属函数 ``requestAnimationFrame callback @ 1826``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77312:77574:FUNCTION

.. rubric:: ``useEffect callback @ 1851``

.. code-block:: javascript

   useEffect callback @ 1851()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1851``—``1858`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77400:77567:FUNCTION

.. rubric:: ``returned callback @ 1853``

.. code-block:: javascript

   returned callback @ 1853()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1853``—``1857`` 行；所属函数 ``useEffect callback @ 1851``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77641:80955:FUNCTION

.. rubric:: ``useCallback callback @ 1861``

.. code-block:: javascript

   async useCallback callback @ 1861(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1861``—``1928`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77818:80096:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1866``—``1909`` 行；所属函数 ``useCallback callback @ 1861``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77931:77969:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1867``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1867(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1867``—``1867`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78356:78380:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1874``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1874(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1874``—``1874`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79775:79888:FUNCTION

.. rubric:: ``anonymous callback @ 1902``

.. code-block:: javascript

   anonymous callback @ 1902(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1902``—``1904`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79832:79868:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1903``

.. code-block:: javascript

   requestAnimationFrame callback @ 1903()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1903``—``1903`` 行；所属函数 ``anonymous callback @ 1902``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80220:80258:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1913``

.. code-block:: javascript

   summaryItems.some callback @ 1913(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1913``—``1913`` 行；所属函数 ``useCallback callback @ 1861``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81276:81927:FUNCTION

.. rubric:: ``useEffect callback @ 1942``

.. code-block:: javascript

   useEffect callback @ 1942()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1942``—``1956`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81744:81919:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1951``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1951(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1951``—``1955`` 行；所属函数 ``useEffect callback @ 1942``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82074:85888:FUNCTION

.. rubric:: ``useCallback callback @ 1959``

.. code-block:: javascript

   async useCallback callback @ 1959(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1959``—``2051`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84572:85753:FUNCTION

.. rubric:: ``produce callback @ 2013``

.. code-block:: javascript

   produce callback @ 2013(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2013``—``2046`` 行；所属函数 ``useCallback callback @ 1959``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85239:85361:FUNCTION

.. rubric:: ``anonymous callback @ 2032``

.. code-block:: javascript

   anonymous callback @ 2032(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2032``—``2034`` 行；所属函数 ``produce callback @ 2013``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85444:85544:FUNCTION

.. rubric:: ``anonymous callback @ 2037``

.. code-block:: javascript

   anonymous callback @ 2037(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2037``—``2039`` 行；所属函数 ``produce callback @ 2013``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85620:85720:FUNCTION

.. rubric:: ``anonymous callback @ 2042``

.. code-block:: javascript

   anonymous callback @ 2042(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2042``—``2044`` 行；所属函数 ``produce callback @ 2013``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86057:87143:FUNCTION

.. rubric:: ``useCallback callback @ 2057``

.. code-block:: javascript

   async useCallback callback @ 2057(msgId, result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2057``—``2076`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``streamBatchRef.current?.flush``、``projectMessageDeletion``、``setRandomMark``、``generateUUID``、``setMessages``、``setMessagesOrder``、``loadSwitchMessage``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87326:88946:FUNCTION

.. rubric:: ``useCallback callback @ 2081``

.. code-block:: javascript

   async useCallback callback @ 2081(msgId, { closeDialog = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2081``—``2111`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``{ closeDialog = false }`` （默认值 ``{}``）
   调用方传入的 ``closeDialog = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setIsDeletingMessage``、``apiClient.delete``、``deleteMessageLocally``、``loadMessageSummaries``、``markRuntimeInspectorStale``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89117:90448:FUNCTION

.. rubric:: ``useCallback callback @ 2116``

.. code-block:: javascript

   async useCallback callback @ 2116(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2116``—``2147`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90581:91686:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded(isCurrent)

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2151``—``2177`` 行；所属函数 ``ChatPage``。

**参数**

``isCurrent`` （默认值 ``() => true``）
   调用方传入的 ``isCurrent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90594:90605:FUNCTION

.. rubric:: ``anonymous callback @ 2151``

.. code-block:: javascript

   anonymous callback @ 2151()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2151``—``2151`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90631:91675:FUNCTION

.. rubric:: ``setTimeout callback @ 2152``

.. code-block:: javascript

   setTimeout callback @ 2152()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2152``—``2176`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91225:91331:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2165``—``2167`` 行；所属函数 ``setTimeout callback @ 2152``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91353:91663:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2168``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2168(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2168``—``2175`` 行；所属函数 ``setTimeout callback @ 2152``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91703:93817:FUNCTION

.. rubric:: ``useEffect callback @ 2179``

.. code-block:: javascript

   useEffect callback @ 2179()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2179``—``2241`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91904:92958:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2186``—``2212`` 行；所属函数 ``useEffect callback @ 2179``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92281:92946:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2195``

.. code-block:: javascript

   requestAnimationFrame callback @ 2195()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2195``—``2211`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93058:93238:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2216``—``2220`` 行；所属函数 ``useEffect callback @ 2179``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93395:93509:FUNCTION

.. rubric:: ``anonymous callback @ 2225``

.. code-block:: javascript

   anonymous callback @ 2225()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2225``—``2228`` 行；所属函数 ``useEffect callback @ 2179``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93615:93810:FUNCTION

.. rubric:: ``returned callback @ 2234``

.. code-block:: javascript

   returned callback @ 2234()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2234``—``2240`` 行；所属函数 ``useEffect callback @ 2179``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94065:97419:FUNCTION

.. rubric:: ``useEffect callback @ 2251``

.. code-block:: javascript

   useEffect callback @ 2251()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2251``—``2337`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94299:94407:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2258``—``2260`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94437:94757:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2262``—``2270`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94792:94883:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2272``—``2274`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94917:95562:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2276``—``2293`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95593:96768:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2295``—``2324`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97114:97412:FUNCTION

.. rubric:: ``returned callback @ 2331``

.. code-block:: javascript

   returned callback @ 2331()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2331``—``2336`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97614:98079:FUNCTION

.. rubric:: ``useEffect callback @ 2345``

.. code-block:: javascript

   useEffect callback @ 2345()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2345``—``2358`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97761:98061:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2347``

.. code-block:: javascript

   requestAnimationFrame callback @ 2347()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2347``—``2356`` 行；所属函数 ``useEffect callback @ 2345``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98314:98770:FUNCTION

.. rubric:: ``useEffect callback @ 2368``

.. code-block:: javascript

   useEffect callback @ 2368()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2368``—``2379`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98806:98944:FUNCTION

.. rubric:: ``useEffect callback @ 2381``

.. code-block:: javascript

   useEffect callback @ 2381()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2381``—``2385`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99070:99313:FUNCTION

.. rubric:: ``useCallback callback @ 2387``

.. code-block:: javascript

   useCallback callback @ 2387()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2387``—``2394`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99459:99580:FUNCTION

.. rubric:: ``useCallback callback @ 2397``

.. code-block:: javascript

   useCallback callback @ 2397(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2397``—``2399`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99705:99948:FUNCTION

.. rubric:: ``useCallback callback @ 2403``

.. code-block:: javascript

   async useCallback callback @ 2403()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2403``—``2408`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100136:101227:FUNCTION

.. rubric:: ``useEffect callback @ 2416``

.. code-block:: javascript

   useEffect callback @ 2416()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2416``—``2443`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100443:100485:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2425``

.. code-block:: javascript

   messagesOrder.filter callback @ 2425(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2425``—``2425`` 行；所属函数 ``useEffect callback @ 2416``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100741:101110:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2430``

.. code-block:: javascript

   window.setTimeout callback @ 2430()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2430``—``2438`` 行；所属函数 ``useEffect callback @ 2416``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({ silent: true, append: true }).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100819:101098:FUNCTION

.. rubric:: ``loadMessageSummaries({ silent: true, append: true }).then callback @ 2431``

.. code-block:: javascript

   loadMessageSummaries({ silent: true, append: true }).then callback @ 2431(items)

处理 ``loadMessageSummaries({ silent: true, append: true }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2431``—``2437`` 行；所属函数 ``window.setTimeout callback @ 2430``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101132:101220:FUNCTION

.. rubric:: ``returned callback @ 2439``

.. code-block:: javascript

   returned callback @ 2439()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2439``—``2442`` 行；所属函数 ``useEffect callback @ 2416``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101431:101939:FUNCTION

.. rubric:: ``useEffect callback @ 2452``

.. code-block:: javascript

   useEffect callback @ 2452()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2452``—``2464`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101541:101598:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2455``—``2455`` 行；所属函数 ``useEffect callback @ 2452``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101819:101932:FUNCTION

.. rubric:: ``returned callback @ 2460``

.. code-block:: javascript

   returned callback @ 2460()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2460``—``2463`` 行；所属函数 ``useEffect callback @ 2452``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101973:104033:FUNCTION

.. rubric:: ``useEffect callback @ 2466``

.. code-block:: javascript

   useEffect callback @ 2466()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2466``—``2510`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102143:103530:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2471``—``2499`` 行；所属函数 ``useEffect callback @ 2466``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102261:103518:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2473``

.. code-block:: javascript

   requestAnimationFrame callback @ 2473()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2473``—``2498`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map((element) => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103016:103067:FUNCTION

.. rubric:: ``elements .map callback @ 2487``

.. code-block:: javascript

   elements .map callback @ 2487(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2487``—``2487`` 行；所属函数 ``requestAnimationFrame callback @ 2473``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103099:103150:FUNCTION

.. rubric:: ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2488``

.. code-block:: javascript

   elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2488(element)

作为 ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2488``—``2488`` 行；所属函数 ``requestAnimationFrame callback @ 2473``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103428:103484:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2496``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2496(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2496``—``2496`` 行；所属函数 ``requestAnimationFrame callback @ 2473``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103827:104026:FUNCTION

.. rubric:: ``returned callback @ 2505``

.. code-block:: javascript

   returned callback @ 2505()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2505``—``2509`` 行；所属函数 ``useEffect callback @ 2466``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104068:138534:FUNCTION

.. rubric:: ``useEffect callback @ 2512``

.. code-block:: javascript

   useEffect callback @ 2512()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2512``—``3169`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; appendSync.invalidate(); streamBatch.flush(); if (streamBatchRef.current === streamBatch) streamBatchRef.current = null; unsubscribe1(); unsubscribe2(); u…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``createMessageStreamBatch``、``getBackendConnection``、``createAppendSynchronizer``、``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ…``、``onEvent``、``onEvent({ event: 'transport.connected', }).then``、``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then``、``appendSync.request``。

**内部回调数量**：13。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104155:104181:FUNCTION

.. rubric:: ``getMessages``

.. code-block:: javascript

   getMessages()

读取与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2514``—``2514`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104202:104566:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next, messageIds)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2515``—``2522`` 行；所属函数 ``useEffect callback @ 2512``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104738:104855:FUNCTION

.. rubric:: ``appendIsCurrent``

.. code-block:: javascript

   appendIsCurrent()

追加与 ``Is Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2527``—``2528`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104968:105363:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2531``—``2537`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{messages: messagesRef.current, order: messagesOrderRef.current, liveMessageIds: liveStreamMessageIdsRef.current, ready: isMessageLoadedRef.current && lastHydratedConversationIdRe…``。

**主要协作调用**：``streamBatch.flush``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105382:105575:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load(afterId)

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2538``—``2540`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

``afterId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105595:106041:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply({messages: nextMessages, order})

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2541``—``2549`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

``{messages: nextMessages, order}``
   调用方传入的 ``messages: nextMessages, order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``decorateMessages``、``setMessages``、``setMessagesOrder``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106064:106106:FUNCTION

.. rubric:: ``complete``

.. code-block:: javascript

   complete()

实现 ``complete`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2550``—``2550`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106129:106165:FUNCTION

.. rubric:: ``mismatch``

.. code-block:: javascript

   mismatch()

实现 ``mismatch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2551``—``2551`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRandomMark``、``generateUUID``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106185:106418:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error()

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2552``—``2556`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toast.warning``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106310:106401:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2553``—``2555`` 行；所属函数 ``error``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``appendIsCurrent``、``appendSync.request``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:107565:137339:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586({ event, payload, reply, eventRunId, eventTurnId })

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2586``—``3139`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

``{ event, payload, reply, eventRunId, eventTurnId }``
   调用方传入的 ``event, payload, reply, eventRunId, eventTurnId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``['conversation.messages.reload_requested', 'conversation.messages.reconciled', 'conversation.deleted'].includes``、``appendSync.invalidate``、``MESSAGE_STREAM_EVENTS.has``、``markLiveStreamMessages``、``Object.keys``、``streamBatch.enqueue``、``streamBatch.flush``、``reply``、``['normal', 'generating', 'disabled'].includes``、``setTurnSubmission``、``handleSpeakMessageRequest``、``cancelActiveSpeech``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:111190:111221:FUNCTION

.. rubric:: ``submitMessageDeletion(msgId).then callback @ 2659``

.. code-block:: javascript

   submitMessageDeletion(msgId).then callback @ 2659(success)

处理 ``submitMessageDeletion(msgId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2659``—``2659`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114706:114852:FUNCTION

.. rubric:: ``anonymous callback @ 2723``

.. code-block:: javascript

   anonymous callback @ 2723(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2723``—``2725`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114912:115036:FUNCTION

.. rubric:: ``anonymous callback @ 2727``

.. code-block:: javascript

   anonymous callback @ 2727(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2727``—``2729`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115089:115213:FUNCTION

.. rubric:: ``anonymous callback @ 2731``

.. code-block:: javascript

   anonymous callback @ 2731(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2731``—``2733`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116436:116761:FUNCTION

.. rubric:: ``produce callback @ 2759``

.. code-block:: javascript

   produce callback @ 2759(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2759``—``2764`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118082:118415:FUNCTION

.. rubric:: ``produce callback @ 2787``

.. code-block:: javascript

   produce callback @ 2787(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2787``—``2793`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119249:119609:FUNCTION

.. rubric:: ``produce callback @ 2807``

.. code-block:: javascript

   produce callback @ 2807(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2807``—``2813`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120676:120988:FUNCTION

.. rubric:: ``produce callback @ 2833``

.. code-block:: javascript

   produce callback @ 2833(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2833``—``2838`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121571:122274:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2849``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2849()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value, }, conversation Id: conversation Id, loc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2849``—``2861`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121664:122242:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2850``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2850()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2850``—``2860`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2849``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122901:123429:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2876``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2876()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message, }, conversation Id: conversation I…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2876``—``2887`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122992:123405:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2877``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2877()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2877``—``2886`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2876``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124373:125439:FUNCTION

.. rubric:: ``produce callback @ 2904``

.. code-block:: javascript

   produce callback @ 2904(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2904``—``2921`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:126418:128023:FUNCTION

.. rubric:: ``produce callback @ 2941``

.. code-block:: javascript

   produce callback @ 2941(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2941``—``2963`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeMessageContextState``、``preserveReplacementContextStatus``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:129788:129824:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2997``

.. code-block:: javascript

   window.setTimeout callback @ 2997()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2997``—``2997`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132201:132787:FUNCTION

.. rubric:: ``produce callback @ 3047``

.. code-block:: javascript

   produce callback @ 3047(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3047``—``3056`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133517:133938:FUNCTION

.. rubric:: ``produce callback @ 3069``

.. code-block:: javascript

   produce callback @ 3069(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3069``—``3075`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134673:135095:FUNCTION

.. rubric:: ``produce callback @ 3091``

.. code-block:: javascript

   produce callback @ 3091(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3091``—``3097`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2586``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``removeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137439:137774:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 3142``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 3142()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3142``—``3149`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``、``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137926:138029:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3154``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3154({ event, payload, reply })

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3154``—``3156`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138239:138527:FUNCTION

.. rubric:: ``returned callback @ 3160``

.. code-block:: javascript

   returned callback @ 3160()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3160``—``3168`` 行；所属函数 ``useEffect callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``appendSync.invalidate``、``streamBatch.flush``、``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139347:139432:FUNCTION

.. rubric:: ``useEffect callback @ 3198``

.. code-block:: javascript

   useEffect callback @ 3198()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3198``—``3202`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139369:139425:FUNCTION

.. rubric:: ``returned callback @ 3199``

.. code-block:: javascript

   returned callback @ 3199()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3199``—``3201`` 行；所属函数 ``useEffect callback @ 3198``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139472:139547:FUNCTION

.. rubric:: ``useEffect callback @ 3204``

.. code-block:: javascript

   useEffect callback @ 3204()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3204``—``3206`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139588:142099:FUNCTION

.. rubric:: ``useEffect callback @ 3208``

.. code-block:: javascript

   useEffect callback @ 3208()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3208``—``3260`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setTurnSubmission``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141976:142037:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 3255``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 3255(_, id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3255``—``3257`` 行；所属函数 ``useEffect callback @ 3208``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142177:142776:FUNCTION

.. rubric:: ``useEffect callback @ 3262``

.. code-block:: javascript

   useEffect callback @ 3262()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3262``—``3277`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142402:142566:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 3267``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 3267(items)

处理 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3267``—``3270`` 行；所属函数 ``useEffect callback @ 3262``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142587:142704:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 3271``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 3271()

实现 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3271``—``3273`` 行；所属函数 ``useEffect callback @ 3262``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142721:142769:FUNCTION

.. rubric:: ``returned callback @ 3274``

.. code-block:: javascript

   returned callback @ 3274()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3274``—``3276`` 行；所属函数 ``useEffect callback @ 3262``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142842:145107:FUNCTION

.. rubric:: ``useCallback callback @ 3280``

.. code-block:: javascript

   async useCallback callback @ 3280({ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3280``—``3319`` 行；所属函数 ``ChatPage``。

**参数**

``{ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true }`` （默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``normalizedModels``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``isCurrent``、``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142924:142935:FUNCTION

.. rubric:: ``anonymous callback @ 3280``

.. code-block:: javascript

   anonymous callback @ 3280()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3280``—``3280`` 行；所属函数 ``useCallback callback @ 3280``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144484:144520:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 3306``

.. code-block:: javascript

   normalizedModels.find callback @ 3306(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3306``—``3306`` 行；所属函数 ``useCallback callback @ 3280``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145160:145369:FUNCTION

.. rubric:: ``useEffect callback @ 3323``

.. code-block:: javascript

   useEffect callback @ 3323()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3323``—``3327`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145765:146061:FUNCTION

.. rubric:: ``useEffect callback @ 3333``

.. code-block:: javascript

   useEffect callback @ 3333()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3333``—``3338`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146163:154570:FUNCTION

.. rubric:: ``useEffect callback @ 3340``

.. code-block:: javascript

   useEffect callback @ 3340()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3340``—``3519`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146578:146665:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3349``—``3349`` 行；所属函数 ``useEffect callback @ 3340``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146770:148048:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3352``—``3378`` 行；所属函数 ``useEffect callback @ 3340``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``getOptionWriter(conversationId).apply``、``getOptionWriter``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147438:147470:FUNCTION

.. rubric:: ``modelsData.find callback @ 3365``

.. code-block:: javascript

   modelsData.find callback @ 3365(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3365``—``3365`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148079:148824:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3379``—``3394`` 行；所属函数 ``useEffect callback @ 3340``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``loadAvailableModels``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148556:148602:FUNCTION

.. rubric:: ``modelsData.find callback @ 3390``

.. code-block:: javascript

   modelsData.find callback @ 3390(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3390``—``3390`` 行；所属函数 ``requestModels``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148857:153498:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3395``—``3489`` 行；所属函数 ``useEffect callback @ 3340``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:151107:152013:FUNCTION

.. rubric:: ``setTimeout callback @ 3437``

.. code-block:: javascript

   setTimeout callback @ 3437()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3437``—``3454`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:151192:151989:FUNCTION

.. rubric:: ``setTimeout callback @ 3439``

.. code-block:: javascript

   setTimeout callback @ 3439()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3439``—``3453`` 行；所属函数 ``setTimeout callback @ 3437``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:152406:152598:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3462``—``3466`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:152875:153467:FUNCTION

.. rubric:: ``setTimeout callback @ 3475``

.. code-block:: javascript

   setTimeout callback @ 3475()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3475``—``3487`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:153524:154266:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3490``—``3508`` 行；所属函数 ``useEffect callback @ 3340``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setIsLoading``、``performance.now``、``Promise.all``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154538:154563:FUNCTION

.. rubric:: ``returned callback @ 3518``

.. code-block:: javascript

   returned callback @ 3518()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3518``—``3518`` 行；所属函数 ``useEffect callback @ 3340``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154876:155057:FUNCTION

.. rubric:: ``useCallback callback @ 3532``

.. code-block:: javascript

   async useCallback callback @ 3532()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3532``—``3535`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155127:155461:FUNCTION

.. rubric:: ``useCallback callback @ 3536``

.. code-block:: javascript

   async useCallback callback @ 3536()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3536``—``3544`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``setRemoteSettingsPanel``、``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155438:155453:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 3543``

.. code-block:: javascript

   setIsSidebarOpen callback @ 3543(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3543``—``3543`` 行；所属函数 ``useCallback callback @ 3536``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155549:156007:FUNCTION

.. rubric:: ``useCallback callback @ 3545``

.. code-block:: javascript

   async useCallback callback @ 3545()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3545``—``3557`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleSidebarClose``、``setRemoteSettingsPanel``、``encodeURIComponent``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156132:156222:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 3561``

.. code-block:: javascript

   useBrowserBackLayer callback @ 3561()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3561``—``3564`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSidebarClose``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156373:157495:FUNCTION

.. rubric:: ``useEffect callback @ 3570``

.. code-block:: javascript

   useEffect callback @ 3570()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3570``—``3590`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; if (!opened && selfMessageFocusRef.current === key) selfMessageFocusRef.current = null; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``new URLSearchParams(routeLocation.search).get``、``(async () => { if (remoteSettingsPanelRef.current && !(await remoteSettingsPanelRef.current.canClose())) return; if (ca…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156779:157321:FUNCTION

.. rubric:: ``anonymous callback @ 3577``

.. code-block:: javascript

   async anonymous callback @ 3577()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3577``—``3585`` 行；所属函数 ``useEffect callback @ 3570``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``encodeURIComponent``、``setRemoteSettingsPanel``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157340:157488:FUNCTION

.. rubric:: ``returned callback @ 3586``

.. code-block:: javascript

   returned callback @ 3586()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3586``—``3589`` 行；所属函数 ``useEffect callback @ 3570``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157571:157887:FUNCTION

.. rubric:: ``useEffect callback @ 3591``

.. code-block:: javascript

   useEffect callback @ 3591()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3591``—``3597`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``new URLSearchParams(window.location.search).get``、``jumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:163889:163922:FUNCTION

.. rubric:: ``onClose callback @ 3703``

.. code-block:: javascript

   onClose callback @ 3703()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3703``—``3703`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167485:167515:FUNCTION

.. rubric:: ``onStop callback @ 3761``

.. code-block:: javascript

   onStop callback @ 3761()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3761``—``3761`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167561:167588:FUNCTION

.. rubric:: ``onPrevious callback @ 3762``

.. code-block:: javascript

   onPrevious callback @ 3762()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3762``—``3762`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167630:167656:FUNCTION

.. rubric:: ``onNext callback @ 3763``

.. code-block:: javascript

   onNext callback @ 3763()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3763``—``3763`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:170180:170364:FUNCTION

.. rubric:: ``onClick callback @ 3803``

.. code-block:: javascript

   onClick callback @ 3803()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3803``—``3806`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:175052:175646:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3876``

.. code-block:: javascript

   onWorkspaceChange callback @ 3876(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3876``—``3884`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:175246:175535:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3878``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3878(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3878``—``3882`` 行；所属函数 ``onWorkspaceChange callback @ 3876``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179373:179575:FUNCTION

.. rubric:: ``anonymous callback @ 3954``

.. code-block:: javascript

   anonymous callback @ 3954()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3954``—``3957`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179801:179945:FUNCTION

.. rubric:: ``onToggleAvatarScene callback @ 3963``

.. code-block:: javascript

   onToggleAvatarScene callback @ 3963()

处理 ``Toggle Avatar Scene`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3963``—``3966`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAvatarScene``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180183:180319:FUNCTION

.. rubric:: ``onEnd callback @ 3969``

.. code-block:: javascript

   onEnd callback @ 3969()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3969``—``3972`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180357:180395:FUNCTION

.. rubric:: ``onMinimize callback @ 3973``

.. code-block:: javascript

   onMinimize callback @ 3973()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3973``—``3973`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180432:180582:FUNCTION

.. rubric:: ``onRestore callback @ 3974``

.. code-block:: javascript

   onRestore callback @ 3974()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3974``—``3977`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181626:185139:FUNCTION

.. rubric:: ``onSettingChange callback @ 3993``

.. code-block:: javascript

   onSettingChange callback @ 3993(values, change)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3993``—``4041`` 行；所属函数 ``ChatPage``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``change``
   调用方传入的 ``change`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Object.fromEntries``、``Object.entries(values).filter``、``Object.entries``、``Object.keys``、``queueAgentConfiguration``、``Object.entries(patch).filter``、``getOptionWriter(conversationId).edit``、``getOptionWriter``、``Object.keys(allowed).some``、``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…``、``avatarSelectionQueue.current .catch(() => {}) .then``、``avatarSelectionQueue.current .catch``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181872:182115:FUNCTION

.. rubric:: ``Object.entries(values).filter callback @ 3997``

.. code-block:: javascript

   Object.entries(values).filter callback @ 3997([key, value])

作为 ``Object.entries(values).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3997``—``3999`` 行；所属函数 ``onSettingChange callback @ 3993``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182597:182671:FUNCTION

.. rubric:: ``Object.entries(patch).filter callback @ 4005``

.. code-block:: javascript

   Object.entries(patch).filter callback @ 4005([key])

作为 ``Object.entries(patch).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4005``—``4005`` 行；所属函数 ``onSettingChange callback @ 3993``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['avatarModelId', 'workspaceId', 'workspaceIds'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182848:182885:FUNCTION

.. rubric:: ``Object.keys(allowed).some callback @ 4007``

.. code-block:: javascript

   Object.keys(allowed).some callback @ 4007(key)

作为 ``Object.keys(allowed).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4007``—``4007`` 行；所属函数 ``onSettingChange callback @ 3993``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``key.startsWith``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183533:183541:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch callback @ 4018``

.. code-block:: javascript

   avatarSelectionQueue.current .catch callback @ 4018()

处理 ``avatarSelectionQueue.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``4018``—``4018`` 行；所属函数 ``onSettingChange callback @ 3993``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183585:184297:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 4019``

.. code-block:: javascript

   async avatarSelectionQueue.current .catch(() => {}) .then callback @ 4019()

处理 ``avatarSelectionQueue.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``4019``—``4028`` 行；所属函数 ``onSettingChange callback @ 3993``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(result.message || '角色模型保存失败')``。

**主要协作调用**：``emitEvent``、``setAvatarModelRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184231:184257:FUNCTION

.. rubric:: ``setAvatarModelRevision callback @ 4027``

.. code-block:: javascript

   setAvatarModelRevision callback @ 4027(revision)

设置与 ``Avatar Model Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``4027``—``4027`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 4019``。

**参数**

``revision``
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184342:184959:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4029``

.. code-block:: javascript

   avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4029(error)

实现 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4029``—``4037`` 行；所属函数 ``onSettingChange callback @ 3993``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``setAdvancedSettingsValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184605:184873:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 4032``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 4032(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``4032``—``4035`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4029``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186075:186198:FUNCTION

.. rubric:: ``onClose callback @ 4066``

.. code-block:: javascript

   onClose callback @ 4066()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4066``—``4069`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186700:186970:FUNCTION

.. rubric:: ``onOpenChange callback @ 4081``

.. code-block:: javascript

   onOpenChange callback @ 4081(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4081``—``4088`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:187266:187346:FUNCTION

.. rubric:: ``onConfirm callback @ 4094``

.. code-block:: javascript

   onConfirm callback @ 4094()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4094``—``4094`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``submitMessageDeletion``。
