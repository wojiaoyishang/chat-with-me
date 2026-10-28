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
* **局部函数与匿名回调**：39

主要依赖
--------------------------------------------------------------------------------

``../workflows/workflowProducts.js``、``@/lib/clientText.js``、``react``、``react-i18next``、``lucide-react``、``react-router-dom``、``@/components/ui/sheet``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``./useTaskStore.js``、``@/lib/resourceDownload.js``、``./RunObservation.jsx``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1077:2173:FUNCTION

.. js:function:: TaskCenterTrigger({ listItem = false })

   渲染 ``TaskCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``19``—``45`` 行。

   **参数**

   ``{ listItem = false }`` （默认值 ``{}``）
      调用方传入的 ``listItem = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size={listItem ? 'default' : 'icon'} className={\x60relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}\x60} aria-label={t('taskCenter.title')} t…``。

   **主要协作调用**：``useTranslation``、``useTaskStore``、``Object.values(tasks).filter``、``Object.values``、``t``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2173:14465:FUNCTION

.. js:function:: TaskCenter()

   渲染 ``TaskCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``47``—``251`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Sheet open={open} onOpenChange={setOpen} modal={false}> <SheetContent className="w-full sm:max-w-lg flex flex-col p-0" onInteractOutside={(event) => { // Notifications remain i…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useTranslation``、``useNavigate``、``useTaskStore``、``useState``、``useRef``、``useEffect``、``Object.values(tasks).sort``、``Object.values``、``t``、``list.map``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1212:1225:FUNCTION

.. rubric:: ``useTaskStore callback @ 21``

.. code-block:: javascript

   useTaskStore callback @ 21(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1260:1274:FUNCTION

.. rubric:: ``useTaskStore callback @ 22``

.. code-block:: javascript

   useTaskStore callback @ 22(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1324:1436:FUNCTION

.. rubric:: ``Object.values(tasks).filter callback @ 23``

.. code-block:: javascript

   Object.values(tasks).filter callback @ 23(task)

作为 ``Object.values(tasks).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``24`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['queued', 'pending', 'running', 'cancel_requested', 'pause_requested'].includes``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1771:1783:FUNCTION

.. rubric:: ``onClick callback @ 34``

.. code-block:: javascript

   onClick callback @ 34()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2639:2827:FUNCTION

.. rubric:: ``stageName``

.. code-block:: javascript

   stageName(task, stage)

实现 ``stageName`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``57`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``stage``
   调用方传入的 ``stage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``definitions[task.kind]?.stages?.find``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2694:2722:FUNCTION

.. rubric:: ``definitions[task.kind]?.stages?.find callback @ 56``

.. code-block:: javascript

   definitions[task.kind]?.stages?.find callback @ 56(item)

作为 ``definitions[task.kind]?.stages?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``stageName``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2856:2987:FUNCTION

.. rubric:: ``openManagement``

.. code-block:: javascript

   openManagement(taskId)

