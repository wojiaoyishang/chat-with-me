src/features/execution/workProcessModel 模块
============================================================================================

.. js:module:: src/features/execution/workProcessModel

A display projection only. Never use this group to rebuild provider history.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/workProcessModel.js``
* **模块标识**：``src/features/execution/workProcessModel``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``../../components/markdown/replacementProtocol.js``、``./executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:372:1003:FUNCTION

.. js:function:: workProcessEntry(replacement, id, type)

   A display projection only. Never use this group to rebuild provider history.

   **性质**：同步函数；导出 API；源码第 ``8``—``16`` 行。

   **参数**

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``type`` （默认值 ``''``）
      调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{...entry, workProcess: meta || null}``、``execution && execution.inlineKind !== 'feedback' ? {...entry, execution} : null``。

   **主要协作调用**：``normalizeReplacementEntry``、``parseExecutionStatus``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:1003:1236:FUNCTION

.. js:function:: processIdentity(entry)

   处理与 ``Identity`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``18``—``21`` 行。

   **参数**

   ``entry``
      调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{conversationId: source.conversationId || '', runId: source.runId || '', executionId: source.executionId || ''}``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:1236:1407:FUNCTION

.. js:function:: sameProcess(left, right)

   实现 ``sameProcess`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``23``—``25`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``['conversationId', 'runId', 'executionId'].every((key) => !left[key] || !right[key] || left[key] === right[key])``。

   **主要协作调用**：``['conversationId', 'runId', 'executionId'].every``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:1407:1916:FUNCTION

.. js:function:: reasoningRecord(entry)

   实现 ``reasoningRecord`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``27``—``34`` 行。

   **参数**

   ``entry``
      调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{...entry, state, text: entry.content.replace(marker, '').trim(), startedAt: entry.workProcess?.startedAt, finishedAt: entry.workProcess?.finishedAt}``。

   **主要协作调用**：``entry.content.matchAll``、``matches.at(-1)?.[1]?.toUpperCase``、``matches.at``、``entry.content.replace(marker, '').trim``、``entry.content.replace``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:1916:5965:FUNCTION

.. js:function:: projectWorkProcess(entries, {live = null, isStreaming = false, tail = false})

   Keep a finished tool distinct from the still-running user turn.

   **性质**：同步函数；导出 API；源码第 ``37``—``91`` 行。

   **参数**

   ``entries``
      调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{live = null, isStreaming = false, tail = false}`` （默认值 ``{}``）
      调用方传入的 ``live = null, isStreaming = false, tail = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{records, calls, failures, stopped, state, label: String(label), duration, target: current?.execution || latestExecution, // Completed reasoning spans aren't counted as completed…``。

   **主要协作调用**：``entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti…``、``entries.map``、``records.filter``、``calls.filter``、``records.at``、``[...records].reverse().find``、``[...records].reverse``、``sameProcess``、``processIdentity``、``active.at``、``['failed', 'blocked', 'recoverable_failed'].includes``、``['running', 'paused'].includes``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:1341:1403:FUNCTION

.. rubric:: ``['conversationId', 'runId', 'executionId'].every callback @ 24``

.. code-block:: javascript

   ['conversationId', 'runId', 'executionId'].every callback @ 24(key)

作为 ``['conversationId', 'runId', 'executionId'].every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``sameProcess``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:2150:2686:FUNCTION

.. rubric:: ``entries.map callback @ 39``

.. code-block:: javascript

   entries.map callback @ 39(entry)

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``47`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``reasoningRecord(entry)``、``null``、``{...entry, execution, state: getExecutionDisplayState(execution), startedAt: execution.activityStartedAt || node?.startedAt, finishedAt: execution.activityFinishedAt || node?.fini…``。

**主要协作调用**：``reasoningRecord``、``projectExecutionStatus``、``parseExecutionStatus``、``getExecutionDisplayState``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:2711:3173:FUNCTION

.. rubric:: ``entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti… callback @ 47``

.. code-block:: javascript

   entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti… callback @ 47(entry, index, all)

实现 ``entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``54`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``all``
   调用方传入的 ``all`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!status || status.toolCallId || ['tool', 'terminal'].includes(status.inlineKind) || hasExecutionGuidanceBoundary(status) || ['failed', 'cancelled'].includes(entry.state) || index…``。

**主要协作调用**：``['tool', 'terminal'].includes``、``hasExecutionGuidanceBoundary``、``['failed', 'cancelled'].includes``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:3182:3346:FUNCTION

.. rubric:: ``entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti… callback @ 54``

.. code-block:: javascript

   entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti… callback @ 54(entry)

实现 ``entries.map((entry) => { if (entry.type === 'thinking') return reasoningRecord(entry); const execution = projectExecuti…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``59`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``seen.has``、``seen.add``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:3382:3462:FUNCTION

.. rubric:: ``records.filter callback @ 60``

.. code-block:: javascript

   records.filter callback @ 60(entry)

作为 ``records.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:3499:3534:FUNCTION

.. rubric:: ``calls.filter callback @ 61``

.. code-block:: javascript

   calls.filter callback @ 61(entry)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:3577:3615:FUNCTION

.. rubric:: ``calls.filter callback @ 62``

.. code-block:: javascript

   calls.filter callback @ 62(entry)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:3659:3727:FUNCTION

.. rubric:: ``records.filter callback @ 63``

.. code-block:: javascript

   records.filter callback @ 63(entry)

作为 ``records.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['running', 'paused', 'recovering'].includes``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:3821:3847:FUNCTION

.. rubric:: ``[...records].reverse().find callback @ 65``

.. code-block:: javascript

   [...records].reverse().find callback @ 65(entry)

作为 ``[...records].reverse().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:5284:5318:FUNCTION

.. rubric:: ``records.map callback @ 83``

.. code-block:: javascript

   records.map callback @ 83(entry)

作为 ``records.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:5327:5347:FUNCTION

.. rubric:: ``records.map((entry) => Number(entry.startedAt)).filter callback @ 83``

.. code-block:: javascript

   records.map((entry) => Number(entry.startedAt)).filter callback @ 83(value)

作为 ``records.map((entry) => Number(entry.startedAt)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``projectWorkProcess``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:5379:5414:FUNCTION

.. rubric:: ``records.map callback @ 84``

.. code-block:: javascript

   records.map callback @ 84(entry)

作为 ``records.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:5423:5443:FUNCTION

.. rubric:: ``records.map((entry) => Number(entry.finishedAt)).filter callback @ 84``

.. code-block:: javascript

   records.map((entry) => Number(entry.finishedAt)).filter callback @ 84(value)

作为 ``records.map((entry) => Number(entry.finishedAt)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``projectWorkProcess``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/workProcessModel.js:5909:5945:FUNCTION

.. rubric:: ``calls.filter callback @ 90``

.. code-block:: javascript

   calls.filter callback @ 90(entry)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``projectWorkProcess``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``terminal.has``。
