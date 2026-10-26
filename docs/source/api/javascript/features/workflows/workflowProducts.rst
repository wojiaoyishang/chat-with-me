src/features/workflows/workflowProducts 模块
============================================================================================

.. js:module:: src/features/workflows/workflowProducts

Public products are keyed by independent node IDs, never completion order.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowProducts.js``
* **模块标识**：``src/features/workflows/workflowProducts``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowProducts.js:0:386:FUNCTION

.. js:function:: workflowArtifacts(result)

   Public products are keyed by independent node IDs, never completion order.

   **性质**：同步函数；导出 API；源码第 ``2``—``10`` 行。

   **参数**

   ``result``
      调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.entries(result?.outputs || {}).flatMap(([nodeId, product]) => (product?.artifacts || []) .filter((file) => /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test(file.url || ""), ) .ma…``。

   **主要协作调用**：``Object.entries(result?.outputs || {}).flatMap``、``Object.entries``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowProducts.js:181:378:FUNCTION

.. rubric:: ``Object.entries(result?.outputs || {}).flatMap callback @ 3``

.. code-block:: javascript

   Object.entries(result?.outputs || {}).flatMap callback @ 3([nodeId, product])

实现 ``Object.entries(result?.outputs || {}).flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3``—``8`` 行；所属函数 ``workflowArtifacts``。

**参数**

``[nodeId, product]``
   调用方传入的 ``nodeId, product`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(product?.artifacts || []) .filter((file) => /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test(file.url || ""), ) .map``、``(product?.artifacts || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowProducts.js:249:325:FUNCTION

.. rubric:: ``(product?.artifacts || []) .filter callback @ 5``

.. code-block:: javascript

   (product?.artifacts || []) .filter callback @ 5(file)

作为 ``(product?.artifacts || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``5``—``6`` 行；所属函数 ``Object.entries(result?.outputs || {}).flatMap callback @ 3``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test``。

.. CWM-AST-FUNCTION src/features/workflows/workflowProducts.js:346:377:FUNCTION

.. rubric:: ``(product?.artifacts || []) .filter((file) => /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test(file.url || ""), ) .map callback @ 8``

.. code-block:: javascript

   (product?.artifacts || []) .filter((file) => /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test(file.url || ""), ) .map callback @ 8(file)

作为 ``(product?.artifacts || []) .filter((file) => /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test(file.url || ""), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``8`` 行；所属函数 ``Object.entries(result?.outputs || {}).flatMap callback @ 3``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
