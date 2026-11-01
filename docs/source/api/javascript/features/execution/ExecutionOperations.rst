src/features/execution/ExecutionOperations 模块
==================================================================================================

.. js:module:: src/features/execution/ExecutionOperations

Show interrupted waits without confusing them with cancelled tool executions.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionOperations.jsx``
* **模块标识**：``src/features/execution/ExecutionOperations``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionOperations.jsx:89:545:FUNCTION

.. js:function:: operationStatus(operation)

   实现 ``operationStatus`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``9`` 行。

   **参数**

   ``operation``
      调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``['结果待核验', CircleAlert, 'text-amber-600']``、``['取消待确认', Loader2, 'text-amber-600']``、``['后台运行中', Loader2, 'text-blue-500']``、``['执行失败', CircleAlert, 'text-red-500']``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionOperations.jsx:546:2305:FUNCTION

.. js:function:: ExecutionOperations({operations})

   Show interrupted waits without confusing them with cancelled tool executions.

   **性质**：同步函数；导出 API；源码第 ``12``—``37`` 行。

   **参数**

   ``{operations}``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section aria-label="被打断的工具"> <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-400">被打断的工具</h3> <div className="divide-y divide-gray-100 rounded-xl border borde…``。

   **主要协作调用**：``(Array.isArray(operations) ? operations : []).filter``、``Array.isArray``、``rows.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionOperations.jsx:763:787:FUNCTION

.. rubric:: ``(Array.isArray(operations) ? operations : []).filter callback @ 13``

.. code-block:: javascript

   (Array.isArray(operations) ? operations : []).filter callback @ 13(item)

作为 ``(Array.isArray(operations) ? operations : []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``ExecutionOperations``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionOperations.jsx:1128:2256:FUNCTION

.. rubric:: ``rows.map callback @ 19``

.. code-block:: javascript

   rows.map callback @ 19(operation)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``33`` 行；所属函数 ``ExecutionOperations``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={operation.id} data-execution-operation={operation.id} className="px-3 py-2.5 text-xs"> <div className="flex min-w-0 items-center gap-2"> <Icon aria-hidden="true" class…``。

**主要协作调用**：``operationStatus``、``['running', 'cancel_requested'].includes``。
