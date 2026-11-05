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
* **局部函数与匿名回调**：19

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

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:617:4964:FUNCTION

.. rubric:: ``create callback @ 17``

.. code-block:: javascript

   create callback @ 17(set, get)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``17``—``121`` 行。

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

**内部回调数量**：10。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:772:955:FUNCTION

.. rubric:: ``bindOwner``

.. code-block:: javascript

   bindOwner(ownerKey)

实现 ``bindOwner`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``26`` 行；所属函数 ``create callback @ 17``。

**参数**

``ownerKey``
   调用方传入的 ``ownerKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:791:954:FUNCTION

.. rubric:: ``set callback @ 24``

.. code-block:: javascript

   set callback @ 24(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``24``—``26`` 行；所属函数 ``bindOwner``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readSubscriptions``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:971:1030:FUNCTION

.. rubric:: ``setTypes``

.. code-block:: javascript

   setTypes(types)

设置与 ``Types`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``create callback @ 17``。

**参数**

``types``
   调用方传入的 ``types`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:1058:1577:FUNCTION

.. rubric:: ``replaceNotifications``

.. code-block:: javascript

   replaceNotifications(notifications)

替换与 ``Notifications`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``30``—``40`` 行；所属函数 ``create callback @ 17``。

**参数**

``notifications``
   调用方传入的 ``notifications`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:1082:1576:FUNCTION

.. rubric:: ``set callback @ 30``

.. code-block:: javascript

   set callback @ 30(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``30``—``40`` 行；所属函数 ``replaceNotifications``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{notifications: next}``。

**主要协作调用**：``normalizeNotification``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:1603:2261:FUNCTION

.. rubric:: ``mergeNotifications``

.. code-block:: javascript

   mergeNotifications(notifications)

合并与 ``Notifications`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``42``—``53`` 行；所属函数 ``create callback @ 17``。

**参数**

``notifications``
   调用方传入的 ``notifications`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:1627:2260:FUNCTION

.. rubric:: ``set callback @ 42``

.. code-block:: javascript

   set callback @ 42(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``42``—``53`` 行；所属函数 ``mergeNotifications``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{notifications: next}``。

**主要协作调用**：``normalizeNotification``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2287:2822:FUNCTION

.. rubric:: ``upsertNotification``

.. code-block:: javascript

   upsertNotification(notification)

实现 ``upsertNotification`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``55``—``63`` 行；所属函数 ``create callback @ 17``。

**参数**

``notification``
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2310:2821:FUNCTION

.. rubric:: ``set callback @ 55``

.. code-block:: javascript

   set callback @ 55(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``55``—``63`` 行；所属函数 ``upsertNotification``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{notifications: {...state.notifications, [notification.id]: incoming}}``。

**主要协作调用**：``normalizeNotification``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2849:3562:FUNCTION

.. rubric:: ``resolveNotification``

.. code-block:: javascript

   resolveNotification(notificationId, revision)

解析并确定与 ``Notification`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``82`` 行；所属函数 ``create callback @ 17``。

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

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:2888:3561:FUNCTION

.. rubric:: ``set callback @ 65``

.. code-block:: javascript

   set callback @ 65(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``82`` 行；所属函数 ``resolveNotification``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ notifications: next, resolvedRevisions: { ...state.resolvedRevisions, [notificationId]: Math.max( incomingRevision, Number(state.resolvedRevisions[notificationId] || 0), ), }, }``。

**主要协作调用**：``Number``、``Math.max``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:3588:4063:FUNCTION

.. rubric:: ``removeNotification``

.. code-block:: javascript

   removeNotification(notificationId, revision)

移除与 ``Notification`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``84``—``97`` 行；所属函数 ``create callback @ 17``。

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

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:3627:4062:FUNCTION

.. rubric:: ``set callback @ 84``

.. code-block:: javascript

   set callback @ 84(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``84``—``97`` 行；所属函数 ``removeNotification``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ notifications: next, resolvedRevisions: { ...state.resolvedRevisions, [notificationId]: Math.max( Number(revision || 0), Number(state.resolvedRevisions[notificationId] || 0), ),…``。

**主要协作调用**：``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4086:4570:FUNCTION

.. rubric:: ``setSubscription``

.. code-block:: javascript

   setSubscription(typeId, patch)

设置与 ``Subscription`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``99``—``110`` 行；所属函数 ``create callback @ 17``。

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

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4110:4569:FUNCTION

.. rubric:: ``set callback @ 99``

.. code-block:: javascript

   set callback @ 99(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``99``—``110`` 行；所属函数 ``setSubscription``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{subscriptions}``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLocalSetting``、``backendStorageKey``、``window.dispatchEvent``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4597:4645:FUNCTION

.. rubric:: ``reloadSubscriptions``

.. code-block:: javascript

   reloadSubscriptions()

实现 ``reloadSubscriptions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``create callback @ 17``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``、``readSubscriptions``。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4667:4960:FUNCTION

.. rubric:: ``isToastEnabled``

.. code-block:: javascript

   isToastEnabled(typeId)

判断与 ``Toast Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``114``—``120`` 行；所属函数 ``create callback @ 17``。

**参数**

``typeId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``explicit``、``spec?.defaultSubscribed !== false``。

**主要协作调用**：``get``、``state.types.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/useNotificationStore.js:4870:4902:FUNCTION

.. rubric:: ``state.types.find callback @ 118``

.. code-block:: javascript

   state.types.find callback @ 118(item)

作为 ``state.types.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``isToastEnabled``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
