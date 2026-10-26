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
* **局部函数与匿名回调**：32

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/apiClient.js``、``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:343:456:FUNCTION

.. js:function:: isCancelledRequest(error)

   判断与 ``Cancelled Request`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``13`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:482:773:FUNCTION

.. js:function:: mergeTabSection(document, tabId, section)

   合并与 ``Tab Section`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``23`` 行。

   **参数**

   ``document``
      调用方传入的 ``document`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``tabId``
      目标对象的公共或运行时标识。

   ``section``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``document``、``{ ...document, tabs: (document.tabs || []).map((tab) => tab.id === tabId ? { ...tab, section: { ...(tab.section || {}), ...section } } : tab, ), }``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``(document.tabs || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:798:1582:FUNCTION

.. js:function:: mergeModelCall(document, tabId, modelCall)

   合并与 ``Model Call`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``43`` 行。

   **参数**

   ``document``
      调用方传入的 ``document`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``tabId``
      目标对象的公共或运行时标识。

   ``modelCall``
      调用方传入的 ``modelCall`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``document``、``{ ...document, tabs: (document.tabs || []).map((tab) => { if (tab.id !== tabId) return tab; const section = tab.section || {}; const calls = Array.isArray(section.modelCalls) ? se…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``(document.tabs || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:1583:12464:FUNCTION

.. js:function:: useRuntimeInspector(conversationId, branchKey)

   Runtime Inspector is deliberately isolated from the chat WebSocket lifecycle. The controller owns cancellable HTTP reads and lazy section caches. ChatPage only keeps a stable \`isOpenRef\` / \`markStale\` handle inside its event listener, so opening or closing the dialog can never unsubscribe that listener or invalidate already queued message delta callbacks.

   **性质**：同步函数；导出 API；源码第 ``53``—``322`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``branchKey`` （默认值 ``''``）
      调用方传入的 ``branchKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ open, document, loading, error, stale, activeTab, modelCallLoadingId, toolCallLoadingId, isOpenRef, openInspector, closeInspector, markStale, selectTab, refresh, loadModelCall,…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：15。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:647:752:FUNCTION

.. rubric:: ``(document.tabs || []).map callback @ 19``

.. code-block:: javascript

   (document.tabs || []).map callback @ 19(tab)

作为 ``(document.tabs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``20`` 行；所属函数 ``mergeTabSection``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:970:1571:FUNCTION

.. rubric:: ``(document.tabs || []).map callback @ 29``

.. code-block:: javascript

   (document.tabs || []).map callback @ 29(tab)

作为 ``(document.tabs || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``29``—``41`` 行；所属函数 ``mergeModelCall``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tab``、``{ ...tab, section: { ...section, modelCalls: nextCalls } }``。

**主要协作调用**：``Array.isArray``、``calls.findIndex``、``nextCalls.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:1203:1256:FUNCTION

.. rubric:: ``calls.findIndex callback @ 33``

.. code-block:: javascript

   calls.findIndex callback @ 33(item)

实现 ``calls.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``(document.tabs || []).map callback @ 29``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:2725:3067:FUNCTION

.. rubric:: ``useCallback callback @ 69``

.. code-block:: javascript

   useCallback callback @ 69(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``69``—``75`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updater``、``setDocument``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:3112:3349:FUNCTION

.. rubric:: ``useCallback callback @ 77``

.. code-block:: javascript

   useCallback callback @ 77()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``84`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``abortControllerRef.current?.abort``、``setLoading``、``setModelCallLoadingId``、``setToolCallLoadingId``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:3396:5297:FUNCTION

.. rubric:: ``useCallback callback @ 87``

.. code-block:: javascript

   async useCallback callback @ 87({ section, focusMessageId = null, modelCallId = null, eventId = null, query = '', silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``87``—``128`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ section, focusMessageId = null, modelCallId = null, eventId = null, query = '', silent = false }``
   调用方传入的 ``section, focusMessageId = null, modelCallId = null, eventId = null, query = '', silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data || null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``abortControllerRef.current?.abort``、``setLoading``、``setError``、``apiClient.get``、``isCancelledRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5370:6005:FUNCTION

.. rubric:: ``useCallback callback @ 133``

.. code-block:: javascript

   async useCallback callback @ 133({ focusMessageId = null, silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``133``—``145`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ focusMessageId = null, silent = false }`` （默认值 ``{}``）
   调用方传入的 ``focusMessageId = null, silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data``。

**主要协作调用**：``requestSection``、``data.tabs?.some``、``updateDocument``、``setActiveTab``、``setStale``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5698:5729:FUNCTION

.. rubric:: ``data.tabs?.some callback @ 137``

.. code-block:: javascript

   data.tabs?.some callback @ 137(tab)

作为 ``data.tabs?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``useCallback callback @ 133``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6089:6985:FUNCTION

.. rubric:: ``useCallback callback @ 150``

.. code-block:: javascript

   async useCallback callback @ 150(tabId, { focusMessageId = null, force = false, silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``150``—``165`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

``{ focusMessageId = null, force = false, silent = false }`` （默认值 ``{}``）
   调用方传入的 ``focusMessageId = null, force = false, silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existingTab.section``、``data.section``。

**主要协作调用**：``String``、``setActiveTab``、``(documentRef.current?.tabs || []).find``、``requestSection``、``updateDocument``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6467:6502:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []).find callback @ 156``

.. code-block:: javascript

   (documentRef.current?.tabs || []).find callback @ 156(tab)

作为 ``(documentRef.current?.tabs || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``useCallback callback @ 150``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6858:6940:FUNCTION

.. rubric:: ``updateDocument callback @ 163``

.. code-block:: javascript

   updateDocument callback @ 163(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``useCallback callback @ 150``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeTabSection``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7075:8339:FUNCTION

.. rubric:: ``useCallback callback @ 170``

.. code-block:: javascript

   async useCallback callback @ 170(modelCallId, { silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``170``—``194`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

``{ silent = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``data?.modelCall || null``。

**主要协作调用**：``String(modelCallId || '').trim``、``String``、``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'timeline') ?.section?.modelCalls?.find``、``(documentRef.current?.tabs || []) .find``、``setModelCallLoadingId``、``requestSection``、``updateDocument``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7310:7340:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find callback @ 174``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find callback @ 174(tab)

作为 ``(documentRef.current?.tabs || []) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``useCallback callback @ 170``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7386:7420:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'timeline') ?.section?.modelCalls?.find callback @ 175``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find((tab) => tab.id === 'timeline') ?.section?.modelCalls?.find callback @ 175(item)

作为 ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'timeline') ?.section?.modelCalls?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``useCallback callback @ 170``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7686:8188:FUNCTION

.. rubric:: ``updateDocument callback @ 181``

.. code-block:: javascript

   updateDocument callback @ 181(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``181``—``190`` 行；所属函数 ``useCallback callback @ 170``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``mergeModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8239:8283:FUNCTION

.. rubric:: ``setModelCallLoadingId callback @ 192``

.. code-block:: javascript

   setModelCallLoadingId callback @ 192(current)

设置与 ``Model Call Loading Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``useCallback callback @ 170``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8428:9438:FUNCTION

.. rubric:: ``useCallback callback @ 199``

.. code-block:: javascript

   async useCallback callback @ 199(modelCallId, { silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``199``—``218`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

``{ silent = false }`` （默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``data?.modelCall || null``。

**主要协作调用**：``String(modelCallId || '').trim``、``String``、``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find``、``(documentRef.current?.tabs || []) .find``、``setToolCallLoadingId``、``requestSection``、``updateDocument``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8663:8690:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find callback @ 203``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find callback @ 203(tab)

作为 ``(documentRef.current?.tabs || []) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``203``—``203`` 行；所属函数 ``useCallback callback @ 199``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8736:8770:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find callback @ 204``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find callback @ 204(item)

作为 ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``useCallback callback @ 199``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9065:9288:FUNCTION

.. rubric:: ``updateDocument callback @ 210``

.. code-block:: javascript

   updateDocument callback @ 210(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``210``—``214`` 行；所属函数 ``useCallback callback @ 199``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``mergeModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9338:9382:FUNCTION

.. rubric:: ``setToolCallLoadingId callback @ 216``

.. code-block:: javascript

   setToolCallLoadingId callback @ 216(current)

设置与 ``Tool Call Loading Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``useCallback callback @ 199``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9528:9946:FUNCTION

.. rubric:: ``useCallback callback @ 223``

.. code-block:: javascript

   async useCallback callback @ 223({ focusMessageId = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``223``—``232`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ focusMessageId = null }`` （默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``overview``。

**主要协作调用**：``setOpen``、``setStale``、``loadOverview``、``loadTab``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10028:10124:FUNCTION

.. rubric:: ``useCallback callback @ 236``

.. code-block:: javascript

   useCallback callback @ 236()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``236``—``240`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``abortRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10178:10238:FUNCTION

.. rubric:: ``useCallback callback @ 242``

.. code-block:: javascript

   useCallback callback @ 242()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``242``—``244`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10280:10513:FUNCTION

.. rubric:: ``useCallback callback @ 247``

.. code-block:: javascript

   useCallback callback @ 247(tabId, { focusMessageId = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``247``—``252`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

``{ focusMessageId = null }`` （默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``loadTab(id, { focusMessageId })``。

**主要协作调用**：``String``、``setActiveTab``、``loadTab``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10574:11078:FUNCTION

.. rubric:: ``useCallback callback @ 257``

.. code-block:: javascript

   async useCallback callback @ 257({ focusMessageId = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``257``—``268`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ focusMessageId = null }`` （默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``documentRef.current``。

**主要协作调用**：``loadOverview``、``setActiveTab``、``loadTab``、``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11135:11412:FUNCTION

.. rubric:: ``useEffect callback @ 272``

.. code-block:: javascript

   useEffect callback @ 272()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``272``—``282`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setDocument``、``setError``、``setStale``、``setActiveTab``、``abortRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11511:11868:FUNCTION

.. rubric:: ``useEffect callback @ 285``

.. code-block:: javascript

   useEffect callback @ 285()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``293`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``abortRequest``、``updateDocument``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11781:11806:FUNCTION

.. rubric:: ``window.setTimeout callback @ 291``

.. code-block:: javascript

   window.setTimeout callback @ 291()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``useEffect callback @ 285``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11828:11861:FUNCTION

.. rubric:: ``returned callback @ 292``

.. code-block:: javascript

   returned callback @ 292()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``292``—``292`` 行；所属函数 ``useEffect callback @ 285``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11938:12102:FUNCTION

.. rubric:: ``useEffect callback @ 296``

.. code-block:: javascript

   useEffect callback @ 296()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``296``—``300`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11952:12102:FUNCTION

.. rubric:: ``anonymous callback @ 296``

.. code-block:: javascript

   anonymous callback @ 296()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``296``—``300`` 行；所属函数 ``useEffect callback @ 296``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``abortControllerRef.current?.abort``。
