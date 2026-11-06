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
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：64

主要依赖
--------------------------------------------------------------------------------

``react``、``react-markdown``、``./MarkdownSyntax.jsx``、``@/features/execution/WorkProcessGroup.jsx``、``@/features/execution/workProcessModel.js``、``./DocumentTaskControls.jsx``、``./StudyVisuals.jsx``、``./documentCardSpec.js``、``./CodeBlock.jsx``、``./MarkdownContent.css``、``./card-block/CardBlock.jsx``、``@/features/execution/ExecutionStatusGroup.jsx``、``@/features/chat/ui/message/components/ReplacementContextBadge.jsx``、``./replacementProtocol.js``、``katex/dist/katex.min.css``、``@/lib/virtualUrl.js``、``../../runtime/backend/connection.js``、``@/lib/resourceDownload.js``、``./ResourceImage.jsx``、``./ResourceVideo.jsx``、``./ResourceAudio.jsx``、``./markdownCopy.js``、``./replacementProjection.js``、``./markdownNodeReuse.js``、``./StreamingText.jsx``、``./streamingTextContext.js``、``sonner``、``@/components/modal/universalModal.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2096:2252:FUNCTION

.. js:function:: getVisitedKey(visitedIds)

   读取与 ``Visited Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``45`` 行。

   **参数**

   ``visitedIds``
      调用方传入的 ``visitedIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(visitedIds)``。

   **主要协作调用**：``Array.isArray``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2282:2521:FUNCTION

.. js:function:: allowCustomScheme(uri, key, node)

   实现 ``allowCustomScheme`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``47``—``52`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2551:2803:FUNCTION

