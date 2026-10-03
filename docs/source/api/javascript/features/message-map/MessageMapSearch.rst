src/features/message-map/MessageMapSearch 模块
================================================================================================

.. js:module:: src/features/message-map/MessageMapSearch

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/message-map/MessageMapSearch.jsx``
* **模块标识**：``src/features/message-map/MessageMapSearch``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``./useMessageMapSearch.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:428:1478:FUNCTION

.. js:function:: SearchResults({state, onSelect})

   渲染 ``SearchResults`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``21`` 行。

   **参数**

   ``{state, onSelect}``
      调用方传入的 ``state, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<> {state.items.map(item => <button key={item.messageId} type="button" className="flex min-h-14 w-full flex-col gap-1 rounded-lg px-3 py-3 text-left hover:bg-accent focus-visible:…``。

   **主要协作调用**：``state.items.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:1478:6942:FUNCTION

.. js:function:: MessageMapSearch({conversationId, onSelect})

   渲染 ``MessageMapSearch`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``23``—``82`` 行。

   **参数**

   ``{conversationId, onSelect}``
      调用方传入的 ``conversationId, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div ref={rootRef} className="relative order-3 mx-auto w-full min-w-0 max-w-2xl basis-full sm:order-none sm:basis-auto sm:flex-1" onKeyDown={event => {if (event.key === 'Escape')…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useMessageMapSearch``、``useCallback``、``useEffect``、``query.trim``、``Math.max``、``Math.ceil``。

   **内部回调数量**：17。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:519:1051:FUNCTION

.. rubric:: ``state.items.map callback @ 13``

.. code-block:: javascript

   state.items.map callback @ 13(item)

作为 ``state.items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``16`` 行；所属函数 ``SearchResults``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Date(item.createdAt).toLocaleString``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:704:724:FUNCTION

.. rubric:: ``onClick callback @ 13``

.. code-block:: javascript

   onClick callback @ 13()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``state.items.map callback @ 13``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2244:2339:FUNCTION

.. rubric:: ``changeQuery``

.. code-block:: javascript

   changeQuery(value)

实现 ``changeQuery`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``MessageMapSearch``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setDropdownPage``、``setDialogPage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2366:2424:FUNCTION

.. rubric:: ``showDropdown``

.. code-block:: javascript

   showDropdown()

实现 ``showDropdown`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDropdownPage``、``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2445:2510:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select(item)

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``MessageMapSearch``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``、``setShown``、``setDialogOpen``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2546:2764:FUNCTION

.. rubric:: ``useCallback callback @ 38``

.. code-block:: javascript

   useCallback callback @ 38()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``42`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDropdownPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2739:2755:FUNCTION

.. rubric:: ``setDropdownPage callback @ 41``

.. code-block:: javascript

   setDropdownPage callback @ 41(page)

设置与 ``Dropdown Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``useCallback callback @ 38``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2794:2997:FUNCTION

.. rubric:: ``useEffect callback @ 43``

.. code-block:: javascript

   useEffect callback @ 43()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``48`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMore``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3037:3326:FUNCTION

.. rubric:: ``useEffect callback @ 49``

.. code-block:: javascript

   useEffect callback @ 49()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``54`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => document.removeEventListener('pointerdown', dismiss)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3108:3182:FUNCTION

.. rubric:: ``dismiss``

.. code-block:: javascript

   dismiss(event)

实现 ``dismiss`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rootRef.current?.contains``、``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3259:3318:FUNCTION

.. rubric:: ``returned callback @ 53``

.. code-block:: javascript

   returned callback @ 53()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3491:3546:FUNCTION

.. rubric:: ``onKeyDown callback @ 55``

.. code-block:: javascript

   onKeyDown callback @ 55(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3721:3784:FUNCTION

.. rubric:: ``onClick callback @ 56``

.. code-block:: javascript

   onClick callback @ 56()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShown``、``setDialogPage``、``setDialogOpen``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3909:3968:FUNCTION

.. rubric:: ``onChange callback @ 57``

.. code-block:: javascript

   onChange callback @ 57(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``、``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3981:4117:FUNCTION

.. rubric:: ``onKeyDown callback @ 57``

.. code-block:: javascript

   onKeyDown callback @ 57(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``select``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:4326:4347:FUNCTION

.. rubric:: ``onClick callback @ 58``

.. code-block:: javascript

   onClick callback @ 58()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:4637:4816:FUNCTION

.. rubric:: ``onScroll callback @ 59``

.. code-block:: javascript

   onScroll callback @ 59(event)

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``62`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMore``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:5226:5270:FUNCTION

.. rubric:: ``onClick callback @ 65``

.. code-block:: javascript

   onClick callback @ 65()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShown``、``setDropdownPage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:5536:5604:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 68``

.. code-block:: javascript

   onCloseAutoFocus callback @ 68(event)

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``searchButtonRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:5823:5863:FUNCTION

.. rubric:: ``onChange callback @ 70``

.. code-block:: javascript

   onChange callback @ 70(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:6431:6468:FUNCTION

.. rubric:: ``onClick callback @ 75``

.. code-block:: javascript

   onClick callback @ 75()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDialogPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:6451:6467:FUNCTION

.. rubric:: ``setDialogPage callback @ 75``

.. code-block:: javascript

   setDialogPage callback @ 75(page)

设置与 ``Dialog Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``onClick callback @ 75``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:6802:6839:FUNCTION

.. rubric:: ``onClick callback @ 77``

.. code-block:: javascript

   onClick callback @ 77()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDialogPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:6822:6838:FUNCTION

.. rubric:: ``setDialogPage callback @ 77``

.. code-block:: javascript

   setDialogPage callback @ 77(page)

设置与 ``Dialog Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``onClick callback @ 77``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
