src/features/workspace/components/WorkspaceCommandEditor 模块
==============================================================================================================================

.. js:module:: src/features/workspace/components/WorkspaceCommandEditor

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/components/WorkspaceCommandEditor.jsx``
* **模块标识**：``src/features/workspace/components/WorkspaceCommandEditor``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react-i18next``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:188:519:FUNCTION

.. js:function:: commandRows(profile)

   实现 ``commandRows`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``6``—``15`` 行。

   **参数**

   ``profile``
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.entries(profile?.commands || {}).map(([id, spec]) => ({ key: crypto.randomUUID(), id, argv: JSON.stringify(spec.argv || []), cwd: spec.cwd || '.', timeout: spec.timeoutSeco…``。

   **主要协作调用**：``Object.entries(profile?.commands || {}).map``、``Object.entries``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:519:1173:FUNCTION

.. js:function:: commandProfileFromRows(rows, profile, invalidMessage)

   实现 ``commandProfileFromRows`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``16``—``35`` 行。

   **参数**

   ``rows``
      调用方传入的 ``rows`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``profile``（默认值 ``{}``）
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``invalidMessage``（默认值 ``'Invalid command configuration'``）
      调用方传入的 ``invalidMessage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...profile, commands }``。

   **显式抛出**：``new Error(invalidMessage)``。

   **主要协作调用**：``row.id.trim``、``Object.hasOwn``、``JSON.parse``、``row.cwd.trim``、``Number``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:1173:5260:FUNCTION

.. js:function:: WorkspaceCommandEditor({ rows, onChange })

   渲染 ``WorkspaceCommandEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``36``—``120`` 行。

   **参数**

   ``{ rows, onChange }``
      调用方传入的 ``rows, onChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-3"> <div className="flex items-center justify-between gap-2"> <h4 className="text-sm font-medium">{t('workspace_custom_commands')}</h4> <Button type=…``。

   **主要协作调用**：``useTranslation``、``t``、``rows.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:284:515:FUNCTION

.. rubric:: ``Object.entries(profile?.commands || {}).map callback @ 7``

.. code-block:: javascript

   Object.entries(profile?.commands || {}).map callback @ 7([id, spec])

作为 ``Object.entries(profile?.commands || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``14`` 行；所属函数 ``commandRows``。

**参数**

``[id, spec]``
   调用方传入的 ``id, spec`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:1297:1390:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(index, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``WorkspaceCommandEditor``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:1334:1388:FUNCTION

.. rubric:: ``rows.map callback @ 38``

.. code-block:: javascript

   rows.map callback @ 38(row, i)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``change``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:1407:1838:FUNCTION

.. rubric:: ``add``

.. code-block:: javascript

   add()

新增与 ``add`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``39``—``53`` 行；所属函数 ``WorkspaceCommandEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rows.some``、``onChange``、``crypto.randomUUID``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:1479:1518:FUNCTION

.. rubric:: ``rows.some callback @ 41``

.. code-block:: javascript

   rows.some callback @ 41(row)

作为 ``rows.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``add``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:2431:5230:FUNCTION

.. rubric:: ``rows.map callback @ 64``

.. code-block:: javascript

   rows.map callback @ 64(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``117`` 行；所属函数 ``WorkspaceCommandEditor``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:2770:2822:FUNCTION

.. rubric:: ``onChange callback @ 70``

.. code-block:: javascript

   onChange callback @ 70(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``rows.map callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:3234:3284:FUNCTION

.. rubric:: ``onClick callback @ 79``

.. code-block:: javascript

   onClick callback @ 79()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``rows.map callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:3261:3282:FUNCTION

.. rubric:: ``rows.filter callback @ 79``

.. code-block:: javascript

   rows.filter callback @ 79(_, i)

作为 ``rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``onClick callback @ 79``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:3790:3844:FUNCTION

.. rubric:: ``onChange callback @ 89``

.. code-block:: javascript

   onChange callback @ 89(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``rows.map callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:4156:4209:FUNCTION

.. rubric:: ``onChange callback @ 95``

.. code-block:: javascript

   onChange callback @ 95(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``rows.map callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:4641:4698:FUNCTION

.. rubric:: ``onChange callback @ 104``

.. code-block:: javascript

   onChange callback @ 104(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``rows.map callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceCommandEditor.jsx:5024:5081:FUNCTION

.. rubric:: ``onChange callback @ 112``

.. code-block:: javascript

   onChange callback @ 112(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``rows.map callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。
