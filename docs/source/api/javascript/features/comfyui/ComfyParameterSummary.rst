src/features/comfyui/ComfyParameterSummary 模块
==================================================================================================

.. js:module:: src/features/comfyui/ComfyParameterSummary

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/ComfyParameterSummary.jsx``
* **模块标识**：``src/features/comfyui/ComfyParameterSummary``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/badge``、``@/components/ui/button``、``./graphModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/ComfyParameterSummary.jsx:210:1793:FUNCTION

.. js:function:: ComfyParameterSummary({ bindings, onLocate })

   渲染 ``ComfyParameterSummary`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``6``—``51`` 行。

   **参数**

   ``{ bindings, onLocate }``
      调用方传入的 ``bindings, onLocate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="comfy-parameter-summary"> <strong>已开放的参数</strong> {inputs.length ? ( inputs.map((binding) => ( <div key={binding.name} className="comfy-parameter"> <div> <span>{…``。

   **主要协作调用**：``logicalInputs``、``inputs.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyParameterSummary.jsx:457:1593:FUNCTION

.. rubric:: ``inputs.map callback @ 12``

.. code-block:: javascript

   inputs.map callback @ 12(binding)

作为 ``inputs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``12``—``42`` 行；所属函数 ``ComfyParameterSummary``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``INPUT_KINDS.find``、``binding.targets.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyParameterSummary.jsx:945:982:FUNCTION

.. rubric:: ``INPUT_KINDS.find callback @ 24``

.. code-block:: javascript

   INPUT_KINDS.find callback @ 24(kind)

作为 ``INPUT_KINDS.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``inputs.map callback @ 12``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyParameterSummary.jsx:1131:1545:FUNCTION

.. rubric:: ``binding.targets.map callback @ 28``

.. code-block:: javascript

   binding.targets.map callback @ 28(target)

作为 ``binding.targets.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``28``—``39`` 行；所属函数 ``inputs.map callback @ 12``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyParameterSummary.jsx:1349:1378:FUNCTION

.. rubric:: ``onClick callback @ 34``

.. code-block:: javascript

   onClick callback @ 34()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``binding.targets.map callback @ 28``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLocate``。
