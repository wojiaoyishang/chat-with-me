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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:672:1710:FUNCTION

.. js:function:: TaskCenterTrigger({ listItem = false })

   渲染 ``TaskCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``14``—``40`` 行。

   **参数**

   ``{ listItem = false }``（默认值 ``{}``）
      调用方传入的 ``listItem = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size={listItem ? 'default' : 'icon'} className={\x60relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}\x60} aria-label={t('taskCenter.title')} t…``。

   **主要协作调用**：``useTranslation``、``useTaskStore``、``Object.values(tasks).filter``、``Object.values``、``t``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1710:11370:FUNCTION

.. js:function:: TaskCenter()

   渲染 ``TaskCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``42``—``219`` 行。

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:803:816:FUNCTION

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:850:864:FUNCTION

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:913:994:FUNCTION

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1319:1331:FUNCTION

.. rubric:: ``onClick callback @ 29``

.. code-block:: javascript

   onClick callback @ 29()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2066:2992:FUNCTION

.. rubric:: ``useEffect callback @ 49``

.. code-block:: javascript

   useEffect callback @ 49()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``73`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; changed(); reconnect(); openTasks(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``load``、``onEvent({ event: 'task.changed' }).then``、``onEvent``、``onEvent({ event: 'transport.connected' }).then``、``onEvent({ event: 'task.center.open' }).then``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2124:2525:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``51``—``62`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…``、``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then``、``apiClient .get``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2224:2405:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 54``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 54(data)

处理 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``54``—``59`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``、``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2430:2524:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 60``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 60(error)

实现 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``62`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2612:2645:FUNCTION

.. rubric:: ``onEvent({ event: 'task.changed' }).then callback @ 64``

.. code-block:: javascript

   onEvent({ event: 'task.changed' }).then callback @ 64({ payload })

处理 ``onEvent({ event: 'task.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2721:2738:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 65``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 65()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2811:2848:FUNCTION

.. rubric:: ``onEvent({ event: 'task.center.open' }).then callback @ 66``

.. code-block:: javascript

   onEvent({ event: 'task.center.open' }).then callback @ 66({ payload })

处理 ``onEvent({ event: 'task.center.open' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2865:2985:FUNCTION

.. rubric:: ``returned callback @ 67``

.. code-block:: javascript

   returned callback @ 67()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``72`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changed``、``reconnect``、``openTasks``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3024:3301:FUNCTION

.. rubric:: ``useEffect callback @ 74``

.. code-block:: javascript

   useEffect callback @ 74()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``81`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch``、``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3198:3221:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback @ 78``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then callback @ 78(task)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``useEffect callback @ 74``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3246:3283:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback @ 79``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then((task) => merge([task])) .catch callback @ 79(error)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useEffect callback @ 74``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3345:3432:FUNCTION

.. rubric:: ``useEffect callback @ 82``

.. code-block:: javascript

   useEffect callback @ 82()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``82``—``84`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.current?.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3489:3795:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(task, operation)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``85``—``94`` 行；所属函数 ``TaskCenter``。

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3840:3899:FUNCTION

.. rubric:: ``Object.values(tasks).sort callback @ 95``

.. code-block:: javascript

   Object.values(tasks).sort callback @ 95(a, b)

作为 ``Object.values(tasks).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``TaskCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4106:4405:FUNCTION

.. rubric:: ``onInteractOutside callback @ 100``

.. code-block:: javascript

   onInteractOutside callback @ 100(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``105`` 行；所属函数 ``TaskCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5038:11291:FUNCTION

.. rubric:: ``list.map callback @ 116``

.. code-block:: javascript

   list.map callback @ 116(task)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``214`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``['running', 'queued', 'cancel_requested'].includes``、``new Date(task.createdAt).toLocaleString``、``Object.entries(task.submission) .filter(([, value]) => value != null) .map``、``Object.entries(task.submission) .filter``、``Object.entries``、``(task.history || []).map``、``task.result.warnings.map``、``['queued', 'running'].includes``、``['failed', 'cancelled'].includes``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7159:7187:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter callback @ 146``

.. code-block:: javascript

   Object.entries(task.submission) .filter callback @ 146([, value])

作为 ``Object.entries(task.submission) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``list.map callback @ 116``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7238:7618:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 147``

.. code-block:: javascript

   Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 147([key, value])

作为 ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``152`` 行；所属函数 ``list.map callback @ 116``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8047:8379:FUNCTION

.. rubric:: ``(task.history || []).map callback @ 159``

.. code-block:: javascript

   (task.history || []).map callback @ 159(entry, index)

作为 ``(task.history || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``159``—``164`` 行；所属函数 ``list.map callback @ 116``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date(entry.time).toLocaleTimeString``、``t``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8791:8921:FUNCTION

.. rubric:: ``task.result.warnings.map callback @ 170``

.. code-block:: javascript

   task.result.warnings.map callback @ 170(warning, index)

作为 ``task.result.warnings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``170``—``172`` 行；所属函数 ``list.map callback @ 116``。

**参数**

``warning``
   调用方传入的 ``warning`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9258:9566:FUNCTION

.. rubric:: ``onClick callback @ 179``

.. code-block:: javascript

   onClick callback @ 179()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``183`` 行；所属函数 ``list.map callback @ 116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadAttachmentResource( task.result.url, task.result.filename, ).catch``、``downloadAttachmentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9528:9565:FUNCTION

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10259:10292:FUNCTION

.. rubric:: ``onClick callback @ 195``

.. code-block:: javascript

   onClick callback @ 195()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``list.map callback @ 116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10905:10937:FUNCTION

.. rubric:: ``onClick callback @ 206``

.. code-block:: javascript

   onClick callback @ 206()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``list.map callback @ 116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。
