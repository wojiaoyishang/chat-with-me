import { useEffect, useRef, useState } from 'react';
import { Loader2, RefreshCw, Trash2, TriangleAlert } from 'lucide-react';
import apiClient from '@/lib/apiClient.js';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const endpoint = '/setting/debug/temp-cleanup';
const requestTimeout = 15000;
const isRunning = (operation) => ['queued', 'running'].includes(operation?.status);
const number = (value) => Math.max(0, Number(value) || 0).toLocaleString();
const statusText = {
    queued: '等待清理',
    running: '正在清理',
    completed: '缓存清理完成',
    completed_with_errors: '清理结束，部分内容未能删除',
    failed: '缓存清理失败',
};

export default function TempCacheCleanup({ item }) {
    const [operation, setOperation] = useState(null);
    const [checking, setChecking] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [progressError, setProgressError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [watch, setWatch] = useState({ id: null });
    const mounted = useRef(true);
    const submitGuard = useRef(false);
    const submitAttempt = useRef(null);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    useEffect(() => {
        let cancelled = false;
        let timer;
        let controller;
        let failures = 0;
        setChecking(true);

        const readProgress = async (id) => {
            controller = new AbortController();
            try {
                const latest = await apiClient.get(id ? `${endpoint}/${encodeURIComponent(id)}` : endpoint, {
                    signal: controller.signal,
                    timeout: requestTimeout,
                });
                if (cancelled) return;
                setOperation(latest);
                setChecking(false);
                setProgressError('');
                // A previous completed record is not evidence that this submission succeeded.
                if (submitAttempt.current?.uncertain && latest?.operationId
                    && latest.operationId !== submitAttempt.current.previousId) {
                    submitAttempt.current = null;
                    setSubmitError('');
                }
                failures = 0;
                if (isRunning(latest) && latest.operationId) {
                    // Wait for the previous response before scheduling another request.
                    timer = setTimeout(() => readProgress(latest.operationId), 600);
                }
            } catch (error) {
                if (cancelled || controller.signal.aborted) return;
                setChecking(false);
                setProgressError(`暂时无法读取清理进度：${error?.message || '连接中断'}。清理可能仍在后台进行，请刷新进度确认。`);
                if (![401, 403].includes(Number(error?.code))) {
                    failures += 1;
                    timer = setTimeout(() => readProgress(Number(error?.code) === 404 ? null : id), Math.min(5000, 600 * 2 ** failures));
                }
            }
        };
        readProgress(watch.id);
        return () => {
            cancelled = true;
            clearTimeout(timer);
            controller?.abort();
        };
    }, [watch]);

    const startCleanup = async () => {
        if (submitGuard.current || checking || isRunning(operation) || progressError) return;
        submitGuard.current = true;
        const previousId = operation?.operationId || null;
        submitAttempt.current = null;
        setSubmitting(true);
        setSubmitError('');
        setConfirmOpen(false);
        try {
            const latest = await apiClient.post(endpoint, { confirmed: true }, { timeout: requestTimeout });
            if (!mounted.current) return;
            if (!latest?.operationId) throw new Error('服务器未返回清理记录');
            setOperation(latest);
            setWatch({ id: latest.operationId });
        } catch (error) {
            if (!mounted.current) return;
            const code = Number(error?.response?.status || error?.code);
            const rejected = code >= 400 && code < 500 && code !== 408;
            submitAttempt.current = { previousId, uncertain: !rejected };
            setSubmitError(rejected
                ? `无法启动清理：${error?.message || '请求被拒绝'}。请解决问题后重新确认。`
                : `无法确认清理是否已启动：${error?.message || '连接中断'}。正在重新读取进度，不会自动重复提交。`);
            setWatch({ id: null });
        } finally {
            submitGuard.current = false;
            if (mounted.current) setSubmitting(false);
        }
    };

    const running = isRunning(operation);
    const scanning = running && (operation?.phase !== 'deleting');
    const percent = typeof operation?.percent === 'number' && Number.isFinite(operation.percent)
        ? Math.min(100, Math.max(0, operation.percent))
        : null;
    const label = item?.text || '清空 temp 缓存';
    const blocked = checking || submitting || running || Boolean(progressError);
    const errors = Array.isArray(operation?.errors) ? operation.errors : [];
    const previousRecord = submitError && operation?.operationId === submitAttempt.current?.previousId;

    return (
        <section className="m-3 rounded-xl border border-destructive/25 bg-destructive/[0.025] p-4 sm:m-4" aria-label={label}>
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                        <TriangleAlert className="size-4 shrink-0 text-destructive" aria-hidden="true" />
                        {label}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        危险操作：删除后端 temp 目录下的全部内容，无法恢复。运行中的提取、导出和其他任务可能失败，缓存与检查点也会丢失。建议先停止相关任务。
                    </p>
                </div>
                <Button type="button" variant="destructive" size="sm" disabled={blocked} onClick={() => setConfirmOpen(true)}>
                    {submitting || running ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}
                    {submitting ? '正在提交' : running ? '正在清理' : label}
                </Button>
            </div>

            {(checking || operation?.operationId) && (
                <div className="mt-4 space-y-2" role="status" aria-live="polite" aria-atomic="true">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span>{previousRecord ? '上次清理记录：' : ''}{checking && !operation?.operationId ? '正在读取清理记录…' : scanning ? '正在扫描 temp 文件…' : statusText[operation?.status] || '正在读取清理进度…'}</span>
                        {operation?.phase === 'deleting' && <span className="tabular-nums text-muted-foreground">{number(operation.processed)} / {number(operation.total)}{percent !== null ? ` · ${Math.round(percent)}%` : ''}</span>}
                    </div>
                    <Progress
                            value={scanning || !operation?.operationId || percent === null ? 100 : percent}
                            aria-label="temp 缓存清理进度"
                            aria-valuenow={scanning || percent === null ? undefined : percent}
                            aria-valuetext={scanning ? '正在扫描，文件总数尚未确定' : percent === null ? '正在读取进度' : `${Math.round(percent)}%`}
                            className={`h-2 ${scanning || percent === null ? 'animate-pulse opacity-60' : ''}`}
                    />
                    {operation?.operationId && (
                        <p className="text-sm text-muted-foreground">已删除 {number(operation.deleted)} 项 · 失败 {number(operation.failed)} 项{Number(operation.remaining) > 0 ? ` · 仍有 ${number(operation.remaining)} 项未清理` : ''}{!running ? ` · 共处理 ${number(operation.processed)} / ${number(operation.total)} 项` : ''}</p>
                    )}
                </div>
            )}
            {operation?.currentPath && running && <p className="mt-2 truncate text-xs text-muted-foreground" title={operation.currentPath}>正在处理：{operation.currentPath}</p>}
            {(progressError || submitError || operation?.error) && <p className="mt-3 break-words text-sm text-destructive" role="alert">{progressError || submitError || operation.error}</p>}
            {errors.length > 0 && (
                <details className="mt-3 text-sm">
                    <summary className="cursor-pointer text-destructive">查看未能删除的内容（部分示例）</summary>
                    <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto break-all text-xs text-muted-foreground">
                        {errors.map((entry, index) => <li key={index}>{entry.path || 'temp'}：{entry.error || '删除失败'}</li>)}
                    </ul>
                </details>
            )}
            {(Number(operation?.failed) > 0 || Number(operation?.remaining) > 0) && !running && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">部分文件可能仍被占用或在清理期间新建。请先停止相关任务或解除文件占用，再重新确认清理。</p>}
            <div className="mt-3 flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" disabled={checking || submitting} onClick={() => setWatch({ id: null })}>
                    <RefreshCw className={checking ? 'animate-spin' : ''} aria-hidden="true" />刷新进度
                </Button>
                {running && <span className="text-xs text-muted-foreground">离开此页面后仍会继续清理。</span>}
            </div>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2"><TriangleAlert className="size-5 text-destructive" aria-hidden="true" />确认清空全部 temp 缓存？</AlertDialogTitle>
                        <AlertDialogDescription className="leading-relaxed">
                            这是危险操作，将永久删除后端 temp 目录下所有文件和子目录，删除后无法恢复。运行中的知识提取、导出及其他任务可能中断，缓存和检查点将丢失。请先停止相关任务，再确认执行。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setConfirmOpen(false)}>取消</AlertDialogCancel>
                        <AlertDialogAction disabled={blocked} className="bg-destructive text-white hover:bg-destructive/90" onClick={startCleanup}>确认永久删除</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
