src/features/tools/toolPermissions 模块
==================================================================================

.. js:module:: src/features/tools/toolPermissions

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tools/toolPermissions.js``
* **模块标识**：``src/features/tools/toolPermissions``
* **顶层函数/组件/Hook**：16
* **类**：0
* **局部函数与匿名回调**：27

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:76:120:FUNCTION

.. js:function:: getToolPermissionKey(tool)

   读取与 ``Tool Permission Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``3``—``3`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:314:599:FUNCTION

.. js:function:: getToolCallableIdentity(tool)

   读取与 ``Tool Callable Identity`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``7``—``12`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60permission:${getToolPermissionKey(tool)}\x60``、``JSON.stringify([ref.source, ref.toolset, ref.name])``、``tool?.accessPath || tool?.name || ''``。

   **主要协作调用**：``getToolPermissionKey``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:643:1430:FUNCTION

.. js:function:: collectToolPermissionUsage(items)

   实现 ``collectToolPermissionUsage`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``14``—``31`` 行。

   **参数**

   ``items`` （默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``usage``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:1468:1660:FUNCTION

.. js:function:: getToolCatalogCounts(items)

   读取与 ``Tool Catalog Counts`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``33``—``36`` 行。

   **参数**

   ``items`` （默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{tools: [...usage.values()].reduce((sum, item) => sum + item.identities.size, 0), permissions: usage.size}``。

   **主要协作调用**：``collectToolPermissionUsage``、``[...usage.values()].reduce``、``usage.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:1705:1877:FUNCTION

.. js:function:: getSharedToolPermissionText(tool, usage)

   读取与 ``Shared Tool Permission Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``38``—``41`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``usage``
      调用方传入的 ``usage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``entry?.identities.size > 1 ? \x60共享权限${entry.label ? \x60 · ${entry.label}\x60 : ''}\x60 : ''``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``usage.get``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:1991:2129:FUNCTION

.. js:function:: getToolDisplayName(tool, fallback)

   读取与 ``Tool Display Name`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``44``—``45`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback`` （默认值 ``'工具'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[tool?.text, tool?.title, tool?.name].find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:2174:2633:FUNCTION

.. js:function:: applyBulkToolPermissionMode(permissions, tools, mode)

   应用与 ``Bulk Tool Permission Mode`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``47``—``58`` 行。

   **参数**

   ``permissions`` （默认值 ``{}``）
      调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``tools`` （默认值 ``[]``）
      调用方传入的 ``tools`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next``。

   **主要协作调用**：``MODES.includes``、``getToolPermissionKey``、``Array.isArray``、``allowedModes.includes``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:2678:2883:FUNCTION

.. js:function:: normalizeToolPermissionMode(value, fallback)

   规范化与 ``Tool Permission Mode`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``60``—``64`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback`` （默认值 ``'ask'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value ? 'allow' : 'deny'``、``MODES.includes(mode) ? mode : fallback``。

   **主要协作调用**：``String(value || '').toLowerCase``、``String``、``MODES.includes``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:2925:3108:FUNCTION

.. js:function:: getToolPermissionAliases(tool)

   读取与 ``Tool Permission Aliases`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``66``—``69`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[ tool?.name, ...(Array.isArray(tool?.permissionAliases) ? tool.permissionAliases : []), ].filter``、``Array.isArray``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:3296:3902:FUNCTION

.. js:function:: readToolPermission(tool, ...sources)

   实现 ``readToolPermission`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``73``—``86`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``...sources`` （剩余参数）
      调用方传入的 ``sources`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``source[key]``、``modes.includes('deny') ? 'deny' : modes.includes('ask') ? 'ask' : 'allow'``、``undefined``。

   **主要协作调用**：``getToolPermissionKey``、``getToolPermissionAliases(tool) .map(name => source?.[name]) .filter``、``getToolPermissionAliases(tool) .map``、``getToolPermissionAliases``、``aliases.map``、``modes.includes``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:3944:4230:FUNCTION

.. js:function:: readSharedToolPermission(tool, usage, ...sources)

   实现 ``readSharedToolPermission`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``88``—``93`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``usage``
      调用方传入的 ``usage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``...sources`` （剩余参数）
      调用方传入的 ``sources`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``readToolPermission({...tool, permissionAliases: [...new Set([ ...getToolPermissionAliases(tool), ...peers.flatMap(getToolPermissionAliases), ])]}, ...sources)``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``usage.get``、``getToolPermissionKey``、``readToolPermission``、``getToolPermissionAliases``、``peers.flatMap``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:4279:5110:FUNCTION

.. js:function:: deduplicateToolPermissionGroups(groups)

   实现 ``deduplicateToolPermissionGroups`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``95``—``116`` 行。

   **参数**

   ``groups`` （默认值 ``[]``）
      调用方传入的 ``groups`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result.filter(group => group.tools.length > 0)``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``groups.map``、``groups.forEach``、``result.filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:5155:6274:FUNCTION

