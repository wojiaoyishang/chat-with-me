src/features/execution/executionErrorPresentation 模块
================================================================================================================

.. js:module:: src/features/execution/executionErrorPresentation

Keep provider messages readable while retaining their complete diagnostic payload.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/executionErrorPresentation.js``
* **模块标识**：``src/features/execution/executionErrorPresentation``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/executionErrorPresentation.js:0:705:FUNCTION

.. js:function:: executionErrorPresentation(value)

   Keep provider messages readable while retaining their complete diagnostic payload.

   **性质**：同步函数；导出 API；源码第 ``2``—``16`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{message: raw, details: ''}``、``{message, details: raw}``。

   **主要协作调用**：``JSON.stringify``、``raw.indexOf``、``JSON.parse``、``raw.slice``、``message.trim``。
