src/components/markdown/StudyVisuals 模块
======================================================================================

.. js:module:: src/components/markdown/StudyVisuals

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/StudyVisuals.jsx``
* **模块标识**：``src/components/markdown/StudyVisuals``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/StudyVisuals.jsx:0:87:FUNCTION

.. js:function:: timeRange(start, end)

   实现 ``timeRange`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``1``—``3`` 行。

   **参数**

   ``start``
      调用方传入的 ``start`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``end``
      调用方传入的 ``end`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[start, end].filter(Boolean).join(' – ')``。

   **主要协作调用**：``[start, end].filter(Boolean).join``、``[start, end].filter``。

.. CWM-AST-FUNCTION src/components/markdown/StudyVisuals.jsx:87:1037:FUNCTION

.. js:function:: StudyOutline({ items })

   渲染 ``StudyOutline`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``5``—``30`` 行。

   **参数**

   ``{ items }``
      调用方传入的 ``items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <nav className="cwm-study-outline" aria-label="学习大纲"> <h2 className="cwm-study-outline-heading">学习大纲</h2> <ol className="cwm-study-outline-list"> {sessions.map(({ id, title, sta…``。

   **主要协作调用**：``JSON.parse``、``Array.isArray``、``sessions.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/StudyVisuals.jsx:1037:1528:FUNCTION

.. js:function:: StudySession({ id, title, start, end, children })

   渲染 ``StudySession`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``32``—``43`` 行。

   **参数**

   ``{ id, title, start, end, children }``
      调用方传入的 ``id, title, start, end, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section id={id} className="cwm-study-session" aria-label={title}> <header className="cwm-study-session-header"> {range && <span className="cwm-study-session-time">{range}</span…``。

   **主要协作调用**：``timeRange``。

.. CWM-AST-FUNCTION src/components/markdown/StudyVisuals.jsx:1528:1950:FUNCTION

.. js:function:: StudySection({ number, title, children })

   渲染 ``StudySection`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``45``—``55`` 行。

   **参数**

   ``{ number, title, children }``
      调用方传入的 ``number, title, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="cwm-study-section" aria-label={title}> <h3 className="cwm-study-section-heading"> {number && <span className="cwm-study-section-number">{number}</span>} {tit…``。

.. CWM-AST-FUNCTION src/components/markdown/StudyVisuals.jsx:1950:2470:FUNCTION

.. js:function:: StudyCard({ title, tone = 'info', icon = 'book', kind = 'card', iconSymbols = {}, children })

   渲染 ``StudyCard`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``57``—``64`` 行。

   **参数**

   ``{ title, tone = 'info', icon = 'book', kind = 'card', iconSymbols = {}, children }``
      调用方传入的 ``title, tone = 'info', icon = 'book', kind = 'card', iconSymbols = , children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <aside className={\x60cwm-study-card cwm-study-card-${kind} cwm-study-card-${tone}\x60} data-card-kind={kind} aria-label={title}> <h4 className="cwm-study-card-heading"><span classNam…``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/StudyVisuals.jsx:570:993:FUNCTION

.. rubric:: ``sessions.map callback @ 19``

.. code-block:: javascript

   sessions.map callback @ 19({ id, title, start, end })

作为 ``sessions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``26`` 行；所属函数 ``StudyOutline``。

**参数**

``{ id, title, start, end }``
   调用方传入的 ``id, title, start, end`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``timeRange``。
