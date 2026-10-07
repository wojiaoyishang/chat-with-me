src/features/execution/WidgetResponseDetails 模块
======================================================================================================

.. js:module:: src/features/execution/WidgetResponseDetails

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/WidgetResponseDetails.jsx``
* **模块标识**：``src/features/execution/WidgetResponseDetails``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/WidgetResponseDetails.jsx:0:2512:FUNCTION

.. js:function:: WidgetResponseDetails({ response, fallback = '' })

   渲染 ``WidgetResponseDetails`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``1``—``43`` 行。

   **参数**

   ``{ response, fallback = '' }``
      调用方传入的 ``response, fallback = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <details className="mt-2 text-sm"> <summary className="cursor-pointer select-none text-gray-500 hover:text-gray-800">查看选择详情</summary> <div className="mt-2 space-y-3 rounded-lg b…``。

   **主要协作调用**：``['left', 'right', 'middle'].map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/WidgetResponseDetails.jsx:549:2302:FUNCTION

.. rubric:: ``['left', 'right', 'middle'].map callback @ 8``

.. code-block:: javascript

   ['left', 'right', 'middle'].map callback @ 8(pile)

作为 ``['left', 'right', 'middle'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``36`` 行；所属函数 ``WidgetResponseDetails``。

**参数**

``pile``
   调用方传入的 ``pile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section key={pile}> <div className="mb-1 text-xs font-medium text-gray-500"> {response[\x60${pile}Label\x60]} · {cards.length} </div> {cards.length ? ( <ul className="space-y-2"> {ca…``。

**主要协作调用**：``cards.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/WidgetResponseDetails.jsx:1075:2014:FUNCTION

.. rubric:: ``cards.map callback @ 17``

.. code-block:: javascript

   cards.map callback @ 17(card, index)

作为 ``cards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``17``—``29`` 行；所属函数 ``['left', 'right', 'middle'].map callback @ 8``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
