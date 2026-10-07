src/features/chat/ui/message/components/MessageTools 模块
======================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageTools

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageTools.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageTools``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``lucide-react``、``@/components/ui/tooltip``、``../utils/messageActions.js``、``../utils/speechContent.js``、``./TooltipInfo.jsx``、``@/components/modal/universalModal.js``、``@/config.js``、``@/context/userContext.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:660:722:FUNCTION

.. js:function:: isActiveSpeechStatus(status)

   判断与 ``Active Speech Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``12`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:859:9646:FUNCTION

.. rubric:: ``memo callback @ 15``

.. code-block:: javascript

   memo callback @ 15({ msg, msgId, conversationId, readonly = false, speechState })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``204`` 行。

**参数**

``{ msg, msgId, conversationId, readonly = false, speechState }``
   调用方传入的 ``msg, msgId, conversationId, readonly = false, speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex min-w-max flex-nowrap items-center gap-1"> {hasActiveBackgroundTools && ( <Tooltip> <TooltipTrigger asChild> <button onClick={() => handleMessageAction('can…``。

**主要协作调用**：``useTranslation``、``useUserStore``、``canSpeakMessage``、``isActiveSpeechStatus``、``Boolean``、``t``。

**内部回调数量**：10。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:1013:1068:FUNCTION

.. rubric:: ``useUserStore callback @ 17``

.. code-block:: javascript

   useUserStore callback @ 17(state)

封装 ``UserStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``memo callback @ 15``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:1915:1988:FUNCTION

.. rubric:: ``onClick callback @ 37``

.. code-block:: javascript

   onClick callback @ 37()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:3046:3102:FUNCTION

.. rubric:: ``onClick callback @ 57``

.. code-block:: javascript

   onClick callback @ 57()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:3718:3774:FUNCTION

.. rubric:: ``onClick callback @ 72``

.. code-block:: javascript

   onClick callback @ 72()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:4375:4431:FUNCTION

.. rubric:: ``onClick callback @ 87``

.. code-block:: javascript

   onClick callback @ 87()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:5026:5332:FUNCTION

.. rubric:: ``onClick callback @ 102``

.. code-block:: javascript

   onClick callback @ 102()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``102``—``108`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:6331:6389:FUNCTION

.. rubric:: ``onClick callback @ 130``

.. code-block:: javascript

   onClick callback @ 130()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:7065:7128:FUNCTION

.. rubric:: ``onClick callback @ 145``

.. code-block:: javascript

   onClick callback @ 145()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:7768:7830:FUNCTION

.. rubric:: ``onClick callback @ 160``

.. code-block:: javascript

   onClick callback @ 160()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:8511:8816:FUNCTION

.. rubric:: ``onClick callback @ 176``

.. code-block:: javascript

   onClick callback @ 176()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``176``—``181`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openRemoteUniversalModal``。
