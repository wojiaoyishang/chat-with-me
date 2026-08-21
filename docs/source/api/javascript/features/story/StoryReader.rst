src/features/story/StoryReader 模块
=================================

.. js:module:: src/features/story/StoryReader

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/story/StoryReader.jsx``
* **模块标识**：``src/features/story/StoryReader``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:863:1480:FUNCTION

.. js:function:: resolveLayout(part, fontScale)

   解析并确定与 ``Layout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``24`` 行。

   **参数**

   ``part``
      调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fontScale``
      调用方传入的 ``fontScale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'text_only'``、``'image_top'``、``part.layoutHint``、``part.sequence % 2 === 0 ? 'image_right' : 'image_left'``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1481:11960:FUNCTION

.. js:function:: StoryReader({story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, onPauseSpeech, onResumeSpeech, spee…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``26``—``186`` 行。

   **参数**

   ``{story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, onPauseSpeech, onResumeSpeech, spee…``
      调用方传入的 ``story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, onPauseSpeech, onResumeSpeech, spee…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900"> <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-100…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``useEffect``、``Math.max``、``parts.findIndex``、``['loading','playing'].includes``、``resolveLayout``、``t``、``Object.keys(FONT_SCALES).map``、``Object.keys``、``resolveResourceUrl``。

   **内部回调数量**：16。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1769:1817:FUNCTION

.. rubric:: ``useState callback @ 28``

.. code-block:: javascript

   useState callback @ 28()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1871:1919:FUNCTION

.. rubric:: ``useState callback @ 29``

.. code-block:: javascript

   useState callback @ 29()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2165:2233:FUNCTION

.. rubric:: ``useMemo callback @ 34``

.. code-block:: javascript

   useMemo callback @ 34()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(story?.parts \|\| [])].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2202:2232:FUNCTION

.. rubric:: ``[...(story?.parts \|\| [])].sort callback @ 34``

.. code-block:: javascript

   [...(story?.parts || [])].sort callback @ 34(a, b)

作为 ``[...(story?.parts \|\| [])].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``useMemo callback @ 34``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2267:2667:FUNCTION

.. rubric:: ``useEffect callback @ 36``

.. code-block:: javascript

   useEffect callback @ 36()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``45`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setSettingsOpen``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setSequence``、``parts.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2591:2622:FUNCTION

.. rubric:: ``parts.some callback @ 44``

.. code-block:: javascript

   parts.some callback @ 44(part)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``useEffect callback @ 36``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2709:3166:FUNCTION

.. rubric:: ``useEffect callback @ 47``

.. code-block:: javascript

   useEffect callback @ 47()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``60`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2783:3025:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``49``—``57`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSettingsOpen``、``event.preventDefault``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3100:3159:FUNCTION

.. rubric:: ``returned callback @ 59``

.. code-block:: javascript

   returned callback @ 59()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3251:3285:FUNCTION

.. rubric:: ``parts.findIndex callback @ 62``

.. code-block:: javascript

   parts.findIndex callback @ 62(part)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``StoryReader``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3678:3879:FUNCTION

.. rubric:: ``useEffect callback @ 69``

.. code-block:: javascript

   useEffect callback @ 69()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``69``—``73`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3951:4631:FUNCTION

.. rubric:: ``useEffect callback @ 75``

.. code-block:: javascript

   useEffect callback @ 75()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``88`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``['loading','playing','paused'].includes``、``setWaitingForNext``、``setSequence``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4586:4618:FUNCTION

.. rubric:: ``window.setTimeout callback @ 87``

.. code-block:: javascript

   window.setTimeout callback @ 87()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``useEffect callback @ 75``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSpeakPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4770:5089:FUNCTION

.. rubric:: ``useEffect callback @ 90``

.. code-block:: javascript

   useEffect callback @ 90()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``97`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4881:4918:FUNCTION

.. rubric:: ``parts.find callback @ 92``

.. code-block:: javascript

   parts.find callback @ 92(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``92`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5044:5076:FUNCTION

.. rubric:: ``window.setTimeout callback @ 96``

.. code-block:: javascript

   window.setTimeout callback @ 96()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSpeakPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5312:5451:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``102``—``107`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setWaitingForNext``、``onStopSpeech``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7453:7699:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 134``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 134(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7487:7547:FUNCTION

.. rubric:: ``onClick callback @ 134``

.. code-block:: javascript

   onClick callback @ 134()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 134``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8012:8109:FUNCTION

.. rubric:: ``onChange callback @ 138``

.. code-block:: javascript

   onChange callback @ 138(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setAutoAdvance``、``localStorage.setItem``、``String``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8517:8559:FUNCTION

.. rubric:: ``onChange callback @ 142``

.. code-block:: javascript

   onChange callback @ 142(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8755:8851:FUNCTION

.. rubric:: ``onClick callback @ 146``

.. code-block:: javascript

   onClick callback @ 146()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onResumeSpeech``、``onPauseSpeech``、``onSpeakPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11358:11391:FUNCTION

.. rubric:: ``onClick callback @ 180``

.. code-block:: javascript

   onClick callback @ 180()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11764:11797:FUNCTION

.. rubric:: ``onClick callback @ 182``

.. code-block:: javascript

   onClick callback @ 182()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
