src/features/chat/page/components/RightSidebar 模块
==========================================================================================================

.. js:module:: src/features/chat/page/components/RightSidebar

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/RightSidebar.jsx``
* **模块标识**：``src/features/chat/page/components/RightSidebar``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：21

主要依赖
--------------------------------------------------------------------------------

``react``、``framer-motion``、``lucide-react``、``@/components/setting/DynamicSettings.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:474:886:FUNCTION

.. js:function:: loadStoredDesktopWidth()

   加载与 ``Stored Desktop Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``23`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``DEFAULT_DESKTOP_WIDTH``、``Number.isFinite(storedValue) && storedValue >= MIN_DESKTOP_WIDTH ? storedValue : DEFAULT_DESKTOP_WIDTH``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``Number``、``window.localStorage.getItem``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:886:1159:FUNCTION

.. js:function:: storeDesktopWidth(width)

   实现 ``storeDesktopWidth`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``31`` 行。

   **参数**

   ``width``
      调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.setItem``、``String``、``Math.round``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:1187:12175:FUNCTION

.. rubric:: ``memo callback @ 33``

.. code-block:: javascript

   memo callback @ 33({ isOpen, onClose, advancedSettings, initialSettingValues, settingsInstanceKey, conversationId, onS…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``290`` 行。

**参数**

``{ isOpen, onClose, advancedSettings, initialSettingValues, settingsInstanceKey, conversationId, onS…``
   调用方传入的 ``isOpen, onClose, advancedSettings, initialSettingValues, settingsInstanceKey, conversationId, onS…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Motion.div ref={sidebarRef} initial={{width: 0}} animate={{width: isOpen ? desktopWidth : 0}} transition={{duration: isResizing ? 0 : 0.3, ease: 'easeInOut'}} className="relati…``、``( <> {isOpen && ( <Motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.2}} className={isWindowMode ? 'absolute inset-0 bg-black/2…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useState``、``useRef``、``useMemo``、``useLayoutEffect``、``useCallback``、``useEffect``、``getMaxDesktopWidth``、``Math.round``、``t``、``sidebarContent``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:2064:2323:FUNCTION

.. rubric:: ``useMemo callback @ 52``

.. code-block:: javascript

   useMemo callback @ 52()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``58`` 行；所属函数 ``memo callback @ 33``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${settingsInstanceKey ?? 'conversationless'}:${names}\x60``。

**主要协作调用**：``Array.isArray``、``advancedSettings.map((item) => item?.name || item?.text || item?.type || '').join``、``advancedSettings.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:2161:2215:FUNCTION

.. rubric:: ``advancedSettings.map callback @ 54``

.. code-block:: javascript

   advancedSettings.map callback @ 54(item)

作为 ``advancedSettings.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``useMemo callback @ 52``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:2388:2876:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 60``

.. code-block:: javascript

   useLayoutEffect callback @ 60()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``60``—``74`` 行；所属函数 ``memo callback @ 33``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setLockedMode``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:2749:2807:FUNCTION

.. rubric:: ``setTimeout callback @ 69``

.. code-block:: javascript

   setTimeout callback @ 69()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``69``—``71`` 行；所属函数 ``useLayoutEffect callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLockedMode``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:2833:2859:FUNCTION

.. rubric:: ``returned callback @ 72``

.. code-block:: javascript

   returned callback @ 72()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``useLayoutEffect callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:2959:3354:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``85`` 行；所属函数 ``memo callback @ 33``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Math.max( MIN_DESKTOP_WIDTH, Math.min(MAX_DESKTOP_WIDTH, containerWidth - MIN_CHAT_CONTENT_WIDTH) )``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:3416:3509:FUNCTION

.. rubric:: ``useCallback callback @ 87``

.. code-block:: javascript

   useCallback callback @ 87(width)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``89`` 行；所属函数 ``memo callback @ 33``。

**参数**

``width``
   调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.min``、``getMaxDesktopWidth``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:3555:4180:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 91``

.. code-block:: javascript

   useLayoutEffect callback @ 91()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``91``—``110`` 行；所属函数 ``memo callback @ 33``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { resizeObserver?.disconnect(); window.removeEventListener('resize', syncWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``syncWidth``、``resizeObserver?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:3671:3769:FUNCTION

.. rubric:: ``syncWidth``

.. code-block:: javascript

   syncWidth()

实现 ``syncWidth`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``95``—``97`` 行；所属函数 ``useLayoutEffect callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDesktopWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:3708:3757:FUNCTION

.. rubric:: ``setDesktopWidth callback @ 96``

.. code-block:: javascript

   setDesktopWidth callback @ 96(currentWidth)

设置与 ``Desktop Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``syncWidth``。

**参数**

``currentWidth``
   调用方传入的 ``currentWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clampDesktopWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:4052:4173:FUNCTION

.. rubric:: ``returned callback @ 106``

.. code-block:: javascript

   returned callback @ 106()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``106``—``109`` 行；所属函数 ``useLayoutEffect callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resizeObserver?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:4279:4618:FUNCTION

.. rubric:: ``useCallback callback @ 112``

.. code-block:: javascript

   useCallback callback @ 112(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``122`` 行；所属函数 ``memo callback @ 33``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``setIsResizing``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:4702:5176:FUNCTION

.. rubric:: ``useCallback callback @ 124``

.. code-block:: javascript

   useCallback callback @ 124(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``135`` 行；所属函数 ``memo callback @ 33``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['ArrowLeft', 'ArrowRight'].includes``、``event.preventDefault``、``setDesktopWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:4985:5168:FUNCTION

.. rubric:: ``setDesktopWidth callback @ 130``

.. code-block:: javascript

   setDesktopWidth callback @ 130(currentWidth)

设置与 ``Desktop Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``130``—``134`` 行；所属函数 ``useCallback callback @ 124``。

**参数**

``currentWidth``
   调用方传入的 ``currentWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextWidth``。

**主要协作调用**：``clampDesktopWidth``、``storeDesktopWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:5235:6748:FUNCTION

.. rubric:: ``useEffect callback @ 137``

.. code-block:: javascript

   useEffect callback @ 137()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``137``—``174`` 行；所属函数 ``memo callback @ 33``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointermove', handlePointerMove); window.removeEventListener('pointerup', stopResizing); window.removeEventListener('pointercancel', stopResizi…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:5547:5815:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``145``—``151`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDesktopWidth``、``clampDesktopWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:5846:6152:FUNCTION

.. rubric:: ``stopResizing``

.. code-block:: javascript

   stopResizing()

停止与 ``Resizing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``153``—``161`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsResizing``、``setDesktopWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:5960:6140:FUNCTION

.. rubric:: ``setDesktopWidth callback @ 156``

.. code-block:: javascript

   setDesktopWidth callback @ 156(currentWidth)

设置与 ``Desktop Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``156``—``160`` 行；所属函数 ``stopResizing``。

**参数**

``currentWidth``
   调用方传入的 ``currentWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextWidth``。

**主要协作调用**：``clampDesktopWidth``、``storeDesktopWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:6389:6741:FUNCTION

.. rubric:: ``returned callback @ 167``

.. code-block:: javascript

   returned callback @ 167()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``167``—``173`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RightSidebar.jsx:6824:7790:FUNCTION

.. rubric:: ``useCallback callback @ 176``

.. code-block:: javascript

   useCallback callback @ 176()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``198`` 行；所属函数 ``memo callback @ 33``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``children``、``( <div className="min-w-0 pb-4"> {hasDynamicSettings ? ( <div className="min-w-0"> <DynamicSettings key={dynamicSettingsKey} config={advancedSettings} initialValues={initialSettin…``。

**主要协作调用**：``Array.isArray``、``t``。
