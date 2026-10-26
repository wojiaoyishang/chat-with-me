src/features/workflows/WorkflowInterfaceNode 模块
======================================================================================================

.. js:module:: src/features/workflows/WorkflowInterfaceNode

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowInterfaceNode.jsx``
* **模块标识**：``src/features/workflows/WorkflowInterfaceNode``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@xyflow/react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfaceNode.jsx:117:942:FUNCTION

.. js:function:: WorkflowInterfaceNode({ data, selected })

   渲染 ``WorkflowInterfaceNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``4``—``23`` 行。

   **参数**

   ``{ data, selected }``
      调用方传入的 ``data, selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60workflow-interface-node ${input ? "is-input" : "is-output"} ${selected ? "is-selected" : ""} ${data.entry[input ? "target" : "source"] ? "" : "is-unbound"}\x60} >…``。
