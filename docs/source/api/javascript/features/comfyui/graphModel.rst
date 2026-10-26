src/features/comfyui/graphModel 模块
================================================================================

.. js:module:: src/features/comfyui/graphModel

API files have no layout. Compute columns from dependencies, without altering links.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/graphModel.js``
* **模块标识**：``src/features/comfyui/graphModel``
* **顶层函数/组件/Hook**：14
* **类**：0
* **局部函数与匿名回调**：29

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:250:423:FUNCTION

.. js:function:: fieldSummary(value)

   实现 ``fieldSummary`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``10``—``13`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(text ?? "").replace(/\s+/g, " ").slice(0, 120)``。

   **主要协作调用**：``JSON.stringify``、``(text ?? "").replace(/\s+/g, " ").slice``、``(text ?? "").replace``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:423:1089:FUNCTION

.. js:function:: defaultBinding(node, field)

   实现 ``defaultBinding`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``15``—``37`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ name: (/^[A-Za-z_]/.test(identifier) ? identifier : \x60input_${identifier}\x60 ).slice(0, 100), label: \x60${node.title || node.classType} · ${field.name}\x60, description: "", nodeId: Str…``。

   **主要协作调用**：``field.name.toLowerCase``、``["integer", "number", "boolean"].includes``、``/image/.test``、``/video/.test``、``\x60${field.name}_${node.id}\x60.replace``、``(/^[A-Za-z_]/.test(identifier) ? identifier : \x60input_${identifier}\x60 ).slice``、``/^[A-Za-z_]/.test``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1089:1388:FUNCTION

