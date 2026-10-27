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
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``../highlight.js``、``../utils.js``、``./OutputToolbar.jsx``、``./useFollowOutputScroll.js``、``../../CodeBlock.css``、``@/lib/idleWork.js``、``@/hooks/useElementVisibility.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:574:1049:FUNCTION

.. js:function:: parseToolCommandContent(content)

   解析与 ``Tool Command Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``39`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ codeString: safeContent, language: 'text', }``、``{ codeString: safeContent.slice(match[0].length), language, }``。

   **主要协作调用**：``toSafeString(content).replace``、``toSafeString``、``safeContent.match``、``match[1].trim``、``normalizeHighlightLanguage``、``safeContent.slice``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1082:5487:FUNCTION

.. rubric:: ``memo callback @ 41``

.. code-block:: javascript

   memo callback @ 41({content = '', id, snapshot = false, messageReadonly = false})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``158`` 行。

**参数**

``{content = '', id, snapshot = false, messageReadonly = false}``
   调用方传入的 ``content = '', id, snapshot = false, messageReadonly = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div ref={visibilityRef} className={\x60${!snapshot && messageReadonly && visible ? 'card-tool-command-soft-breathe' : ''} relative my-1.5 overflow-hidden rounded-lg border border-…``。

**主要协作调用**：``useElementVisibility``、``useState``、``useMemo``、``useFollowOutputScroll``、``useEffect``、``codeString.trim``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1269:1374:FUNCTION

.. rubric:: ``useState callback @ 43``

.. code-block:: javascript

   useState callback @ 43()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``48`` 行；所属函数 ``memo callback @ 41``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1444:1506:FUNCTION

.. rubric:: ``useMemo callback @ 53``

.. code-block:: javascript

   useMemo callback @ 53()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``53``—``55`` 行；所属函数 ``memo callback @ 41``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parseToolCommandContent(content)``。

**主要协作调用**：``parseToolCommandContent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1787:2568:FUNCTION

.. rubric:: ``useEffect callback @ 69``

.. code-block:: javascript

   useEffect callback @ 69()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``69``—``94`` 行；所属函数 ``memo callback @ 41``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { isDisposed = true; cancelWork(); }``。

**主要协作调用**：``codeString.split``、``scheduleIdleWork``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:2030:2395:FUNCTION

.. rubric:: ``doHighlight``

.. code-block:: javascript

   async doHighlight()

实现 ``doHighlight`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``76``—``86`` 行；所属函数 ``useEffect callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``highlightCode``、``setHighlightState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:2486:2561:FUNCTION

.. rubric:: ``returned callback @ 90``

.. code-block:: javascript

   returned callback @ 90()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``90``—``93`` 行；所属函数 ``useEffect callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelWork``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:5488:5697:FUNCTION

.. rubric:: ``memo callback @ 158``

.. code-block:: javascript

   memo callback @ 158(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``158``—``165`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.id === next.id && prev.snapshot === next.snapshot && prev.messageReadonly === next.messageReadonly && prev.content === next.content )``。
