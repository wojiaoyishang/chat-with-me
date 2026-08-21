src/features/chat/ui/chatbox/components/VoicePermissionDialog 模块
================================================================

.. js:module:: src/features/chat/ui/chatbox/components/VoicePermissionDialog

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/chatbox/components/VoicePermissionDialog.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/VoicePermissionDialog``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------

``react``、``@/components/ui/dialog``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/VoicePermissionDialog.jsx:220:2125:FUNCTION

.. rubric:: ``memo callback @ 11``

.. code-block:: javascript

   memo callback @ 11({ dialog, onConfirm, onCancel, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``54`` 行。

**参数**

``{ dialog, onConfirm, onCancel, }``
   调用方传入的 `` dialog, onConfirm, onCancel, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={isOpen} onOpenChange={(open) => { // 只处理用户导致的关闭；受控 open 已经是 false 时不重复触发取消逻辑。 if (!open && isOpen) onCancel?.(); }} > <DialogContent className="sm:max-w-md"> <Dial…``。

**主要协作调用**：``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/VoicePermissionDialog.jsx:540:676:FUNCTION

.. rubric:: ``onOpenChange callback @ 21``

.. code-block:: javascript

   onOpenChange callback @ 21(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``21``—``24`` 行；所属函数 ``memo callback @ 11``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onCancel``。
