src/features/workflows/workflowRegions 模块
==========================================================================================

.. js:module:: src/features/workflows/workflowRegions

Stable execution budgets attach to real leaf IDs, never canvas coordinates.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowRegions.js``
* **模块标识**：``src/features/workflows/workflowRegions``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：13

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:0:277:FUNCTION

.. js:function:: workflowLeafIds(graph)

   Stable execution budgets attach to real leaf IDs, never canvas coordinates.

   **性质**：同步函数；导出 API；源码第 ``2``—``8`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(graph.nodes || []).flatMap((node) => node.kind === "subgraph" ? workflowLeafIds(node.subgraph?.graph || {}) : [node.id], )``。

   **主要协作调用**：``(graph.nodes || []).flatMap``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:277:1742:FUNCTION

.. js:function:: pruneDeletedWorkflowRegions(before, after)

   Only prune genuinely deleted nodes, leaving invalid imports for validation.

   **性质**：同步函数；导出 API；源码第 ``11``—``55`` 行。

   **参数**

   ``before``
      调用方传入的 ``before`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``after``
      调用方传入的 ``after`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``after``、``visit(after)``。

   **主要协作调用**：``workflowLeafIds``、``workflowLeafIds(before).filter``、``visit``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:1742:2132:FUNCTION

.. js:function:: workflowAncestorRegions(root, path)

   Ancestor budgets projected during copy/save remain meaningful in isolation.

   **性质**：同步函数；导出 API；源码第 ``58``—``67`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``regions``。

   **主要协作调用**：``regions.push``、``current.nodes.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:2132:2426:FUNCTION

.. js:function:: projectWorkflowRegions(regions, nodes)

   实现 ``projectWorkflowRegions`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``69``—``77`` 行。

   **参数**

   ``regions``
      调用方传入的 ``regions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``regions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => included.has(id)), })) .filter((region) => region.nodeIds.length)``。

   **主要协作调用**：``workflowLeafIds``、``regions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => included.has(id)), })) .filter``、``regions .map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:161:269:FUNCTION

.. rubric:: ``(graph.nodes || []).flatMap callback @ 3``

.. code-block:: javascript

   (graph.nodes || []).flatMap callback @ 3(node)

实现 ``(graph.nodes || []).flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3``—``6`` 行；所属函数 ``workflowLeafIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowLeafIds``。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:533:554:FUNCTION

.. rubric:: ``workflowLeafIds(before).filter callback @ 14``

.. code-block:: javascript

   workflowLeafIds(before).filter callback @ 14(id)

作为 ``workflowLeafIds(before).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``pruneDeletedWorkflowRegions``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``live.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:612:1716:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(graph)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``53`` 行；所属函数 ``pruneDeletedWorkflowRegions``。

**参数**

``graph``
   调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graph.executionRegions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => !removed.has(id)), })) .fi…``、``graph.executionRegions .map``、``graph.nodes.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:750:876:FUNCTION

.. rubric:: ``graph.executionRegions .map callback @ 22``

.. code-block:: javascript

   graph.executionRegions .map callback @ 22(region)

作为 ``graph.executionRegions .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``25`` 行；所属函数 ``visit``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:835:859:FUNCTION

.. rubric:: ``region.nodeIds.filter callback @ 24``

.. code-block:: javascript

   region.nodeIds.filter callback @ 24(id)

作为 ``region.nodeIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``graph.executionRegions .map callback @ 22``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:898:931:FUNCTION

.. rubric:: ``graph.executionRegions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => !removed.has(id)), })) .fi… callback @ 26``

.. code-block:: javascript

   graph.executionRegions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => !removed.has(id)), })) .fi… callback @ 26(region)

实现 ``graph.executionRegions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => !removed.has(id)), })) .fi…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``visit``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:984:1703:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 29``

.. code-block:: javascript

   graph.nodes.map callback @ 29(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``29``—``51`` 行；所属函数 ``visit``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visit``、``node.subgraph.execution.branchOrder.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:1395:1569:FUNCTION

.. rubric:: ``node.subgraph.execution.branchOrder.filter callback @ 41``

.. code-block:: javascript

   node.subgraph.execution.branchOrder.filter callback @ 41(id)

作为 ``node.subgraph.execution.branchOrder.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``graph.nodes.map callback @ 29``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``node.subgraph.graph.nodes.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:1485:1540:FUNCTION

.. rubric:: ``node.subgraph.graph.nodes.some callback @ 43``

.. code-block:: javascript

   node.subgraph.graph.nodes.some callback @ 43(child)

作为 ``node.subgraph.graph.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``node.subgraph.execution.branchOrder.filter callback @ 41``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:2040:2064:FUNCTION

.. rubric:: ``current.nodes.find callback @ 63``

.. code-block:: javascript

   current.nodes.find callback @ 63(node)

作为 ``current.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``workflowAncestorRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:2273:2375:FUNCTION

.. rubric:: ``regions .map callback @ 72``

.. code-block:: javascript

   regions .map callback @ 72(region)

作为 ``regions .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``72``—``75`` 行；所属函数 ``projectWorkflowRegions``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:2342:2366:FUNCTION

.. rubric:: ``region.nodeIds.filter callback @ 74``

.. code-block:: javascript

   region.nodeIds.filter callback @ 74(id)

作为 ``region.nodeIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``regions .map callback @ 72``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``included.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowRegions.js:2389:2422:FUNCTION

.. rubric:: ``regions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => included.has(id)), })) .filter callback @ 76``

.. code-block:: javascript

   regions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => included.has(id)), })) .filter callback @ 76(region)

作为 ``regions .map((region) => ({ ...region, nodeIds: region.nodeIds.filter((id) => included.has(id)), })) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``projectWorkflowRegions``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
