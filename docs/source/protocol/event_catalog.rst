事件目录与命名
================================================================================

EventName 位于 ``src/runtime/protocol/events.js``。所有上 Wire 的事件值必须与后端 Catalog 一致。

主要命名空间
--------------------------------------------------------------------------------

* ``conversation.*``、``message.*``：对话和消息；
* ``turn.*``、``run.*``：普通执行身份；
* ``execution.*``：V28 默认 durable Execution Runtime；
* ``tool.*``：权限和审批；
* ``speech.*``、``voice.*``：朗读与实时语音；
* ``interaction.*``、``widget.*``：生成式交互；
* ``context.*``、``story.*``、``workspace.*``：能力状态；
* ``composer.*``：输入区。

Execution 事件
--------------------------------------------------------------------------------

``execution.state.changed``
   后端权威执行快照。Inline Execution Status 与 Execution Window 都从这一状态投影。

``execution.guidance.add``
   给当前 active ExecutionRun 追加用户信息及附件，在安全 Agent 边界消费；不要求新建执行分段。
   ``attachments`` 使用现有附件字段，``visionAttachmentIds`` 明确图片识别授权。
   尚未消费的普通补充仅投影为后端快照的 ``pendingGuidance``，不进入正文和执行活动列表。

``execution.guidance.delete`` / ``execution.guidance.edit``
   通过 ``executionId`` 和 ``guidanceId`` 删除或原子取回待接收内容。编辑成功回执带原文和附件，
   回填普通输入框后由用户以新 ID 重新发送；不会创建“已撤回”的活动记录。
   发生消费竞争时返回冲突和对应执行的最新快照，前端同步状态后停止删除/回填。
   成功回执丢失时，同一操作与 ID 可以确认原结果。

``execution.cancel`` / ``execution.resume``
   停止当前执行，或从 recoverable checkpoint 创建新的 Run 继续同一执行目标。

旧会话模式事件已移除。后台工作流的 ``task.changed`` 等作业事件仍保留，
不参与会话 Execution Mode 生命周期。

消息配置事件
--------------------------------------------------------------------------------

``message.updated``
   后端已保存的消息配置增量，也用于 PATCH 成功后的本地同步。Payload 带
   ``messageId``、``messageConfig``（含 ``revision``）、``messageStates`` 和
   ``contextRevision``。只更新已加载消息的元数据，不新增消息或触发滚动。
   HTTP、实时流和历史快照合并时均保留较新的配置版本。
   ``messageConfig.badges`` 是后端计算的完整标记数组，允许多项；显式 ``[]`` 清空，
   稀疏补丁缺省则保留。徽章仅通过 ``id``、``label``、``icon``、``tone``、``order``
   等纯 JSON 字段描述，图标和语义色使用前端安全映射，不执行后端传入的 HTML 或样式代码。

会话冻结事件
--------------------------------------------------------------------------------

``conversation.freeze.changed``
   后端会话冻结租约快照，与 ``GET /chat/conversations/{id}/freeze-state`` 使用相同结构：
   ``conversationId``、``frozen``、``reason``、``operationId``、``expiresAt``、``revision``。
   冻结时所有客户端暂停发送、修改和切换分支，与消息 ``readonly`` 独立。
   前端初次进入、重连及轮询时读取权威状态；租约过期不直接在本地解锁。
   旧版本回执或其他操作的延迟解锁通知不能覆盖当前租约。

复制会话需用户二次确认后提交 ``{clientRequestId, confirmed: true}``。后台任务依次冻结、停止实际生成、
复制已完成消息和解除冻结。``skippedMessageCount`` 表示未复制的未完成回复数。

命名规则
--------------------------------------------------------------------------------

事件采用小写点分命名，描述事实或请求，不包含 React 组件名。Wire 事件需要同步前后端 Catalog、
生产者、消费者、文档和测试；明确 ``localOnly`` 的事件只更新前端侧。
