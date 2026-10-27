src/features/comfyui/graphModel 模块
================================================================================

.. js:module:: src/features/comfyui/graphModel

Save visual positions beside the API prompt, preserving all original UI metadata.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/graphModel.js``
* **模块标识**：``src/features/comfyui/graphModel``
* **顶层函数/组件/Hook**：12
* **类**：0
* **局部函数与匿名回调**：17

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:353:526:FUNCTION

.. js:function:: fieldSummary(value)

   实现 ``fieldSummary`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``14`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(text ?? "").replace(/\s+/g, " ").slice(0, 120)``。

   **主要协作调用**：``JSON.stringify``、``(text ?? "").replace(/\s+/g, " ").slice``、``(text ?? "").replace``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:526:1192:FUNCTION

.. js:function:: defaultBinding(node, field)

   实现 ``defaultBinding`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``16``—``38`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ name: (/^[A-Za-z_]/.test(identifier) ? identifier : \x60input_${identifier}\x60 ).slice(0, 100), label: \x60${node.title || node.classType} · ${field.name}\x60, description: "", nodeId: Str…``。

   **主要协作调用**：``field.name.toLowerCase``、``["integer", "number", "boolean"].includes``、``/image/.test``、``/video/.test``、``\x60${field.name}_${node.id}\x60.replace``、``(/^[A-Za-z_]/.test(identifier) ? identifier : \x60input_${identifier}\x60 ).slice``、``/^[A-Za-z_]/.test``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1192:1491:FUNCTION

.. js:function:: inputKindsForField(field)

   实现 ``inputKindsForField`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``40``—``48`` 行。

   **参数**

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``INPUT_KINDS.filter((kind) => allowed.includes(kind.value))``。

   **主要协作调用**：``INPUT_KINDS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1491:2684:FUNCTION

.. js:function:: withNodePositions(uiWorkflow, diagramNodes)

   Save visual positions beside the API prompt, preserving all original UI metadata.

   **性质**：同步函数；导出 API；源码第 ``51``—``87`` 行。

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

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2684:3500:FUNCTION

.. js:function:: applyUiLayout(graph, uiWorkflow)

   应用与 ``Ui Layout`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``89``—``117`` 行。

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

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3500:3934:FUNCTION

.. js:function:: logicalInputs(bindings)

   实现 ``logicalInputs`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``119``—``132`` 行。

   **参数**

   ``bindings`` （默认值 ``[]``）
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[...groups.values()]``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``bindings.forEach``、``groups.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3934:4192:FUNCTION

.. js:function:: defaultModeForBinding(binding)

   实现 ``defaultModeForBinding`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``134``—``140`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``["original", "fixed", "random"].includes(binding.defaultMode) ? binding.defaultMode : Object.hasOwn(binding, "default") && binding.default !== undefined ? "fixed" : "original"``。

   **主要协作调用**：``["original", "fixed", "random"].includes``、``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4192:4835:FUNCTION

.. js:function:: normalizeDefaultPolicy(binding)

   规范化与 ``Default Policy`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``142``—``164`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next``。

   **主要协作调用**：``Object.keys``、``Number.isFinite``、``defaultModeForBinding``、``["integer", "number"].includes``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4835:5173:FUNCTION

.. js:function:: initialRunValues(bindings)

   实现 ``initialRunValues`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``166``—``178`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.fromEntries( logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map((binding) => [ binding.name, binding.ki…``。

   **主要协作调用**：``Object.fromEntries``、``logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map``、``logicalInputs(bindings) .filter``、``logicalInputs``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5173:5584:FUNCTION

.. js:function:: defaultPolicyHint(binding)

   实现 ``defaultPolicyHint`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``180``—``189`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60新任务由后端在 ${binding.randomMin ?? 0} ～ ${binding.randomMax ?? 4294967295} 范围内随机生成一次；同一参数的各个字段共用该值，重试保留本次值。\x60``、``\x60默认使用固定值：${fieldSummary(binding.default)}。开启填写可覆盖本次输入。\x60``、``binding.required ? "此参数必填，请填写本次输入。" : "保留工作流中的原值；开启填写可覆盖本次输入。"``。

   **主要协作调用**：``defaultModeForBinding``、``fieldSummary``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5584:6917:FUNCTION

.. js:function:: updateBinding(bindings, nodeId, field, patch)

   Shared parameters keep one label, kind and requirement across all target fields.

   **性质**：同步函数；导出 API；源码第 ``192``—``226`` 行。

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

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6917:8145:FUNCTION

.. js:function:: buildRunInputs(bindings, values)

   构造与 ``Run Inputs`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``228``—``258`` 行。

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

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1449:1487:FUNCTION

.. rubric:: ``INPUT_KINDS.filter callback @ 47``

.. code-block:: javascript

   INPUT_KINDS.filter callback @ 47(kind)

作为 ``INPUT_KINDS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``inputKindsForField``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.includes``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1704:1813:FUNCTION

