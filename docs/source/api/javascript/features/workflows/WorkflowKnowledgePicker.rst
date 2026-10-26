src/features/workflows/WorkflowKnowledgePicker 模块
==========================================================================================================

.. js:module:: src/features/workflows/WorkflowKnowledgePicker

The registry is authoritative; a saved unknown selection stays visible.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowKnowledgePicker.jsx``
* **模块标识**：``src/features/workflows/WorkflowKnowledgePicker``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：53

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/checkbox``、``@/components/ui/popover``、``@/components/ui/dialog``、``@/components/ui/MultilineEditor.jsx``、``@/lib/apiClient.js``、``./WorkflowSourcePicker.jsx``、``./workflowFieldModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:840:905:FUNCTION

.. js:function:: chunkMetadataKey(databaseId, chunkId)

   实现 ``chunkMetadataKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``37`` 行。

   **参数**

   ``databaseId``
      目标对象的公共或运行时标识。

   ``chunkId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:906:1038:FUNCTION

.. js:function:: chunkCount(item, field)

   实现 ``chunkCount`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``42`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isInteger(count) && count >= 0 ? count : null``。

   **主要协作调用**：``Number.isInteger``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:1038:1305:FUNCTION

.. js:function:: chunkUpdateSummary(item)

   实现 ``chunkUpdateSummary`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``50`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``"仅更新当前知识块；没有子知识块。"``、``\x60当前知识块及全部 ${descendants} 个子知识块（含递归）会一同更新。\x60``、``"当前知识块及其全部递归子知识块会一同更新。"``。

   **主要协作调用**：``chunkCount``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:1305:1670:FUNCTION

