src/components/markdown/remarkDirectiveToComponent 模块
=====================================================

.. js:module:: src/components/markdown/remarkDirectiveToComponent

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/remarkDirectiveToComponent.js``
* **模块标识**：``src/components/markdown/remarkDirectiveToComponent``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------

``unist-util-visit``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:39:406:FUNCTION

.. js:function:: parseCardReplaceAttrs(rawAttrs)

   解析与 ``Card Replace Attrs`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``16`` 行。

   **参数**

   ``rawAttrs``（默认值 ``''``）
      调用方传入的 ``rawAttrs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``attrs``。

   **主要协作调用**：``attrRe.exec``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:406:853:FUNCTION

.. js:function:: createCardReplaceNode(attrs)

   创建与 ``Card Replace Node`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``42`` 行。

   **参数**

   ``attrs``
      调用方传入的 ``attrs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ type: 'cardReplace', data: { hName: 'card-replace', hProperties, hChildren: [], }, }``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:853:1090:FUNCTION

.. js:function:: hasMeaningfulChildren(children)

   实现 ``hasMeaningfulChildren`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``52`` 行。

   **参数**

   ``children``
      React 子节点。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``children.some((child) => { if (child.type === 'text') { return child.value.length > 0 && child.value.trim().length > 0; } return true; })``。

   **主要协作调用**：``children.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:1090:1217:FUNCTION

.. js:function:: createBlockFromChildren(children, originalBlock)

   创建与 ``Block From Children`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``59`` 行。

   **参数**

   ``children``
      React 子节点。

   ``originalBlock``
      调用方传入的 ``originalBlock`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...originalBlock, children, }``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:1217:2524:FUNCTION

.. js:function:: splitTextNodeByCardReplace(node)

   实现 ``splitTextNodeByCardReplace`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``115`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[node]``、``newNodes``。

   **主要协作调用**：``tokenRe.test``、``tokenRe.exec``、``newNodes.push``、``text.slice``、``parseCardReplaceAttrs``、``createCardReplaceNode``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:2524:4629:FUNCTION

.. js:function:: remarkCardReplace()

   实现 ``remarkCardReplace`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``117``—``181`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``function transformer(tree) { visit(tree, (node) => node.type === 'paragraph' \|\| node.type === 'heading', (paragraphNode, paragraphIndex, paragraphParent) => { if (!paragraphParent…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:4629:4961:FUNCTION

.. js:function:: rehypeInlineCodeProperty()

   实现 ``rehypeInlineCodeProperty`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``183``—``194`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``function transformer(tree) { visit(tree, 'code', (node) => { const data = node.data \|\| (node.data = {}); data.hProperties = { ...(data.hProperties \|\| {}), isCodeBlock: true, }; })…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:923:1086:FUNCTION

.. rubric:: ``children.some callback @ 45``

.. code-block:: javascript

   children.some callback @ 45(child)

作为 ``children.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``51`` 行；所属函数 ``hasMeaningfulChildren``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``child.value.length > 0 && child.value.trim().length > 0``、``true``。

**主要协作调用**：``child.value.trim``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:2574:4626:FUNCTION

.. rubric:: ``transformer``

.. code-block:: javascript

   transformer(tree)

实现 ``transformer`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``118``—``180`` 行；所属函数 ``remarkCardReplace``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visit``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:2623:2686:FUNCTION

.. rubric:: ``visit callback @ 119``

.. code-block:: javascript

   visit callback @ 119(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``transformer``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:2687:4618:FUNCTION

.. rubric:: ``visit callback @ 119``

.. code-block:: javascript

   visit callback @ 119(paragraphNode, paragraphIndex, paragraphParent)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``119``—``179`` 行；所属函数 ``transformer``。

**参数**

``paragraphNode``
   调用方传入的 ``paragraphNode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``paragraphIndex``
   调用方传入的 ``paragraphIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``paragraphParent``
   调用方传入的 ``paragraphParent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``expandedChildren.push``、``splitTextNodeByCardReplace``、``expandedChildren.some``、``flushParagraphBuffer``、``replacementNodes.push``、``paragraphBuffer.push``、``paragraphParent.children.splice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:3278:3357:FUNCTION

.. rubric:: ``expandedChildren.some callback @ 133``

.. code-block:: javascript

   expandedChildren.some callback @ 133(child)

作为 ``expandedChildren.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``133``—``135`` 行；所属函数 ``visit callback @ 119``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``child.type === 'cardReplace'``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:3614:3961:FUNCTION

.. rubric:: ``flushParagraphBuffer``

.. code-block:: javascript

   flushParagraphBuffer()

实现 ``flushParagraphBuffer`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``145``—``156`` 行；所属函数 ``visit callback @ 119``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``hasMeaningfulChildren``、``replacementNodes.push``、``createBlockFromChildren``。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:4686:4958:FUNCTION

.. rubric:: ``transformer``

.. code-block:: javascript

   transformer(tree)

实现 ``transformer`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``184``—``193`` 行；所属函数 ``rehypeInlineCodeProperty``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visit``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkDirectiveToComponent.js:4743:4950:FUNCTION

.. rubric:: ``visit callback @ 185``

.. code-block:: javascript

   visit callback @ 185(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``185``—``192`` 行；所属函数 ``transformer``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
