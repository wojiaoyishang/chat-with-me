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
* **局部函数与匿名回调**：20

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/speech/useFrontendFeedback.js``、``../blocks/ToolLogBlock.jsx``、``@/features/chat/speech/FrontendFeedbackButtons.jsx``、``@/features/chat/speech/frontendFeedback.js``、``react``、``react-i18next``、``../constants.jsx``、``../expandedStore.js``、``../useExpandedState.js``、``../utils.js``、``./StatusBody.jsx``、``./StatusHeader.jsx``、``./StickyStatusHeader.jsx``、``./toolLogReferences.js``、``@/features/chat/ui/message/components/IgnoredContextIndicator.jsx``、``@/features/chat/ui/message/components/CompactedContextIndicator.jsx``、``@/features/chat/ui/message/components/ToolContextActions.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:1980:2614:FUNCTION

.. js:function:: getBadgeTextColor(backgroundColor)

   读取与 ``Badge Text Color`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``58`` 行。

   **参数**

   ``backgroundColor``
      调用方传入的 ``backgroundColor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``yiq >= 160 ? '#111827' : '#ffffff'``。

   **主要协作调用**：``backgroundColor.replace``、``parseInt``、``hex.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:2642:2958:FUNCTION

.. js:function:: parseActionFields(rawFields)

   解析与 ``Action Fields`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``73`` 行。

   **参数**

   ``rawFields``
      调用方传入的 ``rawFields`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fields``。

   **主要协作调用**：``String(rawFields || '').matchAll``、``String``、``toSafeString(match[1]).trim``、``toSafeString``、``toSafeString(match[2]).trim``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:2987:20762:FUNCTION

.. rubric:: ``memo callback @ 76``

.. code-block:: javascript

   memo callback @ 76({ activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``435`` 行。

**参数**

``{ activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…``
   调用方传入的 ``activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="relative w-full py-1.5" onPlayCapture={() => setKeepMediaOpen(true)}> {/* Keep the controls within this card and its nearest scrolling surface. */} <StickyStatus…``。

**主要协作调用**：``useTranslation``、``useState``、``useLocalSetting``、``useMemo``、``useFrontendFeedback``、``feedbackItems.map``、``feedbackStates.some``、``feedbackStates.every``、``String(renderSurface || 'conversation').toLowerCase``、``String``、``Boolean``、``useExpandedState``。

**内部回调数量**：14。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4030:4200:FUNCTION

.. rubric:: ``useMemo callback @ 104``

.. code-block:: javascript

   useMemo callback @ 104()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``107`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getExpandedKey(contextId, id, scopedType)``。

**主要协作调用**：``getExpandedKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4280:4374:FUNCTION

.. rubric:: ``useMemo callback @ 110``

.. code-block:: javascript

   useMemo callback @ 110()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseFrontendFeedback``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4585:4623:FUNCTION

.. rubric:: ``feedbackItems.map callback @ 114``

.. code-block:: javascript

   feedbackItems.map callback @ 114(item)

作为 ``feedbackItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``memo callback @ 76``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4677:4714:FUNCTION

.. rubric:: ``feedbackStates.some callback @ 115``

.. code-block:: javascript

   feedbackStates.some callback @ 115(state)

作为 ``feedbackStates.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``memo callback @ 76``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4799:4839:FUNCTION

.. rubric:: ``feedbackStates.every callback @ 117``

.. code-block:: javascript

   feedbackStates.every callback @ 117(state)

作为 ``feedbackStates.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``memo callback @ 76``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4905:4943:FUNCTION

.. rubric:: ``feedbackStates.some callback @ 119``

.. code-block:: javascript

   feedbackStates.some callback @ 119(state)

作为 ``feedbackStates.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``memo callback @ 76``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:5011:5051:FUNCTION

.. rubric:: ``feedbackStates.some callback @ 121``

.. code-block:: javascript

   feedbackStates.some callback @ 121(state)

作为 ``feedbackStates.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``memo callback @ 76``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:5250:8713:FUNCTION

.. rubric:: ``useMemo callback @ 126``

