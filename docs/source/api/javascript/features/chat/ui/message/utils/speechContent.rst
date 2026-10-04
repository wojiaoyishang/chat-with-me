src/features/chat/ui/message/utils/speechContent 模块
==============================================================================================================

.. js:module:: src/features/chat/ui/message/utils/speechContent

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/utils/speechContent.js``
* **模块标识**：``src/features/chat/ui/message/utils/speechContent``
* **顶层函数/组件/Hook**：24
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/speech/frontendFeedback.js``、``@/components/markdown/replacementProtocol.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1193:1326:FUNCTION

.. js:function:: normalizeSpeechText(value)

   规范化与 ``Speech Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``22``—``26`` 行。

   **参数**

   ``value``（默认值 ``''``）
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value ?? '') .replace(/[\u200B-\u200D\uFEFF]/g, '') .replace(/\s+/g, ' ') .trim``、``String(value ?? '') .replace(/[\u200B-\u200D\uFEFF]/g, '') .replace``、``String(value ?? '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1412:1867:FUNCTION

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

   **主要协作调用**：``String(source || '').slice``、``String``、``Math.max``、``normalizeSpeechText``、``/\s/.test``、``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1900:1934:FUNCTION

.. js:function:: canSpeakMessage(msg)

   实现 ``canSpeakMessage`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``40``—``40`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:1963:2565:FUNCTION

.. js:function:: isReplaceDirective(directiveName, attributes, replacement)

   判断与 ``Replace Directive`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``58`` 行。

   **参数**

   ``directiveName``
      调用方传入的 ``directiveName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``attributes``
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``false``、``Boolean( id && replacement && typeof replacement === 'object' && Object.prototype.hasOwnProperty.call(replacement, id), )``。

   **主要协作调用**：``String(directiveName || '').toLowerCase``、``String``、``String(attributes?.type || '') .trim() .toLowerCase``、``String(attributes?.type || '') .trim``、``getCardReplaceIdFromAttributes``、``Boolean``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:2610:3883:FUNCTION

.. js:function:: collectCardReplaceDirectiveMatches(source)

   实现 ``collectCardReplaceDirectiveMatches`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``101`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nonOverlapping``。

   **主要协作调用**：``directiveRegexes.forEach``、``matches.sort``、``matches.forEach``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:3925:5253:FUNCTION

.. js:function:: resolveReplacementSpeechContent(directiveName, rawAttributes, replacement, options)

   解析并确定与 ``Replacement Speech Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``103``—``131`` 行。

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

   根据执行分支返回结果；代表性返回表达式为 ``''``、``resolveMarkdownSpeechContent(normalized.content, replacement, { depth: depth + 1, maxDepth, visitedIds: [...visitedIds, replacementId], includeOwnText, feedback, })``。

   **主要协作调用**：``parseCardReplaceAttributes``、``isReplaceDirective``、``getCardReplaceIdFromAttributes``、``visitedIds.includes``、``String(attributes.type || '').trim``、``String``、``rawTokenType.toLowerCase``、``normalizeReplacementEntry``、``String(normalized.type || '').toLowerCase``、``resolveMarkdownSpeechContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:5285:5958:FUNCTION

.. js:function:: resolveSpeechFragment(source, includeOwnText, feedback)

   解析并确定与 ``Speech Fragment`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``133``—``149`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``includeOwnText``
      调用方传入的 ``includeOwnText`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``feedback``
      调用方传入的 ``feedback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``items .filter((item) => item.trigger === 'next_speech_start') .map((item) => \x60\n\uE000${item.toolid}\uE001\n\x60) .join('')``、``stripFrontendFeedback(result)``。

   **主要协作调用**：``parseFrontendFeedback``、``items .filter((item) => item.trigger === 'next_speech_start') .map((item) => \x60\n\uE000${item.toolid}\uE001\n\x60) .join``、``items .filter((item) => item.trigger === 'next_speech_start') .map``、``items .filter``、``result.replaceAll``、``stripFrontendFeedback``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:6004:7477:FUNCTION

.. js:function:: resolveMarkdownSpeechContent(content, replacement, options)

   解析并确定与 ``Markdown Speech Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``151``—``198`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``replacement``（默认值 ``{}``）
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, ' ') .replace(CARD_REPLACE_MUSTACHE_RE, ' ')``、``resolveSpeechFragment(source, includeOwnText, feedback)``、``result``。

   **主要协作调用**：``String(content ?? '') .replace(/\r\n/g, '\n') .replace``、``String(content ?? '') .replace``、``String``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ') .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, ' ') .replace``、``source .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ') .replace``、``source .replace``、``collectCardReplaceDirectiveMatches``、``resolveSpeechFragment``、``directiveMatches.forEach``、``source.slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:7517:8126:FUNCTION

.. js:function:: stripIncompleteFencedCodeTail(value)

   实现 ``stripIncompleteFencedCodeTail`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``200``—``217`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``openFence ? source.slice(0, openFence.start) : source``。

   **主要协作调用**：``String``、``fencePattern.exec``、``match[0].trim().slice``、``match[0].trim``、``source.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:8159:9087:FUNCTION

.. js:function:: cleanSpeakableMarkdown(value, { preserveTrailingBoundary = false })

   实现 ``cleanSpeakableMarkdown`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``219``—``239`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``{ preserveTrailingBoundary = false }``（默认值 ``{}``）
      调用方传入的 ``preserveTrailingBoundary = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``preserveTrailingBoundary ? cleaned.replace(/^\s+/, '') : cleaned.trim()``。

   **主要协作调用**：``String(value || '') // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace(FENCED_CODE_PATTERN, '\n') .replace(INLINE_CODE_PA…``、``String(value || '') // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace(FENCED_CODE_PATTERN, '\n') .replace``、``String(value || '') // 跳过 fenced code block；表格不跳过，只清理表格分隔行。 .replace``、``String``、``cleaned.replace``、``cleaned.trim``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9124:9166:FUNCTION

.. js:function:: getSpeakableContent(msg)

   读取与 ``Speakable Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``241``—``241`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``feedbackSpeechSource``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9184:9216:FUNCTION

.. js:function:: isDigit(char)

   判断与 ``Digit`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``243``—``243`` 行。

   **参数**

   ``char``
      调用方传入的 ``char`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``/\d/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9240:9382:FUNCTION

.. js:function:: getLinePrefix(source, index)

   读取与 ``Line Prefix`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``245``—``248`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``source.slice(lineStart, index)``。

   **主要协作调用**：``source.lastIndexOf``、``Math.max``、``source.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9417:9659:FUNCTION

.. js:function:: isMarkdownOrderedListDot(source, index)

   判断与 ``Markdown Ordered List Dot`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``250``—``256`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``MARKDOWN_ORDERED_LIST_PATTERN.test(prefix) && /\s/.test(nextChar)``。

   **主要协作调用**：``getLinePrefix``、``MARKDOWN_ORDERED_LIST_PATTERN.test``、``/\s/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:9688:10195:FUNCTION

.. js:function:: isAsciiSentenceDot(source, index)

   判断与 ``Ascii Sentence Dot`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``258``—``272`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``!nextChar || /\s/.test(nextChar) || CLOSING_SENTENCE_CHARS.has(nextChar)``。

   **主要协作调用**：``isDigit``、``isMarkdownOrderedListDot``、``/\s/.test``、``CLOSING_SENTENCE_CHARS.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:10233:10949:FUNCTION

.. js:function:: consumeClosingSentenceChars(source, index)

   实现 ``consumeClosingSentenceChars`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``274``—``305`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``cursor``。

   **主要协作调用**：``CLOSING_SENTENCE_CHARS.has``、``SENTENCE_END_CHARS.has``、``source.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:10979:11683:FUNCTION

.. js:function:: getSentenceBreakEnd(source, index)

   读取与 ``Sentence Break End`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``307``—``331`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``index``、``consumeClosingSentenceChars(source, cursor)``、``consumeClosingSentenceChars(source, index + ASCII_ELLIPSIS.length)``、``consumeClosingSentenceChars(source, index + 1)``。

   **主要协作调用**：``consumeClosingSentenceChars``、``source.slice``、``SENTENCE_END_CHARS.has``、``isAsciiSentenceDot``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:11713:12351:FUNCTION

.. js:function:: createSpeechSegment(source, rawStart, rawEnd, msgId, index, occurrenceMap)

   创建与 ``Speech Segment`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``333``—``352`` 行。

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

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ id: \x60${msgId}:tts:${index}\x60, index, position: index, text, rawStart, rawEnd, normalizedStart: getNormalizedPrefixLength(source, rawStart), occurrenceIndex, occurrenceKey: normal…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``normalizeWhitespace``、``source.slice``、``normalizeSpeechText(text).toLowerCase``、``normalizeSpeechText``、``occurrenceMap.get``、``occurrenceMap.set``、``getNormalizedPrefixLength``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:12389:13437:FUNCTION

.. js:function:: splitSourceIntoSpeechSlices(source, { includeTrailing = true })

   实现 ``splitSourceIntoSpeechSlices`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``354``—``393`` 行。

   **参数**

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ includeTrailing = true }``（默认值 ``{}``）
      调用方传入的 ``includeTrailing = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``slices``。

   **主要协作调用**：``getSentenceBreakEnd``、``slices.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:13477:14390:FUNCTION

