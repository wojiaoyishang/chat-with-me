src/features/workflows/WorkflowEditor 模块
========================================================================================

.. js:module:: src/features/workflows/WorkflowEditor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowEditor.jsx``
* **模块标识**：``src/features/workflows/WorkflowEditor``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：253

主要依赖
--------------------------------------------------------------------------------

``./workflowProducts.js``、``react``、``@xyflow/react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/components/ui/alert-dialog``、``@/components/setting/JsonConfigEditor.jsx``、``@/components/ui/MultilineEditor.jsx``、``@/lib/apiClient.js``、``@/lib/resourceDownload.js``、``@/lib/tools.jsx``、``./workflowApi.js``、``./workflowSettings.js``、``./workflowParallelModel.js``、``./workflowRegions.js``、``./WorkflowRegionControl.jsx``、``./workflowModel.js``、``./WorkflowSubgraphPanel.jsx``、``./WorkflowInterfaceNode.jsx``、``./WorkflowInterfacePanel.jsx``、``./workflowInterfaceModel.js``、``./WorkflowSettingsFields.jsx``、``./WorkflowCanvas.jsx``、``./WorkflowEdge.jsx``、``./WorkflowContextMenu.jsx``、``./WorkflowNodePicker.jsx``、``./WorkflowSidebar.jsx``、``./WorkflowNode.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:3935:4051:FUNCTION

.. js:function:: newDraft()

   实现 ``newDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``137``—``143`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeGraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:4069:4102:FUNCTION

.. js:function:: snapshot(draft)

   实现 ``snapshot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``144``—``144`` 行。

   **参数**

   ``draft``
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:4103:4264:FUNCTION

.. js:function:: WorkflowEditor(props)

   渲染 ``WorkflowEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``146``—``152`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ReactFlowProvider> <WorkflowEditorWorkspace {...props} /> </ReactFlowProvider> )``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:4264:97897:FUNCTION

.. js:function:: WorkflowEditorWorkspace({ request = {}, onClose, onChanged })

   渲染 ``WorkflowEditorWorkspace`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``154``—``2826`` 行。

   **参数**

   ``{ request = {}, onClose, onChanged }``
      调用方传入的 ``request = , onClose, onChanged`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open) close(); }} > <DialogContent ref={dialogRef} className="workflow-dialog" showCloseButton={false} onKeyDown={keyboard} onInterac…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``useReactFlow``、``useViewport``、``useLocalSetting``、``useState``、``useRef``、``snapshot``、``useWorkflowTask``、``useMemo``、``workflowGraphAtPath``、``workflowUsesKnowledge``、``graphPath.join``、``workflowInterfaceContainer``。

   **内部回调数量**：157。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:6099:6314:FUNCTION

.. rubric:: ``useMemo callback @ 201``

.. code-block:: javascript

   useMemo callback @ 201()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``201``—``208`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``initializeGraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:6675:6728:FUNCTION

.. rubric:: ``useMemo callback @ 221``

.. code-block:: javascript

   useMemo callback @ 221()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowGraphContext``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:6880:6955:FUNCTION

.. rubric:: ``useMemo callback @ 226``

.. code-block:: javascript

   useMemo callback @ 226()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowInterfaceProjection``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:7042:7533:FUNCTION

.. rubric:: ``useMemo callback @ 230``

.. code-block:: javascript

   useMemo callback @ 230()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``230``—``245`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``catalog.nodes.filter``、``[ SUBGRAPH_CANVAS_DEFINITION, ...(graphPath.length ? WORKFLOW_INTERFACE_DEFINITIONS : []), ].map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:7085:7119:FUNCTION

.. rubric:: ``catalog.nodes.filter callback @ 231``

.. code-block:: javascript

   catalog.nodes.filter callback @ 231(node)

作为 ``catalog.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``useMemo callback @ 230``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:7250:7525:FUNCTION

.. rubric:: ``[ SUBGRAPH_CANVAS_DEFINITION, ...(graphPath.length ? WORKFLOW_INTERFACE_DEFINITIONS : []), ].map callback @ 235``

.. code-block:: javascript

   [ SUBGRAPH_CANVAS_DEFINITION, ...(graphPath.length ? WORKFLOW_INTERFACE_DEFINITIONS : []), ].map callback @ 235(fallback)

作为 ``[ SUBGRAPH_CANVAS_DEFINITION, ...(graphPath.length ? WORKFLOW_INTERFACE_DEFINITIONS : []), ].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``235``—``244`` 行；所属函数 ``useMemo callback @ 230``。

**参数**

``fallback``
   调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...fallback, ...metadata, display: { ...fallback.display, ...metadata?.display }, }``。

**主要协作调用**：``catalog.editorNodes?.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:7317:7365:FUNCTION

.. rubric:: ``catalog.editorNodes?.find callback @ 237``

.. code-block:: javascript

   catalog.editorNodes?.find callback @ 237(node)

作为 ``catalog.editorNodes?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``[ SUBGRAPH_CANVAS_DEFINITION, ...(graphPath.length ? WORKFLOW_INTERFACE_DEFINITIONS : []), ].map callback @ 235``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:7630:7725:FUNCTION

.. rubric:: ``currentEditableGraph``

.. code-block:: javascript

   currentEditableGraph()

实现 ``currentEditableGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``248``—``250`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowGraphAtPath``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:9322:9796:FUNCTION

.. rubric:: ``useEffect callback @ 284``

.. code-block:: javascript

   useEffect callback @ 284()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``284``—``295`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener("pointermove", trackPointer)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:9412:9640:FUNCTION

.. rubric:: ``trackPointer``

.. code-block:: javascript

   trackPointer(event)

实现 ``trackPointer`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``286``—``292`` 行；所属函数 ``useEffect callback @ 284``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingPlacement``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:9541:9622:FUNCTION

.. rubric:: ``setPendingPlacement callback @ 289``

.. code-block:: javascript

   setPendingPlacement callback @ 289(current)

设置与 ``Pending Placement`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``289``—``290`` 行；所属函数 ``trackPointer``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:9729:9791:FUNCTION

.. rubric:: ``returned callback @ 294``

.. code-block:: javascript

   returned callback @ 294()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``294``—``294`` 行；所属函数 ``useEffect callback @ 284``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:9854:10111:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 296``

.. code-block:: javascript

   useLayoutEffect callback @ 296()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``296``—``308`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPendingLink``、``pendingWorkflowConnectionPath``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10193:10326:FUNCTION

.. rubric:: ``useCallback callback @ 310``

.. code-block:: javascript

   useCallback callback @ 310(key, valid)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``310``—``313`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``valid``
   调用方传入的 ``valid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInvalid``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10231:10317:FUNCTION

.. rubric:: ``setInvalid callback @ 311``

.. code-block:: javascript

   setInvalid callback @ 311(current)

设置与 ``Invalid`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``311``—``312`` 行；所属函数 ``useCallback callback @ 310``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10353:10419:FUNCTION

.. rubric:: ``useEffect callback @ 316``

.. code-block:: javascript

   useEffect callback @ 316()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``316``—``318`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``validity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10461:10553:FUNCTION

.. rubric:: ``useEffect callback @ 319``

.. code-block:: javascript

   useEffect callback @ 319()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``319``—``324`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10505:10548:FUNCTION

.. rubric:: ``returned callback @ 321``

.. code-block:: javascript

   returned callback @ 321()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``321``—``323`` 行；所属函数 ``useEffect callback @ 319``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10572:10608:FUNCTION

.. rubric:: ``useEffect callback @ 325``

.. code-block:: javascript

   useEffect callback @ 325()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``327`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowTask``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:10665:11252:FUNCTION

.. rubric:: ``useCallback callback @ 329``

.. code-block:: javascript

   useCallback callback @ 329(next)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``329``—``349`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setGraphPath``、``setDraft``、``setBaseline``、``snapshot``、``setInvalid``、``setSelected``、``setSelectedIds``、``setSelectedEdges``、``setSelectionRequest``、``setFitRequest``、``setFocusRequest``、``setMonitorPositions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:11063:11087:FUNCTION

.. rubric:: ``setFitRequest callback @ 342``

.. code-block:: javascript

   setFitRequest callback @ 342(current)

设置与 ``Fit Request`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``useCallback callback @ 329``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:11272:13789:FUNCTION

.. rubric:: ``useEffect callback @ 351``

.. code-block:: javascript

   useEffect callback @ 351()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``351``—``419`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl…``、``Promise.all``、``workflowApi.catalog``、``workflowApi.templates``、``workflowApi.task``、``request.templateId.startsWith``、``workflowApi.template``、``Promise.resolve``、``apiClient .get("/chat/models", { signal: controller.signal }) .then((result) => { if (!controller.signal.aborted) setMo…``、``apiClient .get("/chat/models", { signal: controller.signal }) .then``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:11763:13309:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 364``

.. code-block:: javascript

   Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 364([definitions, saved, detail])

实现 ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``364``—``404`` 行；所属函数 ``useEffect callback @ 351``。

**参数**

``[definitions, saved, detail]``
   调用方传入的 ``definitions, saved, detail`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setCatalog``、``setTemplates``、``(definitions.builtinTemplates || []).find``、``installDraft``、``initializeGraph``、``normalizeGraph``、``setTemplate``、``setBuiltinTemplateId``、``setInitialTask``、``setViewMode``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:12047:12098:FUNCTION

