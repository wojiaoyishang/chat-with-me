src/features/workflows/WorkflowResourcePreview 模块
==========================================================================================================

.. js:module:: src/features/workflows/WorkflowResourcePreview

Preview the same resource and parsed text exposed by the attachment browser.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowResourcePreview.jsx``
* **模块标识**：``src/features/workflows/WorkflowResourcePreview``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/dialog``、``@/lib/apiClient.js``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:441:671:FUNCTION

.. js:function:: formatSize(size)

   格式化与 ``Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``22`` 行。

   **参数**

   ``size``
      调用方传入的 ``size`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``""``、``\x60${size} B\x60``、``\x60${(size / 1024).toFixed(1)} KB\x60``、``\x60${(size / (1024 * 1024)).toFixed(1)} MB\x60``。

   **主要协作调用**：``Number.isFinite``、``(size / 1024).toFixed``、``(size / (1024 * 1024)).toFixed``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:671:7769:FUNCTION

.. js:function:: WorkflowResourcePreview({ item, sourceKind, onClose })

   Preview the same resource and parsed text exposed by the attachment browser.

   **性质**：同步函数；导出 API；源码第 ``25``—``232`` 行。

   **参数**

   ``{ item, sourceKind, onClose }``
      调用方传入的 ``item, sourceKind, onClose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Dialog open onOpenChange={(open) => { if (!open) onClose(); }} > <DialogContent className="flex h-[min(82dvh,780px)] w-[min(90vw,900px)] max-w-[min(90vw,900px)] flex-col gap-0…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``String(item?.fileType || item?.format || "").toLowerCase``、``String``、``String(name).toLowerCase().endsWith``、``String(name).toLowerCase``、``resolveResourceUrl``、``useCallback``、``useEffect``、``blocks.map((block) => block.text || "").join``、``blocks.map``、``[item.fileType || item.type, formatSize(item.size)] .filter(Boolean) .join``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:1712:3129:FUNCTION

.. rubric:: ``useCallback callback @ 47``

.. code-block:: javascript

   async useCallback callback @ 47(offset, currentVersion)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``47``—``89`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

``offset``
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``currentVersion``
   调用方传入的 ``currentVersion`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setTimeout``、``setLoading``、``setError``、``apiClient.post``、``setBlocks``、``setVersion``、``setTotal``、``setHasMore``、``Boolean``、``clearTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:1946:2014:FUNCTION

.. rubric:: ``setTimeout callback @ 52``

.. code-block:: javascript

   setTimeout callback @ 52()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``52``—``55`` 行；所属函数 ``useCallback callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:2465:2583:FUNCTION

.. rubric:: ``setBlocks callback @ 71``

.. code-block:: javascript

   setBlocks callback @ 71(previous)

设置与 ``Blocks`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``71``—``74`` 行；所属函数 ``useCallback callback @ 47``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:3177:3312:FUNCTION

.. rubric:: ``useEffect callback @ 93``

.. code-block:: javascript

   useEffect callback @ 93()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``93``—``99`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { request.current?.abort(); request.current = null; }``。

**主要协作调用**：``read``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:3231:3307:FUNCTION

.. rubric:: ``returned callback @ 95``

.. code-block:: javascript

   returned callback @ 95()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``95``—``98`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.current?.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:3384:3411:FUNCTION

.. rubric:: ``blocks.map callback @ 102``

.. code-block:: javascript

   blocks.map callback @ 102(block)

作为 ``blocks.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

``block``
   调用方传入的 ``block`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:3562:3611:FUNCTION

.. rubric:: ``onOpenChange callback @ 108``

.. code-block:: javascript

   onOpenChange callback @ 108(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``110`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:4549:4574:FUNCTION

.. rubric:: ``onError callback @ 133``

.. code-block:: javascript

   onError callback @ 133()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMediaError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:4824:4849:FUNCTION

.. rubric:: ``onError callback @ 142``

.. code-block:: javascript

   onError callback @ 142()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMediaError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:5095:5120:FUNCTION

.. rubric:: ``onError callback @ 151``

.. code-block:: javascript

   onError callback @ 151()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMediaError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:6144:6183:FUNCTION

.. rubric:: ``onClick callback @ 180``

.. code-block:: javascript

   onClick callback @ 180()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``read``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowResourcePreview.jsx:6723:6762:FUNCTION

.. rubric:: ``onClick callback @ 197``

.. code-block:: javascript

   onClick callback @ 197()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``WorkflowResourcePreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``read``。
