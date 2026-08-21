src/features/chat/ui/chatbox/components/SendButton 模块
=====================================================

.. js:module:: src/features/chat/ui/chatbox/components/SendButton

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/chatbox/components/SendButton.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/SendButton``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------

``react``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/SendButton.jsx:69:4891:FUNCTION

.. rubric:: ``memo callback @ 3``

.. code-block:: javascript

   memo callback @ 3({status, messageContent, attachmentsMeta, onClick, taskModeActive = false, taskInterruptPending = f…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3``—``108`` 行。

**参数**

``{status, messageContent, attachmentsMeta, onClick, taskModeActive = false, taskInterruptPending = f…``
   调用方传入的 ``status, messageContent, attachmentsMeta, onClick, taskModeActive = false, taskInterruptPending = f…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button type="button" onClick={onClick} disabled={sendButtonStyle.disabled} aria-label={status === 'generating' && taskModeActive && messageContent.trim() ? t('task_mode_interru…``。

**主要协作调用**：``useMemo``、``messageContent.trim``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/SendButton.jsx:220:4304:FUNCTION

.. rubric:: ``useMemo callback @ 4``

.. code-block:: javascript

   useMemo callback @ 4()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``4``—``95`` 行；所属函数 ``memo callback @ 3``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ state: 'loading', className: 'text-white bg-blue-600 cursor-wait', icon: ( <div className="relative w-6 h-6"> <div className="absolute inset-[-9px] border-3 border-blue-300 bord…``、``{ state: 'disabled', className: 'text-gray-400 bg-gray-200 cursor-not-allowed', icon: baseIcon, disabled: true, }``、``{ state: 'loading', className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer', icon: ( <div className="relative w-6 h-6"> <div className="absolute inset-[-9px] border-3…``、``{ state: canSendTaskInterruption ? 'task-interrupt' : 'generating', className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer', icon: canSendTaskInterruption ? baseIcon…``。

**主要协作调用**：``messageContent.trim``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/SendButton.jsx:4892:5313:FUNCTION

.. rubric:: ``memo callback @ 108``

.. code-block:: javascript

   memo callback @ 108(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``117`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.status === nextProps.status && prevProps.messageContent === nextProps.messageContent && prevProps.attachmentsMeta === nextProps.attachmentsMeta && prevProps.onClick ==…``。
