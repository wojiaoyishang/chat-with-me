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

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1510:1563:FUNCTION

.. js:function:: cloneValue(value)

   实现 ``cloneValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``51`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1593:1745:FUNCTION

.. js:function:: normalizeOperations(value)

   规范化与 ``Operations`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``56`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ACCESS_OPERATIONS.filter((item) => items.includes(item))``。

   **主要协作调用**：``Array.isArray``、``ACCESS_OPERATIONS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1774:2119:FUNCTION

.. js:function:: operationPresetFor(operations)

   实现 ``operationPresetFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``65`` 行。

   **参数**

   ``operations``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``key || 'all'``。

   **主要协作调用**：``normalizeOperations``、``Object.keys(OPERATION_PRESETS).find``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2149:2862:FUNCTION

.. js:function:: normalizeAccessRule(rule, index)

   规范化与 ``Access Rule`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``80`` 行。

   **参数**

   ``rule``
      调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``（默认值 ``0``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``、``Date.now``、``Math.random().toString(16).slice``、``Math.random().toString``、``Math.random``、``['path', 'glob', 'regex', 'exact'].includes``、``String(rule?.matcher?.pattern || '').replace``、``normalizeOperations``、``Array.isArray``、``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2890:3271:FUNCTION

.. js:function:: splitAccessPolicy(policy)

   实现 ``splitAccessPolicy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``82``—``89`` 行。

   **参数**

   ``policy``
      调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ defaultEffect: policy?.defaultEffect === 'deny' ? 'deny' : 'allow', deniedRules: rules.filter((rule) => rule.effect === 'deny' && rule.enabled), preservedRules: rules.filter((ru…``。

   **主要协作调用**：``(Array.isArray(policy?.rules) ? policy.rules : []).map``、``Array.isArray``、``rules.filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3302:3636:FUNCTION

.. js:function:: commandPolicyPayload(allowedCommandIds)

   实现 ``commandPolicyPayload`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``91``—``102`` 行。

   **参数**

   ``allowedCommandIds``
      调用方传入的 ``allowedCommandIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...allowedCommandIds].sort().map``、``[...allowedCommandIds].sort``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3656:3892:FUNCTION

.. js:function:: safeAlias(name, index)

   实现 ``safeAlias`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``104``—``111`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized || \x60mount-${index + 1}\x60``。

   **主要协作调用**：``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace(/^-+|-+$/g, '') .slice``、``String(name || '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace``、``String(name || '') .normalize('NFKD') .replace``、``String(name || '') .normalize``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3919:4006:FUNCTION

.. js:function:: cleanDisplayPath(value)

   实现 ``cleanDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``113``—``115`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '') .replace(/\\\//g, '\\') .replace``、``String(value || '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4041:4133:FUNCTION

.. js:function:: workspacePermissionLabel(value)

   实现 ``workspacePermissionLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``117`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4167:48450:FUNCTION

.. js:function:: WorkspaceSettingsDialog({open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSele…)

   渲染 ``WorkspaceSettingsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``119``—``817`` 行。

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

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1711:1741:FUNCTION

.. rubric:: ``ACCESS_OPERATIONS.filter callback @ 55``

.. code-block:: javascript

   ACCESS_OPERATIONS.filter callback @ 55(item)

作为 ``ACCESS_OPERATIONS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``normalizeOperations``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1901:2090:FUNCTION

.. rubric:: ``Object.keys(OPERATION_PRESETS).find callback @ 60``

.. code-block:: javascript

   Object.keys(OPERATION_PRESETS).find callback @ 60(item)

作为 ``Object.keys(OPERATION_PRESETS).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``63`` 行；所属函数 ``operationPresetFor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``candidate.length === normalized.length && candidate.every((operation) => normalized.includes(operation))``。

**主要协作调用**：``candidate.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2037:2082:FUNCTION

.. rubric:: ``candidate.every callback @ 62``

.. code-block:: javascript

   candidate.every callback @ 62(operation)

作为 ``candidate.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``Object.keys(OPERATION_PRESETS).find callback @ 60``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalized.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3123:3171:FUNCTION

.. rubric:: ``rules.filter callback @ 86``

.. code-block:: javascript

   rules.filter callback @ 86(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3211:3260:FUNCTION

.. rubric:: ``rules.filter callback @ 87``

.. code-block:: javascript

   rules.filter callback @ 87(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3417:3631:FUNCTION

.. rubric:: ``[...allowedCommandIds].sort().map callback @ 94``

.. code-block:: javascript

   [...allowedCommandIds].sort().map callback @ 94(commandId)

作为 ``[...allowedCommandIds].sort().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``101`` 行；所属函数 ``commandPolicyPayload``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5693:5882:FUNCTION

.. rubric:: ``useMemo callback @ 142``

.. code-block:: javascript

   useMemo callback @ 142()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``142``—``145`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...new Set(raw.map((item) => String(item || '').trim()).filter(Boolean))]``。

**主要协作调用**：``Array.isArray``、``raw.map((item) => String(item || '').trim()).filter``、``raw.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5821:5856:FUNCTION

.. rubric:: ``raw.map callback @ 144``

.. code-block:: javascript

   raw.map callback @ 144(item)

作为 ``raw.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``144``—``144`` 行；所属函数 ``useMemo callback @ 142``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5943:5969:FUNCTION

.. rubric:: ``useMemo callback @ 146``

.. code-block:: javascript

   useMemo callback @ 146()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6016:6227:FUNCTION

.. rubric:: ``useMemo callback @ 147``

.. code-block:: javascript

   useMemo callback @ 147()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``147``—``151`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``focused``、``workspaces.find((item) => selectedIdSet.has(item.id)) || null``。

**主要协作调用**：``workspaces.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6064:6104:FUNCTION

.. rubric:: ``workspaces.find callback @ 148``

.. code-block:: javascript

   workspaces.find callback @ 148(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``useMemo callback @ 147``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6175:6211:FUNCTION

.. rubric:: ``workspaces.find callback @ 150``

.. code-block:: javascript

   workspaces.find callback @ 150(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``useMemo callback @ 147``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6294:6558:FUNCTION

.. rubric:: ``useEffect callback @ 153``

.. code-block:: javascript

   useEffect callback @ 153()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``153``—``157`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workspaces.some``、``workspaces.find``、``setFocusedWorkspaceId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6352:6392:FUNCTION

.. rubric:: ``workspaces.some callback @ 154``

.. code-block:: javascript

   workspaces.some callback @ 154(item)

作为 ``workspaces.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``useEffect callback @ 153``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6440:6476:FUNCTION

.. rubric:: ``workspaces.find callback @ 155``

.. code-block:: javascript

   workspaces.find callback @ 155(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``useEffect callback @ 153``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6640:8333:FUNCTION

.. rubric:: ``useCallback callback @ 159``

.. code-block:: javascript

   async useCallback callback @ 159({quiet = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``159``—``183`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``{quiet = false}``（默认值 ``{}``）
   调用方传入的 ``quiet = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``encodeURIComponent``、``Promise.all``、``apiClient.get``、``Array.isArray``、``setWorkspaces``、``[...localWorkspaces, ...remoteWorkspaces].sort``、``setRoots``、``setDefaultAccessPolicy``、``cloneValue``、``setDefaultVisibilityPolicy``、``setQuickAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7625:7691:FUNCTION

.. rubric:: ``[...localWorkspaces, ...remoteWorkspaces].sort callback @ 173``

.. code-block:: javascript

   [...localWorkspaces, ...remoteWorkspaces].sort callback @ 173(a, b)

作为 ``[...localWorkspaces, ...remoteWorkspaces].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``useCallback callback @ 159``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name || '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8372:9068:FUNCTION

.. rubric:: ``useEffect callback @ 185``

.. code-block:: javascript

   useEffect callback @ 185()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``185``—``198`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { unsubscribeConnection?.(); unsubscribeAccess?.(); window.clearInterval(timer); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``load``、``onEvent({event: 'workspace.connection.status_changed'}).then``、``onEvent``、``onEvent({event: 'workspace.access.changed'}).then``、``window.setInterval``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8532:8557:FUNCTION

.. rubric:: ``onEvent({event: 'workspace.connection.status_changed'}).then callback @ 188``

.. code-block:: javascript

   onEvent({event: 'workspace.connection.status_changed'}).then callback @ 188()

处理 ``onEvent({event: 'workspace.connection.status_changed'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``useEffect callback @ 185``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8644:8669:FUNCTION

.. rubric:: ``onEvent({event: 'workspace.access.changed'}).then callback @ 189``

.. code-block:: javascript

   onEvent({event: 'workspace.access.changed'}).then callback @ 189()

处理 ``onEvent({event: 'workspace.access.changed'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``189``—``189`` 行；所属函数 ``useEffect callback @ 185``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8878:8903:FUNCTION

.. rubric:: ``window.setInterval callback @ 192``

.. code-block:: javascript

   window.setInterval callback @ 192()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``useEffect callback @ 185``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8928:9061:FUNCTION

.. rubric:: ``returned callback @ 193``

.. code-block:: javascript

   returned callback @ 193()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``193``—``197`` 行；所属函数 ``useEffect callback @ 185``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``unsubscribeConnection``、``unsubscribeAccess``、``window.clearInterval``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9123:10099:FUNCTION

.. rubric:: ``persistWorkspaceSelection``

.. code-block:: javascript

   async persistWorkspaceSelection(nextWorkspaceIds)

实现 ``persistWorkspaceSelection`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``200``—``222`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``nextWorkspaceIds``
   调用方传入的 ``nextWorkspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map((item) => String(item || '').trim()).filter``、``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map``、``Array.isArray``、``onWorkspaceChange``、``runWorkspaceSelectionMutation``、``persist``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9265:9300:FUNCTION

.. rubric:: ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 202``

.. code-block:: javascript

   (Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 202(item)

作为 ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9483:9664:FUNCTION

.. rubric:: ``persist``

.. code-block:: javascript

   persist()

实现 ``persist`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``207``—``210`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10129:10486:FUNCTION

.. rubric:: ``toggleWorkspace``

.. code-block:: javascript

   async toggleWorkspace(workspaceId, checked)

切换与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``224``—``232`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(workspaceId || '').trim``、``String``、``selectedIds.filter``、``setFocusedWorkspaceId``、``persistWorkspaceSelection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10311:10332:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 228``

.. code-block:: javascript

   selectedIds.filter callback @ 228(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10372:10393:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 229``

.. code-block:: javascript

   selectedIds.filter callback @ 229(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``229``—``229`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10518:10738:FUNCTION

.. rubric:: ``applyAccessPolicy``

.. code-block:: javascript

   applyAccessPolicy(policy)

应用与 ``Access Policy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``234``—``239`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``policy``
   调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``splitAccessPolicy``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10764:11126:FUNCTION

.. rubric:: ``beginCreate``

.. code-block:: javascript

   beginCreate()

实现 ``beginCreate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``251`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11150:11897:FUNCTION

.. rubric:: ``beginEdit``

.. code-block:: javascript

   beginEdit(workspace)

实现 ``beginEdit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``253``—``266`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``Boolean``、``setMounts``、``(workspace.mounts || []).map``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setConfiguredCommands``、``Array.isArray``、``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11340:11445:FUNCTION

.. rubric:: ``(workspace.mounts || []).map callback @ 257``

.. code-block:: javascript

   (workspace.mounts || []).map callback @ 257(item)

作为 ``(workspace.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``260`` 行；所属函数 ``beginEdit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11923:12303:FUNCTION

.. rubric:: ``stopEditing``

.. code-block:: javascript

   stopEditing()

停止与 ``Editing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``268``—``280`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``、``setVisibilityPolicy``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12326:13191:FUNCTION

.. rubric:: ``addMount``

.. code-block:: javascript

   addMount(folder)

新增与 ``Mount`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``282``—``300`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``mounts.some``、``toast.error``、``t``、``mounts.map``、``safeAlias``、``used.has``、``alias.toLowerCase``、``setMounts``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12379:12463:FUNCTION

.. rubric:: ``mounts.some callback @ 283``

.. code-block:: javascript

   mounts.some callback @ 283(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``283``—``283`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12631:12679:FUNCTION

.. rubric:: ``mounts.map callback @ 288``

.. code-block:: javascript

   mounts.map callback @ 288(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``288``—``288`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.alias || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12894:13183:FUNCTION

.. rubric:: ``setMounts callback @ 292``

.. code-block:: javascript

   setMounts callback @ 292(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``292``—``299`` 行；所属函数 ``addMount``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13222:13393:FUNCTION

.. rubric:: ``updateAccessRule``

.. code-block:: javascript

   updateAccessRule(index, patch)

更新与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``302``—``306`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13266:13385:FUNCTION

.. rubric:: ``setAccessRules callback @ 303``

.. code-block:: javascript

   setAccessRules callback @ 303(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``303``—``305`` 行；所属函数 ``updateAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13291:13384:FUNCTION

.. rubric:: ``current.map callback @ 303``

.. code-block:: javascript

   current.map callback @ 303(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``303``—``305`` 行；所属函数 ``setAccessRules callback @ 303``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13421:14213:FUNCTION

.. rubric:: ``addAccessRule``

.. code-block:: javascript

   addAccessRule(template)

新增与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``308``—``327`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``template``（默认值 ``null``）
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``accessRules.map``、``preservedAccessRules.map``、``normalizeAccessRule``、``accessRules.some``、``setAccessRules``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13528:13555:FUNCTION

.. rubric:: ``accessRules.map callback @ 311``

.. code-block:: javascript

   accessRules.map callback @ 311(item)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13598:13625:FUNCTION

.. rubric:: ``preservedAccessRules.map callback @ 312``

.. code-block:: javascript

   preservedAccessRules.map callback @ 312(item)

作为 ``preservedAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13986:14132:FUNCTION

.. rubric:: ``accessRules.some callback @ 323``

.. code-block:: javascript

   accessRules.some callback @ 323(item)

作为 ``accessRules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``323``—``325`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14174:14205:FUNCTION

.. rubric:: ``setAccessRules callback @ 326``

.. code-block:: javascript

   setAccessRules callback @ 326(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``addAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14244:14289:FUNCTION

.. rubric:: ``resetAccessRules``

.. code-block:: javascript

   resetAccessRules()

重置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAccessPolicy``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14323:15004:FUNCTION

.. rubric:: ``validateAccessRules``

.. code-block:: javascript

   validateAccessRules()

校验与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``331``—``349`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``rule.matcher.pattern.trim``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15023:18681:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save()

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``351``—``429`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(editingId || '').startsWith``、``String``、``name.trim``、``toast.error``、``t``、``mounts.some``、``validateAccessRules``、``setSaving``、``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map``、``[...preservedAccessRules, ...accessRules] .sort``、``commandPolicyPayload``、``apiClient.patch``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15360:15433:FUNCTION

.. rubric:: ``mounts.some callback @ 357``

.. code-block:: javascript

   mounts.some callback @ 357(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias?.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15830:15887:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort callback @ 368``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort callback @ 368(left, right)

作为 ``[...preservedAccessRules, ...accessRules] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``368``—``368`` 行；所属函数 ``save``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15914:16424:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 369``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 369(item)

作为 ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``369``—``378`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...rule, name: rule.name || rule.matcher.pattern, enabled: rule.effect === 'deny' ? true : rule.enabled, matcher: {...rule.matcher, pattern: rule.matcher.pattern.trim()}, operat…``。

**主要协作调用**：``rule.matcher.pattern.trim``、``normalizeOperations``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17203:17505:FUNCTION

.. rubric:: ``mounts.map callback @ 399``

.. code-block:: javascript

   mounts.map callback @ 399(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``399``—``405`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias.trim``、``Boolean``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18004:18197:FUNCTION

.. rubric:: ``setWorkspaces callback @ 414``

.. code-block:: javascript

   setWorkspaces callback @ 414(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``414``—``417`` 行；所属函数 ``save``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.sort((a, b) => a.name.localeCompare(b.name))``。

**主要协作调用**：``current.filter((item) => item.id !== saved.id).concat``、``current.filter``、``next.sort``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18063:18093:FUNCTION

.. rubric:: ``current.filter callback @ 415``

.. code-block:: javascript

   current.filter callback @ 415(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``415``—``415`` 行；所属函数 ``setWorkspaces callback @ 414``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18143:18181:FUNCTION

.. rubric:: ``next.sort callback @ 416``

.. code-block:: javascript

   next.sort callback @ 416(a, b)

作为 ``next.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``416``—``416`` 行；所属函数 ``setWorkspaces callback @ 414``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.name.localeCompare``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18711:19446:FUNCTION

.. rubric:: ``removeWorkspace``

.. code-block:: javascript

   async removeWorkspace()

移除与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``431``—``448`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSaving``、``apiClient.delete``、``encodeURIComponent``、``setWorkspaces``、``selectedIdSet.has``、``persistWorkspaceSelection``、``selectedIds.filter``、``setFocusedWorkspaceId``、``stopEditing``、``setDeleteOpen``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18931:18993:FUNCTION

.. rubric:: ``setWorkspaces callback @ 436``

.. code-block:: javascript

   setWorkspaces callback @ 436(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``436``—``436`` 行；所属函数 ``removeWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18959:18992:FUNCTION

.. rubric:: ``current.filter callback @ 436``

.. code-block:: javascript

   current.filter callback @ 436(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``436``—``436`` 行；所属函数 ``setWorkspaces callback @ 436``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19113:19143:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 438``

.. code-block:: javascript

   selectedIds.filter callback @ 438(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``438``—``438`` 行；所属函数 ``removeWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21485:26208:FUNCTION

.. rubric:: ``workspaces.map callback @ 478``

.. code-block:: javascript

   workspaces.map callback @ 478(item)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``478``—``529`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id} className={\x60flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0 ${focused ? 'bg-blue-50/70' : 'hover:bg-muted/40'}\x60} onClick={() => setFocusedWorkspa…``。

**主要协作调用**：``selectedIdSet.has``、``workspacePermissionLabel``、``(item.mounts || []).map((mount) => \x60/${mount.alias}\x60).join``、``(item.mounts || []).map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22026:22062:FUNCTION

.. rubric:: ``onClick callback @ 485``

.. code-block:: javascript

   onClick callback @ 485()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``485``—``485`` 行；所属函数 ``workspaces.map callback @ 478``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFocusedWorkspaceId``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22291:22342:FUNCTION

.. rubric:: ``onCheckedChange callback @ 489``

.. code-block:: javascript

   onCheckedChange callback @ 489(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``489``—``489`` 行；所属函数 ``workspaces.map callback @ 478``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:22401:22435:FUNCTION

.. rubric:: ``onClick callback @ 490``

.. code-block:: javascript

   onClick callback @ 490(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``490``—``490`` 行；所属函数 ``workspaces.map callback @ 478``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24905:24933:FUNCTION

.. rubric:: ``(item.mounts || []).map callback @ 509``

.. code-block:: javascript

   (item.mounts || []).map callback @ 509(mount)

作为 ``(item.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``509``—``509`` 行；所属函数 ``workspaces.map callback @ 478``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:25427:25719:FUNCTION

.. rubric:: ``onClick callback @ 517``

.. code-block:: javascript

   onClick callback @ 517(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``517``—``521`` 行；所属函数 ``workspaces.map callback @ 478``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``setFocusedWorkspaceId``、``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27258:27295:FUNCTION

.. rubric:: ``onClick callback @ 543``

.. code-block:: javascript

   onClick callback @ 543()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``543``—``543`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:27696:27721:FUNCTION

.. rubric:: ``onClick callback @ 547``

.. code-block:: javascript

   onClick callback @ 547()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``547``—``547`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:28103:28281:FUNCTION

.. rubric:: ``(selected.mounts || []).map callback @ 553``

.. code-block:: javascript

   (selected.mounts || []).map callback @ 553(mount)

作为 ``(selected.mounts || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``553``—``555`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:29058:29096:FUNCTION

.. rubric:: ``onChange callback @ 570``

.. code-block:: javascript

   onChange callback @ 570(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``570``—``570`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:30354:30380:FUNCTION

.. rubric:: ``onClick callback @ 585``

.. code-block:: javascript

   onClick callback @ 585()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``585``—``585`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:31267:35402:FUNCTION

.. rubric:: ``mounts.map callback @ 597``

.. code-block:: javascript

   mounts.map callback @ 597(mount, index)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``597``—``638`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``、``String(editingId || '').startsWith``、``String``、``t``、``Boolean``、``roots.find``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32764:32847:FUNCTION

.. rubric:: ``onClick callback @ 611``

.. code-block:: javascript

   onClick callback @ 611()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``611``—``611`` 行；所属函数 ``mounts.map callback @ 597``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32780:32846:FUNCTION

.. rubric:: ``setMounts callback @ 611``

.. code-block:: javascript

   setMounts callback @ 611(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``611``—``611`` 行；所属函数 ``onClick callback @ 611``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32808:32845:FUNCTION

.. rubric:: ``current.filter callback @ 611``

.. code-block:: javascript

   current.filter callback @ 611(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``611``—``611`` 行；所属函数 ``setMounts callback @ 611``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33662:33796:FUNCTION

.. rubric:: ``onChange callback @ 621``

.. code-block:: javascript

   onChange callback @ 621(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``621``—``621`` 行；所属函数 ``mounts.map callback @ 597``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33683:33795:FUNCTION

.. rubric:: ``setMounts callback @ 621``

.. code-block:: javascript

   setMounts callback @ 621(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``621``—``621`` 行；所属函数 ``onChange callback @ 621``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:33708:33794:FUNCTION

.. rubric:: ``current.map callback @ 621``

.. code-block:: javascript

   current.map callback @ 621(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``621``—``621`` 行；所属函数 ``setMounts callback @ 621``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34482:34516:FUNCTION

.. rubric:: ``roots.find callback @ 628``

.. code-block:: javascript

   roots.find callback @ 628(root)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``628``—``628`` 行；所属函数 ``mounts.map callback @ 597``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34615:34743:FUNCTION

.. rubric:: ``onCheckedChange callback @ 629``

.. code-block:: javascript

   onCheckedChange callback @ 629(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``629``—``629`` 行；所属函数 ``mounts.map callback @ 597``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34638:34742:FUNCTION

.. rubric:: ``setMounts callback @ 629``

.. code-block:: javascript

   setMounts callback @ 629(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``629``—``629`` 行；所属函数 ``onCheckedChange callback @ 629``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34663:34741:FUNCTION

.. rubric:: ``current.map callback @ 629``

.. code-block:: javascript

   current.map callback @ 629(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``629``—``629`` 行；所属函数 ``setMounts callback @ 629``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:36862:36883:FUNCTION

.. rubric:: ``onClick callback @ 659``

.. code-block:: javascript

   onClick callback @ 659()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``659``—``659`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37091:37403:FUNCTION

.. rubric:: ``quickAccessRules.map callback @ 662``

.. code-block:: javascript

   quickAccessRules.map callback @ 662(rule)

作为 ``quickAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``662``—``666`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37218:37243:FUNCTION

.. rubric:: ``onClick callback @ 663``

.. code-block:: javascript

   onClick callback @ 663()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``663``—``663`` 行；所属函数 ``quickAccessRules.map callback @ 662``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37929:42102:FUNCTION

.. rubric:: ``accessRules.map callback @ 674``

.. code-block:: javascript

   accessRules.map callback @ 674(rule, index)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``674``—``719`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``operationPresetFor``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38353:38430:FUNCTION

.. rubric:: ``onValueChange callback @ 678``

.. code-block:: javascript

   onValueChange callback @ 678(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``678``—``678`` 行；所属函数 ``accessRules.map callback @ 674``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:39368:39654:FUNCTION

.. rubric:: ``onChange callback @ 689``

.. code-block:: javascript

   onChange callback @ 689(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``689``—``692`` 行；所属函数 ``accessRules.map callback @ 674``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:40149:40223:FUNCTION

.. rubric:: ``onValueChange callback @ 698``

.. code-block:: javascript

   onValueChange callback @ 698(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``698``—``698`` 行；所属函数 ``accessRules.map callback @ 674``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41731:41819:FUNCTION

.. rubric:: ``onClick callback @ 714``

.. code-block:: javascript

   onClick callback @ 714()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``714``—``714`` 行；所属函数 ``accessRules.map callback @ 674``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41752:41818:FUNCTION

.. rubric:: ``setAccessRules callback @ 714``

.. code-block:: javascript

   setAccessRules callback @ 714(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``714``—``714`` 行；所属函数 ``onClick callback @ 714``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41780:41817:FUNCTION

.. rubric:: ``current.filter callback @ 714``

.. code-block:: javascript

   current.filter callback @ 714(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``714``—``714`` 行；所属函数 ``setAccessRules callback @ 714``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:44830:45822:FUNCTION

.. rubric:: ``configuredCommands.map callback @ 753``

.. code-block:: javascript

   configuredCommands.map callback @ 753(commandId)

作为 ``configuredCommands.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``753``—``765`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedCommands.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45303:45675:FUNCTION

.. rubric:: ``onCheckedChange callback @ 758``

.. code-block:: javascript

   onCheckedChange callback @ 758(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``758``—``762`` 行；所属函数 ``configuredCommands.map callback @ 753``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45335:45674:FUNCTION

.. rubric:: ``setAllowedCommands callback @ 758``

.. code-block:: javascript

   setAllowedCommands callback @ 758(current)

设置与 ``Allowed Commands`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``758``—``762`` 行；所属函数 ``onCheckedChange callback @ 758``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45591:45619:FUNCTION

.. rubric:: ``current.filter callback @ 761``

.. code-block:: javascript

   current.filter callback @ 761(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``761``—``761`` 行；所属函数 ``setAllowedCommands callback @ 758``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
