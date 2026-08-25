src/lib/browserHistoryLayers 模块
================================================================================

.. js:module:: src/lib/browserHistoryLayers

Treat an open UI surface as a same-URL browser-history layer. - Hardware/browser Back closes the newest layer first. - Normal close buttons collapse the synthetic history entry. - \`onBack\` may return false to keep the layer open and immediately re-arm it. This is useful for an unsaved-change confirmation flow.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/browserHistoryLayers.js``
* **模块标识**：``src/lib/browserHistoryLayers``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:236:386:FUNCTION

.. js:function:: currentUrl()

   实现 ``currentUrl`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``13`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``\x60${window.location.pathname}${window.location.search}${window.location.hash}\x60``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:414:579:FUNCTION

.. js:function:: cloneHistoryState()

   实现 ``cloneHistoryState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``19`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{}``、``state && typeof state === 'object' ? {...state} : {}``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:604:1029:FUNCTION

.. js:function:: pushLayerEntry(layer)

   实现 ``pushLayerEntry`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``32`` 行。

   **参数**

   ``layer``
      调用方传入的 ``layer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``cloneHistoryState``、``window.history.pushState``、``currentUrl``。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:1054:1399:FUNCTION

.. js:function:: notifyRoutePop(event)

   实现 ``notifyRoutePop`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``47`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``currentUrl``、``routePopListeners.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:1423:2741:FUNCTION

.. js:function:: ensureManager()

   确保与 ``Manager`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``89`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.addEventListener``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:2786:3138:FUNCTION

.. js:function:: registerBrowserHistoryLayer({kind = 'overlay', onBack, onConsumed})

   注册与 ``Browser History Layer`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``91``—``104`` 行。

   **参数**

   ``{kind = 'overlay', onBack, onConsumed}``（默认值 ``{}``）
      调用方传入的 ``kind = 'overlay', onBack, onConsumed`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``layer.id``。

   **主要协作调用**：``ensureManager``、``Date.now``、``activeLayers.push``、``pushLayerEntry``。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:3182:3852:FUNCTION

.. js:function:: releaseBrowserHistoryLayer(id, {collapseHistory = true})

   实现 ``releaseBrowserHistoryLayer`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``106``—``124`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{collapseHistory = true}``（默认值 ``{}``）
      调用方传入的 ``collapseHistory = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``ensureManager``、``activeLayers.findIndex``、``activeLayers.splice``、``window.history.back``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:3895:4047:FUNCTION

.. js:function:: forgetBrowserHistoryLayer(id)

   实现 ``forgetBrowserHistoryLayer`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``126``—``130`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``activeLayers.findIndex``、``activeLayers.splice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:4089:4275:FUNCTION

.. js:function:: subscribeBrowserRoutePop(listener)

   订阅与 ``Browser Route Pop`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``132``—``137`` 行。

   **参数**

   ``listener``
      调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => routePopListeners.delete(listener)``。

   **主要协作调用**：``ensureManager``、``routePopListeners.add``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:4652:6761:FUNCTION

.. js:function:: useBrowserBackLayer(open, onBack, {kind = 'overlay'})

   封装 ``useBrowserBackLayer`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``147``—``202`` 行。

   **参数**

   ``open``
      调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``onBack``
      调用方提供的事件回调。

   ``{kind = 'overlay'}``（默认值 ``{}``）
      调用方传入的 ``kind = 'overlay'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useRef``、``Boolean``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:1222:1395:FUNCTION

.. rubric:: ``routePopListeners.forEach callback @ 40``

.. code-block:: javascript

   routePopListeners.forEach callback @ 40(listener)

作为 ``routePopListeners.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``46`` 行；所属函数 ``notifyRoutePop``。

**参数**

``listener``
   调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listener``、``console.error``。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:1558:2737:FUNCTION

.. rubric:: ``window.addEventListener callback @ 53``

.. code-block:: javascript

   window.addEventListener callback @ 53(event)

处理 ``window.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``53``—``88`` 行；所属函数 ``ensureManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``activeLayers.pop``、``layer.onBack``、``console.error``、``activeLayers.push``、``pushLayerEntry``、``layer.onConsumed``、``notifyRoutePop``。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:3340:3364:FUNCTION

.. rubric:: ``activeLayers.findIndex callback @ 109``

.. code-block:: javascript

   activeLayers.findIndex callback @ 109(item)

实现 ``activeLayers.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``releaseBrowserHistoryLayer``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:3968:3992:FUNCTION

.. rubric:: ``activeLayers.findIndex callback @ 128``

.. code-block:: javascript

   activeLayers.findIndex callback @ 128(item)

实现 ``activeLayers.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``forgetBrowserHistoryLayer``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:4152:4161:FUNCTION

.. rubric:: ``returned callback @ 133``

.. code-block:: javascript

   returned callback @ 133()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``subscribeBrowserRoutePop``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:4231:4272:FUNCTION

.. rubric:: ``returned callback @ 136``

.. code-block:: javascript

   returned callback @ 136()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``subscribeBrowserRoutePop``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``routePopListeners.delete``。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:4944:6247:FUNCTION

.. rubric:: ``useEffect callback @ 156``

.. code-block:: javascript

   useEffect callback @ 156()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``156``—``188`` 行；所属函数 ``useBrowserBackLayer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``ensureManager``、``window.setTimeout``、``window.clearTimeout``、``releaseBrowserHistoryLayer``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:5280:5789:FUNCTION

.. rubric:: ``window.setTimeout callback @ 162``

.. code-block:: javascript

   window.setTimeout callback @ 162()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``162``—``174`` 行；所属函数 ``useEffect callback @ 156``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``registerBrowserHistoryLayer``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:5540:5568:FUNCTION

.. rubric:: ``onBack``

.. code-block:: javascript

   onBack()

处理 ``Back`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``window.setTimeout callback @ 162``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onBackRef.current``。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:5601:5713:FUNCTION

.. rubric:: ``onConsumed``

.. code-block:: javascript

   onConsumed()

处理 ``Consumed`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``169``—``171`` 行；所属函数 ``window.setTimeout callback @ 162``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:6265:6753:FUNCTION

.. rubric:: ``useEffect callback @ 190``

.. code-block:: javascript

   useEffect callback @ 190()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``190``—``201`` 行；所属函数 ``useBrowserBackLayer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/browserHistoryLayers.js:6270:6753:FUNCTION

.. rubric:: ``anonymous callback @ 190``

.. code-block:: javascript

   anonymous callback @ 190()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``201`` 行；所属函数 ``useEffect callback @ 190``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``forgetBrowserHistoryLayer``。
