import apiClient from './apiClient.js';
import { BASE_BACKEND_URL } from '@/config.js';

export function isDocumentDownloadUrl(value) {
    try {
        const base = new URL(BASE_BACKEND_URL || '/', window.location.origin);
        const url = new URL(value, window.location.origin);
        const prefix = base.pathname.replace(/\/$/, '');
        return (
            url.origin === base.origin &&
            url.pathname.startsWith(`${prefix}/document/`) &&
            /^\/document\/[A-Za-z0-9._-]+\/files\/download$/.test(url.pathname.slice(prefix.length))
        );
    } catch {
        return false;
    }
}

export async function downloadDocumentResource(url) {
    if (!isDocumentDownloadUrl(url)) throw new Error('Invalid document download URL');
    let response;
    try {
        response = await apiClient.get(url, { responseType: 'blob', rawResponse: true });
    } catch (error) {
        if (error.response?.data instanceof Blob) {
            try {
                const body = JSON.parse(await error.response.data.text());
                if (body.msg) error.message = body.msg;
            } catch {
                /* Keep the original error for non-JSON responses. */
            }
        }
        throw error;
    }
    const disposition = response.headers['content-disposition'] || '';
    const encoded = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    const plain = /filename="([^"]+)"/i.exec(disposition);
    const filename = encoded ? decodeURIComponent(encoded[1]) : plain?.[1] || 'download';
    const objectUrl = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
