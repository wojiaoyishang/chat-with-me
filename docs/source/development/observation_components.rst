扩展运行观测展示
================================================================================

先判断新增内容是普通指标/表格，还是一种新的视觉组件。普通指标由后端节点的
self.flow/context.flow 使用 add_indicator/add_component 声明，前端无需新增字段判断。
协议边界见 :doc:`../architecture/workflow_tasks`。

唯一源码与同步
--------------------------------------------------------------------------------

通用 DOM 渲染器的唯一源码是后端仓库
``application/management_pages/static/observation-components.js``。任务管理页直接使用它；
前端 src/features/tasks/observation-components.js 是生成副本，不手工修改。
React RunObservation.jsx 只负责挂载、清理和 API adapter。

.. code-block:: text

   # 在前端仓库同步；--check 校验副本没有漂移
   node scripts/sync-observation.mjs --source "path/to/observation-components.js"
   node scripts/sync-observation.mjs --check

   # 在后端仓库生成管理页 bundle；--check 校验实际产物
   node application/management_pages/static/vendor/build-management.mjs
   node application/management_pages/static/vendor/build-management.mjs --check

新增组件类型
--------------------------------------------------------------------------------

#. 在后端定义有界、可序列化的组件数据与计量语义，保留稳定组件 ID。
#. 在唯一共享 renderer 中注册一个受控 type，标题和数据仍来自后端。
#. 提供安全文本、未知值、空状态、加载、失败和未知组件降级。
#. 按 visibility 处理 summary/detail，复杂明细按授权端点分页，不在摘要中渲染全表。
#. 更新同步副本与管理页 bundle；React 不再复制一套格式和业务规则。
#. 验证任务页、节点/子图面板和紧凑摘要显示一致，刷新保留展开状态。
#. 同步发布 RST、组件协议与静态 JavaScript API；Markdown 协作记录不是发布文档替代物。

接口和交互边界
--------------------------------------------------------------------------------

组件数据只能作为文本和受控格式渲染，不能向 innerHTML 注入任意服务端内容，不执行传入的脚本
或回调。明细请求由包装提供的 loadRows adapter 使用当前 taskId/scope/component 发出；请求失败
只影响该明细，不能把任务标记为失败或自动重复提交。

节点模型明细首次展开时应按需加载首屏，不以 total 是否达到 50 作为加载条件；已经有摘要统计
不代表 rows 已经返回。首次加载去重，重复展开复用当前页，只有翻页读取新范围。

同一任务刷新时使用稳定身份保留折叠状态、当前页和用量来源解释；切换任务不能复用旧任务页码。
快照缺少可选组件时不制造零值卡片，实时事件省略 observation 时保留已有快照。
并行峰值、阶段总量和 Token 费用的语义由后端采集，不在 UI 中重新估计。

``timeline`` 是通用事件列表组件：事件的顺序和可用时间由后端提供，前端只展示状态、真实
时间和累计耗时。任务级阶段按开始时间排列，但并行阶段可重叠，时间线不代表依赖关系；
滚动位置、紧凑视图及阶段暂停操作由共享渲染器处理。

``artifacts`` 以卡片展示附件名称、大小与下载入口，渲染器只允许已授权的
``cwm://artifact/<id>`` 引用。管理页通过同源资源链接和客户端桥接下载，React 包装提供
``downloadArtifact`` adapter 处理当前连接的跨域授权下载；失败显示在对应卡片中。

验收
--------------------------------------------------------------------------------

* 自定义中文标题、单位、布尔/文本指标与动态表格无需业务字段映射。
* unknown/null、0 与空数组能够区分，未知组件不会破坏其他组件。
* 模型用量来源说明清晰，缓存和推理 Token 不重复加入总量。
* 明细按需分页，列表与实时更新不反复下载全部模型行。
* 管理页与 React 共享格式、文本安全与展开/翻页行为。
* 同步与构建 --check、定向测试、生产构建和发布文档检查通过。
