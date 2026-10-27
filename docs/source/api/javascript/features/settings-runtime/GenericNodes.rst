src/features/settings-runtime/GenericNodes 模块
==================================================================================================

.. js:module:: src/features/settings-runtime/GenericNodes

A backend-authored summary remains presentation data, not an account page.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/GenericNodes.jsx``
* **模块标识**：``src/features/settings-runtime/GenericNodes``
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：102

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/components/ui/checkbox``、``@/components/ui/badge``、``@/lib/virtualUrl.js``、``./model.js``、``./useActionExecutor.js``、``./validation.js``、``./SettingsPresentation.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:941:3721:FUNCTION

.. js:function:: FileNode({ item, value, onChange, context })

   渲染 ``FileNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``15``—``51`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className={\x60flex min-w-0 flex-col gap-3 rounded-xl border border-border/65 bg-muted/10 p-3 ${preview ? 'sm:flex-row sm:items-center sm:gap-4' : ''}\x60} data-settings-pending={b…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``resolveValue``、``Boolean``、``resolveResourceUrl``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:3721:4994:FUNCTION

.. js:function:: ActionButton({ action, context, scope = {}, callbacks, disabled = false, variant, showStatus = true })

   渲染 ``ActionButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``53``—``67`` 行。

   **参数**

   ``{ action, context, scope = {}, callbacks, disabled = false, variant, showStatus = true }``
      调用方传入的 ``action, context, scope = , callbacks, disabled = false, variant, showStatus = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<div className="min-w-0 space-y-2"> <Button type="button" size="sm" variant={variant || action.variant || 'outline'} disabled={isDisabled || operation?.busy} className={\x60rounded-x…``。

   **主要协作调用**：``matchesCondition``、``operationKey``、``formatValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:4994:6367:FUNCTION

.. js:function:: OperationStatus({ operation, context })

   渲染 ``OperationStatus`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``69``—``83`` 行。

   **参数**

   ``{ operation, context }``
      调用方传入的 ``operation, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<div className={\x60space-y-1.5 rounded-lg px-3 py-2 text-xs ${operation.error ? 'border border-destructive/30 bg-destructive/5 text-destructive' : 'bg-muted text-muted-foreground'}\x60…``。

   **副作用**

   * 改变前端路由或浏览器历史。

   **主要协作调用**：``Number``、``Number.isFinite``、``Math.max``、``Math.min``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6367:6634:FUNCTION

.. js:function:: ActionsNode({ item, context })

   渲染 ``ActionsNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``85``—``87`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex flex-wrap items-start gap-2.5 px-4 py-3 sm:px-5">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={…``。

   **主要协作调用**：``(item.actions || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6634:8679:FUNCTION

.. js:function:: ProfileSummaryNode({ item, context })

   A backend-authored summary remains presentation data, not an account page.

   **性质**：同步函数；导出 API；源码第 ``90``—``110`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection className="overflow-visible" bodyClassName="p-5 sm:p-6"> <div className="flex flex-col gap-4 sm:flex-row sm:items-center"> <div className="flex size-16 shrink-0 i…``。

   **主要协作调用**：``resolveValue``、``resolveResourceUrl``、``String(title).slice``、``String``、``item.meta.map``、``item.actions.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:8679:13357:FUNCTION

.. js:function:: AsyncOperationNode({ item, context })

   A persisted operation can be inspected again after the settings page reopens.

   **性质**：同步函数；导出 API；源码第 ``113``—``169`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={item.text} description={item.description} icon={item.icon || 'settings'} bodyClassName="space-y-4 p-4 sm:p-5"> {label && <p className="text-sm">{operation?…``。

   **主要协作调用**：``useRef``、``useState``、``JSON.stringify``、``useEffect``、``[readAction, ...(item.actions || [])].map``、``keys.map((key) => context.operations[key]).filter(Boolean).sort``、``keys.map((key) => context.operations[key]).filter``、``keys.map``、``getValue``、``Boolean``、``item.summary.map``、``(item.actions || []).map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13357:13586:FUNCTION

.. js:function:: displayValue(value)

   实现 ``displayValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``171``—``176`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'—'``、``value ? '是' : '否'``、``JSON.stringify(value)``、``String(value)``。

   **主要协作调用**：``JSON.stringify``、``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13586:14588:FUNCTION

.. js:function:: TableNode({ item, value, context })

   渲染 ``TableNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``178``—``182`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<p role="alert" className="text-sm text-destructive">表格数据必须是列表。</p>``、``<div className="max-w-full overflow-auto rounded-xl border border-border/70 bg-card"><table className="w-full text-left text-sm"><thead className="bg-muted/35 text-xs text-muted-f…``。

   **主要协作调用**：``resolveValue``、``Array.isArray``、``(item.columns || []).map``、``rows.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14588:15285:FUNCTION

.. js:function:: DiffNode({ item, value, context })

   渲染 ``DiffNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``184``—``188`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="grid gap-3 rounded-xl border p-4 sm:grid-cols-3">{columns.map((column) => <section className="min-w-0 space-y-2" key={column.key}><h4 className="text-sm font-mediu…``。

   **主要协作调用**：``resolveValue``、``Object.keys(data).map``、``Object.keys``、``columns.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15285:17950:FUNCTION

.. js:function:: SecretMapNode({ item, value = EMPTY_MAP, onChange, context })

   渲染 ``SecretMapNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``190``—``218`` 行。

   **参数**

   ``{ item, value = EMPTY_MAP, onChange, context }``
      调用方传入的 ``item, value = EMPTY_MAP, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="space-y-3 rounded-xl border border-border/70 bg-muted/15 p-3" data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}> {rows…``。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``Boolean``、``rows.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17950:20965:FUNCTION

.. js:function:: MatrixNode({ item, value = {}, onChange, context })

   渲染 ``MatrixNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``220``—``245`` 行。

   **参数**

   ``{ item, value = {}, onChange, context }``
      调用方传入的 ``item, value = , onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={item.text} description={item.description || item.tips} icon={item.icon || 'shield'} bodyClassName="space-y-4 p-4 sm:p-5"> <div className="flex flex-wrap ga…``。

   **主要协作调用**：``useState``、``useRef``、``resolveValue``、``allRows.filter``、``(item.bulkActions || []).map``、``columns.map``、``rows.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20965:36038:FUNCTION

.. js:function:: ResourceNode({ item, context, renderFields })

   渲染 ``ResourceNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``247``—``395`` 行。

   **参数**

   ``{ item, context, renderFields }``
      调用方传入的 ``item, context, renderFields`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={<span className="flex items-center gap-2.5">{item.text || item.title}<Badge variant="secondary" className="rounded-md px-1.5 text-[10px] tabular-nums">{row…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useRef``、``JSON.stringify``、``useCallback``、``useEffect``、``columns.map``、``rows.map``、``renderCards``、``Boolean``、``formatValue``、``Object.entries(fieldErrors).map``、``Object.entries``。

   **内部回调数量**：22。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36038:37298:FUNCTION

.. js:function:: DescriptorDialog({ descriptor, context, renderFields, onClose })

   渲染 ``DescriptorDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``397``—``401`` 行。

   **参数**

   ``{ descriptor, context, renderFields, onClose }``
      调用方传入的 ``descriptor, context, renderFields, onClose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Dialog open={Boolean(descriptor)} onOpenChange={(open) => { if (!open) onClose(); }}><DialogContent className="flex max-h-[90dvh] w-[min(50rem,95vw)] max-w-none flex-col gap-0 ov…``。

   **主要协作调用**：``useState``、``useEffect``、``Boolean``、``renderFields``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:1336:2436:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   async choose(event)

实现 ``choose`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``20``—``41`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``setError``、``form.append``、``context.api.post``、``requestEndpoint``、``values.push``、``getValue``、``setUploadedPreview``、``file.text``、``JSON.parse``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:3277:3311:FUNCTION

.. rubric:: ``onChange callback @ 45``

.. code-block:: javascript

   onChange callback @ 45(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:4623:4702:FUNCTION

.. rubric:: ``onClick callback @ 61``

.. code-block:: javascript

   onClick callback @ 61()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``ActionButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``context.execute(action, actualScope, callbacks).catch``、``context.execute``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:4690:4698:FUNCTION

.. rubric:: ``context.execute(action, actualScope, callbacks).catch callback @ 61``

.. code-block:: javascript

   context.execute(action, actualScope, callbacks).catch callback @ 61()

处理 ``context.execute(action, actualScope, callbacks).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``onClick callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:5746:5771:FUNCTION

.. rubric:: ``onClick callback @ 76``

.. code-block:: javascript

   onClick callback @ 76()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``OperationStatus``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operation.retry``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:5910:5952:FUNCTION

.. rubric:: ``onClick callback @ 77``

.. code-block:: javascript

   onClick callback @ 77()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``OperationStatus``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``context.navigate``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6528:6622:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 86``

.. code-block:: javascript

   (item.actions || []).map callback @ 86(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``ActionsNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:8179:8405:FUNCTION

.. rubric:: ``item.meta.map callback @ 105``

.. code-block:: javascript

   item.meta.map callback @ 105(entry, index)

作为 ``item.meta.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``ProfileSummaryNode``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:8532:8626:FUNCTION

.. rubric:: ``item.actions.map callback @ 107``

.. code-block:: javascript

   item.actions.map callback @ 107(action, index)

作为 ``item.actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``ProfileSummaryNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9393:9588:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``122``—``126`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setReading``、``latest.current.execute(readAction).catch(() => {}).finally``、``latest.current.execute(readAction).catch``、``latest.current.execute``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9514:9522:FUNCTION

.. rubric:: ``latest.current.execute(readAction).catch callback @ 125``

.. code-block:: javascript

   latest.current.execute(readAction).catch callback @ 125()

处理 ``latest.current.execute(readAction).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``read``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9532:9579:FUNCTION

.. rubric:: ``latest.current.execute(readAction).catch(() => {}).finally callback @ 125``

.. code-block:: javascript

   latest.current.execute(readAction).catch(() => {}).finally callback @ 125()

处理 ``latest.current.execute(readAction).catch(() => {}).finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``read``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReading``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9605:9887:FUNCTION

.. rubric:: ``useEffect callback @ 127``

.. code-block:: javascript

   useEffect callback @ 127()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``127``—``133`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; }``。

**主要协作调用**：``read``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9703:9736:FUNCTION

.. rubric:: ``returned callback @ 130``

.. code-block:: javascript

   returned callback @ 130()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``useEffect callback @ 127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9967:10055:FUNCTION

.. rubric:: ``[readAction, ...(item.actions || [])].map callback @ 134``

.. code-block:: javascript

   [readAction, ...(item.actions || [])].map callback @ 134(action)

作为 ``[readAction, ...(item.actions || [])].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operationKey``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10146:10178:FUNCTION

.. rubric:: ``keys.map callback @ 136``

.. code-block:: javascript

   keys.map callback @ 136(key)

作为 ``keys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10201:10234:FUNCTION

.. rubric:: ``keys.map((key) => context.operations[key]).filter(Boolean).sort callback @ 136``

.. code-block:: javascript

   keys.map((key) => context.operations[key]).filter(Boolean).sort callback @ 136(a, b)

作为 ``keys.map((key) => context.operations[key]).filter(Boolean).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10862:10912:FUNCTION

.. rubric:: ``onSuccess``

.. code-block:: javascript

   onSuccess()

处理 ``Success`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubmitError``、``setUncertain``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10931:11312:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``146``—``154`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSubmitError``、``Number``、``setUncertain``、``read``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12381:12675:FUNCTION

.. rubric:: ``item.summary.map callback @ 165``

.. code-block:: javascript

   item.summary.map callback @ 165(field)

作为 ``item.summary.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``getValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12962:13164:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 167``

.. code-block:: javascript

   (item.actions || []).map callback @ 167(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14087:14173:FUNCTION

.. rubric:: ``(item.columns || []).map callback @ 181``

.. code-block:: javascript

   (item.columns || []).map callback @ 181(column)

作为 ``(item.columns || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``TableNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14205:14451:FUNCTION

.. rubric:: ``rows.map callback @ 181``

.. code-block:: javascript

   rows.map callback @ 181(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``TableNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getValue``、``(item.columns || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14322:14444:FUNCTION

.. rubric:: ``(item.columns || []).map callback @ 181``

.. code-block:: javascript

   (item.columns || []).map callback @ 181(column)

作为 ``(item.columns || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``rows.map callback @ 181``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``getValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14809:14839:FUNCTION

.. rubric:: ``Object.keys(data).map callback @ 186``

.. code-block:: javascript

   Object.keys(data).map callback @ 186(key)

作为 ``Object.keys(data).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``DiffNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14932:15273:FUNCTION

.. rubric:: ``columns.map callback @ 187``

.. code-block:: javascript

   columns.map callback @ 187(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``DiffNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(Array.isArray(data[column.key]) ? data[column.key] : []).map``、``Array.isArray``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15174:15256:FUNCTION

.. rubric:: ``(Array.isArray(data[column.key]) ? data[column.key] : []).map callback @ 187``

.. code-block:: javascript

   (Array.isArray(data[column.key]) ? data[column.key] : []).map callback @ 187(entry, index)

作为 ``(Array.isArray(data[column.key]) ? data[column.key] : []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``columns.map callback @ 187``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15407:15516:FUNCTION

.. rubric:: ``useState callback @ 191``

.. code-block:: javascript

   useState callback @ 191()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries(value || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15445:15515:FUNCTION

.. rubric:: ``Object.entries(value || {}).map callback @ 191``

.. code-block:: javascript

   Object.entries(value || {}).map callback @ 191([key, content])

作为 ``Object.entries(value || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useState callback @ 191``。

**参数**

``[key, content]``
   调用方传入的 ``key, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15571:15792:FUNCTION

.. rubric:: ``useEffect callback @ 193``

.. code-block:: javascript

   useEffect callback @ 193()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``193``—``197`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRows``、``Object.entries(value || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15712:15782:FUNCTION

.. rubric:: ``Object.entries(value || {}).map callback @ 196``

.. code-block:: javascript

   Object.entries(value || {}).map callback @ 196([key, content])

作为 ``Object.entries(value || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``useEffect callback @ 193``。

**参数**

``[key, content]``
   调用方传入的 ``key, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15868:16347:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``199``—``208`` 行；所属函数 ``SecretMapNode``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRows``、``next.map((row) => row.key).filter``、``next.map``、``next.some``、``setError``、``Object.fromEntries``、``next.filter((row) => row.key).map``、``next.filter``、``onChange``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15936:15952:FUNCTION

.. rubric:: ``next.map callback @ 201``

.. code-block:: javascript

   next.map callback @ 201(row)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15994:16018:FUNCTION

.. rubric:: ``next.some callback @ 202``

.. code-block:: javascript

   next.some callback @ 202(row)

作为 ``next.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.key.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16223:16239:FUNCTION

.. rubric:: ``next.filter callback @ 205``

.. code-block:: javascript

   next.filter callback @ 205(row)

作为 ``next.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16245:16274:FUNCTION

.. rubric:: ``next.filter((row) => row.key).map callback @ 205``

.. code-block:: javascript

   next.filter((row) => row.key).map callback @ 205(row)

作为 ``next.filter((row) => row.key).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16554:17560:FUNCTION

.. rubric:: ``rows.map callback @ 210``

.. code-block:: javascript

   rows.map callback @ 210(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``210``—``214`` 行；所属函数 ``SecretMapNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16809:16916:FUNCTION

.. rubric:: ``onChange callback @ 211``

.. code-block:: javascript

   onChange callback @ 211(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``rows.map callback @ 210``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16836:16914:FUNCTION

.. rubric:: ``rows.map callback @ 211``

.. code-block:: javascript

   rows.map callback @ 211(entry)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``onChange callback @ 211``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17199:17308:FUNCTION

.. rubric:: ``onChange callback @ 212``

.. code-block:: javascript

   onChange callback @ 212(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``rows.map callback @ 210``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17226:17306:FUNCTION

.. rubric:: ``rows.map callback @ 212``

.. code-block:: javascript

   rows.map callback @ 212(entry)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``onChange callback @ 212``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17447:17504:FUNCTION

.. rubric:: ``onClick callback @ 213``

.. code-block:: javascript

   onClick callback @ 213()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``rows.map callback @ 210``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17472:17502:FUNCTION

.. rubric:: ``rows.filter callback @ 213``

.. code-block:: javascript

   rows.filter callback @ 213(entry)

作为 ``rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``onClick callback @ 213``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17761:17869:FUNCTION

.. rubric:: ``onClick callback @ 216``

.. code-block:: javascript

   onClick callback @ 216()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``crypto.randomUUID``、``setError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18280:18394:FUNCTION

.. rubric:: ``allRows.filter callback @ 225``

.. code-block:: javascript

   allRows.filter callback @ 225(row)

作为 ``allRows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``225``—``225`` 行；所属函数 ``MatrixNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includes``、``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase``、``query.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18416:18608:FUNCTION

.. rubric:: ``setRow``

.. code-block:: javascript

   setRow(row, next, current)

设置与 ``Row`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``226``—``229`` 行；所属函数 ``MatrixNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``current`` （默认值 ``value``）
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, [row.id]: next }``。

**主要协作调用**：``row.allowedValues.includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18627:19260:FUNCTION

.. rubric:: ``bulk``

.. code-block:: javascript

   async bulk(action)

实现 ``bulk`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``230``—``240`` 行；所属函数 ``MatrixNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``context.confirm``、``setRow``、``onChange``、``Object.entries``、``context.update``、``path.split``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19636:19675:FUNCTION

.. rubric:: ``onChange callback @ 242``

.. code-block:: javascript

   onChange callback @ 242(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``MatrixNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19709:19880:FUNCTION

.. rubric:: ``(item.bulkActions || []).map callback @ 242``

.. code-block:: javascript

   (item.bulkActions || []).map callback @ 242(action)

作为 ``(item.bulkActions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``MatrixNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19827:19855:FUNCTION

.. rubric:: ``onClick callback @ 242``

.. code-block:: javascript

   onClick callback @ 242()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``(item.bulkActions || []).map callback @ 242``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bulk``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20175:20275:FUNCTION

.. rubric:: ``columns.map callback @ 243``

.. code-block:: javascript

   columns.map callback @ 243(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``MatrixNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20307:20913:FUNCTION

.. rubric:: ``rows.map callback @ 243``

.. code-block:: javascript

   rows.map callback @ 243(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``MatrixNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``columns.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20544:20906:FUNCTION

.. rubric:: ``columns.map callback @ 243``

.. code-block:: javascript

   columns.map callback @ 243(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``rows.map callback @ 243``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.allowedValues.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20856:20897:FUNCTION

.. rubric:: ``onCheckedChange callback @ 243``

.. code-block:: javascript

   onCheckedChange callback @ 243()

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``columns.map callback @ 243``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setRow``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21459:21474:FUNCTION

.. rubric:: ``useState callback @ 255``

.. code-block:: javascript

   useState callback @ 255()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22085:23372:FUNCTION

.. rubric:: ``useCallback callback @ 268``

.. code-block:: javascript

   async useCallback callback @ 268()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``268``—``287`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('资源接口没有返回列表。')``。

**主要协作调用**：``requestController.current?.abort``、``setLoading``、``setError``、``source.endpoint?.startsWith``、``ctx.client.read``、``source.endpoint.slice``、``ctx.api.get``、``requestEndpoint``、``resolveValue``、``getValue``、``Array.isArray``、``setRows``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23403:23630:FUNCTION

.. rubric:: ``useEffect callback @ 288``

.. code-block:: javascript

   useEffect callback @ 288()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``288``—``288`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; epoch.current += 1; requestController.current?.abort(); detail.serial += 1; detail.controller?.abort(); }``。

**主要协作调用**：``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23490:23627:FUNCTION

.. rubric:: ``returned callback @ 288``

.. code-block:: javascript

   returned callback @ 288()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``288``—``288`` 行；所属函数 ``useEffect callback @ 288``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestController.current?.abort``、``detail.controller?.abort``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23656:23706:FUNCTION

.. rubric:: ``useEffect callback @ 289``

.. code-block:: javascript

   useEffect callback @ 289()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``289``—``289`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``registerResource``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23770:24101:FUNCTION

.. rubric:: ``useEffect callback @ 290``

.. code-block:: javascript

   useEffect callback @ 290()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``290``—``294`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { subscriptions.forEach((unsubscribe) => unsubscribe?.()); local?.(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``(item.events || []).map``、``source.endpoint?.startsWith``、``client.subscribe``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23833:23884:FUNCTION

.. rubric:: ``(item.events || []).map callback @ 291``

.. code-block:: javascript

   (item.events || []).map callback @ 291(event)

作为 ``(item.events || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``useEffect callback @ 290``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscribe``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23860:23883:FUNCTION

.. rubric:: ``subscribe callback @ 291``

.. code-block:: javascript

   subscribe callback @ 291()

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``(item.events || []).map callback @ 291``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23968:23990:FUNCTION

.. rubric:: ``client.subscribe callback @ 292``

.. code-block:: javascript

   client.subscribe callback @ 292()

实现 ``client.subscribe`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``292``—``292`` 行；所属函数 ``useEffect callback @ 290``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24015:24093:FUNCTION

.. rubric:: ``returned callback @ 293``

.. code-block:: javascript

   returned callback @ 293()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``useEffect callback @ 290``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscriptions.forEach``、``local``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24046:24078:FUNCTION

.. rubric:: ``subscriptions.forEach callback @ 293``

.. code-block:: javascript

   subscriptions.forEach callback @ 293(unsubscribe)

作为 ``subscriptions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``returned callback @ 293``。

**参数**

``unsubscribe``
   调用方传入的 ``unsubscribe`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24176:24501:FUNCTION

.. rubric:: ``useEffect callback @ 295``

.. code-block:: javascript

   useEffect callback @ 295()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``295``—``299`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``registerDraftGuard(\x60${item.id || item.name}:editor\x60, async () => JSON.stringify(editor.initial) === JSON.stringify(editor.values) || confirm({ title: '放弃未保存的更改？', description: '离开…``。

**主要协作调用**：``registerDraftGuard``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24315:24492:FUNCTION

.. rubric:: ``registerDraftGuard callback @ 297``

.. code-block:: javascript

   async registerDraftGuard callback @ 297()

注册与 ``Draft Guard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``297``—``298`` 行；所属函数 ``useEffect callback @ 295``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``、``confirm``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24586:26088:FUNCTION

.. rubric:: ``openEditor``

.. code-block:: javascript

   async openEditor(record)

打开与 ``Editor`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``300``—``318`` 行；所属函数 ``ResourceNode``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``detailRequest.current.controller?.abort``、``setEditorBusy``、``setEditorError``、``setFieldErrors``、``pageValues``、``cloneData``、``setEditor``、``context.api.get``、``requestEndpoint``、``getValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25679:25777:FUNCTION

.. rubric:: ``setEditor callback @ 314``

.. code-block:: javascript

   setEditor callback @ 314(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``openEditor``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cloneData``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26114:26342:FUNCTION

.. rubric:: ``patchEditor``

.. code-block:: javascript

   patchEditor(patch, target)

实现 ``patchEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``319``—``321`` 行；所属函数 ``ResourceNode``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target`` （默认值 ``'form'``）
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26153:26341:FUNCTION

.. rubric:: ``setEditor callback @ 319``

.. code-block:: javascript

   setEditor callback @ 319(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``319``—``321`` 行；所属函数 ``patchEditor``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``、``target.replace``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26368:26712:FUNCTION

.. rubric:: ``closeEditor``

.. code-block:: javascript

   async closeEditor()

关闭与 ``Editor`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``322``—``327`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``、``context.confirm``、``detailRequest.current.controller?.abort``、``setEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26819:27767:FUNCTION

.. rubric:: ``onSave``

.. code-block:: javascript

   async onSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``329``—``341`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``validateSettingsScope``、``setEditorError``、``validateSettingsFields``、``setFieldErrors``、``Object.keys``、``context.execute``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27443:27618:FUNCTION

.. rubric:: ``onSuccess``

.. code-block:: javascript

   async onSuccess()

处理 ``Success`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``338``—``338`` 行；所属函数 ``onSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``、``(editorAction.effects || []).some``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27514:27600:FUNCTION

.. rubric:: ``(editorAction.effects || []).some callback @ 338``

.. code-block:: javascript

   (editorAction.effects || []).some callback @ 338(effect)

作为 ``(editorAction.effects || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``onSuccess``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27641:27746:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``339``—``339`` 行；所属函数 ``onSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditorError``、``setFieldErrors``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27792:28787:FUNCTION

.. rubric:: ``actionsFor``

.. code-block:: javascript

   actionsFor(record)

实现 ``actionsFor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``342``—``348`` 行；所属函数 ``ResourceNode``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(item.actions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27881:28779:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 342``

.. code-block:: javascript

   (item.actions || []).map callback @ 342(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``342``—``348`` 行；所属函数 ``actionsFor``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``action.kind === 'edit' ? <Button key={action.id || index} type="button" size="sm" variant="outline" className="rounded-xl" disabled={context.disabled || (action.disabledWhen && ma…``。

**主要协作调用**：``matchesCondition``、``conflictingActions.has``、``operationKey``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28337:28371:FUNCTION

.. rubric:: ``onClick callback @ 346``

.. code-block:: javascript

   onClick callback @ 346()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``346``—``346`` 行；所属函数 ``(item.actions || []).map callback @ 342``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28628:28765:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``347``—``347`` 行；所属函数 ``(item.actions || []).map callback @ 342``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setConflictingActions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28696:28761:FUNCTION

.. rubric:: ``setConflictingActions callback @ 347``

.. code-block:: javascript

   setConflictingActions callback @ 347(previous)

设置与 ``Conflicting Actions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``347``—``347`` 行；所属函数 ``onError``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operationKey``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28852:29070:FUNCTION

.. rubric:: ``valueText``

.. code-block:: javascript

   valueText(record, column)

实现 ``valueText`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``350``—``353`` 行；所属函数 ``ResourceNode``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Object.hasOwn(column.labels || {}, String(value)) ? column.labels[String(value)] : displayValue(value)``。

**主要协作调用**：``getValue``、``Object.hasOwn``、``String``、``displayValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29096:31233:FUNCTION

.. rubric:: ``renderCards``

.. code-block:: javascript

   renderCards()

渲染与 ``Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``354``—``372`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29194:31225:FUNCTION

.. rubric:: ``rows.map callback @ 354``

.. code-block:: javascript

   rows.map callback @ 354(record, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``354``—``372`` 行；所属函数 ``renderCards``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<article className="min-w-0 overflow-hidden rounded-xl border border-border/70 bg-background transition-shadow hover:shadow-sm" key={getValue(record, item.keyField || 'id', index)…``。

**主要协作调用**：``getValue``、``columns.filter``、``displayValue``、``item.badges.map``、``properties.map``、``actionsFor``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29463:29556:FUNCTION

.. rubric:: ``columns.filter callback @ 357``

.. code-block:: javascript

   columns.filter callback @ 357(column)

作为 ``columns.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``rows.map callback @ 354``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30404:30579:FUNCTION

.. rubric:: ``item.badges.map callback @ 365``

.. code-block:: javascript

   item.badges.map callback @ 365(badge)

作为 ``item.badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``365``—``365`` 行；所属函数 ``rows.map callback @ 354``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30802:31034:FUNCTION

.. rubric:: ``properties.map callback @ 368``

.. code-block:: javascript

   properties.map callback @ 368(column)

作为 ``properties.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``368``—``368`` 行；所属函数 ``rows.map callback @ 354``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31405:31427:FUNCTION

.. rubric:: ``onClick callback @ 374``

.. code-block:: javascript

   onClick callback @ 374()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``374``—``374`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31638:31670:FUNCTION

.. rubric:: ``onClick callback @ 375``

.. code-block:: javascript

   onClick callback @ 375()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``375``—``375`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33055:33139:FUNCTION

.. rubric:: ``columns.map callback @ 381``

.. code-block:: javascript

   columns.map callback @ 381(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``381``—``381`` 行；所属函数 ``ResourceNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33216:33551:FUNCTION

.. rubric:: ``rows.map callback @ 381``

.. code-block:: javascript

   rows.map callback @ 381(record, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``381``—``381`` 行；所属函数 ``ResourceNode``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getValue``、``columns.map``、``actionsFor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33379:33493:FUNCTION

.. rubric:: ``columns.map callback @ 381``

.. code-block:: javascript

   columns.map callback @ 381(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``381``—``381`` 行；所属函数 ``rows.map callback @ 381``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33668:33712:FUNCTION

.. rubric:: ``onOpenChange callback @ 383``

.. code-block:: javascript

   onOpenChange callback @ 383(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``383``—``383`` 行；所属函数 ``ResourceNode``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34657:34752:FUNCTION

.. rubric:: ``Object.entries(fieldErrors).map callback @ 388``

.. code-block:: javascript

   Object.entries(fieldErrors).map callback @ 388([field, message])

作为 ``Object.entries(fieldErrors).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``388`` 行；所属函数 ``ResourceNode``。

**参数**

``[field, message]``
   调用方传入的 ``field, message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35004:35083:FUNCTION

.. rubric:: ``renderFields callback @ 389``

.. code-block:: javascript

   renderFields callback @ 389(values)

渲染与 ``Fields`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``389``—``389`` 行；所属函数 ``ResourceNode``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35027:35082:FUNCTION

.. rubric:: ``setEditor callback @ 389``

.. code-block:: javascript

   setEditor callback @ 389(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``389``—``389`` 行；所属函数 ``renderFields callback @ 389``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35443:35472:FUNCTION

.. rubric:: ``onClick callback @ 391``

.. code-block:: javascript

   onClick callback @ 391()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``391``—``391`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35860:35932:FUNCTION

.. rubric:: ``onClick callback @ 391``

.. code-block:: javascript

   onClick callback @ 391()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``391``—``391`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSave().catch``、``onSave``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35888:35928:FUNCTION

.. rubric:: ``onSave().catch callback @ 391``

.. code-block:: javascript

   onSave().catch callback @ 391(cause)

处理 ``onSave().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``391``—``391`` 行；所属函数 ``onClick callback @ 391``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditorError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36167:36244:FUNCTION

.. rubric:: ``useState callback @ 398``

.. code-block:: javascript

   useState callback @ 398()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``398``—``398`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pageValues``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36262:36355:FUNCTION

.. rubric:: ``useEffect callback @ 399``

.. code-block:: javascript

   useEffect callback @ 399()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``399``—``399`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``、``pageValues``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36433:36468:FUNCTION

.. rubric:: ``onOpenChange callback @ 400``

.. code-block:: javascript

   onOpenChange callback @ 400(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``400``—``400`` 行；所属函数 ``DescriptorDialog``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。
