# 二次修改说明

## 1. 移除单独的 pretty-scrollbar CSS 文件

已删除 `chatbox/styles/prettyScrollbar.css`，并移除了 `ChatBox.jsx` 中对应的 import。

现在组件只保留 `pretty-scrollbar` className，直接复用项目全局 CSS 中已有的滚动条样式。

## 2. 固定 group 子菜单中的“选择全部”

已调整 `chatbox/components/ExtraToolsMenuItems.jsx`：

- `DropdownMenuSubContent` 本身不再作为滚动容器。
- “选择全部”作为普通固定菜单项放在滚动区域外。
- 子菜单 children 被包进内部滚动容器：`max-h-[calc(50vh-2.5rem)] overflow-y-auto pretty-scrollbar`。
- 外层子菜单增加 `overflow-hidden`，避免圆角边缘处出现滚动内容泄漏。

## 3. radio 子菜单滚动区域优化

radio 子菜单也改为：外层负责圆角与裁剪，内层负责滚动。

这样可以避免滚动内容贴着圆角边缘滑动时从边缘缝隙露出。
