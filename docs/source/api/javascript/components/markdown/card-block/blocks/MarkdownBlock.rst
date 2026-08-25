src/components/markdown/card-block/blocks/MarkdownBlock 模块
============================================================================================================================

.. js:module:: src/components/markdown/card-block/blocks/MarkdownBlock

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/blocks/MarkdownBlock.jsx``
* **模块标识**：``src/components/markdown/card-block/blocks/MarkdownBlock``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``../constants.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/MarkdownBlock.jsx:117:507:FUNCTION

.. rubric:: ``memo callback @ 5``

.. code-block:: javascript

   memo callback @ 5({ content = '', id = '', allowTts = false, renderMarkdown = defaultRenderMarkdown, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``21`` 行。

**参数**

``{ content = '', id = '', allowTts = false, renderMarkdown = defaultRenderMarkdown, }``
   调用方传入的 ``content = '', id = '', allowTts = false, renderMarkdown = defaultRenderMarkdown,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="my-3" data-tts-source-id={id || undefined} data-tts-source-type="replacement" data-tts-ignore={allowTts ? undefined : 'true'} > {renderMarkdown(content)} </div> )``。

**主要协作调用**：``renderMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/MarkdownBlock.jsx:508:715:FUNCTION

.. rubric:: ``memo callback @ 21``

.. code-block:: javascript

   memo callback @ 21(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``28`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.content === next.content && prev.id === next.id && prev.allowTts === next.allowTts && prev.renderMarkdown === next.renderMarkdown )``。
