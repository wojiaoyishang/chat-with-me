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

``react``、``react-markdown``、``remark-gfm``、``remark-math``、``remark-directive``、``rehype-katex``、``./remarkDirectiveToComponent.js``、``./remarkCollapseExecutionStatuses.js``、``./remarkCwmLinks.js``、``./remarkVideoDirective.js``、``./remarkStudyDirectives.js``、``./rehypeDocumentTasks.js``、``./DocumentTaskControls.jsx``、``./StudyVisuals.jsx``、``./documentCardSpec.js``、``./CodeBlock.jsx``、``./MarkdownContent.css``、``./card-block/CardBlock.jsx``、``@/features/execution/ExecutionStatusGroup.jsx``、``./card-block/agent/agentContent.js``、``@/features/chat/speech/frontendFeedback.js``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``./ResourceVideo.jsx``、``sonner``、``@/components/modal/universalModal.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2542:2692:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``55`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``visitedIds.join('>')``。

   **主要协作调用**：``Array.isArray``、``visitedIds.join``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2722:2961:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``62`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2991:3243:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``72`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3364:4049:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``93`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4074:4159:FUNCTION

.. js:function:: toSafeString(value)

   实现 ``toSafeString`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``97`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'string' ? value : String(value ?? '')``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4252:4339:FUNCTION

.. js:function:: normalizeCopyText(content)

   规范化与 ``Copy Text`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``101``—``103`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n')``。

   **主要协作调用**：``normalizeLineBreaks(content).replace``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4640:4791:FUNCTION

.. js:function:: stripCopyTypeMarker(content)

   实现 ``stripCopyTypeMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``121``—``124`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``parsed.hadMarker ? parsed.content : normalizeLineBreaks(content)``。

   **主要协作调用**：``parseReplacementProtocol``、``normalizeLineBreaks``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4839:5828:FUNCTION

.. js:function:: extractCopyTextFromReplacementValue(value, seenObjects)

   提取与 ``Copy Text From Replacement Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``126``—``167`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``seenObjects`` （默认值 ``new WeakSet()``）
      调用方传入的 ``seenObjects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``value``、``String(value)``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join('\n')``。

   **主要协作调用**：``String``、``Array.isArray``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter(Boolean) .join``、``value .map((item) => extractCopyTextFromReplacementValue(item, seenObjects)) .filter``、``value .map``、``seenObjects.has``、``seenObjects.add``、``Object.prototype.hasOwnProperty.call``、``extractCopyTextFromReplacementValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5870:7740:FUNCTION

