CWM 前端开发说明书
==================

本说明书面向第一次接触 Chat With Me（CWM）前端的开发者。阅读完成后，应能够启动项目、理解
路由与认证、使用 CWM Protocol v1、订阅语义事件、开发 Chat/Voice/Widget Surface、维护状态、
调试实时链路并为新功能补充测试和文档。

前端的核心链路是 ``Transport → Protocol → Event Runtime → Store/Surface``。后端不再遥控
``ChatPage``，而是发布 ``turn.started``、``message.content.delta``、``speech.audio.chunk`` 等
领域事件；React 层根据事件更新用户可理解的界面。

.. important::

   WebSocket 只使用 CWM Protocol v1 二进制 Frame。任何新代码都不得重新发送
   ``target``、``command``、``markId``、``isReply``，也不得把 JSON 字符串包进二进制 Frame
   冒充新协议。

.. rubric:: 推荐阅读顺序

第一次开发依次阅读“开发入门 → 前端架构 → 实时协议 → 开发任务”。需要定位具体函数、组件、
Hook 或匿名回调时，再进入“模块说明”和“完整 JavaScript API 参考”。

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :caption: 开发入门

   welcome/index

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :caption: 前端架构

   architecture/index

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :caption: 实时协议

   protocol/index

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :caption: 开发任务

   development/index

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :caption: 模块与函数

   modules/index
   api/javascript/index
