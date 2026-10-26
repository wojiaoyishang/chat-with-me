src/features/chat/ui/ChatAttachmentLibraryDialog 模块
==============================================================================================================

.. js:module:: src/features/chat/ui/ChatAttachmentLibraryDialog

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/ChatAttachmentLibraryDialog.jsx``
* **模块标识**：``src/features/chat/ui/ChatAttachmentLibraryDialog``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``@/components/ui/input``、``@/lib/apiClient.js``、``@/lib/virtualUrl.js``、``@/features/workflows/WorkflowResourcePreview.jsx``、``../attachmentVision.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:744:1570:FUNCTION

.. js:function:: AttachmentThumbnail({ item })

   渲染 ``AttachmentThumbnail`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``42`` 行。

   **参数**

   ``{ item }``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted/60 text-muted-foreground"> {src && !failed ? ( <img src={src} alt="" loadi…``。

   **主要协作调用**：``useState``、``resolveResourceUrl``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:1570:11876:FUNCTION

.. js:function:: ChatAttachmentLibraryDialog({ attachments = [], onClose, onConfirm })

   渲染 ``ChatAttachmentLibraryDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``44``—``221`` 行。

   **参数**

   ``{ attachments = [], onClose, onConfirm }``
      调用方传入的 ``attachments = , onClose, onConfirm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open && !previewItem) onClose(); }}> <DialogContent className="flex h-[min(82dvh,740px)] w-[min(92vw,700px)] max-w-[min(92vw,700px)]…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useTranslation``、``useState``、``useMemo``、``useEffect``、``Math.floor``、``Math.ceil``、``t``、``items.map``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:994:1016:FUNCTION

.. rubric:: ``useEffect callback @ 27``

.. code-block:: javascript

   useEffect callback @ 27()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``AttachmentThumbnail``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:1407:1428:FUNCTION

.. rubric:: ``onError callback @ 37``

.. code-block:: javascript

   onError callback @ 37()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``AttachmentThumbnail``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:2066:2081:FUNCTION

.. rubric:: ``useState callback @ 53``

.. code-block:: javascript

   useState callback @ 53()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:2175:2247:FUNCTION

.. rubric:: ``useMemo callback @ 57``

.. code-block:: javascript

   useMemo callback @ 57()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``attachments.map(getAttachmentId).filter``、``attachments.map``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:2294:3354:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``87`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timer); controller.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:2433:3242:FUNCTION

.. rubric:: ``setTimeout callback @ 65``

.. code-block:: javascript

   async setTimeout callback @ 65()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``65``—``82`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``apiClient.get``、``setItems``、``Array.isArray``、``setTotal``、``Number``、``setError``、``t``、``setLoading``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:3264:3347:FUNCTION

.. rubric:: ``returned callback @ 83``

.. code-block:: javascript

   returned callback @ 83()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``86`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:3405:3723:FUNCTION

.. rubric:: ``toggle``

.. code-block:: javascript

   toggle(item)

切换与 ``toggle`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``98`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``existingIds.has``、``setSelected``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:3539:3715:FUNCTION

.. rubric:: ``setSelected callback @ 92``

.. code-block:: javascript

   setSelected callback @ 92(current)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``92``—``97`` 行；所属函数 ``toggle``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``next.set``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:3888:3939:FUNCTION

.. rubric:: ``onOpenChange callback @ 104``

.. code-block:: javascript

   onOpenChange callback @ 104(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:4164:4219:FUNCTION

.. rubric:: ``onInteractOutside callback @ 107``

.. code-block:: javascript

   onInteractOutside callback @ 107(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:4254:4309:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 108``

.. code-block:: javascript

   onEscapeKeyDown callback @ 108(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:5261:5319:FUNCTION

.. rubric:: ``onChange callback @ 123``

.. code-block:: javascript

   onChange callback @ 123(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setOffset``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:6000:9158:FUNCTION

.. rubric:: ``items.map callback @ 132``

.. code-block:: javascript

   items.map callback @ 132(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``132``—``174`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.id || id} className="flex min-w-0 items-center gap-2 border-b p-2 last:border-b-0 hover:bg-muted/40"> <Checkbox checked={checked} disabled={loading || !id || alre…``。

**主要协作调用**：``existingIds.has``、``selected.has``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:6917:6935:FUNCTION

.. rubric:: ``onCheckedChange callback @ 143``

.. code-block:: javascript

   onCheckedChange callback @ 143()

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``items.map callback @ 132``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:7292:7310:FUNCTION

.. rubric:: ``onClick callback @ 149``

.. code-block:: javascript

   onClick callback @ 149()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``items.map callback @ 132``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:8860:8886:FUNCTION

.. rubric:: ``onClick callback @ 168``

.. code-block:: javascript

   onClick callback @ 168()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``items.map callback @ 132``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewItem``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:10169:10207:FUNCTION

.. rubric:: ``onClick callback @ 189``

.. code-block:: javascript

   onClick callback @ 189()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``189``—``189`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRefresh``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:10186:10206:FUNCTION

.. rubric:: ``setRefresh callback @ 189``

.. code-block:: javascript

   setRefresh callback @ 189(value)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``189``—``189`` 行；所属函数 ``onClick callback @ 189``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:10539:10597:FUNCTION

.. rubric:: ``onClick callback @ 195``

.. code-block:: javascript

   onClick callback @ 195()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:10555:10596:FUNCTION

.. rubric:: ``setOffset callback @ 195``

.. code-block:: javascript

   setOffset callback @ 195(value)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``onClick callback @ 195``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:10906:10951:FUNCTION

.. rubric:: ``onClick callback @ 199``

.. code-block:: javascript

   onClick callback @ 199()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:10922:10950:FUNCTION

.. rubric:: ``setOffset callback @ 199``

.. code-block:: javascript

   setOffset callback @ 199(value)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``onClick callback @ 199``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:11337:11376:FUNCTION

.. rubric:: ``onClick callback @ 206``

.. code-block:: javascript

   onClick callback @ 206()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onConfirm``、``selected.values``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatAttachmentLibraryDialog.jsx:11788:11814:FUNCTION

.. rubric:: ``onClose callback @ 216``

.. code-block:: javascript

   onClose callback @ 216()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``ChatAttachmentLibraryDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewItem``。
