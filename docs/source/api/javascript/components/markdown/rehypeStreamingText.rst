src/components/markdown/rehypeStreamingText 模块
====================================================================================================

.. js:module:: src/components/markdown/rehypeStreamingText

Mark prose text only; code, math, media metadata and tool control nodes stay untouched.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/rehypeStreamingText.js``
* **模块标识**：``src/components/markdown/rehypeStreamingText``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/rehypeStreamingText.js:0:923:FUNCTION

.. js:function:: rehypeStreamingText({enabled = false})

   Mark prose text only; code, math, media metadata and tool control nodes stay untouched.

   **性质**：同步函数；导出 API；源码第 ``2``—``18`` 行。

   **参数**

   ``{enabled = false}`` （默认值 ``{}``）
      调用方传入的 ``enabled = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree) => { if (!enabled) return; const walk = (node, excluded = false) => { const skip = excluded || ['pre', 'code', 'script', 'style', 'math', 'svg', 'cwm-stream-text'].includes…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/rehypeStreamingText.js:167:920:FUNCTION

.. rubric:: ``returned callback @ 3``

.. code-block:: javascript

   returned callback @ 3(tree)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3``—``17`` 行；所属函数 ``rehypeStreamingText``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``walk``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/rehypeStreamingText.js:230:893:FUNCTION

.. rubric:: ``walk``

.. code-block:: javascript

   walk(node, excluded)

实现 ``walk`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``15`` 行；所属函数 ``returned callback @ 3``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``excluded`` （默认值 ``false``）
   调用方传入的 ``excluded`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['pre', 'code', 'script', 'style', 'math', 'svg', 'cwm-stream-text'].includes``、``(node.properties?.className || []).some``、``node.children.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/rehypeStreamingText.js:451:493:FUNCTION

.. rubric:: ``(node.properties?.className || []).some callback @ 7``

.. code-block:: javascript

   (node.properties?.className || []).some callback @ 7(name)

作为 ``(node.properties?.className || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``walk``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(name).startsWith``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/rehypeStreamingText.js:590:881:FUNCTION

.. rubric:: ``node.children.map callback @ 9``

.. code-block:: javascript

   node.children.map callback @ 9(child)

作为 ``node.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``9``—``14`` 行；所属函数 ``walk``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{type: 'element', tagName: 'cwm-stream-text', properties: {}, children: [child], position: child.position}``、``child``。

**主要协作调用**：``child.value.trim``、``walk``。
