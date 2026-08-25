src/components/ui/tooltip 模块
================================================================================

.. js:module:: src/components/ui/tooltip

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/tooltip.tsx``
* **模块标识**：``src/components/ui/tooltip``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@radix-ui/react-tooltip``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/tooltip.tsx:124:388:FUNCTION

.. js:function:: TooltipProvider({ delayDuration = 0, ...props })

   渲染 ``TooltipProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``17`` 行。

   **参数**

   ``{ delayDuration = 0, ...props }``（类型 ``React.ComponentProps<typeof TooltipPrimitive.Provider>``）
      调用方传入的 ``delayDuration = 0, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/tooltip.tsx:388:601:FUNCTION

.. js:function:: Tooltip({ ...props })

   渲染 ``Tooltip`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``27`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof TooltipPrimitive.Root>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <TooltipProvider> <TooltipPrimitive.Root data-slot="tooltip" {...props} /> </TooltipProvider> )``。

.. CWM-AST-FUNCTION src/components/ui/tooltip.tsx:601:778:FUNCTION

.. js:function:: TooltipTrigger({ ...props })

   渲染 ``TooltipTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``33`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof TooltipPrimitive.Trigger>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/tooltip.tsx:778:1808:FUNCTION

.. js:function:: TooltipContent({ className, sideOffset = 0, children, ...props })

   渲染 ``TooltipContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``57`` 行。

   **参数**

   ``{ className, sideOffset = 0, children, ...props }``（类型 ``React.ComponentProps<typeof TooltipPrimitive.Content>``）
      调用方传入的 ``className, sideOffset = 0, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <TooltipPrimitive.Portal> <TooltipPrimitive.Content data-slot="tooltip-content" sideOffset={sideOffset} className={cn( "bg-foreground text-background animate-in fade-in-0 zoom-i…``。

   **主要协作调用**：``cn``。
