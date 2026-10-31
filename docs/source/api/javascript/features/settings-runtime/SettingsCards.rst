src/features/settings-runtime/SettingsCards 模块
====================================================================================================

.. js:module:: src/features/settings-runtime/SettingsCards

Resource layout follows available content width, with at most two columns.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsCards.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsCards``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/card``、``@/components/ui/button``、``@/components/ui/spinner``、``@/lib/virtualUrl.js``、``./model.js``、``./SettingsPresentation.jsx``、``./displayValue.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:906:1255:FUNCTION

.. js:function:: SettingsCardGrid({ columns = 1, children })

   Resource layout follows available content width, with at most two columns.

   **性质**：同步函数；导出 API；源码第 ``18``—``20`` 行。

   **参数**

   ``{ columns = 1, children }``
      调用方传入的 ``columns = 1, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="@container/settings-cards min-w-0"><div className={\x60grid min-w-0 grid-cols-1 gap-3 ${Number(columns) === 2 ? '@2xl/settings-cards:grid-cols-2' : ''}\x60}>{children}</…``。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:1255:2933:FUNCTION

.. js:function:: ProfileCard({ item, context, avatarControl, actions, children })

   渲染 ``ProfileCard`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``22``—``39`` 行。

   **参数**

   ``{ item, context, avatarControl, actions, children }``
      调用方传入的 ``item, context, avatarControl, actions, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Card className="min-w-0 gap-0 rounded-lg py-0 shadow-none" data-settings-profile-card={item.id || ''}> <div className="flex min-w-0 flex-wrap items-center gap-3 p-4"> {avatarCont…``。

   **主要协作调用**：``resolveValue``、``resolveResourceUrl``、``String(title).slice``、``String``、``item.meta.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:2933:7135:FUNCTION

.. js:function:: ConnectionCard({ item, context, record, actions })

   A connection card renders declared data only; no service names select UI.

   **性质**：同步函数；导出 API；源码第 ``42``—``71`` 行。

   **参数**

   ``{ item, context, record, actions }``
      调用方传入的 ``item, context, record, actions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Card className={\x60min-w-0 gap-0 overflow-hidden py-0 shadow-none ${summary ? 'rounded-none border-0 border-b bg-transparent' : 'rounded-lg'}\x60} data-settings-connection-card="true"…``。

   **主要协作调用**：``getValue``、``resolveValue``、``Object.hasOwn``、``String``、``formatSettingsValue``、``(record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !…``、``columns.filter``、``matchesCondition``、``item.state.busyValues?.includes``、``properties.map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:2495:2706:FUNCTION

.. rubric:: ``item.meta.map callback @ 33``

.. code-block:: javascript

   item.meta.map callback @ 33(entry, index)

作为 ``item.meta.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``ProfileCard``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatSettingsValue``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:3953:4148:FUNCTION

.. rubric:: ``columns.filter callback @ 50``

.. code-block:: javascript

   columns.filter callback @ 50(column)

作为 ``columns.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``ConnectionCard``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:4168:4216:FUNCTION

.. rubric:: ``(record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !… callback @ 50``

.. code-block:: javascript

   (record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !… callback @ 50(column)

实现 ``(record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``ConnectionCard``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchesCondition``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:5375:5489:FUNCTION

.. rubric:: ``onClick callback @ 58``

.. code-block:: javascript

   onClick callback @ 58()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``ConnectionCard``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``context.execute(primaryAction, { item: scope.item, parentItem: scope.parentItem }).catch``、``context.execute``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:5477:5485:FUNCTION

.. rubric:: ``context.execute(primaryAction, { item: scope.item, parentItem: scope.parentItem }).catch callback @ 58``

.. code-block:: javascript

   context.execute(primaryAction, { item: scope.item, parentItem: scope.parentItem }).catch callback @ 58()

处理 ``context.execute(primaryAction, { item: scope.item, parentItem: scope.parentItem }).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``onClick callback @ 58``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:6372:6978:FUNCTION

.. rubric:: ``properties.map callback @ 63``

.. code-block:: javascript

   properties.map callback @ 63(column, index)

作为 ``properties.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``67`` 行；所属函数 ``ConnectionCard``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div key={column.key || column.field || index} className="flex min-w-0 items-start gap-3 text-xs leading-5"><dt className={\x60${summary ? '' : 'w-20'} shrink-0 text-muted-foreground…``。

**主要协作调用**：``getValue``、``resolveValue``、``Object.hasOwn``、``String``、``formatSettingsValue``。
