src/features/story/StoryReader 模块
================================================================================

.. js:module:: src/features/story/StoryReader

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/StoryReader.jsx``
* **模块标识**：``src/features/story/StoryReader``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：38

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:972:1071:FUNCTION

.. js:function:: normalizeVideoPosition(value)

   规范化与 ``Video Position`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``17`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``VIDEO_POSITIONS.has``、``String(value || '').trim``、``String``、``String(value).trim``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1102:1204:FUNCTION

.. js:function:: normalizeVideoTiming(value)

   规范化与 ``Video Timing`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``21`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``VIDEO_TIMINGS.has``、``String(value || '').trim``、``String``、``String(value).trim``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1233:1914:FUNCTION

.. js:function:: resolveImageLayout(part, fontScale, forceStacked)

   解析并确定与 ``Image Layout`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``34`` 行。

   **参数**

   ``part``
      调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fontScale``
      调用方传入的 ``fontScale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``forceStacked``（默认值 ``false``）
      调用方传入的 ``forceStacked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'text_only'``、``'image_top'``、``part.layoutHint``、``part.sequence % 2 === 0 ? 'image_right' : 'image_left'``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1945:2193:FUNCTION

.. js:function:: resolveVideoPosition(part)

   解析并确定与 ``Video Position`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``41`` 行。

   **参数**

   ``part``
      调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``'top'``、``position === 'auto' ? 'top' : position``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``normalizeVideoPosition``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2194:24631:FUNCTION

