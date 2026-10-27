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
* **顶层函数/组件/Hook**：14
* **类**：0
* **局部函数与匿名回调**：133

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/components/ui/radio-group``、``@/components/ui/badge``、``@/components/ui/card``、``@/components/ui/spinner``、``@/lib/virtualUrl.js``、``./model.js``、``./useActionExecutor.js``、``./validation.js``、``./SettingsPresentation.jsx``、``./displayValue.js``、``./SettingsCards.jsx``、``./SettingsFormLayout.jsx``、``./SettingsActionLabel.jsx``、``./actionPresentation.js``、``./dialogSizing.js``、``./loadingToasts.js``、``./sessionCache.js``、``./matrixValues.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:1727:5707:FUNCTION

.. js:function:: FileNode({ item, value, onChange, context })

   渲染 ``FileNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``26``—``70`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="shrink-0" data-settings-pending={busy || undefined} data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}> <label classNam…``、``<div className={\x60flex min-w-0 flex-col gap-3 rounded-xl border border-border/65 bg-muted/10 p-3 ${preview ? 'sm:flex-row sm:items-center sm:gap-4' : ''}\x60} data-settings-pending={b…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useSettingsLoadingToast``、``resolveValue``、``Boolean``、``resolveResourceUrl``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:5707:6725:FUNCTION

.. js:function:: ActionButton({ action, context, scope = {}, callbacks, disabled = false, variant })

   渲染 ``ActionButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``72``—``82`` 行。

   **参数**

   ``{ action, context, scope = {}, callbacks, disabled = false, variant }``
      调用方传入的 ``action, context, scope = , callbacks, disabled = false, variant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<Button type="button" size="sm" {...presentation} disabled={isDisabled || operation?.busy} aria-busy={operation?.busy || undefined} onClick={() => { void context.execute(action, a…``。

   **主要协作调用**：``matchesCondition``、``operationKey``、``getActionPresentation``、``formatValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6725:6977:FUNCTION

.. js:function:: ActionsNode({ item, context })

   渲染 ``ActionsNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``84``—``86`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex flex-wrap items-start gap-2 py-2">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />)}</…``。

   **主要协作调用**：``(item.actions || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6977:9019:FUNCTION

.. js:function:: ProfileSummaryNode({ item, context })

   A backend-authored summary remains presentation data, not an account page.

   **性质**：同步函数；导出 API；源码第 ``89``—``109`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection className="overflow-visible" variant={item.variant} bodyClassName={item.variant === 'card' ? 'p-4' : ''}> <div className="flex flex-col gap-4 sm:flex-row sm:items…``。

   **主要协作调用**：``resolveValue``、``resolveResourceUrl``、``String(title).slice``、``String``、``item.meta.map``、``item.actions.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9019:9430:FUNCTION

.. js:function:: presentationActions(actions, context)

   实现 ``presentationActions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``111``—``115`` 行。

   **参数**

   ``actions``
      调用方传入的 ``actions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context``
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visible.length ? visible.map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />) : null``。

   **主要协作调用**：``(actions || []).filter``、``visible.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9430:9678:FUNCTION

.. js:function:: ProfileCardNode({ item, context, avatarControl, children })

   渲染 ``ProfileCardNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``117``—``119`` 行。

   **参数**

   ``{ item, context, avatarControl, children }``
      调用方传入的 ``item, context, avatarControl, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<ProfileCard item={item} context={context} avatarControl={avatarControl} actions={presentationActions(item.actions, context)}>{children}</ProfileCard>``。

   **主要协作调用**：``presentationActions``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9678:9855:FUNCTION

.. js:function:: ConnectionCardNode({ item, context })

   渲染 ``ConnectionCardNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``121``—``123`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<ConnectionCard item={item} context={context} actions={presentationActions(item.actions, context)} />``。

   **主要协作调用**：``presentationActions``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9855:14457:FUNCTION

.. js:function:: AsyncOperationNode({ item, context })

   A persisted operation can be inspected again after the settings page reopens.

   **性质**：同步函数；导出 API；源码第 ``126``—``181`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={item.text} description={item.description} variant={item.variant} bodyClassName={item.variant === 'card' ? 'space-y-3 p-4' : 'space-y-3'}> {label && <p clas…``。

   **主要协作调用**：``useRef``、``useState``、``JSON.stringify``、``useEffect``、``[readAction, ...(item.actions || [])].map``、``keys.map((key) => context.operations[key]).filter(Boolean).sort``、``keys.map((key) => context.operations[key]).filter``、``keys.map``、``getValue``、``Boolean``、``item.summary.map``、``(item.actions || []).map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14457:15459:FUNCTION

.. js:function:: TableNode({ item, value, context })

   渲染 ``TableNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``183``—``187`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<p role="alert" className="text-sm text-destructive">表格数据必须是列表。</p>``、``<div className="max-w-full overflow-auto rounded-xl border border-border/70 bg-card"><table className="w-full text-left text-sm"><thead className="bg-muted/35 text-xs text-muted-f…``。

   **主要协作调用**：``resolveValue``、``Array.isArray``、``(item.columns || []).map``、``rows.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15459:16156:FUNCTION

.. js:function:: DiffNode({ item, value, context })

   渲染 ``DiffNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``189``—``193`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="grid gap-3 rounded-xl border p-4 sm:grid-cols-3">{columns.map((column) => <section className="min-w-0 space-y-2" key={column.key}><h4 className="text-sm font-mediu…``。

   **主要协作调用**：``resolveValue``、``Object.keys(data).map``、``Object.keys``、``columns.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16156:18821:FUNCTION

.. js:function:: SecretMapNode({ item, value = EMPTY_MAP, onChange, context })

   渲染 ``SecretMapNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``195``—``223`` 行。

   **参数**

   ``{ item, value = EMPTY_MAP, onChange, context }``
      调用方传入的 ``item, value = EMPTY_MAP, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="space-y-3 rounded-xl border border-border/70 bg-muted/15 p-3" data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}> {rows…``。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``Boolean``、``rows.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18821:26545:FUNCTION

.. js:function:: MatrixNode({ item, value, onChange, context })

   渲染 ``MatrixNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``225``—``291`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={item.text} description={item.description || item.tips} variant={item.variant} bodyClassName={item.variant === 'card' ? 'space-y-3 p-4' : 'space-y-3'}> <div…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useId``、``useRef``、``matrixValueMap``、``matrixRows``、``resolveValue``、``query.trim().toLowerCase``、``query.trim``、``Array.isArray``、``groupDefinitions.map``、``String``、``groupMap.has``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26545:46373:FUNCTION

.. js:function:: ResourceNode({ item, context, renderFields })

   渲染 ``ResourceNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``293``—``504`` 行。

   **参数**

   ``{ item, context, renderFields }``
      调用方传入的 ``item, context, renderFields`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={<span className="flex items-center gap-2">{item.text || item.title}<span className="text-xs font-normal tabular-nums text-muted-foreground">{rows.length} 项…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``settingsResourceCacheKey``、``useState``、``useRef``、``JSON.stringify``、``useCallback``、``useSettingsLoadingToast``、``useEffect``、``useMemo``、``(item.toolbarActions || []).map``、``getSettingsDialogStyle``、``formatValue``、``Object.entries(fieldErrors).map``。

   **内部回调数量**：24。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:46373:47948:FUNCTION

.. js:function:: DescriptorDialog({ open, descriptor, context, renderFields, onClose, onExited })

   渲染 ``DescriptorDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``506``—``522`` 行。

   **参数**

   ``{ open, descriptor, context, renderFields, onClose, onExited }``
      调用方传入的 ``open, descriptor, context, renderFields, onClose, onExited`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}> <DialogContent className="flex max-w-none flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-none" styl…``。

   **主要协作调用**：``useState``、``useEffect``、``useMemo``、``getSettingsDialogStyle``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:2169:3269:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   async choose(event)

