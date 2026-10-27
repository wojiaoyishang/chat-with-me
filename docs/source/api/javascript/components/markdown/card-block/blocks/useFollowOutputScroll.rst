src/components/markdown/card-block/blocks/useFollowOutputScroll 模块
============================================================================================================================================

.. js:module:: src/components/markdown/card-block/blocks/useFollowOutputScroll

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/blocks/useFollowOutputScroll.js``
* **模块标识**：``src/components/markdown/card-block/blocks/useFollowOutputScroll``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``./outputScrollBatch.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:207:301:FUNCTION

.. js:function:: getDistanceToBottom(node)

   读取与 ``Distance To Bottom`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``13`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.max(0, node.scrollHeight - node.scrollTop - node.clientHeight)``。

   **主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:333:3540:FUNCTION

.. js:function:: useFollowOutputScroll({contentKey = '', enabled = true})

   封装 ``useFollowOutputScroll`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``128`` 行。

   **参数**

   ``{contentKey = '', enabled = true}`` （默认值 ``{}``）
      调用方传入的 ``contentKey = '', enabled = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ followMode, handleScroll, handleTouchMove, handleWheel, isFollowing: followMode === 'following', pauseFollowing, resumeFollowing, scrollContainerRef, scrollToBottom, toggleFollo…``。

   **主要协作调用**：``useRef``、``useState``、``useCallback``、``useLayoutEffect``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:579:680:FUNCTION

.. rubric:: ``useCallback callback @ 20``

.. code-block:: javascript

   useCallback callback @ 20(nextMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``20``—``23`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``nextMode``
   调用方传入的 ``nextMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowModeState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:727:1048:FUNCTION

.. rubric:: ``useCallback callback @ 25``

.. code-block:: javascript

   useCallback callback @ 25({behavior = 'auto', resume = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``25``—``40`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``{behavior = 'auto', resume = true}`` （默认值 ``{}``）
   调用方传入的 ``behavior = 'auto', resume = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFollowMode``、``node.scrollTo``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1108:1154:FUNCTION

.. rubric:: ``useCallback callback @ 42``

.. code-block:: javascript

   useCallback callback @ 42()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``42``—``44`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1215:1286:FUNCTION

.. rubric:: ``useCallback callback @ 46``

.. code-block:: javascript

   useCallback callback @ 46()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``46``—``48`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1348:1502:FUNCTION

.. rubric:: ``useCallback callback @ 50``

.. code-block:: javascript

   useCallback callback @ 50()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``57`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``pauseFollowing``、``resumeFollowing``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1578:2146:FUNCTION

.. rubric:: ``useCallback callback @ 59``

.. code-block:: javascript

   useCallback callback @ 59(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``75`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getDistanceToBottom``、``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:2203:2564:FUNCTION

.. rubric:: ``useCallback callback @ 77``

.. code-block:: javascript

   useCallback callback @ 77(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``88`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:2625:2892:FUNCTION

.. rubric:: ``useCallback callback @ 90``

.. code-block:: javascript

   useCallback callback @ 90()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``100`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getDistanceToBottom``、``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:2933:3229:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 102``

.. code-block:: javascript

   useLayoutEffect callback @ 102()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``102``—``114`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``queueOutputFollow(node, () => followModeRef.current === 'following')``。

**主要协作调用**：``queueOutputFollow``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:3177:3221:FUNCTION

.. rubric:: ``queueOutputFollow callback @ 113``

.. code-block:: javascript

   queueOutputFollow callback @ 113()

实现 ``queueOutputFollow`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``useLayoutEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
