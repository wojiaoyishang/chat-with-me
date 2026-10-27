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
* **顶层函数/组件/Hook**：17
* **类**：0
* **局部函数与匿名回调**：51

主要依赖
--------------------------------------------------------------------------------

``react``、``react-markdown``、``remark-gfm``、``remark-math``、``remark-directive``、``rehype-katex``、``./remarkDirectiveToComponent.js``、``./remarkCollapseExecutionStatuses.js``、``./remarkCwmLinks.js``、``./remarkVideoDirective.js``、``./remarkStudyDirectives.js``、``./rehypeDocumentTasks.js``、``./DocumentTaskControls.jsx``、``./StudyVisuals.jsx``、``./documentCardSpec.js``、``./CodeBlock.jsx``、``./MarkdownContent.css``、``./card-block/CardBlock.jsx``、``@/features/execution/ExecutionStatusGroup.jsx``、``./card-block/agent/agentContent.js``、``@/features/chat/speech/frontendFeedback.js``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``../../runtime/backend/connection.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``./ResourceVideo.jsx``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2620:2770:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``56`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``visitedIds.join('>')``。

   **主要协作调用**：``Array.isArray``、``visitedIds.join``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2800:3039:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``63`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3069:3321:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``65``—``73`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3442:4127:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``77``—``94`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4152:4237:FUNCTION

.. js:function:: toSafeString(value)

   实现 ``toSafeString`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``96``—``98`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'string' ? value : String(value ?? '')``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4330:4417:FUNCTION

.. js:function:: normalizeCopyText(content)

   规范化与 ``Copy Text`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``102``—``104`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n')``。

   **主要协作调用**：``normalizeLineBreaks(content).replace``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4718:4869:FUNCTION

.. js:function:: stripCopyTypeMarker(content)

   实现 ``stripCopyTypeMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``122``—``125`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``parsed.hadMarker ? parsed.content : normalizeLineBreaks(content)``。

   **主要协作调用**：``parseReplacementProtocol``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4917:5906:FUNCTION

.. js:function:: extractCopyTextFromReplacementValue(value, seenObjects)

   提取与 ``Copy Text From Replacement Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``127``—``168`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``seenObjects`` （默认值 ``new WeakSet()``）
      调用方传入的 ``seenObjects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``value``、``String(value)``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join('\n')``。

   **主要协作调用**：``String``、``Array.isArray``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter``、``value .map``、``seenObjects.has``、``seenObjects.add``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5948:7818:FUNCTION

