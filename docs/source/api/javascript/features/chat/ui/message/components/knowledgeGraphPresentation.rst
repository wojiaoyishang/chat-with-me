src/features/chat/ui/message/components/knowledgeGraphPresentation 模块
==================================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/knowledgeGraphPresentation

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/knowledgeGraphPresentation.js``
* **模块标识**：``src/features/chat/ui/message/components/knowledgeGraphPresentation``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``../../../../knowledge/orderedGraphLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:327:517:FUNCTION

.. js:function:: identity(value)

   实现 ``identity`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``8`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``id === undefined || id === null || id === '' ? null : String(id)``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:548:622:FUNCTION

.. js:function:: isSourceChunk(node)

   判断与 ``Source Chunk`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``10``—``10`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``node.labels?.includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:653:835:FUNCTION

.. js:function:: graphNodeLabel(node)

   实现 ``graphNodeLabel`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``11`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``node.labels?.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:866:1222:FUNCTION

.. js:function:: graphNodeColor(label)

   实现 ``graphNodeColor`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``12``—``19`` 行。

   **参数**

   ``label``
      调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'#4f8bb8'``、``'#dc8792'``、``colors[Math.abs(hash) % colors.length]``。

   **主要协作调用**：``String``、``character.codePointAt``、``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:1223:4499:FUNCTION

.. js:function:: knowledgeGraphPresentation(network)

   实现 ``knowledgeGraphPresentation`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``22``—``68`` 行。

   **参数**

   ``network``
      调用方传入的 ``network`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ nodes: [...nodes.values()], relationships: [...relationships.values()], edges, links, aliases, completeParentIds, orderedView }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``Array.isArray``、``isInternalOrderAxis``、``identity``、``graphNodeLabel``、``String``、``nodes.set``、``graphNodeColor``、``aliases.set``、``aliases.get``、``JSON.stringify``、``relationships.set``、``relationships.values``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:4499:5922:FUNCTION

.. js:function:: graphEdgeGeometry(edge, start, end)

   实现 ``graphEdgeGeometry`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``70``—``87`` 行。

   **参数**

   ``edge``
      调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``start``
      调用方传入的 ``start`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``end``
      调用方传入的 ``end`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ path: \x60M ${x1} ${y1} C ${x1 + bend} ${y1} ${x2 - bend} ${y2} ${x2} ${y2}\x60, x: (x1 + x2) / 2, y: (y1 + y2) / 2 }``、``{ path: length > start.radius + end.radius + 6 ? \x60M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}\x60 : '', x: (x1 + 2 * cx + x2) / 4, y: (y1 + 2 * cy + y2) / 4 - (edge.sourceLink ? 0 : 5), }``。

   **主要协作调用**：``Math.max``、``Math.hypot``、``Math.min``、``Math.abs``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:734:806:FUNCTION

.. rubric:: ``node.labels?.find callback @ 11``

.. code-block:: javascript

   node.labels?.find callback @ 11(label)

作为 ``node.labels?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``graphNodeLabel``。

**参数**

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['Knowledge', 'Node', 'Entity', 'OrderedNode'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:3181:3215:FUNCTION

.. rubric:: ``group.filter callback @ 52``

.. code-block:: javascript

   group.filter callback @ 52(edge)

作为 ``group.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``knowledgeGraphPresentation``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sourceTypes.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:3273:3308:FUNCTION

.. rubric:: ``group.filter callback @ 53``

.. code-block:: javascript

   group.filter callback @ 53(edge)

作为 ``group.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``knowledgeGraphPresentation``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sourceTypes.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphPresentation.js:3727:4151:FUNCTION

.. rubric:: ``ordinary.forEach callback @ 60``

.. code-block:: javascript

   ordinary.forEach callback @ 60(edge, index)

作为 ``ordinary.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``64`` 行；所属函数 ``knowledgeGraphPresentation``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``edges.push``、``orderedEdgeStyle``、``nodes.get``、``JSON.stringify``。
