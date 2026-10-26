src/features/comfyui/ComfyWorkflowPicker 模块
==============================================================================================

.. js:module:: src/features/comfyui/ComfyWorkflowPicker

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/ComfyWorkflowPicker.jsx``
* **模块标识**：``src/features/comfyui/ComfyWorkflowPicker``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：83

主要依赖
--------------------------------------------------------------------------------

``react``、``@xyflow/react``、``lucide-react``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/checkbox``、``@/components/ui/switch``、``@/components/ui/select``、``./graphModel.js``、``./bindingModel.js``、``./BindingDefaultEditor.jsx``、``./ComfyParameterSummary.jsx``、``./scopeModel.js``、``@xyflow/react/dist/style.css``、``./comfyui.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:1275:3369:FUNCTION

.. js:function:: ComfyNode({ data, selected })

   渲染 ``ComfyNode`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``124`` 行。

   **参数**

   ``{ data, selected }``
      调用方传入的 ``data, selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60comfy-node ${selected ? "is-selected" : ""}\x60}> {data.targetHandles.map((handle, index, handles) => ( <Handle key={handle} type="target" position={Position.Left}…``。

   **主要协作调用**：``data.node.inputs .filter((input) => !input.linked) .slice``、``data.node.inputs .filter``、``data.targetHandles.map``、``data.handles.map``、``literals.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:3410:29603:FUNCTION

.. js:function:: Picker({ graph, bindings, outputBindings, onBindingsChange, onOutputsChange, onInputBusyChange, onUiWorkfl…)

   渲染 ``Picker`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``127``—``786`` 行。

   **参数**

   ``{ graph, bindings, outputBindings, onBindingsChange, onOutputsChange, onInputBusyChange, onUiWorkfl…``
      调用方传入的 ``graph, bindings, outputBindings, onBindingsChange, onOutputsChange, onInputBusyChange, onUiWorkfl…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> {graphScopes(graph).size > 1 && ( <nav className="comfy-scope-breadcrumbs" aria-label="子图位置"> {breadcrumbs.map((scope, index) => ( <span key={scope.id}> {index > 0 && <Chevro…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useReactFlow``、``useRef``、``useNodesInitialized``、``useNodesState``、``scopeForNode``、``useEffect``、``useMemo``、``scopeBreadcrumbs``、``useCallback``、``layer.nodes.find``、``outputBindings.find``。

   **内部回调数量**：26。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:29603:29752:FUNCTION

.. js:function:: ComfyWorkflowPicker(props)

   渲染 ``ComfyWorkflowPicker`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``788``—``794`` 行。

   **参数**

   ``props``
      React 组件属性。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <ReactFlowProvider> <Picker {...props} /> </ReactFlowProvider> )``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:1366:1390:FUNCTION

.. rubric:: ``data.node.inputs .filter callback @ 59``

.. code-block:: javascript

   data.node.inputs .filter callback @ 59(input)

作为 ``data.node.inputs .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``ComfyNode``。

**参数**

``input``
   待解析、校验或转换的输入。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:1519:1795:FUNCTION

.. rubric:: ``data.targetHandles.map callback @ 63``

.. code-block:: javascript

   data.targetHandles.map callback @ 63(handle, index, handles)

作为 ``data.targetHandles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``72`` 行；所属函数 ``ComfyNode``。

**参数**

``handle``
   调用方传入的 ``handle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``handles``
   调用方传入的 ``handles`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:1822:2095:FUNCTION

.. rubric:: ``data.handles.map callback @ 73``

.. code-block:: javascript

   data.handles.map callback @ 73(handle, index)

作为 ``data.handles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``82`` 行；所属函数 ``ComfyNode``。

**参数**

``handle``
   调用方传入的 ``handle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:2379:2544:FUNCTION

.. rubric:: ``literals.map callback @ 90``

.. code-block:: javascript

   literals.map callback @ 90(field)

作为 ``literals.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``95`` 行；所属函数 ``ComfyNode``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fieldSummary``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:3143:3252:FUNCTION

.. rubric:: ``onClick callback @ 113``

.. code-block:: javascript

   onClick callback @ 113(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``116`` 行；所属函数 ``ComfyNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``data.onEnter``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:3711:3767:FUNCTION

.. rubric:: ``useState callback @ 141``

.. code-block:: javascript

   useState callback @ 141()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``141``—``142`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scopeForNode``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:4180:4758:FUNCTION

.. rubric:: ``useEffect callback @ 152``

.. code-block:: javascript

   useEffect callback @ 152()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``152``—``173`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { observer.disconnect(); cancelAnimationFrame(frame); }``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:4243:4596:FUNCTION

.. rubric:: ``anonymous callback @ 154``

.. code-block:: javascript

   anonymous callback @ 154()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``167`` 行；所属函数 ``useEffect callback @ 152``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:4322:4580:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 156``

.. code-block:: javascript

   requestAnimationFrame callback @ 156()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``156``—``165`` 行；所属函数 ``anonymous callback @ 154``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flow.fitView``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:4675:4753:FUNCTION

.. rubric:: ``returned callback @ 169``

.. code-block:: javascript

   returned callback @ 169()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``172`` 行；所属函数 ``useEffect callback @ 152``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``、``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:4781:4939:FUNCTION

.. rubric:: ``useEffect callback @ 174``

.. code-block:: javascript

   useEffect callback @ 174()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``174``—``180`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setScopeId``、``setPendingFocus``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:4983:5362:FUNCTION

.. rubric:: ``useEffect callback @ 181``

.. code-block:: javascript

   useEffect callback @ 181()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``181``—``195`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:5076:5304:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 183``

.. code-block:: javascript

   requestAnimationFrame callback @ 183()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``192`` 行；所属函数 ``useEffect callback @ 181``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flow.fitView``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:5323:5357:FUNCTION

.. rubric:: ``returned callback @ 194``

.. code-block:: javascript

   returned callback @ 194()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``194``—``194`` 行；所属函数 ``useEffect callback @ 181``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:5438:5471:FUNCTION

.. rubric:: ``useMemo callback @ 196``

.. code-block:: javascript

   useMemo callback @ 196()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scopedGraph``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:5581:5795:FUNCTION

.. rubric:: ``useCallback callback @ 199``

.. code-block:: javascript

   useCallback callback @ 199(id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``206`` 行；所属函数 ``Picker``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``graphScopes(graph).has``、``graphScopes``、``String``、``setPendingFocus``、``setScopeId``、``onSelect``、``setSearch``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:5861:5901:FUNCTION

.. rubric:: ``layer.nodes.find callback @ 209``

.. code-block:: javascript

   layer.nodes.find callback @ 209(node)

作为 ``layer.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``209``—``209`` 行；所属函数 ``Picker``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:5930:8570:FUNCTION

.. rubric:: ``useMemo callback @ 210``

.. code-block:: javascript

   useMemo callback @ 210()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``210``—``291`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nodes.map((node) => ({ id: String(node.id), type: "comfy", position: node.position, selected: String(node.id) === selectedId, data: { node, onEnter: enterScope, targetHandles: [ .…``。

**主要协作调用**：``layoutGraph``、``Boolean``、``graph.uiWorkflow?.nodes?.some``、``layer.nodes.some``、``nodes.map``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6060:6079:FUNCTION

.. rubric:: ``graph.uiWorkflow?.nodes?.some callback @ 215``

.. code-block:: javascript

   graph.uiWorkflow?.nodes?.some callback @ 215(node)

作为 ``graph.uiWorkflow?.nodes?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``useMemo callback @ 210``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6109:6232:FUNCTION

.. rubric:: ``layer.nodes.some callback @ 216``

.. code-block:: javascript

   layer.nodes.some callback @ 216(node)

作为 ``layer.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``219`` 行；所属函数 ``useMemo callback @ 210``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graph.uiWorkflow?.nodes?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6159:6219:FUNCTION

.. rubric:: ``graph.uiWorkflow?.nodes?.some callback @ 218``

.. code-block:: javascript

   graph.uiWorkflow?.nodes?.some callback @ 218(saved)

作为 ``graph.uiWorkflow?.nodes?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``layer.nodes.some callback @ 216``。

**参数**

``saved``
   调用方传入的 ``saved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6272:6337:FUNCTION

.. rubric:: ``layer.nodes.some callback @ 222``

.. code-block:: javascript

   layer.nodes.some callback @ 222(node)

作为 ``layer.nodes.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``useMemo callback @ 210``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6387:8564:FUNCTION

.. rubric:: ``nodes.map callback @ 226``

.. code-block:: javascript

   nodes.map callback @ 226(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``226``—``290`` 行；所属函数 ``useMemo callback @ 210``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``node.inputs .filter((field) => field.linked || field.origin) .map``、``node.inputs .filter``、``layer.edges .filter((edge) => String(edge.target) === String(node.id)) .map((edge) => edge.targetHandle) .filter``、``layer.edges .filter((edge) => String(edge.target) === String(node.id)) .map``、``layer.edges .filter``、``childScopeNodeIds``、``layer.edges .filter((edge) => String(edge.source) === String(node.id)) .map``、``bindings .filter((binding) => childScopeNodeIds(graph, node.subgraphId).has( String(binding.nodeId), ), ) .map``、``bindings .filter``、``bindings .filter((binding) => node.inputs.some((field) => field.targets?.some( (target) => String(target.nodeId) === St…``、``bindings.filter``。

**内部回调数量**：12。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6681:6720:FUNCTION

.. rubric:: ``node.inputs .filter callback @ 237``

.. code-block:: javascript

   node.inputs .filter callback @ 237(field)

作为 ``node.inputs .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``237``—``237`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6741:6762:FUNCTION

.. rubric:: ``node.inputs .filter((field) => field.linked || field.origin) .map callback @ 238``

.. code-block:: javascript

   node.inputs .filter((field) => field.linked || field.origin) .map callback @ 238(field)

作为 ``node.inputs .filter((field) => field.linked || field.origin) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6814:6863:FUNCTION

.. rubric:: ``layer.edges .filter callback @ 240``

.. code-block:: javascript

   layer.edges .filter callback @ 240(edge)

作为 ``layer.edges .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:6884:6911:FUNCTION

.. rubric:: ``layer.edges .filter((edge) => String(edge.target) === String(node.id)) .map callback @ 241``

.. code-block:: javascript

   layer.edges .filter((edge) => String(edge.target) === String(node.id)) .map callback @ 241(edge)

作为 ``layer.edges .filter((edge) => String(edge.target) === String(node.id)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``241``—``241`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7167:7216:FUNCTION

.. rubric:: ``layer.edges .filter callback @ 251``

.. code-block:: javascript

   layer.edges .filter callback @ 251(edge)

作为 ``layer.edges .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``251``—``251`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7237:7279:FUNCTION

.. rubric:: ``layer.edges .filter((edge) => String(edge.source) === String(node.id)) .map callback @ 252``

.. code-block:: javascript

   layer.edges .filter((edge) => String(edge.source) === String(node.id)) .map callback @ 252(edge)

作为 ``layer.edges .filter((edge) => String(edge.source) === String(node.id)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7412:7553:FUNCTION

.. rubric:: ``bindings .filter callback @ 258``

.. code-block:: javascript

   bindings .filter callback @ 258(binding)

作为 ``bindings .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``261`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``childScopeNodeIds(graph, node.subgraphId).has``、``childScopeNodeIds``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7594:7619:FUNCTION

.. rubric:: ``bindings .filter((binding) => childScopeNodeIds(graph, node.subgraphId).has( String(binding.nodeId), ), ) .map callback @ 263``

.. code-block:: javascript

   bindings .filter((binding) => childScopeNodeIds(graph, node.subgraphId).has( String(binding.nodeId), ), ) .map callback @ 263(binding)

作为 ``bindings .filter((binding) => childScopeNodeIds(graph, node.subgraphId).has( String(binding.nodeId), ), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7744:8066:FUNCTION

.. rubric:: ``bindings .filter callback @ 268``

.. code-block:: javascript

   bindings .filter callback @ 268(binding)

作为 ``bindings .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``268``—``275`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``node.inputs.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7794:8043:FUNCTION

.. rubric:: ``node.inputs.some callback @ 269``

.. code-block:: javascript

   node.inputs.some callback @ 269(field)

作为 ``node.inputs.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``269``—``274`` 行；所属函数 ``bindings .filter callback @ 268``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``field.targets?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:7847:8018:FUNCTION

.. rubric:: ``field.targets?.some callback @ 271``

.. code-block:: javascript

   field.targets?.some callback @ 271(target)

作为 ``field.targets?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``271``—``273`` 行；所属函数 ``node.inputs.some callback @ 269``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:8111:8136:FUNCTION

.. rubric:: ``bindings .filter((binding) => node.inputs.some((field) => field.targets?.some( (target) => String(target.nodeId) === St… callback @ 277``

.. code-block:: javascript

   bindings .filter((binding) => node.inputs.some((field) => field.targets?.some( (target) => String(target.nodeId) === St… callback @ 277(binding)

实现 ``bindings .filter((binding) => node.inputs.some((field) => field.targets?.some( (target) => String(target.nodeId) === St…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:8190:8262:FUNCTION

.. rubric:: ``bindings.filter callback @ 280``

.. code-block:: javascript

   bindings.filter callback @ 280(binding)

作为 ``bindings.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``280``—``280`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:8324:8536:FUNCTION

.. rubric:: ``outputBindings.some callback @ 282``

.. code-block:: javascript

   outputBindings.some callback @ 282(binding)

作为 ``outputBindings.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``282``—``287`` 行；所属函数 ``nodes.map callback @ 226``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``childScopeNodeIds(graph, node.subgraphId).has``、``childScopeNodeIds``、``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:8651:8871:FUNCTION

.. rubric:: ``useEffect callback @ 292``

.. code-block:: javascript

   useEffect callback @ 292()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``292``—``298`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:8785:8859:FUNCTION

.. rubric:: ``setNodes callback @ 295``

.. code-block:: javascript

   setNodes callback @ 295(current)

设置与 ``Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``295``—``296`` 行；所属函数 ``useEffect callback @ 292``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reconcileDiagramNodes``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:8932:9281:FUNCTION

.. rubric:: ``savePositions``

.. code-block:: javascript

   savePositions(_event, draggedNode, draggedNodes)

保存与 ``Positions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``299``—``308`` 行；所属函数 ``Picker``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``draggedNode``
   调用方传入的 ``draggedNode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``draggedNodes``
   调用方传入的 ``draggedNodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(draggedNodes?.length ? draggedNodes : [draggedNode]).map``、``flow.getNodes().map``、``flow.getNodes``、``onUiWorkflowChange``、``withNodePositions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9065:9115:FUNCTION

.. rubric:: ``(draggedNodes?.length ? draggedNodes : [draggedNode]).map callback @ 301``

.. code-block:: javascript

   (draggedNodes?.length ? draggedNodes : [draggedNode]).map callback @ 301(node)

作为 ``(draggedNodes?.length ? draggedNodes : [draggedNode]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``301``—``304`` 行；所属函数 ``savePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9166:9202:FUNCTION

.. rubric:: ``flow.getNodes().map callback @ 306``

.. code-block:: javascript

   flow.getNodes().map callback @ 306(node)

作为 ``flow.getNodes().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``savePositions``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``moved.get``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9299:9446:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select(id)

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``309``—``314`` 行；所属函数 ``Picker``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingFocus``、``String``、``setScopeId``、``scopeForNode``、``onSelect``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9464:9742:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(nodeId, fieldName, patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``315``—``320`` 行；所属函数 ``Picker``。

**参数**

``nodeId``
   目标对象的公共或运行时标识。

``fieldName``
   调用方传入的 ``fieldName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graph.nodes.find``、``node?.inputs.find``、``onBindingsChange``、``updateFieldBinding``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9531:9575:FUNCTION

.. rubric:: ``graph.nodes.find callback @ 316``

.. code-block:: javascript

   graph.nodes.find callback @ 316(item)

作为 ``graph.nodes.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``316``—``316`` 行；所属函数 ``update``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9614:9647:FUNCTION

.. rubric:: ``node?.inputs.find callback @ 317``

.. code-block:: javascript

   node?.inputs.find callback @ 317(item)

作为 ``node?.inputs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``update``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9760:9865:FUNCTION

.. rubric:: ``toggle``

.. code-block:: javascript

   toggle(node, field, checked)

切换与 ``toggle`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``321``—``322`` 行；所属函数 ``Picker``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onBindingsChange``、``setFieldBinding``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:9904:9959:FUNCTION

.. rubric:: ``outputBindings.find callback @ 324``

.. code-block:: javascript

   outputBindings.find callback @ 324(binding)

作为 ``outputBindings.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``324``—``324`` 行；所属函数 ``Picker``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:10040:10314:FUNCTION

.. rubric:: ``(graph.nodes || []) .filter callback @ 328``

.. code-block:: javascript

   (graph.nodes || []) .filter callback @ 328(node)

作为 ``(graph.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``328``—``334`` 行；所属函数 ``Picker``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${node.id} ${node.title} ${node.classType} ${node.inputs .filter((field) => !field.linked) .map((field) => fieldSummar…``、``node.inputs .filter((field) => !field.linked) .map((field) => fieldSummary(field.value)) .join``、``node.inputs .filter((field) => !field.linked) .map``、``node.inputs .filter``、``search.toLowerCase``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:10138:10162:FUNCTION

.. rubric:: ``node.inputs .filter callback @ 330``

.. code-block:: javascript

   node.inputs .filter callback @ 330(field)

作为 ``node.inputs .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``(graph.nodes || []) .filter callback @ 328``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:10181:10217:FUNCTION

.. rubric:: ``node.inputs .filter((field) => !field.linked) .map callback @ 331``

.. code-block:: javascript

   node.inputs .filter((field) => !field.linked) .map callback @ 331(field)

作为 ``node.inputs .filter((field) => !field.linked) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``331``—``331`` 行；所属函数 ``(graph.nodes || []) .filter callback @ 328``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fieldSummary``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:10511:11081:FUNCTION

.. rubric:: ``breadcrumbs.map callback @ 342``

.. code-block:: javascript

   breadcrumbs.map callback @ 342(scope, index)

作为 ``breadcrumbs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``342``—``355`` 行；所属函数 ``Picker``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:10785:10811:FUNCTION

.. rubric:: ``onClick callback @ 348``

.. code-block:: javascript

   onClick callback @ 348()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``348``—``348`` 行；所属函数 ``breadcrumbs.map callback @ 342``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterScope``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:11490:11530:FUNCTION

.. rubric:: ``onChange callback @ 367``

.. code-block:: javascript

   onChange callback @ 367(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``367``—``367`` 行；所属函数 ``Picker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearch``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:11724:12461:FUNCTION

.. rubric:: ``results.map callback @ 373``

.. code-block:: javascript

   results.map callback @ 373(node)

作为 ``results.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``373``—``392`` 行；所属函数 ``Picker``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scopeBreadcrumbs(graph, node.scopeId) .map((scope) => scope.title) .join``、``scopeBreadcrumbs(graph, node.scopeId) .map``、``scopeBreadcrumbs``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:11859:11964:FUNCTION

.. rubric:: ``onClick callback @ 377``

.. code-block:: javascript

   onClick callback @ 377()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``377``—``380`` 行；所属函数 ``results.map callback @ 373``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``、``setSearch``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:12322:12344:FUNCTION

.. rubric:: ``scopeBreadcrumbs(graph, node.scopeId) .map callback @ 388``

.. code-block:: javascript

   scopeBreadcrumbs(graph, node.scopeId) .map callback @ 388(scope)

作为 ``scopeBreadcrumbs(graph, node.scopeId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``388``—``388`` 行；所属函数 ``results.map callback @ 373``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:12661:12818:FUNCTION

.. rubric:: ``onClick callback @ 402``

.. code-block:: javascript

   onClick callback @ 402()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``402``—``406`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingFocus``、``flow.fitView``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:13144:13420:FUNCTION

.. rubric:: ``layer.edges.map callback @ 417``

.. code-block:: javascript

   layer.edges.map callback @ 417(edge)

作为 ``layer.edges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``417``—``424`` 行；所属函数 ``Picker``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:13757:13787:FUNCTION

.. rubric:: ``onNodeClick callback @ 436``

.. code-block:: javascript

   onNodeClick callback @ 436(_, node)

处理 ``Node Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``436``—``436`` 行；所属函数 ``Picker``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:13820:13913:FUNCTION

.. rubric:: ``onNodeDoubleClick callback @ 437``

.. code-block:: javascript

   onNodeDoubleClick callback @ 437(_, node)

处理 ``Node Double Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``437``—``438`` 行；所属函数 ``Picker``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterScope``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:15008:15045:FUNCTION

.. rubric:: ``onClick callback @ 467``

.. code-block:: javascript

   onClick callback @ 467()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``467``—``467`` 行；所属函数 ``Picker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``enterScope``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:15218:27132:FUNCTION

.. rubric:: ``selected.inputs.map callback @ 473``

.. code-block:: javascript

   selected.inputs.map callback @ 473(field)

作为 ``selected.inputs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``473``—``721`` 行；所属函数 ``Picker``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={field.name} className="comfy-field"> <div className="flex items-center justify-between gap-2"> <strong className="text-sm break-all"> {field.name} </strong> {field.lin…``。

**主要协作调用**：``fieldBindingState``、``reusableParameters``、``JSON.stringify``、``fieldSummary``、``targets.map``、``reusable.some``、``reusable.map``、``inputKindsForField(field).map``、``inputKindsForField``、``Boolean``、``["image", "video"].includes``。

**内部回调数量**：14。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:16384:16457:FUNCTION

.. rubric:: ``onCheckedChange callback @ 496``

.. code-block:: javascript

   onCheckedChange callback @ 496(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``496``—``497`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggle``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:16898:16930:FUNCTION

.. rubric:: ``onClick callback @ 508``

.. code-block:: javascript

   onClick callback @ 508()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``508``—``508`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:18334:18916:FUNCTION

.. rubric:: ``targets.map callback @ 539``

.. code-block:: javascript

   targets.map callback @ 539(target)

作为 ``targets.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``539``—``549`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:18622:18649:FUNCTION

.. rubric:: ``onClick callback @ 544``

.. code-block:: javascript

   onClick callback @ 544()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``544``—``544`` 行；所属函数 ``targets.map callback @ 539``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:19525:19558:FUNCTION

.. rubric:: ``onClick callback @ 565``

.. code-block:: javascript

   onClick callback @ 565()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``565``—``565`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:20538:20610:FUNCTION

.. rubric:: ``reusable.some callback @ 587``

.. code-block:: javascript

   reusable.some callback @ 587(item)

作为 ``reusable.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``587``—``587`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:20818:21686:FUNCTION

.. rubric:: ``onValueChange callback @ 592``

.. code-block:: javascript

   onValueChange callback @ 592(name)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``592``—``610`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reusable.find``、``onBindingsChange``、``setFieldBinding``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:20891:20954:FUNCTION

.. rubric:: ``reusable.find callback @ 594``

.. code-block:: javascript

   reusable.find callback @ 594(item)

作为 ``reusable.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``onValueChange callback @ 592``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:22114:22364:FUNCTION

.. rubric:: ``reusable.map callback @ 619``

.. code-block:: javascript

   reusable.map callback @ 619(item)

作为 ``reusable.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``619``—``623`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:23013:23189:FUNCTION

.. rubric:: ``onChange callback @ 637``

.. code-block:: javascript

   onChange callback @ 637(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``637``—``640`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:23584:23761:FUNCTION

.. rubric:: ``onChange callback @ 649``

.. code-block:: javascript

   onChange callback @ 649(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``649``—``652`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:24277:24460:FUNCTION

.. rubric:: ``onChange callback @ 661``

.. code-block:: javascript

   onChange callback @ 661(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``661``—``664`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:24922:25006:FUNCTION

.. rubric:: ``onValueChange callback @ 674``

.. code-block:: javascript

   onValueChange callback @ 674(kind)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``674``—``675`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:25333:25679:FUNCTION

.. rubric:: ``inputKindsForField(field).map callback @ 682``

.. code-block:: javascript

   inputKindsForField(field).map callback @ 682(kind)

作为 ``inputKindsForField(field).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``682``—``689`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:26086:26178:FUNCTION

.. rubric:: ``onCheckedChange callback @ 697``

.. code-block:: javascript

   onCheckedChange callback @ 697(required)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``697``—``698`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``required``
   调用方传入的 ``required`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:26465:26545:FUNCTION

.. rubric:: ``onChange callback @ 705``

.. code-block:: javascript

   onChange callback @ 705(patch)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``705``—``706`` 行；所属函数 ``selected.inputs.map callback @ 473``。

**参数**

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:27465:27967:FUNCTION

.. rubric:: ``onCheckedChange callback @ 728``

.. code-block:: javascript

   onCheckedChange callback @ 728(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``728``—``739`` 行；所属函数 ``Picker``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOutputsChange``、``outputBindings.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:27790:27907:FUNCTION

.. rubric:: ``outputBindings.filter callback @ 736``

.. code-block:: javascript

   outputBindings.filter callback @ 736(binding)

作为 ``outputBindings.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``736``—``737`` 行；所属函数 ``onCheckedChange callback @ 728``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:28180:28503:FUNCTION

.. rubric:: ``onValueChange callback @ 746``

.. code-block:: javascript

   onValueChange callback @ 746(kind)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``746``—``753`` 行；所属函数 ``Picker``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOutputsChange``、``outputBindings.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyWorkflowPicker.jsx:28276:28447:FUNCTION

.. rubric:: ``outputBindings.map callback @ 748``

.. code-block:: javascript

   outputBindings.map callback @ 748(binding)

作为 ``outputBindings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``748``—``751`` 行；所属函数 ``onValueChange callback @ 746``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。
