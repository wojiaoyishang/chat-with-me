src/features/workspace/WorkspaceSettingsDialog 模块
==========================================================================================================

.. js:module:: src/features/workspace/WorkspaceSettingsDialog

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/WorkspaceSettingsDialog.jsx``
* **模块标识**：``src/features/workspace/WorkspaceSettingsDialog``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：99

主要依赖
--------------------------------------------------------------------------------

``./components/WorkspaceCommandEditor.jsx``、``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``@/components/ui/input``、``@/components/ui/label``、``@/components/ui/separator``、``@/components/ui/switch``、``@/components/ui/select``、``@/components/ui/DeleteConfirmDialog``、``./components/FolderBrowserDialog.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1695:1748:FUNCTION

.. js:function:: cloneValue(value)

   实现 ``cloneValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``62`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1778:1930:FUNCTION

.. js:function:: normalizeOperations(value)

   规范化与 ``Operations`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``67`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ACCESS_OPERATIONS.filter((item) => items.includes(item))``。

   **主要协作调用**：``Array.isArray``、``ACCESS_OPERATIONS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1959:2304:FUNCTION

.. js:function:: operationPresetFor(operations)

   实现 ``operationPresetFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``76`` 行。

   **参数**

   ``operations``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``key || 'all'``。

   **主要协作调用**：``normalizeOperations``、``Object.keys(OPERATION_PRESETS).find``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2334:3047:FUNCTION

.. js:function:: normalizeAccessRule(rule, index)

   规范化与 ``Access Rule`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``78``—``91`` 行。

   **参数**

   ``rule``
      调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``（默认值 ``0``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``、``Date.now``、``Math.random().toString(16).slice``、``Math.random().toString``、``Math.random``、``['path', 'glob', 'regex', 'exact'].includes``、``String(rule?.matcher?.pattern || '').replace``、``normalizeOperations``、``Array.isArray``、``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3075:3456:FUNCTION

