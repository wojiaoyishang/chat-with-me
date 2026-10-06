src/components/window/FloatingDockWindow 模块
==============================================================================================

.. js:module:: src/components/window/FloatingDockWindow

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/window/FloatingDockWindow.jsx``
* **模块标识**：``src/components/window/FloatingDockWindow``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：38

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``lucide-react``、``@/lib/browserHistoryLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:447:519:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``13`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``min``
      调用方传入的 ``min`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``max``
      调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:540:840:FUNCTION

.. js:function:: readLayout(storageKey)

   实现 ``readLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``24`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{}``、``parsed && typeof parsed === 'object' ? parsed : {}``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.getItem``、``JSON.parse``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:862:1132:FUNCTION

.. js:function:: writeLayout(storageKey, value)

   实现 ``writeLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``33`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.setItem``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:1160:2396:FUNCTION

.. js:function:: normalizeFloating(layout, target)

   规范化与 ``Floating`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``62`` 行。

   **参数**

   ``layout``（默认值 ``{}``）
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``（默认值 ``null``）
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x: 120, y: 80, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, docked: false }``、``{ x: clamp(Number.isFinite(Number(layout.x)) ? Number(layout.x) : fallbackX, EDGE, bounds.width - width - EDGE), y: clamp(Number.isFinite(Number(layout.y)) ? Number(layout.y) : fa…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``target?.getBoundingClientRect``、``Math.max``、``clamp``、``Number``、``Math.min``、``Math.round``、``Number.isFinite``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2431:16346:FUNCTION

.. rubric:: ``memo callback @ 65``

.. code-block:: javascript

   memo callback @ 65({ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``371`` 行。

**参数**

``{ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…``
   调用方传入的 ``open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal(panel, docked && dockMount ? dockMount : portalTarget || document.body)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useCallback``、``useState``、``useRef``、``useBrowserBackLayer``、``useEffect``、``Boolean``、``useMemo``、``createPortal``。

**内部回调数量**：18。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2944:2993:FUNCTION

.. rubric:: ``useCallback callback @ 84``

.. code-block:: javascript

   useCallback callback @ 84(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``memo callback @ 65``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3057:3127:FUNCTION

.. rubric:: ``useState callback @ 85``

.. code-block:: javascript

   useState callback @ 85()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``、``readLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3179:3268:FUNCTION

.. rubric:: ``useState callback @ 87``

.. code-block:: javascript

   useState callback @ 87()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3344:3386:FUNCTION

.. rubric:: ``useState callback @ 89``

.. code-block:: javascript

   useState callback @ 89()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3573:3665:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 94``

.. code-block:: javascript

   useBrowserBackLayer callback @ 94()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``94``—``97`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3762:4060:FUNCTION

.. rubric:: ``useCallback callback @ 102``

