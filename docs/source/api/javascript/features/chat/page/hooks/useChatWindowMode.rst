src/features/chat/page/hooks/useChatWindowMode 模块
=================================================

.. js:module:: src/features/chat/page/hooks/useChatWindowMode

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/hooks/useChatWindowMode.js``
* **模块标识**：``src/features/chat/page/hooks/useChatWindowMode``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：23

主要依赖
--------

``react``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:105:9596:FUNCTION

.. js:function:: useChatWindowMode({onWindowModeChange})

   封装 ``useChatWindowMode`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``245`` 行。

   **参数**

   ``{onWindowModeChange}``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ isReady, isWindowMode, windowPos, windowDimensions, windowRef, isDragging, isDragReady, isResizing, ghostCursor, toggleWindowMode, handleDragMouseDown, handleDragTouchStart, han…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useLayoutEffect``、``useCallback``、``useMemo``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:822:940:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 18``

.. code-block:: javascript

   useLayoutEffect callback @ 18()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``18``—``21`` 行；所属函数 ``useChatWindowMode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:863:885:FUNCTION

.. rubric:: ``setTimeout callback @ 19``

.. code-block:: javascript

   setTimeout callback @ 19()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``useLayoutEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsReady``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:907:933:FUNCTION

.. rubric:: ``returned callback @ 20``

.. code-block:: javascript

   returned callback @ 20()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``useLayoutEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:1020:1158:FUNCTION

.. rubric:: ``useCallback callback @ 24``

.. code-block:: javascript

   useCallback callback @ 24()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``29`` 行；所属函数 ``useChatWindowMode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ maxWidth: window.innerWidth * 0.98, maxHeight: window.innerHeight * 0.98 }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:1205:1691:FUNCTION

.. rubric:: ``useCallback callback @ 31``

.. code-block:: javascript

   useCallback callback @ 31(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``40`` 行；所属函数 ``useChatWindowMode``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.max``、``Math.min``、``setWindowPos``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:1753:2048:FUNCTION

.. rubric:: ``useCallback callback @ 42``

.. code-block:: javascript

   useCallback callback @ 42(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``42``—``50`` 行；所属函数 ``useChatWindowMode``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``windowRef.current.getBoundingClientRect``、``setIsDragging``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:2112:2694:FUNCTION

.. rubric:: ``useCallback callback @ 52``

.. code-block:: javascript

   useCallback callback @ 52(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``66`` 行；所属函数 ``useChatWindowMode``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``e.preventDefault``、``setIsDragReady``、``startDragging``、``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:2256:2303:FUNCTION

.. rubric:: ``handleMouseMove``

.. code-block:: javascript

   handleMouseMove(ev)

处理 ``Mouse Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useCallback callback @ 52``。

**参数**

``ev``
   调用方传入的 ``ev`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleDragMove``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:2334:2561:FUNCTION

.. rubric:: ``handleMouseUp``

.. code-block:: javascript

   handleMouseUp()

处理 ``Mouse Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``63`` 行；所属函数 ``useCallback callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``、``setIsDragging``、``setIsDragReady``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:2776:3226:FUNCTION

.. rubric:: ``useCallback callback @ 68``

.. code-block:: javascript

   useCallback callback @ 68(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``68``—``81`` 行；所属函数 ``useChatWindowMode``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearTimeout``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:3061:3213:FUNCTION

.. rubric:: ``setTimeout callback @ 76``

.. code-block:: javascript

   setTimeout callback @ 76()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``76``—``80`` 行；所属函数 ``useCallback callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDragReady``、``navigator.vibrate``、``startDragging``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:3305:3656:FUNCTION

.. rubric:: ``useCallback callback @ 83``

.. code-block:: javascript

   useCallback callback @ 83(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``83``—``93`` 行；所属函数 ``useChatWindowMode``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearTimeout``、``e.preventDefault``、``handleDragMove``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:3733:3957:FUNCTION

.. rubric:: ``useCallback callback @ 95``

.. code-block:: javascript

   useCallback callback @ 95()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``95``—``102`` 行；所属函数 ``useChatWindowMode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setIsDragging``、``setIsDragReady``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:4006:5905:FUNCTION

.. rubric:: ``useCallback callback @ 104``

.. code-block:: javascript

   useCallback callback @ 104(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``138`` 行；所属函数 ``useChatWindowMode``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getMaxDimensions``、``dir.includes``、``Math.max``、``Math.min``、``setWindowDimensions``、``setWindowPos``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:5967:6383:FUNCTION

.. rubric:: ``useCallback callback @ 140``

.. code-block:: javascript

   useCallback callback @ 140(clientX, clientY, direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``152`` 行；所属函数 ``useChatWindowMode``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:6478:7018:FUNCTION

.. rubric:: ``useCallback callback @ 154``

.. code-block:: javascript

   useCallback callback @ 154(e, direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``154``—``167`` 行；所属函数 ``useChatWindowMode``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``e.preventDefault``、``e.stopPropagation``、``startResizing``、``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:6638:6687:FUNCTION

.. rubric:: ``handleMove``

.. code-block:: javascript

   handleMove(ev)

处理 ``Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``159``—``159`` 行；所属函数 ``useCallback callback @ 154``。

**参数**

``ev``
   调用方传入的 ``ev`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeMove``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:6713:6895:FUNCTION

.. rubric:: ``handleUp``

.. code-block:: javascript

   handleUp()

处理 ``Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``164`` 行；所属函数 ``useCallback callback @ 154``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``、``setIsResizing``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:7104:7843:FUNCTION

.. rubric:: ``useCallback callback @ 169``

.. code-block:: javascript

   useCallback callback @ 169(e, direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``169``—``186`` 行；所属函数 ``useChatWindowMode``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``e.stopPropagation``、``startResizing``、``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:7290:7438:FUNCTION

.. rubric:: ``handleTouchMoveLocal``

.. code-block:: javascript

   handleTouchMoveLocal(ev)

处理 ``Touch Move Local`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``174``—``177`` 行；所属函数 ``useCallback callback @ 169``。

**参数**

``ev``
   调用方传入的 ``ev`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ev.preventDefault``、``handleResizeMove``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:7475:7679:FUNCTION

.. rubric:: ``handleTouchEndLocal``

.. code-block:: javascript

   handleTouchEndLocal()

处理 ``Touch End Local`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``178``—``182`` 行；所属函数 ``useCallback callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``、``setIsResizing``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:7948:8513:FUNCTION

.. rubric:: ``useMemo callback @ 189``

.. code-block:: javascript

   useMemo callback @ 189()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``189``—``208`` 行；所属函数 ``useChatWindowMode``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``'grabbing'``、``cursorMap[dir] \|\| 'move'``、``'default'``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useChatWindowMode.js:8584:9145:FUNCTION

.. rubric:: ``useCallback callback @ 210``

.. code-block:: javascript

   useCallback callback @ 210()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``210``—``225`` 行；所属函数 ``useChatWindowMode``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onWindowModeChange``、``setIsWindowMode``、``setWindowDimensions``、``setWindowPos``。