.. js:function:: splitSpeakableSegments(text, msgId)

   实现 ``splitSpeakableSegments`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``395``—``429`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``msgId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``segments``。

   **主要协作调用**：``String``、``splitSourceIntoSpeechSlices(source).forEach``、``splitSourceIntoSpeechSlices``、``normalizeWhitespace``、``segments.push``、``normalizeSpeechText(text).toLowerCase``、``normalizeSpeechText``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:14421:15064:FUNCTION

.. js:function:: feedbackSpeechSource(msg, streaming)

   实现 ``feedbackSpeechSource`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``431``—``444`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``streaming``（默认值 ``false``）
      调用方传入的 ``streaming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ source: source.replace(/\uE000[a-f0-9-]{36}\uE001/g, ''), anchors }``。

   **主要协作调用**：``resolveMarkdownSpeechContent``、``String``、``stripIncompleteFencedCodeTail``、``cleanSpeakableMarkdown``、``source.matchAll``、``anchors.push``、``source.replace``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:15089:15371:FUNCTION

.. js:function:: attachFeedback(segments, anchors)

   实现 ``attachFeedback`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``446``—``452`` 行。

   **参数**

   ``segments``
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``anchors``
      调用方传入的 ``anchors`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``segments``。

   **主要协作调用**：``segments.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:15409:15563:FUNCTION