.. rubric:: ``diagramNodes .filter callback @ 55``

.. code-block:: javascript

   diagramNodes .filter callback @ 55(node)

作为 ``diagramNodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``57`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:1834:1876:FUNCTION

.. rubric:: ``diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 59``

.. code-block:: javascript

   diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback @ 59(node)

作为 ``diagramNodes .filter( (node) => Number.isFinite(node.position?.x) && Number.isFinite(node.position?.y), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2001:2026:FUNCTION

.. rubric:: ``previous.map callback @ 62``

.. code-block:: javascript

   previous.map callback @ 62(node)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2059:2200:FUNCTION

.. rubric:: ``previous.map callback @ 63``

.. code-block:: javascript

   previous.map callback @ 63(node)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``66`` 行；所属函数 ``withNodePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``position ? { ...node, pos: [position.x, position.y] } : node``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.get``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2223:2351:FUNCTION

.. rubric:: ``positions.forEach callback @ 67``

.. code-block:: javascript

   positions.forEach callback @ 67(position, id)

作为 ``positions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``70`` 行；所属函数 ``withNodePositions``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``existing.has``、``id.includes``、``nodes.push``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2561:2648:FUNCTION

.. rubric:: ``[...positions].map callback @ 79``

.. code-block:: javascript

   [...positions].map callback @ 79([id, position])

作为 ``[...positions].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``82`` 行；所属函数 ``withNodePositions``。

**参数**

``[id, position]``
   调用方传入的 ``id, position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2810:2953:FUNCTION

.. rubric:: ``(uiWorkflow?.nodes || []) .filter callback @ 93``

.. code-block:: javascript

   (uiWorkflow?.nodes || []) .filter callback @ 93(node)

作为 ``(uiWorkflow?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``96`` 行；所属函数 ``applyUiLayout``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``node.pos.slice(0, 2).every``、``node.pos.slice``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:2974:3037:FUNCTION

.. rubric:: ``(uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev… callback @ 98``

.. code-block:: javascript

   (uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev… callback @ 98(node)

实现 ``(uiWorkflow?.nodes || []) .filter( (node) => Array.isArray(node.pos) && node.pos.length >= 2 && node.pos.slice(0, 2).ev…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``applyUiLayout``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3105:3289:FUNCTION

.. rubric:: ``Object.entries(uiWorkflow?._cwm?.positions || {}).forEach callback @ 100``

.. code-block:: javascript

   Object.entries(uiWorkflow?._cwm?.positions || {}).forEach callback @ 100([id, pos])

作为 ``Object.entries(uiWorkflow?._cwm?.positions || {}).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``107`` 行；所属函数 ``applyUiLayout``。

**参数**

``[id, pos]``
   调用方传入的 ``id, pos`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``、``pos.slice(0, 2).every``、``pos.slice``、``positions.set``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3360:3485:FUNCTION

.. rubric:: ``graph.nodes.map callback @ 111``

.. code-block:: javascript

   graph.nodes.map callback @ 111(node)

作为 ``graph.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``114`` 行；所属函数 ``applyUiLayout``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.has``、``String``、``positions.get``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:3596:3899:FUNCTION

.. rubric:: ``bindings.forEach callback @ 121``

.. code-block:: javascript

   bindings.forEach callback @ 121(binding)

作为 ``bindings.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``121``—``130`` 行；所属函数 ``logicalInputs``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``groups.get``、``previous.targets.push``、``groups.set``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:4953:5050:FUNCTION

.. rubric:: ``logicalInputs(bindings) .filter callback @ 170``

.. code-block:: javascript

   logicalInputs(bindings) .filter callback @ 170(binding)

作为 ``logicalInputs(bindings) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``170``—``171`` 行；所属函数 ``initialRunValues``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``defaultModeForBinding``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5071:5164:FUNCTION

.. rubric:: ``logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map callback @ 173``

.. code-block:: javascript

   logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map callback @ 173(binding)

作为 ``logicalInputs(bindings) .filter( (binding) => binding.required && defaultModeForBinding(binding) === "original", ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``173``—``176`` 行；所属函数 ``initialRunValues``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:5770:5862:FUNCTION

.. rubric:: ``bindings.find callback @ 194``

.. code-block:: javascript

   bindings.find callback @ 194(binding)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``194``—``195`` 行；所属函数 ``updateBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6005:6045:FUNCTION

.. rubric:: ``bindings.find callback @ 200``

.. code-block:: javascript

   bindings.find callback @ 200(binding)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``updateBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/graphModel.js:6689:6913:FUNCTION

.. rubric:: ``bindings.map callback @ 220``

.. code-block:: javascript

   bindings.map callback @ 220(binding)

作为 ``bindings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``220``—``225`` 行；所属函数 ``updateBinding``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``、``{ ...next, nodeId: binding.nodeId, field: binding.field }``、``binding``。

**主要协作调用**：``Object.hasOwn``。
