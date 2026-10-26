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
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``lucide-react``、``@/components/ui/tooltip``、``../utils/messageActions.js``、``../utils/speechContent.js``、``./TooltipInfo.jsx``、``@/components/modal/universalModal.js``、``@/config.js``、``@/context/userContext.jsx``、``./MessageSettingsMenu.jsx``、``./MessageBadges.jsx``、``../../../freeze/ConversationFreezeContext.jsx``、``../utils/messageBadgesModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:951:1013:FUNCTION

.. js:function:: isActiveSpeechStatus(status)

   判断与 ``Active Speech Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``16`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:1153:11239:FUNCTION

.. rubric:: ``memo callback @ 19``

.. code-block:: javascript

   memo callback @ 19({ msg, msgId, conversationId, readonly = false, speechState, onSettingsOpenChange })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``233`` 行。

**参数**

``{ msg, msgId, conversationId, readonly = false, speechState, onSettingsOpenChange }``
   调用方传入的 ``msg, msgId, conversationId, readonly = false, speechState, onSettingsOpenChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-1"> {hintsBeforeActions && hints} <div data-message-buttons="true" className="flex shrink-0 flex-wra…``。

**主要协作调用**：``useTranslation``、``useUserStore``、``useConversationMutationGuard``、``canSpeakMessage``、``isActiveSpeechStatus``、``Boolean``、``messageHintsBeforeActions``、``t``。

**内部回调数量**：11。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:1331:1386:FUNCTION

.. rubric:: ``useUserStore callback @ 21``

.. code-block:: javascript

   useUserStore callback @ 21(state)

封装 ``UserStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``memo callback @ 19``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:1528:1620:FUNCTION

.. rubric:: ``mutate``

.. code-block:: javascript

   mutate(action)

实现 ``mutate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``memo callback @ 19``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``freeze.canMutate``、``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:3241:3278:FUNCTION

.. rubric:: ``onClick callback @ 60``

.. code-block:: javascript

   onClick callback @ 60()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:4429:4449:FUNCTION

.. rubric:: ``onClick callback @ 81``

.. code-block:: javascript

   onClick callback @ 81()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:5135:5155:FUNCTION

.. rubric:: ``onClick callback @ 97``

.. code-block:: javascript

   onClick callback @ 97()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:5771:5827:FUNCTION

.. rubric:: ``onClick callback @ 112``

.. code-block:: javascript

   onClick callback @ 112()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:6437:6749:FUNCTION

.. rubric:: ``onClick callback @ 127``

.. code-block:: javascript

   onClick callback @ 127()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``127``—``133`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:7825:7847:FUNCTION

.. rubric:: ``onClick callback @ 156``

.. code-block:: javascript

   onClick callback @ 156()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:8593:8620:FUNCTION

.. rubric:: ``onClick callback @ 172``

.. code-block:: javascript

   onClick callback @ 172()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:9330:9356:FUNCTION

.. rubric:: ``onClick callback @ 188``

.. code-block:: javascript

   onClick callback @ 188()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageTools.jsx:10053:10363:FUNCTION

.. rubric:: ``onClick callback @ 204``

.. code-block:: javascript

   onClick callback @ 204()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``204``—``209`` 行；所属函数 ``memo callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openRemoteUniversalModal``。
