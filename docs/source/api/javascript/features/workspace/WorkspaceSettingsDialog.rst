src/features/workspace/WorkspaceSettingsDialog 模块
==========================================================================================================

.. js:module:: src/features/workspace/WorkspaceSettingsDialog

Conversation mounting only. Configuration is a server-described settings view.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/WorkspaceSettingsDialog.jsx``
* **模块标识**：``src/features/workspace/WorkspaceSettingsDialog``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：33

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/features/settings-runtime/navigation.js``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``@/components/ui/select``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:863:943:FUNCTION

.. js:function:: permissionLabel(value)

   实现 ``permissionLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``14`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:964:1158:FUNCTION

.. js:function:: statusLabel(item)

   实现 ``statusLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``15`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1159:11518:FUNCTION

.. js:function:: WorkspaceSettingsDialog({ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSel…)

   Conversation mounting only. Configuration is a server-described settings view.

   **性质**：同步函数；导出 API；源码第 ``18``—``129`` 行。

   **参数**

   ``{ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSel…``
      调用方传入的 ``open, onOpenChange, conversationId, selectedWorkspaceIds = , onWorkspaceChange, runWorkspaceSel…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<> <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="flex max-h-[85dvh] w-[min(760px,calc(100vw-2rem))] max-w-3xl flex-col overflow-hidden p-0"> <DialogHe…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``、``useMemo``、``workspaces.filter``、``workspaces.map``、``Boolean``、``candidates.map``。

   **内部回调数量**：19。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:1851:1880:FUNCTION

.. rubric:: ``useCallback callback @ 27``

.. code-block:: javascript

   useCallback callback @ 27()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2095:2187:FUNCTION

.. rubric:: ``useEffect callback @ 32``

.. code-block:: javascript

   useEffect callback @ 32()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``32``—``36`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``setReplacement``、``setTargetId``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2232:2288:FUNCTION

.. rubric:: ``useMemo callback @ 37``

.. code-block:: javascript

   useMemo callback @ 37()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedWorkspaceIds.filter``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2344:2362:FUNCTION

.. rubric:: ``useMemo callback @ 38``

.. code-block:: javascript

   useMemo callback @ 38()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:2401:3198:FUNCTION

.. rubric:: ``useCallback callback @ 39``

.. code-block:: javascript

   async useCallback callback @ 39(quiet)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``39``—``51`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``quiet`` （默认值 ``false``）
   调用方传入的 ``quiet`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``apiClient.get``、``setWorkspaces``、``setNavigation``、``setDefaultId``、``changed.current``、``toast.error``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3233:3657:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``58`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { invalidateLoad(); subscriptions.forEach((unsubscribe) => unsubscribe()); window.clearInterval(timer); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``load``、``['workspace.connection.status_changed', 'workspace.access.changed'].map``、``window.setInterval``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3401:3453:FUNCTION

.. rubric:: ``['workspace.connection.status_changed', 'workspace.access.changed'].map callback @ 55``

.. code-block:: javascript

   ['workspace.connection.status_changed', 'workspace.access.changed'].map callback @ 55(event)

作为 ``['workspace.connection.status_changed', 'workspace.access.changed'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3436:3452:FUNCTION

.. rubric:: ``onEvent({ event }).then callback @ 55``

.. code-block:: javascript

   onEvent({ event }).then callback @ 55()

处理 ``onEvent({ event }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``['workspace.connection.status_changed', 'workspace.access.changed'].map callback @ 55``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3497:3513:FUNCTION

.. rubric:: ``window.setInterval callback @ 56``

.. code-block:: javascript

   window.setInterval callback @ 56()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3538:3650:FUNCTION

.. rubric:: ``returned callback @ 57``

.. code-block:: javascript

   returned callback @ 57()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``invalidateLoad``、``subscriptions.forEach``、``window.clearInterval``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3587:3617:FUNCTION

.. rubric:: ``subscriptions.forEach callback @ 57``

.. code-block:: javascript

   subscriptions.forEach callback @ 57(unsubscribe)

作为 ``subscriptions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``returned callback @ 57``。

**参数**

``unsubscribe``
   调用方传入的 ``unsubscribe`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3704:4196:FUNCTION

.. rubric:: ``useEffect callback @ 59``

.. code-block:: javascript

   useEffect callback @ 59()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``68`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({ event: 'workspace.default.changed', conversationId }).then(({ payload }) => { if (currentConversation.current !== conversationId) return; const next = payload?.selectedW…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'workspace.default.changed', conversationId }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:3843:4188:FUNCTION

.. rubric:: ``onEvent({ event: 'workspace.default.changed', conversationId }).then callback @ 61``

.. code-block:: javascript

   onEvent({ event: 'workspace.default.changed', conversationId }).then callback @ 61({ payload })

处理 ``onEvent({ event: 'workspace.default.changed', conversationId }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``61``—``67`` 行；所属函数 ``useEffect callback @ 59``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Array.isArray``、``changed.current``、``setDefaultId``、``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:4247:5210:FUNCTION

.. rubric:: ``mutate``

.. code-block:: javascript

   async mutate(operation)

实现 ``mutate`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``69``—``83`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``state``。

**主要协作调用**：``setLoading``、``setBusy``、``runWorkspaceSelectionMutation``、``operation``、``changed.current``、``setDefaultId``、``toast.error``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5230:5572:FUNCTION

.. rubric:: ``toggle``

.. code-block:: javascript

   async toggle(item, checked)

切换与 ``toggle`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``84``—``88`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``ids.filter``、``changed.current``、``mutate``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5320:5342:FUNCTION

.. rubric:: ``ids.filter callback @ 85``

.. code-block:: javascript

   ids.filter callback @ 85(id)

作为 ``ids.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``toggle``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5432:5564:FUNCTION

.. rubric:: ``mutate callback @ 87``

.. code-block:: javascript

   mutate callback @ 87()

实现 ``mutate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``toggle``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5598:5713:FUNCTION

.. rubric:: ``openSettings``

.. code-block:: javascript

   openSettings(link)

打开与 ``Settings`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``93`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``link``
   调用方传入的 ``link`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onOpenChange``、``requestSettingsNavigation``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:5756:5858:FUNCTION

.. rubric:: ``workspaces.filter callback @ 94``

.. code-block:: javascript

   workspaces.filter callback @ 94(item)

作为 ``workspaces.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['use', 'manage'].includes``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6810:6822:FUNCTION

.. rubric:: ``onClick callback @ 103``

.. code-block:: javascript

   onClick callback @ 103()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:6987:9572:FUNCTION

.. rubric:: ``workspaces.map callback @ 104``

.. code-block:: javascript

   workspaces.map callback @ 104(item)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``116`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div key={item.id} className={\x60flex items-center gap-3 px-3 py-3 ${selected.has(item.id) ? 'bg-blue-50/50' : ''}\x60}> <Checkbox aria-label={\x60挂载 ${item.name}\x60} checked={selected.has(…``。

**主要协作调用**：``statusLabel``、``['use', 'manage'].includes``、``selected.has``、``permissionLabel``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:7565:7599:FUNCTION

.. rubric:: ``onCheckedChange callback @ 109``

.. code-block:: javascript

   onCheckedChange callback @ 109(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``workspaces.map callback @ 104``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggle``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8602:8789:FUNCTION

.. rubric:: ``onClick callback @ 112``

.. code-block:: javascript

   onClick callback @ 112()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``workspaces.map callback @ 104``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:8615:8788:FUNCTION

.. rubric:: ``mutate callback @ 112``

.. code-block:: javascript

   mutate callback @ 112()

实现 ``mutate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``onClick callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9118:9166:FUNCTION

.. rubric:: ``onClick callback @ 113``

.. code-block:: javascript

   onClick callback @ 113()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``workspaces.map callback @ 104``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTargetId``、``setReplacement``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:9440:9477:FUNCTION

.. rubric:: ``onClick callback @ 114``

.. code-block:: javascript

   onClick callback @ 114()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``workspaces.map callback @ 104``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openSettings``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10034:10071:FUNCTION

.. rubric:: ``onClick callback @ 119``

.. code-block:: javascript

   onClick callback @ 119()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openSettings``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10201:10238:FUNCTION

.. rubric:: ``onClick callback @ 119``

.. code-block:: javascript

   onClick callback @ 119()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openSettings``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10406:10461:FUNCTION

.. rubric:: ``onOpenChange callback @ 122``

.. code-block:: javascript

   onOpenChange callback @ 122(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReplacement``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:10849:10925:FUNCTION

.. rubric:: ``candidates.map callback @ 124``

.. code-block:: javascript

   candidates.map callback @ 124(item)

作为 ``candidates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11034:11060:FUNCTION

.. rubric:: ``onClick callback @ 125``

.. code-block:: javascript

   onClick callback @ 125()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReplacement``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11119:11377:FUNCTION

.. rubric:: ``onClick callback @ 125``

.. code-block:: javascript

   async onClick callback @ 125()

处理 ``Click`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``125``—``125`` 行；所属函数 ``WorkspaceSettingsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mutate``、``setReplacement``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSettingsDialog.jsx:11161:11318:FUNCTION

.. rubric:: ``mutate callback @ 125``

.. code-block:: javascript

   mutate callback @ 125()

实现 ``mutate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``onClick callback @ 125``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``。
