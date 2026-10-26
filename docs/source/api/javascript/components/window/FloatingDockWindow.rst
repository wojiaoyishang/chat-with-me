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

``react``、``react-dom``、``lucide-react``、``@/lib/browserHistoryLayers.js``、``@/lib/windowLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:523:595:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``14`` 行。

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:616:916:FUNCTION

.. js:function:: readLayout(storageKey)

   实现 ``readLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``25`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{}``、``parsed && typeof parsed === 'object' ? parsed : {}``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.getItem``、``JSON.parse``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:938:1208:FUNCTION

.. js:function:: writeLayout(storageKey, value)

   实现 ``writeLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``27``—``34`` 行。

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

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:1236:2472:FUNCTION

.. js:function:: normalizeFloating(layout, target)

   规范化与 ``Floating`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``63`` 行。

   **参数**

   ``layout`` （默认值 ``{}``）
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target`` （默认值 ``null``）
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x: 120, y: 80, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, docked: false }``、``{ x: clamp(Number.isFinite(Number(layout.x)) ? Number(layout.x) : fallbackX, EDGE, bounds.width - width - EDGE), y: clamp(Number.isFinite(Number(layout.y)) ? Number(layout.y) : fa…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``target?.getBoundingClientRect``、``Math.max``、``clamp``、``Number``、``Math.min``、``Math.round``、``Number.isFinite``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:2507:16780:FUNCTION

.. rubric:: ``memo callback @ 66``

.. code-block:: javascript

   memo callback @ 66({ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``376`` 行。

**参数**

``{ open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…``
   调用方传入的 ``open = false, title, description, children, footer = null, headerActions = null, onClose, dockTar…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal(<WindowLayerContext.Provider value={layer}>{panel}</WindowLayerContext.Provider>, docked && dockMount ? dockMount : portalTarget || document.body)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useCallback``、``useState``、``useRef``、``useBrowserBackLayer``、``useEffect``、``Boolean``、``useMemo``、``useWindowLayer``、``createPortal``。

**内部回调数量**：18。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3012:3061:FUNCTION

.. rubric:: ``useCallback callback @ 85``

.. code-block:: javascript

   useCallback callback @ 85(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``memo callback @ 66``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeFloating``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3125:3195:FUNCTION

.. rubric:: ``useState callback @ 86``

.. code-block:: javascript

   useState callback @ 86()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``、``readLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3247:3336:FUNCTION

.. rubric:: ``useState callback @ 88``

.. code-block:: javascript

   useState callback @ 88()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3412:3454:FUNCTION

.. rubric:: ``useState callback @ 90``

.. code-block:: javascript

   useState callback @ 90()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3641:3733:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 95``

.. code-block:: javascript

   useBrowserBackLayer callback @ 95()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``95``—``98`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3830:4128:FUNCTION

.. rubric:: ``useCallback callback @ 103``

.. code-block:: javascript

   useCallback callback @ 103(updater)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``109`` 行；所属函数 ``memo callback @ 66``。

**参数**

``updater``
   调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:3884:4112:FUNCTION

.. rubric:: ``setLayout callback @ 104``

.. code-block:: javascript

   setLayout callback @ 104(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``104``—``108`` 行；所属函数 ``useCallback callback @ 103``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizeLayout``、``updater``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4203:4649:FUNCTION

.. rubric:: ``useEffect callback @ 113``

.. code-block:: javascript

   useEffect callback @ 113()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``113``—``123`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``setDockTargetWidth``、``measure``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4356:4418:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``useEffect callback @ 113``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDockTargetWidth``、``Number``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4609:4638:FUNCTION

.. rubric:: ``returned callback @ 122``

.. code-block:: javascript

   returned callback @ 122()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``useEffect callback @ 113``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4685:5071:FUNCTION

.. rubric:: ``useEffect callback @ 125``

.. code-block:: javascript

   useEffect callback @ 125()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``125``—``133`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('resize', onResize)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4786:4930:FUNCTION

.. rubric:: ``onResize``

.. code-block:: javascript

   onResize()

处理 ``Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``127``—``130`` 行；所属函数 ``useEffect callback @ 125``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMobile``、``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:4892:4914:FUNCTION

.. rubric:: ``commitLayout callback @ 129``

.. code-block:: javascript

   commitLayout callback @ 129(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``onResize``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5007:5060:FUNCTION

.. rubric:: ``returned callback @ 132``

.. code-block:: javascript

   returned callback @ 132()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``useEffect callback @ 125``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5109:5360:FUNCTION

.. rubric:: ``useEffect callback @ 135``

.. code-block:: javascript

   useEffect callback @ 135()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``135``—``140`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5214:5256:FUNCTION

.. rubric:: ``anonymous callback @ 137``

.. code-block:: javascript

   anonymous callback @ 137()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``useEffect callback @ 135``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5233:5255:FUNCTION

.. rubric:: ``commitLayout callback @ 137``

.. code-block:: javascript

   commitLayout callback @ 137(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``anonymous callback @ 137``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5321:5349:FUNCTION

.. rubric:: ``returned callback @ 139``

.. code-block:: javascript

   returned callback @ 139()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``useEffect callback @ 135``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:5581:7191:FUNCTION

.. rubric:: ``useEffect callback @ 145``

.. code-block:: javascript

   useEffect callback @ 145()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``145``—``178`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { dockMount.style.width = previousWidth; dockMount.style.flexBasis = previousFlexBasis; dockMount.style.transition = previousTransition; dockMount.style.pointerEvents = prev…``。

**主要协作调用**：``Math.max``、``Math.min``、``Math.round``、``clamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6126:6422:FUNCTION

.. rubric:: ``returned callback @ 157``

.. code-block:: javascript

   returned callback @ 157()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``162`` 行；所属函数 ``useEffect callback @ 145``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:6904:7180:FUNCTION

.. rubric:: ``returned callback @ 172``

.. code-block:: javascript

   returned callback @ 172()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``172``—``177`` 行；所属函数 ``useEffect callback @ 145``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7266:9920:FUNCTION

.. rubric:: ``useEffect callback @ 180``

.. code-block:: javascript

   useEffect callback @ 180()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``233`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp); window.removeEventListener('pointercancel', onPointerUp); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7307:8783:FUNCTION

.. rubric:: ``onPointerMove``

.. code-block:: javascript

   onPointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``181``—``210`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLayout``、``dockTarget.getBoundingClientRect``、``clamp``、``Math.min``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:7618:7902:FUNCTION

.. rubric:: ``setLayout callback @ 187``

.. code-block:: javascript

   setLayout callback @ 187(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``187``—``193`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8139:8398:FUNCTION

.. rubric:: ``setLayout callback @ 198``

.. code-block:: javascript

   setLayout callback @ 198(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``198``—``203`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8711:8749:FUNCTION

.. rubric:: ``setLayout callback @ 208``

.. code-block:: javascript

   setLayout callback @ 208(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``208``—``208`` 行；所属函数 ``onPointerMove``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8816:9452:FUNCTION

.. rubric:: ``onPointerUp``

.. code-block:: javascript

   onPointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``211``—``224`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:8992:9436:FUNCTION

.. rubric:: ``setLayout callback @ 215``

.. code-block:: javascript

   setLayout callback @ 215(previous)

设置与 ``Layout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``215``—``223`` 行；所属函数 ``onPointerUp``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``normalizeLayout``、``writeLayout``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:9669:9909:FUNCTION

.. rubric:: ``returned callback @ 228``

.. code-block:: javascript

   returned callback @ 228()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``232`` 行；所属函数 ``useEffect callback @ 180``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10024:10469:FUNCTION

.. rubric:: ``useCallback callback @ 236``

.. code-block:: javascript

   useCallback callback @ 236(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``236``—``245`` 行；所属函数 ``memo callback @ 66``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.currentTarget.setPointerCapture``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:10588:11037:FUNCTION

.. rubric:: ``useCallback callback @ 250``

.. code-block:: javascript

   useCallback callback @ 250(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``250``—``260`` 行；所属函数 ``memo callback @ 66``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11140:11288:FUNCTION

.. rubric:: ``useCallback callback @ 264``

.. code-block:: javascript

   useCallback callback @ 264()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``264``—``267`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``commitLayout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11219:11276:FUNCTION

.. rubric:: ``commitLayout callback @ 266``

.. code-block:: javascript

   commitLayout callback @ 266(previous)

实现 ``commitLayout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``266``—``266`` 行；所属函数 ``useCallback callback @ 264``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:11362:12287:FUNCTION

.. rubric:: ``useMemo callback @ 269``

.. code-block:: javascript

   useMemo callback @ 269()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``293`` 行；所属函数 ``memo callback @ 66``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex }``、``{ position: 'fixed', inset: 0, width: '100%', height: '100dvh', zIndex }``、``{ position: 'fixed', inset: '8px', zIndex }``、``{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 20, }``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:14496:14530:FUNCTION

.. rubric:: ``onPointerDown callback @ 328``

.. code-block:: javascript

   onPointerDown callback @ 328(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``328``—``328`` 行；所属函数 ``memo callback @ 66``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:14807:14841:FUNCTION

.. rubric:: ``onPointerDown callback @ 336``

.. code-block:: javascript

   onPointerDown callback @ 336(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``336``—``336`` 行；所属函数 ``memo callback @ 66``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/window/FloatingDockWindow.jsx:15433:15467:FUNCTION

.. rubric:: ``onPointerDown callback @ 346``

.. code-block:: javascript

   onPointerDown callback @ 346(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``346``—``346`` 行；所属函数 ``memo callback @ 66``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
