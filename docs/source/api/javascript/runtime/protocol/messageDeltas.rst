src/runtime/protocol/messageDeltas 模块
==================================================================================

.. js:module:: src/runtime/protocol/messageDeltas

Combine adjacent text patches only; full snapshots and typed card values are barriers.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/protocol/messageDeltas.js``
* **模块标识**：``src/runtime/protocol/messageDeltas``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:187:289:FUNCTION

.. js:function:: entries(value)

   实现 ``entries`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``4`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Array.isArray``、``Object.entries``。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:290:1706:FUNCTION

.. js:function:: mergeMessageDeltaValues(event, left, right)

   Combine adjacent text patches only; full snapshots and typed card values are barriers.

   **性质**：同步函数；导出 API；源码第 ``7``—``36`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``Object.fromEntries([...merged].map(([id, value]) => [id, value instanceof Map ? Object.fromEntries(value) : value]))``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``DELTA_EVENTS.has``、``entries``、``merged.has``、``merged.set``、``merged.get``、``card.has``、``card.set``、``card.get``、``Object.fromEntries``、``[...merged].map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:1706:2466:FUNCTION

.. js:function:: messageDeltaBatchKey(envelope)

   Only fire-and-forget text deltas in the same protocol scope may share a callback.

   **性质**：同步函数；导出 API；源码第 ``39``—``46`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``JSON.stringify([envelope.event, envelope.conversation_id, envelope.document_id, envelope.turn_id, envelope.run_id, envelope.stream_id])``。

   **主要协作调用**：``DELTA_EVENTS.has``、``Object.keys(envelope.payload || {}).some``、``Object.keys``、``Object.values(envelope.payload?.value || {}) .some``、``Object.values``、``JSON.stringify``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:2466:2808:FUNCTION

.. js:function:: mergeMessageDeltaEnvelopes(left, right)

   合并与 ``Message Delta Envelopes`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``48``—``53`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``value ? {...right, payload: {...right.payload, value}} : null``。

   **主要协作调用**：``messageDeltaBatchKey``、``mergeMessageDeltaValues``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:1622:1701:FUNCTION

.. rubric:: ``[...merged].map callback @ 35``

.. code-block:: javascript

   [...merged].map callback @ 35([id, value])

作为 ``[...merged].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``mergeMessageDeltaValues``。

**参数**

``[id, value]``
   调用方传入的 ``id, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:1988:2030:FUNCTION

.. rubric:: ``Object.keys(envelope.payload || {}).some callback @ 41``

.. code-block:: javascript

   Object.keys(envelope.payload || {}).some callback @ 41(key)

作为 ``Object.keys(envelope.payload || {}).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``messageDeltaBatchKey``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['value', 'reply'].includes``。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:2163:2293:FUNCTION

.. rubric:: ``Object.values(envelope.payload?.value || {}) .some callback @ 43``

.. code-block:: javascript

   Object.values(envelope.payload?.value || {}) .some callback @ 43(patch)

作为 ``Object.values(envelope.payload?.value || {}) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``messageDeltaBatchKey``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.values(patch || {}).some``、``Object.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/protocol/messageDeltas.js:2206:2292:FUNCTION

.. rubric:: ``Object.values(patch || {}).some callback @ 43``

.. code-block:: javascript

   Object.values(patch || {}).some callback @ 43(value)

作为 ``Object.values(patch || {}).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``Object.values(envelope.payload?.value || {}) .some callback @ 43``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/\[(?:DONE|FAILED)(?::[^\]]*)?\]/i.test``。
