src/features/settings-runtime/SettingsConversationPicker 模块
==============================================================================================================================

.. js:module:: src/features/settings-runtime/SettingsConversationPicker

Reuse the shared conversation list in a selection-only, server-scoped mode.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsConversationPicker.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsConversationPicker``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/dialog``、``@/components/sidebar/ConversationsList.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationPicker.jsx:339:3392:FUNCTION

.. js:function:: SettingsConversationPicker({ item, value, onChange, context = {}, })

   Reuse the shared conversation list in a selection-only, server-scoped mode.

   **性质**：同步函数；导出 API；源码第 ``14``—``97`` 行。

   **参数**

   ``{ item, value, onChange, context = {}, }``
      调用方传入的 ``item, value, onChange, context = ,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-0 space-y-2 py-2" data-settings-conversation-picker="true" > <label className="text-sm font-medium"> {item.text} {item.required && <span className="ml-1 te…``。

   **主要协作调用**：``useState``、``(item.options || []).find``、``Boolean``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationPicker.jsx:615:670:FUNCTION

.. rubric:: ``(item.options || []).find callback @ 22``

.. code-block:: javascript

   (item.options || []).find callback @ 22(option)

作为 ``(item.options || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``SettingsConversationPicker``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationPicker.jsx:1375:1394:FUNCTION

.. rubric:: ``onClick callback @ 43``

.. code-block:: javascript

   onClick callback @ 43()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``SettingsConversationPicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationPicker.jsx:3012:3300:FUNCTION

.. rubric:: ``onSelect callback @ 83``

.. code-block:: javascript

   onSelect callback @ 83(id)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``83``—``90`` 行；所属函数 ``SettingsConversationPicker``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(item.options || []).find``、``onChange``、``setOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationPicker.jsx:3082:3140:FUNCTION

.. rubric:: ``(item.options || []).find callback @ 85``

.. code-block:: javascript

   (item.options || []).find callback @ 85(option)

作为 ``(item.options || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``onSelect callback @ 83``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。
