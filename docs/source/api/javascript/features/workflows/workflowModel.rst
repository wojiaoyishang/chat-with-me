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

``../../lib/uuid.js``、``./workflowRegions.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:268:289:FUNCTION

.. js:function:: workflowId()

   实现 ``workflowId`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``8``—``8`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``generateUUID``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:311:392:FUNCTION

.. js:function:: clone(value)

   实现 ``clone`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``9``—``10`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:393:861:FUNCTION

.. js:function:: workflowUsesKnowledge(graph, definitions)

   Knowledge policy controls follow trusted node effects, including subgraphs.

   **性质**：同步函数；导出 API；源码第 ``13``—``22`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions`` （默认值 ``[]``）
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(graph?.nodes || []).some((node) => node.kind === "subgraph" ? workflowUsesKnowledge(node.subgraph?.graph, definitions) : ( definitions.find((definition) => definition.kind === no…``。

   **主要协作调用**：``(graph?.nodes || []).some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1130:1834:FUNCTION

.. js:function:: normalizeWorkflowSchema(value)

   Catalog annotations may use Pydantic range names; forms use JSON Schema.

   **性质**：同步函数；导出 API；源码第 ``38``—``58`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value.map(normalizeWorkflowSchema)``、``value``、``schema``。

   **主要协作调用**：``Array.isArray``、``value.map``、``Object.fromEntries``、``Object.entries(value).map``、``Object.entries``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1834:2123:FUNCTION

.. js:function:: scalarSchema(schema)

   实现 ``scalarSchema`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``60``—``66`` 行。

   **参数**

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``variant ? scalarSchema({ ...base, ...variant }) : schema``。

   **主要协作调用**：``(anyOf || oneOf || []).find``、``scalarSchema``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2123:2589:FUNCTION

.. js:function:: resolveWorkflowSchema(schema, root)

   解析并确定与 ``Workflow Schema`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``68``—``82`` 行。

   **参数**

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root`` （默认值 ``schema``）
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``schema``、``{ ...target, ...rest, ...(root.$defs ? { $defs: root.$defs } : {}) }``。

   **主要协作调用**：``schema.$ref?.startsWith``、``schema.$ref .slice(2) .split("/") .reduce``、``schema.$ref .slice(2) .split``、``schema.$ref .slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2589:3009:FUNCTION

