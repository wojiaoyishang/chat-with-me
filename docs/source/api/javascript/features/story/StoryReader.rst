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
* **局部函数与匿名回调**：49

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button.tsx``、``@/components/ui/slider``、``@/lib/tools.jsx``、``@/components/ui/popover.tsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx``、``@/lib/virtualUrl.js``、``@/features/story/media/StoryMediaDeck.jsx``、``@/features/story/media/StoryVideo.jsx``、``@/features/story/media/StoryMediaEditor.jsx``、``@/features/story/media/storyMediaLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:1275:31420:FUNCTION

.. js:function:: StoryReader({ story, open, onClose, onChangePart, onUpdatePartMedia, onSpeakPart, onStopSpeech, speechState, su…)

   渲染 ``StoryReader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``29``—``701`` 行。

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

   **内部回调数量**：35。这些回调会在本页“局部函数与匿名回调”中逐项列出。

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

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:2853:3055:FUNCTION

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

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3405:3476:FUNCTION

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

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3442:3475:FUNCTION

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

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:3563:3599:FUNCTION

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

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4482:4758:FUNCTION

.. rubric:: ``useEffect callback @ 99``

.. code-block:: javascript

   useEffect callback @ 99()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``99``—``104`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', handleResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4579:4621:FUNCTION

.. rubric:: ``handleResize``

.. code-block:: javascript

   handleResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``useEffect callback @ 99``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setViewportWidth``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4694:4751:FUNCTION

.. rubric:: ``returned callback @ 103``

.. code-block:: javascript

   returned callback @ 103()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``useEffect callback @ 99``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:4801:5099:FUNCTION

.. rubric:: ``useCallback callback @ 106``

.. code-block:: javascript

   useCallback callback @ 106(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``106``—``115`` 行；所属函数 ``StoryReader``。

**参数**

``reset`` （默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``video.pause``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:5121:6604:FUNCTION

.. rubric:: ``useEffect callback @ 117``

.. code-block:: javascript

   useEffect callback @ 117()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``117``—``151`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``onStopSpeech``、``setSettingsOpen``、``setMediaEditor``、``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``Number``、``localStorage.getItem``、``setWaitingForNext``、``setVideoPlaybackError``、``setSuppressedVideoAutoplayKey``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6528:6561:FUNCTION

.. rubric:: ``parts.some callback @ 150``

.. code-block:: javascript

   parts.some callback @ 150(item)

作为 ``parts.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``useEffect callback @ 117``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:6695:7236:FUNCTION

.. rubric:: ``useCallback callback @ 153``

.. code-block:: javascript

   useCallback callback @ 153()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``153``—``167`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setSuppressedVideoAutoplayKey``、``onStopSpeech``、``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7304:7633:FUNCTION

.. rubric:: ``useCallback callback @ 169``

.. code-block:: javascript

   useCallback callback @ 169()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``169``—``178`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoPlayActive``、``setAutoPlayStage``、``pauseVideo``、``onClose``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7674:8148:FUNCTION

.. rubric:: ``useEffect callback @ 180``

.. code-block:: javascript

   useEffect callback @ 180()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``193`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', handleKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:7748:8007:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``182``—``190`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSettingsOpen``、``event.preventDefault``、``closeReader``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8082:8141:FUNCTION

.. rubric:: ``returned callback @ 192``

.. code-block:: javascript

   returned callback @ 192()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8214:8243:FUNCTION

.. rubric:: ``useEffect callback @ 195``

.. code-block:: javascript

   useEffect callback @ 195()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8219:8243:FUNCTION

.. rubric:: ``anonymous callback @ 195``

.. code-block:: javascript

   anonymous callback @ 195()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``useEffect callback @ 195``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pauseVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8275:8476:FUNCTION

.. rubric:: ``useEffect callback @ 197``

.. code-block:: javascript

   useEffect callback @ 197()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``197``—``201`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.setItem``、``String``、``onChangePart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:8575:9749:FUNCTION

.. rubric:: ``useCallback callback @ 204``

.. code-block:: javascript

   async useCallback callback @ 204({ reset = true, playbackKey = '' })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``204``—``233`` 行；所属函数 ``StoryReader``。

**参数**

``{ reset = true, playbackKey = '' }`` （默认值 ``{}``）
   调用方传入的 ``reset = true, playbackKey = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVideoDone``、``video.pause``、``setVideoPlaybackError``、``video.play``、``console.warn``、``t``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:9988:10313:FUNCTION

.. rubric:: ``useEffect callback @ 239``

.. code-block:: javascript

   useEffect callback @ 239()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``246`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10184:10253:FUNCTION

.. rubric:: ``window.setTimeout callback @ 242``

.. code-block:: javascript

   window.setTimeout callback @ 242()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``242``—``244`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10273:10306:FUNCTION

.. rubric:: ``returned callback @ 245``

.. code-block:: javascript

   returned callback @ 245()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``245``—``245`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10461:11045:FUNCTION

.. rubric:: ``useCallback callback @ 249``

.. code-block:: javascript

   useCallback callback @ 249(playbackKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``249``—``262`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.findIndex``、``setWaitingForNext``、``setAutoPlayStage``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:10627:10715:FUNCTION

.. rubric:: ``parts.findIndex callback @ 252``

.. code-block:: javascript

   parts.findIndex callback @ 252(item)

实现 ``parts.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``useCallback callback @ 249``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:11143:11714:FUNCTION

.. rubric:: ``useCallback callback @ 267``

.. code-block:: javascript

   useCallback callback @ 267(playbackKey, targetPart)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``267``—``277`` 行；所属函数 ``StoryReader``。

**参数**

``playbackKey``
   调用方传入的 ``playbackKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetPart``
   调用方传入的 ``targetPart`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``onSpeakPart``、``setSpeechDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12009:13335:FUNCTION

.. rubric:: ``useEffect callback @ 284``

.. code-block:: javascript

   useEffect callback @ 284()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``284``—``317`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setWaitingForNext``、``setVideoDone``、``setSpeechDone``、``setVideoPlaybackError``、``onStopSpeech``、``pauseVideo``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:12568:13273:FUNCTION

.. rubric:: ``window.setTimeout callback @ 299``

.. code-block:: javascript

   window.setTimeout callback @ 299()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``299``—``314`` 行；所属函数 ``useEffect callback @ 284``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``playCurrentVideo``、``startNarration``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13295:13328:FUNCTION

.. rubric:: ``returned callback @ 316``

.. code-block:: javascript

   returned callback @ 316()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``316``—``316`` 行；所属函数 ``useEffect callback @ 284``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:13553:14327:FUNCTION

.. rubric:: ``useEffect callback @ 329``

.. code-block:: javascript

   useEffect callback @ 329()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``329``—``349`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSpeechDone``、``['loading', 'playing', 'paused'].includes``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:14440:15089:FUNCTION

.. rubric:: ``useEffect callback @ 351``

.. code-block:: javascript

   useEffect callback @ 351()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``351``—``368`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``advanceAutoPlay``、``setAutoPlayStage``、``playCurrentVideo``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:15328:15997:FUNCTION

.. rubric:: ``useEffect callback @ 381``

.. code-block:: javascript

   useEffect callback @ 381()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``381``—``399`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoPlayStage``、``setSpeechDone``、``startNarration``、``advanceAutoPlay``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16119:16377:FUNCTION

.. rubric:: ``useEffect callback @ 401``

.. code-block:: javascript

   useEffect callback @ 401()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``401``—``407`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parts.find``、``setWaitingForNext``、``setSequence``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16233:16272:FUNCTION

.. rubric:: ``parts.find callback @ 403``

.. code-block:: javascript

   parts.find callback @ 403(item)

作为 ``parts.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``403``—``403`` 行；所属函数 ``useEffect callback @ 401``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16806:16964:FUNCTION

.. rubric:: ``setPart``

.. code-block:: javascript

   setPart(next)

设置与 ``Part`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``416``—``421`` 行；所属函数 ``StoryReader``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setWaitingForNext``、``setSuppressedVideoAutoplayKey``、``setSequence``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:16988:17126:FUNCTION

.. rubric:: ``editMedia``

.. code-block:: javascript

   editMedia(type)

实现 ``editMedia`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``423``—``427`` 行；所属函数 ``StoryReader``。

**参数**

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopAutoPlay``、``setSettingsOpen``、``setMediaEditor``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17154:17271:FUNCTION

.. rubric:: ``startAutoPlay``

.. code-block:: javascript

   startAutoPlay()

启动与 ``Auto Play`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``429``—``433`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSuppressedVideoAutoplayKey``、``setAutoPlayActive``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:17302:18272:FUNCTION

.. rubric:: ``handleVideoEnded``

.. code-block:: javascript

   handleVideoEnded()

处理 ``Video Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``435``—``456`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``playCurrentVideo``、``setVideoDone``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:18306:18621:FUNCTION

.. rubric:: ``handleVideoMetadata``

.. code-block:: javascript

   handleVideoMetadata(event)

处理 ``Video Metadata`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``458``—``465`` 行；所属函数 ``StoryReader``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setVideoMetadata``、``video.getAttribute``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:21198:21224:FUNCTION

.. rubric:: ``onClose callback @ 526``

.. code-block:: javascript

   onClose callback @ 526()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``526``—``526`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMediaEditor``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:23892:23916:FUNCTION

.. rubric:: ``onClick callback @ 569``

.. code-block:: javascript

   onClick callback @ 569()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``569``—``569`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editMedia``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24118:24142:FUNCTION

.. rubric:: ``onClick callback @ 572``

.. code-block:: javascript

   onClick callback @ 572()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``572``—``572`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editMedia``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24573:25265:FUNCTION

.. rubric:: ``Object.keys(FONT_SCALES).map callback @ 579``

.. code-block:: javascript

   Object.keys(FONT_SCALES).map callback @ 579(key)

作为 ``Object.keys(FONT_SCALES).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``579``—``590`` 行；所属函数 ``StoryReader``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:24727:24918:FUNCTION

.. rubric:: ``onClick callback @ 582``

.. code-block:: javascript

   onClick callback @ 582()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``582``—``585`` 行；所属函数 ``Object.keys(FONT_SCALES).map callback @ 579``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setFontKey``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:26108:26148:FUNCTION

.. rubric:: ``onValueChange callback @ 603``

.. code-block:: javascript

   onValueChange callback @ 603([value])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``603``—``603`` 行；所属函数 ``StoryReader``。

**参数**

``[value]``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVideoVolume``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:27170:27214:FUNCTION

.. rubric:: ``onChange callback @ 620``

.. code-block:: javascript

   onChange callback @ 620(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``620``—``620`` 行；所属函数 ``StoryReader``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:30475:30510:FUNCTION

.. rubric:: ``onClick callback @ 679``

.. code-block:: javascript

   onClick callback @ 679()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``679``—``679`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。

.. CWM-AST-FUNCTION src/features/story/StoryReader.jsx:31121:31156:FUNCTION

.. rubric:: ``onClick callback @ 692``

.. code-block:: javascript

   onClick callback @ 692()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``StoryReader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPart``。
