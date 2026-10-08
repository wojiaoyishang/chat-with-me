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
* **局部函数与匿名回调**：84

主要依赖
--------------------------------------------------------------------------------

``./useEscDrafts.js``、``./escDecorations.js``、``@/lib/tools.jsx``、``./LocalMarkdownEditor.jsx``、``@/features/tasks/useTaskStore.js``、``lucide-react``、``@/components/ui/dropdown-menu``、``./collaboratorPosition.js``、``@/components/files/FileUploadProgress.jsx``、``./images.js``、``@/components/files/uploadPolicy.js``、``@/lib/apiClient.js``、``@/components/files/FileManager.jsx``、``@/components/ui/dialog``、``@/context/useEventStore.jsx``、``react-i18next``、``react``、``react-dom``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/lang-markdown``、``y-codemirror.next``、``yjs``、``@/components/ui/button``、``./DocumentCollaborators.jsx``、``@/components/ui/tooltip``、``@codemirror/language``、``@/components/markdown/MarkdownRenderer.jsx``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:2630:2807:FUNCTION

.. js:function:: MarkdownDocumentEditor(props)

   渲染 ``MarkdownDocumentEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``66``—``68`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``props.mode === 'simple' ? <LocalMarkdownEditor {...props} /> : <CollaborativeMarkdownEditor {...props} />``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:2807:38468:FUNCTION

.. js:function:: CollaborativeMarkdownEditor({ documentId, onStatus, headerContainer, onOpenCollaboratorConversation })

   渲染 ``CollaborativeMarkdownEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``814`` 行。

   **参数**

   ``{ documentId, onStatus, headerContainer, onOpenCollaboratorConversation }``
      调用方传入的 ``documentId, onStatus, headerContainer, onOpenCollaboratorConversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-col bg-background font-sans text-foreground"> {headerContainer ? createPortal(documentHeader, headerContainer) : documentHeader} <div cl…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useCollaborativeDocument``、``useIsMobile``、``useEscDrafts``、``useMemo``、``useDeferredValue``、``useEffect``、``t``、``status.includes``、``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…``。

   **内部回调数量**：38。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4066:4174:FUNCTION

.. rubric:: ``anonymous callback @ 95``

.. code-block:: javascript

   anonymous callback @ 95(row, action)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``95``—``96`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copyTextToClipboard``、``actEsc``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4251:5060:FUNCTION

.. rubric:: ``useMemo callback @ 98``

.. code-block:: javascript

   useMemo callback @ 98()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``114`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``streams.map((row) => { const key = \x60${documentId}:${row.streamId}\x60; if (!escAnchors.current.has(key)) { const index = Array.from(resource.text.toString()).slice(0, row.position).j…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``streams.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:4320:5052:FUNCTION

.. rubric:: ``streams.map callback @ 100``

.. code-block:: javascript

   streams.map callback @ 100(row)

作为 ``streams.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``113`` 行；所属函数 ``useMemo callback @ 98``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...row, displayPosition: position?.index ?? content.length, owned: Number(resource.metadata.viewerUserId) === Number(row.userId), busy: escBusy === row.streamId, }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``escAnchors.current.has``、``Array.from(resource.text.toString()).slice(0, row.position).join``、``Array.from(resource.text.toString()).slice``、``Array.from``、``resource.text.toString``、``escAnchors.current.set``、``Y.createRelativePositionFromTypeIndex``、``Y.createAbsolutePositionFromRelativePosition``、``escAnchors.current.get``、``Number``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5148:5821:FUNCTION

.. rubric:: ``useMemo callback @ 115``

.. code-block:: javascript

   useMemo callback @ 115()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``115``—``129`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ value, ranges }``。

**主要协作调用**：``[...inlineDrafts].sort``、``Math.min``、``ranges.push``、``value.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5261:5308:FUNCTION

.. rubric:: ``[...inlineDrafts].sort callback @ 118``

.. code-block:: javascript

   [...inlineDrafts].sort callback @ 118(a, b)

作为 ``[...inlineDrafts].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``useMemo callback @ 115``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:5978:6038:FUNCTION

.. rubric:: ``useMemo callback @ 132``

