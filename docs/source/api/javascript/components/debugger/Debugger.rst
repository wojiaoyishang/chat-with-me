src/components/debugger/Debugger 模块
================================================================================

.. js:module:: src/components/debugger/Debugger

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/debugger/Debugger.js``
* **模块标识**：``src/components/debugger/Debugger``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``@/context/useEventStore.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/debugger/Debugger.js:129:853:FUNCTION

.. js:function:: GlobalEventLogger()

   渲染 ``GlobalEventLogger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``30`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useEffect``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/debugger/Debugger.js:201:812:FUNCTION

.. rubric:: ``useEffect callback @ 7``

.. code-block:: javascript

   useEffect callback @ 7()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``7``—``27`` 行；所属函数 ``GlobalEventLogger``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { unsubscribe(); console.log('[EventLogger] 已停止'); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``console.log``、``useEventStore.subscribe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/debugger/Debugger.js:319:668:FUNCTION

.. rubric:: ``useEventStore.subscribe callback @ 10``

.. code-block:: javascript

   useEventStore.subscribe callback @ 10(state)

封装 ``EventStore.subscribe`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``20`` 行；所属函数 ``useEffect callback @ 7``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``console.info``、``console.warn``。

.. CWM-AST-FUNCTION src/components/debugger/Debugger.js:710:804:FUNCTION

.. rubric:: ``returned callback @ 23``

.. code-block:: javascript

   returned callback @ 23()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``26`` 行；所属函数 ``useEffect callback @ 7``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``、``console.log``。
