src/lib/idleWork 模块
================================================================================

.. js:module:: src/lib/idleWork

Cancel superseded optional work before it consumes a browser idle slot.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/idleWork.js``
* **模块标识**：``src/lib/idleWork``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/idleWork.js:0:659:FUNCTION

.. js:function:: scheduleIdleWork(callback, { delay = 0, timeout = 280 })

   Cancel superseded optional work before it consumes a browser idle slot.

   **性质**：同步函数；导出 API；源码第 ``2``—``16`` 行。

   **参数**

   ``callback``
      状态变化、事件到达或操作完成时执行的回调。

   ``{ delay = 0, timeout = 280 }`` （默认值 ``{}``）
      调用方传入的 ``delay = 0, timeout = 280`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => { if (timer !== null) window.clearTimeout(timer); if (idle !== null) window.cancelIdleCallback?.(idle); }``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.setTimeout``、``schedule``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/idleWork.js:222:432:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``9`` 行；所属函数 ``scheduleIdleWork``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestIdleCallback``、``window.setTimeout``。

.. CWM-AST-FUNCTION src/lib/idleWork.js:524:656:FUNCTION

.. rubric:: ``returned callback @ 12``

.. code-block:: javascript

   returned callback @ 12()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``15`` 行；所属函数 ``scheduleIdleWork``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``window.cancelIdleCallback``。
