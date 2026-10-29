src/features/execution/WorkProcessGroup 模块
============================================================================================

.. js:module:: src/features/execution/WorkProcessGroup

Retain records during the CSS exit, then release their live subscriptions.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/WorkProcessGroup.jsx``
* **模块标识**：``src/features/execution/WorkProcessGroup``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/spinner``、``@/components/markdown/card-block/useExpandedState.js``、``@/components/markdown/card-block/expandedStore.js``、``./ExecutionStatus.jsx``、``./ExecutionGuidanceBubble.jsx``、``./executionStatusModel.js``、``./workProcessModel.js``、``./useExecutionStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1627:2696:FUNCTION

.. js:function:: ProcessRecords({expanded, children})

   渲染 ``ProcessRecords`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``27``—``47`` 行。

   **参数**

   ``{expanded, children}``
      调用方传入的 ``expanded, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div data-work-process-panel data-state={expanded ? 'open' : 'closed'} aria-hidden={!expanded} inert={!expanded || undefined} className={\x60grid transition-[grid-template-rows,opaci…``。

   **主要协作调用**：``useState``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:736:1470:FUNCTION

.. rubric:: ``memo callback @ 12``

.. code-block:: javascript

   memo callback @ 12({entry})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``23`` 行。

**参数**

``{entry}``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="py-1.5" data-process-reasoning={entry.id}> <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="flex items-cent…``。

**主要协作调用**：``useState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:913:949:FUNCTION

.. rubric:: ``onClick callback @ 15``

.. code-block:: javascript

   onClick callback @ 15()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``memo callback @ 12``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:931:948:FUNCTION

.. rubric:: ``setExpanded callback @ 15``

.. code-block:: javascript

   setExpanded callback @ 15(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``onClick callback @ 15``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1726:2044:FUNCTION

.. rubric:: ``useEffect callback @ 29``

.. code-block:: javascript

   useEffect callback @ 29()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``38`` 行；所属函数 ``ProcessRecords``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setRetained``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1965:1989:FUNCTION

.. rubric:: ``setTimeout callback @ 36``

.. code-block:: javascript

   setTimeout callback @ 36()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetained``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2011:2037:FUNCTION

.. rubric:: ``returned callback @ 37``

.. code-block:: javascript

   returned callback @ 37()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2432:2588:FUNCTION

.. rubric:: ``onTransitionEnd callback @ 42``

.. code-block:: javascript

   onTransitionEnd callback @ 42(event)

处理 ``Transition End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``42``—``44`` 行；所属函数 ``ProcessRecords``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetained``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2821:7367:FUNCTION

.. rubric:: ``memo callback @ 50``

.. code-block:: javascript

   memo callback @ 50({entries, contextId = '', conversationId = '', isStreaming = false, tail = false})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``102`` 行。

**参数**

``{entries, contextId = '', conversationId = '', isStreaming = false, tail = false}``
   调用方传入的 ``entries, contextId = '', conversationId = '', isStreaming = false, tail = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="w-full py-1" data-work-process={entries[0]?.id} data-process-state={model.state} data-process-call-count={model.calls.length} data-process-primary={model.target?.s…``。

**主要协作调用**：``[...entries].reverse().find``、``[...entries].reverse``、``useExecutionStore``、``useMemo``、``useExpandedState``、``useEffect``、``model.records.filter((entry) => entry.execution).map``、``model.records.filter``、``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…``、``new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values``、``guidances.flatMap((guidance) => guidance.activities).map``、``guidances.flatMap``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2957:2983:FUNCTION

.. rubric:: ``[...entries].reverse().find callback @ 51``

.. code-block:: javascript

   [...entries].reverse().find callback @ 51(entry)

作为 ``[...entries].reverse().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``memo callback @ 50``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3032:3177:FUNCTION

.. rubric:: ``useExecutionStore callback @ 52``

.. code-block:: javascript

   useExecutionStore callback @ 52(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``53`` 行；所属函数 ``memo callback @ 50``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3206:3266:FUNCTION

.. rubric:: ``useMemo callback @ 54``

.. code-block:: javascript

   useMemo callback @ 54()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``memo callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``projectWorkProcess``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3533:3622:FUNCTION

.. rubric:: ``useEffect callback @ 58``

.. code-block:: javascript

   useEffect callback @ 58()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``60`` 行；所属函数 ``memo callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``hasExpandedUserOverride``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3678:3992:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``65`` 行；所属函数 ``memo callback @ 50``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``useExecutionStore.getState``、``Number``、``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4048:4074:FUNCTION

.. rubric:: ``model.records.filter callback @ 66``

.. code-block:: javascript

   model.records.filter callback @ 66(entry)

作为 ``model.records.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``memo callback @ 50``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4080:4134:FUNCTION

.. rubric:: ``model.records.filter((entry) => entry.execution).map callback @ 66``

.. code-block:: javascript

   model.records.filter((entry) => entry.execution).map callback @ 66(entry)

作为 ``model.records.filter((entry) => entry.execution).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``memo callback @ 50``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4190:4223:FUNCTION

.. rubric:: ``guidances.flatMap callback @ 67``

.. code-block:: javascript

   guidances.flatMap callback @ 67(guidance)

实现 ``guidances.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``memo callback @ 50``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4229:4266:FUNCTION

.. rubric:: ``guidances.flatMap((guidance) => guidance.activities).map callback @ 67``

.. code-block:: javascript

   guidances.flatMap((guidance) => guidance.activities).map callback @ 67(activity)

作为 ``guidances.flatMap((guidance) => guidance.activities).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``memo callback @ 50``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4293:4358:FUNCTION

.. rubric:: ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 68``

.. code-block:: javascript

   [...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 68(left, right)

实现 ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``memo callback @ 50``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4399:4428:FUNCTION

.. rubric:: ``guidances.findLast callback @ 69``

.. code-block:: javascript

   guidances.findLast callback @ 69(guidance)

实现 ``guidances.findLast`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``memo callback @ 50``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4668:4839:FUNCTION

.. rubric:: ``navigate``

.. code-block:: javascript

   navigate()

实现 ``navigate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``72``—``73`` 行；所属函数 ``memo callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5172:5230:FUNCTION

.. rubric:: ``onClick callback @ 77``

.. code-block:: javascript

   onClick callback @ 77()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``memo callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5190:5207:FUNCTION

.. rubric:: ``setExpanded callback @ 77``

.. code-block:: javascript

   setExpanded callback @ 77(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``onClick callback @ 77``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:6700:6925:FUNCTION

.. rubric:: ``model.records.map callback @ 93``

.. code-block:: javascript

   model.records.map callback @ 93(entry)

作为 ``model.records.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``95`` 行；所属函数 ``memo callback @ 50``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:6984:7096:FUNCTION

.. rubric:: ``activities.map callback @ 97``

.. code-block:: javascript

   activities.map callback @ 97(activity)

作为 ``activities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``memo callback @ 50``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
