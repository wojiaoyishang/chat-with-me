src/components/ui/progress 模块
================================================================================

.. js:module:: src/components/ui/progress

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/progress.tsx``
* **模块标识**：``src/components/ui/progress``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@radix-ui/react-progress``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/progress.tsx:126:704:FUNCTION

.. js:function:: Progress({ className, value, ...props })

   渲染 ``Progress`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``27`` 行。

   **参数**

   ``{ className, value, ...props }``（类型 ``React.ComponentProps<typeof ProgressPrimitive.Root>``）
      调用方传入的 ``className, value, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ProgressPrimitive.Root data-slot="progress" className={cn( "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className )} {...props} > <ProgressPrimitive.Indica…``。

   **主要协作调用**：``cn``。
