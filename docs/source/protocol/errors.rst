协议与连接错误
==============

Protocol Error
--------------

Frame 解码、事件名、UUID 或 Envelope 字段错误进入 ``onProtocolError``，再发布本地
``protocol.error``。UI 应提示可诊断信息，但不要自动重试格式错误。

连接关闭
--------

* 4401：认证失效，进入 Login；
* 1000：正常关闭，不重连；
* 1012：服务重启，延迟重连；
* 其他异常：显示 Fatal Error 和手动重试。

请求超时
--------

``emitEvent`` 默认等待 10 秒。超时只表示没有匹配 Reply，不代表后台任务一定失败；长任务应通过
状态事件，而不是等待一个长 Reply。

ErrorBoundary
-------------

路由和复杂 Surface 应提供 ``errorElement``/ErrorBoundary，避免 React Router 显示默认
“Unexpected Application Error”。错误界面应允许返回 Dashboard、重试和复制 Trace ID。

.. important::

   连接错误、协议错误、业务失败和 Turn 失败是不同层次，不应统一显示为“网络错误”。
