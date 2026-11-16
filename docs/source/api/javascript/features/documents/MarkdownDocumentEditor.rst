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

``./aiCursorDecorations.js``、``./LocalMarkdownEditor.jsx``、``./DocumentExtractButton.jsx``、``@/features/tasks/useTaskStore.js``、``lucide-react``、``@/components/ui/dropdown-menu``、``./collaboratorPosition.js``、``@/components/files/FileUploadProgress.jsx``、``./images.js``、``@/components/files/uploadPolicy.js``、``@/lib/apiClient.js``、``../../runtime/backend/connection.js``、``@/components/files/FileManager.jsx``、``@/components/ui/dialog``、``@/context/useEventStore.jsx``、``react-i18next``、``react``、``react-dom``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/lang-markdown``、``y-codemirror.next``、``yjs``、``@/components/ui/button``、``@/lib/tools.jsx``、``@/lib/uuid.js``、``./DocumentCollaborators.jsx``、``@/components/ui/tooltip``、``@codemirror/language``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3041:3222:FUNCTION

.. js:function:: MarkdownDocumentEditor(props)

   渲染 ``MarkdownDocumentEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``72``—``74`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``props.mode === 'simple' ? <LocalMarkdownEditor {...props} /> : <CollaborativeMarkdownEditor {...props} />``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3222:38712:FUNCTION

.. js:function:: CollaborativeMarkdownEditor({ documentId, conversationId, onStatus, headerContainer, onOpenCollaboratorConversation })

   渲染 ``CollaborativeMarkdownEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``788`` 行。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4255:4318:FUNCTION

.. rubric:: ``useEffect callback @ 92``

.. code-block:: javascript

   useEffect callback @ 92()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``92``—``94`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4948:7510:FUNCTION

.. rubric:: ``uploadImages``

.. code-block:: javascript

   async uploadImages(files, directory)

实现 ``uploadImages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``107``—``161`` 行；所属函数 ``CollaborativeMarkdownEditor``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5331:5366:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``uploadImages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5392:7298:FUNCTION

.. rubric:: ``upload``

.. code-block:: javascript

   async upload(file)

实现 ``upload`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``119``—``153`` 行；所属函数 ``uploadImages``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``data``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error(t('document_image_limits'))``、``cause``。

**主要协作调用**：``isUploadAllowed``、``t``、``generateUUID``、``performance.now``、``setUploads``、``form.append``、``apiClient.post``、``update``、``Date.now``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5696:5876:FUNCTION

.. rubric:: ``setUploads callback @ 124``

.. code-block:: javascript

   setUploads callback @ 124(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``124``—``127`` 行；所属函数 ``upload``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.slice``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5914:6104:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``128``—``131`` 行；所属函数 ``upload``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5962:6076:FUNCTION

.. rubric:: ``setUploads callback @ 129``

.. code-block:: javascript

   setUploads callback @ 129(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``129``—``130`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6018:6075:FUNCTION

.. rubric:: ``previous.map callback @ 130``

