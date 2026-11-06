src/components/markdown/markdownParser 模块
==========================================================================================

.. js:module:: src/components/markdown/markdownParser

The same full-document syntax pipeline on the main thread and in the Worker.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/markdownParser.js``
* **模块标识**：``src/components/markdown/markdownParser``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``unified``、``remark-parse``、``remark-rehype``、``remark-gfm``、``remark-math``、``remark-directive``、``rehype-katex``、``unist-util-visit``、``./remarkDirectiveToComponent.js``、``./remarkWorkProcess.js``、``./remarkCollapseExecutionStatuses.js``、``./remarkVideoDirective.js``、``./remarkAudioDirective.js``、``./remarkCwmLinks.js``、``./remarkStudyDirectives.js``、``./rehypeDocumentTasks.js``、``./rehypeStreamingText.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/markdownParser.js:913:2339:FUNCTION

.. js:function:: parseMarkdownSyntax(content, {replacement = {}, renderSurface = 'conversation', snapshot = false, studyDirectivesEnabled, studyI…)

   The same full-document syntax pipeline on the main thread and in the Worker.

   **性质**：同步函数；导出 API；源码第 ``20``—``35`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``{replacement = {}, renderSurface = 'conversation', snapshot = false, studyDirectivesEnabled, studyI…`` （默认值 ``{}``）
      调用方传入的 ``replacement = , renderSurface = 'conversation', snapshot = false, studyDirectivesEnabled, studyI…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``tree``。

   **主要协作调用**：``unified().use(remarkParse).use(remarkGfm).use(remarkMath) .use(studyDirectivesEnabled ? [[remarkDirective], [remarkStud…``、``unified().use(remarkParse).use(remarkGfm).use(remarkMath) .use``、``unified().use(remarkParse).use(remarkGfm).use``、``unified().use(remarkParse).use``、``unified().use``、``unified``、``processor.runSync``、``processor.parse``、``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/markdownParser.js:2229:2318:FUNCTION

.. rubric:: ``visit callback @ 33``

.. code-block:: javascript

   visit callback @ 33(node, index, parent)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``parseMarkdownSyntax``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
