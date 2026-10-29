src/features/execution/WorkProcessGroup 模块
============================================================================================

.. js:module:: src/features/execution/WorkProcessGroup

One stable, initially collapsed host for an adjacent stretch of work.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/WorkProcessGroup.jsx``
* **模块标识**：``src/features/execution/WorkProcessGroup``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：19

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/spinner``、``@/components/markdown/card-block/useExpandedState.js``、``./ExecutionStatus.jsx``、``./ExecutionGuidanceBubble.jsx``、``./executionStatusModel.js``、``./workProcessModel.js``、``./useExecutionStore.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:645:1379:FUNCTION

.. rubric:: ``memo callback @ 11``

.. code-block:: javascript

   memo callback @ 11({entry})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``22`` 行。

**参数**

``{entry}``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="py-1.5" data-process-reasoning={entry.id}> <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="flex items-cent…``。

**主要协作调用**：``useState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:822:858:FUNCTION

.. rubric:: ``onClick callback @ 14``

.. code-block:: javascript

   onClick callback @ 14()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:840:857:FUNCTION

.. rubric:: ``setExpanded callback @ 14``

.. code-block:: javascript

   setExpanded callback @ 14(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``onClick callback @ 14``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1539:5808:FUNCTION

.. rubric:: ``memo callback @ 26``

.. code-block:: javascript

   memo callback @ 26({entries, contextId = '', conversationId = '', isStreaming = false, tail = false})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``73`` 行。

**参数**

``{entries, contextId = '', conversationId = '', isStreaming = false, tail = false}``
   调用方传入的 ``entries, contextId = '', conversationId = '', isStreaming = false, tail = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="w-full py-1" data-work-process={entries[0]?.id} data-process-state={model.state} data-process-call-count={model.calls.length} data-process-primary={model.target?.s…``。

**主要协作调用**：``[...entries].reverse().find``、``[...entries].reverse``、``useExecutionStore``、``useExpandedState``、``useMemo``、``useEffect``、``model.records.filter((entry) => entry.execution).map``、``model.records.filter``、``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…``、``new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values``、``guidances.flatMap((guidance) => guidance.activities).map``、``guidances.flatMap``。

**内部回调数量**：14。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1675:1701:FUNCTION

.. rubric:: ``[...entries].reverse().find callback @ 27``

.. code-block:: javascript

   [...entries].reverse().find callback @ 27(entry)

作为 ``[...entries].reverse().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``memo callback @ 26``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1750:1895:FUNCTION

.. rubric:: ``useExecutionStore callback @ 28``

.. code-block:: javascript

   useExecutionStore callback @ 28(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``29`` 行；所属函数 ``memo callback @ 26``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2045:2105:FUNCTION

.. rubric:: ``useMemo callback @ 31``

.. code-block:: javascript

   useMemo callback @ 31()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``memo callback @ 26``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``projectWorkProcess``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2158:2472:FUNCTION

.. rubric:: ``useEffect callback @ 32``

.. code-block:: javascript

   useEffect callback @ 32()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``32``—``36`` 行；所属函数 ``memo callback @ 26``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``useExecutionStore.getState``、``Number``、``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2528:2554:FUNCTION

.. rubric:: ``model.records.filter callback @ 37``

.. code-block:: javascript

   model.records.filter callback @ 37(entry)

作为 ``model.records.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``memo callback @ 26``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2560:2614:FUNCTION

.. rubric:: ``model.records.filter((entry) => entry.execution).map callback @ 37``

.. code-block:: javascript

   model.records.filter((entry) => entry.execution).map callback @ 37(entry)

作为 ``model.records.filter((entry) => entry.execution).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``memo callback @ 26``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2670:2703:FUNCTION

.. rubric:: ``guidances.flatMap callback @ 38``

.. code-block:: javascript

   guidances.flatMap callback @ 38(guidance)

实现 ``guidances.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``memo callback @ 26``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2709:2746:FUNCTION

.. rubric:: ``guidances.flatMap((guidance) => guidance.activities).map callback @ 38``

.. code-block:: javascript

   guidances.flatMap((guidance) => guidance.activities).map callback @ 38(activity)

作为 ``guidances.flatMap((guidance) => guidance.activities).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``memo callback @ 26``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2773:2838:FUNCTION

.. rubric:: ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 39``

.. code-block:: javascript

   [...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 39(left, right)

实现 ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``memo callback @ 26``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2879:2908:FUNCTION

.. rubric:: ``guidances.findLast callback @ 40``

.. code-block:: javascript

   guidances.findLast callback @ 40(guidance)

实现 ``guidances.findLast`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``memo callback @ 26``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3148:3319:FUNCTION

.. rubric:: ``navigate``

.. code-block:: javascript

   navigate()

实现 ``navigate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``44`` 行；所属函数 ``memo callback @ 26``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3652:3710:FUNCTION

.. rubric:: ``onClick callback @ 48``

.. code-block:: javascript

   onClick callback @ 48()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``memo callback @ 26``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3670:3687:FUNCTION

.. rubric:: ``setExpanded callback @ 48``

.. code-block:: javascript

   setExpanded callback @ 48(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``onClick callback @ 48``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5157:5382:FUNCTION

.. rubric:: ``model.records.map callback @ 64``

.. code-block:: javascript

   model.records.map callback @ 64(entry)

作为 ``model.records.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``66`` 行；所属函数 ``memo callback @ 26``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5425:5537:FUNCTION

.. rubric:: ``activities.map callback @ 68``

.. code-block:: javascript

   activities.map callback @ 68(activity)

作为 ``activities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``memo callback @ 26``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
