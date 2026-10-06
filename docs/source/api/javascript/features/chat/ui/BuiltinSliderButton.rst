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
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``./BuiltinSliderButton.css``、``lucide-react``、``react-i18next``、``@/components/ui/button``、``@/components/ui/slider``、``@/components/ui/popover``、``./builtinToolValue.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:517:6787:FUNCTION

.. js:function:: BuiltinSliderButton({ tool, value, onChange, onCommit, compact = false, fixedWidth = false })

   渲染 ``BuiltinSliderButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``12``—``123`` 行。

   **参数**

   ``{ tool, value, onChange, onCommit, compact = false, fixedWidth = false }``
      调用方传入的 ``tool, value, onChange, onCommit, compact = false, fixedWidth = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Popover> <PopoverTrigger asChild> <Button type="button" variant="ghost" disabled={tool.disabled} className={\x60h-9 shrink-0 cursor-pointer gap-1.5 text-sm disabled:cursor-not-all…``。

   **主要协作调用**：``useTranslation``、``useState``、``normalizeBuiltinToolValue``、``items.findIndex``、``Math.round``、``t``、``name``、``particles.map``、``Math.max``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:708:1074:FUNCTION

.. rubric:: ``useState callback @ 14``

.. code-block:: javascript

   useState callback @ 14()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``23`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:748:1073:FUNCTION

.. rubric:: ``Array.from callback @ 15``

.. code-block:: javascript

   Array.from callback @ 15()

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``23`` 行；所属函数 ``useState callback @ 14``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.random``。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:1268:1292:FUNCTION

.. rubric:: ``items.findIndex callback @ 29``

.. code-block:: javascript

   items.findIndex callback @ 29(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:1311:1342:FUNCTION

.. rubric:: ``name``

.. code-block:: javascript

   name(item)

实现 ``name`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:4501:5501:FUNCTION

.. rubric:: ``particles.map callback @ 89``

.. code-block:: javascript

   particles.map callback @ 89(particle, particleIndex)

作为 ``particles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``104`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``particle``
   调用方传入的 ``particle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``particleIndex``
   调用方传入的 ``particleIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:6524:6571:FUNCTION

.. rubric:: ``onValueChange callback @ 116``

.. code-block:: javascript

   onValueChange callback @ 116([number])

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``[number]``
   调用方传入的 ``number`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/BuiltinSliderButton.jsx:6622:6670:FUNCTION

.. rubric:: ``anonymous callback @ 117``

.. code-block:: javascript

   anonymous callback @ 117([number])

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``BuiltinSliderButton``。

**参数**

``[number]``
   调用方传入的 ``number`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onCommit``。
