/** Device preferences and connection selection belong to the client. Backend
 * notification types are business data, never client page definitions. */
export const CLIENT_SETTINGS_TABS = Object.freeze([
  {
    id: "interface",
    name: "界面",
    icon: "layout",
    description: "调整此浏览器中的聊天、画布与显示偏好。",
  },
  {
    id: "connections",
    name: "后端连接",
    icon: "server",
    preview: `${import.meta.env?.BASE_URL || "/"}settings/developer.svg`,
    description: "管理此浏览器保存的连接，手动选择当前后端。",
  },
  {
    id: "notifications",
    name: "通知",
    icon: "bell",
    description: "管理浏览器通知和当前账户的消息提醒。",
  },
]);

const ref = (path) => ({ $ref: path });
const preference = (key, text, tips, defaultValue = true) => ({
  type: "switch",
  name: key,
  text,
  tips,
  default: defaultValue,
  storage: { key },
});
const group = (text, icon, children) => ({
  type: "group",
  variant: "divided",
  text,
  icon,
  children,
});

function interfaceOptions() {
  return [
    group("对话列表", "palette", [
      preference(
        "CompactConversationList",
        "紧凑显示对话列表",
        "减小对话条目的间距，在侧栏中显示更多会话。",
        false,
      ),
      preference(
        "ShowConversationTimestamps",
        "显示对话时间",
        "在会话列表中显示最近更新时间。",
      ),
    ]),
    group("聊天与执行窗口", "settings", [
      preference(
        "ShowQuickUserMessageNavigator",
        "用户消息快速导航",
        "在桌面聊天页面中快速定位你发送的内容。",
      ),
      preference(
        "AutoCollapseCompletedToolCallsInChat",
        "聊天中自动折叠已完成的工具调用",
        "执行完成后收起工具详情，仍可随时查看过程。",
      ),
      preference(
        "AutoCollapseCompletedToolCallsInExecutionWindow",
        "执行窗口中自动折叠已完成的工具调用",
        "在执行窗口中收起完成项，保留当前运行状态。",
        false,
      ),
    ]),
    group(
      "图谱与工作流",
      "sparkles",
      [
        preference(
          "KnowledgeGraphEdgeAnimation",
          "知识图谱关系动画",
          "在关系连线上显示柔和的流动效果。",
        ),
        preference(
          "KnowledgeGraphPhysicsAnimation",
          "知识图谱节点动画",
          "启用节点的物理布局，稳定后自动静止。",
        ),
        preference(
          "WorkflowEdgeAnimation",
          "工作流连线动画",
          "在工作流连线上显示流动方向。",
        ),
        preference(
          "WorkflowParallelRegions",
          "显示工作流并行区域",
          "使用虚线区域展示可并行运行的节点。",
        ),
      ],
    ),
    group("场景调试", "terminal", [
      preference(
        "RobotDebugEnabled",
        "机器人调试",
        "在 3D 场景中显示动作与表情测试按钮。",
        false,
      ),
    ]),
    group("设置窗口", "settings", [
      preference("CacheSettingsPages", "缓存已加载的设置页", "在本次设置窗口中复用已加载数据，关闭窗口后清除。"),
    ]),
  ];
}

function connectionOptions() {
  const save = {
    id: "save-connection",
    label: "保存连接",
    clientAction: "backend.save",
    body: {
      id: ref("form.id"),
      title: ref("form.title"),
      url: ref("form.url"),
    },
    effects: [{ type: "refresh", target: "backend-profiles" }],
  };
  return [
    {
      type: "resource",
      id: "backend-profiles",
      text: "已保存的连接",
      icon: "server",
      description: "当前选择会一直保留，刷新或断线都不会自动连接其他后端。",
      source: { endpoint: "client:backends", listPath: "items" },
      keyField: "id",
      titleField: "title",
      display: "cards",
      columns: [
        { key: "url", label: "后端地址" },
        {
          key: "active",
          label: "状态",
          labels: { true: "当前连接", false: "未选择" },
        },
      ],
      create: { label: "添加连接" },
      editor: {
        title: "连接信息",
        dialog: { width: 480 },
        description: "连接地址创建后保持不变，连接其他地址时请新增一项。",
        defaults: { title: "", url: "" },
        options: [
          {
            type: "text",
            name: "title",
            text: "连接名称",
            required: true,
            placeholder: "例如：本机开发环境",
          },
          {
            type: "text",
            name: "url",
            text: "后端 API 地址",
            required: true,
            placeholder: "https://example.com/api",
            disabledWhen: { left: ref("item.id"), op: "truthy" },
            tips: "例如 http://localhost:8000 或 https://example.com/api。",
          },
        ],
        create: save,
        update: save,
      },
      actions: [
        { id: "edit", kind: "edit", label: "编辑" },
        {
          id: "switch-connection",
          label: "使用此后端",
          clientAction: "backend.switch",
          body: { profileId: ref("item.id") },
          disabledWhen: { left: ref("item.active"), op: "eq", right: true },
          confirm: {
            title: "切换后端？",
            description:
              "将离开当前页面并连接所选后端。服务器上已提交的后台任务继续运行。",
            confirmText: "切换",
          },
        },
        {
          id: "delete-connection",
          label: "删除",
          clientAction: "backend.delete",
          body: { profileId: ref("item.id") },
          disabledWhen: {
            any: [
              { left: ref("item.active"), op: "eq", right: true },
              { left: ref("item.id"), op: "eq", right: "default" },
            ],
          },
          confirm: {
            title: "删除保存的连接？",
            description: "只移除此浏览器中的连接资料，不删除服务器数据。",
            confirmText: "删除",
            danger: true,
          },
          effects: [{ type: "refresh", target: "backend-profiles" }],
        },
      ],
    },
  ];
}

