src/components/ui/select 模块
===========================

.. js:module:: src/components/ui/select

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/ui/select.tsx``
* **模块标识**：``src/components/ui/select``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``react``、``lucide-react``、``radix-ui``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/ui/select.tsx:190:342:FUNCTION

.. js:function:: Select({ ...props })

   渲染 ``Select`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``11`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Root>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SelectPrimitive.Root data-slot="select" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:342:507:FUNCTION

.. js:function:: SelectGroup({ ...props })

   渲染 ``SelectGroup`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``17`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Group>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SelectPrimitive.Group data-slot="select-group" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:507:672:FUNCTION

.. js:function:: SelectValue({ ...props })

   渲染 ``SelectValue`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``23`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Value>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SelectPrimitive.Value data-slot="select-value" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:672:2015:FUNCTION

.. js:function:: SelectTrigger({ className, size = "default", children, ...props })

   渲染 ``SelectTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``49`` 行。

   **参数**

   ``{ className, size = "default", children, ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: "sm" \| "default" }``）
      调用方传入的 `` className, size = "default", children, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.Trigger data-slot="select-trigger" data-size={size} className={cn( "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-mut…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:2015:3631:FUNCTION

.. js:function:: SelectContent({ className, children, position = "popper", align = "start", ...props })

   渲染 ``SelectContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``86`` 行。

   **参数**

   ``{ className, children, position = "popper", align = "start", ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Content>``）
      调用方传入的 `` className, children, position = "popper", align = "start", ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.Portal> <SelectPrimitive.Content data-slot="select-content" className={cn( "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:3631:3912:FUNCTION

.. js:function:: SelectLabel({ className, ...props })

   渲染 ``SelectLabel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``99`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Label>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.Label data-slot="select-label" className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:3912:4928:FUNCTION

.. js:function:: SelectItem({ className, children, ...props })

   渲染 ``SelectItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``101``—``123`` 行。

   **参数**

   ``{ className, children, ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Item>``）
      调用方传入的 `` className, children, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.Item data-slot="select-item" className={cn( "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-fu…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:4928:5229:FUNCTION

.. js:function:: SelectSeparator({ className, ...props })

   渲染 ``SelectSeparator`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``136`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.Separator>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.Separator data-slot="select-separator" className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:5229:5639:FUNCTION

.. js:function:: SelectScrollUpButton({ className, ...props })

   渲染 ``SelectScrollUpButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``138``—``151`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.ScrollUpButton data-slot="select-scroll-up-button" className={cn("flex cursor-default items-center justify-center py-1", className)} {...props} > <ChevronUpIcon…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/select.tsx:5639:6061:FUNCTION

.. js:function:: SelectScrollDownButton({ className, ...props })

   渲染 ``SelectScrollDownButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``153``—``166`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SelectPrimitive.ScrollDownButton data-slot="select-scroll-down-button" className={cn("flex cursor-default items-center justify-center py-1", className)} {...props} > <ChevronDo…``。

   **主要协作调用**：``cn``。
