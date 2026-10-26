src/components/sidebar/ConversationForkDialog 模块
========================================================================================================

.. js:module:: src/components/sidebar/ConversationForkDialog

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/sidebar/ConversationForkDialog.jsx``
* **模块标识**：``src/components/sidebar/ConversationForkDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/components/ui/button``、``@/components/ui/dialog``、``@/components/ui/progress``、``@/features/tasks/useTaskStore.js``、``./useConversationFork.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:501:6334:FUNCTION

.. js:function:: ConversationForkDialog({operation, open, onOpenChange, onComplete, onSelect, onStatusChange})

   渲染 ``ConversationForkDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``10``—``86`` 行。

   **参数**

   ``{operation, open, onOpenChange, onComplete, onSelect, onStatusChange}``
      调用方传入的 ``operation, open, onOpenChange, onComplete, onSelect, onStatusChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(next) => next ? onOpenChange(true) : close()}> <DialogContent className="sm:max-w-md" data-conversation-fork={operation.conversationId}> <Dial…``。

   **主要协作调用**：``useTranslation``、``useConversationFork``、``Boolean``、``useEffect``、``Number.isFinite``、``Math.max``、``Math.min``、``t``、``Number``、``Math.floor``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:916:985:FUNCTION

.. rubric:: ``onComplete``

.. code-block:: javascript

   onComplete(result)

处理 ``Complete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``ConversationForkDialog``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onStatusChange``、``onComplete``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:1147:1212:FUNCTION

.. rubric:: ``useEffect callback @ 19``

.. code-block:: javascript

   useEffect callback @ 19()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``21`` 行；所属函数 ``ConversationForkDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onStatusChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:1478:1611:FUNCTION

.. rubric:: ``showTask``

.. code-block:: javascript

   showTask()

实现 ``showTask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``29`` 行；所属函数 ``ConversationForkDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onOpenChange``、``useTaskStore.getState().show``、``useTaskStore.getState``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:1631:1743:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close()

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``30``—``33`` 行；所属函数 ``ConversationForkDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onStatusChange``、``onOpenChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:1804:1849:FUNCTION

.. rubric:: ``onOpenChange callback @ 36``

.. code-block:: javascript

   onOpenChange callback @ 36(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``ConversationForkDialog``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``、``close``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:5663:5687:FUNCTION

.. rubric:: ``onClick callback @ 78``

.. code-block:: javascript

   onClick callback @ 78()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``ConversationForkDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``confirmFork``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:5827:5855:FUNCTION

.. rubric:: ``onClick callback @ 79``

.. code-block:: javascript

   onClick callback @ 79()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``ConversationForkDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``retrySubmission``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationForkDialog.jsx:6127:6197:FUNCTION

.. rubric:: ``onClick callback @ 81``

.. code-block:: javascript

   onClick callback @ 81()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``ConversationForkDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``、``onSelect``。
