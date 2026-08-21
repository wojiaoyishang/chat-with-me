模块导航
========

.. list-table:: 常见任务与入口
   :header-rows: 1
   :widths: 30 35 35

   * - 任务
     - 首要模块
     - 继续阅读
   * - 修改 Frame
     - ``runtime/protocol``
     - :doc:`protocol`
   * - 修改连接
     - ``WebSocketContext``、``runtime/transport``
     - :doc:`transport`、:doc:`websocket_context`
   * - 修改事件订阅
     - ``context/useEventStore``
     - :doc:`event_store`
   * - 修改聊天
     - ``features/chat``
     - :doc:`chat_surface`
   * - 修改摘要
     - ``messageSummaries.js``
     - :doc:`message_summaries`
   * - 修改朗读
     - ``useChatSpeech``、``speech``
     - :doc:`speech_runtime`
   * - 修改卡片
     - ``components/markdown/card-block/widget``
     - :doc:`widget_runtime`

完整 API
--------

:doc:`../api/javascript/index` 通过 TypeScript AST 覆盖每个源码模块，包括：

* 导出/内部顶层函数；
* React Component 与 Hook；
* Class Method；
* 具名局部函数；
* useEffect、事件、集合和 JSX 匿名回调；
* 参数、返回、异常、副作用、主要调用和源码行号。
