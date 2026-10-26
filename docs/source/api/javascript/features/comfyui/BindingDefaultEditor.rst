src/features/comfyui/BindingDefaultEditor 模块
================================================================================================

.. js:module:: src/features/comfyui/BindingDefaultEditor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/BindingDefaultEditor.jsx``
* **模块标识**：``src/features/comfyui/BindingDefaultEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``@/components/ui/input``、``@/components/ui/switch``、``@/components/ui/select``、``@/features/workflows/WorkflowSourcePicker.jsx``、``./graphModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:349:4495:FUNCTION

.. js:function:: BindingDefaultEditor({ binding, field, onChange, onBusyChange, })

   渲染 ``BindingDefaultEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``13``—``136`` 行。

   **参数**

   ``{ binding, field, onChange, onBusyChange, }``
      调用方传入的 ``binding, field, onChange, onBusyChange,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-3 rounded-lg border bg-muted/20 p-3"> <label className="comfy-label"> 未填写时 <Select value={mode} onValueChange={setMode}> <SelectTrigger> <SelectValue />…``。

   **主要协作调用**：``defaultModeForBinding``、``["integer", "number"].includes``、``["image", "video"].includes``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:579:1072:FUNCTION

.. rubric:: ``setMode``

.. code-block:: javascript

   setMode(defaultMode)

设置与 ``Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``21``—``39`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``defaultMode``
   调用方传入的 ``defaultMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``、``["image", "video"].includes``、``onChange``。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:2095:2173:FUNCTION

.. rubric:: ``onChange callback @ 67``

.. code-block:: javascript

   onChange callback @ 67(source)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``67``—``68`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``source``
   调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:2555:2594:FUNCTION

.. rubric:: ``onCheckedChange callback @ 78``

.. code-block:: javascript

   onCheckedChange callback @ 78(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:2905:2957:FUNCTION

.. rubric:: ``onChange callback @ 87``

.. code-block:: javascript

   onChange callback @ 87(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:3229:3281:FUNCTION

.. rubric:: ``onChange callback @ 96``

.. code-block:: javascript

   onChange callback @ 96(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:3638:3710:FUNCTION

.. rubric:: ``onChange callback @ 108``

.. code-block:: javascript

   onChange callback @ 108(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``109`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/comfyui/BindingDefaultEditor.jsx:3968:4040:FUNCTION

.. rubric:: ``onChange callback @ 118``

.. code-block:: javascript

   onChange callback @ 118(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``119`` 行；所属函数 ``BindingDefaultEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。
