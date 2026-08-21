src/features/chat/ui/message/utils/speechContent 模块
===================================================

.. js:module:: src/features/chat/ui/message/utils/speechContent

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/utils/speechContent.js``
* **模块标识**：``src/features/chat/ui/message/utils/speechContent``
* **顶层函数/组件/Hook**：18
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------

``@/components/markdown/replacementProtocol.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1093:1210:FUNCTION

.. js:function:: normalizeSpeechText(value)

   规范化与 ``Speech Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``23``—``26`` 行。

   **参数**

   ``value``（默认值 ``''``）
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value ?? '') .replace(/[\u200B-\u200D\uFEFF]/g, '') .replace(/\s+/g, ' ') .trim``、``String(value ?? '') .replace(/[\u200B-\u200D\uFEFF]/g, '') .replace``、``String(value ?? '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1296:1751:FUNCTION

.. js:function:: getNormalizedPrefixLength(source, rawIndex)

   读取与 ``Normalized Prefix Length`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``38`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rawIndex``
      调用方传入的 ``rawIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``normalizedPrefix.length + (shouldIncludeCollapsedSpace ? 1 : 0)``。

   **主要协作调用**：``String(source \|\| '').slice``、``String``、``Math.max``、``normalizeSpeechText``、``/\s/.test``、``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1784:1818:FUNCTION

.. js:function:: canSpeakMessage(msg)

   实现 ``canSpeakMessage`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``40``—``40`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1847:2425:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes, replacement)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``56`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``Boolean( id && replacement && typeof replacement === 'object' && Object.prototype.hasOwnProperty.call(replacement, id), )``。

   **主要协作调用**：``String(directiveName \|\| '').toLowerCase``、``String``、``String(attributes?.type \|\| '').trim().toLowerCase``、``String(attributes?.type \|\| '').trim``、``getCardReplaceIdFromAttributes``、``Boolean``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:2470:3745:FUNCTION

.. js:function:: collectCardReplaceDirectiveMatches(source)

   实现 ``collectCardReplaceDirectiveMatches`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``99`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nonOverlapping``。

   **主要协作调用**：``directiveRegexes.forEach``、``matches.sort``、``matches.forEach``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:3787:5166:FUNCTION

.. js:function:: resolveReplacementSpeechContent(directiveName, rawAttributes, replacement, options)

   解析并确定与 ``Replacement Speech Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``101``—``142`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rawAttributes``
      调用方传入的 ``rawAttributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``resolveMarkdownSpeechContent(normalized.content, replacement, { depth: depth + 1, maxDepth, visitedIds: [...visitedIds, replacementId], includeOwnText, })``。

   **主要协作调用**：``parseCardReplaceAttributes``、``isReplaceDirective``、``getCardReplaceIdFromAttributes``、``visitedIds.includes``、``String(attributes.type \|\| '').trim``、``String``、``rawTokenType.toLowerCase``、``normalizeReplacementEntry``、``String(normalized.type \|\| '').toLowerCase``、``resolveMarkdownSpeechContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:5212:6587:FUNCTION

.. js:function:: resolveMarkdownSpeechContent(content, replacement, options)

   解析并确定与 ``Markdown Speech Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``144``—``194`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement``（默认值 ``{}``）
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, ' ') .replace(CARD_REPLACE_MUSTACHE_RE, ' ')``、``includeOwnText ? source : ''``、``result``。

   **主要协作调用**：``String(content ?? '').replace(/\r\n/g, '\n').replace``、``String(content ?? '').replace``、``String``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, ' ') .replace``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ') .replace``、``source .replace``、``collectCardReplaceDirectiveMatches``、``directiveMatches.forEach``、``source.slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:6624:7379:FUNCTION

.. js:function:: getSpeakableContent(msg)

   读取与 ``Speakable Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``196``—``218`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``raw // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace(FENCED_CODE_PATTERN, '\n') .replace(INLINE_CODE_PATTERN, '$1') .replace(MARKDOWN_TABLE_SEPARATOR_ROW_PATTERN, '\n') .replace(/…``。

   **主要协作调用**：``resolveMarkdownSpeechContent``、``String``、``raw // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace(FENCED_CODE_PATTERN, '\n') .replace(INLINE_CODE_PATTERN, '$1') .re…``、``raw // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace(FENCED_CODE_PATTERN, '\n') .replace``、``raw // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:7397:7429:FUNCTION

.. js:function:: isDigit(char)

   判断与 ``Digit`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``220``—``220`` 行。

   **参数**

   ``char``
      调用方传入的 ``char`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``/\d/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:7453:7595:FUNCTION

.. js:function:: getLinePrefix(source, index)

   读取与 ``Line Prefix`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``222``—``225`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``source.slice(lineStart, index)``。

   **主要协作调用**：``source.lastIndexOf``、``Math.max``、``source.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:7630:7872:FUNCTION

.. js:function:: isMarkdownOrderedListDot(source, index)

   判断与 ``Markdown Ordered List Dot`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``227``—``233`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``MARKDOWN_ORDERED_LIST_PATTERN.test(prefix) && /\s/.test(nextChar)``。

   **主要协作调用**：``getLinePrefix``、``MARKDOWN_ORDERED_LIST_PATTERN.test``、``/\s/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:7901:8408:FUNCTION

