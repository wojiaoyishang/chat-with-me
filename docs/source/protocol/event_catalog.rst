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
   给当前 active ExecutionRun 追加用户信息，在安全 Agent 边界消费；不要求新建 Task segment。

``execution.cancel`` / ``execution.resume``
   停止当前执行，或从 recoverable checkpoint 创建新的 Run 继续同一执行目标。

``task.*`` 只属于旧会话兼容，不再构成新的前端 Task Mode UI。

命名规则
--------------------------------------------------------------------------------

事件采用小写点分命名，描述事实或请求，不包含 React 组件名。Wire 事件需要同步前后端 Catalog、
生产者、消费者、文档和测试；明确 ``localOnly`` 的事件只更新前端侧。
