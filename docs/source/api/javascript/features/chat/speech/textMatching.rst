src/features/chat/speech/textMatching 模块
========================================================================================

.. js:module:: src/features/chat/speech/textMatching

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/textMatching.js``
* **模块标识**：``src/features/chat/speech/textMatching``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:39:136:FUNCTION

.. js:function:: normalizeSpeechMatchText(value)

   规范化与 ``Speech Match Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``4`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value ?? '') .replace(/[​-‍ ]/g, '') .replace(/\s+/g, ' ') .trim``、``String(value ?? '') .replace(/[​-‍ ]/g, '') .replace``、``String(value ?? '') .replace``、``String``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:175:292:FUNCTION

.. js:function:: stripSpeechListMarker(value)

   实现 ``stripSpeechListMarker`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``6``—``8`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSpeechMatchText(value) .replace(/^\s*(?:[-*+•‣⁃]|\d+[.)、]|[a-zA-Z][.)])\s+/, '') .trim``、``normalizeSpeechMatchText(value) .replace``、``normalizeSpeechMatchText``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:331:732:FUNCTION

.. js:function:: getSpeechTextVariants(value)

   读取与 ``Speech Text Variants`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``10``—``22`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``Array.from(new Set([raw, withoutListMarker, withoutMarkdown].filter(Boolean)))``。

   **主要协作调用**：``normalizeSpeechMatchText``、``stripSpeechListMarker``、``withoutListMarker .replace(/^[>]+\s*/, '') .replace``、``withoutListMarker .replace``、``Array.from``、``[raw, withoutListMarker, withoutMarkdown].filter``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:770:891:FUNCTION

.. js:function:: getSpeechSegmentText(segment)

   读取与 ``Speech Segment Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``24``—``30`` 行。

   **参数**

   ``segment``
      调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:937:1003:FUNCTION

.. js:function:: getSpeechSegmentTextVariants(segment)

   读取与 ``Speech Segment Text Variants`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``32``—``32`` 行。

   **参数**

   ``segment``
      调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getSpeechTextVariants``、``getSpeechSegmentText``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:1050:1823:FUNCTION

.. js:function:: resolveSpeechSegmentByLocator(segments, locator)

   解析并确定与 ``Speech Segment By Locator`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``34``—``50`` 行。

   **参数**

   ``segments``（默认值 ``[]``）
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``locator``（默认值 ``{}``）
      调用方传入的 ``locator`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``byId``、``segments[position]``、``segments[index]``。

   **主要协作调用**：``Array.isArray``、``segments.find``、``Number``、``Number.isInteger``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:1872:1995:FUNCTION

.. js:function:: resolveSpeechSegmentIdByLocator(segments, locator, fallback)

   解析并确定与 ``Speech Segment Id By Locator`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``52``—``54`` 行。

   **参数**

   ``segments``（默认值 ``[]``）
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``locator``（默认值 ``{}``）
      调用方传入的 ``locator`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``（默认值 ``null``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``resolveSpeechSegmentByLocator``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:2033:2095:FUNCTION

.. js:function:: isActiveSpeechStatus(status)

   判断与 ``Active Speech Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``56``—``56`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:2133:2221:FUNCTION

.. js:function:: getSpeechElementText(element)

   读取与 ``Speech Element Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``58``—``58`` 行。

   **参数**

   ``element``
      调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSpeechMatchText``。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:2256:2753:FUNCTION

.. js:function:: getSpeechTagScore(element)

   读取与 ``Speech Tag Score`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``60``—``70`` 行。

   **参数**

   ``element``
      调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``180``、``175``、``140``、``130``。

   **主要协作调用**：``element?.tagName?.toLowerCase``、``element?.getAttribute``、``['p', 'blockquote', 'td', 'th', 'figcaption', 'summary'].includes``、``/^h[1-6]$/.test``、``['pre', 'code'].includes``、``['span', 'strong', 'em'].includes``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/textMatching.js:1312:1350:FUNCTION

.. rubric:: ``segments.find callback @ 39``

.. code-block:: javascript

   segments.find callback @ 39(item)

作为 ``segments.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``resolveSpeechSegmentByLocator``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。
