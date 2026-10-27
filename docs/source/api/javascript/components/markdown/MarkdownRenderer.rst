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
* **顶层函数/组件/Hook**：9
* **类**：0
* **局部函数与匿名回调**：54

主要依赖
--------------------------------------------------------------------------------

``react``、``react-markdown``、``remark-gfm``、``remark-math``、``remark-directive``、``rehype-katex``、``./remarkDirectiveToComponent.js``、``./remarkCollapseExecutionStatuses.js``、``./remarkCwmLinks.js``、``./remarkVideoDirective.js``、``./remarkStudyDirectives.js``、``./rehypeDocumentTasks.js``、``./DocumentTaskControls.jsx``、``./StudyVisuals.jsx``、``./documentCardSpec.js``、``./CodeBlock.jsx``、``./MarkdownContent.css``、``./card-block/CardBlock.jsx``、``@/features/execution/ExecutionStatusGroup.jsx``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``../../runtime/backend/connection.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``./ResourceVideo.jsx``、``./markdownCopy.js``、``./replacementProjection.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2193:2343:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``48`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(visitedIds)``。

   **主要协作调用**：``Array.isArray``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2371:2605:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``55`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2633:2877:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``65`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2994:3662:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``86`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3851:4211:FUNCTION

.. js:function:: MarkdownCode({ className, children, isCodeBlock, ...props })

   渲染 ``MarkdownCode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``95`` 行。

   **参数**

   ``{ className, children, isCodeBlock, ...props }``
      调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<code className="cwm-md-inline-code" {...props}>{children}</code>``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

   **主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4633:5022:FUNCTION

.. js:function:: getStableRendererHost(name)

   读取与 ``Stable Renderer Host`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``103``—``113`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``stableRendererHosts.get(name)``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``stableRendererHosts.has``、``stableRendererHosts.set``、``stableRendererHosts.get``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5055:18483:FUNCTION

