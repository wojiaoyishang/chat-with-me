src/lib/virtualUrl 模块
================================================================================

.. js:module:: src/lib/virtualUrl

Resolve the canonical cwm:// resource scheme to a browser URL. Returns null for non-cwm URLs and an empty string for invalid/tool-only cwm URLs. IMPORTANT: resolving is a browser-rendering operation. cwm://workspace/... and cwm://host/... are opaque/lazy tool resources and MUST NOT trigger network I/O merely because a React component rendered them.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/virtualUrl.js``
* **模块标识**：``src/lib/virtualUrl``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:69:279:FUNCTION

.. js:function:: decodeSegments(path)

   解码与 ``Segments`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``12`` 行。

   **参数**

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(path || '') .split('/') .filter(Boolean) .map(segment => decodeURIComponent(segment))``、``null``。

   **主要协作调用**：``String(path || '') .split('/') .filter(Boolean) .map``、``String(path || '') .split('/') .filter``、``String(path || '') .split``、``String``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:304:381:FUNCTION

.. js:function:: encodeSegments(segments)

   编码与 ``Segments`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``14`` 行。

   **参数**

   ``segments``
      调用方传入的 ``segments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``segments.map(segment => encodeURIComponent(segment)).join``、``segments.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:604:1253:FUNCTION

.. js:function:: classifyCwmUrl(value)

   实现 ``classifyCwmUrl`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``21``—``37`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{kind: 'invalid', authority: ''}``、``{kind: 'browser-renderable', authority}``、``{kind: 'tool-only', authority}``。

   **主要协作调用**：``value.trim``、``raw.toLowerCase().startsWith``、``raw.toLowerCase``、``/[?#]/.test``、``/^cwm:\/\/([a-z]+)(?:\/(.*))?$/i.exec``、``match[1].toLowerCase``、``BROWSER_RENDERABLE_AUTHORITIES.has``、``TOOL_ONLY_AUTHORITIES.has``。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:1296:1360:FUNCTION

.. js:function:: isBrowserRenderableCwmUrl(value)

   判断与 ``Browser Renderable Cwm Url`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``39``—``39`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``classifyCwmUrl``。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:1393:1448:FUNCTION

.. js:function:: isToolOnlyCwmUrl(value)

   判断与 ``Tool Only Cwm Url`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``40``—``40`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``classifyCwmUrl``。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:1856:3256:FUNCTION

.. js:function:: resolveCwmUrl(value)

   解析并确定与 ``Cwm Url`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``50``—``78`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``''``、``segments[1] === 'preview' ? \x60${base}/upload/preview/${id}\x60 : \x60${base}/upload/${id}\x60``、``\x60${base}/public/${encodeSegments(segments)}\x60``。

   **主要协作调用**：``value.trim``、``raw.toLowerCase().startsWith``、``raw.toLowerCase``、``/[?#]/.test``、``/^cwm:\/\/([a-z]+)(?:\/(.*))?$/i.exec``、``match[1].toLowerCase``、``decodeSegments``、``segments.some``、``String(BASE_BACKEND_URL || '').replace``、``String``、``IDENTIFIER_RE.test``、``encodeURIComponent``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:3292:3399:FUNCTION

.. js:function:: resolveResourceUrl(value)

   解析并确定与 ``Resource Url`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``80``—``83`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``resolved === null ? value : resolved``。

   **主要协作调用**：``resolveCwmUrl``。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:3443:3623:FUNCTION

.. js:function:: artifactPreviewVirtualUrl(serverId)

   实现 ``artifactPreviewVirtualUrl`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``86``—``90`` 行。

   **参数**

   ``serverId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``\x60cwm://artifact/${encodeURIComponent(value)}/preview\x60``。

   **主要协作调用**：``String(serverId || '').trim``、``String``、``IDENTIFIER_RE.test``、``encodeURIComponent``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:196:234:FUNCTION

.. rubric:: ``String(path || '') .split('/') .filter(Boolean) .map callback @ 8``

.. code-block:: javascript

   String(path || '') .split('/') .filter(Boolean) .map callback @ 8(segment)

作为 ``String(path || '') .split('/') .filter(Boolean) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``8`` 行；所属函数 ``decodeSegments``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``decodeURIComponent``。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:332:370:FUNCTION

.. rubric:: ``segments.map callback @ 14``

.. code-block:: javascript

   segments.map callback @ 14(segment)

作为 ``segments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``encodeSegments``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``encodeURIComponent``。

.. CWM-AST-FUNCTION src/lib/virtualUrl.js:2271:2380:FUNCTION

.. rubric:: ``segments.some callback @ 60``

.. code-block:: javascript

   segments.some callback @ 60(segment)

作为 ``segments.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``resolveCwmUrl``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``segment.includes``。
