src/components/sidebar/useConversationFork 模块
==================================================================================================

.. js:module:: src/components/sidebar/useConversationFork

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/sidebar/useConversationFork.js``
* **模块标识**：``src/components/sidebar/useConversationFork``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/features/tasks/useTaskStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:338:4123:FUNCTION

.. js:function:: useConversationFork({conversationId, clientRequestId, onComplete})

   封装 ``useConversationFork`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``9``—``90`` 行。

   **参数**

   ``{conversationId, clientRequestId, onComplete}``
      调用方传入的 ``conversationId, clientRequestId, onComplete`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{task, confirmed, submitting, submitError, refreshError, confirmFork: submit, retrySubmission: submit, terminal}``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``、``TERMINAL_STATUSES.has``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:977:1682:FUNCTION

.. rubric:: ``useCallback callback @ 22``

.. code-block:: javascript

   useCallback callback @ 22(next)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``37`` 行；所属函数 ``useConversationFork``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Number.isInteger``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``setTask``、``setRefreshError``、``completeCallback.current``。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:1721:2485:FUNCTION

.. rubric:: ``useCallback callback @ 39``

.. code-block:: javascript

   async useCallback callback @ 39()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``39``—``56`` 行；所属函数 ``useConversationFork``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('Invalid fork task response')``。

**主要协作调用**：``setConfirmed``、``setSubmitting``、``setSubmitError``、``apiClient.post``、``encodeURIComponent``、``acceptTask``。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:2550:2646:FUNCTION

.. rubric:: ``useEffect callback @ 58``

.. code-block:: javascript

   useEffect callback @ 58()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``61`` 行；所属函数 ``useConversationFork``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:2604:2639:FUNCTION

.. rubric:: ``returned callback @ 60``

.. code-block:: javascript

   returned callback @ 60()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``useEffect callback @ 58``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:2759:3961:FUNCTION

.. rubric:: ``useEffect callback @ 65``

.. code-block:: javascript

   useEffect callback @ 65()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``87`` 行；所属函数 ``useConversationFork``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { controller.abort(); clearInterval(timer); changed(); reconnected(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({event: 'task.changed'}).then``、``onEvent``、``onEvent({event: 'transport.connected'}).then``、``refresh``、``setInterval``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:2910:3424:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   async refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``69``—``78`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``、``acceptTask``、``setRefreshError``。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:3488:3649:FUNCTION

.. rubric:: ``onEvent({event: 'task.changed'}).then callback @ 79``

.. code-block:: javascript

   onEvent({event: 'task.changed'}).then callback @ 79({payload})

处理 ``onEvent({event: 'task.changed'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``79``—``82`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

``{payload}``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``acceptTask``、``refresh``。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:3725:3745:FUNCTION

.. rubric:: ``onEvent({event: 'transport.connected'}).then callback @ 83``

.. code-block:: javascript

   onEvent({event: 'transport.connected'}).then callback @ 83()

处理 ``onEvent({event: 'transport.connected'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:3806:3853:FUNCTION

.. rubric:: ``setInterval callback @ 85``

.. code-block:: javascript

   setInterval callback @ 85()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/components/sidebar/useConversationFork.js:3876:3954:FUNCTION

.. rubric:: ``returned callback @ 86``

.. code-block:: javascript

   returned callback @ 86()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``、``clearInterval``、``changed``、``reconnected``。
