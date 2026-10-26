src/features/images/useImageViewer 模块
==================================================================================

.. js:module:: src/features/images/useImageViewer

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/images/useImageViewer.js``
* **模块标识**：``src/features/images/useImageViewer``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``zustand``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/images/useImageViewer.js:119:623:FUNCTION

.. js:function:: imageSlides(images)

   实现 ``imageSlides`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``4``—``18`` 行。

   **参数**

   ``images`` （默认值 ``[]``）
      调用方传入的 ``images`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(Array.isArray(images) ? images : []).flatMap``、``Array.isArray``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/images/useImageViewer.js:749:796:FUNCTION

.. js:function:: closeImageViewer()

   关闭与 ``Image Viewer`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``25``—``25`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useImageViewer.setState``。

.. CWM-AST-FUNCTION src/features/images/useImageViewer.js:828:1045:FUNCTION

.. js:function:: openImageViewer(images, index)

   打开与 ``Image Viewer`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``26``—``34`` 行。

   **参数**

   ``images``
      调用方传入的 ``images`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index`` （默认值 ``0``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``imageSlides``、``useImageViewer.setState``、``Math.max``、``Math.min``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/images/useImageViewer.js:185:622:FUNCTION

.. rubric:: ``(Array.isArray(images) ? images : []).flatMap callback @ 5``

.. code-block:: javascript

   (Array.isArray(images) ? images : []).flatMap callback @ 5(image)

实现 ``(Array.isArray(images) ? images : []).flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``18`` 行；所属函数 ``imageSlides``。

**参数**

``image``
   调用方传入的 ``image`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``[ { src, alt: image.alt || image.filename || "", ...(image.width > 0 && image.height > 0 ? { width: image.width, height: image.height } : {}), }, ]``。

**主要协作调用**：``resolveResourceUrl``、``/^(https?:\/\/|blob:|data:image\/|\/)/i.test``。

.. CWM-AST-FUNCTION src/features/images/useImageViewer.js:663:715:FUNCTION

.. rubric:: ``create callback @ 20``

.. code-block:: javascript

   create callback @ 20()

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``24`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
