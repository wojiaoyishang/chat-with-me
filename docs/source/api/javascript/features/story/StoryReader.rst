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
* **局部函数与匿名回调**：44

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``、``@/features/story/media/StoryMediaDeck.jsx``、``@/features/story/media/StoryVideo.jsx``、``@/features/story/media/storyMediaLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1040:25173:FUNCTION

.. js:function:: StoryReader({ story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``15``—``536`` 行。

   **参数**

   ``{ story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…``
      调用方传入的 ``story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, speechState, subtitlesEnabled = tr…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900"> <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-100…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``Math.max``、``parts.findIndex``、``resolveResourceUrl``、``Boolean``、``normalizeVideoTiming``、``useEffect``、``useCallback``、``resolveStoryMediaLayout``、``t``。

   **内部回调数量**：30。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1339:1387:FUNCTION

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

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1968:2030:FUNCTION

.. rubric:: ``useState callback @ 37``

.. code-block:: javascript

   useState callback @ 37()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2575:2646:FUNCTION

.. rubric:: ``useMemo callback @ 49``

.. code-block:: javascript

   useMemo callback @ 49()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(story?.parts || [])].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2612:2645:FUNCTION

.. rubric:: ``[...(story?.parts || [])].sort callback @ 49``

.. code-block:: javascript

   [...(story?.parts || [])].sort callback @ 49(a, b)

作为 ``[...(story?.parts || [])].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``useMemo callback @ 49``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2716:2750:FUNCTION

.. rubric:: ``parts.findIndex callback @ 51``

.. code-block:: javascript

   parts.findIndex callback @ 51(part)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``StoryReader``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3370:3646:FUNCTION

.. rubric:: ``useEffect callback @ 63``

.. code-block:: javascript

   useEffect callback @ 63()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``68`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', handleResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3467:3509:FUNCTION

.. rubric:: ``handleResize``

.. code-block:: javascript

   handleResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setViewportWidth``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3582:3639:FUNCTION

.. rubric:: ``returned callback @ 67``

.. code-block:: javascript

   returned callback @ 67()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3668:3716:FUNCTION

.. rubric:: ``useEffect callback @ 70``

.. code-block:: javascript

   useEffect callback @ 70()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``72`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoAspectRatio``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3767:4069:FUNCTION

.. rubric:: ``useCallback callback @ 74``

.. code-block:: javascript

   useCallback callback @ 74(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``83`` 行；所属函数 ``StoryReader``。

**参数**

``reset``（默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``video.pause``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4091:5506:FUNCTION

.. rubric:: ``useEffect callback @ 85``

.. code-block:: javascript

   useEffect callback @ 85()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``117`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``onStopSpeech``、``setSettingsOpen``、``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setVideoPlaybackError``、``setSuppressedVideoAutoplayKey``、``setSequence``、``parts.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5430:5461:FUNCTION

.. rubric:: ``parts.some callback @ 116``

.. code-block:: javascript

   parts.some callback @ 116(item)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``useEffect callback @ 85``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5597:6136:FUNCTION

.. rubric:: ``useCallback callback @ 119``

.. code-block:: javascript

   useCallback callback @ 119()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``119``—``133`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setSuppressedVideoAutoplayKey``、``onStopSpeech``、``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6204:6531:FUNCTION

.. rubric:: ``useCallback callback @ 135``

.. code-block:: javascript

   useCallback callback @ 135()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``135``—``144`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6572:7031:FUNCTION

.. rubric:: ``useEffect callback @ 146``

.. code-block:: javascript

   useEffect callback @ 146()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``146``—``159`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6646:6890:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``148``—``156`` 行；所属函数 ``useEffect callback @ 146``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSettingsOpen``、``event.preventDefault``、``closeReader``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6965:7024:FUNCTION

.. rubric:: ``returned callback @ 158``

.. code-block:: javascript

   returned callback @ 158()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``useEffect callback @ 146``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7084:7113:FUNCTION

.. rubric:: ``useEffect callback @ 161``

.. code-block:: javascript

   useEffect callback @ 161()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7089:7113:FUNCTION

.. rubric:: ``anonymous callback @ 161``

.. code-block:: javascript

   anonymous callback @ 161()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``useEffect callback @ 161``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7145:7346:FUNCTION

.. rubric:: ``useEffect callback @ 163``

.. code-block:: javascript

   useEffect callback @ 163()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``163``—``167`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7445:8461:FUNCTION

.. rubric:: ``useCallback callback @ 169``

.. code-block:: javascript

   async useCallback callback @ 169({reset = true, playbackKey = ''})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``169``—``196`` 行；所属函数 ``StoryReader``。

**参数**

``{reset = true, playbackKey = ''}``（默认值 ``{}``）
   调用方传入的 ``reset = true, playbackKey = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVideoDone``、``video.pause``、``setVideoPlaybackError``、``video.play``、``console.warn``、``t``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8686:9009:FUNCTION

.. rubric:: ``useEffect callback @ 200``

.. code-block:: javascript

   useEffect callback @ 200()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``200``—``207`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8882:8949:FUNCTION

.. rubric:: ``window.setTimeout callback @ 203``

.. code-block:: javascript

   window.setTimeout callback @ 203()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``205`` 行；所属函数 ``useEffect callback @ 200``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8969:9002:FUNCTION

.. rubric:: ``returned callback @ 206``

.. code-block:: javascript

   returned callback @ 206()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``useEffect callback @ 200``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9157:9655:FUNCTION

.. rubric:: ``useCallback callback @ 209``

.. code-block:: javascript

   useCallback callback @ 209(playbackKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``209``—``220`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.findIndex``、``setWaitingForNext``、``setAutoPlayStage``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9306:9375:FUNCTION

.. rubric:: ``parts.findIndex callback @ 211``

.. code-block:: javascript

   parts.findIndex callback @ 211(item)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``useCallback callback @ 209``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9739:10255:FUNCTION

.. rubric:: ``useCallback callback @ 222``

.. code-block:: javascript

   useCallback callback @ 222(playbackKey, targetPart)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``222``—``232`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPart``
   调用方传入的 ``targetPart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``onSpeakPart``、``setSpeechDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10536:11856:FUNCTION

.. rubric:: ``useEffect callback @ 237``

.. code-block:: javascript

   useEffect callback @ 237()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``237``—``270`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setVideoPlaybackError``、``onStopSpeech``、``pauseVideo``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11093:11794:FUNCTION

.. rubric:: ``window.setTimeout callback @ 252``

.. code-block:: javascript

   window.setTimeout callback @ 252()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``252``—``267`` 行；所属函数 ``useEffect callback @ 237``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``playCurrentVideo``、``startNarration``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11816:11849:FUNCTION

.. rubric:: ``returned callback @ 269``

.. code-block:: javascript

   returned callback @ 269()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``269``—``269`` 行；所属函数 ``useEffect callback @ 237``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12074:12848:FUNCTION

.. rubric:: ``useEffect callback @ 282``

.. code-block:: javascript

   useEffect callback @ 282()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``302`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSpeechDone``、``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12961:13608:FUNCTION

.. rubric:: ``useEffect callback @ 304``

.. code-block:: javascript

   useEffect callback @ 304()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``304``—``321`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``advanceAutoPlay``、``setAutoPlayStage``、``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13847:14516:FUNCTION

.. rubric:: ``useEffect callback @ 334``

.. code-block:: javascript

   useEffect callback @ 334()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``334``—``352`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``setSpeechDone``、``startNarration``、``advanceAutoPlay``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14709:14965:FUNCTION

.. rubric:: ``useEffect callback @ 363``

.. code-block:: javascript

   useEffect callback @ 363()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``363``—``369`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14823:14860:FUNCTION

.. rubric:: ``parts.find callback @ 365``

.. code-block:: javascript

   parts.find callback @ 365(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``365``—``365`` 行；所属函数 ``useEffect callback @ 363``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15392:15548:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``378``—``383`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setWaitingForNext``、``setSuppressedVideoAutoplayKey``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15576:15693:FUNCTION

.. rubric:: ``startAutoPlay``

.. code-block:: javascript

   startAutoPlay()

启动与 ``Auto Play`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``385``—``389`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setAutoPlayActive``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15724:16690:FUNCTION

.. rubric:: ``handleVideoEnded``

.. code-block:: javascript

   handleVideoEnded()

处理 ``Video Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``391``—``412`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``playCurrentVideo``、``setVideoDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16724:16971:FUNCTION

.. rubric:: ``handleVideoMetadata``

.. code-block:: javascript

   handleVideoMetadata(event)

处理 ``Video Metadata`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``414``—``419`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setVideoAspectRatio``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:21077:21330:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 482``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 482(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``482``—``482`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:21111:21172:FUNCTION

.. rubric:: ``onClick callback @ 482``

.. code-block:: javascript

   onClick callback @ 482()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``482``—``482`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 482``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:21995:22037:FUNCTION

.. rubric:: ``onChange callback @ 489``

.. code-block:: javascript

   onChange callback @ 489(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``489``—``489`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24561:24596:FUNCTION

.. rubric:: ``onClick callback @ 530``

.. code-block:: javascript

   onClick callback @ 530()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``530``—``530`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24971:25006:FUNCTION

.. rubric:: ``onClick callback @ 532``

.. code-block:: javascript

   onClick callback @ 532()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
