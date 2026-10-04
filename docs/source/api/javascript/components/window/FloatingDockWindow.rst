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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:378:450:FUNCTION

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:471:771:FUNCTION

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:793:1063:FUNCTION

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:1091:2327:FUNCTION

.. js:function:: normalizeFloating(layout, target)

   规范化与 ``Floating`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``61`` 行。

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2362:15488:FUNCTION

.. rubric:: ``memo callback @ 64``

.. code-block:: javascript

   memo callback @ 64({ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``353`` 行。

**参数**

``{ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…``
   调用方传入的 ``open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal(panel, docked && dockMount ? dockMount : portalTarget || document.body)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useCallback``、``useState``、``useRef``、``useEffect``、``Boolean``、``useMemo``、``createPortal``。

**内部回调数量**：17。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2841:2890:FUNCTION

.. rubric:: ``useCallback callback @ 82``

.. code-block:: javascript

   useCallback callback @ 82(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``memo callback @ 64``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2954:3024:FUNCTION

.. rubric:: ``useState callback @ 83``

.. code-block:: javascript

   useState callback @ 83()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``、``readLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3076:3165:FUNCTION

.. rubric:: ``useState callback @ 85``

.. code-block:: javascript

   useState callback @ 85()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3241:3283:FUNCTION

.. rubric:: ``useState callback @ 87``

.. code-block:: javascript

   useState callback @ 87()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3373:3671:FUNCTION

.. rubric:: ``useCallback callback @ 91``

.. code-block:: javascript

   useCallback callback @ 91(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``91``—``97`` 行；所属函数 ``memo callback @ 64``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3427:3655:FUNCTION

.. rubric:: ``setLayout callback @ 92``

.. code-block:: javascript

   setLayout callback @ 92(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``92``—``96`` 行；所属函数 ``useCallback callback @ 91``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizeLayout``、``updater``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3746:4192:FUNCTION

.. rubric:: ``useEffect callback @ 101``

.. code-block:: javascript

   useEffect callback @ 101()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``101``—``111`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``setDockTargetWidth``、``measure``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3899:3961:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``useEffect callback @ 101``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDockTargetWidth``、``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4152:4181:FUNCTION

.. rubric:: ``returned callback @ 110``

.. code-block:: javascript

   returned callback @ 110()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``useEffect callback @ 101``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4228:4614:FUNCTION

.. rubric:: ``useEffect callback @ 113``

.. code-block:: javascript

   useEffect callback @ 113()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``113``—``121`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', onResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4329:4473:FUNCTION

.. rubric:: ``onResize``

.. code-block:: javascript

   onResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``118`` 行；所属函数 ``useEffect callback @ 113``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMobile``、``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4435:4457:FUNCTION

.. rubric:: ``commitLayout callback @ 117``

.. code-block:: javascript

   commitLayout callback @ 117(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``onResize``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4550:4603:FUNCTION

.. rubric:: ``returned callback @ 120``

.. code-block:: javascript

   returned callback @ 120()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``useEffect callback @ 113``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4652:4903:FUNCTION

.. rubric:: ``useEffect callback @ 123``

.. code-block:: javascript

   useEffect callback @ 123()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``123``—``128`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4757:4799:FUNCTION

.. rubric:: ``anonymous callback @ 125``

.. code-block:: javascript

   anonymous callback @ 125()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``useEffect callback @ 123``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4776:4798:FUNCTION

.. rubric:: ``commitLayout callback @ 125``

