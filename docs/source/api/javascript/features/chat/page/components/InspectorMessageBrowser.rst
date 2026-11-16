src/features/chat/page/components/InspectorMessageBrowser 模块
================================================================================================================================

.. js:module:: src/features/chat/page/components/InspectorMessageBrowser

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/InspectorMessageBrowser.jsx``
* **模块标识**：``src/features/chat/page/components/InspectorMessageBrowser``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：26

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-virtuoso``、``sonner``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/lib/apiClient.js``、``@/context/useEventStore.jsx``、``../../freeze/ConversationFreezeContext.jsx``、``./MessageSummaryItem.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:564:7378:FUNCTION

.. js:function:: InspectorMessageBrowser({section, activeMessageId, onJump})

   渲染 ``InspectorMessageBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``14``—``126`` 行。

   **参数**

   ``{section, activeMessageId, onJump}``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex min-h-44 items-center justify-center text-sm text-muted-foreground">暂无可展示的消息摘要。</div>``、``<div className="flex h-full min-h-0 flex-col motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150"> <div className="shrink-0 space-y-2 border-b px-3 py-3 sm:px-4">…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``Array.isArray``、``useConversationMutationGuard``、``useState``、``useRef``、``useMemo``、``items.findIndex``、``useEffect``、``Boolean``。

   **内部回调数量**：15。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:893:908:FUNCTION

.. rubric:: ``useState callback @ 18``

.. code-block:: javascript

   useState callback @ 18()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1134:1246:FUNCTION

.. rubric:: ``useMemo callback @ 24``

.. code-block:: javascript

   useMemo callback @ 24()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``25`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.filter(item => !item.readonly && item.role !== 'root') .map``、``items.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1161:1207:FUNCTION

.. rubric:: ``items.filter callback @ 24``

.. code-block:: javascript

   items.filter callback @ 24(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``useMemo callback @ 24``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1222:1244:FUNCTION

.. rubric:: ``items.filter(item => !item.readonly && item.role !== 'root') .map callback @ 25``

.. code-block:: javascript

   items.filter(item => !item.readonly && item.role !== 'root') .map callback @ 25(item)

作为 ``items.filter(item => !item.readonly && item.role !== 'root') .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``useMemo callback @ 24``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1298:1340:FUNCTION

.. rubric:: ``items.findIndex callback @ 26``

.. code-block:: javascript

   items.findIndex callback @ 26(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1358:1583:FUNCTION

.. rubric:: ``useEffect callback @ 28``

.. code-block:: javascript

   useEffect callback @ 28()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``32`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1447:1525:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 30``

.. code-block:: javascript

   requestAnimationFrame callback @ 30()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``useEffect callback @ 28``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuoso.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1542:1576:FUNCTION

.. rubric:: ``returned callback @ 31``

.. code-block:: javascript

   returned callback @ 31()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``useEffect callback @ 28``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1615:1886:FUNCTION

.. rubric:: ``useEffect callback @ 33``

.. code-block:: javascript

   useEffect callback @ 33()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``33``—``39`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``、``eligible.has``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1643:1812:FUNCTION

.. rubric:: ``setSelected callback @ 34``

.. code-block:: javascript

   setSelected callback @ 34(previous)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``34``—``37`` 行；所属函数 ``useEffect callback @ 33``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next.size === previous.size ? previous : next``。

**主要协作调用**：``[...previous].filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1711:1733:FUNCTION

.. rubric:: ``[...previous].filter callback @ 35``

.. code-block:: javascript

   [...previous].filter callback @ 35(id)

作为 ``[...previous].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``setSelected callback @ 34``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eligible.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1915:1951:FUNCTION

.. rubric:: ``useEffect callback @ 40``

.. code-block:: javascript

   useEffect callback @ 40()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1920:1951:FUNCTION

.. rubric:: ``anonymous callback @ 40``

.. code-block:: javascript

   anonymous callback @ 40()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``useEffect callback @ 40``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.current?.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:1977:2764:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select(index, shiftKey)

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``59`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``shiftKey``
   调用方传入的 ``shiftKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``eligible.has``、``items.findIndex``、``setSelected``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:2156:2197:FUNCTION

.. rubric:: ``items.findIndex callback @ 45``

.. code-block:: javascript

   items.findIndex callback @ 45(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``select``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:2220:2727:FUNCTION

.. rubric:: ``setSelected callback @ 46``

.. code-block:: javascript

   setSelected callback @ 46(previous)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``46``—``57`` 行；所属函数 ``select``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``Math.min``、``Math.max``、``items.slice``、``eligible.has``、``next.add``、``next.has``、``next.delete``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:2782:4279:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   async run(action)

实现 ``run`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``61``—``90`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error('上下文操作返回的状态无效。')``。

**主要协作调用**：``freeze.canMutate``、``setPending``、``setError``、``apiClient.post``、``encodeURIComponent``、``Number.isInteger``、``emitEvent``、``toast.success``、``setSelected``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:4897:4933:FUNCTION

.. rubric:: ``onClick callback @ 97``

.. code-block:: javascript

   onClick callback @ 97()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:5052:5106:FUNCTION

.. rubric:: ``onClick callback @ 98``

.. code-block:: javascript

   onClick callback @ 98()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:5247:5272:FUNCTION

.. rubric:: ``onClick callback @ 99``

.. code-block:: javascript

   onClick callback @ 99()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``99``—``99`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``run``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:5551:5588:FUNCTION

.. rubric:: ``onClick callback @ 102``

.. code-block:: javascript

   onClick callback @ 102()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``run``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:5865:5889:FUNCTION

.. rubric:: ``onClick callback @ 105``

.. code-block:: javascript

   onClick callback @ 105()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``run``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:6561:6593:FUNCTION

.. rubric:: ``computeItemKey callback @ 114``

.. code-block:: javascript

   computeItemKey callback @ 114(_index, item)

实现 ``computeItemKey`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:6620:7361:FUNCTION

.. rubric:: ``itemContent callback @ 115``

.. code-block:: javascript

   itemContent callback @ 115(index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``124`` 行；所属函数 ``InspectorMessageBrowser``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``、``eligible.has``、``Boolean``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:7012:7050:FUNCTION

.. rubric:: ``onClick callback @ 119``

.. code-block:: javascript

   onClick callback @ 119(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``itemContent callback @ 115``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``select``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorMessageBrowser.jsx:7286:7316:FUNCTION

.. rubric:: ``onClick callback @ 122``

.. code-block:: javascript

   onClick callback @ 122()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``itemContent callback @ 115``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。
