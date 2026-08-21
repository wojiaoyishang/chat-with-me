src/components/ui/popover 模块
============================

.. js:module:: src/components/ui/popover

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/ui/popover.tsx``
* **模块标识**：``src/components/ui/popover``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``react``、``@radix-ui/react-popover``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/ui/popover.tsx:124:280:FUNCTION

.. js:function:: Popover({ ...props })

   渲染 ``Popover`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``10`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof PopoverPrimitive.Root>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<PopoverPrimitive.Root data-slot="popover" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/popover.tsx:280:457:FUNCTION

.. js:function:: PopoverTrigger({ ...props })

   渲染 ``PopoverTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``16`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof PopoverPrimitive.Trigger>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/popover.tsx:457:1397:FUNCTION

.. js:function:: PopoverContent({ className, align = "center", sideOffset = 4, ...props })

   渲染 ``PopoverContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``38`` 行。

   **参数**

   ``{ className, align = "center", sideOffset = 4, ...props }``（类型 ``React.ComponentProps<typeof PopoverPrimitive.Content>``）
      调用方传入的 `` className, align = "center", sideOffset = 4, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <PopoverPrimitive.Portal> <PopoverPrimitive.Content data-slot="popover-content" align={align} sideOffset={sideOffset} className={cn( "bg-popover text-popover-foreground data-[st…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/popover.tsx:1397:1570:FUNCTION

.. js:function:: PopoverAnchor({ ...props })

   渲染 ``PopoverAnchor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``40``—``44`` 行。

   **参数**

   ``{ ...props }``（类型 ``React.ComponentProps<typeof PopoverPrimitive.Anchor>``）
      调用方传入的 `` ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />``。
