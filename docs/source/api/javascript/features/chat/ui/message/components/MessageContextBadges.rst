src/features/chat/ui/message/components/MessageContextBadges 模块
======================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageContextBadges

Fallback message-level context status for layouts without a left-side name row. Compaction is intentionally not rendered here: - left messages show the compacted icon beside the name; - middle/right messages expose compaction as a link inside message details.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageContextBadges.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageContextBadges``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``./IgnoredContextIndicator.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageContextBadges.jsx:422:1102:FUNCTION

.. rubric:: ``memo callback @ 11``

.. code-block:: javascript

   memo callback @ 11({ conversationId, messageId, state, align = 'left', showForgotten = true, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``33`` 行。

**参数**

``{ conversationId, messageId, state, align = 'left', showForgotten = true, }``
   调用方传入的 ``conversationId, messageId, state, align = 'left', showForgotten = true,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60mt-1 flex w-full flex-wrap items-center gap-1.5 ${align === 'right' ? 'justify-end pr-12' : 'justify-start pl-2 lg:pl-10'}\x60}> <IgnoredContextIndicator conversat…``。