.. js:function:: collectToolPermissionGroups(items)

   实现 ``collectToolPermissionGroups`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``118``—``145`` 行。

   **参数**

   ``items`` （默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``deduplicateToolPermissionGroups(groups)``。

   **主要协作调用**：``visit``、``deduplicateToolPermissionGroups``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:6475:7408:FUNCTION

.. js:function:: deduplicateToolPermissionItems(items)

   实现 ``deduplicateToolPermissionItems`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``149``—``173`` 行。

   **参数**

   ``items`` （默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(items)``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:7448:8759:FUNCTION

.. js:function:: collectToolPermissions(items, status)

   实现 ``collectToolPermissions`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``175``—``198`` 行。

   **参数**

   ``items`` （默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   ``status`` （默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.fromEntries([...records].map(([key, entries]) => { const tool = entries[0].tool; const canonical = entries.find(entry => entry.current?.[key] !== undefined); const legacy =…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``visit``、``Object.fromEntries``、``[...records].map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8805:9544:FUNCTION

.. js:function:: applyToolPermissionsToStatus(items, status, permissions)

   应用与 ``Tool Permissions To Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``200``—``217`` 行。

   **参数**

   ``items`` （默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   ``status`` （默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``permissions`` （默认值 ``{}``）
      调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(items, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:708:1391:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(entries)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``16``—``28`` 行；所属函数 ``collectToolPermissionUsage``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``entries.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:736:1390:FUNCTION

.. rubric:: ``entries.forEach callback @ 16``

.. code-block:: javascript

   entries.forEach callback @ 16(item)

作为 ``entries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``16``—``28`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``visit(item.children || [])``、``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visit``、``getToolPermissionKey``、``usage.has``、``usage.set``、``usage.get``、``entry.identities.has``、``getToolCallableIdentity``、``entry.identities.add``、``entry.tools.push``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:1586:1627:FUNCTION

.. rubric:: ``[...usage.values()].reduce callback @ 35``

.. code-block:: javascript

   [...usage.values()].reduce callback @ 35(sum, item)

作为 ``[...usage.values()].reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``getToolCatalogCounts``。

**参数**

``sum``
   调用方传入的 ``sum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:2066:2116:FUNCTION

.. rubric:: ``[tool?.text, tool?.title, tool?.name].find callback @ 45``

.. code-block:: javascript

   [tool?.text, tool?.title, tool?.name].find callback @ 45(value)

作为 ``[tool?.text, tool?.title, tool?.name].find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``getToolDisplayName``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.trim``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:3054:3105:FUNCTION

.. rubric:: ``[ tool?.name, ...(Array.isArray(tool?.permissionAliases) ? tool.permissionAliases : []), ].filter callback @ 69``

.. code-block:: javascript

   [ tool?.name, ...(Array.isArray(tool?.permissionAliases) ? tool.permissionAliases : []), ].filter callback @ 69(name)

作为 ``[ tool?.name, ...(Array.isArray(tool?.permissionAliases) ? tool.permissionAliases : []), ].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``getToolPermissionAliases``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:3558:3580:FUNCTION

.. rubric:: ``getToolPermissionAliases(tool) .map callback @ 78``

.. code-block:: javascript

   getToolPermissionAliases(tool) .map callback @ 78(name)

作为 ``getToolPermissionAliases(tool) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``readToolPermission``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:3602:3648:FUNCTION

.. rubric:: ``getToolPermissionAliases(tool) .map(name => source?.[name]) .filter callback @ 79``

.. code-block:: javascript

   getToolPermissionAliases(tool) .map(name => source?.[name]) .filter callback @ 79(value)

作为 ``getToolPermissionAliases(tool) .map(name => source?.[name]) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``readToolPermission``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:3723:3766:FUNCTION

.. rubric:: ``aliases.map callback @ 81``

.. code-block:: javascript

   aliases.map callback @ 81(value)

作为 ``aliases.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``readToolPermission``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeToolPermissionMode``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:4357:4389:FUNCTION

.. rubric:: ``groups.map callback @ 97``

.. code-block:: javascript

   groups.map callback @ 97(group)

作为 ``groups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``deduplicateToolPermissionGroups``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:4411:5047:FUNCTION

.. rubric:: ``groups.forEach callback @ 98``

.. code-block:: javascript

   groups.forEach callback @ 98(group, index)

