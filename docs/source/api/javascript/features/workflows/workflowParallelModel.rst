src/features/workflows/workflowParallelModel 模块
======================================================================================================

.. js:module:: src/features/workflows/workflowParallelModel

Structural frames are projections; executionRegions persist actual budgets.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowParallelModel.js``
* **模块标识**：``src/features/workflows/workflowParallelModel``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：63

主要依赖
--------------------------------------------------------------------------------

``./workflowRegions.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:158:242:FUNCTION

.. js:function:: concurrency(value, fallback)

   实现 ``concurrency`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``4`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback`` （默认值 ``4``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number.isInteger``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:243:5825:FUNCTION

.. js:function:: graphRegions(graph, limit, sourceKinds)

   实现 ``graphRegions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``167`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``limit``
      调用方传入的 ``limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``sourceKinds``
      调用方传入的 ``sourceKinds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``candidates .sort( (a, b) => b.nodeIds.length - a.nodeIds.length || a.id.localeCompare(b.id), ) .filter( (region, index, all) => !all .slice(0, index) .some((outer) => region.nodeI…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``nodes.map``、``byId.has``、``outgoing.get(edge.source).push``、``outgoing.get``、``incoming.get(edge.target).push``、``incoming.get``、``nodes .filter((node) => !degree.get(node.id)) .map``、``nodes .filter``、``degree.set``、``degree.get``、``order.push``、``[...order].reverse``。

   **内部回调数量**：15。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5825:10016:FUNCTION

.. js:function:: analyzeWorkflowParallelism(rootGraph, path, definitions)

   Include ancestor limits; a serial parent prevents internal concurrency too.

   **性质**：同步函数；导出 API；源码第 ``170``—``301`` 行。

   **参数**

   ``rootGraph``
      调用方传入的 ``rootGraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions`` （默认值 ``[]``）
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ current: levels.get(path.at(-1) || null) || root, subgraphs }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``definitions .filter((node) => node.source || node.category === "source") .map``、``definitions .filter``、``visit``、``levels.get``、``path.at``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10016:11044:FUNCTION

.. js:function:: workflowParallelBounds(regions, nodes)

   Canvas measurements and transient drag coordinates never enter graph JSON.

   **性质**：同步函数；导出 API；源码第 ``304``—``334`` 行。

   **参数**

   ``regions``
      调用方传入的 ``regions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``regions.flatMap((region) => { const members = region.nodeIds .map((id) => byId.get(id)) .filter((node) => node && !node.hidden); if (members.length < (region.configured ? 1 : 2))…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``nodes.map``、``regions.flatMap``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:364:389:FUNCTION

.. rubric:: ``nodes.map callback @ 8``

.. code-block:: javascript

   nodes.map callback @ 8(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``8`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:430:453:FUNCTION

.. rubric:: ``nodes.map callback @ 9``

.. code-block:: javascript

   nodes.map callback @ 9(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``9``—``9`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:494:517:FUNCTION

.. rubric:: ``nodes.map callback @ 10``

.. code-block:: javascript

   nodes.map callback @ 10(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:759:808:FUNCTION

.. rubric:: ``nodes.map callback @ 17``

.. code-block:: javascript

   nodes.map callback @ 17(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``incoming.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:850:880:FUNCTION

.. rubric:: ``nodes .filter callback @ 20``

.. code-block:: javascript

   nodes .filter callback @ 20(node)

作为 ``nodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``degree.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:891:908:FUNCTION

.. rubric:: ``nodes .filter((node) => !degree.get(node.id)) .map callback @ 21``

.. code-block:: javascript

   nodes .filter((node) => !degree.get(node.id)) .map callback @ 21(node)

作为 ``nodes .filter((node) => !degree.get(node.id)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:1638:1757:FUNCTION

.. rubric:: ``add``

.. code-block:: javascript

   add(gate, port)

新增与 ``add`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``graphRegions``。

**参数**

``gate``
   调用方传入的 ``gate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``current.has``、``current.set``、``current.get(gate).add``、``current.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2087:2332:FUNCTION

.. rubric:: ``compatible``

.. code-block:: javascript

   compatible(left, right)

实现 ``compatible`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``60`` 行；所属函数 ``graphRegions``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``gates.get``、``gates.get(right).get``、``other.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2378:2922:FUNCTION

.. rubric:: ``addRegion``

.. code-block:: javascript

   addRegion(branches, metadata)

新增与 ``Region`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``79`` 行；所属函数 ``graphRegions``。

**参数**

``branches``
   调用方传入的 ``branches`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``metadata``
   调用方传入的 ``metadata`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``branches .map((branch) => [...branch].filter((id) => byId.get(id)?.kind !== "subgraph"), ) .filter``、``branches .map``、``[...new Set(actual.flat())].sort``、``actual.flat``、``candidates.push``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2524:2605:FUNCTION

.. rubric:: ``branches .map callback @ 65``

.. code-block:: javascript

   branches .map callback @ 65(branch)

作为 ``branches .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``65``—``66`` 行；所属函数 ``addRegion``。

**参数**

``branch``
   调用方传入的 ``branch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...branch].filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2563:2604:FUNCTION

