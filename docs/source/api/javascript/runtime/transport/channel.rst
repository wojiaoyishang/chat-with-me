src/runtime/transport/channel 模块
================================================================================

.. js:module:: src/runtime/transport/channel

该模块实现 WebSocket Transport、连接队列与二进制发送边界。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/transport/channel.js``
* **模块标识**：``src/runtime/transport/channel``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``../backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/transport/channel.js:254:378:FUNCTION

.. js:function:: setRealtimeTransport(transport)

   设置与 ``Realtime Transport`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``8``—``11`` 行。

   **参数**

   ``transport``
      调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getBackendConnection``。

.. CWM-AST-FUNCTION src/runtime/transport/channel.js:803:870:FUNCTION

.. js:function:: getRealtimeTransport()

   读取与 ``Realtime Transport`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``23``—``23`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/runtime/transport/channel.js:907:1223:FUNCTION

.. js:function:: flushRealtimeEvents()

   实现 ``flushRealtimeEvents`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``25``—``33`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``sent``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``isCurrentConnection``、``pendingEvents.shift``、``activeTransport.sendEvent``。

.. CWM-AST-FUNCTION src/runtime/transport/channel.js:1258:1635:FUNCTION

.. js:function:: sendRealtimeEvent(envelope, {queue = true})

   发送与 ``Realtime Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``35``—``45`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{queue = true}`` （默认值 ``{}``）
      调用方传入的 ``queue = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``isCurrentConnection``、``activeTransport.sendEvent``、``pendingEvents.push``、``getBackendConnection``、``pendingEvents.shift``。

.. CWM-AST-FUNCTION src/runtime/transport/channel.js:1670:1842:FUNCTION

.. js:function:: sendRealtimeMedia(header, body)

   发送与 ``Realtime Media`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``47``—``51`` 行。

   **参数**

   ``header``
      调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``body``
      媒体帧原始二进制 Body。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``isCurrentConnection``、``activeTransport.sendMedia``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/transport/channel.js:398:764:FUNCTION

.. rubric:: ``subscribeBackend callback @ 13``

.. code-block:: javascript

   subscribeBackend callback @ 13()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``13``—``21`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``activeTransport?.close``、``pendingEvents.splice``。
