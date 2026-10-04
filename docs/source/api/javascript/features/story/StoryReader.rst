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
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：46

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/slider``、``@/lib/tools.jsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``、``@/features/story/media/StoryMediaDeck.jsx``、``@/features/story/media/StoryVideo.jsx``、``@/features/story/media/storyMediaLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1199:29344:FUNCTION

.. js:function:: StoryReader({ story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``28``—``663`` 行。

   **参数**

   ``{ story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…``
      调用方传入的 ``story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900"> <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-100…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useLocalSetting``、``Number.isFinite``、``Number``、``Math.max``、``Math.min``、``useRef``、``useCallback``、``useMemo``、``parts.findIndex``、``resolveResourceUrl``、``Boolean``。

   **内部回调数量**：32。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1732:1780:FUNCTION

.. rubric:: ``useState callback @ 45``

.. code-block:: javascript

   useState callback @ 45()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2361:2431:FUNCTION

.. rubric:: ``useState callback @ 54``

.. code-block:: javascript

   useState callback @ 54()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``54``—``55`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2702:2904:FUNCTION

.. rubric:: ``useCallback callback @ 63``

.. code-block:: javascript

   useCallback callback @ 63(video)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``67`` 行；所属函数 ``StoryReader``。

**参数**

``video``
   调用方传入的 ``video`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3254:3325:FUNCTION

.. rubric:: ``useMemo callback @ 76``

.. code-block:: javascript

   useMemo callback @ 76()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(story?.parts || [])].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3291:3324:FUNCTION

.. rubric:: ``[...(story?.parts || [])].sort callback @ 76``

.. code-block:: javascript

   [...(story?.parts || [])].sort callback @ 76(a, b)

作为 ``[...(story?.parts || [])].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``useMemo callback @ 76``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3412:3448:FUNCTION

.. rubric:: ``parts.findIndex callback @ 80``

.. code-block:: javascript

   parts.findIndex callback @ 80(part)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``StoryReader``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4074:4350:FUNCTION

.. rubric:: ``useEffect callback @ 93``

.. code-block:: javascript

   useEffect callback @ 93()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``93``—``98`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', handleResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4171:4213:FUNCTION

.. rubric:: ``handleResize``

.. code-block:: javascript

   handleResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setViewportWidth``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4286:4343:FUNCTION

.. rubric:: ``returned callback @ 97``

.. code-block:: javascript

   returned callback @ 97()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4372:4420:FUNCTION

.. rubric:: ``useEffect callback @ 100``

.. code-block:: javascript

   useEffect callback @ 100()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``100``—``102`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoAspectRatio``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4471:4773:FUNCTION

.. rubric:: ``useCallback callback @ 104``

.. code-block:: javascript

   useCallback callback @ 104(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``113`` 行；所属函数 ``StoryReader``。

**参数**

``reset``（默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``video.pause``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4795:6214:FUNCTION

.. rubric:: ``useEffect callback @ 115``

.. code-block:: javascript

   useEffect callback @ 115()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``115``—``147`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``onStopSpeech``、``setSettingsOpen``、``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setVideoPlaybackError``、``setSuppressedVideoAutoplayKey``、``setSequence``、``parts.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6138:6171:FUNCTION

.. rubric:: ``parts.some callback @ 146``

.. code-block:: javascript

   parts.some callback @ 146(item)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``useEffect callback @ 115``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6305:6846:FUNCTION

.. rubric:: ``useCallback callback @ 149``

.. code-block:: javascript

   useCallback callback @ 149()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``163`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setSuppressedVideoAutoplayKey``、``onStopSpeech``、``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6914:7243:FUNCTION

.. rubric:: ``useCallback callback @ 165``

.. code-block:: javascript

   useCallback callback @ 165()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``165``—``174`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7284:7743:FUNCTION

.. rubric:: ``useEffect callback @ 176``

.. code-block:: javascript

   useEffect callback @ 176()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``189`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7358:7602:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``178``—``186`` 行；所属函数 ``useEffect callback @ 176``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSettingsOpen``、``event.preventDefault``、``closeReader``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7677:7736:FUNCTION

.. rubric:: ``returned callback @ 188``

.. code-block:: javascript

   returned callback @ 188()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``useEffect callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7796:7825:FUNCTION

.. rubric:: ``useEffect callback @ 191``

.. code-block:: javascript

   useEffect callback @ 191()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7801:7825:FUNCTION

.. rubric:: ``anonymous callback @ 191``

.. code-block:: javascript

   anonymous callback @ 191()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useEffect callback @ 191``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7857:8058:FUNCTION

.. rubric:: ``useEffect callback @ 193``

.. code-block:: javascript

   useEffect callback @ 193()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``193``—``197`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8157:9331:FUNCTION

.. rubric:: ``useCallback callback @ 200``

.. code-block:: javascript

   async useCallback callback @ 200({ reset = true, playbackKey = '' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``200``—``229`` 行；所属函数 ``StoryReader``。

**参数**

``{ reset = true, playbackKey = '' }``（默认值 ``{}``）
   调用方传入的 ``reset = true, playbackKey = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVideoDone``、``video.pause``、``setVideoPlaybackError``、``video.play``、``console.warn``、``t``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9570:9895:FUNCTION

.. rubric:: ``useEffect callback @ 235``

.. code-block:: javascript

   useEffect callback @ 235()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``235``—``242`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9766:9835:FUNCTION

.. rubric:: ``window.setTimeout callback @ 238``

.. code-block:: javascript

   window.setTimeout callback @ 238()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``240`` 行；所属函数 ``useEffect callback @ 235``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9855:9888:FUNCTION

.. rubric:: ``returned callback @ 241``

.. code-block:: javascript

   returned callback @ 241()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``241``—``241`` 行；所属函数 ``useEffect callback @ 235``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10043:10627:FUNCTION

.. rubric:: ``useCallback callback @ 245``

.. code-block:: javascript

   useCallback callback @ 245(playbackKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``245``—``258`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.findIndex``、``setWaitingForNext``、``setAutoPlayStage``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10209:10297:FUNCTION

.. rubric:: ``parts.findIndex callback @ 248``

.. code-block:: javascript

   parts.findIndex callback @ 248(item)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``248``—``248`` 行；所属函数 ``useCallback callback @ 245``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10725:11296:FUNCTION

.. rubric:: ``useCallback callback @ 263``

.. code-block:: javascript

   useCallback callback @ 263(playbackKey, targetPart)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``263``—``273`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPart``
   调用方传入的 ``targetPart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``onSpeakPart``、``setSpeechDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11591:12917:FUNCTION

.. rubric:: ``useEffect callback @ 280``

.. code-block:: javascript

   useEffect callback @ 280()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``280``—``313`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setVideoPlaybackError``、``onStopSpeech``、``pauseVideo``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12150:12855:FUNCTION

.. rubric:: ``window.setTimeout callback @ 295``

.. code-block:: javascript

   window.setTimeout callback @ 295()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``295``—``310`` 行；所属函数 ``useEffect callback @ 280``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``playCurrentVideo``、``startNarration``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12877:12910:FUNCTION

.. rubric:: ``returned callback @ 312``

.. code-block:: javascript

   returned callback @ 312()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``useEffect callback @ 280``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13135:13909:FUNCTION

.. rubric:: ``useEffect callback @ 325``

.. code-block:: javascript

   useEffect callback @ 325()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``345`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSpeechDone``、``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14022:14671:FUNCTION

.. rubric:: ``useEffect callback @ 347``

.. code-block:: javascript

   useEffect callback @ 347()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``347``—``364`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``advanceAutoPlay``、``setAutoPlayStage``、``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14910:15579:FUNCTION

.. rubric:: ``useEffect callback @ 377``

.. code-block:: javascript

   useEffect callback @ 377()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``377``—``395`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``setSpeechDone``、``startNarration``、``advanceAutoPlay``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15701:15959:FUNCTION

.. rubric:: ``useEffect callback @ 397``

.. code-block:: javascript

   useEffect callback @ 397()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``397``—``403`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15815:15854:FUNCTION

.. rubric:: ``parts.find callback @ 399``

.. code-block:: javascript

   parts.find callback @ 399(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``399``—``399`` 行；所属函数 ``useEffect callback @ 397``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16388:16546:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``412``—``417`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setWaitingForNext``、``setSuppressedVideoAutoplayKey``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16574:16691:FUNCTION

.. rubric:: ``startAutoPlay``

.. code-block:: javascript

   startAutoPlay()

启动与 ``Auto Play`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``419``—``423`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setAutoPlayActive``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16722:17692:FUNCTION

.. rubric:: ``handleVideoEnded``

.. code-block:: javascript

   handleVideoEnded()

处理 ``Video Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``425``—``446`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``playCurrentVideo``、``setVideoDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17726:17973:FUNCTION

.. rubric:: ``handleVideoMetadata``

.. code-block:: javascript

   handleVideoMetadata(event)

处理 ``Video Metadata`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``448``—``453`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setVideoAspectRatio``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:22890:23582:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 547``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 547(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``547``—``558`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:23044:23235:FUNCTION

.. rubric:: ``onClick callback @ 550``

.. code-block:: javascript

   onClick callback @ 550()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``550``—``553`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 547``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24425:24465:FUNCTION

.. rubric:: ``onValueChange callback @ 571``

.. code-block:: javascript

   onValueChange callback @ 571([value])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``571``—``571`` 行；所属函数 ``StoryReader``。

**参数**

``[value]``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoVolume``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:25487:25531:FUNCTION

.. rubric:: ``onChange callback @ 588``

.. code-block:: javascript

   onChange callback @ 588(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``588``—``588`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:28399:28434:FUNCTION

.. rubric:: ``onClick callback @ 641``

.. code-block:: javascript

   onClick callback @ 641()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``641``—``641`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:29045:29080:FUNCTION

.. rubric:: ``onClick callback @ 654``

.. code-block:: javascript

   onClick callback @ 654()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``654``—``654`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
