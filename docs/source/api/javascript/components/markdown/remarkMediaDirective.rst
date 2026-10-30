src/components/markdown/remarkMediaDirective 模块
======================================================================================================

.. js:module:: src/components/markdown/remarkMediaDirective

Build an explicit Markdown media marker without enabling arbitrary HTML.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/remarkMediaDirective.js``
* **模块标识**：``src/components/markdown/remarkMediaDirective``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：7

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:0:2851:FUNCTION

.. js:function:: createMediaDirective(mediaType)

   Build an explicit Markdown media marker without enabling arbitrary HTML.

   **性质**：同步函数；导出 API；源码第 ``2``—``72`` 行。

   **参数**

   ``mediaType``
      调用方传入的 ``mediaType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => (tree, file) => { const source = typeof file?.value === 'string' ? file.value : null; function transformChildren(parent) { if (!Array.isArray(parent.children)) return; const…``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:171:815:FUNCTION

.. rubric:: ``followsImageExactly``

.. code-block:: javascript

   followsImageExactly(image, text, source)

实现 ``followsImageExactly`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``16`` 行；所属函数 ``createMediaDirective``。

**参数**

``image``
   调用方传入的 ``image`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``text``
   待展示、发送、解析或朗读的文本。

``source``
   调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``source.slice(imageEnd, imageEnd + marker.length) === marker``、``true``。

**主要协作调用**：``text.value.startsWith``、``source.slice``。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:815:2209:FUNCTION

.. rubric:: ``splitParagraph``

.. code-block:: javascript

   splitParagraph(paragraph, source)

实现 ``splitParagraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``54`` 行；所属函数 ``createMediaDirective``。

**参数**

``paragraph``
   调用方传入的 ``paragraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``source``
   调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[paragraph]``、``result``。

**主要协作调用**：``followsImageExactly``、``buffer.push``、``flush``、``result.push``、``following.value.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:971:1197:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   flush()

实现 ``flush`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``27`` 行；所属函数 ``splitParagraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buffer.some``、``result.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:1025:1079:FUNCTION

.. rubric:: ``buffer.some callback @ 23``

.. code-block:: javascript

   buffer.some callback @ 23(child)

作为 ``buffer.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``flush``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``child.value.trim``。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:2221:2848:FUNCTION

.. rubric:: ``returned callback @ 56``

.. code-block:: javascript

   returned callback @ 56()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``71`` 行；所属函数 ``createMediaDirective``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:2227:2848:FUNCTION

.. rubric:: ``anonymous callback @ 56``

.. code-block:: javascript

   anonymous callback @ 56(tree, file)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``71`` 行；所属函数 ``returned callback @ 56``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transformChildren``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkMediaDirective.js:2321:2809:FUNCTION

.. rubric:: ``transformChildren``

.. code-block:: javascript

   transformChildren(parent)

转换与 ``Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``69`` 行；所属函数 ``anonymous callback @ 56``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``transformed.push``、``splitParagraph``、``transformChildren``。
