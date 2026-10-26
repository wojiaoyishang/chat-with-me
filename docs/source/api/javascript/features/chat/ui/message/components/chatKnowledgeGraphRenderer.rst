src/features/chat/ui/message/components/chatKnowledgeGraphRenderer 模块
==================================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/chatKnowledgeGraphRenderer

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js``
* **模块标识**：``src/features/chat/ui/message/components/chatKnowledgeGraphRenderer``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：117

主要依赖
--------------------------------------------------------------------------------

``d3-force``、``./knowledgeGraphPresentation.js``、``../../../../knowledge/orderedGraphLayout.js``、``./knowledgeGraphContextMenu.js``、``../../../../knowledge/selectedNodeViewportFollow.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:576:44033:FUNCTION

.. js:function:: createChatKnowledgeGraph(svg, { onReady, onError, onExpand, onOrderedNeighbors, getOrderedTypes, onOrderedSkeleton, onNearestOrde…)

   创建与 ``Chat Knowledge Graph`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``7``—``597`` 行。

   **参数**

   ``svg``
      调用方传入的 ``svg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ onReady, onError, onExpand, onOrderedNeighbors, getOrderedTypes, onOrderedSkeleton, onNearestOrde…`` （默认值 ``{}``）
      调用方传入的 ``onReady, onError, onExpand, onOrderedNeighbors, getOrderedTypes, onOrderedSkeleton, onNearestOrde…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ setData, focusNetwork, fit, zoom, loading, closeContextMenu: closeOrderedMenu, showOrderedNeighbors(id) { if (!destroyed && nodes.get(String(id))?.ordered) return onOrderedNeigh…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``svg.querySelector``、``svg.parentElement?.querySelector``、``createOrderedGraphLayout``、``createOrderedOrbitLayout``、``createSelectedNodeViewportFollow``、``createLocalDragInfluence``、``doc.createElement``、``loadingBadge.setAttribute``、``svg.parentElement?.append``、``win.matchMedia``、``forceLink([]).id(node => node.id) .distance(edge => edge.sourceLink ? 135 : 180) .strength``、``forceLink([]).id(node => node.id) .distance``。

   **内部回调数量**：66。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:2298:2629:FUNCTION

.. rubric:: ``loading``

.. code-block:: javascript

   loading(key, active, message)

实现 ``loading`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``30`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``active``
   调用方传入的 ``active`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message`` （默认值 ``'正在获取…'``）
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pendingReads.set``、``pendingReads.delete``、``pendingReads.values``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:2653:2690:FUNCTION

.. rubric:: ``controlled``

.. code-block:: javascript

   controlled(node)

实现 ``controlled`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``orbitLayout.controlled``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:2717:2759:FUNCTION

.. rubric:: ``flexibleTime``

.. code-block:: javascript

   flexibleTime(node)

实现 ``flexibleTime`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:2877:2892:FUNCTION

.. rubric:: ``forceLink([]).id callback @ 34``

.. code-block:: javascript

   forceLink([]).id callback @ 34(node)

实现 ``forceLink([]).id`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:2913:2948:FUNCTION

.. rubric:: ``forceLink([]).id(node => node.id) .distance callback @ 35``

.. code-block:: javascript

   forceLink([]).id(node => node.id) .distance callback @ 35(edge)

实现 ``forceLink([]).id(node => node.id) .distance`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:2969:3083:FUNCTION

.. rubric:: ``forceLink([]).id(node => node.id) .distance(edge => edge.sourceLink ? 135 : 180) .strength callback @ 36``

.. code-block:: javascript

   forceLink([]).id(node => node.id) .distance(edge => edge.sourceLink ? 135 : 180) .strength callback @ 36(edge)

实现 ``forceLink([]).id(node => node.id) .distance(edge => edge.sourceLink ? 135 : 180) .strength`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.sqrt``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3271:3323:FUNCTION

.. rubric:: ``forceManyBody().strength callback @ 38``

.. code-block:: javascript

   forceManyBody().strength callback @ 38(node)

实现 ``forceManyBody().strength`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3384:3408:FUNCTION

.. rubric:: ``forceCollide callback @ 39``

.. code-block:: javascript

   forceCollide callback @ 39(node)

实现 ``forceCollide`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3479:3586:FUNCTION

.. rubric:: ``forceX(0).strength callback @ 40``

.. code-block:: javascript

   forceX(0).strength callback @ 40(node)

实现 ``forceX(0).strength`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``orbitLayout.sourceAnchored``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3629:3736:FUNCTION

.. rubric:: ``forceY(0).strength callback @ 41``

.. code-block:: javascript

   forceY(0).strength callback @ 41(node)

实现 ``forceY(0).strength`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``orbitLayout.sourceAnchored``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3765:3798:FUNCTION

.. rubric:: ``forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32) .force('link', link).force('c… callback @ 42``

.. code-block:: javascript

   forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32) .force('link', link).force('c… callback @ 42(alpha)

实现 ``forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32) .force('link', link).force('c…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``alpha``
   调用方传入的 ``alpha`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``orbitLayout.tick``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3829:3870:FUNCTION

.. rubric:: ``forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32) .force('link', link).force('c… callback @ 43``

.. code-block:: javascript

   forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32) .force('link', link).force('c… callback @ 43()

实现 ``forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32) .force('link', link).force('c…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dragInfluence.tick``、``nodes.values``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:3892:4081:FUNCTION

.. rubric:: ``listen``

.. code-block:: javascript

   listen(target, type, callback, options)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``47`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``callback``
   状态变化、事件到达或操作完成时执行的回调。

``options``
   调用方传入的可选配置对象。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``target.addEventListener``、``listeners.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:4015:4072:FUNCTION

.. rubric:: ``listeners.push callback @ 46``

.. code-block:: javascript

   listeners.push callback @ 46()

实现 ``listeners.push`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``listen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``target.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:4110:4240:FUNCTION

.. rubric:: ``physicsRunning``

.. code-block:: javascript

   physicsRunning()

实现 ``physicsRunning`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``49`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``simulation.alpha``、``simulation.alphaMin``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:4241:4696:FUNCTION

.. rubric:: ``refreshPhysics``

.. code-block:: javascript

   refreshPhysics()

实现 ``refreshPhysics`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``57`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``simulation.alphaTarget``、``simulation.alpha``、``physicsRunning``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:4696:5409:FUNCTION

.. rubric:: ``updateEdgeAnimation``

.. code-block:: javascript

   updateEdgeAnimation()

更新与 ``Edge Animation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``68`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``refreshPhysics``、``win.cancelAnimationFrame``、``simulation.alpha``、``simulation.alphaMin``、``requestDraw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:5520:5638:FUNCTION

.. rubric:: ``anonymous callback @ 69``

.. code-block:: javascript

   anonymous callback @ 69(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``72`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``entries.some``、``updateEdgeAnimation``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:5568:5597:FUNCTION

.. rubric:: ``entries.some callback @ 70``

.. code-block:: javascript

   entries.some callback @ 70(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``anonymous callback @ 69``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:5864:6110:FUNCTION

.. rubric:: ``element``

.. code-block:: javascript

   element(tag, attributes)

实现 ``element`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``81`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``tag``
   调用方传入的 ``tag`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``attributes`` （默认值 ``{}``）
   调用方传入的 ``attributes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``doc.createElementNS``、``Object.entries``、``result.setAttribute``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:6111:7316:FUNCTION

.. rubric:: ``setCaption``

.. code-block:: javascript

   setCaption(node)

设置与 ``Caption`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``82``—``102`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String``、``orderedNodeCaption``、``Array.from``、``label.replaceChildren``、``flexibleTime``、``characters.slice(0, 13).join``、``characters.slice``、``/^(.*?日)(.+)$/.exec``、``/^(.+?)([+-]\d{2}:\d{2})$/.exec``、``lines.push``、``points.slice(index, index + 16).join``、``points.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:7746:7923:FUNCTION

.. rubric:: ``getBounds``

.. code-block:: javascript

   getBounds()

读取与 ``Bounds`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...rect, left: rect.left, top: rect.top, width: rect.width || width, height: rect.height || height }``。

**主要协作调用**：``svg.parentElement.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:8030:8092:FUNCTION

.. rubric:: ``closeOrderedMenu``

.. code-block:: javascript

   closeOrderedMenu(restoreFocus)

关闭与 ``Ordered Menu`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``restoreFocus`` （默认值 ``false``）
   调用方传入的 ``restoreFocus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``contextMenu.close``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:8093:8221:FUNCTION

.. rubric:: ``openOrderedMenu``

.. code-block:: javascript

   openOrderedMenu(node, event)

打开与 ``Ordered Menu`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``112``—``114`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``contextMenu.open``、``selectNodes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:8244:8343:FUNCTION

.. rubric:: ``pickedIds``

.. code-block:: javascript

   pickedIds()

实现 ``pickedIds`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:8369:8561:FUNCTION

.. rubric:: ``applyCamera``

.. code-block:: javascript

   applyCamera()

应用与 ``Camera`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``116``—``119`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cameraLayer.setAttribute``、``String``、``Math.round``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:8562:10043:FUNCTION

.. rubric:: ``focusStyles``

.. code-block:: javascript

   focusStyles()

实现 ``focusStyles`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``144`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pickedIds``、``active.has``、``neighbors.add``、``nodes.values``、``node.element.classList.toggle``、``picked.has``、``Boolean``、``neighbors.has``、``node.element.setAttribute``、``String``、``views.values``、``view.element.classList.toggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:10043:11839:FUNCTION

.. rubric:: ``draw``

.. code-block:: javascript

   draw()

实现 ``draw`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``145``—``172`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``orbitLayout.sync``、``nodes.values``、``node.element.setAttribute``、``node.x.toFixed``、``node.y.toFixed``、``flexibleTime``、``Math.max``、``views.values``、``view.element.setAttribute``、``view.flowElement.setAttribute``、``nodes.get``、``graphEdgeGeometry``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:11839:11912:FUNCTION

.. rubric:: ``cancelAutoFit``

.. code-block:: javascript

   cancelAutoFit()

取消与 ``Auto Fit`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:11912:12304:FUNCTION

.. rubric:: ``availableViewport``

.. code-block:: javascript

   availableViewport()

实现 ``availableViewport`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``174``—``178`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ x: width / 2, y: (16 + bottom) / 2, width: Math.max(48, width - 48), height: Math.max(48, bottom - 16) }``。

**主要协作调用**：``svg.getBoundingClientRect``、``controlsLayer?.getBoundingClientRect``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12304:13509:FUNCTION

.. rubric:: ``frameCamera``

.. code-block:: javascript

   frameCamera(ids, maxZoom)

实现 ``frameCamera`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``179``—``191`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``ids`` （默认值 ``[...nodes.keys()]``）
   调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``maxZoom`` （默认值 ``1.5``）
   调用方传入的 ``maxZoom`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.keys``、``ids.map(id => nodes.get(String(id))).filter``、``ids.map``、``availableViewport``、``Math.min``、``points.map``、``Math.max``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12405:12432:FUNCTION

.. rubric:: ``ids.map callback @ 180``

.. code-block:: javascript

   ids.map callback @ 180(id)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``frameCamera``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.get``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12586:12648:FUNCTION

.. rubric:: ``points.map callback @ 183``

.. code-block:: javascript

   points.map callback @ 183(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flexibleTime``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12683:12745:FUNCTION

.. rubric:: ``points.map callback @ 183``

.. code-block:: javascript

   points.map callback @ 183(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flexibleTime``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12793:12826:FUNCTION

.. rubric:: ``points.map callback @ 184``

.. code-block:: javascript

   points.map callback @ 184(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12862:12927:FUNCTION

.. rubric:: ``points.map callback @ 184``

.. code-block:: javascript

   points.map callback @ 184(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:12980:13008:FUNCTION

.. rubric:: ``points.map callback @ 185``

.. code-block:: javascript

   points.map callback @ 185(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``185`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:13036:13064:FUNCTION

.. rubric:: ``points.map callback @ 185``

.. code-block:: javascript

   points.map callback @ 185(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``185`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:13122:13150:FUNCTION

.. rubric:: ``points.map callback @ 186``

.. code-block:: javascript

   points.map callback @ 186(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:13178:13206:FUNCTION

.. rubric:: ``points.map callback @ 186``

.. code-block:: javascript

   points.map callback @ 186(node)

作为 ``points.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``frameCamera``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:13509:13845:FUNCTION

.. rubric:: ``fit``

.. code-block:: javascript

   fit(ids, maxZoom)

实现 ``fit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``192``—``199`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``ids``
   调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``maxZoom`` （默认值 ``1.5``）
   调用方传入的 ``maxZoom`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``viewportFollow.stop``、``frameCamera``、``simulation.alpha``、``simulation.alphaMin``、``draw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:13845:14979:FUNCTION

.. rubric:: ``tick``

.. code-block:: javascript

   tick(time)

实现 ``tick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``200``—``220`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``time``
   调用方传入的 ``time`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``refreshPhysics``、``simulation.alpha``、``simulation.alphaMin``、``Math.max``、``Math.min``、``simulation.tick``、``frameCamera``、``draw``、``onReady``、``requestDraw``、``onError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:14979:15121:FUNCTION

.. rubric:: ``requestDraw``

.. code-block:: javascript

   requestDraw()

实现 ``requestDraw`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``221``—``223`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``win.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:15121:15405:FUNCTION

.. rubric:: ``animate``

.. code-block:: javascript

   animate(heat)

实现 ``animate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``224``—``230`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``heat`` （默认值 ``0.35``）
   调用方传入的 ``heat`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``refreshPhysics``、``requestDraw``、``simulation.alpha``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:15405:15722:FUNCTION

.. rubric:: ``clearFocus``

.. code-block:: javascript

   clearFocus()

清空与 ``Focus`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``231``—``237`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``viewportFollow.stop``、``cancelAutoFit``、``focused.clear``、``multiSelected.clear``、``nodes.values``、``focusStyles``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:15722:16014:FUNCTION

.. rubric:: ``selectNodes``

.. code-block:: javascript

   selectNodes(ids)

实现 ``selectNodes`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``245`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``ids``
   调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearFocus``、``multiSelected.values().next``、``multiSelected.values``、``viewportFollow.select``、``focusStyles``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:16014:16178:FUNCTION

.. rubric:: ``toggleNode``

.. code-block:: javascript

   toggleNode(id)

切换与 ``Node`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``246``—``250`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pickedIds``、``next.has``、``next.delete``、``next.add``、``selectNodes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:16178:18817:FUNCTION

.. rubric:: ``createNode``

.. code-block:: javascript

   createNode(node)

创建与 ``Node`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``251``—``289`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element``、``group.append``、``nodeLayer.append``、``Object.assign``、``group.addEventListener``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:16831:16890:FUNCTION

.. rubric:: ``group.addEventListener callback @ 257``

.. code-block:: javascript

   group.addEventListener callback @ 257()

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``createNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``focusStyles``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:16940:16981:FUNCTION

.. rubric:: ``group.addEventListener callback @ 258``

.. code-block:: javascript

   group.addEventListener callback @ 258()

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``createNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``focusStyles``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:17024:17068:FUNCTION

.. rubric:: ``group.addEventListener callback @ 259``

.. code-block:: javascript

   group.addEventListener callback @ 259()

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``createNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``focusStyles``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:17110:17151:FUNCTION

.. rubric:: ``group.addEventListener callback @ 260``

.. code-block:: javascript

   group.addEventListener callback @ 260()

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``createNode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``focusStyles``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:17194:17441:FUNCTION

.. rubric:: ``group.addEventListener callback @ 261``

.. code-block:: javascript

   group.addEventListener callback @ 261(event)

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``261``—``266`` 行；所属函数 ``createNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``event.stopPropagation``、``toggleNode``、``selectNodes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:17487:17747:FUNCTION

.. rubric:: ``group.addEventListener callback @ 267``

.. code-block:: javascript

   group.addEventListener callback @ 267(event)

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``267``—``271`` 行；所属函数 ``createNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``Date.now``、``onExpand``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:17796:17861:FUNCTION

.. rubric:: ``group.addEventListener callback @ 272``

.. code-block:: javascript

   group.addEventListener callback @ 272(event)

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``272``—``274`` 行；所属函数 ``createNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openOrderedMenu``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:17906:18808:FUNCTION

.. rubric:: ``group.addEventListener callback @ 275``

.. code-block:: javascript

   group.addEventListener callback @ 275(event)

处理 ``group.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``275``—``288`` 行；所属函数 ``createNode``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``svg.getBoundingClientRect``、``openOrderedMenu``、``event.preventDefault``、``event.stopPropagation``、``toggleNode``、``selectNodes``、``onExpand``、``focusNetwork``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:18254:18283:FUNCTION

.. rubric:: ``preventDefault``

.. code-block:: javascript

   preventDefault()

实现 ``preventDefault`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``group.addEventListener callback @ 275``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:18301:18331:FUNCTION

.. rubric:: ``stopPropagation``

.. code-block:: javascript

   stopPropagation()

停止与 ``Propagation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``group.addEventListener callback @ 275``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:18817:27628:FUNCTION

.. rubric:: ``setData``

.. code-block:: javascript

   setData(next)

设置与 ``Data`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``290``—``400`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``dragInfluence.clear``、``closeOrderedMenu``、``endMarquee``、``next.nodes.map``、``keepNodes.has``、``node.element.remove``、``nodes.delete``、``focused.delete``、``multiSelected.delete``、``cancelGesture``、``nodes.has``、``multiSelected.values().next``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:19058:19073:FUNCTION

.. rubric:: ``next.nodes.map callback @ 295``

.. code-block:: javascript

   next.nodes.map callback @ 295(node)

作为 ``next.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``295``—``295`` 行；所属函数 ``setData``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:20556:20585:FUNCTION

.. rubric:: ``[...nodes.values()].some callback @ 313``

.. code-block:: javascript

   [...nodes.values()].some callback @ 313(node)

作为 ``[...nodes.values()].some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``setData``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:21415:21450:FUNCTION

.. rubric:: ``[...(provenanceNeighbors.get(id) || [])] .map callback @ 326``

.. code-block:: javascript

   [...(provenanceNeighbors.get(id) || [])] .map callback @ 326(neighborId)

作为 ``[...(provenanceNeighbors.get(id) || [])] .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``setData``。

**参数**

``neighborId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:21459:21519:FUNCTION

.. rubric:: ``[...(provenanceNeighbors.get(id) || [])] .map(neighborId => nodes.get(neighborId)).filter callback @ 326``

.. code-block:: javascript

   [...(provenanceNeighbors.get(id) || [])] .map(neighborId => nodes.get(neighborId)).filter callback @ 326(node)

作为 ``[...(provenanceNeighbors.get(id) || [])] .map(neighborId => nodes.get(neighborId)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``setData``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:21633:21660:FUNCTION

.. rubric:: ``neighbors.reduce callback @ 328``

.. code-block:: javascript

   neighbors.reduce callback @ 328(sum, node)

作为 ``neighbors.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``328``—``328`` 行；所属函数 ``setData``。

**参数**

``sum``
   调用方传入的 ``sum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:21731:21758:FUNCTION

.. rubric:: ``neighbors.reduce callback @ 329``

.. code-block:: javascript

   neighbors.reduce callback @ 329(sum, node)

作为 ``neighbors.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``setData``。

**参数**

``sum``
   调用方传入的 ``sum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:23753:23768:FUNCTION

.. rubric:: ``next.edges.map callback @ 352``

.. code-block:: javascript

   next.edges.map callback @ 352(edge)

作为 ``next.edges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``352``—``352`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:24817:24851:FUNCTION

.. rubric:: ``raw.members.every callback @ 365``

.. code-block:: javascript

   raw.members.every callback @ 365(edge)

作为 ``raw.members.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``365``—``365`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``suppressedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:25850:25865:FUNCTION

.. rubric:: ``raw.members.map callback @ 377``

.. code-block:: javascript

   raw.members.map callback @ 377(edge)

作为 ``raw.members.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``377``—``377`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:26123:26205:FUNCTION

.. rubric:: ``raw.members.map callback @ 380``

.. code-block:: javascript

   raw.members.map callback @ 380(edge)

作为 ``raw.members.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:26452:26748:FUNCTION

.. rubric:: ``(next.orderedView?.routes || []).map callback @ 385``

.. code-block:: javascript

   (next.orderedView?.routes || []).map callback @ 385(value)

作为 ``(next.orderedView?.routes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``385``—``388`` 行；所属函数 ``setData``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...value, element: path }``。

**主要协作调用**：``element``、``convergenceLayer.append``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:26805:26828:FUNCTION

.. rubric:: ``next.edges.filter callback @ 389``

.. code-block:: javascript

   next.edges.filter callback @ 389(edge)

作为 ``next.edges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``389``—``389`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:26834:26885:FUNCTION

.. rubric:: ``next.edges.filter(edge => edge.sourceLink).map callback @ 389``

.. code-block:: javascript

   next.edges.filter(edge => edge.sourceLink).map callback @ 389(edge)

作为 ``next.edges.filter(edge => edge.sourceLink).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``389``—``389`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``、``[edge.from, edge.to].sort``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:26991:27071:FUNCTION

.. rubric:: ``next.links.filter callback @ 391``

.. code-block:: javascript

   next.links.filter callback @ 391(edge)

作为 ``next.links.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``391``—``391`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``orbitLayout.physicalLink``、``nodes.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:27091:27276:FUNCTION

.. rubric:: ``next.links.filter(edge => orbitLayout.physicalLink(nodes.get(edge.source), nodes.get(edge.target))) .map callback @ 392``

.. code-block:: javascript

   next.links.filter(edge => orbitLayout.physicalLink(nodes.get(edge.source), nodes.get(edge.target))) .map callback @ 392(edge)

作为 ``next.links.filter(edge => orbitLayout.physicalLink(nodes.get(edge.source), nodes.get(edge.target))) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``392``—``393`` 行；所属函数 ``setData``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``provenance.has``、``JSON.stringify``、``[edge.source, edge.target].sort``、``nodes.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:27628:29409:FUNCTION

.. rubric:: ``focusNetwork``

.. code-block:: javascript

   focusNetwork(values)

实现 ``focusNetwork`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``401``—``424`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(Array.isArray(values) ? values : values == null ? [] : [values]).filter(id => id !== null && id !== undefined && id !=…``、``(Array.isArray(values) ? values : values == null ? [] : [values]).filter``、``Array.isArray``、``requested.map``、``ids.some``、``endMarquee``、``clearFocus``、``ids.map``、``focused.has``、``adjacent.get(edge.from).add``、``adjacent.get``、``adjacent.get(edge.to).add``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:27816:27866:FUNCTION

.. rubric:: ``(Array.isArray(values) ? values : values == null ? [] : [values]).filter callback @ 403``

.. code-block:: javascript

   (Array.isArray(values) ? values : values == null ? [] : [values]).filter callback @ 403(id)

作为 ``(Array.isArray(values) ? values : values == null ? [] : [values]).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``403``—``403`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:27918:27946:FUNCTION

.. rubric:: ``requested.map callback @ 404``

.. code-block:: javascript

   requested.map callback @ 404(id)

作为 ``requested.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``404``—``404`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``model?.aliases.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:27971:27991:FUNCTION

.. rubric:: ``ids.some callback @ 405``

.. code-block:: javascript

   ids.some callback @ 405(id)

作为 ``ids.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``405``—``405`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nodes.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:28278:28299:FUNCTION

.. rubric:: ``ids.map callback @ 411``

.. code-block:: javascript

   ids.map callback @ 411(id)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``411``—``411`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:28551:28584:FUNCTION

.. rubric:: ``ids.find callback @ 413``

.. code-block:: javascript

   ids.find callback @ 413(id)

作为 ``ids.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``413``—``413`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``adjacent.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:28885:28907:FUNCTION

.. rubric:: ``ids.filter callback @ 418``

.. code-block:: javascript

   ids.filter callback @ 418(id)

作为 ``ids.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visited.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:28940:29118:FUNCTION

.. rubric:: ``ordered.forEach callback @ 419``

.. code-block:: javascript

   ordered.forEach callback @ 419(id, index)

作为 ``ordered.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``419``—``419`` 行；所属函数 ``focusNetwork``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.get``、``controlled``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:29428:29553:FUNCTION

.. rubric:: ``point``

.. code-block:: javascript

   point(event)

实现 ``point`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ x: event.clientX - rect.left, y: event.clientY - rect.top }``。

**主要协作调用**：``svg.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:29554:29983:FUNCTION

.. rubric:: ``zoom``

.. code-block:: javascript

   zoom(factor, pointX, pointY)

实现 ``zoom`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``426``—``433`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``factor``
   调用方传入的 ``factor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointX`` （默认值 ``width / 2``）
   调用方传入的 ``pointX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointY`` （默认值 ``height / 2``）
   调用方传入的 ``pointY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``viewportFollow.stop``、``closeOrderedMenu``、``Math.max``、``Math.min``、``cancelAutoFit``、``draw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:29983:30308:FUNCTION

.. rubric:: ``releaseDrag``

.. code-block:: javascript

   releaseDrag()

实现 ``releaseDrag`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``434``—``440`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``flexibleTime``、``svg.classList.remove``、``animate``、``refreshPhysics``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:30308:30609:FUNCTION

.. rubric:: ``cancelGesture``

.. code-block:: javascript

   cancelGesture()

取消与 ``Gesture`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``441``—``445`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pointers.keys``、``endMarquee``、``releaseDrag``、``pointers.clear``、``svg.hasPointerCapture``、``svg.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:30609:31105:FUNCTION

.. rubric:: ``endMarquee``

.. code-block:: javascript

   endMarquee(cancelled)

实现 ``endMarquee`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``446``—``455`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``cancelled`` （默认值 ``false``）
   调用方传入的 ``cancelled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``marqueeRect.setAttribute``、``svg.classList.remove``、``svg.hasPointerCapture``、``svg.releasePointerCapture``、``Date.now``、``selectNodes``、``focusStyles``、``requestDraw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:31137:32656:FUNCTION

.. rubric:: ``listen callback @ 456``

.. code-block:: javascript

   listen callback @ 456(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``456``—``478`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``closeOrderedMenu``、``endMarquee``、``point``、``releaseDrag``、``win.cancelAnimationFrame``、``pickedIds``、``event.preventDefault``、``pointers.set``、``viewportFollow.stop``、``pointers.values``、``Math.max``、``Math.hypot``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:32690:35705:FUNCTION

.. rubric:: ``listen callback @ 479``

.. code-block:: javascript

   listen callback @ 479(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``479``—``519`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``point``、``Math.hypot``、``cancelAutoFit``、``svg.setPointerCapture``、``svg.classList.add``、``Math.min``、``Math.abs``、``Object.entries``、``marqueeRect.setAttribute``、``marqueeRect.removeAttribute``、``nodes.values``、``marquee.preview.add``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:35731:36282:FUNCTION

.. rubric:: ``pointerEnd``

.. code-block:: javascript

   pointerEnd(event)

实现 ``pointerEnd`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``520``—``530`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``endMarquee``、``pointers.has``、``pointers.delete``、``Date.now``、``releaseDrag``、``physicsRunning``、``requestDraw``、``svg.hasPointerCapture``、``svg.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:36393:36488:FUNCTION

.. rubric:: ``listen callback @ 532``

.. code-block:: javascript

   listen callback @ 532()

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeOrderedMenu``、``endMarquee``、``releaseDrag``、``pointers.clear``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:36516:36675:FUNCTION

.. rubric:: ``listen callback @ 533``

.. code-block:: javascript

   listen callback @ 533(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``533``—``533`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``point``、``zoom``、``Math.exp``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:36766:36856:FUNCTION

.. rubric:: ``listen callback @ 534``

.. code-block:: javascript

   listen callback @ 534(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``534``—``534`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:36884:37023:FUNCTION

.. rubric:: ``listen callback @ 535``

.. code-block:: javascript

   listen callback @ 535(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``535``—``535`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``Date.now``、``clearFocus``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:37057:37145:FUNCTION

.. rubric:: ``listen callback @ 536``

.. code-block:: javascript

   listen callback @ 536(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``536``—``536`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.closest``、``openOrderedMenu``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:37175:38307:FUNCTION

.. rubric:: ``listen callback @ 537``

.. code-block:: javascript

   listen callback @ 537(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``537``—``550`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``endMarquee``、``clearFocus``、``svg.getBoundingClientRect``、``openOrderedMenu``、``['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes``、``zoom``、``fit``、``event.key.startsWith``、``viewportFollow.stop``、``cancelAutoFit``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:37636:37665:FUNCTION

.. rubric:: ``preventDefault``

.. code-block:: javascript

   preventDefault()

实现 ``preventDefault`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``542``—``542`` 行；所属函数 ``listen callback @ 537``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:37683:37713:FUNCTION

.. rubric:: ``stopPropagation``

.. code-block:: javascript

   stopPropagation()

停止与 ``Propagation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``542``—``542`` 行；所属函数 ``listen callback @ 537``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:38346:38556:FUNCTION

.. rubric:: ``listen callback @ 551``

.. code-block:: javascript

   listen callback @ 551()

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``551``—``551`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateEdgeAnimation``、``endMarquee``、``win.cancelAnimationFrame``、``releaseDrag``、``pointers.clear``、``requestDraw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:38578:39021:FUNCTION

.. rubric:: ``resize``

.. code-block:: javascript

   resize()

实现 ``resize`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``552``—``558`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeOrderedMenu``、``svg.getBoundingClientRect``、``frameCamera``、``svg.setAttribute``、``draw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:39329:39458:FUNCTION

.. rubric:: ``showOrderedNeighbors``

.. code-block:: javascript

   showOrderedNeighbors(id)

实现 ``showOrderedNeighbors`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``563``—``563`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``onOrderedNeighbors?.(String(id))``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.get``、``String``、``onOrderedNeighbors``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:39482:40002:FUNCTION

.. rubric:: ``getViewState``

.. code-block:: javascript

   getViewState()

读取与 ``View State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``564``—``568`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...nodes.values()].map``、``nodes.values``、``pickedIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:39619:39947:FUNCTION

.. rubric:: ``[...nodes.values()].map callback @ 566``

.. code-block:: javascript

   [...nodes.values()].map callback @ 566({ id, x, y, fx, fy, orderedManualOffset, orderedOrbit })

作为 ``[...nodes.values()].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``566``—``566`` 行；所属函数 ``getViewState``。

**参数**

``{ id, x, y, fx, fy, orderedManualOffset, orderedOrbit }``
   调用方传入的 ``id, x, y, fx, fy, orderedManualOffset, orderedOrbit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:40003:41860:FUNCTION

.. rubric:: ``restoreViewState``

.. code-block:: javascript

   restoreViewState(state)

实现 ``restoreViewState`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``569``—``587`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``viewportFollow.stop``、``dragInfluence.clear``、``closeOrderedMenu``、``cancelGesture``、``win.cancelAnimationFrame``、``simulation.alphaTarget(0).alpha``、``simulation.alphaTarget``、``nodes.get``、``String``、``Number.isFinite``、``Object.assign``、``controlled``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:41302:41343:FUNCTION

.. rubric:: ``['x', 'y', 'scale'].every callback @ 581``

.. code-block:: javascript

   ['x', 'y', 'scale'].every callback @ 581(key)

作为 ``['x', 'y', 'scale'].every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``581``—``581`` 行；所属函数 ``restoreViewState``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:41686:41705:FUNCTION

.. rubric:: ``(state.selected || []).filter callback @ 585``

.. code-block:: javascript

   (state.selected || []).filter callback @ 585(id)

作为 ``(state.selected || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``585``—``585`` 行；所属函数 ``restoreViewState``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nodes.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:41861:41973:FUNCTION

.. rubric:: ``expanding``

.. code-block:: javascript

   expanding(id, value)

实现 ``expanding`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``588``—``588`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodes.get(String(id))?.element.classList.toggle``、``nodes.get``、``String``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:41993:42071:FUNCTION

.. rubric:: ``getNodes``

.. code-block:: javascript

   getNodes()

读取与 ``Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``589``—``589`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...nodes.values()].map``、``nodes.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42024:42070:FUNCTION

.. rubric:: ``[...nodes.values()].map callback @ 589``

.. code-block:: javascript

   [...nodes.values()].map callback @ 589({ id, name, label })

作为 ``[...nodes.values()].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``589``—``589`` 行；所属函数 ``getNodes``。

**参数**

``{ id, name, label }``
   调用方传入的 ``id, name, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42099:42163:FUNCTION

.. rubric:: ``getNodePositions``

.. code-block:: javascript

   getNodePositions()

读取与 ``Node Positions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``590``—``590`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...nodes.values()].map``、``nodes.values``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42130:42162:FUNCTION

.. rubric:: ``[...nodes.values()].map callback @ 590``

.. code-block:: javascript

   [...nodes.values()].map callback @ 590({ id, x, y })

作为 ``[...nodes.values()].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``590``—``590`` 行；所属函数 ``getNodePositions``。

**参数**

``{ id, x, y }``
   调用方传入的 ``id, x, y`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42191:42224:FUNCTION

.. rubric:: ``getRelationships``

.. code-block:: javascript

   getRelationships()

读取与 ``Relationships`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``591``—``591`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42225:42348:FUNCTION

.. rubric:: ``setEdgeAnimation``

.. code-block:: javascript

   setEdgeAnimation(value)

设置与 ``Edge Animation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``592``—``592`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateEdgeAnimation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42349:42945:FUNCTION

.. rubric:: ``setPhysics``

.. code-block:: javascript

   setPhysics(value)

设置与 ``Physics`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``593``—``593`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onPhysicsChange``、``updateEdgeAnimation``、``pickedIds``、``viewportFollow.select``、``animate``、``viewportFollow.stop``、``win.cancelAnimationFrame``、``draw``、``requestDraw``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:42946:43484:FUNCTION

.. rubric:: ``relayout``

.. code-block:: javascript

   relayout()

实现 ``relayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearFocus``、``nodes.values``、``Math.sqrt``、``Math.cos``、``Math.sin``、``orderedLayout.rebuild``、``orbitLayout.rebuild``、``fit``、``animate``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:43485:44021:FUNCTION

.. rubric:: ``destroy``

.. code-block:: javascript

   destroy()

实现 ``destroy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``595``—``595`` 行；所属函数 ``createChatKnowledgeGraph``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``viewportFollow.stop``、``dragInfluence.clear``、``pendingReads.clear``、``loadingBadge.remove``、``contextMenu.destroy``、``updateEdgeAnimation``、``endMarquee``、``win.cancelAnimationFrame``、``simulation.stop``、``observer?.disconnect``、``visibilityObserver?.disconnect``、``listeners.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js:43842:43862:FUNCTION

.. rubric:: ``listeners.forEach callback @ 595``

.. code-block:: javascript

   listeners.forEach callback @ 595(dispose)

作为 ``listeners.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``595``—``595`` 行；所属函数 ``destroy``。

**参数**

``dispose``
   调用方传入的 ``dispose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dispose``。
