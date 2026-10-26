src/components/markdown/card-block/status/StatusWidget 模块
==========================================================================================================================

.. js:module:: src/components/markdown/card-block/status/StatusWidget

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/StatusWidget.jsx``
* **模块标识**：``src/components/markdown/card-block/status/StatusWidget``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：19

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/speech/useFrontendFeedback.js``、``../blocks/ToolLogBlock.jsx``、``@/features/chat/speech/FrontendFeedbackButtons.jsx``、``@/features/chat/speech/frontendFeedback.js``、``react``、``react-i18next``、``../constants.jsx``、``../expandedStore.js``、``../useExpandedState.js``、``../utils.js``、``./StatusBody.jsx``、``./StatusHeader.jsx``、``./StickyStatusHeader.jsx``、``./toolLogReferences.js``、``@/features/chat/ui/message/components/IgnoredContextIndicator.jsx``、``@/features/chat/ui/message/components/CompactedContextIndicator.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:1875:2509:FUNCTION

.. js:function:: getBadgeTextColor(backgroundColor)

   读取与 ``Badge Text Color`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``57`` 行。

   **参数**

   ``backgroundColor``
      调用方传入的 ``backgroundColor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``yiq >= 160 ? '#111827' : '#ffffff'``。

   **主要协作调用**：``backgroundColor.replace``、``parseInt``、``hex.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:2537:2853:FUNCTION

.. js:function:: parseActionFields(rawFields)

   解析与 ``Action Fields`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``72`` 行。

   **参数**

   ``rawFields``
      调用方传入的 ``rawFields`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fields``。

   **主要协作调用**：``String(rawFields || '').matchAll``、``String``、``toSafeString(match[1]).trim``、``toSafeString``、``toSafeString(match[2]).trim``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:2882:19637:FUNCTION

.. rubric:: ``memo callback @ 75``

.. code-block:: javascript

   memo callback @ 75({ activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``75``—``423`` 行。

**参数**

``{ activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…``
   调用方传入的 ``activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="relative w-full py-1.5"> {/* Keep the controls within this card and its nearest scrolling surface. */} <StickyStatusHeader expanded={isExpanded}> <StatusHeader a…``。

**主要协作调用**：``useTranslation``、``useLocalSetting``、``useMemo``、``useFrontendFeedback``、``feedbackItems.map``、``feedbackStates.some``、``feedbackStates.every``、``String(renderSurface || 'conversation').toLowerCase``、``String``、``Boolean``、``useExpandedState``、``useEffect``。

**内部回调数量**：13。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:3701:3871:FUNCTION

.. rubric:: ``useMemo callback @ 100``

.. code-block:: javascript

   useMemo callback @ 100()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``100``—``103`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getExpandedKey(contextId, id, scopedType)``。

**主要协作调用**：``getExpandedKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:3951:4045:FUNCTION

.. rubric:: ``useMemo callback @ 106``

.. code-block:: javascript

   useMemo callback @ 106()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseFrontendFeedback``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4256:4294:FUNCTION

.. rubric:: ``feedbackItems.map callback @ 110``

.. code-block:: javascript

   feedbackItems.map callback @ 110(item)

作为 ``feedbackItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``memo callback @ 75``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4348:4385:FUNCTION

.. rubric:: ``feedbackStates.some callback @ 111``

.. code-block:: javascript

   feedbackStates.some callback @ 111(state)

作为 ``feedbackStates.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``memo callback @ 75``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4470:4510:FUNCTION

.. rubric:: ``feedbackStates.every callback @ 113``

.. code-block:: javascript

   feedbackStates.every callback @ 113(state)

作为 ``feedbackStates.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``memo callback @ 75``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4576:4614:FUNCTION

.. rubric:: ``feedbackStates.some callback @ 115``

.. code-block:: javascript

   feedbackStates.some callback @ 115(state)

作为 ``feedbackStates.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``memo callback @ 75``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4682:4722:FUNCTION

.. rubric:: ``feedbackStates.some callback @ 117``

.. code-block:: javascript

   feedbackStates.some callback @ 117(state)

作为 ``feedbackStates.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``memo callback @ 75``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4921:8384:FUNCTION

.. rubric:: ``useMemo callback @ 122``

