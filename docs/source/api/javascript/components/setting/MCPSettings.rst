src/components/setting/MCPSettings 模块
==================================================================================

.. js:module:: src/components/setting/MCPSettings

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/setting/MCPSettings.jsx``
* **模块标识**：``src/components/setting/MCPSettings``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：88

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/lib/apiClient.js``、``@/context/useEventStore.jsx``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/switch``、``@/components/ui/useConfirmation.jsx``、``@/components/ui/dialog``、``@/components/ui/select``、``@/features/mcp/settingsModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:1195:1481:FUNCTION

.. js:function:: Field({ title, hint, children })

   渲染 ``Field`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``62`` 行。

   **参数**

   ``{ title, hint, children }``
      调用方传入的 ``title, hint, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-2"> <div className="text-sm font-medium">{title}</div> {children} {hint && ( <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p> )} <…``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:1481:3197:FUNCTION

.. js:function:: SecretPairs({ title, rows, onChange })

   渲染 ``SecretPairs`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``122`` 行。

   **参数**

   ``{ title, rows, onChange }``
      调用方传入的 ``title, rows, onChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Field title={title} hint="已保存的值不会回显；留空保留原值，删除这一行会移除该项。" > <div className="space-y-2"> {rows.map((row, index) => ( <div key={index} className="flex items-center gap-2"> <Input a…``。

   **主要协作调用**：``rows.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:3197:10240:FUNCTION

.. js:function:: ServerEditor({ record, endpoint, onClose, onSaved })

   渲染 ``ServerEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``322`` 行。

   **参数**

   ``{ record, endpoint, onClose, onSaved }``
      调用方传入的 ``record, endpoint, onClose, onSaved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }} > <DialogContent className="!flex max-h-[88dvh] flex-col gap-0 overflow-hidden !p-0 sm:!max-w-[720px]">…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``Boolean``、``[ ["connectTimeout", "连接超时（秒）", 300], ["callTimeout", "调用超时（秒）", 7200], ["maxConcurrency", "每 Worker 并发上限", 64], ].map``。

   **内部回调数量**：16。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:10240:20560:FUNCTION

.. js:function:: ToolPolicies({ server, endpoint, onClose, onSaved })

   渲染 ``ToolPolicies`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``324``—``591`` 行。

   **参数**

   ``{ server, endpoint, onClose, onSaved }``
      调用方传入的 ``server, endpoint, onClose, onSaved`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }} > <DialogContent className="!flex max-h-[88dvh] flex-col gap-0 overflow-hidden !p-0 sm:!max-w-[900px]">…``。

   **主要协作调用**：``useState``、``Boolean``、``server.tools.map``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:20560:34738:FUNCTION

.. js:function:: MCPSettings({ config, onTask })

   渲染 ``MCPSettings`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``593``—``990`` 行。

   **参数**

   ``{ config, onTask }``
      调用方传入的 ``config, onTask`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-5"> <div className="flex flex-wrap items-start justify-between gap-4"> <div className="space-y-1"> <h3 className="text-lg font-semibold">MCP 服务</h3> <p c…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useConfirmation``、``useRef``、``useCallback``、``useEffect``、``servers.map``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:1675:2943:FUNCTION

.. rubric:: ``rows.map callback @ 71``

.. code-block:: javascript

   rows.map callback @ 71(row, index)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``71``—``109`` 行；所属函数 ``SecretPairs``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:1914:2108:FUNCTION

.. rubric:: ``onChange callback @ 77``

