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

``react``、``react-i18next``、``lucide-react``、``@/components/ui/sheet``、``@/components/ui/button``、``@/components/ui/progress``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``./useTaskStore.js``、``@/lib/resourceDownload.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:672:1537:FUNCTION

.. js:function:: TaskCenterTrigger()

   渲染 ``TaskCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``14``—``38`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size="icon" className="relative shrink-0" aria-label={t('taskCenter.title')} title={t('taskCenter.title')} onClick={() => show()} > <ClipboardList classN…``。

   **主要协作调用**：``useTranslation``、``useTaskStore``、``Object.values(tasks).filter``、``Object.values``、``t``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1537:11197:FUNCTION

.. js:function:: TaskCenter()

   渲染 ``TaskCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``40``—``217`` 行。

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:778:791:FUNCTION

.. rubric:: ``useTaskStore callback @ 16``

.. code-block:: javascript

   useTaskStore callback @ 16(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:825:839:FUNCTION

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:888:969:FUNCTION

.. rubric:: ``Object.values(tasks).filter callback @ 18``

.. code-block:: javascript

   Object.values(tasks).filter callback @ 18(task)

作为 ``Object.values(tasks).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``19`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['queued', 'running', 'cancel_requested'].includes``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1218:1230:FUNCTION

.. rubric:: ``onClick callback @ 28``

.. code-block:: javascript

   onClick callback @ 28()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1893:2819:FUNCTION

.. rubric:: ``useEffect callback @ 47``

.. code-block:: javascript

   useEffect callback @ 47()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``71`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; changed(); reconnect(); openTasks(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``load``、``onEvent({ event: 'task.changed' }).then``、``onEvent``、``onEvent({ event: 'transport.connected' }).then``、``onEvent({ event: 'task.center.open' }).then``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1951:2352:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``49``—``60`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…``、``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then``、``apiClient .get``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2051:2232:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 52``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 52(data)

处理 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``52``—``57`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``、``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2257:2351:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 58``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 58(error)

实现 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``60`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2439:2472:FUNCTION

.. rubric:: ``onEvent({ event: 'task.changed' }).then callback @ 62``

.. code-block:: javascript

   onEvent({ event: 'task.changed' }).then callback @ 62({ payload })

处理 ``onEvent({ event: 'task.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2548:2565:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 63``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 63()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2638:2675:FUNCTION

.. rubric:: ``onEvent({ event: 'task.center.open' }).then callback @ 64``

.. code-block:: javascript

   onEvent({ event: 'task.center.open' }).then callback @ 64({ payload })

处理 ``onEvent({ event: 'task.center.open' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2692:2812:FUNCTION

.. rubric:: ``returned callback @ 65``

.. code-block:: javascript

   returned callback @ 65()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``70`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changed``、``reconnect``、``openTasks``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2851:3128:FUNCTION

.. rubric:: ``useEffect callback @ 72``

.. code-block:: javascript

   useEffect callback @ 72()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``72``—``79`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch``、``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3025:3048:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback @ 76``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then callback @ 76(task)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``useEffect callback @ 72``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3073:3110:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback @ 77``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then((task) => merge([task])) .catch callback @ 77(error)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``useEffect callback @ 72``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3172:3259:FUNCTION

.. rubric:: ``useEffect callback @ 80``

.. code-block:: javascript

   useEffect callback @ 80()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``80``—``82`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.current?.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3316:3622:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(task, operation)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``83``—``92`` 行；所属函数 ``TaskCenter``。

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3667:3726:FUNCTION

.. rubric:: ``Object.values(tasks).sort callback @ 93``

.. code-block:: javascript

   Object.values(tasks).sort callback @ 93(a, b)

作为 ``Object.values(tasks).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``TaskCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3933:4232:FUNCTION

.. rubric:: ``onInteractOutside callback @ 98``

.. code-block:: javascript

   onInteractOutside callback @ 98(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``103`` 行；所属函数 ``TaskCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4865:11118:FUNCTION

.. rubric:: ``list.map callback @ 114``

.. code-block:: javascript

   list.map callback @ 114(task)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``212`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``['running', 'queued', 'cancel_requested'].includes``、``new Date(task.createdAt).toLocaleString``、``Object.entries(task.submission) .filter(([, value]) => value != null) .map``、``Object.entries(task.submission) .filter``、``Object.entries``、``(task.history || []).map``、``task.result.warnings.map``、``['queued', 'running'].includes``、``['failed', 'cancelled'].includes``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6986:7014:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter callback @ 144``

.. code-block:: javascript

   Object.entries(task.submission) .filter callback @ 144([, value])

作为 ``Object.entries(task.submission) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``144``—``144`` 行；所属函数 ``list.map callback @ 114``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7065:7445:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 145``

.. code-block:: javascript

   Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 145([key, value])

作为 ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``145``—``150`` 行；所属函数 ``list.map callback @ 114``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7874:8206:FUNCTION

.. rubric:: ``(task.history || []).map callback @ 157``

.. code-block:: javascript

   (task.history || []).map callback @ 157(entry, index)

作为 ``(task.history || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``162`` 行；所属函数 ``list.map callback @ 114``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date(entry.time).toLocaleTimeString``、``t``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8618:8748:FUNCTION

.. rubric:: ``task.result.warnings.map callback @ 168``

.. code-block:: javascript

   task.result.warnings.map callback @ 168(warning, index)

作为 ``task.result.warnings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``168``—``170`` 行；所属函数 ``list.map callback @ 114``。

**参数**

``warning``
   调用方传入的 ``warning`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9085:9393:FUNCTION

.. rubric:: ``onClick callback @ 177``

.. code-block:: javascript

   onClick callback @ 177()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``177``—``181`` 行；所属函数 ``list.map callback @ 114``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadAttachmentResource( task.result.url, task.result.filename, ).catch``、``downloadAttachmentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9355:9392:FUNCTION

.. rubric:: ``downloadAttachmentResource( task.result.url, task.result.filename, ).catch callback @ 181``

.. code-block:: javascript

   downloadAttachmentResource( task.result.url, task.result.filename, ).catch callback @ 181(error)

处理 ``downloadAttachmentResource( task.result.url, task.result.filename, ).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``onClick callback @ 177``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10086:10119:FUNCTION

.. rubric:: ``onClick callback @ 193``

.. code-block:: javascript

   onClick callback @ 193()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``list.map callback @ 114``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10732:10764:FUNCTION

.. rubric:: ``onClick callback @ 204``

.. code-block:: javascript

   onClick callback @ 204()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``list.map callback @ 114``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。
