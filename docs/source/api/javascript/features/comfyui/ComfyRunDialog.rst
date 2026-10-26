src/features/comfyui/ComfyRunDialog 模块
====================================================================================

.. js:module:: src/features/comfyui/ComfyRunDialog

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/ComfyRunDialog.jsx``
* **模块标识**：``src/features/comfyui/ComfyRunDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/lib/apiClient.js``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/switch``、``@/components/ui/select``、``@/components/ui/dialog``、``@/features/workflows/WorkflowSourcePicker.jsx``、``./graphModel.js``、``@/features/workflows/workflow.css``、``./ComfyRunResult.jsx``、``./runModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:951:14658:FUNCTION

.. js:function:: ComfyRunDialog({ workflow, servers, endpoint, onClose, onTask, })

   渲染 ``ComfyRunDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``37``—``398`` 行。

   **参数**

   ``{ workflow, servers, endpoint, onClose, onTask, }``
      调用方传入的 ``workflow, servers, endpoint, onClose, onTask,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open && !busy && !uploading) onClose(); }} > <DialogContent className="comfy-dialog sm:!max-w-[620px]"> <DialogHeader className="comf…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``logicalInputs``、``useState``、``servers.some``、``servers .filter((server) => server.enabled !== false) .map``、``servers .filter``、``fields.map``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:1149:1342:FUNCTION

.. rubric:: ``useState callback @ 46``

.. code-block:: javascript

   useState callback @ 46()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``46``—``51`` 行；所属函数 ``ComfyRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``servers.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:1179:1253:FUNCTION

.. rubric:: ``servers.find callback @ 48``

.. code-block:: javascript

   servers.find callback @ 48(server)

作为 ``servers.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``useState callback @ 46``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:1289:1325:FUNCTION

.. rubric:: ``servers.find callback @ 50``

.. code-block:: javascript

   servers.find callback @ 50(server)

作为 ``servers.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``useState callback @ 46``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:1485:1530:FUNCTION

.. rubric:: ``useState callback @ 56``

.. code-block:: javascript

   useState callback @ 56()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``57`` 行；所属函数 ``ComfyRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``initialRunValues``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:1615:1655:FUNCTION

.. rubric:: ``useState callback @ 60``

.. code-block:: javascript

   useState callback @ 60()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``ComfyRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``executionModeForWorkflow``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:2003:2080:FUNCTION

.. rubric:: ``setValue``

.. code-block:: javascript

   setValue(name, value)

设置与 ``Value`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``67``—``68`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:2035:2079:FUNCTION

.. rubric:: ``setValues callback @ 68``

.. code-block:: javascript

   setValues callback @ 68(current)

设置与 ``Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``setValue``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:2098:2682:FUNCTION

.. rubric:: ``submit``

.. code-block:: javascript

   async submit()

实现 ``submit`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``69``—``89`` 行；所属函数 ``ComfyRunDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error("请先添加并选择可用的 ComfyUI 连接。")``。

**主要协作调用**：``setError``、``buildRunInputs``、``setBusy``、``apiClient.post``、``title.trim``、``setCompletion``、``normalizeComfyRunResponse``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:2702:3429:FUNCTION

.. rubric:: ``validate``

.. code-block:: javascript

   async validate()

校验与 ``validate`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``90``—``117`` 行；所属函数 ``ComfyRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error( (result.errors || []) .map((item) => typeof item === "string" ? item : item.message || JSON.stringify(item), ) .join("\n") || "兼容性检查未通过。", )``。

**主要协作调用**：``setChecking``、``setCompatibility``、``setError``、``apiClient.post``、``(result.errors || []) .map((item) => typeof item === "string" ? item : item.message || JSON.stringify(item), ) .join``、``(result.errors || []) .map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:3056:3182:FUNCTION

.. rubric:: ``(result.errors || []) .map callback @ 102``

.. code-block:: javascript

   (result.errors || []) .map callback @ 102(item)

