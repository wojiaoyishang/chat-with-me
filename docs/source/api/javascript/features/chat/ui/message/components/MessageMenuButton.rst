src/features/chat/ui/message/components/MessageMenuButton 模块
================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageMenuButton

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageMenuButton.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageMenuButton``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``lucide-react``、``@/components/ui/dropdown-menu``、``../utils/messageActions.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:437:3517:FUNCTION

.. rubric:: ``memo callback @ 20``

.. code-block:: javascript

   memo callback @ 20({msg, msgId, conversationId})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``97`` 行。

**参数**

``{msg, msgId, conversationId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenu> <DropdownMenuTrigger asChild> <button className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer md:hidden" aria-label={t('menu_function')} >…``。

**主要协作调用**：``useTranslation``、``t``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:1140:1196:FUNCTION

.. rubric:: ``onSelect callback @ 37``

.. code-block:: javascript

   onSelect callback @ 37()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:1502:1558:FUNCTION

.. rubric:: ``onSelect callback @ 46``

.. code-block:: javascript

   onSelect callback @ 46()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:1853:1909:FUNCTION

.. rubric:: ``onSelect callback @ 55``

.. code-block:: javascript

   onSelect callback @ 55()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:2219:2282:FUNCTION

.. rubric:: ``onSelect callback @ 64``

.. code-block:: javascript

   onSelect callback @ 64()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:2640:2702:FUNCTION

.. rubric:: ``onSelect callback @ 74``

.. code-block:: javascript

   onSelect callback @ 74()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageMenuButton.jsx:3230:3288:FUNCTION

.. rubric:: ``onSelect callback @ 89``

.. code-block:: javascript

   onSelect callback @ 89()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleMessageAction``。
