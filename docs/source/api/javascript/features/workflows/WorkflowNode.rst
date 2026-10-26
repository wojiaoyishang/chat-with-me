src/features/workflows/WorkflowNode 模块
====================================================================================

.. js:module:: src/features/workflows/WorkflowNode

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowNode.jsx``
* **模块标识**：``src/features/workflows/WorkflowNode``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：17

主要依赖
--------------------------------------------------------------------------------

``react``、``@xyflow/react``、``lucide-react``、``./workflowModel.js``、``./WorkflowDataField.jsx``、``./WorkflowSubgraphSetup.jsx``、``./workflowStatus.js``、``../tasks/RunObservation.jsx``、``./WorkflowNodeBadge.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:735:10018:FUNCTION

.. js:function:: WorkflowNode({ data, selected })

   渲染 ``WorkflowNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``31``—``292`` 行。

   **参数**

   ``{ data, selected }``
      调用方传入的 ``data, selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60workflow-node category-${category} ${subgraph ? "is-subgraph" : ""} ${selected ? "is-selected" : ""} ${status ? \x60status-${status}\x60 : ""}\x60} > <div className="wor…``。

   **主要协作调用**：``nodeCategory``、``useUpdateNodeInternals``、``Object.keys(node.inputs || {}) .filter((key) => node.inputs[key]?.type === "literal") .join``、``Object.keys(node.inputs || {}) .filter``、``Object.keys``、``[ ...(definition?.inputs || []), ...(definition?.outputs || []), ] .map((port) => \x60${port.name}:${port.display?.title}\x60…``、``[ ...(definition?.inputs || []), ...(definition?.outputs || []), ] .map``、``useEffect``、``Boolean``、``["completed", "succeeded"].includes``、``sourceNodeValue``、``(definition?.inputs || []).map``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:1113:1158:FUNCTION

.. rubric:: ``Object.keys(node.inputs || {}) .filter callback @ 38``

.. code-block:: javascript

   Object.keys(node.inputs || {}) .filter callback @ 38(key)

作为 ``Object.keys(node.inputs || {}) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``WorkflowNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:1286:1333:FUNCTION

.. rubric:: ``[ ...(definition?.inputs || []), ...(definition?.outputs || []), ] .map callback @ 44``

.. code-block:: javascript

   [ ...(definition?.inputs || []), ...(definition?.outputs || []), ] .map callback @ 44(port)

作为 ``[ ...(definition?.inputs || []), ...(definition?.outputs || []), ] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``WorkflowNode``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:1363:1396:FUNCTION

.. rubric:: ``useEffect callback @ 46``

.. code-block:: javascript

   useEffect callback @ 46()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``46``—``48`` 行；所属函数 ``WorkflowNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:2078:2112:FUNCTION

.. rubric:: ``onPointerDown callback @ 69``

.. code-block:: javascript

   onPointerDown callback @ 69(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:2488:2615:FUNCTION

.. rubric:: ``onClick callback @ 79``

.. code-block:: javascript

   onClick callback @ 79(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``82`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``data.onToggleOutput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:2909:3019:FUNCTION

.. rubric:: ``onClick callback @ 93``

.. code-block:: javascript

   onClick callback @ 93(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``96`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``data.onMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:5273:5307:FUNCTION

.. rubric:: ``onPointerDown callback @ 160``

.. code-block:: javascript

   onPointerDown callback @ 160(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:5504:5620:FUNCTION

.. rubric:: ``onClick callback @ 166``

.. code-block:: javascript

   onClick callback @ 166(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``169`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``data.onEnter``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:5987:6124:FUNCTION

.. rubric:: ``onClick callback @ 179``

.. code-block:: javascript

   onClick callback @ 179(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``182`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``data.onSaveSubgraphTemplate``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:6439:6473:FUNCTION

.. rubric:: ``onPointerDown callback @ 195``

.. code-block:: javascript

   onPointerDown callback @ 195(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``WorkflowNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:6753:6792:FUNCTION

.. rubric:: ``onChange callback @ 203``

.. code-block:: javascript

   onChange callback @ 203(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``203``—``203`` 行；所属函数 ``WorkflowNode``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``data.onValue``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:6820:6856:FUNCTION

.. rubric:: ``onBusyChange callback @ 204``

.. code-block:: javascript

   onBusyChange callback @ 204(busy)

处理 ``Busy Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``WorkflowNode``。

**参数**

``busy``
   调用方传入的 ``busy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``data.onBusy``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:6995:8953:FUNCTION

.. rubric:: ``(definition?.inputs || []).map callback @ 210``

.. code-block:: javascript

   (definition?.inputs || []).map callback @ 210(port)

作为 ``(definition?.inputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``210``—``263`` 行；所属函数 ``WorkflowNode``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60workflow-port ${inline ? "is-inline" : ""}\x60} key={port.name} onContextMenu={(event) => { if (!readOnly && port.inlineAllowed) { event.preventDefault(); event.st…``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:7412:7667:FUNCTION

.. rubric:: ``onContextMenu callback @ 220``

.. code-block:: javascript

   onContextMenu callback @ 220(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``220``—``226`` 行；所属函数 ``(definition?.inputs || []).map callback @ 210``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``data.onPortMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:8294:8328:FUNCTION

.. rubric:: ``onPointerDown callback @ 244``

.. code-block:: javascript

   onPointerDown callback @ 244(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``244``—``244`` 行；所属函数 ``(definition?.inputs || []).map callback @ 210``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:8640:8814:FUNCTION

.. rubric:: ``onChange callback @ 252``

.. code-block:: javascript

   onChange callback @ 252(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``252``—``256`` 行；所属函数 ``(definition?.inputs || []).map callback @ 210``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``data.onBinding``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNode.jsx:9028:9484:FUNCTION

.. rubric:: ``(definition?.outputs || []).map callback @ 266``

.. code-block:: javascript

   (definition?.outputs || []).map callback @ 266(port)

作为 ``(definition?.outputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``266``—``276`` 行；所属函数 ``WorkflowNode``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
