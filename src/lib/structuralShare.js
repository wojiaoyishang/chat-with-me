/** Preserve references for unchanged JSON data, including sparse server patches. */
export function shareJsonData(previous, incoming) {
    if (Object.is(previous, incoming)) return previous;
    if (!previous || !incoming || typeof previous !== 'object' || typeof incoming !== 'object'
        || Array.isArray(previous) !== Array.isArray(incoming)) return incoming;
    const keys = Object.keys(incoming);
    let unchanged = keys.length === Object.keys(previous).length
        && (!Array.isArray(incoming) || incoming.length === previous.length);
    const result = Array.isArray(incoming) ? [] : {};
    for (const key of keys) {
        const value = shareJsonData(previous[key], incoming[key]);
        if (key === '__proto__') Object.defineProperty(result, key, {value, enumerable: true, configurable: true, writable: true});
        else result[key] = value;
        if (!Object.hasOwn(previous, key) || result[key] !== previous[key]) unchanged = false;
    }
    return unchanged ? previous : result;
}
