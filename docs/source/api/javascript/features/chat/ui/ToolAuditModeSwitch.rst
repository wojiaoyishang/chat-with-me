src/features/chat/ui/ToolAuditModeSwitch 模块
==============================================================================================

.. js:module:: src/features/chat/ui/ToolAuditModeSwitch

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/ToolAuditModeSwitch.jsx``
* **模块标识**：``src/features/chat/ui/ToolAuditModeSwitch``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/popover``、``@/components/ui/dialog``、``./MobileSettingsContent.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ToolAuditModeSwitch.jsx:965:3815:FUNCTION

.. js:function:: ToolAuditModeSwitch({ value = 'off', onChange, t, isMobile = false, layerClass = '' })

   渲染 ``ToolAuditModeSwitch`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``32``—``98`` 行。

   **参数**

   ``{ value = 'off', onChange, t, isMobile = false, layerClass = '' }``
      调用方传入的 ``value = 'off', onChange, t, isMobile = false, layerClass = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={setOpen}> <DialogTrigger asChild>{trigger}</DialogTrigger> <MobileSettingsContent title={t('tool_audit_policy')}>{options}</MobileSettingsConte…``、``( <Popover open={open} onOpenChange={setOpen}> <PopoverTrigger asChild>{trigger}</PopoverTrigger> <PopoverContent side="top" align="start" sideOffset={8} collisionPadding={12} cla…``。

   **主要协作调用**：``useState``、``MODES.find``、``t``、``MODES.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolAuditModeSwitch.jsx:1156:1183:FUNCTION

.. rubric:: ``MODES.find callback @ 34``

.. code-block:: javascript

   MODES.find callback @ 34(mode)

作为 ``MODES.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``ToolAuditModeSwitch``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolAuditModeSwitch.jsx:1344:2428:FUNCTION

.. rubric:: ``MODES.map callback @ 38``

.. code-block:: javascript

   MODES.map callback @ 38({ id, icon: Icon, label, description, color })

作为 ``MODES.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``59`` 行；所属函数 ``ToolAuditModeSwitch``。

**参数**

``{ id, icon: Icon, label, description, color }``
   调用方传入的 ``id, icon: Icon, label, description, color`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolAuditModeSwitch.jsx:1602:1709:FUNCTION

.. rubric:: ``onClick callback @ 44``

.. code-block:: javascript

   onClick callback @ 44()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``44``—``47`` 行；所属函数 ``MODES.map callback @ 38``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setOpen``。
