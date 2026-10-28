import { useEffect, useId, useRef } from 'react';
import { toast } from 'sonner';

const NOTICE_DURATION_MS = 5000;

export function useSettingsLoadingToast(active, message, { error, retry } = {}) {
    const owner = useId();
    const current = useRef({ id: null, sequence: 0, phase: null });
    useEffect(() => {
        const notice = current.current;
        // A dismissed Sonner ID can still be exiting. Each new read owns a new
        // identity, while progress updates within that read reuse its notice.
        if ((active && notice.phase !== 'loading') || (!notice.id && error)) {
            if (notice.id) toast.dismiss(notice.id);
            notice.id = `settings-loading-${owner}-${++notice.sequence}`;
        }
        if (active) {
            notice.phase = 'loading';
            toast.loading(message, { id: notice.id, position: 'top-center', duration: Infinity });
        } else if (error) {
            notice.phase = 'error';
            toast.error(error, { id: notice.id, position: 'top-center', duration: NOTICE_DURATION_MS, action: retry ? { label: '重试', onClick: (event) => { event?.preventDefault?.(); retry(); } } : undefined });
        } else if (notice.id) {
            toast.dismiss(notice.id);
            notice.id = null;
            notice.phase = null;
        }
    }, [active, owner, message, error, retry]);
    useEffect(() => () => { if (current.current.id) toast.dismiss(current.current.id); current.current.id = null; current.current.phase = null; }, []);
}

/** One floating notice per operation, including paused reads and task links. */
export function useSettingsOperationToasts(operations, navigate) {
    const owner = useId();
    const notices = useRef(new Map());
    const sequence = useRef(0);
    const navigateRef = useRef(navigate);
    navigateRef.current = navigate;
    useEffect(() => {
        for (const [key, operation] of Object.entries(operations)) {
            let notice = notices.current.get(key);
            if (!notice || notice.sequence !== operation.sequence) {
                if (notice) toast.dismiss(notice.id);
                notice = { id: `settings-operation-${owner}-${++sequence.current}`, sequence: operation.sequence };
                notices.current.set(key, notice);
            }
            if (notice.value === operation) continue;
            notice.value = operation;
            const details = operation.taskPage ? { label: '查看详情', onClick: () => navigateRef.current?.(operation.taskPage) } : undefined;
            const retry = operation.readPaused ? { label: '继续读取进度', onClick: (event) => { event?.preventDefault?.(); operation.retry?.(); } } : undefined;
            const percent = Number(operation.percent);
            const progressLabel = operation.percent != null && Number.isFinite(percent)
                ? `（${Math.floor(Math.max(0, Math.min(100, percent)))}%）` : '';
            const options = {
                id: notice.id, position: 'top-center',
                action: retry || details, cancel: retry ? details : undefined,
            };
            if (operation.busy) {
                const render = operation.readPaused ? toast.warning : toast.loading;
                render(`${operation.message || '正在处理…'}${progressLabel}`, { ...options, duration: Infinity });
            } else if (operation.error) toast.error(operation.error, { ...options, duration: NOTICE_DURATION_MS });
            else if (operation.message) toast.success(operation.message, { ...options, duration: NOTICE_DURATION_MS });
            else toast.dismiss(notice.id);
        }
    }, [operations, owner]);
    useEffect(() => {
        const owned = notices.current;
        return () => { for (const notice of owned.values()) toast.dismiss(notice.id); owned.clear(); };
    }, []);
}