.. code-block:: javascript

   useMemo callback @ 132()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6233:8212:FUNCTION

.. rubric:: ``useEffect callback @ 137``

.. code-block:: javascript

   useEffect callback @ 137()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``137``—``175`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``inlineDrafts.filter``、``writing.some``、``escSeen.current.add``、``writing.at``、``setEscDrafts.of``、``[...editor.dom.querySelectorAll('.cm-esc-draft')].some``、``editor.dom.querySelectorAll``、``effects.push``、``EditorView.scrollIntoView``、``editor.dispatch``、``requestAnimationFrame``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6356:6391:FUNCTION

.. rubric:: ``inlineDrafts.filter callback @ 140``

.. code-block:: javascript

   inlineDrafts.filter callback @ 140(row)

作为 ``inlineDrafts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6429:6472:FUNCTION

.. rubric:: ``writing.some callback @ 141``

.. code-block:: javascript

   writing.some callback @ 141(row)

作为 ``writing.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``escSeen.current.has``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:6805:6856:FUNCTION

.. rubric:: ``[...editor.dom.querySelectorAll('.cm-esc-draft')].some callback @ 148``

.. code-block:: javascript

   [...editor.dom.querySelectorAll('.cm-esc-draft')].some callback @ 148(node)

作为 ``[...editor.dom.querySelectorAll('.cm-esc-draft')].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7106:8154:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 152``

.. code-block:: javascript

   requestAnimationFrame callback @ 152()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``152``—``173`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``editor.requestMeasure``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7258:8004:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``155``—``168`` 行；所属函数 ``requestAnimationFrame callback @ 152``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``rect.bottom > viewport.bottom - 28 ? rect.bottom - viewport.bottom + 28 : rect.top < viewport.top + 20 ? rect.top - viewport.top - 20 : 0``。

**主要协作调用**：``[...editor.dom.querySelectorAll('.cm-esc-draft')].find``、``editor.dom.querySelectorAll``、``widget?.querySelector``、``cursor.getBoundingClientRect``、``editor.scrollDOM.getBoundingClientRect``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:7357:7433:FUNCTION

.. rubric:: ``[...editor.dom.querySelectorAll('.cm-esc-draft')].find callback @ 157``

.. code-block:: javascript

   [...editor.dom.querySelectorAll('.cm-esc-draft')].find callback @ 157(node)

作为 ``[...editor.dom.querySelectorAll('.cm-esc-draft')].find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``read``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8028:8127:FUNCTION

.. rubric:: ``write``

.. code-block:: javascript

   write(delta)

实现 ``write`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``171`` 行；所属函数 ``requestAnimationFrame callback @ 152``。

**参数**

``delta``
   调用方传入的 ``delta`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8171:8205:FUNCTION

.. rubric:: ``returned callback @ 174``

.. code-block:: javascript

   returned callback @ 174()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8255:10744:FUNCTION

.. rubric:: ``uploadImages``

.. code-block:: javascript

   async uploadImages(files, directory)

实现 ``uploadImages`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``176``—``230`` 行；所属函数 ``CollaborativeMarkdownEditor``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8627:8662:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``uploadImages``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8687:10540:FUNCTION

.. rubric:: ``upload``

.. code-block:: javascript

   async upload(file)

实现 ``upload`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``188``—``222`` 行；所属函数 ``uploadImages``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:8991:9168:FUNCTION

.. rubric:: ``setUploads callback @ 193``

