src/features/chat/page/hooks/useChatScroll 模块
==================================================================================================

.. js:module:: src/features/chat/page/hooks/useChatScroll

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/hooks/useChatScroll.js``
* **模块标识**：``src/features/chat/page/hooks/useChatScroll``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：23

主要依赖
--------------------------------------------------------------------------------

``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:216:277:FUNCTION

.. js:function:: getBottomScrollTop(node)

   读取与 ``Bottom Scroll Top`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``8`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:301:11842:FUNCTION

.. js:function:: useChatScroll(messagesContainerRef, active)

   封装 ``useChatScroll`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``303`` 行。

   **参数**

   ``messagesContainerRef``
      调用方传入的 ``messagesContainerRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``active`` （默认值 ``true``）
      调用方传入的 ``active`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ showScrollToBottomButton, setShowScrollToBottomButton, chatBoxHeight, isAutoScrollEnabledRef, pendingScrollRef, checkScrollPosition, smoothScrollToBottom, executePendingScroll,…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1210:1408:FUNCTION

.. rubric:: ``useCallback callback @ 31``

.. code-block:: javascript

   useCallback callback @ 31()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``36`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1459:1657:FUNCTION

.. rubric:: ``useCallback callback @ 38``

.. code-block:: javascript

   useCallback callback @ 38()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``43`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1714:1898:FUNCTION

.. rubric:: ``useCallback callback @ 45``

.. code-block:: javascript

   useCallback callback @ 45()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``50`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1950:3379:FUNCTION

.. rubric:: ``useCallback callback @ 52``

.. code-block:: javascript

   useCallback callback @ 52(immediate)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``84`` 行；所属函数 ``useChatScroll``。

**参数**

``immediate`` （默认值 ``false``）
   调用方传入的 ``immediate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowScrollToBottomButton``、``clearTimeout``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:3272:3356:FUNCTION

.. rubric:: ``setTimeout callback @ 80``

.. code-block:: javascript

   setTimeout callback @ 80()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``80``—``82`` 行；所属函数 ``useCallback callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:3446:5231:FUNCTION

.. rubric:: ``useCallback callback @ 86``

.. code-block:: javascript

   useCallback callback @ 86(maxDuration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``126`` 行；所属函数 ``useChatScroll``。

**参数**

``maxDuration`` （默认值 ``SETTLE_MAX_MS``）
   调用方传入的 ``maxDuration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelBottomSettle``、``performance.now``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:3645:5150:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle(now)

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``123`` 行；所属函数 ``useCallback callback @ 86``。

**参数**

``now``
   调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getBottomScrollTop``、``Math.abs``、``checkScrollPosition``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:5345:7847:FUNCTION

.. rubric:: ``useCallback callback @ 128``

.. code-block:: javascript

   useCallback callback @ 128(isStreaming)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``128``—``188`` 行；所属函数 ``useChatScroll``。

**参数**

``isStreaming`` （默认值 ``false``）
   调用方传入的 ``isStreaming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelScrollAnimation``、``cancelBottomSettle``、``getBottomScrollTop``、``Math.abs``、``settleAtBottom``、``Math.min``、``Math.max``、``performance.now``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:6572:7759:FUNCTION

.. rubric:: ``animateScroll``

.. code-block:: javascript

   animateScroll(currentTime)

实现 ``animateScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``161``—``185`` 行；所属函数 ``useCallback callback @ 128``。

**参数**

``currentTime``
   调用方传入的 ``currentTime`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.min``、``Math.pow``、``getBottomScrollTop``、``requestAnimationFrame``、``settleAtBottom``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:7979:8496:FUNCTION

.. rubric:: ``useCallback callback @ 190``

.. code-block:: javascript

   useCallback callback @ 190()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``190``—``203`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelPendingScrollTimer``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8268:8488:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 197``

.. code-block:: javascript

   requestAnimationFrame callback @ 197()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``197``—``202`` 行；所属函数 ``useCallback callback @ 190``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8310:8476:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 198``

.. code-block:: javascript

   requestAnimationFrame callback @ 198()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``198``—``201`` 行；所属函数 ``requestAnimationFrame callback @ 197``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``smoothScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8596:8970:FUNCTION

.. rubric:: ``useCallback callback @ 205``

.. code-block:: javascript

   useCallback callback @ 205()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``205``—``215`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelPendingScrollTimer``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8826:8929:FUNCTION

.. rubric:: ``setTimeout callback @ 211``

.. code-block:: javascript

   setTimeout callback @ 211()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``211``—``214`` 行；所属函数 ``useCallback callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``executePendingScroll``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9074:9293:FUNCTION

.. rubric:: ``useCallback callback @ 217``

.. code-block:: javascript

   useCallback callback @ 217()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``217``—``223`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelPendingScrollTimer``、``setShowScrollToBottomButton``、``smoothScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9393:9837:FUNCTION

.. rubric:: ``useCallback callback @ 225``

.. code-block:: javascript

   useCallback callback @ 225()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``225``—``237`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``clearTimeout``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9700:9769:FUNCTION

.. rubric:: ``setTimeout callback @ 232``

.. code-block:: javascript

   setTimeout callback @ 232()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``232``—``234`` 行；所属函数 ``useCallback callback @ 225``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9895:10000:FUNCTION

.. rubric:: ``useCallback callback @ 239``

.. code-block:: javascript

   useCallback callback @ 239(newHeight)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``242`` 行；所属函数 ``useChatScroll``。

**参数**

``newHeight``
   调用方传入的 ``newHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setChatBoxHeight``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:10022:10772:FUNCTION

.. rubric:: ``useEffect callback @ 244``

.. code-block:: javascript

   useEffect callback @ 244()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``244``—``266`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('scroll', handleScroll); if (scrollCheckTimeoutRef.current) { clearTimeout(scrollCheckTimeoutRef.current); } if (streamingTimerRef.current) {…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:10147:10200:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``248``—``250`` 行；所属函数 ``useEffect callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:10329:10765:FUNCTION

.. rubric:: ``returned callback @ 254``

.. code-block:: javascript

   returned callback @ 254()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``254``—``265`` 行；所属函数 ``useEffect callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``、``clearTimeout``、``cancelPendingScrollTimer``、``cancelScrollAnimation``、``cancelBottomSettle``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:10951:11144:FUNCTION

.. rubric:: ``useEffect callback @ 274``

.. code-block:: javascript

   useEffect callback @ 274()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``274``—``280`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelPendingScrollTimer``、``cancelScrollAnimation``、``cancelBottomSettle``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:11241:11389:FUNCTION

.. rubric:: ``useEffect callback @ 282``

.. code-block:: javascript

   useEffect callback @ 282()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``287`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``executePendingScroll``、``requestScrollToBottom``。
