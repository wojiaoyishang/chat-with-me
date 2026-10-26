src/components/markdown/markdownMediaUrl 模块
==============================================================================================

.. js:module:: src/components/markdown/markdownMediaUrl

Restrict media URLs from Markdown before assigning them to a browser element.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/markdownMediaUrl.js``
* **模块标识**：``src/components/markdown/markdownMediaUrl``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/markdownMediaUrl.js:52:1109:FUNCTION

.. js:function:: resolveMarkdownMediaUrl(value)

   Restrict media URLs from Markdown before assigning them to a browser element.

   **性质**：同步函数；导出 API；源码第 ``4``—``30`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``resourceUrl``、``!url.username && !url.password && ['http:', 'https:'].includes(url.protocol) ? url.href : ''``、``raw``。

   **主要协作调用**：``value.trim``、``raw.includes``、``[...raw].some``、``resolveCwmUrl``、``/^https?:\/\//i.test``、``['http:', 'https:'].includes``、``raw.startsWith``、``/^[a-z][a-z\d+.-]*:/i.test``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/markdownMediaUrl.js:316:417:FUNCTION

.. rubric:: ``[...raw].some callback @ 7``

.. code-block:: javascript

   [...raw].some callback @ 7(char)

作为 ``[...raw].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``10`` 行；所属函数 ``resolveMarkdownMediaUrl``。

**参数**

``char``
   调用方传入的 ``char`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``code < 32 || code === 127``。

**主要协作调用**：``char.codePointAt``。
