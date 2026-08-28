src/features/story/media/StoryMediaDeck 模块
============================================================================================

.. js:module:: src/features/story/media/StoryMediaDeck

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/media/StoryMediaDeck.jsx``
* **模块标识**：``src/features/story/media/StoryMediaDeck``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaDeck.jsx:55:1416:FUNCTION

.. js:function:: StoryMediaDeck({part, layout, videoElement})

   渲染 ``StoryMediaDeck`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``3``—``32`` 行。

   **参数**

   ``{part, layout, videoElement}``
      调用方传入的 ``part, layout, videoElement`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 md:flex-row md:items-start md:gap-6" data-story-media-layout="media_pair" data-story-media-image-fraction={imageGrow…``。

   **主要协作调用**：``Number``、``imageGrow.toFixed``、``videoGrow.toFixed``、``String``、``resolveResourceUrl``。
