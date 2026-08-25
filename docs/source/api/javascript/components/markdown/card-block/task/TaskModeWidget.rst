src/components/markdown/card-block/task/TaskModeWidget 模块
==========================================================================================================================

.. js:module:: src/components/markdown/card-block/task/TaskModeWidget

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/task/TaskModeWidget.jsx``
* **模块标识**：``src/components/markdown/card-block/task/TaskModeWidget``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``../constants.jsx``、``../expandedStore.js``、``../useExpandedState.js``、``../status/StatusBody.jsx``、``../status/StatusHeader.jsx``、``./useTaskMonitorStore.js``、``../utils.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1468:1609:FUNCTION

.. js:function:: getLastMarkerValue(content, regex, fallback)

   读取与 ``Last Marker Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``34`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``regex``
      调用方传入的 ``regex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``（默认值 ``''``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``matches.at(-1)?.[1]?.trim() || fallback``。

   **主要协作调用**：``content.matchAll``、``matches.at(-1)?.[1]?.trim``、``matches.at``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1633:2062:FUNCTION

.. js:function:: formatElapsed(elapsedMs)

   格式化与 ``Elapsed`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``46`` 行。

   **参数**

   ``elapsedMs``
      调用方传入的 ``elapsedMs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``hours > 0 ? \x60${hours}:${padded(minutes)}:${padded(seconds)}\x60 : \x60${padded(minutes)}:${padded(seconds)}\x60``。

   **主要协作调用**：``Math.max``、``Math.floor``、``padded``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1887:1927:FUNCTION

.. rubric:: ``padded``

.. code-block:: javascript

   padded(value)

实现 ``padded`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``formatElapsed``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value).padStart``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2093:10245:FUNCTION

.. rubric:: ``memo callback @ 48``

.. code-block:: javascript

   memo callback @ 48({ content = '', contextId = '', id, conversationId = null, renderMarkdown = defaultRenderMarkdown,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``264`` 行。

**参数**

``{ content = '', contextId = '', id, conversationId = null, renderMarkdown = defaultRenderMarkdown,…``
   调用方传入的 ``content = '', contextId = '', id, conversationId = null, renderMarkdown = defaultRenderMarkdown,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="my-3 w-full px-1 py-1.5 sm:px-1.5"> <StatusHeader activeColor="text-blue-600" actions={parsed.actions} canToggleExpansion contextId={contextId} currentColor={cur…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useState``、``useMemo``、``useExpandedState``、``useEffect``、``t``、``formatElapsed``、``useTaskMonitorStore``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2313:2329:FUNCTION

.. rubric:: ``useState callback @ 57``

.. code-block:: javascript

   useState callback @ 57()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``memo callback @ 48``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2364:2405:FUNCTION

.. rubric:: ``useMemo callback @ 58``

.. code-block:: javascript

   useMemo callback @ 58()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``memo callback @ 48``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getExpandedKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2501:6168:FUNCTION

.. rubric:: ``useMemo callback @ 61``

.. code-block:: javascript

   useMemo callback @ 61()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``147`` 行；所属函数 ``memo callback @ 48``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ actions, cleanContent, error, endedAt, isFailed, isFinished, manualCancelled, restartedFromTaskRunId, segmentDone, startedAt, status, taskRunId, title: segmentDone ? \x60${title}${…``。

**主要协作调用**：``toSafeString``、``getLastMarkerValue(safeContent, TASK_STATUS_REGEX, 'running').toLowerCase``、``getLastMarkerValue``、``t``、``Number``、``TASK_RECOVERABLE_REGEX.test``、``TASK_SEGMENT_DONE_REGEX.test``、``TASK_MANUAL_CANCELLED_REGEX.test``、``DONE_REGEX.test``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace(TASK_TITLE_REGEX, '') .replace(TASK_RUN_ID_REGEX, '') .replace(WOR…``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace(TASK_TITLE_REGEX, '') .replace(TASK_RUN_ID_REGEX, '') .replace``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace(TASK_TITLE_REGEX, '') .replace``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:6211:6460:FUNCTION

.. rubric:: ``useEffect callback @ 149``

.. code-block:: javascript

   useEffect callback @ 149()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``155`` 行；所属函数 ``memo callback @ 48``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearInterval(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setInterval``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:6372:6396:FUNCTION

.. rubric:: ``window.setInterval callback @ 153``

.. code-block:: javascript

   window.setInterval callback @ 153()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``153``—``153`` 行；所属函数 ``useEffect callback @ 149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNow``、``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:6419:6453:FUNCTION

.. rubric:: ``returned callback @ 154``

.. code-block:: javascript

   returned callback @ 154()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``useEffect callback @ 149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearInterval``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:6991:7616:FUNCTION

.. rubric:: ``useMemo callback @ 169``

.. code-block:: javascript

   useMemo callback @ 169()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``169``—``186`` 行；所属函数 ``memo callback @ 48``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(id || '').trim``、``String``、``String(conversationId || '').trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:8042:8185:FUNCTION

.. rubric:: ``useEffect callback @ 205``

.. code-block:: javascript

   useEffect callback @ 205()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``205``—``208`` 行；所属函数 ``memo callback @ 48``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``registerTaskMonitorCard``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:8254:8468:FUNCTION

.. rubric:: ``useTaskMonitorStore callback @ 210``

.. code-block:: javascript

   useTaskMonitorStore callback @ 210(state)

封装 ``TaskMonitorStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``210``—``216`` 行；所属函数 ``memo callback @ 48``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Boolean( session?.isOpen && session.activeCardId === monitorSnapshot.cardId )``。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:8563:8724:FUNCTION

.. rubric:: ``onClick callback @ 221``

.. code-block:: javascript

   onClick callback @ 221(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``221``—``225`` 行；所属函数 ``memo callback @ 48``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``openTaskMonitorCard``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:10246:10501:FUNCTION

.. rubric:: ``memo callback @ 264``

.. code-block:: javascript

   memo callback @ 264(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``264``—``271`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
