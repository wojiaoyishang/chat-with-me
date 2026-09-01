src/components/markdown/card-block/blocks/ToolCommandBlock 模块
==================================================================================================================================

.. js:module:: src/components/markdown/card-block/blocks/ToolCommandBlock

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/blocks/ToolCommandBlock.jsx``
* **模块标识**：``src/components/markdown/card-block/blocks/ToolCommandBlock``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``../highlight.js``、``../utils.js``、``./OutputToolbar.jsx``、``./useFollowOutputScroll.js``、``../../CodeBlock.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:480:955:FUNCTION

.. js:function:: parseToolCommandContent(content)

   解析与 ``Tool Command Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``38`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ codeString: safeContent, language: 'text', }``、``{ codeString: safeContent.slice(match[0].length), language, }``。

   **主要协作调用**：``toSafeString(content).replace``、``toSafeString``、``safeContent.match``、``match[1].trim``、``normalizeHighlightLanguage``、``safeContent.slice``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:988:4911:FUNCTION

.. rubric:: ``memo callback @ 40``

.. code-block:: javascript

   memo callback @ 40({content = '', id})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``152`` 行。

**参数**

``{content = '', id}``
   调用方传入的 ``content = '', id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="card-tool-command-soft-breathe relative my-1.5 overflow-hidden rounded-lg border border-sky-200/80 bg-sky-50/90 text-slate-700 shadow-[0_8px_24px_rgba(14,165,233…``。

**主要协作调用**：``useRef``、``useMemo``、``useFollowOutputScroll``、``useLayoutEffect``、``codeString.trim``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1115:1177:FUNCTION

.. rubric:: ``useMemo callback @ 46``

.. code-block:: javascript

   useMemo callback @ 46()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``46``—``48`` 行；所属函数 ``memo callback @ 40``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parseToolCommandContent(content)``。

**主要协作调用**：``parseToolCommandContent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1464:2889:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 62``

.. code-block:: javascript

   useLayoutEffect callback @ 62()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``62``—``106`` 行；所属函数 ``memo callback @ 40``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { isDisposed = true; }``。

**主要协作调用**：``doHighlight``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:2052:2792:FUNCTION

.. rubric:: ``doHighlight``

.. code-block:: javascript

   async doHighlight()

实现 ``doHighlight`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``81``—``99`` 行；所属函数 ``useLayoutEffect callback @ 62``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadHljs``、``ensureHighlightLanguage``、``codeRef.current.classList.remove``、``codeRef.current.classList.add``、``hljsInst.highlightElement``、``console.error``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:2833:2882:FUNCTION

.. rubric:: ``returned callback @ 103``

.. code-block:: javascript

   returned callback @ 103()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``useLayoutEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:4912:5021:FUNCTION

.. rubric:: ``memo callback @ 152``

.. code-block:: javascript

   memo callback @ 152(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``152``—``157`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.id === next.id && prev.content === next.content )``。
