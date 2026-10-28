src/features/tasks/observation-components 模块
================================================================================================

.. js:module:: src/features/tasks/observation-components

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tasks/observation-components.js``
* **模块标识**：``src/features/tasks/observation-components``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：56

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:249:34230:FUNCTION

.. rubric:: ``anonymous callback @ 4``

.. code-block:: javascript

   anonymous callback @ 4()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``439`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``Object.freeze``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:289:352:FUNCTION

.. rubric:: ``finite``

.. code-block:: javascript

   finite(value)

实现 ``finite`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``6`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:368:586:FUNCTION

.. rubric:: ``text``

.. code-block:: javascript

   text(value)

实现 ``text`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``12`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``"未知"``、``String(value)``、``value ? "是" : "否"``。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:587:1563:FUNCTION

.. rubric:: ``format``

.. code-block:: javascript

   format(value, kind, unit, precision)

格式化与 ``format`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``13``—``27`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``value``
   待读取、转换或校验的值。

``kind`` （默认值 ``"text"``）
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``unit`` （默认值 ``""``）
   调用方传入的 ``unit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``precision``
   调用方传入的 ``precision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``"未知"``、``finite(value) ? \x60${value.toLocaleString("zh-CN", { maximumFractionDigits: precision ?? 1 })} 秒\x60 : "未知"``、``\x60${index ? amount.toFixed(precision ?? 1) : amount} ${units[index]}\x60``、``finite(value) ? \x60${value.toLocaleString("zh-CN", { maximumFractionDigits: precision ?? 1 })}%\x60 : "未知"``。

**主要协作调用**：``finite``、``value.toLocaleString``、``amount.toFixed``、``text``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:9843:10048:FUNCTION

.. rubric:: ``scope``

.. code-block:: javascript

   scope(observation, scopeId)

实现 ``scope`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``72`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``observation``
   调用方传入的 ``observation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``scopeId`` （默认值 ``"task"``）
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``observation?.version === 1 && observation.scopes && typeof observation.scopes === "object" ? observation.scopes[scopeId] : undefined``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:10066:10199:FUNCTION

.. rubric:: ``visible``

.. code-block:: javascript

   visible(component, view)

实现 ``visible`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``component``
   调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:10200:10374:FUNCTION

.. rubric:: ``components``

.. code-block:: javascript

   components(observation, scopeId, view)

实现 ``components`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``76`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``observation``
   调用方传入的 ``observation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``scopeId`` （默认值 ``"task"``）
   目标对象的公共或运行时标识。

``view`` （默认值 ``"detail"``）
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``(scope(observation, scopeId)?.components || []).filter((item) => visible(item, view))``。

**主要协作调用**：``(scope(observation, scopeId)?.components || []).filter``、``scope``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:10339:10368:FUNCTION

.. rubric:: ``(scope(observation, scopeId)?.components || []).filter callback @ 75``

.. code-block:: javascript

   (scope(observation, scopeId)?.components || []).filter callback @ 75(item)

