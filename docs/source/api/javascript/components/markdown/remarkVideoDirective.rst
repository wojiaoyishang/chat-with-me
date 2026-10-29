src/components/markdown/remarkVideoDirective 模块
======================================================================================================

.. js:module:: src/components/markdown/remarkVideoDirective

Render \`![description](url){type=video}\` as a block video player. Only the exact suffix is special; ordinary images, code, and :::card blocks remain under the existing Markdown parser's control.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/remarkVideoDirective.js``
* **模块标识**：``src/components/markdown/remarkVideoDirective``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:36:766:FUNCTION

.. js:function:: followsImageExactly(image, text, source)

   实现 ``followsImageExactly`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``20`` 行。

   **参数**

   ``image``
      调用方传入的 ``image`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``text``
      待展示、发送、解析或朗读的文本。

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``source.slice(imageEnd, imageEnd + VIDEO_MARKER.length) === VIDEO_MARKER``、``true``。

   **主要协作调用**：``text.value.startsWith``、``source.slice``。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:766:1099:FUNCTION

.. js:function:: videoNodeFromImage(image)

   实现 ``videoNodeFromImage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``35`` 行。

   **参数**

   ``image``
      调用方传入的 ``image`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ type: 'videoEmbed', data: { hName: 'video', hProperties: { src: image.url, title: image.alt || image.title || '', }, hChildren: [], }, position: image.position, }``。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:1099:2208:FUNCTION

.. js:function:: splitParagraph(paragraph, source)

   实现 ``splitParagraph`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``73`` 行。

   **参数**

   ``paragraph``
      调用方传入的 ``paragraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[paragraph]``、``result``。

   **主要协作调用**：``followsImageExactly``、``buffer.push``、``flush``、``result.push``、``videoNodeFromImage``、``following.value.slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:2208:3132:FUNCTION

.. js:function:: remarkVideoDirective()

   Render \`![description](url){type=video}\` as a block video player. Only the exact suffix is special; ordinary images, code, and :::card blocks remain under the existing Markdown parser's control.

   **性质**：同步函数；导出 API；源码第 ``80``—``101`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree, file) => { const source = typeof file?.value === 'string' ? file.value : null; function transformChildren(parent) { if (!Array.isArray(parent.children)) return; const trans…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:1236:1442:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   flush()

实现 ``flush`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``47`` 行；所属函数 ``splitParagraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buffer.some``、``result.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:1286:1340:FUNCTION

.. rubric:: ``buffer.some callback @ 43``

.. code-block:: javascript

   buffer.some callback @ 43(child)

作为 ``buffer.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``flush``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``child.value.trim``。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:2481:3129:FUNCTION

.. rubric:: ``returned callback @ 81``

.. code-block:: javascript

   returned callback @ 81(tree, file)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``100`` 行；所属函数 ``remarkVideoDirective``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transformChildren``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkVideoDirective.js:2575:3089:FUNCTION

.. rubric:: ``transformChildren``

.. code-block:: javascript

   transformChildren(parent)

转换与 ``Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``84``—``97`` 行；所属函数 ``returned callback @ 81``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``transformed.push``、``splitParagraph``、``transformChildren``。
