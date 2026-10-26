src/features/workflows/workflowModel 模块
======================================================================================

.. js:module:: src/features/workflows/workflowModel

Serializable workflow helpers shared by the canvas, forms, and tests.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowModel.js``
* **模块标识**：``src/features/workflows/workflowModel``
* **顶层函数/组件/Hook**：47
* **类**：0
* **局部函数与匿名回调**：159

主要依赖
--------------------------------------------------------------------------------

``./workflowRegions.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:218:255:FUNCTION

.. js:function:: workflowId()

   实现 ``workflowId`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``7``—``7`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``globalThis.crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:277:358:FUNCTION

.. js:function:: clone(value)

   实现 ``clone`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``8``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:359:827:FUNCTION

.. js:function:: workflowUsesKnowledge(graph, definitions)

   Knowledge policy controls follow trusted node effects, including subgraphs.

   **性质**：同步函数；导出 API；源码第 ``12``—``21`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions`` （默认值 ``[]``）
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(graph?.nodes || []).some((node) => node.kind === "subgraph" ? workflowUsesKnowledge(node.subgraph?.graph, definitions) : ( definitions.find((definition) => definition.kind === no…``。

   **主要协作调用**：``(graph?.nodes || []).some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1096:1800:FUNCTION

.. js:function:: normalizeWorkflowSchema(value)

   Catalog annotations may use Pydantic range names; forms use JSON Schema.

   **性质**：同步函数；导出 API；源码第 ``37``—``57`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value.map(normalizeWorkflowSchema)``、``value``、``schema``。

   **主要协作调用**：``Array.isArray``、``value.map``、``Object.fromEntries``、``Object.entries(value).map``、``Object.entries``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1800:2089:FUNCTION

.. js:function:: scalarSchema(schema)

   实现 ``scalarSchema`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``59``—``65`` 行。

   **参数**

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``variant ? scalarSchema({ ...base, ...variant }) : schema``。

   **主要协作调用**：``(anyOf || oneOf || []).find``、``scalarSchema``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2089:2555:FUNCTION

.. js:function:: resolveWorkflowSchema(schema, root)

   解析并确定与 ``Workflow Schema`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``67``—``81`` 行。

   **参数**

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root`` （默认值 ``schema``）
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``schema``、``{ ...target, ...rest, ...(root.$defs ? { $defs: root.$defs } : {}) }``。

   **主要协作调用**：``schema.$ref?.startsWith``、``schema.$ref .slice(2) .split("/") .reduce``、``schema.$ref .slice(2) .split``、``schema.$ref .slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2555:2975:FUNCTION

.. js:function:: schemaDefaults(schema)

   实现 ``schemaDefaults`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``83``—``93`` 行。

   **参数**

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``clone(schema.default)``、``Object.fromEntries( Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map(([key, property]) => [key, schemaDefaults(property)]…``、``undefined``。

   **主要协作调用**：``Object.hasOwn``、``clone``、``Object.fromEntries``、``Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map``、``Object.entries(schema.properties || {}) .filter``、``Object.entries``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2975:3769:FUNCTION

.. js:function:: normalizeGraph(graph, settingsDefaults)

   规范化与 ``Graph`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``95``—``118`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``settingsDefaults`` （默认值 ``{}``）
      调用方传入的 ``settingsDefaults`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ version: graph?.version || 3, nodes: clone(graph?.nodes || []), edges: clone(graph?.edges || []), settings: { ...clone(settingsDefaults), ...graph?.settings, ...(settingsDefault…``。

   **主要协作调用**：``clone``、``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:3769:4444:FUNCTION

.. js:function:: updateWorkflowNodePositions(graph, moved)

   更新与 ``Workflow Node Positions`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``120``—``142`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``moved`` （默认值 ``[]``）
      调用方传入的 ``moved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``changed ? { ...graph, nodes } : graph``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map``、``moved .filter``、``graph.nodes.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4444:5366:FUNCTION

.. js:function:: initializeGraph(graph, definitions, settingsDefaults)

   实现 ``initializeGraph`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``144``—``174`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``settingsDefaults``
      调用方传入的 ``settingsDefaults`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next``。

   **显式抛出**：``new Error("输入标识已统一为节点 ID，请按当前模板重建工作流。")``、``new Error( "参数节点属于子图接口，请使用 subgraph.interface 定义，不能作为执行节点导入。", )``。

   **主要协作调用**：``normalizeGraph``、``next.nodes.some``、``next.nodes.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5366:5449:FUNCTION

.. js:function:: nodeCategory(definition)

   实现 ``nodeCategory`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``176``—``178`` 行。

   **参数**

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``definition?.category || ""``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5449:5832:FUNCTION

.. js:function:: workflowNodeNumbers(graph)

   Short canvas labels never replace the real IDs used for runtime bindings.

   **性质**：同步函数；导出 API；源码第 ``181``—``192`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``numbers``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5832:7096:FUNCTION

.. js:function:: workflowNodeMenuTree(menus, definitions)

   Menu placement is a server-owned scene path, independent of execution role.

   **性质**：同步函数；导出 API；源码第 ``195``—``233`` 行。

   **参数**

   ``menus`` （默认值 ``[]``）
      调用方传入的 ``menus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions`` （默认值 ``[]``）
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``prune(groups)``。

   **主要协作调用**：``build``、``definitions.filter``、``children.find``、``(group && group.path.length === definition.menuPath?.length ? group.nodes : unassigned ).push``、``groups.push``、``prune``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7096:7486:FUNCTION

.. js:function:: workflowRepeatedItems(node, definition)

   Repeated ports use stable item IDs; their order belongs to configuration.

   **性质**：同步函数；导出 API；源码第 ``236``—``243`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``Array.isArray(value) ? value : schemaDefaults(definition.configSchema)?.[repeated.configField] || []``。

   **主要协作调用**：``Array.isArray``、``schemaDefaults``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7486:9211:FUNCTION

.. js:function:: effectiveWorkflowDefinition(node, definition)

   实现 ``effectiveWorkflowDefinition`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``245``—``295`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``definition``、``{ ...definition, baseDefinition: definition.baseDefinition || definition, inputs, inputSchema: { ...definition.inputSchema, properties, required }, }``。

   **主要协作调用**：``(definition.inputs || []).filter``、``Object.fromEntries``、``Object.entries(definition.inputSchema?.properties || {}).filter``、``Object.entries``、``(definition.inputSchema?.required || []).filter``、``workflowRepeatedItems(node, definition).forEach``、``workflowRepeatedItems``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:9211:11079:FUNCTION

.. js:function:: setWorkflowRepeatedItems(graph, nodeId, definition, items)

   One graph update preserves links during reorder and removes obsolete ports.

   **性质**：同步函数；导出 API；源码第 ``298``—``351`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``items``
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph``、``{ ...graph, nodes: graph.nodes.map((entry) => entry.id === nodeId ? { ...entry, config: { ...entry.config, [repeated.configField]: clone(items) }, inputs, } : entry, ), edges: gra…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **显式抛出**：``new Error(\x60请保留 ${min} 至 ${max} 个内容输入。\x60)``、``new Error("内容输入的标识无效或重复。")``、``new Error("内容输入的类型不可用。")``。

   **主要协作调用**：``graph.nodes.find``、``/^[A-Za-z0-9_-]{1,48}$/.test``、``ids.has``、``repeated.kinds?.some``、``ids.add``、``workflowRepeatedItems(node, definition).map``、``workflowRepeatedItems``、``items .filter((item) => previous.get(item.id) === item.kind) .map``、``items .filter``、``Object.fromEntries``、``Object.entries(node.inputs || {}).filter``、``Object.entries``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11079:11277:FUNCTION

.. js:function:: nextWorkflowRepeatedItemId(items)

   实现 ``nextWorkflowRepeatedItemId`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``353``—``358`` 行。

   **参数**

   ``items``
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60slot-${index}\x60``。

   **主要协作调用**：``items.map``、``ids.has``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11277:11473:FUNCTION

.. js:function:: workflowPortsCompatible(output, input)

   实现 ``workflowPortsCompatible`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``360``—``366`` 行。

   **参数**

   ``output``
      调用方传入的 ``output`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``input``
      待解析、校验或转换的输入。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( input?.acceptsAny === true || output?.type === input?.type || (input?.accepts || []).includes(output?.type) )``。

   **主要协作调用**：``(input?.accepts || []).includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11473:13445:FUNCTION

.. js:function:: workflowInputFields(graph, definitions, path)

   实现 ``workflowInputFields`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``368``—``418`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions`` （默认值 ``[]``）
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fields``。

   **显式抛出**：``new Error( \x60模板输入标识重复：${field.key}。请为子图中的输入节点设置独立标识。\x60, )``。

   **主要协作调用**：``graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map``、``graph.nodes .filter``、``graph.nodes.filter``、``clone``、``Object.hasOwn``、``childGraph.nodes.find``、``fields.push``、``workflowInputFields``、``keys.has``、``keys.add``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:13445:13759:FUNCTION

.. js:function:: sourceNodeValue(node, definition)

   实现 ``sourceNodeValue`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``420``—``428`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``、``clone(value ?? source.default ?? schemaDefaults(source.valueSchema))``。

   **主要协作调用**：``clone``、``schemaDefaults``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:13759:14017:FUNCTION

.. js:function:: sourceValueConfig(definition, value, current)

   实现 ``sourceValueConfig`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``430``—``436`` 行。

   **参数**

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   ``current`` （默认值 ``{}``）
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``current``、``source.configField == null ? { ...current, ...value } : { ...current, [source.configField]: value }``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:14017:14509:FUNCTION

.. js:function:: workflowValueMissing(value, schema)

   Required inputs follow the supplied schema, including compound sources.

   **性质**：同步函数；导出 API；源码第 ``439``—``448`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``value.length < (schema.minItems || 0)``、``(schema.required || []).some((key) => workflowValueMissing(value[key], schema.properties?.[key]), )``、``false``。

   **主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``、``Array.isArray``、``(schema.required || []).some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:14509:15484:FUNCTION

.. js:function:: createWorkflowNode(definition, graph, position)

   创建与 ``Workflow Node`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``450``—``482`` 行。

   **参数**

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``position``
      调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ id: workflowId(), kind: definition.kind, name: definition.display?.title || "", version: definition.version, ...(definition.kind === "subgraph" ? { subgraph: { initialized: fals…``。

   **主要协作调用**：``schemaDefaults``、``workflowRepeatedItems``、``workflowId``、``normalizeGraph``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:15484:17044:FUNCTION

.. js:function:: workflowAddCandidates(definitions, graph, connection, query, context)

   Picker candidates obey the same backend-declared port rules as manual links.

   **性质**：同步函数；导出 API；源码第 ``485``—``533`` 行。

   **参数**

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``connection``
      调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``query`` （默认值 ``""``）
      调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context`` （默认值 ``[]``）
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``definitions .filter((definition) => !definition.hidden) .flatMap((definition) => { definition = effectiveWorkflowDefinition(null, definition); const ports = connection ? ( definit…``。

   **主要协作调用**：``graph.nodes.find``、``effectiveWorkflowDefinition``、``catalogNode``、``definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find``、``query.trim().toLocaleLowerCase``、``query.trim``、``definitions .filter((definition) => !definition.hidden) .flatMap``、``definitions .filter``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:17044:17954:FUNCTION

.. js:function:: addWorkflowNodeWithConnection(graph, definition, position, connection, port, definitions, context)

   Adding and linking is one immutable update, so one undo removes both.

   **性质**：同步函数；导出 API；源码第 ``536``—``566`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``position``
      调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``connection``
      调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``port``
      调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context`` （默认值 ``[]``）
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ graph: next, node }``。

   **显式抛出**：``new Error("请选择新节点的连接端口。")``。

   **主要协作调用**：``createWorkflowNode``、``connectWorkflow``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:17954:18343:FUNCTION

.. js:function:: isWorkflowCanvasBlankTarget(target)

   Node controls, edges and canvas controls never count as empty canvas.

   **性质**：同步函数；导出 API；源码第 ``569``—``576`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean( target?.closest?.(".react-flow__pane") && !target.closest( ".react-flow__node,.react-flow__edge,.react-flow__handle,.react-flow__controls,button,input,textarea,select,[ro…``。

   **主要协作调用**：``Boolean``、``target?.closest``、``target.closest``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18343:18876:FUNCTION

.. js:function:: copyWorkflowSelection(graph, ids, inheritedRegions)

   实现 ``copyWorkflowSelection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``578``—``592`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``inheritedRegions`` （默认值 ``[]``）
      调用方传入的 ``inheritedRegions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``clone({ nodes, executionRegions: projectWorkflowRegions( [...(graph.executionRegions || []), ...inheritedRegions], nodes, ), edges: graph.edges.filter( (edge) => selected.has(edge…``。

   **主要协作调用**：``graph.nodes.filter``、``clone``、``projectWorkflowRegions``、``graph.edges.filter``、``(graph.outputNodes || []).filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18876:19055:FUNCTION

.. js:function:: workflowNodeIds(graph)

   实现 ``workflowNodeIds`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``594``—``599`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph.nodes.flatMap((node) => [ node.id, ...(node.subgraph?.graph ? workflowNodeIds(node.subgraph.graph) : []), ])``。

   **主要协作调用**：``graph.nodes.flatMap``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:19055:21994:FUNCTION

.. js:function:: instantiateWorkflowGraph(original)

   Instantiate a graph tree. Saving/retrying never calls this function.

   **性质**：同步函数；导出 API；源码第 ``602``—``678`` 行。

   **参数**

   ``original``
      调用方传入的 ``original`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``initializeGraph``、``clone``、``visit``、``remapRegions``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21994:23029:FUNCTION

.. js:function:: pasteWorkflowSelection(graph, clipboard, position)

   实现 ``pasteWorkflowSelection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``680``—``708`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``clipboard``
      调用方传入的 ``clipboard`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``position``
      调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ graph, ids: [] }``、``{ graph: { ...graph, version: 3, nodes: [...graph.nodes, ...copied.nodes], edges: [...graph.edges, ...copied.edges], outputNodes: [...(graph.outputNodes || []), ...copied.outputNo…``。

   **主要协作调用**：``instantiateWorkflowGraph``、``Math.min``、``copied.nodes.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23029:23761:FUNCTION

.. js:function:: workflowSubgraphTemplateNode(source, definitions, title)

   Root budgets of a standalone template travel with its reusable wrapper.

   **性质**：同步函数；导出 API；源码第 ``711``—``729`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``title``
      调用方传入的 ``title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``wrapper``。

   **主要协作调用**：``clone``、``wrapWorkflowSubgraph``、``source.nodes.map``、``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter``、``projectWorkflowRegions``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23761:25291:FUNCTION

.. js:function:: initializeWorkflowSubgraph(graph, nodeId, saved, definitions)

   Confirm a placeholder in place; template sources are copied and globally rekeyed.

   **性质**：同步函数；导出 API；源码第 ``732``—``774`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   ``saved``
      调用方传入的 ``saved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...graph, version: 3, nodes: graph.nodes.map((node) => node.id === target.id ? replacement : node, ), }``。

   **显式抛出**：``new Error("该子图已完成配置或已被删除，请重新选择。")``、``new Error("所选模板没有可复制的节点。")``、``new Error("所选子图模板尚未确认创建，请先完成模板配置。")``。

   **主要协作调用**：``graph.nodes.find``、``initializeGraph``、``workflowSubgraphTemplateNode``、``pasteWorkflowSelection``、``graph.nodes.filter``、``pasted.graph.nodes.at``、``clone``、``graph.nodes.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25291:25682:FUNCTION

.. js:function:: setWorkflowPortMode(graph, nodeId, port, mode, schema)

   设置与 ``Workflow Port Mode`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``776``—``790`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   ``port``
      调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph``、``bindWorkflowInput( graph, nodeId, port, mode === "inline" ? { type: "literal", value: node.inputs?.[port]?.value ?? schemaDefaults(schema), } : null, )``。

   **主要协作调用**：``graph.nodes.find``、``bindWorkflowInput``、``schemaDefaults``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25682:25888:FUNCTION

.. js:function:: isWorkflowTextEditing(target)

   判断与 ``Workflow Text Editing`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``792``—``798`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean( target?.closest?.( 'input,textarea,select,[contenteditable="true"],.cm-editor,[role="combobox"],[role="textbox"]', ), )``。

   **主要协作调用**：``Boolean``、``target?.closest``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25888:28135:FUNCTION

.. js:function:: connectWorkflow(graph, connection, definitions, context)

   建立连接与 ``Workflow`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``800``—``864`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``connection``
      调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context`` （默认值 ``[]``）
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph``、``{ ...graph, nodes: graph.nodes.map((node) => node.id === target.id ? { ...node, inputs } : node, ), edges: [ ...edges, { id: \x60edge-${edgeIndex}\x60, source: source.id, sourcePort, ta…``。

   **显式抛出**：``new Error("请选择不同节点的输入和输出端口。")``、``new Error("节点端口不存在，请重新加载节点定义。")``、``new Error( \x60端口类型不兼容：${output.display?.subtitle || ""} → ${input.display?.subtitle || ""}\x60, )``、``new Error("目前工作流不支持循环连接。")``。

   **主要协作调用**：``graph.nodes.find``、``effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find``、``effectiveWorkflowDefinition``、``catalogNode``、``effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find``、``workflowPortsCompatible``、``reachable.has``、``reachable.add``、``graph.edges.filter``、``edges.some``、``edges.map``、``ids.has``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28135:28583:FUNCTION

.. js:function:: bindWorkflowInput(graph, nodeId, port, binding)

   实现 ``bindWorkflowInput`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``866``—``880`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   ``port``
      调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...graph, edges: graph.edges.filter( (edge) => !(edge.target === nodeId && edge.targetPort === port), ), nodes: graph.nodes.map((node) => { if (node.id !== nodeId) return node;…``。

   **主要协作调用**：``graph.edges.filter``、``graph.nodes.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28583:28985:FUNCTION

.. js:function:: removeWorkflowNodes(graph, ids)

   移除与 ``Workflow Nodes`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``882``—``892`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``pruneDeletedWorkflowRegions(graph, { ...graph, nodes: graph.nodes.filter((node) => !removed.has(node.id)), outputNodes: (graph.outputNodes || []).filter((id) => !removed.has(id)),…``。

   **主要协作调用**：``pruneDeletedWorkflowRegions``、``graph.nodes.filter``、``(graph.outputNodes || []).filter``、``graph.edges.filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28985:32176:FUNCTION

.. js:function:: catalogNode(definitions, node, graph, visited, context)

   实现 ``catalogNode`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``894``—``999`` 行。

   **参数**

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``visited`` （默认值 ``new Set()``）
      调用方传入的 ``visited`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context`` （默认值 ``[]``）
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``workflowSubgraphDefinition( node, definitions, context.length, graph, context, visited, )``、``definition``、``{ ...definition, baseDefinition: definition.baseDefinition || definition, outputs: (definition.outputs || []).map((output) => ({ ...output, type: port.type, typeDescriptor: port.t…``。

   **主要协作调用**：``[...context.map((entry) => entry.container.id), node?.id].join``、``context.map``、``workflowSubgraphDefinition``、``definitions.find``、``["condition", "branch_merge"].includes``、``visited.has``、``visited.add``、``resolveEdges``、``ports.map``、``(definition.outputs || []).map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32176:32549:FUNCTION

.. js:function:: workflowGraphAtPath(graph, path)

   Subgraphs are scoped graphs. Editor navigation never replaces the root draft.

   **性质**：同步函数；导出 API；源码第 ``1002``—``1011`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``graph``。

   **主要协作调用**：``graph?.nodes?.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32549:32976:FUNCTION

.. js:function:: workflowGraphContext(graph, path)

   Context permits typed passthrough inference across explicit subgraph ports.

   **性质**：同步函数；导出 API；源码第 ``1014``—``1025`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``context``。

   **主要协作调用**：``graph?.nodes.find``、``context.push``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32976:35190:FUNCTION

.. js:function:: updateWorkflowGraphAtPath(graph, path, update, boundary)

   更新与 ``Workflow Graph At Path`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1027``—``1087`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``update``
      调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``boundary``
      调用方传入的 ``boundary`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof update === "function" ? update(graph) : update``、``{ ...graph, version: 3, nodes: graph.nodes.map((node) => node.id !== id || !node.subgraph?.graph ? node : { ...node, subgraph: { ...node.subgraph, graph: updateWorkflowGraphAtPath…``。

   **主要协作调用**：``update``、``graph.nodes.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:35190:38318:FUNCTION

.. js:function:: workflowSubgraphDefinition(node, definitions, depth, parentGraph, context, visited)

   Public port contracts always come from the actual internal endpoint.

   **性质**：同步函数；导出 API；源码第 ``1090``—``1186`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``depth`` （默认值 ``0``）
      调用方传入的 ``depth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``parentGraph``
      调用方传入的 ``parentGraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context`` （默认值 ``[]``）
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``visited`` （默认值 ``new Set()``）
      调用方传入的 ``visited`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ kind: "subgraph", baseDefinition: SUBGRAPH_CANVAS_DEFINITION, version: 1, category: "control", presentation: { icon: "workflow" }, display: { title: node.name || "子图", subtitle:…``。

   **主要协作调用**：``(subgraph.interface?.inputs || []) .map((entry) => endpointPort(entry, "inputs")) .filter``、``(subgraph.interface?.inputs || []) .map``、``(subgraph.interface?.outputs || []) .map((entry) => endpointPort(entry, "outputs")) .filter``、``(subgraph.interface?.outputs || []) .map``、``graph.nodes.find``、``catalogNode``、``resolveWorkflowSchema``、``Object.fromEntries``、``inputs.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38318:38411:FUNCTION

.. js:function:: workflowUniqueId(used)

   实现 ``workflowUniqueId`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``1188``—``1192`` 行。

   **参数**

   ``used``
      调用方传入的 ``used`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``id``。

   **主要协作调用**：``workflowId``、``used.add``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38411:43003:FUNCTION

.. js:function:: wrapWorkflowSubgraph(graph, ids, definitions, name, parentInterface)

   Boundary rewiring, positions and interface creation form one undoable edit.

   **性质**：同步函数；导出 API；源码第 ``1195``—``1332`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions``
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``name`` （默认值 ``"知识处理子图"``）
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``parentInterface`` （默认值 ``{}``）
      调用方传入的 ``parentInterface`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ graph: { ...graph, version: 3, nodes: [...graph.nodes.filter((item) => !selected.has(item.id)), node], executionRegions: (graph.executionRegions || []).filter( (region) => !move…``。

   **显式抛出**：``new Error("请先选择需要组合的节点。")``。

   **主要协作调用**：``graph.nodes.filter``、``workflowLeafIds``、``(graph.executionRegions || []).filter``、``workflowUniqueId``、``graph.nodes.map``、``Math.min``、``children.map``、``graph.edges.filter``、``graph.edges .filter((edge) => !internalEdges.includes(edge)) .map``、``graph.edges .filter``、``normalizeGraph``、``clone(children).map``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43003:47157:FUNCTION

.. js:function:: unwrapWorkflowSubgraph(graph, id)

   Removing a group restores public literal bindings and parameter overrides.

   **性质**：同步函数；导出 API；源码第 ``1335``—``1461`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ graph: { ...graph, version: 3, nodes: [...graph.nodes.filter((node) => node.id !== id), ...children], executionRegions: [ ...(graph.executionRegions || []), ...(inner.executionR…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **显式抛出**：``new Error("请选择一个子图。")``、``new Error("子图输出端口失效，请先修复公开端口。")``、``new Error("子图输入端口失效，请先修复公开端口。")``。

   **主要协作调用**：``graph.nodes.find``、``graph.nodes.filter((node) => node.id !== id).map``、``graph.nodes.filter``、``inner.nodes.map``、``clone(inner.nodes).map``、``clone``、``children.find``、``Object.hasOwn``、``contract.outputs?.find``、``mapping.has``、``mapping.get``、``contract.inputs?.find``。

   **内部回调数量**：15。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47157:49718:FUNCTION

.. js:function:: workflowRuntimeForGraph(graph, runtime, path, paths)

   Runtime leaves retain slash paths; collapsed groups aggregate all descendants.

   **性质**：同步函数；导出 API；源码第 ``1464``—``1545`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``runtime`` （默认值 ``{}``）
      调用方传入的 ``runtime`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``paths`` （默认值 ``{}``）
      调用方传入的 ``paths`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``local``。

   **主要协作调用**：``Object.entries(runtime).map``、``Object.entries``、``nodePath.join``、``entries.find``、``entries.filter``、``Math.max``、``leafCount``、``count``、``descendants .find((state) => state.namePath) ?.namePath.slice``、``descendants .find``、``descendants .map((state) => state.startedAt) .filter(Boolean) .sort``、``descendants .map((state) => state.startedAt) .filter``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49718:49976:FUNCTION

.. js:function:: isWorkflowEditorMessage(event, frameWindow, origin)

   判断与 ``Workflow Editor Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1547``—``1555`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``frameWindow``
      调用方传入的 ``frameWindow`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``origin``
      调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( event.origin === origin && event.source === frameWindow && event.data && typeof event.data === "object" && event.data.type === "cwm.workflow-editor" )``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:544:819:FUNCTION

.. rubric:: ``(graph?.nodes || []).some callback @ 13``

.. code-block:: javascript

   (graph?.nodes || []).some callback @ 13(node)

作为 ``(graph?.nodes || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``19`` 行；所属函数 ``workflowUsesKnowledge``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowUsesKnowledge``、``( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some``、``definitions.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:685:730:FUNCTION

.. rubric:: ``definitions.find callback @ 17``

.. code-block:: javascript

   definitions.find callback @ 17(definition)

作为 ``definitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``(graph?.nodes || []).some callback @ 13``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:775:818:FUNCTION

.. rubric:: ``( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some callback @ 19``

.. code-block:: javascript

   ( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some callback @ 19(effect)

作为 ``( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``(graph?.nodes || []).some callback @ 13``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``effect.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1422:1494:FUNCTION

.. rubric:: ``Object.entries(value).map callback @ 41``

.. code-block:: javascript

   Object.entries(value).map callback @ 41([key, item])

作为 ``Object.entries(value).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``normalizeWorkflowSchema``。

**参数**

``[key, item]``
   调用方传入的 ``key, item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeWorkflowSchema``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1936:2014:FUNCTION

.. rubric:: ``(anyOf || oneOf || []).find callback @ 62``

.. code-block:: javascript

   (anyOf || oneOf || []).find callback @ 62(item)

作为 ``(anyOf || oneOf || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``scalarSchema``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2283:2374:FUNCTION

.. rubric:: ``schema.$ref .slice(2) .split("/") .reduce callback @ 73``

.. code-block:: javascript

   schema.$ref .slice(2) .split("/") .reduce callback @ 73(value, token)

作为 ``schema.$ref .slice(2) .split("/") .reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``74`` 行；所属函数 ``resolveWorkflowSchema``。

**参数**

``value``
   待读取、转换或校验的值。

``token``
   调用方传入的 ``token`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``token.replaceAll("~1", "/").replaceAll``、``token.replaceAll``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2821:2873:FUNCTION

.. rubric:: ``Object.entries(schema.properties || {}) .filter callback @ 88``

.. code-block:: javascript

   Object.entries(schema.properties || {}) .filter callback @ 88([, property])

作为 ``Object.entries(schema.properties || {}) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``schemaDefaults``。

**参数**

``[, property]``
   调用方传入的 ``, property`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2888:2940:FUNCTION

.. rubric:: ``Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map callback @ 89``

.. code-block:: javascript

   Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map callback @ 89([key, property])

作为 ``Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``schemaDefaults``。

**参数**

``[key, property]``
   调用方传入的 ``key, property`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``schemaDefaults``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:3889:3998:FUNCTION

.. rubric:: ``moved .filter callback @ 124``

.. code-block:: javascript

   moved .filter callback @ 124(node)

作为 ``moved .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``126`` 行；所属函数 ``updateWorkflowNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4019:4053:FUNCTION

.. rubric:: ``moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 128``

.. code-block:: javascript

   moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 128(node)

作为 ``moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``updateWorkflowNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4116:4392:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 131``

.. code-block:: javascript

   graph.nodes.map callback @ 131(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``131``—``140`` 行；所属函数 ``updateWorkflowNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``{ ...node, position: { x: position.x, y: position.y } }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4596:4637:FUNCTION

.. rubric:: ``next.nodes.some callback @ 146``

.. code-block:: javascript

   next.nodes.some callback @ 146(node)

作为 ``next.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``initializeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4718:4850:FUNCTION

.. rubric:: ``next.nodes.some callback @ 150``

.. code-block:: javascript

   next.nodes.some callback @ 150(node)

作为 ``next.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``152`` 行；所属函数 ``initializeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["interface_inputs", "interface_outputs"].includes``、``node.id?.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4978:5347:FUNCTION

.. rubric:: ``next.nodes.map callback @ 158``

.. code-block:: javascript

   next.nodes.map callback @ 158(node)

作为 ``next.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``172`` 行；所属函数 ``initializeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``initializeGraph``、``schemaDefaults``、``catalogNode``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5630:5795:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(current)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``184``—``189`` 行；所属函数 ``workflowNodeNumbers``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visit``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6001:6258:FUNCTION

.. rubric:: ``build``

.. code-block:: javascript

   build(items, path, depth)

构造与 ``build`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``196``—``204`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``path`` （默认值 ``[]``）
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``depth`` （默认值 ``0``）
   调用方传入的 ``depth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6079:6257:FUNCTION

.. rubric:: ``items.map callback @ 199``

.. code-block:: javascript

   items.map callback @ 199(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``199``—``204`` 行；所属函数 ``build``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``build``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6362:6384:FUNCTION

.. rubric:: ``definitions.filter callback @ 207``

.. code-block:: javascript

   definitions.filter callback @ 207(node)

作为 ``definitions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6507:6531:FUNCTION

.. rubric:: ``children.find callback @ 211``

.. code-block:: javascript

   children.find callback @ 211(item)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6913:7069:FUNCTION

.. rubric:: ``prune``

.. code-block:: javascript

   prune(items)

实现 ``prune`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``231`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items .map((item) => ({ ...item, children: prune(item.children) })) .filter``、``items .map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6946:7001:FUNCTION

.. rubric:: ``items .map callback @ 230``

.. code-block:: javascript

   items .map callback @ 230(item)

作为 ``items .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``230``—``230`` 行；所属函数 ``prune``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prune``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7017:7068:FUNCTION

.. rubric:: ``items .map((item) => ({ ...item, children: prune(item.children) })) .filter callback @ 231``

.. code-block:: javascript

   items .map((item) => ({ ...item, children: prune(item.children) })) .filter callback @ 231(item)

作为 ``items .map((item) => ({ ...item, children: prune(item.children) })) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``prune``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7730:7774:FUNCTION

.. rubric:: ``(definition.inputs || []).filter callback @ 250``

.. code-block:: javascript

   (definition.inputs || []).filter callback @ 250(port)

作为 ``(definition.inputs || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``250``—``250`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``port.name.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7890:7933:FUNCTION

.. rubric:: ``Object.entries(definition.inputSchema?.properties || {}).filter callback @ 254``

.. code-block:: javascript

   Object.entries(definition.inputSchema?.properties || {}).filter callback @ 254([name])

作为 ``Object.entries(definition.inputSchema?.properties || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8014:8053:FUNCTION

.. rubric:: ``(definition.inputSchema?.required || []).filter callback @ 258``

.. code-block:: javascript

   (definition.inputSchema?.required || []).filter callback @ 258(name)

作为 ``(definition.inputSchema?.required || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8110:9029:FUNCTION

.. rubric:: ``workflowRepeatedItems(node, definition).forEach callback @ 260``

.. code-block:: javascript

   workflowRepeatedItems(node, definition).forEach callback @ 260(item, index)

作为 ``workflowRepeatedItems(node, definition).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``288`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``repeated.kinds?.find``、``/^[A-Za-z0-9_-]{1,48}$/.test``、``item.title?.trim``、``Object.fromEntries``、``Object.entries(template.display || {}).map``、``Object.entries``、``inputs.push``、``required.push``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8167:8202:FUNCTION

.. rubric:: ``repeated.kinds?.find callback @ 261``

.. code-block:: javascript

   repeated.kinds?.find callback @ 261(entry)

作为 ``repeated.kinds?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``workflowRepeatedItems(node, definition).forEach callback @ 260``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8507:8667:FUNCTION

.. rubric:: ``Object.entries(template.display || {}).map callback @ 267``

.. code-block:: javascript

   Object.entries(template.display || {}).map callback @ 267([key, value])

作为 ``Object.entries(template.display || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``267``—``272`` 行；所属函数 ``workflowRepeatedItems(node, definition).forEach callback @ 260``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.replaceAll``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:9452:9480:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 300``

.. code-block:: javascript

   graph.nodes.find callback @ 300(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``300``—``300`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:9892:9925:FUNCTION

.. rubric:: ``repeated.kinds?.some callback @ 310``

.. code-block:: javascript

   repeated.kinds?.some callback @ 310(kind)

作为 ``repeated.kinds?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``310``—``310`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10113:10143:FUNCTION

.. rubric:: ``workflowRepeatedItems(node, definition).map callback @ 316``

.. code-block:: javascript

   workflowRepeatedItems(node, definition).map callback @ 316(item)

作为 ``workflowRepeatedItems(node, definition).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``316``—``316`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10203:10248:FUNCTION

.. rubric:: ``items .filter callback @ 320``

.. code-block:: javascript

   items .filter callback @ 320(item)

作为 ``items .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``previous.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10261:10292:FUNCTION

.. rubric:: ``items .filter((item) => previous.get(item.id) === item.kind) .map callback @ 321``

.. code-block:: javascript

   items .filter((item) => previous.get(item.id) === item.kind) .map callback @ 321(item)

作为 ``items .filter((item) => previous.get(item.id) === item.kind) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``321``—``321`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10382:10447:FUNCTION

.. rubric:: ``Object.entries(node.inputs || {}).filter callback @ 325``

.. code-block:: javascript

   Object.entries(node.inputs || {}).filter callback @ 325([name])

作为 ``Object.entries(node.inputs || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``、``retained.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10693:10890:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 335``

.. code-block:: javascript

   graph.nodes.map callback @ 335(entry)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``335``—``342`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clone``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10929:11064:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 345``

.. code-block:: javascript

   graph.edges.filter callback @ 345(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``345``—``348`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``edge.targetPort.startsWith``、``retained.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11165:11182:FUNCTION

.. rubric:: ``items.map callback @ 354``

.. code-block:: javascript

   items.map callback @ 354(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``354``—``354`` 行；所属函数 ``nextWorkflowRepeatedItemId``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11590:11647:FUNCTION

.. rubric:: ``graph.nodes .filter callback @ 370``

.. code-block:: javascript

   graph.nodes .filter callback @ 370(node)

作为 ``graph.nodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``370`` 行；所属函数 ``workflowInputFields``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``catalogNode``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11658:12099:FUNCTION

.. rubric:: ``graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map callback @ 371``

.. code-block:: javascript

   graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map callback @ 371(node)

作为 ``graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``383`` 行；所属函数 ``workflowInputFields``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ key: node.id, nodeId: node.id, title: node.name || definition?.display?.title, required: definition.source.required !== false && !(node.kind === "attachments" && node.config?.op…``。

**主要协作调用**：``catalogNode``、``sourceNodeValue``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:12142:12205:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 385``

.. code-block:: javascript

   graph.nodes.filter callback @ 385(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``385``—``385`` 行；所属函数 ``workflowInputFields``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:12955:13003:FUNCTION

.. rubric:: ``childGraph.nodes.find callback @ 399``

.. code-block:: javascript

   childGraph.nodes.find callback @ 399(entry)

作为 ``childGraph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``399``—``399`` 行；所属函数 ``workflowInputFields``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:14410:14483:FUNCTION

.. rubric:: ``(schema.required || []).some callback @ 444``

.. code-block:: javascript

   (schema.required || []).some callback @ 444(key)

作为 ``(schema.required || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``444``—``445`` 行；所属函数 ``workflowValueMissing``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowValueMissing``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:15749:15788:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 494``

.. code-block:: javascript

   graph.nodes.find callback @ 494(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``494``—``494`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16056:16099:FUNCTION

.. rubric:: ``definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find callback @ 503``

.. code-block:: javascript

   definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find callback @ 503(port)

作为 ``definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``503``—``503`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16216:16250:FUNCTION

.. rubric:: ``definitions .filter callback @ 508``

.. code-block:: javascript

   definitions .filter callback @ 508(definition)

作为 ``definitions .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``508``—``508`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16265:17040:FUNCTION

.. rubric:: ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 509``

.. code-block:: javascript

   definitions .filter((definition) => !definition.hidden) .flatMap callback @ 509(definition)

实现 ``definitions .filter((definition) => !definition.hidden) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``509``—``532`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .toLocaleLowerCase() .includes(term), ), ) .map((port) => ({…``。

**主要协作调用**：``effectiveWorkflowDefinition``、``( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter``、``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .…``、``ports .filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16527:16691:FUNCTION

.. rubric:: ``( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter callback @ 516``

.. code-block:: javascript

   ( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter callback @ 516(port)

作为 ``( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``516``—``519`` 行；所属函数 ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 509``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowPortsCompatible``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16758:16975:FUNCTION

.. rubric:: ``ports .filter callback @ 523``

.. code-block:: javascript

   ports .filter callback @ 523(port)

作为 ``ports .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``523``—``529`` 行；所属函数 ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 509``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[definition.display, port?.display].some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16819:16962:FUNCTION

.. rubric:: ``[definition.display, port?.display].some callback @ 524``

.. code-block:: javascript

   [definition.display, port?.display].some callback @ 524(display)

作为 ``[definition.display, port?.display].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``524``—``528`` 行；所属函数 ``ports .filter callback @ 523``。

**参数**

``display``
   调用方传入的 ``display`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.values(display || {}) .join(" ") .toLocaleLowerCase() .includes``、``Object.values(display || {}) .join(" ") .toLocaleLowerCase``、``Object.values(display || {}) .join``、``Object.values``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:17000:17032:FUNCTION

.. rubric:: ``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .… callback @ 531``

.. code-block:: javascript

   ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .… callback @ 531(port)

实现 ``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``531``—``531`` 行；所属函数 ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 509``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18488:18519:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 580``

.. code-block:: javascript

   graph.nodes.filter callback @ 580(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``580``—``580`` 行；所属函数 ``copyWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18710:18781:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 588``

.. code-block:: javascript

   graph.edges.filter callback @ 588(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``588``—``588`` 行；所属函数 ``copyWorkflowSelection``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18840:18866:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 590``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 590(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``590``—``590`` 行；所属函数 ``copyWorkflowSelection``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18948:19051:FUNCTION

.. rubric:: ``graph.nodes.flatMap callback @ 595``

.. code-block:: javascript

   graph.nodes.flatMap callback @ 595(node)

实现 ``graph.nodes.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``595``—``598`` 行；所属函数 ``workflowNodeIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowNodeIds``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:19295:21624:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(current)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``606``—``666`` 行；所属函数 ``instantiateWorkflowGraph``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ids, ports }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``current.nodes.map``、``allIds.set``、``ids.get``、``visit``、``workflowId``、``ports.set``、``child.ports.get``、``child.ids.get``、``Object.fromEntries``、``Object.entries(node.inputs || {}).map``、``Object.entries``、``Object.entries(node.config || {}).map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:19353:19386:FUNCTION

.. rubric:: ``current.nodes.map callback @ 607``

.. code-block:: javascript

   current.nodes.map callback @ 607(node)

作为 ``current.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``607``—``607`` 行；所属函数 ``visit``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowId``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:20633:20733:FUNCTION

.. rubric:: ``Object.entries(node.inputs || {}).map callback @ 636``

.. code-block:: javascript

   Object.entries(node.inputs || {}).map callback @ 636([key, value])

作为 ``Object.entries(node.inputs || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``636``—``639`` 行；所属函数 ``visit``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ports.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:20831:20935:FUNCTION

.. rubric:: ``Object.entries(node.config || {}).map callback @ 642``

.. code-block:: javascript

   Object.entries(node.config || {}).map callback @ 642([key, value])

作为 ``Object.entries(node.config || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``642``—``645`` 行；所属函数 ``visit``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ports.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21091:21118:FUNCTION

.. rubric:: ``node.subgraph.execution.branchOrder.map callback @ 649``

.. code-block:: javascript

   node.subgraph.execution.branchOrder.map callback @ 649(key)

作为 ``node.subgraph.execution.branchOrder.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``649``—``649`` 行；所属函数 ``visit``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``child.ids.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21558:21585:FUNCTION

.. rubric:: ``(current.outputNodes || []).map callback @ 662``

.. code-block:: javascript

   (current.outputNodes || []).map callback @ 662(key)

作为 ``(current.outputNodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``662``—``663`` 行；所属函数 ``visit``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ids.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21664:21952:FUNCTION

.. rubric:: ``remapRegions``

.. code-block:: javascript

   remapRegions(current)

实现 ``remapRegions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``668``—``675`` 行；所属函数 ``instantiateWorkflowGraph``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``workflowId``、``region.nodeIds.map``、``remapRegions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21813:21835:FUNCTION

.. rubric:: ``region.nodeIds.map callback @ 671``

.. code-block:: javascript

   region.nodeIds.map callback @ 671(id)

作为 ``region.nodeIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``671``—``671`` 行；所属函数 ``remapRegions``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``allIds.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:22283:22314:FUNCTION

.. rubric:: ``copied.nodes.map callback @ 686``

.. code-block:: javascript

   copied.nodes.map callback @ 686(node)

作为 ``copied.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``686``—``686`` 行；所属函数 ``pasteWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:22362:22393:FUNCTION

.. rubric:: ``copied.nodes.map callback @ 687``

.. code-block:: javascript

   copied.nodes.map callback @ 687(node)

作为 ``copied.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``687``—``687`` 行；所属函数 ``pasteWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23003:23020:FUNCTION

.. rubric:: ``copied.nodes.map callback @ 706``

.. code-block:: javascript

   copied.nodes.map callback @ 706(node)

作为 ``copied.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``706``—``706`` 行；所属函数 ``pasteWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23378:23395:FUNCTION

.. rubric:: ``source.nodes.map callback @ 717``

.. code-block:: javascript

   source.nodes.map callback @ 717(node)

作为 ``source.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``workflowSubgraphTemplateNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23662:23728:FUNCTION

.. rubric:: ``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback @ 725``

.. code-block:: javascript

   projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback @ 725(region)

作为 ``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``725``—``725`` 行；所属函数 ``workflowSubgraphTemplateNode``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``existing.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23696:23727:FUNCTION

.. rubric:: ``existing.some callback @ 725``

.. code-block:: javascript

   existing.some callback @ 725(item)

作为 ``existing.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``725``—``725`` 行；所属函数 ``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback @ 725``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23966:23994:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 733``

.. code-block:: javascript

   graph.nodes.find callback @ 733(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``733``—``733`` 行；所属函数 ``initializeWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:24572:24600:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 748``

.. code-block:: javascript

   graph.nodes.filter callback @ 748(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``748``—``748`` 行；所属函数 ``initializeWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25218:25276:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 770``

.. code-block:: javascript

   graph.nodes.map callback @ 770(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``770``—``771`` 行；所属函数 ``initializeWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25403:25431:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 777``

.. code-block:: javascript

   graph.nodes.find callback @ 777(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``777``—``777`` 行；所属函数 ``setWorkflowPortMode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26004:26043:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 801``

.. code-block:: javascript

   graph.nodes.find callback @ 801(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``801``—``801`` 行；所属函数 ``connectWorkflow``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26080:26119:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 802``

.. code-block:: javascript

   graph.nodes.find callback @ 802(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``802``—``802`` 行；所属函数 ``connectWorkflow``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26500:26534:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find callback @ 810``

.. code-block:: javascript

   effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find callback @ 810(port)

作为 ``effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``810``—``810`` 行；所属函数 ``connectWorkflow``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26677:26711:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find callback @ 814``

.. code-block:: javascript

   effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find callback @ 814(port)

作为 ``effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``814``—``814`` 行；所属函数 ``connectWorkflow``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27300:27391:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 830``

.. code-block:: javascript

   graph.edges.filter callback @ 830(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``830``—``831`` 行；所属函数 ``connectWorkflow``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27424:27595:FUNCTION

.. rubric:: ``edges.some callback @ 835``

.. code-block:: javascript

   edges.some callback @ 835(edge)

作为 ``edges.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``835``—``839`` 行；所属函数 ``connectWorkflow``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27746:27763:FUNCTION

.. rubric:: ``edges.map callback @ 846``

.. code-block:: javascript

   edges.map callback @ 846(edge)

作为 ``edges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``846``—``846`` 行；所属函数 ``connectWorkflow``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27874:27940:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 850``

.. code-block:: javascript

   graph.nodes.map callback @ 850(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``850``—``851`` 行；所属函数 ``connectWorkflow``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28258:28328:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 870``

.. code-block:: javascript

   graph.edges.filter callback @ 870(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``870``—``870`` 行；所属函数 ``bindWorkflowInput``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28364:28574:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 872``

.. code-block:: javascript

   graph.nodes.map callback @ 872(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``872``—``878`` 行；所属函数 ``bindWorkflowInput``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``{ ...node, inputs }``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28757:28788:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 886``

.. code-block:: javascript

   graph.nodes.filter callback @ 886(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``886``—``886`` 行；所属函数 ``removeWorkflowNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28841:28865:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 887``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 887(id)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``887``—``887`` 行；所属函数 ``removeWorkflowNodes``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28898:28969:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 889``

.. code-block:: javascript

   graph.edges.filter callback @ 889(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``889``—``889`` 行；所属函数 ``removeWorkflowNodes``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29123:29152:FUNCTION

.. rubric:: ``context.map callback @ 901``

.. code-block:: javascript

   context.map callback @ 901(entry)

作为 ``context.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``901``—``901`` 行；所属函数 ``catalogNode``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29402:29525:FUNCTION

.. rubric:: ``definitions.find callback @ 915``

.. code-block:: javascript

   definitions.find callback @ 915(definition)

作为 ``definitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``915``—``917`` 行；所属函数 ``catalogNode``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29553:29598:FUNCTION

.. rubric:: ``definitions.find callback @ 918``

.. code-block:: javascript

   definitions.find callback @ 918(definition)

作为 ``definitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``918``—``918`` 行；所属函数 ``catalogNode``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29775:31504:FUNCTION

.. rubric:: ``resolveEdges``

.. code-block:: javascript

   resolveEdges(sourceGraph, targetId, targetPort, ancestors)

解析并确定与 ``Edges`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``926``—``978`` 行；所属函数 ``catalogNode``。

**参数**

``sourceGraph``
   调用方传入的 ``sourceGraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetId``
   目标对象的公共或运行时标识。

``targetPort``
   调用方传入的 ``targetPort`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ancestors``
   调用方传入的 ``ancestors`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``found``。

**主要协作调用**：``sourceGraph?.nodes.find``、``Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map``、``Object.entries(boundNode?.inputs || {}) .filter``、``Object.entries``、``found.push``、``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target…``、``(sourceGraph?.edges || []) .filter``、``ancestors.at``、``resolveEdges``、``ancestors.slice``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30027:30059:FUNCTION

.. rubric:: ``sourceGraph?.nodes.find callback @ 929``

.. code-block:: javascript

   sourceGraph?.nodes.find callback @ 929(entry)

作为 ``sourceGraph?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``929``—``929`` 行；所属函数 ``resolveEdges``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30134:30180:FUNCTION

.. rubric:: ``Object.entries(boundNode?.inputs || {}) .filter callback @ 931``

.. code-block:: javascript

   Object.entries(boundNode?.inputs || {}) .filter callback @ 931([name])

作为 ``Object.entries(boundNode?.inputs || {}) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``931``—``931`` 行；所属函数 ``resolveEdges``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30193:30216:FUNCTION

.. rubric:: ``Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map callback @ 932``

.. code-block:: javascript

   Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map callback @ 932()

作为 ``Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``932``—``932`` 行；所属函数 ``resolveEdges``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30287:30410:FUNCTION

.. rubric:: ``(sourceGraph?.edges || []) .filter callback @ 936``

.. code-block:: javascript

   (sourceGraph?.edges || []) .filter callback @ 936(entry)

作为 ``(sourceGraph?.edges || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``936``—``938`` 行；所属函数 ``resolveEdges``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30435:30951:FUNCTION

.. rubric:: ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 940``

.. code-block:: javascript

   (sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 940(edge)

实现 ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``940``—``957`` 行；所属函数 ``resolveEdges``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( upstream && effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ), )?.outputs?.find((entry) => entry.name === ed…``。

**主要协作调用**：``sourceGraph.nodes.find``、``effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),…``、``effectiveWorkflowDefinition``、``catalogNode``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30497:30545:FUNCTION

.. rubric:: ``sourceGraph.nodes.find callback @ 942``

.. code-block:: javascript

   sourceGraph.nodes.find callback @ 942(entry)

作为 ``sourceGraph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``942``—``942`` 行；所属函数 ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 940``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30886:30927:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),… callback @ 955``

.. code-block:: javascript

   effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),… callback @ 955(entry)

实现 ``effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``955``—``955`` 行；所属函数 ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 940``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:31620:31639:FUNCTION

.. rubric:: ``ports.map callback @ 981``

.. code-block:: javascript

   ports.map callback @ 981(item)

作为 ``ports.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``981``—``981`` 行；所属函数 ``catalogNode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:31866:32167:FUNCTION

.. rubric:: ``(definition.outputs || []).map callback @ 988``

.. code-block:: javascript

   (definition.outputs || []).map callback @ 988(output)

作为 ``(definition.outputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``988``—``997`` 行；所属函数 ``catalogNode``。

**参数**

``output``
   调用方传入的 ``output`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32382:32441:FUNCTION

.. rubric:: ``graph?.nodes?.find callback @ 1005``

.. code-block:: javascript

   graph?.nodes?.find callback @ 1005(item)

作为 ``graph?.nodes?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1005``—``1005`` 行；所属函数 ``workflowGraphAtPath``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32780:32839:FUNCTION

.. rubric:: ``graph?.nodes.find callback @ 1018``

.. code-block:: javascript

   graph?.nodes.find callback @ 1018(node)

作为 ``graph?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1018``—``1018`` 行；所属函数 ``workflowGraphContext``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:33242:35175:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 1034``

.. code-block:: javascript

   graph.nodes.map callback @ 1034(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1034``—``1084`` 行；所属函数 ``updateWorkflowGraphAtPath``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWorkflowGraphAtPath``、``Object.fromEntries``、``["inputs", "outputs"].map``、``( node.subgraph.interface?.parameters || [] ).map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:33827:34545:FUNCTION

.. rubric:: ``["inputs", "outputs"].map callback @ 1052``

.. code-block:: javascript

   ["inputs", "outputs"].map callback @ 1052(direction)

作为 ``["inputs", "outputs"].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1052``—``1067`` 行；所属函数 ``graph.nodes.map callback @ 1034``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[ direction, (node.subgraph.interface?.[direction] || []).map( (entry) => ({ ...entry, [key]: boundary[direction]?.[ \x60${entry[key]?.nodeId}\u0000${entry[key]?.port}\x60 ] || entry[ke…``。

**主要协作调用**：``(node.subgraph.interface?.[direction] || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:34107:34458:FUNCTION

.. rubric:: ``(node.subgraph.interface?.[direction] || []).map callback @ 1058``

.. code-block:: javascript

   (node.subgraph.interface?.[direction] || []).map callback @ 1058(entry)

作为 ``(node.subgraph.interface?.[direction] || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1058``—``1064`` 行；所属函数 ``["inputs", "outputs"].map callback @ 1052``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:34703:35080:FUNCTION

.. rubric:: ``( node.subgraph.interface?.parameters || [] ).map callback @ 1071``

.. code-block:: javascript

   ( node.subgraph.interface?.parameters || [] ).map callback @ 1071(parameter)

作为 ``( node.subgraph.interface?.parameters || [] ).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1071``—``1079`` 行；所属函数 ``graph.nodes.map callback @ 1034``。

**参数**

``parameter``
   调用方传入的 ``parameter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(parameter.targets || []).flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:34826:35027:FUNCTION

.. rubric:: ``(parameter.targets || []).flatMap callback @ 1074``

.. code-block:: javascript

   (parameter.targets || []).flatMap callback @ 1074(target)

实现 ``(parameter.targets || []).flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1074``—``1077`` 行；所属函数 ``( node.subgraph.interface?.parameters || [] ).map callback @ 1071``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:35528:36800:FUNCTION

.. rubric:: ``endpointPort``

.. code-block:: javascript

   endpointPort(entry, direction)

实现 ``endpointPort`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1100``—``1139`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ name: entry.id, type: "any", schema: {}, display: { title: entry.title || entry.name, subtitle: \x60${entry.name} · 待连接\x60, description: entry.description || "进入子图连接内部端口后自动确定类型。", },…``、``null``、``{ ...port, name: entry.id, inlineAllowed: direction === "inputs" ? port.inlineAllowed === true : false, display: { ...port.display, title: entry.title || port.display?.title || en…``。

**主要协作调用**：``graph.nodes.find``、``effectiveWorkflowDefinition``、``catalogNode``、``definition?.[direction]?.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:35969:36007:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 1114``

.. code-block:: javascript

   graph.nodes.find callback @ 1114(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1114``—``1114`` 行；所属函数 ``endpointPort``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:36324:36368:FUNCTION

.. rubric:: ``definition?.[direction]?.find callback @ 1124``

.. code-block:: javascript

   definition?.[direction]?.find callback @ 1124(item)

作为 ``definition?.[direction]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1124``—``1124`` 行；所属函数 ``endpointPort``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:36863:36903:FUNCTION

.. rubric:: ``(subgraph.interface?.inputs || []) .map callback @ 1141``

.. code-block:: javascript

   (subgraph.interface?.inputs || []) .map callback @ 1141(entry)

作为 ``(subgraph.interface?.inputs || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1141``—``1141`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``endpointPort``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:36990:37031:FUNCTION

.. rubric:: ``(subgraph.interface?.outputs || []) .map callback @ 1144``

.. code-block:: javascript

   (subgraph.interface?.outputs || []) .map callback @ 1144(entry)

作为 ``(subgraph.interface?.outputs || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1144``—``1144`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``endpointPort``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:37224:37260:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 1149``

.. code-block:: javascript

   graph.nodes.find callback @ 1149(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1149``—``1149`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38203:38243:FUNCTION

.. rubric:: ``inputs.map callback @ 1181``

.. code-block:: javascript

   inputs.map callback @ 1181(port)

作为 ``inputs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1181``—``1181`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38683:38714:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1203``

.. code-block:: javascript

   graph.nodes.filter callback @ 1203(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1203``—``1203`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38907:38975:FUNCTION

.. rubric:: ``(graph.executionRegions || []).filter callback @ 1206``

.. code-block:: javascript

   (graph.executionRegions || []).filter callback @ 1206(region)

作为 ``(graph.executionRegions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1206``—``1207`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38944:38974:FUNCTION

.. rubric:: ``region.nodeIds.every callback @ 1207``

.. code-block:: javascript

   region.nodeIds.every callback @ 1207(id)

作为 ``region.nodeIds.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1207``—``1207`` 行；所属函数 ``(graph.executionRegions || []).filter callback @ 1206``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedLeaves.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39041:39058:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 1210``

.. code-block:: javascript

   graph.nodes.map callback @ 1210(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1210``—``1210`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39120:39151:FUNCTION

.. rubric:: ``children.map callback @ 1213``

.. code-block:: javascript

   children.map callback @ 1213(node)

作为 ``children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1213``—``1213`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39192:39223:FUNCTION

.. rubric:: ``children.map callback @ 1214``

.. code-block:: javascript

   children.map callback @ 1214(node)

作为 ``children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1214``—``1214`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39284:40057:FUNCTION

.. rubric:: ``boundary``

.. code-block:: javascript

   boundary(direction, nodeId, port)

实现 ``boundary`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1217``—``1238`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nodeId``
   目标对象的公共或运行时标识。

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``entry.id``。

**主要协作调用**：``list.find``、``children.find``、``effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find``、``effectiveWorkflowDefinition``、``catalogNode``、``workflowId``、``list.push``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39464:39535:FUNCTION

.. rubric:: ``list.find callback @ 1221``

.. code-block:: javascript

   list.find callback @ 1221(item)

作为 ``list.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1221``—``1221`` 行；所属函数 ``boundary``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39596:39624:FUNCTION

.. rubric:: ``children.find callback @ 1224``

.. code-block:: javascript

   children.find callback @ 1224(node)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1224``—``1224`` 行；所属函数 ``boundary``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39762:39790:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find callback @ 1228``

.. code-block:: javascript

   effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find callback @ 1228(item)

作为 ``effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1228``—``1228`` 行；所属函数 ``boundary``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40102:40171:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 1240``

.. code-block:: javascript

   graph.edges.filter callback @ 1240(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1240``—``1240`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40218:40257:FUNCTION

.. rubric:: ``graph.edges .filter callback @ 1243``

.. code-block:: javascript

   graph.edges .filter callback @ 1243(edge)

作为 ``graph.edges .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1243``—``1243`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``internalEdges.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40268:40661:FUNCTION

.. rubric:: ``graph.edges .filter((edge) => !internalEdges.includes(edge)) .map callback @ 1244``

.. code-block:: javascript

   graph.edges .filter((edge) => !internalEdges.includes(edge)) .map callback @ 1244(edge)

作为 ``graph.edges .filter((edge) => !internalEdges.includes(edge)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1244``—``1258`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...edge, target: id, targetPort: boundary("inputs", edge.target, edge.targetPort), }``、``{ ...edge, source: id, sourcePort: boundary("outputs", edge.source, edge.sourcePort), }``、``edge``。

**主要协作调用**：``selected.has``、``boundary``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40894:41073:FUNCTION

.. rubric:: ``clone(children).map callback @ 1270``

.. code-block:: javascript

   clone(children).map callback @ 1270(child)

作为 ``clone(children).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1270``—``1276`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:41160:41196:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 1278``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 1278(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1278``—``1279`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:42681:42713:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1320``

.. code-block:: javascript

   graph.nodes.filter callback @ 1320(item)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1320``—``1320`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:42785:42836:FUNCTION

.. rubric:: ``(graph.executionRegions || []).filter callback @ 1322``

.. code-block:: javascript

   (graph.executionRegions || []).filter callback @ 1322(region)

作为 ``(graph.executionRegions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1322``—``1322`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``movedRegions.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:42899:42935:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 1325``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 1325(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1325``—``1325`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43172:43196:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 1336``

.. code-block:: javascript

   graph.nodes.find callback @ 1336(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1336``—``1336`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43391:43415:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1341``

.. code-block:: javascript

   graph.nodes.filter callback @ 1341(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1341``—``1341`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43421:43438:FUNCTION

.. rubric:: ``graph.nodes.filter((node) => node.id !== id).map callback @ 1341``

.. code-block:: javascript

   graph.nodes.filter((node) => node.id !== id).map callback @ 1341(node)

作为 ``graph.nodes.filter((node) => node.id !== id).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1341``—``1341`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43493:43644:FUNCTION

.. rubric:: ``inner.nodes.map callback @ 1344``

.. code-block:: javascript

   inner.nodes.map callback @ 1344(node)

作为 ``inner.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1344``—``1349`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``used.has``、``workflowUniqueId``、``used.add``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43694:43909:FUNCTION

.. rubric:: ``clone(inner.nodes).map callback @ 1351``

.. code-block:: javascript

   clone(inner.nodes).map callback @ 1351(node)

作为 ``clone(inner.nodes).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1351``—``1358`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:44024:44085:FUNCTION

.. rubric:: ``children.find callback @ 1362``

.. code-block:: javascript

   children.find callback @ 1362(node)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1362``—``1362`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:44566:44623:FUNCTION

.. rubric:: ``children.find callback @ 1377``

.. code-block:: javascript

   children.find callback @ 1377(node)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1377``—``1377`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:44885:44931:FUNCTION

.. rubric:: ``contract.outputs?.find callback @ 1388``

.. code-block:: javascript

   contract.outputs?.find callback @ 1388(item)

作为 ``contract.outputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1388``—``1388`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:45260:45306:FUNCTION

.. rubric:: ``contract.inputs?.find callback @ 1400``

.. code-block:: javascript

   contract.inputs?.find callback @ 1400(item)

作为 ``contract.inputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1400``—``1400`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:45625:45642:FUNCTION

.. rubric:: ``edges.map callback @ 1412``

.. code-block:: javascript

   edges.map callback @ 1412(edge)

作为 ``edges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1412``—``1412`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46469:46559:FUNCTION

.. rubric:: ``( parameter.targets || [] ).map callback @ 1435``

.. code-block:: javascript

   ( parameter.targets || [] ).map callback @ 1435(target)

作为 ``( parameter.targets || [] ).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1435``—``1438`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46660:46684:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1444``

.. code-block:: javascript

   graph.nodes.filter callback @ 1444(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1444``—``1444`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46825:46938:FUNCTION

.. rubric:: ``[ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback @ 1448``

.. code-block:: javascript

   [ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback @ 1448(region)

作为 ``[ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1448``—``1451`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``region.nodeIds.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46895:46927:FUNCTION

.. rubric:: ``region.nodeIds.map callback @ 1450``

.. code-block:: javascript

   region.nodeIds.map callback @ 1450(key)

作为 ``region.nodeIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1450``—``1450`` 行；所属函数 ``[ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback @ 1448``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47006:47025:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 1453``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 1453(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1453``—``1453`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47117:47134:FUNCTION

.. rubric:: ``children.map callback @ 1458``

.. code-block:: javascript

   children.map callback @ 1458(node)

作为 ``children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1458``—``1458`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47381:47587:FUNCTION

.. rubric:: ``leafCount``

.. code-block:: javascript

   leafCount(value)

实现 ``leafCount`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1471``—``1479`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.nodes.reduce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47416:47571:FUNCTION

.. rubric:: ``value.nodes.reduce callback @ 1473``

.. code-block:: javascript

   value.nodes.reduce callback @ 1473(total, node)

作为 ``value.nodes.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1473``—``1477`` 行；所属函数 ``leafCount``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leafCount``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47635:47762:FUNCTION

.. rubric:: ``Object.entries(runtime).map callback @ 1480``

.. code-block:: javascript

   Object.entries(runtime).map callback @ 1480([id, state])

作为 ``Object.entries(runtime).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1480``—``1484`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``[id, state]``
   调用方传入的 ``id, state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``id.split``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47949:48000:FUNCTION

.. rubric:: ``entries.find callback @ 1490``

.. code-block:: javascript

   entries.find callback @ 1490(state)

作为 ``entries.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1490``—``1490`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``state.nodePath.join``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48093:48233:FUNCTION

.. rubric:: ``entries.filter callback @ 1495``

.. code-block:: javascript

   entries.filter callback @ 1495(state)

作为 ``entries.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1495``—``1497`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nodePath.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48185:48232:FUNCTION

.. rubric:: ``nodePath.every callback @ 1497``

.. code-block:: javascript

   nodePath.every callback @ 1497(part, index)

作为 ``nodePath.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1497``—``1497`` 行；所属函数 ``entries.filter callback @ 1495``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48259:48349:FUNCTION

.. rubric:: ``count``

.. code-block:: javascript

   count(statuses)

实现 ``count`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1499``—``1500`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``statuses``
   调用方传入的 ``statuses`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``descendants.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48299:48341:FUNCTION

.. rubric:: ``descendants.filter callback @ 1500``

.. code-block:: javascript

   descendants.filter callback @ 1500(value)

作为 ``descendants.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1500``—``1500`` 行；所属函数 ``count``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``statuses.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49009:49034:FUNCTION

.. rubric:: ``descendants .find callback @ 1521``

.. code-block:: javascript

   descendants .find callback @ 1521(state)

作为 ``descendants .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1521``—``1521`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49124:49150:FUNCTION

.. rubric:: ``descendants .map callback @ 1524``

.. code-block:: javascript

   descendants .map callback @ 1524(state)

作为 ``descendants .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1524``—``1524`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49339:49366:FUNCTION

.. rubric:: ``descendants .map callback @ 1530``

.. code-block:: javascript

   descendants .map callback @ 1530(state)

作为 ``descendants .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1530``—``1530`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49512:49563:FUNCTION

.. rubric:: ``descendants .filter callback @ 1537``

.. code-block:: javascript

   descendants .filter callback @ 1537(state)

作为 ``descendants .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1537``—``1537`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49578:49600:FUNCTION

.. rubric:: ``descendants .filter((state) => state.status === "failed" && state.error) .map callback @ 1538``

.. code-block:: javascript

   descendants .filter((state) => state.status === "failed" && state.error) .map callback @ 1538(state)

作为 ``descendants .filter((state) => state.status === "failed" && state.error) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1538``—``1538`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
