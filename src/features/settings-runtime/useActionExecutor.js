import { useCallback, useEffect, useRef, useState } from 'react';
import { cloneData, executeRequest, formatValue, getValue, matchesCondition, requestEndpoint, resolveValue } from './model.js';
import { useSettingsOperationToasts } from './loadingToasts.js';

const operationKey = (action, scope) => `${action.id || action.label || 'action'}:${action.endpoint || action.clientAction || action.steps?.[0]?.endpoint || ''}:${scope.parentItem?.id || ''}:${scope.item?.id || scope.item?.key || ''}`;
export { operationKey };

function delay(milliseconds, signal) {
    return new Promise((resolve, reject) => {
        if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }
        const cancel = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
        const timer = setTimeout(() => { signal.removeEventListener('abort', cancel); resolve(); }, milliseconds);
        signal.addEventListener('abort', cancel, { once: true });
    });
}

/** Reads progress only. Retrying a read never repeats the submitted operation. */
export function useActionExecutor(services) {
    const current = useRef(services);
    current.current = services;
    const mounted = useRef(true);
    const controllers = useRef(new Set());
    const inFlight = useRef(new Set());
    const serial = useRef(0);
    const [operations, setOperations] = useState({});
    useSettingsOperationToasts(operations, services.navigate);
    useEffect(() => {
        mounted.current = true;
        const active = controllers.current;
        return () => {
            mounted.current = false;
            // StrictMode immediately replays effects on the same mounted tree.
            // Preserve the original read in that replay; a real unmount still
            // aborts owned requests in the next microtask.
            queueMicrotask(() => {
                if (mounted.current) return;
                for (const controller of active) controller.abort();
                active.clear();
            });
        };
    }, []);

    const execute = useCallback(async (action, suppliedScope = {}, callbacks = {}) => {
        const source = current.current;
        const scope = { ...source.scope(), ...suppliedScope };
        const key = operationKey(action, scope);
        if (inFlight.current.has(key)) return undefined;
        // Reserve the identity before the dialog opens, so a second click cannot
        // replace the first confirmation promise or submit the same action twice.
        inFlight.current.add(key);
        try {
            if (action.confirm) {
                const confirmation = Object.fromEntries(Object.entries(action.confirm).map(([name, value]) => [name, typeof value === 'string' ? formatValue(value, scope) : value]));
                if (!(await source.confirm(confirmation))) { inFlight.current.delete(key); return undefined; }
            }
        } catch (cause) {
            inFlight.current.delete(key);
            throw cause;
        }
        if (!mounted.current) { inFlight.current.delete(key); return undefined; }
        const retainResponse = action.retainResponse !== false;
        const controller = new AbortController();
        controllers.current.add(controller);
        let snapshot = {};
        const update = (value) => { snapshot = { ...snapshot, ...value }; if (mounted.current) setOperations((previous) => ({ ...previous, [key]: snapshot })); };
        update({ busy: true, watching: false, sequence: ++serial.current, message: action.pendingText || '正在执行…', error: '' });
        try {
            let response = await executeRequest(action, scope, {
                api: source.api, client: source.client, signal: controller.signal,
                onProgress: ({ message, percent }) => {
                    if (!mounted.current || controller.signal.aborted) return;
                    update({ ...(typeof message === 'string' ? { message } : {}), ...(Number.isFinite(percent) ? { percent } : {}) });
                },
            });
            if (!mounted.current || controller.signal.aborted) return undefined;
            const initialResponse = response;
            if (retainResponse) update({ response: cloneData(initialResponse) });
            if (action.watch && matchesCondition(action.watch.when, { ...scope, response: initialResponse })) {
                const watch = action.watch;
                let endpoint = requestEndpoint(watch.endpoint, { ...scope, response: initialResponse });
                const terminal = new Set(watch.terminal || []);
                if (!terminal.size) throw new Error('异步操作缺少终止状态定义。');
                const success = new Set(watch.success || []);
                const taskPage = watch.taskPage ? formatValue(watch.taskPage, { ...scope, response: initialResponse }, true) : null;
                update({ watching: true, taskPage, operationId: getValue(initialResponse, watch.taskIdPath || 'taskId') });
                let failures = 0;
                let recovering = false;
                while (!controller.signal.aborted) {
                    let progress;
                    try {
                        progress = await source.api.get(endpoint, { signal: controller.signal, timeout: watch.timeoutMs || 15000 });
                        failures = 0;
                    } catch (cause) {
                        if (controller.signal.aborted) throw cause;
                        const statusCode = Number(cause.code || cause.status || cause.response?.status);
                        if (!recovering && watch.recovery?.endpoint && (watch.recovery.statusCodes || []).includes(statusCode)) {
                            endpoint = requestEndpoint(watch.recovery.endpoint, { ...scope, response: initialResponse });
                            recovering = true;
                            continue;
                        }
                        if (statusCode === 401 || statusCode === 403) throw cause;
                        failures += 1;
                        update({ message: '进度读取中断，后台操作仍可在详情中查看。', readError: cause.message, taskPage });
                        if (failures <= 3) { await delay(Math.min(8000, 1000 * 2 ** (failures - 1)), controller.signal); continue; }
                        await new Promise((resolve, reject) => {
                            const cancel = () => reject(new DOMException('Aborted', 'AbortError'));
                            controller.signal.addEventListener('abort', cancel, { once: true });
                            update({ readPaused: true, retry: () => { controller.signal.removeEventListener('abort', cancel); failures = 0; update({ readPaused: false, readError: '', retry: null }); resolve(); } });
                        });
                        continue;
                    }
                    const status = getValue(progress, watch.statusPath || 'status');
                    update({ busy: true, status, message: getValue(progress, watch.messagePath || 'message', '正在处理…'),
                        percent: watch.progressPath ? getValue(progress, watch.progressPath) : null, taskPage,
                        ...(retainResponse ? { progress, response: progress } : {}), error: '', readError: '', readPaused: false, retry: null });
                    if (recovering && (!getValue(progress, watch.taskIdPath || 'taskId') || (watch.when && !matchesCondition(watch.when, { ...scope, response: progress })))) {
                        response = { ...initialResponse, operation: progress };
                        break;
                    }
                    if (terminal.has(status)) {
                        update({ terminal: true });
                        if (success.size && !success.has(status)) throw new Error(getValue(progress, watch.errorPath || 'error.message') || getValue(progress, watch.messagePath || 'message') || '操作未完成，请查看详情。');
                        response = { ...initialResponse, operation: progress };
                        break;
                    }
                    await delay(Math.max(250, Math.min(10000, Number(watch.intervalMs) || 1000)), controller.signal);
                }
            }
            if (!mounted.current || controller.signal.aborted) return undefined;
            const resultScope = { ...scope, response };
            for (const effect of action.effects || []) {
                if (effect.type === 'refresh') await source.refresh(effect.target);
                else if (effect.type === 'patch') {
                    const value = resolveValue(effect.value, resultScope);
                    (callbacks.patchForm || source.patchForm)(value, effect.target || 'form');
                } else if (effect.type === 'open-page') source.navigate(formatValue(effect.path, resultScope, true));
                else if (effect.type === 'open-settings') source.openSettings(resolveValue(effect.value, resultScope));
                else if (effect.type === 'open-dialog') source.openDialog(resolveValue(effect.value || effect, resultScope));
                else if (effect.type === 'toast') source.notify(formatValue(effect.message, resultScope), effect.tone);
                else if (effect.type === 'client-write') await source.client.write(effect.key, resolveValue(effect.value, resultScope));
                else if (effect.type === 'client') await source.client.invoke(effect.action, resolveValue(effect.body || effect.payload || {}, resultScope));
                else if (effect.type === 'user') source.updateUser?.(resolveValue(effect.value, resultScope));
                else throw new Error(`不支持的操作结果：${effect.type}`);
            }
            const hasToastEffect = (action.effects || []).some((effect) => effect.type === 'toast');
            update({ busy: false, ...(retainResponse ? { response: cloneData(response) } : {}), message: hasToastEffect ? '' : formatValue(action.successText || '', resultScope), error: '' });
            await callbacks.onSuccess?.(response);
            return response;
        } catch (error) {
            if (controller.signal.aborted || !mounted.current || error.name === 'AbortError' || error.code === 'ERR_CANCELED') return undefined;
            update({ busy: false, error: error.message || '操作失败。', fieldErrors: error.data?.errors, conflict: Number(error.code) === 409 });
            await callbacks.onError?.(error);
            throw error;
        } finally {
            controllers.current.delete(controller);
            inFlight.current.delete(key);
        }
    }, []);
    return { execute, operations };
}
