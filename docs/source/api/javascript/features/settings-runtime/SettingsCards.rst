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
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/card``、``@/components/ui/spinner``、``@/lib/virtualUrl.js``、``./model.js``、``./SettingsPresentation.jsx``、``./displayValue.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:857:1206:FUNCTION

.. js:function:: SettingsCardGrid({ columns = 1, children })

   Resource layout follows available content width, with at most two columns.

   **性质**：同步函数；导出 API；源码第 ``17``—``19`` 行。

   **参数**

   ``{ columns = 1, children }``
      调用方传入的 ``columns = 1, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="@container/settings-cards min-w-0"><div className={\x60grid min-w-0 grid-cols-1 gap-3 ${Number(columns) === 2 ? '@2xl/settings-cards:grid-cols-2' : ''}\x60}>{children}</…``。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:1206:2884:FUNCTION

.. js:function:: ProfileCard({ item, context, avatarControl, actions, children })

   渲染 ``ProfileCard`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``21``—``38`` 行。

   **参数**

   ``{ item, context, avatarControl, actions, children }``
      调用方传入的 ``item, context, avatarControl, actions, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Card className="min-w-0 gap-0 rounded-lg py-0 shadow-none" data-settings-profile-card={item.id || ''}> <div className="flex min-w-0 flex-wrap items-center gap-3 p-4"> {avatarCont…``。

   **主要协作调用**：``resolveValue``、``resolveResourceUrl``、``String(title).slice``、``String``、``item.meta.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:2884:6058:FUNCTION

.. js:function:: ConnectionCard({ item, context, record, actions })

   A connection card renders declared data only; no service names select UI.

   **性质**：同步函数；导出 API；源码第 ``41``—``65`` 行。

   **参数**

   ``{ item, context, record, actions }``
      调用方传入的 ``item, context, record, actions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Card className="min-w-0 gap-0 overflow-hidden rounded-lg py-0 shadow-none" data-settings-connection-card="true"> <div className="min-w-0 flex-1 space-y-3 p-4"> <div className="fl…``。

   **主要协作调用**：``getValue``、``resolveValue``、``Object.hasOwn``、``String``、``formatSettingsValue``、``(record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !…``、``columns.filter``、``item.state.busyValues?.includes``、``properties.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:2446:2657:FUNCTION

.. rubric:: ``item.meta.map callback @ 32``

.. code-block:: javascript

   item.meta.map callback @ 32(entry, index)

作为 ``item.meta.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``ProfileCard``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatSettingsValue``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:3904:4099:FUNCTION

.. rubric:: ``columns.filter callback @ 49``

.. code-block:: javascript

   columns.filter callback @ 49(column)

作为 ``columns.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``ConnectionCard``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:4119:4167:FUNCTION

.. rubric:: ``(record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !… callback @ 49``

.. code-block:: javascript

   (record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !… callback @ 49(column)

实现 ``(record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``ConnectionCard``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchesCondition``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCards.jsx:5329:5913:FUNCTION

.. rubric:: ``properties.map callback @ 57``

.. code-block:: javascript

   properties.map callback @ 57(column, index)

作为 ``properties.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``61`` 行；所属函数 ``ConnectionCard``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div key={column.key || column.field || index} className="flex min-w-0 items-start gap-3 text-xs leading-5"><dt className="w-20 shrink-0 text-muted-foreground">{column.label}</dt>…``。

**主要协作调用**：``getValue``、``resolveValue``、``Object.hasOwn``、``String``、``formatSettingsValue``。
