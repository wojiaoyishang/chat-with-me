src/features/settings-client/catalog 模块
======================================================================================

.. js:module:: src/features/settings-client/catalog

Device preferences and connection selection belong to the client. Backend notification types are business data, never client page definitions.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-client/catalog.js``
* **模块标识**：``src/features/settings-client/catalog``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:644:671:FUNCTION

.. js:function:: ref(path)

   实现 ``ref`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``25`` 行。

   **参数**

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:692:839:FUNCTION

.. js:function:: preference(key, text, tips, defaultValue)

   实现 ``preference`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``33`` 行。

   **参数**

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``text``
      待展示、发送、解析或朗读的文本。

   ``tips``
      调用方传入的 ``tips`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``defaultValue`` （默认值 ``true``）
      调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:855:960:FUNCTION

.. js:function:: group(text, icon, children)

   实现 ``group`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``40`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``icon``
      调用方传入的 ``icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``children``
      React 子节点。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:961:2662:FUNCTION

.. js:function:: interfaceOptions()

   实现 ``interfaceOptions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``113`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[ group("对话列表", "palette", [ preference( "CompactConversationList", "紧凑显示对话列表", "减小对话条目的间距，在侧栏中显示更多会话。", false, ), preference( "ShowConversationTimestamps", "显示对话时间", "在会话列表中显示最近更…``。

   **主要协作调用**：``group``、``preference``。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:2662:5452:FUNCTION

.. js:function:: connectionOptions()

   实现 ``connectionOptions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``210`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[ { type: "resource", id: "backend-profiles", text: "已保存的连接", icon: "server", description: "当前选择会一直保留，刷新或断线都不会自动连接其他后端。", source: { endpoint: "client:backends", listPath: "items"…``。

   **主要协作调用**：``ref``。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:5452:7754:FUNCTION

.. js:function:: notificationOptions({ types = [], permission = "unsupported", error = "", })

   实现 ``notificationOptions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``212``—``295`` 行。

   **参数**

   ``{ types = [], permission = "unsupported", error = "", }`` （默认值 ``{}``）
      调用方传入的 ``types = , permission = "unsupported", error = "",`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``options``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``preference``、``options.push``、``categories.has``、``categories.set``、``categories.get(category).fields.push``、``categories.get``。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:7754:8767:FUNCTION

.. js:function:: clientSettingsPage(id, notificationData)

   实现 ``clientSettingsPage`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``297``—``328`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``notificationData``
      调用方传入的 ``notificationData`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ schema: "cwm.settings.v1", scope: "client", id: tab.id, title: tab.name, description: tab.description, icon: tab.icon, ...(tab.preview ? { preview: tab.preview } : {}), options:…``。

   **显式抛出**：``new Error("前端设置页面不存在。")``。

   **主要协作调用**：``CLIENT_SETTINGS_TABS.find``、``interfaceOptions``、``connectionOptions``、``notificationOptions``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:8767:9794:FUNCTION

.. js:function:: filterClientSettingsOptions(options, query)

   Search local preference groups without changing the source type catalog or their literal storage identities. Non-filterable controls remain available.

   **性质**：同步函数；导出 API；源码第 ``332``—``354`` 行。

   **参数**

   ``options``
      调用方传入的可选配置对象。

   ``query``
      调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``options``、``filtered``。

   **主要协作调用**：``String(query || "") .trim() .toLowerCase``、``String(query || "") .trim``、``String``、``options.flatMap``、``filtered.some``、``filtered.push``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:7858:7882:FUNCTION

.. rubric:: ``CLIENT_SETTINGS_TABS.find callback @ 298``

.. code-block:: javascript

   CLIENT_SETTINGS_TABS.find callback @ 298(item)

作为 ``CLIENT_SETTINGS_TABS.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``298``—``298`` 行；所属函数 ``clientSettingsPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:9138:9662:FUNCTION

.. rubric:: ``options.flatMap callback @ 337``

.. code-block:: javascript

   options.flatMap callback @ 337(item)

实现 ``options.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``337``—``350`` 行；所属函数 ``filterClientSettingsOptions``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[item]``、``children.length ? [{ ...item, children }] : []``。

**主要协作调用**：``String(item.text || "") .toLowerCase() .includes``、``String(item.text || "") .toLowerCase``、``String``、``(item.children || []).filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:9345:9588:FUNCTION

.. rubric:: ``(item.children || []).filter callback @ 343``

.. code-block:: javascript

   (item.children || []).filter callback @ 343(child)

作为 ``(item.children || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``343``—``347`` 行；所属函数 ``options.flatMap callback @ 337``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${child.text || ""} ${child.description || child.tips || ""} ${(Array.isArray(child.name) ? child.name : [child.name])…``、``(Array.isArray(child.name) ? child.name : [child.name]).join``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/settings-client/catalog.js:9687:9712:FUNCTION

.. rubric:: ``filtered.some callback @ 351``

.. code-block:: javascript

   filtered.some callback @ 351(item)

作为 ``filtered.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``351``—``351`` 行；所属函数 ``filterClientSettingsOptions``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
