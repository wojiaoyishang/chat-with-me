src/features/comfyui/scopeModel 模块
================================================================================

.. js:module:: src/features/comfyui/scopeModel

Execution IDs remain opaque; scopes only decide which nodes are visible.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/scopeModel.js``
* **模块标识**：``src/features/comfyui/scopeModel``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：8

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:64:370:FUNCTION

.. js:function:: graphScopes(graph)

   Execution IDs remain opaque; scopes only decide which nodes are visible.

   **性质**：同步函数；导出 API；源码第 ``4``—``9`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``scopes``。

   **主要协作调用**：``scopes.set``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:370:535:FUNCTION

.. js:function:: scopeForNode(graph, nodeId)

   实现 ``scopeForNode`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``16`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String( graph.nodes?.find((node) => String(node.id) === String(nodeId))?.scopeId || "root", )``。

   **主要协作调用**：``String``、``graph.nodes?.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:535:1000:FUNCTION

.. js:function:: scopeBreadcrumbs(graph, scopeId)

   实现 ``scopeBreadcrumbs`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``18``—``30`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scopeId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``graphScopes``、``scopes.get``、``String``、``visited.has``、``visited.add``、``result.unshift``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:1000:2816:FUNCTION

.. js:function:: scopedGraph(graph, scopeId)

   Project connections entering/leaving a child graph onto its container. Executable edges and field source IDs themselves remain untouched.

   **性质**：同步函数；导出 API；源码第 ``34``—``86`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scopeId`` （默认值 ``"root"``）
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ nodes, edges, }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``(graph.nodes || []).filter``、``nodes.map``、``(graph.nodes || []).map``、``graphScopes``、``endpoint``、``JSON.stringify``、``seen.has``、``seen.add``、``edges.push``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:2816:3398:FUNCTION

.. js:function:: childScopeNodeIds(graph, scopeId)

   实现 ``childScopeNodeIds`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``88``—``109`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scopeId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Set( (graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map((node) => String(node.id)), )``。

   **主要协作调用**：``graphScopes``、``String``、``scopes.forEach``、``(graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map``、``(graph.nodes || []) .filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:457:501:FUNCTION

.. rubric:: ``graph.nodes?.find callback @ 13``

.. code-block:: javascript

   graph.nodes?.find callback @ 13(node)

作为 ``graph.nodes?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``scopeForNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:1248:1313:FUNCTION

.. rubric:: ``(graph.nodes || []).filter callback @ 36``

.. code-block:: javascript

   (graph.nodes || []).filter callback @ 36(node)

作为 ``(graph.nodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``scopedGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:1352:1377:FUNCTION

.. rubric:: ``nodes.map callback @ 38``

.. code-block:: javascript

   nodes.map callback @ 38(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``scopedGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:1437:1470:FUNCTION

.. rubric:: ``(graph.nodes || []).map callback @ 40``

.. code-block:: javascript

   (graph.nodes || []).map callback @ 40(node)

作为 ``(graph.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``scopedGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:1533:2068:FUNCTION

.. rubric:: ``endpoint``

.. code-block:: javascript

   endpoint(nodeId)

实现 ``endpoint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``57`` 行；所属函数 ``scopedGraph``。

**参数**

``nodeId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ id, projected: false }``、``ids.has(entry) ? { id: entry, projected: true } : null``、``null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``ids.has``、``scopes.get``、``allNodes.get``、``visited.has``、``visited.add``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:3039:3231:FUNCTION

.. rubric:: ``scopes.forEach callback @ 94``

.. code-block:: javascript

   scopes.forEach callback @ 94(scope)

作为 ``scopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``102`` 行；所属函数 ``childScopeNodeIds``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``descendants.has``、``String``、``descendants.add``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:3294:3351:FUNCTION

.. rubric:: ``(graph.nodes || []) .filter callback @ 106``

.. code-block:: javascript

   (graph.nodes || []) .filter callback @ 106(node)

作为 ``(graph.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``childScopeNodeIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``descendants.has``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/scopeModel.js:3364:3389:FUNCTION

.. rubric:: ``(graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map callback @ 107``

.. code-block:: javascript

   (graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map callback @ 107(node)

作为 ``(graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``childScopeNodeIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。
