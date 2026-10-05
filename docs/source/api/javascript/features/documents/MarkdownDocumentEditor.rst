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
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：62

主要依赖
--------------------------------------------------------------------------------

``./collaboratorPosition.js``、``@/components/files/FileUploadProgress.jsx``、``./images.js``、``@/components/files/uploadPolicy.js``、``@/lib/apiClient.js``、``@/components/files/FileManager.jsx``、``@/components/ui/dialog``、``@/context/useEventStore.jsx``、``react-i18next``、``react``、``react-dom``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/lang-markdown``、``y-codemirror.next``、``yjs``、``@/components/ui/button``、``@/lib/tools.jsx``、``./DocumentCollaborators.jsx``、``@/components/ui/tooltip``、``lucide-react``、``@codemirror/language``、``@/components/markdown/MarkdownRenderer.jsx``、``sonner``、``@/components/ui/popover``、``@/components/ui/input``、``./DocumentHistory.jsx``、``./commands.js``、``./useCollaborativeDocument.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:2116:30618:FUNCTION

.. js:function:: MarkdownDocumentEditor({ documentId, onStatus, headerContainer })

   渲染 ``MarkdownDocumentEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``54``—``652`` 行。

   **参数**

   ``{ documentId, onStatus, headerContainer }``
      调用方传入的 ``documentId, onStatus, headerContainer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-col bg-background font-sans text-foreground"> {headerContainer ? createPortal(documentHeader, headerContainer) : documentHeader} <div cl…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useCollaborativeDocument``、``useIsMobile``、``useDeferredValue``、``useMemo``、``useEffect``、``t``、``status.includes``、``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…``、``createPortal``。

   **内部回调数量**：31。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3285:5774:FUNCTION

.. rubric:: ``uploadImages``

.. code-block:: javascript

   async uploadImages(files, directory)

实现 ``uploadImages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``78``—``132`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``directory``（默认值 ``'assets'``）
   调用方传入的 ``directory`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setUploading``、``insertUploadedImages``、``setFilesRevision``、``toast.error``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3657:3692:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``uploadImages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:3717:5570:FUNCTION

.. rubric:: ``upload``

.. code-block:: javascript

   async upload(file)

实现 ``upload`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``90``—``124`` 行；所属函数 ``uploadImages``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``data``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error(t('document_image_limits'))``、``cause``。

**主要协作调用**：``isUploadAllowed``、``t``、``crypto.randomUUID``、``performance.now``、``setUploads``、``form.append``、``apiClient.post``、``update``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4021:4198:FUNCTION

.. rubric:: ``setUploads callback @ 95``

.. code-block:: javascript

   setUploads callback @ 95(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``95``—``98`` 行；所属函数 ``upload``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.slice``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4235:4422:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``99``—``102`` 行；所属函数 ``upload``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4282:4395:FUNCTION

.. rubric:: ``setUploads callback @ 100``

.. code-block:: javascript

   setUploads callback @ 100(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``100``—``101`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4337:4394:FUNCTION

.. rubric:: ``previous.map callback @ 101``

