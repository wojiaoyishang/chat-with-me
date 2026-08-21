src/components/ui/dialog 模块
===========================

.. js:module:: src/components/ui/dialog

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/ui/dialog.tsx``
* **模块标识**：``src/components/ui/dialog``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------

``react``、``lucide-react``、``radix-ui``、``@/lib/utils``、``@/components/ui/button``、``@/lib/browserHistoryLayers.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:270:1022:FUNCTION

.. js:function:: Dialog({ open, defaultOpen, onOpenChange, ...props })

   渲染 ``Dialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``37`` 行。

   **参数**

   ``{ open, defaultOpen, onOpenChange, ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Root>``）
      调用方传入的 `` open, defaultOpen, onOpenChange, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPrimitive.Root data-slot="dialog" open={actualOpen} onOpenChange={handleOpenChange} {...props} /> )``。

   **主要协作调用**：``React.useState``、``Boolean``、``React.useCallback``、``useBrowserBackLayer``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1022:1195:FUNCTION

.. js:function:: DialogTrigger({ ...props })

   渲染 ``DialogTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``43`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Trigger>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1195:1364:FUNCTION

.. js:function:: DialogPortal({ ...props })

   渲染 ``DialogPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``49`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Portal>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DialogPrimitive.Portal data-slot="dialog-portal" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1364:1529:FUNCTION

.. js:function:: DialogClose({ ...props })

   渲染 ``DialogClose`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``55`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Close>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DialogPrimitive.Close data-slot="dialog-close" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1529:1951:FUNCTION

.. js:function:: DialogOverlay({ className, ...props })

   渲染 ``DialogOverlay`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``71`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Overlay>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn( "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1951:3453:FUNCTION

.. js:function:: DialogContent({ className, children, showCloseButton = true, ...props })

   渲染 ``DialogContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``73``—``105`` 行。

   **参数**

   ``{ className, children, showCloseButton = true, ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }``）
      调用方传入的 `` className, children, showCloseButton = true, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPortal data-slot="dialog-portal"> <DialogOverlay /> <DialogPrimitive.Content data-slot="dialog-content" className={cn( "bg-background data-[state=open]:animate-in data-[s…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:3453:3694:FUNCTION

.. js:function:: DialogHeader({ className, ...props })

   渲染 ``DialogHeader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``115`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="dialog-header" className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:3694:4234:FUNCTION

.. js:function:: DialogFooter({ className, showCloseButton = false, children, ...props })

   渲染 ``DialogFooter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``142`` 行。

   **参数**

   ``{ className, showCloseButton = false, children, ...props }``（类型 ``React.ComponentProps<"div"> & { showCloseButton?: boolean }``）
      调用方传入的 `` className, showCloseButton = false, children, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="dialog-footer" className={cn( "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className )} {...props} > {children} {showCloseButton && ( <DialogPrimiti…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:4234:4508:FUNCTION

.. js:function:: DialogTitle({ className, ...props })

   渲染 ``DialogTitle`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``144``—``155`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Title>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:4508:4801:FUNCTION

.. js:function:: DialogDescription({ className, ...props })

   渲染 ``DialogDescription`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``157``—``168`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof DialogPrimitive.Description>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-muted-foreground text-sm", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:624:728:FUNCTION

.. rubric:: ``React.useCallback callback @ 19``

.. code-block:: javascript

   React.useCallback callback @ 19(nextOpen)

实现 ``React.useCallback`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``22`` 行；所属函数 ``Dialog``。

**参数**

``nextOpen``（类型 ``boolean``）
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInternalOpen``、``onOpenChange``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:792:848:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 24``

.. code-block:: javascript

   useBrowserBackLayer callback @ 24()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``27`` 行；所属函数 ``Dialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleOpenChange``。
