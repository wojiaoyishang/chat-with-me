src/components/files/FileUploadProgress 模块
============================================================================================

.. js:module:: src/components/files/FileUploadProgress

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/files/FileUploadProgress.jsx``
* **模块标识**：``src/components/files/FileUploadProgress``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react-i18next``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/files/FileUploadProgress.jsx:98:2177:FUNCTION

.. js:function:: FileUploadProgress({ uploads = [] })

   渲染 ``FileUploadProgress`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``4``—``44`` 行。

   **参数**

   ``{ uploads = [] }``
      调用方传入的 ``uploads =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="max-h-36 space-y-2 overflow-auto" aria-live="polite"> {uploads.map((item) => ( <div key={item.id} className="rounded-lg border bg-background p-2 text-xs"> <div c…``。

   **主要协作调用**：``useTranslation``、``uploads.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/files/FileUploadProgress.jsx:353:2151:FUNCTION

.. rubric:: ``uploads.map callback @ 9``

.. code-block:: javascript

   uploads.map callback @ 9(item)

作为 ``uploads.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``9``—``41`` 行；所属函数 ``FileUploadProgress``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.round``、``t``、``(item.speed / 1024).toFixed``。