实现 ``choose`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``32``—``53`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``setError``、``form.append``、``context.api.post``、``requestEndpoint``、``values.push``、``getValue``、``setUploadedPreview``、``file.text``、``JSON.parse``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:4404:4438:FUNCTION

.. rubric:: ``onChange callback @ 58``

.. code-block:: javascript

   onChange callback @ 58(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:5412:5446:FUNCTION

.. rubric:: ``onChange callback @ 65``

.. code-block:: javascript

   onChange callback @ 65(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6498:6577:FUNCTION

.. rubric:: ``onClick callback @ 79``

.. code-block:: javascript

   onClick callback @ 79()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``ActionButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``context.execute(action, actualScope, callbacks).catch``、``context.execute``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6565:6573:FUNCTION

.. rubric:: ``context.execute(action, actualScope, callbacks).catch callback @ 79``

.. code-block:: javascript

   context.execute(action, actualScope, callbacks).catch callback @ 79()

处理 ``context.execute(action, actualScope, callbacks).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``onClick callback @ 79``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6871:6965:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 85``

.. code-block:: javascript

   (item.actions || []).map callback @ 85(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``ActionsNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:8519:8745:FUNCTION

.. rubric:: ``item.meta.map callback @ 104``

.. code-block:: javascript

   item.meta.map callback @ 104(entry, index)

作为 ``item.meta.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``ProfileSummaryNode``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:8872:8966:FUNCTION

.. rubric:: ``item.actions.map callback @ 106``

.. code-block:: javascript

   item.actions.map callback @ 106(action, index)

作为 ``item.actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``ProfileSummaryNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9213:9280:FUNCTION

.. rubric:: ``(actions || []).filter callback @ 113``

.. code-block:: javascript

   (actions || []).filter callback @ 113(action)

作为 ``(actions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``presentationActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchesCondition``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9324:9418:FUNCTION

.. rubric:: ``visible.map callback @ 114``

.. code-block:: javascript

   visible.map callback @ 114(action, index)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``presentationActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10569:10764:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``135``—``139`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setReading``、``latest.current.execute(readAction).catch(() => {}).finally``、``latest.current.execute(readAction).catch``、``latest.current.execute``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10690:10698:FUNCTION

.. rubric:: ``latest.current.execute(readAction).catch callback @ 138``

.. code-block:: javascript

   latest.current.execute(readAction).catch callback @ 138()

处理 ``latest.current.execute(readAction).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``read``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10708:10755:FUNCTION

.. rubric:: ``latest.current.execute(readAction).catch(() => {}).finally callback @ 138``

.. code-block:: javascript

   latest.current.execute(readAction).catch(() => {}).finally callback @ 138()

处理 ``latest.current.execute(readAction).catch(() => {}).finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``read``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReading``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10781:11063:FUNCTION

.. rubric:: ``useEffect callback @ 140``

.. code-block:: javascript

   useEffect callback @ 140()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``146`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; }``。

**主要协作调用**：``read``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10879:10912:FUNCTION

.. rubric:: ``returned callback @ 143``

.. code-block:: javascript

   returned callback @ 143()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:11143:11231:FUNCTION

.. rubric:: ``[readAction, ...(item.actions || [])].map callback @ 147``

.. code-block:: javascript

   [readAction, ...(item.actions || [])].map callback @ 147(action)

作为 ``[readAction, ...(item.actions || [])].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operationKey``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:11322:11354:FUNCTION

.. rubric:: ``keys.map callback @ 149``

.. code-block:: javascript

   keys.map callback @ 149(key)

作为 ``keys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:11377:11410:FUNCTION

.. rubric:: ``keys.map((key) => context.operations[key]).filter(Boolean).sort callback @ 149``

.. code-block:: javascript

   keys.map((key) => context.operations[key]).filter(Boolean).sort callback @ 149(a, b)

作为 ``keys.map((key) => context.operations[key]).filter(Boolean).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12038:12088:FUNCTION

.. rubric:: ``onSuccess``

.. code-block:: javascript

   onSuccess()

处理 ``Success`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubmitError``、``setUncertain``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12107:12488:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``159``—``167`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSubmitError``、``Number``、``setUncertain``、``read``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13500:13794:FUNCTION

.. rubric:: ``item.summary.map callback @ 177``

.. code-block:: javascript

   item.summary.map callback @ 177(field)

作为 ``item.summary.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``getValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14081:14264:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 179``

.. code-block:: javascript

   (item.actions || []).map callback @ 179(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14958:15044:FUNCTION

.. rubric:: ``(item.columns || []).map callback @ 186``

.. code-block:: javascript

   (item.columns || []).map callback @ 186(column)

作为 ``(item.columns || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``TableNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15076:15322:FUNCTION

.. rubric:: ``rows.map callback @ 186``

.. code-block:: javascript

   rows.map callback @ 186(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``TableNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getValue``、``(item.columns || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15193:15315:FUNCTION

.. rubric:: ``(item.columns || []).map callback @ 186``

.. code-block:: javascript

   (item.columns || []).map callback @ 186(column)

作为 ``(item.columns || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``rows.map callback @ 186``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``getValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15680:15710:FUNCTION

.. rubric:: ``Object.keys(data).map callback @ 191``

.. code-block:: javascript

   Object.keys(data).map callback @ 191(key)

作为 ``Object.keys(data).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``DiffNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15803:16144:FUNCTION

.. rubric:: ``columns.map callback @ 192``

.. code-block:: javascript

   columns.map callback @ 192(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``DiffNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(Array.isArray(data[column.key]) ? data[column.key] : []).map``、``Array.isArray``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16045:16127:FUNCTION

.. rubric:: ``(Array.isArray(data[column.key]) ? data[column.key] : []).map callback @ 192``

.. code-block:: javascript

   (Array.isArray(data[column.key]) ? data[column.key] : []).map callback @ 192(entry, index)

作为 ``(Array.isArray(data[column.key]) ? data[column.key] : []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``columns.map callback @ 192``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16278:16387:FUNCTION

.. rubric:: ``useState callback @ 196``

.. code-block:: javascript

   useState callback @ 196()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries(value || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16316:16386:FUNCTION

.. rubric:: ``Object.entries(value || {}).map callback @ 196``

.. code-block:: javascript

   Object.entries(value || {}).map callback @ 196([key, content])

作为 ``Object.entries(value || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``useState callback @ 196``。

**参数**

``[key, content]``
   调用方传入的 ``key, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16442:16663:FUNCTION

.. rubric:: ``useEffect callback @ 198``

.. code-block:: javascript

   useEffect callback @ 198()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``198``—``202`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRows``、``Object.entries(value || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16583:16653:FUNCTION

.. rubric:: ``Object.entries(value || {}).map callback @ 201``

.. code-block:: javascript

   Object.entries(value || {}).map callback @ 201([key, content])

作为 ``Object.entries(value || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``useEffect callback @ 198``。

**参数**

``[key, content]``
   调用方传入的 ``key, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16739:17218:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``204``—``213`` 行；所属函数 ``SecretMapNode``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRows``、``next.map((row) => row.key).filter``、``next.map``、``next.some``、``setError``、``Object.fromEntries``、``next.filter((row) => row.key).map``、``next.filter``、``onChange``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16807:16823:FUNCTION

.. rubric:: ``next.map callback @ 206``

.. code-block:: javascript

   next.map callback @ 206(row)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16865:16889:FUNCTION

.. rubric:: ``next.some callback @ 207``

.. code-block:: javascript

   next.some callback @ 207(row)

作为 ``next.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.key.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17094:17110:FUNCTION

.. rubric:: ``next.filter callback @ 210``

.. code-block:: javascript

   next.filter callback @ 210(row)

作为 ``next.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17116:17145:FUNCTION

.. rubric:: ``next.filter((row) => row.key).map callback @ 210``

.. code-block:: javascript

   next.filter((row) => row.key).map callback @ 210(row)

作为 ``next.filter((row) => row.key).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17425:18431:FUNCTION

.. rubric:: ``rows.map callback @ 215``

.. code-block:: javascript

   rows.map callback @ 215(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``215``—``219`` 行；所属函数 ``SecretMapNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17680:17787:FUNCTION

.. rubric:: ``onChange callback @ 216``

.. code-block:: javascript

   onChange callback @ 216(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``rows.map callback @ 215``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17707:17785:FUNCTION

.. rubric:: ``rows.map callback @ 216``

.. code-block:: javascript

   rows.map callback @ 216(entry)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``onChange callback @ 216``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18070:18179:FUNCTION

.. rubric:: ``onChange callback @ 217``

.. code-block:: javascript

   onChange callback @ 217(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``217``—``217`` 行；所属函数 ``rows.map callback @ 215``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18097:18177:FUNCTION

.. rubric:: ``rows.map callback @ 217``

.. code-block:: javascript

   rows.map callback @ 217(entry)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``217``—``217`` 行；所属函数 ``onChange callback @ 217``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18318:18375:FUNCTION

.. rubric:: ``onClick callback @ 218``

.. code-block:: javascript

   onClick callback @ 218()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``rows.map callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18343:18373:FUNCTION

.. rubric:: ``rows.filter callback @ 218``

.. code-block:: javascript

   rows.filter callback @ 218(entry)

作为 ``rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``onClick callback @ 218``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18632:18740:FUNCTION

.. rubric:: ``onClick callback @ 221``

.. code-block:: javascript

   onClick callback @ 221()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``crypto.randomUUID``、``setError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18981:19050:FUNCTION

.. rubric:: ``useState callback @ 227``

.. code-block:: javascript

   useState callback @ 227()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``227``—``227`` 行；所属函数 ``MatrixNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19193:19250:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``MatrixNode``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``matrixStoredValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19644:19719:FUNCTION

.. rubric:: ``groupDefinitions.map callback @ 237``

.. code-block:: javascript

   groupDefinitions.map callback @ 237(group)

作为 ``groupDefinitions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20011:20365:FUNCTION

.. rubric:: ``[...groupMap.values()].map callback @ 243``

.. code-block:: javascript

   [...groupMap.values()].map callback @ 243(group)

作为 ``[...groupMap.values()].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``243``—``246`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...group, sourceRows: group.rows, rows: group.rows.filter((row) => !keyword || matchesGroup || \x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includ…``。

**主要协作调用**：``\x60${group.label || ''} ${group.description || ''}\x60.toLowerCase().includes``、``\x60${group.label || ''} ${group.description || ''}\x60.toLowerCase``、``group.rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20224:20354:FUNCTION

.. rubric:: ``group.rows.filter callback @ 245``

.. code-block:: javascript

   group.rows.filter callback @ 245(row)

作为 ``group.rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``245``—``245`` 行；所属函数 ``[...groupMap.values()].map callback @ 243``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includes``、``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20374:20402:FUNCTION

.. rubric:: ``[...groupMap.values()].map((group) => { const matchesGroup = grouped && \x60${group.label || ''} ${group.description || ''… callback @ 246``

.. code-block:: javascript

   [...groupMap.values()].map((group) => { const matchesGroup = grouped && `${group.label || ''} ${group.description || ''… callback @ 246(group)

实现 ``[...groupMap.values()].map((group) => { const matchesGroup = grouped && \x60${group.label || ''} ${group.description || ''…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``246``—``246`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20537:20750:FUNCTION

.. rubric:: ``setRow``

.. code-block:: javascript

   setRow(row, next, current)

设置与 ``Row`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``248``—``251`` 行；所属函数 ``MatrixNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``current`` （默认值 ``values``）
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current``、``{ ...current, [row.id]: next }``。

**主要协作调用**：``row.allowedValues.includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20769:21630:FUNCTION

.. rubric:: ``bulk``

.. code-block:: javascript

   async bulk(action, { rows = allRows, applyGlobalSet = true })

实现 ``bulk`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``252``—``264`` 行；所属函数 ``MatrixNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ rows = allRows, applyGlobalSet = true }`` （默认值 ``{}``）
   调用方传入的 ``rows = allRows, applyGlobalSet = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``context.confirm``、``setRow``、``commit``、``Object.entries``、``context.update``、``path.split``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21655:22999:FUNCTION

.. rubric:: ``renderRows``

.. code-block:: javascript

   renderRows(rows)

渲染与 ``Rows`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``265``—``271`` 行；所属函数 ``MatrixNode``。

**参数**

``rows``
   调用方传入的 ``rows`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``columns.map``、``rows.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21881:21963:FUNCTION

.. rubric:: ``columns.map callback @ 266``

.. code-block:: javascript

   columns.map callback @ 266(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``266``—``266`` 行；所属函数 ``renderRows``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21991:22985:FUNCTION

.. rubric:: ``rows.map callback @ 267``

.. code-block:: javascript

   rows.map callback @ 267(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``267``—``270`` 行；所属函数 ``renderRows``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``columns.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22200:22330:FUNCTION

.. rubric:: ``onValueChange callback @ 267``

.. code-block:: javascript

   onValueChange callback @ 267(next)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``rows.map callback @ 267``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``columns.find``、``commit``、``setRow``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22240:22279:FUNCTION

.. rubric:: ``columns.find callback @ 267``

.. code-block:: javascript

   columns.find callback @ 267(entry)

作为 ``columns.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``onValueChange callback @ 267``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22671:22960:FUNCTION

.. rubric:: ``columns.map callback @ 269``

.. code-block:: javascript

   columns.map callback @ 269(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``269``—``269`` 行；所属函数 ``rows.map callback @ 267``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``row.allowedValues.includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23398:23437:FUNCTION

.. rubric:: ``onChange callback @ 273``

.. code-block:: javascript

   onChange callback @ 273(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``MatrixNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23471:23684:FUNCTION

.. rubric:: ``(item.bulkActions || []).map callback @ 273``

.. code-block:: javascript

   (item.bulkActions || []).map callback @ 273(action)

作为 ``(item.bulkActions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``MatrixNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getActionPresentation``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23606:23634:FUNCTION

.. rubric:: ``onClick callback @ 273``

.. code-block:: javascript

   onClick callback @ 273()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``(item.bulkActions || []).map callback @ 273``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bulk``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23902:26354:FUNCTION

.. rubric:: ``visibleGroups.map callback @ 275``

.. code-block:: javascript

   visibleGroups.map callback @ 275(group)

作为 ``visibleGroups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``275``—``288`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<Card key={group.id} className="min-w-0 gap-0 overflow-hidden rounded-lg py-0 shadow-none" data-matrix-group={group.id}> <div className={\x60flex flex-wrap items-center justify-betwe…``。

**主要协作调用**：``Boolean``、``expanded.has``、``encodeURIComponent``、``group.bulkActions.map``、``renderRows``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24654:24833:FUNCTION

.. rubric:: ``onClick callback @ 280``

.. code-block:: javascript

   onClick callback @ 280()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``280``—``280`` 行；所属函数 ``visibleGroups.map callback @ 275``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24695:24829:FUNCTION

.. rubric:: ``setExpanded callback @ 280``

.. code-block:: javascript

   setExpanded callback @ 280(previous)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``280``—``280`` 行；所属函数 ``onClick callback @ 280``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``next.add``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25541:26157:FUNCTION

.. rubric:: ``group.bulkActions.map callback @ 284``

.. code-block:: javascript

   group.bulkActions.map callback @ 284(action, index)

作为 ``group.bulkActions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``284``—``284`` 行；所属函数 ``visibleGroups.map callback @ 275``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getActionPresentation``、``group.sourceRows.some``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25926:26016:FUNCTION

.. rubric:: ``group.sourceRows.some callback @ 284``

.. code-block:: javascript

   group.sourceRows.some callback @ 284(row)

作为 ``group.sourceRows.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``284``—``284`` 行；所属函数 ``group.bulkActions.map callback @ 284``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.allowedValues.includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26028:26107:FUNCTION

.. rubric:: ``onClick callback @ 284``

.. code-block:: javascript

   onClick callback @ 284()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``284``—``284`` 行；所属函数 ``group.bulkActions.map callback @ 284``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bulk``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26384:26498:FUNCTION

.. rubric:: ``allRows.filter callback @ 288``

.. code-block:: javascript

   allRows.filter callback @ 288(row)

作为 ``allRows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``288``—``288`` 行；所属函数 ``MatrixNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includes``、``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26839:26865:FUNCTION

.. rubric:: ``useState callback @ 296``

.. code-block:: javascript

   useState callback @ 296()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``cache?.get``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27542:27557:FUNCTION

.. rubric:: ``useState callback @ 307``

.. code-block:: javascript

   useState callback @ 307()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28178:29551:FUNCTION

.. rubric:: ``useCallback callback @ 320``

.. code-block:: javascript

   async useCallback callback @ 320({ silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``320``—``340`` 行；所属函数 ``ResourceNode``。

**参数**

``{ silent = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('资源接口没有返回列表。')``。

**主要协作调用**：``requestController.current?.abort``、``setLoading``、``setError``、``source.endpoint?.startsWith``、``ctx.client.read``、``source.endpoint.slice``、``ctx.api.get``、``requestEndpoint``、``resolveValue``、``getValue``、``Array.isArray``、``setRows``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29887:30431:FUNCTION

.. rubric:: ``useEffect callback @ 344``

.. code-block:: javascript

   useEffect callback @ 344()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``344``—``353`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; epoch.current += 1; requestController.current?.abort(); detail.serial += 1; detail.controller?.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``cache?.get``、``setRows``、``setLoading``、``setError``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30167:30304:FUNCTION

.. rubric:: ``returned callback @ 350``

.. code-block:: javascript

   returned callback @ 350()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``350``—``350`` 行；所属函数 ``useEffect callback @ 344``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestController.current?.abort``、``detail.controller?.abort``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30457:30507:FUNCTION

.. rubric:: ``useEffect callback @ 354``

.. code-block:: javascript

   useEffect callback @ 354()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``354``—``354`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``registerResource``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30571:31077:FUNCTION

.. rubric:: ``useEffect callback @ 355``

.. code-block:: javascript

   useEffect callback @ 355()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``355``—``361`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { subscriptions.forEach((unsubscribe) => unsubscribe?.()); local?.(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``(item.events || []).map``、``source.endpoint?.startsWith``、``client.subscribe``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30634:30685:FUNCTION

.. rubric:: ``(item.events || []).map callback @ 356``

.. code-block:: javascript

   (item.events || []).map callback @ 356(event)

作为 ``(item.events || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``useEffect callback @ 355``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscribe``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30661:30684:FUNCTION

.. rubric:: ``subscribe callback @ 356``

.. code-block:: javascript

   subscribe callback @ 356()

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``(item.events || []).map callback @ 356``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30928:30966:FUNCTION

.. rubric:: ``client.subscribe callback @ 359``

.. code-block:: javascript

   client.subscribe callback @ 359()

实现 ``client.subscribe`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``359``—``359`` 行；所属函数 ``useEffect callback @ 355``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30991:31069:FUNCTION

.. rubric:: ``returned callback @ 360``

.. code-block:: javascript

   returned callback @ 360()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``360``—``360`` 行；所属函数 ``useEffect callback @ 355``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscriptions.forEach``、``local``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31022:31054:FUNCTION

.. rubric:: ``subscriptions.forEach callback @ 360``

.. code-block:: javascript

   subscriptions.forEach callback @ 360(unsubscribe)

作为 ``subscriptions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``360``—``360`` 行；所属函数 ``returned callback @ 360``。

**参数**

``unsubscribe``
   调用方传入的 ``unsubscribe`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31152:31492:FUNCTION

.. rubric:: ``useEffect callback @ 362``

.. code-block:: javascript

   useEffect callback @ 362()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``362``—``366`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``registerDraftGuard(\x60${item.id || item.name}:editor\x60, async () => JSON.stringify(editor.initial) === JSON.stringify(editor.values) || confirm({ title: '放弃未保存的更改？', description: '离开…``。

**主要协作调用**：``registerDraftGuard``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31306:31483:FUNCTION

.. rubric:: ``registerDraftGuard callback @ 364``

.. code-block:: javascript

   async registerDraftGuard callback @ 364()

注册与 ``Draft Guard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``364``—``365`` 行；所属函数 ``useEffect callback @ 362``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``、``confirm``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31602:33581:FUNCTION

.. rubric:: ``useCallback callback @ 367``

.. code-block:: javascript

   async useCallback callback @ 367(record)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``367``—``391`` 行；所属函数 ``ResourceNode``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``detailRequest.current.controller?.abort``、``pageValues``、``cloneData``、``startTransition``、``context.api.get``、``requestEndpoint``、``getValue``、``setEditorError``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:32229:32499:FUNCTION

.. rubric:: ``startTransition callback @ 377``

.. code-block:: javascript

   startTransition callback @ 377()

启动与 ``Transition`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``377``—``380`` 行；所属函数 ``useCallback callback @ 367``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditorBusy``、``Boolean``、``setEditorError``、``setFieldErrors``、``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:32365:32486:FUNCTION

.. rubric:: ``setEditor callback @ 379``

.. code-block:: javascript

   setEditor callback @ 379(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``379``—``379`` 行；所属函数 ``startTransition callback @ 377``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33064:33247:FUNCTION

.. rubric:: ``startTransition callback @ 386``

.. code-block:: javascript

   startTransition callback @ 386()

启动与 ``Transition`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``386``—``387`` 行；所属函数 ``useCallback callback @ 367``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33080:33246:FUNCTION

.. rubric:: ``setEditor callback @ 386``

.. code-block:: javascript

   setEditor callback @ 386(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``386``—``387`` 行；所属函数 ``startTransition callback @ 386``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cloneData``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33544:33570:FUNCTION

.. rubric:: ``startTransition callback @ 390``

.. code-block:: javascript

   startTransition callback @ 390()

启动与 ``Transition`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``390``—``390`` 行；所属函数 ``useCallback callback @ 367``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditorBusy``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33623:33851:FUNCTION

.. rubric:: ``patchEditor``

.. code-block:: javascript

   patchEditor(patch, target)

实现 ``patchEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``392``—``394`` 行；所属函数 ``ResourceNode``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target`` （默认值 ``'form'``）
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33662:33850:FUNCTION

.. rubric:: ``setEditor callback @ 392``

.. code-block:: javascript

   setEditor callback @ 392(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``392``—``394`` 行；所属函数 ``patchEditor``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``、``target.replace``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33879:34190:FUNCTION

.. rubric:: ``dismissEditor``

.. code-block:: javascript

   dismissEditor(serial)

实现 ``dismissEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``395``—``401`` 行；所属函数 ``ResourceNode``。

**参数**

``serial``
   调用方传入的 ``serial`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``detailRequest.current.controller?.abort``、``setEditorBusy``、``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34102:34181:FUNCTION

.. rubric:: ``setEditor callback @ 400``

.. code-block:: javascript

   setEditor callback @ 400(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``400``—``400`` 行；所属函数 ``dismissEditor``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34216:34558:FUNCTION

.. rubric:: ``closeEditor``

.. code-block:: javascript

   async closeEditor()

关闭与 ``Editor`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``402``—``407`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``、``context.confirm``、``dismissEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34665:35836:FUNCTION

.. rubric:: ``onSave``

.. code-block:: javascript

   async onSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``409``—``422`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``validateSettingsScope``、``setEditorError``、``validateSettingsFields``、``setFieldErrors``、``Object.keys``、``context.execute``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35332:35428:FUNCTION

.. rubric:: ``patchForm``

.. code-block:: javascript

   patchForm(patch, target)

实现 ``patchForm`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``onSave``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35453:35634:FUNCTION

.. rubric:: ``onSuccess``

.. code-block:: javascript

   async onSuccess()

处理 ``Success`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``419``—``419`` 行；所属函数 ``onSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dismissEditor``、``(editorAction.effects || []).some``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35530:35616:FUNCTION

.. rubric:: ``(editorAction.effects || []).some callback @ 419``

.. code-block:: javascript

   (editorAction.effects || []).some callback @ 419(effect)

作为 ``(editorAction.effects || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``419``—``419`` 行；所属函数 ``onSuccess``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35657:35815:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``420``—``420`` 行；所属函数 ``onSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setEditorError``、``setFieldErrors``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35945:40694:FUNCTION

.. rubric:: ``useMemo callback @ 424``

.. code-block:: javascript

   useMemo callback @ 424()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``424``—``461`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``item.display === 'table' && columns.length ? <div className="overflow-auto rounded-xl border border-border/70"><table className="w-full text-left text-sm"><thead className="bg-mut…``。

**主要协作调用**：``columns.map``、``rows.map``、``renderCards``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35980:37140:FUNCTION

.. rubric:: ``actionsFor``

.. code-block:: javascript

   actionsFor(record)

实现 ``actionsFor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``425``—``432`` 行；所属函数 ``useMemo callback @ 424``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``<div className="flex flex-wrap items-start gap-2">{visible.map((action, index) => action.kind === 'edit' ? <Button key={action.id || index} type="button" size="sm" {...getActionPr…``。

**主要协作调用**：``(item.actions || []).filter``、``visible.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36145:36212:FUNCTION

.. rubric:: ``(item.actions || []).filter callback @ 427``

.. code-block:: javascript

   (item.actions || []).filter callback @ 427(action)

作为 ``(item.actions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``427``—``427`` 行；所属函数 ``actionsFor``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchesCondition``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36345:37120:FUNCTION

.. rubric:: ``visible.map callback @ 429``

.. code-block:: javascript

   visible.map callback @ 429(action, index)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``429``—``431`` 行；所属函数 ``actionsFor``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getActionPresentation``、``matchesCondition``、``conflictingActions.has``、``operationKey``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36636:36670:FUNCTION

.. rubric:: ``onClick callback @ 430``

.. code-block:: javascript

   onClick callback @ 430()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``visible.map callback @ 429``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36977:37114:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``431``—``431`` 行；所属函数 ``visible.map callback @ 429``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setConflictingActions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37045:37110:FUNCTION

.. rubric:: ``setConflictingActions callback @ 431``

.. code-block:: javascript

   setConflictingActions callback @ 431(previous)

设置与 ``Conflicting Actions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``431``—``431`` 行；所属函数 ``onError``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operationKey``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37213:37443:FUNCTION

.. rubric:: ``valueText``

.. code-block:: javascript

   valueText(record, column)

实现 ``valueText`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``434``—``437`` 行；所属函数 ``useMemo callback @ 424``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Object.hasOwn(column.labels || {}, String(value)) ? column.labels[String(value)] : displayValue(value)``。

**主要协作调用**：``getValue``、``Object.hasOwn``、``String``、``displayValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37473:39878:FUNCTION

.. rubric:: ``renderCards``

.. code-block:: javascript

   renderCards()

渲染与 ``Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``438``—``458`` 行；所属函数 ``useMemo callback @ 424``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37536:39857:FUNCTION

.. rubric:: ``rows.map callback @ 438``

.. code-block:: javascript

   rows.map callback @ 438(record, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``438``—``458`` 行；所属函数 ``renderCards``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ConnectionCard key={getValue(record, item.keyField || 'id', index)} item={{ ...item, ...item.recordView }} record={record} context={context} actions={actions} />``、``<article className="min-w-0 overflow-hidden rounded-lg border bg-card" key={getValue(record, item.keyField || 'id', index)}> <div className="p-4"> <div className="flex min-w-0 ite…``。

**主要协作调用**：``actionsFor``、``getValue``、``columns.filter``、``displayValue``、``item.badges.map``、``properties.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:38099:38192:FUNCTION

.. rubric:: ``columns.filter callback @ 443``

.. code-block:: javascript

   columns.filter callback @ 443(column)

作为 ``columns.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``443``—``443`` 行；所属函数 ``rows.map callback @ 438``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39096:39271:FUNCTION

.. rubric:: ``item.badges.map callback @ 451``

.. code-block:: javascript

   item.badges.map callback @ 451(badge)

作为 ``item.badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``451``—``451`` 行；所属函数 ``rows.map callback @ 438``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39473:39705:FUNCTION

.. rubric:: ``properties.map callback @ 454``

.. code-block:: javascript

   properties.map callback @ 454(column)

作为 ``properties.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``454``—``454`` 行；所属函数 ``rows.map callback @ 438``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40129:40213:FUNCTION

.. rubric:: ``columns.map callback @ 459``

.. code-block:: javascript

   columns.map callback @ 459(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``459``—``459`` 行；所属函数 ``useMemo callback @ 424``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40290:40625:FUNCTION

.. rubric:: ``rows.map callback @ 459``

.. code-block:: javascript

   rows.map callback @ 459(record, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``459``—``459`` 行；所属函数 ``useMemo callback @ 424``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getValue``、``columns.map``、``actionsFor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40453:40567:FUNCTION

.. rubric:: ``columns.map callback @ 459``

.. code-block:: javascript

   columns.map callback @ 459(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``459``—``459`` 行；所属函数 ``rows.map callback @ 459``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40838:40966:FUNCTION

.. rubric:: ``useCallback callback @ 463``

.. code-block:: javascript

   useCallback callback @ 463(values)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``463``—``464`` 行；所属函数 ``ResourceNode``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40860:40965:FUNCTION

.. rubric:: ``setEditor callback @ 463``

.. code-block:: javascript

   setEditor callback @ 463(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``463``—``464`` 行；所属函数 ``useCallback callback @ 463``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:41179:41632:FUNCTION

.. rubric:: ``useMemo callback @ 467``

.. code-block:: javascript

   useMemo callback @ 467()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``467``—``471`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderFields``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:41975:41997:FUNCTION

.. rubric:: ``onClick callback @ 473``

.. code-block:: javascript

   onClick callback @ 473()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``473``—``473`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:42083:42177:FUNCTION

.. rubric:: ``(item.toolbarActions || []).map callback @ 474``

.. code-block:: javascript

   (item.toolbarActions || []).map callback @ 474(action, index)

作为 ``(item.toolbarActions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``474``—``474`` 行；所属函数 ``ResourceNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:42312:42344:FUNCTION

.. rubric:: ``onClick callback @ 475``

.. code-block:: javascript

   onClick callback @ 475()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``475``—``475`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:43778:43800:FUNCTION

.. rubric:: ``onClick callback @ 483``

.. code-block:: javascript

   onClick callback @ 483()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``483``—``483`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:43939:43983:FUNCTION

.. rubric:: ``onOpenChange callback @ 486``

.. code-block:: javascript

   onOpenChange callback @ 486(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``486``—``486`` 行；所属函数 ``ResourceNode``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:44194:44495:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 488``

.. code-block:: javascript

   onCloseAutoFocus callback @ 488()

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``488``—``492`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:44392:44474:FUNCTION

.. rubric:: ``setEditor callback @ 491``

.. code-block:: javascript

   setEditor callback @ 491(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``491``—``491`` 行；所属函数 ``onCloseAutoFocus callback @ 488``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:45297:45392:FUNCTION

.. rubric:: ``Object.entries(fieldErrors).map callback @ 496``

.. code-block:: javascript

   Object.entries(fieldErrors).map callback @ 496([field, message])

作为 ``Object.entries(fieldErrors).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``496``—``496`` 行；所属函数 ``ResourceNode``。

**参数**

``[field, message]``
   调用方传入的 ``field, message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:45810:45839:FUNCTION

.. rubric:: ``onClick callback @ 500``

.. code-block:: javascript

   onClick callback @ 500()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``500``—``500`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:46227:46267:FUNCTION

.. rubric:: ``onClick callback @ 500``

.. code-block:: javascript

   onClick callback @ 500()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``500``—``500`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSave().catch``、``onSave``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:46255:46263:FUNCTION

.. rubric:: ``onSave().catch callback @ 500``

.. code-block:: javascript

   onSave().catch callback @ 500()

处理 ``onSave().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``500``—``500`` 行；所属函数 ``onClick callback @ 500``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:46518:46595:FUNCTION

.. rubric:: ``useState callback @ 507``

.. code-block:: javascript

   useState callback @ 507()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``507``—``507`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pageValues``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:46613:46706:FUNCTION

.. rubric:: ``useEffect callback @ 508``

.. code-block:: javascript

   useEffect callback @ 508()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``508``—``508`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``、``pageValues``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:46749:46998:FUNCTION

.. rubric:: ``useMemo callback @ 509``

.. code-block:: javascript

   useMemo callback @ 509()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``509``—``511`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderFields``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:47107:47142:FUNCTION

.. rubric:: ``onOpenChange callback @ 512``

.. code-block:: javascript

   onOpenChange callback @ 512(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``512``—``512`` 行；所属函数 ``DescriptorDialog``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。
