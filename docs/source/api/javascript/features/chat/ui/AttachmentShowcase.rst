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

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:484:739:FUNCTION

.. js:function:: formatFileSize(bytes)

   格式化与 ``File Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``17`` 行。

   **参数**

   ``bytes``
      调用方传入的 ``bytes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'0 B'``、``parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]``。

   **主要协作调用**：``Math.floor``、``Math.log``、``parseFloat``、``(bytes / Math.pow(k, i)).toFixed``、``Math.pow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:767:992:FUNCTION

.. js:function:: isDefaultFileIcon(attachment)

   判断与 ``Default File Icon`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``25`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``preview.startsWith('cwm://public/icons/')``。

   **主要协作调用**：``String(attachment?.preview || '') .trim() .toLowerCase``、``String(attachment?.preview || '') .trim``、``String``、``preview.startsWith``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1065:7660:FUNCTION

.. rubric:: ``memo callback @ 32``

.. code-block:: javascript

   memo callback @ 32({ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``32``—``156`` 行。

**参数**

``{ attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t }``
   调用方传入的 ``attachment, index, onRemove, onVisionToggle, visionSupported, msgMode, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={index} className="relative flex-shrink-0"> {!msgMode && ( <button type="button" onClick={handleRemove} className="absolute top-1 right-1 z-30 w-4 h-4 bg-gray-600/30 te…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resolveResourceUrl``、``isDefaultFileIcon``、``isImageAttachment``、``isAttachmentVisionEnabled``、``useCallback``、``t``、``formatFileSize``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1784:1894:FUNCTION

.. rubric:: ``useCallback callback @ 43``

.. code-block:: javascript

   useCallback callback @ 43(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``46`` 行；所属函数 ``memo callback @ 32``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.stopPropagation``、``onRemove``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:1984:2137:FUNCTION

.. rubric:: ``useCallback callback @ 50``

.. code-block:: javascript

   useCallback callback @ 50()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``54`` 行；所属函数 ``memo callback @ 32``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.open``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:2211:2393:FUNCTION

.. rubric:: ``useCallback callback @ 57``

.. code-block:: javascript

   useCallback callback @ 57(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``61`` 行；所属函数 ``memo callback @ 32``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``onVisionToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:7661:8980:FUNCTION

.. rubric:: ``memo callback @ 157``

.. code-block:: javascript

   memo callback @ 157(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``181`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevAttachment.id === nextAttachment.id && prevAttachment.artifactStatus === nextAttachment.artifactStatus && prevAttachment.preview === nextAttachment.preview && prevAttachment…``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:9091:10315:FUNCTION

.. rubric:: ``memo callback @ 191``

.. code-block:: javascript

   memo callback @ 191({ direction, onClick, t, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``191``—``219`` 行。

**参数**

``{ direction, onClick, t, show }``
   调用方传入的 ``direction, onClick, t, show`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={onClick} className={\x60cursor-pointer absolute ${direction === 'left' ? 'left-0' : 'right-0'} inset-y-0 my-auto h-7 w-7 rounded-full bg-white shadow…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:10316:10585:FUNCTION

.. rubric:: ``memo callback @ 220``

.. code-block:: javascript

   memo callback @ 220(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``220``—``227`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.direction === nextProps.direction && prevProps.show === nextProps.show && prevProps.onClick === nextProps.onClick && prevProps.t === nextProps.t )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:10690:11161:FUNCTION

.. rubric:: ``memo callback @ 237``

.. code-block:: javascript

   memo callback @ 237({ side, show })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``237``—``250`` 行。

**参数**

``{ side, show }``
   调用方传入的 ``side, show`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60absolute ${positionClass} top-0 bottom-0 w-8 ${gradientClass} z-20 pointer-events-none\x60} /> )``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11162:11287:FUNCTION

.. rubric:: ``memo callback @ 251``

.. code-block:: javascript

   memo callback @ 251(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``251``—``253`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prevProps.side === nextProps.side && prevProps.show === nextProps.show``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11458:17484:FUNCTION

.. rubric:: ``memo callback @ 265``

.. code-block:: javascript

   memo callback @ 265({ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``410`` 行。

**参数**

``{ attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode }``
   调用方传入的 ``attachmentsMeta, onRemove, onVisionToggle, visionSupported = false, msgMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``emptyState``、``( <Transition show={true} appear={true} enter="transition-all duration-300 ease-out" enterFrom="opacity-0 transform translate-y-2" enterTo="opacity-100 transform translate-y-0" le…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``useMemo``、``useCallback``、``useLayoutEffect``、``useEffect``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:11869:11915:FUNCTION

.. rubric:: ``useMemo callback @ 272``

.. code-block:: javascript

   useMemo callback @ 272()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``272``—``272`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeAttachmentList``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12027:12478:FUNCTION

.. rubric:: ``useCallback callback @ 275``

.. code-block:: javascript

   useCallback callback @ 275()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``275``—``285`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``setShowLeftShadow``、``setShowRightShadow``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12532:12883:FUNCTION

.. rubric:: ``useCallback callback @ 287``

.. code-block:: javascript

   useCallback callback @ 287(direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``287``—``297`` 行；所属函数 ``memo callback @ 265``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``container.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:12952:13068:FUNCTION

.. rubric:: ``useMemo callback @ 301``

.. code-block:: javascript

   useMemo callback @ 301()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13166:13755:FUNCTION

.. rubric:: ``useMemo callback @ 306``

.. code-block:: javascript

   useMemo callback @ 306()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``306``—``323`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``normalizedAttachments.map((attachment, index) => ( <AttachmentItem key={attachment.id || index} attachment={attachment} index={index} onRemove={onRemove} onVisionToggle={onVisionT…``。

**主要协作调用**：``normalizedAttachments.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13317:13743:FUNCTION

.. rubric:: ``normalizedAttachments.map callback @ 311``

.. code-block:: javascript

   normalizedAttachments.map callback @ 311(attachment, index)

作为 ``normalizedAttachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``322`` 行；所属函数 ``useMemo callback @ 306``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:13863:14936:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 325``

.. code-block:: javascript

   useLayoutEffect callback @ 325()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``325``—``348`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); container.removeEventListener('scroll', scheduleCheck); window.removeEventListener('resize', scheduleCheck); resizeObserver?.disconne…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``、``container.addEventListener``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14085:14237:FUNCTION

.. rubric:: ``scheduleCheck``

.. code-block:: javascript

   scheduleCheck()

实现 ``scheduleCheck`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``330``—``333`` 行；所属函数 ``useLayoutEffect callback @ 325``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:14662:14925:FUNCTION

.. rubric:: ``returned callback @ 342``

.. code-block:: javascript

   returned callback @ 342()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``342``—``347`` 行；所属函数 ``useLayoutEffect callback @ 325``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``container.removeEventListener``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15003:15161:FUNCTION

.. rubric:: ``useEffect callback @ 350``

.. code-block:: javascript

   useEffect callback @ 350()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``350``—``353`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.cancelAnimationFrame(frameId)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:15107:15150:FUNCTION

.. rubric:: ``returned callback @ 352``

.. code-block:: javascript

   returned callback @ 352()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``352``—``352`` 行；所属函数 ``useEffect callback @ 350``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:16981:17012:FUNCTION

.. rubric:: ``onClick callback @ 395``

.. code-block:: javascript

   onClick callback @ 395()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``395``—``395`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:17246:17278:FUNCTION

.. rubric:: ``onClick callback @ 402``

.. code-block:: javascript

   onClick callback @ 402()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``402``—``402`` 行；所属函数 ``memo callback @ 265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/AttachmentShowcase.jsx:17485:19318:FUNCTION

.. rubric:: ``memo callback @ 411``

.. code-block:: javascript

   memo callback @ 411(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``411``—``452`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.msgMode === nextProps.msgMode && prevProps.onRemove === nextProps.onRemove && prevProps.onVisionToggle === nextProps.onVisionToggle && prevProps.visionSupported === ne…``。

**主要协作调用**：``normalizeAttachmentList``。