.. js:function:: StoryReader({ story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``43``—``529`` 行。

   **参数**

   ``{ story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…``
      调用方传入的 ``story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900"> <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-100…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``Math.max``、``parts.findIndex``、``resolveResourceUrl``、``Boolean``、``normalizeVideoTiming``、``resolveVideoPosition``、``useCallback``、``useEffect``、``resolveImageLayout``。

   **内部回调数量**：26。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2494:2542:FUNCTION

.. rubric:: ``useState callback @ 56``

.. code-block:: javascript

   useState callback @ 56()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3542:3613:FUNCTION

.. rubric:: ``useMemo callback @ 75``

.. code-block:: javascript

   useMemo callback @ 75()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(story?.parts || [])].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3579:3612:FUNCTION

.. rubric:: ``[...(story?.parts || [])].sort callback @ 75``

.. code-block:: javascript

   [...(story?.parts || [])].sort callback @ 75(a, b)

作为 ``[...(story?.parts || [])].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``useMemo callback @ 75``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3683:3717:FUNCTION

.. rubric:: ``parts.findIndex callback @ 77``

.. code-block:: javascript

   parts.findIndex callback @ 77(part)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``StoryReader``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4364:4666:FUNCTION

.. rubric:: ``useCallback callback @ 89``

.. code-block:: javascript

   useCallback callback @ 89(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``98`` 行；所属函数 ``StoryReader``。

**参数**

``reset``（默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``video.pause``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4688:6103:FUNCTION

.. rubric:: ``useEffect callback @ 100``

.. code-block:: javascript

   useEffect callback @ 100()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``100``—``132`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``onStopSpeech``、``setSettingsOpen``、``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setVideoPlaybackError``、``setSuppressedVideoAutoplayKey``、``setSequence``、``parts.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6027:6058:FUNCTION

.. rubric:: ``parts.some callback @ 131``

.. code-block:: javascript

   parts.some callback @ 131(item)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``useEffect callback @ 100``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6194:6733:FUNCTION

.. rubric:: ``useCallback callback @ 134``

.. code-block:: javascript

   useCallback callback @ 134()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``134``—``148`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setSuppressedVideoAutoplayKey``、``onStopSpeech``、``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6801:7128:FUNCTION

.. rubric:: ``useCallback callback @ 150``

.. code-block:: javascript

   useCallback callback @ 150()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``150``—``159`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7169:7628:FUNCTION

.. rubric:: ``useEffect callback @ 161``

.. code-block:: javascript

   useEffect callback @ 161()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``161``—``174`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7243:7487:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``171`` 行；所属函数 ``useEffect callback @ 161``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSettingsOpen``、``event.preventDefault``、``closeReader``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7562:7621:FUNCTION

.. rubric:: ``returned callback @ 173``

.. code-block:: javascript

   returned callback @ 173()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``useEffect callback @ 161``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7681:7710:FUNCTION

.. rubric:: ``useEffect callback @ 176``

.. code-block:: javascript

   useEffect callback @ 176()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``176`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7686:7710:FUNCTION

.. rubric:: ``anonymous callback @ 176``

.. code-block:: javascript

   anonymous callback @ 176()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``176``—``176`` 行；所属函数 ``useEffect callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7742:7943:FUNCTION

.. rubric:: ``useEffect callback @ 178``

.. code-block:: javascript

   useEffect callback @ 178()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``182`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8042:9058:FUNCTION

.. rubric:: ``useCallback callback @ 184``

.. code-block:: javascript

   async useCallback callback @ 184({reset = true, playbackKey = ''})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``184``—``211`` 行；所属函数 ``StoryReader``。

**参数**

``{reset = true, playbackKey = ''}``（默认值 ``{}``）
   调用方传入的 ``reset = true, playbackKey = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVideoDone``、``video.pause``、``setVideoPlaybackError``、``video.play``、``console.warn``、``t``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9283:9606:FUNCTION

.. rubric:: ``useEffect callback @ 215``

.. code-block:: javascript

   useEffect callback @ 215()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``222`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9479:9546:FUNCTION

.. rubric:: ``window.setTimeout callback @ 218``

.. code-block:: javascript

   window.setTimeout callback @ 218()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``218``—``220`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9566:9599:FUNCTION

.. rubric:: ``returned callback @ 221``

.. code-block:: javascript

   returned callback @ 221()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9754:10252:FUNCTION

.. rubric:: ``useCallback callback @ 224``

.. code-block:: javascript

   useCallback callback @ 224(playbackKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``224``—``235`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.findIndex``、``setWaitingForNext``、``setAutoPlayStage``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9903:9972:FUNCTION

.. rubric:: ``parts.findIndex callback @ 226``

.. code-block:: javascript

   parts.findIndex callback @ 226(item)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``useCallback callback @ 224``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10336:10852:FUNCTION

.. rubric:: ``useCallback callback @ 237``

.. code-block:: javascript

   useCallback callback @ 237(playbackKey, targetPart)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``237``—``247`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPart``
   调用方传入的 ``targetPart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``onSpeakPart``、``setSpeechDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11133:12453:FUNCTION

.. rubric:: ``useEffect callback @ 252``

.. code-block:: javascript

   useEffect callback @ 252()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``252``—``285`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setVideoPlaybackError``、``onStopSpeech``、``pauseVideo``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11690:12391:FUNCTION

.. rubric:: ``window.setTimeout callback @ 267``

.. code-block:: javascript

   window.setTimeout callback @ 267()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``267``—``282`` 行；所属函数 ``useEffect callback @ 252``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``playCurrentVideo``、``startNarration``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12413:12446:FUNCTION

.. rubric:: ``returned callback @ 284``

.. code-block:: javascript

   returned callback @ 284()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``284``—``284`` 行；所属函数 ``useEffect callback @ 252``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12671:13445:FUNCTION

.. rubric:: ``useEffect callback @ 297``

.. code-block:: javascript

   useEffect callback @ 297()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``297``—``317`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSpeechDone``、``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13558:14205:FUNCTION

.. rubric:: ``useEffect callback @ 319``

.. code-block:: javascript

   useEffect callback @ 319()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``319``—``336`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``advanceAutoPlay``、``setAutoPlayStage``、``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14444:15113:FUNCTION

.. rubric:: ``useEffect callback @ 349``

.. code-block:: javascript

   useEffect callback @ 349()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``349``—``367`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``setSpeechDone``、``startNarration``、``advanceAutoPlay``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15306:15562:FUNCTION

.. rubric:: ``useEffect callback @ 378``

.. code-block:: javascript

   useEffect callback @ 378()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``378``—``384`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15420:15457:FUNCTION

.. rubric:: ``parts.find callback @ 380``

.. code-block:: javascript

   parts.find callback @ 380(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``useEffect callback @ 378``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15867:16023:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``391``—``396`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setWaitingForNext``、``setSuppressedVideoAutoplayKey``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16051:16168:FUNCTION

.. rubric:: ``startAutoPlay``

.. code-block:: javascript

   startAutoPlay()

启动与 ``Auto Play`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``398``—``402`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setAutoPlayActive``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16199:16421:FUNCTION

.. rubric:: ``handleVideoEnded``

.. code-block:: javascript

   handleVideoEnded()

处理 ``Video Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``404``—``408`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setVideoDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:20828:21081:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 480``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 480(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``480``—``480`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:20862:20923:FUNCTION

.. rubric:: ``onClick callback @ 480``

.. code-block:: javascript

   onClick callback @ 480()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``480``—``480`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 480``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:21746:21788:FUNCTION

.. rubric:: ``onChange callback @ 487``

.. code-block:: javascript

   onChange callback @ 487(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``487``—``487`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24019:24054:FUNCTION

.. rubric:: ``onClick callback @ 523``

.. code-block:: javascript

   onClick callback @ 523()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``523``—``523`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24429:24464:FUNCTION

.. rubric:: ``onClick callback @ 525``

.. code-block:: javascript

   onClick callback @ 525()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``525``—``525`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