.. js:function:: inputKindsForField(field)

   实现 ``inputKindsForField`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``39``—``47`` 行。

   **参数**

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``INPUT_KINDS.filter((kind) => allowed.includes(kind.value))``。

   **主要协作调用**：``INPUT_KINDS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1388:2901:FUNCTION

.. js:function:: layoutGraph(nodes, edges, usePositions)

   API files have no layout. Compute columns from dependencies, without altering links.

   **性质**：同步函数；导出 API；源码第 ``50``—``86`` 行。

   **参数**

   ``nodes`` （默认值 ``[]``）
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``edges`` （默认值 ``[]``）
      调用方传入的 ``edges`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``usePositions`` （默认值 ``false``）
      调用方传入的 ``usePositions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nodes.map((node) => ({ ...node, position: node.position || { x: 0, y: 0 }, }))``、``nodes.map((node) => { const column = levels.get(String(node.id)); const row = rows.get(column) || 0; rows.set(column, row + 1); return { ...node, position: { x: column * 300, y: r…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``nodes.map``、``edges.forEach``、``[...incoming.entries()] .filter(([, count]) => count === 0) .map``、``[...incoming.entries()] .filter``、``incoming.entries``、``downstream.get(id).forEach``、``downstream.get``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2901:3381:FUNCTION

.. js:function:: reconcileDiagramNodes(current, next, resetPositions)

   Keep user-arranged positions when selection or parameter badges are refreshed.

   **性质**：同步函数；导出 API；源码第 ``89``—``101`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``next``
      调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``resetPositions`` （默认值 ``false``）
      调用方传入的 ``resetPositions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next.map((node) => { const old = previous.get(String(node.id)); return old ? { ...old, ...node, position: resetPositions ? node.position : old.position, } : node; })``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``current.map``、``next.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3381:4574:FUNCTION

.. js:function:: withNodePositions(uiWorkflow, diagramNodes)

   Save visual positions beside the API prompt, preserving all original UI metadata.

   **性质**：同步函数；导出 API；源码第 ``104``—``140`` 行。

   **参数**

   ``uiWorkflow``
      调用方传入的 ``uiWorkflow`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``diagramNodes``
      调用方传入的 ``diagramNodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...(uiWorkflow || {}), nodes, _cwm: { ...uiWorkflow?._cwm, positions: { ...uiWorkflow?._cwm?.positions, ...Object.fromEntries( [...positions].map(([id, position]) => [ id, [posi…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map``、``diagramNodes .filter``、``Array.isArray``、``previous.map``、``positions.forEach``、``Object.fromEntries``、``[...positions].map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4574:5390:FUNCTION

.. js:function:: applyUiLayout(graph, uiWorkflow)

   应用与 ``Ui Layout`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``142``—``170`` 行。

   **参数**

   ``graph``
      调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``uiWorkflow``
      调用方传入的 ``uiWorkflow`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...graph, uiWorkflow, nodes: graph.nodes.map((node) => positions.has(String(node.id)) ? { ...node, position: positions.get(String(node.id)) } : node, ), }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``(uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev…``、``(uiWorkflow?.nodes || []) .filter``、``Object.entries(uiWorkflow?._cwm?.positions || {}).forEach``、``Object.entries``、``graph.nodes.map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5390:5824:FUNCTION

.. js:function:: logicalInputs(bindings)

   实现 ``logicalInputs`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``172``—``185`` 行。

   **参数**

   ``bindings`` （默认值 ``[]``）
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[...groups.values()]``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``bindings.forEach``、``groups.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5824:6082:FUNCTION

.. js:function:: defaultModeForBinding(binding)

   实现 ``defaultModeForBinding`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``187``—``193`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``["original", "fixed", "random"].includes(binding.defaultMode) ? binding.defaultMode : Object.hasOwn(binding, "default") && binding.default !== undefined ? "fixed" : "original"``。

   **主要协作调用**：``["original", "fixed", "random"].includes``、``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6082:6725:FUNCTION

.. js:function:: normalizeDefaultPolicy(binding)

   规范化与 ``Default Policy`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``195``—``217`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next``。

   **主要协作调用**：``Object.keys``、``Number.isFinite``、``defaultModeForBinding``、``["integer", "number"].includes``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6725:7063:FUNCTION

.. js:function:: initialRunValues(bindings)

   实现 ``initialRunValues`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``219``—``231`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.fromEntries( logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map((binding) => [ binding.name, binding.ki…``。

   **主要协作调用**：``Object.fromEntries``、``logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map``、``logicalInputs(bindings) .filter``、``logicalInputs``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:7063:7474:FUNCTION

.. js:function:: defaultPolicyHint(binding)

   实现 ``defaultPolicyHint`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``233``—``242`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60新任务由后端在 ${binding.randomMin ?? 0} ～ ${binding.randomMax ?? 4294967295} 范围内随机生成一次；同一参数的各个字段共用该值，重试保留本次值。\x60``、``\x60默认使用固定值：${fieldSummary(binding.default)}。开启填写可覆盖本次输入。\x60``、``binding.required ? "此参数必填，请填写本次输入。" : "保留工作流中的原值；开启填写可覆盖本次输入。"``。

   **主要协作调用**：``defaultModeForBinding``、``fieldSummary``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:7474:8807:FUNCTION

.. js:function:: updateBinding(bindings, nodeId, field, patch)

   Shared parameters keep one label, kind and requirement across all target fields.

   **性质**：同步函数；导出 API；源码第 ``245``—``279`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nodeId``
      目标对象的公共或运行时标识。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``patch``
      调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``bindings``、``bindings.map((binding) => { if (binding === current) return next; if (!Object.hasOwn(patch, "name") && binding.name === current.name) return { ...next, nodeId: binding.nodeId, fie…``。

   **主要协作调用**：``bindings.find``、``Object.hasOwn``、``normalizeDefaultPolicy``、``bindings.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:8807:10035:FUNCTION

.. js:function:: buildRunInputs(bindings, values)

   构造与 ``Run Inputs`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``281``—``311`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``values``
      调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **显式抛出**：``new Error(\x60请填写“${binding.label || binding.name}”。\x60)``、``new Error(\x60请选择“${binding.label || binding.name}”。\x60)``、``new Error(\x60“${binding.label || binding.name}”需要有效数字。\x60)``、``new Error( \x60“${binding.label || binding.name}”需要安全范围内的整数。\x60, )``。

   **主要协作调用**：``logicalInputs``、``Object.hasOwn``、``defaultModeForBinding``、``["image", "video"].includes``、``["integer", "number"].includes``、``Number.isFinite``、``Number``、``Number.isSafeInteger``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1346:1384:FUNCTION

.. rubric:: ``INPUT_KINDS.filter callback @ 46``

.. code-block:: javascript

   INPUT_KINDS.filter callback @ 46(kind)

作为 ``INPUT_KINDS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``inputKindsForField``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.includes``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1599:1682:FUNCTION

.. rubric:: ``nodes.map callback @ 52``

.. code-block:: javascript

   nodes.map callback @ 52(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``52``—``55`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1717:1742:FUNCTION

.. rubric:: ``nodes.map callback @ 56``

.. code-block:: javascript

   nodes.map callback @ 56(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1785:1816:FUNCTION

.. rubric:: ``nodes.map callback @ 57``

.. code-block:: javascript

   nodes.map callback @ 57(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1857:1887:FUNCTION

.. rubric:: ``nodes.map callback @ 58``

.. code-block:: javascript

   nodes.map callback @ 58(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1926:1956:FUNCTION

.. rubric:: ``nodes.map callback @ 59``

.. code-block:: javascript

   nodes.map callback @ 59(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1976:2216:FUNCTION

.. rubric:: ``edges.forEach callback @ 60``

.. code-block:: javascript

   edges.forEach callback @ 60(edge)

作为 ``edges.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``67`` 行；所属函数 ``layoutGraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``ids.has``、``downstream.get(source).push``、``downstream.get``、``incoming.set``、``incoming.get``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2271:2297:FUNCTION

.. rubric:: ``[...incoming.entries()] .filter callback @ 69``

.. code-block:: javascript

   [...incoming.entries()] .filter callback @ 69([, count])

作为 ``[...incoming.entries()] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``layoutGraph``。

**参数**

``[, count]``
   调用方传入的 ``, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2308:2320:FUNCTION

.. rubric:: ``[...incoming.entries()] .filter(([, count]) => count === 0) .map callback @ 70``

.. code-block:: javascript

   [...incoming.entries()] .filter(([, count]) => count === 0) .map callback @ 70([id])

作为 ``[...incoming.entries()] .filter(([, count]) => count === 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``layoutGraph``。

**参数**

``[id]``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2441:2643:FUNCTION

.. rubric:: ``downstream.get(id).forEach callback @ 73``

.. code-block:: javascript

   downstream.get(id).forEach callback @ 73(target)

作为 ``downstream.get(id).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``77`` 行；所属函数 ``layoutGraph``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``levels.set``、``Math.max``、``levels.get``、``incoming.set``、``incoming.get``、``queue.push``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2695:2897:FUNCTION

.. rubric:: ``nodes.map callback @ 80``

.. code-block:: javascript

   nodes.map callback @ 80(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``80``—``85`` 行；所属函数 ``layoutGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...node, position: { x: column * 300, y: row * 210 } }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``levels.get``、``String``、``rows.get``、``rows.set``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3107:3140:FUNCTION

.. rubric:: ``current.map callback @ 90``

.. code-block:: javascript

   current.map callback @ 90(node)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``reconcileDiagramNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3162:3377:FUNCTION

.. rubric:: ``next.map callback @ 91``

.. code-block:: javascript

   next.map callback @ 91(node)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``100`` 行；所属函数 ``reconcileDiagramNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``old ? { ...old, ...node, position: resetPositions ? node.position : old.position, } : node``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``previous.get``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3594:3703:FUNCTION

.. rubric:: ``diagramNodes .filter callback @ 108``

.. code-block:: javascript

   diagramNodes .filter callback @ 108(node)

作为 ``diagramNodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``110`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3724:3766:FUNCTION

.. rubric:: ``diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 112``

.. code-block:: javascript

   diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 112(node)

作为 ``diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3891:3916:FUNCTION

.. rubric:: ``previous.map callback @ 115``

.. code-block:: javascript

   previous.map callback @ 115(node)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3949:4090:FUNCTION

.. rubric:: ``previous.map callback @ 116``

.. code-block:: javascript

   previous.map callback @ 116(node)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``119`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``position ? { ...node, pos: [position.x, position.y] } : node``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.get``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4113:4241:FUNCTION

.. rubric:: ``positions.forEach callback @ 120``

.. code-block:: javascript

   positions.forEach callback @ 120(position, id)

作为 ``positions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``123`` 行；所属函数 ``withNodePositions``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``existing.has``、``id.includes``、``nodes.push``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4451:4538:FUNCTION

.. rubric:: ``[...positions].map callback @ 132``

.. code-block:: javascript

   [...positions].map callback @ 132([id, position])

作为 ``[...positions].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``132``—``135`` 行；所属函数 ``withNodePositions``。

**参数**

``[id, position]``
   调用方传入的 ``id, position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4700:4843:FUNCTION

.. rubric:: ``(uiWorkflow?.nodes || []) .filter callback @ 146``

.. code-block:: javascript

   (uiWorkflow?.nodes || []) .filter callback @ 146(node)

作为 ``(uiWorkflow?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``149`` 行；所属函数 ``applyUiLayout``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``node.pos.slice(0, 2).every``、``node.pos.slice``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4864:4927:FUNCTION

.. rubric:: ``(uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev… callback @ 151``

.. code-block:: javascript

   (uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev… callback @ 151(node)

实现 ``(uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``applyUiLayout``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4995:5179:FUNCTION

.. rubric:: ``Object.entries(uiWorkflow?._cwm?.positions || {}).forEach callback @ 153``

.. code-block:: javascript

   Object.entries(uiWorkflow?._cwm?.positions || {}).forEach callback @ 153([id, pos])

作为 ``Object.entries(uiWorkflow?._cwm?.positions || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``153``—``160`` 行；所属函数 ``applyUiLayout``。

**参数**

``[id, pos]``
   调用方传入的 ``id, pos`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``pos.slice(0, 2).every``、``pos.slice``、``positions.set``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5250:5375:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 164``

.. code-block:: javascript

   graph.nodes.map callback @ 164(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``164``—``167`` 行；所属函数 ``applyUiLayout``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.has``、``String``、``positions.get``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5486:5789:FUNCTION

.. rubric:: ``bindings.forEach callback @ 174``

.. code-block:: javascript

   bindings.forEach callback @ 174(binding)

作为 ``bindings.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``174``—``183`` 行；所属函数 ``logicalInputs``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``groups.get``、``previous.targets.push``、``groups.set``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6843:6940:FUNCTION

.. rubric:: ``logicalInputs(bindings) .filter callback @ 223``

.. code-block:: javascript

   logicalInputs(bindings) .filter callback @ 223(binding)

作为 ``logicalInputs(bindings) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``223``—``224`` 行；所属函数 ``initialRunValues``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``defaultModeForBinding``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6961:7054:FUNCTION

.. rubric:: ``logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map callback @ 226``

.. code-block:: javascript

   logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map callback @ 226(binding)

作为 ``logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``226``—``229`` 行；所属函数 ``initialRunValues``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:7660:7752:FUNCTION

.. rubric:: ``bindings.find callback @ 247``

.. code-block:: javascript

   bindings.find callback @ 247(binding)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``247``—``248`` 行；所属函数 ``updateBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:7895:7935:FUNCTION

.. rubric:: ``bindings.find callback @ 253``

.. code-block:: javascript

   bindings.find callback @ 253(binding)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``updateBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:8579:8803:FUNCTION

.. rubric:: ``bindings.map callback @ 273``

.. code-block:: javascript

   bindings.map callback @ 273(binding)

作为 ``bindings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``278`` 行；所属函数 ``updateBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``、``{ ...next, nodeId: binding.nodeId, field: binding.field }``、``binding``。

**主要协作调用**：``Object.hasOwn``。
