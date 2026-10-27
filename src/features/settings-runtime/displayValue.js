export function formatSettingsValue(value) {
    if (value == null) return '—';
    if (typeof value === 'boolean') return value ? '是' : '否';
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
}
