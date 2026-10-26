src/features/workflows/WorkflowSubgraphPanel 模块
======================================================================================================

.. js:module:: src/features/workflows/WorkflowSubgraphPanel

Public interfaces describe bindings; schemas always derive from child nodes.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSubgraphPanel.jsx``
* **模块标识**：``src/features/workflows/WorkflowSubgraphPanel``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：75

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/MultilineEditor.jsx``、``./WorkflowDataField.jsx``、``./workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:432:570:FUNCTION

.. js:function:: keyFor(values, prefix)

   实现 ``keyFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``18`` 行。

   **参数**

   ``values``
      调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``prefix``
      调用方传入的 ``prefix`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${prefix}_${i}\x60``。

   **主要协作调用**：``values.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:571:22655:FUNCTION

.. js:function:: WorkflowSubgraphPanel({ node, graph, definitions, context = [], onGraphChange, disabled, onEnter, onSaveTemplate, onUpdat…)

   Public interfaces describe bindings; schemas always derive from child nodes.

   **性质**：同步函数；导出 API；源码第 ``21``—``644`` 行。

   **参数**

   ``{ node, graph, definitions, context = [], onGraphChange, disabled, onEnter, onSaveTemplate, onUpdat…``
      调用方传入的 ``node, graph, definitions, context = , onGraphChange, disabled, onEnter, onSaveTemplate, onUpdat…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-3"> {nodeHeader} <h3 className="font-semibold">子图待配置</h3> <p className="text-sm text-muted-foreground"> 请在画布中的子图节点选择“新建子图”或“复制模板”，并手动确认。 确认后即可进入子图编辑内部节点，…``、``( <div className="space-y-5"> <section className="space-y-3"> {nodeHeader || <h3 className="font-semibold">子图设置</h3>} <Input aria-label="节点名称" value={node.name || ""} disabled={di…``。

   **主要协作调用**：``inner.nodes.flatMap``、``[ ...new Set([ ...(execution.branchOrder || []), ...inner.nodes.map((child) => child.id), ]), ].filter``、``inner.nodes.map``、``order.map``、``portSection``、``(contract.parameters || []).map``、``parameterOptions.some``。

   **内部回调数量**：19。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:489:531:FUNCTION

.. rubric:: ``values.some callback @ 16``

.. code-block:: javascript

   values.some callback @ 16(value)

作为 ``values.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``keyFor``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1057:1315:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(patch, nextGraph, boundary)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``41``—``51`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextGraph`` （默认值 ``graph``）
   调用方传入的 ``nextGraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``boundary``
   调用方传入的 ``boundary`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onGraphChange``、``nextGraph.nodes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1202:1272:FUNCTION

.. rubric:: ``nextGraph.nodes.map callback @ 46``

.. code-block:: javascript

   nextGraph.nodes.map callback @ 46(item)

作为 ``nextGraph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``47`` 行；所属函数 ``update``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1341:1404:FUNCTION

.. rubric:: ``updateSubgraph``

.. code-block:: javascript

   updateSubgraph(patch)

更新与 ``Subgraph`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``52``—``53`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1430:1571:FUNCTION

.. rubric:: ``updateContract``

.. code-block:: javascript

   updateContract(key, values, patch)

更新与 ``Contract`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``54``—``58`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch`` （默认值 ``{}``）
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1598:2200:FUNCTION

.. rubric:: ``endpointOptions``

.. code-block:: javascript

   endpointOptions(direction)

实现 ``endpointOptions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``75`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inner.nodes.flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1638:2199:FUNCTION

.. rubric:: ``inner.nodes.flatMap callback @ 60``

.. code-block:: javascript

   inner.nodes.flatMap callback @ 60(child)

