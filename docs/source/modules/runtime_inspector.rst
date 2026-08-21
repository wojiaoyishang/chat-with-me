Runtime Inspector 模块
================================================================================

.. js:module:: src/features/chat/page/components/RuntimeInspectorDialog
   :no-index:

.. js:function:: RuntimeInspectorDialog(props)
   :no-index:

   Runtime Inspector 的响应式顶层 Dialog。它只处理选中 Tab、刷新、关闭、消息跳转以及通用 Section
   分发，不负责生成 Context/Prompt/Tool 业务数据。

.. js:function:: RuntimeSectionRenderer(props)
   :no-index:

   根据后端 ``section.type`` 从固定 Registry 选择 Renderer。未知类型使用 JSON fallback，保证后端增加
   新字段时旧前端不会直接崩溃。

.. js:function:: ModelCallBrowser(props)
   :no-index:

   浏览某次模型请求。支持 Model Call 选择、消息角色/来源统计、CWM Model Messages、Provider 消息载荷、
   工具执行统计、Request Parameters 和 Raw Adapter Input。主内容区使用受约束 Flex 滚动，长卡片不会被裁掉。

.. js:function:: ContextBrowser(props)
   :no-index:

   显示 Context revision、Persistent Context、Compaction Artifact、forgotten messages 和自动压缩状态，
   并允许从 Artifact 的 source message 快速定位回聊天记录。

.. js:function:: RawMessageBrowser(props)
   :no-index:

   搜索并显示活动分支的数据库原始消息，同时标注 compacted/forgotten 状态和消息元数据。

.. js:function:: ToolBrowser(props)
   :no-index:

   按 Model Call 展示工具目录。支持“全部启用 / 已进入上下文 / 已获取详情”快速筛选和名称搜索，并在
   存在结构化 Provider Schema 时直接展开 description 和 parameters。

.. js:function:: BriefBrowser(props)
   :no-index:

   “简要模式”的虚拟化摘要列表。复用 ``MessageSummaryItem`` 和 ChatPage 现有跳转能力，取代旧独立
   ``MessageOverviewDialog`` 的入口职责。