.. code-block:: javascript

   setUploads callback @ 193(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``193``—``196`` 行；所属函数 ``upload``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.slice``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9205:9392:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``197``—``200`` 行；所属函数 ``upload``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploads``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9252:9365:FUNCTION

.. rubric:: ``setUploads callback @ 198``

.. code-block:: javascript

   setUploads callback @ 198(previous)

设置与 ``Uploads`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``198``—``199`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9307:9364:FUNCTION

.. rubric:: ``previous.map callback @ 199``

.. code-block:: javascript

   previous.map callback @ 199(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``setUploads callback @ 198``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:9736:10240:FUNCTION

.. rubric:: ``onUploadProgress``

.. code-block:: javascript

   onUploadProgress(progress)

处理 ``Upload Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``206``—``214`` 行；所属函数 ``upload``。

**参数**

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``Math.min``、``Math.max``、``performance.now``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10587:10607:FUNCTION

.. rubric:: ``setFilesRevision callback @ 224``

.. code-block:: javascript

   setFilesRevision callback @ 224(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``224``—``224`` 行；所属函数 ``uploadImages``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10818:12329:FUNCTION

.. rubric:: ``useMemo callback @ 233``

.. code-block:: javascript

   useMemo callback @ 233()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``233``—``263`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10853:10932:FUNCTION

.. rubric:: ``list``

.. code-block:: javascript

   list(path)

实现 ``list`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``useMemo callback @ 233``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:10960:11126:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(path)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``235``—``238`` 行；所属函数 ``useMemo callback @ 233``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.get(\x60/document/${documentId}/files/references\x60, { params: { path } })``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``save``、``apiClient.get``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11147:11364:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   remove(path, prepared)

移除与 ``remove`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``239``—``242`` 行；所属函数 ``useMemo callback @ 233``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``prepared``
   调用方传入的 ``prepared`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11383:11749:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move(path, destination)

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``243``—``251`` 行；所属函数 ``useMemo callback @ 233``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11769:11861:FUNCTION

.. rubric:: ``mkdir``

.. code-block:: javascript

   mkdir(parent, name)

实现 ``mkdir`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``useMemo callback @ 233``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:11882:12317:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename(path, name)

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``253``—``262`` 行；所属函数 ``useMemo callback @ 233``。

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

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12380:12567:FUNCTION

.. rubric:: ``useEffect callback @ 267``

.. code-block:: javascript

   useEffect callback @ 267()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``267``—``270`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12492:12552:FUNCTION

.. rubric:: ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 268``

.. code-block:: javascript

   onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 268()

处理 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``268``—``269`` 行；所属函数 ``useEffect callback @ 267``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12531:12551:FUNCTION

.. rubric:: ``setFilesRevision callback @ 269``

.. code-block:: javascript

   setFilesRevision callback @ 269(value)

设置与 ``Files Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``269``—``269`` 行；所属函数 ``onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then callback @ 268``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12612:17610:FUNCTION

.. rubric:: ``useEffect callback @ 273``

.. code-block:: javascript

   useEffect callback @ 273()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``273``—``377`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { editorRef.current = null; undoRef.current = null; resource.awareness.off('update', syncLocalColor); editor.destroy(); undoManager.destroy(); text.unobserve(update); }``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``text.observe``、``update``、``EditorState.create``、``text.toString``、``EditorView.domEventHandlers``、``escDecorations``、``lineNumbers``、``highlightActiveLine``、``drawSelection``、``markdown``、``syntaxHighlighting``、``keymap.of``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:12778:12812:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContent``、``text.toString``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13093:13277:FUNCTION

.. rubric:: ``wheel``

.. code-block:: javascript

   wheel(event)

实现 ``wheel`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``286``—``289`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13278:13440:FUNCTION

.. rubric:: ``touchstart``

.. code-block:: javascript

   touchstart()

实现 ``touchstart`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``290``—``293`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13441:13653:FUNCTION

.. rubric:: ``pointerdown``

.. code-block:: javascript

   pointerdown(event)

实现 ``pointerdown`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``294``—``297`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``。

**主要协作调用**：``event.target.closest``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13654:14128:FUNCTION

.. rubric:: ``paste``

.. code-block:: javascript

   paste(event)

实现 ``paste`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``298``—``306`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``[...(event.clipboardData?.files || [])].filter``、``event.preventDefault``、``pasteImages.current``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:13783:13855:FUNCTION

.. rubric:: ``[...(event.clipboardData?.files || [])].filter callback @ 299``

.. code-block:: javascript

   [...(event.clipboardData?.files || [])].filter callback @ 299(file)

作为 ``[...(event.clipboardData?.files || [])].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``299``—``300`` 行；所属函数 ``paste``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.type.startsWith``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:14189:14239:FUNCTION

.. rubric:: ``escDecorations callback @ 308``

.. code-block:: javascript

   escDecorations callback @ 308(row, action)

实现 ``escDecorations`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``308``—``308`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``escActions.current``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:16920:17097:FUNCTION

.. rubric:: ``syncLocalColor``

.. code-block:: javascript

   syncLocalColor()

实现 ``syncLocalColor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``360``—``363`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.getLocalState``、``editor.dom.style.setProperty``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17348:17603:FUNCTION

.. rubric:: ``returned callback @ 369``

.. code-block:: javascript

   returned callback @ 369()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``369``—``376`` 行；所属函数 ``useEffect callback @ 273``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resource.awareness.off``、``editor.destroy``、``undoManager.destroy``、``text.unobserve``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17655:18403:FUNCTION

.. rubric:: ``locateCollaborator``

.. code-block:: javascript

   locateCollaborator(person)

实现 ``locateCollaborator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``378``—``393`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``toast.info``、``t``、``setPane``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:17981:18374:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 385``

.. code-block:: javascript

   requestAnimationFrame callback @ 385()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``385``—``391`` 行；所属函数 ``locateCollaborator``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``collaboratorPosition``、``editorRef.current.dispatch``、``EditorView.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18427:18620:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   async handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``394``—``401`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18636:19267:FUNCTION

.. rubric:: ``useEffect callback @ 402``

.. code-block:: javascript

   useEffect callback @ 402()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``402``—``415`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('keydown', interceptSave, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18673:19114:FUNCTION

.. rubric:: ``interceptSave``

.. code-block:: javascript

   interceptSave(event)

实现 ``interceptSave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``403``—``412`` 行；所属函数 ``useEffect callback @ 402``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.key.toLowerCase``、``event.preventDefault``、``event.stopPropagation``、``save() .then(() => toast.success(t('documents_version_saved'))) .catch``、``save() .then``、``save``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:18969:19018:FUNCTION

.. rubric:: ``save() .then callback @ 409``

.. code-block:: javascript

   save() .then callback @ 409()

处理 ``save() .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``409``—``409`` 行；所属函数 ``interceptSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19051:19088:FUNCTION

.. rubric:: ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 410``

.. code-block:: javascript

   save() .then(() => toast.success(t('documents_version_saved'))) .catch callback @ 410(cause)

处理 ``save() .then(() => toast.success(t('documents_version_saved'))) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``410``—``410`` 行；所属函数 ``interceptSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19195:19260:FUNCTION

.. rubric:: ``returned callback @ 414``

.. code-block:: javascript

   returned callback @ 414()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``414``—``414`` 行；所属函数 ``useEffect callback @ 402``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19300:19536:FUNCTION

.. rubric:: ``command``

.. code-block:: javascript

   command(callback)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``416``—``422`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPane``、``undoRef.current.stopCapturing``、``callback``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19617:19646:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``424``—``424`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.undo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19709:19738:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run()

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``undoRef.current.redo``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19807:19842:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``426``—``426`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:19940:20003:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20114:20175:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``435``—``435`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20300:20363:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``440``—``440`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20441:20475:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``442``—``442`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20553:20588:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``443``—``443`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20652:20686:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``444``—``444`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20790:20859:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   run(view)

实现 ``run`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``448``—``448`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:20901:21556:FUNCTION

.. rubric:: ``insertLink``

.. code-block:: javascript

   insertLink(event)

实现 ``insertLink`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``451``—``468`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``linkUrl.trim``、``/[<>\s]/.test``、``/^(?!https?:)[a-z][a-z0-9+.-]*:/i.test``、``toast.error``、``t``、``command``、``setLinkOpen``、``setLinkUrl``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:21210:21486:FUNCTION

.. rubric:: ``command callback @ 458``

.. code-block:: javascript

   command callback @ 458(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``458``—``464`` 行；所属函数 ``insertLink``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``url.replaceAll('(', '%28').replaceAll``、``url.replaceAll``、``t``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:23675:24608:FUNCTION

.. rubric:: ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 510``

.. code-block:: javascript

   [ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 510({ value, label, icon })

实现 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``510``—``527`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ value, label, icon }``
   调用方传入的 ``value, label, icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:24324:24344:FUNCTION

.. rubric:: ``onClick callback @ 520``

.. code-block:: javascript

   onClick callback @ 520()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``520``—``520`` 行；所属函数 ``[ { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> }, { value: 'split', label: t('docu… callback @ 510``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPane``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25476:25501:FUNCTION

.. rubric:: ``onClick callback @ 551``

.. code-block:: javascript

   onClick callback @ 551()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``551``—``551`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25824:26084:FUNCTION

.. rubric:: ``onOpen callback @ 561``

.. code-block:: javascript

   onOpen callback @ 561(file)

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``561``—``566`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``file.path.startsWith``、``command``、``setFilesOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:25919:25995:FUNCTION

.. rubric:: ``command callback @ 563``

.. code-block:: javascript

   command callback @ 563(view)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``563``—``563`` 行；所属函数 ``onOpen callback @ 561``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``encodeURI``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:26185:26728:FUNCTION

.. rubric:: ``exportDocument``

.. code-block:: javascript

   async exportDocument(format)

实现 ``exportDocument`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``570``—``586`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExporting``、``save``、``apiClient.post``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``useTaskStore.getState().show``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27166:28120:FUNCTION

.. rubric:: ``tools.map callback @ 592``

.. code-block:: javascript

   tools.map callback @ 592({ label, icon, run })

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``592``—``610`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``{ label, icon, run }``
   调用方传入的 ``label, icon, run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27730:27763:FUNCTION

.. rubric:: ``onMouseDown callback @ 602``

.. code-block:: javascript

   onMouseDown callback @ 602(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``602``—``602`` 行；所属函数 ``tools.map callback @ 592``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:27810:27828:FUNCTION

.. rubric:: ``onClick callback @ 603``

.. code-block:: javascript

   onClick callback @ 603()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``603``—``603`` 行；所属函数 ``tools.map callback @ 592``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:29300:29325:FUNCTION

.. rubric:: ``onClick callback @ 631``

.. code-block:: javascript

   onClick callback @ 631()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``631``—``631`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:29803:29827:FUNCTION

.. rubric:: ``onClick callback @ 640``

.. code-block:: javascript

   onClick callback @ 640()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``640``—``640`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageLink``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:30481:30522:FUNCTION

.. rubric:: ``onChange callback @ 652``

.. code-block:: javascript

   onChange callback @ 652(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``652``—``652`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLinkUrl``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:31380:31414:FUNCTION

.. rubric:: ``onClick callback @ 671``

.. code-block:: javascript

   onClick callback @ 671()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``671``—``671`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadInput.current?.click``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32480:32755:FUNCTION

.. rubric:: ``['md', 'pdf', 'zip'].map callback @ 693``

.. code-block:: javascript

   ['md', 'pdf', 'zip'].map callback @ 693(format)

作为 ``['md', 'pdf', 'zip'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``693``—``697`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``format``
   调用方传入的 ``format`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:32567:32600:FUNCTION

.. rubric:: ``onSelect callback @ 694``

.. code-block:: javascript

   onSelect callback @ 694()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``694``—``694`` 行；所属函数 ``['md', 'pdf', 'zip'].map callback @ 693``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``exportDocument``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:33139:33163:FUNCTION

.. rubric:: ``onClick callback @ 706``

.. code-block:: javascript

   onClick callback @ 706()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``706``—``706`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilesOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:33820:33843:FUNCTION

.. rubric:: ``onClick callback @ 719``

.. code-block:: javascript

   onClick callback @ 719()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``719``—``719`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSave``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:34628:34654:FUNCTION

.. rubric:: ``onClick callback @ 734``

.. code-block:: javascript

   onClick callback @ 734()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``734``—``734`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHistoryOpen``。

.. CWM-AST-FUNCTION src/features/documents/MarkdownDocumentEditor.jsx:35259:35439:FUNCTION

.. rubric:: ``onChange callback @ 750``

.. code-block:: javascript

   onChange callback @ 750(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``750``—``754`` 行；所属函数 ``CollaborativeMarkdownEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadImages``。
