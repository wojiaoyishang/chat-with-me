import { backendApiUrl, readBackendProfiles } from './connection.js';

const PROBE_TIMEOUT_MS = 8000;
const PROBE_CONCURRENCY = 3;
const idleResult = () => ({ status: 'idle', latencyText: '—', detail: '' });
const aborted = () => new DOMException('Aborted', 'AbortError');
const profileKey = (profile) => `${profile.id}:${profile.url}`;

/** Measure the public bootstrap round trip, including reading its small body.
 * Fetch is deliberately credential-free and bypasses the selected API client's
 * session interceptors: inspecting another address must not log in or switch.
 */
export async function probeBackendConnection(profile, {
    signal, timeoutMs = PROBE_TIMEOUT_MS,
    request = (...args) => globalThis.fetch(...args),
    now = () => performance.now(),
} = {}) {
    if (signal?.aborted) throw aborted();
    const controller = new AbortController();
    const cancel = () => controller.abort();
    signal?.addEventListener('abort', cancel, { once: true });
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; controller.abort(); }, timeoutMs);
    const started = now();
    try {
        const response = await request(backendApiUrl('client/bootstrap', profile), {
            method: 'GET', signal: controller.signal, cache: 'no-store',
            credentials: 'omit', redirect: 'error', headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}${response.statusText ? ` · ${response.statusText}` : ''}`);
        let body;
        try { body = await response.json(); }
        catch { throw new Error('后端没有返回有效的客户端信息。'); }
        if (signal?.aborted) throw aborted();
        if (timedOut) throw new Error('请求超时。');
        if (body?.success !== true) throw new Error(body?.msg || '后端拒绝了连接检测。');
        if (body.data?.protocol !== 'cwm.client.v1') return { status: 'incompatible', latencyText: '—', detail: '该地址不支持当前客户端协议。' };
        const latencyMs = Math.max(1, Math.round(now() - started));
        return { status: 'available', latencyMs, latencyText: `${latencyMs} ms`, detail: '' };
    } catch (cause) {
        if (signal?.aborted) throw aborted();
        return {
            status: timedOut ? 'timeout' : 'unavailable', latencyText: '—',
            detail: timedOut ? `${timeoutMs / 1000} 秒内未收到完整响应。` : cause instanceof TypeError ? '浏览器无法访问该地址，请检查网络、HTTPS 和跨域设置。' : cause.message || '连接检测失败。',
        };
    } finally {
        clearTimeout(timer);
        signal?.removeEventListener('abort', cancel);
    }
}

/** Tab-local observations, never saved as connection configuration. A bounded
 * batch snapshots the saved addresses and publishes each result as it arrives.
 */
export function createBackendProbeStore({
    profiles = () => readBackendProfiles().profiles,
    probe = probeBackendConnection,
    concurrency = PROBE_CONCURRENCY,
} = {}) {
    const results = new Map();
    const listeners = new Set();
    let running = false;
    const notify = () => listeners.forEach((listener) => listener());
    const read = () => {
        const current = profiles();
        const keys = new Set(current.map(profileKey));
        for (const key of results.keys()) if (!keys.has(key)) results.delete(key);
        return current.map((profile) => ({ ...profile, probeRunning: running, probe: { ...(results.get(profileKey(profile)) || idleResult()) } }));
    };
    const run = async ({ profileId, signal, onProgress } = {}) => {
        if (signal?.aborted) throw aborted();
        if (running) throw new Error('正在测速，请等待当前检测完成。');
        const targets = profiles().filter((profile) => !profileId || profile.id === profileId);
        if (profileId && !targets.length) throw new Error('该后端连接已被删除。');
        const controller = new AbortController();
        const cancel = () => controller.abort();
        signal?.addEventListener('abort', cancel, { once: true });
        const batchSignal = controller.signal;
        running = true;
        let next = 0, completed = 0, available = 0;
        const progress = () => onProgress?.({ message: `正在测速后端… ${completed} / ${targets.length}`, percent: targets.length ? completed / targets.length * 100 : 100 });
        for (const profile of targets) results.set(profileKey(profile), { status: 'queued', latencyText: '—', detail: '' });
        notify();
        try {
            progress();
            const worker = async () => {
                while (!batchSignal.aborted && next < targets.length) {
                    const profile = targets[next++];
                    const key = profileKey(profile);
                    results.set(key, { status: 'checking', latencyText: '—', detail: '' });
                    notify();
                    const result = await probe(profile, { signal: batchSignal });
                    if (batchSignal.aborted) return;
                    results.set(key, { ...result, checkedAt: Date.now() });
                    completed += 1;
                    if (result.status === 'available') available += 1;
                    notify();
                    progress();
                }
            };
            await Promise.all(Array.from({ length: Math.min(Math.max(1, concurrency), targets.length) }, worker));
            if (signal?.aborted) throw aborted();
            return { total: targets.length, available, failed: targets.length - available };
        } finally {
            controller.abort();
            signal?.removeEventListener('abort', cancel);
            for (const profile of targets) {
                const key = profileKey(profile);
                if (['queued', 'checking'].includes(results.get(key)?.status)) results.set(key, { status: 'cancelled', latencyText: '—', detail: '' });
            }
            running = false;
            notify();
        }
    };
    return { read, run, subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); } };
}

export const backendConnectionProbes = createBackendProbeStore();
