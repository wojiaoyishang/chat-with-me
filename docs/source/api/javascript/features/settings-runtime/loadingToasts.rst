src/features/settings-runtime/loadingToasts 模块
====================================================================================================

.. js:module:: src/features/settings-runtime/loadingToasts

One floating notice per operation, including paused reads and task links.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/loadingToasts.js``
* **模块标识**：``src/features/settings-runtime/loadingToasts``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:115:1509:FUNCTION

.. js:function:: useSettingsLoadingToast(active, message, { error, retry })

   封装 ``useSettingsLoadingToast`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``6``—``30`` 行。

   **参数**

   ``active``
      调用方传入的 ``active`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ error, retry }`` （默认值 ``{}``）
      调用方传入的 ``error, retry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useId``、``useRef``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:1509:3793:FUNCTION

.. js:function:: useSettingsOperationToasts(operations, navigate)

   One floating notice per operation, including paused reads and task links.

   **性质**：同步函数；导出 API；源码第 ``33``—``70`` 行。

   **参数**

   ``operations``
      调用方传入的 ``operations`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``navigate``
      调用方传入的 ``navigate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useId``、``useRef``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:308:1313:FUNCTION

.. rubric:: ``useEffect callback @ 9``

.. code-block:: javascript

   useEffect callback @ 9()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``9``—``28`` 行；所属函数 ``useSettingsLoadingToast``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``、``toast.loading``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:1095:1146:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event?.preventDefault``、``retry``。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:1370:1501:FUNCTION

.. rubric:: ``useEffect callback @ 29``

.. code-block:: javascript

   useEffect callback @ 29()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``useSettingsLoadingToast``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:1375:1501:FUNCTION

.. rubric:: ``anonymous callback @ 29``

.. code-block:: javascript

   anonymous callback @ 29()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.dismiss``。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:1849:3591:FUNCTION

.. rubric:: ``useEffect callback @ 39``

.. code-block:: javascript

   useEffect callback @ 39()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``65`` 行；所属函数 ``useSettingsOperationToasts``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Object.entries``、``notices.current.get``、``toast.dismiss``、``notices.current.set``、``Number``、``Number.isFinite``、``Math.floor``、``Math.max``、``Math.min``、``render``、``toast.error``、``toast.success``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:2446:2494:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``useEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``navigateRef.current``。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:2586:2649:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``useEffect callback @ 39``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event?.preventDefault``、``operation.retry``。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:3629:3785:FUNCTION

.. rubric:: ``useEffect callback @ 66``

.. code-block:: javascript

   useEffect callback @ 66()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``69`` 行；所属函数 ``useSettingsOperationToasts``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { for (const notice of owned.values()) toast.dismiss(notice.id); owned.clear(); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/loadingToasts.js:3690:3778:FUNCTION

.. rubric:: ``returned callback @ 68``

.. code-block:: javascript

   returned callback @ 68()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``useEffect callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``owned.values``、``toast.dismiss``、``owned.clear``。
