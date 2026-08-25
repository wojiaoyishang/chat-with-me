src/features/chat/ui/message/components/ContextInspectorDialog 模块
==========================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/ContextInspectorDialog

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/ContextInspectorDialog.jsx``
* **模块标识**：``src/features/chat/ui/message/components/ContextInspectorDialog``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/dialog``、``@/components/ui/badge``、``@/lib/apiClient.js``、``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:380:1178:FUNCTION

.. js:function:: MessageBlock({message, index})

   渲染 ``MessageBlock`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``24`` 行。

   **参数**

   ``{message, index}``
      调用方传入的 ``message, index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="rounded-lg border bg-muted/20 overflow-hidden"> <div className="flex items-center justify-between gap-3 border-b px-3 py-2 text-xs"> <Badge variant="secondary" c…``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:1200:2109:FUNCTION

.. js:function:: MessageList({title, messages})

   渲染 ``MessageList`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``47`` 行。

   **参数**

   ``{title, messages}``
      调用方传入的 ``title, messages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-2"> <div className="flex items-center justify-between gap-3"> <h3 className="text-sm font-medium">{title}</h3> <span className="text-xs text-muted-fo…``。

   **主要协作调用**：``Array.isArray``、``list.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:2132:3330:FUNCTION

.. js:function:: ArtifactList({items})

   渲染 ``ArtifactList`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``71`` 行。

   **参数**

   ``{items}``
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-2"> <h3 className="text-sm font-medium">压缩 Artifact</h3> {artifacts.map((artifact) => ( <div key={artifact.artifactId} className="rounded-lg border p…``。

   **主要协作调用**：``Array.isArray``、``artifacts.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:1683:1845:FUNCTION

.. rubric:: ``list.map callback @ 36``

.. code-block:: javascript

   list.map callback @ 36(message, index)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``38`` 行；所属函数 ``MessageList``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:2390:3300:FUNCTION

.. rubric:: ``artifacts.map callback @ 55``

.. code-block:: javascript

   artifacts.map callback @ 55(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``68`` 行；所属函数 ``ArtifactList``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number(artifact.tokenBefore || 0).toLocaleString``、``Number``、``Number(artifact.tokenAfter || 0).toLocaleString``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:3369:10207:FUNCTION

.. rubric:: ``memo callback @ 73``

.. code-block:: javascript

   memo callback @ 73({ open, onOpenChange, conversationId, messageId, replacementId = null, mode = 'status', })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``228`` 行。

**参数**

``{ open, onOpenChange, conversationId, messageId, replacementId = null, mode = 'status', }``
   调用方传入的 ``open, onOpenChange, conversationId, messageId, replacementId = null, mode = 'status',`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="z-[320] flex max-h-[88vh] w-[min(94vw,860px)] max-w-none flex-col overflow-hidden"> <DialogHeader clas…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``useState``、``useMemo``、``useEffect``、``renderContent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:3808:3898:FUNCTION

.. rubric:: ``useMemo callback @ 90``

.. code-block:: javascript

   useMemo callback @ 90()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``memo callback @ 73``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:3980:4846:FUNCTION

.. rubric:: ``useEffect callback @ 94``

.. code-block:: javascript

   useEffect callback @ 94()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``94``—``118`` 行；所属函数 ``memo callback @ 73``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setData``、``setError``、``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co…``、``apiClient.get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:4424:4516:FUNCTION

.. rubric:: ``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co… callback @ 108``

.. code-block:: javascript

   apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co… callback @ 108(payload)

实现 ``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``110`` 行；所属函数 ``useEffect callback @ 94``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setData``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:4524:4706:FUNCTION

.. rubric:: ``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co… callback @ 110``

.. code-block:: javascript

   apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co… callback @ 110(requestError)

实现 ``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``113`` 行；所属函数 ``useEffect callback @ 94``。

**参数**

``requestError``
   调用方传入的 ``requestError`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:4716:4796:FUNCTION

.. rubric:: ``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co… callback @ 113``

.. code-block:: javascript

   apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co… callback @ 113()

实现 ``apiClient.get(endpoint, { params: { conversationId, messageId, ...(replacementId ? {replacementId} : {}), }, signal: co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``113``—``115`` 行；所属函数 ``useEffect callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:4814:4839:FUNCTION

.. rubric:: ``returned callback @ 117``

.. code-block:: javascript

   returned callback @ 117()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``useEffect callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ContextInspectorDialog.jsx:5085:9029:FUNCTION

.. rubric:: ``renderContent``

.. code-block:: javascript

   renderContent()

渲染与 ``Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``124``—``201`` 行；所属函数 ``memo callback @ 73``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground"> <Loader2 className="h-4 w-4 animate-spin"/> 正在按需构建后端上下文… </div> )``、``<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-4 text-sm text-destructive">{error}</div>``、``null``、``( <div className="space-y-4"> <div className="flex flex-wrap gap-2"> <Badge variant="secondary">{data.status?.status || 'changed'}</Badge> <span className="text-xs text-muted-fore…``。

**主要协作调用**：``String``。
