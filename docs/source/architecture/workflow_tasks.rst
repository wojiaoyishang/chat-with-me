任务与工作流观测
================================================================================

任务管理页、工作流监控、节点/子图面板和轻量任务摘要共享后端的运行观测组件协议 v1。
新增指标由节点实现声明，前端只按组件类型展示，不能再按每种任务或 kind 写一份字段表。
聊天执行模式的正文状态、后台 taskId 和媒体 streamId 仍是不同对象。

唯一数据入口
--------------------------------------------------------------------------------

详情返回 ``observation={version:1,revision,scopes}``。任务作用域为 task，节点为
``node:<独立节点ID>``，子图为 ``subgraph:<独立子图ID>``。parentId 描述展示关系，名称与画布路径
不参与身份。组件含 id/type/title/revision，组件 ID 在整个作用域内唯一，含 group 子组件。

任务详情提供完整快照，列表和 task.changed 事件可以省略 observation；Store 仅在字段存在时替换，
不能把普通状态通知误解释为清空指标。组件 revision 保留真实更新顺序，恢复后 last 汇总仍正确。
任务自动汇总组 ID ``__aggregated_indicators`` 由后端保留。

对外 observation.revision 使用 SQL 任务 revision，与状态通知和终态缓存保持一致；组件自身的
revision 仍表示真实变更顺序。runtime.checkpoint 仅含控制阶段信息，不从中读取原始观测回退。

旧 workflowMetrics、节点 telemetry 与 dashboard.metrics/charts 不做兼容或回退读取。
调度状态与控制继续使用任务协议；公开产物来自 result.outputs[实际节点ID]，不从观测组件推断
文件已经生成或知识已经入库。

组件展示
--------------------------------------------------------------------------------

受控组件包括 indicator、progress、group、table、phase-timeline、request-activity、model-usage
与 artifacts。后端提供标题、单位、格式、说明、列和数据；visibility 为 summary/detail/both，
默认 both。前端不根据字段名或中文标题猜测计量口径，也不执行组件中的 HTML、代码或回调。
未知组件安全降级，缺失数值保留未知，不变成零。

Indicator 支持 number/duration/bytes/percent/text，duration 数据单位是秒。
未知 progress.total 为 null，显示已处理数量与当前内容，不制造百分比。
没有真实模型调用就不出现 Token 区域，没有测量信息就不补价格/GPU 等占位。

请求活动中的 active 表示响应尚未结束的外部请求，排除空闲连接、监控通道和知识关系。
任务请求峰值按整体实时 active 记录，不相加节点历史峰值。并行阶段耗时允许重叠，不能相加
替代任务经过时间。只有明确 opt-in 的叶节点指标由后端汇总，前端不重复统计父子图。

ModelUsage 组合摘要、阶段用量和模型调用明细。usage 保留输入/输出/缓存/推理 Token 及 provenance，
缓存输入和推理不重复加入总量。失败重试计入实际发生的消耗，缓存命中不新计费。
来源说明不能渲染成 object 字符串，也不能用本地估算覆盖未知的接口数据。

统一 React 包装
--------------------------------------------------------------------------------

``src/features/tasks/RunObservation.jsx`` 挂载共享 DOM 渲染器并提供 API adapter：

.. code-block:: jsx

   <RunObservation
     observation={task.observation}
     taskId={task.taskId}
     scopeId="task"
     view="detail"
   />

任务摘要使用 view="summary" 与 compact；节点面板选择 node:<id>，子图选择 subgraph:<id>。
包装只处理挂载、销毁、授权 API 与附件 URL，不维护另一份格式化或业务指标规则。
新展示能力的开发步骤见 :doc:`../development/observation_components`。

分页、展开与刷新
--------------------------------------------------------------------------------

Table 的服务端私有持久数据最多 1000 行，DTO 首屏最多 50 行，实时事件的 rows 为 0；
ModelUsage 内联始终最多 50 行。界面通过 pagination 表达 total/hasMore，不把第一页当完整历史。
用户展开或翻页才请求：

节点模型明细在首次展开时也按需加载首屏，即使总调用数少于 50 条；摘要中有总量不代表已经有
调用行。首次加载只触发一次，后续展开复用当前页，翻页再读取对应范围。

.. code-block:: text

   GET /tasks/{taskId}/observation/rows?scope=<scopeId>&component=<componentId>&offset=0&limit=50

服务端按任务 owner、作用域、组件和实际数据源授权。客户端不接受任意明细 URL，不能绕过
apiClient 的会话处理。稳定的 task/scope/component ID 用于保存展开状态，普通刷新不关闭已展开
的用量来源说明；跨任务切换或销毁时释放旧 renderer 和请求。

观测组件先在服务端内存更新，约 250ms 合并保存/推送，结束边界强制保存。暂停、终止或租约失效
后活动计数收束，累计与峰值保留；刷新直接恢复最终快照，不启动新的处理。

结果缓存与授权
--------------------------------------------------------------------------------

缓存由任务服务自动处理，页面无需额外调用缓存工具。只缓存 completed/failed/cancelled 的
get/details 视图，运行和暂停始终保持实时。服务端先 SQL 校验 owner，再读按 userId/taskId/
revision/视图协议版本隔离的 Redis 副本。

TTL 6 小时，单条 JSON 最大 1,000,000 字节，读写超时 200ms。Redis 故障回退数据库，大结果跳过
缓存但不截断原始响应。缓存不代替租约、检查点、真实模型账本和公开产物，也不因失效重放任务。

节点添加菜单
--------------------------------------------------------------------------------

后端节点在自身 NodeSpec 声明 ``menu_path="资料与内容/ 文档与附件"``，自动清理空格并合并父菜单。
前端只消费目录的 nodeMenus 递归树与每个节点的 menuPath 数组，中文分类 ID 与多级路径均有效，
不维护业务分类表。只有基础文本、数字、布尔归入输入；category=source/process/sink 是执行角色。
menuPath/nodeMenus 不写进用户 graph.nodes，也不改变独立节点身份。

画布右键只提供“添加节点”主入口，子菜单按应用场景递归展开。右键、搜索、拉线后选择、双击等
添加入口先展示随指针移动的虚拟节点；左键放置，右键或 Esc 取消。放置前不写草稿、ID 或历史，
正式节点与所选连线一次提交，取消不留下半条连接。子图参数胶囊仅在内部作用域参与菜单。

完整函数参考：:doc:`React 包装 </api/javascript/features/tasks/RunObservation>`、
:doc:`共享渲染器副本 </api/javascript/features/tasks/observation-components>`、
:doc:`工作流模型 </api/javascript/features/workflows/workflowModel>`。
