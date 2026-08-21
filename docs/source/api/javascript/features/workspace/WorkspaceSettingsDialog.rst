src/features/workspace/WorkspaceSettingsDialog 模块
=================================================

.. js:module:: src/features/workspace/WorkspaceSettingsDialog

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/workspace/WorkspaceSettingsDialog.jsx``
* **模块标识**：``src/features/workspace/WorkspaceSettingsDialog``
* **顶层函数/组件/Hook**：9
* **类**：0
* **局部函数与匿名回调**：107

主要依赖
--------

``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``@/components/ui/input``、``@/components/ui/label``、``@/components/ui/separator``、``@/components/ui/switch``、``@/components/ui/select``、``@/components/ui/DeleteConfirmDialog``、``./components/FolderBrowserDialog.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1494:1547:FUNCTION

.. js:function:: cloneValue(value)

   实现 ``cloneValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``53`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1577:1729:FUNCTION

.. js:function:: normalizeOperations(value)

   规范化与 ``Operations`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``58`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ACCESS_OPERATIONS.filter((item) => items.includes(item))``。

   **主要协作调用**：``Array.isArray``、``ACCESS_OPERATIONS.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1758:2103:FUNCTION

.. js:function:: operationPresetFor(operations)

   实现 ``operationPresetFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``67`` 行。

   **参数**

   ``operations``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``key \|\| 'all'``。

   **主要协作调用**：``normalizeOperations``、``Object.keys(OPERATION_PRESETS).find``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2133:2846:FUNCTION

.. js:function:: normalizeAccessRule(rule, index)

   规范化与 ``Access Rule`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``82`` 行。

   **参数**

   ``rule``
      调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``（默认值 ``0``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``、``Date.now``、``Math.random().toString(16).slice``、``Math.random().toString``、``Math.random``、``['path', 'glob', 'regex', 'exact'].includes``、``String(rule?.matcher?.pattern \|\| '').replace``、``normalizeOperations``、``Array.isArray``、``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2874:3255:FUNCTION

