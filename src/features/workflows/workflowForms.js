export const permissionsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    conversationId: {
      type: "string",
      title: "限制到会话（可选）",
      description: "留空时当前账户的所有会话可访问。",
    },
    sharingMembers: {
      type: "array",
      title: "共享成员",
      default: [],
      items: {
        type: "object",
        additionalProperties: false,
        required: ["userId", "role"],
        properties: {
          userId: {
            type: "integer",
            title: "账户 ID",
            minimum: 1,
            maximum: 2147483647,
          },
          conversationId: {
            type: "string",
            title: "限制到成员会话（可选）",
            maxLength: 36,
          },
          role: {
            type: "string",
            title: "权限",
            enum: ["viewer", "editor", "manager"],
            enumNames: ["只读", "读写", "管理"],
            default: "viewer",
          },
        },
      },
    },
    includeSources: {
      type: "boolean",
      title: "同时共享来源片段",
      default: true,
    },
  },
};
export const templateSharingSchema = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["userId", "role"],
    properties: {
      userId: { type: "integer", minimum: 1, title: "账户 ID" },
      role: {
        type: "string",
        title: "模板权限",
        enum: ["viewer", "editor"],
        enumNames: ["读取与调用", "修改与调用"],
        default: "viewer",
      },
    },
  },
};
export const commonConfigSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    try_times: {
      type: "integer",
      minimum: 1,
      maximum: 10,
      title: "失败重试次数",
      default: 3,
    },
    retry_delay: {
      type: "number",
      minimum: 0,
      maximum: 120,
      title: "重试间隔（秒）",
      default: 1,
    },
    max_concurrency: {
      type: "integer",
      minimum: 1,
      maximum: 16,
      title: "节点内部并发数",
      default: 2,
    },
  },
};
