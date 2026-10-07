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

``react``、``react-markdown``、``remark-gfm``、``remark-math``、``rehype-katex``、``./remarkDirectiveToComponent.js``、``./CodeBlock.jsx``、``./card-block/CardBlock.jsx``、``./card-block/agent/agentContent.js``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``sonner``、``@/components/modal/universalModal.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:1631:1775:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``42`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``visitedIds.join('>')``。

   **主要协作调用**：``Array.isArray``、``visitedIds.join``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:1803:2037:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``49`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2065:2309:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``59`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2426:3094:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``63``—``80`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3117:3200:FUNCTION

.. js:function:: toSafeString(value)

   实现 ``toSafeString`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``82``—``84`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'string' ? value : String(value ?? '')``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3289:3374:FUNCTION

.. js:function:: normalizeCopyText(content)

   规范化与 ``Copy Text`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``90`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n')``。

   **主要协作调用**：``normalizeLineBreaks(content).replace``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3657:3805:FUNCTION

.. js:function:: stripCopyTypeMarker(content)

   实现 ``stripCopyTypeMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``108``—``111`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``parsed.hadMarker ? parsed.content : normalizeLineBreaks(content)``。

   **主要协作调用**：``parseReplacementProtocol``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3851:4799:FUNCTION

.. js:function:: extractCopyTextFromReplacementValue(value, seenObjects)

   提取与 ``Copy Text From Replacement Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``113``—``154`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``seenObjects``（默认值 ``new WeakSet()``）
      调用方传入的 ``seenObjects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``value``、``String(value)``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join('\n')``。

   **主要协作调用**：``String``、``Array.isArray``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter``、``value .map``、``seenObjects.has``、``seenObjects.add``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4839:6411:FUNCTION

