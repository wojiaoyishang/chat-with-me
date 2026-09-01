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
* **局部函数与匿名回调**：95

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``@/components/ui/input``、``@/components/ui/label``、``@/components/ui/separator``、``@/components/ui/switch``、``@/components/ui/select``、``@/components/ui/DeleteConfirmDialog``、``./components/FolderBrowserDialog.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1547:1600:FUNCTION

.. js:function:: cloneValue(value)

   实现 ``cloneValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``54`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1630:1782:FUNCTION

.. js:function:: normalizeOperations(value)

   规范化与 ``Operations`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``59`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ACCESS_OPERATIONS.filter((item) => items.includes(item))``。

   **主要协作调用**：``Array.isArray``、``ACCESS_OPERATIONS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1811:2156:FUNCTION

.. js:function:: operationPresetFor(operations)

   实现 ``operationPresetFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``68`` 行。

   **参数**

   ``operations``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``key || 'all'``。

   **主要协作调用**：``normalizeOperations``、``Object.keys(OPERATION_PRESETS).find``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2186:2899:FUNCTION

.. js:function:: normalizeAccessRule(rule, index)

   规范化与 ``Access Rule`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``83`` 行。

   **参数**

   ``rule``
      调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``（默认值 ``0``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``、``Date.now``、``Math.random().toString(16).slice``、``Math.random().toString``、``Math.random``、``['path', 'glob', 'regex', 'exact'].includes``、``String(rule?.matcher?.pattern || '').replace``、``normalizeOperations``、``Array.isArray``、``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2927:3308:FUNCTION

