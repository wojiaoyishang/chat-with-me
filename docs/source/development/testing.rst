测试策略
================================================================================

协议测试
--------------------------------------------------------------------------------

``npm run test:protocol`` 覆盖 Event/Media Frame、MessagePack、UUID、Event Pattern、Direction、
Reply 隔离、消息摘要尾部合并和跨语言样例。

组件测试建议
--------------------------------------------------------------------------------

项目后续应补 React Testing Library/Vitest，重点覆盖：

* Dashboard 认证和 401 去重；
* Chat Turn 生命周期；
* 编辑消息/分支和摘要；
* Tool Approval；
* Widget Action；
* Speech 播放和取消；
* WebSocket 重连；
* ErrorBoundary。

手工黄金链路
--------------------------------------------------------------------------------

#. 登录；
#. 创建/打开历史 Conversation；
#. 文本生成；
#. Tool ask/allow/reject；
#. 取消；
#. 编辑消息重生成；
#. Runtime Inspector：模型请求、上下文、原始消息和“简要模式”快速跳转；
#. 朗读/暂停/停止；
#. Document；
#. 断线重连。

命令
--------------------------------------------------------------------------------

.. code-block:: bat

   npm run test:protocol
   npm run lint
   npm run build
   docs\make.bat

.. important::

   仅做 TypeScript AST 语法扫描不能代替 Vite build；完整 node_modules 环境中必须执行生产构建。
