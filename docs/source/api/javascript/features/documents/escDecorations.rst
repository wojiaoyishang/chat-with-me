src/features/documents/escDecorations 模块
========================================================================================

.. js:module:: src/features/documents/escDecorations

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/escDecorations.js``
* **模块标识**：``src/features/documents/escDecorations``
* **顶层函数/组件/Hook**：2
* **类**：1
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``@codemirror/state``、``@codemirror/view``。

类
--------------------------------------------------------------------------------

.. js:class:: DraftWidget()

   封装 ``DraftWidget`` 的状态和方法。

   **性质**：模块内部类；源码第 ``4`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/features/documents/escDecorations.js:220:331:FUNCTION

   .. js:method:: constructor(row, actions)

      初始化类实例并建立运行状态。

      **性质**：同步函数；局部实现；源码第 ``5``—``9`` 行。

      **参数**

      ``row``
         调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``actions``
         调用方传入的 ``actions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

   .. CWM-AST-FUNCTION src/features/documents/escDecorations.js:331:421:FUNCTION

   .. js:method:: lineBreaks()

      实现 ``lineBreaks`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``10``—``12`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``(this.row.text || '').split('\n').length - 1``。

      **主要协作调用**：``(this.row.text || '').split``。

   .. CWM-AST-FUNCTION src/features/documents/escDecorations.js:421:514:FUNCTION

   .. js:method:: eq(other)

      实现 ``eq`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``13``—``15`` 行。

      **参数**

      ``other``
         调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``JSON.stringify(this.row) === JSON.stringify(other.row)``。

      **主要协作调用**：``JSON.stringify``。

   .. CWM-AST-FUNCTION src/features/documents/escDecorations.js:514:2188:FUNCTION

   .. js:method:: toDOM()

      实现 ``toDOM`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``16``—``52`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``root``。

      **副作用**

      * 注册事件、DOM 或运行时订阅。
      * 读取或修改浏览器全局对象、页面或历史状态。

      **主要协作调用**：``document.createElement``、``root.setAttribute``、``root.append``、``button.addEventListener``。

      **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/features/documents/escDecorations.js:2188:2235:FUNCTION

   .. js:method:: ignoreEvent()

      实现 ``ignoreEvent`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``53``—``55`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``true``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:2237:3064:FUNCTION

.. js:function:: escDecorations(actions)

   实现 ``escDecorations`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``57``—``76`` 行。

   **参数**

   ``actions``
      调用方传入的 ``actions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``StateField.define({ create: () => Decoration.none, update(value, transaction) { value = value.map(transaction.changes); for (const effect of transaction.effects) if (effect.is(set…``。

   **主要协作调用**：``StateField.define``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:4051:6281:FUNCTION

.. js:function:: draftPreviewPlugin({ ranges = [] })

   实现 ``draftPreviewPlugin`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``107``—``150`` 行。

   **参数**

   ``{ ranges = [] }``（默认值 ``{}``）
      调用方传入的 ``ranges =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree) => { const visit = (parent) => { if (!parent.children) return; parent.children = parent.children.flatMap((node) => { if (node.type !== 'text' || node.position?.start?.offse…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:1936:2108:FUNCTION

.. rubric:: ``button.addEventListener callback @ 44``

.. code-block:: javascript

   button.addEventListener callback @ 44(event)

处理 ``button.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``44``—``48`` 行；所属函数 ``toDOM``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``this.actions``。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:2326:2348:FUNCTION

.. rubric:: ``create``

.. code-block:: javascript

   create()

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``escDecorations``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:2349:2989:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(value, transaction)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``73`` 行；所属函数 ``escDecorations``。

**参数**

``value``
   待读取、转换或校验的值。

``transaction``
   调用方传入的 ``transaction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``value``。

**主要协作调用**：``value.map``、``effect.is``、``Decoration.set``、``effect.value.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:2623:2872:FUNCTION

.. rubric:: ``effect.value.map callback @ 65``

.. code-block:: javascript

   effect.value.map callback @ 65(row)

作为 ``effect.value.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``65``—``68`` 行；所属函数 ``update``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Decoration.widget({ widget: new DraftWidget(row, actions), side: 1 }).range``、``Decoration.widget``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:3007:3053:FUNCTION

.. rubric:: ``provide``

.. code-block:: javascript

   provide(field)

实现 ``provide`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``escDecorations``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``EditorView.decorations.from``。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:4198:6278:FUNCTION

.. rubric:: ``returned callback @ 108``

.. code-block:: javascript

   returned callback @ 108(tree)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``149`` 行；所属函数 ``draftPreviewPlugin``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visit``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:4232:6250:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(parent)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``109``—``147`` 行；所属函数 ``returned callback @ 108``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``parent.children.flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:4343:6238:FUNCTION

.. rubric:: ``parent.children.flatMap callback @ 111``

.. code-block:: javascript

   parent.children.flatMap callback @ 111(node)

实现 ``parent.children.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``111``—``146`` 行；所属函数 ``visit``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[node]``、``result``。

**主要协作调用**：``visit``、``ranges.filter``、``matching.sort``、``Math.max``、``Math.min``、``result.push``、``node.value.slice``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:4684:4731:FUNCTION

.. rubric:: ``ranges.filter callback @ 118``

.. code-block:: javascript

   ranges.filter callback @ 118(range)

作为 ``ranges.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``parent.children.flatMap callback @ 111``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/escDecorations.js:4904:4929:FUNCTION

.. rubric:: ``matching.sort callback @ 122``

.. code-block:: javascript

   matching.sort callback @ 122(a, b)

作为 ``matching.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``parent.children.flatMap callback @ 111``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
