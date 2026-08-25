src/features/chat/ui/message/components/SpeechOverlayHighlighter 模块
==============================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/SpeechOverlayHighlighter

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``
* **模块标识**：``src/features/chat/ui/message/components/SpeechOverlayHighlighter``
* **顶层函数/组件/Hook**：37
* **类**：0
* **局部函数与匿名回调**：36

主要依赖
--------------------------------------------------------------------------------

``react``、``../utils/speechContent.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:1132:1916:FUNCTION

.. js:function:: isPointerNearInterruptionMarker(event, root, layout)

   判断与 ``Pointer Near Interruption Marker`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``53`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``x >= -INTERRUPTION_MARKER_COMPACT_POINTER_PAD_X && x <= rootRect.width + INTERRUPTION_MARKER_COMPACT_POINTER_PAD_X``、``x >= left - INTERRUPTION_MARKER_COMPACT_POINTER_PAD_X && x <= left + INTERRUPTION_MARKER_COMPACT_WIDTH + INTERRUPTION_MARKER_COMPACT_POINTER_PAD_X``。

   **主要协作调用**：``root.getBoundingClientRect``、``Number.isFinite``、``Math.abs``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:1937:2287:FUNCTION

.. js:function:: rectsEqual(a, b)

   实现 ``rectsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``62`` 行。

   **参数**

   ``a``
      调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``b``
      调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``Math.abs((a.left || 0) - (b.left || 0)) <= RECT_EPSILON && Math.abs((a.top || 0) - (b.top || 0)) <= RECT_EPSILON && Math.abs((a.width || 0) - (b.width || 0)) <= RECT_EPSILON && Ma…``。

   **主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:2312:2844:FUNCTION

.. js:function:: highlightEqual(a, b)

   实现 ``highlightEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``78`` 行。

   **参数**

   ``a``
      调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``b``
      调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

   **主要协作调用**：``rectsEqual``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:2873:3048:FUNCTION

.. js:function:: normalizeHighlight(highlight)

   规范化与 ``Highlight`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``85`` 行。

   **参数**

   ``highlight``
      调用方传入的 ``highlight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``EMPTY_HIGHLIGHT``、``highlight``。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3080:3269:FUNCTION

.. js:function:: setHighlightIfChanged(setHighlight, nextHighlight)

   设置与 ``Highlight If Changed`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``87``—``90`` 行。

   **参数**

   ``setHighlight``
      React 或 Store 状态更新函数。

   ``nextHighlight``
      调用方传入的 ``nextHighlight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeHighlight``、``setHighlight``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3298:4090:FUNCTION

.. js:function:: shouldSkipTextNode(node, root)

   实现 ``shouldSkipTextNode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``92``—``109`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

   **主要协作调用**：``node?.nodeValue?.trim``、``SKIP_TAGS.has``、``parent.closest``、``/\b(hljs|highlight|code-block|language-[^\s]+)\b/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4122:4234:FUNCTION

.. js:function:: stripSpeechListMarker(value)

   实现 ``stripSpeechListMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``111``—``113`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSpeechText(value) .replace(/^\s*(?:[-*+•‣⁃]|\d+[.)、]|[a-zA-Z][.)])\s+/, '') .trim``、``normalizeSpeechText(value) .replace``、``normalizeSpeechText``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4268:4372:FUNCTION

.. js:function:: stripMarkdownMatchChars(value)

   实现 ``stripMarkdownMatchChars`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``118`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSpeechText(value) .replace(/[\x60*_~]/g, '') .replace(/\s+/g, ' ') .trim``、``normalizeSpeechText(value) .replace(/[\x60*_~]/g, '') .replace``、``normalizeSpeechText(value) .replace``、``normalizeSpeechText``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4404:4711:FUNCTION

