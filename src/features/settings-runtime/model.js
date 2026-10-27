import CryptoJS from 'crypto-js';

const FORBIDDEN_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const TRANSPARENT_CONTAINERS = new Set(['tabs', 'form-layout', 'profile-card']);
export const pathParts = (path) => Array.isArray(path) ? path : String(path || '').split('.').filter(Boolean);

export function getValue(value, path, fallback) {
    let result = value;
    for (const key of pathParts(path)) {
        if (FORBIDDEN_KEYS.has(String(key)) || result == null || !Object.hasOwn(Object(result), key)) return fallback;
        result = result[key];
    }
    return result === undefined ? fallback : result;
}

export function setValue(value, path, next) {
    const parts = pathParts(path);
    if (!parts.length) return next;
    if (parts.some((key) => FORBIDDEN_KEYS.has(String(key)))) throw new Error('无效的数据路径。');
    const [key, ...rest] = parts;
    const result = Array.isArray(value) ? [...value] : { ...(value || {}) };
    result[key] = rest.length ? setValue(result[key], rest, next) : next;
    return result;
}

export function cloneData(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value, (key, entry) => key === '_response' ? undefined : entry));
}

/** References are data paths in a finite scope; descriptors never evaluate code. */
export function resolveValue(value, scope = {}) {
    if (Array.isArray(value)) return value.map((entry) => resolveValue(entry, scope));
    if (!value || typeof value !== 'object') return value;
    if (Object.hasOwn(value, '$ref')) {
        const result = getValue(scope, value.$ref);
        return result === undefined && Object.hasOwn(value, 'default') ? resolveValue(value.default, scope) : result;
    }
    if (Object.hasOwn(value, '$transform')) {
        const result = resolveValue(value.value, scope);
        switch (value.$transform) {
            case 'sha256': return CryptoJS.SHA256(String(result ?? '')).toString();
            case 'json-parse': return typeof result === 'string' ? JSON.parse(result) : result;
            case 'json-stringify': return JSON.stringify(result);
            case 'number': return Number(result);
            case 'string': return String(result ?? '');
            default: throw new Error(`不支持的数据转换：${value.$transform}`);
        }
    }
    return Object.fromEntries(Object.entries(value).filter(([key]) => !FORBIDDEN_KEYS.has(key))
        .map(([key, entry]) => [key, resolveValue(entry, scope)]));
}

export function formatValue(value, scope = {}, encode = false) {
    if (typeof value !== 'string') return value;
    return value.replace(/\{([A-Za-z0-9_.-]+)\}/g, (_, path) => {
        const result = getValue(scope, path);
        if (result === undefined || result === null) return '';
        return encode ? encodeURIComponent(String(result)) : String(result);
    });
}

export function requestEndpoint(value, scope) {
    if (typeof value === 'string') {
        for (const [, path] of value.matchAll(/\{([A-Za-z0-9_.-]+)\}/g)) {
            const reference = getValue(scope, path);
            if (reference === undefined || reference === null || reference === '') throw new Error(`接口路径缺少参数：${path}`);
        }
    }
    const endpoint = formatValue(value, scope, true);
    if (typeof endpoint !== 'string' || !endpoint.startsWith('/') || endpoint.startsWith('//') || /[\\\r\n]/.test(endpoint) || /(^|\/)\.\.(\/|$)/.test(endpoint.split('?')[0])) {
        throw new Error('页面操作包含无效的接口地址。');
    }
    return endpoint;
}

export function matchesCondition(condition, scope = {}) {
    if (condition === undefined || condition === null) return true;
    if (typeof condition === 'boolean') return condition;
    if (Array.isArray(condition.all)) return condition.all.every((entry) => matchesCondition(entry, scope));
    if (Array.isArray(condition.any)) return condition.any.some((entry) => matchesCondition(entry, scope));
    if (Object.hasOwn(condition, 'not')) return !matchesCondition(condition.not, scope);
    const left = resolveValue(condition.left ?? (condition.$ref ? { $ref: condition.$ref } : undefined), scope);
    const operation = condition.op || (Object.hasOwn(condition, 'eq') ? 'eq' : 'truthy');
    const right = resolveValue(condition.right ?? condition.eq, scope);
    switch (operation) {
        case 'eq': return left === right;
        case 'ne': return left !== right;
        case 'in': return Array.isArray(right) && right.includes(left);
        case 'truthy': return Boolean(left);
        case 'empty': return left == null || left === '' || (Array.isArray(left) && !left.length);
        default: throw new Error(`不支持的显示条件：${operation}`);
    }
}

export function applyRules(values, rules, scope = {}) {
    let result = values;
    for (const rule of rules || []) {
        if (rule.on && rule.on !== scope.changedField) continue;
        if (!matchesCondition(rule.when, { ...scope, form: result })) continue;
        for (const [path, value] of Object.entries(rule.set || {})) result = setValue(result, path, resolveValue(value, { ...scope, form: result }));
    }
    return result;
}

