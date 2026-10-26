src/features/workflows/WorkflowNodeBadge 模块
==============================================================================================

.. js:module:: src/features/workflows/WorkflowNodeBadge

A display number shares the canvas identity; runtime always uses node.id.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowNodeBadge.jsx``
* **模块标识**：``src/features/workflows/WorkflowNodeBadge``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``./workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodeBadge.jsx:50:656:FUNCTION

.. js:function:: WorkflowNodeBadge({ node, definition, number, isOutput, })

   A display number shares the canvas identity; runtime always uses node.id.

   **性质**：同步函数；导出 API；源码第 ``4``—``26`` 行。

   **参数**

   ``{ node, definition, number, isOutput, }``
      调用方传入的 ``node, definition, number, isOutput,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span className={\x60workflow-node-badge role-${role}\x60} title={\x60节点 ID：${node.id}\x60} > <b>#{number}</b> <span>{{ input: "输入", output: "输出", process: "处理" }[role]}</span> </span> )``。

   **主要协作调用**：``nodeCategory``。