.. code-block:: javascript

   commitLayout callback @ 125(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``anonymous callback @ 125``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4864:4892:FUNCTION

.. rubric:: ``returned callback @ 127``

.. code-block:: javascript

   returned callback @ 127()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``useEffect callback @ 123``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5124:6734:FUNCTION

.. rubric:: ``useEffect callback @ 133``

.. code-block:: javascript

   useEffect callback @ 133()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``133``—``166`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { dockMount.style.width = previousWidth; dockMount.style.flexBasis = previousFlexBasis; dockMount.style.transition = previousTransition; dockMount.style.pointerEvents = prev…``。

**主要协作调用**：``Math.max``、``Math.min``、``Math.round``、``clamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5669:5965:FUNCTION

.. rubric:: ``returned callback @ 145``

.. code-block:: javascript

   returned callback @ 145()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``145``—``150`` 行；所属函数 ``useEffect callback @ 133``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6447:6723:FUNCTION

.. rubric:: ``returned callback @ 160``

.. code-block:: javascript

   returned callback @ 160()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``160``—``165`` 行；所属函数 ``useEffect callback @ 133``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6809:9463:FUNCTION

.. rubric:: ``useEffect callback @ 168``

.. code-block:: javascript

   useEffect callback @ 168()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``168``—``221`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp); window.removeEventListener('pointercancel', onPointerUp); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6850:8326:FUNCTION

.. rubric:: ``onPointerMove``

.. code-block:: javascript

   onPointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``169``—``198`` 行；所属函数 ``useEffect callback @ 168``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLayout``、``dockTarget.getBoundingClientRect``、``clamp``、``Math.min``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7161:7445:FUNCTION

.. rubric:: ``setLayout callback @ 175``

.. code-block:: javascript

   setLayout callback @ 175(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``175``—``181`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7682:7941:FUNCTION

.. rubric:: ``setLayout callback @ 186``

.. code-block:: javascript

   setLayout callback @ 186(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``186``—``191`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8254:8292:FUNCTION

.. rubric:: ``setLayout callback @ 196``

.. code-block:: javascript

   setLayout callback @ 196(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8359:8995:FUNCTION

.. rubric:: ``onPointerUp``

.. code-block:: javascript

   onPointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``199``—``212`` 行；所属函数 ``useEffect callback @ 168``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8535:8979:FUNCTION

.. rubric:: ``setLayout callback @ 203``

.. code-block:: javascript

   setLayout callback @ 203(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``203``—``211`` 行；所属函数 ``onPointerUp``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``normalizeLayout``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9212:9452:FUNCTION

.. rubric:: ``returned callback @ 216``

.. code-block:: javascript

   returned callback @ 216()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``216``—``220`` 行；所属函数 ``useEffect callback @ 168``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9567:10012:FUNCTION

.. rubric:: ``useCallback callback @ 224``

.. code-block:: javascript

   useCallback callback @ 224(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``224``—``233`` 行；所属函数 ``memo callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.currentTarget.setPointerCapture``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10131:10580:FUNCTION

.. rubric:: ``useCallback callback @ 238``

.. code-block:: javascript

   useCallback callback @ 238(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``238``—``248`` 行；所属函数 ``memo callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10683:10831:FUNCTION

.. rubric:: ``useCallback callback @ 252``

.. code-block:: javascript

   useCallback callback @ 252()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``252``—``255`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10762:10819:FUNCTION

.. rubric:: ``commitLayout callback @ 254``

.. code-block:: javascript

   commitLayout callback @ 254(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``useCallback callback @ 252``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10905:11711:FUNCTION

.. rubric:: ``useMemo callback @ 257``

.. code-block:: javascript

   useMemo callback @ 257()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``257``—``280`` 行；所属函数 ``memo callback @ 64``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex }``、``{ position: 'fixed', inset: '8px', zIndex }``、``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 20, }``、``{ position: portalTarget ? 'absolute' : 'fixed', left: layout.x, top: layout.y, width: layout.width, height: layout.height, zIndex, }``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:13495:13529:FUNCTION

.. rubric:: ``onPointerDown callback @ 312``

.. code-block:: javascript

   onPointerDown callback @ 312(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``memo callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:13806:13840:FUNCTION

.. rubric:: ``onPointerDown callback @ 320``

.. code-block:: javascript

   onPointerDown callback @ 320(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``memo callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:14432:14466:FUNCTION

.. rubric:: ``onPointerDown callback @ 330``

.. code-block:: javascript

   onPointerDown callback @ 330(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``memo callback @ 64``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
