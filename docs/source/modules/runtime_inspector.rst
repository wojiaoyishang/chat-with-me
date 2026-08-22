Runtime Inspector 模块
================================================================================

.. js:module:: src/features/chat/page/components/RuntimeInspectorDialog
   :no-index:

.. js:function:: RuntimeInspectorDialog(props)
   :no-index:

   Runtime Inspector 响应式顶层窗口。处理 Tab、刷新、关闭和消息跳转，不负责 ModelCall/Context/Tool 业务推导。

.. js:function:: RuntimeSectionRenderer(props)
   :no-index:

   按后端 ``section.type`` 选择固定 Renderer；未知类型安全退化成 JSON Viewer。

.. js:function:: ModelCallBrowser(props)
   :no-index:

   展示 Model Call 的动态重建消息、Provider Payload、Provider Records、Raw Request、真实/估算 Token Usage 和工具执行统计。

.. js:function:: UsageMetric(props)
   :no-index:

   展示一个 Usage 指标及 ``SERVER / DERIVED / ESTIMATED / N/A`` 来源。Estimated 数据使用近似语义。

.. js:function:: ToolBrowser(props)
   :no-index:

   按 Model Call 浏览工具目录，支持全部启用、已进入上下文、已获取详情和工具名搜索。

.. js:function:: ContextBrowser(props)
   :no-index:

   展示 Context revision、Persistent Context、Compaction Artifact、forgotten messages，并支持跳回源消息。

.. js:function:: RawMessageBrowser(props)
   :no-index:

   展示当前活动分支数据库消息，不读取或复制 Model Call Storage。

.. js:function:: BriefBrowser(props)
   :no-index:

   简要模式虚拟化消息摘要列表，复用 ChatPage 现有快速跳转逻辑。
