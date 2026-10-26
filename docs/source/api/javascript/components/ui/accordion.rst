src/components/ui/accordion 模块
================================================================================

.. js:module:: src/components/ui/accordion

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/accordion.tsx``
* **模块标识**：``src/components/ui/accordion``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``radix-ui``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/accordion.tsx:174:339:FUNCTION

.. js:function:: Accordion({ ...props })

   渲染 ``Accordion`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``11`` 行。

   **参数**

   ``{ ...props }`` （类型 ``React.ComponentProps<typeof AccordionPrimitive.Root>``）
      调用方传入的 ``...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<AccordionPrimitive.Root data-slot="accordion" {...props} />``。

.. CWM-AST-FUNCTION src/components/ui/accordion.tsx:339:612:FUNCTION

.. js:function:: AccordionItem({ className, ...props })

   渲染 ``AccordionItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``24`` 行。

   **参数**

   ``{ className, ...props }`` （类型 ``React.ComponentProps<typeof AccordionPrimitive.Item>``）
      调用方传入的 ``className, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b last:border-b-0", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/accordion.tsx:612:1477:FUNCTION

.. js:function:: AccordionTrigger({ className, children, ...props })

   渲染 ``AccordionTrigger`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``46`` 行。

   **参数**

   ``{ className, children, ...props }`` （类型 ``React.ComponentProps<typeof AccordionPrimitive.Trigger>``）
      调用方传入的 ``className, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AccordionPrimitive.Header className="flex"> <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn( "focus-visible:border-ring focus-visible:ring-ring/50 flex…``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/accordion.tsx:1477:1856:FUNCTION

.. js:function:: AccordionContent({ className, children, ...props })

   渲染 ``AccordionContent`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``48``—``62`` 行。

   **参数**

   ``{ className, children, ...props }`` （类型 ``React.ComponentProps<typeof AccordionPrimitive.Content>``）
      调用方传入的 ``className, children, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AccordionPrimitive.Content data-slot="accordion-content" className="overflow-hidden text-sm" {...props} > <div className={cn("pt-0 pb-4", className)}>{children}</div> </Accordi…``。

   **主要协作调用**：``cn``。
