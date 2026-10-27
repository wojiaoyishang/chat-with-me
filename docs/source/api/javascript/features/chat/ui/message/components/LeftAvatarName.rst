src/features/chat/ui/message/components/LeftAvatarName 模块
==========================================================================================================================

.. js:module:: src/features/chat/ui/message/components/LeftAvatarName

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/LeftAvatarName.jsx``
* **模块标识**：``src/features/chat/ui/message/components/LeftAvatarName``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``./MessageIndicators.jsx``、``./overflowMarquee.js``、``@/lib/clientText.js``、``react``、``@/lib/tools.jsx``、``framer-motion``、``@/lib/virtualUrl.js``、``@/components/ui/avatar``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:497:4115:FUNCTION

.. rubric:: ``memo callback @ 10``

.. code-block:: javascript

   memo callback @ 10({ msg, isLeaving, showDetails })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``85`` 行。

**参数**

``{ msg, isLeaving, showDetails }``
   调用方传入的 ``msg, isLeaving, showDetails`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60group/identity relative flex w-full min-w-0 items-center gap-2 mb-1 max-w-full transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}\x60} onMo…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``useRef``、``useIsMobile``、``useReducedMotion``、``useEffect``、``formatLocalTimestamp``、``resolveResourceUrl``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:743:1464:FUNCTION

.. rubric:: ``useEffect callback @ 16``

.. code-block:: javascript

   useEffect callback @ 16()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``30`` 行；所属函数 ``memo callback @ 10``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', wheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:856:1321:FUNCTION

.. rubric:: ``wheel``

.. code-block:: javascript

   wheel(event)

实现 ``wheel`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``27`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``Math.max``、``Math.min``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1407:1457:FUNCTION

.. rubric:: ``returned callback @ 29``

.. code-block:: javascript

   returned callback @ 29()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1493:1786:FUNCTION

.. rubric:: ``useEffect callback @ 31``

.. code-block:: javascript

   useEffect callback @ 31()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``37`` 行；所属函数 ``memo callback @ 10``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { controller.dispose(); marquee.current = null; }``。

**主要协作调用**：``createOverflowMarquee``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1723:1779:FUNCTION

.. rubric:: ``returned callback @ 36``

.. code-block:: javascript

   returned callback @ 36()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.dispose``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:2275:2346:FUNCTION

.. rubric:: ``onMouseEnter callback @ 45``

.. code-block:: javascript

   onMouseEnter callback @ 45()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``45``—``47`` 行；所属函数 ``memo callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``marquee.current?.setPaused``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:2374:2492:FUNCTION

.. rubric:: ``onMouseLeave callback @ 48``

.. code-block:: javascript

   onMouseLeave callback @ 48()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``48``—``50`` 行；所属函数 ``memo callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``marquee.current?.setPaused``、``Boolean``、``viewport.current?.matches``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:3185:3264:FUNCTION

.. rubric:: ``onFocus callback @ 65``

.. code-block:: javascript

   onFocus callback @ 65()

处理 ``Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``65``—``67`` 行；所属函数 ``memo callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``marquee.current?.setPaused``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:3290:3419:FUNCTION

.. rubric:: ``onBlur callback @ 68``

.. code-block:: javascript

   onBlur callback @ 68(event)

处理 ``Blur`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``68``—``70`` 行；所属函数 ``memo callback @ 10``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``marquee.current?.setPaused``、``event.currentTarget.contains``。
