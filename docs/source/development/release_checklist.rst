提交与增量包检查表
==================

代码
----

- [ ] ``npm run test:protocol`` 通过。
- [ ] ``npm run lint`` 通过。
- [ ] ``npm run build`` 通过。
- [ ] 无重复参数、重复 JSX 属性和无清理监听器。
- [ ] 无旧 WebSocket 字段。
- [ ] 401、连接、加载和 ErrorBoundary 状态完整。

协议
----

- [ ] Event Catalog 与后端一致。
- [ ] Python ↔ JavaScript Frame 双向通过。
- [ ] 通配符仅用于订阅。
- [ ] Reply 不进入普通监听器。
- [ ] Media 使用 Raw Body。

体验
----

- [ ] 键盘、触摸、窄屏和大字可用。
- [ ] Loading/Empty/Error/Offline/Read-only 完整。
- [ ] 流式更新无明显卡顿。
- [ ] Voice 资源能释放。

文档与包
--------

- [ ] 人工文档更新。
- [ ] API 参考重生成。
- [ ] Sphinx 严格构建通过。
- [ ] ZIP 从真实升级链验证。
- [ ] 无 node_modules、dist、Vite Cache 和系统临时文件。
- [ ] 包含清理、验证、Manifest 和说明。
