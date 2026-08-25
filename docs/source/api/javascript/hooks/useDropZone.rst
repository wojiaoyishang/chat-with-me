src/hooks/useDropZone 模块
================================================================================

.. js:module:: src/hooks/useDropZone

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/hooks/useDropZone.jsx``
* **模块标识**：``src/hooks/useDropZone``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:111:1996:FUNCTION

.. js:function:: useDropZone(onDrop, onFolderDetected)

   封装 ``useDropZone`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``4``—``71`` 行。

   **参数**

   ``onDrop``
      调用方提供的事件回调。

   ``onFolderDetected``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ isDraggingOver, dragEvents: { onDragEnter: handleDragEnter, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, }, }``。

   **主要协作调用**：``useState``、``useRef``、``useCallback``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:315:389:FUNCTION

.. rubric:: ``useCallback callback @ 8``

.. code-block:: javascript

   useCallback callback @ 8(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``8``—``11`` 行；所属函数 ``useDropZone``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``、``e.stopPropagation``。

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:439:905:FUNCTION

.. rubric:: ``useCallback callback @ 14``

.. code-block:: javascript

   useCallback callback @ 14(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``29`` 行；所属函数 ``useDropZone``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``preventDefault``、``hasFolderInDragItems``、``setIsDraggingOver``、``onFolderDetected``、``Array.from(e.dataTransfer.items).some``、``Array.from``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:786:834:FUNCTION

.. rubric:: ``Array.from(e.dataTransfer.items).some callback @ 25``

.. code-block:: javascript

   Array.from(e.dataTransfer.items).some callback @ 25(item)

作为 ``Array.from(e.dataTransfer.items).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``useCallback callback @ 14``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:1001:1044:FUNCTION

.. rubric:: ``useCallback callback @ 33``

.. code-block:: javascript

   useCallback callback @ 33(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``33``—``35`` 行；所属函数 ``useDropZone``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``preventDefault``。

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:1108:1278:FUNCTION

.. rubric:: ``useCallback callback @ 37``

.. code-block:: javascript

   useCallback callback @ 37(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``43`` 行；所属函数 ``useDropZone``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``preventDefault``、``setIsDraggingOver``。

.. CWM-AST-FUNCTION src/hooks/useDropZone.jsx:1337:1688:FUNCTION

.. rubric:: ``useCallback callback @ 46``

.. code-block:: javascript

   useCallback callback @ 46(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``46``—``58`` 行；所属函数 ``useDropZone``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``preventDefault``、``setIsDraggingOver``、``hasFolderInDragItems``、``onFolderDetected``、``onDrop``。
