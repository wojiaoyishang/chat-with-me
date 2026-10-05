import * as Y from 'yjs';

export const toBase64 = (bytes) => {
    let text = '';
    for (let start = 0; start < bytes.length; start += 8192)
        text += String.fromCharCode(...bytes.subarray(start, start + 8192));
    return btoa(text);
};
export const fromBase64 = (text) => Uint8Array.from(atob(text), (char) => char.charCodeAt(0));
export const applyRemoteState = (doc, state) => Y.applyUpdate(doc, fromBase64(state), 'server');