/** Presentation containers expose descendants without adding form identity. */
export function settingsChildFields(field) {
    if (field.type === 'tabs') return (Array.isArray(field.tabs) ? field.tabs : []).flatMap((tab) => Array.isArray(tab?.options) ? tab.options : []);
    return field.children || field.options || [];
}

export function findSettingsField(fields, path) {
    for (const field of fields || []) {
        if (TRANSPARENT_CONTAINERS.has(field.type)) {
            const found = findSettingsField(settingsChildFields(field), path);
            if (found) return found;
            continue;
        }
        const parts = pathParts(field.name);
        if (!parts.every((key, index) => String(key) === String(path[index]))) continue;
        if (parts.length === path.length && field.name) return field;
        const rest = path.slice(parts.length);
        const nested = field.type === 'list' && /^\d+$/.test(String(rest[0])) ? rest.slice(1) : rest;
        const found = findSettingsField(settingsChildFields(field), nested);
        if (found) return found;
    }
    return null;
}

export function pageValues(options = [], initial = {}) {
    let result = cloneData(initial) || {};
    for (const field of options) {
        if (!field) continue;
        if (TRANSPARENT_CONTAINERS.has(field.type)) { result = pageValues(settingsChildFields(field), result); continue; }
        if (!field.name) {
            if (field.children || field.options) result = pageValues(field.children || field.options, result);
            continue;
        }
        const path = pathParts(field.name);
        const present = getValue(result, path);
        if ((['group', 'form', 'card'].includes(field.type)) && present && typeof present === 'object' && !Array.isArray(present)) {
            result = setValue(result, path, pageValues(field.children || field.options || [], present));
            continue;
        }
        if (field.type === 'list' && Array.isArray(present)) {
            result = setValue(result, path, present.map((entry) => pageValues(field.children || [], entry)));
            continue;
        }
        if (present !== undefined) continue;
        if (field.defaultNull) result = setValue(result, path, null);
        else if (Object.hasOwn(field, 'default')) result = setValue(result, path, cloneData(field.default));
        else if (['group', 'form', 'card'].includes(field.type)) result = setValue(result, path, pageValues(field.children || field.options || [], {}));
        else if (field.nullable) result = setValue(result, path, null);
    }
    return result;
}

export function validateFields(fields, form, prefix = [], errors = {}, context = {}) {
    for (const field of fields || []) {
        if (!field) continue;
        const scope = { ...context, form: getValue(form, prefix, form), root: form };
        if (field.when && !matchesCondition(field.when, scope)) continue;
        if (TRANSPARENT_CONTAINERS.has(field.type)) { validateFields(settingsChildFields(field), form, prefix, errors, context); continue; }
        if (!field.name) { if (field.children || field.options) validateFields(field.children || field.options, form, prefix, errors, context); continue; }
        const path = [...prefix, ...pathParts(field.name)];
        const value = getValue(form, path);
        const name = path.join('.');
        if (Array.isArray(value) && field.type === 'list') value.forEach((entry, index) => validateFields(field.children, form, [...path, index], errors, context));
        if ((field.required || (field.requiredOnCreate && context.isCreate)) && (value == null || value === '' || (Array.isArray(value) && !value.length))) errors[name] = `${field.text || field.name}不能为空。`;
        if (typeof value === 'string') {
            if (field.maxLength && value.length > field.maxLength) errors[name] = `${field.text || field.name}超过最大长度。`;
            if (field.pattern && !new RegExp(field.pattern).test(value)) errors[name] = field.validationMessage || `${field.text || field.name}格式不正确。`;
        }
        if (typeof value === 'number' && ((field.min != null && value < field.min) || (field.max != null && value > field.max))) errors[name] = `${field.text || field.name}超出允许范围。`;
        if (['group', 'form', 'card'].includes(field.type)) validateFields(field.children || field.options, form, path, errors, context);
    }
    return errors;
}

/** One operation executor shared by forms, resource cards and action bars. */
export async function executeRequest(action, scope, { api, client, signal, onProgress }) {
    if (!matchesCondition(action.when || action.showWhen, scope)) return undefined;
    if (action.disabled === true || (action.disabledWhen && matchesCondition(action.disabledWhen, scope))) throw new Error(action.disabledMessage || '该操作尚未满足执行条件。');
    let response = scope.response;
    if (action.steps?.length) {
        for (const step of action.steps) response = await executeRequest(step, { ...scope, response }, { api, client, signal, onProgress });
        return response;
    }
    const body = resolveValue(action.body, scope);
    if (action.clientAction) return client.invoke(action.clientAction, body || {}, { signal, onProgress });
    const endpoint = requestEndpoint(action.endpoint, scope);
    const method = String(action.method || 'GET').toLowerCase();
    const config = { signal, params: resolveValue(action.params, scope), ...(action.timeoutMs ? { timeout: action.timeoutMs } : {}), ...(action.encoding === 'form' ? { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } : {}) };
    if (method === 'get') return api.get(endpoint, config);
    if (method === 'delete') return api.delete(endpoint, { ...config, data: body });
    if (!['post', 'put', 'patch'].includes(method)) throw new Error('页面操作使用了不支持的请求方式。');
    return api[method](endpoint, body, config);
}
