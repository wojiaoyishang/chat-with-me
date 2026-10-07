src/components/ClientText 模块
================================================================================

.. js:module:: src/components/ClientText

Shared opt-in backend text renderer, escaped by React.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ClientText.jsx``
* **模块标识**：``src/components/ClientText``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``@/lib/clientText.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ClientText.jsx:56:280:FUNCTION

.. js:function:: ClientText({ text, locale, timeZone, ...props })

   Shared opt-in backend text renderer, escaped by React.

   **性质**：同步函数；导出 API；源码第 ``4``—``6`` 行。

   **参数**

   ``{ text, locale, timeZone, ...props }``
      调用方传入的 ``text, locale, timeZone, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<span {...props}>{resolveClientText(text, { locale, timeZone })}</span>``。

   **主要协作调用**：``resolveClientText``。
