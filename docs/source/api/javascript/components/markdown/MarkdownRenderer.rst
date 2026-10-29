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
* **局部函数与匿名回调**：55

主要依赖
--------------------------------------------------------------------------------

``react``、``react-markdown``、``remark-gfm``、``remark-math``、``remark-directive``、``rehype-katex``、``./remarkDirectiveToComponent.js``、``./remarkCollapseExecutionStatuses.js``、``./remarkWorkProcess.js``、``@/features/execution/WorkProcessGroup.jsx``、``@/features/execution/workProcessModel.js``、``./remarkCwmLinks.js``、``./remarkVideoDirective.js``、``./remarkStudyDirectives.js``、``./rehypeDocumentTasks.js``、``./DocumentTaskControls.jsx``、``./StudyVisuals.jsx``、``./documentCardSpec.js``、``./CodeBlock.jsx``、``./MarkdownContent.css``、``./card-block/CardBlock.jsx``、``@/features/execution/ExecutionStatusGroup.jsx``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``../../runtime/backend/connection.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``./ResourceVideo.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2400:2550:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``51`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(visitedIds)``。

   **主要协作调用**：``Array.isArray``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2578:2812:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``58`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2840:3084:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``68`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3201:3869:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``89`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4058:4418:FUNCTION

.. js:function:: MarkdownCode({ className, children, isCodeBlock, ...props })

   渲染 ``MarkdownCode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``98`` 行。

   **参数**

   ``{ className, children, isCodeBlock, ...props }``
      调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<code className="cwm-md-inline-code" {...props}>{children}</code>``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

   **主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4840:5229:FUNCTION

.. js:function:: getStableRendererHost(name)

   读取与 ``Stable Renderer Host`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``106``—``116`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``stableRendererHosts.get(name)``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``stableRendererHosts.has``、``stableRendererHosts.set``、``stableRendererHosts.get``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5262:19598:FUNCTION

