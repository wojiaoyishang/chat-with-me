src/features/workflows/WorkflowSelectedAttachments 模块
==================================================================================================================

.. js:module:: src/features/workflows/WorkflowSelectedAttachments

Display confirmed resources even when their input is read-only.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSelectedAttachments.jsx``
* **模块标识**：``src/features/workflows/WorkflowSelectedAttachments``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：29

主要依赖
--------------------------------------------------------------------------------

``react``、``@dnd-kit/core``、``@dnd-kit/sortable``、``@dnd-kit/utilities``、``lucide-react``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/lib/virtualUrl.js``、``./WorkflowResourcePreview.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:714:801:FUNCTION

.. js:function:: artifactUri(uri)

   实现 ``artifactUri`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``33`` 行。

   **参数**

   ``uri``
      调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``/^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/i.test``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:802:3789:FUNCTION

.. js:function:: SortableAttachmentRow({ uri, index, count, item, unavailable, name, canReorder, onMove, onOpen, onRemove, })

   渲染 ``SortableAttachmentRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``146`` 行。

   **参数**

   ``{ uri, index, count, item, unavailable, name, canReorder, onMove, onOpen, onRemove, }``
      调用方传入的 ``uri, index, count, item, unavailable, name, canReorder, onMove, onOpen, onRemove,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <li ref={setNodeRef} className={ canReorder ? \x60nodrag is-sortable${isDragging ? " is-dragging" : ""}\x60 : undefined } style={{ transform: CSS.Transform.toString(transform), transi…``。

   **主要协作调用**：``useSortable``、``CSS.Transform.toString``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:3789:11632:FUNCTION

.. js:function:: WorkflowSelectedAttachments({ resources = [], knownItems = {}, onRemove, onReorder, disabled, onPreviewOpenChange, })

   Display confirmed resources even when their input is read-only.

   **性质**：同步函数；导出 API；源码第 ``149``—``385`` 行。

   **参数**

   ``{ resources = [], knownItems = {}, onRemove, onReorder, disabled, onPreviewOpenChange, }``
      调用方传入的 ``resources = , knownItems = , onRemove, onReorder, disabled, onPreviewOpenChange,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="workflow-selected-attachments" aria-label="已选附件" aria-busy={loading} > {singleImage && singleUrl ? ( <figure className="workflow-selected-image"> <Button typ…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``resources.filter``、``JSON.stringify``、``[...new Set(selected.filter(artifactUri))].sort``、``selected.filter``、``useState``、``useSensors``、``useSensor``、``useRef``、``useEffect``、``Boolean``、``itemFor``、``isUnavailable``。

   **内部回调数量**：16。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:1687:1720:FUNCTION

.. rubric:: ``onDragStart callback @ 76``

.. code-block:: javascript

   onDragStart callback @ 76(event)

处理 ``Drag Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:2406:2440:FUNCTION

.. rubric:: ``onPointerDown callback @ 97``

.. code-block:: javascript

   onPointerDown callback @ 97(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:2461:2479:FUNCTION

.. rubric:: ``onClick callback @ 98``

.. code-block:: javascript

   onClick callback @ 98()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:2827:2861:FUNCTION

.. rubric:: ``onPointerDown callback @ 112``

.. code-block:: javascript

   onPointerDown callback @ 112(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:2884:2912:FUNCTION

.. rubric:: ``onClick callback @ 113``

.. code-block:: javascript

   onClick callback @ 113()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onMove``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:3233:3267:FUNCTION

.. rubric:: ``onPointerDown callback @ 124``

.. code-block:: javascript

   onPointerDown callback @ 124(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:3290:3318:FUNCTION

.. rubric:: ``onClick callback @ 125``

.. code-block:: javascript

   onClick callback @ 125()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onMove``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:3625:3659:FUNCTION

.. rubric:: ``onPointerDown callback @ 138``

.. code-block:: javascript

   onPointerDown callback @ 138(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:3680:3699:FUNCTION

.. rubric:: ``onClick callback @ 139``

.. code-block:: javascript

   onClick callback @ 139()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``SortableAttachmentRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRemove``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:4054:4086:FUNCTION

.. rubric:: ``resources.filter callback @ 157``

.. code-block:: javascript

   resources.filter callback @ 157(uri)

作为 ``resources.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:4889:6411:FUNCTION

.. rubric:: ``useEffect callback @ 180``

.. code-block:: javascript

   useEffect callback @ 180()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``222`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``JSON.parse``、``setError``、``setLoading``、``setResolved``、``read``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:5124:5149:FUNCTION