作为 ``groups.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``114`` 行；所属函数 ``deduplicateToolPermissionGroups``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(group.tools || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:4467:5039:FUNCTION

.. rubric:: ``(group.tools || []).forEach callback @ 99``

.. code-block:: javascript

   (group.tools || []).forEach callback @ 99(tool)

作为 ``(group.tools || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``99``—``113`` 行；所属函数 ``groups.forEach callback @ 98``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``getToolCallableIdentity``、``seen.get``、``getToolPermissionAliases``、``seen.set``、``result[index].tools.push``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:5075:5106:FUNCTION

.. rubric:: ``result.filter callback @ 115``

.. code-block:: javascript

   result.filter callback @ 115(group)

作为 ``result.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``deduplicateToolPermissionGroups``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:5214:6201:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(entries, group)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``142`` 行；所属函数 ``collectToolPermissionGroups``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``group`` （默认值 ``null``）
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``entries.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:5268:6193:FUNCTION

.. rubric:: ``entries.forEach callback @ 121``

.. code-block:: javascript

   entries.forEach callback @ 121(item)

作为 ``entries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``121``—``141`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``visit(item.children || [], group)``。

**主要协作调用**：``visit``、``getToolDisplayName``、``groups.push``、``getToolPermissionKey``、``groups.find``、``target.tools.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:5930:5963:FUNCTION

.. rubric:: ``groups.find callback @ 134``

.. code-block:: javascript

   groups.find callback @ 134(entry)

作为 ``groups.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``entries.forEach callback @ 121``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:6539:7380:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(entries)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``151``—``171`` 行；所属函数 ``deduplicateToolPermissionItems``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``entries.flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:6567:7379:FUNCTION

.. rubric:: ``entries.flatMap callback @ 151``

.. code-block:: javascript

   entries.flatMap callback @ 151(item)

实现 ``entries.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``151``—``171`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``[next]``、``children.length ? [{...item, children}] : []``、``[item]``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``getToolCallableIdentity``、``seen.has``、``seen.get``、``getToolPermissionAliases``、``seen.set``、``visit``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:7528:8022:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(entries, current)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``177``—``186`` 行；所属函数 ``collectToolPermissions``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``entries.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:7567:8021:FUNCTION

.. rubric:: ``entries.forEach callback @ 177``

.. code-block:: javascript

   entries.forEach callback @ 177(item)

作为 ``entries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``186`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``visit(item.children || [], current)``、``visit(item.children || [], current?.[item.name] || {})``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visit``、``getToolPermissionKey``、``records.has``、``records.set``、``records.get(key).push``、``records.get``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8097:8754:FUNCTION

.. rubric:: ``[...records].map callback @ 188``

.. code-block:: javascript

   [...records].map callback @ 188([key, entries])

作为 ``[...records].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``188``—``197`` 行；所属函数 ``collectToolPermissions``。

**参数**

``[key, entries]``
   调用方传入的 ``key, entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[key, normalizeToolPermissionMode(tool.locked ? tool.default : value)]``。

**主要协作调用**：``entries.find``、``entries.map(entry => readToolPermission(entry.tool, entry.current)).filter``、``entries.map``、``legacy.some``、``normalizeToolPermissionMode``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8196:8239:FUNCTION

.. rubric:: ``entries.find callback @ 190``

.. code-block:: javascript

   entries.find callback @ 190(entry)

作为 ``entries.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``[...records].map callback @ 188``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8277:8331:FUNCTION

.. rubric:: ``entries.map callback @ 191``

.. code-block:: javascript

   entries.map callback @ 191(entry)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``[...records].map callback @ 188``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readToolPermission``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8340:8368:FUNCTION

.. rubric:: ``entries.map(entry => readToolPermission(entry.tool, entry.current)).filter callback @ 191``

.. code-block:: javascript

   entries.map(entry => readToolPermission(entry.tool, entry.current)).filter callback @ 191(value)

作为 ``entries.map(entry => readToolPermission(entry.tool, entry.current)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``[...records].map callback @ 188``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8470:8522:FUNCTION

.. rubric:: ``legacy.some callback @ 193``

.. code-block:: javascript

   legacy.some callback @ 193(mode)

作为 ``legacy.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``[...records].map callback @ 188``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeToolPermissionMode``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8563:8614:FUNCTION

.. rubric:: ``legacy.some callback @ 194``

.. code-block:: javascript

   legacy.some callback @ 194(mode)

作为 ``legacy.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``194``—``194`` 行；所属函数 ``[...records].map callback @ 188``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeToolPermissionMode``。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8872:9508:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(entries, current)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``201``—``215`` 行；所属函数 ``applyToolPermissionsToStatus``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``current`` （默认值 ``{}``）
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``entries.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/toolPermissions.js:8959:9479:FUNCTION

.. rubric:: ``entries.forEach callback @ 203``

.. code-block:: javascript

   entries.forEach callback @ 203(item)

作为 ``entries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``203``—``213`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``readToolPermission``、``getToolPermissionKey``。
