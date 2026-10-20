import { resolveCwmUrl } from '@/lib/virtualUrl.js';

/** Restrict media URLs from Markdown before assigning them to a browser element. */
export function resolveMarkdownMediaUrl(value) {
    if (typeof value !== 'string') return '';
    const raw = value.trim();
    if (!raw || raw.includes('\\') || [...raw].some((char) => {
        const code = char.codePointAt(0);
        return code < 32 || code === 127;
    })) return '';

    const resourceUrl = resolveCwmUrl(raw);
    if (resourceUrl !== null) return resourceUrl;

    if (/^https?:\/\//i.test(raw)) {
        try {
            const url = new URL(raw);
            return !url.username && !url.password && ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch {
            return '';
        }
    }

    // Keep ordinary same-origin paths available for document media. A protocol-relative
    // URL or another URI scheme must never bypass the explicit checks above.
    if (raw.startsWith('//') || raw.startsWith('?') || raw.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(raw)) {
        return '';
    }
    return raw;
}