.. js:function:: normalizeReplacementCopyEntry(replacement, id, explicitType, inheritedSnapshot)

   规范化与 ``Replacement Copy Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``170``—``220`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7849:8094:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``222``—``232`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``String(attributes.type || '').trim() === 'replace'``。

   **主要协作调用**：``String(attributes.type || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8128:9698:FUNCTION

.. js:function:: replaceCopyDirectives(source, directiveRegex, replacement, options)

   替换与 ``Copy Directives`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``234``—``277`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9744:11032:FUNCTION

.. js:function:: resolveMarkdownCopyContent(content, replacement, options)

   解析并确定与 ``Markdown Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``279``—``319`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11086:11657:FUNCTION

.. js:function:: createMarkdownCopyContentComponent(copyContent)

   创建与 ``Markdown Copy Content Component`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``321``—``337`` 行。

   **参数**

   ``copyContent``
      调用方传入的 ``copyContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ content: safeCopyContent, copyContent: safeCopyContent, markdownContent: safeCopyContent, displayContent: safeCopyContent, text: safeCopyContent, getContent: () => safeCopyConte…``。

   **主要协作调用**：``toSafeString``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11850:12215:FUNCTION

.. js:function:: MarkdownCode({ className, children, isCodeBlock, ...props })

   渲染 ``MarkdownCode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``341``—``346`` 行。

   **参数**

   ``{ className, children, isCodeBlock, ...props }``
      调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<code className="cwm-md-inline-code" {...props}>{children}</code>``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

   **主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12244:25911:FUNCTION

.. js:function:: createComponents({ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…)

   创建与 ``Components`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``348``—``643`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…``
      调用方传入的 ``contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = ,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...(cardSpec ? { 'study-outline': StudyOutline, ...cardComponents } : {}), p: ({ children }) => <p className="my-2">{children}</p>, ul: ({ children, className }) => <ul classNam…``。

   **主要协作调用**：``Object.fromEntries``、``cardSpec.directives.map``。

   **内部回调数量**：23。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25912:32231:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, extraRehypePlugins = [], contextId = '', conversationId = null, content,…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``645``—``807`` 行。

   **参数**

   ``{ resourceBaseUrl = null, extraRehypePlugins = [], contextId = '', conversationId = null, content,…``
      调用方传入的 ``resourceBaseUrl = null, extraRehypePlugins = , contextId = '', conversationId = null, content,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>``、``documentSurface ? ( <div className="cwm-document-card-surface"> {cardsError && !cardSpec && hasCardSource && <p role="status">卡片样式暂不可用，以下显示 Markdown 原文。</p>} {markdown} </div> ) :…``。

   **主要协作调用**：``useId``、``useDocumentCardSpec``、``useRef``、``Boolean``、``useMemo``、``useEffect``、``/(?:^|\n)\s*:{3,}study-[a-z-]+(?=[\s{])/.test``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:32261:32506:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``809``—``818`` 行。

   **参数**

   ``prev`` （默认值 ``[]``）
      状态更新函数接收到的前一状态。

   ``next`` （默认值 ``[]``）
      调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3836:3956:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 87``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 87(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``89`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5266:5330:FUNCTION

.. rubric:: ``value .map callback @ 142``

.. code-block:: javascript

   value .map callback @ 142(item)

作为 ``value .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``extractCopyTextFromReplacementValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extractCopyTextFromReplacementValue``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8326:9693:FUNCTION

.. rubric:: ``source.replace callback @ 239``

.. code-block:: javascript

   source.replace callback @ 239(_match, directiveName, rawAttributes)

实现 ``source.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``239``—``276`` 行；所属函数 ``replaceCopyDirectives``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11389:11411:FUNCTION

.. rubric:: ``getContent``

.. code-block:: javascript

   getContent()

读取与 ``Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11437:11459:FUNCTION

.. rubric:: ``getCopyContent``

.. code-block:: javascript

   getCopyContent()

读取与 ``Copy Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``331``—``331`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11489:11511:FUNCTION

.. rubric:: ``getMarkdownContent``

.. code-block:: javascript

   getMarkdownContent()

读取与 ``Markdown Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11540:11562:FUNCTION

.. rubric:: ``getDisplayContent``

.. code-block:: javascript

   getDisplayContent()

读取与 ``Display Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``333``—``333`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11581:11603:FUNCTION

.. rubric:: ``getText``

.. code-block:: javascript

   getText()

读取与 ``Text`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11623:11645:FUNCTION

.. rubric:: ``toString``

.. code-block:: javascript

   toString()

实现 ``toString`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``335``—``335`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12670:12732:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``365``—``367`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacementRef?.current || {}``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12769:13487:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``369``—``386`` 行；所属函数 ``createComponents``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra`` （默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRendererInner contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDe…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13573:13842:FUNCTION

.. rubric:: ``cardSpec.directives.map callback @ 388``

.. code-block:: javascript

   cardSpec.directives.map callback @ 388({ name, kind })

作为 ``cardSpec.directives.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``393`` 行；所属函数 ``createComponents``。

**参数**

``{ name, kind }``
   调用方传入的 ``name, kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13703:13834:FUNCTION

.. rubric:: ``anonymous callback @ 392``

.. code-block:: javascript

   anonymous callback @ 392(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``392``—``392`` 行；所属函数 ``cardSpec.directives.map callback @ 388``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13962:14015:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``397``—``397`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14031:14213:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children, className })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``399``—``399`` 行；所属函数 ``createComponents``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14229:14414:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children, className })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``401``—``401`` 行；所属函数 ``createComponents``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14430:14715:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children, className, node })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``403``—``407`` 行；所属函数 ``createComponents``。

**参数**

``{ children, className, node }``
   调用方传入的 ``children, className, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<li className="my-1">{children}</li>``、``<DocumentTaskListItem className={className} node={node}>{children}</DocumentTaskListItem>``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14798:14896:FUNCTION

.. rubric:: ``input``

.. code-block:: javascript

   input(props)

实现 ``input`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``409``—``409`` 行；所属函数 ``createComponents``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14933:15053:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``412``—``414`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15069:15167:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``416``—``416`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15183:15279:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15295:15332:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``420``—``420`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15355:15460:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``422``—``424`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15475:16665:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``426``—``452`` 行；所属函数 ``createComponents``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-primary underline-offset-4 hover:underline" onClick=…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15949:16179:FUNCTION

.. rubric:: ``anonymous callback @ 436``

.. code-block:: javascript

   anonymous callback @ 436(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``436``—``440`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16271:16499:FUNCTION

.. rubric:: ``anonymous callback @ 442``

