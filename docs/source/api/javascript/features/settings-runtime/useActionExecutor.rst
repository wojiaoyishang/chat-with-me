src/features/settings-runtime/useActionExecutor 模块
============================================================================================================

.. js:module:: src/features/settings-runtime/useActionExecutor

Reads progress only. Retrying a read never repeats the submitted operation.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/useActionExecutor.js``
* **模块标识**：``src/features/settings-runtime/useActionExecutor``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``react``、``./model.js``、``./loadingToasts.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:280:494:FUNCTION

.. js:function:: operationKey(action, scope)

   实现 ``operationKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``5`` 行。

   **参数**

   ``action``
      调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scope``
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:520:994:FUNCTION

.. js:function:: delay(milliseconds, signal)

   实现 ``delay`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``15`` 行。

   **参数**

   ``milliseconds``
      调用方传入的 ``milliseconds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``signal``
      AbortSignal，用于取消异步操作。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve, reject) => { if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; } const cancel = () => { clearTimeout(timer); reject(new DOMExc…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:994:10687:FUNCTION

.. js:function:: useActionExecutor(services)

   Reads progress only. Retrying a read never repeats the submitted operation.

   **性质**：同步函数；导出 API；源码第 ``18``—``161`` 行。

   **参数**

   ``services``
      调用方传入的 ``services`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ execute, operations }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useRef``、``useState``、``useSettingsOperationToasts``、``useEffect``、``useCallback``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:584:990:FUNCTION

.. rubric:: ``anonymous callback @ 9``

.. code-block:: javascript

   anonymous callback @ 9(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``14`` 行；所属函数 ``delay``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``reject``、``setTimeout``、``signal.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:720:802:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``anonymous callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``reject``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:837:902:FUNCTION

.. rubric:: ``setTimeout callback @ 12``

.. code-block:: javascript

   setTimeout callback @ 12()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``anonymous callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``signal.removeEventListener``、``resolve``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1473:2049:FUNCTION

.. rubric:: ``useEffect callback @ 27``

.. code-block:: javascript

   useEffect callback @ 27()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``27``—``41`` 行；所属函数 ``useActionExecutor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; // StrictMode immediately replays effects on the same mounted tree. // Preserve the original read in that replay; a real unmount still // aborts o…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1571:2042:FUNCTION

.. rubric:: ``returned callback @ 30``

.. code-block:: javascript

   returned callback @ 30()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``40`` 行；所属函数 ``useEffect callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``queueMicrotask``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1863:2030:FUNCTION

.. rubric:: ``queueMicrotask callback @ 35``

.. code-block:: javascript

   queueMicrotask callback @ 35()

实现 ``queueMicrotask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``39`` 行；所属函数 ``returned callback @ 30``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``controller.abort``、``active.clear``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:2089:10643:FUNCTION

.. rubric:: ``useCallback callback @ 43``

.. code-block:: javascript

   async useCallback callback @ 43(action, suppliedScope, callbacks)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``43``—``159`` 行；所属函数 ``useActionExecutor``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``suppliedScope`` （默认值 ``{}``）
   调用方传入的 ``suppliedScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``callbacks`` （默认值 ``{}``）
   调用方传入的 ``callbacks`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``response``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 改变前端路由或浏览器历史。

**显式抛出**：``cause``、``new Error('异步操作缺少终止状态定义。')``、``new Error(getValue(progress, watch.errorPath || 'error.message') || getValue(progress, watch.messagePath || 'message') || '操作未完成，请查看详情。')``、``new Error(\x60不支持的操作结果：${effect.type}\x60)``、``error``。

**主要协作调用**：``source.scope``、``operationKey``、``inFlight.current.has``、``inFlight.current.add``、``Object.fromEntries``、``Object.entries(action.confirm).map``、``Object.entries``、``source.confirm``、``inFlight.current.delete``、``controllers.current.add``、``update``、``executeRequest``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:2693:2781:FUNCTION

.. rubric:: ``Object.entries(action.confirm).map callback @ 53``

.. code-block:: javascript

   Object.entries(action.confirm).map callback @ 53([name, value])

作为 ``Object.entries(action.confirm).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``useCallback callback @ 43``。

**参数**

``[name, value]``
   调用方传入的 ``name, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:3303:3442:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(value)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``useCallback callback @ 43``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOperations``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:3390:3438:FUNCTION

.. rubric:: ``setOperations callback @ 65``

.. code-block:: javascript

   setOperations callback @ 65(previous)

设置与 ``Operations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:3761:4021:FUNCTION

.. rubric:: ``onProgress``

.. code-block:: javascript

   onProgress({ message, percent })

处理 ``Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``70``—``73`` 行；所属函数 ``useCallback callback @ 43``。

**参数**

``{ message, percent }``
   调用方传入的 ``message, percent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``update``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:6296:6757:FUNCTION

.. rubric:: ``anonymous callback @ 105``

.. code-block:: javascript

   anonymous callback @ 105(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``109`` 行；所属函数 ``useCallback callback @ 43``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``controller.signal.addEventListener``、``update``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:6361:6417:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``anonymous callback @ 105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reject``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:6577:6727:FUNCTION

.. rubric:: ``retry``

.. code-block:: javascript

   retry()

实现 ``retry`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``anonymous callback @ 105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.signal.removeEventListener``、``update``、``resolve``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:9820:9855:FUNCTION

.. rubric:: ``(action.effects || []).some callback @ 146``

.. code-block:: javascript

   (action.effects || []).some callback @ 146(effect)

作为 ``(action.effects || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``useCallback callback @ 43``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
