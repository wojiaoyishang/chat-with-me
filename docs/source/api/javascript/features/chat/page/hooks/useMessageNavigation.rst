src/features/chat/page/hooks/useMessageNavigation 模块
================================================================================================================

.. js:module:: src/features/chat/page/hooks/useMessageNavigation

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/hooks/useMessageNavigation.js``
* **模块标识**：``src/features/chat/page/hooks/useMessageNavigation``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:202:854:FUNCTION

.. js:function:: waitForMessage(messageId, scrollToMessage, signal)

   实现 ``waitForMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``23`` 行。

   **参数**

   ``messageId``
      Message 的公共 UUID。

   ``scrollToMessage``
      调用方传入的 ``scrollToMessage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``signal``
      AbortSignal，用于取消异步操作。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:855:3460:FUNCTION

.. js:function:: useMessageNavigation({conversationId, scrollToMessage, applyWindow})

   封装 ``useMessageNavigation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``25``—``83`` 行。

   **参数**

   ``{conversationId, scrollToMessage, applyWindow}``
      调用方传入的 ``conversationId, scrollToMessage, applyWindow`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{jumpToMessage, pendingMessageId, cancelJump}``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:255:853:FUNCTION

.. rubric:: ``anonymous callback @ 6``

.. code-block:: javascript

   anonymous callback @ 6(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``23`` 行；所属函数 ``waitForMessage``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``signal.addEventListener``、``requestAnimationFrame``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:323:457:FUNCTION

.. rubric:: ``finish``

.. code-block:: javascript

   finish(success)

实现 ``finish`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``13`` 行；所属函数 ``anonymous callback @ 6``。

**参数**

``success``
   调用方传入的 ``success`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``signal.removeEventListener``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:476:496:FUNCTION

.. rubric:: ``abort``

.. code-block:: javascript

   abort()

实现 ``abort`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``anonymous callback @ 6``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finish``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:516:748:FUNCTION

.. rubric:: ``locate``

.. code-block:: javascript

   locate()

实现 ``locate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``20`` 行；所属函数 ``anonymous callback @ 6``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``finish(false)``、``finish(true)``。

**主要协作调用**：``finish``、``scrollToMessage``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:1192:1315:FUNCTION

.. rubric:: ``useCallback callback @ 31``

.. code-block:: javascript

   useCallback callback @ 31()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``35`` 行；所属函数 ``useMessageNavigation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.current?.controller.abort``、``setPendingMessageId``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:1336:1501:FUNCTION

.. rubric:: ``useEffect callback @ 36``

.. code-block:: javascript

   useEffect callback @ 36()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``42`` 行；所属函数 ``useMessageNavigation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { request.current?.controller.abort(); request.current = null; }``。

**主要协作调用**：``setPendingMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:1391:1494:FUNCTION

.. rubric:: ``returned callback @ 38``

.. code-block:: javascript

   returned callback @ 38()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``41`` 行；所属函数 ``useEffect callback @ 36``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.current?.controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:1561:3337:FUNCTION

.. rubric:: ``useCallback callback @ 44``

.. code-block:: javascript

   useCallback callback @ 44(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``80`` 行；所属函数 ``useMessageNavigation``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(false)``、``request.current.promise``、``Promise.resolve(true)``、``operation.promise``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Promise.resolve``、``cancelJump``、``scrollToMessage``、``setPendingMessageId``、``(async () => { try { const data = await apiClient.post(apiEndpoint.CHAT_MESSAGES_BATCH_ENDPOINT, { conversationId, arou…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:2029:2111:FUNCTION

.. rubric:: ``active``

.. code-block:: javascript

   active()

实现 ``active`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``useCallback callback @ 44``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useMessageNavigation.js:2142:3293:FUNCTION

.. rubric:: ``anonymous callback @ 55``

.. code-block:: javascript

   async anonymous callback @ 55()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``55``—``78`` 行；所属函数 ``useCallback callback @ 44``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('目标消息已变化，请刷新消息列表后重试。')``、``new Error('消息已加载，定位失败，请重试。')``。

**主要协作调用**：``apiClient.post``、``active``、``Array.isArray``、``data.messagesOrder.includes``、``applyWindow``、``waitForMessage``、``toast.error``、``setPendingMessageId``。
