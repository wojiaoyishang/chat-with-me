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
* **局部函数与匿名回调**：24

主要依赖
--------------------------------------------------------------------------------

``react``、``@headlessui/react``、``react-i18next``、``lucide-react``、``@/lib/virtualUrl.js``、``../attachmentVision.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:468:723:FUNCTION

.. js:function:: formatFileSize(bytes)

   格式化与 ``File Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``17`` 行。

   **参数**

   ``bytes``
      调用方传入的 ``bytes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'0 B'``、``parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]``。

   **主要协作调用**：``Math.floor``、``Math.log``、``parseFloat``、``(bytes / Math.pow(k, i)).toFixed``、``Math.pow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:751:958:FUNCTION

.. js:function:: isDefaultFileIcon(attachment)

   判断与 ``Default File Icon`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``23`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``preview.startsWith('cwm://public/icons/')``。

   **主要协作调用**：``String(attachment?.preview || '').trim().toLowerCase``、``String(attachment?.preview || '').trim``、``String``、``preview.startsWith``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1031:6603:FUNCTION

.. rubric:: ``memo callback @ 29``

.. code-block:: javascript

   memo callback @ 29({ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``143`` 行。

**参数**

``{ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t, }``
   调用方传入的 ``attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={index} className="relative flex-shrink-0"> {!msgMode && ( <button type="button" onClick={handleRemove} className="absolute top-1 right-1 z-30 w-4 h-4 bg-gray-600/30 te…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resolveResourceUrl``、``isDefaultFileIcon``、``isImageAttachment``、``isAttachmentVisionEnabled``、``useCallback``、``t``、``formatFileSize``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1645:1718:FUNCTION

.. rubric:: ``useCallback callback @ 45``

.. code-block:: javascript

   useCallback callback @ 45(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``48`` 行；所属函数 ``memo callback @ 29``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.stopPropagation``、``onRemove``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1782:1919:FUNCTION

.. rubric:: ``useCallback callback @ 50``

.. code-block:: javascript

   useCallback callback @ 50()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``54`` 行；所属函数 ``memo callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.open``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1989:2126:FUNCTION

.. rubric:: ``useCallback callback @ 56``

.. code-block:: javascript

   useCallback callback @ 56(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``60`` 行；所属函数 ``memo callback @ 29``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``onVisionToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:6604:7740:FUNCTION

.. rubric:: ``memo callback @ 143``

.. code-block:: javascript

   memo callback @ 143(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``143``—``165`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevAttachment.id === nextAttachment.id && prevAttachment.preview === nextAttachment.preview && prevAttachment.previewType === nextAttachment.previewType && prevAttachment.name…``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:7849:8980:FUNCTION

.. rubric:: ``memo callback @ 173``

.. code-block:: javascript

   memo callback @ 173({ direction, onClick, t, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``203`` 行。

**参数**

``{ direction, onClick, t, show }``
   调用方传入的 ``direction, onClick, t, show`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={onClick} className={\x60cursor-pointer absolute ${direction === 'left' ? 'left-0' : 'right-0'} inset-y-0 my-auto h-7 w-7 rounded-full bg-white shadow…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:8981:9218:FUNCTION

.. rubric:: ``memo callback @ 203``

.. code-block:: javascript

   memo callback @ 203(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``210`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.direction === nextProps.direction && prevProps.show === nextProps.show && prevProps.onClick === nextProps.onClick && prevProps.t === nextProps.t )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:9321:9751:FUNCTION

.. rubric:: ``memo callback @ 218``

.. code-block:: javascript

   memo callback @ 218({ side, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``218``—``232`` 行。

**参数**

``{ side, show }``
   调用方传入的 ``side, show`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60absolute ${positionClass} top-0 bottom-0 w-8 ${gradientClass} z-20 pointer-events-none\x60} /> )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:9752:9865:FUNCTION

.. rubric:: ``memo callback @ 232``

.. code-block:: javascript

   memo callback @ 232(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``234`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prevProps.side === nextProps.side && prevProps.show === nextProps.show``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:10034:15571:FUNCTION

.. rubric:: ``memo callback @ 244``

.. code-block:: javascript

   memo callback @ 244({ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``244``—``396`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:10437:10483:FUNCTION

.. rubric:: ``useMemo callback @ 257``

.. code-block:: javascript

   useMemo callback @ 257()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeAttachmentList``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:10587:11006:FUNCTION

.. rubric:: ``useCallback callback @ 260``

.. code-block:: javascript

   useCallback callback @ 260()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``260``—``270`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``setShowLeftShadow``、``setShowRightShadow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11056:11375:FUNCTION

.. rubric:: ``useCallback callback @ 272``

.. code-block:: javascript

   useCallback callback @ 272(direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``272``—``282`` 行；所属函数 ``memo callback @ 244``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``container.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11436:11587:FUNCTION

.. rubric:: ``useMemo callback @ 285``

.. code-block:: javascript

   useMemo callback @ 285()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``290`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11655:12180:FUNCTION

.. rubric:: ``useMemo callback @ 293``

.. code-block:: javascript

   useMemo callback @ 293()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``293``—``310`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``normalizedAttachments.map((attachment, index) => ( <AttachmentItem key={attachment.id || index} attachment={attachment} index={index} onRemove={onRemove} onVisionToggle={onVisionT…``。

**主要协作调用**：``normalizedAttachments.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11790:12172:FUNCTION

.. rubric:: ``normalizedAttachments.map callback @ 298``

.. code-block:: javascript

   normalizedAttachments.map callback @ 298(attachment, index)

作为 ``normalizedAttachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``298``—``309`` 行；所属函数 ``useMemo callback @ 293``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12284:13305:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 312``

.. code-block:: javascript

   useLayoutEffect callback @ 312()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``312``—``337`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); container.removeEventListener('scroll', scheduleCheck); window.removeEventListener('resize', scheduleCheck); resizeObserver?.disconne…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``、``container.addEventListener``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12490:12630:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``317``—``320`` 行；所属函数 ``useLayoutEffect callback @ 312``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13055:13298:FUNCTION

.. rubric:: ``returned callback @ 331``

.. code-block:: javascript

   returned callback @ 331()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``331``—``336`` 行；所属函数 ``useLayoutEffect callback @ 312``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``container.removeEventListener``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13368:13514:FUNCTION

.. rubric:: ``useEffect callback @ 339``

.. code-block:: javascript

   useEffect callback @ 339()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``339``—``342`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.cancelAnimationFrame(frameId)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13464:13507:FUNCTION

.. rubric:: ``returned callback @ 341``

.. code-block:: javascript

   returned callback @ 341()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``341``—``341`` 行；所属函数 ``useEffect callback @ 339``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15124:15155:FUNCTION

.. rubric:: ``onClick callback @ 381``

.. code-block:: javascript

   onClick callback @ 381()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``381``—``381`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15365:15397:FUNCTION

.. rubric:: ``onClick callback @ 388``

.. code-block:: javascript

   onClick callback @ 388()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``388``—``388`` 行；所属函数 ``memo callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15572:17158:FUNCTION

.. rubric:: ``memo callback @ 396``

.. code-block:: javascript

   memo callback @ 396(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``396``—``435`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.msgMode === nextProps.msgMode && prevProps.onRemove === nextProps.onRemove && prevProps.onVisionToggle === nextProps.onVisionToggle && prevProps.visionSupported === ne…``。

**主要协作调用**：``normalizeAttachmentList``。