.. js:function:: getSpeakableSegments(msg, msgId)

   读取与 ``Speakable Segments`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``454``—``457`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``msgId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``attachFeedback(splitSpeakableSegments(source, msgId), anchors)``。

   **主要协作调用**：``feedbackSpeechSource``、``attachFeedback``、``splitSpeakableSegments``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:15610:16496:FUNCTION

.. js:function:: getStreamingSpeakableSegments(msg, msgId, { final = false })

   读取与 ``Streaming Speakable Segments`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``459``—``482`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``msgId``
      目标对象的公共或运行时标识。

   ``{ final = false }``（默认值 ``{}``）
      调用方传入的 ``final = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``attachFeedback(splitSpeakableSegments(source, msgId), anchors)``、``attachFeedback(segments, anchors)``。

   **主要协作调用**：``feedbackSpeechSource``、``splitSourceIntoSpeechSlices(source, { includeTrailing: Boolean(final) }).forEach``、``splitSourceIntoSpeechSlices``、``Boolean``、``normalizeWhitespace``、``attachFeedback``、``splitSpeakableSegments``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:2840:3445:FUNCTION

.. rubric:: ``directiveRegexes.forEach callback @ 68``

.. code-block:: javascript

   directiveRegexes.forEach callback @ 68(directiveRegex)

作为 ``directiveRegexes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``84`` 行；所属函数 ``collectCardReplaceDirectiveMatches``。

**参数**

``directiveRegex``
   调用方传入的 ``directiveRegex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``directiveRegex.exec``、``matches.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:3466:3629:FUNCTION

.. rubric:: ``matches.sort callback @ 86``

.. code-block:: javascript

   matches.sort callback @ 86(left, right)

作为 ``matches.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``89`` 行；所属函数 ``collectCardReplaceDirectiveMatches``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``left.start - right.start``、``right.end - right.start - (left.end - left.start)``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:3713:3851:FUNCTION

.. rubric:: ``matches.forEach callback @ 94``

.. code-block:: javascript

   matches.forEach callback @ 94(match)

作为 ``matches.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``98`` 行；所属函数 ``collectCardReplaceDirectiveMatches``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nonOverlapping.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:5457:5503:FUNCTION

.. rubric:: ``items .filter callback @ 137``

.. code-block:: javascript

   items .filter callback @ 137(item)

作为 ``items .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``resolveSpeechFragment``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:5522:5564:FUNCTION

.. rubric:: ``items .filter((item) => item.trigger === 'next_speech_start') .map callback @ 138``

.. code-block:: javascript

   items .filter((item) => item.trigger === 'next_speech_start') .map callback @ 138(item)

作为 ``items .filter((item) => item.trigger === 'next_speech_start') .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``resolveSpeechFragment``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:6819:7323:FUNCTION

.. rubric:: ``directiveMatches.forEach callback @ 174``

.. code-block:: javascript

   directiveMatches.forEach callback @ 174(match)

作为 ``directiveMatches.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``174``—``191`` 行；所属函数 ``resolveMarkdownSpeechContent``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveSpeechFragment``、``source.slice``、``resolveReplacementSpeechContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:13647:13916:FUNCTION

.. rubric:: ``splitSourceIntoSpeechSlices(source).forEach callback @ 400``

.. code-block:: javascript

   splitSourceIntoSpeechSlices(source).forEach callback @ 400(slice)

作为 ``splitSourceIntoSpeechSlices(source).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``400``—``411`` 行；所属函数 ``splitSpeakableSegments``。

**参数**

``slice``
   调用方传入的 ``slice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSpeechSegment``、``segments.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:15189:15226:FUNCTION

.. rubric:: ``segments.find callback @ 448``

.. code-block:: javascript

   segments.find callback @ 448(item)

作为 ``segments.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``448``—``448`` 行；所属函数 ``attachFeedback``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/speechContent.js:15866:16134:FUNCTION

.. rubric:: ``splitSourceIntoSpeechSlices(source, { includeTrailing: Boolean(final) }).forEach callback @ 464``

.. code-block:: javascript

   splitSourceIntoSpeechSlices(source, { includeTrailing: Boolean(final) }).forEach callback @ 464(slice)

作为 ``splitSourceIntoSpeechSlices(source, { includeTrailing: Boolean(final) }).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``464``—``474`` 行；所属函数 ``getStreamingSpeakableSegments``。

**参数**

``slice``
   调用方传入的 ``slice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSpeechSegment``、``segments.push``。
