const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on', 'enabled']);
const FALSE_VALUES = new Set(['0', 'false', 'no', 'off', 'disabled', '']);

export const normalizeCapabilityBoolean = (value, fallback = false) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (TRUE_VALUES.has(normalized)) return true;
        if (FALSE_VALUES.has(normalized)) return false;
    }
    return Boolean(fallback);
};

export const modelSupportsVision = (model) => {
    if (!model || typeof model !== 'object') return false;

    const rawValue = model.support_vision
        ?? model.supportVision
        ?? model.supports_vision
        ?? model.vision_supported
        ?? model.capabilities?.vision;

    return normalizeCapabilityBoolean(rawValue, false);
};

export const normalizeRemoteChatModel = (model) => {
    if (!model || typeof model !== 'object') return model;
    return {
        ...model,
        support_vision: modelSupportsVision(model),
    };
};
