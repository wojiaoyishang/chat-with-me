src/lib/clientText 模块
================================================================================

.. js:module:: src/lib/clientText

Require an explicit timezone; never guess the timezone of historical data.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/clientText.js``
* **模块标识**：``src/lib/clientText``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/clientText.js:218:828:FUNCTION

.. js:function:: parseTimestamp(value)

   解析与 ``Timestamp`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``4``—``22`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``Number.isNaN(date.getTime()) ? null : date``。

   **主要协作调用**：``TIMESTAMP.exec``、``new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate``、``Date.UTC``、``Number``、``Number.isNaN``、``date.getTime``。

.. CWM-AST-FUNCTION src/lib/clientText.js:866:1259:FUNCTION

.. js:function:: formatLocalTimestamp(value, { locale, timeZone, fallback = '—' })

   格式化与 ``Local Timestamp`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``24``—``36`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``{ locale, timeZone, fallback = '—' }``（默认值 ``{}``）
      调用方传入的 ``locale, timeZone, fallback = '—'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fallback``、``new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', ...(timeZone ? { timeZone } : {}), }).f…``。

   **主要协作调用**：``parseTimestamp``、``new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'…``。

.. CWM-AST-FUNCTION src/lib/clientText.js:1377:1658:FUNCTION

.. js:function:: resolveClientText(value, options)

   解析并确定与 ``Client Text`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``39``—``45`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``text.replace(/\{\{datetime:([^{}\n]+)\}\}/g, (marker, timestamp) => formatLocalTimestamp(timestamp, { ...options, fallback: marker }), )``。

   **主要协作调用**：``String``、``text.replace``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/clientText.js:1551:1648:FUNCTION

.. rubric:: ``text.replace callback @ 42``

.. code-block:: javascript

   text.replace callback @ 42(marker, timestamp)

实现 ``text.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``43`` 行；所属函数 ``resolveClientText``。

**参数**

``marker``
   调用方传入的 ``marker`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``timestamp``
   调用方传入的 ``timestamp`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatLocalTimestamp``。
