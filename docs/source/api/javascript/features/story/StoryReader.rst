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
* **局部函数与匿名回调**：54

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/slider``、``@/lib/tools.jsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``、``@/features/story/media/StoryMediaDeck.jsx``、``@/features/story/media/StoryVideo.jsx``、``@/features/story/media/StoryMediaEditor.jsx``、``@/features/story/media/storyMediaLayout.js``、``@/features/story/media/storyMediaLifecycle.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1358:35613:FUNCTION

.. js:function:: StoryReader({ story, open, onClose, onChangePart, onUpdatePartMedia, onSpeakPart, onStopSpeech, speechState, su…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``30``—``768`` 行。

   **参数**

   ``{ story, open, onClose, onChangePart, onUpdatePartMedia, onSpeakPart, onStopSpeech, speechState, su…``
      调用方传入的 ``story, open, onClose, onChangePart, onUpdatePartMedia, onSpeakPart, onStopSpeech, speechState, su…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900"> <StoryMediaEditor target={mediaEditor} onClose={() => setMediaEditor(null)} onSave={onUpdateP…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useLocalSetting``、``Number.isFinite``、``Number``、``Math.max``、``Math.min``、``useRef``、``useCallback``、``useMemo``、``parts.findIndex``、``resolveResourceUrl``、``Boolean``。

   **内部回调数量**：38。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1914:1962:FUNCTION

.. rubric:: ``useState callback @ 48``

.. code-block:: javascript

   useState callback @ 48()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2666:2736:FUNCTION

.. rubric:: ``useState callback @ 59``

.. code-block:: javascript

   useState callback @ 59()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``60`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3084:3286:FUNCTION

.. rubric:: ``useCallback callback @ 70``

.. code-block:: javascript

   useCallback callback @ 70(video)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``74`` 行；所属函数 ``StoryReader``。

**参数**

``video``
   调用方传入的 ``video`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3636:3707:FUNCTION

.. rubric:: ``useMemo callback @ 83``

.. code-block:: javascript

   useMemo callback @ 83()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(story?.parts || [])].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3673:3706:FUNCTION

.. rubric:: ``[...(story?.parts || [])].sort callback @ 83``

.. code-block:: javascript

   [...(story?.parts || [])].sort callback @ 83(a, b)

作为 ``[...(story?.parts || [])].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``useMemo callback @ 83``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3794:3830:FUNCTION

.. rubric:: ``parts.findIndex callback @ 87``

.. code-block:: javascript

   parts.findIndex callback @ 87(part)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``StoryReader``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4713:5036:FUNCTION

.. rubric:: ``useEffect callback @ 103``

.. code-block:: javascript

   useEffect callback @ 103()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``110`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { // Strict Mode replays effects while the current viewport is still mounted. if (!viewport.isConnected) releaseStoryMedia(viewport.querySelectorAll('video, audio, img')); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4817:5029:FUNCTION

.. rubric:: ``returned callback @ 106``

.. code-block:: javascript

   returned callback @ 106()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``106``—``109`` 行；所属函数 ``useEffect callback @ 103``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseStoryMedia``、``viewport.querySelectorAll``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5071:5347:FUNCTION

.. rubric:: ``useEffect callback @ 112``

.. code-block:: javascript

   useEffect callback @ 112()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``117`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', handleResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5168:5210:FUNCTION

.. rubric:: ``handleResize``

.. code-block:: javascript

   handleResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setViewportWidth``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5283:5340:FUNCTION

.. rubric:: ``returned callback @ 116``

.. code-block:: javascript

   returned callback @ 116()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5390:5688:FUNCTION

.. rubric:: ``useCallback callback @ 119``

.. code-block:: javascript

   useCallback callback @ 119(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``119``—``128`` 行；所属函数 ``StoryReader``。

**参数**

``reset`` （默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``video.pause``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5710:7265:FUNCTION

.. rubric:: ``useEffect callback @ 130``

.. code-block:: javascript

   useEffect callback @ 130()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``130``—``166`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``onStopSpeech``、``setSettingsOpen``、``setPartPickerOpen``、``setMediaEditor``、``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setVideoPlaybackError``、``setSuppressedVideoAutoplayKey``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7189:7222:FUNCTION

.. rubric:: ``parts.some callback @ 165``

.. code-block:: javascript

   parts.some callback @ 165(item)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``useEffect callback @ 130``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7356:7897:FUNCTION

.. rubric:: ``useCallback callback @ 168``

.. code-block:: javascript

   useCallback callback @ 168()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``168``—``182`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setSuppressedVideoAutoplayKey``、``onStopSpeech``、``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7965:8294:FUNCTION

.. rubric:: ``useCallback callback @ 184``

.. code-block:: javascript

   useCallback callback @ 184()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``184``—``193`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8335:8989:FUNCTION

.. rubric:: ``useEffect callback @ 195``

.. code-block:: javascript

   useEffect callback @ 195()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``195``—``213`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8409:8848:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``197``—``210`` 行；所属函数 ``useEffect callback @ 195``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``setPartPickerOpen``、``setSettingsOpen``、``closeReader``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8923:8982:FUNCTION

.. rubric:: ``returned callback @ 212``

.. code-block:: javascript

   returned callback @ 212()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``useEffect callback @ 195``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9071:9100:FUNCTION

.. rubric:: ``useEffect callback @ 215``

.. code-block:: javascript

   useEffect callback @ 215()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9076:9100:FUNCTION

.. rubric:: ``anonymous callback @ 215``

.. code-block:: javascript

   anonymous callback @ 215()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9132:9333:FUNCTION

.. rubric:: ``useEffect callback @ 217``

.. code-block:: javascript

   useEffect callback @ 217()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``217``—``221`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9432:10848:FUNCTION

.. rubric:: ``useCallback callback @ 224``

.. code-block:: javascript

   async useCallback callback @ 224({ reset = true, playbackKey = '' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``224``—``255`` 行；所属函数 ``StoryReader``。

**参数**

``{ reset = true, playbackKey = '' }`` （默认值 ``{}``）
   调用方传入的 ``reset = true, playbackKey = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``videoRef.current === video && renderedPartKeyRef.current === targetPartKey``。

**主要协作调用**：``setVideoDone``、``video.pause``、``setVideoPlaybackError``、``video.play``、``console.warn``、``t``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11087:11412:FUNCTION

.. rubric:: ``useEffect callback @ 261``

.. code-block:: javascript

   useEffect callback @ 261()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``261``—``268`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11283:11352:FUNCTION

.. rubric:: ``window.setTimeout callback @ 264``

.. code-block:: javascript

   window.setTimeout callback @ 264()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``264``—``266`` 行；所属函数 ``useEffect callback @ 261``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11372:11405:FUNCTION

.. rubric:: ``returned callback @ 267``

.. code-block:: javascript

   returned callback @ 267()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``useEffect callback @ 261``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11560:12144:FUNCTION

.. rubric:: ``useCallback callback @ 271``

.. code-block:: javascript

   useCallback callback @ 271(playbackKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``271``—``284`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.findIndex``、``setWaitingForNext``、``setAutoPlayStage``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11726:11814:FUNCTION

.. rubric:: ``parts.findIndex callback @ 274``

.. code-block:: javascript

   parts.findIndex callback @ 274(item)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``274``—``274`` 行；所属函数 ``useCallback callback @ 271``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12242:12813:FUNCTION

.. rubric:: ``useCallback callback @ 289``

.. code-block:: javascript

   useCallback callback @ 289(playbackKey, targetPart)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``289``—``299`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPart``
   调用方传入的 ``targetPart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``onSpeakPart``、``setSpeechDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13108:14434:FUNCTION

.. rubric:: ``useEffect callback @ 306``

.. code-block:: javascript

   useEffect callback @ 306()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``306``—``339`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setVideoPlaybackError``、``onStopSpeech``、``pauseVideo``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13667:14372:FUNCTION

.. rubric:: ``window.setTimeout callback @ 321``

.. code-block:: javascript

   window.setTimeout callback @ 321()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``321``—``336`` 行；所属函数 ``useEffect callback @ 306``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``playCurrentVideo``、``startNarration``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14394:14427:FUNCTION

.. rubric:: ``returned callback @ 338``

.. code-block:: javascript

   returned callback @ 338()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``useEffect callback @ 306``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14652:15426:FUNCTION

.. rubric:: ``useEffect callback @ 351``

.. code-block:: javascript

   useEffect callback @ 351()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``351``—``371`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSpeechDone``、``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15539:16188:FUNCTION

.. rubric:: ``useEffect callback @ 373``

.. code-block:: javascript

   useEffect callback @ 373()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``373``—``390`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``advanceAutoPlay``、``setAutoPlayStage``、``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16427:17096:FUNCTION

.. rubric:: ``useEffect callback @ 403``

.. code-block:: javascript

   useEffect callback @ 403()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``403``—``421`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``setSpeechDone``、``startNarration``、``advanceAutoPlay``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17218:17476:FUNCTION

.. rubric:: ``useEffect callback @ 423``

.. code-block:: javascript

   useEffect callback @ 423()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``423``—``429`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17332:17371:FUNCTION

.. rubric:: ``parts.find callback @ 425``

.. code-block:: javascript

   parts.find callback @ 425(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``useEffect callback @ 423``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17905:18247:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``438``—``448`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPartPickerOpen``、``onStopSpeech``、``pauseVideo``、``setWaitingForNext``、``setSuppressedVideoAutoplayKey``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:18271:18409:FUNCTION

.. rubric:: ``editMedia``

.. code-block:: javascript

   editMedia(type)

实现 ``editMedia`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``450``—``454`` 行；所属函数 ``StoryReader``。

**参数**

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopAutoPlay``、``setSettingsOpen``、``setMediaEditor``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:18437:18554:FUNCTION

.. rubric:: ``startAutoPlay``

.. code-block:: javascript

   startAutoPlay()

启动与 ``Auto Play`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``456``—``460`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setAutoPlayActive``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:18585:19622:FUNCTION

.. rubric:: ``handleVideoEnded``

.. code-block:: javascript

   handleVideoEnded(event)

处理 ``Video Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``462``—``484`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``playCurrentVideo``、``setVideoDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:19656:20019:FUNCTION

.. rubric:: ``handleVideoMetadata``

.. code-block:: javascript

   handleVideoMetadata(event)

处理 ``Video Metadata`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``486``—``494`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``setVideoMetadata``、``video.getAttribute``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:22596:22622:FUNCTION

.. rubric:: ``onClose callback @ 555``

.. code-block:: javascript

   onClose callback @ 555()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``555``—``555`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMediaEditor``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:25290:25314:FUNCTION

.. rubric:: ``onClick callback @ 598``

.. code-block:: javascript

   onClick callback @ 598()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``598``—``598`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editMedia``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:25516:25540:FUNCTION

.. rubric:: ``onClick callback @ 601``

.. code-block:: javascript

   onClick callback @ 601()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``601``—``601`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editMedia``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:25971:26663:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 608``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 608(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``608``—``619`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:26125:26316:FUNCTION

.. rubric:: ``onClick callback @ 611``

.. code-block:: javascript

   onClick callback @ 611()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``611``—``614`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:27506:27546:FUNCTION

.. rubric:: ``onValueChange callback @ 632``

.. code-block:: javascript

   onValueChange callback @ 632([value])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``632``—``632`` 行；所属函数 ``StoryReader``。

**参数**

``[value]``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoVolume``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:28568:28612:FUNCTION

.. rubric:: ``onChange callback @ 649``

.. code-block:: javascript

   onChange callback @ 649(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``649``—``649`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:31971:32006:FUNCTION

.. rubric:: ``onClick callback @ 708``

.. code-block:: javascript

   onClick callback @ 708()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``708``—``708`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:33406:33749:FUNCTION

.. rubric:: ``onOpenAutoFocus callback @ 733``

.. code-block:: javascript

   onOpenAutoFocus callback @ 733(event)

处理 ``Open Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``733``—``738`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``partPickerRef.current?.querySelector``、``current?.focus``、``current?.scrollIntoView``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:34089:35124:FUNCTION

.. rubric:: ``parts.map callback @ 742``

.. code-block:: javascript

   parts.map callback @ 742(item)

作为 ``parts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``742``—``753`` 行；所属函数 ``StoryReader``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:34471:34490:FUNCTION

.. rubric:: ``onClick callback @ 748``

.. code-block:: javascript

   onClick callback @ 748()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``748``—``748`` 行；所属函数 ``parts.map callback @ 742``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:35314:35349:FUNCTION

.. rubric:: ``onClick callback @ 759``

.. code-block:: javascript

   onClick callback @ 759()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``759``—``759`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