.. js:function:: createElementRenderers({ contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = [], is…)

   创建与 ``Element Renderers`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``410`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = [], is…``
      调用方传入的 ``contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = , is…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...(cardSpec ? { 'study-outline': (props) => <StudyOutline {...props} />, ...cardComponents } : {}), p: ({ children }) => <p className="my-2">{children}</p>, ul: ({ children, cl…``。

   **主要协作调用**：``Object.fromEntries``、``cardSpec.directives.map``。

   **内部回调数量**：24。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20218:26276:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``440``—``592`` 行。

   **参数**

   ``{ resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…``
      调用方传入的 ``resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>``、``documentSurface ? ( <div className="cwm-document-card-surface"> {cardsError && !cardSpec && hasCardSource && <p role="status">卡片样式暂不可用，以下显示 Markdown 原文。</p>} {markdown} </div> ) :…``。

   **主要协作调用**：``useId``、``useDocumentCardSpec``、``useRef``、``useMemo``、``Boolean``、``getVisitedKey``、``Object.keys(elementRenderers).join``、``Object.keys``、``useEffect``、``/(?:^|\n)\s*:{3,}study-[a-z-]+(?=[\s{])/.test``、``executionGroupingKey``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26304:26540:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``594``—``603`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3378:3496:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 79``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 79(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``81`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4716:4862:FUNCTION

.. rubric:: ``RendererHost``

.. code-block:: javascript

   RendererHost(props)

实现 ``RendererHost`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``108`` 行；所属函数 ``getStableRendererHost``。

**参数**

``props``
   React 组件属性。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderers?.[name]?.(props) ?? null``。

**主要协作调用**：``useContext``、``renderers?.[name]``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5461:5503:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``132``—``134`` 行；所属函数 ``createElementRenderers``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5538:6234:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``136``—``153`` 行；所属函数 ``createElementRenderers``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra`` （默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRenderer contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDepth={…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6318:6634:FUNCTION

.. rubric:: ``cardSpec.directives.map callback @ 155``

.. code-block:: javascript

   cardSpec.directives.map callback @ 155({ name, kind })

作为 ``cardSpec.directives.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``155``—``160`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ name, kind }``
   调用方传入的 ``name, kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6382:6421:FUNCTION

.. rubric:: ``anonymous callback @ 157``

.. code-block:: javascript

   anonymous callback @ 157(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``cardSpec.directives.map callback @ 155``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6456:6495:FUNCTION

.. rubric:: ``anonymous callback @ 158``

.. code-block:: javascript

   anonymous callback @ 158(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``cardSpec.directives.map callback @ 155``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6497:6627:FUNCTION

.. rubric:: ``anonymous callback @ 159``

.. code-block:: javascript

   anonymous callback @ 159(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``159``—``159`` 行；所属函数 ``cardSpec.directives.map callback @ 155``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6698:6737:FUNCTION

.. rubric:: ``study-outline``

.. code-block:: javascript

   study-outline(props)

实现 ``study-outline`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``createElementRenderers``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6776:6829:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6843:7025:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children, className })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7039:7224:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children, className })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7238:7519:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children, className, node })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``170``—``174`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className, node }``
   调用方传入的 ``children, className, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<li className="my-1">{children}</li>``、``<DocumentTaskListItem className={className} node={node}>{children}</DocumentTaskListItem>``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7600:7698:FUNCTION

.. rubric:: ``input``

.. code-block:: javascript

   input(props)

实现 ``input`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``176``—``176`` 行；所属函数 ``createElementRenderers``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7732:7851:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``179``—``181`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7865:7963:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7977:8073:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``185``—``185`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8087:8124:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``createElementRenderers``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8146:8249:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``189``—``191`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8262:9426:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``193``—``219`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-primary underline-offset-4 hover:underline" onClick=…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8726:8952:FUNCTION

.. rubric:: ``anonymous callback @ 203``

.. code-block:: javascript

   anonymous callback @ 203(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``207`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9042:9267:FUNCTION

.. rubric:: ``anonymous callback @ 209``

.. code-block:: javascript

   anonymous callback @ 209(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``209``—``212`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9194:9231:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 211``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 211(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``anonymous callback @ 209``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9472:9701:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``223``—``227`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9717:9761:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9777:9821:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``229``—``229`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9834:9872:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``230``—``230`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9885:9944:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children, style })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9957:10016:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children, style })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10031:10229:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, className, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``236`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, alt, className, ...props }``
   调用方传入的 ``src, alt, className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} galleryId={contextId} className={\x60cwm-md-image ${className || ''}\x60} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10246:10332:FUNCTION

.. rubric:: ``video``

.. code-block:: javascript

   video({ src, title, poster })

实现 ``video`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, title, poster }``
   调用方传入的 ``src, title, poster`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10358:18473:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``240``—``408`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" snapshot={snapshot} type={tokenType} content="" contextId={contextId} conversationId={conversat…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId…``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 嵌套过深，id: ${finalId}\x60} contextId={…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``、``JSON.parse``、``Array.isArray``、``parsed.filter``、``groupedIds.map((groupedId) => { // The grouping plugin already verified each token's status // type. Persisted replacem…``、``groupedIds.map``、``continuationEntry.content.trim``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11344:11613:FUNCTION

.. rubric:: ``renderMarkdown callback @ 260``

.. code-block:: javascript

   renderMarkdown callback @ 260(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``260``—``265`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12730:12999:FUNCTION

.. rubric:: ``renderMarkdown callback @ 294``

.. code-block:: javascript

   renderMarkdown callback @ 294(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``294``—``299`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13948:14217:FUNCTION

.. rubric:: ``renderMarkdown callback @ 322``

.. code-block:: javascript

   renderMarkdown callback @ 322(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``322``—``327`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14960:14996:FUNCTION

.. rubric:: ``parsed.filter callback @ 346``

.. code-block:: javascript

   parsed.filter callback @ 346(value)

作为 ``parsed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``346``—``346`` 行；所属函数 ``card-replace``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15243:15833:FUNCTION

.. rubric:: ``groupedIds.map callback @ 351``

.. code-block:: javascript

   groupedIds.map callback @ 351(groupedId)

作为 ``groupedIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``351``—``359`` 行；所属函数 ``card-replace``。

**参数**

``groupedId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``entry.exists && !entry.snapshot && entry.type === 'executionStatus' ? {id: groupedId, content: entry.content} : null``。

**主要协作调用**：``normalizeReplacementEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18079:18400:FUNCTION

.. rubric:: ``renderMarkdown callback @ 398``

.. code-block:: javascript

   renderMarkdown callback @ 398(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``398``—``404`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, snapshot: cardSnapshot, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18675:20058:FUNCTION

.. rubric:: ``memo callback @ 414``

.. code-block:: javascript

   memo callback @ 414({ processedContent, replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, ca…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``414``—``435`` 行。

**参数**

``{ processedContent, replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, ca…``
   调用方传入的 ``processedContent, replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, ca…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:19516:20015:FUNCTION

.. rubric:: ``urlTransform callback @ 425``

.. code-block:: javascript

   urlTransform callback @ 425(uri, key, node)

实现 ``urlTransform`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``425``—``433`` 行；所属函数 ``memo callback @ 414``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:19772:19811:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 429``

.. code-block:: javascript

   relative.split('/').some callback @ 429(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``429``—``429`` 行；所属函数 ``urlTransform callback @ 425``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20059:20158:FUNCTION

.. rubric:: ``memo callback @ 435``

.. code-block:: javascript

   memo callback @ 435(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``435``—``435`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(next).every``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20100:20157:FUNCTION

.. rubric:: ``Object.keys(next).every callback @ 435``

.. code-block:: javascript

   Object.keys(next).every callback @ 435(key)

作为 ``Object.keys(next).every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``435``—``435`` 行；所属函数 ``memo callback @ 435``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21127:21315:FUNCTION

.. rubric:: ``useMemo callback @ 463``

.. code-block:: javascript

   useMemo callback @ 463()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``463``—``467`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``projected``。

**主要协作调用**：``projectReplacements``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22286:22332:FUNCTION

.. rubric:: ``useMemo callback @ 480``

.. code-block:: javascript

   useMemo callback @ 480()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``480``—``480`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.parse``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22387:22870:FUNCTION

.. rubric:: ``useMemo callback @ 482``

.. code-block:: javascript

   useMemo callback @ 482()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``482``—``500`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createElementRenderers({ contextId, conversationId, replacement, depth, maxDepth, visitedIds: stableVisitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest,…``。

**主要协作调用**：``createElementRenderers``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23312:23428:FUNCTION

.. rubric:: ``useMemo callback @ 519``

.. code-block:: javascript

   useMemo callback @ 519()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``519``—``521`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``rendererNames.split('|').map``、``rendererNames.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23375:23420:FUNCTION

.. rubric:: ``rendererNames.split('|').map callback @ 520``

.. code-block:: javascript

   rendererNames.split('|').map callback @ 520(name)

作为 ``rendererNames.split('|').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``520``—``520`` 行；所属函数 ``useMemo callback @ 519``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getStableRendererHost``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23486:23701:FUNCTION

.. rubric:: ``useMemo callback @ 523``

.. code-block:: javascript

   useMemo callback @ 523()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``523``—``531`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23763:23950:FUNCTION

.. rubric:: ``useMemo callback @ 533``

.. code-block:: javascript

   useMemo callback @ 533()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``533``—``539`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { resolved ??= resolveMarkdownCopyContent(content, replacement, { maxDepth }); return resolved; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23807:23943:FUNCTION

.. rubric:: ``returned callback @ 535``

.. code-block:: javascript

   returned callback @ 535()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``535``—``538`` 行；所属函数 ``useMemo callback @ 533``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolved``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24002:24878:FUNCTION

.. rubric:: ``useEffect callback @ 541``

.. code-block:: javascript

   useEffect callback @ 541()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``541``—``569`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24396:24871:FUNCTION

.. rubric:: ``returned callback @ 554``

.. code-block:: javascript

   returned callback @ 554()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``554``—``568`` 行；所属函数 ``useEffect callback @ 541``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26595:27512:FUNCTION

.. rubric:: ``memo callback @ 605``

.. code-block:: javascript

   memo callback @ 605(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``605``—``625`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.extraRehypePlugins === next.extraRehypePlugins && prev.contextId === next.contextId && prev.conversationId === next.convers…``。

**主要协作调用**：``areVisitedIdsEqual``。
