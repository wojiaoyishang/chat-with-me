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

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:731:946:FUNCTION

.. js:function:: ReasoningContent({entry})

   渲染 ``ReasoningContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``16`` 行。

   **参数**

   ``{entry}``
      调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1799:2868:FUNCTION

.. js:function:: ProcessRecords({expanded, children})

   渲染 ``ProcessRecords`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``53`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:978:1642:FUNCTION

.. rubric:: ``memo callback @ 18``

.. code-block:: javascript

   memo callback @ 18({entry})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``29`` 行。

**参数**

``{entry}``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="py-1.5" data-process-reasoning={entry.id}> <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="flex items-cent…``。

**主要协作调用**：``useState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1155:1191:FUNCTION

.. rubric:: ``onClick callback @ 21``

.. code-block:: javascript

   onClick callback @ 21()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1173:1190:FUNCTION

.. rubric:: ``setExpanded callback @ 21``

.. code-block:: javascript

   setExpanded callback @ 21(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``onClick callback @ 21``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:1898:2216:FUNCTION

.. rubric:: ``useEffect callback @ 35``

.. code-block:: javascript

   useEffect callback @ 35()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``44`` 行；所属函数 ``ProcessRecords``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setRetained``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2137:2161:FUNCTION

.. rubric:: ``setTimeout callback @ 42``

.. code-block:: javascript

   setTimeout callback @ 42()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetained``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2183:2209:FUNCTION

.. rubric:: ``returned callback @ 43``

.. code-block:: javascript

   returned callback @ 43()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2604:2760:FUNCTION

.. rubric:: ``onTransitionEnd callback @ 48``

.. code-block:: javascript

   onTransitionEnd callback @ 48(event)

处理 ``Transition End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``48``—``50`` 行；所属函数 ``ProcessRecords``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetained``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:2993:7802:FUNCTION

.. rubric:: ``memo callback @ 56``

.. code-block:: javascript

   memo callback @ 56({entries, contextId = '', conversationId = '', isStreaming = false, tail = false})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``110`` 行。

**参数**

``{entries, contextId = '', conversationId = '', isStreaming = false, tail = false}``
   调用方传入的 ``entries, contextId = '', conversationId = '', isStreaming = false, tail = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="w-full py-1" data-work-process={entries[0]?.id} data-process-state={model.state} data-process-call-count={model.calls.length} data-process-primary={model.target?.s…``。

**主要协作调用**：``[...entries].reverse().find``、``[...entries].reverse``、``useExecutionStore``、``useMemo``、``useExpandedState``、``useEffect``、``model.records.filter((entry) => entry.execution).map``、``model.records.filter``、``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…``、``new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values``、``guidances.flatMap((guidance) => guidance.activities).map``、``guidances.flatMap``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3129:3155:FUNCTION

.. rubric:: ``[...entries].reverse().find callback @ 57``

.. code-block:: javascript

   [...entries].reverse().find callback @ 57(entry)

作为 ``[...entries].reverse().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``memo callback @ 56``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3204:3349:FUNCTION

.. rubric:: ``useExecutionStore callback @ 58``

.. code-block:: javascript

   useExecutionStore callback @ 58(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``59`` 行；所属函数 ``memo callback @ 56``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3378:3438:FUNCTION

.. rubric:: ``useMemo callback @ 60``

.. code-block:: javascript

   useMemo callback @ 60()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``memo callback @ 56``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``projectWorkProcess``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:3893:3987:FUNCTION

.. rubric:: ``useEffect callback @ 66``

.. code-block:: javascript

   useEffect callback @ 66()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``68`` 行；所属函数 ``memo callback @ 56``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``hasExpandedUserOverride``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4049:4363:FUNCTION

.. rubric:: ``useEffect callback @ 69``

.. code-block:: javascript

   useEffect callback @ 69()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``69``—``73`` 行；所属函数 ``memo callback @ 56``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``useExecutionStore.getState``、``Number``、``upsertExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4419:4445:FUNCTION

.. rubric:: ``model.records.filter callback @ 74``

.. code-block:: javascript

   model.records.filter callback @ 74(entry)

作为 ``model.records.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``memo callback @ 56``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4451:4505:FUNCTION

.. rubric:: ``model.records.filter((entry) => entry.execution).map callback @ 74``

.. code-block:: javascript

   model.records.filter((entry) => entry.execution).map callback @ 74(entry)

作为 ``model.records.filter((entry) => entry.execution).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``memo callback @ 56``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4561:4594:FUNCTION

.. rubric:: ``guidances.flatMap callback @ 75``

.. code-block:: javascript

   guidances.flatMap callback @ 75(guidance)

实现 ``guidances.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``memo callback @ 56``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4600:4637:FUNCTION

.. rubric:: ``guidances.flatMap((guidance) => guidance.activities).map callback @ 75``

.. code-block:: javascript

   guidances.flatMap((guidance) => guidance.activities).map callback @ 75(activity)

作为 ``guidances.flatMap((guidance) => guidance.activities).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``memo callback @ 56``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4664:4729:FUNCTION

.. rubric:: ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 76``

.. code-block:: javascript

   [...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]… callback @ 76(left, right)

实现 ``[...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``memo callback @ 56``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:4770:4799:FUNCTION

.. rubric:: ``guidances.findLast callback @ 77``

.. code-block:: javascript

   guidances.findLast callback @ 77(guidance)

实现 ``guidances.findLast`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``memo callback @ 56``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5039:5210:FUNCTION

.. rubric:: ``navigate``

.. code-block:: javascript

   navigate()

实现 ``navigate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``81`` 行；所属函数 ``memo callback @ 56``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5543:5601:FUNCTION

.. rubric:: ``onClick callback @ 85``

.. code-block:: javascript

   onClick callback @ 85()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``memo callback @ 56``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:5561:5578:FUNCTION

.. rubric:: ``setExpanded callback @ 85``

.. code-block:: javascript

   setExpanded callback @ 85(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``onClick callback @ 85``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:7135:7360:FUNCTION

.. rubric:: ``model.records.map callback @ 101``

.. code-block:: javascript

   model.records.map callback @ 101(entry)

作为 ``model.records.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``103`` 行；所属函数 ``memo callback @ 56``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/WorkProcessGroup.jsx:7419:7531:FUNCTION

.. rubric:: ``activities.map callback @ 105``

.. code-block:: javascript

   activities.map callback @ 105(activity)

作为 ``activities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``memo callback @ 56``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
