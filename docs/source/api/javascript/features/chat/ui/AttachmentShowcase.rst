src/features/chat/ui/AttachmentShowcase 模块
============================================================================================

.. js:module:: src/features/chat/ui/AttachmentShowcase

单个附件项组件 使用memo包裹，避免不必要的重新渲染

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/AttachmentShowcase.jsx``
* **模块标识**：``src/features/chat/ui/AttachmentShowcase``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------------------------------------------------------------------------------

``react``、``@headlessui/react``、``react-i18next``、``lucide-react``、``@/features/workspace/useWorkspaceTransferStore.js``、``@/lib/virtualUrl.js``、``../attachmentVision.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:625:888:FUNCTION

.. js:function:: formatFileSize(bytes)

   格式化与 ``File Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``18`` 行。

   **参数**

   ``bytes``
      调用方传入的 ``bytes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'0 B'``、``parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]``。

   **主要协作调用**：``Math.floor``、``Math.log``、``parseFloat``、``(bytes / Math.pow(k, i)).toFixed``、``Math.pow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:918:1129:FUNCTION

.. js:function:: isDefaultFileIcon(attachment)

   判断与 ``Default File Icon`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``24`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``preview.startsWith('cwm://public/icons/')``。

   **主要协作调用**：``String(attachment?.preview || '').trim().toLowerCase``、``String(attachment?.preview || '').trim``、``String``、``preview.startsWith``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1208:9681:FUNCTION

.. rubric:: ``memo callback @ 30``

