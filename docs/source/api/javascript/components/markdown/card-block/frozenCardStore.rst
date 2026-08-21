src/components/markdown/card-block/frozenCardStore 模块
=====================================================

.. js:module:: src/components/markdown/card-block/frozenCardStore

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/frozenCardStore.js``
* **模块标识**：``src/components/markdown/card-block/frozenCardStore``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/frozenCardStore.js:96:185:FUNCTION

.. js:function:: getFrozenCardKey(contextId, id)

   读取与 ``Frozen Card Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``7`` 行。

   **参数**

   ``contextId``
      目标对象的公共或运行时标识。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\`${contextId \|\| '__default__'}::${id \|\| '__empty__'}\```。

.. CWM-AST-FUNCTION src/components/markdown/card-block/frozenCardStore.js:399:742:FUNCTION

.. js:function:: hasExplicitStableFlag(rawEntry)

   实现 ``hasExplicitStableFlag`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``13``—``26`` 行。

   **参数**

   ``rawEntry``
      调用方传入的 ``rawEntry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``( rawEntry.stable === true \|\| rawEntry.isStable === true \|\| rawEntry.frozen === true \|\| rawEntry.isFrozen === true \|\| rawEntry.finished === true \|\| rawEntry.isFinished === true )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/frozenCardStore.js:778:1351:FUNCTION

.. js:function:: isFinalCardContent(type, content, rawEntry)

   判断与 ``Final Card Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``28``—``52`` 行。

   **参数**

   ``type``
      调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``content``
      消息、文档或模型输出内容。

   ``rawEntry``（默认值 ``null``）
      调用方传入的 ``rawEntry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``TOOL_LOG_FINAL_RE.test(safeContent)``、``SIMPLE_FINAL_RE.test(safeContent)``、``AGENT_FINAL_RE.test(safeContent)``。

   **主要协作调用**：``hasExplicitStableFlag``、``String(content ?? '').trimEnd``、``String``、``TOOL_LOG_FINAL_RE.test``、``SIMPLE_FINAL_RE.test``、``AGENT_FINAL_RE.test``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/frozenCardStore.js:1387:1481:FUNCTION

.. js:function:: getFrozenCardEntry(contextId, id)

   读取与 ``Frozen Card Entry`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``54``—``56`` 行。

   **参数**

   ``contextId``
      目标对象的公共或运行时标识。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``frozenCardMap.get(getFrozenCardKey(contextId, id)) \|\| null``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``frozenCardMap.get``、``getFrozenCardKey``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/frozenCardStore.js:1521:2244:FUNCTION

.. js:function:: freezeCardEntryIfFinal({ contextId, id, normalized, rawEntry, })

   实现 ``freezeCardEntryIfFinal`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``58``—``95`` 行。

   **参数**

   ``{ contextId, id, normalized, rawEntry, }``
      调用方传入的 `` contextId, id, normalized, rawEntry, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized``、``existing``、``frozen``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``getFrozenCardKey``、``frozenCardMap.get``、``isFinalCardContent``、``frozenCardMap.keys().next``、``frozenCardMap.keys``、``frozenCardMap.delete``、``frozenCardMap.set``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/frozenCardStore.js:2287:2500:FUNCTION

.. js:function:: clearFrozenCardsByContext(contextId)

   清空与 ``Frozen Cards By Context`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``97``—``105`` 行。

   **参数**

   ``contextId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``frozenCardMap.keys``、``key.startsWith``、``frozenCardMap.delete``。