.. js:function:: createElementRenderers({ contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = [], is…)

   创建与 ``Element Renderers`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``425`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = [], is…``
      调用方传入的 ``contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = , is…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...(cardSpec ? { 'study-outline': (props) => <StudyOutline {...props} />, ...cardComponents } : {}), p: ({ children }) => <p className="my-2">{children}</p>, ul: ({ children, cl…``。

   **主要协作调用**：``Object.fromEntries``、``cardSpec.directives.map``。

   **内部回调数量**：24。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21400:27492:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``456``—``608`` 行。

   **参数**

   ``{ resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…``
      调用方传入的 ``resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>``、``documentSurface ? ( <div className="cwm-document-card-surface"> {cardsError && !cardSpec && hasCardSource && <p role="status">卡片样式暂不可用，以下显示 Markdown 原文。</p>} {markdown} </div> ) :…``。

   **主要协作调用**：``useId``、``useDocumentCardSpec``、``useRef``、``useMemo``、``Boolean``、``getVisitedKey``、``Object.keys(elementRenderers).join``、``Object.keys``、``useEffect``、``/(?:^|\n)\s*:{3,}study-[a-z-]+(?=[\s{])/.test``、``executionGroupingKey``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27520:27756:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``610``—``619`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3585:3703:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 82``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 82(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``82``—``84`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4923:5069:FUNCTION

.. rubric:: ``RendererHost``

.. code-block:: javascript

   RendererHost(props)

实现 ``RendererHost`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``111`` 行；所属函数 ``getStableRendererHost``。

**参数**

``props``
   React 组件属性。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderers?.[name]?.(props) ?? null``。

**主要协作调用**：``useContext``、``renderers?.[name]``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5668:5710:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``135``—``137`` 行；所属函数 ``createElementRenderers``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5745:6441:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``139``—``156`` 行；所属函数 ``createElementRenderers``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra`` （默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRenderer contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDepth={…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6525:6841:FUNCTION

.. rubric:: ``cardSpec.directives.map callback @ 158``

.. code-block:: javascript

   cardSpec.directives.map callback @ 158({ name, kind })

作为 ``cardSpec.directives.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``163`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ name, kind }``
   调用方传入的 ``name, kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6589:6628:FUNCTION

.. rubric:: ``anonymous callback @ 160``

.. code-block:: javascript

   anonymous callback @ 160(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``cardSpec.directives.map callback @ 158``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6663:6702:FUNCTION

.. rubric:: ``anonymous callback @ 161``

.. code-block:: javascript

   anonymous callback @ 161(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``cardSpec.directives.map callback @ 158``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6704:6834:FUNCTION

.. rubric:: ``anonymous callback @ 162``

.. code-block:: javascript

   anonymous callback @ 162(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``162``—``162`` 行；所属函数 ``cardSpec.directives.map callback @ 158``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6905:6944:FUNCTION

.. rubric:: ``study-outline``

.. code-block:: javascript

   study-outline(props)

实现 ``study-outline`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``createElementRenderers``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6983:7036:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7050:7232:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children, className })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7246:7431:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children, className })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``171``—``171`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7445:7726:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children, className, node })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``177`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className, node }``
   调用方传入的 ``children, className, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<li className="my-1">{children}</li>``、``<DocumentTaskListItem className={className} node={node}>{children}</DocumentTaskListItem>``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7807:7905:FUNCTION

.. rubric:: ``input``

.. code-block:: javascript

   input(props)

实现 ``input`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``createElementRenderers``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7939:8058:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``184`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8072:8170:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8184:8280:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8294:8331:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``createElementRenderers``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8353:8456:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``192``—``194`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8469:9633:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``222`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-primary underline-offset-4 hover:underline" onClick=…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8933:9159:FUNCTION

.. rubric:: ``anonymous callback @ 206``

.. code-block:: javascript

   anonymous callback @ 206(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``206``—``210`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9249:9474:FUNCTION

.. rubric:: ``anonymous callback @ 212``

.. code-block:: javascript

   anonymous callback @ 212(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``212``—``215`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9401:9438:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 214``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 214(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``anonymous callback @ 212``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9679:9908:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``226``—``230`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9924:9968:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9984:10028:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10041:10079:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``233``—``233`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10092:10151:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children, style })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10164:10223:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children, style })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10238:10436:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, className, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``237``—``239`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, alt, className, ...props }``
   调用方传入的 ``src, alt, className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} galleryId={contextId} className={\x60cwm-md-image ${className || ''}\x60} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10453:10539:FUNCTION

.. rubric:: ``video``

.. code-block:: javascript

   video({ src, title, poster })

实现 ``video`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``241`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, title, poster }``
   调用方传入的 ``src, title, poster`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10565:19588:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``243``—``423`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="block w-full clear-both" data-work-process-placeholder={finalId} aria-hidden="true" />``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" snapshot={snapshot} type={tokenType} content="" contextId={contextId} conversationId={conversat…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``、``JSON.parse``、``Array.isArray``、``items.map((item) => workProcessEntry(currentReplacement, item.id, item.type)).filter``、``items.map``、``parsed.filter``、``groupedIds.map((groupedId) => { // The grouping plugin already verified each token's status // type. Persisted replacem…``、``groupedIds.map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11762:12031:FUNCTION

.. rubric:: ``renderMarkdown callback @ 266``

.. code-block:: javascript

   renderMarkdown callback @ 266(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``266``—``271`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:13148:13417:FUNCTION

.. rubric:: ``renderMarkdown callback @ 300``

.. code-block:: javascript

   renderMarkdown callback @ 300(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``300``—``305`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14366:14635:FUNCTION

.. rubric:: ``renderMarkdown callback @ 328``

.. code-block:: javascript

   renderMarkdown callback @ 328(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``328``—``333`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15347:15433:FUNCTION

.. rubric:: ``items.map callback @ 352``

.. code-block:: javascript

   items.map callback @ 352(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``352``—``353`` 行；所属函数 ``card-replace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workProcessEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15787:15823:FUNCTION

.. rubric:: ``parsed.filter callback @ 358``

.. code-block:: javascript

   parsed.filter callback @ 358(value)

作为 ``parsed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``card-replace``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16070:16660:FUNCTION

.. rubric:: ``groupedIds.map callback @ 363``

.. code-block:: javascript

   groupedIds.map callback @ 363(groupedId)

作为 ``groupedIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``363``—``371`` 行；所属函数 ``card-replace``。

**参数**

``groupedId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``entry.exists && !entry.snapshot && entry.type === 'executionStatus' ? {id: groupedId, content: entry.content} : null``。

**主要协作调用**：``normalizeReplacementEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:19194:19515:FUNCTION

.. rubric:: ``renderMarkdown callback @ 413``

.. code-block:: javascript

   renderMarkdown callback @ 413(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``413``—``419`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, snapshot: cardSnapshot, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:19790:21240:FUNCTION

.. rubric:: ``memo callback @ 429``

.. code-block:: javascript

   memo callback @ 429({ processedContent, replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, ca…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``429``—``451`` 行。

**参数**

``{ processedContent, replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, ca…``
   调用方传入的 ``processedContent, replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, ca…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20698:21197:FUNCTION

.. rubric:: ``urlTransform callback @ 441``

.. code-block:: javascript

   urlTransform callback @ 441(uri, key, node)

实现 ``urlTransform`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``441``—``449`` 行；所属函数 ``memo callback @ 429``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:20954:20993:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 445``

.. code-block:: javascript

   relative.split('/').some callback @ 445(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``445``—``445`` 行；所属函数 ``urlTransform callback @ 441``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21241:21340:FUNCTION

.. rubric:: ``memo callback @ 451``

.. code-block:: javascript

   memo callback @ 451(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``451``—``451`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(next).every``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21282:21339:FUNCTION

.. rubric:: ``Object.keys(next).every callback @ 451``

.. code-block:: javascript

   Object.keys(next).every callback @ 451(key)

作为 ``Object.keys(next).every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``451``—``451`` 行；所属函数 ``memo callback @ 451``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22309:22497:FUNCTION

.. rubric:: ``useMemo callback @ 479``

.. code-block:: javascript

   useMemo callback @ 479()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``479``—``483`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``projected``。

**主要协作调用**：``projectReplacements``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23468:23514:FUNCTION

.. rubric:: ``useMemo callback @ 496``

.. code-block:: javascript

   useMemo callback @ 496()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``496``—``496`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.parse``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23569:24052:FUNCTION

.. rubric:: ``useMemo callback @ 498``

.. code-block:: javascript

   useMemo callback @ 498()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``498``—``516`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createElementRenderers({ contextId, conversationId, replacement, depth, maxDepth, visitedIds: stableVisitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest,…``。

**主要协作调用**：``createElementRenderers``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24494:24610:FUNCTION

.. rubric:: ``useMemo callback @ 535``

.. code-block:: javascript

   useMemo callback @ 535()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``535``—``537`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``rendererNames.split('|').map``、``rendererNames.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24557:24602:FUNCTION

.. rubric:: ``rendererNames.split('|').map callback @ 536``

.. code-block:: javascript

   rendererNames.split('|').map callback @ 536(name)

作为 ``rendererNames.split('|').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``536``—``536`` 行；所属函数 ``useMemo callback @ 535``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getStableRendererHost``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24668:24883:FUNCTION

.. rubric:: ``useMemo callback @ 539``

.. code-block:: javascript

   useMemo callback @ 539()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``539``—``547`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24945:25132:FUNCTION

.. rubric:: ``useMemo callback @ 549``

.. code-block:: javascript

   useMemo callback @ 549()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``549``—``555`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { resolved ??= resolveMarkdownCopyContent(content, replacement, { maxDepth }); return resolved; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24989:25125:FUNCTION

.. rubric:: ``returned callback @ 551``

.. code-block:: javascript

   returned callback @ 551()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``551``—``554`` 行；所属函数 ``useMemo callback @ 549``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolved``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25184:26060:FUNCTION

.. rubric:: ``useEffect callback @ 557``

.. code-block:: javascript

   useEffect callback @ 557()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``557``—``585`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25578:26053:FUNCTION

.. rubric:: ``returned callback @ 570``

.. code-block:: javascript

   returned callback @ 570()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``570``—``584`` 行；所属函数 ``useEffect callback @ 557``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27811:28728:FUNCTION

.. rubric:: ``memo callback @ 621``

.. code-block:: javascript

   memo callback @ 621(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``621``—``641`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.extraRehypePlugins === next.extraRehypePlugins && prev.contextId === next.contextId && prev.conversationId === next.convers…``。

**主要协作调用**：``areVisitedIdsEqual``。