作为 ``(scope(observation, scopeId)?.components || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``components``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visible``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:10374:34136:FUNCTION

.. rubric:: ``createRenderer``

.. code-block:: javascript

   createRenderer(host, initialOptions)

创建与 ``Renderer`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``77``—``437`` 行；所属函数 ``anonymous callback @ 4``。

**参数**

``host``
   调用方传入的 ``host`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``initialOptions`` （默认值 ``{}``）
   调用方传入的 ``initialOptions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ update(value, nextOptions = options) { const previousIdentity = \x60${options.taskId || ""}:${options.scopeId || "task"}\x60; const nextIdentity = \x60${nextOptions.taskId || ""}:${nextO…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``doc.getElementById``、``doc.createElement``、``doc.head.append``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:11071:11280:FUNCTION

.. rubric:: ``el``

.. code-block:: javascript

   el(tag, content, className)

实现 ``el`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``90`` 行；所属函数 ``createRenderer``。

**参数**

``tag``
   调用方传入的 ``tag`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``content``
   消息、文档或模型输出内容。

``className``
   调用方传入的 ``className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``。

**主要协作调用**：``doc.createElement``、``text``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:11298:11344:FUNCTION

.. rubric:: ``note``

.. code-block:: javascript

   note(value)

实现 ``note`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``91``—``91`` 行；所属函数 ``createRenderer``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``el``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:11345:12018:FUNCTION

.. rubric:: ``icon``

.. code-block:: javascript

   icon(kind)

实现 ``icon`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``101`` 行；所属函数 ``createRenderer``。

**参数**

``kind``
   调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``svg``。

**主要协作调用**：``doc.createElementNS``、``svg.setAttribute``、``path.setAttribute``、``svg.append``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:12018:12377:FUNCTION

.. rubric:: ``timestamp``

.. code-block:: javascript

   timestamp(value)

实现 ``timestamp`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``107`` 行；所属函数 ``createRenderer``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``date.toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })``。

**主要协作调用**：``Number.isFinite``、``date.getTime``、``date.toLocaleString``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:12377:12937:FUNCTION

.. rubric:: ``rememberOpen``

.. code-block:: javascript

   rememberOpen()

实现 ``rememberOpen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``117`` 行；所属函数 ``createRenderer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``host.querySelectorAll("details[data-observation-key]").forEach``、``host.querySelectorAll``、``host.querySelectorAll("[data-observation-scroll]").forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:12477:12651:FUNCTION

.. rubric:: ``host.querySelectorAll("details[data-observation-key]").forEach callback @ 109``

.. code-block:: javascript

   host.querySelectorAll("details[data-observation-key]").forEach callback @ 109(node)

作为 ``host.querySelectorAll("details[data-observation-key]").forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``112`` 行；所属函数 ``rememberOpen``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``viewState.get``、``viewState.set``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:12719:12929:FUNCTION

.. rubric:: ``host.querySelectorAll("[data-observation-scroll]").forEach callback @ 113``

.. code-block:: javascript

   host.querySelectorAll("[data-observation-scroll]").forEach callback @ 113(node)

作为 ``host.querySelectorAll("[data-observation-scroll]").forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``116`` 行；所属函数 ``rememberOpen``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``viewState.get``、``viewState.set``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:12937:13374:FUNCTION

.. rubric:: ``details``

.. code-block:: javascript

   details(title, key)

实现 ``details`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``118``—``127`` 行；所属函数 ``createRenderer``。

**参数**

``title``
   调用方传入的 ``title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``el``、``viewState.get``、``node.append``、``node.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:13232:13347:FUNCTION

.. rubric:: ``node.addEventListener callback @ 123``

.. code-block:: javascript

   node.addEventListener callback @ 123()

处理 ``node.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``123``—``125`` 行；所属函数 ``details``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``viewState.get``、``viewState.set``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:13374:13872:FUNCTION

.. rubric:: ``indicator``

.. code-block:: javascript

   indicator(component)

实现 ``indicator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``134`` 行；所属函数 ``createRenderer``。

**参数**

``component``
   调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``node``。

**主要协作调用**：``el``、``["default", "success", "warning", "danger", "muted"].includes``、``node.append``、``format``、``note``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:13872:14990:FUNCTION

.. rubric:: ``sourceCell``

.. code-block:: javascript

   sourceCell(usage, key)

实现 ``sourceCell`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``135``—``148`` 行；所属函数 ``createRenderer``。

**参数**

``usage``
   调用方传入的 ``usage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``el("span", "未知")``、``node``。

**主要协作调用**：``Array.isArray``、``Object.entries(provenance).filter``、``Object.entries``、``el``、``entries.map``、``sources.has``、``name``、``details``、``node.classList.add``、``entries.forEach``、``node.append``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:14096:14152:FUNCTION

.. rubric:: ``Object.entries(provenance).filter callback @ 138``

.. code-block:: javascript

   Object.entries(provenance).filter callback @ 138([, value])

作为 ``Object.entries(provenance).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``sourceCell``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.trim``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:14230:14332:FUNCTION

.. rubric:: ``name``

.. code-block:: javascript

   name(value)

实现 ``name`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``sourceCell``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:14376:14410:FUNCTION

.. rubric:: ``entries.map callback @ 141``

.. code-block:: javascript

   entries.map callback @ 141([, value])

作为 ``entries.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``sourceCell``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:14798:14944:FUNCTION

.. rubric:: ``entries.forEach callback @ 146``

.. code-block:: javascript

   entries.forEach callback @ 146([field, value])

作为 ``entries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``sourceCell``。

**参数**

``[field, value]``
   调用方传入的 ``field, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``list.append``、``el``、``name``、``value.toLowerCase``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:14990:16429:FUNCTION

.. rubric:: ``tableNode``

.. code-block:: javascript

   tableNode(columns, rows, key, modelUsage)

实现 ``tableNode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``174`` 行；所属函数 ``createRenderer``。

**参数**

``columns``
   调用方传入的 ``columns`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``rows``
   调用方传入的 ``rows`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``modelUsage`` （默认值 ``false``）
   调用方传入的 ``modelUsage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``wrap``。

**主要协作调用**：``el``、``columns.forEach``、``head.append``、``table.append``、``(Array.isArray(rows) ? rows : []).slice(0, 100).forEach``、``(Array.isArray(rows) ? rows : []).slice``、``Array.isArray``、``wrap.append``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:15242:15292:FUNCTION

.. rubric:: ``columns.forEach callback @ 152``

.. code-block:: javascript

   columns.forEach callback @ 152(column)

作为 ``columns.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``tableNode``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``heading.append``、``el``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:15437:16362:FUNCTION

.. rubric:: ``(Array.isArray(rows) ? rows : []).slice(0, 100).forEach callback @ 155``

.. code-block:: javascript

   (Array.isArray(rows) ? rows : []).slice(0, 100).forEach callback @ 155(row, index)

作为 ``(Array.isArray(rows) ? rows : []).slice(0, 100).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``155``—``172`` 行；所属函数 ``tableNode``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``el``、``columns.forEach``、``body.append``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:15508:16327:FUNCTION

.. rubric:: ``columns.forEach callback @ 157``

.. code-block:: javascript

   columns.forEach callback @ 157(column)

作为 ``columns.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``170`` 行；所属函数 ``(Array.isArray(rows) ? rows : []).slice(0, 100).forEach callback @ 155``。

**参数**

``column``
   调用方传入的 ``column`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``el``、``td.append``、``sourceCell``、``Object.hasOwn``、``text``、``format``、``finite``、``note``、``tr.append``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:16429:19508:FUNCTION

.. rubric:: ``pagedTable``

.. code-block:: javascript

   pagedTable(component, key, columns, modelUsage, detailsHost)

实现 ``pagedTable`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``175``—``223`` 行；所属函数 ``createRenderer``。

**参数**

``component``
   调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``columns``
   调用方传入的 ``columns`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``modelUsage`` （默认值 ``false``）
   调用方传入的 ``modelUsage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``detailsHost`` （默认值 ``null``）
   调用方传入的 ``detailsHost`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``block``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``viewState.get``、``el``、``block.append``、``tableNode``、``previous.addEventListener``、``next.addEventListener``、``refresh.addEventListener``、``detailsHost.addEventListener``、``queueMicrotask``、``nav.append``、``Math.floor``、``format``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:17682:18530:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   async load(nextOffset)

加载与 ``load`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``191``—``206`` 行；所属函数 ``pagedTable``。

**参数**

``nextOffset``
   调用方传入的 ``nextOffset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``viewState.set``、``render``、``options.loadRows``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:18574:18619:FUNCTION

.. rubric:: ``previous.addEventListener callback @ 207``

.. code-block:: javascript

   previous.addEventListener callback @ 207()

处理 ``previous.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``pagedTable``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``、``Math.max``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:18660:18692:FUNCTION

.. rubric:: ``next.addEventListener callback @ 208``

.. code-block:: javascript

   next.addEventListener callback @ 208()

处理 ``next.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``208``—``208`` 行；所属函数 ``pagedTable``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:18736:18760:FUNCTION

.. rubric:: ``refresh.addEventListener callback @ 209``

.. code-block:: javascript

   refresh.addEventListener callback @ 209()

处理 ``refresh.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``209``—``209`` 行；所属函数 ``pagedTable``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:18875:19050:FUNCTION

.. rubric:: ``loadWhenOpen``

.. code-block:: javascript

   loadWhenOpen()

加载与 ``When Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``211``—``214`` 行；所属函数 ``pagedTable``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:19508:21246:FUNCTION

.. rubric:: ``usage``

.. code-block:: javascript

   usage(component, key)

实现 ``usage`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``224``—``247`` 行；所属函数 ``createRenderer``。

**参数**

``component``
   调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``section``。

**主要协作调用**：``el``、``section.append``、``Object.keys``、``fields.forEach``、``note``、``details``、``stages.append``、``tableNode``、``Object.entries(tokenNames).slice(0, 3).map``、``Object.entries(tokenNames).slice``、``Object.entries``、``calls.append``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:19851:20016:FUNCTION

.. rubric:: ``fields.forEach callback @ 228``

.. code-block:: javascript

   fields.forEach callback @ 228(field)

作为 ``fields.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``usage``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``grid.append``、``indicator``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:20529:20590:FUNCTION

.. rubric:: ``Object.entries(tokenNames).slice(0, 3).map callback @ 236``

.. code-block:: javascript

   Object.entries(tokenNames).slice(0, 3).map callback @ 236([field, title])

作为 ``Object.entries(tokenNames).slice(0, 3).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``236``—``236`` 行；所属函数 ``usage``。

**参数**

``[field, title]``
   调用方传入的 ``field, title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:21246:32096:FUNCTION

.. rubric:: ``renderComponent``

.. code-block:: javascript

   renderComponent(component, depth)

渲染与 ``Component`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``248``—``402`` 行；所属函数 ``createRenderer``。

**参数**

``component``
   调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``depth`` （默认值 ``0``）
   调用方传入的 ``depth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``indicator(component)``、``indicator({ title: component.title, value: component.pagination?.total ?? component.rows?.length, format: "number", unit: "条" })``、``usage(component, key)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``visible``、``indicator``、``el``、``node.append``、``(component.components || []).slice(0, 100).forEach``、``(component.components || []).slice``、``heading.append``、``format``、``finite``、``Math.max``、``Math.min``、``bar.setAttribute``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:21970:22064:FUNCTION

.. rubric:: ``(component.components || []).slice(0, 100).forEach callback @ 258``

.. code-block:: javascript

   (component.components || []).slice(0, 100).forEach callback @ 258(child)

作为 ``(component.components || []).slice(0, 100).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``renderComponent``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderComponent``、``body.append``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:24228:24697:FUNCTION

.. rubric:: ``list.addEventListener callback @ 290``

.. code-block:: javascript

   list.addEventListener callback @ 290(event)

处理 ``list.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``290``—``296`` 行；所属函数 ``renderComponent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``Math.abs``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:24776:24809:FUNCTION

.. rubric:: ``rows.find callback @ 297``

.. code-block:: javascript

   rows.find callback @ 297(row)

作为 ``rows.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``renderComponent``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:24862:25457:FUNCTION

.. rubric:: ``selected.forEach callback @ 298``

.. code-block:: javascript

   selected.forEach callback @ 298(row)

作为 ``selected.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``298``—``304`` 行；所属函数 ``renderComponent``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``el``、``text``、``phase.append``、``format``、``options.phaseAction``、``button.addEventListener``、``list.append``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:25993:26028:FUNCTION

.. rubric:: ``items.find callback @ 314``

.. code-block:: javascript

   items.find callback @ 314(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``renderComponent``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:26083:27592:FUNCTION

.. rubric:: ``selected.forEach callback @ 315``

.. code-block:: javascript

   selected.forEach callback @ 315(item)

作为 ``selected.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``315``—``332`` 行；所属函数 ``renderComponent``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``el``、``text``、``rail.setAttribute``、``rail.append``、``heading.append``、``content.append``、``timestamp``、``meta.append``、``finite``、``format``、``options.phaseAction``、``button.addEventListener``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:28062:28158:FUNCTION

.. rubric:: ``fields.forEach callback @ 340``

.. code-block:: javascript

   fields.forEach callback @ 340([field, title])

作为 ``fields.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``340``—``340`` 行；所属函数 ``renderComponent``。

**参数**

``[field, title]``
   调用方传入的 ``field, title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``grid.append``、``indicator``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:28346:28391:FUNCTION

.. rubric:: ``Object.entries(component.byKind).map callback @ 343``

.. code-block:: javascript

   Object.entries(component.byKind).map callback @ 343([kind, counters])

作为 ``Object.entries(component.byKind).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``343``—``343`` 行；所属函数 ``renderComponent``。

**参数**

``[kind, counters]``
   调用方传入的 ``kind, counters`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:29371:31836:FUNCTION

.. rubric:: ``items.forEach callback @ 360``

.. code-block:: javascript

   items.forEach callback @ 360(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``360``—``395`` 行；所属函数 ``renderComponent``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``el``、``/^cwm:\/\/artifact\/([A-Za-z0-9._-]+)$/.exec``、``fileIcon.setAttribute``、``fileIcon.append``、``icon``、``info.append``、``format``、``body.append``、``options.artifactUrl``、``link.setAttribute``、``link.append``、``link.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:30608:31154:FUNCTION

.. rubric:: ``link.addEventListener callback @ 375``

.. code-block:: javascript

   link.addEventListener callback @ 375(event)

处理 ``link.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``375``—``383`` 行；所属函数 ``items.forEach callback @ 360``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``link.setAttribute``、``card.querySelector(".observation-error")?.remove``、``card.querySelector``、``Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch((error) => { card.append(el("p", error…``、``Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch``、``Promise.resolve().then``、``Promise.resolve``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:30882:30932:FUNCTION

.. rubric:: ``Promise.resolve().then callback @ 380``

.. code-block:: javascript

   Promise.resolve().then callback @ 380()

处理 ``Promise.resolve().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``link.addEventListener callback @ 375``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``options.downloadArtifact``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:30940:31066:FUNCTION

.. rubric:: ``Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch callback @ 380``

.. code-block:: javascript

   Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch callback @ 380(error)

处理 ``Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``380``—``382`` 行；所属函数 ``link.addEventListener callback @ 375``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``card.append``、``el``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:31076:31134:FUNCTION

.. rubric:: ``Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch((error) => { card.append(el("p", error… callback @ 382``

.. code-block:: javascript

   Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch((error) => { card.append(el("p", error… callback @ 382()

实现 ``Promise.resolve().then(() => options.downloadArtifact(item.url, filename)).catch((error) => { card.append(el("p", error…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``382``—``382`` 行；所属函数 ``link.addEventListener callback @ 375``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``link.removeAttribute``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:32096:33131:FUNCTION

.. rubric:: ``render``

.. code-block:: javascript

   render()

渲染与 ``render`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``403``—``422`` 行；所属函数 ``createRenderer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``rememberOpen``、``host.classList.add``、``host.classList.toggle``、``Boolean``、``doc.createDocumentFragment``、``components(observation, options.scopeId, options.view).slice(0, 100).forEach``、``components(observation, options.scopeId, options.view).slice``、``components``、``host.replaceChildren``、``host.querySelectorAll("[data-observation-scroll]").forEach``、``host.querySelectorAll``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:32449:32820:FUNCTION

.. rubric:: ``components(observation, options.scopeId, options.view).slice(0, 100).forEach callback @ 409``

.. code-block:: javascript

   components(observation, options.scopeId, options.view).slice(0, 100).forEach callback @ 409(component)

作为 ``components(observation, options.scopeId, options.view).slice(0, 100).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``409``—``416`` 行；所属函数 ``render``。

**参数**

``component``
   调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``renderComponent``、``el``、``fragment.append``、``indicatorGrid.append``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:32926:33123:FUNCTION

.. rubric:: ``host.querySelectorAll("[data-observation-scroll]").forEach callback @ 418``

.. code-block:: javascript

   host.querySelectorAll("[data-observation-scroll]").forEach callback @ 418(node)

作为 ``host.querySelectorAll("[data-observation-scroll]").forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``418``—``421`` 行；所属函数 ``render``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``viewState.get``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:33144:34031:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(value, nextOptions)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``424``—``434`` 行；所属函数 ``createRenderer``。

**参数**

``value``
   待读取、转换或校验的值。

``nextOptions`` （默认值 ``options``）
   调用方传入的 ``nextOptions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``finite``、``viewState.clear``、``host.replaceChildren``、``JSON.stringify``、``scope``、``render``。

.. CWM-AST-FUNCTION src/features/tasks/observation-components.js:34032:34124:FUNCTION

.. rubric:: ``dispose``

.. code-block:: javascript

   dispose()

实现 ``dispose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``435``—``435`` 行；所属函数 ``createRenderer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``viewState.clear``、``host.replaceChildren``。
