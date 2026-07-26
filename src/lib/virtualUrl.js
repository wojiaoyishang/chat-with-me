import {BASE_BACKEND_URL} from '@/config.js';

const decodeSegments = (path) => {
    try {
        return String(path || '')
            .split('/')
            .filter(Boolean)
            .map(segment => decodeURIComponent(segment));
    } catch {
        return null;
    }
};

const encodeSegments = (segments) => segments.map(segment => encodeURIComponent(segment)).join('/');
const IDENTIFIER_RE = /^[A-Za-z0-9._-]+$/;

/**
 * Resolve the canonical cwm:// resource scheme to a browser URL.
 * Returns null for non-cwm URLs and an empty string for invalid/tool-only cwm URLs.
 */
export const resolveCwmUrl = (value) => {
    if (typeof value !== 'string') return null;
    const raw = value.trim();
    if (!raw.toLowerCase().startsWith('cwm://')) return null;
    if (/[?#]/.test(raw)) return '';

    const match = /^cwm:\/\/([a-z]+)(?:\/(.*))?$/i.exec(raw);
    if (!match) return '';
    const authority = match[1].toLowerCase();
    const segments = decodeSegments(match[2] || '');
    if (!segments || segments.some(segment => !segment || segment === '.' || segment === '..' || segment.includes('/') || segment.includes('\\'))) return '';
    const base = String(BASE_BACKEND_URL || '').replace(/\/$/, '');

    if (authority === 'artifact' && IDENTIFIER_RE.test(segments[0] || '') && (segments.length === 1 || (segments.length === 2 && segments[1] === 'preview'))) {
        const id = encodeURIComponent(segments[0]);
        return segments[1] === 'preview'
            ? `${base}/upload/preview/${id}`
            : `${base}/upload/${id}`;
    }
    if (authority === 'public' && segments.length > 0) {
        return `${base}/public/${encodeSegments(segments)}`;
    }
    if (authority === 'document' && IDENTIFIER_RE.test(segments[0] || '') && segments.length === 2 && segments[1] === 'preview') {
        return `${base}/document/preview/${encodeURIComponent(segments[0])}`;
    }

    // cwm://workspace/... is contextual and tool-only; it has no stable browser target.
    return '';
};

export const resolveResourceUrl = (value) => {
    const resolved = resolveCwmUrl(value);
    return resolved === null ? value : resolved;
};


export const artifactPreviewVirtualUrl = (serverId) => {
    const value = String(serverId || '').trim();
    if (!IDENTIFIER_RE.test(value)) return '';
    return `cwm://artifact/${encodeURIComponent(value)}/preview`;
};
