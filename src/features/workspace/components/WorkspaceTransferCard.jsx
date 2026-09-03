import {memo, useMemo} from 'react';
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    CheckCircle2,
    CircleAlert,
    FileArchive,
    Loader2,
} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {resolveResourceUrl} from '@/lib/virtualUrl.js';
import {
    selectToolCallTransfer,
    useWorkspaceTransferStore,
} from '../useWorkspaceTransferStore.js';

const TERMINAL_STATUSES = new Set(['completed', 'failed', 'cancelled']);

const normalizeDirection = (value) => {
    const normalized = String(value || '').trim().toLowerCase();
    if (['artifact_to_workspace', 'to_workspace', 'upload'].includes(normalized)) {
        return 'artifact_to_workspace';
    }
    if (['workspace_to_artifact', 'from_workspace', 'download', 'export'].includes(normalized)) {
        return 'workspace_to_artifact';
    }
    return normalized || null;
};

const safeNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
};

const formatFileSize = (value) => {
    const bytes = safeNumber(value);
    if (bytes === null) return '';
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
    const amount = bytes / (1024 ** index);
    return `${amount >= 100 || index === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[index]}`;
};

const basename = (value) => {
    const normalized = String(value || '').replace(/\\/g, '/').replace(/\/+$/, '');
    return normalized.split('/').filter(Boolean).pop() || normalized;
};

