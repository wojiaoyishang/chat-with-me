src/features/workflows/WorkflowCanvas 模块
========================================================================================

.. js:module:: src/features/workflows/WorkflowCanvas

Dragging and measurement update only the canvas; a gesture saves once.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowCanvas.jsx``
* **模块标识**：``src/features/workflows/WorkflowCanvas``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：20

主要依赖
--------------------------------------------------------------------------------

``react``、``@xyflow/react``、``./workflowCanvasModel.js``、``./WorkflowParallelRegions.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:352:4837:FUNCTION

.. js:function:: WorkflowCanvas({ nodes, selectionRequest, fitRequest, focusRequest, autoFollow = false, parallelRegions = NO_REGIO…)

   Dragging and measurement update only the canvas; a gesture saves once.

   **性质**：同步函数；导出 API；源码第 ``17``—``155`` 行。

   **参数**

   ``{ nodes, selectionRequest, fitRequest, focusRequest, autoFollow = false, parallelRegions = NO_REGIO…``
      调用方传入的 ``nodes, selectionRequest, fitRequest, focusRequest, autoFollow = false, parallelRegions = NO_REGIO…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ReactFlow {...props} nodes={canvasNodes} onNodesChange={changeNodes} onNodeDragStop={stopNodeDrag} onSelectionDragStop={stopSelectionDrag} > {props.children} <WorkflowParallelR…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useReactFlow``、``useNodesInitialized``、``useRef``、``useState``、``useEffect``、``Boolean``、``canvasNodes.some``、``useCallback``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:826:889:FUNCTION

.. rubric:: ``useState callback @ 32``

.. code-block:: javascript

   useState callback @ 32()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``32``—``33`` 行；所属函数 ``WorkflowCanvas``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectCanvasNodes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:908:2517:FUNCTION

.. rubric:: ``useEffect callback @ 35``

.. code-block:: javascript

   useEffect callback @ 35()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``82`` 行；所属函数 ``WorkflowCanvas``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { canceled = true; cancelAnimationFrame(frame); cancelAnimationFrame(nextFrame); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``canvasNodes.some``、``requestAnimationFrame``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:1148:1192:FUNCTION

.. rubric:: ``canvasNodes.some callback @ 40``

.. code-block:: javascript

   canvasNodes.some callback @ 40(node, index)

作为 ``canvasNodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:1697:2388:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 53``

.. code-block:: javascript

   requestAnimationFrame callback @ 53()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``76`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:1745:2380:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 54``

.. code-block:: javascript

   async requestAnimationFrame callback @ 54()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``54``—``75`` 行；所属函数 ``requestAnimationFrame callback @ 53``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``flow.fitView``、``flow.getViewport``、``flow .getNodes() .slice``、``flow .getNodes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:2401:2512:FUNCTION

.. rubric:: ``returned callback @ 77``

.. code-block:: javascript

   returned callback @ 77()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``81`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:2657:2694:FUNCTION

.. rubric:: ``canvasNodes.some callback @ 84``

.. code-block:: javascript

   canvasNodes.some callback @ 84(node)

作为 ``canvasNodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``WorkflowCanvas``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:2714:3188:FUNCTION

.. rubric:: ``useEffect callback @ 86``

.. code-block:: javascript

   useEffect callback @ 86()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``104`` 行；所属函数 ``WorkflowCanvas``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelAnimationFrame(frame); cancelAnimationFrame(nextFrame); }``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:2831:3082:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 89``

.. code-block:: javascript

   requestAnimationFrame callback @ 89()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``89``—``99`` 行；所属函数 ``useEffect callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:2879:3074:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 90``

.. code-block:: javascript

   requestAnimationFrame callback @ 90()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``90``—``98`` 行；所属函数 ``requestAnimationFrame callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flow.fitView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3095:3183:FUNCTION

.. rubric:: ``returned callback @ 100``

.. code-block:: javascript

   returned callback @ 100()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``103`` 行；所属函数 ``useEffect callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3251:3333:FUNCTION

.. rubric:: ``useEffect callback @ 105``

.. code-block:: javascript

   useEffect callback @ 105()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``105``—``107`` 行；所属函数 ``WorkflowCanvas``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCanvasNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3278:3327:FUNCTION

.. rubric:: ``setCanvasNodes callback @ 106``

.. code-block:: javascript

   setCanvasNodes callback @ 106(current)

设置与 ``Canvas Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``useEffect callback @ 105``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reconcileCanvasNodes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3517:3655:FUNCTION

.. rubric:: ``useEffect callback @ 110``

.. code-block:: javascript

   useEffect callback @ 110()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``110``—``115`` 行；所属函数 ``WorkflowCanvas``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCanvasNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3572:3641:FUNCTION

.. rubric:: ``setCanvasNodes callback @ 112``

.. code-block:: javascript

   setCanvasNodes callback @ 112(current)

设置与 ``Canvas Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``112``—``113`` 行；所属函数 ``useEffect callback @ 110``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectCanvasNodes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3712:4118:FUNCTION

.. rubric:: ``useCallback callback @ 117``

.. code-block:: javascript

   useCallback callback @ 117(changes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``117``—``127`` 行；所属函数 ``WorkflowCanvas``。

**参数**

``changes``
   调用方传入的 ``changes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCanvasNodes``、``changes.filter``、``onPositionsCommit``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3753:3800:FUNCTION

.. rubric:: ``setCanvasNodes callback @ 118``

.. code-block:: javascript

   setCanvasNodes callback @ 118(current)

设置与 ``Canvas Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``useCallback callback @ 117``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyNodeChanges``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:3921:4046:FUNCTION

.. rubric:: ``changes.filter callback @ 121``

.. code-block:: javascript

   changes.filter callback @ 121(change)

作为 ``changes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``121``—``124`` 行；所属函数 ``useCallback callback @ 117``。

**参数**

``change``
   调用方传入的 ``change`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:4185:4264:FUNCTION

.. rubric:: ``useCallback callback @ 131``

.. code-block:: javascript

   useCallback callback @ 131(_event, node, moved)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``WorkflowCanvas``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``moved``
   调用方传入的 ``moved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPositionsCommit``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowCanvas.jsx:4336:4384:FUNCTION

.. rubric:: ``useCallback callback @ 135``

.. code-block:: javascript

   useCallback callback @ 135(_event, moved)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``WorkflowCanvas``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``moved``
   调用方传入的 ``moved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPositionsCommit``。
