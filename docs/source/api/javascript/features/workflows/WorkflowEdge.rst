src/features/workflows/WorkflowEdge 模块
====================================================================================

.. js:module:: src/features/workflows/WorkflowEdge

Keep the same curve and hit area as React Flow's default edge.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowEdge.jsx``
* **模块标识**：``src/features/workflows/WorkflowEdge``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``@xyflow/react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEdge.jsx:103:307:FUNCTION

.. js:function:: edgePhase(id)

   实现 ``edgePhase`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``11`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(hash >>> 0) / 4294967295``。

   **主要协作调用**：``[...String(id)].reduce``、``String``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEdge.jsx:307:2340:FUNCTION

.. js:function:: WorkflowEdge({ id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, style, data, })

   Keep the same curve and hit area as React Flow's default edge.

   **性质**：同步函数；导出 API；源码第 ``14``—``83`` 行。

   **参数**

   ``{ id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, style, data, }``
      调用方传入的 ``id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, style, data,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} /> {data?.flowing && Array.from({ length: orbCount }, (_, index) => { const begin = \x60-${( ((phase + index /…``。

   **主要协作调用**：``useViewport``、``getBezierPath``、``Math.max``、``Math.hypot``、``Math.min``、``edgePhase``、``Array.from``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEdge.jsx:168:247:FUNCTION

.. rubric:: ``[...String(id)].reduce callback @ 7``

.. code-block:: javascript

   [...String(id)].reduce callback @ 7(value, character)

作为 ``[...String(id)].reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``edgePhase``。

**参数**

``value``
   待读取、转换或校验的值。

``character``
   调用方传入的 ``character`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.imul``、``character.charCodeAt``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEdge.jsx:1228:2323:FUNCTION

.. rubric:: ``Array.from callback @ 46``

.. code-block:: javascript

   Array.from callback @ 46(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``80`` 行；所属函数 ``WorkflowEdge``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <g className="workflow-edge-orb" key={\x60${id}-orb-${index}\x60} opacity="0" > <circle className="workflow-edge-orb-glow" r={5.5 / screenZoom} /> <circle className="workflow-edge-orb…``。

**主要协作调用**：``( ((phase + index / orbCount) % 1) * duration ).toFixed``、``duration.toFixed``。
