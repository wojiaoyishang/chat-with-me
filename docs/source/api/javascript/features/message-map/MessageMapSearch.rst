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

``@/lib/clientText.js``、``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``./useMessageMapSearch.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:493:1982:FUNCTION

.. js:function:: SearchResults({ state, onSelect })

   渲染 ``SearchResults`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``44`` 行。

   **参数**

   ``{ state, onSelect }``
      调用方传入的 ``state, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> {state.items.map((item) => ( <button key={item.messageId} type="button" className="flex min-h-14 w-full flex-col gap-1 rounded-lg px-3 py-3 text-left hover:bg-accent focus-vi…``。

   **主要协作调用**：``state.items.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:1982:10033:FUNCTION

.. js:function:: MessageMapSearch({ conversationId, onSelect })

   渲染 ``MessageMapSearch`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``46``—``234`` 行。

   **参数**

   ``{ conversationId, onSelect }``
      调用方传入的 ``conversationId, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={rootRef} className="relative order-3 mx-auto w-full min-w-0 max-w-2xl basis-full sm:order-none sm:basis-auto sm:flex-1" onKeyDown={(event) => { if (event.key === 'Esca…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useMessageMapSearch``、``useCallback``、``useEffect``、``query.trim``、``Math.max``、``Math.ceil``。

   **内部回调数量**：17。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:594:1344:FUNCTION

.. rubric:: ``state.items.map callback @ 14``

.. code-block:: javascript

   state.items.map callback @ 14(item)

作为 ``state.items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``27`` 行；所属函数 ``SearchResults``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatLocalTimestamp``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:879:899:FUNCTION

.. rubric:: ``onClick callback @ 19``

.. code-block:: javascript

   onClick callback @ 19()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``state.items.map callback @ 14``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2787:2922:FUNCTION

.. rubric:: ``changeQuery``

.. code-block:: javascript

   changeQuery(value)

实现 ``changeQuery`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``69`` 行；所属函数 ``MessageMapSearch``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setDropdownPage``、``setDialogPage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:2948:3026:FUNCTION

.. rubric:: ``showDropdown``

.. code-block:: javascript

   showDropdown()

实现 ``showDropdown`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``73`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDropdownPage``、``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3046:3143:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select(item)

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``78`` 行；所属函数 ``MessageMapSearch``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``、``setShown``、``setDialogOpen``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3178:3406:FUNCTION

.. rubric:: ``useCallback callback @ 79``

.. code-block:: javascript

   useCallback callback @ 79()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``79``—``84`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDropdownPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3380:3398:FUNCTION

.. rubric:: ``setDropdownPage callback @ 83``

.. code-block:: javascript

   setDropdownPage callback @ 83(page)

设置与 ``Dropdown Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``useCallback callback @ 79``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3435:3633:FUNCTION

.. rubric:: ``useEffect callback @ 85``

.. code-block:: javascript

   useEffect callback @ 85()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``90`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``loadMore``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3672:3980:FUNCTION

.. rubric:: ``useEffect callback @ 91``

.. code-block:: javascript

   useEffect callback @ 91()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``91``—``98`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => document.removeEventListener('pointerdown', dismiss)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3741:3839:FUNCTION

.. rubric:: ``dismiss``

.. code-block:: javascript

   dismiss(event)

实现 ``dismiss`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``95`` 行；所属函数 ``useEffect callback @ 91``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rootRef.current?.contains``、``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:3914:3973:FUNCTION

.. rubric:: ``returned callback @ 97``

.. code-block:: javascript

   returned callback @ 97()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``useEffect callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:4190:4277:FUNCTION

.. rubric:: ``onKeyDown callback @ 103``

.. code-block:: javascript

   onKeyDown callback @ 103(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:4576:4717:FUNCTION

.. rubric:: ``onClick callback @ 114``

.. code-block:: javascript

   onClick callback @ 114()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``114``—``118`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShown``、``setDialogPage``、``setDialogOpen``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:4954:5073:FUNCTION

.. rubric:: ``onChange callback @ 126``

.. code-block:: javascript

   onChange callback @ 126(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``126``—``129`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``、``setShown``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:5102:5348:FUNCTION

.. rubric:: ``onKeyDown callback @ 130``

.. code-block:: javascript

   onKeyDown callback @ 130(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``130``—``135`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``select``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:5740:5761:FUNCTION

.. rubric:: ``onClick callback @ 146``

.. code-block:: javascript

   onClick callback @ 146()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:6202:6444:FUNCTION

.. rubric:: ``onScroll callback @ 155``

.. code-block:: javascript

   onScroll callback @ 155(event)

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``155``—``159`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMore``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:7134:7272:FUNCTION

.. rubric:: ``onClick callback @ 172``

.. code-block:: javascript

   onClick callback @ 172()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``175`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShown``、``setDropdownPage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:7726:7866:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 186``

.. code-block:: javascript

   onCloseAutoFocus callback @ 186(event)

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``186``—``189`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``searchButtonRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:8252:8294:FUNCTION

.. rubric:: ``onChange callback @ 198``

.. code-block:: javascript

   onChange callback @ 198(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``198``—``198`` 行；所属函数 ``MessageMapSearch``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:9171:9210:FUNCTION

.. rubric:: ``onClick callback @ 214``

.. code-block:: javascript

   onClick callback @ 214()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDialogPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:9191:9209:FUNCTION

.. rubric:: ``setDialogPage callback @ 214``

.. code-block:: javascript

   setDialogPage callback @ 214(page)

设置与 ``Dialog Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``onClick callback @ 214``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:9795:9834:FUNCTION

.. rubric:: ``onClick callback @ 225``

.. code-block:: javascript

   onClick callback @ 225()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``225``—``225`` 行；所属函数 ``MessageMapSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDialogPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageMapSearch.jsx:9815:9833:FUNCTION

.. rubric:: ``setDialogPage callback @ 225``

.. code-block:: javascript

   setDialogPage callback @ 225(page)

设置与 ``Dialog Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``225``—``225`` 行；所属函数 ``onClick callback @ 225``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
