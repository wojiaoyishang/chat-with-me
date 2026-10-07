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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:639:1665:FUNCTION

.. js:function:: NotificationCenterTrigger({ listItem = false })

   渲染 ``NotificationCenterTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``13``—``37`` 行。

   **参数**

   ``{ listItem = false }``（默认值 ``{}``）
      调用方传入的 ``listItem = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant="ghost" size={listItem ? 'default' : 'icon'} className={\x60relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}\x60} title={t('messageCenter.title')} ari…``。

   **主要协作调用**：``useTranslation``、``useCenter``、``useNotificationStore``、``Object.keys``、``t``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1665:9897:FUNCTION

.. js:function:: NotificationCenter({ onOpenNotification })

   渲染 ``NotificationCenter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``38``—``206`` 行。

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:777:801:FUNCTION

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:851:881:FUNCTION

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1252:1271:FUNCTION

.. rubric:: ``onClick callback @ 26``

.. code-block:: javascript

   onClick callback @ 26()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``NotificationCenterTrigger``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1855:1885:FUNCTION

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:1930:1964:FUNCTION

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2008:2044:FUNCTION

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

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2476:3322:FUNCTION

.. rubric:: ``anonymous callback @ 53``

.. code-block:: javascript

   async anonymous callback @ 53(offset)

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``53``—``72`` 行；所属函数 ``NotificationCenter``。

**参数**

``offset``（默认值 ``0``）
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``apiClient.get``、``setHistory``、``setHasMore``、``setNextOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2779:3036:FUNCTION

.. rubric:: ``setHistory callback @ 60``

.. code-block:: javascript

   setHistory callback @ 60(previous)

设置与 ``History`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``64`` 行；所属函数 ``anonymous callback @ 53``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...values.values()]``。

**主要协作调用**：``(offset ? previous : []).map``、``values.set``、``values.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:2863:2888:FUNCTION

.. rubric:: ``(offset ? previous : []).map callback @ 61``

.. code-block:: javascript

   (offset ? previous : []).map callback @ 61(item)

作为 ``(offset ? previous : []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``setHistory callback @ 60``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3338:3622:FUNCTION

.. rubric:: ``useEffect callback @ 73``

.. code-block:: javascript

   useEffect callback @ 73()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``82`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { ++version.current; off(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``loadRef.current``、``onEvent({ event: 'notification.*' }).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3502:3530:FUNCTION

.. rubric:: ``onEvent({ event: 'notification.*' }).then callback @ 77``

.. code-block:: javascript

   onEvent({ event: 'notification.*' }).then callback @ 77()

处理 ``onEvent({ event: 'notification.*' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``useEffect callback @ 73``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadRef.current``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3547:3615:FUNCTION

.. rubric:: ``returned callback @ 78``

.. code-block:: javascript

   returned callback @ 78()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``81`` 行；所属函数 ``useEffect callback @ 73``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``off``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:3650:4288:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   async close(notification)

关闭与 ``close`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``83``—``99`` 行；所属函数 ``NotificationCenter``。

**参数**

``notification``（默认值 ``null``）
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``encodeURIComponent``、``resolve``、``loadRef.current``、``toast.error``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4326:4351:FUNCTION

.. rubric:: ``history.map callback @ 100``

.. code-block:: javascript

   history.map callback @ 100(item)

作为 ``history.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4522:4609:FUNCTION

.. rubric:: ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback @ 103``

.. code-block:: javascript

   (tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback @ 103(item)

作为 ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4625:4684:FUNCTION

.. rubric:: ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {… callback @ 104``

.. code-block:: javascript

   (tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {… callback @ 104(a, b)

实现 ``(tab === 'current' ? Object.values(pending) : [...all.values()]) .map((item) => (resolved[item.id] >= item.revision ? {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``NotificationCenter``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.parse``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:4891:5075:FUNCTION

.. rubric:: ``onInteractOutside callback @ 109``

.. code-block:: javascript

   onInteractOutside callback @ 109(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``112`` 行；所属函数 ``NotificationCenter``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5464:5917:FUNCTION

.. rubric:: ``['current', 'history'].map callback @ 119``

.. code-block:: javascript

   ['current', 'history'].map callback @ 119(value)

作为 ``['current', 'history'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``129`` 行；所属函数 ``NotificationCenter``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:5757:5776:FUNCTION

.. rubric:: ``onClick callback @ 125``

.. code-block:: javascript

   onClick callback @ 125()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``['current', 'history'].map callback @ 119``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTab``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:6171:6189:FUNCTION

.. rubric:: ``onClick callback @ 135``

.. code-block:: javascript

   onClick callback @ 135()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:6860:9341:FUNCTION

.. rubric:: ``items.map callback @ 148``

.. code-block:: javascript

   items.map callback @ 148(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``148``—``191`` 行；所属函数 ``NotificationCenter``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``new Date(item.createdAt).toLocaleString``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:7678:7700:FUNCTION

.. rubric:: ``onClick callback @ 160``

.. code-block:: javascript

   onClick callback @ 160()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``items.map callback @ 148``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:8870:9037:FUNCTION

.. rubric:: ``onClick callback @ 181``

.. code-block:: javascript

   onClick callback @ 181()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``181``—``184`` 行；所属函数 ``items.map callback @ 148``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``onOpenNotification``。

.. CWM-AST-FUNCTION src/features/notification/NotificationCenter.jsx:9608:9646:FUNCTION

.. rubric:: ``onClick callback @ 197``

.. code-block:: javascript

   onClick callback @ 197()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``NotificationCenter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadRef.current``。
