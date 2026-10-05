src/features/chat/ui/BuiltinSliderButton 模块
==============================================================================================

.. js:module:: src/features/chat/ui/BuiltinSliderButton

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/BuiltinSliderButton.jsx``
* **模块标识**：``src/features/chat/ui/BuiltinSliderButton``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react-i18next``、``@/components/ui/button``、``@/components/ui/slider``、``@/components/ui/popover``、``./builtinToolValue.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:295:3046:FUNCTION

.. js:function:: BuiltinSliderButton({ tool, value, onChange, icon })

   渲染 ``BuiltinSliderButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``59`` 行。

   **参数**

   ``{ tool, value, onChange, icon }``
      调用方传入的 ``tool, value, onChange, icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Popover> <PopoverTrigger asChild> <Button type="button" variant="ghost" disabled={tool.disabled} className="h-8 max-w-40 gap-1.5 rounded-full bg-muted px-2.5 text-xs" title={\x60$…``。

   **主要协作调用**：``useTranslation``、``normalizeBuiltinToolValue``、``items.findIndex``、``t``、``name``、``items.map``、``Math.max``、``items.at``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:573:597:FUNCTION

.. rubric:: ``items.findIndex callback @ 12``

.. code-block:: javascript

   items.findIndex callback @ 12(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:616:639:FUNCTION

.. rubric:: ``name``

.. code-block:: javascript

   name(item)

实现 ``name`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:1796:1941:FUNCTION

.. rubric:: ``items.map callback @ 37``

.. code-block:: javascript

   items.map callback @ 37(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``39`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:2676:2723:FUNCTION

.. rubric:: ``onValueChange callback @ 49``

.. code-block:: javascript

   onValueChange callback @ 49([number])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``[number]``
   调用方传入的 ``number`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。
