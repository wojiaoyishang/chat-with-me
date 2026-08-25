src/features/chat/ui/chatbox/components/MessageInput 模块
======================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/MessageInput

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/MessageInput.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/MessageInput``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：22

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/ui/ThreeDotLoading.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:312:409:FUNCTION

.. js:function:: easeInOutCubic(t)

   实现 ``easeInOutCubic`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``13`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2``。

   **主要协作调用**：``Math.pow``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:439:598:FUNCTION

.. js:function:: getMotionPreference()

   读取与 ``Motion Preference`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``18`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``window.matchMedia('(prefers-reduced-motion: reduce)').matches``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.matchMedia``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:627:11082:FUNCTION

.. rubric:: ``memo callback @ 20``

.. code-block:: javascript

   memo callback @ 20({ value, onChange, onPaste, onKeyDown, onInputActivity, onFocus, onBlur, isReadOnly, placeholder, t…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``295`` 行。

**参数**

``{ value, onChange, onPaste, onKeyDown, onInputActivity, onFocus, onBlur, isReadOnly, placeholder, t…``
   调用方传入的 ``value, onChange, onPaste, onKeyDown, onInputActivity, onFocus, onBlur, isReadOnly, placeholder, t…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60flex min-h-[48px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 px-4 py-3\x60} role="status" aria-live="polite" aria-label={voiceRecogni…``、``( <div className={\x60flex min-h-[48px] w-full items-center overflow-hidden rounded-xl bg-gray-50 px-4 py-3\x60} role="status" aria-live="polite" aria-label={voiceRecordingLabel} > <div…``、``( <textarea ref={textareaRef} value={value} onChange={handleChange} onPaste={handlePaste} onKeyDown={onKeyDown} onBeforeInput={handleInputActivity} onCompositionStart={handleInput…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useCallback``、``useEffect``、``useLayoutEffect``、``Array.from``、``bars.map``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:1758:1929:FUNCTION

.. rubric:: ``useCallback callback @ 44``

.. code-block:: javascript

   useCallback callback @ 44()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``49`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:1979:2625:FUNCTION

.. rubric:: ``useCallback callback @ 51``

.. code-block:: javascript

   useCallback callback @ 51()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``51``—``71`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``textarea.cloneNode``、``Object.assign``、``document.body.appendChild``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:2689:2895:FUNCTION

.. rubric:: ``useCallback callback @ 73``

.. code-block:: javascript

   useCallback callback @ 73()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``79`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelHeightAnimation``、``document.body.removeChild``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:2973:4165:FUNCTION

.. rubric:: ``useCallback callback @ 81``

.. code-block:: javascript

   useCallback callback @ 81()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``81``—``106`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{contentHeight, targetHeight}``。

**主要协作调用**：``getComputedStyle``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:4223:4575:FUNCTION

.. rubric:: ``useCallback callback @ 108``

.. code-block:: javascript

   useCallback callback @ 108(textarea, contentHeight, targetHeight)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``115`` 行；所属函数 ``memo callback @ 20``。

**参数**

``textarea``
   调用方传入的 ``textarea`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``contentHeight``
   调用方传入的 ``contentHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetHeight``
   调用方传入的 ``targetHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:4628:6420:FUNCTION

.. rubric:: ``useCallback callback @ 117``

.. code-block:: javascript

   useCallback callback @ 117(options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``117``—``170`` 行；所属函数 ``memo callback @ 20``。

**参数**

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``initTextareaClone``、``getTextareaHeightMetrics``、``textarea.getBoundingClientRect``、``getMotionPreference``、``Math.abs``、``cancelHeightAnimation``、``settleTextarea``、``performance.now``、``Math.min``、``Math.max``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:5768:6305:FUNCTION

.. rubric:: ``tick``

.. code-block:: javascript

   tick(now)

实现 ``tick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``152``—``166`` 行；所属函数 ``useCallback callback @ 117``。

**参数**

``now``
   调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.min``、``easeInOutCubic``、``requestAnimationFrame``、``settleTextarea``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:6537:6616:FUNCTION

.. rubric:: ``useEffect callback @ 172``

.. code-block:: javascript

   useEffect callback @ 172()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``172``—``175`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``cleanupTextareaClone``。

**主要协作调用**：``initTextareaClone``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:6683:6815:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 177``

.. code-block:: javascript

   useLayoutEffect callback @ 177()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``177``—``181`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``adjustTextareaHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:6917:7616:FUNCTION

.. rubric:: ``useEffect callback @ 183``

.. code-block:: javascript

   useEffect callback @ 183()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``183``—``199`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:7230:7527:FUNCTION

.. rubric:: ``anonymous callback @ 190``

.. code-block:: javascript

   anonymous callback @ 190(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``195`` 行；所属函数 ``useEffect callback @ 183``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``adjustTextareaHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:7581:7609:FUNCTION

.. rubric:: ``returned callback @ 198``

.. code-block:: javascript

   returned callback @ 198()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``198``—``198`` 行；所属函数 ``useEffect callback @ 183``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:7732:7809:FUNCTION

.. rubric:: ``useCallback callback @ 201``

.. code-block:: javascript

   useCallback callback @ 201(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``201``—``204`` 行；所属函数 ``memo callback @ 20``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onInputActivity``、``onChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:7886:7928:FUNCTION

.. rubric:: ``useCallback callback @ 206``

.. code-block:: javascript

   useCallback callback @ 206()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``206``—``208`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onInputActivity``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:7987:8060:FUNCTION

.. rubric:: ``useCallback callback @ 210``

.. code-block:: javascript

   useCallback callback @ 210(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``210``—``213`` 行；所属函数 ``memo callback @ 20``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onInputActivity``、``onFocus``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:8127:8170:FUNCTION

.. rubric:: ``useCallback callback @ 215``

.. code-block:: javascript

   useCallback callback @ 215(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``217`` 行；所属函数 ``memo callback @ 20``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onBlur``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:8220:8367:FUNCTION

.. rubric:: ``useCallback callback @ 219``

.. code-block:: javascript

   useCallback callback @ 219(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``219``—``225`` 行；所属函数 ``memo callback @ 20``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPaste``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:8321:8349:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 223``

.. code-block:: javascript

   requestAnimationFrame callback @ 223()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``223``—``223`` 行；所属函数 ``useCallback callback @ 219``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``adjustTextareaHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:9207:9215:FUNCTION

.. rubric:: ``Array.from callback @ 246``

.. code-block:: javascript

   Array.from callback @ 246()

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``246``—``246`` 行；所属函数 ``memo callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:9620:10323:FUNCTION

.. rubric:: ``bars.map callback @ 256``

.. code-block:: javascript

   bars.map callback @ 256(level, index)

作为 ``bars.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``256``—``271`` 行；所属函数 ``memo callback @ 20``。

**参数**

``level``
   调用方传入的 ``level`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <span key={index} className="block flex-1 rounded-full bg-gray-700" style={{ height: \x60${height}px\x60, opacity, }} /> )``。

**主要协作调用**：``Math.max``、``Math.min``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/MessageInput.jsx:11083:12130:FUNCTION

.. rubric:: ``memo callback @ 295``

.. code-block:: javascript

   memo callback @ 295(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``295``—``314`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.value === nextProps.value && prevProps.isReadOnly === nextProps.isReadOnly && prevProps.placeholder === nextProps.placeholder && prevProps.isEditMessage === nextProps.…``。
