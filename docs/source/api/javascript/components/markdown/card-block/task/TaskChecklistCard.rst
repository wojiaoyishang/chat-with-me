src/components/markdown/card-block/task/TaskChecklistCard 模块
============================================================

.. js:module:: src/components/markdown/card-block/task/TaskChecklistCard

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/task/TaskChecklistCard.jsx``
* **模块标识**：``src/components/markdown/card-block/task/TaskChecklistCard``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------

``react``、``lucide-react``、``react-i18next``、``@/components/ui/badge``、``@/components/ui/card``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskChecklistCard.jsx:621:3966:FUNCTION

.. rubric:: ``memo callback @ 21``

.. code-block:: javascript

   memo callback @ 21({content = ''})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``92`` 行。

**参数**

``{content = ''}``
   调用方传入的 ``content = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Card className="my-3 gap-0 overflow-hidden rounded-lg border-gray-200 bg-white/70 py-0"> <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border…``。

**主要协作调用**：``useTranslation``、``useMemo``、``data.items.filter``、``t``、``data.items.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskChecklistCard.jsx:702:1042:FUNCTION

.. rubric:: ``useMemo callback @ 23``

.. code-block:: javascript

   useMemo callback @ 23()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``23``—``33`` 行；所属函数 ``memo callback @ 21``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ items: Array.isArray(parsed?.items) ? parsed.items : [], status: String(parsed?.status \|\| 'running'), }``、``{items: [], status: 'invalid'}``。

**主要协作调用**：``JSON.parse``、``String``、``Array.isArray``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskChecklistCard.jsx:1102:1138:FUNCTION

.. rubric:: ``data.items.filter callback @ 35``

.. code-block:: javascript

   data.items.filter callback @ 35(item)

作为 ``data.items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``memo callback @ 21``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskChecklistCard.jsx:2122:3568:FUNCTION

.. rubric:: ``data.items.map callback @ 56``

.. code-block:: javascript

   data.items.map callback @ 56(item, index)

作为 ``data.items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``56``—``80`` 行；所属函数 ``memo callback @ 21``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item?.id \|\| \`${index}-${item?.text \|\| ''}\`} className="flex items-start gap-2.5 px-3.5 py-2.5" > <Icon className={\`mt-0.5 h-4 w-4 shrink-0 ${className}\`}/> <div classN…``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskChecklistCard.jsx:3967:4013:FUNCTION

.. rubric:: ``memo callback @ 92``

.. code-block:: javascript

   memo callback @ 92(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``92`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
