src/components/ui/slider 模块
===========================

.. js:module:: src/components/ui/slider

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/ui/slider.tsx``
* **模块标识**：``src/components/ui/slider``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------

``react``、``radix-ui``、``@/lib/utils``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/ui/slider.tsx:117:1957:FUNCTION

.. js:function:: Slider({ className, defaultValue, value, min = 0, max = 100, ...props })

   渲染 ``Slider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``59`` 行。

   **参数**

   ``{ className, defaultValue, value, min = 0, max = 100, ...props }``（类型 ``React.ComponentProps<typeof SliderPrimitive.Root>``）
      调用方传入的 `` className, defaultValue, value, min = 0, max = 100, ...props `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <SliderPrimitive.Root data-slot="slider" defaultValue={defaultValue} value={value} min={min} max={max} className={cn( "relative flex w-full touch-none items-center select-none d…``。

   **主要协作调用**：``React.useMemo``、``cn``、``Array.from``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/ui/slider.tsx:298:437:FUNCTION

.. rubric:: ``React.useMemo callback @ 15``

.. code-block:: javascript

   React.useMemo callback @ 15()

实现 ``React.useMemo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``20`` 行；所属函数 ``Slider``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/components/ui/slider.tsx:1545:1921:FUNCTION

.. rubric:: ``Array.from callback @ 50``

.. code-block:: javascript

   Array.from callback @ 50(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``56`` 行；所属函数 ``Slider``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
