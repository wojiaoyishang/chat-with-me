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
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/speech/FrontendFeedbackButtons.jsx``、``@/features/chat/speech/frontendFeedback.js``、``react``、``react-i18next``、``../constants.jsx``、``../expandedStore.js``、``../useExpandedState.js``、``../utils.js``、``./StatusBody.jsx``、``./StatusHeader.jsx``、``@/features/chat/ui/message/components/IgnoredContextIndicator.jsx``、``@/features/chat/ui/message/components/CompactedContextIndicator.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:1604:2238:FUNCTION

.. js:function:: getBadgeTextColor(backgroundColor)

   读取与 ``Badge Text Color`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``53`` 行。

   **参数**

   ``backgroundColor``
      调用方传入的 ``backgroundColor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``yiq >= 160 ? '#111827' : '#ffffff'``。

   **主要协作调用**：``backgroundColor.replace``、``parseInt``、``hex.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:2266:2582:FUNCTION

.. js:function:: parseActionFields(rawFields)

   解析与 ``Action Fields`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``68`` 行。

   **参数**

   ``rawFields``
      调用方传入的 ``rawFields`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fields``。

   **主要协作调用**：``String(rawFields || '').matchAll``、``String``、``toSafeString(match[1]).trim``、``toSafeString``、``toSafeString(match[2]).trim``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:2611:16125:FUNCTION

.. rubric:: ``memo callback @ 71``

.. code-block:: javascript

   memo callback @ 71({ activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``71``—``374`` 行。

**参数**

``{ activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…``
   调用方传入的 ``activeColor, content = '', doneColor, Icon, id, conversationId = null, isProcessing = false, titl…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="w-full py-1.5"> <StatusHeader activeColor={activeColor} currentColor={currentColor} displayTitle={displayTitleWithBadges} Icon={Icon} expandedKey={expandedKey} a…``。

**主要协作调用**：``useTranslation``、``useLocalSetting``、``useMemo``、``String(renderSurface || 'conversation').toLowerCase``、``String``、``Boolean``、``useExpandedState``、``useEffect``、``t``、``badges.map``、``parseFrontendFeedback``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:3394:3564:FUNCTION

.. rubric:: ``useMemo callback @ 95``

.. code-block:: javascript

   useMemo callback @ 95()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``95``—``98`` 行；所属函数 ``memo callback @ 71``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getExpandedKey(contextId, id, scopedType)``。

**主要协作调用**：``getExpandedKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:3744:6865:FUNCTION

.. rubric:: ``useMemo callback @ 101``

.. code-block:: javascript

   useMemo callback @ 101()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``101``—``176`` 行；所属函数 ``memo callback @ 71``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ badges, actions, cleanContent, isDone, isFailed, lastLine, progress, toolStatus, isToolCallRepair, }``。

**主要协作调用**：``stripFrontendFeedback``、``toSafeString``、``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map((match) => { const name = toSafeString(match[1]).trim(); const color…``、``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map``、``safeContent.matchAll``、``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map((match) => { const fields = parseActionFields(match[1]); const name…``、``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map``、``markers.at(-1)?.[1]?.toUpperCase``、``markers.at``、``toolStatusMarkers.at(-1)?.[1]?.toLowerCase``、``toolStatusMarkers.at``、``TOOL_CALL_REPAIR_MARKER_REGEX.test``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:3937:4297:FUNCTION

.. rubric:: ``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback @ 105``

.. code-block:: javascript

   [...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback @ 105(match)

作为 ``[...safeContent.matchAll(BADGE_MARKER_REGEX)] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``115`` 行；所属函数 ``useMemo callback @ 101``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ name, color, }``。

**主要协作调用**：``toSafeString(match[1]).trim``、``toSafeString``、``toSafeString(match[2]).trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:4442:4952:FUNCTION

.. rubric:: ``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback @ 119``

.. code-block:: javascript

   [...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback @ 119(match)

作为 ``[...safeContent.matchAll(ACTION_MARKER_REGEX)] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``132`` 行；所属函数 ``useMemo callback @ 101``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ name, command, toolId, }``。

**主要协作调用**：``parseActionFields``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:6928:7161:FUNCTION

.. rubric:: ``useMemo callback @ 178``

.. code-block:: javascript

   useMemo callback @ 178()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``188`` 行；所属函数 ``memo callback @ 71``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``lastLine``、``\x60...${lastLine.slice(-maxLen)}\x60``。

**主要协作调用**：``lastLine.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:8888:9082:FUNCTION

.. rubric:: ``useEffect callback @ 217``

.. code-block:: javascript

   useEffect callback @ 217()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``217``—``223`` 行；所属函数 ``memo callback @ 71``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``hasExpandedUserOverride``、``setExpandedValue``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:10580:11347:FUNCTION

.. rubric:: ``badges.map callback @ 253``

.. code-block:: javascript

   badges.map callback @ 253(badge, index)

作为 ``badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``253``—``266`` 行；所属函数 ``memo callback @ 71``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getBadgeTextColor``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:11510:13557:FUNCTION

.. rubric:: ``useMemo callback @ 273``

.. code-block:: javascript

   useMemo callback @ 273()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``273``—``317`` 行；所属函数 ``memo callback @ 71``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <IgnoredContextIndicator conversationId={conversationId} messageId={contextId} replacementId={resultReplacementId} label={t('context_state_tool_forgotten', '工具上下文已忽略')} /> )``、``( <CompactedContextIndicator conversationId={conversationId} messageId={contextId} replacementId={resultReplacementId} label={t('context_state_tool_compacted', '工具上下文已压缩')} /> )``。

**主要协作调用**：``String``、``rawId.endsWith``、``rawId.slice``、``String(resultStatus?.status || rootStatus?.status || '').toLowerCase``、``Array.isArray``、``t``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusWidget.jsx:16126:16942:FUNCTION

.. rubric:: ``memo callback @ 375``

.. code-block:: javascript

   memo callback @ 375(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``375``—``393`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.contextId === next.contextId && prev.activeColor === next.activeColor && prev.content === next.content && prev.doneColor === next.doneColor && prev.Icon === next.Icon && pr…``。
