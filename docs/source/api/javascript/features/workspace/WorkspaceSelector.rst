src/features/workspace/WorkspaceSelector 模块
==============================================================================================

.. js:module:: src/features/workspace/WorkspaceSelector

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/WorkspaceSelector.jsx``
* **模块标识**：``src/features/workspace/WorkspaceSelector``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/select``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:406:9126:FUNCTION

.. js:function:: WorkspaceSelector({conversationId, selectedWorkspaceId, onChange, t})

   渲染 ``WorkspaceSelector`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``202`` 行。

   **参数**

   ``{conversationId, selectedWorkspaceId, onChange, t}``
      调用方传入的 ``conversationId, selectedWorkspaceId, onChange, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="mx-2 mt-2 rounded-xl border border-blue-100 bg-blue-50/50 p-3"> <div className="flex items-center gap-2 text-sm font-medium text-gray-800"> <MapPinned classN…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useMemo``、``useCallback``、``useEffect``、``t``、``workspaces.map``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:797:878:FUNCTION

.. rubric:: ``useMemo callback @ 23``

.. code-block:: javascript

   useMemo callback @ 23()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``WorkspaceSelector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workspaces.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:828:869:FUNCTION

.. rubric:: ``workspaces.find callback @ 23``

.. code-block:: javascript

   workspaces.find callback @ 23(item)

作为 ``workspaces.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``useMemo callback @ 23``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:960:1889:FUNCTION

.. rubric:: ``useCallback callback @ 27``

.. code-block:: javascript

   async useCallback callback @ 27()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``27``—``45`` 行；所属函数 ``WorkspaceSelector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``encodeURIComponent``、``Promise.all``、``apiClient.get``、``Array.isArray``、``setWorkspaces``、``[...local, ...remote].sort``、``toast.error``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:1637:1703:FUNCTION

.. rubric:: ``[...local, ...remote].sort callback @ 39``

.. code-block:: javascript

   [...local, ...remote].sort callback @ 39(a, b)

作为 ``[...local, ...remote].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``useCallback callback @ 27``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(a.name || '').localeCompare``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:1928:1957:FUNCTION

.. rubric:: ``useEffect callback @ 47``

.. code-block:: javascript

   useEffect callback @ 47()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``49`` 行；所属函数 ``WorkspaceSelector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:1996:2598:FUNCTION

.. rubric:: ``selectWorkspace``

.. code-block:: javascript

   async selectWorkspace(workspaceId)

实现 ``selectWorkspace`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``51``—``67`` 行；所属函数 ``WorkspaceSelector``。

**参数**

``workspaceId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onChange``、``setSaving``、``apiClient.put``、``encodeURIComponent``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:2628:3512:FUNCTION

.. rubric:: ``createWorkspace``

.. code-block:: javascript

   async createWorkspace()

创建与 ``Workspace`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``69``—``91`` 行；所属函数 ``WorkspaceSelector``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``name.trim``、``rootPath.trim``、``toast.error``、``t``、``setSaving``、``apiClient.post``、``setWorkspaces``、``setName``、``setRootPath``、``setShowCreate``、``selectWorkspace``、``toast.success``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:3044:3123:FUNCTION

.. rubric:: ``setWorkspaces callback @ 80``

.. code-block:: javascript

   setWorkspaces callback @ 80(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``createWorkspace``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...current, created].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:3084:3122:FUNCTION

.. rubric:: ``[...current, created].sort callback @ 80``

.. code-block:: javascript

   [...current, created].sort callback @ 80(a, b)

作为 ``[...current, created].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``setWorkspaces callback @ 80``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.name.localeCompare``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:3541:4351:FUNCTION

.. rubric:: ``deleteSelected``

.. code-block:: javascript

   async deleteSelected()

删除与 ``Selected`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``93``—``109`` 行；所属函数 ``WorkspaceSelector``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.confirm``、``t``、``setSaving``、``apiClient.delete``、``encodeURIComponent``、``setWorkspaces``、``selectWorkspace``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:4062:4124:FUNCTION

.. rubric:: ``setWorkspaces callback @ 102``

.. code-block:: javascript

   setWorkspaces callback @ 102(current)

设置与 ``Workspaces`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``deleteSelected``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:4090:4123:FUNCTION

.. rubric:: ``current.filter callback @ 102``

.. code-block:: javascript

   current.filter callback @ 102(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``setWorkspaces callback @ 102``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:5258:5319:FUNCTION

.. rubric:: ``onValueChange callback @ 129``

.. code-block:: javascript

   onValueChange callback @ 129(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``WorkspaceSelector``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectWorkspace``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:5742:6097:FUNCTION

.. rubric:: ``workspaces.map callback @ 137``

.. code-block:: javascript

   workspaces.map callback @ 137(workspace)

作为 ``workspaces.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``141`` 行；所属函数 ``WorkspaceSelector``。

**参数**

``workspace``
   调用方传入的 ``workspace`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:6837:6879:FUNCTION

.. rubric:: ``onClick callback @ 157``

.. code-block:: javascript

   onClick callback @ 157()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``WorkspaceSelector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowCreate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:6857:6878:FUNCTION

.. rubric:: ``setShowCreate callback @ 157``

.. code-block:: javascript

   setShowCreate callback @ 157(current)

设置与 ``Show Create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``onClick callback @ 157``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:7910:7948:FUNCTION

.. rubric:: ``onChange callback @ 180``

.. code-block:: javascript

   onChange callback @ 180(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``WorkspaceSelector``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workspace/WorkspaceSelector.jsx:8302:8344:FUNCTION

.. rubric:: ``onChange callback @ 186``

.. code-block:: javascript

   onChange callback @ 186(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``WorkspaceSelector``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRootPath``。
