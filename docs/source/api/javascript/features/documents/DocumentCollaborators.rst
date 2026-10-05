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
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``@/components/ui/button``、``@/components/ui/avatar``、``@/components/ui/popover``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:291:706:FUNCTION

.. js:function:: PersonAvatar({ person })

   渲染 ``PersonAvatar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``16`` 行。

   **参数**

   ``{ person }``
      调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Avatar className="size-7 shrink-0 border-2 border-background"> <AvatarImage src={person.avatar} alt={person.name} /> <AvatarFallback className="text-xs" style={{ color: person.…``。

   **主要协作调用**：``(person.name || '?').slice``。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:706:5541:FUNCTION

.. js:function:: DocumentCollaborators({ participants, onLocate })

   渲染 ``DocumentCollaborators`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``18``—``101`` 行。

   **参数**

   ``{ participants, onLocate }``
      调用方传入的 ``participants, onLocate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Popover open={open} onOpenChange={setOpen}> <PopoverTrigger asChild> <Button variant="ghost" size="sm" className="h-8 shrink-0 gap-2 px-1.5" aria-label={t('documents_online_cou…``。

   **主要协作调用**：``useTranslation``、``useState``、``t``、``participants.slice(0, 3).map``、``participants.slice``、``participants.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:1344:1471:FUNCTION

.. rubric:: ``participants.slice(0, 3).map callback @ 31``

.. code-block:: javascript

   participants.slice(0, 3).map callback @ 31(person)

作为 ``participants.slice(0, 3).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``31``—``33`` 行；所属函数 ``DocumentCollaborators``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:2107:5227:FUNCTION

.. rubric:: ``participants.map callback @ 44``

.. code-block:: javascript

   participants.map callback @ 44(person)

作为 ``participants.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``91`` 行；所属函数 ``DocumentCollaborators``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``new Date(person.joinedAt).toLocaleString``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentCollaborators.jsx:2552:2669:FUNCTION

.. rubric:: ``onClick callback @ 50``

.. code-block:: javascript

   onClick callback @ 50()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``50``—``52`` 行；所属函数 ``participants.map callback @ 44``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLocate``、``setOpen``。
