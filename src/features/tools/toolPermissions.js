const MODES = ['allow', 'ask', 'deny'];

export const getToolPermissionKey = (tool) => tool?.permissionKey || tool?.name;

export const normalizeToolPermissionMode = (value, fallback = 'ask') => {
    if (typeof value === 'boolean') return value ? 'allow' : 'deny';
    const mode = String(value || '').toLowerCase();
    return MODES.includes(mode) ? mode : fallback;
};

export const getToolPermissionAliases = (tool) => [...new Set([
    tool?.name,
    ...(Array.isArray(tool?.permissionAliases) ? tool.permissionAliases : []),
].filter(name => name && name !== getToolPermissionKey(tool)))];

// Canonical values take precedence. Conflicting old callable-name values migrate
// conservatively, so an old allow cannot overwrite an existing deny.
export const readToolPermission = (tool, ...sources) => {
    const key = getToolPermissionKey(tool);
    for (const source of sources) {
        if (source?.[key] !== undefined && source[key] !== null) return source[key];
        const aliases = getToolPermissionAliases(tool)
            .map(name => source?.[name])
            .filter(value => value !== undefined && value !== null);
        if (aliases.length > 0) {
            const modes = aliases.map(value => normalizeToolPermissionMode(value));
            return modes.includes('deny') ? 'deny' : modes.includes('ask') ? 'ask' : 'allow';
        }
    }
    return undefined;
};

export const deduplicateToolPermissionGroups = (groups = []) => {
    const seen = new Map();
    const result = groups.map(group => ({...group, tools: []}));
    groups.forEach((group, index) => {
        (group.tools || []).forEach(tool => {
            const key = getToolPermissionKey(tool);
            if (!key) return;
            const existing = seen.get(key);
            if (existing) {
                existing.permissionAliases = [...new Set([
                    ...getToolPermissionAliases(existing),
                    ...getToolPermissionAliases(tool),
                ])];
                return;
            }
            const item = {...tool, permissionAliases: getToolPermissionAliases(tool)};
            seen.set(key, item);
            result[index].tools.push(item);
        });
    });
    return result.filter(group => group.tools.length > 0);
};

export const collectToolPermissionGroups = (items = []) => {
    const groups = [];
    const visit = (entries, group = null) => {
        entries.forEach(item => {
            if (!item) return;
            if (item.type === 'tool-region') return visit(item.children || [], group);
            if (item.type === 'group') {
                const next = group || {
                    id: item.name || item.text || `group-${groups.length}`,
                    name: item.text || item.name || 'tools',
                    description: item.description,
                    tools: [],
                };
                if (!group) groups.push(next);
                visit(item.children || [], next);
            } else if (item.type === 'tool' && getToolPermissionKey(item)) {
                let target = group || groups.find(entry => entry.id === '__other__');
                if (!target) {
                    target = {id: '__other__', name: 'other_tools', tools: []};
                    groups.push(target);
                }
                target.tools.push(item);
            }
        });
    };
    visit(items);
    return deduplicateToolPermissionGroups(groups);
};

// Retain actual callable names in the catalog, while only displaying one control
// for aliases of the same business action in the composer menu.
export const deduplicateToolPermissionItems = (items = []) => {
    const seen = new Map();
    const visit = entries => entries.flatMap(item => {
        if (!item) return [];
        if (item.type === 'tool') {
            const key = getToolPermissionKey(item);
            if (seen.has(key)) {
                const existing = seen.get(key);
                existing.permissionAliases = [...new Set([
                    ...getToolPermissionAliases(existing), ...getToolPermissionAliases(item),
                ])];
                return [];
            }
            const next = {...item, permissionAliases: getToolPermissionAliases(item)};
            seen.set(key, next);
            return [next];
        }
        if (item.type === 'group' || item.type === 'tool-region') {
            const children = visit(item.children || []);
            return children.length ? [{...item, children}] : [];
        }
        return [item];
    });
    return visit(items);
};

export const collectToolPermissions = (items = [], status = {}) => {
    const records = new Map();
    const visit = (entries, current) => entries.forEach(item => {
        if (!item) return;
        if (item.type === 'tool-region') return visit(item.children || [], current);
        if (!item.name) return;
        if (item.type === 'group') return visit(item.children || [], current?.[item.name] || {});
        if (item.type !== 'tool') return;
        const key = getToolPermissionKey(item);
        if (!records.has(key)) records.set(key, []);
        records.get(key).push({tool: item, current});
    });
    visit(items, status);
    return Object.fromEntries([...records].map(([key, entries]) => {
        const tool = entries[0].tool;
        const canonical = entries.find(entry => entry.current?.[key] !== undefined);
        const legacy = entries.map(entry => readToolPermission(entry.tool, entry.current)).filter(value => value !== undefined);
        const value = canonical ? canonical.current[key] : legacy.length
            ? legacy.some(mode => normalizeToolPermissionMode(mode) === 'deny') ? 'deny'
                : legacy.some(mode => normalizeToolPermissionMode(mode) === 'ask') ? 'ask' : 'allow'
            : tool.default;
        return [key, normalizeToolPermissionMode(tool.locked ? tool.default : value)];
    }));
};

export const applyToolPermissionsToStatus = (items = [], status = {}, permissions = {}) => {
    const visit = (entries, current = {}) => {
        let next = {...current};
        entries.forEach(item => {
            if (!item) return;
            if (item.type === 'tool-region') {
                next = visit(item.children || [], next);
            } else if (item.type === 'group' && item.name) {
                next[item.name] = visit(item.children || [], next[item.name]);
            } else if (item.type === 'tool' && item.name) {
                const value = readToolPermission(item, permissions);
                if (value !== undefined) next[getToolPermissionKey(item)] = value;
            }
        });
        return next;
    };
    return visit(items, status);
};
