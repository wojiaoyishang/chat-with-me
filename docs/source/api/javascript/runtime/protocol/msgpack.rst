src/runtime/protocol/msgpack 模块
================================================================================

.. js:module:: src/runtime/protocol/msgpack

Small MessagePack codec used by CWM Protocol v1. It intentionally supports only the data types allowed in protocol envelopes: null, booleans, finite numbers, strings, byte arrays, arrays and plain maps.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/protocol/msgpack.js``
* **模块标识**：``src/runtime/protocol/msgpack``
* **顶层函数/组件/Hook**：4
* **类**：2
* **局部函数与匿名回调**：2

类
--------------------------------------------------------------------------------

.. js:class:: Writer()

   封装 ``Writer`` 的状态和方法。

   **性质**：模块内部类；源码第 ``10`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:316:392:FUNCTION

   .. js:method:: constructor()

      初始化类实例并建立运行状态。

      **性质**：同步函数；局部实现；源码第 ``11``—``14`` 行。

      **参数**

      无。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:392:573:FUNCTION

   .. js:method:: push(bytes)

      实现 ``push`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``16``—``20`` 行。

      **参数**

      ``bytes``
         调用方传入的 ``bytes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.parts.push``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:573:646:FUNCTION

   .. js:method:: byte(value)

      实现 ``byte`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``22``—``24`` 行。

      **参数**

      ``value``
         待读取、转换或校验的值。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.push``、``Uint8Array.of``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:646:858:FUNCTION

   .. js:method:: number(size, setter, value)

      实现 ``number`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``26``—``31`` 行。

      **参数**

      ``size``
         调用方传入的 ``size`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``setter``
         调用方传入的 ``setter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``value``
         待读取、转换或校验的值。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``view[setter]``、``this.push``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:858:1107:FUNCTION

   .. js:method:: finish()

      实现 ``finish`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``33``—``41`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``output``。

      **主要协作调用**：``output.set``。

.. js:class:: Reader()

   封装 ``Reader`` 的状态和方法。

   **性质**：模块内部类；源码第 ``132`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:4782:5019:FUNCTION

   .. js:method:: constructor(input)

      初始化类实例并建立运行状态。

      **性质**：同步函数；局部实现；源码第 ``133``—``137`` 行。

      **参数**

      ``input``
         待解析、校验或转换的输入。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:5019:5165:FUNCTION

   .. js:method:: ensure(length)

      确保与 ``ensure`` 相关的数据或状态。

      **性质**：同步函数；局部实现；源码第 ``139``—``141`` 行。

      **参数**

      ``length``
         调用方传入的 ``length`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **显式抛出**：``new RangeError('Unexpected end of MessagePack data')``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:5165:5338:FUNCTION

   .. js:method:: number(size, getter)

      实现 ``number`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``143``—``148`` 行。

      **参数**

      ``size``
         调用方传入的 ``size`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``getter``
         调用方传入的 ``getter`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``value``。

      **主要协作调用**：``this.ensure``、``this.view[getter]``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:5338:5522:FUNCTION

   .. js:method:: raw(length)

      实现 ``raw`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``150``—``155`` 行。

      **参数**

      ``length``
         调用方传入的 ``length`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``result``。

      **主要协作调用**：``this.ensure``、``this.bytes.slice``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:5522:5603:FUNCTION

   .. js:method:: string(length)

      实现 ``string`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``157``—``159`` 行。

      **参数**

      ``length``
         调用方传入的 ``length`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``textDecoder.decode(this.raw(length))``。

      **主要协作调用**：``textDecoder.decode``、``this.raw``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:5603:5781:FUNCTION

   .. js:method:: array(length)

      实现 ``array`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``161``—``165`` 行。

      **参数**

      ``length``
         调用方传入的 ``length`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``result``。

      **主要协作调用**：``this.value``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:5781:6010:FUNCTION

   .. js:method:: map(length)

      映射与 ``map`` 相关的数据或状态。

      **性质**：同步函数；局部实现；源码第 ``167``—``174`` 行。

      **参数**

      ``length``
         调用方传入的 ``length`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``result``。

      **主要协作调用**：``this.value``、``String``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:6010:6220:FUNCTION

   .. js:method:: safeBigInt(value)

      实现 ``safeBigInt`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``176``—``180`` 行。

      **参数**

      ``value``
         待读取、转换或校验的值。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``number``。

      **显式抛出**：``new RangeError('MessagePack integer exceeds JavaScript safe range')``。

      **主要协作调用**：``Number``、``Number.isSafeInteger``。

   .. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:6220:8147:FUNCTION

   .. js:method:: value()

      实现 ``value`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``182``—``215`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``code``、``code - 0x100``、``this.string(code & 0x1f)``、``this.array(code & 0x0f)``。

      **显式抛出**：``new TypeError(\x60Unsupported MessagePack code: 0x${code.toString(16)}\x60)``。

      **主要协作调用**：``this.number``、``this.string``、``this.array``、``this.map``、``this.raw``、``this.safeBigInt``、``code.toString``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:1130:1596:FUNCTION

.. js:function:: writeLength(writer, length, fixBase, fixLimit, code8, code16, code32)

   实现 ``writeLength`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``57`` 行。

   **参数**

   ``writer``
      调用方传入的 ``writer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``length``
      调用方传入的 ``length`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fixBase``
      调用方传入的 ``fixBase`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fixLimit``
      调用方传入的 ``fixLimit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``code8``
      调用方传入的 ``code8`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``code16``
      调用方传入的 ``code16`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``code32``
      调用方传入的 ``code32`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``writer.byte``、``writer.number``。

.. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:1618:4622:FUNCTION

.. js:function:: encodeValue(writer, value)

   编码与 ``Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``124`` 行。

   **参数**

   ``writer``
      调用方传入的 ``writer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **显式抛出**：``new TypeError('MessagePack only accepts finite numbers')``、``new RangeError('Integer exceeds JavaScript safe range')``、``new TypeError(\x60Unsupported MessagePack value: ${typeof value}\x60)``。

   **主要协作调用**：``writer.byte``、``Number.isFinite``、``Number.isInteger``、``writer.number``、``Number.isSafeInteger``、``BigInt``、``textEncoder.encode``、``writeLength``、``writer.push``、``ArrayBuffer.isView``、``Array.isArray``、``value.forEach``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:4657:4765:FUNCTION

.. js:function:: encodeMessagePack(value)

   编码与 ``Message Pack`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``126``—``130`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``writer.finish()``。

   **主要协作调用**：``encodeValue``、``writer.finish``。

.. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:8183:8391:FUNCTION

.. js:function:: decodeMessagePack(input)

   解码与 ``Message Pack`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``218``—``223`` 行。

   **参数**

   ``input``
      待解析、校验或转换的输入。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value``。

   **显式抛出**：``new RangeError('Trailing MessagePack bytes')``。

   **主要协作调用**：``reader.value``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:4134:4169:FUNCTION

.. rubric:: ``value.forEach callback @ 111``

.. code-block:: javascript

   value.forEach callback @ 111(item)

作为 ``value.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``encodeValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``encodeValue``。

.. CWM-AST-FUNCTION src/runtime/protocol/msgpack.js:4284:4316:FUNCTION

.. rubric:: ``Object.entries(value).filter callback @ 115``

.. code-block:: javascript

   Object.entries(value).filter callback @ 115([, item])

作为 ``Object.entries(value).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``encodeValue``。

**参数**

``[, item]``
   调用方传入的 ``, item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
