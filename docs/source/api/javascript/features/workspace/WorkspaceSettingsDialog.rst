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
* **局部函数与匿名回调**：103

主要依赖
--------------------------------------------------------------------------------

``./components/WorkspaceCommandEditor.jsx``、``./components/commandProfile.js``、``@/components/setting/jsonEditorValidation.js``、``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``@/components/ui/input``、``@/components/ui/label``、``@/components/ui/separator``、``@/components/ui/switch``、``@/components/ui/select``、``@/components/ui/DeleteConfirmDialog``、``./components/FolderBrowserDialog.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1842:1895:FUNCTION

.. js:function:: cloneValue(value)

   实现 ``cloneValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``65``—``65`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1925:2077:FUNCTION

.. js:function:: normalizeOperations(value)

   规范化与 ``Operations`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``70`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ACCESS_OPERATIONS.filter((item) => items.includes(item))``。

   **主要协作调用**：``Array.isArray``、``ACCESS_OPERATIONS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2106:2451:FUNCTION

.. js:function:: operationPresetFor(operations)

   实现 ``operationPresetFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``79`` 行。

   **参数**

   ``operations``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``key || 'all'``。

   **主要协作调用**：``normalizeOperations``、``Object.keys(OPERATION_PRESETS).find``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2481:3194:FUNCTION

.. js:function:: normalizeAccessRule(rule, index)

   规范化与 ``Access Rule`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``94`` 行。

   **参数**

   ``rule``
      调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index`` （默认值 ``0``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``、``Date.now``、``Math.random().toString(16).slice``、``Math.random().toString``、``Math.random``、``['path', 'glob', 'regex', 'exact'].includes``、``String(rule?.matcher?.pattern || '').replace``、``normalizeOperations``、``Array.isArray``、``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3222:3603:FUNCTION

