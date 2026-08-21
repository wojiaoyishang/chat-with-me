src/components/ui/input 模块
==========================

.. js:module:: src/components/ui/input

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/ui/input.tsx``
* **模块标识**：``src/components/ui/input``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``react``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/ui/input.tsx:64:943:FUNCTION

.. js:function:: Input({ className, type, ...props })

   渲染 ``Input`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``19`` 行。

   **参数**

   ``{ className, type, ...props }``（类型 ``React.ComponentProps<"input">``）
      调用方传入的 `` className, type, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <input type={type} data-slot="input" className={cn( "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/…``。

   **主要协作调用**：``cn``。
