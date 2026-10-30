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
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/spinner``、``@/components/markdown/card-block/useExpandedState.js``、``@/components/markdown/card-block/expandedStore.js``、``./ExecutionStatus.jsx``、``./ExecutionGuidanceBubble.jsx``、``./executionStatusModel.js``、``./workProcessModel.js``、``./useExecutionStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:749:964:FUNCTION

.. js:function:: ReasoningContent({entry})

   渲染 ``ReasoningContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``16`` 行。

   **参数**

   ``{entry}``
      调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2135:3204:FUNCTION

.. js:function:: ProcessRecords({expanded, children})

   渲染 ``ProcessRecords`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``57`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:996:1978:FUNCTION

.. rubric:: ``memo callback @ 18``

.. code-block:: javascript

   memo callback @ 18({entry, expandedKey})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``33`` 行。

**参数**

``{entry, expandedKey}``
   调用方传入的 ``entry, expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="py-1.5" data-process-reasoning={entry.id}> <button type="button" onClick={() => setExpanded((value) => !value, {isUserAction: true})} aria-expanded={expanded} clas…``。

**主要协作调用**：``useExpandedState``、``useEffect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1179:1273:FUNCTION

.. rubric:: ``useEffect callback @ 21``

.. code-block:: javascript

   useEffect callback @ 21()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``23`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``hasExpandedUserOverride``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1430:1488:FUNCTION

.. rubric:: ``onClick callback @ 25``

.. code-block:: javascript

   onClick callback @ 25()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1448:1465:FUNCTION

.. rubric:: ``setExpanded callback @ 25``

.. code-block:: javascript

   setExpanded callback @ 25(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``onClick callback @ 25``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2234:2552:FUNCTION

.. rubric:: ``useEffect callback @ 39``

.. code-block:: javascript

   useEffect callback @ 39()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``48`` 行；所属函数 ``ProcessRecords``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setRetained``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2473:2497:FUNCTION

.. rubric:: ``setTimeout callback @ 46``

.. code-block:: javascript

   setTimeout callback @ 46()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``useEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetained``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2519:2545:FUNCTION

.. rubric:: ``returned callback @ 47``

.. code-block:: javascript

   returned callback @ 47()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``useEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2940:3096:FUNCTION

.. rubric:: ``onTransitionEnd callback @ 52``

.. code-block:: javascript

   onTransitionEnd callback @ 52(event)

处理 ``Transition End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``52``—``54`` 行；所属函数 ``ProcessRecords``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetained``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3329:8488:FUNCTION

.. rubric:: ``memo callback @ 60``

.. code-block:: javascript

   memo callback @ 60({entries, contextId = '', conversationId = '', isStreaming = false, tail = false})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``120`` 行。

**参数**

``{entries, contextId = '', conversationId = '', isStreaming = false, tail = false}``
   调用方传入的 ``entries, contextId = '', conversationId = '', isStreaming = false, tail = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="w-full py-1" data-work-process={entries[0]?.id} data-process-state={model.state} data-process-call-count={model.calls.length} data-process-primary={model.target?.s…``。

**主要协作调用**：``[...entries].reverse().find``、``[...entries].reverse``、``useExecutionStore``、``useMemo``、``useExpandedState``、``useEffect``、``model.records.filter((entry) => entry.execution).map``、``model.records.filter``、``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…``、``new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values``、``guidances.flatMap((guidance) => guidance.activities).map``、``guidances.flatMap``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3465:3491:FUNCTION

.. rubric:: ``[...entries].reverse().find callback @ 61``

.. code-block:: javascript

   [...entries].reverse().find callback @ 61(entry)

作为 ``[...entries].reverse().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``memo callback @ 60``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3540:3685:FUNCTION

.. rubric:: ``useExecutionStore callback @ 62``

.. code-block:: javascript

   useExecutionStore callback @ 62(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``63`` 行；所属函数 ``memo callback @ 60``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3714:3774:FUNCTION

.. rubric:: ``useMemo callback @ 64``

.. code-block:: javascript

   useMemo callback @ 64()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``memo callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``projectWorkProcess``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4242:4336:FUNCTION

.. rubric:: ``useEffect callback @ 70``

.. code-block:: javascript

   useEffect callback @ 70()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``72`` 行；所属函数 ``memo callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``hasExpandedUserOverride``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4398:4712:FUNCTION

.. rubric:: ``useEffect callback @ 73``

.. code-block:: javascript

   useEffect callback @ 73()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``77`` 行；所属函数 ``memo callback @ 60``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``useExecutionStore.getState``、``Number``、``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4768:4794:FUNCTION

.. rubric:: ``model.records.filter callback @ 78``

.. code-block:: javascript

   model.records.filter callback @ 78(entry)

作为 ``model.records.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``memo callback @ 60``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4800:4854:FUNCTION

.. rubric:: ``model.records.filter((entry) => entry.execution).map callback @ 78``

.. code-block:: javascript

   model.records.filter((entry) => entry.execution).map callback @ 78(entry)

作为 ``model.records.filter((entry) => entry.execution).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``memo callback @ 60``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4910:4943:FUNCTION

.. rubric:: ``guidances.flatMap callback @ 79``

.. code-block:: javascript

   guidances.flatMap callback @ 79(guidance)

实现 ``guidances.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``memo callback @ 60``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4949:4986:FUNCTION

.. rubric:: ``guidances.flatMap((guidance) => guidance.activities).map callback @ 79``

.. code-block:: javascript

   guidances.flatMap((guidance) => guidance.activities).map callback @ 79(activity)

作为 ``guidances.flatMap((guidance) => guidance.activities).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``memo callback @ 60``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5013:5078:FUNCTION

.. rubric:: ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 80``

.. code-block:: javascript

   [...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 80(left, right)

实现 ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``memo callback @ 60``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5119:5148:FUNCTION

.. rubric:: ``guidances.findLast callback @ 81``

.. code-block:: javascript

   guidances.findLast callback @ 81(guidance)

实现 ``guidances.findLast`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``memo callback @ 60``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5388:5559:FUNCTION

.. rubric:: ``navigate``

.. code-block:: javascript

   navigate()

实现 ``navigate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``84``—``85`` 行；所属函数 ``memo callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5587:5887:FUNCTION

.. rubric:: ``toggleExpanded``

.. code-block:: javascript

   toggleExpanded()

切换与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``86``—``91`` 行；所属函数 ``memo callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``、``setExpandedValue``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:7768:8046:FUNCTION

.. rubric:: ``model.records.map callback @ 111``

.. code-block:: javascript

   model.records.map callback @ 111(entry)

作为 ``model.records.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``113`` 行；所属函数 ``memo callback @ 60``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:8105:8217:FUNCTION

.. rubric:: ``activities.map callback @ 115``

.. code-block:: javascript

   activities.map callback @ 115(activity)

作为 ``activities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``memo callback @ 60``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
