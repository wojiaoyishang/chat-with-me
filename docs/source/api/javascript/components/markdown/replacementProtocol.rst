src/components/markdown/replacementProtocol 模块
====================================================================================================

.. js:module:: src/components/markdown/replacementProtocol

Keep card replacement controls as Markdown block boundaries. Streaming can concatenate a completed marker directly with a heading, e.g. \`{{cardReplace id=42:11}}# Title\`. Without an explicit line break Markdown parses both pieces into the same block, allowing the rendered card to overlap or inherit heading layout. This normalizer isolates complete markers w…

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/replacementProtocol.js``
* **模块标识**：``src/components/markdown/replacementProtocol``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:252:337:FUNCTION

.. js:function:: normalizeReplacementLineBreaks(value)

   规范化与 ``Replacement Line Breaks`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``8``—``10`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value ?? '') .replace(/\r\n/g, '\n') .replace``、``String(value ?? '') .replace``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:523:1160:FUNCTION

.. js:function:: isInsideInlineCode(line, index)

   判断与 ``Inside Inline Code`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``41`` 行。

   **参数**

   ``line``
      调用方传入的 ``line`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index``
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``activeDelimiterLength > 0``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:1186:1293:FUNCTION

.. js:function:: appendBlankLine(lines)

   追加与 ``Blank Line`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``47`` 行。

   **参数**

   ``lines``
      调用方传入的 ``lines`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``lines.push``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:1783:3928:FUNCTION

.. js:function:: normalizeCardReplaceBlockBoundaries(value)

   规范化与 ``Card Replace Block Boundaries`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``58``—``134`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``outputLines.join('\n')``。

   **主要协作调用**：``normalizeReplacementLineBreaks``、``normalized.split``、``MARKDOWN_FENCE_RE.exec``、``outputLines.push``、``String(fenceMatch[2] || '').trim``、``String``、``CARD_REPLACE_COMPLETE_TOKEN_RE.exec``、``isInsideInlineCode``、``matches.push``、``line.slice``、``before.trim``、``appendBlankLine``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:3949:4254:FUNCTION

.. js:function:: parseFlags(value)

   解析与 ``Flags`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``136``—``150`` 行。

   **参数**

   ``value``（默认值 ``''``）
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``flags``。

   **主要协作调用**：``String(value || '') .trim() .split(/\s+/) .filter(Boolean) .forEach``、``String(value || '') .trim() .split(/\s+/) .filter``、``String(value || '') .trim() .split``、``String(value || '') .trim``、``String``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:4508:7105:FUNCTION

.. js:function:: parseReplacementProtocol(content, {isStreaming = false})

   解析与 ``Replacement Protocol`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``160``—``233`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``{isStreaming = false}``（默认值 ``{}``）
      调用方传入的 ``isStreaming = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ type: null, flags: new Set(), content: normalizedContent, hadMarker: false, incomplete: false, }``、``{ type, flags, content: nextLines.join('\n'), hadMarker: true, incomplete: false, }``、``{ type: 'markdown', flags: new Set(), content: nextLines.join('\n'), hadMarker: false, incomplete: true, }``。

   **主要协作调用**：``normalizeReplacementLineBreaks``、``normalizedContent.split``、``originalLine.trim``、``originalLine.trimStart``、``originalLine.slice``、``PROTOCOL_MARKER_RE.exec``、``type.toLowerCase``、``parseFlags``、``trailingContent.replace``、``nextLines.join``、``body.startsWith``、``body.toLowerCase``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:7140:7825:FUNCTION

.. js:function:: getReplacementEntryValue(entry)

   读取与 ``Replacement Entry Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``235``—``260`` 行。

   **参数**

   ``entry``
      调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ content: entry, entryType: '', allowTts: false, contextStatus: null, }``、``{ content: entry.content ?? entry.frontend ?? entry.value ?? '', entryType: entry.type || '', allowTts: entry.allowTts === true || entry.tts === true, contextStatus: entry.context…``、``{ content: String(entry ?? ''), entryType: '', allowTts: false, contextStatus: null, }``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:7868:10074:FUNCTION

.. js:function:: normalizeReplacementEntry(replacement, id, tokenType, isStreaming)

   规范化与 ``Replacement Entry`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``262``—``331`` 行。

   **参数**

   ``replacement``
      调用方传入的 ``replacement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``tokenType``（默认值 ``''``）
      调用方传入的 ``tokenType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``isStreaming``（默认值 ``false``）
      调用方传入的 ``isStreaming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ exists: false, id: normalizedId, type: explicitTokenType || 'markdown', flags: new Set(), allowTts: false, contextStatus: null, content: '', incompleteProtocol: false, }``、``{ exists: true, id: normalizedId, type: resolvedType, flags: protocol.flags, allowTts, contextStatus: extracted.contextStatus, content: shouldStripProtocol ? protocol.content : no…``。

   **主要协作调用**：``String``、``String(tokenType || '').trim``、``getReplacementEntryValue``、``normalizeReplacementLineBreaks``、``parseReplacementProtocol``、``String( explicitTokenType || extracted.entryType || protocol.type || 'markdown', ).trim``、``resolvedType.toLowerCase``、``String(protocol.type || '').toLowerCase``、``Boolean``、``protocol.flags.has``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:10118:10892:FUNCTION

.. js:function:: parseCardReplaceAttributes(attributes)

   解析与 ``Card Replace Attributes`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``333``—``358`` 行。

   **参数**

   ``attributes``（默认值 ``''``）
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``String(attributes || '').trim``、``String``、``attrRegex.exec``、``key.includes``、``Array.isArray``、``result.__tokens.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:10940:11083:FUNCTION

.. js:function:: getCardReplaceIdFromAttributes(attributes)

   读取与 ``Card Replace Id From Attributes`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``360``—``366`` 行。

   **参数**

   ``attributes``（默认值 ``{}``）
      调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String( attributes.id || attributes.cardId || attributes.replaceId || attributes.name || '', ).trim``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:4102:4231:FUNCTION

.. rubric:: ``String(value || '') .trim() .split(/\s+/) .filter(Boolean) .forEach callback @ 143``

.. code-block:: javascript

   String(value || '') .trim() .split(/\s+/) .filter(Boolean) .forEach callback @ 143(token)

作为 ``String(value || '') .trim() .split(/\s+/) .filter(Boolean) .forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``143``—``147`` 行；所属函数 ``parseFlags``。

**参数**

``token``
   调用方传入的 ``token`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``FLAG_TOKEN_RE.test``、``flags.add``、``token.toLowerCase``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:6396:6519:FUNCTION

.. rubric:: ``STREAMING_MARKDOWN_MARKER_CANDIDATES.some callback @ 205``

.. code-block:: javascript

   STREAMING_MARKDOWN_MARKER_CANDIDATES.some callback @ 205(candidate)

作为 ``STREAMING_MARKDOWN_MARKER_CANDIDATES.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``205``—``207`` 行；所属函数 ``parseReplacementProtocol``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``candidate.startsWith(normalizedBody) && normalizedBody !== candidate``。

**主要协作调用**：``candidate.startsWith``。

.. CWM-AST-FUNCTION src/components/markdown/replacementProtocol.js:10773:10810:FUNCTION

.. rubric:: ``result.__tokens.find callback @ 353``

.. code-block:: javascript

   result.__tokens.find callback @ 353(token)

作为 ``result.__tokens.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``353``—``353`` 行；所属函数 ``parseCardReplaceAttributes``。

**参数**

``token``
   调用方传入的 ``token`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
