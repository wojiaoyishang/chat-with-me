src/features/story/StoriesPage 模块
================================================================================

.. js:module:: src/features/story/StoriesPage

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/StoriesPage.jsx``
* **模块标识**：``src/features/story/StoriesPage``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：70

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/lib/virtualUrl.js``、``@/context/useEventStore.jsx``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/textarea``、``@/components/ui/checkbox``、``@/components/ui/select``、``@/components/ui/dialog``、``@/components/ui/dropdown-menu``、``@/components/ui/DeleteConfirmDialog``、``@/features/tasks/useTaskStore.js``、``./StoryReader.jsx``、``./storyLibraryState.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:1478:1681:FUNCTION

.. js:function:: reportError(error, fallback)

   实现 ``reportError`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``26`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isAuthRedirectError``、``toast.error``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:1682:26178:FUNCTION

.. js:function:: StoriesPage({ conversationId = null, onNavigate, onReturn, returnLabel = '返回对话' })

   渲染 ``StoriesPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``28``—``362`` 行。

   **参数**

   ``{ conversationId = null, onNavigate, onReturn, returnLabel = '返回对话' }``
      调用方传入的 ``conversationId = null, onNavigate, onReturn, returnLabel = '返回对话'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-col bg-white text-gray-900 dark:bg-background dark:text-foreground" data-stories-page="true"> <header className="shrink-0 px-5 pb-4 pt-5…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useEffect``、``useCallback``、``items.map``、``pageIds.filter``、``Math.max``、``Math.ceil``、``conversations.some``、``[['list', '列表视图'], ['grid', '卡片视图']].map``、``creationConversations.map``。

   **内部回调数量**：37。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:2084:2155:FUNCTION

.. rubric:: ``useState callback @ 35``

.. code-block:: javascript

   useState callback @ 35()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:3750:4831:FUNCTION

.. rubric:: ``useEffect callback @ 67``

.. code-block:: javascript

   useEffect callback @ 67()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``67``—``89`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setLoadError``、``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,…``、``apiClient.get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:4066:4469:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,… callback @ 74``

.. code-block:: javascript

   apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,… callback @ 74(data)

实现 ``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``81`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``Number``、``Math.ceil``、``setPage``、``setItems``、``Array.isArray``、``setTotal``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:4477:4657:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,… callback @ 81``

.. code-block:: javascript

   apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,… callback @ 81(error)

实现 ``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``85`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLoadError``、``reportError``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:4667:4782:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,… callback @ 85``

.. code-block:: javascript

   apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,… callback @ 85()

实现 ``apiClient.get(apiEndpoint.STORIES_ENDPOINT, { params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``87`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:4799:4824:FUNCTION

.. rubric:: ``returned callback @ 88``

.. code-block:: javascript

   returned callback @ 88()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:4873:5983:FUNCTION

.. rubric:: ``useEffect callback @ 91``

.. code-block:: javascript

   useEffect callback @ 91()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``91``—``114`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { controller.abort(); window.clearTimeout(timer); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``conversationSearch.trim``、``setConversationsLoading``、``setConversationsError``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:5146:5884:FUNCTION

.. rubric:: ``window.setTimeout callback @ 97``

.. code-block:: javascript

   async window.setTimeout callback @ 97()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``97``—``112`` 行；所属函数 ``useEffect callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``setConversations``、``flattenStoryConversations``、``setConversationsError``、``reportError``、``setConversationsLoading``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:5918:5976:FUNCTION

.. rubric:: ``returned callback @ 113``

.. code-block:: javascript

   returned callback @ 113()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``useEffect callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``controller.abort``、``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:6082:7187:FUNCTION

.. rubric:: ``useCallback callback @ 116``

.. code-block:: javascript

   async useCallback callback @ 116(id, { quiet = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``116``—``138`` 行；所属函数 ``StoriesPage``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ quiet = false }`` （默认值 ``{}``）
   调用方传入的 ``quiet = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``detailController.current?.abort``、``String``、``setOpeningId``、``apiClient.get``、``setReading``、``reportError``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:7231:7454:FUNCTION

.. rubric:: ``useCallback callback @ 140``

.. code-block:: javascript

   useCallback callback @ 140()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``147`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailController.current?.abort``、``setReading``、``setOpeningId``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:7476:8555:FUNCTION

.. rubric:: ``useEffect callback @ 149``