.. code-block:: javascript

   previous.map callback @ 130(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``setUploads callback @ 129``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6454:6966:FUNCTION

.. rubric:: ``onUploadProgress``

.. code-block:: javascript

   onUploadProgress(progress)

处理 ``Upload Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``137``—``145`` 行；所属函数 ``upload``。

**参数**

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``Math.min``、``Math.max``、``performance.now``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7347:7367:FUNCTION

.. rubric:: ``setFilesRevision callback @ 155``

.. code-block:: javascript

   setFilesRevision callback @ 155(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``uploadImages``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7586:9128:FUNCTION

.. rubric:: ``useMemo callback @ 164``

.. code-block:: javascript

   useMemo callback @ 164()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``164``—``194`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7623:7702:FUNCTION

.. rubric:: ``list``

.. code-block:: javascript

   list(path)

实现 ``list`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``useMemo callback @ 164``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7731:7900:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(path)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``166``—``169`` 行；所属函数 ``useMemo callback @ 164``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.get(\x60/document/${documentId}/files/references\x60, { params: { path } })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7922:8142:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   remove(path, prepared)

移除与 ``remove`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``170``—``173`` 行；所属函数 ``useMemo callback @ 164``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``prepared``
   调用方传入的 ``prepared`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8162:8536:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move(path, destination)

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``174``—``182`` 行；所属函数 ``useMemo callback @ 164``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8557:8649:FUNCTION

.. rubric:: ``mkdir``

.. code-block:: javascript

   mkdir(parent, name)

实现 ``mkdir`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``useMemo callback @ 164``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8671:9115:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename(path, name)

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``184``—``193`` 行；所属函数 ``useMemo callback @ 164``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9182:9373:FUNCTION

.. rubric:: ``useEffect callback @ 198``

.. code-block:: javascript

   useEffect callback @ 198()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``198``—``201`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9296:9357:FUNCTION

.. rubric:: ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 199``

.. code-block:: javascript

   onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 199()

处理 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``199``—``200`` 行；所属函数 ``useEffect callback @ 198``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9336:9356:FUNCTION

.. rubric:: ``setFilesRevision callback @ 200``

.. code-block:: javascript

   setFilesRevision callback @ 200(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 199``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9421:14127:FUNCTION

.. rubric:: ``useEffect callback @ 204``

.. code-block:: javascript

   useEffect callback @ 204()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``204``—``301`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { editorRef.current = null; undoRef.current = null; resource.awareness.off('update', syncLocalColor); editor.destroy(); resource.undoManager = null; undoManager.destroy(); t…``。

**主要协作调用**：``undoManager.on``、``text.observe``、``update``、``EditorState.create``、``text.toString``、``EditorView.domEventHandlers``、``lineNumbers``、``highlightActiveLine``、``drawSelection``、``markdown``、``syntaxHighlighting``、``keymap.of``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9733:9836:FUNCTION

.. rubric:: ``undoManager.on callback @ 211``

.. code-block:: javascript

   undoManager.on callback @ 211({ origin })

实现 ``undoManager.on`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``211``—``213`` 行；所属函数 ``useEffect callback @ 204``。

**参数**

``{ origin }``
   调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoManager.stopCapturing``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9862:9896:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``useEffect callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContent``、``text.toString``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10185:10668:FUNCTION

.. rubric:: ``paste``

.. code-block:: javascript

   paste(event)

实现 ``paste`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``223``—``231`` 行；所属函数 ``useEffect callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``[...(event.clipboardData?.files || [])].filter``、``event.preventDefault``、``pasteImages.current``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10316:10389:FUNCTION

.. rubric:: ``[...(event.clipboardData?.files || [])].filter callback @ 224``

.. code-block:: javascript

   [...(event.clipboardData?.files || [])].filter callback @ 224(file)

作为 ``[...(event.clipboardData?.files || [])].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``224``—``225`` 行；所属函数 ``paste``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.type.startsWith``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13456:13636:FUNCTION

.. rubric:: ``syncLocalColor``

.. code-block:: javascript

   syncLocalColor()

实现 ``syncLocalColor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``284``—``287`` 行；所属函数 ``useEffect callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.getLocalState``、``editor.dom.style.setProperty``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13815:14119:FUNCTION

.. rubric:: ``returned callback @ 292``

.. code-block:: javascript

   returned callback @ 292()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``292``—``300`` 行；所属函数 ``useEffect callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.off``、``editor.destroy``、``undoManager.destroy``、``text.unobserve``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14173:14936:FUNCTION

.. rubric:: ``locateCollaborator``

.. code-block:: javascript

   locateCollaborator(person)

实现 ``locateCollaborator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``302``—``317`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``toast.info``、``t``、``setPane``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14506:14905:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 309``

.. code-block:: javascript

   requestAnimationFrame callback @ 309()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``309``—``315`` 行；所属函数 ``locateCollaborator``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``editorRef.current.dispatch``、``EditorView.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14961:15161:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   async handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``318``—``325`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15178:15822:FUNCTION

.. rubric:: ``useEffect callback @ 326``

.. code-block:: javascript

   useEffect callback @ 326()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``326``—``339`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('keydown', interceptSave, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15216:15666:FUNCTION

.. rubric:: ``interceptSave``

.. code-block:: javascript

   interceptSave(event)

实现 ``interceptSave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``327``—``336`` 行；所属函数 ``useEffect callback @ 326``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.key.toLowerCase``、``event.preventDefault``、``event.stopPropagation``、``save() .then(() => toast.success(t('documents_version_saved'))) .catch``、``save() .then``、``save``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15518:15567:FUNCTION

.. rubric:: ``save() .then callback @ 333``

.. code-block:: javascript

   save() .then callback @ 333()

处理 ``save() .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``333``—``333`` 行；所属函数 ``interceptSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15601:15638:FUNCTION

.. rubric:: ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 334``

.. code-block:: javascript

   save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 334(cause)

处理 ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``interceptSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15749:15814:FUNCTION

.. rubric:: ``returned callback @ 338``

.. code-block:: javascript

   returned callback @ 338()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``useEffect callback @ 326``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15856:16098:FUNCTION

.. rubric:: ``command``

.. code-block:: javascript

   command(callback)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``340``—``346`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPane``、``undoRef.current.stopCapturing``、``callback``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16143:16444:FUNCTION

.. rubric:: ``useCallback callback @ 347``

.. code-block:: javascript

   useCallback callback @ 347({ sourceContent, offset, expectedChecked })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``347``—``356`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ sourceContent, offset, expectedChecked }``
   调用方传入的 ``sourceContent, offset, expectedChecked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyDocumentTaskToggle``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16540:16569:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.undo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16633:16662:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``359``—``359`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.redo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16732:16767:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``360``—``360`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16869:16932:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``364``—``364`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17048:17109:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``369``—``369`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17239:17302:FUNCTION

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

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17382:17416:FUNCTION

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17495:17530:FUNCTION

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17595:17629:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``378``—``378`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17737:17806:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``382``—``382`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17851:18523:FUNCTION

.. rubric:: ``insertLink``

.. code-block:: javascript

   insertLink(event)

实现 ``insertLink`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``385``—``402`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``linkUrl.trim``、``/[<>\s]/.test``、``/^(?!https?:)[a-z][a-z0-9+.-]*:/i.test``、``toast.error``、``t``、``command``、``setLinkOpen``、``setLinkUrl``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18167:18449:FUNCTION

.. rubric:: ``command callback @ 392``

.. code-block:: javascript

   command callback @ 392(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``392``—``398`` 行；所属函数 ``insertLink``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``url.replaceAll('(', '%28').replaceAll``、``url.replaceAll``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20684:21634:FUNCTION

.. rubric:: ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 444``

.. code-block:: javascript

   [ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 444({ value, label, icon })

实现 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``444``—``461`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ value, label, icon }``
   调用方传入的 ``value, label, icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:21343:21363:FUNCTION

.. rubric:: ``onClick callback @ 454``

.. code-block:: javascript

   onClick callback @ 454()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``454``—``454`` 行；所属函数 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 444``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPane``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22251:22326:FUNCTION

.. rubric:: ``onDismissUpload callback @ 478``

.. code-block:: javascript

   onDismissUpload callback @ 478(id)

处理 ``Dismiss Upload`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``478``—``478`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22270:22325:FUNCTION

.. rubric:: ``setUploads callback @ 478``

.. code-block:: javascript

   setUploads callback @ 478(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``478``—``478`` 行；所属函数 ``onDismissUpload callback @ 478``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22300:22324:FUNCTION

.. rubric:: ``previous.filter callback @ 478``

.. code-block:: javascript

   previous.filter callback @ 478(item)

作为 ``previous.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``478``—``478`` 行；所属函数 ``setUploads callback @ 478``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22631:22656:FUNCTION

.. rubric:: ``onClick callback @ 486``

.. code-block:: javascript

   onClick callback @ 486()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``486``—``486`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22989:23254:FUNCTION

.. rubric:: ``onOpen callback @ 496``

.. code-block:: javascript

   onOpen callback @ 496(file)

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``496``—``501`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.path.startsWith``、``command``、``setFilesOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23086:23162:FUNCTION

.. rubric:: ``command callback @ 498``

.. code-block:: javascript

   command callback @ 498(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``498``—``498`` 行；所属函数 ``onOpen callback @ 496``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``encodeURI``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23359:23918:FUNCTION

.. rubric:: ``exportDocument``

.. code-block:: javascript

   async exportDocument(format)

实现 ``exportDocument`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``505``—``521`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExporting``、``save``、``apiClient.post``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``useTaskStore.getState().show``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24362:25334:FUNCTION

.. rubric:: ``tools.map callback @ 527``

.. code-block:: javascript

   tools.map callback @ 527({ label, icon, run })

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``527``—``545`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ label, icon, run }``
   调用方传入的 ``label, icon, run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24936:24969:FUNCTION

.. rubric:: ``onMouseDown callback @ 537``

.. code-block:: javascript

   onMouseDown callback @ 537(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``537``—``537`` 行；所属函数 ``tools.map callback @ 527``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25017:25035:FUNCTION

.. rubric:: ``onClick callback @ 538``

.. code-block:: javascript

   onClick callback @ 538()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``538``—``538`` 行；所属函数 ``tools.map callback @ 527``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25932:25965:FUNCTION

.. rubric:: ``onMouseDown callback @ 556``

.. code-block:: javascript

   onMouseDown callback @ 556(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``556``—``556`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26275:26344:FUNCTION

.. rubric:: ``(cardSpec?.directives || []).filter callback @ 562``

.. code-block:: javascript

   (cardSpec?.directives || []).filter callback @ 562(directive)

作为 ``(cardSpec?.directives || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``562``—``562`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``directive``
   调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26350:27176:FUNCTION

.. rubric:: ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 562``

.. code-block:: javascript

   (cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 562(directive)

作为 ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``562``—``572`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``directive``
   调用方传入的 ``directive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={directive.name} onSelect={() => command((view) => insertStudyBlock(view, localizedDirective))}> <span className="flex flex-col"> <span>{localizedDirective…``。

**主要协作调用**：``localizeCardDirective``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26606:26673:FUNCTION

.. rubric:: ``onSelect callback @ 565``

.. code-block:: javascript

   onSelect callback @ 565()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``565``—``565`` 行；所属函数 ``(cardSpec?.directives || []).filter((directive) => directive.insert?.opening && directive.insert?.closing).map callback @ 562``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26620:26672:FUNCTION

.. rubric:: ``command callback @ 565``

.. code-block:: javascript

   command callback @ 565(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``565``—``565`` 行；所属函数 ``onSelect callback @ 565``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``insertStudyBlock``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27368:27446:FUNCTION

.. rubric:: ``onSelect callback @ 574``

.. code-block:: javascript

   onSelect callback @ 574()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``574``—``574`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27382:27445:FUNCTION

.. rubric:: ``command callback @ 574``

.. code-block:: javascript

   command callback @ 574(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``574``—``574`` 行；所属函数 ``onSelect callback @ 574``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``insertTodoList``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:28911:28936:FUNCTION

.. rubric:: ``onClick callback @ 600``

.. code-block:: javascript

   onClick callback @ 600()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``600``—``600`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:29423:29447:FUNCTION

.. rubric:: ``onClick callback @ 609``

.. code-block:: javascript

   onClick callback @ 609()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``609``—``609`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30113:30154:FUNCTION

.. rubric:: ``onChange callback @ 621``

.. code-block:: javascript

   onChange callback @ 621(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``621``—``621`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLinkUrl``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30825:30845:FUNCTION

.. rubric:: ``onBeforeSubmit callback @ 634``

.. code-block:: javascript

   onBeforeSubmit callback @ 634()

处理 ``Before Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``634``—``634`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:31230:31264:FUNCTION

.. rubric:: ``onClick callback @ 643``

.. code-block:: javascript

   onClick callback @ 643()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``643``—``643`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadInput.current?.click``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32363:32642:FUNCTION

.. rubric:: ``['md', 'pdf', 'zip', 'png-zip'].map callback @ 665``

.. code-block:: javascript

   ['md', 'pdf', 'zip', 'png-zip'].map callback @ 665(format)

作为 ``['md', 'pdf', 'zip', 'png-zip'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``665``—``669`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32451:32484:FUNCTION

.. rubric:: ``onSelect callback @ 666``

.. code-block:: javascript

   onSelect callback @ 666()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``666``—``666`` 行；所属函数 ``['md', 'pdf', 'zip', 'png-zip'].map callback @ 665``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``exportDocument``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:33035:33059:FUNCTION

.. rubric:: ``onClick callback @ 678``

.. code-block:: javascript

   onClick callback @ 678()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``678``—``678`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:33729:33752:FUNCTION

.. rubric:: ``onClick callback @ 691``

.. code-block:: javascript

   onClick callback @ 691()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``691``—``691`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSave``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:34552:34578:FUNCTION

.. rubric:: ``onClick callback @ 706``

.. code-block:: javascript

   onClick callback @ 706()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``706``—``706`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:35199:35383:FUNCTION

.. rubric:: ``onChange callback @ 722``

.. code-block:: javascript

   onChange callback @ 722(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``722``—``726`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadImages``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36127:36202:FUNCTION

.. rubric:: ``onDismiss callback @ 741``

.. code-block:: javascript

   onDismiss callback @ 741(id)

处理 ``Dismiss`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``741``—``741`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36146:36201:FUNCTION

.. rubric:: ``setUploads callback @ 741``

.. code-block:: javascript

   setUploads callback @ 741(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``741``—``741`` 行；所属函数 ``onDismiss callback @ 741``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:36176:36200:FUNCTION

.. rubric:: ``previous.filter callback @ 741``

.. code-block:: javascript

   previous.filter callback @ 741(item)

作为 ``previous.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``741``—``741`` 行；所属函数 ``setUploads callback @ 741``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