.. code-block:: javascript

   useMemo callback @ 122()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``122``—``202`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ badges, actions, cleanContent, isDone, isFailed, lastLine, progress, toolStatus, isToolCallRepair, }``。

**主要协作调用**：``stripFrontendFeedback``、``toSafeString``、``safeContent.replace``、``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map((match) => { const name = toSafeString(match[1]).trim(); const color…``、``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map``、``safeContent.matchAll``、``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map((match) => { const fields = parseActionFields(match[1]); const name…``、``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map``、``markers.at(-1)?.[1]?.toUpperCase``、``markers.at``、``toolStatusMarkers.at(-1)?.[1]?.toLowerCase``、``toolStatusMarkers.at``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:5413:5773:FUNCTION

.. rubric:: ``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback @ 131``

.. code-block:: javascript

   [...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback @ 131(match)

作为 ``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``131``—``141`` 行；所属函数 ``useMemo callback @ 122``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ name, color, }``。

**主要协作调用**：``toSafeString(match[1]).trim``、``toSafeString``、``toSafeString(match[2]).trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:5918:6428:FUNCTION

.. rubric:: ``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback @ 145``

.. code-block:: javascript

   [...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback @ 145(match)

作为 ``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``145``—``158`` 行；所属函数 ``useMemo callback @ 122``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ name, command, toolId, }``。

**主要协作调用**：``parseActionFields``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:8476:8709:FUNCTION

.. rubric:: ``useMemo callback @ 204``

.. code-block:: javascript

   useMemo callback @ 204()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``204``—``214`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``lastLine``、``\x60...${lastLine.slice(-maxLen)}\x60``。

**主要协作调用**：``lastLine.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:10614:10808:FUNCTION

.. rubric:: ``useEffect callback @ 244``

.. code-block:: javascript

   useEffect callback @ 244()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``244``—``250`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``hasExpandedUserOverride``、``setExpandedValue``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:12306:12988:FUNCTION

.. rubric:: ``badges.map callback @ 280``

.. code-block:: javascript

   badges.map callback @ 280(badge, index)

作为 ``badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``280``—``292`` 行；所属函数 ``memo callback @ 75``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getBadgeTextColor``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:13151:15210:FUNCTION

.. rubric:: ``useMemo callback @ 299``

.. code-block:: javascript

   useMemo callback @ 299()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``299``—``343`` 行；所属函数 ``memo callback @ 75``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <IgnoredContextIndicator conversationId={conversationId} messageId={contextId} replacementId={resultReplacementId} label={t('context_state_tool_forgotten', '工具上下文已忽略')} /> )``、``( <CompactedContextIndicator conversationId={conversationId} messageId={contextId} replacementId={resultReplacementId} label={t('context_state_tool_compacted', '工具上下文已压缩')} /> )``。

**主要协作调用**：``String``、``rawId.endsWith``、``rawId.slice``、``String(resultStatus?.status || rootStatus?.status || '').toLowerCase``、``Array.isArray``、``t``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:17946:19569:FUNCTION

.. rubric:: ``feedbackItems.map callback @ 395``

.. code-block:: javascript

   feedbackItems.map callback @ 395(item)

作为 ``feedbackItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``395``—``419`` 行；所属函数 ``memo callback @ 75``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state.logs.map((log) => ( <ToolLogBlock key={\x60${item.toolid}:${state.revision}:${log.id}\x60} id={log.id} content={log.content} /> ))``、``results.map((result, index) => ( <ToolLogBlock key={\x60${item.toolid}:${state.revision}:${index}\x60} id={\x60${id}:feedback:${item.toolid}:${index}\x60} content={\x60[TITLE:调用工具 ${state.tool_n…``。

**主要协作调用**：``state.logs.map``、``results.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:18125:18439:FUNCTION

.. rubric:: ``state.logs.map callback @ 398``

.. code-block:: javascript

   state.logs.map callback @ 398(log)

作为 ``state.logs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``398``—``404`` 行；所属函数 ``feedbackItems.map callback @ 395``。

**参数**

``log``
   调用方传入的 ``log`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:18901:19545:FUNCTION

.. rubric:: ``results.map callback @ 412``

.. code-block:: javascript

   results.map callback @ 412(result, index)

作为 ``results.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``412``—``418`` 行；所属函数 ``feedbackItems.map callback @ 395``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date(state.started_at * 1000).toISOString``、``new Date(state.finished_at * 1000).toISOString``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:19638:20501:FUNCTION

.. rubric:: ``memo callback @ 424``

.. code-block:: javascript

   memo callback @ 424(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``424``—``443`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.contextId === next.contextId && prev.activeColor === next.activeColor && prev.content === next.content && prev.doneColor === next.doneColor && prev.Icon === next.Icon && pr…``。
