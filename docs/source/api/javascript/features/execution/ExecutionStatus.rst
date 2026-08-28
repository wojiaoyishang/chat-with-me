src/features/execution/ExecutionStatus 模块
==========================================================================================

.. js:module:: src/features/execution/ExecutionStatus

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionStatus.jsx``
* **模块标识**：``src/features/execution/ExecutionStatus``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./ExecutionGuidanceBubble.jsx``、``./useExecutionStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:323:672:FUNCTION

.. js:function:: parseExecution(content, conversationId)

   解析与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``18`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...parsed, conversationId: String(parsed.conversationId || conversationId || '').trim(), }``。

   **主要协作调用**：``JSON.parse``、``String``、``String(parsed.conversationId || conversationId || '').trim``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:704:5624:FUNCTION

.. rubric:: ``memo callback @ 20``

.. code-block:: javascript

   memo callback @ 20({content = '', conversationId = null})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``105`` 行。

**参数**

``{content = '', conversationId = null}``
   调用方传入的 ``content = '', conversationId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="my-2 w-full" data-execution-status-id={nodeStatusId || undefined}> <button type="button" onClick={() => openExecution(openTarget)} className="group flex max-w-fu…``。

**主要协作调用**：``useMemo``、``useExecutionStore``、``useEffect``、``String(execution.inlineState || '').toLowerCase``、``String``、``String(execution.status || '').toLowerCase``、``Boolean``、``['completed', 'failed', 'cancelled'].includes``、``String(execution.statusId || '').trim``、``activitySource.filter``、``String(guidancePrompt?.label || '').trim``、``guidanceActivities.map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:779:824:FUNCTION

.. rubric:: ``useMemo callback @ 21``

.. code-block:: javascript

   useMemo callback @ 21()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:898:1193:FUNCTION

.. rubric:: ``useExecutionStore callback @ 22``

.. code-block:: javascript

   useExecutionStore callback @ 22(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``27`` 行；所属函数 ``memo callback @ 20``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``state.sessions[cid]?.executions?.[executionId] || null``。

**主要协作调用**：``String(execution?.conversationId || conversationId || '').trim``、``String``、``String(execution?.executionId || '').trim``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:1211:1904:FUNCTION

.. rubric:: ``useEffect callback @ 29``

.. code-block:: javascript

   useEffect callback @ 29()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``40`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``useExecutionStore.getState``、``Number``、``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:2959:3120:FUNCTION

.. rubric:: ``activitySource.filter callback @ 55``

.. code-block:: javascript

   activitySource.filter callback @ 55(activity)

作为 ``activitySource.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``58`` 行；所属函数 ``memo callback @ 20``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.anchorStatusId || '').trim``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:3886:3917:FUNCTION

.. rubric:: ``onClick callback @ 74``

.. code-block:: javascript

   onClick callback @ 74()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:4657:4767:FUNCTION

.. rubric:: ``guidanceActivities.map callback @ 86``

.. code-block:: javascript

   guidanceActivities.map callback @ 86(activity)

作为 ``guidanceActivities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``88`` 行；所属函数 ``memo callback @ 20``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:4895:4926:FUNCTION

.. rubric:: ``onClick callback @ 92``

.. code-block:: javascript

   onClick callback @ 92()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``92``—``92`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。
