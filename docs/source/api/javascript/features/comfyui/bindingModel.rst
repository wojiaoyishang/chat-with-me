src/features/comfyui/bindingModel 模块
================================================================================

.. js:module:: src/features/comfyui/bindingModel

Form editing can contain partial numeric strings. Only serialize valid, typed defaults, so an empty/invalid number never silently becomes 0 or null.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/bindingModel.js``
* **模块标识**：``src/features/comfyui/bindingModel``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``./graphModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:133:530:FUNCTION

.. js:function:: fieldTargets(node, field)

   实现 ``fieldTargets`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``16`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``field.readonly ? [] : field.targets || []``、``field.linked || field.valueType === "json" ? [] : [{ nodeId: String(node.id), field: field.name }]``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:548:656:FUNCTION

.. js:function:: isTarget(binding, target)

   判断与 ``Target`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``20`` 行。

   **参数**

   ``binding``
      调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:657:1160:FUNCTION

.. js:function:: fieldBindingState(bindings, node, field)

   实现 ``fieldBindingState`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``22``—``36`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ targets, entries, complete, mixed, binding: entries.length && !mixed ? entries[0] : null, }``。

   **主要协作调用**：``fieldTargets``、``targets .map((target) => bindings.find((binding) => isTarget(binding, target))) .filter``、``targets .map``、``entries.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1160:1834:FUNCTION

.. js:function:: setFieldBinding(bindings, node, field, enabled, shared)

   设置与 ``Field Binding`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``38``—``56`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``enabled``
      调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``shared`` （默认值 ``null``）
      调用方传入的 ``shared`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``bindings``、``rest``、``[ ...rest, ...targets.map((target) => ({ ...prototype, nodeId: String(target.nodeId), field: target.field, })), ]``。

   **显式抛出**：``new Error("所选参数类型不适用于这个字段。")``。

   **主要协作调用**：``fieldBindingState``、``bindings.filter``、``defaultBinding``、``inputKindsForField(field).some``、``inputKindsForField``、``targets.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1834:2057:FUNCTION

.. js:function:: updateFieldBinding(bindings, node, field, patch)

   更新与 ``Field Binding`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``58``—``64`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``patch``
      调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fieldTargets(node, field).reduce( (current, target) => updateBinding(current, target.nodeId, target.field, patch), bindings, )``。

   **主要协作调用**：``fieldTargets(node, field).reduce``、``fieldTargets``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2057:2462:FUNCTION

.. js:function:: reusableParameters(bindings, node, field)

   实现 ``reusableParameters`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``66``—``76`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``logicalInputs(bindings).filter( (binding) => kinds.has(binding.kind) && binding.targets.some( (target) => !targets.some((own) => isTarget(target, own)), ), )``。

   **主要协作调用**：``inputKindsForField(field).map``、``inputKindsForField``、``fieldBindingState``、``logicalInputs(bindings).filter``、``logicalInputs``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2462:2867:FUNCTION

