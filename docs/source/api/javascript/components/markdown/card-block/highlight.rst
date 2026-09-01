src/components/markdown/card-block/highlight 模块
======================================================================================================

.. js:module:: src/components/markdown/card-block/highlight

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/highlight.js``
* **模块标识**：``src/components/markdown/card-block/highlight``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``./utils.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/highlight.js:1104:1681:FUNCTION

.. js:function:: loadHljs()

   加载与 ``Hljs`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``50``—``70`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(hljs)``、``loadingPromise``。

   **主要协作调用**：``Promise.resolve``、``import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi…``、``import('highlight.js/lib/core') .then``、``import``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/highlight.js:1725:1962:FUNCTION

.. js:function:: normalizeHighlightLanguage(language)

   规范化与 ``Highlight Language`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``72``—``78`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``HIGHLIGHT_LANGUAGE_ALIASES[normalized] || normalized``。

   **主要协作调用**：``toSafeString(language).trim().toLowerCase``、``toSafeString(language).trim``、``toSafeString``、``NO_HIGHLIGHT_LANGS.has``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/highlight.js:2003:2901:FUNCTION

.. js:function:: ensureHighlightLanguage(hljsInst, language)

   确保与 ``Highlight Language`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``80``—``110`` 行。

   **参数**

   ``hljsInst``
      调用方传入的 ``hljsInst`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized``、``''``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``normalizeHighlightLanguage``、``hljsInst.getLanguage``、``failedLanguages?.has``、``failedLanguages?.add``、``loadModule``、``hljsInst.registerLanguage``、``console.error``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/highlight.js:1276:1560:FUNCTION

.. rubric:: ``import('highlight.js/lib/core') .then callback @ 57``

.. code-block:: javascript

   import('highlight.js/lib/core') .then callback @ 57(module)

处理 ``import('highlight.js/lib/core') .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``57``—``63`` 行；所属函数 ``loadHljs``。

**参数**

``module``
   调用方传入的 ``module`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``hljs``。

**主要协作调用**：``hljs.configure``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/highlight.js:1583:1643:FUNCTION

.. rubric:: ``import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi… callback @ 64``

.. code-block:: javascript

   import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi… callback @ 64()

实现 ``import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``66`` 行；所属函数 ``loadHljs``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
