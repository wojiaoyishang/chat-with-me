src/features/workflows/WorkflowOrderedInputs 模块
======================================================================================================

.. js:module:: src/features/workflows/WorkflowOrderedInputs

The same ordered list drives the displayed ports and backend collection.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowOrderedInputs.jsx``
* **模块标识**：``src/features/workflows/WorkflowOrderedInputs``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/select``、``@/components/ui/MultilineEditor.jsx``、``./workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:532:9261:FUNCTION

.. js:function:: WorkflowOrderedInputs({ node, graph, definition, onGraphChange, disabled, })

   The same ordered list drives the displayed ports and backend collection.

   **性质**：同步函数；导出 API；源码第 ``21``—``246`` 行。

   **参数**

   ``{ node, graph, definition, onGraphChange, disabled, }``
      调用方传入的 ``node, graph, definition, onGraphChange, disabled,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="workflow-ordered-inputs space-y-3"> <div className="flex items-center justify-between gap-2"> <h4 className="text-sm font-semibold">内容顺序</h4> <span className…``。

   **主要协作调用**：``useState``、``workflowRepeatedItems``、``items.map``、``repeated.kinds.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:985:1073:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(next)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``33``—``34`` 行；所属函数 ``WorkflowOrderedInputs``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onGraphChange``、``setWorkflowRepeatedItems``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:1091:1200:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(id, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``38`` 行；所属函数 ``WorkflowOrderedInputs``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:1135:1192:FUNCTION

.. rubric:: ``items.map callback @ 37``

.. code-block:: javascript

   items.map callback @ 37(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``change``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:1216:1484:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   move(id, index)

实现 ``move`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``46`` 行；所属函数 ``WorkflowOrderedInputs``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``items.findIndex``、``next.splice``、``update``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:1267:1291:FUNCTION

.. rubric:: ``items.findIndex callback @ 40``

.. code-block:: javascript

   items.findIndex callback @ 40(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``move``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:1500:1583:FUNCTION

.. rubric:: ``bind``

.. code-block:: javascript

   bind(name, value)

实现 ``bind`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``48`` 行；所属函数 ``WorkflowOrderedInputs``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onGraphChange``、``bindWorkflowInput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:2079:8582:FUNCTION

.. rubric:: ``items.map callback @ 61``

.. code-block:: javascript

   items.map callback @ 61(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``222`` 行；所属函数 ``WorkflowOrderedInputs``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <li key={item.id} data-input-id={item.id} className={\x60workflow-ordered-item rounded-xl border bg-background p-3 ${dragging === item.id ? "opacity-50" : ""}\x60} onDragOver={(event)…``。

**主要协作调用**：``graph.edges.find``、``graph.nodes.find``、``repeated.kinds.find``、``repeated.kinds.map``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:2184:2261:FUNCTION

.. rubric:: ``graph.edges.find callback @ 64``

.. code-block:: javascript

   graph.edges.find callback @ 64(entry)

作为 ``graph.edges.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:2318:2354:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 66``

.. code-block:: javascript

   graph.nodes.find callback @ 66(entry)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:2508:2541:FUNCTION

.. rubric:: ``repeated.kinds.find callback @ 70``

.. code-block:: javascript

   repeated.kinds.find callback @ 70(kind)

作为 ``repeated.kinds.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:2823:2918:FUNCTION

.. rubric:: ``onDragOver callback @ 76``

.. code-block:: javascript

   onDragOver callback @ 76(event)

处理 ``Drag Over`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:2942:3135:FUNCTION

.. rubric:: ``onDrop callback @ 79``

.. code-block:: javascript

   onDrop callback @ 79(event)

处理 ``Drop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``84`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``move``、``setDragging``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:3553:3761:FUNCTION

.. rubric:: ``onDragStart callback @ 93``

.. code-block:: javascript

   onDragStart callback @ 93(event)

处理 ``Drag Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``97`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.dataTransfer.setData``、``setDragging``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:3792:3815:FUNCTION

.. rubric:: ``onDragEnd callback @ 98``

.. code-block:: javascript

   onDragEnd callback @ 98()

处理 ``Drag End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``items.map callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDragging``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:4308:4338:FUNCTION

.. rubric:: ``onClick callback @ 111``

.. code-block:: javascript

   onClick callback @ 111()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``items.map callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``move``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:4700:4730:FUNCTION

.. rubric:: ``onClick callback @ 121``

.. code-block:: javascript

   onClick callback @ 121()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``items.map callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``move``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:5153:5232:FUNCTION

.. rubric:: ``onClick callback @ 131``

.. code-block:: javascript

   onClick callback @ 131()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``131``—``132`` 行；所属函数 ``items.map callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:5199:5230:FUNCTION

.. rubric:: ``items.filter callback @ 132``

.. code-block:: javascript

   items.filter callback @ 132(entry)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``onClick callback @ 131``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:5582:5617:FUNCTION

.. rubric:: ``onValueChange callback @ 142``

.. code-block:: javascript

   onValueChange callback @ 142(kind)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:5936:6111:FUNCTION

.. rubric:: ``repeated.kinds.map callback @ 151``

.. code-block:: javascript

   repeated.kinds.map callback @ 151(kind)

作为 ``repeated.kinds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``155`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:6434:6511:FUNCTION

.. rubric:: ``onChange callback @ 164``

.. code-block:: javascript

   onChange callback @ 164(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``164``—``165`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:7111:7278:FUNCTION

.. rubric:: ``onClick callback @ 180``

.. code-block:: javascript

   onClick callback @ 180()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``184`` 行；所属函数 ``items.map callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bind``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:7698:7879:FUNCTION

.. rubric:: ``onChange callback @ 196``

.. code-block:: javascript

   onChange callback @ 196(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``196``—``200`` 行；所属函数 ``items.map callback @ 61``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bind``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:8672:9224:FUNCTION

.. rubric:: ``repeated.kinds.map callback @ 225``

.. code-block:: javascript

   repeated.kinds.map callback @ 225(kind)

作为 ``repeated.kinds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``225``—``242`` 行；所属函数 ``WorkflowOrderedInputs``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowOrderedInputs.jsx:8908:9055:FUNCTION

.. rubric:: ``onClick callback @ 232``

.. code-block:: javascript

   onClick callback @ 232()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``232``—``236`` 行；所属函数 ``repeated.kinds.map callback @ 225``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``nextWorkflowRepeatedItemId``。
