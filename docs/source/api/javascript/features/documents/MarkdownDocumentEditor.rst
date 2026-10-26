src/features/documents/MarkdownDocumentEditor 模块
========================================================================================================

.. js:module:: src/features/documents/MarkdownDocumentEditor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/MarkdownDocumentEditor.jsx``
* **模块标识**：``src/features/documents/MarkdownDocumentEditor``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：82

主要依赖
--------------------------------------------------------------------------------

``./aiCursorDecorations.js``、``./LocalMarkdownEditor.jsx``、``./DocumentExtractButton.jsx``、``@/features/tasks/useTaskStore.js``、``lucide-react``、``@/components/ui/dropdown-menu``、``./collaboratorPosition.js``、``@/components/files/FileUploadProgress.jsx``、``./images.js``、``@/components/files/uploadPolicy.js``、``@/lib/apiClient.js``、``@/components/files/FileManager.jsx``、``@/components/ui/dialog``、``@/context/useEventStore.jsx``、``react-i18next``、``react``、``react-dom``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/lang-markdown``、``y-codemirror.next``、``yjs``、``@/components/ui/button``、``@/lib/tools.jsx``、``./DocumentCollaborators.jsx``、``@/components/ui/tooltip``、``@codemirror/language``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/markdown/documentCardSpec.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:2924:3105:FUNCTION

.. js:function:: MarkdownDocumentEditor(props)

   渲染 ``MarkdownDocumentEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``70``—``72`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``props.mode === 'simple' ? <LocalMarkdownEditor {...props} /> : <CollaborativeMarkdownEditor {...props} />``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3105:38569:FUNCTION

.. js:function:: CollaborativeMarkdownEditor({ documentId, conversationId, onStatus, headerContainer, onOpenCollaboratorConversation })

   渲染 ``CollaborativeMarkdownEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``74``—``786`` 行。

   **参数**

   ``{ documentId, conversationId, onStatus, headerContainer, onOpenCollaboratorConversation }``
      调用方传入的 ``documentId, conversationId, onStatus, headerContainer, onOpenCollaboratorConversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-col bg-background font-sans text-foreground"> {headerContainer ? createPortal(documentHeader, headerContainer) : documentHeader} <div cl…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``(i18n.resolvedLanguage || i18n.language || 'zh').split``、``useDocumentCardSpec``、``useState``、``useRef``、``new URLSearchParams(window.location.search).get``、``/^[0-9a-f]{40}$/i.test``、``useEffect``、``useCollaborativeDocument``、``useIsMobile``、``useDeferredValue``、``useMemo``。

   **内部回调数量**：42。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4138:4201:FUNCTION

.. rubric:: ``useEffect callback @ 90``

.. code-block:: javascript

   useEffect callback @ 90()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``92`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4831:7398:FUNCTION

.. rubric:: ``uploadImages``

.. code-block:: javascript

   async uploadImages(files, directory)

实现 ``uploadImages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``105``—``159`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``directory`` （默认值 ``'assets'``）
   调用方传入的 ``directory`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setUploading``、``insertUploadedImages``、``setFilesRevision``、``toast.error``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5214:5249:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``uploadImages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5275:7186:FUNCTION

.. rubric:: ``upload``

.. code-block:: javascript

   async upload(file)

实现 ``upload`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``117``—``151`` 行；所属函数 ``uploadImages``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``data``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error(t('document_image_limits'))``、``cause``。

**主要协作调用**：``isUploadAllowed``、``t``、``crypto.randomUUID``、``performance.now``、``setUploads``、``form.append``、``apiClient.post``、``update``、``Date.now``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5584:5764:FUNCTION

.. rubric:: ``setUploads callback @ 122``

.. code-block:: javascript

   setUploads callback @ 122(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``122``—``125`` 行；所属函数 ``upload``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.slice``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5802:5992:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``126``—``129`` 行；所属函数 ``upload``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5850:5964:FUNCTION

.. rubric:: ``setUploads callback @ 127``

.. code-block:: javascript

   setUploads callback @ 127(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``127``—``128`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5906:5963:FUNCTION