.. code-block:: javascript

   useEffect callback @ 149()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``167`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:7563:8554:FUNCTION

.. rubric:: ``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback @ 149``

.. code-block:: javascript

   onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback @ 149({ event, payload })

处理 ``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``149``—``167`` 行；所属函数 ``useEffect callback @ 149``。

**参数**

``{ event, payload }``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``storyKey``、``setSelected``、``setItems``、``closeReader``、``window.clearTimeout``、``window.setTimeout``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:7778:7831:FUNCTION

.. rubric:: ``setSelected callback @ 154``

.. code-block:: javascript

   setSelected callback @ 154(current)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback @ 149``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleStorySelection``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:7855:7911:FUNCTION

.. rubric:: ``setItems callback @ 155``

.. code-block:: javascript

   setItems callback @ 155(current)

设置与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback @ 149``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:7881:7910:FUNCTION

.. rubric:: ``current.filter callback @ 155``

.. code-block:: javascript

   current.filter callback @ 155(item)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``setItems callback @ 155``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``storyKey``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8063:8147:FUNCTION

.. rubric:: ``setItems callback @ 158``

.. code-block:: javascript

   setItems callback @ 158(current)

设置与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback @ 149``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8086:8146:FUNCTION

.. rubric:: ``current.map callback @ 158``

.. code-block:: javascript

   current.map callback @ 158(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``setItems callback @ 158``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``storyKey``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8349:8541:FUNCTION

.. rubric:: ``window.setTimeout callback @ 162``

.. code-block:: javascript

   window.setTimeout callback @ 162()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``162``—``166`` 行；所属函数 ``onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then callback @ 149``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRefresh``、``openStory``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8380:8402:FUNCTION

.. rubric:: ``setRefresh callback @ 163``

.. code-block:: javascript

   setRefresh callback @ 163(current)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``window.setTimeout callback @ 162``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8599:8760:FUNCTION

.. rubric:: ``useEffect callback @ 169``

.. code-block:: javascript

   useEffect callback @ 169()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``169``—``173`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8604:8760:FUNCTION

.. rubric:: ``anonymous callback @ 169``

.. code-block:: javascript

   anonymous callback @ 169()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``173`` 行；所属函数 ``useEffect callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``detailController.current?.abort``、``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8792:8986:FUNCTION

.. rubric:: ``changeSearch``

.. code-block:: javascript

   changeSearch(value)

实现 ``changeSearch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``175``—``179`` 行；所属函数 ``StoriesPage``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSearch``、``window.clearTimeout``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:8928:8973:FUNCTION

.. rubric:: ``window.setTimeout callback @ 178``

.. code-block:: javascript

   window.setTimeout callback @ 178()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``178``—``178`` 行；所属函数 ``changeSearch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``value.trim``、``setPage``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:9010:9084:FUNCTION

.. rubric:: ``changeView``

.. code-block:: javascript

   changeView(value)

实现 ``changeView`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``StoriesPage``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``setView``、``localStorage.setItem``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:9107:9474:FUNCTION

.. rubric:: ``editStory``

.. code-block:: javascript

   editStory(story)

实现 ``editStory`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``189`` 行；所属函数 ``StoriesPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setTitle``、``setDescription``、``setCreationConversationId``、``String``、``setCreationConversationTitle``、``setConversationSearch``、``setConversations``、``setEditor``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:9498:10408:FUNCTION

.. rubric:: ``saveStory``

.. code-block:: javascript

   async saveStory(event)

保存与 ``Story`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``191``—``206`` 行；所属函数 ``StoriesPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``event.preventDefault``、``title.trim``、``setSaving``、``description.trim``、``apiClient.post``、``apiClient.patch``、``setReading``、``setEditor``、``setRefresh``、``toast.success``、``reportError``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:10066:10161:FUNCTION

.. rubric:: ``setReading callback @ 200``

.. code-block:: javascript

   setReading callback @ 200(current)

设置与 ``Reading`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``saveStory``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``storyKey``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:10216:10238:FUNCTION

.. rubric:: ``setRefresh callback @ 202``

.. code-block:: javascript

   setRefresh callback @ 202(current)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``saveStory``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:10434:11052:FUNCTION

.. rubric:: ``deleteStory``

.. code-block:: javascript

   async deleteStory()

删除与 ``Story`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``208``—``221`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDeleting``、``apiClient.delete``、``storyKey``、``setSelected``、``closeReader``、``setDeleteTarget``、``setRefresh``、``toast.success``、``reportError``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:10704:10758:FUNCTION

.. rubric:: ``setSelected callback @ 214``

.. code-block:: javascript

   setSelected callback @ 214(current)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``deleteStory``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleStorySelection``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:10888:10910:FUNCTION

