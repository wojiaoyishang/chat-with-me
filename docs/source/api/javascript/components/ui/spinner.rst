src/components/ui/spinner 模块
================================================================================

.. js:module:: src/components/ui/spinner

Continuous activity remains visible even when decorative motion is reduced.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/spinner.tsx``
* **模块标识**：``src/components/ui/spinner``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/spinner.tsx:120:453:FUNCTION

.. js:function:: Spinner({ className, ...props })

   Continuous activity remains visible even when decorative motion is reduced.

   **性质**：同步函数；模块内部入口；源码第 ``6``—``15`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``ComponentProps<"svg">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <LoaderCircle aria-hidden="true" data-slot="spinner" className={cn("cwm-activity-spinner size-4 shrink-0", className)} {...props} /> )``。

   **主要协作调用**：``cn``。
