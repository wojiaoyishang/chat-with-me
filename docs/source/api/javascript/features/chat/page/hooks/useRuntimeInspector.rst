src/features/chat/page/hooks/useRuntimeInspector 模块
==============================================================================================================

.. js:module:: src/features/chat/page/hooks/useRuntimeInspector

Runtime Inspector is deliberately isolated from the chat WebSocket lifecycle. The controller owns cancellable HTTP reads and lazy section caches. ChatPage only keeps a stable \`isOpenRef\` / \`markStale\` handle inside its event listener, so opening or closing the dialog can never unsubscribe that listener or invalidate already queued message delta callbacks.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/hooks/useRuntimeInspector.js``
* **模块标识**：``src/features/chat/page/hooks/useRuntimeInspector``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：29

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/apiClient.js``、``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:339:464:FUNCTION

.. js:function:: isCancelledRequest(error)

   判断与 ``Cancelled Request`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``16`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:490:809:FUNCTION

.. js:function:: mergeTabSection(document, tabId, section)

   合并与 ``Tab Section`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``28`` 行。

   **参数**

   ``document``
      调用方传入的 ``document`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``tabId``
      目标对象的公共或运行时标识。

   ``section``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``document``、``{ ...document, tabs: (document.tabs || []).map(tab => ( tab.id === tabId ? {...tab, section: {...(tab.section || {}), ...section}} : tab )), }``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``(document.tabs || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:834:1608:FUNCTION

.. js:function:: mergeModelCall(document, tabId, modelCall)

   合并与 ``Model Call`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``48`` 行。

   **参数**

   ``document``
      调用方传入的 ``document`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``tabId``
      目标对象的公共或运行时标识。

   ``modelCall``
      调用方传入的 ``modelCall`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``document``、``{ ...document, tabs: (document.tabs || []).map(tab => { if (tab.id !== tabId) return tab; const section = tab.section || {}; const calls = Array.isArray(section.modelCalls) ? sect…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``(document.tabs || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:1609:10637:FUNCTION

.. js:function:: useRuntimeInspector(conversationId)

   Runtime Inspector is deliberately isolated from the chat WebSocket lifecycle. The controller owns cancellable HTTP reads and lazy section caches. ChatPage only keeps a stable \`isOpenRef\` / \`markStale\` handle inside its event listener, so opening or closing the dialog can never unsubscribe that listener or invalidate already queued message delta callbacks.

   **性质**：同步函数；导出 API；源码第 ``58``—``289`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ open, document, loading, error, stale, activeTab, modelCallLoadingId, toolCallLoadingId, isOpenRef, openInspector, closeInspector, markStale, selectTab, refresh, loadModelCall,…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:655:798:FUNCTION

.. rubric:: ``(document.tabs || []).map callback @ 22``

.. code-block:: javascript

   (document.tabs || []).map callback @ 22(tab)

作为 ``(document.tabs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``26`` 行；所属函数 ``mergeTabSection``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:1006:1597:FUNCTION

.. rubric:: ``(document.tabs || []).map callback @ 34``

.. code-block:: javascript

   (document.tabs || []).map callback @ 34(tab)

作为 ``(document.tabs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``46`` 行；所属函数 ``mergeModelCall``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tab``、``{...tab, section: {...section, modelCalls: nextCalls}}``。

**主要协作调用**：``Array.isArray``、``calls.findIndex``、``nextCalls.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:1237:1288:FUNCTION

.. rubric:: ``calls.findIndex callback @ 38``

.. code-block:: javascript

   calls.findIndex callback @ 38(item)

实现 ``calls.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``(document.tabs || []).map callback @ 34``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:2735:2950:FUNCTION

.. rubric:: ``useCallback callback @ 74``

.. code-block:: javascript

   useCallback callback @ 74(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``80`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocument``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:2770:2942:FUNCTION

.. rubric:: ``setDocument callback @ 75``

.. code-block:: javascript

   setDocument callback @ 75(current)

设置与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``75``—``79`` 行；所属函数 ``useCallback callback @ 74``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``updater``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:2995:3232:FUNCTION

.. rubric:: ``useCallback callback @ 82``

.. code-block:: javascript

   useCallback callback @ 82()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``82``—``89`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``abortControllerRef.current?.abort``、``setLoading``、``setModelCallLoadingId``、``setToolCallLoadingId``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:3279:4911:FUNCTION

.. rubric:: ``useCallback callback @ 91``

.. code-block:: javascript

   async useCallback callback @ 91({ section, focusMessageId = null, modelCallId = null, silent = false, })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``91``—``135`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ section, focusMessageId = null, modelCallId = null, silent = false, }``
   调用方传入的 ``section, focusMessageId = null, modelCallId = null, silent = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data || null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``abortControllerRef.current?.abort``、``setLoading``、``setError``、``apiClient.get``、``isCancelledRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:4970:5376:FUNCTION

.. rubric:: ``useCallback callback @ 137``

.. code-block:: javascript

   async useCallback callback @ 137({focusMessageId = null, silent = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``137``—``146`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{focusMessageId = null, silent = false}``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null, silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data``。

**主要协作调用**：``requestSection``、``updateDocument``、``setActiveTab``、``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5446:6304:FUNCTION

.. rubric:: ``useCallback callback @ 148``

.. code-block:: javascript

   async useCallback callback @ 148(tabId, { focusMessageId = null, force = false, silent = false, })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``148``—``167`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

``{ focusMessageId = null, force = false, silent = false, }``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null, force = false, silent = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existingTab.section``、``data.section``。

**主要协作调用**：``String``、``setActiveTab``、``(documentRef.current?.tabs || []).find``、``requestSection``、``updateDocument``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5824:5857:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []).find callback @ 158``

.. code-block:: javascript

   (documentRef.current?.tabs || []).find callback @ 158(tab)

作为 ``(documentRef.current?.tabs || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``useCallback callback @ 148``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6187:6267:FUNCTION

.. rubric:: ``updateDocument callback @ 165``

.. code-block:: javascript

   updateDocument callback @ 165(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``useCallback callback @ 148``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeTabSection``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6380:7538:FUNCTION

.. rubric:: ``useCallback callback @ 169``

.. code-block:: javascript

   async useCallback callback @ 169(modelCallId, {silent = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``169``—``193`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

``{silent = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``data?.modelCall || null``。

**主要协作调用**：``String(modelCallId || '').trim``、``String``、``(documentRef.current?.tabs || []) .find(tab => tab.id === 'model-request')?.section?.modelCalls ?.find``、``(documentRef.current?.tabs || []) .find``、``setModelCallLoadingId``、``requestSection``、``updateDocument``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6588:6621:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find callback @ 173``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find callback @ 173(tab)

作为 ``(documentRef.current?.tabs || []) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``useCallback callback @ 169``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6663:6695:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find(tab => tab.id === 'model-request')?.section?.modelCalls ?.find callback @ 174``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find(tab => tab.id === 'model-request')?.section?.modelCalls ?.find callback @ 174(item)

作为 ``(documentRef.current?.tabs || []) .find(tab => tab.id === 'model-request')?.section?.modelCalls ?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``useCallback callback @ 169``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6938:7407:FUNCTION

.. rubric:: ``updateDocument callback @ 180``

.. code-block:: javascript

   updateDocument callback @ 180(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``180``—``189`` 行；所属函数 ``useCallback callback @ 169``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``mergeModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7450:7490:FUNCTION

.. rubric:: ``setModelCallLoadingId callback @ 191``

.. code-block:: javascript

   setModelCallLoadingId callback @ 191(current)

设置与 ``Model Call Loading Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useCallback callback @ 169``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7613:8531:FUNCTION

.. rubric:: ``useCallback callback @ 195``

.. code-block:: javascript

   async useCallback callback @ 195(modelCallId, {silent = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``195``—``214`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

``{silent = false}``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``data?.modelCall || null``。

**主要协作调用**：``String(modelCallId || '').trim``、``String``、``(documentRef.current?.tabs || []) .find(tab => tab.id === 'tools')?.section?.modelCalls ?.find``、``(documentRef.current?.tabs || []) .find``、``setToolCallLoadingId``、``requestSection``、``updateDocument``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7821:7846:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find callback @ 199``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find callback @ 199(tab)

作为 ``(documentRef.current?.tabs || []) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``useCallback callback @ 195``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7888:7920:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find(tab => tab.id === 'tools')?.section?.modelCalls ?.find callback @ 200``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find(tab => tab.id === 'tools')?.section?.modelCalls ?.find callback @ 200(item)

作为 ``(documentRef.current?.tabs || []) .find(tab => tab.id === 'tools')?.section?.modelCalls ?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``useCallback callback @ 195``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8191:8401:FUNCTION

.. rubric:: ``updateDocument callback @ 206``

.. code-block:: javascript

   updateDocument callback @ 206(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``206``—``210`` 行；所属函数 ``useCallback callback @ 195``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``mergeModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8443:8483:FUNCTION

.. rubric:: ``setToolCallLoadingId callback @ 212``

.. code-block:: javascript

   setToolCallLoadingId callback @ 212(current)

设置与 ``Tool Call Loading Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``useCallback callback @ 195``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8607:8777:FUNCTION

.. rubric:: ``useCallback callback @ 216``

.. code-block:: javascript

   useCallback callback @ 216({focusMessageId = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``216``—``221`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{focusMessageId = null}``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``loadOverview({focusMessageId})``。

**主要协作调用**：``setOpen``、``setStale``、``loadOverview``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8836:8932:FUNCTION

.. rubric:: ``useCallback callback @ 223``

.. code-block:: javascript

   useCallback callback @ 223()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``223``—``227`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``abortRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8986:9046:FUNCTION

.. rubric:: ``useCallback callback @ 229``

.. code-block:: javascript

   useCallback callback @ 229()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``229``—``231`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9088:9288:FUNCTION

.. rubric:: ``useCallback callback @ 233``

.. code-block:: javascript

   useCallback callback @ 233(tabId, {focusMessageId = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``233``—``238`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

``{focusMessageId = null}``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``loadTab(id, {focusMessageId})``。

**主要协作调用**：``String``、``setActiveTab``、``loadTab``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9335:9780:FUNCTION

.. rubric:: ``useCallback callback @ 240``

.. code-block:: javascript

   async useCallback callback @ 240({focusMessageId = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``240``—``251`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{focusMessageId = null}``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``documentRef.current``。

**主要协作调用**：``loadOverview``、``setActiveTab``、``loadTab``、``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9823:10100:FUNCTION

.. rubric:: ``useEffect callback @ 253``

.. code-block:: javascript

   useEffect callback @ 253()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``253``—``263`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setDocument``、``setError``、``setStale``、``setActiveTab``、``abortRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10150:10289:FUNCTION

.. rubric:: ``useEffect callback @ 265``

.. code-block:: javascript

   useEffect callback @ 265()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``265``—``269`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10155:10289:FUNCTION

.. rubric:: ``anonymous callback @ 265``

.. code-block:: javascript

   anonymous callback @ 265()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``269`` 行；所属函数 ``useEffect callback @ 265``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``abortControllerRef.current?.abort``。