.. rubric:: ``returned callback @ 187``

.. code-block:: javascript

   returned callback @ 187()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:5195:6352:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   async read()

实现 ``read`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``190``—``219`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error("附件信息暂时无法读取。")``。

**主要协作调用**：``uris.slice``、``apiClient.post``、``Array.isArray``、``batch.includes``、``unavailable.add``、``setResolved``、``setError``、``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6381:6406:FUNCTION

.. rubric:: ``returned callback @ 221``

.. code-block:: javascript

   returned callback @ 221()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6440:6514:FUNCTION

.. rubric:: ``useEffect callback @ 224``

.. code-block:: javascript

   useEffect callback @ 224()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``224``—``227`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewItem``、``previewChanged.current``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6542:6585:FUNCTION

.. rubric:: ``useEffect callback @ 228``

.. code-block:: javascript

   useEffect callback @ 228()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6547:6585:FUNCTION

.. rubric:: ``anonymous callback @ 228``

.. code-block:: javascript

   anonymous callback @ 228()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``useEffect callback @ 228``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previewChanged.current``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6680:6788:FUNCTION

.. rubric:: ``itemFor``

.. code-block:: javascript

   itemFor(uri)

实现 ``itemFor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``231``—``234`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current?.unavailable.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6813:6882:FUNCTION

.. rubric:: ``isUnavailable``

.. code-block:: javascript

   isUnavailable(uri)

判断与 ``Unavailable`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``235``—``236`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``artifactUri``、``current?.unavailable.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6898:6976:FUNCTION

.. rubric:: ``open``

.. code-block:: javascript

   open(item)

打开与 ``open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``237``—``240`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previewChanged.current``、``setPreviewItem``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:6995:7379:FUNCTION

.. rubric:: ``reorder``

.. code-block:: javascript

   reorder(uri, targetIndex)

实现 ``reorder`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``255`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetIndex``
   调用方传入的 ``targetIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``selected.indexOf``、``next.splice``、``onReorder``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:7710:7737:FUNCTION

.. rubric:: ``useEffect callback @ 262``

.. code-block:: javascript

   useEffect callback @ 262()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageFailed``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:8224:8242:FUNCTION

.. rubric:: ``onClick callback @ 278``

.. code-block:: javascript

   onClick callback @ 278()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``278``—``278`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``open``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:8647:8673:FUNCTION

.. rubric:: ``onError callback @ 291``

.. code-block:: javascript

   onError callback @ 291()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageFailed``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:9254:9281:FUNCTION

.. rubric:: ``onClick callback @ 309``

.. code-block:: javascript

   onClick callback @ 309()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``309``—``309`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRemove``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:9718:9867:FUNCTION

.. rubric:: ``onDragEnd callback @ 326``

.. code-block:: javascript

   onDragEnd callback @ 326({ active, over })

处理 ``Drag End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``326``—``329`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``{ active, over }``
   调用方传入的 ``active, over`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reorder``、``selected.indexOf``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:10141:10174:FUNCTION

.. rubric:: ``onDragStartCapture callback @ 337``

.. code-block:: javascript

   onDragStartCapture callback @ 337(event)

处理 ``Drag Start Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``337``—``337`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:10222:10926:FUNCTION

.. rubric:: ``selected.map callback @ 339``

.. code-block:: javascript

   selected.map callback @ 339(uri, index)

作为 ``selected.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``339``—``356`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <SortableAttachmentRow key={uri} uri={uri} index={index} count={selected.length} item={item} unavailable={isUnavailable(uri)} name={item?.name || item?.title || \x60附件 ${index + 1}…``。

**主要协作调用**：``itemFor``、``isUnavailable``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSelectedAttachments.jsx:11491:11589:FUNCTION

.. rubric:: ``onClose callback @ 377``

.. code-block:: javascript

   onClose callback @ 377()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``377``—``380`` 行；所属函数 ``WorkflowSelectedAttachments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewItem``、``previewChanged.current``。
