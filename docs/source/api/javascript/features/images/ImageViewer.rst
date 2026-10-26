src/features/images/ImageViewer 模块
================================================================================

.. js:module:: src/features/images/ImageViewer

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/images/ImageViewer.jsx``
* **模块标识**：``src/features/images/ImageViewer``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``./useImageViewer.js``、``@/lib/browserHistoryLayers.js``、``@/lib/windowLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/images/ImageViewer.jsx:292:671:FUNCTION

.. js:function:: ImageViewer()

   渲染 ``ImageViewer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``8``—``17`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``open ? ( <Suspense fallback={null}> <Lightbox slides={slides} index={index} close={closeImageViewer} zIndex={layer.zIndex} /> </Suspense> ) : null``。

   **主要协作调用**：``useImageViewer``、``useWindowLayer``、``useBrowserBackLayer``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/images/ImageViewer.jsx:260:290:FUNCTION

.. rubric:: ``lazy callback @ 6``

.. code-block:: javascript

   lazy callback @ 6()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``6`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。
