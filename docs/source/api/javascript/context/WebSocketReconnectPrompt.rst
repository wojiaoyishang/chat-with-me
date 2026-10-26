src/context/WebSocketReconnectPrompt 模块
======================================================================================

.. js:module:: src/context/WebSocketReconnectPrompt

该模块提供跨页面运行时 Context、事件分发或全局状态。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/context/WebSocketReconnectPrompt.jsx``
* **模块标识**：``src/context/WebSocketReconnectPrompt``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``sonner``、``@/components/ui/dialog``、``@/components/ui/button``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/WebSocketReconnectPrompt.jsx:258:1579:FUNCTION

.. js:function:: WebSocketReconnectPrompt({ open, onRetry })

   渲染 ``WebSocketReconnectPrompt`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``33`` 行。

   **参数**

   ``{ open, onRetry }``
      调用方传入的 ``open, onRetry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Dialog open={open} modal={false}> <DialogContent showCloseButton={false} className="z-[12010] top-auto bottom-4 left-auto right-4 w-[calc(100%-2rem)] max-w-sm translate-x-0 trans…``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``useTranslation``、``useState``、``t``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/WebSocketReconnectPrompt.jsx:436:750:FUNCTION

.. rubric:: ``retry``

.. code-block:: javascript

   async retry()

实现 ``retry`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``10``—``20`` 行；所属函数 ``WebSocketReconnectPrompt``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRetrying``、``onRetry``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/context/WebSocketReconnectPrompt.jsx:1039:1072:FUNCTION

.. rubric:: ``onOpenAutoFocus callback @ 24``

.. code-block:: javascript

   onOpenAutoFocus callback @ 24(event)

处理 ``Open Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``WebSocketReconnectPrompt``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/context/WebSocketReconnectPrompt.jsx:1104:1137:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 25``

.. code-block:: javascript

   onCloseAutoFocus callback @ 25(event)

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``WebSocketReconnectPrompt``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/context/WebSocketReconnectPrompt.jsx:1170:1203:FUNCTION

.. rubric:: ``onInteractOutside callback @ 26``

.. code-block:: javascript

   onInteractOutside callback @ 26(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``WebSocketReconnectPrompt``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/context/WebSocketReconnectPrompt.jsx:1234:1267:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 27``

.. code-block:: javascript

   onEscapeKeyDown callback @ 27(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``WebSocketReconnectPrompt``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。
