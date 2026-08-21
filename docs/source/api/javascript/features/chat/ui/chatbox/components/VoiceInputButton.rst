src/features/chat/ui/chatbox/components/VoiceInputButton 模块
===========================================================

.. js:module:: src/features/chat/ui/chatbox/components/VoiceInputButton

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/chatbox/components/VoiceInputButton.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/VoiceInputButton``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------

``react``、``lucide-react``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/VoiceInputButton.jsx:106:1986:FUNCTION

.. rubric:: ``memo callback @ 4``

.. code-block:: javascript

   memo callback @ 4({ isMobile, isMobileVoiceMode, isRecording, isPending, disabled, onClick, labels = {}, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``50`` 行。

**参数**

``{ isMobile, isMobileVoiceMode, isRecording, isPending, disabled, onClick, labels = {}, }``
   调用方传入的 `` isMobile, isMobileVoiceMode, isRecording, isPending, disabled, onClick, labels = , `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button type="button" onClick={onClick} disabled={isDisabled} className="inline-flex h-7 items-center justify-center rounded-full border border-red-200 bg-red-50 px-3 text-xs fo…``、``( <button type="button" onClick={onClick} disabled={isDisabled} className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-6…``。
