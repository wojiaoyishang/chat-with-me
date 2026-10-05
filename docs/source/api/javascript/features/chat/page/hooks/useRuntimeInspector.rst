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

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:1583:11839:FUNCTION

.. js:function:: useRuntimeInspector(conversationId)

   Runtime Inspector is deliberately isolated from the chat WebSocket lifecycle. The controller owns cancellable HTTP reads and lazy section caches. ChatPage only keeps a stable \`isOpenRef\` / \`markStale\` handle inside its event listener, so opening or closing the dialog can never unsubscribe that listener or invalidate already queued message delta callbacks.

   **性质**：同步函数；导出 API；源码第 ``53``—``309`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:2709:3051:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:3096:3333:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:3380:5136:FUNCTION

.. rubric:: ``useCallback callback @ 87``

.. code-block:: javascript

   async useCallback callback @ 87({ section, focusMessageId = null, modelCallId = null, silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``87``—``126`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ section, focusMessageId = null, modelCallId = null, silent = false }``
   调用方传入的 ``section, focusMessageId = null, modelCallId = null, silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data || null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``abortControllerRef.current?.abort``、``setLoading``、``setError``、``apiClient.get``、``isCancelledRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5209:5844:FUNCTION

.. rubric:: ``useCallback callback @ 131``

.. code-block:: javascript

   async useCallback callback @ 131({ focusMessageId = null, silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``131``—``143`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ focusMessageId = null, silent = false }``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null, silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data``。

**主要协作调用**：``requestSection``、``data.tabs?.some``、``updateDocument``、``setActiveTab``、``setStale``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5537:5568:FUNCTION

.. rubric:: ``data.tabs?.some callback @ 135``

.. code-block:: javascript

   data.tabs?.some callback @ 135(tab)

作为 ``data.tabs?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``useCallback callback @ 131``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:5928:6824:FUNCTION

.. rubric:: ``useCallback callback @ 148``

.. code-block:: javascript

   async useCallback callback @ 148(tabId, { focusMessageId = null, force = false, silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``148``—``163`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

``{ focusMessageId = null, force = false, silent = false }``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null, force = false, silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existingTab.section``、``data.section``。

**主要协作调用**：``String``、``setActiveTab``、``(documentRef.current?.tabs || []).find``、``requestSection``、``updateDocument``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6306:6341:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []).find callback @ 154``

.. code-block:: javascript

   (documentRef.current?.tabs || []).find callback @ 154(tab)

作为 ``(documentRef.current?.tabs || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``useCallback callback @ 148``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6697:6779:FUNCTION

.. rubric:: ``updateDocument callback @ 161``

.. code-block:: javascript

   updateDocument callback @ 161(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``useCallback callback @ 148``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeTabSection``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:6914:8187:FUNCTION

.. rubric:: ``useCallback callback @ 168``

.. code-block:: javascript

   async useCallback callback @ 168(modelCallId, { silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``168``—``192`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

``{ silent = false }``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``data?.modelCall || null``。

**主要协作调用**：``String(modelCallId || '').trim``、``String``、``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'model-request') ?.section?.modelCalls?.find``、``(documentRef.current?.tabs || []) .find``、``setModelCallLoadingId``、``requestSection``、``updateDocument``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7149:7184:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find callback @ 172``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find callback @ 172(tab)

作为 ``(documentRef.current?.tabs || []) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``useCallback callback @ 168``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7230:7264:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'model-request') ?.section?.modelCalls?.find callback @ 173``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find((tab) => tab.id === 'model-request') ?.section?.modelCalls?.find callback @ 173(item)

作为 ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'model-request') ?.section?.modelCalls?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``useCallback callback @ 168``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:7529:8036:FUNCTION

.. rubric:: ``updateDocument callback @ 179``

