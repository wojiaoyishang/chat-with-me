src/runtime/backend/connectionProbes 模块
======================================================================================

.. js:module:: src/runtime/backend/connectionProbes

Measure the public bootstrap round trip, including reading its small body. Fetch is deliberately credential-free and bypasses the selected API client's session interceptors: inspecting another address must not log in or switch.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/backend/connectionProbes.js``
* **模块标识**：``src/runtime/backend/connectionProbes``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``./connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:149:206:FUNCTION

.. js:function:: idleResult()

   实现 ``idleResult`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``5`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:223:271:FUNCTION

.. js:function:: aborted()

   实现 ``aborted`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``6`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:291:335:FUNCTION

.. js:function:: profileKey(profile)

   实现 ``profileKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``7`` 行。

   **参数**

   ``profile``
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:336:2537:FUNCTION

.. js:function:: probeBackendConnection(profile, { signal, timeoutMs = PROBE_TIMEOUT_MS, request = (...args) => globalThis.fetch(...args), now = ()…)

   Measure the public bootstrap round trip, including reading its small body. Fetch is deliberately credential-free and bypasses the selected API client's session interceptors: inspecting another address must not log in or switch.

   **性质**：异步函数；导出 API；源码第 ``13``—``50`` 行。

   **参数**

   ``profile``
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ signal, timeoutMs = PROBE_TIMEOUT_MS, request = (...args) => globalThis.fetch(...args), now = ()…`` （默认值 ``{}``）
      调用方传入的 ``signal, timeoutMs = PROBE_TIMEOUT_MS, request = (...args) => globalThis.fetch(...args), now = ()…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ status: 'incompatible', latencyText: '—', detail: '该地址不支持当前客户端协议。' }``、``{ status: 'available', latencyMs, latencyText: \x60${latencyMs} ms\x60, detail: '' }``、``{ status: timedOut ? 'timeout' : 'unavailable', latencyText: '—', detail: timedOut ? \x60${timeoutMs / 1000} 秒内未收到完整响应。\x60 : cause instanceof TypeError ? '浏览器无法访问该地址，请检查网络、HTTPS 和跨域设置。…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **显式抛出**：``aborted()``、``new Error(\x60HTTP ${response.status}${response.statusText ? \x60 · ${response.statusText}\x60 : ''}\x60)``、``new Error('后端没有返回有效的客户端信息。')``、``new Error('请求超时。')``、``new Error(body?.msg || '后端拒绝了连接检测。')``。

   **主要协作调用**：``aborted``、``signal?.addEventListener``、``setTimeout``、``now``、``request``、``backendApiUrl``、``response.json``、``Math.max``、``Math.round``、``clearTimeout``、``signal?.removeEventListener``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:2537:5944:FUNCTION

.. js:function:: createBackendProbeStore({ profiles = () => readBackendProfiles().profiles, probe = probeBackendConnection, concurrency = PR…)

   Tab-local observations, never saved as connection configuration. A bounded batch snapshots the saved addresses and publishes each result as it arrives.

   **性质**：同步函数；导出 API；源码第 ``55``—``116`` 行。

   **参数**

   ``{ profiles = () => readBackendProfiles().profiles, probe = probeBackendConnection, concurrency = PR…`` （默认值 ``{}``）
      调用方传入的 ``profiles = () => readBackendProfiles().profiles, probe = probeBackendConnection, concurrency = PR…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ read, run, subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); } }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:691:730:FUNCTION

.. rubric:: ``anonymous callback @ 15``

.. code-block:: javascript

   anonymous callback @ 15(...args)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``probeBackendConnection``。

**参数**

``...args`` （剩余参数）
   调用方传入的 ``args`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``globalThis.fetch``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:741:765:FUNCTION

.. rubric:: ``anonymous callback @ 16``

.. code-block:: javascript

   anonymous callback @ 16()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``probeBackendConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``performance.now``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:883:908:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``probeBackendConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:1028:1074:FUNCTION

.. rubric:: ``setTimeout callback @ 23``

.. code-block:: javascript

   setTimeout callback @ 23()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``probeBackendConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:2758:2795:FUNCTION

.. rubric:: ``anonymous callback @ 56``

.. code-block:: javascript

   anonymous callback @ 56()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``createBackendProbeStore``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readBackendProfiles``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:2987:3037:FUNCTION

.. rubric:: ``notify``

.. code-block:: javascript

   notify()

实现 ``notify`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``createBackendProbeStore``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:3012:3036:FUNCTION

.. rubric:: ``listeners.forEach callback @ 63``

.. code-block:: javascript

   listeners.forEach callback @ 63(listener)

作为 ``listeners.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``notify``。

**参数**

``listener``
   调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listener``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:3055:3391:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   read()

实现 ``read`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``69`` 行；所属函数 ``createBackendProbeStore``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``current.map((profile) => ({ ...profile, probeRunning: running, probe: { ...(results.get(profileKey(profile)) || idleResult()) } }))``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``profiles``、``current.map``、``results.keys``、``keys.has``、``results.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:3265:3383:FUNCTION

.. rubric:: ``current.map callback @ 68``

.. code-block:: javascript

   current.map callback @ 68(profile)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``read``。

**参数**

``profile``
   调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``results.get``、``profileKey``、``idleResult``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:3408:5819:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   async run({ profileId, signal, onProgress })

实现 ``run`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``70``—``114`` 行；所属函数 ``createBackendProbeStore``。

**参数**

``{ profileId, signal, onProgress }`` （默认值 ``{}``）
   调用方传入的 ``profileId, signal, onProgress`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ total: targets.length, available, failed: targets.length - available }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**显式抛出**：``aborted()``、``new Error('正在测速，请等待当前检测完成。')``、``new Error('该后端连接已被删除。')``。

**主要协作调用**：``aborted``、``profiles().filter``、``profiles``、``signal?.addEventListener``、``results.set``、``profileKey``、``notify``、``progress``、``Promise.all``、``Array.from``、``Math.min``、``Math.max``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:3606:3657:FUNCTION

.. rubric:: ``profiles().filter callback @ 73``

.. code-block:: javascript

   profiles().filter callback @ 73(profile)

作为 ``profiles().filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``run``。

**参数**

``profile``
   调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:3805:3830:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``run``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:4046:4188:FUNCTION

.. rubric:: ``progress``

.. code-block:: javascript

   progress()

实现 ``progress`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``run``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onProgress``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:4397:5123:FUNCTION

.. rubric:: ``worker``

.. code-block:: javascript

   async worker()

实现 ``worker`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``86``—``100`` 行；所属函数 ``run``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``profileKey``、``results.set``、``notify``、``probe``、``Date.now``、``progress``。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:5855:5939:FUNCTION

.. rubric:: ``subscribe``

.. code-block:: javascript

   subscribe(listener)

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``createBackendProbeStore``。

**参数**

``listener``
   调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => listeners.delete(listener)``。

**主要协作调用**：``listeners.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/connectionProbes.js:5903:5936:FUNCTION

.. rubric:: ``returned callback @ 115``

.. code-block:: javascript

   returned callback @ 115()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``subscribe``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``。
