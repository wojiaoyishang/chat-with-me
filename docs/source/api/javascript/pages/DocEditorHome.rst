src/pages/DocEditorHome 模块
================================================================================

.. js:module:: src/pages/DocEditorHome

该模块是 React Router 页面入口，负责装配页面级状态和 Surface。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/pages/DocEditorHome.jsx``
* **模块标识**：``src/pages/DocEditorHome``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：63

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``date-fns``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``sonner``、``@/lib/virtualUrl.js``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/components/ui/alert-dialog``、``@/components/ui/field``、``@/components/ui/radio-group.tsx``、``@/components/sidebar/sidebarRegistry.js``、``@/pages/ChatWithEditor.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:1550:1888:FUNCTION

.. js:function:: createFilePicker(onSelect)

   创建与 ``File Picker`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``68`` 行。

   **参数**

   ``onSelect``
      调用方提供的事件回调。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``document.createElement``、``input.click``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:15452:17053:FUNCTION

.. js:function:: DiscardChangesDialog({open, onOpenChange, onConfirm, t})

   渲染 ``DiscardChangesDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``382``—``413`` 行。

   **参数**

   ``{open, onOpenChange, onConfirm, t}``
      调用方传入的 ``open, onOpenChange, onConfirm, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialog open={open} onOpenChange={onOpenChange}> <AlertDialogContent className="sm:max-w-md"> <AlertDialogHeader className="text-left"> <div className="flex items-center ga…``。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:17248:31020:FUNCTION

.. js:function:: DocEditorHome({ conversationId, documentId, onNewConversationId, onNewDocumentId, settingsRefreshVersions, })

   渲染 ``DocEditorHome`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``420``—``803`` 行。

   **参数**

   ``{ conversationId, documentId, onNewConversationId, onNewDocumentId, settingsRefreshVersions, }``
      调用方传入的 ``conversationId, documentId, onNewConversationId, onNewDocumentId, settingsRefreshVersions,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-h-screen relative"> <UnifiedLoadingScreen text={t("loading_dashboard_data")}/> </div> )``、``!isOpenDocEditorOpen ? ( <div className="min-h-screen bg-[#F9FAFB] p-6 relative"> <div className="max-w-7xl mx-auto space-y-8"> <div> <div className="flex justify-between items-ce…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useCallback``、``useEffect``、``uploadFiles.map``、``t``、``documentCards.map``。

   **内部回调数量**：19。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:1817:1866:FUNCTION

.. rubric:: ``anonymous callback @ 64``

.. code-block:: javascript

   anonymous callback @ 64(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``66`` 行；所属函数 ``createFilePicker``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:1943:4573:FUNCTION

.. rubric:: ``memo callback @ 71``

.. code-block:: javascript

   memo callback @ 71({onSettingsClick, onCardClick, item})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``71``—``133`` 行。

**参数**

``{onSettingsClick, onCardClick, item}``
   调用方提供的事件回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div onClick={() => { if (onCardClick) onCardClick(item); }} className="group cursor-pointer flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden hover:shado…``。

**主要协作调用**：``useTranslation``、``resolveResourceUrl``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:2143:2263:FUNCTION

.. rubric:: ``handleSettingsClick``

.. code-block:: javascript

   handleSettingsClick(e)

处理 ``Settings Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``82`` 行；所属函数 ``memo callback @ 71``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.stopPropagation``、``onSettingsClick``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:2313:2386:FUNCTION

.. rubric:: ``onClick callback @ 86``

.. code-block:: javascript

   onClick callback @ 86()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``86``—``88`` 行；所属函数 ``memo callback @ 71``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onCardClick``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:4617:6412:FUNCTION

.. rubric:: ``memo callback @ 136``

.. code-block:: javascript

   memo callback @ 136({file, onCancel})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``179`` 行。

**参数**

``{file, onCancel}``
   调用方传入的 ``file, onCancel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm relative transition-all duration-200 ${isError ? 'border-red-400' : ''}\x60} > <…``。

**主要协作调用**：``useTranslation``、``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:6457:7146:FUNCTION

.. rubric:: ``memo callback @ 182``

.. code-block:: javascript

   memo callback @ 182({show, t})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``199`` 行。

**参数**

``{show, t}``
   调用方传入的 ``show, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <AlertDialog open={show}> <AlertDialogContent> <AlertDialogHeader> <AlertDialogTitle>{t('processing_file_title')}</AlertDialogTitle> <AlertDialogDescription>{t('processing_file_…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7194:11638:FUNCTION

.. rubric:: ``memo callback @ 202``

.. code-block:: javascript

   memo callback @ 202({show, onClose, documentData, onSave, onDelete})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``202``—``296`` 行。

**参数**

``{show, onClose, documentData, onSave, onDelete}``
   调用方传入的 ``show, onClose, documentData, onSave, onDelete`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={show} onOpenChange={onClose}> <DialogContent> <DialogHeader> <DialogTitle className="flex items-center gap-2"> <Settings size={20} className="text-blue-600"/> {t('…``。

**主要协作调用**：``useTranslation``、``useState``、``useEffect``、``format``、``t``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7454:7519:FUNCTION

.. rubric:: ``useEffect callback @ 207``

.. code-block:: javascript

   useEffect callback @ 207()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``207``—``209`` 行；所属函数 ``memo callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentName``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7561:7730:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``211``—``216`` 行；所属函数 ``memo callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSave``、``onClose``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7757:7809:FUNCTION

.. rubric:: ``handleDelete``

.. code-block:: javascript

   handleDelete()

处理 ``Delete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``218``—``220`` 行；所属函数 ``memo callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeleteConfirmOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:8918:8956:FUNCTION

.. rubric:: ``onChange callback @ 243``

.. code-block:: javascript

   onChange callback @ 243(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``memo callback @ 202``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentName``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:11249:11443:FUNCTION

.. rubric:: ``onClick callback @ 286``

.. code-block:: javascript

   onClick callback @ 286()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``286``—``290`` 行；所属函数 ``memo callback @ 202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onDelete``、``setIsDeleteConfirmOpen``、``onClose``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:11685:15420:FUNCTION

.. rubric:: ``memo callback @ 299``

.. code-block:: javascript

   memo callback @ 299({show, onClose, onCreate})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``299``—``380`` 行。

**参数**

``{show, onClose, onCreate}``
   调用方传入的 ``show, onClose, onCreate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={show} onOpenChange={onClose}> <DialogContent> <DialogHeader> <DialogTitle className="flex items-center gap-2"> <Plus size={20} className="text-blue-600"/> {t('crea…``。

**主要协作调用**：``useTranslation``、``useState``、``t``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:11905:12028:FUNCTION

.. rubric:: ``handleCreate``

.. code-block:: javascript

   handleCreate()

处理 ``Create`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``305``—``310`` 行；所属函数 ``memo callback @ 299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onCreate``、``onClose``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:12783:12822:FUNCTION

.. rubric:: ``onChange callback @ 330``

.. code-block:: javascript

   onChange callback @ 330(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``memo callback @ 299``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentTitle``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:13402:13435:FUNCTION

.. rubric:: ``onClick callback @ 342``

.. code-block:: javascript

   onClick callback @ 342()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``memo callback @ 299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentType``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:14143:14177:FUNCTION

.. rubric:: ``onClick callback @ 353``

.. code-block:: javascript

   onClick callback @ 353()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``353``—``353`` 行；所属函数 ``memo callback @ 299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentType``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18528:19883:FUNCTION

.. rubric:: ``handleFileUpload``

.. code-block:: javascript

   handleFileUpload(newUploadFiles)

处理 ``File Upload`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``453``—``486`` 行；所属函数 ``DocEditorHome``。

**参数**

``newUploadFiles``
   调用方传入的 ``newUploadFiles`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setUploadFiles``、``newUploadFiles.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18624:18660:FUNCTION

.. rubric:: ``setUploadFiles callback @ 456``

.. code-block:: javascript

   setUploadFiles callback @ 456(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``456``—``456`` 行；所属函数 ``handleFileUpload``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18695:19875:FUNCTION

.. rubric:: ``newUploadFiles.forEach callback @ 458``

.. code-block:: javascript

   newUploadFiles.forEach callback @ 458(uploadFile)

作为 ``newUploadFiles.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``458``—``485`` 行；所属函数 ``handleFileUpload``。

**参数**

``uploadFile``
   调用方传入的 ``uploadFile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fileUpload``、``uploadIntervals.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18751:19134:FUNCTION

.. rubric:: ``handleProgressUpdate``

.. code-block:: javascript

   handleProgressUpdate(uploadId, progress)

处理 ``Progress Update`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``459``—``467`` 行；所属函数 ``newUploadFiles.forEach callback @ 458``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18809:19118:FUNCTION

.. rubric:: ``setUploadFiles callback @ 460``

.. code-block:: javascript

   setUploadFiles callback @ 460(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``460``—``466`` 行；所属函数 ``handleProgressUpdate``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``updated``。

**主要协作调用**：``prev.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18866:18888:FUNCTION

.. rubric:: ``prev.findIndex callback @ 461``

.. code-block:: javascript

   prev.findIndex callback @ 461(f)

实现 ``prev.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``461``—``461`` 行；所属函数 ``setUploadFiles callback @ 460``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19171:19277:FUNCTION

.. rubric:: ``handleComplete``

.. code-block:: javascript

   handleComplete()

处理 ``Complete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``469``—``472`` 行；所属函数 ``newUploadFiles.forEach callback @ 458``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsProcessing``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19311:19695:FUNCTION

.. rubric:: ``handleError``

.. code-block:: javascript

   handleError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``474``—``481`` 行；所属函数 ``newUploadFiles.forEach callback @ 458``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``、``setUploadFiles``、``uploadIntervals.current.delete``、``setIsProcessing``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19455:19559:FUNCTION

.. rubric:: ``setUploadFiles callback @ 476``

.. code-block:: javascript

   setUploadFiles callback @ 476(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``476``—``477`` 行；所属函数 ``handleError``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19492:19558:FUNCTION

.. rubric:: ``prev.map callback @ 477``

.. code-block:: javascript

   prev.map callback @ 477(f)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``setUploadFiles callback @ 476``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19939:20209:FUNCTION

.. rubric:: ``handleImportButtonClick``

.. code-block:: javascript

   handleImportButtonClick(e)

处理 ``Import Button Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``489``—``497`` 行；所属函数 ``DocEditorHome``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``、``createFilePicker``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20002:20201:FUNCTION

.. rubric:: ``createFilePicker callback @ 491``

.. code-block:: javascript

   createFilePicker callback @ 491(files)

创建与 ``File Picker`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``491``—``496`` 行；所属函数 ``handleImportButtonClick``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``processSelectedFiles``、``handleFileUpload``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20269:20315:FUNCTION

.. rubric:: ``useCallback callback @ 500``

.. code-block:: javascript

   useCallback callback @ 500()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``500``—``502`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsNewModalOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20375:21536:FUNCTION

.. rubric:: ``handleCreateNewDocument``

.. code-block:: javascript

   async handleCreateNewDocument(documentTitle, documentType)

处理 ``Create New Document`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``505``—``536`` 行；所属函数 ``DocEditorHome``。

**参数**

``documentTitle``
   调用方传入的 ``documentTitle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``documentType``
   调用方传入的 ``documentType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``setDocumentCards``、``toast.success``、``t``、``setIsNewModalOpen``、``console.error``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:21173:21199:FUNCTION

.. rubric:: ``setDocumentCards callback @ 528``

.. code-block:: javascript

   setDocumentCards callback @ 528(prev)

设置与 ``Document Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``528``—``528`` 行；所属函数 ``handleCreateNewDocument``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:21586:21696:FUNCTION

.. rubric:: ``handleOpenEditModal``

.. code-block:: javascript

   handleOpenEditModal(documentItem)

处理 ``Open Edit Modal`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``539``—``542`` 行；所属函数 ``DocEditorHome``。

**参数**

``documentItem``
   调用方传入的 ``documentItem`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedDocumentForEdit``、``setIsEditModalOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:21733:22655:FUNCTION

.. rubric:: ``handleSaveDocumentEdit``

.. code-block:: javascript

   async handleSaveDocumentEdit(documentId, newTitle)

处理 ``Save Document Edit`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``544``—``567`` 行；所属函数 ``DocEditorHome``。

**参数**

``documentId``
   Document 的公共 UUID。

``newTitle``
   调用方传入的 ``newTitle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``setDocumentCards``、``toast.success``、``t``、``setIsEditModalOpen``、``console.error``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22121:22326:FUNCTION

.. rubric:: ``setDocumentCards callback @ 555``

.. code-block:: javascript

   setDocumentCards callback @ 555(prev)

设置与 ``Document Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``555``—``558`` 行；所属函数 ``handleSaveDocumentEdit``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22176:22308:FUNCTION

.. rubric:: ``prev.map callback @ 556``

.. code-block:: javascript

   prev.map callback @ 556(item)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``556``—``557`` 行；所属函数 ``setDocumentCards callback @ 555``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date().toISOString``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22690:23242:FUNCTION

.. rubric:: ``handleDeleteDocument``

.. code-block:: javascript

   async handleDeleteDocument(documentId)

处理 ``Delete Document`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``569``—``581`` 行；所属函数 ``DocEditorHome``。

**参数**

``documentId``
   Document 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``、``setDocumentCards``、``toast.success``、``t``、``setIsEditModalOpen``、``console.error``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22845:22904:FUNCTION

.. rubric:: ``setDocumentCards callback @ 573``

.. code-block:: javascript

   setDocumentCards callback @ 573(prev)

设置与 ``Document Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``handleDeleteDocument``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22865:22903:FUNCTION

.. rubric:: ``prev.filter callback @ 573``

.. code-block:: javascript

   prev.filter callback @ 573(item)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``setDocumentCards callback @ 573``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23302:23802:FUNCTION

.. rubric:: ``useCallback callback @ 584``

.. code-block:: javascript

   useCallback callback @ 584(newDocumentId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``584``—``599`` 行；所属函数 ``DocEditorHome``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then((data) => { setTimeout(()…``、``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then``、``apiClient.get``、``onNewDocumentId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23437:23564:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then callback @ 587``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}`) .then callback @ 587(data)

处理 ``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``587``—``591`` 行；所属函数 ``useCallback callback @ 584``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23476:23548:FUNCTION

.. rubric:: ``setTimeout callback @ 588``

.. code-block:: javascript

   setTimeout callback @ 588()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``588``—``590`` 行；所属函数 ``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then callback @ 587``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocEditorUrl``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23585:23727:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then((data) => { setTimeout(()… callback @ 592``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}`) .then((data) => { setTimeout(()… callback @ 592(error)

实现 ``apiClient.get(\x60${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\x60) .then((data) => { setTimeout(()…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``592``—``594`` 行；所属函数 ``useCallback callback @ 584``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23874:24032:FUNCTION

.. rubric:: ``useCallback callback @ 602``

.. code-block:: javascript

   useCallback callback @ 602()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``602``—``607`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDiscardConfirmOpen``、``setIsOpenDocEditorOpen``、``onNewConversationId``、``onNewDocumentId``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24084:24268:FUNCTION

.. rubric:: ``useCallback callback @ 609``

.. code-block:: javascript

   useCallback callback @ 609()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``609``—``615`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsDiscardConfirmOpen``、``handleCloseDocEditorConfirm``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24289:24360:FUNCTION

.. rubric:: ``useEffect callback @ 617``

.. code-block:: javascript

   useEffect callback @ 617()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``617``—``619`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24413:24527:FUNCTION

.. rubric:: ``useEffect callback @ 622``

.. code-block:: javascript

   useEffect callback @ 622()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``622``—``626`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { uploadIntervals.current.forEach(cleanup => cleanup()); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24435:24520:FUNCTION

.. rubric:: ``returned callback @ 623``

.. code-block:: javascript

   returned callback @ 623()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``623``—``625`` 行；所属函数 ``useEffect callback @ 622``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadIntervals.current.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24488:24508:FUNCTION

.. rubric:: ``uploadIntervals.current.forEach callback @ 624``

.. code-block:: javascript

   uploadIntervals.current.forEach callback @ 624(cleanup)

作为 ``uploadIntervals.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``624``—``624`` 行；所属函数 ``returned callback @ 623``。

**参数**

``cleanup``
   调用方传入的 ``cleanup`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanup``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24563:25475:FUNCTION

.. rubric:: ``useEffect callback @ 629``

.. code-block:: javascript

   useEffect callback @ 629()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``629``—``651`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsLoading``、``requestInfo``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24626:25445:FUNCTION

.. rubric:: ``requestInfo``

.. code-block:: javascript

   async requestInfo()

实现 ``requestInfo`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``631``—``649`` 行；所属函数 ``useEffect callback @ 629``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``data.map``、``setDocumentCards``、``console.error``、``toast.error``、``t``、``setIsLoading``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24781:25130:FUNCTION

.. rubric:: ``data.map callback @ 634``

.. code-block:: javascript

   data.map callback @ 634(item)

作为 ``data.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``634``—``641`` 行；所属函数 ``requestInfo``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:25512:26163:FUNCTION

.. rubric:: ``useEffect callback @ 654``

.. code-block:: javascript

   useEffect callback @ 654()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``654``—``677`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unregister()``。

**主要协作调用**：``t``、``registerButton``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26125:26144:FUNCTION

.. rubric:: ``returned callback @ 673``

.. code-block:: javascript

   returned callback @ 673()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``673``—``673`` 行；所属函数 ``useEffect callback @ 654``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``unregister``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26261:26463:FUNCTION

.. rubric:: ``useEffect callback @ 680``

.. code-block:: javascript

   useEffect callback @ 680()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``680``—``686`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleOpenDocEditor``、``setIsOpenDocEditorOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26554:26833:FUNCTION

.. rubric:: ``uploadFiles.map callback @ 689``

.. code-block:: javascript

   uploadFiles.map callback @ 689(file)

作为 ``uploadFiles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``689``—``698`` 行；所属函数 ``DocEditorHome``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26660:26815:FUNCTION

.. rubric:: ``onCancel callback @ 693``

.. code-block:: javascript

   onCancel callback @ 693()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``693``—``696`` 行；所属函数 ``uploadFiles.map callback @ 689``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``uploadIntervals.current.get(file.id)``、``uploadIntervals.current.get``、``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26757:26799:FUNCTION

.. rubric:: ``setUploadFiles callback @ 695``

.. code-block:: javascript

   setUploadFiles callback @ 695(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``695``—``695`` 行；所属函数 ``onCancel callback @ 693``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26777:26798:FUNCTION

.. rubric:: ``prev.filter callback @ 695``

.. code-block:: javascript

   prev.filter callback @ 695(f)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``695``—``695`` 行；所属函数 ``setUploadFiles callback @ 695``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:28263:28602:FUNCTION

.. rubric:: ``documentCards.map callback @ 729``

.. code-block:: javascript

   documentCards.map callback @ 729(item)

作为 ``documentCards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``729``—``738`` 行；所属函数 ``DocEditorHome``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:28435:28522:FUNCTION

.. rubric:: ``onCardClick callback @ 733``

.. code-block:: javascript

   onCardClick callback @ 733(item)

处理 ``Card Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``733``—``735`` 行；所属函数 ``documentCards.map callback @ 729``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleOpenDocEditor``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:29995:30026:FUNCTION

.. rubric:: ``onClose callback @ 776``

.. code-block:: javascript

   onClose callback @ 776()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``776``—``776`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsEditModalOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:30287:30317:FUNCTION

.. rubric:: ``onClose callback @ 783``

.. code-block:: javascript

   onClose callback @ 783()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``783``—``783`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsNewModalOpen``。
