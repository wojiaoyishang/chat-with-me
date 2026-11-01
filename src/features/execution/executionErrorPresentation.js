/** Keep provider messages readable while retaining their complete diagnostic payload. */
export function executionErrorPresentation(value) {
    const raw = typeof value === 'string' ? value : JSON.stringify(value ?? '');
    const start = raw.indexOf('{');
    if (start < 0) return {message: raw, details: ''};
    try {
        const parsed = JSON.parse(raw.slice(start));
        const message = parsed?.error?.message ?? parsed?.message ?? parsed?.detail;
        if (typeof message === 'string' && message.trim()) {
            return {message, details: raw};
        }
    } catch {
        // Plain text and incomplete JSON remain visible verbatim.
    }
    return {message: raw, details: ''};
}
