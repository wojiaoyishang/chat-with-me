src/components/configuration/nodeGraphModel 模块
====================================================================================================

.. js:module:: src/components/configuration/nodeGraphModel

Pure presentation helpers. Node IDs, targets, policies and editable fields are supplied by the server; this module never interprets a business format.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/configuration/nodeGraphModel.js``
* **模块标识**：``src/components/configuration/nodeGraphModel``
* **顶层函数/组件/Hook**：14
* **类**：0
* **局部函数与匿名回调**：38

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:225:456:FUNCTION

.. js:function:: graphScopes(graph)

   实现 ``graphScopes`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``5``—``10`` 行。

   **参数**

   ``graph`` （默认值 ``{}``）
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``scopes``。

   **主要协作调用**：``scopes.set``、``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:456:621:FUNCTION

.. js:function:: scopeForNode(graph, nodeId)

   实现 ``scopeForNode`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``12``—``17`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String( graph.nodes?.find((node) => String(node.id) === String(nodeId))?.scopeId || "root", )``。

   **主要协作调用**：``String``、``graph.nodes?.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:621:1082:FUNCTION

.. js:function:: scopeBreadcrumbs(graph, scopeId)

   实现 ``scopeBreadcrumbs`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``19``—``31`` 行。

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

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:1082:2878:FUNCTION

