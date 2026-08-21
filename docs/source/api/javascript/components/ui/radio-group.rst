src/components/ui/radio-group 模块
================================

.. js:module:: src/components/ui/radio-group

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/ui/radio-group.tsx``
* **模块标识**：``src/components/ui/radio-group``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``react``、``lucide-react``、``radix-ui``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/ui/radio-group.tsx:167:421:FUNCTION

.. js:function:: RadioGroup({ className, ...props })

   渲染 ``RadioGroup`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``18`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof RadioGroupPrimitive.Root>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} /> )``。

   **主要协作调用**：``cn``。

.. CWM-AST-FUNCTION src/components/ui/radio-group.tsx:421:1406:FUNCTION

.. js:function:: RadioGroupItem({ className, ...props })

   渲染 ``RadioGroupItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``41`` 行。

   **参数**

   ``{ className, ...props }``（类型 ``React.ComponentProps<typeof RadioGroupPrimitive.Item>``）
      调用方传入的 `` className, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <RadioGroupPrimitive.Item data-slot="radio-group-item" className={cn( "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructi…``。

   **主要协作调用**：``cn``。
