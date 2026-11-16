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
* **局部函数与匿名回调**：297

主要依赖
--------------------------------------------------------------------------------

``./page/utils/messageStreamBatch.js``、``@/components/markdown/markdownRenderBudget.js``、``./page/utils/appendedHistory.js``、``./page/utils/messageDeletion.js``、``./page/utils/conversationOptions.js``、``@/runtime/backend/connection.js``、``./page/openChatWindow.js``、``lucide-react``、``react``、``framer-motion``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``@/context/useEventStore.jsx``、``react-i18next``、``react-router-dom``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/RuntimeInspectorDialog.jsx``、``@/features/settings-runtime/RemoteSettingsPanel.jsx``、``@/features/chat/page/hooks/useRuntimeInspector.js``、``@/features/chat/page/hooks/useMessageNavigation.js``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``./freeze/useConversationFreeze.js``、``./freeze/ConversationFreezeNotice.jsx``、``./freeze/ConversationFreezeContext.jsx``、``@/features/execution``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4284:4384:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``92`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4433:4574:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``94``—``97`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4619:4860:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``99``—``105`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4991:5157:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5182:5235:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``117`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5265:5420:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5441:5607:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``129`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5631:5683:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``131``—``131`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5710:5810:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``133``—``136`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ text: String(data.text ?? '') }``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5834:5979:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``138``—``141`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6010:6610:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6642:6786:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6787:187267:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, standaloneWin…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``169``—``4056`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5019:5156:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:8846:8898:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:9053:9116:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12245:12373:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12784:12822:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:12981:13926:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13250:13486:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13513:13760:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13786:13842:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13947:14067:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13952:14067:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14051:14059:FUNCTION

.. rubric:: ``writer.flush().catch callback @ 304``

.. code-block:: javascript

   writer.flush().catch callback @ 304()

处理 ``writer.flush().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``anonymous callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14378:14968:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14505:14589:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14643:14685:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15023:15678:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15275:15283:FUNCTION

.. rubric:: ``agentConfigurationQueueRef.current .catch callback @ 327``

.. code-block:: javascript

   agentConfigurationQueueRef.current .catch callback @ 327()

处理 ``agentConfigurationQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``327``—``327`` 行；所属函数 ``useCallback callback @ 322``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15303:15597:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15618:15670:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15756:16494:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16552:16685:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16566:16685:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17113:17176:FUNCTION

.. rubric:: ``useEffect callback @ 367``

.. code-block:: javascript

   useEffect callback @ 367()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``367``—``369`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17211:17448:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17225:17448:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17522:18423:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18130:18398:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18180:18301:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18716:18883:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20049:20199:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20281:20373:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20423:21114:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20558:20595:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20701:20762:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20989:21030:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21165:21772:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21494:21764:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21601:21658:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21832:22922:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22250:22287:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22734:22801:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22971:23812:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23040:23811:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23103:23795:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23413:23535:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23587:23687:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23732:23776:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23879:26536:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26662:27101:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26884:27069:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27156:27374:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27453:27874:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28014:28128:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28591:28717:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28784:29064:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29139:30238:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29459:30230:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29533:29836:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30300:32128:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31055:31669:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31701:31775:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31805:31814:FUNCTION

.. rubric:: ``anonymous callback @ 748``

.. code-block:: javascript

   anonymous callback @ 748()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``748``—``748`` 行；所属函数 ``useCallback callback @ 705``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32253:32791:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32912:36145:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36212:37078:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37243:37372:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37888:38005:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38060:38171:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38226:38628:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38754:38997:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39207:39628:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39650:39761:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39901:42098:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40165:41308:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41344:41902:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41518:41886:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41747:41866:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42505:42894:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44728:44800:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44968:45061:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45036:45053:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45113:45155:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45137:45154:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45203:45285:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45680:45752:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45917:46012:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46187:46333:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46645:46689:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46762:47633:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47689:48444:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48528:49619:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48958:49087:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48999:49086:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49131:49520:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49372:49463:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49694:51006:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50159:50348:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50208:50321:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50408:50530:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51081:52183:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51391:51470:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51419:51469:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51504:51754:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52261:52590:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52677:52724:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52764:52894:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52943:56650:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53171:56649:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53528:53601:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53556:53600:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53639:53907:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54384:54907:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54437:54883:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54575:54633:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54956:55537:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55023:55087:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55571:56633:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56147:56190:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56210:56272:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56441:56532:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56799:57711:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57299:57334:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57797:65333:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58870:62036:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60952:61908:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61916:62020:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62772:63004:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63541:64795:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64534:64602:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64828:65112:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65765:69316:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66987:67511:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69712:72705:FUNCTION

