src/features/notification/NotificationSettings 模块
==========================================================================================================

.. js:module:: src/features/notification/NotificationSettings

该模块实现通知订阅、展示与用户操作。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/notification/NotificationSettings.jsx``
* **模块标识**：``src/features/notification/NotificationSettings``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：20

主要依赖
--------------------------------------------------------------------------------

``./systemNotifications.js``、``@/components/ui/button``、``react``、``lucide-react``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/switch``、``./useNotificationStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:535:8765:FUNCTION

.. js:function:: NotificationSettings()

   渲染 ``NotificationSettings`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``182`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="max-w-3xl mx-auto"> <div className="mb-5"> <div className="flex items-center gap-2 text-lg font-semibold text-gray-900"> <Bell className="h-5 w-5 text-blue-600"…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useNotificationStore``、``useState``、``useEffect``、``useMemo``、``Object.keys``、``Object.entries(groups).map``、``Object.entries``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:583:605:FUNCTION

.. rubric:: ``useNotificationStore callback @ 15``

.. code-block:: javascript

   useNotificationStore callback @ 15(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:655:685:FUNCTION

.. rubric:: ``useNotificationStore callback @ 16``

.. code-block:: javascript

   useNotificationStore callback @ 16(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:730:755:FUNCTION

.. rubric:: ``useNotificationStore callback @ 17``

.. code-block:: javascript

   useNotificationStore callback @ 17(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:807:839:FUNCTION

.. rubric:: ``useNotificationStore callback @ 18``

.. code-block:: javascript

   useNotificationStore callback @ 18(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:990:1390:FUNCTION

.. rubric:: ``useEffect callback @ 21``

.. code-block:: javascript

   useEffect callback @ 21()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``29`` 行；所属函数 ``NotificationSettings``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('focus', refresh); window.removeEventListener('system-notification-settings-changed', refresh); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1021:1069:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``useEffect callback @ 21``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSystemState``、``systemNotificationState``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1218:1383:FUNCTION

.. rubric:: ``returned callback @ 25``

.. code-block:: javascript

   returned callback @ 25()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``28`` 行；所属函数 ``useEffect callback @ 21``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1520:2018:FUNCTION

.. rubric:: ``useEffect callback @ 33``

.. code-block:: javascript

   useEffect callback @ 33()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``33``—``47`` 行；所属函数 ``NotificationSettings``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { active = false; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || […``、``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then``、``apiClient .get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1713:1803:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then callback @ 39``

.. code-block:: javascript

   apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then callback @ 39(response)

处理 ``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``39``—``41`` 行；所属函数 ``useEffect callback @ 33``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTypes``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1824:1892:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || [… callback @ 42``

.. code-block:: javascript

   apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || [… callback @ 42(error)

实现 ``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || […`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``useEffect callback @ 33``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1915:1948:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || [… callback @ 43``

.. code-block:: javascript

   apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || [… callback @ 43()

实现 ``apiClient .get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || […`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``useEffect callback @ 33``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1965:2011:FUNCTION

.. rubric:: ``returned callback @ 44``

.. code-block:: javascript

   returned callback @ 44()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``46`` 行；所属函数 ``useEffect callback @ 33``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:2075:2573:FUNCTION

.. rubric:: ``useMemo callback @ 49``

.. code-block:: javascript

   useMemo callback @ 49()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``60`` 行；所属函数 ``NotificationSettings``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``grouped``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``\x60${item.name || ''} ${item.typeId || ''} ${item.description || ''}\x60.toLowerCase``、``haystack.includes``、``grouped[category].push``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:2614:2775:FUNCTION

.. rubric:: ``isEnabled``

.. code-block:: javascript

   isEnabled(item)

判断与 ``Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``NotificationSettings``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'boolean' ? value : item.defaultSubscribed !== false``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:4286:4875:FUNCTION

.. rubric:: ``onCheckedChange callback @ 95``

.. code-block:: javascript

   async onCheckedChange callback @ 95(enabled)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``95``—``107`` 行；所属函数 ``NotificationSettings``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSystemNotificationsEnabled``、``setRequesting``、``requestSystemNotificationPermission``、``setSystemState``、``systemNotificationState``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:5137:5503:FUNCTION

.. rubric:: ``onClick callback @ 114``

.. code-block:: javascript

   async onClick callback @ 114()

处理 ``Click`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``114``—``122`` 行；所属函数 ``NotificationSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRequesting``、``requestSystemNotificationPermission``、``setSystemState``、``systemNotificationState``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:5860:5899:FUNCTION

.. rubric:: ``onChange callback @ 131``

.. code-block:: javascript

   onChange callback @ 131(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``NotificationSettings``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:6611:8701:FUNCTION

.. rubric:: ``Object.entries(groups).map callback @ 144``

.. code-block:: javascript

   Object.entries(groups).map callback @ 144([category, items])

作为 ``Object.entries(groups).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``144``—``177`` 行；所属函数 ``NotificationSettings``。

**参数**

``[category, items]``
   调用方传入的 ``category, items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:7022:8607:FUNCTION

.. rubric:: ``items.map callback @ 150``

.. code-block:: javascript

   items.map callback @ 150(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``174`` 行；所属函数 ``Object.entries(groups).map callback @ 144``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isEnabled``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:8261:8370:FUNCTION

.. rubric:: ``onCheckedChange callback @ 168``

.. code-block:: javascript

   onCheckedChange callback @ 168(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``168``—``169`` 行；所属函数 ``items.map callback @ 150``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubscription``。
