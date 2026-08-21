src/features/chat/ui/message/components/SpeechOverlayHighlighter 模块
===================================================================

.. js:module:: src/features/chat/ui/message/components/SpeechOverlayHighlighter

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``
* **模块标识**：``src/features/chat/ui/message/components/SpeechOverlayHighlighter``
* **顶层函数/组件/Hook**：33
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------

``react``、``../utils/speechContent.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:808:1158:FUNCTION

.. js:function:: rectsEqual(a, b)

   实现 ``rectsEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``37`` 行。

   **参数**

   ``a``
      调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``b``
      调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``Math.abs((a.left \|\| 0) - (b.left \|\| 0)) <= RECT_EPSILON && Math.abs((a.top \|\| 0) - (b.top \|\| 0)) <= RECT_EPSILON && Math.abs((a.width \|\| 0) - (b.width \|\| 0)) <= RECT_EPSILON && Ma…``。

   **主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:1183:1715:FUNCTION

.. js:function:: highlightEqual(a, b)

   实现 ``highlightEqual`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``53`` 行。

   **参数**

   ``a``
      调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``b``
      调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

   **主要协作调用**：``rectsEqual``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:1744:1919:FUNCTION

.. js:function:: normalizeHighlight(highlight)

   规范化与 ``Highlight`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``60`` 行。

   **参数**

   ``highlight``
      调用方传入的 ``highlight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``EMPTY_HIGHLIGHT``、``highlight``。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:1951:2140:FUNCTION

.. js:function:: setHighlightIfChanged(setHighlight, nextHighlight)

   设置与 ``Highlight If Changed`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``65`` 行。

   **参数**

   ``setHighlight``
      React 或 Store 状态更新函数。

   ``nextHighlight``
      调用方传入的 ``nextHighlight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeHighlight``、``setHighlight``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:2169:2961:FUNCTION

.. js:function:: shouldSkipTextNode(node, root)

   实现 ``shouldSkipTextNode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``84`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

   **主要协作调用**：``node?.nodeValue?.trim``、``SKIP_TAGS.has``、``parent.closest``、``/\b(hljs\|highlight\|code-block\|language-[^\s]+)\b/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:2993:3105:FUNCTION

.. js:function:: stripSpeechListMarker(value)

   实现 ``stripSpeechListMarker`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``86``—``88`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSpeechText(value) .replace(/^\s*(?:[-*+•‣⁃]\|\d+[.)、]\|[a-zA-Z][.)])\s+/, '') .trim``、``normalizeSpeechText(value) .replace``、``normalizeSpeechText``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3139:3243:FUNCTION