.. rubric:: ``useCallback callback @ 1665``

.. code-block:: javascript

   async useCallback callback @ 1665()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1665``—``1732`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70371:72330:FUNCTION

.. rubric:: ``anonymous callback @ 1680``

.. code-block:: javascript

   async anonymous callback @ 1680()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1680``—``1721`` 行；所属函数 ``useCallback callback @ 1665``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71194:71234:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1695``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1695(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1695``—``1695`` 行；所属函数 ``anonymous callback @ 1680``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71763:71868:FUNCTION

.. rubric:: ``anonymous callback @ 1709``

.. code-block:: javascript

   anonymous callback @ 1709(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1709``—``1711`` 行；所属函数 ``anonymous callback @ 1680``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71816:71852:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72342:72622:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1721``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1721()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1721``—``1728`` 行；所属函数 ``useCallback callback @ 1665``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72956:74685:FUNCTION

.. rubric:: ``useCallback callback @ 1743``

.. code-block:: javascript

   useCallback callback @ 1743(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1743``—``1770`` 行；所属函数 ``ChatPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``behavior`` （默认值 ``'smooth'``）
   调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``CSS.escape``、``String``、``container.querySelector``、``setShowScrollToBottomButton``、``setActiveVisibleMessageId``、``setHighlightedMessageId``、``window.matchMedia``、``element.getBoundingClientRect``、``container.getBoundingClientRect``、``Math.abs``、``markProgrammaticScroll``、``container.scrollTo``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74517:74642:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1766``

.. code-block:: javascript

   window.setTimeout callback @ 1766()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1766``—``1768`` 行；所属函数 ``useCallback callback @ 1743``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74565:74626:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1767``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1767(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1767``—``1767`` 行；所属函数 ``window.setTimeout callback @ 1766``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74846:76834:FUNCTION

.. rubric:: ``useCallback callback @ 1774``

.. code-block:: javascript

   async useCallback callback @ 1774()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1774``—``1818`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76359:76637:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1805``

.. code-block:: javascript

   requestAnimationFrame callback @ 1805()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1805``—``1812`` 行；所属函数 ``useCallback callback @ 1774``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76405:76621:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1806``

.. code-block:: javascript

   requestAnimationFrame callback @ 1806()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1806``—``1811`` 行；所属函数 ``requestAnimationFrame callback @ 1805``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77092:77354:FUNCTION

.. rubric:: ``useEffect callback @ 1830``

.. code-block:: javascript

   useEffect callback @ 1830()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1830``—``1837`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77180:77347:FUNCTION

.. rubric:: ``returned callback @ 1832``

.. code-block:: javascript

   returned callback @ 1832()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1832``—``1836`` 行；所属函数 ``useEffect callback @ 1830``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77429:78364:FUNCTION

.. rubric:: ``useCallback callback @ 1839``

.. code-block:: javascript

   useCallback callback @ 1839(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1839``—``1858`` 行；所属函数 ``ChatPage``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``streamBatchRef.current?.flush``、``decorateMessages``、``Object.entries``、``mergeLiveMessageWithSnapshot``、``liveStreamMessageIdsRef.current.has``、``setMessages``、``setMessagesOrder``、``setHistoryAutoLoadReady``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78698:79539:FUNCTION

.. rubric:: ``useEffect callback @ 1863``

.. code-block:: javascript

   useEffect callback @ 1863()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1863``—``1876`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79117:79372:FUNCTION

.. rubric:: ``anonymous callback @ 1868``

