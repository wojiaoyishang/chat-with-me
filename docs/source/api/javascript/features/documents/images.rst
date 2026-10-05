src/features/documents/images 模块
================================================================================

.. js:module:: src/features/documents/images

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/images.js``
* **模块标识**：``src/features/documents/images``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``yjs``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/images.js:25:927:FUNCTION

.. js:function:: insertUploadedImages({ files, text, doc, editor, upload, isCurrent })

   实现 ``insertUploadedImages`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``4``—``18`` 行。

   **参数**

   ``{ files, text, doc, editor, upload, isCurrent }``
      调用方传入的 ``files, text, doc, editor, upload, isCurrent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``Y.createRelativePositionFromTypeIndex``、``upload``、``isCurrent``、``Y.createAbsolutePositionFromRelativePosition``、``file.name.replace``、``editor.dispatch``。