.. js:function:: stripMarkdownMatchChars(value)

   实现 ``stripMarkdownMatchChars`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``93`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSpeechText(value) .replace(/[\`*_~]/g, '') .replace(/\s+/g, ' ') .trim``、``normalizeSpeechText(value) .replace(/[\`*_~]/g, '') .replace``、``normalizeSpeechText(value) .replace``、``normalizeSpeechText``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3275:3582:FUNCTION

.. js:function:: getSpeechTextVariants(value)

   读取与 ``Speech Text Variants`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``103`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``Array.from(new Set([raw, withoutListMarker, withoutMarkdown].filter(Boolean)))``。

   **主要协作调用**：``normalizeSpeechText``、``stripSpeechListMarker``、``stripMarkdownMatchChars``、``Array.from``、``[raw, withoutListMarker, withoutMarkdown].filter``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3610:3796:FUNCTION

.. js:function:: normalizeForIndex(value, options)

   规范化与 ``For Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``109`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized``、``stripMarkdownMatchChars(normalized)``。

   **主要协作调用**：``normalizeSpeechText``、``stripMarkdownMatchChars``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3828:4680:FUNCTION

.. js:function:: createNormalizedIndex(nodes, options)

   创建与 ``Normalized Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``111``—``140`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{text, map}``。

   **主要协作调用**：``nodes.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4703:5209:FUNCTION

.. js:function:: getTextNodes(root)

   读取与 ``Text Nodes`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``142``—``163`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``nodes``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``document.createTreeWalker``、``walker.nextNode``、``nodes.push``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:5244:5685:FUNCTION

.. js:function:: collectOccurrenceIndexes(text, segmentText, fromIndex)

   实现 ``collectOccurrenceIndexes`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``165``—``178`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:5724:5882:FUNCTION

.. js:function:: getNormalizedSegmentVariants(segment, options)

   读取与 ``Normalized Segment Variants`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``180``—``184`` 行。

   **参数**

   ``segment``
      调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getSpeechTextVariants(segment?.text) .map(variant => normalizeForIndex(variant, options)) .filter``、``getSpeechTextVariants(segment?.text) .map``、``getSpeechTextVariants``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:5912:6667:FUNCTION

.. js:function:: pickOccurrenceStart(text, normalizedSegment, segment)

   实现 ``pickOccurrenceStart`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``186``—``204`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:6697:7104:FUNCTION

.. js:function:: buildRangeFromIndex(map, startIndex, segmentLength)

   构造与 ``Range From Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``206``—``218`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:7142:8365:FUNCTION

.. js:function:: buildSegmentRangeFromOffset(text, map, segment, options)

   构造与 ``Segment Range From Offset`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``220``—``251`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:8396:8876:FUNCTION

.. js:function:: findBestOrderedMatch(text, variants, cursor)

   查找与 ``Best Ordered Match`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``253``—``270`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:8919:10642:FUNCTION

.. js:function:: findOrderedSegmentRangeWithIndex(text, map, segments, targetSegmentIndex, options)

   查找与 ``Ordered Segment Range With Index`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``272``—``313`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:10676:11348:FUNCTION

.. js:function:: findOrderedSegmentRange(root, segments, targetSegmentIndex)

   查找与 ``Ordered Segment Range`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``315``—``335`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:11373:11582:FUNCTION

.. js:function:: toRelativeRect(rootRect, rootScrollLeft, rootScrollTop, rect)

   实现 ``toRelativeRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``337``—``342`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:11603:12167:FUNCTION

.. js:function:: expandRect(rect, padding)

   实现 ``expandRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``344``—``358`` 行。

   **参数**

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``padding``
      调用方传入的 ``padding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ left: rect.left - left, top: rect.top - top, width: rect.width + left + right, height: Math.max(rect.height + top + bottom, MIN_FRAME_HEIGHT), }``。

   **主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12188:12678:FUNCTION

.. js:function:: mergeRects(rects, padding)

   合并与 ``Rects`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``360``—``374`` 行。

   **参数**

   ``rects``
      调用方传入的 ``rects`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``padding``（默认值 ``0``）
      调用方传入的 ``padding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``expandRect({ left, top, width: right - left, height: bottom - top, }, padding)``。

   **主要协作调用**：``Array.isArray``、``Math.min``、``rects.map``、``Math.max``、``expandRect``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12702:13185:FUNCTION

.. js:function:: intersectRect(rect, bounds)

   实现 ``intersectRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``376``—``392`` 行。

   **参数**

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``bounds``
      调用方传入的 ``bounds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ left, top, width: right - left, height: bottom - top, }``。

   **主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13212:13468:FUNCTION

.. js:function:: findRangeElement(container)

   查找与 ``Range Element`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``394``—``398`` 行。

   **参数**

   ``container``
      调用方传入的 ``container`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``container.parentElement``、``container instanceof Element ? container : null``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13495:13724:FUNCTION

.. js:function:: getRangeElements(range)

   读取与 ``Range Elements`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``400``—``407`` 行。

   **参数**

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``[ findRangeElement(range.startContainer), findRangeElement(range.endContainer), findRangeElement(range.commonAncestorContainer), ].filter(Boolean)``。

   **主要协作调用**：``[ findRangeElement(range.startContainer), findRangeElement(range.endContainer), findRangeElement(range.commonAncestorCo…``、``findRangeElement``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:13749:14094:FUNCTION

.. js:function:: getMessageRoot(root, range)

   读取与 ``Message Root`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``409``—``416`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``messageRoot``、``root``。

   **主要协作调用**：``getRangeElements``、``element.closest``、``root.contains``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:14121:14378:FUNCTION

.. js:function:: getClosestInside(elements, selector, root, messageRoot)

   读取与 ``Closest Inside`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``418``—``424`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:14413:15302:FUNCTION

.. js:function:: getSpeechBoundaryElement(root, range)

   读取与 ``Speech Boundary Element`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``426``—``444`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{element: listItem, boundaryType: 'list'}``、``{element: blockElement, boundaryType: 'block'}``、``{element: inlineElement, boundaryType: 'inline'}``。

   **主要协作调用**：``getMessageRoot``、``getRangeElements(range).filter``、``getRangeElements``、``getClosestInside``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:15329:15907:FUNCTION

.. js:function:: clampFrameToRoot(frame, root)

   实现 ``clampFrameToRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``446``—``462`` 行。

   **参数**

   ``frame``
      调用方传入的 ``frame`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``frame``、``{ left, top, width: Math.max(0, right - left), height: Math.max(MIN_FRAME_HEIGHT, bottom - top), }``。

   **主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:15936:16231:FUNCTION

