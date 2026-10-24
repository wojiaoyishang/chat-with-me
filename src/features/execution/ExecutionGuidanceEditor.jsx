import {useEffect, useRef} from 'react';
import {Loader2, Send, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {emitEvent} from '@/context/useEventStore.jsx';
import {generateUUID} from '@/lib/tools.jsx';
import {useExecutionStore} from './useExecutionStore.js';
import {submitGuidanceDraft} from './guidanceEditorSubmission.js';

export default function ExecutionGuidanceEditor({execution}) {
    const conversationId = execution.conversationId;
    const executionId = execution.executionId;
    const editor = useExecutionStore((state) => state.sessions[conversationId]?.guidanceEditor || null);
    const draft = useExecutionStore((state) => editor?.executionId === executionId
        ? state.sessions[conversationId]?.guidanceDrafts?.[editor.draftKey] || null : null);
    const drafts = useExecutionStore((state) => state.sessions[conversationId]?.guidanceDrafts);
    const inputRef = useRef(null);
    useEffect(() => { if (draft?.draftKey) inputRef.current?.focus({preventScroll: true}); }, [draft?.draftKey]);
    if (!draft) {
        const retained = Object.values(drafts || {}).filter((item) => item.executionId === executionId && item.state !== 'sent');
        return retained.length ? <div className="mb-4 flex flex-wrap gap-2" data-execution-guidance-drafts>
            {retained.map((item, index) => <Button key={item.draftKey} type="button" variant="outline" size="sm"
                onClick={() => useExecutionStore.getState().reopenGuidanceDraft(conversationId, executionId, item.draftKey)}>
                {item.state === 'uncertain' ? '确认未完成的提交' : '继续编辑补充'}{retained.length > 1 ? ` ${index + 1}` : ''}
            </Button>)}
        </div> : null;
    }
    const uncertain = draft.state === 'uncertain';
    const pending = draft.state === 'submitting';
    const disabled = pending || (!uncertain && (!execution.active || execution.status === 'cancelling'));
    const send = () => submitGuidanceDraft({conversationId, executionId, draftKey: draft.draftKey,
        emitEvent, createId: generateUUID});
    return (
        <section data-execution-guidance-editor className="mb-5 rounded-xl border border-blue-200 bg-blue-50/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-gray-800">{draft.mode === 'rewrite' ? '编辑并重发补充' : '补充更正'}</h3>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" aria-label="关闭补充编辑器"
                    onClick={() => useExecutionStore.getState().closeGuidanceEditor(conversationId, executionId)}><X className="h-4 w-4" /></Button>
            </div>
            <p className="mb-3 text-xs leading-5 text-gray-500">{draft.mode === 'rewrite'
                ? '原补充已撤回。重发会创建新版本，取消编辑不会恢复原文。'
                : '原补充已进入模型上下文。此处会发送一条新的更正，不会撤回原文。'}</p>
            <Textarea ref={inputRef} rows={4} aria-label="补充内容" value={draft.content}
                disabled={pending || uncertain} className="min-h-28 resize-y bg-white"
                onChange={(event) => useExecutionStore.getState().updateGuidanceDraft(conversationId, draft.draftKey, event.target.value)} />
            {uncertain && <p role="status" className="mt-2 text-xs leading-5 text-amber-700">
                提交结果尚未确认。内容已保留，请先重试确认；确认前不能修改，以免重复发送。
            </p>}
            {draft.error && <p role="alert" className="mt-2 break-words text-xs text-red-600">{draft.error}</p>}
            <div className="mt-3 flex items-center justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => useExecutionStore.getState().closeGuidanceEditor(conversationId, executionId)}>取消</Button>
                <Button type="button" disabled={disabled || !draft.content.trim()} onClick={() => void send()}>
                    {pending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Send className="mr-1.5 h-4 w-4" />}
                    {pending ? '正在发送' : uncertain ? '重试确认' : '发送补充'}
                </Button>
            </div>
        </section>
    );
}
