src/components/ui/ThreeDotLoading 模块
================================================================================

.. js:module:: src/components/ui/ThreeDotLoading

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/ThreeDotLoading.jsx``
* **模块标识**：``src/components/ui/ThreeDotLoading``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/ThreeDotLoading.jsx:0:617:FUNCTION

.. js:function:: ThreeDotLoading({ size = 8, color = '#4f46e5' })

   渲染 ``ThreeDotLoading`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``1``—``9`` 行。

   **参数**

   ``{ size = 8, color = '#4f46e5' }``
      调用方传入的 ``size = 8, color = '#4f46e5'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex justify-center items-center space-x-1 p-3"> <div className="rounded-full animate-pulse" style={{ width: \x60${size}px\x60, height: \x60${size}px\x60, backgroundColor: c…``。
