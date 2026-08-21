src/features/notification/NotificationHost 模块
=============================================

.. js:module:: src/features/notification/NotificationHost

该模块实现通知订阅、展示与用户操作。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/notification/NotificationHost.jsx``
* **模块标识**：``src/features/notification/NotificationHost``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：58

主要依赖
--------

``react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/lib/tools.jsx``、``./NotificationToast.jsx``、``./notificationRegistry.js``、``./useNotificationStore.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:629:731:FUNCTION

.. js:function:: toastIdFor(notificationId, mobile)

   实现 ``toastIdFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``15`` 行。

   **参数**

   ``notificationId``
      目标对象的公共或运行时标识。

   ``mobile``
      调用方传入的 ``mobile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:753:854:FUNCTION

.. js:function:: toastIdsFor(notificationId)

   实现 ``toastIdsFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``20`` 行。

   **参数**

   ``notificationId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``toastIdFor``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:886:1162:FUNCTION

.. js:function:: notificationTimestamp(notification)

   实现 ``notificationTimestamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``28`` 行。

   **参数**

   ``notification``
      调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``、``Date.parse``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1189:15161:FUNCTION

.. js:function:: NotificationHost({ currentConversationId, isConversationVisible = true, onOpenConversation, })

   渲染 ``NotificationHost`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``339`` 行。

   **参数**

   ``{ currentConversationId, isConversationVisible = true, onOpenConversation, }``
      调用方传入的 `` currentConversationId, isConversationVisible = true, onOpenConversation, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useNotificationStore``、``useIsMobile``、``useState``、``useRef``、``Date.now``、``document.title.replace``、``useMemo``、``useCallback``、``useEffect``。

   **内部回调数量**：26。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1325:1347:FUNCTION

.. rubric:: ``useNotificationStore callback @ 35``

.. code-block:: javascript

   useNotificationStore callback @ 35(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1400:1430:FUNCTION

.. rubric:: ``useNotificationStore callback @ 36``

.. code-block:: javascript

   useNotificationStore callback @ 36(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1480:1510:FUNCTION

.. rubric:: ``useNotificationStore callback @ 37``

.. code-block:: javascript

   useNotificationStore callback @ 37(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1555:1580:FUNCTION

.. rubric:: ``useNotificationStore callback @ 38``

.. code-block:: javascript

   useNotificationStore callback @ 38(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1637:1674:FUNCTION

.. rubric:: ``useNotificationStore callback @ 39``

.. code-block:: javascript

   useNotificationStore callback @ 39(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1729:1764:FUNCTION

.. rubric:: ``useNotificationStore callback @ 40``

.. code-block:: javascript

   useNotificationStore callback @ 40(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1819:1854:FUNCTION

.. rubric:: ``useNotificationStore callback @ 41``

.. code-block:: javascript

   useNotificationStore callback @ 41(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:1910:1946:FUNCTION

.. rubric:: ``useNotificationStore callback @ 42``

.. code-block:: javascript

   useNotificationStore callback @ 42(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:2001:2036:FUNCTION

.. rubric:: ``useNotificationStore callback @ 43``

.. code-block:: javascript

   useNotificationStore callback @ 43(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:2092:2128:FUNCTION

.. rubric:: ``useNotificationStore callback @ 44``

.. code-block:: javascript

   useNotificationStore callback @ 44(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``NotificationHost``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:2226:2256:FUNCTION

.. rubric:: ``useState callback @ 46``

.. code-block:: javascript

   useState callback @ 46()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:2682:2719:FUNCTION

.. rubric:: ``useMemo callback @ 56``

.. code-block:: javascript

   useMemo callback @ 56()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.values``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:2782:3065:FUNCTION

.. rubric:: ``useCallback callback @ 58``

.. code-block:: javascript

   useCallback callback @ 58(notification)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``63`` 行；所属函数 ``NotificationHost``。

**参数**

``notification``
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``explicit``、``spec?.defaultSubscribed !== false``。

**主要协作调用**：``types.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:2962:3007:FUNCTION

.. rubric:: ``types.find callback @ 61``

.. code-block:: javascript

   types.find callback @ 61(item)

作为 ``types.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``useCallback callback @ 58``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:3127:3285:FUNCTION

.. rubric:: ``useCallback callback @ 65``

.. code-block:: javascript

   useCallback callback @ 65(notificationId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``68`` 行；所属函数 ``NotificationHost``。

**参数**

``notificationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toastIdsFor(notificationId).forEach``、``toastIdsFor``、``shownRef.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:3193:3228:FUNCTION

.. rubric:: ``toastIdsFor(notificationId).forEach callback @ 66``

.. code-block:: javascript

   toastIdsFor(notificationId).forEach callback @ 66(toastId)

作为 ``toastIdsFor(notificationId).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``useCallback callback @ 65``。

**参数**

``toastId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:3330:3572:FUNCTION

.. rubric:: ``useCallback callback @ 70``

.. code-block:: javascript

   useCallback callback @ 70(notificationId, revision)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``74`` 行；所属函数 ``NotificationHost``。

**参数**

``notificationId``
   目标对象的公共或运行时标识。

``revision``（默认值 ``null``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``hideToast``、``backgroundRevisionRef.current.delete``、``hiddenRevisionRef.current.set``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:3645:4476:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76(items, since, baseline)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``91`` 行；所属函数 ``NotificationHost``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``since``（默认值 ``null``）
   调用方传入的 ``since`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``baseline``（默认值 ``null``）
   调用方传入的 ``baseline`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``notificationTimestamp``、``Number``、``baseline?.get``、``backgroundRevisionRef.current.set``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:4533:5608:FUNCTION

.. rubric:: ``useCallback callback @ 93``

.. code-block:: javascript

   useCallback callback @ 93({ backgroundSince = null, backgroundBaseline = null, })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``93``—``117`` 行；所属函数 ``NotificationHost``。

**参数**

``{ backgroundSince = null, backgroundBaseline = null, }``（默认值 ``{}``）
   调用方传入的 `` backgroundSince = null, backgroundBaseline = null, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``syncPromiseRef.current.then((items) => { rememberBackgroundNotifications(items, backgroundSince, backgroundBaseline); return items; })``、``promise``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``syncPromiseRef.current.then``、``apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then((response) => { const items = response?.notifications \|\|…``、``apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then``、``apiClient.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:4705:4854:FUNCTION

.. rubric:: ``syncPromiseRef.current.then callback @ 98``

.. code-block:: javascript

   syncPromiseRef.current.then callback @ 98(items)

处理 ``syncPromiseRef.current.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``98``—``101`` 行；所属函数 ``useCallback callback @ 93``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``。

**主要协作调用**：``rememberBackgroundNotifications``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:4966:5403:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then callback @ 104``

.. code-block:: javascript

   apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then callback @ 104(response)

处理 ``apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``104``—``111`` 行；所属函数 ``useCallback callback @ 93``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``。

**主要协作调用**：``rememberBackgroundNotifications``、``mergeNotifications``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:5426:5534:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then((response) => { const items = response?.notifications \|\|… callback @ 112``

.. code-block:: javascript

   apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then((response) => { const items = response?.notifications ||… callback @ 112()

实现 ``apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT) .then((response) => { const items = response?.notifications \|\|…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``114`` 行；所属函数 ``useCallback callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:5708:6072:FUNCTION

.. rubric:: ``useCallback callback @ 119``

.. code-block:: javascript

   useCallback callback @ 119(notification)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``119``—``124`` 行；所属函数 ``NotificationHost``。

**参数**

``notification``
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(notification.actions \|\| []).find``、``onOpenConversation``、``dismissToast``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:5785:5828:FUNCTION

.. rubric:: ``(notification.actions \|\| []).find callback @ 120``

.. code-block:: javascript

   (notification.actions || []).find callback @ 120(item)

作为 ``(notification.actions \|\| []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``useCallback callback @ 119``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:6126:7027:FUNCTION

.. rubric:: ``useEffect callback @ 126``

.. code-block:: javascript

   useEffect callback @ 126()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``126``—``147`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { active = false; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN…``、``Promise.all``、``apiClient.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:6337:6810:FUNCTION

.. rubric:: ``Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN… callback @ 131``

.. code-block:: javascript

   Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN… callback @ 131([typeResponse, pendingResponse])

实现 ``Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``141`` 行；所属函数 ``useEffect callback @ 126``。

**参数**

``[typeResponse, pendingResponse]``
   调用方传入的 ``typeResponse, pendingResponse`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTypes``、``rememberBackgroundNotifications``、``mergeNotifications``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:6818:6977:FUNCTION

.. rubric:: ``Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN… callback @ 141``

.. code-block:: javascript

   Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN… callback @ 141(error)

实现 ``Promise.all([ apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT), apiClient.get(apiEndpoint.NOTIFICATION_PENDING_EN…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``145`` 行；所属函数 ``useEffect callback @ 126``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isAuthRedirectError``、``console.warn``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:6994:7020:FUNCTION

.. rubric:: ``returned callback @ 146``

.. code-block:: javascript

   returned callback @ 146()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``useEffect callback @ 126``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:7110:8615:FUNCTION

.. rubric:: ``useEffect callback @ 149``

.. code-block:: javascript

   useEffect callback @ 149()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``179`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'notification.*'}).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:7186:8571:FUNCTION