.. code-block:: javascript

   useCallback callback @ 102(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``102``—``108`` 行；所属函数 ``memo callback @ 65``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3816:4044:FUNCTION

.. rubric:: ``setLayout callback @ 103``

.. code-block:: javascript

   setLayout callback @ 103(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``103``—``107`` 行；所属函数 ``useCallback callback @ 102``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizeLayout``、``updater``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4135:4581:FUNCTION

.. rubric:: ``useEffect callback @ 112``

.. code-block:: javascript

   useEffect callback @ 112()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``122`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``setDockTargetWidth``、``measure``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4288:4350:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDockTargetWidth``、``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4541:4570:FUNCTION

.. rubric:: ``returned callback @ 121``

.. code-block:: javascript

   returned callback @ 121()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4617:5003:FUNCTION

.. rubric:: ``useEffect callback @ 124``

.. code-block:: javascript

   useEffect callback @ 124()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``132`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', onResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4718:4862:FUNCTION

.. rubric:: ``onResize``

.. code-block:: javascript

   onResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``126``—``129`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMobile``、``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4824:4846:FUNCTION

.. rubric:: ``commitLayout callback @ 128``

.. code-block:: javascript

   commitLayout callback @ 128(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``onResize``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4939:4992:FUNCTION

.. rubric:: ``returned callback @ 131``

.. code-block:: javascript

   returned callback @ 131()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5041:5292:FUNCTION

.. rubric:: ``useEffect callback @ 134``

.. code-block:: javascript

   useEffect callback @ 134()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``134``—``139`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5146:5188:FUNCTION

.. rubric:: ``anonymous callback @ 136``

.. code-block:: javascript

   anonymous callback @ 136()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``useEffect callback @ 134``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5165:5187:FUNCTION

.. rubric:: ``commitLayout callback @ 136``

.. code-block:: javascript

   commitLayout callback @ 136(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``anonymous callback @ 136``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5253:5281:FUNCTION

.. rubric:: ``returned callback @ 138``

.. code-block:: javascript

   returned callback @ 138()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``useEffect callback @ 134``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5513:7123:FUNCTION

.. rubric:: ``useEffect callback @ 144``

.. code-block:: javascript

   useEffect callback @ 144()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``177`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { dockMount.style.width = previousWidth; dockMount.style.flexBasis = previousFlexBasis; dockMount.style.transition = previousTransition; dockMount.style.pointerEvents = prev…``。

**主要协作调用**：``Math.max``、``Math.min``、``Math.round``、``clamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6058:6354:FUNCTION

.. rubric:: ``returned callback @ 156``

.. code-block:: javascript

   returned callback @ 156()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``156``—``161`` 行；所属函数 ``useEffect callback @ 144``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6836:7112:FUNCTION

.. rubric:: ``returned callback @ 171``

.. code-block:: javascript

   returned callback @ 171()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``171``—``176`` 行；所属函数 ``useEffect callback @ 144``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7198:9852:FUNCTION

.. rubric:: ``useEffect callback @ 179``

.. code-block:: javascript

   useEffect callback @ 179()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``179``—``232`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp); window.removeEventListener('pointercancel', onPointerUp); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7239:8715:FUNCTION

.. rubric:: ``onPointerMove``

.. code-block:: javascript

   onPointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``209`` 行；所属函数 ``useEffect callback @ 179``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLayout``、``dockTarget.getBoundingClientRect``、``clamp``、``Math.min``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7550:7834:FUNCTION

.. rubric:: ``setLayout callback @ 186``

.. code-block:: javascript

   setLayout callback @ 186(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``186``—``192`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8071:8330:FUNCTION

.. rubric:: ``setLayout callback @ 197``

.. code-block:: javascript

   setLayout callback @ 197(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``197``—``202`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8643:8681:FUNCTION

.. rubric:: ``setLayout callback @ 207``

.. code-block:: javascript

   setLayout callback @ 207(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8748:9384:FUNCTION

.. rubric:: ``onPointerUp``

.. code-block:: javascript

   onPointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``210``—``223`` 行；所属函数 ``useEffect callback @ 179``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8924:9368:FUNCTION

.. rubric:: ``setLayout callback @ 214``

.. code-block:: javascript

   setLayout callback @ 214(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``222`` 行；所属函数 ``onPointerUp``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``normalizeLayout``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9601:9841:FUNCTION

.. rubric:: ``returned callback @ 227``

.. code-block:: javascript

   returned callback @ 227()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``227``—``231`` 行；所属函数 ``useEffect callback @ 179``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9956:10401:FUNCTION

.. rubric:: ``useCallback callback @ 235``

.. code-block:: javascript

   useCallback callback @ 235(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``235``—``244`` 行；所属函数 ``memo callback @ 65``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.currentTarget.setPointerCapture``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10520:10969:FUNCTION

.. rubric:: ``useCallback callback @ 249``

.. code-block:: javascript

   useCallback callback @ 249(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``249``—``259`` 行；所属函数 ``memo callback @ 65``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11072:11220:FUNCTION

.. rubric:: ``useCallback callback @ 263``

.. code-block:: javascript

   useCallback callback @ 263()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``263``—``266`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11151:11208:FUNCTION

.. rubric:: ``commitLayout callback @ 265``

.. code-block:: javascript

   commitLayout callback @ 265(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``useCallback callback @ 263``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11294:12219:FUNCTION

.. rubric:: ``useMemo callback @ 268``

.. code-block:: javascript

   useMemo callback @ 268()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``268``—``292`` 行；所属函数 ``memo callback @ 65``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex }``、``{ position: 'fixed', inset: 0, width: '100%', height: '100dvh', zIndex }``、``{ position: 'fixed', inset: '8px', zIndex }``、``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 20, }``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:14149:14183:FUNCTION

.. rubric:: ``onPointerDown callback @ 324``

.. code-block:: javascript

   onPointerDown callback @ 324(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``324``—``324`` 行；所属函数 ``memo callback @ 65``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:14460:14494:FUNCTION

.. rubric:: ``onPointerDown callback @ 332``

.. code-block:: javascript

   onPointerDown callback @ 332(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``memo callback @ 65``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:15086:15120:FUNCTION

.. rubric:: ``onPointerDown callback @ 342``

.. code-block:: javascript

   onPointerDown callback @ 342(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``memo callback @ 65``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
