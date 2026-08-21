src/features/chat/page/hooks/useFileUpload 模块
=============================================

.. js:module:: src/features/chat/page/hooks/useFileUpload

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/hooks/useFileUpload.js``
* **模块标识**：``src/features/chat/page/hooks/useFileUpload``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：42

主要依赖
--------

``react``、``sonner``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:244:6236:FUNCTION

.. js:function:: useFileUpload({conversationId, t})

   封装 ``useFileUpload`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``173`` 行。

   **参数**

   ``{conversationId, t}``
      调用方传入的 ``conversationId, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ uploadFiles, attachments, setAttachments, handleFolderDetected, onAttachmentRemove, handleImagePaste, handleRetryUpload, handleCancelUpload, handleFilePicker, handlePicPicker, h…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useRef``、``useState``、``useCallback``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:520:588:FUNCTION

.. rubric:: ``useCallback callback @ 12``

.. code-block:: javascript

   useCallback callback @ 12()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``12``—``14`` 行；所属函数 ``useFileUpload``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:641:3453:FUNCTION

.. rubric:: ``useCallback callback @ 16``

.. code-block:: javascript

   useCallback callback @ 16(files, items)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``92`` 行；所属函数 ``useFileUpload``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``item.getAsString``、``processSelectedFiles``、``setUploadFiles``、``newUploadFiles.forEach``、``setTimeout``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:950:1693:FUNCTION

.. rubric:: ``item.getAsString callback @ 22``

.. code-block:: javascript

   item.getAsString callback @ 22(text)

实现 ``item.getAsString`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``38`` 行；所属函数 ``useCallback callback @ 16``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'composer.content.get', payload: {}, conversationId: conversationId, localOnly: true, }).then``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:1241:1669:FUNCTION

