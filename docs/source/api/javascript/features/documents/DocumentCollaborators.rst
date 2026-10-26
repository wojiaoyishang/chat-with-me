src/features/documents/DocumentCollaborators 模块
======================================================================================================

.. js:module:: src/features/documents/DocumentCollaborators

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/DocumentCollaborators.jsx``
* **模块标识**：``src/features/documents/DocumentCollaborators``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/page/openChatWindow.js``、``@/lib/clientText.js``、``react``、``react-i18next``、``@/components/ui/button``、``@/components/ui/avatar``、``@/components/ui/popover``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:446:872:FUNCTION

.. js:function:: PersonAvatar({ person })

   渲染 ``PersonAvatar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``18`` 行。

   **参数**

   ``{ person }``
      调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Avatar className="size-7 shrink-0 border-2 border-background"> <AvatarImage src={person.avatar} alt={person.name} /> <AvatarFallback className="text-xs" style={{ color: person.…``。

   **主要协作调用**：``(person.name || '?').slice``。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:872:7717:FUNCTION

.. js:function:: DocumentCollaborators({ participants, onLocate, onOpenConversation })

   渲染 ``DocumentCollaborators`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``20``—``127`` 行。

   **参数**

   ``{ participants, onLocate, onOpenConversation }``
      调用方传入的 ``participants, onLocate, onOpenConversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Popover open={open} onOpenChange={setOpen}> <PopoverTrigger asChild> <Button variant="ghost" size="sm" className="h-8 shrink-0 gap-2 px-1.5" aria-label={t('documents_online_cou…``。

   **主要协作调用**：``useTranslation``、``useState``、``t``、``participants.slice(0, 3).map``、``participants.slice``、``participants.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:1545:1674:FUNCTION

.. rubric:: ``participants.slice(0, 3).map callback @ 33``

.. code-block:: javascript

   participants.slice(0, 3).map callback @ 33(person)

作为 ``participants.slice(0, 3).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``35`` 行；所属函数 ``DocumentCollaborators``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:2321:7393:FUNCTION

.. rubric:: ``participants.map callback @ 46``

.. code-block:: javascript

   participants.map callback @ 46(person)

作为 ``participants.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``117`` 行；所属函数 ``DocumentCollaborators``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``formatLocalTimestamp``、``String(import.meta.env.BASE_URL || '/').replace``、``String``、``chatWindowPath``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:2817:3128:FUNCTION

.. rubric:: ``onKeyDown callback @ 53``

.. code-block:: javascript

   onKeyDown callback @ 53(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``53``—``57`` 行；所属函数 ``participants.map callback @ 46``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['Enter', ' '].includes``、``event.preventDefault``、``onLocate``、``setOpen``。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:3172:3353:FUNCTION

.. rubric:: ``onClick callback @ 58``

.. code-block:: javascript

   onClick callback @ 58()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``61`` 行；所属函数 ``participants.map callback @ 46``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLocate``、``setOpen``。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:6252:6808:FUNCTION

.. rubric:: ``onClick callback @ 100``

.. code-block:: javascript

   onClick callback @ 100(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``106`` 行；所属函数 ``participants.map callback @ 46``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onOpenConversation``、``openChatWindow``、``event.preventDefault``、``setOpen``。
