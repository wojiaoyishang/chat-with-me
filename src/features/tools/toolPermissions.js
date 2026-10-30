const MODES = ['allow', 'ask', 'deny'];

export const getToolPermissionKey = (tool) => tool?.permissionKey || tool?.name;

// A shared approval action is not a callable identity. Transport/source is part
// of ToolRef, while provider aliases and Python handler names are not.
export const getToolCallableIdentity = (tool) => {
    if (tool?.permissionOnly) return `permission:${getToolPermissionKey(tool)}`;
    const ref = tool?.toolRef;
    if (ref?.source && ref?.toolset && ref?.name) return JSON.stringify([ref.source, ref.toolset, ref.name]);
    return tool?.accessPath || tool?.name || '';
};

export const collectToolPermissionUsage = (items = []) => {
    const usage = new Map();
    const visit = entries => entries.forEach(item => {
        if (item?.type === 'group' || item?.type === 'tool-region') return visit(item.children || []);
        if (item?.type !== 'tool') return;
        const key = getToolPermissionKey(item);
        if (!key) return;
        if (!usage.has(key)) usage.set(key, {tools: [], identities: new Set(), label: ''});
        const entry = usage.get(key);
        if (!entry.label && item.permissionLabel) entry.label = item.permissionLabel;
        if (!item.permissionOnly && !entry.identities.has(getToolCallableIdentity(item))) {
            entry.identities.add(getToolCallableIdentity(item));
            entry.tools.push(item);
        }
    });
    visit(items);
    return usage;
};

export const getToolCatalogCounts = (items = []) => {
    const usage = collectToolPermissionUsage(items);
    return {tools: [...usage.values()].reduce((sum, item) => sum + item.identities.size, 0), permissions: usage.size};
};

export const getSharedToolPermissionText = (tool, usage) => {
    const entry = usage.get(getToolPermissionKey(tool));
    return entry?.identities.size > 1 ? `共享权限${entry.label ? ` · ${entry.label}` : ''}` : '';
};

// Catalog labels are final server-owned text, never client translation keys.
export const getToolDisplayName = (tool, fallback = '工具') =>
    [tool?.text, tool?.title, tool?.name].find(value => typeof value === 'string' && value.trim()) || fallback;

export const applyBulkToolPermissionMode = (permissions = {}, tools = [], mode) => {
    const next = {...permissions};
    if (!MODES.includes(mode)) return next;
    for (const tool of tools) {
        const key = getToolPermissionKey(tool);
        if (!key || tool.locked) continue;
        const allowedModes = Array.isArray(tool.allowedModes) && tool.allowedModes.length
            ? tool.allowedModes : MODES;
        if (allowedModes.includes(mode)) next[key] = mode;
    }
    return next;
};

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

export const readSharedToolPermission = (tool, usage, ...sources) => {
    const peers = usage.get(getToolPermissionKey(tool))?.tools || [];
    return readToolPermission({...tool, permissionAliases: [...new Set([
        ...getToolPermissionAliases(tool), ...peers.flatMap(getToolPermissionAliases),
    ])]}, ...sources);
};

export const deduplicateToolPermissionGroups = (groups = []) => {
    const seen = new Map();
    const result = groups.map(group => ({...group, tools: []}));
    groups.forEach((group, index) => {
        (group.tools || []).forEach(tool => {
            const key = getToolCallableIdentity(tool);
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
                    name: getToolDisplayName(item),
                    description: item.description,
                    tools: [],
                };
                if (!group) groups.push(next);
                visit(item.children || [], next);
            } else if (item.type === 'tool' && getToolPermissionKey(item)) {
                let target = group || groups.find(entry => entry.id === '__other__');
                if (!target) {
                    target = {id: '__other__', name: '其他工具', tools: []};
                    groups.push(target);
                }
                target.tools.push(item);
            }
        });
    };
    visit(items);
    return deduplicateToolPermissionGroups(groups);
};

// Only aliases of the same actual callable are collapsed. Different functions
// remain visible even when they intentionally share one approval action.
export const deduplicateToolPermissionItems = (items = []) => {
    const seen = new Map();
    const visit = entries => entries.flatMap(item => {
        if (!item) return [];
        if (item.type === 'tool') {
            const key = getToolCallableIdentity(item);
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
