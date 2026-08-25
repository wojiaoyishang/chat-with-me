src/components/markdown/card-block/utils 模块
==============================================================================================

.. js:module:: src/components/markdown/card-block/utils

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/utils.js``
* **模块标识**：``src/components/markdown/card-block/utils``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``./constants.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:141:224:FUNCTION

.. js:function:: toSafeString(value)

   实现 ``toSafeString`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``7``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof value === 'string' ? value : String(value ?? '')``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:274:457:FUNCTION

.. js:function:: stripCardReplaceTokensForPreview(content)

   实现 ``stripCardReplaceTokensForPreview`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``17`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``toSafeString(content) .replace(CARD_REPLACE_TOKEN_RE, '') .replace(/[ \t]+\n/g, '\n') .replace(/\n{3,}/g, '\n\n') .trim()``。

   **主要协作调用**：``toSafeString(content) .replace(CARD_REPLACE_TOKEN_RE, '') .replace(/[ \t]+\n/g, '\n') .replace(/\n{3,}/g, '\n\n') .trim``、``toSafeString(content) .replace(CARD_REPLACE_TOKEN_RE, '') .replace(/[ \t]+\n/g, '\n') .replace``、``toSafeString(content) .replace(CARD_REPLACE_TOKEN_RE, '') .replace``、``toSafeString(content) .replace``、``toSafeString``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:495:683:FUNCTION

.. js:function:: stripProgressMarkers(content)

   实现 ``stripProgressMarkers`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``19``—``25`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``toSafeString(content) .replace(PROGRESS_LINE_GLOBAL_RE, '') .replace(/[ \t]+\n/g, '\n') .replace(/\n{3,}/g, '\n\n') .trimEnd()``。

   **主要协作调用**：``toSafeString(content) .replace(PROGRESS_LINE_GLOBAL_RE, '') .replace(/[ \t]+\n/g, '\n') .replace(/\n{3,}/g, '\n\n') .tr…``、``toSafeString(content) .replace(PROGRESS_LINE_GLOBAL_RE, '') .replace(/[ \t]+\n/g, '\n') .replace``、``toSafeString(content) .replace(PROGRESS_LINE_GLOBAL_RE, '') .replace``、``toSafeString(content) .replace``、``toSafeString``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:724:1399:FUNCTION

.. js:function:: getLatestProgressMarker(content)

   读取与 ``Latest Progress Marker`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``27``—``52`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ current, total, isNotStarted: current === 0, isComplete: current >= total, }``。

   **主要协作调用**：``toSafeString``、``safeContent.matchAll``、``matches.at``、``Number.parseInt``、``Number.isFinite``、``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:1440:1733:FUNCTION

.. js:function:: getParagraphsForPreview(content)

   读取与 ``Paragraphs For Preview`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``54``—``65`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``previewContent .split(/\n\s*\n/) .map((paragraph) => paragraph.trim()) .filter((paragraph) => paragraph.length > 0)``。

   **主要协作调用**：``stripCardReplaceTokensForPreview``、``previewContent .split(/\n\s*\n/) .map((paragraph) => paragraph.trim()) .filter``、``previewContent .split(/\n\s*\n/) .map``、``previewContent .split``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:1772:2081:FUNCTION

.. js:function:: getLastLineForPreview(content)

   读取与 ``Last Line For Preview`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``67``—``80`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``allLines[allLines.length - 1] || ''``。

   **主要协作调用**：``stripCardReplaceTokensForPreview``、``previewContent .split('\n') .map((line) => line.trim()) .filter``、``previewContent .split('\n') .map``、``previewContent .split``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:1645:1676:FUNCTION

.. rubric:: ``previewContent .split(/\n\s*\n/) .map callback @ 63``

.. code-block:: javascript

   previewContent .split(/\n\s*\n/) .map callback @ 63(paragraph)

作为 ``previewContent .split(/\n\s*\n/) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``getParagraphsForPreview``。

**参数**

``paragraph``
   调用方传入的 ``paragraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``paragraph.trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:1694:1729:FUNCTION

.. rubric:: ``previewContent .split(/\n\s*\n/) .map((paragraph) => paragraph.trim()) .filter callback @ 64``

.. code-block:: javascript

   previewContent .split(/\n\s*\n/) .map((paragraph) => paragraph.trim()) .filter callback @ 64(paragraph)

作为 ``previewContent .split(/\n\s*\n/) .map((paragraph) => paragraph.trim()) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``getParagraphsForPreview``。

**参数**

``paragraph``
   调用方传入的 ``paragraph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/utils.js:1982:2003:FUNCTION

.. rubric:: ``previewContent .split('\n') .map callback @ 76``

.. code-block:: javascript

   previewContent .split('\n') .map callback @ 76(line)

作为 ``previewContent .split('\n') .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``getLastLineForPreview``。

**参数**

``line``
   调用方传入的 ``line`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``line.trim``。