.. js:function:: schemaDefaults(schema)

   实现 ``schemaDefaults`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``84``—``94`` 行。

   **参数**

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``clone(schema.default)``、``Object.fromEntries( Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map(([key, property]) => [key, schemaDefaults(property)]…``、``undefined``。

   **主要协作调用**：``Object.hasOwn``、``clone``、``Object.fromEntries``、``Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map``、``Object.entries(schema.properties || {}) .filter``、``Object.entries``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:3009:3803:FUNCTION

.. js:function:: normalizeGraph(graph, settingsDefaults)

   规范化与 ``Graph`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``96``—``119`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``settingsDefaults`` （默认值 ``{}``）
      调用方传入的 ``settingsDefaults`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ version: graph?.version || 3, nodes: clone(graph?.nodes || []), edges: clone(graph?.edges || []), settings: { ...clone(settingsDefaults), ...graph?.settings, ...(settingsDefault…``。

   **主要协作调用**：``clone``、``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:3803:4478:FUNCTION

.. js:function:: updateWorkflowNodePositions(graph, moved)

   更新与 ``Workflow Node Positions`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``121``—``143`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4478:5400:FUNCTION

.. js:function:: initializeGraph(graph, definitions, settingsDefaults)

   实现 ``initializeGraph`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``145``—``175`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5400:5483:FUNCTION

.. js:function:: nodeCategory(definition)

   实现 ``nodeCategory`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``177``—``179`` 行。

   **参数**

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``definition?.category || ""``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5483:5866:FUNCTION

.. js:function:: workflowNodeNumbers(graph)

   Short canvas labels never replace the real IDs used for runtime bindings.

   **性质**：同步函数；导出 API；源码第 ``182``—``193`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``numbers``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5866:7130:FUNCTION

.. js:function:: workflowNodeMenuTree(menus, definitions)

   Menu placement is a server-owned scene path, independent of execution role.

   **性质**：同步函数；导出 API；源码第 ``196``—``234`` 行。

   **参数**

   ``menus`` （默认值 ``[]``）
      调用方传入的 ``menus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definitions`` （默认值 ``[]``）
      调用方传入的 ``definitions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``prune(groups)``。

   **主要协作调用**：``build``、``definitions.filter``、``children.find``、``(group && group.path.length === definition.menuPath?.length ? group.nodes : unassigned ).push``、``groups.push``、``prune``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7130:7520:FUNCTION

.. js:function:: workflowRepeatedItems(node, definition)

   Repeated ports use stable item IDs; their order belongs to configuration.

   **性质**：同步函数；导出 API；源码第 ``237``—``244`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``Array.isArray(value) ? value : schemaDefaults(definition.configSchema)?.[repeated.configField] || []``。

   **主要协作调用**：``Array.isArray``、``schemaDefaults``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7520:9245:FUNCTION

.. js:function:: effectiveWorkflowDefinition(node, definition)

   实现 ``effectiveWorkflowDefinition`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``246``—``296`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``definition``、``{ ...definition, baseDefinition: definition.baseDefinition || definition, inputs, inputSchema: { ...definition.inputSchema, properties, required }, }``。

   **主要协作调用**：``(definition.inputs || []).filter``、``Object.fromEntries``、``Object.entries(definition.inputSchema?.properties || {}).filter``、``Object.entries``、``(definition.inputSchema?.required || []).filter``、``workflowRepeatedItems(node, definition).forEach``、``workflowRepeatedItems``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:9245:11113:FUNCTION

.. js:function:: setWorkflowRepeatedItems(graph, nodeId, definition, items)

   One graph update preserves links during reorder and removes obsolete ports.

   **性质**：同步函数；导出 API；源码第 ``299``—``352`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11113:11311:FUNCTION

.. js:function:: nextWorkflowRepeatedItemId(items)

   实现 ``nextWorkflowRepeatedItemId`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``354``—``359`` 行。

   **参数**

   ``items``
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60slot-${index}\x60``。

   **主要协作调用**：``items.map``、``ids.has``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11311:11507:FUNCTION

.. js:function:: workflowPortsCompatible(output, input)

   实现 ``workflowPortsCompatible`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``361``—``367`` 行。

   **参数**

   ``output``
      调用方传入的 ``output`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``input``
      待解析、校验或转换的输入。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( input?.acceptsAny === true || output?.type === input?.type || (input?.accepts || []).includes(output?.type) )``。

   **主要协作调用**：``(input?.accepts || []).includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11507:13479:FUNCTION

.. js:function:: workflowInputFields(graph, definitions, path)

   实现 ``workflowInputFields`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``369``—``419`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:13479:13793:FUNCTION

.. js:function:: sourceNodeValue(node, definition)

   实现 ``sourceNodeValue`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``421``—``429`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``、``clone(value ?? source.default ?? schemaDefaults(source.valueSchema))``。

   **主要协作调用**：``clone``、``schemaDefaults``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:13793:14051:FUNCTION

.. js:function:: sourceValueConfig(definition, value, current)

   实现 ``sourceValueConfig`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``431``—``437`` 行。

   **参数**

   ``definition``
      调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   ``current`` （默认值 ``{}``）
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``current``、``source.configField == null ? { ...current, ...value } : { ...current, [source.configField]: value }``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:14051:14543:FUNCTION

.. js:function:: workflowValueMissing(value, schema)

   Required inputs follow the supplied schema, including compound sources.

   **性质**：同步函数；导出 API；源码第 ``440``—``449`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``schema`` （默认值 ``{}``）
      调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``value.length < (schema.minItems || 0)``、``(schema.required || []).some((key) => workflowValueMissing(value[key], schema.properties?.[key]), )``、``false``。

   **主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``、``Array.isArray``、``(schema.required || []).some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:14543:15518:FUNCTION

.. js:function:: createWorkflowNode(definition, graph, position)

   创建与 ``Workflow Node`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``451``—``483`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:15518:17078:FUNCTION

.. js:function:: workflowAddCandidates(definitions, graph, connection, query, context)

   Picker candidates obey the same backend-declared port rules as manual links.

   **性质**：同步函数；导出 API；源码第 ``486``—``534`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:17078:17988:FUNCTION

.. js:function:: addWorkflowNodeWithConnection(graph, definition, position, connection, port, definitions, context)

   Adding and linking is one immutable update, so one undo removes both.

   **性质**：同步函数；导出 API；源码第 ``537``—``567`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:17988:18377:FUNCTION

.. js:function:: isWorkflowCanvasBlankTarget(target)

   Node controls, edges and canvas controls never count as empty canvas.

   **性质**：同步函数；导出 API；源码第 ``570``—``577`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean( target?.closest?.(".react-flow__pane") && !target.closest( ".react-flow__node,.react-flow__edge,.react-flow__handle,.react-flow__controls,button,input,textarea,select,[ro…``。

   **主要协作调用**：``Boolean``、``target?.closest``、``target.closest``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18377:18910:FUNCTION

.. js:function:: copyWorkflowSelection(graph, ids, inheritedRegions)

   实现 ``copyWorkflowSelection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``579``—``593`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18910:19089:FUNCTION

.. js:function:: workflowNodeIds(graph)

   实现 ``workflowNodeIds`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``595``—``600`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph.nodes.flatMap((node) => [ node.id, ...(node.subgraph?.graph ? workflowNodeIds(node.subgraph.graph) : []), ])``。

   **主要协作调用**：``graph.nodes.flatMap``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:19089:22028:FUNCTION

.. js:function:: instantiateWorkflowGraph(original)

   Instantiate a graph tree. Saving/retrying never calls this function.

   **性质**：同步函数；导出 API；源码第 ``603``—``679`` 行。

   **参数**

   ``original``
      调用方传入的 ``original`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``graph``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``initializeGraph``、``clone``、``visit``、``remapRegions``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:22028:23063:FUNCTION

.. js:function:: pasteWorkflowSelection(graph, clipboard, position)

   实现 ``pasteWorkflowSelection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``681``—``709`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23063:23795:FUNCTION

.. js:function:: workflowSubgraphTemplateNode(source, definitions, title)

   Root budgets of a standalone template travel with its reusable wrapper.

   **性质**：同步函数；导出 API；源码第 ``712``—``730`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23795:25325:FUNCTION

.. js:function:: initializeWorkflowSubgraph(graph, nodeId, saved, definitions)

   Confirm a placeholder in place; template sources are copied and globally rekeyed.

   **性质**：同步函数；导出 API；源码第 ``733``—``775`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25325:25716:FUNCTION

.. js:function:: setWorkflowPortMode(graph, nodeId, port, mode, schema)

   设置与 ``Workflow Port Mode`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``777``—``791`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25716:25922:FUNCTION

.. js:function:: isWorkflowTextEditing(target)

   判断与 ``Workflow Text Editing`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``793``—``799`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean( target?.closest?.( 'input,textarea,select,[contenteditable="true"],.cm-editor,[role="combobox"],[role="textbox"]', ), )``。

   **主要协作调用**：``Boolean``、``target?.closest``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25922:28169:FUNCTION

.. js:function:: connectWorkflow(graph, connection, definitions, context)

   建立连接与 ``Workflow`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``801``—``865`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28169:28617:FUNCTION

.. js:function:: bindWorkflowInput(graph, nodeId, port, binding)

   实现 ``bindWorkflowInput`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``867``—``881`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28617:29019:FUNCTION

.. js:function:: removeWorkflowNodes(graph, ids)

   移除与 ``Workflow Nodes`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``883``—``893`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``pruneDeletedWorkflowRegions(graph, { ...graph, nodes: graph.nodes.filter((node) => !removed.has(node.id)), outputNodes: (graph.outputNodes || []).filter((id) => !removed.has(id)),…``。

   **主要协作调用**：``pruneDeletedWorkflowRegions``、``graph.nodes.filter``、``(graph.outputNodes || []).filter``、``graph.edges.filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29019:32210:FUNCTION

.. js:function:: catalogNode(definitions, node, graph, visited, context)

   实现 ``catalogNode`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``895``—``1000`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32210:32583:FUNCTION

.. js:function:: workflowGraphAtPath(graph, path)

   Subgraphs are scoped graphs. Editor navigation never replaces the root draft.

   **性质**：同步函数；导出 API；源码第 ``1003``—``1012`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``graph``。

   **主要协作调用**：``graph?.nodes?.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32583:33010:FUNCTION

.. js:function:: workflowGraphContext(graph, path)

   Context permits typed passthrough inference across explicit subgraph ports.

   **性质**：同步函数；导出 API；源码第 ``1015``—``1026`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``context``。

   **主要协作调用**：``graph?.nodes.find``、``context.push``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:33010:35224:FUNCTION

.. js:function:: updateWorkflowGraphAtPath(graph, path, update, boundary)

   更新与 ``Workflow Graph At Path`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1028``—``1088`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:35224:38352:FUNCTION

.. js:function:: workflowSubgraphDefinition(node, definitions, depth, parentGraph, context, visited)

   Public port contracts always come from the actual internal endpoint.

   **性质**：同步函数；导出 API；源码第 ``1091``—``1187`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38352:38445:FUNCTION

.. js:function:: workflowUniqueId(used)

   实现 ``workflowUniqueId`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``1189``—``1193`` 行。

   **参数**

   ``used``
      调用方传入的 ``used`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``id``。

   **主要协作调用**：``workflowId``、``used.add``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38445:43037:FUNCTION

.. js:function:: wrapWorkflowSubgraph(graph, ids, definitions, name, parentInterface)

   Boundary rewiring, positions and interface creation form one undoable edit.

   **性质**：同步函数；导出 API；源码第 ``1196``—``1333`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43037:47191:FUNCTION

.. js:function:: unwrapWorkflowSubgraph(graph, id)

   Removing a group restores public literal bindings and parameter overrides.

   **性质**：同步函数；导出 API；源码第 ``1336``—``1462`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47191:49752:FUNCTION

.. js:function:: workflowRuntimeForGraph(graph, runtime, path, paths)

   Runtime leaves retain slash paths; collapsed groups aggregate all descendants.

   **性质**：同步函数；导出 API；源码第 ``1465``—``1546`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49752:50010:FUNCTION

.. js:function:: isWorkflowEditorMessage(event, frameWindow, origin)

   判断与 ``Workflow Editor Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1548``—``1556`` 行。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:578:853:FUNCTION

.. rubric:: ``(graph?.nodes || []).some callback @ 14``

.. code-block:: javascript

   (graph?.nodes || []).some callback @ 14(node)

作为 ``(graph?.nodes || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``20`` 行；所属函数 ``workflowUsesKnowledge``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowUsesKnowledge``、``( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some``、``definitions.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:719:764:FUNCTION

.. rubric:: ``definitions.find callback @ 18``

.. code-block:: javascript

   definitions.find callback @ 18(definition)

作为 ``definitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``(graph?.nodes || []).some callback @ 14``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:809:852:FUNCTION

.. rubric:: ``( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some callback @ 20``

.. code-block:: javascript

   ( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some callback @ 20(effect)

作为 ``( definitions.find((definition) => definition.kind === node.kind) ?.effects || [] ).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``(graph?.nodes || []).some callback @ 14``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``effect.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1456:1528:FUNCTION

.. rubric:: ``Object.entries(value).map callback @ 42``

.. code-block:: javascript

   Object.entries(value).map callback @ 42([key, item])

作为 ``Object.entries(value).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``45`` 行；所属函数 ``normalizeWorkflowSchema``。

**参数**

``[key, item]``
   调用方传入的 ``key, item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeWorkflowSchema``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:1970:2048:FUNCTION

.. rubric:: ``(anyOf || oneOf || []).find callback @ 63``

.. code-block:: javascript

   (anyOf || oneOf || []).find callback @ 63(item)

作为 ``(anyOf || oneOf || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``scalarSchema``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2317:2408:FUNCTION

.. rubric:: ``schema.$ref .slice(2) .split("/") .reduce callback @ 74``

.. code-block:: javascript

   schema.$ref .slice(2) .split("/") .reduce callback @ 74(value, token)

作为 ``schema.$ref .slice(2) .split("/") .reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``75`` 行；所属函数 ``resolveWorkflowSchema``。

**参数**

``value``
   待读取、转换或校验的值。

``token``
   调用方传入的 ``token`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``token.replaceAll("~1", "/").replaceAll``、``token.replaceAll``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2855:2907:FUNCTION

.. rubric:: ``Object.entries(schema.properties || {}) .filter callback @ 89``

.. code-block:: javascript

   Object.entries(schema.properties || {}) .filter callback @ 89([, property])

作为 ``Object.entries(schema.properties || {}) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``schemaDefaults``。

**参数**

``[, property]``
   调用方传入的 ``, property`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:2922:2974:FUNCTION

.. rubric:: ``Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map callback @ 90``

.. code-block:: javascript

   Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map callback @ 90([key, property])

作为 ``Object.entries(schema.properties || {}) .filter(([, property]) => Object.hasOwn(property, "default")) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``schemaDefaults``。

**参数**

``[key, property]``
   调用方传入的 ``key, property`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``schemaDefaults``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:3923:4032:FUNCTION

.. rubric:: ``moved .filter callback @ 125``

.. code-block:: javascript

   moved .filter callback @ 125(node)

作为 ``moved .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``125``—``127`` 行；所属函数 ``updateWorkflowNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4053:4087:FUNCTION

.. rubric:: ``moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 129``

.. code-block:: javascript

   moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 129(node)

作为 ``moved .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``updateWorkflowNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4150:4426:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 132``

.. code-block:: javascript

   graph.nodes.map callback @ 132(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``132``—``141`` 行；所属函数 ``updateWorkflowNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``{ ...node, position: { x: position.x, y: position.y } }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4630:4671:FUNCTION

.. rubric:: ``next.nodes.some callback @ 147``

.. code-block:: javascript

   next.nodes.some callback @ 147(node)

作为 ``next.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``initializeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:4752:4884:FUNCTION

.. rubric:: ``next.nodes.some callback @ 151``

.. code-block:: javascript

   next.nodes.some callback @ 151(node)

作为 ``next.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``153`` 行；所属函数 ``initializeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["interface_inputs", "interface_outputs"].includes``、``node.id?.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5012:5381:FUNCTION

.. rubric:: ``next.nodes.map callback @ 159``

.. code-block:: javascript

   next.nodes.map callback @ 159(node)

作为 ``next.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``159``—``173`` 行；所属函数 ``initializeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``initializeGraph``、``schemaDefaults``、``catalogNode``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:5664:5829:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(current)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``185``—``190`` 行；所属函数 ``workflowNodeNumbers``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visit``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6035:6292:FUNCTION

.. rubric:: ``build``

.. code-block:: javascript

   build(items, path, depth)

构造与 ``build`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``197``—``205`` 行；所属函数 ``workflowNodeMenuTree``。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6113:6291:FUNCTION

.. rubric:: ``items.map callback @ 200``

.. code-block:: javascript

   items.map callback @ 200(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``200``—``205`` 行；所属函数 ``build``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``build``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6396:6418:FUNCTION

.. rubric:: ``definitions.filter callback @ 208``

.. code-block:: javascript

   definitions.filter callback @ 208(node)

作为 ``definitions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``208``—``208`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6541:6565:FUNCTION

.. rubric:: ``children.find callback @ 212``

.. code-block:: javascript

   children.find callback @ 212(item)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6947:7103:FUNCTION

.. rubric:: ``prune``

.. code-block:: javascript

   prune(items)

实现 ``prune`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``229``—``232`` 行；所属函数 ``workflowNodeMenuTree``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items .map((item) => ({ ...item, children: prune(item.children) })) .filter``、``items .map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:6980:7035:FUNCTION

.. rubric:: ``items .map callback @ 231``

.. code-block:: javascript

   items .map callback @ 231(item)

作为 ``items .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``prune``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prune``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7051:7102:FUNCTION

.. rubric:: ``items .map((item) => ({ ...item, children: prune(item.children) })) .filter callback @ 232``

.. code-block:: javascript

   items .map((item) => ({ ...item, children: prune(item.children) })) .filter callback @ 232(item)

作为 ``items .map((item) => ({ ...item, children: prune(item.children) })) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``prune``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7764:7808:FUNCTION

.. rubric:: ``(definition.inputs || []).filter callback @ 251``

.. code-block:: javascript

   (definition.inputs || []).filter callback @ 251(port)

作为 ``(definition.inputs || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``251``—``251`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``port.name.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:7924:7967:FUNCTION

.. rubric:: ``Object.entries(definition.inputSchema?.properties || {}).filter callback @ 255``

.. code-block:: javascript

   Object.entries(definition.inputSchema?.properties || {}).filter callback @ 255([name])

作为 ``Object.entries(definition.inputSchema?.properties || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8048:8087:FUNCTION

.. rubric:: ``(definition.inputSchema?.required || []).filter callback @ 259``

.. code-block:: javascript

   (definition.inputSchema?.required || []).filter callback @ 259(name)

作为 ``(definition.inputSchema?.required || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8144:9063:FUNCTION

.. rubric:: ``workflowRepeatedItems(node, definition).forEach callback @ 261``

.. code-block:: javascript

   workflowRepeatedItems(node, definition).forEach callback @ 261(item, index)

作为 ``workflowRepeatedItems(node, definition).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``261``—``289`` 行；所属函数 ``effectiveWorkflowDefinition``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``repeated.kinds?.find``、``/^[A-Za-z0-9_-]{1,48}$/.test``、``item.title?.trim``、``Object.fromEntries``、``Object.entries(template.display || {}).map``、``Object.entries``、``inputs.push``、``required.push``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8201:8236:FUNCTION

.. rubric:: ``repeated.kinds?.find callback @ 262``

.. code-block:: javascript

   repeated.kinds?.find callback @ 262(entry)

作为 ``repeated.kinds?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``workflowRepeatedItems(node, definition).forEach callback @ 261``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:8541:8701:FUNCTION

.. rubric:: ``Object.entries(template.display || {}).map callback @ 268``

.. code-block:: javascript

   Object.entries(template.display || {}).map callback @ 268([key, value])

作为 ``Object.entries(template.display || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``268``—``273`` 行；所属函数 ``workflowRepeatedItems(node, definition).forEach callback @ 261``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.replaceAll``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:9486:9514:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 301``

.. code-block:: javascript

   graph.nodes.find callback @ 301(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:9926:9959:FUNCTION

.. rubric:: ``repeated.kinds?.some callback @ 311``

.. code-block:: javascript

   repeated.kinds?.some callback @ 311(kind)

作为 ``repeated.kinds?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10147:10177:FUNCTION

.. rubric:: ``workflowRepeatedItems(node, definition).map callback @ 317``

.. code-block:: javascript

   workflowRepeatedItems(node, definition).map callback @ 317(item)

作为 ``workflowRepeatedItems(node, definition).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10237:10282:FUNCTION

.. rubric:: ``items .filter callback @ 321``

.. code-block:: javascript

   items .filter callback @ 321(item)

作为 ``items .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``321``—``321`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``previous.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10295:10326:FUNCTION

.. rubric:: ``items .filter((item) => previous.get(item.id) === item.kind) .map callback @ 322``

.. code-block:: javascript

   items .filter((item) => previous.get(item.id) === item.kind) .map callback @ 322(item)

作为 ``items .filter((item) => previous.get(item.id) === item.kind) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``322``—``322`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10416:10481:FUNCTION

.. rubric:: ``Object.entries(node.inputs || {}).filter callback @ 326``

.. code-block:: javascript

   Object.entries(node.inputs || {}).filter callback @ 326([name])

作为 ``Object.entries(node.inputs || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``、``retained.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10727:10924:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 336``

.. code-block:: javascript

   graph.nodes.map callback @ 336(entry)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``336``—``343`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clone``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:10963:11098:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 346``

.. code-block:: javascript

   graph.edges.filter callback @ 346(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``346``—``349`` 行；所属函数 ``setWorkflowRepeatedItems``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``edge.targetPort.startsWith``、``retained.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11199:11216:FUNCTION

.. rubric:: ``items.map callback @ 355``

.. code-block:: javascript

   items.map callback @ 355(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``355``—``355`` 行；所属函数 ``nextWorkflowRepeatedItemId``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11624:11681:FUNCTION

.. rubric:: ``graph.nodes .filter callback @ 371``

.. code-block:: javascript

   graph.nodes .filter callback @ 371(node)

作为 ``graph.nodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``371`` 行；所属函数 ``workflowInputFields``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``catalogNode``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:11692:12133:FUNCTION

.. rubric:: ``graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map callback @ 372``

.. code-block:: javascript

   graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map callback @ 372(node)

作为 ``graph.nodes .filter((node) => Boolean(catalogNode(definitions, node)?.source)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``372``—``384`` 行；所属函数 ``workflowInputFields``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ key: node.id, nodeId: node.id, title: node.name || definition?.display?.title, required: definition.source.required !== false && !(node.kind === "attachments" && node.config?.op…``。

**主要协作调用**：``catalogNode``、``sourceNodeValue``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:12176:12239:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 386``

.. code-block:: javascript

   graph.nodes.filter callback @ 386(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``386``—``386`` 行；所属函数 ``workflowInputFields``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:12989:13037:FUNCTION

.. rubric:: ``childGraph.nodes.find callback @ 400``

.. code-block:: javascript

   childGraph.nodes.find callback @ 400(entry)

作为 ``childGraph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``400``—``400`` 行；所属函数 ``workflowInputFields``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:14444:14517:FUNCTION

.. rubric:: ``(schema.required || []).some callback @ 445``

.. code-block:: javascript

   (schema.required || []).some callback @ 445(key)

作为 ``(schema.required || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``445``—``446`` 行；所属函数 ``workflowValueMissing``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowValueMissing``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:15783:15822:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 495``

.. code-block:: javascript

   graph.nodes.find callback @ 495(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``495``—``495`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16090:16133:FUNCTION

.. rubric:: ``definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find callback @ 504``

.. code-block:: javascript

   definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find callback @ 504(port)

作为 ``definition?.[ connection.handleType === "source" ? "outputs" : "inputs" ]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``504``—``504`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16250:16284:FUNCTION

.. rubric:: ``definitions .filter callback @ 509``

.. code-block:: javascript

   definitions .filter callback @ 509(definition)

作为 ``definitions .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``509``—``509`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16299:17074:FUNCTION

.. rubric:: ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 510``

.. code-block:: javascript

   definitions .filter((definition) => !definition.hidden) .flatMap callback @ 510(definition)

实现 ``definitions .filter((definition) => !definition.hidden) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``510``—``533`` 行；所属函数 ``workflowAddCandidates``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .toLocaleLowerCase() .includes(term), ), ) .map((port) => ({…``。

**主要协作调用**：``effectiveWorkflowDefinition``、``( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter``、``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .…``、``ports .filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16561:16725:FUNCTION

.. rubric:: ``( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter callback @ 517``

.. code-block:: javascript

   ( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter callback @ 517(port)

作为 ``( definition[ connection.handleType === "source" ? "inputs" : "outputs" ] || [] ).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``517``—``520`` 行；所属函数 ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 510``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowPortsCompatible``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16792:17009:FUNCTION

.. rubric:: ``ports .filter callback @ 524``

.. code-block:: javascript

   ports .filter callback @ 524(port)

作为 ``ports .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``524``—``530`` 行；所属函数 ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 510``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[definition.display, port?.display].some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:16853:16996:FUNCTION

.. rubric:: ``[definition.display, port?.display].some callback @ 525``

.. code-block:: javascript

   [definition.display, port?.display].some callback @ 525(display)

作为 ``[definition.display, port?.display].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``525``—``529`` 行；所属函数 ``ports .filter callback @ 524``。

**参数**

``display``
   调用方传入的 ``display`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.values(display || {}) .join(" ") .toLocaleLowerCase() .includes``、``Object.values(display || {}) .join(" ") .toLocaleLowerCase``、``Object.values(display || {}) .join``、``Object.values``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:17034:17066:FUNCTION

.. rubric:: ``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .… callback @ 532``

.. code-block:: javascript

   ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .… callback @ 532(port)

实现 ``ports .filter((port) => [definition.display, port?.display].some((display) => Object.values(display || {}) .join(" ") .…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``definitions .filter((definition) => !definition.hidden) .flatMap callback @ 510``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18522:18553:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 581``

.. code-block:: javascript

   graph.nodes.filter callback @ 581(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``581``—``581`` 行；所属函数 ``copyWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18744:18815:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 589``

.. code-block:: javascript

   graph.edges.filter callback @ 589(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``589``—``589`` 行；所属函数 ``copyWorkflowSelection``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18874:18900:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 591``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 591(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``591``—``591`` 行；所属函数 ``copyWorkflowSelection``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:18982:19085:FUNCTION

.. rubric:: ``graph.nodes.flatMap callback @ 596``

.. code-block:: javascript

   graph.nodes.flatMap callback @ 596(node)

实现 ``graph.nodes.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``596``—``599`` 行；所属函数 ``workflowNodeIds``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowNodeIds``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:19329:21658:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(current)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``607``—``667`` 行；所属函数 ``instantiateWorkflowGraph``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ids, ports }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``current.nodes.map``、``allIds.set``、``ids.get``、``visit``、``workflowId``、``ports.set``、``child.ports.get``、``child.ids.get``、``Object.fromEntries``、``Object.entries(node.inputs || {}).map``、``Object.entries``、``Object.entries(node.config || {}).map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:19387:19420:FUNCTION

.. rubric:: ``current.nodes.map callback @ 608``

.. code-block:: javascript

   current.nodes.map callback @ 608(node)

作为 ``current.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``608``—``608`` 行；所属函数 ``visit``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowId``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:20667:20767:FUNCTION

.. rubric:: ``Object.entries(node.inputs || {}).map callback @ 637``

.. code-block:: javascript

   Object.entries(node.inputs || {}).map callback @ 637([key, value])

作为 ``Object.entries(node.inputs || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``637``—``640`` 行；所属函数 ``visit``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ports.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:20865:20969:FUNCTION

.. rubric:: ``Object.entries(node.config || {}).map callback @ 643``

.. code-block:: javascript

   Object.entries(node.config || {}).map callback @ 643([key, value])

作为 ``Object.entries(node.config || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``643``—``646`` 行；所属函数 ``visit``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ports.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21125:21152:FUNCTION

.. rubric:: ``node.subgraph.execution.branchOrder.map callback @ 650``

.. code-block:: javascript

   node.subgraph.execution.branchOrder.map callback @ 650(key)

作为 ``node.subgraph.execution.branchOrder.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``650``—``650`` 行；所属函数 ``visit``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``child.ids.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21592:21619:FUNCTION

.. rubric:: ``(current.outputNodes || []).map callback @ 663``

.. code-block:: javascript

   (current.outputNodes || []).map callback @ 663(key)

作为 ``(current.outputNodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``663``—``664`` 行；所属函数 ``visit``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ids.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21698:21986:FUNCTION

.. rubric:: ``remapRegions``

.. code-block:: javascript

   remapRegions(current)

实现 ``remapRegions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``669``—``676`` 行；所属函数 ``instantiateWorkflowGraph``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``workflowId``、``region.nodeIds.map``、``remapRegions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:21847:21869:FUNCTION

.. rubric:: ``region.nodeIds.map callback @ 672``

.. code-block:: javascript

   region.nodeIds.map callback @ 672(id)

作为 ``region.nodeIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``672``—``672`` 行；所属函数 ``remapRegions``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``allIds.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:22317:22348:FUNCTION

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:22396:22427:FUNCTION

.. rubric:: ``copied.nodes.map callback @ 688``

.. code-block:: javascript

   copied.nodes.map callback @ 688(node)

作为 ``copied.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``pasteWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23037:23054:FUNCTION

.. rubric:: ``copied.nodes.map callback @ 707``

.. code-block:: javascript

   copied.nodes.map callback @ 707(node)

作为 ``copied.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``707``—``707`` 行；所属函数 ``pasteWorkflowSelection``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23412:23429:FUNCTION

.. rubric:: ``source.nodes.map callback @ 718``

.. code-block:: javascript

   source.nodes.map callback @ 718(node)

作为 ``source.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``718``—``718`` 行；所属函数 ``workflowSubgraphTemplateNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23696:23762:FUNCTION

.. rubric:: ``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback @ 726``

.. code-block:: javascript

   projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback @ 726(region)

作为 ``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``726``—``726`` 行；所属函数 ``workflowSubgraphTemplateNode``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``existing.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:23730:23761:FUNCTION

.. rubric:: ``existing.some callback @ 726``

.. code-block:: javascript

   existing.some callback @ 726(item)

作为 ``existing.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``726``—``726`` 行；所属函数 ``projectWorkflowRegions(source.executionRegions || [], [wrapper]).filter callback @ 726``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:24000:24028:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 734``

.. code-block:: javascript

   graph.nodes.find callback @ 734(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``734``—``734`` 行；所属函数 ``initializeWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:24606:24634:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 749``

.. code-block:: javascript

   graph.nodes.filter callback @ 749(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``749``—``749`` 行；所属函数 ``initializeWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25252:25310:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 771``

.. code-block:: javascript

   graph.nodes.map callback @ 771(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``771``—``772`` 行；所属函数 ``initializeWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:25437:25465:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 778``

.. code-block:: javascript

   graph.nodes.find callback @ 778(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``778``—``778`` 行；所属函数 ``setWorkflowPortMode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26038:26077:FUNCTION

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26114:26153:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 803``

.. code-block:: javascript

   graph.nodes.find callback @ 803(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``803``—``803`` 行；所属函数 ``connectWorkflow``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26534:26568:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find callback @ 811``

.. code-block:: javascript

   effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find callback @ 811(port)

作为 ``effectiveWorkflowDefinition( source, catalogNode(definitions, source, graph, new Set(), context), )?.outputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``811``—``811`` 行；所属函数 ``connectWorkflow``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:26711:26745:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find callback @ 815``

.. code-block:: javascript

   effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find callback @ 815(port)

作为 ``effectiveWorkflowDefinition( target, catalogNode(definitions, target, graph, new Set(), context), )?.inputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``815``—``815`` 行；所属函数 ``connectWorkflow``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27334:27425:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 831``

.. code-block:: javascript

   graph.edges.filter callback @ 831(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``831``—``832`` 行；所属函数 ``connectWorkflow``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27458:27629:FUNCTION

.. rubric:: ``edges.some callback @ 836``

.. code-block:: javascript

   edges.some callback @ 836(edge)

作为 ``edges.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``836``—``840`` 行；所属函数 ``connectWorkflow``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27780:27797:FUNCTION

.. rubric:: ``edges.map callback @ 847``

.. code-block:: javascript

   edges.map callback @ 847(edge)

作为 ``edges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``847``—``847`` 行；所属函数 ``connectWorkflow``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:27908:27974:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 851``

.. code-block:: javascript

   graph.nodes.map callback @ 851(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``851``—``852`` 行；所属函数 ``connectWorkflow``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28292:28362:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 871``

.. code-block:: javascript

   graph.edges.filter callback @ 871(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``871``—``871`` 行；所属函数 ``bindWorkflowInput``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28398:28608:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 873``

.. code-block:: javascript

   graph.nodes.map callback @ 873(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``873``—``879`` 行；所属函数 ``bindWorkflowInput``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``{ ...node, inputs }``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28791:28822:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 887``

.. code-block:: javascript

   graph.nodes.filter callback @ 887(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``887``—``887`` 行；所属函数 ``removeWorkflowNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28875:28899:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 888``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 888(id)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``888``—``888`` 行；所属函数 ``removeWorkflowNodes``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:28932:29003:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 890``

.. code-block:: javascript

   graph.edges.filter callback @ 890(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``890``—``890`` 行；所属函数 ``removeWorkflowNodes``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29157:29186:FUNCTION

.. rubric:: ``context.map callback @ 902``

.. code-block:: javascript

   context.map callback @ 902(entry)

作为 ``context.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``902``—``902`` 行；所属函数 ``catalogNode``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29436:29559:FUNCTION

.. rubric:: ``definitions.find callback @ 916``

.. code-block:: javascript

   definitions.find callback @ 916(definition)

作为 ``definitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``916``—``918`` 行；所属函数 ``catalogNode``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29587:29632:FUNCTION

.. rubric:: ``definitions.find callback @ 919``

.. code-block:: javascript

   definitions.find callback @ 919(definition)

作为 ``definitions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``919``—``919`` 行；所属函数 ``catalogNode``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:29809:31538:FUNCTION

.. rubric:: ``resolveEdges``

.. code-block:: javascript

   resolveEdges(sourceGraph, targetId, targetPort, ancestors)

解析并确定与 ``Edges`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``927``—``979`` 行；所属函数 ``catalogNode``。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30061:30093:FUNCTION

.. rubric:: ``sourceGraph?.nodes.find callback @ 930``

.. code-block:: javascript

   sourceGraph?.nodes.find callback @ 930(entry)

作为 ``sourceGraph?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``930``—``930`` 行；所属函数 ``resolveEdges``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30168:30214:FUNCTION

.. rubric:: ``Object.entries(boundNode?.inputs || {}) .filter callback @ 932``

.. code-block:: javascript

   Object.entries(boundNode?.inputs || {}) .filter callback @ 932([name])

作为 ``Object.entries(boundNode?.inputs || {}) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``932``—``932`` 行；所属函数 ``resolveEdges``。

**参数**

``[name]``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30227:30250:FUNCTION

.. rubric:: ``Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map callback @ 933``

.. code-block:: javascript

   Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map callback @ 933()

作为 ``Object.entries(boundNode?.inputs || {}) .filter(([name]) => !targetPort || name === targetPort) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``933``—``933`` 行；所属函数 ``resolveEdges``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30321:30444:FUNCTION

.. rubric:: ``(sourceGraph?.edges || []) .filter callback @ 937``

.. code-block:: javascript

   (sourceGraph?.edges || []) .filter callback @ 937(entry)

作为 ``(sourceGraph?.edges || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``937``—``939`` 行；所属函数 ``resolveEdges``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30469:30985:FUNCTION

.. rubric:: ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 941``

.. code-block:: javascript

   (sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 941(edge)

实现 ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``941``—``958`` 行；所属函数 ``resolveEdges``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( upstream && effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ), )?.outputs?.find((entry) => entry.name === ed…``。

**主要协作调用**：``sourceGraph.nodes.find``、``effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),…``、``effectiveWorkflowDefinition``、``catalogNode``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30531:30579:FUNCTION

.. rubric:: ``sourceGraph.nodes.find callback @ 943``

.. code-block:: javascript

   sourceGraph.nodes.find callback @ 943(entry)

作为 ``sourceGraph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``943``—``943`` 行；所属函数 ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 941``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:30920:30961:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),… callback @ 956``

.. code-block:: javascript

   effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),… callback @ 956(entry)

实现 ``effectiveWorkflowDefinition( upstream, catalogNode( definitions, upstream, sourceGraph, new Set(visited), ancestors, ),…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``956``—``956`` 行；所属函数 ``(sourceGraph?.edges || []) .filter( (entry) => entry.target === targetId && (!targetPort || entry.targetPort === target… callback @ 941``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:31654:31673:FUNCTION

.. rubric:: ``ports.map callback @ 982``

.. code-block:: javascript

   ports.map callback @ 982(item)

作为 ``ports.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``982``—``982`` 行；所属函数 ``catalogNode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:31900:32201:FUNCTION

.. rubric:: ``(definition.outputs || []).map callback @ 989``

.. code-block:: javascript

   (definition.outputs || []).map callback @ 989(output)

作为 ``(definition.outputs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``989``—``998`` 行；所属函数 ``catalogNode``。

**参数**

``output``
   调用方传入的 ``output`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32416:32475:FUNCTION

.. rubric:: ``graph?.nodes?.find callback @ 1006``

.. code-block:: javascript

   graph?.nodes?.find callback @ 1006(item)

作为 ``graph?.nodes?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1006``—``1006`` 行；所属函数 ``workflowGraphAtPath``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:32814:32873:FUNCTION

.. rubric:: ``graph?.nodes.find callback @ 1019``

.. code-block:: javascript

   graph?.nodes.find callback @ 1019(node)

作为 ``graph?.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1019``—``1019`` 行；所属函数 ``workflowGraphContext``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:33276:35209:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 1035``

.. code-block:: javascript

   graph.nodes.map callback @ 1035(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1035``—``1085`` 行；所属函数 ``updateWorkflowGraphAtPath``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWorkflowGraphAtPath``、``Object.fromEntries``、``["inputs", "outputs"].map``、``( node.subgraph.interface?.parameters || [] ).map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:33861:34579:FUNCTION

.. rubric:: ``["inputs", "outputs"].map callback @ 1053``

.. code-block:: javascript

   ["inputs", "outputs"].map callback @ 1053(direction)

作为 ``["inputs", "outputs"].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1053``—``1068`` 行；所属函数 ``graph.nodes.map callback @ 1035``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[ direction, (node.subgraph.interface?.[direction] || []).map( (entry) => ({ ...entry, [key]: boundary[direction]?.[ \x60${entry[key]?.nodeId}\u0000${entry[key]?.port}\x60 ] || entry[ke…``。

**主要协作调用**：``(node.subgraph.interface?.[direction] || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:34141:34492:FUNCTION

.. rubric:: ``(node.subgraph.interface?.[direction] || []).map callback @ 1059``

.. code-block:: javascript

   (node.subgraph.interface?.[direction] || []).map callback @ 1059(entry)

作为 ``(node.subgraph.interface?.[direction] || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1059``—``1065`` 行；所属函数 ``["inputs", "outputs"].map callback @ 1053``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:34737:35114:FUNCTION

.. rubric:: ``( node.subgraph.interface?.parameters || [] ).map callback @ 1072``

.. code-block:: javascript

   ( node.subgraph.interface?.parameters || [] ).map callback @ 1072(parameter)

作为 ``( node.subgraph.interface?.parameters || [] ).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1072``—``1080`` 行；所属函数 ``graph.nodes.map callback @ 1035``。

**参数**

``parameter``
   调用方传入的 ``parameter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(parameter.targets || []).flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:34860:35061:FUNCTION

.. rubric:: ``(parameter.targets || []).flatMap callback @ 1075``

.. code-block:: javascript

   (parameter.targets || []).flatMap callback @ 1075(target)

实现 ``(parameter.targets || []).flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1075``—``1078`` 行；所属函数 ``( node.subgraph.interface?.parameters || [] ).map callback @ 1072``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:35562:36834:FUNCTION

.. rubric:: ``endpointPort``

.. code-block:: javascript

   endpointPort(entry, direction)

实现 ``endpointPort`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1101``—``1140`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ name: entry.id, type: "any", schema: {}, display: { title: entry.title || entry.name, subtitle: \x60${entry.name} · 待连接\x60, description: entry.description || "进入子图连接内部端口后自动确定类型。", },…``、``null``、``{ ...port, name: entry.id, inlineAllowed: direction === "inputs" ? port.inlineAllowed === true : false, display: { ...port.display, title: entry.title || port.display?.title || en…``。

**主要协作调用**：``graph.nodes.find``、``effectiveWorkflowDefinition``、``catalogNode``、``definition?.[direction]?.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:36003:36041:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 1115``

.. code-block:: javascript

   graph.nodes.find callback @ 1115(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1115``—``1115`` 行；所属函数 ``endpointPort``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:36358:36402:FUNCTION

.. rubric:: ``definition?.[direction]?.find callback @ 1125``

.. code-block:: javascript

   definition?.[direction]?.find callback @ 1125(item)

作为 ``definition?.[direction]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1125``—``1125`` 行；所属函数 ``endpointPort``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:36897:36937:FUNCTION

.. rubric:: ``(subgraph.interface?.inputs || []) .map callback @ 1142``

.. code-block:: javascript

   (subgraph.interface?.inputs || []) .map callback @ 1142(entry)

作为 ``(subgraph.interface?.inputs || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1142``—``1142`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``endpointPort``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:37024:37065:FUNCTION

.. rubric:: ``(subgraph.interface?.outputs || []) .map callback @ 1145``

.. code-block:: javascript

   (subgraph.interface?.outputs || []) .map callback @ 1145(entry)

作为 ``(subgraph.interface?.outputs || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1145``—``1145`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``endpointPort``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:37258:37294:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 1150``

.. code-block:: javascript

   graph.nodes.find callback @ 1150(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1150``—``1150`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38237:38277:FUNCTION

.. rubric:: ``inputs.map callback @ 1182``

.. code-block:: javascript

   inputs.map callback @ 1182(port)

作为 ``inputs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1182``—``1182`` 行；所属函数 ``workflowSubgraphDefinition``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38717:38748:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1204``

.. code-block:: javascript

   graph.nodes.filter callback @ 1204(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1204``—``1204`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38941:39009:FUNCTION

.. rubric:: ``(graph.executionRegions || []).filter callback @ 1207``

.. code-block:: javascript

   (graph.executionRegions || []).filter callback @ 1207(region)

作为 ``(graph.executionRegions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1207``—``1208`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:38978:39008:FUNCTION

.. rubric:: ``region.nodeIds.every callback @ 1208``

.. code-block:: javascript

   region.nodeIds.every callback @ 1208(id)

作为 ``region.nodeIds.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1208``—``1208`` 行；所属函数 ``(graph.executionRegions || []).filter callback @ 1207``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedLeaves.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39075:39092:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 1211``

.. code-block:: javascript

   graph.nodes.map callback @ 1211(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1211``—``1211`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39154:39185:FUNCTION

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39226:39257:FUNCTION

.. rubric:: ``children.map callback @ 1215``

.. code-block:: javascript

   children.map callback @ 1215(node)

作为 ``children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1215``—``1215`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39318:40091:FUNCTION

.. rubric:: ``boundary``

.. code-block:: javascript

   boundary(direction, nodeId, port)

实现 ``boundary`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1218``—``1239`` 行；所属函数 ``wrapWorkflowSubgraph``。

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

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39498:39569:FUNCTION

.. rubric:: ``list.find callback @ 1222``

.. code-block:: javascript

   list.find callback @ 1222(item)

作为 ``list.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1222``—``1222`` 行；所属函数 ``boundary``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39630:39658:FUNCTION

.. rubric:: ``children.find callback @ 1225``

.. code-block:: javascript

   children.find callback @ 1225(node)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1225``—``1225`` 行；所属函数 ``boundary``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:39796:39824:FUNCTION

.. rubric:: ``effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find callback @ 1229``

.. code-block:: javascript

   effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find callback @ 1229(item)

作为 ``effectiveWorkflowDefinition( child, catalogNode(definitions, child), )?.[direction]?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1229``—``1229`` 行；所属函数 ``boundary``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40136:40205:FUNCTION

.. rubric:: ``graph.edges.filter callback @ 1241``

.. code-block:: javascript

   graph.edges.filter callback @ 1241(edge)

作为 ``graph.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1241``—``1241`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40252:40291:FUNCTION

.. rubric:: ``graph.edges .filter callback @ 1244``

.. code-block:: javascript

   graph.edges .filter callback @ 1244(edge)

作为 ``graph.edges .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1244``—``1244`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``internalEdges.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40302:40695:FUNCTION

.. rubric:: ``graph.edges .filter((edge) => !internalEdges.includes(edge)) .map callback @ 1245``

.. code-block:: javascript

   graph.edges .filter((edge) => !internalEdges.includes(edge)) .map callback @ 1245(edge)

作为 ``graph.edges .filter((edge) => !internalEdges.includes(edge)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1245``—``1259`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...edge, target: id, targetPort: boundary("inputs", edge.target, edge.targetPort), }``、``{ ...edge, source: id, sourcePort: boundary("outputs", edge.source, edge.sourcePort), }``、``edge``。

**主要协作调用**：``selected.has``、``boundary``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:40928:41107:FUNCTION

.. rubric:: ``clone(children).map callback @ 1271``

.. code-block:: javascript

   clone(children).map callback @ 1271(child)

作为 ``clone(children).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1271``—``1277`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:41194:41230:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 1279``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 1279(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1279``—``1280`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:42715:42747:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1321``

.. code-block:: javascript

   graph.nodes.filter callback @ 1321(item)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1321``—``1321`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:42819:42870:FUNCTION

.. rubric:: ``(graph.executionRegions || []).filter callback @ 1323``

.. code-block:: javascript

   (graph.executionRegions || []).filter callback @ 1323(region)

作为 ``(graph.executionRegions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1323``—``1323`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``movedRegions.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:42933:42969:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 1326``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 1326(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1326``—``1326`` 行；所属函数 ``wrapWorkflowSubgraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43206:43230:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 1337``

.. code-block:: javascript

   graph.nodes.find callback @ 1337(node)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1337``—``1337`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43425:43449:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1342``

.. code-block:: javascript

   graph.nodes.filter callback @ 1342(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1342``—``1342`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43455:43472:FUNCTION

.. rubric:: ``graph.nodes.filter((node) => node.id !== id).map callback @ 1342``

.. code-block:: javascript

   graph.nodes.filter((node) => node.id !== id).map callback @ 1342(node)

作为 ``graph.nodes.filter((node) => node.id !== id).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1342``—``1342`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43527:43678:FUNCTION

.. rubric:: ``inner.nodes.map callback @ 1345``

.. code-block:: javascript

   inner.nodes.map callback @ 1345(node)

作为 ``inner.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1345``—``1350`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``used.has``、``workflowUniqueId``、``used.add``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:43728:43943:FUNCTION

.. rubric:: ``clone(inner.nodes).map callback @ 1352``

.. code-block:: javascript

   clone(inner.nodes).map callback @ 1352(node)

作为 ``clone(inner.nodes).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1352``—``1359`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:44058:44119:FUNCTION

.. rubric:: ``children.find callback @ 1363``

.. code-block:: javascript

   children.find callback @ 1363(node)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1363``—``1363`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:44600:44657:FUNCTION

.. rubric:: ``children.find callback @ 1378``

.. code-block:: javascript

   children.find callback @ 1378(node)

作为 ``children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1378``—``1378`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:44919:44965:FUNCTION

.. rubric:: ``contract.outputs?.find callback @ 1389``

.. code-block:: javascript

   contract.outputs?.find callback @ 1389(item)

作为 ``contract.outputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1389``—``1389`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:45294:45340:FUNCTION

.. rubric:: ``contract.inputs?.find callback @ 1401``

.. code-block:: javascript

   contract.inputs?.find callback @ 1401(item)

作为 ``contract.inputs?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1401``—``1401`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:45659:45676:FUNCTION

.. rubric:: ``edges.map callback @ 1413``

.. code-block:: javascript

   edges.map callback @ 1413(edge)

作为 ``edges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1413``—``1413`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46503:46593:FUNCTION

.. rubric:: ``( parameter.targets || [] ).map callback @ 1436``

.. code-block:: javascript

   ( parameter.targets || [] ).map callback @ 1436(target)

作为 ``( parameter.targets || [] ).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1436``—``1439`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46694:46718:FUNCTION

.. rubric:: ``graph.nodes.filter callback @ 1445``

.. code-block:: javascript

   graph.nodes.filter callback @ 1445(node)

作为 ``graph.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1445``—``1445`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46859:46972:FUNCTION

.. rubric:: ``[ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback @ 1449``

.. code-block:: javascript

   [ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback @ 1449(region)

作为 ``[ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1449``—``1452`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``region.nodeIds.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:46929:46961:FUNCTION

.. rubric:: ``region.nodeIds.map callback @ 1451``

.. code-block:: javascript

   region.nodeIds.map callback @ 1451(key)

作为 ``region.nodeIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1451``—``1451`` 行；所属函数 ``[ ...(graph.executionRegions || []), ...(inner.executionRegions || []), ].map callback @ 1449``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapping.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47040:47059:FUNCTION

.. rubric:: ``(graph.outputNodes || []).filter callback @ 1454``

.. code-block:: javascript

   (graph.outputNodes || []).filter callback @ 1454(key)

作为 ``(graph.outputNodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1454``—``1454`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47151:47168:FUNCTION

.. rubric:: ``children.map callback @ 1459``

.. code-block:: javascript

   children.map callback @ 1459(node)

作为 ``children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1459``—``1459`` 行；所属函数 ``unwrapWorkflowSubgraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47415:47621:FUNCTION

.. rubric:: ``leafCount``

.. code-block:: javascript

   leafCount(value)

实现 ``leafCount`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1472``—``1480`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.nodes.reduce``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47450:47605:FUNCTION

.. rubric:: ``value.nodes.reduce callback @ 1474``

.. code-block:: javascript

   value.nodes.reduce callback @ 1474(total, node)

作为 ``value.nodes.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1474``—``1478`` 行；所属函数 ``leafCount``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leafCount``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47669:47796:FUNCTION

.. rubric:: ``Object.entries(runtime).map callback @ 1481``

.. code-block:: javascript

   Object.entries(runtime).map callback @ 1481([id, state])

作为 ``Object.entries(runtime).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1481``—``1485`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``[id, state]``
   调用方传入的 ``id, state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``id.split``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:47983:48034:FUNCTION

.. rubric:: ``entries.find callback @ 1491``

.. code-block:: javascript

   entries.find callback @ 1491(state)

作为 ``entries.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1491``—``1491`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``state.nodePath.join``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48127:48267:FUNCTION

.. rubric:: ``entries.filter callback @ 1496``

.. code-block:: javascript

   entries.filter callback @ 1496(state)

作为 ``entries.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1496``—``1498`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nodePath.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48219:48266:FUNCTION

.. rubric:: ``nodePath.every callback @ 1498``

.. code-block:: javascript

   nodePath.every callback @ 1498(part, index)

作为 ``nodePath.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1498``—``1498`` 行；所属函数 ``entries.filter callback @ 1496``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48293:48383:FUNCTION

.. rubric:: ``count``

.. code-block:: javascript

   count(statuses)

实现 ``count`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1500``—``1501`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``statuses``
   调用方传入的 ``statuses`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``descendants.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:48333:48375:FUNCTION

.. rubric:: ``descendants.filter callback @ 1501``

.. code-block:: javascript

   descendants.filter callback @ 1501(value)

作为 ``descendants.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1501``—``1501`` 行；所属函数 ``count``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``statuses.includes``。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49043:49068:FUNCTION

.. rubric:: ``descendants .find callback @ 1522``

.. code-block:: javascript

   descendants .find callback @ 1522(state)

作为 ``descendants .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1522``—``1522`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49158:49184:FUNCTION

.. rubric:: ``descendants .map callback @ 1525``

.. code-block:: javascript

   descendants .map callback @ 1525(state)

作为 ``descendants .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1525``—``1525`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49373:49400:FUNCTION

.. rubric:: ``descendants .map callback @ 1531``

.. code-block:: javascript

   descendants .map callback @ 1531(state)

作为 ``descendants .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1531``—``1531`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49546:49597:FUNCTION

.. rubric:: ``descendants .filter callback @ 1538``

.. code-block:: javascript

   descendants .filter callback @ 1538(state)

作为 ``descendants .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1538``—``1538`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/workflowModel.js:49612:49634:FUNCTION

.. rubric:: ``descendants .filter((state) => state.status === "failed" && state.error) .map callback @ 1539``

.. code-block:: javascript

   descendants .filter((state) => state.status === "failed" && state.error) .map callback @ 1539(state)

作为 ``descendants .filter((state) => state.status === "failed" && state.error) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1539``—``1539`` 行；所属函数 ``workflowRuntimeForGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
