/** Badge visibility and wording are supplied by the backend, never inferred here. */
export const normalizeMessageBadges = (value) => {
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    const badges = [];
    value.forEach((item, index) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) return;
        const id = typeof item.id === 'string' ? item.id.trim() : '';
        const label = typeof item.label === 'string' ? item.label.trim() : '';
        if (!id || !label || seen.has(id)) return;
        seen.add(id);
        badges.push({
            id, label,
            icon: typeof item.icon === 'string' ? item.icon : '',
            tone: typeof item.tone === 'string' ? item.tone : '',
            order: typeof item.order === 'number' && Number.isFinite(item.order) ? item.order : 0,
            index,
        });
    });
    return badges.sort((a, b) => a.order - b.order || a.index - b.index)
        .map(({id, label, icon, tone, order}) => ({id, label, icon, tone, order}));
};

export const messageHintsBeforeActions = (message) => {
    const role = typeof message?.role === 'string' ? message.role.trim().toLowerCase() : '';
    if (role) return role === 'user' || role === 'system';
    return message?.position === 'right' || message?.position === 'mid';
};