const parseConfig = (content) => {
    if (!content) return {};
    if (typeof content === 'object') return content;
    try {
        const parsed = JSON.parse(String(content));
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
};

const transferFileName = (snapshot) => {
    const result = snapshot?.result && typeof snapshot.result === 'object' ? snapshot.result : {};
    if (snapshot?.filename) return String(snapshot.filename);
    if (result.filename) return String(result.filename);
    if (snapshot?.fileName) return String(snapshot.fileName);
    const paths = Array.isArray(snapshot?.sourcePaths) ? snapshot.sourcePaths : [];
    if (paths.length === 1) return basename(paths[0]);
    return paths.length > 1 ? `${paths.length} 个文件` : 'Workspace 文件';
};

const targetLabel = (snapshot) => {
    const result = snapshot?.result && typeof snapshot.result === 'object' ? snapshot.result : {};
    return result.path
        || result.targetPath
        || result.targetDirectory
        || snapshot?.targetPath
        || null;
};

const downloadUrl = (snapshot) => {
    const result = snapshot?.result && typeof snapshot.result === 'object' ? snapshot.result : {};
    return resolveResourceUrl(result.downloadUrl || snapshot?.downloadUrl || null);
};

const stageCopy = (stage, direction, t) => {
    const exporting = direction === 'workspace_to_artifact';
    const labels = {
        queued: t('workspace_transfer_queued', '等待文件传输'),
        preparing: exporting
            ? t('workspace_transfer_export_preparing', '正在准备导出文件…')
            : t('workspace_transfer_import_preparing', '正在准备导入文件…'),
        transferring: t('workspace_transfer_transferring', '正在传输文件…'),
        verifying: t('workspace_transfer_verifying', '正在校验文件…'),
        extracting: t('workspace_transfer_extracting', '正在安全解压…'),
        applying: t('workspace_transfer_applying', '正在写入 Workspace…'),
    };
    return labels[String(stage || '').toLowerCase()]
        || t('workspace_transfer_running', '正在处理文件…');
};

const WorkspaceTransferCard = memo(({
    content = '',
    id = '',
    toolCallId = null,
    direction = null,
    fallbackStatus = null,
    variant = 'conversation',
}) => {
    const {t} = useTranslation();
    const config = useMemo(() => parseConfig(content), [content]);
    const resolvedToolCallId = String(toolCallId || config.toolCallId || config.tool_call_id || '').trim();
    const liveTransfer = useWorkspaceTransferStore((state) => selectToolCallTransfer(state, resolvedToolCallId));
    const snapshot = liveTransfer ? {...config, ...liveTransfer} : config;
    const resolvedDirection = normalizeDirection(direction || snapshot.direction);
    const status = String(snapshot.status || fallbackStatus || 'running').trim().toLowerCase();
    const stage = String(snapshot.stage || (status === 'running' ? 'preparing' : status)).trim().toLowerCase();
    const completed = status === 'completed';
    const failed = status === 'failed';
    const cancelled = status === 'cancelled';
    const running = !TERMINAL_STATUSES.has(status);
    const fileName = transferFileName(snapshot);
    const workspaceName = String(snapshot.workspaceName || '').trim() || 'Workspace';
    const target = targetLabel(snapshot);
    const totalBytes = safeNumber(snapshot.totalBytes ?? snapshot?.result?.size);
    const transferredBytes = safeNumber(snapshot.transferredBytes);
    const numericProgress = safeNumber(snapshot.progress);
    const progress = numericProgress === null
        ? (completed ? 1 : null)
        : Math.max(0, Math.min(1, numericProgress));
    const progressPercent = progress === null ? null : Math.round(progress * 100);
    const showProgress = running && stage !== 'preparing' && stage !== 'queued' && progress !== null;
    const resolvedDownloadUrl = completed && resolvedDirection === 'workspace_to_artifact'
        ? downloadUrl(snapshot)
        : null;
    const compact = variant === 'compact';

    const directionTitle = resolvedDirection === 'artifact_to_workspace'
        ? (completed
            ? t('workspace_transfer_import_completed_title', '已导入 Workspace')
            : failed
                ? t('workspace_transfer_import_failed_title', '导入 Workspace 失败')
                : t('workspace_transfer_import_title', '导入到 Workspace'))
        : (completed
            ? t('workspace_transfer_export_completed_title', '文件已导出')
            : failed
                ? t('workspace_transfer_export_failed_title', 'Workspace 导出失败')
                : t('workspace_transfer_export_title', '从 Workspace 导出'));
    const routeLabel = resolvedDirection === 'artifact_to_workspace'
        ? `Conversation → ${workspaceName}`
        : `${workspaceName} → Conversation`;
    const errorMessage = String(snapshot.errorMessage || snapshot.error || '').trim();

    const StateIcon = completed
        ? CheckCircle2
        : failed
            ? CircleAlert
            : running
                ? Loader2
                : FileArchive;
    const DirectionIcon = resolvedDirection === 'artifact_to_workspace' ? ArrowUpFromLine : ArrowDownToLine;

    return (
        <div
            className={compact
                ? 'mt-2 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5'
                : 'my-3 w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm'}
            data-workspace-transfer-card="true"
            data-workspace-transfer-id={liveTransfer?.transferId || undefined}
            data-workspace-transfer-tool-call-id={resolvedToolCallId || undefined}
            data-workspace-transfer-replacement-id={id || undefined}
        >
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex shrink-0 items-center justify-center rounded-lg ${compact ? 'h-8 w-8' : 'h-9 w-9'} ${failed ? 'bg-red-50 text-red-600' : completed ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    <DirectionIcon className="h-4 w-4" aria-hidden="true"/>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                        <StateIcon
                            className={`h-4 w-4 shrink-0 ${running ? 'animate-spin text-blue-500' : failed ? 'text-red-500' : completed ? 'text-emerald-500' : 'text-slate-400'}`}
                            aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                            {directionTitle}
                        </div>
                        {showProgress && progressPercent !== null ? (
                            <span className="shrink-0 text-xs font-medium tabular-nums text-slate-500">{progressPercent}%</span>
                        ) : null}
                    </div>

                    <div className={`${compact ? 'mt-1' : 'mt-1.5'} truncate text-sm font-medium text-slate-700`} title={fileName}>
                        {fileName}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-slate-400" title={routeLabel}>{routeLabel}</div>

                    {showProgress ? (
                        <div className="mt-2">
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-blue-500 transition-[width] duration-300 ease-out"
                                    style={{width: `${progressPercent || 0}%`}}
                                />
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                                <span className="truncate">{stageCopy(stage, resolvedDirection, t)}</span>
                                {(transferredBytes !== null || totalBytes !== null) ? (
                                    <span className="shrink-0 tabular-nums">
                                        {transferredBytes !== null ? formatFileSize(transferredBytes) : '—'}
                                        {totalBytes !== null ? ` / ${formatFileSize(totalBytes)}` : ''}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    ) : running ? (
                        <div className="mt-1.5 text-xs text-slate-500">{stageCopy(stage, resolvedDirection, t)}</div>
                    ) : null}

                    {completed ? (
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                            {totalBytes !== null ? <span>{formatFileSize(totalBytes)}</span> : null}
                            {target && resolvedDirection === 'artifact_to_workspace' ? (
                                <span className="min-w-0 truncate font-mono" title={String(target)}>{String(target)}</span>
                            ) : null}
                            {resolvedDownloadUrl ? (
                                <a
                                    href={resolvedDownloadUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {t('download_file', '下载文件')}
                                </a>
                            ) : null}
                        </div>
                    ) : null}

                    {failed ? (
                        <div className="mt-1.5 text-xs leading-5 text-red-600">
                            {errorMessage || t('workspace_transfer_failed', '文件传输失败')}
                        </div>
                    ) : null}

                    {cancelled ? (
                        <div className="mt-1.5 text-xs text-slate-500">{t('workspace_transfer_cancelled', '文件传输已取消')}</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
});

WorkspaceTransferCard.displayName = 'WorkspaceTransferCard';

export default WorkspaceTransferCard;