.. js:function:: getSpeechTextVariants(value)

   读取与 ``Speech Text Variants`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``120``—``128`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``Array.from(new Set([raw, withoutListMarker, withoutMarkdown].filter(Boolean)))``。

   **主要协作调用**：``normalizeSpeechText``、``stripSpeechListMarker``、``stripMarkdownMatchChars``、``Array.from``、``[raw, withoutListMarker, withoutMarkdown].filter``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4739:4925:FUNCTION

.. js:function:: normalizeForIndex(value, options)

   规范化与 ``For Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``130``—``134`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized``、``stripMarkdownMatchChars(normalized)``。

   **主要协作调用**：``normalizeSpeechText``、``stripMarkdownMatchChars``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4957:5809:FUNCTION

.. js:function:: createNormalizedIndex(nodes, options)

   创建与 ``Normalized Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``136``—``165`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{text, map}``。

   **主要协作调用**：``nodes.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:5832:6338:FUNCTION

.. js:function:: getTextNodes(root)

   读取与 ``Text Nodes`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``167``—``188`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``nodes``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``document.createTreeWalker``、``walker.nextNode``、``nodes.push``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:6373:6814:FUNCTION

.. js:function:: collectOccurrenceIndexes(text, segmentText, fromIndex)

   实现 ``collectOccurrenceIndexes`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``190``—``203`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``segmentText``
      调用方传入的 ``segmentText`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fromIndex``（默认值 ``0``）
      调用方传入的 ``fromIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``indexes``。

   **主要协作调用**：``Math.max``、``Number``、``text.indexOf``、``indexes.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:6853:7011:FUNCTION

.. js:function:: getNormalizedSegmentVariants(segment, options)

   读取与 ``Normalized Segment Variants`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``205``—``209`` 行。

   **参数**

   ``segment``
      调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getSpeechTextVariants(segment?.text) .map(variant => normalizeForIndex(variant, options)) .filter``、``getSpeechTextVariants(segment?.text) .map``、``getSpeechTextVariants``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:7041:7796:FUNCTION

.. js:function:: pickOccurrenceStart(text, normalizedSegment, segment)

   实现 ``pickOccurrenceStart`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``211``—``229`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``normalizedSegment``
      调用方传入的 ``normalizedSegment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``segment``（默认值 ``{}``）
      调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``-1``、``matches[0]``、``matches[occurrenceIndex]``、``matches.reduce((best, current) => ( Math.abs(current - normalizedStart) < Math.abs(best - normalizedStart) ? current : best ), matches[0])``。

   **主要协作调用**：``collectOccurrenceIndexes``、``Number``、``Number.isInteger``、``Number.isFinite``、``matches.reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:7826:8233:FUNCTION

.. js:function:: buildRangeFromIndex(map, startIndex, segmentLength)

   构造与 ``Range From Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``231``—``243`` 行。

   **参数**

   ``map``
      调用方传入的 ``map`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``startIndex``
      调用方传入的 ``startIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``segmentLength``
      调用方传入的 ``segmentLength`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``range``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``document.createRange``、``range.setStart``、``range.setEnd``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:8271:9494:FUNCTION

.. js:function:: buildSegmentRangeFromOffset(text, map, segment, options)

   构造与 ``Segment Range From Offset`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``245``—``276`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``map``
      调用方传入的 ``map`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``segment``
      调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``range``。

   **主要协作调用**：``Number``、``Number.isFinite``、``getNormalizedSegmentVariants(segment, options) .sort``、``getNormalizedSegmentVariants``、``Math.max``、``Math.min``、``Math.round``、``text.slice``、``buildRangeFromIndex``、``text.slice(searchStart, searchEnd).indexOf``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:9525:10005:FUNCTION

.. js:function:: findBestOrderedMatch(text, variants, cursor)

   查找与 ``Best Ordered Match`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``278``—``295`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``variants``
      调用方传入的 ``variants`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``cursor``
      调用方传入的 ``cursor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``bestMatch``。

   **主要协作调用**：``variants.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:10048:11771:FUNCTION