实现 ``inner.nodes.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``75`` 行；所属函数 ``endpointOptions``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``(definition?.[direction] || []).map((port) => ({ value: \x60${child.id}\u0000${port.name}\x60, nodeId: child.id, port: port.name, schema: port.schema || {}, label: \x60${child.name || defi…``。

**主要协作调用**：``effectiveWorkflowDefinition``、``catalogNode``、``(definition?.[direction] || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:1910:2191:FUNCTION

.. rubric:: ``(definition?.[direction] || []).map callback @ 68``

.. code-block:: javascript

   (definition?.[direction] || []).map callback @ 68(port)

作为 ``(definition?.[direction] || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``74`` 行；所属函数 ``inner.nodes.flatMap callback @ 60``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:2249:2720:FUNCTION

.. rubric:: ``inner.nodes.flatMap callback @ 76``

.. code-block:: javascript

   inner.nodes.flatMap callback @ 76(child)

实现 ``inner.nodes.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``86`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Object.entries(schema.properties || {}).map(([field, property]) => ({ value: \x60${child.id}\u0000${field}\x60, nodeId: child.id, field, schema: resolveWorkflowSchema(property, schema),…``。

**主要协作调用**：``catalogNode``、``Object.entries(schema.properties || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:2420:2714:FUNCTION

.. rubric:: ``Object.entries(schema.properties || {}).map callback @ 79``

.. code-block:: javascript

   Object.entries(schema.properties || {}).map callback @ 79([field, property])

作为 ``Object.entries(schema.properties || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``85`` 行；所属函数 ``inner.nodes.flatMap callback @ 76``。

**参数**

``[field, property]``
   调用方传入的 ``field, property`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveWorkflowSchema``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:2849:3203:FUNCTION

.. rubric:: ``assignedParameter``

.. code-block:: javascript

   assignedParameter(option, exceptIndex, exceptBinding)

实现 ``assignedParameter`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``100`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``exceptIndex`` （默认值 ``-1``）
   调用方传入的 ``exceptIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``exceptBinding`` （默认值 ``-1``）
   调用方传入的 ``exceptBinding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(contract.parameters || []).some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:2937:3196:FUNCTION

.. rubric:: ``(contract.parameters || []).some callback @ 93``

.. code-block:: javascript

   (contract.parameters || []).some callback @ 93(parameter, index)

作为 ``(contract.parameters || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``99`` 行；所属函数 ``assignedParameter``。

**参数**

``parameter``
   调用方传入的 ``parameter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(parameter.targets || []).some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:2996:3187:FUNCTION

.. rubric:: ``(parameter.targets || []).some callback @ 95``

.. code-block:: javascript

   (parameter.targets || []).some callback @ 95(target, bindingIndex)

作为 ``(parameter.targets || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``98`` 行；所属函数 ``(contract.parameters || []).some callback @ 93``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``bindingIndex``
   调用方传入的 ``bindingIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3305:3324:FUNCTION

.. rubric:: ``inner.nodes.map callback @ 104``

.. code-block:: javascript

   inner.nodes.map callback @ 104(child)

作为 ``inner.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3346:3398:FUNCTION

.. rubric:: ``[ ...new Set([ ...(execution.branchOrder || []), ...inner.nodes.map((child) => child.id), ]), ].filter callback @ 106``

.. code-block:: javascript

   [ ...new Set([ ...(execution.branchOrder || []), ...inner.nodes.map((child) => child.id), ]), ].filter callback @ 106(id)

作为 ``[ ...new Set([ ...(execution.branchOrder || []), ...inner.nodes.map((child) => child.id), ]), ].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inner.nodes.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3371:3397:FUNCTION

.. rubric:: ``inner.nodes.some callback @ 106``

.. code-block:: javascript

   inner.nodes.some callback @ 106(child)

作为 ``inner.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``[ ...new Set([ ...(execution.branchOrder || []), ...inner.nodes.map((child) => child.id), ]), ].filter callback @ 106``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3421:3755:FUNCTION

.. rubric:: ``renamePort``

.. code-block:: javascript

   renamePort(direction, index, name)

实现 ``renamePort`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``107``—``119`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``/^[A-Za-z0-9_-]{1,64}$/.test``、``contract[direction].some``、``updateContract``、``contract[direction].map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3537:3583:FUNCTION

.. rubric:: ``contract[direction].some callback @ 110``

.. code-block:: javascript

   contract[direction].some callback @ 110(item, i)

作为 ``contract[direction].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``renamePort``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3672:3734:FUNCTION

.. rubric:: ``contract[direction].map callback @ 115``

.. code-block:: javascript

   contract[direction].map callback @ 115(value, i)

作为 ``contract[direction].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``116`` 行；所属函数 ``renamePort``。

**参数**

``value``
   待读取、转换或校验的值。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3777:4545:FUNCTION

.. rubric:: ``removePort``

.. code-block:: javascript

   removePort(direction, index)

移除与 ``Port`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``120``—``142`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(parentInterface[direction] || []).some``、``graph.edges.some``、``updateContract``、``contract[direction].filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:3903:4093:FUNCTION

.. rubric:: ``(parentInterface[direction] || []).some callback @ 123``

.. code-block:: javascript

   (parentInterface[direction] || []).some callback @ 123(binding)

作为 ``(parentInterface[direction] || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``127`` 行；所属函数 ``removePort``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``endpoint?.nodeId === node.id && endpoint.port === entry.id``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:4121:4297:FUNCTION

.. rubric:: ``graph.edges.some callback @ 128``

.. code-block:: javascript

   graph.edges.some callback @ 128(edge)

作为 ``graph.edges.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``131`` 行；所属函数 ``removePort``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:4493:4514:FUNCTION

.. rubric:: ``contract[direction].filter callback @ 139``

.. code-block:: javascript

   contract[direction].filter callback @ 139(_, i)

作为 ``contract[direction].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``removePort``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:4568:9469:FUNCTION

.. rubric:: ``portSection``

.. code-block:: javascript

   portSection(direction, label)

实现 ``portSection`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``143``—``278`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-3"> <h4 className="text-sm font-semibold">公开{label}</h4> {entries.map((entry, index) => { const connected = (parentInterface[direction] || []).some((…``。

**主要协作调用**：``endpointOptions``、``entries.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:4879:8505:FUNCTION

.. rubric:: ``entries.map callback @ 150``

.. code-block:: javascript

   entries.map callback @ 150(entry, index)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``247`` 行；所属函数 ``portSection``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-2 rounded-lg border p-3" key={\x60${direction}-${index}\x60} > <Input aria-label={\x60${label} ${index + 1} 名称\x60} value={entry.title || ""} disabled={disabled} onC…``。

**主要协作调用**：``(parentInterface[direction] || []).some``、``graph.edges.some``、``options.some``、``options.map``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:4979:5193:FUNCTION

.. rubric:: ``(parentInterface[direction] || []).some callback @ 152``

.. code-block:: javascript

   (parentInterface[direction] || []).some callback @ 152(binding)

作为 ``(parentInterface[direction] || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``156`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``endpoint?.nodeId === node.id && endpoint.port === entry.id``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:5227:5421:FUNCTION

.. rubric:: ``graph.edges.some callback @ 157``

.. code-block:: javascript

   graph.edges.some callback @ 157(edge)

作为 ``graph.edges.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``160`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:5848:6142:FUNCTION

.. rubric:: ``onChange callback @ 172``

.. code-block:: javascript

   onChange callback @ 172(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``180`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateContract``、``entries.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:5956:6098:FUNCTION

.. rubric:: ``entries.map callback @ 175``

.. code-block:: javascript

   entries.map callback @ 175(item, i)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``175``—``178`` 行；所属函数 ``onChange callback @ 172``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:6395:6695:FUNCTION

.. rubric:: ``onChange callback @ 188``

.. code-block:: javascript

   onChange callback @ 188(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``188``—``196`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateContract``、``entries.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:6503:6651:FUNCTION

.. rubric:: ``entries.map callback @ 191``

.. code-block:: javascript

   entries.map callback @ 191(item, i)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``191``—``194`` 行；所属函数 ``onChange callback @ 188``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:6905:6982:FUNCTION

.. rubric:: ``onChange callback @ 203``

.. code-block:: javascript

   onChange callback @ 203(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``203``—``204`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renamePort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:7257:7599:FUNCTION

.. rubric:: ``onChange callback @ 212``

.. code-block:: javascript

   onChange callback @ 212(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``212``—``220`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.value.split``、``updateContract``、``entries.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:7444:7536:FUNCTION

.. rubric:: ``entries.map callback @ 216``

.. code-block:: javascript

   entries.map callback @ 216(item, i)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``217`` 行；所属函数 ``onChange callback @ 212``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:7648:7685:FUNCTION

.. rubric:: ``options.some callback @ 222``

.. code-block:: javascript

   options.some callback @ 222(option)

作为 ``options.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:7803:7964:FUNCTION

.. rubric:: ``options.map callback @ 225``

.. code-block:: javascript

   options.map callback @ 225(option)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``225``—``229`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:8145:8179:FUNCTION

.. rubric:: ``onClick callback @ 235``

.. code-block:: javascript

   onClick callback @ 235()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``entries.map callback @ 150``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removePort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:8640:9352:FUNCTION

.. rubric:: ``onClick callback @ 252``

.. code-block:: javascript

   onClick callback @ 252()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``252``—``271`` 行；所属函数 ``portSection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``options.find``、``updateContract``、``workflowId``、``keyFor``、``option.label.split(" · ").slice(1).join``、``option.label.split(" · ").slice``、``option.label.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:8688:8915:FUNCTION

.. rubric:: ``options.find callback @ 254``

.. code-block:: javascript

   options.find callback @ 254(candidate)

作为 ``options.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``254``—``259`` 行；所属函数 ``onClick callback @ 252``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``entries.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:8748:8896:FUNCTION

.. rubric:: ``entries.some callback @ 256``

.. code-block:: javascript

   entries.some callback @ 256(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``256``—``258`` 行；所属函数 ``options.find callback @ 254``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:10062:10109:FUNCTION

.. rubric:: ``onChange callback @ 298``

.. code-block:: javascript

   onChange callback @ 298(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``298``—``298`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:10284:10358:FUNCTION

.. rubric:: ``onChange callback @ 305``

.. code-block:: javascript

   onChange callback @ 305(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``305``—``306`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:11496:11619:FUNCTION

.. rubric:: ``onChange callback @ 346``

.. code-block:: javascript

   onChange callback @ 346(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``346``—``349`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:12041:12167:FUNCTION

.. rubric:: ``onChange callback @ 361``

.. code-block:: javascript

   onChange callback @ 361(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``361``—``364`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:12348:13714:FUNCTION

.. rubric:: ``order.map callback @ 370``

.. code-block:: javascript

   order.map callback @ 370(id, index)

作为 ``order.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``405`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inner.nodes.find``、``[-1, 1].map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:12635:12661:FUNCTION

.. rubric:: ``inner.nodes.find callback @ 377``

.. code-block:: javascript

   inner.nodes.find callback @ 377(child)

作为 ``inner.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``377``—``377`` 行；所属函数 ``order.map callback @ 370``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:12729:13677:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 379``

.. code-block:: javascript

   [-1, 1].map callback @ 379(offset)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``379``—``403`` 行；所属函数 ``order.map callback @ 370``。

**参数**

``offset``
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:13034:13417:FUNCTION

.. rubric:: ``onClick callback @ 386``

.. code-block:: javascript

   onClick callback @ 386()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``386``—``395`` 行；所属函数 ``[-1, 1].map callback @ 379``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSubgraph``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:14090:21598:FUNCTION

.. rubric:: ``(contract.parameters || []).map callback @ 416``

.. code-block:: javascript

   (contract.parameters || []).map callback @ 416(parameter, index)

作为 ``(contract.parameters || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``416``—``610`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``parameter``
   调用方传入的 ``parameter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-2 rounded-lg border p-3" key={index}> <Input aria-label={\x60公开参数 ${index + 1} 名称\x60} value={parameter.title || ""} disabled={disabled} onChange={(event) => m…``。

**主要协作调用**：``parameterOptions.find``、``(parameter.targets || []).map``、``parameterOptions.some``、``Object.hasOwn``。

**内部回调数量**：11。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:14208:14333:FUNCTION

.. rubric:: ``parameterOptions.find callback @ 419``

.. code-block:: javascript

   parameterOptions.find callback @ 419(option)

作为 ``parameterOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``419``—``421`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:14374:14619:FUNCTION

.. rubric:: ``modify``

.. code-block:: javascript

   modify(patch, extra)

实现 ``modify`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``423``—``430`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``extra`` （默认值 ``{}``）
   调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateContract``、``contract.parameters.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:14492:14566:FUNCTION

.. rubric:: ``contract.parameters.map callback @ 426``

.. code-block:: javascript

   contract.parameters.map callback @ 426(entry, i)

作为 ``contract.parameters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``426``—``427`` 行；所属函数 ``modify``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:14895:14943:FUNCTION

.. rubric:: ``onChange callback @ 437``

.. code-block:: javascript

   onChange callback @ 437(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``437``—``437`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modify``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:15179:15251:FUNCTION

.. rubric:: ``onChange callback @ 444``

.. code-block:: javascript

   onChange callback @ 444(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``444``—``445`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modify``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:15445:18444:FUNCTION

.. rubric:: ``(parameter.targets || []).map callback @ 451``

.. code-block:: javascript

   (parameter.targets || []).map callback @ 451(binding, bindingIndex)

作为 ``(parameter.targets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``451``—``518`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``bindingIndex``
   调用方传入的 ``bindingIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parameterOptions .filter( (option) => !assignedParameter(option, index, bindingIndex) && (parameter.targets.length ===…``、``parameterOptions .filter``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:15854:17176:FUNCTION

.. rubric:: ``onChange callback @ 458``

.. code-block:: javascript

   onChange callback @ 458(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``458``—``486`` 行；所属函数 ``(parameter.targets || []).map callback @ 451``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.value.split``、``parameterOptions.find``、``modify``、``parameter.targets.map``、``clone``、``inner.nodes.find``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:16040:16153:FUNCTION

.. rubric:: ``parameterOptions.find callback @ 462``

.. code-block:: javascript

   parameterOptions.find callback @ 462(option)

作为 ``parameterOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``462``—``463`` 行；所属函数 ``onChange callback @ 458``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:16461:16549:FUNCTION

.. rubric:: ``parameter.targets.map callback @ 470``

.. code-block:: javascript

   parameter.targets.map callback @ 470(entry, i)

作为 ``parameter.targets.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``470``—``471`` 行；所属函数 ``onChange callback @ 458``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:16772:16839:FUNCTION

.. rubric:: ``inner.nodes.find callback @ 477``

.. code-block:: javascript

   inner.nodes.find callback @ 477(child)

作为 ``inner.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``onChange callback @ 458``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:17266:17554:FUNCTION

.. rubric:: ``parameterOptions .filter callback @ 490``

.. code-block:: javascript

   parameterOptions .filter callback @ 490(option)

作为 ``parameterOptions .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``490``—``494`` 行；所属函数 ``(parameter.targets || []).map callback @ 451``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``assignedParameter``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:17607:17792:FUNCTION

.. rubric:: ``parameterOptions .filter( (option) => !assignedParameter(option, index, bindingIndex) && (parameter.targets.length ===… callback @ 496``

.. code-block:: javascript

   parameterOptions .filter( (option) => !assignedParameter(option, index, bindingIndex) && (parameter.targets.length ===… callback @ 496(option)

实现 ``parameterOptions .filter( (option) => !assignedParameter(option, index, bindingIndex) && (parameter.targets.length ===…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``496``—``500`` 行；所属函数 ``(parameter.targets || []).map callback @ 451``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:18082:18285:FUNCTION

.. rubric:: ``onClick callback @ 507``

.. code-block:: javascript

   onClick callback @ 507()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``507``—``512`` 行；所属函数 ``(parameter.targets || []).map callback @ 451``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modify``、``parameter.targets.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:18177:18232:FUNCTION

.. rubric:: ``parameter.targets.filter callback @ 510``

.. code-block:: javascript

   parameter.targets.filter callback @ 510(_, i)

作为 ``parameter.targets.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``510``—``510`` 行；所属函数 ``onClick callback @ 507``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:18656:18806:FUNCTION

.. rubric:: ``parameterOptions.some callback @ 526``

.. code-block:: javascript

   parameterOptions.some callback @ 526(option)

作为 ``parameterOptions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``526``—``528`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``assignedParameter``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:18871:19395:FUNCTION

.. rubric:: ``onClick callback @ 531``

.. code-block:: javascript

   onClick callback @ 531()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``531``—``544`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parameterOptions.find``、``modify``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:18937:19087:FUNCTION

.. rubric:: ``parameterOptions.find callback @ 533``

.. code-block:: javascript

   parameterOptions.find callback @ 533(option)

作为 ``parameterOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``533``—``535`` 行；所属函数 ``onClick callback @ 531``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``assignedParameter``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:19855:19984:FUNCTION

.. rubric:: ``onChange callback @ 557``

.. code-block:: javascript

   onChange callback @ 557(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``557``—``560`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:20315:20394:FUNCTION

.. rubric:: ``onClick callback @ 570``

.. code-block:: javascript

   onClick callback @ 570()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``570``—``571`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``modify``、``clone``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:20728:20899:FUNCTION

.. rubric:: ``onClick callback @ 582``

.. code-block:: javascript

   onClick callback @ 582()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``582``—``586`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:21131:21448:FUNCTION

.. rubric:: ``onClick callback @ 595``

.. code-block:: javascript

   onClick callback @ 595()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``595``—``603`` 行；所属函数 ``(contract.parameters || []).map callback @ 416``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateContract``、``contract.parameters.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:21354:21375:FUNCTION

.. rubric:: ``contract.parameters.filter callback @ 600``

.. code-block:: javascript

   contract.parameters.filter callback @ 600(_, i)

作为 ``contract.parameters.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``600``—``600`` 行；所属函数 ``onClick callback @ 595``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:21745:21783:FUNCTION

.. rubric:: ``parameterOptions.some callback @ 616``

.. code-block:: javascript

   parameterOptions.some callback @ 616(option)

作为 ``parameterOptions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``616``—``616`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``assignedParameter``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:21816:22536:FUNCTION

.. rubric:: ``onClick callback @ 618``

.. code-block:: javascript

   onClick callback @ 618()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``618``—``636`` 行；所属函数 ``WorkflowSubgraphPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parameterOptions.find``、``updateContract``、``workflowId``、``keyFor``、``clone``、``inner.nodes.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:21873:21934:FUNCTION

.. rubric:: ``parameterOptions.find callback @ 620``

.. code-block:: javascript

   parameterOptions.find callback @ 620(candidate)

作为 ``parameterOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``620``—``620`` 行；所属函数 ``onClick callback @ 618``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``assignedParameter``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphPanel.jsx:22288:22325:FUNCTION

.. rubric:: ``inner.nodes.find callback @ 630``

.. code-block:: javascript

   inner.nodes.find callback @ 630(child)

作为 ``inner.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``630``—``630`` 行；所属函数 ``onClick callback @ 618``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
