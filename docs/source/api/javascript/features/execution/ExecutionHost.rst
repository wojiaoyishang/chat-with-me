src/features/execution/ExecutionHost 模块
======================================================================================

.. js:module:: src/features/execution/ExecutionHost

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionHost.jsx``
* **模块标识**：``src/features/execution/ExecutionHost``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``react``、``@/context/useEventStore.jsx``、``./ExecutionWindow.jsx``、``./useExecutionStore.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:298:3836:FUNCTION

.. rubric:: ``memo callback @ 7``

.. code-block:: javascript

   memo callback @ 7({conversationId, messageOrder = [], messages = {}})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``91`` 行。

**参数**

``{conversationId, messageOrder = [], messages = {}}``
   调用方传入的 ``conversationId, messageOrder = , messages =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <ExecutionWindow execution={execution} open dockTarget={dockTarget} dockMount={dockMount} messages={messages} onOpenChange={(open) => { if (!open) closeExecution(normalized); }}…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``String(conversationId || '').trim``、``String``、``useExecutionStore``、``useState``、``useRef``、``useMemo``、``useEffect``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:456:521:FUNCTION

.. rubric:: ``useExecutionStore callback @ 9``

.. code-block:: javascript

   useExecutionStore callback @ 9(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``9``—``9`` 行；所属函数 ``memo callback @ 7``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:840:1013:FUNCTION

.. rubric:: ``useMemo callback @ 14``

.. code-block:: javascript

   useMemo callback @ 14()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``18`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``messageOrder.filter((messageId) => messageId && messageId !== '<PREV_MORE>').map``、``messageOrder.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:920:975:FUNCTION

.. rubric:: ``messageOrder.filter callback @ 16``

.. code-block:: javascript

   messageOrder.filter callback @ 16(messageId)

作为 ``messageOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``useMemo callback @ 14``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1073:1105:FUNCTION

.. rubric:: ``useMemo callback @ 19``

.. code-block:: javascript

   useMemo callback @ 19()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1148:1953:FUNCTION

.. rubric:: ``useEffect callback @ 22``

.. code-block:: javascript

   useEffect callback @ 22()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``37`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setDockTarget``、``setDockMount``、``resolve``、``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1352:1819:FUNCTION

.. rubric:: ``resolve``

.. code-block:: javascript

   resolve()

解析并确定与 ``resolve`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``28``—``33`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.from``、``document.querySelectorAll``、``setDockTarget``、``targets.find``、``setDockMount``、``mounts.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1607:1677:FUNCTION

.. rubric:: ``targets.find callback @ 31``

.. code-block:: javascript

   targets.find callback @ 31(node)

作为 ``targets.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``resolve``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1727:1797:FUNCTION

.. rubric:: ``mounts.find callback @ 32``

.. code-block:: javascript

   mounts.find callback @ 32(node)

作为 ``mounts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``resolve``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1911:1945:FUNCTION

.. rubric:: ``returned callback @ 36``

.. code-block:: javascript

   returned callback @ 36()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:1987:2356:FUNCTION

.. rubric:: ``useEffect callback @ 39``

.. code-block:: javascript

   useEffect callback @ 39()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``46`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(execution.messageId || execution.assistantMessageId || '').trim``、``String``、``visibleMessageIdSet.has``、``closeExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:2602:2892:FUNCTION

.. rubric:: ``useEffect callback @ 56``

.. code-block:: javascript

   useEffect callback @ 56()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``62`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:2926:3432:FUNCTION

.. rubric:: ``useEffect callback @ 64``

.. code-block:: javascript

   useEffect callback @ 64()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``76`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'execution.state.changed', conversationId: normalized, direction: 'incoming', includeGlobal: true, }).…``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:3192:3386:FUNCTION

.. rubric:: ``onEvent({ event: 'execution.state.changed', conversationId: normalized, direction: 'incoming', includeGlobal: true, }).… callback @ 71``

.. code-block:: javascript

   onEvent({ event: 'execution.state.changed', conversationId: normalized, direction: 'incoming', includeGlobal: true, }).… callback @ 71({payload})

处理 ``Event({ event: 'execution.state.changed', conversation Id: normalized, direction: 'incoming', include Global: true, }).…`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``71``—``74`` 行；所属函数 ``useEffect callback @ 64``。

**参数**

``{payload}``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:3404:3424:FUNCTION

.. rubric:: ``returned callback @ 75``

.. code-block:: javascript

   returned callback @ 75()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``useEffect callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionHost.jsx:3730:3812:FUNCTION

.. rubric:: ``onOpenChange callback @ 86``

.. code-block:: javascript

   onOpenChange callback @ 86(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``86``—``88`` 行；所属函数 ``memo callback @ 7``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeExecution``。