.. js:function:: findOrderedSegmentRangeWithIndex(text, map, segments, targetSegmentIndex, options)

   查找与 ``Ordered Segment Range With Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``297``—``338`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``map``
      调用方传入的 ``map`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``segments``
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``targetSegmentIndex``
      调用方传入的 ``targetSegmentIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``offsetRange``、``buildRangeFromIndex(map, exactStart, exactLength)``、``fallbackRange``。

   **主要协作调用**：``Array.isArray``、``buildSegmentRangeFromOffset``、``getNormalizedSegmentVariants``、``findBestOrderedMatch``、``buildRangeFromIndex``、``Number.isFinite``、``Number``、``pickOccurrenceStart``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:11805:12477:FUNCTION

.. js:function:: findOrderedSegmentRange(root, segments, targetSegmentIndex)

   查找与 ``Ordered Segment Range`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``340``—``360`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``segments``
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``targetSegmentIndex``
      调用方传入的 ``targetSegmentIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``range``。

   **主要协作调用**：``Array.isArray``、``getTextNodes``、``createNormalizedIndex``、``findOrderedSegmentRangeWithIndex``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12502:12711:FUNCTION

.. js:function:: toRelativeRect(rootRect, rootScrollLeft, rootScrollTop, rect)

   实现 ``toRelativeRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``362``—``367`` 行。

   **参数**

   ``rootRect``
      调用方传入的 ``rootRect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rootScrollLeft``
      调用方传入的 ``rootScrollLeft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rootScrollTop``
      调用方传入的 ``rootScrollTop`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12732:13296:FUNCTION

.. js:function:: expandRect(rect, padding)

   实现 ``expandRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``369``—``383`` 行。

   **参数**

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``padding``
      调用方传入的 ``padding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ left: rect.left - left, top: rect.top - top, width: rect.width + left + right, height: Math.max(rect.height + top + bottom, MIN_FRAME_HEIGHT), }``。

   **主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13317:13807:FUNCTION

.. js:function:: mergeRects(rects, padding)

   合并与 ``Rects`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``385``—``399`` 行。

   **参数**

   ``rects``
      调用方传入的 ``rects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``padding``（默认值 ``0``）
      调用方传入的 ``padding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``expandRect({ left, top, width: right - left, height: bottom - top, }, padding)``。

   **主要协作调用**：``Array.isArray``、``Math.min``、``rects.map``、``Math.max``、``expandRect``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13831:14314:FUNCTION

.. js:function:: intersectRect(rect, bounds)

   实现 ``intersectRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``401``—``417`` 行。

   **参数**

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``bounds``
      调用方传入的 ``bounds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ left, top, width: right - left, height: bottom - top, }``。

   **主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:14341:14597:FUNCTION

.. js:function:: findRangeElement(container)

   查找与 ``Range Element`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``419``—``423`` 行。

   **参数**

   ``container``
      调用方传入的 ``container`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``container.parentElement``、``container instanceof Element ? container : null``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:14624:14853:FUNCTION

.. js:function:: getRangeElements(range)

   读取与 ``Range Elements`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``425``—``432`` 行。

   **参数**

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``[ findRangeElement(range.startContainer), findRangeElement(range.endContainer), findRangeElement(range.commonAncestorContainer), ].filter(Boolean)``。

   **主要协作调用**：``[ findRangeElement(range.startContainer), findRangeElement(range.endContainer), findRangeElement(range.commonAncestorCo…``、``findRangeElement``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:14878:15223:FUNCTION

.. js:function:: getMessageRoot(root, range)

   读取与 ``Message Root`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``434``—``441`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``messageRoot``、``root``。

   **主要协作调用**：``getRangeElements``、``element.closest``、``root.contains``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:15250:15507:FUNCTION

.. js:function:: getClosestInside(elements, selector, root, messageRoot)

   读取与 ``Closest Inside`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``443``—``449`` 行。

   **参数**

   ``elements``
      调用方传入的 ``elements`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``selector``
      调用方传入的 ``selector`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``messageRoot``
      调用方传入的 ``messageRoot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``matched``、``null``。

   **主要协作调用**：``element.closest``、``root.contains``、``messageRoot.contains``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:15542:16431:FUNCTION