.. rubric:: ``(definitions.builtinTemplates || []).find callback @ 370``

.. code-block:: javascript

   (definitions.builtinTemplates || []).find callback @ 370(item)

作为 ``(definitions.builtinTemplates || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``370`` 行；所属函数 ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 364``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:13324:13409:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 405``

.. code-block:: javascript

   Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 405(cause)

实现 ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``405``—``407`` 行；所属函数 ``useEffect callback @ 351``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:13426:13500:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 408``

.. code-block:: javascript

   Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl… callback @ 408()

实现 ``Promise.all([ workflowApi.catalog(controller.signal), workflowApi.templates(controller.signal), request.taskId ? workfl…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``408``—``410`` 行；所属函数 ``useEffect callback @ 351``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:13587:13723:FUNCTION

.. rubric:: ``apiClient .get("/chat/models", { signal: controller.signal }) .then callback @ 413``

.. code-block:: javascript

   apiClient .get("/chat/models", { signal: controller.signal }) .then callback @ 413(result)

处理 ``apiClient .get("/chat/models", { signal: controller.signal }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``413``—``416`` 行；所属函数 ``useEffect callback @ 351``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setModels``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:13738:13746:FUNCTION

.. rubric:: ``apiClient .get("/chat/models", { signal: controller.signal }) .then((result) => { if (!controller.signal.aborted) setMo… callback @ 417``

.. code-block:: javascript

   apiClient .get("/chat/models", { signal: controller.signal }) .then((result) => { if (!controller.signal.aborted) setMo… callback @ 417()

实现 ``apiClient .get("/chat/models", { signal: controller.signal }) .then((result) => { if (!controller.signal.aborted) setMo…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``useEffect callback @ 351``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:13759:13784:FUNCTION

.. rubric:: ``returned callback @ 418``

.. code-block:: javascript

   returned callback @ 418()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``useEffect callback @ 351``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:13901:14325:FUNCTION

.. rubric:: ``useCallback callback @ 421``

.. code-block:: javascript

   useCallback callback @ 421(update)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``421``—``431`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``update``
   调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``update``、``snapshot``、``history.current.past.push``、``clone``、``history.current.past.shift``、``setDraft``、``setNotice``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:14366:14761:FUNCTION

.. rubric:: ``useCallback callback @ 433``

.. code-block:: javascript

   useCallback callback @ 433(update, boundary)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``433``—``447`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``update``
   调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``boundary``
   调用方传入的 ``boundary`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:14411:14760:FUNCTION

.. rubric:: ``changeDraft callback @ 434``

.. code-block:: javascript

   changeDraft callback @ 434(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``434``—``447`` 行；所属函数 ``useCallback callback @ 433``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next === current.graph ? current : { ...current, graph: pruneDeletedWorkflowRegions(current.graph, next), }``。

**主要协作调用**：``updateWorkflowGraphAtPath``、``pruneDeletedWorkflowRegions``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:14833:15358:FUNCTION

.. rubric:: ``useCallback callback @ 451``

.. code-block:: javascript

   useCallback callback @ 451(region, maximum)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``451``—``465`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``maximum``
   调用方传入的 ``maximum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``changeGraph``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:14935:15350:FUNCTION

.. rubric:: ``changeGraph callback @ 453``

.. code-block:: javascript

   changeGraph callback @ 453(inner)

实现 ``changeGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``453``—``464`` 行；所属函数 ``useCallback callback @ 451``。

**参数**

``inner``
   调用方传入的 ``inner`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...inner, version: 3, executionRegions: regions }``。

**主要协作调用**：``(inner.executionRegions || []).filter``、``regions.push``、``workflowId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:15010:15052:FUNCTION

.. rubric:: ``(inner.executionRegions || []).filter callback @ 455``

.. code-block:: javascript

   (inner.executionRegions || []).filter callback @ 455(item)

作为 ``(inner.executionRegions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``455``—``455`` 行；所属函数 ``changeGraph callback @ 453``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:15456:16469:FUNCTION

.. rubric:: ``useCallback callback @ 469``

.. code-block:: javascript

   useCallback callback @ 469(moved)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``469``—``500`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``moved``
   调用方传入的 ``moved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setMonitorPositions``、``changeDraft``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:15578:15776:FUNCTION

.. rubric:: ``setMonitorPositions callback @ 472``

.. code-block:: javascript

   setMonitorPositions callback @ 472(current)

设置与 ``Monitor Positions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``472``—``478`` 行；所属函数 ``useCallback callback @ 469``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:15814:16453:FUNCTION

.. rubric:: ``changeDraft callback @ 480``

.. code-block:: javascript

   changeDraft callback @ 480(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``480``—``498`` 行；所属函数 ``useCallback callback @ 469``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...current, graph }``。

**主要协作调用**：``updateWorkflowGraphAtPath``、``parseWorkflowInterfaceId``、``updateWorkflowInterface``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:15927:15992:FUNCTION

.. rubric:: ``updateWorkflowGraphAtPath callback @ 484``

.. code-block:: javascript

   updateWorkflowGraphAtPath callback @ 484(inner)

更新与 ``Workflow Graph At Path`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``484``—``484`` 行；所属函数 ``changeDraft callback @ 480``。

**参数**

``inner``
   调用方传入的 ``inner`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWorkflowNodePositions``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:16561:16789:FUNCTION

.. rubric:: ``useCallback callback @ 503``

.. code-block:: javascript

   useCallback callback @ 503()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``503``—``511`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``history.current.past.pop``、``history.current.future.push``、``clone``、``setDraft``、``setNotice``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:16823:17035:FUNCTION

.. rubric:: ``useCallback callback @ 512``

.. code-block:: javascript

   useCallback callback @ 512()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``512``—``520`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``history.current.future.pop``、``history.current.past.push``、``clone``、``setDraft``、``setNotice``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17071:17201:FUNCTION

.. rubric:: ``useCallback callback @ 521``

.. code-block:: javascript

   useCallback callback @ 521(ids)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``521``—``526`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``ids``
   调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``、``setSelectedIds``、``setSelectedEdges``、``setSelectionRequest``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17247:17707:FUNCTION

.. rubric:: ``useCallback callback @ 528``

.. code-block:: javascript

   useCallback callback @ 528({ nodes: chosen, edges: connected })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``528``—``539`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``{ nodes: chosen, edges: connected }``
   调用方传入的 ``nodes: chosen, edges: connected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chosen.map``、``connected.map``、``setSelectedIds``、``setSelectedEdges``、``setSelected``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17324:17341:FUNCTION

.. rubric:: ``chosen.map callback @ 529``

.. code-block:: javascript

   chosen.map callback @ 529(node)

作为 ``chosen.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``529``—``529`` 行；所属函数 ``useCallback callback @ 528``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17374:17391:FUNCTION

.. rubric:: ``connected.map callback @ 530``

.. code-block:: javascript

   connected.map callback @ 530(edge)

作为 ``connected.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``530``—``530`` 行；所属函数 ``useCallback callback @ 528``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17415:17487:FUNCTION

.. rubric:: ``setSelectedIds callback @ 531``

.. code-block:: javascript

   setSelectedIds callback @ 531(current)

设置与 ``Selected Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``531``—``532`` 行；所属函数 ``useCallback callback @ 528``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.join``、``ids.join``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17521:17597:FUNCTION

.. rubric:: ``setSelectedEdges callback @ 534``

.. code-block:: javascript

   setSelectedEdges callback @ 534(current)

设置与 ``Selected Edges`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``534``—``535`` 行；所属函数 ``useCallback callback @ 528``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.join``、``edges.join``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17756:17947:FUNCTION

.. rubric:: ``useMemo callback @ 543``

.. code-block:: javascript

   useMemo callback @ 543()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``543``—``548`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:17997:18151:FUNCTION

.. rubric:: ``useMemo callback @ 552``

.. code-block:: javascript

   useMemo callback @ 552()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``552``—``556`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:18201:18383:FUNCTION

.. rubric:: ``useMemo callback @ 560``

.. code-block:: javascript

   useMemo callback @ 560()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``560``—``568`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowRuntimeForGraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:18467:18580:FUNCTION

.. rubric:: ``useEffect callback @ 571``

.. code-block:: javascript

   useEffect callback @ 571()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``571``—``576`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowGraphAtPath``、``setGraphPath``、``select``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:18651:18928:FUNCTION

.. rubric:: ``useCallback callback @ 578``

.. code-block:: javascript

   useCallback callback @ 578(path)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``578``—``588`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setGraphPath``、``select``、``setMenu``、``setPicker``、``setPendingPlacement``、``setFitRequest``、``setMonitorPositions``、``setFocusRequest``、``setMobilePane``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:18809:18829:FUNCTION

.. rubric:: ``setFitRequest callback @ 584``

.. code-block:: javascript

   setFitRequest callback @ 584(value)

设置与 ``Fit Request`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``584``—``584`` 行；所属函数 ``useCallback callback @ 578``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:18985:19231:FUNCTION

.. rubric:: ``useCallback callback @ 592``

.. code-block:: javascript

   useCallback callback @ 592(id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``592``—``597`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``graph.nodes.find``、``navigateGraph``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:19080:19104:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 594``

.. code-block:: javascript

   graph.nodes.find callback @ 594(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``useCallback callback @ 592``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:19339:19481:FUNCTION

.. rubric:: ``useMemo callback @ 600``

.. code-block:: javascript

   useMemo callback @ 600()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``600``—``603`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(stages) ? stages : Object.values(stages)``。

**主要协作调用**：``Array.isArray``、``Object.values``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:19523:19662:FUNCTION

.. rubric:: ``useCallback callback @ 604``

.. code-block:: javascript

   useCallback callback @ 604(event, details)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``604``—``608`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``details``
   调用方传入的 ``details`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``setPicker``、``setMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:19701:19999:FUNCTION

.. rubric:: ``useCallback callback @ 609``

.. code-block:: javascript

   useCallback callback @ 609()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``609``—``619`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setMenu``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:19754:19993:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 611``

.. code-block:: javascript

   requestAnimationFrame callback @ 611()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``611``—``618`` 行；所属函数 ``useCallback callback @ 609``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``active?.hasAttribute``、``dialogRef.current?.querySelector(".workflow-canvas")?.focus``、``dialogRef.current?.querySelector``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20036:20445:FUNCTION

.. rubric:: ``useCallback callback @ 621``

.. code-block:: javascript

   useCallback callback @ 621(id, value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``621``—``636`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeGraph``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20074:20444:FUNCTION

.. rubric:: ``changeGraph callback @ 622``

.. code-block:: javascript

   changeGraph callback @ 622(current)

实现 ``changeGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``622``—``636`` 行；所属函数 ``useCallback callback @ 621``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.nodes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20143:20423:FUNCTION

.. rubric:: ``current.nodes.map callback @ 624``

.. code-block:: javascript

   current.nodes.map callback @ 624(node)

作为 ``current.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``624``—``634`` 行；所属函数 ``changeGraph callback @ 622``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sourceValueConfig``、``catalogNode``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20518:20623:FUNCTION

.. rubric:: ``useCallback callback @ 640``

.. code-block:: javascript

   useCallback callback @ 640(id, port, binding)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``640``—``641`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeGraph``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20564:20622:FUNCTION

.. rubric:: ``changeGraph callback @ 641``

.. code-block:: javascript

   changeGraph callback @ 641(current)

实现 ``changeGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``641``—``641`` 行；所属函数 ``useCallback callback @ 640``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bindWorkflowInput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20678:20728:FUNCTION

.. rubric:: ``useCallback callback @ 645``

.. code-block:: javascript

   useCallback callback @ 645(id, busy)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``645``—``645`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``busy``
   调用方传入的 ``busy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``validity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20784:20847:FUNCTION

.. rubric:: ``useCallback callback @ 649``

.. code-block:: javascript

   useCallback callback @ 649(event, nodeId, port)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``649``—``649`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``nodeId``
   目标对象的公共或运行时标识。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:20911:22118:FUNCTION

.. rubric:: ``useCallback callback @ 653``

.. code-block:: javascript

   async useCallback callback @ 653(nodeId, templateId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``653``—``688`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``nodeId``
   目标对象的公共或运行时标识。

``templateId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error("无法加载所选模板，请重试。")``、``new Error("目标子图位置已改变，请重新选择。")``。

**主要协作调用**：``setBusy``、``setError``、``catalog.builtinTemplates?.find``、``workflowApi.template``、``workflowGraphAtPath``、``initializeWorkflowSubgraph``、``changeDraft``、``setNotice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:21185:21217:FUNCTION

.. rubric:: ``catalog.builtinTemplates?.find callback @ 660``

.. code-block:: javascript

   catalog.builtinTemplates?.find callback @ 660(item)

作为 ``catalog.builtinTemplates?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``660``—``660`` 行；所属函数 ``useCallback callback @ 653``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:21720:21839:FUNCTION

.. rubric:: ``changeDraft callback @ 674``

.. code-block:: javascript

   changeDraft callback @ 674(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``674``—``677`` 行；所属函数 ``useCallback callback @ 653``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWorkflowGraphAtPath``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:22241:24380:FUNCTION

.. rubric:: ``useCallback callback @ 692``

.. code-block:: javascript

   async useCallback callback @ 692(target, targetPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``692``—``754`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``target`` （默认值 ``graph.nodes.find((node) => node.id === selected)``）
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPath`` （默认值 ``graphPath``）
   调用方传入的 ``targetPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``graph.nodes.find``、``setBusy``、``setError``、``clone``、``normalizeGraph``、``copyWorkflowSelection``、``workflowGraphAtPath``、``workflowAncestorRegions``、``workflowApi.validate``、``workflowApi.saveTemplate``、``setTemplates``、``changeDraft``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:22286:22316:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 693``

.. code-block:: javascript

   graph.nodes.find callback @ 693(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``693``—``693`` 行；所属函数 ``useCallback callback @ 692``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:23390:23418:FUNCTION

.. rubric:: ``setTemplates callback @ 722``

.. code-block:: javascript

   setTemplates callback @ 722(items)

设置与 ``Templates`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``722``—``722`` 行；所属函数 ``useCallback callback @ 692``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:23441:24128:FUNCTION

.. rubric:: ``changeDraft callback @ 723``

.. code-block:: javascript

   changeDraft callback @ 723(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``723``—``746`` 行；所属函数 ``useCallback callback @ 692``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWorkflowGraphAtPath``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:23573:24103:FUNCTION

.. rubric:: ``updateWorkflowGraphAtPath callback @ 728``

.. code-block:: javascript

   updateWorkflowGraphAtPath callback @ 728(inner)

更新与 ``Workflow Graph At Path`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``728``—``744`` 行；所属函数 ``changeDraft callback @ 723``。

**参数**

``inner``
   调用方传入的 ``inner`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inner.nodes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:23661:24070:FUNCTION

.. rubric:: ``inner.nodes.map callback @ 730``

.. code-block:: javascript

   inner.nodes.map callback @ 730(node)

作为 ``inner.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``730``—``742`` 行；所属函数 ``updateWorkflowGraphAtPath callback @ 728``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:24556:24597:FUNCTION

.. rubric:: ``useMemo callback @ 766``

.. code-block:: javascript

   useMemo callback @ 766()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``766``—``766`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowNodeNumbers``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:24656:24730:FUNCTION

.. rubric:: ``useMemo callback @ 770``

.. code-block:: javascript

   useMemo callback @ 770()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``770``—``770`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``analyzeWorkflowParallelism``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:24815:25061:FUNCTION

.. rubric:: ``useCallback callback @ 774``

.. code-block:: javascript

   useCallback callback @ 774(id, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``774``—``780`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeGraph``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:24855:25060:FUNCTION

.. rubric:: ``changeGraph callback @ 775``

.. code-block:: javascript

   changeGraph callback @ 775(current)

实现 ``changeGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``775``—``780`` 行；所属函数 ``useCallback callback @ 774``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(current.outputNodes || []).filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:25030:25049:FUNCTION

.. rubric:: ``(current.outputNodes || []).filter callback @ 779``

.. code-block:: javascript

   (current.outputNodes || []).filter callback @ 779(key)

作为 ``(current.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``779``—``779`` 行；所属函数 ``changeGraph callback @ 775``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:25118:25302:FUNCTION

.. rubric:: ``useCallback callback @ 784``

.. code-block:: javascript

   useCallback callback @ 784(event, id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``784``—``788`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.getBoundingClientRect``、``select``、``openMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:25357:27200:FUNCTION

.. rubric:: ``useMemo callback @ 792``

.. code-block:: javascript

   useMemo callback @ 792()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``792``—``843`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graph.nodes.map``、``interfaceProjection.nodes.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:25395:26967:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 793``

.. code-block:: javascript

   graph.nodes.map callback @ 793(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``793``—``837`` 行；所属函数 ``useMemo callback @ 792``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``effectiveWorkflowDefinition``、``catalogNode``、``runtimeStages.find``、``Boolean``、``(graph.outputNodes || []).includes``、``(catalog.builtinTemplates || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:26024:26056:FUNCTION

.. rubric:: ``runtimeStages.find callback @ 811``

.. code-block:: javascript

   runtimeStages.find callback @ 811(stage)

作为 ``runtimeStages.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``811``—``811`` 行；所属函数 ``graph.nodes.map callback @ 793``。

**参数**

``stage``
   调用方传入的 ``stage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:26623:26742:FUNCTION

.. rubric:: ``onSaveSubgraphTemplate``

.. code-block:: javascript

   onSaveSubgraphTemplate(id)

处理 ``Save Subgraph Template`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``825``—``828`` 行；所属函数 ``graph.nodes.map callback @ 793``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubgraphTemplate``、``graph.nodes.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:26702:26726:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 827``

.. code-block:: javascript

   graph.nodes.find callback @ 827(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``827``—``827`` 行；所属函数 ``onSaveSubgraphTemplate``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:26853:26932:FUNCTION

.. rubric:: ``(catalog.builtinTemplates || []).map callback @ 831``

.. code-block:: javascript

   (catalog.builtinTemplates || []).map callback @ 831(item)

作为 ``(catalog.builtinTemplates || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``831``—``834`` 行；所属函数 ``graph.nodes.map callback @ 793``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:27009:27192:FUNCTION

.. rubric:: ``interfaceProjection.nodes.map callback @ 838``

.. code-block:: javascript

   interfaceProjection.nodes.map callback @ 838(node)

作为 ``interfaceProjection.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``838``—``842`` 行；所属函数 ``useMemo callback @ 792``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:27740:28426:FUNCTION

.. rubric:: ``useMemo callback @ 872``

.. code-block:: javascript

   useMemo callback @ 872()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``872``—``885`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...graph.edges, ...interfaceProjection.edges].map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:27808:28425:FUNCTION

.. rubric:: ``[...graph.edges, ...interfaceProjection.edges].map callback @ 873``

.. code-block:: javascript

   [...graph.edges, ...interfaceProjection.edges].map callback @ 873(edge)

作为 ``[...graph.edges, ...interfaceProjection.edges].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``873``—``885`` 行；所属函数 ``useMemo callback @ 872``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedEdges.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:28608:28638:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 895``

.. code-block:: javascript

   graph.nodes.find callback @ 895(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``895``—``895`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:29263:29361:FUNCTION

.. rubric:: ``onLocate callback @ 912``

.. code-block:: javascript

   onLocate callback @ 912()

处理 ``Locate`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``912``—``915`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFocusRequest``、``setMobilePane``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:29377:29420:FUNCTION

.. rubric:: ``onMenu callback @ 916``

.. code-block:: javascript

   onMenu callback @ 916(event)

处理 ``Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``916``—``916`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nodeMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:29444:29495:FUNCTION

.. rubric:: ``onToggleOutput callback @ 917``

.. code-block:: javascript

   onToggleOutput callback @ 917(enabled)

处理 ``Toggle Output`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``917``—``917`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleOutput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:29545:29579:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 920``

.. code-block:: javascript

   graph.nodes.find callback @ 920(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``920``—``920`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:29784:29835:FUNCTION

.. rubric:: ``interfaceContainer?.subgraph.interface?.[selectedInterface.direction]?.find callback @ 925``

.. code-block:: javascript

   interfaceContainer?.subgraph.interface?.[selectedInterface.direction]?.find callback @ 925(entry)

作为 ``interfaceContainer?.subgraph.interface?.[selectedInterface.direction]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``925``—``925`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:29869:30213:FUNCTION

.. rubric:: ``changeInterface``

.. code-block:: javascript

   changeInterface(binding, patch)

实现 ``changeInterface`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``927``—``941`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWorkflowInterface``、``changeDraft``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30086:30128:FUNCTION

.. rubric:: ``changeDraft callback @ 936``

.. code-block:: javascript

   changeDraft callback @ 936(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``936``—``936`` 行；所属函数 ``changeInterface``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30241:30562:FUNCTION

.. rubric:: ``connectInterface``

.. code-block:: javascript

   connectInterface(connection)

建立连接与 ``Interface`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``942``—``957`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``connection``
   调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeDraft``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30288:30477:FUNCTION

.. rubric:: ``changeDraft callback @ 944``

.. code-block:: javascript

   changeDraft callback @ 944(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``944``—``952`` 行；所属函数 ``connectInterface``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``connectWorkflowInterface``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30595:31258:FUNCTION

.. rubric:: ``useMemo callback @ 958``

.. code-block:: javascript

   useMemo callback @ 958()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``958``—``976`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``""``、``target?.id || ""``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``runtimeStages.map``、``graph.nodes.find``、``[...graph.nodes] .reverse() .find``、``[...graph.nodes] .reverse``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30690:30726:FUNCTION

.. rubric:: ``runtimeStages.map callback @ 961``

.. code-block:: javascript

   runtimeStages.map callback @ 961(stage)

作为 ``runtimeStages.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``961``—``961`` 行；所属函数 ``useMemo callback @ 958``。

**参数**

``stage``
   调用方传入的 ``stage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30754:30828:FUNCTION

.. rubric:: ``status``

.. code-block:: javascript

   status(node)

实现 ``status`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``963``—``964`` 行；所属函数 ``useMemo callback @ 958``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``stageStatus.get``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30872:30908:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 966``

.. code-block:: javascript

   graph.nodes.find callback @ 966(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``966``—``966`` 行；所属函数 ``useMemo callback @ 958``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``status``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30936:30971:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 967``

.. code-block:: javascript

   graph.nodes.find callback @ 967(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``967``—``967`` 行；所属函数 ``useMemo callback @ 958``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``status``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:30999:31071:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 968``

.. code-block:: javascript

   graph.nodes.find callback @ 968(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``968``—``969`` 行；所属函数 ``useMemo callback @ 958``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["queued", "pending", "paused"].includes``、``status``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:31140:31199:FUNCTION

.. rubric:: ``[...graph.nodes] .reverse() .find callback @ 973``

.. code-block:: javascript

   [...graph.nodes] .reverse() .find callback @ 973(node)

作为 ``[...graph.nodes] .reverse() .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``973``—``973`` 行；所属函数 ``useMemo callback @ 958``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["completed", "succeeded"].includes``、``status``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:31327:31468:FUNCTION

.. rubric:: ``useEffect callback @ 977``

.. code-block:: javascript

   useEffect callback @ 977()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``977``—``981`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``select``、``setFocusRequest``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:31554:31661:FUNCTION

.. rubric:: ``stopFollowingTask``

.. code-block:: javascript

   stopFollowingTask()

停止与 ``Following Task`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``982``—``986`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFollowTask``、``setFocusRequest``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:31683:31881:FUNCTION

.. rubric:: ``locateTask``

.. code-block:: javascript

   locateTask()

实现 ``locateTask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``987``—``996`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopFollowingTask``、``setMobilePane``、``setMonitorView``、``setFollowTask``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:31902:32091:FUNCTION

.. rubric:: ``chosenIds``

.. code-block:: javascript

   chosenIds()

实现 ``chosenIds`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``997``—``1004`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:32107:32362:FUNCTION

.. rubric:: ``copy``

.. code-block:: javascript

   copy()

实现 ``copy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1005``—``1013`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copyWorkflowSelection``、``currentEditableGraph``、``chosenIds``、``workflowAncestorRegions``、``setHasClipboard``、``Boolean``、``setMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:32379:32850:FUNCTION

.. rubric:: ``paste``

.. code-block:: javascript

   paste(clipboard, location)

实现 ``paste`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1014``—``1030`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``clipboard`` （默认值 ``applicationClipboard``）
   调用方传入的 ``clipboard`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``location``
   调用方传入的 ``location`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pasteWorkflowSelection``、``currentEditableGraph``、``flow.screenToFlowPosition``、``changeGraph``、``select``、``setMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:32871:33057:FUNCTION

.. rubric:: ``duplicate``

.. code-block:: javascript

   duplicate()

实现 ``duplicate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1031``—``1039`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``paste``、``copyWorkflowSelection``、``currentEditableGraph``、``chosenIds``、``workflowAncestorRegions``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:33083:33690:FUNCTION

.. rubric:: ``groupSelection``

.. code-block:: javascript

   groupSelection()

实现 ``groupSelection`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1040``—``1062`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowGraphAtPath(rootGraph, graphPath.slice(0, -1))?.nodes.find``、``workflowGraphAtPath``、``graphPath.slice``、``wrapWorkflowSubgraph``、``currentEditableGraph``、``chosenIds``、``changeGraph``、``select``、``setPanel``、``setMenu``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:33217:33268:FUNCTION

.. rubric:: ``workflowGraphAtPath(rootGraph, graphPath.slice(0, -1))?.nodes.find callback @ 1044``

.. code-block:: javascript

   workflowGraphAtPath(rootGraph, graphPath.slice(0, -1))?.nodes.find callback @ 1044(node)

作为 ``workflowGraphAtPath(rootGraph, graphPath.slice(0, -1))?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1044``—``1044`` 行；所属函数 ``groupSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graphPath.at``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:33718:34036:FUNCTION

.. rubric:: ``ungroupSelection``

.. code-block:: javascript

   ungroupSelection()

实现 ``ungroupSelection`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1063``—``1076`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``unwrapWorkflowSubgraph``、``currentEditableGraph``、``changeGraph``、``select``、``setMenu``、``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:34070:36211:FUNCTION

.. rubric:: ``updateSubgraphTemplate``

.. code-block:: javascript

   async updateSubgraphTemplate()

更新与 ``Subgraph Template`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1077``—``1146`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setBusy``、``setError``、``catalog.builtinTemplates?.find``、``workflowApi.template``、``setNotice``、``initializeGraph``、``workflowSubgraphTemplateNode``、``(wrapper.subgraph.interface?.inputs || []).map``、``(wrapper.subgraph.interface?.parameters || []).map``、``Object.fromEntries``、``Object.entries(selectedNode.inputs || {}).filter``、``Object.entries``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:34288:34338:FUNCTION

.. rubric:: ``catalog.builtinTemplates?.find callback @ 1085``

.. code-block:: javascript

   catalog.builtinTemplates?.find callback @ 1085(item)

作为 ``catalog.builtinTemplates?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1085``—``1085`` 行；所属函数 ``updateSubgraphTemplate``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:34952:34969:FUNCTION

.. rubric:: ``(wrapper.subgraph.interface?.inputs || []).map callback @ 1102``

.. code-block:: javascript

   (wrapper.subgraph.interface?.inputs || []).map callback @ 1102(port)

作为 ``(wrapper.subgraph.interface?.inputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1102``—``1102`` 行；所属函数 ``updateSubgraphTemplate``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:35078:35116:FUNCTION

.. rubric:: ``(wrapper.subgraph.interface?.parameters || []).map callback @ 1106``

.. code-block:: javascript

   (wrapper.subgraph.interface?.parameters || []).map callback @ 1106(parameter)

作为 ``(wrapper.subgraph.interface?.parameters || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1106``—``1106`` 行；所属函数 ``updateSubgraphTemplate``。

**参数**

``parameter``
   调用方传入的 ``parameter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:35238:35280:FUNCTION

.. rubric:: ``Object.entries(selectedNode.inputs || {}).filter callback @ 1110``

.. code-block:: javascript

   Object.entries(selectedNode.inputs || {}).filter callback @ 1110([name])

作为 ``Object.entries(selectedNode.inputs || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1110``—``1111`` 行；所属函数 ``updateSubgraphTemplate``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inputNames.has``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:35422:35469:FUNCTION

.. rubric:: ``Object.entries({ ...wrapper.config, ...selectedNode.config }).filter callback @ 1116``

.. code-block:: javascript

   Object.entries({ ...wrapper.config, ...selectedNode.config }).filter callback @ 1116([name])

作为 ``Object.entries({ ...wrapper.config, ...selectedNode.config }).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1116``—``1116`` 行；所属函数 ``updateSubgraphTemplate``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parameterNames.has``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:35673:35737:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 1125``

.. code-block:: javascript

   graph.nodes.map callback @ 1125(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1125``—``1126`` 行；所属函数 ``updateSubgraphTemplate``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:36237:36783:FUNCTION

.. rubric:: ``exportWorkflow``

.. code-block:: javascript

   exportWorkflow()

实现 ``exportWorkflow`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1147``—``1162`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 创建、使用或释放浏览器二进制资源。

**主要协作调用**：``URL.createObjectURL``、``JSON.stringify``、``document.createElement``、``[...(title || "工作流")] .filter((character) => character.codePointAt(0) >= 32) .join("") .replace``、``[...(title || "工作流")] .filter((character) => character.codePointAt(0) >= 32) .join``、``[...(title || "工作流")] .filter``、``anchor.click``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:36591:36636:FUNCTION

.. rubric:: ``[...(title || "工作流")] .filter callback @ 1157``

.. code-block:: javascript

   [...(title || "工作流")] .filter callback @ 1157(character)

作为 ``[...(title || "工作流")] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1157``—``1157`` 行；所属函数 ``exportWorkflow``。

**参数**

``character``
   调用方传入的 ``character`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``character.codePointAt``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:36741:36771:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1161``

.. code-block:: javascript

   window.setTimeout callback @ 1161()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1161``—``1161`` 行；所属函数 ``exportWorkflow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建、使用或释放浏览器二进制资源。

**主要协作调用**：``URL.revokeObjectURL``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:36809:38017:FUNCTION

.. rubric:: ``importWorkflow``

.. code-block:: javascript

   async importWorkflow(event)

实现 ``importWorkflow`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1163``—``1201`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error("工作流 JSON 不能超过 10 MB。")``、``new Error("文件中缺少工作流节点或连线。")``。

**主要协作调用**：``setBusy``、``setError``、``JSON.parse``、``file.text``、``Array.isArray``、``initializeGraph``、``workflowApi.validate``、``changeDraft``、``navigateGraph``、``setNotice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:37501:37780:FUNCTION

.. rubric:: ``changeDraft callback @ 1183``

.. code-block:: javascript

   changeDraft callback @ 1183(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1183``—``1191`` 行；所属函数 ``importWorkflow``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:38043:40153:FUNCTION

.. rubric:: ``deleteSelected``

.. code-block:: javascript

   deleteSelected()

删除与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1202``—``1263`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chosenIds``、``changeDraft``、``setError``、``select``、``setMenu``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:38129:40033:FUNCTION

.. rubric:: ``changeDraft callback @ 1205``

.. code-block:: javascript

   changeDraft callback @ 1205(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1205``—``1256`` 行；所属函数 ``deleteSelected``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...current, graph }``。

**主要协作调用**：``parseWorkflowInterfaceId``、``updateWorkflowInterface``、``ids.includes``、``updateWorkflowGraphAtPath``、``workflowInterfaceContainer``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:39005:39278:FUNCTION

.. rubric:: ``updateWorkflowGraphAtPath callback @ 1230``

.. code-block:: javascript

   updateWorkflowGraphAtPath callback @ 1230(inner)

更新与 ``Workflow Graph At Path`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1230``—``1238`` 行；所属函数 ``changeDraft callback @ 1205``。

**参数**

``inner``
   调用方传入的 ``inner`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeWorkflowNodes``、``inner.edges.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:39102:39253:FUNCTION

.. rubric:: ``inner.edges.filter callback @ 1233``

.. code-block:: javascript

   inner.edges.filter callback @ 1233(edge)

作为 ``inner.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1233``—``1236`` 行；所属函数 ``updateWorkflowGraphAtPath callback @ 1230``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ids.includes``、``edgeIds.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:40252:41274:FUNCTION

.. rubric:: ``addNode``

.. code-block:: javascript

   addNode(definition, position, connection, port)

新增与 ``Node`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1265``—``1300`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``connection``
   调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**显式抛出**：``new Error("子图参数请放置后连接内部端口。")``。

**主要协作调用**：``addWorkflowInterface``、``changeDraft``、``select``、``addWorkflowNodeWithConnection``、``currentEditableGraph``、``changeGraph``、``setFocusRequest``、``setPanel``、``setMobilePane``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:40600:40650:FUNCTION

.. rubric:: ``changeDraft callback @ 1275``

.. code-block:: javascript

   changeDraft callback @ 1275(current)

实现 ``changeDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1275``—``1275`` 行；所属函数 ``addNode``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:41296:41506:FUNCTION

.. rubric:: ``openPicker``

.. code-block:: javascript

   openPicker(point, connection)

打开与 ``Picker`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1301``—``1309`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``connection``
   调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setMenu``、``setPicker``、``flow.screenToFlowPosition``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:41529:41670:FUNCTION

.. rubric:: ``closePicker``

.. code-block:: javascript

   closePicker()

关闭与 ``Picker`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1310``—``1315`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPicker``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:41585:41658:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1312``

.. code-block:: javascript

   requestAnimationFrame callback @ 1312()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1312``—``1313`` 行；所属函数 ``closePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dialogRef.current?.querySelector(".workflow-canvas")?.focus``、``dialogRef.current?.querySelector``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:41696:42011:FUNCTION

.. rubric:: ``beginPlacement``

.. code-block:: javascript

   beginPlacement(definition, point, connection, port)

实现 ``beginPlacement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1316``—``1324`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``connection``
   调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPendingPlacement``、``setPicker``、``setMenu``、``setMobilePane``、``setError``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:41973:42005:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1323``

.. code-block:: javascript

   requestAnimationFrame callback @ 1323()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1323``—``1323`` 行；所属函数 ``beginPlacement``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``canvasRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:42033:42301:FUNCTION

.. rubric:: ``chooseNode``

.. code-block:: javascript

   chooseNode({ definition, port }, clickPoint)

实现 ``chooseNode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1325``—``1332`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``{ definition, port }``
   调用方传入的 ``definition, port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clickPoint``
   调用方传入的 ``clickPoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``beginPlacement``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:42329:42725:FUNCTION

.. rubric:: ``placePendingNode``

.. code-block:: javascript

   placePendingNode(point)

实现 ``placePendingNode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1333``—``1348`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``flow.screenToFlowPosition``、``addNode``、``setPendingPlacement``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:42753:43527:FUNCTION

.. rubric:: ``finishConnection``

.. code-block:: javascript

   finishConnection(event, state)

实现 ``finishConnection`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1349``—``1375`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``parseWorkflowInterfaceId``、``Math.hypot``、``document.elementFromPoint``、``isWorkflowCanvasBlankTarget``、``openPicker``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:43545:43911:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   rename()

实现 ``rename`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1376``—``1390`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``、``setMenu``、``setPanel``、``setMobilePane``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:43695:43899:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1381``

.. code-block:: javascript

   requestAnimationFrame callback @ 1381()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1381``—``1388`` 行；所属函数 ``rename``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dialogRef.current ?.querySelector( parseWorkflowInterfaceId(menu?.nodeId) ? '[aria-label="参数名称"]' : '[aria-label="节点名称"…``、``dialogRef.current ?.querySelector``、``parseWorkflowInterfaceId``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:43928:44030:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close()

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1391``—``1394`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirmation``、``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:44052:44279:FUNCTION

.. rubric:: ``hasInvalid``

.. code-block:: javascript

   hasInvalid()

实现 ``hasInvalid`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1395``—``1401`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries(invalid).some``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:44092:44272:FUNCTION

.. rubric:: ``Object.entries(invalid).some callback @ 1397``

.. code-block:: javascript

   Object.entries(invalid).some callback @ 1397([key, value])

作为 ``Object.entries(invalid).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1397``—``1400`` 行；所属函数 ``hasInvalid``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["permissions", "template-sharing", "global"].includes``、``graph.nodes.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:44233:44270:FUNCTION

.. rubric:: ``graph.nodes.some callback @ 1400``

.. code-block:: javascript

   graph.nodes.some callback @ 1400(node)

作为 ``graph.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1400``—``1400`` 行；所属函数 ``Object.entries(invalid).some callback @ 1397``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``key.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:44297:47889:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(kind, closeAfter)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1402``—``1505`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``closeAfter`` （默认值 ``false``）
   调用方传入的 ``closeAfter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**显式抛出**：``new Error("存在未完成或无效的配置，请先修正编辑器中的提示。")``、``new Error("请填写模板名称。")``。

**主要协作调用**：``setBusy``、``setSubmissionStep``、``setError``、``setNotice``、``hasInvalid``、``workflowApi.validate``、``["save", "clone"].includes``、``current.title.trim``、``workflowApi.saveTemplate``、``setTemplate``、``setBuiltinTemplateId``、``setTemplates``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:45883:45981:FUNCTION

.. rubric:: ``setTemplates callback @ 1446``

.. code-block:: javascript

   setTemplates callback @ 1446(items)

设置与 ``Templates`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1446``—``1449`` 行；所属函数 ``action``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:45922:45952:FUNCTION

.. rubric:: ``items.filter callback @ 1447``

.. code-block:: javascript

   items.filter callback @ 1447(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1447``—``1447`` 行；所属函数 ``setTemplates callback @ 1446``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:47381:47405:FUNCTION

.. rubric:: ``setFitRequest callback @ 1486``

.. code-block:: javascript

   setFitRequest callback @ 1486(current)

设置与 ``Fit Request`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1486``—``1486`` 行；所属函数 ``action``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:47913:49213:FUNCTION

.. rubric:: ``loadTemplate``

.. code-block:: javascript

   async loadTemplate(id, discard)

加载与 ``Template`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1506``—``1548`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``discard`` （默认值 ``false``）
   调用方传入的 ``discard`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setConfirmation``、``setBusy``、``setError``、``(catalog.builtinTemplates || []).find``、``workflowApi.template``、``installDraft``、``newDraft``、``initializeGraph``、``normalizeGraph``、``clone``、``setTemplate``、``setBuiltinTemplateId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:48158:48191:FUNCTION

.. rubric:: ``(catalog.builtinTemplates || []).find callback @ 1515``

.. code-block:: javascript

   (catalog.builtinTemplates || []).find callback @ 1515(item)

作为 ``(catalog.builtinTemplates || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1515``—``1515`` 行；所属函数 ``loadTemplate``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:49239:49762:FUNCTION

.. rubric:: ``deleteTemplate``

.. code-block:: javascript

   async deleteTemplate()

删除与 ``Template`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``1549``—``1566`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setBusy``、``setError``、``workflowApi.deleteTemplate``、``setTemplates``、``setTemplate``、``setConfirmation``、``setBaseline``、``setNotice``、``onChanged``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:49430:49488:FUNCTION

.. rubric:: ``setTemplates callback @ 1555``

.. code-block:: javascript

   setTemplates callback @ 1555(items)

设置与 ``Templates`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1555``—``1555`` 行；所属函数 ``deleteTemplate``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:49454:49487:FUNCTION

.. rubric:: ``items.filter callback @ 1555``

.. code-block:: javascript

   items.filter callback @ 1555(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1555``—``1555`` 行；所属函数 ``setTemplates callback @ 1555``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:49782:50876:FUNCTION

.. rubric:: ``keyboard``

.. code-block:: javascript

   keyboard(event)

实现 ``keyboard`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1567``—``1604`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``setPendingPlacement``、``event.key.toLowerCase``、``action``、``isWorkflowTextEditing``、``redo``、``undo``、``copy``、``paste``、``duplicate``、``["delete", "backspace"].includes``、``deleteSelected``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:50901:51321:FUNCTION

.. rubric:: ``runtimeAction``

.. code-block:: javascript

   async runtimeAction(kind)

实现 ``runtimeAction`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1605``—``1620`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``setError``、``workflowApi.taskAction``、``workflowApi.task``、``setInitialTask``、``onChanged``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:51348:51674:FUNCTION

.. rubric:: ``downloadResult``

.. code-block:: javascript

   async downloadResult(file)

实现 ``downloadResult`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``1622``—``1633`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDownloading``、``setError``、``downloadAttachmentResource``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:51696:52238:FUNCTION

.. rubric:: ``editAgain``

.. code-block:: javascript

   editAgain()

实现 ``editAgain`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1635``—``1655`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setViewMode``、``setInitialTask``、``setMonitorView``、``setMonitorPositions``、``setFitRequest``、``setFocusRequest``、``setPanel``、``setMobilePane``、``setMenu``、``setError``、``setNotice``、``select``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:51875:51899:FUNCTION

.. rubric:: ``setFitRequest callback @ 1641``

.. code-block:: javascript

   setFitRequest callback @ 1641(current)

设置与 ``Fit Request`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1641``—``1641`` 行；所属函数 ``editAgain``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:52110:52140:FUNCTION

.. rubric:: ``editableGraph.nodes.some callback @ 1650``

.. code-block:: javascript

   editableGraph.nodes.some callback @ 1650(node)

作为 ``editableGraph.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1650``—``1650`` 行；所属函数 ``editAgain``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:52295:52342:FUNCTION

.. rubric:: ``onOpenChange callback @ 1660``

.. code-block:: javascript

   onOpenChange callback @ 1660(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1660``—``1662`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:52519:52552:FUNCTION

.. rubric:: ``onInteractOutside callback @ 1669``

.. code-block:: javascript

   onInteractOutside callback @ 1669(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1669``—``1669`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:52579:52839:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 1670``

.. code-block:: javascript

   onEscapeKeyDown callback @ 1670(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1670``—``1677`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``setPendingPlacement``、``setSidebarPane``、``close``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:54292:54324:FUNCTION

.. rubric:: ``onClick callback @ 1721``

.. code-block:: javascript

   onClick callback @ 1721()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1721``—``1721`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMonitorView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:54528:54556:FUNCTION

.. rubric:: ``onClick callback @ 1729``

.. code-block:: javascript

   onClick callback @ 1729()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1729``—``1729`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMonitorView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:54995:55437:FUNCTION

.. rubric:: ``[ ...(!readOnly ? [["sidebar", "工作流设置"]] : []), ["canvas", "流程画布"], ["config", readOnly ? "执行详情" : "节点信息"], ].map callback @ 1744``

.. code-block:: javascript

   [ ...(!readOnly ? [["sidebar", "工作流设置"]] : []), ["canvas", "流程画布"], ["config", readOnly ? "执行详情" : "节点信息"], ].map callback @ 1744([key, label])

作为 ``[ ...(!readOnly ? [["sidebar", "工作流设置"]] : []), ["canvas", "流程画布"], ["config", readOnly ? "执行详情" : "节点信息"], ].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1744``—``1757`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``[key, label]``
   调用方传入的 ``key, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:55189:55358:FUNCTION

.. rubric:: ``onClick callback @ 1749``

.. code-block:: javascript

   onClick callback @ 1749()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1749``—``1753`` 行；所属函数 ``[ ...(!readOnly ? [["sidebar", "工作流设置"]] : []), ["canvas", "流程画布"], ["config", readOnly ? "执行详情" : "节点信息"], ].map callback @ 1744``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobilePane``、``setSidebarPane``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:55844:55881:FUNCTION

.. rubric:: ``onClick callback @ 1770``

.. code-block:: javascript

   onClick callback @ 1770()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1770``—``1770`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReload``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:55860:55880:FUNCTION

.. rubric:: ``setReload callback @ 1770``

.. code-block:: javascript

   setReload callback @ 1770(value)

设置与 ``Reload`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1770``—``1770`` 行；所属函数 ``onClick callback @ 1770``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:56886:56915:FUNCTION

.. rubric:: ``onChange callback @ 1797``

.. code-block:: javascript

   onChange callback @ 1797(id)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1797``—``1797`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadTemplate``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:57069:57195:FUNCTION

.. rubric:: ``(catalog.builtinTemplates || []).map callback @ 1800``

.. code-block:: javascript

   (catalog.builtinTemplates || []).map callback @ 1800(item)

作为 ``(catalog.builtinTemplates || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1800``—``1803`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:57239:57390:FUNCTION

.. rubric:: ``templates.map callback @ 1804``

.. code-block:: javascript

   templates.map callback @ 1804(item)

作为 ``templates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1804``—``1807`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:57758:57784:FUNCTION

.. rubric:: ``onClick callback @ 1816``

.. code-block:: javascript

   onClick callback @ 1816()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1816``—``1816`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:58273:58314:FUNCTION

.. rubric:: ``onClick callback @ 1827``

.. code-block:: javascript

   onClick callback @ 1827()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1827``—``1827`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirmation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:58953:58990:FUNCTION

.. rubric:: ``onChange callback @ 1845``

.. code-block:: javascript

   onChange callback @ 1845(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1845``—``1845`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``importWorkflow``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:59213:59249:FUNCTION

.. rubric:: ``onClick callback @ 1851``

.. code-block:: javascript

   onClick callback @ 1851()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1851``—``1851`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``importFileRef.current?.click``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:60019:60106:FUNCTION

.. rubric:: ``onChange callback @ 1872``

.. code-block:: javascript

   onChange callback @ 1872(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1872``—``1873`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeDraft``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:60398:60568:FUNCTION

.. rubric:: ``onChange callback @ 1881``

.. code-block:: javascript

   onChange callback @ 1881(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1881``—``1885`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeDraft``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:60870:61037:FUNCTION

.. rubric:: ``onPointerMove callback @ 1897``

.. code-block:: javascript

   onPointerMove callback @ 1897(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1897``—``1900`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopFollowingTask``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:61069:61518:FUNCTION

.. rubric:: ``onClickCapture callback @ 1901``

.. code-block:: javascript

   onClickCapture callback @ 1901(event)

处理 ``Click Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1901``—``1912`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.target.closest``、``event.preventDefault``、``event.stopPropagation``、``placePendingNode``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:61556:61813:FUNCTION

.. rubric:: ``onContextMenuCapture callback @ 1913``

.. code-block:: javascript

   onContextMenuCapture callback @ 1913(event)

处理 ``Context Menu Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1913``—``1919`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.target.closest``、``event.preventDefault``、``event.stopPropagation``、``setPendingPlacement``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:61844:62113:FUNCTION

.. rubric:: ``onDoubleClick callback @ 1920``

.. code-block:: javascript

   onDoubleClick callback @ 1920(event)

处理 ``Double Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1920``—``1926`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isWorkflowCanvasBlankTarget``、``event.preventDefault``、``openPicker``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:62277:62311:FUNCTION

.. rubric:: ``onPointerMove callback @ 1931``

.. code-block:: javascript

   onPointerMove callback @ 1931(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1931``—``1931`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:62475:62498:FUNCTION

.. rubric:: ``onClick callback @ 1936``

.. code-block:: javascript

   onClick callback @ 1936()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1936``—``1936`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``navigateGraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:62649:63622:FUNCTION

.. rubric:: ``graphPath.map callback @ 1941``

.. code-block:: javascript

   graphPath.map callback @ 1941(id, index)

作为 ``graphPath.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1941``—``1964`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <span key={graphPath.slice(0, index + 1).join("/")}> <span aria-hidden="true">›</span> <button type="button" aria-current={ index === graphPath.length - 1 ? "page" : undefined }…``。

**主要协作调用**：``workflowGraphAtPath``、``graphPath.slice``、``graphPath.slice(0, index + 1).join``、``Boolean``、``parent?.nodes.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:63288:63364:FUNCTION

.. rubric:: ``onClick callback @ 1955``

.. code-block:: javascript

   onClick callback @ 1955()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1955``—``1956`` 行；所属函数 ``graphPath.map callback @ 1941``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``navigateGraph``、``graphPath.slice``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:63459:63483:FUNCTION

.. rubric:: ``parent?.nodes.find callback @ 1959``

.. code-block:: javascript

   parent?.nodes.find callback @ 1959(node)

作为 ``parent?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1959``—``1959`` 行；所属函数 ``graphPath.map callback @ 1941``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:63833:64003:FUNCTION

.. rubric:: ``onClick callback @ 1969``

.. code-block:: javascript

   onClick callback @ 1969()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1969``—``1973`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubgraphTemplate``、``graphPath.slice``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:65463:65802:FUNCTION

.. rubric:: ``onNodeClick callback @ 2009``

.. code-block:: javascript

   onNodeClick callback @ 2009(event, node)

处理 ``Node Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2009``—``2017`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``、``setSelectedIds``、``setSelectedEdges``、``setPanel``、``setMonitorView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:65839:66208:FUNCTION

.. rubric:: ``onNodeDoubleClick callback @ 2018``

.. code-block:: javascript

   onNodeDoubleClick callback @ 2018(_event, node)

处理 ``Node Double Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2018``—``2027`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``enterSubgraph``、``setSelected``、``setPanel``、``setMonitorView``、``setMobilePane``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:66292:66571:FUNCTION

.. rubric:: ``onPaneClick callback @ 2029``

.. code-block:: javascript

   onPaneClick callback @ 2029()

处理 ``Pane Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2029``—``2036`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSelected``、``setSelectedIds``、``setSelectedEdges``、``setMenu``、``setMonitorView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:66608:66841:FUNCTION

.. rubric:: ``onNodeContextMenu callback @ 2037``

.. code-block:: javascript

   onNodeContextMenu callback @ 2037(event, node)

处理 ``Node Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2037``—``2042`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIds.includes``、``select``、``openMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:66878:67019:FUNCTION

.. rubric:: ``onPaneContextMenu callback @ 2043``

.. code-block:: javascript

   onPaneContextMenu callback @ 2043(event)

处理 ``Pane Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2043``—``2046`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:67056:67172:FUNCTION

.. rubric:: ``onEdgeContextMenu callback @ 2047``

.. code-block:: javascript

   onEdgeContextMenu callback @ 2047(event, edge)

处理 ``Edge Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2047``—``2049`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:67205:67770:FUNCTION

.. rubric:: ``onEdgesChange callback @ 2050``

.. code-block:: javascript

   onEdgesChange callback @ 2050(changes)

处理 ``Edges Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2050``—``2063`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``changes``
   调用方传入的 ``changes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changes.filter``、``setSelectedEdges``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:67272:67329:FUNCTION

.. rubric:: ``changes.filter callback @ 2052``

.. code-block:: javascript

   changes.filter callback @ 2052(change)

作为 ``changes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2052``—``2052`` 行；所属函数 ``onEdgesChange callback @ 2050``。

**参数**

``change``
   调用方传入的 ``change`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:67430:67750:FUNCTION

.. rubric:: ``setSelectedEdges callback @ 2055``

.. code-block:: javascript

   setSelectedEdges callback @ 2055(current)

设置与 ``Selected Edges`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2055``—``2062`` 行；所属函数 ``onEdgesChange callback @ 2050``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...ids]``。

**主要协作调用**：``ids.add``、``ids.delete``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:67799:69219:FUNCTION

.. rubric:: ``onConnect callback @ 2064``

.. code-block:: javascript

   onConnect callback @ 2064(connection)

处理 ``Connect`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2064``—``2099`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``connection``
   调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error( "此输入已由子图输入参数连接，请先断开参数连接。", )``。

**主要协作调用**：``parseWorkflowInterfaceId``、``connectInterface``、``interfaceContainer?.subgraph.interface?.inputs?.some``、``changeGraph``、``setError``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:68392:68626:FUNCTION

.. rubric:: ``interfaceContainer?.subgraph.interface?.inputs?.some callback @ 2078``

.. code-block:: javascript

   interfaceContainer?.subgraph.interface?.inputs?.some callback @ 2078(entry)

作为 ``interfaceContainer?.subgraph.interface?.inputs?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2078``—``2081`` 行；所属函数 ``onConnect callback @ 2064``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:68821:69042:FUNCTION

.. rubric:: ``changeGraph callback @ 2087``

.. code-block:: javascript

   changeGraph callback @ 2087(current)

实现 ``changeGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2087``—``2093`` 行；所属函数 ``onConnect callback @ 2064``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``connectWorkflow``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:69253:69878:FUNCTION

.. rubric:: ``onConnectStart callback @ 2100``

.. code-block:: javascript

   onConnectStart callback @ 2100(event, params)

处理 ``Connect Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2100``—``2118`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``params``
   调用方传入的 ``params`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPicker``、``setMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:69956:70086:FUNCTION

.. rubric:: ``onDragOver callback @ 2120``

.. code-block:: javascript

   onDragOver callback @ 2120(event)

处理 ``Drag Over`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2120``—``2123`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:70112:70813:FUNCTION

.. rubric:: ``onDrop callback @ 2124``

.. code-block:: javascript

   onDrop callback @ 2124(event)

处理 ``Drop`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2124``—``2142`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``paletteDefinitions.find``、``addNode``、``flow.screenToFlowPosition``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:70296:70493:FUNCTION

.. rubric:: ``paletteDefinitions.find callback @ 2128``

.. code-block:: javascript

   paletteDefinitions.find callback @ 2128(node)

作为 ``paletteDefinitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2128``—``2132`` 行；所属函数 ``onDrop callback @ 2124``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.dataTransfer.getData``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:72795:73445:FUNCTION

.. rubric:: ``(pendingPlacement.definition.inputs || []).map callback @ 2189``

.. code-block:: javascript

   (pendingPlacement.definition.inputs || []).map callback @ 2189(port)

作为 ``(pendingPlacement.definition.inputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2189``—``2201`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:73596:74351:FUNCTION

.. rubric:: ``(pendingPlacement.definition.outputs || []).map callback @ 2206``

.. code-block:: javascript

   (pendingPlacement.definition.outputs || []).map callback @ 2206(port)

作为 ``(pendingPlacement.definition.outputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2206``—``2221`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:74980:75056:FUNCTION

.. rubric:: ``onClick callback @ 2238``

.. code-block:: javascript

   onClick callback @ 2238()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2238``—``2239`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setParallelRegionsVisible``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:75034:75055:FUNCTION

.. rubric:: ``setParallelRegionsVisible callback @ 2239``

.. code-block:: javascript

   setParallelRegionsVisible callback @ 2239(visible)

设置与 ``Parallel Regions Visible`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2239``—``2239`` 行；所属函数 ``onClick callback @ 2238``。

**参数**

``visible``
   调用方传入的 ``visible`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:75495:75681:FUNCTION

.. rubric:: ``onClick callback @ 2252``

.. code-block:: javascript

   onClick callback @ 2252(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2252``—``2255`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.getBoundingClientRect``、``openPicker``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:75991:76167:FUNCTION

.. rubric:: ``onClick callback @ 2265``

.. code-block:: javascript

   onClick callback @ 2265()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2265``—``2270`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flow.fitView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:77242:77278:FUNCTION

.. rubric:: ``onClick callback @ 2297``

.. code-block:: javascript

   onClick callback @ 2297()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2297``—``2297`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:79463:79476:FUNCTION

.. rubric:: ``onPaste callback @ 2355``

.. code-block:: javascript

   onPaste callback @ 2355()

处理 ``Paste`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2355``—``2355`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``paste``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:79717:79827:FUNCTION

.. rubric:: ``onEnter callback @ 2361``

.. code-block:: javascript

   onEnter callback @ 2361()

处理 ``Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2361``—``2364`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterSubgraph``、``setMenu``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:79876:80064:FUNCTION

.. rubric:: ``graph.nodes.some callback @ 2366``

.. code-block:: javascript

   graph.nodes.some callback @ 2366(node)

作为 ``graph.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2366``—``2369`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:80215:80412:FUNCTION

.. rubric:: ``onAddNode callback @ 2373``

.. code-block:: javascript

   onAddNode callback @ 2373(definition)

处理 ``Add Node`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2373``—``2378`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginPlacement``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:80748:80815:FUNCTION

.. rubric:: ``onToggleOutput callback @ 2386``

.. code-block:: javascript

   onToggleOutput callback @ 2386(enabled)

处理 ``Toggle Output`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2386``—``2387`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleOutput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:80861:80903:FUNCTION

.. rubric:: ``onAdd callback @ 2389``

.. code-block:: javascript

   onAdd callback @ 2389()

处理 ``Add`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2389``—``2389`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openPicker``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:80935:81764:FUNCTION

.. rubric:: ``onPortMode callback @ 2390``

.. code-block:: javascript

   onPortMode callback @ 2390(mode)

处理 ``Port Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2390``—``2410`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeGraph``、``setMenu``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:81017:81683:FUNCTION

.. rubric:: ``changeGraph callback @ 2392``

.. code-block:: javascript

   changeGraph callback @ 2392(current)

实现 ``changeGraph`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2392``—``2407`` 行；所属函数 ``onPortMode callback @ 2390``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkflowPortMode``、``catalogNode``、``current.nodes.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:81447:81513:FUNCTION

.. rubric:: ``current.nodes.find callback @ 2403``

.. code-block:: javascript

   current.nodes.find callback @ 2403(node)

作为 ``current.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2403``—``2403`` 行；所属函数 ``changeGraph callback @ 2392``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:82625:82654:FUNCTION

.. rubric:: ``onEnterSubgraph callback @ 2434``

.. code-block:: javascript

   onEnterSubgraph callback @ 2434()

处理 ``Enter Subgraph`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2434``—``2434`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:82727:82755:FUNCTION

.. rubric:: ``onOpenLogs callback @ 2436``

.. code-block:: javascript

   onOpenLogs callback @ 2436()

处理 ``Open Logs`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2436``—``2436`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMonitorView``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:83068:83090:FUNCTION

.. rubric:: ``onClick callback @ 2445``

.. code-block:: javascript

   onClick callback @ 2445()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2445``—``2445`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPanel``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:83358:83384:FUNCTION

.. rubric:: ``onClick callback @ 2453``

.. code-block:: javascript

   onClick callback @ 2453()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2453``—``2453`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPanel``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:84021:84099:FUNCTION

.. rubric:: ``onChange callback @ 2468``

.. code-block:: javascript

   onChange callback @ 2468(patch)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2468``—``2469`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeInterface``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:84160:84299:FUNCTION

.. rubric:: ``onDelete callback @ 2471``

.. code-block:: javascript

   onDelete callback @ 2471()

处理 ``Delete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2471``—``2474`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeInterface``、``select``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:84336:85049:FUNCTION

.. rubric:: ``onConnect callback @ 2475``

.. code-block:: javascript

   onConnect callback @ 2475(nodeId, port)

处理 ``Connect`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2475``—``2490`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``nodeId``
   目标对象的公共或运行时标识。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``connectInterface``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:85835:85906:FUNCTION

.. rubric:: ``workflowGraphAtPath( rootGraph, graphPath.slice(0, -1), )?.nodes.find callback @ 2508``

.. code-block:: javascript

   workflowGraphAtPath( rootGraph, graphPath.slice(0, -1), )?.nodes.find callback @ 2508(node)

作为 ``workflowGraphAtPath( rootGraph, graphPath.slice(0, -1), )?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2508``—``2508`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graphPath.at``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:86060:86096:FUNCTION

.. rubric:: ``onEnter callback @ 2512``

.. code-block:: javascript

   onEnter callback @ 2512()

处理 ``Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2512``—``2512`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:86138:86171:FUNCTION

.. rubric:: ``onSaveTemplate callback @ 2513``

.. code-block:: javascript

   onSaveTemplate callback @ 2513()

处理 ``Save Template`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2513``—``2513`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubgraphTemplate``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:86215:86250:FUNCTION

.. rubric:: ``onUpdateTemplate callback @ 2514``

.. code-block:: javascript

   onUpdateTemplate callback @ 2514()

处理 ``Update Template`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2514``—``2514`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSubgraphTemplate``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:87503:87539:FUNCTION

.. rubric:: ``onValidity callback @ 2542``

.. code-block:: javascript

   onValidity callback @ 2542(valid)

处理 ``Validity`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2542``—``2542`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``valid``
   调用方传入的 ``valid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``validity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:87575:87650:FUNCTION

.. rubric:: ``onChange callback @ 2543``

.. code-block:: javascript

   onChange callback @ 2543(settings)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2543``—``2544`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``settings``
   调用方传入的 ``settings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeGraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:88353:88438:FUNCTION

.. rubric:: ``onStateChange callback @ 2559``

.. code-block:: javascript

   onStateChange callback @ 2559(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2559``—``2560`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``validity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:88503:88589:FUNCTION

.. rubric:: ``onChange callback @ 2562``

.. code-block:: javascript

   onChange callback @ 2562(values)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2562``—``2563`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeDraft``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:89085:89173:FUNCTION

.. rubric:: ``onStateChange callback @ 2575``

.. code-block:: javascript

   onStateChange callback @ 2575(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2575``—``2576`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``validity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:89234:89324:FUNCTION

.. rubric:: ``onChange callback @ 2578``

.. code-block:: javascript

   onChange callback @ 2578(members)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2578``—``2579`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``members``
   调用方传入的 ``members`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeDraft``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:90434:91115:FUNCTION

.. rubric:: ``workflowArtifacts(task?.result).map callback @ 2611``

.. code-block:: javascript

   workflowArtifacts(task?.result).map callback @ 2611(file)

作为 ``workflowArtifacts(task?.result).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2611``—``2628`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:90687:90718:FUNCTION

.. rubric:: ``onClick callback @ 2617``

.. code-block:: javascript

   onClick callback @ 2617()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2617``—``2617`` 行；所属函数 ``workflowArtifacts(task?.result).map callback @ 2611``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadResult``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:91376:91409:FUNCTION

.. rubric:: ``onClick callback @ 2635``

.. code-block:: javascript

   onClick callback @ 2635()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2635``—``2635`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runtimeAction``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:91646:91680:FUNCTION

.. rubric:: ``onClick callback @ 2643``

.. code-block:: javascript

   onClick callback @ 2643()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2643``—``2643`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``runtimeAction``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:92058:92099:FUNCTION

.. rubric:: ``onClick callback @ 2655``

.. code-block:: javascript

   onClick callback @ 2655()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2655``—``2655`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirmation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:93166:93195:FUNCTION

.. rubric:: ``onClick callback @ 2691``

.. code-block:: javascript

   onClick callback @ 2691()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2691``—``2691`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:93551:93575:FUNCTION

.. rubric:: ``onClick callback @ 2703``

.. code-block:: javascript

   onClick callback @ 2703()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2703``—``2703`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:94031:94056:FUNCTION

.. rubric:: ``onClick callback @ 2718``

.. code-block:: javascript

   onClick callback @ 2718()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2718``—``2718`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:94774:94852:FUNCTION

.. rubric:: ``onOpenChange callback @ 2741``

.. code-block:: javascript

   onOpenChange callback @ 2741(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2741``—``2743`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirmation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:96022:96049:FUNCTION

.. rubric:: ``onClick callback @ 2774``

.. code-block:: javascript

   onClick callback @ 2774()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2774``—``2774`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirmation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:96580:96611:FUNCTION

.. rubric:: ``onClick callback @ 2789``

.. code-block:: javascript

   onClick callback @ 2789()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2789``—``2789`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowEditor.jsx:97097:97470:FUNCTION

.. rubric:: ``onClick callback @ 2803``

.. code-block:: javascript

   onClick callback @ 2803()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2803``—``2810`` 行；所属函数 ``WorkflowEditorWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadTemplate``、``setConfirmation``、``runtimeAction``、``deleteTemplate``。
