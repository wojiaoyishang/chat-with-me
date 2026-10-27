src/components/markdown/markdownCopy 模块
======================================================================================

.. js:module:: src/components/markdown/markdownCopy

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/markdownCopy.js``
* **模块标识**：``src/components/markdown/markdownCopy``
* **顶层函数/组件/Hook**：9
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``./card-block/agent/agentContent.js``、``../../features/chat/speech/frontendFeedback.js``、``./replacementProtocol.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:645:728:FUNCTION

.. js:function:: toSafeString(value)

   实现 ``toSafeString`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``11`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'string' ? value : String(value ?? '')``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:817:902:FUNCTION

.. js:function:: normalizeCopyText(content)

   规范化与 ``Copy Text`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``17`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n')``。

   **主要协作调用**：``normalizeLineBreaks(content).replace``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:1185:1333:FUNCTION

.. js:function:: stripCopyTypeMarker(content)

   实现 ``stripCopyTypeMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``38`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``parsed.hadMarker ? parsed.content : normalizeLineBreaks(content)``。

   **主要协作调用**：``parseReplacementProtocol``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:1379:2327:FUNCTION

.. js:function:: extractCopyTextFromReplacementValue(value, seenObjects)

   提取与 ``Copy Text From Replacement Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``40``—``81`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``seenObjects`` （默认值 ``new WeakSet()``）
      调用方传入的 ``seenObjects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``value``、``String(value)``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join('\n')``。

   **主要协作调用**：``String``、``Array.isArray``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter``、``value .map``、``seenObjects.has``、``seenObjects.add``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:2367:4187:FUNCTION

.. js:function:: normalizeReplacementCopyEntry(replacement, id, explicitType, inheritedSnapshot)

   规范化与 ``Replacement Copy Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``133`` 行。

   **参数**

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``explicitType``
      调用方传入的 ``explicitType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``inheritedSnapshot`` （默认值 ``false``）
      调用方传入的 ``inheritedSnapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ exists: false, id: normalizedId, content: '', }``、``{ exists: true, id: normalizedId, content: '', }``、``{ exists: true, id: normalizedId, snapshot, content: String(explicitType || entry?.type || protocol.type || '').toLowerCase() === 'agent' ? parseAgentContent(stripCopyTypeMarker(r…``。

   **主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``、``stripFrontendFeedback``、``parseReplacementProtocol``、``['executionwindowtool', 'workspacetransfer', 'executionstatus', 'escstatus'].includes``、``String(explicitType || entry?.type || protocol.type || '').toLowerCase``、``parseAgentContent``、``stripCopyTypeMarker``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:4216:4451:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``135``—``145`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``String(attributes.type || '').trim() === 'replace'``。

   **主要协作调用**：``String(attributes.type || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:4483:6010:FUNCTION

.. js:function:: replaceCopyDirectives(source, directiveRegex, replacement, options)

   替换与 ``Copy Directives`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``147``—``190`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``directiveRegex``
      调用方传入的 ``directiveRegex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``source.replace(directiveRegex, (_match, directiveName, rawAttributes) => { const attributes = parseCardReplaceAttributes(rawAttributes); const finalId = getCardReplaceIdFromAttrib…``。

   **主要协作调用**：``source.replace``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:6054:7302:FUNCTION

.. js:function:: resolveMarkdownCopyContent(content, replacement, options)

   解析并确定与 ``Markdown Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``192``—``232`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement`` （默认值 ``{}``）
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options`` （默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``normalizeCopyText( source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, '') .replace(CARD_REPLACE_MUSTACHE_RE, ''), )``、``normalizeCopyText(withoutMustacheDirectives)``。

   **主要协作调用**：``normalizeLineBreaks``、``stripFrontendFeedback``、``normalizeCopyText``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, '') .replace``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '') .replace``、``source .replace``、``replaceCopyDirectives``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7354:7891:FUNCTION

.. js:function:: createMarkdownCopyContentComponent(copyContent)

   创建与 ``Markdown Copy Content Component`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``234``—``249`` 行。

   **参数**

   ``copyContent``
      调用方传入的 ``copyContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ get content() { return read(); }, get copyContent() { return read(); }, get markdownContent() { return read(); }, get displayContent() { return read(); }, get text() { return re…``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:1713:1777:FUNCTION

.. rubric:: ``value .map callback @ 55``

.. code-block:: javascript

   value .map callback @ 55(item)

作为 ``value .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``extractCopyTextFromReplacementValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extractCopyTextFromReplacementValue``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:4676:6006:FUNCTION

.. rubric:: ``source.replace callback @ 152``

.. code-block:: javascript

   source.replace callback @ 152(_match, directiveName, rawAttributes)

实现 ``source.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``152``—``189`` 行；所属函数 ``replaceCopyDirectives``。

**参数**

``_match``
   调用方传入的 ``_match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``directiveName``
   调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``rawAttributes``
   调用方传入的 ``rawAttributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``resolveMarkdownCopyContent(normalized.content, replacement, { depth: depth + 1, maxDepth, visitedIds: [...visitedIds, finalId], snapshot: normalized.snapshot, })``。

**主要协作调用**：``parseCardReplaceAttributes``、``getCardReplaceIdFromAttributes``、``Boolean``、``Object.prototype.hasOwnProperty.call``、``isReplaceDirective``、``visitedIds.includes``、``console.error``、``normalizeReplacementCopyEntry``、``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7440:7472:FUNCTION

.. rubric:: ``anonymous callback @ 235``

.. code-block:: javascript

   anonymous callback @ 235()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toSafeString``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7486:7527:FUNCTION

.. rubric:: ``content``

.. code-block:: javascript

   content()

实现 ``content`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``read()``。

**主要协作调用**：``read``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7528:7573:FUNCTION

.. rubric:: ``copyContent``

.. code-block:: javascript

   copyContent()

实现 ``copyContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``read()``。

**主要协作调用**：``read``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7574:7623:FUNCTION

.. rubric:: ``markdownContent``

.. code-block:: javascript

   markdownContent()

实现 ``markdownContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``239``—``239`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``read()``。

**主要协作调用**：``read``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7624:7672:FUNCTION

.. rubric:: ``displayContent``

.. code-block:: javascript

   displayContent()

实现 ``displayContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``read()``。

**主要协作调用**：``read``。

.. CWM-AST-FUNCTION src/components/markdown/markdownCopy.js:7673:7711:FUNCTION

.. rubric:: ``text``

.. code-block:: javascript

   text()

实现 ``text`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``241`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``read()``。

**主要协作调用**：``read``。
