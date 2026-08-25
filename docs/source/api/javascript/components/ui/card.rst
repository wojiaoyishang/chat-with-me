src/components/ui/card 模块
================================================================================

.. js:module:: src/components/ui/card

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/card.tsx``
* **模块标识**：``src/components/ui/card``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/card.tsx:64:349:FUNCTION

.. js:function:: Card({ className, ...props })

   渲染 ``Card`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``16`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card" className={cn( "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/card.tsx:349:718:FUNCTION

.. js:function:: CardHeader({ className, ...props })

   渲染 ``CardHeader`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``29`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card-header" className={cn( "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_au…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/card.tsx:718:935:FUNCTION

.. js:function:: CardTitle({ className, ...props })

   渲染 ``CardTitle`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``39`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/card.tsx:935:1167:FUNCTION

.. js:function:: CardDescription({ className, ...props })

   渲染 ``CardDescription`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``41``—``49`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/card.tsx:1167:1446:FUNCTION

.. js:function:: CardAction({ className, ...props })

   渲染 ``CardAction`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``62`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card-action" className={cn( "col-start-2 row-span-2 row-start-1 self-start justify-self-end", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/card.tsx:1446:1645:FUNCTION

.. js:function:: CardContent({ className, ...props })

   渲染 ``CardContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``72`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card-content" className={cn("px-6", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/card.tsx:1645:1877:FUNCTION

.. js:function:: CardFooter({ className, ...props })

   渲染 ``CardFooter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``74``—``82`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<"div">``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} /> )``。

   **主要协作调用**：``cn``。