.. js:function:: splitAccessPolicy(policy)

   实现 ``splitAccessPolicy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``96``—``103`` 行。

   **参数**

   ``policy``
      调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ defaultEffect: policy?.defaultEffect === 'deny' ? 'deny' : 'allow', deniedRules: rules.filter((rule) => rule.effect === 'deny' && rule.enabled), preservedRules: rules.filter((ru…``。

   **主要协作调用**：``(Array.isArray(policy?.rules) ? policy.rules : []).map``、``Array.isArray``、``rules.filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3634:3970:FUNCTION

.. js:function:: commandPolicyPayload(allowedCommandIds)

   实现 ``commandPolicyPayload`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``116`` 行。

   **参数**

   ``allowedCommandIds``
      调用方传入的 ``allowedCommandIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...allowedCommandIds].sort().map``、``[...allowedCommandIds].sort``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3990:4226:FUNCTION

.. js:function:: safeAlias(name, index)

   实现 ``safeAlias`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``125`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized || \x60mount-${index + 1}\x60``。

   **主要协作调用**：``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace(/^-+|-+$/g, '') .slice``、``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace``、``String(name || '') .normalize('NFKD') .replace``、``String(name || '') .normalize``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4253:4352:FUNCTION

.. js:function:: cleanDisplayPath(value)

   实现 ``cleanDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``127``—``130`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '') .replace(/\\\//g, '\\') .replace``、``String(value || '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4387:4485:FUNCTION

.. js:function:: workspacePermissionLabel(value)

   实现 ``workspacePermissionLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``132``—``133`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4519:69737:FUNCTION

.. js:function:: WorkspaceSettingsDialog({ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSel…)

   渲染 ``WorkspaceSettingsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``135``—``1212`` 行。

   **参数**

   ``{ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSel…``
      调用方传入的 ``open, onOpenChange, conversationId, selectedWorkspaceIds = , onWorkspaceChange, runWorkspaceSel…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="max-h-[92vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-3xl"> <DialogHe…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``String(editingId || '').startsWith``、``String``、``configuredCommands.filter``、``customRows.map((row) => row.id.trim()).filter``、``customRows.map``、``useMemo``、``useEffect``、``useCallback``、``t``、``workspaces.map``。

   **内部回调数量**：33。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2043:2073:FUNCTION

.. rubric:: ``ACCESS_OPERATIONS.filter callback @ 69``

.. code-block:: javascript

   ACCESS_OPERATIONS.filter callback @ 69(item)

作为 ``ACCESS_OPERATIONS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``normalizeOperations``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2233:2422:FUNCTION

.. rubric:: ``Object.keys(OPERATION_PRESETS).find callback @ 74``

.. code-block:: javascript

   Object.keys(OPERATION_PRESETS).find callback @ 74(item)

作为 ``Object.keys(OPERATION_PRESETS).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``77`` 行；所属函数 ``operationPresetFor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``candidate.length === normalized.length && candidate.every((operation) => normalized.includes(operation))``。

**主要协作调用**：``candidate.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2369:2414:FUNCTION

.. rubric:: ``candidate.every callback @ 76``

.. code-block:: javascript

   candidate.every callback @ 76(operation)

作为 ``candidate.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``Object.keys(OPERATION_PRESETS).find callback @ 74``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalized.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3455:3503:FUNCTION

.. rubric:: ``rules.filter callback @ 100``

.. code-block:: javascript

   rules.filter callback @ 100(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3543:3592:FUNCTION

.. rubric:: ``rules.filter callback @ 101``

.. code-block:: javascript

   rules.filter callback @ 101(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3749:3965:FUNCTION

.. rubric:: ``[...allowedCommandIds].sort().map callback @ 108``

.. code-block:: javascript

   [...allowedCommandIds].sort().map callback @ 108(commandId)

作为 ``[...allowedCommandIds].sort().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``115`` 行；所属函数 ``commandPolicyPayload``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6301:6358:FUNCTION

.. rubric:: ``configuredCommands.filter callback @ 170``

.. code-block:: javascript

   configuredCommands.filter callback @ 170(id)

作为 ``configuredCommands.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``170``—``170`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6413:6435:FUNCTION

.. rubric:: ``customRows.map callback @ 172``

.. code-block:: javascript

   customRows.map callback @ 172(row)

作为 ``customRows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.id.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6755:6944:FUNCTION

.. rubric:: ``useMemo callback @ 180``

.. code-block:: javascript

   useMemo callback @ 180()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``183`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...new Set(raw.map((item) => String(item || '').trim()).filter(Boolean))]``。

**主要协作调用**：``Array.isArray``、``raw.map((item) => String(item || '').trim()).filter``、``raw.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6883:6918:FUNCTION

.. rubric:: ``raw.map callback @ 182``

.. code-block:: javascript

   raw.map callback @ 182(item)

作为 ``raw.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``useMemo callback @ 180``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7005:7031:FUNCTION

.. rubric:: ``useMemo callback @ 184``

.. code-block:: javascript

   useMemo callback @ 184()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7078:7289:FUNCTION

.. rubric:: ``useMemo callback @ 185``

.. code-block:: javascript

   useMemo callback @ 185()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``185``—``189`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``focused``、``workspaces.find((item) => selectedIdSet.has(item.id)) || null``。

**主要协作调用**：``workspaces.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7126:7166:FUNCTION

.. rubric:: ``workspaces.find callback @ 186``

.. code-block:: javascript

   workspaces.find callback @ 186(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``useMemo callback @ 185``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7237:7273:FUNCTION

.. rubric:: ``workspaces.find callback @ 188``

.. code-block:: javascript

   workspaces.find callback @ 188(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``useMemo callback @ 185``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7356:7620:FUNCTION

.. rubric:: ``useEffect callback @ 191``

.. code-block:: javascript

   useEffect callback @ 191()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``191``—``195`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workspaces.some``、``workspaces.find``、``setFocusedWorkspaceId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7414:7454:FUNCTION

.. rubric:: ``workspaces.some callback @ 192``

.. code-block:: javascript

   workspaces.some callback @ 192(item)

作为 ``workspaces.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``useEffect callback @ 191``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7502:7538:FUNCTION

.. rubric:: ``workspaces.find callback @ 193``

.. code-block:: javascript

   workspaces.find callback @ 193(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``useEffect callback @ 191``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7702:10315:FUNCTION

.. rubric:: ``useCallback callback @ 198``

.. code-block:: javascript

   async useCallback callback @ 198({ quiet = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``198``—``241`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``{ quiet = false }`` （默认值 ``{}``）
   调用方传入的 ``quiet = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``encodeURIComponent``、``Promise.all``、``apiClient.get``、``Promise.resolve``、``setDefaultWorkspaceId``、``Array.isArray``、``setWorkspaces``、``[...localWorkspaces, ...remoteWorkspaces].sort``、``setRoots``、``setDefaultAccessPolicy``、``cloneValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9225:9315:FUNCTION

.. rubric:: ``[...localWorkspaces, ...remoteWorkspaces].sort callback @ 219``

.. code-block:: javascript

   [...localWorkspaces, ...remoteWorkspaces].sort callback @ 219(a, b)

作为 ``[...localWorkspaces, ...remoteWorkspaces].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``219``—``220`` 行；所属函数 ``useCallback callback @ 198``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name || '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10368:11329:FUNCTION

.. rubric:: ``useEffect callback @ 245``

.. code-block:: javascript

   useEffect callback @ 245()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``245``—``265`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { loadSequenceRef.current += 1; unsubscribeConnection?.(); unsubscribeAccess?.(); unsubscribeDefault?.(); window.clearInterval(timer); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``load``、``onEvent({ event: 'workspace.connection.status_changed' }).then``、``onEvent``、``onEvent({ event: 'workspace.access.changed' }).then``、``onEvent({ event: 'workspace.default.changed', conversationId, }).then``、``window.setInterval``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10530:10569:FUNCTION

.. rubric:: ``onEvent({ event: 'workspace.connection.status_changed' }).then callback @ 248``

.. code-block:: javascript

   onEvent({ event: 'workspace.connection.status_changed' }).then callback @ 248()

处理 ``onEvent({ event: 'workspace.connection.status_changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``248``—``249`` 行；所属函数 ``useEffect callback @ 245``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10668:10695:FUNCTION

.. rubric:: ``onEvent({ event: 'workspace.access.changed' }).then callback @ 251``

.. code-block:: javascript

   onEvent({ event: 'workspace.access.changed' }).then callback @ 251()

处理 ``onEvent({ event: 'workspace.access.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``251``—``251`` 行；所属函数 ``useEffect callback @ 245``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10823:10850:FUNCTION

.. rubric:: ``onEvent({ event: 'workspace.default.changed', conversationId, }).then callback @ 254``

.. code-block:: javascript

   onEvent({ event: 'workspace.default.changed', conversationId, }).then callback @ 254()

处理 ``onEvent({ event: 'workspace.default.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``useEffect callback @ 245``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11059:11086:FUNCTION

.. rubric:: ``window.setInterval callback @ 257``

.. code-block:: javascript

   window.setInterval callback @ 257()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``useEffect callback @ 245``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11111:11322:FUNCTION

.. rubric:: ``returned callback @ 258``

.. code-block:: javascript

   returned callback @ 258()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``258``—``264`` 行；所属函数 ``useEffect callback @ 245``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``unsubscribeConnection``、``unsubscribeAccess``、``unsubscribeDefault``、``window.clearInterval``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11400:12718:FUNCTION

.. rubric:: ``persistWorkspaceSelection``

.. code-block:: javascript

   async persistWorkspaceSelection(nextWorkspaceIds)

实现 ``persistWorkspaceSelection`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``267``—``298`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``nextWorkspaceIds``
   调用方传入的 ``nextWorkspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``setLoading``、``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map((item) => String(item || '').trim()) .filter``、``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map``、``Array.isArray``、``onWorkspaceChange``、``runWorkspaceSelectionMutation``、``setDefaultWorkspaceId``、``persist``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11645:11680:FUNCTION

.. rubric:: ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 273``

.. code-block:: javascript

   (Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 273(item)

作为 ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11908:12097:FUNCTION

.. rubric:: ``persist``

.. code-block:: javascript

   persist()

实现 ``persist`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``281``—``284`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12755:13580:FUNCTION

.. rubric:: ``changeDefaultWorkspace``

.. code-block:: javascript

   async changeDefaultWorkspace(workspaceId)

实现 ``changeDefaultWorkspace`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``300``—``319`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLoading``、``setChangingDefault``、``runWorkspaceSelectionMutation``、``persist``、``setDefaultWorkspaceId``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12977:13158:FUNCTION

.. rubric:: ``persist``

.. code-block:: javascript

   persist()

实现 ``persist`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``306``—``309`` 行；所属函数 ``changeDefaultWorkspace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13610:13967:FUNCTION

.. rubric:: ``toggleWorkspace``

.. code-block:: javascript

   async toggleWorkspace(workspaceId, checked)

切换与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``321``—``329`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(workspaceId || '').trim``、``String``、``selectedIds.filter``、``setFocusedWorkspaceId``、``persistWorkspaceSelection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13792:13813:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 325``

.. code-block:: javascript

   selectedIds.filter callback @ 325(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13853:13874:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 326``

.. code-block:: javascript

   selectedIds.filter callback @ 326(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13999:14219:FUNCTION

.. rubric:: ``applyAccessPolicy``

.. code-block:: javascript

   applyAccessPolicy(policy)

应用与 ``Access Policy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``331``—``336`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``policy``
   调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``splitAccessPolicy``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14245:14667:FUNCTION

.. rubric:: ``beginCreate``

.. code-block:: javascript

   beginCreate()

实现 ``beginCreate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``338``—``350`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setCommandProfile``、``setCustomRows``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14691:15594:FUNCTION

.. rubric:: ``beginEdit``

.. code-block:: javascript

   beginEdit(workspace)

实现 ``beginEdit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``352``—``369`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``Boolean``、``setMounts``、``(workspace.mounts || []).map``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setCommandProfile``、``setCustomRows``、``commandRows``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14894:15011:FUNCTION

.. rubric:: ``(workspace.mounts || []).map callback @ 357``

.. code-block:: javascript

   (workspace.mounts || []).map callback @ 357(item)

作为 ``(workspace.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``357``—``360`` 行；所属函数 ``beginEdit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15620:16060:FUNCTION

.. rubric:: ``stopEditing``

.. code-block:: javascript

   stopEditing()

停止与 ``Editing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``371``—``385`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``、``setVisibilityPolicy``、``setCommandProfile``、``setCustomRows``、``setConfiguredCommands``、``setAllowedCommands``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16083:17034:FUNCTION

.. rubric:: ``addMount``

.. code-block:: javascript

   addMount(folder)

新增与 ``Mount`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``387``—``410`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``mounts.some``、``toast.error``、``t``、``mounts.map``、``safeAlias``、``used.has``、``alias.toLowerCase``、``setMounts``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16136:16233:FUNCTION

.. rubric:: ``mounts.some callback @ 389``

.. code-block:: javascript

   mounts.some callback @ 389(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``389``—``389`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16411:16459:FUNCTION

.. rubric:: ``mounts.map callback @ 395``

.. code-block:: javascript

   mounts.map callback @ 395(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``395``—``395`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.alias || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16674:17026:FUNCTION

.. rubric:: ``setMounts callback @ 399``

.. code-block:: javascript

   setMounts callback @ 399(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``399``—``409`` 行；所属函数 ``addMount``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17065:17238:FUNCTION

.. rubric:: ``updateAccessRule``

.. code-block:: javascript

   updateAccessRule(index, patch)

更新与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``412``—``416`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17109:17220:FUNCTION

.. rubric:: ``setAccessRules callback @ 413``

.. code-block:: javascript

   setAccessRules callback @ 413(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``413``—``414`` 行；所属函数 ``updateAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17146:17219:FUNCTION

.. rubric:: ``current.map callback @ 414``

.. code-block:: javascript

   current.map callback @ 414(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``414``—``414`` 行；所属函数 ``setAccessRules callback @ 413``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17266:18202:FUNCTION

.. rubric:: ``addAccessRule``

.. code-block:: javascript

   addAccessRule(template)

新增与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``418``—``444`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``template`` （默认值 ``null``）
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``accessRules.map``、``preservedAccessRules.map``、``normalizeAccessRule``、``accessRules.some``、``setAccessRules``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17393:17420:FUNCTION

.. rubric:: ``accessRules.map callback @ 422``

.. code-block:: javascript

   accessRules.map callback @ 422(item)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``422``—``422`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17467:17494:FUNCTION

.. rubric:: ``preservedAccessRules.map callback @ 423``

.. code-block:: javascript

   preservedAccessRules.map callback @ 423(item)

作为 ``preservedAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``423``—``423`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17928:18111:FUNCTION

.. rubric:: ``accessRules.some callback @ 438``

.. code-block:: javascript

   accessRules.some callback @ 438(item)

作为 ``accessRules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``438``—``441`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18163:18194:FUNCTION

.. rubric:: ``setAccessRules callback @ 443``

.. code-block:: javascript

   setAccessRules callback @ 443(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``443``—``443`` 行；所属函数 ``addAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18233:18278:FUNCTION

.. rubric:: ``resetAccessRules``

.. code-block:: javascript

   resetAccessRules()

重置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``446``—``446`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAccessPolicy``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18312:18993:FUNCTION

.. rubric:: ``validateAccessRules``

.. code-block:: javascript

   validateAccessRules()

校验与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``448``—``466`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``rule.matcher.pattern.trim``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19012:23440:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save()

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``468``—``562`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(editingId || '').startsWith``、``String``、``name.trim``、``toast.error``、``t``、``mounts.some``、``validateAccessRules``、``setSaving``、``validateJsonEditors``、``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map``、``[...preservedAccessRules, ...accessRules] .sort``、``commandProfileFromRows``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19377:19450:FUNCTION

.. rubric:: ``mounts.some callback @ 475``

.. code-block:: javascript

   mounts.some callback @ 475(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``475``—``475`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias?.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19942:19999:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort callback @ 487``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort callback @ 487(left, right)

作为 ``[...preservedAccessRules, ...accessRules] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``487``—``487`` 行；所属函数 ``save``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20026:20540:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 488``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 488(item)

作为 ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``488``—``497`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...rule, name: rule.name || rule.matcher.pattern, enabled: rule.effect === 'deny' ? true : rule.enabled, matcher: { ...rule.matcher, pattern: rule.matcher.pattern.trim() }, oper…``。

**主要协作调用**：``rule.matcher.pattern.trim``、``normalizeOperations``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20974:21014:FUNCTION

.. rubric:: ``allowedCommands.filter callback @ 507``

.. code-block:: javascript

   allowedCommands.filter callback @ 507(id)

作为 ``allowedCommands.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``507``—``507`` 行；所属函数 ``save``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableCommandIds.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21569:21871:FUNCTION

.. rubric:: ``mounts.map callback @ 522``

.. code-block:: javascript

   mounts.map callback @ 522(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``522``—``528`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias.trim``、``Boolean``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22284:22324:FUNCTION

.. rubric:: ``allowedCommands.filter callback @ 537``

.. code-block:: javascript

   allowedCommands.filter callback @ 537(id)

作为 ``allowedCommands.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``537``—``537`` 行；所属函数 ``save``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableCommandIds.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22763:22956:FUNCTION

.. rubric:: ``setWorkspaces callback @ 547``

.. code-block:: javascript

   setWorkspaces callback @ 547(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``547``—``550`` 行；所属函数 ``save``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.sort((a, b) => a.name.localeCompare(b.name))``。

**主要协作调用**：``current.filter((item) => item.id !== saved.id).concat``、``current.filter``、``next.sort``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22822:22852:FUNCTION

.. rubric:: ``current.filter callback @ 548``

.. code-block:: javascript

   current.filter callback @ 548(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``548``—``548`` 行；所属函数 ``setWorkspaces callback @ 547``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22902:22940:FUNCTION

.. rubric:: ``next.sort callback @ 549``

.. code-block:: javascript

   next.sort callback @ 549(a, b)

作为 ``next.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``549``—``549`` 行；所属函数 ``setWorkspaces callback @ 547``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.name.localeCompare``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:23470:24205:FUNCTION

.. rubric:: ``removeWorkspace``

.. code-block:: javascript

   async removeWorkspace()

移除与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``564``—``581`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSaving``、``apiClient.delete``、``encodeURIComponent``、``setWorkspaces``、``selectedIdSet.has``、``persistWorkspaceSelection``、``selectedIds.filter``、``setFocusedWorkspaceId``、``stopEditing``、``setDeleteOpen``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:23690:23752:FUNCTION

.. rubric:: ``setWorkspaces callback @ 569``

.. code-block:: javascript

   setWorkspaces callback @ 569(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``569``—``569`` 行；所属函数 ``removeWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:23718:23751:FUNCTION

.. rubric:: ``current.filter callback @ 569``

.. code-block:: javascript

   current.filter callback @ 569(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``569``—``569`` 行；所属函数 ``setWorkspaces callback @ 569``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:23872:23902:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 571``

.. code-block:: javascript

   selectedIds.filter callback @ 571(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``571``—``571`` 行；所属函数 ``removeWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:26603:36711:FUNCTION

.. rubric:: ``workspaces.map callback @ 622``

.. code-block:: javascript

   workspaces.map callback @ 622(item)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``622``—``747`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id} className={\x60flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0 ${focused ? 'bg-blue-50/70' : 'hover:bg-muted/40'}\x60} onClick={() => setFocusedWorkspa…``。

**主要协作调用**：``selectedIdSet.has``、``t``、``workspacePermissionLabel``、``(item.mounts || []) .map((mount) => \x60/${mount.alias}\x60) .join``、``(item.mounts || []) .map``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27172:27208:FUNCTION

.. rubric:: ``onClick callback @ 629``

.. code-block:: javascript

   onClick callback @ 629()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``629``—``629`` 行；所属函数 ``workspaces.map callback @ 622``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFocusedWorkspaceId``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27453:27560:FUNCTION

.. rubric:: ``onCheckedChange callback @ 633``

.. code-block:: javascript

   onCheckedChange callback @ 633(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``633``—``634`` 行；所属函数 ``workspaces.map callback @ 622``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27676:27710:FUNCTION

.. rubric:: ``onClick callback @ 636``

.. code-block:: javascript

   onClick callback @ 636(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``636``—``636`` 行；所属函数 ``workspaces.map callback @ 622``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33929:33957:FUNCTION

.. rubric:: ``(item.mounts || []) .map callback @ 711``

.. code-block:: javascript

   (item.mounts || []) .map callback @ 711(mount)

作为 ``(item.mounts || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``711``—``711`` 行；所属函数 ``workspaces.map callback @ 622``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34972:35220:FUNCTION

.. rubric:: ``onClick callback @ 722``

.. code-block:: javascript

   onClick callback @ 722(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``722``—``725`` 行；所属函数 ``workspaces.map callback @ 622``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``changeDefaultWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:35881:36189:FUNCTION

.. rubric:: ``onClick callback @ 735``

.. code-block:: javascript

   onClick callback @ 735(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``735``—``739`` 行；所属函数 ``workspaces.map callback @ 622``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``setFocusedWorkspaceId``、``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38046:38083:FUNCTION

.. rubric:: ``onClick callback @ 769``

.. code-block:: javascript

   onClick callback @ 769()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``769``—``769`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38844:38869:FUNCTION

.. rubric:: ``onClick callback @ 782``

.. code-block:: javascript

   onClick callback @ 782()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``782``—``782`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:39289:39561:FUNCTION

.. rubric:: ``(selected.mounts || []).map callback @ 789``

.. code-block:: javascript

   (selected.mounts || []).map callback @ 789(mount)

作为 ``(selected.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``789``—``793`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:40695:40733:FUNCTION

.. rubric:: ``onChange callback @ 813``

.. code-block:: javascript

   onChange callback @ 813(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``813``—``813`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:42440:42466:FUNCTION

.. rubric:: ``onClick callback @ 837``

.. code-block:: javascript

   onClick callback @ 837()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``837``—``837`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:43555:51506:FUNCTION

.. rubric:: ``mounts.map callback @ 853``

.. code-block:: javascript

   mounts.map callback @ 853(mount, index)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``853``—``943`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``、``String(editingId || '').startsWith``、``String``、``t``、``Boolean``、``roots.find``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45815:46279:FUNCTION

.. rubric:: ``onClick callback @ 878``

.. code-block:: javascript

   onClick callback @ 878()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``878``—``883`` 行；所属函数 ``mounts.map callback @ 853``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45903:46204:FUNCTION

.. rubric:: ``setMounts callback @ 879``

.. code-block:: javascript

   setMounts callback @ 879(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``879``—``882`` 行；所属函数 ``onClick callback @ 878``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:46007:46125:FUNCTION

.. rubric:: ``current.filter callback @ 881``

.. code-block:: javascript

   current.filter callback @ 881(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``881``—``881`` 行；所属函数 ``setMounts callback @ 879``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:47204:48155:FUNCTION

.. rubric:: ``onChange callback @ 894``

.. code-block:: javascript

   onChange callback @ 894(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``894``—``904`` 行；所属函数 ``mounts.map callback @ 853``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:47297:48080:FUNCTION

.. rubric:: ``setMounts callback @ 895``

.. code-block:: javascript

   setMounts callback @ 895(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``895``—``903`` 行；所属函数 ``onChange callback @ 894``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:47398:48001:FUNCTION

.. rubric:: ``current.map callback @ 896``

.. code-block:: javascript

   current.map callback @ 896(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``896``—``902`` 行；所属函数 ``setMounts callback @ 895``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:49387:49506:FUNCTION

.. rubric:: ``roots.find callback @ 919``

.. code-block:: javascript

   roots.find callback @ 919(root)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``919``—``919`` 行；所属函数 ``mounts.map callback @ 853``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:49842:50548:FUNCTION

.. rubric:: ``onCheckedChange callback @ 923``

.. code-block:: javascript

   onCheckedChange callback @ 923(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``923``—``930`` 行；所属函数 ``mounts.map callback @ 853``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:49941:50469:FUNCTION

.. rubric:: ``setMounts callback @ 924``

.. code-block:: javascript

   setMounts callback @ 924(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``924``—``929`` 行；所属函数 ``onCheckedChange callback @ 923``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:50046:50386:FUNCTION

.. rubric:: ``current.map callback @ 925``

.. code-block:: javascript

   current.map callback @ 925(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``925``—``928`` 行；所属函数 ``setMounts callback @ 924``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:53701:53722:FUNCTION

.. rubric:: ``onClick callback @ 980``

.. code-block:: javascript

   onClick callback @ 980()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``980``—``980`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:53972:54569:FUNCTION

.. rubric:: ``quickAccessRules.map callback @ 984``

.. code-block:: javascript

   quickAccessRules.map callback @ 984(rule)

作为 ``quickAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``984``—``994`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:54339:54364:FUNCTION

.. rubric:: ``onClick callback @ 990``

.. code-block:: javascript

   onClick callback @ 990()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``990``—``990`` 行；所属函数 ``quickAccessRules.map callback @ 984``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:55141:62197:FUNCTION

.. rubric:: ``accessRules.map callback @ 1003``

.. code-block:: javascript

   accessRules.map callback @ 1003(rule, index)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1003``—``1092`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``operationPresetFor``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:55852:56118:FUNCTION

.. rubric:: ``onValueChange callback @ 1012``

.. code-block:: javascript

   onValueChange callback @ 1012(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1012``—``1015`` 行；所属函数 ``accessRules.map callback @ 1003``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:57528:58101:FUNCTION

.. rubric:: ``onChange callback @ 1033``

.. code-block:: javascript

   onChange callback @ 1033(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1033``—``1040`` 行；所属函数 ``accessRules.map callback @ 1003``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:58923:59184:FUNCTION

.. rubric:: ``onValueChange callback @ 1051``

.. code-block:: javascript

   onValueChange callback @ 1051(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1051``—``1054`` 行；所属函数 ``accessRules.map callback @ 1003``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:61562:61836:FUNCTION

.. rubric:: ``onClick callback @ 1083``

.. code-block:: javascript

   onClick callback @ 1083()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1083``—``1086`` 行；所属函数 ``accessRules.map callback @ 1003``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:61643:61773:FUNCTION

.. rubric:: ``setAccessRules callback @ 1084``

.. code-block:: javascript

   setAccessRules callback @ 1084(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1084``—``1085`` 行；所属函数 ``onClick callback @ 1083``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:61735:61772:FUNCTION

.. rubric:: ``current.filter callback @ 1085``

.. code-block:: javascript

   current.filter callback @ 1085(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1085``—``1085`` 行；所属函数 ``setAccessRules callback @ 1084``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:65778:66949:FUNCTION

.. rubric:: ``availableCommandIds.map callback @ 1142``

.. code-block:: javascript

   availableCommandIds.map callback @ 1142(commandId)

作为 ``availableCommandIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1142``—``1156`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedCommands.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:66271:66733:FUNCTION

.. rubric:: ``onCheckedChange callback @ 1147``

.. code-block:: javascript

   onCheckedChange callback @ 1147(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1147``—``1152`` 行；所属函数 ``availableCommandIds.map callback @ 1142``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:66363:66670:FUNCTION

.. rubric:: ``setAllowedCommands callback @ 1148``

.. code-block:: javascript

   setAllowedCommands callback @ 1148(current)

设置与 ``Allowed Commands`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1148``—``1151`` 行；所属函数 ``onCheckedChange callback @ 1147``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:66641:66669:FUNCTION

.. rubric:: ``current.filter callback @ 1151``

.. code-block:: javascript

   current.filter callback @ 1151(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1151``—``1151`` 行；所属函数 ``setAllowedCommands callback @ 1148``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
