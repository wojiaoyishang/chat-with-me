/** Read-only images use embedded pixels or app resources, never third-party trackers. */
export function readonlyImageSource(value) {
    if (typeof value !== 'string' || value.length > 2_000_000 || /[\\\r\n]/.test(value)) return '';
    if (/^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+$/.test(value)) return value;
    if (/^\/(?!\/)/.test(value) || /^cwm:\/\//.test(value)) return value;
    return '';
}

export function readonlyImageSize(value, fallback = 240) {
    return Number.isFinite(Number(value)) && Number(value) > 0 ? Math.min(640, Math.max(32, Number(value))) : fallback;
}