.. rubric:: ``onEvent({event: 'notification.*'}).then callback @ 150``

.. code-block:: javascript

   onEvent({event: 'notification.*'}).then callback @ 150({event, payload})

处理 ``onEvent({event: 'notification.*'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``150``—``177`` 行；所属函数 ``useEffect callback @ 149``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rememberBackgroundNotifications``、``upsertNotification``、``hiddenRevisionRef.current.delete``、``backgroundRevisionRef.current.delete``、``hideToast``、``resolveNotification``、``removeNotification``、``replaceNotifications``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:8588:8608:FUNCTION

.. rubric:: ``returned callback @ 178``

.. code-block:: javascript

   returned callback @ 178()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``178``—``178`` 行；所属函数 ``useEffect callback @ 149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:8817:9175:FUNCTION

.. rubric:: ``useEffect callback @ 188``

.. code-block:: javascript

   useEffect callback @ 188()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``188``—``195`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'transport.connected'}).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:8898:9131:FUNCTION

.. rubric:: ``onEvent({event: 'transport.connected'}).then callback @ 189``

.. code-block:: javascript

   onEvent({event: 'transport.connected'}).then callback @ 189()

处理 ``onEvent({event: 'transport.connected'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``189``—``193`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``syncPendingNotifications({backgroundSince: hiddenSinceRef.current}).catch``、``syncPendingNotifications``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:8992:9119:FUNCTION

.. rubric:: ``syncPendingNotifications({backgroundSince: hiddenSinceRef.current}).catch callback @ 190``

.. code-block:: javascript

   syncPendingNotifications({backgroundSince: hiddenSinceRef.current}).catch callback @ 190(error)

处理 ``syncPendingNotifications({backgroundSince: hiddenSinceRef.current}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``190``—``192`` 行；所属函数 ``onEvent({event: 'transport.connected'}).then callback @ 189``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:9148:9168:FUNCTION

.. rubric:: ``returned callback @ 194``

.. code-block:: javascript

   returned callback @ 194()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``194``—``194`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:9221:9626:FUNCTION

.. rubric:: ``useEffect callback @ 197``

.. code-block:: javascript

   useEffect callback @ 197()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``197``—``205`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('notification-subscriptions-changed', handleChange); window.removeEventListener('storage', handleChange); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:9257:9285:FUNCTION

.. rubric:: ``handleChange``

.. code-block:: javascript

   handleChange()

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``198``—``198`` 行；所属函数 ``useEffect callback @ 197``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reloadSubscriptions``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:9444:9619:FUNCTION

.. rubric:: ``returned callback @ 201``

.. code-block:: javascript

   returned callback @ 201()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``201``—``204`` 行；所属函数 ``useEffect callback @ 197``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:9667:11301:FUNCTION

.. rubric:: ``useEffect callback @ 207``

.. code-block:: javascript

   useEffect callback @ 207()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``207``—``242`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { document.removeEventListener('visibilitychange', handleVisibility); window.removeEventListener('focus', handleFocus); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``、``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:9707:10721:FUNCTION

.. rubric:: ``handleVisibility``

.. code-block:: javascript

   handleVisibility()

处理 ``Visibility`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``208``—``229`` 行；所属函数 ``useEffect callback @ 207``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setVisibilityState``、``Date.now``、``Object.values(useNotificationStore.getState().notifications) .filter((item) => item?.id) .map``、``Object.values(useNotificationStore.getState().notifications) .filter``、``Object.values``、``useNotificationStore.getState``、``reloadSubscriptions``、``syncPendingNotifications({backgroundSince, backgroundBaseline}).catch``、``syncPendingNotifications``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:10084:10102:FUNCTION

.. rubric:: ``Object.values(useNotificationStore.getState().notifications) .filter callback @ 215``

.. code-block:: javascript

   Object.values(useNotificationStore.getState().notifications) .filter callback @ 215(item)

作为 ``Object.values(useNotificationStore.getState().notifications) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``handleVisibility``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:10133:10180:FUNCTION

.. rubric:: ``Object.values(useNotificationStore.getState().notifications) .filter((item) => item?.id) .map callback @ 216``

.. code-block:: javascript

   Object.values(useNotificationStore.getState().notifications) .filter((item) => item?.id) .map callback @ 216(item)

作为 ``Object.values(useNotificationStore.getState().notifications) .filter((item) => item?.id) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``handleVisibility``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:10578:10709:FUNCTION

.. rubric:: ``syncPendingNotifications({backgroundSince, backgroundBaseline}).catch callback @ 226``

.. code-block:: javascript

   syncPendingNotifications({backgroundSince, backgroundBaseline}).catch callback @ 226(error)

处理 ``syncPendingNotifications({backgroundSince, backgroundBaseline}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``226``—``228`` 行；所属函数 ``handleVisibility``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:10750:10990:FUNCTION

.. rubric:: ``handleFocus``

.. code-block:: javascript

   handleFocus()

处理 ``Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``230``—``235`` 行；所属函数 ``useEffect callback @ 207``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``syncPendingNotifications().catch``、``syncPendingNotifications``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:10868:10978:FUNCTION

.. rubric:: ``syncPendingNotifications().catch callback @ 232``

.. code-block:: javascript

   syncPendingNotifications().catch callback @ 232(error)

处理 ``syncPendingNotifications().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``232``—``234`` 行；所属函数 ``handleFocus``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:11134:11294:FUNCTION

.. rubric:: ``returned callback @ 238``

.. code-block:: javascript

   returned callback @ 238()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``241`` 行；所属函数 ``useEffect callback @ 207``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:11368:13694:FUNCTION

.. rubric:: ``useEffect callback @ 244``

.. code-block:: javascript

   useEffect callback @ 244()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``244``—``294`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``notifications.map``、``shownRef.current.keys``、``liveIds.has``、``hideToast``、``Number``、``hiddenRevisionRef.current.get``、``backgroundRevisionRef.current.get``、``isToastEnabled``、``Boolean``、``shownRef.current.get``、``getNotificationRenderer``、``shownRef.current.set``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:11426:11443:FUNCTION

.. rubric:: ``notifications.map callback @ 245``

.. code-block:: javascript

   notifications.map callback @ 245(item)

作为 ``notifications.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``245``—``245`` 行；所属函数 ``useEffect callback @ 244``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:13107:13414:FUNCTION

.. rubric:: ``toast.custom callback @ 280``

.. code-block:: javascript

   toast.custom callback @ 280()

实现 ``toast.custom`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``280``—``287`` 行；所属函数 ``useEffect callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:13253:13289:FUNCTION

.. rubric:: ``onOpen callback @ 284``

.. code-block:: javascript

   onOpen callback @ 284()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``284``—``284`` 行；所属函数 ``toast.custom callback @ 280``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openNotification``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:13322:13380:FUNCTION

.. rubric:: ``onDismiss callback @ 285``

.. code-block:: javascript

   onDismiss callback @ 285()

处理 ``Dismiss`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``285``—``285`` 行；所属函数 ``toast.custom callback @ 280``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dismissToast``。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:13963:14858:FUNCTION

.. rubric:: ``useEffect callback @ 307``

.. code-block:: javascript

   useEffect callback @ 307()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``307``—``329`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (visibilityState === 'visible') document.title = baseTitle; }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``notifications.filter``、``Promise.resolve(navigator.setAppBadge(attentionCount)).catch``、``Promise.resolve``、``navigator.setAppBadge``、``Promise.resolve(navigator.clearAppBadge()).catch``、``navigator.clearAppBadge``、``console.debug``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:14471:14479:FUNCTION

.. rubric:: ``Promise.resolve(navigator.setAppBadge(attentionCount)).catch callback @ 318``

.. code-block:: javascript

   Promise.resolve(navigator.setAppBadge(attentionCount)).catch callback @ 318()

处理 ``Promise.resolve(navigator.setAppBadge(attentionCount)).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``318``—``318`` 行；所属函数 ``useEffect callback @ 307``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:14619:14627:FUNCTION

.. rubric:: ``Promise.resolve(navigator.clearAppBadge()).catch callback @ 320``

.. code-block:: javascript

   Promise.resolve(navigator.clearAppBadge()).catch callback @ 320()

处理 ``Promise.resolve(navigator.clearAppBadge()).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``useEffect callback @ 307``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:14758:14851:FUNCTION

.. rubric:: ``returned callback @ 326``

.. code-block:: javascript

   returned callback @ 326()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``326``—``328`` 行；所属函数 ``useEffect callback @ 307``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:14926:15135:FUNCTION

.. rubric:: ``useEffect callback @ 331``

.. code-block:: javascript

   useEffect callback @ 331()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``331``—``336`` 行；所属函数 ``NotificationHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:14931:15135:FUNCTION

.. rubric:: ``anonymous callback @ 331``

.. code-block:: javascript

   anonymous callback @ 331()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``331``—``336`` 行；所属函数 ``useEffect callback @ 331``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Promise.resolve(navigator.clearAppBadge()).catch``、``Promise.resolve``、``navigator.clearAppBadge``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationHost.jsx:15109:15117:FUNCTION

.. rubric:: ``Promise.resolve(navigator.clearAppBadge()).catch callback @ 334``

.. code-block:: javascript

   Promise.resolve(navigator.clearAppBadge()).catch callback @ 334()

处理 ``Promise.resolve(navigator.clearAppBadge()).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``anonymous callback @ 331``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
