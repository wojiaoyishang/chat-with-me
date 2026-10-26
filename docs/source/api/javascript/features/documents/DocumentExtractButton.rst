src/features/documents/DocumentExtractButton 模块
======================================================================================================

.. js:module:: src/features/documents/DocumentExtractButton

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/DocumentExtractButton.jsx``
* **模块标识**：``src/features/documents/DocumentExtractButton``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：20

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``react-router-dom``、``@/components/ui/button``、``@/components/ui/dropdown-menu``、``@/lib/apiClient.js``、``@/features/tasks/useTaskStore.js``、``@/features/workflows/QuickTemplateRunDialog.jsx``、``@/features/workflows/workflowApi.js``、``@/features/workflows/workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:787:932:FUNCTION

.. js:function:: templateFields(template, definitions)

   实现 ``templateFields`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``28`` 行。

   **参数**

   ``template``
      调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( template.inputFields || workflowInputFields(template.graph, definitions) )``。

   **主要协作调用**：``workflowInputFields``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:932:1200:FUNCTION

.. js:function:: documentFields(template, fields)

   实现 ``documentFields`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``39`` 行。

   **参数**

   ``template``
      调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fields``
      调用方传入的 ``fields`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fields.filter( (field) => field.kind === "document" || template.graph?.nodes?.some( (node) => node.kind === "document" && (node.inputKey || node.id) === field.key, ), )``。

   **主要协作调用**：``fields.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:1200:8376:FUNCTION

.. js:function:: DocumentExtractButton({ documentId, conversationId, onBeforeSubmit, disabled = false, })

   渲染 ``DocumentExtractButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``41``—``263`` 行。

   **参数**

   ``{ documentId, conversationId, onBeforeSubmit, disabled = false, }``
      调用方传入的 ``documentId, conversationId, onBeforeSubmit, disabled = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <DropdownMenu open={open} onOpenChange={setOpen}> <DropdownMenuTrigger asChild> <Button variant="ghost" size="icon" className="size-8 shrink-0" disabled={disabled || pending…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useNavigate``、``useState``、``useRef``、``useEffect``、``templates.map``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:1001:1192:FUNCTION

.. rubric:: ``fields.filter callback @ 32``

.. code-block:: javascript

   fields.filter callback @ 32(field)

作为 ``fields.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``32``—``37`` 行；所属函数 ``documentFields``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``template.graph?.nodes?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:1086:1183:FUNCTION

.. rubric:: ``template.graph?.nodes?.some callback @ 35``

.. code-block:: javascript

   template.graph?.nodes?.some callback @ 35(node)

作为 ``template.graph?.nodes?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``36`` 行；所属函数 ``fields.filter callback @ 32``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:1787:2587:FUNCTION

.. rubric:: ``useEffect callback @ 57``

.. code-block:: javascript

   useEffect callback @ 57()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``84`` 行；所属函数 ``DocumentExtractButton``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**主要协作调用**：``setLoading``、``setError``、``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin…``、``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then``、``Promise.all``、``workflowApi.templates``、``workflowApi.catalog``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:2035:2353:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback @ 66``

.. code-block:: javascript

   Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback @ 66([saved, definitions])

处理 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``66``—``76`` 行；所属函数 ``useEffect callback @ 57``。

**参数**

``[saved, definitions]``
   调用方传入的 ``saved, definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setCatalog``、``setTemplates``、``(definitions.builtinTemplates || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:2220:2293:FUNCTION

.. rubric:: ``(definitions.builtinTemplates || []).map callback @ 70``

.. code-block:: javascript

   (definitions.builtinTemplates || []).map callback @ 70(item)

作为 ``(definitions.builtinTemplates || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``73`` 行；所属函数 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback @ 66``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:2368:2453:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin… callback @ 77``

.. code-block:: javascript

   Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin… callback @ 77(cause)

实现 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``79`` 行；所属函数 ``useEffect callback @ 57``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:2470:2544:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin… callback @ 80``

.. code-block:: javascript

   Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin… callback @ 80()

实现 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, defin…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``82`` 行；所属函数 ``useEffect callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:2557:2582:FUNCTION

.. rubric:: ``returned callback @ 83``

.. code-block:: javascript

   returned callback @ 83()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``useEffect callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:2621:3844:FUNCTION

.. rubric:: ``submit``

.. code-block:: javascript

   async submit(template, documentInputKey, payload)

实现 ``submit`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``85``—``121`` 行；所属函数 ``DocumentExtractButton``。

**参数**

``template``
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``documentInputKey``
   调用方传入的 ``documentInputKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``{ task: { ...task, id: taskId } }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setPending``、``onBeforeSubmit``、``apiClient.post``、``encodeURIComponent``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``toast.success``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:3567:3689:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``113`` 行；所属函数 ``submit``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:3870:5107:FUNCTION

.. rubric:: ``chooseTemplate``

.. code-block:: javascript

   async chooseTemplate(template)

实现 ``chooseTemplate`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``122``—``165`` 行；所属函数 ``DocumentExtractButton``。

**参数**

``template``
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setOpen``、``templateFields``、``documentFields``、``toast.error``、``Object.fromEntries``、``fields.map``、``fields.some``、``setQuickRequest``、``submit``、``clone``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:4274:4318:FUNCTION

.. rubric:: ``fields.map callback @ 134``

.. code-block:: javascript

   fields.map callback @ 134(field)

作为 ``fields.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``chooseTemplate``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clone``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:4453:4579:FUNCTION

.. rubric:: ``fields.some callback @ 140``

.. code-block:: javascript

   fields.some callback @ 140(field)

作为 ``fields.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``140``—``142`` 行；所属函数 ``chooseTemplate``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowValueMissing``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:6379:6501:FUNCTION

.. rubric:: ``onSelect callback @ 205``

.. code-block:: javascript

   onSelect callback @ 205(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``205``—``208`` 行；所属函数 ``DocumentExtractButton``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``setRetry``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:6461:6481:FUNCTION

.. rubric:: ``setRetry callback @ 207``

.. code-block:: javascript

   setRetry callback @ 207(value)

设置与 ``Retry`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``onSelect callback @ 205``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:6649:7687:FUNCTION

.. rubric:: ``templates.map callback @ 214``

.. code-block:: javascript

   templates.map callback @ 214(template)

作为 ``templates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``214``—``238`` 行；所属函数 ``DocumentExtractButton``。

**参数**

``template``
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={template.id} className="items-start py-2" onSelect={() => void chooseTemplate(template)} > <span className="min-w-0 flex-1"> <span className="block trunca…``。

**主要协作调用**：``documentFields``、``templateFields``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:6988:7023:FUNCTION

.. rubric:: ``onSelect callback @ 223``

.. code-block:: javascript

   onSelect callback @ 223()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``223``—``223`` 行；所属函数 ``templates.map callback @ 214``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chooseTemplate``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:8079:8106:FUNCTION

.. rubric:: ``onClose callback @ 250``

.. code-block:: javascript

   onClose callback @ 250()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``250``—``250`` 行；所属函数 ``DocumentExtractButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickRequest``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:8128:8279:FUNCTION

.. rubric:: ``onSubmit callback @ 251``

.. code-block:: javascript

   onSubmit callback @ 251(payload)

处理 ``Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``251``—``256`` 行；所属函数 ``DocumentExtractButton``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``submit``。

.. CWM-AST-FUNCTION src/features/documents/DocumentExtractButton.jsx:8313:8340:FUNCTION

.. rubric:: ``onChanged callback @ 258``

.. code-block:: javascript

   onChanged callback @ 258()

处理 ``Changed`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``DocumentExtractButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickRequest``。
