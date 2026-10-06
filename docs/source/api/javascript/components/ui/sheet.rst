src/components/ui/sheet 模块
================================================================================

.. js:module:: src/components/ui/sheet

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/sheet.jsx``
* **模块标识**：``src/components/ui/sheet``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``./dialog``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/sheet.jsx:289:822:FUNCTION

.. js:function:: SheetContent({ className, ...props })

   渲染 ``SheetContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``18`` 行。

   **参数**

   ``{ className, ...props }``
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogContent {...props} overlayClassName="z-[100099]" className={cn( 'fixed left-auto right-0 top-0 h-dvh w-full max-w-none translate-x-0 translate-y-0 rounded-none border-y-0…``。

   **主要协作调用**：``cn``。
