src/features/chat/ui/message/components/knowledgeGraphContextMenu 模块
================================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/knowledgeGraphContextMenu

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/knowledgeGraphContextMenu.js``
* **模块标识**：``src/features/chat/ui/message/components/knowledgeGraphContextMenu``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：38

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:22:497:FUNCTION

.. js:function:: normalizeTypes(data)

   规范化与 ``Types`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``1``—``9`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[...types.values()].sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-CN'))``。

   **主要协作调用**：``Array.isArray``、``String(item?.label || '').trim``、``String``、``['OrderAxis', 'OrderedNode'].includes``、``types.has``、``types.set``、``[...types.values()].sort``、``types.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:498:10602:FUNCTION

.. js:function:: createKnowledgeGraphContextMenu({ host, getBounds, getOrderedTypes, onExpand, onOrderedSkeleton, onNearestOrdered })

   创建与 ``Knowledge Graph Context Menu`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``13``—``145`` 行。

   **参数**

   ``{ host, getBounds, getOrderedTypes, onExpand, onOrderedSkeleton, onNearestOrdered }`` （默认值 ``{}``）
      调用方传入的 ``host, getBounds, getOrderedTypes, onExpand, onOrderedSkeleton, onNearestOrdered`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ open, close, isOpen: () => Boolean(menu), nodeId: () => current?.id || null, destroy() { if (destroyed) return; close(); destroyed = true; listeners.forEach(dispose => dispose()…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``listen``。

   **内部回调数量**：22。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:432:493:FUNCTION

.. rubric:: ``[...types.values()].sort callback @ 8``

.. code-block:: javascript

   [...types.values()].sort callback @ 8(a, b)

作为 ``[...types.values()].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``8`` 行；所属函数 ``normalizeTypes``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.displayName.localeCompare``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1050:1236:FUNCTION

.. rubric:: ``listen``

.. code-block:: javascript

   listen(target, type, callback, options)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``16``—``19`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1171:1228:FUNCTION

.. rubric:: ``listeners.push callback @ 18``

.. code-block:: javascript

   listeners.push callback @ 18()

实现 ``listeners.push`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``listen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``target.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1256:1470:FUNCTION

.. rubric:: ``create``

.. code-block:: javascript

   create(tag, text, className)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``25`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``tag``
   调用方传入的 ``tag`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``text``
   待展示、发送、解析或朗读的文本。

``className``
   调用方传入的 ``className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``element``。

**主要协作调用**：``doc.createElement``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1492:1575:FUNCTION

.. rubric:: ``contains``

.. code-block:: javascript

   contains(target)

实现 ``contains`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``menu?.contains``、``submenu?.contains``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1596:1689:FUNCTION

.. rubric:: ``choices``

.. code-block:: javascript

   choices(root)

实现 ``choices`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...root.querySelectorAll('button:not(:disabled)')].filter``、``root.querySelectorAll``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1664:1688:FUNCTION

.. rubric:: ``[...root.querySelectorAll('button:not(:disabled)')].filter callback @ 27``

.. code-block:: javascript

   [...root.querySelectorAll('button:not(:disabled)')].filter callback @ 27(button)

作为 ``[...root.querySelectorAll('button:not(:disabled)')].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``choices``。

**参数**

``button``
   调用方传入的 ``button`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1690:1923:FUNCTION

.. rubric:: ``closeSubmenu``

.. code-block:: javascript

   closeSubmenu()

关闭与 ``Submenu`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``28``—``33`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request?.abort``、``submenu?.remove``、``trigger?.setAttribute``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:1923:2249:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close({ restoreFocus = false })

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``34``—``40`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``{ restoreFocus = false }`` （默认值 ``{}``）
   调用方传入的 ``restoreFocus = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeSubmenu``、``menu?.remove``、``current?.element?.setAttribute``、``origin.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:2249:2590:FUNCTION

.. rubric:: ``bounds``

.. code-block:: javascript

   bounds()

实现 ``bounds`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ left: rect.left || 0, top: rect.top || 0, width: rect.width || svg?.width || host.clientWidth || 640, height: rect.height || svg?.height || host.clientHeight || 300 }``。

**主要协作调用**：``getBounds``、``host.getBoundingClientRect``、``host.querySelector('svg')?.getBoundingClientRect``、``host.querySelector``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:2608:2671:FUNCTION

.. rubric:: ``clamp``

.. code-block:: javascript

   clamp(value, max)

实现 ``clamp`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``value``
   待读取、转换或校验的值。

``max``
   调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:2672:3199:FUNCTION

.. rubric:: ``position``

.. code-block:: javascript

   position(root, x, y)

实现 ``position`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``53`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``x``
   调用方传入的 ``x`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``y``
   调用方传入的 ``y`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``bounds``、``Math.max``、``root.getBoundingClientRect``、``Math.min``、``clamp``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:3199:3406:FUNCTION

.. rubric:: ``invoke``

.. code-block:: javascript

   invoke(callback, ...args)

实现 ``invoke`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``57`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

``...args`` （剩余参数）
   调用方传入的 ``args`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``、``Promise.resolve(callback?.(...args)).catch``、``Promise.resolve``、``callback``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:3337:3345:FUNCTION

.. rubric:: ``Promise.resolve(callback?.(...args)).catch callback @ 56``

.. code-block:: javascript

   Promise.resolve(callback?.(...args)).catch callback @ 56()

处理 ``Promise.resolve(callback?.(...args)).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``invoke``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:3406:4002:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   action(title, name, callback)

实现 ``action`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``65`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``title``
   调用方传入的 ``title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``button``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``create``、``button.setAttribute``、``button.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:3702:3833:FUNCTION

.. rubric:: ``button.addEventListener callback @ 62``

.. code-block:: javascript

   button.addEventListener callback @ 62(event)

处理 ``button.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``action``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``button.hasAttribute``、``menu?.contains``、``closeSubmenu``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:3876:3971:FUNCTION

.. rubric:: ``button.addEventListener callback @ 63``

.. code-block:: javascript

   button.addEventListener callback @ 63()

处理 ``button.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``action``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``button.hasAttribute``、``menu?.contains``、``closeSubmenu``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:4002:6681:FUNCTION

.. rubric:: ``showTypes``

.. code-block:: javascript

   showTypes(kind, button, focus)

实现 ``showTypes`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``96`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``button``
   调用方传入的 ``button`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``focus`` （默认值 ``false``）
   调用方传入的 ``focus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``choices(submenu)[0]?.focus``、``choices``、``closeSubmenu``、``button.setAttribute``、``create``、``opened.setAttribute``、``status.setAttribute``、``opened.append``、``host.append``、``bounds``、``menu.getBoundingClientRect``、``button.getBoundingClientRect``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:5370:5463:FUNCTION

.. rubric:: ``valid``

.. code-block:: javascript

   valid()

实现 ``valid`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``showTypes``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:5496:5550:FUNCTION

.. rubric:: ``Promise.resolve().then callback @ 82``

.. code-block:: javascript

   Promise.resolve().then callback @ 82()

处理 ``Promise.resolve().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``showTypes``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getOrderedTypes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:5557:6586:FUNCTION

.. rubric:: ``Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then callback @ 82``

.. code-block:: javascript

   Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then callback @ 82(data)

处理 ``Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``82``—``95`` 行；所属函数 ``showTypes``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``valid``、``opened.replaceChildren``、``normalizeTypes``、``action``、``entry.append``、``create``、``Number.isFinite``、``Number``、``Math.floor(Number(type.count)).toLocaleString``、``Math.floor``、``opened.append``、``position``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:5742:5853:FUNCTION

.. rubric:: ``action callback @ 86``

.. code-block:: javascript

   action callback @ 86()

实现 ``action`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then callback @ 82``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``invoke``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:6594:6673:FUNCTION

.. rubric:: ``Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then(data => { if (!valid()) return; ope… callback @ 95``

.. code-block:: javascript

   Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then(data => { if (!valid()) return; ope… callback @ 95(error)

实现 ``Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then(data => { if (!valid()) return; ope…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``showTypes``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``valid``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:6681:7146:FUNCTION

.. rubric:: ``typeAction``

.. code-block:: javascript

   typeAction(title, kind)

实现 ``typeAction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``97``—``103`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``title``
   调用方传入的 ``title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``button``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``action``、``button.append``、``create``、``button.setAttribute``、``button.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:6762:6792:FUNCTION

.. rubric:: ``action callback @ 98``

.. code-block:: javascript

   action callback @ 98()

实现 ``action`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``typeAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showTypes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:7042:7115:FUNCTION

.. rubric:: ``button.addEventListener callback @ 101``

.. code-block:: javascript

   button.addEventListener callback @ 101(event)

处理 ``button.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``typeAction``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showTypes``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:7146:8764:FUNCTION

.. rubric:: ``open``

.. code-block:: javascript

   open(node, event)

打开与 ``open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``104``—``122`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event`` （默认值 ``{}``）
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``close``、``create``、``root.setAttribute``、``root.append``、``action``、``typeAction``、``event.preventDefault``、``event.stopPropagation``、``host.append``、``bounds``、``node?.element?.getBoundingClientRect``、``position``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:7555:7598:FUNCTION

.. rubric:: ``action callback @ 110``

.. code-block:: javascript

   action callback @ 110()

实现 ``action`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``open``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``invoke``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:7733:7846:FUNCTION

.. rubric:: ``action callback @ 112``

.. code-block:: javascript

   action callback @ 112()

实现 ``action`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``open``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``invoke``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:8764:10025:FUNCTION

.. rubric:: ``keyboard``

.. code-block:: javascript

   keyboard(event)

实现 ``keyboard`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``123``—``136`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``close``、``contains``、``focused.hasAttribute``、``showTypes``、``submenu?.contains``、``closeSubmenu``、``previous?.focus``、``['ArrowDown', 'ArrowUp', 'Home', 'End'].includes``、``choices``、``items.indexOf``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10103:10162:FUNCTION

.. rubric:: ``listen callback @ 137``

.. code-block:: javascript

   listen callback @ 137(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``contains``、``close``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10240:10299:FUNCTION

.. rubric:: ``listen callback @ 139``

.. code-block:: javascript

   listen callback @ 139(event)

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``contains``、``close``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10331:10345:FUNCTION

.. rubric:: ``listen callback @ 140``

.. code-block:: javascript

   listen callback @ 140()

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10373:10387:FUNCTION

.. rubric:: ``listen callback @ 141``

.. code-block:: javascript

   listen callback @ 141()

实现 ``listen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``close``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10423:10443:FUNCTION

.. rubric:: ``isOpen``

.. code-block:: javascript

   isOpen()

判断与 ``Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10452:10478:FUNCTION

.. rubric:: ``nodeId``

.. code-block:: javascript

   nodeId()

实现 ``nodeId`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10479:10592:FUNCTION

.. rubric:: ``destroy``

.. code-block:: javascript

   destroy()

实现 ``destroy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``createKnowledgeGraphContextMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``close``、``listeners.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/knowledgeGraphContextMenu.js:10568:10588:FUNCTION

.. rubric:: ``listeners.forEach callback @ 143``

.. code-block:: javascript

   listeners.forEach callback @ 143(dispose)

作为 ``listeners.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``destroy``。

**参数**

``dispose``
   调用方传入的 ``dispose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dispose``。