作为 ``(result.errors || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``102``—``105`` 行；所属函数 ``validate``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:3485:3557:FUNCTION

.. rubric:: ``onOpenChange callback @ 121``

.. code-block:: javascript

   onOpenChange callback @ 121(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``123`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:4512:4562:FUNCTION

.. rubric:: ``onClick callback @ 145``

.. code-block:: javascript

   onClick callback @ 145()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``ComfyRunDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onTask``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:5274:5447:FUNCTION

.. rubric:: ``onValueChange callback @ 166``

.. code-block:: javascript

   onValueChange callback @ 166(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``170`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setServerId``、``setCompatibility``、``setError``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:5703:5739:FUNCTION

.. rubric:: ``servers.some callback @ 177``

.. code-block:: javascript

   servers.some callback @ 177(server)

作为 ``servers.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:5953:5989:FUNCTION

.. rubric:: ``servers .filter callback @ 183``

.. code-block:: javascript

   servers .filter callback @ 183(server)

作为 ``servers .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:6018:6220:FUNCTION

.. rubric:: ``servers .filter((server) => server.enabled !== false) .map callback @ 184``

.. code-block:: javascript

   servers .filter((server) => server.enabled !== false) .map callback @ 184(server)

作为 ``servers .filter((server) => server.enabled !== false) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``184``—``188`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:7968:8007:FUNCTION

.. rubric:: ``onChange callback @ 235``

.. code-block:: javascript

   onChange callback @ 235(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTitle``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:8077:13102:FUNCTION

.. rubric:: ``fields.map callback @ 238``

.. code-block:: javascript

   fields.map callback @ 238(field)

作为 ``fields.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``345`` 行；所属函数 ``ComfyRunDialog``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={field.name} className="rounded-xl border p-4 space-y-3" > <div className="flex items-center justify-between gap-3"> <span className="text-sm font-medium"> {field.label…``。

**主要协作调用**：``Object.hasOwn``、``defaultModeForBinding``、``defaultPolicyHint``、``["image", "video"].includes``、``field.targets .map((target) => \x60#${target.nodeId}.${target.field}\x60) .join``、``field.targets .map``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:9154:9833:FUNCTION

.. rubric:: ``onCheckedChange callback @ 259``

.. code-block:: javascript

   onCheckedChange callback @ 259(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``259``—``272`` 行；所属函数 ``fields.map callback @ 238``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:9205:9832:FUNCTION

.. rubric:: ``setValues callback @ 260``

.. code-block:: javascript

   setValues callback @ 260(current)

设置与 ``Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``260``—``272`` 行；所属函数 ``onCheckedChange callback @ 259``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:10956:11043:FUNCTION

.. rubric:: ``onChange callback @ 298``

.. code-block:: javascript

   onChange callback @ 298(source)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``298``—``299`` 行；所属函数 ``fields.map callback @ 238``。

**参数**

``source``
   调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:11648:11714:FUNCTION

.. rubric:: ``onCheckedChange callback @ 312``

.. code-block:: javascript

   onCheckedChange callback @ 312(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``312``—``313`` 行；所属函数 ``fields.map callback @ 238``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:12174:12251:FUNCTION

.. rubric:: ``onChange callback @ 322``

.. code-block:: javascript

   onChange callback @ 322(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``322``—``323`` 行；所属函数 ``fields.map callback @ 238``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:12597:12674:FUNCTION

.. rubric:: ``onChange callback @ 332``

.. code-block:: javascript

   onChange callback @ 332(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``332``—``333`` 行；所属函数 ``fields.map callback @ 238``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunDialog.jsx:12933:12980:FUNCTION

.. rubric:: ``field.targets .map callback @ 340``

.. code-block:: javascript

   field.targets .map callback @ 340(target)

作为 ``field.targets .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``340``—``340`` 行；所属函数 ``fields.map callback @ 238``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
