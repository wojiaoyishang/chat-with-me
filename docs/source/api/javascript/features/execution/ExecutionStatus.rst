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
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react-i18next``、``react``、``lucide-react``、``./ExecutionGuidanceBubble.jsx``、``./useExecutionStore.js``、``./executionStatusModel.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:527:7109:FUNCTION

.. rubric:: ``memo callback @ 9``

.. code-block:: javascript

   memo callback @ 9({ content = '', conversationId = null, navigateOverview = false, hideGuidance = false, guidanceActi…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``139`` 行。

**参数**

``{ content = '', conversationId = null, navigateOverview = false, hideGuidance = false, guidanceActi…``
   调用方传入的 ``content = '', conversationId = null, navigateOverview = false, hideGuidance = false, guidanceActi…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="my-1 w-full" data-execution-status-id={nodeStatusId || undefined}> <button type="button" onClick={openAtNode} className="group flex max-w-full flex-col items-sta…``。

**主要协作调用**：``useTranslation``、``useMemo``、``useExecutionStore``、``useEffect``、``projectExecutionStatus``、``String(displayExecution.status || '').toLowerCase``、``String``、``String(displayExecution.label || '').trim``、``getExecutionDisplayState``、``Boolean``、``String(displayExecution.action || '').trim``、``action.replace``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:763:814:FUNCTION

.. rubric:: ``useMemo callback @ 12``

.. code-block:: javascript

   useMemo callback @ 12()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseExecutionStatus``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:888:1183:FUNCTION

.. rubric:: ``useExecutionStore callback @ 13``

.. code-block:: javascript

   useExecutionStore callback @ 13(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``18`` 行；所属函数 ``memo callback @ 9``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``state.sessions[cid]?.executions?.[executionId] || null``。

**主要协作调用**：``String(execution?.conversationId || conversationId || '').trim``、``String``、``String(execution?.executionId || '').trim``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:1201:1894:FUNCTION

.. rubric:: ``useEffect callback @ 20``

.. code-block:: javascript

   useEffect callback @ 20()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``20``—``31`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``useExecutionStore.getState``、``Number``、``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:4322:4552:FUNCTION

.. rubric:: ``openAtNode``

.. code-block:: javascript

   openAtNode()

打开与 ``At Node`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``93`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatus.jsx:6094:6252:FUNCTION

.. rubric:: ``guidanceActivities.map callback @ 119``

.. code-block:: javascript

   guidanceActivities.map callback @ 119(activity)

作为 ``guidanceActivities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``121`` 行；所属函数 ``memo callback @ 9``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
