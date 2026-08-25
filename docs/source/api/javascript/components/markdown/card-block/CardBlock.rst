src/components/markdown/card-block/CardBlock 模块
======================================================================================================

.. js:module:: src/components/markdown/card-block/CardBlock

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/CardBlock.jsx``
* **模块标识**：``src/components/markdown/card-block/CardBlock``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./agent/AgentWidget.jsx``、``./blocks/ErrorBlock.jsx``、``./blocks/HtmlBlock.jsx``、``./blocks/MarkdownBlock.jsx``、``./blocks/QueuingBlock.jsx``、``./blocks/TextBlock.jsx``、``./blocks/ToolCommandBlock.jsx``、``./blocks/ToolLogBlock.jsx``、``./cardBlockAnimations.css``、``./constants.jsx``、``./status/StatusWidget.jsx``、``./task/TaskChecklistCard.jsx``、``./task/TaskModeWidget.jsx``、``./task/TaskUserMessageCard.jsx``、``@/features/story/StoryCard.jsx``、``./widget/WidgetHost.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/CardBlock.jsx:1200:1268:FUNCTION

.. js:function:: shouldCompareRenderContext(type)

   实现 ``shouldCompareRenderContext`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``40`` 行。

   **参数**

   ``type``
      调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``CARD_TYPES_WITH_NESTED_MARKDOWN.has(type)``。

   **主要协作调用**：``CARD_TYPES_WITH_NESTED_MARKDOWN.has``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/CardBlock.jsx:1297:1890:FUNCTION

.. rubric:: ``memo callback @ 42``

.. code-block:: javascript

   memo callback @ 42({type, content})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``57`` 行。

**参数**

``{type, content}``
   调用方传入的 ``type, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="bg-red-50/40 border border-red-200 p-3 my-2 rounded-md"> <div className="text-red-700 text-xs mb-1.5 flex items-center gap-1.5"> <span className="bg-red-200 text…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/CardBlock.jsx:1891:2004:FUNCTION

.. rubric:: ``memo callback @ 57``

.. code-block:: javascript

   memo callback @ 57(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``62`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.type === next.type && prev.content === next.content )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/CardBlock.jsx:2075:6675:FUNCTION

.. rubric:: ``memo callback @ 66``

.. code-block:: javascript

   memo callback @ 66({ content = '', id, allowTts = false, conversationId = null, type = 'markdown', contextId = '', rep…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``253`` 行。

**参数**

``{ content = '', id, allowTts = false, conversationId = null, type = 'markdown', contextId = '', rep…``
   调用方传入的 ``content = '', id, allowTts = false, conversationId = null, type = 'markdown', contextId = '', rep…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <MarkdownBlock {...commonProps} /> )``、``( <TextBlock id={id} content={content} /> )``、``( <HtmlBlock id={id} content={content} /> )``、``( <ToolCommandBlock id={id} content={content} /> )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/CardBlock.jsx:6676:7610:FUNCTION

.. rubric:: ``memo callback @ 253``

.. code-block:: javascript

   memo callback @ 253(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``253``—``279`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``( prev.replacement === next.replacement && prev.renderMarkdown === next.renderMarkdown )``。

**主要协作调用**：``shouldCompareRenderContext``。
