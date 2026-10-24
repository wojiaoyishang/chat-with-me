# ComfyUI 设置与工作流

`ComfyUISettings` 管理连接与模板，`ComfyGraphDialog` 负责独立的节点配置窗口；执行数据始终使用原始 API prompt，画布只用于展示和布局。

## 更新与复制

- 已有模板的“更新工作流”支持单独上传 API、普通画布，或同时上传同版本的两份 JSON。文件限制和初次导入一致。
- 更新先调用 `POST /comfyui/workflows/{id}/reimport`。这是只读预览，不保存模板。传入当前 revision、draft bindings、outputBindings 与 previousPrompt，允许同一个编辑窗口反复更新后继续保留新配置。
- 映射是否保留由后端判断。节点 ID、类型与字段兼容时，参数标识、说明、必填、默认值、随机范围、多目标共享参数和输出设置继续保留。前端不另维护一套匹配逻辑。
- 更新报告列出失效映射及其原因，用户需要重新配置或明确确认移除；必须选择输出的模板在没有输出节点时仍禁止保存。
- 点击“保存模板”才以原 revision 调用 PUT；取消预览或关闭窗口不改原模板。409 冲突要求重新打开最新配置，避免覆盖其他窗口的修改。
- “复制工作流”调用 `POST /comfyui/workflows/{id}/copy`，服务端创建独立 ID、名称与完整配置后刷新列表并打开副本。后续保存只修改副本。

`tests/comfyuiWorkflowMaintenance.test.mjs` 在 JSDOM 中挂载真实设置组件，验证上传、预览、显式保存、取消、失效映射、复制、冲突和多次预览；测试只模拟接口与基础 UI 外壳，不调用实际 ComfyUI。
