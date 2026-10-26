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

``@/lib/clientText.js``、``react``、``zustand``、``react-i18next``、``lucide-react``、``@/components/ui/sheet``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/context/useEventStore.jsx``、``./useNotificationStore.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:699:1725:FUNCTION

.. js:function:: NotificationCenterTrigger({ listItem = false })

   渲染 ``NotificationCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``14``—``38`` 行。

   **参数**

   ``{ listItem = false }`` （默认值 ``{}``）
      调用方传入的 ``listItem = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size={listItem ? 'default' : 'icon'} className={\x60relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}\x60} title={t('messageCenter.title')} ari…``。

   **主要协作调用**：``useTranslation``、``useCenter``、``useNotificationStore``、``Object.keys``、``t``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1725:9952:FUNCTION

.. js:function:: NotificationCenter({ onOpenNotification })

   渲染 ``NotificationCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``39``—``207`` 行。

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:637:697:FUNCTION

.. rubric:: ``create callback @ 13``

.. code-block:: javascript

   create callback @ 13(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``13``—``13`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:670:694:FUNCTION

.. rubric:: ``setOpen``

.. code-block:: javascript

   setOpen(open)

设置与 ``Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``create callback @ 13``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:837:861:FUNCTION

.. rubric:: ``useCenter callback @ 16``

.. code-block:: javascript

   useCenter callback @ 16(state)

封装 ``Center`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:911:941:FUNCTION

.. rubric:: ``useNotificationStore callback @ 17``

.. code-block:: javascript

   useNotificationStore callback @ 17(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1312:1331:FUNCTION

.. rubric:: ``onClick callback @ 27``

.. code-block:: javascript

   onClick callback @ 27()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1915:1945:FUNCTION

.. rubric:: ``useNotificationStore callback @ 42``

.. code-block:: javascript

   useNotificationStore callback @ 42(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``NotificationCenter``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1990:2024:FUNCTION

.. rubric:: ``useNotificationStore callback @ 43``

.. code-block:: javascript

   useNotificationStore callback @ 43(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``NotificationCenter``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2068:2104:FUNCTION

.. rubric:: ``useNotificationStore callback @ 44``

.. code-block:: javascript

   useNotificationStore callback @ 44(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``NotificationCenter``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2536:3382:FUNCTION

.. rubric:: ``anonymous callback @ 54``

.. code-block:: javascript

   async anonymous callback @ 54(offset)

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``54``—``73`` 行；所属函数 ``NotificationCenter``。

**参数**

``offset`` （默认值 ``0``）
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``apiClient.get``、``setHistory``、``setHasMore``、``setNextOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2839:3096:FUNCTION

.. rubric:: ``setHistory callback @ 61``

.. code-block:: javascript

   setHistory callback @ 61(previous)

设置与 ``History`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``61``—``65`` 行；所属函数 ``anonymous callback @ 54``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...values.values()]``。

**主要协作调用**：``(offset ? previous : []).map``、``values.set``、``values.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2923:2948:FUNCTION

.. rubric:: ``(offset ? previous : []).map callback @ 62``

.. code-block:: javascript

   (offset ? previous : []).map callback @ 62(item)

作为 ``(offset ? previous : []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``setHistory callback @ 61``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3398:3682:FUNCTION

.. rubric:: ``useEffect callback @ 74``

.. code-block:: javascript

   useEffect callback @ 74()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``83`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { ++version.current; off(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``loadRef.current``、``onEvent({ event: 'notification.*' }).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3562:3590:FUNCTION

.. rubric:: ``onEvent({ event: 'notification.*' }).then callback @ 78``

.. code-block:: javascript

   onEvent({ event: 'notification.*' }).then callback @ 78()

处理 ``onEvent({ event: 'notification.*' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``useEffect callback @ 74``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadRef.current``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3607:3675:FUNCTION

.. rubric:: ``returned callback @ 79``

.. code-block:: javascript

   returned callback @ 79()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``82`` 行；所属函数 ``useEffect callback @ 74``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``off``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3710:4348:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   async close(notification)

关闭与 ``close`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``84``—``100`` 行；所属函数 ``NotificationCenter``。

**参数**

``notification`` （默认值 ``null``）
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``encodeURIComponent``、``resolve``、``loadRef.current``、``toast.error``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4386:4411:FUNCTION

.. rubric:: ``history.map callback @ 101``

.. code-block:: javascript

   history.map callback @ 101(item)

作为 ``history.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4582:4669:FUNCTION

.. rubric:: ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback @ 104``

.. code-block:: javascript

   (tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback @ 104(item)

作为 ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4685:4744:FUNCTION

.. rubric:: ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {… callback @ 105``

.. code-block:: javascript

   (tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {… callback @ 105(a, b)

实现 ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``NotificationCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4951:5135:FUNCTION

.. rubric:: ``onInteractOutside callback @ 110``

.. code-block:: javascript

   onInteractOutside callback @ 110(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``113`` 行；所属函数 ``NotificationCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5524:5977:FUNCTION

.. rubric:: ``['current', 'history'].map callback @ 120``

.. code-block:: javascript

   ['current', 'history'].map callback @ 120(value)

作为 ``['current', 'history'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``130`` 行；所属函数 ``NotificationCenter``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5817:5836:FUNCTION

.. rubric:: ``onClick callback @ 126``

.. code-block:: javascript

   onClick callback @ 126()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``['current', 'history'].map callback @ 120``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTab``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:6231:6249:FUNCTION

.. rubric:: ``onClick callback @ 136``

.. code-block:: javascript

   onClick callback @ 136()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:6920:9396:FUNCTION

.. rubric:: ``items.map callback @ 149``

.. code-block:: javascript

   items.map callback @ 149(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``192`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``formatLocalTimestamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:7738:7760:FUNCTION

.. rubric:: ``onClick callback @ 161``

.. code-block:: javascript

   onClick callback @ 161()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``items.map callback @ 149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:8925:9092:FUNCTION

.. rubric:: ``onClick callback @ 182``

.. code-block:: javascript

   onClick callback @ 182()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``182``—``185`` 行；所属函数 ``items.map callback @ 149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``onOpenNotification``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:9663:9701:FUNCTION

.. rubric:: ``onClick callback @ 198``

.. code-block:: javascript

   onClick callback @ 198()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``198``—``198`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadRef.current``。
