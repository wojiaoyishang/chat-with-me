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
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``./MessageIndicators.jsx``、``@/lib/clientText.js``、``react``、``@/lib/tools.jsx``、``framer-motion``、``@/lib/virtualUrl.js``、``@/components/ui/avatar``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:443:4965:FUNCTION

.. rubric:: ``memo callback @ 9``

.. code-block:: javascript

   memo callback @ 9({ msg, isLeaving, showDetails })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``109`` 行。

**参数**

``{ msg, isLeaving, showDetails }``
   调用方传入的 ``msg, isLeaving, showDetails`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60group/identity relative flex w-full min-w-0 items-center gap-2 mb-1 max-w-full transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}\x60} onMo…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``useRef``、``useIsMobile``、``useReducedMotion``、``useEffect``、``formatLocalTimestamp``、``resolveResourceUrl``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:695:1430:FUNCTION

.. rubric:: ``useEffect callback @ 15``

.. code-block:: javascript

   useEffect callback @ 15()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``15``—``29`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', wheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:811:1284:FUNCTION

.. rubric:: ``wheel``

.. code-block:: javascript

   wheel(event)

实现 ``wheel`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``26`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``Math.max``、``Math.min``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1372:1422:FUNCTION

.. rubric:: ``returned callback @ 28``

.. code-block:: javascript

   returned callback @ 28()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1460:2661:FUNCTION

.. rubric:: ``useEffect callback @ 30``

.. code-block:: javascript

   useEffect callback @ 30()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``60`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1852:2556:FUNCTION

.. rubric:: ``tick``

.. code-block:: javascript

   tick(now)

实现 ``tick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``57`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

``now``
   调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.min``、``Math.max``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:2619:2653:FUNCTION

.. rubric:: ``returned callback @ 59``

.. code-block:: javascript

   returned callback @ 59()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:3171:3233:FUNCTION

.. rubric:: ``onMouseEnter callback @ 68``

.. code-block:: javascript

   onMouseEnter callback @ 68()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``68``—``70`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:3262:3325:FUNCTION

.. rubric:: ``onMouseLeave callback @ 71``

.. code-block:: javascript

   onMouseLeave callback @ 71()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``71``—``73`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:4033:4103:FUNCTION

.. rubric:: ``onFocus callback @ 88``

.. code-block:: javascript

   onFocus callback @ 88()

处理 ``Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``88``—``90`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:4130:4201:FUNCTION

.. rubric:: ``onBlur callback @ 91``

.. code-block:: javascript

   onBlur callback @ 91()

处理 ``Blur`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``91``—``93`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