.. rubric:: ``[...branch].filter callback @ 66``

.. code-block:: javascript

   [...branch].filter callback @ 66(id)

作为 ``[...branch].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``branches .map callback @ 65``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``byId.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2629:2654:FUNCTION

.. rubric:: ``branches .map((branch) => [...branch].filter((id) => byId.get(id)?.kind !== "subgraph"), ) .filter callback @ 68``

.. code-block:: javascript

   branches .map((branch) => [...branch].filter((id) => byId.get(id)?.kind !== "subgraph"), ) .filter callback @ 68(branch)

作为 ``branches .map((branch) => [...branch].filter((id) => byId.get(id)?.kind !== "subgraph"), ) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``addRegion``。

**参数**

``branch``
   调用方传入的 ``branch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2941:3086:FUNCTION

.. rubric:: ``hasWork``

.. code-block:: javascript

   hasWork(branch)

实现 ``hasWork`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``85`` 行；所属函数 ``graphRegions``。

**参数**

``branch``
   调用方传入的 ``branch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...branch].some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:2975:3079:FUNCTION

.. rubric:: ``[...branch].some callback @ 82``

.. code-block:: javascript

   [...branch].some callback @ 82(id)

作为 ``[...branch].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``82``—``84`` 行；所属函数 ``hasWork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``byId.get``、``sourceKinds.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3105:3899:FUNCTION

.. rubric:: ``addFork``

.. code-block:: javascript

   addFork(targets, metadata, requireWork)

新增与 ``Fork`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``86``—``108`` 行；所属函数 ``graphRegions``。

**参数**

``targets``
   调用方传入的 ``targets`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``metadata``
   调用方传入的 ``metadata`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``requireWork`` （默认值 ``false``）
   调用方传入的 ``requireWork`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...targets].filter``、``heads.some``、``reach.get``、``counts.set``、``counts.get``、``heads.map``、``addRegion``、``branches.filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3190:3284:FUNCTION

.. rubric:: ``[...targets].filter callback @ 88``

.. code-block:: javascript

   [...targets].filter callback @ 88(id)

作为 ``[...targets].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``88``—``89`` 行；所属函数 ``addFork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...targets].some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3232:3283:FUNCTION

.. rubric:: ``[...targets].some callback @ 89``

.. code-block:: javascript

   [...targets].some callback @ 89(other)

作为 ``[...targets].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``[...targets].filter callback @ 88``。

**参数**

``other``
   调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``reach.get(other).has``、``reach.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3345:3430:FUNCTION

.. rubric:: ``heads.some callback @ 93``

.. code-block:: javascript

   heads.some callback @ 93(id, index)

作为 ``heads.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``94`` 行；所属函数 ``addFork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``heads.slice(index + 1).some``、``heads.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3396:3429:FUNCTION

.. rubric:: ``heads.slice(index + 1).some callback @ 94``

.. code-block:: javascript

   heads.slice(index + 1).some callback @ 94(other)

作为 ``heads.slice(index + 1).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``heads.some callback @ 93``。

**参数**

``other``
   调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``compatible``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3720:3811:FUNCTION

.. rubric:: ``heads.map callback @ 104``

.. code-block:: javascript

   heads.map callback @ 104(head)

作为 ``heads.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``105`` 行；所属函数 ``addFork``。

**参数**

``head``
   调用方传入的 ``head`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...reach.get(head)].filter``、``reach.get``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:3781:3809:FUNCTION

.. rubric:: ``[...reach.get(head)].filter callback @ 105``

.. code-block:: javascript

   [...reach.get(head)].filter callback @ 105(id)

作为 ``[...reach.get(head)].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``heads.map callback @ 104``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``counts.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5291:5330:FUNCTION

.. rubric:: ``nodes .filter callback @ 149``

.. code-block:: javascript

   nodes .filter callback @ 149(node)

作为 ``nodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``incoming.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5343:5360:FUNCTION

.. rubric:: ``nodes .filter((node) => !incoming.get(node.id).length) .map callback @ 150``