.. js:function:: splitAccessPolicy(policy)

   实现 ``splitAccessPolicy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``100`` 行。

   **参数**

   ``policy``
      调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ defaultEffect: policy?.defaultEffect === 'deny' ? 'deny' : 'allow', deniedRules: rules.filter((rule) => rule.effect === 'deny' && rule.enabled), preservedRules: rules.filter((ru…``。

   **主要协作调用**：``(Array.isArray(policy?.rules) ? policy.rules : []).map``、``Array.isArray``、``rules.filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3487:3823:FUNCTION

.. js:function:: commandPolicyPayload(allowedCommandIds)

   实现 ``commandPolicyPayload`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``102``—``113`` 行。

   **参数**

   ``allowedCommandIds``
      调用方传入的 ``allowedCommandIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...allowedCommandIds].sort().map``、``[...allowedCommandIds].sort``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3843:4079:FUNCTION

.. js:function:: safeAlias(name, index)

   实现 ``safeAlias`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``122`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized || \x60mount-${index + 1}\x60``。

   **主要协作调用**：``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace(/^-+|-+$/g, '') .slice``、``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace``、``String(name || '') .normalize('NFKD') .replace``、``String(name || '') .normalize``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4106:4205:FUNCTION

.. js:function:: cleanDisplayPath(value)

   实现 ``cleanDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``127`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '') .replace(/\\\//g, '\\') .replace``、``String(value || '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4240:4338:FUNCTION

.. js:function:: workspacePermissionLabel(value)

   实现 ``workspacePermissionLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``129``—``130`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4372:65397:FUNCTION

.. js:function:: WorkspaceSettingsDialog({ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSel…)

   渲染 ``WorkspaceSettingsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``132``—``1146`` 行。

   **参数**

   ``{ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSel…``
      调用方传入的 ``open, onOpenChange, conversationId, selectedWorkspaceIds = , onWorkspaceChange, runWorkspaceSel…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="max-h-[92vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-3xl"> <DialogHe…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``String(editingId || '').startsWith``、``String``、``configuredCommands.filter``、``customRows.map((row) => row.id.trim()).filter``、``customRows.map``、``useMemo``、``useEffect``、``useCallback``、``t``、``workspaces.map``、``(selected.mounts || []).map``。

   **内部回调数量**：32。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1896:1926:FUNCTION

.. rubric:: ``ACCESS_OPERATIONS.filter callback @ 66``

.. code-block:: javascript

   ACCESS_OPERATIONS.filter callback @ 66(item)

作为 ``ACCESS_OPERATIONS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``normalizeOperations``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2086:2275:FUNCTION

.. rubric:: ``Object.keys(OPERATION_PRESETS).find callback @ 71``

.. code-block:: javascript

   Object.keys(OPERATION_PRESETS).find callback @ 71(item)

作为 ``Object.keys(OPERATION_PRESETS).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``71``—``74`` 行；所属函数 ``operationPresetFor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``candidate.length === normalized.length && candidate.every((operation) => normalized.includes(operation))``。

**主要协作调用**：``candidate.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2222:2267:FUNCTION

.. rubric:: ``candidate.every callback @ 73``

.. code-block:: javascript

   candidate.every callback @ 73(operation)

作为 ``candidate.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``Object.keys(OPERATION_PRESETS).find callback @ 71``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalized.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3308:3356:FUNCTION

.. rubric:: ``rules.filter callback @ 97``

.. code-block:: javascript

   rules.filter callback @ 97(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3396:3445:FUNCTION

.. rubric:: ``rules.filter callback @ 98``

.. code-block:: javascript

   rules.filter callback @ 98(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3602:3818:FUNCTION

.. rubric:: ``[...allowedCommandIds].sort().map callback @ 105``

.. code-block:: javascript

   [...allowedCommandIds].sort().map callback @ 105(commandId)

作为 ``[...allowedCommandIds].sort().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``112`` 行；所属函数 ``commandPolicyPayload``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5930:5987:FUNCTION

.. rubric:: ``configuredCommands.filter callback @ 163``

.. code-block:: javascript

   configuredCommands.filter callback @ 163(id)

作为 ``configuredCommands.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6042:6064:FUNCTION

.. rubric:: ``customRows.map callback @ 165``

.. code-block:: javascript

   customRows.map callback @ 165(row)

作为 ``customRows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.id.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6384:6573:FUNCTION

.. rubric:: ``useMemo callback @ 173``

.. code-block:: javascript

   useMemo callback @ 173()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``173``—``176`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...new Set(raw.map((item) => String(item || '').trim()).filter(Boolean))]``。

**主要协作调用**：``Array.isArray``、``raw.map((item) => String(item || '').trim()).filter``、``raw.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6512:6547:FUNCTION

.. rubric:: ``raw.map callback @ 175``

.. code-block:: javascript

   raw.map callback @ 175(item)

作为 ``raw.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``useMemo callback @ 173``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6634:6660:FUNCTION

.. rubric:: ``useMemo callback @ 177``

.. code-block:: javascript

   useMemo callback @ 177()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6707:6918:FUNCTION

.. rubric:: ``useMemo callback @ 178``

.. code-block:: javascript

   useMemo callback @ 178()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``182`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``focused``、``workspaces.find((item) => selectedIdSet.has(item.id)) || null``。

**主要协作调用**：``workspaces.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6755:6795:FUNCTION

.. rubric:: ``workspaces.find callback @ 179``

.. code-block:: javascript

   workspaces.find callback @ 179(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``useMemo callback @ 178``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6866:6902:FUNCTION

.. rubric:: ``workspaces.find callback @ 181``

.. code-block:: javascript

   workspaces.find callback @ 181(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``useMemo callback @ 178``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6985:7249:FUNCTION

.. rubric:: ``useEffect callback @ 184``

.. code-block:: javascript

   useEffect callback @ 184()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``184``—``188`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workspaces.some``、``workspaces.find``、``setFocusedWorkspaceId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7043:7083:FUNCTION

.. rubric:: ``workspaces.some callback @ 185``

.. code-block:: javascript

   workspaces.some callback @ 185(item)

作为 ``workspaces.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``185`` 行；所属函数 ``useEffect callback @ 184``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7131:7167:FUNCTION

.. rubric:: ``workspaces.find callback @ 186``

.. code-block:: javascript

   workspaces.find callback @ 186(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``useEffect callback @ 184``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7331:9384:FUNCTION

.. rubric:: ``useCallback callback @ 191``

.. code-block:: javascript

   async useCallback callback @ 191({ quiet = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``191``—``227`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``{ quiet = false }``（默认值 ``{}``）
   调用方传入的 ``quiet = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``encodeURIComponent``、``Promise.all``、``apiClient.get``、``Array.isArray``、``setWorkspaces``、``[...localWorkspaces, ...remoteWorkspaces].sort``、``setRoots``、``setDefaultAccessPolicy``、``cloneValue``、``setDefaultVisibilityPolicy``、``setQuickAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8404:8494:FUNCTION

.. rubric:: ``[...localWorkspaces, ...remoteWorkspaces].sort callback @ 206``

.. code-block:: javascript

   [...localWorkspaces, ...remoteWorkspaces].sort callback @ 206(a, b)

作为 ``[...localWorkspaces, ...remoteWorkspaces].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``206``—``207`` 行；所属函数 ``useCallback callback @ 191``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name || '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9437:10165:FUNCTION

.. rubric:: ``useEffect callback @ 231``

.. code-block:: javascript

   useEffect callback @ 231()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``231``—``246`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { unsubscribeConnection?.(); unsubscribeAccess?.(); window.clearInterval(timer); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``load``、``onEvent({ event: 'workspace.connection.status_changed' }).then``、``onEvent``、``onEvent({ event: 'workspace.access.changed' }).then``、``window.setInterval``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9599:9638:FUNCTION

.. rubric:: ``onEvent({ event: 'workspace.connection.status_changed' }).then callback @ 234``

.. code-block:: javascript

   onEvent({ event: 'workspace.connection.status_changed' }).then callback @ 234()

处理 ``onEvent({ event: 'workspace.connection.status_changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``234``—``235`` 行；所属函数 ``useEffect callback @ 231``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9737:9764:FUNCTION

.. rubric:: ``onEvent({ event: 'workspace.access.changed' }).then callback @ 237``

.. code-block:: javascript

   onEvent({ event: 'workspace.access.changed' }).then callback @ 237()

处理 ``onEvent({ event: 'workspace.access.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``useEffect callback @ 231``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9973:10000:FUNCTION

.. rubric:: ``window.setInterval callback @ 240``

.. code-block:: javascript

   window.setInterval callback @ 240()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``useEffect callback @ 231``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10025:10158:FUNCTION

.. rubric:: ``returned callback @ 241``

.. code-block:: javascript

   returned callback @ 241()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``245`` 行；所属函数 ``useEffect callback @ 231``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``unsubscribeConnection``、``unsubscribeAccess``、``window.clearInterval``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10220:11287:FUNCTION

.. rubric:: ``persistWorkspaceSelection``

.. code-block:: javascript

   async persistWorkspaceSelection(nextWorkspaceIds)

实现 ``persistWorkspaceSelection`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``248``—``275`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``nextWorkspaceIds``
   调用方传入的 ``nextWorkspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map((item) => String(item || '').trim()) .filter``、``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map``、``Array.isArray``、``onWorkspaceChange``、``runWorkspaceSelectionMutation``、``persist``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10400:10435:FUNCTION

.. rubric:: ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 252``

.. code-block:: javascript

   (Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 252(item)

作为 ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10663:10852:FUNCTION

.. rubric:: ``persist``

.. code-block:: javascript

   persist()

实现 ``persist`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``260``—``263`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11317:11674:FUNCTION

.. rubric:: ``toggleWorkspace``

.. code-block:: javascript

   async toggleWorkspace(workspaceId, checked)

切换与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``277``—``285`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(workspaceId || '').trim``、``String``、``selectedIds.filter``、``setFocusedWorkspaceId``、``persistWorkspaceSelection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11499:11520:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 281``

.. code-block:: javascript

   selectedIds.filter callback @ 281(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11560:11581:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 282``

.. code-block:: javascript

   selectedIds.filter callback @ 282(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``282``—``282`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11706:11926:FUNCTION

.. rubric:: ``applyAccessPolicy``

.. code-block:: javascript

   applyAccessPolicy(policy)

应用与 ``Access Policy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``287``—``292`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``policy``
   调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``splitAccessPolicy``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11952:12374:FUNCTION

.. rubric:: ``beginCreate``

.. code-block:: javascript

   beginCreate()

实现 ``beginCreate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``294``—``306`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setCommandProfile``、``setCustomRows``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12398:13301:FUNCTION

.. rubric:: ``beginEdit``

.. code-block:: javascript

   beginEdit(workspace)

实现 ``beginEdit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``308``—``325`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``Boolean``、``setMounts``、``(workspace.mounts || []).map``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setCommandProfile``、``setCustomRows``、``commandRows``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12601:12718:FUNCTION

.. rubric:: ``(workspace.mounts || []).map callback @ 313``

.. code-block:: javascript

   (workspace.mounts || []).map callback @ 313(item)

作为 ``(workspace.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``313``—``316`` 行；所属函数 ``beginEdit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13327:13767:FUNCTION

.. rubric:: ``stopEditing``

.. code-block:: javascript

   stopEditing()

停止与 ``Editing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``327``—``341`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``、``setVisibilityPolicy``、``setCommandProfile``、``setCustomRows``、``setConfiguredCommands``、``setAllowedCommands``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13790:14741:FUNCTION

.. rubric:: ``addMount``

.. code-block:: javascript

   addMount(folder)

新增与 ``Mount`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``343``—``366`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``mounts.some``、``toast.error``、``t``、``mounts.map``、``safeAlias``、``used.has``、``alias.toLowerCase``、``setMounts``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13843:13940:FUNCTION

.. rubric:: ``mounts.some callback @ 345``

.. code-block:: javascript

   mounts.some callback @ 345(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``345``—``345`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14118:14166:FUNCTION

.. rubric:: ``mounts.map callback @ 351``

.. code-block:: javascript

   mounts.map callback @ 351(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``351``—``351`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.alias || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14381:14733:FUNCTION

.. rubric:: ``setMounts callback @ 355``

.. code-block:: javascript

   setMounts callback @ 355(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``355``—``365`` 行；所属函数 ``addMount``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14772:14945:FUNCTION

.. rubric:: ``updateAccessRule``

.. code-block:: javascript

   updateAccessRule(index, patch)

更新与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``368``—``372`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14816:14927:FUNCTION

.. rubric:: ``setAccessRules callback @ 369``

.. code-block:: javascript

   setAccessRules callback @ 369(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``369``—``370`` 行；所属函数 ``updateAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14853:14926:FUNCTION

.. rubric:: ``current.map callback @ 370``

.. code-block:: javascript

   current.map callback @ 370(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``370`` 行；所属函数 ``setAccessRules callback @ 369``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14973:15909:FUNCTION

.. rubric:: ``addAccessRule``

.. code-block:: javascript

   addAccessRule(template)

新增与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``374``—``400`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``template``（默认值 ``null``）
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``accessRules.map``、``preservedAccessRules.map``、``normalizeAccessRule``、``accessRules.some``、``setAccessRules``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15100:15127:FUNCTION

.. rubric:: ``accessRules.map callback @ 378``

.. code-block:: javascript

   accessRules.map callback @ 378(item)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``378``—``378`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15174:15201:FUNCTION

.. rubric:: ``preservedAccessRules.map callback @ 379``

.. code-block:: javascript

   preservedAccessRules.map callback @ 379(item)

作为 ``preservedAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``379``—``379`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15635:15818:FUNCTION

.. rubric:: ``accessRules.some callback @ 394``

.. code-block:: javascript

   accessRules.some callback @ 394(item)

作为 ``accessRules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``394``—``397`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15870:15901:FUNCTION

.. rubric:: ``setAccessRules callback @ 399``

.. code-block:: javascript

   setAccessRules callback @ 399(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``399``—``399`` 行；所属函数 ``addAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15940:15985:FUNCTION

.. rubric:: ``resetAccessRules``

.. code-block:: javascript

   resetAccessRules()

重置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``402``—``402`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAccessPolicy``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16019:16700:FUNCTION

.. rubric:: ``validateAccessRules``

.. code-block:: javascript

   validateAccessRules()

校验与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``404``—``422`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``rule.matcher.pattern.trim``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16719:21024:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save()

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``424``—``516`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(editingId || '').startsWith``、``String``、``name.trim``、``toast.error``、``t``、``mounts.some``、``validateAccessRules``、``setSaving``、``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map``、``[...preservedAccessRules, ...accessRules] .sort``、``commandProfileFromRows``、``commandPolicyPayload``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17056:17129:FUNCTION

.. rubric:: ``mounts.some callback @ 430``

.. code-block:: javascript

   mounts.some callback @ 430(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias?.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17526:17583:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort callback @ 441``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort callback @ 441(left, right)

作为 ``[...preservedAccessRules, ...accessRules] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``441``—``441`` 行；所属函数 ``save``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17610:18124:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 442``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 442(item)

作为 ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``442``—``451`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...rule, name: rule.name || rule.matcher.pattern, enabled: rule.effect === 'deny' ? true : rule.enabled, matcher: { ...rule.matcher, pattern: rule.matcher.pattern.trim() }, oper…``。

**主要协作调用**：``rule.matcher.pattern.trim``、``normalizeOperations``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18558:18598:FUNCTION

.. rubric:: ``allowedCommands.filter callback @ 461``

.. code-block:: javascript

   allowedCommands.filter callback @ 461(id)

作为 ``allowedCommands.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``461``—``461`` 行；所属函数 ``save``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableCommandIds.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19153:19455:FUNCTION

.. rubric:: ``mounts.map callback @ 476``

.. code-block:: javascript

   mounts.map callback @ 476(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``476``—``482`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias.trim``、``Boolean``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19868:19908:FUNCTION

.. rubric:: ``allowedCommands.filter callback @ 491``

.. code-block:: javascript

   allowedCommands.filter callback @ 491(id)

作为 ``allowedCommands.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``491``—``491`` 行；所属函数 ``save``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableCommandIds.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20347:20540:FUNCTION

.. rubric:: ``setWorkspaces callback @ 501``

.. code-block:: javascript

   setWorkspaces callback @ 501(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``501``—``504`` 行；所属函数 ``save``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.sort((a, b) => a.name.localeCompare(b.name))``。

**主要协作调用**：``current.filter((item) => item.id !== saved.id).concat``、``current.filter``、``next.sort``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20406:20436:FUNCTION

.. rubric:: ``current.filter callback @ 502``

.. code-block:: javascript

   current.filter callback @ 502(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``502``—``502`` 行；所属函数 ``setWorkspaces callback @ 501``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20486:20524:FUNCTION

.. rubric:: ``next.sort callback @ 503``

.. code-block:: javascript

   next.sort callback @ 503(a, b)

作为 ``next.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``503``—``503`` 行；所属函数 ``setWorkspaces callback @ 501``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.name.localeCompare``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21054:21789:FUNCTION

.. rubric:: ``removeWorkspace``

.. code-block:: javascript

   async removeWorkspace()

移除与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``518``—``535`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSaving``、``apiClient.delete``、``encodeURIComponent``、``setWorkspaces``、``selectedIdSet.has``、``persistWorkspaceSelection``、``selectedIds.filter``、``setFocusedWorkspaceId``、``stopEditing``、``setDeleteOpen``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21274:21336:FUNCTION

.. rubric:: ``setWorkspaces callback @ 523``

.. code-block:: javascript

   setWorkspaces callback @ 523(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``523``—``523`` 行；所属函数 ``removeWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21302:21335:FUNCTION

.. rubric:: ``current.filter callback @ 523``

.. code-block:: javascript

   current.filter callback @ 523(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``523``—``523`` 行；所属函数 ``setWorkspaces callback @ 523``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21456:21486:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 525``

.. code-block:: javascript

   selectedIds.filter callback @ 525(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``525``—``525`` 行；所属函数 ``removeWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24187:32432:FUNCTION

.. rubric:: ``workspaces.map callback @ 576``

.. code-block:: javascript

   workspaces.map callback @ 576(item)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``576``—``681`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id} className={\x60flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0 ${focused ? 'bg-blue-50/70' : 'hover:bg-muted/40'}\x60} onClick={() => setFocusedWorkspa…``。

**主要协作调用**：``selectedIdSet.has``、``t``、``workspacePermissionLabel``、``(item.mounts || []) .map((mount) => \x60/${mount.alias}\x60) .join``、``(item.mounts || []) .map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24756:24792:FUNCTION

.. rubric:: ``onClick callback @ 583``

.. code-block:: javascript

   onClick callback @ 583()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``583``—``583`` 行；所属函数 ``workspaces.map callback @ 576``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFocusedWorkspaceId``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:25037:25144:FUNCTION

.. rubric:: ``onCheckedChange callback @ 587``

.. code-block:: javascript

   onCheckedChange callback @ 587(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``587``—``588`` 行；所属函数 ``workspaces.map callback @ 576``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:25260:25294:FUNCTION

.. rubric:: ``onClick callback @ 590``

.. code-block:: javascript

   onClick callback @ 590(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``590``—``590`` 行；所属函数 ``workspaces.map callback @ 576``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:30982:31010:FUNCTION

.. rubric:: ``(item.mounts || []) .map callback @ 660``

.. code-block:: javascript

   (item.mounts || []) .map callback @ 660(mount)

作为 ``(item.mounts || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``660``—``660`` 行；所属函数 ``workspaces.map callback @ 576``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:31602:31910:FUNCTION

.. rubric:: ``onClick callback @ 669``

.. code-block:: javascript

   onClick callback @ 669(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``669``—``673`` 行；所属函数 ``workspaces.map callback @ 576``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``setFocusedWorkspaceId``、``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33761:33798:FUNCTION

.. rubric:: ``onClick callback @ 703``

.. code-block:: javascript

   onClick callback @ 703()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``703``—``703`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34559:34584:FUNCTION

.. rubric:: ``onClick callback @ 716``

.. code-block:: javascript

   onClick callback @ 716()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``716``—``716`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:35004:35276:FUNCTION

.. rubric:: ``(selected.mounts || []).map callback @ 723``

.. code-block:: javascript

   (selected.mounts || []).map callback @ 723(mount)

作为 ``(selected.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``723``—``727`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:36410:36448:FUNCTION

.. rubric:: ``onChange callback @ 747``

.. code-block:: javascript

   onChange callback @ 747(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``747``—``747`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38155:38181:FUNCTION

.. rubric:: ``onClick callback @ 771``

.. code-block:: javascript

   onClick callback @ 771()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``771``—``771`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:39270:47221:FUNCTION

.. rubric:: ``mounts.map callback @ 787``

.. code-block:: javascript

   mounts.map callback @ 787(mount, index)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``787``—``877`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``、``String(editingId || '').startsWith``、``String``、``t``、``Boolean``、``roots.find``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41530:41994:FUNCTION

.. rubric:: ``onClick callback @ 812``

.. code-block:: javascript

   onClick callback @ 812()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``812``—``817`` 行；所属函数 ``mounts.map callback @ 787``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41618:41919:FUNCTION

.. rubric:: ``setMounts callback @ 813``

.. code-block:: javascript

   setMounts callback @ 813(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``813``—``816`` 行；所属函数 ``onClick callback @ 812``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41722:41840:FUNCTION

.. rubric:: ``current.filter callback @ 815``

.. code-block:: javascript

   current.filter callback @ 815(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``815``—``815`` 行；所属函数 ``setMounts callback @ 813``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:42919:43870:FUNCTION

.. rubric:: ``onChange callback @ 828``

.. code-block:: javascript

   onChange callback @ 828(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``828``—``838`` 行；所属函数 ``mounts.map callback @ 787``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:43012:43795:FUNCTION

.. rubric:: ``setMounts callback @ 829``

.. code-block:: javascript

   setMounts callback @ 829(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``829``—``837`` 行；所属函数 ``onChange callback @ 828``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:43113:43716:FUNCTION

.. rubric:: ``current.map callback @ 830``

.. code-block:: javascript

   current.map callback @ 830(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``830``—``836`` 行；所属函数 ``setMounts callback @ 829``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45102:45221:FUNCTION

.. rubric:: ``roots.find callback @ 853``

.. code-block:: javascript

   roots.find callback @ 853(root)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``853``—``853`` 行；所属函数 ``mounts.map callback @ 787``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45557:46263:FUNCTION

.. rubric:: ``onCheckedChange callback @ 857``

.. code-block:: javascript

   onCheckedChange callback @ 857(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``857``—``864`` 行；所属函数 ``mounts.map callback @ 787``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45656:46184:FUNCTION

.. rubric:: ``setMounts callback @ 858``

.. code-block:: javascript

   setMounts callback @ 858(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``858``—``863`` 行；所属函数 ``onCheckedChange callback @ 857``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45761:46101:FUNCTION

.. rubric:: ``current.map callback @ 859``

.. code-block:: javascript

   current.map callback @ 859(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``859``—``862`` 行；所属函数 ``setMounts callback @ 858``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:49416:49437:FUNCTION

.. rubric:: ``onClick callback @ 914``

.. code-block:: javascript

   onClick callback @ 914()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``914``—``914`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:49687:50284:FUNCTION

.. rubric:: ``quickAccessRules.map callback @ 918``

.. code-block:: javascript

   quickAccessRules.map callback @ 918(rule)

作为 ``quickAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``918``—``928`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:50054:50079:FUNCTION

.. rubric:: ``onClick callback @ 924``

.. code-block:: javascript

   onClick callback @ 924()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``924``—``924`` 行；所属函数 ``quickAccessRules.map callback @ 918``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:50856:57912:FUNCTION

.. rubric:: ``accessRules.map callback @ 937``

.. code-block:: javascript

   accessRules.map callback @ 937(rule, index)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``937``—``1026`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``operationPresetFor``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:51567:51833:FUNCTION

.. rubric:: ``onValueChange callback @ 946``

.. code-block:: javascript

   onValueChange callback @ 946(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``946``—``949`` 行；所属函数 ``accessRules.map callback @ 937``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:53243:53816:FUNCTION

.. rubric:: ``onChange callback @ 967``

.. code-block:: javascript

   onChange callback @ 967(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``967``—``974`` 行；所属函数 ``accessRules.map callback @ 937``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:54638:54899:FUNCTION

.. rubric:: ``onValueChange callback @ 985``

.. code-block:: javascript

   onValueChange callback @ 985(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``985``—``988`` 行；所属函数 ``accessRules.map callback @ 937``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:57277:57551:FUNCTION

.. rubric:: ``onClick callback @ 1017``

.. code-block:: javascript

   onClick callback @ 1017()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1017``—``1020`` 行；所属函数 ``accessRules.map callback @ 937``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:57358:57488:FUNCTION

.. rubric:: ``setAccessRules callback @ 1018``

.. code-block:: javascript

   setAccessRules callback @ 1018(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1018``—``1019`` 行；所属函数 ``onClick callback @ 1017``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:57450:57487:FUNCTION

.. rubric:: ``current.filter callback @ 1019``

.. code-block:: javascript

   current.filter callback @ 1019(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1019``—``1019`` 行；所属函数 ``setAccessRules callback @ 1018``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:61443:62614:FUNCTION

.. rubric:: ``availableCommandIds.map callback @ 1076``

.. code-block:: javascript

   availableCommandIds.map callback @ 1076(commandId)

作为 ``availableCommandIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1076``—``1090`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedCommands.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:61936:62398:FUNCTION

.. rubric:: ``onCheckedChange callback @ 1081``

.. code-block:: javascript

   onCheckedChange callback @ 1081(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1081``—``1086`` 行；所属函数 ``availableCommandIds.map callback @ 1076``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:62028:62335:FUNCTION

.. rubric:: ``setAllowedCommands callback @ 1082``

.. code-block:: javascript

   setAllowedCommands callback @ 1082(current)

设置与 ``Allowed Commands`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1082``—``1085`` 行；所属函数 ``onCheckedChange callback @ 1081``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:62306:62334:FUNCTION

.. rubric:: ``current.filter callback @ 1085``

.. code-block:: javascript

   current.filter callback @ 1085(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1085``—``1085`` 行；所属函数 ``setAllowedCommands callback @ 1082``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
