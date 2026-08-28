开发环境快速开始
================================================================================

环境
--------------------------------------------------------------------------------

建议 Node.js 20 或更高版本，npm 与项目锁文件配套。后端默认运行在同域 ``/api`` 和 ``/ws``，
开发时由 Vite Proxy 或本地反向代理转发。

安装
--------------------------------------------------------------------------------

.. code-block:: bat

   npm ci

如果只做临时本地试验可使用 ``npm install``，但提交前应恢复 lockfile 的可复现状态。

启动
--------------------------------------------------------------------------------

.. code-block:: bat

   npm run dev

默认页面：

* ``/login``：登录；
* ``/chat``：Dashboard/新 Conversation；
* ``/chat/:conversationId``：聊天；
* ``/doc/:documentId/:conversationId``：文档与聊天；
* ``/doc/:documentId``：文档入口。

测试与构建
--------------------------------------------------------------------------------

.. code-block:: bat

   npm run test:protocol
   npm run lint
   npm run build

Protocol 测试使用 Node Test Runner；生产构建会同时发现 JSX、导入、重复属性和 Vite 解析问题。

构建文档
--------------------------------------------------------------------------------

.. code-block:: bat

   python -m pip install -r docs/requirements.txt
   docs\make.bat

HTML 输出位于 ``docs\_build\html``。

后端要求
--------------------------------------------------------------------------------

前端启动不代表实时功能可用。至少需要：

* FastAPI 可访问；
* Redis Login Session 有效；
* WebSocket 接受 Protocol v1；
* 文本生成需要 Celery Worker；
* TTS/ASR 需要对应 Provider。

.. warning::

   清理后端 Redis 会使浏览器旧 Cookie 对应的登录 Session 失效。前端应只跳转一次 ``/login``，
   重新登录不会删除 PostgreSQL 中的历史 Conversation。
