环境、配置与依赖
================================================================================

Endpoint
--------------------------------------------------------------------------------

``src/config.js`` 定义 ``BASE_BACKEND_URL='/api'``、``WEBSOCKET_URL='/ws'`` 和资源 Endpoint。开发与
生产尽量使用同源反向代理，避免在组件中硬编码 host。

UUID 与 HTTP 部署
--------------------------------------------------------------------------------

UUID 统一通过 ``src/lib/uuid.js`` 的 ``generateUUID`` 生成；``src/lib/tools.jsx`` 同时导出该函数。
HTTPS 等安全上下文优先使用浏览器原生 ``crypto.randomUUID``。HTTP 内网部署通过
``crypto.getRandomValues`` 生成符合 UUID v4 格式的随机 ID，用于命令配置、设置列表、工作流与附件等。
新增调用应复用该方法，兼容性回归为 ``node --test tests/uuidCompatibility.test.mjs tests/settingsRuntimeUI.test.mjs``。

依赖
--------------------------------------------------------------------------------

* React 19 与 React Router；
* Zustand；
* Axios/fetch；
* Radix/Headless UI；
* Markdown/Remark/Rehype；
* Framer Motion；
* Neo4j NVL；
* Vite/Tailwind。

新增依赖
--------------------------------------------------------------------------------

#. 确认现有依赖不能完成；
#. 检查包体、浏览器兼容和许可证；
#. 只在使用层导入；
#. 更新 lockfile；
#. 增加构建和文档说明。

环境变量
--------------------------------------------------------------------------------

Vite 环境变量应以 ``VITE_`` 开头。敏感 Key 不得放前端；前端构建中的变量都可被用户读取。

.. warning::

   Provider API Key、JWT Secret 和数据库地址永远属于后端配置。
