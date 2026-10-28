src/components/ui/dialog 模块
================================================================================

.. js:module:: src/components/ui/dialog

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/dialog.tsx``
* **模块标识**：``src/components/ui/dialog``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``radix-ui``、``@/lib/utils``、``@/components/ui/button``、``@/lib/browserHistoryLayers.js``、``@/lib/windowLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:412:1574:FUNCTION

.. js:function:: Dialog({ open, defaultOpen, onOpenChange, modal = true, closeOnBack = true, lockInteraction = false, ...pr…)

   渲染 ``Dialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``47`` 行。

   **参数**

   ``{ open, defaultOpen, onOpenChange, modal = true, closeOnBack = true, lockInteraction = false, ...pr…`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Root> & { closeOnBack?: boolean; lockInteraction?: boolean }``）
      调用方传入的 ``open, defaultOpen, onOpenChange, modal = true, closeOnBack = true, lockInteraction = false, ...pr…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WindowLayerContext.Provider value={windowContext}> <DialogPrimitive.Root data-slot="dialog" open={actualOpen} onOpenChange={handleOpenChange} {...props} modal={lockInteraction}…``。

   **主要协作调用**：``React.useState``、``Boolean``、``useWindowLayer``、``React.useMemo``、``React.useCallback``、``useBrowserBackLayer``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1574:1747:FUNCTION

.. js:function:: DialogTrigger({ ...props })

   渲染 ``DialogTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``53`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Trigger>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1747:1916:FUNCTION

.. js:function:: DialogPortal({ ...props })

   渲染 ``DialogPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``59`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Portal>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DialogPrimitive.Portal data-slot="dialog-portal" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1916:2081:FUNCTION

.. js:function:: DialogClose({ ...props })

   渲染 ``DialogClose`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``65`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Close>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<DialogPrimitive.Close data-slot="dialog-close" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:2081:2789:FUNCTION

.. js:function:: DialogOverlay({ className, style, ...props })

   渲染 ``DialogOverlay`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``87`` 行。

   **参数**

   ``{ className, style, ...props }`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Overlay>``）
      调用方传入的 ``className, style, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div {...props} aria-hidden="true" data-state={layer?.active ? "open" : "closed"} data-window-layer={layer.id} data-slot="dialog-overlay" className={cn( "data-[state=open]:anima…``。

   **主要协作调用**：``React.useContext``、``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:2789:6015:FUNCTION

.. js:function:: DialogContent({ className, children, showCloseButton = true, overlayClassName, overlayStyle, style, onPointerDown…)

   渲染 ``DialogContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``89``—``167`` 行。

   **参数**

   ``{ className, children, showCloseButton = true, overlayClassName, overlayStyle, style, onPointerDown…`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean overlayClassName?: string overlayStyle?: React.CSSProperties }``）
      调用方传入的 ``className, children, showCloseButton = true, overlayClassName, overlayStyle, style, onPointerDown…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPortal data-slot="dialog-portal"> {layer?.backdrop && <DialogOverlay className={overlayClassName} style={overlayStyle} />} <DialogPrimitive.Content data-slot="dialog-cont…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``React.useContext``、``cn``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:6015:6256:FUNCTION

.. js:function:: DialogHeader({ className, ...props })

   渲染 ``DialogHeader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``169``—``177`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="dialog-header" className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:6256:6796:FUNCTION

.. js:function:: DialogFooter({ className, showCloseButton = false, children, ...props })

   渲染 ``DialogFooter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``179``—``204`` 行。

   **参数**

   ``{ className, showCloseButton = false, children, ...props }`` （类型 ``React.ComponentProps<"div"> & { showCloseButton?: boolean }``）
      调用方传入的 ``className, showCloseButton = false, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="dialog-footer" className={cn( "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className )} {...props} > {children} {showCloseButton && ( <DialogPrimiti…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:6796:7070:FUNCTION

.. js:function:: DialogTitle({ className, ...props })

   渲染 ``DialogTitle`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``206``—``217`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Title>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:7070:7363:FUNCTION

.. js:function:: DialogDescription({ className, ...props })

   渲染 ``DialogDescription`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``219``—``230`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<typeof DialogPrimitive.Description>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-muted-foreground text-sm", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:921:956:FUNCTION

.. rubric:: ``React.useMemo callback @ 23``

.. code-block:: javascript

   React.useMemo callback @ 23()

实现 ``React.useMemo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``Dialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1020:1124:FUNCTION

.. rubric:: ``React.useCallback callback @ 25``

.. code-block:: javascript

   React.useCallback callback @ 25(nextOpen)

实现 ``React.useCallback`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``28`` 行；所属函数 ``Dialog``。

**参数**

``nextOpen`` （类型 ``boolean``）
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInternalOpen``、``onOpenChange``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:1188:1279:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 30``

.. code-block:: javascript

   useBrowserBackLayer callback @ 30()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``34`` 行；所属函数 ``Dialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``handleOpenChange``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:4086:4176:FUNCTION

.. rubric:: ``onPointerDownCapture callback @ 120``

.. code-block:: javascript

   onPointerDownCapture callback @ 120(event)

处理 ``Pointer Down Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``123`` 行；所属函数 ``DialogContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``layer?.activate``、``onPointerDownCapture``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:4205:4517:FUNCTION

.. rubric:: ``onInteractOutside callback @ 124``

.. code-block:: javascript

   onInteractOutside callback @ 124(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``131`` 行；所属函数 ``DialogContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isOwnedWindowPopoverTarget``、``event.preventDefault``、``onInteractOutside``、``isTopWindowLayer``、``isOtherWindowTarget``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:4549:4747:FUNCTION

.. rubric:: ``onPointerDownOutside callback @ 132``

.. code-block:: javascript

   onPointerDownOutside callback @ 132(event)

处理 ``Pointer Down Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``132``—``138`` 行；所属函数 ``DialogContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isOwnedWindowPopoverTarget``、``event.preventDefault``、``onPointerDownOutside``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:4773:5024:FUNCTION

.. rubric:: ``onFocusOutside callback @ 139``

.. code-block:: javascript

   onFocusOutside callback @ 139(event)

处理 ``Focus Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``139``—``144`` 行；所属函数 ``DialogContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event.preventDefault``、``onFocusOutside``。

.. CWM-AST-FUNCTION src/components/ui/dialog.tsx:5051:5319:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 145``

.. code-block:: javascript

   onEscapeKeyDown callback @ 145(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``145``—``152`` 行；所属函数 ``DialogContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isOwnedWindowPopoverTarget``、``event.preventDefault``、``onEscapeKeyDown``、``isTopWindowLayer``。
