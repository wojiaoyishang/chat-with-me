src/components/markdown/MarkdownRenderer 模块
==============================================================================================

.. js:module:: src/components/markdown/MarkdownRenderer

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/MarkdownRenderer.jsx``
* **模块标识**：``src/components/markdown/MarkdownRenderer``
* **顶层函数/组件/Hook**：16
* **类**：0
* **局部函数与匿名回调**：46

主要依赖
--------------------------------------------------------------------------------

``react``、``react-markdown``、``remark-gfm``、``remark-math``、``rehype-katex``、``./remarkDirectiveToComponent.js``、``./CodeBlock.jsx``、``./card-block/CardBlock.jsx``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``sonner``、``@/components/modal/universalModal.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:1593:1743:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``41`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``visitedIds.join('>')``。

   **主要协作调用**：``Array.isArray``、``visitedIds.join``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:1773:2012:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``48`` 行。

   **参数**

   ``uri``
      调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``uri``、``resolved``、``defaultUrlTransform(uri, key, node)``。

   **主要协作调用**：``isUniversalModalLink``、``resolveCwmUrl``、``defaultUrlTransform``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2042:2294:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``58`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2415:3100:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``79`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3125:3210:FUNCTION

.. js:function:: toSafeString(value)

   实现 ``toSafeString`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``83`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'string' ? value : String(value ?? '')``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3303:3390:FUNCTION

.. js:function:: normalizeCopyText(content)

   规范化与 ``Copy Text`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``87``—``89`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n')``。

   **主要协作调用**：``normalizeLineBreaks(content).replace``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3691:3842:FUNCTION

.. js:function:: stripCopyTypeMarker(content)

   实现 ``stripCopyTypeMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``110`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``parsed.hadMarker ? parsed.content : normalizeLineBreaks(content)``。

   **主要协作调用**：``parseReplacementProtocol``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3890:4879:FUNCTION

