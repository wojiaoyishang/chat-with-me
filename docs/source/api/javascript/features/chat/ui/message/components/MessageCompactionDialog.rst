src/features/chat/ui/message/components/MessageCompactionDialog 模块
============================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageCompactionDialog

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageCompactionDialog.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageCompactionDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/textarea``、``@/components/ui/dialog``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:307:1959:FUNCTION

.. js:function:: MessageCompactionDialog({open, onOpenChange, onSubmit, pending, error, blocked, tool = false})

   渲染 ``MessageCompactionDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``35`` 行。

   **参数**

   ``{open, onOpenChange, onSubmit, pending, error, blocked, tool = false}``
      调用方传入的 ``open, onOpenChange, onSubmit, pending, error, blocked, tool = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Dialog open={open} onOpenChange={next => {if (!pending) onOpenChange(next);}}> <DialogContent className="sm:max-w-lg" onClick={event => event.stopPropagation()}> <DialogHeader> <…``。

   **主要协作调用**：``useState``、``useId``、``useEffect``、``Boolean``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:529:580:FUNCTION

.. rubric:: ``useEffect callback @ 10``

.. code-block:: javascript

   useEffect callback @ 10()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``12`` 行；所属函数 ``MessageCompactionDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInstruction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:637:680:FUNCTION

.. rubric:: ``onOpenChange callback @ 14``

.. code-block:: javascript

   onOpenChange callback @ 14(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``MessageCompactionDialog``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:739:771:FUNCTION

.. rubric:: ``onClick callback @ 15``

.. code-block:: javascript

   onClick callback @ 15(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``MessageCompactionDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:1186:1229:FUNCTION

.. rubric:: ``onChange callback @ 22``

.. code-block:: javascript

   onChange callback @ 22(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``MessageCompactionDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInstruction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:1607:1632:FUNCTION

.. rubric:: ``onClick callback @ 28``

.. code-block:: javascript

   onClick callback @ 28()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``MessageCompactionDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageCompactionDialog.jsx:1718:1757:FUNCTION

.. rubric:: ``onClick callback @ 29``

.. code-block:: javascript

   onClick callback @ 29()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``MessageCompactionDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubmit``、``instruction.trim``。
