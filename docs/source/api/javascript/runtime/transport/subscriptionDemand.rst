src/runtime/transport/subscriptionDemand 模块
==============================================================================================

.. js:module:: src/runtime/transport/subscriptionDemand

Mirror incoming listener scope; local/outgoing-only listeners need no server feed.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/transport/subscriptionDemand.js``
* **模块标识**：``src/runtime/transport/subscriptionDemand``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：8

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:219:370:FUNCTION

.. js:function:: notify()

   实现 ``notify`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``11`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``queueMicrotask``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:405:476:FUNCTION

.. js:function:: hasRealtimeDemand()

   实现 ``hasRealtimeDemand`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``13``—``13`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...routes.values()].some``、``routes.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:516:598:FUNCTION

.. js:function:: subscribeRealtimeDemand(callback)

   订阅与 ``Realtime Demand`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``14``—``14`` 行。

   **参数**

   ``callback``
      状态变化、事件到达或操作完成时执行的回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => listeners.delete(callback)``。

   **主要协作调用**：``listeners.add``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:636:1629:FUNCTION

.. js:function:: realtimeSubscriptions()

   实现 ``realtimeSubscriptions`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``15``—``31`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result.length <= 512 ? result : [{events: ['*']}]``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``routes.values``、``JSON.stringify``、``groups.has``、``groups.set``、``groups.get(key).events.add``、``groups.get``、``[...groups.values()].flatMap``、``groups.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:1630:2224:FUNCTION

.. js:function:: registerRealtimeSubscription(id, registration, keepAlive)

   Mirror incoming listener scope; local/outgoing-only listeners need no server feed.

   **性质**：同步函数；导出 API；源码第 ``34``—``41`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``registration``
      调用方传入的 ``registration`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``keepAlive``
      调用方传入的 ``keepAlive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => { routes.delete(id); notify(); }``。

   **主要协作调用**：``registration.directions.has``、``routes.set``、``notify``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:2224:2560:FUNCTION

.. js:function:: requestRealtimeConnection()

   A command can open the connection before any view has registered a listener.

   **性质**：同步函数；导出 API；源码第 ``44``—``50`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``clearTimeout``、``setTimeout``、``transientTimer.unref``、``notify``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:290:366:FUNCTION

.. rubric:: ``queueMicrotask callback @ 10``

.. code-block:: javascript

   queueMicrotask callback @ 10()

实现 ``queueMicrotask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``notify``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listener``。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:451:475:FUNCTION

.. rubric:: ``[...routes.values()].some callback @ 13``

.. code-block:: javascript

   [...routes.values()].some callback @ 13(route)

作为 ``[...routes.values()].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``hasRealtimeDemand``。

**参数**

``route``
   调用方传入的 ``route`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:562:595:FUNCTION

.. rubric:: ``returned callback @ 14``

.. code-block:: javascript

   returned callback @ 14()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``subscribeRealtimeDemand``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:1183:1410:FUNCTION

.. rubric:: ``[...groups.values()].flatMap callback @ 23``

.. code-block:: javascript

   [...groups.values()].flatMap callback @ 23({events, ...scope})

实现 ``[...groups.values()].flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``27`` 行；所属函数 ``realtimeSubscriptions``。

**参数**

``{events, ...scope}``
   调用方传入的 ``events, ...scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Array.from({length: Math.ceil(names.length / 128)}, (_, index) => ({...scope, events: names.slice(index * 128, (index + 1) * 128)}))``。

**主要协作调用**：``Array.from``、``Math.ceil``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:1310:1402:FUNCTION

.. rubric:: ``Array.from callback @ 25``

.. code-block:: javascript

   Array.from callback @ 25(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``26`` 行；所属函数 ``[...groups.values()].flatMap callback @ 23``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``names.slice``。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:1881:1890:FUNCTION

.. rubric:: ``returned callback @ 35``

.. code-block:: javascript

   returned callback @ 35()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``registerRealtimeSubscription``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:2182:2221:FUNCTION

.. rubric:: ``returned callback @ 40``

.. code-block:: javascript

   returned callback @ 40()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``registerRealtimeSubscription``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``routes.delete``、``notify``。

.. CWM-AST-FUNCTION src/runtime/transport/subscriptionDemand.js:2444:2505:FUNCTION

.. rubric:: ``setTimeout callback @ 47``

.. code-block:: javascript

   setTimeout callback @ 47()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``requestRealtimeConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``notify``。
