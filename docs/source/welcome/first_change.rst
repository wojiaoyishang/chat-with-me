完成第一次安全修改
================================================================================

推荐从纯 UI 或现有事件消费者开始，不要第一次就修改 Frame 格式。

示例：为已有状态增加提示
--------------------------------------------------------------------------------

#. 在 Event Catalog 确认已有事件。
#. 在最接近 UI 的 Feature 中订阅，不在全局 WebSocketContext 增加业务判断。
#. 指定 ``conversationId``、``direction`` 和是否接收 Global。
#. ``useEffect`` 清理时调用 unsubscribe。
#. 更新对应模块文档，并补充可复现的验证步骤。

订阅模板
--------------------------------------------------------------------------------

.. code-block:: javascript

   useEffect(() => onEvent({
       event: EventName.TURN_FAILED,
       conversationId,
       direction: 'incoming',
   }).then(({payload}) => {
       // 只处理当前 Conversation 的服务端终态。
   }), [conversationId]);

提交前检查
--------------------------------------------------------------------------------

* ``onEvent`` 返回的取消函数已被 useEffect 使用；
* 通配符是订阅表达式，不会发送到 Wire；
* 只处理需要的 direction；
* 没有让 reply Envelope 进入普通监听器；
* HTTP 401 使用统一登录跳转；
* 新状态不会让整个 ChatPage 高频重渲染；
* ``npm run lint``、``npm run build`` 和文档检查通过。

.. important::

   修改 ``frame.js``、``msgpack.js``、``events.js`` 或 Envelope 字段必须同步后端，并执行跨语言
   Round-trip；不能作为普通前端重构单独提交。
