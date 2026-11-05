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
* **局部函数与匿名回调**：299

主要依赖
--------------------------------------------------------------------------------

``./page/utils/messageStreamBatch.js``、``./page/utils/appendedHistory.js``、``./page/utils/messageDeletion.js``、``./page/utils/conversationOptions.js``、``@/runtime/backend/connection.js``、``./page/openChatWindow.js``、``lucide-react``、``react``、``framer-motion``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``@/context/useEventStore.jsx``、``react-i18next``、``react-router-dom``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/RuntimeInspectorDialog.jsx``、``@/features/settings-runtime/RemoteSettingsPanel.jsx``、``@/features/chat/page/hooks/useRuntimeInspector.js``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``./freeze/useConversationFreeze.js``、``./freeze/ConversationFreezeNotice.jsx``、``./freeze/ConversationFreezeContext.jsx``、``@/features/execution``、``@/features/workspace/useWorkspaceTransferStore.js``、``./attachmentVision.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4119:4219:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``89``—``91`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4268:4409:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``96`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4454:4695:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``98``—``104`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4826:4992:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``110``—``114`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5017:5070:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``116``—``116`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5100:5255:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``121`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${baseEndpoint}/${encodeURIComponent(String(id))}\x60``。

   **主要协作调用**：``String(endpoint || '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5276:5442:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``123``—``128`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5466:5518:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``130``—``130`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5545:5645:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``132``—``135`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ text: String(data.text ?? '') }``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5669:5814:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``137``—``140`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5845:6445:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``142``—``160`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], { type: ASR_AUDIO_MIME_TYPE }) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], { type: ASR_AUDIO_MIME_TYPE }) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6477:6621:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``162``—``165`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6622:187000:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``168``—``4098`` 行。

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

   **内部回调数量**：113。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4854:4991:FUNCTION

.. rubric:: ``anonymous callback @ 111``

.. code-block:: javascript

   anonymous callback @ 111(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``111``—``114`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:8681:8733:FUNCTION

.. rubric:: ``useMemo callback @ 211``

.. code-block:: javascript

   useMemo callback @ 211()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pendingBodyForwarding``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11962:12090:FUNCTION

.. rubric:: ``useEffect callback @ 272``

.. code-block:: javascript

   useEffect callback @ 272()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``272``—``274`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12501:12539:FUNCTION

.. rubric:: ``useState callback @ 279``

.. code-block:: javascript

   useState callback @ 279()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12698:13643:FUNCTION

.. rubric:: ``useCallback callback @ 282``

.. code-block:: javascript

   useCallback callback @ 282(target)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``300`` 行；所属函数 ``ChatPage``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``optionWritersRef.current.get(key)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``getBackendConnection``、``optionWritersRef.current.has``、``optionWritersRef.current.set``、``optionWritersRef.current.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12967:13203:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   save(patch)

保存与 ``save`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``287``—``290`` 行；所属函数 ``useCallback callback @ 282``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.patch(\x60/chat/conversations/${encodeURIComponent(target)}/options\x60, {patch})``。

**显式抛出**：``new Error('后端连接已切换，请重新打开会话设置')``。

**主要协作调用**：``isCurrentConnection``、``apiClient.patch``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13230:13477:FUNCTION

.. rubric:: ``onValues``

.. code-block:: javascript

   onValues(values)

处理 ``Values`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``295`` 行；所属函数 ``useCallback callback @ 282``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentConnection``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13503:13559:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``useCallback callback @ 282``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13664:13784:FUNCTION

.. rubric:: ``useEffect callback @ 301``

.. code-block:: javascript

   useEffect callback @ 301()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``303`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13669:13784:FUNCTION

.. rubric:: ``anonymous callback @ 301``

.. code-block:: javascript

   anonymous callback @ 301()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``303`` 行；所属函数 ``useEffect callback @ 301``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``optionWritersRef.current.values``、``writer.flush().catch``、``writer.flush``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13768:13776:FUNCTION

.. rubric:: ``writer.flush().catch callback @ 302``

.. code-block:: javascript

   writer.flush().catch callback @ 302()

处理 ``writer.flush().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``302``—``302`` 行；所属函数 ``anonymous callback @ 301``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14095:14685:FUNCTION

.. rubric:: ``useCallback callback @ 309``

.. code-block:: javascript

   useCallback callback @ 309(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``309``—``319`` 行；所属函数 ``ChatPage``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationMeta``、``modelCatalogRef.current.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14222:14306:FUNCTION

.. rubric:: ``setConversationMeta callback @ 311``

.. code-block:: javascript

   setConversationMeta callback @ 311(current)

设置与 ``Conversation Meta`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``useCallback callback @ 309``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14360:14402:FUNCTION

.. rubric:: ``modelCatalogRef.current.find callback @ 312``

.. code-block:: javascript

   modelCatalogRef.current.find callback @ 312(entry)

作为 ``modelCatalogRef.current.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``useCallback callback @ 309``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14740:15395:FUNCTION

.. rubric:: ``useCallback callback @ 320``

.. code-block:: javascript

   useCallback callback @ 320()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``320``—``334`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…``、``agentConfigurationQueueRef.current .catch(() => {}) .then``、``agentConfigurationQueueRef.current .catch``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14992:15000:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch callback @ 325``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch callback @ 325()

处理 ``agentConfigurationQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``useCallback callback @ 320``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15020:15314:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 326``

.. code-block:: javascript

   async agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 326()

处理 ``agentConfigurationQueueRef.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``326``—``332`` 行；所属函数 ``useCallback callback @ 320``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``、``applyAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15335:15387:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent… callback @ 333``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( `/chat/agent… callback @ 333(error)

实现 ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``333``—``333`` 行；所属函数 ``useCallback callback @ 320``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15473:16211:FUNCTION

.. rubric:: ``useCallback callback @ 336``

.. code-block:: javascript

   useCallback callback @ 336(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``336``—``348`` 行；所属函数 ``ChatPage``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``flushAgentConfiguration``、``clearTimeout``、``setTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16269:16402:FUNCTION

.. rubric:: ``useEffect callback @ 352``

.. code-block:: javascript

   useEffect callback @ 352()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``352``—``355`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16283:16402:FUNCTION

.. rubric:: ``anonymous callback @ 352``

.. code-block:: javascript

   anonymous callback @ 352()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``352``—``355`` 行；所属函数 ``useEffect callback @ 352``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``flushAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16830:16893:FUNCTION

.. rubric:: ``useEffect callback @ 365``

.. code-block:: javascript

   useEffect callback @ 365()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``365``—``367`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16928:17165:FUNCTION

.. rubric:: ``useEffect callback @ 370``

.. code-block:: javascript

   useEffect callback @ 370()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``370``—``375`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16942:17165:FUNCTION

.. rubric:: ``anonymous callback @ 370``

.. code-block:: javascript

   anonymous callback @ 370()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``370``—``375`` 行；所属函数 ``useEffect callback @ 370``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17239:18140:FUNCTION

.. rubric:: ``useCallback callback @ 379``

.. code-block:: javascript

   useCallback callback @ 379(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``379``—``396`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status || '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17847:18115:FUNCTION

.. rubric:: ``setTimeout callback @ 389``

.. code-block:: javascript

   setTimeout callback @ 389()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``389``—``394`` 行；所属函数 ``useCallback callback @ 379``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17897:18018:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 390``

.. code-block:: javascript

   setContextCompactionState callback @ 390(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``390``—``391`` 行；所属函数 ``setTimeout callback @ 389``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18433:18600:FUNCTION

.. rubric:: ``useEffect callback @ 403``

.. code-block:: javascript

   useEffect callback @ 403()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``403``—``408`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeletingMessage``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19766:19916:FUNCTION

.. rubric:: ``useCallback callback @ 448``

.. code-block:: javascript

   useCallback callback @ 448()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``448``—``451`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19998:20090:FUNCTION

.. rubric:: ``handleWindowMode``

.. code-block:: javascript

   handleWindowMode()

处理 ``Window Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``452``—``455`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWindowMode``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20140:20831:FUNCTION

.. rubric:: ``useCallback callback @ 457``

.. code-block:: javascript

   useCallback callback @ 457(messageIds, runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``457``—``469`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20275:20312:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 459``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 459(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``459``—``459`` 行；所属函数 ``useCallback callback @ 457``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20418:20479:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 463``

.. code-block:: javascript

   normalizedIds.forEach callback @ 463(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``463``—``463`` 行；所属函数 ``useCallback callback @ 457``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``liveStreamMessageIdsRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20706:20747:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 467``

.. code-block:: javascript

   normalizedIds.forEach callback @ 467(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``467``—``467`` 行；所属函数 ``useCallback callback @ 457``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runMessages.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20882:21489:FUNCTION

.. rubric:: ``useCallback callback @ 471``

.. code-block:: javascript

   useCallback callback @ 471(runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``471``—``483`` 行；所属函数 ``ChatPage``。

**参数**

``runId`` （默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.delete``、``runMessages.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21211:21481:FUNCTION

.. rubric:: ``runMessages.forEach callback @ 477``

.. code-block:: javascript

   runMessages.forEach callback @ 477(messageId)

作为 ``runMessages.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``477``—``482`` 行；所属函数 ``useCallback callback @ 471``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(liveStreamRunMessagesRef.current.values()).some``、``Array.from``、``liveStreamRunMessagesRef.current.values``、``liveStreamMessageIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21318:21375:FUNCTION

.. rubric:: ``Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 478``

.. code-block:: javascript

   Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 478(messageIds)

作为 ``Array.from(liveStreamRunMessagesRef.current.values()).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``478``—``479`` 行；所属函数 ``runMessages.forEach callback @ 477``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messageIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21549:22639:FUNCTION

.. rubric:: ``useCallback callback @ 485``

.. code-block:: javascript

   useCallback callback @ 485(messageIds)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``485``—``509`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``restoreMissingStreamTail``、``nextOrder.every``、``setMessagesOrder``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21967:22004:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 492``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 492(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``492``—``492`` 行；所属函数 ``useCallback callback @ 485``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22451:22518:FUNCTION

.. rubric:: ``nextOrder.every callback @ 503``

.. code-block:: javascript

   nextOrder.every callback @ 503(messageId, index)

作为 ``nextOrder.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``503``—``503`` 行；所属函数 ``useCallback callback @ 485``。

**参数**

``messageId``
   Message 的公共 UUID。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22688:23529:FUNCTION

.. rubric:: ``useCallback callback @ 512``

.. code-block:: javascript

   useCallback callback @ 512(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``512``—``528`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages`` （默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22757:23528:FUNCTION

.. rubric:: ``produce callback @ 513``

.. code-block:: javascript

   produce callback @ 513(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``513``—``528`` 行；所属函数 ``useCallback callback @ 512``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft || {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22820:23512:FUNCTION

.. rubric:: ``Object.keys(draft || {}).forEach callback @ 514``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 514(key)

作为 ``Object.keys(draft || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``514``—``527`` 行；所属函数 ``produce callback @ 513``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23130:23252:FUNCTION

.. rubric:: ``anonymous callback @ 520``

.. code-block:: javascript

   anonymous callback @ 520(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``520``—``522`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 514``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23304:23404:FUNCTION

.. rubric:: ``anonymous callback @ 523``

.. code-block:: javascript

   anonymous callback @ 523(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``523``—``525`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 514``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23449:23493:FUNCTION

.. rubric:: ``anonymous callback @ 526``

.. code-block:: javascript

   anonymous callback @ 526(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``526``—``526`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 514``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23596:26253:FUNCTION

.. rubric:: ``useCallback callback @ 533``

.. code-block:: javascript

   async useCallback callback @ 533({ silent = false, append = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``533``—``591`` 行；所属函数 ``ChatPage``。

**参数**

``{ silent = false, append = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26379:26818:FUNCTION

.. rubric:: ``useCallback callback @ 596``

.. code-block:: javascript

   useCallback callback @ 596(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``596``—``608`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26601:26786:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 600``

.. code-block:: javascript

   requestAnimationFrame callback @ 600()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``600``—``605`` 行；所属函数 ``useCallback callback @ 596``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26873:27091:FUNCTION

.. rubric:: ``useCallback callback @ 610``

.. code-block:: javascript

   useCallback callback @ 610(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``610``—``617`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27170:27591:FUNCTION

.. rubric:: ``useCallback callback @ 621``

.. code-block:: javascript

   useCallback callback @ 621(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``621``—``630`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``queueAgentConfiguration``、``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27731:27845:FUNCTION

.. rubric:: ``useCallback callback @ 634``

.. code-block:: javascript

   useCallback callback @ 634(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``634``—``638`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28308:28434:FUNCTION

.. rubric:: ``useCallback callback @ 657``

.. code-block:: javascript

   useCallback callback @ 657()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``657``—``659`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine(getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote'))``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28501:28781:FUNCTION

.. rubric:: ``useCallback callback @ 661``

.. code-block:: javascript

   useCallback callback @ 661()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``661``—``666`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage), )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28856:29955:FUNCTION

.. rubric:: ``useCallback callback @ 668``

.. code-block:: javascript

   useCallback callback @ 668({ cancel = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``668``—``701`` 行；所属函数 ``ChatPage``。

**参数**

``{ cancel = false }`` （默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({ text: '', error: null })``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \x60${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29176:29947:FUNCTION

.. rubric:: ``anonymous callback @ 677``

.. code-block:: javascript

   anonymous callback @ 677(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``677``—``700`` 行；所属函数 ``useCallback callback @ 668``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29250:29553:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``679``—``685`` 行；所属函数 ``anonymous callback @ 677``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\x60${session.finalTranscript} ${session.interimTranscript}\x60.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30017:31845:FUNCTION

.. rubric:: ``useCallback callback @ 703``

.. code-block:: javascript

   useCallback callback @ 703()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``703``—``758`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30772:31386:FUNCTION

.. rubric:: ``anonymous callback @ 725``

.. code-block:: javascript

   anonymous callback @ 725(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``725``—``740`` 行；所属函数 ``useCallback callback @ 703``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${session.finalTranscript} ${transcript}\x60.trim``、``\x60${interimTranscript} ${transcript}\x60.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31418:31492:FUNCTION

.. rubric:: ``anonymous callback @ 742``

.. code-block:: javascript

   anonymous callback @ 742(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``742``—``744`` 行；所属函数 ``useCallback callback @ 703``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31522:31531:FUNCTION

.. rubric:: ``anonymous callback @ 746``

.. code-block:: javascript

   anonymous callback @ 746()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``746``—``746`` 行；所属函数 ``useCallback callback @ 703``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31970:32508:FUNCTION

.. rubric:: ``useCallback callback @ 760``

.. code-block:: javascript

   useCallback callback @ 760()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``760``—``776`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ engine: 'remote' }``、``{ engine: 'remote', fallback: true }``、``{ engine: 'local' }``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32629:35862:FUNCTION

.. rubric:: ``useCallback callback @ 779``

.. code-block:: javascript

   async useCallback callback @ 779(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``779``—``864`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35929:36795:FUNCTION

.. rubric:: ``useCallback callback @ 869``

.. code-block:: javascript

   async useCallback callback @ 869(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``869``—``891`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ text }``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36960:37089:FUNCTION

.. rubric:: ``useCallback callback @ 895``

.. code-block:: javascript

   useCallback callback @ 895()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``895``—``898`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37605:37722:FUNCTION

.. rubric:: ``useCallback callback @ 914``

.. code-block:: javascript

   useCallback callback @ 914()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``914``—``916`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37777:37888:FUNCTION

.. rubric:: ``useCallback callback @ 918``

.. code-block:: javascript

   useCallback callback @ 918(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``918``—``920`` 行；所属函数 ``ChatPage``。

**参数**

``duration`` （默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37943:38345:FUNCTION

.. rubric:: ``useCallback callback @ 922``

.. code-block:: javascript

   useCallback callback @ 922()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``922``—``931`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38471:38714:FUNCTION

.. rubric:: ``useCallback callback @ 933``

.. code-block:: javascript

   useCallback callback @ 933()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``933``—``939`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38924:39345:FUNCTION

.. rubric:: ``useCallback callback @ 942``

.. code-block:: javascript

   useCallback callback @ 942()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``942``—``950`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39367:39478:FUNCTION

.. rubric:: ``useEffect callback @ 952``

.. code-block:: javascript

   useEffect callback @ 952()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``952``—``955`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``cancelAfterRenderScroll``。

**主要协作调用**：``cancelAfterRenderScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39618:41815:FUNCTION

.. rubric:: ``useCallback callback @ 959``

.. code-block:: javascript

   useCallback callback @ 959(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``959``—``1012`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll`` （默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelAfterRenderScroll``、``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39882:41025:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``964``—``991`` 行；所属函数 ``useCallback callback @ 959``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41061:41619:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``993``—``1005`` 行；所属函数 ``useCallback callback @ 959``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41235:41603:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 996``

.. code-block:: javascript

   requestAnimationFrame callback @ 996()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``996``—``1004`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41464:41583:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1000``

.. code-block:: javascript

   requestAnimationFrame callback @ 1000()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1000``—``1003`` 行；所属函数 ``requestAnimationFrame callback @ 996``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42222:42611:FUNCTION

.. rubric:: ``useCallback callback @ 1026``

.. code-block:: javascript

   useCallback callback @ 1026()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1026``—``1036`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44445:44517:FUNCTION

.. rubric:: ``useEffect callback @ 1088``

.. code-block:: javascript

   useEffect callback @ 1088()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1088``—``1090`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44685:44778:FUNCTION

.. rubric:: ``useCallback callback @ 1092``

.. code-block:: javascript

   useCallback callback @ 1092()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1092``—``1095`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44753:44770:FUNCTION

.. rubric:: ``setAvatarSceneOpen callback @ 1094``

.. code-block:: javascript

   setAvatarSceneOpen callback @ 1094(value)

设置与 ``Avatar Scene Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1094``—``1094`` 行；所属函数 ``useCallback callback @ 1092``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44830:44872:FUNCTION

.. rubric:: ``useCallback callback @ 1096``

.. code-block:: javascript

   useCallback callback @ 1096()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1096``—``1096`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44854:44871:FUNCTION

.. rubric:: ``setAvatarExpanded callback @ 1096``

.. code-block:: javascript

   setAvatarExpanded callback @ 1096(value)

设置与 ``Avatar Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1096``—``1096`` 行；所属函数 ``useCallback callback @ 1096``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44920:45002:FUNCTION

.. rubric:: ``useCallback callback @ 1097``

.. code-block:: javascript

   useCallback callback @ 1097()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1097``—``1100`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45397:45469:FUNCTION

.. rubric:: ``useEffect callback @ 1114``

.. code-block:: javascript

   useEffect callback @ 1114()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1114``—``1116`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45634:45729:FUNCTION

.. rubric:: ``useEffect callback @ 1119``

.. code-block:: javascript

   useEffect callback @ 1119()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1119``—``1121`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``freezeVoiceStop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45904:46050:FUNCTION

.. rubric:: ``useEffect callback @ 1124``

.. code-block:: javascript

   useEffect callback @ 1124()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1124``—``1127`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46362:46406:FUNCTION

.. rubric:: ``useEffect callback @ 1132``

.. code-block:: javascript

   useEffect callback @ 1132()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1132``—``1134`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46479:47350:FUNCTION

.. rubric:: ``useCallback callback @ 1136``

.. code-block:: javascript

   async useCallback callback @ 1136()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1136``—``1156`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47406:48161:FUNCTION

.. rubric:: ``useCallback callback @ 1159``

.. code-block:: javascript

   async useCallback callback @ 1159(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1159``—``1177`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48245:49336:FUNCTION

.. rubric:: ``useCallback callback @ 1182``

.. code-block:: javascript

   async useCallback callback @ 1182(storyId, partId, changes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1182``—``1205`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48675:48804:FUNCTION

.. rubric:: ``setStories callback @ 1190``

.. code-block:: javascript

   setStories callback @ 1190(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1190``—``1191`` 行；所属函数 ``useCallback callback @ 1182``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48716:48803:FUNCTION

.. rubric:: ``current.map callback @ 1191``

.. code-block:: javascript

   current.map callback @ 1191(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1191``—``1191`` 行；所属函数 ``setStories callback @ 1190``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48848:49237:FUNCTION

.. rubric:: ``setActiveStory callback @ 1193``

.. code-block:: javascript

   setActiveStory callback @ 1193(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1193``—``1202`` 行；所属函数 ``useCallback callback @ 1182``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, ...nextStory, parts: (current.parts || []).map((item) => Number(item.partId) === Number(partId) ? data.part : item, ), }``。

**主要协作调用**：``Number``、``(current.parts || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49089:49180:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1198``

.. code-block:: javascript

   (current.parts || []).map callback @ 1198(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1198``—``1199`` 行；所属函数 ``setActiveStory callback @ 1193``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49411:50723:FUNCTION

.. rubric:: ``useCallback callback @ 1210``

.. code-block:: javascript

   async useCallback callback @ 1210(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1210``—``1240`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49876:50065:FUNCTION

.. rubric:: ``setStories callback @ 1220``

.. code-block:: javascript

   setStories callback @ 1220(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1220``—``1223`` 行；所属函数 ``useCallback callback @ 1210``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49925:50038:FUNCTION

.. rubric:: ``current.map callback @ 1221``

.. code-block:: javascript

   current.map callback @ 1221(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1221``—``1222`` 行；所属函数 ``setStories callback @ 1220``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50125:50247:FUNCTION

.. rubric:: ``setActiveStory callback @ 1225``

.. code-block:: javascript

   setActiveStory callback @ 1225(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1225``—``1226`` 行；所属函数 ``useCallback callback @ 1210``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50798:51900:FUNCTION

.. rubric:: ``useCallback callback @ 1245``

.. code-block:: javascript

   async useCallback callback @ 1245(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1245``—``1270`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51108:51187:FUNCTION

.. rubric:: ``setStories callback @ 1251``

.. code-block:: javascript

   setStories callback @ 1251(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1251``—``1251`` 行；所属函数 ``useCallback callback @ 1245``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51136:51186:FUNCTION

.. rubric:: ``current.filter callback @ 1251``

.. code-block:: javascript

   current.filter callback @ 1251(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1251``—``1251`` 行；所属函数 ``setStories callback @ 1251``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51221:51471:FUNCTION

.. rubric:: ``setActiveStory callback @ 1252``

.. code-block:: javascript

   setActiveStory callback @ 1252(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1252``—``1258`` 行；所属函数 ``useCallback callback @ 1245``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51978:52307:FUNCTION

.. rubric:: ``useCallback callback @ 1275``

.. code-block:: javascript

   useCallback callback @ 1275(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1275``—``1282`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \x60story:${story.storyId}:part:${part.partId}\x60, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52394:52441:FUNCTION

.. rubric:: ``useCallback callback @ 1286``

.. code-block:: javascript

   useCallback callback @ 1286()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1286``—``1288`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52481:52611:FUNCTION

.. rubric:: ``useEffect callback @ 1290``

.. code-block:: javascript

   useEffect callback @ 1290()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1290``—``1295`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStories``、``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52660:56367:FUNCTION

.. rubric:: ``useEffect callback @ 1298``

.. code-block:: javascript

   useEffect callback @ 1298()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1298``—``1371`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52888:56366:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303({ event, payload })

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1303``—``1371`` 行；所属函数 ``useEffect callback @ 1298``。

**参数**

``{ event, payload }``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53245:53318:FUNCTION

.. rubric:: ``setStories callback @ 1311``

.. code-block:: javascript

   setStories callback @ 1311(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1311``—``1311`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53273:53317:FUNCTION

.. rubric:: ``current.filter callback @ 1311``

.. code-block:: javascript

   current.filter callback @ 1311(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1311``—``1311`` 行；所属函数 ``setStories callback @ 1311``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53356:53624:FUNCTION

.. rubric:: ``setActiveStory callback @ 1312``

.. code-block:: javascript

   setActiveStory callback @ 1312(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1312``—``1318`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54101:54624:FUNCTION

.. rubric:: ``loadStories().then callback @ 1329``

.. code-block:: javascript

   loadStories().then callback @ 1329(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1329``—``1339`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54154:54600:FUNCTION

.. rubric:: ``setActiveStory callback @ 1330``

.. code-block:: javascript

   setActiveStory callback @ 1330(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1330``—``1338`` 行；所属函数 ``loadStories().then callback @ 1329``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54292:54350:FUNCTION

.. rubric:: ``values.some callback @ 1332``

.. code-block:: javascript

   values.some callback @ 1332(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1332``—``1332`` 行；所属函数 ``setActiveStory callback @ 1330``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54673:55254:FUNCTION

.. rubric:: ``setStories callback @ 1342``

.. code-block:: javascript

   setStories callback @ 1342(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1342``—``1352`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54740:54804:FUNCTION

.. rubric:: ``current.findIndex callback @ 1343``

.. code-block:: javascript

   current.findIndex callback @ 1343(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1343``—``1343`` 行；所属函数 ``setStories callback @ 1342``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55288:56350:FUNCTION

.. rubric:: ``setActiveStory callback @ 1353``

.. code-block:: javascript

   setActiveStory callback @ 1353(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1353``—``1370`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1303``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort``、``existing.filter``、``(current.parts || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55864:55907:FUNCTION

.. rubric:: ``existing.filter callback @ 1361``

.. code-block:: javascript

   existing.filter callback @ 1361(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1361``—``1361`` 行；所属函数 ``setActiveStory callback @ 1353``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55927:55989:FUNCTION

.. rubric:: ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1362``

.. code-block:: javascript

   [...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1362(a, b)

作为 ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1362``—``1362`` 行；所属函数 ``setActiveStory callback @ 1353``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56158:56249:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1365``

.. code-block:: javascript

   (current.parts || []).map callback @ 1365(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1365``—``1366`` 行；所属函数 ``setActiveStory callback @ 1353``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56516:57428:FUNCTION

.. rubric:: ``useCallback callback @ 1377``

.. code-block:: javascript

   async useCallback callback @ 1377(targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1377``—``1397`` 行；所属函数 ``ChatPage``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``workspaceIds``。

**主要协作调用**：``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…``、``Array.isArray``、``apiClient.put``、``encodeURIComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57016:57051:FUNCTION

.. rubric:: ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1387``

.. code-block:: javascript

   (Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1387(item)

实现 ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1387``—``1387`` 行；所属函数 ``useCallback callback @ 1377``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57514:65050:FUNCTION

.. rubric:: ``useCallback callback @ 1402``

.. code-block:: javascript

   useCallback callback @ 1402({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1402``—``1557`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58587:61753:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   async sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1432``—``1496`` 行；所属函数 ``useCallback callback @ 1402``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{success: false, value: '会话设置尚未保存，请重试后发送', conversationId}``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(); if (!generatesReply || payload.value?.admissionAction ===…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``getOptionWriter(conversationId).flush``、``getOptionWriter``、``releaseSubmission``、``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(…``、``emitEvent(eventPayload).then``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60669:61625:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1476``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1476(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1476``—``1492`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...payload, conversationId, }``。

**主要协作调用**：``generateUUID``、``releaseSubmission``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61633:61737:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1492``

.. code-block:: javascript

   emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1492(error)

发送事件与 ``Event(event Payload).then((payload) => { if (payload.success) { current Turn Idempotency Key Ref.current = generate UUID(…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1492``—``1495`` 行；所属函数 ``sendMessage``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``releaseSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62489:62721:FUNCTION

.. rubric:: ``releaseSubmission``

.. code-block:: javascript

   releaseSubmission()

实现 ``releaseSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1506``—``1511`` 行；所属函数 ``useCallback callback @ 1402``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63258:64512:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1525``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1525(payload)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1525``—``1544`` 行；所属函数 ``useCallback callback @ 1402``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``persistPendingWorkspaceSelection(payload.value).then(() => sendMessage(payload.value), )``。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection(payload.value).then``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64251:64319:FUNCTION

.. rubric:: ``persistPendingWorkspaceSelection(payload.value).then callback @ 1538``

.. code-block:: javascript

   persistPendingWorkspaceSelection(payload.value).then callback @ 1538()

处理 ``persistPendingWorkspaceSelection(payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1538``—``1539`` 行；所属函数 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1525``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64545:64829:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1545``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1545(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1545``—``1549`` 行；所属函数 ``useCallback callback @ 1402``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ success: false, value: error?.message || String(error) }``。

**主要协作调用**：``releaseSubmission``、``toast.error``、``t``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65482:69033:FUNCTION

.. rubric:: ``useCallback callback @ 1575``

.. code-block:: javascript

   async useCallback callback @ 1575({ toolsStatus = {}, composerStatus = 'normal' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1575``—``1647`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66704:67228:FUNCTION

.. rubric:: ``startForConversation``

.. code-block:: javascript

   async startForConversation(targetConversationId)

启动与 ``For Conversation`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1601``—``1612`` 行；所属函数 ``useCallback callback @ 1575``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.start``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69429:72315:FUNCTION

.. rubric:: ``useCallback callback @ 1663``

.. code-block:: javascript

   async useCallback callback @ 1663()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1663``—``1729`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70088:71940:FUNCTION

.. rubric:: ``anonymous callback @ 1678``

.. code-block:: javascript

   async anonymous callback @ 1678()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1678``—``1718`` 行；所属函数 ``useCallback callback @ 1663``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70804:70844:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1692``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1692(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1692``—``1692`` 行；所属函数 ``anonymous callback @ 1678``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71373:71478:FUNCTION

.. rubric:: ``anonymous callback @ 1706``

.. code-block:: javascript

   anonymous callback @ 1706(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1706``—``1708`` 行；所属函数 ``anonymous callback @ 1678``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71426:71462:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1707``

.. code-block:: javascript

   requestAnimationFrame callback @ 1707()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1707``—``1707`` 行；所属函数 ``anonymous callback @ 1706``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71952:72232:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1718``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1718()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1718``—``1725`` 行；所属函数 ``useCallback callback @ 1663``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72532:73547:FUNCTION

.. rubric:: ``useEffect callback @ 1739``

.. code-block:: javascript

   useEffect callback @ 1739()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1739``—``1766`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72998:73294:FUNCTION

.. rubric:: ``anonymous callback @ 1751``

.. code-block:: javascript

   anonymous callback @ 1751(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1751``—``1756`` 行；所属函数 ``useEffect callback @ 1739``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73060:73091:FUNCTION

.. rubric:: ``entries.some callback @ 1752``

.. code-block:: javascript

   entries.some callback @ 1752(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1752``—``1752`` 行；所属函数 ``anonymous callback @ 1751``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73142:73278:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1753``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1753(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1753``—``1755`` 行；所属函数 ``anonymous callback @ 1751``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73512:73540:FUNCTION

.. rubric:: ``returned callback @ 1765``

.. code-block:: javascript

   returned callback @ 1765()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1765``—``1765`` 行；所属函数 ``useEffect callback @ 1739``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73674:74682:FUNCTION

.. rubric:: ``useCallback callback @ 1769``

.. code-block:: javascript

   useCallback callback @ 1769(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1769``—``1788`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74514:74639:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1784``

.. code-block:: javascript

   window.setTimeout callback @ 1784()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1784``—``1786`` 行；所属函数 ``useCallback callback @ 1769``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74562:74623:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1785``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1785(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1785``—``1785`` 行；所属函数 ``window.setTimeout callback @ 1784``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74819:76807:FUNCTION

.. rubric:: ``useCallback callback @ 1792``

.. code-block:: javascript

   async useCallback callback @ 1792()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1792``—``1836`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76332:76610:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1823``

.. code-block:: javascript

   requestAnimationFrame callback @ 1823()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1823``—``1830`` 行；所属函数 ``useCallback callback @ 1792``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76378:76594:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1824``

.. code-block:: javascript

   requestAnimationFrame callback @ 1824()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1824``—``1829`` 行；所属函数 ``requestAnimationFrame callback @ 1823``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77065:77327:FUNCTION

.. rubric:: ``useEffect callback @ 1848``

.. code-block:: javascript

   useEffect callback @ 1848()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1848``—``1855`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77153:77320:FUNCTION

.. rubric:: ``returned callback @ 1850``

.. code-block:: javascript

   returned callback @ 1850()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1850``—``1854`` 行；所属函数 ``useEffect callback @ 1848``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77394:80708:FUNCTION

.. rubric:: ``useCallback callback @ 1858``

.. code-block:: javascript

   async useCallback callback @ 1858(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1858``—``1925`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77571:79849:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1863``—``1906`` 行；所属函数 ``useCallback callback @ 1858``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77684:77722:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1864``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1864(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1864``—``1864`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78109:78133:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1871``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1871(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1871``—``1871`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79528:79641:FUNCTION

.. rubric:: ``anonymous callback @ 1899``

.. code-block:: javascript

   anonymous callback @ 1899(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1899``—``1901`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79585:79621:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1900``

.. code-block:: javascript

   requestAnimationFrame callback @ 1900()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1900``—``1900`` 行；所属函数 ``anonymous callback @ 1899``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79973:80011:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1910``

.. code-block:: javascript

   summaryItems.some callback @ 1910(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1910``—``1910`` 行；所属函数 ``useCallback callback @ 1858``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81029:81680:FUNCTION

.. rubric:: ``useEffect callback @ 1939``

.. code-block:: javascript

   useEffect callback @ 1939()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1939``—``1953`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81497:81672:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1948``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1948(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1948``—``1952`` 行；所属函数 ``useEffect callback @ 1939``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81827:85641:FUNCTION

.. rubric:: ``useCallback callback @ 1956``

.. code-block:: javascript

   async useCallback callback @ 1956(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1956``—``2048`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84325:85506:FUNCTION

.. rubric:: ``produce callback @ 2010``

.. code-block:: javascript

   produce callback @ 2010(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2010``—``2043`` 行；所属函数 ``useCallback callback @ 1956``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84992:85114:FUNCTION

.. rubric:: ``anonymous callback @ 2029``

.. code-block:: javascript

   anonymous callback @ 2029(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2029``—``2031`` 行；所属函数 ``produce callback @ 2010``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85197:85297:FUNCTION

.. rubric:: ``anonymous callback @ 2034``

.. code-block:: javascript

   anonymous callback @ 2034(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2034``—``2036`` 行；所属函数 ``produce callback @ 2010``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85373:85473:FUNCTION

.. rubric:: ``anonymous callback @ 2039``

.. code-block:: javascript

   anonymous callback @ 2039(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2039``—``2041`` 行；所属函数 ``produce callback @ 2010``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85810:86896:FUNCTION

.. rubric:: ``useCallback callback @ 2054``

.. code-block:: javascript

   async useCallback callback @ 2054(msgId, result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2054``—``2073`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87079:88699:FUNCTION

.. rubric:: ``useCallback callback @ 2078``

.. code-block:: javascript

   async useCallback callback @ 2078(msgId, { closeDialog = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2078``—``2108`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``{ closeDialog = false }`` （默认值 ``{}``）
   调用方传入的 ``closeDialog = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setIsDeletingMessage``、``apiClient.delete``、``deleteMessageLocally``、``loadMessageSummaries``、``markRuntimeInspectorStale``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:88870:90201:FUNCTION

.. rubric:: ``useCallback callback @ 2113``

.. code-block:: javascript

   async useCallback callback @ 2113(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2113``—``2144`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90334:91439:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded(isCurrent)

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2148``—``2174`` 行；所属函数 ``ChatPage``。

**参数**

``isCurrent`` （默认值 ``() => true``）
   调用方传入的 ``isCurrent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90347:90358:FUNCTION

.. rubric:: ``anonymous callback @ 2148``

.. code-block:: javascript

   anonymous callback @ 2148()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2148``—``2148`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90384:91428:FUNCTION

.. rubric:: ``setTimeout callback @ 2149``

.. code-block:: javascript

   setTimeout callback @ 2149()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2149``—``2173`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90978:91084:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2162``—``2164`` 行；所属函数 ``setTimeout callback @ 2149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91106:91416:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2165``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2165(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2165``—``2172`` 行；所属函数 ``setTimeout callback @ 2149``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91456:93570:FUNCTION

.. rubric:: ``useEffect callback @ 2176``

.. code-block:: javascript

   useEffect callback @ 2176()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2176``—``2238`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91657:92711:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2183``—``2209`` 行；所属函数 ``useEffect callback @ 2176``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92034:92699:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2192``

.. code-block:: javascript

   requestAnimationFrame callback @ 2192()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2192``—``2208`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92811:92991:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2213``—``2217`` 行；所属函数 ``useEffect callback @ 2176``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93148:93262:FUNCTION

.. rubric:: ``anonymous callback @ 2222``

.. code-block:: javascript

   anonymous callback @ 2222()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2222``—``2225`` 行；所属函数 ``useEffect callback @ 2176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93368:93563:FUNCTION

.. rubric:: ``returned callback @ 2231``

.. code-block:: javascript

   returned callback @ 2231()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2231``—``2237`` 行；所属函数 ``useEffect callback @ 2176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93818:97172:FUNCTION

.. rubric:: ``useEffect callback @ 2248``

.. code-block:: javascript

   useEffect callback @ 2248()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2248``—``2334`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94052:94160:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2255``—``2257`` 行；所属函数 ``useEffect callback @ 2248``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94190:94510:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2259``—``2267`` 行；所属函数 ``useEffect callback @ 2248``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94545:94636:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2269``—``2271`` 行；所属函数 ``useEffect callback @ 2248``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94670:95315:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2273``—``2290`` 行；所属函数 ``useEffect callback @ 2248``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95346:96521:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2292``—``2321`` 行；所属函数 ``useEffect callback @ 2248``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96867:97165:FUNCTION

.. rubric:: ``returned callback @ 2328``

.. code-block:: javascript

   returned callback @ 2328()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2328``—``2333`` 行；所属函数 ``useEffect callback @ 2248``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97367:97832:FUNCTION

.. rubric:: ``useEffect callback @ 2342``

.. code-block:: javascript

   useEffect callback @ 2342()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2342``—``2355`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97514:97814:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2344``

.. code-block:: javascript

   requestAnimationFrame callback @ 2344()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2344``—``2353`` 行；所属函数 ``useEffect callback @ 2342``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98067:98523:FUNCTION

.. rubric:: ``useEffect callback @ 2365``

.. code-block:: javascript

   useEffect callback @ 2365()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2365``—``2376`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98559:98697:FUNCTION

.. rubric:: ``useEffect callback @ 2378``

.. code-block:: javascript

   useEffect callback @ 2378()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2378``—``2382`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98823:99066:FUNCTION

.. rubric:: ``useCallback callback @ 2384``

.. code-block:: javascript

   useCallback callback @ 2384()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2384``—``2391`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99212:99333:FUNCTION

.. rubric:: ``useCallback callback @ 2394``

.. code-block:: javascript

   useCallback callback @ 2394(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2394``—``2396`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99458:99701:FUNCTION

.. rubric:: ``useCallback callback @ 2400``

.. code-block:: javascript

   async useCallback callback @ 2400()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2400``—``2405`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99889:100980:FUNCTION

.. rubric:: ``useEffect callback @ 2413``

.. code-block:: javascript

   useEffect callback @ 2413()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2413``—``2440`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100196:100238:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2422``

.. code-block:: javascript

   messagesOrder.filter callback @ 2422(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2422``—``2422`` 行；所属函数 ``useEffect callback @ 2413``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100494:100863:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2427``

.. code-block:: javascript

   window.setTimeout callback @ 2427()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2427``—``2435`` 行；所属函数 ``useEffect callback @ 2413``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({ silent: true, append: true }).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100572:100851:FUNCTION

.. rubric:: ``loadMessageSummaries({ silent: true, append: true }).then callback @ 2428``

.. code-block:: javascript

   loadMessageSummaries({ silent: true, append: true }).then callback @ 2428(items)

处理 ``loadMessageSummaries({ silent: true, append: true }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2428``—``2434`` 行；所属函数 ``window.setTimeout callback @ 2427``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100885:100973:FUNCTION

.. rubric:: ``returned callback @ 2436``

.. code-block:: javascript

   returned callback @ 2436()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2436``—``2439`` 行；所属函数 ``useEffect callback @ 2413``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101184:101692:FUNCTION

.. rubric:: ``useEffect callback @ 2449``

.. code-block:: javascript

   useEffect callback @ 2449()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2449``—``2461`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101294:101351:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2452``—``2452`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101572:101685:FUNCTION

.. rubric:: ``returned callback @ 2457``

.. code-block:: javascript

   returned callback @ 2457()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2457``—``2460`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101726:103786:FUNCTION

.. rubric:: ``useEffect callback @ 2463``

.. code-block:: javascript

   useEffect callback @ 2463()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2463``—``2507`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101896:103283:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2468``—``2496`` 行；所属函数 ``useEffect callback @ 2463``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102014:103271:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2470``

.. code-block:: javascript

   requestAnimationFrame callback @ 2470()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2470``—``2495`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map((element) => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102769:102820:FUNCTION

.. rubric:: ``elements .map callback @ 2484``

.. code-block:: javascript

   elements .map callback @ 2484(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2484``—``2484`` 行；所属函数 ``requestAnimationFrame callback @ 2470``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102852:102903:FUNCTION

.. rubric:: ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2485``

.. code-block:: javascript

   elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2485(element)

作为 ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2485``—``2485`` 行；所属函数 ``requestAnimationFrame callback @ 2470``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103181:103237:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2493``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2493(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2493``—``2493`` 行；所属函数 ``requestAnimationFrame callback @ 2470``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103580:103779:FUNCTION

.. rubric:: ``returned callback @ 2502``

.. code-block:: javascript

   returned callback @ 2502()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2502``—``2506`` 行；所属函数 ``useEffect callback @ 2463``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103821:138572:FUNCTION

.. rubric:: ``useEffect callback @ 2509``

.. code-block:: javascript

   useEffect callback @ 2509()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2509``—``3172`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103908:103934:FUNCTION

.. rubric:: ``getMessages``

.. code-block:: javascript

   getMessages()

读取与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2511``—``2511`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103955:104319:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next, messageIds)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2512``—``2519`` 行；所属函数 ``useEffect callback @ 2509``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104491:104608:FUNCTION

.. rubric:: ``appendIsCurrent``

.. code-block:: javascript

   appendIsCurrent()

追加与 ``Is Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2524``—``2525`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104721:105116:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2528``—``2534`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{messages: messagesRef.current, order: messagesOrderRef.current, liveMessageIds: liveStreamMessageIdsRef.current, ready: isMessageLoadedRef.current && lastHydratedConversationIdRe…``。

**主要协作调用**：``streamBatch.flush``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105135:105328:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load(afterId)

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2535``—``2537`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

``afterId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105348:105794:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply({messages: nextMessages, order})

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2538``—``2546`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

``{messages: nextMessages, order}``
   调用方传入的 ``messages: nextMessages, order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``decorateMessages``、``setMessages``、``setMessagesOrder``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105817:105859:FUNCTION

.. rubric:: ``complete``

.. code-block:: javascript

   complete()

实现 ``complete`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2547``—``2547`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105882:105918:FUNCTION

.. rubric:: ``mismatch``

.. code-block:: javascript

   mismatch()

实现 ``mismatch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2548``—``2548`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRandomMark``、``generateUUID``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105938:106171:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error()

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2549``—``2553`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toast.warning``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106063:106154:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2550``—``2552`` 行；所属函数 ``error``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``appendIsCurrent``、``appendSync.request``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:107318:137377:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583({ event, payload, reply, eventRunId, eventTurnId })

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2583``—``3142`` 行；所属函数 ``useEffect callback @ 2509``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:110943:110974:FUNCTION

.. rubric:: ``submitMessageDeletion(msgId).then callback @ 2656``

.. code-block:: javascript

   submitMessageDeletion(msgId).then callback @ 2656(success)

处理 ``submitMessageDeletion(msgId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2656``—``2656`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114459:114605:FUNCTION

.. rubric:: ``anonymous callback @ 2720``

.. code-block:: javascript

   anonymous callback @ 2720(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2720``—``2722`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114665:114789:FUNCTION

.. rubric:: ``anonymous callback @ 2724``

.. code-block:: javascript

   anonymous callback @ 2724(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2724``—``2726`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114842:114966:FUNCTION

.. rubric:: ``anonymous callback @ 2728``

.. code-block:: javascript

   anonymous callback @ 2728(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2728``—``2730`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116189:116514:FUNCTION

.. rubric:: ``produce callback @ 2756``

.. code-block:: javascript

   produce callback @ 2756(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2756``—``2761`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117835:118168:FUNCTION

.. rubric:: ``produce callback @ 2784``

.. code-block:: javascript

   produce callback @ 2784(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2784``—``2790`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119002:119362:FUNCTION

.. rubric:: ``produce callback @ 2804``

.. code-block:: javascript

   produce callback @ 2804(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2804``—``2810`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120429:120741:FUNCTION

.. rubric:: ``produce callback @ 2830``

.. code-block:: javascript

   produce callback @ 2830(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2830``—``2835`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121324:122027:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2846``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2846()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value, }, conversation Id: conversation Id, loc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2846``—``2858`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121417:121995:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2847``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2847()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2847``—``2857`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2846``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122654:123182:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2873``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2873()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message, }, conversation Id: conversation I…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2873``—``2884`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122745:123158:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2874``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2874()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2874``—``2883`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2873``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124126:125192:FUNCTION

.. rubric:: ``produce callback @ 2901``

.. code-block:: javascript

   produce callback @ 2901(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2901``—``2918`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:126171:128061:FUNCTION

.. rubric:: ``produce callback @ 2938``

.. code-block:: javascript

   produce callback @ 2938(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2938``—``2966`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeMessageContextState``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:129826:129862:FUNCTION

.. rubric:: ``window.setTimeout callback @ 3000``

.. code-block:: javascript

   window.setTimeout callback @ 3000()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3000``—``3000`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132239:132825:FUNCTION

.. rubric:: ``produce callback @ 3050``

.. code-block:: javascript

   produce callback @ 3050(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3050``—``3059`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133555:133976:FUNCTION

.. rubric:: ``produce callback @ 3072``

.. code-block:: javascript

   produce callback @ 3072(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3072``—``3078`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134711:135133:FUNCTION

.. rubric:: ``produce callback @ 3094``

.. code-block:: javascript

   produce callback @ 3094(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3094``—``3100`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2583``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``removeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137477:137812:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 3145``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 3145()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3145``—``3152`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``、``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137964:138067:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3157``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3157({ event, payload, reply })

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3157``—``3159`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138277:138565:FUNCTION

.. rubric:: ``returned callback @ 3163``

.. code-block:: javascript

   returned callback @ 3163()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3163``—``3171`` 行；所属函数 ``useEffect callback @ 2509``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``appendSync.invalidate``、``streamBatch.flush``、``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139385:139470:FUNCTION

.. rubric:: ``useEffect callback @ 3201``

.. code-block:: javascript

   useEffect callback @ 3201()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3201``—``3205`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139407:139463:FUNCTION

.. rubric:: ``returned callback @ 3202``

.. code-block:: javascript

   returned callback @ 3202()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3202``—``3204`` 行；所属函数 ``useEffect callback @ 3201``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139510:139585:FUNCTION

.. rubric:: ``useEffect callback @ 3207``

.. code-block:: javascript

   useEffect callback @ 3207()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3207``—``3209`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139626:142137:FUNCTION

.. rubric:: ``useEffect callback @ 3211``

.. code-block:: javascript

   useEffect callback @ 3211()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3211``—``3263`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setTurnSubmission``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142014:142075:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 3258``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 3258(_, id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3258``—``3260`` 行；所属函数 ``useEffect callback @ 3211``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142215:142814:FUNCTION

.. rubric:: ``useEffect callback @ 3265``

.. code-block:: javascript

   useEffect callback @ 3265()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3265``—``3280`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142440:142604:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 3270``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 3270(items)

处理 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3270``—``3273`` 行；所属函数 ``useEffect callback @ 3265``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142625:142742:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 3274``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 3274()

实现 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3274``—``3276`` 行；所属函数 ``useEffect callback @ 3265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142759:142807:FUNCTION

.. rubric:: ``returned callback @ 3277``

.. code-block:: javascript

   returned callback @ 3277()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3277``—``3279`` 行；所属函数 ``useEffect callback @ 3265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142880:145145:FUNCTION

.. rubric:: ``useCallback callback @ 3283``

.. code-block:: javascript

   async useCallback callback @ 3283({ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3283``—``3322`` 行；所属函数 ``ChatPage``。

**参数**

``{ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true }`` （默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``normalizedModels``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``isCurrent``、``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142962:142973:FUNCTION

.. rubric:: ``anonymous callback @ 3283``

.. code-block:: javascript

   anonymous callback @ 3283()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3283``—``3283`` 行；所属函数 ``useCallback callback @ 3283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144522:144558:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 3309``

.. code-block:: javascript

   normalizedModels.find callback @ 3309(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3309``—``3309`` 行；所属函数 ``useCallback callback @ 3283``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145198:145407:FUNCTION

.. rubric:: ``useEffect callback @ 3326``

.. code-block:: javascript

   useEffect callback @ 3326()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3326``—``3330`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145803:146099:FUNCTION

.. rubric:: ``useEffect callback @ 3336``

.. code-block:: javascript

   useEffect callback @ 3336()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3336``—``3341`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146201:154278:FUNCTION

.. rubric:: ``useEffect callback @ 3343``

.. code-block:: javascript

   useEffect callback @ 3343()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3343``—``3519`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146616:146703:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3352``—``3352`` 行；所属函数 ``useEffect callback @ 3343``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146769:148004:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3354``—``3379`` 行；所属函数 ``useEffect callback @ 3343``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``getOptionWriter(conversationId).apply``、``getOptionWriter``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147394:147426:FUNCTION

.. rubric:: ``modelsData.find callback @ 3366``

.. code-block:: javascript

   modelsData.find callback @ 3366(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3366``—``3366`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148035:148419:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3380``—``3390`` 行；所属函数 ``useEffect callback @ 3343``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148452:153093:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3391``—``3485`` 行；所属函数 ``useEffect callback @ 3343``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150702:151608:FUNCTION

.. rubric:: ``setTimeout callback @ 3433``

.. code-block:: javascript

   setTimeout callback @ 3433()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3433``—``3450`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150787:151584:FUNCTION

.. rubric:: ``setTimeout callback @ 3435``

.. code-block:: javascript

   setTimeout callback @ 3435()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3435``—``3449`` 行；所属函数 ``setTimeout callback @ 3433``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:152001:152193:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3458``—``3462`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:152470:153062:FUNCTION

.. rubric:: ``setTimeout callback @ 3471``

.. code-block:: javascript

   setTimeout callback @ 3471()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3471``—``3483`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:153119:153974:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3486``—``3508`` 行；所属函数 ``useEffect callback @ 3343``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setIsLoading``、``performance.now``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154246:154271:FUNCTION

.. rubric:: ``returned callback @ 3518``

.. code-block:: javascript

   returned callback @ 3518()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3518``—``3518`` 行；所属函数 ``useEffect callback @ 3343``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154584:154765:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154835:155169:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155146:155161:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155257:155715:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155840:155930:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156081:157203:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156487:157029:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157048:157196:FUNCTION

.. rubric:: ``returned callback @ 3586``

.. code-block:: javascript

   returned callback @ 3586()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3586``—``3589`` 行；所属函数 ``useEffect callback @ 3570``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157279:157595:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:163597:163630:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167010:167040:FUNCTION

.. rubric:: ``onStop callback @ 3759``

.. code-block:: javascript

   onStop callback @ 3759()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3759``—``3759`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167086:167113:FUNCTION

.. rubric:: ``onPrevious callback @ 3760``

.. code-block:: javascript

   onPrevious callback @ 3760()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3760``—``3760`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167155:167181:FUNCTION

.. rubric:: ``onNext callback @ 3761``

.. code-block:: javascript

   onNext callback @ 3761()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3761``—``3761`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:169705:169889:FUNCTION

.. rubric:: ``onClick callback @ 3801``

.. code-block:: javascript

   onClick callback @ 3801()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3801``—``3804`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174577:175171:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3874``

.. code-block:: javascript

   onWorkspaceChange callback @ 3874(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3874``—``3882`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174771:175060:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3876``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3876(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3876``—``3880`` 行；所属函数 ``onWorkspaceChange callback @ 3874``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:178898:179100:FUNCTION

.. rubric:: ``anonymous callback @ 3952``

.. code-block:: javascript

   anonymous callback @ 3952()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3952``—``3955`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179326:179470:FUNCTION

.. rubric:: ``onToggleAvatarScene callback @ 3961``

.. code-block:: javascript

   onToggleAvatarScene callback @ 3961()

处理 ``Toggle Avatar Scene`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3961``—``3964`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAvatarScene``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179708:179844:FUNCTION

.. rubric:: ``onEnd callback @ 3967``

.. code-block:: javascript

   onEnd callback @ 3967()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3967``—``3970`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179882:179920:FUNCTION

.. rubric:: ``onMinimize callback @ 3971``

.. code-block:: javascript

   onMinimize callback @ 3971()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3971``—``3971`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179957:180107:FUNCTION

.. rubric:: ``onRestore callback @ 3972``

.. code-block:: javascript

   onRestore callback @ 3972()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3972``—``3975`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181151:184664:FUNCTION

.. rubric:: ``onSettingChange callback @ 3991``

.. code-block:: javascript

   onSettingChange callback @ 3991(values, change)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3991``—``4039`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181397:181640:FUNCTION

.. rubric:: ``Object.entries(values).filter callback @ 3995``

.. code-block:: javascript

   Object.entries(values).filter callback @ 3995([key, value])

作为 ``Object.entries(values).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3995``—``3997`` 行；所属函数 ``onSettingChange callback @ 3991``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182122:182196:FUNCTION

.. rubric:: ``Object.entries(patch).filter callback @ 4003``

.. code-block:: javascript

   Object.entries(patch).filter callback @ 4003([key])

作为 ``Object.entries(patch).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4003``—``4003`` 行；所属函数 ``onSettingChange callback @ 3991``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['avatarModelId', 'workspaceId', 'workspaceIds'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182373:182410:FUNCTION

.. rubric:: ``Object.keys(allowed).some callback @ 4005``

.. code-block:: javascript

   Object.keys(allowed).some callback @ 4005(key)

作为 ``Object.keys(allowed).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4005``—``4005`` 行；所属函数 ``onSettingChange callback @ 3991``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``key.startsWith``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183058:183066:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch callback @ 4016``

.. code-block:: javascript

   avatarSelectionQueue.current .catch callback @ 4016()

处理 ``avatarSelectionQueue.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``4016``—``4016`` 行；所属函数 ``onSettingChange callback @ 3991``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183110:183822:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 4017``

.. code-block:: javascript

   async avatarSelectionQueue.current .catch(() => {}) .then callback @ 4017()

处理 ``avatarSelectionQueue.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``4017``—``4026`` 行；所属函数 ``onSettingChange callback @ 3991``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(result.message || '角色模型保存失败')``。

**主要协作调用**：``emitEvent``、``setAvatarModelRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183756:183782:FUNCTION

.. rubric:: ``setAvatarModelRevision callback @ 4025``

.. code-block:: javascript

   setAvatarModelRevision callback @ 4025(revision)

设置与 ``Avatar Model Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``4025``—``4025`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 4017``。

**参数**

``revision``
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183867:184484:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4027``

.. code-block:: javascript

   avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4027(error)

实现 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4027``—``4035`` 行；所属函数 ``onSettingChange callback @ 3991``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``setAdvancedSettingsValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184130:184398:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 4030``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 4030(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``4030``—``4033`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4027``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:185600:185723:FUNCTION

.. rubric:: ``onClose callback @ 4064``

.. code-block:: javascript

   onClose callback @ 4064()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4064``—``4067`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186225:186495:FUNCTION

.. rubric:: ``onOpenChange callback @ 4079``

.. code-block:: javascript

   onOpenChange callback @ 4079(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4079``—``4086`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186791:186871:FUNCTION

.. rubric:: ``onConfirm callback @ 4092``

.. code-block:: javascript

   onConfirm callback @ 4092()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4092``—``4092`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``submitMessageDeletion``。
