src/components/ui/sonner 模块
================================================================================

.. js:module:: src/components/ui/sonner

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/sonner.tsx``
* **模块标识**：``src/components/ui/sonner``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``next-themes``、``sonner``、``./spinner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/sonner.tsx:148:621:FUNCTION

.. js:function:: Toaster({ icons, ...props })

   渲染 ``Toaster`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``23`` 行。

   **参数**

   ``{ icons, ...props }`` （类型 ``ToasterProps``）
      调用方传入的 ``icons, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Sonner theme={theme as ToasterProps["theme"]} className="toaster group" icons={{ loading: <Spinner />, ...icons }} style={ { "--normal-bg": "var(--popover)", "--normal-text": "…``。

   **主要协作调用**：``useTheme``。