.. js:function:: numericValue(value, label, integer)

   实现 ``numericValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``78``—``90`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``label``
      调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``integer`` （默认值 ``false``）
      调用方传入的 ``integer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **显式抛出**：``new Error(\x60“${label}”需要有效数字。\x60)``、``new Error( \x60“${label}”需要${integer ? "安全范围内的整数" : "有限数字"}。\x60, )``。

   **主要协作调用**：``["string", "number"].includes``、``String(value).trim``、``String``、``Number``、``Number.isFinite``、``Number.isSafeInteger``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2867:4607:FUNCTION

.. js:function:: prepareBindingsForSave(bindings)

   Form editing can contain partial numeric strings. Only serialize valid, typed defaults, so an empty/invalid number never silently becomes 0 or null.

   **性质**：同步函数；导出 API；源码第 ``94``—``140`` 行。

   **参数**

   ``bindings``
      调用方传入的 ``bindings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``bindings.map((binding) => { const result = Object.fromEntries( Object.entries(binding).filter(([, value]) => value !== undefined), ); const mode = defaultModeForBinding(binding);…``。

   **主要协作调用**：``bindings.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:798:863:FUNCTION

.. rubric:: ``targets .map callback @ 25``

.. code-block:: javascript

   targets .map callback @ 25(target)

作为 ``targets .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``fieldBindingState``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bindings.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:824:862:FUNCTION

.. rubric:: ``bindings.find callback @ 25``

.. code-block:: javascript

   bindings.find callback @ 25(binding)

作为 ``bindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``targets .map callback @ 25``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isTarget``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:999:1020:FUNCTION

.. rubric:: ``entries.map callback @ 28``

.. code-block:: javascript

   entries.map callback @ 28(entry)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``fieldBindingState``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1387:1451:FUNCTION

.. rubric:: ``bindings.filter callback @ 42``

.. code-block:: javascript

   bindings.filter callback @ 42(item)

作为 ``bindings.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``setFieldBinding``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``targets.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1416:1450:FUNCTION

.. rubric:: ``targets.some callback @ 42``

.. code-block:: javascript

   targets.some callback @ 42(target)

作为 ``targets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``bindings.filter callback @ 42``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isTarget``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1595:1634:FUNCTION

.. rubric:: ``inputKindsForField(field).some callback @ 46``

.. code-block:: javascript

   inputKindsForField(field).some callback @ 46(kind)

作为 ``inputKindsForField(field).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``setFieldBinding``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1720:1825:FUNCTION

.. rubric:: ``targets.map callback @ 50``

.. code-block:: javascript

   targets.map callback @ 50(target)

作为 ``targets.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``50``—``54`` 行；所属函数 ``setFieldBinding``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:1945:2035:FUNCTION

.. rubric:: ``fieldTargets(node, field).reduce callback @ 60``

.. code-block:: javascript

   fieldTargets(node, field).reduce callback @ 60(current, target)

作为 ``fieldTargets(node, field).reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``61`` 行；所属函数 ``updateFieldBinding``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateBinding``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2173:2193:FUNCTION

.. rubric:: ``inputKindsForField(field).map callback @ 67``

.. code-block:: javascript

   inputKindsForField(field).map callback @ 67(kind)

作为 ``inputKindsForField(field).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``reusableParameters``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2301:2454:FUNCTION

.. rubric:: ``logicalInputs(bindings).filter callback @ 70``

.. code-block:: javascript

   logicalInputs(bindings).filter callback @ 70(binding)

作为 ``logicalInputs(bindings).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``74`` 行；所属函数 ``reusableParameters``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``kinds.has``、``binding.targets.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2379:2445:FUNCTION

.. rubric:: ``binding.targets.some callback @ 73``

.. code-block:: javascript

   binding.targets.some callback @ 73(target)

作为 ``binding.targets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``logicalInputs(bindings).filter callback @ 70``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``targets.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:2414:2444:FUNCTION

.. rubric:: ``targets.some callback @ 73``

.. code-block:: javascript

   targets.some callback @ 73(own)

作为 ``targets.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``binding.targets.some callback @ 73``。

**参数**

``own``
   调用方传入的 ``own`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isTarget``。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:3101:4603:FUNCTION

.. rubric:: ``bindings.map callback @ 95``

.. code-block:: javascript

   bindings.map callback @ 95(binding)

作为 ``bindings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``139`` 行；所属函数 ``prepareBindingsForSave``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**显式抛出**：``new Error(\x60请设置“${label}”的默认值。\x60)``、``new Error(\x60请选择“${label}”的默认附件。\x60)``、``new Error("只有数字参数支持默认随机整数。")``、``new Error(\x60“${label}”的随机最小值不能大于最大值。\x60)``、``new Error(\x60“${label}”的默认取值方式无效。\x60)``。

**主要协作调用**：``Object.fromEntries``、``Object.entries(binding).filter``、``Object.entries``、``defaultModeForBinding``、``Object.hasOwn``、``["integer", "number"].includes``、``numericValue``、``["image", "video"].includes``、``/^cwm:\/\/artifact\/[^/?#]+$/.test``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/bindingModel.js:3192:3226:FUNCTION

.. rubric:: ``Object.entries(binding).filter callback @ 97``

.. code-block:: javascript

   Object.entries(binding).filter callback @ 97([, value])

作为 ``Object.entries(binding).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``bindings.map callback @ 95``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
