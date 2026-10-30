src/features/settings-runtime/useActionExecutor 模块
============================================================================================================

.. js:module:: src/features/settings-runtime/useActionExecutor

Dialog results may address only their captured form, never storage or global scope.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/useActionExecutor.js``
* **模块标识**：``src/features/settings-runtime/useActionExecutor``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：19

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

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:520:912:FUNCTION

.. js:function:: settingsDialogTarget(target)

   Dialog results may address only their captured form, never storage or global scope.

   **性质**：同步函数；导出 API；源码第 ``9``—``14`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``target``。

   **显式抛出**：``new Error('弹窗结果只能应用到原表单的有效路径。')``。

   **主要协作调用**：``/^form(?:\.[A-Za-z0-9_-]+)*$/.test``、``target.split('.').some``、``target.split``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:912:1386:FUNCTION

.. js:function:: delay(milliseconds, signal)

   实现 ``delay`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``23`` 行。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1386:13728:FUNCTION

.. js:function:: useActionExecutor(services)

   Reads progress only. Retrying a read never repeats the submitted operation.

   **性质**：同步函数；导出 API；源码第 ``26``—``211`` 行。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:776:842:FUNCTION

.. rubric:: ``target.split('.').some callback @ 11``

.. code-block:: javascript

   target.split('.').some callback @ 11(part)

作为 ``target.split('.').some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``settingsDialogTarget``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['__proto__', 'prototype', 'constructor'].includes``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:976:1382:FUNCTION

.. rubric:: ``anonymous callback @ 17``

.. code-block:: javascript

   anonymous callback @ 17(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``22`` 行；所属函数 ``delay``。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1112:1194:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``anonymous callback @ 17``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``reject``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1229:1294:FUNCTION

.. rubric:: ``setTimeout callback @ 20``

.. code-block:: javascript

   setTimeout callback @ 20()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``anonymous callback @ 17``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``signal.removeEventListener``、``resolve``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1865:2441:FUNCTION

.. rubric:: ``useEffect callback @ 35``

.. code-block:: javascript

   useEffect callback @ 35()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``49`` 行；所属函数 ``useActionExecutor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; // StrictMode immediately replays effects on the same mounted tree. // Preserve the original read in that replay; a real unmount still // aborts o…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:1963:2434:FUNCTION

.. rubric:: ``returned callback @ 38``

.. code-block:: javascript

   returned callback @ 38()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``48`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``queueMicrotask``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:2255:2422:FUNCTION

.. rubric:: ``queueMicrotask callback @ 43``

.. code-block:: javascript

   queueMicrotask callback @ 43()

实现 ``queueMicrotask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``47`` 行；所属函数 ``returned callback @ 38``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``controller.abort``、``active.clear``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:2481:13684:FUNCTION

.. rubric:: ``useCallback callback @ 51``

.. code-block:: javascript

   async useCallback callback @ 51(action, suppliedScope, callbacks)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``51``—``209`` 行；所属函数 ``useActionExecutor``。

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

**显式抛出**：``new Error('弹窗草稿保护字段无效。')``、``new Error('替换弹窗不能重新指定结果表单。')``、``cause``、``new Error('异步操作缺少终止状态定义。')``、``new Error(getValue(progress, watch.errorPath || 'error.message') || getValue(progress, watch.messagePath || 'message') || '操作未完成，请查看详情。')``、``new Error('当前操作没有可替换的弹窗。')``、``new Error('当前操作没有可接收结果的表单。')``、``new Error('当前弹窗没有可应用的原表单。')``。

**主要协作调用**：``source.scope``、``source.captureDraft``、``Array.isArray``、``settingsDialogTarget``、``formGuards.set``、``JSON.stringify``、``getValue``、``operationKey``、``inFlight.current.has``、``inFlight.current.add``、``Object.fromEntries``、``Object.entries(action.confirm).map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:3212:3442:FUNCTION

.. rubric:: ``formStillCurrent``

.. code-block:: javascript

   formStillCurrent()

实现 ``formStillCurrent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``63``—``64`` 行；所属函数 ``useCallback callback @ 51``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``draft.isCurrent``、``callbacks.isCurrent``、``[...formGuards].every``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:3337:3441:FUNCTION

.. rubric:: ``[...formGuards].every callback @ 64``

.. code-block:: javascript

   [...formGuards].every callback @ 64([path, value])

作为 ``[...formGuards].every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``formStillCurrent``。

**参数**

``[path, value]``
   调用方传入的 ``path, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``、``getValue``、``callbacks.readForm``、``draft?.readForm``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:4144:4232:FUNCTION

.. rubric:: ``Object.entries(action.confirm).map callback @ 76``

.. code-block:: javascript

   Object.entries(action.confirm).map callback @ 76([name, value])

作为 ``Object.entries(action.confirm).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``useCallback callback @ 51``。

**参数**

``[name, value]``
   调用方传入的 ``name, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:4754:4893:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(value)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``useCallback callback @ 51``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOperations``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:4841:4889:FUNCTION

.. rubric:: ``setOperations callback @ 88``

.. code-block:: javascript

   setOperations callback @ 88(previous)

设置与 ``Operations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``update``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:5212:5472:FUNCTION

.. rubric:: ``onProgress``

.. code-block:: javascript

   onProgress({ message, percent })

处理 ``Progress`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``96`` 行；所属函数 ``useCallback callback @ 51``。

**参数**

``{ message, percent }``
   调用方传入的 ``message, percent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``update``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:7747:8208:FUNCTION

.. rubric:: ``anonymous callback @ 128``

.. code-block:: javascript

   anonymous callback @ 128(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``132`` 行；所属函数 ``useCallback callback @ 51``。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:7812:7868:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``anonymous callback @ 128``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reject``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:8028:8178:FUNCTION

.. rubric:: ``retry``

.. code-block:: javascript

   retry()

实现 ``retry`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``anonymous callback @ 128``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.signal.removeEventListener``、``update``、``resolve``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:11160:11614:FUNCTION

.. rubric:: ``anonymous callback @ 173``

.. code-block:: javascript

   anonymous callback @ 173(result)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``179`` 行；所属函数 ``useCallback callback @ 51``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``new Error('原表单已关闭或改变，请重新打开配置。')``、``new Error('弹窗结果必须是表单对象。')``。

**主要协作调用**：``formStillCurrent``、``Array.isArray``、``patch``、``cloneData``。

.. CWM-AST-FUNCTION src/features/settings-runtime/useActionExecutor.js:12861:12896:FUNCTION

.. rubric:: ``(action.effects || []).some callback @ 196``

.. code-block:: javascript

   (action.effects || []).some callback @ 196(effect)

作为 ``(action.effects || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``useCallback callback @ 51``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
