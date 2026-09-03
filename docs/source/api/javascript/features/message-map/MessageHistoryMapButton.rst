src/features/message-map/MessageHistoryMapButton 模块
==============================================================================================================

.. js:module:: src/features/message-map/MessageHistoryMapButton

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/message-map/MessageHistoryMapButton.jsx``
* **模块标识**：``src/features/message-map/MessageHistoryMapButton``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-router-dom``、``@/components/ui/button``、``@/components/ui/tooltip``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapButton.jsx:281:1632:FUNCTION

.. rubric:: ``memo callback @ 7``

.. code-block:: javascript

   memo callback @ 7({ conversationId, focusMessageId = '', disabled = false, label = '消息历史地图', })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``42`` 行。

**参数**

``{ conversationId, focusMessageId = '', disabled = false, label = '消息历史地图', }``
   调用方传入的 ``conversationId, focusMessageId = '', disabled = false, label = '消息历史地图',`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Tooltip> <TooltipTrigger asChild> <Button type="button" variant="ghost" size="icon" disabled={isDisabled} onClick={() => { if (isDisabled) return; const focusQuery = resolvedFo…``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``useNavigate``、``String(conversationId || '').trim``、``String``、``String(focusMessageId || '').trim``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapButton.jsx:887:1263:FUNCTION

.. rubric:: ``onClick callback @ 26``

.. code-block:: javascript

   onClick callback @ 26()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``26``—``32`` 行；所属函数 ``memo callback @ 7``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``encodeURIComponent``、``navigate``。