.. rubric:: ``setRefresh callback @ 217``

.. code-block:: javascript

   setRefresh callback @ 217(current)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``217``—``217`` 行；所属函数 ``deleteStory``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:11080:12004:FUNCTION

.. rubric:: ``exportStories``

.. code-block:: javascript

   async exportStories(ids)

实现 ``exportStories`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``223``—``242`` 行；所属函数 ``StoriesPage``。

**参数**

``ids``
   调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('未收到有效的导出任务，请查看任务中心确认提交状态。')``。

**主要协作调用**：``normalizeStoryExportIds``、``toast.error``、``setExporting``、``apiClient.post``、``Number.isInteger``、``useTaskStore.getState().merge``、``useTaskStore.getState``、``useTaskStore.getState().show``、``toast.success``、``reportError``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:12093:12115:FUNCTION

.. rubric:: ``pageIds.filter callback @ 245``

.. code-block:: javascript

   pageIds.filter callback @ 245(id)

作为 ``pageIds.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``245``—``245`` 行；所属函数 ``StoriesPage``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selected.has``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:12270:12324:FUNCTION

.. rubric:: ``conversations.some callback @ 247``

.. code-block:: javascript

   conversations.some callback @ 247(item)

作为 ``conversations.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``StoriesPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:12495:13405:FUNCTION

.. rubric:: ``storyActions``

.. code-block:: javascript

   storyActions(story)

实现 ``storyActions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``251``—``264`` 行；所属函数 ``StoriesPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:12909:12931:FUNCTION

.. rubric:: ``onClick callback @ 259``

.. code-block:: javascript

   onClick callback @ 259()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``storyActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editStory``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:13059:13095:FUNCTION

.. rubric:: ``onClick callback @ 260``

.. code-block:: javascript

   onClick callback @ 260()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``storyActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``exportStories``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:13252:13280:FUNCTION

.. rubric:: ``onClick callback @ 261``

.. code-block:: javascript

   onClick callback @ 261()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``storyActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteTarget``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:14273:14294:FUNCTION

.. rubric:: ``onClick callback @ 275``

.. code-block:: javascript

   onClick callback @ 275()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``275``—``275`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editStory``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:14709:14750:FUNCTION

.. rubric:: ``onChange callback @ 280``

