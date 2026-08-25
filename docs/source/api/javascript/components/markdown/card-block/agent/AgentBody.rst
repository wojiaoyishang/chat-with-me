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

``react``、``../constants.jsx``、``../useExpandedState.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentBody.jsx:168:809:FUNCTION

.. rubric:: ``memo callback @ 6``

.. code-block:: javascript

   memo callback @ 6({ cleanContent, expandedKey, hasContent, renderMarkdown = defaultRenderMarkdown, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``29`` 行。

**参数**

``{ cleanContent, expandedKey, hasContent, renderMarkdown = defaultRenderMarkdown, }``
   调用方传入的 ``cleanContent, expandedKey, hasContent, renderMarkdown = defaultRenderMarkdown,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="border-t p-4 bg-white"> {hasContent ? ( renderMarkdown(cleanContent) ) : ( <div className="text-[12px] text-zinc-400 italic"> 暂无正文内容 </div> )} </div> )``。

**主要协作调用**：``useExpandedState``、``renderMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentBody.jsx:810:1049:FUNCTION

.. rubric:: ``memo callback @ 29``

.. code-block:: javascript

   memo callback @ 29(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``36`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.cleanContent === next.cleanContent && prev.expandedKey === next.expandedKey && prev.hasContent === next.hasContent && prev.renderMarkdown === next.renderMarkdown )``。
