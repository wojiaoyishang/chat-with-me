src/runtime/transport/EventDispatchScheduler 模块
======================================================================================================

.. js:module:: src/runtime/transport/EventDispatchScheduler

Schedule one incoming semantic event callback without discarding any lane. FIFO is preserved inside each lane; fair scheduling prevents stream deltas from starving user interactions or control replies.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/transport/EventDispatchScheduler.js``
* **模块标识**：``src/runtime/transport/EventDispatchScheduler``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:555:607:FUNCTION

.. js:function:: now()

   实现 ``now`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``29`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``globalThis.performance?.now``、``Date.now``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:631:1075:FUNCTION

.. js:function:: classifyEvent(event, replyTo)

   实现 ``classifyEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``39`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``replyTo``（默认值 ``null``）
      调用方传入的 ``replyTo`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``LANE_CONTROL``、``LANE_STREAM``、``LANE_BACKGROUND``、``LANE_INTERACTION``。

   **主要协作调用**：``String``、``value.startsWith``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:1093:1519:FUNCTION

.. js:function:: popNext()

   实现 ``popNext`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``41``—``53`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``queue.shift()``、``null``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``queues.get``、``queue.shift``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:1833:1928:FUNCTION

.. js:function:: requestFlush()

   实现 ``requestFlush`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``66``—``70`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``postFlush``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:1928:2580:FUNCTION

.. js:function:: flush()

   实现 ``flush`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``90`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``now``、``popNext``、``job``、``console.error``、``requestFlush``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:2845:3245:FUNCTION

.. js:function:: scheduleIncomingEventCallback({event, replyTo = null, callback})

   实现 ``scheduleIncomingEventCallback`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``97``—``107`` 行。

   **参数**

   ``{event, replyTo = null, callback}``
      调用方传入的 ``event, replyTo = null, callback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``classifyEvent``、``queues.get(lane).push``、``queues.get``、``console.warn``、``requestFlush``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:3293:3528:FUNCTION

.. js:function:: getIncomingEventSchedulerStats()

   读取与 ``Incoming Event Scheduler Stats`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``109``—``115`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``queues.get``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:1653:1667:FUNCTION

.. rubric:: ``anonymous callback @ 58``

.. code-block:: javascript

   anonymous callback @ 58()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``58`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flush``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:1742:1777:FUNCTION

.. rubric:: ``anonymous callback @ 61``

.. code-block:: javascript

   anonymous callback @ 61()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``61`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``channel.port2.postMessage``。

.. CWM-AST-FUNCTION src/runtime/transport/EventDispatchScheduler.js:1803:1830:FUNCTION

.. rubric:: ``anonymous callback @ 63``

.. code-block:: javascript

   anonymous callback @ 63()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``63``—``63`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。
