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

``./aiCursorDecorations.js``、``./LocalMarkdownEditor.jsx``、``./DocumentExtractButton.jsx``、``@/features/tasks/useTaskStore.js``、``lucide-react``、``@/components/ui/dropdown-menu``、``./collaboratorPosition.js``、``@/components/files/FileUploadProgress.jsx``、``./images.js``、``@/components/files/uploadPolicy.js``、``@/lib/apiClient.js``、``../../runtime/backend/connection.js``、``@/components/files/FileManager.jsx``、``@/components/ui/dialog``、``@/context/useEventStore.jsx``、``react-i18next``、``react``、``react-dom``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/lang-markdown``、``y-codemirror.next``、``yjs``、``@/components/ui/button``、``@/lib/tools.jsx``、``./DocumentCollaborators.jsx``、``@/components/ui/tooltip``、``@codemirror/language``、``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:2994:3175:FUNCTION

.. js:function:: MarkdownDocumentEditor(props)

   渲染 ``MarkdownDocumentEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``71``—``73`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``props.mode === 'simple' ? <LocalMarkdownEditor {...props} /> : <CollaborativeMarkdownEditor {...props} />``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3175:38670:FUNCTION

.. js:function:: CollaborativeMarkdownEditor({ documentId, conversationId, onStatus, headerContainer, onOpenCollaboratorConversation })

   渲染 ``CollaborativeMarkdownEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``75``—``787`` 行。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4208:4271:FUNCTION

.. rubric:: ``useEffect callback @ 91``

.. code-block:: javascript

   useEffect callback @ 91()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``91``—``93`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4901:7468:FUNCTION

.. rubric:: ``uploadImages``

.. code-block:: javascript

   async uploadImages(files, directory)

实现 ``uploadImages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``106``—``160`` 行；所属函数 ``CollaborativeMarkdownEditor``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5284:5319:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``uploadImages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5345:7256:FUNCTION

.. rubric:: ``upload``

.. code-block:: javascript

   async upload(file)

实现 ``upload`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``118``—``152`` 行；所属函数 ``uploadImages``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5654:5834:FUNCTION

.. rubric:: ``setUploads callback @ 123``

.. code-block:: javascript

   setUploads callback @ 123(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``123``—``126`` 行；所属函数 ``upload``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.slice``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5872:6062:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``127``—``130`` 行；所属函数 ``upload``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5920:6034:FUNCTION

.. rubric:: ``setUploads callback @ 128``

.. code-block:: javascript

   setUploads callback @ 128(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``128``—``129`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5976:6033:FUNCTION

.. rubric:: ``previous.map callback @ 129``

