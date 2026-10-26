src/features/images/ImageGallery 模块
================================================================================

.. js:module:: src/features/images/ImageGallery

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/images/ImageGallery.jsx``
* **模块标识**：``src/features/images/ImageGallery``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/markdown/ResourceImage.jsx``、``./useImageViewer.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/images/ImageGallery.jsx:206:1385:FUNCTION

.. js:function:: ImageGallery({ images, label, className = 'mt-2' })

   渲染 ``ImageGallery`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``6``—``21`` 行。

   **参数**

   ``{ images, label, className = 'mt-2' }``
      调用方传入的 ``images, label, className = 'mt-2'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<div className={className}> <button type="button" className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-emerald-700/85 transition-colors hover:bg-emerald…``。

   **主要协作调用**：``useMemo``、``useState``、``slides.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/images/ImageGallery.jsx:313:338:FUNCTION

.. rubric:: ``useMemo callback @ 7``

.. code-block:: javascript

   useMemo callback @ 7()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``ImageGallery``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``imageSlides``。

.. CWM-AST-FUNCTION src/features/images/ImageGallery.jsx:832:868:FUNCTION

.. rubric:: ``onClick callback @ 12``

.. code-block:: javascript

   onClick callback @ 12()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``ImageGallery``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/images/ImageGallery.jsx:850:867:FUNCTION

.. rubric:: ``setExpanded callback @ 12``

.. code-block:: javascript

   setExpanded callback @ 12(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``onClick callback @ 12``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/images/ImageGallery.jsx:1173:1353:FUNCTION

.. rubric:: ``slides.map callback @ 17``

.. code-block:: javascript

   slides.map callback @ 17(image, index)

作为 ``slides.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``17``—``18`` 行；所属函数 ``ImageGallery``。

**参数**

``image``
   调用方传入的 ``image`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
