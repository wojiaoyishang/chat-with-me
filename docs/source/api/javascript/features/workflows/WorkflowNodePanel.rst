src/features/workflows/WorkflowNodePanel 模块
==============================================================================================

.. js:module:: src/features/workflows/WorkflowNodePanel

Constructor settings and documentation; invoke values live on the canvas.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowNodePanel.jsx``
* **模块标识**：``src/features/workflows/WorkflowNodePanel``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：52

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/ui/input``、``@/components/ui/checkbox``、``@/components/setting/JsonConfigEditor.jsx``、``@/components/ui/MultilineEditor.jsx``、``./WorkflowSchemaEditor.jsx``、``./workflowModel.js``、``./WorkflowDataField.jsx``、``./WorkflowSettingsFields.jsx``、``./workflowFieldModel.js``、``./WorkflowOrderedInputs.jsx``、``./WorkflowConditionRules.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:813:1107:FUNCTION

.. js:function:: objectSchema(schema, names)

   实现 ``objectSchema`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``30`` 行。

   **参数**

   ``schema``
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``names``
      调用方传入的 ``names`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...schema, properties: Object.fromEntries( Object.entries(schema.properties || {}).filter(([key]) => names.includes(key), ), ), required: (schema.required || []).filter((key) =>…``。

   **主要协作调用**：``Object.fromEntries``、``Object.entries(schema.properties || {}).filter``、``Object.entries``、``(schema.required || []).filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1107:17266:FUNCTION

.. js:function:: WorkflowNodePanel({ node, graph, definitions, context, models, onGraphChange, onValidity, disabled, nodeHeader, })

   Constructor settings and documentation; invoke values live on the canvas.

   **性质**：同步函数；导出 API；源码第 ``33``—``476`` 行。

   **参数**

   ``{ node, graph, definitions, context, models, onGraphChange, onValidity, disabled, nodeHeader, }``
      调用方传入的 ``node, graph, definitions, context, models, onGraphChange, onValidity, disabled, nodeHeader,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <p className="text-sm text-destructive"> 节点定义不可用，请重新加载目录。 </p> )``、``( <div className="space-y-5"> <section className="space-y-2"> {nodeHeader || ( <> <h3 className="font-semibold">{definition.display?.title}</h3> <p className="text-xs text-muted-f…``。

   **主要协作调用**：``useMemo``、``(definition?.constructorInputs || []).filter``、``(definition?.constructorInputs || []) .filter( (input) => connectedConstructorInput(input) || (input.preferExternal &&…``、``(definition?.constructorInputs || []) .filter``、``normalizeWorkflowSchema``、``(definition?.configurationWidgets || []).filter``、``widgets .filter((widget) => widget.widget === "knowledge-schema") .flatMap``、``widgets .filter``、``Object.keys(schema.properties || {}).filter``、``Object.keys``、``regularKeys.filter``、``pendingConstructorInputs.map``。

   **内部回调数量**：37。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:969:1007:FUNCTION

.. rubric:: ``Object.entries(schema.properties || {}).filter callback @ 24``

.. code-block:: javascript

   Object.entries(schema.properties || {}).filter callback @ 24([key])

作为 ``Object.entries(schema.properties || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``25`` 行；所属函数 ``objectSchema``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``names.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1070:1098:FUNCTION

.. rubric:: ``(schema.required || []).filter callback @ 28``

.. code-block:: javascript

   (schema.required || []).filter callback @ 28(key)

作为 ``(schema.required || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``objectSchema``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``names.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1378:1512:FUNCTION

.. rubric:: ``useMemo callback @ 45``

.. code-block:: javascript

   useMemo callback @ 45()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``49`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``effectiveWorkflowDefinition``、``catalogNode``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1595:1709:FUNCTION

.. rubric:: ``connectedConstructorInput``

.. code-block:: javascript

   connectedConstructorInput(input)

实现 ``connectedConstructorInput`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``52``—``55`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graph.edges.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1628:1702:FUNCTION

.. rubric:: ``graph.edges.some callback @ 54``

.. code-block:: javascript

   graph.edges.some callback @ 54(edge)

作为 ``graph.edges.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``connectedConstructorInput``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1747:1900:FUNCTION

.. rubric:: ``configuredConstructorInput``

.. code-block:: javascript

   configuredConstructorInput(input)

实现 ``configuredConstructorInput`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``60`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(input.configFields || []).some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1795:1899:FUNCTION

.. rubric:: ``(input.configFields || []).some callback @ 57``

.. code-block:: javascript

   (input.configFields || []).some callback @ 57(field)

作为 ``(input.configFields || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``60`` 行；所属函数 ``configuredConstructorInput``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``value != null && value !== ""``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:1982:2111:FUNCTION

.. rubric:: ``(definition?.constructorInputs || []).filter callback @ 62``

.. code-block:: javascript

   (definition?.constructorInputs || []).filter callback @ 62(input)

作为 ``(definition?.constructorInputs || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``connectedConstructorInput``、``configuredConstructorInput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2208:2344:FUNCTION

.. rubric:: ``(definition?.constructorInputs || []) .filter callback @ 70``

.. code-block:: javascript

   (definition?.constructorInputs || []) .filter callback @ 70(input)

作为 ``(definition?.constructorInputs || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``72`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``connectedConstructorInput``、``configuredConstructorInput``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2369:2404:FUNCTION

.. rubric:: ``(definition?.constructorInputs || []) .filter( (input) => connectedConstructorInput(input) || (input.preferExternal &&… callback @ 74``

.. code-block:: javascript

   (definition?.constructorInputs || []) .filter( (input) => connectedConstructorInput(input) || (input.preferExternal &&… callback @ 74(input)

实现 ``(definition?.constructorInputs || []) .filter( (input) => connectedConstructorInput(input) || (input.preferExternal &&…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2591:2719:FUNCTION

.. rubric:: ``useMemo callback @ 81``

.. code-block:: javascript

   useMemo callback @ 81()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``81``—``84`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(definition?.commonFields || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2645:2710:FUNCTION

.. rubric:: ``(definition?.commonFields || []).map callback @ 82``

.. code-block:: javascript

   (definition?.commonFields || []).map callback @ 82(field)

作为 ``(definition?.commonFields || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``82``—``83`` 行；所属函数 ``useMemo callback @ 81``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2810:2898:FUNCTION

.. rubric:: ``(definition?.configurationWidgets || []).filter callback @ 88``

.. code-block:: javascript

   (definition?.configurationWidgets || []).filter callback @ 88(widget)

作为 ``(definition?.configurationWidgets || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``88``—``89`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``widget``
   调用方传入的 ``widget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(widget.fields || []).some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2861:2897:FUNCTION

.. rubric:: ``(widget.fields || []).some callback @ 89``

.. code-block:: javascript

   (widget.fields || []).some callback @ 89(field)

作为 ``(widget.fields || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``(definition?.configurationWidgets || []).filter callback @ 88``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``externalFields.has``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:2946:2994:FUNCTION

.. rubric:: ``widgets .filter callback @ 92``

.. code-block:: javascript

   widgets .filter callback @ 92(widget)

作为 ``widgets .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``92`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``widget``
   调用方传入的 ``widget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:3009:3040:FUNCTION

.. rubric:: ``widgets .filter((widget) => widget.widget === "knowledge-schema") .flatMap callback @ 93``

.. code-block:: javascript

   widgets .filter((widget) => widget.widget === "knowledge-schema") .flatMap callback @ 93(widget)

实现 ``widgets .filter((widget) => widget.widget === "knowledge-schema") .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``widget``
   调用方传入的 ``widget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:3107:3283:FUNCTION

.. rubric:: ``Object.keys(schema.properties || {}).filter callback @ 94``

.. code-block:: javascript

   Object.keys(schema.properties || {}).filter callback @ 94(key)

作为 ``Object.keys(schema.properties || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``98`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["model-picker", "model-queue", "model-list-picker"].includes``、``scalarSchema``、``resolveWorkflowSchema``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:3355:3462:FUNCTION

.. rubric:: ``Object.keys(schema.properties || {}).filter callback @ 101``

.. code-block:: javascript

   Object.keys(schema.properties || {}).filter callback @ 101(key)

作为 ``Object.keys(schema.properties || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``103`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:3535:3771:FUNCTION

.. rubric:: ``Object.keys(schema.properties || {}).filter callback @ 106``

.. code-block:: javascript

   Object.keys(schema.properties || {}).filter callback @ 106(key)

作为 ``Object.keys(schema.properties || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``112`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``common.includes``、``modelKeys.includes``、``widgetKeys.includes``、``hiddenKeys.includes``、``externalFields.has``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:3819:4113:FUNCTION

.. rubric:: ``regularKeys.filter callback @ 114``

.. code-block:: javascript

   regularKeys.filter callback @ 114(key)

作为 ``regularKeys.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``123`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( Boolean(property.ui?.widget) || (node.kind === "entity_alignment" && ["string", "integer", "number", "boolean"].includes(property.type)) )``。

**主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``、``Boolean``、``["string", "integer", "number", "boolean"].includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:4154:4189:FUNCTION

.. rubric:: ``regularKeys.filter callback @ 124``

.. code-block:: javascript

   regularKeys.filter callback @ 124(key)

作为 ``regularKeys.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dynamicKeys.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:4208:4370:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``125``—``131`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onGraphChange``、``graph.nodes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:4285:4353:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 128``

.. code-block:: javascript

   graph.nodes.map callback @ 128(item)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``129`` 行；所属函数 ``update``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:4394:4425:FUNCTION

.. rubric:: ``updateConfig``

.. code-block:: javascript

   updateConfig(config)

更新与 ``Config`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``config``
   调用方传入的 ``config`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:5099:5146:FUNCTION

.. rubric:: ``onChange callback @ 155``

.. code-block:: javascript

   onChange callback @ 155(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:6627:6705:FUNCTION

.. rubric:: ``onChange callback @ 196``

.. code-block:: javascript

   onChange callback @ 196(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``196``—``197`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:7525:7684:FUNCTION

.. rubric:: ``onChange callback @ 217``

.. code-block:: javascript

   onChange callback @ 217(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``217``—``221`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:8623:8991:FUNCTION

.. rubric:: ``pendingConstructorInputs.map callback @ 250``

.. code-block:: javascript

   pendingConstructorInputs.map callback @ 250(input)

作为 ``pendingConstructorInputs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``250``—``262`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``definition.inputs.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:8855:8889:FUNCTION

.. rubric:: ``definition.inputs.find callback @ 257``

.. code-block:: javascript

   definition.inputs.find callback @ 257(port)

作为 ``definition.inputs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``pendingConstructorInputs.map callback @ 250``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:9032:9066:FUNCTION

.. rubric:: ``common .filter callback @ 264``

.. code-block:: javascript

   common .filter callback @ 264(key)

作为 ``common .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``hiddenKeys.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:9085:12215:FUNCTION

.. rubric:: ``common .filter((key) => !hiddenKeys.includes(key)) .map callback @ 265``

.. code-block:: javascript

   common .filter((key) => !hiddenKeys.includes(key)) .map callback @ 265(key)

作为 ``common .filter((key) => !hiddenKeys.includes(key)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``265``—``337`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-2 rounded-lg border p-3" key={key}> <div className="flex items-center justify-between gap-2"> <label className="workflow-label m-0">{fieldLabel}</lab…``。

**主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``、``["model-queue", "model-list-picker"].includes``、``workflowModelQueueSummary``、``models.find``、``String``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:10067:10252:FUNCTION

.. rubric:: ``onCheckedChange callback @ 283``

.. code-block:: javascript

   onCheckedChange callback @ 283(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``283``—``287`` 行；所属函数 ``common .filter((key) => !hiddenKeys.includes(key)) .map callback @ 265``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:11179:11212:FUNCTION

.. rubric:: ``models.find callback @ 310``

.. code-block:: javascript

   models.find callback @ 310(model)

作为 ``models.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``310``—``310`` 行；所属函数 ``common .filter((key) => !hiddenKeys.includes(key)) .map callback @ 265``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:11789:11870:FUNCTION

.. rubric:: ``onChange callback @ 325``

.. code-block:: javascript

   onChange callback @ 325(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``325``—``326`` 行；所属函数 ``common .filter((key) => !hiddenKeys.includes(key)) .map callback @ 265``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:12257:12305:FUNCTION

.. rubric:: ``widgets .filter callback @ 339``

.. code-block:: javascript

   widgets .filter callback @ 339(widget)

作为 ``widgets .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``339``—``339`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``widget``
   调用方传入的 ``widget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:12324:12724:FUNCTION

.. rubric:: ``widgets .filter((widget) => widget.widget === "knowledge-schema") .map callback @ 340``

.. code-block:: javascript

   widgets .filter((widget) => widget.widget === "knowledge-schema") .map callback @ 340(widget, index)

作为 ``widgets .filter((widget) => widget.widget === "knowledge-schema") .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``340``—``349`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``widget``
   调用方传入的 ``widget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:12644:12692:FUNCTION

.. rubric:: ``onBusyChange callback @ 347``

.. code-block:: javascript

   onBusyChange callback @ 347(busy)

处理 ``Busy Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``347``—``347`` 行；所属函数 ``widgets .filter((widget) => widget.widget === "knowledge-schema") .map callback @ 340``。

**参数**

``busy``
   调用方传入的 ``busy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onValidity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:12768:12827:FUNCTION

.. rubric:: ``modelKeys .filter callback @ 351``

.. code-block:: javascript

   modelKeys .filter callback @ 351(key)

作为 ``modelKeys .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``351``—``351`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``common.includes``、``hiddenKeys.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:12846:13955:FUNCTION

.. rubric:: ``modelKeys .filter((key) => !common.includes(key) && !hiddenKeys.includes(key)) .map callback @ 352``

.. code-block:: javascript

   modelKeys .filter((key) => !common.includes(key) && !hiddenKeys.includes(key)) .map callback @ 352(key)

作为 ``modelKeys .filter((key) => !common.includes(key) && !hiddenKeys.includes(key)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``352``—``380`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:13573:13650:FUNCTION

.. rubric:: ``onChange callback @ 370``

.. code-block:: javascript

   onChange callback @ 370(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``370``—``371`` 行；所属函数 ``modelKeys .filter((key) => !common.includes(key) && !hiddenKeys.includes(key)) .map callback @ 352``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:14219:14265:FUNCTION

.. rubric:: ``dynamicKeys .filter callback @ 387``

.. code-block:: javascript

   dynamicKeys .filter callback @ 387(key)

作为 ``dynamicKeys .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``387``—``387`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:14290:14322:FUNCTION

.. rubric:: ``dynamicKeys .filter((key) => Object.hasOwn(node.config || {}, key)) .map callback @ 388``

.. code-block:: javascript

   dynamicKeys .filter((key) => Object.hasOwn(node.config || {}, key)) .map callback @ 388(key)

作为 ``dynamicKeys .filter((key) => Object.hasOwn(node.config || {}, key)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``388`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:14432:14481:FUNCTION

.. rubric:: ``onValidity callback @ 392``

.. code-block:: javascript

   onValidity callback @ 392(valid)

处理 ``Validity`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``392``—``392`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``valid``
   调用方传入的 ``valid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onValidity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:14507:14801:FUNCTION

.. rubric:: ``onChange callback @ 393``

.. code-block:: javascript

   onChange callback @ 393(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``393``—``401`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``、``Object.fromEntries``、``Object.entries(node.config || {}).filter``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:14650:14710:FUNCTION

.. rubric:: ``Object.entries(node.config || {}).filter callback @ 397``

.. code-block:: javascript

   Object.entries(node.config || {}).filter callback @ 397([key])

作为 ``Object.entries(node.config || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``397``—``397`` 行；所属函数 ``onChange callback @ 393``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dynamicKeys.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:15088:15134:FUNCTION

.. rubric:: ``jsonKeys .filter callback @ 411``

.. code-block:: javascript

   jsonKeys .filter callback @ 411(key)

作为 ``jsonKeys .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``411``—``411`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:15159:15191:FUNCTION

.. rubric:: ``jsonKeys .filter((key) => Object.hasOwn(node.config || {}, key)) .map callback @ 412``

.. code-block:: javascript

   jsonKeys .filter((key) => Object.hasOwn(node.config || {}, key)) .map callback @ 412(key)

作为 ``jsonKeys .filter((key) => Object.hasOwn(node.config || {}, key)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``412``—``412`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:15307:15388:FUNCTION

.. rubric:: ``onStateChange callback @ 416``

.. code-block:: javascript

   onStateChange callback @ 416(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``416``—``417`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onValidity``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:15429:15720:FUNCTION

.. rubric:: ``onChange callback @ 419``

.. code-block:: javascript

   onChange callback @ 419(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``419``—``427`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConfig``、``Object.fromEntries``、``Object.entries(node.config || {}).filter``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:15572:15629:FUNCTION

.. rubric:: ``Object.entries(node.config || {}).filter callback @ 423``

.. code-block:: javascript

   Object.entries(node.config || {}).filter callback @ 423([key])

作为 ``Object.entries(node.config || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``423``—``423`` 行；所属函数 ``onChange callback @ 419``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``jsonKeys.includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:16352:16388:FUNCTION

.. rubric:: ``Object.entries( definition.documentation || definition.pythonDocs, ) .map callback @ 445``

.. code-block:: javascript

   Object.entries( definition.documentation || definition.pythonDocs, ) .map callback @ 445([name, text])

作为 ``Object.entries( definition.documentation || definition.pythonDocs, ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``445``—``445`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``[name, text]``
   调用方传入的 ``name, text`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePanel.jsx:16579:17219:FUNCTION

.. rubric:: ``[...(definition.inputs || []), ...(definition.outputs || [])].map callback @ 453``

.. code-block:: javascript

   [...(definition.inputs || []), ...(definition.outputs || [])].map callback @ 453(port, index)

作为 ``[...(definition.inputs || []), ...(definition.outputs || [])].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``453``—``471`` 行；所属函数 ``WorkflowNodePanel``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
