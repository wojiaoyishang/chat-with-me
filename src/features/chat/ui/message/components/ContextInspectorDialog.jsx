import React, {memo, useEffect, useMemo, useState} from 'react';
import {Bug, FileSearch2, Loader2} from 'lucide-react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';

const MessageBlock = ({message, index}) => {
    const role = message?.role || 'unknown';
    const content = String(message?.content || '');
    return (
        <div className="rounded-lg border bg-muted/20 overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b px-3 py-2 text-xs">
                <Badge variant="secondary" className="font-mono">{role}</Badge>
                <span className="truncate text-muted-foreground">
                    {message?.databaseId ? `message: ${message.databaseId}` : `#${index + 1}`}
                </span>
            </div>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words px-3 py-3 text-xs leading-relaxed font-mono">
                {content || '(empty)'}
            </pre>
        </div>
    );
};

const MessageList = ({title, messages}) => {
    const list = Array.isArray(messages) ? messages : [];
    return (
        <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium">{title}</h3>
                <span className="text-xs text-muted-foreground">{list.length}</span>
            </div>
            {list.length > 0 ? (
                <div className="space-y-2">
                    {list.map((message, index) => (
                        <MessageBlock key={`${message?.role || 'message'}-${index}`} message={message} index={index}/>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed px-3 py-5 text-center text-xs text-muted-foreground">
                    没有内容进入当前 LLM 上下文
                </div>
            )}
        </section>
    );
};

const ArtifactList = ({items}) => {
    const artifacts = Array.isArray(items) ? items : [];
    if (!artifacts.length) return null;
    return (
        <section className="space-y-2">
            <h3 className="text-sm font-medium">压缩 Artifact</h3>
            {artifacts.map((artifact) => (
                <div key={artifact.artifactId} className="rounded-lg border px-3 py-3 text-xs">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-muted-foreground">
                        <Badge variant="secondary">rev {artifact.revision || 1}</Badge>
                        <span className="font-mono">{artifact.artifactId}</span>
                        {(artifact.tokenBefore || artifact.tokenAfter) ? (
                            <span>{Number(artifact.tokenBefore || 0).toLocaleString()} → {Number(artifact.tokenAfter || 0).toLocaleString()} tokens</span>
                        ) : null}
                    </div>
                    <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words font-mono leading-relaxed">
                        {String(artifact.content || '')}
                    </pre>
                </div>
            ))}
        </section>
    );
};

const ContextInspectorDialog = memo(({
    open,
    onOpenChange,
    conversationId,
    messageId,
    replacementId = null,
    mode = 'status',
}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const endpoint = mode === 'debug'
        ? apiEndpoint.CHAT_CONTEXT_DEBUG_ENDPOINT
        : apiEndpoint.CHAT_CONTEXT_STATE_DETAIL_ENDPOINT;

    const requestKey = useMemo(
        () => `${mode}:${conversationId || ''}:${messageId || ''}:${replacementId || ''}`,
        [conversationId, messageId, mode, replacementId],
    );

    useEffect(() => {
        if (!open || !conversationId || !messageId) return undefined;
        const controller = new AbortController();
        setLoading(true);
        setData(null);
        setError('');

        apiClient.get(endpoint, {
            params: {
                conversationId,
                messageId,
                ...(replacementId ? {replacementId} : {}),
            },
            signal: controller.signal,
        }).then((payload) => {
            if (!controller.signal.aborted) setData(payload || {});
        }).catch((requestError) => {
            if (controller.signal.aborted || requestError?.name === 'CanceledError') return;
            setError(requestError?.message || '无法加载上下文信息');
        }).finally(() => {
            if (!controller.signal.aborted) setLoading(false);
        });

        return () => controller.abort();
    }, [endpoint, conversationId, messageId, open, replacementId, requestKey]);

    const isDebug = mode === 'debug';
    const title = isDebug ? 'LLM 上下文调试' : '上下文状态详情';
    const Icon = isDebug ? Bug : FileSearch2;

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin"/> 正在按需构建后端上下文…
                </div>
            );
        }
        if (error) {
            return <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-4 text-sm text-destructive">{error}</div>;
        }
        if (!data) return null;

        if (data.mode === 'replacement-status') {
            return (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{data.status?.status || 'changed'}</Badge>
                        <span className="text-xs text-muted-foreground font-mono">{data.replacementId}</span>
                    </div>
                    <section className="space-y-2">
                        <h3 className="text-sm font-medium">当前后端输入内容</h3>
                        <pre className="max-h-[55vh] overflow-auto rounded-lg border bg-muted/20 p-3 whitespace-pre-wrap break-words text-xs leading-relaxed font-mono">
                            {String(data.effectiveContent || '(empty)')}
                        </pre>
                    </section>
                </div>
            );
        }

        if (data.mode === 'replacement') {
            return (
                <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                        {data.status?.status && <Badge variant="secondary">{data.status.status}</Badge>}
                        <span className="text-xs text-muted-foreground font-mono">{data.replacementId}</span>
                    </div>
                    <section className="space-y-2">
                        <h3 className="text-sm font-medium">提供给 LLM 的 replacement</h3>
                        <pre className="max-h-[46vh] overflow-auto rounded-lg border bg-muted/20 p-3 whitespace-pre-wrap break-words text-xs leading-relaxed font-mono">
                            {String(data.backendContent || '(empty)')}
                        </pre>
                    </section>
                    <section className="space-y-2">
                        <h3 className="text-sm font-medium">前端展示内容</h3>
                        <pre className="max-h-56 overflow-auto rounded-lg border p-3 whitespace-pre-wrap break-words text-xs leading-relaxed font-mono">
                            {String(data.frontendContent || '(empty)')}
                        </pre>
                    </section>
                </div>
            );
        }

        if (data.mode === 'message-status') {
            return (
                <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{data.runtimeStatus || 'changed'}</Badge>
                        <span className="text-xs text-muted-foreground font-mono">{data.messageId}</span>
                    </div>
                    <MessageList title="压缩/忽略后进入 LLM 的内容" messages={data.effectiveMessages}/>
                    <ArtifactList items={data.relatedCompactions}/>
                </div>
            );
        }

        return (
            <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{data.runtimeStatus || 'active'}</Badge>
                    {data.modelId && <span className="text-xs text-muted-foreground font-mono">model: {data.modelId}</span>}
                </div>
                <MessageList title="后端当前提供给 LLM 的消息视图" messages={data.runtimeMessages}/>
                <MessageList title="压缩/忽略前的语义消息" messages={data.originalMessages}/>
                <ArtifactList items={data.relatedCompactions}/>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="z-[320] flex max-h-[88vh] w-[min(94vw,860px)] max-w-none flex-col overflow-hidden">
                <DialogHeader className="shrink-0">
                    <DialogTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5"/>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {isDebug
                            ? '内容仅在你点击调试按钮后动态向服务器请求；这里展示当前状态下的重建结果，不是历史请求快照。'
                            : '原始聊天记录不会因为压缩或忽略而删除。这里展示当前后端实际保留给 LLM 的表示。'}
                    </DialogDescription>
                </DialogHeader>
                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                    {renderContent()}
                    {data?.notice && (
                        <p className="mt-4 rounded-lg bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                            {data.notice}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
});

ContextInspectorDialog.displayName = 'ContextInspectorDialog';

export default ContextInspectorDialog;
