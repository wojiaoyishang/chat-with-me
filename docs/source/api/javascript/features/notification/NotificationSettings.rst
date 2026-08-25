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
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/switch``、``./useNotificationStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:327:4953:FUNCTION

.. js:function:: NotificationSettings()

   渲染 ``NotificationSettings`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``96`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="max-w-3xl mx-auto"> <div className="mb-5"> <div className="flex items-center gap-2 text-lg font-semibold text-gray-900"> <Bell className="h-5 w-5 text-blue-600"/…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useNotificationStore``、``useState``、``useEffect``、``useMemo``、``Object.keys``、``Object.entries(groups).map``、``Object.entries``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:375:397:FUNCTION

.. rubric:: ``useNotificationStore callback @ 9``

.. code-block:: javascript

   useNotificationStore callback @ 9(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``9``—``9`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:447:477:FUNCTION

.. rubric:: ``useNotificationStore callback @ 10``

.. code-block:: javascript

   useNotificationStore callback @ 10(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:522:547:FUNCTION

.. rubric:: ``useNotificationStore callback @ 11``

.. code-block:: javascript

   useNotificationStore callback @ 11(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:599:631:FUNCTION

.. rubric:: ``useNotificationStore callback @ 12``

.. code-block:: javascript

   useNotificationStore callback @ 12(state)

封装 ``NotificationStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``NotificationSettings``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:757:1222:FUNCTION

.. rubric:: ``useEffect callback @ 16``

.. code-block:: javascript

   useEffect callback @ 16()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``27`` 行；所属函数 ``NotificationSettings``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { active = false; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []…``、``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then``、``apiClient.get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:937:1027:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then callback @ 21``

.. code-block:: javascript

   apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then callback @ 21(response)

处理 ``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``21``—``23`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTypes``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1048:1116:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []… callback @ 24``

.. code-block:: javascript

   apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []… callback @ 24(error)

实现 ``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1139:1172:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []… callback @ 25``

.. code-block:: javascript

   apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []… callback @ 25()

实现 ``apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT) .then((response) => { if (active) setTypes(response?.types || []…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1189:1215:FUNCTION

.. rubric:: ``returned callback @ 26``

.. code-block:: javascript

   returned callback @ 26()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1279:1777:FUNCTION

.. rubric:: ``useMemo callback @ 29``

.. code-block:: javascript

   useMemo callback @ 29()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``40`` 行；所属函数 ``NotificationSettings``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``grouped``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``\x60${item.name || ''} ${item.typeId || ''} ${item.description || ''}\x60.toLowerCase``、``haystack.includes``、``grouped[category].push``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:1818:1979:FUNCTION

.. rubric:: ``isEnabled``

.. code-block:: javascript

   isEnabled(item)

判断与 ``Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``42``—``45`` 行；所属函数 ``NotificationSettings``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'boolean' ? value : item.defaultSubscribed !== false``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:2642:2681:FUNCTION

.. rubric:: ``onChange callback @ 60``

.. code-block:: javascript

   onChange callback @ 60(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``NotificationSettings``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:3355:4889:FUNCTION

.. rubric:: ``Object.entries(groups).map callback @ 71``

.. code-block:: javascript

   Object.entries(groups).map callback @ 71([category, items])

作为 ``Object.entries(groups).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``71``—``91`` 行；所属函数 ``NotificationSettings``。

**参数**

``[category, items]``
   调用方传入的 ``category, items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:3704:4795:FUNCTION

.. rubric:: ``items.map callback @ 75``

.. code-block:: javascript

   items.map callback @ 75(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``88`` 行；所属函数 ``Object.entries(groups).map callback @ 71``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isEnabled``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/notification/NotificationSettings.jsx:4544:4603:FUNCTION

.. rubric:: ``onCheckedChange callback @ 84``

.. code-block:: javascript

   onCheckedChange callback @ 84(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``items.map callback @ 75``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubscription``。
