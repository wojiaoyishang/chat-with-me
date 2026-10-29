src/components/markdown/remarkWorkProcess 模块
================================================================================================

.. js:module:: src/components/markdown/remarkWorkProcess

Group adjacent reasoning/tool traces, leaving prose, results and interaction UIs in place.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/remarkWorkProcess.js``
* **模块标识**：``src/components/markdown/remarkWorkProcess``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``unist-util-visit``、``./replacementProtocol.js``、``../../features/execution/workProcessModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkWorkProcess.js:216:3317:FUNCTION

.. js:function:: remarkWorkProcess({replacement = {}, renderSurface = 'conversation', snapshot = false})

   Group adjacent reasoning/tool traces, leaving prose, results and interaction UIs in place.

   **性质**：同步函数；导出 API；源码第 ``6``—``59`` 行。

   **参数**

   ``{replacement = {}, renderSurface = 'conversation', snapshot = false}`` （默认值 ``{}``）
      调用方传入的 ``replacement = , renderSurface = 'conversation', snapshot = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree) => { if (snapshot || renderSurface !== 'conversation') return; visit(tree, (node) => Array.isArray(node.children), (parent) => { let group = null; const output = []; const…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkWorkProcess.js:437:3314:FUNCTION

.. rubric:: ``returned callback @ 7``

.. code-block:: javascript

   returned callback @ 7(tree)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``58`` 行；所属函数 ``remarkWorkProcess``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkWorkProcess.js:535:574:FUNCTION

.. rubric:: ``visit callback @ 9``

.. code-block:: javascript

   visit callback @ 9(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``9`` 行；所属函数 ``returned callback @ 7``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/components/markdown/remarkWorkProcess.js:575:3306:FUNCTION

.. rubric:: ``visit callback @ 9``

.. code-block:: javascript

   visit callback @ 9(parent)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``57`` 行；所属函数 ``returned callback @ 7``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``workProcessEntry``、``processIdentity``、``sameProcess``、``flush``、``Object.keys``、``group.nodes.push``、``group.allNodes.push``、``group.entries.push``、``normalizeReplacementEntry``、``['markdown', 'executionStatus'].includes``、``other.content.trim``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkWorkProcess.js:676:1384:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   flush(tail)

实现 ``flush`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``24`` 行；所属函数 ``visit callback @ 9``。

**参数**

``tail`` （默认值 ``false``）
   调用方传入的 ``tail`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``、``group.nodes.includes``、``output.push``。