.. js:function:: extractCopyTextFromReplacementValue(value, seenObjects)

   提取与 ``Copy Text From Replacement Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``112``—``153`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``seenObjects``（默认值 ``new WeakSet()``）
      调用方传入的 ``seenObjects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``value``、``String(value)``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join('\n')``。

   **主要协作调用**：``String``、``Array.isArray``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter``、``value .map``、``seenObjects.has``、``seenObjects.add``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4921:6311:FUNCTION

.. js:function:: normalizeReplacementCopyEntry(replacement, id, explicitType)

   规范化与 ``Replacement Copy Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``155``—``197`` 行。

   **参数**

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``explicitType``
      调用方传入的 ``explicitType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ exists: false, id: normalizedId, content: '', }``、``{ exists: true, id: normalizedId, content: '', }``、``{ exists: true, id: normalizedId, content: stripCopyTypeMarker(rawCopyContent), }``。

   **主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``、``parseReplacementProtocol``、``['taskwindowtool', 'workspacetransfer', 'executionstatus'].includes``、``String(explicitType || entry?.type || protocol.type || '').toLowerCase``、``stripCopyTypeMarker``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6342:6587:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``199``—``209`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``String(attributes.type || '').trim() === 'replace'``。

   **主要协作调用**：``String(attributes.type || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6621:8127:FUNCTION

.. js:function:: replaceCopyDirectives(source, directiveRegex, replacement, options)

   替换与 ``Copy Directives`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``211``—``253`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8173:9360:FUNCTION

.. js:function:: resolveMarkdownCopyContent(content, replacement, options)

   解析并确定与 ``Markdown Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``255``—``294`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement``（默认值 ``{}``）
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``normalizeCopyText( source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, '') .replace(CARD_REPLACE_MUSTACHE_RE, ''), )``、``normalizeCopyText(withoutMustacheDirectives)``。

   **主要协作调用**：``normalizeLineBreaks``、``normalizeCopyText``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, '') .replace``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '') .replace``、``source .replace``、``replaceCopyDirectives``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9414:9985:FUNCTION

.. js:function:: createMarkdownCopyContentComponent(copyContent)

   创建与 ``Markdown Copy Content Component`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``296``—``312`` 行。

   **参数**

   ``copyContent``
      调用方传入的 ``copyContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ content: safeCopyContent, copyContent: safeCopyContent, markdownContent: safeCopyContent, displayContent: safeCopyContent, text: safeCopyContent, getContent: () => safeCopyConte…``。

   **主要协作调用**：``toSafeString``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10014:20954:FUNCTION

.. js:function:: createComponents({ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…)

   创建与 ``Components`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``314``—``579`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…``
      调用方传入的 ``contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = ,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ p: ({ children }) => <p className="my-2">{children}</p>, ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>, ol: ({ children }) => <ol className="list-dec…``。

   **内部回调数量**：21。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20955:25176:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, contextId = '', conversationId = null, content, replacement = {}, depth =…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``581``—``703`` 行。

   **参数**

   ``{ resourceBaseUrl = null, contextId = '', conversationId = null, content, replacement = {}, depth =…``
      调用方传入的 ``resourceBaseUrl = null, contextId = '', conversationId = null, content, replacement = , depth =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath, remarkCardReplace, rehypeInlineCodeProperty]} rehypePlugins={[rehypeKatex]} components={components} urlTransform={(uri, key…``。

   **主要协作调用**：``useRef``、``Boolean``、``useMemo``、``useEffect``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25206:25451:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``705``—``714`` 行。

   **参数**

   ``prev``（默认值 ``[]``）
      状态更新函数接收到的前一状态。

   ``next``（默认值 ``[]``）
      调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2809:2929:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 72``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 72(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``72``—``74`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4239:4303:FUNCTION

.. rubric:: ``value .map callback @ 127``

.. code-block:: javascript

   value .map callback @ 127(item)

作为 ``value .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``extractCopyTextFromReplacementValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extractCopyTextFromReplacementValue``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6809:8122:FUNCTION

.. rubric:: ``source.replace callback @ 216``

.. code-block:: javascript

   source.replace callback @ 216(_match, directiveName, rawAttributes)

实现 ``source.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``216``—``252`` 行；所属函数 ``replaceCopyDirectives``。

**参数**

``_match``
   调用方传入的 ``_match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``directiveName``
   调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``rawAttributes``
   调用方传入的 ``rawAttributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``resolveMarkdownCopyContent(normalized.content, replacement, { depth: depth + 1, maxDepth, visitedIds: [...visitedIds, finalId], })``。

**主要协作调用**：``parseCardReplaceAttributes``、``getCardReplaceIdFromAttributes``、``Boolean``、``Object.prototype.hasOwnProperty.call``、``isReplaceDirective``、``visitedIds.includes``、``console.error``、``normalizeReplacementCopyEntry``、``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9717:9739:FUNCTION

.. rubric:: ``getContent``

.. code-block:: javascript

   getContent()

读取与 ``Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``305``—``305`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9765:9787:FUNCTION

.. rubric:: ``getCopyContent``

.. code-block:: javascript

   getCopyContent()

读取与 ``Copy Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9817:9839:FUNCTION

.. rubric:: ``getMarkdownContent``

.. code-block:: javascript

   getMarkdownContent()

读取与 ``Markdown Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9868:9890:FUNCTION

.. rubric:: ``getDisplayContent``

.. code-block:: javascript

   getDisplayContent()

读取与 ``Display Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``308``—``308`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9909:9931:FUNCTION

.. rubric:: ``getText``

.. code-block:: javascript

   getText()

读取与 ``Text`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``309``—``309`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9951:9973:FUNCTION

.. rubric:: ``toString``

.. code-block:: javascript

   toString()

实现 ``toString`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``310``—``310`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10344:10406:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``327``—``329`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacementRef?.current || {}``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10443:11097:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``331``—``347`` 行；所属函数 ``createComponents``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra``（默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRendererInner contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDe…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11126:11179:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``350``—``350`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11195:11265:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``352``—``352`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11281:11354:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``354``—``354`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11370:11425:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11441:11590:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``358``—``360`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11606:11702:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``362``—``362`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11718:11812:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``364``—``364`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11828:11883:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``366``—``366`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11907:12057:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``368``—``370`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12072:13244:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``372``—``398`` 行；所属函数 ``createComponents``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-blue-600 hover:underline" onClick={ modalLink ? (eve…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12528:12758:FUNCTION

.. rubric:: ``anonymous callback @ 382``

.. code-block:: javascript

   anonymous callback @ 382(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``382``—``386`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12850:13078:FUNCTION

.. rubric:: ``anonymous callback @ 388``

.. code-block:: javascript

   anonymous callback @ 388(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``388``—``391`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13004:13041:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 390``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 390(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``390``—``390`` 行；所属函数 ``anonymous callback @ 388``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13245:13838:FUNCTION

.. rubric:: ``code``

.. code-block:: javascript

   code({ className, children, isCodeBlock, ...props })

实现 ``code`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``400``—``413`` 行；所属函数 ``createComponents``。

**参数**

``{ className, children, isCodeBlock, ...props }``
   调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <code className="bg-gray-100 px-1 py-0.5 rounded-md text-xs font-mono text-gray-800" {...props}> {children} </code> )``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

**主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13857:14117:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``415``—``419`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14136:14203:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``421``—``421`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14222:14312:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``423``—``423`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14328:14416:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14432:14643:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``427``—``431`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14659:14800:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``433``—``435`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14817:14938:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``437``—``439`` 行；所属函数 ``createComponents``。

**参数**

``{ src, alt, ...props }``
   调用方传入的 ``src, alt, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14966:20942:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``441``—``577`` 行；所属函数 ``createComponents``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" type={tokenType} content="" contextId={contextId} conversationId={conversationId} replacement={…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId={contextId} convers…``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} type="error" content={\x60cardReplace 嵌套过深，id: ${finalId}\x60} contextId={contextId} conversat…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15923:16197:FUNCTION

.. rubric:: ``renderMarkdown callback @ 460``

.. code-block:: javascript

   renderMarkdown callback @ 460(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``460``—``465`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17294:17568:FUNCTION

.. rubric:: ``renderMarkdown callback @ 493``

.. code-block:: javascript

   renderMarkdown callback @ 493(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``493``—``498`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18491:18765:FUNCTION

.. rubric:: ``renderMarkdown callback @ 520``

.. code-block:: javascript

   renderMarkdown callback @ 520(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``520``—``525`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20596:20866:FUNCTION

.. rubric:: ``renderMarkdown callback @ 568``

.. code-block:: javascript

   renderMarkdown callback @ 568(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``568``—``573`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22164:22221:FUNCTION

.. rubric:: ``useMemo callback @ 607``

.. code-block:: javascript

   useMemo callback @ 607()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``607``—``609`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getVisitedKey(visitedIds)``。

**主要协作调用**：``getVisitedKey``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22272:22632:FUNCTION

.. rubric:: ``useMemo callback @ 611``

.. code-block:: javascript

   useMemo callback @ 611()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``611``—``625`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createComponents({ contextId, conversationId, replacementRef, depth, maxDepth, visitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest, renderSurface, })``。

**主要协作调用**：``createComponents``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22939:23162:FUNCTION

.. rubric:: ``useMemo callback @ 639``

.. code-block:: javascript

   useMemo callback @ 639()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``639``—``647`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23226:23343:FUNCTION

.. rubric:: ``useMemo callback @ 649``

.. code-block:: javascript

   useMemo callback @ 649()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``649``—``653`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolveMarkdownCopyContent(content, replacement, { maxDepth, })``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23397:24301:FUNCTION

.. rubric:: ``useEffect callback @ 655``

.. code-block:: javascript

   useEffect callback @ 655()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``655``—``683`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23804:24293:FUNCTION

.. rubric:: ``returned callback @ 668``

.. code-block:: javascript

   returned callback @ 668()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``668``—``682`` 行；所属函数 ``useEffect callback @ 655``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24602:25095:FUNCTION

.. rubric:: ``urlTransform callback @ 690``

.. code-block:: javascript

   urlTransform callback @ 690(uri, key, node)

实现 ``urlTransform`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``690``—``698`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``resourceBaseUrl + relative.split('/').map(encodeURIComponent).join('/')``、``safe``。

**主要协作调用**：``allowCustomScheme``、``safe?.startsWith``、``safe.slice``、``relative.split('/').some``、``relative.split``、``relative.split('/').map(encodeURIComponent).join``、``relative.split('/').map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24878:24917:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 694``

.. code-block:: javascript

   relative.split('/').some callback @ 694(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``694``—``694`` 行；所属函数 ``urlTransform callback @ 690``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25508:26229:FUNCTION

.. rubric:: ``memo callback @ 716``

.. code-block:: javascript

   memo callback @ 716(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``716``—``732`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.contextId === next.contextId && prev.content === next.content && prev.replacement === next.replacement && prev.depth === ne…``。

**主要协作调用**：``areVisitedIdsEqual``。