.. rubric:: ``emitEvent({ event: 'composer.content.get', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 28``

.. code-block:: javascript

   emitEvent({ event: 'composer.content.get', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 28(payload)

处理 ``emitEvent({ event: 'composer.content.get', payload: {}, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``28``—``37`` 行；所属函数 ``item.getAsString callback @ 22``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2102:2138:FUNCTION

.. rubric:: ``setUploadFiles callback @ 56``

.. code-block:: javascript

   setUploadFiles callback @ 56(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``useCallback callback @ 16``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2173:3355:FUNCTION

.. rubric:: ``newUploadFiles.forEach callback @ 58``

.. code-block:: javascript

   newUploadFiles.forEach callback @ 58(uploadFile)

作为 ``newUploadFiles.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``87`` 行；所属函数 ``useCallback callback @ 16``。

**参数**

``uploadFile``
   调用方传入的 ``uploadFile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fileUpload``、``uploadIntervals.current.set``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2229:2588:FUNCTION

.. rubric:: ``handleProgressUpdate``

.. code-block:: javascript

   handleProgressUpdate(uploadId, progress)

处理 ``Progress Update`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``67`` 行；所属函数 ``newUploadFiles.forEach callback @ 58``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2287:2572:FUNCTION

.. rubric:: ``setUploadFiles callback @ 60``

.. code-block:: javascript

   setUploadFiles callback @ 60(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``66`` 行；所属函数 ``handleProgressUpdate``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``updated``。

**主要协作调用**：``prev.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2344:2366:FUNCTION

.. rubric:: ``prev.findIndex callback @ 61``

.. code-block:: javascript

   prev.findIndex callback @ 61(f)

实现 ``prev.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``setUploadFiles callback @ 60``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2625:2807:FUNCTION

.. rubric:: ``handleComplete``

.. code-block:: javascript

   handleComplete(uploadId, attachment)

处理 ``Complete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``69``—``72`` 行；所属函数 ``newUploadFiles.forEach callback @ 58``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``、``setAttachments``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2685:2728:FUNCTION

.. rubric:: ``setUploadFiles callback @ 70``

.. code-block:: javascript

   setUploadFiles callback @ 70(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``handleComplete``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2705:2727:FUNCTION

.. rubric:: ``prev.filter callback @ 70``

.. code-block:: javascript

   prev.filter callback @ 70(f)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``setUploadFiles callback @ 70``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2762:2791:FUNCTION

.. rubric:: ``setAttachments callback @ 71``

.. code-block:: javascript

   setAttachments callback @ 71(prev)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``71``—``71`` 行；所属函数 ``handleComplete``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:2947:3264:FUNCTION

.. rubric:: ``fileUpload callback @ 78``

.. code-block:: javascript

   fileUpload callback @ 78(error)

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``83`` 行；所属函数 ``newUploadFiles.forEach callback @ 58``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``、``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3115:3223:FUNCTION

.. rubric:: ``setUploadFiles callback @ 80``

.. code-block:: javascript

   setUploadFiles callback @ 80(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``80``—``81`` 行；所属函数 ``fileUpload callback @ 78``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3156:3222:FUNCTION

.. rubric:: ``prev.map callback @ 81``

.. code-block:: javascript

   prev.map callback @ 81(f)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``setUploadFiles callback @ 80``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3378:3440:FUNCTION

.. rubric:: ``setTimeout callback @ 89``

.. code-block:: javascript

   setTimeout callback @ 89()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``91`` 行；所属函数 ``useCallback callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3521:3634:FUNCTION

.. rubric:: ``useCallback callback @ 94``

.. code-block:: javascript

   useCallback callback @ 94(attachment)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``94``—``96`` 行；所属函数 ``useFileUpload``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3562:3626:FUNCTION

.. rubric:: ``setAttachments callback @ 95``

.. code-block:: javascript

   setAttachments callback @ 95(prev)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``useCallback callback @ 94``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3582:3625:FUNCTION

.. rubric:: ``prev.filter callback @ 95``

.. code-block:: javascript

   prev.filter callback @ 95(att)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``setAttachments callback @ 95``。

**参数**

``att``
   调用方传入的 ``att`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3683:3977:FUNCTION

.. rubric:: ``useCallback callback @ 98``

.. code-block:: javascript

   useCallback callback @ 98(file)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``108`` 行；所属函数 ``useFileUpload``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSelectedFiles``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3783:3822:FUNCTION

.. rubric:: ``item``

.. code-block:: javascript

   item(index)

实现 ``item`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``useCallback callback @ 98``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:3854:3911:FUNCTION

.. rubric:: ``[Symbol.iterator]``

.. code-block:: javascript

   [Symbol.iterator]()

实现 ``[Symbol.iterator]`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``useCallback callback @ 98``。

**参数**

无。

**返回值**

返回迭代器并逐项产生结果。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4046:5321:FUNCTION

.. rubric:: ``useCallback callback @ 110``

.. code-block:: javascript

   useCallback callback @ 110(uploadId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``110``—``142`` 行；所属函数 ``useFileUpload``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4085:5313:FUNCTION

.. rubric:: ``setUploadFiles callback @ 111``

.. code-block:: javascript

   setUploadFiles callback @ 111(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``111``—``141`` 行；所属函数 ``useCallback callback @ 110``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``prev.map(f => f.id === uploadId ? updatedFile : f)``。

**主要协作调用**：``prev.find``、``fileUpload``、``uploadIntervals.current.set``、``prev.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4137:4159:FUNCTION

.. rubric:: ``prev.find callback @ 112``

.. code-block:: javascript

   prev.find callback @ 112(f)

作为 ``prev.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``setUploadFiles callback @ 111``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4406:4525:FUNCTION

.. rubric:: ``handleProgressUpdate``

.. code-block:: javascript

   handleProgressUpdate(id, progress)

处理 ``Progress Update`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``123`` 行；所属函数 ``setUploadFiles callback @ 111``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``progress``
   调用方传入的 ``progress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4458:4509:FUNCTION

.. rubric:: ``setUploadFiles callback @ 122``

.. code-block:: javascript

   setUploadFiles callback @ 122(p)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``handleProgressUpdate``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``p.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4469:4508:FUNCTION

.. rubric:: ``p.map callback @ 122``

.. code-block:: javascript

   p.map callback @ 122(f)

作为 ``p.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``setUploadFiles callback @ 122``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4561:4719:FUNCTION

.. rubric:: ``handleComplete``

.. code-block:: javascript

   handleComplete(id, attachment)

处理 ``Complete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``127`` 行；所属函数 ``setUploadFiles callback @ 111``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUploadFiles``、``setAttachments``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4615:4646:FUNCTION

.. rubric:: ``setUploadFiles callback @ 125``

.. code-block:: javascript

   setUploadFiles callback @ 125(p)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``handleComplete``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``p.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4629:4645:FUNCTION

.. rubric:: ``p.filter callback @ 125``

.. code-block:: javascript

   p.filter callback @ 125(f)

作为 ``p.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``setUploadFiles callback @ 125``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4680:4703:FUNCTION

.. rubric:: ``setAttachments callback @ 126``

.. code-block:: javascript

   setAttachments callback @ 126(p)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``handleComplete``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4752:4988:FUNCTION

.. rubric:: ``handleError``

.. code-block:: javascript

   handleError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``128``—``131`` 行；所属函数 ``setUploadFiles callback @ 111``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``、``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4899:4972:FUNCTION

.. rubric:: ``setUploadFiles callback @ 130``

.. code-block:: javascript

   setUploadFiles callback @ 130(p)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``handleError``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``p.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:4910:4971:FUNCTION

.. rubric:: ``p.map callback @ 130``

.. code-block:: javascript

   p.map callback @ 130(f)

作为 ``p.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``setUploadFiles callback @ 130``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:5261:5301:FUNCTION

.. rubric:: ``prev.map callback @ 140``

.. code-block:: javascript

   prev.map callback @ 140(f)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``setUploadFiles callback @ 111``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:5373:5633:FUNCTION

.. rubric:: ``useCallback callback @ 144``

.. code-block:: javascript

   useCallback callback @ 144(uploadId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``150`` 行；所属函数 ``useFileUpload``。

**参数**

``uploadId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``uploadIntervals.current.has``、``uploadIntervals.current.get(uploadId)``、``uploadIntervals.current.get``、``uploadIntervals.current.delete``、``setUploadFiles``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:5582:5625:FUNCTION

.. rubric:: ``setUploadFiles callback @ 149``

.. code-block:: javascript

   setUploadFiles callback @ 149(prev)

设置与 ``Upload Files`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``useCallback callback @ 144``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:5602:5624:FUNCTION

.. rubric:: ``prev.filter callback @ 149``

.. code-block:: javascript

   prev.filter callback @ 149(f)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``setUploadFiles callback @ 149``。

**参数**

``f``
   调用方传入的 ``f`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:5682:5756:FUNCTION

.. rubric:: ``useCallback callback @ 152``

.. code-block:: javascript

   useCallback callback @ 152()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``152``—``154`` 行；所属函数 ``useFileUpload``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createFilePicker('*', handleSelectedFiles)()``。

**主要协作调用**：``createFilePicker('*', handleSelectedFiles)``、``createFilePicker``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useFileUpload.js:5823:5903:FUNCTION

.. rubric:: ``useCallback callback @ 156``

.. code-block:: javascript

   useCallback callback @ 156()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``156``—``158`` 行；所属函数 ``useFileUpload``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``createFilePicker('image/*', handleSelectedFiles)()``。

**主要协作调用**：``createFilePicker('image/*', handleSelectedFiles)``、``createFilePicker``。
