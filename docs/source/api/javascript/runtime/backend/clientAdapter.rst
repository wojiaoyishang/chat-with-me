src/runtime/backend/clientAdapter 模块
================================================================================

.. js:module:: src/runtime/backend/clientAdapter

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/backend/clientAdapter.js``
* **模块标识**：``src/runtime/backend/clientAdapter``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``./connection.js``、``../../lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:368:1039:FUNCTION

.. js:function:: storageKey(key, options)

   实现 ``storageKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``20`` 行。

   **参数**

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``backendStorageKey(key)``、``backendStorageKey(key, 'shared')``、``key``。

   **显式抛出**：``new Error('客户端设置键无效。')``、``new Error('此设置不能访问客户端保留的存储空间。')``。

   **主要协作调用**：``['__proto__', 'prototype', 'constructor'].includes``、``backendStorageKey``、``/^[A-Za-z][A-Za-z0-9._-]*$/.test``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:1080:1320:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   async read(key, options)

实现 ``read`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``22``—``24`` 行。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options``
   调用方传入的可选配置对象。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readBackendProfiles().profiles.map``、``readBackendProfiles``、``getLocalSetting``、``storageKey``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:1178:1257:FUNCTION

.. rubric:: ``readBackendProfiles().profiles.map callback @ 23``

.. code-block:: javascript

   readBackendProfiles().profiles.map callback @ 23(profile)

作为 ``readBackendProfiles().profiles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``read``。

**参数**

``profile``
   调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getBackendConnection``。

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:1332:1431:FUNCTION

.. rubric:: ``write``

.. code-block:: javascript

   async write(key, value, options)

实现 ``write`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``25``—``25`` 行。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

``options``
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``value``。

**主要协作调用**：``setLocalSetting``、``storageKey``。

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:1444:2864:FUNCTION

.. rubric:: ``invoke``

.. code-block:: javascript

   async invoke(name, payload)

实现 ``invoke`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``26``—``49`` 行。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``payload`` （默认值 ``{}``）
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``saveBackendProfile(payload)``、``deleteBackendProfile(payload.profileId)``、``switchBackend(payload.profileId)``、``{}``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**显式抛出**：``new Error('后端连接已切换。')``、``new Error(\x60客户端不支持此操作：${name}\x60)``。

**主要协作调用**：``saveBackendProfile``、``deleteBackendProfile``、``switchBackend``、``window.dispatchEvent``、``setLocalSetting``、``storageKey``、``getBackendConnection``、``import``、``isCurrentConnection``、``api.get``、``setConnectionToken``、``window.location.assign``。

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:2880:3193:FUNCTION

.. rubric:: ``subscribe``

.. code-block:: javascript

   subscribe(callback)

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``50``—``55`` 行。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { off(); window.removeEventListener(LOCAL_EVENT, callback); window.removeEventListener('storage', callback); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``subscribeBackend``、``window.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/clientAdapter.js:3069:3186:FUNCTION

.. rubric:: ``returned callback @ 54``

.. code-block:: javascript

   returned callback @ 54()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``subscribe``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``off``、``window.removeEventListener``。
