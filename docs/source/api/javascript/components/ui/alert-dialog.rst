src/components/ui/alert-dialog 模块
================================================================================

.. js:module:: src/components/ui/alert-dialog

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/alert-dialog.tsx``
* **模块标识**：``src/components/ui/alert-dialog``
* **顶层函数/组件/Hook**：12
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``radix-ui``、``@/lib/utils``、``@/components/ui/button``、``@/lib/browserHistoryLayers.js``、``@/lib/windowLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:318:1223:FUNCTION

.. js:function:: AlertDialog({ open, defaultOpen, onOpenChange, ...props })

   渲染 ``AlertDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``40`` 行。

   **参数**

   ``{ open, defaultOpen, onOpenChange, ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Root>``）
      调用方传入的 ``open, defaultOpen, onOpenChange, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WindowLayerContext.Provider value={layer}> <AlertDialogPrimitive.Root data-slot="alert-dialog" open={actualOpen} onOpenChange={handleOpenChange} {...props} /> </WindowLayerCont…``。

   **主要协作调用**：``React.useState``、``Boolean``、``useWindowLayer``、``React.useCallback``、``useBrowserBackLayer``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:1223:1427:FUNCTION

.. js:function:: AlertDialogTrigger({ ...props })

   渲染 ``AlertDialogTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``48`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Trigger>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:1427:1627:FUNCTION

.. js:function:: AlertDialogPortal({ ...props })

   渲染 ``AlertDialogPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``56`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Portal>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} /> )``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:1627:2252:FUNCTION

.. js:function:: AlertDialogOverlay({ className, style, ...props })

   渲染 ``AlertDialogOverlay`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``76`` 行。

   **参数**

   ``{ className, style, ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Overlay>``）
      调用方传入的 ``className, style, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" className={cn( "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[…``。

   **主要协作调用**：``React.useContext``、``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:2252:3417:FUNCTION

.. js:function:: AlertDialogContent({ className, style, onPointerDownCapture, size = "default", ...props })

   渲染 ``AlertDialogContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``78``—``105`` 行。

   **参数**

   ``{ className, style, onPointerDownCapture, size = "default", ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Content> & { size?: "default" | "sm" }``）
      调用方传入的 ``className, style, onPointerDownCapture, size = "default", ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialogPortal> <AlertDialogOverlay /> <AlertDialogPrimitive.Content data-slot="alert-dialog-content" data-size={size} className={cn( "bg-background data-[state=open]:animat…``。

   **主要协作调用**：``React.useContext``、``cn``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:3417:4055:FUNCTION

.. js:function:: AlertDialogHeader({ className, ...props })

   渲染 ``AlertDialogHeader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``121`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="alert-dialog-header" className={cn( "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:4055:4446:FUNCTION

.. js:function:: AlertDialogFooter({ className, ...props })

   渲染 ``AlertDialogFooter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``123``—``137`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="alert-dialog-footer" className={cn( "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-co…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:4446:4876:FUNCTION

.. js:function:: AlertDialogTitle({ className, ...props })

   渲染 ``AlertDialogTitle`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``139``—``153`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Title>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn( "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dia…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:4876:5190:FUNCTION

.. js:function:: AlertDialogDescription({ className, ...props })

   渲染 ``AlertDialogDescription`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``155``—``166`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Description>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn("text-muted-foreground text-sm", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:5190:5594:FUNCTION

.. js:function:: AlertDialogMedia({ className, ...props })

   渲染 ``AlertDialogMedia`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``168``—``182`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="alert-dialog-media" className={cn( "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:ro…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:5594:6039:FUNCTION

.. js:function:: AlertDialogAction({ className, variant = "default", size = "default", ...props })

   渲染 ``AlertDialogAction`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``184``—``200`` 行。

   **参数**

   ``{ className, variant = "default", size = "default", ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Action> & Pick<React.ComponentProps<typeof Button>, "variant" | "size">``）
      调用方传入的 ``className, variant = "default", size = "default", ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant={variant} size={size} asChild> <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(className)} {...props} /> </Button> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:6039:6484:FUNCTION

.. js:function:: AlertDialogCancel({ className, variant = "outline", size = "default", ...props })

   渲染 ``AlertDialogCancel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``202``—``218`` 行。

   **参数**

   ``{ className, variant = "outline", size = "default", ...props }`` （类型 ``React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & Pick<React.ComponentProps<typeof Button>, "variant" | "size">``）
      调用方传入的 ``className, variant = "outline", size = "default", ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button variant={variant} size={size} asChild> <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(className)} {...props} /> </Button> )``。

   **主要协作调用**：``cn``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:725:829:FUNCTION

.. rubric:: ``React.useCallback callback @ 20``

.. code-block:: javascript

   React.useCallback callback @ 20(nextOpen)

实现 ``React.useCallback`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``23`` 行；所属函数 ``AlertDialog``。

**参数**

``nextOpen`` （类型 ``boolean``）
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInternalOpen``、``onOpenChange``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:893:949:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 25``

.. code-block:: javascript

   useBrowserBackLayer callback @ 25()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``25``—``28`` 行；所属函数 ``AlertDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleOpenChange``。

.. CWM-AST-FUNCTION src/components/ui/alert-dialog.tsx:3315:3376:FUNCTION

.. rubric:: ``onPointerDownCapture callback @ 101``

.. code-block:: javascript

   onPointerDownCapture callback @ 101(event)

处理 ``Pointer Down Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``AlertDialogContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``layer?.activate``、``onPointerDownCapture``。
