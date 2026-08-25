src/components/ui/checkbox 模块
================================================================================

.. js:module:: src/components/ui/checkbox

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/checkbox.tsx``
* **模块标识**：``src/components/ui/checkbox``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``radix-ui``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/checkbox.tsx:162:1178:FUNCTION

.. js:function:: Checkbox({ className, ...props })

   渲染 ``Checkbox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``28`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof CheckboxPrimitive.Root>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <CheckboxPrimitive.Root data-slot="checkbox" className={cn( "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark…``。

   **主要协作调用**：``cn``。
