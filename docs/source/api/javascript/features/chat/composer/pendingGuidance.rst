src/features/chat/composer/pendingGuidance 模块
==================================================================================================

.. js:module:: src/features/chat/composer/pendingGuidance

Only the server-owned queue is eligible for pending-message controls.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/composer/pendingGuidance.js``
* **模块标识**：``src/features/chat/composer/pendingGuidance``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``../attachmentVision.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:113:151:FUNCTION

.. js:function:: id(value)

   实现 ``id`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``3`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:176:419:FUNCTION

.. js:function:: canonicalValue(value)

   实现 ``canonicalValue`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value.map(canonicalValue)``、``Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalValue(value[key])]))``、``value``。

   **主要协作调用**：``Array.isArray``、``value.map``、``Object.fromEntries``、``Object.keys(value).sort().map``、``Object.keys(value).sort``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:461:612:FUNCTION

.. js:function:: guidanceDraftFingerprint(draft)

   实现 ``guidanceDraftFingerprint`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``13`` 行。

   **参数**

   ``draft`` （默认值 ``{}``）
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``、``canonicalValue``、``String``、``normalizeAttachmentList``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:729:1171:FUNCTION

.. js:function:: collectPendingGuidance(executions)

   实现 ``collectPendingGuidance`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``16``—``20`` 行。

   **参数**

   ``executions`` （默认值 ``{}``）
      调用方传入的 ``executions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Object.values(executions) .flatMap((execution) => (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance…``、``Object.values(executions) .flatMap``、``Object.values``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:1211:1387:FUNCTION

.. js:function:: pendingGuidanceSummary(guidance)

   实现 ``pendingGuidanceSummary`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``22``—``24`` 行。

   **参数**

   ``guidance``
      调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(guidance?.content || '').trim``、``String``、``normalizeAttachmentList(guidance?.attachments).map((attachment) => attachment.name || '附件').join``、``normalizeAttachmentList(guidance?.attachments).map``、``normalizeAttachmentList``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:1524:2685:FUNCTION

.. js:function:: mergePendingGuidanceDraft(draft, guidance)

   合并与 ``Pending Guidance Draft`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``27``—``50`` 行。

   **参数**

   ``draft`` （默认值 ``{}``）
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``guidance`` （默认值 ``{}``）
      调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...draft, content: currentContent.trim() && recoveredContent.trim() ? \x60${currentContent}\n\n${recoveredContent}\x60 : currentContent || recoveredContent, attachments, }``。

   **主要协作调用**：``String``、``Array.isArray``、``normalizeAttachmentList(guidance.attachments).map``、``normalizeAttachmentList``、``attachments.map(getAttachmentId).filter``、``attachments.map``、``getAttachmentId``、``seen.has``、``seen.add``、``attachments.push``、``currentContent.trim``、``recoveredContent.trim``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:2729:3439:FUNCTION

.. js:function:: clearAcceptedGuidanceDraft(current, submitted)

   清空与 ``Accepted Guidance Draft`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``52``—``63`` 行。

   **参数**

   ``current`` （默认值 ``{}``）
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``submitted`` （默认值 ``{}``）
      调用方传入的 ``submitted`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...current, content: current.content === submitted.content ? '' : String(current.content || ''), // An image's vision consent (or another attachment edit) may change // while it…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``normalizeAttachmentList(submitted.attachments) .map``、``normalizeAttachmentList``、``String``、``normalizeAttachmentList(current.attachments).filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:3476:3647:FUNCTION

.. js:function:: guidanceActionError(response, fallback)

   实现 ``guidanceActionError`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``65``—``68`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:3687:4069:FUNCTION

.. js:function:: acceptGuidanceSnapshot(response, execution, upsert)

   实现 ``acceptGuidanceSnapshot`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``70``—``79`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``upsert``
      调用方传入的 ``upsert`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``snapshot``。

   **显式抛出**：``new Error('服务器返回的补充消息不属于对应执行，请刷新后重试。')``。

   **主要协作调用**：``id``、``upsert``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:4108:5458:FUNCTION

