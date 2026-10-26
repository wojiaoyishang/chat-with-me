src/features/workspace/components/commandProfile 模块
==============================================================================================================

.. js:module:: src/features/workspace/components/commandProfile

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/components/commandProfile.js``
* **模块标识**：``src/features/workspace/components/commandProfile``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``@cwm/json-config-editor``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/components/commandProfile.js:267:336:FUNCTION

.. js:function:: validateArgv(argv)

   校验与 ``Argv`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``5``—``5`` 行。

   **参数**

   ``argv``
      调用方传入的 ``argv`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``argv[0]?.trim``。

.. CWM-AST-FUNCTION src/features/workspace/components/commandProfile.js:337:679:FUNCTION

.. js:function:: commandRows(profile)

   实现 ``commandRows`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``7``—``16`` 行。

   **参数**

   ``profile``
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.entries(profile?.commands || {}).map(([id, spec]) => ({ key: crypto.randomUUID(), id, argv: JSON.stringify(spec.argv || []), cwd: spec.cwd || '.', timeout: spec.timeoutSeco…``。

   **主要协作调用**：``Object.entries(profile?.commands || {}).map``、``Object.entries``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workspace/components/commandProfile.js:679:1512:FUNCTION

.. js:function:: commandProfileFromRows(rows, profile, invalidMessage)

   实现 ``commandProfileFromRows`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``17``—``38`` 行。

   **参数**

   ``rows``
      调用方传入的 ``rows`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``profile`` （默认值 ``{}``）
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``invalidMessage`` （默认值 ``'Invalid command configuration'``）
      调用方传入的 ``invalidMessage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...profile, commands }``。

   **显式抛出**：``new Error(invalidMessage)``。

   **主要协作调用**：``row.id.trim``、``Object.hasOwn``、``parse``、``validateArgv``、``row.cwd.trim``、``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/components/commandProfile.js:189:235:FUNCTION

.. rubric:: ``itemLabel``

.. code-block:: javascript

   itemLabel(index)

实现 ``itemLabel`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``4`` 行。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/commandProfile.js:436:674:FUNCTION

.. rubric:: ``Object.entries(profile?.commands || {}).map callback @ 8``

.. code-block:: javascript

   Object.entries(profile?.commands || {}).map callback @ 8([id, spec])

作为 ``Object.entries(profile?.commands || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``15`` 行；所属函数 ``commandRows``。

**参数**

``[id, spec]``
   调用方传入的 ``id, spec`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``、``JSON.stringify``。
