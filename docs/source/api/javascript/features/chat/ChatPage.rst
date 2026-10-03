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
* **局部函数与匿名回调**：234

主要依赖
--------------------------------------------------------------------------------

``react``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``framer-motion``、``@/context/useEventStore.jsx``、``react-i18next``、``react-router-dom``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/RuntimeInspectorDialog.jsx``、``@/features/chat/page/hooks/useRuntimeInspector.js``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``@/features/execution``、``@/features/workspace/useWorkspaceTransferStore.js``、``./attachmentVision.js``、``./modelCapabilities.js``、``./widgets/WidgetPresentationContext.jsx``、``./voice/index.js``、``@/lib/browserHistoryLayers.js``、``@/features/chat/page/utils/messageSummaries.js``、``@/features/chat/page/utils/liveMessageReconcile.js``、``@/features/chat``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2698:2798:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``72`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2847:2988:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``74``—``77`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3033:3274:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``79``—``85`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3406:3556:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``92``—``95`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3581:3634:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``97``—``97`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3664:3819:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``99``—``102`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${baseEndpoint}/${encodeURIComponent(String(id))}\x60``。

   **主要协作调用**：``String(endpoint || '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3840:4010:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``104``—``110`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4034:4086:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``112``—``112`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4113:4211:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``114``—``117`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{text: String(data.text ?? '')}``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4235:4380:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``119``—``122`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4411:5055:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``146`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], {type: ASR_AUDIO_MIME_TYPE}) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], {type: ASR_AUDIO_MIME_TYPE}) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5087:5231:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``148``—``151`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5232:150639:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``154``—``3421`` 行。

   **参数**

   ``{ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…``
      调用方传入的 ``conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WidgetPresentationProvider chatBoxHostElement={widgetChatBoxHostElement} > <> <motion.div ref={windowRef} data-chat-layout-root="true" data-cwm-conversation-id={conversationId…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useLocation``、``useRef``、``generateUUID``、``useState``、``useImmer``、``useLocalSetting``、``useRuntimeInspector``、``useIsMobile``、``t``、``useEffect``、``useCallback``。

   **内部回调数量**：83。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3430:3555:FUNCTION

.. rubric:: ``anonymous callback @ 92``

.. code-block:: javascript

   anonymous callback @ 92(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``95`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10224:10262:FUNCTION

.. rubric:: ``useState callback @ 249``

.. code-block:: javascript

   useState callback @ 249()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``249``—``249`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10656:10719:FUNCTION

.. rubric:: ``useEffect callback @ 257``

.. code-block:: javascript

   useEffect callback @ 257()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``257``—``259`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10754:10962:FUNCTION

.. rubric:: ``useEffect callback @ 261``

.. code-block:: javascript

   useEffect callback @ 261()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``261``—``266`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10759:10962:FUNCTION

.. rubric:: ``anonymous callback @ 261``

.. code-block:: javascript

   anonymous callback @ 261()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``261``—``266`` 行；所属函数 ``useEffect callback @ 261``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11022:11973:FUNCTION

.. rubric:: ``useCallback callback @ 268``

.. code-block:: javascript

   useCallback callback @ 268(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``268``—``287`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status || '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11630:11948:FUNCTION

.. rubric:: ``setTimeout callback @ 278``

.. code-block:: javascript

   setTimeout callback @ 278()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``278``—``285`` 行；所属函数 ``useCallback callback @ 268``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11680:11869:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 279``

.. code-block:: javascript

   setContextCompactionState callback @ 279(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``279``—``283`` 行；所属函数 ``setTimeout callback @ 278``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13356:14047:FUNCTION

.. rubric:: ``useCallback callback @ 335``

.. code-block:: javascript

   useCallback callback @ 335(messageIds, runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``335``—``347`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``runId``（默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``normalizedIds.forEach``、``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13491:13528:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 337``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 337(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``337``—``337`` 行；所属函数 ``useCallback callback @ 335``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13634:13695:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 341``

.. code-block:: javascript

   normalizedIds.forEach callback @ 341(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``341``—``341`` 行；所属函数 ``useCallback callback @ 335``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``liveStreamMessageIdsRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13922:13963:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 345``

.. code-block:: javascript

   normalizedIds.forEach callback @ 345(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``345``—``345`` 行；所属函数 ``useCallback callback @ 335``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runMessages.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14098:14692:FUNCTION

.. rubric:: ``useCallback callback @ 349``

.. code-block:: javascript

   useCallback callback @ 349(runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``349``—``360`` 行；所属函数 ``ChatPage``。

**参数**

``runId``（默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.delete``、``runMessages.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14427:14684:FUNCTION

.. rubric:: ``runMessages.forEach callback @ 355``

.. code-block:: javascript

   runMessages.forEach callback @ 355(messageId)

作为 ``runMessages.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``355``—``359`` 行；所属函数 ``useCallback callback @ 349``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(liveStreamRunMessagesRef.current.values()) .some``、``Array.from``、``liveStreamRunMessagesRef.current.values``、``liveStreamMessageIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14551:14592:FUNCTION

.. rubric:: ``Array.from(liveStreamRunMessagesRef.current.values()) .some callback @ 357``

.. code-block:: javascript

   Array.from(liveStreamRunMessagesRef.current.values()) .some callback @ 357(messageIds)

作为 ``Array.from(liveStreamRunMessagesRef.current.values()) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``runMessages.forEach callback @ 355``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messageIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14752:15830:FUNCTION

.. rubric:: ``useCallback callback @ 362``

.. code-block:: javascript

   useCallback callback @ 362(messageIds)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``362``—``385`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``restoreMissingStreamTail``、``nextOrder.every``、``setMessagesOrder``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15170:15207:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 369``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 369(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``369``—``369`` 行；所属函数 ``useCallback callback @ 362``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15654:15721:FUNCTION

.. rubric:: ``nextOrder.every callback @ 380``

.. code-block:: javascript

   nextOrder.every callback @ 380(messageId, index)

作为 ``nextOrder.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``useCallback callback @ 362``。

**参数**

``messageId``
   Message 的公共 UUID。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15879:16587:FUNCTION

.. rubric:: ``useCallback callback @ 387``

.. code-block:: javascript

   useCallback callback @ 387(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``387``—``402`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages``（默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15927:16586:FUNCTION

.. rubric:: ``produce callback @ 387``

.. code-block:: javascript

   produce callback @ 387(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``387``—``402`` 行；所属函数 ``useCallback callback @ 387``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft || {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15982:16578:FUNCTION

.. rubric:: ``Object.keys(draft || {}).forEach callback @ 388``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 388(key)

作为 ``Object.keys(draft || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``401`` 行；所属函数 ``produce callback @ 387``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16252:16358:FUNCTION

.. rubric:: ``anonymous callback @ 394``

.. code-block:: javascript

   anonymous callback @ 394(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``394``—``396`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 388``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16402:16486:FUNCTION

.. rubric:: ``anonymous callback @ 397``

.. code-block:: javascript

   anonymous callback @ 397(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``397``—``399`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 388``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16523:16567:FUNCTION

.. rubric:: ``anonymous callback @ 400``

.. code-block:: javascript

   anonymous callback @ 400(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``400``—``400`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 388``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16640:19103:FUNCTION

.. rubric:: ``useCallback callback @ 404``

.. code-block:: javascript

   async useCallback callback @ 404({silent = false, append = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``404``—``464`` 行；所属函数 ``ChatPage``。

**参数**

``{silent = false, append = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19216:19654:FUNCTION

.. rubric:: ``useCallback callback @ 468``

.. code-block:: javascript

   useCallback callback @ 468(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``468``—``480`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19438:19622:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 472``

.. code-block:: javascript

   requestAnimationFrame callback @ 472()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``472``—``477`` 行；所属函数 ``useCallback callback @ 468``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19709:19890:FUNCTION

.. rubric:: ``useCallback callback @ 481``

.. code-block:: javascript

   useCallback callback @ 481(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``481``—``488`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19955:20217:FUNCTION

.. rubric:: ``useCallback callback @ 489``

.. code-block:: javascript

   useCallback callback @ 489(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``489``—``497`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20282:20371:FUNCTION

.. rubric:: ``useCallback callback @ 498``

.. code-block:: javascript

   useCallback callback @ 498(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``498``—``502`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20814:20962:FUNCTION

.. rubric:: ``useCallback callback @ 519``

.. code-block:: javascript

   useCallback callback @ 519()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``519``—``523`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine( getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote') )``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21029:21308:FUNCTION

.. rubric:: ``useCallback callback @ 525``

.. code-block:: javascript

   useCallback callback @ 525()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``525``—``530`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage) )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21383:22474:FUNCTION

.. rubric:: ``useCallback callback @ 532``

.. code-block:: javascript

   useCallback callback @ 532({cancel = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``532``—``565`` 行；所属函数 ``ChatPage``。

**参数**

``{cancel = false}``（默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({text: '', error: null})``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \x60${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21697:22466:FUNCTION

.. rubric:: ``anonymous callback @ 541``

.. code-block:: javascript

   anonymous callback @ 541(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``541``—``564`` 行；所属函数 ``useCallback callback @ 532``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21771:22072:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``543``—``549`` 行；所属函数 ``anonymous callback @ 541``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\x60${session.finalTranscript} ${session.interimTranscript}\x60.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22536:24360:FUNCTION

.. rubric:: ``useCallback callback @ 567``

.. code-block:: javascript

   useCallback callback @ 567()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``567``—``622`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23289:23903:FUNCTION

.. rubric:: ``anonymous callback @ 589``

.. code-block:: javascript

   anonymous callback @ 589(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``589``—``604`` 行；所属函数 ``useCallback callback @ 567``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${session.finalTranscript} ${transcript}\x60.trim``、``\x60${interimTranscript} ${transcript}\x60.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23935:24009:FUNCTION

.. rubric:: ``anonymous callback @ 606``

.. code-block:: javascript

   anonymous callback @ 606(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``606``—``608`` 行；所属函数 ``useCallback callback @ 567``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24039:24048:FUNCTION

.. rubric:: ``anonymous callback @ 610``

.. code-block:: javascript

   anonymous callback @ 610()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``610``—``610`` 行；所属函数 ``useCallback callback @ 567``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24485:25017:FUNCTION

.. rubric:: ``useCallback callback @ 624``

.. code-block:: javascript

   useCallback callback @ 624()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``624``—``640`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{engine: 'remote'}``、``{engine: 'remote', fallback: true}``、``{engine: 'local'}``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:25138:27864:FUNCTION

.. rubric:: ``useCallback callback @ 642``

.. code-block:: javascript

   async useCallback callback @ 642(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``642``—``719`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27917:28700:FUNCTION

.. rubric:: ``useCallback callback @ 721``

.. code-block:: javascript

   async useCallback callback @ 721(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``721``—``743`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{text}``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28851:28978:FUNCTION

.. rubric:: ``useCallback callback @ 745``

.. code-block:: javascript

   useCallback callback @ 745()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``745``—``748`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29494:29611:FUNCTION

.. rubric:: ``useCallback callback @ 764``

.. code-block:: javascript

   useCallback callback @ 764()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``764``—``766`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29666:29777:FUNCTION

.. rubric:: ``useCallback callback @ 768``

.. code-block:: javascript

   useCallback callback @ 768(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``768``—``770`` 行；所属函数 ``ChatPage``。

**参数**

``duration``（默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29833:30235:FUNCTION

.. rubric:: ``useCallback callback @ 773``

.. code-block:: javascript

   useCallback callback @ 773()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``773``—``782`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30361:30604:FUNCTION

.. rubric:: ``useCallback callback @ 784``

.. code-block:: javascript

   useCallback callback @ 784()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``784``—``790`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30843:32343:FUNCTION

.. rubric:: ``useCallback callback @ 794``

.. code-block:: javascript

   useCallback callback @ 794(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``794``—``836`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll``（默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30995:31953:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``797``—``821`` 行；所属函数 ``useCallback callback @ 794``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31985:32208:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``823``—``829`` 行；所属函数 ``useCallback callback @ 794``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32028:32196:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 824``

.. code-block:: javascript

   requestAnimationFrame callback @ 824()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``824``—``828`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32663:33052:FUNCTION

.. rubric:: ``useCallback callback @ 847``

.. code-block:: javascript

   useCallback callback @ 847()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``847``—``857`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34754:34900:FUNCTION

.. rubric:: ``useEffect callback @ 912``

.. code-block:: javascript

   useEffect callback @ 912()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``912``—``915`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35212:35256:FUNCTION

.. rubric:: ``useEffect callback @ 920``

.. code-block:: javascript

   useEffect callback @ 920()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``920``—``922`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35329:35832:FUNCTION

.. rubric:: ``useCallback callback @ 924``

.. code-block:: javascript

   async useCallback callback @ 924()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``924``—``938`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35888:36470:FUNCTION

.. rubric:: ``useCallback callback @ 940``

.. code-block:: javascript

   async useCallback callback @ 940(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``940``—``953`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36531:37486:FUNCTION

.. rubric:: ``useCallback callback @ 955``

.. code-block:: javascript

   async useCallback callback @ 955(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``955``—``974`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36941:37046:FUNCTION

.. rubric:: ``setStories callback @ 965``

.. code-block:: javascript

   setStories callback @ 965(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``965``—``965`` 行；所属函数 ``useCallback callback @ 955``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36964:37045:FUNCTION

.. rubric:: ``current.map callback @ 965``

.. code-block:: javascript

   current.map callback @ 965(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``965``—``965`` 行；所属函数 ``setStories callback @ 965``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37080:37174:FUNCTION

.. rubric:: ``setActiveStory callback @ 966``

.. code-block:: javascript

   setActiveStory callback @ 966(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``966``—``966`` 行；所属函数 ``useCallback callback @ 955``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37547:38411:FUNCTION

.. rubric:: ``useCallback callback @ 976``

.. code-block:: javascript

   async useCallback callback @ 976(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``976``—``994`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37791:37866:FUNCTION

.. rubric:: ``setStories callback @ 980``

.. code-block:: javascript

   setStories callback @ 980(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``980``—``980`` 行；所属函数 ``useCallback callback @ 976``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37817:37865:FUNCTION

.. rubric:: ``current.filter callback @ 980``

.. code-block:: javascript

   current.filter callback @ 980(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``980``—``980`` 行；所属函数 ``setStories callback @ 980``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37896:38120:FUNCTION

.. rubric:: ``setActiveStory callback @ 981``

.. code-block:: javascript

   setActiveStory callback @ 981(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``981``—``987`` 行；所属函数 ``useCallback callback @ 976``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38475:38767:FUNCTION

.. rubric:: ``useCallback callback @ 996``

.. code-block:: javascript

   useCallback callback @ 996(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``996``—``1003`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \x60story:${story.storyId}:part:${part.partId}\x60, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38840:38887:FUNCTION

.. rubric:: ``useCallback callback @ 1005``

.. code-block:: javascript

   useCallback callback @ 1005()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1005``—``1007`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38927:39028:FUNCTION

.. rubric:: ``useEffect callback @ 1009``

.. code-block:: javascript

   useEffect callback @ 1009()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1009``—``1013`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39077:42161:FUNCTION

.. rubric:: ``useEffect callback @ 1015``

.. code-block:: javascript

   useEffect callback @ 1015()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1015``—``1087`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39252:42160:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019({event, payload})

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1019``—``1087`` 行；所属函数 ``useEffect callback @ 1015``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39543:39612:FUNCTION

.. rubric:: ``setStories callback @ 1027``

.. code-block:: javascript

   setStories callback @ 1027(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1027``—``1027`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39569:39611:FUNCTION

.. rubric:: ``current.filter callback @ 1027``

.. code-block:: javascript

   current.filter callback @ 1027(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1027``—``1027`` 行；所属函数 ``setStories callback @ 1027``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39642:39860:FUNCTION

.. rubric:: ``setActiveStory callback @ 1028``

.. code-block:: javascript

   setActiveStory callback @ 1028(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1028``—``1034`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40299:40736:FUNCTION

.. rubric:: ``loadStories().then callback @ 1048``

.. code-block:: javascript

   loadStories().then callback @ 1048(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1048``—``1058`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40342:40720:FUNCTION

.. rubric:: ``setActiveStory callback @ 1049``

.. code-block:: javascript

   setActiveStory callback @ 1049(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1049``—``1057`` 行；所属函数 ``loadStories().then callback @ 1048``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40462:40518:FUNCTION

.. rubric:: ``values.some callback @ 1051``

.. code-block:: javascript

   values.some callback @ 1051(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1051``—``1051`` 行；所属函数 ``setActiveStory callback @ 1049``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40769:41264:FUNCTION

.. rubric:: ``setStories callback @ 1061``

.. code-block:: javascript

   setStories callback @ 1061(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1061``—``1071`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40826:40888:FUNCTION

.. rubric:: ``current.findIndex callback @ 1062``

.. code-block:: javascript

   current.findIndex callback @ 1062(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1062``—``1062`` 行；所属函数 ``setStories callback @ 1061``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41290:42152:FUNCTION

.. rubric:: ``setActiveStory callback @ 1072``

.. code-block:: javascript

   setActiveStory callback @ 1072(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1072``—``1086`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1019``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort``、``existing.filter``、``(current.parts || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41798:41839:FUNCTION

.. rubric:: ``existing.filter callback @ 1080``

.. code-block:: javascript

   existing.filter callback @ 1080(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1080``—``1080`` 行；所属函数 ``setActiveStory callback @ 1072``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41880:41913:FUNCTION

.. rubric:: ``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback @ 1081``

.. code-block:: javascript

   [...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback @ 1081(a, b)

作为 ``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1081``—``1081`` 行；所属函数 ``setActiveStory callback @ 1072``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42040:42101:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1083``

.. code-block:: javascript

   (current.parts || []).map callback @ 1083(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1083``—``1083`` 行；所属函数 ``setActiveStory callback @ 1072``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42286:44196:FUNCTION

.. rubric:: ``useCallback callback @ 1092``

.. code-block:: javascript

   useCallback callback @ 1092(msgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1092``—``1153`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``toast.error``、``t``、``currentOrder.indexOf``、``Array.isArray``、``oldChildren.indexOf``、``oldChildren.filter``、``setMessages``、``loadSwitchMessage``、``currentOrder.slice``、``setMessagesOrder``、``scrollToBottomAfterRender``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43282:43310:FUNCTION

.. rubric:: ``oldChildren.filter callback @ 1121``

.. code-block:: javascript

   oldChildren.filter callback @ 1121(childId)

作为 ``oldChildren.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1121``—``1121`` 行；所属函数 ``useCallback callback @ 1092``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44423:45103:FUNCTION

.. rubric:: ``useCallback callback @ 1162``

.. code-block:: javascript

   async useCallback callback @ 1162(targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1162``—``1175`` 行；所属函数 ``ChatPage``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``workspaceIds``。

**主要协作调用**：``( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.…``、``Array.isArray``、``apiClient.put``、``encodeURIComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44778:44813:FUNCTION

.. rubric:: ``( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.… callback @ 1168``

.. code-block:: javascript

   ( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.… callback @ 1168(item)

实现 ``( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1168``—``1168`` 行；所属函数 ``useCallback callback @ 1162``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45175:49871:FUNCTION

.. rubric:: ``useCallback callback @ 1177``

.. code-block:: javascript

   useCallback callback @ 1177({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1177``—``1286`` 行；所属函数 ``ChatPage``。

**参数**

``{ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…``
   调用方传入的 ``messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((payload) => { if (payload.success) { // Mark this synchronous…``、``sendMessage(conversationId)``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``toast.error``、``t``、``normalizeAttachmentList``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p…``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then``、``emitEvent``、``sendMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45825:48206:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1199``—``1252`` 行；所属函数 ``useCallback callback @ 1177``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(); } else { toast.error(t("send_message_error", {message: pa…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47466:48194:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1237``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1237(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1237``—``1251`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...payload, conversationId, }``。

**主要协作调用**：``generateUUID``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48471:49556:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1260``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1260(payload)

处理 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1260``—``1278`` 行；所属函数 ``useCallback callback @ 1177``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``persistPendingWorkspaceSelection(payload.value) .then(() => sendMessage(payload.value))``。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection(payload.value) .then``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49397:49429:FUNCTION

.. rubric:: ``persistPendingWorkspaceSelection(payload.value) .then callback @ 1274``

.. code-block:: javascript

   persistPendingWorkspaceSelection(payload.value) .then callback @ 1274()

处理 ``persistPendingWorkspaceSelection(payload.value) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1274``—``1274`` 行；所属函数 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1260``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49581:49788:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p… callback @ 1279``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p… callback @ 1279(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current } }) .then((p…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1279``—``1282`` 行；所属函数 ``useCallback callback @ 1177``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{success: false, value: error?.message || String(error)}``。

**主要协作调用**：``toast.error``、``t``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50094:53161:FUNCTION

.. rubric:: ``useCallback callback @ 1288``

.. code-block:: javascript

   async useCallback callback @ 1288({toolsStatus = {}, composerStatus = 'normal'})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1288``—``1352`` 行；所属函数 ``ChatPage``。

**参数**

``{toolsStatus = {}, composerStatus = 'normal'}``（默认值 ``{}``）
   调用方传入的 ``toolsStatus = , composerStatus = 'normal'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**显式抛出**：``new Error(payload?.value || 'Unable to create conversation')``。

**主要协作调用**：``toast.error``、``t``、``setIsSidebarOpen``、``startForConversation``、``generateUUID``、``emitEvent``、``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51080:51560:FUNCTION

.. rubric:: ``startForConversation``

.. code-block:: javascript

   async startForConversation(targetConversationId)

启动与 ``For Conversation`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1309``—``1320`` 行；所属函数 ``useCallback callback @ 1288``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.start``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53377:56213:FUNCTION

.. rubric:: ``useCallback callback @ 1354``

.. code-block:: javascript

   async useCallback callback @ 1354()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1354``—``1419`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54036:55838:FUNCTION

.. rubric:: ``anonymous callback @ 1369``

.. code-block:: javascript

   async anonymous callback @ 1369()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1369``—``1408`` 行；所属函数 ``useCallback callback @ 1354``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54706:54744:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1382``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1382(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1382``—``1382`` 行；所属函数 ``anonymous callback @ 1369``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55273:55376:FUNCTION

.. rubric:: ``anonymous callback @ 1396``

.. code-block:: javascript

   anonymous callback @ 1396(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1396``—``1398`` 行；所属函数 ``anonymous callback @ 1369``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55324:55360:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1397``

.. code-block:: javascript

   requestAnimationFrame callback @ 1397()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1397``—``1397`` 行；所属函数 ``anonymous callback @ 1396``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55850:56130:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1408``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1408()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1408``—``1415`` 行；所属函数 ``useCallback callback @ 1354``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56430:57370:FUNCTION

.. rubric:: ``useEffect callback @ 1429``

.. code-block:: javascript

   useEffect callback @ 1429()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1429``—``1453`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56896:57155:FUNCTION

.. rubric:: ``anonymous callback @ 1440``

.. code-block:: javascript

   anonymous callback @ 1440(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1440``—``1445`` 行；所属函数 ``useEffect callback @ 1429``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56941:56970:FUNCTION

.. rubric:: ``entries.some callback @ 1441``

.. code-block:: javascript

   entries.some callback @ 1441(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1441``—``1441`` 行；所属函数 ``anonymous callback @ 1440``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57017:57143:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1442``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1442(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1442``—``1444`` 行；所属函数 ``anonymous callback @ 1440``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57335:57363:FUNCTION

.. rubric:: ``returned callback @ 1452``

.. code-block:: javascript

   returned callback @ 1452()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1452``—``1452`` 行；所属函数 ``useEffect callback @ 1429``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57497:58406:FUNCTION

.. rubric:: ``useCallback callback @ 1455``

.. code-block:: javascript

   useCallback callback @ 1455(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1455``—``1473`` 行；所属函数 ``ChatPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``behavior``（默认值 ``'smooth'``）
   调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``CSS.escape``、``String``、``container.querySelector``、``setShowScrollToBottomButton``、``setActiveVisibleMessageId``、``setHighlightedMessageId``、``element.scrollIntoView``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58258:58371:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1469``

.. code-block:: javascript

   window.setTimeout callback @ 1469()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1469``—``1471`` 行；所属函数 ``useCallback callback @ 1455``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58302:58359:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1470``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1470(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1470``—``1470`` 行；所属函数 ``window.setTimeout callback @ 1469``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58529:60385:FUNCTION

.. rubric:: ``useCallback callback @ 1475``

.. code-block:: javascript

   async useCallback callback @ 1475()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1475``—``1517`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:59912:60190:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1504``

.. code-block:: javascript

   requestAnimationFrame callback @ 1504()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1504``—``1511`` 行；所属函数 ``useCallback callback @ 1475``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:59958:60174:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1505``

.. code-block:: javascript

   requestAnimationFrame callback @ 1505()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1505``—``1510`` 行；所属函数 ``requestAnimationFrame callback @ 1504``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60643:60905:FUNCTION

.. rubric:: ``useEffect callback @ 1529``

.. code-block:: javascript

   useEffect callback @ 1529()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1529``—``1536`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60731:60898:FUNCTION

.. rubric:: ``returned callback @ 1531``

.. code-block:: javascript

   returned callback @ 1531()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1531``—``1535`` 行；所属函数 ``useEffect callback @ 1529``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60972:63898:FUNCTION

.. rubric:: ``useCallback callback @ 1538``

.. code-block:: javascript

   async useCallback callback @ 1538(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1538``—``1603`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61128:63111:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1543``—``1584`` 行；所属函数 ``useCallback callback @ 1538``。

**参数**

``summaryItems``
   调用方传入的 ``summaryItems`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``expectedOrderFingerprint``
   调用方传入的 ``expectedOrderFingerprint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error(t('jump_to_message_failed') || '跳转消息失败')``。

**主要协作调用**：``summaryItems.findIndex``、``t``、``Math.max``、``Math.min``、``summaryItems.slice(start, end).map``、``summaryItems.slice``、``apiClient.post``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``setHistoryAutoLoadReady``、``setShowScrollToBottomButton``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61237:61273:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1544``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1544(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1544``—``1544`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61636:61658:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1551``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1551(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1551``—``1551`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62820:62923:FUNCTION

.. rubric:: ``anonymous callback @ 1577``

.. code-block:: javascript

   anonymous callback @ 1577(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1577``—``1579`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62871:62907:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1578``

.. code-block:: javascript

   requestAnimationFrame callback @ 1578()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1578``—``1578`` 行；所属函数 ``anonymous callback @ 1577``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63223:63259:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1588``

.. code-block:: javascript

   summaryItems.some callback @ 1588(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1588``—``1588`` 行；所属函数 ``useCallback callback @ 1538``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64165:64816:FUNCTION

.. rubric:: ``useEffect callback @ 1615``

.. code-block:: javascript

   useEffect callback @ 1615()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1615``—``1629`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64633:64808:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1624``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1624(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1624``—``1628`` 行；所属函数 ``useEffect callback @ 1615``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64963:68257:FUNCTION

.. rubric:: ``useCallback callback @ 1631``

.. code-block:: javascript

   async useCallback callback @ 1631(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1631``—``1720`` 行；所属函数 ``ChatPage``。

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

**主要协作调用**：``newOrders.push``、``apiClient.get``、``decorateMessages``、``messagesOrderRef.current.indexOf``、``messagesOrderRef.current.slice``、``setMessagesOrder``、``toast.error``、``t``、``produce``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67065:68138:FUNCTION

.. rubric:: ``produce callback @ 1682``

.. code-block:: javascript

   produce callback @ 1682(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1682``—``1715`` 行；所属函数 ``useCallback callback @ 1631``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67672:67786:FUNCTION

.. rubric:: ``anonymous callback @ 1701``

.. code-block:: javascript

   anonymous callback @ 1701(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1701``—``1703`` 行；所属函数 ``produce callback @ 1682``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67861:67953:FUNCTION

.. rubric:: ``anonymous callback @ 1706``

.. code-block:: javascript

   anonymous callback @ 1706(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1706``—``1708`` 行；所属函数 ``produce callback @ 1682``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:68021:68113:FUNCTION

.. rubric:: ``anonymous callback @ 1711``

.. code-block:: javascript

   anonymous callback @ 1711(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1711``—``1713`` 行；所属函数 ``produce callback @ 1682``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:68351:69490:FUNCTION

.. rubric:: ``useCallback callback @ 1722``

.. code-block:: javascript

   async useCallback callback @ 1722(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1722``—``1751`` 行；所属函数 ``ChatPage``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``msgId``
   目标对象的公共或运行时标识。

``targetMessageOrDelta``
   调用方传入的 ``targetMessageOrDelta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``error``。

**主要协作调用**：``msg.messages.indexOf``、``emitEvent``、``t``、``loadSwitchMessage``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69586:70484:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded()

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1753``—``1774`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69614:70474:FUNCTION

.. rubric:: ``setTimeout callback @ 1754``

.. code-block:: javascript

   setTimeout callback @ 1754()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1754``—``1773`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70089:70174:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1763``—``1765`` 行；所属函数 ``setTimeout callback @ 1754``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70195:70462:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 1766``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 1766(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1766``—``1772`` 行；所属函数 ``setTimeout callback @ 1754``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70500:72515:FUNCTION

.. rubric:: ``useEffect callback @ 1776``

.. code-block:: javascript

   useEffect callback @ 1776()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1776``—``1836`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70701:71596:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1783``—``1805`` 行；所属函数 ``useEffect callback @ 1776``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71024:71584:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1791``

.. code-block:: javascript

   requestAnimationFrame callback @ 1791()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1791``—``1804`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71696:71876:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1809``—``1813`` 行；所属函数 ``useEffect callback @ 1776``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72033:72147:FUNCTION

.. rubric:: ``anonymous callback @ 1818``

.. code-block:: javascript

   anonymous callback @ 1818()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1818``—``1821`` 行；所属函数 ``useEffect callback @ 1776``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72313:72508:FUNCTION

.. rubric:: ``returned callback @ 1829``

.. code-block:: javascript

   returned callback @ 1829()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1829``—``1835`` 行；所属函数 ``useEffect callback @ 1776``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72763:76047:FUNCTION

.. rubric:: ``useEffect callback @ 1846``

.. code-block:: javascript

   useEffect callback @ 1846()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1846``—``1928`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72997:73105:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1853``—``1855`` 行；所属函数 ``useEffect callback @ 1846``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73135:73455:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1857``—``1865`` 行；所属函数 ``useEffect callback @ 1846``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73490:73581:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1867``—``1869`` 行；所属函数 ``useEffect callback @ 1846``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73615:74260:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1871``—``1888`` 行；所属函数 ``useEffect callback @ 1846``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74291:75404:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1890``—``1915`` 行；所属函数 ``useEffect callback @ 1846``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75742:76040:FUNCTION

.. rubric:: ``returned callback @ 1922``

.. code-block:: javascript

   returned callback @ 1922()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1922``—``1927`` 行；所属函数 ``useEffect callback @ 1846``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76242:76707:FUNCTION

.. rubric:: ``useEffect callback @ 1936``

.. code-block:: javascript

   useEffect callback @ 1936()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1936``—``1949`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76389:76689:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1938``

.. code-block:: javascript

   requestAnimationFrame callback @ 1938()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1938``—``1947`` 行；所属函数 ``useEffect callback @ 1936``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76943:77399:FUNCTION

.. rubric:: ``useEffect callback @ 1960``

.. code-block:: javascript

   useEffect callback @ 1960()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1960``—``1971`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77435:77571:FUNCTION

.. rubric:: ``useEffect callback @ 1973``

.. code-block:: javascript

   useEffect callback @ 1973()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1973``—``1977`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77697:77938:FUNCTION

.. rubric:: ``useCallback callback @ 1979``

.. code-block:: javascript

   useCallback callback @ 1979()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1979``—``1986`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78084:78186:FUNCTION

.. rubric:: ``useCallback callback @ 1988``

.. code-block:: javascript

   useCallback callback @ 1988(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1988``—``1990`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78297:78536:FUNCTION

.. rubric:: ``useCallback callback @ 1992``

.. code-block:: javascript

   async useCallback callback @ 1992()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1992``—``1997`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78724:79797:FUNCTION

.. rubric:: ``useEffect callback @ 2005``

.. code-block:: javascript

   useEffect callback @ 2005()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2005``—``2031`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79019:79059:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2013``

.. code-block:: javascript

   messagesOrder.filter callback @ 2013(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2013``—``2013`` 行；所属函数 ``useEffect callback @ 2005``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79315:79680:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2018``

.. code-block:: javascript

   window.setTimeout callback @ 2018()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2018``—``2026`` 行；所属函数 ``useEffect callback @ 2005``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({silent: true, append: true}).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79391:79668:FUNCTION

.. rubric:: ``loadMessageSummaries({silent: true, append: true}).then callback @ 2019``

.. code-block:: javascript

   loadMessageSummaries({silent: true, append: true}).then callback @ 2019(items)

处理 ``loadMessageSummaries({silent: true, append: true}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2019``—``2025`` 行；所属函数 ``window.setTimeout callback @ 2018``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79702:79790:FUNCTION

.. rubric:: ``returned callback @ 2027``

.. code-block:: javascript

   returned callback @ 2027()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2027``—``2030`` 行；所属函数 ``useEffect callback @ 2005``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80001:80509:FUNCTION

.. rubric:: ``useEffect callback @ 2040``

.. code-block:: javascript

   useEffect callback @ 2040()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2040``—``2052`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80111:80168:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2043``—``2043`` 行；所属函数 ``useEffect callback @ 2040``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80389:80502:FUNCTION

.. rubric:: ``returned callback @ 2048``

.. code-block:: javascript

   returned callback @ 2048()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2048``—``2051`` 行；所属函数 ``useEffect callback @ 2040``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80543:82593:FUNCTION

.. rubric:: ``useEffect callback @ 2054``

.. code-block:: javascript

   useEffect callback @ 2054()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2054``—``2098`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80713:82092:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2059``—``2087`` 行；所属函数 ``useEffect callback @ 2054``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80831:82080:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2061``

.. code-block:: javascript

   requestAnimationFrame callback @ 2061()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2061``—``2086`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map(element => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81586:81635:FUNCTION

.. rubric:: ``elements .map callback @ 2075``

.. code-block:: javascript

   elements .map callback @ 2075(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2075``—``2075`` 行；所属函数 ``requestAnimationFrame callback @ 2061``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81667:81716:FUNCTION

.. rubric:: ``elements .map(element => element.closest?.('[data-message-id]')) .find callback @ 2076``

.. code-block:: javascript

   elements .map(element => element.closest?.('[data-message-id]')) .find callback @ 2076(element)

作为 ``elements .map(element => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2076``—``2076`` 行；所属函数 ``requestAnimationFrame callback @ 2061``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81994:82046:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2084``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2084(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2084``—``2084`` 行；所属函数 ``requestAnimationFrame callback @ 2061``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82387:82586:FUNCTION

.. rubric:: ``returned callback @ 2093``

.. code-block:: javascript

   returned callback @ 2093()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2093``—``2097`` 行；所属函数 ``useEffect callback @ 2054``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82629:120180:FUNCTION

.. rubric:: ``useEffect callback @ 2101``

.. code-block:: javascript

   useEffect callback @ 2101()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2101``—``2771`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { unsubscribe1(); unsubscribe2(); unsubscribe3(); }``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ…``、``onEvent``、``onEvent({ event: 'transport.connected', }).then``、``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83600:119618:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127({event, payload, reply, eventRunId})

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2127``—``2753`` 行；所属函数 ``useEffect callback @ 2101``。

**参数**

``{event, payload, reply, eventRunId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``handleSpeakMessageRequest``、``cancelActiveSpeech``、``reply``、``pauseActiveSpeech``、``resumeActiveSpeech``、``updateSpeechRate``、``seekSpeechSegment``、``messagesOrderRef.current?.includes``、``toast.error``、``t``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()…``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then``。

**内部回调数量**：20。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85899:86013:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback @ 2172``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback @ 2172()

处理 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2172``—``2174`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86058:86229:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()… callback @ 2175``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()… callback @ 2175(error)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2175``—``2177`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90127:90281:FUNCTION

.. rubric:: ``anonymous callback @ 2245``

.. code-block:: javascript

   anonymous callback @ 2245(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2245``—``2247`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90345:90477:FUNCTION

.. rubric:: ``anonymous callback @ 2249``

.. code-block:: javascript

   anonymous callback @ 2249(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2249``—``2251`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90534:90666:FUNCTION

.. rubric:: ``anonymous callback @ 2253``

.. code-block:: javascript

   anonymous callback @ 2253(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2253``—``2255`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92209:92558:FUNCTION

.. rubric:: ``produce callback @ 2284``

.. code-block:: javascript

   produce callback @ 2284(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2284``—``2290`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93544:93926:FUNCTION

.. rubric:: ``produce callback @ 2306``

.. code-block:: javascript

   produce callback @ 2306(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2306``—``2312`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:94861:95527:FUNCTION

.. rubric:: ``produce callback @ 2327``

.. code-block:: javascript

   produce callback @ 2327(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2327``—``2337`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96511:97536:FUNCTION

.. rubric:: ``produce callback @ 2353``

.. code-block:: javascript

   produce callback @ 2353(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2353``—``2368`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99300:99655:FUNCTION

.. rubric:: ``produce callback @ 2396``

.. code-block:: javascript

   produce callback @ 2396(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2396``—``2402`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100539:100919:FUNCTION

.. rubric:: ``produce callback @ 2416``

.. code-block:: javascript

   produce callback @ 2416(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2416``—``2422`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102058:102388:FUNCTION

.. rubric:: ``produce callback @ 2442``

.. code-block:: javascript

   produce callback @ 2442(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2442``—``2447`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103014:103761:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2458``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2458()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value }, conversation Id: conversation Id, loca…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2458``—``2470`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103111:103725:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2459``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2459()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2459``—``2469`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2458``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104443:105013:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2485``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2485()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message }, conversation Id: conversation Id…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2485``—``2496`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104538:104985:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2486``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2486()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2486``—``2495`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2485``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105506:106638:FUNCTION

.. rubric:: ``produce callback @ 2503``

.. code-block:: javascript

   produce callback @ 2503(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2503``—``2520`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:107681:109751:FUNCTION

.. rubric:: ``produce callback @ 2540``

.. code-block:: javascript

   produce callback @ 2540(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2540``—``2570`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:110534:110570:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2585``

.. code-block:: javascript

   window.setTimeout callback @ 2585()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2585``—``2585`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113026:113575:FUNCTION

.. rubric:: ``produce callback @ 2632``

.. code-block:: javascript

   produce callback @ 2632(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2632``—``2641`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114351:114924:FUNCTION

.. rubric:: ``produce callback @ 2654``

.. code-block:: javascript

   produce callback @ 2654(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2654``—``2663`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115705:117719:FUNCTION

.. rubric:: ``produce callback @ 2679``

.. code-block:: javascript

   produce callback @ 2679(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2679``—``2710`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2127``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``toDeleteKeySet``、``Array.isArray``、``network.nodes.filter``、``normalizeNetworkData``、``network.relationships.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116556:116659:FUNCTION

.. rubric:: ``network.nodes.filter callback @ 2693``

.. code-block:: javascript

   network.nodes.filter callback @ 2693(node)

作为 ``network.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2693``—``2693`` 行；所属函数 ``produce callback @ 2679``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteNodeKeys.has``、``getNodeMergeKey``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117370:117478:FUNCTION

.. rubric:: ``network.relationships.filter callback @ 2704``

.. code-block:: javascript

   network.relationships.filter callback @ 2704(rel)

作为 ``network.relationships.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2704``—``2704`` 行；所属函数 ``produce callback @ 2679``。

**参数**

``rel``
   调用方传入的 ``rel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteRelKeys.has``、``getRelationshipMergeKey``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119718:119801:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 2756``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 2756()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2756``—``2758`` 行；所属函数 ``useEffect callback @ 2101``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119953:120054:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 2763``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 2763({event, payload, reply})

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2763``—``2765`` 行；所属函数 ``useEffect callback @ 2101``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120071:120173:FUNCTION

.. rubric:: ``returned callback @ 2766``

.. code-block:: javascript

   returned callback @ 2766()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2766``—``2770`` 行；所属函数 ``useEffect callback @ 2101``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120695:120780:FUNCTION

.. rubric:: ``useEffect callback @ 2773``

.. code-block:: javascript

   useEffect callback @ 2773()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2773``—``2777`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120717:120773:FUNCTION

.. rubric:: ``returned callback @ 2774``

.. code-block:: javascript

   returned callback @ 2774()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2774``—``2776`` 行；所属函数 ``useEffect callback @ 2773``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120820:120895:FUNCTION

.. rubric:: ``useEffect callback @ 2779``

.. code-block:: javascript

   useEffect callback @ 2779()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2779``—``2781`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120936:123517:FUNCTION

.. rubric:: ``useEffect callback @ 2783``

.. code-block:: javascript

   useEffect callback @ 2783()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2783``—``2842`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``setAdvancedSettings``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123441:123499:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 2838``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 2838(id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2838``—``2840`` 行；所属函数 ``useEffect callback @ 2783``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123595:124181:FUNCTION

.. rubric:: ``useEffect callback @ 2844``

.. code-block:: javascript

   useEffect callback @ 2844()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2844``—``2858`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123807:123971:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 2848``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 2848(items)

处理 ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2848``—``2851`` 行；所属函数 ``useEffect callback @ 2844``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123992:124109:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 2852``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 2852()

实现 ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2852``—``2854`` 行；所属函数 ``useEffect callback @ 2844``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124126:124174:FUNCTION

.. rubric:: ``returned callback @ 2855``

.. code-block:: javascript

   returned callback @ 2855()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2855``—``2857`` 行；所属函数 ``useEffect callback @ 2844``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124247:126013:FUNCTION

.. rubric:: ``useCallback callback @ 2860``

.. code-block:: javascript

   async useCallback callback @ 2860({preserveSelection = false, timeoutMs = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2860``—``2896`` 行；所属函数 ``ChatPage``。

**参数**

``{preserveSelection = false, timeoutMs = null}``（默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedModels``、``[]``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:125543:125579:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 2885``

.. code-block:: javascript

   normalizedModels.find callback @ 2885(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2885``—``2885`` 行；所属函数 ``useCallback callback @ 2860``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:126385:126679:FUNCTION

.. rubric:: ``useEffect callback @ 2904``

.. code-block:: javascript

   useEffect callback @ 2904()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2904``—``2909`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:126781:133626:FUNCTION

.. rubric:: ``useEffect callback @ 2911``

.. code-block:: javascript

   useEffect callback @ 2911()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2911``—``3063`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:127185:128240:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2920``—``2941`` 行；所属函数 ``useEffect callback @ 2911``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:127681:127711:FUNCTION

.. rubric:: ``modelsData.find callback @ 2929``

.. code-block:: javascript

   modelsData.find callback @ 2929(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2929``—``2929`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:128270:128546:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2942``—``2949`` 行；所属函数 ``useEffect callback @ 2911``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadingStage``、``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:128579:132549:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2950``—``3032`` 行；所属函数 ``useEffect callback @ 2911``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``、``toast``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:130421:131229:FUNCTION

.. rubric:: ``setTimeout callback @ 2986``

.. code-block:: javascript

   setTimeout callback @ 2986()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2986``—``3001`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:130460:131205:FUNCTION

.. rubric:: ``setTimeout callback @ 2987``

.. code-block:: javascript

   setTimeout callback @ 2987()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2987``—``3000`` 行；所属函数 ``setTimeout callback @ 2986``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131536:131712:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3007``—``3011`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131972:132518:FUNCTION

.. rubric:: ``setTimeout callback @ 3019``

.. code-block:: javascript

   setTimeout callback @ 3019()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3019``—``3030`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132575:133344:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3033``—``3053`` 行；所属函数 ``useEffect callback @ 2911``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``performance.now``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133908:133962:FUNCTION

.. rubric:: ``useCallback callback @ 3075``

.. code-block:: javascript

   useCallback callback @ 3075()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3075``—``3077`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133941:133954:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 3076``

.. code-block:: javascript

   setIsSidebarOpen callback @ 3076(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3076``—``3076`` 行；所属函数 ``useCallback callback @ 3075``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134008:134076:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 3079``

.. code-block:: javascript

   useBrowserBackLayer callback @ 3079()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3079``—``3082`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141820:141850:FUNCTION

.. rubric:: ``onStop callback @ 3237``

.. code-block:: javascript

   onStop callback @ 3237()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3237``—``3237`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141892:141919:FUNCTION

.. rubric:: ``onPrevious callback @ 3238``

.. code-block:: javascript

   onPrevious callback @ 3238()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3238``—``3238`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:141957:141983:FUNCTION

.. rubric:: ``onNext callback @ 3239``

.. code-block:: javascript

   onNext callback @ 3239()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3239``—``3239`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144413:144941:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3277``

.. code-block:: javascript

   onWorkspaceChange callback @ 3277(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3277``—``3285`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144591:144846:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3279``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3279(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3279``—``3283`` 行；所属函数 ``onWorkspaceChange callback @ 3277``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147043:147069:FUNCTION

.. rubric:: ``onEnd callback @ 3327``

.. code-block:: javascript

   onEnd callback @ 3327()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3327``—``3327`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147103:147141:FUNCTION

.. rubric:: ``onMinimize callback @ 3328``

.. code-block:: javascript

   onMinimize callback @ 3328()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3328``—``3328`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147174:147213:FUNCTION

.. rubric:: ``onRestore callback @ 3329``

.. code-block:: javascript

   onRestore callback @ 3329()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3329``—``3329`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147715:147864:FUNCTION

.. rubric:: ``onSettingChange callback @ 3340``

.. code-block:: javascript

   onSettingChange callback @ 3340(values)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3340``—``3343`` 行；所属函数 ``ChatPage``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvancedSettingsValues``、``setInitialSettingValues``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148709:148820:FUNCTION

.. rubric:: ``onClose callback @ 3369``

.. code-block:: javascript

   onClose callback @ 3369()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3369``—``3372`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149221:149407:FUNCTION

.. rubric:: ``onOpenChange callback @ 3383``

.. code-block:: javascript

   onOpenChange callback @ 3383(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3383``—``3389`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149679:150560:FUNCTION

.. rubric:: ``onConfirm callback @ 3395``

.. code-block:: javascript

   onConfirm callback @ 3395()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3395``—``3416`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setIsDeletingMessage``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…``、``apiClient.delete``、``setPendingDeleteMsgId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150110:150213:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3406``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3406()

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3406``—``3408`` 行；所属函数 ``onConfirm callback @ 3395``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150246:150393:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3409``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3409(error)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3409``—``3411`` 行；所属函数 ``onConfirm callback @ 3395``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。
