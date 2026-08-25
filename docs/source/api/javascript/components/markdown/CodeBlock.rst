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
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：17

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/lib/tools.jsx``、``./CodeBlock.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:714:1275:FUNCTION

.. js:function:: loadHljs()

   加载与 ``Hljs`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``42`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(hljs)``、``loadingPromise``。

   **主要协作调用**：``Promise.resolve``、``import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi…``、``import('highlight.js/lib/core') .then``、``import``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1410:1554:FUNCTION

.. js:function:: normalizeLanguage(language)

   规范化与 ``Language`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``56`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``lang``。

   **主要协作调用**：``language?.toLowerCase?.().trim``、``language?.toLowerCase``、``NO_HIGHLIGHT_LANGS.has``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1581:1899:FUNCTION

.. js:function:: scheduleIdleWork(callback)

   实现 ``scheduleIdleWork`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``66`` 行。

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

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:870:1154:FUNCTION

.. rubric:: ``import('highlight.js/lib/core') .then callback @ 29``

.. code-block:: javascript

   import('highlight.js/lib/core') .then callback @ 29(module)

处理 ``import('highlight.js/lib/core') .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``29``—``35`` 行；所属函数 ``loadHljs``。

**参数**

``module``
   调用方传入的 ``module`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``hljs``。

**主要协作调用**：``hljs.configure``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1177:1237:FUNCTION

.. rubric:: ``import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi… callback @ 36``

.. code-block:: javascript

   import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi… callback @ 36()

实现 ``import('highlight.js/lib/core') .then((module) => { hljs = module.default; hljs.configure({ noHighlightRe: /\b(?:no-?hi…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``38`` 行；所属函数 ``loadHljs``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1749:1791:FUNCTION

.. rubric:: ``returned callback @ 61``

.. code-block:: javascript

   returned callback @ 61()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``scheduleIdleWork``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelIdleCallback``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1862:1896:FUNCTION

.. rubric:: ``returned callback @ 65``

.. code-block:: javascript

   returned callback @ 65()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``scheduleIdleWork``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:1925:7977:FUNCTION

.. rubric:: ``memo callback @ 68``

.. code-block:: javascript

   memo callback @ 68({codeString = '', language})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``237`` 行。

**参数**

``{codeString = '', language}``
   调用方传入的 ``codeString = '', language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section className="code-container" aria-label={codeBlockLabel}> <header className="code-toolbar"> <span className="language-badge" title={displayLanguage}> {displayLanguage} </…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useState``、``useRef``、``useMemo``、``Boolean``、``useEffect``、``useCallback``、``t``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2161:2194:FUNCTION

.. rubric:: ``useMemo callback @ 74``

.. code-block:: javascript

   useMemo callback @ 74()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLanguage``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2245:2317:FUNCTION

.. rubric:: ``useMemo callback @ 76``

.. code-block:: javascript

   useMemo callback @ 76()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(language || 'text').trim().toLowerCase``、``String(language || 'text').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2377:2656:FUNCTION

.. rubric:: ``useMemo callback @ 80``

.. code-block:: javascript

   useMemo callback @ 80()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``80``—``89`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``codeString.endsWith('\n') ? Math.max(0, count - 1) : count``。

**主要协作调用**：``codeString.indexOf``、``codeString.endsWith``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2831:2969:FUNCTION

.. rubric:: ``useMemo callback @ 94``

.. code-block:: javascript

   useMemo callback @ 94()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``94``—``97`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``Array.from({length: lineCount}, (_, index) => index + 1).join('\n')``。

**主要协作调用**：``Array.from({length: lineCount}, (_, index) => index + 1).join``、``Array.from``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:2926:2950:FUNCTION

.. rubric:: ``Array.from callback @ 96``

.. code-block:: javascript

   Array.from callback @ 96(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``useMemo callback @ 94``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:3234:5411:FUNCTION

.. rubric:: ``useEffect callback @ 106``

.. code-block:: javascript

   useEffect callback @ 106()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``106``—``164`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; cancelIdleWork(); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``scheduleIdleWork``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:3698:5308:FUNCTION

.. rubric:: ``scheduleIdleWork callback @ 119``

.. code-block:: javascript

   async scheduleIdleWork callback @ 119()

实现 ``scheduleIdleWork`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``119``—``158`` 行；所属函数 ``useEffect callback @ 106``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``loadHljs``、``hljsInst.getLanguage``、``window.hljsFailedLanguages.has``、``window.hljsFailedLanguages.add``、``loadModule``、``hljsInst.registerLanguage``、``console.error``、``hljsInst.highlightElement``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:5326:5404:FUNCTION

.. rubric:: ``returned callback @ 160``

.. code-block:: javascript

   returned callback @ 160()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``160``—``163`` 行；所属函数 ``useEffect callback @ 106``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelIdleWork``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:5480:5610:FUNCTION

.. rubric:: ``useEffect callback @ 166``

.. code-block:: javascript

   useEffect callback @ 166()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``166``—``170`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:5485:5610:FUNCTION

.. rubric:: ``anonymous callback @ 166``

.. code-block:: javascript

   anonymous callback @ 166()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``166``—``170`` 行；所属函数 ``useEffect callback @ 166``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:5653:6196:FUNCTION

.. rubric:: ``useCallback callback @ 172``

.. code-block:: javascript

   async useCallback callback @ 172()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``172``—``188`` 行；所属函数 ``memo callback @ 68``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``copyTextToClipboard``、``setCopied``、``window.clearTimeout``、``window.setTimeout``、``console.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/CodeBlock.jsx:5976:6081:FUNCTION

.. rubric:: ``window.setTimeout callback @ 181``

.. code-block:: javascript

   window.setTimeout callback @ 181()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``184`` 行；所属函数 ``useCallback callback @ 172``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCopied``。
