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
* **局部函数与匿名回调**：32

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:1085:1970:FUNCTION

.. js:function:: normalizeFloating(layout)

   规范化与 ``Floating`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``49`` 行。

   **参数**

   ``layout``（默认值 ``{}``）
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{x: 120, y: 80, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, docked: false}``、``{ x: clamp(Number.isFinite(Number(layout.x)) ? Number(layout.x) : fallbackX, EDGE, window.innerWidth - width - EDGE), y: clamp(Number.isFinite(Number(layout.y)) ? Number(layout.y)…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``clamp``、``Number``、``Math.max``、``Math.round``、``Number.isFinite``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2005:12649:FUNCTION

.. rubric:: ``memo callback @ 51``

.. code-block:: javascript

   memo callback @ 51({ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``308`` 行。

**参数**

``{ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…``
   调用方传入的 ``open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal(panel, docked && dockMount ? dockMount : document.body)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``、``Boolean``、``useMemo``、``createPortal``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2283:2330:FUNCTION

.. rubric:: ``useState callback @ 64``

.. code-block:: javascript

   useState callback @ 64()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``、``readLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2378:2454:FUNCTION

.. rubric:: ``useState callback @ 65``

.. code-block:: javascript

   useState callback @ 65()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2516:2558:FUNCTION

.. rubric:: ``useState callback @ 66``

.. code-block:: javascript

   useState callback @ 66()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2640:2879:FUNCTION

.. rubric:: ``useCallback callback @ 69``

.. code-block:: javascript

   useCallback callback @ 69(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``69``—``75`` 行；所属函数 ``memo callback @ 51``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2673:2871:FUNCTION

.. rubric:: ``setLayout callback @ 70``

.. code-block:: javascript

   setLayout callback @ 70(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``70``—``74`` 行；所属函数 ``useCallback callback @ 69``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizeFloating``、``updater``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2911:3317:FUNCTION

.. rubric:: ``useEffect callback @ 77``

.. code-block:: javascript

   useEffect callback @ 77()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``87`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``setDockTargetWidth``、``measure``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3044:3106:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``useEffect callback @ 77``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDockTargetWidth``、``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3281:3310:FUNCTION

.. rubric:: ``returned callback @ 86``

.. code-block:: javascript

   returned callback @ 86()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``useEffect callback @ 77``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3349:3703:FUNCTION

.. rubric:: ``useEffect callback @ 89``

.. code-block:: javascript

   useEffect callback @ 89()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``97`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', onResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3442:3574:FUNCTION

.. rubric:: ``onResize``

.. code-block:: javascript

   onResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``91``—``94`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMobile``、``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3540:3562:FUNCTION

.. rubric:: ``commitLayout callback @ 93``

.. code-block:: javascript

   commitLayout callback @ 93(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``onResize``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3643:3696:FUNCTION

.. rubric:: ``returned callback @ 96``

.. code-block:: javascript

   returned callback @ 96()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3885:5379:FUNCTION

.. rubric:: ``useEffect callback @ 102``

.. code-block:: javascript

   useEffect callback @ 102()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``102``—``135`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { dockMount.style.width = previousWidth; dockMount.style.flexBasis = previousFlexBasis; dockMount.style.transition = previousTransition; dockMount.style.pointerEvents = prev…``。

**主要协作调用**：``Math.max``、``Math.min``、``Math.round``、``clamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4390:4666:FUNCTION

.. rubric:: ``returned callback @ 114``

.. code-block:: javascript

   returned callback @ 114()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``114``—``119`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5116:5372:FUNCTION

.. rubric:: ``returned callback @ 129``

.. code-block:: javascript

   returned callback @ 129()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``134`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5450:7782:FUNCTION

.. rubric:: ``useEffect callback @ 137``

.. code-block:: javascript

   useEffect callback @ 137()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``137``—``186`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp); window.removeEventListener('pointercancel', onPointerUp); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5487:6737:FUNCTION

.. rubric:: ``onPointerMove``

.. code-block:: javascript

   onPointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``138``—``163`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLayout``、``dockTarget.getBoundingClientRect``、``clamp``、``Math.min``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5774:5996:FUNCTION

.. rubric:: ``setLayout callback @ 144``

.. code-block:: javascript

   setLayout callback @ 144(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``144``—``149`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6195:6400:FUNCTION

.. rubric:: ``setLayout callback @ 153``

.. code-block:: javascript

   setLayout callback @ 153(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``153``—``157`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6675:6711:FUNCTION

.. rubric:: ``setLayout callback @ 161``

.. code-block:: javascript

   setLayout callback @ 161(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6766:7350:FUNCTION

.. rubric:: ``onPointerUp``

.. code-block:: javascript

   onPointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``164``—``177`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6926:7338:FUNCTION

.. rubric:: ``setLayout callback @ 168``

.. code-block:: javascript

   setLayout callback @ 168(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``168``—``176`` 行；所属函数 ``onPointerUp``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``normalizeFloating``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7551:7775:FUNCTION

.. rubric:: ``returned callback @ 181``

.. code-block:: javascript

   returned callback @ 181()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``185`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7865:8191:FUNCTION

.. rubric:: ``useCallback callback @ 188``

.. code-block:: javascript

   useCallback callback @ 188(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``188``—``197`` 行；所属函数 ``memo callback @ 51``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.currentTarget.setPointerCapture``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8259:8601:FUNCTION

.. rubric:: ``useCallback callback @ 199``

.. code-block:: javascript

   useCallback callback @ 199(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``209`` 行；所属函数 ``memo callback @ 51``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8668:8802:FUNCTION

.. rubric:: ``useCallback callback @ 211``

.. code-block:: javascript

   useCallback callback @ 211()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``211``—``214`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8739:8794:FUNCTION

.. rubric:: ``commitLayout callback @ 213``

.. code-block:: javascript

   commitLayout callback @ 213(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``useCallback callback @ 211``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8872:9430:FUNCTION

.. rubric:: ``useMemo callback @ 216``

.. code-block:: javascript

   useMemo callback @ 216()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``216``—``237`` 行；所属函数 ``memo callback @ 51``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{position: 'fixed', inset: '8px', zIndex: 2147483200}``、``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 20, }``、``{ position: 'fixed', left: layout.x, top: layout.y, width: layout.width, height: layout.height, zIndex: 2147483200, }``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10942:10976:FUNCTION

.. rubric:: ``onPointerDown callback @ 267``

.. code-block:: javascript

   onPointerDown callback @ 267(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``memo callback @ 51``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11221:11255:FUNCTION

.. rubric:: ``onPointerDown callback @ 275``

.. code-block:: javascript

   onPointerDown callback @ 275(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``275``—``275`` 行；所属函数 ``memo callback @ 51``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11754:11788:FUNCTION

.. rubric:: ``onPointerDown callback @ 285``

.. code-block:: javascript

   onPointerDown callback @ 285(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``285``—``285`` 行；所属函数 ``memo callback @ 51``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
