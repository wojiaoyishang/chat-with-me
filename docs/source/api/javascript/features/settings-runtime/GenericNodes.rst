src/features/settings-runtime/GenericNodes 模块
==================================================================================================

.. js:module:: src/features/settings-runtime/GenericNodes

A display-only image primitive; QR and other views are authored by the backend.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/GenericNodes.jsx``
* **模块标识**：``src/features/settings-runtime/GenericNodes``
* **顶层函数/组件/Hook**：16
* **类**：0
* **局部函数与匿名回调**：141

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/components/ui/radio-group``、``@/components/ui/badge``、``@/components/ui/card``、``@/components/ui/spinner``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``./model.js``、``./useActionExecutor.js``、``./validation.js``、``./SettingsPresentation.jsx``、``./displayValue.js``、``./SettingsCards.jsx``、``./SettingsFormLayout.jsx``、``./SettingsActionLabel.jsx``、``./actionPresentation.js``、``./dialogSizing.js``、``./loadingToasts.js``、``./sessionCache.js``、``./matrixValues.js``、``./readonlyImage.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:1914:2682:FUNCTION

.. js:function:: ReadonlyImageNode({ item, value })

   A display-only image primitive; QR and other views are authored by the backend.

   **性质**：同步函数；导出 API；源码第 ``30``—``38`` 行。

   **参数**

   ``{ item, value }``
      调用方传入的 ``item, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<p role="alert" className="text-sm text-muted-foreground">图片暂不可用</p>``、``<figure className="flex min-w-0 flex-col items-center gap-3 py-3"> <img src={resolveResourceUrl(source)} alt={item.alt || item.text || ''} width={readonlyImageSize(item.width)} he…``。

   **主要协作调用**：``readonlyImageSource``、``resolveResourceUrl``、``readonlyImageSize``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:2682:6662:FUNCTION

.. js:function:: FileNode({ item, value, onChange, context })

   渲染 ``FileNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``40``—``84`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="shrink-0" data-settings-pending={busy || undefined} data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}> <label classNam…``、``<div className={\x60flex min-w-0 flex-col gap-3 rounded-xl border border-border/65 bg-muted/10 p-3 ${preview ? 'sm:flex-row sm:items-center sm:gap-4' : ''}\x60} data-settings-pending={b…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useSettingsLoadingToast``、``resolveValue``、``Boolean``、``resolveResourceUrl``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6662:7680:FUNCTION

.. js:function:: ActionButton({ action, context, scope = {}, callbacks, disabled = false, variant })

   渲染 ``ActionButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``86``—``96`` 行。

   **参数**

   ``{ action, context, scope = {}, callbacks, disabled = false, variant }``
      调用方传入的 ``action, context, scope = , callbacks, disabled = false, variant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<Button type="button" size="sm" {...presentation} disabled={isDisabled || operation?.busy} aria-busy={operation?.busy || undefined} onClick={() => { void context.execute(action, a…``。

   **主要协作调用**：``matchesCondition``、``operationKey``、``getActionPresentation``、``formatValue``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:7680:7932:FUNCTION

.. js:function:: ActionsNode({ item, context })

   渲染 ``ActionsNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``98``—``100`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex flex-wrap items-start gap-2 py-2">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />)}</…``。

   **主要协作调用**：``(item.actions || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:7932:10160:FUNCTION

.. js:function:: ReadonlyTextNode({ item, value, context })

   Read-only content stays selectable; clipboard access occurs only on a user click.

   **性质**：同步函数；导出 API；源码第 ``103``—``129`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<section className="flex min-w-0 flex-wrap items-center justify-between gap-x-5 gap-y-2 py-3"> <div className="min-w-0"><div className="text-sm font-medium">{item.text}</div>{item…``、``<section className="min-w-0 space-y-2"> <div className="flex items-center justify-between gap-3"> <div className="min-w-0"><div className="text-sm font-medium">{item.text}</div>{i…``。

   **主要协作调用**：``displayValue``、``Number.isFinite``、``date.getTime``、``date.toLocaleString``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:10160:12202:FUNCTION

.. js:function:: ProfileSummaryNode({ item, context })

   A backend-authored summary remains presentation data, not an account page.

   **性质**：同步函数；导出 API；源码第 ``132``—``152`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection className="overflow-visible" variant={item.variant} bodyClassName={item.variant === 'card' ? 'p-4' : ''}> <div className="flex flex-col gap-4 sm:flex-row sm:items…``。

   **主要协作调用**：``resolveValue``、``resolveResourceUrl``、``String(title).slice``、``String``、``item.meta.map``、``item.actions.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12202:12613:FUNCTION

.. js:function:: presentationActions(actions, context)

   实现 ``presentationActions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``154``—``158`` 行。

   **参数**

   ``actions``
      调用方传入的 ``actions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``context``
      调用方传入的 ``context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visible.length ? visible.map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />) : null``。

   **主要协作调用**：``(actions || []).filter``、``visible.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12613:12861:FUNCTION

.. js:function:: ProfileCardNode({ item, context, avatarControl, children })

   渲染 ``ProfileCardNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``160``—``162`` 行。

   **参数**

   ``{ item, context, avatarControl, children }``
      调用方传入的 ``item, context, avatarControl, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<ProfileCard item={item} context={context} avatarControl={avatarControl} actions={presentationActions(item.actions, context)}>{children}</ProfileCard>``。

   **主要协作调用**：``presentationActions``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12861:13038:FUNCTION

