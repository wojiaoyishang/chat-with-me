src/features/chat/ui/message/components/overflowMarquee 模块
============================================================================================================================

.. js:module:: src/features/chat/ui/message/components/overflowMarquee

Animate only a visible, overflowing badge strip; dimensions are cached.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/overflowMarquee.js``
* **模块标识**：``src/features/chat/ui/message/components/overflowMarquee``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：10

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:0:2788:FUNCTION

.. js:function:: createOverflowMarquee(element, win)

   Animate only a visible, overflowing badge strip; dimensions are cached.

   **性质**：同步函数；导出 API；源码第 ``2``—``69`` 行。

   **参数**

   ``element``
      调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``win`` （默认值 ``element.ownerDocument.defaultView``）
      调用方传入的 ``win`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ setPaused(value) { paused = value; if (paused) stop(); else measure(); }, dispose() { disposed = true; stop(); intersection?.disconnect(); resize?.disconnect(); doc.removeEventL…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``intersection?.observe``、``resize?.observe``、``doc.addEventListener``、``win.addEventListener``、``measure``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:489:677:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   stop()

停止与 ``stop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``13``—``18`` 行；所属函数 ``createOverflowMarquee``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``win.cancelAnimationFrame``、``win.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:698:766:FUNCTION

.. rubric:: ``canMove``

.. code-block:: javascript

   canMove()

实现 ``canMove`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``createOverflowMarquee``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:785:970:FUNCTION

.. rubric:: ``start``

.. code-block:: javascript

   start()

启动与 ``start`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``25`` 行；所属函数 ``createOverflowMarquee``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``canMove``、``win.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:988:1519:FUNCTION

.. rubric:: ``tick``

.. code-block:: javascript

   tick(now)

实现 ``tick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``38`` 行；所属函数 ``createOverflowMarquee``。

**参数**

``now``
   调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canMove``、``Math.min``、``Math.max``、``win.setTimeout``、``start``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:1446:1482:FUNCTION

.. rubric:: ``win.setTimeout callback @ 36``

.. code-block:: javascript

   win.setTimeout callback @ 36()

实现 ``win.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``tick``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``start``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:1540:1738:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``44`` 行；所属函数 ``createOverflowMarquee``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``canMove``、``stop``、``start``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:1843:1957:FUNCTION

.. rubric:: ``anonymous callback @ 45``

.. code-block:: javascript

   anonymous callback @ 45([entry])

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``49`` 行；所属函数 ``createOverflowMarquee``。

**参数**

``[entry]``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stop``、``measure``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:2236:2286:FUNCTION

.. rubric:: ``visibility``

.. code-block:: javascript

   visibility()

实现 ``visibility`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``createOverflowMarquee``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stop``、``measure``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:2418:2499:FUNCTION

.. rubric:: ``setPaused``

.. code-block:: javascript

   setPaused(value)

设置与 ``Paused`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``createOverflowMarquee``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stop``、``measure``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/overflowMarquee.js:2500:2778:FUNCTION

.. rubric:: ``dispose``

.. code-block:: javascript

   dispose()

实现 ``dispose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``67`` 行；所属函数 ``createOverflowMarquee``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stop``、``intersection?.disconnect``、``resize?.disconnect``、``doc.removeEventListener``、``win.removeEventListener``。
