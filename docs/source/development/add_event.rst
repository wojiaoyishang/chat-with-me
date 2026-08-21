新增或消费事件
==============

新增 Wire Event
--------------

#. 与后端确定语义、Scope、Payload 和终态。
#. 更新前后端 EventName。
#. 修改生产者/消费者。
#. 增加目录一致性与 Round-trip 测试。
#. 更新协议和模块文档。

发送
----

.. code-block:: javascript

   emitEvent({
       event: EventName.TURN_START,
       conversationId,
       turnId: generateUUID(),
       traceId,
       payload: {content, idempotencyKey},
   });

订阅
----

.. code-block:: javascript

   useEffect(() => onEvent({
       event: [EventName.TURN_COMPLETED, EventName.TURN_FAILED],
       conversationId,
       direction: 'incoming',
   }).then(({event, payload}) => {
       // 收敛当前 UI 状态。
   }), [conversationId]);

本地事件
--------

组件间交互使用 ``localOnly: true``，例如 Composer 查询和播放控制。Wire Catalog 中不需要后端处理
本地事件。

清理
----

``onEvent(...).then`` 返回 unsubscribe。useEffect 应直接返回它，或在 cleanup 中调用。

.. warning::

   不要在 render 期间注册监听器；否则每次渲染都会增加订阅并导致重复处理。