.. js:function:: normalizeReplacementCopyEntry(replacement, id, explicitType)

   规范化与 ``Replacement Copy Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``156``—``203`` 行。

   **参数**

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``explicitType``
      调用方传入的 ``explicitType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ exists: false, id: normalizedId, content: '', }``、``{ exists: true, id: normalizedId, content: '', }``、``{ exists: true, id: normalizedId, content: String(explicitType || entry?.type || protocol.type || '').toLowerCase() === 'agent' ? parseAgentContent(stripCopyTypeMarker(rawCopyCont…``。

   **主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``、``parseReplacementProtocol``、``['taskwindowtool', 'workspacetransfer', 'executionstatus'].includes``、``String(explicitType || entry?.type || protocol.type || '').toLowerCase``、``parseAgentContent``、``stripCopyTypeMarker``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6440:6675:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``205``—``215`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``String(attributes.type || '').trim() === 'replace'``。

   **主要协作调用**：``String(attributes.type || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6707:8171:FUNCTION

.. js:function:: replaceCopyDirectives(source, directiveRegex, replacement, options)

   替换与 ``Copy Directives`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``217``—``259`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8215:9363:FUNCTION

.. js:function:: resolveMarkdownCopyContent(content, replacement, options)

   解析并确定与 ``Markdown Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``261``—``300`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9415:9970:FUNCTION

.. js:function:: createMarkdownCopyContentComponent(copyContent)

   创建与 ``Markdown Copy Content Component`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``302``—``318`` 行。

   **参数**

   ``copyContent``
      调用方传入的 ``copyContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ content: safeCopyContent, copyContent: safeCopyContent, markdownContent: safeCopyContent, displayContent: safeCopyContent, text: safeCopyContent, getContent: () => safeCopyConte…``。

   **主要协作调用**：``toSafeString``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9997:20672:FUNCTION

.. js:function:: createComponents({ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…)

   创建与 ``Components`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``320``—``585`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…``
      调用方传入的 ``contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = ,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ p: ({ children }) => <p className="my-2">{children}</p>, ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>, ol: ({ children }) => <ol className="list-dec…``。

   **内部回调数量**：21。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20673:24770:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, contextId = '', conversationId = null, content, replacement = {}, depth =…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``587``—``709`` 行。

   **参数**

   ``{ resourceBaseUrl = null, contextId = '', conversationId = null, content, replacement = {}, depth =…``
      调用方传入的 ``resourceBaseUrl = null, contextId = '', conversationId = null, content, replacement = , depth =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath, remarkCardReplace, rehypeInlineCodeProperty]} rehypePlugins={[rehypeKatex]} components={components} urlTransform={(uri, key…``。

   **主要协作调用**：``useRef``、``Boolean``、``useMemo``、``useEffect``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24798:25034:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``711``—``720`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2810:2928:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 73``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 73(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``75`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4185:4249:FUNCTION

.. rubric:: ``value .map callback @ 128``

.. code-block:: javascript

   value .map callback @ 128(item)

作为 ``value .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``extractCopyTextFromReplacementValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extractCopyTextFromReplacementValue``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6890:8167:FUNCTION

.. rubric:: ``source.replace callback @ 222``

.. code-block:: javascript

   source.replace callback @ 222(_match, directiveName, rawAttributes)

实现 ``source.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``222``—``258`` 行；所属函数 ``replaceCopyDirectives``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9709:9731:FUNCTION

.. rubric:: ``getContent``

.. code-block:: javascript

   getContent()

读取与 ``Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9756:9778:FUNCTION

.. rubric:: ``getCopyContent``

.. code-block:: javascript

   getCopyContent()

读取与 ``Copy Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9807:9829:FUNCTION

.. rubric:: ``getMarkdownContent``

.. code-block:: javascript

   getMarkdownContent()

读取与 ``Markdown Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9857:9879:FUNCTION

.. rubric:: ``getDisplayContent``

.. code-block:: javascript

   getDisplayContent()

读取与 ``Display Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9897:9919:FUNCTION

.. rubric:: ``getText``

.. code-block:: javascript

   getText()

读取与 ``Text`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9938:9960:FUNCTION

.. rubric:: ``toString``

.. code-block:: javascript

   toString()

实现 ``toString`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``316``—``316`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10314:10374:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``333``—``335`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacementRef?.current || {}``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10409:11047:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``337``—``353`` 行；所属函数 ``createComponents``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra``（默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRendererInner contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDe…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11073:11126:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11140:11210:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11224:11297:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``360``—``360`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11311:11366:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``362``—``362`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11380:11527:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``364``—``366`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11541:11637:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``368``—``368`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11651:11745:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``370``—``370`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11759:11814:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``372``—``372`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11836:11984:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``374``—``376`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11997:13143:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``378``—``404`` 行；所属函数 ``createComponents``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-blue-600 hover:underline" onClick={ modalLink ? (eve…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12443:12669:FUNCTION

.. rubric:: ``anonymous callback @ 388``

.. code-block:: javascript

   anonymous callback @ 388(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``388``—``392`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12759:12984:FUNCTION

.. rubric:: ``anonymous callback @ 394``

.. code-block:: javascript

   anonymous callback @ 394(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``394``—``397`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12911:12948:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 396``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 396(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``396``—``396`` 行；所属函数 ``anonymous callback @ 394``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13144:13722:FUNCTION

.. rubric:: ``code``

.. code-block:: javascript

   code({ className, children, isCodeBlock, ...props })

实现 ``code`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``406``—``419`` 行；所属函数 ``createComponents``。

**参数**

``{ className, children, isCodeBlock, ...props }``
   调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <code className="bg-gray-100 px-1 py-0.5 rounded-md text-xs font-mono text-gray-800" {...props}> {children} </code> )``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

**主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13739:13995:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``421``—``425`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14012:14079:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``427``—``427`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14096:14186:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``429``—``429`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14200:14288:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``431``—``431`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14302:14509:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``433``—``437`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14523:14662:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``439``—``441`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14677:14796:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``443``—``445`` 行；所属函数 ``createComponents``。

**参数**

``{ src, alt, ...props }``
   调用方传入的 ``src, alt, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14822:20662:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``447``—``583`` 行；所属函数 ``createComponents``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" type={tokenType} content="" contextId={contextId} conversationId={conversationId} replacement={…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId={contextId} convers…``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} type="error" content={\x60cardReplace 嵌套过深，id: ${finalId}\x60} contextId={contextId} conversat…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15760:16029:FUNCTION

.. rubric:: ``renderMarkdown callback @ 466``

.. code-block:: javascript

   renderMarkdown callback @ 466(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``466``—``471`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17098:17367:FUNCTION

.. rubric:: ``renderMarkdown callback @ 499``

.. code-block:: javascript

   renderMarkdown callback @ 499(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``499``—``504`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18268:18537:FUNCTION

.. rubric:: ``renderMarkdown callback @ 526``

.. code-block:: javascript

   renderMarkdown callback @ 526(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``526``—``531`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20325:20590:FUNCTION

.. rubric:: ``renderMarkdown callback @ 574``

.. code-block:: javascript

   renderMarkdown callback @ 574(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``574``—``579`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21854:21909:FUNCTION

.. rubric:: ``useMemo callback @ 613``

.. code-block:: javascript

   useMemo callback @ 613()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``613``—``615`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getVisitedKey(visitedIds)``。

**主要协作调用**：``getVisitedKey``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21958:22304:FUNCTION

.. rubric:: ``useMemo callback @ 617``

.. code-block:: javascript

   useMemo callback @ 617()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``617``—``631`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createComponents({ contextId, conversationId, replacementRef, depth, maxDepth, visitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest, renderSurface, })``。

**主要协作调用**：``createComponents``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22597:22812:FUNCTION

.. rubric:: ``useMemo callback @ 645``

.. code-block:: javascript

   useMemo callback @ 645()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``645``—``653`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22874:22987:FUNCTION

.. rubric:: ``useMemo callback @ 655``

.. code-block:: javascript

   useMemo callback @ 655()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``655``—``659`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolveMarkdownCopyContent(content, replacement, { maxDepth, })``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23039:23915:FUNCTION

.. rubric:: ``useEffect callback @ 661``

.. code-block:: javascript

   useEffect callback @ 661()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``661``—``689`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23433:23908:FUNCTION

.. rubric:: ``returned callback @ 674``

.. code-block:: javascript

   returned callback @ 674()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``674``—``688`` 行；所属函数 ``useEffect callback @ 661``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24209:24694:FUNCTION

.. rubric:: ``urlTransform callback @ 696``

.. code-block:: javascript

   urlTransform callback @ 696(uri, key, node)

实现 ``urlTransform`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``696``—``704`` 行；所属函数 ``MarkdownRendererInner``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24481:24520:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 700``

.. code-block:: javascript

   relative.split('/').some callback @ 700(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``700``—``700`` 行；所属函数 ``urlTransform callback @ 696``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25089:25794:FUNCTION

.. rubric:: ``memo callback @ 722``

.. code-block:: javascript

   memo callback @ 722(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``722``—``738`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.contextId === next.contextId && prev.content === next.content && prev.replacement === next.replacement && prev.depth === ne…``。

**主要协作调用**：``areVisitedIdsEqual``。
