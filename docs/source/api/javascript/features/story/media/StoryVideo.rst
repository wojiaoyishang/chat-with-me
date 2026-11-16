src/features/story/media/StoryVideo 模块
====================================================================================

.. js:module:: src/features/story/media/StoryVideo

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/media/StoryVideo.jsx``
* **模块标识**：``src/features/story/media/StoryVideo``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``./storyMediaLifecycle.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/media/StoryVideo.jsx:165:1796:FUNCTION

.. rubric:: ``StoryVideo``

.. code-block:: javascript

   StoryVideo({ src, muted = true, aspectRatio = null, playbackError = '', onEnded, onLoadedMetadata, }, ref)

实现 ``StoryVideo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``53`` 行。

**参数**

``{ src, muted = true, aspectRatio = null, playbackError = '', onEnded, onLoadedMetadata, }``
   调用方传入的 ``src, muted = true, aspectRatio = null, playbackError = '', onEnded, onLoadedMetadata,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <figure className="m-0 min-w-0 w-full overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-black/5"> <div className="relative w-full overflow-hidden" style={{aspectRatio:…``。

**主要协作调用**：``useRef``、``useImperativeHandle``、``useEffect``、``Number``、``Number.isFinite``、``String``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/media/StoryVideo.jsx:370:393:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 13``

.. code-block:: javascript

   useImperativeHandle callback @ 13()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``StoryVideo``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/media/StoryVideo.jsx:410:589:FUNCTION

.. rubric:: ``useEffect callback @ 14``

.. code-block:: javascript

   useEffect callback @ 14()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``20`` 行；所属函数 ``StoryVideo``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (!video.isConnected) releaseStoryMedia([video]); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/media/StoryVideo.jsx:500:582:FUNCTION

.. rubric:: ``returned callback @ 17``

.. code-block:: javascript

   returned callback @ 17()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``19`` 行；所属函数 ``useEffect callback @ 14``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseStoryMedia``。
