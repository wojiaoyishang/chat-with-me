事件目录与命名
==============

EventName 位于 ``src/runtime/protocol/events.js``。所有上 Wire 的事件值必须与后端 Catalog 一致；显式 ``localOnly`` 的前端语义事件可以只存在于前端 Catalog。

主要命名空间
------------

* ``transport.*``：连接；
* ``conversation.*``、``message.*``：对话和消息；
* ``turn.*``、``run.*``、``task.*``：执行生命周期；
* ``tool.*``：权限和审批；
* ``speech.*``：语音；
* ``interaction.*``、``widget.*``：生成式交互；
* ``context.*``、``story.*``、``workspace.*``：能力状态；
* ``notification.*``：通知；
* ``document.*``：编辑器操作；
* ``composer.*``：输入区，本地事件较多。

命名规则
--------

* 小写点分；
* 事件描述事实或请求；
* 不含组件名；
* Payload 不承担 command 分派；
* 扩展使用独立命名空间。

Task Restart 的本地事件
------------------------

``task.restart.requested`` 是前端本地语义事件，不上 Wire。Task 卡片和 Task Monitor 都可以产生它；``ChatBox`` 是唯一消费者，并把它转换为新的 ``turn.start``。这样 UI action 与后端协议分离，同时保证重启仍经过统一的 Turn admission。

不要为手动终止后的重启直接发送 ``task.resume``。``task.resume`` 的 Wire 语义是“恢复同一个可恢复 TaskRun”。

新增时同步
----------

Wire 事件需要同步后端 Catalog、前端 Catalog、生产者、消费者、文档和跨语言测试。明确 ``localOnly`` 的事件只更新前端 Catalog、生产者/消费者和前端文档。

.. tip::

   只在当前组件内发生的事件不一定需要 Event Runtime；普通 props/callback 更简单时不要过度事件化。