.. code-block:: javascript

   nodes .filter((node) => !incoming.get(node.id).length) .map callback @ 150(node)

作为 ``nodes .filter((node) => !incoming.get(node.id).length) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``graphRegions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5536:5616:FUNCTION

.. rubric:: ``candidates .sort callback @ 157``

.. code-block:: javascript

   candidates .sort callback @ 157(a, b)

作为 ``candidates .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``graphRegions``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.id.localeCompare``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5636:5815:FUNCTION

.. rubric:: ``candidates .sort( (a, b) => b.nodeIds.length - a.nodeIds.length || a.id.localeCompare(b.id), ) .filter callback @ 160``

.. code-block:: javascript

   candidates .sort( (a, b) => b.nodeIds.length - a.nodeIds.length || a.id.localeCompare(b.id), ) .filter callback @ 160(region, index, all)

作为 ``candidates .sort( (a, b) => b.nodeIds.length - a.nodeIds.length || a.id.localeCompare(b.id), ) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``160``—``165`` 行；所属函数 ``graphRegions``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``all``
   调用方传入的 ``all`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``all .slice(0, index) .some``、``all .slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5723:5802:FUNCTION

.. rubric:: ``all .slice(0, index) .some callback @ 163``

.. code-block:: javascript

   all .slice(0, index) .some callback @ 163(outer)

作为 ``all .slice(0, index) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``163``—``164`` 行；所属函数 ``candidates .sort( (a, b) => b.nodeIds.length - a.nodeIds.length || a.id.localeCompare(b.id), ) .filter callback @ 160``。

**参数**

``outer``
   调用方传入的 ``outer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:5767:5801:FUNCTION

.. rubric:: ``region.nodeIds.every callback @ 164``

.. code-block:: javascript

   region.nodeIds.every callback @ 164(id)

作为 ``region.nodeIds.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``all .slice(0, index) .some callback @ 163``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``outer.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6065:6116:FUNCTION

.. rubric:: ``definitions .filter callback @ 177``

.. code-block:: javascript

   definitions .filter callback @ 177(node)

作为 ``definitions .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``analyzeWorkflowParallelism``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6129:6148:FUNCTION

.. rubric:: ``definitions .filter((node) => node.source || node.category === "source") .map callback @ 178``

.. code-block:: javascript

   definitions .filter((node) => node.source || node.category === "source") .map callback @ 178(node)

作为 ``definitions .filter((node) => node.source || node.category === "source") .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``178``—``178`` 行；所属函数 ``analyzeWorkflowParallelism``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6219:9893:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(graph, parentLimit, inheritedCap, key, depth, inheritedRegions)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``298`` 行；所属函数 ``analyzeWorkflowParallelism``。

**参数**

``graph``
   调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``parentLimit``
   调用方传入的 ``parentLimit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``inheritedCap``
   调用方传入的 ``inheritedCap`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key`` （默认值 ``null``）
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``depth`` （默认值 ``0``）
   调用方传入的 ``depth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``inheritedRegions`` （默认值 ``[]``）
   调用方传入的 ``inheritedRegions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``level``。

**主要协作调用**：``concurrency``、``Math.min``、``graphRegions``、``candidates.flatMap``、``regions.some``、``regions.push``、``decorate``、``candidates.some``、``levels.set``、``budgets .filter((region) => workflowLeafIds(node.subgraph.graph).every((id) => region.nodeIds.includes(id), ), ) .map``、``budgets .filter``、``visit``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6644:6717:FUNCTION

.. rubric:: ``sameMembers``

.. code-block:: javascript

   sameMembers(a, b)

实现 ``sameMembers`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``196`` 行；所属函数 ``visit``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6694:6716:FUNCTION

.. rubric:: ``a.every callback @ 196``

.. code-block:: javascript

   a.every callback @ 196(id)

作为 ``a.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``sameMembers``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``b.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6740:6936:FUNCTION

.. rubric:: ``effective``

.. code-block:: javascript

   effective(ids)

实现 ``effective`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``197``—``203`` 行；所属函数 ``visit``。

**参数**

``ids``
   调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.min``、``budgets .filter((region) => ids.every((id) => region.nodeIds.includes(id))) .map``、``budgets .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6818:6876:FUNCTION

.. rubric:: ``budgets .filter callback @ 201``

.. code-block:: javascript

   budgets .filter callback @ 201(region)

作为 ``budgets .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``effective``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ids.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6840:6875:FUNCTION

.. rubric:: ``ids.every callback @ 201``

.. code-block:: javascript

   ids.every callback @ 201(id)

作为 ``ids.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``budgets .filter callback @ 201``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6893:6926:FUNCTION