.. code-block:: javascript

   updateDocument callback @ 179(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``179``—``188`` 行；所属函数 ``useCallback callback @ 168``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``mergeModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8087:8131:FUNCTION

.. rubric:: ``setModelCallLoadingId callback @ 190``

.. code-block:: javascript

   setModelCallLoadingId callback @ 190(current)

设置与 ``Model Call Loading Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``useCallback callback @ 168``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8276:9289:FUNCTION

.. rubric:: ``useCallback callback @ 197``

.. code-block:: javascript

   async useCallback callback @ 197(modelCallId, { silent = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``197``—``216`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

``{ silent = false }``（默认值 ``{}``）
   调用方传入的 ``silent = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``data?.modelCall || null``。

**主要协作调用**：``String(modelCallId || '').trim``、``String``、``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find``、``(documentRef.current?.tabs || []) .find``、``setToolCallLoadingId``、``requestSection``、``updateDocument``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8511:8538:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find callback @ 201``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find callback @ 201(tab)

作为 ``(documentRef.current?.tabs || []) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``useCallback callback @ 197``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8584:8618:FUNCTION

.. rubric:: ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find callback @ 202``

.. code-block:: javascript

   (documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find callback @ 202(item)

作为 ``(documentRef.current?.tabs || []) .find((tab) => tab.id === 'tools') ?.section?.modelCalls?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``useCallback callback @ 197``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:8911:9139:FUNCTION

.. rubric:: ``updateDocument callback @ 208``

.. code-block:: javascript

   updateDocument callback @ 208(current)

更新与 ``Document`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``208``—``212`` 行；所属函数 ``useCallback callback @ 197``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``mergeModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9189:9233:FUNCTION

.. rubric:: ``setToolCallLoadingId callback @ 214``

.. code-block:: javascript

   setToolCallLoadingId callback @ 214(current)

设置与 ``Tool Call Loading Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``useCallback callback @ 197``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9379:9797:FUNCTION

.. rubric:: ``useCallback callback @ 221``

.. code-block:: javascript

   async useCallback callback @ 221({ focusMessageId = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``221``—``230`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ focusMessageId = null }``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``overview``。

**主要协作调用**：``setOpen``、``setStale``、``loadOverview``、``loadTab``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:9879:9975:FUNCTION

.. rubric:: ``useCallback callback @ 234``

.. code-block:: javascript

   useCallback callback @ 234()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``234``—``238`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``abortRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10029:10089:FUNCTION

.. rubric:: ``useCallback callback @ 240``

.. code-block:: javascript

   useCallback callback @ 240()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``240``—``242`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10131:10364:FUNCTION

.. rubric:: ``useCallback callback @ 245``

.. code-block:: javascript

   useCallback callback @ 245(tabId, { focusMessageId = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``245``—``250`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``tabId``
   目标对象的公共或运行时标识。

``{ focusMessageId = null }``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``loadTab(id, { focusMessageId })``。

**主要协作调用**：``String``、``setActiveTab``、``loadTab``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10425:10929:FUNCTION

.. rubric:: ``useCallback callback @ 255``

.. code-block:: javascript

   async useCallback callback @ 255({ focusMessageId = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``255``—``266`` 行；所属函数 ``useRuntimeInspector``。

**参数**

``{ focusMessageId = null }``（默认值 ``{}``）
   调用方传入的 ``focusMessageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``documentRef.current``。

**主要协作调用**：``loadOverview``、``setActiveTab``、``loadTab``、``setStale``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:10986:11263:FUNCTION

.. rubric:: ``useEffect callback @ 270``

.. code-block:: javascript

   useEffect callback @ 270()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``270``—``280`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setDocument``、``setError``、``setStale``、``setActiveTab``、``abortRequest``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11313:11477:FUNCTION

.. rubric:: ``useEffect callback @ 283``

.. code-block:: javascript

   useEffect callback @ 283()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``283``—``287`` 行；所属函数 ``useRuntimeInspector``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useRuntimeInspector.js:11327:11477:FUNCTION

.. rubric:: ``anonymous callback @ 283``

.. code-block:: javascript

   anonymous callback @ 283()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``283``—``287`` 行；所属函数 ``useEffect callback @ 283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``abortControllerRef.current?.abort``。
