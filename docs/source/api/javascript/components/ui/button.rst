src/components/ui/button 模块
================================================================================

.. js:module:: src/components/ui/button

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/button.tsx``
* **模块标识**：``src/components/ui/button``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@radix-ui/react-slot``、``class-variance-authority``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/button.tsx:1733:2106:FUNCTION

.. js:function:: Button({ className, variant, size, asChild = false, ...props })

   渲染 ``Button`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``58`` 行。

   **参数**

   ``{ className, variant, size, asChild = false, ...props }``（类型 ``React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }``）
      调用方传入的 ``className, variant, size, asChild = false, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} /> )``。

   **主要协作调用**：``cn``、``buttonVariants``。
