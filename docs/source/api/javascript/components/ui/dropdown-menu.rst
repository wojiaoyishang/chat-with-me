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

``react``、``@radix-ui/react-dropdown-menu``、``lucide-react``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:206:383:FUNCTION

.. js:function:: DropdownMenu({ ...props })

   渲染 ``DropdownMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``11`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Root>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:383:587:FUNCTION

.. js:function:: DropdownMenuPortal({ ...props })

   渲染 ``DropdownMenuPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``19`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Portal>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:587:811:FUNCTION

.. js:function:: DropdownMenuTrigger({ ...props })

   渲染 ``DropdownMenuTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``30`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:811:1828:FUNCTION

.. js:function:: DropdownMenuContent({ className, sideOffset = 4, ...props })

   渲染 ``DropdownMenuContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``50`` 行。

   **参数**

   ``{ className, sideOffset = 4, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Content>``）
      调用方传入的 ``className, sideOffset = 4, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Portal> <DropdownMenuPrimitive.Content data-slot="dropdown-menu-content" sideOffset={sideOffset} className={cn( "bg-popover text-popover-foreground data-[…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:1828:2028:FUNCTION

.. js:function:: DropdownMenuGroup({ ...props })

   渲染 ``DropdownMenuGroup`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``58`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Group>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:2028:3115:FUNCTION

.. js:function:: DropdownMenuItem({ className, inset, variant = "default", ...props })

   渲染 ``DropdownMenuItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``81`` 行。

   **参数**

   ``{ className, inset, variant = "default", ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean variant?: "default" | "destructive" }``）
      调用方传入的 ``className, inset, variant = "default", ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Item data-slot="dropdown-menu-item" data-inset={inset} data-variant={variant} className={cn( "focus:bg-accent focus:text-accent-foreground data-[variant=d…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:3115:4126:FUNCTION

.. js:function:: DropdownMenuCheckboxItem({ className, children, checked, ...props })

   渲染 ``DropdownMenuCheckboxItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``107`` 行。

   **参数**

   ``{ className, children, checked, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>``）
      调用方传入的 ``className, children, checked, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn( "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-cente…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:4126:4363:FUNCTION

.. js:function:: DropdownMenuRadioGroup({ ...props })

   渲染 ``DropdownMenuRadioGroup`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``109``—``118`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:4363:5338:FUNCTION

.. js:function:: DropdownMenuRadioItem({ className, children, ...props })

   渲染 ``DropdownMenuRadioItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``120``—``142`` 行。

   **参数**

   ``{ className, children, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>``）
      调用方传入的 ``className, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn( "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:5338:5734:FUNCTION

.. js:function:: DropdownMenuLabel({ className, inset, ...props })

   渲染 ``DropdownMenuLabel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``144``—``162`` 行。

   **参数**

   ``{ className, inset, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }``）
      调用方传入的 ``className, inset, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Label data-slot="dropdown-menu-label" data-inset={inset} className={cn( "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:5734:6040:FUNCTION

.. js:function:: DropdownMenuSeparator({ className, ...props })

   渲染 ``DropdownMenuSeparator`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``164``—``175`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Separator>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("bg-border -mx-1 my-1 h-px", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:6040:6337:FUNCTION

.. js:function:: DropdownMenuShortcut({ className, ...props })

   渲染 ``DropdownMenuShortcut`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``177``—``191`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"span">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span data-slot="dropdown-menu-shortcut" className={cn( "text-muted-foreground ml-auto text-xs tracking-widest", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:6337:6519:FUNCTION

.. js:function:: DropdownMenuSub({ ...props })

   渲染 ``DropdownMenuSub`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``193``—``197`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.Sub>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:6519:7231:FUNCTION

.. js:function:: DropdownMenuSubTrigger({ className, inset, children, ...props })

   渲染 ``DropdownMenuSubTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``199``—``221`` 行。

   **参数**

   ``{ className, inset, children, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }``）
      调用方传入的 ``className, inset, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.SubTrigger data-slot="dropdown-menu-sub-trigger" data-inset={inset} className={cn( "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-acce…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dropdown-menu.tsx:7231:8034:FUNCTION

.. js:function:: DropdownMenuSubContent({ className, ...props })

   渲染 ``DropdownMenuSubContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``223``—``237`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuPrimitive.SubContent data-slot="dropdown-menu-sub-content" className={cn( "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:anima…``。

   **主要协作调用**：``cn``。
