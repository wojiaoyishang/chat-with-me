如何阅读完整函数参考
================================================================================

完整 JavaScript API 参考从 TypeScript Compiler AST 生成，既包含导出 API，也包含 React 组件内部
真正影响生命周期、状态和事件处理的函数。它用于回答“这个函数在哪里、输入输出是什么、还会调用
什么、会修改什么状态”。

覆盖范围
--------------------------------------------------------------------------------

生成器扫描 ``src`` 中全部 ``.js``、``.jsx``、``.ts`` 和 ``.tsx`` 文件，并记录：

* 导出和模块内部的顶层函数；
* React Component 与自定义 Hook；
* Class Method、Accessor 和 Constructor；
* 具名局部函数；
* ``useEffect``、Promise、Event、集合操作、JSX Handler 和 State Updater 匿名回调。

每个 Function-like AST 节点都有由源码起止位置生成的覆盖标记。独立脚本
``validate_javascript_api.mjs`` 会重新解析源码，再与生成页面逐项比较。

.. important::

   React 中大量重要逻辑位于匿名回调中，只统计 ``export function`` 会遗漏真正的运行行为。CWM
   的函数参考因此把所有 Function-like 节点纳入覆盖，而不是只列公开导出。

条目结构
--------------------------------------------------------------------------------

模块、函数、类和方法分别使用 JavaScript Domain：

.. code-block:: rst

   .. js:module:: src/runtime/transport/WebSocketTransport
      :no-index:

   .. js:function:: createEvent(options)
      :no-index:

   .. js:class:: WebSocketTransport()
      :no-index:

      .. js:method:: WebSocketTransport.sendEvent(event)
         :no-index:

每个函数条目说明：

``功能说明``
   优先读取 JSDoc；否则根据函数名、React 上下文和调用位置生成说明。

``性质``
   标出同步/异步、导出/模块内部/局部实现及源码起止行。

``参数``
   记录参数名、TypeScript 类型、默认值、可选参数、剩余参数和常用业务语义。

``返回值``
   记录类型标注或代表性 ``return`` 表达式；组件和回调的隐式 ``undefined`` 也会明确说明。

``副作用``
   标出 HTTP、WebSocket、Event Runtime、订阅、浏览器存储、媒体资源、路由和状态更新。

``显式抛出``
   记录函数体中明确抛出的异常。

``主要协作调用``
   列出直接调用的主要函数，便于继续追踪运行链路。

匿名回调没有稳定导出名，因此以调用上下文和源码行号命名。例如：

* ``useEffect callback @ 120``；
* ``onEvent callback @ 244``；
* ``map callback @ 86``；
* ``onClick callback @ 310``。

推荐检索方式
--------------------------------------------------------------------------------

#. 从 :doc:`overview` 按任务确定 Feature 或 Runtime 区域。
#. 在 Sphinx 搜索框输入组件、Hook、事件名或函数名。
#. 先阅读顶层函数，再阅读它列出的内部回调。
#. 查看副作用，确认状态更新、订阅和资源释放是否成对。
#. 回到架构章节确认功能属于 Surface、Store、Protocol 还是 Transport。

.. tip::

   排查重复订阅、页面卡死或循环回复时，可在 API 参考中搜索 ``useEffect callback``、
   ``onEvent callback`` 和 ``reply``，再按源码行号检查清理函数与事件方向。

提高说明准确度
--------------------------------------------------------------------------------

公共 Runtime API、复杂 Hook 和关键状态合并函数应添加 JSDoc：

.. code-block:: javascript

   /**
    * 订阅指定方向的语义事件，并在组件卸载时注销监听器。
    */
   function subscribeEvent(options) {
     // ...
   }

生成器会优先使用 JSDoc 作为功能说明；TypeScript 类型和默认值也会直接进入文档。

.. warning::

   静态分析可以识别直接调用和常见浏览器副作用，但无法完整推断动态属性、运行时注入和第三方组件
   内部行为。修改 Voice、Transport 或 Event Store 时仍必须执行协议测试和生产构建。
