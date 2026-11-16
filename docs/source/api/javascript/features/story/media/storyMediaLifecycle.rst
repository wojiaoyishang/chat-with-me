src/features/story/media/storyMediaLifecycle 模块
======================================================================================================

.. js:module:: src/features/story/media/storyMediaLifecycle

Release pending downloads and playback owned by a departing Story surface.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/media/storyMediaLifecycle.js``
* **模块标识**：``src/features/story/media/storyMediaLifecycle``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLifecycle.js:0:695:FUNCTION

.. js:function:: releaseStoryMedia(resources)

   Release pending downloads and playback owned by a departing Story surface.

   **性质**：同步函数；导出 API；源码第 ``2``—``18`` 行。

   **参数**

   ``resources``
      调用方传入的 ``resources`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``resource.removeAttribute``、``resource.pause``、``resource.querySelectorAll``、``source.removeAttribute``、``resource.load``。
