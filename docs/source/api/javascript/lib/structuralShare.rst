src/lib/structuralShare 模块
================================================================================

.. js:module:: src/lib/structuralShare

Preserve references for unchanged JSON data, including sparse server patches.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/structuralShare.js``
* **模块标识**：``src/lib/structuralShare``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/structuralShare.js:0:1013:FUNCTION

.. js:function:: shareJsonData(previous, incoming)

   Preserve references for unchanged JSON data, including sparse server patches.

   **性质**：同步函数；导出 API；源码第 ``2``—``17`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``previous``、``incoming``、``unchanged ? previous : result``。

   **主要协作调用**：``Object.is``、``Array.isArray``、``Object.keys``、``shareJsonData``、``Object.defineProperty``、``Object.hasOwn``。