.. code-block:: javascript

   anonymous callback @ 1868(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1868``—``1873`` 行；所属函数 ``useEffect callback @ 1863``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79160:79189:FUNCTION

.. rubric:: ``entries.some callback @ 1869``

.. code-block:: javascript

   entries.some callback @ 1869(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1869``—``1869`` 行；所属函数 ``anonymous callback @ 1868``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79236:79360:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1870``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1870(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1870``—``1872`` 行；所属函数 ``anonymous callback @ 1868``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79504:79532:FUNCTION

.. rubric:: ``returned callback @ 1875``

.. code-block:: javascript

   returned callback @ 1875()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1875``—``1875`` 行；所属函数 ``useEffect callback @ 1863``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79653:80304:FUNCTION

.. rubric:: ``useEffect callback @ 1878``

.. code-block:: javascript

   useEffect callback @ 1878()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1878``—``1892`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80121:80296:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1887``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1887(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1887``—``1891`` 行；所属函数 ``useEffect callback @ 1878``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80451:84291:FUNCTION

.. rubric:: ``useCallback callback @ 1895``

.. code-block:: javascript

   async useCallback callback @ 1895(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1895``—``1988`` 行；所属函数 ``ChatPage``。

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

**主要协作调用**：``cancelJump``、``streamBatchRef.current?.flush``、``newOrders.push``、``apiClient.get``、``decorateMessages``、``messagesOrderRef.current.indexOf``、``messagesOrderRef.current.slice``、``setMessagesOrder``、``toast.error``、``t``、``produce``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82975:84156:FUNCTION

.. rubric:: ``produce callback @ 1950``

.. code-block:: javascript

   produce callback @ 1950(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1950``—``1983`` 行；所属函数 ``useCallback callback @ 1895``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83642:83764:FUNCTION

.. rubric:: ``anonymous callback @ 1969``

.. code-block:: javascript

   anonymous callback @ 1969(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1969``—``1971`` 行；所属函数 ``produce callback @ 1950``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83847:83947:FUNCTION

.. rubric:: ``anonymous callback @ 1974``

.. code-block:: javascript

   anonymous callback @ 1974(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1974``—``1976`` 行；所属函数 ``produce callback @ 1950``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84023:84123:FUNCTION

.. rubric:: ``anonymous callback @ 1979``

.. code-block:: javascript

   anonymous callback @ 1979(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1979``—``1981`` 行；所属函数 ``produce callback @ 1950``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:84472:85558:FUNCTION

.. rubric:: ``useCallback callback @ 1994``

.. code-block:: javascript

   async useCallback callback @ 1994(msgId, result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1994``—``2013`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85741:87361:FUNCTION

.. rubric:: ``useCallback callback @ 2018``

.. code-block:: javascript

   async useCallback callback @ 2018(msgId, { closeDialog = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2018``—``2048`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``{ closeDialog = false }`` （默认值 ``{}``）
   调用方传入的 ``closeDialog = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setIsDeletingMessage``、``apiClient.delete``、``deleteMessageLocally``、``loadMessageSummaries``、``markRuntimeInspectorStale``、``setPendingDeleteMsgId``、``setShowDeleteConfirm``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87532:88863:FUNCTION

.. rubric:: ``useCallback callback @ 2053``

.. code-block:: javascript

   async useCallback callback @ 2053(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2053``—``2084`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:88996:90101:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded(isCurrent)

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2088``—``2114`` 行；所属函数 ``ChatPage``。

**参数**

``isCurrent`` （默认值 ``() => true``）
   调用方传入的 ``isCurrent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89009:89020:FUNCTION

.. rubric:: ``anonymous callback @ 2088``

.. code-block:: javascript

   anonymous callback @ 2088()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2088``—``2088`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89046:90090:FUNCTION

.. rubric:: ``setTimeout callback @ 2089``

.. code-block:: javascript

   setTimeout callback @ 2089()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2089``—``2113`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrent``、``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89640:89746:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2102``—``2104`` 行；所属函数 ``setTimeout callback @ 2089``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrent``、``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:89768:90078:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2105``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 2105(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2105``—``2112`` 行；所属函数 ``setTimeout callback @ 2089``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90118:92232:FUNCTION

.. rubric:: ``useEffect callback @ 2116``

.. code-block:: javascript

   useEffect callback @ 2116()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2116``—``2178`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90319:91373:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2123``—``2149`` 行；所属函数 ``useEffect callback @ 2116``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90696:91361:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2132``

.. code-block:: javascript

   requestAnimationFrame callback @ 2132()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2132``—``2148`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91473:91653:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2153``—``2157`` 行；所属函数 ``useEffect callback @ 2116``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91810:91924:FUNCTION

.. rubric:: ``anonymous callback @ 2162``

.. code-block:: javascript

   anonymous callback @ 2162()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2162``—``2165`` 行；所属函数 ``useEffect callback @ 2116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92030:92225:FUNCTION

.. rubric:: ``returned callback @ 2171``

.. code-block:: javascript

   returned callback @ 2171()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2171``—``2177`` 行；所属函数 ``useEffect callback @ 2116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92480:95834:FUNCTION

.. rubric:: ``useEffect callback @ 2188``

.. code-block:: javascript

   useEffect callback @ 2188()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2188``—``2274`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92714:92822:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2195``—``2197`` 行；所属函数 ``useEffect callback @ 2188``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92852:93172:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2199``—``2207`` 行；所属函数 ``useEffect callback @ 2188``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93207:93298:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2209``—``2211`` 行；所属函数 ``useEffect callback @ 2188``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93332:93977:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2213``—``2230`` 行；所属函数 ``useEffect callback @ 2188``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94008:95183:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2232``—``2261`` 行；所属函数 ``useEffect callback @ 2188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95529:95827:FUNCTION

.. rubric:: ``returned callback @ 2268``

.. code-block:: javascript

   returned callback @ 2268()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2268``—``2273`` 行；所属函数 ``useEffect callback @ 2188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96029:96494:FUNCTION

.. rubric:: ``useEffect callback @ 2282``

.. code-block:: javascript

   useEffect callback @ 2282()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2282``—``2295`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96176:96476:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2284``

.. code-block:: javascript

   requestAnimationFrame callback @ 2284()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2284``—``2293`` 行；所属函数 ``useEffect callback @ 2282``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96729:97185:FUNCTION

.. rubric:: ``useEffect callback @ 2305``

.. code-block:: javascript

   useEffect callback @ 2305()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2305``—``2316`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97221:97359:FUNCTION

.. rubric:: ``useEffect callback @ 2318``

.. code-block:: javascript

   useEffect callback @ 2318()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2318``—``2322`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97485:97728:FUNCTION

.. rubric:: ``useCallback callback @ 2324``

.. code-block:: javascript

   useCallback callback @ 2324()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2324``—``2331`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97874:97995:FUNCTION

.. rubric:: ``useCallback callback @ 2334``

.. code-block:: javascript

   useCallback callback @ 2334(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2334``—``2336`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98120:98363:FUNCTION

.. rubric:: ``useCallback callback @ 2340``

.. code-block:: javascript

   async useCallback callback @ 2340()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2340``—``2345`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98551:99642:FUNCTION

.. rubric:: ``useEffect callback @ 2353``

.. code-block:: javascript

   useEffect callback @ 2353()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2353``—``2380`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98858:98900:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2362``

.. code-block:: javascript

   messagesOrder.filter callback @ 2362(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2362``—``2362`` 行；所属函数 ``useEffect callback @ 2353``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99156:99525:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2367``

.. code-block:: javascript

   window.setTimeout callback @ 2367()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2367``—``2375`` 行；所属函数 ``useEffect callback @ 2353``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({ silent: true, append: true }).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99234:99513:FUNCTION

.. rubric:: ``loadMessageSummaries({ silent: true, append: true }).then callback @ 2368``

.. code-block:: javascript

   loadMessageSummaries({ silent: true, append: true }).then callback @ 2368(items)

处理 ``loadMessageSummaries({ silent: true, append: true }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2368``—``2374`` 行；所属函数 ``window.setTimeout callback @ 2367``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99547:99635:FUNCTION

.. rubric:: ``returned callback @ 2376``

.. code-block:: javascript

   returned callback @ 2376()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2376``—``2379`` 行；所属函数 ``useEffect callback @ 2353``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99846:100354:FUNCTION

.. rubric:: ``useEffect callback @ 2389``

.. code-block:: javascript

   useEffect callback @ 2389()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2389``—``2401`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99956:100013:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2392``—``2392`` 行；所属函数 ``useEffect callback @ 2389``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100234:100347:FUNCTION

.. rubric:: ``returned callback @ 2397``

.. code-block:: javascript

   returned callback @ 2397()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2397``—``2400`` 行；所属函数 ``useEffect callback @ 2389``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100388:102448:FUNCTION

.. rubric:: ``useEffect callback @ 2403``

.. code-block:: javascript

   useEffect callback @ 2403()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2403``—``2447`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100558:101945:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2408``—``2436`` 行；所属函数 ``useEffect callback @ 2403``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100676:101933:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2410``

.. code-block:: javascript

   requestAnimationFrame callback @ 2410()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2410``—``2435`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map((element) => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101431:101482:FUNCTION

.. rubric:: ``elements .map callback @ 2424``

.. code-block:: javascript

   elements .map callback @ 2424(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2424``—``2424`` 行；所属函数 ``requestAnimationFrame callback @ 2410``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101514:101565:FUNCTION

.. rubric:: ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2425``

.. code-block:: javascript

   elements .map((element) => element.closest?.('[data-message-id]')) .find callback @ 2425(element)

作为 ``elements .map((element) => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2425``—``2425`` 行；所属函数 ``requestAnimationFrame callback @ 2410``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:101843:101899:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2433``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2433(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2433``—``2433`` 行；所属函数 ``requestAnimationFrame callback @ 2410``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102242:102441:FUNCTION

.. rubric:: ``returned callback @ 2442``

.. code-block:: javascript

   returned callback @ 2442()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2442``—``2446`` 行；所属函数 ``useEffect callback @ 2403``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102483:137388:FUNCTION

.. rubric:: ``useEffect callback @ 2449``

.. code-block:: javascript

   useEffect callback @ 2449()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2449``—``3115`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102570:102596:FUNCTION

.. rubric:: ``getMessages``

.. code-block:: javascript

   getMessages()

读取与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2451``—``2451`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102617:102981:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next, messageIds)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2452``—``2459`` 行；所属函数 ``useEffect callback @ 2449``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103153:103270:FUNCTION

.. rubric:: ``appendIsCurrent``

.. code-block:: javascript

   appendIsCurrent()

追加与 ``Is Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2464``—``2465`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103383:103778:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2468``—``2474`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{messages: messagesRef.current, order: messagesOrderRef.current, liveMessageIds: liveStreamMessageIdsRef.current, ready: isMessageLoadedRef.current && lastHydratedConversationIdRe…``。

**主要协作调用**：``streamBatch.flush``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103797:103990:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load(afterId)

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2475``—``2477`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

``afterId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104010:104456:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply({messages: nextMessages, order})

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2478``—``2486`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

``{messages: nextMessages, order}``
   调用方传入的 ``messages: nextMessages, order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``decorateMessages``、``setMessages``、``setMessagesOrder``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104479:104521:FUNCTION

.. rubric:: ``complete``

.. code-block:: javascript

   complete()

实现 ``complete`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2487``—``2487`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104544:104580:FUNCTION

.. rubric:: ``mismatch``

.. code-block:: javascript

   mismatch()

实现 ``mismatch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2488``—``2488`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRandomMark``、``generateUUID``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104600:104833:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error()

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2489``—``2493`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toast.warning``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104725:104816:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2490``—``2492`` 行；所属函数 ``error``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``appendIsCurrent``、``appendSync.request``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105980:136193:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523({ event, payload, reply, eventRunId, eventTurnId })

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2523``—``3085`` 行；所属函数 ``useEffect callback @ 2449``。

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

**内部回调数量**：17。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:109605:109636:FUNCTION

.. rubric:: ``submitMessageDeletion(msgId).then callback @ 2596``

.. code-block:: javascript

   submitMessageDeletion(msgId).then callback @ 2596(success)

处理 ``submitMessageDeletion(msgId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2596``—``2596`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113121:113267:FUNCTION

.. rubric:: ``anonymous callback @ 2660``

.. code-block:: javascript

   anonymous callback @ 2660(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2660``—``2662`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113327:113451:FUNCTION

.. rubric:: ``anonymous callback @ 2664``

.. code-block:: javascript

   anonymous callback @ 2664(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2664``—``2666`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113504:113628:FUNCTION

.. rubric:: ``anonymous callback @ 2668``

.. code-block:: javascript

   anonymous callback @ 2668(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2668``—``2670`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114851:115176:FUNCTION

.. rubric:: ``produce callback @ 2696``

.. code-block:: javascript

   produce callback @ 2696(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2696``—``2701`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116497:116830:FUNCTION

.. rubric:: ``produce callback @ 2724``

.. code-block:: javascript

   produce callback @ 2724(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2724``—``2730`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117664:118024:FUNCTION

.. rubric:: ``produce callback @ 2744``

.. code-block:: javascript

   produce callback @ 2744(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2744``—``2750`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119091:119403:FUNCTION

.. rubric:: ``produce callback @ 2770``

.. code-block:: javascript

   produce callback @ 2770(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2770``—``2775`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119986:120689:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2786``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2786()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value, }, conversation Id: conversation Id, loc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2786``—``2798`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120079:120657:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2787``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2787()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2787``—``2797`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value, }, conversationId: conversationId, loc… callback @ 2786``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121316:121844:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2813``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2813()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message, }, conversation Id: conversation I…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2813``—``2824`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121407:121820:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2814``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2814()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2814``—``2823`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage, }, conversationId: conversationI… callback @ 2813``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122788:123854:FUNCTION

.. rubric:: ``produce callback @ 2841``

.. code-block:: javascript

   produce callback @ 2841(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2841``—``2858`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124805:125162:FUNCTION

.. rubric:: ``setMessageSummaries callback @ 2878``

.. code-block:: javascript

   setMessageSummaries callback @ 2878(previous)

设置与 ``Message Summaries`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2878``—``2884`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124869:125041:FUNCTION

.. rubric:: ``previous.map callback @ 2879``

.. code-block:: javascript

   previous.map callback @ 2879(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2879``—``2881`` 行；所属函数 ``setMessageSummaries callback @ 2878``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:125234:126839:FUNCTION

.. rubric:: ``produce callback @ 2886``

.. code-block:: javascript

   produce callback @ 2886(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2886``—``2908`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeMessageContextState``、``preserveReplacementContextStatus``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:128604:128640:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2942``

.. code-block:: javascript

   window.setTimeout callback @ 2942()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2942``—``2942`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131055:131641:FUNCTION

.. rubric:: ``produce callback @ 2993``

.. code-block:: javascript

   produce callback @ 2993(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2993``—``3002`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``Array.isArray``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132371:132792:FUNCTION

.. rubric:: ``produce callback @ 3015``

.. code-block:: javascript

   produce callback @ 3015(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3015``—``3021`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133527:133949:FUNCTION

.. rubric:: ``produce callback @ 3037``

.. code-block:: javascript

   produce callback @ 3037(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3037``—``3043`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2523``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``removeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:136293:136628:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 3088``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 3088()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3088``—``3095`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTurnSubmission``、``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:136780:136883:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3100``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 3100({ event, payload, reply })

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3100``—``3102`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137093:137381:FUNCTION

.. rubric:: ``returned callback @ 3106``

.. code-block:: javascript

   returned callback @ 3106()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3106``—``3114`` 行；所属函数 ``useEffect callback @ 2449``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``appendSync.invalidate``、``streamBatch.flush``、``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138221:138306:FUNCTION

.. rubric:: ``useEffect callback @ 3145``

.. code-block:: javascript

   useEffect callback @ 3145()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3145``—``3149`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138243:138299:FUNCTION

.. rubric:: ``returned callback @ 3146``

.. code-block:: javascript

   returned callback @ 3146()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3146``—``3148`` 行；所属函数 ``useEffect callback @ 3145``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138346:138421:FUNCTION

.. rubric:: ``useEffect callback @ 3151``

.. code-block:: javascript

   useEffect callback @ 3151()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3151``—``3153`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138462:140973:FUNCTION

.. rubric:: ``useEffect callback @ 3155``

.. code-block:: javascript

   useEffect callback @ 3155()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3155``—``3207`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setTurnSubmission``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:140850:140911:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 3202``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 3202(_, id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3202``—``3204`` 行；所属函数 ``useEffect callback @ 3155``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141051:141650:FUNCTION

.. rubric:: ``useEffect callback @ 3209``

.. code-block:: javascript

   useEffect callback @ 3209()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3209``—``3224`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141276:141440:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 3214``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 3214(items)

处理 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3214``—``3217`` 行；所属函数 ``useEffect callback @ 3209``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141461:141578:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 3218``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 3218()

实现 ``apiClient .get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3218``—``3220`` 行；所属函数 ``useEffect callback @ 3209``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141595:141643:FUNCTION

.. rubric:: ``returned callback @ 3221``

.. code-block:: javascript

   returned callback @ 3221()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3221``—``3223`` 行；所属函数 ``useEffect callback @ 3209``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141716:143981:FUNCTION

.. rubric:: ``useCallback callback @ 3227``

.. code-block:: javascript

   async useCallback callback @ 3227({ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3227``—``3266`` 行；所属函数 ``ChatPage``。

**参数**

``{ preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true }`` （默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null, signal, isCurrent = () => true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``normalizedModels``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``isCurrent``、``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141798:141809:FUNCTION

.. rubric:: ``anonymous callback @ 3227``

.. code-block:: javascript

   anonymous callback @ 3227()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3227``—``3227`` 行；所属函数 ``useCallback callback @ 3227``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:143358:143394:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 3253``

.. code-block:: javascript

   normalizedModels.find callback @ 3253(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3253``—``3253`` 行；所属函数 ``useCallback callback @ 3227``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144034:144243:FUNCTION

.. rubric:: ``useEffect callback @ 3270``

.. code-block:: javascript

   useEffect callback @ 3270()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3270``—``3274`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144639:144935:FUNCTION

.. rubric:: ``useEffect callback @ 3280``

.. code-block:: javascript

   useEffect callback @ 3280()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3280``—``3285`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145037:153444:FUNCTION

.. rubric:: ``useEffect callback @ 3287``

.. code-block:: javascript

   useEffect callback @ 3287()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3287``—``3466`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145452:145539:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3296``—``3296`` 行；所属函数 ``useEffect callback @ 3287``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:145644:146922:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3299``—``3325`` 行；所属函数 ``useEffect callback @ 3287``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``getOptionWriter(conversationId).apply``、``getOptionWriter``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146312:146344:FUNCTION

.. rubric:: ``modelsData.find callback @ 3312``

.. code-block:: javascript

   modelsData.find callback @ 3312(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3312``—``3312`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:146953:147698:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3326``—``3341`` 行；所属函数 ``useEffect callback @ 3287``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``loadAvailableModels``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147430:147476:FUNCTION

.. rubric:: ``modelsData.find callback @ 3337``

.. code-block:: javascript

   modelsData.find callback @ 3337(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3337``—``3337`` 行；所属函数 ``requestModels``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147731:152372:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3342``—``3436`` 行；所属函数 ``useEffect callback @ 3287``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrent``、``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``streamBatchRef.current?.flush``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149981:150887:FUNCTION

.. rubric:: ``setTimeout callback @ 3384``

.. code-block:: javascript

   setTimeout callback @ 3384()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3384``—``3401`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150066:150863:FUNCTION

.. rubric:: ``setTimeout callback @ 3386``

.. code-block:: javascript

   setTimeout callback @ 3386()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3386``—``3400`` 行；所属函数 ``setTimeout callback @ 3384``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:151280:151472:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3409``—``3413`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:151749:152341:FUNCTION

.. rubric:: ``setTimeout callback @ 3422``

.. code-block:: javascript

   setTimeout callback @ 3422()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3422``—``3434`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:152398:153140:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3437``—``3455`` 行；所属函数 ``useEffect callback @ 3287``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``setIsLoading``、``performance.now``、``Promise.all``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:153412:153437:FUNCTION

.. rubric:: ``returned callback @ 3465``

.. code-block:: javascript

   returned callback @ 3465()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3465``—``3465`` 行；所属函数 ``useEffect callback @ 3287``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:153750:153931:FUNCTION

.. rubric:: ``useCallback callback @ 3479``

.. code-block:: javascript

   async useCallback callback @ 3479()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3479``—``3482`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154001:154335:FUNCTION

.. rubric:: ``useCallback callback @ 3483``

.. code-block:: javascript

   async useCallback callback @ 3483()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3483``—``3491`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``setRemoteSettingsPanel``、``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154312:154327:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 3490``

.. code-block:: javascript

   setIsSidebarOpen callback @ 3490(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3490``—``3490`` 行；所属函数 ``useCallback callback @ 3483``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:154423:154881:FUNCTION

.. rubric:: ``useCallback callback @ 3492``

.. code-block:: javascript

   async useCallback callback @ 3492()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``3492``—``3504`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleSidebarClose``、``setRemoteSettingsPanel``、``encodeURIComponent``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155006:155096:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 3508``

.. code-block:: javascript

   useBrowserBackLayer callback @ 3508()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3508``—``3511`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSidebarClose``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155247:156369:FUNCTION

.. rubric:: ``useEffect callback @ 3517``

.. code-block:: javascript

   useEffect callback @ 3517()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3517``—``3537`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; if (!opened && selfMessageFocusRef.current === key) selfMessageFocusRef.current = null; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``new URLSearchParams(routeLocation.search).get``、``(async () => { if (remoteSettingsPanelRef.current && !(await remoteSettingsPanelRef.current.canClose())) return; if (ca…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:155653:156195:FUNCTION

.. rubric:: ``anonymous callback @ 3524``

.. code-block:: javascript

   async anonymous callback @ 3524()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``3524``—``3532`` 行；所属函数 ``useEffect callback @ 3517``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``remoteSettingsPanelRef.current.canClose``、``encodeURIComponent``、``setRemoteSettingsPanel``、``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156214:156362:FUNCTION

.. rubric:: ``returned callback @ 3533``

.. code-block:: javascript

   returned callback @ 3533()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3533``—``3536`` 行；所属函数 ``useEffect callback @ 3517``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:156445:156761:FUNCTION

.. rubric:: ``useEffect callback @ 3538``

.. code-block:: javascript

   useEffect callback @ 3538()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3538``—``3544`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``new URLSearchParams(window.location.search).get``、``jumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:162763:162796:FUNCTION

.. rubric:: ``onClose callback @ 3650``

.. code-block:: javascript

   onClose callback @ 3650()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3650``—``3650`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167128:167158:FUNCTION

.. rubric:: ``onStop callback @ 3715``

.. code-block:: javascript

   onStop callback @ 3715()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3715``—``3715`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167204:167231:FUNCTION

.. rubric:: ``onPrevious callback @ 3716``

.. code-block:: javascript

   onPrevious callback @ 3716()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3716``—``3716`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:167273:167299:FUNCTION

.. rubric:: ``onNext callback @ 3717``

.. code-block:: javascript

   onNext callback @ 3717()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3717``—``3717`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:169823:170007:FUNCTION

.. rubric:: ``onClick callback @ 3757``

.. code-block:: javascript

   onClick callback @ 3757()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3757``—``3760`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174695:175289:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3830``

.. code-block:: javascript

   onWorkspaceChange callback @ 3830(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3830``—``3838`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:174889:175178:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3832``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3832(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3832``—``3836`` 行；所属函数 ``onWorkspaceChange callback @ 3830``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179165:179367:FUNCTION

.. rubric:: ``anonymous callback @ 3910``

.. code-block:: javascript

   anonymous callback @ 3910()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3910``—``3913`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarHistoryOpen``、``openIndependentChat``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179593:179737:FUNCTION

.. rubric:: ``onToggleAvatarScene callback @ 3919``

.. code-block:: javascript

   onToggleAvatarScene callback @ 3919()

处理 ``Toggle Avatar Scene`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3919``—``3922`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAvatarScene``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:179975:180111:FUNCTION

.. rubric:: ``onEnd callback @ 3925``

.. code-block:: javascript

   onEnd callback @ 3925()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3925``—``3928`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeAvatarScene``、``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180149:180187:FUNCTION

.. rubric:: ``onMinimize callback @ 3929``

.. code-block:: javascript

   onMinimize callback @ 3929()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3929``—``3929`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:180224:180374:FUNCTION

.. rubric:: ``onRestore callback @ 3930``

.. code-block:: javascript

   onRestore callback @ 3930()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3930``—``3933`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarExpanded``、``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181418:184931:FUNCTION

.. rubric:: ``onSettingChange callback @ 3949``

.. code-block:: javascript

   onSettingChange callback @ 3949(values, change)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3949``—``3997`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:181664:181907:FUNCTION

.. rubric:: ``Object.entries(values).filter callback @ 3953``

.. code-block:: javascript

   Object.entries(values).filter callback @ 3953([key, value])

作为 ``Object.entries(values).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3953``—``3955`` 行；所属函数 ``onSettingChange callback @ 3949``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182389:182463:FUNCTION

.. rubric:: ``Object.entries(patch).filter callback @ 3961``

.. code-block:: javascript

   Object.entries(patch).filter callback @ 3961([key])

作为 ``Object.entries(patch).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3961``—``3961`` 行；所属函数 ``onSettingChange callback @ 3949``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['avatarModelId', 'workspaceId', 'workspaceIds'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:182640:182677:FUNCTION

.. rubric:: ``Object.keys(allowed).some callback @ 3963``

.. code-block:: javascript

   Object.keys(allowed).some callback @ 3963(key)

作为 ``Object.keys(allowed).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3963``—``3963`` 行；所属函数 ``onSettingChange callback @ 3949``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``key.startsWith``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183325:183333:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch callback @ 3974``

.. code-block:: javascript

   avatarSelectionQueue.current .catch callback @ 3974()

处理 ``avatarSelectionQueue.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``3974``—``3974`` 行；所属函数 ``onSettingChange callback @ 3949``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:183377:184089:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 3975``

.. code-block:: javascript

   async avatarSelectionQueue.current .catch(() => {}) .then callback @ 3975()

处理 ``avatarSelectionQueue.current .catch(() => {}) .then callback`` 对应的事件或订阅结果。

**性质**：异步局部函数；源码第 ``3975``—``3984`` 行；所属函数 ``onSettingChange callback @ 3949``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(result.message || '角色模型保存失败')``。

**主要协作调用**：``emitEvent``、``setAvatarModelRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184023:184049:FUNCTION

.. rubric:: ``setAvatarModelRevision callback @ 3983``

.. code-block:: javascript

   setAvatarModelRevision callback @ 3983(revision)

设置与 ``Avatar Model Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3983``—``3983`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then callback @ 3975``。

**参数**

``revision``
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184134:184751:FUNCTION

.. rubric:: ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 3985``

.. code-block:: javascript

   avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 3985(error)

实现 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3985``—``3993`` 行；所属函数 ``onSettingChange callback @ 3949``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``setAdvancedSettingsValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:184397:184665:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3988``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3988(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3988``—``3991`` 行；所属函数 ``avatarSelectionQueue.current .catch(() => {}) .then(async () => { const result = await emitEvent({ event: 'avatar.scene… callback @ 3985``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:185867:185990:FUNCTION

.. rubric:: ``onClose callback @ 4022``

.. code-block:: javascript

   onClose callback @ 4022()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4022``—``4025`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:186492:186762:FUNCTION

.. rubric:: ``onOpenChange callback @ 4037``

.. code-block:: javascript

   onOpenChange callback @ 4037(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4037``—``4044`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:187058:187138:FUNCTION

.. rubric:: ``onConfirm callback @ 4050``

.. code-block:: javascript

   onConfirm callback @ 4050()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4050``—``4050`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``submitMessageDeletion``。
