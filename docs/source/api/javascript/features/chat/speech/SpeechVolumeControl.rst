src/features/chat/speech/SpeechVolumeControl 模块
======================================================================================================

.. js:module:: src/features/chat/speech/SpeechVolumeControl

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/SpeechVolumeControl.jsx``
* **模块标识**：``src/features/chat/speech/SpeechVolumeControl``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/slider``、``@/components/ui/popover``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/SpeechVolumeControl.jsx:256:1727:FUNCTION

.. js:function:: SpeechVolumeControl({ volume = 1, onChange, onOpenChange, open, contentRef, popoverZIndex = 10030, triggerClassName = '…)

   渲染 ``SpeechVolumeControl`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``52`` 行。

   **参数**

   ``{ volume = 1, onChange, onOpenChange, open, contentRef, popoverZIndex = 10030, triggerClassName = '…``
      调用方传入的 ``volume = 1, onChange, onOpenChange, open, contentRef, popoverZIndex = 10030, triggerClassName = '…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Popover open={open} onOpenChange={onOpenChange}> <PopoverTrigger asChild> <Button variant="ghost" size="icon" aria-label="TTS 播放音量" title="TTS 播放音量" className={\x60shrink-0 rounde…``。

   **主要协作调用**：``Math.round``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/SpeechVolumeControl.jsx:1613:1649:FUNCTION

.. rubric:: ``onValueChange callback @ 47``

.. code-block:: javascript

   onValueChange callback @ 47([value])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``SpeechVolumeControl``。

**参数**

``[value]``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。
