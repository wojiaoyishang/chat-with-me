src/features/chat/ui/message/components/MessagePaginator 模块
==============================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessagePaginator

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessagePaginator.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessagePaginator``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/components/ui/button``、``@/components/ui/popover``、``./BranchMessageSelectorDialog.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:364:5494:FUNCTION

.. rubric:: ``memo callback @ 8``

.. code-block:: javascript

   memo callback @ 8({ msg, msgId, conversationId, messages, isRight, onSwitchMessage, switchingMessageId, setSwitchingM…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``135`` 行。

**参数**

``{ msg, msgId, conversationId, messages, isRight, onSwitchMessage, switchingMessageId, setSwitchingM…``
   调用方传入的 ``msg, msgId, conversationId, messages, isRight, onSwitchMessage, switchingMessageId, setSwitchingM…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60flex items-center gap-0.5 text-sm transition-opacity duration-300 ${isRight ? 'justify-end' : 'justify-start'}\x60}> <Button type="button" variant="ghost" size="ic…``。

**主要协作调用**：``useState``、``Array.isArray``、``branchMessages.includes``、``branchMessages.indexOf``、``Math.max``、``useCallback``、``t``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:1570:2551:FUNCTION

.. rubric:: ``useCallback callback @ 33``

.. code-block:: javascript

   async useCallback callback @ 33(nextMessageId, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``33``—``61`` 行；所属函数 ``memo callback @ 8``。

**参数**

``nextMessageId``
   目标对象的公共或运行时标识。

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``result``。

**显式抛出**：``error``。

**主要协作调用**：``setSwitchingMessageId``、``setFadeMessages``、``onSwitchMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:1832:1873:FUNCTION

.. rubric:: ``setFadeMessages callback @ 39``

.. code-block:: javascript

   setFadeMessages callback @ 39(prev)

设置与 ``Fade Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``useCallback callback @ 33``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:2053:2209:FUNCTION

.. rubric:: ``setFadeMessages callback @ 44``

.. code-block:: javascript

   setFadeMessages callback @ 44(prev)

设置与 ``Fade Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``44``—``48`` 行；所属函数 ``useCallback callback @ 33``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:2307:2447:FUNCTION

.. rubric:: ``setFadeMessages callback @ 52``

.. code-block:: javascript

   setFadeMessages callback @ 52(prev)

设置与 ``Fade Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``52``—``56`` 行；所属函数 ``useCallback callback @ 33``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:2688:3075:FUNCTION

.. rubric:: ``useCallback callback @ 63``

.. code-block:: javascript

   async useCallback callback @ 63(direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``63``—``73`` 行；所属函数 ``memo callback @ 8``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``switchToMessage``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:3459:3485:FUNCTION

.. rubric:: ``onClick callback @ 83``

.. code-block:: javascript

   onClick callback @ 83()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSwitch``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:3824:3937:FUNCTION

.. rubric:: ``onOpenChange callback @ 93``

.. code-block:: javascript

   onOpenChange callback @ 93(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``95`` 行；所属函数 ``memo callback @ 8``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectorOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:4909:4937:FUNCTION

.. rubric:: ``onClose callback @ 116``

.. code-block:: javascript

   onClose callback @ 116()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectorOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessagePaginator.jsx:5193:5219:FUNCTION

.. rubric:: ``onClick callback @ 126``

.. code-block:: javascript

   onClick callback @ 126()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSwitch``。
