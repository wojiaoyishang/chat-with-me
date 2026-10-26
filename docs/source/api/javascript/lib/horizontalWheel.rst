src/lib/horizontalWheel 模块
================================================================================

.. js:module:: src/lib/horizontalWheel

该模块提供跨 Feature 复用的浏览器或业务辅助函数。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/horizontalWheel.js``
* **模块标识**：``src/lib/horizontalWheel``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/horizontalWheel.js:0:918:FUNCTION

.. js:function:: attachHorizontalWheel(element)

   实现 ``attachHorizontalWheel`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``2``—``17`` 行。

   **参数**

   ``element``
      调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => element.removeEventListener('wheel', onWheel)``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``element.addEventListener``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/horizontalWheel.js:156:165:FUNCTION

.. rubric:: ``returned callback @ 3``

.. code-block:: javascript

   returned callback @ 3()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3``—``3`` 行；所属函数 ``attachHorizontalWheel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/horizontalWheel.js:186:783:FUNCTION

.. rubric:: ``onWheel``

.. code-block:: javascript

   onWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``4``—``14`` 行；所属函数 ``attachHorizontalWheel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``Math.max``、``Math.min``、``event.preventDefault``、``element.scrollTo``。

.. CWM-AST-FUNCTION src/lib/horizontalWheel.js:863:915:FUNCTION

.. rubric:: ``returned callback @ 16``

.. code-block:: javascript

   returned callback @ 16()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``attachHorizontalWheel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。