.. js:function:: getBoundaryPadding(boundaryType)

   读取与 ``Boundary Padding`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``464``—``475`` 行。

   **参数**

   ``boundaryType``
      调用方传入的 ``boundaryType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{top: 4, right: 8, bottom: 4, left: 12}``、``{top: 4, right: 6, bottom: 4, left: 6}``、``FRAME_PADDING``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:16256:17562:FUNCTION

.. js:function:: rectsFromRange(root, range)

   实现 ``rectsFromRange`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``477``—``507`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``range``
      调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{rects: [], frame: null, boundaryType: null}``、``{rects, frame, boundaryType}``。

   **主要协作调用**：``root.getBoundingClientRect``、``Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map``、``Array.from(range.getClientRects()) .filter``、``Array.from``、``range.getClientRects``、``getSpeechBoundaryElement``、``toRelativeRect``、``boundary.element.getBoundingClientRect``、``expandRect``、``getBoundaryPadding``、``clampFrameToRoot``、``mergeRects``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17597:20132:FUNCTION

.. js:function:: useSegmentHighlightRects({containerRef, segments, currentSegmentIndex, deps = []})

   封装 ``useSegmentHighlightRects`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``509``—``576`` 行。

   **参数**

   ``{containerRef, segments, currentSegmentIndex, deps = []}``
      调用方传入的 ``containerRef, segments, currentSegmentIndex, deps = `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``highlight``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:20168:21039:FUNCTION

.. js:function:: resolveCurrentSegmentInfo(segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition)

   解析并确定与 ``Current Segment Info`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``578``—``597`` 行。

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

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:2066:2136:FUNCTION

.. rubric:: ``setHighlight callback @ 64``

.. code-block:: javascript

   setHighlight callback @ 64(prev)

设置与 ``Highlight`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``setHighlightIfChanged``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``highlightEqual``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:3944:4651:FUNCTION

.. rubric:: ``nodes.forEach callback @ 116``

.. code-block:: javascript

   nodes.forEach callback @ 116(node)

作为 ``nodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``137`` 行；所属函数 ``createNormalizedIndex``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/[\u200B-\u200D\uFEFF]/.test``、``MARKDOWN_MATCH_CHARS.has``、``/\s/.test``、``map.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:4901:5028:FUNCTION

.. rubric:: ``acceptNode``

.. code-block:: javascript

   acceptNode(node)

实现 ``acceptNode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``151`` 行；所属函数 ``getTextNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``shouldSkipTextNode``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:5808:5854:FUNCTION

.. rubric:: ``getSpeechTextVariants(segment?.text) .map callback @ 182``

.. code-block:: javascript

   getSpeechTextVariants(segment?.text) .map callback @ 182(variant)

作为 ``getSpeechTextVariants(segment?.text) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``getNormalizedSegmentVariants``。

**参数**

``variant``
   调用方传入的 ``variant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeForIndex``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:6491:6621:FUNCTION

.. rubric:: ``matches.reduce callback @ 198``

.. code-block:: javascript

   matches.reduce callback @ 198(best, current)

作为 ``matches.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``198``—``200`` 行；所属函数 ``pickOccurrenceStart``。

**参数**

``best``
   调用方传入的 ``best`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:7440:7483:FUNCTION

.. rubric:: ``getNormalizedSegmentVariants(segment, options) .sort callback @ 227``

.. code-block:: javascript

   getNormalizedSegmentVariants(segment, options) .sort callback @ 227(left, right)

作为 ``getNormalizedSegmentVariants(segment, options) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``227``—``227`` 行；所属函数 ``buildSegmentRangeFromOffset``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:8475:8849:FUNCTION

.. rubric:: ``variants.forEach callback @ 256``

.. code-block:: javascript

   variants.forEach callback @ 256(variant)

作为 ``variants.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``256``—``267`` 行；所属函数 ``findBestOrderedMatch``。

**参数**

``variant``
   调用方传入的 ``variant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``text.indexOf``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12321:12338:FUNCTION

.. rubric:: ``rects.map callback @ 363``

