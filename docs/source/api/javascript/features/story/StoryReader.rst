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
* **局部函数与匿名回调**：50

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/slider``、``@/lib/tools.jsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``、``@/features/story/media/StoryMediaDeck.jsx``、``@/features/story/media/StoryVideo.jsx``、``@/features/story/media/StoryMediaEditor.jsx``、``@/features/story/media/storyMediaLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1275:30655:FUNCTION

.. js:function:: StoryReader({ story, open, onClose, onChangePart, onUpdatePartMedia, onSpeakPart, onStopSpeech, speechState, su…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``29``—``690`` 行。

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

   **内部回调数量**：36。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1831:1879:FUNCTION

.. rubric:: ``useState callback @ 47``

.. code-block:: javascript

   useState callback @ 47()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2518:2588:FUNCTION

.. rubric:: ``useState callback @ 57``

.. code-block:: javascript

   useState callback @ 57()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``58`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2859:3061:FUNCTION

.. rubric:: ``useCallback callback @ 66``

.. code-block:: javascript

   useCallback callback @ 66(video)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``70`` 行；所属函数 ``StoryReader``。

**参数**

``video``
   调用方传入的 ``video`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3411:3482:FUNCTION

.. rubric:: ``useMemo callback @ 79``

.. code-block:: javascript

   useMemo callback @ 79()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(story?.parts || [])].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3448:3481:FUNCTION

.. rubric:: ``[...(story?.parts || [])].sort callback @ 79``

.. code-block:: javascript

   [...(story?.parts || [])].sort callback @ 79(a, b)

作为 ``[...(story?.parts || [])].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useMemo callback @ 79``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3569:3605:FUNCTION

.. rubric:: ``parts.findIndex callback @ 83``

.. code-block:: javascript

   parts.findIndex callback @ 83(part)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``StoryReader``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4231:4507:FUNCTION

.. rubric:: ``useEffect callback @ 96``

.. code-block:: javascript

   useEffect callback @ 96()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``101`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', handleResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4328:4370:FUNCTION

.. rubric:: ``handleResize``

.. code-block:: javascript

   handleResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``useEffect callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setViewportWidth``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4443:4500:FUNCTION

.. rubric:: ``returned callback @ 100``

.. code-block:: javascript

   returned callback @ 100()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``useEffect callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4529:4577:FUNCTION

.. rubric:: ``useEffect callback @ 103``

.. code-block:: javascript

   useEffect callback @ 103()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoAspectRatio``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4628:4930:FUNCTION

.. rubric:: ``useCallback callback @ 107``

.. code-block:: javascript

   useCallback callback @ 107(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``116`` 行；所属函数 ``StoryReader``。

**参数**

``reset``（默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``video.pause``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4952:6435:FUNCTION

.. rubric:: ``useEffect callback @ 118``

.. code-block:: javascript

   useEffect callback @ 118()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``118``—``152`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``onStopSpeech``、``setSettingsOpen``、``setMediaEditor``、``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setVideoPlaybackError``、``setSuppressedVideoAutoplayKey``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6359:6392:FUNCTION

.. rubric:: ``parts.some callback @ 151``

.. code-block:: javascript

   parts.some callback @ 151(item)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``useEffect callback @ 118``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6526:7067:FUNCTION

.. rubric:: ``useCallback callback @ 154``

.. code-block:: javascript

   useCallback callback @ 154()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``154``—``168`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setSuppressedVideoAutoplayKey``、``onStopSpeech``、``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7135:7464:FUNCTION

.. rubric:: ``useCallback callback @ 170``

.. code-block:: javascript

   useCallback callback @ 170()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``170``—``179`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7505:7979:FUNCTION

.. rubric:: ``useEffect callback @ 181``

.. code-block:: javascript

   useEffect callback @ 181()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``181``—``194`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7579:7838:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``183``—``191`` 行；所属函数 ``useEffect callback @ 181``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSettingsOpen``、``event.preventDefault``、``closeReader``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7913:7972:FUNCTION

.. rubric:: ``returned callback @ 193``

.. code-block:: javascript

   returned callback @ 193()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``useEffect callback @ 181``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8045:8074:FUNCTION

.. rubric:: ``useEffect callback @ 196``

.. code-block:: javascript

   useEffect callback @ 196()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8050:8074:FUNCTION

.. rubric:: ``anonymous callback @ 196``

.. code-block:: javascript

   anonymous callback @ 196()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``useEffect callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8106:8307:FUNCTION

.. rubric:: ``useEffect callback @ 198``

.. code-block:: javascript

   useEffect callback @ 198()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``198``—``202`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8406:9580:FUNCTION

.. rubric:: ``useCallback callback @ 205``

.. code-block:: javascript

   async useCallback callback @ 205({ reset = true, playbackKey = '' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``205``—``234`` 行；所属函数 ``StoryReader``。

**参数**

``{ reset = true, playbackKey = '' }``（默认值 ``{}``）
   调用方传入的 ``reset = true, playbackKey = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVideoDone``、``video.pause``、``setVideoPlaybackError``、``video.play``、``console.warn``、``t``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9819:10144:FUNCTION

.. rubric:: ``useEffect callback @ 240``

.. code-block:: javascript

   useEffect callback @ 240()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``240``—``247`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10015:10084:FUNCTION

.. rubric:: ``window.setTimeout callback @ 243``

.. code-block:: javascript

   window.setTimeout callback @ 243()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``243``—``245`` 行；所属函数 ``useEffect callback @ 240``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10104:10137:FUNCTION

.. rubric:: ``returned callback @ 246``

.. code-block:: javascript

   returned callback @ 246()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``246``—``246`` 行；所属函数 ``useEffect callback @ 240``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10292:10876:FUNCTION

.. rubric:: ``useCallback callback @ 250``

.. code-block:: javascript

   useCallback callback @ 250(playbackKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``250``—``263`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.findIndex``、``setWaitingForNext``、``setAutoPlayStage``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10458:10546:FUNCTION

.. rubric:: ``parts.findIndex callback @ 253``

.. code-block:: javascript

   parts.findIndex callback @ 253(item)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``useCallback callback @ 250``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10974:11545:FUNCTION

.. rubric:: ``useCallback callback @ 268``

.. code-block:: javascript

   useCallback callback @ 268(playbackKey, targetPart)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``268``—``278`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPart``
   调用方传入的 ``targetPart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``onSpeakPart``、``setSpeechDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11840:13166:FUNCTION

.. rubric:: ``useEffect callback @ 285``

.. code-block:: javascript

   useEffect callback @ 285()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``318`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setVideoPlaybackError``、``onStopSpeech``、``pauseVideo``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12399:13104:FUNCTION

.. rubric:: ``window.setTimeout callback @ 300``

.. code-block:: javascript

   window.setTimeout callback @ 300()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``300``—``315`` 行；所属函数 ``useEffect callback @ 285``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``playCurrentVideo``、``startNarration``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13126:13159:FUNCTION

.. rubric:: ``returned callback @ 317``

.. code-block:: javascript

   returned callback @ 317()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``useEffect callback @ 285``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13384:14158:FUNCTION

.. rubric:: ``useEffect callback @ 330``

.. code-block:: javascript

   useEffect callback @ 330()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``330``—``350`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSpeechDone``、``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14271:14920:FUNCTION

.. rubric:: ``useEffect callback @ 352``

.. code-block:: javascript

   useEffect callback @ 352()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``352``—``369`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``advanceAutoPlay``、``setAutoPlayStage``、``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15159:15828:FUNCTION

.. rubric:: ``useEffect callback @ 382``

.. code-block:: javascript

   useEffect callback @ 382()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``382``—``400`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``setSpeechDone``、``startNarration``、``advanceAutoPlay``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15950:16208:FUNCTION

.. rubric:: ``useEffect callback @ 402``

.. code-block:: javascript

   useEffect callback @ 402()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``402``—``408`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16064:16103:FUNCTION

.. rubric:: ``parts.find callback @ 404``

.. code-block:: javascript

   parts.find callback @ 404(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``404``—``404`` 行；所属函数 ``useEffect callback @ 402``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16637:16795:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``417``—``422`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setWaitingForNext``、``setSuppressedVideoAutoplayKey``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16819:16957:FUNCTION

.. rubric:: ``editMedia``

.. code-block:: javascript

   editMedia(type)

实现 ``editMedia`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``424``—``428`` 行；所属函数 ``StoryReader``。

**参数**

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopAutoPlay``、``setSettingsOpen``、``setMediaEditor``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16985:17102:FUNCTION

.. rubric:: ``startAutoPlay``

.. code-block:: javascript

   startAutoPlay()

启动与 ``Auto Play`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``430``—``434`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setAutoPlayActive``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17133:18103:FUNCTION

.. rubric:: ``handleVideoEnded``

.. code-block:: javascript

   handleVideoEnded()

处理 ``Video Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``436``—``457`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``playCurrentVideo``、``setVideoDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:18137:18384:FUNCTION

.. rubric:: ``handleVideoMetadata``

.. code-block:: javascript

   handleVideoMetadata(event)

处理 ``Video Metadata`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``459``—``464`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setVideoAspectRatio``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:20826:20852:FUNCTION

.. rubric:: ``onClose callback @ 521``

.. code-block:: javascript

   onClose callback @ 521()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``521``—``521`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMediaEditor``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:23520:23544:FUNCTION

.. rubric:: ``onClick callback @ 564``

.. code-block:: javascript

   onClick callback @ 564()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``564``—``564`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editMedia``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:23746:23770:FUNCTION

.. rubric:: ``onClick callback @ 567``

.. code-block:: javascript

   onClick callback @ 567()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``567``—``567`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editMedia``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24201:24893:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 574``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 574(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``574``—``585`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24355:24546:FUNCTION

.. rubric:: ``onClick callback @ 577``

.. code-block:: javascript

   onClick callback @ 577()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``577``—``580`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 574``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:25736:25776:FUNCTION

.. rubric:: ``onValueChange callback @ 598``

.. code-block:: javascript

   onValueChange callback @ 598([value])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``598``—``598`` 行；所属函数 ``StoryReader``。

**参数**

``[value]``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoVolume``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:26798:26842:FUNCTION

.. rubric:: ``onChange callback @ 615``

.. code-block:: javascript

   onChange callback @ 615(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``615``—``615`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:29710:29745:FUNCTION

.. rubric:: ``onClick callback @ 668``

.. code-block:: javascript

   onClick callback @ 668()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``668``—``668`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:30356:30391:FUNCTION

.. rubric:: ``onClick callback @ 681``

.. code-block:: javascript

   onClick callback @ 681()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``681``—``681`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
