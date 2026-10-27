src/features/notification/useNotificationStore 模块
==========================================================================================================

.. js:module:: src/features/notification/useNotificationStore

该模块实现通知订阅、展示与用户操作。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/notification/useNotificationStore.js``
* **模块标识**：``src/features/notification/useNotificationStore``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：17

主要依赖
--------------------------------------------------------------------------------

``zustand``、``@/lib/tools.jsx``、``../../runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:275:435:FUNCTION

.. js:function:: readSubscriptions()

   实现 ``readSubscriptions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``10`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value && typeof value === 'object' ? value : {}``。

   **主要协作调用**：``getLocalSetting``、``backendStorageKey``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:467:571:FUNCTION

.. js:function:: normalizeNotification(notification)

   规范化与 ``Notification`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``15`` 行。

   **参数**

   ``notification``
      调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:617:4746:FUNCTION

.. rubric:: ``create callback @ 17``

.. code-block:: javascript

   create callback @ 17(set, get)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``17``—``116`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``get``
   调用方传入的 ``get`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``readSubscriptions``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:753:812:FUNCTION

.. rubric:: ``setTypes``

.. code-block:: javascript

   setTypes(types)

设置与 ``Types`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``create callback @ 17``。

**参数**

``types``
   调用方传入的 ``types`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:840:1359:FUNCTION

.. rubric:: ``replaceNotifications``

.. code-block:: javascript

   replaceNotifications(notifications)

替换与 ``Notifications`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``25``—``35`` 行；所属函数 ``create callback @ 17``。

**参数**

``notifications``
   调用方传入的 ``notifications`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:864:1358:FUNCTION

.. rubric:: ``set callback @ 25``

.. code-block:: javascript

   set callback @ 25(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``25``—``35`` 行；所属函数 ``replaceNotifications``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{notifications: next}``。

**主要协作调用**：``normalizeNotification``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:1385:2043:FUNCTION

.. rubric:: ``mergeNotifications``

.. code-block:: javascript

   mergeNotifications(notifications)

合并与 ``Notifications`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``37``—``48`` 行；所属函数 ``create callback @ 17``。

**参数**

``notifications``
   调用方传入的 ``notifications`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:1409:2042:FUNCTION

.. rubric:: ``set callback @ 37``

.. code-block:: javascript

   set callback @ 37(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``37``—``48`` 行；所属函数 ``mergeNotifications``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{notifications: next}``。

**主要协作调用**：``normalizeNotification``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2069:2604:FUNCTION

.. rubric:: ``upsertNotification``

.. code-block:: javascript

   upsertNotification(notification)

实现 ``upsertNotification`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``58`` 行；所属函数 ``create callback @ 17``。

**参数**

``notification``
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2092:2603:FUNCTION

.. rubric:: ``set callback @ 50``

.. code-block:: javascript

   set callback @ 50(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``50``—``58`` 行；所属函数 ``upsertNotification``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{notifications: {...state.notifications, [notification.id]: incoming}}``。

**主要协作调用**：``normalizeNotification``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2631:3344:FUNCTION

.. rubric:: ``resolveNotification``

.. code-block:: javascript

   resolveNotification(notificationId, revision)

解析并确定与 ``Notification`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``77`` 行；所属函数 ``create callback @ 17``。

**参数**

``notificationId``
   目标对象的公共或运行时标识。

``revision`` （默认值 ``0``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2670:3343:FUNCTION

.. rubric:: ``set callback @ 60``

.. code-block:: javascript

   set callback @ 60(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``77`` 行；所属函数 ``resolveNotification``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ notifications: next, resolvedRevisions: { ...state.resolvedRevisions, [notificationId]: Math.max( incomingRevision, Number(state.resolvedRevisions[notificationId] || 0), ), }, }``。

**主要协作调用**：``Number``、``Math.max``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:3370:3845:FUNCTION

.. rubric:: ``removeNotification``

.. code-block:: javascript

   removeNotification(notificationId, revision)

移除与 ``Notification`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``79``—``92`` 行；所属函数 ``create callback @ 17``。

**参数**

``notificationId``
   目标对象的公共或运行时标识。

``revision`` （默认值 ``0``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:3409:3844:FUNCTION

.. rubric:: ``set callback @ 79``

.. code-block:: javascript

   set callback @ 79(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``79``—``92`` 行；所属函数 ``removeNotification``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ notifications: next, resolvedRevisions: { ...state.resolvedRevisions, [notificationId]: Math.max( Number(revision || 0), Number(state.resolvedRevisions[notificationId] || 0), ),…``。

**主要协作调用**：``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:3868:4352:FUNCTION

.. rubric:: ``setSubscription``

.. code-block:: javascript

   setSubscription(typeId, patch)

设置与 ``Subscription`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``94``—``105`` 行；所属函数 ``create callback @ 17``。

**参数**

``typeId``
   目标对象的公共或运行时标识。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:3892:4351:FUNCTION

.. rubric:: ``set callback @ 94``

.. code-block:: javascript

   set callback @ 94(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``94``—``105`` 行；所属函数 ``setSubscription``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{subscriptions}``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLocalSetting``、``backendStorageKey``、``window.dispatchEvent``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4379:4427:FUNCTION

.. rubric:: ``reloadSubscriptions``

.. code-block:: javascript

   reloadSubscriptions()

实现 ``reloadSubscriptions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``create callback @ 17``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``、``readSubscriptions``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4449:4742:FUNCTION

.. rubric:: ``isToastEnabled``

.. code-block:: javascript

   isToastEnabled(typeId)

判断与 ``Toast Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``109``—``115`` 行；所属函数 ``create callback @ 17``。

**参数**

``typeId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``explicit``、``spec?.defaultSubscribed !== false``。

**主要协作调用**：``get``、``state.types.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4652:4684:FUNCTION

.. rubric:: ``state.types.find callback @ 113``

.. code-block:: javascript

   state.types.find callback @ 113(item)

作为 ``state.types.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``isToastEnabled``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
