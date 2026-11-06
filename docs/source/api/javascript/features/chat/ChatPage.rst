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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4210:4310:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``92`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4359:4500:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``94``—``97`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4545:4786:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``99``—``105`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4917:5083:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``111``—``115`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5108:5161:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``117`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5191:5346:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``119``—``122`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${baseEndpoint}/${encodeURIComponent(String(id))}\x60``。

   **主要协作调用**：``String(endpoint || '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5367:5533:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``129`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5557:5609:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``131``—``131`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5636:5736:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``133``—``136`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ text: String(data.text ?? '') }``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5760:5905:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``138``—``141`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5936:6536:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``143``—``161`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], { type: ASR_AUDIO_MIME_TYPE }) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], { type: ASR_AUDIO_MIME_TYPE }) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6568:6712:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``163``—``166`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6713:187722:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``169``—``4105`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4945:5082:FUNCTION

.. rubric:: ``anonymous callback @ 112``

.. code-block:: javascript

   anonymous callback @ 112(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``115`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:8772:8824:FUNCTION

.. rubric:: ``useMemo callback @ 212``

.. code-block:: javascript

   useMemo callback @ 212()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pendingBodyForwarding``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:8979:9042:FUNCTION

.. rubric:: ``useCallback callback @ 215``

.. code-block:: javascript

   useCallback callback @ 215(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``ChatPage``。

**参数**

``duration``
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``streamBatchRef.current?.observeRenderCost``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12171:12299:FUNCTION

.. rubric:: ``useEffect callback @ 274``

.. code-block:: javascript

   useEffect callback @ 274()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``274``—``276`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12710:12748:FUNCTION

.. rubric:: ``useState callback @ 281``

.. code-block:: javascript

   useState callback @ 281()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12907:13852:FUNCTION

.. rubric:: ``useCallback callback @ 284``

.. code-block:: javascript

   useCallback callback @ 284(target)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``284``—``302`` 行；所属函数 ``ChatPage``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``optionWritersRef.current.get(key)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``getBackendConnection``、``optionWritersRef.current.has``、``optionWritersRef.current.set``、``optionWritersRef.current.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13176:13412:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   save(patch)

保存与 ``save`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``289``—``292`` 行；所属函数 ``useCallback callback @ 284``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.patch(\x60/chat/conversations/${encodeURIComponent(target)}/options\x60, {patch})``。

**显式抛出**：``new Error('后端连接已切换，请重新打开会话设置')``。

**主要协作调用**：``isCurrentConnection``、``apiClient.patch``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13439:13686:FUNCTION

.. rubric:: ``onValues``

.. code-block:: javascript

   onValues(values)

处理 ``Values`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``293``—``297`` 行；所属函数 ``useCallback callback @ 284``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentConnection``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13712:13768:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``298``—``298`` 行；所属函数 ``useCallback callback @ 284``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13873:13993:FUNCTION

.. rubric:: ``useEffect callback @ 303``

.. code-block:: javascript

   useEffect callback @ 303()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``303``—``305`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13878:13993:FUNCTION

.. rubric:: ``anonymous callback @ 303``

.. code-block:: javascript

   anonymous callback @ 303()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``303``—``305`` 行；所属函数 ``useEffect callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``optionWritersRef.current.values``、``writer.flush().catch``、``writer.flush``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13977:13985:FUNCTION

.. rubric:: ``writer.flush().catch callback @ 304``

.. code-block:: javascript

   writer.flush().catch callback @ 304()

处理 ``writer.flush().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``anonymous callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14304:14894:FUNCTION

.. rubric:: ``useCallback callback @ 311``

.. code-block:: javascript

   useCallback callback @ 311(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``311``—``321`` 行；所属函数 ``ChatPage``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationMeta``、``modelCatalogRef.current.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14431:14515:FUNCTION

.. rubric:: ``setConversationMeta callback @ 313``

.. code-block:: javascript

   setConversationMeta callback @ 313(current)

设置与 ``Conversation Meta`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``useCallback callback @ 311``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14569:14611:FUNCTION

.. rubric:: ``modelCatalogRef.current.find callback @ 314``

.. code-block:: javascript

   modelCatalogRef.current.find callback @ 314(entry)

作为 ``modelCatalogRef.current.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``useCallback callback @ 311``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14949:15604:FUNCTION

.. rubric:: ``useCallback callback @ 322``

.. code-block:: javascript

   useCallback callback @ 322()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``322``—``336`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…``、``agentConfigurationQueueRef.current .catch(() => {}) .then``、``agentConfigurationQueueRef.current .catch``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15201:15209:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch callback @ 327``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch callback @ 327()

处理 ``agentConfigurationQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``327``—``327`` 行；所属函数 ``useCallback callback @ 322``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15229:15523:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 328``

.. code-block:: javascript

   async agentConfigurationQueueRef.current .catch(() => {}) .then callback @ 328()

处理 ``agentConfigurationQueueRef.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``328``—``334`` 行；所属函数 ``useCallback callback @ 322``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``、``applyAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15544:15596:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent… callback @ 335``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( `/chat/agent… callback @ 335(error)

实现 ``agentConfigurationQueueRef.current .catch(() => {}) .then(async () => { const data = await apiClient.post( \x60/chat/agent…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``335``—``335`` 行；所属函数 ``useCallback callback @ 322``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15682:16420:FUNCTION

.. rubric:: ``useCallback callback @ 338``

.. code-block:: javascript

   useCallback callback @ 338(patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``338``—``350`` 行；所属函数 ``ChatPage``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``flushAgentConfiguration``、``clearTimeout``、``setTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16478:16611:FUNCTION

.. rubric:: ``useEffect callback @ 354``

.. code-block:: javascript

   useEffect callback @ 354()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``354``—``357`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16492:16611:FUNCTION

.. rubric:: ``anonymous callback @ 354``

.. code-block:: javascript

   anonymous callback @ 354()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``354``—``357`` 行；所属函数 ``useEffect callback @ 354``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``flushAgentConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17039:17102:FUNCTION

.. rubric:: ``useEffect callback @ 367``

.. code-block:: javascript

   useEffect callback @ 367()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``367``—``369`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17137:17374:FUNCTION

.. rubric:: ``useEffect callback @ 372``

.. code-block:: javascript

   useEffect callback @ 372()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``372``—``377`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17151:17374:FUNCTION

.. rubric:: ``anonymous callback @ 372``

.. code-block:: javascript

   anonymous callback @ 372()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``372``—``377`` 行；所属函数 ``useEffect callback @ 372``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17448:18349:FUNCTION

.. rubric:: ``useCallback callback @ 381``

.. code-block:: javascript

   useCallback callback @ 381(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``381``—``398`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status || '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18056:18324:FUNCTION

.. rubric:: ``setTimeout callback @ 391``

.. code-block:: javascript

   setTimeout callback @ 391()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``391``—``396`` 行；所属函数 ``useCallback callback @ 381``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18106:18227:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 392``

.. code-block:: javascript

   setContextCompactionState callback @ 392(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``392``—``393`` 行；所属函数 ``setTimeout callback @ 391``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18642:18809:FUNCTION

.. rubric:: ``useEffect callback @ 405``

.. code-block:: javascript

   useEffect callback @ 405()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``405``—``410`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeletingMessage``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19975:20125:FUNCTION

.. rubric:: ``useCallback callback @ 450``

.. code-block:: javascript

   useCallback callback @ 450()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``450``—``453`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20207:20299:FUNCTION

.. rubric:: ``handleWindowMode``

.. code-block:: javascript

   handleWindowMode()

处理 ``Window Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``454``—``457`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWindowMode``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20349:21040:FUNCTION

.. rubric:: ``useCallback callback @ 459``

.. code-block:: javascript

   useCallback callback @ 459(messageIds, runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``459``—``471`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20484:20521:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 461``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 461(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``461``—``461`` 行；所属函数 ``useCallback callback @ 459``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20627:20688:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 465``

.. code-block:: javascript

   normalizedIds.forEach callback @ 465(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``465``—``465`` 行；所属函数 ``useCallback callback @ 459``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``liveStreamMessageIdsRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20915:20956:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 469``

.. code-block:: javascript

   normalizedIds.forEach callback @ 469(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``469``—``469`` 行；所属函数 ``useCallback callback @ 459``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runMessages.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21091:21698:FUNCTION

.. rubric:: ``useCallback callback @ 473``

.. code-block:: javascript

   useCallback callback @ 473(runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``473``—``485`` 行；所属函数 ``ChatPage``。

**参数**

``runId`` （默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.delete``、``runMessages.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21420:21690:FUNCTION

.. rubric:: ``runMessages.forEach callback @ 479``

.. code-block:: javascript

   runMessages.forEach callback @ 479(messageId)

作为 ``runMessages.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``479``—``484`` 行；所属函数 ``useCallback callback @ 473``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(liveStreamRunMessagesRef.current.values()).some``、``Array.from``、``liveStreamRunMessagesRef.current.values``、``liveStreamMessageIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21527:21584:FUNCTION

.. rubric:: ``Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 480``

.. code-block:: javascript

   Array.from(liveStreamRunMessagesRef.current.values()).some callback @ 480(messageIds)

作为 ``Array.from(liveStreamRunMessagesRef.current.values()).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``480``—``481`` 行；所属函数 ``runMessages.forEach callback @ 479``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messageIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21758:22848:FUNCTION

.. rubric:: ``useCallback callback @ 487``

.. code-block:: javascript

   useCallback callback @ 487(messageIds)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``487``—``511`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``restoreMissingStreamTail``、``nextOrder.every``、``setMessagesOrder``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22176:22213:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 494``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 494(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``494``—``494`` 行；所属函数 ``useCallback callback @ 487``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22660:22727:FUNCTION

.. rubric:: ``nextOrder.every callback @ 505``

.. code-block:: javascript

   nextOrder.every callback @ 505(messageId, index)

作为 ``nextOrder.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``505``—``505`` 行；所属函数 ``useCallback callback @ 487``。

**参数**

``messageId``
   Message 的公共 UUID。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22897:23738:FUNCTION

.. rubric:: ``useCallback callback @ 514``

.. code-block:: javascript

   useCallback callback @ 514(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``514``—``530`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages`` （默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22966:23737:FUNCTION

.. rubric:: ``produce callback @ 515``

.. code-block:: javascript

   produce callback @ 515(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``515``—``530`` 行；所属函数 ``useCallback callback @ 514``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft || {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23029:23721:FUNCTION

.. rubric:: ``Object.keys(draft || {}).forEach callback @ 516``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 516(key)

作为 ``Object.keys(draft || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``516``—``529`` 行；所属函数 ``produce callback @ 515``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23339:23461:FUNCTION

.. rubric:: ``anonymous callback @ 522``

.. code-block:: javascript

   anonymous callback @ 522(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``522``—``524`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 516``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23513:23613:FUNCTION

.. rubric:: ``anonymous callback @ 525``

.. code-block:: javascript

   anonymous callback @ 525(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``525``—``527`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 516``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23658:23702:FUNCTION

.. rubric:: ``anonymous callback @ 528``

.. code-block:: javascript

   anonymous callback @ 528(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``528``—``528`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 516``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23805:26462:FUNCTION

.. rubric:: ``useCallback callback @ 535``

.. code-block:: javascript

   async useCallback callback @ 535({ silent = false, append = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``535``—``593`` 行；所属函数 ``ChatPage``。

**参数**

``{ silent = false, append = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26588:27027:FUNCTION

.. rubric:: ``useCallback callback @ 598``

.. code-block:: javascript

   useCallback callback @ 598(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``598``—``610`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26810:26995:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 602``

.. code-block:: javascript

   requestAnimationFrame callback @ 602()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``602``—``607`` 行；所属函数 ``useCallback callback @ 598``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27082:27300:FUNCTION

.. rubric:: ``useCallback callback @ 612``

.. code-block:: javascript

   useCallback callback @ 612(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``612``—``619`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27379:27800:FUNCTION

.. rubric:: ``useCallback callback @ 623``

.. code-block:: javascript

   useCallback callback @ 623(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``623``—``632`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``queueAgentConfiguration``、``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27940:28054:FUNCTION

.. rubric:: ``useCallback callback @ 636``

.. code-block:: javascript

   useCallback callback @ 636(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``636``—``640`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28517:28643:FUNCTION

.. rubric:: ``useCallback callback @ 659``

.. code-block:: javascript

   useCallback callback @ 659()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``659``—``661`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine(getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote'))``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28710:28990:FUNCTION

.. rubric:: ``useCallback callback @ 663``

.. code-block:: javascript

   useCallback callback @ 663()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``663``—``668`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage), )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29065:30164:FUNCTION

.. rubric:: ``useCallback callback @ 670``

.. code-block:: javascript

   useCallback callback @ 670({ cancel = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``670``—``703`` 行；所属函数 ``ChatPage``。

**参数**

``{ cancel = false }`` （默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({ text: '', error: null })``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \x60${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29385:30156:FUNCTION

.. rubric:: ``anonymous callback @ 679``

.. code-block:: javascript

   anonymous callback @ 679(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``679``—``702`` 行；所属函数 ``useCallback callback @ 670``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29459:29762:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``681``—``687`` 行；所属函数 ``anonymous callback @ 679``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\x60${session.finalTranscript} ${session.interimTranscript}\x60.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30226:32054:FUNCTION

.. rubric:: ``useCallback callback @ 705``

.. code-block:: javascript

   useCallback callback @ 705()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``705``—``760`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30981:31595:FUNCTION

.. rubric:: ``anonymous callback @ 727``

.. code-block:: javascript

   anonymous callback @ 727(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``727``—``742`` 行；所属函数 ``useCallback callback @ 705``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${session.finalTranscript} ${transcript}\x60.trim``、``\x60${interimTranscript} ${transcript}\x60.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31627:31701:FUNCTION

.. rubric:: ``anonymous callback @ 744``

.. code-block:: javascript

   anonymous callback @ 744(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``744``—``746`` 行；所属函数 ``useCallback callback @ 705``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31731:31740:FUNCTION

.. rubric:: ``anonymous callback @ 748``

.. code-block:: javascript

   anonymous callback @ 748()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``748``—``748`` 行；所属函数 ``useCallback callback @ 705``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32179:32717:FUNCTION

.. rubric:: ``useCallback callback @ 762``

.. code-block:: javascript

   useCallback callback @ 762()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``762``—``778`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ engine: 'remote' }``、``{ engine: 'remote', fallback: true }``、``{ engine: 'local' }``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32838:36071:FUNCTION

.. rubric:: ``useCallback callback @ 781``

.. code-block:: javascript

   async useCallback callback @ 781(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``781``—``866`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36138:37004:FUNCTION

.. rubric:: ``useCallback callback @ 871``

.. code-block:: javascript

   async useCallback callback @ 871(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``871``—``893`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ text }``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37169:37298:FUNCTION

.. rubric:: ``useCallback callback @ 897``

.. code-block:: javascript

   useCallback callback @ 897()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``897``—``900`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37814:37931:FUNCTION

.. rubric:: ``useCallback callback @ 916``

.. code-block:: javascript

   useCallback callback @ 916()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``916``—``918`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37986:38097:FUNCTION

.. rubric:: ``useCallback callback @ 920``

.. code-block:: javascript

   useCallback callback @ 920(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``920``—``922`` 行；所属函数 ``ChatPage``。

**参数**

``duration`` （默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38152:38554:FUNCTION

.. rubric:: ``useCallback callback @ 924``

.. code-block:: javascript

   useCallback callback @ 924()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``924``—``933`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38680:38923:FUNCTION

.. rubric:: ``useCallback callback @ 935``

.. code-block:: javascript

   useCallback callback @ 935()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``935``—``941`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39133:39554:FUNCTION

.. rubric:: ``useCallback callback @ 944``

.. code-block:: javascript

   useCallback callback @ 944()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``944``—``952`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39576:39687:FUNCTION

.. rubric:: ``useEffect callback @ 954``

.. code-block:: javascript

   useEffect callback @ 954()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``954``—``957`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``cancelAfterRenderScroll``。

**主要协作调用**：``cancelAfterRenderScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39827:42024:FUNCTION

.. rubric:: ``useCallback callback @ 961``

.. code-block:: javascript

   useCallback callback @ 961(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``961``—``1014`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll`` （默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelAfterRenderScroll``、``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40091:41234:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``966``—``993`` 行；所属函数 ``useCallback callback @ 961``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41270:41828:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``995``—``1007`` 行；所属函数 ``useCallback callback @ 961``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41444:41812:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 998``

.. code-block:: javascript

   requestAnimationFrame callback @ 998()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``998``—``1006`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41673:41792:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1002``

.. code-block:: javascript

   requestAnimationFrame callback @ 1002()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1002``—``1005`` 行；所属函数 ``requestAnimationFrame callback @ 998``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42431:42820:FUNCTION

.. rubric:: ``useCallback callback @ 1028``

.. code-block:: javascript

   useCallback callback @ 1028()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1028``—``1038`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44654:44726:FUNCTION

.. rubric:: ``useEffect callback @ 1090``

.. code-block:: javascript

   useEffect callback @ 1090()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1090``—``1092`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44894:44987:FUNCTION

.. rubric:: ``useCallback callback @ 1094``

.. code-block:: javascript

   useCallback callback @ 1094()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1094``—``1097`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44962:44979:FUNCTION

.. rubric:: ``setAvatarSceneOpen callback @ 1096``

.. code-block:: javascript

   setAvatarSceneOpen callback @ 1096(value)

设置与 ``Avatar Scene Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1096``—``1096`` 行；所属函数 ``useCallback callback @ 1094``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45039:45081:FUNCTION

.. rubric:: ``useCallback callback @ 1098``

.. code-block:: javascript

   useCallback callback @ 1098()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1098``—``1098`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45063:45080:FUNCTION

.. rubric:: ``setAvatarExpanded callback @ 1098``

.. code-block:: javascript

   setAvatarExpanded callback @ 1098(value)

设置与 ``Avatar Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1098``—``1098`` 行；所属函数 ``useCallback callback @ 1098``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45129:45211:FUNCTION

.. rubric:: ``useCallback callback @ 1099``

.. code-block:: javascript

   useCallback callback @ 1099()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1099``—``1102`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``setAvatarSceneOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45606:45678:FUNCTION

.. rubric:: ``useEffect callback @ 1116``

.. code-block:: javascript

   useEffect callback @ 1116()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1116``—``1118`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45843:45938:FUNCTION

.. rubric:: ``useEffect callback @ 1121``

.. code-block:: javascript

   useEffect callback @ 1121()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1121``—``1123`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``freezeVoiceStop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46113:46259:FUNCTION

.. rubric:: ``useEffect callback @ 1126``

.. code-block:: javascript

   useEffect callback @ 1126()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1126``—``1129`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46571:46615:FUNCTION

.. rubric:: ``useEffect callback @ 1134``

.. code-block:: javascript

   useEffect callback @ 1134()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1134``—``1136`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46688:47559:FUNCTION

.. rubric:: ``useCallback callback @ 1138``

.. code-block:: javascript

   async useCallback callback @ 1138()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1138``—``1158`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47615:48370:FUNCTION

.. rubric:: ``useCallback callback @ 1161``

.. code-block:: javascript

   async useCallback callback @ 1161(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1161``—``1179`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48454:49545:FUNCTION

.. rubric:: ``useCallback callback @ 1184``

.. code-block:: javascript

   async useCallback callback @ 1184(storyId, partId, changes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1184``—``1207`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48884:49013:FUNCTION

.. rubric:: ``setStories callback @ 1192``

.. code-block:: javascript

   setStories callback @ 1192(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1192``—``1193`` 行；所属函数 ``useCallback callback @ 1184``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48925:49012:FUNCTION

.. rubric:: ``current.map callback @ 1193``

.. code-block:: javascript

   current.map callback @ 1193(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1193``—``1193`` 行；所属函数 ``setStories callback @ 1192``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49057:49446:FUNCTION

.. rubric:: ``setActiveStory callback @ 1195``

.. code-block:: javascript

   setActiveStory callback @ 1195(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1195``—``1204`` 行；所属函数 ``useCallback callback @ 1184``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, ...nextStory, parts: (current.parts || []).map((item) => Number(item.partId) === Number(partId) ? data.part : item, ), }``。

**主要协作调用**：``Number``、``(current.parts || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49298:49389:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1200``

.. code-block:: javascript

   (current.parts || []).map callback @ 1200(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1200``—``1201`` 行；所属函数 ``setActiveStory callback @ 1195``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49620:50932:FUNCTION

.. rubric:: ``useCallback callback @ 1212``

.. code-block:: javascript

   async useCallback callback @ 1212(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1212``—``1242`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50085:50274:FUNCTION

.. rubric:: ``setStories callback @ 1222``

.. code-block:: javascript

   setStories callback @ 1222(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1222``—``1225`` 行；所属函数 ``useCallback callback @ 1212``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50134:50247:FUNCTION

.. rubric:: ``current.map callback @ 1223``

.. code-block:: javascript

   current.map callback @ 1223(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1223``—``1224`` 行；所属函数 ``setStories callback @ 1222``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50334:50456:FUNCTION

.. rubric:: ``setActiveStory callback @ 1227``

.. code-block:: javascript

   setActiveStory callback @ 1227(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1227``—``1228`` 行；所属函数 ``useCallback callback @ 1212``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51007:52109:FUNCTION

.. rubric:: ``useCallback callback @ 1247``

.. code-block:: javascript

   async useCallback callback @ 1247(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1247``—``1272`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51317:51396:FUNCTION

.. rubric:: ``setStories callback @ 1253``

.. code-block:: javascript

   setStories callback @ 1253(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1253``—``1253`` 行；所属函数 ``useCallback callback @ 1247``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51345:51395:FUNCTION

.. rubric:: ``current.filter callback @ 1253``

.. code-block:: javascript

   current.filter callback @ 1253(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1253``—``1253`` 行；所属函数 ``setStories callback @ 1253``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51430:51680:FUNCTION

.. rubric:: ``setActiveStory callback @ 1254``

.. code-block:: javascript

   setActiveStory callback @ 1254(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1254``—``1260`` 行；所属函数 ``useCallback callback @ 1247``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52187:52516:FUNCTION

.. rubric:: ``useCallback callback @ 1277``

.. code-block:: javascript

   useCallback callback @ 1277(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1277``—``1284`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \x60story:${story.storyId}:part:${part.partId}\x60, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52603:52650:FUNCTION

.. rubric:: ``useCallback callback @ 1288``

.. code-block:: javascript

   useCallback callback @ 1288()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1288``—``1290`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52690:52820:FUNCTION

.. rubric:: ``useEffect callback @ 1292``

.. code-block:: javascript

   useEffect callback @ 1292()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1292``—``1297`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStories``、``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52869:56576:FUNCTION

.. rubric:: ``useEffect callback @ 1300``

.. code-block:: javascript

   useEffect callback @ 1300()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1300``—``1373`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53097:56575:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305({ event, payload })

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1305``—``1373`` 行；所属函数 ``useEffect callback @ 1300``。

**参数**

``{ event, payload }``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53454:53527:FUNCTION

.. rubric:: ``setStories callback @ 1313``

.. code-block:: javascript

   setStories callback @ 1313(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1313``—``1313`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53482:53526:FUNCTION

.. rubric:: ``current.filter callback @ 1313``

.. code-block:: javascript

   current.filter callback @ 1313(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1313``—``1313`` 行；所属函数 ``setStories callback @ 1313``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53565:53833:FUNCTION

.. rubric:: ``setActiveStory callback @ 1314``

.. code-block:: javascript

   setActiveStory callback @ 1314(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1314``—``1320`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54310:54833:FUNCTION

.. rubric:: ``loadStories().then callback @ 1331``

.. code-block:: javascript

   loadStories().then callback @ 1331(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1331``—``1341`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54363:54809:FUNCTION

.. rubric:: ``setActiveStory callback @ 1332``

.. code-block:: javascript

   setActiveStory callback @ 1332(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1332``—``1340`` 行；所属函数 ``loadStories().then callback @ 1331``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54501:54559:FUNCTION

.. rubric:: ``values.some callback @ 1334``

.. code-block:: javascript

   values.some callback @ 1334(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1334``—``1334`` 行；所属函数 ``setActiveStory callback @ 1332``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54882:55463:FUNCTION

.. rubric:: ``setStories callback @ 1344``

.. code-block:: javascript

   setStories callback @ 1344(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1344``—``1354`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54949:55013:FUNCTION

.. rubric:: ``current.findIndex callback @ 1345``

.. code-block:: javascript

   current.findIndex callback @ 1345(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1345``—``1345`` 行；所属函数 ``setStories callback @ 1344``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55497:56559:FUNCTION

.. rubric:: ``setActiveStory callback @ 1355``

.. code-block:: javascript

   setActiveStory callback @ 1355(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1355``—``1372`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1305``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort``、``existing.filter``、``(current.parts || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56073:56116:FUNCTION

.. rubric:: ``existing.filter callback @ 1363``

.. code-block:: javascript

   existing.filter callback @ 1363(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1363``—``1363`` 行；所属函数 ``setActiveStory callback @ 1355``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56136:56198:FUNCTION

.. rubric:: ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1364``

.. code-block:: javascript

   [...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback @ 1364(a, b)

作为 ``[...existing.filter((item) => item.partId !== value.part.partId), value.part].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1364``—``1364`` 行；所属函数 ``setActiveStory callback @ 1355``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56367:56458:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1367``

.. code-block:: javascript

   (current.parts || []).map callback @ 1367(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1367``—``1368`` 行；所属函数 ``setActiveStory callback @ 1355``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56725:57637:FUNCTION

.. rubric:: ``useCallback callback @ 1379``

.. code-block:: javascript

   async useCallback callback @ 1379(targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1379``—``1399`` 行；所属函数 ``ChatPage``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``workspaceIds``。

**主要协作调用**：``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…``、``Array.isArray``、``apiClient.put``、``encodeURIComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57225:57260:FUNCTION

.. rubric:: ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1389``

.. code-block:: javascript

   (Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo… callback @ 1389(item)

实现 ``(Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : advancedSettingsValues?.wo…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1389``—``1389`` 行；所属函数 ``useCallback callback @ 1379``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57723:65259:FUNCTION

.. rubric:: ``useCallback callback @ 1404``

.. code-block:: javascript

   useCallback callback @ 1404({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1404``—``1559`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58796:61962:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   async sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1434``—``1498`` 行；所属函数 ``useCallback callback @ 1404``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{success: false, value: '会话设置尚未保存，请重试后发送', conversationId}``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(); if (!generatesReply || payload.value?.admissionAction ===…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``getOptionWriter(conversationId).flush``、``getOptionWriter``、``releaseSubmission``、``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(…``、``emitEvent(eventPayload).then``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60878:61834:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1478``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1478(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1478``—``1494`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...payload, conversationId, }``。

**主要协作调用**：``generateUUID``、``releaseSubmission``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61842:61946:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1494``

.. code-block:: javascript

   emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(… callback @ 1494(error)

发送事件与 ``Event(event Payload).then((payload) => { if (payload.success) { current Turn Idempotency Key Ref.current = generate UUID(…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1494``—``1497`` 行；所属函数 ``sendMessage``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``releaseSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62698:62930:FUNCTION

.. rubric:: ``releaseSubmission``

.. code-block:: javascript

   releaseSubmission()

实现 ``releaseSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1508``—``1513`` 行；所属函数 ``useCallback callback @ 1404``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63467:64721:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1527``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1527(payload)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1527``—``1546`` 行；所属函数 ``useCallback callback @ 1404``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``persistPendingWorkspaceSelection(payload.value).then(() => sendMessage(payload.value), )``。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection(payload.value).then``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64460:64528:FUNCTION

.. rubric:: ``persistPendingWorkspaceSelection(payload.value).then callback @ 1540``

.. code-block:: javascript

   persistPendingWorkspaceSelection(payload.value).then callback @ 1540()

处理 ``persistPendingWorkspaceSelection(payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1540``—``1541`` 行；所属函数 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1527``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64754:65038:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1547``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current, toolsStatus,… callback @ 1547(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current, tools Status,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1547``—``1551`` 行；所属函数 ``useCallback callback @ 1404``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ success: false, value: error?.message || String(error) }``。

**主要协作调用**：``releaseSubmission``、``toast.error``、``t``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65691:69242:FUNCTION

.. rubric:: ``useCallback callback @ 1577``

.. code-block:: javascript

   async useCallback callback @ 1577({ toolsStatus = {}, composerStatus = 'normal' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1577``—``1649`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66913:67437:FUNCTION

.. rubric:: ``startForConversation``

.. code-block:: javascript

   async startForConversation(targetConversationId)

启动与 ``For Conversation`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1603``—``1614`` 行；所属函数 ``useCallback callback @ 1577``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.start``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69638:72524:FUNCTION

.. rubric:: ``useCallback callback @ 1665``

.. code-block:: javascript

   async useCallback callback @ 1665()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1665``—``1731`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70297:72149:FUNCTION

.. rubric:: ``anonymous callback @ 1680``

.. code-block:: javascript

   async anonymous callback @ 1680()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1680``—``1720`` 行；所属函数 ``useCallback callback @ 1665``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71013:71053:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1694``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1694(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1694``—``1694`` 行；所属函数 ``anonymous callback @ 1680``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71582:71687:FUNCTION

.. rubric:: ``anonymous callback @ 1708``

.. code-block:: javascript

   anonymous callback @ 1708(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1708``—``1710`` 行；所属函数 ``anonymous callback @ 1680``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71635:71671:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1709``

.. code-block:: javascript

   requestAnimationFrame callback @ 1709()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1709``—``1709`` 行；所属函数 ``anonymous callback @ 1708``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72161:72441:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1720``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1720()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1720``—``1727`` 行；所属函数 ``useCallback callback @ 1665``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72741:73756:FUNCTION

.. rubric:: ``useEffect callback @ 1741``

.. code-block:: javascript

   useEffect callback @ 1741()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1741``—``1768`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73207:73503:FUNCTION

.. rubric:: ``anonymous callback @ 1753``

.. code-block:: javascript

   anonymous callback @ 1753(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1753``—``1758`` 行；所属函数 ``useEffect callback @ 1741``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73269:73300:FUNCTION

.. rubric:: ``entries.some callback @ 1754``

.. code-block:: javascript

   entries.some callback @ 1754(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1754``—``1754`` 行；所属函数 ``anonymous callback @ 1753``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73351:73487:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1755``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1755(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1755``—``1757`` 行；所属函数 ``anonymous callback @ 1753``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73721:73749:FUNCTION

.. rubric:: ``returned callback @ 1767``

.. code-block:: javascript

   returned callback @ 1767()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1767``—``1767`` 行；所属函数 ``useEffect callback @ 1741``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73883:74891:FUNCTION

.. rubric:: ``useCallback callback @ 1771``

.. code-block:: javascript

   useCallback callback @ 1771(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1771``—``1790`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74723:74848:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1786``

.. code-block:: javascript

   window.setTimeout callback @ 1786()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1786``—``1788`` 行；所属函数 ``useCallback callback @ 1771``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74771:74832:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1787``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1787(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1787``—``1787`` 行；所属函数 ``window.setTimeout callback @ 1786``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75028:77016:FUNCTION

.. rubric:: ``useCallback callback @ 1794``

.. code-block:: javascript

   async useCallback callback @ 1794()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1794``—``1838`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76541:76819:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1825``

.. code-block:: javascript

   requestAnimationFrame callback @ 1825()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1825``—``1832`` 行；所属函数 ``useCallback callback @ 1794``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76587:76803:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1826``

.. code-block:: javascript

   requestAnimationFrame callback @ 1826()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1826``—``1831`` 行；所属函数 ``requestAnimationFrame callback @ 1825``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77274:77536:FUNCTION

.. rubric:: ``useEffect callback @ 1850``

.. code-block:: javascript

   useEffect callback @ 1850()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1850``—``1857`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77362:77529:FUNCTION

.. rubric:: ``returned callback @ 1852``

.. code-block:: javascript

   returned callback @ 1852()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1852``—``1856`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77603:80917:FUNCTION

.. rubric:: ``useCallback callback @ 1860``

.. code-block:: javascript

   async useCallback callback @ 1860(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1860``—``1927`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77780:80058:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1865``—``1908`` 行；所属函数 ``useCallback callback @ 1860``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77893:77931:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1866``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1866(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1866``—``1866`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78318:78342:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1873``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1873(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1873``—``1873`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79737:79850:FUNCTION

.. rubric:: ``anonymous callback @ 1901``

.. code-block:: javascript

   anonymous callback @ 1901(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1901``—``1903`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79794:79830:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1902``

.. code-block:: javascript

   requestAnimationFrame callback @ 1902()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1902``—``1902`` 行；所属函数 ``anonymous callback @ 1901``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80182:80220:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1912``

.. code-block:: javascript

   summaryItems.some callback @ 1912(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1912``—``1912`` 行；所属函数 ``useCallback callback @ 1860``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81238:81889:FUNCTION

.. rubric:: ``useEffect callback @ 1941``

.. code-block:: javascript

   useEffect callback @ 1941()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1941``—``1955`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81706:81881:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1950``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1950(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1950``—``1954`` 行；所属函数 ``useEffect callback @ 1941``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82036:85850:FUNCTION

.. rubric:: ``useCallback callback @ 1958``

.. code-block:: javascript

   async useCallback callback @ 1958(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1958``—``2050`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84534:85715:FUNCTION

.. rubric:: ``produce callback @ 2012``

.. code-block:: javascript

   produce callback @ 2012(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2012``—``2045`` 行；所属函数 ``useCallback callback @ 1958``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85201:85323:FUNCTION

.. rubric:: ``anonymous callback @ 2031``

.. code-block:: javascript

   anonymous callback @ 2031(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2031``—``2033`` 行；所属函数 ``produce callback @ 2012``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85406:85506:FUNCTION

.. rubric:: ``anonymous callback @ 2036``

.. code-block:: javascript

   anonymous callback @ 2036(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2036``—``2038`` 行；所属函数 ``produce callback @ 2012``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85582:85682:FUNCTION

.. rubric:: ``anonymous callback @ 2041``

.. code-block:: javascript

   anonymous callback @ 2041(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2041``—``2043`` 行；所属函数 ``produce callback @ 2012``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86019:87105:FUNCTION

.. rubric:: ``useCallback callback @ 2056``

.. code-block:: javascript

   async useCallback callback @ 2056(msgId, result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2056``—``2075`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87288:88908:FUNCTION

.. rubric:: ``useCallback callback @ 2080``

.. code-block:: javascript

   async useCallback callback @ 2080(msgId, { closeDialog = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2080``—``2110`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``{ closeDialog = false }`` （默认值 ``{}``）
   调用方传入的 ``closeDialog = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setIsDeletingMessage``、``apiClient.delete``、``deleteMessageLocally``、``loadMessageSummaries``、``markRuntimeInspectorStale``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89079:90410:FUNCTION

.. rubric:: ``useCallback callback @ 2115``

.. code-block:: javascript

   async useCallback callback @ 2115(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2115``—``2146`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90543:91648:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded(isCurrent)

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2150``—``2176`` 行；所属函数 ``ChatPage``。

**参数**

``isCurrent`` （默认值 ``() => true``）
   调用方传入的 ``isCurrent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90556:90567:FUNCTION

.. rubric:: ``anonymous callback @ 2150``

.. code-block:: javascript

   anonymous callback @ 2150()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2150``—``2150`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90593:91637:FUNCTION

.. rubric:: ``setTimeout callback @ 2151``

.. code-block:: javascript

   setTimeout callback @ 2151()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2151``—``2175`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91187:91293:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2164``—``2166`` 行；所属函数 ``setTimeout callback @ 2151``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91315:91625:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2167``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2167(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2167``—``2174`` 行；所属函数 ``setTimeout callback @ 2151``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91665:93779:FUNCTION

.. rubric:: ``useEffect callback @ 2178``

.. code-block:: javascript

   useEffect callback @ 2178()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2178``—``2240`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91866:92920:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2185``—``2211`` 行；所属函数 ``useEffect callback @ 2178``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92243:92908:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2194``

.. code-block:: javascript

   requestAnimationFrame callback @ 2194()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2194``—``2210`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93020:93200:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2215``—``2219`` 行；所属函数 ``useEffect callback @ 2178``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93357:93471:FUNCTION

.. rubric:: ``anonymous callback @ 2224``

.. code-block:: javascript

   anonymous callback @ 2224()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2224``—``2227`` 行；所属函数 ``useEffect callback @ 2178``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93577:93772:FUNCTION

.. rubric:: ``returned callback @ 2233``

.. code-block:: javascript

   returned callback @ 2233()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2233``—``2239`` 行；所属函数 ``useEffect callback @ 2178``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94027:97381:FUNCTION

.. rubric:: ``useEffect callback @ 2250``

.. code-block:: javascript

   useEffect callback @ 2250()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2250``—``2336`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94261:94369:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2257``—``2259`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94399:94719:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2261``—``2269`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94754:94845:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2271``—``2273`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94879:95524:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2275``—``2292`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95555:96730:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2294``—``2323`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97076:97374:FUNCTION

.. rubric:: ``returned callback @ 2330``

.. code-block:: javascript

   returned callback @ 2330()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2330``—``2335`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97576:98041:FUNCTION

.. rubric:: ``useEffect callback @ 2344``

.. code-block:: javascript

   useEffect callback @ 2344()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2344``—``2357`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97723:98023:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2346``

.. code-block:: javascript

   requestAnimationFrame callback @ 2346()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2346``—``2355`` 行；所属函数 ``useEffect callback @ 2344``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98276:98732:FUNCTION

.. rubric:: ``useEffect callback @ 2367``

.. code-block:: javascript

   useEffect callback @ 2367()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2367``—``2378`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98768:98906:FUNCTION

.. rubric:: ``useEffect callback @ 2380``

.. code-block:: javascript

   useEffect callback @ 2380()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2380``—``2384`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99032:99275:FUNCTION

.. rubric:: ``useCallback callback @ 2386``

.. code-block:: javascript

   useCallback callback @ 2386()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2386``—``2393`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99421:99542:FUNCTION

.. rubric:: ``useCallback callback @ 2396``

.. code-block:: javascript

   useCallback callback @ 2396(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2396``—``2398`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99667:99910:FUNCTION

.. rubric:: ``useCallback callback @ 2402``

.. code-block:: javascript

   async useCallback callback @ 2402()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2402``—``2407`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100098:101189:FUNCTION

.. rubric:: ``useEffect callback @ 2415``

.. code-block:: javascript

   useEffect callback @ 2415()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2415``—``2442`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100405:100447:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2424``

.. code-block:: javascript

   messagesOrder.filter callback @ 2424(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2424``—``2424`` 行；所属函数 ``useEffect callback @ 2415``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100703:101072:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2429``

.. code-block:: javascript

   window.setTimeout callback @ 2429()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2429``—``2437`` 行；所属函数 ``useEffect callback @ 2415``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({ silent: true, append: true }).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100781:101060:FUNCTION

.. rubric:: ``loadMessageSummaries({ silent: true, append: true }).then callback @ 2430``

.. code-block:: javascript

   loadMessageSummaries({ silent: true, append: true }).then callback @ 2430(items)

处理 ``loadMessageSummaries({ silent: true, append: true }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2430``—``2436`` 行；所属函数 ``window.setTimeout callback @ 2429``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101094:101182:FUNCTION

.. rubric:: ``returned callback @ 2438``

.. code-block:: javascript

   returned callback @ 2438()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2438``—``2441`` 行；所属函数 ``useEffect callback @ 2415``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101393:101901:FUNCTION

.. rubric:: ``useEffect callback @ 2451``

.. code-block:: javascript

   useEffect callback @ 2451()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2451``—``2463`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101503:101560:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2454``—``2454`` 行；所属函数 ``useEffect callback @ 2451``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101781:101894:FUNCTION

.. rubric:: ``returned callback @ 2459``

.. code-block:: javascript

   returned callback @ 2459()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2459``—``2462`` 行；所属函数 ``useEffect callback @ 2451``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101935:103995:FUNCTION

.. rubric:: ``useEffect callback @ 2465``

.. code-block:: javascript

   useEffect callback @ 2465()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2465``—``2509`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102105:103492:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2470``—``2498`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102223:103480:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2472``

.. code-block:: javascript

   requestAnimationFrame callback @ 2472()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2472``—``2497`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map((element) => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102978:103029:FUNCTION

.. rubric:: ``elements .map callback @ 2486``

.. code-block:: javascript

   elements .map callback @ 2486(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2486``—``2486`` 行；所属函数 ``requestAnimationFrame callback @ 2472``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103061:103112:FUNCTION

.. rubric:: ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2487``

.. code-block:: javascript

   elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2487(element)

作为 ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2487``—``2487`` 行；所属函数 ``requestAnimationFrame callback @ 2472``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103390:103446:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2495``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2495(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2495``—``2495`` 行；所属函数 ``requestAnimationFrame callback @ 2472``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103789:103988:FUNCTION

.. rubric:: ``returned callback @ 2504``

.. code-block:: javascript

   returned callback @ 2504()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2504``—``2508`` 行；所属函数 ``useEffect callback @ 2465``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104030:138781:FUNCTION

.. rubric:: ``useEffect callback @ 2511``

.. code-block:: javascript

   useEffect callback @ 2511()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2511``—``3174`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104117:104143:FUNCTION

.. rubric:: ``getMessages``

.. code-block:: javascript

   getMessages()

读取与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2513``—``2513`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104164:104528:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next, messageIds)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2514``—``2521`` 行；所属函数 ``useEffect callback @ 2511``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104700:104817:FUNCTION

.. rubric:: ``appendIsCurrent``

.. code-block:: javascript

   appendIsCurrent()

追加与 ``Is Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2526``—``2527`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104930:105325:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2530``—``2536`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{messages: messagesRef.current, order: messagesOrderRef.current, liveMessageIds: liveStreamMessageIdsRef.current, ready: isMessageLoadedRef.current && lastHydratedConversationIdRe…``。

**主要协作调用**：``streamBatch.flush``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105344:105537:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load(afterId)

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2537``—``2539`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

``afterId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105557:106003:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply({messages: nextMessages, order})

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2540``—``2548`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

``{messages: nextMessages, order}``
   调用方传入的 ``messages: nextMessages, order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``decorateMessages``、``setMessages``、``setMessagesOrder``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106026:106068:FUNCTION

.. rubric:: ``complete``

.. code-block:: javascript

   complete()

实现 ``complete`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2549``—``2549`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106091:106127:FUNCTION

.. rubric:: ``mismatch``

.. code-block:: javascript

   mismatch()

实现 ``mismatch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2550``—``2550`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRandomMark``、``generateUUID``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106147:106380:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error()

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2551``—``2555`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toast.warning``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106272:106363:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2552``—``2554`` 行；所属函数 ``error``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``appendIsCurrent``、``appendSync.request``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:107527:137586:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585({ event, payload, reply, eventRunId, eventTurnId })

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2585``—``3144`` 行；所属函数 ``useEffect callback @ 2511``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:111152:111183:FUNCTION

.. rubric:: ``submitMessageDeletion(msgId).then callback @ 2658``

.. code-block:: javascript

   submitMessageDeletion(msgId).then callback @ 2658(success)

处理 ``submitMessageDeletion(msgId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2658``—``2658`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114668:114814:FUNCTION

.. rubric:: ``anonymous callback @ 2722``

.. code-block:: javascript

   anonymous callback @ 2722(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2722``—``2724`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114874:114998:FUNCTION

.. rubric:: ``anonymous callback @ 2726``

.. code-block:: javascript

   anonymous callback @ 2726(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2726``—``2728`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115051:115175:FUNCTION

.. rubric:: ``anonymous callback @ 2730``

.. code-block:: javascript

   anonymous callback @ 2730(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2730``—``2732`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116398:116723:FUNCTION

.. rubric:: ``produce callback @ 2758``

.. code-block:: javascript

   produce callback @ 2758(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2758``—``2763`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118044:118377:FUNCTION

.. rubric:: ``produce callback @ 2786``

.. code-block:: javascript

   produce callback @ 2786(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2786``—``2792`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119211:119571:FUNCTION

.. rubric:: ``produce callback @ 2806``

.. code-block:: javascript

   produce callback @ 2806(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2806``—``2812`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120638:120950:FUNCTION

.. rubric:: ``produce callback @ 2832``

.. code-block:: javascript

   produce callback @ 2832(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2832``—``2837`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121533:122236:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2848``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2848()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value, }, conversation Id: conversation Id, loc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2848``—``2860`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121626:122204:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2849``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2849()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2849``—``2859`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2848``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122863:123391:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2875``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2875()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message, }, conversation Id: conversation I…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2875``—``2886`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122954:123367:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2876``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2876()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2876``—``2885`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2875``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124335:125401:FUNCTION

.. rubric:: ``produce callback @ 2903``

.. code-block:: javascript

   produce callback @ 2903(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2903``—``2920`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:126380:128270:FUNCTION

.. rubric:: ``produce callback @ 2940``

.. code-block:: javascript

   produce callback @ 2940(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2940``—``2968`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeMessageContextState``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:130035:130071:FUNCTION

.. rubric:: ``window.setTimeout callback @ 3002``

.. code-block:: javascript

   window.setTimeout callback @ 3002()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3002``—``3002`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132448:133034:FUNCTION

.. rubric:: ``produce callback @ 3052``

.. code-block:: javascript

   produce callback @ 3052(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3052``—``3061`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133764:134185:FUNCTION

.. rubric:: ``produce callback @ 3074``

.. code-block:: javascript

   produce callback @ 3074(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3074``—``3080`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134920:135342:FUNCTION

.. rubric:: ``produce callback @ 3096``

.. code-block:: javascript

   produce callback @ 3096(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3096``—``3102`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2585``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``removeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137686:138021:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 3147``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 3147()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3147``—``3154`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``、``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138173:138276:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3159``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3159({ event, payload, reply })

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3159``—``3161`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138486:138774:FUNCTION

.. rubric:: ``returned callback @ 3165``

.. code-block:: javascript

   returned callback @ 3165()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3165``—``3173`` 行；所属函数 ``useEffect callback @ 2511``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``appendSync.invalidate``、``streamBatch.flush``、``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139594:139679:FUNCTION

.. rubric:: ``useEffect callback @ 3203``

.. code-block:: javascript

   useEffect callback @ 3203()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3203``—``3207`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139616:139672:FUNCTION

.. rubric:: ``returned callback @ 3204``

.. code-block:: javascript

   returned callback @ 3204()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3204``—``3206`` 行；所属函数 ``useEffect callback @ 3203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139719:139794:FUNCTION

.. rubric:: ``useEffect callback @ 3209``

.. code-block:: javascript

   useEffect callback @ 3209()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3209``—``3211`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:139835:142346:FUNCTION

.. rubric:: ``useEffect callback @ 3213``

.. code-block:: javascript

   useEffect callback @ 3213()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3213``—``3265`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setTurnSubmission``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142223:142284:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 3260``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 3260(_, id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3260``—``3262`` 行；所属函数 ``useEffect callback @ 3213``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142424:143023:FUNCTION

.. rubric:: ``useEffect callback @ 3267``

.. code-block:: javascript

   useEffect callback @ 3267()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3267``—``3282`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142649:142813:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 3272``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 3272(items)

处理 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3272``—``3275`` 行；所属函数 ``useEffect callback @ 3267``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142834:142951:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 3276``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 3276()

实现 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3276``—``3278`` 行；所属函数 ``useEffect callback @ 3267``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142968:143016:FUNCTION

.. rubric:: ``returned callback @ 3279``

.. code-block:: javascript

   returned callback @ 3279()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3279``—``3281`` 行；所属函数 ``useEffect callback @ 3267``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:143089:145354:FUNCTION

.. rubric:: ``useCallback callback @ 3285``

.. code-block:: javascript

   async useCallback callback @ 3285({ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3285``—``3324`` 行；所属函数 ``ChatPage``。

**参数**

``{ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true }`` （默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``normalizedModels``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``isCurrent``、``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:143171:143182:FUNCTION

.. rubric:: ``anonymous callback @ 3285``

.. code-block:: javascript

   anonymous callback @ 3285()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3285``—``3285`` 行；所属函数 ``useCallback callback @ 3285``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144731:144767:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 3311``

.. code-block:: javascript

   normalizedModels.find callback @ 3311(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3311``—``3311`` 行；所属函数 ``useCallback callback @ 3285``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145407:145616:FUNCTION

.. rubric:: ``useEffect callback @ 3328``

.. code-block:: javascript

   useEffect callback @ 3328()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3328``—``3332`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146012:146308:FUNCTION

.. rubric:: ``useEffect callback @ 3338``

.. code-block:: javascript

   useEffect callback @ 3338()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3338``—``3343`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146410:154817:FUNCTION

.. rubric:: ``useEffect callback @ 3345``

.. code-block:: javascript

   useEffect callback @ 3345()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3345``—``3524`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146825:146912:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3354``—``3354`` 行；所属函数 ``useEffect callback @ 3345``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147017:148295:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3357``—``3383`` 行；所属函数 ``useEffect callback @ 3345``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``getOptionWriter(conversationId).apply``、``getOptionWriter``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147685:147717:FUNCTION

.. rubric:: ``modelsData.find callback @ 3370``

.. code-block:: javascript

   modelsData.find callback @ 3370(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3370``—``3370`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148326:149071:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3384``—``3399`` 行；所属函数 ``useEffect callback @ 3345``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``loadAvailableModels``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148803:148849:FUNCTION

.. rubric:: ``modelsData.find callback @ 3395``

.. code-block:: javascript

   modelsData.find callback @ 3395(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3395``—``3395`` 行；所属函数 ``requestModels``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149104:153745:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3400``—``3494`` 行；所属函数 ``useEffect callback @ 3345``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:151354:152260:FUNCTION

.. rubric:: ``setTimeout callback @ 3442``

.. code-block:: javascript

   setTimeout callback @ 3442()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3442``—``3459`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:151439:152236:FUNCTION

.. rubric:: ``setTimeout callback @ 3444``

.. code-block:: javascript

   setTimeout callback @ 3444()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3444``—``3458`` 行；所属函数 ``setTimeout callback @ 3442``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:152653:152845:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3467``—``3471`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:153122:153714:FUNCTION

.. rubric:: ``setTimeout callback @ 3480``

.. code-block:: javascript

   setTimeout callback @ 3480()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3480``—``3492`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:153771:154513:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3495``—``3513`` 行；所属函数 ``useEffect callback @ 3345``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setIsLoading``、``performance.now``、``Promise.all``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154785:154810:FUNCTION

.. rubric:: ``returned callback @ 3523``

.. code-block:: javascript

   returned callback @ 3523()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3523``—``3523`` 行；所属函数 ``useEffect callback @ 3345``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155123:155304:FUNCTION

.. rubric:: ``useCallback callback @ 3537``

.. code-block:: javascript

   async useCallback callback @ 3537()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3537``—``3540`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155374:155708:FUNCTION

.. rubric:: ``useCallback callback @ 3541``

.. code-block:: javascript

   async useCallback callback @ 3541()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3541``—``3549`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``setRemoteSettingsPanel``、``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155685:155700:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 3548``

.. code-block:: javascript

   setIsSidebarOpen callback @ 3548(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3548``—``3548`` 行；所属函数 ``useCallback callback @ 3541``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155796:156254:FUNCTION

.. rubric:: ``useCallback callback @ 3550``

.. code-block:: javascript

   async useCallback callback @ 3550()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3550``—``3562`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleSidebarClose``、``setRemoteSettingsPanel``、``encodeURIComponent``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156379:156469:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 3566``

.. code-block:: javascript

   useBrowserBackLayer callback @ 3566()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3566``—``3569`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSidebarClose``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156620:157742:FUNCTION

.. rubric:: ``useEffect callback @ 3575``

.. code-block:: javascript

   useEffect callback @ 3575()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3575``—``3595`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; if (!opened && selfMessageFocusRef.current === key) selfMessageFocusRef.current = null; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``new URLSearchParams(routeLocation.search).get``、``(async () => { if (remoteSettingsPanelRef.current && !(await remoteSettingsPanelRef.current.canClose())) return; if (ca…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157026:157568:FUNCTION

.. rubric:: ``anonymous callback @ 3582``

.. code-block:: javascript

   async anonymous callback @ 3582()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3582``—``3590`` 行；所属函数 ``useEffect callback @ 3575``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``encodeURIComponent``、``setRemoteSettingsPanel``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157587:157735:FUNCTION

.. rubric:: ``returned callback @ 3591``

.. code-block:: javascript

   returned callback @ 3591()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3591``—``3594`` 行；所属函数 ``useEffect callback @ 3575``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:157818:158134:FUNCTION

.. rubric:: ``useEffect callback @ 3596``

.. code-block:: javascript

   useEffect callback @ 3596()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3596``—``3602`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``new URLSearchParams(window.location.search).get``、``jumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:164136:164169:FUNCTION

.. rubric:: ``onClose callback @ 3708``

.. code-block:: javascript

   onClose callback @ 3708()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3708``—``3708`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167732:167762:FUNCTION

.. rubric:: ``onStop callback @ 3766``

.. code-block:: javascript

   onStop callback @ 3766()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3766``—``3766`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167808:167835:FUNCTION

.. rubric:: ``onPrevious callback @ 3767``

.. code-block:: javascript

   onPrevious callback @ 3767()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3767``—``3767`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167877:167903:FUNCTION

.. rubric:: ``onNext callback @ 3768``

.. code-block:: javascript

   onNext callback @ 3768()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3768``—``3768`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:170427:170611:FUNCTION

.. rubric:: ``onClick callback @ 3808``

.. code-block:: javascript

   onClick callback @ 3808()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3808``—``3811`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:175299:175893:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3881``

.. code-block:: javascript

   onWorkspaceChange callback @ 3881(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3881``—``3889`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:175493:175782:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3883``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3883(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3883``—``3887`` 行；所属函数 ``onWorkspaceChange callback @ 3881``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179620:179822:FUNCTION

.. rubric:: ``anonymous callback @ 3959``

.. code-block:: javascript

   anonymous callback @ 3959()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3959``—``3962`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180048:180192:FUNCTION

.. rubric:: ``onToggleAvatarScene callback @ 3968``

.. code-block:: javascript

   onToggleAvatarScene callback @ 3968()

处理 ``Toggle Avatar Scene`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3968``—``3971`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAvatarScene``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180430:180566:FUNCTION

.. rubric:: ``onEnd callback @ 3974``

.. code-block:: javascript

   onEnd callback @ 3974()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3974``—``3977`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180604:180642:FUNCTION

.. rubric:: ``onMinimize callback @ 3978``

.. code-block:: javascript

   onMinimize callback @ 3978()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3978``—``3978`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180679:180829:FUNCTION

.. rubric:: ``onRestore callback @ 3979``

.. code-block:: javascript

   onRestore callback @ 3979()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3979``—``3982`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181873:185386:FUNCTION

.. rubric:: ``onSettingChange callback @ 3998``

.. code-block:: javascript

   onSettingChange callback @ 3998(values, change)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3998``—``4046`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182119:182362:FUNCTION

.. rubric:: ``Object.entries(values).filter callback @ 4002``

.. code-block:: javascript

   Object.entries(values).filter callback @ 4002([key, value])

作为 ``Object.entries(values).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4002``—``4004`` 行；所属函数 ``onSettingChange callback @ 3998``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182844:182918:FUNCTION

.. rubric:: ``Object.entries(patch).filter callback @ 4010``

.. code-block:: javascript

   Object.entries(patch).filter callback @ 4010([key])

作为 ``Object.entries(patch).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4010``—``4010`` 行；所属函数 ``onSettingChange callback @ 3998``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['avatarModelId', 'workspaceId', 'workspaceIds'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183095:183132:FUNCTION

.. rubric:: ``Object.keys(allowed).some callback @ 4012``

.. code-block:: javascript

   Object.keys(allowed).some callback @ 4012(key)

作为 ``Object.keys(allowed).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4012``—``4012`` 行；所属函数 ``onSettingChange callback @ 3998``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``key.startsWith``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183780:183788:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch callback @ 4023``

.. code-block:: javascript

   avatarSelectionQueue.current .catch callback @ 4023()

处理 ``avatarSelectionQueue.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``4023``—``4023`` 行；所属函数 ``onSettingChange callback @ 3998``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183832:184544:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 4024``

.. code-block:: javascript

   async avatarSelectionQueue.current .catch(() => {}) .then callback @ 4024()

处理 ``avatarSelectionQueue.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``4024``—``4033`` 行；所属函数 ``onSettingChange callback @ 3998``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(result.message || '角色模型保存失败')``。

**主要协作调用**：``emitEvent``、``setAvatarModelRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184478:184504:FUNCTION

.. rubric:: ``setAvatarModelRevision callback @ 4032``

.. code-block:: javascript

   setAvatarModelRevision callback @ 4032(revision)

设置与 ``Avatar Model Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``4032``—``4032`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 4024``。

**参数**

``revision``
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184589:185206:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4034``

.. code-block:: javascript

   avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4034(error)

实现 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4034``—``4042`` 行；所属函数 ``onSettingChange callback @ 3998``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``setAdvancedSettingsValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184852:185120:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 4037``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 4037(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``4037``—``4040`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 4034``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186322:186445:FUNCTION

.. rubric:: ``onClose callback @ 4071``

.. code-block:: javascript

   onClose callback @ 4071()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4071``—``4074`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186947:187217:FUNCTION

.. rubric:: ``onOpenChange callback @ 4086``

.. code-block:: javascript

   onOpenChange callback @ 4086(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4086``—``4093`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:187513:187593:FUNCTION

.. rubric:: ``onConfirm callback @ 4099``

.. code-block:: javascript

   onConfirm callback @ 4099()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4099``—``4099`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``submitMessageDeletion``。