.. js:function:: preprocessContent(text)

   实现 ``preprocessContent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``62`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .replace(/\\\)/g, '$')``。

   **主要协作调用**：``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace(/\\\(/g, '$') .rep…``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace(/\\\]/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace(/\\\[/g, '$$$') .replace``、``normalizeCardReplaceBlockBoundaries(text) .replace``、``normalizeCardReplaceBlockBoundaries``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:2924:3609:FUNCTION

.. js:function:: stripDanglingStreamingCardToken(content)

   实现 ``stripDanglingStreamingCardToken`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``66``—``83`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``mayBeCardToken ? content.slice(0, tokenStart) : content``。

   **主要协作调用**：``content.lastIndexOf``、``content.slice``、``tokenTail.includes``、``tokenTail.slice(2).trimStart``、``tokenTail.slice``、``CARD_REPLACE_TOKEN_NAMES.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3802:4167:FUNCTION

.. js:function:: MarkdownCode({ className, children, isCodeBlock, ...props })

   渲染 ``MarkdownCode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``87``—``92`` 行。

   **参数**

   ``{ className, children, isCodeBlock, ...props }``
      调用方传入的 ``className, children, isCodeBlock, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<code className="cwm-md-inline-code" {...props}>{children}</code>``、``<CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />``。

   **主要协作调用**：``/\blanguage-([^\s]+)/.exec``、``String(children || '').replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4835:6289:FUNCTION

.. js:function:: CardRendererHost(props)

   渲染 ``CardRendererHost`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``102``—``123`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<MemoCardRenderer render={render} options={options} selection={selection} props={props} />``。

   **主要协作调用**：``useContext``、``useRef``、``String``、``JSON.parse``、``Array.isArray``、``roots.push``、``items.map``、``projectReplacementRefs``、``roots.filter``、``useMemo``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6361:6896:FUNCTION

.. js:function:: getStableRendererHost(name)

   读取与 ``Stable Renderer Host`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``136`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``stableRendererHosts.get(name)``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``stableRendererHosts.has``、``memo``、``stableRendererHosts.set``、``stableRendererHosts.get``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6931:22001:FUNCTION

.. js:function:: createElementRenderers({ contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = [], is…)

   创建与 ``Element Renderers`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``138``—``450`` 行。

   **参数**

   ``{ contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = [], is…``
      调用方传入的 ``contextId = '', conversationId = null, replacement, depth = 0, maxDepth = 10, visitedIds = , is…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ 'cwm-stream-text': ({children}) => <StreamingText text={String(children || '')} />, ...(cardSpec ? { 'study-outline': (props) => <StudyOutline {...props} />, ...cardComponents }…``。

   **主要协作调用**：``Object.fromEntries``、``cardSpec.directives.map``。

   **内部回调数量**：26。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22063:30170:FUNCTION

.. js:function:: MarkdownRendererInner({ resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…)

   渲染 ``MarkdownRendererInner`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``455``—``629`` 行。

   **参数**

   ``{ resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…``
      调用方传入的 ``resourceBaseUrl = null, extraRehypePlugins = EMPTY_PLUGINS, contextId = '', conversationId = null…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>``、``documentSurface ? ( <div className="cwm-document-card-surface"> {cardsError && !cardSpec && hasCardSource && <p role="status">卡片样式暂不可用，以下显示 Markdown 原文。</p>} {markdown} </div> ) :…``。

   **主要协作调用**：``useId``、``useCallback``、``useRef``、``String(content || '').startsWith``、``String``、``useMemo``、``useEffect``、``['document', 'document-preview', 'record'].includes``、``useDocumentCardSpec``、``Boolean``、``getVisitedKey``、``Object.keys(commonRenderers).join``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:30200:30445:FUNCTION

.. js:function:: areVisitedIdsEqual(prev, next)

   实现 ``areVisitedIdsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``631``—``640`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:3318:3438:FUNCTION

.. rubric:: ``CARD_REPLACE_TOKEN_NAMES.some callback @ 76``

.. code-block:: javascript

   CARD_REPLACE_TOKEN_NAMES.some callback @ 76(name)

作为 ``CARD_REPLACE_TOKEN_NAMES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``stripDanglingStreamingCardToken``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(\x60${name} \x60)``。

**主要协作调用**：``name.startsWith``、``tokenBody.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4619:4653:FUNCTION

.. rubric:: ``memo callback @ 100``

.. code-block:: javascript

   memo callback @ 100({render, props})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``100`` 行。

**参数**

``{render, props}``
   调用方传入的 ``render, props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``render``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:4654:4807:FUNCTION

.. rubric:: ``memo callback @ 100``

.. code-block:: javascript

   memo callback @ 100(previous, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``101`` 行。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sameMarkdownNodeProps``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5347:5443:FUNCTION

.. rubric:: ``items.map callback @ 110``

.. code-block:: javascript

   items.map callback @ 110(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``110``—``111`` 行；所属函数 ``CardRendererHost``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:5746:5764:FUNCTION

.. rubric:: ``roots.filter callback @ 116``

.. code-block:: javascript

   roots.filter callback @ 116(item)

作为 ``roots.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``CardRendererHost``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6047:6139:FUNCTION

.. rubric:: ``useMemo callback @ 120``

.. code-block:: javascript

   useMemo callback @ 120()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``CardRendererHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createElementRenderers``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:6452:6607:FUNCTION

.. rubric:: ``StaticRendererHost``

.. code-block:: javascript

   StaticRendererHost(props)

实现 ``StaticRendererHost`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``127``—``130`` 行；所属函数 ``getStableRendererHost``。

**参数**

``props``
   React 组件属性。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderers?.[name]?.(props) ?? null``。

**主要协作调用**：``useContext``、``renderers?.[name]``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7354:7398:FUNCTION

.. rubric:: ``getCurrentReplacement``

.. code-block:: javascript

   getCurrentReplacement()

读取与 ``Current Replacement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``155``—``157`` 行；所属函数 ``createElementRenderers``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:7435:8148:FUNCTION

.. rubric:: ``renderNestedMarkdown``

.. code-block:: javascript

   renderNestedMarkdown(nestedContent, extra)

渲染与 ``Nested Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``159``—``176`` 行；所属函数 ``createElementRenderers``。

**参数**

``nestedContent``
   调用方传入的 ``nestedContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra`` （默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownRenderer contextId={contextId} content={nestedContent} replacement={getCurrentReplacement()} conversationId={conversationId} depth={extra.depth ?? depth + 1} maxDepth={…``。

**主要协作调用**：``getCurrentReplacement``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8234:8555:FUNCTION

.. rubric:: ``cardSpec.directives.map callback @ 178``

.. code-block:: javascript

   cardSpec.directives.map callback @ 178({ name, kind })

作为 ``cardSpec.directives.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``178``—``183`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ name, kind }``
   调用方传入的 ``name, kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8300:8339:FUNCTION

.. rubric:: ``anonymous callback @ 180``

.. code-block:: javascript

   anonymous callback @ 180(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``cardSpec.directives.map callback @ 178``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8375:8414:FUNCTION

.. rubric:: ``anonymous callback @ 181``

.. code-block:: javascript

   anonymous callback @ 181(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``cardSpec.directives.map callback @ 178``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8416:8547:FUNCTION

.. rubric:: ``anonymous callback @ 182``

.. code-block:: javascript

   anonymous callback @ 182(props)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``cardSpec.directives.map callback @ 178``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8607:8671:FUNCTION

.. rubric:: ``cwm-stream-text``

.. code-block:: javascript

   cwm-stream-text({children})

实现 ``cwm-stream-text`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``createElementRenderers``。

**参数**

``{children}``
   React 子节点。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8715:8754:FUNCTION

.. rubric:: ``study-outline``

.. code-block:: javascript

   study-outline(props)

实现 ``study-outline`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``createElementRenderers``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8794:8847:FUNCTION

.. rubric:: ``p``

.. code-block:: javascript

   p({ children })

实现 ``p`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:8863:9045:FUNCTION

.. rubric:: ``ul``

.. code-block:: javascript

   ul({ children, className })

实现 ``ul`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9061:9246:FUNCTION

.. rubric:: ``ol``

.. code-block:: javascript

   ol({ children, className })

实现 ``ol`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className }``
   调用方传入的 ``children, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9262:9547:FUNCTION

.. rubric:: ``li``

.. code-block:: javascript

   li({ children, className, node })

实现 ``li`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``194``—``198`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, className, node }``
   调用方传入的 ``children, className, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<li className="my-1">{children}</li>``、``<DocumentTaskListItem className={className} node={node}>{children}</DocumentTaskListItem>``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9630:9728:FUNCTION

.. rubric:: ``input``

.. code-block:: javascript

   input(props)

实现 ``input`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``createElementRenderers``。

**参数**

``props``
   React 组件属性。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9765:9886:FUNCTION

.. rubric:: ``h1``

.. code-block:: javascript

   h1({ children })

实现 ``h1`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``205`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:9902:10000:FUNCTION

.. rubric:: ``h2``

.. code-block:: javascript

   h2({ children })

实现 ``h2`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10016:10112:FUNCTION

.. rubric:: ``h3``

.. code-block:: javascript

   h3({ children })

实现 ``h3`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``209``—``209`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10128:10165:FUNCTION

.. rubric:: ``hr``

.. code-block:: javascript

   hr()

实现 ``hr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``createElementRenderers``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10189:10294:FUNCTION

.. rubric:: ``blockquote``

.. code-block:: javascript

   blockquote({ children })

实现 ``blockquote`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``213``—``215`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:10309:11754:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ href, children })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``217``—``246`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ href, children }``
   调用方传入的 ``href, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<span>{children}</span>``、``( <a href={href} target={modalLink ? undefined : '_blank'} rel={modalLink ? undefined : 'noopener noreferrer'} className="text-primary underline-offset-4 hover:underline" onClick=…``。

**主要协作调用**：``isUniversalModalLink``、``isDocumentDownloadUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11038:11268:FUNCTION

.. rubric:: ``anonymous callback @ 230``

.. code-block:: javascript

   anonymous callback @ 230(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``230``—``234`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openUniversalModalLink``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11360:11588:FUNCTION

.. rubric:: ``anonymous callback @ 236``

.. code-block:: javascript

   anonymous callback @ 236(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``236``—``239`` 行；所属函数 ``a``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``downloadDocumentResource(href).catch``、``downloadDocumentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11514:11551:FUNCTION

.. rubric:: ``downloadDocumentResource(href).catch callback @ 238``

.. code-block:: javascript

   downloadDocumentResource(href).catch callback @ 238(error)

处理 ``downloadDocumentResource(href).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``anonymous callback @ 236``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:11804:12037:FUNCTION

.. rubric:: ``table``

.. code-block:: javascript

   table({ children })

实现 ``table`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``250``—``254`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12054:12098:FUNCTION

.. rubric:: ``thead``

.. code-block:: javascript

   thead({ children })

实现 ``thead`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12115:12159:FUNCTION

.. rubric:: ``tbody``

.. code-block:: javascript

   tbody({ children })

实现 ``tbody`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``256``—``256`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12173:12211:FUNCTION

.. rubric:: ``tr``

.. code-block:: javascript

   tr({ children })

实现 ``tr`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children }``
   调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12225:12284:FUNCTION

.. rubric:: ``th``

.. code-block:: javascript

   th({ children, style })

实现 ``th`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12298:12357:FUNCTION

.. rubric:: ``td``

.. code-block:: javascript

   td({ children, style })

实现 ``td`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ children, style }``
   调用方传入的 ``children, style`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12374:12574:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ src, alt, className, ...props })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``261``—``263`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, alt, className, ...props }``
   调用方传入的 ``src, alt, className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ResourceImage key={src} src={src} alt={alt} galleryId={contextId} className={\x60cwm-md-image ${className || ''}\x60} {...props} />``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12593:12679:FUNCTION

.. rubric:: ``video``

.. code-block:: javascript

   video({ src, title, poster })

实现 ``video`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, title, poster }``
   调用方传入的 ``src, title, poster`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12696:12758:FUNCTION

.. rubric:: ``audio``

.. code-block:: javascript

   audio({ src, title })

实现 ``audio`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``266``—``266`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ src, title }``
   调用方传入的 ``src, title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:12786:21989:FUNCTION

.. rubric:: ``card-replace``

.. code-block:: javascript

   card-replace({ id, type, node })

实现 ``card-replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``268``—``448`` 行；所属函数 ``createElementRenderers``。

**参数**

``{ id, type, node }``
   调用方传入的 ``id, type, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="block w-full clear-both" data-work-process-placeholder={finalId} aria-hidden="true" />``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id="" snapshot={snapshot} type={tokenType} content="" contextId={contextId} conversationId={conversat…``、``null``、``( <div className="block w-full clear-both" data-tts-ignore="true"> <CardBlock id={finalId} snapshot={snapshot} type="error" content={\x60cardReplace 出现循环引用，id: ${finalId}\x60} contextId…``。

**主要协作调用**：``String``、``getCurrentReplacement``、``visitedIds.includes``、``console.error``、``normalizeReplacementEntry``、``JSON.parse``、``Array.isArray``、``items.map((item) => workProcessEntry(currentReplacement, item.id, item.type)).filter``、``items.map``、``parsed.filter``、``groupedIds.map((groupedId) => { // The grouping plugin already verified each token's status // type. Persisted replacem…``、``groupedIds.map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:14006:14280:FUNCTION

.. rubric:: ``renderMarkdown callback @ 291``

.. code-block:: javascript

   renderMarkdown callback @ 291(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``291``—``296`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:15426:15700:FUNCTION

.. rubric:: ``renderMarkdown callback @ 325``

.. code-block:: javascript

   renderMarkdown callback @ 325(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``325``—``330`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:16672:16946:FUNCTION

.. rubric:: ``renderMarkdown callback @ 353``

.. code-block:: javascript

   renderMarkdown callback @ 353(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``353``—``358`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:17677:17764:FUNCTION

.. rubric:: ``items.map callback @ 377``

.. code-block:: javascript

   items.map callback @ 377(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``377``—``378`` 行；所属函数 ``card-replace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workProcessEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18123:18159:FUNCTION

.. rubric:: ``parsed.filter callback @ 383``

.. code-block:: javascript

   parsed.filter callback @ 383(value)

作为 ``parsed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``383``—``383`` 行；所属函数 ``card-replace``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:18411:19009:FUNCTION

.. rubric:: ``groupedIds.map callback @ 388``

.. code-block:: javascript

   groupedIds.map callback @ 388(groupedId)

作为 ``groupedIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``396`` 行；所属函数 ``card-replace``。

**参数**

``groupedId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``entry.exists && !entry.snapshot && entry.type === 'executionStatus' ? {id: groupedId, content: entry.content} : null``。

**主要协作调用**：``normalizeReplacementEntry``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:21585:21912:FUNCTION

.. rubric:: ``renderMarkdown callback @ 438``

.. code-block:: javascript

   renderMarkdown callback @ 438(markdownContent)

渲染与 ``Markdown`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``438``—``444`` 行；所属函数 ``card-replace``。

**参数**

``markdownContent``
   调用方传入的 ``markdownContent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``renderNestedMarkdown(markdownContent, { depth: depth + 1, visitedIds: nextVisitedIds, snapshot: cardSnapshot, })``。

**主要协作调用**：``renderNestedMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22750:23223:FUNCTION

.. rubric:: ``useCallback callback @ 475``

.. code-block:: javascript

   useCallback callback @ 475(uri, key, node)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``475``—``483`` 行；所属函数 ``MarkdownRendererInner``。

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

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:22994:23031:FUNCTION

.. rubric:: ``relative.split('/').some callback @ 479``

.. code-block:: javascript

   relative.split('/').some callback @ 479(part)

作为 ``relative.split('/').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``479``—``479`` 行；所属函数 ``useCallback callback @ 475``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23537:23678:FUNCTION

.. rubric:: ``useMemo callback @ 487``

.. code-block:: javascript

   useMemo callback @ 487()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``487``—``488`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:23769:23833:FUNCTION

.. rubric:: ``useEffect callback @ 489``

.. code-block:: javascript

   useEffect callback @ 489()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``489``—``489`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:24141:24333:FUNCTION

.. rubric:: ``useMemo callback @ 493``

.. code-block:: javascript

   useMemo callback @ 493()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``493``—``497`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``projected``。

**主要协作调用**：``projectReplacements``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25317:25363:FUNCTION

.. rubric:: ``useMemo callback @ 510``

.. code-block:: javascript

   useMemo callback @ 510()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``510``—``510`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.parse``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:25417:25868:FUNCTION

.. rubric:: ``useMemo callback @ 512``

.. code-block:: javascript

   useMemo callback @ 512()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``512``—``529`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ contextId, conversationId, depth, maxDepth, visitedIds: stableVisitedIds, isStreaming, messageContextState, messageReadonly, messageIsLatest, renderSurface, snapshot, onTaskTogg…``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26244:26325:FUNCTION

.. rubric:: ``useMemo callback @ 546``

.. code-block:: javascript

   useMemo callback @ 546()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createElementRenderers``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26383:26438:FUNCTION

.. rubric:: ``useMemo callback @ 547``

.. code-block:: javascript

   useMemo callback @ 547()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``547``—``547`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26512:26606:FUNCTION

.. rubric:: ``useMemo callback @ 548``

.. code-block:: javascript

   useMemo callback @ 548()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``548``—``548`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26783:26901:FUNCTION

.. rubric:: ``useMemo callback @ 552``

.. code-block:: javascript

   useMemo callback @ 552()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``552``—``554`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``rendererNames.split('|').map``、``rendererNames.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26847:26892:FUNCTION

.. rubric:: ``rendererNames.split('|').map callback @ 553``

.. code-block:: javascript

   rendererNames.split('|').map callback @ 553(name)

作为 ``rendererNames.split('|').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``553``—``553`` 行；所属函数 ``useMemo callback @ 552``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getStableRendererHost``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:26961:27184:FUNCTION

.. rubric:: ``useMemo callback @ 556``

.. code-block:: javascript

   useMemo callback @ 556()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``556``—``564`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``stripDanglingStreamingCardToken(preprocessed)``、``preprocessed``。

**主要协作调用**：``preprocessContent``、``stripDanglingStreamingCardToken``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27248:27441:FUNCTION

.. rubric:: ``useMemo callback @ 566``

.. code-block:: javascript

   useMemo callback @ 566()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``566``—``572`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { resolved ??= resolveMarkdownCopyContent(content, replacement, { maxDepth }); return resolved; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27294:27433:FUNCTION

.. rubric:: ``returned callback @ 568``

.. code-block:: javascript

   returned callback @ 568()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``568``—``571`` 行；所属函数 ``useMemo callback @ 566``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``resolved``。

**主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27495:28399:FUNCTION

.. rubric:: ``useEffect callback @ 574``

.. code-block:: javascript

   useEffect callback @ 574()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``574``—``602`` 行；所属函数 ``MarkdownRendererInner``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (typeof msg.unregisterComponent !== 'function') { return; } if (typeof msg.getComponent === 'function') { const currentComponent = msg.getComponent(copyContentComponent…``。

**主要协作调用**：``createMarkdownCopyContentComponent``、``msg.registerComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:27902:28391:FUNCTION

.. rubric:: ``returned callback @ 587``

.. code-block:: javascript

   returned callback @ 587()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``587``—``601`` 行；所属函数 ``useEffect callback @ 574``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/components/markdown/MarkdownRenderer.jsx:30502:31439:FUNCTION

.. rubric:: ``memo callback @ 642``

.. code-block:: javascript

   memo callback @ 642(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``642``—``662`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.resourceBaseUrl === next.resourceBaseUrl && prev.extraRehypePlugins === next.extraRehypePlugins && prev.contextId === next.contextId && prev.conversationId === next.convers…``。

**主要协作调用**：``areVisitedIdsEqual``。
