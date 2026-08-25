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
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:147:241:FUNCTION

.. js:function:: getDistanceToBottom(node)

   读取与 ``Distance To Bottom`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``12`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.max(0, node.scrollHeight - node.scrollTop - node.clientHeight)``。

   **主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:273:3525:FUNCTION

.. js:function:: useFollowOutputScroll({contentKey = '', enabled = true})

   封装 ``useFollowOutputScroll`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``128`` 行。

   **参数**

   ``{contentKey = '', enabled = true}``（默认值 ``{}``）
      调用方传入的 ``contentKey = '', enabled = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ followMode, handleScroll, handleTouchMove, handleWheel, isFollowing: followMode === 'following', pauseFollowing, resumeFollowing, scrollContainerRef, scrollToBottom, toggleFollo…``。

   **主要协作调用**：``useRef``、``useState``、``useCallback``、``useLayoutEffect``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:519:620:FUNCTION

.. rubric:: ``useCallback callback @ 19``

.. code-block:: javascript

   useCallback callback @ 19(nextMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``22`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``nextMode``
   调用方传入的 ``nextMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowModeState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:667:988:FUNCTION

.. rubric:: ``useCallback callback @ 24``

.. code-block:: javascript

   useCallback callback @ 24({behavior = 'auto', resume = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``39`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``{behavior = 'auto', resume = true}``（默认值 ``{}``）
   调用方传入的 ``behavior = 'auto', resume = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFollowMode``、``node.scrollTo``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1048:1094:FUNCTION

.. rubric:: ``useCallback callback @ 41``

.. code-block:: javascript

   useCallback callback @ 41()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``43`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1155:1226:FUNCTION

.. rubric:: ``useCallback callback @ 45``

.. code-block:: javascript

   useCallback callback @ 45()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``47`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1288:1442:FUNCTION

.. rubric:: ``useCallback callback @ 49``

.. code-block:: javascript

   useCallback callback @ 49()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``56`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``pauseFollowing``、``resumeFollowing``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:1518:2086:FUNCTION

.. rubric:: ``useCallback callback @ 58``

.. code-block:: javascript

   useCallback callback @ 58(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``74`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getDistanceToBottom``、``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:2143:2504:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``87`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:2565:2832:FUNCTION

.. rubric:: ``useCallback callback @ 89``

.. code-block:: javascript

   useCallback callback @ 89()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``99`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getDistanceToBottom``、``setFollowMode``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/useFollowOutputScroll.js:2873:3214:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 101``

.. code-block:: javascript

   useLayoutEffect callback @ 101()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``101``—``114`` 行；所属函数 ``useFollowOutputScroll``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。
