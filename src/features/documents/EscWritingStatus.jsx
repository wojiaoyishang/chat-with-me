import './EscWritingStatus.css';
import {memo, useEffect, useMemo, useState} from 'react';
import {Check, CircleAlert, FilePenLine, Loader2} from 'lucide-react';
import {onEvent} from '@/context/useEventStore.jsx';

const LABELS = {
    writing: '正在撰写文档',
    written: '正文已上屏 · 可继续撰写',
    completed: '文档撰写完成',
    interrupted: '文档撰写已停止 · 已保留内容',
    conflict: '文档有变更 · 请检查内容',
};

const EscWritingStatus = memo(({content = ''}) => {
    const data = useMemo(() => {
        try {
            const parsed = JSON.parse(content);
            return parsed?.streamId ? parsed : null;
        } catch { return null; }
    }, [content]);
    const [live, setLive] = useState(null);
    useEffect(() => {
        if (!data?.documentId || !data?.streamId) return undefined;
        return onEvent({event: 'document.esc.changed', documentId: data.documentId, direction: 'incoming'})
            .then(({payload}) => {
                if (payload?.stream?.streamId === data.streamId) setLive({streamId: data.streamId, status: payload.stream.status});
            });
    }, [data?.documentId, data?.streamId]);
    if (!data) return null;
    const status = live?.streamId === data.streamId && live.status !== 'streaming' ? live.status : data.status;
    const writing = status === 'writing';
    const interrupted = ['interrupted', 'conflict'].includes(status);
    const Icon = writing ? Loader2 : interrupted ? CircleAlert : status === 'completed' ? Check : FilePenLine;
    return (
        <div role="status" aria-live="polite" data-esc-status={status}
            className="my-2 flex max-w-full items-center gap-2.5 rounded-xl border border-cyan-100/70 bg-cyan-50/40 px-3 py-2 text-sm text-cyan-700 transition-colors dark:border-cyan-900/50 dark:bg-cyan-950/20 dark:text-cyan-300">
            <Icon aria-hidden="true" className={`h-4 w-4 shrink-0 ${writing ? 'esc-writing-spinner' : ''}`} />
            <span className="min-w-0 break-words">{LABELS[status] || '文档正文已上屏'}</span>
        </div>
    );
});
EscWritingStatus.displayName = 'EscWritingStatus';
export default EscWritingStatus;
