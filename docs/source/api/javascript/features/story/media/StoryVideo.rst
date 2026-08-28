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
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/media/StoryVideo.jsx:65:1078:FUNCTION

.. rubric:: ``StoryVideo``

.. code-block:: javascript

   StoryVideo({ src, muted = true, aspectRatio = null, playbackError = '', onEnded, onLoadedMetadata, }, ref)

实现 ``StoryVideo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``3``—``37`` 行。

**参数**

``{ src, muted = true, aspectRatio = null, playbackError = '', onEnded, onLoadedMetadata, }``
   调用方传入的 ``src, muted = true, aspectRatio = null, playbackError = '', onEnded, onLoadedMetadata,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <figure className="overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-black/5" style={aspectRatio ? {aspectRatio: String(aspectRatio)} : undefined} > <video key={src} re…``。

**主要协作调用**：``String``。