.. code-block:: javascript

   useMemo callback @ 126()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``126``—``206`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ badges, actions, cleanContent, isDone, isFailed, lastLine, progress, toolStatus, isToolCallRepair, }``。

**主要协作调用**：``stripFrontendFeedback``、``toSafeString``、``safeContent.replace``、``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map((match) => { const name = toSafeString(match[1]).trim(); const color…``、``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map``、``safeContent.matchAll``、``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map((match) => { const fields = parseActionFields(match[1]); const name…``、``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map``、``markers.at(-1)?.[1]?.toUpperCase``、``markers.at``、``toolStatusMarkers.at(-1)?.[1]?.toLowerCase``、``toolStatusMarkers.at``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:5742:6102:FUNCTION

.. rubric:: ``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback @ 135``

.. code-block:: javascript

   [...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback @ 135(match)

作为 ``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``135``—``145`` 行；所属函数 ``useMemo callback @ 126``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ name, color, }``。

**主要协作调用**：``toSafeString(match[1]).trim``、``toSafeString``、``toSafeString(match[2]).trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:6247:6757:FUNCTION

.. rubric:: ``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback @ 149``

.. code-block:: javascript

   [...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback @ 149(match)

作为 ``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``162`` 行；所属函数 ``useMemo callback @ 126``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ name, command, toolId, }``。

**主要协作调用**：``parseActionFields``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:8805:9038:FUNCTION

.. rubric:: ``useMemo callback @ 208``

.. code-block:: javascript

   useMemo callback @ 208()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``208``—``218`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``lastLine``、``\x60...${lastLine.slice(-maxLen)}\x60``。

**主要协作调用**：``lastLine.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:10960:11154:FUNCTION

.. rubric:: ``useEffect callback @ 248``

.. code-block:: javascript

   useEffect callback @ 248()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``248``—``254`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``hasExpandedUserOverride``、``setExpandedValue``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:12652:13334:FUNCTION

.. rubric:: ``badges.map callback @ 284``

.. code-block:: javascript

   badges.map callback @ 284(badge, index)

作为 ``badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``284``—``296`` 行；所属函数 ``memo callback @ 76``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getBadgeTextColor``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:13497:15556:FUNCTION

.. rubric:: ``useMemo callback @ 303``

.. code-block:: javascript

   useMemo callback @ 303()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``303``—``347`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <IgnoredContextIndicator conversationId={conversationId} messageId={contextId} replacementId={resultReplacementId} label={t('context_state_tool_forgotten', '工具上下文已忽略')} /> )``、``( <CompactedContextIndicator conversationId={conversationId} messageId={contextId} replacementId={resultReplacementId} label={t('context_state_tool_compacted', '工具上下文已压缩')} /> )``。

**主要协作调用**：``String``、``rawId.endsWith``、``rawId.slice``、``String(resultStatus?.status || rootStatus?.status || '').toLowerCase``、``Array.isArray``、``t``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:16055:16083:FUNCTION

.. rubric:: ``onPlayCapture callback @ 356``

.. code-block:: javascript

   onPlayCapture callback @ 356()

处理 ``Play Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``memo callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKeepMediaOpen``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:19071:20694:FUNCTION

.. rubric:: ``feedbackItems.map callback @ 407``

.. code-block:: javascript

   feedbackItems.map callback @ 407(item)

作为 ``feedbackItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``407``—``431`` 行；所属函数 ``memo callback @ 76``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state.logs.map((log) => ( <ToolLogBlock key={\x60${item.toolid}:${state.revision}:${log.id}\x60} id={log.id} content={log.content} /> ))``、``results.map((result, index) => ( <ToolLogBlock key={\x60${item.toolid}:${state.revision}:${index}\x60} id={\x60${id}:feedback:${item.toolid}:${index}\x60} content={\x60[TITLE:调用工具 ${state.tool_n…``。

**主要协作调用**：``state.logs.map``、``results.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:19250:19564:FUNCTION

.. rubric:: ``state.logs.map callback @ 410``

.. code-block:: javascript

   state.logs.map callback @ 410(log)

作为 ``state.logs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``410``—``416`` 行；所属函数 ``feedbackItems.map callback @ 407``。

**参数**

``log``
   调用方传入的 ``log`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:20026:20670:FUNCTION

.. rubric:: ``results.map callback @ 424``

.. code-block:: javascript

   results.map callback @ 424(result, index)

作为 ``results.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``424``—``430`` 行；所属函数 ``feedbackItems.map callback @ 407``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date(state.started_at * 1000).toISOString``、``new Date(state.finished_at * 1000).toISOString``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:20763:21626:FUNCTION

.. rubric:: ``memo callback @ 436``

.. code-block:: javascript

   memo callback @ 436(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``436``—``455`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.contextId === next.contextId && prev.activeColor === next.activeColor && prev.content === next.content && prev.doneColor === next.doneColor && prev.Icon === next.Icon && pr…``。
