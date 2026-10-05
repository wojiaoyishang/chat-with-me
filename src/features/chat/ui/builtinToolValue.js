export function normalizeBuiltinToolValue(tool, value) {
    if (tool?.mode !== 'slider') return Boolean(value ?? tool?.isActive);
    const items = tool.items || [];
    if (items.some((item) => item.id === value)) return value;
    if (value === true)
        return (
            items.find((item) => item.id === 'medium')?.id ||
            items.find((item) => item.id !== 'none')?.id ||
            items[0]?.id
        );
    return items.find((item) => item.id === tool.defaultValue)?.id || items[0]?.id;
}
