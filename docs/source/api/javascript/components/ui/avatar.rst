src/components/ui/avatar 模块
================================================================================

.. js:module:: src/components/ui/avatar

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/avatar.tsx``
* **模块标识**：``src/components/ui/avatar``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@radix-ui/react-avatar``、``@/lib/utils``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/avatar.tsx:179:488:FUNCTION

.. js:function:: Avatar({ className, ...props })

   渲染 ``Avatar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``21`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof AvatarPrimitive.Root>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AvatarPrimitive.Root data-slot="avatar" className={cn( "relative flex size-8 shrink-0 overflow-hidden rounded-full", className )} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/avatar.tsx:488:873:FUNCTION

.. js:function:: AvatarImage({ className, src, ...props })

   渲染 ``AvatarImage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``37`` 行。

   **参数**

   ``{ className, src, ...props }``（类型 ``React.ComponentProps<typeof AvatarPrimitive.Image>``）
      调用方传入的 ``className, src, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} src={resolvedSrc || undefined} {...props} /> )``。

   **主要协作调用**：``resolveResourceUrl``、``cn``。

.. CWM-AST-FUNCTION src/components/ui/avatar.tsx:873:1213:FUNCTION

.. js:function:: AvatarFallback({ className, ...props })

   渲染 ``AvatarFallback`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``53`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof AvatarPrimitive.Fallback>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn( "bg-muted flex size-full items-center justify-center rounded-full", className )} {...props} /> )``。

   **主要协作调用**：``cn``。
