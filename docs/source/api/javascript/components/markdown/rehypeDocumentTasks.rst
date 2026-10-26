src/components/markdown/rehypeDocumentTasks 模块
====================================================================================================

.. js:module:: src/components/markdown/rehypeDocumentTasks

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/rehypeDocumentTasks.js``
* **模块标识**：``src/components/markdown/rehypeDocumentTasks``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``unified``、``remark-parse``、``remark-gfm``、``remark-math``、``remark-directive``、``unist-util-visit``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:309:968:FUNCTION

.. js:function:: taskEntries(tree, source)

   实现 ``taskEntries`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``23`` 行。

   **参数**

   ``tree``
      调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``entries``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:968:2034:FUNCTION

.. js:function:: renderedTaskEntries(tree, source)

   实现 ``renderedTaskEntries`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``42`` 行。

   **参数**

   ``tree``
      调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``entries``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:2034:2649:FUNCTION

.. js:function:: documentTaskChange(source, snapshot, offset, expectedChecked)

   实现 ``documentTaskChange`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``44``—``52`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``snapshot``
      调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``offset``
      调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``expectedChecked``
      调用方传入的 ``expectedChecked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ from: offset, to: offset + 1, insert: 'x' }``、``{ from: offset, to: offset + 1, insert: ' ' }``。

   **主要协作调用**：``Number.isSafeInteger``、``source.slice``。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:2649:3242:FUNCTION

.. js:function:: applyDocumentTaskToggle({ editor, text, sourceContent, offset, expectedChecked, undoManager })

   应用与 ``Document Task Toggle`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``54``—``65`` 行。

   **参数**

   ``{ editor, text, sourceContent, offset, expectedChecked, undoManager }``
      调用方传入的 ``editor, text, sourceContent, offset, expectedChecked, undoManager`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``text.toString``、``editor.state.doc.toString``、``documentTaskChange``、``undoManager?.stopCapturing``、``editor.dispatch``。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:3242:4689:FUNCTION

.. js:function:: rehypeDocumentTasks({ sourceContent = '', normalizeLine = null })

   实现 ``rehypeDocumentTasks`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``67``—``91`` 行。

   **参数**

   ``{ sourceContent = '', normalizeLine = null }`` （默认值 ``{}``）
      调用方传入的 ``sourceContent = '', normalizeLine = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree, file) => { const renderedContent = String(file.value ?? ''); const rendered = renderedTaskEntries(tree, renderedContent); if (!rendered.length) return; const source = sourc…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:399:944:FUNCTION

.. rubric:: ``visit callback @ 12``

.. code-block:: javascript

   visit callback @ 12(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``21`` 行；所属函数 ``taskEntries``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number.isSafeInteger``、``source.indexOf``、``source.slice(start, lineEnd < 0 ? undefined : lineEnd).replace``、``source.slice``、``TASK_MARKER.exec``、``entries.push``、``marker[0].indexOf``。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:1065:2010:FUNCTION

.. rubric:: ``visit callback @ 27``

.. code-block:: javascript

   visit callback @ 27(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``40`` 行；所属函数 ``renderedTaskEntries``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``node.properties?.className?.includes``、``node.children?.find``、``node.children?.find((child) => child.tagName === 'p')?.children?.find``、``Number.isSafeInteger``、``source.indexOf``、``source.slice(start, lineEnd < 0 ? undefined : lineEnd).replace``、``source.slice``、``TASK_MARKER.exec``、``Boolean``、``entries.push``、``marker[0].indexOf``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:1240:1276:FUNCTION

.. rubric:: ``node.children?.find callback @ 30``

.. code-block:: javascript

   node.children?.find callback @ 30(child)

作为 ``node.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``visit callback @ 27``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:1313:1345:FUNCTION

.. rubric:: ``node.children?.find callback @ 31``

.. code-block:: javascript

   node.children?.find callback @ 31(child)

作为 ``node.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``visit callback @ 27``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:1363:1399:FUNCTION

.. rubric:: ``node.children?.find((child) => child.tagName === 'p')?.children?.find callback @ 31``

.. code-block:: javascript

   node.children?.find((child) => child.tagName === 'p')?.children?.find callback @ 31(child)

作为 ``node.children?.find((child) => child.tagName === 'p')?.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``visit callback @ 27``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:3351:4686:FUNCTION

.. rubric:: ``returned callback @ 68``

.. code-block:: javascript

   returned callback @ 68(tree, file)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``90`` 行；所属函数 ``rehypeDocumentTasks``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String``、``renderedTaskEntries``、``taskEntries``、``unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkDirective).parse``、``unified().use(remarkParse).use(remarkGfm).use(remarkMath).use``、``unified().use(remarkParse).use(remarkGfm).use``、``unified().use(remarkParse).use``、``unified().use``、``unified``、``rendered.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/rehypeDocumentTasks.js:3925:4678:FUNCTION

.. rubric:: ``rendered.forEach callback @ 77``

.. code-block:: javascript

   rendered.forEach callback @ 77(entry, index)

作为 ``rendered.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``89`` 行；所属函数 ``returned callback @ 68``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeLine``、``String``。
