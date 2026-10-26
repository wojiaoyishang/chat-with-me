src/features/documents/escStatus 模块
================================================================================

.. js:module:: src/features/documents/escStatus

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/escStatus.js``
* **模块标识**：``src/features/documents/escStatus``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/escStatus.js:157:756:FUNCTION

.. js:function:: resolveEscStatus(data, live)

   解析并确定与 ``Esc Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``9``—``21`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``live``
      调用方传入的 ``live`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ status, rejected, label: rejected ? "文档写入未完成" : LABELS[status] || "文档正文已上屏", message: rejected && typeof data?.message === "string" ? data.message.slice(0, 300) : "", }``。

   **主要协作调用**：``data.message.slice``。
