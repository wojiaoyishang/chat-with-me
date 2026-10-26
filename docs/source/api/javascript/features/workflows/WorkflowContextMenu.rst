src/features/workflows/WorkflowContextMenu 模块
==================================================================================================

.. js:module:: src/features/workflows/WorkflowContextMenu

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowContextMenu.jsx``
* **模块标识**：``src/features/workflows/WorkflowContextMenu``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``./workflowModel.js``、``@/components/ui/dropdown-menu``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:534:1715:FUNCTION

.. js:function:: NodeMenuEntries({ groups = [], nodes = [], onChoose })

   渲染 ``NodeMenuEntries`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``65`` 行。

   **参数**

   ``{ groups = [], nodes = [], onChoose }``
      调用方传入的 ``groups = , nodes = , onChoose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> {nodes.map((definition) => ( <DropdownMenuItem key={\x60node:${definition.kind}\x60} onSelect={() => onChoose(definition)} title={definition.display?.description} > <span className…``。

   **主要协作调用**：``nodes.map``、``groups.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:1715:6420:FUNCTION

.. js:function:: WorkflowContextMenu({ menu, onClose, onCopy, onPaste, onDuplicate, onDelete, onRename, onAdd, onPortMode, hasClipboard,…)

   渲染 ``WorkflowContextMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``67``—``219`` 行。

   **参数**

   ``{ menu, onClose, onCopy, onPaste, onDuplicate, onDelete, onRename, onAdd, onPortMode, hasClipboard,…``
      调用方传入的 ``menu, onClose, onCopy, onPaste, onDuplicate, onDelete, onRename, onAdd, onPortMode, hasClipboard,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <DropdownMenu open onOpenChange={(open) => { if (!open) onClose(); }} > <DropdownMenuTrigger asChild> <button type="button" aria-label="工作流右键菜单锚点" className="workflow-context-an…``。

   **主要协作调用**：``workflowNodeMenuTree``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:637:1112:FUNCTION

.. rubric:: ``nodes.map callback @ 33``

.. code-block:: javascript

   nodes.map callback @ 33(definition)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``46`` 行；所属函数 ``NodeMenuEntries``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:743:769:FUNCTION

.. rubric:: ``onSelect callback @ 36``

.. code-block:: javascript

   onSelect callback @ 36()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``nodes.map callback @ 33``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChoose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:1133:1698:FUNCTION

.. rubric:: ``groups.map callback @ 47``

.. code-block:: javascript

   groups.map callback @ 47(group)

作为 ``groups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``62`` 行；所属函数 ``NodeMenuEntries``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``group.path.join``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:2105:2154:FUNCTION

.. rubric:: ``onOpenChange callback @ 93``

.. code-block:: javascript

   onOpenChange callback @ 93(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``95`` 行；所属函数 ``WorkflowContextMenu``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:2502:2614:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 108``

.. code-block:: javascript

   onEscapeKeyDown callback @ 108(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``112`` 行；所属函数 ``WorkflowContextMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:2778:2806:FUNCTION

.. rubric:: ``onSelect callback @ 117``

.. code-block:: javascript

   onSelect callback @ 117()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``WorkflowContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPortMode``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowContextMenu.jsx:2925:2951:FUNCTION

.. rubric:: ``onSelect callback @ 121``

.. code-block:: javascript

   onSelect callback @ 121()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``WorkflowContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPortMode``。
