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
* **局部函数与匿名回调**：56

主要依赖
--------------------------------------------------------------------------------

``../workflows/workflowProducts.js``、``@/lib/clientText.js``、``react``、``react-i18next``、``lucide-react``、``react-router-dom``、``@/components/ui/sheet``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``./useTaskStore.js``、``@/lib/resourceDownload.js``、``./RunObservation.jsx``、``sonner``、``@/runtime/backend/bootstrapRequests.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1201:2468:FUNCTION

.. js:function:: TaskCenterTrigger({ listItem = false })

   渲染 ``TaskCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``20``—``48`` 行。

   **参数**

   ``{ listItem = false }`` （默认值 ``{}``）
      调用方传入的 ``listItem = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size={listItem ? 'default' : 'icon'} className={\x60relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}\x60} aria-label={t('taskCenter.title')} t…``。

   **主要协作调用**：``useTranslation``、``useTaskStore``、``backendAccountKey``、``Object.values(tasks).filter``、``Object.values``、``t``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2468:17765:FUNCTION

.. js:function:: TaskCenter()

   渲染 ``TaskCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``50``—``310`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Sheet open={open} onOpenChange={setOpen} modal={false}> <SheetContent className="w-full sm:max-w-lg flex flex-col p-0" onInteractOutside={(event) => { // Notifications remain i…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useTranslation``、``useNavigate``、``useTaskStore``、``backendAccountKey``、``useState``、``useRef``、``useEffect``、``Object.values(tasks).sort``、``Object.values``、``t``、``list.map``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1336:1349:FUNCTION

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1384:1398:FUNCTION

.. rubric:: ``useTaskStore callback @ 23``

.. code-block:: javascript

   useTaskStore callback @ 23(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1436:1453:FUNCTION

.. rubric:: ``useTaskStore callback @ 24``

.. code-block:: javascript

   useTaskStore callback @ 24(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1490:1506:FUNCTION

.. rubric:: ``useTaskStore callback @ 25``

.. code-block:: javascript

   useTaskStore callback @ 25(s)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``s``
   调用方传入的 ``s`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:1619:1731:FUNCTION

.. rubric:: ``Object.values(tasks).filter callback @ 26``

.. code-block:: javascript

   Object.values(tasks).filter callback @ 26(task)

作为 ``Object.values(tasks).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``27`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['queued', 'pending', 'running', 'cancel_requested', 'pause_requested'].includes``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:2066:2078:FUNCTION

.. rubric:: ``onClick callback @ 37``

.. code-block:: javascript

   onClick callback @ 37()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``TaskCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3186:4644:FUNCTION

.. rubric:: ``useEffect callback @ 63``

.. code-block:: javascript

   useEffect callback @ 63()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``95`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; if (timer !== null) window.clearTimeout(timer); statusChanged(); reconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTaskStore.getState().bindOwner``、``useTaskStore.getState``、``useTaskStore.subscribe``、``onEvent({ event: 'transport.connected' }).then``、``onEvent``、``refresh``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3361:3519:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``71`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3462:3501:FUNCTION

.. rubric:: ``window.setTimeout callback @ 70``

.. code-block:: javascript

   window.setTimeout callback @ 70()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``schedule``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3545:4137:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``72``—``83`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``inFlight``、``request``。