.. js:function:: getSpeechBoundaryElement(root, range)

   读取与 ``Speech Boundary Element`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``451``—``469`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{element: listItem, boundaryType: 'list'}``、``{element: blockElement, boundaryType: 'block'}``、``{element: inlineElement, boundaryType: 'inline'}``。

   **主要协作调用**：``getMessageRoot``、``getRangeElements(range).filter``、``getRangeElements``、``getClosestInside``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:16458:17036:FUNCTION

.. js:function:: clampFrameToRoot(frame, root)

   实现 ``clampFrameToRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``471``—``487`` 行。

   **参数**

   ``frame``
      调用方传入的 ``frame`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``frame``、``{ left, top, width: Math.max(0, right - left), height: Math.max(MIN_FRAME_HEIGHT, bottom - top), }``。

   **主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17065:17360:FUNCTION

.. js:function:: getBoundaryPadding(boundaryType)

   读取与 ``Boundary Padding`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``489``—``500`` 行。

   **参数**

   ``boundaryType``
      调用方传入的 ``boundaryType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{top: 4, right: 8, bottom: 4, left: 12}``、``{top: 4, right: 6, bottom: 4, left: 6}``、``FRAME_PADDING``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17385:18691:FUNCTION

.. js:function:: rectsFromRange(root, range)

   实现 ``rectsFromRange`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``502``—``532`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{rects: [], frame: null, boundaryType: null}``、``{rects, frame, boundaryType}``。

   **主要协作调用**：``root.getBoundingClientRect``、``Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map``、``Array.from(range.getClientRects()) .filter``、``Array.from``、``range.getClientRects``、``getSpeechBoundaryElement``、``toRelativeRect``、``boundary.element.getBoundingClientRect``、``expandRect``、``getBoundaryPadding``、``clampFrameToRoot``、``mergeRects``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:18726:21261:FUNCTION

.. js:function:: useSegmentHighlightRects({containerRef, segments, currentSegmentIndex, deps = []})

   封装 ``useSegmentHighlightRects`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``534``—``601`` 行。

   **参数**

   ``{containerRef, segments, currentSegmentIndex, deps = []}``
      调用方传入的 ``containerRef, segments, currentSegmentIndex, deps =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``highlight``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:21297:22168:FUNCTION

.. js:function:: resolveCurrentSegmentInfo(segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition)

   解析并确定与 ``Current Segment Info`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``603``—``622`` 行。

   **参数**

   ``segments``（默认值 ``[]``）
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``currentSegmentId``
      目标对象的公共或运行时标识。

   ``currentSegmentIndex``
      调用方传入的 ``currentSegmentIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``currentSegmentPosition``
      调用方传入的 ``currentSegmentPosition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{segment: null, index: -1}``、``{segment: segments[byIdIndex], index: byIdIndex}``、``{segment: segments[position], index: position}``、``{segment: segments[index], index}``。

   **主要协作调用**：``Array.isArray``、``segments.findIndex``、``Number``、``Number.isInteger``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:22191:22331:FUNCTION

.. js:function:: getFirstRect(highlight)

   读取与 ``First Rect`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``624``—``627`` 行。

   **参数**

   ``highlight``
      调用方传入的 ``highlight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``rects.length > 0 ? rects[0] : null``。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:22353:22508:FUNCTION

.. js:function:: getLastRect(highlight)

   读取与 ``Last Rect`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``629``—``632`` 行。

   **参数**

   ``highlight``
      调用方传入的 ``highlight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``rects.length > 0 ? rects[rects.length - 1] : null``。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:22550:24601:FUNCTION