.. code-block:: javascript

   onChange callback @ 280(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``280``—``280`` 行；所属函数 ``StoriesPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeSearch``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:14922:14944:FUNCTION

.. rubric:: ``onClick callback @ 281``

.. code-block:: javascript

   onClick callback @ 281()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeSearch``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:15243:15669:FUNCTION

.. rubric:: ``[['list', '列表视图'], ['grid', '卡片视图']].map callback @ 284``

.. code-block:: javascript

   [['list', '列表视图'], ['grid', '卡片视图']].map callback @ 284([key, label])

作为 ``[['list', '列表视图'], ['grid', '卡片视图']].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``284``—``286`` 行；所属函数 ``StoriesPage``。

**参数**

``[key, label]``
   调用方传入的 ``key, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:15424:15445:FUNCTION

.. rubric:: ``onClick callback @ 285``

.. code-block:: javascript

   onClick callback @ 285()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``285``—``285`` 行；所属函数 ``[['list', '列表视图'], ['grid', '卡片视图']].map callback @ 284``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeView``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:16116:16207:FUNCTION

.. rubric:: ``onCheckedChange callback @ 290``

.. code-block:: javascript

   onCheckedChange callback @ 290(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``StoriesPage``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:16139:16206:FUNCTION

.. rubric:: ``setSelected callback @ 290``

.. code-block:: javascript

   setSelected callback @ 290(current)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``onCheckedChange callback @ 290``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleStorySelection``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:16381:16409:FUNCTION

.. rubric:: ``onClick callback @ 291``

.. code-block:: javascript

   onClick callback @ 291()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:16626:16660:FUNCTION

.. rubric:: ``onClick callback @ 291``

.. code-block:: javascript

   onClick callback @ 291()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``exportStories``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:17776:17816:FUNCTION

.. rubric:: ``onClick callback @ 297``

.. code-block:: javascript

   onClick callback @ 297()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRefresh``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:17793:17815:FUNCTION

.. rubric:: ``setRefresh callback @ 297``

.. code-block:: javascript

   setRefresh callback @ 297(current)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``onClick callback @ 297``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:18053:20997:FUNCTION

.. rubric:: ``items.map callback @ 299``

.. code-block:: javascript

   items.map callback @ 299(story)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``299``—``315`` 行；所属函数 ``StoriesPage``。

**参数**

``story``
   调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<article key={key} data-story-id={key} className={\x60group relative min-w-0 transition-colors ${isGrid ? 'flex flex-col overflow-hidden rounded-2xl border shadow-sm hover:shadow-md'…``。

**主要协作调用**：``storyKey``、``resolveResourceUrl``、``selected.has``、``storyStatusLabel``、``Number``、``storyActions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:18894:18983:FUNCTION

.. rubric:: ``onCheckedChange callback @ 304``

.. code-block:: javascript

   onCheckedChange callback @ 304(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``items.map callback @ 299``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:18917:18982:FUNCTION

.. rubric:: ``setSelected callback @ 304``

.. code-block:: javascript

   setSelected callback @ 304(current)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``onCheckedChange callback @ 304``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleStorySelection``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:19057:19087:FUNCTION

.. rubric:: ``onClick callback @ 305``

.. code-block:: javascript

   onClick callback @ 305()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``305``—``305`` 行；所属函数 ``items.map callback @ 299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openStory``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:21296:21333:FUNCTION

.. rubric:: ``onClick callback @ 319``

.. code-block:: javascript

   onClick callback @ 319()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:21310:21332:FUNCTION

.. rubric:: ``setPage callback @ 319``

.. code-block:: javascript

   setPage callback @ 319(current)

设置与 ``Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``onClick callback @ 319``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:21549:21586:FUNCTION

.. rubric:: ``onClick callback @ 319``

.. code-block:: javascript

   onClick callback @ 319()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:21563:21585:FUNCTION

.. rubric:: ``setPage callback @ 319``

.. code-block:: javascript

   setPage callback @ 319(current)

设置与 ``Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``onClick callback @ 319``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:21702:21752:FUNCTION

.. rubric:: ``onOpenChange callback @ 321``

.. code-block:: javascript

   onOpenChange callback @ 321(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``321``—``321`` 行；所属函数 ``StoriesPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:22439:22476:FUNCTION

.. rubric:: ``onChange callback @ 330``

.. code-block:: javascript

   onChange callback @ 330(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``StoriesPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTitle``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:22838:22881:FUNCTION

.. rubric:: ``onChange callback @ 334``

.. code-block:: javascript

   onChange callback @ 334(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``StoriesPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDescription``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:23377:23427:FUNCTION

.. rubric:: ``onChange callback @ 339``

.. code-block:: javascript

   onChange callback @ 339(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``339``—``339`` 行；所属函数 ``StoriesPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationSearch``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:23589:23843:FUNCTION

.. rubric:: ``onValueChange callback @ 340``

.. code-block:: javascript

   onValueChange callback @ 340(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``340``—``343`` 行；所属函数 ``StoriesPage``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreationConversationId``、``setCreationConversationTitle``、``creationConversations.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:23754:23791:FUNCTION

.. rubric:: ``creationConversations.find callback @ 342``

.. code-block:: javascript

   creationConversations.find callback @ 342(item)

作为 ``creationConversations.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``onValueChange callback @ 340``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:24112:24211:FUNCTION

.. rubric:: ``creationConversations.map callback @ 345``

.. code-block:: javascript

   creationConversations.map callback @ 345(item)

作为 ``creationConversations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``345``—``345`` 行；所属函数 ``StoriesPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:24706:24758:FUNCTION

.. rubric:: ``onClick callback @ 348``

.. code-block:: javascript

   onClick callback @ 348()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``348``—``348`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationRefresh``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:24735:24757:FUNCTION

.. rubric:: ``setConversationRefresh callback @ 348``

.. code-block:: javascript

   setConversationRefresh callback @ 348(current)

设置与 ``Conversation Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``348``—``348`` 行；所属函数 ``onClick callback @ 348``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:25119:25166:FUNCTION

.. rubric:: ``onClick callback @ 349``

.. code-block:: javascript

   onClick callback @ 349()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``349``—``349`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``、``onNavigate``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:25357:25378:FUNCTION

.. rubric:: ``onClick callback @ 352``

.. code-block:: javascript

   onClick callback @ 352()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``352``—``352`` 行；所属函数 ``StoriesPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEditor``。

.. CWM-AST-FUNCTION src/features/story/StoriesPage.jsx:25825:25883:FUNCTION

.. rubric:: ``onOpenChange callback @ 358``

.. code-block:: javascript

   onOpenChange callback @ 358(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``358``—``358`` 行；所属函数 ``StoriesPage``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDeleteTarget``。
