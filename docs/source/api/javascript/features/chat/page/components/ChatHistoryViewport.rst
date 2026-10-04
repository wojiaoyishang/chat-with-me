src/features/chat/page/components/ChatHistoryViewport 模块
========================================================================================================================

.. js:module:: src/features/chat/page/components/ChatHistoryViewport

Relocate the single message viewport; never instantiate another ChatPage.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/ChatHistoryViewport.jsx``
* **模块标识**：``src/features/chat/page/components/ChatHistoryViewport``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``@/components/window``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHistoryViewport.jsx:158:1381:FUNCTION

.. js:function:: ChatHistoryViewport({ open, onClose, hostElement, children })

   Relocate the single message viewport; never instantiate another ChatPage.

   **性质**：同步函数；导出 API；源码第 ``6``—``34`` 行。

   **参数**

   ``{ open, onClose, hostElement, children }``
      调用方传入的 ``open, onClose, hostElement, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <div ref={normalHost} className="h-full min-h-0 w-full" /> {open && ( <FloatingDockWindow open title="聊天记录" onClose={onClose} portalTarget={hostElement} zIndex={90} defaultLa…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useRef``、``useState``、``useLayoutEffect``、``createPortal``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHistoryViewport.jsx:435:470:FUNCTION

.. rubric:: ``useState callback @ 9``

.. code-block:: javascript

   useState callback @ 9()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``9``—``9`` 行；所属函数 ``ChatHistoryViewport``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.createElement``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHistoryViewport.jsx:493:681:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 10``

.. code-block:: javascript

   useLayoutEffect callback @ 10()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``10``—``14`` 行；所属函数 ``ChatHistoryViewport``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => viewport.remove()``。

**主要协作调用**：``(open ? windowHost.current : normalHost.current)?.appendChild``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHistoryViewport.jsx:650:674:FUNCTION

.. rubric:: ``returned callback @ 13``

.. code-block:: javascript

   returned callback @ 13()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``useLayoutEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``viewport.remove``。
