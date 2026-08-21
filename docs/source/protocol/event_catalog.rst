事件目录与命名
==============

EventName 位于 ``src/runtime/protocol/events.js``，必须与后端值完全一致。

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

新增时同步
----------

后端 Catalog、前端 Catalog、生产者、消费者、文档和跨语言测试一次提交。

.. tip::

   只在当前组件内发生的事件不一定需要 Event Runtime；普通 props/callback 更简单时不要过度事件化。
