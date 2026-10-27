src/components/markdown/replacementProjection 模块
========================================================================================================

.. js:module:: src/components/markdown/replacementProjection

Keep only the referenced card tree; reuse a prior projection when unchanged.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/replacementProjection.js``
* **模块标识**：``src/components/markdown/replacementProjection``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``./replacementProtocol.js``、``../../features/execution/executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:556:810:FUNCTION

.. js:function:: references(content)

   实现 ``references`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``10`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...String(content || '').matchAll(REFERENCES)].map((match) => { const attrs = parseCardReplaceAttributes(match[1] || m…``、``[...String(content || '').matchAll(REFERENCES)].map``、``String(content || '').matchAll``、``String``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:811:2101:FUNCTION

.. js:function:: projectReplacements(content, replacement, previous, maxDepth)

   Keep only the referenced card tree; reuse a prior projection when unchanged.

   **性质**：同步函数；导出 API；源码第 ``13``—``35`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``previous`` （默认值 ``null``）
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maxDepth`` （默认值 ``10``）
      调用方传入的 ``maxDepth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``previous && ids.length === Object.keys(previous).length && ids.every((id) => previous[id] === selected[id]) ? previous : selected``。

   **主要协作调用**：``Object.create``、``walk``、``Object.keys``、``ids.every``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:2101:2766:FUNCTION

.. js:function:: executionGroupingKey(content, replacement)

   Only facts that affect grouping invalidate the Markdown syntax pipeline.

   **性质**：同步函数；导出 API；源码第 ``38``—``46`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.stringify(references(content).map(({ id, type }) => { const entry = normalizeReplacementEntry(replacement, id, type); const status = entry.type === 'executionStatus' ? parseE…``。

   **主要协作调用**：``JSON.stringify``、``references(content).map``、``references``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:622:786:FUNCTION

.. rubric:: ``[...String(content || '').matchAll(REFERENCES)].map callback @ 7``

.. code-block:: javascript

   [...String(content || '').matchAll(REFERENCES)].map callback @ 7(match)

作为 ``[...String(content || '').matchAll(REFERENCES)].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``10`` 行；所属函数 ``references``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ id: getCardReplaceIdFromAttributes(attrs), type: attrs.type || '' }``。

**主要协作调用**：``parseCardReplaceAttributes``、``getCardReplaceIdFromAttributes``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:795:809:FUNCTION

.. rubric:: ``[...String(content || '').matchAll(REFERENCES)].map((match) => { const attrs = parseCardReplaceAttributes(match[1] || m… callback @ 10``

.. code-block:: javascript

   [...String(content || '').matchAll(REFERENCES)].map((match) => { const attrs = parseCardReplaceAttributes(match[1] || m… callback @ 10({ id })

实现 ``[...String(content || '').matchAll(REFERENCES)].map((match) => { const attrs = parseCardReplaceAttributes(match[1] || m…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``references``。

**参数**

``{ id }``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:1160:1887:FUNCTION

.. rubric:: ``walk``

.. code-block:: javascript

   walk(source, depth)

实现 ``walk`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``30`` 行；所属函数 ``projectReplacements``。

**参数**

``source``
   调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``depth``
   调用方传入的 ``depth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``references``、``seen.has``、``seen.add``、``Object.hasOwn``、``normalizeReplacementEntry``、``id.replace``、``walk``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:2030:2067:FUNCTION

.. rubric:: ``ids.every callback @ 33``

.. code-block:: javascript

   ids.every callback @ 33(id)

作为 ``ids.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``projectReplacements``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/replacementProjection.js:2294:2761:FUNCTION

.. rubric:: ``references(content).map callback @ 39``

.. code-block:: javascript

   references(content).map callback @ 39({ id, type })

作为 ``references(content).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``45`` 行；所属函数 ``executionGroupingKey``。

**参数**

``{ id, type }``
   调用方传入的 ``id, type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[id, entry.exists, entry.type, Boolean(entry.contextStatus), entry.snapshot, entry.content.trim().length === 0, getExecutionStatusGroupKey(status), status?.executionId, status?.ru…``。

**主要协作调用**：``normalizeReplacementEntry``、``parseExecutionStatus``、``Boolean``、``entry.content.trim``、``getExecutionStatusGroupKey``。
