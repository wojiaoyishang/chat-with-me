/** Shared metadata, fresh conversation permissions, and cancellable single-flight reads. */
export function chatboxResourceIdentity(connection, userId, token) {
    // A bearer token already identifies its principal. Hydrating that same
    // principal's display ID must not retire an authenticated first load.
    return JSON.stringify([connection.id, connection.url, connection.epoch,
        token ? ['token', token] : ['user', userId || '']]);
}

export function createChatboxResourceLoader({ fetchConfiguration, getScope, now = Date.now, ttlMs = 30_000, setupTtlMs = 300_000 }) {
    let scope = null;
    let metadata = null;
    let metadataEpoch = 0;
    const requests = new Map();

    const clear = () => {
        metadata = null;
        metadataEpoch += 1;
        for (const entry of requests.values()) {
            clearTimeout(entry.abortTimer);
            if (!entry.settled) entry.controller.abort();
        }
        requests.clear();
    };
    const currentScope = () => {
        const next = getScope();
        if (scope !== next) { clear(); scope = next; }
        return scope;
    };
    const conversationKey = (conversationId) => conversationId || '__new_conversation__';

    const acquire = ({ conversationId = null, forceSetup = false } = {}) => {
        const requestScope = currentScope();
        const key = conversationKey(conversationId);
        let entry = requests.get(key);
        if (!entry || entry.settled || entry.epoch !== metadataEpoch) {
            if (entry && !entry.settled) entry.controller.abort();
            if (requests.size >= 80) {
                for (const [oldKey, previous] of requests) {
                    if (previous.settled && !previous.consumers) requests.delete(oldKey);
                    if (requests.size < 64) break;
                }
            }
            const controller = new AbortController();
            entry = { controller, consumers: 0, settled: false, completedAt: 0, epoch: metadataEpoch, abortTimer: null };
            requests.set(key, entry);
            const epoch = metadataEpoch;
            const includeSetup = forceSetup || !metadata?.setup || now() - metadata.setupAt >= setupTtlMs;
            const revision = metadata?.catalogRevision;
            entry.promise = Promise.resolve().then(() => fetchConfiguration({
                conversationId, catalogRevision: revision, includeSetup, signal: controller.signal,
            })).then((payload) => {
                if (controller.signal.aborted || requestScope !== currentScope() || epoch !== metadataEpoch) {
                    throw new DOMException('ChatBox request retired', 'AbortError');
                }
                const previous = metadata;
                const unchangedCatalog = previous?.catalogRevision && payload.catalogRevision === previous.catalogRevision;
                const extraTools = unchangedCatalog ? previous.extra_tools : payload.extra_tools;
                if (!Array.isArray(extraTools)) throw new Error('工具目录未加载，请重新加载工具。');
                const setup = { ...(previous?.setup || {}) };
                for (const name of ['builtin_tools', 'roles', 'capabilities']) {
                    if (Object.hasOwn(payload, name)) setup[name] = payload[name];
                }
                metadata = {
                    extra_tools: extraTools, catalogRevision: payload.catalogRevision,
                    setup, setupAt: includeSetup ? now() : previous?.setupAt || now(),
                };
                entry.completedAt = now();
                entry.success = true;
                return { ...setup, ...payload, extra_tools: extraTools,
                    setupChanged: !previous?.setup || JSON.stringify(previous.setup) !== JSON.stringify(setup) };
            }).finally(() => { entry.settled = true; });
        }
        clearTimeout(entry.abortTimer);
        entry.consumers += 1;
        let released = false;
        return {
            promise: entry.promise,
            release() {
                if (released) return;
                released = true;
                entry.consumers -= 1;
                if (entry.consumers || entry.settled) return;
                // StrictMode remounts subscribe in the same turn. Only retire a
                // request once no replacement consumer needs it.
                entry.abortTimer = setTimeout(() => {
                    if (!entry.consumers && !entry.settled) {
                        entry.controller.abort();
                        if (requests.get(key) === entry) requests.delete(key);
                    }
                }, 0);
            },
        };
    };

    return {
        acquire,
        isFresh(conversationId) {
            currentScope();
            const entry = requests.get(conversationKey(conversationId));
            return Boolean(entry?.success && entry.epoch === metadataEpoch && now() - entry.completedAt < ttlMs);
        },
        invalidate({ catalog = false, setup = false } = {}) {
            currentScope();
            if (catalog || setup) {
                metadataEpoch += 1;
                if (metadata) metadata = { ...metadata,
                    catalogRevision: catalog ? undefined : metadata.catalogRevision,
                    setupAt: Number.NEGATIVE_INFINITY };
            }
            for (const entry of requests.values()) { entry.completedAt = 0; entry.success = false; }
        },
        clear,
    };
}

export function chatboxConfigurationFingerprint(data) {
    return JSON.stringify([
        data.catalogRevision || data.extra_tools,
        data.toolPermissions, data.ignoreAttachmentTools, data.readOnly, data.tipMessage,
        data.builtin_tools, data.roles, data.capabilities,
    ]);
}
