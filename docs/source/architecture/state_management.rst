状态管理与一致性
================================================================================

状态分类
--------------------------------------------------------------------------------

URL/Router
   当前 Conversation、Document 和页面模式。

HTTP Resource State
   Conversation 列表、历史消息、Model、Settings、Workspace 等持久资源快照。

Realtime State
   当前 Turn、Run、增量文本、工具审批、语音进度和连接状态。

Local UI State
   Modal、选中项、滚动、Hover、草稿和播放器控件。

Event Store
--------------------------------------------------------------------------------

``useEventStore`` 不是持久业务数据库。它保存最近事件、监听器、Reply Waiter、去重 ID 和调试信息。
业务列表仍应存入 Feature Store/React State，并在终态后从 HTTP 校准。

任务组件快照
--------------------------------------------------------------------------------

后台任务详情以 observation 返回受控组件树，节点/子图面板和任务摘要选取各自 scope。
实时事件可能省略 observation；Store 只有在该字段存在时更新快照，不把省略变成删除。
组件 id/revision 与 scope id 保留刷新和恢复身份，展开状态属于本地 UI，不回写运行数据。
终态结果由服务端自动缓存，运行和暂停保持实时；缓存不替代任务状态或权限。
详见 :doc:`workflow_tasks`。

Runtime Inspector 简要模式
--------------------------------------------------------------------------------

Assistant 生成开始时数据库可能已有空占位。Runtime Inspector 的“简要模式”继续使用消息摘要缓存；摘要增量加载必须重读尾部并按 ``orderIndex`` 替换，
不能只追加新 messageId。``turn.completed/cancelled/failed`` 后需要静默校准。

默认 Workspace
--------------------------------------------------------------------------------

会话默认工作区由后端 Conversation 元数据持久保存，和模型 options 快照分开。
Workspace 挂载窗口以星形按钮选择默认项，Badge 展示当前默认；单个挂载自动生效。
挂载窗口不再编辑配置；新建和配置入口使用后端给出的设置详情链接，设置页面集中管理目录、
成员与规则。从聊天新建时保留会话上下文，保存后挂载并由 workspace.default.changed 更新选择。
本地与远程工作区统一展示，删除只移除配置；已选择的失效条目保留，不能静默退回其他工作区。
用户可显式替换挂载，替换默认项时同时更新默认 ID；历史 cwm:// 引用及正在执行调用的冻结范围不迁移。
客户端通过 ``GET/PUT /workspace/conversation/{id}/default`` 读取和修改，PUT 使用
``{"workspaceId": "已挂载ID"}``，并监听 ``workspace.default.changed`` 重新核对。
打开窗口、切换对话和操作后读取以请求序号隔离，迟到响应不能覆盖新状态。
默认项不保存在 localStorage；后端仍检查挂载、ACL 与访问策略，离线不自动切换设备。

AI 可通过 ``code_workspace_set_default`` 选择默认项，再省略文件、rg 与命令工具的
``workspace_id``，使用工作区内相对路径；每次调用由服务端固定目标后执行。
工具返回的 ``cwm://workspace/@<workspaceId>/<path>`` 仍是明确资源身份，客户端不得
把返回 URI 改成浏览器 URL、宿主路径或依赖当前默认的相对路径。

Zustand 与 React State
--------------------------------------------------------------------------------

* 跨页面、多个不相关组件使用的稳定状态可放 Store；
* 单一 Surface 内的临时状态留在 Hook/组件；
* 高频流式 Delta 应批量合并，避免每 token 全树重渲染；
* 大对象用 selector，避免订阅整个 Store。

.. warning::

   不要把 WebSocket 收到的每个 Envelope 无界追加到数组。当前 Context 只保留最近记录用于调试，
   业务历史由数据库负责。