.. js:function:: ConnectionCardNode({ item, context })

   渲染 ``ConnectionCardNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``164``—``166`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<ConnectionCard item={item} context={context} actions={presentationActions(item.actions, context)} />``。

   **主要协作调用**：``presentationActions``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13038:18012:FUNCTION

.. js:function:: AsyncOperationNode({ item, context })

   A persisted operation can be inspected again after the settings page reopens.

   **性质**：同步函数；导出 API；源码第 ``169``—``227`` 行。

   **参数**

   ``{ item, context }``
      调用方传入的 ``item, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={item.text} description={item.description} variant={item.variant} bodyClassName={item.variant === 'card' ? 'space-y-3 p-4' : 'space-y-3'}> {label && <p clas…``。

   **副作用**

   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useRef``、``useState``、``JSON.stringify``、``useEffect``、``[readAction, ...(item.actions || [])].map``、``keys.map((key) => context.operations[key]).filter(Boolean).sort``、``keys.map((key) => context.operations[key]).filter``、``keys.map``、``getValue``、``Boolean``、``formatValue``、``item.summary.map``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18012:19014:FUNCTION

.. js:function:: TableNode({ item, value, context })

   渲染 ``TableNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``229``—``233`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<p role="alert" className="text-sm text-destructive">表格数据必须是列表。</p>``、``<div className="max-w-full overflow-auto rounded-xl border border-border/70 bg-card"><table className="w-full text-left text-sm"><thead className="bg-muted/35 text-xs text-muted-f…``。

   **主要协作调用**：``resolveValue``、``Array.isArray``、``(item.columns || []).map``、``rows.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19014:19711:FUNCTION