.. js:function:: resolveInterruptionMarkerLayout({beforeHighlight, afterHighlight, position, segmentCount, rootWidth})

   解析并确定与 ``Interruption Marker Layout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``634``—``684`` 行。

   **参数**

   ``{beforeHighlight, afterHighlight, position, segmentCount, rootWidth}``
      调用方传入的 ``beforeHighlight, afterHighlight, position, segmentCount, rootWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ mode: 'divider', top: beforeBottom + (availableGap / 2), }``、``{ mode: 'compact', top: beforeRect.top + (beforeRect.height / 2), left: Math.max(0, Math.min(preferredLeft, maxLeft)), }``、``{ mode: 'divider', top: anchor.top + anchor.height + INTERRUPTION_MARKER_HALF_HEIGHT + INTERRUPTION_MARKER_CONTENT_GAP, }``。

   **主要协作调用**：``getLastRect``、``getFirstRect``、``Number.isFinite``、``Math.max``、``Math.min``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3195:3265:FUNCTION

.. rubric:: ``setHighlight callback @ 89``

.. code-block:: javascript

   setHighlight callback @ 89(prev)

设置与 ``Highlight`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``setHighlightIfChanged``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``highlightEqual``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:5073:5780:FUNCTION

.. rubric:: ``nodes.forEach callback @ 141``

.. code-block:: javascript

   nodes.forEach callback @ 141(node)

作为 ``nodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``162`` 行；所属函数 ``createNormalizedIndex``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/[\u200B-\u200D\uFEFF]/.test``、``MARKDOWN_MATCH_CHARS.has``、``/\s/.test``、``map.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:6030:6157:FUNCTION

.. rubric:: ``acceptNode``

.. code-block:: javascript

   acceptNode(node)

实现 ``acceptNode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``174``—``176`` 行；所属函数 ``getTextNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``shouldSkipTextNode``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:6937:6983:FUNCTION

.. rubric:: ``getSpeechTextVariants(segment?.text) .map callback @ 207``

.. code-block:: javascript

   getSpeechTextVariants(segment?.text) .map callback @ 207(variant)

作为 ``getSpeechTextVariants(segment?.text) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``getNormalizedSegmentVariants``。

**参数**

``variant``
   调用方传入的 ``variant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeForIndex``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:7620:7750:FUNCTION

.. rubric:: ``matches.reduce callback @ 223``

.. code-block:: javascript

   matches.reduce callback @ 223(best, current)

作为 ``matches.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``223``—``225`` 行；所属函数 ``pickOccurrenceStart``。

**参数**

``best``
   调用方传入的 ``best`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:8569:8612:FUNCTION

.. rubric:: ``getNormalizedSegmentVariants(segment, options) .sort callback @ 252``

.. code-block:: javascript

   getNormalizedSegmentVariants(segment, options) .sort callback @ 252(left, right)

作为 ``getNormalizedSegmentVariants(segment, options) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``buildSegmentRangeFromOffset``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:9604:9978:FUNCTION

.. rubric:: ``variants.forEach callback @ 281``

.. code-block:: javascript

   variants.forEach callback @ 281(variant)

作为 ``variants.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``281``—``292`` 行；所属函数 ``findBestOrderedMatch``。

**参数**

``variant``
   调用方传入的 ``variant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``text.indexOf``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13450:13467:FUNCTION

.. rubric:: ``rects.map callback @ 388``

