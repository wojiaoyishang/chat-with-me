src/features/settings-runtime/SettingsReadonlyMarkdown 模块
==========================================================================================================================

.. js:module:: src/features/settings-runtime/SettingsReadonlyMarkdown

Readonly prose uses no chat/ESC/directive interpreter or editable controls.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsReadonlyMarkdown.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsReadonlyMarkdown``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react-markdown``、``remark-gfm``、``lucide-react``、``@/components/ui/button``、``@/lib/tools.jsx``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsReadonlyMarkdown.jsx:607:1911:FUNCTION

.. js:function:: SettingsReadonlyMarkdown({ item, value })

   Readonly prose uses no chat/ESC/directive interpreter or editable controls.

   **性质**：同步函数；导出 API；源码第 ``16``—``32`` 行。

   **参数**

   ``{ item, value }``
      调用方传入的 ``item, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<section className="min-w-0 space-y-3" data-settings-readonly-markdown="true"> {(item.text || item.copyable !== false) && <div className="flex items-center justify-between gap-3">…``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsReadonlyMarkdown.jsx:310:406:FUNCTION

.. rubric:: ``a``

.. code-block:: javascript

   a({ children, href })

实现 ``a`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``10`` 行。

**参数**

``{ children, href }``
   调用方传入的 ``children, href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsReadonlyMarkdown.jsx:416:503:FUNCTION

.. rubric:: ``img``

.. code-block:: javascript

   img({ alt })

实现 ``img`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``11`` 行。

**参数**

``{ alt }``
   调用方传入的 ``alt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsReadonlyMarkdown.jsx:515:603:FUNCTION

.. rubric:: ``input``

.. code-block:: javascript

   input({ checked })

实现 ``input`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``12`` 行。

**参数**

``{ checked }``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsReadonlyMarkdown.jsx:836:980:FUNCTION

.. rubric:: ``copy``

.. code-block:: javascript

   async copy()

实现 ``copy`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``18``—``21`` 行；所属函数 ``SettingsReadonlyMarkdown``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copyTextToClipboard``、``toast.success``、``toast.error``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsReadonlyMarkdown.jsx:1414:1436:FUNCTION

.. rubric:: ``onClick callback @ 26``

.. code-block:: javascript

   onClick callback @ 26()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``SettingsReadonlyMarkdown``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copy``。
