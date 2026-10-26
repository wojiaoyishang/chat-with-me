src/components/markdown/ResourceImage 模块
========================================================================================

.. js:module:: src/components/markdown/ResourceImage

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/ResourceImage.jsx``
* **模块标识**：``src/components/markdown/ResourceImage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``lucide-react``、``@/features/images/useImageViewer.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:193:1754:FUNCTION

.. js:function:: ResourceImage({ src, alt, galleryId, ...props })

   渲染 ``ResourceImage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``6``—``36`` 行。

   **参数**

   ``{ src, alt, galleryId, ...props }``
      调用方传入的 ``src, alt, galleryId, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span role="status" className="inline-flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground" > <ImageOff className="size-4" /> {t('resour…``、``<img {...props} src={src} alt={alt} onError={() => setFailed(true)} data-image-viewer data-image-gallery={galleryId} role="button" tabIndex={0} aria-label={alt || '查看图片'} classNam…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useTranslation``、``t``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:782:1364:FUNCTION

.. rubric:: ``open``

.. code-block:: javascript

   open(event)

打开与 ``open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``21``—``29`` 行；所属函数 ``ResourceImage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``[...document.querySelectorAll('img[data-image-viewer]')].filter``、``document.querySelectorAll``、``event.currentTarget.closest('.cwm-image-gallery')?.querySelectorAll``、``event.currentTarget.closest``、``peers.map``、``openImageViewer``、``Math.max``、``peers.indexOf``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:971:1026:FUNCTION

.. rubric:: ``[...document.querySelectorAll('img[data-image-viewer]')].filter callback @ 25``

.. code-block:: javascript

   [...document.querySelectorAll('img[data-image-viewer]')].filter callback @ 25(img)

作为 ``[...document.querySelectorAll('img[data-image-viewer]')].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``open``。

**参数**

``img``
   调用方传入的 ``img`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:1198:1257:FUNCTION

.. rubric:: ``peers.map callback @ 27``

.. code-block:: javascript

   peers.map callback @ 27(img)

作为 ``peers.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``open``。

**参数**

``img``
   调用方传入的 ``img`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:1422:1443:FUNCTION

.. rubric:: ``onError callback @ 30``

.. code-block:: javascript

   onError callback @ 30()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``ResourceImage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:1652:1747:FUNCTION

.. rubric:: ``onKeyDown callback @ 33``

.. code-block:: javascript

   onKeyDown callback @ 33(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``33``—``35`` 行；所属函数 ``ResourceImage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``open``。
