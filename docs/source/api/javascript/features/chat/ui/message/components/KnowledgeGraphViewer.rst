src/features/chat/ui/message/components/KnowledgeGraphViewer 模块
===============================================================

.. js:module:: src/features/chat/ui/message/components/KnowledgeGraphViewer

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx``
* **模块标识**：``src/features/chat/ui/message/components/KnowledgeGraphViewer``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：34

主要依赖
--------

``react``、``lucide-react``、``@neo4j-nvl/react``、``@/components/ui/ThreeDotLoading.jsx``、``@/context/LazyVisibility.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:311:778:FUNCTION

.. js:function:: getColorForLabel(label)

   读取与 ``Color For Label`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``27`` 行。

   **参数**

   ``label``
      调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'#666666'``、``colorMap[label]``、``\`hsl(${hue}, 88%, 58%)\```。

   **主要协作调用**：``label.charCodeAt``、``Math.abs``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:813:2323:FUNCTION

.. rubric:: ``React.memo callback @ 29``

.. code-block:: javascript

   React.memo callback @ 29({nvlRef, nodes, rels, loadingLayer, onLoadingComplete})

实现 ``React.memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``75`` 行。

**参数**

``{nvlRef, nodes, rels, loadingLayer, onLoadingComplete}``
   调用方传入的 ``nvlRef, nodes, rels, loadingLayer, onLoadingComplete`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="relative" style={{height: '200px'}}> <InteractiveNvlWrapper ref={nvlRef} nodes={nodes} rels={rels} nvlOptions={{ layout: 'd3Force', renderer: 'canvas', nodeColor…``。

**主要协作调用**：``useState``、``useEffect``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:944:1126:FUNCTION

.. rubric:: ``useEffect callback @ 32``

.. code-block:: javascript

   useEffect callback @ 32()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``32``—``39`` 行；所属函数 ``React.memo callback @ 29``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:985:1070:FUNCTION

.. rubric:: ``setTimeout callback @ 33``

.. code-block:: javascript

   setTimeout callback @ 33()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``33``—``36`` 行；所属函数 ``useEffect callback @ 32``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``、``onLoadingComplete``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:1093:1119:FUNCTION

.. rubric:: ``returned callback @ 38``

.. code-block:: javascript

   returned callback @ 38()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``useEffect callback @ 32``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2405:13416:FUNCTION

.. rubric:: ``memo callback @ 79``

.. code-block:: javascript

   memo callback @ 79({msg, className = 'w-full'})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``331`` 行。

**参数**

``{msg, className = 'w-full'}``
   调用方传入的 ``msg, className = 'w-full'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\`mt-1 mb-4 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm ${className}\`}> <div className="px-4 py-2.5 text-sm font-medium text-gray-600 bor…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``useRef``、``useState``、``useEffect``、``Array.isArray``、``network.nodes.map``、``nvlNodes.map``、``(network.relationships \|\| network.relationship \|\| []) .map((rel, index) => { const from = String(rel.from ?? rel.source…``、``(network.relationships \|\| network.relationship \|\| []) .map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2750:2799:FUNCTION

.. rubric:: ``useEffect callback @ 88``

.. code-block:: javascript

   useEffect callback @ 88()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``88``—``90`` 行；所属函数 ``memo callback @ 79``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2871:3166:FUNCTION

.. rubric:: ``useEffect callback @ 93``

.. code-block:: javascript

   useEffect callback @ 93()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``93``—``103`` 行；所属函数 ``memo callback @ 79``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (nvlRef.current) { nvlRef.current.destroy?.(); nvlRef.current = null; } initializedRef.current = false; latestMsgRef.current?.unregisterComponent?.('nvlInstance'); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:2893:3159:FUNCTION

.. rubric:: ``returned callback @ 94``

.. code-block:: javascript

   returned callback @ 94()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``94``—``102`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nvlRef.current.destroy``、``latestMsgRef.current?.unregisterComponent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3331:3506:FUNCTION

.. rubric:: ``network.nodes.map callback @ 109``

.. code-block:: javascript

   network.nodes.map callback @ 109(node)

作为 ``network.nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``113`` 行；所属函数 ``memo callback @ 79``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``getColorForLabel``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3553:3562:FUNCTION

.. rubric:: ``nvlNodes.map callback @ 115``

.. code-block:: javascript

   nvlNodes.map callback @ 115(n)

作为 ``nvlNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``memo callback @ 79``。

**参数**

``n``
   调用方传入的 ``n`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:3654:4022:FUNCTION

.. rubric:: ``(network.relationships \|\| network.relationship \|\| []) .map callback @ 118``

.. code-block:: javascript

   (network.relationships || network.relationship || []) .map callback @ 118(rel, index)

作为 ``(network.relationships \|\| network.relationship \|\| []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``128`` 行；所属函数 ``memo callback @ 79``。

**参数**

``rel``
   调用方传入的 ``rel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ id: String(rel.id ?? \`rel-${index}\`), from, to, captions: (rel.type \|\| rel.label) ? [{value: rel.type \|\| rel.label}] : undefined, }``。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:4040:4108:FUNCTION

.. rubric:: ``(network.relationships \|\| network.relationship \|\| []) .map((rel, index) => { const from = String(rel.from ?? rel.source… callback @ 129``

.. code-block:: javascript

   (network.relationships || network.relationship || []) .map((rel, index) => { const from = String(rel.from ?? rel.source… callback @ 129(r)

实现 ``(network.relationships \|\| network.relationship \|\| []) .map((rel, index) => { const from = String(rel.from ?? rel.source…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``memo callback @ 79``。

**参数**

``r``
   调用方传入的 ``r`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nodeIdSet.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:5923:13342:FUNCTION

.. rubric:: ``onLoadingComplete callback @ 172``

.. code-block:: javascript

   onLoadingComplete callback @ 172()

处理 ``Loading Complete`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``326`` 行；所属函数 ``memo callback @ 79``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsGraphLoading``、``msg.registerComponent``、``nvlRef.current.focusNetwork``、``msg.getComponent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:6119:12891:FUNCTION

.. rubric:: ``anonymous callback @ 176``

.. code-block:: javascript

   anonymous callback @ 176(focusIds)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``176``—``315`` 行；所属函数 ``onLoadingComplete callback @ 172``。

**参数**

``focusIds``
   调用方传入的 ``focusIds`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Array.isArray``、``focusIds.map``、``String``、``safeFit``、``nvlRels.filter``、``getOrderedIds``、``applyHorizontalLayout``、``setTimeout``、``console.warn``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:6620:7171:FUNCTION

.. rubric:: ``safeFit``

.. code-block:: javascript

   safeFit()

实现 ``safeFit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``187``—``196`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:6687:7135:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 188``

.. code-block:: javascript

   requestAnimationFrame callback @ 188()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``195`` 行；所属函数 ``safeFit``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:6757:7095:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 189``

.. code-block:: javascript

   requestAnimationFrame callback @ 189()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``189``—``194`` 行；所属函数 ``requestAnimationFrame callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nvlRef.current?.fit``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:7484:7625:FUNCTION

.. rubric:: ``nvlRels.filter callback @ 205``

.. code-block:: javascript

   nvlRels.filter callback @ 205(rel)

作为 ``nvlRels.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``205``—``207`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

``rel``
   调用方传入的 ``rel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``focusSet.has``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:7715:9978:FUNCTION

.. rubric:: ``getOrderedIds``

.. code-block:: javascript

   getOrderedIds()

读取与 ``Ordered Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``210``—``259`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``ids``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``ids.forEach``、``relatedRels.forEach``、``ids.find``、``walk``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:7975:8138:FUNCTION

.. rubric:: ``ids.forEach callback @ 216``

.. code-block:: javascript

   ids.forEach callback @ 216(id)

作为 ``ids.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``219`` 行；所属函数 ``getOrderedIds``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``graph.set``、``degree.set``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8198:8688:FUNCTION

.. rubric:: ``relatedRels.forEach callback @ 221``

.. code-block:: javascript

   relatedRels.forEach callback @ 221(rel)

作为 ``relatedRels.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``221``—``230`` 行；所属函数 ``getOrderedIds``。

**参数**

``rel``
   调用方传入的 ``rel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``graph.get(from)?.push``、``graph.get``、``graph.get(to)?.push``、``degree.set``、``degree.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8791:8817:FUNCTION

.. rubric:: ``ids.find callback @ 233``

.. code-block:: javascript

   ids.find callback @ 233(id)

作为 ``ids.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``233``—``233`` 行；所属函数 ``getOrderedIds``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``degree.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:8871:8902:FUNCTION

.. rubric:: ``ids.find callback @ 234``

.. code-block:: javascript

   ids.find callback @ 234(id)

作为 ``ids.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``getOrderedIds``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``degree.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9123:9665:FUNCTION

.. rubric:: ``walk``

.. code-block:: javascript

   walk(id)

实现 ``walk`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``240``—``250`` 行；所属函数 ``getOrderedIds``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visited.add``、``result.push``、``graph.get``、``nextNodes .filter(nextId => !visited.has(nextId)) .sort((a, b) => (degree.get(a) \|\| 0) - (degree.get(b) \|\| 0)) .forEach``、``nextNodes .filter(nextId => !visited.has(nextId)) .sort``、``nextNodes .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9431:9461:FUNCTION

.. rubric:: ``nextNodes .filter callback @ 247``

.. code-block:: javascript

   nextNodes .filter callback @ 247(nextId)

作为 ``nextNodes .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``walk``。

**参数**

``nextId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visited.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9513:9566:FUNCTION

.. rubric:: ``nextNodes .filter(nextId => !visited.has(nextId)) .sort callback @ 248``

.. code-block:: javascript

   nextNodes .filter(nextId => !visited.has(nextId)) .sort callback @ 248(a, b)

作为 ``nextNodes .filter(nextId => !visited.has(nextId)) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``248``—``248`` 行；所属函数 ``walk``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``degree.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:9766:9890:FUNCTION

.. rubric:: ``ids.forEach callback @ 254``

.. code-block:: javascript

   ids.forEach callback @ 254(id)

作为 ``ids.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``254``—``256`` 行；所属函数 ``getOrderedIds``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visited.has``、``result.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:10252:11073:FUNCTION

.. rubric:: ``buildHorizontalNodes``

.. code-block:: javascript

   buildHorizontalNodes()

构造与 ``Horizontal Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``265``—``281`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nvlNodes.map(node => { const index = orderedIds.indexOf(String(node.id)); if (index === -1) return node; return { ...node, x: startX + index * spacing, y: 0, fixed: true, isFixed:…``。

**主要协作调用**：``nvlNodes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:10317:11037:FUNCTION

.. rubric:: ``nvlNodes.map callback @ 266``

.. code-block:: javascript

   nvlNodes.map callback @ 266(node)

作为 ``nvlNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``266``—``280`` 行；所属函数 ``buildHorizontalNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``、``{ ...node, x: startX + index * spacing, y: 0, fixed: true, isFixed: true, fx: startX + index * spacing, fy: 0, }``。

**主要协作调用**：``orderedIds.indexOf``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:11137:11871:FUNCTION

.. rubric:: ``applyHorizontalLayout``

.. code-block:: javascript

   applyHorizontalLayout()

应用与 ``Horizontal Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``283``—``293`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildHorizontalNodes``、``nvlRef.current.updateElementsInGraph``、``nvlRef.current.setData``、``nvlRef.current.setNodes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12021:12628:FUNCTION

.. rubric:: ``setTimeout callback @ 298``

.. code-block:: javascript

   setTimeout callback @ 298()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``298``—``309`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyHorizontalLayout``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12157:12588:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 301``

.. code-block:: javascript

   requestAnimationFrame callback @ 301()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``308`` 行；所属函数 ``setTimeout callback @ 298``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:12231:12544:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 302``

.. code-block:: javascript

   requestAnimationFrame callback @ 302()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``302``—``307`` 行；所属函数 ``requestAnimationFrame callback @ 301``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nvlRef.current?.fit``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx:13417:13524:FUNCTION

.. rubric:: ``memo callback @ 331``

.. code-block:: javascript

   memo callback @ 331(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``331``—``333`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev.msg.network === next.msg.network && prev.className === next.className``。
