状态管理与一致性
================

状态分类
--------

URL/Router
   当前 Conversation、Document 和页面模式。

HTTP Resource State
   Conversation 列表、历史消息、Model、Settings、Workspace 等持久资源快照。

Realtime State
   当前 Turn、Run、增量文本、工具审批、语音进度和连接状态。

Local UI State
   Modal、选中项、滚动、Hover、草稿和播放器控件。

Event Store
-----------

``useEventStore`` 不是持久业务数据库。它保存最近事件、监听器、Reply Waiter、去重 ID 和调试信息。
业务列表仍应存入 Feature Store/React State，并在终态后从 HTTP 校准。

消息概览
--------

Assistant 生成开始时数据库可能已有空占位。摘要增量加载必须重读尾部并按 ``orderIndex`` 替换，
不能只追加新 messageId。``turn.completed/cancelled/failed`` 后需要静默校准。

Zustand 与 React State
---------------------

* 跨页面、多个不相关组件使用的稳定状态可放 Store；
* 单一 Surface 内的临时状态留在 Hook/组件；
* 高频流式 Delta 应批量合并，避免每 token 全树重渲染；
* 大对象用 selector，避免订阅整个 Store。

.. warning::

   不要把 WebSocket 收到的每个 Envelope 无界追加到数组。当前 Context 只保留最近记录用于调试，
   业务历史由数据库负责。