.. rubric:: ``previous.map callback @ 128``

.. code-block:: javascript

   previous.map callback @ 128(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``setUploads callback @ 127``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6342:6854:FUNCTION

.. rubric:: ``onUploadProgress``

.. code-block:: javascript

   onUploadProgress(progress)

处理 ``Upload Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``135``—``143`` 行；所属函数 ``upload``。

**参数**

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``Math.min``、``Math.max``、``performance.now``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7235:7255:FUNCTION

.. rubric:: ``setFilesRevision callback @ 153``

.. code-block:: javascript

   setFilesRevision callback @ 153(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``153``—``153`` 行；所属函数 ``uploadImages``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7474:9016:FUNCTION

.. rubric:: ``useMemo callback @ 162``

.. code-block:: javascript

   useMemo callback @ 162()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``162``—``192`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7511:7590:FUNCTION

.. rubric:: ``list``

.. code-block:: javascript

   list(path)

实现 ``list`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``useMemo callback @ 162``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7619:7788:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(path)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``164``—``167`` 行；所属函数 ``useMemo callback @ 162``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.get(\x60/document/${documentId}/files/references\x60, { params: { path } })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7810:8030:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   remove(path, prepared)

移除与 ``remove`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``168``—``171`` 行；所属函数 ``useMemo callback @ 162``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``prepared``
   调用方传入的 ``prepared`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8050:8424:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move(path, destination)

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``172``—``180`` 行；所属函数 ``useMemo callback @ 162``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``destination``
   调用方传入的 ``destination`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.post(\x60/document/${documentId}/files/move\x60, { path, destination, revision: current.revision, })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``、``apiClient.post``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8445:8537:FUNCTION

.. rubric:: ``mkdir``

.. code-block:: javascript

   mkdir(parent, name)

实现 ``mkdir`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``useMemo callback @ 162``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8559:9003:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename(path, name)

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``182``—``191`` 行；所属函数 ``useMemo callback @ 162``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.patch(\x60/document/${documentId}/files/rename\x60, { path, name, revision: current.revision, })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``、``apiClient.patch``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9070:9261:FUNCTION

.. rubric:: ``useEffect callback @ 196``

.. code-block:: javascript

   useEffect callback @ 196()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``196``—``199`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9184:9245:FUNCTION

.. rubric:: ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 197``

.. code-block:: javascript

   onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 197()

处理 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``197``—``198`` 行；所属函数 ``useEffect callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9224:9244:FUNCTION

.. rubric:: ``setFilesRevision callback @ 198``

.. code-block:: javascript

   setFilesRevision callback @ 198(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``198``—``198`` 行；所属函数 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 197``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9309:14015:FUNCTION

.. rubric:: ``useEffect callback @ 202``

.. code-block:: javascript

   useEffect callback @ 202()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``202``—``299`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { editorRef.current = null; undoRef.current = null; resource.awareness.off('update', syncLocalColor); editor.destroy(); resource.undoManager = null; undoManager.destroy(); t…``。

**主要协作调用**：``undoManager.on``、``text.observe``、``update``、``EditorState.create``、``text.toString``、``EditorView.domEventHandlers``、``lineNumbers``、``highlightActiveLine``、``drawSelection``、``markdown``、``syntaxHighlighting``、``keymap.of``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9621:9724:FUNCTION

.. rubric:: ``undoManager.on callback @ 209``

.. code-block:: javascript

   undoManager.on callback @ 209({ origin })

实现 ``undoManager.on`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``209``—``211`` 行；所属函数 ``useEffect callback @ 202``。

**参数**

``{ origin }``
   调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoManager.stopCapturing``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9750:9784:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``useEffect callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContent``、``text.toString``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10073:10556:FUNCTION

.. rubric:: ``paste``

.. code-block:: javascript

   paste(event)

实现 ``paste`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``221``—``229`` 行；所属函数 ``useEffect callback @ 202``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``[...(event.clipboardData?.files || [])].filter``、``event.preventDefault``、``pasteImages.current``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10204:10277:FUNCTION

.. rubric:: ``[...(event.clipboardData?.files || [])].filter callback @ 222``

.. code-block:: javascript

   [...(event.clipboardData?.files || [])].filter callback @ 222(file)

作为 ``[...(event.clipboardData?.files || [])].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``222``—``223`` 行；所属函数 ``paste``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.type.startsWith``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13344:13524:FUNCTION

.. rubric:: ``syncLocalColor``

.. code-block:: javascript

   syncLocalColor()

实现 ``syncLocalColor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``282``—``285`` 行；所属函数 ``useEffect callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.getLocalState``、``editor.dom.style.setProperty``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13703:14007:FUNCTION

.. rubric:: ``returned callback @ 290``

.. code-block:: javascript

   returned callback @ 290()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``290``—``298`` 行；所属函数 ``useEffect callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.off``、``editor.destroy``、``undoManager.destroy``、``text.unobserve``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14061:14824:FUNCTION

.. rubric:: ``locateCollaborator``

.. code-block:: javascript

   locateCollaborator(person)

实现 ``locateCollaborator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``300``—``315`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``toast.info``、``t``、``setPane``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14394:14793:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 307``

.. code-block:: javascript

   requestAnimationFrame callback @ 307()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``307``—``313`` 行；所属函数 ``locateCollaborator``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``editorRef.current.dispatch``、``EditorView.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14849:15049:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   async handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``316``—``323`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15066:15710:FUNCTION

.. rubric:: ``useEffect callback @ 324``

.. code-block:: javascript

   useEffect callback @ 324()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``324``—``337`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('keydown', interceptSave, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15104:15554:FUNCTION

.. rubric:: ``interceptSave``

.. code-block:: javascript

   interceptSave(event)

实现 ``interceptSave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``325``—``334`` 行；所属函数 ``useEffect callback @ 324``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.key.toLowerCase``、``event.preventDefault``、``event.stopPropagation``、``save() .then(() => toast.success(t('documents_version_saved'))) .catch``、``save() .then``、``save``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15406:15455:FUNCTION

.. rubric:: ``save() .then callback @ 331``

.. code-block:: javascript

   save() .then callback @ 331()

处理 ``save() .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``331``—``331`` 行；所属函数 ``interceptSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15489:15526:FUNCTION

.. rubric:: ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 332``

.. code-block:: javascript

   save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 332(cause)

处理 ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``interceptSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15637:15702:FUNCTION

.. rubric:: ``returned callback @ 336``

.. code-block:: javascript

   returned callback @ 336()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``336``—``336`` 行；所属函数 ``useEffect callback @ 324``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15744:15986:FUNCTION

.. rubric:: ``command``

.. code-block:: javascript

   command(callback)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``338``—``344`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPane``、``undoRef.current.stopCapturing``、``callback``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16031:16332:FUNCTION

.. rubric:: ``useCallback callback @ 345``

.. code-block:: javascript

   useCallback callback @ 345({ sourceContent, offset, expectedChecked })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``345``—``354`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ sourceContent, offset, expectedChecked }``
   调用方传入的 ``sourceContent, offset, expectedChecked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyDocumentTaskToggle``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16428:16457:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.undo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16521:16550:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.redo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16620:16655:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16757:16820:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``362``—``362`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16936:16997:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``367``—``367`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17127:17190:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``372``—``372`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17270:17304:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``374``—``374`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17383:17418:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``375``—``375`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17483:17517:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``376``—``376`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17625:17694:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17739:18411:FUNCTION

.. rubric:: ``insertLink``

.. code-block:: javascript

   insertLink(event)

实现 ``insertLink`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``383``—``400`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``linkUrl.trim``、``/[<>\s]/.test``、``/^(?!https?:)[a-z][a-z0-9+.-]*:/i.test``、``toast.error``、``t``、``command``、``setLinkOpen``、``setLinkUrl``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18055:18337:FUNCTION

.. rubric:: ``command callback @ 390``

.. code-block:: javascript

   command callback @ 390(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``390``—``396`` 行；所属函数 ``insertLink``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``url.replaceAll('(', '%28').replaceAll``、``url.replaceAll``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20572:21522:FUNCTION

.. rubric:: ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 442``

.. code-block:: javascript

   [ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 442({ value, label, icon })

实现 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``442``—``459`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ value, label, icon }``
   调用方传入的 ``value, label, icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:21231:21251:FUNCTION

.. rubric:: ``onClick callback @ 452``

.. code-block:: javascript

   onClick callback @ 452()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``452``—``452`` 行；所属函数 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 442``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPane``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22139:22214:FUNCTION

.. rubric:: ``onDismissUpload callback @ 476``

.. code-block:: javascript

   onDismissUpload callback @ 476(id)

处理 ``Dismiss Upload`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``476``—``476`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22158:22213:FUNCTION

.. rubric:: ``setUploads callback @ 476``

.. code-block:: javascript

   setUploads callback @ 476(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``476``—``476`` 行；所属函数 ``onDismissUpload callback @ 476``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22188:22212:FUNCTION

.. rubric:: ``previous.filter callback @ 476``

.. code-block:: javascript

   previous.filter callback @ 476(item)

作为 ``previous.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``476``—``476`` 行；所属函数 ``setUploads callback @ 476``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22519:22544:FUNCTION

.. rubric:: ``onClick callback @ 484``

.. code-block:: javascript

   onClick callback @ 484()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``484``—``484`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22877:23142:FUNCTION

.. rubric:: ``onOpen callback @ 494``

.. code-block:: javascript

   onOpen callback @ 494(file)

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``494``—``499`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.path.startsWith``、``command``、``setFilesOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22974:23050:FUNCTION

.. rubric:: ``command callback @ 496``

.. code-block:: javascript

   command callback @ 496(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``496``—``496`` 行；所属函数 ``onOpen callback @ 494``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``encodeURI``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23247:23806:FUNCTION

.. rubric:: ``exportDocument``

.. code-block:: javascript

   async exportDocument(format)

实现 ``exportDocument`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``503``—``519`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExporting``、``save``、``apiClient.post``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``useTaskStore.getState().show``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24250:25222:FUNCTION

.. rubric:: ``tools.map callback @ 525``

.. code-block:: javascript

   tools.map callback @ 525({ label, icon, run })

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``525``—``543`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ label, icon, run }``
   调用方传入的 ``label, icon, run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24824:24857:FUNCTION

.. rubric:: ``onMouseDown callback @ 535``

.. code-block:: javascript

   onMouseDown callback @ 535(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``535``—``535`` 行；所属函数 ``tools.map callback @ 525``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24905:24923:FUNCTION

.. rubric:: ``onClick callback @ 536``

.. code-block:: javascript

   onClick callback @ 536()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``536``—``536`` 行；所属函数 ``tools.map callback @ 525``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25820:25853:FUNCTION

.. rubric:: ``onMouseDown callback @ 554``

.. code-block:: javascript

   onMouseDown callback @ 554(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``554``—``554`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26163:26232:FUNCTION

.. rubric:: ``(cardSpec?.directives || []).filter callback @ 560``

.. code-block:: javascript

   (cardSpec?.directives || []).filter callback @ 560(directive)

作为 ``(cardSpec?.directives || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``560``—``560`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``directive``
   调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26238:27064:FUNCTION

.. rubric:: ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 560``

.. code-block:: javascript

   (cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 560(directive)

作为 ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``560``—``570`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``directive``
   调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={directive.name} onSelect={() => command((view) => insertStudyBlock(view, localizedDirective))}> <span className="flex flex-col"> <span>{localizedDirective…``。

**主要协作调用**：``localizeCardDirective``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26494:26561:FUNCTION

.. rubric:: ``onSelect callback @ 563``

.. code-block:: javascript

   onSelect callback @ 563()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``563``—``563`` 行；所属函数 ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 560``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26508:26560:FUNCTION

.. rubric:: ``command callback @ 563``

.. code-block:: javascript

   command callback @ 563(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``563``—``563`` 行；所属函数 ``onSelect callback @ 563``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``insertStudyBlock``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27256:27334:FUNCTION

.. rubric:: ``onSelect callback @ 572``

.. code-block:: javascript

   onSelect callback @ 572()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``572``—``572`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27270:27333:FUNCTION

.. rubric:: ``command callback @ 572``

.. code-block:: javascript

   command callback @ 572(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``572``—``572`` 行；所属函数 ``onSelect callback @ 572``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``insertTodoList``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:28799:28824:FUNCTION

.. rubric:: ``onClick callback @ 598``

.. code-block:: javascript

   onClick callback @ 598()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``598``—``598`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:29311:29335:FUNCTION

.. rubric:: ``onClick callback @ 607``

.. code-block:: javascript

   onClick callback @ 607()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``607``—``607`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30001:30042:FUNCTION

.. rubric:: ``onChange callback @ 619``

.. code-block:: javascript

   onChange callback @ 619(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``619``—``619`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLinkUrl``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30713:30733:FUNCTION

.. rubric:: ``onBeforeSubmit callback @ 632``

.. code-block:: javascript

   onBeforeSubmit callback @ 632()

处理 ``Before Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``632``—``632`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:31118:31152:FUNCTION

.. rubric:: ``onClick callback @ 641``

.. code-block:: javascript

   onClick callback @ 641()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``641``—``641`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadInput.current?.click``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32251:32530:FUNCTION

.. rubric:: ``['md', 'pdf', 'zip', 'png-zip'].map callback @ 663``

.. code-block:: javascript

   ['md', 'pdf', 'zip', 'png-zip'].map callback @ 663(format)

作为 ``['md', 'pdf', 'zip', 'png-zip'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``663``—``667`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32339:32372:FUNCTION

.. rubric:: ``onSelect callback @ 664``

.. code-block:: javascript

   onSelect callback @ 664()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``664``—``664`` 行；所属函数 ``['md', 'pdf', 'zip', 'png-zip'].map callback @ 663``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``exportDocument``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32923:32947:FUNCTION

.. rubric:: ``onClick callback @ 676``

.. code-block:: javascript

   onClick callback @ 676()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``676``—``676`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:33617:33640:FUNCTION

.. rubric:: ``onClick callback @ 689``

.. code-block:: javascript

   onClick callback @ 689()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``689``—``689`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSave``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:34440:34466:FUNCTION

.. rubric:: ``onClick callback @ 704``

.. code-block:: javascript

   onClick callback @ 704()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:35087:35271:FUNCTION

.. rubric:: ``onChange callback @ 720``

.. code-block:: javascript

   onChange callback @ 720(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``720``—``724`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadImages``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36015:36090:FUNCTION

.. rubric:: ``onDismiss callback @ 739``

.. code-block:: javascript

   onDismiss callback @ 739(id)

处理 ``Dismiss`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``739``—``739`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36034:36089:FUNCTION

.. rubric:: ``setUploads callback @ 739``

.. code-block:: javascript

   setUploads callback @ 739(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``739``—``739`` 行；所属函数 ``onDismiss callback @ 739``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36064:36088:FUNCTION

.. rubric:: ``previous.filter callback @ 739``

.. code-block:: javascript

   previous.filter callback @ 739(item)

作为 ``previous.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``739``—``739`` 行；所属函数 ``setUploads callback @ 739``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
