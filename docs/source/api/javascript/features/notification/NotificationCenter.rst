src/features/notification/NotificationCenter 模块
======================================================================================================

.. js:module:: src/features/notification/NotificationCenter

该模块实现通知订阅、展示与用户操作。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/notification/NotificationCenter.jsx``
* **模块标识**：``src/features/notification/NotificationCenter``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：26

主要依赖
--------------------------------------------------------------------------------

``react``、``zustand``、``react-i18next``、``lucide-react``、``@/components/ui/sheet``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/context/useEventStore.jsx``、``./useNotificationStore.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:639:1489:FUNCTION

.. js:function:: NotificationCenterTrigger()

   渲染 ``NotificationCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``13``—``35`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size="icon" className="relative shrink-0" title={t('messageCenter.title')} aria-label={t('messageCenter.title')} onClick={() => setOpen(true)} > <Bell cl…``。

   **主要协作调用**：``useTranslation``、``useCenter``、``useNotificationStore``、``Object.keys``、``t``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1489:9721:FUNCTION

.. js:function:: NotificationCenter({ onOpenNotification })

   渲染 ``NotificationCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``36``—``204`` 行。

   **参数**

   ``{ onOpenNotification }``
      调用方传入的 ``onOpenNotification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Sheet open={open} onOpenChange={setOpen} modal={false}> <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg" onInteractOutside={(event) => { if (event.target instance…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``useCenter``、``useNotificationStore``、``useState``、``useRef``、``useEffect``、``history.map``、``Object.values``、``all.set``、``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {…``、``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map``、``all.values``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:577:637:FUNCTION

.. rubric:: ``create callback @ 12``

.. code-block:: javascript

   create callback @ 12(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``12``—``12`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:610:634:FUNCTION

.. rubric:: ``setOpen``

.. code-block:: javascript

   setOpen(open)

设置与 ``Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``create callback @ 12``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:752:776:FUNCTION

.. rubric:: ``useCenter callback @ 15``

.. code-block:: javascript

   useCenter callback @ 15(state)

封装 ``Center`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:826:856:FUNCTION

.. rubric:: ``useNotificationStore callback @ 16``

.. code-block:: javascript

   useNotificationStore callback @ 16(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1151:1170:FUNCTION

.. rubric:: ``onClick callback @ 25``

.. code-block:: javascript

   onClick callback @ 25()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1679:1709:FUNCTION

.. rubric:: ``useNotificationStore callback @ 39``

.. code-block:: javascript

   useNotificationStore callback @ 39(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``NotificationCenter``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1754:1788:FUNCTION

.. rubric:: ``useNotificationStore callback @ 40``

.. code-block:: javascript

   useNotificationStore callback @ 40(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``NotificationCenter``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1832:1868:FUNCTION

.. rubric:: ``useNotificationStore callback @ 41``

.. code-block:: javascript

   useNotificationStore callback @ 41(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``NotificationCenter``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2300:3146:FUNCTION

.. rubric:: ``anonymous callback @ 51``

.. code-block:: javascript

   async anonymous callback @ 51(offset)

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``51``—``70`` 行；所属函数 ``NotificationCenter``。

**参数**

``offset``（默认值 ``0``）
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``apiClient.get``、``setHistory``、``setHasMore``、``setNextOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2603:2860:FUNCTION

.. rubric:: ``setHistory callback @ 58``

.. code-block:: javascript

   setHistory callback @ 58(previous)

设置与 ``History`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``62`` 行；所属函数 ``anonymous callback @ 51``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...values.values()]``。

**主要协作调用**：``(offset ? previous : []).map``、``values.set``、``values.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2687:2712:FUNCTION

.. rubric:: ``(offset ? previous : []).map callback @ 59``

.. code-block:: javascript

   (offset ? previous : []).map callback @ 59(item)

作为 ``(offset ? previous : []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``setHistory callback @ 58``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3162:3446:FUNCTION

.. rubric:: ``useEffect callback @ 71``

.. code-block:: javascript

   useEffect callback @ 71()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``71``—``80`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { ++version.current; off(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``loadRef.current``、``onEvent({ event: 'notification.*' }).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3326:3354:FUNCTION

.. rubric:: ``onEvent({ event: 'notification.*' }).then callback @ 75``

.. code-block:: javascript

   onEvent({ event: 'notification.*' }).then callback @ 75()

处理 ``onEvent({ event: 'notification.*' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``useEffect callback @ 71``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadRef.current``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3371:3439:FUNCTION

.. rubric:: ``returned callback @ 76``

.. code-block:: javascript

   returned callback @ 76()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``79`` 行；所属函数 ``useEffect callback @ 71``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``off``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3474:4112:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   async close(notification)

关闭与 ``close`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``81``—``97`` 行；所属函数 ``NotificationCenter``。

**参数**

``notification``（默认值 ``null``）
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``encodeURIComponent``、``resolve``、``loadRef.current``、``toast.error``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4150:4175:FUNCTION

.. rubric:: ``history.map callback @ 98``

.. code-block:: javascript

   history.map callback @ 98(item)

作为 ``history.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4346:4433:FUNCTION

.. rubric:: ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback @ 101``

.. code-block:: javascript

   (tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback @ 101(item)

作为 ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4449:4508:FUNCTION

.. rubric:: ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {… callback @ 102``

.. code-block:: javascript

   (tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {… callback @ 102(a, b)

实现 ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``NotificationCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4715:4899:FUNCTION

.. rubric:: ``onInteractOutside callback @ 107``

.. code-block:: javascript

   onInteractOutside callback @ 107(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``107``—``110`` 行；所属函数 ``NotificationCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5288:5741:FUNCTION

.. rubric:: ``['current', 'history'].map callback @ 117``

.. code-block:: javascript

   ['current', 'history'].map callback @ 117(value)

作为 ``['current', 'history'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``127`` 行；所属函数 ``NotificationCenter``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5581:5600:FUNCTION

.. rubric:: ``onClick callback @ 123``

.. code-block:: javascript

   onClick callback @ 123()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``['current', 'history'].map callback @ 117``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTab``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5995:6013:FUNCTION

.. rubric:: ``onClick callback @ 133``

.. code-block:: javascript

   onClick callback @ 133()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:6684:9165:FUNCTION

.. rubric:: ``items.map callback @ 146``

.. code-block:: javascript

   items.map callback @ 146(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``189`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``new Date(item.createdAt).toLocaleString``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:7502:7524:FUNCTION

.. rubric:: ``onClick callback @ 158``

.. code-block:: javascript

   onClick callback @ 158()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``items.map callback @ 146``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:8694:8861:FUNCTION

.. rubric:: ``onClick callback @ 179``

.. code-block:: javascript

   onClick callback @ 179()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``182`` 行；所属函数 ``items.map callback @ 146``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``onOpenNotification``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:9432:9470:FUNCTION

.. rubric:: ``onClick callback @ 195``

.. code-block:: javascript

   onClick callback @ 195()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadRef.current``。
