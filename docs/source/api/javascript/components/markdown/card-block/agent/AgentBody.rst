src/components/markdown/card-block/agent/AgentBody 模块
==================================================================================================================

.. js:module:: src/components/markdown/card-block/agent/AgentBody

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/agent/AgentBody.jsx``
* **模块标识**：``src/components/markdown/card-block/agent/AgentBody``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``../constants.jsx``、``../useExpandedState.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentBody.jsx:213:969:FUNCTION

.. rubric:: ``memo callback @ 8``

.. code-block:: javascript

   memo callback @ 8({ cleanContent, expandedKey, hasContent, isFinished, renderMarkdown = defaultRenderMarkdown })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``27`` 行。

**参数**

``{ cleanContent, expandedKey, hasContent, isFinished, renderMarkdown = defaultRenderMarkdown }``
   调用方传入的 ``cleanContent, expandedKey, hasContent, isFinished, renderMarkdown = defaultRenderMarkdown`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="border-t p-4 bg-white"> {hasContent ? ( renderMarkdown(cleanContent) ) : ( <div className="flex items-center gap-2 text-[12px] text-zinc-400"> {!isFinished && <L…``。

**主要协作调用**：``useExpandedState``、``renderMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentBody.jsx:970:1292:FUNCTION

.. rubric:: ``memo callback @ 28``

.. code-block:: javascript

   memo callback @ 28(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``36`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.cleanContent === next.cleanContent && prev.expandedKey === next.expandedKey && prev.hasContent === next.hasContent && prev.isFinished === next.isFinished && prev.renderMark…``。
