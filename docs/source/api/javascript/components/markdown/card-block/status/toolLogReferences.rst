src/components/markdown/card-block/status/toolLogReferences 模块
====================================================================================================================================

.. js:module:: src/components/markdown/card-block/status/toolLogReferences

Repair duplicate references in one tool-calling card, never duplicate titles. Markdown positions let us preserve code examples and every unrelated byte.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/toolLogReferences.js``
* **模块标识**：``src/components/markdown/card-block/status/toolLogReferences``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``unified``、``remark-parse``、``unist-util-visit``、``../../replacementProtocol.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/toolLogReferences.js:389:2877:FUNCTION

.. js:function:: deduplicateToolLogReferences(content, replacement)

   Repair duplicate references in one tool-calling card, never duplicate titles. Markdown positions let us preserve code examples and every unrelated byte.

   **性质**：同步函数；导出 API；源码第 ``16``—``64`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement`` （默认值 ``{}``）
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``result``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``content.includes``、``content.matchAll``、``toolLogId``、``candidates.has``、``candidates.add``、``visit``、``parser.parse``、``removals.reverse``、``result.slice``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/toolLogReferences.js:759:1323:FUNCTION

.. rubric:: ``toolLogId``

.. code-block:: javascript

   toolLogId(match)

实现 ``toolLogId`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``30`` 行；所属函数 ``deduplicateToolLogReferences``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``types.get(key) ? id : ''``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``parseCardReplaceAttributes``、``getCardReplaceIdFromAttributes``、``JSON.stringify``、``types.has``、``String(attrs.type || replacement?.[id]?.type || '').trim``、``String``、``normalizeReplacementEntry``、``types.set``、``String(type).toLowerCase``、``types.get``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/toolLogReferences.js:1896:2724:FUNCTION

.. rubric:: ``visit callback @ 44``

.. code-block:: javascript

   visit callback @ 44(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``60`` 行；所属函数 ``deduplicateToolLogReferences``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``content.slice``、``source.matchAll``、``toolLogId``、``seen.has``、``removals.push``、``seen.add``。