.. js:function:: splitAccessPolicy(policy)

   实现 ``splitAccessPolicy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``85``—``92`` 行。

   **参数**

   ``policy``
      调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ defaultEffect: policy?.defaultEffect === 'deny' ? 'deny' : 'allow', deniedRules: rules.filter((rule) => rule.effect === 'deny' && rule.enabled), preservedRules: rules.filter((ru…``。

   **主要协作调用**：``(Array.isArray(policy?.rules) ? policy.rules : []).map``、``Array.isArray``、``rules.filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3339:3673:FUNCTION

.. js:function:: commandPolicyPayload(allowedCommandIds)

   实现 ``commandPolicyPayload`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``94``—``105`` 行。

   **参数**

   ``allowedCommandIds``
      调用方传入的 ``allowedCommandIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...allowedCommandIds].sort().map``、``[...allowedCommandIds].sort``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3693:3929:FUNCTION

.. js:function:: safeAlias(name, index)

   实现 ``safeAlias`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``114`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized || \x60mount-${index + 1}\x60``。

   **主要协作调用**：``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace(/^-+|-+$/g, '') .slice``、``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace``、``String(name || '') .normalize('NFKD') .replace``、``String(name || '') .normalize``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3956:4043:FUNCTION

.. js:function:: cleanDisplayPath(value)

   实现 ``cleanDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``116``—``118`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '') .replace(/\\\//g, '\\') .replace``、``String(value || '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4078:4170:FUNCTION

.. js:function:: workspacePermissionLabel(value)

   实现 ``workspacePermissionLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``120``—``120`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4204:48487:FUNCTION

.. js:function:: WorkspaceSettingsDialog({open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSele…)

   渲染 ``WorkspaceSettingsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``122``—``820`` 行。

   **参数**

   ``{open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSele…``
      调用方传入的 ``open, onOpenChange, conversationId, selectedWorkspaceIds = , onWorkspaceChange, runWorkspaceSele…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="max-h-[92vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-3xl"> <DialogHe…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useMemo``、``useEffect``、``useCallback``、``t``、``workspaces.map``、``(selected.mounts || []).map``、``String(editingId || '').startsWith``、``String``、``mounts.map``、``quickAccessRules.map``、``accessRules.map``。

   **内部回调数量**：30。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1748:1778:FUNCTION

.. rubric:: ``ACCESS_OPERATIONS.filter callback @ 58``

.. code-block:: javascript

   ACCESS_OPERATIONS.filter callback @ 58(item)

作为 ``ACCESS_OPERATIONS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``normalizeOperations``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1938:2127:FUNCTION

.. rubric:: ``Object.keys(OPERATION_PRESETS).find callback @ 63``

.. code-block:: javascript

   Object.keys(OPERATION_PRESETS).find callback @ 63(item)

作为 ``Object.keys(OPERATION_PRESETS).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``66`` 行；所属函数 ``operationPresetFor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``candidate.length === normalized.length && candidate.every((operation) => normalized.includes(operation))``。

**主要协作调用**：``candidate.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2074:2119:FUNCTION

.. rubric:: ``candidate.every callback @ 65``

.. code-block:: javascript

   candidate.every callback @ 65(operation)

作为 ``candidate.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``Object.keys(OPERATION_PRESETS).find callback @ 63``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalized.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3160:3208:FUNCTION

.. rubric:: ``rules.filter callback @ 89``

.. code-block:: javascript

   rules.filter callback @ 89(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3248:3297:FUNCTION

.. rubric:: ``rules.filter callback @ 90``

.. code-block:: javascript

   rules.filter callback @ 90(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3454:3668:FUNCTION

.. rubric:: ``[...allowedCommandIds].sort().map callback @ 97``

.. code-block:: javascript

   [...allowedCommandIds].sort().map callback @ 97(commandId)

作为 ``[...allowedCommandIds].sort().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``104`` 行；所属函数 ``commandPolicyPayload``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5730:5919:FUNCTION

.. rubric:: ``useMemo callback @ 145``

.. code-block:: javascript

   useMemo callback @ 145()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``145``—``148`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...new Set(raw.map((item) => String(item || '').trim()).filter(Boolean))]``。

**主要协作调用**：``Array.isArray``、``raw.map((item) => String(item || '').trim()).filter``、``raw.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5858:5893:FUNCTION

.. rubric:: ``raw.map callback @ 147``

.. code-block:: javascript

   raw.map callback @ 147(item)

作为 ``raw.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``useMemo callback @ 145``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5980:6006:FUNCTION

.. rubric:: ``useMemo callback @ 149``

.. code-block:: javascript

   useMemo callback @ 149()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6053:6264:FUNCTION

.. rubric:: ``useMemo callback @ 150``

.. code-block:: javascript

   useMemo callback @ 150()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``150``—``154`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``focused``、``workspaces.find((item) => selectedIdSet.has(item.id)) || null``。

**主要协作调用**：``workspaces.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6101:6141:FUNCTION

.. rubric:: ``workspaces.find callback @ 151``

.. code-block:: javascript

   workspaces.find callback @ 151(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``useMemo callback @ 150``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6212:6248:FUNCTION

.. rubric:: ``workspaces.find callback @ 153``

.. code-block:: javascript

   workspaces.find callback @ 153(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``153``—``153`` 行；所属函数 ``useMemo callback @ 150``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6331:6595:FUNCTION

.. rubric:: ``useEffect callback @ 156``

.. code-block:: javascript

   useEffect callback @ 156()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``156``—``160`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workspaces.some``、``workspaces.find``、``setFocusedWorkspaceId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6389:6429:FUNCTION

.. rubric:: ``workspaces.some callback @ 157``

.. code-block:: javascript

   workspaces.some callback @ 157(item)

作为 ``workspaces.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``useEffect callback @ 156``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6477:6513:FUNCTION

.. rubric:: ``workspaces.find callback @ 158``

.. code-block:: javascript

   workspaces.find callback @ 158(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``useEffect callback @ 156``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6677:8370:FUNCTION

.. rubric:: ``useCallback callback @ 162``

.. code-block:: javascript

   async useCallback callback @ 162({quiet = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``162``—``186`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``{quiet = false}``（默认值 ``{}``）
   调用方传入的 ``quiet = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``encodeURIComponent``、``Promise.all``、``apiClient.get``、``Array.isArray``、``setWorkspaces``、``[...localWorkspaces, ...remoteWorkspaces].sort``、``setRoots``、``setDefaultAccessPolicy``、``cloneValue``、``setDefaultVisibilityPolicy``、``setQuickAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7662:7728:FUNCTION

.. rubric:: ``[...localWorkspaces, ...remoteWorkspaces].sort callback @ 176``

.. code-block:: javascript

   [...localWorkspaces, ...remoteWorkspaces].sort callback @ 176(a, b)

作为 ``[...localWorkspaces, ...remoteWorkspaces].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``176``—``176`` 行；所属函数 ``useCallback callback @ 162``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name || '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8409:9105:FUNCTION

.. rubric:: ``useEffect callback @ 188``

.. code-block:: javascript

   useEffect callback @ 188()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``188``—``201`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { unsubscribeConnection?.(); unsubscribeAccess?.(); window.clearInterval(timer); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``load``、``onEvent({event: 'workspace.connection.status_changed'}).then``、``onEvent``、``onEvent({event: 'workspace.access.changed'}).then``、``window.setInterval``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8569:8594:FUNCTION

.. rubric:: ``onEvent({event: 'workspace.connection.status_changed'}).then callback @ 191``

.. code-block:: javascript

   onEvent({event: 'workspace.connection.status_changed'}).then callback @ 191()

处理 ``onEvent({event: 'workspace.connection.status_changed'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8681:8706:FUNCTION

.. rubric:: ``onEvent({event: 'workspace.access.changed'}).then callback @ 192``

.. code-block:: javascript

   onEvent({event: 'workspace.access.changed'}).then callback @ 192()

处理 ``onEvent({event: 'workspace.access.changed'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8915:8940:FUNCTION

.. rubric:: ``window.setInterval callback @ 195``

.. code-block:: javascript

   window.setInterval callback @ 195()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8965:9098:FUNCTION

.. rubric:: ``returned callback @ 196``

.. code-block:: javascript

   returned callback @ 196()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``200`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``unsubscribeConnection``、``unsubscribeAccess``、``window.clearInterval``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9160:10136:FUNCTION

.. rubric:: ``persistWorkspaceSelection``

.. code-block:: javascript

   async persistWorkspaceSelection(nextWorkspaceIds)

实现 ``persistWorkspaceSelection`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``203``—``225`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``nextWorkspaceIds``
   调用方传入的 ``nextWorkspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map((item) => String(item || '').trim()).filter``、``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map``、``Array.isArray``、``onWorkspaceChange``、``runWorkspaceSelectionMutation``、``persist``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9302:9337:FUNCTION

.. rubric:: ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 205``

.. code-block:: javascript

   (Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 205(item)

作为 ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9520:9701:FUNCTION

.. rubric:: ``persist``

.. code-block:: javascript

   persist()

实现 ``persist`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``210``—``213`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10166:10523:FUNCTION

.. rubric:: ``toggleWorkspace``

.. code-block:: javascript

   async toggleWorkspace(workspaceId, checked)

切换与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``227``—``235`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(workspaceId || '').trim``、``String``、``selectedIds.filter``、``setFocusedWorkspaceId``、``persistWorkspaceSelection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10348:10369:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 231``

.. code-block:: javascript

   selectedIds.filter callback @ 231(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10409:10430:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 232``

.. code-block:: javascript

   selectedIds.filter callback @ 232(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10555:10775:FUNCTION

.. rubric:: ``applyAccessPolicy``

.. code-block:: javascript

   applyAccessPolicy(policy)

应用与 ``Access Policy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``237``—``242`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``policy``
   调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``splitAccessPolicy``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10801:11163:FUNCTION

.. rubric:: ``beginCreate``

.. code-block:: javascript

   beginCreate()

实现 ``beginCreate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``244``—``254`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11187:11934:FUNCTION

.. rubric:: ``beginEdit``

.. code-block:: javascript

   beginEdit(workspace)

实现 ``beginEdit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``256``—``269`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``Boolean``、``setMounts``、``(workspace.mounts || []).map``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setConfiguredCommands``、``Array.isArray``、``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11377:11482:FUNCTION

.. rubric:: ``(workspace.mounts || []).map callback @ 260``

.. code-block:: javascript

   (workspace.mounts || []).map callback @ 260(item)

作为 ``(workspace.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``263`` 行；所属函数 ``beginEdit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11960:12340:FUNCTION

.. rubric:: ``stopEditing``

.. code-block:: javascript

   stopEditing()

停止与 ``Editing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``271``—``283`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``、``setVisibilityPolicy``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12363:13228:FUNCTION

.. rubric:: ``addMount``

.. code-block:: javascript

   addMount(folder)

新增与 ``Mount`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``285``—``303`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``mounts.some``、``toast.error``、``t``、``mounts.map``、``safeAlias``、``used.has``、``alias.toLowerCase``、``setMounts``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12416:12500:FUNCTION

.. rubric:: ``mounts.some callback @ 286``

.. code-block:: javascript

   mounts.some callback @ 286(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12668:12716:FUNCTION

.. rubric:: ``mounts.map callback @ 291``

.. code-block:: javascript

   mounts.map callback @ 291(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.alias || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12931:13220:FUNCTION

.. rubric:: ``setMounts callback @ 295``

.. code-block:: javascript

   setMounts callback @ 295(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``295``—``302`` 行；所属函数 ``addMount``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13259:13430:FUNCTION

.. rubric:: ``updateAccessRule``

.. code-block:: javascript

   updateAccessRule(index, patch)

更新与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``305``—``309`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13303:13422:FUNCTION

.. rubric:: ``setAccessRules callback @ 306``

.. code-block:: javascript

   setAccessRules callback @ 306(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``306``—``308`` 行；所属函数 ``updateAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13328:13421:FUNCTION

.. rubric:: ``current.map callback @ 306``

.. code-block:: javascript

   current.map callback @ 306(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``306``—``308`` 行；所属函数 ``setAccessRules callback @ 306``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13458:14250:FUNCTION

.. rubric:: ``addAccessRule``

.. code-block:: javascript

   addAccessRule(template)

新增与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``311``—``330`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``template``（默认值 ``null``）
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``accessRules.map``、``preservedAccessRules.map``、``normalizeAccessRule``、``accessRules.some``、``setAccessRules``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13565:13592:FUNCTION

.. rubric:: ``accessRules.map callback @ 314``

.. code-block:: javascript

   accessRules.map callback @ 314(item)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13635:13662:FUNCTION

.. rubric:: ``preservedAccessRules.map callback @ 315``

.. code-block:: javascript

   preservedAccessRules.map callback @ 315(item)

作为 ``preservedAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14023:14169:FUNCTION

.. rubric:: ``accessRules.some callback @ 326``

.. code-block:: javascript

   accessRules.some callback @ 326(item)

作为 ``accessRules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``328`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14211:14242:FUNCTION

.. rubric:: ``setAccessRules callback @ 329``

.. code-block:: javascript

   setAccessRules callback @ 329(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``addAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14281:14326:FUNCTION

.. rubric:: ``resetAccessRules``

.. code-block:: javascript

   resetAccessRules()

重置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAccessPolicy``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14360:15041:FUNCTION

.. rubric:: ``validateAccessRules``

.. code-block:: javascript

   validateAccessRules()

校验与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``334``—``352`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``rule.matcher.pattern.trim``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15060:18718:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save()

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``354``—``432`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(editingId || '').startsWith``、``String``、``name.trim``、``toast.error``、``t``、``mounts.some``、``validateAccessRules``、``setSaving``、``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map``、``[...preservedAccessRules, ...accessRules] .sort``、``commandPolicyPayload``、``apiClient.patch``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15397:15470:FUNCTION

.. rubric:: ``mounts.some callback @ 360``

.. code-block:: javascript

   mounts.some callback @ 360(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``360``—``360`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias?.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15867:15924:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort callback @ 371``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort callback @ 371(left, right)

作为 ``[...preservedAccessRules, ...accessRules] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``371`` 行；所属函数 ``save``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15951:16461:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 372``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 372(item)

作为 ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``372``—``381`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...rule, name: rule.name || rule.matcher.pattern, enabled: rule.effect === 'deny' ? true : rule.enabled, matcher: {...rule.matcher, pattern: rule.matcher.pattern.trim()}, operat…``。

**主要协作调用**：``rule.matcher.pattern.trim``、``normalizeOperations``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17240:17542:FUNCTION

.. rubric:: ``mounts.map callback @ 402``

.. code-block:: javascript

   mounts.map callback @ 402(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``402``—``408`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias.trim``、``Boolean``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18041:18234:FUNCTION

.. rubric:: ``setWorkspaces callback @ 417``

.. code-block:: javascript

   setWorkspaces callback @ 417(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``417``—``420`` 行；所属函数 ``save``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.sort((a, b) => a.name.localeCompare(b.name))``。

**主要协作调用**：``current.filter((item) => item.id !== saved.id).concat``、``current.filter``、``next.sort``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18100:18130:FUNCTION

.. rubric:: ``current.filter callback @ 418``

.. code-block:: javascript

   current.filter callback @ 418(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``setWorkspaces callback @ 417``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18180:18218:FUNCTION

.. rubric:: ``next.sort callback @ 419``

.. code-block:: javascript

   next.sort callback @ 419(a, b)

作为 ``next.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``419``—``419`` 行；所属函数 ``setWorkspaces callback @ 417``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.name.localeCompare``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18748:19483:FUNCTION

.. rubric:: ``removeWorkspace``

.. code-block:: javascript

   async removeWorkspace()

移除与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``434``—``451`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSaving``、``apiClient.delete``、``encodeURIComponent``、``setWorkspaces``、``selectedIdSet.has``、``persistWorkspaceSelection``、``selectedIds.filter``、``setFocusedWorkspaceId``、``stopEditing``、``setDeleteOpen``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18968:19030:FUNCTION

.. rubric:: ``setWorkspaces callback @ 439``

.. code-block:: javascript

   setWorkspaces callback @ 439(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``439``—``439`` 行；所属函数 ``removeWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18996:19029:FUNCTION

.. rubric:: ``current.filter callback @ 439``

.. code-block:: javascript

   current.filter callback @ 439(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``439``—``439`` 行；所属函数 ``setWorkspaces callback @ 439``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19150:19180:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 441``

.. code-block:: javascript

   selectedIds.filter callback @ 441(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``441``—``441`` 行；所属函数 ``removeWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21522:26245:FUNCTION

.. rubric:: ``workspaces.map callback @ 481``

.. code-block:: javascript

   workspaces.map callback @ 481(item)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``481``—``532`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id} className={\x60flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0 ${focused ? 'bg-blue-50/70' : 'hover:bg-muted/40'}\x60} onClick={() => setFocusedWorkspa…``。

**主要协作调用**：``selectedIdSet.has``、``workspacePermissionLabel``、``(item.mounts || []).map((mount) => \x60/${mount.alias}\x60).join``、``(item.mounts || []).map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22063:22099:FUNCTION

.. rubric:: ``onClick callback @ 488``

.. code-block:: javascript

   onClick callback @ 488()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``488``—``488`` 行；所属函数 ``workspaces.map callback @ 481``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFocusedWorkspaceId``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22328:22379:FUNCTION

.. rubric:: ``onCheckedChange callback @ 492``

.. code-block:: javascript

   onCheckedChange callback @ 492(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``492``—``492`` 行；所属函数 ``workspaces.map callback @ 481``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22438:22472:FUNCTION

.. rubric:: ``onClick callback @ 493``

.. code-block:: javascript

   onClick callback @ 493(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``493``—``493`` 行；所属函数 ``workspaces.map callback @ 481``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24942:24970:FUNCTION

.. rubric:: ``(item.mounts || []).map callback @ 512``

.. code-block:: javascript

   (item.mounts || []).map callback @ 512(mount)

作为 ``(item.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``512``—``512`` 行；所属函数 ``workspaces.map callback @ 481``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:25464:25756:FUNCTION

.. rubric:: ``onClick callback @ 520``

.. code-block:: javascript

   onClick callback @ 520(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``520``—``524`` 行；所属函数 ``workspaces.map callback @ 481``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``setFocusedWorkspaceId``、``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27295:27332:FUNCTION

.. rubric:: ``onClick callback @ 546``

.. code-block:: javascript

   onClick callback @ 546()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27733:27758:FUNCTION

.. rubric:: ``onClick callback @ 550``

.. code-block:: javascript

   onClick callback @ 550()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``550``—``550`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:28140:28318:FUNCTION

.. rubric:: ``(selected.mounts || []).map callback @ 556``

.. code-block:: javascript

   (selected.mounts || []).map callback @ 556(mount)

作为 ``(selected.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``556``—``558`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:29095:29133:FUNCTION

.. rubric:: ``onChange callback @ 573``

.. code-block:: javascript

   onChange callback @ 573(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:30391:30417:FUNCTION

.. rubric:: ``onClick callback @ 588``

.. code-block:: javascript

   onClick callback @ 588()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``588``—``588`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:31304:35439:FUNCTION

.. rubric:: ``mounts.map callback @ 600``

.. code-block:: javascript

   mounts.map callback @ 600(mount, index)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``600``—``641`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``、``String(editingId || '').startsWith``、``String``、``t``、``Boolean``、``roots.find``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32801:32884:FUNCTION

.. rubric:: ``onClick callback @ 614``

.. code-block:: javascript

   onClick callback @ 614()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``614``—``614`` 行；所属函数 ``mounts.map callback @ 600``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32817:32883:FUNCTION

.. rubric:: ``setMounts callback @ 614``

.. code-block:: javascript

   setMounts callback @ 614(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``614``—``614`` 行；所属函数 ``onClick callback @ 614``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32845:32882:FUNCTION

.. rubric:: ``current.filter callback @ 614``

.. code-block:: javascript

   current.filter callback @ 614(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``614``—``614`` 行；所属函数 ``setMounts callback @ 614``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33699:33833:FUNCTION

.. rubric:: ``onChange callback @ 624``

.. code-block:: javascript

   onChange callback @ 624(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``624``—``624`` 行；所属函数 ``mounts.map callback @ 600``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33720:33832:FUNCTION

.. rubric:: ``setMounts callback @ 624``

.. code-block:: javascript

   setMounts callback @ 624(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``624``—``624`` 行；所属函数 ``onChange callback @ 624``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33745:33831:FUNCTION

.. rubric:: ``current.map callback @ 624``

.. code-block:: javascript

   current.map callback @ 624(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``624``—``624`` 行；所属函数 ``setMounts callback @ 624``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34519:34553:FUNCTION

.. rubric:: ``roots.find callback @ 631``

.. code-block:: javascript

   roots.find callback @ 631(root)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``631``—``631`` 行；所属函数 ``mounts.map callback @ 600``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34652:34780:FUNCTION

.. rubric:: ``onCheckedChange callback @ 632``

.. code-block:: javascript

   onCheckedChange callback @ 632(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``632``—``632`` 行；所属函数 ``mounts.map callback @ 600``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34675:34779:FUNCTION

.. rubric:: ``setMounts callback @ 632``

.. code-block:: javascript

   setMounts callback @ 632(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``632``—``632`` 行；所属函数 ``onCheckedChange callback @ 632``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34700:34778:FUNCTION

.. rubric:: ``current.map callback @ 632``

.. code-block:: javascript

   current.map callback @ 632(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``632``—``632`` 行；所属函数 ``setMounts callback @ 632``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:36899:36920:FUNCTION

.. rubric:: ``onClick callback @ 662``

.. code-block:: javascript

   onClick callback @ 662()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``662``—``662`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37128:37440:FUNCTION

.. rubric:: ``quickAccessRules.map callback @ 665``

.. code-block:: javascript

   quickAccessRules.map callback @ 665(rule)

作为 ``quickAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``665``—``669`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37255:37280:FUNCTION

.. rubric:: ``onClick callback @ 666``

.. code-block:: javascript

   onClick callback @ 666()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``666``—``666`` 行；所属函数 ``quickAccessRules.map callback @ 665``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37966:42139:FUNCTION

.. rubric:: ``accessRules.map callback @ 677``

.. code-block:: javascript

   accessRules.map callback @ 677(rule, index)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``677``—``722`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``operationPresetFor``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38390:38467:FUNCTION

.. rubric:: ``onValueChange callback @ 681``

.. code-block:: javascript

   onValueChange callback @ 681(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``681``—``681`` 行；所属函数 ``accessRules.map callback @ 677``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:39405:39691:FUNCTION

.. rubric:: ``onChange callback @ 692``

.. code-block:: javascript

   onChange callback @ 692(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``692``—``695`` 行；所属函数 ``accessRules.map callback @ 677``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:40186:40260:FUNCTION

.. rubric:: ``onValueChange callback @ 701``

.. code-block:: javascript

   onValueChange callback @ 701(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``701``—``701`` 行；所属函数 ``accessRules.map callback @ 677``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41768:41856:FUNCTION

.. rubric:: ``onClick callback @ 717``

.. code-block:: javascript

   onClick callback @ 717()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``accessRules.map callback @ 677``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41789:41855:FUNCTION

.. rubric:: ``setAccessRules callback @ 717``

.. code-block:: javascript

   setAccessRules callback @ 717(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``onClick callback @ 717``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41817:41854:FUNCTION

.. rubric:: ``current.filter callback @ 717``

.. code-block:: javascript

   current.filter callback @ 717(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``setAccessRules callback @ 717``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:44867:45859:FUNCTION

.. rubric:: ``configuredCommands.map callback @ 756``

.. code-block:: javascript

   configuredCommands.map callback @ 756(commandId)

作为 ``configuredCommands.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``756``—``768`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedCommands.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45340:45712:FUNCTION

.. rubric:: ``onCheckedChange callback @ 761``

.. code-block:: javascript

   onCheckedChange callback @ 761(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``761``—``765`` 行；所属函数 ``configuredCommands.map callback @ 756``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45372:45711:FUNCTION

.. rubric:: ``setAllowedCommands callback @ 761``

.. code-block:: javascript

   setAllowedCommands callback @ 761(current)

设置与 ``Allowed Commands`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``761``—``765`` 行；所属函数 ``onCheckedChange callback @ 761``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45628:45656:FUNCTION

.. rubric:: ``current.filter callback @ 764``

.. code-block:: javascript

   current.filter callback @ 764(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``764``—``764`` 行；所属函数 ``setAllowedCommands callback @ 761``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