.. js:function:: normalizeReplacementCopyEntry(replacement, id, explicitType, inheritedSnapshot)

   规范化与 ``Replacement Copy Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``169``—``219`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7771:8016:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``221``—``231`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``String(attributes.type || '').trim() === 'replace'``。

   **主要协作调用**：``String(attributes.type || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8050:9620:FUNCTION

.. js:function:: replaceCopyDirectives(source, directiveRegex, replacement, options)

   替换与 ``Copy Directives`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``233``—``276`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9666:10954:FUNCTION

.. js:function:: resolveMarkdownCopyContent(content, replacement, options)

   解析并确定与 ``Markdown Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``278``—``318`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11008:11579:FUNCTION

.. js:function:: createMarkdownCopyContentComponent(copyContent)

   创建与 ``Markdown Copy Content Component`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``320``—``336`` 行。

   **参数**

   ``copyContent``
      调用方传入的 ``copyContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ content: safeCopyContent, copyContent: safeCopyContent, markdownContent: safeCopyContent, displayContent: safeCopyContent, text: safeCopyContent, getContent: () => safeCopyConte…``。

   **主要协作调用**：``toSafeString``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11772:12137:FUNCTION

.. js:function:: MarkdownCode({ className, children, isCodeBlock, ...props })

   渲染 ``MarkdownCode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``340``—``345`` 行。

   **参数**

   ``{ className, children, isCodeBlock, ...props }``
      调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<code className="cwm-md-inline-code" {...props}>{children}</code>``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

   **主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12166:25833:FUNCTION

.. js:function:: createComponents({ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…)

   创建与 ``Components`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``347``—``642`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = [],…``
      调用方传入的 ``contextId = '', conversationId = null, replacementRef, depth = 0, maxDepth = 10, visitedIds = ,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...(cardSpec ? { 'study-outline': StudyOutline, ...cardComponents } : {}), p: ({ children }) => <p className="my-2">{children}</p>, ul: ({ children, className }) => <ul classNam…``。

   **主要协作调用**：``Object.fromEntries``、``cardSpec.directives.map``。

   **内部回调数量**：23。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25834:32107:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, extraRehypePlugins = [], contextId = '', conversationId = null, content,…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``644``—``806`` 行。

   **参数**

   ``{ resourceBaseUrl = null, extraRehypePlugins = [], contextId = '', conversationId = null, content,…``
      调用方传入的 ``resourceBaseUrl = null, extraRehypePlugins = , contextId = '', conversationId = null, content,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>``、``documentSurface ? ( <div className="cwm-document-card-surface"> {cardsError && !cardSpec && hasCardSource && <p role="status">卡片样式暂不可用，以下显示 Markdown 原文。</p>} {markdown} </div> ) :…``。

   **主要协作调用**：``useId``、``useDocumentCardSpec``、``useRef``、``Boolean``、``useMemo``、``useEffect``、``/(?:^|\n)\s*:{3,}study-[a-z-]+(?=[\s{])/.test``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:32137:32382:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``808``—``817`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3758:3878:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 86``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 86(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``88`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5188:5252:FUNCTION

.. rubric:: ``value .map callback @ 141``

.. code-block:: javascript

   value .map callback @ 141(item)

作为 ``value .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``extractCopyTextFromReplacementValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extractCopyTextFromReplacementValue``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8248:9615:FUNCTION

.. rubric:: ``source.replace callback @ 238``

.. code-block:: javascript

   source.replace callback @ 238(_match, directiveName, rawAttributes)

实现 ``source.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``275`` 行；所属函数 ``replaceCopyDirectives``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11311:11333:FUNCTION

.. rubric:: ``getContent``

.. code-block:: javascript

   getContent()

读取与 ``Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11359:11381:FUNCTION

.. rubric:: ``getCopyContent``

.. code-block:: javascript

   getCopyContent()

读取与 ``Copy Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11411:11433:FUNCTION

.. rubric:: ``getMarkdownContent``

.. code-block:: javascript

   getMarkdownContent()

读取与 ``Markdown Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``331``—``331`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11462:11484:FUNCTION

.. rubric:: ``getDisplayContent``

.. code-block:: javascript

   getDisplayContent()

读取与 ``Display Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11503:11525:FUNCTION

.. rubric:: ``getText``

.. code-block:: javascript

   getText()

读取与 ``Text`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``333``—``333`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11545:11567:FUNCTION

.. rubric:: ``toString``

.. code-block:: javascript

   toString()

实现 ``toString`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``createMarkdownCopyContentComponent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12592:12654:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``364``—``366`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacementRef?.current || {}``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12691:13409:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``368``—``385`` 行；所属函数 ``createComponents``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra`` （默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRendererInner contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDe…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13495:13764:FUNCTION

.. rubric:: ``cardSpec.directives.map callback @ 387``

.. code-block:: javascript

   cardSpec.directives.map callback @ 387({ name, kind })

作为 ``cardSpec.directives.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``387``—``392`` 行；所属函数 ``createComponents``。

**参数**

``{ name, kind }``
   调用方传入的 ``name, kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13625:13756:FUNCTION

.. rubric:: ``anonymous callback @ 391``

.. code-block:: javascript

   anonymous callback @ 391(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``391``—``391`` 行；所属函数 ``cardSpec.directives.map callback @ 387``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13884:13937:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``396``—``396`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13953:14135:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children, className })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``398``—``398`` 行；所属函数 ``createComponents``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14151:14336:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children, className })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``400``—``400`` 行；所属函数 ``createComponents``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14352:14637:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children, className, node })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``402``—``406`` 行；所属函数 ``createComponents``。

**参数**

``{ children, className, node }``
   调用方传入的 ``children, className, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<li className="my-1">{children}</li>``、``<DocumentTaskListItem className={className} node={node}>{children}</DocumentTaskListItem>``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14720:14818:FUNCTION

.. rubric:: ``input``

.. code-block:: javascript

   input(props)

实现 ``input`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``408``—``408`` 行；所属函数 ``createComponents``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14855:14975:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``411``—``413`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14991:15089:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``415``—``415`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15105:15201:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15217:15254:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``419``—``419`` 行；所属函数 ``createComponents``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15277:15382:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``421``—``423`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15397:16587:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``425``—``451`` 行；所属函数 ``createComponents``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-primary underline-offset-4 hover:underline" onClick=…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15871:16101:FUNCTION

.. rubric:: ``anonymous callback @ 435``

