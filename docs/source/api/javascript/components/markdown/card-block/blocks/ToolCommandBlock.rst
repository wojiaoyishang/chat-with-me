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

``react``、``../highlight.js``、``../utils.js``、``./OutputToolbar.jsx``、``./useFollowOutputScroll.js``、``../../CodeBlock.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:452:927:FUNCTION

.. js:function:: parseToolCommandContent(content)

   解析与 ``Tool Command Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``37`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ codeString: safeContent, language: 'text', }``、``{ codeString: safeContent.slice(match[0].length), language, }``。

   **主要协作调用**：``toSafeString(content).replace``、``toSafeString``、``safeContent.match``、``match[1].trim``、``normalizeHighlightLanguage``、``safeContent.slice``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:960:5006:FUNCTION

.. rubric:: ``memo callback @ 39``

.. code-block:: javascript

   memo callback @ 39({content = '', id})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``153`` 行。

**参数**

``{content = '', id}``
   调用方传入的 ``content = '', id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="card-tool-command-soft-breathe relative my-1.5 overflow-hidden rounded-lg border border-sky-200/80 bg-sky-50/90 text-slate-700 shadow-[0_8px_24px_rgba(14,165,233…``。

**主要协作调用**：``useState``、``useMemo``、``useFollowOutputScroll``、``useEffect``、``codeString.trim``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1043:1148:FUNCTION

.. rubric:: ``useState callback @ 40``

.. code-block:: javascript

   useState callback @ 40()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``45`` 行；所属函数 ``memo callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1218:1280:FUNCTION

.. rubric:: ``useMemo callback @ 50``

.. code-block:: javascript

   useMemo callback @ 50()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``52`` 行；所属函数 ``memo callback @ 39``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parseToolCommandContent(content)``。

**主要协作调用**：``parseToolCommandContent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1561:2182:FUNCTION

.. rubric:: ``useEffect callback @ 66``

.. code-block:: javascript

   useEffect callback @ 66()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``90`` 行；所属函数 ``memo callback @ 39``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { isDisposed = true; }``。

**主要协作调用**：``doHighlight``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:1720:2085:FUNCTION

.. rubric:: ``doHighlight``

.. code-block:: javascript

   async doHighlight()

实现 ``doHighlight`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``73``—``83`` 行；所属函数 ``useEffect callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``highlightCode``、``setHighlightState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:2126:2175:FUNCTION

.. rubric:: ``returned callback @ 87``

.. code-block:: javascript

   returned callback @ 87()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``89`` 行；所属函数 ``useEffect callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolCommandBlock.jsx:5007:5116:FUNCTION

.. rubric:: ``memo callback @ 153``

.. code-block:: javascript

   memo callback @ 153(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``153``—``158`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.id === next.id && prev.content === next.content )``。
