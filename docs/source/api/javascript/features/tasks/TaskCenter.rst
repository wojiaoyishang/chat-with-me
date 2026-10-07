src/features/tasks/TaskCenter 模块
================================================================================

.. js:module:: src/features/tasks/TaskCenter

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tasks/TaskCenter.jsx``
* **模块标识**：``src/features/tasks/TaskCenter``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：28

主要依赖
--------------------------------------------------------------------------------

``@/lib/clientText.js``、``react``、``react-i18next``、``lucide-react``、``@/components/ui/sheet``、``@/components/ui/button``、``@/components/ui/progress``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``./useTaskStore.js``、``@/lib/resourceDownload.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:732:1770:FUNCTION

.. js:function:: TaskCenterTrigger({ listItem = false })

   渲染 ``TaskCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``15``—``41`` 行。

   **参数**

   ``{ listItem = false }``（默认值 ``{}``）
      调用方传入的 ``listItem = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size={listItem ? 'default' : 'icon'} className={\x60relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}\x60} aria-label={t('taskCenter.title')} t…``。

   **主要协作调用**：``useTranslation``、``useTaskStore``、``Object.values(tasks).filter``、``Object.values``、``t``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1770:11367:FUNCTION

.. js:function:: TaskCenter()

   渲染 ``TaskCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``43``—``219`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Sheet open={open} onOpenChange={setOpen} modal={false}> <SheetContent className="w-full sm:max-w-lg flex flex-col p-0" onInteractOutside={(event) => { // Notifications remain i…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useTranslation``、``useTaskStore``、``useState``、``useRef``、``useEffect``、``Object.values(tasks).sort``、``Object.values``、``t``、``list.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:863:876:FUNCTION

.. rubric:: ``useTaskStore callback @ 17``

.. code-block:: javascript

   useTaskStore callback @ 17(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:910:924:FUNCTION

.. rubric:: ``useTaskStore callback @ 18``

.. code-block:: javascript

   useTaskStore callback @ 18(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:973:1054:FUNCTION

.. rubric:: ``Object.values(tasks).filter callback @ 19``

.. code-block:: javascript

   Object.values(tasks).filter callback @ 19(task)

作为 ``Object.values(tasks).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``20`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['queued', 'running', 'cancel_requested'].includes``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1379:1391:FUNCTION

.. rubric:: ``onClick callback @ 30``

.. code-block:: javascript

   onClick callback @ 30()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2126:3052:FUNCTION

.. rubric:: ``useEffect callback @ 50``

.. code-block:: javascript

   useEffect callback @ 50()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``74`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; changed(); reconnect(); openTasks(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``load``、``onEvent({ event: 'task.changed' }).then``、``onEvent``、``onEvent({ event: 'transport.connected' }).then``、``onEvent({ event: 'task.center.open' }).then``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2184:2585:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``52``—``63`` 行；所属函数 ``useEffect callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…``、``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then``、``apiClient .get``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2284:2465:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 55``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 55(data)

处理 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``55``—``60`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``、``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2490:2584:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 61``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 61(error)

实现 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``63`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2672:2705:FUNCTION

.. rubric:: ``onEvent({ event: 'task.changed' }).then callback @ 65``

.. code-block:: javascript

   onEvent({ event: 'task.changed' }).then callback @ 65({ payload })

处理 ``onEvent({ event: 'task.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``useEffect callback @ 50``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2781:2798:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 66``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 66()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``useEffect callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2871:2908:FUNCTION

.. rubric:: ``onEvent({ event: 'task.center.open' }).then callback @ 67``

.. code-block:: javascript

   onEvent({ event: 'task.center.open' }).then callback @ 67({ payload })

处理 ``onEvent({ event: 'task.center.open' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``useEffect callback @ 50``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2925:3045:FUNCTION

.. rubric:: ``returned callback @ 68``

.. code-block:: javascript

   returned callback @ 68()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``73`` 行；所属函数 ``useEffect callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changed``、``reconnect``、``openTasks``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3084:3361:FUNCTION

.. rubric:: ``useEffect callback @ 75``

.. code-block:: javascript

   useEffect callback @ 75()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``82`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch``、``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3258:3281:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback @ 79``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then callback @ 79(task)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useEffect callback @ 75``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3306:3343:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback @ 80``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then((task) => merge([task])) .catch callback @ 80(error)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``useEffect callback @ 75``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3405:3492:FUNCTION

.. rubric:: ``useEffect callback @ 83``

.. code-block:: javascript

   useEffect callback @ 83()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``83``—``85`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.current?.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3549:3855:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(task, operation)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``86``—``95`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``merge``、``apiClient.post``、``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3900:3959:FUNCTION

.. rubric:: ``Object.values(tasks).sort callback @ 96``

.. code-block:: javascript

   Object.values(tasks).sort callback @ 96(a, b)

作为 ``Object.values(tasks).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``TaskCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4166:4465:FUNCTION

.. rubric:: ``onInteractOutside callback @ 101``

.. code-block:: javascript

   onInteractOutside callback @ 101(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``106`` 行；所属函数 ``TaskCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5098:11288:FUNCTION

.. rubric:: ``list.map callback @ 117``

.. code-block:: javascript

   list.map callback @ 117(task)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``214`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``['running', 'queued', 'cancel_requested'].includes``、``formatLocalTimestamp``、``Object.entries(task.submission) .filter(([, value]) => value != null) .map``、``Object.entries(task.submission) .filter``、``Object.entries``、``(task.history || []).map``、``task.result.warnings.map``、``['queued', 'running'].includes``、``['failed', 'cancelled'].includes``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7214:7242:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter callback @ 147``

.. code-block:: javascript

   Object.entries(task.submission) .filter callback @ 147([, value])

作为 ``Object.entries(task.submission) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``list.map callback @ 117``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7293:7673:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 148``

.. code-block:: javascript

   Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 148([key, value])

作为 ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``148``—``153`` 行；所属函数 ``list.map callback @ 117``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8102:8376:FUNCTION

.. rubric:: ``(task.history || []).map callback @ 160``

.. code-block:: javascript

   (task.history || []).map callback @ 160(entry, index)

作为 ``(task.history || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``160``—``164`` 行；所属函数 ``list.map callback @ 117``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatLocalTimestamp``、``t``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8788:8918:FUNCTION

.. rubric:: ``task.result.warnings.map callback @ 170``

.. code-block:: javascript

   task.result.warnings.map callback @ 170(warning, index)

作为 ``task.result.warnings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``170``—``172`` 行；所属函数 ``list.map callback @ 117``。

**参数**

``warning``
   调用方传入的 ``warning`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9255:9563:FUNCTION

.. rubric:: ``onClick callback @ 179``

.. code-block:: javascript

   onClick callback @ 179()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``183`` 行；所属函数 ``list.map callback @ 117``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadAttachmentResource( task.result.url, task.result.filename, ).catch``、``downloadAttachmentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9525:9562:FUNCTION

.. rubric:: ``downloadAttachmentResource( task.result.url, task.result.filename, ).catch callback @ 183``

.. code-block:: javascript

   downloadAttachmentResource( task.result.url, task.result.filename, ).catch callback @ 183(error)

处理 ``downloadAttachmentResource( task.result.url, task.result.filename, ).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``onClick callback @ 179``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10256:10289:FUNCTION

.. rubric:: ``onClick callback @ 195``

.. code-block:: javascript

   onClick callback @ 195()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``list.map callback @ 117``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10902:10934:FUNCTION

.. rubric:: ``onClick callback @ 206``

.. code-block:: javascript

   onClick callback @ 206()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``list.map callback @ 117``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。