.. code-block:: javascript

   anonymous callback @ 435(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``435``—``439`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16193:16421:FUNCTION

.. rubric:: ``anonymous callback @ 441``

.. code-block:: javascript

   anonymous callback @ 441(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``441``—``444`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16347:16384:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 443``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 443(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``443``—``443`` 行；所属函数 ``anonymous callback @ 441``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16637:16870:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``455``—``459`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16887:16931:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``460``—``460`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16948:16992:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``461``—``461`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17006:17044:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``462``—``462`` 行；所属函数 ``createComponents``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17058:17117:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children, style })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``463``—``463`` 行；所属函数 ``createComponents``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17131:17190:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children, style })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``464``—``464`` 行；所属函数 ``createComponents``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17207:17405:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, className, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``466``—``468`` 行；所属函数 ``createComponents``。

**参数**

``{ src, alt, className, ...props }``
   调用方传入的 ``src, alt, className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} galleryId={contextId} className={\x60cwm-md-image ${className || ''}\x60} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17424:17510:FUNCTION

.. rubric:: ``video``

.. code-block:: javascript

   video({ src, title, poster })

实现 ``video`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``470``—``470`` 行；所属函数 ``createComponents``。

**参数**

``{ src, title, poster }``
   调用方传入的 ``src, title, poster`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17538:25821:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``472``—``640`` 行；所属函数 ``createComponents``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" snapshot={snapshot} type={tokenType} content="" contextId={contextId} conversationId={conversat…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId…``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 嵌套过深，id: ${finalId}\x60} contextId={…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``、``JSON.parse``、``Array.isArray``、``parsed.filter``、``groupedIds.map((groupedId) => { // The grouping plugin already verified each token's status // type. Persisted replacem…``、``groupedIds.map``、``continuationEntry.content.trim``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18544:18818:FUNCTION

.. rubric:: ``renderMarkdown callback @ 492``

.. code-block:: javascript

   renderMarkdown callback @ 492(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``492``—``497`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:19964:20238:FUNCTION

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21210:21484:FUNCTION

.. rubric:: ``renderMarkdown callback @ 554``

.. code-block:: javascript

   renderMarkdown callback @ 554(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``554``—``559`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22246:22282:FUNCTION

.. rubric:: ``parsed.filter callback @ 578``

.. code-block:: javascript

   parsed.filter callback @ 578(value)

作为 ``parsed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``578``—``578`` 行；所属函数 ``card-replace``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22534:23132:FUNCTION

.. rubric:: ``groupedIds.map callback @ 583``

.. code-block:: javascript

   groupedIds.map callback @ 583(groupedId)

作为 ``groupedIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``583``—``591`` 行；所属函数 ``card-replace``。

**参数**

``groupedId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``entry.exists && !entry.snapshot && entry.type === 'executionStatus' ? {id: groupedId, content: entry.content} : null``。

**主要协作调用**：``normalizeReplacementEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25417:25744:FUNCTION

.. rubric:: ``renderMarkdown callback @ 630``

.. code-block:: javascript

   renderMarkdown callback @ 630(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``630``—``636`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, snapshot: cardSnapshot, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27628:27685:FUNCTION

.. rubric:: ``useMemo callback @ 679``

.. code-block:: javascript

   useMemo callback @ 679()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``679``—``681`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getVisitedKey(visitedIds)``。

**主要协作调用**：``getVisitedKey``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27736:28216:FUNCTION

.. rubric:: ``useMemo callback @ 683``

.. code-block:: javascript

   useMemo callback @ 683()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``683``—``701`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createComponents({ contextId, conversationId, replacementRef, depth, maxDepth, visitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest, renderSurface, snaps…``。

**主要协作调用**：``createComponents``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:28612:28835:FUNCTION

.. rubric:: ``useMemo callback @ 719``

.. code-block:: javascript

   useMemo callback @ 719()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``719``—``727`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:28899:29016:FUNCTION

.. rubric:: ``useMemo callback @ 729``

.. code-block:: javascript

   useMemo callback @ 729()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``729``—``733`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolveMarkdownCopyContent(content, replacement, { maxDepth, })``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:29070:29974:FUNCTION

.. rubric:: ``useEffect callback @ 735``

.. code-block:: javascript

   useEffect callback @ 735()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``735``—``763`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:29477:29966:FUNCTION

.. rubric:: ``returned callback @ 748``

.. code-block:: javascript

   returned callback @ 748()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``748``—``762`` 行；所属函数 ``useEffect callback @ 735``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:31282:31775:FUNCTION

.. rubric:: ``urlTransform callback @ 787``

.. code-block:: javascript

   urlTransform callback @ 787(uri, key, node)

实现 ``urlTransform`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``787``—``795`` 行；所属函数 ``MarkdownRendererInner``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:31558:31597:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 791``

.. code-block:: javascript

   relative.split('/').some callback @ 791(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``791``—``791`` 行；所属函数 ``urlTransform callback @ 787``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:32439:33320:FUNCTION

.. rubric:: ``memo callback @ 819``

.. code-block:: javascript

   memo callback @ 819(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``819``—``838`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.extraRehypePlugins === next.extraRehypePlugins && prev.contextId === next.contextId && prev.content === next.content && pre…``。

**主要协作调用**：``areVisitedIdsEqual``。
