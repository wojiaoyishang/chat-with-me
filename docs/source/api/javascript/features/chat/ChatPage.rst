src/features/chat/ChatPage 模块
=============================

.. js:module:: src/features/chat/ChatPage

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ChatPage.jsx``
* **模块标识**：``src/features/chat/ChatPage``
* **顶层函数/组件/Hook**：15
* **类**：0
* **局部函数与匿名回调**：244

主要依赖
--------

``react``、``use-immer``、``immer``、``@/lib/tools.jsx``、``sonner``、``framer-motion``、``@/context/useEventStore.jsx``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/DeleteConfirmDialog``、``@/features/chat/page/components/MessageOverviewDialog.jsx``、``@/features/chat/page/components/QuickUserMessageNavigator.jsx``、``@/features/story/StoryReader.jsx``、``@/features/workspace/useWorkspaceTransferStore.js``、``./attachmentVision.js``、``./modelCapabilities.js``、``./widgets/WidgetPresentationContext.jsx``、``@/lib/browserHistoryLayers.js``、``@/features/chat/page/utils/messageSummaries.js``、``@/features/chat``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2219:2319:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``63`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value \|\| 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value \|\| 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2368:2509:FUNCTION

.. js:function:: getBrowserSpeechRecognitionConstructor()

   读取与 ``Browser Speech Recognition Constructor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``65``—``68`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.SpeechRecognition \|\| window.webkitSpeechRecognition \|\| null``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2554:2795:FUNCTION

