import {EyeOff, Loader2, Minimize2, Undo2} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import useMessageContextAction from '../hooks/useMessageContextAction.js';

export default function ToolContextActions({conversationId, messageId, toolCallId, status, messageContextState}) {
    const {t} = useTranslation();
    const action = useMessageContextAction({conversationId, messageId, toolCallId});
    const changed = ['forgotten', 'compacted'].includes(status?.status);
    const disabled = Boolean(action.pending) || action.blocked;
    const buttonClass = 'inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-wait disabled:opacity-50';
    return <span className="inline-flex shrink-0 items-center gap-0.5" onClick={event => event.stopPropagation()}>
        {action.pending ? <span role="status" className="inline-flex items-center gap-1 px-1.5 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin"/>{t('messageContext.processing')}</span> : <>
            {!changed && !messageContextState?.forgotten && !messageContextState?.compactions?.length && <button type="button" className={buttonClass} disabled={disabled} title={t('messageContext.compressTool')} onClick={() => void action.run('compress')}>
                <Minimize2 className="h-3.5 w-3.5"/><span className="hidden sm:inline">{t('messageContext.compressShort')}</span>
            </button>}
            <button type="button" className={buttonClass} disabled={disabled} title={t(changed ? 'messageContext.restoreTool' : 'messageContext.forgetTool')} onClick={() => void action.run(changed ? 'restore' : 'forget')}>
                {changed ? <Undo2 className="h-3.5 w-3.5"/> : <EyeOff className="h-3.5 w-3.5"/>}
                <span>{t(changed ? 'messageContext.restoreShort' : 'messageContext.forgetShort')}</span>
            </button>
        </>}
    </span>;
}
