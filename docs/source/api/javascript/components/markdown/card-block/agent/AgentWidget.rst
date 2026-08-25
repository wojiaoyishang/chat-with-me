src/components/markdown/card-block/agent/AgentWidget 模块
======================================================================================================================

.. js:module:: src/components/markdown/card-block/agent/AgentWidget

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/agent/AgentWidget.jsx``
* **模块标识**：``src/components/markdown/card-block/agent/AgentWidget``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``../constants.jsx``、``../expandedStore.js``、``../useExpandedState.js``、``../utils.js``、``./AgentBody.jsx``、``./AgentHeader.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentWidget.jsx:535:1845:FUNCTION

.. js:function:: stripLeadingMarkdownMarker(content)

   实现 ``stripLeadingMarkdownMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``52`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``lines.join('\n')``、``normalized``。

   **主要协作调用**：``toSafeString(content).replace(/\r\n/g, '\n').replace``、``toSafeString(content).replace``、``toSafeString``、``normalized.split``、``lines[index].trim``、``originalLine.trimStart``、``originalLine.slice``、``body.toLowerCase``、``lowerBody.startsWith``、``body.slice(MARKDOWN_PROTOCOL_MARKER.length).replace``、``body.slice``、``lines.join``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentWidget.jsx:1873:5495:FUNCTION

.. rubric:: ``memo callback @ 54``

.. code-block:: javascript

   memo callback @ 54({ content = '', Icon = Bot, id, isProcessing = false, title = 'Sub-Agent', defaultExpanded = false,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``169`` 行。

**参数**

``{ content = '', Icon = Bot, id, isProcessing = false, title = 'Sub-Agent', defaultExpanded = false,…``
   调用方传入的 ``content = '', Icon = Bot, id, isProcessing = false, title = 'Sub-Agent', defaultExpanded = false,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60 w-full my-2 border rounded-lg overflow-hidden transition-colors duration-200 ${statusConfig.bg} ${statusConfig.border} \x60} > <AgentHeader Icon={Icon} expandedKe…``。

**主要协作调用**：``useMemo``、``useExpandedState``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentWidget.jsx:2382:2447:FUNCTION

.. rubric:: ``useMemo callback @ 65``

.. code-block:: javascript

   useMemo callback @ 65()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``67`` 行；所属函数 ``memo callback @ 54``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getExpandedKey(contextId, id, type)``。

**主要协作调用**：``getExpandedKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentWidget.jsx:2649:3772:FUNCTION

.. rubric:: ``useMemo callback @ 77``

.. code-block:: javascript

   useMemo callback @ 77()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``108`` 行；所属函数 ``memo callback @ 54``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ cleanContent: clean, isDone, isFailed, lastLine, hasContent, }``。

**主要协作调用**：``stripLeadingMarkdownMarker``、``safeContent.trim``、``trimmedRaw.endsWith``、``safeContent.replace(/\n?\[AGENT-DONE\]\s*$/, '').trim``、``safeContent.replace``、``safeContent.replace(/\n?\[AGENT-FAILED\]\s*$/, '').trim``、``clean.trim``、``stripCardReplaceTokensForPreview``、``getLastLineForPreview``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentWidget.jsx:3864:4636:FUNCTION

.. rubric:: ``useMemo callback @ 112``

.. code-block:: javascript

   useMemo callback @ 112()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``140`` 行；所属函数 ``memo callback @ 54``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ bg: 'bg-red-50/50', border: 'border-red-100', iconBg: 'bg-red-100 text-red-600', dot: 'bg-red-500', label: 'Failed', }``、``{ bg: 'bg-zinc-50/30', border: 'border-zinc-200/60', iconBg: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-500', label: 'Completed', }``、``{ bg: 'bg-white', border: 'border-zinc-200', iconBg: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500', label: 'Running', }``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/AgentWidget.jsx:5496:5885:FUNCTION

.. rubric:: ``memo callback @ 169``

.. code-block:: javascript

   memo callback @ 169(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``180`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.contextId === next.contextId && prev.content === next.content && prev.id === next.id && prev.isProcessing === next.isProcessing && prev.title === next.title && prev.default…``。