.. code-block:: javascript

   previous.map callback @ 101(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``setUploads callback @ 100``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4766:5270:FUNCTION

.. rubric:: ``onUploadProgress``

.. code-block:: javascript

   onUploadProgress(progress)

处理 ``Upload Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``116`` 行；所属函数 ``upload``。

**参数**

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``Math.min``、``Math.max``、``performance.now``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5617:5637:FUNCTION

.. rubric:: ``setFilesRevision callback @ 126``

.. code-block:: javascript

   setFilesRevision callback @ 126(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``uploadImages``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5848:7359:FUNCTION

.. rubric:: ``useMemo callback @ 135``

.. code-block:: javascript

   useMemo callback @ 135()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``135``—``165`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5883:5962:FUNCTION

.. rubric:: ``list``

.. code-block:: javascript

   list(path)

实现 ``list`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``useMemo callback @ 135``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5990:6156:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(path)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``137``—``140`` 行；所属函数 ``useMemo callback @ 135``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.get(\x60/document/${documentId}/files/references\x60, { params: { path } })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6177:6394:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   remove(path, prepared)

移除与 ``remove`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``141``—``144`` 行；所属函数 ``useMemo callback @ 135``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``prepared``
   调用方传入的 ``prepared`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6413:6779:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move(path, destination)

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``145``—``153`` 行；所属函数 ``useMemo callback @ 135``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6799:6891:FUNCTION

.. rubric:: ``mkdir``

.. code-block:: javascript

   mkdir(parent, name)

实现 ``mkdir`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``useMemo callback @ 135``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6912:7347:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename(path, name)

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``155``—``164`` 行；所属函数 ``useMemo callback @ 135``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7410:7597:FUNCTION

.. rubric:: ``useEffect callback @ 169``

.. code-block:: javascript

   useEffect callback @ 169()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``169``—``172`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7522:7582:FUNCTION

.. rubric:: ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 170``

.. code-block:: javascript

   onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 170()

处理 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``170``—``171`` 行；所属函数 ``useEffect callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7561:7581:FUNCTION

.. rubric:: ``setFilesRevision callback @ 171``

.. code-block:: javascript

   setFilesRevision callback @ 171(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``171``—``171`` 行；所属函数 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 170``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7642:11884:FUNCTION

.. rubric:: ``useEffect callback @ 175``

.. code-block:: javascript

   useEffect callback @ 175()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``175``—``264`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { editorRef.current = null; undoRef.current = null; resource.awareness.off('update', syncLocalColor); editor.destroy(); undoManager.destroy(); text.unobserve(update); }``。

**主要协作调用**：``text.observe``、``update``、``EditorState.create``、``text.toString``、``EditorView.domEventHandlers``、``lineNumbers``、``highlightActiveLine``、``drawSelection``、``markdown``、``syntaxHighlighting``、``keymap.of``、``yCollab``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7808:7842:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``useEffect callback @ 175``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContent``、``text.toString``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8123:8597:FUNCTION

.. rubric:: ``paste``

.. code-block:: javascript

   paste(event)

实现 ``paste`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``196`` 行；所属函数 ``useEffect callback @ 175``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``[...(event.clipboardData?.files || [])].filter``、``event.preventDefault``、``pasteImages.current``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8252:8324:FUNCTION

.. rubric:: ``[...(event.clipboardData?.files || [])].filter callback @ 189``

.. code-block:: javascript

   [...(event.clipboardData?.files || [])].filter callback @ 189(file)

作为 ``[...(event.clipboardData?.files || [])].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``189``—``190`` 行；所属函数 ``paste``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.type.startsWith``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11271:11448:FUNCTION

.. rubric:: ``syncLocalColor``

.. code-block:: javascript

   syncLocalColor()

实现 ``syncLocalColor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``248``—``251`` 行；所属函数 ``useEffect callback @ 175``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.getLocalState``、``editor.dom.style.setProperty``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11622:11877:FUNCTION

.. rubric:: ``returned callback @ 256``

.. code-block:: javascript

   returned callback @ 256()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``256``—``263`` 行；所属函数 ``useEffect callback @ 175``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.off``、``editor.destroy``、``undoManager.destroy``、``text.unobserve``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11929:12677:FUNCTION

.. rubric:: ``locateCollaborator``

.. code-block:: javascript

   locateCollaborator(person)

实现 ``locateCollaborator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``280`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``toast.info``、``t``、``setPane``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12255:12648:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 272``

.. code-block:: javascript

   requestAnimationFrame callback @ 272()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``272``—``278`` 行；所属函数 ``locateCollaborator``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``editorRef.current.dispatch``、``EditorView.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12701:12894:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   async handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``281``—``288`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12910:13541:FUNCTION

.. rubric:: ``useEffect callback @ 289``

.. code-block:: javascript

   useEffect callback @ 289()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``289``—``302`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('keydown', interceptSave, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12947:13388:FUNCTION

.. rubric:: ``interceptSave``

.. code-block:: javascript

   interceptSave(event)

实现 ``interceptSave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``290``—``299`` 行；所属函数 ``useEffect callback @ 289``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.key.toLowerCase``、``event.preventDefault``、``event.stopPropagation``、``save() .then(() => toast.success(t('documents_version_saved'))) .catch``、``save() .then``、``save``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13243:13292:FUNCTION

.. rubric:: ``save() .then callback @ 296``

.. code-block:: javascript

   save() .then callback @ 296()

处理 ``save() .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``interceptSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13325:13362:FUNCTION

.. rubric:: ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 297``

.. code-block:: javascript

   save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 297(cause)

处理 ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``interceptSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13469:13534:FUNCTION

.. rubric:: ``returned callback @ 301``

.. code-block:: javascript

   returned callback @ 301()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``useEffect callback @ 289``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13574:13810:FUNCTION

.. rubric:: ``command``

.. code-block:: javascript

   command(callback)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``303``—``309`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPane``、``undoRef.current.stopCapturing``、``callback``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13891:13920:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.undo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13983:14012:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.redo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14081:14116:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14214:14277:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14388:14449:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``322``—``322`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14574:14637:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``327``—``327`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14715:14749:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14827:14862:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14926:14960:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``331``—``331`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15064:15133:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``335``—``335`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15175:15830:FUNCTION

.. rubric:: ``insertLink``

.. code-block:: javascript

   insertLink(event)

实现 ``insertLink`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``338``—``355`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``linkUrl.trim``、``/[<>\s]/.test``、``/^(?!https?:)[a-z][a-z0-9+.-]*:/i.test``、``toast.error``、``t``、``command``、``setLinkOpen``、``setLinkUrl``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:15484:15760:FUNCTION

.. rubric:: ``command callback @ 345``

.. code-block:: javascript

   command callback @ 345(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``345``—``351`` 行；所属函数 ``insertLink``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``url.replaceAll('(', '%28').replaceAll``、``url.replaceAll``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17837:18770:FUNCTION

.. rubric:: ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 393``

.. code-block:: javascript

   [ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 393({ value, label, icon })

实现 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``393``—``410`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``{ value, label, icon }``
   调用方传入的 ``value, label, icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18486:18506:FUNCTION

.. rubric:: ``onClick callback @ 403``

.. code-block:: javascript

   onClick callback @ 403()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``403``—``403`` 行；所属函数 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 393``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPane``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19638:19663:FUNCTION

.. rubric:: ``onClick callback @ 434``

.. code-block:: javascript

   onClick callback @ 434()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``434``—``434`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19986:20246:FUNCTION

.. rubric:: ``onOpen callback @ 444``

.. code-block:: javascript

   onOpen callback @ 444(file)

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``444``—``449`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.path.startsWith``、``command``、``setFilesOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20081:20157:FUNCTION

.. rubric:: ``command callback @ 446``

.. code-block:: javascript

   command callback @ 446(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``446``—``446`` 行；所属函数 ``onOpen callback @ 444``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``encodeURI``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20702:21656:FUNCTION

.. rubric:: ``tools.map callback @ 457``

.. code-block:: javascript

   tools.map callback @ 457({ label, icon, run })

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``457``—``475`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``{ label, icon, run }``
   调用方传入的 ``label, icon, run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:21266:21299:FUNCTION

.. rubric:: ``onMouseDown callback @ 467``

.. code-block:: javascript

   onMouseDown callback @ 467(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``467``—``467`` 行；所属函数 ``tools.map callback @ 457``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:21346:21364:FUNCTION

.. rubric:: ``onClick callback @ 468``

.. code-block:: javascript

   onClick callback @ 468()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``468``—``468`` 行；所属函数 ``tools.map callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:22836:22861:FUNCTION

.. rubric:: ``onClick callback @ 496``

.. code-block:: javascript

   onClick callback @ 496()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``496``—``496`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23339:23363:FUNCTION

.. rubric:: ``onClick callback @ 505``

.. code-block:: javascript

   onClick callback @ 505()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``505``—``505`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24017:24058:FUNCTION

.. rubric:: ``onChange callback @ 517``

.. code-block:: javascript

   onChange callback @ 517(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``517``—``517`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLinkUrl``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24915:24949:FUNCTION

.. rubric:: ``onClick callback @ 535``

.. code-block:: javascript

   onClick callback @ 535()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``535``—``535`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadInput.current?.click``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25355:25379:FUNCTION

.. rubric:: ``onClick callback @ 545``

.. code-block:: javascript

   onClick callback @ 545()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``545``—``545`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26036:26059:FUNCTION

.. rubric:: ``onClick callback @ 558``

.. code-block:: javascript

   onClick callback @ 558()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``558``—``558`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSave``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26844:26870:FUNCTION

.. rubric:: ``onClick callback @ 573``

.. code-block:: javascript

   onClick callback @ 573()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27475:27655:FUNCTION

.. rubric:: ``onChange callback @ 589``

.. code-block:: javascript

   onChange callback @ 589(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``589``—``593`` 行；所属函数 ``MarkdownDocumentEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadImages``。
