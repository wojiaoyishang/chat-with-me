src/features/documents/DocumentConversationControls 模块
====================================================================================================================

.. js:module:: src/features/documents/DocumentConversationControls

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/DocumentConversationControls.jsx``
* **模块标识**：``src/features/documents/DocumentConversationControls``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react-i18next``、``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/dialog``、``@/components/sidebar/ConversationsList.jsx``、``@/context/useEventStore.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:458:3961:FUNCTION

.. js:function:: DocumentConversationControls({ conversationId, onSelect, onChatMode })

   渲染 ``DocumentConversationControls`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``9``—``84`` 行。

   **参数**

   ``{ conversationId, onSelect, onChatMode }``
      调用方传入的 ``conversationId, onSelect, onChatMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="ml-2 mr-3 flex shrink-0 items-center gap-2 md:ml-3 md:mr-2"> <Button variant="ghost" size="icon" className="size-8" aria-label={t('documents_chat_mode')} titl…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useEffect``、``t``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:686:826:FUNCTION

.. rubric:: ``useEffect callback @ 13``

.. code-block:: javascript

   useEffect callback @ 13()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``16`` 行；所属函数 ``DocumentConversationControls``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``unsubscribe``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'sidebar.*' }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:759:790:FUNCTION

.. rubric:: ``onEvent({ event: 'sidebar.*' }).then callback @ 14``

.. code-block:: javascript

   onEvent({ event: 'sidebar.*' }).then callback @ 14()

处理 ``onEvent({ event: 'sidebar.*' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listRef.current?.reload``。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:851:913:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select(id)

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``20`` 行；所属函数 ``DocumentConversationControls``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``、``setOpen``。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:1691:1710:FUNCTION

.. rubric:: ``onClick callback @ 40``

.. code-block:: javascript

   onClick callback @ 40()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``DocumentConversationControls``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:2099:2117:FUNCTION

.. rubric:: ``onClick callback @ 50``

.. code-block:: javascript

   onClick callback @ 50()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``DocumentConversationControls``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:3165:3183:FUNCTION

.. rubric:: ``onClick callback @ 65``

.. code-block:: javascript

   onClick callback @ 65()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``DocumentConversationControls``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``。

.. CWM-AST-FUNCTION src/features/documents/DocumentConversationControls.jsx:3716:3830:FUNCTION

.. rubric:: ``onDelete callback @ 75``

.. code-block:: javascript

   onDelete callback @ 75(id)

处理 ``Delete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``75``—``77`` 行；所属函数 ``DocumentConversationControls``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。
