HTTP、认证与 401
================

请求规则
--------

* URL 来自 ``apiEndpoint``；
* Cookie 认证请求启用 credentials；
* AbortSignal 取消卸载请求；
* 业务错误显示领域提示；
* 401 交给统一认证流程。

401 去重
--------

并发请求可能同时返回 401。重定向逻辑必须有全局锁/状态，只执行一次并保存站内 redirect。Dashboard
不应同时弹出多条“Unauthorized”。

资源加载
--------

认证未完成前，不加载 NotificationHost、Conversation 列表和设置。认证成功再挂载受保护 Feature。

错误信息
--------

后端统一响应可能包含 code/msg/data。前端不要假设网络错误一定有 ``response.data``，要兼容断网、
取消和非 JSON 响应。

.. warning::

   退出登录后应关闭/停止 WebSocket 重连，避免旧连接不断收到 4401。
