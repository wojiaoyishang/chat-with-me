src/features/chat/ui/message/components/KnowledgeGraphViewer 模块
======================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/KnowledgeGraphViewer

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx``
* **模块标识**：``src/features/chat/ui/message/components/KnowledgeGraphViewer``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：69

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/select``、``@/context/LazyVisibility.jsx``、``./knowledgeGraphPresentation.js``、``./chatKnowledgeGraphRenderer.js``、``@/lib/apiClient.js``、``../../../page/utils/networkMerge.js``、``@/lib/tools.jsx``、``@/features/knowledge/graphSettings.js``、``@/features/knowledge/graphHistory.js``、``./KnowledgeGraphViewer.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:1252:1338:FUNCTION

.. js:function:: canvasNetwork(base, extra)

   实现 ``canvasNetwork`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``18`` 行。

   **参数**

   ``base``
      调用方传入的 ``base`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``extra``
      调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``extra ? mergeNetworkData(extra, base || {}) : base``。

   **主要协作调用**：``mergeNetworkData``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:1369:9058:FUNCTION

.. rubric:: ``GraphContent``

.. code-block:: javascript

   GraphContent({ model, msg, onExpand, getOrderedTypes, onRecord, onUndo, onRedo, canUndo, canRedo, databaseId, ac…)

实现 ``GraphContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``124`` 行。

**参数**

``{ model, msg, onExpand, getOrderedTypes, onRecord, onUndo, onRedo, canUndo, canRedo, databaseId, ac…``
   调用方传入的 ``model, msg, onExpand, getOrderedTypes, onRecord, onUndo, onRedo, canUndo, canRedo, databaseId, ac…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className="chat-knowledge-canvas-wrap"> <svg ref={svgRef} className="chat-knowledge-canvas" role="application" tabIndex={0} aria-label="知识图谱。Ctrl+Z 撤销，Ctrl+Shift+Z 重做。右键展开有序骨…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``useRef``、``useEffect``、``useState``、``useLocalSetting``、``useId().replace``、``useId``、``useMemo``、``labels.map``。

**内部回调数量**：17。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:1757:1801:FUNCTION

.. rubric:: ``useEffect callback @ 24``

.. code-block:: javascript

   useEffect callback @ 24()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:1890:1947:FUNCTION

.. rubric:: ``useEffect callback @ 26``

.. code-block:: javascript

   useEffect callback @ 26()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2030:2074:FUNCTION

.. rubric:: ``useEffect callback @ 28``

.. code-block:: javascript

   useEffect callback @ 28()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2404:2425:FUNCTION

.. rubric:: ``useState callback @ 31``

.. code-block:: javascript

   useState callback @ 31()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2799:2868:FUNCTION

.. rubric:: ``useMemo callback @ 37``

.. code-block:: javascript

   useMemo callback @ 37()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``model.nodes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2833:2865:FUNCTION

.. rubric:: ``model.nodes.map callback @ 37``

.. code-block:: javascript

   model.nodes.map callback @ 37(node)

作为 ``model.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useMemo callback @ 37``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2897:3042:FUNCTION

.. rubric:: ``useEffect callback @ 39``

.. code-block:: javascript

   useEffect callback @ 39()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``42`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.setEdgeAnimation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3086:4838:FUNCTION

.. rubric:: ``useEffect callback @ 44``

.. code-block:: javascript

   useEffect callback @ 44()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``72`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (graph) savedViews.set(scope, { ...graph.getViewState?.(), physics: physicsRef.current, appliedFocus: appliedFocus.current }); if (visibleController.current === graph)…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``createChatKnowledgeGraph``、``viewStates.current.get``、``setError``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3351:3372:FUNCTION

.. rubric:: ``onReady``

.. code-block:: javascript

   onReady()

处理 ``Ready`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReady``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3452:3499:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(cause)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3527:3596:FUNCTION

.. rubric:: ``onExpand``

.. code-block:: javascript

   onExpand(id, mode)

处理 ``Expand`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``expandCallback.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3634:3700:FUNCTION

.. rubric:: ``onOrderedNeighbors``

.. code-block:: javascript

   onOrderedNeighbors(id)

处理 ``Ordered Neighbors`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``expandCallback.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3735:3786:FUNCTION

.. rubric:: ``getOrderedTypes``

.. code-block:: javascript

   getOrderedTypes(options)

读取与 ``Ordered Types`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``options``
   调用方传入的可选配置对象。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``orderedTypesCallback.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3823:3910:FUNCTION

.. rubric:: ``onOrderedSkeleton``

.. code-block:: javascript

   onOrderedSkeleton(id, label)

处理 ``Ordered Skeleton`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``expandCallback.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3946:4032:FUNCTION

.. rubric:: ``onNearestOrdered``

.. code-block:: javascript

   onNearestOrdered(id, label)

处理 ``Nearest Ordered`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``expandCallback.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:4064:4125:FUNCTION

.. rubric:: ``onBeforeMove``

.. code-block:: javascript

   onBeforeMove(label)

处理 ``Before Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``recordCallback.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:4488:4830:FUNCTION

.. rubric:: ``returned callback @ 67``

.. code-block:: javascript

   returned callback @ 67()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``71`` 行；所属函数 ``useEffect callback @ 44``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``savedViews.set``、``graph.getViewState``、``graph?.destroy``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:4927:5174:FUNCTION

.. rubric:: ``useEffect callback @ 74``

.. code-block:: javascript

   useEffect callback @ 74()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``80`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``controller.current?.setData``、``controller.current.restoreViewState``、``viewStates.current.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:5227:5277:FUNCTION

.. rubric:: ``useEffect callback @ 81``

.. code-block:: javascript

   useEffect callback @ 81()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.setPhysics``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:5313:6493:FUNCTION

.. rubric:: ``useEffect callback @ 82``

.. code-block:: javascript

   useEffect callback @ 82()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``82``—``100`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``unregister``。

**主要协作调用**：``canonicalDatabaseId``、``msg.registerComponent``、``msg.getComponent``、``Array.isArray``、``JSON.stringify``、``graph.focusNetwork``、``msg.unregisterComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:5748:5890:FUNCTION

.. rubric:: ``unregister``

.. code-block:: javascript

   unregister()

注销与 ``unregister`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``88``—``90`` 行；所属函数 ``useEffect callback @ 82``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``msg.getComponent``、``msg.unregisterComponent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:7561:7660:FUNCTION

.. rubric:: ``onClick callback @ 110``

.. code-block:: javascript

   onClick callback @ 110()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``、``setReady``、``setRetry``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:7638:7656:FUNCTION

.. rubric:: ``setRetry callback @ 110``

.. code-block:: javascript

   setRetry callback @ 110(value)

设置与 ``Retry`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``onClick callback @ 110``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:7845:7932:FUNCTION

.. rubric:: ``labels.map callback @ 112``

.. code-block:: javascript

   labels.map callback @ 112([label, color])

作为 ``labels.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``GraphContent``。

**参数**

``[label, color]``
   调用方传入的 ``label, color`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8394:8430:FUNCTION

.. rubric:: ``onClick callback @ 116``

.. code-block:: javascript

   onClick callback @ 116()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.zoom``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8531:8566:FUNCTION

.. rubric:: ``onClick callback @ 117``

.. code-block:: javascript

   onClick callback @ 117()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.zoom``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8641:8672:FUNCTION

.. rubric:: ``onClick callback @ 118``

.. code-block:: javascript

   onClick callback @ 118()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.fit``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8762:8795:FUNCTION

.. rubric:: ``onClick callback @ 119``

.. code-block:: javascript

   onClick callback @ 119()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPhysics``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8885:8991:FUNCTION

.. rubric:: ``onClick callback @ 120``

.. code-block:: javascript

   onClick callback @ 120()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``GraphContent``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRecord``、``controller.current.relayout``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9098:25559:FUNCTION

.. rubric:: ``KnowledgeGraphViewer``

.. code-block:: javascript

   KnowledgeGraphViewer({ msg, conversationId = '', databaseId: requestedDatabaseId, className = 'w-full' })

实现 ``KnowledgeGraphViewer`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``126``—``333`` 行。

**参数**

``{ msg, conversationId = '', databaseId: requestedDatabaseId, className = 'w-full' }``
   调用方传入的 ``msg, conversationId = '', databaseId: requestedDatabaseId, className = 'w-full'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``<section className={\x60chat-knowledge-graph ${className}\x60} aria-label="知识图谱记忆" onKeyDownCapture={event => { const direction = graphHistoryShortcut(event); if (direction && moveHisto…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useState``、``useCallback``、``networkDatabaseId``、``canonicalDatabaseId``、``useRef``、``Boolean``、``Object.keys``、``useEffect``、``useMemo``、``choices.map``。

**内部回调数量**：21。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9363:9529:FUNCTION

.. rubric:: ``useCallback callback @ 128``

.. code-block:: javascript

   useCallback callback @ 128(id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``128``—``130`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``databases.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9412:9454:FUNCTION

.. rubric:: ``databases.find callback @ 129``

.. code-block:: javascript

   databases.find callback @ 129(item)

作为 ``databases.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``useCallback callback @ 128``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9478:9504:FUNCTION

.. rubric:: ``databases.find callback @ 129``

.. code-block:: javascript

   databases.find callback @ 129(item)

作为 ``databases.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``useCallback callback @ 128``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:10593:10974:FUNCTION

.. rubric:: ``useCallback callback @ 144``

.. code-block:: javascript

   useCallback callback @ 144(targetScope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``150`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``targetScope``
   调用方传入的 ``targetScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``histories.current.get``、``[...requests.current.values()].some``、``requests.current.values``、``setHistoryStates``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:10732:10772:FUNCTION

.. rubric:: ``[...requests.current.values()].some callback @ 146``

.. code-block:: javascript

   [...requests.current.values()].some callback @ 146(request)

作为 ``[...requests.current.values()].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``useCallback callback @ 144``。

**参数**

``request``
   调用方传入的 ``request`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:10801:10965:FUNCTION

.. rubric:: ``setHistoryStates callback @ 147``

.. code-block:: javascript

   setHistoryStates callback @ 147(previous)

设置与 ``History States`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``147``—``149`` 行；所属函数 ``useCallback callback @ 144``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``history?.canUndo``、``history?.canRedo``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:11017:11244:FUNCTION

.. rubric:: ``useCallback callback @ 151``

.. code-block:: javascript

   useCallback callback @ 151(targetScope, value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``151``—``156`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``targetScope``
   调用方传入的 ``targetScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExtras``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:11289:11570:FUNCTION

.. rubric:: ``useCallback callback @ 157``

.. code-block:: javascript

   useCallback callback @ 157(graph, label)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``157``—``161`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``graph``
   调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``histories.current.has``、``histories.current.set``、``createGraphHistory``、``histories.current.get(scope).record``、``histories.current.get``、``graph?.getViewState``、``refreshHistory``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:11770:12253:FUNCTION

.. rubric:: ``useEffect callback @ 163``

.. code-block:: javascript

   useEffect callback @ 163()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``163``—``170`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => request.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then(data => { if (!request.signal.ab…``、``apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then``、``apiClient.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:11954:12108:FUNCTION

.. rubric:: ``apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then callback @ 166``

.. code-block:: javascript

   apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then callback @ 166(data)

处理 ``apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``166``—``168`` 行；所属函数 ``useEffect callback @ 163``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDatabases``、``Array.isArray``、``setRegistryError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12116:12205:FUNCTION

.. rubric:: ``apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then(data => { if (!request.signal.ab… callback @ 168``

.. code-block:: javascript

   apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then(data => { if (!request.signal.ab… callback @ 168(cause)

实现 ``apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then(data => { if (!request.signal.ab…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``useEffect callback @ 163``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRegistryError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12223:12245:FUNCTION

.. rubric:: ``returned callback @ 169``

.. code-block:: javascript

   returned callback @ 169()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``useEffect callback @ 163``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.abort``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12452:12840:FUNCTION

.. rubric:: ``useEffect callback @ 173``

.. code-block:: javascript

   useEffect callback @ 173()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``173``—``179`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``canonicalDatabaseId``、``setSelection``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12942:13544:FUNCTION

.. rubric:: ``useMemo callback @ 180``

.. code-block:: javascript

   useMemo callback @ 180()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``189`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Object.fromEntries(result)``。

**主要协作调用**：``networkDatabaseViews``、``networkDatabaseId``、``Object.entries``、``canonicalDatabaseId``、``result.has``、``result.set``、``Object.hasOwn``、``Object.fromEntries``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:13645:13689:FUNCTION

.. rubric:: ``useEffect callback @ 191``

.. code-block:: javascript

   useEffect callback @ 191()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:13733:13789:FUNCTION

.. rubric:: ``useMemo callback @ 192``

.. code-block:: javascript

   useMemo callback @ 192()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``canvasNetwork``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:13858:13899:FUNCTION

.. rubric:: ``useMemo callback @ 193``

.. code-block:: javascript

   useMemo callback @ 193()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``knowledgeGraphPresentation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:13942:14227:FUNCTION

.. rubric:: ``useMemo callback @ 194``

.. code-block:: javascript

   useMemo callback @ 194()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``194``—``198`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...result.values()]``。

**主要协作调用**：``databases.map``、``Object.keys``、``result.has``、``result.set``、``result.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:13996:14019:FUNCTION

.. rubric:: ``databases.map callback @ 195``

.. code-block:: javascript

   databases.map callback @ 195(item)

作为 ``databases.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``useMemo callback @ 194``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:14280:14706:FUNCTION

.. rubric:: ``useEffect callback @ 199``

.. code-block:: javascript

   useEffect callback @ 199()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``208`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { epoch.current++; for (const request of activeRequests.values()) { request.controller.abort(); request.graph?.loading?.(request, false); request.graph?.expanding(request.id…``。

**主要协作调用**：``setFeedback``、``refreshHistory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:14433:14698:FUNCTION

.. rubric:: ``returned callback @ 203``

.. code-block:: javascript

   returned callback @ 203()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``207`` 行；所属函数 ``useEffect callback @ 199``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeRequests.values``、``request.controller.abort``、``request.graph?.loading``、``request.graph?.expanding``、``activeRequests.clear``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:14775:15329:FUNCTION

.. rubric:: ``useCallback callback @ 209``

.. code-block:: javascript

   async useCallback callback @ 209({ signal })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``209``—``216`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``{ signal }`` （默认值 ``{}``）
   调用方传入的 ``signal`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``data``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new DOMException('画布已切换', 'AbortError')``、``new Error('有序类型来自其他知识库，请重试。')``、``new Error('有序类型数据无效，请重试。')``。

**主要协作调用**：``apiClient.get``、``canonicalDatabaseId``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:15415:20822:FUNCTION

.. rubric:: ``useCallback callback @ 217``

.. code-block:: javascript

   async useCallback callback @ 217(id, graph, mode, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``217``—``276`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``graph``
   调用方传入的 ``graph`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode`` （默认值 ``'related'``）
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('查询未返回有效的图谱数据。')``、``new Error('查询返回了其他知识库的数据，请重试。')``、``new Error('画布最多显示 400 个节点，请在知识库中继续探索。')``、``new Error('画布最多显示 2000 条关系，请在知识库中继续探索。')``。

**主要协作调用**：``graph?.getNodes().find``、``graph?.getNodes``、``String``、``requests.current.has``、``requests.current.set``、``graph?.expanding``、``graph?.loading``、``refreshHistory``、``setFeedback``、``encodeURIComponent``、``apiClient.get``、``graph?.getNodes().some``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:15667:15697:FUNCTION

.. rubric:: ``graph?.getNodes().find callback @ 219``

.. code-block:: javascript

   graph?.getNodes().find callback @ 219(node)

作为 ``graph?.getNodes().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``219``—``219`` 行；所属函数 ``useCallback callback @ 217``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:16296:16326:FUNCTION

.. rubric:: ``graph?.getNodes().find callback @ 226``

.. code-block:: javascript

   graph?.getNodes().find callback @ 226(node)

作为 ``graph?.getNodes().find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``useCallback callback @ 217``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:17420:17450:FUNCTION

.. rubric:: ``graph?.getNodes().some callback @ 238``

.. code-block:: javascript

   graph?.getNodes().some callback @ 238(node)

作为 ``graph?.getNodes().some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``useCallback callback @ 217``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:18728:18743:FUNCTION

.. rubric:: ``current.nodes.map callback @ 252``

.. code-block:: javascript

   current.nodes.map callback @ 252(node)

作为 ``current.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``useCallback callback @ 217``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:18792:18824:FUNCTION

.. rubric:: ``next.nodes.filter callback @ 253``

.. code-block:: javascript

   next.nodes.filter callback @ 253(node)

作为 ``next.nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``useCallback callback @ 217``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``currentIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:20962:22404:FUNCTION

.. rubric:: ``useCallback callback @ 277``

.. code-block:: javascript

   useCallback callback @ 277(direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``277``—``299`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...requests.current.values()].filter``、``requests.current.values``、``pending.at``、``request.controller.abort``、``requests.current.delete``、``request.graph?.loading``、``request.graph?.expanding``、``refreshHistory``、``setFeedback``、``histories.current.get``、``history[direction]``、``graph.getViewState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:21040:21074:FUNCTION

.. rubric:: ``[...requests.current.values()].filter callback @ 278``

.. code-block:: javascript

   [...requests.current.values()].filter callback @ 278(request)

作为 ``[...requests.current.values()].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``278``—``278`` 行；所属函数 ``useCallback callback @ 277``。

**参数**

``request``
   调用方传入的 ``request`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:22655:22831:FUNCTION

.. rubric:: ``onKeyDownCapture callback @ 301``

.. code-block:: javascript

   onKeyDownCapture callback @ 301(event)

处理 ``Key Down Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``301``—``304`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graphHistoryShortcut``、``moveHistory``、``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:23233:23757:FUNCTION

.. rubric:: ``onClick callback @ 309``

.. code-block:: javascript

   onClick callback @ 309()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``309``—``313`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.dispatchEvent``、``window.crypto?.randomUUID``、``Date.now().toString``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``、``model.nodes.map``、``model.relationships.map(edge => edge.id).filter``、``model.relationships.map``、``visibleController.current?.getViewState``、``viewStates.current.get``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:23532:23547:FUNCTION

.. rubric:: ``model.nodes.map callback @ 311``

.. code-block:: javascript

   model.nodes.map callback @ 311(node)

作为 ``model.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``onClick callback @ 309``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:23583:23598:FUNCTION

.. rubric:: ``model.relationships.map callback @ 311``

.. code-block:: javascript

   model.relationships.map callback @ 311(edge)

作为 ``model.relationships.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``onClick callback @ 309``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:24060:24112:FUNCTION

.. rubric:: ``onValueChange callback @ 318``

.. code-block:: javascript

   onValueChange callback @ 318(id)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``318``—``318`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelection``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:24348:24486:FUNCTION

.. rubric:: ``choices.map callback @ 320``

.. code-block:: javascript

   choices.map callback @ 320(item)

作为 ``choices.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:24936:24961:FUNCTION

.. rubric:: ``onUndo callback @ 326``

.. code-block:: javascript

   onUndo callback @ 326()

处理 ``Undo`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``moveHistory``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:24971:24996:FUNCTION

.. rubric:: ``onRedo callback @ 326``

.. code-block:: javascript

   onRedo callback @ 326()

处理 ``Redo`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``KnowledgeGraphViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``moveHistory``。
