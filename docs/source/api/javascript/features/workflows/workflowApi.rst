src/features/workflows/workflowApi 模块
==================================================================================

.. js:module:: src/features/workflows/workflowApi

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowApi.js``
* **模块标识**：``src/features/workflows/workflowApi``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``@/lib/apiClient.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:114:188:FUNCTION

.. js:function:: normalizeWorkflowTask(task)

   规范化与 ``Workflow Task`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``4``—``7`` 行。

   **参数**

   ``task``
      调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:229:286:FUNCTION

.. rubric:: ``catalog``

.. code-block:: javascript

   catalog(signal)

实现 ``catalog`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``9`` 行。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:300:359:FUNCTION

.. rubric:: ``templates``

.. code-block:: javascript

   templates(signal)

实现 ``templates`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``10`` 行。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:372:465:FUNCTION

.. rubric:: ``template``

.. code-block:: javascript

   template(id, signal)

实现 ``template`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``12`` 行。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:482:637:FUNCTION

.. rubric:: ``saveTemplate``

.. code-block:: javascript

   saveTemplate(payload, id)

保存与 ``Template`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``13``—``16`` 行。

**参数**

``payload``
   事件或业务操作的结构化载荷。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``、``apiClient.post``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:656:796:FUNCTION

.. rubric:: ``deleteTemplate``

.. code-block:: javascript

   deleteTemplate(id, revision)

删除与 ``Template`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``17``—``20`` 行。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``revision``
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.delete``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:809:902:FUNCTION

.. rubric:: ``validate``

.. code-block:: javascript

   validate({ graph, runnable = false })

校验与 ``validate`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``21``—``22`` 行。

**参数**

``{ graph, runnable = false }``
   调用方传入的 ``graph, runnable = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:910:1078:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   async run(payload)

实现 ``run`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``23``—``26`` 行。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...result, task: normalizeWorkflowTask(result.task || result) }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``normalizeWorkflowTask``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:1098:1158:FUNCTION

.. rubric:: ``schemaTemplates``

.. code-block:: javascript

   schemaTemplates(signal)

实现 ``schemaTemplates`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``27`` 行。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:1170:1220:FUNCTION

.. rubric:: ``schemas``

.. code-block:: javascript

   schemas(signal)

实现 ``schemas`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``28`` 行。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:1235:1372:FUNCTION

.. rubric:: ``saveSchema``

.. code-block:: javascript

   saveSchema(payload, id)

保存与 ``Schema`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``29``—``32`` 行。

**参数**

``payload``
   事件或业务操作的结构化载荷。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.put``、``encodeURIComponent``、``apiClient.post``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:1391:1447:FUNCTION

.. rubric:: ``validateSchema``

.. code-block:: javascript

   validateSchema(text)

校验与 ``Schema`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``33``—``33`` 行。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:1456:1895:FUNCTION

.. rubric:: ``task``

.. code-block:: javascript

   async task(id, signal)

实现 ``task`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``34``—``49`` 行。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...result, task: normalizeWorkflowTask({ ...result, ...(result.task || {}), runtime: result.runtime || result.task?.runtime, stages: result.stages || result.task?.stages, usage:…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``、``normalizeWorkflowTask``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:1910:2115:FUNCTION

.. rubric:: ``nodeOutput``

.. code-block:: javascript

   nodeOutput(taskId, nodeId, offset, signal)

实现 ``nodeOutput`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``54`` 行。

**参数**

``taskId``
   目标对象的公共或运行时标识。

``nodeId``
   目标对象的公共或运行时标识。

``offset`` （默认值 ``0``）
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:2124:2501:FUNCTION

.. rubric:: ``logs``

.. code-block:: javascript

   logs(taskId, { offset = 0, limit = 50, level = "all", nodeId, signal })

实现 ``logs`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``55``—``69`` 行。

**参数**

``taskId``
   目标对象的公共或运行时标识。

``{ offset = 0, limit = 50, level = "all", nodeId, signal }`` （默认值 ``{}``）
   调用方传入的 ``offset = 0, limit = 50, level = "all", nodeId, signal`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient.get( \x60${base}/tasks/${encodeURIComponent(taskId)}/logs?${query}\x60, { signal }, )``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``query.set``、``apiClient.get``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/workflows/workflowApi.js:2516:2605:FUNCTION

.. rubric:: ``taskAction``

.. code-block:: javascript

   taskAction(taskId, action)

实现 ``taskAction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``71`` 行。

**参数**

``taskId``
   目标对象的公共或运行时标识。

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.post``、``encodeURIComponent``。