.. js:function:: scopedGraph(graph, scopeId)

   Display edges crossing a scope boundary on the visible containing node, leaving the source graph and its executable links unchanged.

   **性质**：同步函数；导出 API；源码第 ``35``—``84`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scopeId`` （默认值 ``"root"``）
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ nodes, edges }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``(graph.nodes || []).filter``、``nodes.map``、``(graph.nodes || []).map``、``graphScopes``、``endpoint``、``JSON.stringify``、``seen.has``、``seen.add``、``edges.push``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:2878:3456:FUNCTION

.. js:function:: childScopeNodeIds(graph, scopeId)

   实现 ``childScopeNodeIds`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``86``—``107`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scopeId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Set( (graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map((node) => String(node.id)), )``。

   **主要协作调用**：``graphScopes``、``String``、``scopes.forEach``、``(graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map``、``(graph.nodes || []) .filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3456:5032:FUNCTION

.. js:function:: layoutGraph(nodes, edges, usePositions)

   Unpositioned graphs receive a simple dependency layout. Existing positions are visual state and never get replaced by selection or metadata changes.

   **性质**：同步函数；导出 API；源码第 ``111``—``147`` 行。

   **参数**

   ``nodes`` （默认值 ``[]``）
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``edges`` （默认值 ``[]``）
      调用方传入的 ``edges`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``usePositions`` （默认值 ``false``）
      调用方传入的 ``usePositions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nodes.map((node) => ({ ...node, position: node.position || { x: 0, y: 0 }, }))``、``nodes.map((node) => { const column = levels.get(String(node.id)), row = rows.get(column) || 0; rows.set(column, row + 1); return { ...node, position: { x: column * 300, y: row * 2…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``nodes.map``、``edges.forEach``、``[...incoming.entries()] .filter(([, count]) => count === 0) .map``、``[...incoming.entries()] .filter``、``incoming.entries``、``downstream.get(id).forEach``、``downstream.get``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5032:5426:FUNCTION

.. js:function:: reconcileDiagramNodes(current, next, resetPositions)

   实现 ``reconcileDiagramNodes`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``149``—``161`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``next``
      调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``resetPositions`` （默认值 ``false``）
      调用方传入的 ``resetPositions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next.map((node) => { const old = previous.get(String(node.id)); return old ? { ...old, ...node, position: resetPositions ? node.position : old.position, } : node; })``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``current.map``、``next.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5426:5672:FUNCTION

.. js:function:: bindingTargets(field)

   实现 ``bindingTargets`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``163``—``170`` 行。

   **参数**

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``field.linked || field.readonly || field.bindable === false ? [] : (field.targets || []).map((target) => ({ nodeId: String(target.nodeId), field: target.field, }))``。

   **主要协作调用**：``(field.targets || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5692:5800:FUNCTION

.. js:function:: sameTarget(binding, target)

   实现 ``sameTarget`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``172``—``174`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5801:6272:FUNCTION

.. js:function:: bindingState(bindings, field)

   实现 ``bindingState`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``176``—``189`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ targets, entries, mixed, complete: targets.length > 0 && entries.length === targets.length, binding: entries.length && !mixed ? entries[0] : null, }``。

   **主要协作调用**：``bindingTargets``、``targets .map((target) => bindings.find((binding) => sameTarget(binding, target))) .filter``、``targets .map``、``entries.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:6272:7284:FUNCTION

.. js:function:: toggleBinding(bindings, field, enabled, prototype)

   Share metadata by the explicit parameter identity, preserving every opaque target ID. A field's default is server-authored rather than guessed by name.

   **性质**：同步函数；导出 API；源码第 ``193``—``220`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``enabled``
      调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``prototype`` （默认值 ``null``）
      调用方传入的 ``prototype`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``bindings``、``rest``、``[ ...rest, ...state.targets.map((target) => ({ ...metadata, ...target })), ]``。

   **显式抛出**：``new Error("服务端未提供此字段的参数定义。")``、``new Error("所选参数类型不适用于此字段。")``。

   **主要协作调用**：``bindingState``、``bindings.filter``、``field.allowedKinds.some``、``state.targets.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7284:7944:FUNCTION

.. js:function:: updateBindingMetadata(bindings, field, patch)

   更新与 ``Binding Metadata`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``222``—``239`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``patch``
      调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``bindings``、``bindings.map((entry) => { if ( state.targets.some((target) => sameTarget(entry, target)) || (!Object.hasOwn(patch, "name") && entry.name === current.name) ) return { ...metadata,…``。

   **主要协作调用**：``bindingState``、``bindings.find``、``bindings.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7944:8377:FUNCTION

.. js:function:: logicalParameters(bindings)

   实现 ``logicalParameters`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``241``—``254`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[...result.values()]``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``result.get``、``previous.targets.push``、``result.set``、``result.values``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:8377:10083:FUNCTION

.. js:function:: updateGraphPositions(graph, diagramNodes, storage)

   Only the server-selected layout storage format is touched; raw node values and executable connection objects survive layout editing byte-for-byte.

   **性质**：同步函数；导出 API；源码第 ``258``—``318`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``diagramNodes``
      调用方传入的 ``diagramNodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``storage`` （默认值 ``"ui-workflow"``）
      调用方传入的 ``storage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...next, positions: { ...graph.positions, ...Object.fromEntries(positions) }, }``、``next``、``{ ...next, uiWorkflow: { ...ui, nodes, _cwm: { ...ui._cwm, positions: { ...ui._cwm?.positions, ...Object.fromEntries( [...positions].map(([id, point]) => [id, [point.x, point.y]])…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``diagramNodes .map((node) => [String(node.id), node.position]) .filter``、``diagramNodes .map``、``(graph.nodes || []).map``、``Object.fromEntries``、``(ui.nodes || []).map``、``positions.forEach``、``[...positions].map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:543:587:FUNCTION

.. rubric:: ``graph.nodes?.find callback @ 14``

.. code-block:: javascript

   graph.nodes?.find callback @ 14(node)

作为 ``graph.nodes?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``scopeForNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:1325:1390:FUNCTION

.. rubric:: ``(graph.nodes || []).filter callback @ 37``

.. code-block:: javascript

   (graph.nodes || []).filter callback @ 37(node)

作为 ``(graph.nodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``scopedGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:1429:1454:FUNCTION

.. rubric:: ``nodes.map callback @ 39``

.. code-block:: javascript

   nodes.map callback @ 39(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``scopedGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:1514:1547:FUNCTION

.. rubric:: ``(graph.nodes || []).map callback @ 41``

.. code-block:: javascript

   (graph.nodes || []).map callback @ 41(node)

作为 ``(graph.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``scopedGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:1610:2145:FUNCTION

.. rubric:: ``endpoint``

.. code-block:: javascript

   endpoint(nodeId)

实现 ``endpoint`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``58`` 行；所属函数 ``scopedGraph``。

**参数**

``nodeId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ id, projected: false }``、``ids.has(entry) ? { id: entry, projected: true } : null``、``null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``ids.has``、``scopes.get``、``allNodes.get``、``visited.has``、``visited.add``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3097:3289:FUNCTION

.. rubric:: ``scopes.forEach callback @ 92``

.. code-block:: javascript

   scopes.forEach callback @ 92(scope)

作为 ``scopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``100`` 行；所属函数 ``childScopeNodeIds``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``descendants.has``、``String``、``descendants.add``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3352:3409:FUNCTION

.. rubric:: ``(graph.nodes || []) .filter callback @ 104``

.. code-block:: javascript

   (graph.nodes || []) .filter callback @ 104(node)

作为 ``(graph.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``childScopeNodeIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``descendants.has``、``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3422:3447:FUNCTION

.. rubric:: ``(graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map callback @ 105``

.. code-block:: javascript

   (graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map callback @ 105(node)

作为 ``(graph.nodes || []) .filter((node) => descendants.has(String(node.scopeId || "root"))) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``childScopeNodeIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3734:3817:FUNCTION

.. rubric:: ``nodes.map callback @ 113``

.. code-block:: javascript

   nodes.map callback @ 113(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``116`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3852:3877:FUNCTION

.. rubric:: ``nodes.map callback @ 117``

.. code-block:: javascript

   nodes.map callback @ 117(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3920:3951:FUNCTION

.. rubric:: ``nodes.map callback @ 118``

.. code-block:: javascript

   nodes.map callback @ 118(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:3992:4022:FUNCTION

.. rubric:: ``nodes.map callback @ 119``

.. code-block:: javascript

   nodes.map callback @ 119(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:4061:4091:FUNCTION

.. rubric:: ``nodes.map callback @ 120``

.. code-block:: javascript

   nodes.map callback @ 120(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:4111:4351:FUNCTION

.. rubric:: ``edges.forEach callback @ 121``

.. code-block:: javascript

   edges.forEach callback @ 121(edge)

作为 ``edges.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``121``—``128`` 行；所属函数 ``layoutGraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``ids.has``、``downstream.get(source).push``、``downstream.get``、``incoming.set``、``incoming.get``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:4406:4432:FUNCTION

.. rubric:: ``[...incoming.entries()] .filter callback @ 130``

.. code-block:: javascript

   [...incoming.entries()] .filter callback @ 130([, count])

作为 ``[...incoming.entries()] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``layoutGraph``。

**参数**

``[, count]``
   调用方传入的 ``, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:4443:4455:FUNCTION

.. rubric:: ``[...incoming.entries()] .filter(([, count]) => count === 0) .map callback @ 131``

.. code-block:: javascript

   [...incoming.entries()] .filter(([, count]) => count === 0) .map callback @ 131([id])

作为 ``[...incoming.entries()] .filter(([, count]) => count === 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``layoutGraph``。

**参数**

``[id]``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:4576:4778:FUNCTION

.. rubric:: ``downstream.get(id).forEach callback @ 134``

.. code-block:: javascript

   downstream.get(id).forEach callback @ 134(target)

作为 ``downstream.get(id).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``138`` 行；所属函数 ``layoutGraph``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``levels.set``、``Math.max``、``levels.get``、``incoming.set``、``incoming.get``、``queue.push``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:4830:5028:FUNCTION

.. rubric:: ``nodes.map callback @ 141``

.. code-block:: javascript

   nodes.map callback @ 141(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``146`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...node, position: { x: column * 300, y: row * 210 } }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``levels.get``、``String``、``rows.get``、``rows.set``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5152:5185:FUNCTION

.. rubric:: ``current.map callback @ 150``

.. code-block:: javascript

   current.map callback @ 150(node)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``reconcileDiagramNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5207:5422:FUNCTION

.. rubric:: ``next.map callback @ 151``

.. code-block:: javascript

   next.map callback @ 151(node)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``160`` 行；所属函数 ``reconcileDiagramNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``old ? { ...old, ...node, position: resetPositions ? node.position : old.position, } : node``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``previous.get``、``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5577:5668:FUNCTION

.. rubric:: ``(field.targets || []).map callback @ 166``

.. code-block:: javascript

   (field.targets || []).map callback @ 166(target)

作为 ``(field.targets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``166``—``169`` 行；所属函数 ``bindingTargets``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5927:5994:FUNCTION

.. rubric:: ``targets .map callback @ 179``

.. code-block:: javascript

   targets .map callback @ 179(target)

作为 ``targets .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``bindingState``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bindings.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:5953:5993:FUNCTION

.. rubric:: ``bindings.find callback @ 179``

.. code-block:: javascript

   bindings.find callback @ 179(binding)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``targets .map callback @ 179``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sameTarget``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:6054:6075:FUNCTION

.. rubric:: ``entries.map callback @ 181``

.. code-block:: javascript

   entries.map callback @ 181(entry)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``bindingState``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:6636:6714:FUNCTION

.. rubric:: ``bindings.filter callback @ 197``

.. code-block:: javascript

   bindings.filter callback @ 197(binding)

作为 ``bindings.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``toggleBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``state.targets.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:6674:6713:FUNCTION

.. rubric:: ``state.targets.some callback @ 197``

.. code-block:: javascript

   state.targets.some callback @ 197(target)

作为 ``state.targets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``bindings.filter callback @ 197``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sameTarget``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7093:7141:FUNCTION

.. rubric:: ``field.allowedKinds.some callback @ 213``

.. code-block:: javascript

   field.allowedKinds.some callback @ 213(kind)

作为 ``field.allowedKinds.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``toggleBinding``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7235:7275:FUNCTION

.. rubric:: ``state.targets.map callback @ 218``

.. code-block:: javascript

   state.targets.map callback @ 218(target)

作为 ``state.targets.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``toggleBinding``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7554:7590:FUNCTION

.. rubric:: ``bindings.find callback @ 228``

.. code-block:: javascript

   bindings.find callback @ 228(entry)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``updateBindingMetadata``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7683:7940:FUNCTION

.. rubric:: ``bindings.map callback @ 231``

.. code-block:: javascript

   bindings.map callback @ 231(entry)

作为 ``bindings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``238`` 行；所属函数 ``updateBindingMetadata``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...metadata, nodeId: entry.nodeId, field: entry.field }``、``entry``。

**主要协作调用**：``state.targets.some``、``Object.hasOwn``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:7730:7767:FUNCTION

.. rubric:: ``state.targets.some callback @ 233``

.. code-block:: javascript

   state.targets.some callback @ 233(target)

作为 ``state.targets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``233``—``233`` 行；所属函数 ``bindings.map callback @ 231``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sameTarget``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:8687:8729:FUNCTION

.. rubric:: ``diagramNodes .map callback @ 265``

.. code-block:: javascript

   diagramNodes .map callback @ 265(node)

作为 ``diagramNodes .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``updateGraphPositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:8745:8842:FUNCTION

.. rubric:: ``diagramNodes .map((node) => [String(node.id), node.position]) .filter callback @ 267``

.. code-block:: javascript

   diagramNodes .map((node) => [String(node.id), node.position]) .filter callback @ 267([, position])

作为 ``diagramNodes .map((node) => [String(node.id), node.position]) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``267``—``268`` 行；所属函数 ``updateGraphPositions``。

**参数**

``[, position]``
   调用方传入的 ``, position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:8924:9049:FUNCTION

.. rubric:: ``(graph.nodes || []).map callback @ 273``

.. code-block:: javascript

   (graph.nodes || []).map callback @ 273(node)

作为 ``(graph.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``276`` 行；所属函数 ``updateGraphPositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.has``、``String``、``positions.get``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:9331:9356:FUNCTION

.. rubric:: ``(ui.nodes || []).map callback @ 286``

.. code-block:: javascript

   (ui.nodes || []).map callback @ 286(node)

作为 ``(ui.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``updateGraphPositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:9397:9615:FUNCTION

.. rubric:: ``(ui.nodes || []).map callback @ 287``

.. code-block:: javascript

   (ui.nodes || []).map callback @ 287(node)

作为 ``(ui.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``287``—``296`` 行；所属函数 ``updateGraphPositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.has``、``String``、``positions.get``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:9642:9770:FUNCTION

.. rubric:: ``positions.forEach callback @ 298``

.. code-block:: javascript

   positions.forEach callback @ 298(position, id)

作为 ``positions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``298``—``301`` 行；所属函数 ``updateGraphPositions``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``existing.has``、``id.includes``、``nodes.push``。

.. CWM-AST-FUNCTION src/components/configuration/nodeGraphModel.js:9993:10034:FUNCTION

.. rubric:: ``[...positions].map callback @ 312``

.. code-block:: javascript

   [...positions].map callback @ 312([id, point])

作为 ``[...positions].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``updateGraphPositions``。

**参数**

``[id, point]``
   调用方传入的 ``id, point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
