src/features/story/StoryCard 模块
================================================================================

.. js:module:: src/features/story/StoryCard

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/StoryCard.jsx``
* **模块标识**：``src/features/story/StoryCard``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:406:524:FUNCTION

.. js:function:: parseStory(content)

   解析与 ``Story`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``16`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.parse(String(content || '{}'))``、``{}``。

   **主要协作调用**：``JSON.parse``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:550:5953:FUNCTION

.. rubric:: ``memo callback @ 18``

.. code-block:: javascript

   memo callback @ 18({content = '', conversationId = null})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``132`` 行。

**参数**

``{content = '', conversationId = null}``
   调用方传入的 ``content = '', conversationId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={openStory} disabled={story?.deleted} className="group my-4 flex w-full max-w-none overflow-hidden rounded-2xl border border-amber-200/80 bg-gradie…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``useTranslation``、``useMemo``、``useState``、``Number``、``useEffect``、``useCallback``、``resolveResourceUrl``、``t``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:657:682:FUNCTION

.. rubric:: ``useMemo callback @ 20``

.. code-block:: javascript

   useMemo callback @ 20()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseStory``。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:996:1019:FUNCTION

.. rubric:: ``useEffect callback @ 26``

.. code-block:: javascript

   useEffect callback @ 26()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStory``。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:1071:1715:FUNCTION

.. rubric:: ``useCallback callback @ 28``

.. code-block:: javascript

   async useCallback callback @ 28()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``28``—``46`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data.story``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setStory``、``setHiddenByPermission``、``Number``、``setAccessChecked``。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:1760:2088:FUNCTION

.. rubric:: ``useEffect callback @ 48``

.. code-block:: javascript

   useEffect callback @ 48()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``48``—``59`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**主要协作调用**：``setAccessChecked``、``refreshStory().then``、``refreshStory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:1984:2036:FUNCTION

.. rubric:: ``refreshStory().then callback @ 55``

.. code-block:: javascript

   refreshStory().then callback @ 55()

处理 ``refreshStory().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``55``—``57`` 行；所属函数 ``useEffect callback @ 48``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:2053:2081:FUNCTION

.. rubric:: ``returned callback @ 58``

.. code-block:: javascript

   returned callback @ 58()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useEffect callback @ 48``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:2147:3177:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``82`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({event: 'story.*', conversationId, includeGlobal: true}).then(({event, payload}) => { const value = payload?.value || {}; const nextStory = value.story || value; if (Numbe…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'story.*', conversationId, includeGlobal: true}).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:2280:3169:FUNCTION

.. rubric:: ``onEvent({event: 'story.*', conversationId, includeGlobal: true}).then callback @ 63``

.. code-block:: javascript

   onEvent({event: 'story.*', conversationId, includeGlobal: true}).then callback @ 63({event, payload})

处理 ``onEvent({event: 'story.*', conversationId, includeGlobal: true}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``63``—``81`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``setStory``、``setHiddenByPermission``、``refreshStory``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:2556:2615:FUNCTION

.. rubric:: ``setStory callback @ 68``

.. code-block:: javascript

   setStory callback @ 68(current)

设置与 ``Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``onEvent({event: 'story.*', conversationId, includeGlobal: true}).then callback @ 63``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:2841:3143:FUNCTION

.. rubric:: ``setStory callback @ 73``

.. code-block:: javascript

   setStory callback @ 73(current)

设置与 ``Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``73``—``79`` 行；所属函数 ``onEvent({event: 'story.*', conversationId, includeGlobal: true}).then callback @ 63``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``merged``。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:3315:3528:FUNCTION

.. rubric:: ``openStory``

.. code-block:: javascript

   openStory()

打开与 ``Story`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``86``—``94`` 行；所属函数 ``memo callback @ 18``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/features/story/StoryCard.jsx:5954:6047:FUNCTION

.. rubric:: ``memo callback @ 132``

.. code-block:: javascript

   memo callback @ 132(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``132`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
