src/features/images/Lightbox 模块
================================================================================

.. js:module:: src/features/images/Lightbox

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/images/Lightbox.jsx``
* **模块标识**：``src/features/images/Lightbox``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``yet-another-react-lightbox``、``yet-another-react-lightbox/plugins/zoom``、``yet-another-react-lightbox/plugins/fullscreen``、``yet-another-react-lightbox/plugins/thumbnails``、``yet-another-react-lightbox/styles.css``、``yet-another-react-lightbox/plugins/thumbnails.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/images/Lightbox.jsx:362:1093:FUNCTION

.. js:function:: ImageLightbox({ slides, index, close, zIndex })

   渲染 ``ImageLightbox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``8``—``33`` 行。

   **参数**

   ``{ slides, index, close, zIndex }``
      调用方传入的 ``slides, index, close, zIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Lightbox open slides={slides} index={index} close={close} plugins={[Zoom, Fullscreen, Thumbnails]} styles={{ root: { zIndex } }} thumbnails={{ hidden: slides.length < 2, showTo…``。
