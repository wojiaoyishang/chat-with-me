src/components/ui/dropdown-menu 模块
================================================================================

.. js:module:: src/components/ui/dropdown-menu

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/dropdown-menu.tsx``
* **模块标识**：``src/components/ui/dropdown-menu``
* **顶层函数/组件/Hook**：15
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@radix-ui/react-dropdown-menu``、``lucide-react``、``@/lib/utils``、``@/lib/windowLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:268:459:FUNCTION

.. js:function:: DropdownMenu({ ...props })

   渲染 ``DropdownMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``12`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Root>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DropdownMenuPrimitive.Root data-slot="dropdown-menu" modal={false} {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:459:663:FUNCTION

.. js:function:: DropdownMenuPortal({ ...props })

   渲染 ``DropdownMenuPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``20`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Portal>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:663:887:FUNCTION

.. js:function:: DropdownMenuTrigger({ ...props })

   渲染 ``DropdownMenuTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``31`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:887:2040:FUNCTION

.. js:function:: DropdownMenuContent({ className, style, sideOffset = 4, ...props })

   渲染 ``DropdownMenuContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``55`` 行。

   **参数**

   ``{ className, style, sideOffset = 4, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Content>``）
      调用方传入的 ``className, style, sideOffset = 4, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Portal> <DropdownMenuPrimitive.Content data-slot="dropdown-menu-content" sideOffset={sideOffset} className={cn( "bg-popover text-popover-foreground data-[…``。

   **主要协作调用**：``useWindowPopoverLayer``、``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:2040:2240:FUNCTION

.. js:function:: DropdownMenuGroup({ ...props })

   渲染 ``DropdownMenuGroup`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``63`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Group>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:2240:3327:FUNCTION

.. js:function:: DropdownMenuItem({ className, inset, variant = "default", ...props })

   渲染 ``DropdownMenuItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``65``—``86`` 行。

   **参数**

   ``{ className, inset, variant = "default", ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean variant?: "default" | "destructive" }``）
      调用方传入的 ``className, inset, variant = "default", ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Item data-slot="dropdown-menu-item" data-inset={inset} data-variant={variant} className={cn( "focus:bg-accent focus:text-accent-foreground data-[variant=d…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:3327:4338:FUNCTION

.. js:function:: DropdownMenuCheckboxItem({ className, children, checked, ...props })

   渲染 ``DropdownMenuCheckboxItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``112`` 行。

   **参数**

   ``{ className, children, checked, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>``）
      调用方传入的 ``className, children, checked, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn( "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-cente…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:4338:4575:FUNCTION

.. js:function:: DropdownMenuRadioGroup({ ...props })

   渲染 ``DropdownMenuRadioGroup`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``114``—``123`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:4575:5550:FUNCTION

.. js:function:: DropdownMenuRadioItem({ className, children, ...props })

   渲染 ``DropdownMenuRadioItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``147`` 行。

   **参数**

   ``{ className, children, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>``）
      调用方传入的 ``className, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn( "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:5550:5946:FUNCTION

.. js:function:: DropdownMenuLabel({ className, inset, ...props })

   渲染 ``DropdownMenuLabel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``149``—``167`` 行。

   **参数**

   ``{ className, inset, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }``）
      调用方传入的 ``className, inset, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Label data-slot="dropdown-menu-label" data-inset={inset} className={cn( "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:5946:6252:FUNCTION

.. js:function:: DropdownMenuSeparator({ className, ...props })

   渲染 ``DropdownMenuSeparator`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``169``—``180`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Separator>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("bg-border -mx-1 my-1 h-px", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:6252:6549:FUNCTION

.. js:function:: DropdownMenuShortcut({ className, ...props })

   渲染 ``DropdownMenuShortcut`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``182``—``196`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<"span">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span data-slot="dropdown-menu-shortcut" className={cn( "text-muted-foreground ml-auto text-xs tracking-widest", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:6549:6731:FUNCTION

.. js:function:: DropdownMenuSub({ ...props })

   渲染 ``DropdownMenuSub`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``198``—``202`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Sub>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:6731:7443:FUNCTION

.. js:function:: DropdownMenuSubTrigger({ className, inset, children, ...props })

   渲染 ``DropdownMenuSubTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``204``—``226`` 行。

   **参数**

   ``{ className, inset, children, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }``）
      调用方传入的 ``className, inset, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.SubTrigger data-slot="dropdown-menu-sub-trigger" data-inset={inset} className={cn( "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-acce…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:7443:8399:FUNCTION

.. js:function:: DropdownMenuSubContent({ className, style, ...props })

   渲染 ``DropdownMenuSubContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``228``—``246`` 行。

   **参数**

   ``{ className, style, ...props }`` （类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>``）
      调用方传入的 ``className, style, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.SubContent data-slot="dropdown-menu-sub-content" className={cn( "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:anima…``。

   **主要协作调用**：``useWindowPopoverLayer``、``cn``。