**主要协作调用**：``useTaskStore.getState``、``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/summary\x60) .then((data) => { if (!disposed && !useTaskStore.getStat…``、``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/summary\x60) .then``、``loadBootstrapResource``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3795:3941:FUNCTION

.. rubric:: ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/summary\x60) .then callback @ 76``

.. code-block:: javascript

   loadBootstrapResource(`${apiEndpoint.TASKS_ENDPOINT}/summary`) .then callback @ 76(data)

处理 ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/summary\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``refresh``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``useTaskStore.getState().setSummary``、``useTaskStore.getState``、``schedule``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:3967:3982:FUNCTION

.. rubric:: ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/summary\x60) .then((data) => { if (!disposed && !useTaskStore.getStat… callback @ 79``

.. code-block:: javascript

   loadBootstrapResource(`${apiEndpoint.TASKS_ENDPOINT}/summary`) .then((data) => { if (!disposed && !useTaskStore.getStat… callback @ 79()

加载与 ``Bootstrap Resource(\x60${api Endpoint.TASKS ENDPOINT}/summary\x60) .then((data) => { if (!disposed && !use Task Store.get Stat…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``refresh``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4010:4062:FUNCTION

.. rubric:: ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/summary\x60) .then((data) => { if (!disposed && !useTaskStore.getStat… callback @ 80``

.. code-block:: javascript

   loadBootstrapResource(`${apiEndpoint.TASKS_ENDPOINT}/summary`) .then((data) => { if (!disposed && !useTaskStore.getStat… callback @ 80()

加载与 ``Bootstrap Resource(\x60${api Endpoint.TASKS ENDPOINT}/summary\x60) .then((data) => { if (!disposed && !use Task Store.get Stat…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``refresh``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4193:4330:FUNCTION

.. rubric:: ``useTaskStore.subscribe callback @ 84``

.. code-block:: javascript

   useTaskStore.subscribe callback @ 84(state, previous)

封装 ``TaskStore.subscribe`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``86`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``schedule``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4407:4427:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 87``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 87()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4470:4636:FUNCTION

.. rubric:: ``returned callback @ 89``

.. code-block:: javascript

   returned callback @ 89()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``89``—``94`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``statusChanged``、``reconnect``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4681:4869:FUNCTION

.. rubric:: ``stageName``

.. code-block:: javascript

   stageName(task, stage)

实现 ``stageName`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``96``—``97`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``stage``
   调用方传入的 ``stage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``definitions[task.kind]?.stages?.find``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4736:4764:FUNCTION

.. rubric:: ``definitions[task.kind]?.stages?.find callback @ 96``

.. code-block:: javascript

   definitions[task.kind]?.stages?.find callback @ 96(item)

作为 ``definitions[task.kind]?.stages?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``stageName``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:4898:5029:FUNCTION

.. rubric:: ``openManagement``

.. code-block:: javascript

   openManagement(taskId)

打开与 ``Management`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``98``—``101`` 行；所属函数 ``TaskCenter``。

**参数**

``taskId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setOpen``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5046:5324:FUNCTION

.. rubric:: ``useEffect callback @ 102``

.. code-block:: javascript

   useEffect callback @ 102()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``102``—``106`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { changed(); openTasks(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'task.changed' }).then``、``onEvent``、``onEvent({ event: 'task.center.open' }).then``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5119:5152:FUNCTION

.. rubric:: ``onEvent({ event: 'task.changed' }).then callback @ 103``

.. code-block:: javascript

   onEvent({ event: 'task.changed' }).then callback @ 103({ payload })

处理 ``onEvent({ event: 'task.changed' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5226:5264:FUNCTION

.. rubric:: ``onEvent({ event: 'task.center.open' }).then callback @ 104``

.. code-block:: javascript

   onEvent({ event: 'task.center.open' }).then callback @ 104({ payload })

处理 ``onEvent({ event: 'task.center.open' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5282:5316:FUNCTION

.. rubric:: ``returned callback @ 105``

.. code-block:: javascript

   returned callback @ 105()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changed``、``openTasks``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5357:6831:FUNCTION

.. rubric:: ``useEffect callback @ 107``

.. code-block:: javascript

   useEffect callback @ 107()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``142`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { disposed = true; reconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``load``、``onEvent({ event: 'transport.connected' }).then``、``onEvent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5485:6615:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``111``—``135`` 行；所属函数 ``useEffect callback @ 107``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``inFlight``、``request``。

**主要协作调用**：``setLoading``、``loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadEr…``、``loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then``、``loadBootstrapResource``、``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60) .then((data) => { if (!disposed) setDefinitions(Obje…``、``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60) .then``、``Promise.all([tasksRequest, definitionsRequest]).finally``、``Promise.all``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5676:5862:FUNCTION

.. rubric:: ``loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then callback @ 115``

.. code-block:: javascript

   loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then callback @ 115(data)

处理 ``loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``115``—``120`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``、``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:5888:5984:FUNCTION

.. rubric:: ``loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadEr… callback @ 121``

.. code-block:: javascript

   loadBootstrapResource(apiEndpoint.TASKS_ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); setLoadEr… callback @ 121(error)

加载与 ``Bootstrap Resource(api Endpoint.TASKS ENDPOINT) .then((data) => { if (!disposed) { merge(data.tasks || []); set Load Er…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``121``—``123`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadError``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6117:6278:FUNCTION

.. rubric:: ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60) .then callback @ 125``

.. code-block:: javascript

   loadBootstrapResource(`${apiEndpoint.TASKS_ENDPOINT}/definitions`) .then callback @ 125(data)

处理 ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``125``—``127`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDefinitions``、``Object.fromEntries``、``(data.definitions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6228:6255:FUNCTION

.. rubric:: ``(data.definitions || []).map callback @ 126``

.. code-block:: javascript

   (data.definitions || []).map callback @ 126(item)

作为 ``(data.definitions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60) .then callback @ 125``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6304:6319:FUNCTION

.. rubric:: ``loadBootstrapResource(\x60${apiEndpoint.TASKS_ENDPOINT}/definitions\x60) .then((data) => { if (!disposed) setDefinitions(Obje… callback @ 128``

.. code-block:: javascript

   loadBootstrapResource(`${apiEndpoint.TASKS_ENDPOINT}/definitions`) .then((data) => { if (!disposed) setDefinitions(Obje… callback @ 128()

加载与 ``Bootstrap Resource(\x60${api Endpoint.TASKS ENDPOINT}/definitions\x60) .then((data) => { if (!disposed) set Definitions(Obje…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``load``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6407:6540:FUNCTION

.. rubric:: ``Promise.all([tasksRequest, definitionsRequest]).finally callback @ 129``

.. code-block:: javascript

   Promise.all([tasksRequest, definitionsRequest]).finally callback @ 129()

处理 ``Promise.all([tasksRequest, definitionsRequest]).finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``129``—``132`` 行；所属函数 ``load``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6713:6730:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 137``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 137()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``useEffect callback @ 107``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6748:6823:FUNCTION

.. rubric:: ``returned callback @ 138``

.. code-block:: javascript

   returned callback @ 138()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``141`` 行；所属函数 ``useEffect callback @ 107``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reconnect``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:6864:7325:FUNCTION

.. rubric:: ``useEffect callback @ 143``

.. code-block:: javascript

   useEffect callback @ 143()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``143``—``152`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60, { signal: controller.signal, timeout:…``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7140:7163:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60, { signal: controller.signal, timeout:… callback @ 148``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`, { signal: controller.signal, timeout:… callback @ 148(task)

实现 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60, { signal: controller.signal, timeout:…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``useEffect callback @ 143``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merge``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7189:7263:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60, { signal: controller.signal, timeout:… callback @ 149``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`, { signal: controller.signal, timeout:… callback @ 149(error)

实现 ``apiClient .get(\x60${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}\x60, { signal: controller.signal, timeout:…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``useEffect callback @ 143``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7292:7317:FUNCTION

.. rubric:: ``returned callback @ 151``

.. code-block:: javascript

   returned callback @ 151()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``useEffect callback @ 143``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7370:7459:FUNCTION

.. rubric:: ``useEffect callback @ 153``

.. code-block:: javascript

   useEffect callback @ 153()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``153``—``155`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.current?.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7517:7832:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(task, operation)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``156``—``165`` 行；所属函数 ``TaskCenter``。

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

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:7878:7937:FUNCTION

.. rubric:: ``Object.values(tasks).sort callback @ 166``

.. code-block:: javascript

   Object.values(tasks).sort callback @ 166(a, b)

作为 ``Object.values(tasks).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``TaskCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8149:8453:FUNCTION

.. rubric:: ``onInteractOutside callback @ 171``

.. code-block:: javascript

   onInteractOutside callback @ 171(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``171``—``176`` 行；所属函数 ``TaskCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:8857:8917:FUNCTION

.. rubric:: ``onClick callback @ 183``

.. code-block:: javascript

   onClick callback @ 183()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setOpen``、``navigate``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9086:9118:FUNCTION

.. rubric:: ``onClick callback @ 186``

.. code-block:: javascript

   onClick callback @ 186()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``TaskCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openManagement``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:9882:17681:FUNCTION

.. rubric:: ``list.map callback @ 196``

.. code-block:: javascript

   list.map callback @ 196(task)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``196``—``305`` 行；所属函数 ``TaskCenter``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``t``、``stageName``、``formatLocalTimestamp``、``Object.entries(task.submission) .filter(([, value]) => value != null) .map``、``Object.entries(task.submission) .filter``、``Object.entries``、``(task.history || []).map``、``task.result.warnings.map``、``workflowArtifacts(task.result).map``、``workflowArtifacts``、``['queued', 'pending', 'running', 'pause_requested', 'paused'].includes``、``['failed', 'cancelled'].includes``。

**内部回调数量**：10。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:11642:11670:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter callback @ 218``

.. code-block:: javascript

   Object.entries(task.submission) .filter callback @ 218([, value])

作为 ``Object.entries(task.submission) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``list.map callback @ 196``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:11722:12107:FUNCTION

.. rubric:: ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 219``

.. code-block:: javascript

   Object.entries(task.submission) .filter(([, value]) => value != null) .map callback @ 219([key, value])

作为 ``Object.entries(task.submission) .filter(([, value]) => value != null) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``219``—``224`` 行；所属函数 ``list.map callback @ 196``。

**参数**

``[key, value]``
   调用方传入的 ``key, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:12543:12819:FUNCTION

.. rubric:: ``(task.history || []).map callback @ 231``

.. code-block:: javascript

   (task.history || []).map callback @ 231(entry, index)

作为 ``(task.history || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``235`` 行；所属函数 ``list.map callback @ 196``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatLocalTimestamp``、``stageName``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:13237:13369:FUNCTION

.. rubric:: ``task.result.warnings.map callback @ 241``

.. code-block:: javascript

   task.result.warnings.map callback @ 241(warning, index)

作为 ``task.result.warnings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``241``—``243`` 行；所属函数 ``list.map callback @ 196``。

**参数**

``warning``
   调用方传入的 ``warning`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:13589:13622:FUNCTION

.. rubric:: ``onClick callback @ 247``

.. code-block:: javascript

   onClick callback @ 247()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``list.map callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openManagement``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:13951:14164:FUNCTION

.. rubric:: ``onClick callback @ 251``

.. code-block:: javascript

   onClick callback @ 251()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``251``—``254`` 行；所属函数 ``list.map callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setOpen``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:14562:14595:FUNCTION

.. rubric:: ``onClick callback @ 259``

.. code-block:: javascript

   onClick callback @ 259()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``list.map callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:14945:15983:FUNCTION

.. rubric:: ``workflowArtifacts(task.result).map callback @ 264``

.. code-block:: javascript

   workflowArtifacts(task.result).map callback @ 264(file)

作为 ``workflowArtifacts(task.result).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``279`` 行；所属函数 ``list.map callback @ 196``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:15284:15598:FUNCTION

.. rubric:: ``onClick callback @ 269``

.. code-block:: javascript

   onClick callback @ 269()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``269``—``273`` 行；所属函数 ``workflowArtifacts(task.result).map callback @ 264``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadAttachmentResource( file.url, file.filename, ).catch``、``downloadAttachmentResource``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:15560:15597:FUNCTION

.. rubric:: ``downloadAttachmentResource( file.url, file.filename, ).catch callback @ 273``

.. code-block:: javascript

   downloadAttachmentResource( file.url, file.filename, ).catch callback @ 273(error)

处理 ``downloadAttachmentResource( file.url, file.filename, ).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``onClick callback @ 269``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:16517:16550:FUNCTION

.. rubric:: ``onClick callback @ 286``

.. code-block:: javascript

   onClick callback @ 286()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``list.map callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/tasks/TaskCenter.jsx:17287:17319:FUNCTION

.. rubric:: ``onClick callback @ 297``

.. code-block:: javascript

   onClick callback @ 297()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``list.map callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。
