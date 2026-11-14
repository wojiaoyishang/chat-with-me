验证策略
================================================================================

当前基线
--------------------------------------------------------------------------------

仓库 tests 目录提供 Node 测试，用于组件、状态和协议回归；它们不进入正式 JavaScript API 文档扫描。
测试范围按实际改动选择，静态检查、生产构建和手工黄金链路仍是提交前的验证门槛。

静态检查与构建
--------------------------------------------------------------------------------

.. code-block:: bat

   npm run lint
   npm run build
   docs\make.bat

生产包初始化
--------------------------------------------------------------------------------

``npm run build`` 在 Vite 打包后自动执行 ``scripts/check-production-runtime.mjs``，
直接加载生成的 React 运行时包，并检查 React 与 React DOM 客户端均已初始化、版本一致。
初始化异常会使构建失败；此检查不依赖浏览器、后端服务或登录凭据。

React、React DOM 和 Scheduler 必须按完整包名归入同一个 ``react-runtime`` 分包。
不要用 ``node_modules/react`` 前缀匹配核心包：它也会匹配 React Router、React Markdown
和 React Virtuoso 等消费者，使渲染器与核心包形成循环依赖，可能导致生产环境出现
``Cannot set properties of undefined (setting 'Children')``，而开发服务器仍然正常。

修改分包配置后，还应使用真实浏览器打开生产产物的首页与 ``/login``，确认登录表单正常
渲染、控制台没有初始化错误；后端不可用时，应能显示连接恢复页面。运行时导入检查不替代
页面交互验收。发布时同步更新 ``dist/index.html`` 与它引用的完整 ``dist/assets``。

定向回归
--------------------------------------------------------------------------------

任务与工作流改动可定向执行：

.. code-block:: text

   node --test tests/workflowEditor.test.mjs tests/backendUsageSource.test.mjs
   node scripts/sync-observation.mjs --check

组件协议还需覆盖未知值、中文标题、分页权限、展开保持、旧字段不再读取，以及前后端共享渲染器
的一致性；不能仅用源文件字符串存在性代替实际交互验证。

描述式设置新增列表项时，需要验证 ``idFactory=uuid`` 生成的 ID 保留，以及
``options.timeout`` 等字段初始化为嵌套对象。相应交互回归为
``node --test tests/settingsRuntimeModel.test.mjs tests/settingsRuntimeUI.test.mjs``。

流式与媒体保活回归
--------------------------------------------------------------------------------

.. code-block:: text

   node --test tests/messageStreamBatch.test.mjs tests/replacementProjection.test.mjs tests/markdownStreamingCopy.test.mjs tests/chatRenderScheduling.test.mjs

验证增量不丢字、不重复、set/delta 接收顺序、HTTP 快照前冲刷、完成与取消屏障，
以及 12 张卡片中只更新一张时其他 Markdown 管线不重新解析。
媒体回归须比较原生 video 及祖先 DOM 的身份，不能仅比较最终 HTML；同时保留播放位置、音量
和代码复制状态，真实改变 URL 则创建新播放器。JSDOM 中的属性检查不能代替浏览器真实播放。

浏览器性能验收采用隔离的合成数据和本地测试媒体，逐步增加输出速率、并发工具及列表长度，
禁止为压测提交真实提取、导出或付费模型任务。记录接收事件数、界面提交数、正文逐字匹配、
媒体卸载次数及播放是否持续；合成单元速率应与模型 tokenizer 的实际 token 速率区分。

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
#. Workspace 与断线重连。

.. important::

   TypeScript AST 静态扫描不能代替 Vite 生产构建；正式发布环境仍应执行 ``npm run build``。