.. js:function:: splitAccessPolicy(policy)

   实现 ``splitAccessPolicy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``84``—``91`` 行。

   **参数**

   ``policy``
      调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ defaultEffect: policy?.defaultEffect === 'deny' ? 'deny' : 'allow', deniedRules: rules.filter((rule) => rule.effect === 'deny' && rule.enabled), preservedRules: rules.filter((ru…``。

   **主要协作调用**：``(Array.isArray(policy?.rules) ? policy.rules : []).map``、``Array.isArray``、``rules.filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3286:3620:FUNCTION

.. js:function:: commandPolicyPayload(allowedCommandIds)

   实现 ``commandPolicyPayload`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``104`` 行。

   **参数**

   ``allowedCommandIds``
      调用方传入的 ``allowedCommandIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...allowedCommandIds].sort().map``、``[...allowedCommandIds].sort``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3640:3876:FUNCTION

.. js:function:: safeAlias(name, index)

   实现 ``safeAlias`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``106``—``113`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized \|\| \`mount-${index + 1}\```。

   **主要协作调用**：``String(name \|\| '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace(/^-+\|-+$/g, '') .slice``、``String(name \|\| '') .normalize('NFKD') .replace(/[^A-Za-z0-9._-]+/g, '-') .replace``、``String(name \|\| '') .normalize('NFKD') .replace``、``String(name \|\| '') .normalize``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3903:3990:FUNCTION

.. js:function:: cleanDisplayPath(value)

   实现 ``cleanDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``117`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value \|\| '') .replace(/\\\//g, '\\') .replace``、``String(value \|\| '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4024:51674:FUNCTION

.. js:function:: WorkspaceSettingsDialog({open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, t})

   渲染 ``WorkspaceSettingsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``119``—``882`` 行。

   **参数**

   ``{open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, t}``
      调用方传入的 ``open, onOpenChange, conversationId, selectedWorkspaceIds = , onWorkspaceChange, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="max-h-[92vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-3xl"> <DialogHe…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useMemo``、``useEffect``、``useCallback``、``t``、``workspaces.map``、``pairingCode.trim``、``(selected.mounts \|\| []).map``、``String(editingId \|\| '').startsWith``、``String``、``mounts.map``、``quickAccessRules.map``。

   **内部回调数量**：35。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1695:1725:FUNCTION

.. rubric:: ``ACCESS_OPERATIONS.filter callback @ 57``

.. code-block:: javascript

   ACCESS_OPERATIONS.filter callback @ 57(item)

作为 ``ACCESS_OPERATIONS.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``normalizeOperations``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1885:2074:FUNCTION

.. rubric:: ``Object.keys(OPERATION_PRESETS).find callback @ 62``

.. code-block:: javascript

   Object.keys(OPERATION_PRESETS).find callback @ 62(item)

作为 ``Object.keys(OPERATION_PRESETS).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``operationPresetFor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``candidate.length === normalized.length && candidate.every((operation) => normalized.includes(operation))``。

**主要协作调用**：``candidate.every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2021:2066:FUNCTION

.. rubric:: ``candidate.every callback @ 64``

.. code-block:: javascript

   candidate.every callback @ 64(operation)

作为 ``candidate.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``Object.keys(OPERATION_PRESETS).find callback @ 62``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalized.includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3107:3155:FUNCTION

.. rubric:: ``rules.filter callback @ 88``

.. code-block:: javascript

   rules.filter callback @ 88(rule)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``splitAccessPolicy``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3195:3244:FUNCTION

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

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3401:3615:FUNCTION

.. rubric:: ``[...allowedCommandIds].sort().map callback @ 96``

.. code-block:: javascript

   [...allowedCommandIds].sort().map callback @ 96(commandId)

作为 ``[...allowedCommandIds].sort().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``103`` 行；所属函数 ``commandPolicyPayload``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5626:5815:FUNCTION

.. rubric:: ``useMemo callback @ 144``

.. code-block:: javascript

   useMemo callback @ 144()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``147`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...new Set(raw.map((item) => String(item \|\| '').trim()).filter(Boolean))]``。

**主要协作调用**：``Array.isArray``、``raw.map((item) => String(item \|\| '').trim()).filter``、``raw.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5754:5789:FUNCTION

.. rubric:: ``raw.map callback @ 146``

.. code-block:: javascript

   raw.map callback @ 146(item)

作为 ``raw.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``useMemo callback @ 144``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item \|\| '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5876:5902:FUNCTION

.. rubric:: ``useMemo callback @ 148``

.. code-block:: javascript

   useMemo callback @ 148()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5949:6160:FUNCTION

.. rubric:: ``useMemo callback @ 149``

.. code-block:: javascript

   useMemo callback @ 149()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``153`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``focused``、``workspaces.find((item) => selectedIdSet.has(item.id)) \|\| null``。

**主要协作调用**：``workspaces.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5997:6037:FUNCTION

.. rubric:: ``workspaces.find callback @ 150``

.. code-block:: javascript

   workspaces.find callback @ 150(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``useMemo callback @ 149``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6108:6144:FUNCTION

.. rubric:: ``workspaces.find callback @ 152``

.. code-block:: javascript

   workspaces.find callback @ 152(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``useMemo callback @ 149``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6227:6491:FUNCTION

.. rubric:: ``useEffect callback @ 155``

.. code-block:: javascript

   useEffect callback @ 155()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``155``—``159`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workspaces.some``、``workspaces.find``、``setFocusedWorkspaceId``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6285:6325:FUNCTION

.. rubric:: ``workspaces.some callback @ 156``

.. code-block:: javascript

   workspaces.some callback @ 156(item)

作为 ``workspaces.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``useEffect callback @ 155``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6373:6409:FUNCTION

.. rubric:: ``workspaces.find callback @ 157``

.. code-block:: javascript

   workspaces.find callback @ 157(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``useEffect callback @ 155``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedIdSet.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6573:8196:FUNCTION

.. rubric:: ``useCallback callback @ 161``

.. code-block:: javascript

   async useCallback callback @ 161()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``161``—``185`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``encodeURIComponent``、``Promise.all``、``apiClient.get``、``Array.isArray``、``setWorkspaces``、``[...localWorkspaces, ...pairedRemote].sort``、``setRoots``、``setDefaultAccessPolicy``、``cloneValue``、``setDefaultVisibilityPolicy``、``setQuickAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7500:7566:FUNCTION

.. rubric:: ``[...localWorkspaces, ...pairedRemote].sort callback @ 175``

.. code-block:: javascript

   [...localWorkspaces, ...pairedRemote].sort callback @ 175(a, b)

作为 ``[...localWorkspaces, ...pairedRemote].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``useCallback callback @ 161``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name \|\| '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8235:8274:FUNCTION

.. rubric:: ``useEffect callback @ 187``

.. code-block:: javascript

   useEffect callback @ 187()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``187``—``189`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8329:9088:FUNCTION

.. rubric:: ``persistWorkspaceSelection``

.. code-block:: javascript

   async persistWorkspaceSelection(nextWorkspaceIds)

实现 ``persistWorkspaceSelection`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``191``—``208`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``nextWorkspaceIds``
   调用方传入的 ``nextWorkspaceIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map((item) => String(item \|\| '').trim()).filter``、``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map``、``Array.isArray``、``onWorkspaceChange``、``apiClient.put``、``encodeURIComponent``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8471:8506:FUNCTION

.. rubric:: ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 193``

.. code-block:: javascript

   (Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback @ 193(item)

作为 ``(Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``persistWorkspaceSelection``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item \|\| '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9118:9475:FUNCTION

.. rubric:: ``toggleWorkspace``

.. code-block:: javascript

   async toggleWorkspace(workspaceId, checked)

切换与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``210``—``218`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(workspaceId \|\| '').trim``、``String``、``selectedIds.filter``、``setFocusedWorkspaceId``、``persistWorkspaceSelection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9300:9321:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 214``

.. code-block:: javascript

   selectedIds.filter callback @ 214(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9361:9382:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 215``

.. code-block:: javascript

   selectedIds.filter callback @ 215(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``toggleWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9509:11126:FUNCTION

.. rubric:: ``pairRemoteWorkspace``

.. code-block:: javascript

   async pairRemoteWorkspace()

实现 ``pairRemoteWorkspace`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``220``—``250`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('目标机没有提供可访问的 Workspace 根目录')``。

**主要协作调用**：``pairingCode.trim``、``toast.error``、``setPairing``、``apiClient.post``、``setPairingCode``、``Array.isArray``、``setWorkspaces``、``pairedWorkspaces.find``、``persistWorkspaceSelection``、``setFocusedWorkspaceId``、``beginEdit``、``toast.success``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10098:10427:FUNCTION

.. rubric:: ``setWorkspaces callback @ 232``

.. code-block:: javascript

   setWorkspaces callback @ 232(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``232``—``236`` 行；所属函数 ``pairRemoteWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.sort((a, b) => String(a.name \|\| '').localeCompare(String(b.name \|\| '')))``。

**主要协作调用**：``current.filter((item) => !agentId \|\| item.agentId !== agentId).concat``、``current.filter``、``next.sort``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10238:10284:FUNCTION

.. rubric:: ``current.filter callback @ 234``

.. code-block:: javascript

   current.filter callback @ 234(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``setWorkspaces callback @ 232``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10345:10411:FUNCTION

.. rubric:: ``next.sort callback @ 235``

.. code-block:: javascript

   next.sort callback @ 235(a, b)

作为 ``next.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``setWorkspaces callback @ 232``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name \|\| '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10480:10528:FUNCTION

.. rubric:: ``pairedWorkspaces.find callback @ 237``

.. code-block:: javascript

   pairedWorkspaces.find callback @ 237(item)

作为 ``pairedWorkspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``pairRemoteWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10571:10597:FUNCTION

.. rubric:: ``pairedWorkspaces.find callback @ 238``

.. code-block:: javascript

   pairedWorkspaces.find callback @ 238(item)

作为 ``pairedWorkspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``pairRemoteWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11162:12165:FUNCTION

.. rubric:: ``unpairRemoteWorkspace``

.. code-block:: javascript

   async unpairRemoteWorkspace(workspace)

实现 ``unpairRemoteWorkspace`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``252``—``270`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSaving``、``apiClient.delete``、``encodeURIComponent``、``workspaces.filter((item) => item.agentId === workspace.agentId).map``、``workspaces.filter``、``setWorkspaces``、``selectedIds.some``、``persistWorkspaceSelection``、``selectedIds.filter``、``removedIds.has``、``setFocusedWorkspaceId``、``stopEditing``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11452:11496:FUNCTION

.. rubric:: ``workspaces.filter callback @ 257``

.. code-block:: javascript

   workspaces.filter callback @ 257(item)

作为 ``workspaces.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``unpairRemoteWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11502:11519:FUNCTION

.. rubric:: ``workspaces.filter((item) => item.agentId === workspace.agentId).map callback @ 257``

.. code-block:: javascript

   workspaces.filter((item) => item.agentId === workspace.agentId).map callback @ 257(item)

作为 ``workspaces.filter((item) => item.agentId === workspace.agentId).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``unpairRemoteWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11549:11622:FUNCTION

.. rubric:: ``setWorkspaces callback @ 258``

.. code-block:: javascript

   setWorkspaces callback @ 258(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``unpairRemoteWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11577:11621:FUNCTION

.. rubric:: ``current.filter callback @ 258``

.. code-block:: javascript

   current.filter callback @ 258(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``setWorkspaces callback @ 258``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11658:11684:FUNCTION

.. rubric:: ``selectedIds.some callback @ 259``

.. code-block:: javascript

   selectedIds.some callback @ 259(id)

作为 ``selectedIds.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``unpairRemoteWorkspace``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removedIds.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11756:11787:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 260``

.. code-block:: javascript

   selectedIds.filter callback @ 260(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``unpairRemoteWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removedIds.has``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12197:12417:FUNCTION

.. rubric:: ``applyAccessPolicy``

.. code-block:: javascript

   applyAccessPolicy(policy)

应用与 ``Access Policy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``272``—``277`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``policy``
   调用方传入的 ``policy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``splitAccessPolicy``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12443:12805:FUNCTION

.. rubric:: ``beginCreate``

.. code-block:: javascript

   beginCreate()

实现 ``beginCreate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``279``—``289`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:12829:13576:FUNCTION

.. rubric:: ``beginEdit``

.. code-block:: javascript

   beginEdit(workspace)

实现 ``beginEdit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``291``—``304`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``Boolean``、``setMounts``、``(workspace.mounts \|\| []).map``、``applyAccessPolicy``、``setVisibilityPolicy``、``cloneValue``、``setConfiguredCommands``、``Array.isArray``、``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13019:13124:FUNCTION

.. rubric:: ``(workspace.mounts \|\| []).map callback @ 295``

.. code-block:: javascript

   (workspace.mounts || []).map callback @ 295(item)

作为 ``(workspace.mounts \|\| []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``295``—``298`` 行；所属函数 ``beginEdit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:13602:13982:FUNCTION

.. rubric:: ``stopEditing``

.. code-block:: javascript

   stopEditing()

停止与 ``Editing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``306``—``318`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditingId``、``setName``、``setReadOnly``、``setMounts``、``setAccessDefaultEffect``、``setAccessRules``、``setPreservedAccessRules``、``setVisibilityPolicy``、``setConfiguredCommands``、``setAllowedCommands``、``setShellAllowed``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14005:14870:FUNCTION

.. rubric:: ``addMount``

.. code-block:: javascript

   addMount(folder)

新增与 ``Mount`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``320``—``338`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``mounts.some``、``toast.error``、``t``、``mounts.map``、``safeAlias``、``used.has``、``alias.toLowerCase``、``setMounts``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14058:14142:FUNCTION

.. rubric:: ``mounts.some callback @ 321``

.. code-block:: javascript

   mounts.some callback @ 321(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``321``—``321`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14310:14358:FUNCTION

.. rubric:: ``mounts.map callback @ 326``

.. code-block:: javascript

   mounts.map callback @ 326(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``addMount``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.alias \|\| '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14573:14862:FUNCTION

.. rubric:: ``setMounts callback @ 330``

.. code-block:: javascript

   setMounts callback @ 330(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``330``—``337`` 行；所属函数 ``addMount``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``cleanDisplayPath``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14901:15072:FUNCTION

.. rubric:: ``updateAccessRule``

.. code-block:: javascript

   updateAccessRule(index, patch)

更新与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``340``—``344`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14945:15064:FUNCTION

.. rubric:: ``setAccessRules callback @ 341``

.. code-block:: javascript

   setAccessRules callback @ 341(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``341``—``343`` 行；所属函数 ``updateAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:14970:15063:FUNCTION

.. rubric:: ``current.map callback @ 341``

.. code-block:: javascript

   current.map callback @ 341(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``341``—``343`` 行；所属函数 ``setAccessRules callback @ 341``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15100:15892:FUNCTION

.. rubric:: ``addAccessRule``

.. code-block:: javascript

   addAccessRule(template)

新增与 ``Access Rule`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``346``—``365`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``template``（默认值 ``null``）
   调用方传入的 ``template`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``accessRules.map``、``preservedAccessRules.map``、``normalizeAccessRule``、``accessRules.some``、``setAccessRules``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15207:15234:FUNCTION

.. rubric:: ``accessRules.map callback @ 349``

.. code-block:: javascript

   accessRules.map callback @ 349(item)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``349``—``349`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15277:15304:FUNCTION

.. rubric:: ``preservedAccessRules.map callback @ 350``

.. code-block:: javascript

   preservedAccessRules.map callback @ 350(item)

作为 ``preservedAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``350``—``350`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15665:15811:FUNCTION

.. rubric:: ``accessRules.some callback @ 361``

.. code-block:: javascript

   accessRules.some callback @ 361(item)

作为 ``accessRules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``361``—``363`` 行；所属函数 ``addAccessRule``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15853:15884:FUNCTION

.. rubric:: ``setAccessRules callback @ 364``

.. code-block:: javascript

   setAccessRules callback @ 364(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``364``—``364`` 行；所属函数 ``addAccessRule``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:15923:15968:FUNCTION

.. rubric:: ``resetAccessRules``

.. code-block:: javascript

   resetAccessRules()

重置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``367``—``367`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAccessPolicy``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16002:16683:FUNCTION

.. rubric:: ``validateAccessRules``

.. code-block:: javascript

   validateAccessRules()

校验与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``369``—``387`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``rule.matcher.pattern.trim``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:16702:20796:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save()

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``389``—``469`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(editingId \|\| '').startsWith``、``String``、``name.trim``、``toast.error``、``t``、``mounts.some``、``validateAccessRules``、``setSaving``、``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map``、``[...preservedAccessRules, ...accessRules] .sort``、``commandPolicyPayload``、``workspaces.find``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17039:17112:FUNCTION

.. rubric:: ``mounts.some callback @ 395``

.. code-block:: javascript

   mounts.some callback @ 395(item)

作为 ``mounts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``395``—``395`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias?.trim``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17509:17566:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort callback @ 406``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort callback @ 406(left, right)

作为 ``[...preservedAccessRules, ...accessRules] .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``406``—``406`` 行；所属函数 ``save``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:17593:18103:FUNCTION

.. rubric:: ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 407``

.. code-block:: javascript

   [...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback @ 407(item)

作为 ``[...preservedAccessRules, ...accessRules] .sort((left, right) => (left._order ?? 0) - (right._order ?? 0)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``407``—``416`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...rule, name: rule.name \|\| rule.matcher.pattern, enabled: rule.effect === 'deny' ? true : rule.enabled, matcher: {...rule.matcher, pattern: rule.matcher.pattern.trim()}, operat…``。

**主要协作调用**：``rule.matcher.pattern.trim``、``normalizeOperations``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:18497:18528:FUNCTION

.. rubric:: ``workspaces.find callback @ 427``

.. code-block:: javascript

   workspaces.find callback @ 427(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``427``—``427`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:19318:19620:FUNCTION

.. rubric:: ``mounts.map callback @ 439``

.. code-block:: javascript

   mounts.map callback @ 439(item)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``439``—``445`` 行；所属函数 ``save``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.alias.trim``、``Boolean``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20119:20312:FUNCTION

.. rubric:: ``setWorkspaces callback @ 454``

.. code-block:: javascript

   setWorkspaces callback @ 454(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``454``—``457`` 行；所属函数 ``save``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.sort((a, b) => a.name.localeCompare(b.name))``。

**主要协作调用**：``current.filter((item) => item.id !== saved.id).concat``、``current.filter``、``next.sort``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20178:20208:FUNCTION

.. rubric:: ``current.filter callback @ 455``

.. code-block:: javascript

   current.filter callback @ 455(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``455``—``455`` 行；所属函数 ``setWorkspaces callback @ 454``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20258:20296:FUNCTION

.. rubric:: ``next.sort callback @ 456``

.. code-block:: javascript

   next.sort callback @ 456(a, b)

作为 ``next.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``456``—``456`` 行；所属函数 ``setWorkspaces callback @ 454``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.name.localeCompare``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:20826:21561:FUNCTION

.. rubric:: ``removeWorkspace``

.. code-block:: javascript

   async removeWorkspace()

移除与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``471``—``488`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSaving``、``apiClient.delete``、``encodeURIComponent``、``setWorkspaces``、``selectedIdSet.has``、``persistWorkspaceSelection``、``selectedIds.filter``、``setFocusedWorkspaceId``、``stopEditing``、``setDeleteOpen``、``toast.error``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21046:21108:FUNCTION

.. rubric:: ``setWorkspaces callback @ 476``

.. code-block:: javascript

   setWorkspaces callback @ 476(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``476``—``476`` 行；所属函数 ``removeWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21074:21107:FUNCTION

.. rubric:: ``current.filter callback @ 476``

.. code-block:: javascript

   current.filter callback @ 476(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``476``—``476`` 行；所属函数 ``setWorkspaces callback @ 476``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:21228:21258:FUNCTION

.. rubric:: ``selectedIds.filter callback @ 478``

.. code-block:: javascript

   selectedIds.filter callback @ 478(item)

作为 ``selectedIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``478``—``478`` 行；所属函数 ``removeWorkspace``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:23588:27497:FUNCTION

.. rubric:: ``workspaces.map callback @ 518``

.. code-block:: javascript

   workspaces.map callback @ 518(item)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``518``—``565`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id} className={\`flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0 ${focused ? 'bg-blue-50/70' : 'hover:bg-muted/40'}\`} onClick={() => setFocusedWorkspa…``。

**主要协作调用**：``selectedIdSet.has``、``(item.mounts \|\| []).map((mount) => \`/${mount.alias}\`).join``、``(item.mounts \|\| []).map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24129:24165:FUNCTION

.. rubric:: ``onClick callback @ 525``

.. code-block:: javascript

   onClick callback @ 525()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``525``—``525`` 行；所属函数 ``workspaces.map callback @ 518``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFocusedWorkspaceId``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24394:24445:FUNCTION

.. rubric:: ``onCheckedChange callback @ 529``

.. code-block:: javascript

   onCheckedChange callback @ 529(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``529``—``529`` 行；所属函数 ``workspaces.map callback @ 518``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:24504:24538:FUNCTION

.. rubric:: ``onClick callback @ 530``

.. code-block:: javascript

   onClick callback @ 530(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``530``—``530`` 行；所属函数 ``workspaces.map callback @ 518``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:26301:26329:FUNCTION

.. rubric:: ``(item.mounts \|\| []).map callback @ 546``

.. code-block:: javascript

   (item.mounts || []).map callback @ 546(mount)

作为 ``(item.mounts \|\| []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``workspaces.map callback @ 518``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:26823:27115:FUNCTION

.. rubric:: ``onClick callback @ 554``

.. code-block:: javascript

   onClick callback @ 554(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``554``—``558`` 行；所属函数 ``workspaces.map callback @ 518``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``setFocusedWorkspaceId``、``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:29086:29131:FUNCTION

.. rubric:: ``onChange callback @ 586``

.. code-block:: javascript

   onChange callback @ 586(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``586``—``586`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPairingCode``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:29188:29378:FUNCTION

.. rubric:: ``onKeyDown callback @ 587``

.. code-block:: javascript

   onKeyDown callback @ 587(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``587``—``589`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pairingCode.trim``、``pairRemoteWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:30632:30669:FUNCTION

.. rubric:: ``onClick callback @ 608``

.. code-block:: javascript

   onClick callback @ 608()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``608``—``608`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginEdit``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:31006:31043:FUNCTION

.. rubric:: ``onClick callback @ 612``

.. code-block:: javascript

   onClick callback @ 612()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``612``—``612`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``unpairRemoteWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:31353:31378:FUNCTION

.. rubric:: ``onClick callback @ 616``

.. code-block:: javascript

   onClick callback @ 616()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``616``—``616`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:31753:31931:FUNCTION

.. rubric:: ``(selected.mounts \|\| []).map callback @ 622``

.. code-block:: javascript

   (selected.mounts || []).map callback @ 622(mount)

作为 ``(selected.mounts \|\| []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``622``—``624`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:32708:32746:FUNCTION

.. rubric:: ``onChange callback @ 639``

.. code-block:: javascript

   onChange callback @ 639(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``639``—``639`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34004:34030:FUNCTION

.. rubric:: ``onClick callback @ 654``

.. code-block:: javascript

   onClick callback @ 654()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``654``—``654`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserOpen``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:34917:39052:FUNCTION

.. rubric:: ``mounts.map callback @ 666``

.. code-block:: javascript

   mounts.map callback @ 666(mount, index)

作为 ``mounts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``666``—``707`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanDisplayPath``、``String(editingId \|\| '').startsWith``、``String``、``t``、``Boolean``、``roots.find``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:36414:36497:FUNCTION

.. rubric:: ``onClick callback @ 680``

.. code-block:: javascript

   onClick callback @ 680()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``mounts.map callback @ 666``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:36430:36496:FUNCTION

.. rubric:: ``setMounts callback @ 680``

.. code-block:: javascript

   setMounts callback @ 680(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``onClick callback @ 680``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:36458:36495:FUNCTION

.. rubric:: ``current.filter callback @ 680``

.. code-block:: javascript

   current.filter callback @ 680(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``setMounts callback @ 680``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37312:37446:FUNCTION

.. rubric:: ``onChange callback @ 690``

.. code-block:: javascript

   onChange callback @ 690(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``690``—``690`` 行；所属函数 ``mounts.map callback @ 666``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37333:37445:FUNCTION

.. rubric:: ``setMounts callback @ 690``

.. code-block:: javascript

   setMounts callback @ 690(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``690``—``690`` 行；所属函数 ``onChange callback @ 690``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:37358:37444:FUNCTION

.. rubric:: ``current.map callback @ 690``

.. code-block:: javascript

   current.map callback @ 690(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``690``—``690`` 行；所属函数 ``setMounts callback @ 690``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38132:38166:FUNCTION

.. rubric:: ``roots.find callback @ 697``

.. code-block:: javascript

   roots.find callback @ 697(root)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``697``—``697`` 行；所属函数 ``mounts.map callback @ 666``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38265:38393:FUNCTION

.. rubric:: ``onCheckedChange callback @ 698``

.. code-block:: javascript

   onCheckedChange callback @ 698(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``698``—``698`` 行；所属函数 ``mounts.map callback @ 666``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMounts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38288:38392:FUNCTION

.. rubric:: ``setMounts callback @ 698``

.. code-block:: javascript

   setMounts callback @ 698(current)

设置与 ``Mounts`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``698``—``698`` 行；所属函数 ``onCheckedChange callback @ 698``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:38313:38391:FUNCTION

.. rubric:: ``current.map callback @ 698``

.. code-block:: javascript

   current.map callback @ 698(item, itemIndex)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``698``—``698`` 行；所属函数 ``setMounts callback @ 698``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:40512:40533:FUNCTION

.. rubric:: ``onClick callback @ 728``

.. code-block:: javascript

   onClick callback @ 728()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``728``—``728`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:40741:41053:FUNCTION

.. rubric:: ``quickAccessRules.map callback @ 731``

.. code-block:: javascript

   quickAccessRules.map callback @ 731(rule)

作为 ``quickAccessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``731``—``735`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:40868:40893:FUNCTION

.. rubric:: ``onClick callback @ 732``

.. code-block:: javascript

   onClick callback @ 732()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``732``—``732`` 行；所属函数 ``quickAccessRules.map callback @ 731``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``addAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:41579:45752:FUNCTION

.. rubric:: ``accessRules.map callback @ 743``

.. code-block:: javascript

   accessRules.map callback @ 743(rule, index)

作为 ``accessRules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``743``—``788`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``operationPresetFor``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:42003:42080:FUNCTION

.. rubric:: ``onValueChange callback @ 747``

.. code-block:: javascript

   onValueChange callback @ 747(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``747``—``747`` 行；所属函数 ``accessRules.map callback @ 743``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:43018:43304:FUNCTION

.. rubric:: ``onChange callback @ 758``

.. code-block:: javascript

   onChange callback @ 758(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``758``—``761`` 行；所属函数 ``accessRules.map callback @ 743``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:43799:43873:FUNCTION

.. rubric:: ``onValueChange callback @ 767``

.. code-block:: javascript

   onValueChange callback @ 767(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``767``—``767`` 行；所属函数 ``accessRules.map callback @ 743``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateAccessRule``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45381:45469:FUNCTION

.. rubric:: ``onClick callback @ 783``

.. code-block:: javascript

   onClick callback @ 783()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``783``—``783`` 行；所属函数 ``accessRules.map callback @ 743``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAccessRules``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45402:45468:FUNCTION

.. rubric:: ``setAccessRules callback @ 783``

.. code-block:: javascript

   setAccessRules callback @ 783(current)

设置与 ``Access Rules`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``783``—``783`` 行；所属函数 ``onClick callback @ 783``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:45430:45467:FUNCTION

.. rubric:: ``current.filter callback @ 783``

.. code-block:: javascript

   current.filter callback @ 783(_, itemIndex)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``783``—``783`` 行；所属函数 ``setAccessRules callback @ 783``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:48480:49472:FUNCTION

.. rubric:: ``configuredCommands.map callback @ 822``

.. code-block:: javascript

   configuredCommands.map callback @ 822(commandId)

作为 ``configuredCommands.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``822``—``834`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``commandId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedCommands.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:48953:49325:FUNCTION

.. rubric:: ``onCheckedChange callback @ 827``

.. code-block:: javascript

   onCheckedChange callback @ 827(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``827``—``831`` 行；所属函数 ``configuredCommands.map callback @ 822``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAllowedCommands``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:48985:49324:FUNCTION

.. rubric:: ``setAllowedCommands callback @ 827``

.. code-block:: javascript

   setAllowedCommands callback @ 827(current)

设置与 ``Allowed Commands`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``827``—``831`` 行；所属函数 ``onCheckedChange callback @ 827``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:49241:49269:FUNCTION

.. rubric:: ``current.filter callback @ 830``

.. code-block:: javascript

   current.filter callback @ 830(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``830``—``830`` 行；所属函数 ``setAllowedCommands callback @ 827``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