.. code-block:: javascript

   rects.map callback @ 363(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``363``—``363`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12380:12396:FUNCTION

.. rubric:: ``rects.map callback @ 364``

.. code-block:: javascript

   rects.map callback @ 364(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``364``—``364`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12440:12470:FUNCTION

.. rubric:: ``rects.map callback @ 365``

.. code-block:: javascript

   rects.map callback @ 365(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``365``—``365`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:12515:12545:FUNCTION

.. rubric:: ``rects.map callback @ 366``

.. code-block:: javascript

   rects.map callback @ 366(rect)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``366``—``366`` 行；所属函数 ``mergeRects``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:14582:14648:FUNCTION

.. rubric:: ``getRangeElements(range).filter callback @ 430``

.. code-block:: javascript

   getRangeElements(range).filter callback @ 430(element)

作为 ``getRangeElements(range).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``getSpeechBoundaryElement``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``root.contains``、``messageRoot.contains``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:16575:16616:FUNCTION

.. rubric:: ``Array.from(range.getClientRects()) .filter callback @ 485``

.. code-block:: javascript

   Array.from(range.getClientRects()) .filter callback @ 485(rect)

作为 ``Array.from(range.getClientRects()) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``485``—``485`` 行；所属函数 ``rectsFromRange``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:16631:16700:FUNCTION

.. rubric:: ``Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map callback @ 486``

.. code-block:: javascript

   Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map callback @ 486(rect)

作为 ``Array.from(range.getClientRects()) .filter(rect => rect.width > 0 && rect.height > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``486``—``486`` 行；所属函数 ``rectsFromRange``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toRelativeRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17457:17491:FUNCTION

.. rubric:: ``rawRects .map callback @ 503``

.. code-block:: javascript

   rawRects .map callback @ 503(rect)

作为 ``rawRects .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``503``—``503`` 行；所属函数 ``rectsFromRange``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``intersectRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:17742:20049:FUNCTION

.. rubric:: ``useEffect callback @ 512``

.. code-block:: javascript

   useEffect callback @ 512()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``512``—``573`` 行；所属函数 ``useSegmentHighlightRects``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { disposed = true; if (rafId !== null) cancelAnimationFrame(rafId); resizeObserver?.disconnect(); mutationObserver?.disconnect(); window.removeEventListener('resize', schedu…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``setHighlightIfChanged``、``scheduleMeasure``、``resizeObserver?.observe``、``mutationObserver?.observe``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:18208:18475:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``526``—``531`` 行；所属函数 ``useEffect callback @ 512``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``findOrderedSegmentRange``、``rectsFromRange``、``setHighlightIfChanged``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:18509:18640:FUNCTION

.. rubric:: ``scheduleMeasure``

.. code-block:: javascript

   scheduleMeasure()

实现 ``scheduleMeasure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``533``—``536`` 行；所属函数 ``useEffect callback @ 512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:18958:19322:FUNCTION

.. rubric:: ``anonymous callback @ 546``

.. code-block:: javascript

   anonymous callback @ 546(mutations)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``546``—``552`` 行；所属函数 ``useEffect callback @ 512``。

**参数**

``mutations``
   调用方传入的 ``mutations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutations.every``、``scheduleMeasure``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:19058:19246:FUNCTION

.. rubric:: ``mutations.every callback @ 547``

.. code-block:: javascript

   mutations.every callback @ 547(mutation)

作为 ``mutations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``547``—``550`` 行；所属函数 ``anonymous callback @ 546``。

**参数**

``mutation``
   调用方传入的 ``mutation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``target instanceof Element && target.closest?.('[data-tts-overlay="true"]')``。

**主要协作调用**：``target.closest``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:19708:20042:FUNCTION

.. rubric:: ``returned callback @ 565``

.. code-block:: javascript

   returned callback @ 565()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``565``—``572`` 行；所属函数 ``useEffect callback @ 512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver?.disconnect``、``mutationObserver?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:20464:20516:FUNCTION

.. rubric:: ``segments.findIndex callback @ 582``

.. code-block:: javascript

   segments.findIndex callback @ 582(item)

实现 ``segments.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``582``—``582`` 行；所属函数 ``resolveCurrentSegmentInfo``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:21080:23884:FUNCTION

.. rubric:: ``memo callback @ 599``

.. code-block:: javascript

   memo callback @ 599({containerRef, msgId, speechState})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``599``—``660`` 行。

**参数**

``{containerRef, msgId, speechState}``
   调用方传入的 ``containerRef, msgId, speechState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div data-tts-overlay="true" data-tts-overlay-segment-index={currentOrderedIndex} data-tts-overlay-segment-id={currentSegment.id ?? ''} className="absolute inset-0 pointer-event…``。

**主要协作调用**：``useMemo``、``useSegmentHighlightRects``、``rects.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:21573:21686:FUNCTION

.. rubric:: ``useMemo callback @ 607``

.. code-block:: javascript

   useMemo callback @ 607()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``607``—``607`` 行；所属函数 ``memo callback @ 599``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveCurrentSegmentInfo``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx:23247:23839:FUNCTION

.. rubric:: ``rects.map callback @ 645``

.. code-block:: javascript

   rects.map callback @ 645(rect, index)

作为 ``rects.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``645``—``656`` 行；所属函数 ``memo callback @ 599``。

**参数**

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。
