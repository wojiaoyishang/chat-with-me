src/features/avatar-scene/useImmersiveComposer 模块
==========================================================================================================

.. js:module:: src/features/avatar-scene/useImmersiveComposer

Reveals the existing composer without unmounting its editor or draft.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/avatar-scene/useImmersiveComposer.js``
* **模块标识**：``src/features/avatar-scene/useImmersiveComposer``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:121:2423:FUNCTION

.. js:function:: useImmersiveComposer({ enabled, hostRef })

   Reveals the existing composer without unmounting its editor or draft.

   **性质**：同步函数；导出 API；源码第 ``6``—``64`` 行。

   **参数**

   ``{ enabled, hostRef }``
      调用方传入的 ``enabled, hostRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ composerRef, visible, show, onFocusCapture: () => { focusedRef.current = true; show(); }, onBlurCapture: (event) => { if (event.currentTarget.contains(event.relatedTarget)) retu…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useRef``、``useState``、``useCallback``、``useEffect``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:461:575:FUNCTION

.. rubric:: ``useCallback callback @ 11``

.. code-block:: javascript

   useCallback callback @ 11()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``11``—``15`` 行；所属函数 ``useImmersiveComposer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``setVisible``。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:596:2057:FUNCTION

.. rubric:: ``useEffect callback @ 16``

.. code-block:: javascript

   useEffect callback @ 16()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``50`` 行；所属函数 ``useImmersiveComposer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { document.removeEventListener('pointermove', onPointerMove); clearTimeout(hideTimer.current); hideTimer.current = null; }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setVisible``、``document.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:735:977:FUNCTION

.. rubric:: ``scheduleHide``

.. code-block:: javascript

   scheduleHide()

实现 ``scheduleHide`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``26`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:852:950:FUNCTION

.. rubric:: ``setTimeout callback @ 22``

.. code-block:: javascript

   setTimeout callback @ 22()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``22``—``25`` 行；所属函数 ``scheduleHide``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVisible``。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:1008:1796:FUNCTION

.. rubric:: ``onPointerMove``

.. code-block:: javascript

   onPointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``27``—``43`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.target?.closest``、``scheduleHide``、``hostRef.current?.getBoundingClientRect``、``composerRef.current?.contains``、``show``。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:1877:2050:FUNCTION

.. rubric:: ``returned callback @ 45``

.. code-block:: javascript

   returned callback @ 45()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``49`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``、``clearTimeout``。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:2174:2251:FUNCTION

.. rubric:: ``onFocusCapture``

.. code-block:: javascript

   onFocusCapture()

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``58`` 行；所属函数 ``useImmersiveComposer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``show``。

.. CWM-AST-FUNCTION src/features/avatar-scene/useImmersiveComposer.js:2275:2413:FUNCTION

.. rubric:: ``onBlurCapture``

.. code-block:: javascript

   onBlurCapture(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``62`` 行；所属函数 ``useImmersiveComposer``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.currentTarget.contains``。
