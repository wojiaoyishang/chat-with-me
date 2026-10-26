src/features/workflows/QuickTemplateRunDialog 模块
========================================================================================================

.. js:module:: src/features/workflows/QuickTemplateRunDialog

Templates expose source nodes as a form; quick runs never open a builder.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/QuickTemplateRunDialog.jsx``
* **模块标识**：``src/features/workflows/QuickTemplateRunDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：28

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/components/setting/JsonConfigEditor.jsx``、``./WorkflowDataField.jsx``、``./WorkflowSourcePicker.jsx``、``./workflowApi.js``、``./workflowModel.js``、``./workflow.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:694:13443:FUNCTION

.. js:function:: QuickTemplateRunDialog({ request = {}, onClose, onChanged, onSubmit, })

   Templates expose source nodes as a form; quick runs never open a builder.

   **性质**：同步函数；导出 API；源码第 ``24``—``375`` 行。

   **参数**

   ``{ request = {}, onClose, onChanged, onSubmit, }``
      调用方传入的 ``request = , onClose, onChanged, onSubmit,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }} > <DialogContent showCloseButton={false} className="workflow-quick-dialog" onInteractOutside={(event) =>…``。

   **主要协作调用**：``useState``、``workflowUsesKnowledge``、``clone``、``useRef``、``useEffect``、``builtinTemplates.map``、``templates.map``、``fields.map``、``Object.values(uploading).some``、``Object.values``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:2129:2183:FUNCTION

.. rubric:: ``useEffect callback @ 56``

.. code-block:: javascript

   useEffect callback @ 56()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``58`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInvalid``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:2215:2307:FUNCTION

.. rubric:: ``useEffect callback @ 59``

.. code-block:: javascript

   useEffect callback @ 59()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``64`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:2259:2302:FUNCTION

.. rubric:: ``returned callback @ 61``

.. code-block:: javascript

   returned callback @ 61()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``63`` 行；所属函数 ``useEffect callback @ 59``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:2326:3151:FUNCTION

.. rubric:: ``useEffect callback @ 65``

.. code-block:: javascript

   useEffect callback @ 65()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``88`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**主要协作调用**：``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal…``、``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then``、``Promise.all``、``workflowApi.templates``、``workflowApi.catalog``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:2544:2917:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback @ 72``

.. code-block:: javascript

   Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback @ 72([saved, catalog])

处理 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``72``—``80`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

``[saved, catalog]``
   调用方传入的 ``saved, catalog`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTemplates``、``setBuiltinTemplates``、``setDefinitions``、``setPermissionsSchema``、``setPermissions``、``clone``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:2932:3017:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal… callback @ 81``

.. code-block:: javascript

   Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal… callback @ 81(cause)

实现 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``83`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:3034:3108:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal… callback @ 84``

.. code-block:: javascript

   Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal… callback @ 84()

实现 ``Promise.all([ workflowApi.templates(controller.signal), workflowApi.catalog(controller.signal), ]) .then(([saved, catal…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``84``—``86`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:3121:3146:FUNCTION

.. rubric:: ``returned callback @ 87``

.. code-block:: javascript

   returned callback @ 87()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:3170:5006:FUNCTION

.. rubric:: ``useEffect callback @ 89``

.. code-block:: javascript

   useEffect callback @ 89()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``150`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**主要协作调用**：``setTemplate``、``setFields``、``builtinTemplates.find``、``templateId.startsWith``、``setError``、``setLoadingTemplate``、``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true…``、``Promise.resolve``、``workflowApi.template``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:3445:3477:FUNCTION

.. rubric:: ``builtinTemplates.find callback @ 98``

.. code-block:: javascript

   builtinTemplates.find callback @ 98(item)

作为 ``builtinTemplates.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:3953:4688:FUNCTION

.. rubric:: ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 115``

.. code-block:: javascript

   (supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 115(result)

实现 ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``138`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workflowInputFields``、``setTemplate``、``setFields``、``setValues``、``Object.fromEntries``、``inputFields.map``、``setTitle``、``setUploading``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:4346:4589:FUNCTION

.. rubric:: ``inputFields.map callback @ 126``

.. code-block:: javascript

   inputFields.map callback @ 126(field)

作为 ``inputFields.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``126``—``133`` 行；所属函数 ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 115``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clone``、``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:4703:4864:FUNCTION

.. rubric:: ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 139``

.. code-block:: javascript

   (supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 139(cause)

实现 ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``145`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``、``setTemplate``、``setFields``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:4881:4963:FUNCTION

.. rubric:: ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 146``

.. code-block:: javascript

   (supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true… callback @ 146()

实现 ``(supplied ? Promise.resolve({ template: supplied }) : builtin ? Promise.resolve({ template: { ...builtin, builtin: true…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``146``—``148`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoadingTemplate``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:4976:5001:FUNCTION

.. rubric:: ``returned callback @ 149``

.. code-block:: javascript

   returned callback @ 149()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:5079:6187:FUNCTION

.. rubric:: ``submit``

.. code-block:: javascript

   async submit()

实现 ``submit`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``151``—``186`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error(\x60请填写“${field.title || field.key}”。\x60)``。

**主要协作调用**：``Object.values(uploading).some``、``Object.values``、``setBusy``、``setError``、``workflowValueMissing``、``title.trim``、``onSubmit``、``workflowApi.run``、``onChanged``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:6243:6301:FUNCTION

.. rubric:: ``onOpenChange callback @ 190``

.. code-block:: javascript

   onOpenChange callback @ 190(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``190``—``192`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:6431:6464:FUNCTION

.. rubric:: ``onInteractOutside callback @ 197``

.. code-block:: javascript

   onInteractOutside callback @ 197(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:7670:7778:FUNCTION

.. rubric:: ``builtinTemplates.map callback @ 230``

.. code-block:: javascript

   builtinTemplates.map callback @ 230(item)

作为 ``builtinTemplates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``230``—``233`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:7816:7949:FUNCTION

.. rubric:: ``templates.map callback @ 234``

.. code-block:: javascript

   templates.map callback @ 234(item)

作为 ``templates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``234``—``237`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:8963:9002:FUNCTION

.. rubric:: ``onChange callback @ 262``

.. code-block:: javascript

   onChange callback @ 262(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTitle``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:9147:11295:FUNCTION

.. rubric:: ``fields.map callback @ 266``

.. code-block:: javascript

   fields.map callback @ 266(field)

作为 ``fields.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``266``—``310`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.lockedInputKeys?.includes``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:10656:10860:FUNCTION

.. rubric:: ``onChange callback @ 295``

.. code-block:: javascript

   onChange callback @ 295(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``295``—``299`` 行；所属函数 ``fields.map callback @ 266``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:10709:10859:FUNCTION

.. rubric:: ``setValues callback @ 296``

.. code-block:: javascript

   setValues callback @ 296(current)

设置与 ``Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``296``—``299`` 行；所属函数 ``onChange callback @ 295``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:10937:11144:FUNCTION

.. rubric:: ``onBusyChange callback @ 301``

.. code-block:: javascript

   onBusyChange callback @ 301(value)

处理 ``Busy Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``301``—``305`` 行；所属函数 ``fields.map callback @ 266``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploading``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:10993:11143:FUNCTION

.. rubric:: ``setUploading callback @ 302``

.. code-block:: javascript

   setUploading callback @ 302(current)

设置与 ``Uploading`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``302``—``305`` 行；所属函数 ``onBusyChange callback @ 301``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:12173:12249:FUNCTION

.. rubric:: ``onStateChange callback @ 328``

.. code-block:: javascript

   onStateChange callback @ 328(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``328``—``329`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInvalid``。

.. CWM-AST-FUNCTION src/features/workflows/QuickTemplateRunDialog.jsx:13156:13175:FUNCTION

.. rubric:: ``onClick callback @ 362``

.. code-block:: javascript

   onClick callback @ 362()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``362``—``362`` 行；所属函数 ``QuickTemplateRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``submit``。
