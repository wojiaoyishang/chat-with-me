src/features/workflows/WorkflowSourcePicker 模块
====================================================================================================

.. js:module:: src/features/workflows/WorkflowSourcePicker

Keep the canvas node size stable while the account-scoped picker loads.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSourcePicker.jsx``
* **模块标识**：``src/features/workflows/WorkflowSourcePicker``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：52

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/checkbox``、``@/components/ui/switch``、``@/components/ui/select``、``@/components/ui/popover``、``@/components/ui/MultilineEditor.jsx``、``@/lib/apiClient.js``、``@/lib/virtualUrl.js``、``./WorkflowResourcePreview.jsx``、``./WorkflowSelectedAttachments.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:892:1712:FUNCTION

.. js:function:: ResourceThumbnail({ item, sourceType })

   渲染 ``ResourceThumbnail`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``65`` 行。

   **参数**

   ``{ item, sourceType }``
      调用方传入的 ``item, sourceType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span className={\x60workflow-resource-icon ${loaded && !failed ? "has-thumbnail" : ""}\x60} aria-hidden="true" > {sourceType === "document" ? ( <FileText className="size-5" /> ) : (…``。

   **主要协作调用**：``resolveResourceUrl``、``useState``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:1712:2730:FUNCTION

.. js:function:: WorkflowSelect({ value, onChange, options, label, disabled })

   渲染 ``WorkflowSelect`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``67``—``99`` 行。

   **参数**

   ``{ value, onChange, options, label, disabled }``
      调用方传入的 ``value, onChange, options, label, disabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Select value={selected} onValueChange={(next) => onChange(next === "_none" ? "" : next)} disabled={disabled} > <SelectTrigger className="w-full" aria-label={label}> <SelectValu…``。

   **主要协作调用**：``String``、``options.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:2730:3050:FUNCTION

.. js:function:: WorkflowSourcePicker({ compact = false, ...props })

   Keep the canvas node size stable while the account-scoped picker loads.

   **性质**：同步函数；导出 API；源码第 ``102``—``107`` 行。

   **参数**

   ``{ compact = false, ...props }``
      调用方传入的 ``compact = false, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FullWorkflowSourcePicker {...props} compact={compact} />``、``<CompactWorkflowSourcePicker {...props} />``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:3050:7042:FUNCTION

