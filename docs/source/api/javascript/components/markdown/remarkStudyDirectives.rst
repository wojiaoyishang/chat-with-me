src/components/markdown/remarkStudyDirectives 模块
========================================================================================================

.. js:module:: src/components/markdown/remarkStudyDirectives

Document-only visual blocks. Directive attributes are never copied directly into HTML properties: only the small, validated public contract is kept.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/remarkStudyDirectives.js``
* **模块标识**：``src/components/markdown/remarkStudyDirectives``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``unified``、``remark-parse``、``remark-gfm``、``remark-math``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:249:417:FUNCTION

.. js:function:: shortText(value, fallback, limit)

   实现 ``shortText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``11`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``limit`` （默认值 ``120``）
      调用方传入的 ``limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text || fallback``。

   **主要协作调用**：``value.trim().replace(/\s+/g, ' ').slice``、``value.trim().replace``、``value.trim``。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:432:576:FUNCTION

.. js:function:: time(value)

   实现 ``time`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``16`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(text) ? text : ''``。

   **主要协作调用**：``value.trim``、``/^(?:[01]\d|2[0-3]):[0-5]\d$/.test``。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:577:6414:FUNCTION

.. js:function:: remarkStudyDirectives({ idPrefix = 'study', spec })

   Document-only visual blocks. Directive attributes are never copied directly into HTML properties: only the small, validated public contract is kept.

   **性质**：同步函数；导出 API；源码第 ``22``—``135`` 行。

   **参数**

   ``{ idPrefix = 'study', spec }`` （默认值 ``{}``）
      调用方传入的 ``idPrefix = 'study', spec`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree, file) => { const sessions = []; const source = typeof file?.value === 'string' ? file.value : ''; const rawSource = (node) => { const start = node.position?.start?.offset;…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``String(idPrefix).replace``、``String``、``(spec?.directives || []).map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:968:998:FUNCTION

.. rubric:: ``(spec?.directives || []).map callback @ 24``

.. code-block:: javascript

   (spec?.directives || []).map callback @ 24(entry)

作为 ``(spec?.directives || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``remarkStudyDirectives``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:1012:6411:FUNCTION

.. rubric:: ``returned callback @ 25``

.. code-block:: javascript

   returned callback @ 25(tree, file)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``134`` 行；所属函数 ``remarkStudyDirectives``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``transformChildren``、``JSON.stringify``、``tree.children.splice``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:1160:1465:FUNCTION

.. rubric:: ``rawSource``

.. code-block:: javascript

   rawSource(node)

实现 ``rawSource`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``35`` 行；所属函数 ``returned callback @ 25``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Number.isInteger(start) && Number.isInteger(end) && end >= start && end <= source.length ? source.slice(start, end) : null``。

**主要协作调用**：``Number.isInteger``、``source.slice``。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:1496:1842:FUNCTION

.. rubric:: ``shiftOffsets``

.. code-block:: javascript

   shiftOffsets(node, base)

实现 ``shiftOffsets`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``41`` 行；所属函数 ``returned callback @ 25``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``base``
   调用方传入的 ``base`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isInteger``、``shiftOffsets``。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:1875:2479:FUNCTION

.. rubric:: ``restoreUnknown``

.. code-block:: javascript

   restoreUnknown(node)

实现 ``restoreUnknown`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``55`` 行；所属函数 ``returned callback @ 25``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[{ type: 'text', value: raw ?? node.name ?? '', position: node.position }]``、``restored``、``node.children?.length ? node.children : [{ type: 'text', value: node.name || '' }]``。

**主要协作调用**：``rawSource``、``plainMarkdown.parse``、``restored.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:2281:2317:FUNCTION

.. rubric:: ``restored.forEach callback @ 51``

.. code-block:: javascript

   restored.forEach callback @ 51(child)

作为 ``restored.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``restoreUnknown``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``shiftOffsets``。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:2515:5667:FUNCTION

.. rubric:: ``transformChildren``

.. code-block:: javascript

   transformChildren(parent)

转换与 ``Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``57``—``116`` 行；所属函数 ``returned callback @ 25``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Array.isArray``、``['containerDirective', 'leafDirective', 'textDirective'].includes``、``directives.has``、``restoreUnknown``、``parent.children.splice``、``transformChildren``、``directives.get``、``allowed.map((item) => typeof item === 'string' ? item : item?.name).filter``、``allowed.map``、``Object.keys``、``Object.prototype.hasOwnProperty.call``、``allowed.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:3660:3714:FUNCTION

.. rubric:: ``allowed.map callback @ 78``

.. code-block:: javascript

   allowed.map callback @ 78(item)

作为 ``allowed.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``transformChildren``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/remarkStudyDirectives.js:4193:4222:FUNCTION

.. rubric:: ``allowed.find callback @ 85``

.. code-block:: javascript

   allowed.find callback @ 85(item)

作为 ``allowed.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``transformChildren``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
