src/features/execution/ExecutionErrorMessage 模块
======================================================================================================

.. js:module:: src/features/execution/ExecutionErrorMessage

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionErrorMessage.jsx``
* **模块标识**：``src/features/execution/ExecutionErrorMessage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``./executionErrorPresentation.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionErrorMessage.jsx:75:828:FUNCTION

.. js:function:: ExecutionErrorMessage({error})

   渲染 ``ExecutionErrorMessage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``3``—``18`` 行。

   **参数**

   ``{error}``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-0 max-w-full [overflow-wrap:anywhere]"> <div className="whitespace-pre-wrap">{message}</div> {details && ( <details className="mt-2 min-w-0 text-xs"> <summ…``。

   **主要协作调用**：``executionErrorPresentation``。