.. rubric:: ``budgets .filter((region) => ids.every((id) => region.nodeIds.includes(id))) .map callback @ 202``

.. code-block:: javascript

   budgets .filter((region) => ids.every((id) => region.nodeIds.includes(id))) .map callback @ 202(region)

作为 ``budgets .filter((region) => ids.every((id) => region.nodeIds.includes(id))) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``effective``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:6962:7501:FUNCTION

.. rubric:: ``possiblePair``

.. code-block:: javascript

   possiblePair(candidate)

实现 ``possiblePair`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``204``—``222`` 行；所属函数 ``visit``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidate.branches.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7027:7492:FUNCTION

.. rubric:: ``candidate.branches.some callback @ 206``

.. code-block:: javascript

   candidate.branches.some callback @ 206(branch, index)

作为 ``candidate.branches.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``206``—``221`` 行；所属函数 ``possiblePair``。

**参数**

``branch``
   调用方传入的 ``branch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidate.branches .slice(index + 1) .some``、``candidate.branches .slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7117:7479:FUNCTION

.. rubric:: ``candidate.branches .slice(index + 1) .some callback @ 209``

.. code-block:: javascript

   candidate.branches .slice(index + 1) .some callback @ 209(other)

作为 ``candidate.branches .slice(index + 1) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``209``—``220`` 行；所属函数 ``candidate.branches.some callback @ 206``。

**参数**

``other``
   调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``branch.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7152:7464:FUNCTION

.. rubric:: ``branch.some callback @ 210``

.. code-block:: javascript

   branch.some callback @ 210(a)

作为 ``branch.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``210``—``219`` 行；所属函数 ``candidate.branches .slice(index + 1) .some callback @ 209``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``other.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7184:7447:FUNCTION

.. rubric:: ``other.some callback @ 212``

.. code-block:: javascript

   other.some callback @ 212(b)

作为 ``other.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``212``—``218`` 行；所属函数 ``branch.some callback @ 210``。

**参数**

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``budgets.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7240:7426:FUNCTION

.. rubric:: ``budgets.some callback @ 214``

.. code-block:: javascript

   budgets.some callback @ 214(region)

作为 ``budgets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``214``—``217`` 行；所属函数 ``other.some callback @ 212``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7523:8091:FUNCTION

.. rubric:: ``decorate``

.. code-block:: javascript

   decorate(region)

实现 ``decorate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``223``—``240`` 行；所属函数 ``visit``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``effective``、``Math.min``、``inheritedRegions .filter((budget) => region.nodeIds.every((id) => budget.nodeIds.includes(id)), ) .map``、``inheritedRegions .filter``、``budgets.some``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7689:7770:FUNCTION

.. rubric:: ``inheritedRegions .filter callback @ 229``

.. code-block:: javascript

   inheritedRegions .filter callback @ 229(budget)

作为 ``inheritedRegions .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``229``—``230`` 行；所属函数 ``decorate``。

**参数**

``budget``
   调用方传入的 ``budget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7734:7769:FUNCTION

.. rubric:: ``region.nodeIds.every callback @ 230``

.. code-block:: javascript

   region.nodeIds.every callback @ 230(id)

作为 ``region.nodeIds.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``230``—``230`` 行；所属函数 ``inheritedRegions .filter callback @ 229``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``budget.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7799:7832:FUNCTION

.. rubric:: ``inheritedRegions .filter((budget) => region.nodeIds.every((id) => budget.nodeIds.includes(id)), ) .map callback @ 232``

.. code-block:: javascript

   inheritedRegions .filter((budget) => region.nodeIds.every((id) => budget.nodeIds.includes(id)), ) .map callback @ 232(budget)

作为 ``inheritedRegions .filter((budget) => region.nodeIds.every((id) => budget.nodeIds.includes(id)), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``decorate``。

**参数**

``budget``
   调用方传入的 ``budget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7878:8074:FUNCTION

.. rubric:: ``budgets.some callback @ 235``

.. code-block:: javascript

   budgets.some callback @ 235(budget)

作为 ``budgets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``235``—``238`` 行；所属函数 ``decorate``。

**参数**

``budget``
   调用方传入的 ``budget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``budget.nodeIds.some``、``region.nodeIds.every``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:7966:8001:FUNCTION

.. rubric:: ``budget.nodeIds.some callback @ 237``

.. code-block:: javascript

   budget.nodeIds.some callback @ 237(id)

作为 ``budget.nodeIds.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``budgets.some callback @ 235``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:8038:8073:FUNCTION

.. rubric:: ``region.nodeIds.every callback @ 238``

.. code-block:: javascript

   region.nodeIds.every callback @ 238(id)

作为 ``region.nodeIds.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``budgets.some callback @ 235``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``budget.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:8132:8532:FUNCTION

.. rubric:: ``candidates.flatMap callback @ 241``

.. code-block:: javascript

   candidates.flatMap callback @ 241(candidate)

实现 ``candidates.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``254`` 行；所属函数 ``visit``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``[ decorate({ ...candidate, ...(configured || {}), configured: Boolean(configured), canParallel: possiblePair(candidate), }), ]``。

**主要协作调用**：``saved.find``、``possiblePair``、``decorate``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:8185:8251:FUNCTION

.. rubric:: ``saved.find callback @ 242``

.. code-block:: javascript

   saved.find callback @ 242(region)

作为 ``saved.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``243`` 行；所属函数 ``candidates.flatMap callback @ 241``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sameMembers``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:8673:8704:FUNCTION

.. rubric:: ``regions.some callback @ 257``

.. code-block:: javascript

   regions.some callback @ 257(item)

作为 ``regions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:9337:9468:FUNCTION

.. rubric:: ``budgets .filter callback @ 276``

.. code-block:: javascript

   budgets .filter callback @ 276(region)

作为 ``budgets .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``276``—``279`` 行；所属函数 ``visit``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowLeafIds(node.subgraph.graph).every``、``workflowLeafIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:9404:9453:FUNCTION

.. rubric:: ``workflowLeafIds(node.subgraph.graph).every callback @ 277``

.. code-block:: javascript

   workflowLeafIds(node.subgraph.graph).every callback @ 277(id)

作为 ``workflowLeafIds(node.subgraph.graph).every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``277``—``278`` 行；所属函数 ``budgets .filter callback @ 276``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:9497:9530:FUNCTION

.. rubric:: ``budgets .filter((region) => workflowLeafIds(node.subgraph.graph).every((id) => region.nodeIds.includes(id), ), ) .map callback @ 281``

.. code-block:: javascript

   budgets .filter((region) => workflowLeafIds(node.subgraph.graph).every((id) => region.nodeIds.includes(id), ), ) .map callback @ 281(region)

作为 ``budgets .filter((region) => workflowLeafIds(node.subgraph.graph).every((id) => region.nodeIds.includes(id), ), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``visit``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10190:10215:FUNCTION

.. rubric:: ``nodes.map callback @ 305``

.. code-block:: javascript

   nodes.map callback @ 305(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``305``—``305`` 行；所属函数 ``workflowParallelBounds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10244:11040:FUNCTION

.. rubric:: ``regions.flatMap callback @ 306``

.. code-block:: javascript

   regions.flatMap callback @ 306(region)

实现 ``regions.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``306``—``333`` 行；所属函数 ``workflowParallelBounds``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``[ { ...region, x: x - 32, y: y - 64, width: right - x + 64, height: bottom - y + 96, }, ]``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``region.nodeIds .map((id) => byId.get(id)) .filter``、``region.nodeIds .map``、``Math.min``、``members.map``、``Math.max``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10304:10324:FUNCTION

.. rubric:: ``region.nodeIds .map callback @ 308``

.. code-block:: javascript

   region.nodeIds .map callback @ 308(id)

作为 ``region.nodeIds .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``308``—``308`` 行；所属函数 ``regions.flatMap callback @ 306``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``byId.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10340:10370:FUNCTION

.. rubric:: ``region.nodeIds .map((id) => byId.get(id)) .filter callback @ 309``

.. code-block:: javascript

   region.nodeIds .map((id) => byId.get(id)) .filter callback @ 309(node)

作为 ``region.nodeIds .map((id) => byId.get(id)) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``309``—``309`` 行；所属函数 ``regions.flatMap callback @ 306``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10476:10501:FUNCTION

.. rubric:: ``members.map callback @ 311``

.. code-block:: javascript

   members.map callback @ 311(node)

作为 ``members.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``regions.flatMap callback @ 306``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10543:10568:FUNCTION

.. rubric:: ``members.map callback @ 312``

.. code-block:: javascript

   members.map callback @ 312(node)

作为 ``members.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``regions.flatMap callback @ 306``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10621:10701:FUNCTION

.. rubric:: ``members.map callback @ 315``

.. code-block:: javascript

   members.map callback @ 315(node)

作为 ``members.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``regions.flatMap callback @ 306``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowParallelModel.js:10769:10861:FUNCTION

.. rubric:: ``members.map callback @ 320``

.. code-block:: javascript

   members.map callback @ 320(node)

作为 ``members.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``320``—``321`` 行；所属函数 ``regions.flatMap callback @ 306``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
