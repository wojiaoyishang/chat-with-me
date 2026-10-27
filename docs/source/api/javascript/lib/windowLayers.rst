src/lib/windowLayers 模块
================================================================================

.. js:module:: src/lib/windowLayers

DOM controls can portal outside React while remaining inside one window.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/windowLayers.js``
* **模块标识**：``src/lib/windowLayers``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``react``、``zustand``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/windowLayers.js:483:587:FUNCTION

.. js:function:: remove(id)

   移除与 ``remove`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``11`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useWindowLayers.setState``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:602:755:FUNCTION

.. js:function:: raise(id)

   实现 ``raise`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``13`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useWindowLayers.setState``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:788:845:FUNCTION

.. js:function:: isTopWindowLayer(id)

   判断与 ``Top Window Layer`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``14``—``14`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useWindowLayers.getState().windows.at``、``useWindowLayers.getState``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:881:1096:FUNCTION

.. js:function:: isOtherWindowTarget(event, id)

   判断与 ``Other Window Target`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``19`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean(owner && owner !== id)``。

   **主要协作调用**：``target?.closest``、``Boolean``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1220:1445:FUNCTION

.. js:function:: isOwnedWindowPopoverTarget(event, id)

   判断与 ``Owned Window Popover Target`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``22``—``26`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean(id && surface?.dataset.windowLayer === id)``。

   **主要协作调用**：``target?.closest``、``Boolean``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1446:1951:FUNCTION

.. js:function:: useWindowLayer(active)

   封装 ``useWindowLayer`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``28``—``39`` 行。

   **参数**

   ``active``
      调用方传入的 ``active`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``useMemo(() => ({ id, active, activate, zIndex: BASE + (Math.max(0, index) + 1) * STEP }), [id, active, activate, index])``。

   **主要协作调用**：``useId``、``useWindowLayers``、``useLayoutEffect``、``useCallback``、``useMemo``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1951:2333:FUNCTION

.. js:function:: useWindowPopoverLayer()

   封装 ``useWindowPopoverLayer`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``42``—``47`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ zIndex: (owner?.active ? owner.zIndex : BASE + count * STEP) + 20, 'data-window-layer': owner?.active ? owner.id : undefined }``。

   **主要协作调用**：``useContext``、``useWindowLayers``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:442:465:FUNCTION

.. rubric:: ``create callback @ 9``

.. code-block:: javascript

   create callback @ 9()

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``9``—``9`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:517:586:FUNCTION

.. rubric:: ``useWindowLayers.setState callback @ 11``

.. code-block:: javascript

   useWindowLayers.setState callback @ 11(state)

封装 ``WindowLayers.setState`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``remove``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``state.windows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:561:582:FUNCTION

.. rubric:: ``state.windows.filter callback @ 11``

.. code-block:: javascript

   state.windows.filter callback @ 11(item)

作为 ``state.windows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``useWindowLayers.setState callback @ 11``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:636:754:FUNCTION

.. rubric:: ``useWindowLayers.setState callback @ 12``

.. code-block:: javascript

   useWindowLayers.setState callback @ 12(state)

封装 ``WindowLayers.setState`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``12``—``13`` 行；所属函数 ``raise``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``state.windows.at``、``state.windows.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:725:746:FUNCTION

.. rubric:: ``state.windows.filter callback @ 13``

.. code-block:: javascript

   state.windows.filter callback @ 13(item)

作为 ``state.windows.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``useWindowLayers.setState callback @ 12``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1547:1583:FUNCTION

.. rubric:: ``useWindowLayers callback @ 30``

.. code-block:: javascript

   useWindowLayers callback @ 30(state)

封装 ``WindowLayers`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``useWindowLayer``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``state.windows.indexOf``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1606:1710:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 31``

.. code-block:: javascript

   useLayoutEffect callback @ 31()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``31``—``35`` 行；所属函数 ``useWindowLayer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => remove(id)``。

**主要协作调用**：``raise``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1686:1703:FUNCTION

.. rubric:: ``returned callback @ 34``

.. code-block:: javascript

   returned callback @ 34()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``useLayoutEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``remove``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1760:1792:FUNCTION

.. rubric:: ``useCallback callback @ 36``

.. code-block:: javascript

   useCallback callback @ 36()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``useWindowLayer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``raise``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:1828:1908:FUNCTION

.. rubric:: ``useMemo callback @ 37``

.. code-block:: javascript

   useMemo callback @ 37()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useWindowLayer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/lib/windowLayers.js:2149:2180:FUNCTION

.. rubric:: ``useWindowLayers callback @ 44``

.. code-block:: javascript

   useWindowLayers callback @ 44(state)

封装 ``WindowLayers`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``useWindowPopoverLayer``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
