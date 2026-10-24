export const storyKey = (story) => String(story?.storyId ?? '');
export const STORY_EXPORT_LIMIT = 100;

export function flattenStoryConversations(items) {
    const result = [];
    const seen = new Set();
    const visit = values => {
        for (const item of values || []) {
            const id = String(item?.conversationId || '').trim();
            if (id && !seen.has(id)) {
                seen.add(id);
                result.push({ conversationId: id, title: String(item.title || '').trim() || '未命名对话' });
            }
            if (Array.isArray(item?.children)) visit(item.children);
        }
    };
    visit(Array.isArray(items) ? items : []);
    return result;
}

export function normalizeStoryExportIds(ids) {
    const values = [];
    const seen = new Set();
    for (const id of ids) {
        if ((typeof id !== 'number' && typeof id !== 'string') || !/^\d+$/.test(String(id))) {
            throw new Error('故事 ID 无效，请刷新页面后重试。');
        }
        const value = Number(id);
        if (!Number.isSafeInteger(value) || value <= 0) {
            throw new Error('故事 ID 无效，请刷新页面后重试。');
        }
        if (!seen.has(value)) { seen.add(value); values.push(value); }
    }
    if (values.length > STORY_EXPORT_LIMIT) {
        throw new Error(`每次最多导出 ${STORY_EXPORT_LIMIT} 个故事，请分批选择后导出。`);
    }
    return values;
}

export function toggleStorySelection(selected, ids, checked) {
    const next = new Set(selected);
    for (const id of ids) {
        const key = String(id);
        if (checked) next.add(key);
        else next.delete(key);
    }
    return next;
}

export function storyExportFilename(disposition = '') {
    const encoded = /filename\*\s*=\s*UTF-8''([^;]+)/i.exec(disposition);
    if (encoded) {
        try { return decodeURIComponent(encoded[1].trim()); } catch { /* Use the plain fallback. */ }
    }
    return /filename\s*=\s*"([^"]+)"/i.exec(disposition)?.[1]
        || /filename\s*=\s*([^;]+)/i.exec(disposition)?.[1]?.trim()
        || 'stories.zip';
}

export function storyStatusLabel(status) {
    if (status === 'completed') return '已完成';
    if (status === 'generating') return '创作中';
    if (status === 'failed' || status === 'cancelled') return '已暂停';
    return '草稿';
}