.. js:function:: ChunkChildrenSummary({ item })

   渲染 ``ChunkChildrenSummary`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``61`` 行。

   **参数**

   ``{ item }``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className="block text-xs text-muted-foreground"> 直接子块 {children ?? "—"} 个 · 递归子块 {descendants ?? "—"} 个 </span> )``。

   **主要协作调用**：``chunkCount``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:1670:5210:FUNCTION

.. js:function:: WorkflowGraphDatabasePicker({ value, onChange, disabled, label = "图数据库", schema = {}, })

   The registry is authoritative; a saved unknown selection stays visible.

   **性质**：同步函数；导出 API；源码第 ``64``—``173`` 行。

   **参数**

   ``{ value, onChange, disabled, label = "图数据库", schema = {}, }``
      调用方传入的 ``value, onChange, disabled, label = "图数据库", schema = ,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="workflow-database-picker space-y-1.5"> <WorkflowSelect label={label} value={selectValue} disabled={disabled || registry.loading || !options.length} options={opti…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useEffect``、``Boolean``、``String``、``registry.databases.find``、``knowledgeDatabaseIdentity``、``registry.databases.map``、``options.unshift``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:5210:10613:FUNCTION

.. js:function:: WorkflowChunkPreview({ item, databaseId, onClose, onChunksRead })

   渲染 ``WorkflowChunkPreview`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``175``—``321`` 行。

   **参数**

   ``{ item, databaseId, onClose, onChunksRead }``
      调用方传入的 ``item, databaseId, onClose, onChunksRead`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open) onClose(); }} > <DialogContent className="flex max-h-[82dvh] w-[min(90vw,800px)] max-w-[min(90vw,800px)] flex-col overflow-hidd…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useEffect``、``chunkUpdateSummary``、``snapshot.relationships.map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:10613:20334:FUNCTION

.. js:function:: FullWorkflowKnowledgeChunkPicker({ value = {}, onChange, disabled, schema = {}, onPreviewOpenChange, knownChunks = {}, onChunksRead,…)

   渲染 ``FullWorkflowKnowledgeChunkPicker`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``323``—``628`` 行。

   **参数**

   ``{ value = {}, onChange, disabled, schema = {}, onPreviewOpenChange, knownChunks = {}, onChunksRead,…``
      调用方传入的 ``value = , onChange, disabled, schema = , onPreviewOpenChange, knownChunks = , onChunksRead,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="workflow-knowledge-chunk-picker space-y-3"> <WorkflowGraphDatabasePicker label={schema.properties?.databaseId?.display?.title || "图数据库"} schema={{ type: "str…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useEffect``、``Boolean``、``chunkMetadataKey``、``items.find``、``chunkUpdateSummary``、``items.map``、``Math.floor``、``Math.ceil``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:20334:23821:FUNCTION

.. js:function:: WorkflowKnowledgeChunkPicker({ compact, label = "知识块", ...props })

   Canvas controls stage edits; quick-run forms edit the same typed value.

   **性质**：同步函数；导出 API；源码第 ``631``—``732`` 行。

   **参数**

   ``{ compact, label = "知识块", ...props }``
      调用方传入的 ``compact, label = "知识块", ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <FullWorkflowKnowledgeChunkPicker {...props} knownChunks={knownChunks} onChunksRead={onChunksRead} /> )``、``( <Popover open={open} onOpenChange={(next) => { if (previewOpen) return; if (next) setDraft({ ...(props.value || {}), scope: "subtree" }); setOpen(next); }} > <PopoverTrigger asC…``。

   **主要协作调用**：``useState``、``useCallback``、``chunkMetadataKey``、``chunkUpdateSummary``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:2027:2743:FUNCTION

.. rubric:: ``useEffect callback @ 77``

.. code-block:: javascript

   useEffect callback @ 77()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``101`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setRegistry``、``apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then((result) => { if (!…``、``apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then``、``apiClient .get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:2097:2152:FUNCTION

.. rubric:: ``setRegistry callback @ 79``

.. code-block:: javascript

   setRegistry callback @ 79(current)

设置与 ``Registry`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useEffect callback @ 77``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:2285:2482:FUNCTION

.. rubric:: ``apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then callback @ 84``

.. code-block:: javascript

   apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then callback @ 84(result)

处理 ``apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``84``—``91`` 行；所属函数 ``useEffect callback @ 77``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRegistry``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:2497:2700:FUNCTION

.. rubric:: ``apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then((result) => { if (!… callback @ 92``

.. code-block:: javascript

   apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then((result) => { if (!… callback @ 92(cause)

实现 ``apiClient .get(schema.ui?.endpoint || "/knowledge/databases", { signal: controller.signal, }) .then((result) => { if (!…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``99`` 行；所属函数 ``useEffect callback @ 77``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRegistry``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:2713:2738:FUNCTION

.. rubric:: ``returned callback @ 100``

.. code-block:: javascript

   returned callback @ 100()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``useEffect callback @ 77``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:3026:3090:FUNCTION

.. rubric:: ``registry.databases.find callback @ 106``

.. code-block:: javascript

   registry.databases.find callback @ 106(database)

作为 ``registry.databases.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

``database``
   调用方传入的 ``database`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``knowledgeDatabaseIdentity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:3123:3165:FUNCTION

.. rubric:: ``registry.databases.find callback @ 107``

.. code-block:: javascript

   registry.databases.find callback @ 107(database)

作为 ``registry.databases.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

``database``
   调用方传入的 ``database`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:3232:3268:FUNCTION

.. rubric:: ``registry.databases.find callback @ 109``

.. code-block:: javascript

   registry.databases.find callback @ 109(database)

作为 ``registry.databases.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

``database``
   调用方传入的 ``database`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:3422:3656:FUNCTION

.. rubric:: ``registry.databases.map callback @ 114``

.. code-block:: javascript

   registry.databases.map callback @ 114(database)

作为 ``registry.databases.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``118`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

``database``
   调用方传入的 ``database`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``knowledgeDatabaseIdentity``、``knowledgeDatabaseTitle``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:4214:4340:FUNCTION

.. rubric:: ``onChange callback @ 138``

.. code-block:: javascript

   onChange callback @ 138(databaseId)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``138``—``141`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

``databaseId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:4922:4963:FUNCTION

.. rubric:: ``onClick callback @ 162``

.. code-block:: javascript

   onClick callback @ 162()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``162``—``162`` 行；所属函数 ``WorkflowGraphDatabasePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReload``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:4938:4962:FUNCTION

.. rubric:: ``setReload callback @ 162``

.. code-block:: javascript

   setReload callback @ 162(current)

设置与 ``Reload`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``162``—``162`` 行；所属函数 ``onClick callback @ 162``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:5443:6457:FUNCTION

.. rubric:: ``useEffect callback @ 182``

.. code-block:: javascript

   useEffect callback @ 182()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``182``—``212`` 行；所属函数 ``WorkflowChunkPreview``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setResult``、``apiClient .get( \x60/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot\x60, { params: { databaseId }, signal…``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:5762:6199:FUNCTION

.. rubric:: ``apiClient .get( \x60/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot\x60, { params: { databaseId }, signal… callback @ 190``

.. code-block:: javascript

   apiClient .get( `/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot`, { params: { databaseId }, signal… callback @ 190(snapshot)

实现 ``apiClient .get( \x60/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot\x60, { params: { databaseId }, signal…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``202`` 行；所属函数 ``useEffect callback @ 182``。

**参数**

``snapshot``
   调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setResult``、``onChunksRead``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:6214:6414:FUNCTION

.. rubric:: ``apiClient .get( \x60/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot\x60, { params: { databaseId }, signal… callback @ 203``

.. code-block:: javascript

   apiClient .get( `/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot`, { params: { databaseId }, signal… callback @ 203(cause)

实现 ``apiClient .get( \x60/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot\x60, { params: { databaseId }, signal…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``210`` 行；所属函数 ``useEffect callback @ 182``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setResult``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:6427:6452:FUNCTION

.. rubric:: ``returned callback @ 211``

.. code-block:: javascript

   returned callback @ 211()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``useEffect callback @ 182``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:6591:6640:FUNCTION

.. rubric:: ``onOpenChange callback @ 217``

.. code-block:: javascript

   onOpenChange callback @ 217(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``217``—``219`` 行；所属函数 ``WorkflowChunkPreview``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:7797:7837:FUNCTION

.. rubric:: ``onClick callback @ 252``

.. code-block:: javascript

   onClick callback @ 252()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``WorkflowChunkPreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetry``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:7812:7836:FUNCTION

.. rubric:: ``setRetry callback @ 252``

.. code-block:: javascript

   setRetry callback @ 252(current)

设置与 ``Retry`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``onClick callback @ 252``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:8907:10077:FUNCTION

.. rubric:: ``snapshot.relationships.map callback @ 279``

.. code-block:: javascript

   snapshot.relationships.map callback @ 279(relationship, index)

作为 ``snapshot.relationships.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``279``—``301`` 行；所属函数 ``WorkflowChunkPreview``。

**参数**

``relationship``
   调用方传入的 ``relationship`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <li key={relationship.id || index} className="rounded-md bg-muted/40 px-3 py-2 text-xs break-words" > {nodeName(relationship.source || relationship.head)} →{" "} {relationship.t…``。

**主要协作调用**：``nodeName``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:8974:9285:FUNCTION

.. rubric:: ``entityName``

.. code-block:: javascript

   entityName(entity)

实现 ``entityName`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``280``—``286`` 行；所属函数 ``snapshot.relationships.map callback @ 279``。

**参数**

``entity``
   调用方传入的 ``entity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``、``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:9325:9515:FUNCTION

.. rubric:: ``nodeName``

.. code-block:: javascript

   nodeName(identity)

实现 ``nodeName`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``287``—``290`` 行；所属函数 ``snapshot.relationships.map callback @ 279``。

**参数**

``identity``
   调用方传入的 ``identity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``snapshot.nodes?.find``、``entityName``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:9385:9458:FUNCTION

.. rubric:: ``snapshot.nodes?.find callback @ 289``

.. code-block:: javascript

   snapshot.nodes?.find callback @ 289(node)

作为 ``snapshot.nodes?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``289``—``289`` 行；所属函数 ``nodeName``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:11214:12610:FUNCTION

.. rubric:: ``useEffect callback @ 347``

.. code-block:: javascript

   useEffect callback @ 347()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``347``—``399`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { clearTimeout(timer); controller.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setResult``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:11466:12520:FUNCTION

.. rubric:: ``setTimeout callback @ 359``

.. code-block:: javascript

   setTimeout callback @ 359()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``359``—``394`` 行；所属函数 ``useEffect callback @ 347``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit…``、``apiClient .get``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:11720:12193:FUNCTION

.. rubric:: ``apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit… callback @ 366``

.. code-block:: javascript

   apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit… callback @ 366(response)

实现 ``apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``366``—``381`` 行；所属函数 ``setTimeout callback @ 359``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChunksRead``、``setResult``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:12210:12512:FUNCTION

.. rubric:: ``apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit… callback @ 382``

.. code-block:: javascript

   apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit… callback @ 382(cause)

实现 ``apiClient .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", { params: { databaseId, q: query, offset, limit…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``382``—``393`` 行；所属函数 ``setTimeout callback @ 359``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setResult``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:12538:12605:FUNCTION

.. rubric:: ``returned callback @ 395``

.. code-block:: javascript

   returned callback @ 395()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``395``—``398`` 行；所属函数 ``useEffect callback @ 347``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:13070:13105:FUNCTION

.. rubric:: ``items.find callback @ 409``

.. code-block:: javascript

   items.find callback @ 409(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``409``—``409`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:13440:13592:FUNCTION

.. rubric:: ``onChange callback @ 417``

.. code-block:: javascript

   onChange callback @ 417(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``417``—``421`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``、``setQuery``、``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:13905:13997:FUNCTION

.. rubric:: ``onChange callback @ 431``

.. code-block:: javascript

   onChange callback @ 431(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``431``—``434`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setOffset``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:14720:14897:FUNCTION

.. rubric:: ``onClick callback @ 454``

.. code-block:: javascript

   onClick callback @ 454()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``454``—``460`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPreviewOpenChange``、``setPreview``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:15185:15244:FUNCTION

.. rubric:: ``onClick callback @ 471``

.. code-block:: javascript

   onClick callback @ 471()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``471``—``471`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:15530:18044:FUNCTION

.. rubric:: ``items.map callback @ 482``

.. code-block:: javascript

   items.map callback @ 482(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``482``—``548`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:15973:16188:FUNCTION

.. rubric:: ``onCheckedChange callback @ 492``

.. code-block:: javascript

   onCheckedChange callback @ 492(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``492``—``498`` 行；所属函数 ``items.map callback @ 482``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:16549:16742:FUNCTION

.. rubric:: ``onClick callback @ 508``

.. code-block:: javascript

   onClick callback @ 508()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``508``—``514`` 行；所属函数 ``items.map callback @ 482``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:17821:17929:FUNCTION

.. rubric:: ``onClick callback @ 540``

.. code-block:: javascript

   onClick callback @ 540()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``540``—``543`` 行；所属函数 ``items.map callback @ 482``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPreviewOpenChange``、``setPreview``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:18861:18897:FUNCTION

.. rubric:: ``onClick callback @ 574``

.. code-block:: javascript

   onClick callback @ 574()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``574``—``574`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRetry``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:18876:18896:FUNCTION

.. rubric:: ``setRetry callback @ 574``

.. code-block:: javascript

   setRetry callback @ 574(count)

设置与 ``Retry`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``574``—``574`` 行；所属函数 ``onClick callback @ 574``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:19173:19247:FUNCTION

.. rubric:: ``onClick callback @ 586``

.. code-block:: javascript

   onClick callback @ 586()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``586``—``587`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:19201:19246:FUNCTION

.. rubric:: ``setOffset callback @ 587``

.. code-block:: javascript

   setOffset callback @ 587(current)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``587``—``587`` 行；所属函数 ``onClick callback @ 586``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:19776:19825:FUNCTION

.. rubric:: ``onClick callback @ 606``

.. code-block:: javascript

   onClick callback @ 606()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``606``—``606`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:19792:19824:FUNCTION

.. rubric:: ``setOffset callback @ 606``

.. code-block:: javascript

   setOffset callback @ 606(current)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``606``—``606`` 行；所属函数 ``onClick callback @ 606``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:20200:20291:FUNCTION

.. rubric:: ``onClose callback @ 620``

.. code-block:: javascript

   onClose callback @ 620()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``620``—``623`` 行；所属函数 ``FullWorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreview``、``onPreviewOpenChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:20760:21135:FUNCTION

.. rubric:: ``useCallback callback @ 640``

.. code-block:: javascript

   useCallback callback @ 640(databaseId, items)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``640``—``652`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``databaseId``
   目标对象的公共或运行时标识。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKnownChunks``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:20804:21129:FUNCTION

.. rubric:: ``setKnownChunks callback @ 641``

.. code-block:: javascript

   setKnownChunks callback @ 641(current)

设置与 ``Known Chunks`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``641``—``651`` 行；所属函数 ``useCallback callback @ 640``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``chunkMetadataKey``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:21571:21720:FUNCTION

.. rubric:: ``onOpenChange callback @ 668``

.. code-block:: javascript

   onOpenChange callback @ 668(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``668``—``672`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDraft``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:22454:22488:FUNCTION

.. rubric:: ``onPointerDown callback @ 692``

.. code-block:: javascript

   onPointerDown callback @ 692(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:22507:22541:FUNCTION

.. rubric:: ``onWheel callback @ 693``

.. code-block:: javascript

   onWheel callback @ 693(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``693``—``693`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:22570:22643:FUNCTION

.. rubric:: ``onInteractOutside callback @ 694``

.. code-block:: javascript

   onInteractOutside callback @ 694(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``694``—``696`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:22669:22742:FUNCTION

.. rubric:: ``onFocusOutside callback @ 697``

.. code-block:: javascript

   onFocusOutside callback @ 697(event)

处理 ``Focus Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``697``—``699`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:22769:22842:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 700``

.. code-block:: javascript

   onEscapeKeyDown callback @ 700(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``700``—``702`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowKnowledgePicker.jsx:23548:23682:FUNCTION

.. rubric:: ``onClick callback @ 721``

.. code-block:: javascript

   onClick callback @ 721()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``721``—``724`` 行；所属函数 ``WorkflowKnowledgeChunkPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``props.onChange``、``setOpen``。
