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
* **局部函数与匿名回调**：37

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:372:444:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``12`` 行。

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:465:765:FUNCTION

.. js:function:: readLayout(storageKey)

   实现 ``readLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``23`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{}``、``parsed && typeof parsed === 'object' ? parsed : {}``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.getItem``、``JSON.parse``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:787:1057:FUNCTION

.. js:function:: writeLayout(storageKey, value)

   实现 ``writeLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``32`` 行。

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:1085:2233:FUNCTION

.. js:function:: normalizeFloating(layout, target)

   规范化与 ``Floating`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``50`` 行。

   **参数**

   ``layout``（默认值 ``{}``）
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``（默认值 ``null``）
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{x: 120, y: 80, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, docked: false}``、``{ x: clamp(Number.isFinite(Number(layout.x)) ? Number(layout.x) : fallbackX, EDGE, bounds.width - width - EDGE), y: clamp(Number.isFinite(Number(layout.y)) ? Number(layout.y) : fa…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``target?.getBoundingClientRect``、``Math.max``、``clamp``、``Number``、``Math.min``、``Math.round``、``Number.isFinite``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2268:13832:FUNCTION

.. rubric:: ``memo callback @ 52``

.. code-block:: javascript

   memo callback @ 52({ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``52``—``323`` 行。

**参数**

``{ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…``
   调用方传入的 ``open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal(panel, docked && dockMount ? dockMount : (portalTarget || document.body))``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useCallback``、``useState``、``useRef``、``useEffect``、``Boolean``、``useMemo``、``createPortal``。

**内部回调数量**：17。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2670:2717:FUNCTION

.. rubric:: ``useCallback callback @ 70``

.. code-block:: javascript

   useCallback callback @ 70(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``memo callback @ 52``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2777:2845:FUNCTION

.. rubric:: ``useState callback @ 71``

.. code-block:: javascript

   useState callback @ 71()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``71``—``71`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``、``readLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2893:2969:FUNCTION

.. rubric:: ``useState callback @ 72``

.. code-block:: javascript

   useState callback @ 72()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3031:3073:FUNCTION

.. rubric:: ``useState callback @ 73``

.. code-block:: javascript

   useState callback @ 73()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3155:3392:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``82`` 行；所属函数 ``memo callback @ 52``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3188:3384:FUNCTION

.. rubric:: ``setLayout callback @ 77``

.. code-block:: javascript

   setLayout callback @ 77(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``77``—``81`` 行；所属函数 ``useCallback callback @ 76``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizeLayout``、``updater``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3441:3847:FUNCTION

.. rubric:: ``useEffect callback @ 84``

.. code-block:: javascript

   useEffect callback @ 84()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``94`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``setDockTargetWidth``、``measure``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3574:3636:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``useEffect callback @ 84``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDockTargetWidth``、``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3811:3840:FUNCTION

.. rubric:: ``returned callback @ 93``

.. code-block:: javascript

   returned callback @ 93()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``useEffect callback @ 84``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3879:4233:FUNCTION

.. rubric:: ``useEffect callback @ 96``

.. code-block:: javascript

   useEffect callback @ 96()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``104`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', onResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3972:4104:FUNCTION

.. rubric:: ``onResize``

.. code-block:: javascript

   onResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``101`` 行；所属函数 ``useEffect callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMobile``、``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4070:4092:FUNCTION

.. rubric:: ``commitLayout callback @ 100``

.. code-block:: javascript

   commitLayout callback @ 100(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``onResize``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4173:4226:FUNCTION

.. rubric:: ``returned callback @ 103``

.. code-block:: javascript

   returned callback @ 103()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``useEffect callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4267:4496:FUNCTION

.. rubric:: ``useEffect callback @ 106``

.. code-block:: javascript

   useEffect callback @ 106()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``106``—``111`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4364:4404:FUNCTION

.. rubric:: ``anonymous callback @ 108``

.. code-block:: javascript

   anonymous callback @ 108()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``useEffect callback @ 106``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4383:4403:FUNCTION

.. rubric:: ``commitLayout callback @ 108``

.. code-block:: javascript

   commitLayout callback @ 108(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``anonymous callback @ 108``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4461:4489:FUNCTION

.. rubric:: ``returned callback @ 110``

.. code-block:: javascript

   returned callback @ 110()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``useEffect callback @ 106``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4705:6199:FUNCTION

.. rubric:: ``useEffect callback @ 116``

.. code-block:: javascript

   useEffect callback @ 116()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``116``—``149`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { dockMount.style.width = previousWidth; dockMount.style.flexBasis = previousFlexBasis; dockMount.style.transition = previousTransition; dockMount.style.pointerEvents = prev…``。

**主要协作调用**：``Math.max``、``Math.min``、``Math.round``、``clamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5210:5486:FUNCTION

.. rubric:: ``returned callback @ 128``

.. code-block:: javascript

   returned callback @ 128()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``133`` 行；所属函数 ``useEffect callback @ 116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5936:6192:FUNCTION

.. rubric:: ``returned callback @ 143``

.. code-block:: javascript

   returned callback @ 143()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``143``—``148`` 行；所属函数 ``useEffect callback @ 116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6270:8596:FUNCTION

.. rubric:: ``useEffect callback @ 151``

.. code-block:: javascript

   useEffect callback @ 151()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``151``—``200`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp); window.removeEventListener('pointercancel', onPointerUp); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6307:7553:FUNCTION

.. rubric:: ``onPointerMove``

.. code-block:: javascript

   onPointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``152``—``177`` 行；所属函数 ``useEffect callback @ 151``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLayout``、``dockTarget.getBoundingClientRect``、``clamp``、``Math.min``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6594:6814:FUNCTION

.. rubric:: ``setLayout callback @ 158``

.. code-block:: javascript

   setLayout callback @ 158(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``158``—``163`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7013:7216:FUNCTION

.. rubric:: ``setLayout callback @ 167``

.. code-block:: javascript

   setLayout callback @ 167(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``167``—``171`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7491:7527:FUNCTION

.. rubric:: ``setLayout callback @ 175``

.. code-block:: javascript

   setLayout callback @ 175(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7582:8164:FUNCTION

.. rubric:: ``onPointerUp``

.. code-block:: javascript

   onPointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``178``—``191`` 行；所属函数 ``useEffect callback @ 151``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7742:8152:FUNCTION

.. rubric:: ``setLayout callback @ 182``

.. code-block:: javascript

   setLayout callback @ 182(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``182``—``190`` 行；所属函数 ``onPointerUp``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``normalizeLayout``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8365:8589:FUNCTION

.. rubric:: ``returned callback @ 195``

.. code-block:: javascript

   returned callback @ 195()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``199`` 行；所属函数 ``useEffect callback @ 151``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8696:9054:FUNCTION

.. rubric:: ``useCallback callback @ 202``

.. code-block:: javascript

   useCallback callback @ 202(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``202``—``211`` 行；所属函数 ``memo callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.currentTarget.setPointerCapture``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9147:9501:FUNCTION

.. rubric:: ``useCallback callback @ 213``

.. code-block:: javascript

   useCallback callback @ 213(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``213``—``223`` 行；所属函数 ``memo callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9578:9712:FUNCTION

.. rubric:: ``useCallback callback @ 225``

.. code-block:: javascript

   useCallback callback @ 225()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``225``—``228`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9649:9704:FUNCTION

.. rubric:: ``commitLayout callback @ 227``

.. code-block:: javascript

   commitLayout callback @ 227(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``227``—``227`` 行；所属函数 ``useCallback callback @ 225``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9782:10480:FUNCTION

.. rubric:: ``useMemo callback @ 230``

.. code-block:: javascript

   useMemo callback @ 230()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``230``—``252`` 行；所属函数 ``memo callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{position: "absolute", inset: 0, width: "100%", height: "100%", zIndex}``、``{position: 'fixed', inset: '8px', zIndex}``、``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 20, }``、``{ position: portalTarget ? 'absolute' : 'fixed', left: layout.x, top: layout.y, width: layout.width, height: layout.height, zIndex, }``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:12094:12128:FUNCTION

.. rubric:: ``onPointerDown callback @ 282``

.. code-block:: javascript

   onPointerDown callback @ 282(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``282``—``282`` 行；所属函数 ``memo callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:12373:12407:FUNCTION

.. rubric:: ``onPointerDown callback @ 290``

.. code-block:: javascript

   onPointerDown callback @ 290(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``memo callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:12906:12940:FUNCTION

.. rubric:: ``onPointerDown callback @ 300``

.. code-block:: javascript

   onPointerDown callback @ 300(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``300``—``300`` 行；所属函数 ``memo callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
