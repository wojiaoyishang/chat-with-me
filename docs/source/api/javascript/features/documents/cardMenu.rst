src/features/documents/cardMenu 模块
================================================================================

.. js:module:: src/features/documents/cardMenu

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/cardMenu.js``
* **模块标识**：``src/features/documents/cardMenu``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/cardMenu.js:164:854:FUNCTION

.. js:function:: localizeCardDirective(directive, language, translate)

   实现 ``localizeCardDirective`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``7``—``18`` 行。

   **参数**

   ``directive``
      调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``translate``
      调用方传入的 ``translate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...directive, label: translated.label || (legacyLabel ? translate(legacyLabel) : directive.label), description: translated.description || (locale === 'en' && directive.name ===…``。

   **主要协作调用**：``String(language || 'zh').split``、``String``、``translate``。