function notificationOptions({
  types = [],
  permission = "unsupported",
  error = "",
} = {}) {
  const permissionLabels = {
    granted: "已允许",
    denied: "已被浏览器阻止",
    default: "尚未请求",
    unsupported: "当前浏览器不支持",
  };
  const systemPreference = {
    ...preference(
      "systemNotificationsEnabled",
      "启用系统通知",
      "",
      permission === "granted",
    ),
    density: "compact",
    description: `浏览器通知权限：${permissionLabels[permission] || permissionLabels.unsupported}`,
    ...(permission === "granted" ? {} : { storage: undefined, disabled: true }),
  };
  const options = [
    {
      type: "group",
      text: "系统通知",
      variant: "plain",
      children: [
        systemPreference,
        {
          type: "actions",
          actions: [
            {
              id: "notification-permission",
              label: "申请 / 启用系统通知",
              clientAction: "notification.permission",
              body: { enabled: true },
              disabledWhen: permission === "unsupported",
              effects: [{ type: "refresh", target: "page" }],
            },
          ],
        },
      ],
    },
  ];
  if (error)
    options.push({
      type: "info",
      text: "当前后端的通知分类暂时不可用。已有提醒偏好仍然保留，重新打开此页可重试。",
    });
  const categories = new Map();
  for (const item of types) {
    if (!item || typeof item.typeId !== "string" || !item.typeId) continue;
    const category = item.category || "其他提醒";
    if (!categories.has(category))
      categories.set(category, {
        label: item.categoryLabel || category,
        fields: [],
      });
    categories.get(category).fields.push({
      type: "switch",
      name: [item.typeId],
      text: item.name || item.typeId,
      description: item.description || "",
      density: "compact",
      default: item.defaultSubscribed !== false,
      storage: {
        key: "notificationSubscriptionsV1",
        scope: "backend-user",
        path: [item.typeId, "toast"],
      },
    });
  }
  for (const [category, { label, fields }] of categories)
    options.push({
      type: "group",
      id: category,
      text: label,
      variant: "plain",
      filterable: true,
      children: fields,
    });
  return options;
}

export function clientSettingsPage(id, notificationData) {
  const tab = CLIENT_SETTINGS_TABS.find((item) => item.id === id);
  if (!tab) throw new Error("前端设置页面不存在。");
  return {
    schema: "cwm.settings.v1",
    scope: "client",
    id: tab.id,
    title: tab.name,
    description: tab.description,
    icon: tab.icon,
    ...(tab.preview ? { preview: tab.preview } : {}),
    options:
      id === "interface"
        ? interfaceOptions()
        : id === "connections"
          ? connectionOptions()
          : notificationOptions(notificationData),
    saveMode: id === "connections" ? "actions" : "immediate",
    defaultOptions: {},
    ...(id === "interface" ? { layout: { columns: 1 } } : {}),
    ...(id === "notifications"
      ? {
          ...(notificationData?.error ? { cache: false } : {}),
          layout: { columns: 1 },
          search: {
            label: "搜索通知类型",
            placeholder: "搜索消息名称、类型或说明",
          },
        }
      : {}),
  };
}

/** Search local preference groups without changing the source type catalog or
 * their literal storage identities. Non-filterable controls remain available. */
export function filterClientSettingsOptions(options, query) {
  const keyword = String(query || "")
    .trim()
    .toLowerCase();
  if (!keyword) return options;
  const filtered = options.flatMap((item) => {
    if (!item.filterable) return [item];
    const matchesCategory = String(item.text || "")
      .toLowerCase()
      .includes(keyword);
    const children = (item.children || []).filter(
      (child) =>
        matchesCategory ||
        `${child.text || ""} ${child.description || child.tips || ""} ${(Array.isArray(child.name) ? child.name : [child.name]).join(" ")}`
          .toLowerCase()
          .includes(keyword),
    );
    return children.length ? [{ ...item, children }] : [];
  });
  if (!filtered.some((item) => item.filterable))
    filtered.push({ type: "info", text: "没有匹配的通知类型" });
  return filtered;
}
