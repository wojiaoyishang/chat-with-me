src/features/workflows/workflowCanvasModel 模块
==================================================================================================

.. js:module:: src/features/workflows/workflowCanvasModel

Keep measured canvas state separate from the serialized workflow.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowCanvasModel.js``
* **模块标识**：``src/features/workflows/workflowCanvasModel``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：6

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:0:408:FUNCTION

.. js:function:: selectCanvasNodes(current, ids)

   Keep measured canvas state separate from the serialized workflow.

   **性质**：同步函数；导出 API；源码第 ``2``—``12`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``changed ? next : current``。

   **主要协作调用**：``current.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:408:1688:FUNCTION

.. js:function:: reconcileCanvasNodes(current, incoming)

   实现 ``reconcileCanvasNodes`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``14``—``51`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next.length === current.length && next.every((node, index) => node === current[index]) ? current : next``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``current.map``、``incoming.map``、``next.every``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:206:369:FUNCTION

.. rubric:: ``current.map callback @ 5``

.. code-block:: javascript

   current.map callback @ 5(node)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``5``—``10`` 行；所属函数 ``selectCanvasNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``{ ...node, selected: value }``。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:503:528:FUNCTION

.. rubric:: ``current.map callback @ 15``

.. code-block:: javascript

   current.map callback @ 15(node)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``reconcileCanvasNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:560:1558:FUNCTION

.. rubric:: ``incoming.map callback @ 16``

.. code-block:: javascript

   incoming.map callback @ 16(node)

作为 ``incoming.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``16``—``46`` 行；所属函数 ``reconcileCanvasNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``Object.keys(merged).every((key) => Object.is(previous[key], merged[key]), ) ? previous : merged``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``byId.get``、``Object.keys``、``Object.entries(node.data).every``、``Object.entries``、``Object.keys(merged).every``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:1247:1309:FUNCTION

.. rubric:: ``Object.entries(node.data).every callback @ 35``

.. code-block:: javascript

   Object.entries(node.data).every callback @ 35([key, value])

作为 ``Object.entries(node.data).every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``36`` 行；所属函数 ``incoming.map callback @ 16``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.is``。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:1462:1514:FUNCTION

.. rubric:: ``Object.keys(merged).every callback @ 41``

.. code-block:: javascript

   Object.keys(merged).every callback @ 41(key)

作为 ``Object.keys(merged).every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``42`` 行；所属函数 ``incoming.map callback @ 16``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.is``。

.. CWM-AST-FUNCTION src/features/workflows/workflowCanvasModel.js:1619:1659:FUNCTION

.. rubric:: ``next.every callback @ 48``

.. code-block:: javascript

   next.every callback @ 48(node, index)

作为 ``next.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``reconcileCanvasNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
