export const getNestedValue = (obj, path) => {
    if (!obj || !path || path.length === 0) return undefined;
    let current = obj;
    for (const key of path) {
        if (current[key] === undefined) return undefined;
        current = current[key];
    }
    return current;
};

export const setNestedValue = (obj, path, value) => {
    if (!path || path.length === 0) return obj;
    const result = {...obj};
    let current = result;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    current[path[path.length - 1]] = value;
    return result;
};

export const deleteNestedValue = (obj, path) => {
    if (!path || path.length === 0) return obj;
    if (path.length === 1) {
        const result = {...obj};
        delete result[path[0]];
        return result;
    }
    const parentPath = path.slice(0, -1);
    const key = path[path.length - 1];
    const parent = getNestedValue(obj, parentPath);
    if (parent && typeof parent === 'object') {
        const newParent = {...parent};
        delete newParent[key];
        if (Object.keys(newParent).length === 0) {
            return deleteNestedValue(obj, parentPath);
        }
        return setNestedValue(obj, parentPath, newParent);
    }
    return obj;
};

export const deepMerge = (target, source) => {
    if (typeof source !== 'object' || source === null) return target;
    const output = {...target};
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object' && source[key] !== null && typeof output[key] === 'object') {
                output[key] = deepMerge(output[key], source[key]);
            } else {
                output[key] = source[key];
            }
        }
    }
    return output;
};

export const collectTogglePaths = (items = [], parentPath = []) => {
    let paths = [];
    items.forEach(item => {
        if (!item.name) return;
        const currentPath = [...parentPath, item.name];
        if (item.type === 'toggle') {
            paths.push(currentPath);
        } else if (item.type === 'group' && item.children) {
            paths = [...paths, ...collectTogglePaths(item.children, currentPath)];
        }
    });
    return paths;
};

export const getGroupCheckState = (extraTools, togglePaths) => {
    if (togglePaths.length === 0) return 'unchecked';
    let checkedCount = 0;
    togglePaths.forEach(path => {
        if (getNestedValue(extraTools, path)) checkedCount++;
    });
    if (checkedCount === togglePaths.length) return 'checked';
    if (checkedCount > 0) return 'indeterminate';
    return 'unchecked';
};

export const toggleAllInGroup = (extraTools, togglePaths, toChecked) => {
    let newExtraTools = {...extraTools};
    togglePaths.forEach(path => {
        newExtraTools = setNestedValue(newExtraTools, path, toChecked);
    });
    return newExtraTools;
};