.. js:function:: CompactWorkflowSourcePicker(props)

   渲染 ``CompactWorkflowSourcePicker`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``109``—``224`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="workflow-compact-source"> <Popover open={open} onOpenChange={(next) => { if (busy || previewOpen) return; if (next) setDraft(props.value || {}); setOpen(next); }…``。

   **主要协作调用**：``useState``、``Number``、``Boolean``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:7042:23341:FUNCTION

.. js:function:: FullWorkflowSourcePicker({ value, onChange, disabled, onBusyChange, onPreviewOpenChange, onItemsLoaded, fixedType, maxItems,…)

   Uses the same account-scoped, paginated resources as the attachment page.

   **性质**：同步函数；模块内部入口；源码第 ``227``—``690`` 行。

   **参数**

   ``{ value, onChange, disabled, onBusyChange, onPreviewOpenChange, onItemsLoaded, fixedType, maxItems,…``
      调用方传入的 ``value, onChange, disabled, onBusyChange, onPreviewOpenChange, onItemsLoaded, fixedType, maxItems,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className={\x60workflow-source space-y-3 ${compact ? "is-compact" : ""}\x60} > {!fixedType && ( <> <label className="workflow-label">初始化来源</label> <WorkflowSelect label="初始化来…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``items.map``、``Math.floor``、``Math.ceil``。

   **内部回调数量**：20。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:1119:1174:FUNCTION

.. rubric:: ``useEffect callback @ 39``

.. code-block:: javascript

   useEffect callback @ 39()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``42`` 行；所属函数 ``ResourceThumbnail``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``、``setLoaded``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:1609:1630:FUNCTION

.. rubric:: ``onLoad callback @ 59``

.. code-block:: javascript

   onLoad callback @ 59()

处理 ``Load`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``ResourceThumbnail``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoaded``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:1651:1672:FUNCTION

.. rubric:: ``onError callback @ 60``

.. code-block:: javascript

   onError callback @ 60()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``ResourceThumbnail``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:1937:1985:FUNCTION

.. rubric:: ``onValueChange callback @ 72``

.. code-block:: javascript

   onValueChange callback @ 72(next)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``WorkflowSelect``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:2225:2684:FUNCTION

.. rubric:: ``options.map callback @ 79``

.. code-block:: javascript

   options.map callback @ 79(option)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``95`` 行；所属函数 ``WorkflowSelect``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:3610:3748:FUNCTION

.. rubric:: ``onOpenChange callback @ 124``

.. code-block:: javascript

   onOpenChange callback @ 124(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``128`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDraft``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:4617:4651:FUNCTION

.. rubric:: ``onPointerDown callback @ 153``

.. code-block:: javascript

   onPointerDown callback @ 153(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``153``—``153`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:4682:4767:FUNCTION

.. rubric:: ``onInteractOutside callback @ 154``

.. code-block:: javascript

   onInteractOutside callback @ 154(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``154``—``156`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:4795:4872:FUNCTION

.. rubric:: ``onFocusOutside callback @ 157``

.. code-block:: javascript

   onFocusOutside callback @ 157(event)

处理 ``Focus Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``157``—``159`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:4901:4986:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 160``

.. code-block:: javascript

   onEscapeKeyDown callback @ 160(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``162`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:5237:5339:FUNCTION

.. rubric:: ``onBusyChange callback @ 169``

.. code-block:: javascript

   onBusyChange callback @ 169(next)

处理 ``Busy Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``169``—``172`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``props.onBusyChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:5421:5789:FUNCTION

.. rubric:: ``onItemsLoaded callback @ 174``

.. code-block:: javascript

   onItemsLoaded callback @ 174(items)

处理 ``Items Loaded`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``174``—``184`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKnownItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:5462:5788:FUNCTION

.. rubric:: ``setKnownItems callback @ 175``

.. code-block:: javascript

   setKnownItems callback @ 175(current)

设置与 ``Known Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``175``—``184`` 行；所属函数 ``onItemsLoaded callback @ 174``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:5579:5746:FUNCTION

.. rubric:: ``items.map callback @ 178``

.. code-block:: javascript

   items.map callback @ 178(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``178``—``182`` 行；所属函数 ``setKnownItems callback @ 175``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:6391:6506:FUNCTION

.. rubric:: ``onClick callback @ 201``

.. code-block:: javascript

   onClick callback @ 201()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``201``—``204`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``props.onChange``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:6920:6992:FUNCTION

.. rubric:: ``onReorder callback @ 217``

.. code-block:: javascript

   onReorder callback @ 217(resources)

处理 ``Reorder`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``217``—``218`` 行；所属函数 ``CompactWorkflowSourcePicker``。

**参数**

``resources``
   调用方传入的 ``resources`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``props.onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:8305:8354:FUNCTION

.. rubric:: ``useEffect callback @ 260``

.. code-block:: javascript

   useEffect callback @ 260()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``260``—``262`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``busyChanged.current``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:8382:8479:FUNCTION

.. rubric:: ``useEffect callback @ 264``

.. code-block:: javascript

   useEffect callback @ 264()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``264``—``267`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:8392:8479:FUNCTION

.. rubric:: ``anonymous callback @ 264``

.. code-block:: javascript

   anonymous callback @ 264()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``264``—``267`` 行；所属函数 ``useEffect callback @ 264``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeUpload.current?.abort``、``busyChanged.current``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:8507:10311:FUNCTION

.. rubric:: ``useEffect callback @ 271``

.. code-block:: javascript

   useEffect callback @ 271()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``271``—``326`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { clearTimeout(timer); controller.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:8669:10221:FUNCTION

.. rubric:: ``setTimeout callback @ 276``

.. code-block:: javascript

   async setTimeout callback @ 276()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``276``—``321`` 行；所属函数 ``useEffect callback @ 271``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``["image", "video"].includes``、``apiClient.get``、``setItems``、``setTotal``、``setResourceItems``、``itemsLoaded.current``、``setResourceNames``、``setError``、``setLoading``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:9308:9568:FUNCTION

.. rubric:: ``setResourceItems callback @ 293``

.. code-block:: javascript

   setResourceItems callback @ 293(current)

设置与 ``Resource Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``293``—``301`` 行；所属函数 ``setTimeout callback @ 276``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``loadedItems.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:9413:9538:FUNCTION

.. rubric:: ``loadedItems.map callback @ 296``

.. code-block:: javascript

   loadedItems.map callback @ 296(item)

作为 ``loadedItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``296``—``299`` 行；所属函数 ``setResourceItems callback @ 293``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:9644:10029:FUNCTION

.. rubric:: ``setResourceNames callback @ 303``

.. code-block:: javascript

   setResourceNames callback @ 303(current)

设置与 ``Resource Names`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``303``—``314`` 行；所属函数 ``setTimeout callback @ 276``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``(result.items || []).flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:9762:9999:FUNCTION

.. rubric:: ``(result.items || []).flatMap callback @ 306``

.. code-block:: javascript

   (result.items || []).flatMap callback @ 306(item)

实现 ``(result.items || []).flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``306``—``312`` 行；所属函数 ``setResourceNames callback @ 303``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:10239:10306:FUNCTION

.. rubric:: ``returned callback @ 322``

.. code-block:: javascript

   returned callback @ 322()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``322``—``325`` 行；所属函数 ``useEffect callback @ 271``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:10367:10937:FUNCTION

.. rubric:: ``pick``

.. code-block:: javascript

   pick(item)

实现 ``pick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``328``—``348`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``current.includes``、``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:10806:10836:FUNCTION

.. rubric:: ``current.filter callback @ 342``

.. code-block:: javascript

   current.filter callback @ 342(resource)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``pick``。

**参数**

``resource``
   调用方传入的 ``resource`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:10961:12290:FUNCTION

.. rubric:: ``uploadFiles``

.. code-block:: javascript

   async uploadFiles(files)

实现 ``uploadFiles`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``350``—``389`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error(\x60“${file.name}”上传结果没有资源标识，请重试。\x60)``。

**主要协作调用**：``setUploading``、``setError``、``files.slice``、``data.append``、``apiClient.post``、``added.push``、``setResourceNames``、``current.onChange``、``added.at``、``setRefresh``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:11685:11770:FUNCTION

.. rubric:: ``setResourceNames callback @ 368``

.. code-block:: javascript

   setResourceNames callback @ 368(current)

设置与 ``Resource Names`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``368``—``371`` 行；所属函数 ``uploadFiles``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``added.at``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:12250:12270:FUNCTION

.. rubric:: ``setRefresh callback @ 386``

.. code-block:: javascript

   setRefresh callback @ 386(count)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``386``—``386`` 行；所属函数 ``uploadFiles``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:12642:12779:FUNCTION

.. rubric:: ``onChange callback @ 402``

.. code-block:: javascript

   onChange callback @ 402(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``402``—``406`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``、``setQuery``、``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:13037:13096:FUNCTION

.. rubric:: ``onChange callback @ 417``

.. code-block:: javascript

   onChange callback @ 417(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:13920:14012:FUNCTION

.. rubric:: ``onCheckedChange callback @ 439``

.. code-block:: javascript

   onCheckedChange callback @ 439(preserveSelectionOrder)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``439``—``440`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``preserveSelectionOrder``
   调用方传入的 ``preserveSelectionOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:14578:14688:FUNCTION

.. rubric:: ``onChange callback @ 455``

.. code-block:: javascript

   onChange callback @ 455(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``455``—``458`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setOffset``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:15011:15040:FUNCTION

.. rubric:: ``onClick callback @ 467``

.. code-block:: javascript

   onClick callback @ 467()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``467``—``467`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``upload.current?.click``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:15949:16145:FUNCTION

.. rubric:: ``onClick callback @ 490``

.. code-block:: javascript

   onClick callback @ 490()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``490``—``495`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:16534:16662:FUNCTION

.. rubric:: ``onChange callback @ 507``

.. code-block:: javascript

   onChange callback @ 507(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``507``—``510`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``uploadFiles``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:17493:17514:FUNCTION

.. rubric:: ``onClick callback @ 532``

.. code-block:: javascript

   onClick callback @ 532()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:17887:17908:FUNCTION

.. rubric:: ``onClick callback @ 543``

.. code-block:: javascript

   onClick callback @ 543()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``543``—``543`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:18269:20867:FUNCTION

.. rubric:: ``items.map callback @ 553``

.. code-block:: javascript

   items.map callback @ 553(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``553``—``614`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id} className={\x60workflow-resource-choice ${selected ? "is-selected" : ""}\x60} > <Checkbox className="workflow-resource-check" checked={selected} disabled={disabled…``。

**主要协作调用**：``(value.resources || []).includes``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:19082:19098:FUNCTION

.. rubric:: ``onCheckedChange callback @ 570``

.. code-block:: javascript

   onCheckedChange callback @ 570()

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``570``—``570`` 行；所属函数 ``items.map callback @ 553``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pick``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:19425:19441:FUNCTION

.. rubric:: ``onClick callback @ 578``

.. code-block:: javascript

   onClick callback @ 578()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``578``—``578`` 行；所属函数 ``items.map callback @ 553``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pick``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:20521:20705:FUNCTION

.. rubric:: ``onClick callback @ 604``

.. code-block:: javascript

   onClick callback @ 604(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``604``—``608`` 行；所属函数 ``items.map callback @ 553``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onPreviewOpenChange``、``setPreviewItem``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:21641:21696:FUNCTION

.. rubric:: ``onClick callback @ 636``

.. code-block:: javascript

   onClick callback @ 636()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``636``—``636`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:21657:21695:FUNCTION

.. rubric:: ``setOffset callback @ 636``

.. code-block:: javascript

   setOffset callback @ 636(current)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``636``—``636`` 行；所属函数 ``onClick callback @ 636``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:22088:22130:FUNCTION

.. rubric:: ``onClick callback @ 648``

.. code-block:: javascript

   onClick callback @ 648()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``648``—``648`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:22104:22129:FUNCTION

.. rubric:: ``setOffset callback @ 648``

.. code-block:: javascript

   setOffset callback @ 648(current)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``648``—``648`` 行；所属函数 ``onClick callback @ 648``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:22503:22551:FUNCTION

.. rubric:: ``onReorder callback @ 659``

.. code-block:: javascript

   onReorder callback @ 659(resources)

处理 ``Reorder`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``659``—``659`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``resources``
   调用方传入的 ``resources`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:22577:22785:FUNCTION

.. rubric:: ``onRemove callback @ 660``

.. code-block:: javascript

   onRemove callback @ 660(uri)

处理 ``Remove`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``660``—``666`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

``uri``
   调用方传入的 ``uri`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``value.resources.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:22693:22744:FUNCTION

.. rubric:: ``value.resources.filter callback @ 664``

.. code-block:: javascript

   value.resources.filter callback @ 664(resource)

作为 ``value.resources.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``664``—``664`` 行；所属函数 ``onRemove callback @ 660``。

**参数**

``resource``
   调用方传入的 ``resource`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSourcePicker.jsx:23203:23298:FUNCTION

.. rubric:: ``onClose callback @ 682``

.. code-block:: javascript

   onClose callback @ 682()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``682``—``685`` 行；所属函数 ``FullWorkflowSourcePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewItem``、``onPreviewOpenChange``。
