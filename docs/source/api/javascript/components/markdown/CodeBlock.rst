src/components/markdown/CodeBlock 模块
================================================================================

.. js:module:: src/components/markdown/CodeBlock

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/CodeBlock.jsx``
* **模块标识**：``src/components/markdown/CodeBlock``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/lib/tools.jsx``、``./card-block/highlight.js``、``./CodeBlock.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:514:832:FUNCTION

.. js:function:: scheduleIdleWork(callback)

   实现 ``scheduleIdleWork`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``22`` 行。

   **参数**

   ``callback``
      状态变化、事件到达或操作完成时执行的回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => window.cancelIdleCallback?.(handle)``、``() => window.clearTimeout(handle)``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.requestIdleCallback``、``window.setTimeout``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:682:724:FUNCTION

.. rubric:: ``returned callback @ 17``

.. code-block:: javascript

   returned callback @ 17()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``scheduleIdleWork``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelIdleCallback``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:795:829:FUNCTION

.. rubric:: ``returned callback @ 21``

.. code-block:: javascript

   returned callback @ 21()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``scheduleIdleWork``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:858:6479:FUNCTION

.. rubric:: ``memo callback @ 24``

.. code-block:: javascript

   memo callback @ 24({codeString = '', language})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``182`` 行。

**参数**

``{codeString = '', language}``
   调用方传入的 ``codeString = '', language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section className="code-container" aria-label={codeBlockLabel}> <header className="code-toolbar"> <span className="language-badge" title={displayLanguage}> {displayLanguage} </…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useState``、``useRef``、``useMemo``、``Boolean``、``useEffect``、``useCallback``、``t``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1077:1182:FUNCTION

.. rubric:: ``useState callback @ 28``

.. code-block:: javascript

   useState callback @ 28()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``33`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1225:1267:FUNCTION

.. rubric:: ``useMemo callback @ 35``

.. code-block:: javascript

   useMemo callback @ 35()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeHighlightLanguage``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1318:1390:FUNCTION

.. rubric:: ``useMemo callback @ 37``

.. code-block:: javascript

   useMemo callback @ 37()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(language || 'text').trim().toLowerCase``、``String(language || 'text').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1450:1729:FUNCTION

.. rubric:: ``useMemo callback @ 41``

.. code-block:: javascript

   useMemo callback @ 41()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``50`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``codeString.endsWith('\n') ? Math.max(0, count - 1) : count``。

**主要协作调用**：``codeString.indexOf``、``codeString.endsWith``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1904:2042:FUNCTION

.. rubric:: ``useMemo callback @ 55``

.. code-block:: javascript

   useMemo callback @ 55()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``55``—``58`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``Array.from({length: lineCount}, (_, index) => index + 1).join('\n')``。

**主要协作调用**：``Array.from({length: lineCount}, (_, index) => index + 1).join``、``Array.from``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1999:2023:FUNCTION

.. rubric:: ``Array.from callback @ 57``

.. code-block:: javascript

   Array.from callback @ 57(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useMemo callback @ 55``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2509:3217:FUNCTION

.. rubric:: ``useEffect callback @ 69``

.. code-block:: javascript

   useEffect callback @ 69()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``69``—``91`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; cancelIdleWork(); }``。

**主要协作调用**：``scheduleIdleWork``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2684:3114:FUNCTION

.. rubric:: ``scheduleIdleWork callback @ 75``

.. code-block:: javascript

   async scheduleIdleWork callback @ 75()

实现 ``scheduleIdleWork`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``75``—``85`` 行；所属函数 ``useEffect callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``highlightCode``、``setHighlightState``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:3132:3210:FUNCTION

.. rubric:: ``returned callback @ 87``

.. code-block:: javascript

   returned callback @ 87()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``90`` 行；所属函数 ``useEffect callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelIdleWork``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:3639:3769:FUNCTION

.. rubric:: ``useEffect callback @ 105``

.. code-block:: javascript

   useEffect callback @ 105()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``105``—``109`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:3644:3769:FUNCTION

.. rubric:: ``anonymous callback @ 105``

.. code-block:: javascript

   anonymous callback @ 105()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``109`` 行；所属函数 ``useEffect callback @ 105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:3812:4355:FUNCTION

.. rubric:: ``useCallback callback @ 111``

.. code-block:: javascript

   async useCallback callback @ 111()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``111``—``127`` 行；所属函数 ``memo callback @ 24``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``copyTextToClipboard``、``setCopied``、``window.clearTimeout``、``window.setTimeout``、``console.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:4135:4240:FUNCTION

.. rubric:: ``window.setTimeout callback @ 120``

.. code-block:: javascript

   window.setTimeout callback @ 120()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``123`` 行；所属函数 ``useCallback callback @ 111``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCopied``。
