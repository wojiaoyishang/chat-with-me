src/context/MyToaster 模块
================================================================================

.. js:module:: src/context/MyToaster

该模块提供跨页面运行时 Context、事件分发或全局状态。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/context/MyToaster.jsx``
* **模块标识**：``src/context/MyToaster``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/ui/sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/MyToaster.jsx:93:904:FUNCTION

.. js:function:: MyToaster()

   渲染 ``MyToaster`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``32`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <Toaster richColors position="top-center" toastOptions={{closeButton: true}} /> <Toaster id="notifications-desktop" position="bottom-right" visibleToasts={5} toastOptions={{c…``。