.. code-block:: javascript

   anonymous callback @ 442(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``442``—``445`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16425:16462:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 444``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 444(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``444``—``444`` 行；所属函数 ``anonymous callback @ 442``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16715:16948:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``456``—``460`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16965:17009:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``461``—``461`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17026:17070:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``462``—``462`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17084:17122:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``463``—``463`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17136:17195:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children, style })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``464``—``464`` 行；所属函数 ``createComponents``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17209:17268:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children, style })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``465``—``465`` 行；所属函数 ``createComponents``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17285:17483:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, className, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``467``—``469`` 行；所属函数 ``createComponents``。

**参数**

``{ src, alt, className, ...props }``
   调用方传入的 ``src, alt, className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} galleryId={contextId} className={\x60cwm-md-image ${className || ''}\x60} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17502:17588:FUNCTION

.. rubric:: ``video``

.. code-block:: javascript

   video({ src, title, poster })

实现 ``video`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``471``—``471`` 行；所属函数 ``createComponents``。

**参数**

``{ src, title, poster }``
   调用方传入的 ``src, title, poster`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17616:25899:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``473``—``641`` 行；所属函数 ``createComponents``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" snapshot={snapshot} type={tokenType} content="" contextId={contextId} conversationId={conversat…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId…``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 嵌套过深，id: ${finalId}\x60} contextId={…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``、``JSON.parse``、``Array.isArray``、``parsed.filter``、``groupedIds.map((groupedId) => { // The grouping plugin already verified each token's status // type. Persisted replacem…``、``groupedIds.map``、``continuationEntry.content.trim``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18622:18896:FUNCTION

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20042:20316:FUNCTION

.. rubric:: ``renderMarkdown callback @ 527``

.. code-block:: javascript

   renderMarkdown callback @ 527(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``527``—``532`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21288:21562:FUNCTION

.. rubric:: ``renderMarkdown callback @ 555``

.. code-block:: javascript

   renderMarkdown callback @ 555(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``555``—``560`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22324:22360:FUNCTION

.. rubric:: ``parsed.filter callback @ 579``

.. code-block:: javascript

   parsed.filter callback @ 579(value)

作为 ``parsed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``579``—``579`` 行；所属函数 ``card-replace``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22612:23210:FUNCTION

.. rubric:: ``groupedIds.map callback @ 584``

.. code-block:: javascript

   groupedIds.map callback @ 584(groupedId)

作为 ``groupedIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``584``—``592`` 行；所属函数 ``card-replace``。

**参数**

``groupedId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``entry.exists && !entry.snapshot && entry.type === 'executionStatus' ? {id: groupedId, content: entry.content} : null``。

**主要协作调用**：``normalizeReplacementEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25495:25822:FUNCTION

.. rubric:: ``renderMarkdown callback @ 631``

.. code-block:: javascript

   renderMarkdown callback @ 631(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``631``—``637`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, snapshot: cardSnapshot, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27706:27763:FUNCTION

.. rubric:: ``useMemo callback @ 680``

.. code-block:: javascript

   useMemo callback @ 680()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``680``—``682`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getVisitedKey(visitedIds)``。

**主要协作调用**：``getVisitedKey``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27814:28294:FUNCTION

.. rubric:: ``useMemo callback @ 684``

.. code-block:: javascript

   useMemo callback @ 684()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``684``—``702`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createComponents({ contextId, conversationId, replacementRef, depth, maxDepth, visitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest, renderSurface, snaps…``。

**主要协作调用**：``createComponents``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:28690:28913:FUNCTION

.. rubric:: ``useMemo callback @ 720``

.. code-block:: javascript

   useMemo callback @ 720()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``720``—``728`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:28977:29094:FUNCTION

.. rubric:: ``useMemo callback @ 730``

.. code-block:: javascript

   useMemo callback @ 730()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``730``—``734`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolveMarkdownCopyContent(content, replacement, { maxDepth, })``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:29148:30052:FUNCTION

.. rubric:: ``useEffect callback @ 736``

.. code-block:: javascript

   useEffect callback @ 736()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``736``—``764`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:29555:30044:FUNCTION

.. rubric:: ``returned callback @ 749``

.. code-block:: javascript

   returned callback @ 749()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``749``—``763`` 行；所属函数 ``useEffect callback @ 736``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:31360:31899:FUNCTION

.. rubric:: ``urlTransform callback @ 788``

.. code-block:: javascript

   urlTransform callback @ 788(uri, key, node)

实现 ``urlTransform`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``788``—``796`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``authorizedResourceUrl(resourceBaseUrl + relative.split('/').map(encodeURIComponent).join('/'))``、``authorizedResourceUrl(safe)``。

**主要协作调用**：``allowCustomScheme``、``safe?.startsWith``、``safe.slice``、``relative.split('/').some``、``relative.split``、``authorizedResourceUrl``、``relative.split('/').map(encodeURIComponent).join``、``relative.split('/').map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:31636:31675:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 792``

.. code-block:: javascript

   relative.split('/').some callback @ 792(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``792``—``792`` 行；所属函数 ``urlTransform callback @ 788``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:32563:33444:FUNCTION

.. rubric:: ``memo callback @ 820``

.. code-block:: javascript

   memo callback @ 820(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``820``—``839`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.extraRehypePlugins === next.extraRehypePlugins && prev.contextId === next.contextId && prev.content === next.content && pre…``。

**主要协作调用**：``areVisitedIdsEqual``。