.. js:function:: normalizeSpeechRecognitionLanguage(language)

   规范化与 ``Speech Recognition Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``76`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'en-US'``、``'zh-CN'``、``value``。

   **主要协作调用**：``String(language \|\| '').trim``、``String``、``value.toLowerCase().startsWith``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2927:3077:FUNCTION

.. js:function:: sleep(delay)

   实现 ``sleep`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``86`` 行。

   **参数**

   ``delay``
      调用方传入的 ``delay`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3102:3155:FUNCTION

.. js:function:: getAsrEndpoint()

   读取与 ``Asr Endpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``88`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(apiEndpoint?.ASR_ENDPOINT \|\| '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3185:3340:FUNCTION

.. js:function:: joinAsrTaskEndpoint(endpoint, id)

   实现 ``joinAsrTaskEndpoint`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``93`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\`${baseEndpoint}/${encodeURIComponent(String(id))}\```。

   **主要协作调用**：``String(endpoint \|\| '').replace``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3361:3531:FUNCTION

.. js:function:: hasAsrText(data)

   实现 ``hasAsrText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``101`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3555:3607:FUNCTION

.. js:function:: isAsrFinished(data)

   判断与 ``Asr Finished`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``103``—``103`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``hasAsrText``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3634:3732:FUNCTION

.. js:function:: getAsrTextResult(data)

   读取与 ``Asr Text Result`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``108`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{text: String(data.text ?? '')}``。

   **主要协作调用**：``hasAsrText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3756:3901:FUNCTION

.. js:function:: getAsrTimeout(data)

   读取与 ``Asr Timeout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``110``—``113`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:3932:4576:FUNCTION

.. js:function:: getPcm16kRequestBody(payload)

   读取与 ``Pcm16k Request Body`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``137`` 行。

   **参数**

   ``payload``
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof Blob !== 'undefined' ? new Blob([buffer], {type: ASR_AUDIO_MIME_TYPE}) : buffer``、``typeof Blob !== 'undefined' ? new Blob([pcmBuffer], {type: ASR_AUDIO_MIME_TYPE}) : pcmBuffer``、``payload.blob``、``null``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``ArrayBuffer.isView``、``pcm16k.buffer.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4608:4752:FUNCTION

.. js:function:: translateWithFallback(t, key, fallback, options)

   实现 ``translateWithFallback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``139``—``142`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:4791:4976:FUNCTION

.. js:function:: getReplacementPayloadContent(entry)

   读取与 ``Replacement Payload Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``144``—``148`` 行。

   **参数**

   ``entry``
      调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``entry``、``''``、``entry.frontend ?? entry.content ?? entry.value ?? ''``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5015:6393:FUNCTION

.. js:function:: collectTaskInterruptReceipts(messageOrReplacementUpdates)

   实现 ``collectTaskInterruptReceipts`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``150``—``187`` 行。

   **参数**

   ``messageOrReplacementUpdates``
      调用方传入的 ``messageOrReplacementUpdates`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``receipts``。

   **主要协作调用**：``Object.values(messageOrReplacementUpdates \|\| {}).forEach``、``Object.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:6394:138900:FUNCTION

.. js:function:: ChatPage({ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…)

   渲染 ``ChatPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``191``—``3216`` 行。

   **参数**

   ``{ conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…``
      调用方传入的 `` conversationId, documentId, pageType, onNewConversationId, showWindowButton = true, showMinimizeB…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WidgetPresentationProvider chatBoxHostElement={widgetChatBoxHostElement} > <> <motion.div ref={windowRef} className={\`flex overflow-hidden bg-white ${ isWindowMode ? 'shadow-2x…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useRef``、``generateUUID``、``useState``、``useImmer``、``useLocalSetting``、``useIsMobile``、``t``、``useEffect``、``useCallback``、``useChatWindowMode``、``useChatScroll``。

   **内部回调数量**：77。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:2951:3076:FUNCTION

.. rubric:: ``anonymous callback @ 83``

.. code-block:: javascript

   anonymous callback @ 83(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``86`` 行；所属函数 ``sleep``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``timer``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5166:6367:FUNCTION

.. rubric:: ``Object.values(messageOrReplacementUpdates \|\| {}).forEach callback @ 154``

.. code-block:: javascript

   Object.values(messageOrReplacementUpdates || {}).forEach callback @ 154(outerValue)

作为 ``Object.values(messageOrReplacementUpdates \|\| {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``184`` 行；所属函数 ``collectTaskInterruptReceipts``。

**参数**

``outerValue``
   调用方传入的 ``outerValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.values(replacementMap).forEach``、``Object.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5511:6359:FUNCTION

.. rubric:: ``Object.values(replacementMap).forEach callback @ 163``

.. code-block:: javascript

   Object.values(replacementMap).forEach callback @ 163(entry)

作为 ``Object.values(replacementMap).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``163``—``183`` 行；所属函数 ``Object.values(messageOrReplacementUpdates \|\| {}).forEach callback @ 154``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(getReplacementPayloadContent(entry) \|\| '').trim``、``String``、``getReplacementPayloadContent``、``rawContent.startsWith``、``JSON.parse``、``Array.isArray``、``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:5857:6259:FUNCTION

.. rubric:: ``items.forEach callback @ 171``

.. code-block:: javascript

   items.forEach callback @ 171(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``171``—``179`` 行；所属函数 ``Object.values(replacementMap).forEach callback @ 163``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(item?.requestId \|\| '').trim``、``String``、``seen.has``、``seen.add``、``receipts.push``、``String(item?.taskRunId \|\| parsed?.taskRunId \|\| '').trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10167:10205:FUNCTION

.. rubric:: ``useState callback @ 260``

.. code-block:: javascript

   useState callback @ 260()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10599:10662:FUNCTION

.. rubric:: ``useEffect callback @ 268``

.. code-block:: javascript

   useEffect callback @ 268()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``268``—``270`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10697:10905:FUNCTION

.. rubric:: ``useEffect callback @ 272``

.. code-block:: javascript

   useEffect callback @ 272()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``272``—``277`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10702:10905:FUNCTION

.. rubric:: ``anonymous callback @ 272``

.. code-block:: javascript

   anonymous callback @ 272()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``272``—``277`` 行；所属函数 ``useEffect callback @ 272``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:10965:11916:FUNCTION

.. rubric:: ``useCallback callback @ 279``

.. code-block:: javascript

   useCallback callback @ 279(nextState)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``279``—``298`` 行；所属函数 ``ChatPage``。

**参数**

``nextState``
   调用方传入的 ``nextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setContextCompactionState``、``String(normalized?.status \|\| '').toLowerCase``、``String``、``['completed', 'failed', 'discarded'].includes``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11573:11891:FUNCTION

.. rubric:: ``setTimeout callback @ 289``

.. code-block:: javascript

   setTimeout callback @ 289()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``289``—``296`` 行；所属函数 ``useCallback callback @ 279``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContextCompactionState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:11623:11812:FUNCTION

.. rubric:: ``setContextCompactionState callback @ 290``

.. code-block:: javascript

   setContextCompactionState callback @ 290(current)

设置与 ``Context Compaction State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``290``—``294`` 行；所属函数 ``setTimeout callback @ 289``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13293:14001:FUNCTION

.. rubric:: ``useCallback callback @ 346``

.. code-block:: javascript

   useCallback callback @ 346(sourceMessages)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``346``—``361`` 行；所属函数 ``ChatPage``。

**参数**

``sourceMessages``（默认值 ``{}``）
   调用方传入的 ``sourceMessages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``produce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13341:14000:FUNCTION

.. rubric:: ``produce callback @ 346``

.. code-block:: javascript

   produce callback @ 346(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``346``—``361`` 行；所属函数 ``useCallback callback @ 346``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(draft \|\| {}).forEach``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13396:13992:FUNCTION

.. rubric:: ``Object.keys(draft \|\| {}).forEach callback @ 347``

.. code-block:: javascript

   Object.keys(draft || {}).forEach callback @ 347(key)

作为 ``Object.keys(draft \|\| {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``347``—``360`` 行；所属函数 ``produce callback @ 346``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13666:13772:FUNCTION

.. rubric:: ``anonymous callback @ 353``

.. code-block:: javascript

   anonymous callback @ 353(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``353``—``355`` 行；所属函数 ``Object.keys(draft \|\| {}).forEach callback @ 347``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13816:13900:FUNCTION

.. rubric:: ``anonymous callback @ 356``

.. code-block:: javascript

   anonymous callback @ 356(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``356``—``358`` 行；所属函数 ``Object.keys(draft \|\| {}).forEach callback @ 347``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:13937:13981:FUNCTION

.. rubric:: ``anonymous callback @ 359``

.. code-block:: javascript

   anonymous callback @ 359(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``359``—``359`` 行；所属函数 ``Object.keys(draft \|\| {}).forEach callback @ 347``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:14054:16517:FUNCTION

.. rubric:: ``useCallback callback @ 363``

.. code-block:: javascript

   async useCallback callback @ 363({silent = false, append = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``363``—``423`` 行；所属函数 ``ChatPage``。

**参数**

``{silent = false, append = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false, append = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``existingItems``、``nextItems``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMessageSummaries``、``setMessageSummaryLoading``、``getMessageSummaryAppendCursor``、``apiClient.get``、``collected.push``、``mergeMessageSummaryItems``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16629:17067:FUNCTION

.. rubric:: ``useCallback callback @ 426``

.. code-block:: javascript

   useCallback callback @ 426(modelListRef)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``426``—``438`` 行；所属函数 ``ChatPage``。

**参数**

``modelListRef``
   调用方传入的 ``modelListRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modelListRef.current.querySelector``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:16851:17035:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 430``

.. code-block:: javascript

   requestAnimationFrame callback @ 430()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``430``—``435`` 行；所属函数 ``useCallback callback @ 426``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedItem.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17122:17303:FUNCTION

.. rubric:: ``useCallback callback @ 439``

.. code-block:: javascript

   useCallback callback @ 439(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``439``—``446`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17368:17630:FUNCTION

.. rubric:: ``useCallback callback @ 447``

.. code-block:: javascript

   useCallback callback @ 447(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``447``—``455`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedModel``、``setAdvancedSettings``、``Array.isArray``、``setIsModelPopoverOpen``、``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:17695:17784:FUNCTION

.. rubric:: ``useCallback callback @ 456``

.. code-block:: javascript

   useCallback callback @ 456(model)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``456``—``460`` 行；所属函数 ``ChatPage``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewModel``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18227:18375:FUNCTION

.. rubric:: ``useCallback callback @ 477``

.. code-block:: javascript

   useCallback callback @ 477()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``477``—``481`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeVoiceRecognitionEngine( getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote') )``。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18442:18721:FUNCTION

.. rubric:: ``useCallback callback @ 483``

.. code-block:: javascript

   useCallback callback @ 483()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``483``—``488`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizeSpeechRecognitionLanguage( getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage) )``。

**主要协作调用**：``normalizeSpeechRecognitionLanguage``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:18796:19887:FUNCTION

.. rubric:: ``useCallback callback @ 490``

.. code-block:: javascript

   useCallback callback @ 490({cancel = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``490``—``523`` 行；所属函数 ``ChatPage``。

**参数**

``{cancel = false}``（默认值 ``{}``）
   调用方传入的 ``cancel = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve({text: '', error: null})``、``new Promise((resolve) => { let settled = false; const settle = () => { if (settled) return; settled = true; window.clearTimeout?.(timer); const text = cancel ? '' : \`${session.fin…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19110:19879:FUNCTION

.. rubric:: ``anonymous callback @ 499``

.. code-block:: javascript

   anonymous callback @ 499(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``499``—``522`` 行；所属函数 ``useCallback callback @ 490``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``recognition.abort``、``recognition.stop``、``settle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19184:19485:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle()

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``501``—``507`` 行；所属函数 ``anonymous callback @ 499``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``\`${session.finalTranscript} ${session.interimTranscript}\`.trim``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:19949:21773:FUNCTION

.. rubric:: ``useCallback callback @ 525``

.. code-block:: javascript

   useCallback callback @ 525()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``525``—``580`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``getBrowserSpeechRecognitionConstructor``、``toast.error``、``t``、``stopBrowserSpeechRecognition``、``getDefaultVoiceRecognitionLanguage``、``recognition.start``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:20702:21316:FUNCTION

.. rubric:: ``anonymous callback @ 547``

.. code-block:: javascript

   anonymous callback @ 547(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``547``—``562`` 行；所属函数 ``useCallback callback @ 525``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\`${session.finalTranscript} ${transcript}\`.trim``、``\`${interimTranscript} ${transcript}\`.trim``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21348:21422:FUNCTION

.. rubric:: ``anonymous callback @ 564``

.. code-block:: javascript

   anonymous callback @ 564(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``564``—``566`` 行；所属函数 ``useCallback callback @ 525``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21452:21461:FUNCTION

.. rubric:: ``anonymous callback @ 568``

.. code-block:: javascript

   anonymous callback @ 568()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``568``—``568`` 行；所属函数 ``useCallback callback @ 525``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:21898:22430:FUNCTION

.. rubric:: ``useCallback callback @ 582``

.. code-block:: javascript

   useCallback callback @ 582()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``582``—``598`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{engine: 'remote'}``、``{engine: 'remote', fallback: true}``、``{engine: 'local'}``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``startBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:22551:25277:FUNCTION

.. rubric:: ``useCallback callback @ 600``

.. code-block:: javascript

   async useCallback callback @ 600(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``600``—``677`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``initialTextResult``、``pollingTextResult``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('ASR task id is missing.')``。

**主要协作调用**：``getAsrEndpoint``、``toast.error``、``translateWithFallback``、``getPcm16kRequestBody``、``apiClient.post``、``getAsrTextResult``、``isAsrFinished``、``getAsrTimeout``、``Date.now``、``joinAsrTaskEndpoint``、``sleep``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:25330:26113:FUNCTION

.. rubric:: ``useCallback callback @ 679``

.. code-block:: javascript

   async useCallback callback @ 679(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``679``—``701`` 行；所属函数 ``ChatPage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{text}``、``null``、``handleRemoteVoicePcmReady(payload)``。

**主要协作调用**：``getDefaultVoiceRecognitionEngine``、``stopBrowserSpeechRecognition``、``['aborted', 'no-speech'].includes``、``String``、``toast.error``、``t``、``toast.info``、``handleRemoteVoicePcmReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26264:26391:FUNCTION

.. rubric:: ``useCallback callback @ 703``

.. code-block:: javascript

   useCallback callback @ 703()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``703``—``706`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopBrowserSpeechRecognition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:26907:27024:FUNCTION

.. rubric:: ``useCallback callback @ 722``

.. code-block:: javascript

   useCallback callback @ 722()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``722``—``724`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyNavigationLockedRef.current \|\| Date.now() < userAutoScrollUnlockUntilRef.current``。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27079:27190:FUNCTION

.. rubric:: ``useCallback callback @ 726``

.. code-block:: javascript

   useCallback callback @ 726(duration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``726``—``728`` 行；所属函数 ``ChatPage``。

**参数**

``duration``（默认值 ``450``）
   调用方传入的 ``duration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27246:27648:FUNCTION

.. rubric:: ``useCallback callback @ 731``

.. code-block:: javascript

   useCallback callback @ 731()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``731``—``740`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:27774:28017:FUNCTION

.. rubric:: ``useCallback callback @ 742``

.. code-block:: javascript

   useCallback callback @ 742()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``742``—``748`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28256:29756:FUNCTION

.. rubric:: ``useCallback callback @ 752``

.. code-block:: javascript

   useCallback callback @ 752(shouldAutoScroll, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``752``—``794`` 行；所属函数 ``ChatPage``。

**参数**

``shouldAutoScroll``（默认值 ``isAutoScrollEnabledRef.current``）
   调用方传入的 ``shouldAutoScroll`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``、``runAfterPaint``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:28408:29366:FUNCTION

.. rubric:: ``doScroll``

.. code-block:: javascript

   doScroll()

实现 ``doScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``755``—``779`` 行；所属函数 ``useCallback callback @ 752``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``smoothScrollToBottom``、``requestScrollToBottom``、``checkScrollPosition``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29398:29621:FUNCTION

.. rubric:: ``runAfterPaint``

.. code-block:: javascript

   runAfterPaint()

实现 ``runAfterPaint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``781``—``787`` 行；所属函数 ``useCallback callback @ 752``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:29441:29609:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 782``

.. code-block:: javascript

   requestAnimationFrame callback @ 782()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``782``—``786`` 行；所属函数 ``runAfterPaint``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``doScroll``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30071:31166:FUNCTION

.. rubric:: ``useCallback callback @ 805``

.. code-block:: javascript

   useCallback callback @ 805(preview)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``805``—``830`` 行；所属函数 ``ChatPage``。

**参数**

``preview``
   调用方传入的 ``preview`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(preview?.requestId \|\| '').trim``、``String``、``String(preview?.taskRunId \|\| '').trim``、``String(preview?.content \|\| '').trim``、``taskInterruptDividerShownRef.current.has``、``collectTaskInterruptReceipts(messagesRef.current) .some``、``collectTaskInterruptReceipts``、``taskInterruptDividerShownRef.current.add``、``setTaskInterruptPreviews``、``scrollToBottomAfterRender``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30516:30554:FUNCTION

.. rubric:: ``collectTaskInterruptReceipts(messagesRef.current) .some callback @ 813``

.. code-block:: javascript

   collectTaskInterruptReceipts(messagesRef.current) .some callback @ 813(item)

作为 ``collectTaskInterruptReceipts(messagesRef.current) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``813``—``813`` 行；所属函数 ``useCallback callback @ 805``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30718:31078:FUNCTION

.. rubric:: ``setTaskInterruptPreviews callback @ 817``

.. code-block:: javascript

   setTaskInterruptPreviews callback @ 817(current)

设置与 ``Task Interrupt Previews`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``817``—``827`` 行；所属函数 ``useCallback callback @ 805``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``[...current, { requestId, taskRunId, content, createdAt: preview?.createdAt \|\| Date.now(), pending: true, showDivider, }]``。

**主要协作调用**：``current.some``、``Date.now``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:30762:30800:FUNCTION

.. rubric:: ``current.some callback @ 818``

.. code-block:: javascript

   current.some callback @ 818(item)

作为 ``current.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``818``—``818`` 行；所属函数 ``setTaskInterruptPreviews callback @ 817``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31273:32707:FUNCTION

.. rubric:: ``useCallback callback @ 832``

.. code-block:: javascript

   useCallback callback @ 832({requestId, success})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``832``—``864`` 行；所属函数 ``ChatPage``。

**参数**

``{requestId, success}``
   调用方传入的 ``requestId, success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(requestId \|\| '').trim``、``String``、``setTaskInterruptPreviews``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31445:32699:FUNCTION

.. rubric:: ``setTaskInterruptPreviews callback @ 836``

.. code-block:: javascript

   setTaskInterruptPreviews callback @ 836(current)

设置与 ``Task Interrupt Previews`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``836``—``863`` 行；所属函数 ``useCallback callback @ 832``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``remaining``、``remaining.map((item, index) => ( index === nextGroupIndex ? {...item, showDivider: true} : item ))``、``current.map((item) => ( item.requestId === normalizedRequestId ? {...item, pending: false} : item ))``。

**主要协作调用**：``current.find``、``current.filter``、``remaining.findIndex``、``remaining.map``、``collectTaskInterruptReceipts(messagesRef.current) .some``、``collectTaskInterruptReceipts``、``taskInterruptDividerShownRef.current.delete``、``current.map``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31536:31584:FUNCTION

.. rubric:: ``current.find callback @ 838``

.. code-block:: javascript

   current.find callback @ 838(item)

作为 ``current.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``838``—``838`` 行；所属函数 ``setTaskInterruptPreviews callback @ 836``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31636:31684:FUNCTION

.. rubric:: ``current.filter callback @ 839``

.. code-block:: javascript

   current.filter callback @ 839(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``839``—``839`` 行；所属函数 ``setTaskInterruptPreviews callback @ 836``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31811:31881:FUNCTION

.. rubric:: ``remaining.findIndex callback @ 843``

.. code-block:: javascript

   remaining.findIndex callback @ 843(item)

实现 ``remaining.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``843``—``843`` 行；所属函数 ``setTaskInterruptPreviews callback @ 836``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:31985:32112:FUNCTION

.. rubric:: ``remaining.map callback @ 846``

.. code-block:: javascript

   remaining.map callback @ 846(item, index)

作为 ``remaining.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``846``—``848`` 行；所属函数 ``setTaskInterruptPreviews callback @ 836``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32253:32302:FUNCTION

.. rubric:: ``collectTaskInterruptReceipts(messagesRef.current) .some callback @ 852``

.. code-block:: javascript

   collectTaskInterruptReceipts(messagesRef.current) .some callback @ 852(item)

作为 ``collectTaskInterruptReceipts(messagesRef.current) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``852``—``852`` 行；所属函数 ``setTaskInterruptPreviews callback @ 836``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32532:32687:FUNCTION

.. rubric:: ``current.map callback @ 858``

.. code-block:: javascript

   current.map callback @ 858(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``858``—``862`` 行；所属函数 ``setTaskInterruptPreviews callback @ 836``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32764:33107:FUNCTION

.. rubric:: ``useCallback callback @ 866``

.. code-block:: javascript

   useCallback callback @ 866(taskRunId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``866``—``873`` 行；所属函数 ``ChatPage``。

**参数**

``taskRunId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(taskRunId \|\| '').trim``、``String``、``setTaskInterruptPreviews``、``taskInterruptDividerShownRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32924:33025:FUNCTION

.. rubric:: ``setTaskInterruptPreviews callback @ 869``

.. code-block:: javascript

   setTaskInterruptPreviews callback @ 869(current)

设置与 ``Task Interrupt Previews`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``869``—``871`` 行；所属函数 ``useCallback callback @ 866``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:32966:33014:FUNCTION

.. rubric:: ``current.filter callback @ 870``

.. code-block:: javascript

   current.filter callback @ 870(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``870``—``870`` 行；所属函数 ``setTaskInterruptPreviews callback @ 869``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33176:34209:FUNCTION

.. rubric:: ``useCallback callback @ 875``

.. code-block:: javascript

   useCallback callback @ 875(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``875``—``903`` 行；所属函数 ``ChatPage``。

**参数**

``updates``
   调用方传入的 ``updates`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectTaskInterruptReceipts``、``receipts.map``、``receipts.map((item) => item.taskRunId).filter``、``receivedTaskRunIds.forEach``、``setTaskInterruptPreviews``、``globalThis.setTimeout``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33348:33372:FUNCTION

.. rubric:: ``receipts.map callback @ 879``

.. code-block:: javascript

   receipts.map callback @ 879(item)

作为 ``receipts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``879``—``879`` 行；所属函数 ``useCallback callback @ 875``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33445:33469:FUNCTION

.. rubric:: ``receipts.map callback @ 881``

.. code-block:: javascript

   receipts.map callback @ 881(item)

作为 ``receipts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``881``—``881`` 行；所属函数 ``useCallback callback @ 875``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33533:33624:FUNCTION

.. rubric:: ``receivedTaskRunIds.forEach callback @ 883``

.. code-block:: javascript

   receivedTaskRunIds.forEach callback @ 883(taskRunId)

作为 ``receivedTaskRunIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``883``—``885`` 行；所属函数 ``useCallback callback @ 875``。

**参数**

``taskRunId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``taskInterruptDividerShownRef.current.add``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33794:34003:FUNCTION

.. rubric:: ``setTaskInterruptPreviews callback @ 890``

.. code-block:: javascript

   setTaskInterruptPreviews callback @ 890(current)

设置与 ``Task Interrupt Previews`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``890``—``896`` 行；所属函数 ``useCallback callback @ 875``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:33833:33992:FUNCTION

.. rubric:: ``current.map callback @ 891``

.. code-block:: javascript

   current.map callback @ 891(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``891``—``895`` 行；所属函数 ``setTaskInterruptPreviews callback @ 890``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``receivedTaskRunIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34037:34197:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 898``

.. code-block:: javascript

   globalThis.setTimeout callback @ 898()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``898``—``902`` 行；所属函数 ``useCallback callback @ 875``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTaskInterruptPreviews``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34082:34185:FUNCTION

.. rubric:: ``setTaskInterruptPreviews callback @ 899``

.. code-block:: javascript

   setTaskInterruptPreviews callback @ 899(current)

设置与 ``Task Interrupt Previews`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``899``—``901`` 行；所属函数 ``globalThis.setTimeout callback @ 898``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34128:34170:FUNCTION

.. rubric:: ``current.filter callback @ 900``

.. code-block:: javascript

   current.filter callback @ 900(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``900``—``900`` 行；所属函数 ``setTaskInterruptPreviews callback @ 899``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``receivedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34231:34336:FUNCTION

.. rubric:: ``useEffect callback @ 905``

.. code-block:: javascript

   useEffect callback @ 905()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``905``—``908`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTaskInterruptPreviews``、``taskInterruptDividerShownRef.current.clear``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:34414:34803:FUNCTION

.. rubric:: ``useCallback callback @ 910``

.. code-block:: javascript

   useCallback callback @ 910()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``910``—``920`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``restoreLatestMessagesRef.current``、``markProgrammaticScroll``、``handleScrollToBottomClick``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:35937:36440:FUNCTION

.. rubric:: ``useCallback callback @ 958``

.. code-block:: javascript

   async useCallback callback @ 958()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``958``—``972`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``values``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setStories``、``apiClient.get``、``Array.isArray``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:36496:37078:FUNCTION

.. rubric:: ``useCallback callback @ 974``

.. code-block:: javascript

   async useCallback callback @ 974(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``974``—``987`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setActiveStory``、``setStoryReaderOpen``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37139:38094:FUNCTION

.. rubric:: ``useCallback callback @ 989``

.. code-block:: javascript

   async useCallback callback @ 989(storyId, title)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``989``—``1008`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37549:37654:FUNCTION

.. rubric:: ``setStories callback @ 999``

.. code-block:: javascript

   setStories callback @ 999(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``999``—``999`` 行；所属函数 ``useCallback callback @ 989``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37572:37653:FUNCTION

.. rubric:: ``current.map callback @ 999``

.. code-block:: javascript

   current.map callback @ 999(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``999``—``999`` 行；所属函数 ``setStories callback @ 999``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:37688:37782:FUNCTION

.. rubric:: ``setActiveStory callback @ 1000``

.. code-block:: javascript

   setActiveStory callback @ 1000(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1000``—``1000`` 行；所属函数 ``useCallback callback @ 989``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38155:39019:FUNCTION

.. rubric:: ``useCallback callback @ 1010``

.. code-block:: javascript

   async useCallback callback @ 1010(storyId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1010``—``1028`` 行；所属函数 ``ChatPage``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``error``。

**主要协作调用**：``apiClient.delete``、``setStories``、``setActiveStory``、``toast.success``、``t``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38399:38474:FUNCTION

.. rubric:: ``setStories callback @ 1014``

.. code-block:: javascript

   setStories callback @ 1014(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1014``—``1014`` 行；所属函数 ``useCallback callback @ 1010``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38425:38473:FUNCTION

.. rubric:: ``current.filter callback @ 1014``

.. code-block:: javascript

   current.filter callback @ 1014(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1014``—``1014`` 行；所属函数 ``setStories callback @ 1014``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:38504:38728:FUNCTION

.. rubric:: ``setActiveStory callback @ 1015``

.. code-block:: javascript

   setActiveStory callback @ 1015(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1015``—``1021`` 行；所属函数 ``useCallback callback @ 1010``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39083:39375:FUNCTION

.. rubric:: ``useCallback callback @ 1030``

.. code-block:: javascript

   useCallback callback @ 1030(story, part)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1030``—``1037`` 行；所属函数 ``ChatPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``handleSpeakContentRequest({ messageId: \`story:${story.storyId}:part:${part.partId}\`, text, })``。

**主要协作调用**：``[part.title, part.bodyMarkdown].filter(Boolean).join``、``[part.title, part.bodyMarkdown].filter``、``handleSpeakContentRequest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39422:39523:FUNCTION

.. rubric:: ``useEffect callback @ 1039``

.. code-block:: javascript

   useEffect callback @ 1039()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1039``—``1043`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadStories``、``setStoryReaderOpen``、``setActiveStory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39572:42656:FUNCTION

.. rubric:: ``useEffect callback @ 1045``

.. code-block:: javascript

   useEffect callback @ 1045()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1045``—``1117`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include…``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:39747:42655:FUNCTION

.. rubric:: ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049``

.. code-block:: javascript

   onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049({event, payload})

处理 ``Event({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversation Id, include…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1049``—``1117`` 行；所属函数 ``useEffect callback @ 1045``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openStory``、``Number``、``setStories``、``setActiveStory``、``['created', 'renamed'].includes``、``loadStories().then``、``loadStories``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40038:40107:FUNCTION

.. rubric:: ``setStories callback @ 1057``

.. code-block:: javascript

   setStories callback @ 1057(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1057``—``1057`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40064:40106:FUNCTION

.. rubric:: ``current.filter callback @ 1057``

.. code-block:: javascript

   current.filter callback @ 1057(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1057``—``1057`` 行；所属函数 ``setStories callback @ 1057``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40137:40355:FUNCTION

.. rubric:: ``setActiveStory callback @ 1058``

.. code-block:: javascript

   setActiveStory callback @ 1058(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1058``—``1064`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``current``。

**主要协作调用**：``Number``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40794:41231:FUNCTION

.. rubric:: ``loadStories().then callback @ 1078``

.. code-block:: javascript

   loadStories().then callback @ 1078(values)

处理 ``loadStories().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1078``—``1088`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40837:41215:FUNCTION

.. rubric:: ``setActiveStory callback @ 1079``

.. code-block:: javascript

   setActiveStory callback @ 1079(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1079``—``1087`` 行；所属函数 ``loadStories().then callback @ 1078``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``null``。

**主要协作调用**：``values.some``、``setStoryReaderOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:40957:41013:FUNCTION

.. rubric:: ``values.some callback @ 1081``

.. code-block:: javascript

   values.some callback @ 1081(item)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1081``—``1081`` 行；所属函数 ``setActiveStory callback @ 1079``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41264:41759:FUNCTION

.. rubric:: ``setStories callback @ 1091``

.. code-block:: javascript

   setStories callback @ 1091(current)

设置与 ``Stories`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1091``—``1101`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``current.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41321:41383:FUNCTION

.. rubric:: ``current.findIndex callback @ 1092``

.. code-block:: javascript

   current.findIndex callback @ 1092(item)

实现 ``current.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1092``—``1092`` 行；所属函数 ``setStories callback @ 1091``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:41785:42647:FUNCTION

.. rubric:: ``setActiveStory callback @ 1102``

.. code-block:: javascript

   setActiveStory callback @ 1102(current)

设置与 ``Active Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1102``—``1116`` 行；所属函数 ``onEvent({ event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'], conversationId, include… callback @ 1049``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``next``。

**主要协作调用**：``Number``、``Array.isArray``、``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort``、``existing.filter``、``(current.parts \|\| []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42293:42334:FUNCTION

.. rubric:: ``existing.filter callback @ 1110``

.. code-block:: javascript

   existing.filter callback @ 1110(item)

作为 ``existing.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1110``—``1110`` 行；所属函数 ``setActiveStory callback @ 1102``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42375:42408:FUNCTION

.. rubric:: ``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback @ 1111``

.. code-block:: javascript

   [...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback @ 1111(a, b)

作为 ``[...existing.filter(item => item.partId !== value.part.partId), value.part] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1111``—``1111`` 行；所属函数 ``setActiveStory callback @ 1102``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42535:42596:FUNCTION

.. rubric:: ``(current.parts \|\| []).map callback @ 1113``

.. code-block:: javascript

   (current.parts || []).map callback @ 1113(item)

作为 ``(current.parts \|\| []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1113``—``1113`` 行；所属函数 ``setActiveStory callback @ 1102``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:42781:44691:FUNCTION

.. rubric:: ``useCallback callback @ 1122``

.. code-block:: javascript

   useCallback callback @ 1122(msgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1122``—``1183`` 行；所属函数 ``ChatPage``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``toast.error``、``t``、``currentOrder.indexOf``、``Array.isArray``、``oldChildren.indexOf``、``oldChildren.filter``、``setMessages``、``loadSwitchMessage``、``currentOrder.slice``、``setMessagesOrder``、``scrollToBottomAfterRender``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:43777:43805:FUNCTION

.. rubric:: ``oldChildren.filter callback @ 1151``

.. code-block:: javascript

   oldChildren.filter callback @ 1151(childId)

作为 ``oldChildren.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1151``—``1151`` 行；所属函数 ``useCallback callback @ 1122``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:44903:48359:FUNCTION

.. rubric:: ``useCallback callback @ 1192``

.. code-block:: javascript

   useCallback callback @ 1192({ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1192``—``1281`` 行；所属函数 ``ChatPage``。

**参数**

``{ messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…``
   调用方传入的 `` messageContent, toolsStatus, isEditMessage = false, editMessageId, attachments, sendButtonStatus,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``toast.error``、``t``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p…``、``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then``、``emitEvent``、``sendMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:45373:47185:FUNCTION

.. rubric:: ``sendMessage``

.. code-block:: javascript

   sendMessage(conversationId)

发送与 ``Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1210``—``1254`` 行；所属函数 ``useCallback callback @ 1192``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``setIsFirstMessageSend``、``generateUUID``、``getVisionAttachmentIds``、``emitEvent(eventPayload).then``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:46872:47141:FUNCTION

.. rubric:: ``emitEvent(eventPayload).then callback @ 1246``

.. code-block:: javascript

   emitEvent(eventPayload).then callback @ 1246(payload)

处理 ``emitEvent(eventPayload).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1246``—``1252`` 行；所属函数 ``sendMessage``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``generateUUID``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:47443:48136:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1262``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback @ 1262(payload)

处理 ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1262``—``1274`` 行；所属函数 ``useCallback callback @ 1192``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``new Error(payload.value)``。

**主要协作调用**：``setIsNewConversationId``、``onNewConversationId``、``sendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48161:48283:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p… callback @ 1275``

.. code-block:: javascript

   emitEvent({ event: 'conversation.create', payload: { idempotencyKey: currentTurnIdempotencyKeyRef.current } }) .then((p… callback @ 1275(error)

发送事件与 ``Event({ event: 'conversation.create', payload: { idempotency Key: current Turn Idempotency Key Ref.current } }) .then((p…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1275``—``1277`` 行；所属函数 ``useCallback callback @ 1192``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:48539:51375:FUNCTION

.. rubric:: ``useCallback callback @ 1283``

.. code-block:: javascript

   async useCallback callback @ 1283()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1283``—``1348`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``historyLoadInFlightRef.current``、``false``、``request``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoadingMoreHistory``、``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49198:51000:FUNCTION

.. rubric:: ``anonymous callback @ 1298``

.. code-block:: javascript

   async anonymous callback @ 1298()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1298``—``1337`` 行；所属函数 ``useCallback callback @ 1283``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``latestOrder.slice``、``(data.messagesOrder \|\| []).filter``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``Math.max``、``markProgrammaticScroll``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:49868:49906:FUNCTION

.. rubric:: ``(data.messagesOrder \|\| []).filter callback @ 1311``

.. code-block:: javascript

   (data.messagesOrder || []).filter callback @ 1311(messageId)

作为 ``(data.messagesOrder \|\| []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1311``—``1311`` 行；所属函数 ``anonymous callback @ 1298``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50435:50538:FUNCTION

.. rubric:: ``anonymous callback @ 1325``

.. code-block:: javascript

   anonymous callback @ 1325(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1325``—``1327`` 行；所属函数 ``anonymous callback @ 1298``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:50486:50522:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1326``

.. code-block:: javascript

   requestAnimationFrame callback @ 1326()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1326``—``1326`` 行；所属函数 ``anonymous callback @ 1325``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51012:51292:FUNCTION

.. rubric:: ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1337``

.. code-block:: javascript

   (async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers… callback @ 1337()

实现 ``(async () => { const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, { params: { conversationId: convers…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1337``—``1344`` 行；所属函数 ``useCallback callback @ 1283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:51592:52532:FUNCTION

.. rubric:: ``useEffect callback @ 1358``

.. code-block:: javascript

   useEffect callback @ 1358()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1358``—``1382`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``container?.querySelector``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52058:52317:FUNCTION

.. rubric:: ``anonymous callback @ 1369``

.. code-block:: javascript

   anonymous callback @ 1369(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1369``—``1374`` 行；所属函数 ``useEffect callback @ 1358``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``entries.some``、``loadMoreHistory().catch``、``loadMoreHistory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52103:52132:FUNCTION

.. rubric:: ``entries.some callback @ 1370``

.. code-block:: javascript

   entries.some callback @ 1370(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1370``—``1370`` 行；所属函数 ``anonymous callback @ 1369``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52179:52305:FUNCTION

.. rubric:: ``loadMoreHistory().catch callback @ 1371``

.. code-block:: javascript

   loadMoreHistory().catch callback @ 1371(error)

处理 ``loadMoreHistory().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1371``—``1373`` 行；所属函数 ``anonymous callback @ 1369``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52497:52525:FUNCTION

.. rubric:: ``returned callback @ 1381``

.. code-block:: javascript

   returned callback @ 1381()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1381``—``1381`` 行；所属函数 ``useEffect callback @ 1358``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:52659:53568:FUNCTION

.. rubric:: ``useCallback callback @ 1384``

.. code-block:: javascript

   useCallback callback @ 1384(messageId, behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1384``—``1402`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53420:53533:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1398``

.. code-block:: javascript

   window.setTimeout callback @ 1398()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1398``—``1400`` 行；所属函数 ``useCallback callback @ 1384``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53464:53521:FUNCTION

.. rubric:: ``setHighlightedMessageId callback @ 1399``

.. code-block:: javascript

   setHighlightedMessageId callback @ 1399(current)

设置与 ``Highlighted Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1399``—``1399`` 行；所属函数 ``window.setTimeout callback @ 1398``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:53691:55182:FUNCTION

.. rubric:: ``useCallback callback @ 1404``

.. code-block:: javascript

   async useCallback callback @ 1404()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1404``—``1439`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``setHighlightedMessageId``、``requestAnimationFrame``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54709:54987:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1426``

.. code-block:: javascript

   requestAnimationFrame callback @ 1426()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1426``—``1433`` 行；所属函数 ``useCallback callback @ 1404``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:54755:54971:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1427``

.. code-block:: javascript

   requestAnimationFrame callback @ 1427()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1427``—``1432`` 行；所属函数 ``requestAnimationFrame callback @ 1426``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``checkScrollPosition``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55440:55702:FUNCTION

.. rubric:: ``useEffect callback @ 1451``

.. code-block:: javascript

   useEffect callback @ 1451()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1451``—``1458`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (restoreLatestMessagesRef.current === restoreLatestMessages) { restoreLatestMessagesRef.current = null; } }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55528:55695:FUNCTION

.. rubric:: ``returned callback @ 1453``

.. code-block:: javascript

   returned callback @ 1453()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1453``—``1457`` 行；所属函数 ``useEffect callback @ 1451``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55769:58734:FUNCTION

.. rubric:: ``useCallback callback @ 1460``

.. code-block:: javascript

   async useCallback callback @ 1460(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1460``—``1526`` 行；所属函数 ``ChatPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``await loadTargetWindow(summaryItems, messageSummaryFingerprintRef.current)``、``await loadTargetWindow(refreshedItems, messageSummaryFingerprintRef.current)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**显式抛出**：``error``。

**主要协作调用**：``setMessageOverviewOpen``、``scrollToRenderedMessage``、``summaryItems.some``、``loadMessageSummaries``、``loadTargetWindow``、``Number``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:55964:57947:FUNCTION

.. rubric:: ``loadTargetWindow``

.. code-block:: javascript

   async loadTargetWindow(summaryItems, expectedOrderFingerprint)

加载与 ``Target Window`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1466``—``1507`` 行；所属函数 ``useCallback callback @ 1460``。

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

**显式抛出**：``new Error(t('jump_to_message_failed') \|\| '跳转消息失败')``。

**主要协作调用**：``summaryItems.findIndex``、``t``、``Math.max``、``Math.min``、``summaryItems.slice(start, end).map``、``summaryItems.slice``、``apiClient.post``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``setHistoryAutoLoadReady``、``setShowScrollToBottomButton``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56073:56109:FUNCTION

.. rubric:: ``summaryItems.findIndex callback @ 1467``

.. code-block:: javascript

   summaryItems.findIndex callback @ 1467(item)

实现 ``summaryItems.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1467``—``1467`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:56472:56494:FUNCTION

.. rubric:: ``summaryItems.slice(start, end).map callback @ 1474``

.. code-block:: javascript

   summaryItems.slice(start, end).map callback @ 1474(item)

作为 ``summaryItems.slice(start, end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1474``—``1474`` 行；所属函数 ``loadTargetWindow``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57656:57759:FUNCTION

.. rubric:: ``anonymous callback @ 1500``

.. code-block:: javascript

   anonymous callback @ 1500(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1500``—``1502`` 行；所属函数 ``loadTargetWindow``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:57707:57743:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1501``

.. code-block:: javascript

   requestAnimationFrame callback @ 1501()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1501``—``1501`` 行；所属函数 ``anonymous callback @ 1500``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:58059:58095:FUNCTION

.. rubric:: ``summaryItems.some callback @ 1511``

.. code-block:: javascript

   summaryItems.some callback @ 1511(item)

作为 ``summaryItems.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1511``—``1511`` 行；所属函数 ``useCallback callback @ 1460``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:59029:62323:FUNCTION

.. rubric:: ``useCallback callback @ 1538``

.. code-block:: javascript

   async useCallback callback @ 1538(msgId, newMsgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1538``—``1627`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61131:62204:FUNCTION

.. rubric:: ``produce callback @ 1589``

.. code-block:: javascript

   produce callback @ 1589(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1589``—``1622`` 行；所属函数 ``useCallback callback @ 1538``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61738:61852:FUNCTION

.. rubric:: ``anonymous callback @ 1608``

.. code-block:: javascript

   anonymous callback @ 1608(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1608``—``1610`` 行；所属函数 ``produce callback @ 1589``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:61927:62019:FUNCTION

.. rubric:: ``anonymous callback @ 1613``

.. code-block:: javascript

   anonymous callback @ 1613(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1613``—``1615`` 行；所属函数 ``produce callback @ 1589``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62087:62179:FUNCTION

.. rubric:: ``anonymous callback @ 1618``

.. code-block:: javascript

   anonymous callback @ 1618(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1618``—``1620`` 行；所属函数 ``produce callback @ 1589``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:62417:63556:FUNCTION

.. rubric:: ``useCallback callback @ 1629``

.. code-block:: javascript

   async useCallback callback @ 1629(msg, msgId, targetMessageOrDelta, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1629``—``1658`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63652:64550:FUNCTION

.. rubric:: ``emitMessagesLoaded``

.. code-block:: javascript

   emitMessagesLoaded()

发送事件与 ``Messages Loaded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1660``—``1681`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:63680:64540:FUNCTION

.. rubric:: ``setTimeout callback @ 1661``

.. code-block:: javascript

   setTimeout callback @ 1661()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1661``—``1680`` 行；所属函数 ``emitMessagesLoaded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,…``、``emitEvent``、``messagesOrderRef.current.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64155:64240:FUNCTION

.. rubric:: ``onTimeout``

.. code-block:: javascript

   onTimeout()

处理 ``Timeout`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1670``—``1672`` 行；所属函数 ``setTimeout callback @ 1661``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.warning``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64261:64528:FUNCTION

.. rubric:: ``emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 1673``

.. code-block:: javascript

   emitEvent({ event: 'conversation.messages.loaded', payload: { idempotencyKey: messagesLoadedIdempotencyKeyRef.current,… callback @ 1673(payload)

发送事件与 ``Event({ event: 'conversation.messages.loaded', payload: { idempotency Key: messages Loaded Idempotency Key Ref.current,…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1673``—``1679`` 行；所属函数 ``setTimeout callback @ 1661``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``generateUUID``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64566:66581:FUNCTION

.. rubric:: ``useEffect callback @ 1683``

.. code-block:: javascript

   useEffect callback @ 1683()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1683``—``1743`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) { cancelAnimationFrame(rafId); } resizeObserver.disconnect(); mutationObserver.disconnect(); }``。

**主要协作调用**：``observeElement``、``Array.from(container.children).forEach``、``Array.from``、``mutationObserver.observe``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:64767:65662:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1690``—``1712`` 行；所属函数 ``useEffect callback @ 1683``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65090:65650:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1698``

.. code-block:: javascript

   requestAnimationFrame callback @ 1698()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1698``—``1711`` 行；所属函数 ``scheduleCheck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``requestScrollToBottom``、``checkScrollPosition``、``isUserAutoScrollUnlocked``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:65762:65942:FUNCTION

.. rubric:: ``observeElement``

.. code-block:: javascript

   observeElement(element)

实现 ``observeElement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1716``—``1720`` 行；所属函数 ``useEffect callback @ 1683``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``observedElements.has``、``observedElements.add``、``resizeObserver.observe``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66099:66213:FUNCTION

.. rubric:: ``anonymous callback @ 1725``

.. code-block:: javascript

   anonymous callback @ 1725()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1725``—``1728`` 行；所属函数 ``useEffect callback @ 1683``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(container.children).forEach``、``Array.from``、``scheduleCheck``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66379:66574:FUNCTION

.. rubric:: ``returned callback @ 1736``

.. code-block:: javascript

   returned callback @ 1736()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1736``—``1742`` 行；所属函数 ``useEffect callback @ 1683``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver.disconnect``、``mutationObserver.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:66829:70113:FUNCTION

.. rubric:: ``useEffect callback @ 1753``

.. code-block:: javascript

   useEffect callback @ 1753()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1753``—``1835`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('wheel', handleWheel); container.removeEventListener('touchstart', handleTouchStart); container.removeEventListener('touchmove', handleTouchM…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67063:67171:FUNCTION

.. rubric:: ``getDistanceToBottom``

.. code-block:: javascript

   getDistanceToBottom()

读取与 ``Distance To Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1760``—``1762`` 行；所属函数 ``useEffect callback @ 1753``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``container.scrollHeight - container.scrollTop - container.clientHeight``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67201:67521:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1764``—``1772`` 行；所属函数 ``useEffect callback @ 1753``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67556:67647:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1774``—``1776`` 行；所属函数 ``useEffect callback @ 1753``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:67681:68326:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1778``—``1795`` 行；所属函数 ``useEffect callback @ 1753``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:68357:69470:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1797``—``1822`` 行；所属函数 ``useEffect callback @ 1753``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``Math.abs``、``disableSpeechAutoFollowByUser``、``unlockAutoScrollByUser``、``getDistanceToBottom``、``isUserAutoScrollUnlocked``、``relockAutoScrollAtBottom``、``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:69808:70106:FUNCTION

.. rubric:: ``returned callback @ 1829``

.. code-block:: javascript

   returned callback @ 1829()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1829``—``1834`` 行；所属函数 ``useEffect callback @ 1753``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70308:70773:FUNCTION

.. rubric:: ``useEffect callback @ 1843``

.. code-block:: javascript

   useEffect callback @ 1843()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1843``—``1856`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUserAutoScrollUnlocked``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:70455:70755:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1845``

.. code-block:: javascript

   requestAnimationFrame callback @ 1845()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1845``—``1854`` 行；所属函数 ``useEffect callback @ 1843``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isUserAutoScrollUnlocked``、``markProgrammaticScroll``、``executePendingScroll``、``requestScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71009:71504:FUNCTION

.. rubric:: ``useEffect callback @ 1867``

.. code-block:: javascript

   useEffect callback @ 1867()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1867``—``1879`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageSummaries``、``setActiveVisibleMessageId``、``setMessageOverviewOpen``、``setHistoryAutoLoadReady``、``setIsLoadingMoreHistory``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71540:71676:FUNCTION

.. rubric:: ``useEffect callback @ 1881``

.. code-block:: javascript

   useEffect callback @ 1881()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1881``—``1885`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:71801:72015:FUNCTION

.. rubric:: ``useCallback callback @ 1887``

.. code-block:: javascript

   useCallback callback @ 1887()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1887``—``1894`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageOverviewOpen``、``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72080:73152:FUNCTION

.. rubric:: ``useEffect callback @ 1896``

.. code-block:: javascript

   useEffect callback @ 1896()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1896``—``1922`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; window.clearTimeout(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``messagesOrder.filter``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72374:72414:FUNCTION

.. rubric:: ``messagesOrder.filter callback @ 1904``

.. code-block:: javascript

   messagesOrder.filter callback @ 1904(messageId)

作为 ``messagesOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1904``—``1904`` 行；所属函数 ``useEffect callback @ 1896``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72670:73035:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1909``

.. code-block:: javascript

   window.setTimeout callback @ 1909()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1909``—``1917`` 行；所属函数 ``useEffect callback @ 1896``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries({silent: true, append: true}).then``、``loadMessageSummaries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:72746:73023:FUNCTION

.. rubric:: ``loadMessageSummaries({silent: true, append: true}).then callback @ 1910``

.. code-block:: javascript

   loadMessageSummaries({silent: true, append: true}).then callback @ 1910(items)

处理 ``loadMessageSummaries({silent: true, append: true}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1910``—``1916`` 行；所属函数 ``window.setTimeout callback @ 1909``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73057:73145:FUNCTION

.. rubric:: ``returned callback @ 1918``

.. code-block:: javascript

   returned callback @ 1918()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1918``—``1921`` 行；所属函数 ``useEffect callback @ 1896``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73355:73863:FUNCTION

.. rubric:: ``useEffect callback @ 1931``

.. code-block:: javascript

   useEffect callback @ 1931()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1931``—``1943`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``measure``、``observer?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73465:73522:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1934``—``1934`` 行；所属函数 ``useEffect callback @ 1931``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMessageNavigatorWide``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73743:73856:FUNCTION

.. rubric:: ``returned callback @ 1939``

.. code-block:: javascript

   returned callback @ 1939()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1939``—``1942`` 行；所属函数 ``useEffect callback @ 1931``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:73897:75947:FUNCTION

.. rubric:: ``useEffect callback @ 1945``

.. code-block:: javascript

   useEffect callback @ 1945()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1945``—``1989`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) cancelAnimationFrame(frameId); container.removeEventListener('scroll', updateActiveMessage); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateActiveMessage``、``container.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74067:75446:FUNCTION

.. rubric:: ``updateActiveMessage``

.. code-block:: javascript

   updateActiveMessage()

更新与 ``Active Message`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1950``—``1978`` 行；所属函数 ``useEffect callback @ 1945``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74185:75434:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1952``

.. code-block:: javascript

   requestAnimationFrame callback @ 1952()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1952``—``1977`` 行；所属函数 ``updateActiveMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``container.getBoundingClientRect``、``Math.min``、``Math.max``、``document.elementsFromPoint``、``elements .map(element => element.closest?.('[data-message-id]')) .find``、``elements .map``、``messageElement.getAttribute``、``setActiveVisibleMessageId``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:74940:74989:FUNCTION

.. rubric:: ``elements .map callback @ 1966``

.. code-block:: javascript

   elements .map callback @ 1966(element)

作为 ``elements .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1966``—``1966`` 行；所属函数 ``requestAnimationFrame callback @ 1952``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.closest``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75021:75070:FUNCTION

.. rubric:: ``elements .map(element => element.closest?.('[data-message-id]')) .find callback @ 1967``

.. code-block:: javascript

   elements .map(element => element.closest?.('[data-message-id]')) .find callback @ 1967(element)

作为 ``elements .map(element => element.closest?.('[data-message-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1967``—``1967`` 行；所属函数 ``requestAnimationFrame callback @ 1952``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.contains``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75348:75400:FUNCTION

.. rubric:: ``setActiveVisibleMessageId callback @ 1975``

.. code-block:: javascript

   setActiveVisibleMessageId callback @ 1975(current)

设置与 ``Active Visible Message Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1975``—``1975`` 行；所属函数 ``requestAnimationFrame callback @ 1952``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75741:75940:FUNCTION

.. rubric:: ``returned callback @ 1984``

.. code-block:: javascript

   returned callback @ 1984()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1984``—``1988`` 行；所属函数 ``useEffect callback @ 1945``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``container.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:75983:112684:FUNCTION

.. rubric:: ``useEffect callback @ 1992``

.. code-block:: javascript

   useEffect callback @ 1992()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1992``—``2651`` 行；所属函数 ``ChatPage``。

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

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:76954:112122:FUNCTION

.. rubric:: ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``

.. code-block:: javascript

   onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018({event, payload, reply})

处理 ``Event({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload requ…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2018``—``2633`` 行；所属函数 ``useEffect callback @ 1992``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``handleSpeakMessageRequest``、``cancelActiveSpeech``、``reply``、``pauseActiveSpeech``、``resumeActiveSpeech``、``updateSpeechRate``、``seekSpeechSegment``、``messagesOrderRef.current?.includes``、``toast.error``、``t``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then((d…``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then``。

**内部回调数量**：21。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79241:79359:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback @ 2063``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback @ 2063(data)

处理 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2063``—``2065`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:79404:79575:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then((d… callback @ 2066``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then((d… callback @ 2066(error)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId, {params: {conversationId: conversationId}}) .then((d…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2066``—``2068`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83306:83460:FUNCTION

.. rubric:: ``anonymous callback @ 2134``

.. code-block:: javascript

   anonymous callback @ 2134(componentKey, componentRef)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2134``—``2136`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``componentRef``
   调用方传入的 ``componentRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83524:83656:FUNCTION

.. rubric:: ``anonymous callback @ 2138``

.. code-block:: javascript

   anonymous callback @ 2138(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2138``—``2140`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:83713:83845:FUNCTION

.. rubric:: ``anonymous callback @ 2142``

.. code-block:: javascript

   anonymous callback @ 2142(componentKey)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2142``—``2144`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``componentKey``
   调用方传入的 ``componentKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``mountPoints[componentKey]``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:85233:85582:FUNCTION

.. rubric:: ``produce callback @ 2171``

.. code-block:: javascript

   produce callback @ 2171(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2171``—``2177`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:86348:86730:FUNCTION

.. rubric:: ``produce callback @ 2190``

.. code-block:: javascript

   produce callback @ 2190(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2190``—``2196`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:87445:88111:FUNCTION

.. rubric:: ``produce callback @ 2208``

.. code-block:: javascript

   produce callback @ 2208(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2208``—``2218`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:88956:89981:FUNCTION

.. rubric:: ``produce callback @ 2232``

.. code-block:: javascript

   produce callback @ 2232(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2232``—``2247`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91010:91408:FUNCTION

.. rubric:: ``setAttachments callback @ 2264``

.. code-block:: javascript

   setAttachments callback @ 2264(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2264``—``2269`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91033:91407:FUNCTION

.. rubric:: ``current.map callback @ 2264``

.. code-block:: javascript

   current.map callback @ 2264(attachment)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2264``—``2269`` 行；所属函数 ``setAttachments callback @ 2264``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentArtifactId === artifactId ? {...attachment, workspaceTransfer: transfer} : attachment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91491:92247:FUNCTION

.. rubric:: ``produce callback @ 2270``

.. code-block:: javascript

   produce callback @ 2270(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2270``—``2280`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.values(draft).forEach``、``Object.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91568:92211:FUNCTION

.. rubric:: ``Object.values(draft).forEach callback @ 2271``

.. code-block:: javascript

   Object.values(draft).forEach callback @ 2271(message)

作为 ``Object.values(draft).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2271``—``2279`` 行；所属函数 ``produce callback @ 2270``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``message.attachments.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:91757:92171:FUNCTION

.. rubric:: ``message.attachments.map callback @ 2273``

.. code-block:: javascript

   message.attachments.map callback @ 2273(attachment)

作为 ``message.attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2273``—``2278`` 行；所属函数 ``Object.values(draft).forEach callback @ 2271``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentArtifactId === artifactId ? {...attachment, workspaceTransfer: transfer} : attachment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:92952:93307:FUNCTION

.. rubric:: ``produce callback @ 2293``

.. code-block:: javascript

   produce callback @ 2293(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2293``—``2299`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:93939:94319:FUNCTION

.. rubric:: ``produce callback @ 2310``

.. code-block:: javascript

   produce callback @ 2310(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2310``—``2316`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:95373:95703:FUNCTION

.. rubric:: ``produce callback @ 2335``

.. code-block:: javascript

   produce callback @ 2335(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2335``—``2340`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96329:97076:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2351``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2351()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.value }, conversation Id: conversation Id, loca…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2351``—``2363`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.value).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:96426:97040:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.value).then callback @ 2352``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.value).then callback @ 2352()

处理 ``loadSwitchMessage(payload.msgId, payload.value).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2352``—``2362`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.value }, conversationId: conversationId, loca… callback @ 2351``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``、``scrollToBottomAfterRender``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97758:98328:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2378``

.. code-block:: javascript

   emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2378()

发送事件与 ``Event({ event: 'message.switching.changed', payload: { value: payload.next Message }, conversation Id: conversation Id…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2378``—``2389`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``loadSwitchMessage(payload.msgId, payload.nextMessage).then``、``loadSwitchMessage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:97853:98300:FUNCTION

.. rubric:: ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2379``

.. code-block:: javascript

   loadSwitchMessage(payload.msgId, payload.nextMessage).then callback @ 2379()

处理 ``loadSwitchMessage(payload.msgId, payload.nextMessage).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2379``—``2388`` 行；所属函数 ``emitEvent({ event: 'message.switching.changed', payload: { value: payload.nextMessage }, conversationId: conversationId… callback @ 2378``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:98821:99953:FUNCTION

.. rubric:: ``produce callback @ 2396``

.. code-block:: javascript

   produce callback @ 2396(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2396``—``2413`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:100996:103066:FUNCTION

.. rubric:: ``produce callback @ 2433``

.. code-block:: javascript

   produce callback @ 2433(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2433``—``2463`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:105530:106079:FUNCTION

.. rubric:: ``produce callback @ 2512``

.. code-block:: javascript

   produce callback @ 2512(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2512``—``2521`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:106855:107428:FUNCTION

.. rubric:: ``produce callback @ 2534``

.. code-block:: javascript

   produce callback @ 2534(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2534``—``2543`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``mergeNetworkData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:108209:110223:FUNCTION

.. rubric:: ``produce callback @ 2559``

.. code-block:: javascript

   produce callback @ 2559(draft)

实现 ``produce`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2559``—``2590`` 行；所属函数 ``onEvent({ event: [ 'message.*', 'conversation.tree.changed', 'conversation.deleted', 'conversation.messages.reload_requ… callback @ 2018``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries``、``toDeleteKeySet``、``Array.isArray``、``network.nodes.filter``、``normalizeNetworkData``、``network.relationships.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:109060:109163:FUNCTION

.. rubric:: ``network.nodes.filter callback @ 2573``

.. code-block:: javascript

   network.nodes.filter callback @ 2573(node)

作为 ``network.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2573``—``2573`` 行；所属函数 ``produce callback @ 2559``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteNodeKeys.has``、``getNodeMergeKey``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:109874:109982:FUNCTION

.. rubric:: ``network.relationships.filter callback @ 2584``

.. code-block:: javascript

   network.relationships.filter callback @ 2584(rel)

作为 ``network.relationships.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2584``—``2584`` 行；所属函数 ``produce callback @ 2559``。

**参数**

``rel``
   调用方传入的 ``rel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteRelKeys.has``、``getRelationshipMergeKey``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:112222:112305:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', }).then callback @ 2636``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', }).then callback @ 2636()

处理 ``onEvent({ event: 'transport.connected', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2636``—``2638`` 行；所属函数 ``useEffect callback @ 1992``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``emitMessagesLoaded``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:112457:112558:FUNCTION

.. rubric:: ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 2643``

.. code-block:: javascript

   onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback @ 2643({event, payload, reply})

处理 ``onEvent({ event: 'speech.*', conversationId, direction: 'incoming', }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2643``—``2645`` 行；所属函数 ``useEffect callback @ 1992``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBackendSpeechEvent``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:112575:112677:FUNCTION

.. rubric:: ``returned callback @ 2646``

.. code-block:: javascript

   returned callback @ 2646()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2646``—``2650`` 行；所属函数 ``useEffect callback @ 1992``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe1``、``unsubscribe2``、``unsubscribe3``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113158:113243:FUNCTION

.. rubric:: ``useEffect callback @ 2653``

.. code-block:: javascript

   useEffect callback @ 2653()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2653``—``2657`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelActiveSpeech(true); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113180:113236:FUNCTION

.. rubric:: ``returned callback @ 2654``

.. code-block:: javascript

   returned callback @ 2654()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2654``—``2656`` 行；所属函数 ``useEffect callback @ 2653``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113283:113358:FUNCTION

.. rubric:: ``useEffect callback @ 2659``

.. code-block:: javascript

   useEffect callback @ 2659()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2659``—``2661`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:113399:114951:FUNCTION

.. rubric:: ``useEffect callback @ 2663``

.. code-block:: javascript

   useEffect callback @ 2663()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2663``—``2701`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``clearWorkspaceTransfers``、``setSettingsInstanceKey``、``Date.now``、``setInitialSettingValues``、``setAdvancedSettingsValues``、``setConversationMeta``、``applyContextCompactionState``、``setAdvancedSettings``、``setMessages``、``setMessagesOrder``、``setIsLoadingError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:114875:114933:FUNCTION

.. rubric:: ``errorToastsIds.current.forEach callback @ 2697``

.. code-block:: javascript

   errorToastsIds.current.forEach callback @ 2697(id)

作为 ``errorToastsIds.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2697``—``2699`` 行；所属函数 ``useEffect callback @ 2663``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115029:115615:FUNCTION

.. rubric:: ``useEffect callback @ 2703``

.. code-block:: javascript

   useEffect callback @ 2703()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2703``—``2717`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get(\`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\`) .then((items) => {…``、``apiClient.get(\`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\`) .then``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115241:115405:FUNCTION

.. rubric:: ``apiClient.get(\`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\`) .then callback @ 2707``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then callback @ 2707(items)

处理 ``apiClient.get(\`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\`) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2707``—``2710`` 行；所属函数 ``useEffect callback @ 2703``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``items.slice().reverse().forEach``、``items.slice().reverse``、``items.slice``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115426:115543:FUNCTION

.. rubric:: ``apiClient.get(\`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\`) .then((items) => {… callback @ 2711``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`) .then((items) => {… callback @ 2711()

实现 ``apiClient.get(\`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}\`) .then((items) => {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2711``—``2713`` 行；所属函数 ``useEffect callback @ 2703``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115560:115608:FUNCTION

.. rubric:: ``returned callback @ 2714``

.. code-block:: javascript

   returned callback @ 2714()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2714``—``2716`` 行；所属函数 ``useEffect callback @ 2703``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:115681:117351:FUNCTION

.. rubric:: ``useCallback callback @ 2719``

.. code-block:: javascript

   async useCallback callback @ 2719({preserveSelection = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``2719``—``2754`` 行；所属函数 ``ChatPage``。

**参数**

``{preserveSelection = false}``（默认值 ``{}``）
   调用方传入的 ``preserveSelection = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedModels``、``[]``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``Array.isArray``、``modelsData.map``、``setModels``、``t``、``setSelectedModel``、``setAdvancedSettings``、``normalizedModels.find``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:116881:116917:FUNCTION

.. rubric:: ``normalizedModels.find callback @ 2743``

.. code-block:: javascript

   normalizedModels.find callback @ 2743(item)

作为 ``normalizedModels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2743``—``2743`` 行；所属函数 ``useCallback callback @ 2719``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:117723:118017:FUNCTION

.. rubric:: ``useEffect callback @ 2762``

.. code-block:: javascript

   useEffect callback @ 2762()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2762``—``2767`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118119:123068:FUNCTION

.. rubric:: ``useEffect callback @ 2769``

.. code-block:: javascript

   useEffect callback @ 2769()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2769``—``2881`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsNewConversationId``、``setIsLoading``、``loadData``、``requestModels``、``setIsLoadingError``、``setIsFirstMessageSend``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118523:119402:FUNCTION

.. rubric:: ``requestConversation``

.. code-block:: javascript

   async requestConversation()

实现 ``requestConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2778``—``2795`` 行；所属函数 ``useEffect callback @ 2769``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``setConversationMeta``、``applyContextCompactionState``、``modelsData.find``、``setSelectedModel``、``setAdvancedSettings``、``setAdvancedSettingsValues``、``setInitialSettingValues``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:118843:118873:FUNCTION

.. rubric:: ``modelsData.find callback @ 2783``

.. code-block:: javascript

   modelsData.find callback @ 2783(item)

作为 ``modelsData.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2783``—``2783`` 行；所属函数 ``requestConversation``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119432:119536:FUNCTION

.. rubric:: ``requestModels``

.. code-block:: javascript

   async requestModels()

实现 ``requestModels`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2796``—``2798`` 行；所属函数 ``useEffect callback @ 2769``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadAvailableModels``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:119569:122500:FUNCTION

.. rubric:: ``requestMessages``

.. code-block:: javascript

   async requestMessages()

实现 ``requestMessages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``2799``—``2863`` 行；所属函数 ``useEffect callback @ 2769``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setHistoryAutoLoadReady``、``apiClient.get``、``decorateMessages``、``setMessages``、``setMessagesOrder``、``setTimeout``、``emitMessagesLoaded``、``errorToastsIds.current.set``、``toast``、``t``、``setIsLoadingError``、``setIsLoading``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120372:121180:FUNCTION

.. rubric:: ``setTimeout callback @ 2817``

.. code-block:: javascript

   setTimeout callback @ 2817()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2817``—``2832`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:120411:121156:FUNCTION

.. rubric:: ``setTimeout callback @ 2818``

.. code-block:: javascript

   setTimeout callback @ 2818()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2818``—``2831`` 行；所属函数 ``setTimeout callback @ 2817``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``checkScrollPosition``、``executePendingScroll``、``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121487:121663:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2838``—``2842`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``loadData``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:121923:122469:FUNCTION

.. rubric:: ``setTimeout callback @ 2850``

.. code-block:: javascript

   setTimeout callback @ 2850()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2850``—``2861`` 行；所属函数 ``requestMessages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``markProgrammaticScroll``、``executePendingScroll``、``setHistoryAutoLoadReady``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:122526:122786:FUNCTION

.. rubric:: ``loadData``

.. code-block:: javascript

   async loadData()

加载与 ``Data`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``2864``—``2871`` 行；所属函数 ``useEffect callback @ 2769``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``requestModels``、``requestConversation``、``requestMessages``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123350:123404:FUNCTION

.. rubric:: ``useCallback callback @ 2893``

.. code-block:: javascript

   useCallback callback @ 2893()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2893``—``2895`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsSidebarOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123383:123396:FUNCTION

.. rubric:: ``setIsSidebarOpen callback @ 2894``

.. code-block:: javascript

   setIsSidebarOpen callback @ 2894(prev)

设置与 ``Is Sidebar Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2894``—``2894`` 行；所属函数 ``useCallback callback @ 2893``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:123450:123518:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 2897``

.. code-block:: javascript

   useBrowserBackLayer callback @ 2897()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2897``—``2900`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``setIsSidebarOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131142:131172:FUNCTION

.. rubric:: ``onStop callback @ 3052``

.. code-block:: javascript

   onStop callback @ 3052()

处理 ``Stop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3052``—``3052`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131214:131241:FUNCTION

.. rubric:: ``onPrevious callback @ 3053``

.. code-block:: javascript

   onPrevious callback @ 3053()

处理 ``Previous`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3053``—``3053`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:131279:131305:FUNCTION

.. rubric:: ``onNext callback @ 3054``

.. code-block:: javascript

   onNext callback @ 3054()

处理 ``Next`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3054``—``3054`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seekSpeechSegment``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:133893:134421:FUNCTION

.. rubric:: ``onWorkspaceChange callback @ 3094``

.. code-block:: javascript

   onWorkspaceChange callback @ 3094(workspaceIds)

处理 ``Workspace Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3094``—``3102`` 行；所属函数 ``ChatPage``。

**参数**

``workspaceIds``
   调用方传入的 ``workspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``setAdvancedSettingsValues``、``setInitialSettingValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134071:134326:FUNCTION

.. rubric:: ``setAdvancedSettingsValues callback @ 3096``

.. code-block:: javascript

   setAdvancedSettingsValues callback @ 3096(current)

设置与 ``Advanced Settings Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3096``—``3100`` 行；所属函数 ``onWorkspaceChange callback @ 3094``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134833:134868:FUNCTION

.. rubric:: ``onClose callback @ 3112``

.. code-block:: javascript

   onClose callback @ 3112()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3112``—``3112`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageOverviewOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:134954:134982:FUNCTION

.. rubric:: ``onRefresh callback @ 3114``

.. code-block:: javascript

   onRefresh callback @ 3114()

处理 ``Refresh`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3114``—``3114`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMessageSummaries``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:135848:135997:FUNCTION

.. rubric:: ``onSettingChange callback @ 3133``

.. code-block:: javascript

   onSettingChange callback @ 3133(values)

处理 ``Setting Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3133``—``3136`` 行；所属函数 ``ChatPage``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvancedSettingsValues``、``setInitialSettingValues``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:136842:136960:FUNCTION

.. rubric:: ``onClose callback @ 3162``

.. code-block:: javascript

   onClose callback @ 3162()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3162``—``3165`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``、``setStoryReaderOpen``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137037:137067:FUNCTION

.. rubric:: ``onStopSpeech callback @ 3167``

.. code-block:: javascript

   onStopSpeech callback @ 3167()

处理 ``Stop Speech`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3167``—``3167`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelActiveSpeech``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137478:137664:FUNCTION

.. rubric:: ``onOpenChange callback @ 3178``

.. code-block:: javascript

   onOpenChange callback @ 3178(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3178``—``3184`` 行；所属函数 ``ChatPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowDeleteConfirm``、``setPendingDeleteMsgId``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:137936:138821:FUNCTION

.. rubric:: ``onConfirm callback @ 3190``

.. code-block:: javascript

   onConfirm callback @ 3190()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``3190``—``3211`` 行；所属函数 ``ChatPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowDeleteConfirm``、``setIsDeletingMessage``、``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…``、``apiClient.delete``、``setPendingDeleteMsgId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138367:138474:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3201``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3201(data)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3201``—``3203`` 行；所属函数 ``onConfirm callback @ 3190``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deleteMessageLocally``。

.. CWM-AST-FUNCTION src/features/chat/ChatPage.jsx:138507:138654:FUNCTION

.. rubric:: ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3204``

.. code-block:: javascript

   apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI… callback @ 3204(error)

实现 ``apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId, {params: {conversationId: conversationI…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3204``—``3206`` 行；所属函数 ``onConfirm callback @ 3190``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。
