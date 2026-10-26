src/features/workflows/WorkflowParallelRegions 模块
==========================================================================================================

.. js:module:: src/features/workflows/WorkflowParallelRegions

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowParallelRegions.jsx``
* **模块标识**：``src/features/workflows/WorkflowParallelRegions``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``@xyflow/react``、``./workflowParallelModel.js``、``./WorkflowRegionControl.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowParallelRegions.jsx:214:2116:FUNCTION

.. js:function:: WorkflowParallelRegions({ regions, nodes, onRegionChange, disabled, })

   渲染 ``WorkflowParallelRegions`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``6``—``67`` 行。

   **参数**

   ``{ regions, nodes, onRegionChange, disabled, }``
      调用方传入的 ``regions, nodes, onRegionChange, disabled,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <ViewportPortal> <div className="workflow-parallel-regions"> {boxes.map((box) => ( <div key={box.id} className={\x60workflow-parallel-region${box.limit === 1 ? " workflow-region-se…``。

   **主要协作调用**：``useMemo``、``boxes.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowParallelRegions.jsx:345:394:FUNCTION

.. rubric:: ``useMemo callback @ 13``

.. code-block:: javascript

   useMemo callback @ 13()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``WorkflowParallelRegions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowParallelBounds``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowParallelRegions.jsx:558:2072:FUNCTION

.. rubric:: ``boxes.map callback @ 20``

.. code-block:: javascript

   boxes.map callback @ 20(box)

作为 ``boxes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``20``—``63`` 行；所属函数 ``WorkflowParallelRegions``。

**参数**

``box``
   调用方传入的 ``box`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``box.nodeIds.join``。
