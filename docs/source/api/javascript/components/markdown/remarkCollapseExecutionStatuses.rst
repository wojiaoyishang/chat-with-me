src/components/markdown/remarkCollapseExecutionStatuses 模块
============================================================================================================================

.. js:module:: src/components/markdown/remarkCollapseExecutionStatuses

Merge visually consecutive calls of the same tool in one execution. The first host stays mounted while new calls arrive. A continuation is the current state of the same stretch of work, not another tool call or a visual group boundary. Original records stay in the replacement map for exact per-call navigation.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/remarkCollapseExecutionStatuses.js``
* **模块标识**：``src/components/markdown/remarkCollapseExecutionStatuses``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``unist-util-visit``、``./replacementProtocol.js``、``../../features/execution/executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:242:301:FUNCTION

.. js:function:: getCardId(node)

   读取与 ``Card Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``6`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(node?.data?.hProperties?.id || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:324:519:FUNCTION

.. js:function:: sameExecution(left, right)

   实现 ``sameExecution`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``10`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:537:1070:FUNCTION

.. js:function:: getCard(node, replacement)

   读取与 ``Card`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``25`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``normalized.exists && !normalized.contextStatus && !normalized.snapshot ? normalized : null``。

   **主要协作调用**：``getCardId``、``normalizeReplacementEntry``。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:1071:4642:FUNCTION

.. js:function:: remarkCollapseExecutionStatuses({replacement = {}, renderSurface = 'conversation', snapshot = false})

   Merge visually consecutive calls of the same tool in one execution. The first host stays mounted while new calls arrive. A continuation is the current state of the same stretch of work, not another tool call or a visual group boundary. Original records stay in the replacement map for exact per-call navigation.

   **性质**：同步函数；导出 API；源码第 ``33``—``97`` 行。

   **参数**

   ``{replacement = {}, renderSurface = 'conversation', snapshot = false}`` （默认值 ``{}``）
      调用方传入的 ``replacement = , renderSurface = 'conversation', snapshot = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree) => { if (snapshot) return; visit(tree, (node) => Array.isArray(node.children), (parent) => { const collapsed = []; let group = null; const flush = () => { if (!group) retur…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:1540:4639:FUNCTION

.. rubric:: ``returned callback @ 34``

.. code-block:: javascript

   returned callback @ 34(tree)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``34``—``96`` 行；所属函数 ``remarkCollapseExecutionStatuses``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:1602:1641:FUNCTION

.. rubric:: ``visit callback @ 36``

.. code-block:: javascript

   visit callback @ 36(node)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``returned callback @ 34``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:1642:4631:FUNCTION

.. rubric:: ``visit callback @ 36``

.. code-block:: javascript

   visit callback @ 36(parent)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``95`` 行；所属函数 ``returned callback @ 34``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getCard``、``parseExecutionStatus``、``sameExecution``、``['executionStatus', 'markdown'].includes``、``card.content.trim``、``String(renderSurface).toLowerCase``、``String``、``group.hidden.push``、``getExecutionStatusGroupKey``、``flush``、``collapsed.push``、``group.nodes.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkCollapseExecutionStatuses.js:1747:2357:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   flush()

实现 ``flush`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``52`` 行；所属函数 ``visit callback @ 36``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``、``group.nodes.map``、``getCardId``、``collapsed.push``。
