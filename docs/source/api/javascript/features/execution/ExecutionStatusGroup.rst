src/features/execution/ExecutionStatusGroup 模块
====================================================================================================

.. js:module:: src/features/execution/ExecutionStatusGroup

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionStatusGroup.jsx``
* **模块标识**：``src/features/execution/ExecutionStatusGroup``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：20

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./ExecutionStatus.jsx``、``./useExecutionStore.js``、``./executionStatusModel.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:372:4993:FUNCTION

.. rubric:: ``memo callback @ 8``

.. code-block:: javascript

   memo callback @ 8({entries = [], continuation = null, conversationId = null})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``77`` 行。

**参数**

``{entries = [], continuation = null, conversationId = null}``
   调用方传入的 ``entries = , continuation = null, conversationId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div data-execution-status-group={calls.length}> <div className="flex items-start gap-2"> <div className="min-w-0 flex-1"> <ExecutionStatus content={primary.content} conversatio…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useState``、``useMemo``、``useExecutionStore``、``[...records, ...(tail ? [tail] : [])].map``、``ranked.reduce``、``ranked.filter``、``calls.filter``、``[...new Map(ranked.flatMap((entry) => entry.guidance.activities) .map((activity) => [activity.id, activity])).values()]…``、``new Map(ranked.flatMap((entry) => entry.guidance.activities) .map((activity) => [activity.id, activity])).values``、``ranked.flatMap((entry) => entry.guidance.activities) .map``、``ranked.flatMap``、``ranked.filter((entry) => entry.guidance.prompt).at``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:519:689:FUNCTION

.. rubric:: ``useMemo callback @ 10``

.. code-block:: javascript

   useMemo callback @ 10()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``12`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``entries.map((entry, index) => ({ ...entry, index, execution: parseExecutionStatus(entry.content, conversationId), })).f…``、``entries.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:537:653:FUNCTION

.. rubric:: ``entries.map callback @ 10``

.. code-block:: javascript

   entries.map callback @ 10(entry, index)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``12`` 行；所属函数 ``useMemo callback @ 10``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseExecutionStatus``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:662:688:FUNCTION

.. rubric:: ``entries.map((entry, index) => ({ ...entry, index, execution: parseExecutionStatus(entry.content, conversationId), })).f… callback @ 12``

.. code-block:: javascript

   entries.map((entry, index) => ({ ...entry, index, execution: parseExecutionStatus(entry.content, conversationId), })).f… callback @ 12(entry)

实现 ``entries.map((entry, index) => ({ ...entry, index, execution: parseExecutionStatus(entry.content, conversationId), })).f…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``useMemo callback @ 10``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:786:1223:FUNCTION

.. rubric:: ``useMemo callback @ 14``

.. code-block:: javascript

   useMemo callback @ 14()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``21`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``execution?.inlineKind === 'continuation' && execution.executionId === target?.executionId && execution.conversationId === target?.conversationId && (execution.runId || '') === (ta…``。

**主要协作调用**：``parseExecutionStatus``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:1301:1453:FUNCTION

.. rubric:: ``useExecutionStore callback @ 22``

.. code-block:: javascript

   useExecutionStore callback @ 22(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``23`` 行；所属函数 ``memo callback @ 8``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:1517:2118:FUNCTION

.. rubric:: ``[...records, ...(tail ? [tail] : [])].map callback @ 24``

.. code-block:: javascript

   [...records, ...(tail ? [tail] : [])].map callback @ 24(entry)

作为 ``[...records, ...(tail ? [tail] : [])].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``33`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...entry, state, guidance, priority}``。

**主要协作调用**：``getExecutionDisplayState``、``projectExecutionStatus``、``getExecutionGuidance``、``['running', 'paused', 'recovering'].includes``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2155:2227:FUNCTION

.. rubric:: ``ranked.reduce callback @ 34``

.. code-block:: javascript

   ranked.reduce callback @ 34(best, entry)

作为 ``ranked.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``memo callback @ 8``。

**参数**

``best``
   调用方传入的 ``best`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2299:2331:FUNCTION

.. rubric:: ``ranked.filter callback @ 36``

.. code-block:: javascript

   ranked.filter callback @ 36(entry)

作为 ``ranked.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2367:2401:FUNCTION

.. rubric:: ``calls.filter callback @ 37``

.. code-block:: javascript

   calls.filter callback @ 37(entry)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2496:2532:FUNCTION

.. rubric:: ``ranked.flatMap callback @ 39``

.. code-block:: javascript

   ranked.flatMap callback @ 39(entry)

实现 ``ranked.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2547:2584:FUNCTION

.. rubric:: ``ranked.flatMap((entry) => entry.guidance.activities) .map callback @ 40``

.. code-block:: javascript

   ranked.flatMap((entry) => entry.guidance.activities) .map callback @ 40(activity)

作为 ``ranked.flatMap((entry) => entry.guidance.activities) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``memo callback @ 8``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2602:2667:FUNCTION

.. rubric:: ``[...new Map(ranked.flatMap((entry) => entry.guidance.activities) .map((activity) => [activity.id, activity])).values()]… callback @ 40``

.. code-block:: javascript

   [...new Map(ranked.flatMap((entry) => entry.guidance.activities) .map((activity) => [activity.id, activity])).values()]… callback @ 40(left, right)

实现 ``[...new Map(ranked.flatMap((entry) => entry.guidance.activities) .map((activity) => [activity.id, activity])).values()]…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``memo callback @ 8``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2711:2743:FUNCTION

.. rubric:: ``ranked.filter callback @ 41``

.. code-block:: javascript

   ranked.filter callback @ 41(entry)

作为 ``ranked.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2815:2850:FUNCTION

.. rubric:: ``calls.filter callback @ 42``

.. code-block:: javascript

   calls.filter callback @ 42(entry)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2900:2938:FUNCTION

.. rubric:: ``calls.filter callback @ 43``

.. code-block:: javascript

   calls.filter callback @ 43(entry)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:2986:3050:FUNCTION

.. rubric:: ``ranked.every callback @ 44``

.. code-block:: javascript

   ranked.every callback @ 44(entry)

作为 ``ranked.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['completed', 'historicalDone'].includes``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:4140:4176:FUNCTION

.. rubric:: ``onClick callback @ 59``

.. code-block:: javascript

   onClick callback @ 59()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:4158:4175:FUNCTION

.. rubric:: ``setExpanded callback @ 59``

.. code-block:: javascript

   setExpanded callback @ 59(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``onClick callback @ 59``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionStatusGroup.jsx:4560:4929:FUNCTION

.. rubric:: ``history.map callback @ 67``

.. code-block:: javascript

   history.map callback @ 67(entry)

作为 ``history.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``72`` 行；所属函数 ``memo callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