.. js:function:: DiffNode({ item, value, context })

   渲染 ``DiffNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``235``—``239`` 行。

   **参数**

   ``{ item, value, context }``
      调用方传入的 ``item, value, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="grid gap-3 rounded-xl border p-4 sm:grid-cols-3">{columns.map((column) => <section className="min-w-0 space-y-2" key={column.key}><h4 className="text-sm font-mediu…``。

   **主要协作调用**：``resolveValue``、``Object.keys(data).map``、``Object.keys``、``columns.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19711:22376:FUNCTION

.. js:function:: SecretMapNode({ item, value = EMPTY_MAP, onChange, context })

   渲染 ``SecretMapNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``241``—``269`` 行。

   **参数**

   ``{ item, value = EMPTY_MAP, onChange, context }``
      调用方传入的 ``item, value = EMPTY_MAP, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="space-y-3 rounded-xl border border-border/70 bg-muted/15 p-3" data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}> {rows…``。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``Boolean``、``rows.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22376:30100:FUNCTION

.. js:function:: MatrixNode({ item, value, onChange, context })

   渲染 ``MatrixNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``271``—``337`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsSection title={item.text} description={item.description || item.tips} variant={item.variant} bodyClassName={item.variant === 'card' ? 'space-y-3 p-4' : 'space-y-3'}> <div…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useId``、``useRef``、``matrixValueMap``、``matrixRows``、``resolveValue``、``query.trim().toLowerCase``、``query.trim``、``Array.isArray``、``groupDefinitions.map``、``String``、``groupMap.has``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30100:49928:FUNCTION

.. js:function:: ResourceNode({ item, context, renderFields })

   渲染 ``ResourceNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``339``—``550`` 行。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:49928:52337:FUNCTION

.. js:function:: DescriptorDialog({ open, descriptor, context, renderFields, onClose, onExited })

   渲染 ``DescriptorDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``552``—``580`` 行。

   **参数**

   ``{ open, descriptor, context, renderFields, onClose, onExited }``
      调用方传入的 ``open, descriptor, context, renderFields, onClose, onExited`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Dialog open={open} closeOnBack={!locked} lockInteraction={locked} onOpenChange={(next) => { if (!next) onClose(); }}> <DialogContent className="flex max-w-none flex-col gap-0 ove…``。

   **主要协作调用**：``useState``、``useId``、``useEffect``、``useMemo``、``getSettingsDialogStyle``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:3124:4224:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   async choose(event)

实现 ``choose`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``46``—``67`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``setError``、``form.append``、``context.api.post``、``requestEndpoint``、``values.push``、``getValue``、``setUploadedPreview``、``file.text``、``JSON.parse``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:5359:5393:FUNCTION

.. rubric:: ``onChange callback @ 72``

.. code-block:: javascript

   onChange callback @ 72(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:6367:6401:FUNCTION

.. rubric:: ``onChange callback @ 79``

.. code-block:: javascript

   onChange callback @ 79(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``FileNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:7453:7532:FUNCTION

.. rubric:: ``onClick callback @ 93``

.. code-block:: javascript

   onClick callback @ 93()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``ActionButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``context.execute(action, actualScope, callbacks).catch``、``context.execute``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:7520:7528:FUNCTION

.. rubric:: ``context.execute(action, actualScope, callbacks).catch callback @ 93``

.. code-block:: javascript

   context.execute(action, actualScope, callbacks).catch callback @ 93()

处理 ``context.execute(action, actualScope, callbacks).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``onClick callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:7826:7920:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 99``

.. code-block:: javascript

   (item.actions || []).map callback @ 99(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``99``—``99`` 行；所属函数 ``ActionsNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:8372:8583:FUNCTION

.. rubric:: ``copy``

.. code-block:: javascript

   async copy()

实现 ``copy`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``107``—``114`` 行；所属函数 ``ReadonlyTextNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copyTextToClipboard``、``toast.success``、``toast.error``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9201:9223:FUNCTION

.. rubric:: ``onClick callback @ 119``

.. code-block:: javascript

   onClick callback @ 119()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``ReadonlyTextNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copy``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:9810:9832:FUNCTION

.. rubric:: ``onClick callback @ 125``

.. code-block:: javascript

   onClick callback @ 125()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``ReadonlyTextNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copy``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:11702:11928:FUNCTION

.. rubric:: ``item.meta.map callback @ 147``

.. code-block:: javascript

   item.meta.map callback @ 147(entry, index)

作为 ``item.meta.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``ProfileSummaryNode``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12055:12149:FUNCTION

.. rubric:: ``item.actions.map callback @ 149``

.. code-block:: javascript

   item.actions.map callback @ 149(action, index)

作为 ``item.actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``ProfileSummaryNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12396:12463:FUNCTION

.. rubric:: ``(actions || []).filter callback @ 156``

.. code-block:: javascript

   (actions || []).filter callback @ 156(action)

作为 ``(actions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``presentationActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchesCondition``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:12507:12601:FUNCTION

.. rubric:: ``visible.map callback @ 157``

.. code-block:: javascript

   visible.map callback @ 157(action, index)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``presentationActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13752:13947:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``178``—``182`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setReading``、``latest.current.execute(readAction).catch(() => {}).finally``、``latest.current.execute(readAction).catch``、``latest.current.execute``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13873:13881:FUNCTION

.. rubric:: ``latest.current.execute(readAction).catch callback @ 181``

.. code-block:: javascript

   latest.current.execute(readAction).catch callback @ 181()

处理 ``latest.current.execute(readAction).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``read``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13891:13938:FUNCTION

.. rubric:: ``latest.current.execute(readAction).catch(() => {}).finally callback @ 181``

.. code-block:: javascript

   latest.current.execute(readAction).catch(() => {}).finally callback @ 181()

处理 ``latest.current.execute(readAction).catch(() => {}).finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``read``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReading``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:13964:14246:FUNCTION

.. rubric:: ``useEffect callback @ 183``

.. code-block:: javascript

   useEffect callback @ 183()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``183``—``189`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; }``。

**主要协作调用**：``read``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14062:14095:FUNCTION

.. rubric:: ``returned callback @ 186``

.. code-block:: javascript

   returned callback @ 186()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``useEffect callback @ 183``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14326:14414:FUNCTION

.. rubric:: ``[readAction, ...(item.actions || [])].map callback @ 190``

.. code-block:: javascript

   [readAction, ...(item.actions || [])].map callback @ 190(action)

作为 ``[readAction, ...(item.actions || [])].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operationKey``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14505:14537:FUNCTION

.. rubric:: ``keys.map callback @ 192``

.. code-block:: javascript

   keys.map callback @ 192(key)

作为 ``keys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:14560:14593:FUNCTION

.. rubric:: ``keys.map((key) => context.operations[key]).filter(Boolean).sort callback @ 192``

.. code-block:: javascript

   keys.map((key) => context.operations[key]).filter(Boolean).sort callback @ 192(a, b)

作为 ``keys.map((key) => context.operations[key]).filter(Boolean).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15221:15271:FUNCTION

.. rubric:: ``onSuccess``

.. code-block:: javascript

   onSuccess()

处理 ``Success`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubmitError``、``setUncertain``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:15290:15671:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``202``—``210`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSubmitError``、``Number``、``setUncertain``、``read``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:16898:17192:FUNCTION

.. rubric:: ``item.summary.map callback @ 223``

.. code-block:: javascript

   item.summary.map callback @ 223(field)

作为 ``item.summary.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``223``—``223`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``getValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17479:17662:FUNCTION

.. rubric:: ``(item.actions || []).map callback @ 225``

.. code-block:: javascript

   (item.actions || []).map callback @ 225(action, index)

作为 ``(item.actions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``225``—``225`` 行；所属函数 ``AsyncOperationNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:17736:17768:FUNCTION

.. rubric:: ``onClick callback @ 225``

.. code-block:: javascript

   onClick callback @ 225()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``225``—``225`` 行；所属函数 ``AsyncOperationNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``context.navigate``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18513:18599:FUNCTION

.. rubric:: ``(item.columns || []).map callback @ 232``

.. code-block:: javascript

   (item.columns || []).map callback @ 232(column)

作为 ``(item.columns || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``TableNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18631:18877:FUNCTION

.. rubric:: ``rows.map callback @ 232``

.. code-block:: javascript

   rows.map callback @ 232(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``TableNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getValue``、``(item.columns || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:18748:18870:FUNCTION

.. rubric:: ``(item.columns || []).map callback @ 232``

.. code-block:: javascript

   (item.columns || []).map callback @ 232(column)

作为 ``(item.columns || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``rows.map callback @ 232``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``、``getValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19235:19265:FUNCTION

.. rubric:: ``Object.keys(data).map callback @ 237``

.. code-block:: javascript

   Object.keys(data).map callback @ 237(key)

作为 ``Object.keys(data).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``DiffNode``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19358:19699:FUNCTION

.. rubric:: ``columns.map callback @ 238``

.. code-block:: javascript

   columns.map callback @ 238(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``DiffNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(Array.isArray(data[column.key]) ? data[column.key] : []).map``、``Array.isArray``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19600:19682:FUNCTION

.. rubric:: ``(Array.isArray(data[column.key]) ? data[column.key] : []).map callback @ 238``

.. code-block:: javascript

   (Array.isArray(data[column.key]) ? data[column.key] : []).map callback @ 238(entry, index)

作为 ``(Array.isArray(data[column.key]) ? data[column.key] : []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``columns.map callback @ 238``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19833:19942:FUNCTION

.. rubric:: ``useState callback @ 242``

.. code-block:: javascript

   useState callback @ 242()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.entries(value || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19871:19941:FUNCTION

.. rubric:: ``Object.entries(value || {}).map callback @ 242``

.. code-block:: javascript

   Object.entries(value || {}).map callback @ 242([key, content])

作为 ``Object.entries(value || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``useState callback @ 242``。

**参数**

``[key, content]``
   调用方传入的 ``key, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:19997:20218:FUNCTION

.. rubric:: ``useEffect callback @ 244``

.. code-block:: javascript

   useEffect callback @ 244()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``244``—``248`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRows``、``Object.entries(value || {}).map``、``Object.entries``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20138:20208:FUNCTION

.. rubric:: ``Object.entries(value || {}).map callback @ 247``

.. code-block:: javascript

   Object.entries(value || {}).map callback @ 247([key, content])

作为 ``Object.entries(value || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``useEffect callback @ 244``。

**参数**

``[key, content]``
   调用方传入的 ``key, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``crypto.randomUUID``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20294:20773:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``250``—``259`` 行；所属函数 ``SecretMapNode``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setRows``、``next.map((row) => row.key).filter``、``next.map``、``next.some``、``setError``、``Object.fromEntries``、``next.filter((row) => row.key).map``、``next.filter``、``onChange``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20362:20378:FUNCTION

.. rubric:: ``next.map callback @ 252``

.. code-block:: javascript

   next.map callback @ 252(row)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20420:20444:FUNCTION

.. rubric:: ``next.some callback @ 253``

.. code-block:: javascript

   next.some callback @ 253(row)

作为 ``next.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.key.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20649:20665:FUNCTION

.. rubric:: ``next.filter callback @ 256``

.. code-block:: javascript

   next.filter callback @ 256(row)

作为 ``next.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``256``—``256`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20671:20700:FUNCTION

.. rubric:: ``next.filter((row) => row.key).map callback @ 256``

.. code-block:: javascript

   next.filter((row) => row.key).map callback @ 256(row)

作为 ``next.filter((row) => row.key).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``256``—``256`` 行；所属函数 ``commit``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:20980:21986:FUNCTION

.. rubric:: ``rows.map callback @ 261``

.. code-block:: javascript

   rows.map callback @ 261(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``261``—``265`` 行；所属函数 ``SecretMapNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21235:21342:FUNCTION

.. rubric:: ``onChange callback @ 262``

.. code-block:: javascript

   onChange callback @ 262(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``rows.map callback @ 261``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21262:21340:FUNCTION

.. rubric:: ``rows.map callback @ 262``

.. code-block:: javascript

   rows.map callback @ 262(entry)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``onChange callback @ 262``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21625:21734:FUNCTION

.. rubric:: ``onChange callback @ 263``

.. code-block:: javascript

   onChange callback @ 263(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``rows.map callback @ 261``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21652:21732:FUNCTION

.. rubric:: ``rows.map callback @ 263``

.. code-block:: javascript

   rows.map callback @ 263(entry)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``onChange callback @ 263``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21873:21930:FUNCTION

.. rubric:: ``onClick callback @ 264``

.. code-block:: javascript

   onClick callback @ 264()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``rows.map callback @ 261``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commit``、``rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:21898:21928:FUNCTION

.. rubric:: ``rows.filter callback @ 264``

.. code-block:: javascript

   rows.filter callback @ 264(entry)

作为 ``rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``onClick callback @ 264``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22187:22295:FUNCTION

.. rubric:: ``onClick callback @ 267``

.. code-block:: javascript

   onClick callback @ 267()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``SecretMapNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``crypto.randomUUID``、``setError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22536:22605:FUNCTION

.. rubric:: ``useState callback @ 273``

.. code-block:: javascript

   useState callback @ 273()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``MatrixNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:22748:22805:FUNCTION

.. rubric:: ``commit``

.. code-block:: javascript

   commit(next)

实现 ``commit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``MatrixNode``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``matrixStoredValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23199:23274:FUNCTION

.. rubric:: ``groupDefinitions.map callback @ 283``

.. code-block:: javascript

   groupDefinitions.map callback @ 283(group)

作为 ``groupDefinitions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``283``—``283`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23566:23920:FUNCTION

.. rubric:: ``[...groupMap.values()].map callback @ 289``

.. code-block:: javascript

   [...groupMap.values()].map callback @ 289(group)

作为 ``[...groupMap.values()].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``289``—``292`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...group, sourceRows: group.rows, rows: group.rows.filter((row) => !keyword || matchesGroup || \x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includ…``。

**主要协作调用**：``\x60${group.label || ''} ${group.description || ''}\x60.toLowerCase().includes``、``\x60${group.label || ''} ${group.description || ''}\x60.toLowerCase``、``group.rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23779:23909:FUNCTION

.. rubric:: ``group.rows.filter callback @ 291``

.. code-block:: javascript

   group.rows.filter callback @ 291(row)

作为 ``group.rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``[...groupMap.values()].map callback @ 289``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includes``、``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:23929:23957:FUNCTION

.. rubric:: ``[...groupMap.values()].map((group) => { const matchesGroup = grouped && \x60${group.label || ''} ${group.description || ''… callback @ 292``

.. code-block:: javascript

   [...groupMap.values()].map((group) => { const matchesGroup = grouped && `${group.label || ''} ${group.description || ''… callback @ 292(group)

实现 ``[...groupMap.values()].map((group) => { const matchesGroup = grouped && \x60${group.label || ''} ${group.description || ''…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``292``—``292`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24092:24305:FUNCTION

.. rubric:: ``setRow``

.. code-block:: javascript

   setRow(row, next, current)

设置与 ``Row`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``294``—``297`` 行；所属函数 ``MatrixNode``。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:24324:25185:FUNCTION

.. rubric:: ``bulk``

.. code-block:: javascript

   async bulk(action, { rows = allRows, applyGlobalSet = true })

实现 ``bulk`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``298``—``310`` 行；所属函数 ``MatrixNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ rows = allRows, applyGlobalSet = true }`` （默认值 ``{}``）
   调用方传入的 ``rows = allRows, applyGlobalSet = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``context.confirm``、``setRow``、``commit``、``Object.entries``、``context.update``、``path.split``、``resolveValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25210:26554:FUNCTION

.. rubric:: ``renderRows``

.. code-block:: javascript

   renderRows(rows)

渲染与 ``Rows`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``311``—``317`` 行；所属函数 ``MatrixNode``。

**参数**

``rows``
   调用方传入的 ``rows`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``columns.map``、``rows.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25436:25518:FUNCTION

.. rubric:: ``columns.map callback @ 312``

.. code-block:: javascript

   columns.map callback @ 312(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``renderRows``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25546:26540:FUNCTION

.. rubric:: ``rows.map callback @ 313``

.. code-block:: javascript

   rows.map callback @ 313(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``313``—``316`` 行；所属函数 ``renderRows``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``columns.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25755:25885:FUNCTION

.. rubric:: ``onValueChange callback @ 313``

.. code-block:: javascript

   onValueChange callback @ 313(next)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``rows.map callback @ 313``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``columns.find``、``commit``、``setRow``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:25795:25834:FUNCTION

.. rubric:: ``columns.find callback @ 313``

.. code-block:: javascript

   columns.find callback @ 313(entry)

作为 ``columns.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``onValueChange callback @ 313``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26226:26515:FUNCTION

.. rubric:: ``columns.map callback @ 315``

.. code-block:: javascript

   columns.map callback @ 315(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``rows.map callback @ 313``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``row.allowedValues.includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:26953:26992:FUNCTION

.. rubric:: ``onChange callback @ 319``

.. code-block:: javascript

   onChange callback @ 319(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``MatrixNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27026:27239:FUNCTION

.. rubric:: ``(item.bulkActions || []).map callback @ 319``

.. code-block:: javascript

   (item.bulkActions || []).map callback @ 319(action)

作为 ``(item.bulkActions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``MatrixNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getActionPresentation``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27161:27189:FUNCTION

.. rubric:: ``onClick callback @ 319``

.. code-block:: javascript

   onClick callback @ 319()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``(item.bulkActions || []).map callback @ 319``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bulk``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:27457:29909:FUNCTION

.. rubric:: ``visibleGroups.map callback @ 321``

.. code-block:: javascript

   visibleGroups.map callback @ 321(group)

作为 ``visibleGroups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``321``—``334`` 行；所属函数 ``MatrixNode``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<Card key={group.id} className="min-w-0 gap-0 overflow-hidden rounded-lg py-0 shadow-none" data-matrix-group={group.id}> <div className={\x60flex flex-wrap items-center justify-betwe…``。

**主要协作调用**：``Boolean``、``expanded.has``、``encodeURIComponent``、``group.bulkActions.map``、``renderRows``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28209:28388:FUNCTION

.. rubric:: ``onClick callback @ 326``

.. code-block:: javascript

   onClick callback @ 326()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``visibleGroups.map callback @ 321``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:28250:28384:FUNCTION

.. rubric:: ``setExpanded callback @ 326``

.. code-block:: javascript

   setExpanded callback @ 326(previous)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``onClick callback @ 326``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``next.add``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29096:29712:FUNCTION

.. rubric:: ``group.bulkActions.map callback @ 330``

.. code-block:: javascript

   group.bulkActions.map callback @ 330(action, index)

作为 ``group.bulkActions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``visibleGroups.map callback @ 321``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getActionPresentation``、``group.sourceRows.some``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29481:29571:FUNCTION

.. rubric:: ``group.sourceRows.some callback @ 330``

.. code-block:: javascript

   group.sourceRows.some callback @ 330(row)

作为 ``group.sourceRows.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``group.bulkActions.map callback @ 330``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.allowedValues.includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29583:29662:FUNCTION

.. rubric:: ``onClick callback @ 330``

.. code-block:: javascript

   onClick callback @ 330()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``group.bulkActions.map callback @ 330``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bulk``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:29939:30053:FUNCTION

.. rubric:: ``allRows.filter callback @ 334``

.. code-block:: javascript

   allRows.filter callback @ 334(row)

作为 ``allRows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``MatrixNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase().includes``、``\x60${row.label || ''} ${row.id || ''} ${row.description || ''}\x60.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:30394:30420:FUNCTION

.. rubric:: ``useState callback @ 342``

.. code-block:: javascript

   useState callback @ 342()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``cache?.get``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31097:31112:FUNCTION

.. rubric:: ``useState callback @ 353``

.. code-block:: javascript

   useState callback @ 353()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``353``—``353`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:31733:33106:FUNCTION

.. rubric:: ``useCallback callback @ 366``

.. code-block:: javascript

   async useCallback callback @ 366({ silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``366``—``386`` 行；所属函数 ``ResourceNode``。

**参数**

``{ silent = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('资源接口没有返回列表。')``。

**主要协作调用**：``requestController.current?.abort``、``setLoading``、``setError``、``source.endpoint?.startsWith``、``ctx.client.read``、``source.endpoint.slice``、``ctx.api.get``、``requestEndpoint``、``resolveValue``、``getValue``、``Array.isArray``、``setRows``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33442:33986:FUNCTION

.. rubric:: ``useEffect callback @ 390``

.. code-block:: javascript

   useEffect callback @ 390()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``390``—``399`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; epoch.current += 1; requestController.current?.abort(); detail.serial += 1; detail.controller?.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``cache?.get``、``setRows``、``setLoading``、``setError``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:33722:33859:FUNCTION

.. rubric:: ``returned callback @ 396``

.. code-block:: javascript

   returned callback @ 396()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``396``—``396`` 行；所属函数 ``useEffect callback @ 390``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestController.current?.abort``、``detail.controller?.abort``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34012:34062:FUNCTION

.. rubric:: ``useEffect callback @ 400``

.. code-block:: javascript

   useEffect callback @ 400()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``400``—``400`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``registerResource``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34126:34632:FUNCTION

.. rubric:: ``useEffect callback @ 401``

.. code-block:: javascript

   useEffect callback @ 401()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``401``—``407`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { subscriptions.forEach((unsubscribe) => unsubscribe?.()); local?.(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``(item.events || []).map``、``source.endpoint?.startsWith``、``client.subscribe``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34189:34240:FUNCTION

.. rubric:: ``(item.events || []).map callback @ 402``

.. code-block:: javascript

   (item.events || []).map callback @ 402(event)

作为 ``(item.events || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``402``—``402`` 行；所属函数 ``useEffect callback @ 401``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscribe``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34216:34239:FUNCTION

.. rubric:: ``subscribe callback @ 402``

.. code-block:: javascript

   subscribe callback @ 402()

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``402``—``402`` 行；所属函数 ``(item.events || []).map callback @ 402``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34483:34521:FUNCTION

.. rubric:: ``client.subscribe callback @ 405``

.. code-block:: javascript

   client.subscribe callback @ 405()

实现 ``client.subscribe`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``405``—``405`` 行；所属函数 ``useEffect callback @ 401``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34546:34624:FUNCTION

.. rubric:: ``returned callback @ 406``

.. code-block:: javascript

   returned callback @ 406()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``406``—``406`` 行；所属函数 ``useEffect callback @ 401``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscriptions.forEach``、``local``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34577:34609:FUNCTION

.. rubric:: ``subscriptions.forEach callback @ 406``

.. code-block:: javascript

   subscriptions.forEach callback @ 406(unsubscribe)

作为 ``subscriptions.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``406``—``406`` 行；所属函数 ``returned callback @ 406``。

**参数**

``unsubscribe``
   调用方传入的 ``unsubscribe`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34707:35047:FUNCTION

.. rubric:: ``useEffect callback @ 408``

.. code-block:: javascript

   useEffect callback @ 408()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``408``—``412`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``registerDraftGuard(\x60${item.id || item.name}:editor\x60, async () => JSON.stringify(editor.initial) === JSON.stringify(editor.values) || confirm({ title: '放弃未保存的更改？', description: '离开…``。

**主要协作调用**：``registerDraftGuard``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:34861:35038:FUNCTION

.. rubric:: ``registerDraftGuard callback @ 410``

.. code-block:: javascript

   async registerDraftGuard callback @ 410()

注册与 ``Draft Guard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``410``—``411`` 行；所属函数 ``useEffect callback @ 408``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``、``confirm``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35157:37136:FUNCTION

.. rubric:: ``useCallback callback @ 413``

.. code-block:: javascript

   async useCallback callback @ 413(record)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``413``—``437`` 行；所属函数 ``ResourceNode``。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35784:36054:FUNCTION

.. rubric:: ``startTransition callback @ 423``

.. code-block:: javascript

   startTransition callback @ 423()

启动与 ``Transition`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``423``—``426`` 行；所属函数 ``useCallback callback @ 413``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditorBusy``、``Boolean``、``setEditorError``、``setFieldErrors``、``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:35920:36041:FUNCTION

.. rubric:: ``setEditor callback @ 425``

.. code-block:: javascript

   setEditor callback @ 425(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``startTransition callback @ 423``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36619:36802:FUNCTION

.. rubric:: ``startTransition callback @ 432``

.. code-block:: javascript

   startTransition callback @ 432()

启动与 ``Transition`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``432``—``433`` 行；所属函数 ``useCallback callback @ 413``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:36635:36801:FUNCTION

.. rubric:: ``setEditor callback @ 432``

.. code-block:: javascript

   setEditor callback @ 432(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``432``—``433`` 行；所属函数 ``startTransition callback @ 432``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cloneData``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37099:37125:FUNCTION

.. rubric:: ``startTransition callback @ 436``

.. code-block:: javascript

   startTransition callback @ 436()

启动与 ``Transition`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``436``—``436`` 行；所属函数 ``useCallback callback @ 413``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditorBusy``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37178:37406:FUNCTION

.. rubric:: ``patchEditor``

.. code-block:: javascript

   patchEditor(patch, target)

实现 ``patchEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``438``—``440`` 行；所属函数 ``ResourceNode``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target`` （默认值 ``'form'``）
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37217:37405:FUNCTION

.. rubric:: ``setEditor callback @ 438``

.. code-block:: javascript

   setEditor callback @ 438(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``438``—``440`` 行；所属函数 ``patchEditor``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``、``target.replace``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37434:37745:FUNCTION

.. rubric:: ``dismissEditor``

.. code-block:: javascript

   dismissEditor(serial)

实现 ``dismissEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``441``—``447`` 行；所属函数 ``ResourceNode``。

**参数**

``serial``
   调用方传入的 ``serial`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``detailRequest.current.controller?.abort``、``setEditorBusy``、``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37657:37736:FUNCTION

.. rubric:: ``setEditor callback @ 446``

.. code-block:: javascript

   setEditor callback @ 446(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``446``—``446`` 行；所属函数 ``dismissEditor``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:37771:38113:FUNCTION

.. rubric:: ``closeEditor``

.. code-block:: javascript

   async closeEditor()

关闭与 ``Editor`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``448``—``453`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``JSON.stringify``、``context.confirm``、``dismissEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:38220:39391:FUNCTION

.. rubric:: ``onSave``

.. code-block:: javascript

   async onSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``455``—``468`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``validateSettingsScope``、``setEditorError``、``validateSettingsFields``、``setFieldErrors``、``Object.keys``、``context.execute``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:38887:38983:FUNCTION

.. rubric:: ``patchForm``

.. code-block:: javascript

   patchForm(patch, target)

实现 ``patchForm`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``464``—``464`` 行；所属函数 ``onSave``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patchEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39008:39189:FUNCTION

.. rubric:: ``onSuccess``

.. code-block:: javascript

   async onSuccess()

处理 ``Success`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``465``—``465`` 行；所属函数 ``onSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dismissEditor``、``(editorAction.effects || []).some``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39085:39171:FUNCTION

.. rubric:: ``(editorAction.effects || []).some callback @ 465``

.. code-block:: javascript

   (editorAction.effects || []).some callback @ 465(effect)

作为 ``(editorAction.effects || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``465``—``465`` 行；所属函数 ``onSuccess``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39212:39370:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``466``—``466`` 行；所属函数 ``onSave``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setEditorError``、``setFieldErrors``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39500:44249:FUNCTION

.. rubric:: ``useMemo callback @ 470``

.. code-block:: javascript

   useMemo callback @ 470()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``470``—``507`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``item.display === 'table' && columns.length ? <div className="overflow-auto rounded-xl border border-border/70"><table className="w-full text-left text-sm"><thead className="bg-mut…``。

**主要协作调用**：``columns.map``、``rows.map``、``renderCards``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39535:40695:FUNCTION

.. rubric:: ``actionsFor``

.. code-block:: javascript

   actionsFor(record)

实现 ``actionsFor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``471``—``478`` 行；所属函数 ``useMemo callback @ 470``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``<div className="flex flex-wrap items-start gap-2">{visible.map((action, index) => action.kind === 'edit' ? <Button key={action.id || index} type="button" size="sm" {...getActionPr…``。

**主要协作调用**：``(item.actions || []).filter``、``visible.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39700:39767:FUNCTION

.. rubric:: ``(item.actions || []).filter callback @ 473``

.. code-block:: javascript

   (item.actions || []).filter callback @ 473(action)

作为 ``(item.actions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``473``—``473`` 行；所属函数 ``actionsFor``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchesCondition``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:39900:40675:FUNCTION

.. rubric:: ``visible.map callback @ 475``

.. code-block:: javascript

   visible.map callback @ 475(action, index)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``475``—``477`` 行；所属函数 ``actionsFor``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getActionPresentation``、``matchesCondition``、``conflictingActions.has``、``operationKey``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40191:40225:FUNCTION

.. rubric:: ``onClick callback @ 476``

.. code-block:: javascript

   onClick callback @ 476()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``476``—``476`` 行；所属函数 ``visible.map callback @ 475``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40532:40669:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``visible.map callback @ 475``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``、``setConflictingActions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40600:40665:FUNCTION

.. rubric:: ``setConflictingActions callback @ 477``

.. code-block:: javascript

   setConflictingActions callback @ 477(previous)

设置与 ``Conflicting Actions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``477``—``477`` 行；所属函数 ``onError``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operationKey``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:40768:40998:FUNCTION

.. rubric:: ``valueText``

.. code-block:: javascript

   valueText(record, column)

实现 ``valueText`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``480``—``483`` 行；所属函数 ``useMemo callback @ 470``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Object.hasOwn(column.labels || {}, String(value)) ? column.labels[String(value)] : displayValue(value)``。

**主要协作调用**：``getValue``、``Object.hasOwn``、``String``、``displayValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:41028:43433:FUNCTION

.. rubric:: ``renderCards``

.. code-block:: javascript

   renderCards()

渲染与 ``Cards`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``484``—``504`` 行；所属函数 ``useMemo callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:41091:43412:FUNCTION

.. rubric:: ``rows.map callback @ 484``

.. code-block:: javascript

   rows.map callback @ 484(record, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``484``—``504`` 行；所属函数 ``renderCards``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ConnectionCard key={getValue(record, item.keyField || 'id', index)} item={{ ...item, ...item.recordView }} record={record} context={context} actions={actions} />``、``<article className="min-w-0 overflow-hidden rounded-lg border bg-card" key={getValue(record, item.keyField || 'id', index)}> <div className="p-4"> <div className="flex min-w-0 ite…``。

**主要协作调用**：``actionsFor``、``getValue``、``columns.filter``、``displayValue``、``item.badges.map``、``properties.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:41654:41747:FUNCTION

.. rubric:: ``columns.filter callback @ 489``

.. code-block:: javascript

   columns.filter callback @ 489(column)

作为 ``columns.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``489``—``489`` 行；所属函数 ``rows.map callback @ 484``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:42651:42826:FUNCTION

.. rubric:: ``item.badges.map callback @ 497``

.. code-block:: javascript

   item.badges.map callback @ 497(badge)

作为 ``item.badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``497``—``497`` 行；所属函数 ``rows.map callback @ 484``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:43028:43260:FUNCTION

.. rubric:: ``properties.map callback @ 500``

.. code-block:: javascript

   properties.map callback @ 500(column)

作为 ``properties.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``500``—``500`` 行；所属函数 ``rows.map callback @ 484``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:43684:43768:FUNCTION

.. rubric:: ``columns.map callback @ 505``

.. code-block:: javascript

   columns.map callback @ 505(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``505``—``505`` 行；所属函数 ``useMemo callback @ 470``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:43845:44180:FUNCTION

.. rubric:: ``rows.map callback @ 505``

.. code-block:: javascript

   rows.map callback @ 505(record, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``505``—``505`` 行；所属函数 ``useMemo callback @ 470``。

**参数**

``record``
   调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getValue``、``columns.map``、``actionsFor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:44008:44122:FUNCTION

.. rubric:: ``columns.map callback @ 505``

.. code-block:: javascript

   columns.map callback @ 505(column)

作为 ``columns.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``505``—``505`` 行；所属函数 ``rows.map callback @ 505``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valueText``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:44393:44521:FUNCTION

.. rubric:: ``useCallback callback @ 509``

.. code-block:: javascript

   useCallback callback @ 509(values)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``509``—``510`` 行；所属函数 ``ResourceNode``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:44415:44520:FUNCTION

.. rubric:: ``setEditor callback @ 509``

.. code-block:: javascript

   setEditor callback @ 509(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``509``—``510`` 行；所属函数 ``useCallback callback @ 509``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:44734:45187:FUNCTION

.. rubric:: ``useMemo callback @ 513``

.. code-block:: javascript

   useMemo callback @ 513()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``513``—``517`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderFields``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:45530:45552:FUNCTION

.. rubric:: ``onClick callback @ 519``

.. code-block:: javascript

   onClick callback @ 519()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``519``—``519`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:45638:45732:FUNCTION

.. rubric:: ``(item.toolbarActions || []).map callback @ 520``

.. code-block:: javascript

   (item.toolbarActions || []).map callback @ 520(action, index)

作为 ``(item.toolbarActions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``520``—``520`` 行；所属函数 ``ResourceNode``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:45867:45899:FUNCTION

.. rubric:: ``onClick callback @ 521``

.. code-block:: javascript

   onClick callback @ 521()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``521``—``521`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:47333:47355:FUNCTION

.. rubric:: ``onClick callback @ 529``

.. code-block:: javascript

   onClick callback @ 529()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``529``—``529`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:47494:47538:FUNCTION

.. rubric:: ``onOpenChange callback @ 532``

.. code-block:: javascript

   onOpenChange callback @ 532(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``ResourceNode``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:47749:48050:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 534``

.. code-block:: javascript

   onCloseAutoFocus callback @ 534()

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``534``—``538`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:47947:48029:FUNCTION

.. rubric:: ``setEditor callback @ 537``

.. code-block:: javascript

   setEditor callback @ 537(current)

设置与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``537``—``537`` 行；所属函数 ``onCloseAutoFocus callback @ 534``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:48852:48947:FUNCTION

.. rubric:: ``Object.entries(fieldErrors).map callback @ 542``

.. code-block:: javascript

   Object.entries(fieldErrors).map callback @ 542([field, message])

作为 ``Object.entries(fieldErrors).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``542``—``542`` 行；所属函数 ``ResourceNode``。

**参数**

``[field, message]``
   调用方传入的 ``field, message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:49365:49394:FUNCTION

.. rubric:: ``onClick callback @ 546``

.. code-block:: javascript

   onClick callback @ 546()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeEditor``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:49782:49822:FUNCTION

.. rubric:: ``onClick callback @ 546``

.. code-block:: javascript

   onClick callback @ 546()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``ResourceNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSave().catch``、``onSave``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:49810:49818:FUNCTION

.. rubric:: ``onSave().catch callback @ 546``

.. code-block:: javascript

   onSave().catch callback @ 546()

处理 ``onSave().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``onClick callback @ 546``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:50073:50150:FUNCTION

.. rubric:: ``useState callback @ 553``

.. code-block:: javascript

   useState callback @ 553()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``553``—``553`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pageValues``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:50336:50429:FUNCTION

.. rubric:: ``useEffect callback @ 557``

.. code-block:: javascript

   useEffect callback @ 557()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``557``—``557`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``、``pageValues``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:50461:50628:FUNCTION

.. rubric:: ``useEffect callback @ 558``

.. code-block:: javascript

   useEffect callback @ 558()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``558``—``561`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``registerDraftGuard(\x60descriptor-dialog:${guardId}\x60, () => false)``。

**主要协作调用**：``registerDraftGuard``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:50607:50619:FUNCTION

.. rubric:: ``registerDraftGuard callback @ 560``

.. code-block:: javascript

   registerDraftGuard callback @ 560()

注册与 ``Draft Guard`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``560``—``560`` 行；所属函数 ``useEffect callback @ 558``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:50702:51029:FUNCTION

.. rubric:: ``useMemo callback @ 562``

.. code-block:: javascript

   useMemo callback @ 562()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``562``—``566`` 行；所属函数 ``DescriptorDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderFields``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:51211:51246:FUNCTION

.. rubric:: ``onOpenChange callback @ 567``

.. code-block:: javascript

   onOpenChange callback @ 567(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``567``—``567`` 行；所属函数 ``DescriptorDialog``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:51591:51625:FUNCTION

.. rubric:: ``anonymous callback @ 570``

.. code-block:: javascript

   anonymous callback @ 570(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``570``—``570`` 行；所属函数 ``DescriptorDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/settings-runtime/GenericNodes.jsx:51677:51711:FUNCTION

.. rubric:: ``anonymous callback @ 571``

.. code-block:: javascript

   anonymous callback @ 571(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``571``—``571`` 行；所属函数 ``DescriptorDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。
