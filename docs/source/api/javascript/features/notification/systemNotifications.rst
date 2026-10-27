src/features/notification/systemNotifications 模块
========================================================================================================

.. js:module:: src/features/notification/systemNotifications

该模块实现通知订阅、展示与用户操作。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/notification/systemNotifications.js``
* **模块标识**：``src/features/notification/systemNotifications``
* **顶层函数/组件/Hook**：9
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``sonner``、``@/lib/tools.jsx``、``../../runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:639:725:FUNCTION

.. js:function:: permission()

   实现 ``permission`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``13`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:765:882:FUNCTION

.. js:function:: systemNotificationState()

   实现 ``systemNotificationState`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``14``—``17`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``permission``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:928:1090:FUNCTION

.. js:function:: setSystemNotificationsEnabled(enabled)

   设置与 ``System Notifications Enabled`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``18``—``21`` 行。

   **参数**

   ``enabled``
      调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``setLocalSetting``、``Boolean``、``window.dispatchEvent``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:1142:2381:FUNCTION

.. js:function:: requestSystemNotificationPermission({ automatic = false })

   实现 ``requestSystemNotificationPermission`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``22``—``50`` 行。

   **参数**

   ``{ automatic = false }`` （默认值 ``{}``）
      调用方传入的 ``automatic = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``permissionRequest``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``(async () => { if (permission() === 'unsupported') return 'unsupported'; if (permission() === 'default' && (!automatic…``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:2429:2933:FUNCTION

.. js:function:: isNotificationConversationOpen(conversationId)

   判断与 ``Notification Conversation Open`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``52``—``64`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``Array.from(document.querySelectorAll('[data-notification-conversation-id]')).some((element) => { const rect = element.getBoundingClientRect(); return ( element.dataset.notificatio…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``Array.from(document.querySelectorAll('[data-notification-conversation-id]')).some``、``Array.from``、``document.querySelectorAll``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:2977:3196:FUNCTION

.. js:function:: updateNotificationPresence(state)

   更新与 ``Notification Presence`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``66``—``72`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``localStorage.setItem``、``backendStorageKey``、``JSON.stringify``、``Date.now``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:3239:3430:FUNCTION

.. js:function:: removeNotificationPresence()

   移除与 ``Notification Presence`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``73``—``79`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``localStorage.removeItem``、``backendStorageKey``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:3475:3968:FUNCTION

.. js:function:: hasForegroundNotificationTab()

   实现 ``hasForegroundNotificationTab`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``80``—``95`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.keys(localStorage) .filter((key) => key.startsWith(backendStorageKey(PRESENCE))) .some((key) => { try { const value = JSON.parse(localStorage.getItem(key)); return Date.now…``、``false``。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``Object.keys(localStorage) .filter((key) => key.startsWith(backendStorageKey(PRESENCE))) .some``、``Object.keys(localStorage) .filter``、``Object.keys``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:4014:6906:FUNCTION

.. js:function:: showWidgetSystemNotification(notification, onOpen)

   实现 ``showWidgetSystemNotification`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``97``—``156`` 行。

   **参数**

   ``notification``
      调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``onOpen``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``navigator.locks.request(\x60widget-notification:${notification.id}\x60, present)``、``present()``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``hasForegroundNotificationTab``、``systemNotificationState``、``navigator.locks.request``、``present``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:1261:2288:FUNCTION

.. rubric:: ``anonymous callback @ 24``

.. code-block:: javascript

   async anonymous callback @ 24()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``24``—``46`` 行；所属函数 ``requestSystemNotificationPermission``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``'unsupported'``、``result``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``permission``、``getLocalSetting``、``setLocalSetting``、``Notification.requestPermission``、``toast.warning``、``toast.info``、``setSystemNotificationsEnabled``、``window.dispatchEvent``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:2300:2347:FUNCTION

.. rubric:: ``(async () => { if (permission() === 'unsupported') return 'unsupported'; if (permission() === 'default' && (!automatic… callback @ 46``

.. code-block:: javascript

   (async () => { if (permission() === 'unsupported') return 'unsupported'; if (permission() === 'default' && (!automatic… callback @ 46()

实现 ``(async () => { if (permission() === 'unsupported') return 'unsupported'; if (permission() === 'default' && (!automatic…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``48`` 行；所属函数 ``requestSystemNotificationPermission``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:2584:2929:FUNCTION

.. rubric:: ``Array.from(document.querySelectorAll('[data-notification-conversation-id]')).some callback @ 54``

.. code-block:: javascript

   Array.from(document.querySelectorAll('[data-notification-conversation-id]')).some callback @ 54(element)

作为 ``Array.from(document.querySelectorAll('[data-notification-conversation-id]')).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``63`` 行；所属函数 ``isNotificationConversationOpen``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( element.dataset.notificationConversationId === conversationId && rect.width > 0 && rect.height > 0 && !element.closest('[inert]') && getComputedStyle(element).visibility !== 'hi…``。

**主要协作调用**：``element.getBoundingClientRect``、``element.closest``、``getComputedStyle``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:3555:3607:FUNCTION

.. rubric:: ``Object.keys(localStorage) .filter callback @ 83``

.. code-block:: javascript

   Object.keys(localStorage) .filter callback @ 83(key)

作为 ``Object.keys(localStorage) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``hasForegroundNotificationTab``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``key.startsWith``、``backendStorageKey``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:3627:3922:FUNCTION

.. rubric:: ``Object.keys(localStorage) .filter((key) => key.startsWith(backendStorageKey(PRESENCE))) .some callback @ 84``

.. code-block:: javascript

   Object.keys(localStorage) .filter((key) => key.startsWith(backendStorageKey(PRESENCE))) .some callback @ 84(key)

作为 ``Object.keys(localStorage) .filter((key) => key.startsWith(backendStorageKey(PRESENCE))) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``91`` 行；所属函数 ``hasForegroundNotificationTab``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Date.now() - value.updatedAt < 6000 && value.visible && value.focused``、``false``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``JSON.parse``、``localStorage.getItem``、``Date.now``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:4239:6764:FUNCTION

.. rubric:: ``present``

.. code-block:: javascript

   async present()

实现 ``present`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``101``—``153`` 行；所属函数 ``showWidgetSystemNotification``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getLocalSetting``、``backendStorageKey``、``Number``、``hasForegroundNotificationTab``、``encodeURIComponent``、``target.searchParams.set``、``getBackendConnection``、``navigator.serviceWorker.register``、``Promise.race``、``registration.showNotification``、``Object.entries({ ...delivered, [notification.id]: notification.revision }).slice``、``Object.entries``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:5520:5635:FUNCTION

.. rubric:: ``anonymous callback @ 124``

.. code-block:: javascript

   anonymous callback @ 124(_, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``124``—``125`` 行；所属函数 ``present``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:5574:5628:FUNCTION

.. rubric:: ``setTimeout callback @ 125``

.. code-block:: javascript

   setTimeout callback @ 125()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``anonymous callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reject``。

.. CWM-AST-FUNCTION src/features/notification/systemNotifications.js:6320:6460:FUNCTION

.. rubric:: ``anonymous callback @ 141``

.. code-block:: javascript

   anonymous callback @ 141()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``145`` 行；所属函数 ``present``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.focus``、``onOpen``、``native.close``。
