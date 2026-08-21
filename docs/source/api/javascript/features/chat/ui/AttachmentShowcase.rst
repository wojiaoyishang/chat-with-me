src/features/chat/ui/AttachmentShowcase 模块
==========================================

.. js:module:: src/features/chat/ui/AttachmentShowcase

单个附件项组件 使用memo包裹，避免不必要的重新渲染

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/AttachmentShowcase.jsx``
* **模块标识**：``src/features/chat/ui/AttachmentShowcase``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------

``react``、``@headlessui/react``、``react-i18next``、``lucide-react``、``@/features/workspace/useWorkspaceTransferStore.js``、``@/lib/virtualUrl.js``、``../attachmentVision.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:591:846:FUNCTION

.. js:function:: formatFileSize(bytes)

   格式化与 ``File Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``18`` 行。

   **参数**

   ``bytes``
      调用方传入的 ``bytes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'0 B'``、``parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]``。

   **主要协作调用**：``Math.floor``、``Math.log``、``parseFloat``、``(bytes / Math.pow(k, i)).toFixed``、``Math.pow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:874:1081:FUNCTION

.. js:function:: isDefaultFileIcon(attachment)

   判断与 ``Default File Icon`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``24`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``preview.startsWith('cwm://public/icons/')``。

   **主要协作调用**：``String(attachment?.preview \|\| '').trim().toLowerCase``、``String(attachment?.preview \|\| '').trim``、``String``、``preview.startsWith``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1154:9474:FUNCTION

.. rubric:: ``memo callback @ 30``

.. code-block:: javascript

   memo callback @ 30({ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``183`` 行。

**参数**

``{ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, }``
   调用方传入的 `` attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={index} className="relative flex-shrink-0"> {!msgMode && ( <button type="button" onClick={handleRemove} className="absolute top-1 right-1 z-30 w-4 h-4 bg-gray-600/30 te…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resolveResourceUrl``、``isDefaultFileIcon``、``useWorkspaceTransferStore``、``Number.isFinite``、``Number``、``Math.round``、``t``、``isImageAttachment``、``isAttachmentVisionEnabled``、``useCallback``、``formatFileSize``、``['completed', 'failed', 'cancelled'].includes``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1650:1700:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:2946:3019:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:3083:3220:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:3290:3427:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:9475:11009:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11118:12249:FUNCTION

.. rubric:: ``memo callback @ 217``

.. code-block:: javascript

   memo callback @ 217({ direction, onClick, t, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``217``—``247`` 行。

**参数**

``{ direction, onClick, t, show }``
   调用方传入的 `` direction, onClick, t, show `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={onClick} className={\`cursor-pointer absolute ${direction === 'left' ? 'left-0' : 'right-0'} inset-y-0 my-auto h-7 w-7 rounded-full bg-white shadow…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12250:12487:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12590:13020:FUNCTION

.. rubric:: ``memo callback @ 262``

.. code-block:: javascript

   memo callback @ 262({ side, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``262``—``276`` 行。

**参数**

``{ side, show }``
   调用方传入的 `` side, show `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\`absolute ${positionClass} top-0 bottom-0 w-8 ${gradientClass} z-20 pointer-events-none\`} /> )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13021:13134:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13303:18740:FUNCTION

.. rubric:: ``memo callback @ 288``

.. code-block:: javascript

   memo callback @ 288({ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``288``—``439`` 行。

**参数**

``{ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode, }``
   调用方传入的 `` attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``emptyState``、``( <Transition show={true} appear={true} enter="transition-all duration-300 ease-out" enterFrom="opacity-0 transform translate-y-2" enterTo="opacity-100 transform translate-y-0" le…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``useCallback``、``useMemo``、``useLayoutEffect``、``useEffect``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13746:14165:FUNCTION

.. rubric:: ``useCallback callback @ 303``

.. code-block:: javascript

   useCallback callback @ 303()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``303``—``313`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``setShowLeftShadow``、``setShowRightShadow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14215:14534:FUNCTION

.. rubric:: ``useCallback callback @ 315``

.. code-block:: javascript

   useCallback callback @ 315(direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``315``—``325`` 行；所属函数 ``memo callback @ 288``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``container.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14595:14746:FUNCTION

.. rubric:: ``useMemo callback @ 328``

.. code-block:: javascript

   useMemo callback @ 328()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``328``—``333`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14814:15347:FUNCTION

.. rubric:: ``useMemo callback @ 336``

.. code-block:: javascript

   useMemo callback @ 336()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``336``—``353`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``attachmentsMeta.map((attachment, index) => ( <AttachmentItem key={attachment.id \|\| index} attachment={attachment} index={index} onRemove={onRemove} onVisionToggle={onVisionToggle}…``。

**主要协作调用**：``attachmentsMeta.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14957:15339:FUNCTION

.. rubric:: ``attachmentsMeta.map callback @ 341``

.. code-block:: javascript

   attachmentsMeta.map callback @ 341(attachment, index)

作为 ``attachmentsMeta.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``341``—``352`` 行；所属函数 ``useMemo callback @ 336``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15445:16466:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 355``

.. code-block:: javascript

   useLayoutEffect callback @ 355()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``355``—``380`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); container.removeEventListener('scroll', scheduleCheck); window.removeEventListener('resize', scheduleCheck); resizeObserver?.disconne…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``、``container.addEventListener``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15651:15791:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``360``—``363`` 行；所属函数 ``useLayoutEffect callback @ 355``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:16216:16459:FUNCTION

.. rubric:: ``returned callback @ 374``

.. code-block:: javascript

   returned callback @ 374()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``374``—``379`` 行；所属函数 ``useLayoutEffect callback @ 355``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``container.removeEventListener``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:16523:16669:FUNCTION

.. rubric:: ``useEffect callback @ 382``

.. code-block:: javascript

   useEffect callback @ 382()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``382``—``385`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.cancelAnimationFrame(frameId)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:16619:16662:FUNCTION

.. rubric:: ``returned callback @ 384``

.. code-block:: javascript

   returned callback @ 384()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``384``—``384`` 行；所属函数 ``useEffect callback @ 382``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:18293:18324:FUNCTION

.. rubric:: ``onClick callback @ 424``

.. code-block:: javascript

   onClick callback @ 424()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``424``—``424`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:18534:18566:FUNCTION

.. rubric:: ``onClick callback @ 431``

.. code-block:: javascript

   onClick callback @ 431()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``431``—``431`` 行；所属函数 ``memo callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:18741:20703:FUNCTION

.. rubric:: ``memo callback @ 439``

.. code-block:: javascript

   memo callback @ 439(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``439``—``482`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.msgMode === nextProps.msgMode && prevProps.onRemove === nextProps.onRemove && prevProps.onVisionToggle === nextProps.onVisionToggle && prevProps.visionSupported === ne…``。
