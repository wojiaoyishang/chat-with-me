# 通用文件管理器

`FileManager` 只负责列表、上传入口和重命名表单，复用 shadcn 控件和项目 i18n，不绑定文档/Workspace 路径、权限或网络协议。

- `adapter.list(path)` 返回 `{files: [{path, name, kind, size, readOnly}]}`。
- `adapter.mkdir(parent, name)` 可选，用于当前目录创建子文件夹。
- `adapter.rename(path, name)` 可选，负责业务授权、冲突处理和引用更新。
- `onOpen(file)` 可选，决定预览、打开或插入资源。
- `onUpload(files, directory)` 与 `accept` 可选，上传失败应报告错误。
- `refreshToken` 用于业务 WS 事件触发刷新，加载请求有过期响应防护。

Markdown 的适配器使用文档 `/files` 接口；Workspace 可提供自己的适配器复用同一组件，不复用文档文件权限。


- `showTitle` 与 `headerAction` 用于嵌入单一标题栏。
- `adapter.move(path, destination)`、`prepareDelete(path)`、`remove(path, prepared)` 为可选资源操作，删除确认依据业务返回的 `references`。
- `uploadPolicy` 配置 `accept`、`types`、`maxBytes`、`validate(file)`，MD 适配器仅允许图片；Workspace 独立配置，后端也必须验证。
- `uploads` 输入进度投影 `[{id,name,percent,speed,status}]`，速度单位 bytes/s，`status` 为 uploading/done/error。业务上传回调负责更新，通用 UI 不决定上传接口或混用聊天附件接口。
