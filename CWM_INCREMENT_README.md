# CWM 前端 Protocol v1 增量包

这是一次不兼容旧 WebSocket 格式的开发期架构升级。前端与后端必须同时更新。

## 应用顺序

1. 保留当前项目副本。
2. 将本增量包解压到 **前端项目根目录**，允许覆盖同名文件。
3. 运行 `clean_project.bat` 清理旧构建产物和 Vite 缓存。
4. 按原锁文件安装依赖并构建：

   ```bat
   npm ci
   npm run test:protocol
   npm run build
   ```

5. 启动前端，并确认后端已经同步更新为 CWM Protocol v1。

## 协议变化

- WebSocket 控制事件使用 `ArrayBuffer + MessagePack`。
- 音频等媒体数据使用 Frame 原始 Body，不再通过 JSON/Base64 传输。
- 事件以 `turn.start`、`message.content.delta` 等语义名称分发。
- 请求与响应使用 `event_id / reply_to`。
- `conversationId`、`turnId`、`runId`、`streamId` 分别表示持久对话、交互轮次、Agent 执行和真实媒体流。
- 旧 `target + command + markId + isReply` 格式已经删除，不提供兼容层。

## 文档

前端独立文档位于 `docs/`。安装文档依赖后运行：

```bat
python -m pip install -r docs\requirements.txt
docs\make.bat html
```
