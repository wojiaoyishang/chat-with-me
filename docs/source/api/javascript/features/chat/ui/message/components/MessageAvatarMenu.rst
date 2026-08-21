src/features/chat/ui/message/components/MessageAvatarMenu 模块
============================================================

.. js:module:: src/features/chat/ui/message/components/MessageAvatarMenu

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/components/MessageAvatarMenu.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageAvatarMenu``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------

``react``、``react-dom``、``framer-motion``、``lucide-react``、``../utils/messageActions.js``、``../utils/speechContent.js``、``./MessageTools.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:408:470:FUNCTION

.. js:function:: isActiveSpeechStatus(status)

   判断与 ``Active Speech Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``9`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:504:7964:FUNCTION

.. rubric:: ``memo callback @ 11``

.. code-block:: javascript

   memo callback @ 11({ open, onClose, msg, msgId, conversationId, readonly, speechState, displayName, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``156`` 行。

**参数**

``{ open, onClose, msg, msgId, conversationId, readonly, speechState, displayName, t }``
   调用方传入的 `` open, onClose, msg, msgId, conversationId, readonly, speechState, displayName, t `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <AnimatePresence> {open && ( <motion.div className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/35 px-0 sm:px-4" role="presentation" data-message-…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useCallback``、``canSpeakMessage``、``isActiveSpeechStatus``、``useEffect``、``createPortal``、``getLabel``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:985:1137:FUNCTION

.. rubric:: ``useCallback callback @ 22``

.. code-block:: javascript

   useCallback callback @ 22(key, fallback)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``25`` 行；所属函数 ``memo callback @ 11``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``fallback``
   调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``value && value !== key ? value : fallback``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:1415:1579:FUNCTION

.. rubric:: ``useCallback callback @ 31``

.. code-block:: javascript

   useCallback callback @ 31()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``35`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleMessageAction``、``onClose``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:1685:1809:FUNCTION

.. rubric:: ``useCallback callback @ 37``

.. code-block:: javascript

   useCallback callback @ 37()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``41`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleMessageAction``、``onClose``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:1871:2396:FUNCTION

.. rubric:: ``useEffect callback @ 43``

.. code-block:: javascript

   useEffect callback @ 43()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``58`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:2092:2168:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``49``—``51`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:2244:2389:FUNCTION

.. rubric:: ``returned callback @ 54``

.. code-block:: javascript

   returned callback @ 54()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``57`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageAvatarMenu.jsx:3817:3851:FUNCTION

.. rubric:: ``onClick callback @ 85``

.. code-block:: javascript

   onClick callback @ 85(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``memo callback @ 11``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
