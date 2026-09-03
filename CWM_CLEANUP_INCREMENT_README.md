# CWM Frontend Cleanup Increment

本增量只做基线清理，不改变 CWM Protocol v1、Chat/Voice/Widget/Story/Workspace 的既有业务契约。

## 主要变更

- 删除不存在的 `test:protocol` 脚本入口，不再声明当前包携带自动化 Test Suite。
- 删除 `rollup-plugin-visualizer` 与生成的 `stats.html`，生产构建不再自动生成/打开 bundle 分析页。
- 删除入口图不可达的旧 Debugger、旧消息弹窗、旧 CardBlock 冻结封装和孤儿静态资源。
- 删除未接入当前 Execution 主路径的 V73 `ToolInvocationCard/invocationId` 前端残留，Workspace 文档恢复到当前 `toolCallId/executionId` 基线。
- 删除 `WidgetHost` 内已被 `CanvasCardDeck` 完全替代的 Legacy DOM Card Deck 实现。
- 清理现存源码中的未使用 import、参数、局部 helper 和无效 remount state。
- API 参考已按当前源码重新生成。

## 应用

1. 将 `frontend/` 内文件覆盖到前端项目根目录。
2. 运行 `temp\cleanup_baseline.bat`，删除增量包无法通过“覆盖”表达的旧文件及缓存。
3. 在完整依赖环境执行：

```bat
npm ci
npm run lint
npm run build
```

清理脚本不会删除 `node_modules`，但会删除 `node_modules/.vite` 和旧 `dist`，以避免缓存继续引用已移除模块。