打开与 ``Management`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``61`` 行；所属函数 ``TaskCenter``。

**参数**

``taskId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setOpen``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3004:4198:FUNCTION

.. rubric:: ``useEffect callback @ 62``

.. code-block:: javascript

   useEffect callback @ 62()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``89`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; changed(); reconnect(); openTasks(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``load``、``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then((data) => { if (!disposed) setDefinitions(Object.fromEn…``、``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then``、``apiClient.get``、``onEvent({ event: 'task.changed' }).then``、``onEvent``、``onEvent({ event: 'transport.connected' }).then``、``onEvent({ event: 'task.center.open' }).then``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3064:3476:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``64``—``75`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…``、``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then``、``apiClient .get``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3167:3353:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 67``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback @ 67(data)

处理 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``67``—``72`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``、``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3379:3475:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 73``

.. code-block:: javascript

   apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul… callback @ 73(error)

实现 ``apiClient .get(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadError(nul…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``75`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3573:3718:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then callback @ 77``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.TASKS_ENDPOINT}/definitions`).then callback @ 77(data)

处理 ``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``77``—``79`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDefinitions``、``Object.fromEntries``、``(data.definitions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3676:3703:FUNCTION

.. rubric:: ``(data.definitions || []).map callback @ 78``

.. code-block:: javascript

   (data.definitions || []).map callback @ 78(item)

作为 ``(data.definitions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then callback @ 77``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3726:3741:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then((data) => { if (!disposed) setDefinitions(Object.fromEn… callback @ 79``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.TASKS_ENDPOINT}/definitions`).then((data) => { if (!disposed) setDefinitions(Object.fromEn… callback @ 79()

实现 ``apiClient.get(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60).then((data) => { if (!disposed) setDefinitions(Object.fromEn…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3809:3842:FUNCTION

.. rubric:: ``onEvent({ event: 'task.changed' }).then callback @ 80``

.. code-block:: javascript

   onEvent({ event: 'task.changed' }).then callback @ 80({ payload })

处理 ``onEvent({ event: 'task.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3919:3936:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 81``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 81()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4010:4047:FUNCTION

.. rubric:: ``onEvent({ event: 'task.center.open' }).then callback @ 82``

.. code-block:: javascript

   onEvent({ event: 'task.center.open' }).then callback @ 82({ payload })

处理 ``onEvent({ event: 'task.center.open' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4065:4190:FUNCTION

.. rubric:: ``returned callback @ 83``

.. code-block:: javascript

   returned callback @ 83()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``88`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changed``、``reconnect``、``openTasks``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4231:4515:FUNCTION

.. rubric:: ``useEffect callback @ 90``

.. code-block:: javascript

   useEffect callback @ 90()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``97`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch``、``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4409:4432:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback @ 94``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then callback @ 94(task)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4458:4495:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback @ 95``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`) .then((task) => merge([task])) .catch callback @ 95(error)

处理 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60) .then((task) => merge([task])) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4560:4649:FUNCTION

.. rubric:: ``useEffect callback @ 98``

.. code-block:: javascript

   useEffect callback @ 98()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``100`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.current?.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4707:5022:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(task, operation)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``101``—``110`` 行；所属函数 ``TaskCenter``。

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5068:5127:FUNCTION

.. rubric:: ``Object.values(tasks).sort callback @ 111``

.. code-block:: javascript

   Object.values(tasks).sort callback @ 111(a, b)

作为 ``Object.values(tasks).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``TaskCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5339:5643:FUNCTION

.. rubric:: ``onInteractOutside callback @ 116``

.. code-block:: javascript

   onInteractOutside callback @ 116(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``121`` 行；所属函数 ``TaskCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6041:6073:FUNCTION

.. rubric:: ``onClick callback @ 128``

.. code-block:: javascript

   onClick callback @ 128()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openManagement``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6582:14381:FUNCTION

.. rubric:: ``list.map callback @ 137``

.. code-block:: javascript

   list.map callback @ 137(task)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``246`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``t``、``stageName``、``formatLocalTimestamp``、``Object.entries(task.submission) .filter(([, value]) => value != null) .map``、``Object.entries(task.submission) .filter``、``Object.entries``、``(task.history || []).map``、``task.result.warnings.map``、``workflowArtifacts(task.result).map``、``workflowArtifacts``、``['queued', 'pending', 'running', 'pause_requested', 'paused'].includes``、``['failed', 'cancelled'].includes``。

**内部回调数量**：10。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8342:8370:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter callback @ 159``

.. code-block:: javascript

   Object.entries(task.submission) .filter callback @ 159([, value])

作为 ``Object.entries(task.submission) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``159``—``159`` 行；所属函数 ``list.map callback @ 137``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8422:8807:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 160``

.. code-block:: javascript

   Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 160([key, value])

作为 ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``160``—``165`` 行；所属函数 ``list.map callback @ 137``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9243:9519:FUNCTION

.. rubric:: ``(task.history || []).map callback @ 172``

.. code-block:: javascript

   (task.history || []).map callback @ 172(entry, index)

作为 ``(task.history || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``172``—``176`` 行；所属函数 ``list.map callback @ 137``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatLocalTimestamp``、``stageName``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9937:10069:FUNCTION

.. rubric:: ``task.result.warnings.map callback @ 182``

.. code-block:: javascript

   task.result.warnings.map callback @ 182(warning, index)

作为 ``task.result.warnings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``182``—``184`` 行；所属函数 ``list.map callback @ 137``。

**参数**

``warning``
   调用方传入的 ``warning`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10289:10322:FUNCTION

.. rubric:: ``onClick callback @ 188``

.. code-block:: javascript

   onClick callback @ 188()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``list.map callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openManagement``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:10651:10864:FUNCTION

.. rubric:: ``onClick callback @ 192``

.. code-block:: javascript

   onClick callback @ 192()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``192``—``195`` 行；所属函数 ``list.map callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setOpen``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:11262:11295:FUNCTION

.. rubric:: ``onClick callback @ 200``

.. code-block:: javascript

   onClick callback @ 200()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``list.map callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:11645:12683:FUNCTION

.. rubric:: ``workflowArtifacts(task.result).map callback @ 205``

.. code-block:: javascript

   workflowArtifacts(task.result).map callback @ 205(file)

作为 ``workflowArtifacts(task.result).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``205``—``220`` 行；所属函数 ``list.map callback @ 137``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:11984:12298:FUNCTION

.. rubric:: ``onClick callback @ 210``

.. code-block:: javascript

   onClick callback @ 210()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``210``—``214`` 行；所属函数 ``workflowArtifacts(task.result).map callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadAttachmentResource( file.url, file.filename, ).catch``、``downloadAttachmentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:12260:12297:FUNCTION

.. rubric:: ``downloadAttachmentResource( file.url, file.filename, ).catch callback @ 214``

.. code-block:: javascript

   downloadAttachmentResource( file.url, file.filename, ).catch callback @ 214(error)

处理 ``downloadAttachmentResource( file.url, file.filename, ).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``onClick callback @ 210``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:13217:13250:FUNCTION

.. rubric:: ``onClick callback @ 227``

.. code-block:: javascript

   onClick callback @ 227()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``227``—``227`` 行；所属函数 ``list.map callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:13987:14019:FUNCTION

.. rubric:: ``onClick callback @ 238``

.. code-block:: javascript

   onClick callback @ 238()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``list.map callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。
