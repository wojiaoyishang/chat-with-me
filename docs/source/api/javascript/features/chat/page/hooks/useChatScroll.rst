src/features/chat/page/hooks/useChatScroll 模块
=============================================

.. js:module:: src/features/chat/page/hooks/useChatScroll

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/hooks/useChatScroll.js``
* **模块标识**：``src/features/chat/page/hooks/useChatScroll``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：22

主要依赖
--------

``react``。

顶层函数、组件与 Hook
--------------------

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

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:301:11241:FUNCTION

.. js:function:: useChatScroll(messagesContainerRef)

   封装 ``useChatScroll`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``290`` 行。

   **参数**

   ``messagesContainerRef``
      调用方传入的 ``messagesContainerRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ showScrollToBottomButton, setShowScrollToBottomButton, chatBoxHeight, isAutoScrollEnabledRef, pendingScrollRef, checkScrollPosition, smoothScrollToBottom, executePendingScroll,…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1125:1323:FUNCTION

.. rubric:: ``useCallback callback @ 29``

.. code-block:: javascript

   useCallback callback @ 29()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``34`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1374:1572:FUNCTION

.. rubric:: ``useCallback callback @ 36``

.. code-block:: javascript

   useCallback callback @ 36()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``41`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1629:1813:FUNCTION

.. rubric:: ``useCallback callback @ 43``

.. code-block:: javascript

   useCallback callback @ 43()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``48`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:1865:3272:FUNCTION

.. rubric:: ``useCallback callback @ 50``

.. code-block:: javascript

   useCallback callback @ 50(immediate)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``82`` 行；所属函数 ``useChatScroll``。

**参数**

``immediate``（默认值 ``false``）
   调用方传入的 ``immediate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setShowScrollToBottomButton``、``clearTimeout``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:3165:3249:FUNCTION

.. rubric:: ``setTimeout callback @ 78``

.. code-block:: javascript

   setTimeout callback @ 78()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``78``—``80`` 行；所属函数 ``useCallback callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowScrollToBottomButton``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:3339:5102:FUNCTION

.. rubric:: ``useCallback callback @ 84``

.. code-block:: javascript

   useCallback callback @ 84(maxDuration)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``124`` 行；所属函数 ``useChatScroll``。

**参数**

``maxDuration``（默认值 ``SETTLE_MAX_MS``）
   调用方传入的 ``maxDuration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelBottomSettle``、``performance.now``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:3538:5021:FUNCTION

.. rubric:: ``settle``

.. code-block:: javascript

   settle(now)

实现 ``settle`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``91``—``121`` 行；所属函数 ``useCallback callback @ 84``。

**参数**

``now``
   调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getBottomScrollTop``、``Math.abs``、``checkScrollPosition``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:5216:7656:FUNCTION

.. rubric:: ``useCallback callback @ 126``

.. code-block:: javascript

   useCallback callback @ 126(isStreaming)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``126``—``185`` 行；所属函数 ``useChatScroll``。

**参数**

``isStreaming``（默认值 ``false``）
   调用方传入的 ``isStreaming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelScrollAnimation``、``cancelBottomSettle``、``getBottomScrollTop``、``Math.abs``、``settleAtBottom``、``Math.min``、``Math.max``、``performance.now``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:6403:7568:FUNCTION

.. rubric:: ``animateScroll``

.. code-block:: javascript

   animateScroll(currentTime)

实现 ``animateScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``158``—``182`` 行；所属函数 ``useCallback callback @ 126``。

**参数**

``currentTime``
   调用方传入的 ``currentTime`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.min``、``Math.pow``、``getBottomScrollTop``、``requestAnimationFrame``、``settleAtBottom``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:7788:8243:FUNCTION

.. rubric:: ``useCallback callback @ 187``

.. code-block:: javascript

   useCallback callback @ 187()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``187``—``199`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelPendingScrollTimer``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8037:8235:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 193``

.. code-block:: javascript

   requestAnimationFrame callback @ 193()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``193``—``198`` 行；所属函数 ``useCallback callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8079:8223:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 194``

.. code-block:: javascript

   requestAnimationFrame callback @ 194()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``194``—``197`` 行；所属函数 ``requestAnimationFrame callback @ 193``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``smoothScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8343:8677:FUNCTION

.. rubric:: ``useCallback callback @ 201``

.. code-block:: javascript

   useCallback callback @ 201()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``201``—``210`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cancelPendingScrollTimer``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8533:8636:FUNCTION

.. rubric:: ``setTimeout callback @ 206``

.. code-block:: javascript

   setTimeout callback @ 206()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``206``—``209`` 行；所属函数 ``useCallback callback @ 201``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``executePendingScroll``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:8781:9000:FUNCTION

.. rubric:: ``useCallback callback @ 212``

.. code-block:: javascript

   useCallback callback @ 212()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``212``—``218`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelPendingScrollTimer``、``setShowScrollToBottomButton``、``smoothScrollToBottom``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9100:9544:FUNCTION

.. rubric:: ``useCallback callback @ 220``

.. code-block:: javascript

   useCallback callback @ 220()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``220``—``232`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``clearTimeout``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9407:9476:FUNCTION

.. rubric:: ``setTimeout callback @ 227``

.. code-block:: javascript

   setTimeout callback @ 227()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``227``—``229`` 行；所属函数 ``useCallback callback @ 220``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9602:9707:FUNCTION

.. rubric:: ``useCallback callback @ 234``

.. code-block:: javascript

   useCallback callback @ 234(newHeight)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``234``—``237`` 行；所属函数 ``useChatScroll``。

**参数**

``newHeight``
   调用方传入的 ``newHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setChatBoxHeight``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9729:10479:FUNCTION

.. rubric:: ``useEffect callback @ 239``

.. code-block:: javascript

   useEffect callback @ 239()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``261`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { container.removeEventListener('scroll', handleScroll); if (scrollCheckTimeoutRef.current) { clearTimeout(scrollCheckTimeoutRef.current); } if (streamingTimerRef.current) {…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``container.addEventListener``、``checkScrollPosition``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:9854:9907:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``243``—``245`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``checkScrollPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:10036:10472:FUNCTION

.. rubric:: ``returned callback @ 249``

.. code-block:: javascript

   returned callback @ 249()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``249``—``260`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``container.removeEventListener``、``clearTimeout``、``cancelPendingScrollTimer``、``cancelScrollAnimation``、``cancelBottomSettle``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatScroll.js:10658:10796:FUNCTION

.. rubric:: ``useEffect callback @ 269``

.. code-block:: javascript

   useEffect callback @ 269()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``274`` 行；所属函数 ``useChatScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``executePendingScroll``、``requestScrollToBottom``。
