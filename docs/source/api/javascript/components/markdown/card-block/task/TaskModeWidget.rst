src/components/markdown/card-block/task/TaskModeWidget 模块
=========================================================

.. js:module:: src/components/markdown/card-block/task/TaskModeWidget

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/task/TaskModeWidget.jsx``
* **模块标识**：``src/components/markdown/card-block/task/TaskModeWidget``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------

``react``、``lucide-react``、``react-i18next``、``../constants.jsx``、``../expandedStore.js``、``../useExpandedState.js``、``../status/StatusBody.jsx``、``../status/StatusHeader.jsx``、``./TaskMonitorWindow.jsx``、``../utils.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1254:1395:FUNCTION

.. js:function:: getLastMarkerValue(content, regex, fallback)

   读取与 ``Last Marker Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``28`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``regex``
      调用方传入的 ``regex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``（默认值 ``''``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``matches.at(-1)?.[1]?.trim() \|\| fallback``。

   **主要协作调用**：``content.matchAll``、``matches.at(-1)?.[1]?.trim``、``matches.at``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1419:1848:FUNCTION

.. js:function:: formatElapsed(elapsedMs)

   格式化与 ``Elapsed`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``40`` 行。

   **参数**

   ``elapsedMs``
      调用方传入的 ``elapsedMs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``hours > 0 ? \`${hours}:${padded(minutes)}:${padded(seconds)}\` : \`${padded(minutes)}:${padded(seconds)}\```。

   **主要协作调用**：``Math.max``、``Math.floor``、``padded``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1673:1713:FUNCTION

.. rubric:: ``padded``

.. code-block:: javascript

   padded(value)

实现 ``padded`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``formatElapsed``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value).padStart``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:1879:8498:FUNCTION

.. rubric:: ``memo callback @ 42``

.. code-block:: javascript

   memo callback @ 42({ content = '', contextId = '', id, conversationId = null, renderMarkdown = defaultRenderMarkdown,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``211`` 行。

**参数**

``{ content = '', contextId = '', id, conversationId = null, renderMarkdown = defaultRenderMarkdown,…``
   调用方传入的 `` content = '', contextId = '', id, conversationId = null, renderMarkdown = defaultRenderMarkdown,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="my-3 w-full px-1 py-1.5 sm:px-1.5"> <StatusHeader activeColor="text-blue-600" actions={parsed.actions} canToggleExpansion contextId={contextId} currentColor={cur…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useTranslation``、``useState``、``useMemo``、``useExpandedState``、``useEffect``、``t``、``formatElapsed``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2099:2115:FUNCTION

.. rubric:: ``useState callback @ 51``

.. code-block:: javascript

   useState callback @ 51()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``memo callback @ 42``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2209:2250:FUNCTION

.. rubric:: ``useMemo callback @ 53``

.. code-block:: javascript

   useMemo callback @ 53()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``memo callback @ 42``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getExpandedKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:2346:5279:FUNCTION

.. rubric:: ``useMemo callback @ 56``

.. code-block:: javascript

   useMemo callback @ 56()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``126`` 行；所属函数 ``memo callback @ 42``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ actions, cleanContent, error, endedAt, isFailed, isFinished, segmentDone, startedAt, status, taskRunId, title: segmentDone ? \`${title}${t('task_mode_previous_history_suffix', '（…``。

**主要协作调用**：``toSafeString``、``getLastMarkerValue(safeContent, TASK_STATUS_REGEX, 'running').toLowerCase``、``getLastMarkerValue``、``t``、``Number``、``TASK_RECOVERABLE_REGEX.test``、``TASK_SEGMENT_DONE_REGEX.test``、``DONE_REGEX.test``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace(TASK_TITLE_REGEX, '') .replace(TASK_RUN_ID_REGEX, '') .replace(WOR…``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace(TASK_TITLE_REGEX, '') .replace(TASK_RUN_ID_REGEX, '') .replace``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace(TASK_TITLE_REGEX, '') .replace``、``safeContent .replace(TASK_STATUS_REGEX, '') .replace``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:5311:5560:FUNCTION

.. rubric:: ``useEffect callback @ 128``

.. code-block:: javascript

   useEffect callback @ 128()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``128``—``134`` 行；所属函数 ``memo callback @ 42``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearInterval(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setInterval``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:5472:5496:FUNCTION

.. rubric:: ``window.setInterval callback @ 132``

.. code-block:: javascript

   window.setInterval callback @ 132()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``useEffect callback @ 128``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNow``、``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:5519:5553:FUNCTION

.. rubric:: ``returned callback @ 133``

.. code-block:: javascript

   returned callback @ 133()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``useEffect callback @ 128``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearInterval``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:6146:6291:FUNCTION

.. rubric:: ``onClick callback @ 151``

.. code-block:: javascript

   onClick callback @ 151(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``151``—``155`` 行；所属函数 ``memo callback @ 42``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setMonitorOpen``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:8152:8179:FUNCTION

.. rubric:: ``onClose callback @ 200``

.. code-block:: javascript

   onClose callback @ 200()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``memo callback @ 42``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMonitorOpen``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskModeWidget.jsx:8499:8754:FUNCTION

.. rubric:: ``memo callback @ 211``

.. code-block:: javascript

   memo callback @ 211(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``211``—``218`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