.. js:function:: isAsciiSentenceDot(source, index)

   判断与 ``Ascii Sentence Dot`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``235``—``249`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``!nextChar \|\| /\s/.test(nextChar) \|\| CLOSING_SENTENCE_CHARS.has(nextChar)``。

   **主要协作调用**：``isDigit``、``isMarkdownOrderedListDot``、``/\s/.test``、``CLOSING_SENTENCE_CHARS.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:8446:9162:FUNCTION

.. js:function:: consumeClosingSentenceChars(source, index)

   实现 ``consumeClosingSentenceChars`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``251``—``282`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``cursor``。

   **主要协作调用**：``CLOSING_SENTENCE_CHARS.has``、``SENTENCE_END_CHARS.has``、``source.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9192:9896:FUNCTION

.. js:function:: getSentenceBreakEnd(source, index)

   读取与 ``Sentence Break End`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``284``—``308`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``index``、``consumeClosingSentenceChars(source, cursor)``、``consumeClosingSentenceChars(source, index + ASCII_ELLIPSIS.length)``、``consumeClosingSentenceChars(source, index + 1)``。

   **主要协作调用**：``consumeClosingSentenceChars``、``source.slice``、``SENTENCE_END_CHARS.has``、``isAsciiSentenceDot``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9926:10564:FUNCTION

.. js:function:: createSpeechSegment(source, rawStart, rawEnd, msgId, index, occurrenceMap)

   创建与 ``Speech Segment`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``310``—``329`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rawStart``
      调用方传入的 ``rawStart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rawEnd``
      调用方传入的 ``rawEnd`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``msgId``
      目标对象的公共或运行时标识。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``occurrenceMap``
      调用方传入的 ``occurrenceMap`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ id: \`${msgId}:tts:${index}\`, index, position: index, text, rawStart, rawEnd, normalizedStart: getNormalizedPrefixLength(source, rawStart), occurrenceIndex, occurrenceKey: normal…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``normalizeWhitespace``、``source.slice``、``normalizeSpeechText(text).toLowerCase``、``normalizeSpeechText``、``occurrenceMap.get``、``occurrenceMap.set``、``getNormalizedPrefixLength``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:10602:11598:FUNCTION

.. js:function:: splitSourceIntoSpeechSlices(source)

   实现 ``splitSourceIntoSpeechSlices`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``331``—``370`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``slices``。

   **主要协作调用**：``getSentenceBreakEnd``、``slices.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:11638:12551:FUNCTION

.. js:function:: splitSpeakableSegments(text, msgId)

   实现 ``splitSpeakableSegments`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``372``—``406`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``msgId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``segments``。

   **主要协作调用**：``String``、``splitSourceIntoSpeechSlices(source).forEach``、``splitSourceIntoSpeechSlices``、``normalizeWhitespace``、``segments.push``、``normalizeSpeechText(text).toLowerCase``、``normalizeSpeechText``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:12589:12661:FUNCTION

.. js:function:: getSpeakableSegments(msg, msgId)

   读取与 ``Speakable Segments`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``408``—``408`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``msgId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``splitSpeakableSegments``、``getSpeakableContent``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:2700:3305:FUNCTION

.. rubric:: ``directiveRegexes.forEach callback @ 66``

.. code-block:: javascript

   directiveRegexes.forEach callback @ 66(directiveRegex)

作为 ``directiveRegexes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``82`` 行；所属函数 ``collectCardReplaceDirectiveMatches``。

**参数**

``directiveRegex``
   调用方传入的 ``directiveRegex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``directiveRegex.exec``、``matches.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:3326:3491:FUNCTION

.. rubric:: ``matches.sort callback @ 84``

.. code-block:: javascript

   matches.sort callback @ 84(left, right)

作为 ``matches.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``87`` 行；所属函数 ``collectCardReplaceDirectiveMatches``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``left.start - right.start``、``(right.end - right.start) - (left.end - left.start)``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:3575:3713:FUNCTION

.. rubric:: ``matches.forEach callback @ 92``

.. code-block:: javascript

   matches.forEach callback @ 92(match)

作为 ``matches.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``96`` 行；所属函数 ``collectCardReplaceDirectiveMatches``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nonOverlapping.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:6001:6464:FUNCTION

.. rubric:: ``directiveMatches.forEach callback @ 170``

.. code-block:: javascript

   directiveMatches.forEach callback @ 170(match)

作为 ``directiveMatches.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``170``—``187`` 行；所属函数 ``resolveMarkdownSpeechContent``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``source.slice``、``resolveReplacementSpeechContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:11808:12077:FUNCTION

.. rubric:: ``splitSourceIntoSpeechSlices(source).forEach callback @ 377``

.. code-block:: javascript

   splitSourceIntoSpeechSlices(source).forEach callback @ 377(slice)

作为 ``splitSourceIntoSpeechSlices(source).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``377``—``388`` 行；所属函数 ``splitSpeakableSegments``。

**参数**

``slice``
   调用方传入的 ``slice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSpeechSegment``、``segments.push``。