.. code-block:: javascript

   onChange callback @ 77(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``82`` 行；所属函数 ``rows.map callback @ 71``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:1978:2068:FUNCTION

.. rubric:: ``rows.map callback @ 79``

.. code-block:: javascript

   rows.map callback @ 79(item, i)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``80`` 行；所属函数 ``onChange callback @ 77``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:2377:2573:FUNCTION

.. rubric:: ``onChange callback @ 91``

.. code-block:: javascript

   onChange callback @ 91(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``91``—``96`` 行；所属函数 ``rows.map callback @ 71``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rows.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:2441:2533:FUNCTION

.. rubric:: ``rows.map callback @ 93``

.. code-block:: javascript

   rows.map callback @ 93(item, i)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``94`` 行；所属函数 ``onChange callback @ 91``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:2785:2835:FUNCTION

.. rubric:: ``onClick callback @ 104``

.. code-block:: javascript

   onClick callback @ 104()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``rows.map callback @ 71``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:2812:2833:FUNCTION

.. rubric:: ``rows.filter callback @ 104``

.. code-block:: javascript

   rows.filter callback @ 104(_, i)

作为 ``rows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``onClick callback @ 104``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:3056:3105:FUNCTION

.. rubric:: ``onClick callback @ 115``

.. code-block:: javascript

   onClick callback @ 115()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``SecretPairs``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:3302:3327:FUNCTION

.. rubric:: ``useState callback @ 125``

.. code-block:: javascript

   useState callback @ 125()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``ServerEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``serverDraft``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:3428:3503:FUNCTION

.. rubric:: ``set``

.. code-block:: javascript

   set(key, value)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``128``—``129`` 行；所属函数 ``ServerEditor``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValues``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:3459:3502:FUNCTION

.. rubric:: ``setValues callback @ 129``

.. code-block:: javascript

   setValues callback @ 129(current)

设置与 ``Values`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``set``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:3519:4039:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save(event)

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``130``—``150`` 行；所属函数 ``ServerEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``event.preventDefault``、``setBusy``、``setError``、``serverPayload``、``apiClient.patch``、``encodeURIComponent``、``apiClient.post``、``onSaved``、``onClose``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:4095:4153:FUNCTION

.. rubric:: ``onOpenChange callback @ 154``

.. code-block:: javascript

   onOpenChange callback @ 154(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``154``—``156`` 行；所属函数 ``ServerEditor``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:5091:5125:FUNCTION

.. rubric:: ``onChange callback @ 179``

.. code-block:: javascript

   onChange callback @ 179(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:5370:5405:FUNCTION

.. rubric:: ``onChange callback @ 187``

.. code-block:: javascript

   onChange callback @ 187(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``187``—``187`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:5691:5732:FUNCTION

.. rubric:: ``onChange callback @ 196``

.. code-block:: javascript

   onChange callback @ 196(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:6022:6056:FUNCTION

.. rubric:: ``onValueChange callback @ 204``

.. code-block:: javascript

   onValueChange callback @ 204(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``ServerEditor``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:6710:6742:FUNCTION

.. rubric:: ``onCheckedChange callback @ 220``

.. code-block:: javascript

   onCheckedChange callback @ 220(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``220``—``220`` 行；所属函数 ``ServerEditor``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:7360:7397:FUNCTION

.. rubric:: ``onChange callback @ 236``

.. code-block:: javascript

   onChange callback @ 236(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``236``—``236`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:7775:7809:FUNCTION

.. rubric:: ``onChange callback @ 247``

.. code-block:: javascript

   onChange callback @ 247(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:8078:8111:FUNCTION

.. rubric:: ``onChange callback @ 255``

.. code-block:: javascript

   onChange callback @ 255(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:8283:8311:FUNCTION

.. rubric:: ``onChange callback @ 261``

.. code-block:: javascript

   onChange callback @ 261(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``ServerEditor``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:8614:8647:FUNCTION

.. rubric:: ``onChange callback @ 271``

.. code-block:: javascript

   onChange callback @ 271(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``271``—``271`` 行；所属函数 ``ServerEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:8822:8854:FUNCTION

.. rubric:: ``onChange callback @ 277``

.. code-block:: javascript

   onChange callback @ 277(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``ServerEditor``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:9160:9561:FUNCTION

.. rubric:: ``[ ["connectTimeout", "连接超时（秒）", 300], ["callTimeout", "调用超时（秒）", 7200], ["maxConcurrency", "每 Worker 并发上限", 64], ].map callback @ 286``

.. code-block:: javascript

   [ ["connectTimeout", "连接超时（秒）", 300], ["callTimeout", "调用超时（秒）", 7200], ["maxConcurrency", "每 Worker 并发上限", 64], ].map callback @ 286([key, title, max])

作为 ``[ ["connectTimeout", "连接超时（秒）", 300], ["callTimeout", "调用超时（秒）", 7200], ["maxConcurrency", "每 Worker 并发上限", 64], ].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``286``—``297`` 行；所属函数 ``ServerEditor``。

**参数**

``[key, title, max]``
   调用方传入的 ``key, title, max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:9459:9498:FUNCTION

.. rubric:: ``onChange callback @ 294``

.. code-block:: javascript

   onChange callback @ 294(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``294``—``294`` 行；所属函数 ``[ ["connectTimeout", "连接超时（秒）", 300], ["callTimeout", "调用超时（秒）", 7200], ["maxConcurrency", "每 Worker 并发上限", 64], ].map callback @ 286``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``、``Number``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:10349:10379:FUNCTION

.. rubric:: ``useState callback @ 325``

.. code-block:: javascript

   useState callback @ 325()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``ToolPolicies``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:10425:10477:FUNCTION

.. rubric:: ``useState callback @ 326``

.. code-block:: javascript

   useState callback @ 326()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``326``—``327`` 行；所属函数 ``ToolPolicies``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``structuredClone``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:10688:10784:FUNCTION

.. rubric:: ``set``

.. code-block:: javascript

   set(name, key, value)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``333``—``334`` 行；所属函数 ``ToolPolicies``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPolicies``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:10727:10783:FUNCTION

.. rubric:: ``setPolicies callback @ 334``

.. code-block:: javascript

   setPolicies callback @ 334(current)

设置与 ``Policies`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``set``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateToolPolicy``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:10800:11177:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save()

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``335``—``350`` 行；所属函数 ``ToolPolicies``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``setError``、``apiClient.patch``、``encodeURIComponent``、``onSaved``、``onClose``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:11202:11633:FUNCTION

.. rubric:: ``applyAdvanced``

.. code-block:: javascript

   applyAdvanced()

应用与 ``Advanced`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``351``—``363`` 行；所属函数 ``ToolPolicies``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``new Error("策略必须是 JSON 对象。")``。

**主要协作调用**：``JSON.parse``、``Array.isArray``、``setDefaults``、``setPolicies``、``setAdvanced``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:11469:11523:FUNCTION

.. rubric:: ``setPolicies callback @ 357``

.. code-block:: javascript

   setPolicies callback @ 357(current)

设置与 ``Policies`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``applyAdvanced``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:11689:11747:FUNCTION

.. rubric:: ``onOpenChange callback @ 367``

.. code-block:: javascript

   onOpenChange callback @ 367(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``367``—``369`` 行；所属函数 ``ToolPolicies``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:12515:12663:FUNCTION

.. rubric:: ``onClick callback @ 385``

.. code-block:: javascript

   onClick callback @ 385()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``385``—``388`` 行；所属函数 ``ToolPolicies``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvanced``、``setAdvancedText``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:13110:13269:FUNCTION

.. rubric:: ``onChange callback @ 400``

.. code-block:: javascript

   onChange callback @ 400(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``400``—``404`` 行；所属函数 ``ToolPolicies``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDefaults``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:13149:13268:FUNCTION

.. rubric:: ``setDefaults callback @ 401``

.. code-block:: javascript

   setDefaults callback @ 401(current)

设置与 ``Defaults`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``401``—``404`` 行；所属函数 ``onChange callback @ 400``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:13688:13776:FUNCTION

.. rubric:: ``onCheckedChange callback @ 415``

.. code-block:: javascript

   onCheckedChange callback @ 415(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``415``—``416`` 行；所属函数 ``ToolPolicies``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDefaults``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:13731:13775:FUNCTION

.. rubric:: ``setDefaults callback @ 416``

.. code-block:: javascript

   setDefaults callback @ 416(current)

设置与 ``Defaults`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``416``—``416`` 行；所属函数 ``onCheckedChange callback @ 415``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:14048:14209:FUNCTION

.. rubric:: ``onCheckedChange callback @ 424``

.. code-block:: javascript

   onCheckedChange callback @ 424(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``424``—``428`` 行；所属函数 ``ToolPolicies``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDefaults``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:14091:14208:FUNCTION

.. rubric:: ``setDefaults callback @ 425``

.. code-block:: javascript

   setDefaults callback @ 425(current)

设置与 ``Defaults`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``425``—``428`` 行；所属函数 ``onCheckedChange callback @ 424``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:14698:18825:FUNCTION

.. rubric:: ``server.tools.map callback @ 444``

.. code-block:: javascript

   server.tools.map callback @ 444(tool)

作为 ``server.tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``444``—``542`` 行；所属函数 ``ToolPolicies``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={tool.name} className="space-y-3 rounded-xl border p-4"> <div className="flex items-start justify-between gap-4"> <div className="min-w-0"> <div className="break-words…``。

**主要协作调用**：``policyFor``、``String``、``JSON.stringify``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:15661:15728:FUNCTION

.. rubric:: ``onCheckedChange callback @ 466``

.. code-block:: javascript

   onCheckedChange callback @ 466(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``466``—``467`` 行；所属函数 ``server.tools.map callback @ 444``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:16387:16649:FUNCTION

.. rubric:: ``onChange callback @ 482``

.. code-block:: javascript

   onChange callback @ 482(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``482``—``489`` 行；所属函数 ``server.tools.map callback @ 444``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:17357:17637:FUNCTION

.. rubric:: ``onChange callback @ 505``

.. code-block:: javascript

   onChange callback @ 505(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``505``—``512`` 行；所属函数 ``server.tools.map callback @ 444``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:18000:18239:FUNCTION

.. rubric:: ``onClick callback @ 522``

.. code-block:: javascript

   onClick callback @ 522()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``522``—``527`` 行；所属函数 ``server.tools.map callback @ 444``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvanced``、``setAdvancedText``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:19317:19355:FUNCTION

.. rubric:: ``onChange callback @ 553``

.. code-block:: javascript

   onChange callback @ 553(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``553``—``553`` 行；所属函数 ``ToolPolicies``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvancedText``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:19865:19888:FUNCTION

.. rubric:: ``onClick callback @ 567``

.. code-block:: javascript

   onClick callback @ 567()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``567``—``567`` 行；所属函数 ``ToolPolicies``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAdvanced``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21171:21376:FUNCTION

.. rubric:: ``useCallback callback @ 606``

.. code-block:: javascript

   async useCallback callback @ 606()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``606``—``610`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setServers``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21403:21934:FUNCTION

.. rubric:: ``useEffect callback @ 611``

.. code-block:: javascript

   useEffect callback @ 611()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``611``—``630`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; subscription(); for (const timer of timers) clearTimeout(timer); timers.clear(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``load() .catch((cause) => { if (mounted.current) setError(cause.message); }) .finally``、``load() .catch``、``load``、``onEvent({ event: "tool.catalog.changed" }).then``、``onEvent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21463:21537:FUNCTION

.. rubric:: ``load() .catch callback @ 614``

.. code-block:: javascript

   load() .catch callback @ 614(cause)

处理 ``load() .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``614``—``616`` 行；所属函数 ``useEffect callback @ 611``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21554:21617:FUNCTION

.. rubric:: ``load() .catch((cause) => { if (mounted.current) setError(cause.message); }) .finally callback @ 617``

.. code-block:: javascript

   load() .catch((cause) => { if (mounted.current) setError(cause.message); }) .finally callback @ 617()

处理 ``load() .catch((cause) => { if (mounted.current) setError(cause.message); }) .finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``617``—``619`` 行；所属函数 ``useEffect callback @ 611``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21732:21766:FUNCTION

.. rubric:: ``onEvent({ event: "tool.catalog.changed" }).then callback @ 621``

.. code-block:: javascript

   onEvent({ event: "tool.catalog.changed" }).then callback @ 621()

处理 ``onEvent({ event: "tool.catalog.changed" }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``621``—``622`` 行；所属函数 ``useEffect callback @ 611``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load().catch``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21757:21765:FUNCTION

.. rubric:: ``load().catch callback @ 622``

.. code-block:: javascript

   load().catch callback @ 622()

处理 ``load().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``622``—``622`` 行；所属函数 ``onEvent({ event: "tool.catalog.changed" }).then callback @ 621``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21785:21929:FUNCTION

.. rubric:: ``returned callback @ 624``

.. code-block:: javascript

   returned callback @ 624()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``624``—``629`` 行；所属函数 ``useEffect callback @ 611``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``subscription``、``clearTimeout``、``timers.clear``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:21962:22504:FUNCTION

.. rubric:: ``perform``

.. code-block:: javascript

   async perform(id, callback)

实现 ``perform`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``631``—``649`` 行；所属函数 ``MCPSettings``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``busyIds.current.has``、``busyIds.current.add``、``setError``、``setPending``、``callback``、``busyIds.current.delete``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:22092:22149:FUNCTION

.. rubric:: ``setPending callback @ 635``

.. code-block:: javascript

   setPending callback @ 635(current)

设置与 ``Pending`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``635``—``635`` 行；所属函数 ``perform``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:22356:22492:FUNCTION

.. rubric:: ``setPending callback @ 643``

.. code-block:: javascript

   setPending callback @ 643(current)

设置与 ``Pending`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``643``—``647`` 行；所属函数 ``perform``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:22520:23926:FUNCTION

.. rubric:: ``poll``

.. code-block:: javascript

   poll(id, taskId)

实现 ``poll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``650``—``698`` 行；所属函数 ``MCPSettings``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``taskId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setTimeout``、``pollTimers.current.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:22568:23879:FUNCTION

.. rubric:: ``setTimeout callback @ 651``

.. code-block:: javascript

   async setTimeout callback @ 651()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``651``—``696`` 行；所属函数 ``poll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``pollTimers.current.delete``、``apiClient.get``、``encodeURIComponent``、``TERMINAL_PROBE_STATES.has``、``setPending``、``setError``、``load``、``poll``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:22886:23007:FUNCTION

.. rubric:: ``setPending callback @ 660``

.. code-block:: javascript

   setPending callback @ 660(current)

设置与 ``Pending`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``660``—``664`` 行；所属函数 ``setTimeout callback @ 651``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:23337:23512:FUNCTION

.. rubric:: ``setPending callback @ 674``

.. code-block:: javascript

   setPending callback @ 674(current)

设置与 ``Pending`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``674``—``680`` 行；所属函数 ``setTimeout callback @ 651``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:23629:23790:FUNCTION

.. rubric:: ``setPending callback @ 685``

.. code-block:: javascript

   setPending callback @ 685(current)

设置与 ``Pending`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``685``—``691`` 行；所属函数 ``setTimeout callback @ 651``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:23943:24443:FUNCTION

.. rubric:: ``probe``

.. code-block:: javascript

   probe(server, operation)

实现 ``probe`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``699``—``712`` 行；所属函数 ``MCPSettings``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``perform``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:23989:24442:FUNCTION

.. rubric:: ``perform callback @ 700``

.. code-block:: javascript

   async perform callback @ 700()

实现 ``perform`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``700``—``712`` 行；所属函数 ``probe``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error("后台未返回任务标识。")``。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``、``setPending``、``poll``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:24275:24398:FUNCTION

.. rubric:: ``setPending callback @ 707``

.. code-block:: javascript

   setPending callback @ 707(current)

设置与 ``Pending`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``707``—``710`` 行；所属函数 ``perform callback @ 700``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:24461:24907:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   async remove(server)

移除与 ``remove`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``713``—``730`` 行；所属函数 ``MCPSettings``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``confirm``、``perform``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:24707:24901:FUNCTION

.. rubric:: ``perform callback @ 723``

.. code-block:: javascript

   async perform callback @ 723()

实现 ``perform`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``723``—``729`` 行；所属函数 ``remove``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``、``encodeURIComponent``、``load``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:25426:25480:FUNCTION

.. rubric:: ``onClick callback @ 745``

.. code-block:: javascript

   onClick callback @ 745()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``745``—``745`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load().catch``、``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:25445:25479:FUNCTION

.. rubric:: ``load().catch callback @ 745``

.. code-block:: javascript

   load().catch callback @ 745(cause)

处理 ``load().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``745``—``745`` 行；所属函数 ``onClick callback @ 745``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:25586:25607:FUNCTION

.. rubric:: ``onClick callback @ 749``

.. code-block:: javascript

   onClick callback @ 749()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``749``—``749`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:26576:26597:FUNCTION

.. rubric:: ``onClick callback @ 778``

.. code-block:: javascript

   onClick callback @ 778()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``778``—``778`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:26698:34296:FUNCTION

.. rubric:: ``servers.map callback @ 784``

.. code-block:: javascript

   servers.map callback @ 784(server)

作为 ``servers.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``784``—``969`` 行；所属函数 ``MCPSettings``。

**参数**

``server``
   调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``server.transport.toUpperCase``、``Boolean``、``[ ["added", "新增"], ["changed", "变更"], ["removed", "移除"], ].map``、``server.candidateTools?.map``。

**内部回调数量**：10。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:28241:28565:FUNCTION

.. rubric:: ``onCheckedChange callback @ 819``

.. code-block:: javascript

   onCheckedChange callback @ 819(enabled)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``819``—``826`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``perform``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:28290:28564:FUNCTION

.. rubric:: ``perform callback @ 820``

.. code-block:: javascript

   async perform callback @ 820()

实现 ``perform`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``820``—``826`` 行；所属函数 ``onCheckedChange callback @ 819``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.patch``、``encodeURIComponent``、``load``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:29559:29600:FUNCTION

.. rubric:: ``onClick callback @ 850``

.. code-block:: javascript

   onClick callback @ 850()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``850``—``850`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onTask``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:30306:30765:FUNCTION

.. rubric:: ``onClick callback @ 867``

.. code-block:: javascript

   onClick callback @ 867()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``867``—``877`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``perform``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:30352:30764:FUNCTION

.. rubric:: ``perform callback @ 868``

.. code-block:: javascript

   async perform callback @ 868()

实现 ``perform`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``868``—``877`` 行；所属函数 ``onClick callback @ 867``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``、``load``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:31744:32125:FUNCTION

.. rubric:: ``[ ["added", "新增"], ["changed", "变更"], ["removed", "移除"], ].map callback @ 899``

.. code-block:: javascript

   [ ["added", "新增"], ["changed", "变更"], ["removed", "移除"], ].map callback @ 899([key, label])

作为 ``[ ["added", "新增"], ["changed", "变更"], ["removed", "移除"], ].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``899``—``907`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

``[key, label]``
   调用方传入的 ``key, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``server.diff?.[key]?.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:31808:32124:FUNCTION

.. rubric:: ``server.diff?.[key]?.map callback @ 900``

.. code-block:: javascript

   server.diff?.[key]?.map callback @ 900(name)

作为 ``server.diff?.[key]?.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``900``—``907`` 行；所属函数 ``[ ["added", "新增"], ["changed", "变更"], ["removed", "移除"], ].map callback @ 899``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:32198:32676:FUNCTION

.. rubric:: ``server.candidateTools?.map callback @ 909``

.. code-block:: javascript

   server.candidateTools?.map callback @ 909(tool)

作为 ``server.candidateTools?.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``909``—``918`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:33007:33034:FUNCTION

.. rubric:: ``onClick callback @ 928``

.. code-block:: javascript

   onClick callback @ 928()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``928``—``928`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``probe``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:33259:33290:FUNCTION

.. rubric:: ``onClick callback @ 936``

.. code-block:: javascript

   onClick callback @ 936()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``936``—``936`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``probe``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:33507:33532:FUNCTION

.. rubric:: ``onClick callback @ 944``

.. code-block:: javascript

   onClick callback @ 944()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``944``—``944`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPolicies``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:33749:33772:FUNCTION

.. rubric:: ``onClick callback @ 952``

.. code-block:: javascript

   onClick callback @ 952()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``952``—``952`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:34120:34140:FUNCTION

.. rubric:: ``onClick callback @ 962``

.. code-block:: javascript

   onClick callback @ 962()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``962``—``962`` 行；所属函数 ``servers.map callback @ 784``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``remove``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:34437:34463:FUNCTION

.. rubric:: ``onClose callback @ 975``

.. code-block:: javascript

   onClose callback @ 975()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``975``—``975`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

.. CWM-AST-FUNCTION src/components/setting/MCPSettings.jsx:34630:34653:FUNCTION

.. rubric:: ``onClose callback @ 983``

.. code-block:: javascript

   onClose callback @ 983()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``983``—``983`` 行；所属函数 ``MCPSettings``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPolicies``。
