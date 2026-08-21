src/features/story/StorySelectorButton 模块
=========================================

.. js:module:: src/features/story/StorySelectorButton

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/story/StorySelectorButton.jsx``
* **模块标识**：``src/features/story/StorySelectorButton``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/popover.tsx``、``@/components/ui/dropdown-menu``、``@/components/ui/dialog``、``@/components/ui/input``、``@/components/ui/DeleteConfirmDialog``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:719:9678:FUNCTION

.. js:function:: StorySelectorButton({ stories = [], onOpenStory, onRenameStory, onDeleteStory, t, isWindowMode = false, })

   渲染 ``StorySelectorButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``23``—``192`` 行。

   **参数**

   ``{ stories = [], onOpenStory, onRenameStory, onDeleteStory, t, isWindowMode = false, }``
      调用方传入的 `` stories = , onOpenStory, onRenameStory, onDeleteStory, t, isWindowMode = false, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <> {!!stories.length && ( <Popover open={popoverOpen} onOpenChange={setPopoverOpen}> <PopoverTrigger asChild> <Button variant="ghost" size="icon" className="relative hover:bg-am…``。

   **主要协作调用**：``useState``、``useEffect``、``t``、``stories.map``、``Boolean``、``draftTitle.trim``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:1232:1294:FUNCTION

.. rubric:: ``useEffect callback @ 38``

.. code-block:: javascript

   useEffect callback @ 38()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``40`` 行；所属函数 ``StorySelectorButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:1405:1489:FUNCTION

.. rubric:: ``openStory``

.. code-block:: javascript

   openStory(storyId)

打开与 ``Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``44``—``47`` 行；所属函数 ``StorySelectorButton``。

**参数**

``storyId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPopoverOpen``、``onOpenStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:1514:1595:FUNCTION

.. rubric:: ``openRename``

.. code-block:: javascript

   openRename(story)

打开与 ``Rename`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``49``—``52`` 行；所属函数 ``StorySelectorButton``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPopoverOpen``、``setRenameStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:1620:1701:FUNCTION

.. rubric:: ``openDelete``

.. code-block:: javascript

   openDelete(story)

打开与 ``Delete`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``54``—``57`` 行；所属函数 ``StorySelectorButton``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPopoverOpen``、``setDeleteStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:1728:2091:FUNCTION

.. rubric:: ``handleRename``

.. code-block:: javascript

   async handleRename(event)

处理 ``Rename`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``59``—``70`` 行；所属函数 ``StorySelectorButton``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``draftTitle.trim``、``setIsSaving``、``onRenameStory``、``setRenameStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:2118:2392:FUNCTION

.. rubric:: ``handleDelete``

.. code-block:: javascript

   async handleDelete()

处理 ``Delete`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``72``—``81`` 行；所属函数 ``StorySelectorButton``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsDeleting``、``onDeleteStory``、``setDeleteStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:3419:7450:FUNCTION

.. rubric:: ``stories.map callback @ 96``

.. code-block:: javascript

   stories.map callback @ 96(story)

作为 ``stories.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``146`` 行；所属函数 ``StorySelectorButton``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveResourceUrl``、``t``、``['failed', 'cancelled'].includes``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:3706:3736:FUNCTION

.. rubric:: ``onClick callback @ 100``

.. code-block:: javascript

   onClick callback @ 100()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``stories.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:6168:6202:FUNCTION

.. rubric:: ``onClick callback @ 129``

.. code-block:: javascript

   onClick callback @ 129(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``stories.map callback @ 96``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:6651:6674:FUNCTION

.. rubric:: ``onSelect callback @ 135``

.. code-block:: javascript

   onSelect callback @ 135()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``stories.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openRename``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:7006:7029:FUNCTION

.. rubric:: ``onSelect callback @ 139``

.. code-block:: javascript

   onSelect callback @ 139()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``stories.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openDelete``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:7627:7666:FUNCTION

.. rubric:: ``onOpenChange callback @ 152``

.. code-block:: javascript

   onOpenChange callback @ 152(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``StorySelectorButton``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRenameStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:8315:8359:FUNCTION

.. rubric:: ``onChange callback @ 163``

.. code-block:: javascript

   onChange callback @ 163(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``StorySelectorButton``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:8583:8609:FUNCTION

.. rubric:: ``onClick callback @ 167``

.. code-block:: javascript

   onClick callback @ 167()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``StorySelectorButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRenameStory``。

.. CWM-AST-FUNCTION src/features/story/StorySelectorButton.jsx:9142:9181:FUNCTION

.. rubric:: ``onOpenChange callback @ 179``

.. code-block:: javascript

   onOpenChange callback @ 179(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``StorySelectorButton``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteStory``。
