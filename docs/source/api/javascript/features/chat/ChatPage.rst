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
* **局部函数与匿名回调**：237

主要依赖
--------------------------------------------------------------------------------

``react``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``framer-motion``、``@/context/useEventStore.jsx``、``react-i18next``、``react-router-dom``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/RuntimeInspectorDialog.jsx``、``@/features/chat/page/hooks/useRuntimeInspector.js``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``@/features/execution``、``@/features/workspace/useWorkspaceTransferStore.js``、``./attachmentVision.js``、``./modelCapabilities.js``、``./widgets/WidgetPresentationContext.jsx``、``./voice/index.js``、``@/features/avatar-scene/AvatarScenePanel.jsx``、``@/lib/browserHistoryLayers.js``、``@/features/chat/page/utils/messageSummaries.js``、``@/features/chat/page/utils/liveMessageReconcile.js``、``@/features/chat``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2775:2875:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``71``—``73`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2924:3065:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``75``—``78`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition || window.webkitSpeechRecognition || null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3110:3351:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``86`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language || '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3483:3633:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``96`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3658:3711:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``98``—``98`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3741:3896:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``100``—``103`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${baseEndpoint}/${encodeURIComponent(String(id))}\x60``。

   **主要协作调用**：``String(endpoint || '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3917:4087:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``111`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4111:4163:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``113``—``113`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4190:4288:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``118`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{text: String(data.text ?? '')}``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4312:4457:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``120``—``123`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4488:5132:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``147`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], {type: ASR_AUDIO_MIME_TYPE}) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], {type: ASR_AUDIO_MIME_TYPE}) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5164:5308:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``149``—``152`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5309:151127:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``155``—``3428`` 行。

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

   **内部回调数量**：85。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3507:3632:FUNCTION

.. rubric:: ``anonymous callback @ 93``

.. code-block:: javascript

   anonymous callback @ 93(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``96`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10301:10339:FUNCTION

.. rubric:: ``useState callback @ 250``

.. code-block:: javascript

   useState callback @ 250()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``250``—``250`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10733:10796:FUNCTION

.. rubric:: ``useEffect callback @ 258``

.. code-block:: javascript

   useEffect callback @ 258()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``258``—``260`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10831:11039:FUNCTION

.. rubric:: ``useEffect callback @ 262``

.. code-block:: javascript

   useEffect callback @ 262()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``262``—``267`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10836:11039:FUNCTION

.. rubric:: ``anonymous callback @ 262``

.. code-block:: javascript

   anonymous callback @ 262()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``262``—``267`` 行；所属函数 ``useEffect callback @ 262``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11099:12050:FUNCTION

.. rubric:: ``useCallback callback @ 269``

.. code-block:: javascript

   useCallback callback @ 269(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``288`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status || '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11707:12025:FUNCTION

.. rubric:: ``setTimeout callback @ 279``

.. code-block:: javascript

   setTimeout callback @ 279()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``279``—``286`` 行；所属函数 ``useCallback callback @ 269``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11757:11946:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 280``

.. code-block:: javascript

   setContextCompactionState callback @ 280(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``280``—``284`` 行；所属函数 ``setTimeout callback @ 279``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13433:14124:FUNCTION

.. rubric:: ``useCallback callback @ 336``

.. code-block:: javascript

   useCallback callback @ 336(messageIds, runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``336``—``348`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13568:13605:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 338``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 338(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``useCallback callback @ 336``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13711:13772:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 342``

.. code-block:: javascript

   normalizedIds.forEach callback @ 342(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``useCallback callback @ 336``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``liveStreamMessageIdsRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13999:14040:FUNCTION

.. rubric:: ``normalizedIds.forEach callback @ 346``

.. code-block:: javascript

   normalizedIds.forEach callback @ 346(messageId)

作为 ``normalizedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``346``—``346`` 行；所属函数 ``useCallback callback @ 336``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runMessages.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14175:14769:FUNCTION

.. rubric:: ``useCallback callback @ 350``

.. code-block:: javascript

   useCallback callback @ 350(runId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``350``—``361`` 行；所属函数 ``ChatPage``。

**参数**

``runId``（默认值 ``null``）
   当前 Agent/Worker 执行 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(runId || '').trim``、``String``、``liveStreamRunMessagesRef.current.get``、``liveStreamRunMessagesRef.current.delete``、``runMessages.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14504:14761:FUNCTION

.. rubric:: ``runMessages.forEach callback @ 356``

.. code-block:: javascript

   runMessages.forEach callback @ 356(messageId)

作为 ``runMessages.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``356``—``360`` 行；所属函数 ``useCallback callback @ 350``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(liveStreamRunMessagesRef.current.values()) .some``、``Array.from``、``liveStreamRunMessagesRef.current.values``、``liveStreamMessageIdsRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14628:14669:FUNCTION

.. rubric:: ``Array.from(liveStreamRunMessagesRef.current.values()) .some callback @ 358``

.. code-block:: javascript

   Array.from(liveStreamRunMessagesRef.current.values()) .some callback @ 358(messageIds)

作为 ``Array.from(liveStreamRunMessagesRef.current.values()) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``runMessages.forEach callback @ 356``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messageIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14829:15907:FUNCTION

.. rubric:: ``useCallback callback @ 363``

.. code-block:: javascript

   useCallback callback @ 363(messageIds)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``363``—``386`` 行；所属函数 ``ChatPage``。

**参数**

``messageIds``
   调用方传入的 ``messageIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map((value) => String(value || '').trim()) .filter``、``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map``、``Array.isArray``、``restoreMissingStreamTail``、``nextOrder.every``、``setMessagesOrder``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15247:15284:FUNCTION

.. rubric:: ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 370``

.. code-block:: javascript

   (Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback @ 370(value)

作为 ``(Array.isArray(messageIds) ? messageIds : [messageIds]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``370`` 行；所属函数 ``useCallback callback @ 363``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15731:15798:FUNCTION

.. rubric:: ``nextOrder.every callback @ 381``

.. code-block:: javascript

   nextOrder.every callback @ 381(messageId, index)

作为 ``nextOrder.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``381``—``381`` 行；所属函数 ``useCallback callback @ 363``。

**参数**

``messageId``
   Message 的公共 UUID。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:15956:16664:FUNCTION

.. rubric:: ``useCallback callback @ 388``

.. code-block:: javascript

   useCallback callback @ 388(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``388``—``403`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages``（默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16004:16663:FUNCTION

.. rubric:: ``produce callback @ 388``

.. code-block:: javascript

   produce callback @ 388(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``388``—``403`` 行；所属函数 ``useCallback callback @ 388``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft || {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16059:16655:FUNCTION

.. rubric:: ``Object.keys(draft || {}).forEach callback @ 389``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 389(key)

作为 ``Object.keys(draft || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``389``—``402`` 行；所属函数 ``produce callback @ 388``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16329:16435:FUNCTION

.. rubric:: ``anonymous callback @ 395``

.. code-block:: javascript

   anonymous callback @ 395(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``395``—``397`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 389``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16479:16563:FUNCTION

.. rubric:: ``anonymous callback @ 398``

.. code-block:: javascript

   anonymous callback @ 398(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``398``—``400`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 389``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16600:16644:FUNCTION

.. rubric:: ``anonymous callback @ 401``

.. code-block:: javascript

   anonymous callback @ 401(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``401``—``401`` 行；所属函数 ``Object.keys(draft || {}).forEach callback @ 389``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16717:19180:FUNCTION

.. rubric:: ``useCallback callback @ 405``

.. code-block:: javascript

   async useCallback callback @ 405({silent = false, append = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``405``—``465`` 行；所属函数 ``ChatPage``。

**参数**

``{silent = false, append = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19293:19731:FUNCTION

.. rubric:: ``useCallback callback @ 469``

.. code-block:: javascript

   useCallback callback @ 469(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``469``—``481`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19515:19699:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 473``

.. code-block:: javascript

   requestAnimationFrame callback @ 473()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``473``—``478`` 行；所属函数 ``useCallback callback @ 469``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19786:19967:FUNCTION

.. rubric:: ``useCallback callback @ 482``

.. code-block:: javascript

   useCallback callback @ 482(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``482``—``489`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20032:20294:FUNCTION

.. rubric:: ``useCallback callback @ 490``

.. code-block:: javascript

   useCallback callback @ 490(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``490``—``498`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20359:20448:FUNCTION

.. rubric:: ``useCallback callback @ 499``

.. code-block:: javascript

   useCallback callback @ 499(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``499``—``503`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20891:21039:FUNCTION

.. rubric:: ``useCallback callback @ 520``

.. code-block:: javascript

   useCallback callback @ 520()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``520``—``524`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine( getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote') )``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21106:21385:FUNCTION

.. rubric:: ``useCallback callback @ 526``

.. code-block:: javascript

   useCallback callback @ 526()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``526``—``531`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage) )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21460:22551:FUNCTION

.. rubric:: ``useCallback callback @ 533``

.. code-block:: javascript

   useCallback callback @ 533({cancel = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``533``—``566`` 行；所属函数 ``ChatPage``。

**参数**

``{cancel = false}``（默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({text: '', error: null})``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \x60${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21774:22543:FUNCTION

.. rubric:: ``anonymous callback @ 542``

.. code-block:: javascript

   anonymous callback @ 542(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``542``—``565`` 行；所属函数 ``useCallback callback @ 533``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21848:22149:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``544``—``550`` 行；所属函数 ``anonymous callback @ 542``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\x60${session.finalTranscript} ${session.interimTranscript}\x60.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22613:24437:FUNCTION

.. rubric:: ``useCallback callback @ 568``

.. code-block:: javascript

   useCallback callback @ 568()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``568``—``623`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:23366:23980:FUNCTION

.. rubric:: ``anonymous callback @ 590``

.. code-block:: javascript

   anonymous callback @ 590(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``590``—``605`` 行；所属函数 ``useCallback callback @ 568``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${session.finalTranscript} ${transcript}\x60.trim``、``\x60${interimTranscript} ${transcript}\x60.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24012:24086:FUNCTION

.. rubric:: ``anonymous callback @ 607``

.. code-block:: javascript

   anonymous callback @ 607(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``607``—``609`` 行；所属函数 ``useCallback callback @ 568``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24116:24125:FUNCTION

.. rubric:: ``anonymous callback @ 611``

.. code-block:: javascript

   anonymous callback @ 611()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``611``—``611`` 行；所属函数 ``useCallback callback @ 568``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:24562:25094:FUNCTION

.. rubric:: ``useCallback callback @ 625``

.. code-block:: javascript

   useCallback callback @ 625()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``625``—``641`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{engine: 'remote'}``、``{engine: 'remote', fallback: true}``、``{engine: 'local'}``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:25215:27941:FUNCTION

.. rubric:: ``useCallback callback @ 643``

.. code-block:: javascript

   async useCallback callback @ 643(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``643``—``720`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27994:28777:FUNCTION

.. rubric:: ``useCallback callback @ 722``

.. code-block:: javascript

   async useCallback callback @ 722(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``722``—``744`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{text}``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28928:29055:FUNCTION

.. rubric:: ``useCallback callback @ 746``

.. code-block:: javascript

   useCallback callback @ 746()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``746``—``749`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29571:29688:FUNCTION

.. rubric:: ``useCallback callback @ 765``

.. code-block:: javascript

   useCallback callback @ 765()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``765``—``767`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29743:29854:FUNCTION

.. rubric:: ``useCallback callback @ 769``

.. code-block:: javascript

   useCallback callback @ 769(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``769``—``771`` 行；所属函数 ``ChatPage``。

**参数**

``duration``（默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29910:30312:FUNCTION

.. rubric:: ``useCallback callback @ 774``

.. code-block:: javascript

   useCallback callback @ 774()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``774``—``783`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30438:30681:FUNCTION

.. rubric:: ``useCallback callback @ 785``

.. code-block:: javascript

   useCallback callback @ 785()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``785``—``791`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30920:32420:FUNCTION

.. rubric:: ``useCallback callback @ 795``

.. code-block:: javascript

   useCallback callback @ 795(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``795``—``837`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll``（默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31072:32030:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``798``—``822`` 行；所属函数 ``useCallback callback @ 795``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32062:32285:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``824``—``830`` 行；所属函数 ``useCallback callback @ 795``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32105:32273:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 825``

.. code-block:: javascript

   requestAnimationFrame callback @ 825()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``825``—``829`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32740:33129:FUNCTION

.. rubric:: ``useCallback callback @ 848``

.. code-block:: javascript

   useCallback callback @ 848()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``848``—``858`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34501:34542:FUNCTION

.. rubric:: ``useCallback callback @ 901``

.. code-block:: javascript

   useCallback callback @ 901()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``901``—``901`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarSceneOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34526:34541:FUNCTION

.. rubric:: ``setAvatarSceneOpen callback @ 901``

.. code-block:: javascript

   setAvatarSceneOpen callback @ 901(value)

设置与 ``Avatar Scene Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``901``—``901`` 行；所属函数 ``useCallback callback @ 901``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34989:35135:FUNCTION

.. rubric:: ``useEffect callback @ 916``

.. code-block:: javascript

   useEffect callback @ 916()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``916``—``919`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35447:35491:FUNCTION

.. rubric:: ``useEffect callback @ 924``

.. code-block:: javascript

   useEffect callback @ 924()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``924``—``926`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncStreamingSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35564:36067:FUNCTION

.. rubric:: ``useCallback callback @ 928``

.. code-block:: javascript

   async useCallback callback @ 928()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``928``—``942`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36123:36705:FUNCTION

.. rubric:: ``useCallback callback @ 944``

.. code-block:: javascript

   async useCallback callback @ 944(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``944``—``957`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36766:37721:FUNCTION

.. rubric:: ``useCallback callback @ 959``

.. code-block:: javascript

   async useCallback callback @ 959(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``959``—``978`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37176:37281:FUNCTION

.. rubric:: ``setStories callback @ 969``

.. code-block:: javascript

   setStories callback @ 969(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``969``—``969`` 行；所属函数 ``useCallback callback @ 959``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37199:37280:FUNCTION

.. rubric:: ``current.map callback @ 969``

.. code-block:: javascript

   current.map callback @ 969(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``969``—``969`` 行；所属函数 ``setStories callback @ 969``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37315:37409:FUNCTION

.. rubric:: ``setActiveStory callback @ 970``

.. code-block:: javascript

   setActiveStory callback @ 970(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``970``—``970`` 行；所属函数 ``useCallback callback @ 959``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37782:38646:FUNCTION

.. rubric:: ``useCallback callback @ 980``

.. code-block:: javascript

   async useCallback callback @ 980(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``980``—``998`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38026:38101:FUNCTION

.. rubric:: ``setStories callback @ 984``

.. code-block:: javascript

   setStories callback @ 984(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``984``—``984`` 行；所属函数 ``useCallback callback @ 980``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38052:38100:FUNCTION

.. rubric:: ``current.filter callback @ 984``

.. code-block:: javascript

   current.filter callback @ 984(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``984``—``984`` 行；所属函数 ``setStories callback @ 984``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38131:38355:FUNCTION

.. rubric:: ``setActiveStory callback @ 985``

.. code-block:: javascript

   setActiveStory callback @ 985(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``985``—``991`` 行；所属函数 ``useCallback callback @ 980``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38710:39002:FUNCTION

.. rubric:: ``useCallback callback @ 1000``

.. code-block:: javascript

   useCallback callback @ 1000(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1000``—``1007`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \x60story:${story.storyId}:part:${part.partId}\x60, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39075:39122:FUNCTION

.. rubric:: ``useCallback callback @ 1009``

.. code-block:: javascript

   useCallback callback @ 1009()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1009``—``1011`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39162:39263:FUNCTION

.. rubric:: ``useEffect callback @ 1013``

.. code-block:: javascript

   useEffect callback @ 1013()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1013``—``1017`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39312:42396:FUNCTION

.. rubric:: ``useEffect callback @ 1019``

.. code-block:: javascript

   useEffect callback @ 1019()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1019``—``1091`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39487:42395:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023({event, payload})

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1023``—``1091`` 行；所属函数 ``useEffect callback @ 1019``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39778:39847:FUNCTION

.. rubric:: ``setStories callback @ 1031``

.. code-block:: javascript

   setStories callback @ 1031(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1031``—``1031`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39804:39846:FUNCTION

.. rubric:: ``current.filter callback @ 1031``

.. code-block:: javascript

   current.filter callback @ 1031(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1031``—``1031`` 行；所属函数 ``setStories callback @ 1031``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39877:40095:FUNCTION

.. rubric:: ``setActiveStory callback @ 1032``

.. code-block:: javascript

   setActiveStory callback @ 1032(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1032``—``1038`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40534:40971:FUNCTION

.. rubric:: ``loadStories().then callback @ 1052``

.. code-block:: javascript

   loadStories().then callback @ 1052(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1052``—``1062`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40577:40955:FUNCTION

.. rubric:: ``setActiveStory callback @ 1053``

.. code-block:: javascript

   setActiveStory callback @ 1053(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1053``—``1061`` 行；所属函数 ``loadStories().then callback @ 1052``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40697:40753:FUNCTION

.. rubric:: ``values.some callback @ 1055``

.. code-block:: javascript

   values.some callback @ 1055(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1055``—``1055`` 行；所属函数 ``setActiveStory callback @ 1053``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41004:41499:FUNCTION

.. rubric:: ``setStories callback @ 1065``

.. code-block:: javascript

   setStories callback @ 1065(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1065``—``1075`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41061:41123:FUNCTION

.. rubric:: ``current.findIndex callback @ 1066``

.. code-block:: javascript

   current.findIndex callback @ 1066(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1066``—``1066`` 行；所属函数 ``setStories callback @ 1065``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41525:42387:FUNCTION

.. rubric:: ``setActiveStory callback @ 1076``

.. code-block:: javascript

   setActiveStory callback @ 1076(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1076``—``1090`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1023``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort``、``existing.filter``、``(current.parts || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42033:42074:FUNCTION

.. rubric:: ``existing.filter callback @ 1084``

.. code-block:: javascript

   existing.filter callback @ 1084(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1084``—``1084`` 行；所属函数 ``setActiveStory callback @ 1076``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42115:42148:FUNCTION

.. rubric:: ``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback @ 1085``

.. code-block:: javascript

   [...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback @ 1085(a, b)

作为 ``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1085``—``1085`` 行；所属函数 ``setActiveStory callback @ 1076``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42275:42336:FUNCTION

.. rubric:: ``(current.parts || []).map callback @ 1087``

.. code-block:: javascript

   (current.parts || []).map callback @ 1087(item)

作为 ``(current.parts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1087``—``1087`` 行；所属函数 ``setActiveStory callback @ 1076``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42521:44431:FUNCTION

.. rubric:: ``useCallback callback @ 1096``

.. code-block:: javascript

   useCallback callback @ 1096(msgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1096``—``1157`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``toast.error``、``t``、``currentOrder.indexOf``、``Array.isArray``、``oldChildren.indexOf``、``oldChildren.filter``、``setMessages``、``loadSwitchMessage``、``currentOrder.slice``、``setMessagesOrder``、``scrollToBottomAfterRender``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43517:43545:FUNCTION

.. rubric:: ``oldChildren.filter callback @ 1125``

.. code-block:: javascript

   oldChildren.filter callback @ 1125(childId)

作为 ``oldChildren.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1125``—``1125`` 行；所属函数 ``useCallback callback @ 1096``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44658:45338:FUNCTION

.. rubric:: ``useCallback callback @ 1166``

.. code-block:: javascript

   async useCallback callback @ 1166(targetConversationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1166``—``1179`` 行；所属函数 ``ChatPage``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``workspaceIds``。

**主要协作调用**：``( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.…``、``Array.isArray``、``apiClient.put``、``encodeURIComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45013:45048:FUNCTION

.. rubric:: ``( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.… callback @ 1172``

.. code-block:: javascript

   ( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.… callback @ 1172(item)

实现 ``( Array.isArray(advancedSettingsValues?.workspaceIds) ? advancedSettingsValues.workspaceIds : (advancedSettingsValues?.…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1172``—``1172`` 行；所属函数 ``useCallback callback @ 1166``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45410:50106:FUNCTION

.. rubric:: ``useCallback callback @ 1181``

.. code-block:: javascript

   useCallback callback @ 1181({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1181``—``1290`` 行；所属函数 ``ChatPage``。

**参数**

``{ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…``
   调用方传入的 ``messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((payload) => { if (payload.success) { // Mark this synchronous…``、``sendMessage(conversationId)``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``toast.error``、``t``、``normalizeAttachmentList``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p…``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then``、``emitEvent``、``sendMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46060:48441:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1203``—``1256`` 行；所属函数 ``useCallback callback @ 1181``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``emitEvent(eventPayload).then((payload) => { if (payload.success) { currentTurnIdempotencyKeyRef.current = generateUUID(); } else { toast.error(t("send_message_error", {message: pa…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47701:48429:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1241``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1241(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1241``—``1255`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...payload, conversationId, }``。

**主要协作调用**：``generateUUID``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48706:49791:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1264``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1264(payload)

处理 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1264``—``1282`` 行；所属函数 ``useCallback callback @ 1181``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``persistPendingWorkspaceSelection(payload.value) .then(() => sendMessage(payload.value))``。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``persistPendingWorkspaceSelection(payload.value) .then``、``persistPendingWorkspaceSelection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49632:49664:FUNCTION

.. rubric:: ``persistPendingWorkspaceSelection(payload.value) .then callback @ 1278``

.. code-block:: javascript

   persistPendingWorkspaceSelection(payload.value) .then callback @ 1278()

处理 ``persistPendingWorkspaceSelection(payload.value) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1278``—``1278`` 行；所属函数 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1264``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49816:50023:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p… callback @ 1283``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p… callback @ 1283(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current } }) .then((p…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1283``—``1286`` 行；所属函数 ``useCallback callback @ 1181``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{success: false, value: error?.message || String(error)}``。

**主要协作调用**：``toast.error``、``t``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50329:53396:FUNCTION

.. rubric:: ``useCallback callback @ 1292``

.. code-block:: javascript

   async useCallback callback @ 1292({toolsStatus = {}, composerStatus = 'normal'})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1292``—``1356`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51315:51795:FUNCTION

.. rubric:: ``startForConversation``

.. code-block:: javascript

   async startForConversation(targetConversationId)

启动与 ``For Conversation`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1313``—``1324`` 行；所属函数 ``useCallback callback @ 1292``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.start``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53612:56448:FUNCTION

.. rubric:: ``useCallback callback @ 1358``

.. code-block:: javascript

   async useCallback callback @ 1358()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1358``—``1423`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54271:56073:FUNCTION

.. rubric:: ``anonymous callback @ 1373``

.. code-block:: javascript

   async anonymous callback @ 1373()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1373``—``1412`` 行；所属函数 ``useCallback callback @ 1358``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``latestOrder.slice``、``(data.messagesOrder || []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54941:54979:FUNCTION

.. rubric:: ``(data.messagesOrder || []).filter callback @ 1386``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1386(messageId)

作为 ``(data.messagesOrder || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1386``—``1386`` 行；所属函数 ``anonymous callback @ 1373``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55508:55611:FUNCTION

.. rubric:: ``anonymous callback @ 1400``

.. code-block:: javascript

   anonymous callback @ 1400(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1400``—``1402`` 行；所属函数 ``anonymous callback @ 1373``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55559:55595:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1401``

.. code-block:: javascript

   requestAnimationFrame callback @ 1401()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1401``—``1401`` 行；所属函数 ``anonymous callback @ 1400``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56085:56365:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1412``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1412()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1412``—``1419`` 行；所属函数 ``useCallback callback @ 1358``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56665:57605:FUNCTION

.. rubric:: ``useEffect callback @ 1433``

.. code-block:: javascript

   useEffect callback @ 1433()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1433``—``1457`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57131:57390:FUNCTION

.. rubric:: ``anonymous callback @ 1444``

.. code-block:: javascript

   anonymous callback @ 1444(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1444``—``1449`` 行；所属函数 ``useEffect callback @ 1433``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57176:57205:FUNCTION

.. rubric:: ``entries.some callback @ 1445``

.. code-block:: javascript

   entries.some callback @ 1445(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1445``—``1445`` 行；所属函数 ``anonymous callback @ 1444``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57252:57378:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1446``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1446(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1446``—``1448`` 行；所属函数 ``anonymous callback @ 1444``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57570:57598:FUNCTION

.. rubric:: ``returned callback @ 1456``

.. code-block:: javascript

   returned callback @ 1456()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1456``—``1456`` 行；所属函数 ``useEffect callback @ 1433``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57732:58641:FUNCTION

.. rubric:: ``useCallback callback @ 1459``

.. code-block:: javascript

   useCallback callback @ 1459(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1459``—``1477`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58493:58606:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1473``

.. code-block:: javascript

   window.setTimeout callback @ 1473()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1473``—``1475`` 行；所属函数 ``useCallback callback @ 1459``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58537:58594:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1474``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1474(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1474``—``1474`` 行；所属函数 ``window.setTimeout callback @ 1473``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58764:60620:FUNCTION

.. rubric:: ``useCallback callback @ 1479``

.. code-block:: javascript

   async useCallback callback @ 1479()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1479``—``1521`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60147:60425:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1508``

.. code-block:: javascript

   requestAnimationFrame callback @ 1508()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1508``—``1515`` 行；所属函数 ``useCallback callback @ 1479``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60193:60409:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1509``

.. code-block:: javascript

   requestAnimationFrame callback @ 1509()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1509``—``1514`` 行；所属函数 ``requestAnimationFrame callback @ 1508``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60878:61140:FUNCTION

.. rubric:: ``useEffect callback @ 1533``

.. code-block:: javascript

   useEffect callback @ 1533()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1533``—``1540`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:60966:61133:FUNCTION

.. rubric:: ``returned callback @ 1535``

.. code-block:: javascript

   returned callback @ 1535()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1535``—``1539`` 行；所属函数 ``useEffect callback @ 1533``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61207:64133:FUNCTION

.. rubric:: ``useCallback callback @ 1542``

.. code-block:: javascript

   async useCallback callback @ 1542(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1542``—``1607`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61363:63346:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1547``—``1588`` 行；所属函数 ``useCallback callback @ 1542``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61472:61508:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1548``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1548(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1548``—``1548`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61871:61893:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1555``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1555(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1555``—``1555`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63055:63158:FUNCTION

.. rubric:: ``anonymous callback @ 1581``

.. code-block:: javascript

   anonymous callback @ 1581(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1581``—``1583`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63106:63142:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1582``

.. code-block:: javascript

   requestAnimationFrame callback @ 1582()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1582``—``1582`` 行；所属函数 ``anonymous callback @ 1581``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63458:63494:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1592``

.. code-block:: javascript

   summaryItems.some callback @ 1592(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1592``—``1592`` 行；所属函数 ``useCallback callback @ 1542``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64400:65051:FUNCTION

.. rubric:: ``useEffect callback @ 1619``

.. code-block:: javascript

   useEffect callback @ 1619()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1619``—``1633`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(new URLSearchParams(window.location.search).get('message') || '').trim``、``String``、``new URLSearchParams(window.location.search).get``、``jumpToMessage(targetMessageId).then``、``jumpToMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64868:65043:FUNCTION

.. rubric:: ``jumpToMessage(targetMessageId).then callback @ 1628``

.. code-block:: javascript

   jumpToMessage(targetMessageId).then callback @ 1628(success)

处理 ``jumpToMessage(targetMessageId).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1628``—``1632`` 行；所属函数 ``useEffect callback @ 1619``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65198:68492:FUNCTION

.. rubric:: ``useCallback callback @ 1635``

.. code-block:: javascript

   async useCallback callback @ 1635(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1635``—``1724`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67300:68373:FUNCTION

.. rubric:: ``produce callback @ 1686``

.. code-block:: javascript

   produce callback @ 1686(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1686``—``1719`` 行；所属函数 ``useCallback callback @ 1635``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67907:68021:FUNCTION

.. rubric:: ``anonymous callback @ 1705``

.. code-block:: javascript

   anonymous callback @ 1705(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1705``—``1707`` 行；所属函数 ``produce callback @ 1686``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:68096:68188:FUNCTION

.. rubric:: ``anonymous callback @ 1710``

.. code-block:: javascript

   anonymous callback @ 1710(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1710``—``1712`` 行；所属函数 ``produce callback @ 1686``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:68256:68348:FUNCTION

.. rubric:: ``anonymous callback @ 1715``

.. code-block:: javascript

   anonymous callback @ 1715(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1715``—``1717`` 行；所属函数 ``produce callback @ 1686``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:68586:69725:FUNCTION

.. rubric:: ``useCallback callback @ 1726``

.. code-block:: javascript

   async useCallback callback @ 1726(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1726``—``1755`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69821:70719:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded()

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1757``—``1778`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69849:70709:FUNCTION

.. rubric:: ``setTimeout callback @ 1758``

.. code-block:: javascript

   setTimeout callback @ 1758()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1758``—``1777`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70324:70409:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1767``—``1769`` 行；所属函数 ``setTimeout callback @ 1758``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70430:70697:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 1770``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 1770(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1770``—``1776`` 行；所属函数 ``setTimeout callback @ 1758``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70735:72750:FUNCTION

.. rubric:: ``useEffect callback @ 1780``

.. code-block:: javascript

   useEffect callback @ 1780()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1780``—``1840`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70936:71831:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1787``—``1809`` 行；所属函数 ``useEffect callback @ 1780``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71259:71819:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1795``

.. code-block:: javascript

   requestAnimationFrame callback @ 1795()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1795``—``1808`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71931:72111:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1813``—``1817`` 行；所属函数 ``useEffect callback @ 1780``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72268:72382:FUNCTION

.. rubric:: ``anonymous callback @ 1822``

.. code-block:: javascript

   anonymous callback @ 1822()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1822``—``1825`` 行；所属函数 ``useEffect callback @ 1780``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72548:72743:FUNCTION

.. rubric:: ``returned callback @ 1833``

.. code-block:: javascript

   returned callback @ 1833()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1833``—``1839`` 行；所属函数 ``useEffect callback @ 1780``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72998:76282:FUNCTION

.. rubric:: ``useEffect callback @ 1850``

.. code-block:: javascript

   useEffect callback @ 1850()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1850``—``1932`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73232:73340:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1857``—``1859`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73370:73690:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1861``—``1869`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73725:73816:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1871``—``1873`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73850:74495:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1875``—``1892`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74526:75639:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1894``—``1919`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75977:76275:FUNCTION

.. rubric:: ``returned callback @ 1926``

.. code-block:: javascript

   returned callback @ 1926()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1926``—``1931`` 行；所属函数 ``useEffect callback @ 1850``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76477:76942:FUNCTION

.. rubric:: ``useEffect callback @ 1940``

.. code-block:: javascript

   useEffect callback @ 1940()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1940``—``1953`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76624:76924:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1942``

.. code-block:: javascript

   requestAnimationFrame callback @ 1942()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1942``—``1951`` 行；所属函数 ``useEffect callback @ 1940``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77178:77634:FUNCTION

.. rubric:: ``useEffect callback @ 1964``

.. code-block:: javascript

   useEffect callback @ 1964()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1964``—``1975`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77670:77806:FUNCTION

.. rubric:: ``useEffect callback @ 1977``

.. code-block:: javascript

   useEffect callback @ 1977()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1977``—``1981`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:77932:78173:FUNCTION

.. rubric:: ``useCallback callback @ 1983``

.. code-block:: javascript

   useCallback callback @ 1983()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1983``—``1990`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openInspector``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78319:78421:FUNCTION

.. rubric:: ``useCallback callback @ 1992``

.. code-block:: javascript

   useCallback callback @ 1992(tabId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1992``—``1994`` 行；所属函数 ``ChatPage``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectRuntimeInspectorTab``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78532:78771:FUNCTION

.. rubric:: ``useCallback callback @ 1996``

.. code-block:: javascript

   async useCallback callback @ 1996()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1996``—``2001`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``、``refreshRuntimeInspector``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:78959:80032:FUNCTION

.. rubric:: ``useEffect callback @ 2009``

.. code-block:: javascript

   useEffect callback @ 2009()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2009``—``2035`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79254:79294:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 2017``

.. code-block:: javascript

   messagesOrder.filter callback @ 2017(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2017``—``2017`` 行；所属函数 ``useEffect callback @ 2009``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79550:79915:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2022``

.. code-block:: javascript

   window.setTimeout callback @ 2022()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2022``—``2030`` 行；所属函数 ``useEffect callback @ 2009``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({silent: true, append: true}).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79626:79903:FUNCTION

.. rubric:: ``loadMessageSummaries({silent: true, append: true}).then callback @ 2023``

.. code-block:: javascript

   loadMessageSummaries({silent: true, append: true}).then callback @ 2023(items)

处理 ``loadMessageSummaries({silent: true, append: true}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2023``—``2029`` 行；所属函数 ``window.setTimeout callback @ 2022``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79937:80025:FUNCTION

.. rubric:: ``returned callback @ 2031``

.. code-block:: javascript

   returned callback @ 2031()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2031``—``2034`` 行；所属函数 ``useEffect callback @ 2009``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80236:80744:FUNCTION

.. rubric:: ``useEffect callback @ 2044``

.. code-block:: javascript

   useEffect callback @ 2044()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2044``—``2056`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80346:80403:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2047``—``2047`` 行；所属函数 ``useEffect callback @ 2044``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80624:80737:FUNCTION

.. rubric:: ``returned callback @ 2052``

.. code-block:: javascript

   returned callback @ 2052()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2052``—``2055`` 行；所属函数 ``useEffect callback @ 2044``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80778:82828:FUNCTION

.. rubric:: ``useEffect callback @ 2058``

.. code-block:: javascript

   useEffect callback @ 2058()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2058``—``2102`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:80948:82327:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2063``—``2091`` 行；所属函数 ``useEffect callback @ 2058``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81066:82315:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 2065``

.. code-block:: javascript

   requestAnimationFrame callback @ 2065()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2065``—``2090`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map(element => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81821:81870:FUNCTION

.. rubric:: ``elements .map callback @ 2079``

.. code-block:: javascript

   elements .map callback @ 2079(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2079``—``2079`` 行；所属函数 ``requestAnimationFrame callback @ 2065``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:81902:81951:FUNCTION

.. rubric:: ``elements .map(element => element.closest?.('[data-message-id]')) .find callback @ 2080``

.. code-block:: javascript

   elements .map(element => element.closest?.('[data-message-id]')) .find callback @ 2080(element)

作为 ``elements .map(element => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2080``—``2080`` 行；所属函数 ``requestAnimationFrame callback @ 2065``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82229:82281:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 2088``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 2088(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2088``—``2088`` 行；所属函数 ``requestAnimationFrame callback @ 2065``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82622:82821:FUNCTION

.. rubric:: ``returned callback @ 2097``

.. code-block:: javascript

   returned callback @ 2097()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2097``—``2101`` 行；所属函数 ``useEffect callback @ 2058``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:82864:120415:FUNCTION

.. rubric:: ``useEffect callback @ 2105``

.. code-block:: javascript

   useEffect callback @ 2105()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2105``—``2775`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83835:119853:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131({event, payload, reply, eventRunId})

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2131``—``2757`` 行；所属函数 ``useEffect callback @ 2105``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86134:86248:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback @ 2176``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback @ 2176()

处理 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2176``—``2178`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86293:86464:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()… callback @ 2179``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()… callback @ 2179(error)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then(()…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2179``—``2181`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90362:90516:FUNCTION

.. rubric:: ``anonymous callback @ 2249``

.. code-block:: javascript

   anonymous callback @ 2249(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2249``—``2251`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90580:90712:FUNCTION

.. rubric:: ``anonymous callback @ 2253``

.. code-block:: javascript

   anonymous callback @ 2253(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2253``—``2255`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:90769:90901:FUNCTION

.. rubric:: ``anonymous callback @ 2257``

.. code-block:: javascript

   anonymous callback @ 2257(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2257``—``2259`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92444:92793:FUNCTION

.. rubric:: ``produce callback @ 2288``

.. code-block:: javascript

   produce callback @ 2288(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2288``—``2294`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93779:94161:FUNCTION

.. rubric:: ``produce callback @ 2310``

.. code-block:: javascript

   produce callback @ 2310(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2310``—``2316`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95096:95762:FUNCTION

.. rubric:: ``produce callback @ 2331``

.. code-block:: javascript

   produce callback @ 2331(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2331``—``2341`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96746:97771:FUNCTION

.. rubric:: ``produce callback @ 2357``

.. code-block:: javascript

   produce callback @ 2357(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2357``—``2372`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:99535:99890:FUNCTION

.. rubric:: ``produce callback @ 2400``

.. code-block:: javascript

   produce callback @ 2400(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2400``—``2406`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100774:101154:FUNCTION

.. rubric:: ``produce callback @ 2420``

.. code-block:: javascript

   produce callback @ 2420(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2420``—``2426`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:102293:102623:FUNCTION

.. rubric:: ``produce callback @ 2446``

.. code-block:: javascript

   produce callback @ 2446(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2446``—``2451`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103249:103996:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2462``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2462()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value }, conversation Id: conversation Id, loca…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2462``—``2474`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:103346:103960:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2463``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2463()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2463``—``2473`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2462``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104678:105248:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2489``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2489()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message }, conversation Id: conversation Id…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2489``—``2500`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:104773:105220:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2490``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2490()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2490``—``2499`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2489``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105741:106873:FUNCTION

.. rubric:: ``produce callback @ 2507``

.. code-block:: javascript

   produce callback @ 2507(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2507``—``2524`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:107916:109986:FUNCTION

.. rubric:: ``produce callback @ 2544``

.. code-block:: javascript

   produce callback @ 2544(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2544``—``2574`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:110769:110805:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2589``

.. code-block:: javascript

   window.setTimeout callback @ 2589()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2589``—``2589`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearLiveStreamRun``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113261:113810:FUNCTION

.. rubric:: ``produce callback @ 2636``

.. code-block:: javascript

   produce callback @ 2636(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2636``—``2645`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114586:115159:FUNCTION

.. rubric:: ``produce callback @ 2658``

.. code-block:: javascript

   produce callback @ 2658(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2658``—``2667`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115940:117954:FUNCTION

.. rubric:: ``produce callback @ 2683``

.. code-block:: javascript

   produce callback @ 2683(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2683``—``2714`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2131``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``toDeleteKeySet``、``Array.isArray``、``network.nodes.filter``、``normalizeNetworkData``、``network.relationships.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116791:116894:FUNCTION

.. rubric:: ``network.nodes.filter callback @ 2697``

.. code-block:: javascript

   network.nodes.filter callback @ 2697(node)

作为 ``network.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2697``—``2697`` 行；所属函数 ``produce callback @ 2683``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteNodeKeys.has``、``getNodeMergeKey``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117605:117713:FUNCTION

.. rubric:: ``network.relationships.filter callback @ 2708``

.. code-block:: javascript

   network.relationships.filter callback @ 2708(rel)

作为 ``network.relationships.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2708``—``2708`` 行；所属函数 ``produce callback @ 2683``。

**参数**

``rel``
   调用方传入的 ``rel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteRelKeys.has``、``getRelationshipMergeKey``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119953:120036:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 2760``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 2760()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2760``—``2762`` 行；所属函数 ``useEffect callback @ 2105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120188:120289:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 2767``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 2767({event, payload, reply})

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2767``—``2769`` 行；所属函数 ``useEffect callback @ 2105``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120306:120408:FUNCTION

.. rubric:: ``returned callback @ 2770``

.. code-block:: javascript

   returned callback @ 2770()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2770``—``2774`` 行；所属函数 ``useEffect callback @ 2105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120930:121015:FUNCTION

.. rubric:: ``useEffect callback @ 2777``

.. code-block:: javascript

   useEffect callback @ 2777()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2777``—``2781`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120952:121008:FUNCTION

.. rubric:: ``returned callback @ 2778``

.. code-block:: javascript

   returned callback @ 2778()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2778``—``2780`` 行；所属函数 ``useEffect callback @ 2777``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121055:121130:FUNCTION

.. rubric:: ``useEffect callback @ 2783``

.. code-block:: javascript

   useEffect callback @ 2783()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2783``—``2785`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121171:123752:FUNCTION

.. rubric:: ``useEffect callback @ 2787``

.. code-block:: javascript

   useEffect callback @ 2787()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2787``—``2846`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``liveStreamMessageIdsRef.current.clear``、``liveStreamRunMessagesRef.current.clear``、``realtimeVoiceStopRef.current``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``setAdvancedSettings``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123676:123734:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 2842``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 2842(id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2842``—``2844`` 行；所属函数 ``useEffect callback @ 2787``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123830:124416:FUNCTION

.. rubric:: ``useEffect callback @ 2848``

.. code-block:: javascript

   useEffect callback @ 2848()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2848``—``2862`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…``、``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124042:124206:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback @ 2852``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 2852(items)

处理 ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2852``—``2855`` 行；所属函数 ``useEffect callback @ 2848``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124227:124344:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {… callback @ 2856``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 2856()

实现 ``apiClient.get(\x60${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\x60) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2856``—``2858`` 行；所属函数 ``useEffect callback @ 2848``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124361:124409:FUNCTION

.. rubric:: ``returned callback @ 2859``

.. code-block:: javascript

   returned callback @ 2859()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2859``—``2861`` 行；所属函数 ``useEffect callback @ 2848``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:124482:126248:FUNCTION

.. rubric:: ``useCallback callback @ 2864``

.. code-block:: javascript

   async useCallback callback @ 2864({preserveSelection = false, timeoutMs = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2864``—``2900`` 行；所属函数 ``ChatPage``。

**参数**

``{preserveSelection = false, timeoutMs = null}``（默认值 ``{}``）
   调用方传入的 ``preserveSelection = false, timeoutMs = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedModels``、``[]``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``Number.isFinite``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:125778:125814:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 2889``

.. code-block:: javascript

   normalizedModels.find callback @ 2889(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2889``—``2889`` 行；所属函数 ``useCallback callback @ 2864``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:126620:126914:FUNCTION

.. rubric:: ``useEffect callback @ 2908``

.. code-block:: javascript

   useEffect callback @ 2908()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2908``—``2913`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:127016:133861:FUNCTION

.. rubric:: ``useEffect callback @ 2915``

.. code-block:: javascript

   useEffect callback @ 2915()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2915``—``3067`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:127420:128475:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2924``—``2945`` 行；所属函数 ``useEffect callback @ 2915``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setLoadingStage``、``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:127916:127946:FUNCTION

.. rubric:: ``modelsData.find callback @ 2933``

.. code-block:: javascript

   modelsData.find callback @ 2933(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2933``—``2933`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:128505:128781:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2946``—``2953`` 行；所属函数 ``useEffect callback @ 2915``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadingStage``、``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:128814:132784:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2954``—``3036`` 行；所属函数 ``useEffect callback @ 2915``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setLoadingStage``、``setHistoryAutoLoadReady``、``apiClient.get``、``decorateMessages``、``reconcileHistorySnapshotWithLiveState``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``、``toast``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:130656:131464:FUNCTION

.. rubric:: ``setTimeout callback @ 2990``

.. code-block:: javascript

   setTimeout callback @ 2990()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2990``—``3005`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:130695:131440:FUNCTION

.. rubric:: ``setTimeout callback @ 2991``

.. code-block:: javascript

   setTimeout callback @ 2991()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2991``—``3004`` 行；所属函数 ``setTimeout callback @ 2990``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131771:131947:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3011``—``3015`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132207:132753:FUNCTION

.. rubric:: ``setTimeout callback @ 3023``

.. code-block:: javascript

   setTimeout callback @ 3023()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3023``—``3034`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:132810:133579:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``3037``—``3057`` 行；所属函数 ``useEffect callback @ 2915``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``performance.now``、``requestModels``、``requestConversation``、``requestMessages``、``console.error``、``Math.round``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134143:134197:FUNCTION

.. rubric:: ``useCallback callback @ 3079``

.. code-block:: javascript

   useCallback callback @ 3079()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3079``—``3081`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134176:134189:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 3080``

.. code-block:: javascript

   setIsSidebarOpen callback @ 3080(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3080``—``3080`` 行；所属函数 ``useCallback callback @ 3079``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134243:134311:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 3083``

.. code-block:: javascript

   useBrowserBackLayer callback @ 3083()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``3083``—``3086`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142177:142207:FUNCTION

.. rubric:: ``onStop callback @ 3243``

.. code-block:: javascript

   onStop callback @ 3243()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3243``—``3243`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142249:142276:FUNCTION

.. rubric:: ``onPrevious callback @ 3244``

.. code-block:: javascript

   onPrevious callback @ 3244()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3244``—``3244`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:142314:142340:FUNCTION

.. rubric:: ``onNext callback @ 3245``

.. code-block:: javascript

   onNext callback @ 3245()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3245``—``3245`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144770:145298:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3283``

.. code-block:: javascript

   onWorkspaceChange callback @ 3283(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3283``—``3291`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:144948:145203:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3285``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3285(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3285``—``3289`` 行；所属函数 ``onWorkspaceChange callback @ 3283``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147268:147299:FUNCTION

.. rubric:: ``onClose callback @ 3329``

.. code-block:: javascript

   onClose callback @ 3329()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3329``—``3329`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvatarSceneOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147531:147557:FUNCTION

.. rubric:: ``onEnd callback @ 3334``

.. code-block:: javascript

   onEnd callback @ 3334()

处理 ``End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3334``—``3334`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.stop``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147591:147629:FUNCTION

.. rubric:: ``onMinimize callback @ 3335``

.. code-block:: javascript

   onMinimize callback @ 3335()

处理 ``Minimize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3335``—``3335`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:147662:147701:FUNCTION

.. rubric:: ``onRestore callback @ 3336``

.. code-block:: javascript

   onRestore callback @ 3336()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3336``—``3336`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``realtimeVoice.setMinimized``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:148203:148352:FUNCTION

.. rubric:: ``onSettingChange callback @ 3347``

.. code-block:: javascript

   onSettingChange callback @ 3347(values)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3347``—``3350`` 行；所属函数 ``ChatPage``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvancedSettingsValues``、``setInitialSettingValues``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149197:149308:FUNCTION

.. rubric:: ``onClose callback @ 3376``

.. code-block:: javascript

   onClose callback @ 3376()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3376``—``3379`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopStorySpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:149709:149895:FUNCTION

.. rubric:: ``onOpenChange callback @ 3390``

.. code-block:: javascript

   onOpenChange callback @ 3390(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3390``—``3396`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150167:151048:FUNCTION

.. rubric:: ``onConfirm callback @ 3402``

.. code-block:: javascript

   onConfirm callback @ 3402()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3402``—``3423`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setIsDeletingMessage``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…``、``apiClient.delete``、``setPendingDeleteMsgId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150598:150701:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3413``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3413()

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3413``—``3415`` 行；所属函数 ``onConfirm callback @ 3402``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:150734:150881:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3416``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3416(error)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3416``—``3418`` 行；所属函数 ``onConfirm callback @ 3402``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。