.. code-block:: javascript

   memo callback @ 30({ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``183`` 行。

**参数**

``{ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, }``
   调用方传入的 ``attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={index} className="relative flex-shrink-0"> {!msgMode && ( <button type="button" onClick={handleRemove} className="absolute top-1 right-1 z-30 w-4 h-4 bg-gray-600/30 te…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resolveResourceUrl``、``isDefaultFileIcon``、``useWorkspaceTransferStore``、``Number.isFinite``、``Number``、``Math.round``、``t``、``isImageAttachment``、``isAttachmentVisionEnabled``、``useCallback``、``formatFileSize``、``['completed', 'failed', 'cancelled'].includes``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1717:1767:FUNCTION

.. rubric:: ``useWorkspaceTransferStore callback @ 43``

.. code-block:: javascript

   useWorkspaceTransferStore callback @ 43(state)

封装 ``WorkspaceTransferStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``memo callback @ 30``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectArtifactTransfer``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:3035:3111:FUNCTION

.. rubric:: ``useCallback callback @ 65``

.. code-block:: javascript

   useCallback callback @ 65(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``68`` 行；所属函数 ``memo callback @ 30``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.stopPropagation``、``onRemove``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:3177:3318:FUNCTION

.. rubric:: ``useCallback callback @ 70``

.. code-block:: javascript

   useCallback callback @ 70()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``74`` 行；所属函数 ``memo callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.open``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:3390:3531:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``80`` 行；所属函数 ``memo callback @ 30``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``onVisionToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:9682:11242:FUNCTION

.. rubric:: ``memo callback @ 183``

.. code-block:: javascript

   memo callback @ 183(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``209`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevAttachment.id === nextAttachment.id && prevAttachment.preview === nextAttachment.preview && prevAttachment.previewType === nextAttachment.previewType && prevAttachment.name…``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11359:12520:FUNCTION

.. rubric:: ``memo callback @ 217``

.. code-block:: javascript

   memo callback @ 217({ direction, onClick, t, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``217``—``247`` 行。

**参数**

``{ direction, onClick, t, show }``
   调用方传入的 ``direction, onClick, t, show`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={onClick} className={\x60cursor-pointer absolute ${direction === 'left' ? 'left-0' : 'right-0'} inset-y-0 my-auto h-7 w-7 rounded-full bg-white shadow…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12521:12765:FUNCTION

.. rubric:: ``memo callback @ 247``

.. code-block:: javascript

   memo callback @ 247(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``247``—``254`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.direction === nextProps.direction && prevProps.show === nextProps.show && prevProps.onClick === nextProps.onClick && prevProps.t === nextProps.t )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12876:13320:FUNCTION

.. rubric:: ``memo callback @ 262``

.. code-block:: javascript

   memo callback @ 262({ side, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``262``—``276`` 行。

**参数**

``{ side, show }``
   调用方传入的 ``side, show`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60absolute ${positionClass} top-0 bottom-0 w-8 ${gradientClass} z-20 pointer-events-none\x60} /> )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13321:13436:FUNCTION

.. rubric:: ``memo callback @ 276``

.. code-block:: javascript

   memo callback @ 276(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``276``—``278`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prevProps.side === nextProps.side && prevProps.show === nextProps.show``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13615:19304:FUNCTION

.. rubric:: ``memo callback @ 288``

.. code-block:: javascript

   memo callback @ 288({ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``288``—``440`` 行。

**参数**

``{ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode, }``
   调用方传入的 ``attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``emptyState``、``( <Transition show={true} appear={true} enter="transition-all duration-300 ease-out" enterFrom="opacity-0 transform translate-y-2" enterTo="opacity-100 transform translate-y-0" le…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``useMemo``、``useCallback``、``useLayoutEffect``、``useEffect``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14031:14077:FUNCTION

.. rubric:: ``useMemo callback @ 301``

.. code-block:: javascript

   useMemo callback @ 301()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeAttachmentList``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14184:14613:FUNCTION

.. rubric:: ``useCallback callback @ 304``

.. code-block:: javascript

   useCallback callback @ 304()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``304``—``314`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``setShowLeftShadow``、``setShowRightShadow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14665:14994:FUNCTION

.. rubric:: ``useCallback callback @ 316``

.. code-block:: javascript

   useCallback callback @ 316(direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``316``—``326`` 行；所属函数 ``memo callback @ 288``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``container.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15058:15214:FUNCTION

.. rubric:: ``useMemo callback @ 329``

.. code-block:: javascript

   useMemo callback @ 329()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``329``—``334`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15285:15827:FUNCTION

.. rubric:: ``useMemo callback @ 337``

.. code-block:: javascript

   useMemo callback @ 337()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``337``—``354`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``normalizedAttachments.map((attachment, index) => ( <AttachmentItem key={attachment.id || index} attachment={attachment} index={index} onRemove={onRemove} onVisionToggle={onVisionT…``。

**主要协作调用**：``normalizedAttachments.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15425:15818:FUNCTION

.. rubric:: ``normalizedAttachments.map callback @ 342``

.. code-block:: javascript

   normalizedAttachments.map callback @ 342(attachment, index)

作为 ``normalizedAttachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``342``—``353`` 行；所属函数 ``useMemo callback @ 337``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15933:16979:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 356``

.. code-block:: javascript

   useLayoutEffect callback @ 356()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``356``—``381`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); container.removeEventListener('scroll', scheduleCheck); window.removeEventListener('resize', scheduleCheck); resizeObserver?.disconne…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``、``container.addEventListener``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:16144:16287:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``361``—``364`` 行；所属函数 ``useLayoutEffect callback @ 356``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:16723:16971:FUNCTION

.. rubric:: ``returned callback @ 375``

.. code-block:: javascript

   returned callback @ 375()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``375``—``380`` 行；所属函数 ``useLayoutEffect callback @ 356``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``container.removeEventListener``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:17044:17193:FUNCTION

.. rubric:: ``useEffect callback @ 383``

.. code-block:: javascript

   useEffect callback @ 383()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``383``—``386`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.cancelAnimationFrame(frameId)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:17142:17185:FUNCTION

.. rubric:: ``returned callback @ 385``

.. code-block:: javascript

   returned callback @ 385()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``385``—``385`` 行；所属函数 ``useEffect callback @ 383``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:18842:18873:FUNCTION

.. rubric:: ``onClick callback @ 425``

.. code-block:: javascript

   onClick callback @ 425()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:19090:19122:FUNCTION

.. rubric:: ``onClick callback @ 432``

.. code-block:: javascript

   onClick callback @ 432()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``432``—``432`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:19305:21348:FUNCTION

.. rubric:: ``memo callback @ 440``

.. code-block:: javascript

   memo callback @ 440(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``440``—``483`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.msgMode === nextProps.msgMode && prevProps.onRemove === nextProps.onRemove && prevProps.onVisionToggle === nextProps.onVisionToggle && prevProps.visionSupported === ne…``。

**主要协作调用**：``normalizeAttachmentList``。
