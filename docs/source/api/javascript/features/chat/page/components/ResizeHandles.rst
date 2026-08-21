src/features/chat/page/components/ResizeHandles 模块
==================================================

.. js:module:: src/features/chat/page/components/ResizeHandles

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/components/ResizeHandles.jsx``
* **模块标识**：``src/features/chat/page/components/ResizeHandles``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------

``react``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/ResizeHandles.jsx:49:1690:FUNCTION

.. js:function:: ResizeHandles({onResizeMouseDown, onResizeTouchStart})

   渲染 ``ResizeHandles`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``36`` 行。

   **参数**

   ``{onResizeMouseDown, onResizeTouchStart}``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="absolute top-0 left-0 w-full h-2 cursor-n-resize z-[10000]" {...bind('n')}/> <div className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-[10000]" {.…``。

   **主要协作调用**：``bind``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ResizeHandles.jsx:113:316:FUNCTION

.. rubric:: ``bind``

.. code-block:: javascript

   bind(direction)

实现 ``bind`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``8`` 行；所属函数 ``ResizeHandles``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ResizeHandles.jsx:152:199:FUNCTION

.. rubric:: ``onMouseDown``

.. code-block:: javascript

   onMouseDown(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``5``—``5`` 行；所属函数 ``bind``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onResizeMouseDown``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ResizeHandles.jsx:222:270:FUNCTION

.. rubric:: ``onTouchStart``

.. code-block:: javascript

   onTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``6``—``6`` 行；所属函数 ``bind``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onResizeTouchStart``。
