src/pages/DocEditorHome 模块
==========================

.. js:module:: src/pages/DocEditorHome

该模块是 React Router 页面入口，负责装配页面级状态和 Surface。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/pages/DocEditorHome.jsx``
* **模块标识**：``src/pages/DocEditorHome``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：63

主要依赖
--------

``react``、``lucide-react``、``react-i18next``、``date-fns``、``framer-motion``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``sonner``、``@/lib/virtualUrl.js``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/label``、``@/components/ui/dialog``、``@/components/ui/alert-dialog``、``@/components/ui/field``、``@/components/ui/radio-group.tsx``、``@/components/sidebar/sidebarRegistry.js``、``@/pages/ChatWithEditor.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:1691:2029:FUNCTION

.. js:function:: createFilePicker(onSelect)

   创建与 ``File Picker`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``63``—``72`` 行。

   **参数**

   ``onSelect``
      调用方提供的事件回调。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``document.createElement``、``input.click``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:15593:17194:FUNCTION

.. js:function:: DiscardChangesDialog({open, onOpenChange, onConfirm, t})

   渲染 ``DiscardChangesDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``386``—``417`` 行。

   **参数**

   ``{open, onOpenChange, onConfirm, t}``
      调用方传入的 ``open, onOpenChange, onConfirm, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialog open={open} onOpenChange={onOpenChange}> <AlertDialogContent className="sm:max-w-md"> <AlertDialogHeader className="text-left"> <div className="flex items-center ga…``。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:17389:31181:FUNCTION

.. js:function:: DocEditorHome({ conversationId, documentId, onNewConversationId, onNewDocumentId, settingsRefreshVersions, })

   渲染 ``DocEditorHome`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``424``—``807`` 行。

   **参数**

   ``{ conversationId, documentId, onNewConversationId, onNewDocumentId, settingsRefreshVersions, }``
      调用方传入的 `` conversationId, documentId, onNewConversationId, onNewDocumentId, settingsRefreshVersions, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-h-screen relative"> <UnifiedLoadingScreen text={t("loading_dashboard_data")}/> </div> )``、``!isOpenDocEditorOpen ? ( <div className="min-h-screen bg-[#F9FAFB] p-6 relative"> <div className="max-w-7xl mx-auto space-y-8"> <div> <div className="flex justify-between items-ce…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useCallback``、``useEffect``、``uploadFiles.map``、``t``、``documentCards.map``。

   **内部回调数量**：19。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:1958:2007:FUNCTION

.. rubric:: ``anonymous callback @ 68``

.. code-block:: javascript

   anonymous callback @ 68(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``70`` 行；所属函数 ``createFilePicker``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:2084:4714:FUNCTION

.. rubric:: ``memo callback @ 75``

.. code-block:: javascript

   memo callback @ 75({onSettingsClick, onCardClick, item})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``75``—``137`` 行。

**参数**

``{onSettingsClick, onCardClick, item}``
   调用方提供的事件回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div onClick={() => { if (onCardClick) onCardClick(item); }} className="group cursor-pointer flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden hover:shado…``。

**主要协作调用**：``useTranslation``、``resolveResourceUrl``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:2284:2404:FUNCTION

.. rubric:: ``handleSettingsClick``

.. code-block:: javascript

   handleSettingsClick(e)

处理 ``Settings Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``86`` 行；所属函数 ``memo callback @ 75``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.stopPropagation``、``onSettingsClick``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:2454:2527:FUNCTION

.. rubric:: ``onClick callback @ 90``

.. code-block:: javascript

   onClick callback @ 90()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``90``—``92`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onCardClick``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:4758:6553:FUNCTION

.. rubric:: ``memo callback @ 140``

.. code-block:: javascript

   memo callback @ 140({file, onCancel})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``183`` 行。

**参数**

``{file, onCancel}``
   调用方传入的 ``file, onCancel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\`flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm relative transition-all duration-200 ${isError ? 'border-red-400' : ''}\`} > <…``。

**主要协作调用**：``useTranslation``、``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:6598:7287:FUNCTION

.. rubric:: ``memo callback @ 186``

.. code-block:: javascript

   memo callback @ 186({show, t})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``186``—``203`` 行。

**参数**

``{show, t}``
   调用方传入的 ``show, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <AlertDialog open={show}> <AlertDialogContent> <AlertDialogHeader> <AlertDialogTitle>{t('processing_file_title')}</AlertDialogTitle> <AlertDialogDescription>{t('processing_file_…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7335:11779:FUNCTION

.. rubric:: ``memo callback @ 206``

.. code-block:: javascript

   memo callback @ 206({show, onClose, documentData, onSave, onDelete})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``206``—``300`` 行。

**参数**

``{show, onClose, documentData, onSave, onDelete}``
   调用方传入的 ``show, onClose, documentData, onSave, onDelete`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={show} onOpenChange={onClose}> <DialogContent> <DialogHeader> <DialogTitle className="flex items-center gap-2"> <Settings size={20} className="text-blue-600"/> {t('…``。

**主要协作调用**：``useTranslation``、``useState``、``useEffect``、``format``、``t``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7595:7660:FUNCTION

.. rubric:: ``useEffect callback @ 211``

.. code-block:: javascript

   useEffect callback @ 211()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``211``—``213`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentName``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7702:7871:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``215``—``220`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSave``、``onClose``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:7898:7950:FUNCTION

.. rubric:: ``handleDelete``

.. code-block:: javascript

   handleDelete()

处理 ``Delete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``222``—``224`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeleteConfirmOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:9059:9097:FUNCTION

.. rubric:: ``onChange callback @ 247``

.. code-block:: javascript

   onChange callback @ 247(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``memo callback @ 206``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentName``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:11390:11584:FUNCTION

.. rubric:: ``onClick callback @ 290``

.. code-block:: javascript

   onClick callback @ 290()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``290``—``294`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onDelete``、``setIsDeleteConfirmOpen``、``onClose``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:11826:15561:FUNCTION

.. rubric:: ``memo callback @ 303``

.. code-block:: javascript

   memo callback @ 303({show, onClose, onCreate})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``303``—``384`` 行。

**参数**

``{show, onClose, onCreate}``
   调用方传入的 ``show, onClose, onCreate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={show} onOpenChange={onClose}> <DialogContent> <DialogHeader> <DialogTitle className="flex items-center gap-2"> <Plus size={20} className="text-blue-600"/> {t('crea…``。

**主要协作调用**：``useTranslation``、``useState``、``t``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:12046:12169:FUNCTION

.. rubric:: ``handleCreate``

.. code-block:: javascript

   handleCreate()

处理 ``Create`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``309``—``314`` 行；所属函数 ``memo callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onCreate``、``onClose``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:12924:12963:FUNCTION

.. rubric:: ``onChange callback @ 334``

.. code-block:: javascript

   onChange callback @ 334(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``memo callback @ 303``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentTitle``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:13543:13576:FUNCTION

.. rubric:: ``onClick callback @ 346``

.. code-block:: javascript

   onClick callback @ 346()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``346``—``346`` 行；所属函数 ``memo callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentType``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:14284:14318:FUNCTION

.. rubric:: ``onClick callback @ 357``

.. code-block:: javascript

   onClick callback @ 357()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``memo callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocumentType``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18669:20044:FUNCTION

.. rubric:: ``handleFileUpload``

.. code-block:: javascript

   handleFileUpload(newUploadFiles)

处理 ``File Upload`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``457``—``490`` 行；所属函数 ``DocEditorHome``。

**参数**

``newUploadFiles``
   调用方传入的 ``newUploadFiles`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setUploadFiles``、``newUploadFiles.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18765:18801:FUNCTION

.. rubric:: ``setUploadFiles callback @ 460``

.. code-block:: javascript

   setUploadFiles callback @ 460(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``460``—``460`` 行；所属函数 ``handleFileUpload``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18836:20036:FUNCTION

.. rubric:: ``newUploadFiles.forEach callback @ 462``

.. code-block:: javascript

   newUploadFiles.forEach callback @ 462(uploadFile)

作为 ``newUploadFiles.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``462``—``489`` 行；所属函数 ``handleFileUpload``。

**参数**

``uploadFile``
   调用方传入的 ``uploadFile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fileUpload``、``uploadIntervals.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18892:19275:FUNCTION

.. rubric:: ``handleProgressUpdate``

.. code-block:: javascript

   handleProgressUpdate(uploadId, progress)

处理 ``Progress Update`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``463``—``471`` 行；所属函数 ``newUploadFiles.forEach callback @ 462``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:18950:19259:FUNCTION

.. rubric:: ``setUploadFiles callback @ 464``

.. code-block:: javascript

   setUploadFiles callback @ 464(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``464``—``470`` 行；所属函数 ``handleProgressUpdate``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``updated``。

**主要协作调用**：``prev.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19007:19029:FUNCTION

.. rubric:: ``prev.findIndex callback @ 465``

.. code-block:: javascript

   prev.findIndex callback @ 465(f)

实现 ``prev.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``465``—``465`` 行；所属函数 ``setUploadFiles callback @ 464``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19312:19438:FUNCTION

.. rubric:: ``handleComplete``

.. code-block:: javascript

   handleComplete(uploadId, attachment)

处理 ``Complete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``473``—``476`` 行；所属函数 ``newUploadFiles.forEach callback @ 462``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsProcessing``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19472:19856:FUNCTION

.. rubric:: ``handleError``

.. code-block:: javascript

   handleError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``478``—``485`` 行；所属函数 ``newUploadFiles.forEach callback @ 462``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``、``setUploadFiles``、``uploadIntervals.current.delete``、``setIsProcessing``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19616:19720:FUNCTION

.. rubric:: ``setUploadFiles callback @ 480``

.. code-block:: javascript

   setUploadFiles callback @ 480(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``480``—``481`` 行；所属函数 ``handleError``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:19653:19719:FUNCTION

.. rubric:: ``prev.map callback @ 481``

.. code-block:: javascript

   prev.map callback @ 481(f)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``481``—``481`` 行；所属函数 ``setUploadFiles callback @ 480``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20100:20370:FUNCTION

.. rubric:: ``handleImportButtonClick``

.. code-block:: javascript

   handleImportButtonClick(e)

处理 ``Import Button Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``493``—``501`` 行；所属函数 ``DocEditorHome``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``、``createFilePicker``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20163:20362:FUNCTION

.. rubric:: ``createFilePicker callback @ 495``

.. code-block:: javascript

   createFilePicker callback @ 495(files)

创建与 ``File Picker`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``495``—``500`` 行；所属函数 ``handleImportButtonClick``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``processSelectedFiles``、``handleFileUpload``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20430:20476:FUNCTION

.. rubric:: ``useCallback callback @ 504``

.. code-block:: javascript

   useCallback callback @ 504()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``504``—``506`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsNewModalOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:20536:21697:FUNCTION

.. rubric:: ``handleCreateNewDocument``

.. code-block:: javascript

   async handleCreateNewDocument(documentTitle, documentType)

处理 ``Create New Document`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``509``—``540`` 行；所属函数 ``DocEditorHome``。

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

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:21334:21360:FUNCTION

.. rubric:: ``setDocumentCards callback @ 532``

.. code-block:: javascript

   setDocumentCards callback @ 532(prev)

设置与 ``Document Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``handleCreateNewDocument``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:21747:21857:FUNCTION

.. rubric:: ``handleOpenEditModal``

.. code-block:: javascript

   handleOpenEditModal(documentItem)

处理 ``Open Edit Modal`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``543``—``546`` 行；所属函数 ``DocEditorHome``。

**参数**

``documentItem``
   调用方传入的 ``documentItem`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedDocumentForEdit``、``setIsEditModalOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:21894:22816:FUNCTION

.. rubric:: ``handleSaveDocumentEdit``

.. code-block:: javascript

   async handleSaveDocumentEdit(documentId, newTitle)

处理 ``Save Document Edit`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``548``—``571`` 行；所属函数 ``DocEditorHome``。

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

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22282:22487:FUNCTION

.. rubric:: ``setDocumentCards callback @ 559``

.. code-block:: javascript

   setDocumentCards callback @ 559(prev)

设置与 ``Document Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``559``—``562`` 行；所属函数 ``handleSaveDocumentEdit``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22337:22469:FUNCTION

.. rubric:: ``prev.map callback @ 560``

.. code-block:: javascript

   prev.map callback @ 560(item)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``560``—``561`` 行；所属函数 ``setDocumentCards callback @ 559``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date().toISOString``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:22851:23403:FUNCTION

.. rubric:: ``handleDeleteDocument``

.. code-block:: javascript

   async handleDeleteDocument(documentId)

处理 ``Delete Document`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``573``—``585`` 行；所属函数 ``DocEditorHome``。

**参数**

``documentId``
   Document 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``、``setDocumentCards``、``toast.success``、``t``、``setIsEditModalOpen``、``console.error``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23006:23065:FUNCTION

.. rubric:: ``setDocumentCards callback @ 577``

.. code-block:: javascript

   setDocumentCards callback @ 577(prev)

设置与 ``Document Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``577``—``577`` 行；所属函数 ``handleDeleteDocument``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23026:23064:FUNCTION

.. rubric:: ``prev.filter callback @ 577``

.. code-block:: javascript

   prev.filter callback @ 577(item)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``577``—``577`` 行；所属函数 ``setDocumentCards callback @ 577``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23463:23963:FUNCTION

.. rubric:: ``useCallback callback @ 588``

.. code-block:: javascript

   useCallback callback @ 588(newDocumentId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``588``—``603`` 行；所属函数 ``DocEditorHome``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then((data) => { setTimeout(()…``、``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then``、``apiClient.get``、``onNewDocumentId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23598:23725:FUNCTION

.. rubric:: ``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then callback @ 591``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}`) .then callback @ 591(data)

处理 ``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``591``—``595`` 行；所属函数 ``useCallback callback @ 588``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23637:23709:FUNCTION

.. rubric:: ``setTimeout callback @ 592``

.. code-block:: javascript

   setTimeout callback @ 592()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``592``—``594`` 行；所属函数 ``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then callback @ 591``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocEditorUrl``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:23746:23888:FUNCTION

.. rubric:: ``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then((data) => { setTimeout(()… callback @ 596``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}`) .then((data) => { setTimeout(()… callback @ 596(error)

实现 ``apiClient.get(\`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentId}\`) .then((data) => { setTimeout(()…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``596``—``598`` 行；所属函数 ``useCallback callback @ 588``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24035:24193:FUNCTION

.. rubric:: ``useCallback callback @ 606``

.. code-block:: javascript

   useCallback callback @ 606()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``606``—``611`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDiscardConfirmOpen``、``setIsOpenDocEditorOpen``、``onNewConversationId``、``onNewDocumentId``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24245:24429:FUNCTION

.. rubric:: ``useCallback callback @ 613``

.. code-block:: javascript

   useCallback callback @ 613()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``613``—``619`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsDiscardConfirmOpen``、``handleCloseDocEditorConfirm``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24450:24521:FUNCTION

.. rubric:: ``useEffect callback @ 621``

.. code-block:: javascript

   useEffect callback @ 621()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``621``—``623`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24574:24688:FUNCTION

.. rubric:: ``useEffect callback @ 626``

.. code-block:: javascript

   useEffect callback @ 626()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``626``—``630`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { uploadIntervals.current.forEach(cleanup => cleanup()); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24596:24681:FUNCTION

.. rubric:: ``returned callback @ 627``

.. code-block:: javascript

   returned callback @ 627()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``627``—``629`` 行；所属函数 ``useEffect callback @ 626``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadIntervals.current.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24649:24669:FUNCTION

.. rubric:: ``uploadIntervals.current.forEach callback @ 628``

.. code-block:: javascript

   uploadIntervals.current.forEach callback @ 628(cleanup)

作为 ``uploadIntervals.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``628``—``628`` 行；所属函数 ``returned callback @ 627``。

**参数**

``cleanup``
   调用方传入的 ``cleanup`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanup``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24724:25636:FUNCTION

.. rubric:: ``useEffect callback @ 633``

.. code-block:: javascript

   useEffect callback @ 633()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``633``—``655`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsLoading``、``requestInfo``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24787:25606:FUNCTION

.. rubric:: ``requestInfo``

.. code-block:: javascript

   async requestInfo()

实现 ``requestInfo`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``635``—``653`` 行；所属函数 ``useEffect callback @ 633``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``data.map``、``setDocumentCards``、``console.error``、``toast.error``、``t``、``setIsLoading``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:24942:25291:FUNCTION

.. rubric:: ``data.map callback @ 638``

.. code-block:: javascript

   data.map callback @ 638(item)

作为 ``data.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``638``—``645`` 行；所属函数 ``requestInfo``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:25673:26324:FUNCTION

.. rubric:: ``useEffect callback @ 658``

.. code-block:: javascript

   useEffect callback @ 658()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``658``—``681`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unregister()``。

**主要协作调用**：``t``、``registerButton``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26286:26305:FUNCTION

.. rubric:: ``returned callback @ 677``

.. code-block:: javascript

   returned callback @ 677()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``677``—``677`` 行；所属函数 ``useEffect callback @ 658``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``unregister``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26422:26624:FUNCTION

.. rubric:: ``useEffect callback @ 684``

.. code-block:: javascript

   useEffect callback @ 684()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``684``—``690`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleOpenDocEditor``、``setIsOpenDocEditorOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26715:26994:FUNCTION

.. rubric:: ``uploadFiles.map callback @ 693``

.. code-block:: javascript

   uploadFiles.map callback @ 693(file)

作为 ``uploadFiles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``693``—``702`` 行；所属函数 ``DocEditorHome``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26821:26976:FUNCTION

.. rubric:: ``onCancel callback @ 697``

.. code-block:: javascript

   onCancel callback @ 697()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``697``—``700`` 行；所属函数 ``uploadFiles.map callback @ 693``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``uploadIntervals.current.get(file.id)``、``uploadIntervals.current.get``、``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26918:26960:FUNCTION

.. rubric:: ``setUploadFiles callback @ 699``

.. code-block:: javascript

   setUploadFiles callback @ 699(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``699``—``699`` 行；所属函数 ``onCancel callback @ 697``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:26938:26959:FUNCTION

.. rubric:: ``prev.filter callback @ 699``

.. code-block:: javascript

   prev.filter callback @ 699(f)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``699``—``699`` 行；所属函数 ``setUploadFiles callback @ 699``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:28424:28763:FUNCTION

.. rubric:: ``documentCards.map callback @ 733``

.. code-block:: javascript

   documentCards.map callback @ 733(item)

作为 ``documentCards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``733``—``742`` 行；所属函数 ``DocEditorHome``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:28596:28683:FUNCTION

.. rubric:: ``onCardClick callback @ 737``

.. code-block:: javascript

   onCardClick callback @ 737(item)

处理 ``Card Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``737``—``739`` 行；所属函数 ``documentCards.map callback @ 733``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleOpenDocEditor``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:30156:30187:FUNCTION

.. rubric:: ``onClose callback @ 780``

.. code-block:: javascript

   onClose callback @ 780()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``780``—``780`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsEditModalOpen``。

.. CWM-AST-FUNCTION src/pages/DocEditorHome.jsx:30448:30478:FUNCTION

.. rubric:: ``onClose callback @ 787``

.. code-block:: javascript

   onClose callback @ 787()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``787``—``787`` 行；所属函数 ``DocEditorHome``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsNewModalOpen``。