.. code-block:: javascript

   previous.map callback @ 129(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``setUploads callback @ 128``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6412:6924:FUNCTION

.. rubric:: ``onUploadProgress``

.. code-block:: javascript

   onUploadProgress(progress)

处理 ``Upload Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``136``—``144`` 行；所属函数 ``upload``。

**参数**

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``Math.min``、``Math.max``、``performance.now``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7305:7325:FUNCTION

.. rubric:: ``setFilesRevision callback @ 154``

.. code-block:: javascript

   setFilesRevision callback @ 154(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``uploadImages``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7544:9086:FUNCTION

.. rubric:: ``useMemo callback @ 163``

.. code-block:: javascript

   useMemo callback @ 163()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``163``—``193`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7581:7660:FUNCTION

.. rubric:: ``list``

.. code-block:: javascript

   list(path)

实现 ``list`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``useMemo callback @ 163``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7689:7858:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(path)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``165``—``168`` 行；所属函数 ``useMemo callback @ 163``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.get(\x60/document/${documentId}/files/references\x60, { params: { path } })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7880:8100:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   remove(path, prepared)

移除与 ``remove`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``169``—``172`` 行；所属函数 ``useMemo callback @ 163``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``prepared``
   调用方传入的 ``prepared`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8120:8494:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move(path, destination)

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``173``—``181`` 行；所属函数 ``useMemo callback @ 163``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8515:8607:FUNCTION

.. rubric:: ``mkdir``

.. code-block:: javascript

   mkdir(parent, name)

实现 ``mkdir`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``useMemo callback @ 163``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8629:9073:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename(path, name)

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``183``—``192`` 行；所属函数 ``useMemo callback @ 163``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9140:9331:FUNCTION

.. rubric:: ``useEffect callback @ 197``

.. code-block:: javascript

   useEffect callback @ 197()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``197``—``200`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9254:9315:FUNCTION

.. rubric:: ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 198``

.. code-block:: javascript

   onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 198()

处理 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``198``—``199`` 行；所属函数 ``useEffect callback @ 197``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9294:9314:FUNCTION

.. rubric:: ``setFilesRevision callback @ 199``

.. code-block:: javascript

   setFilesRevision callback @ 199(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 198``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9379:14085:FUNCTION

.. rubric:: ``useEffect callback @ 203``

.. code-block:: javascript

   useEffect callback @ 203()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``203``—``300`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { editorRef.current = null; undoRef.current = null; resource.awareness.off('update', syncLocalColor); editor.destroy(); resource.undoManager = null; undoManager.destroy(); t…``。

**主要协作调用**：``undoManager.on``、``text.observe``、``update``、``EditorState.create``、``text.toString``、``EditorView.domEventHandlers``、``lineNumbers``、``highlightActiveLine``、``drawSelection``、``markdown``、``syntaxHighlighting``、``keymap.of``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9691:9794:FUNCTION

.. rubric:: ``undoManager.on callback @ 210``

.. code-block:: javascript

   undoManager.on callback @ 210({ origin })

实现 ``undoManager.on`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``210``—``212`` 行；所属函数 ``useEffect callback @ 203``。

**参数**

``{ origin }``
   调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoManager.stopCapturing``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9820:9854:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``useEffect callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContent``、``text.toString``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10143:10626:FUNCTION

.. rubric:: ``paste``

.. code-block:: javascript

   paste(event)

实现 ``paste`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``222``—``230`` 行；所属函数 ``useEffect callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``[...(event.clipboardData?.files || [])].filter``、``event.preventDefault``、``pasteImages.current``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10274:10347:FUNCTION

.. rubric:: ``[...(event.clipboardData?.files || [])].filter callback @ 223``

.. code-block:: javascript

   [...(event.clipboardData?.files || [])].filter callback @ 223(file)

作为 ``[...(event.clipboardData?.files || [])].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``223``—``224`` 行；所属函数 ``paste``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.type.startsWith``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13414:13594:FUNCTION

.. rubric:: ``syncLocalColor``

.. code-block:: javascript

   syncLocalColor()

实现 ``syncLocalColor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``283``—``286`` 行；所属函数 ``useEffect callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.getLocalState``、``editor.dom.style.setProperty``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13773:14077:FUNCTION

.. rubric:: ``returned callback @ 291``

.. code-block:: javascript

   returned callback @ 291()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``291``—``299`` 行；所属函数 ``useEffect callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.off``、``editor.destroy``、``undoManager.destroy``、``text.unobserve``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14131:14894:FUNCTION

.. rubric:: ``locateCollaborator``

.. code-block:: javascript

   locateCollaborator(person)

实现 ``locateCollaborator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``316`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``toast.info``、``t``、``setPane``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14464:14863:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 308``

.. code-block:: javascript

   requestAnimationFrame callback @ 308()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``308``—``314`` 行；所属函数 ``locateCollaborator``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``editorRef.current.dispatch``、``EditorView.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14919:15119:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   async handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``317``—``324`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15136:15780:FUNCTION

.. rubric:: ``useEffect callback @ 325``

.. code-block:: javascript

   useEffect callback @ 325()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``338`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('keydown', interceptSave, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15174:15624:FUNCTION

.. rubric:: ``interceptSave``

.. code-block:: javascript

   interceptSave(event)

实现 ``interceptSave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``326``—``335`` 行；所属函数 ``useEffect callback @ 325``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.key.toLowerCase``、``event.preventDefault``、``event.stopPropagation``、``save() .then(() => toast.success(t('documents_version_saved'))) .catch``、``save() .then``、``save``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15476:15525:FUNCTION

.. rubric:: ``save() .then callback @ 332``

.. code-block:: javascript

   save() .then callback @ 332()

处理 ``save() .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``interceptSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15559:15596:FUNCTION

.. rubric:: ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 333``

.. code-block:: javascript

   save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 333(cause)

处理 ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``333``—``333`` 行；所属函数 ``interceptSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15707:15772:FUNCTION

.. rubric:: ``returned callback @ 337``

.. code-block:: javascript

   returned callback @ 337()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``337``—``337`` 行；所属函数 ``useEffect callback @ 325``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15814:16056:FUNCTION

.. rubric:: ``command``

.. code-block:: javascript

   command(callback)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``339``—``345`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPane``、``undoRef.current.stopCapturing``、``callback``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16101:16402:FUNCTION

.. rubric:: ``useCallback callback @ 346``

.. code-block:: javascript

   useCallback callback @ 346({ sourceContent, offset, expectedChecked })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``346``—``355`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ sourceContent, offset, expectedChecked }``
   调用方传入的 ``sourceContent, offset, expectedChecked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyDocumentTaskToggle``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16498:16527:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.undo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16591:16620:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.redo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16690:16725:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``359``—``359`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16827:16890:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``363``—``363`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17006:17067:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``368``—``368`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17197:17260:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``373``—``373`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17340:17374:FUNCTION

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17453:17488:FUNCTION

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17553:17587:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``377``—``377`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17695:17764:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``381``—``381`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17809:18481:FUNCTION

.. rubric:: ``insertLink``

.. code-block:: javascript

   insertLink(event)

实现 ``insertLink`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``384``—``401`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``linkUrl.trim``、``/[<>\s]/.test``、``/^(?!https?:)[a-z][a-z0-9+.-]*:/i.test``、``toast.error``、``t``、``command``、``setLinkOpen``、``setLinkUrl``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18125:18407:FUNCTION

.. rubric:: ``command callback @ 391``

.. code-block:: javascript

   command callback @ 391(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``391``—``397`` 行；所属函数 ``insertLink``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``url.replaceAll('(', '%28').replaceAll``、``url.replaceAll``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20642:21592:FUNCTION

.. rubric:: ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 443``

.. code-block:: javascript

   [ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 443({ value, label, icon })

实现 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``443``—``460`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ value, label, icon }``
   调用方传入的 ``value, label, icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:21301:21321:FUNCTION

.. rubric:: ``onClick callback @ 453``

.. code-block:: javascript

   onClick callback @ 453()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``453``—``453`` 行；所属函数 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 443``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPane``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22209:22284:FUNCTION

.. rubric:: ``onDismissUpload callback @ 477``

.. code-block:: javascript

   onDismissUpload callback @ 477(id)

处理 ``Dismiss Upload`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22228:22283:FUNCTION

.. rubric:: ``setUploads callback @ 477``

.. code-block:: javascript

   setUploads callback @ 477(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``onDismissUpload callback @ 477``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22258:22282:FUNCTION

.. rubric:: ``previous.filter callback @ 477``

.. code-block:: javascript

   previous.filter callback @ 477(item)

作为 ``previous.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``setUploads callback @ 477``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22589:22614:FUNCTION

.. rubric:: ``onClick callback @ 485``

.. code-block:: javascript

   onClick callback @ 485()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``485``—``485`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22947:23212:FUNCTION

.. rubric:: ``onOpen callback @ 495``

.. code-block:: javascript

   onOpen callback @ 495(file)

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``495``—``500`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.path.startsWith``、``command``、``setFilesOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23044:23120:FUNCTION

.. rubric:: ``command callback @ 497``

.. code-block:: javascript

   command callback @ 497(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``497``—``497`` 行；所属函数 ``onOpen callback @ 495``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``encodeURI``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23317:23876:FUNCTION

.. rubric:: ``exportDocument``

.. code-block:: javascript

   async exportDocument(format)

实现 ``exportDocument`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``504``—``520`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExporting``、``save``、``apiClient.post``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``useTaskStore.getState().show``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24320:25292:FUNCTION

.. rubric:: ``tools.map callback @ 526``

.. code-block:: javascript

   tools.map callback @ 526({ label, icon, run })

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``526``—``544`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ label, icon, run }``
   调用方传入的 ``label, icon, run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24894:24927:FUNCTION

.. rubric:: ``onMouseDown callback @ 536``

.. code-block:: javascript

   onMouseDown callback @ 536(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``536``—``536`` 行；所属函数 ``tools.map callback @ 526``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24975:24993:FUNCTION

.. rubric:: ``onClick callback @ 537``

.. code-block:: javascript

   onClick callback @ 537()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``537``—``537`` 行；所属函数 ``tools.map callback @ 526``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25890:25923:FUNCTION

.. rubric:: ``onMouseDown callback @ 555``

.. code-block:: javascript

   onMouseDown callback @ 555(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``555``—``555`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26233:26302:FUNCTION

.. rubric:: ``(cardSpec?.directives || []).filter callback @ 561``

.. code-block:: javascript

   (cardSpec?.directives || []).filter callback @ 561(directive)

作为 ``(cardSpec?.directives || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``561``—``561`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``directive``
   调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26308:27134:FUNCTION

.. rubric:: ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 561``

.. code-block:: javascript

   (cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 561(directive)

作为 ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``561``—``571`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``directive``
   调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={directive.name} onSelect={() => command((view) => insertStudyBlock(view, localizedDirective))}> <span className="flex flex-col"> <span>{localizedDirective…``。

**主要协作调用**：``localizeCardDirective``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26564:26631:FUNCTION

.. rubric:: ``onSelect callback @ 564``

.. code-block:: javascript

   onSelect callback @ 564()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``564``—``564`` 行；所属函数 ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 561``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26578:26630:FUNCTION

.. rubric:: ``command callback @ 564``

.. code-block:: javascript

   command callback @ 564(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``564``—``564`` 行；所属函数 ``onSelect callback @ 564``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``insertStudyBlock``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27326:27404:FUNCTION

.. rubric:: ``onSelect callback @ 573``

.. code-block:: javascript

   onSelect callback @ 573()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27340:27403:FUNCTION

.. rubric:: ``command callback @ 573``

.. code-block:: javascript

   command callback @ 573(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``onSelect callback @ 573``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``insertTodoList``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:28869:28894:FUNCTION

.. rubric:: ``onClick callback @ 599``

.. code-block:: javascript

   onClick callback @ 599()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``599``—``599`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:29381:29405:FUNCTION

.. rubric:: ``onClick callback @ 608``

.. code-block:: javascript

   onClick callback @ 608()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``608``—``608`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30071:30112:FUNCTION

.. rubric:: ``onChange callback @ 620``

.. code-block:: javascript

   onChange callback @ 620(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``620``—``620`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLinkUrl``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30783:30803:FUNCTION

.. rubric:: ``onBeforeSubmit callback @ 633``

.. code-block:: javascript

   onBeforeSubmit callback @ 633()

处理 ``Before Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``633``—``633`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:31188:31222:FUNCTION

.. rubric:: ``onClick callback @ 642``

.. code-block:: javascript

   onClick callback @ 642()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``642``—``642`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadInput.current?.click``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32321:32600:FUNCTION

.. rubric:: ``['md', 'pdf', 'zip', 'png-zip'].map callback @ 664``

.. code-block:: javascript

   ['md', 'pdf', 'zip', 'png-zip'].map callback @ 664(format)

作为 ``['md', 'pdf', 'zip', 'png-zip'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``664``—``668`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32409:32442:FUNCTION

.. rubric:: ``onSelect callback @ 665``

.. code-block:: javascript

   onSelect callback @ 665()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``665``—``665`` 行；所属函数 ``['md', 'pdf', 'zip', 'png-zip'].map callback @ 664``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``exportDocument``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32993:33017:FUNCTION

.. rubric:: ``onClick callback @ 677``

.. code-block:: javascript

   onClick callback @ 677()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``677``—``677`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:33687:33710:FUNCTION

.. rubric:: ``onClick callback @ 690``

.. code-block:: javascript

   onClick callback @ 690()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``690``—``690`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSave``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:34510:34536:FUNCTION

.. rubric:: ``onClick callback @ 705``

.. code-block:: javascript

   onClick callback @ 705()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``705``—``705`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:35157:35341:FUNCTION

.. rubric:: ``onChange callback @ 721``

.. code-block:: javascript

   onChange callback @ 721(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``721``—``725`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadImages``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36085:36160:FUNCTION

.. rubric:: ``onDismiss callback @ 740``

.. code-block:: javascript

   onDismiss callback @ 740(id)

处理 ``Dismiss`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``740``—``740`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36104:36159:FUNCTION

.. rubric:: ``setUploads callback @ 740``

.. code-block:: javascript

   setUploads callback @ 740(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``740``—``740`` 行；所属函数 ``onDismiss callback @ 740``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36134:36158:FUNCTION

.. rubric:: ``previous.filter callback @ 740``

.. code-block:: javascript

   previous.filter callback @ 740(item)

作为 ``previous.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``740``—``740`` 行；所属函数 ``setUploads callback @ 740``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
