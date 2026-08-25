src/components/markdown/card-block/expandedStore 模块
==============================================================================================================

.. js:module:: src/components/markdown/card-block/expandedStore

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/expandedStore.js``
* **模块标识**：``src/components/markdown/card-block/expandedStore``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:141:377:FUNCTION

.. js:function:: getExpandedKey(contextId, id, type)

   读取与 ``Expanded Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``5``—``13`` 行。

   **参数**

   ``contextId``
      目标对象的公共或运行时标识。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``type``（默认值 ``''``）
      调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``contextId ? \x60${contextId}::${safeId}\x60 : safeId``、``contextId ? \x60${contextId}::__type__${type}\x60 : \x60__type__${type}\x60``。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:412:800:FUNCTION

.. js:function:: subscribeExpanded(expandedKey, listener)

   订阅与 ``Expanded`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``30`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``listener``
      调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => { listeners.delete(listener); if (listeners.size === 0) { expandedListeners.delete(expandedKey); } }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``expandedListeners.has``、``expandedListeners.set``、``expandedListeners.get``、``listeners.add``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:834:1009:FUNCTION

.. js:function:: notifyExpandedListeners(expandedKey)

   实现 ``notifyExpandedListeners`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``40`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``expandedListeners.get``、``listener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:1050:1199:FUNCTION

.. js:function:: initializeExpandedValue(expandedKey, defaultExpanded)

   实现 ``initializeExpandedValue`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``42``—``46`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``defaultExpanded``
      调用方传入的 ``defaultExpanded`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``expandedMap.has``、``expandedMap.set``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:1233:1304:FUNCTION

.. js:function:: getExpandedValue(expandedKey)

   读取与 ``Expanded Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``48``—``50`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``expandedMap.get(expandedKey) === true``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``expandedMap.get``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:1345:1428:FUNCTION

.. js:function:: hasExpandedUserOverride(expandedKey)

   实现 ``hasExpandedUserOverride`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``52``—``54`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``expandedUserOverrideMap.get(expandedKey) === true``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``expandedUserOverrideMap.get``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:1462:1918:FUNCTION

.. js:function:: setExpandedValue(expandedKey, value, options)

   设置与 ``Expanded Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``56``—``71`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``expandedMap.get``、``expandedUserOverrideMap.set``、``expandedMap.has``、``expandedMap.set``、``notifyExpandedListeners``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:1955:2066:FUNCTION

.. js:function:: toggleExpandedValue(expandedKey, options)

   切换与 ``Expanded Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``73``—``75`` 行。

   **参数**

   ``expandedKey``
      调用方传入的 ``expandedKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``setExpandedValue``、``getExpandedValue``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/expandedStore.js:649:797:FUNCTION

.. rubric:: ``returned callback @ 23``

.. code-block:: javascript

   returned callback @ 23()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``29`` 行；所属函数 ``subscribeExpanded``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``、``expandedListeners.delete``。