.. code-block:: javascript

   rects.map callback @ 388(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``388`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13509:13525:FUNCTION

.. rubric:: ``rects.map callback @ 389``

.. code-block:: javascript

   rects.map callback @ 389(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``389``—``389`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13569:13599:FUNCTION

.. rubric:: ``rects.map callback @ 390``

.. code-block:: javascript

   rects.map callback @ 390(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``390``—``390`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13644:13674:FUNCTION

.. rubric:: ``rects.map callback @ 391``

.. code-block:: javascript

   rects.map callback @ 391(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``391``—``391`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:15711:15777:FUNCTION

.. rubric:: ``getRangeElements(range).filter callback @ 455``

.. code-block:: javascript

   getRangeElements(range).filter callback @ 455(element)

作为 ``getRangeElements(range).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``455``—``455`` 行；所属函数 ``getSpeechBoundaryElement``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``root.contains``、``messageRoot.contains``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17704:17745:FUNCTION

.. rubric:: ``Array.from(range.getClientRects()) .filter callback @ 510``

.. code-block:: javascript

   Array.from(range.getClientRects()) .filter callback @ 510(rect)

作为 ``Array.from(range.getClientRects()) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``510``—``510`` 行；所属函数 ``rectsFromRange``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17760:17829:FUNCTION

.. rubric:: ``Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map callback @ 511``

.. code-block:: javascript

   Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map callback @ 511(rect)

作为 ``Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``511``—``511`` 行；所属函数 ``rectsFromRange``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toRelativeRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:18586:18620:FUNCTION

.. rubric:: ``rawRects .map callback @ 528``

.. code-block:: javascript

   rawRects .map callback @ 528(rect)

作为 ``rawRects .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``528``—``528`` 行；所属函数 ``rectsFromRange``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``intersectRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:18871:21178:FUNCTION

.. rubric:: ``useEffect callback @ 537``

.. code-block:: javascript

   useEffect callback @ 537()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``537``—``598`` 行；所属函数 ``useSegmentHighlightRects``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { disposed = true; if (rafId !== null) cancelAnimationFrame(rafId); resizeObserver?.disconnect(); mutationObserver?.disconnect(); window.removeEventListener('resize', schedu…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``setHighlightIfChanged``、``scheduleMeasure``、``resizeObserver?.observe``、``mutationObserver?.observe``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:19337:19604:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``551``—``556`` 行；所属函数 ``useEffect callback @ 537``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``findOrderedSegmentRange``、``rectsFromRange``、``setHighlightIfChanged``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:19638:19769:FUNCTION

.. rubric:: ``scheduleMeasure``

.. code-block:: javascript

   scheduleMeasure()

实现 ``scheduleMeasure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``558``—``561`` 行；所属函数 ``useEffect callback @ 537``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:20087:20451:FUNCTION

.. rubric:: ``anonymous callback @ 571``

.. code-block:: javascript

   anonymous callback @ 571(mutations)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``571``—``577`` 行；所属函数 ``useEffect callback @ 537``。

**参数**

``mutations``
   调用方传入的 ``mutations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutations.every``、``scheduleMeasure``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:20187:20375:FUNCTION

.. rubric:: ``mutations.every callback @ 572``

.. code-block:: javascript

   mutations.every callback @ 572(mutation)

作为 ``mutations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``572``—``575`` 行；所属函数 ``anonymous callback @ 571``。

**参数**

``mutation``
   调用方传入的 ``mutation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``target instanceof Element && target.closest?.('[data-tts-overlay="true"]')``。

**主要协作调用**：``target.closest``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:20837:21171:FUNCTION

.. rubric:: ``returned callback @ 590``

.. code-block:: javascript

   returned callback @ 590()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``590``—``597`` 行；所属函数 ``useEffect callback @ 537``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver?.disconnect``、``mutationObserver?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:21593:21645:FUNCTION

.. rubric:: ``segments.findIndex callback @ 607``

.. code-block:: javascript

   segments.findIndex callback @ 607(item)

实现 ``segments.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``607``—``607`` 行；所属函数 ``resolveCurrentSegmentInfo``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:24642:35090:FUNCTION

.. rubric:: ``memo callback @ 686``

.. code-block:: javascript

   memo callback @ 686({containerRef, msgId, msg, speechState})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``686``—``897`` 行。

**参数**

``{containerRef, msgId, msg, speechState}``
   调用方传入的 ``containerRef, msgId, msg, speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <> {hasLiveHighlight && ( <div data-tts-overlay="true" data-tts-overlay-segment-index={currentOrderedIndex} data-tts-overlay-segment-id={currentSegment.id ?? ''} className="abso…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useMemo``、``useSegmentHighlightRects``、``Number``、``Number.isInteger``、``Math.min``、``Boolean``、``useState``、``useEffect``、``rects.map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:25140:25253:FUNCTION

.. rubric:: ``useMemo callback @ 694``

.. code-block:: javascript

   useMemo callback @ 694()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``694``—``694`` 行；所属函数 ``memo callback @ 686``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveCurrentSegmentInfo``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:25865:25935:FUNCTION

.. rubric:: ``useMemo callback @ 710``

.. code-block:: javascript

   useMemo callback @ 710()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``memo callback @ 686``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getSpeakableSegments``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:27158:27563:FUNCTION

.. rubric:: ``useMemo callback @ 735``

.. code-block:: javascript

   useMemo callback @ 735()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``735``—``744`` 行；所属函数 ``memo callback @ 686``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveInterruptionMarkerLayout``、``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:28163:29743:FUNCTION

.. rubric:: ``useEffect callback @ 760``

.. code-block:: javascript

   useEffect callback @ 760()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``760``—``792`` 行；所属函数 ``memo callback @ 686``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { root.removeEventListener('pointermove', handlePointerMove); root.removeEventListener('pointerleave', handlePointerLeave); root.removeEventListener('pointerdown', handlePoi…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``setIsInterruptionPointerNear``、``setIsInterruptionTouchFocused``、``root.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:28464:28707:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``768``—``773`` 行；所属函数 ``useEffect callback @ 760``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsInterruptionPointerNear``、``isPointerNearInterruptionMarker``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:28743:28785:FUNCTION

.. rubric:: ``handlePointerLeave``

.. code-block:: javascript

   handlePointerLeave()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``774``—``774`` 行；所属函数 ``useEffect callback @ 760``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsInterruptionPointerNear``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:28820:29235:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``775``—``782`` 行；所属函数 ``useEffect callback @ 760``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isPointerNearInterruptionMarker``、``setIsInterruptionTouchFocused``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:29500:29736:FUNCTION

.. rubric:: ``returned callback @ 787``

.. code-block:: javascript

   returned callback @ 787()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``787``—``791`` 行；所属函数 ``useEffect callback @ 760``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``root.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:29826:30592:FUNCTION

.. rubric:: ``useEffect callback @ 794``

.. code-block:: javascript

   useEffect callback @ 794()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``794``—``809`` 行；所属函数 ``memo callback @ 686``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => document.removeEventListener('pointerdown', handleDocumentPointerDown, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:29970:30264:FUNCTION

.. rubric:: ``handleDocumentPointerDown``

.. code-block:: javascript

   handleDocumentPointerDown(event)

处理 ``Document Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``797``—``803`` 行；所属函数 ``useEffect callback @ 794``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isPointerNearInterruptionMarker``、``setIsInterruptionTouchFocused``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:30502:30585:FUNCTION

.. rubric:: ``returned callback @ 808``

.. code-block:: javascript

   returned callback @ 808()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``808``—``808`` 行；所属函数 ``useEffect callback @ 794``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:30680:30784:FUNCTION

.. rubric:: ``useEffect callback @ 811``

.. code-block:: javascript

   useEffect callback @ 811()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``811``—``814`` 行；所属函数 ``memo callback @ 686``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsInterruptionPointerNear``、``setIsInterruptionTouchFocused``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:32330:33010:FUNCTION

.. rubric:: ``rects.map callback @ 845``

.. code-block:: javascript

   rects.map callback @ 845(rect, index)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``845``—``856`` 行；所属函数 ``memo callback @ 686``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。
