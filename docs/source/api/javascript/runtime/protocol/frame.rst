src/runtime/protocol/frame 模块
=============================

.. js:module:: src/runtime/protocol/frame

该模块实现 CWM Protocol v1 的事件目录、MessagePack、二进制 Frame 或订阅规则。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/runtime/protocol/frame.js``
* **模块标识**：``src/runtime/protocol/frame``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------

``./msgpack.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:633:997:FUNCTION

.. js:function:: asBytes(value)

   实现 ``asBytes`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``21`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Uint8Array()``、``value``、``new Uint8Array(value)``、``new Uint8Array(value.buffer, value.byteOffset, value.byteLength)``。

   **显式抛出**：``new TypeError('Binary payload must be an ArrayBuffer or typed array')``。

   **主要协作调用**：``ArrayBuffer.isView``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:1020:1174:FUNCTION

.. js:function:: assertObject(value, label)

   实现 ``assertObject`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``27`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``label``
      调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **显式抛出**：``new TypeError(\`${label} must be a map\`)``。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:1201:1533:FUNCTION

.. js:function:: assertIdentifier(value, field, required)

   实现 ``assertIdentifier`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``37`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``field``
      调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``required``（默认值 ``false``）
      调用方传入的 ``required`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **显式抛出**：``new TypeError(\`${field} is required\`)``、``new TypeError(\`${field} must be a canonical UUID\`)``。

   **主要协作调用**：``UUID_PATTERN.test``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:1564:2613:FUNCTION

.. js:function:: assertCommonEnvelope(envelope)

   实现 ``assertCommonEnvelope`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``58`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **显式抛出**：``new TypeError(\`Unsupported protocol version: ${envelope.version}\`)``、``new TypeError(\`Invalid semantic event name: ${envelope.event}\`)``、``new TypeError('sequence must be a non-negative integer')``、``new TypeError('timestamp_ms must be a non-negative safe integer')``。

   **主要协作调用**：``assertObject``、``envelope.event.trim``、``EVENT_NAME_PATTERN.test``、``assertIdentifier``、``Number.isInteger``、``Number.isSafeInteger``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:2652:3181:FUNCTION

.. js:function:: validateEventEnvelope(envelope)

   校验与 ``Event Envelope`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``60``—``71`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``envelope``。

   **显式抛出**：``new TypeError(\`Unexpected event envelope fields: ${extra.join(', ')}\`)``。

   **主要协作调用**：``assertCommonEnvelope``、``Object.keys(envelope).filter``、``Object.keys``、``extra.join``、``assertObject``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:3220:3996:FUNCTION

.. js:function:: validateMediaEnvelope(envelope)

   校验与 ``Media Envelope`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``73``—``87`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``envelope``。

   **显式抛出**：``new TypeError('media codec is required')``、``new TypeError('sample_rate must be a positive integer')``、``new TypeError('channels must be a positive integer')``。

   **主要协作调用**：``assertCommonEnvelope``、``assertIdentifier``、``envelope.codec.trim``、``Number.isInteger``、``assertObject``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:4018:4856:FUNCTION

.. js:function:: encodeFrame(kind, header, body)

   编码与 ``Frame`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``89``—``105`` 行。

   **参数**

   ``kind``
      调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``header``
      调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``body``（默认值 ``null``）
      媒体帧原始二进制 Body。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``output.buffer``。

   **显式抛出**：``new RangeError('Frame header exceeds protocol limit')``、``new RangeError('Frame body exceeds protocol limit')``。

   **主要协作调用**：``encodeMessagePack``、``asBytes``、``output.set``、``view.setUint8``、``view.setUint32``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:4890:4966:FUNCTION

.. js:function:: encodeEventFrame(envelope)

   编码与 ``Event Frame`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``107``—``107`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``encodeFrame``、``validateEventEnvelope``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:4999:5087:FUNCTION

.. js:function:: encodeMediaFrame(envelope, body)

   编码与 ``Media Frame`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``108``—``108`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``body``
      媒体帧原始二进制 Body。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``encodeFrame``、``validateMediaEnvelope``。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:5116:6784:FUNCTION

.. js:function:: decodeFrame(input)

   解码与 ``Frame`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``110``—``139`` 行。

   **参数**

   ``input``
      待解析、校验或转换的输入。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{kind, header, body}``。

   **显式抛出**：``new RangeError('Frame is shorter than the fixed header')``、``new TypeError('Invalid CWM frame magic')``、``new TypeError(\`Unsupported protocol version: ${version}\`)``、``new TypeError(\`Unsupported frame kind: ${kind}\`)``、``new RangeError('Frame exceeds protocol limits')``、``new RangeError(\`Frame length mismatch: expected ${expected}, got ${bytes.byteLength}\`)``、``new TypeError('Event frames must not include a raw body')``。

   **主要协作调用**：``asBytes``、``view.getUint8``、``[FrameKind.EVENT, FrameKind.MEDIA, FrameKind.BINARY].includes``、``view.getUint32``、``decodeMessagePack``、``bytes.slice``、``validateEventEnvelope``、``validateMediaEnvelope``、``assertObject``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/protocol/frame.js:2977:3003:FUNCTION

.. rubric:: ``Object.keys(envelope).filter callback @ 67``

.. code-block:: javascript

   Object.keys(envelope).filter callback @ 67(key)

作为 ``Object.keys(envelope).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``validateEventEnvelope``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.has``。
