src/features/workflows/WorkflowSidebar 模块
==========================================================================================

.. js:module:: src/features/workflows/WorkflowSidebar

Keep controls mounted while drawers switch; opening never resizes the canvas.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSidebar.jsx``
* **模块标识**：``src/features/workflows/WorkflowSidebar``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:309:4444:FUNCTION

.. js:function:: WorkflowSidebar({ active, onActiveChange, templates, details, transfer, })

   Keep controls mounted while drawers switch; opening never resizes the canvas.

   **性质**：同步函数；导出 API；源码第 ``11``—``134`` 行。

   **参数**

   ``{ active, onActiveChange, templates, details, transfer, }``
      调用方传入的 ``active, onActiveChange, templates, details, transfer,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <aside ref={root} className="workflow-sidebar" aria-label="工作流设置"> <nav className="workflow-sidebar-rail" aria-label="工作流侧边栏"> {sections.map((section) => { const { id: key, titl…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useId``、``useRef``、``sections.find``、``useEffect``、``sections.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:758:792:FUNCTION

.. rubric:: ``sections.find callback @ 25``

.. code-block:: javascript

   sections.find callback @ 25(section)

作为 ``sections.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``WorkflowSidebar``。

**参数**

``section``
   调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:807:1148:FUNCTION

.. rubric:: ``useEffect callback @ 26``

.. code-block:: javascript

   useEffect callback @ 26()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``26``—``34`` 行；所属函数 ``WorkflowSidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``heading.current?.focus``、``buttons.current[previous.current]?.focus``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:1174:2327:FUNCTION

.. rubric:: ``useEffect callback @ 35``

.. code-block:: javascript

   useEffect callback @ 35()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``66`` 行；所属函数 ``WorkflowSidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { document.removeEventListener("pointerdown", dismiss, true); document.removeEventListener("focusin", dismiss, true); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:1309:1906:FUNCTION

.. rubric:: ``inside``

.. code-block:: javascript

   inside(target)

实现 ``inside`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``54`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``[...element.querySelectorAll("[aria-controls], [aria-owns]")].some( (trigger) => [ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .fl…``。

**主要协作调用**：``element.contains``、``[...element.querySelectorAll("[aria-controls], [aria-owns]")].some``、``element.querySelectorAll``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:1552:1890:FUNCTION

.. rubric:: ``[...element.querySelectorAll("[aria-controls], [aria-owns]")].some callback @ 43``

.. code-block:: javascript

   [...element.querySelectorAll("[aria-controls], [aria-owns]")].some callback @ 43(trigger)

作为 ``[...element.querySelectorAll("[aria-controls], [aria-owns]")].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``52`` 行；所属函数 ``inside``。

**参数**

``trigger``
   调用方传入的 ``trigger`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap((value) => valu…``、``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap``、``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter``、``trigger.getAttribute``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:1746:1775:FUNCTION

.. rubric:: ``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap callback @ 49``

.. code-block:: javascript

   [ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap callback @ 49(value)

实现 ``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``[...element.querySelectorAll("[aria-controls], [aria-owns]")].some callback @ 43``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.split``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:1795:1875:FUNCTION

.. rubric:: ``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap((value) => valu… callback @ 50``

.. code-block:: javascript

   [ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap((value) => valu… callback @ 50(id)

实现 ``[ trigger.getAttribute("aria-controls"), trigger.getAttribute("aria-owns"), ] .filter(Boolean) .flatMap((value) => valu…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``51`` 行；所属函数 ``[...element.querySelectorAll("[aria-controls], [aria-owns]")].some callback @ 43``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.ownerDocument.getElementById(id)?.contains``、``element.ownerDocument.getElementById``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:1927:2050:FUNCTION

.. rubric:: ``dismiss``

.. code-block:: javascript

   dismiss(event)

实现 ``dismiss`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``55``—``59`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``inside``、``onActiveChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:2180:2322:FUNCTION

.. rubric:: ``returned callback @ 62``

.. code-block:: javascript

   returned callback @ 62()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:2580:3637:FUNCTION

.. rubric:: ``sections.map callback @ 71``

.. code-block:: javascript

   sections.map callback @ 71(section)

作为 ``sections.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``71``—``102`` 行；所属函数 ``WorkflowSidebar``。

**参数**

``section``
   调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={key} ref={(element) => { buttons.current[key] = element; }} type="button" title={title} aria-label={title} aria-expanded={active === key} aria-controls={\x60${id}-${ke…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:2729:2807:FUNCTION

.. rubric:: ``ref callback @ 76``

.. code-block:: javascript

   ref callback @ 76(element)

实现 ``ref`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``sections.map callback @ 71``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:3076:3303:FUNCTION

.. rubric:: ``onMouseEnter callback @ 85``

.. code-block:: javascript

   onMouseEnter callback @ 85()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``91`` 行；所属函数 ``sections.map callback @ 71``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``root.current?.contains``、``onActiveChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:3328:3535:FUNCTION

.. rubric:: ``onClick callback @ 92``

.. code-block:: javascript

   onClick callback @ 92()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``92``—``97`` 行；所属函数 ``sections.map callback @ 71``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onActiveChange``、``heading.current?.focus``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:4012:4038:FUNCTION

.. rubric:: ``onClick callback @ 116``

.. code-block:: javascript

   onClick callback @ 116()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``WorkflowSidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onActiveChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSidebar.jsx:4149:4405:FUNCTION

.. rubric:: ``sections.map callback @ 121``

.. code-block:: javascript

   sections.map callback @ 121({ id: key })

作为 ``sections.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``121``—``130`` 行；所属函数 ``WorkflowSidebar``。

**参数**

``{ id: key }``
   调用方传入的 ``id: key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