.. js:function:: mutatePendingGuidance({ action, execution, guidance, emitEvent, upsert })

   实现 ``mutatePendingGuidance`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``81``—``109`` 行。

   **参数**

   ``{ action, execution, guidance, emitEvent, upsert }``
      调用方传入的 ``action, execution, guidance, emitEvent, upsert`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``recovered``、``null``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **显式抛出**：``new Error('不支持的补充消息操作。')``、``error``、``new Error('未收到补充消息的确认，请刷新后重试。')``、``new Error('补充消息尚未移出待接收列表，请刷新后重试。')``、``new Error('未收到对应消息的编辑内容，请刷新后重试。')``。

   **主要协作调用**：``['delete', 'edit'].includes``、``emitEvent``、``acceptGuidanceSnapshot``、``guidanceActionError``、``Array.isArray``、``snapshot.pendingGuidance.some``、``id``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:354:396:FUNCTION

.. rubric:: ``Object.keys(value).sort().map callback @ 7``

.. code-block:: javascript

   Object.keys(value).sort().map callback @ 7(key)

作为 ``Object.keys(value).sort().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``canonicalValue``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``canonicalValue``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:790:1041:FUNCTION

.. rubric:: ``Object.values(executions) .flatMap callback @ 17``

.. code-block:: javascript

   Object.values(executions) .flatMap callback @ 17(execution)

实现 ``Object.values(executions) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``19`` 行；所属函数 ``collectPendingGuidance``。

**参数**

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter((guidance) => guidance?.id && ['pen…``、``(Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter``、``Array.isArray``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:897:986:FUNCTION

.. rubric:: ``(Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter callback @ 18``

.. code-block:: javascript

   (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter callback @ 18(guidance)

作为 ``(Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``Object.values(executions) .flatMap callback @ 17``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['pending', 'queued'].includes``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:1001:1040:FUNCTION

.. rubric:: ``(Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter((guidance) => guidance?.id && ['pen… callback @ 19``

.. code-block:: javascript

   (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter((guidance) => guidance?.id && ['pen… callback @ 19(guidance)

实现 ``(Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : []) .filter((guidance) => guidance?.id && ['pen…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``Object.values(executions) .flatMap callback @ 17``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:1053:1170:FUNCTION

.. rubric:: ``Object.values(executions) .flatMap((execution) => (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance… callback @ 20``

.. code-block:: javascript

   Object.values(executions) .flatMap((execution) => (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance… callback @ 20(a, b)

实现 ``Object.values(executions) .flatMap((execution) => (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``collectPendingGuidance``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:1323:1362:FUNCTION

.. rubric:: ``normalizeAttachmentList(guidance?.attachments).map callback @ 23``

.. code-block:: javascript

   normalizeAttachmentList(guidance?.attachments).map callback @ 23(attachment)

作为 ``normalizeAttachmentList(guidance?.attachments).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``pendingGuidanceSummary``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:1872:2062:FUNCTION

.. rubric:: ``normalizeAttachmentList(guidance.attachments).map callback @ 31``

.. code-block:: javascript

   normalizeAttachmentList(guidance.attachments).map callback @ 31(attachment)

作为 ``normalizeAttachmentList(guidance.attachments).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``31``—``35`` 行；所属函数 ``mergePendingGuidanceDraft``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isImageAttachment``、``visionIds.has``、``getAttachmentId``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:2861:2950:FUNCTION

.. rubric:: ``normalizeAttachmentList(submitted.attachments) .map callback @ 54``

.. code-block:: javascript

   normalizeAttachmentList(submitted.attachments) .map callback @ 54(attachment)

作为 ``normalizeAttachmentList(submitted.attachments) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``clearAcceptedGuidanceDraft``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``、``canonicalValue``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:3306:3428:FUNCTION

.. rubric:: ``normalizeAttachmentList(current.attachments).filter callback @ 60``

.. code-block:: javascript

   normalizeAttachmentList(current.attachments).filter callback @ 60(attachment)

作为 ``normalizeAttachmentList(current.attachments).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``61`` 行；所属函数 ``clearAcceptedGuidanceDraft``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``submittedFiles.get``、``getAttachmentId``、``JSON.stringify``、``canonicalValue``。

.. CWM-AST-FUNCTION src/features/chat/composer/pendingGuidance.js:5119:5160:FUNCTION

.. rubric:: ``snapshot.pendingGuidance.some callback @ 100``

.. code-block:: javascript

   snapshot.pendingGuidance.some callback @ 100(item)

作为 ``snapshot.pendingGuidance.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``mutatePendingGuidance``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``id``。
